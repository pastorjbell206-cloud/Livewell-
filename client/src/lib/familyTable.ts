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
 *   family first marked a devotion done, the band whose questions it wants
 *   ("together", "younger", or "older"; U21), and the dates devotions were
 *   done. Nothing else, and only in this browser, through lib/storage.
 */
import { familySetDayOn, familyWeekOn, onFamilyMap, type FamilySetKey } from "./familyYear";
import { FAMILY_SETS, FAMILY_SET_TITLES, FAMILY_TITLES } from "./familyYear.generated";
import { catechismWeekIndex, familyQuestionIndex, type CatechismPlace } from "./familyCatechism";
import { readStoredJSON, writeStoredJSON } from "./storage";

export const FAMILY_INDEX_URL = "/family/index.json";

export interface FamilyIndexRow {
  id: string;
  kind: "weekly" | "seasonal";
  /** Weekly: its place in the set (or in its strand), from 1. */
  n?: number;
  /** Weekly: its strand (MASTER-PLAN 5.4), "foundations" for the 72 or one beside them ("world"), listed in FamilyIndex.strands. */
  strand?: string;
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
  /** Weekly: its theme group in the library. */
  group?: string;
  /**
   * Seasonal: the day's passage word for word from the Berean Standard Bible
   * (scripts/lib/family-index.mjs, bsbReading). The set's own file holds a
   * retelling; the page shows this instead where it is there.
   */
  bsb?: string;
  /** Some weeks: one line for the parents and the page behind tonight. */
  grownups?: { line: string; href: string; title: string };
}

/** A strand or a theme group, with how many devotions it holds. */
export interface FamilyShelf {
  key: string;
  label: string;
  count: number;
}

export interface FamilySetInfo {
  slug: string;
  label: string;
  days: number;
}

/** A strand of weekly devotions (MASTER-PLAN 5.4), listed once its file is live. */
export type FamilyStrandInfo = FamilyShelf;

export interface CatechismLine {
  number: number;
  question: string;
  kidsAnswer: string;
}

export interface FamilyIndex {
  weekly: number;
  /** The weekly strands that have devotions, in library order (U21); a hidden strand is not listed (U11). */
  strands?: FamilyShelf[];
  /** The Foundations theme groups, in library order (U21). */
  groups?: FamilyShelf[];
  sets: Record<FamilySetKey, FamilySetInfo>;
  devotions: FamilyIndexRow[];
  catechism: CatechismLine[];
}

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const isText = (x: unknown): x is string => typeof x === "string" && x.length > 0;

export function isFamilyIndex(x: unknown): x is FamilyIndex {
  if (!isObject(x) || typeof x.weekly !== "number" || !isObject(x.sets)) return false;
  if (!Array.isArray(x.devotions) || !Array.isArray(x.catechism)) return false;
  if (x.strands !== undefined && !(Array.isArray(x.strands) && x.strands.every((s) => isObject(s) && isText(s.key) && isText(s.label) && typeof s.count === "number"))) return false;
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
 * the week's devotion. A week a set serves has nights its set does not cover:
 * the Friday and Saturday after Thanksgiving take the set's nearest day (its
 * last). The Advent calendar's weeks do not: its days are dates (December 1
 * to 25 in family-seasonal.json), so Advent Sunday and the nights before
 * December 1 have no devotion of their own, and Home, /family and Tonight say
 * when the calendar starts instead of lending them a reading dated another
 * day (the walk's polish, 2026-11-23). The nights after Christmas in Advent's
 * last week take the next week's devotion, begun early (afterChristmas). Null
 * off the map, and on the nights before December 1.
 */
export function tonightOn(date: string): Tonight | null {
  if (!onFamilyMap(date)) return null;
  const setDay = familySetDayOn(date);
  if (setDay) return { id: seasonalId(setDay.set, setDay.day), set: setDay.set, day: setDay.day };
  const week = familyWeekOn(date);
  if (!week) return null;
  if (week.devotion) return { id: week.devotion };
  if (week.set === "advent") return afterChristmas(date);
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
 * Tonight's title from the year map alone (no index fetch), for Home's
 * tonight line. Null only if the map has none, which its generator refuses.
 */
export function tonightTitle(t: Tonight): string | null {
  if (t.set && t.day) return FAMILY_SET_TITLES[t.set]?.[t.day - 1] ?? null;
  return FAMILY_TITLES[t.id] ?? null;
}

/** The calendar date `days` after (or before) a YYYY-MM-DD date. */
const isoOf = (day: number) => new Date(day * DAY_MS).toISOString().slice(0, 10);
export const addDays = (date: string, days: number) => isoOf(dayNumber(date) + days);

/** The Sunday that starts the week (Sunday to Saturday) holding the date. */
export function weekStartOf(date: string): string {
  const day = dayNumber(date);
  return isoOf(day - new Date(day * DAY_MS).getUTCDay());
}

/**
 * A night after Christmas in the Advent calendar's last week (December 26 in
 * 2026; December 26 to 30 in 2028) takes the next week's devotion, begun a
 * few nights early, so the table is not left empty after Christmas and no
 * later week moves. Null on the nights of Advent before December 1, which
 * wait for the calendar (tonightOn).
 */
function afterChristmas(date: string): Tonight | null {
  const today = dayNumber(date);
  const ended = FAMILY_SETS.some((w) => w.set === "advent" && dayNumber(w.end) < today && today - dayNumber(w.end) < 7);
  if (!ended) return null;
  const next = familyWeekOn(addDays(weekStartOf(date), 7));
  return next?.devotion ? { id: next.devotion } : null;
}

/**
 * How far nextNewNight looks: the longest run of one devotion is twelve
 * nights, a week's devotion begun on the night after a Monday Christmas
 * (December 26, 2028 to January 6, 2029).
 */
const NEXT_NIGHT_REACH = 14;

/**
 * The first night after `date` whose devotion is a different one: next Sunday
 * in an ordinary week, tomorrow inside a daily set, past the nights of an
 * Advent week that have none (tonightOn) to the next that has, and past a
 * devotion begun early after Christmas to the one after it. Null when the map
 * ends first.
 */
export function nextNewNight(date: string): { date: string; tonight: Tonight } | null {
  const now = tonightOn(date);
  for (let i = 1; i <= NEXT_NIGHT_REACH; i++) {
    const d = addDays(date, i);
    const t = tonightOn(d);
    if (!t) {
      if (!onFamilyMap(d)) return null;
      continue;
    }
    if (!now || t.id !== now.id) return { date: d, tonight: t };
  }
  return null;
}

/** "tomorrow", or the weekday: when the next devotion comes, as a family would say it. */
export function nextSaid(date: string, today: string): string {
  if (dayNumber(date) - dayNumber(today) === 1) return "tomorrow";
  return new Date(dayNumber(date) * DAY_MS).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
}

/**
 * How a devotion's day is named on a given night. A day of a daily set
 * carries a label ("Thanksgiving Day", "December 1"), and a week has nights
 * its set does not cover (the Friday and Saturday after Thanksgiving; see
 * tonightOn). On those nights the label would name the wrong day, so the day
 * is named by its number: "Day 7". The Advent calendar never gets here: its
 * days are only ever tonight's on their own dates.
 */
export function nightLabel(row: Pick<FamilyIndexRow, "id" | "label" | "day">, today: string): string | undefined {
  if (!row.day || tonightOn(today)?.id !== row.id) return row.label;
  return familySetDayOn(today) ? row.label : `Day ${row.day}`;
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

/** The strand a weekly devotion beside the 72 belongs to, or undefined for one of the 72. */
export function strandOf(row: FamilyIndexRow, index: FamilyIndex): FamilyStrandInfo | undefined {
  return row.strand && row.strand !== "foundations" ? index.strands?.find((s) => s.key === row.strand) : undefined;
}

/** Where a devotion sits in its set: "12 of 72" for a weekly one, "1 of 2" in a strand, "Day 6 of 25" for a day of a set. */
export function placeOf(row: FamilyIndexRow, index: FamilyIndex): { unit?: string; current: number; total: number } | null {
  if (row.kind === "weekly" && row.n && row.strand && row.strand !== "foundations") {
    const strand = strandOf(row, index);
    return strand ? { current: row.n, total: strand.count } : null;
  }
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

/**
 * The question a family is on: its own place in the catechism (question 1
 * until it moves), or the calendar's weekly pick when it has chosen to follow
 * the calendar. `own` says which, so a page can name it truthfully.
 */
export function catechismFor(list: CatechismLine[], place: CatechismPlace, now: Date = new Date()): { line: CatechismLine; own: boolean } | null {
  const line = list[familyQuestionIndex(place, list.length, now)];
  return line ? { line, own: place.follow === "own" } : null;
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

/**
 * Whether this device has a devotion marked done in the week holding `today`
 * (Sunday up to tonight): the latest such night, or null. There is one
 * devotion a week outside the daily sets, so a family that has done it should
 * be told so on the other six nights, not handed the same Start button. A
 * week's devotion begun early after Christmas (afterChristmas) counts from its
 * first night, so doing it on December 26 still counts that Sunday.
 */
export function doneThisWeek(progress: FamilyProgress, id: string, today: string): FamilyDone | null {
  let from = weekStartOf(today);
  for (let i = 0; i < 7; i++) {
    const night = addDays(from, -1);
    if (familyWeekOn(night)?.set !== "advent" || tonightOn(night)?.id !== id) break;
    from = night;
  }
  let best: FamilyDone | null = null;
  for (const d of progress.done) if (d.id === id && d.date >= from && d.date <= today && (!best || d.date > best.date)) best = d;
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

// Who the questions are for (MASTER-PLAN 5.3, U21).

/** A devotion's questions for younger children (about 4 to 10) and older (about 11 to 17); "together" shows both. */
export const BAND_LABELS: Record<FamilyBand, string> = { together: "Together", younger: "Younger", older: "Older" };

/**
 * Keep the band a family chose on this device, beside its dates. `ok` is
 * false when the browser would not keep it; the choice still holds while the
 * page is open.
 */
export function saveFamilyBand(band: FamilyBand): { ok: boolean; progress: FamilyProgress } {
  const progress: FamilyProgress = { ...readFamilyProgress(), band };
  return { ok: writeStoredJSON(FAMILY_PROGRESS_KEY, progress), progress };
}
