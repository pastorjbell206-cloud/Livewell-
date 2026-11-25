/**
 * The church year and the family year map (U10). The rules in
 * scripts/lib/church-year.mjs give the known dates; the year map built from
 * them (client/src/lib/familyYear.generated.ts) regenerates to the same file,
 * uses every Foundations devotion, honours the hand overrides, and fails once
 * fewer than twelve months remain.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  addDays,
  adventSunday,
  ashWednesday,
  christmas,
  churchYearOf,
  churchYearSpan,
  dayOfWeek,
  daysBetween,
  easterSunday,
  pentecost,
  palmSunday,
  seasonOn,
  seasonsOf,
  thanksgivingUS,
  weekSeason,
  // @ts-expect-error: a plain .mjs build module without types
} from "../scripts/lib/church-year.mjs";
import {
  FIRST_YEAR,
  LAST_YEAR,
  MODULE,
  ROOT,
  ROTATION_EPOCH,
  buildYearMap,
  horizonProblem,
  loadInputs,
  renderYearModule,
  todayISO,
  // @ts-expect-error: a plain .mjs build module without types
} from "../scripts/lib/family-year.mjs";

type Week = { start: string; season: string; devotion: string | null; set?: string; pinned?: true };
type Built = {
  map: {
    from: string;
    through: string;
    seasons: { key: string; start: string; end: string }[];
    sets: { set: string; start: string; end: string }[];
    weeks: Week[];
    rotation: string[];
    titles: Record<string, string>;
    setTitles: Record<string, string[]>;
  };
  problems: string[];
  notes: string[];
};

const inputs = loadInputs();
const built: Built = buildYearMap(inputs);
const weekAt = (b: Built, start: string) => b.map.weeks.find((w) => w.start === start);

describe("church-year rules", () => {
  it("give the dates the plan names", () => {
    expect(adventSunday(2026)).toBe("2026-11-29");
    expect(easterSunday(2027)).toBe("2027-03-28");
    expect(ashWednesday(2027)).toBe("2027-02-10");
    expect(pentecost(2027)).toBe("2027-05-16");
    expect(palmSunday(2027)).toBe("2027-03-21");
    expect(thanksgivingUS(2026)).toBe("2026-11-26");
  });

  it("give the published Easter dates, including the earliest and latest possible", () => {
    const known: Record<number, string> = {
      2000: "2000-04-23",
      2008: "2008-03-23",
      2011: "2011-04-24",
      2016: "2016-03-27",
      2019: "2019-04-21",
      2024: "2024-03-31",
      2025: "2025-04-20",
      2026: "2026-04-05",
      2028: "2028-04-16",
      2029: "2029-04-01",
      2030: "2030-04-21",
      2031: "2031-04-13",
      2032: "2032-03-28",
      2038: "2038-04-25",
      2285: "2285-03-22",
    };
    for (const [year, date] of Object.entries(known)) expect(easterSunday(Number(year)), year).toBe(date);
  });

  it("give Advent Sundays and Thanksgivings across the map", () => {
    expect([2025, 2027, 2028, 2029, 2030, 2031].map(adventSunday)).toEqual([
      "2025-11-30",
      "2027-11-28",
      "2028-12-03",
      "2029-12-02",
      "2030-12-01",
      "2031-11-30",
    ]);
    expect([2025, 2027, 2028, 2029, 2030, 2031].map(thanksgivingUS)).toEqual([
      "2025-11-27",
      "2027-11-25",
      "2028-11-23",
      "2029-11-22",
      "2030-11-28",
      "2031-11-27",
    ]);
  });

  it("hold their invariants for three centuries", () => {
    for (let y = 1900; y <= 2200; y++) {
      const easter = easterSunday(y);
      expect(dayOfWeek(easter), `Easter ${y}`).toBe(0);
      expect(easter >= `${y}-03-22` && easter <= `${y}-04-25`, `Easter ${y}`).toBe(true);
      expect(dayOfWeek(ashWednesday(y)), `Ash Wednesday ${y}`).toBe(3);
      expect(dayOfWeek(pentecost(y)), `Pentecost ${y}`).toBe(0);
      const advent = adventSunday(y);
      expect(dayOfWeek(advent), `Advent ${y}`).toBe(0);
      expect(advent >= `${y}-11-27` && advent <= `${y}-12-03`, `Advent ${y}`).toBe(true);
      // Four Sundays before Christmas: Christmas falls 22 to 28 days after Advent Sunday.
      const gap = daysBetween(advent, christmas(y));
      expect(gap >= 22 && gap <= 28, `Advent ${y}`).toBe(true);
      const thanks = thanksgivingUS(y);
      expect(dayOfWeek(thanks), `Thanksgiving ${y}`).toBe(4);
      expect(thanks >= `${y}-11-22` && thanks <= `${y}-11-28`, `Thanksgiving ${y}`).toBe(true);
    }
  });

  it("name a church year by the year of its Easter", () => {
    expect(churchYearOf("2026-11-28")).toBe(2026);
    expect(churchYearOf("2026-11-29")).toBe(2027);
    expect(churchYearSpan(2027)).toEqual({ start: "2026-11-29", end: "2027-11-27" });
    expect(seasonOn("2027-02-10")).toBe("lent");
    expect(seasonOn("2027-02-09")).toBe("ordinary");
    expect(seasonOn("2027-01-05")).toBe("christmas");
    expect(seasonOn("2027-03-27")).toBe("holy-week");
    expect(seasonOn("2027-05-15")).toBe("easter");
  });

  it("give each week the season of its Sunday, and a feast the week it falls in", () => {
    const weeks: string[] = [];
    for (let s = "2026-10-25"; s <= "2027-05-30"; s = addDays(s, 7)) weeks.push(`${s} ${weekSeason(s)}`);
    expect(weeks).toEqual([
      "2026-10-25 ordinary",
      "2026-11-01 all-saints",
      "2026-11-08 ordinary",
      "2026-11-15 ordinary",
      "2026-11-22 thanksgiving",
      "2026-11-29 advent",
      "2026-12-06 advent",
      "2026-12-13 advent",
      "2026-12-20 advent",
      "2026-12-27 christmas",
      "2027-01-03 epiphany",
      // This winter's five plain weeks; Ash Wednesday's week stays plain.
      "2027-01-10 ordinary",
      "2027-01-17 ordinary",
      "2027-01-24 ordinary",
      "2027-01-31 ordinary",
      "2027-02-07 ordinary",
      "2027-02-14 lent",
      "2027-02-21 lent",
      "2027-02-28 lent",
      "2027-03-07 lent",
      "2027-03-14 lent",
      "2027-03-21 holy-week",
      "2027-03-28 easter",
      "2027-04-04 easter",
      "2027-04-11 easter",
      "2027-04-18 easter",
      "2027-04-25 easter",
      "2027-05-02 easter",
      "2027-05-09 easter",
      "2027-05-16 pentecost",
      "2027-05-23 ordinary",
      "2027-05-30 ordinary",
    ]);
    // Epiphany on a Sunday, and a week of Christmas that holds no feast.
    expect(weekSeason("2030-01-06")).toBe("epiphany");
    expect(weekSeason("2029-12-30")).toBe("christmas");
    // Advent's fourth Sunday on Christmas Eve keeps that week in Advent.
    expect(weekSeason("2028-12-24")).toBe("advent");
    expect(() => weekSeason("2027-01-06")).toThrow(/Sunday/);
  });

  it("list each church year's seasons in date order without overlap", () => {
    for (let y = 2026; y <= 2040; y++) {
      const s = seasonsOf(y);
      for (let i = 0; i < s.length; i++) {
        expect(s[i].start <= s[i].end, `${y} ${s[i].key}`).toBe(true);
        if (i) expect(s[i].start > s[i - 1].end, `${y} ${s[i].key}`).toBe(true);
      }
    }
  });
});

describe("the family year map", () => {
  it("builds from the committed inputs without problems", () => {
    expect(built.problems).toEqual([]);
  });

  it("regenerates to the committed file (run node scripts/build-family-year.mjs if this fails)", () => {
    const committed = fs.readFileSync(path.join(ROOT, MODULE), "utf8");
    expect(renderYearModule(built.map)).toBe(committed);
  });

  it("has at least twelve months left", () => {
    expect(horizonProblem(built.map.through, todayISO())).toBeNull();
  });

  it("fails with under twelve months left", () => {
    expect(horizonProblem("2031-11-29", "2030-11-29")).toBeNull();
    expect(horizonProblem("2031-11-29", "2030-11-30")).toMatch(/less than twelve months/);
    expect(horizonProblem("2031-11-29", "2031-06-01")).toMatch(/Raise LAST_YEAR/);
    expect(horizonProblem("2031-11-29", "2032-01-01")).not.toBeNull();
  });

  it("covers whole church years in consecutive weeks", () => {
    const { from, through, weeks } = built.map;
    expect(from).toBe(churchYearSpan(FIRST_YEAR).start);
    expect(through).toBe(churchYearSpan(LAST_YEAR).end);
    expect(dayOfWeek(from)).toBe(0);
    expect(dayOfWeek(through)).toBe(6);
    weeks.forEach((w, i) => expect(w.start, `week ${i}`).toBe(addDays(from, 7 * i)));
    expect(addDays(weeks[weeks.length - 1].start, 6)).toBe(through);
    // Five years ahead of the day this map was first built.
    expect(through >= "2031-10-26").toBe(true);
  });

  it("serves set weeks from the set and every other week from a real devotion", () => {
    const ids = new Set<string>(inputs.devotionIds);
    for (const w of built.map.weeks) {
      if (w.set) expect(w.devotion, w.start).toBeNull();
      else expect(ids.has(w.devotion as string), `${w.start} ${w.devotion}`).toBe(true);
    }
    expect(weekAt(built, "2026-11-22")).toMatchObject({ season: "thanksgiving", set: "thanksgiving", devotion: null });
    expect(weekAt(built, "2026-11-29")).toMatchObject({ season: "advent", set: "advent", devotion: null });
    expect(weekAt(built, "2027-03-21")).toMatchObject({ season: "holy-week", set: "holyWeek", devotion: null });
  });

  it("runs the rotation in order from the epoch, so every Foundations devotion is used", () => {
    const { rotation, weeks } = built.map;
    expect(rotation.length).toBeGreaterThanOrEqual(70);
    expect(new Set(rotation).size).toBe(rotation.length);
    const rotating = weeks.filter((w) => w.start >= ROTATION_EPOCH && !w.set && !w.pinned);
    rotating.forEach((w, i) => expect(w.devotion, w.start).toBe(rotation[i % rotation.length]));
    expect(new Set(rotating.map((w) => w.devotion)).size).toBe(rotation.length);
    // The first week after Advent 2026 opens the rotation.
    expect(weekAt(built, "2026-12-27")?.devotion).toBe(rotation[0]);
  });

  it("keeps each week's devotion when the map's first year moves", () => {
    const later: Built = buildYearMap(inputs, { first: FIRST_YEAR + 2 });
    expect(later.problems).toEqual([]);
    for (const w of later.map.weeks) expect(w, w.start).toEqual(weekAt(built, w.start));
  });

  it("lists the set windows that match the sets' own day labels", () => {
    const seasonal = JSON.parse(fs.readFileSync(path.join(ROOT, "client/public/family-seasonal.json"), "utf8"));
    expect(seasonal.advent[0].label).toBe("December 1");
    expect(seasonal.advent[24].label).toBe("December 25");
    expect(seasonal.holyWeek[0].label).toBe("Palm Sunday");
    expect(seasonal.holyWeek[7].label).toBe("Easter Sunday");
    expect(seasonal.thanksgiving[0].label).toBe("The Friday before Thanksgiving");
    expect(seasonal.thanksgiving[6].label).toBe("Thanksgiving Day");
    const windows = built.map.sets.filter((s) => s.start >= "2026-11-01" && s.end <= "2027-04-30");
    expect(windows).toEqual([
      { set: "thanksgiving", start: "2026-11-20", end: "2026-11-26" },
      { set: "advent", start: "2026-12-01", end: "2026-12-25" },
      { set: "holyWeek", start: "2027-03-21", end: "2027-03-28" },
    ]);
  });
});

describe("the year map's hand overrides and sets", () => {
  const withPins = (weeks: unknown[]) => ({ ...inputs, overrides: { weeks } });

  it("pin a devotion without using up a rotation slot", () => {
    const pinned: Built = buildYearMap(withPins([{ week: "2027-01-17", devotion: "the-incarnation", note: "test" }]));
    expect(pinned.problems).toEqual([]);
    const before = weekAt(built, "2027-01-17")?.devotion;
    expect(weekAt(pinned, "2027-01-17")).toMatchObject({ devotion: "the-incarnation", pinned: true });
    // The devotion the pin displaced moves to the next week, and so on down the line.
    expect(weekAt(pinned, "2027-01-24")?.devotion).toBe(before);
    expect(weekAt(pinned, "2027-01-10")?.devotion).toBe(weekAt(built, "2027-01-10")?.devotion);
  });

  it("refuse a pin that is not a Sunday, off the map, twice, unknown, or malformed", () => {
    const bad: Built = buildYearMap(
      withPins([
        { week: "2027-01-18", devotion: "hope" },
        { week: "2040-01-01", devotion: "hope" },
        { week: "2027-01-10", devotion: "hope" },
        { week: "2027-01-10", devotion: "love" },
        { week: "2027-01-24", devotion: "no-such-devotion" },
        { week: "January", devotion: "hope" },
        { week: "2027-01-31", devotion: "hope", colour: "red" },
      ]),
    );
    const text = bad.problems.join("\n");
    expect(text).toMatch(/2027-01-18 is not a Sunday/);
    expect(text).toMatch(/2040-01-01 is outside the map/);
    expect(text).toMatch(/2027-01-10 is pinned twice/);
    expect(text).toMatch(/"no-such-devotion" is not an id/);
    expect(text).toMatch(/"January" is not a YYYY-MM-DD date/);
    expect(text).toMatch(/unknown field\(s\) colour/);
    expect(buildYearMap({ ...inputs, overrides: [] }).problems.join("\n")).toMatch(/expected \{ "weeks"/);
  });

  it("refuse a pin on a week a daily set serves", () => {
    const onSet: Built = buildYearMap(withPins([{ week: "2026-11-22", devotion: "gratitude" }]));
    expect(onSet.problems.join("\n")).toMatch(/week 2026-11-22 is served by the daily "thanksgiving" set/);
  });

  it("refuse a seasonal set it cannot place or whose length changed", () => {
    expect(buildYearMap({ ...inputs, sets: { ...inputs.sets, lent: 40 } }).problems.join("\n")).toMatch(/"lent" has no place/);
    expect(buildYearMap({ ...inputs, sets: { ...inputs.sets, advent: 26 } }).problems.join("\n")).toMatch(/"advent" has 26 days/);
  });

  it("hand a season's weeks to the rotation while it has no set", () => {
    const noThanks: Built = buildYearMap({ ...inputs, sets: { advent: 25, holyWeek: 8 } });
    expect(noThanks.problems).toEqual([]);
    const w = weekAt(noThanks, "2026-11-22");
    expect(w?.season).toBe("thanksgiving");
    expect(w?.set).toBeUndefined();
    expect(typeof w?.devotion).toBe("string");
    expect(noThanks.map.sets.some((s) => s.set === "thanksgiving")).toBe(false);
  });

  it("carry a title for every devotion a week names and every day of every set", () => {
    const named = new Set(built.map.weeks.map((w) => w.devotion).filter((id): id is string => !!id));
    expect(Object.keys(built.map.titles).sort()).toEqual([...named].sort());
    for (const id of named) expect(built.map.titles[id]).toBe(inputs.titles[id]);
    for (const [key, days] of Object.entries(inputs.sets as Record<string, number>)) {
      expect(built.map.setTitles[key]).toHaveLength(days);
      expect(built.map.setTitles[key].every((t) => typeof t === "string" && t.length > 0)).toBe(true);
    }
    expect(built.map.setTitles.advent[5]).toBe("A Child Is Given");
  });

  it("refuse a devotion or a set day with no title", () => {
    const id = built.map.weeks.find((w) => w.devotion)!.devotion!;
    const noTitle: Built = buildYearMap({ ...inputs, titles: { ...inputs.titles, [id]: "" } });
    expect(noTitle.problems.join("\n")).toMatch(new RegExp(`devotion "${id}" is on the year map but has no title`));
    const advent = [...inputs.setTitles.advent];
    advent[2] = undefined;
    const noDay: Built = buildYearMap({ ...inputs, setTitles: { ...inputs.setTitles, advent } });
    expect(noDay.problems.join("\n")).toMatch(/set "advent" day 3 has no title/);
  });

  it("note a devotion id used twice and keep it once", () => {
    const twice: Built = buildYearMap({ ...inputs, foundations: [...inputs.foundations, { id: "hope", file: "x.json" }] });
    expect(twice.notes.join("\n")).toMatch(/"hope" is used twice/);
    expect(twice.map.rotation.filter((id) => id === "hope")).toHaveLength(1);
  });
});
