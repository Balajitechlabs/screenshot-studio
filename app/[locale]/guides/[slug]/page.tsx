import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import {
  AnswerCard,
  CTA_CLASS,
  CtaBand,
  LinkCardGrid,
} from "@/components/seo/ContentBlocks";
import { SectionTitle, ToolFaq, ToolHero } from "@/components/tools/ToolLayout";
import { CARD_CLASS, INTER } from "@/components/tools/ui";
import {
  GUIDES_UPDATED_LABEL,
  formatGuideDate,
  getGuide,
  guideUpdated,
  guides,
  type Guide,
  type GuideTool,
  type HowToGuide,
  type RoundupGuide,
} from "@/lib/seo/guides";
import { PERSON_ID } from "@/lib/seo/json-ld";
import { OG_DEFAULTS, SITE_URL } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: { absolute: guide.title },
    description: guide.metaDescription,
    keywords: guide.keywords,
    openGraph: {
      ...OG_DEFAULTS,
      type: "article",
      title: guide.title,
      description: guide.metaDescription,
      url: `/guides/${guide.slug}`,
    },
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
  };
}

function absoluteUrl(url: string): string {
  return url.startsWith("/") ? `${SITE_URL}${url}` : url;
}

function ToolLink({ tool }: { tool: GuideTool }): React.JSX.Element {
  if (tool.url.startsWith("/")) {
    return (
      <Link href={tool.url} className="underline-offset-4 hover:underline">
        {tool.name}
      </Link>
    );
  }
  return (
    <a
      href={tool.url}
      rel="nofollow noopener"
      className="underline-offset-4 hover:underline"
    >
      {tool.name}
    </a>
  );
}

function RoundupBody({ guide }: { guide: RoundupGuide }): React.JSX.Element {
  return (
    <>
      <section>
        <SectionTitle>Quick comparison</SectionTitle>
        <div className={cn(CARD_CLASS, "mt-5 overflow-x-auto")}>
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Tool", "Best for", "Price", "Runs on"].map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="px-5 py-4 text-left font-medium text-muted-foreground"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.tools.map((tool) => (
                <tr
                  key={tool.name}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-left font-semibold text-foreground"
                  >
                    {tool.name}
                  </th>
                  <td className="px-5 py-3.5 text-muted-foreground">{tool.bestFor}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{tool.price}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{tool.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionTitle>The picks</SectionTitle>
        <ol className="mt-5 flex flex-col gap-3">
          {guide.tools.map((tool, index) => (
            <li key={tool.name} className={cn(CARD_CLASS, "p-6 sm:p-7")}>
              <article>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-sm font-semibold text-foreground ring-1 ring-border">
                    {index + 1}
                  </span>
                  <h2
                    className="text-xl font-semibold tracking-[-0.02em] text-foreground"
                    style={{ fontFamily: INTER }}
                  >
                    <ToolLink tool={tool} />
                  </h2>
                  <span className="rounded-full bg-foreground/[0.04] px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border">
                    {tool.bestFor}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {tool.summary}
                </p>
                <dl className="mt-5 grid gap-x-6 gap-y-2 border-t border-border pt-5 text-sm sm:grid-cols-[7rem_1fr]">
                  <dt className="font-medium text-foreground">Price</dt>
                  <dd className="text-muted-foreground">{tool.price}</dd>
                  <dt className="font-medium text-foreground">Runs on</dt>
                  <dd className="text-muted-foreground">{tool.platform}</dd>
                  <dt className="font-medium text-foreground">Limitations</dt>
                  <dd className="text-muted-foreground">{tool.limitations}</dd>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className={cn(CARD_CLASS, "p-6 sm:p-8")}>
        <SectionTitle>How we picked</SectionTitle>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {guide.criteria} Every detail comes from each vendor&apos;s own site
          or repository, checked on {GUIDES_UPDATED_LABEL}. Plans change
          without notice, so confirm current pricing before you decide.
        </p>
      </section>
    </>
  );
}

function HowToBody({ guide }: { guide: HowToGuide }): React.JSX.Element {
  return (
    <>
      <section>
        <SectionTitle>Step by step</SectionTitle>
        <ol className="mt-5 flex flex-col gap-3">
          {guide.steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(CARD_CLASS, "flex gap-4 p-5 sm:gap-5 sm:p-6")}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-sm font-semibold text-foreground ring-1 ring-border">
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link href={guide.cta.href} className={CTA_CLASS}>
            {guide.cta.label}
          </Link>
        </div>
      </section>

      <div className="flex max-w-3xl flex-col gap-12">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <SectionTitle>{section.heading}</SectionTitle>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground/50">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <section>
        <SectionTitle>Tools used in this guide</SectionTitle>
        <div className="mt-5">
          <LinkCardGrid
            items={guide.related.map((link) => ({
              href: link.href,
              title: link.label,
            }))}
          />
        </div>
      </section>
    </>
  );
}

function moreGuidesFor(guide: Guide): Guide[] {
  const sameKind = guides.filter(
    (g) => g.slug !== guide.slug && g.kind === guide.kind,
  );
  const otherKind = guides.filter((g) => g.kind !== guide.kind);
  return [...sameKind, ...otherKind].slice(0, 6);
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  const updated = guideUpdated(guide);
  const isRoundup = guide.kind === "roundup";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl },
        ],
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: guide.title,
        description: guide.metaDescription,
        datePublished: updated,
        dateModified: updated,
        author: { "@id": PERSON_ID },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: pageUrl,
      },
      ...(isRoundup
        ? [
            {
              "@type": "ItemList",
              name: guide.title,
              itemListElement: guide.tools.map((tool, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: tool.name,
                url: absoluteUrl(tool.url),
              })),
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
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
              parent={{ href: "/guides", label: "Guides" }}
              name={isRoundup ? "Roundup" : "How-to"}
              title={guide.title}
              intro={guide.metaDescription}
            >
              <p className="mt-5 text-xs text-muted-foreground/80">
                Updated <time dateTime={updated}>{formatGuideDate(updated)}</time>{" "}
                by{" "}
                <Link href="/about" className="underline underline-offset-4">
                  Kartik Labhshetwar
                </Link>
                , maker of Screenshot Studio
              </p>
            </ToolHero>

            <AnswerCard label="Short answer">
              <p>{guide.answer}</p>
              {isRoundup ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Screenshot Studio is our product. Every other tool is listed
                  on its merits, with details checked against the
                  vendor&apos;s own site.
                </p>
              ) : null}
            </AnswerCard>
          </div>

          {isRoundup ? <RoundupBody guide={guide} /> : <HowToBody guide={guide} />}

          <ToolFaq
            faqs={guide.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))}
          />

          <section>
            <SectionTitle>More guides</SectionTitle>
            <div className="mt-5">
              <LinkCardGrid
                items={moreGuidesFor(guide).map((g) => ({
                  href: `/guides/${g.slug}`,
                  eyebrow: g.kind === "roundup" ? "Roundup" : "How-to",
                  title: g.title,
                  description: g.metaDescription,
                }))}
              />
            </div>
          </section>

          <CtaBand
            title="Try Screenshot Studio free"
            description="Edit, annotate, and polish screenshots in your browser. No signup, no download, no watermark."
            href={isRoundup ? "/editor" : guide.cta.href}
            label={isRoundup ? "Open Free Editor" : guide.cta.label}
          />
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
