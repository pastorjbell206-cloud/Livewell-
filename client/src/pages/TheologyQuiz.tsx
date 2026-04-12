import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";

export default function TheologyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

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
  };

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questions.length]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin" size={40} style={{ color: "#B8963E" }} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-16 max-w-2xl mx-auto">
        {!showResults ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-serif font-bold mb-4" style={{ color: "#1A1A1A" }}>
                Where Do You Stand Theologically?
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover which of Livewell's three pillars resonates most with your faith journey.
              </p>

              {/* Progress bar */}
              <div className="w-full bg-border rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "#B8963E",
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            {/* Current question */}
            {questions[currentQuestion] && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full text-left p-4 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                        style={{
                          borderColor: answers[currentQuestion] === index ? "#B8963E" : undefined,
                          backgroundColor: answers[currentQuestion] === index ? "#F7F5F0" : undefined,
                        }}
                      >
                        <p className="font-medium">{option}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <>
            {/* Results */}
            <div className="mb-12">
              <h1 className="text-4xl font-serif font-bold mb-4" style={{ color: "#1A1A1A" }}>
                Your Results
              </h1>

              {recommendationsQuery.data && (
                <>
                  <Card className="mb-8 border-2" style={{ borderColor: "#B8963E" }}>
                    <CardHeader>
                      <CardTitle className="text-2xl" style={{ color: "#B8963E" }}>
                        {recommendationsQuery.data.topPillar}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {recommendationsQuery.data.message}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(recommendationsQuery.data.pillarScores).map(([pillar, score]) => (
                          <div key={pillar} className="flex items-center justify-between">
                            <span className="font-medium">{pillar}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-border rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${(score / 30) * 100}%`,
                                    backgroundColor: "#B8963E",
                                  }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8 text-right">{score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommended articles */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "#1A1A1A" }}>
                      Recommended Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommendationsQuery.data.recommendedArticles.slice(0, 4).map((article) => (
                        <Link key={article.slug} href={`/writing/${article.slug}`}>
                          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                            <CardHeader>
                              <CardDescription className="text-xs font-semibold uppercase tracking-wider mb-2">
                                {article.pillar}
                              </CardDescription>
                              <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-3">
                                {article.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-between h-full">
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{article.readTime} min read</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full"
              style={{ borderColor: "#B8963E", color: "#B8963E" }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}
