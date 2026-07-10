import { describe, it, expect, vi, afterEach } from "vitest";
import { track as vercelTrack } from "@vercel/analytics";
import {
  track,
  trackEssayComplete,
  trackPathStep,
  trackReturnReader,
  trackBookOpen,
  trackBookCTA,
  trackSubscribe,
  trackPurchaseIntent,
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
});

describe("reader's-journey funnel events", () => {
  it("trackBookOpen emits book_open with the slug", () => {
    trackBookOpen("essays-on-prayer");
    expect(mockedTrack).toHaveBeenCalledWith("book_open", { slug: "essays-on-prayer" });
  });

  it("trackBookCTA emits book_cta_click with slug and the door it fired from", () => {
    trackBookCTA("essays-on-prayer", "essay-band");
    expect(mockedTrack).toHaveBeenCalledWith("book_cta_click", { slug: "essays-on-prayer", source: "essay-band" });
  });

  it("trackSubscribe carries the source and segment when present", () => {
    trackSubscribe("book-reader", "pastor");
    expect(mockedTrack).toHaveBeenCalledWith("subscribe_start", { source: "book-reader", segment: "pastor" });
  });

  it("trackSubscribe omits the segment when not given", () => {
    trackSubscribe("footer");
    expect(mockedTrack).toHaveBeenCalledWith("subscribe_start", { source: "footer" });
  });

  it("trackPurchaseIntent emits purchase_intent with the slug", () => {
    trackPurchaseIntent("born-again-from-atheism");
    expect(mockedTrack).toHaveBeenCalledWith("purchase_intent", { slug: "born-again-from-atheism" });
  });
});
