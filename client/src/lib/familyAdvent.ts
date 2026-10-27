/**
 * The family Advent calendar on the year map: when to put it in front of a
 * household, and which of its days tonight is.
 *
 * The set in family-seasonal.json is a December 1 to 25 calendar (James,
 * 2026-10-26), while Advent itself begins on Advent Sunday, the fourth
 * Sunday before Christmas (November 27 to December 3). So the two dates are
 * kept apart here and in the copy: nothing says Advent begins December 1.
 *
 * Home and /family show the calendar from the Sunday a week before Advent
 * Sunday (November 22 in 2026) through its last day, December 25. Everything
 * is read from familyYear.generated.ts, so it needs no network.
 */
import { FAMILY_SEASONS, FAMILY_SETS } from "./familyYear.generated";
import { familySetDayOn, onFamilyMap } from "./familyYear";

/** How many days before Advent Sunday the calendar is surfaced. */
export const ADVENT_LEAD_DAYS = 7;

export interface AdventSeason {
  /** Advent Sunday, the first day of Advent. */
  adventSunday: string;
  /** The calendar's first and last days (December 1 and December 25). */
  calendarStart: string;
  calendarEnd: string;
}

export interface AdventTonight extends AdventSeason {
  /** Today's day of the calendar (1 is December 1), or null before it starts. */
  day: number | null;
  /** True before Advent Sunday. */
  beforeAdvent: boolean;
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

function utc(iso: string): Date | null {
  const m = ISO.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.toISOString().slice(0, 10) === iso ? d : null;
}

/** The calendar date `days` after (or before) a YYYY-MM-DD date. */
export function addDaysISO(iso: string, days: number): string {
  const d = utc(iso);
  if (!d) return iso;
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * The Advent whose calendar has not yet ended on this date: this year's
 * through December 25, then next year's. Null off the map.
 */
export function adventSeasonFor(date: string): AdventSeason | null {
  if (!onFamilyMap(date)) return null;
  const calendar = FAMILY_SETS.find((s) => s.set === "advent" && s.end >= date);
  if (!calendar) return null;
  const year = calendar.end.slice(0, 4);
  const season = FAMILY_SEASONS.find((s) => s.key === "advent" && s.end.slice(0, 4) === year);
  if (!season) return null;
  return { adventSunday: season.start, calendarStart: calendar.start, calendarEnd: calendar.end };
}

/** The calendar to put in front of a household on this date, or null when it is not the time. */
export function adventTonight(date: string): AdventTonight | null {
  const season = adventSeasonFor(date);
  if (!season) return null;
  if (date < addDaysISO(season.adventSunday, -ADVENT_LEAD_DAYS)) return null;
  const today = familySetDayOn(date);
  return {
    ...season,
    day: today?.set === "advent" ? today.day : null,
    beforeAdvent: date < season.adventSunday,
  };
}

/** "Sunday, November 29" (with { year: true }, "Sunday, November 29, 2026"). */
export function longDate(iso: string, opts: { weekday?: boolean; year?: boolean } = {}): string {
  const d = utc(iso);
  if (!d) return iso;
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    ...(opts.weekday === false ? {} : { weekday: "long" }),
    ...(opts.year ? { year: "numeric" } : {}),
  });
}

/**
 * Where the calendar opens: The Table's library (/family/devotions, U17)
 * reads `?tab=advent` as its Advent tab, and with `&day=N` opens that day's
 * own page (/family/devotions/advent-N) in place of the list.
 */
export function adventHref(day?: number | null): string {
  return day ? `/family/devotions?tab=advent&day=${day}` : "/family/devotions?tab=advent";
}
