import { Add01Icon, LockIcon } from "hugeicons-react";
import { gradientColors } from "@/lib/constants/gradient-colors";
import { cn } from "@/lib/utils";

export const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export const MONO = "var(--font-geist-mono), ui-monospace, monospace";

export const CARD_CLASS =
  "rounded-2xl bg-card ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)]";

export const DROP_CARD_CLASS =
  "group block w-full cursor-pointer rounded-2xl bg-card p-2 text-center ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)] transition-shadow duration-200 hover:ring-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 disabled:cursor-not-allowed disabled:opacity-50";

export const PREVIEW_SHADOW = "shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]";

export const MOTION =
  "duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

/** macOS-style traffic light dots for preview window chrome. */
export function WindowDots() {
  return (
    <span className="flex gap-1.5">
      <span className="size-2 rounded-full bg-[#ff5f57]" />
      <span className="size-2 rounded-full bg-[#febc2e]" />
      <span className="size-2 rounded-full bg-[#28c840]" />
    </span>
  );
}

const EASE = "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

function PhotoTile({
  gradient,
  className,
}: {
  gradient: string;
  className: string;
}) {
  return (
    <span
      className={cn(
        "absolute inset-0 m-auto block size-12 overflow-hidden rounded-lg ring-2 ring-card",
        EASE,
        className,
      )}
      style={{ background: gradient }}
    >
      <span className="absolute right-2 top-2 size-2 rounded-full bg-white/80" />
    </span>
  );
}

/** Inner well and footer of a drop target; the caller owns the element and its events. */
export function DropSurface({
  active,
  title,
  detail,
  action,
  formats,
}: {
  active: boolean;
  title: string;
  detail: string;
  action: string;
  formats: string;
}) {
  return (
    <>
      <span
        className={cn(
          "relative flex flex-col items-center overflow-hidden rounded-xl px-6 py-14 transition-colors duration-200 sm:py-20",
          active ? "bg-foreground/[0.06]" : "bg-background/70",
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          style={{
            backgroundImage:
              "radial-gradient(var(--border) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <span aria-hidden="true" className="relative block h-16 w-32">
          <PhotoTile
            gradient={gradientColors.orange_pink_dark}
            className={
              active
                ? "-translate-x-[80%] -rotate-[18deg]"
                : "-translate-x-[58%] translate-y-1 -rotate-12 group-hover:-translate-x-[80%] group-hover:translate-y-0 group-hover:-rotate-[18deg]"
            }
          />
          <PhotoTile
            gradient={gradientColors.store_ocean}
            className={
              active
                ? "translate-x-[80%] rotate-[18deg]"
                : "translate-x-[58%] translate-y-1 rotate-12 group-hover:translate-x-[80%] group-hover:translate-y-0 group-hover:rotate-[18deg]"
            }
          />
          <span
            className={cn(
              "absolute inset-0 m-auto flex size-14 items-center justify-center rounded-xl bg-white text-neutral-900 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.6)]",
              EASE,
              active ? "-translate-y-1.5 scale-105" : "group-hover:-translate-y-1",
            )}
          >
            <Add01Icon size={22} />
          </span>
        </span>
        <span
          className="relative mt-7 block text-lg font-semibold tracking-[-0.02em] text-foreground"
          style={{ fontFamily: INTER }}
        >
          {title}
        </span>
        <span className="relative mt-1 block text-sm text-muted-foreground">
          {detail}
        </span>
        <span className="relative mt-6 inline-flex h-9 items-center rounded-full bg-[var(--nav-cta-bg)] px-4 text-sm font-medium text-[var(--nav-cta-fg)] transition-shadow duration-200 [text-shadow:var(--nav-cta-text-shadow)] group-hover:shadow-[var(--nav-cta-hover-shadow)]">
          {action}
        </span>
      </span>
      <span className="flex flex-col items-center justify-between gap-1 px-3 pb-1 pt-2.5 text-xs text-muted-foreground sm:flex-row">
        <span>{formats}</span>
        <span className="inline-flex items-center gap-1.5">
          <LockIcon size={13} aria-hidden="true" />
          Stays on your device, never uploaded
        </span>
      </span>
    </>
  );
}
