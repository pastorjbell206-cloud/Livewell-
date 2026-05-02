import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface Statement {
  text: string;
  category: string;
}

interface CategoryResult {
  name: string;
  score: number;
  maxScore: number;
  level: string;
  scripture: { ref: string; text: string };
  steps: string[];
  articleLink: { title: string; href: string };
}

const CATEGORIES = [
  "Self-Awareness",
  "Boundaries",
  "Grief & Lament",
  "Forgiveness",
  "Rest & Sabbath",
];

const STATEMENTS: Statement[] = [
  // Self-Awareness
  {
    text: "I can name what I am feeling in the moment, not just afterward.",
    category: "Self-Awareness",
  },
  {
    text: "I understand which situations or people trigger strong emotional reactions in me, and I know why.",
    category: "Self-Awareness",
  },
  {
    text: "When someone asks me how I am doing, I can give an honest answer -- not a performance.",
    category: "Self-Awareness",
  },
  // Boundaries
  {
    text: "I can say no to a request without guilt consuming me for the rest of the day.",
    category: "Boundaries",
  },
  {
    text: "I protect time for rest, even when other people need things from me.",
    category: "Boundaries",
  },
  {
    text: "My sense of worth does not rise and fall with my productivity or the approval of others.",
    category: "Boundaries",
  },
  // Grief & Lament
  {
    text: "When I experience loss, I allow myself to grieve rather than rushing to find the lesson.",
    category: "Grief & Lament",
  },
  {
    text: "I can sit with sadness -- my own or someone else's -- without immediately trying to fix it.",
    category: "Grief & Lament",
  },
  {
    text: "I resist the urge to offer premature comfort or a Bible verse when someone is suffering and just needs presence.",
    category: "Grief & Lament",
  },
  // Forgiveness
  {
    text: "I have released resentment toward someone who hurt me, rather than rehearsing the offense.",
    category: "Forgiveness",
  },
  {
    text: "I do not keep a mental scoreboard of what others owe me -- in my marriage, friendships, or work.",
    category: "Forgiveness",
  },
  {
    text: "I understand that forgiving someone does not mean trusting them again, and I can hold both realities.",
    category: "Forgiveness",
  },
  // Rest & Sabbath
  {
    text: "I have a regular practice of rest that is not just collapsing from exhaustion.",
    category: "Rest & Sabbath",
  },
  {
    text: "I can put my phone down for an extended period without anxiety about what I might be missing.",
    category: "Rest & Sabbath",
  },
  {
    text: "I can say 'enough' at the end of a workday, even when the task list is not finished.",
    category: "Rest & Sabbath",
  },
];

const RATING_LABELS = [
  "",
  "Rarely true",
  "Sometimes true",
  "Often true",
  "Usually true",
  "Consistently true",
];

function getCategoryResult(name: string, score: number): CategoryResult {
  const maxScore = 15;
  const pct = score / maxScore;

  let level: string;
  if (pct >= 0.8) level = "Strong";
  else if (pct >= 0.6) level = "Developing";
  else if (pct >= 0.4) level = "Struggling";
  else level = "Critical";

  const data: Record<
    string,
    {
      scripture: { ref: string; text: string };
      steps: string[];
      articleLink: { title: string; href: string };
    }
  > = {
    "Self-Awareness": {
      scripture: {
        ref: "Psalm 139:23--24",
        text: "Search me, God, and know my heart; test me and know my anxious thoughts. See if there is any offensive way in me, and lead me in the way everlasting.",
      },
      steps: [
        "Three times today, stop and name what you are feeling in one word. Not 'fine.' Not 'busy.' An actual emotion: frustrated, grateful, anxious, content, angry, hopeful. Write it down. The act of naming is the beginning of self-awareness -- you cannot steward what you have not identified.",
        "At the end of each day this week, write two sentences: 'Today I felt _______ when _______.' Do not analyze. Do not moralize. Just record. After seven days, read them all. The patterns will teach you things about yourself that years of ignoring your inner life never could.",
        "Ask one person who knows you well: 'What emotion do you see me avoid most often?' Listen to their answer without defending yourself. Their observation may be more accurate than your self-assessment, because the things we avoid are precisely the things we cannot see.",
      ],
      articleLink: {
        title: "The Inner Life Nobody Sees",
        href: "/writing",
      },
    },
    Boundaries: {
      scripture: {
        ref: "Matthew 11:28--30",
        text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
      },
      steps: [
        "Identify one recurring request you consistently say yes to that costs you more than anyone knows. This week, say no to it. Not 'maybe later.' No. You will feel guilty. That guilt is not the voice of God. It is the voice of a pattern that has been running your life unchecked.",
        "Write down the sentence: 'I am not responsible for other people's emotions.' Put it where you will see it daily. This is not selfishness. It is the theological recognition that you are not the savior. There is one Savior, and He is not asking you to destroy yourself on behalf of everyone else's comfort.",
        "Block two hours this week that belong to you -- not to your family, not to your job, not to your church. Guard those hours the way you would guard a meeting with your boss. Your refusal to rest is not faithfulness. It is a functional denial that God can run the world without you.",
      ],
      articleLink: {
        title: "The No You Have Been Afraid to Say",
        href: "/writing",
      },
    },
    "Grief & Lament": {
      scripture: {
        ref: "Psalm 34:18",
        text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
      },
      steps: [
        "Name one loss you have never fully grieved -- a relationship, a dream, a season of life, a person. Write it down. Then tell God about it, out loud, in your own words. Not a polished prayer. A real one. Lament is not weakness. It is the form of worship the Psalms use more than any other.",
        "The next time someone you love is grieving, resist the instinct to explain, comfort, or quote Scripture. Instead, say: 'I am here. I am not going anywhere.' Then be quiet. Presence without commentary is the rarest gift in the modern church, and it is the one grieving people actually need.",
        "Read Psalm 88 -- the only Psalm that ends in darkness, with no resolution. Sit with it. Do not rush to Psalm 89. Let the darkness of 88 do its work. The Bible includes a prayer that God does not answer, which means your unanswered prayers belong in the canon of faith too.",
      ],
      articleLink: {
        title: "The Grief We Refuse to Carry",
        href: "/writing",
      },
    },
    Forgiveness: {
      scripture: {
        ref: "Colossians 3:13",
        text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
      },
      steps: [
        "Write the name of the person you resent most. Not someone who inconvenienced you. The person whose face surfaces when you are trying to sleep. Write what they did. Then write this sentence: 'Holding this costs me more than releasing it.' You are not excusing them. You are freeing yourself from the prison of rehearsal.",
        "Practice the distinction between forgiveness and trust. Forgiveness is a decision you make before God. Trust is earned over time through changed behavior. You can forgive someone completely and still not give them access to the parts of you they damaged. Both are true. Neither cancels the other.",
        "Ask God to show you where you are keeping score -- in your marriage, your friendships, your work. The mental ledger of who owes you what is exhausting to maintain, and it poisons every relationship it touches. Lay the ledger down. Not because the debts are not real. Because carrying them is killing you.",
      ],
      articleLink: {
        title: "Forgiveness Is Not What You Think It Is",
        href: "/writing",
      },
    },
    "Rest & Sabbath": {
      scripture: {
        ref: "Exodus 20:8--10",
        text: "Remember the Sabbath day by keeping it holy. Six days you shall labor and do all your work, but the seventh day is a sabbath to the Lord your God.",
      },
      steps: [
        "Choose one day this week -- or even half a day -- and declare it sabbath. No email. No work. No productivity. Do something that replenishes you: walk outside, cook a meal slowly, read a book that has nothing to do with your job. If this feels impossible, that is precisely the evidence that you need it.",
        "Put your phone in another room for two hours. Not on silent -- in another room. Notice what happens in your body when you cannot check it. That anxious pull is not a sign that you are needed. It is a sign that your nervous system has been hijacked by a device. Reclaim the quiet. God speaks in it.",
        "At the end of today, before you go to bed, say out loud: 'It is enough.' The work is not finished. The inbox is not empty. The house is not clean. And it is enough. God rested on the seventh day not because the work of creation was perfect but because it was finished for that day. You have permission to stop.",
      ],
      articleLink: {
        title: "The Rest You Keep Refusing",
        href: "/writing",
      },
    },
  };

  return {
    name,
    score,
    maxScore,
    level,
    ...data[name],
  };
}

function getOverallInterpretation(totalScore: number): {
  label: string;
  description: string;
} {
  const maxTotal = 75;
  const pct = totalScore / maxTotal;

  if (pct >= 0.8) {
    return {
      label: "Emotionally Grounded",
      description:
        "Your inner life shows the marks of sustained attention. You have developed practices and postures that keep you rooted, even when the ground shifts. This does not mean you are without struggle -- it means you have learned to bring your struggles into the light rather than burying them. The ongoing work is maintenance: continuing the disciplines that brought you here, and watching for the slow drift that happens when we assume we have arrived.",
    };
  }
  if (pct >= 0.6) {
    return {
      label: "Growing but Uneven",
      description:
        "You have real strength in some areas and significant gaps in others. This is normal and human. Most of us overdevelop the emotional skills that come naturally and neglect the ones that cost us. The invitation is not to feel guilty about the gaps but to name them honestly and start the slow work of growth. Emotional health is not a destination. It is a direction.",
    };
  }
  if (pct >= 0.4) {
    return {
      label: "Under Significant Strain",
      description:
        "Your results suggest that your inner life is carrying more weight than it was built to hold. This is not a character indictment. It is a diagnostic. Many faithful people live in this zone for years because the church rewards productivity and punishes vulnerability. But the cost compounds. The areas where you scored lowest are not weaknesses to be ashamed of. They are the places where God is inviting you to do the most important work of your life.",
    };
  }
  return {
    label: "Approaching Burnout",
    description:
      "These results point to a level of emotional and spiritual depletion that requires immediate attention -- not more effort, but a fundamental reorientation of how you are living. You cannot give what you do not have. The patterns that brought you here -- the overwork, the suppressed grief, the inability to rest, the unforgiven wounds -- are not sustainable. They will cost you your health, your relationships, or your faith. This is not a warning. It is an invitation. The God who commands rest is not disappointed in you for needing it. He built it into the fabric of creation because He knew you would need it.",
  };
}

export default function EmotionalHealth() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const allAnswered = STATEMENTS.every((_, i) => answers[i] !== undefined);

  const handleRate = (index: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    if (allAnswered) setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate results
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const categoryResults: CategoryResult[] = CATEGORIES.map((cat) => {
    const indices = STATEMENTS.map((s, i) => (s.category === cat ? i : -1)).filter(
      (i) => i >= 0
    );
    const score = indices.reduce((sum, i) => sum + (answers[i] || 0), 0);
    return getCategoryResult(cat, score);
  });
  const overall = getOverallInterpretation(totalScore);

  return (
    <Layout>
      <SEOMeta
        title="Emotional Health Assessment -- Diagnose Your Inner Life"
        description="A 15-question diagnostic for emotional and spiritual health across self-awareness, boundaries, grief, forgiveness, and rest. Honest results with practical next steps."
        keywords="emotional health assessment, spiritual health test, self-awareness, boundaries, grief, forgiveness, sabbath rest, Christian mental health"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Emotional Health Assessment",
          description:
            "A 15-question diagnostic for emotional and spiritual health. Honest results, Scripture, and practical steps for each category.",
          url: "https://www.livewellbyjamesbell.co/tools/emotional-health",
          applicationCategory: "HealthApplication",
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
            }}
          >
            Emotional Health{" "}
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
            }}
          >
            Fifteen statements. Five categories. An honest look at the inner
            life that shapes everything else.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "48px 32px", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          {!showResults ? (
            <>
              {/* Assessment Form */}
              {CATEGORIES.map((cat, ci) => {
                const catStatements = STATEMENTS.map((s, i) => ({
                  ...s,
                  index: i,
                })).filter((s) => s.category === cat);

                return (
                  <div
                    key={cat}
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      padding: "36px",
                      marginBottom: "20px",
                      borderTop:
                        ci === 0 ? "4px solid var(--mustard)" : undefined,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "var(--mustard)",
                        fontFamily: "var(--U)",
                        marginBottom: "24px",
                      }}
                    >
                      {cat.toUpperCase()}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                      }}
                    >
                      {catStatements.map((s) => (
                        <div key={s.index}>
                          <p
                            style={{
                              fontSize: "16px",
                              lineHeight: 1.7,
                              color: "var(--ink)",
                              fontFamily: "var(--B)",
                              margin: "0 0 14px",
                            }}
                          >
                            {s.text}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              flexWrap: "wrap",
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((val) => (
                              <button
                                key={val}
                                onClick={() => handleRate(s.index, val)}
                                style={{
                                  padding: "8px 14px",
                                  background:
                                    answers[s.index] === val
                                      ? "var(--mustard)"
                                      : "var(--bone)",
                                  color:
                                    answers[s.index] === val
                                      ? "var(--ink)"
                                      : "var(--ink-muted)",
                                  border: `1px solid ${
                                    answers[s.index] === val
                                      ? "var(--mustard)"
                                      : "var(--border)"
                                  }`,
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  fontFamily: "var(--U)",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {val} -- {RATING_LABELS[val]}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Submit */}
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  style={{
                    padding: "14px 40px",
                    background: allAnswered
                      ? "var(--mustard)"
                      : "var(--bone-muted)",
                    color: allAnswered ? "var(--ink)" : "var(--ink-muted)",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "var(--U)",
                    cursor: allAnswered ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                    letterSpacing: "0.05em",
                  }}
                >
                  {allAnswered
                    ? "SEE MY RESULTS"
                    : `${Object.keys(answers).length} OF 15 ANSWERED`}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <button
                onClick={handleReset}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 0",
                  background: "none",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "var(--U)",
                  color: "var(--ink)",
                  cursor: "pointer",
                  marginBottom: "24px",
                  opacity: 0.7,
                }}
              >
                <ArrowLeft size={16} />
                Take Assessment Again
              </button>

              {/* Overall Score */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "40px 36px",
                  marginBottom: "28px",
                  borderTop: "4px solid var(--mustard)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "12px",
                  }}
                >
                  YOUR EMOTIONAL HEALTH
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "16px",
                    marginBottom: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(36px, 5vw, 56px)",
                      fontWeight: 400,
                      fontFamily: "var(--F)",
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {totalScore}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--B)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    out of 75
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: 400,
                    fontFamily: "var(--F)",
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    margin: "16px 0",
                  }}
                >
                  {overall.label}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    maxWidth: "68ch",
                    margin: 0,
                  }}
                >
                  {overall.description}
                </p>

                {/* Score bar */}
                <div
                  style={{
                    marginTop: "28px",
                    background: "var(--bone)",
                    borderRadius: "4px",
                    height: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(totalScore / 75) * 100}%`,
                      height: "100%",
                      background: "var(--mustard)",
                      borderRadius: "4px",
                      transition: "width 0.6s var(--ease)",
                    }}
                  />
                </div>
              </div>

              {/* Category Breakdown */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {categoryResults.map((cat) => (
                  <div
                    key={cat.name}
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      padding: "36px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          color: "var(--mustard)",
                          fontFamily: "var(--U)",
                          margin: 0,
                        }}
                      >
                        {cat.name.toUpperCase()}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "28px",
                            fontFamily: "var(--F)",
                            fontWeight: 400,
                            color: "var(--ink)",
                            lineHeight: 1,
                          }}
                        >
                          {cat.score}
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            fontFamily: "var(--B)",
                            color: "var(--ink-muted)",
                          }}
                        >
                          / {cat.maxScore}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            fontFamily: "var(--U)",
                            color:
                              cat.level === "Strong"
                                ? "var(--mustard-deep)"
                                : cat.level === "Developing"
                                  ? "var(--ink-muted)"
                                  : "var(--ink)",
                            background:
                              cat.level === "Strong"
                                ? "rgba(212,160,23,0.12)"
                                : "var(--bone)",
                            padding: "3px 10px",
                            borderRadius: "3px",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {cat.level}
                        </span>
                      </div>
                    </div>

                    {/* Score bar */}
                    <div
                      style={{
                        background: "var(--bone)",
                        borderRadius: "4px",
                        height: "6px",
                        overflow: "hidden",
                        marginBottom: "24px",
                      }}
                    >
                      <div
                        style={{
                          width: `${(cat.score / cat.maxScore) * 100}%`,
                          height: "100%",
                          background: "var(--mustard)",
                          borderRadius: "4px",
                          transition: "width 0.6s var(--ease)",
                        }}
                      />
                    </div>

                    {/* Scripture */}
                    <div
                      style={{
                        background: "var(--bone)",
                        padding: "20px 24px",
                        borderRadius: "4px",
                        borderLeft: "3px solid var(--mustard)",
                        marginBottom: "24px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.8,
                          fontStyle: "italic",
                          color: "var(--ink)",
                          fontFamily: "var(--B)",
                          margin: "0 0 8px",
                        }}
                      >
                        "{cat.scripture.text}"
                      </p>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          fontFamily: "var(--U)",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {cat.scripture.ref}
                      </span>
                    </div>

                    {/* Practical steps */}
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "var(--ink-muted)",
                        fontFamily: "var(--U)",
                        marginBottom: "16px",
                      }}
                    >
                      PRACTICAL STEPS
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        marginBottom: "20px",
                      }}
                    >
                      {cat.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: "14px" }}>
                          <span
                            style={{
                              fontFamily: "var(--F)",
                              fontSize: "22px",
                              fontWeight: 400,
                              color: "var(--mustard)",
                              lineHeight: 1.2,
                              flexShrink: 0,
                              width: "24px",
                              textAlign: "center",
                            }}
                          >
                            {i + 1}
                          </span>
                          <p
                            style={{
                              fontSize: "15px",
                              lineHeight: 1.7,
                              color: "var(--ink)",
                              fontFamily: "var(--B)",
                              margin: 0,
                            }}
                          >
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Article link */}
                    <a
                      href={cat.articleLink.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "var(--bone)",
                        borderRadius: "6px",
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--bone-warm)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--bone)";
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            color: "var(--mustard)",
                            fontFamily: "var(--U)",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          RELATED READING
                        </span>
                        <span
                          style={{
                            fontSize: "15px",
                            fontFamily: "var(--F)",
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "var(--ink)",
                          }}
                        >
                          {cat.articleLink.title}
                        </span>
                      </div>
                      <ChevronRight
                        size={16}
                        style={{ opacity: 0.4, flexShrink: 0 }}
                      />
                    </a>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <a
                href="/writing"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--charcoal)",
                  color: "var(--bone)",
                  borderRadius: "8px",
                  padding: "24px 32px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  marginTop: "28px",
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
                    KEEP READING
                  </div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--F)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    Essays on the Inner Life That Shapes Everything Else
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
              </a>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
