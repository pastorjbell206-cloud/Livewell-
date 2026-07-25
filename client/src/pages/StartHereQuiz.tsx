import { Link } from "wouter";
import { useEffect, useState } from "react";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";

const QUESTIONS = [
  {
    id: "concern",
    title: "What's weighing heaviest right now?",
    options: [
      { label: "Marriage", value: "marriage", color: "var(--gold)" },
      { label: "Parenting", value: "parenting", color: "#9B8BA8" },
      { label: "Faith & Doubt", value: "doubt", color: "#8B6B7F" },
      { label: "Calling & Purpose", value: "calling", color: "#6B8E6F" },
      { label: "Justice & Culture", value: "justice", color: "#8B4545" },
      { label: "Pastoral Ministry", value: "pastoral", color: "#6B8E6F" }
    ]
  },
  {
    id: "situation",
    title: "How would you describe where you are?",
    options: [
      { label: "In Crisis", value: "crisis", color: "#8B4545" },
      { label: "Searching for Answers", value: "searching", color: "#6B8E6F" },
      { label: "Growing Deeper", value: "growing", color: "var(--ink)" },
      { label: "Leading Others", value: "leading", color: "#6B8E6F" }
    ]
  },
  {
    id: "format",
    title: "What kind of content helps you most?",
    options: [
      { label: "Deep Articles", value: "articles", color: "var(--gold)" },
      { label: "Practical Tools", value: "tools", color: "#6B8E6F" },
      { label: "Books", value: "books", color: "#8B6B7F" },
      { label: "Devotionals", value: "devotionals", color: "#6B9B8B" }
    ]
  }
];

/* Session mirror (roadmap HS-5). One-sitting entry flow: answers, step, and
 * the submitted flag survive an accidental refresh via sessionStorage, and
 * nothing outlives the tab. */

const SESSION_KEY = "livewell-session-start-here-quiz";

interface SavedSession {
  answers: { [key: string]: string };
  step: number;
  submitted: boolean;
  savedAt: number;
}

const QUESTION_IDS = new Set(QUESTIONS.map((q) => q.id));

function isSavedSession(x: unknown): x is SavedSession {
  if (typeof x !== "object" || x === null) return false;
  const s = x as Record<string, unknown>;
  if (typeof s.step !== "number" || !Number.isFinite(s.step)) return false;
  if (typeof s.submitted !== "boolean") return false;
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
    { answers: {}, step: 0, submitted: false, savedAt: 0 },
    window.sessionStorage
  );
}

export default function StartHereQuiz() {
  // Restore a same-sitting session silently; step is clamped to both the
  // question range and the number of answers actually given.
  const [restored] = useState(readSession);
  const [currentStep, setCurrentStep] = useState(() =>
    Math.min(
      Math.max(0, Math.trunc(restored.step)),
      Object.keys(restored.answers).length,
      QUESTIONS.length - 1
    )
  );
  const [submitted, setSubmitted] = useState(restored.submitted);
  const [answers, setAnswers] = useState<{ [key: string]: string }>(restored.answers);

  // Mirror the state on every change. A pristine state writes nothing, which
  // keeps "Start Over" genuinely clean; a failed write is fine — the quiz
  // simply proceeds unpersisted.
  useEffect(() => {
    if (currentStep === 0 && !submitted && Object.keys(answers).length === 0) return;
    writeStoredJSON(
      SESSION_KEY,
      { answers, step: currentStep, submitted, savedAt: Date.now() },
      window.sessionStorage
    );
  }, [answers, currentStep, submitted]);

  const READING_PATHS = {
    "marriage-crisis-articles": {
      title: "Marriage Under Strain",
      articles: [
        { title: "When Romance Left Covenant Remains", slug: "when-romance-left-covenant-remains" },
        { title: "The Monster in the Mirror", slug: "the-monster-in-the-mirror" },
        { title: "Rest, Ambition, and the Idol of Success", slug: "rest-ambition-and-the-idol-of-success" }
      ],
      book: "What If We're Wrong?"
    },
    "marriage-searching-articles": {
      title: "Building Covenant Strength",
      articles: [
        { title: "When Romance Left Covenant Remains", slug: "when-romance-left-covenant-remains" },
        { title: "The Monster in the Mirror", slug: "the-monster-in-the-mirror" },
        { title: "What We Owe Generations", slug: "what-we-owe-generations" }
      ],
      book: "The Monster in the Mirror"
    },
    "parenting-crisis-articles": {
      title: "Parenting Through Uncertainty",
      articles: [
        { title: "What We Owe Generations", slug: "what-we-owe-generations" },
        { title: "The Monster in the Mirror", slug: "the-monster-in-the-mirror" },
        { title: "Rest, Ambition, and the Idol of Success", slug: "rest-ambition-and-the-idol-of-success" }
      ],
      book: "When God Bless America Replaces Thy Kingdom Come"
    },
    "doubt-crisis-articles": {
      title: "Finding Faith in the Questions",
      articles: [
        { title: "The Monster in the Mirror", slug: "the-monster-in-the-mirror" },
        { title: "Constantine's Bargain", slug: "constantines-bargain" },
        { title: "Why a Frightened Church Wants a King", slug: "strongman-theology" }
      ],
      book: "What If We're Wrong?"
    },
    "pastoral-articles": {
      title: "Pastoral Leadership & Burnout",
      articles: [
        { title: "Can You Be a Christian on Your Own?", slug: "can-you-be-a-christian-alone" },
        { title: "Rest, Ambition, and the Idol of Success", slug: "rest-ambition-and-the-idol-of-success" },
        { title: "What We Owe Generations", slug: "what-we-owe-generations" }
      ],
      book: "The Monster in the Mirror"
    },
    "default": {
      title: "Essential LiveWell Collection",
      articles: [
        { title: "The Monster in the Mirror", slug: "the-monster-in-the-mirror" },
        { title: "When Romance Left Covenant Remains", slug: "when-romance-left-covenant-remains" },
        { title: "Why a Frightened Church Wants a King", slug: "strongman-theology" }
      ],
      book: "The Monster in the Mirror"
    }
  };

  const getReadingPath = () => {
    const concern = answers.concern || "default";
    const situation = answers.situation || "crisis";
    // Staged fallback: exact match, then the same concern+situation in the
    // articles format (the format most paths are written for), then the
    // concern alone, then default. The old single exact-key lookup sent
    // ~92 of ~96 answer combinations — including every pastor — to the
    // generic default no matter what they answered.
    const candidates = [
      `${concern}-${situation}-${answers.format}`,
      `${concern}-${situation}-articles`,
      `${concern}-articles`,
      concern,
    ];
    for (const key of candidates) {
      const hit = READING_PATHS[key as keyof typeof READING_PATHS];
      if (hit) return hit;
    }
    return READING_PATHS.default;
  };

  const handleSelect = (optionValue: string) => {
    const question = QUESTIONS[currentStep];
    setAnswers({ ...answers, [question.id]: optionValue });
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const readingPath = getReadingPath();
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const isComplete = allAnswered && submitted;

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SEOMeta
        title="Find Your Path | LiveWell by James Bell"
        description="Find where to start. Tell us what is weighing on you and we point you toward the writing that meets you there."
        keywords="where to start, Christian writing, marriage, parenting, doubt, pastoral burnout, LiveWell, James Bell"
        url="https://www.livewellbyjamesbell.co/start"
        type="webpage"
      />

      <MinimalNav />

      {/* This page renders the nav directly rather than through Layout, so it
          declares its own main landmark — the skip link in MinimalNav targets it. */}
      <main id="main">

      <section style={{ flex: 1, padding: "40px 20px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        {!isComplete ? (
          <>
            {/* QUICK PATHS — for the visitor who already knows what they need
                and does not want to take the quiz. Straight into the mission:
                learn, disciple, and live it. */}
            <div style={{ marginBottom: "40px" }}>
              <p style={{ fontSize: "13px", color: "var(--ink3)", marginBottom: "12px", fontFamily: "var(--U)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Already know what you need? Go straight there
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  { label: "Marriage", href: "/marriage" },
                  { label: "Parenting", href: "/parenting" },
                  { label: "Doubt", href: "/doubt" },
                  { label: "Disciple someone", href: "/table" },
                  { label: "Grief", href: "/plans/grief" },
                  { label: "The essays", href: "/writing" },
                ].map((c) => (
                  <Link key={c.href} href={c.href} style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink)", textDecoration: "none", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "999px", padding: "8px 16px" }}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "4px",
                      background: i <= currentStep ? "var(--gold)" : "var(--line)",
                      borderRadius: "2px"
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: "12px", color: "var(--ink3)", margin: 0 }}>
                Step {currentStep + 1} of {QUESTIONS.length}
              </p>
            </div>

            {/* QUESTION */}
            <div style={{ marginBottom: "48px" }}>
              <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "var(--ink)", marginBottom: currentStep === 0 ? "12px" : "32px", fontFamily: "var(--F)" }}>
                {QUESTIONS[currentStep].title}
              </h1>
              {currentStep === 0 && (
                <p style={{ fontSize: "14px", color: "var(--ink3)", margin: "0 0 32px" }}>
                  Three questions. About a minute. No grade.
                </p>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {QUESTIONS[currentStep].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(option.value)}
                    aria-pressed={answers[QUESTIONS[currentStep].id] === option.value}
                    style={{
                      background: answers[QUESTIONS[currentStep].id] === option.value ? option.color : "var(--card)",
                      color: answers[QUESTIONS[currentStep].id] === option.value ? "#FFF" : "var(--ink)",
                      border: answers[QUESTIONS[currentStep].id] === option.value ? "none" : "1px solid var(--border)",
                      borderLeft: answers[QUESTIONS[currentStep].id] === option.value ? "none" : `6px solid ${option.color}`,
                      padding: "24px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* NAV BUTTONS */}
            <div style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                style={{
                  background: currentStep === 0 ? "var(--line)" : "var(--ink)",
                  color: currentStep === 0 ? "var(--ink3)" : "var(--paper)",
                  border: "none",
                  padding: "14px 24px", minHeight: "44px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  cursor: currentStep === 0 ? "not-allowed" : "pointer"
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (currentStep < QUESTIONS.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else if (allAnswered) {
                    setSubmitted(true);
                  }
                }}
                disabled={!answers[QUESTIONS[currentStep].id]}
                style={{
                  background: !answers[QUESTIONS[currentStep].id] ? "var(--line)" : "var(--gold)",
                  color: "var(--ink)",
                  border: "none",
                  padding: "14px 24px", minHeight: "44px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  cursor: !answers[QUESTIONS[currentStep].id] ? "not-allowed" : "pointer"
                }}
              >
                {currentStep === QUESTIONS.length - 1 ? "See My Path" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* RESULTS PAGE */}
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "var(--ink)", marginBottom: "16px", fontFamily: "var(--F)" }}>
                Your Personalized Reading Path
              </h1>
              <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "24px" }}>
                Based on where you are, here's where to start:
              </p>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "var(--ink)", marginBottom: "32px", fontFamily: "var(--F)" }}>
                {readingPath.title}
              </h2>
            </div>

            {/* ARTICLES */}
            <div style={{ marginBottom: "48px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "var(--ink)", marginBottom: "24px" }}>
                Start with these articles:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {readingPath.articles.map((article, i) => (
                  <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                    <div style={{ background: "var(--card)", padding: "24px", borderRadius: "8px", border: "1px solid var(--border)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div style={{ textAlign: "left" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--ink)", margin: "0 0 8px 0" }}>
                          {article.title}
                        </h4>
                        <p style={{ fontSize: "13px", color: "var(--ink3)", margin: 0 }}>
                          7-12 min read
                        </p>
                      </div>
                      <span style={{ color: "var(--gold)", fontWeight: "bold", marginLeft: "16px", whiteSpace: "nowrap" }}>
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* BOOK RECOMMENDATION */}
            <div style={{ background: "var(--paper2)", padding: "32px", borderRadius: "8px", marginBottom: "48px", textAlign: "center" }}>
              <p style={{ fontSize: "12px", fontWeight: "bold", color: "var(--gold)", marginBottom: "8px", textTransform: "uppercase" }}>
                Then read this book
              </p>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--ink)", marginBottom: "12px" }}>
                {readingPath.book}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--ink3)", marginBottom: "16px" }}>
                Go deeper with James Bell's most comprehensive work on this topic.
              </p>
              <Link href="/books" style={{ display: "inline-block", background: "var(--ink)", color: "var(--paper)", padding: "14px 24px", minHeight: "44px", lineHeight: "16px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", textDecoration: "none", boxSizing: "border-box" }}>
                View Books
              </Link>
            </div>

            {/* EMAIL CAPTURE — real subscribe (was: setEmailSubmitted no-op) */}
            <div>
              <NewsletterSignup
                variant="inline"
                source="start-here-quiz"
                title="Want this path emailed to you?"
                description="Direct links to the essays on your path, plus the weekly letter when new pieces land."
              />
            </div>

            {/* CHANGE ANSWERS / RESTART BUTTONS */}
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginTop: "32px" }}>
              <button
                onClick={() => {
                  // Non-destructive: back to the questions with every answer intact.
                  setSubmitted(false);
                  setCurrentStep(0);
                }}
                style={{ background: "var(--card)", color: "var(--ink)", border: "1px solid var(--line)", padding: "14px 24px", minHeight: "44px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}
              >
                Change my answers
              </button>
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setSubmitted(false);
                  removeStoredJSON(SESSION_KEY, window.sessionStorage);
                }}
                style={{ background: "var(--card)", color: "var(--ink)", border: "1px solid var(--border)", padding: "14px 24px", minHeight: "44px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}
              >
                Start Over
              </button>
            </div>
          </>
        )}
      </section>

      </main>

      <Footer />
    </div>
  );
}
