/**
 * The Profile Survey engine (/leadership/survey/:slug). One component drives the
 * multi-dimension surveys from client/public/leadership/surveys/<slug>.json:
 * the Church Health Survey, the Spiritual Gifts Test, and the Church
 * Revitalization Survey. Each question belongs to a dimension; the engine scores
 * every dimension and renders either a per-dimension PROFILE (health bars with
 * feedback) or a RANKED list (top gifts). Answers save to this browser per
 * survey (roadmap HS-5), so a ninety-question instrument survives a reload;
 * nothing is sent anywhere.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Question { id: string; text: string; reverse?: boolean; }
interface Level { label: string; body: string; }
interface Dimension { id: string; name: string; blurb: string; questions: Question[]; levels?: Level[]; }
interface Data {
  slug: string; title: string; subtitle: string; intro: string;
  scale: string[];
  resultMode: "profile" | "ranked";
  rankedTopN?: number;
  dimensions: Dimension[];
  closing: string;
}

// What the render actually needs. A response missing any of it — including an
// empty dimension list — is a failed load, not a blank survey.
const isData = (x: unknown): x is Data => {
  const d = x as Data;
  return !!d && typeof d === "object" && typeof d.title === "string" && typeof d.intro === "string" &&
    Array.isArray(d.scale) && d.scale.length > 0 &&
    Array.isArray(d.dimensions) && d.dimensions.length > 0 &&
    d.dimensions.every((dim) => !!dim && Array.isArray(dim.questions));
};

// Saved progress (roadmap HS-5): the longest instruments on the site — up to
// ninety answers — should survive a reload. Per-slug key; the guard keeps
// corrupt storage away from the render.
interface Progress { answers: Record<string, number>; step?: number; savedAt: string; }
const progressKey = (slug: string) => `livewell-progress-profile-survey-${slug}`;
const isProgress = (x: unknown): x is Progress => {
  const p = x as Progress;
  return !!p && typeof p === "object" && !!p.answers && typeof p.answers === "object" && !Array.isArray(p.answers) &&
    Object.values(p.answers).every((v) => typeof v === "number");
};

export default function ProfileSurvey() {
  const [, params] = useRoute("/leadership/survey/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Data | null>(null);
  // This component is keyed by slug at the route, so it remounts per survey.
  // Saved progress is restored in lazy initializers (once, at mount), which
  // keeps one instrument's answers from ever leaking into another's and needs
  // no synchronous reset in an effect.
  const readProgress = () => (slug ? readStoredJSON<Progress | null>(progressKey(slug), (x): x is Progress | null => isProgress(x), null) : null);
  const [answers, setAnswers] = useState<Record<string, number>>(() => readProgress()?.answers ?? {});
  const [submitted, setSubmitted] = useState(() => {
    const p = readProgress();
    return p?.step === 1 && Object.keys(p?.answers ?? {}).length > 0;
  });
  const [resumed, setResumed] = useState(() => Object.keys(readProgress()?.answers ?? {}).length > 0);
  const [persistFailed, setPersistFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  // The attempt (slug + retry nonce) that failed. Deriving `error` from it means
  // a slug change or a retry clears the panel without extra state writes.
  const [failedAt, setFailedAt] = useState<string | null>(null);
  const error = failedAt === `${slug}|${nonce}`;

  useEffect(() => {
    if (!slug) return;
    let stale = false;
    fetchJson<Data>(`/leadership/surveys/${slug}.json`, isData)
      .then((d) => { if (!stale) setData(d); })
      .catch(() => { if (!stale) setFailedAt(`${slug}|${nonce}`); });
    return () => { stale = true; };
  }, [slug, nonce]);

  // Save on every answer (the HS-4 cleaned-up 0ms timer idiom). Gated on data:
  // after a slug change nothing is written under the new key until the reset
  // above has landed, so one survey's answers never overwrite another's.
  useEffect(() => {
    if (!slug || !data) return;
    const t = setTimeout(() => {
      const ok = writeStoredJSON(progressKey(slug), { answers, step: submitted ? 1 : 0, savedAt: new Date().toISOString() });
      setPersistFailed(!ok);
    }, 0);
    return () => clearTimeout(t);
  }, [answers, submitted, slug, data]);

  const startFresh = () => {
    if (slug) removeStoredJSON(progressKey(slug));
    setAnswers({}); setSubmitted(false); setResumed(false);
  };

  const max = data ? data.scale.length : 5;
  const allQuestions = useMemo(() => (data ? data.dimensions.flatMap((d) => d.questions.map((q) => ({ ...q, dim: d.id }))) : []), [data]);
  const answered = Object.keys(answers).length;
  const total = allQuestions.length;

  const scored = useMemo(() => {
    if (!data) return [];
    return data.dimensions.map((d) => {
      const n = d.questions.length;
      let sum = 0;
      for (const q of d.questions) {
        const a = answers[q.id];
        if (!a) continue;
        sum += q.reverse ? (max + 1 - a) : a;
      }
      const lo = n, hi = n * max;
      const pct = hi > lo ? (sum - lo) / (hi - lo) : 0;
      let level: Level | null = null;
      if (d.levels?.length) {
        const idx = Math.min(d.levels.length - 1, Math.max(0, Math.floor(pct * d.levels.length - 1e-9)));
        level = d.levels[idx];
      }
      return { dim: d, pct, avg: n ? sum / n : 0, level };
    });
  }, [data, answers, max]);

  const ranked = useMemo(() => [...scored].sort((a, b) => b.avg - a.avg), [scored]);
  const overallPct = scored.length ? scored.reduce((s, x) => s + x.pct, 0) / scored.length : 0;

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — A Survey for Leaders`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/survey/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Survey</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (error ? "The survey" : "Loading…")}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {error && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <LoadFailed what="The survey" onRetry={() => setNonce((n) => n + 1)} backHref="/leadership" backLabel="Back to Leadership" />
        </section>
      )}

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={{ ...wrap, maxWidth: "760px" }}>
            {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>)}

            {resumed && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Picked up where you left off.</span>
                <button onClick={startFresh} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "6px 12px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Start fresh</button>
              </div>
            )}

            {data.dimensions.map((d) => (
              <div key={d.id} style={{ marginTop: "var(--s-4)" }}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "4px" }}>{d.name}</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", marginBottom: "var(--s-3)", lineHeight: 1.5 }}>{d.blurb}</p>
                {d.questions.map((q) => (
                  <div key={q.id} style={{ marginBottom: "var(--s-3)", paddingBottom: "var(--s-3)", borderBottom: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", marginBottom: "8px" }}>{q.text}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {data.scale.map((label, si) => {
                        const val = si + 1; const on = answers[q.id] === val;
                        return <button key={val} onClick={() => setAnswers((a) => ({ ...a, [q.id]: val }))} aria-pressed={on} style={{ flex: "1 1 0", minWidth: "84px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", lineHeight: 1.3, padding: "7px 5px", borderRadius: "var(--radius-sm)", cursor: "pointer", border: "1px solid " + (on ? "var(--mustard)" : "var(--border)"), background: on ? "var(--mustard)" : "var(--card)", color: on ? "var(--charcoal)" : "var(--ink-muted)" }}>{label}</button>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <button disabled={answered < total} onClick={() => { setSubmitted(true); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }}
              style={{ marginTop: "var(--s-3)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", padding: "12px 22px", background: answered < total ? "var(--border)" : "var(--mustard)", color: answered < total ? "var(--ink-muted)" : "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: answered < total ? "not-allowed" : "pointer" }}>
              {answered < total ? `Answer all ${total} (${answered} done)` : "See the profile"}
            </button>
            {persistFailed && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "8px" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}

            {submitted && (
              <div role="status" style={{ marginTop: "var(--s-5)" }}>
                {data.resultMode === "ranked" ? (
                  <RankedResult ranked={ranked} topN={data.rankedTopN ?? 5} closing={data.closing} />
                ) : (
                  <ProfileResult scored={scored} overallPct={overallPct} closing={data.closing} />
                )}
                <button onClick={() => setSubmitted(false)} style={{ marginTop: "12px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Change my answers</button>
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}

function Bar({ pct }: { pct: number }) {
  return (
    <div style={{ height: "8px", background: "rgba(245,240,230,0.15)", borderRadius: "999px", overflow: "hidden", margin: "6px 0" }}>
      <div style={{ width: `${Math.round(pct * 100)}%`, height: "100%", background: "var(--mustard)" }} />
    </div>
  );
}

function ProfileResult({ scored, closing }: { scored: { dim: Dimension; pct: number; level: Level | null }[]; overallPct: number; closing: string }) {
  const sorted = [...scored].sort((a, b) => a.pct - b.pct);
  return (
    <div style={{ background: "var(--charcoal)", color: "var(--bone)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: "3px solid var(--mustard)" }}>
      <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "8px" }}>The profile</div>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "rgba(245,240,230,0.75)", marginBottom: "var(--s-4)" }}>Weakest areas first. The point is not a grade. It is to show you where the work is.</p>
      {sorted.map((s) => (
        <div key={s.dim.id} style={{ marginBottom: "var(--s-4)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <strong style={{ fontFamily: "var(--F)", fontSize: "20px", color: "var(--bone)" }}>{s.dim.name}</strong>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard)" }}>{Math.round(s.pct * 100)}</span>
          </div>
          <Bar pct={s.pct} />
          {s.level && <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,0.85)" }}><strong style={{ color: "var(--mustard)" }}>{s.level.label}. </strong>{s.level.body}</p>}
        </div>
      ))}
      <p style={{ fontFamily: "var(--B)", fontSize: "14px", fontStyle: "italic", color: "rgba(245,240,230,0.6)", marginTop: "var(--s-3)", borderTop: "1px solid rgba(245,240,230,0.15)", paddingTop: "12px" }}>{closing}</p>
    </div>
  );
}

function RankedResult({ ranked, topN, closing }: { ranked: { dim: Dimension; avg: number; pct: number }[]; topN: number; closing: string }) {
  const top = ranked.slice(0, topN);
  const rest = ranked.slice(topN);
  return (
    <div style={{ background: "var(--charcoal)", color: "var(--bone)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: "3px solid var(--mustard)" }}>
      <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "8px" }}>Your strongest areas</div>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "rgba(245,240,230,0.75)", marginBottom: "var(--s-4)" }}>A test like this points, it does not pronounce. The body confirms a gift over time, in the using of it.</p>
      {top.map((s, i) => (
        <div key={s.dim.id} style={{ marginBottom: "var(--s-4)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <strong style={{ fontFamily: "var(--F)", fontSize: "22px", color: "var(--mustard)" }}>{i + 1}. {s.dim.name}</strong>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,0.6)" }}>{Math.round(s.pct * 100)}</span>
          </div>
          <Bar pct={s.pct} />
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,0.85)" }}>{s.dim.blurb}</p>
        </div>
      ))}
      {rest.length > 0 && (
        <div style={{ marginTop: "var(--s-3)" }}>
          <div className="eyebrow" style={{ color: "rgba(245,240,230,0.5)", marginBottom: "8px" }}>The rest, in order</div>
          {rest.map((s) => (
            <div key={s.dim.id} style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--B)", fontSize: "14px", color: "rgba(245,240,230,0.7)", padding: "4px 0" }}>
              <span>{s.dim.name}</span><span style={{ fontFamily: "var(--U)", color: "rgba(245,240,230,0.5)" }}>{Math.round(s.pct * 100)}</span>
            </div>
          ))}
        </div>
      )}
      <p style={{ fontFamily: "var(--B)", fontSize: "14px", fontStyle: "italic", color: "rgba(245,240,230,0.6)", marginTop: "var(--s-3)", borderTop: "1px solid rgba(245,240,230,0.15)", paddingTop: "12px" }}>{closing}</p>
    </div>
  );
}
