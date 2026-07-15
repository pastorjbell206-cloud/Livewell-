import { useState, useMemo, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";

/* Session mirror (roadmap HS-5). One-sitting entry flow: answers, step, and
 * the results flag survive an accidental refresh via sessionStorage, and
 * nothing outlives the tab. The questions arrive from a query, so the saved
 * ids travel with the answers and a restore only applies when they still
 * match the loaded bank. */

const SESSION_KEY = "livewell-session-theology-quiz";

interface SavedSession {
  answers: number[];
  step: number;
  showResults: boolean;
  questionIds: number[];
  savedAt: number;
}

const EMPTY_SESSION: SavedSession = {
  answers: [],
  step: 0,
  showResults: false,
  questionIds: [],
  savedAt: 0,
};

function isSavedSession(x: unknown): x is SavedSession {
  if (typeof x !== "object" || x === null) return false;
  const s = x as Record<string, unknown>;
  if (typeof s.step !== "number" || !Number.isFinite(s.step)) return false;
  if (typeof s.showResults !== "boolean") return false;
  if (typeof s.savedAt !== "number") return false;
  if (!Array.isArray(s.answers) || !s.answers.every((a) => typeof a === "number" && Number.isInteger(a))) return false;
  return Array.isArray(s.questionIds) && s.questionIds.every((id) => typeof id === "number");
}

/** The slice of the server's question shape this page renders against. */
interface QuizQuestionView {
  id: number;
  question: string;
  options: string[];
}

/** Read the mirror and keep it only if it still matches the loaded bank
 * (same ids, every answer within its options); the step is clamped to the
 * answers actually given. Anything else restores as a fresh quiz. */
function readSession(questions: QuizQuestionView[]): SavedSession {
  const saved = readStoredJSON(SESSION_KEY, isSavedSession, EMPTY_SESSION, window.sessionStorage);
  if (saved.answers.length === 0) return EMPTY_SESSION;
  const consistent =
    saved.questionIds.length === questions.length &&
    saved.questionIds.every((id, i) => id === questions[i].id) &&
    saved.answers.length <= questions.length &&
    saved.answers.every((a, i) => a >= 0 && a < questions[i].options.length);
  if (!consistent) return EMPTY_SESSION;
  return {
    ...saved,
    step: Math.min(Math.max(0, Math.trunc(saved.step)), saved.answers.length, questions.length - 1),
    showResults: saved.showResults && saved.answers.length === questions.length,
  };
}

export default function TheologyQuiz() {
  const questionsQuery = trpc.quiz.getQuestions.useQuery();

  const questions = questionsQuery.data || [];
  const isLoading = questionsQuery.isLoading;

  if (isLoading || (questionsQuery.isError && questionsQuery.isFetching)) {
    return (
      <>
        <MinimalNav />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid var(--bone-muted)", borderTop: "3px solid var(--mustard)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "var(--ink3)", fontFamily: "var(--F)" }}>Loading your quiz…</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (questionsQuery.isError) {
    return (
      <>
        <MinimalNav />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)" }}>
          <LoadFailed what="The quiz" onRetry={() => questionsQuery.refetch()} backHref="/tools" backLabel="Back to the tools" />
        </div>
        <Footer />
      </>
    );
  }

  return <TheologyQuizBody questions={questions} />;
}

/** The quiz itself — mounted only once the questions have loaded, so the
 * session mirror can be restored (and checked against the bank) in the
 * state initializers, silently, before first paint. */
function TheologyQuizBody({ questions }: { questions: QuizQuestionView[] }) {
  const [restored] = useState(() => readSession(questions));
  const [currentQuestion, setCurrentQuestion] = useState(restored.step);
  const [answers, setAnswers] = useState<number[]>(restored.answers);
  const [showResults, setShowResults] = useState(restored.showResults);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const recommendationsQuery = trpc.quiz.getRecommendations.useQuery(
    { answers },
    { enabled: showResults && answers.length > 0 }
  );

  // Mirror the state on every change, with the question ids the answers were
  // given against. A pristine state writes nothing, which keeps "Retake Quiz"
  // genuinely clean; a failed write is fine — the quiz simply proceeds
  // unpersisted.
  useEffect(() => {
    if (answers.length === 0 && currentQuestion === 0 && !showResults) return;
    writeStoredJSON(
      SESSION_KEY,
      {
        answers,
        step: currentQuestion,
        showResults,
        questionIds: questions.map((q) => q.id),
        savedAt: Date.now(),
      },
      window.sessionStorage
    );
  }, [answers, currentQuestion, showResults, questions]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setHoveredOption(null);
    removeStoredJSON(SESSION_KEY, window.sessionStorage);
  };

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questions.length]);

  return (
    <>
      <SEOMeta
        title="Theological Position Quiz"
        description="A free quiz: ten questions about what you actually believe, about four minutes, and then the essays that meet you where your answers say you are."
        keywords="theology quiz, faith assessment, James Bell, theological position"
        url={`${SITE_URL}/quiz`}
      />
      <MinimalNav />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", letterSpacing: "2px", color: "var(--gold)", fontWeight: "bold", marginBottom: "12px", textTransform: "uppercase" }}>FREE ASSESSMENT</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "bold", color: "var(--paper)", fontFamily: "var(--F)", marginBottom: "16px" }}>
            Where Do You Stand Theologically?
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", margin: "0 0 12px" }}>
            Answer plainly. At the end: the essays that meet you where your answers say you are.
          </p>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: "1.7", margin: 0 }}>
            Ten questions. About four minutes. No grade.
          </p>
        </div>
      </section>

      {/* Quiz Body */}
      <section style={{ background: "var(--paper)", padding: "60px 20px", minHeight: "60vh" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>

          {!showResults ? (
            <>
              {/* Progress */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", color: "var(--ink3)", fontWeight: "600" }}>Question {currentQuestion + 1} of {questions.length}</span>
                  <span style={{ fontSize: "13px", color: "var(--gold)", fontWeight: "600" }}>{progress}% complete</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "var(--line)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "3px", background: "var(--gold)", width: progress + "%", transition: "width 0.4s ease" }} />
                </div>
              </div>

              {/* Question Card */}
              {questions[currentQuestion] && (
                <div style={{ background: "white", borderRadius: "8px", border: "1px solid var(--bone-muted)", padding: "40px", boxShadow: "0 4px 24px rgba(26,51,40,0.06)" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "32px", lineHeight: "1.4" }}>
                    {questions[currentQuestion].question}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {questions[currentQuestion].options.map((option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        aria-pressed={answers[currentQuestion] === index}
                        onMouseEnter={() => setHoveredOption(index)}
                        onMouseLeave={() => setHoveredOption(null)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "16px 20px",
                          border: "2px solid",
                          borderColor: answers[currentQuestion] === index ? "var(--gold)" : hoveredOption === index ? "var(--gold)" : "var(--line)",
                          borderRadius: "6px",
                          background: answers[currentQuestion] === index ? "#FDF5E6" : hoveredOption === index ? "#FDFAF5" : "white",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontSize: "15px",
                          lineHeight: "1.5",
                          color: "var(--ink)",
                          fontFamily: "inherit"
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: answers[currentQuestion] === index ? "var(--gold)" : "var(--paper2)",
                            color: answers[currentQuestion] === index ? "white" : "var(--ink3)",
                            fontSize: "13px",
                            fontWeight: "bold",
                            flexShrink: 0
                          }}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Results */}
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
                <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "8px" }}>Your Results</h2>
                <p style={{ color: "var(--ink3)", fontSize: "16px" }}>Your answers point somewhere. Start reading there.</p>
              </div>

              {recommendationsQuery.isLoading && (
                <p style={{ textAlign: "center", color: "var(--ink3)", fontSize: "15px", lineHeight: "1.7", margin: "0 0 40px" }}>
                  Reading your answers…
                </p>
              )}

              {recommendationsQuery.isError && (
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <p style={{ color: "var(--ink3)", fontSize: "15px", lineHeight: "1.7", margin: "0 0 16px" }}>
                    Your results didn't load — a connection problem, not your answers. Your answers are safe.
                  </p>
                  <button
                    onClick={() => recommendationsQuery.refetch()}
                    style={{ padding: "12px 24px", border: "2px solid var(--mustard)", background: "white", color: "var(--gold)", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
                  >
                    Try again
                  </button>
                </div>
              )}

              {recommendationsQuery.data && (
                <>
                  {/* Top Pillar */}
                  <div style={{ background: "white", borderRadius: "8px", border: "2px solid var(--mustard)", padding: "32px", marginBottom: "32px" }}>
                    <div style={{ fontSize: "12px", letterSpacing: "2px", color: "var(--gold)", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>Your Primary Pillar</div>
                    <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "var(--gold)", fontFamily: "var(--F)", marginBottom: "12px" }}>
                      {recommendationsQuery.data.topPillar}
                    </h3>
                    <p style={{ fontSize: "15px", color: "var(--ink3)", lineHeight: "1.7" }}>{recommendationsQuery.data.message}</p>
                    {/* Score Bars */}
                    <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {Object.entries(recommendationsQuery.data.pillarScores as Record<string, number>).map(([pillar, score]) => (
                        <div key={pillar}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--ink)" }}>{pillar}</span>
                            <span style={{ fontSize: "13px", color: "var(--ink3)" }}>{score}/30</span>
                          </div>
                          <div style={{ height: "8px", background: "var(--paper2)", borderRadius: "4px", overflow: "hidden" }}>
                            <div style={{ height: "100%", background: "var(--gold)", borderRadius: "4px", width: ((score / 30) * 100) + "%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Articles */}
                  {recommendationsQuery.data.recommendedArticles?.length > 0 && (
                    <div style={{ marginBottom: "40px" }}>
                      <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "24px" }}>Recommended Reading For You</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                        {recommendationsQuery.data.recommendedArticles.slice(0, 4).map((article: any) => (
                          <Link key={article.slug} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                            <div style={{ background: "white", borderRadius: "8px", border: "1px solid var(--bone-muted)", padding: "24px", cursor: "pointer", height: "100%" }}>
                              <div style={{ fontSize: "11px", fontWeight: "bold", color: "var(--gold)", marginBottom: "8px", textTransform: "uppercase" }}>{article.pillar}</div>
                              <h4 style={{ fontSize: "15px", fontWeight: "bold", color: "var(--ink)", marginBottom: "8px", lineHeight: "1.4" }}>{article.title}</h4>
                              <p style={{ fontSize: "13px", color: "var(--ink3)", lineHeight: "1.6", marginBottom: "12px" }}>{article.excerpt}</p>
                              <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: "600" }}>{article.readTime} min read →</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    // Non-destructive: back to the questions with every answer intact.
                    setShowResults(false);
                    setCurrentQuestion(0);
                  }}
                  style={{ padding: "12px 24px", border: "2px solid var(--mustard)", background: "white", color: "var(--gold)", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
                >
                  Change my answers
                </button>
                <button
                  onClick={handleReset}
                  style={{ padding: "12px 24px", border: "2px solid var(--mustard)", background: "white", color: "var(--gold)", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
                >
                  Retake Quiz
                </button>
                <Link href="/writing" style={{ textDecoration: "none" }}>
                  <button style={{ padding: "12px 24px", border: "none", background: "var(--ink)", color: "white", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
                    Browse All Essays
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
