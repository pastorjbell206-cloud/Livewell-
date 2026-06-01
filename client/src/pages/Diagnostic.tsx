/**
 * /diagnostic — "Where are you with God right now?"
 *
 * Modeled on Practicing the Way's Spiritual Health Reflection — the
 * highest-converting feature on Comer's site. Eight questions, four
 * dimensions (relational / intellectual / vocational / devotional), routes
 * the user to a specific essay, book, and email opt-in based on the answers.
 *
 * No new colors; uses the existing palette. Result cards use cream-warm +
 * mustard rule per CLAUDE.md.
 */
import { useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SegmentedSignup } from "@/components/SegmentedSignup";

type Dim = "relational" | "intellectual" | "vocational" | "devotional";

interface Question {
  id: string;
  dim: Dim;
  prompt: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    dim: "relational",
    prompt: "How often does the way I treat the people closest to me match what I say I believe?",
    options: [
      { label: "Almost never", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Most of the time", score: 3 },
      { label: "Almost always", score: 4 },
    ],
  },
  {
    id: "q2",
    dim: "relational",
    prompt: "When I disagree with someone politically, can I still see them as made in God's image?",
    options: [
      { label: "Honestly, no", score: 1 },
      { label: "I try and fail", score: 2 },
      { label: "Most of the time", score: 3 },
      { label: "Yes", score: 4 },
    ],
  },
  {
    id: "q3",
    dim: "intellectual",
    prompt: "Do my doubts have a place to land, or do I hide them?",
    options: [
      { label: "I hide them", score: 1 },
      { label: "I share with one person", score: 2 },
      { label: "I have a small group", score: 3 },
      { label: "They are out in the open", score: 4 },
    ],
  },
  {
    id: "q4",
    dim: "intellectual",
    prompt: "When was the last time I read a serious theological book — not a devotional?",
    options: [
      { label: "Years", score: 1 },
      { label: "This year", score: 2 },
      { label: "This quarter", score: 3 },
      { label: "I'm reading one now", score: 4 },
    ],
  },
  {
    id: "q5",
    dim: "vocational",
    prompt: "Is the work I do every day shaped by what I claim to believe?",
    options: [
      { label: "It's compartmentalized", score: 1 },
      { label: "Sometimes connected", score: 2 },
      { label: "Often connected", score: 3 },
      { label: "Inseparable", score: 4 },
    ],
  },
  {
    id: "q6",
    dim: "vocational",
    prompt: "How often do I rest in a way that actually restores me?",
    options: [
      { label: "I don't", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Weekly", score: 3 },
      { label: "Sabbath is a discipline I keep", score: 4 },
    ],
  },
  {
    id: "q7",
    dim: "devotional",
    prompt: "When I pray, am I actually talking to someone — or rehearsing thoughts?",
    options: [
      { label: "I rarely pray", score: 1 },
      { label: "Mostly rehearsal", score: 2 },
      { label: "Sometimes real", score: 3 },
      { label: "Most days, real", score: 4 },
    ],
  },
  {
    id: "q8",
    dim: "devotional",
    prompt: "When did Scripture last surprise me?",
    options: [
      { label: "I can't remember", score: 1 },
      { label: "Long time ago", score: 2 },
      { label: "Recently", score: 3 },
      { label: "This week", score: 4 },
    ],
  },
];

interface DimResult {
  dim: Dim;
  label: string;
  score: number;
  max: number;
  diagnosis: string;
  essaySlug: string;
  bookTitle: string;
}

const DIM_META: Record<Dim, { label: string; weak: string; strong: string; essay: string; book: string }> = {
  relational: {
    label: "Relational",
    weak: "The gap between your stated convictions and how you treat the people closest to you is wider than you want to admit.",
    strong: "You're letting people you love change how you actually live.",
    essay: "the-gap-between-belief-and-behavior",
    book: "The First Flock",
  },
  intellectual: {
    label: "Intellectual",
    weak: "Your doubts have nowhere to go. That is not safe; it is the long road to brittle faith.",
    strong: "You are letting your mind work on the questions instead of running from them.",
    essay: "the-questions-that-actually-matter",
    book: "Why Not What",
  },
  vocational: {
    label: "Vocational",
    weak: "You are running on fumes. Sabbath is not a luxury; it is a structural condition for faithfulness.",
    strong: "You have built rhythms that let the work be done without it eating you.",
    essay: "sabbath-is-not-a-luxury",
    book: "Dangerous Calling",
  },
  devotional: {
    label: "Devotional",
    weak: "Your daily practice of God has thinned. Without it, the rest of this falls apart at the seams.",
    strong: "You are practicing the presence in a sustained, costly way.",
    essay: "the-prayer-that-works-when-prayer-doesnt-work",
    book: "HealWell",
  },
};

function scoreByDim(answers: Record<string, number>): DimResult[] {
  const dims: Dim[] = ["relational", "intellectual", "vocational", "devotional"];
  return dims.map(dim => {
    const qs = QUESTIONS.filter(q => q.dim === dim);
    const score = qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const max = qs.length * 4;
    const meta = DIM_META[dim];
    return {
      dim,
      label: meta.label,
      score,
      max,
      diagnosis: score / max >= 0.625 ? meta.strong : meta.weak,
      essaySlug: meta.essay,
      bookTitle: meta.book,
    };
  });
}

export default function Diagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const isDone = Object.keys(answers).length === QUESTIONS.length;
  const results = isDone ? scoreByDim(answers) : null;

  // Weakest dimension is the lead recommendation.
  const lead = results
    ? [...results].sort((a, b) => a.score / a.max - b.score / b.max)[0]
    : null;

  const handleAnswer = (qid: string, score: number) => {
    const next = { ...answers, [qid]: score };
    setAnswers(next);
    if (Object.keys(next).length < QUESTIONS.length && step < QUESTIONS.length - 1) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <Layout>
      <SEOMeta
        title="Diagnostic — Where are you with God right now?"
        description="Eight questions across four dimensions. Honest answers. A specific essay, a book, and an email track for what to do next."
        url="https://www.livewellbyjamesbell.co/diagnostic"
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-5)",
          color: "var(--bone)",
        }}
      >
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            The Diagnostic
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              maxWidth: "22ch",
            }}
          >
            Where are you with God right now?
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.7)",
              maxWidth: "60ch",
            }}
          >
            Eight questions. Four dimensions. Answer honestly — no one sees
            this but you. At the end, one essay, one book, and one optional
            email track for what to do next.
          </p>
        </div>
      </section>

      {/* QUIZ OR RESULTS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          {!isDone ? (
            <div>
              <div
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  marginBottom: "12px",
                }}
              >
                Question {step + 1} of {QUESTIONS.length}
              </div>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  marginBottom: "var(--s-4)",
                }}
              >
                {QUESTIONS[step].prompt}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {QUESTIONS[step].options.map(opt => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleAnswer(QUESTIONS[step].id, opt.score)}
                    style={{
                      padding: "14px 18px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderLeft: "2px solid var(--mustard)",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "var(--F)",
                      fontSize: "17px",
                      color: "var(--ink)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "var(--bone-warm)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "var(--card)";
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  style={{
                    marginTop: "var(--s-3)",
                    background: "transparent",
                    border: "none",
                    color: "var(--ink-muted)",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
              )}
            </div>
          ) : (
            <div>
              <div className="eyebrow" style={{ marginBottom: "12px" }}>
                Results
              </div>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(28px, 4vw, 36px)",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  color: "var(--ink)",
                  marginBottom: "var(--s-4)",
                }}
              >
                Here's what stands out.
              </h2>
              {lead && (
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--mustard)",
                    padding: "var(--s-4)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "var(--s-4)",
                  }}
                >
                  <div className="eyebrow" style={{ marginBottom: "8px" }}>
                    Start here — {lead.label}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "20px",
                      lineHeight: 1.5,
                      color: "var(--ink)",
                      marginBottom: "16px",
                      maxWidth: "55ch",
                    }}
                  >
                    {lead.diagnosis}
                  </p>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <Link
                      href={`/writing/${lead.essaySlug}`}
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--ink)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--mustard)",
                        paddingBottom: "2px",
                      }}
                    >
                      Read the essay →
                    </Link>
                    <Link
                      href="/books"
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--ink-muted)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--border)",
                        paddingBottom: "2px",
                      }}
                    >
                      Read the book: {lead.bookTitle}
                    </Link>
                  </div>
                </div>
              )}

              {/* Per-dimension breakdown */}
              <div style={{ marginBottom: "var(--s-5)" }}>
                {results?.map(r => (
                  <div
                    key={r.dim}
                    style={{
                      padding: "var(--s-3) 0",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                        fontFamily: "var(--U)",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-muted)",
                      }}
                    >
                      <span>{r.label}</span>
                      <span>
                        {r.score} / {r.max}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "4px",
                        background: "var(--border)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: "var(--mustard)",
                          width: `${(r.score / r.max) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={reset}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  padding: "10px 18px",
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--ink-muted)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  marginBottom: "var(--s-5)",
                }}
              >
                Start over
              </button>

              {/* Segmented signup — wrap their result into a track */}
              <SegmentedSignup
                title="Want the eight-week guided check-in?"
                description="One email a week for two months — different prompts based on which audience you are. Free."
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
