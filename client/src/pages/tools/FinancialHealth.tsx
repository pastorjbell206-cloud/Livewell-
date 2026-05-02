import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, Printer } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────── */

interface Question {
  id: number;
  text: string;
}

interface Category {
  name: string;
  slug: string;
  description: string;
  scripture: { text: string; reference: string };
  questions: Question[];
  recommendations: Record<string, string[]>;
  articleLink: { title: string; href: string };
}

/* ── Data ──────────────────────────────────────────────────────── */

const RATING_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const CATEGORIES: Category[] = [
  {
    name: "Generosity",
    slug: "generosity",
    description:
      "Whether your money flows outward or only circles back to yourself. Generosity is not a financial strategy. It is a declaration about who you believe actually owns what you have.",
    scripture: {
      text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
      reference: "2 Corinthians 9:7",
    },
    questions: [
      {
        id: 1,
        text: "I give regularly and intentionally to my church and to those in need -- not from leftovers, but as a first priority.",
      },
      {
        id: 2,
        text: "When I encounter an unexpected need -- a friend in crisis, a stranger in want -- I respond with generosity rather than calculation.",
      },
      {
        id: 3,
        text: "I am generous with my time and skills, not only my money -- volunteering, mentoring, serving without expectation of return.",
      },
    ],
    recommendations: {
      low: [
        "Start with a specific, consistent amount -- even if it is small. Generosity is a muscle. It atrophies without use and strengthens with practice. Give the same amount to your church every week for the next month and notice what it does to your relationship with money.",
        "Examine what holds you back. Is it fear of not having enough? Is it the belief that you have earned everything you have? Both are common. Both are lies the culture tells so effectively that they feel like wisdom.",
        "Read the story of the widow's mite in Mark 12:41-44. Jesus did not measure generosity by amount. He measured it by cost. What would it cost you to give in a way that you actually feel?",
      ],
      mid: [
        "You give, but it may not yet cost you anything. The next step is not to give more, necessarily -- it is to give in a way that requires trust. The gift that does not make you slightly uncomfortable has not yet taught you anything about dependence on God.",
        "Look for giving opportunities outside your normal patterns. Support a missionary. Sponsor a child. Pay for the person behind you. Spontaneous generosity trains your heart differently than scheduled giving.",
        "Consider whether your generosity extends beyond money. Time is the harder currency. Give an afternoon to someone who cannot pay you back.",
      ],
      high: [
        "You have developed a generous heart. Guard it. Generosity can quietly shift from worship to identity -- from 'God owns this' to 'I am a generous person.' The first posture sustains. The second performs.",
        "Mentor someone in generosity. Many people want to give but do not know how to start. Your experience is a gift to the next person.",
        "Ask God to show you blind spots in your generosity. Are there categories of people you are generous toward and categories you overlook? Generosity that is selective is not yet complete.",
      ],
    },
    articleLink: {
      title: "Read more on stewardship and generosity",
      href: "/writing?category=living-well",
    },
  },
  {
    name: "Contentment",
    slug: "contentment",
    description:
      "Whether you have learned the difference between 'not enough' and 'wanting more.' One is poverty. The other is a sickness the wealthy carry without diagnosis.",
    scripture: {
      text: "For the love of money is a root of all kinds of evil. Some people, eager for money, have wandered from the faith and pierced themselves with many griefs.",
      reference: "1 Timothy 6:10",
    },
    questions: [
      {
        id: 4,
        text: "I rarely compare my financial situation to others -- on social media, among friends, or at work -- and when I do, I catch it and correct it.",
      },
      {
        id: 5,
        text: "I practice gratitude for what I have rather than fixating on what I lack. My default posture toward my financial life is thankfulness, not anxiety.",
      },
      {
        id: 6,
        text: "I can say 'I have enough' and mean it -- not as resignation, but as a genuine assessment of God's provision.",
      },
    ],
    recommendations: {
      low: [
        "Comparison is the engine of discontent, and the modern world has built an entire economy on it. Reduce your exposure. Unfollow the accounts that make you feel behind. You are not behind. You are where you are.",
        "Write down ten things you have that money cannot buy. Not as a platitude exercise -- as a confrontation with the lie that more money would solve the ache you feel. The ache is real. The solution is misdiagnosed.",
        "Read Philippians 4:11-13 slowly. Paul wrote those words from prison. Contentment is not the result of having enough. It is the result of knowing who holds you, regardless of what you hold.",
      ],
      mid: [
        "You have seasons of contentment interrupted by seasons of wanting. That is human. The discipline is not to eliminate desire but to examine it. Ask yourself: 'If I got this thing, what do I believe it would give me?' Name the deeper want.",
        "Practice a weekly gratitude inventory. Not a vague sense of thankfulness -- a specific list. The mortgage payment you made. The meal your family ate together. The car that started. Specificity kills entitlement.",
        "Notice when advertising creates a need you did not have five minutes ago. That awareness alone is a form of resistance.",
      ],
      high: [
        "Contentment at this level is rare and countercultural. You are living proof that the gospel produces something the market cannot sell.",
        "Be honest about the ongoing work. Contentment is not a destination. It is a daily discipline that can erode in a single envious moment. Stay vigilant.",
        "Share your contentment without making it a sermon. The most powerful testimony is a person who genuinely has enough and lives like it. People will notice. Let them ask.",
      ],
    },
    articleLink: {
      title: "Read more on contentment and the good life",
      href: "/writing?category=living-well",
    },
  },
  {
    name: "Stewardship",
    slug: "stewardship",
    description:
      "Whether you manage what you have been given with the seriousness of someone who knows it belongs to Another.",
    scripture: {
      text: "The earth is the Lord's, and everything in it, the world, and all who live in it.",
      reference: "Psalm 24:1",
    },
    questions: [
      {
        id: 7,
        text: "I know exactly how much debt I carry, what the interest rates are, and I have a plan to address it.",
      },
      {
        id: 8,
        text: "I save consistently -- not when it is convenient, but as a discipline, even in months when the budget is tight.",
      },
      {
        id: 9,
        text: "I have a written or clearly defined financial plan that extends beyond this month -- covering retirement, education, major purchases, and giving goals.",
      },
    ],
    recommendations: {
      low: [
        "If you do not know what you owe, find out this week. Open every statement. Write every number down. Ignorance about debt is not bliss -- it is compounding interest working against you while you look away.",
        "Start an emergency fund. Even twenty dollars a week builds the discipline before it builds the balance. The point is not the amount. The point is the habit. Proverbs 21:20 says the wise store up, and the foolish consume everything. Choose the first category.",
        "Find one person who manages money well and ask them how. Not a social media personality. A real person whose life you can observe. Stewardship is learned, not intuited.",
      ],
      mid: [
        "You have the basics in place. Now move from reactive financial management to proactive stewardship. The difference: reactive means you handle what comes. Proactive means you decide in advance where every dollar goes.",
        "If your savings are inconsistent, automate them. Remove the decision from the moment. What is automatic becomes invisible, and what is invisible becomes consistent.",
        "Review your financial plan annually. A plan that was right at twenty-five may be wrong at forty. Stewardship requires adjustment, not just maintenance.",
      ],
      high: [
        "You are managing well. The question now is whether your stewardship serves only your household or extends outward. Financial competence without generosity is just accumulation with a Bible verse attached.",
        "Teach what you know. Many people in your church or community are drowning in financial chaos and too ashamed to ask for help. Your competence can serve their crisis.",
        "Guard against the temptation to find your security in the plan rather than in the Provider. The best financial plan on earth does not make you sovereign over tomorrow. God does.",
      ],
    },
    articleLink: {
      title: "Read more on stewardship and responsibility",
      href: "/writing?category=living-well",
    },
  },
  {
    name: "Family Provision",
    slug: "family",
    description:
      "Whether money is a shared language in your home or a source of division, silence, and unspoken resentment.",
    scripture: {
      text: "Anyone who does not provide for their relatives, and especially for their own household, has denied the faith and is worse than an unbeliever.",
      reference: "1 Timothy 5:8",
    },
    questions: [
      {
        id: 10,
        text: "My spouse and I talk openly about money -- income, spending, fears, and goals -- without it becoming a fight.",
      },
      {
        id: 11,
        text: "I am actively teaching my children (or plan to teach future children) about money, work, generosity, and contentment.",
      },
      {
        id: 12,
        text: "Our household is prepared for a financial emergency -- job loss, medical crisis, unexpected expense -- with savings and a plan.",
      },
    ],
    recommendations: {
      low: [
        "If money conversations with your spouse produce conflict, the problem is not the money. It is what money represents: security, control, values, fear. Name the real issue before you discuss the numbers. 'I am afraid we will not have enough' is a different conversation than 'You spend too much.'",
        "Begin teaching your children about money by giving them some to manage. A small allowance with three categories -- save, give, spend -- teaches more theology than a sermon on stewardship. They learn that money has purposes beyond consumption.",
        "If you have no emergency fund, start one today. Even a hundred dollars in a separate account changes your posture from panic to preparation. Provision is not about wealth. It is about responsibility.",
      ],
      mid: [
        "You are having some conversations about money, but they may be incomplete. Schedule a monthly financial meeting with your spouse -- thirty minutes, no interruptions, no blame. Review what came in, what went out, and what is coming. The meeting itself builds trust, regardless of the numbers.",
        "Examine what your children are learning about money from watching you. Are they learning anxiety or stewardship? Generosity or hoarding? They will inherit your relationship with money before they inherit your money.",
        "Move your emergency preparedness from 'we could probably manage' to 'we have a specific plan.' Write it down. Knowing what you would do in a crisis reduces the fear of the crisis itself.",
      ],
      high: [
        "You are providing well -- financially and relationally. That combination is rarer than most people realize. Many provide financially while destroying relationally, or connect emotionally while ignoring practical responsibility.",
        "Keep the financial conversations going even when things are comfortable. Comfortable seasons are when assumptions grow unchecked. Stay aligned by staying in conversation.",
        "Consider your provision beyond your immediate family. Does your extended family, your church, your community experience your provision? 1 Timothy 5:8 begins with 'relatives' before it narrows to 'household.' The scope is wider than we usually read.",
      ],
    },
    articleLink: {
      title: "Read more on family, parenting, and provision",
      href: "/writing?category=parenting",
    },
  },
];

function getScoreLevel(score: number, maxScore: number): string {
  const pct = score / maxScore;
  if (pct >= 0.8) return "high";
  if (pct >= 0.5) return "mid";
  return "low";
}

function getOverallLabel(score: number): {
  label: string;
  color: string;
  description: string;
} {
  const pct = score / 60;
  if (pct >= 0.8)
    return {
      label: "Faithful Steward",
      color: "#2D6A4F",
      description:
        "Your financial life reflects serious attention to biblical stewardship. You give, you save, you plan, and you communicate. This is not the end of the work -- it is the foundation for deeper obedience. The question is no longer whether you manage well. It is whether your management serves the kingdom or merely secures your comfort.",
    };
  if (pct >= 0.6)
    return {
      label: "Growing Steward",
      color: "var(--mustard)",
      description:
        "You are building good habits but have areas that need attention. This is where most honest Christians live -- aware that their financial life does not yet match their theology, but willing to close the gap. The fact that you are here, taking this assessment, suggests you are ready for the next step.",
    };
  if (pct >= 0.4)
    return {
      label: "Needs Realignment",
      color: "#E07A2F",
      description:
        "Several areas of your financial life are out of alignment with biblical principles. This is a diagnosis, not a condemnation. God does not require financial perfection. He requires honesty about where you are and willingness to move toward where He is calling you. Start with one category. One conversation. One change.",
    };
  return {
    label: "Foundation Needed",
    color: "#C0392B",
    description:
      "Your financial life needs significant restructuring, and that is not a statement about your worth -- it is a statement about your habits. Many of the most faithful people in Scripture went through seasons of financial crisis. The difference between crisis and character is what you do next. Start by getting help: a financial counselor, a trusted mentor, a Dave Ramsey class at your church. You do not have to figure this out alone.",
  };
}

/* ── Component ─────────────────────────────────────────────────── */

export default function FinancialHealth() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const category = CATEGORIES[currentCategory];
  const totalQuestions = 12;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const canProceed = category.questions.every((q) => answers[q.id] !== undefined);
  const isLastCategory = currentCategory === CATEGORIES.length - 1;
  const allAnswered = answeredCount === totalQuestions;

  const handleRate = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastCategory && allAnswered) {
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (!isLastCategory) {
      setCurrentCategory((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentCategory(0);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCategoryScore = (cat: Category) =>
    cat.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);

  const totalScore = CATEGORIES.reduce(
    (sum, cat) => sum + getCategoryScore(cat),
    0,
  );

  const overall = getOverallLabel(totalScore);

  return (
    <Layout>
      <SEOMeta
        title="Financial Health Check -- Biblical Stewardship Assessment"
        description="A 12-question diagnostic for financial health through a theological lens. Assess your generosity, contentment, stewardship, and family provision with Scripture-grounded recommendations."
        keywords="financial health, biblical stewardship, Christian finances, tithing assessment, money and faith, financial stewardship"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Financial Health Check",
          description:
            "A 12-question biblical stewardship assessment covering generosity, contentment, stewardship, and family provision.",
          url: "https://www.livewellbyjamesbell.co/tools/financial-health",
          applicationCategory: "FinanceApplication",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--bone)",
          padding: "80px 32px 60px",
          textAlign: "center",
        }}
      >
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--mustard)",
              fontFamily: "var(--U)",
              marginBottom: "16px",
            }}
          >
            FREE TOOL
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 300,
              fontFamily: "var(--F)",
              lineHeight: 1.15,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Financial Health{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              Check
            </em>
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              opacity: 0.85,
              fontFamily: "var(--B)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Twelve questions across four areas of financial stewardship. Not a
            budget calculator -- a diagnostic for whether your money reflects
            what you say you believe.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      {!showResults && (
        <div
          style={{
            background: "var(--bone-warm)",
            padding: "0",
            position: "sticky",
            top: 70,
            zIndex: 100,
          }}
          className="no-print"
        >
          <div
            style={{
              height: "4px",
              background: "var(--bone-muted)",
              width: "100%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "var(--mustard)",
                transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </div>
          <div
            className="wrap"
            style={{
              maxWidth: "900px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 32px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontFamily: "var(--U)",
                fontWeight: 600,
                color: "var(--ink-muted)",
                letterSpacing: "0.08em",
              }}
            >
              {answeredCount} of {totalQuestions} answered
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.slug}
                  onClick={() => setCurrentCategory(i)}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background:
                      i === currentCategory
                        ? "var(--mustard)"
                        : cat.questions.every((q) => answers[q.id] !== undefined)
                          ? "var(--ink-muted)"
                          : "var(--bone-muted)",
                    transition: "background 0.2s",
                  }}
                  aria-label={`Go to ${cat.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assessment Content */}
      {!showResults && (
        <section style={{ padding: "48px 32px 80px", background: "var(--bone)" }}>
          <div className="wrap" style={{ maxWidth: "700px" }}>
            {/* Category Header */}
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "var(--mustard)",
                  fontFamily: "var(--U)",
                  marginBottom: "12px",
                }}
              >
                PART {currentCategory + 1} OF {CATEGORIES.length}
              </div>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 38px)",
                  fontWeight: 400,
                  fontFamily: "var(--F)",
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                {category.name}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  fontFamily: "var(--B)",
                  maxWidth: "60ch",
                  marginBottom: "20px",
                }}
              >
                {category.description}
              </p>

              {/* Scripture Reference */}
              <div
                style={{
                  borderLeft: "3px solid var(--mustard)",
                  padding: "16px 20px",
                  background: "white",
                  borderRadius: "0 2px 2px 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "16px",
                    fontStyle: "italic",
                    color: "var(--ink)",
                    lineHeight: 1.7,
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  "{category.scripture.text}"
                </p>
                <span
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--mustard)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {category.scripture.reference}
                </span>
              </div>
            </div>

            {/* Questions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                marginBottom: "48px",
              }}
            >
              {category.questions.map((q, qi) => (
                <div
                  key={q.id}
                  style={{
                    background: "white",
                    borderRadius: "2px",
                    padding: "32px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "24px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "24px",
                        fontWeight: 400,
                        color: "var(--mustard)",
                        lineHeight: 1.2,
                        flexShrink: 0,
                        width: "28px",
                        textAlign: "center",
                      }}
                    >
                      {currentCategory * 3 + qi + 1}
                    </span>
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.7,
                        color: "var(--ink)",
                        fontFamily: "var(--B)",
                        margin: 0,
                      }}
                    >
                      {q.text}
                    </p>
                  </div>

                  {/* Rating Buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      paddingLeft: "44px",
                    }}
                  >
                    {RATING_LABELS.map((label, i) => {
                      const value = i + 1;
                      const isSelected = answers[q.id] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleRate(q.id, value)}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "2px",
                            fontSize: "13px",
                            fontFamily: "var(--U)",
                            fontWeight: isSelected ? 600 : 400,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            background: isSelected
                              ? "var(--mustard)"
                              : "var(--bone)",
                            color: isSelected
                              ? "var(--ink)"
                              : "var(--ink-muted)",
                            border: isSelected
                              ? "1px solid var(--mustard)"
                              : "1px solid var(--border)",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "var(--mustard)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "var(--border)";
                            }
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleBack}
                disabled={currentCategory === 0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  color:
                    currentCategory === 0
                      ? "var(--bone-muted)"
                      : "var(--ink-muted)",
                  cursor: currentCategory === 0 ? "default" : "pointer",
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                }}
              >
                <ArrowLeft size={16} />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: "2px",
                  cursor: canProceed ? "pointer" : "default",
                  transition: "all 0.2s",
                  background: canProceed ? "var(--mustard)" : "var(--bone-muted)",
                  color: canProceed ? "var(--ink)" : "var(--ink-muted)",
                  border: "none",
                }}
              >
                {isLastCategory ? "See Results" : "Next Section"}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {showResults && (
        <section
          ref={resultsRef}
          style={{ padding: "48px 32px 80px", background: "var(--bone)" }}
        >
          <div className="wrap" style={{ maxWidth: "800px" }}>
            {/* Overall Score */}
            <div
              style={{
                background: "white",
                borderRadius: "2px",
                padding: "48px 40px",
                borderTop: "4px solid " + overall.color,
                marginBottom: "32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "var(--mustard)",
                  fontFamily: "var(--U)",
                  marginBottom: "20px",
                }}
              >
                YOUR RESULTS
              </div>
              <div
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(48px, 8vw, 72px)",
                  fontWeight: 300,
                  color: overall.color,
                  lineHeight: 1,
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                {totalScore}
                <span
                  style={{
                    fontSize: "24px",
                    color: "var(--ink-muted)",
                    fontWeight: 400,
                  }}
                >
                  {" "}
                  / 60
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: overall.color,
                  marginBottom: "24px",
                }}
              >
                {overall.label}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "var(--ink)",
                  fontFamily: "var(--B)",
                  maxWidth: "60ch",
                  margin: "0 auto",
                }}
              >
                {overall.description}
              </p>
            </div>

            {/* Score Bar Overview */}
            <div
              style={{
                background: "white",
                borderRadius: "2px",
                padding: "36px 40px",
                border: "1px solid var(--border)",
                marginBottom: "32px",
              }}
            >
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--mustard)",
                  fontFamily: "var(--U)",
                  marginBottom: "28px",
                }}
              >
                CATEGORY BREAKDOWN
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {CATEGORIES.map((cat) => {
                  const score = getCategoryScore(cat);
                  const maxCatScore = 15;
                  const pct = (score / maxCatScore) * 100;
                  const level = getScoreLevel(score, maxCatScore);
                  const barColor =
                    level === "high"
                      ? "#2D6A4F"
                      : level === "mid"
                        ? "var(--mustard)"
                        : "#C0392B";
                  return (
                    <div key={cat.slug}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "17px",
                            fontWeight: 500,
                            color: "var(--ink)",
                          }}
                        >
                          {cat.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--U)",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: barColor,
                          }}
                        >
                          {score} / {maxCatScore}
                        </span>
                      </div>
                      <div
                        style={{
                          height: "8px",
                          background: "var(--bone)",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${pct}%`,
                            background: barColor,
                            borderRadius: "4px",
                            transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Per-Category Recommendations */}
            {CATEGORIES.map((cat) => {
              const score = getCategoryScore(cat);
              const maxCatScore = 15;
              const level = getScoreLevel(score, maxCatScore);
              const recs = cat.recommendations[level];
              const levelLabel =
                level === "high"
                  ? "Strength"
                  : level === "mid"
                    ? "Growing"
                    : "Needs Attention";
              const levelColor =
                level === "high"
                  ? "#2D6A4F"
                  : level === "mid"
                    ? "var(--mustard)"
                    : "#C0392B";

              return (
                <div
                  key={cat.slug}
                  style={{
                    background: "white",
                    borderRadius: "2px",
                    padding: "36px 40px",
                    border: "1px solid var(--border)",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "var(--ink)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {cat.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "var(--U)",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        color: levelColor,
                        padding: "4px 12px",
                        background:
                          level === "high"
                            ? "rgba(45,106,79,0.08)"
                            : level === "mid"
                              ? "rgba(212,160,23,0.1)"
                              : "rgba(192,57,43,0.08)",
                        borderRadius: "2px",
                      }}
                    >
                      {levelLabel.toUpperCase()} -- {score}/{maxCatScore}
                    </span>
                  </div>

                  {/* Scripture for this category */}
                  <div
                    style={{
                      borderLeft: "3px solid var(--mustard)",
                      padding: "12px 16px",
                      background: "var(--bone)",
                      marginBottom: "20px",
                      borderRadius: "0 2px 2px 0",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "15px",
                        fontStyle: "italic",
                        color: "var(--ink)",
                        lineHeight: 1.7,
                        margin: 0,
                        marginBottom: "6px",
                      }}
                    >
                      "{cat.scripture.text}"
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--mustard)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {cat.scripture.reference}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      marginBottom: "24px",
                    }}
                  >
                    {recs.map((rec, i) => (
                      <div
                        key={i}
                        style={{
                          paddingLeft: "20px",
                          borderLeft: "2px solid var(--bone-warm)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            lineHeight: 1.8,
                            color: "var(--ink)",
                            fontFamily: "var(--B)",
                            margin: 0,
                          }}
                        >
                          {rec}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={cat.articleLink.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      fontFamily: "var(--U)",
                      fontWeight: 600,
                      color: "var(--mustard)",
                      borderBottom: "1px solid rgba(212,160,23,0.35)",
                      paddingBottom: "2px",
                    }}
                  >
                    {cat.articleLink.title}
                    <ChevronRight size={14} />
                  </a>
                </div>
              );
            })}

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "40px",
              }}
              className="no-print"
            >
              <button
                onClick={() => window.print()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  background: "var(--charcoal)",
                  color: "var(--bone)",
                  border: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <Printer size={16} />
                Print Results
              </button>
              <button
                onClick={handleRestart}
                style={{
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  background: "none",
                  color: "var(--ink-muted)",
                  border: "1px solid var(--border)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                Retake Assessment
              </button>
            </div>

            {/* Next Step CTA */}
            <a
              href="/writing?category=living-well"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--charcoal)",
                color: "var(--bone)",
                borderRadius: "2px",
                padding: "28px 36px",
                textDecoration: "none",
                transition: "opacity 0.2s",
                marginTop: "32px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "6px",
                  }}
                >
                  NEXT STEP
                </div>
                <span
                  style={{
                    fontSize: "18px",
                    fontFamily: "var(--F)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  Read essays on stewardship, provision, and living well with what you have
                </span>
              </div>
              <ChevronRight
                size={20}
                style={{ opacity: 0.5, flexShrink: 0 }}
              />
            </a>
          </div>
        </section>
      )}
    </Layout>
  );
}
