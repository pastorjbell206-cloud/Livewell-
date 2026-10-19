/**
 * A reminder the reader adds to their own calendar: a valid repeating event,
 * in local time, that a calendar app will read.
 */
import { describe, expect, it } from "vitest";
import { buildIcs, foldLine, googleCalendarUrl, icsText, type Reminder } from "./calendar";

const reminder: Reminder = {
  title: "Eight Weeks Toward a Quieter Mind",
  details: "This week's step, with the practice, the reading, and the question.",
  url: "https://www.livewellbyjamesbell.co/plans/anxiety",
  freq: "WEEKLY",
  count: 8,
  hour: 20,
  start: new Date(2026, 9, 20),
};

describe("buildIcs", () => {
  const ics = buildIcs(reminder, new Date(Date.UTC(2026, 9, 19, 18, 0, 0)), "test@livewellbyjamesbell.co");
  const lines = ics.split("\r\n");

  it("is a complete calendar with one repeating event and an alert", () => {
    expect(lines[0]).toBe("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("UID:test@livewellbyjamesbell.co");
    expect(ics).toContain("DTSTAMP:20261019T180000Z");
    expect(ics).toContain("RRULE:FREQ=WEEKLY;COUNT=8");
    expect(ics).toContain("BEGIN:VALARM");
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
  });

  it("starts at the chosen local time, with no time zone (floating)", () => {
    expect(ics).toContain("DTSTART:20261020T200000");
    expect(ics).not.toMatch(/DTSTART:[0-9T]+Z/);
  });

  it("uses CRLF line endings and keeps every line within 75 octets", () => {
    expect(ics.includes("\r\n")).toBe(true);
    for (const l of lines) expect(new TextEncoder().encode(l).length).toBeLessThanOrEqual(75);
  });

  it("caps the repeat count", () => {
    expect(buildIcs({ ...reminder, count: 10_000 })).toContain("COUNT=400");
  });
});

describe("text escaping and folding", () => {
  it("escapes commas, semicolons, backslashes, and newlines", () => {
    expect(icsText("a, b; c\\d\ne")).toBe("a\\, b\\; c\\\\d\\ne");
  });

  it("folds long lines with a leading space", () => {
    const folded = foldLine(`DESCRIPTION:${"x".repeat(200)}`);
    expect(folded.split("\r\n").length).toBeGreaterThan(2);
    expect(folded.split("\r\n").slice(1).every((l) => l.startsWith(" "))).toBe(true);
  });
});

describe("googleCalendarUrl", () => {
  it("fills in the title, times, and the repeat rule", () => {
    const url = new URL(googleCalendarUrl(reminder));
    expect(url.hostname).toBe("calendar.google.com");
    expect(url.searchParams.get("action")).toBe("TEMPLATE");
    expect(url.searchParams.get("text")).toBe(reminder.title);
    expect(url.searchParams.get("dates")).toBe("20261020T200000/20261020T201500");
    expect(url.searchParams.get("recur")).toBe("RRULE:FREQ=WEEKLY;COUNT=8");
    expect(url.searchParams.get("details")).toContain(reminder.url);
  });
});
