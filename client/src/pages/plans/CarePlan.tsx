/**
 * A guided 8-week care plan (/plans/:slug), from
 * client/public/plans/<slug>.json. The interactive layer that turns an
 * assessment or a felt need into a walked path: a start date, the current
 * week surfaced, one practice + one read + one tool + one reflection per
 * week, checkable progress kept in localStorage, and grace built in - a
 * missed week is named as normal, never failure.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { CrisisHelp } from "@/components/CrisisHelp";
import { BookOpen, Wrench, PenLine, Check, RotateCcw } from "lucide-react";

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

function loadProgress(slug: string): Progress | null {
  try {
    const raw = localStorage.getItem(`lw-plan-${slug}`);
    return raw ? (JSON.parse(raw) as Progress) : null;
  } catch { return null; }
}
function saveProgress(slug: string, p: Progress) {
  try { localStorage.setItem(`lw-plan-${slug}`, JSON.stringify(p)); } catch { /* ignore */ }
}

const lbl = { fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--ink-muted)", marginBottom: "6px" };
const body = { fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.7, color: "var(--ink)" } as const;

export default function CarePlan() {
  const [, params] = useRoute("/plans/:slug");
  const slug = params?.slug;
  // Keyed by slug at the route, so this remounts per plan. Saved progress is
  // restored in a lazy initializer; the fetch result is tagged with the slug it
  // answered and data/missing derive per render — no synchronous reset effect.
  const [progress, setProgress] = useState<Progress | null>(() => (slug ? loadProgress(slug) : null));
  const [result, setResult] = useState<{ slug: string; data: Plan | null } | null>(null);

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
    saveProgress(slug, p);
    setProgress(p);
  };

  const toggleWeek = (n: number) => {
    if (!slug || !progress) return;
    const p: Progress = { ...progress, done: { ...progress.done, [n]: !progress.done[n] } };
    saveProgress(slug, p);
    setProgress(p);
  };

  const reset = () => {
    if (!slug) return;
    if (!window.confirm("Start this plan over? Your check marks will be cleared.")) return;
    try { localStorage.removeItem(`lw-plan-${slug}`); } catch { /* ignore */ }
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
            <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch", marginBottom: "12px" }}>{p}</p>
          ))}
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
                  ? "All eight weeks walked. Well done is an understatement."
                  : `${doneCount} of ${data.weeks.length} weeks walked${currentWeek ? ` · you are on week ${currentWeek}` : ""}`}
              </div>
              <div style={{ height: "3px", background: "rgba(245,240,230,0.15)", maxWidth: "360px" }}>
                <div style={{ height: "3px", background: "var(--mustard)", width: `${(doneCount / data.weeks.length) * 100}%`, transition: "width 0.3s" }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={wrap}>
            {data.weeks.map((w) => {
              const done = !!progress?.done[w.n];
              const isCurrent = progress && currentWeek === w.n;
              return (
                <div
                  key={w.n}
                  style={{
                    background: "var(--card)",
                    border: isCurrent ? "1px solid var(--mustard)" : "1px solid rgba(20,17,12,0.08)",
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
                  <p style={{ ...body, color: "var(--ink-muted)", marginBottom: "12px", maxWidth: "68ch" }}>{w.why}</p>
                  <div style={lbl}>This week's practice</div>
                  <p style={{ ...body, marginBottom: "14px", maxWidth: "68ch" }}>{w.practice}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "10px" }}>
                    <Link href={w.read.href} style={{ display: "flex", gap: "8px", alignItems: "center", textDecoration: "none", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>
                      <BookOpen size={15} /> {w.read.label}
                    </Link>
                    <Link href={w.tool.href} style={{ display: "flex", gap: "8px", alignItems: "center", textDecoration: "none", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>
                      <Wrench size={15} /> {w.tool.label}
                    </Link>
                  </div>
                  <div style={{ marginTop: "14px", borderLeft: "2px solid rgba(20,17,12,0.12)", paddingLeft: "12px" }}>
                    <div style={{ ...lbl, display: "flex", alignItems: "center", gap: "6px" }}><PenLine size={12} /> Reflect</div>
                    <p style={{ ...body, fontStyle: "italic", color: "var(--ink-muted)", margin: 0 }}>{w.reflection}</p>
                  </div>
                </div>
              );
            })}

            {data.careNote && (
              <p style={{ ...body, color: "var(--ink-muted)", maxWidth: "68ch", marginTop: "var(--s-3)" }}>{data.careNote}</p>
            )}

            <CrisisHelp />

            <div style={{ display: "flex", gap: "var(--s-4)", flexWrap: "wrap", marginTop: "var(--s-4)" }}>
              <Link href="/help" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← Find help for something else</Link>
              {progress && (
                <button onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink-muted)", padding: 0 }}>
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
