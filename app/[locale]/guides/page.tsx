import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { CtaBand, LinkCardGrid } from "@/components/seo/ContentBlocks";
import { SectionTitle, ToolHero } from "@/components/tools/ToolLayout";
import { GUIDES_UPDATED_LABEL, guides, type Guide } from "@/lib/seo/guides";
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

function toCard(guide: Guide) {
  return {
    href: `/guides/${guide.slug}`,
    title: guide.title,
    description: guide.metaDescription,
  };
}

export default function GuidesHubPage() {
  const jsonLd = buildCollectionJsonLd(
    "/guides",
    TITLE,
    DESCRIPTION,
    guides.map((guide) => ({ name: guide.title, url: `/guides/${guide.slug}` })),
  );
  const howTos = guides.filter((guide) => guide.kind === "how-to");
  const roundups = guides.filter((guide) => guide.kind === "roundup");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 px-6 pb-20 pt-32">
        <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-20">
          <ToolHero
            parent={null}
            name="Guides"
            title="Screenshot Guides"
            intro="Practical how-tos for editing, annotating, and presenting screenshots, and honest roundups of the tools people compare, including where Screenshot Studio falls short."
          />

          <section>
            <SectionTitle>How-to guides</SectionTitle>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Short, step-by-step walkthroughs you can follow in a browser tab.
            </p>
            <div className="mt-5">
              <LinkCardGrid
                items={howTos.map((guide) => ({ ...toCard(guide), eyebrow: "How-to" }))}
              />
            </div>
          </section>

          <section>
            <SectionTitle>Best-of roundups</SectionTitle>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Every tool listed with its price, platform, and limits, checked
              against the vendor&apos;s own site on {GUIDES_UPDATED_LABEL}. For
              one-on-one breakdowns, see the{" "}
              <Link href="/compare" className="underline underline-offset-4">
                comparisons
              </Link>
              .
            </p>
            <div className="mt-5">
              <LinkCardGrid
                columns={2}
                items={roundups.map((guide) => ({ ...toCard(guide), eyebrow: "Roundup" }))}
              />
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
