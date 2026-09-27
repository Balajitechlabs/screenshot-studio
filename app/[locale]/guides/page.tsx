import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { CtaBand } from "@/components/seo/ContentBlocks";
import { GuideCard, GuideRow, guideFacts } from "@/components/seo/GuideCards";
import { SectionTitle } from "@/components/tools/ToolLayout";
import { INTER, MONO } from "@/components/tools/ui";
import {
  GUIDES_UPDATED_LABEL,
  guideCover,
  guideShortTitle,
  guides,
  type HowToGuide,
} from "@/lib/seo/guides";
import { buildCollectionJsonLd } from "@/lib/seo/json-ld";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

const TITLE = "Screenshot Editing Guides and Tool Roundups";
const DESCRIPTION =
  "Step-by-step guides to editing, annotating, blurring, and beautifying screenshots, plus honest roundups of the best free screenshot editors, mockup generators, and alternatives.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "how to edit a screenshot",
    "screenshot editing guide",
    "best free screenshot editor",
    "best free mockup generator",
    "shots.so alternatives",
    "screely alternatives",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} - Screenshot Studio`,
    description: DESCRIPTION,
    url: "/guides",
  },
  alternates: {
    canonical: "/guides",
  },
};

const FEATURED_SLUG = "how-to-edit-screenshot-online";

const TOPICS: Record<HowToGuide["topic"], { title: string; description: string }> = {
  markup: {
    title: "Mark up a screenshot",
    description: "Add text, arrows, and blur so the point is clear at a glance.",
  },
  present: {
    title: "Make it look polished",
    description: "Backgrounds, browser frames, device mockups, 3D, and motion.",
  },
  publish: {
    title: "Capture and share",
    description: "Take the screenshot, then size it right for every platform.",
  },
};

const ROUNDUP_ID = "roundups";

export default function GuidesHubPage() {
  const jsonLd = buildCollectionJsonLd(
    "/guides",
    TITLE,
    DESCRIPTION,
    guides.map((guide) => ({ name: guide.title, url: `/guides/${guide.slug}` })),
  );
  const howTos = guides.filter((guide) => guide.kind === "how-to");
  const roundups = guides.filter((guide) => guide.kind === "roundup");
  const featured = howTos.find((guide) => guide.slug === FEATURED_SLUG) ?? howTos[0];
  const topics = (Object.keys(TOPICS) as HowToGuide["topic"][]).map((id) => ({
    id,
    ...TOPICS[id],
    guides: howTos.filter((guide) => guide.topic === id && guide !== featured),
  }));
  const jumpLinks = [
    ...topics.map((topic) => ({ href: `#${topic.id}`, label: topic.title })),
    { href: `#${ROUNDUP_ID}`, label: "Tool roundups" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 sm:gap-24">
          <header className="flex flex-col gap-8">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
                <span aria-hidden="true" className="mx-1.5">/</span>
                <span aria-current="page" className="text-foreground">
                  Guides
                </span>
              </nav>
              <h1
                className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-6xl"
                style={{ fontFamily: INTER }}
              >
                Screenshot guides
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Practical how-tos for editing, annotating, and presenting
                screenshots, plus honest roundups of the tools people compare,
                including where Screenshot Studio falls short.
              </p>
            </div>
            <nav aria-label="Guide topics" className="flex flex-wrap gap-2">
              {jumpLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full bg-foreground/[0.04] px-3.5 py-1.5 text-sm text-muted-foreground ring-1 ring-inset ring-border transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </header>

          <Link
            href={`/guides/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl bg-card ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 lg:grid-cols-[1.35fr_1fr]"
          >
            <span className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[380px]">
              <Image
                src={guideCover(featured.slug)}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </span>
            <span className="flex flex-col justify-center gap-4 p-7 sm:p-10">
              <span
                className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
                style={{ fontFamily: MONO }}
              >
                Start here · {guideFacts(featured)}
              </span>
              <span
                className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-3xl"
                style={{ fontFamily: INTER }}
              >
                {guideShortTitle(featured)}
              </span>
              <span className="text-[15px] leading-relaxed text-muted-foreground">
                {featured.metaDescription}
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Read the guide
                <ArrowRight01Icon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </span>
            </span>
          </Link>

          {topics.map((topic) => (
            <section
              key={topic.id}
              id={topic.id}
              className="grid scroll-mt-28 gap-4 border-t border-border pt-10 lg:grid-cols-[18rem_1fr] lg:gap-16"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionTitle>{topic.title}</SectionTitle>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
              </div>
              <ul className="-my-4 flex flex-col divide-y divide-border/70">
                {topic.guides.map((guide) => (
                  <li key={guide.slug}>
                    <GuideRow guide={guide} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section id={ROUNDUP_ID} className="scroll-mt-28 border-t border-border pt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div>
                <SectionTitle>Tool roundups</SectionTitle>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Every tool listed with its price, platform, and limits,
                  checked against the vendor&apos;s own site on{" "}
                  {GUIDES_UPDATED_LABEL}.
                </p>
              </div>
              <Link
                href="/compare"
                className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                One-on-one comparisons
                <ArrowRight01Icon aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
              {roundups.map((guide, index) => (
                <GuideCard
                  key={guide.slug}
                  guide={guide}
                  sizes={
                    index < 2
                      ? "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                  }
                  className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
                />
              ))}
            </div>
          </section>

          <CtaBand
            title="Ready to edit a screenshot?"
            description="Paste a screenshot into the editor and follow along. Every feature is free, with no account and no watermark."
            href="/editor"
            label="Open Free Editor"
          />
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
