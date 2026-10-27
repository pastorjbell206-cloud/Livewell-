/**
 * "Read the whole story in 2027": the Study Bible's story path in 365 days
 * (pages/StudyBibleYear.tsx at /study/bible/guides/whole-story-2027).
 *
 * The schedule is generated and committed (scripts/build-story-plan.mjs →
 * /bible/guides/whole-story-2027.json); this module reads it, says which day a
 * date falls on, and keeps the reader's own place on this device. The days are
 * numbered as well as dated, so a reader who starts late or misses a week
 * keeps a place, not a debt: the page shows where they are, never how far
 * behind.
 */
import { fetchJson } from "@/lib/fetch-json";
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";

export const PLAN_PATH = "/study/bible/guides/whole-story-2027";
export const PLAN_YEAR = 2027;
export const PLAN_DAYS = 365;

export interface PlanAct {
  id: string;
  /** "Act Four" */
  act: string;
  title: string;
  /** The day the act begins. */
  day: number;
}

export interface PlanDay {
  act: string;
  /** "Genesis 1–3" */
  label: string;
  /** Runs of chapters within one book: [slug, from, to]. */
  read: [string, number, number][];
  /** One title per chapter, in order. */
  titles: string[];
  /** Context guides (slugs) that belong to the day. */
  guides: string[];
}

export interface StoryPlan {
  id: string;
  start: string;
  chapters: number;
  books: Record<string, string>;
  acts: PlanAct[];
  guides: { slug: string; title: string }[];
  days: PlanDay[];
}

const obj = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);
const isPlan = (x: unknown): x is StoryPlan =>
  obj(x) && Array.isArray(x.days) && x.days.length === PLAN_DAYS && Array.isArray(x.acts) && Array.isArray(x.guides) && obj(x.books);

let cached: Promise<StoryPlan> | null = null;
export function fetchStoryPlan(): Promise<StoryPlan> {
  if (!cached) {
    cached = fetchJson("/bible/guides/whole-story-2027.json", isPlan).catch((e) => {
      cached = null;
      throw e;
    });
  }
  return cached;
}

/** Whole days from January 1 of the plan's year to `date`'s calendar day, plus one (so January 1 is day 1). */
export function planDayFor(date: Date): number {
  const start = Date.UTC(PLAN_YEAR, 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((today - start) / 86_400_000) + 1;
}

/** The calendar day of a plan day (local). */
export function dateForDay(day: number): Date {
  return new Date(PLAN_YEAR, 0, day);
}

/** "Friday, January 1" */
export function longDate(day: number): string {
  return dateForDay(day).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

/** "Jan 1" */
export function shortDate(day: number): string {
  return dateForDay(day).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** A day number from the address (?day=40), or null. */
export function dayFromQuery(search: string): number | null {
  const raw = new URLSearchParams(search).get("day");
  if (!raw || !/^\d{1,3}$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 1 && n <= PLAN_DAYS ? n : null;
}

/** Each chapter of a day: { slug, chapter, title }. */
export function chaptersOf(day: PlanDay): { slug: string; chapter: number; title: string }[] {
  const out: { slug: string; chapter: number; title: string }[] = [];
  for (const [slug, from, to] of day.read) for (let c = from; c <= to; c++) out.push({ slug, chapter: c, title: day.titles[out.length] ?? "" });
  return out;
}

/** The months of the plan's year: name, first day, last day. */
export function planMonths(): { name: string; first: number; last: number }[] {
  const out: { name: string; first: number; last: number }[] = [];
  for (let m = 0; m < 12; m++) {
    const first = planDayFor(new Date(PLAN_YEAR, m, 1));
    const last = planDayFor(new Date(PLAN_YEAR, m + 1, 0));
    out.push({ name: new Date(PLAN_YEAR, m, 1).toLocaleDateString("en-US", { month: "long" }), first, last });
  }
  return out;
}

// ── the reader's place (this device only) ───────────────────────────────────

export const PLAN_PROGRESS_KEY = "livewell-progress-story-2027";
const isDays = isArrayOf((x: unknown): x is number => Number.isInteger(x) && (x as number) >= 1 && (x as number) <= PLAN_DAYS);

/** The days marked read on this device. */
export function readPlanDays(): Set<number> {
  return new Set(readStoredJSON<number[]>(PLAN_PROGRESS_KEY, isDays, []));
}

/** Mark a day read or unread; false when the browser won't store it. */
export function setPlanDay(day: number, read: boolean): boolean {
  const s = readPlanDays();
  if (read) s.add(day);
  else s.delete(day);
  return writeStoredJSON(PLAN_PROGRESS_KEY, Array.from(s).sort((a, b) => a - b));
}

/** The reader's place: the first day not yet marked read, or null when every day is. */
export function nextUnreadDay(done: Set<number>): number | null {
  for (let d = 1; d <= PLAN_DAYS; d++) if (!done.has(d)) return d;
  return null;
}

/**
 * The day the page opens on: the one in the address; else the reader's place
 * on this device; else today's day while the plan's year runs; else day 1.
 */
export function openingDay(query: number | null, done: Set<number>, today: number): number {
  if (query) return query;
  if (done.size) return nextUnreadDay(done) ?? PLAN_DAYS;
  if (today >= 1 && today <= PLAN_DAYS) return today;
  return 1;
}
