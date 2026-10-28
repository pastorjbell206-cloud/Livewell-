/**
 * Read the whole story in 2027 (U28): the committed schedule walks every
 * chapter of the Bible once, in story order, in 365 days that each resolve to
 * real chapters; dates map to days in the reader's own calendar; and the
 * reader's place is kept on this device, guarded against corrupt storage.
 */
import { afterEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { chapterTitle, planProblems } from "../../../scripts/lib/story-plan.mjs";
import {
  PLAN_DAYS,
  PLAN_PROGRESS_KEY,
  chapterName,
  chaptersOf,
  dateForDay,
  dayFromQuery,
  longDate,
  openingDay,
  planDayFor,
  planMonths,
  readPlanDays,
  readerPlace,
  setPlanDay,
  type StoryPlan,
} from "./storyPlan";

const PUBLIC = path.resolve(__dirname, "../../public");
const PLAN: StoryPlan = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/guides/whole-story-2027.json"), "utf8"));
const BOOKS: { slug: string; chapters: number }[] = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/books.json"), "utf8"));

afterEach(() => localStorage.clear());

describe("the committed plan", () => {
  it("is sound by the generator's own checks", () => {
    expect(planProblems(PLAN)).toEqual([]);
  });

  it("resolves day 1 to day 365 to real chapters, every chapter once", () => {
    expect(PLAN.days).toHaveLength(PLAN_DAYS);
    const seen = new Set<string>();
    PLAN.days.forEach((d, i) => {
      const chapters = chaptersOf(d);
      expect(chapters.length, `day ${i + 1}`).toBeGreaterThan(0);
      for (const c of chapters) {
        const book = BOOKS.find((b) => b.slug === c.slug);
        expect(book, `day ${i + 1}: ${c.slug}`).toBeTruthy();
        expect(c.chapter).toBeGreaterThanOrEqual(1);
        expect(c.chapter).toBeLessThanOrEqual(book!.chapters);
        expect(fs.existsSync(path.join(PUBLIC, "bible/ch", c.slug, `${c.chapter}.json`)), `${c.slug} ${c.chapter}`).toBe(true);
        expect(c.title, `${c.slug} ${c.chapter} has a title`).not.toBe("");
        seen.add(`${c.slug}/${c.chapter}`);
      }
    });
    expect(seen.size).toBe(1189);
    expect(PLAN.chapters).toBe(1189);
  });

  it("lists a psalm's title without repeating the reference it sits under", () => {
    expect(chapterTitle("Psalm 51: Create in Me a Clean Heart", "psalms", 51)).toBe("Create in Me a Clean Heart");
    expect(chapterTitle("Psalm 51", "psalms", 51)).toBe("Psalm 51");
    expect(chapterTitle("Hannah's Prayer and Samuel's Birth", "1-samuel", 1)).toBe("Hannah's Prayer and Samuel's Birth");
    const repeats = PLAN.days.flatMap((d) => chaptersOf(d)).filter((c) => c.slug === "psalms" && c.title.startsWith(`Psalm ${c.chapter}:`));
    expect(repeats).toEqual([]);
  });

  it("starts in Genesis, ends in Revelation, and opens each act on a day of its own", () => {
    expect(PLAN.days[0].read[0]).toEqual(["genesis", 1, 2]);
    expect(PLAN.days[PLAN_DAYS - 1].read.at(-1)).toEqual(["revelation", 20, 22]);
    expect(PLAN.acts).toHaveLength(11);
    for (const a of PLAN.acts) expect(PLAN.days[a.day - 1].act).toBe(a.id);
  });

  it("places every context guide on one day, with a real guide behind it", () => {
    const placed = PLAN.days.flatMap((d) => d.guides);
    expect(new Set(placed).size).toBe(placed.length);
    expect(placed.length).toBe(PLAN.guides.length);
    for (const g of PLAN.guides) expect(fs.existsSync(path.join(PUBLIC, "context/guides", `${g.slug}.json`))).toBe(true);
    // The day that reads Jeremiah 29 offers the guide to Jeremiah 29:11.
    const jer29 = PLAN.days.find((d) => chaptersOf(d).some((c) => c.slug === "jeremiah" && c.chapter === 29))!;
    expect(jer29.guides).toContain("jeremiah-29-11-in-context");
  });
});

describe("days and dates", () => {
  it("counts January 1, 2027 as day 1 and December 31 as day 365, across the clock change", () => {
    expect(planDayFor(new Date(2027, 0, 1, 0, 5))).toBe(1);
    expect(planDayFor(new Date(2027, 0, 1, 23, 55))).toBe(1);
    expect(planDayFor(new Date(2027, 2, 15, 7))).toBe(74); // after the spring clock change
    expect(planDayFor(new Date(2027, 11, 31, 22))).toBe(365);
    expect(planDayFor(new Date(2026, 11, 31))).toBe(0);
    expect(planDayFor(new Date(2028, 0, 1))).toBe(366);
  });

  it("names one psalm as the day's label does", () => {
    expect(chapterName(PLAN.books, "psalms", 51)).toBe("Psalm 51");
    expect(chapterName(PLAN.books, "2-samuel", 12)).toBe("2 Samuel 12");
  });

  it("dates a day in the reader's calendar", () => {
    expect(dateForDay(1).toDateString()).toBe(new Date(2027, 0, 1).toDateString());
    expect(dateForDay(60).toDateString()).toBe(new Date(2027, 2, 1).toDateString());
    expect(longDate(1)).toBe("Friday, January 1");
  });

  it("splits the year into twelve months that cover every day once", () => {
    const months = planMonths();
    expect(months).toHaveLength(12);
    expect(months[0]).toEqual({ name: "January", first: 1, last: 31 });
    expect(months[1]).toEqual({ name: "February", first: 32, last: 59 });
    expect(months[11].last).toBe(365);
    for (let i = 1; i < 12; i++) expect(months[i].first).toBe(months[i - 1].last + 1);
  });

  it("reads a day from the address only when it is a real day", () => {
    expect(dayFromQuery("?day=40")).toBe(40);
    expect(dayFromQuery("day=365")).toBe(365);
    for (const bad of ["?day=0", "?day=366", "?day=abc", "?day=4.5", ""]) expect(dayFromQuery(bad)).toBeNull();
  });
});

describe("the reader's place", () => {
  it("keeps the days marked read on this device", () => {
    expect(readPlanDays().size).toBe(0);
    expect(setPlanDay(2, true)).toBe(true);
    expect(setPlanDay(1, true)).toBe(true);
    expect(JSON.parse(localStorage.getItem(PLAN_PROGRESS_KEY)!)).toEqual([1, 2]);
    setPlanDay(2, false);
    expect([...readPlanDays()]).toEqual([1]);
  });

  it("ignores storage it cannot trust", () => {
    localStorage.setItem(PLAN_PROGRESS_KEY, "{oops");
    expect(readPlanDays().size).toBe(0);
    localStorage.setItem(PLAN_PROGRESS_KEY, JSON.stringify([1, 400]));
    expect(readPlanDays().size).toBe(0);
  });

  it("puts the reader after the furthest day read, never back at a gap", () => {
    expect(readerPlace(new Set([1, 2, 3]))).toBe(4);
    expect(readerPlace(new Set([1, 2, 4]))).toBe(5);
    // Joined the plan on day 40 and read on: the place is day 43, not day 1.
    expect(readerPlace(new Set([40, 41, 42]))).toBe(43);
    // The last day read with some left: the first of those.
    expect(readerPlace(new Set([1, 2, 365]))).toBe(3);
    expect(readerPlace(new Set(Array.from({ length: PLAN_DAYS }, (_, i) => i + 1)))).toBeNull();
  });

  it("opens on the address, then the reader's place, then today, then day 1", () => {
    expect(openingDay(90, new Set([1]), 40)).toBe(90);
    expect(openingDay(null, new Set([1, 2]), 40)).toBe(3);
    expect(openingDay(null, new Set([40]), 45)).toBe(41);
    expect(openingDay(null, new Set(), 40)).toBe(40);
    expect(openingDay(null, new Set(), -65)).toBe(1);
    expect(openingDay(null, new Set(), 366)).toBe(1);
  });
});
