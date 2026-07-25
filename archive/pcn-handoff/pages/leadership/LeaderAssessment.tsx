/**
 * The assessment engine (/leadership/assessment/:slug). One component drives all
 * the leadership self-examinations from client/public/leadership/assessments/
 * <slug>.json. Each is a searching, prayerful read, never a scorecard. Answers
 * are scored on a scale and mapped to a band. Answers save to this browser per
 * assessment (roadmap HS-5), so a long instrument survives a reload; nothing is
 * sent anywhere.
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
interface Band { label: string; body: string; }
interface Data {
  slug: string; title: string; subtitle: string; intro: string;
  scale: string[]; // labels for 1..n, low to high
  questions: Question[];
  bands: Band[]; // ordered low to high; chosen by percentage thresholds
  closing: string;
}

// What the render actually needs. A response missing any of it — including an
// empty question set — is a failed load, not a blank assessment.
const isData = (x: unknown): x is Data => {
  const d = x as Data;
  return !!d && typeof d === "object" && typeof d.title === "string" && typeof d.intro === "string" &&
    Array.isArray(d.scale) && d.scale.length > 0 &&
    Array.isArray(d.questions) && d.questions.length > 0 &&
    Array.isArray(d.bands) && d.bands.length > 0;
};

// Saved progress (roadmap HS-5): sixty-plus answered questions should survive a
// reload. Per-slug key; the guard keeps corrupt storage away from the render.
interface Progress { answers: Record<string, number>; step?: number; savedAt: string; }
const progressKey = (slug: string) => `livewell-progress-leader-assessment-${slug}`;
const isProgress = (x: unknown): x is Progress => {
  const p = x as Progress;
  return !!p && typeof p === "object" && !!p.answers && typeof p.answers === "object" && !Array.isArray(p.answers) &&
    Object.values(p.answers).every((v) => typeof v === "number");
};

export default function LeaderAssessment() {
  const [, params] = useRoute("/leadership/assessment/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Data | null>(null);
  // This component is keyed by slug at the route, so it remounts per assessment.
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
    fetchJson<Data>(`/leadership/assessments/${slug}.json`, isData)
      .then((d) => { if (!stale) setData(d); })
      .catch(() => { if (!stale) setFailedAt(`${slug}|${nonce}`); });
    return () => { stale = true; };
  }, [slug, nonce]);

  // Save on every answer (the HS-4 cleaned-up 0ms timer idiom). Gated on data:
  // after a slug change nothing is written under the new key until the reset
  // above has landed, so one instrument's answers never overwrite another's.
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
  const answered = data ? Object.keys(answers).length : 0;
  const result = useMemo(() => {
    if (!data) return null;
    const n = data.questions.length;
    let score = 0;
    for (const q of data.questions) {
      const a = answers[q.id];
      if (!a) continue;
      score += q.reverse ? (max + 1 - a) : a;
    }
    const min = n, top = n * max;
    const pct = (score - min) / (top - min); // 0..1
    const idx = Math.min(data.bands.length - 1, Math.max(0, Math.floor(pct * data.bands.length - 1e-9)));
    return data.bands[idx];
  }, [data, answers, max]);

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — A Leadership Self-Examination`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/assessment/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Self-examination</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (error ? "The assessment" : "Loading…")}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {error && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <LoadFailed what="The assessment" onRetry={() => setNonce((n) => n + 1)} backHref="/leadership" backLabel="Back to Leadership" />
        </section>
      )}

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={{ ...wrap, maxWidth: "740px" }}>
            {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>)}

            {resumed && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Picked up where you left off.</span>
                <button onClick={startFresh} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "6px 12px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Start fresh</button>
              </div>
            )}

            <div style={{ marginTop: "var(--s-4)" }}>
              {data.questions.map((q, n) => (
                <div key={q.id} style={{ marginBottom: "var(--s-4)", paddingBottom: "var(--s-3)", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)", marginBottom: "10px" }}><span style={{ color: "var(--mustard-text)", fontFamily: "var(--U)", fontWeight: 600 }}>{n + 1}. </span>{q.text}</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {data.scale.map((label, si) => {
                      const val = si + 1;
                      const on = answers[q.id] === val;
                      return (
                        <button key={val} onClick={() => setAnswers((a) => ({ ...a, [q.id]: val }))} aria-pressed={on}
                          style={{ flex: "1 1 0", minWidth: "92px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", lineHeight: 1.3, padding: "8px 6px", borderRadius: "var(--radius-sm)", cursor: "pointer", border: "1px solid " + (on ? "var(--mustard)" : "var(--border)"), background: on ? "var(--mustard)" : "var(--card)", color: on ? "var(--charcoal)" : "var(--ink-muted)" }}>{label}</button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button disabled={answered < data.questions.length} onClick={() => setSubmitted(true)}
              style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", padding: "12px 22px", background: answered < data.questions.length ? "var(--border)" : "var(--mustard)", color: answered < data.questions.length ? "var(--ink-muted)" : "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: answered < data.questions.length ? "not-allowed" : "pointer" }}>
              {answered < data.questions.length ? `Answer all ${data.questions.length} (${answered} done)` : "See where this leaves you"}
            </button>
            {persistFailed && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "8px" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}

            {submitted && result && (
              <div role="status" style={{ marginTop: "var(--s-5)", background: "var(--charcoal)", color: "var(--charcoal-fg)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: "3px solid var(--mustard)" }}>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "8px" }}>What this suggests</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--charcoal-fg)", marginBottom: "12px" }}>{result.label}</h2>
                {result.body.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,230,0.9)", marginBottom: "12px" }}>{p}</p>)}
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", fontStyle: "italic", color: "rgba(245,240,230,0.6)", marginTop: "var(--s-3)", borderTop: "1px solid rgba(245,240,230,0.15)", paddingTop: "12px" }}>{data.closing}</p>
              </div>
            )}
            {submitted && (
              <button onClick={() => setSubmitted(false)} style={{ marginTop: "12px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Change my answers</button>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}
