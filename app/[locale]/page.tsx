import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { CODE_THEME_SOURCES } from "@/components/code-image/code-themes-data";
import { gradientColors } from "@/lib/constants/gradient-colors";
import { SectionTitle } from "@/components/tools/ToolLayout";
import { CARD_CLASS } from "@/components/tools/ui";
import { CHANGELOG } from "@/lib/seo/changelog";
import { HOW_TO_UPDATED, formatGuideDate, guideShortTitle, guides } from "@/lib/seo/guides";
import { OG_DEFAULTS } from "@/lib/seo/metadata";
import {
  IMAGE_FORMATS_SENTENCE,
  PRODUCT_FACTS,
  VIDEO_FORMATS_SENTENCE,
  atLeast,
} from "@/lib/seo/product-facts";
import { TOOLS_HUB_PATH } from "@/lib/seo/tools";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "Free browser editors for screenshots, code images, tweet images, and App Store screenshots, plus image tools that compress, convert, and resize without uploading. No signup, no watermark.";

export const metadata: Metadata = {
  title: "Free Screenshot Editor & Image Tools",
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Screenshot Studio - Free Screenshot Editor & Image Tools",
    description: DESCRIPTION,
    url: "/",
  },
};

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const CODE_THEME =
  CODE_THEME_SOURCES.find((theme) => theme.id === "midnight") ??
  CODE_THEME_SOURCES[0];
const SYNTAX = CODE_THEME.dark;

const CODE_LINES: [string, string | undefined][][] = [
  [
    ["async function ", SYNTAX.keyword],
    ["fetchUser", SYNTAX.function],
    ["(", SYNTAX.punctuation],
    ["id", SYNTAX.parameter],
    [") {", SYNTAX.punctuation],
  ],
  [
    ["  const ", SYNTAX.keyword],
    ["res ", SYNTAX.foreground],
    ["= ", SYNTAX.punctuation],
    ["await ", SYNTAX.keyword],
    ["fetch", SYNTAX.function],
    ["(", SYNTAX.punctuation],
    ["url", SYNTAX.foreground],
    [");", SYNTAX.punctuation],
  ],
  [
    ["  return ", SYNTAX.keyword],
    ["res", SYNTAX.foreground],
    [".", SYNTAX.punctuation],
    ["json", SYNTAX.function],
    ["();", SYNTAX.punctuation],
  ],
  [["}", SYNTAX.punctuation]],
];

const STORE_HEADLINES = ["Plan your week", "Stay on track", "Share progress"];

function WindowDots(): React.JSX.Element {
  return (
    <div className="flex gap-1.5">
      <span className="size-2 rounded-full bg-[#ff5f57]" />
      <span className="size-2 rounded-full bg-[#febc2e]" />
      <span className="size-2 rounded-full bg-[#28c840]" />
    </div>
  );
}

function ScreenshotPreview(): React.JSX.Element {
  return (
    <div
      className="flex h-full items-center justify-center [perspective:1200px]"
      style={{ background: gradientColors.orange_pink_dark }}
    >
      <div className="w-[70%] max-w-[300px] overflow-hidden rounded-lg bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:rotateX(12deg)_rotateY(-18deg)_rotateZ(3deg)] group-hover:[transform:none] motion-reduce:transition-none">
        <div className="flex items-center gap-3 border-b border-black/[0.06] bg-neutral-100 px-3 py-2">
          <WindowDots />
          <span className="h-3 flex-1 rounded bg-black/[0.06]" />
        </div>
        <div className="space-y-2 p-4">
          <div className="h-2 w-12 rounded-full bg-neutral-300" />
          <div className="h-3 w-4/5 rounded bg-neutral-800" />
          <div className="h-3 w-1/2 rounded bg-neutral-800" />
          <div className="h-4 w-16 rounded bg-neutral-900" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="aspect-video rounded bg-neutral-100" />
            <div className="aspect-video rounded bg-neutral-100" />
            <div className="aspect-video rounded bg-neutral-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CodePreview(): React.JSX.Element {
  return (
    <div
      className="flex h-full items-center justify-center p-6"
      style={{
        background: `linear-gradient(140deg, ${CODE_THEME.from}, ${CODE_THEME.to})`,
      }}
    >
      <div className="rounded-lg bg-black/75 p-4 pr-6 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
        <WindowDots />
        <pre className="mt-3 font-[family-name:var(--font-geist-mono)] text-[11px] leading-[18px]">
          {CODE_LINES.map((line, lineIndex) => (
            <div key={lineIndex} className="whitespace-pre">
              <span
                className="mr-3 inline-block w-2 text-right"
                style={{ color: SYNTAX.comment }}
              >
                {lineIndex + 1}
              </span>
              {line.map(([text, color], tokenIndex) => (
                <span key={tokenIndex} style={{ color }}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function TweetPreview(): React.JSX.Element {
  return (
    <div
      className="flex h-full items-center justify-center p-6"
      style={{ background: "linear-gradient(140deg, #8ec5fc, #4f46e5)" }}
    >
      <div
        className="w-[78%] max-w-[300px] rounded-xl bg-white p-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
        style={{ fontFamily: INTER }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="size-8 shrink-0 rounded-full"
            style={{ background: gradientColors.orange_pink_dark }}
          />
          <div className="min-w-0 flex-1 text-[11px] leading-4">
            <p className="font-semibold text-neutral-900">Screenshot Studio</p>
            <p className="text-neutral-500">@screenshotstdio</p>
          </div>
          <span className="text-sm font-bold text-neutral-900">𝕏</span>
        </div>
        <p className="mt-3 text-[12px] leading-[18px] text-neutral-900">
          Paste a post link and get a clean image back. Light or dark, any
          background.
        </p>
        <div className="mt-3 flex gap-4 border-t border-black/[0.06] pt-2.5 text-[10px] text-neutral-500">
          <span>1.2K likes</span>
          <span>96 replies</span>
        </div>
      </div>
    </div>
  );
}

function StorePreview(): React.JSX.Element {
  return (
    <div
      className="flex h-full items-end justify-center gap-3 overflow-hidden px-6"
      style={{ background: gradientColors.store_raycast }}
    >
      {STORE_HEADLINES.map((headline, index) => (
        <div
          key={headline}
          className={cn(
            "-mb-6 flex w-[72px] flex-col items-center gap-2 transition-transform duration-500 ease-out motion-reduce:transition-none",
            index === 1
              ? "-translate-y-3 group-hover:-translate-y-5"
              : "group-hover:-translate-y-1",
          )}
        >
          <p className="text-center text-[9px] font-semibold leading-tight text-white">
            {headline}
          </p>
          <div className="h-[118px] w-full rounded-t-[14px] bg-white p-1.5 pt-2 ring-[3px] ring-black">
            <div className="mx-auto h-1.5 w-6 rounded-full bg-black" />
            <div className="mt-3 space-y-1.5 px-1">
              <div className="h-1.5 w-3/4 rounded-full bg-neutral-800" />
              <div className="h-1 w-full rounded-full bg-neutral-200" />
              <div className="h-1 w-5/6 rounded-full bg-neutral-200" />
              <div className="mt-2 h-8 rounded-md bg-neutral-100" />
              <div className="h-1 w-2/3 rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FileChip({
  name,
  size,
  sizeClassName,
}: {
  name: string;
  size: string;
  sizeClassName: string;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-white p-2 pr-3.5 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)]">
      <div
        className="size-9 shrink-0 rounded-md"
        style={{ background: gradientColors.peach_pink_purple }}
      />
      <div className="text-[11px] leading-4">
        <p className="font-medium text-neutral-900">{name}</p>
        <p className={sizeClassName}>{size}</p>
      </div>
    </div>
  );
}

function ImageToolsPreview(): React.JSX.Element {
  return (
    <div
      className="flex h-full items-center justify-center gap-2 px-4"
      style={{ background: gradientColors.store_ocean }}
    >
      <FileChip name="photo.png" size="2.4 MB" sizeClassName="text-neutral-500" />
      <ArrowRight01Icon
        size={18}
        className="shrink-0 text-white transition-transform duration-500 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <FileChip
        name="photo.webp"
        size="380 KB"
        sizeClassName="font-medium text-emerald-600"
      />
    </div>
  );
}

const CHOICES = [
  {
    href: "/editor",
    title: "Edit a screenshot",
    description:
      "Add a background, a browser or device frame, and shadows. Save it as an image or a video.",
    action: "Open editor",
    preview: <ScreenshotPreview />,
  },
  {
    href: "/code",
    title: "Turn code into an image",
    description:
      "Paste your code, pick a color theme, and download a clean image to share.",
    action: "Open editor",
    preview: <CodePreview />,
  },
  {
    href: "/tweet",
    title: "Turn a post into an image",
    description:
      "Paste a link to a post on X, pick light or dark, and download a clean image.",
    action: "Open editor",
    preview: <TweetPreview />,
  },
  {
    href: "/store-screenshots",
    title: "Make App Store screenshots",
    description:
      "Put your app screens in phone frames with short headlines, sized for the App Store.",
    action: "Open editor",
    preview: <StorePreview />,
  },
  {
    href: TOOLS_HUB_PATH,
    title: "Quick image fixes",
    description:
      "Make images smaller, change the format, resize, crop, or remove the background.",
    action: "See all tools",
    preview: <ImageToolsPreview />,
  },
];

const IMAGE_HANDLING = [
  {
    title: "Edited on your device",
    body: "Images you import are read by your browser and drawn on a canvas in the tab. They are not uploaded to be edited, and drafts are saved in your own browser storage.",
  },
  {
    title: "Image tools without uploads",
    body: "Compress, convert, resize, crop, and rotate run inside the page with the browser's own image APIs, so files go from your disk to your downloads folder without touching a server.",
  },
  {
    title: "Metadata stripped on export",
    body: "Every image is re-encoded from pixels, which drops EXIF data such as the camera model and GPS location before you share it.",
  },
];

const FEATURED_GUIDES = guides.slice(0, 6);
const RECENT_RELEASES = CHANGELOG.slice(0, 3);

const inlineLinkClassName = "text-foreground underline underline-offset-4";

export default function StartPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />

      <main className="flex-1 px-6 pb-20 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1
              className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
              style={{ fontFamily: INTER }}
            >
              What do you want to make?
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Pick one to get started. Everything is free and works right in
              your browser.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {CHOICES.map((choice) => (
              <Link
                key={choice.href}
                href={choice.href}
                className="group flex flex-col overflow-hidden rounded-2xl first:sm:col-span-2 bg-card ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)] transition-shadow duration-200 hover:ring-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70"
              >
                <div
                  aria-hidden="true"
                  className="m-2 mb-0 h-48 overflow-hidden rounded-xl sm:h-56"
                >
                  {choice.preview}
                </div>
                <div className="flex flex-1 flex-col p-5 pt-4">
                  <h2
                    className="text-lg font-semibold tracking-[-0.02em] text-foreground"
                    style={{ fontFamily: INTER }}
                  >
                    {choice.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {choice.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    {choice.action}
                    <ArrowRight01Icon
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            New to Screenshot Studio?{" "}
            <Link
              href="/landing"
              className="text-foreground underline underline-offset-4"
            >
              See how it works
            </Link>
          </p>

          <div className="mx-auto mt-24 flex max-w-3xl flex-col gap-20">
            <section>
              <SectionTitle>A free screenshot editor that runs in your browser</SectionTitle>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Screenshot Studio turns plain screenshots into images that are
                ready for a landing page, a README, a slide, or a social post.
                Drop in a screenshot, put it on one of{" "}
                {atLeast(PRODUCT_FACTS.backgrounds)} backgrounds, wrap it in a
                Safari or Chrome frame or an iPhone or MacBook mockup, tilt it
                in 3D, and export {IMAGE_FORMATS_SENTENCE} at up to{" "}
                {PRODUCT_FACTS.maxExportScale}x resolution. The same editor
                animates the result and exports {VIDEO_FORMATS_SENTENCE}.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Alongside the main editor there are focused editors for{" "}
                <Link href="/code" className={inlineLinkClassName}>
                  code snippets
                </Link>{" "}
                ({PRODUCT_FACTS.codeThemes} themes and{" "}
                {PRODUCT_FACTS.codeLanguages} languages),{" "}
                <Link href="/tweet" className={inlineLinkClassName}>
                  posts from X
                </Link>
                , and{" "}
                <Link href="/store-screenshots" className={inlineLinkClassName}>
                  App Store screenshots
                </Link>
                , plus quick{" "}
                <Link href={TOOLS_HUB_PATH} className={inlineLinkClassName}>
                  image tools
                </Link>{" "}
                for compressing, converting, resizing, cropping, rotating, and{" "}
                <Link href="/remove-background" className={inlineLinkClassName}>
                  removing backgrounds
                </Link>
                . There is no signup, no watermark, and no paid tier, and the
                whole project is open source under the {PRODUCT_FACTS.license}{" "}
                licence.
              </p>
            </section>

            <section>
              <SectionTitle>What happens to your images</SectionTitle>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {IMAGE_HANDLING.map((item) => (
                  <div key={item.title} className={cn(CARD_CLASS, "p-5")}>
                    <h3 className="text-[15px] font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A few features do need the network, such as capturing a
                screenshot from a URL. The{" "}
                <Link href="/privacy-policy" className={inlineLinkClassName}>
                  privacy policy
                </Link>{" "}
                lists every request that leaves your device.
              </p>
            </section>

            <section>
              <div className="flex items-baseline justify-between gap-4">
                <SectionTitle>Guides</SectionTitle>
                <Link href="/guides" className="text-sm font-medium text-foreground underline underline-offset-4">
                  All guides
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Step-by-step guides, written by doing each task in the editor.
                Last checked {formatGuideDate(HOW_TO_UPDATED)}.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {FEATURED_GUIDES.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className={cn(
                        CARD_CLASS,
                        "flex h-full flex-col p-5 transition-shadow duration-200 hover:ring-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70",
                      )}
                    >
                      <span className="text-[15px] font-semibold text-foreground">
                        {guideShortTitle(guide)}
                      </span>
                      <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {guide.metaDescription}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-baseline justify-between gap-4">
                <SectionTitle>Recently shipped</SectionTitle>
                <Link href="/changelog" className="text-sm font-medium text-foreground underline underline-offset-4">
                  Full changelog
                </Link>
              </div>
              <ol className="mt-5 flex flex-col gap-3">
                {RECENT_RELEASES.map((release) => (
                  <li key={release.version} className={cn(CARD_CLASS, "p-5")}>
                    <p className="text-xs text-muted-foreground">
                      v{release.version} · {release.date}
                    </p>
                    <h3 className="mt-1 text-[15px] font-semibold text-foreground">
                      {release.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {release.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
