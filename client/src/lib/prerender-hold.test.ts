import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HELD_ID, WAIT_CLASS, holdPrerenderedPage, pageIsReady } from "./prerender-hold";

function setPage(withText: boolean) {
  document.body.innerHTML = `<div id="root"><div id="lw-shell">
    <div class="lw-shell-bar"><span>LiveWell</span></div>
    ${withText ? '<div class="prerender-content"><article><h1>John 3</h1><p>Nicodemus came by night.</p></article></div>' : ""}
  </div></div>`;
  return document.getElementById("root")!;
}

/** What React does on mount: replace whatever is in #root. */
function mount(root: HTMLElement, html: string) {
  root.innerHTML = html;
}

/** A frame, and the task after it: the held text has been drawn by then (the hold waits for one). */
const flush = () => new Promise<void>((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));

describe("holdPrerenderedPage", () => {
  beforeEach(() => vi.useRealTimers());
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("does nothing when the shell carries no prerendered text", () => {
    const root = setPage(false);
    expect(holdPrerenderedPage({ path: "/study" })).toBe(false);
    expect(document.getElementById("lw-shell")?.parentNode).toBe(root);
    expect(root.classList.contains(WAIT_CLASS)).toBe(false);
  });

  it("holds a shell the prerender put before #root without moving it, so its text is painted once", () => {
    document.body.innerHTML = `<div id="lw-shell"><div class="lw-shell-bar"><span>LiveWell</span></div><div class="prerender-content"><article><h1>John 3</h1><p>Nicodemus came by night.</p></article></div></div><div id="root"></div>`;
    const shell = document.getElementById("lw-shell")!;
    const root = document.getElementById("root")!;
    const moves: MutationRecord[] = [];
    const watch = new MutationObserver((records) => moves.push(...records.filter((r) => r.type === "childList")));
    watch.observe(document.body, { childList: true });
    expect(holdPrerenderedPage({ path: "/study/bible/john/3" })).toBe(true);
    moves.push(...watch.takeRecords().filter((r) => r.type === "childList"));
    watch.disconnect();
    expect(moves).toEqual([]);
    expect(document.getElementById(HELD_ID)).toBe(shell);
    expect(shell.nextElementSibling).toBe(root);
    expect(root.classList.contains(WAIT_CLASS)).toBe(true);
  });

  it("never holds the front page, which has its own static hero", () => {
    setPage(true);
    expect(holdPrerenderedPage({ path: "/" })).toBe(false);
    expect(document.getElementById("lw-shell")).not.toBeNull();
  });

  it("keeps the text through the loading screens and swaps once the page has its heading", async () => {
    const root = setPage(true);
    expect(holdPrerenderedPage({ path: "/study/bible/john/3" })).toBe(true);

    // Out of #root and renamed, so React's mount and the self-heal script
    // both leave it alone.
    const held = document.getElementById(HELD_ID)!;
    expect(held.parentNode).toBe(document.body);
    expect(document.getElementById("lw-shell")).toBeNull();
    expect(root.classList.contains(WAIT_CLASS)).toBe(true);

    mount(root, '<div role="status">One moment.</div>');
    await flush();
    expect(document.getElementById(HELD_ID)).not.toBeNull();
    expect(held.textContent).toContain("Nicodemus came by night.");

    // The chapter page has its heading but is still fetching the text.
    mount(root, '<main><h1>John 3</h1><p role="status" data-lw-loading>Opening John 3</p></main>');
    await flush();
    expect(document.getElementById(HELD_ID)).not.toBeNull();
    expect(root.classList.contains(WAIT_CLASS)).toBe(true);

    mount(root, "<main><h1>John 3</h1><p>Now there was a man of the Pharisees</p></main>");
    await flush();
    expect(document.getElementById(HELD_ID)).toBeNull();
    expect(root.classList.contains(WAIT_CLASS)).toBe(false);
  });

  it("waits for the real page's fonts before the swap, so its text is not drawn twice", async () => {
    const root = setPage(true);
    let fontsIn = () => {};
    const fonts = { status: "loading", ready: new Promise<void>((resolve) => { fontsIn = resolve; }) };
    Object.defineProperty(document, "fonts", { configurable: true, value: fonts });
    try {
      holdPrerenderedPage({ path: "/study/bible/john/3" });
      mount(root, "<main><h1>John 3</h1><p>Now there was a man of the Pharisees</p></main>");
      await flush();
      expect(document.getElementById(HELD_ID)).not.toBeNull();
      expect(root.classList.contains(WAIT_CLASS)).toBe(true);

      fonts.status = "loaded";
      fontsIn();
      await flush();
      expect(document.getElementById(HELD_ID)).toBeNull();
      expect(root.classList.contains(WAIT_CLASS)).toBe(false);
    } finally {
      delete (document as unknown as { fonts?: unknown }).fonts;
    }
  });

  it("does not take the held text away before a frame has drawn it", async () => {
    // A busy machine: the page is ready before the browser has drawn its first frame.
    const frames: FrameRequestCallback[] = [];
    const view = document.defaultView!;
    const spy = vi.spyOn(view, "requestAnimationFrame").mockImplementation((cb) => frames.push(cb));
    try {
      const root = setPage(true);
      holdPrerenderedPage({ path: "/family" });
      mount(root, "<main><h1>Family</h1></main>");
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(document.getElementById(HELD_ID)).not.toBeNull();
      expect(root.classList.contains(WAIT_CLASS)).toBe(true);

      frames.splice(0).forEach((cb) => cb(performance.now()));
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(document.getElementById(HELD_ID)).toBeNull();
      expect(root.classList.contains(WAIT_CLASS)).toBe(false);
    } finally {
      spy.mockRestore();
    }
  });

  it("lets a held picture arrive and be drawn before the swap, so the real page's copy is not the largest paint", async () => {
    const root = setPage(true);
    let arrived = false;
    const cover = document.createElement("img");
    Object.defineProperty(cover, "complete", { configurable: true, get: () => arrived });
    document.querySelector(".prerender-content")!.appendChild(cover);
    holdPrerenderedPage({ path: "/downloads" });
    mount(root, "<main><h1>Downloads</h1></main>");
    await flush();
    expect(document.getElementById(HELD_ID)).not.toBeNull();

    arrived = true;
    cover.dispatchEvent(new Event("load"));
    await new Promise<void>((resolve) => setTimeout(resolve, 120));
    expect(document.getElementById(HELD_ID)).toBeNull();
    expect(root.classList.contains(WAIT_CLASS)).toBe(false);
  });

  it("lets go after the longest wait when the page never gets its content", () => {
    vi.useFakeTimers();
    const root = setPage(true);
    holdPrerenderedPage({ path: "/studyguides/lament", maxWaitMs: 6000 });
    mount(root, "<main><p>This essay did not load.</p></main>");
    vi.advanceTimersByTime(5999);
    expect(document.getElementById(HELD_ID)).not.toBeNull();
    vi.advanceTimersByTime(1);
    expect(document.getElementById(HELD_ID)).toBeNull();
    expect(root.classList.contains(WAIT_CLASS)).toBe(false);
  });
});

describe("pageIsReady", () => {
  it("needs a heading inside main and nothing still loading", () => {
    const el = document.createElement("div");
    el.innerHTML = "<h1>Outside main</h1>";
    expect(pageIsReady(el)).toBe(false);
    el.innerHTML = "<main><h1>Title</h1><span data-lw-loading></span></main>";
    expect(pageIsReady(el)).toBe(false);
    el.innerHTML = "<main><h1>Title</h1></main>";
    expect(pageIsReady(el)).toBe(true);
  });
});
