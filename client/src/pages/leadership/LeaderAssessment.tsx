/**
 * The assessment engine (/leadership/assessment/:slug). One component drives all
 * the leadership self-examinations from client/public/leadership/assessments/
 * <slug>.json. Each is a searching, prayerful read, never a scorecard. Answers
 * are scored on a scale and mapped to a band. Stateless, results stay in the
 * browser, nothing is sent anywhere.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

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

export default function LeaderAssessment() {
  const [, params] = useRoute("/leadership/assessment/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Data | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setData(null); setAnswers({}); setSubmitted(false);
    fetch(`/leadership/assessments/${slug}.json`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => d && setData(d)).catch(() => {});
  }, [slug]);

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

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Self-examination</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? "Loading…"}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={{ ...wrap, maxWidth: "740px" }}>
            {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>)}

            <div style={{ marginTop: "var(--s-4)" }}>
              {data.questions.map((q, n) => (
                <div key={q.id} style={{ marginBottom: "var(--s-4)", paddingBottom: "var(--s-3)", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)", marginBottom: "10px" }}><span style={{ color: "var(--mustard-text)", fontFamily: "var(--U)", fontWeight: 600 }}>{n + 1}. </span>{q.text}</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {data.scale.map((label, si) => {
                      const val = si + 1;
                      const on = answers[q.id] === val;
                      return (
                        <button key={val} onClick={() => setAnswers((a) => ({ ...a, [q.id]: val }))}
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

            {submitted && result && (
              <div style={{ marginTop: "var(--s-5)", background: "var(--charcoal)", color: "var(--bone)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: "3px solid var(--mustard)" }}>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "8px" }}>What this suggests</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--bone)", marginBottom: "12px" }}>{result.label}</h2>
                {result.body.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,230,0.9)", marginBottom: "12px" }}>{p}</p>)}
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", fontStyle: "italic", color: "rgba(245,240,230,0.6)", marginTop: "var(--s-3)", borderTop: "1px solid rgba(245,240,230,0.15)", paddingTop: "12px" }}>{data.closing}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}
