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

  const READING_PATHS = {
    "marriage-crisis-articles": {
      title: "Marriage Under Strain",
      articles: [
        { title: "Zanah: When You Keep the Vows and Give Away the Heart", slug: "zanah-when-you-keep-the-vows" },
        { title: "The Mirror Doesn't Lie", slug: "the-mirror-doesnt-lie" },
        { title: "Hustle Culture Is Idolatry", slug: "hustle-culture-is-idolatry" }
      ],
      book: "What If We're Wrong?"
    },
    "marriage-searching-articles": {
      title: "Building Covenant Strength",
      articles: [
        { title: "Zanah: When You Keep the Vows and Give Away the Heart", slug: "zanah-when-you-keep-the-vows" },
        { title: "The Mirror Doesn't Lie", slug: "the-mirror-doesnt-lie" },
        { title: "The Generational Cost", slug: "the-generational-cost" }
      ],
      book: "The Monster in the Mirror"
    },
    "parenting-crisis-articles": {
      title: "Parenting Through Uncertainty",
      articles: [
        { title: "The Generational Cost", slug: "the-generational-cost" },
        { title: "The Mirror Doesn't Lie", slug: "the-mirror-doesnt-lie" },
        { title: "Hustle Culture Is Idolatry", slug: "hustle-culture-is-idolatry" }
      ],
      book: "When God Bless America Replaces Thy Kingdom Come"
    },
    "doubt-crisis-articles": {
      title: "Finding Faith in the Questions",
      articles: [
        { title: "The Mirror Doesn't Lie", slug: "the-mirror-doesnt-lie" },
        { title: "Constantine's Bargain", slug: "constantines-bargain" },
        { title: "Germany's Warning", slug: "germanys-warning" }
      ],
      book: "What If We're Wrong?"
    },
    "pastoral-articles": {
      title: "Pastoral Leadership & Burnout",
      articles: [
        { title: "Why We Need Each Other", slug: "why-we-need-each-other" },
        { title: "Hustle Culture Is Idolatry", slug: "hustle-culture-is-idolatry" },
        { title: "The Generational Cost", slug: "the-generational-cost" }
      ],
      book: "The Monster in the Mirror"
    },
    "default": {
      title: "Essential LiveWell Collection",
      articles: [
        { title: "The Mirror Doesn't Lie", slug: "the-mirror-doesnt-lie" },
        { title: "Zanah: When You Keep the Vows and Give Away the Heart", slug: "zanah-when-you-keep-the-vows" },
        { title: "Germany's Warning", slug: "germanys-warning" }
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
    <div style={{ background: "var(--paper)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SEOMeta
        title="Find Your Path | LiveWell by James Bell"
        description="Find where to start. Tell us what is weighing on you and we point you toward the writing that meets you there."
        keywords="where to start, Christian writing, marriage, parenting, doubt, pastoral burnout, LiveWell, James Bell"
        url="https://www.livewellbyjamesbell.co/start"
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
              <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "var(--ink)", marginBottom: "32px", fontFamily: "Georgia, serif" }}>
                {QUESTIONS[currentStep].title}
              </h1>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {QUESTIONS[currentStep].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(option.value)}
                    style={{
                      background: answers[QUESTIONS[currentStep].id] === option.value ? option.color : "#FFF",
                      color: answers[QUESTIONS[currentStep].id] === option.value ? "#FFF" : "var(--ink)",
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
                  background: currentStep === 0 ? "var(--line)" : "var(--ink)",
                  color: currentStep === 0 ? "var(--ink3)" : "var(--paper)",
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
                  background: !answers[QUESTIONS[currentStep].id] ? "var(--line)" : "var(--gold)",
                  color: "var(--ink)",
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
              <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "var(--ink)", marginBottom: "16px", fontFamily: "Georgia, serif" }}>
                Your Personalized Reading Path
              </h1>
              <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "24px" }}>
                Based on where you are, here's where to start:
              </p>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "var(--ink)", marginBottom: "32px", fontFamily: "Georgia, serif" }}>
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
                    <div style={{ background: "#FFF", padding: "24px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div style={{ textAlign: "left" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--ink)", margin: "0 0 8px 0" }}>
                          {article.title}
                        </h4>
                        <p style={{ fontSize: "13px", color: "var(--ink3)", margin: 0 }}>
                          7-12 min read
                        </p>
                      </div>
                      <span style={{ color: "var(--gold)", fontWeight: "bold", marginLeft: "16px", whiteSpace: "nowrap" }}>
                        Read â
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
              <Link href="/books" style={{ textDecoration: "none" }}>
                <button style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
                  View Books
                </button>
              </Link>
            </div>

            {/* EMAIL CAPTURE */}
            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "48px", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
                Want this path emailed to you?
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "24px", color: "var(--stone2)" }}>
                We'll send you direct links to all three articles plus James's latest essays related to your path.
              </p>
              {emailSubmitted ? (
                <p style={{ color: "var(--gold)", fontWeight: "bold", fontSize: "16px" }}>
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
                  <button type="submit" style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap" }}>
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
                style={{ background: "#FFF", color: "var(--ink)", border: "1px solid #E0D9CC", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}
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
