/**
 * A guided 8-week care plan (/plans/:slug), from
 * client/public/plans/<slug>.json. The interactive layer that turns an
 * assessment or a felt need into a walked path: a start date, the current
 * week surfaced, one practice + one read + one tool + one reflection per
 * week, checkable progress kept in localStorage, and grace built in - a
 * missed week is named as normal, never failure.
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { CrisisHelp } from "@/components/CrisisHelp";
import { RemindMe } from "@/components/RemindMe";
import { SAVE_FAILED, TakeItWithYou } from "@/components/TakeItWithYou";
import { RefText } from "@/components/VerseRef";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { ArrowDown, BookOpen, Wrench, PenLine, Check, RotateCcw, Printer } from "lucide-react";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;

interface Week {
  n: number; focus: string; why: string; practice: string;
  read: { label: string; href: string };
  tool: { label: string; href: string };
  reflection: string;
}
interface Plan {
  slug: string; title: string; subtitle: string; intro: string;
  careNote: string; weeks: Week[];
}
interface Progress { startedAt: string; done: Record<number, boolean> }

// Saved in this browser through lib/storage: a shape guard on the way in, and
// a truthful result on the way out, so a refused write shows the save-failure
// line instead of check marks that vanish on reload.
const isProgressOrNull = (x: unknown): x is Progress | null =>
  x === null || (!!x && typeof x === "object" && typeof (x as Progress).startedAt === "string" && !!(x as Progress).done && typeof (x as Progress).done === "object");

function loadProgress(slug: string): Progress | null {
  return readStoredJSON<Progress | null>(`lw-plan-${slug}`, isProgressOrNull, null);
}
function saveProgress(slug: string, p: Progress): boolean {
  return writeStoredJSON(`lw-plan-${slug}`, p);
}

const lbl = { fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--ink-muted)", marginBottom: "6px" };
const body = { fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.7, color: "var(--ink)" } as const;

const weekLinkStyle = { display: "flex", gap: "8px", alignItems: "center", textDecoration: "none", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" } as const;

/** A week's read or tool: an app route, or a printable file (a plain link, so the browser opens it). */
function WeekLink({ href, children }: { href: string; children: ReactNode }) {
  return /\.(pdf|epub|docx?)($|[?#])/i.test(href)
    ? <a href={href} style={weekLinkStyle}>{children}</a>
    : <Link href={href} style={weekLinkStyle}>{children}</Link>;
}

export default function CarePlan() {
  const [, params] = useRoute("/plans/:slug");
  const slug = params?.slug;
  // Keyed by slug at the route, so this remounts per plan. Saved progress is
  // restored in a lazy initializer; the fetch result is tagged with the slug it
  // answered and data/missing derive per render — no synchronous reset effect.
  const [progress, setProgress] = useState<Progress | null>(() => (slug ? loadProgress(slug) : null));
  const [result, setResult] = useState<{ slug: string; data: Plan | null } | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/plans/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setResult({ slug, data: d || null }))
      .catch(() => setResult({ slug, data: null }));
  }, [slug]);

  const data = result && result.slug === slug ? result.data : null;
  const missing = !!result && result.slug === slug && result.data === null;

  const start = () => {
    if (!slug) return;
    const p: Progress = { startedAt: new Date().toISOString(), done: {} };
    setSaveFailed(!saveProgress(slug, p));
    setProgress(p);
  };

  const toggleWeek = (n: number) => {
    if (!slug || !progress) return;
    const p: Progress = { ...progress, done: { ...progress.done, [n]: !progress.done[n] } };
    setSaveFailed(!saveProgress(slug, p));
    setProgress(p);
  };

  const reset = () => {
    if (!slug) return;
    if (!window.confirm("Start this plan over? Your check marks will be cleared.")) return;
    removeStoredJSON(`lw-plan-${slug}`);
    setSaveFailed(false);
    setProgress(null);
  };

  const currentWeek = useMemo(() => {
    if (!progress || !data) return null;
    // The current week is the first unchecked one, capped by the calendar so
    // checking ahead is allowed but the calendar never rushes anyone.
    const firstUndone = data.weeks.find((w) => !progress.done[w.n]);
    return firstUndone ? firstUndone.n : null; // null = all done
  }, [progress, data]);

  const doneCount = useMemo(
    () => (progress && data ? data.weeks.filter((w) => progress.done[w.n]).length : 0),
    [progress, data]
  );

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — An Eight-Week Guided Plan`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/plans/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
            <Link href="/help" style={{ color: "inherit" }}>Find Help</Link> · An eight-week guided plan
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (missing ? "That plan is not here yet." : "Loading the plan…")}</h1>
          {missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
              It may have moved. Start from the{" "}
              <Link href="/help" style={{ color: "var(--mustard)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Find Help page</Link>.
            </p>
          )}
          {data && data.intro.split("\n\n").map((p, i) => (
            <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch", marginBottom: "12px" }}><RefText text={p} /></p>
          ))}
          {/* When to get more help: first, not after week eight. */}
          {data?.careNote && (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,230,0.82)", maxWidth: "62ch", margin: "4px 0 12px", paddingLeft: "12px", borderLeft: "2px solid var(--mustard)" }}><RefText text={data.careNote} /></p>
          )}
          {data && !progress && (
            <button
              onClick={start}
              style={{ marginTop: "10px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", padding: "13px 24px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 700, borderRadius: "2px", cursor: "pointer" }}
            >
              Begin week one
            </button>
          )}
          {data && progress && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,0.7)", marginBottom: "8px" }}>
                {doneCount === data.weeks.length
                  ? "All eight weeks walked."
                  : `${doneCount} of ${data.weeks.length} weeks walked${currentWeek ? ` · you are on week ${currentWeek}` : ""}`}
              </div>
              <div style={{ height: "3px", background: "rgba(245,240,230,0.15)", maxWidth: "360px" }}>
                <div style={{ height: "3px", background: "var(--mustard)", width: `${(doneCount / data.weeks.length) * 100}%`, transition: "width 0.3s" }} />
              </div>
              {/* A returning reader lands at the top of eight open weeks; this takes them to theirs. */}
              {currentWeek && (
                <a
                  href={`#week-${currentWeek}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", marginTop: "14px", padding: "10px 20px", background: "var(--mustard)", color: "var(--charcoal)", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 700, borderRadius: "2px", textDecoration: "none" }}
                >
                  Go to week {currentWeek} <ArrowDown size={16} aria-hidden />
                </a>
              )}
              {saveFailed && <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--charcoal-fg)", margin: "10px 0 0" }}>{SAVE_FAILED}</p>}
            </div>
          )}
          {data && doneCount < data.weeks.length && (
            <RemindMe
              title={data.title}
              details={`This week's step in your eight-week plan. Open the plan for the practice, the reading, and the question.`}
              href={`/plans/${data.slug}`}
              freq="WEEKLY"
              count={data.weeks.length - doneCount}
              schedule={
                data.weeks.length - doneCount === 1
                  ? "once, for the last week"
                  : doneCount
                    ? `once a week for the ${data.weeks.length - doneCount} weeks left`
                    : "once a week for eight weeks"
              }
              onDark
            />
          )}
        </div>
      </section>

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={wrap}>
            <TakeItWithYou title={data.title} kind="Eight-week plan" href={`/plans/${data.slug}`} summary={data.subtitle} />
            {data.weeks.map((w) => {
              const done = !!progress?.done[w.n];
              const isCurrent = progress && currentWeek === w.n;
              return (
                <div
                  key={w.n}
                  id={`week-${w.n}`}
                  style={{
                    scrollMarginTop: "88px",
                    background: "var(--card)",
                    border: isCurrent ? "1px solid var(--mustard)" : "1px solid var(--border)",
                    borderTop: "2px solid var(--mustard)",
                    padding: "var(--s-3)",
                    marginBottom: "var(--s-3)",
                    opacity: done ? 0.75 : 1,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                    <div>
                      <div style={lbl}>Week {w.n}{isCurrent ? " · you are here" : ""}</div>
                      <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 400, color: "var(--ink)", margin: "0 0 8px", textDecoration: done ? "line-through" : "none" }}>{w.focus}</h2>
                    </div>
                    {progress && (
                      <button
                        onClick={() => toggleWeek(w.n)}
                        aria-pressed={done}
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px", padding: "8px 14px", fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, border: `1px solid ${done ? "var(--mustard)" : "rgba(20,17,12,0.2)"}`, background: done ? "var(--bone-warm)" : "transparent", color: "var(--ink)", borderRadius: "2px", cursor: "pointer" }}
                      >
                        <Check size={14} style={{ color: done ? "var(--mustard-text)" : "var(--ink-muted)" }} />
                        {done ? "Walked" : "Mark walked"}
                      </button>
                    )}
                  </div>
                  {/* The plans quote the BSB, so a reference opens its verses in a sheet. */}
                  <p style={{ ...body, color: "var(--ink-muted)", marginBottom: "12px", maxWidth: "68ch" }}><RefText text={w.why} /></p>
                  <div style={lbl}>This week's practice</div>
                  <p style={{ ...body, marginBottom: "14px", maxWidth: "68ch" }}><RefText text={w.practice} /></p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "10px" }}>
                    <WeekLink href={w.read.href}><BookOpen size={15} /> {w.read.label}</WeekLink>
                    <WeekLink href={w.tool.href}><Wrench size={15} /> {w.tool.label}</WeekLink>
                  </div>
                  <div style={{ marginTop: "14px", borderLeft: "2px solid rgba(20,17,12,0.12)", paddingLeft: "12px" }}>
                    <div style={{ ...lbl, display: "flex", alignItems: "center", gap: "6px" }}><PenLine size={12} /> Reflect</div>
                    <p style={{ ...body, fontStyle: "italic", color: "var(--ink-muted)", margin: 0 }}><RefText text={w.reflection} /></p>
                  </div>
                </div>
              );
            })}

            {/* The booklet is built by scripts/lib/help-printables.mjs inside `pnpm pdfs`. */}
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "var(--s-3)" }}>
              <Printer size={14} style={{ verticalAlign: "-2px", marginRight: "6px" }} aria-hidden="true" />
              Print the whole plan as a booklet, one week to a page with room to write:{" "}
              <a href={`/downloads/plans/${data.slug}-booklet-letter.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>
              {" · "}
              <a href={`/downloads/plans/${data.slug}-booklet-a4.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
              {" "}(PDF)
            </p>

            <CrisisHelp />

            <div style={{ display: "flex", gap: "var(--s-4)", flexWrap: "wrap", marginTop: "var(--s-4)" }}>
              <Link href="/help" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← Find help for something else</Link>
              {progress && (
                <button type="button" onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink-muted)", padding: "0 4px" }}>
                  <RotateCcw size={14} /> Start over
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
