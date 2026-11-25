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
  if (!shell.querySelector(".prerender-content")) return false;
  // Out of #root, so React's first render does not erase it. The prerender
  // puts it just before #root already (scripts/prerender-heads.mjs), and then
  // it is not moved: a moved node is painted again, and the browser counted
  // that second paint, after the app's code had run, as the page's largest.
  // A shell still inside #root (a page written the older way) is lifted out.
  if (shell.parentNode === root) root.before(shell);
  else if (shell.nextElementSibling !== root) return false;

  // A new id, so the self-heal script in index.html (which treats a lingering
  // #lw-shell as an app that never started) leaves a page that is only
  // waiting on data alone.
  shell.id = HELD_ID;
  root.classList.add(WAIT_CLASS);

  let done = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let awaitingFonts = false;
  let awaitingPictures = false;
  let picturesDrawn = false;
  // Not before the held text has been drawn once. On a busy machine the
  // browser has drawn its first frame only after the app was ready (Lighthouse
  // on /family, 2026-11-23: nothing on screen for 1.2 seconds), and a swap
  // before that frame made the real page the first thing painted, its largest
  // paint counted from when the app's code had run. A page loading out of sight
  // (a background tab) draws no frame until it is shown, so it is not held for one.
  const nextFrame = doc.visibilityState === "hidden" ? undefined : doc.defaultView?.requestAnimationFrame?.bind(doc.defaultView);
  let drawn = !nextFrame;
  const observer = new Observer(() => {
    if (pageIsReady(root)) releaseWhenFontsAreIn();
  });
  // The real page can set its text in a face the held text never asked for
  // (the chapter's reading serif). Shown before that file arrives, the text
  // is drawn in the fallback and then redrawn, and every line below the first
  // moves: a layout shift of 0.19 on a phone, on the loads where the font
  // lost the race. So the hidden page is laid out, which makes the browser
  // ask for the faces it uses, and the swap waits for them (or for
  // `maxWaitMs`, whichever comes first).
  function releaseWhenFontsAreIn() {
    if (done || awaitingFonts || awaitingPictures || !drawn) return;
    const fonts = doc.fonts;
    void root!.offsetHeight;
    if (fonts && fonts.status === "loading") {
      awaitingFonts = true;
      const again = () => {
        awaitingFonts = false;
        if (pageIsReady(root!)) releaseWhenFontsAreIn();
      };
      fonts.ready.then(again, again);
      return;
    }
    // A picture the held page shows (the first shelf of covers on /downloads)
    // is let arrive and be drawn before the swap. Taken away half-loaded, the
    // real page's copy of it would become the page's largest paint, counted
    // from when the app started instead of from the HTML.
    const pictures = Array.from(shell!.querySelectorAll("img")).filter((img) => img.loading !== "lazy");
    if (pictures.length && !picturesDrawn) {
      awaitingPictures = true;
      // Loaded and decoded, ready to be drawn (decode() waits for both).
      const arrived = (img: HTMLImageElement) =>
        typeof img.decode === "function"
          ? img.decode().catch(() => undefined)
          : img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener("load", resolve, { once: true });
                img.addEventListener("error", resolve, { once: true });
              });
      const view = doc.defaultView;
      // Then two frames, so it has been painted.
      const painted = () =>
        new Promise<void>((resolve) => (view?.requestAnimationFrame ? view.requestAnimationFrame(() => view.requestAnimationFrame(() => resolve())) : setTimeout(resolve, 0)));
      const again = () => {
        awaitingPictures = false;
        picturesDrawn = true;
        if (pageIsReady(root!)) releaseWhenFontsAreIn();
      };
      Promise.all(pictures.map(arrived)).then(painted).then(again, again);
      return;
    }
    release();
  }
  function release() {
    if (done) return;
    done = true;
    observer.disconnect();
    if (timer !== null) clearTimeout(timer);
    shell!.remove();
    root!.classList.remove(WAIT_CLASS);
  }
  observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-lw-loading"] });
  // The task after an animation frame runs once that frame has been painted.
  nextFrame?.(() =>
    setTimeout(() => {
      drawn = true;
      if (pageIsReady(root)) releaseWhenFontsAreIn();
    }, 0),
  );
  timer = setTimeout(release, maxWaitMs);
  return true;
}
