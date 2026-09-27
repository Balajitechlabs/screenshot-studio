import type { Metadata } from "next";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { CtaBand, LinkCardGrid } from "@/components/seo/ContentBlocks";
import { SectionTitle, ToolHero } from "@/components/tools/ToolLayout";
import { CLAIMS_CHECKED_LABEL, comparisons } from "@/lib/seo/comparisons";
import { guides } from "@/lib/seo/guides";
import { buildCollectionJsonLd } from "@/lib/seo/json-ld";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

const TITLE = "Screenshot Studio Alternatives Compared";
const DESCRIPTION =
  "Side-by-side comparisons of Screenshot Studio against Pika Style, Shots.so, CleanShot X, Snagit, Xnapper, Screely, Carbon, Ray.so, and remove.bg.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "screenshot editor comparison",
    "pika style alternative",
    "shots.so alternative",
    "cleanshot x alternative",
    "snagit alternative",
    "xnapper alternative",
    "screely alternative",
    "carbon alternative",
    "ray.so alternative",
    "remove.bg alternative",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} - Screenshot Studio`,
    description: DESCRIPTION,
    url: "/compare",
  },
  alternates: {
    canonical: "/compare",
  },
};

export default function CompareHubPage() {
  const jsonLd = buildCollectionJsonLd(
    "/compare",
    TITLE,
    DESCRIPTION,
    comparisons.map((comparison) => ({
      name: `Screenshot Studio vs ${comparison.competitorName}`,
      url: `/compare/${comparison.slug}`,
    })),
  );
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
            name="Compare"
            title="How Screenshot Studio Compares"
            intro="Honest, feature-by-feature breakdowns against the tools people weigh Screenshot Studio against. Each page lists what the alternative costs, where it is genuinely stronger, and where Screenshot Studio does more for free."
          />

          <section>
            <SectionTitle>Head-to-head comparisons</SectionTitle>
            <div className="mt-5">
              <LinkCardGrid
                items={comparisons.map((comparison) => ({
                  href: `/compare/${comparison.slug}`,
                  eyebrow: "Screenshot Studio vs",
                  title: comparison.competitorName,
                  description: comparison.tagline,
                  meta: `${comparison.competitorName}: ${comparison.competitorPricing}`,
                }))}
              />
            </div>
            <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground/80">
              All competitor pricing and feature details were checked on{" "}
              {CLAIMS_CHECKED_LABEL} against each vendor&apos;s own site.
              Third-party plans change without notice, so confirm current
              pricing before deciding.
            </p>
          </section>

          <section>
            <SectionTitle>Best-of roundups</SectionTitle>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Weighing more than two tools? These guides rank every option,
              including the ones that beat Screenshot Studio at something.
            </p>
            <div className="mt-5">
              <LinkCardGrid
                columns={2}
                items={roundups.map((guide) => ({
                  href: `/guides/${guide.slug}`,
                  eyebrow: "Guide",
                  title: guide.title,
                  description: guide.metaDescription,
                }))}
              />
            </div>
          </section>

          <CtaBand
            title="Rather just try it?"
            description="Open the editor and drop in a screenshot. Every feature is free, with no account and no watermark."
            href="/editor"
            label="Open Free Editor"
          />
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
