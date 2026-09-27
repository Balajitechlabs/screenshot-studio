"use client";

import { useEffect } from "react";
import { isAdFreePath } from "@/components/AdSenseScript";

/** Enters editor workspaces from content pages with a full page load so the ads script never carries over. */
export function AdFreeRouteLinks(): null {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download") ||
        anchor.origin !== window.location.origin ||
        !isAdFreePath(anchor.pathname) ||
        isAdFreePath(window.location.pathname)
      ) {
        return;
      }
      event.preventDefault();
      window.location.assign(anchor.href);
    };

    window.addEventListener("click", handleClick, true);
    return () => window.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
