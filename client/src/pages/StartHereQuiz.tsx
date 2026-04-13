import { Link } from "wouter";
import { useState } from "react";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export default function StartHereQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const QUESTIONS = [
    {
      id: "concern",
      title: "What's weighing heaviest right now?",
      options: [
        { label: "Marriage", value: "marriage", color: "#B8963E" },
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
        { label: "Growing Deeper", value: "growing", color: "#2D4A3E" },
        { label: "Leading Others", value: "leading", color: "#6B8E6F" }
      ]
    },
    {
      id: "format",
      title: "What kind of content helps you most?",
      options: [
        { label: "Deep Articles", value: "articles", color: "#B8963E" },
        { label: "Practical Tools", value: "tools", color: "#6B8E6F" },
        { label: "Books", value: "books", color: "#8B6B7F" },
        { label: "Devotionals", value: "devotionals", color: "#6B9B8B" }
      ]
    }
  ];

  const READING_PATHS = {
    "marriage-crisis-articles": {
      title: "Marriage Crisis & Recovery",
      articles: [
        { title: "The Slow Drift That Ends More Marriages Than Dramatic Betrayal Does", slug: "the-slow-drift-that-ends-marriages" },
        { title: "When You Married Someone You No Longer Recognize", slug: "when-you-married-someone-you-no-longer-recognize" },
        { title: "The Resentment in Your Marriage Is Telling You Something Worth Hearing", slug: "the-resentment-in-your-marriage" }
      ],
      book: "What If We're Wrong?"
    },
    "marriage-searching-articles": {
      title: "Building Covenant Strength",
      articles: [
        { title: "What the Bible Actually Says About Submission and What It Doesn't", slug: "what-the-bible-says-about-submission" },
        { title: "When One Spouse Carries the Emotional Labor and the Other Doesn't Know It", slug: "emotional-labor-in-marriage" },
        { title: "Protecting Your Marriage When Ministry Demands Everything", slug: "protecting-marriage-in-ministry" }
      ],
      book: "The Monster in the Mirror"
    },
    "parenting-crisis-articles": {
      title: "Parenting Through Uncertainty",
      articles: [
        { title: "When Your Teenager Says They Don't Believe Anymore", slug: "teenager-losing-faith" },
        { title: "How to Talk to Your Kids About Faith When You're Not Sure What You Believe", slug: "how-to-talk-kids-faith-doubt" },
        { title: "The Pastor's Kids Are Watching What Are They Seeing?", slug: "the-pastors-kids-are-watching" }
      ],
      book: "When God Bless America Replaces Thy Kingdom Come"
    },
    "doubt-crisis-articles": {
      title: "Finding Faith in the Questions",
      articles: [
        { title: "When Fear Rewrites Theology", slug: "when-fear-rewrites-theology" },
        { title: "The Dark Night of the Soul When God Feels Absent", slug: "dark-night-god-feels-absent" },
        { title: "When the Church Married Empire", slug: "when-church-married-empire" }
      ],
      book: "What If We're Wrong?"
    },
    "pastoral-articles": {
      title: "Pastoral Leadership & Burnout",
      articles: [
        { title: "The Difference Between Being Tired and Being Done", slug: "difference-between-tired-and-done" },
        { title: "What Pastors Fear Most (That They Never Say Out Loud)", slug: "what-pastors-fear-most" },
        { title: "Why Pastors Quit (And How to Stay)", slug: "why-pastors-quit" }
      ],
      book: "The Monster in the Mirror"
    },
    "default": {
      title: "Essential LiveWell Collection",
      articles: [
        { title: "When Fear Rewrites Theology", slug: "when-fear-rewrites-theology" },
        { title: "The Slow Drift That Ends More Marriages Than Dramatic Betrayal Does", slug: "the-slow-drift-that-ends-marriages" },
        { title: "When the Church Married Empire", slug: "when-church-married-empire" }
      ],
      book: "The Monster in the Mirror"
    }
  };

  const getReadingPath = () => {
    const concern = answers.concern || "default";
    const situation = answers.situation || "crisis";
    const key = `${concern}-${situation}-${answers.format}`;
    return READING_PATHS[key as keyof typeof READING_PATHS] || READING_PATHS.default;
  };

  const handleSelect = (optionValue: string) => {
    const question = QUESTIONS[currentStep];
    setAnswers({ ...answers, [question.id]: optionValue });
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setEmailSubmitted(true);
    setEmailInput('');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const readingPath = getReadingPath();
  const isComplete = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div style={{ background: "#F7F5F0", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SEOMeta
        title="Find Your Path | LiveWell by James Bell"
        description="Personalized reading paths based on where you are in faith, marriage, parenting, and ministry. Get matched with articles and resources tailored to your journey."
        keywords="Christian resources, faith journey, where to start reading, personalized articles, LiveWell"
        url="https://livewellbyjamesbell.com/start-here-quiz"
        type="webpage"
      />

      <MinimalNav />

      <section style={{ flex: 1, padding: "40px 20px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        {!isComplete ? (
          <>
            {/* PROGRESS BAR */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "4px",
                      background: i <= currentStep ? "#B8963E" : "#E0D9CC",
                      borderRadius: "2px"
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
                Step {currentStep + 1} of {QUESTIONS.length}
              </p>
            </div>

            {/* QUESTION */}
            <div style={{ marginBottom: "48px" }}>
              <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "32px", fontFamily: "Georgia, serif" }}>
                {QUESTIONS[currentStep].title}
              </h1>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {QUESTIONS[currentStep].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(option.value)}
                    style={{
                      background: answers[QUESTIONS[currentStep].id] === option.value ? option.color : "#FFF",
                      color: answers[QUESTIONS[currentStep].id] === option.value ? "#FFF" : "#1A1A1A",
                      border: answers[QUESTIONS[currentStep].id] === option.value ? "none" : "1px solid #E0D9CC",
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
                  background: currentStep === 0 ? "#E0D9CC" : "#2D4A3E",
                  color: currentStep === 0 ? "#6B7280" : "#F7F5F0",
                  border: "none",
                  padding: "12px 24px",
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
                  }
                }}
                disabled={!answers[QUESTIONS[currentStep].id]}
                style={{
                  background: !answers[QUESTIONS[currentStep].id] ? "#E0D9CC" : "#B8963E",
                  color: "#1A1A1A",
                  border: "none",
                  padding: "12px 24px",
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
              <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "16px", fontFamily: "Georgia, serif" }}>
                Your Personalized Reading Path
              </h1>
              <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "24px" }}>
                Based on where you are, here's where to start:
              </p>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#2D4A3E", marginBottom: "32px", fontFamily: "Georgia, serif" }}>
                {readingPath.title}
              </h2>
            </div>

            {/* ARTICLES */}
            <div style={{ marginBottom: "48px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "24px" }}>
                Start with these articles:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {readingPath.articles.map((article, i) => (
                  <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                    <div style={{ background: "#FFF", padding: "24px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div style={{ textAlign: "left" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#1A1A1A", margin: "0 0 8px 0" }}>
                          {article.title}
                        </h4>
                        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
                          7-12 min read
                        </p>
                      </div>
                      <span style={{ color: "#B8963E", fontWeight: "bold", marginLeft: "16px", whiteSpace: "nowrap" }}>
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* BOOK RECOMMENDATION */}
            <div style={{ background: "#F0EDE5", padding: "32px", borderRadius: "8px", marginBottom: "48px", textAlign: "center" }}>
              <p style={{ fontSize: "12px", fontWeight: "bold", color: "#B8963E", marginBottom: "8px", textTransform: "uppercase" }}>
                Then read this book
              </p>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "12px" }}>
                {readingPath.book}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "16px" }}>
                Go deeper with James Bell's most comprehensive work on this topic.
              </p>
              <Link href="/books" style={{ textDecoration: "none" }}>
                <button style={{ background: "#2D4A3E", color: "#F7F5F0", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
                  View Books
                </button>
              </Link>
            </div>

            {/* EMAIL CAPTURE */}
            <div style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "48px", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
                Want this path emailed to you?
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "24px", color: "#D1C9BB" }}>
                We'll send you direct links to all three articles plus James's latest essays related to your path.
              </p>
              {emailSubmitted ? (
                <p style={{ color: "#B8963E", fontWeight: "bold", fontSize: "16px" }}>
                  Check your inbox. Your path is on the way.
                </p>
              ) : (
                <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    style={{ flex: 1, minWidth: "200px", padding: "12px 16px", border: "none", borderRadius: "4px", fontSize: "14px" }}
                  />
                  <button type="submit" style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Email Me
                  </button>
                </form>
              )}
            </div>

            {/* RESTART BUTTON */}
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                }}
                style={{ background: "#FFF", color: "#1A1A1A", border: "1px solid #E0D9CC", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}
              >
                Start Over
              </button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
