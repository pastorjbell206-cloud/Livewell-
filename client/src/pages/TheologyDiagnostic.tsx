/**
 * Which view am I? diagnostic (/theology/which-view). A reader picks a contested
 * doctrine, answers a handful of plain-language questions, and learns which
 * position they currently lean toward. It is a starting point for
 * self-understanding, never a verdict, and says so plainly. Data:
 * /theology/theology-diagnostics.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { RotateCcw } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { DOCTRINE_INDEX } from "@/lib/theology";

interface Option { label: string; view: string; }
interface Question { q: string; options: Option[]; }
interface Result { view: string; name: string; blurb: string; doctrine: string; }
interface Quiz { slug: string; title: string; intro: string; disclaimer: string; questions: Question[]; results: Result[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyDiagnostic() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    fetch("/theology/theology-diagnostics.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.quizzes && setQuizzes(d.quizzes))
      .catch(() => {});
  }, []);

  const quiz = quizzes.find((q) => q.slug === activeSlug) ?? null;
  const docReady = (slug: string) => DOCTRINE_INDEX.find((d) => d.slug === slug && d.ready);

  const answeredCount = Object.keys(answers).length;
  const complete = quiz ? answeredCount === quiz.questions.length : false;

  const result = useMemo(() => {
    if (!quiz || !complete) return null;
    const tally: Record<string, number> = {};
    for (const [qi, oi] of Object.entries(answers)) {
      const view = quiz.questions[Number(qi)]?.options[oi]?.view;
      if (view) tally[view] = (tally[view] ?? 0) + 1;
    }
    let best = "", bestN = -1;
    for (const [v, n] of Object.entries(tally)) if (n > bestN) { best = v; bestN = n; }
    const tied = Object.values(tally).filter((n) => n === bestN).length > 1;
    return { result: quiz.results.find((r) => r.view === best) ?? null, tied, tally };
  }, [quiz, complete, answers]);

  function start(slug: string) { setActiveSlug(slug); setAnswers({}); }
  function reset() { setAnswers({}); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <Layout>
      <SEOMeta
        title="Which View Am I? A Theology Diagnostic"
        description="Answer a few plain questions and see which position you lean toward on a contested doctrine. A starting point for understanding yourself, never a verdict."
        url="https://www.livewellbyjamesbell.co/theology/which-view"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Which view am I
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Where do you lean, and why?
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "60ch" }}>
            Answer a few honest questions and see which view you currently lean toward. This is a mirror, not a verdict. The point is not to box you in but to help you see where you stand, so you can read the full doctrine with open eyes.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {/* QUIZ PICKER */}
          {!quiz && (
            <>
              {quizzes.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                {quizzes.map((q) => (
                  <button key={q.slug} type="button" onClick={() => start(q.slug)}
                    style={{ textAlign: "left", cursor: "pointer", background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <div style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{q.title}</div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "12px" }}>{q.intro}</p>
                    <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>{q.questions.length} questions · Begin →</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ACTIVE QUIZ */}
          {quiz && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "var(--s-3)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, color: "var(--ink)" }}>{quiz.title}</h2>
                <button type="button" onClick={() => setActiveSlug(null)} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", background: "none", border: "none", cursor: "pointer" }}>Pick another →</button>
              </div>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", fontStyle: "italic", maxWidth: "66ch", marginBottom: "var(--s-4)", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px" }}>{quiz.disclaimer}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {quiz.questions.map((question, qi) => (
                  <div key={qi} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <p style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "14px" }}>{qi + 1}. {question.q}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {question.options.map((opt, oi) => {
                        const chosen = answers[qi] === oi;
                        return (
                          <button key={oi} type="button" onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                            style={{ textAlign: "left", cursor: "pointer", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, color: "var(--ink)", padding: "12px 14px", borderRadius: "var(--radius-sm)",
                              border: `1px solid ${chosen ? "var(--mustard)" : "var(--border)"}`, background: chosen ? "rgba(212,160,23,0.12)" : "var(--bone)" }}>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* RESULT */}
              {!complete && (
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", textAlign: "center", marginTop: "var(--s-4)" }}>
                  {answeredCount} of {quiz.questions.length} answered. Finish to see where you lean.
                </p>
              )}
              {complete && result && (
                <div style={{ marginTop: "var(--s-5)", background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>{result.tied ? "You are split between views" : "You lean toward"}</div>
                  {result.result && (
                    <>
                      <h3 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 500, color: "var(--ink)", marginBottom: "12px" }}>{result.result.name}</h3>
                      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "16px" }}>{result.result.blurb}</p>
                      {result.tied && <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", fontStyle: "italic", marginBottom: "16px" }}>Your answers landed evenly across more than one view. That is common and honest. Read the full doctrine and see which case rings truest.</p>}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                        {docReady(result.result.doctrine) && (
                          <Link href={`/theology/doctrine/${result.result.doctrine}`} style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--charcoal)", background: "var(--mustard)", padding: "12px 20px", borderRadius: "var(--radius-sm)" }}>
                            Read the full doctrine →
                          </Link>
                        )}
                        <button type="button" onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", background: "transparent", border: "1px solid var(--border)", padding: "12px 18px", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                          <RotateCcw size={15} aria-hidden /> Start over
                        </button>
                      </div>
                    </>
                  )}
                  <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", fontStyle: "italic", marginTop: "18px" }}>{quiz.disclaimer}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
