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
