import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mountAfterStaticHero } from "./static-hero";

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
