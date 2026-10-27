/**
 * One family devotion (/family/devotions/:id): its own page, title and share
 * link, for each of the 72 weekly devotions (their frozen ids) and each day of
 * the daily sets ("advent-6", "holy-week-1", "thanksgiving-7"). The parts in
 * order (Read, Talk, Ask, Do, Remember, Pray), "Start at the table" for table
 * mode (?mode=table, TableMode.tsx), Send, Save and Print, and a print
 * stylesheet so the page prints as one card (.tb- in index.css).
 *
 * Data: client/public/family/index.json (scripts/build-family-index.mjs) for
 * the row, then the one library file that holds the devotion. Position on
 * this device (lib/familyTable): where the devotion sits in its set, the week
 * of the year when it is tonight's, and the last one done; never a streak.
 */
import { useState, type ReactNode } from "react";
import { Link, useLocation, useParams, useSearch } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import ScriptureNote from "@/components/ScriptureNote";
import LoadFailed from "@/components/LoadFailed";
import { SAVE_FAILED, TakeItWithYou } from "@/components/TakeItWithYou";
import { Position } from "@/components/study/Position";
import { localISODate } from "@/lib/familyYear";
import {
  catechismThisWeek,
  devotionHref,
  lastDone,
  placeOf,
  readFamilyProgress,
  recordDevotionDone,
  tableHref,
  tonightOn,
  weekOfYear,
  whenSaid,
  type FamilyIndex,
  type FamilyIndexRow,
  type FamilyProgress,
} from "@/lib/familyTable";
import { trackFamilyDevotionComplete } from "@/lib/telemetry";
import TableMode, { TableFrame } from "./TableMode";
import { PartBody, partsOf } from "./DevotionParts";
import { useDevotion, type Devotion } from "./useFamilyData";

const SITE = "https://www.livewellbyjamesbell.co";

/** The devotion before and after this one in its own set. */
function neighbours(row: FamilyIndexRow, index: FamilyIndex): { prev?: FamilyIndexRow; next?: FamilyIndexRow } {
  const same = index.devotions.filter((r) => r.kind === row.kind && r.set === row.set);
  const at = same.findIndex((r) => r.id === row.id);
  return { prev: same[at - 1], next: same[at + 1] };
}

function Message({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", padding: "var(--s-6) 0" }}>
      <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 12px" }}>{title}</h1>
      <div className="tb-text">{children}</div>
    </div>
  );
}

export default function DevotionPage() {
  const { id = "" } = useParams<{ id: string }>();
  const query = new URLSearchParams(useSearch());
  const table = query.get("mode") === "table";
  const step = Math.max(1, Math.floor(Number(query.get("step")) || 1)) - 1;
  const [, navigate] = useLocation();
  const { state, retry } = useDevotion(id);

  // The reader's own calendar and what this device remembers. There is no
  // server render to agree with, so both are read as the page first renders.
  const [today] = useState(() => localISODate());
  const [progress, setProgress] = useState<FamilyProgress>(() => readFamilyProgress());
  const [finished, setFinished] = useState<{ key: string; ok: boolean } | null>(null);
  const finishKey = `${id}|${table ? "table" : "page"}`;
  const done = finished?.key === finishKey ? { ok: finished.ok } : null;

  const finish = () => {
    const result = recordDevotionDone(id, today);
    setProgress(result.progress);
    setFinished({ key: finishKey, ok: result.ok });
    trackFamilyDevotionComplete(id, table ? "table" : "page");
  };

  if (state.status !== "ready") {
    const body =
      state.status === "failed" ? (
        <LoadFailed what="This devotion" onRetry={retry} backHref="/family/devotions" backLabel="All family devotions" />
      ) : state.status === "missing" ? (
        <Message title="That devotion isn't here">
          <p>
            The address may be mistyped, or the devotion may have moved. <Link href="/family/devotions" className="tb-link">See all the family devotions</Link>.
          </p>
        </Message>
      ) : (
        <p role="status" style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>
          Loading…
        </p>
      );
    return table ? (
      <TableFrame title="Family devotion" leaveHref={devotionHref(id)}>
        {body}
      </TableFrame>
    ) : (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "0 16px var(--s-6)" }}>{body}</section>
      </Layout>
    );
  }

  const { index, devotion } = state;
  const { row } = devotion;
  const catechism = catechismThisWeek(index.catechism);
  const meta = (
    <SEOMeta title={`${row.title}: A Family Devotion`} description={row.description} url={`${SITE}/family/devotions/${row.id}`} type="article" />
  );

  if (table) {
    return (
      <>
        {meta}
        <TableMode
          devotion={devotion}
          catechism={catechism}
          step={step}
          onStepChange={(i) => navigate(`${devotionHref(row.id)}?mode=table&step=${i + 1}`, { replace: true })}
          onFinish={finish}
          finished={done}
        />
      </>
    );
  }

  return (
    <Layout>
      {meta}
      <DevotionView devotion={devotion} index={index} catechism={catechism} today={today} progress={progress} done={done} onFinish={finish} />
    </Layout>
  );
}

function DevotionView({
  devotion,
  index,
  catechism,
  today,
  progress,
  done,
  onFinish,
}: {
  devotion: Devotion;
  index: FamilyIndex;
  catechism: ReturnType<typeof catechismThisWeek>;
  today: string;
  progress: FamilyProgress;
  done: { ok: boolean } | null;
  onFinish: () => void;
}) {
  const { row } = devotion;
  const tonight = tonightOn(today)?.id === row.id;
  const setInfo = row.set ? index.sets[row.set] : undefined;
  const kicker = tonight ? "Tonight" : row.kind === "weekly" ? row.theme : setInfo?.label;
  const place = placeOf(row, index);
  const last = lastDone(progress);
  const lastRow = last ? index.devotions.find((r) => r.id === last.id) : undefined;
  const doneTonight = progress.done.some((d) => d.id === row.id && d.date === today);
  const { prev, next } = neighbours(row, index);
  const parts = partsOf(devotion, catechism);

  return (
    <div className="tb-page">
      <PageHead
        eyebrow={
          <>
            <Link href="/family" style={{ color: "inherit" }}>
              Family
            </Link>
            {kicker && <span>· {kicker}</span>}
          </>
        }
        title={row.title}
        lede={[row.label, row.passage, row.kind === "weekly" ? "About ten minutes" : null].filter(Boolean).join(" · ")}
        actions={
          <Link href={tableHref(row.id)} className="pg-action no-print">
            Start at the table
          </Link>
        }
        width="var(--w-prose)"
      />
      <section className="tb-page__body" style={{ background: "var(--bone)", padding: "var(--s-3) 16px var(--s-7)" }}>
        <article className="tb-devotion print-paper">
          <p className="tb-line" style={{ margin: "0 0 var(--s-3)" }}>
            {place && <Position current={place.current} total={place.total} unit={place.unit} of={row.kind === "weekly" ? "Weekly devotions" : setInfo?.label} />}
            {tonight && row.kind === "weekly" && <span> · Week {weekOfYear(today)} of the year</span>}
            {lastRow && last && (
              <>
                <br />
                Last time: {lastRow.title}, {whenSaid(last.date, today)}
              </>
            )}
          </p>
          <TakeItWithYou title={row.title} kind="Family devotion" href={devotionHref(row.id)} summary={row.description} print />
          {parts.map((part) => (
            <section key={part.id} className="tb-section" aria-labelledby={`tb-${part.id}`}>
              <h2 id={`tb-${part.id}`} className="tb-section__title">
                {part.title}
              </h2>
              <PartBody part={part} devotion={devotion} catechism={catechism} />
              {part.id === "read" && <ScriptureNote rendering={devotion.rendering === "bsb" ? "bsb" : "paraphrase"} />}
            </section>
          ))}
          <div className="tb-done no-print">
            <button type="button" className="pg-action" onClick={onFinish}>
              We did this tonight
            </button>
            <p className="tb-done__note" aria-live="polite">
              {done ? (done.ok ? "Done. This device will remember that you did this one tonight." : SAVE_FAILED) : doneTonight ? "Done tonight, on this device." : ""}
            </p>
          </div>
          <nav className="tb-more no-print" aria-label="More family devotions">
            {prev ? (
              <Link href={devotionHref(prev.id)} className="tb-link">
                Before this: {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={devotionHref(next.id)} className="tb-link">
                Next: {next.title}
              </Link>
            )}
            <Link href="/family/devotions" className="tb-link">
              All family devotions
            </Link>
          </nav>
        </article>
      </section>
    </div>
  );
}
