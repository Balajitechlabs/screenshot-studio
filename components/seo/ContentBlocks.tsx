import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { CARD_CLASS, INTER } from "@/components/tools/ui";
import { cn } from "@/lib/utils";

export const CTA_CLASS =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-base font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

export const SECONDARY_CTA_CLASS =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground";

export interface LinkCardItem {
  href: string;
  title: string;
  eyebrow?: string;
  description?: string;
  meta?: string;
}

/** Grid of linked cards used by the compare and guide hubs and their related-content rows. */
export function LinkCardGrid({
  items,
  columns = 3,
}: {
  items: LinkCardItem[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            CARD_CLASS,
            "group flex flex-col p-5 transition-shadow duration-200 hover:ring-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70",
          )}
        >
          {item.eyebrow ? (
            <span className="mb-1.5 text-xs font-medium text-muted-foreground">
              {item.eyebrow}
            </span>
          ) : null}
          <span className="flex items-start justify-between gap-3 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
            {item.title}
            <ArrowRight01Icon
              size={16}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </span>
          {item.description ? (
            <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </span>
          ) : null}
          {item.meta ? (
            <span className="mt-auto pt-4 text-xs text-muted-foreground/80">
              {item.meta}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

/** Highlighted short answer shown right under a page hero. */
export function AnswerCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className={cn(CARD_CLASS, "mx-auto w-full max-w-3xl p-6 sm:p-8")}
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 text-base leading-relaxed text-foreground/90 sm:text-[17px]">
        {children}
      </div>
    </section>
  );
}

/** Closing call-to-action card shared by the compare and guide pages. */
export function CtaBand({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <section
      className={cn(
        CARD_CLASS,
        "px-6 py-12 text-center sm:px-10 sm:py-16",
      )}
    >
      <h2
        className="landing-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
        style={{ fontFamily: INTER }}
      >
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        {description}
      </p>
      <Link href={href} className={cn(CTA_CLASS, "mt-8")}>
        {label}
      </Link>
      <p className="mt-4 text-xs text-muted-foreground/70">
        Free forever · No signup · No watermark
      </p>
    </section>
  );
}
