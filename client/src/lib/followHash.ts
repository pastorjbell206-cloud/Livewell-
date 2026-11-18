/**
 * After an in-app link to an address with a hash (/tools#self-checks,
 * /theology/history#timeline), bring the named part of the page into view.
 *
 * wouter moves with pushState, which fires no hashchange and does no
 * scrolling, and the page it opens may still be loading. So: tell the page the
 * hash changed (church history switches its tab on that), then wait for the
 * element to exist, up to a few seconds, and scroll it to the top.
 */
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
    if (el) {
      el.scrollIntoView({ block: "start" });
      return;
    }
    if (Date.now() - started < 4000) window.setTimeout(tick, 80);
  };
  window.setTimeout(tick, 0);
}
