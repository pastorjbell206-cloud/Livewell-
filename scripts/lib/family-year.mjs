/**
 * scripts/lib/family-year.mjs: the family year map, one devotion a week,
 * chosen by the calendar.
 *
 * scripts/build-family-year.mjs writes the map to
 * client/src/lib/familyYear.generated.ts, which Home and /family import
 * statically, so finding this week's devotion never waits on the network.
 * The map is computed from rules, never typed by hand:
 *
 *   - Weeks run Sunday to Saturday. Each takes its season from the church-year
 *     rules in ./church-year.mjs (weekSeason).
 *   - A season with a daily set in client/public/family-seasonal.json (Advent,
 *     Holy Week, Thanksgiving today) is served by that set: its weeks carry
 *     the set and no weekly devotion, and the set's own days are listed in
 *     FAMILY_SETS so a page can find tonight's day.
 *   - Every other week takes the next devotion in the Foundations rotation
 *     (family-devotions.json, then family-devotions-2.json, in file order, a
 *     repeated id used once), so all of them are used and the map never runs
 *     out. A season with no family set yet (Christmas, Epiphany, Lent, Easter,
 *     Pentecost, All Saints) keeps its season name and takes the rotation until
 *     its set is written; adding the set to family-seasonal.json and to SETS
 *     below hands those weeks to it.
 *   - The rotation counts from ROTATION_EPOCH, not from the first week the
 *     map lists, so extending the map never reshuffles it.
 *   - Each devotion a week names, and each day of each daily set, carries its
 *     title (FAMILY_TITLES, FAMILY_SET_TITLES), so Home can say tonight's
 *     devotion by name without fetching the family index.
 *   - A hand override (client/public/family-year-overrides.json) pins one
 *     devotion, from any family-devotions*.json file, to one week the rotation
 *     would serve (never a week a daily set serves). A pinned week does not use
 *     up a rotation slot: the devotion it displaced moves to the next week.
 *     Before ROTATION_EPOCH, where the rotation counts backward, a pinned week
 *     keeps its slot instead, so a pin there never moves an earlier week.
 *     A pin naming a devotion in a strand file that is not live yet
 *     (./family-devotion-file.mjs) waits: the week keeps the rotation, with a
 *     note, until the strand goes live and the map is regenerated. A pin for a
 *     week before the map begins has done its work: a note, not a problem, so
 *     moving FIRST_YEAR on never fails on an old pin.
 *
 * Regenerating with the same inputs writes the same file (CI checks this), and
 * CI fails once fewer than twelve months remain in the map: raise LAST_YEAR
 * and regenerate.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SEASON_KEYS,
  addDays,
  addYears,
  churchYearSpan,
  dayOfWeek,
  easterSunday,
  isISODate,
  isoDate,
  palmSunday,
  seasonsOf,
  sundayOnOrBefore,
  thanksgivingUS,
  weekSeason,
} from "./church-year.mjs";
import { devotionsIn } from "./family-devotion-file.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const MODULE = "client/src/lib/familyYear.generated.ts";
export const OVERRIDES_FILE = "client/public/family-year-overrides.json";
export const SEASONAL_FILE = "client/public/family-seasonal.json";
/** The Foundations strand, in rotation order. */
export const FOUNDATIONS_FILES = ["client/public/family-devotions.json", "client/public/family-devotions-2.json"];
/** Any devotion an override may pin: every client/public/family-devotions*.json file. */
export const DEVOTION_FILE_RE = /^family-devotions(-[a-z0-9-]+)?\.json$/;

/**
 * The church years the map covers (see church-year.mjs for how they are
 * named). Church year 2026 began on Advent Sunday 2025, so the week a reader
 * is in today is always on the map; church year 2031 ends on November 29,
 * 2031. To extend the map, raise LAST_YEAR and regenerate.
 */
export const FIRST_YEAR = 2026;
export const LAST_YEAR = 2031;

/**
 * The Foundations rotation's first slot: Advent Sunday 2026, the start of the
 * first church year The Table serves. Weeks before it count backward.
 */
export const ROTATION_EPOCH = "2026-11-29";

/** CI fails when the map ends less than this many years after today. */
export const HORIZON_YEARS = 1;

/**
 * The daily sets in family-seasonal.json: the season whose weeks each one
 * serves, how many days it holds, and the days it runs in a church year.
 * Advent stays the December 1 to 25 calendar (James, 2026-10-26).
 */
export const SETS = {
  advent: {
    season: "advent",
    days: 25,
    window: (year) => ({ start: isoDate(year - 1, 12, 1), end: isoDate(year - 1, 12, 25) }),
  },
  holyWeek: {
    season: "holy-week",
    days: 8,
    window: (year) => ({ start: palmSunday(year), end: easterSunday(year) }),
  },
  thanksgiving: {
    season: "thanksgiving",
    days: 7,
    window: (year) => ({ start: addDays(thanksgivingUS(year), -6), end: thanksgivingUS(year) }),
  },
};

const readJSON = (root, rel) => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));

/** Everything the map is built from, read from the repo. */
export function loadInputs(root = ROOT) {
  const foundations = FOUNDATIONS_FILES.flatMap((rel) =>
    readJSON(root, rel).map((d) => ({ id: d?.id, file: rel })),
  );
  const devotionIds = new Set();
  const hiddenIds = new Set();
  const titles = {};
  for (const name of fs.readdirSync(path.join(root, "client/public")).sort()) {
    if (!DEVOTION_FILE_RE.test(name)) continue;
    // A plain list, or a strand file held back until it is live (U11): a
    // hidden devotion's title is read too, so the map can name it the day it
    // goes live.
    const { live, devotions } = devotionsIn(readJSON(root, `client/public/${name}`));
    for (const d of devotions) {
      if (typeof d?.id !== "string") continue;
      (live ? devotionIds : hiddenIds).add(d.id);
      if (!(d.id in titles)) titles[d.id] = d.title;
    }
  }
  const seasonal = readJSON(root, SEASONAL_FILE);
  const sets = Object.fromEntries(
    Object.entries(seasonal).map(([key, list]) => [key, Array.isArray(list) ? list.length : -1]),
  );
  const setTitles = Object.fromEntries(
    Object.entries(seasonal).map(([key, list]) => [key, Array.isArray(list) ? list.map((d) => d?.title) : []]),
  );
  const overrides = fs.existsSync(path.join(root, OVERRIDES_FILE)) ? readJSON(root, OVERRIDES_FILE) : { weeks: [] };
  return { foundations, devotionIds, hiddenIds, sets, overrides, titles, setTitles };
}

/** The ordered rotation: Foundations ids, a repeated id kept at its first place. */
export function rotationOf(foundations) {
  const seen = new Set();
  const ids = [];
  const repeated = [];
  for (const { id, file } of foundations) {
    if (typeof id !== "string" || !id) continue;
    if (seen.has(id)) repeated.push(`${file}: devotion id "${id}" is used twice; the year map uses it once`);
    else {
      seen.add(id);
      ids.push(id);
    }
  }
  return { ids, repeated };
}

/**
 * Problems with the overrides file, the valid pins by week, the weeks whose
 * pin waits for a hidden devotion to go live, and notes (a waiting pin, a pin
 * before the map begins).
 */
export function readOverrides(overrides, devotionIds, from, through, hiddenIds = new Set()) {
  const problems = [];
  const notes = [];
  const waiting = new Set();
  const pins = new Map();
  const where = OVERRIDES_FILE;
  if (!overrides || typeof overrides !== "object" || !Array.isArray(overrides.weeks)) {
    return { problems: [`${where}: expected { "weeks": [ ... ] }`], pins, waiting, notes };
  }
  overrides.weeks.forEach((o, i) => {
    const at = `${where} weeks[${i}]`;
    if (!o || typeof o !== "object") return problems.push(`${at}: expected { "week", "devotion" }`);
    const extra = Object.keys(o).filter((k) => !["week", "devotion", "note"].includes(k));
    if (extra.length) problems.push(`${at}: unknown field(s) ${extra.join(", ")}`);
    if (o.note !== undefined && typeof o.note !== "string") problems.push(`${at}: note must be a string`);
    const hidden = typeof o.devotion === "string" && hiddenIds.has(o.devotion);
    const known = typeof o.devotion === "string" && devotionIds.has(o.devotion);
    if (!known && !hidden) problems.push(`${at}: devotion "${o.devotion}" is not an id in any client/public/family-devotions*.json file`);
    if (!isISODate(o.week)) return problems.push(`${at}: week "${o.week}" is not a YYYY-MM-DD date`);
    if (dayOfWeek(o.week) !== 0) return problems.push(`${at}: week ${o.week} is not a Sunday (a week is named by its Sunday)`);
    if (o.week > through) return problems.push(`${at}: week ${o.week} is outside the map (${from} to ${through})`);
    if (o.week < from) return notes.push(`${at}: week ${o.week} is before the map begins (${from}); the pin has done its work and can be removed`);
    if (pins.has(o.week) || waiting.has(o.week)) return problems.push(`${at}: week ${o.week} is pinned twice`);
    if (known) pins.set(o.week, o.devotion);
    else if (hidden) {
      waiting.add(o.week);
      notes.push(`week ${o.week} is pinned to "${o.devotion}", which is hidden until its strand file goes live; the rotation serves that week for now`);
    }
  });
  return { problems, pins, waiting, notes };
}

/**
 * Build the year map from loaded inputs. Returns { map, problems, notes }:
 * problems stop the build, notes are printed.
 */
export function buildYearMap(inputs, { first = FIRST_YEAR, last = LAST_YEAR, epoch = ROTATION_EPOCH } = {}) {
  const problems = [];
  const from = churchYearSpan(first).start;
  const through = churchYearSpan(last).end;

  const { ids: rotation, repeated } = rotationOf(inputs.foundations);
  if (!rotation.length) problems.push(`${FOUNDATIONS_FILES.join(", ")}: no devotions to rotate`);

  // Which daily sets exist, and whether each is the length its window expects.
  const served = new Map(); // season key -> set key
  for (const [key, length] of Object.entries(inputs.sets)) {
    const rule = SETS[key];
    if (!rule) {
      problems.push(`${SEASONAL_FILE}: set "${key}" has no place in the year map; add it to SETS in scripts/lib/family-year.mjs`);
    } else if (length !== rule.days) {
      problems.push(`${SEASONAL_FILE}: set "${key}" has ${length} days; its window in scripts/lib/family-year.mjs expects ${rule.days}`);
    } else {
      served.set(rule.season, key);
    }
  }

  const { problems: pinProblems, pins, waiting, notes: pinNotes } = readOverrides(inputs.overrides, inputs.devotionIds, from, through, inputs.hiddenIds);
  problems.push(...pinProblems);

  const seasons = [];
  const sets = [];
  for (let y = first; y <= last; y++) {
    seasons.push(...seasonsOf(y));
    for (const [key, rule] of Object.entries(SETS)) if (served.get(rule.season) === key) sets.push({ set: key, ...rule.window(y) });
  }
  sets.sort((a, b) => a.start.localeCompare(b.start));

  // Every week from the earlier of the map's start and the epoch, so a week's
  // rotation slot depends only on the rules and the epoch.
  if (dayOfWeek(epoch) !== 0) problems.push(`the rotation epoch ${epoch} is not a Sunday`);
  const begin = epoch < from ? sundayOnOrBefore(epoch) : from;
  const all = [];
  for (let s = begin; s <= through; s = addDays(s, 7)) {
    const season = weekSeason(s);
    const set = served.get(season);
    const pinned = pins.get(s);
    if ((pinned || waiting.has(s)) && set) {
      problems.push(`${OVERRIDES_FILE}: week ${s} is served by the daily "${set}" set in ${SEASONAL_FILE}; pin only a week the rotation serves`);
    }
    all.push({ start: s, season, set, pinned, rotates: !set && !pinned });
  }
  const found = all.findIndex((w) => w.start >= epoch);
  const atEpoch = found === -1 ? all.length : found;
  const slot = new Map();
  for (let i = atEpoch, n = 0; i < all.length; i++) if (all[i].rotates) slot.set(i, n++);
  // Before the epoch the rotation counts backward, so a pin there that gave up
  // its slot would move every week before it, weeks a family may be in the
  // middle of or already have done. There a pin keeps its week's slot: setting
  // it (or a strand going live under it) changes that week and no other.
  for (let i = atEpoch - 1, n = -1; i >= 0; i--) {
    if (all[i].rotates) slot.set(i, n--);
    else if (all[i].pinned) n--;
  }

  const weeks = [];
  all.forEach((w, i) => {
    if (w.start < from) return;
    let devotion = null;
    if (w.pinned) devotion = w.pinned;
    else if (w.rotates && rotation.length) devotion = rotation[((slot.get(i) % rotation.length) + rotation.length) % rotation.length];
    const row = { start: w.start, season: w.season, devotion };
    if (w.set) row.set = w.set;
    if (w.pinned) row.pinned = true;
    weeks.push(row);
  });

  // Titles, so a page can name tonight's devotion from the map alone. Only
  // checked when the inputs carry them (tests may build from ids alone).
  const titles = {};
  const setTitles = {};
  const hasTitle = (t) => typeof t === "string" && t.trim() !== "";
  if (inputs.titles) {
    for (const id of [...new Set(weeks.map((w) => w.devotion).filter(Boolean))].sort()) {
      if (hasTitle(inputs.titles[id])) titles[id] = inputs.titles[id];
      else problems.push(`devotion "${id}" is on the year map but has no title in any client/public/family-devotions*.json file`);
    }
  }
  if (inputs.setTitles) {
    for (const key of Object.keys(SETS)) {
      if (served.get(SETS[key].season) !== key) continue;
      const list = inputs.setTitles[key] ?? [];
      list.forEach((t, i) => {
        if (!hasTitle(t)) problems.push(`${SEASONAL_FILE}: set "${key}" day ${i + 1} has no title`);
      });
      setTitles[key] = list;
    }
  }

  return { map: { from, through, seasons, sets, weeks, rotation, titles, setTitles }, problems, notes: [...repeated, ...pinNotes] };
}

/** A reason the map is too short, or null: it must reach at least a year past today. */
export function horizonProblem(through, today, years = HORIZON_YEARS) {
  const needed = addYears(today, years);
  if (through >= needed) return null;
  return (
    `the family year map ends ${through}, less than twelve months after ${today}. ` +
    `Raise LAST_YEAR in scripts/lib/family-year.mjs and run: node scripts/build-family-year.mjs`
  );
}

/** Today's calendar date where the build runs. */
export function todayISO(now = new Date()) {
  return isoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

const row = (o) => `  ${JSON.stringify(o)},`;

/** The TypeScript module the site imports. */
export function renderYearModule(map) {
  const seasonUnion = SEASON_KEYS.map((k) => JSON.stringify(k)).join(" | ");
  const setUnion = Object.keys(SETS).map((k) => JSON.stringify(k)).join(" | ");
  return [
    "// GENERATED by scripts/build-family-year.mjs from the church-year rules in",
    "// scripts/lib/church-year.mjs, the devotions in client/public/family-devotions*.json,",
    "// the daily sets in client/public/family-seasonal.json, and the hand overrides in",
    "// client/public/family-year-overrides.json. Do not edit by hand: change one of",
    "// those (or LAST_YEAR in scripts/lib/family-year.mjs), then run",
    "//   node scripts/build-family-year.mjs",
    "// Read it through client/src/lib/familyYear.ts.",
    "",
    `export type FamilySeasonKey = ${seasonUnion};`,
    `export type FamilySetKey = ${setUnion};`,
    "",
    "/** A season or one-day feast; start and end are inclusive calendar dates. */",
    "export interface FamilySeason {",
    "  key: FamilySeasonKey;",
    "  start: string;",
    "  end: string;",
    "}",
    "",
    "/** The days a daily set in family-seasonal.json runs; its day 1 is start. */",
    "export interface FamilySetWindow {",
    "  set: FamilySetKey;",
    "  start: string;",
    "  end: string;",
    "}",
    "",
    "/**",
    " * One week, Sunday to Saturday, named by its Sunday. devotion is a",
    " * family-devotions*.json id, or null when the season's daily set serves the",
    " * week. pinned marks a hand override.",
    " */",
    "export interface FamilyWeek {",
    "  start: string;",
    "  season: FamilySeasonKey;",
    "  devotion: string | null;",
    "  set?: FamilySetKey;",
    "  pinned?: true;",
    "}",
    "",
    "/** The first and last day on the map (a Sunday and a Saturday). */",
    `export const FAMILY_YEAR_FROM = ${JSON.stringify(map.from)};`,
    `export const FAMILY_YEAR_THROUGH = ${JSON.stringify(map.through)};`,
    "",
    "/** The Foundations rotation, in order. */",
    `export const FAMILY_ROTATION: string[] = [\n${map.rotation.map((id) => `  ${JSON.stringify(id)},`).join("\n")}\n];`,
    "",
    `export const FAMILY_SEASONS: FamilySeason[] = [\n${map.seasons.map(row).join("\n")}\n];`,
    "",
    `export const FAMILY_SETS: FamilySetWindow[] = [\n${map.sets.map(row).join("\n")}\n];`,
    "",
    "/** Every week on the map, consecutive, in order. */",
    `export const FAMILY_WEEKS: FamilyWeek[] = [\n${map.weeks.map(row).join("\n")}\n];`,
    "",
    "/** The title of every devotion a week above names, by id. */",
    `export const FAMILY_TITLES: Record<string, string> = {\n${Object.entries(map.titles ?? {}).map(([id, t]) => `  ${JSON.stringify(id)}: ${JSON.stringify(t)},`).join("\n")}\n};`,
    "",
    "/** The title of each day of each daily set, day 1 first. */",
    `export const FAMILY_SET_TITLES: Partial<Record<FamilySetKey, string[]>> = {\n${Object.entries(map.setTitles ?? {}).map(([key, list]) => `  ${key}: ${JSON.stringify(list)},`).join("\n")}\n};`,
    "",
  ].join("\n");
}
