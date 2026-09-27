import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://www.screenshot-studio.com";
const KEY_LOCATION = `${SITE_URL}/indexnow-key.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITE_CHROME = new Set([
  "components/landing/Navigation.tsx",
  "components/landing/Footer.tsx",
]);
const SITE_WIDE_SHARE = 0.5;
const PAGE_FILE = /^app\/\[locale\]\/(?:(.+)\/)?page\.tsx$/;
const SOURCE_FILE = /\.(?:tsx?|jsx?|mjs|json)$/;
const IMPORT_SPECIFIER = /\b(?:from|import)\s*\(?\s*["']([^"']+)["']/g;
const RESOLVE_SUFFIXES = [
  "",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".json",
  "/index.ts",
  "/index.tsx",
];

function resolveImport(
  importer: string,
  specifier: string,
  files: Set<string>,
): string | undefined {
  const base = specifier.startsWith("@/")
    ? specifier.slice(2)
    : specifier.startsWith(".")
      ? posix.join(posix.dirname(importer), specifier)
      : undefined;
  if (base === undefined) return undefined;
  return RESOLVE_SUFFIXES.map((suffix) => base + suffix).find((candidate) =>
    files.has(candidate),
  );
}

function routePattern(file: string): RegExp | undefined {
  const match = PAGE_FILE.exec(file);
  if (!match) return undefined;
  const route = `/${match[1] ?? ""}`
    .replace(/\[\.\.\.[^\]]+\]/g, ".+")
    .replace(/\[[^\]]+\]/g, "[^/]+");
  return new RegExp(`^${route}$`);
}

function buildImporters(sources: Map<string, string>): Map<string, Set<string>> {
  const files = new Set(sources.keys());
  const importers = new Map<string, Set<string>>();
  for (const [file, source] of sources) {
    for (const [, specifier] of source.matchAll(IMPORT_SPECIFIER)) {
      const target = resolveImport(file, specifier, files);
      if (!target || target === file) continue;
      const set = importers.get(target) ?? new Set<string>();
      set.add(file);
      importers.set(target, set);
    }
  }
  return importers;
}

function pagesDependingOn(
  file: string,
  importers: Map<string, Set<string>>,
): RegExp[] {
  const seen = new Set([file]);
  const queue = [file];
  const pages: RegExp[] = [];
  while (queue.length > 0) {
    const current = queue.pop() as string;
    const pattern = routePattern(current);
    if (pattern) pages.push(pattern);
    for (const importer of importers.get(current) ?? []) {
      if (seen.has(importer) || SITE_CHROME.has(importer)) continue;
      seen.add(importer);
      queue.push(importer);
    }
  }
  return pages;
}

/** Returns the sitemap URLs whose page, or any page-specific file it imports, changed. */
export function affectedUrls(
  sources: Map<string, string>,
  changedFiles: string[],
  sitemapUrls: string[],
): string[] {
  const importers = buildImporters(sources);
  const paths = sitemapUrls.map((url) => new URL(url).pathname);
  const affected = new Set<number>();

  for (const file of changedFiles) {
    if (SITE_CHROME.has(file)) continue;
    const pages = pagesDependingOn(file, importers);
    const hits = paths.flatMap((path, index) =>
      pages.some((page) => page.test(path)) ? [index] : [],
    );
    if (hits.length > paths.length * SITE_WIDE_SHARE) continue;
    hits.forEach((index) => affected.add(index));
  }

  return sitemapUrls.filter((_, index) => affected.has(index));
}

function git(...args: string[]): string[] {
  return execFileSync("git", args, { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GET ${url} returned ${response.status}`);
  }
  return response.text();
}

async function submit(urls: string[]): Promise<void> {
  const key = (await fetchText(KEY_LOCATION)).trim();
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  console.log(`IndexNow responded ${response.status} for ${urls.length} URLs.`);
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(await response.text());
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const [fromRef] = args.filter((arg) => !arg.startsWith("--"));
  const submitAll = args.includes("--all");
  if (!fromRef && !submitAll) {
    throw new Error(
      "Usage: node scripts/indexnow.ts <previous-deploy-sha> | --all [--dry-run]",
    );
  }

  const sitemapXml = await fetchText(`${SITE_URL}/sitemap.xml`);
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, url]) => url,
  );

  let urls = sitemapUrls;
  if (!submitAll) {
    const sources = new Map(
      git("ls-files")
        .filter((file) => SOURCE_FILE.test(file))
        .map((file) => [file, readFileSync(file, "utf8")] as const),
    );
    urls = affectedUrls(
      sources,
      git("diff", "--name-only", fromRef, "HEAD"),
      sitemapUrls,
    );
  }

  if (urls.length === 0) {
    console.log("No sitemap pages changed.");
    return;
  }
  console.log(urls.join("\n"));
  if (!args.includes("--dry-run")) await submit(urls);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
