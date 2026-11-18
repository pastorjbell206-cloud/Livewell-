/**
 * Which view am I? diagnostic (/theology/which-view). A reader picks a contested
 * doctrine, answers a handful of plain-language questions, and learns which
 * position they currently lean toward. It is a starting point for
 * self-understanding, never a verdict, and says so plainly. Data:
 * /theology/theology-diagnostics.json.
 *
 * The quiz in hand and its answers are kept on this device as the reader goes
 * (key livewell-progress-which-view), so a reload lands where they were; the
 * result offers a non-destructive "Change my answers", and "Start over" clears.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { scrollBehavior } from "@/lib/motion";
import { Link } from "wouter";
import { RotateCcw } from "lucide-react";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { fetchJson } from "@/lib/fetch-json";
import { DOCTRINE_INDEX } from "@/lib/theology";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { toolName } from "@/lib/toolsList";

interface Option { label: string; view: string; }
interface Question { q: string; options: Option[]; }
interface Result { view: string; name: string; blurb: string; doctrine: string; }
interface Quiz { slug: string; title: string; intro: string; disclaimer: string; questions: Question[]; results: Result[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

const PROGRESS_KEY = "livewell-progress-which-view";
interface Saved { slug: string; answers: Record<number, number>; savedAt: string }
const isSaved = (x: unknown): x is Saved => {
  if (!x || typeof x !== "object") return false;
  const v = x as Record<string, unknown>;
  return (
    typeof v.slug === "string" && typeof v.savedAt === "string" &&
    !!v.answers && typeof v.answers === "object" && !Array.isArray(v.answers) &&
    Object.entries(v.answers as Record<string, unknown>).every(([k, n]) => /^\d+$/.test(k) && typeof n === "number" && Number.isInteger(n) && n >= 0)
  );
};

/** Where to open: a quiz named in the link wins; else the one the reader left part-way, with its answers. */
function initialPlace(): { slug: string | null; answers: Record<number, number> } {
  if (typeof window === "undefined") return { slug: null, answers: {} };
  const asked = new URLSearchParams(window.location.search).get("topic");
  const saved = readStoredJSON<Saved | null>(PROGRESS_KEY, isSaved, null);
  const slug = asked ?? saved?.slug ?? null;
  return { slug, answers: saved && saved.slug === slug ? saved.answers : {} };
}

// The render needs an array of quizzes; anything else is a failed load.
const isDiagnosticsFile = (x: unknown): x is { quizzes: Quiz[] } => {
  const d = x as { quizzes?: unknown };
  return !!d && typeof d === "object" && Array.isArray(d.quizzes);
};

export default function TheologyDiagnostic() {
  // null = not loaded yet; [] = loaded but empty (distinct from loading)
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  // A link can name the quiz to open on: /theology/which-view?topic=origins.
  const [start0] = useState(initialPlace);
  const [activeSlug, setActiveSlug] = useState<string | null>(start0.slug);
  const [answers, setAnswers] = useState<Record<number, number>>(start0.answers);
  const questionsRef = useRef<HTMLDivElement>(null);
  const [nonce, setNonce] = useState(0);
  // The attempt (retry nonce) that failed; deriving `loadError` from it means
  // Retry clears the panel without extra state writes inside the effect.
  const [failedNonce, setFailedNonce] = useState<number | null>(null);
  const loadError = failedNonce === nonce;

  useEffect(() => {
    let stale = false;
    fetchJson("/theology/theology-diagnostics.json", isDiagnosticsFile)
      .then((d) => { if (!stale) setQuizzes(d.quizzes); })
      .catch(() => { if (!stale) setFailedNonce(nonce); });
    return () => { stale = true; };
  }, [nonce]);

  const quiz = (quizzes ?? []).find((q) => q.slug === activeSlug) ?? null;
  const docReady = (slug: string) => DOCTRINE_INDEX.find((d) => d.slug === slug && d.ready);

  // Keep the place on this device as the reader goes.
  useEffect(() => {
    if (!activeSlug) return;
    writeStoredJSON(PROGRESS_KEY, { slug: activeSlug, answers, savedAt: new Date().toISOString() });
  }, [activeSlug, answers]);

  // Saved answers count only where they still fit the quiz as it loaded.
  const fitted = useMemo(
    () => (quiz ? Object.fromEntries(Object.entries(answers).filter(([qi, oi]) => quiz.questions[Number(qi)]?.options[oi])) : {}),
    [quiz, answers],
  );
  const answeredCount = Object.keys(fitted).length;
  const complete = quiz ? answeredCount === quiz.questions.length : false;

  const result = useMemo(() => {
    if (!quiz || !complete) return null;
    const tally: Record<string, number> = {};
    for (const [qi, oi] of Object.entries(fitted)) {
      const view = quiz.questions[Number(qi)]?.options[oi]?.view;
      if (view) tally[view] = (tally[view] ?? 0) + 1;
    }
    let best = "", bestN = -1;
    for (const [v, n] of Object.entries(tally)) if (n > bestN) { best = v; bestN = n; }
    const tied = Object.values(tally).filter((n) => n === bestN).length > 1;
    return { result: quiz.results.find((r) => r.view === best) ?? null, tied, tally };
  }, [quiz, complete, fitted]);

  function start(slug: string) { setActiveSlug(slug); setAnswers({}); }
  function reset() { removeStoredJSON(PROGRESS_KEY); setAnswers({}); window.scrollTo({ top: 0, behavior: scrollBehavior() }); }
  /** Back to the questions, every answer kept. */
  function changeAnswers() { questionsRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "start" }); }

  return (
    <Layout>
      <SEOMeta
        title="Which Christian View Do You Lean Toward?"
        description="Answer a few plain questions and see which position you lean toward on a contested doctrine. A starting point for understanding yourself, never a verdict."
        url="https://www.livewellbyjamesbell.co/theology/which-view"
      />

      <InnerHead path="/theology/which-view" title="Where do you lean, and why?" line="Answer a few honest questions and see which view you currently lean toward. This is a mirror, not a verdict. The point is not to box you in but to help you see where you stand, so you can read the full doctrine with open eyes." plate="lantern" />

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {/* QUIZ PICKER */}
          {!quiz && (
            <>
              {quizzes === null && !loadError && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading…</p>}
              {loadError && (
                <LoadFailed what="The diagnostic" onRetry={() => setNonce((n) => n + 1)} backHref="/tools" backLabel="Back to the tools" />
              )}
              {quizzes !== null && quizzes.length === 0 && (
                <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>No diagnostics are available yet.</p>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                {(quizzes ?? []).map((q) => (
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

              <div ref={questionsRef} style={{ display: "flex", flexDirection: "column", gap: "16px", scrollMarginTop: "90px" }}>
                {quiz.questions.map((question, qi) => (
                  <div key={qi} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <p style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "14px" }}>{qi + 1}. {question.q}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {question.options.map((opt, oi) => {
                        const chosen = answers[qi] === oi;
                        return (
                          <button key={oi} type="button" onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))} aria-pressed={chosen}
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
                <p role="status" style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", textAlign: "center", marginTop: "var(--s-4)" }}>
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
                        <button type="button" onClick={changeAnswers} style={{ display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", background: "transparent", border: "1px solid var(--border)", padding: "12px 18px", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                          Change my answers
                        </button>
                        <button type="button" onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", background: "transparent", border: "1px solid var(--border)", padding: "12px 18px", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                          <RotateCcw size={15} aria-hidden /> Start over
                        </button>
                      </div>
                      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", margin: "18px 0 0" }}>
                        Next, read each view in its own best words:{" "}
                        <Link href="/theology/compare" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", fontWeight: 600, color: "var(--ink)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>
                          {toolName("compare-views")}
                        </Link>
                        .
                      </p>
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
