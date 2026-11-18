/**
 * Home's tonight line (master plan 3.2, U18): tonight's family devotion by
 * name, "Continue" beside it when this device has something to pick up
 * again, and from the Sunday a week before Advent Sunday until the calendar
 * starts, the Advent line (U13). Nothing at all when there is nothing to show.
 *
 * Tonight comes from the reader's own clock and the static year map
 * (lib/familyTable, lib/familyAdvent), titles included, so it never waits on
 * the network. The app mounts with createRoot and the prerendered HTML never
 * holds this line, so the clock and this device's storage are read on the
 * client's first render, after the static hero has painted; reading them
 * there rather than in an effect keeps the doors below from jumping.
 */
import { useState } from "react";
import { Link } from "wouter";

import { adventCopy } from "@/components/AdventAtTheTable";
import { adventTonight } from "@/lib/familyAdvent";
import { devotionHref, seasonalId, tonightOn, tonightTitle, type Tonight } from "@/lib/familyTable";
import type { FamilySetKey } from "@/lib/familyYear.generated";
import { localISODate } from "@/lib/familyYear";
import { continueHere, type ContinueItem } from "@/lib/myProgress";

/** A line that names a devotion: lead text, the title as the link, then the rest. */
export interface TonightLine {
  lead: string;
  title: string;
  href: string;
  after: string;
}

/** A line with a plain link: lead text, then the link. */
export interface AdventLine {
  lead: string;
  link: string;
  href: string;
}

export interface HomeTonightCopy {
  tonight: TonightLine | null;
  advent: AdventLine | null;
}

const SET_NAME: Record<FamilySetKey, string> = { advent: "Advent", holyWeek: "Holy Week", thanksgiving: "Thanksgiving week" };

/** The Advent set is the December 1 to 25 calendar (lib/familyAdvent.ts), so its day N is December N. */
const adventDay = (day: number) => `December ${day} in the family Advent calendar`;

function lineFor(t: Tonight, lead = "Tonight at the table:"): TonightLine | null {
  const title = tonightTitle(t);
  if (!title) return null;
  const after = t.set === "advent" && t.day ? `, ${adventDay(t.day)}` : t.set ? `, a reading for ${SET_NAME[t.set]}` : "";
  return { lead, title, href: devotionHref(t.id), after };
}

/**
 * What Home says on a calendar date (YYYY-MM-DD, the reader's own). Pure, so
 * every case is tested without rendering:
 *
 * - On a day of the Advent calendar, tonight is that day, in U13's words
 *   ("Tonight at the table:", "Christmas Day at the table:", and "Advent
 *   begins ..." first in a year when the calendar starts before Advent).
 * - From the Sunday a week before Advent Sunday until the calendar starts,
 *   tonight's devotion (Thanksgiving week's, for one) and U13's Advent line
 *   beneath it. On Advent Sunday and the nights after it before December 1,
 *   the year map hands tonight December 1's reading early; Home leaves that to
 *   /family and says only that the calendar starts December 1.
 * - Any other night on the map, tonight's devotion. Off the map, nothing.
 */
export function homeTonight(date: string): HomeTonightCopy {
  const tonight = tonightOn(date);
  const advent = adventTonight(date);
  if (!advent) return { tonight: tonight && lineFor(tonight), advent: null };

  const copy = adventCopy(advent);
  if (advent.day) {
    const line = lineFor({ id: seasonalId("advent", advent.day), set: "advent", day: advent.day }, copy.line.lead);
    if (line) return { tonight: line, advent: null };
  }
  return {
    tonight: tonight && tonight.set !== "advent" ? lineFor(tonight) : null,
    advent: { lead: copy.line.lead, link: copy.line.link, href: copy.href },
  };
}

export default function HomeTonight() {
  const [{ copy, next }] = useState<{ copy: HomeTonightCopy; next: ContinueItem | null }>(() => ({
    copy: homeTonight(localISODate()),
    next: continueHere(),
  }));
  const { tonight, advent } = copy;
  if (!tonight && !advent && !next) return null;

  return (
    <div className="home-tonight">
      {(tonight || next) && (
        <div className="home-tonight__row">
          {tonight && (
            <p className="home-tonight__line" data-testid="home-tonight">
              {tonight.lead}{" "}
              <Link href={tonight.href} className="home-tonight__link">
                {tonight.title}
              </Link>
              {tonight.after}
              {/[.?!]$/.test(tonight.after || tonight.title) ? "" : "."}
            </p>
          )}
          {next && (
            <p className="home-tonight__line" data-testid="home-continue">
              <Link href={next.href} className="home-tonight__link">
                Continue {next.label}
              </Link>
            </p>
          )}
        </div>
      )}
      {advent && (
        <p className="home-tonight__line home-tonight__line--quiet" data-testid="advent-at-the-table">
          {advent.lead}{" "}
          <Link href={advent.href} className="home-tonight__link">
            {advent.link}
          </Link>
          .
        </p>
      )}
    </div>
  );
}
