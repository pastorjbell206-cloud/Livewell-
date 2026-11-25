/**
 * Which family catechism question is "this week's" (/family/catechism).
 *
 * The first version took the week of the year and capped it at 52, so
 * questions 53 to 76, the twelve "Hard Questions Children Ask" among them,
 * never had a week. This walks the whole list one question a week and starts
 * again at the first, so every question gets its week however long the list
 * grows or shrinks.
 *
 * Weeks run Sunday to Saturday on the reader's own calendar. The count starts
 * on Sunday, December 28, 2025, the week that held January 1, 2026, so through
 * 2026 the pick is the same question the capped version showed; from the last
 * week of December 2026 it carries on to question 53 instead of stopping.
 */
import { readStoredJSON, writeStoredJSON } from "./storage";

const EPOCH_SUNDAY = Date.UTC(2025, 11, 28);
const DAY_MS = 86_400_000;

/** Zero-based index into the catechism of the question for the week holding `date`. */
export function catechismWeekIndex(date: Date, count: number): number {
  if (!Number.isInteger(count) || count <= 0) return 0;
  // Calendar days, not elapsed milliseconds, so a daylight-saving change
  // never moves a week boundary.
  const day = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const week = Math.floor((day - EPOCH_SUNDAY) / DAY_MS / 7);
  return ((week % count) + count) % count;
}

// A family's own place (audit 2026-11, F4).
//
// The calendar's pick lands every household on the same question, so a family
// that begins in November begins at question 47. A family's own place starts
// at question 1 and moves when the family says it has learned one. It is kept
// on this device and nowhere else. A household that learns the catechism with
// a church or a group can follow the calendar instead.

export const CATECHISM_PLACE_KEY = "livewell-progress-family-catechism-place-v1";

export interface CatechismPlace {
  v: 1;
  /** "own": the family's place, `at`. "calendar": the week's pick. */
  follow: "own" | "calendar";
  /** The family's question number, from 1. Kept while following the calendar, so switching back loses nothing. */
  at: number;
}

export const FIRST_PLACE: CatechismPlace = { v: 1, follow: "own", at: 1 };

export function isCatechismPlace(x: unknown): x is CatechismPlace {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  const p = x as Record<string, unknown>;
  return p.v === 1 && (p.follow === "own" || p.follow === "calendar") && typeof p.at === "number" && Number.isInteger(p.at) && p.at >= 1;
}

/** Read after mount: storage is never read during the prerender or first paint. */
export function readCatechismPlace(): CatechismPlace {
  return readStoredJSON(CATECHISM_PLACE_KEY, isCatechismPlace, FIRST_PLACE);
}

/** False when the browser would not keep it; the place still holds while the page is open. */
export function saveCatechismPlace(place: CatechismPlace): boolean {
  return writeStoredJSON(CATECHISM_PLACE_KEY, place);
}

/** Zero-based index of the question a family is on, in a catechism of `count` questions. */
export function familyQuestionIndex(place: CatechismPlace, count: number, now: Date = new Date()): number {
  if (!Number.isInteger(count) || count <= 0) return 0;
  if (place.follow === "calendar") return catechismWeekIndex(now, count);
  return Math.min(Math.max(place.at, 1), count) - 1;
}

/** The place after the family learns its question: the next one, and question 1 again after the last. */
export function nextPlace(place: CatechismPlace, count: number): CatechismPlace {
  const at = Math.min(Math.max(place.at, 1), count);
  return { ...place, follow: "own", at: at >= count ? 1 : at + 1 };
}

// A week with one question (TOOLS run of 2026-11-22).
//
// Three small things a family does with its question before saying it has
// learned it: say it, read the verse, talk about it. The ticks are kept on
// this device for the question they belong to, and start clean when the
// family moves to another question.

export const CATECHISM_WEEK_KEY = "livewell-progress-family-catechism-week-v1";

export const WEEK_STEPS = [
  { id: "say", label: "Say it together", line: "Read the question and both answers aloud, twice." },
  { id: "read", label: "Read the verse", line: "Read the verse it rests on, then the line in plain words." },
  { id: "talk", label: "Talk about it", line: "Ask the question below and let everyone answer." },
] as const;

export type WeekStepId = (typeof WEEK_STEPS)[number]["id"];

export interface CatechismWeek {
  v: 1;
  /** The question these ticks belong to. */
  q: number;
  steps: WeekStepId[];
}

const STEP_IDS: readonly string[] = WEEK_STEPS.map((s) => s.id);

export function isCatechismWeek(x: unknown): x is CatechismWeek {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  const w = x as Record<string, unknown>;
  return w.v === 1 && typeof w.q === "number" && Number.isInteger(w.q) && w.q >= 1 && Array.isArray(w.steps) && w.steps.every((s) => typeof s === "string" && STEP_IDS.includes(s));
}

/** The steps ticked for question `q` on this device; none when the kept ticks are another question's. */
export function readCatechismWeek(q: number): WeekStepId[] {
  const kept = readStoredJSON<CatechismWeek>(CATECHISM_WEEK_KEY, isCatechismWeek, { v: 1, q, steps: [] });
  return kept.q === q ? kept.steps : [];
}

/** Tick or untick one step for question `q`. Returns the steps now ticked and whether the browser kept them. */
export function toggleWeekStep(q: number, steps: WeekStepId[], id: WeekStepId): { steps: WeekStepId[]; ok: boolean } {
  const next = steps.includes(id) ? steps.filter((s) => s !== id) : [...steps, id];
  return { steps: next, ok: writeStoredJSON(CATECHISM_WEEK_KEY, { v: 1, q, steps: next } satisfies CatechismWeek) };
}

// Saying it aloud: the practice card's place, and whether it passes over the
// questions the family already knows.

export const CATECHISM_PRACTICE_KEY = "livewell-progress-family-catechism-practice-v1";

export interface PracticePlace {
  v: 1;
  at: number;
  /** Pass over the questions marked learned. */
  skip?: boolean;
}

export function isPracticePlace(x: unknown): x is PracticePlace {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  const p = x as Record<string, unknown>;
  return p.v === 1 && Number.isInteger(p.at) && (p.skip === undefined || typeof p.skip === "boolean");
}

/**
 * The next question to practice from `at`, going `by` (+1 or -1) round the
 * list. With `skip`, questions the family knows are passed over; when every
 * question is known there is nothing to pass over, so it steps by one.
 */
export function nextPractice(at: number, by: 1 | -1, count: number, skip: boolean, known: (n: number) => boolean): number {
  if (count <= 0) return 1;
  let n = at;
  for (let i = 0; i < count; i++) {
    n = ((n - 1 + by + count) % count) + 1;
    if (!skip || !known(n)) return n;
  }
  return ((at - 1 + by + count) % count) + 1;
}
