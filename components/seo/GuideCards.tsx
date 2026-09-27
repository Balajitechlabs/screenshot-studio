import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { INTER, MONO } from "@/components/tools/ui";
import {
  guideCover,
  guideShortTitle,
  readingMinutes,
  type Guide,
} from "@/lib/seo/guides";
import { cn } from "@/lib/utils";

const COVER_FRAME =
  "relative overflow-hidden bg-card after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-white/10";

const COVER_ZOOM =
  "object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none";

export function guideFacts(guide: Guide): string {
  const count =
    guide.kind === "roundup"
      ? `${guide.tools.length} tools`
      : `${guide.steps.length} steps`;
  return `${count} · ${readingMinutes(guide)} min read`;
}

/** Cover-first card for grids of guides. */
export function GuideCard({
  guide,
  sizes,
  className,
}: {
  guide: Guide;
  sizes: string;
  className?: string;
}) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className={cn(COVER_FRAME, "aspect-[16/9] rounded-2xl")}>
        <Image
          src={guideCover(guide.slug)}
          alt=""
          fill
          sizes={sizes}
          className={COVER_ZOOM}
        />
      </span>
      <span
        className="mt-4 text-[11px] uppercase tracking-[0.06em] text-muted-foreground"
        style={{ fontFamily: MONO }}
      >
        {guideFacts(guide)}
      </span>
      <span
        className="mt-1.5 text-lg font-semibold leading-snug tracking-[-0.015em] text-foreground"
        style={{ fontFamily: INTER }}
      >
        {guideShortTitle(guide)}
      </span>
      <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {guide.metaDescription}
      </span>
    </Link>
  );
}

/** Compact thumbnail row for topic lists. */
export function GuideRow({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex items-center gap-4 rounded-xl py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 sm:gap-6"
    >
      <span
        className={cn(COVER_FRAME, "aspect-[16/9] w-28 shrink-0 rounded-lg sm:w-40")}
      >
        <Image
          src={guideCover(guide.slug)}
          alt=""
          fill
          sizes="160px"
          className={COVER_ZOOM}
        />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className="text-base font-semibold leading-snug tracking-[-0.01em] text-foreground sm:text-[17px]"
          style={{ fontFamily: INTER }}
        >
          {guideShortTitle(guide)}
        </span>
        <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground max-sm:hidden">
          {guide.metaDescription}
        </span>
        <span
          className="mt-2 text-[11px] uppercase tracking-[0.06em] text-muted-foreground/80"
          style={{ fontFamily: MONO }}
        >
          {guideFacts(guide)}
        </span>
      </span>
      <ArrowRight01Icon
        aria-hidden="true"
        className="hidden size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none sm:block"
      />
    </Link>
  );
}
