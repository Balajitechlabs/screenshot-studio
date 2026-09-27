import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { Tick02Icon, Cancel01Icon } from "hugeicons-react";
import {
  AnswerCard,
  CTA_CLASS,
  CtaBand,
  LinkCardGrid,
  SECONDARY_CTA_CLASS,
} from "@/components/seo/ContentBlocks";
import { SectionTitle, ToolFaq, ToolHero } from "@/components/tools/ToolLayout";
import { CARD_CLASS } from "@/components/tools/ui";
import {
  comparisons,
  getComparison,
  getAllComparisonSlugs,
  getComparisonTitle,
  claimsNote,
  type ComparisonData,
} from "@/lib/seo/comparisons";
import { guides } from "@/lib/seo/guides";
import { OG_DEFAULTS, SITE_URL } from "@/lib/seo/metadata";
import { PRODUCT_FACTS } from "@/lib/seo/product-facts";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) return {};

  const title = getComparisonTitle(data);

  return {
    title: { absolute: title },
    description: data.metaDescription,
    keywords: data.keywords,
    openGraph: {
      ...OG_DEFAULTS,
      title,
      description: data.metaDescription,
      url: `/compare/${data.slug}`,
    },
    alternates: {
      canonical: `/compare/${data.slug}`,
    },
  };
}

const UNAVAILABLE_VALUES = ["not available", "not listed"];

function FeatureValue({ value }: { value: string }): React.JSX.Element {
  if (!UNAVAILABLE_VALUES.includes(value.toLowerCase())) return <>{value}</>;
  return (
    <span className="inline-flex items-center gap-2 text-muted-foreground/80">
      <Cancel01Icon size={15} strokeWidth={1.75} aria-hidden="true" />
      {value}
    </span>
  );
}

function SideCard({
  name,
  pricing,
  heading,
  points,
  featured,
}: {
  name: string;
  pricing: string;
  heading: string;
  points: string[];
  featured?: boolean;
}): React.JSX.Element {
  const Icon = featured ? Tick02Icon : Cancel01Icon;
  return (
    <div
      className={cn(
        CARD_CLASS,
        "flex flex-col p-6 sm:p-7",
        featured && "bg-foreground/[0.03] ring-foreground/15",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
          {name}
        </h2>
        {featured ? (
          <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-border">
            Free forever
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{pricing}</p>
      <p className="mt-6 border-t border-border pt-5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {heading}
      </p>
      <ul className="mt-3 space-y-2.5">
        {points.map((point) => (
          <li
            key={point}
            className={cn(
              "flex items-start gap-2.5 text-[15px] leading-snug",
              featured ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <Icon
              size={17}
              strokeWidth={1.75}
              aria-hidden="true"
              className={cn(
                "mt-0.5 shrink-0",
                featured ? "text-foreground" : "text-muted-foreground/70",
              )}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function relatedGuidesFor(data: ComparisonData) {
  return guides.filter(
    (guide) =>
      guide.kind === "roundup" &&
      guide.tools.some((tool) => tool.name === data.competitorName),
  );
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) notFound();

  const otherComparisons = comparisons.filter((c) => c.slug !== slug);
  const relatedGuides = relatedGuidesFor(data);
  const cta = data.cta ?? { href: "/editor", label: "Try Screenshot Studio Free" };
  const pageUrl = `${SITE_URL}/compare/${data.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
          { "@type": "ListItem", position: 3, name: `vs ${data.competitorName}`, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "WebPage",
        name: getComparisonTitle(data),
        description: data.metaDescription,
        url: pageUrl,
        mainEntity: {
          "@type": "SoftwareApplication",
          name: "Screenshot Studio",
          applicationCategory: "DesignApplication",
          operatingSystem: "Any (Web Browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />

      <main className="flex-1 px-6 pb-20 pt-32">
        <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-20">
          <div className="flex flex-col gap-10">
            <ToolHero
              parent={{ href: "/compare", label: "Compare" }}
              name={`vs ${data.competitorName}`}
              title={`Screenshot Studio vs ${data.competitorName}`}
              intro={data.tagline}
            >
              <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <Link href={cta.href} className={CTA_CLASS}>
                  {cta.label}
                </Link>
                <a href="#features" className={SECONDARY_CTA_CLASS}>
                  See the feature table
                </a>
              </div>
            </ToolHero>

            <AnswerCard label="The verdict">
              {data.scopeNote ? (
                <p className="mb-3 text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    These tools do different jobs.
                  </strong>{" "}
                  {data.scopeNote}
                </p>
              ) : null}
              <p>{data.verdict}</p>
            </AnswerCard>
          </div>

          <section aria-label="At a glance" className="grid gap-3 md:grid-cols-2">
            <SideCard
              featured
              name="Screenshot Studio"
              pricing={`Free, open source (${PRODUCT_FACTS.license}), runs in any browser`}
              heading="Where it wins"
              points={data.studioAdvantages}
            />
            <SideCard
              name={data.competitorName}
              pricing={data.competitorPricing}
              heading="Limitations"
              points={data.competitorLimitations}
            />
          </section>

          <section id="features" className="scroll-mt-28">
            <SectionTitle>Feature by feature</SectionTitle>
            <div className={cn(CARD_CLASS, "mt-5 overflow-x-auto")}>
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th
                      scope="col"
                      className="w-[30%] px-5 py-4 text-left font-medium text-muted-foreground"
                    >
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="bg-foreground/[0.03] px-5 py-4 text-left font-semibold text-foreground"
                    >
                      Screenshot Studio
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-left font-semibold text-foreground"
                    >
                      {data.competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.features.map((feature) => (
                    <tr
                      key={feature.name}
                      className="border-b border-border/60 last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="px-5 py-3.5 text-left font-medium text-foreground"
                      >
                        {feature.name}
                      </th>
                      <td className="bg-foreground/[0.03] px-5 py-3.5 text-foreground">
                        <FeatureValue value={feature.studio} />
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        <FeatureValue value={feature.competitor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
              {claimsNote(data)}{" "}
              <a
                href={data.competitorUrl}
                rel="nofollow noopener"
                className="underline underline-offset-4"
              >
                Visit {data.competitorName}
              </a>
            </p>
          </section>

          <ToolFaq
            faqs={data.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))}
          />

          {relatedGuides.length > 0 ? (
            <section>
              <SectionTitle>Related guides</SectionTitle>
              <div className="mt-5">
                <LinkCardGrid
                  columns={2}
                  items={relatedGuides.map((guide) => ({
                    href: `/guides/${guide.slug}`,
                    eyebrow: "Guide",
                    title: guide.title,
                    description: guide.metaDescription,
                  }))}
                />
              </div>
            </section>
          ) : null}

          <section>
            <SectionTitle>Other comparisons</SectionTitle>
            <div className="mt-5">
              <LinkCardGrid
                items={otherComparisons.map((comp) => ({
                  href: `/compare/${comp.slug}`,
                  eyebrow: "Screenshot Studio vs",
                  title: comp.competitorName,
                  description: comp.tagline,
                }))}
              />
            </div>
          </section>

          <CtaBand
            title="Try it on your own screenshot"
            description={
              data.cta
                ? "No signup. No uploads. No watermarks. See the result in seconds."
                : "No signup, no download, and no watermark. Open the editor and compare for yourself."
            }
            href={cta.href}
            label={data.cta ? cta.label : "Open Free Editor"}
          />
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
