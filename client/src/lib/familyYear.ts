/**
 * Reading the family year map (familyYear.generated.ts, written by
 * scripts/build-family-year.mjs): which week a date is in, which season, and
 * which day of a daily seasonal set. Everything is static, so Home and /family
 * can answer "tonight" without the network.
 *
 * Dates are calendar days as YYYY-MM-DD. Use localISODate() for "today": it
 * reads the reader's own clock, because at nine in the evening in Michigan
 * the UTC date is already tomorrow. Call it after mount, never during the
 * prerender.
 */
import {
  FAMILY_SEASONS,
  FAMILY_SETS,
  FAMILY_WEEKS,
  FAMILY_YEAR_FROM,
  FAMILY_YEAR_THROUGH,
  type FamilySeasonKey,
  type FamilySetKey,
  type FamilyWeek,
} from "./familyYear.generated";

export type { FamilySeasonKey, FamilySetKey, FamilyWeek } from "./familyYear.generated";

const DAY_MS = 86_400_000;
const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Days since 1970 for a real calendar date; null for "2027-02-30", which Date would roll into March. */
function dayNumber(iso: string): number | null {
  const m = ISO.exec(iso);
  if (!m) return null;
  const t = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (new Date(t).toISOString().slice(0, 10) !== iso) return null;
  return t / DAY_MS;
}

/** The reader's calendar date, in their own time zone. */
export function localISODate(d: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** True when the date is on the map. */
export function onFamilyMap(date: string): boolean {
  return dayNumber(date) !== null && date >= FAMILY_YEAR_FROM && date <= FAMILY_YEAR_THROUGH;
}

/** The week (Sunday to Saturday) that holds the date, or null off the map. */
export function familyWeekOn(date: string): FamilyWeek | null {
  if (!onFamilyMap(date)) return null;
  const from = dayNumber(FAMILY_YEAR_FROM);
  const day = dayNumber(date);
  if (from === null || day === null) return null;
  return FAMILY_WEEKS[Math.floor((day - from) / 7)] ?? null;
}

/**
 * The season or feast in force on the date: "ordinary" between seasons, null
 * off the map. A week's own season (familyWeekOn(date).season) can differ: a
 * week keeps the season of its Sunday, and a feast claims the week it falls in.
 */
export function familySeasonOn(date: string): FamilySeasonKey | null {
  if (!onFamilyMap(date)) return null;
  return FAMILY_SEASONS.find((s) => s.start <= date && date <= s.end)?.key ?? "ordinary";
}

/** Which day of a daily seasonal set the date is (day 1 is the set's first day), or null. */
export function familySetDayOn(date: string): { set: FamilySetKey; day: number } | null {
  if (!onFamilyMap(date)) return null;
  const w = FAMILY_SETS.find((s) => s.start <= date && date <= s.end);
  if (!w) return null;
  const start = dayNumber(w.start);
  const day = dayNumber(date);
  if (start === null || day === null) return null;
  return { set: w.set, day: day - start + 1 };
}
