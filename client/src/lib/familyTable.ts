/**
 * The Table: family devotions at home (master plan 5.5).
 *
 * - The index (client/public/family/index.json, written by
 *   scripts/build-family-index.mjs): one row per devotion page, the daily
 *   sets, and the catechism's questions.
 * - Tonight: which devotion a family does tonight, from the static year map
 *   (familyYear.generated.ts) and the reader's own calendar, never the network.
 * - Position: where the family is ("Week 48 of the year", "Day 6 of 25",
 *   "Last time: Made On Purpose, Tuesday"), never a streak or a score.
 * - What this device remembers (livewell-progress-family-v1): the day the
 *   family first marked a devotion done, the band ("together" until the age
 *   bands land), and the dates devotions were done. Nothing else, and only in
 *   this browser, through lib/storage.
 */
import { familySetDayOn, familyWeekOn, onFamilyMap, type FamilySetKey } from "./familyYear";
import { FAMILY_SETS } from "./familyYear.generated";
import { catechismWeekIndex } from "./familyCatechism";
import { readStoredJSON, writeStoredJSON } from "./storage";

export const FAMILY_INDEX_URL = "/family/index.json";

export interface FamilyIndexRow {
  id: string;
  kind: "weekly" | "seasonal";
  /** Weekly: its place in the set, from 1. */
  n?: number;
  /** Seasonal: the set and the day in it, from 1. */
  set?: FamilySetKey;
  day?: number;
  /** Seasonal: the day's own name ("December 6", "Palm Sunday"). */
  label?: string;
  title: string;
  theme?: string;
  passage: string;
  /** The Study Bible chapter the passage opens. */
  href: string;
  /** The library file that holds the devotion itself. */
  file: string;
  description: string;
}

export interface FamilySetInfo {
  slug: string;
  label: string;
  days: number;
}

export interface CatechismLine {
  number: number;
  question: string;
  kidsAnswer: string;
}

export interface FamilyIndex {
  weekly: number;
  sets: Record<FamilySetKey, FamilySetInfo>;
  devotions: FamilyIndexRow[];
  catechism: CatechismLine[];
}

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const isText = (x: unknown): x is string => typeof x === "string" && x.length > 0;

export function isFamilyIndex(x: unknown): x is FamilyIndex {
  if (!isObject(x) || typeof x.weekly !== "number" || !isObject(x.sets)) return false;
  if (!Array.isArray(x.devotions) || !Array.isArray(x.catechism)) return false;
  return (
    x.devotions.every((r) => isObject(r) && isText(r.id) && isText(r.title) && isText(r.passage) && isText(r.file) && (r.kind === "weekly" || r.kind === "seasonal")) &&
    x.catechism.every((q) => isObject(q) && typeof q.number === "number" && isText(q.question))
  );
}

/** The page of a devotion, and of the same devotion at the table. */
export const devotionHref = (id: string) => `/family/devotions/${id}`;
export const tableHref = (id: string) => `/family/devotions/${id}?mode=table`;

/** The address of a day of a daily set: "advent-6", "holy-week-1". */
export const SET_SLUGS: Record<FamilySetKey, string> = { advent: "advent", holyWeek: "holy-week", thanksgiving: "thanksgiving" };
export const seasonalId = (set: FamilySetKey, day: number) => `${SET_SLUGS[set]}-${day}`;

export interface Tonight {
  id: string;
  set?: FamilySetKey;
  day?: number;
}

const DAY_MS = 86_400_000;
const dayNumber = (iso: string) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10))) / DAY_MS;

/**
 * Tonight's devotion on a calendar date (YYYY-MM-DD, the reader's own; see
 * localISODate). A day of a daily set takes that day; any other week takes
 * the week's devotion. A week a set serves has nights its set does not cover
 * (Advent Sunday and Monday before December 1, the Friday and Saturday after
 * Thanksgiving, the days after Christmas in Advent's last week): those nights
 * take the set's nearest day, its first before it begins and its last after it
 * ends. Null off the map.
 */
export function tonightOn(date: string): Tonight | null {
  if (!onFamilyMap(date)) return null;
  const setDay = familySetDayOn(date);
  if (setDay) return { id: seasonalId(setDay.set, setDay.day), set: setDay.set, day: setDay.day };
  const week = familyWeekOn(date);
  if (!week) return null;
  if (week.devotion) return { id: week.devotion };
  if (!week.set) return null;
  const today = dayNumber(date);
  let best: { set: FamilySetKey; day: number; gap: number } | null = null;
  for (const w of FAMILY_SETS) {
    if (w.set !== week.set) continue;
    const start = dayNumber(w.start);
    const end = dayNumber(w.end);
    const gap = today < start ? start - today : today > end ? today - end : 0;
    const day = today < start ? 1 : today > end ? end - start + 1 : today - start + 1;
    if (!best || gap < best.gap) best = { set: w.set, day, gap };
  }
  return best ? { id: seasonalId(best.set, best.day), set: best.set, day: best.day } : null;
}

/**
 * Which week of the year a date is in: weeks run Sunday to Saturday, and week
 * 1 is the week that holds January 1 of the date's own year.
 */
export function weekOfYear(date: string): number {
  const year = Number(date.slice(0, 4));
  const jan1 = Date.UTC(year, 0, 1) / DAY_MS;
  const firstSunday = jan1 - new Date(jan1 * DAY_MS).getUTCDay();
  return Math.floor((dayNumber(date) - firstSunday) / 7) + 1;
}

/** Where a devotion sits in its set: "12 of 72" for a weekly one, "Day 6 of 25" for a day of a set. */
export function placeOf(row: FamilyIndexRow, index: FamilyIndex): { unit?: string; current: number; total: number } | null {
  if (row.kind === "weekly" && row.n) return { current: row.n, total: index.weekly };
  if (row.kind === "seasonal" && row.set && row.day) {
    const days = index.sets[row.set]?.days;
    if (days) return { unit: "Day", current: row.day, total: days };
  }
  return null;
}

/** This week's catechism question (the catechism page's own weekly pick). */
export function catechismThisWeek(list: CatechismLine[], now: Date = new Date()): CatechismLine | null {
  if (list.length === 0) return null;
  return list[catechismWeekIndex(now, list.length)] ?? null;
}

// What this device remembers.

export const FAMILY_PROGRESS_KEY = "livewell-progress-family-v1";

export type FamilyBand = "together" | "younger" | "older";

export interface FamilyDone {
  id: string;
  date: string;
}

export interface FamilyProgress {
  v: 1;
  /** The first day a devotion was marked done on this device. */
  start: string | null;
  band: FamilyBand;
  done: FamilyDone[];
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
/** The most dates kept; years of weekly use, and a bound on what the browser holds. */
const KEEP = 400;

export const EMPTY_PROGRESS: FamilyProgress = { v: 1, start: null, band: "together", done: [] };

export function isFamilyProgress(x: unknown): x is FamilyProgress {
  return (
    isObject(x) &&
    x.v === 1 &&
    (x.start === null || (typeof x.start === "string" && ISO_DATE.test(x.start))) &&
    (x.band === "together" || x.band === "younger" || x.band === "older") &&
    Array.isArray(x.done) &&
    x.done.every((d) => isObject(d) && isText(d.id) && typeof d.date === "string" && ISO_DATE.test(d.date))
  );
}

/** Read after mount: storage is never read during the prerender or first paint. */
export function readFamilyProgress(): FamilyProgress {
  return readStoredJSON(FAMILY_PROGRESS_KEY, isFamilyProgress, EMPTY_PROGRESS);
}

/** The progress with one more devotion done on `date` (the same one twice in a day counts once). */
export function withDone(progress: FamilyProgress, id: string, date: string): FamilyProgress {
  const already = progress.done.some((d) => d.id === id && d.date === date);
  const done = already ? progress.done : [...progress.done, { id, date }].slice(-KEEP);
  return { ...progress, start: progress.start ?? date, done };
}

/**
 * Record "We did this tonight". `ok` is false when the browser would not keep
 * it; `already` is true when this device had it for that date, so a second
 * tap is not counted twice.
 */
export function recordDevotionDone(id: string, date: string): { ok: boolean; already: boolean; progress: FamilyProgress } {
  const before = readFamilyProgress();
  const already = before.done.some((d) => d.id === id && d.date === date);
  const progress = withDone(before, id, date);
  return { ok: writeStoredJSON(FAMILY_PROGRESS_KEY, progress), already, progress };
}

/** The most recent devotion done, by date (the later entry on a tie). */
export function lastDone(progress: FamilyProgress): FamilyDone | null {
  let best: FamilyDone | null = null;
  for (const d of progress.done) if (!best || d.date >= best.date) best = d;
  return best;
}

/** When, as a family would say it: "tonight", "Tuesday" within the week, "Oct 3" before that. */
export function whenSaid(date: string, today: string): string {
  const gap = dayNumber(today) - dayNumber(date);
  if (gap === 0) return "tonight";
  if (gap === 1) return "last night";
  const d = new Date(dayNumber(date) * DAY_MS);
  if (gap > 1 && gap < 7) return d.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: d.getUTCFullYear() === Number(today.slice(0, 4)) ? undefined : "numeric", timeZone: "UTC" });
}
