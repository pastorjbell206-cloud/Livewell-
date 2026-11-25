/**
 * After an in-app link to an address with a hash (/tools#self-checks,
 * /theology/history#timeline), bring the named part of the page into view.
 *
 * wouter moves with pushState, which fires no hashchange and does no
 * scrolling, and the page it opens may still be loading. So: tell the page the
 * hash changed (church history switches its tab on that), then wait for the
 * element to exist, up to a few seconds, and scroll it to the top.
 *
 * On a prerendered page the real page is laid out hidden under the held text
 * (lib/prerender-hold.ts) and takes its own place only when that text is
 * removed. Scrolled to before then, a section of a long page (/wisdom/money
 * #misread) landed about 540px below where its heading should sit. So the
 * scroll also waits until no held text remains.
 */
import { HELD_ID } from "./prerender-hold";

export function followHash(href: string): void {
  if (typeof window === "undefined") return;
  const i = href.indexOf("#");
  if (i < 0) return;
  const id = decodeURIComponent(href.slice(i + 1));
  if (!id) return;
  const started = Date.now();
  let told = false;
  const tick = () => {
    if (!told && window.location.hash === `#${id}`) {
      told = true;
      try {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } catch {
        window.dispatchEvent(new Event("hashchange"));
      }
    }
    const el = document.getElementById(id);
    if (el && !document.getElementById(HELD_ID)) {
      el.scrollIntoView({ block: "start" });
      return;
    }
    if (Date.now() - started < 7000) window.setTimeout(tick, 80);
  };
  window.setTimeout(tick, 0);
}

/**
 * A jump inside a page whose sections are still arriving. A chapter's notes
 * load as they near the screen and push what is below them down, so a plain
 * #plain link landed two screens short of "Passage by passage" on a phone.
 * This keeps the named part at the top (at its own scroll-margin) until the
 * page stops growing, for a few seconds at most, and lets go the moment the
 * reader scrolls, touches or presses a key.
 */
export function holdInView(id: string, ms = 4000): void {
  if (typeof window === "undefined") return;
  const started = Date.now();
  let moved = false;
  const stop = () => {
    moved = true;
  };
  window.addEventListener("wheel", stop, { once: true, passive: true });
  window.addEventListener("touchmove", stop, { once: true, passive: true });
  window.addEventListener("keydown", stop, { once: true });
  const tick = () => {
    if (moved || Date.now() - started > ms) return;
    const el = document.getElementById(id);
    if (el) {
      const want = parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0;
      if (Math.abs(el.getBoundingClientRect().top - want) > 24) el.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
    }
    window.setTimeout(tick, 250);
  };
  window.setTimeout(tick, 600);
}
