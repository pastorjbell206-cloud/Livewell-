import { describe, it, expect, vi, afterEach } from "vitest";
import { track as vercelTrack } from "@vercel/analytics";
import {
  track,
  trackEssayComplete,
  trackPathStep,
  trackReturnReader,
  trackBookClick,
  trackReturnReaderOnce,
} from "./telemetry";

// Replace the real Vercel Web Analytics module with a spy: tests observe
// exactly what telemetry forwards, without loading the tracker or a network.
vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const mockedTrack = vi.mocked(vercelTrack);

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("track", () => {
  it("forwards the event name and props to Vercel Web Analytics", () => {
    track("some_event", { slug: "a-slug", count: 3, done: true });
    expect(mockedTrack).toHaveBeenCalledTimes(1);
    expect(mockedTrack).toHaveBeenCalledWith("some_event", {
      slug: "a-slug",
      count: 3,
      done: true,
    });
  });

  it("forwards a bare event with no props", () => {
    track("bare_event");
    expect(mockedTrack).toHaveBeenCalledWith("bare_event", undefined);
  });

  it("never throws when the analytics tracker throws", () => {
    mockedTrack.mockImplementationOnce(() => {
      throw new Error("analytics blew up");
    });
    expect(() => track("boom_event")).not.toThrow();
  });

  it("no-ops under SSR (no window) — the tracker is never called", () => {
    vi.stubGlobal("window", undefined);
    expect(() => track("ssr_event")).not.toThrow();
    expect(mockedTrack).not.toHaveBeenCalled();
  });
});

describe("depth helpers emit stable event names with slugs/counts only", () => {
  it("trackEssayComplete emits essay_read_complete carrying only the slug", () => {
    trackEssayComplete("the-work-nobody-watches");
    expect(mockedTrack).toHaveBeenCalledWith("essay_read_complete", {
      slug: "the-work-nobody-watches",
    });
  });

  it("trackPathStep emits path_step_complete with pathway and step", () => {
    trackPathStep("doubt", "step-2");
    expect(mockedTrack).toHaveBeenCalledWith("path_step_complete", {
      pathway: "doubt",
      step: "step-2",
    });
  });

  it("trackReturnReader emits return_reader with no props", () => {
    trackReturnReader();
    expect(mockedTrack).toHaveBeenCalledWith("return_reader", undefined);
  });

  it("trackBookClick emits essay_book_click with the source and book slugs", () => {
    trackBookClick("the-body-you-left", "babylon");
    expect(mockedTrack).toHaveBeenCalledWith("essay_book_click", {
      from: "the-body-you-left",
      book: "babylon",
    });
  });
});

describe("trackReturnReaderOnce records first-ever, counts every later load", () => {
  function fakeWindow() {
    const store: Record<string, string> = {};
    return {
      localStorage: {
        getItem: (k: string) => (k in store ? store[k] : null),
        setItem: (k: string, v: string) => {
          store[k] = String(v);
        },
      },
    };
  }

  it("does not count a first-ever visitor, but flags them", () => {
    const win = fakeWindow();
    vi.stubGlobal("window", win);
    trackReturnReaderOnce();
    expect(mockedTrack).not.toHaveBeenCalled();
    expect(win.localStorage.getItem("lw-seen")).toBe("1");
  });

  it("counts a return_reader once the flag is already set", () => {
    const win = fakeWindow();
    win.localStorage.setItem("lw-seen", "1");
    vi.stubGlobal("window", win);
    trackReturnReaderOnce();
    expect(mockedTrack).toHaveBeenCalledWith("return_reader", undefined);
  });

  it("no-ops under SSR (no window)", () => {
    vi.stubGlobal("window", undefined);
    expect(() => trackReturnReaderOnce()).not.toThrow();
    expect(mockedTrack).not.toHaveBeenCalled();
  });
});
