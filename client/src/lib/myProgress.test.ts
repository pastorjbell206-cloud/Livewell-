/**
 * "Pick up where you left off" reads what each tool already keeps in this
 * browser, and skips anything it cannot trust.
 */
import { afterEach, describe, expect, it } from "vitest";
import { collectProgress, continueHere, recentEssays, savedSnippetCount } from "./myProgress";

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

describe("continueHere", () => {
  const draft = (savedAt: string, answers: Record<number, number> = { 0: 3 }) => JSON.stringify({ answers, step: 1, savedAt });
  const runs = (...dates: string[]) => JSON.stringify(dates.map((date, i) => ({ date, total: 0.5, areas: {}, key: String(i) })));

  it("is null with nothing on this device", () => {
    expect(continueHere()).toBeNull();
  });

  it("offers an eight-week plan not yet walked through, and not one finished", () => {
    localStorage.setItem("lw-plan-anxiety", JSON.stringify({ startedAt: "2026-10-01T12:00:00.000Z", done: { 1: true } }));
    expect(continueHere()).toEqual({ href: "/plans/anxiety", label: "your eight-week plan", when: "2026-10-01T12:00:00.000Z" });
    const all = Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8].map((n) => [n, true]));
    localStorage.setItem("lw-plan-anxiety", JSON.stringify({ startedAt: "2026-10-01T12:00:00.000Z", done: all }));
    expect(continueHere()).toBeNull();
  });

  it("offers a self-check left part-way, and not one whose result came after its last save", () => {
    localStorage.setItem("livewell-progress-life-audit", draft("2026-10-20T12:00:00.000Z"));
    expect(continueHere()).toEqual({ href: "/tools/life-audit", label: "the Life Audit", when: "2026-10-20T12:00:00.000Z" });
    localStorage.setItem("livewell-history-life-audit", runs("2026-10-20T12:00:00.000Z"));
    expect(continueHere()).toBeNull();
    // Answers changed after that result: part-way again.
    localStorage.setItem("livewell-progress-life-audit", draft("2026-10-22T09:00:00.000Z"));
    expect(continueHere()?.href).toBe("/tools/life-audit");
  });

  it("does not offer a finished self-check whose same answers were saved again", () => {
    // Seeing the results again, or "Change my answers" and changing nothing,
    // saves the answers later than the result, and SelfCheckHistory records no new run.
    const answers = { 0: 3, 1: 5 };
    localStorage.setItem("livewell-history-emotional-health", JSON.stringify([{ date: "2026-10-20T12:00:00.000Z", total: 0.5, areas: {}, key: JSON.stringify(answers) }]));
    localStorage.setItem("livewell-progress-emotional-health", draft("2026-10-25T08:00:00.000Z", answers));
    expect(continueHere()).toBeNull();
    // The Life Audit's fingerprint carries the areas set aside.
    const setAside = ["work"];
    localStorage.setItem("livewell-history-life-audit", JSON.stringify([{ date: "2026-10-20T12:00:00.000Z", total: 0.5, areas: {}, key: JSON.stringify({ answers, setAside }) }]));
    localStorage.setItem("livewell-progress-life-audit", JSON.stringify({ answers, step: 0, savedAt: "2026-10-25T08:00:00.000Z", setAside }));
    expect(continueHere()).toBeNull();
    // One answer changed: part-way again.
    localStorage.setItem("livewell-progress-life-audit", JSON.stringify({ answers: { ...answers, 1: 2 }, step: 0, savedAt: "2026-10-25T09:00:00.000Z", setAside }));
    expect(continueHere()?.href).toBe("/tools/life-audit");
  });

  it("ignores a self-check with no answers yet, and values it cannot trust", () => {
    localStorage.setItem("livewell-progress-marriage-assessment", draft("2026-10-20T12:00:00.000Z", {}));
    localStorage.setItem("livewell-progress-emotional-health", "{oops");
    localStorage.setItem("lw-plan-grief", JSON.stringify({ done: {} }));
    expect(continueHere()).toBeNull();
  });

  it("takes the most recent of several", () => {
    localStorage.setItem("lw-plan-anxiety", JSON.stringify({ startedAt: "2026-10-01T12:00:00.000Z", done: {} }));
    localStorage.setItem("livewell-progress-marriage-assessment", draft("2026-10-05T12:00:00.000Z"));
    localStorage.setItem("livewell-progress-financial-health", draft("2026-09-05T12:00:00.000Z"));
    expect(continueHere()).toEqual(expect.objectContaining({ href: "/tools/marriage-assessment", label: "the Marriage Health Self-Check" }));
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
