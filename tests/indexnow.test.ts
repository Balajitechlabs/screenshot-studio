import test from "node:test";
import assert from "node:assert/strict";
import { affectedUrls } from "../scripts/indexnow";

const SITE = "https://www.screenshot-studio.com";
const SITEMAP = [
  "/",
  "/guides",
  "/guides/a",
  "/guides/b",
  "/compare",
  "/code",
  "/about",
  "/tools",
  "/terms",
].map((path) => `${SITE}${path}`);
const SOURCES = new Map([
  [
    "app/[locale]/page.tsx",
    'import { Footer } from "@/components/landing/Footer";\nimport { OG } from "@/lib/seo/metadata";',
  ],
  [
    "app/[locale]/guides/page.tsx",
    'import { guides } from "@/lib/seo/guides";\nimport { OG } from "@/lib/seo/metadata";',
  ],
  [
    "app/[locale]/guides/[slug]/page.tsx",
    'import { getGuide } from "../../../../lib/seo/guides";\nimport { OG } from "@/lib/seo/metadata";',
  ],
  [
    "app/[locale]/compare/page.tsx",
    'import { guides } from "@/lib/seo/guides";\nimport { OG } from "@/lib/seo/metadata";',
  ],
  [
    "app/[locale]/code/page.tsx",
    'import { cn } from "@/lib/utils";\nimport { Footer } from "@/components/landing/Footer";',
  ],
  ["app/[locale]/about/page.tsx", 'import { OG } from "@/lib/seo/metadata";'],
  ["app/[locale]/tools/page.tsx", ""],
  ["app/[locale]/terms/page.tsx", ""],
  [
    "components/landing/Footer.tsx",
    'import { guides } from "@/lib/seo/guides";\nimport { cn } from "@/lib/utils";',
  ],
  ["lib/seo/guides.ts", 'import { howToGuides } from "./how-to-guides";'],
  ["lib/seo/how-to-guides.ts", 'import type { Guide } from "@/lib/seo/guides";'],
  ["lib/seo/metadata.ts", ""],
  ["lib/utils.ts", ""],
]);

function changed(...files: string[]): string[] {
  return affectedUrls(SOURCES, files, SITEMAP).map((url) => new URL(url).pathname);
}

test("a changed page submits only its own URL", () => {
  assert.deepEqual(changed("app/[locale]/code/page.tsx"), ["/code"]);
});

test("a data file submits every page that imports it, through cycles and dynamic routes", () => {
  assert.deepEqual(changed("lib/seo/how-to-guides.ts"), [
    "/guides",
    "/guides/a",
    "/guides/b",
    "/compare",
  ]);
});

test("the nav and footer never pull in every page", () => {
  assert.deepEqual(changed("components/landing/Footer.tsx"), []);
  assert.deepEqual(changed("lib/utils.ts"), ["/code"]);
});

test("files that reach more than half the sitemap are skipped as site-wide", () => {
  assert.deepEqual(changed("lib/seo/metadata.ts"), []);
});

test("files outside the import graph submit nothing", () => {
  assert.deepEqual(changed("README.md", ".github/workflows/indexnow.yml"), []);
});
