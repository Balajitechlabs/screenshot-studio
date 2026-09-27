import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { CTA_CLASS, CtaBand } from "@/components/seo/ContentBlocks";
import { GuideCard } from "@/components/seo/GuideCards";
import { GuideToc } from "@/components/seo/GuideToc";
import { SectionTitle, ToolFaq } from "@/components/tools/ToolLayout";
import { INTER, MONO } from "@/components/tools/ui";
import {
  GUIDES_UPDATED_LABEL,
  formatGuideDate,
  getGuide,
  guideCover,
  guideUpdated,
  guides,
  readingMinutes,
  type Guide,
  type GuideTool,
  type HowToGuide,
  type RoundupGuide,
} from "@/lib/seo/guides";
import { PERSON_ID } from "@/lib/seo/json-ld";
import { OG_DEFAULTS, SITE_URL } from "@/lib/seo/metadata";

const PROSE = "text-[17px] leading-[1.75] text-foreground/85";

const EYEBROW = "text-[11px] uppercase tracking-[0.08em] text-muted-foreground";

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

function anchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function tocFor(guide: Guide): { id: string; label: string }[] {
  const body =
    guide.kind === "roundup"
      ? [
          { id: "comparison", label: "Quick comparison" },
          ...guide.tools.map((tool, index) => ({
            id: anchorId(tool.name),
            label: `${index + 1}. ${tool.name}`,
          })),
          { id: "method", label: "How we picked" },
        ]
      : [
          { id: "steps", label: "Step by step" },
          ...guide.sections.map((section) => ({
            id: anchorId(section.heading),
            label: section.heading,
          })),
          { id: "tools", label: "Tools used" },
        ];
  return [{ id: "answer", label: "Short answer" }, ...body, { id: "faq", label: "FAQ" }];
}

function VisitLink({ tool }: { tool: GuideTool }): React.JSX.Element {
  const className =
    "inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline";
  if (tool.url.startsWith("/")) {
    return (
      <Link href={tool.url} className={className}>
        Try it free
        <ArrowRight01Icon aria-hidden="true" className="size-3.5" />
      </Link>
    );
  }
  return (
    <a href={tool.url} rel="nofollow noopener" className={className}>
      Visit {new URL(tool.url).hostname.replace(/^www\./, "")}
      <ArrowUpRight01Icon aria-hidden="true" className="size-3.5" />
    </a>
  );
}

function RoundupBody({ guide }: { guide: RoundupGuide }): React.JSX.Element {
  return (
    <>
      <section id="comparison" className="scroll-mt-28">
        <SectionTitle>Quick comparison</SectionTitle>
        <div className="mt-5 overflow-x-auto rounded-2xl ring-1 ring-inset ring-border">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-foreground/[0.03]">
              <tr>
                {["Tool", "Best for", "Price", "Runs on"].map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className={`${EYEBROW} px-4 py-3 font-normal`}
                    style={{ fontFamily: MONO }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.tools.map((tool) => (
                <tr key={tool.name} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3.5 font-medium text-foreground">
                    <a
                      href={`#${anchorId(tool.name)}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {tool.name}
                    </a>
                  </th>
                  <td className="px-4 py-3.5 text-foreground/75">{tool.bestFor}</td>
                  <td className="px-4 py-3.5 text-foreground/75">{tool.price}</td>
                  <td className="px-4 py-3.5 text-foreground/75">{tool.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {guide.tools.map((tool, index) => (
        <section
          key={tool.name}
          id={anchorId(tool.name)}
          className="scroll-mt-28 border-t border-border pt-10"
        >
          <p className={EYEBROW} style={{ fontFamily: MONO }}>
            Pick {index + 1} of {guide.tools.length} · Best for {tool.bestFor.toLowerCase()}
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-foreground"
            style={{ fontFamily: INTER }}
          >
            {tool.name}
          </h2>
          <p className={`mt-4 ${PROSE}`}>{tool.summary}</p>
          <dl className="mt-6 flex flex-col rounded-xl ring-1 ring-inset ring-border">
            {[
              ["Price", tool.price],
              ["Runs on", tool.platform],
              ["Limitations", tool.limitations],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-t border-border px-4 py-3 first:border-t-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
              >
                <dt className={`${EYEBROW} pt-0.5`} style={{ fontFamily: MONO }}>
                  {label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-foreground/85">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <VisitLink tool={tool} />
          </div>
        </section>
      ))}

      <section id="method" className="scroll-mt-28 border-t border-border pt-10">
        <SectionTitle>How we picked</SectionTitle>
        <p className={`mt-4 ${PROSE}`}>
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
      <section id="steps" className="scroll-mt-28">
        <SectionTitle>Step by step</SectionTitle>
        <ol className="mt-7 flex flex-col">
          {guide.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex gap-5 pb-9 before:absolute before:bottom-1 before:left-4 before:top-10 before:w-px before:bg-border last:pb-0 last:before:hidden"
            >
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-card text-[13px] text-foreground ring-1 ring-inset ring-border"
                style={{ fontFamily: MONO }}
              >
                {index + 1}
              </span>
              <div className="min-w-0 pt-1">
                <h3
                  className="text-[17px] font-semibold tracking-[-0.01em] text-foreground"
                  style={{ fontFamily: INTER }}
                >
                  {step.title}
                </h3>
                <p className={`mt-2 ${PROSE}`}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-9 pl-[3.25rem]">
          <Link href={guide.cta.href} className={CTA_CLASS}>
            {guide.cta.label}
          </Link>
        </div>
      </section>

      {guide.sections.map((section) => (
        <section
          key={section.heading}
          id={anchorId(section.heading)}
          className="scroll-mt-28 border-t border-border pt-10"
        >
          <SectionTitle>{section.heading}</SectionTitle>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 ${PROSE}`}>
              {paragraph}
            </p>
          ))}
          {section.bullets ? (
            <ul
              className={`mt-4 flex list-disc flex-col gap-2.5 pl-5 marker:text-muted-foreground/60 ${PROSE}`}
            >
              {section.bullets.map((bullet) => (
                <li key={bullet} className="pl-1">
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section id="tools" className="scroll-mt-28 border-t border-border pt-10">
        <SectionTitle>Tools used in this guide</SectionTitle>
        <ul className="mt-5 flex flex-wrap gap-2">
          {guide.related.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3.5 py-2 text-sm text-foreground ring-1 ring-inset ring-border transition-colors hover:bg-foreground/[0.08]"
              >
                {link.label}
                <ArrowRight01Icon aria-hidden="true" className="size-3.5 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function moreGuidesFor(guide: Guide): Guide[] {
  const rank = (g: Guide): number =>
    (g.kind === guide.kind ? 0 : 2) +
    (g.kind === "how-to" && guide.kind === "how-to" && g.topic === guide.topic ? 0 : 1);
  return guides
    .filter((g) => g.slug !== guide.slug)
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, 3);
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  const updated = guideUpdated(guide);
  const isRoundup = guide.kind === "roundup";
  const cover = guideCover(guide.slug);

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
        image: absoluteUrl(cover),
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

      <main className="flex-1 px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto flex max-w-5xl flex-col gap-20 sm:gap-24">
          <article>
            <header className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
                <span aria-hidden="true" className="mx-1.5">/</span>
                <Link href="/guides" className="transition-colors hover:text-foreground">
                  Guides
                </Link>
                <span aria-hidden="true" className="mx-1.5">/</span>
                <span aria-current="page" className="text-foreground">
                  {isRoundup ? "Roundup" : "How-to"}
                </span>
              </nav>
              <h1
                className="mt-5 text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-5xl"
                style={{ fontFamily: INTER }}
              >
                {guide.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {guide.metaDescription}
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span className="max-sm:w-full">
                  By{" "}
                  <Link
                    href="/about"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Kartik Labhshetwar
                  </Link>
                  , maker of Screenshot Studio
                </span>
                <span aria-hidden="true" className="max-sm:hidden">
                  ·
                </span>
                <span>
                  Updated <time dateTime={updated}>{formatGuideDate(updated)}</time>
                </span>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes(guide)} min read</span>
              </p>
            </header>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-card ring-1 ring-inset ring-border sm:aspect-[2/1]">
              <Image
                src={cover}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-[minmax(0,42rem)_13rem] lg:justify-between">
              <div className="flex min-w-0 flex-col gap-12">
                <section
                  id="answer"
                  className="scroll-mt-28 rounded-2xl bg-card p-6 ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)] sm:p-7"
                >
                  <p className={EYEBROW} style={{ fontFamily: MONO }}>
                    Short answer
                  </p>
                  <p className="mt-3 text-[17px] leading-[1.7] text-foreground">
                    {guide.answer}
                  </p>
                  {isRoundup ? (
                    <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                      Screenshot Studio is our product. Every other tool is
                      listed on its merits, with details checked against the
                      vendor&apos;s own site.
                    </p>
                  ) : null}
                </section>

                {isRoundup ? <RoundupBody guide={guide} /> : <HowToBody guide={guide} />}

                <div id="faq" className="scroll-mt-28 border-t border-border pt-10">
                  <ToolFaq
                    faqs={guide.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))}
                  />
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <GuideToc items={tocFor(guide)} />
                </div>
              </aside>
            </div>
          </article>

          <section>
            <SectionTitle>More guides</SectionTitle>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {moreGuidesFor(guide).map((g) => (
                <GuideCard
                  key={g.slug}
                  guide={g}
                  sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
                />
              ))}
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
