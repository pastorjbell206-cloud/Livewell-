/**
 * Reading the generated family year map: the week, season, and seasonal-set
 * day for a date, answered without the network.
 */
import { describe, it, expect } from "vitest";
import {
  familySeasonOn,
  familySetDayOn,
  familyWeekOn,
  localISODate,
  onFamilyMap,
} from "./familyYear";
import { FAMILY_WEEKS, FAMILY_YEAR_FROM, FAMILY_YEAR_THROUGH } from "./familyYear.generated";

describe("familyYear", () => {
  it("finds the week that holds a date, Sunday through Saturday", () => {
    expect(familyWeekOn("2026-12-27")?.start).toBe("2026-12-27");
    expect(familyWeekOn("2026-12-29")).toMatchObject({ start: "2026-12-27", season: "christmas" });
    expect(familyWeekOn("2027-01-02")?.start).toBe("2026-12-27");
    expect(familyWeekOn("2026-11-26")).toMatchObject({ start: "2026-11-22", set: "thanksgiving", devotion: null });
    expect(familyWeekOn(FAMILY_YEAR_FROM)).toBe(FAMILY_WEEKS[0]);
    expect(familyWeekOn(FAMILY_YEAR_THROUGH)).toBe(FAMILY_WEEKS[FAMILY_WEEKS.length - 1]);
  });

  it("answers null off the map or for a malformed date", () => {
    expect(familyWeekOn("2020-01-01")).toBeNull();
    expect(familyWeekOn("2099-01-01")).toBeNull();
    expect(familyWeekOn("tonight")).toBeNull();
    expect(onFamilyMap("2027-1-1")).toBe(false);
    // Not a real day: Date would roll it into March.
    expect(onFamilyMap("2027-02-30")).toBe(false);
    expect(familyWeekOn("2027-02-30")).toBeNull();
    expect(familySeasonOn("2027-02-31")).toBeNull();
    expect(familySetDayOn("2026-12-32")).toBeNull();
    expect(familySeasonOn("2099-01-01")).toBeNull();
    expect(familySetDayOn("2099-12-01")).toBeNull();
  });

  it("names the season in force on a day, which a week may not share", () => {
    expect(familySeasonOn("2027-02-10")).toBe("lent");
    expect(familyWeekOn("2027-02-10")?.season).toBe("ordinary");
    expect(familySeasonOn("2027-01-06")).toBe("epiphany");
    expect(familySeasonOn("2027-01-07")).toBe("ordinary");
    expect(familySeasonOn("2026-11-29")).toBe("advent");
  });

  it("counts the days of a daily set from its first day", () => {
    expect(familySetDayOn("2026-11-30")).toBeNull();
    expect(familySetDayOn("2026-12-01")).toEqual({ set: "advent", day: 1 });
    expect(familySetDayOn("2026-12-25")).toEqual({ set: "advent", day: 25 });
    expect(familySetDayOn("2026-12-26")).toBeNull();
    expect(familySetDayOn("2026-11-20")).toEqual({ set: "thanksgiving", day: 1 });
    expect(familySetDayOn("2026-11-26")).toEqual({ set: "thanksgiving", day: 7 });
    expect(familySetDayOn("2027-03-21")).toEqual({ set: "holyWeek", day: 1 });
    expect(familySetDayOn("2027-03-28")).toEqual({ set: "holyWeek", day: 8 });
  });

  it("reads today from the reader's own clock, not UTC", () => {
    expect(localISODate(new Date(2026, 10, 26, 23, 30))).toBe("2026-11-26");
    expect(localISODate(new Date(2027, 0, 1, 0, 5))).toBe("2027-01-01");
  });
});
