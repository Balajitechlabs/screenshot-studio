"use client";

import { useEffect, useState } from "react";
import { MONO } from "@/components/tools/ui";
import { cn } from "@/lib/utils";

/** Sticky "On this page" list that highlights the section in view. */
export function GuideToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const update = (): void => {
      let current = items[0]?.id;
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.3) {
          current = item.id;
        }
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p
        className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground/70"
        style={{ fontFamily: MONO }}
      >
        On this page
      </p>
      <ul className="mt-4 flex flex-col border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors",
                active === item.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
