/**
 * Motion preference for JS-driven scrolling.
 *
 * CSS animations and anchor scrolling honor prefers-reduced-motion through the
 * global guard in index.css, but scrollTo/scrollIntoView calls that pass an
 * explicit `behavior` override the CSS — so they ask here instead. Wrapped in
 * try/catch for environments without matchMedia (jsdom, very old browsers),
 * where the answer defaults to smooth being fine.
 */
export function prefersReducedMotion(): boolean {
  try {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** The behavior to pass to scrollTo/scrollIntoView: smooth unless the reader opted out of motion. */
export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}
