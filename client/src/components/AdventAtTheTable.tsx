/**
 * AdventAtTheTable: the family Advent calendar, put in front of a household
 * from the Sunday a week before Advent Sunday through Christmas Day.
 *
 * Two shapes: a quiet line for Home (`variant="line"`) and a card for
 * /family (`variant="card"`). Outside that window both render nothing.
 *
 * The date comes from the reader's own clock on the client's first render
 * (lib/familyYear.ts localISODate) and the year map, never the network. The
 * app mounts with createRoot and the prerendered HTML never contains this,
 * so reading the clock here is already after mount and shifts nothing.
 *
 * The copy keeps Advent and the calendar apart: Advent begins on Advent
 * Sunday; the calendar runs December 1 to 25 (lib/familyAdvent.ts).
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import { localISODate } from "@/lib/familyYear";
import { addDaysISO, adventHref, adventTonight, longDate, type AdventTonight } from "@/lib/familyAdvent";

const BOOKLET = {
  letter: "/downloads/seasonal/advent-family-letter.pdf",
  a4: "/downloads/seasonal/advent-family-a4.pdf",
};

export interface AdventCopy {
  /** The line for Home: lead text, then a link, then a full stop. */
  line: { lead: string; link: string };
  /** The card for /family. */
  heading: string;
  text: string;
  /** Where the line and the card's first link go. */
  href: string;
  /** The card's first link. */
  action: string;
  /** True on a day of the calendar. */
  onDay: boolean;
}

/** The words for a date in the window. Pure, so it is tested without rendering. */
export function adventCopy(a: AdventTonight): AdventCopy {
  const sunday = longDate(a.adventSunday);
  const begins = `Advent begins ${sunday}.`;
  if (a.day) {
    const date = addDaysISO(a.calendarStart, a.day - 1);
    const dayName = longDate(date, { weekday: false });
    const christmas = date === a.calendarEnd;
    return {
      line: {
        lead: `${a.beforeAdvent ? `${begins} ` : ""}${christmas ? "Christmas Day" : "Tonight"} at the table:`,
        link: `${dayName} in the family Advent calendar`,
      },
      heading: christmas ? "Christmas Day" : `Tonight, ${dayName}`,
      text: `${a.beforeAdvent ? `${begins} ` : ""}The reading for ${dayName} in the family Advent calendar, with a question to talk about and a prayer.`,
      href: adventHref(a.day),
      action: "Open the reading",
      onDay: true,
    };
  }
  const startDay = longDate(a.calendarStart, { weekday: false });
  if (a.beforeAdvent) {
    return {
      line: { lead: `${begins} The family Advent calendar runs from ${startDay} to Christmas:`, link: "see the readings" },
      heading: `Advent begins ${sunday}`,
      text: `The family Advent calendar has a short reading for each day from ${startDay} to Christmas, with a question to talk about and a prayer.`,
      href: adventHref(),
      action: "See the readings",
      onDay: false,
    };
  }
  const start = longDate(a.calendarStart);
  return {
    line: { lead: `Advent has begun. The family Advent calendar starts ${start}:`, link: "see the readings" },
    heading: "Advent has begun",
    text: `The family Advent calendar starts ${start}, with a short reading for each day to Christmas, a question to talk about, and a prayer.`,
    href: adventHref(),
    action: "See the readings",
    onDay: false,
  };
}

const quietLink = {
  fontFamily: "var(--U)",
  fontWeight: 500,
  color: "var(--ink)",
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
  paddingBottom: "2px",
} as const;

const cardLink = {
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--mustard-text)",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  minHeight: "44px",
} as const;

export default function AdventAtTheTable({ variant }: { variant: "line" | "card" }) {
  const [today] = useState(() => localISODate());
  const advent = adventTonight(today);
  if (!advent) return null;
  const copy = adventCopy(advent);

  if (variant === "line") {
    return (
      <p
        data-testid="advent-at-the-table"
        style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 var(--s-4)" }}
      >
        {copy.line.lead}{" "}
        <Link href={copy.href} style={{ ...quietLink, fontSize: "16px" }}>
          {copy.line.link}
        </Link>
        .
      </p>
    );
  }

  return (
    <section
      data-testid="advent-at-the-table"
      aria-labelledby="advent-at-the-table-title"
      style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) 0" }}
    >
      <div
        style={{
          maxWidth: "var(--w-default)",
          margin: "0 auto",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderTop: "2px solid var(--mustard)",
          borderRadius: "var(--radius-sm)",
          padding: "var(--s-5) var(--s-4)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: "10px" }}>Advent at the table</div>
        <h2
          id="advent-at-the-table-title"
          style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 10px" }}
        >
          {copy.heading}
        </h2>
        <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", margin: "0 0 8px" }}>
          {copy.text}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", columnGap: "24px", alignItems: "center" }}>
          <Link href={copy.href} style={cardLink}>
            {copy.action} <ArrowRight size={14} aria-hidden />
          </Link>
          {copy.onDay && (
            <Link href={adventHref()} style={cardLink}>
              All the readings
            </Link>
          )}
          <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px" }}>
            Print the booklet:
            <a href={BOOKLET.letter} style={cardLink}>US Letter</a>
            <span aria-hidden="true">·</span>
            <a href={BOOKLET.a4} style={cardLink}>A4</a>
          </span>
        </div>
      </div>
    </section>
  );
}
