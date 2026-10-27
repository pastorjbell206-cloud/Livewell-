/**
 * The Table's rules: tonight from the year map (every night on the map names
 * a devotion page that exists, including the nights a daily set does not
 * cover), the week of the year, where a devotion sits in its set, and what
 * this device remembers (dates only, the same devotion twice in a night
 * counted once, a corrupt value ignored).
 */
import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { FAMILY_WEEKS, FAMILY_YEAR_FROM, FAMILY_YEAR_THROUGH } from "./familyYear.generated";
import { catechismWeekIndex } from "./familyCatechism";
import {
  EMPTY_PROGRESS,
  FAMILY_PROGRESS_KEY,
  catechismThisWeek,
  isFamilyIndex,
  isFamilyProgress,
  lastDone,
  placeOf,
  readFamilyProgress,
  recordDevotionDone,
  saveFamilyBand,
  tonightOn,
  tonightTitle,
  weekOfYear,
  whenSaid,
  withDone,
  type FamilyIndex,
} from "./familyTable";

const INDEX: FamilyIndex = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/family/index.json"), "utf8"));
const IDS = new Set(INDEX.devotions.map((r) => r.id));
const weekOf = (sunday: string) => FAMILY_WEEKS.find((w) => w.start === sunday)!;

afterEach(() => {
  window.localStorage.clear();
});

describe("the committed family index", () => {
  it("passes the page's own shape guard", () => {
    expect(isFamilyIndex(INDEX)).toBe(true);
    // `weekly` counts the Foundations set; a live strand beside it is counted in `strands`.
    expect(INDEX.weekly).toBe(INDEX.devotions.filter((r) => r.kind === "weekly" && (r.strand ?? "foundations") === "foundations").length);
  });
});

describe("tonightOn", () => {
  it("takes the week's devotion in a plain week", () => {
    expect(tonightOn("2026-10-27")).toEqual({ id: weekOf("2026-10-25").devotion });
    expect(tonightOn("2026-12-27")).toEqual({ id: weekOf("2026-12-27").devotion });
  });

  it("takes the day of a daily set while the set runs", () => {
    expect(tonightOn("2026-11-20")).toEqual({ id: "thanksgiving-1", set: "thanksgiving", day: 1 });
    expect(tonightOn("2026-11-26")).toEqual({ id: "thanksgiving-7", set: "thanksgiving", day: 7 });
    expect(tonightOn("2026-12-01")?.id).toBe("advent-1");
    expect(tonightOn("2026-12-06")?.id).toBe("advent-6");
    expect(tonightOn("2026-12-25")?.id).toBe("advent-25");
    expect(tonightOn("2027-03-21")?.id).toBe("holy-week-1");
    expect(tonightOn("2027-03-28")?.id).toBe("holy-week-8");
  });

  it("gives the nights a set's week does not cover the set's nearest day", () => {
    // The Friday and Saturday after Thanksgiving.
    expect(tonightOn("2026-11-27")?.id).toBe("thanksgiving-7");
    expect(tonightOn("2026-11-28")?.id).toBe("thanksgiving-7");
    // Advent Sunday and Monday, before the calendar starts on December 1.
    expect(tonightOn("2026-11-29")?.id).toBe("advent-1");
    expect(tonightOn("2026-11-30")?.id).toBe("advent-1");
    // The day after Christmas, still in Advent's last week.
    expect(tonightOn("2026-12-26")?.id).toBe("advent-25");
  });

  it("names a devotion page that exists on every night of the map", () => {
    const missing: string[] = [];
    const day = new Date(`${FAMILY_YEAR_FROM}T12:00:00Z`);
    const last = new Date(`${FAMILY_YEAR_THROUGH}T12:00:00Z`);
    let nights = 0;
    while (day <= last) {
      const iso = day.toISOString().slice(0, 10);
      const t = tonightOn(iso);
      if (!t || !IDS.has(t.id)) missing.push(`${iso}: ${t?.id ?? "nothing"}`);
      nights += 1;
      day.setUTCDate(day.getUTCDate() + 1);
    }
    expect(nights).toBeGreaterThan(365 * 5);
    expect(missing).toEqual([]);
  });

  it("has tonight's title from the year map, the same as the index's, on every night", () => {
    const titles = new Map(INDEX.devotions.map((r) => [r.id, r.title]));
    const wrong: string[] = [];
    const day = new Date(`${FAMILY_YEAR_FROM}T12:00:00Z`);
    const last = new Date(`${FAMILY_YEAR_THROUGH}T12:00:00Z`);
    while (day <= last) {
      const iso = day.toISOString().slice(0, 10);
      const t = tonightOn(iso);
      if (t && tonightTitle(t) !== titles.get(t.id)) wrong.push(`${iso}: ${t.id} is "${tonightTitle(t)}"`);
      day.setUTCDate(day.getUTCDate() + 1);
    }
    expect(wrong).toEqual([]);
    expect(tonightTitle({ id: "advent-6", set: "advent", day: 6 })).toBe("A Child Is Given");
    expect(tonightTitle({ id: "no-such-devotion" })).toBeNull();
  });

  it("is null off the map and for a date that cannot exist", () => {
    expect(tonightOn("2040-01-01")).toBeNull();
    expect(tonightOn("2027-02-30")).toBeNull();
    expect(tonightOn("not a date")).toBeNull();
  });
});

describe("weekOfYear", () => {
  it("counts Sunday-to-Saturday weeks from the one holding January 1", () => {
    expect(weekOfYear("2026-01-01")).toBe(1); // a Thursday
    expect(weekOfYear("2026-01-03")).toBe(1);
    expect(weekOfYear("2026-01-04")).toBe(2); // the first Sunday after
    expect(weekOfYear("2026-10-27")).toBe(44);
    expect(weekOfYear("2026-12-31")).toBe(53);
    expect(weekOfYear("2027-01-01")).toBe(1);
  });
});

describe("placeOf", () => {
  it("says where a devotion sits in its own set", () => {
    const first = INDEX.devotions.find((r) => r.id === "identity")!;
    const advent6 = INDEX.devotions.find((r) => r.id === "advent-6")!;
    expect(placeOf(first, INDEX)).toEqual({ current: 1, total: INDEX.weekly });
    expect(placeOf(advent6, INDEX)).toEqual({ unit: "Day", current: 6, total: INDEX.sets.advent.days });
  });

  it("counts a weekly devotion within its own strand (U21)", () => {
    const first = INDEX.devotions.find((r) => r.id === "identity")!;
    expect(first.strand).toBe("foundations");
    const withWorld: FamilyIndex = { ...INDEX, strands: [...(INDEX.strands ?? []), { key: "world", label: "The world we live in", count: 12 }] };
    expect(placeOf({ ...first, strand: "world", n: 3 }, withWorld)).toEqual({ current: 3, total: 12 });
    expect(placeOf(first, { ...INDEX, strands: undefined })).toEqual({ current: 1, total: INDEX.weekly });
  });
});

describe("catechismThisWeek", () => {
  it("is the catechism page's own pick", () => {
    const when = new Date(2027, 0, 10, 12);
    expect(catechismThisWeek(INDEX.catechism, when)).toBe(INDEX.catechism[catechismWeekIndex(when, INDEX.catechism.length)]);
    expect(catechismThisWeek([], when)).toBeNull();
  });
});

describe("what this device remembers", () => {
  it("records the date, counts the same devotion once a night, and keeps the first day", () => {
    let p = withDone(EMPTY_PROGRESS, "identity", "2026-11-03");
    p = withDone(p, "identity", "2026-11-03");
    p = withDone(p, "advent-1", "2026-12-01");
    expect(p.start).toBe("2026-11-03");
    expect(p.band).toBe("together");
    expect(p.done).toEqual([
      { id: "identity", date: "2026-11-03" },
      { id: "advent-1", date: "2026-12-01" },
    ]);
    expect(lastDone(p)).toEqual({ id: "advent-1", date: "2026-12-01" });
    expect(lastDone(EMPTY_PROGRESS)).toBeNull();
  });

  it("keeps a bounded list", () => {
    let p = EMPTY_PROGRESS;
    for (let i = 0; i < 450; i++) p = withDone(p, `d${i}`, "2026-11-03");
    expect(p.done).toHaveLength(400);
    expect(p.done[399].id).toBe("d449");
  });

  it("writes through lib/storage and reads it back", () => {
    expect(readFamilyProgress()).toEqual(EMPTY_PROGRESS);
    const first = recordDevotionDone("identity", "2026-11-03");
    expect(first).toMatchObject({ ok: true, already: false });
    expect(JSON.parse(window.localStorage.getItem(FAMILY_PROGRESS_KEY)!)).toEqual({
      v: 1,
      start: "2026-11-03",
      band: "together",
      done: [{ id: "identity", date: "2026-11-03" }],
    });
    expect(readFamilyProgress().done).toHaveLength(1);
    // A second tap the same night is known as one, so it is not counted twice.
    expect(recordDevotionDone("identity", "2026-11-03")).toMatchObject({ ok: true, already: true });
    expect(recordDevotionDone("identity", "2026-11-04").already).toBe(false);
    expect(readFamilyProgress().done).toHaveLength(2);
  });

  it("keeps the band a family chose beside its dates (U21)", () => {
    recordDevotionDone("identity", "2026-11-03");
    expect(saveFamilyBand("older")).toMatchObject({ ok: true, progress: { band: "older" } });
    expect(readFamilyProgress()).toEqual({ v: 1, start: "2026-11-03", band: "older", done: [{ id: "identity", date: "2026-11-03" }] });
    // Marking another night done keeps the band.
    recordDevotionDone("faith", "2026-11-10");
    expect(readFamilyProgress().band).toBe("older");
  });

  it("ignores a value of the wrong shape", () => {
    window.localStorage.setItem(FAMILY_PROGRESS_KEY, JSON.stringify({ v: 1, streak: 7 }));
    expect(readFamilyProgress()).toEqual(EMPTY_PROGRESS);
    window.localStorage.setItem(FAMILY_PROGRESS_KEY, "not json");
    expect(readFamilyProgress()).toEqual(EMPTY_PROGRESS);
    expect(isFamilyProgress({ v: 1, start: null, band: "together", done: [{ id: "x", date: "Nov 3" }] })).toBe(false);
  });
});

describe("whenSaid", () => {
  it("says when as a family would", () => {
    expect(whenSaid("2026-11-03", "2026-11-03")).toBe("tonight");
    expect(whenSaid("2026-11-02", "2026-11-03")).toBe("last night");
    expect(whenSaid("2026-10-29", "2026-11-03")).toBe("Thursday");
    expect(whenSaid("2026-10-03", "2026-11-03")).toBe("Oct 3");
    expect(whenSaid("2025-12-21", "2026-11-03")).toBe("Dec 21, 2025");
  });
});
