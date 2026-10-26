/**
 * The family Advent calendar on the year map (U13): when Home and /family
 * show it, which day tonight is, that no copy says Advent begins December 1
 * unless it does that year, and that the calendar tells Luke's story in order.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { FAMILY_SEASONS, FAMILY_SETS } from "./familyYear.generated";
import { ADVENT_LEAD_DAYS, addDaysISO, adventHref, adventSeasonFor, adventTonight, longDate } from "./familyAdvent";
import { adventCopy } from "@/components/AdventAtTheTable";

const seasonal = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/family-seasonal.json"), "utf8")) as {
  advent: { day: number; label: string; title: string; passage: string }[];
};

describe("adventTonight", () => {
  it("shows the calendar from November 22, 2026, a week before Advent Sunday, through Christmas", () => {
    expect(adventTonight("2026-11-21")).toBeNull();
    expect(adventTonight("2026-11-22")).toEqual({
      adventSunday: "2026-11-29",
      calendarStart: "2026-12-01",
      calendarEnd: "2026-12-25",
      day: null,
      beforeAdvent: true,
    });
    expect(adventTonight("2026-11-29")).toMatchObject({ day: null, beforeAdvent: false });
    expect(adventTonight("2026-11-30")).toMatchObject({ day: null, beforeAdvent: false });
    expect(adventTonight("2026-12-01")).toMatchObject({ day: 1, beforeAdvent: false });
    expect(adventTonight("2026-12-24")).toMatchObject({ day: 24 });
    expect(adventTonight("2026-12-25")).toMatchObject({ day: 25 });
    expect(adventTonight("2026-12-26")).toBeNull();
    expect(adventTonight("2026-10-26")).toBeNull();
  });

  it("follows Advent Sunday as it moves, even when the calendar starts first", () => {
    expect(adventTonight("2027-11-20")).toBeNull();
    expect(adventTonight("2027-11-21")).toMatchObject({ adventSunday: "2027-11-28", day: null, beforeAdvent: true });
    // 2028: Advent Sunday is December 3, after the calendar's first two days.
    expect(adventTonight("2028-11-26")).toMatchObject({ adventSunday: "2028-12-03", day: null, beforeAdvent: true });
    expect(adventTonight("2028-12-01")).toMatchObject({ day: 1, beforeAdvent: true });
    expect(adventTonight("2028-12-03")).toMatchObject({ day: 3, beforeAdvent: false });
  });

  it("answers null off the map or for a date that is not one", () => {
    expect(adventTonight("2099-12-01")).toBeNull();
    expect(adventTonight("2026-12-32")).toBeNull();
    expect(adventTonight("tonight")).toBeNull();
  });

  it("opens every year's window on the Sunday a week before Advent Sunday, for a December 1 to 25 calendar", () => {
    const calendars = FAMILY_SETS.filter((s) => s.set === "advent");
    expect(calendars.length).toBeGreaterThanOrEqual(5);
    for (const c of calendars) {
      const year = c.end.slice(0, 4);
      expect(c).toEqual({ set: "advent", start: `${year}-12-01`, end: `${year}-12-25` });
      const sunday = FAMILY_SEASONS.find((s) => s.key === "advent" && s.end === `${year}-12-24`)?.start;
      expect(sunday, year).toBeTruthy();
      const opens = addDaysISO(sunday!, -ADVENT_LEAD_DAYS);
      expect(new Date(`${opens}T12:00:00Z`).getUTCDay(), opens).toBe(0);
      if (adventSeasonFor(opens)) {
        expect(adventTonight(addDaysISO(opens, -1)), opens).toBeNull();
        expect(adventTonight(opens)?.adventSunday, opens).toBe(sunday);
      }
      expect(adventTonight(c.end)?.day, c.end).toBe(25);
    }
  });
});

describe("adventSeasonFor", () => {
  it("keeps this year's Advent through Christmas Day, then turns to next year's", () => {
    expect(adventSeasonFor("2026-12-25")?.adventSunday).toBe("2026-11-29");
    expect(adventSeasonFor("2026-12-26")?.adventSunday).toBe("2027-11-28");
    expect(adventSeasonFor("2026-10-26")?.adventSunday).toBe("2026-11-29");
  });
});

describe("the words", () => {
  it("formats dates in full", () => {
    expect(longDate("2026-11-29")).toBe("Sunday, November 29");
    expect(longDate("2026-12-01", { weekday: false })).toBe("December 1");
    expect(longDate("2026-11-29", { weekday: false, year: true })).toBe("November 29, 2026");
  });

  it("links to the Advent tab, and to a day of it", () => {
    expect(adventHref()).toBe("/family/devotions?season=advent");
    expect(adventHref(6)).toBe("/family/devotions?season=advent&day=6");
  });

  it("says what tonight is in each part of the window", () => {
    const before = adventCopy(adventTonight("2026-11-22")!);
    expect(before.line.lead).toBe("Advent begins Sunday, November 29. The family Advent calendar runs from December 1 to Christmas:");
    expect(before.heading).toBe("Advent begins Sunday, November 29");
    const begun = adventCopy(adventTonight("2026-11-30")!);
    expect(begun.line.lead).toBe("Advent has begun. The family Advent calendar starts Tuesday, December 1:");
    const sixth = adventCopy(adventTonight("2026-12-06")!);
    expect(sixth.line).toEqual({ lead: "Tonight at the table:", link: "December 6 in the family Advent calendar" });
    expect(sixth.href).toBe("/family/devotions?season=advent&day=6");
    expect(adventCopy(adventTonight("2026-12-25")!).heading).toBe("Christmas Day");
    expect(adventCopy(adventTonight("2028-12-01")!).line.lead).toBe("Advent begins Sunday, December 3. Tonight at the table:");
  });

  it("never says Advent begins on any day but that year's Advent Sunday", () => {
    for (const c of FAMILY_SETS.filter((s) => s.set === "advent")) {
      for (let d = addDaysISO(c.start, -14); d <= c.end; d = addDaysISO(d, 1)) {
        const a = adventTonight(d);
        if (!a) continue;
        const copy = adventCopy(a);
        const said = [copy.line.lead, copy.line.link, copy.heading, copy.text].join(" ");
        for (const m of said.matchAll(/Advent begins ([A-Z][a-z]+, [A-Z][a-z]+ \d+)/g)) {
          expect(m[1], d).toBe(longDate(a.adventSunday));
        }
        expect(said, d).not.toMatch(/—/);
      }
    }
  });
});

describe("the Advent readings in family-seasonal.json", () => {
  it("are twenty-five days, numbered and labeled December 1 to 25", () => {
    expect(seasonal.advent.map((d) => d.day)).toEqual(Array.from({ length: 25 }, (_, i) => i + 1));
    expect(seasonal.advent.map((d) => d.label)).toEqual(Array.from({ length: 25 }, (_, i) => `December ${i + 1}`));
  });

  it("tell Luke's birth story in order through Christmas Eve: the road to Bethlehem before the birth", () => {
    const at = (passage: string) => {
      const m = /^Luke ([12]):(\d+)/.exec(passage);
      return m ? Number(m[1]) * 1000 + Number(m[2]) : null;
    };
    const luke = seasonal.advent
      .filter((d) => d.day <= 24)
      .map((d) => ({ day: d.day, at: at(d.passage), passage: d.passage }))
      .filter((d): d is { day: number; at: number; passage: string } => d.at !== null);
    expect(luke.length).toBeGreaterThan(5);
    for (let i = 1; i < luke.length; i++) {
      expect(luke[i].at, `day ${luke[i].day} (${luke[i].passage}) after day ${luke[i - 1].day} (${luke[i - 1].passage})`).toBeGreaterThan(luke[i - 1].at);
    }
    const journey = seasonal.advent.find((d) => d.passage === "Luke 2:1-5");
    const birth = seasonal.advent.find((d) => d.passage === "Luke 2:6-7");
    expect(journey!.day).toBeLessThan(birth!.day);
  });
});
