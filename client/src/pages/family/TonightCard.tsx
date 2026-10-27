/**
 * Tonight at the table, the first thing on /family: tonight's devotion (its
 * title, passage, and ten minutes), "Start" straight into table mode, and
 * where the family is on this device ("Week 48 of the year", "Day 6 of 25",
 * "Last time: Made On Purpose, Tuesday"). Tonight comes from the static year
 * map and the reader's own calendar; the title and passage from the family
 * index. Never a streak or a count of nights.
 */
import { useState } from "react";
import { Link } from "wouter";
import LoadFailed from "@/components/LoadFailed";
import { Position } from "@/components/study/Position";
import { localISODate } from "@/lib/familyYear";
import { devotionHref, lastDone, placeOf, readFamilyProgress, tableHref, tonightOn, weekOfYear, whenSaid, type FamilyIndex } from "@/lib/familyTable";
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

  return (
    <section className="tb-tonight" aria-labelledby="tb-tonight-title" aria-busy={!data}>
      <p className="eyebrow" style={{ margin: 0 }}>
        Tonight at the table
      </p>
      {data && !row && (
        <>
          <h2 id="tb-tonight-title" className="tb-tonight__title">
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
      {row && (
        <>
          <h2 id="tb-tonight-title" className="tb-tonight__title">
            {row.title}
          </h2>
          <p className="tb-tonight__meta">{[row.label, row.passage, row.kind === "weekly" ? "About ten minutes" : null].filter(Boolean).join(" · ")}</p>
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
              Start
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
