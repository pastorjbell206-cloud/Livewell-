/**
 * The 2026-11 audit's family fixes, at the level of the rules: the second
 * night of a week is not the first night again (doneThisWeek, nextNewNight),
 * Advent's nights before December 1 have no reading of their own and a set's
 * uncovered night is named by day number (nightLabel), a
 * family has its own place in the catechism (catechismFor and the place
 * functions), a reading plan knows what day today is (familyPlans), and the
 * chooser only ever offers a devotion that exists (familyChooser).
 */
import { describe, it, expect, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { catechismFor, doneThisWeek, nextNewNight, nextSaid, nightLabel, tonightOn, weekStartOf, type FamilyIndex, type FamilyProgress } from "./familyTable";
import { CATECHISM_PLACE_KEY, FIRST_PLACE, catechismWeekIndex, familyQuestionIndex, isCatechismPlace, nextPlace, readCatechismPlace, saveCatechismPlace } from "./familyCatechism";
import { NO_STARTS, PLAN_STARTS_KEY, firstUnread, planDayOn, readPlanStarts, savePlanStarts, withPlanStart, withoutPlan } from "./familyPlans";
import { AGES, CHOOSER_KEY, MINUTES, NO_ANSWERS, TONIGHTS, chooseDevotion, readChooserAnswers, saveChooserAnswers } from "./familyChooser";

const INDEX: FamilyIndex = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/family/index.json"), "utf8"));
const progress = (done: FamilyProgress["done"]): FamilyProgress => ({ v: 1, start: done[0]?.date ?? null, band: "together", done });

beforeEach(() => window.localStorage.clear());

describe("the second night of the week", () => {
  // The week of Sunday, November 1, 2026 is an ordinary week: one devotion, seven nights.
  const tuesday = "2026-11-03";
  const id = tonightOn(tuesday)!.id;

  it("names the Sunday that starts a week", () => {
    expect(weekStartOf("2026-11-03")).toBe("2026-11-01");
    expect(weekStartOf("2026-11-01")).toBe("2026-11-01");
    expect(weekStartOf("2026-11-07")).toBe("2026-11-01");
  });

  it("knows the week's devotion is done on the nights after it, and not the week after", () => {
    const p = progress([{ id, date: tuesday }]);
    expect(doneThisWeek(p, id, tuesday)).toEqual({ id, date: tuesday });
    expect(doneThisWeek(p, id, "2026-11-04")).toEqual({ id, date: tuesday });
    expect(doneThisWeek(p, id, "2026-11-07")).toEqual({ id, date: tuesday });
    expect(doneThisWeek(p, id, "2026-11-08")).toBeNull();
    expect(doneThisWeek(progress([]), id, tuesday)).toBeNull();
    // Another devotion done this week is not this one.
    expect(doneThisWeek(progress([{ id: "identity", date: tuesday }]), id, tuesday)).toBeNull();
  });

  it("says when the next one comes: Sunday in an ordinary week, tomorrow inside a daily set", () => {
    const next = nextNewNight(tuesday)!;
    expect(next.date).toBe("2026-11-08");
    expect(next.tonight.id).not.toBe(id);
    expect(nextSaid(next.date, tuesday)).toBe("Sunday");
    const advent = nextNewNight("2026-12-06")!;
    expect(advent.date).toBe("2026-12-07");
    expect(nextSaid(advent.date, "2026-12-06")).toBe("tomorrow");
  });
});

describe("the nights of Advent before December 1", () => {
  const day1 = INDEX.devotions.find((r) => r.id === "advent-1")!;

  it("have no reading of their own, so the first reading keeps its own date", () => {
    // Advent Sunday 2026 is November 29; the calendar's first day is December 1,
    // the day its data names (the walk's polish, 2026-11-23: it was "Day 1", tonight's).
    for (const night of ["2026-11-29", "2026-11-30"]) {
      expect(tonightOn(night)).toBeNull();
      expect(nightLabel(day1, night)).toBe("December 1");
    }
    expect(tonightOn("2026-12-01")?.id).toBe("advent-1");
    expect(nightLabel(day1, "2026-12-01")).toBe("December 1");
    // The data's own days: day N of the calendar is December N.
    for (const r of INDEX.devotions.filter((d) => d.set === "advent")) expect(r.label).toBe(`December ${r.day}`);
  });

  it("send the next new night past them to December 1", () => {
    // Thanksgiving's last reading done on the Saturday after: the next is the calendar's first, on its own date.
    const next = nextNewNight("2026-11-28")!;
    expect(next).toEqual({ date: "2026-12-01", tonight: { id: "advent-1", set: "advent", day: 1 } });
    expect(nextSaid(next.date, "2026-11-28")).toBe("Tuesday");
    // After Christmas, the next is the following week's devotion, begun early on December 26.
    expect(nextNewNight("2026-12-25")).toEqual({ date: "2026-12-26", tonight: tonightOn("2026-12-27") });
    expect(nextSaid("2026-12-26", "2026-12-25")).toBe("tomorrow");
  });

  it("leave every other day's label alone", () => {
    const day6 = INDEX.devotions.find((r) => r.id === "advent-6")!;
    expect(nightLabel(day6, "2026-12-06")).toBe("December 6");
    // Read from the library on some other day, a day keeps its own name.
    expect(nightLabel(day1, "2026-07-04")).toBe("December 1");
    // The day after Christmas takes next week's devotion, begun early; day 25 keeps its date.
    const day25 = INDEX.devotions.find((r) => r.id === "advent-25")!;
    expect(tonightOn("2026-12-26")?.set).toBeUndefined();
    expect(nightLabel(day25, "2026-12-26")).toBe("December 25");
    // The Friday after Thanksgiving is still served by its set's last day, named by its number.
    const thanks7 = INDEX.devotions.find((r) => r.id === "thanksgiving-7")!;
    expect(nightLabel(thanks7, "2026-11-27")).toBe("Day 7");
    // A weekly devotion has no day label.
    expect(nightLabel(INDEX.devotions.find((r) => r.id === "identity")!, "2026-11-03")).toBeUndefined();
  });
});

describe("the nights after Christmas in Advent's last week", () => {
  // December 26, 2026 is a Saturday; it takes the devotion of the week of Sunday, December 27.
  const early = tonightOn("2026-12-27")!.id;

  it("begin the next week's devotion early, so the table is not empty", () => {
    expect(tonightOn("2026-12-26")).toEqual({ id: early });
    // December 25, 2028 is a Monday: five nights take the week of December 31's devotion.
    const long = tonightOn("2028-12-31")!.id;
    for (const night of ["2028-12-26", "2028-12-30"]) expect(tonightOn(night)).toEqual({ id: long });
  });

  it("count the devotion done on that first night as done for its week", () => {
    const p = progress([{ id: early, date: "2026-12-26" }]);
    expect(doneThisWeek(p, early, "2026-12-26")).toEqual({ id: early, date: "2026-12-26" });
    expect(doneThisWeek(p, early, "2026-12-27")).toEqual({ id: early, date: "2026-12-26" });
    expect(doneThisWeek(p, early, "2027-01-02")).toEqual({ id: early, date: "2026-12-26" });
    // The week after has its own devotion, and this one no longer counts.
    expect(doneThisWeek(p, early, "2027-01-03")).toBeNull();
    // Christmas Day's reading done on December 25 is not the early devotion.
    expect(doneThisWeek(progress([{ id: "advent-25", date: "2026-12-25" }]), early, "2026-12-26")).toBeNull();
  });

  it("send the next new night past the whole run to the week after", () => {
    expect(nextNewNight("2026-12-26")?.date).toBe("2027-01-03");
    // The longest run, twelve nights from December 26, 2028, still finds the next.
    expect(nextNewNight("2028-12-26")).toEqual({ date: "2029-01-07", tonight: tonightOn("2029-01-07") });
  });
});

describe("a family's own place in the catechism", () => {
  const count = INDEX.catechism.length;
  const now = new Date(2026, 10, 17, 19);

  it("starts at question 1, whatever the calendar says", () => {
    expect(catechismWeekIndex(now, count)).toBe(46); // the calendar is on question 47 this week
    expect(readCatechismPlace()).toEqual(FIRST_PLACE);
    expect(familyQuestionIndex(FIRST_PLACE, count, now)).toBe(0);
    expect(catechismFor(INDEX.catechism, FIRST_PLACE, now)).toEqual({ line: INDEX.catechism[0], own: true });
  });

  it("follows the calendar when the family chooses to, and keeps its own place for later", () => {
    const place = { v: 1 as const, follow: "calendar" as const, at: 5 };
    expect(catechismFor(INDEX.catechism, place, now)).toEqual({ line: INDEX.catechism[46], own: false });
    expect(familyQuestionIndex({ ...place, follow: "own" }, count, now)).toBe(4);
  });

  it("moves on one question at a time and starts again after the last", () => {
    expect(nextPlace(FIRST_PLACE, count)).toEqual({ v: 1, follow: "own", at: 2 });
    expect(nextPlace({ v: 1, follow: "own", at: count }, count)).toEqual({ v: 1, follow: "own", at: 1 });
    // A place past the end (the catechism grew shorter) is read as the last question.
    expect(familyQuestionIndex({ v: 1, follow: "own", at: 999 }, count, now)).toBe(count - 1);
  });

  it("is kept on the device, and anything else found there is ignored", () => {
    expect(saveCatechismPlace({ v: 1, follow: "own", at: 12 })).toBe(true);
    expect(readCatechismPlace()).toEqual({ v: 1, follow: "own", at: 12 });
    window.localStorage.setItem(CATECHISM_PLACE_KEY, JSON.stringify({ v: 1, follow: "own", at: 0 }));
    expect(readCatechismPlace()).toEqual(FIRST_PLACE);
    expect(isCatechismPlace({ v: 1, follow: "sideways", at: 3 })).toBe(false);
    expect(isCatechismPlace({ v: 1, follow: "own", at: 2.5 })).toBe(false);
  });
});

describe("a reading plan that knows today", () => {
  it("counts the day from the date the plan was started", () => {
    expect(planDayOn("2026-11-17", "2026-11-17", 30)).toEqual({ day: 1, finished: false });
    expect(planDayOn("2026-11-17", "2026-11-22", 30)).toEqual({ day: 6, finished: false });
    expect(planDayOn("2026-11-17", "2026-12-16", 30)).toEqual({ day: 30, finished: false });
    expect(planDayOn("2026-11-17", "2026-12-17", 30)).toEqual({ day: 31, finished: true });
    expect(planDayOn("2026-11-17", "2026-11-16", 30)).toBeNull();
    // Across a daylight-saving change and a year end, a day is still a day.
    expect(planDayOn("2026-10-30", "2026-11-02", 30)?.day).toBe(4);
    expect(planDayOn("2026-12-30", "2027-01-02", 30)?.day).toBe(4);
  });

  it("lets a family make today any day, by moving the start", () => {
    const started = withPlanStart(NO_STARTS, "psalms", "2026-11-22", 2);
    expect(started.starts.psalms).toBe("2026-11-21");
    expect(planDayOn(started.starts.psalms, "2026-11-22", 30)?.day).toBe(2);
    expect(withoutPlan(started, "psalms")).toEqual(NO_STARTS);
  });

  it("finds where a family left off", () => {
    const ticked = new Set(["p:1", "p:2", "p:4"]);
    const isDone = (k: string) => ticked.has(k);
    expect(firstUnread("p", 6, isDone)).toBe(3);
    expect(firstUnread("p", 3, isDone)).toBeNull();
    expect(firstUnread("p", 1, isDone)).toBeNull();
  });

  it("keeps the starts on the device, and ignores anything else found there", () => {
    expect(savePlanStarts(withPlanStart(NO_STARTS, "psalms", "2026-11-17"))).toBe(true);
    expect(readPlanStarts().starts).toEqual({ psalms: "2026-11-17" });
    window.localStorage.setItem(PLAN_STARTS_KEY, JSON.stringify({ v: 1, starts: { psalms: "yesterday" } }));
    expect(readPlanStarts()).toEqual(NO_STARTS);
  });
});

describe("a devotion for tonight", () => {
  const weekly = new Set(INDEX.devotions.filter((r) => r.kind === "weekly").map((r) => r.id));

  it("only ever offers a weekly devotion that exists", () => {
    for (const t of TONIGHTS) for (const id of t.ids) expect(weekly.has(id), `${t.key}: ${id}`).toBe(true);
    expect(TONIGHTS[0]).toMatchObject({ key: "ordinary", ids: [] });
  });

  it("takes the calendar's devotion on an ordinary night", () => {
    expect(chooseDevotion("ordinary", progress([]), "goodness")).toBe("goodness");
    expect(chooseDevotion("ordinary", progress([]), null, ["identity"])).toBe("identity");
    expect(chooseDevotion("ordinary", progress([]), null)).toBeNull();
  });

  it("offers the first fitting devotion the family has not done, and the first again once it has done them all", () => {
    const afraid = TONIGHTS.find((t) => t.key === "afraid")!.ids;
    expect(chooseDevotion("afraid", progress([]), "goodness")).toBe(afraid[0]);
    expect(chooseDevotion("afraid", progress([{ id: afraid[0], date: "2026-10-01" }]), "goodness")).toBe(afraid[1]);
    expect(chooseDevotion("afraid", progress(afraid.map((id) => ({ id, date: "2026-10-01" }))), "goodness")).toBe(afraid[0]);
  });

  it("remembers the ages and the minutes on the device, and nothing about tonight", () => {
    expect(readChooserAnswers()).toEqual(NO_ANSWERS);
    expect(saveChooserAnswers({ v: 1, ages: "younger", minutes: "five" })).toBe(true);
    expect(readChooserAnswers()).toEqual({ v: 1, ages: "younger", minutes: "five" });
    expect(Object.keys(JSON.parse(window.localStorage.getItem(CHOOSER_KEY)!)).sort()).toEqual(["ages", "minutes", "v"]);
    window.localStorage.setItem(CHOOSER_KEY, JSON.stringify({ v: 1, ages: "toddlers", minutes: "five" }));
    expect(readChooserAnswers()).toEqual(NO_ANSWERS);
    expect(AGES.map((a) => a.band)).toEqual(["younger", "older", "together"]);
    expect(MINUTES).toHaveLength(3);
  });
});
