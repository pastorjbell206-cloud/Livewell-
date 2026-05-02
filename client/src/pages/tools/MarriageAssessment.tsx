import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, Printer } from "lucide-react";
import { EmailResults } from "@/components/EmailResults";

/* ── Types ─────────────────────────────────────────────────────── */

interface Question {
  id: number;
  text: string;
}

interface Category {
  name: string;
  slug: string;
  description: string;
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
    name: "Communication",
    slug: "communication",
    description:
      "How well you and your spouse actually hear each other -- not just the words, but what lives beneath them.",
    questions: [
      {
        id: 1,
        text: "When I share something that matters to me, my spouse listens without immediately trying to fix it.",
      },
      {
        id: 2,
        text: "We can disagree about something important without it becoming an attack on the other person's character.",
      },
      {
        id: 3,
        text: "I regularly share my fears, hopes, and emotional state with my spouse -- not just logistics and schedules.",
      },
    ],
    recommendations: {
      low: [
        "Set aside 15 minutes each evening with no screens. Not to solve anything -- just to ask, 'What was the hardest part of your day?' and listen without responding.",
        "When conflict arises, practice the phrase: 'Help me understand what you mean by that.' It slows the conversation enough to prevent the damage speed causes.",
        "Consider whether you have substituted information exchange for actual communication. Knowing your spouse's schedule is not the same as knowing their heart.",
      ],
      mid: [
        "You have a foundation. Build on it by moving past safe topics. Ask each other: 'What are you afraid to tell me?' -- and mean it.",
        "Notice when you interrupt. Not to correct yourself publicly, but to recognize the habit. Interruption communicates that your response matters more than their sentence.",
        "Read a book together on communication in marriage -- not as homework, but as shared language. Gary Chapman's work on love languages remains a useful starting point.",
      ],
      high: [
        "Protect what you have built. The couples who communicate well often stop noticing the effort it takes. Keep being intentional.",
        "Use your communication strength to mentor another couple. What comes naturally to you may save someone else's marriage.",
        "Go deeper. Move from 'we talk well' to 'we talk about the things that terrify us.' That is the difference between a good marriage and a great one.",
      ],
    },
    articleLink: {
      title: "Read more on marriage and communication",
      href: "/writing?category=marriage",
    },
  },
  {
    name: "Intimacy & Connection",
    slug: "intimacy",
    description:
      "The distance between two people who share a house and two people who share a life.",
    questions: [
      {
        id: 4,
        text: "We regularly spend quality time together that is not centered on children, work, or obligations.",
      },
      {
        id: 5,
        text: "Physical affection -- not just sex, but touch, closeness, presence -- is a normal part of our daily life.",
      },
      {
        id: 6,
        text: "I feel emotionally close to my spouse, not just physically present in the same space.",
      },
    ],
    recommendations: {
      low: [
        "Start with proximity before expecting intimacy. Sit on the same couch. Walk to the mailbox together. Closeness is rebuilt in small distances before large ones.",
        "Name the distance honestly. 'I feel far from you' is not an accusation -- it is an invitation. Most spouses already sense the gap. Naming it gives permission to close it.",
        "If physical intimacy has become transactional or absent, consider that the problem is rarely physical. Emotional disconnection shows up in the bedroom because the bedroom is where pretending gets hardest.",
      ],
      mid: [
        "Schedule a weekly date that requires no planning beyond showing up. The couples who wait for the perfect evening never have one.",
        "Reintroduce non-sexual touch. A hand on the shoulder. Sitting close enough that your knees touch. These small gestures rebuild the neural pathways of connection.",
        "Ask your spouse: 'When did you last feel truly close to me?' Their answer will tell you more than any book.",
      ],
      high: [
        "Your connection is a gift. Do not assume it will maintain itself. Intimacy is not a destination you arrive at -- it is a discipline you practice.",
        "Use your closeness as the foundation for harder conversations. Couples who are truly connected can say the hardest things because the relationship can bear the weight.",
        "Pray together. Not performatively. Not long. Just honest words before God, side by side. There is an intimacy in shared vulnerability before God that nothing else replicates.",
      ],
    },
    articleLink: {
      title: "Read more on marriage and intimacy",
      href: "/writing?category=marriage",
    },
  },
  {
    name: "Trust & Security",
    slug: "trust",
    description:
      "Whether your marriage is a place where it is safe to be known -- fully, without editing.",
    questions: [
      {
        id: 7,
        text: "We are transparent with each other about finances -- no hidden accounts, no secret spending, no financial decisions made alone.",
      },
      {
        id: 8,
        text: "I have complete confidence in my spouse's faithfulness -- emotionally and physically.",
      },
      {
        id: 9,
        text: "I can be vulnerable with my spouse -- admitting failure, weakness, or fear -- without worrying it will be used against me later.",
      },
    ],
    recommendations: {
      low: [
        "Trust, once broken, is not rebuilt by promises. It is rebuilt by consistent, small, verifiable actions over time. Do not demand trust. Earn it.",
        "If financial secrecy exists, open every account together this week. Not as punishment -- as a declaration that this marriage has no hidden rooms.",
        "If vulnerability feels unsafe, ask yourself whether your spouse has actually weaponized your honesty, or whether you are protecting yourself from a wound that predates this marriage. Both are real. Both need attention.",
      ],
      mid: [
        "Trust at this level means the foundation is present but not yet load-bearing. Test it gently. Share something you have been holding back and see what happens.",
        "Have a monthly financial conversation -- not about budgets, but about fears. 'What keeps you up at night about money?' That question builds more trust than any spreadsheet.",
        "Examine whether you are trusting your spouse or merely not distrusting them. Those are not the same thing.",
      ],
      high: [
        "You have built something rare. Guard it fiercely. Trust is destroyed in moments and rebuilt in years.",
        "Use your trust to go to the hard places together. Couples who trust deeply can face external crisis without the marriage becoming another casualty.",
        "Model this for your children if you have them. They are learning what safety looks like by watching you.",
      ],
    },
    articleLink: {
      title: "Read more on trust and faithfulness",
      href: "/writing?category=marriage",
    },
  },
  {
    name: "Shared Vision",
    slug: "vision",
    description:
      "Whether you are building the same life or merely living parallel ones under the same roof.",
    questions: [
      {
        id: 10,
        text: "My spouse and I share a clear, discussed vision for our future -- not just assumptions about where we are headed.",
      },
      {
        id: 11,
        text: "We are aligned on how to raise our children (or how we think about family if we do not have children yet).",
      },
      {
        id: 12,
        text: "Our spiritual lives are shared -- we pray, attend church, or discuss faith together, not just side by side.",
      },
    ],
    recommendations: {
      low: [
        "Sit down this week and answer one question together: 'What do we want our life to look like in five years?' If your answers surprise each other, that is the most important data you have received in months.",
        "If parenting disagreements dominate your marriage, recognize that most parenting conflicts are actually value conflicts. You are not arguing about bedtime. You are arguing about what kind of adults you are trying to raise.",
        "Begin praying together, even if it feels awkward. Start with one sentence each. 'God, help us.' That is enough. Shared spiritual life does not require eloquence. It requires willingness.",
      ],
      mid: [
        "You have partial alignment. Identify the one area where your visions diverge most sharply and give it dedicated conversation -- not argument, conversation.",
        "Write a family mission statement together. Not corporate jargon. Three sentences about what your family exists to do. Put it where you can see it.",
        "If your spiritual lives run on parallel tracks, find one practice you can share. A devotional, a prayer walk, a Sunday conversation about the sermon. Shared faith is built in shared habits.",
      ],
      high: [
        "Shared vision is your greatest strategic asset. Revisit it annually. The vision that served you at thirty may need refinement at forty.",
        "Bring your shared vision to bear on major decisions. Job changes, moves, financial commitments -- run them through the filter of what you have said you are building together.",
        "Share your process with younger couples. How you built shared vision is as valuable as the vision itself.",
      ],
    },
    articleLink: {
      title: "Read more on building a life together",
      href: "/writing?category=marriage",
    },
  },
  {
    name: "Conflict Resolution",
    slug: "conflict",
    description:
      "Not whether you fight -- every marriage does. Whether you fight in a way that leaves the marriage stronger or weaker.",
    questions: [
      {
        id: 13,
        text: "When we argue, we fight about the issue at hand -- not every grievance from the last ten years.",
      },
      {
        id: 14,
        text: "After a serious conflict, we repair -- we come back together, acknowledge what happened, and reconnect.",
      },
      {
        id: 15,
        text: "Forgiveness in our marriage is real -- not just words spoken to end the tension, but genuine release of the offense.",
      },
    ],
    recommendations: {
      low: [
        "If every fight becomes a trial where past offenses are introduced as evidence, you need a reset. Agree together: 'Forgiven means finished. We do not reopen closed cases.'",
        "Learn to take a twenty-minute break when conversations escalate. Not to avoid the conflict, but because your nervous system needs time to leave fight-or-flight mode before you can think clearly.",
        "If you cannot resolve conflict without professional help, get professional help. That is not weakness. It is the most courageous thing a married person can do.",
      ],
      mid: [
        "You manage conflict but may not be resolving it. There is a difference. Managed conflict stays quiet. Resolved conflict stays gone.",
        "Practice the repair conversation: 'Here is what I did. Here is why it was wrong. Here is what I will do differently.' No qualifications. No 'but you also...' Just ownership.",
        "Examine your forgiveness. If you have said 'I forgive you' but still bring it up, the forgiveness was incomplete. That is human. But it needs to be finished.",
      ],
      high: [
        "Healthy conflict resolution is one of the rarest skills in any relationship. You have it. Do not take it for granted.",
        "Teach your children how to fight well by letting them see you repair. They do not need to see the argument, but they do need to see the reconciliation.",
        "Remember that conflict resolution is not conflict avoidance. Keep having the hard conversations. Your ability to resolve well gives you permission to engage honestly.",
      ],
    },
    articleLink: {
      title: "Read more on conflict and forgiveness",
      href: "/writing?category=marriage",
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
  const pct = score / 75;
  if (pct >= 0.8)
    return {
      label: "Strong",
      color: "#2D6A4F",
      description:
        "Your marriage shows real strength across multiple areas. This does not mean perfection -- it means you have built habits of love that are bearing fruit. Protect them. Deepen them. The greatest threat to a strong marriage is the assumption that it will stay strong without continued effort.",
    };
  if (pct >= 0.6)
    return {
      label: "Growing",
      color: "var(--mustard)",
      description:
        "Your marriage has genuine strengths and identifiable growth areas. This is not a crisis -- it is an opportunity. Most marriages live here. The question is whether you will stay here or do the work to move toward something deeper. The fact that you took this assessment suggests you are ready for the work.",
    };
  if (pct >= 0.4)
    return {
      label: "Needs Attention",
      color: "#E07A2F",
      description:
        "Several areas of your marriage are under strain. This is not a verdict -- it is a diagnosis. And a diagnosis is a gift, because it tells you where to focus. Do not try to fix everything at once. Pick the category with the lowest score and start there. One area at a time. One conversation at a time.",
    };
  return {
    label: "In Crisis",
    color: "#C0392B",
    description:
      "Your scores indicate significant distress in your marriage. Hear this clearly: this assessment is not the final word. Many marriages that score here have been rebuilt into something stronger than what existed before. But it will require help -- professional help, not just good intentions. Contact a licensed marriage counselor this week. Not next month. This week.",
  };
}

/* ── Component ─────────────────────────────────────────────────── */

export default function MarriageAssessment() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const category = CATEGORIES[currentCategory];
  const totalQuestions = 15;
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
        title="Marriage Health Assessment -- Identify Strengths and Growth Areas"
        description="A 15-question diagnostic to help couples identify strengths and growth areas across communication, intimacy, trust, shared vision, and conflict resolution."
        keywords="marriage assessment, marriage health, marriage diagnostic, relationship quiz, marriage counseling, marriage strength"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marriage Health Assessment",
          description:
            "A 15-question diagnostic to help couples identify strengths and growth areas in their marriage.",
          url: "https://www.livewellbyjamesbell.co/tools/marriage-assessment",
          applicationCategory: "LifestyleApplication",
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
            Marriage Health{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              Assessment
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
            Fifteen statements across five areas of marriage. Rate each honestly.
            This is not a test with right answers -- it is a diagnostic that
            helps you see where you are strong and where the work remains.
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
                }}
              >
                {category.description}
              </p>
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
            <ToolActions toolName="Marriage Health Assessment" />

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
                  / 75
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
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                      fontFamily: "var(--B)",
                      marginBottom: "24px",
                    }}
                  >
                    {cat.description}
                  </p>

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

            {/* Email Results */}
            <EmailResults
              toolName="Marriage Health Assessment"
              resultsSummary={
                `Marriage Health Assessment Results\n\nOverall: ${totalScore}/75 (${overall.label})\n\n` +
                CATEGORIES.map(
                  (cat) =>
                    `${cat.name}: ${getCategoryScore(cat)}/15 (${getScoreLevel(getCategoryScore(cat), 15) === "high" ? "Strength" : getScoreLevel(getCategoryScore(cat), 15) === "mid" ? "Growing" : "Needs Attention"})`
                ).join("\n")
              }
            />

            {/* Next Step CTA */}
            <a
              href="/writing?category=marriage"
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
                  Read essays on marriage, conflict, and the hard work of loving well
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
