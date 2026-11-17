/**
 * Tonight at the table, the first thing on /family: tonight's devotion (its
 * title, passage, and ten minutes), "Start" straight into table mode, and
 * where the family is on this device ("Week 48 of the year", "Day 6 of 25",
 * "Last time: Made On Purpose, Tuesday"). Tonight comes from the static year
 * map and the reader's own calendar; the title and passage from the family
 * index. Never a streak or a count of nights. Once the family has done the
 * week's devotion, the card says so and offers the rest of the week
 * (DoneThisWeek) in place of the same Start button.
 */
import { useState } from "react";
import { Link } from "wouter";
import LoadFailed from "@/components/LoadFailed";
import { Position } from "@/components/study/Position";
import { localISODate } from "@/lib/familyYear";
import { devotionHref, doneThisWeek, lastDone, nightLabel, placeOf, readFamilyProgress, tableHref, tonightOn, weekOfYear, whenSaid, type FamilyIndex } from "@/lib/familyTable";
import DoneThisWeek from "./DoneThisWeek";
import type { Loaded } from "./useFamilyData";

export default function TonightCard({ index, retry }: { index: Loaded<FamilyIndex>; retry: () => void }) {
  const [today] = useState(() => localISODate());
  const [progress] = useState(() => readFamilyProgress());
  const tonight = tonightOn(today);

  if (index.status === "failed") {
    return <LoadFailed what="Tonight's devotion" onRetry={retry} backHref="/family/devotions" backLabel="All family devotions" />;
  }
  const data = index.status === "ready" ? index.value : null;
  const row = data && tonight ? data.devotions.find((r) => r.id === tonight.id) : undefined;
  const last = lastDone(progress);
  const lastRow = data && last ? data.devotions.find((r) => r.id === last.id) : undefined;
  const place = data && row ? placeOf(row, data) : null;
  const setLabel = data && row?.set ? data.sets[row.set]?.label : undefined;
  // Once the week's devotion is done, the other nights get something new (audit 2026-11, F3).
  const done = tonight ? doneThisWeek(progress, tonight.id, today) : null;

  return (
    <section className="tb-tonight" aria-labelledby="tb-tonight-label" aria-busy={!data}>
      <p id="tb-tonight-label" className="eyebrow" style={{ margin: 0 }}>
        Tonight at the table
      </p>
      {data && !row && (
        <>
          <h2 className="tb-tonight__title">
            Choose tonight's devotion
          </h2>
          <p className="tb-tonight__meta">No devotion is set for this date yet.</p>
          <div className="tb-tonight__actions">
            <Link href="/family/devotions" className="pg-action">
              All family devotions
            </Link>
          </div>
        </>
      )}
      {row && done && <DoneThisWeek id={row.id} title={row.title} passage={row.passage} done={done} today={today} index={data} />}
      {row && !done && (
        <>
          <h2 className="tb-tonight__title">
            {row.title}
          </h2>
          <p className="tb-tonight__meta">{[nightLabel(row, today), row.passage, row.kind === "weekly" ? "About ten minutes" : null].filter(Boolean).join(" · ")}</p>
          <p className="tb-line">
            {row.kind === "weekly" ? (
              <>Week {weekOfYear(today)} of the year</>
            ) : (
              place && <Position current={place.current} total={place.total} unit={place.unit} of={setLabel} />
            )}
            {lastRow && last && (
              <>
                <br />
                Last time: {lastRow.title}, {whenSaid(last.date, today)}
              </>
            )}
          </p>
          <div className="tb-tonight__actions">
            <Link href={tableHref(row.id)} className="pg-action">
              Start tonight's devotion
            </Link>
            <Link href={devotionHref(row.id)} className="pg-action pg-action--quiet">
              Read it first
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
