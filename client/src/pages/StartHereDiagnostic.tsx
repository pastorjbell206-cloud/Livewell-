import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";

/* ── Question & result types ─────────────────────────────────────── */

interface Option {
  label: string;
  value: string;
}

interface Question {
  id: string;
  title: string;
  options: Option[];
  /** Weight multiplier for scoring (default 1). */
  weight: number;
}

type ResultKey = "skeptic" | "healing" | "pastor" | "deep-study" | "full-story" | "rebuilding";

interface ResultProfile {
  key: ResultKey;
  title: string;
  tagline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondarySuggestions: { label: string; href: string; note: string }[];
}

/* ── Questions ───────────────────────────────────────────────────── */

const QUESTIONS: Question[] = [
  {
    id: "where",
    title: "Where are you right now?",
    weight: 3,
    options: [
      { label: "I'm questioning everything I was taught about faith", value: "questioning" },
      { label: "I was hurt by a church and I'm not sure I can go back", value: "church-hurt" },
      { label: "I'm a pastor and I'm running on empty", value: "pastor-empty" },
      { label: "I want to study the Bible with real depth", value: "deep-study" },
      { label: "I'm not sure what I believe anymore", value: "unsure" },
      { label: "I want to understand how Christianity got here", value: "history" },
    ],
  },
  {
    id: "need",
    title: "What do you need most right now?",
    weight: 3,
    options: [
      { label: "Honest answers to hard questions", value: "honest-answers" },
      { label: "Healing and safety", value: "healing" },
      { label: "Rest and renewal", value: "rest" },
      { label: "Intellectual depth", value: "depth" },
      { label: "Community and belonging", value: "community" },
      { label: "A path forward", value: "path" },
    ],
  },
  {
    id: "learn",
    title: "How do you learn best?",
    weight: 1,
    options: [
      { label: "Long-form reading (articles and essays)", value: "long-form" },
      { label: "Interactive tools and assessments", value: "interactive" },
      { label: "Guided study paths", value: "guided" },
      { label: "Quick, focused content", value: "quick" },
    ],
  },
  {
    id: "church",
    title: "What's your relationship with church right now?",
    weight: 1,
    options: [
      { label: "I'm actively involved", value: "active" },
      { label: "I attend but I'm restless", value: "restless" },
      { label: "I left and I'm not going back", value: "left-done" },
      { label: "I left but I miss it", value: "left-miss" },
      { label: "I've never really been", value: "never" },
    ],
  },
  {
    id: "values",
    title: "What matters most to you in a faith resource?",
    weight: 1,
    options: [
      { label: "Intellectual honesty — don't give me easy answers", value: "honesty" },
      { label: "Emotional safety — don't judge where I am", value: "safety" },
      { label: "Practical help — give me something I can use today", value: "practical" },
      { label: "Historical depth — show me where this all came from", value: "historical" },
    ],
  },
];

/* ── Scoring map: option-value -> result-key -> points ───────────── */

const SCORE_MAP: Record<string, Partial<Record<ResultKey, number>>> = {
  // Q1 — "Where are you right now?"
  questioning:    { skeptic: 5, rebuilding: 2, "full-story": 1 },
  "church-hurt":  { healing: 5, rebuilding: 2 },
  "pastor-empty": { pastor: 5 },
  "deep-study":   { "deep-study": 5, "full-story": 1 },
  unsure:         { rebuilding: 5, skeptic: 2, healing: 1 },
  history:        { "full-story": 5, "deep-study": 1, skeptic: 1 },

  // Q2 — "What do you need most?"
  "honest-answers": { skeptic: 4, "deep-study": 2, "full-story": 1 },
  healing:          { healing: 5, rebuilding: 2 },
  rest:             { pastor: 4, healing: 2 },
  depth:            { "deep-study": 4, "full-story": 2, skeptic: 1 },
  community:        { healing: 2, pastor: 2, rebuilding: 2 },
  path:             { rebuilding: 4, skeptic: 1, healing: 1 },

  // Q3 — "How do you learn best?"
  "long-form":   { skeptic: 1, "full-story": 1, "deep-study": 1 },
  interactive:   { "deep-study": 2, pastor: 1 },
  guided:        { rebuilding: 1, pastor: 1, healing: 1 },
  quick:         { pastor: 1, healing: 1 },

  // Q4 — "Relationship with church?"
  active:        { "deep-study": 1, pastor: 1 },
  restless:      { skeptic: 1, rebuilding: 1 },
  "left-done":   { healing: 2, skeptic: 1 },
  "left-miss":   { rebuilding: 2, healing: 1 },
  never:         { skeptic: 2, "full-story": 1 },

  // Q5 — "What matters most?"
  honesty:       { skeptic: 2, "deep-study": 1 },
  safety:        { healing: 2, rebuilding: 1 },
  practical:     { pastor: 2, "deep-study": 1 },
  historical:    { "full-story": 2, skeptic: 1 },
};

/* ── Result profiles ─────────────────────────────────────────────── */

const RESULTS: Record<ResultKey, ResultProfile> = {
  skeptic: {
    key: "skeptic",
    title: "The Skeptic's Path",
    tagline: "For the mind that refuses easy answers",
    description:
      "You came here with questions, not to have them silenced. The writing on this path treats doubt as a serious intellectual posture, not a spiritual failure. These are essays and resources built for people who left certainty behind and need to know whether anything sturdy remains.",
    primaryCta: { label: "Begin the Skeptic's Path", href: "/honest-questions" },
    secondarySuggestions: [
      { label: "Theology Diagnostic", href: "/theology/which-view", note: "Map where you actually land on the big questions" },
      { label: "The Full Story of Christianity", href: "/church-history", note: "Understand how the tradition arrived at this moment" },
      { label: "Deep Bible Companion", href: "/tools/deep-bible", note: "Study Scripture with tools that respect your intelligence" },
    ],
  },
  healing: {
    key: "healing",
    title: "Healing First",
    tagline: "Before theology, safety",
    description:
      "What happened to you in the church was real. Before you can think clearly about God, you need to know that this space will not replicate the harm. The resources on this path are written by a pastor who has sat across from people the church broke and chose their side.",
    primaryCta: { label: "Start with Healing", href: "/church-hurt" },
    secondarySuggestions: [
      { label: "When Faith Falls Apart", href: "/deconstruction", note: "A reading path for rebuilding on your own terms" },
      { label: "Care Plans", href: "/help", note: "Pastoral resources for specific seasons of crisis" },
      { label: "The Skeptic's Path", href: "/honest-questions", note: "When you are ready to ask the harder questions" },
    ],
  },
  pastor: {
    key: "pastor",
    title: "Pastor's Lifeline",
    tagline: "You cannot pour from a dry well",
    description:
      "You preach rest and practice exhaustion. You carry confessions you cannot repeat and doubts you cannot voice. This path is built for pastors who need someone to minister to them for once — not with platitudes, but with the honesty you give everyone else and rarely receive.",
    primaryCta: { label: "Access Pastor Resources", href: "/pastoral-burnout" },
    secondarySuggestions: [
      { label: "Sermon Preparation Workbench", href: "/leadership/sermon-prep", note: "Tools to lighten the weekly load" },
      { label: "Leadership Formation", href: "/leadership/formation", note: "Character before competence, depth before strategy" },
      { label: "Pastors Connection Network", href: "/pastors", note: "You were not meant to carry this alone" },
    ],
  },
  "deep-study": {
    key: "deep-study",
    title: "Deep Study",
    tagline: "The Bible is not a greeting card",
    description:
      "You are past surface-level devotionals. You want to know what the text actually says in its context, what the original audience heard, and why two thousand years of readers have argued about it. These tools and study paths treat the Bible as a serious ancient library, not a self-help manual.",
    primaryCta: { label: "Open the Deep Bible Companion", href: "/tools/deep-bible" },
    secondarySuggestions: [
      { label: "Theology Hub", href: "/theology", note: "Doctrine, creeds, hermeneutics, and the contested questions" },
      { label: "Study Guides", href: "/studyguides", note: "Structured walks through specific books and themes" },
      { label: "The Full Story", href: "/church-history", note: "The history that shaped how we read the text today" },
    ],
  },
  "full-story": {
    key: "full-story",
    title: "The Full Story",
    tagline: "Two thousand years did not happen by accident",
    description:
      "Christianity did not drop from the sky. It was forged in Roman courts and desert monasteries, split by emperors and reformers, carried across oceans by missionaries and colonizers. If you want to understand the faith, you need the full story — the parts the Sunday sermon skips.",
    primaryCta: { label: "Read the Story of Christianity", href: "/church-history" },
    secondarySuggestions: [
      { label: "Theology History Essays", href: "/theology/history", note: "Deep dives into the turning points" },
      { label: "Creeds and Confessions", href: "/resources/creeds", note: "The words the church fought over and died for" },
      { label: "Deep Bible Companion", href: "/tools/deep-bible", note: "Study the text the whole tradition argues about" },
    ],
  },
  rebuilding: {
    key: "rebuilding",
    title: "Rebuilding",
    tagline: "What you lost was real. What comes next might be too.",
    description:
      "Deconstruction is not a destination. You took apart what you were given because it stopped holding weight. The question now is whether anything can be rebuilt that is honest enough to stand on. This path does not rush you back to certainty. It walks with you through the rubble.",
    primaryCta: { label: "Begin Rebuilding", href: "/deconstruction" },
    secondarySuggestions: [
      { label: "Healing First", href: "/church-hurt", note: "If the wound is still open, start here instead" },
      { label: "The Skeptic's Path", href: "/honest-questions", note: "Wrestle with the hardest questions head on" },
      { label: "Reading Paths", href: "/reading-paths", note: "Curated sequences that meet you where you are" },
    ],
  },
};

const ALL_RESULT_KEYS: ResultKey[] = ["skeptic", "healing", "pastor", "deep-study", "full-story", "rebuilding"];

/* ── Scoring engine ──────────────────────────────────────────────── */

function computeResult(answers: Record<string, string>): ResultKey {
  const scores: Record<ResultKey, number> = {
    skeptic: 0, healing: 0, pastor: 0, "deep-study": 0, "full-story": 0, rebuilding: 0,
  };

  for (const q of QUESTIONS) {
    const chosen = answers[q.id];
    if (!chosen) continue;
    const map = SCORE_MAP[chosen];
    if (!map) continue;
    for (const [key, pts] of Object.entries(map)) {
      scores[key as ResultKey] += (pts ?? 0) * q.weight;
    }
  }

  let best: ResultKey = "skeptic";
  let bestScore = -1;
  for (const k of ALL_RESULT_KEYS) {
    if (scores[k] > bestScore) {
      bestScore = scores[k];
      best = k;
    }
  }
  return best;
}

/* ── Session mirror (roadmap HS-5) ───────────────────────────────── */
/* One-sitting entry flow: answers and step survive an accidental refresh
 * via sessionStorage, and nothing outlives the tab. */

const SESSION_KEY = "livewell-session-start-here-diagnostic";

interface SavedSession {
  answers: Record<string, string>;
  step: number;
  savedAt: number;
}

const QUESTION_IDS = new Set(QUESTIONS.map((q) => q.id));

function isSavedSession(x: unknown): x is SavedSession {
  if (typeof x !== "object" || x === null) return false;
  const s = x as Record<string, unknown>;
  if (typeof s.step !== "number" || !Number.isFinite(s.step)) return false;
  if (typeof s.savedAt !== "number") return false;
  if (typeof s.answers !== "object" || s.answers === null || Array.isArray(s.answers)) return false;
  return Object.entries(s.answers as Record<string, unknown>).every(
    ([id, value]) => QUESTION_IDS.has(id) && typeof value === "string"
  );
}

function readSession(): SavedSession {
  return readStoredJSON(
    SESSION_KEY,
    isSavedSession,
    { answers: {}, step: 0, savedAt: 0 },
    window.sessionStorage
  );
}

/* ── Animation keyframes (injected once) ─────────────────────────── */

const KEYFRAMES_ID = "start-here-diagnostic-keyframes";
function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes shd-fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shd-fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

/* ── Component ───────────────────────────────────────────────────── */

export default function StartHereDiagnostic() {
  // Restore a same-sitting session silently; step is clamped to both the
  // question range and the number of answers actually given.
  const [restored] = useState(readSession);
  const [step, setStep] = useState(() =>
    Math.min(
      Math.max(0, Math.trunc(restored.step)),
      Object.keys(restored.answers).length,
      QUESTIONS.length - 1
    )
  );
  const [answers, setAnswers] = useState<Record<string, string>>(restored.answers);
  const [transitioning, setTransitioning] = useState(false);
  // True while a finished reader walks back through the questions from results.
  const [reviewing, setReviewing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureKeyframes();
  }, []);

  const totalSteps = QUESTIONS.length;
  const isComplete = Object.keys(answers).length === totalSteps;
  const showingResults = isComplete && !reviewing;
  const currentQuestion = QUESTIONS[step];

  // Mirror answers/step on every change. A pristine state writes nothing,
  // which keeps a restart genuinely clean; a failed write is fine — the
  // diagnostic simply proceeds unpersisted.
  useEffect(() => {
    if (step === 0 && Object.keys(answers).length === 0) return;
    writeStoredJSON(SESSION_KEY, { answers, step, savedAt: Date.now() }, window.sessionStorage);
  }, [answers, step]);

  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      // A second tap during the 300ms transition used to queue a second
      // increment: from the last question that indexed past QUESTIONS and
      // white-screened; earlier it silently skipped a question and
      // soft-locked the finish. Ignore clicks while transitioning and
      // clamp the step as a second guard.
      if (transitioning) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

      if (step < totalSteps - 1) {
        setTransitioning(true);
        setTimeout(() => {
          setStep((s) => Math.min(s + 1, totalSteps - 1));
          setTransitioning(false);
          scrollToTop();
        }, 300);
      } else {
        // Final question answered — show results (and end a review pass)
        setTransitioning(true);
        setTimeout(() => {
          setTransitioning(false);
          setReviewing(false);
          scrollToTop();
        }, 300);
      }
    },
    [currentQuestion, step, totalSteps, scrollToTop, transitioning],
  );

  const handleBack = useCallback(() => {
    if (step > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setStep((s) => s - 1);
        setTransitioning(false);
        scrollToTop();
      }, 250);
    }
  }, [step, scrollToTop]);

  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers({});
    setReviewing(false);
    removeStoredJSON(SESSION_KEY, window.sessionStorage);
    scrollToTop();
  }, [scrollToTop]);

  // Non-destructive: back to the questions with every answer intact.
  const handleChangeAnswers = useCallback(() => {
    setReviewing(true);
    setStep(0);
    scrollToTop();
  }, [scrollToTop]);

  const resultKey = isComplete ? computeResult(answers) : null;
  const result = resultKey ? RESULTS[resultKey] : null;

  return (
    <div style={{ background: "var(--bone)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SEOMeta
        title="Start Here — Find Your Path | LiveWell by James Bell"
        description="Five questions. One honest recommendation. Take the Start Here diagnostic to find the LiveWell content that meets you where you actually are — skeptic, wounded, exhausted, curious, or rebuilding."
        keywords="start here, faith diagnostic, where to start, skeptic, church hurt, pastoral burnout, Bible study, deconstruction, LiveWell, James Bell"
        url="https://www.livewellbyjamesbell.co/start-here"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Start Here Diagnostic",
          description: "A five-question diagnostic that routes visitors to the right LiveWell content based on where they are spiritually.",
          url: "https://www.livewellbyjamesbell.co/start-here",
          applicationCategory: "ReligiousApp",
          author: { "@type": "Person", name: "James Bell" },
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      <MinimalNav />
      <main id="main">

      {/* ── Progress bar ─────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--charcoal)",
          padding: "0",
        }}
      >
        <div
          style={{
            height: "3px",
            background: "var(--mustard)",
            width: showingResults ? "100%" : `${((step + (answers[currentQuestion?.id] ? 1 : 0)) / totalSteps) * 100}%`,
            transition: "width 400ms var(--ease)",
          }}
        />
      </div>

      <div ref={containerRef} style={{ flex: 1 }}>
        {!showingResults ? (
          /* ── Question screen ──────────────────────────────────── */
          <section
            style={{
              background: "var(--charcoal)",
              minHeight: "calc(100vh - 73px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 24px 80px",
            }}
          >
            <div
              style={{
                maxWidth: "640px",
                width: "100%",
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? "translateY(16px)" : "translateY(0)",
                transition: "opacity 250ms var(--ease), transform 250ms var(--ease)",
              }}
            >
              {/* Step indicator */}
              <div
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mustard)",
                  marginBottom: "32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ width: "32px", height: "1px", background: "var(--mustard)", display: "inline-block" }} />
                Question {step + 1} of {totalSteps}
              </div>

              {/* Question title */}
              <h1
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--charcoal-fg)",
                  marginBottom: step === 0 ? "14px" : "48px",
                }}
              >
                {currentQuestion.title}
              </h1>

              {/* Quiet scope line, arrival only */}
              {step === 0 && (
                <p
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.45)",
                    margin: "0 0 44px",
                  }}
                >
                  Five questions. About two minutes. No grade.
                </p>
              )}

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      aria-pressed={isSelected}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "20px 24px",
                        background: isSelected ? "rgba(212, 160, 23, 0.12)" : "rgba(255, 255, 255, 0.04)",
                        border: isSelected ? "1px solid var(--mustard)" : "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "2px",
                        color: isSelected ? "var(--mustard)" : "rgba(255, 255, 255, 0.85)",
                        fontFamily: "var(--B)",
                        fontSize: "16px",
                        lineHeight: 1.5,
                        cursor: "pointer",
                        transition: "all 200ms var(--ease)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.08)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.25)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.04)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
                        }
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    marginTop: "32px",
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.4)",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    padding: "8px 0",
                    transition: "color 200ms",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255, 255, 255, 0.7)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255, 255, 255, 0.4)"; }}
                >
                  Back
                </button>
              )}
            </div>
          </section>
        ) : result ? (
          /* ── Results screen ──────────────────────────────────── */
          <>
            {/* Hero band */}
            <section
              style={{
                background: "var(--charcoal)",
                padding: "80px 24px 72px",
                textAlign: "center",
                animation: "shd-fadeIn 500ms var(--ease) both",
              }}
            >
              <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                <div
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--mustard)",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ width: "32px", height: "1px", background: "var(--mustard)" }} />
                  YOUR PATH
                  <span style={{ width: "32px", height: "1px", background: "var(--mustard)" }} />
                </div>

                <h1
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "clamp(32px, 6vw, 56px)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--charcoal-fg)",
                    marginBottom: "16px",
                  }}
                >
                  {result.title}
                </h1>

                <p
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "20px",
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "0",
                  }}
                >
                  {result.tagline}
                </p>
              </div>
            </section>

            {/* Description + CTA */}
            <section
              style={{
                background: "var(--bone)",
                padding: "64px 24px",
                animation: "shd-fadeUp 500ms var(--ease) 100ms both",
              }}
            >
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "17px",
                    lineHeight: 1.75,
                    color: "var(--ink)",
                    marginBottom: "40px",
                    maxWidth: "62ch",
                  }}
                >
                  {result.description}
                </p>

                <Link href={result.primaryCta.href}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "var(--ink)",
                      color: "var(--bone)",
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      padding: "16px 32px",
                      borderRadius: "2px",
                      borderBottom: "2px solid var(--mustard)",
                      cursor: "pointer",
                      transition: "background 250ms var(--ease), transform 250ms var(--ease)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.background = "var(--charcoal-deep)";
                      (e.currentTarget as HTMLSpanElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.background = "var(--ink)";
                      (e.currentTarget as HTMLSpanElement).style.transform = "translateY(0)";
                    }}
                  >
                    {result.primaryCta.label}
                    <span aria-hidden="true" style={{ fontSize: "16px" }}>&rarr;</span>
                  </span>
                </Link>
              </div>
            </section>

            {/* Secondary suggestions */}
            <section
              style={{
                background: "var(--bone-warm)",
                padding: "64px 24px",
                animation: "shd-fadeUp 500ms var(--ease) 200ms both",
              }}
            >
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h2
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "28px",
                    fontWeight: 400,
                    color: "var(--ink)",
                    marginBottom: "32px",
                  }}
                >
                  Also worth your time
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {result.secondarySuggestions.map((s) => (
                    <Link key={s.href} href={s.href}>
                      <div
                        style={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "2px",
                          padding: "24px",
                          cursor: "pointer",
                          transition: "box-shadow 240ms var(--ease), transform 240ms var(--ease)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "var(--ink)",
                            marginBottom: "6px",
                            lineHeight: 1.3,
                          }}
                        >
                          {s.label}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--U)",
                            fontSize: "14px",
                            color: "var(--ink-muted)",
                            margin: 0,
                            lineHeight: 1.6,
                          }}
                        >
                          {s.note}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* "Not quite right?" — all paths */}
            <section
              style={{
                background: "var(--bone)",
                padding: "64px 24px 80px",
                animation: "shd-fadeUp 500ms var(--ease) 300ms both",
              }}
            >
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h2
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "var(--ink)",
                    marginBottom: "8px",
                  }}
                >
                  Not quite right?
                </h2>
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "15px",
                    color: "var(--ink-muted)",
                    marginBottom: "28px",
                    lineHeight: 1.7,
                  }}
                >
                  No diagnostic is perfect. Browse every path and choose the one that fits.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {ALL_RESULT_KEYS.filter((k) => k !== resultKey).map((k) => {
                    const r = RESULTS[k];
                    return (
                      <Link key={k} href={r.primaryCta.href}>
                        <div
                          style={{
                            padding: "20px",
                            border: "1px solid var(--border)",
                            borderRadius: "2px",
                            cursor: "pointer",
                            background: "var(--card)",
                            transition: "border-color 200ms",
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--mustard)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; }}
                        >
                          <h3
                            style={{
                              fontFamily: "var(--F)",
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "var(--ink)",
                              marginBottom: "4px",
                            }}
                          >
                            {r.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "var(--U)",
                              fontSize: "13px",
                              color: "var(--ink-muted)",
                              margin: 0,
                              lineHeight: 1.5,
                            }}
                          >
                            {r.tagline}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Change answers / restart */}
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginTop: "40px" }}>
                  <button
                    onClick={handleChangeAnswers}
                    style={{
                      background: "none",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      padding: "12px 28px",
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      cursor: "pointer",
                      transition: "all 200ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--mustard)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                    }}
                  >
                    Change my answers
                  </button>
                  <button
                    onClick={handleRestart}
                    style={{
                      background: "none",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      padding: "12px 28px",
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--ink-muted)",
                      cursor: "pointer",
                      transition: "all 200ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ink)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-muted)";
                    }}
                  >
                    Take the diagnostic again
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>

      </main>
      <Footer />
    </div>
  );
}
