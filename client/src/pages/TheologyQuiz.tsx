import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export default function TheologyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const questionsQuery = trpc.quiz.getQuestions.useQuery();
  const recommendationsQuery = trpc.quiz.getRecommendations.useQuery(
    { answers },
    { enabled: showResults && answers.length > 0 }
  );

  const questions = questionsQuery.data || [];
  const isLoading = questionsQuery.isLoading;

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
  };

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questions.length]);

  if (isLoading) {
    return (
      <>
        <MinimalNav />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F5F0" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid #E0D9CC", borderTop: "3px solid #B8963E", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "#6B7280", fontFamily: "Georgia, serif" }}>Loading your quiz...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOMeta
        title="Theological Position Quiz"
        description="Discover which of LiveWell's five pillars resonates most with your faith journey. Take the free quiz and get personalized article recommendations."
        keywords="theology quiz, faith assessment, James Bell, theological position"
        url="https://livewellbyjamesbell.com/quiz"
      />
      <MinimalNav />

      {/* Hero */}
      <section style={{ background: "#2D4A3E", padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", letterSpacing: "2px", color: "#B8963E", fontWeight: "bold", marginBottom: "12px", textTransform: "uppercase" }}>FREE ASSESSMENT</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "bold", color: "#F7F5F0", fontFamily: "Georgia, serif", marginBottom: "16px" }}>
            Where Do You Stand Theologically?
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7" }}>
            Discover which of LiveWell's pillars resonates most with your faith journey. 10 questions. Personalized reading recommendations.
          </p>
        </div>
      </section>

      {/* Quiz Body */}
      <section style={{ background: "#F7F5F0", padding: "60px 20px", minHeight: "60vh" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>

          {!showResults ? (
            <>
              {/* Progress */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>Question {currentQuestion + 1} of {questions.length}</span>
                  <span style={{ fontSize: "13px", color: "#B8963E", fontWeight: "600" }}>{progress}% complete</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#E0D9CC", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "3px", background: "#B8963E", width: progress + "%", transition: "width 0.4s ease" }} />
                </div>
              </div>

              {/* Question Card */}
              {questions[currentQuestion] && (
                <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E0D9CC", padding: "40px", boxShadow: "0 4px 24px rgba(26,51,40,0.06)" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#1A1A1A", fontFamily: "Georgia, serif", marginBottom: "32px", lineHeight: "1.4" }}>
                    {questions[currentQuestion].question}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {questions[currentQuestion].options.map((option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        onMouseEnter={() => setHoveredOption(index)}
                        onMouseLeave={() => setHoveredOption(null)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "16px 20px",
                          border: "2px solid",
                          borderColor: answers[currentQuestion] === index ? "#B8963E" : hoveredOption === index ? "#B8963E" : "#E0D9CC",
                          borderRadius: "6px",
                          background: answers[currentQuestion] === index ? "#FDF5E6" : hoveredOption === index ? "#FDFAF5" : "white",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontSize: "15px",
                          lineHeight: "1.5",
                          color: "#1A1A1A",
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
                            background: answers[currentQuestion] === index ? "#B8963E" : "#F0EDE5",
                            color: answers[currentQuestion] === index ? "white" : "#6B7280",
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
                <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#1A1A1A", fontFamily: "Georgia, serif", marginBottom: "8px" }}>Your Results</h2>
                <p style={{ color: "#6B7280", fontSize: "16px" }}>Here's what your answers reveal about your theological inclinations.</p>
              </div>

              {recommendationsQuery.data && (
                <>
                  {/* Top Pillar */}
                  <div style={{ background: "white", borderRadius: "8px", border: "2px solid #B8963E", padding: "32px", marginBottom: "32px" }}>
                    <div style={{ fontSize: "12px", letterSpacing: "2px", color: "#B8963E", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>Your Primary Pillar</div>
                    <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E", fontFamily: "Georgia, serif", marginBottom: "12px" }}>
                      {recommendationsQuery.data.topPillar}
                    </h3>
                    <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: "1.7" }}>{recommendationsQuery.data.message}</p>
                    {/* Score Bars */}
                    <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {Object.entries(recommendationsQuery.data.pillarScores as Record<string, number>).map(([pillar, score]) => (
                        <div key={pillar}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "13px", fontWeight: "600", color: "#1A1A1A" }}>{pillar}</span>
                            <span style={{ fontSize: "13px", color: "#6B7280" }}>{score}/30</span>
                          </div>
                          <div style={{ height: "8px", background: "#F0EDE5", borderRadius: "4px", overflow: "hidden" }}>
                            <div style={{ height: "100%", background: "#B8963E", borderRadius: "4px", width: ((score / 30) * 100) + "%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Articles */}
                  {recommendationsQuery.data.recommendedArticles?.length > 0 && (
                    <div style={{ marginBottom: "40px" }}>
                      <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "#1A1A1A", fontFamily: "Georgia, serif", marginBottom: "24px" }}>Recommended Reading For You</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                        {recommendationsQuery.data.recommendedArticles.slice(0, 4).map((article: any) => (
                          <Link key={article.slug} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E0D9CC", padding: "24px", cursor: "pointer", height: "100%" }}>
                              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#B8963E", marginBottom: "8px", textTransform: "uppercase" }}>{article.pillar}</div>
                              <h4 style={{ fontSize: "15px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "8px", lineHeight: "1.4" }}>{article.title}</h4>
                              <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.6", marginBottom: "12px" }}>{article.excerpt}</p>
                              <span style={{ fontSize: "12px", color: "#B8963E", fontWeight: "600" }}>{article.readTime} min read →</span>
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
                  onClick={handleReset}
                  style={{ padding: "12px 24px", border: "2px solid #B8963E", background: "white", color: "#B8963E", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
                >
                  Retake Quiz
                </button>
                <Link href="/writing" style={{ textDecoration: "none" }}>
                  <button style={{ padding: "12px 24px", border: "none", background: "#1A1A1A", color: "white", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
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
