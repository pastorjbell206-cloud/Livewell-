/**
 * "This week's" catechism question walks every question, so questions 53 to
 * 76 (the twelve "Hard Questions Children Ask" among them) get their weeks;
 * the first version stopped at 52.
 */
import { describe, it, expect } from "vitest";
import { catechismWeekIndex } from "./familyCatechism";

const day = (y: number, m: number, d: number) => new Date(y, m - 1, d, 12);

describe("catechismWeekIndex", () => {
  it("gives every one of 76 questions a week in 76 consecutive weeks", () => {
    const seen = new Set<number>();
    for (let w = 0; w < 76; w++) seen.add(catechismWeekIndex(day(2026, 1, 4 + 7 * w), 76));
    expect(seen.size).toBe(76);
    expect([...seen].every((i) => i >= 0 && i < 76)).toBe(true);
  });

  it("reaches question 53 and beyond, where the capped version stopped", () => {
    // The last week of 2026: the capped version showed question 52 here and
    // then went back to question 1 in January.
    expect(catechismWeekIndex(day(2026, 12, 27), 76) + 1).toBe(53);
    expect(catechismWeekIndex(day(2027, 1, 3), 76) + 1).toBe(54);
    expect(catechismWeekIndex(day(2027, 6, 6), 76) + 1).toBe(76);
    expect(catechismWeekIndex(day(2027, 6, 13), 76) + 1).toBe(1);
  });

  it("keeps the question 2026 already showed", () => {
    expect(catechismWeekIndex(day(2026, 1, 1), 76) + 1).toBe(1);
    expect(catechismWeekIndex(day(2026, 1, 4), 76) + 1).toBe(2);
    expect(catechismWeekIndex(day(2026, 10, 26), 76) + 1).toBe(44);
  });

  it("holds one question from Sunday through Saturday, across a clock change", () => {
    // US daylight saving began Sunday, March 8, 2026.
    const sunday = catechismWeekIndex(new Date(2026, 2, 8, 0, 30), 76);
    for (let d = 8; d <= 14; d++) expect(catechismWeekIndex(new Date(2026, 2, d, 23, 30), 76)).toBe(sunday);
    expect(catechismWeekIndex(new Date(2026, 2, 15, 0, 30), 76)).toBe((sunday + 1) % 76);
  });

  it("follows the list's length when the list changes", () => {
    for (let w = 0; w < 200; w++) expect(catechismWeekIndex(day(2026, 1, 4 + 7 * w), 68)).toBeLessThan(68);
    expect(catechismWeekIndex(day(2026, 1, 4), 0)).toBe(0);
  });
});
