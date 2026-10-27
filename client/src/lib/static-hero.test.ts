import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { mountAfterStaticHero, STATIC_HERO_SELECTOR } from "./static-hero";

const ROOT = path.resolve(__dirname, "../../..");
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), "utf8");

/** A PerformanceObserver stand-in the test can feed LCP entries to. */
function fakeObserver(supported: string[] = ["largest-contentful-paint"]) {
  const instances: FakeObserver[] = [];
  class FakeObserver {
    static supportedEntryTypes = supported;
    callback: PerformanceObserverCallback;
    observed: PerformanceObserverInit | null = null;
    disconnected = false;
    constructor(callback: PerformanceObserverCallback) {
      this.callback = callback;
      instances.push(this);
    }
    observe(init: PerformanceObserverInit) {
      this.observed = init;
    }
    disconnect() {
      this.disconnected = true;
    }
    takeRecords() {
      return [];
    }
    /** Deliver LCP entries for these elements, as the browser would. */
    emit(...elements: Element[]) {
      const entries = elements.map((element) => ({ entryType: "largest-contentful-paint", element }));
      this.callback(
        { getEntries: () => entries } as unknown as PerformanceObserverEntryList,
        this as unknown as PerformanceObserver
      );
    }
  }
  return { Observer: FakeObserver as unknown as typeof PerformanceObserver, instances };
}

/** The prerendered "/" shell: the masthead bar and the static hero. */
function renderShell() {
  document.body.innerHTML = `
    <div id="root"><div id="lw-shell">
      <div class="lw-shell-bar"><span>LiveWell</span></div>
      <section class="home-hero"><div class="home-hero__inner">
        <h1 class="home-hero__title">Headline</h1>
        <p class="home-hero__text">Why the site exists.</p>
      </div></section>
    </div></div>`;
  return {
    bar: document.querySelector(".lw-shell-bar span")!,
    text: document.querySelector(".home-hero__text")!,
  };
}

function setVisibility(state: DocumentVisibilityState) {
  Object.defineProperty(document, "visibilityState", { value: state, configurable: true });
}

beforeEach(() => {
  vi.useFakeTimers();
  setVisibility("visible");
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("mountAfterStaticHero", () => {
  it("mounts at once on a page without the static hero", () => {
    document.body.innerHTML = `<div id="root"><div id="lw-shell"></div></div>`;
    const { Observer, instances } = fakeObserver();
    const mount = vi.fn();
    mountAfterStaticHero(mount, { path: "/", Observer });
    expect(mount).toHaveBeenCalledTimes(1);
    expect(instances).toHaveLength(0);
  });

  it("mounts at once on any other path, even though the fallback HTML carries the hero", () => {
    renderShell();
    const { Observer, instances } = fakeObserver();
    const mount = vi.fn();
    mountAfterStaticHero(mount, { path: "/admin", Observer });
    expect(mount).toHaveBeenCalledTimes(1);
    expect(instances).toHaveLength(0);
  });

  it("mounts at once where the browser has no LCP or no PerformanceObserver", () => {
    renderShell();
    const noLcp = vi.fn();
    mountAfterStaticHero(noLcp, { path: "/", Observer: fakeObserver(["paint"]).Observer });
    expect(noLcp).toHaveBeenCalledTimes(1);

    const noObserver = vi.fn();
    vi.stubGlobal("PerformanceObserver", undefined);
    try {
      mountAfterStaticHero(noObserver, { path: "/" });
    } finally {
      vi.unstubAllGlobals();
    }
    expect(noObserver).toHaveBeenCalledTimes(1);
  });

  it("mounts at once in a tab that is not visible (no LCP is reported there)", () => {
    renderShell();
    setVisibility("hidden");
    const mount = vi.fn();
    mountAfterStaticHero(mount, { path: "/", Observer: fakeObserver().Observer });
    expect(mount).toHaveBeenCalledTimes(1);
  });

  it("on '/', waits for the hero's LCP entry, then mounts once and stops observing", () => {
    const { text } = renderShell();
    const { Observer, instances } = fakeObserver();
    const mount = vi.fn();
    mountAfterStaticHero(mount, { path: "/", Observer });

    expect(mount).not.toHaveBeenCalled();
    const [observer] = instances;
    expect(observer.observed).toEqual({ type: "largest-contentful-paint", buffered: true });

    observer.emit(text);
    expect(mount).toHaveBeenCalledTimes(1);
    expect(observer.disconnected).toBe(true);

    // A later entry, or the timer, never mounts a second time.
    observer.emit(text);
    vi.advanceTimersByTime(1000);
    expect(mount).toHaveBeenCalledTimes(1);
  });

  it("does not count a paint outside the hero (the masthead), and falls back to the timer", () => {
    const { bar } = renderShell();
    const { Observer, instances } = fakeObserver();
    const mount = vi.fn();
    mountAfterStaticHero(mount, { path: "/", Observer, maxWaitMs: 300 });

    instances[0].emit(bar);
    expect(mount).not.toHaveBeenCalled();

    vi.advanceTimersByTime(299);
    expect(mount).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(mount).toHaveBeenCalledTimes(1);
    expect(instances[0].disconnected).toBe(true);
  });
});

describe("the static hero the gate watches", () => {
  it("is still where the selector looks, with the portrait low priority in both copies", () => {
    // The marker prerender-heads.mjs replaces sits inside #lw-shell...
    const html = read("client/index.html");
    const shell = html.indexOf('<div id="lw-shell"');
    const marker = html.indexOf("<!-- prerender:home-hero");
    expect(shell).toBeGreaterThan(-1);
    expect(marker).toBeGreaterThan(shell);
    expect(html.indexOf("</div>", html.indexOf("</div>", shell) + 1)).toBeGreaterThan(marker);

    // ...and is replaced by a section the selector matches.
    const prerender = read("scripts/prerender-heads.mjs");
    expect(STATIC_HERO_SELECTOR).toBe("#lw-shell .home-hero");
    expect(prerender).toContain('<section class="home-hero">');

    // A high-priority portrait is charged to LCP; keep both copies low.
    expect(prerender).toMatch(/<img class="home-hero__portrait"[^>]*fetchpriority="low"/);
    expect(read("client/src/pages/Home.tsx")).toMatch(
      /className="home-hero__portrait"[\s\S]{0,200}?fetchPriority="low"/
    );
  });
});
