/**
 * Keep a page's prerendered text on screen until the real page is ready.
 *
 * scripts/prerender-heads.mjs writes the text of a chapter, an essay or a
 * guide into the static shell (#lw-shell .prerender-content). React used to
 * erase it on mount and show "One moment. Loading the page..." while the
 * page's own code and data arrived, and then the real page pushed the footer
 * down the screen. On a phone a Study Bible chapter measured a layout shift
 * of 0.6 against Google's limit of 0.1 (docs/work/audit-2026-11, T1).
 *
 * So when the shell holds prerendered text, this lifts the shell out of #root
 * before React mounts, and lets React render into #root underneath it, laid
 * out but not painted (#root.lw-root-wait in index.css). When the real page
 * has its heading and is no longer waiting on its main content, the held
 * text is removed and the page is shown in one step. Nothing the reader was
 * looking at moves.
 *
 * "Ready" is read from the page itself: a heading inside <main>, and nothing
 * marked data-lw-loading. A page sets that attribute on the placeholder for
 * content that is still on its way (the chapter text in StudyBible.tsx). If
 * the page never gets there (a failed load shows its own message with no
 * heading), the hold ends after `maxWaitMs` and the reader sees whatever the
 * app has to say.
 *
 * The front page is not held: its static hero has its own, shorter wait
 * (lib/static-hero.ts).
 */
export interface PrerenderHoldOptions {
  doc?: Document;
  path?: string;
  maxWaitMs?: number;
  Observer?: typeof MutationObserver;
}

export const HELD_ID = "lw-held";
export const WAIT_CLASS = "lw-root-wait";

/** True when the app under the held text has a real page to show. */
export function pageIsReady(root: Element): boolean {
  // A page that has said its content did not load (components/LoadFailed) is
  // as ready as it will get; do not keep the reader waiting for a heading.
  if (root.querySelector("[data-lw-failed]") !== null) return true;
  return root.querySelector("main h1") !== null && root.querySelector("[data-lw-loading]") === null;
}

/**
 * Call before createRoot. Returns true when the prerendered text is being
 * held (the caller mounts either way).
 */
export function holdPrerenderedPage(options: PrerenderHoldOptions = {}): boolean {
  const doc = options.doc ?? document;
  const path = options.path ?? doc.location?.pathname ?? "";
  const maxWaitMs = options.maxWaitMs ?? 6000;
  const Observer = options.Observer ?? (typeof MutationObserver === "undefined" ? undefined : MutationObserver);

  const root = doc.getElementById("root");
  const shell = doc.getElementById("lw-shell");
  if (path === "/" || !root || !shell || !Observer) return false;
  if (!shell.querySelector(".prerender-content") || shell.parentNode !== root) return false;

  // Out of #root, so React's first render does not erase it. A new id, so the
  // self-heal script in index.html (which treats a lingering #lw-shell as an
  // app that never started) leaves a page that is only waiting on data alone.
  shell.id = HELD_ID;
  root.before(shell);
  root.classList.add(WAIT_CLASS);

  let done = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const observer = new Observer(() => {
    if (pageIsReady(root)) release();
  });
  function release() {
    if (done) return;
    done = true;
    observer.disconnect();
    if (timer !== null) clearTimeout(timer);
    shell!.remove();
    root!.classList.remove(WAIT_CLASS);
  }
  observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-lw-loading"] });
  timer = setTimeout(release, maxWaitMs);
  return true;
}
