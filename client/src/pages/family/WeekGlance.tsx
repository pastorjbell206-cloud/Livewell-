/**
 * The week at a glance, on /family (TOOLS-PLAN 19, first form): four rows a
 * parent can read in one look, each one tap into the thing.
 *
 * - At the table: this week's devotion (tonight's, from the static year map),
 *   and "Done this week" when this device has it marked.
 * - Learn: the family's catechism question (its own place, or the calendar's).
 * - Read: today's day in a reading plan the family started, or "Start a
 *   reading plan".
 * - This season: the daily sets running now or next (Thanksgiving week,
 *   Advent, Holy Week), from the year map.
 *
 * Nothing here counts what was missed. Every row is data the site already
 * resolves (lib/familyTable, lib/familyCatechism, lib/familyPlans); titles
 * and the question fill in when the family index arrives.
 */
import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, CalendarDays, MessageCircleQuestion, UtensilsCrossed, type LucideIcon } from "lucide-react";

import { localISODate } from "@/lib/familyYear";
import { FAMILY_SETS } from "@/lib/familyYear.generated";
import { readCatechismPlace } from "@/lib/familyCatechism";
import { catechismFor, devotionHref, doneThisWeek, readFamilyProgress, tonightOn, tonightTitle, type FamilyIndex } from "@/lib/familyTable";
import { usePlanToday } from "./DoneThisWeek";

/** The library tab for each daily set, and its name until the index says it. */
const SET_TAB = { thanksgiving: "thanksgiving", advent: "advent", holyWeek: "holy-week" } as const;
const SET_NAME = { thanksgiving: "Thanksgiving week", advent: "Advent", holyWeek: "Holy Week" } as const;

const MONTH = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" });
const dateParts = (iso: string) => ({ y: Number(iso.slice(0, 4)), m: MONTH.format(new Date(`${iso}T12:00:00Z`)), d: Number(iso.slice(8, 10)) });

/** "November 20 to 26", "March 29 to April 5", with the year when it is not this one. */
export function spanSaid(start: string, end: string, thisYear: number): string {
  const a = dateParts(start);
  const b = dateParts(end);
  const tail = b.y !== thisYear ? `, ${b.y}` : "";
  return a.m === b.m ? `${a.m} ${a.d} to ${b.d}${tail}` : `${a.m} ${a.d} to ${b.m} ${b.d}${tail}`;
}

function Row({ icon: Icon, label, href, title, note }: { icon: LucideIcon; label: string; href: string; title: string; note?: string }) {
  return (
    <li>
      <Link href={href} className="fw-row">
        <span className="lw-tile__icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className="fw-row__text">
          <span className="fw-row__label">{label}</span>
          <span className="fw-row__title">{title}</span>
          {note && <span className="fw-row__note">{note}</span>}
        </span>
      </Link>
    </li>
  );
}

export default function WeekGlance({ index }: { index: FamilyIndex | null }) {
  const [today] = useState(() => localISODate());
  const [tonight] = useState(() => tonightOn(today));
  const [done] = useState(() => (tonight ? doneThisWeek(readFamilyProgress(), tonight.id, today) : null));
  const [place] = useState(() => readCatechismPlace());
  const plan = usePlanToday(today);
  const row = tonight ? index?.devotions.find((r) => r.id === tonight.id) : undefined;
  const title = row?.title ?? (tonight ? tonightTitle(tonight) : null);
  const question = index ? catechismFor(index.catechism, place) : null;
  const sets = FAMILY_SETS.filter((w) => w.end >= today).slice(0, 2);
  const year = Number(today.slice(0, 4));

  return (
    <ul className="fw-week" aria-label="This week">
      {tonight && title && (
        <Row icon={UtensilsCrossed} label="At the table" href={devotionHref(tonight.id)} title={title} note={done ? "Done this week" : row?.passage} />
      )}
      <Row
        icon={MessageCircleQuestion}
        label={question ? (question.own ? `Learn · Your question ${question.line.number}` : `Learn · Question ${question.line.number}`) : "Learn"}
        href="/family/catechism"
        title={question?.line.question ?? "The family catechism"}
      />
      <Row
        icon={BookOpen}
        label="Read"
        href="/family/reading-plans"
        title={plan ? `${plan.title}: ${plan.passage}` : "Start a reading plan"}
        note={plan ? `Day ${plan.day} of ${plan.total}` : "A passage a day"}
      />
      {sets.map((w) => (
        <Row
          key={w.start}
          icon={CalendarDays}
          label={w.start <= today ? "This season · now" : "This season · next"}
          href={`/family/devotions?tab=${SET_TAB[w.set]}`}
          title={index?.sets[w.set]?.label ?? SET_NAME[w.set]}
          note={spanSaid(w.start, w.end, year)}
        />
      ))}
    </ul>
  );
}
