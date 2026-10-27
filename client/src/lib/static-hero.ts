/**
 * Mount the app only once the static home hero's paint has been recorded.
 *
 * scripts/prerender-heads.mjs writes the home hero into the HTML of "/" so
 * the largest paint on the front page is the first paint. But when the
 * bundle arrives quickly (a fast connection, or a cached bundle on a return
 * visit), React replaced that HTML within a frame of its first paint, before
 * Chrome had recorded when the frame reached the screen. Chrome then drops
 * the static paragraph as a Largest Contentful Paint candidate and counts
 * React's identical copy instead, so LCP waits on the whole bundle. That is
 * why the home Lighthouse step failed on main (performance 73 to 88; U08).
 *
 * So on "/", where the static hero is the real page, wait for an LCP entry
 * inside it. It is usually already buffered by the time the bundle runs;
 * otherwise it comes a frame or two later; never wait longer than
 * `maxWaitMs`. Every other path mounts at once: vercel.json serves the home
 * HTML (hero included) for any path without its own prerendered file, and
 * there the hero must not be held on screen. A browser without LCP, and a tab
 * that is not visible (which reports no LCP), mount at once too.
 */
export interface StaticHeroOptions {
  doc?: Document;
  path?: string;
  Observer?: typeof PerformanceObserver;
  maxWaitMs?: number;
}

/** The static hero's root, present only in the prerendered "/" before mount. */
export const STATIC_HERO_SELECTOR = "#lw-shell .home-hero";

export function mountAfterStaticHero(mount: () => void, options: StaticHeroOptions = {}): void {
  const doc = options.doc ?? document;
  const path = options.path ?? doc.location?.pathname ?? "";
  const Observer =
    options.Observer ?? (typeof PerformanceObserver === "undefined" ? undefined : PerformanceObserver);
  const maxWaitMs = options.maxWaitMs ?? 300;

  const hero = doc.querySelector(STATIC_HERO_SELECTOR);
  const lcpSupported = Observer?.supportedEntryTypes?.includes("largest-contentful-paint") ?? false;
  if (path !== "/" || !hero || !Observer || !lcpSupported || doc.visibilityState !== "visible") {
    mount();
    return;
  }

  let done = false;
  let observer: PerformanceObserver | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const go = () => {
    if (done) return;
    done = true;
    observer?.disconnect();
    if (timer !== null) clearTimeout(timer);
    mount();
  };

  try {
    observer = new Observer((list) => {
      const painted = list
        .getEntries()
        .some((entry) => {
          const el = (entry as LargestContentfulPaint).element;
          return el != null && hero.contains(el);
        });
      if (painted) go();
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    go();
    return;
  }
  timer = setTimeout(go, maxWaitMs);
}
