/**
 * A link to a part of a page that sits in a closed fold (<details>, the
 * simpler pages of 2026-11-27) opens the fold first, so "#who" on a Bible
 * book lands on the open note and not on a closed row. On arrival with a
 * hash, on a hash change, and on a tap of an in-page link (before the
 * browser scrolls, so it scrolls to the opened part).
 */
import { useEffect } from "react";

/** Open the <details> an id names, and every fold it sits inside. True when the id is on the page. */
export function openFoldFor(id: string): boolean {
  if (!id || typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  for (let n: HTMLElement | null = el; n; n = n.parentElement) {
    if (n instanceof HTMLDetailsElement && !n.open) n.open = true;
  }
  return true;
}

function hashId(hash: string): string {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}

/** Keep the page's folds open to whatever its address, or an in-page link, points at. */
export function useOpenFolds(ready = true) {
  useEffect(() => {
    if (!ready) return;
    const arrive = () => {
      const id = hashId(window.location.hash);
      if (id && openFoldFor(id)) document.getElementById(id)?.scrollIntoView?.({ block: "start" });
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (a) openFoldFor(hashId(a.getAttribute("href") ?? ""));
    };
    arrive();
    window.addEventListener("hashchange", arrive);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", arrive);
      document.removeEventListener("click", onClick, true);
    };
  }, [ready]);
}
