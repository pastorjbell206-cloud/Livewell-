/**
 * "Pick up where you left off" reads what each tool already keeps in this
 * browser, and skips anything it cannot trust.
 */
import { afterEach, describe, expect, it } from "vitest";
import { collectProgress, recentEssays, savedSnippetCount } from "./myProgress";

afterEach(() => localStorage.clear());

describe("collectProgress", () => {
  it("lists a plan in progress with its weeks walked and its title", () => {
    localStorage.setItem("lw-plan-anxiety", JSON.stringify({ startedAt: "2026-10-01T12:00:00.000Z", done: { 1: true, 2: true, 3: false } }));
    const rows = collectProgress({ anxiety: "Eight Weeks Toward a Quieter Mind" });
    expect(rows).toEqual([expect.objectContaining({ href: "/plans/anxiety", title: "Eight Weeks Toward a Quieter Mind", detail: "2 of 8 weeks walked" })]);
  });

  it("lists self-checks with a history, and the journals and planners in use", () => {
    localStorage.setItem("livewell-history-emotional-health", JSON.stringify([{ date: "2026-10-03T12:00:00.000Z", total: 0.5, areas: {}, key: "a" }]));
    localStorage.setItem("livewell-worry-journal", JSON.stringify([{}, {}]));
    localStorage.setItem("livewell-connection-planner", JSON.stringify({ people: [{}, {}, {}] }));
    const rows = collectProgress();
    expect(rows.map((r) => r.href)).toEqual(expect.arrayContaining(["/tools/emotional-health", "/tools/worry-journal", "/tools/connection-planner"]));
    expect(rows.find((r) => r.href === "/tools/worry-journal")?.detail).toBe("2 entries");
    expect(rows.find((r) => r.href === "/tools/connection-planner")?.detail).toBe("3 people you're reaching toward");
  });

  it("lists the 2027 reading plan by the reader's place", () => {
    localStorage.setItem("livewell-progress-story-2027", JSON.stringify([40, 41, 42]));
    expect(collectProgress()).toEqual([expect.objectContaining({ href: "/study/bible/guides/whole-story-2027", kind: "Reading plan", detail: "Day 43 is next" })]);
  });

  it("skips corrupt or unfamiliar values", () => {
    localStorage.setItem("lw-plan-anxiety", "{oops");
    localStorage.setItem("livewell-history-marriage", JSON.stringify("not a list"));
    expect(collectProgress()).toEqual([]);
  });
});

describe("recentEssays and saved snippets", () => {
  it("shows only essays still on the public shelf, newest first", () => {
    localStorage.setItem("livewell-read-essays", JSON.stringify(["a-retired-essay-slug", "every-generation-was-sure-it-was"]));
    expect(recentEssays()).toEqual([{ href: "/writing/every-generation-was-sure-it-was", title: "Every Generation Was Sure It Was Right" }]);
  });

  it("counts saved verses, prayers, quotes, and wisdom", () => {
    localStorage.setItem("livewell-saved-verses", JSON.stringify([{}, {}]));
    localStorage.setItem("livewell-quotes-saved-v1", JSON.stringify(["q1"]));
    expect(savedSnippetCount()).toBe(3);
  });
});
