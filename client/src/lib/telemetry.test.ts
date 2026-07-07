import { describe, it, expect, vi, afterEach } from "vitest";
import { track as vercelTrack } from "@vercel/analytics";
import {
  track,
  trackEssayComplete,
  trackPathStep,
  trackReturnReader,
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
