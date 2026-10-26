/**
 * scripts/lib/church-year.mjs: the church year, computed from rules.
 *
 * The family year map (scripts/build-family-year.mjs) chooses one devotion a
 * week by the calendar, so the dates it keeps are computed here rather than
 * typed by hand, and the map never runs out. Every date is a calendar day
 * written as an ISO string ("2027-03-28"); arithmetic runs in UTC so no time
 * zone or daylight-saving change can move a day.
 *
 * The rules (Western church, Gregorian calendar):
 *
 *   Easter          the computus (the anonymous Gregorian algorithm, as given
 *                   by Meeus and Butcher)
 *   Ash Wednesday   46 days before Easter
 *   Palm Sunday     7 days before Easter; Holy Week runs from it to Holy
 *                   Saturday, the day before Easter
 *   Pentecost       49 days after Easter (the fiftieth day, counting Easter)
 *   Advent Sunday   the fourth Sunday before Christmas (always November 27
 *                   to December 3)
 *   Christmas       December 25; its twelve days run to January 5
 *   Epiphany        January 6
 *   All Saints      November 1
 *   Thanksgiving    the fourth Thursday of November (United States)
 *
 * A church year is named, as Easter is, by the calendar year most of it falls
 * in: church year 2027 begins on Advent Sunday 2026 (November 29) and ends
 * the day before Advent Sunday 2027.
 */

const DAY_MS = 86_400_000;

/** A calendar day as a UTC timestamp. Throws on anything but YYYY-MM-DD. */
function toUTC(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  if (!m) throw new Error(`not an ISO date: ${iso}`);
  const t = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (fromUTC(t) !== iso) throw new Error(`not a real date: ${iso}`);
  return t;
}

function fromUTC(t) {
  return new Date(t).toISOString().slice(0, 10);
}

/** The ISO date for a year, month (1 to 12) and day. */
export function isoDate(year, month, day) {
  return fromUTC(Date.UTC(year, month - 1, day));
}

/** True for a well-formed, real calendar date. */
export function isISODate(iso) {
  try {
    toUTC(iso);
    return true;
  } catch {
    return false;
  }
}

export function addDays(iso, n) {
  return fromUTC(toUTC(iso) + n * DAY_MS);
}

/** Whole days from a to b (positive when b is later). */
export function daysBetween(a, b) {
  return Math.round((toUTC(b) - toUTC(a)) / DAY_MS);
}

/** 0 is Sunday, 6 is Saturday. */
export function dayOfWeek(iso) {
  return new Date(toUTC(iso)).getUTCDay();
}

/** The same day a number of years later (February 29 becomes February 28). */
export function addYears(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const last = new Date(Date.UTC(y + n, m, 0)).getUTCDate();
  return isoDate(y + n, m, Math.min(d, last));
}

/** The Sunday on or before a date: the first day of its week. */
export function sundayOnOrBefore(iso) {
  return addDays(iso, -dayOfWeek(iso));
}

export function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return isoDate(year, month, day);
}

export const ashWednesday = (year) => addDays(easterSunday(year), -46);
export const palmSunday = (year) => addDays(easterSunday(year), -7);
export const holySaturday = (year) => addDays(easterSunday(year), -1);
export const pentecost = (year) => addDays(easterSunday(year), 49);
export const christmas = (year) => isoDate(year, 12, 25);
export const epiphany = (year) => isoDate(year, 1, 6);
export const allSaints = (year) => isoDate(year, 11, 1);

/** The fourth Sunday before Christmas in the given calendar year. */
export function adventSunday(year) {
  const xmas = christmas(year);
  const w = dayOfWeek(xmas);
  const lastSundayBefore = addDays(xmas, -(w === 0 ? 7 : w));
  return addDays(lastSundayBefore, -21);
}

/** US Thanksgiving: the fourth Thursday of November. */
export function thanksgivingUS(year) {
  const nov1 = isoDate(year, 11, 1);
  const firstThursday = addDays(nov1, (4 - dayOfWeek(nov1) + 7) % 7);
  return addDays(firstThursday, 21);
}

/** The first and last day of a church year (see the header). */
export function churchYearSpan(year) {
  return { start: adventSunday(year - 1), end: addDays(adventSunday(year), -1) };
}

/** The church year a date falls in. */
export function churchYearOf(iso) {
  const y = Number(iso.slice(0, 4));
  return iso >= adventSunday(y) ? y + 1 : y;
}

/**
 * Season keys in the order a church year meets them. "ordinary" is every day
 * no season or feast claims: from Epiphany to Ash Wednesday, and from
 * Pentecost to Advent.
 */
export const SEASON_KEYS = [
  "advent",
  "christmas",
  "epiphany",
  "lent",
  "holy-week",
  "easter",
  "pentecost",
  "all-saints",
  "thanksgiving",
  "ordinary",
];

/** One-day observances. A week in plain time (or in Christmas) takes the feast it contains. */
export const FEASTS = new Set(["epiphany", "pentecost", "all-saints", "thanksgiving"]);

/**
 * The seasons and feasts of one church year, in date order, each with its
 * first and last day (inclusive). Days in none of them are ordinary.
 */
export function seasonsOf(year) {
  const prev = year - 1;
  const easter = easterSunday(year);
  return [
    { key: "advent", start: adventSunday(prev), end: isoDate(prev, 12, 24) },
    { key: "christmas", start: christmas(prev), end: isoDate(year, 1, 5) },
    { key: "epiphany", start: epiphany(year), end: epiphany(year) },
    { key: "lent", start: ashWednesday(year), end: addDays(palmSunday(year), -1) },
    { key: "holy-week", start: palmSunday(year), end: holySaturday(year) },
    { key: "easter", start: easter, end: addDays(pentecost(year), -1) },
    { key: "pentecost", start: pentecost(year), end: pentecost(year) },
    { key: "all-saints", start: allSaints(year), end: allSaints(year) },
    { key: "thanksgiving", start: thanksgivingUS(year), end: thanksgivingUS(year) },
  ];
}

/** The season or feast in force on a date, or "ordinary". */
export function seasonOn(iso, seasons = seasonsOf(churchYearOf(iso))) {
  const hit = seasons.find((s) => s.start <= iso && iso <= s.end);
  return hit ? hit.key : "ordinary";
}

/**
 * The season a week belongs to. A week runs Sunday to Saturday and keeps the
 * season in force on its Sunday, so Lent's first week is the one that begins
 * on the first Sunday in Lent and the week of Ash Wednesday stays plain. A
 * feast that falls inside a plain week (or a week of Christmas) claims it:
 * the week holding January 6 is Epiphany's, the week holding November 1 is
 * All Saints', and the week holding Thanksgiving Day is Thanksgiving's.
 */
export function weekSeason(sunday) {
  if (dayOfWeek(sunday) !== 0) throw new Error(`a week starts on a Sunday, not ${sunday}`);
  const seasons = seasonsOf(churchYearOf(sunday));
  const base = seasonOn(sunday, seasons);
  if (base !== "ordinary" && base !== "christmas") return base;
  const saturday = addDays(sunday, 6);
  const feast = seasons.find((s) => FEASTS.has(s.key) && sunday <= s.start && s.start <= saturday);
  return feast ? feast.key : base;
}
