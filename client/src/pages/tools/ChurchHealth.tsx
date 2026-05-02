import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Printer,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

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
  actionSteps: Record<string, string[]>;
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
    name: "Worship & Teaching",
    slug: "worship",
    description:
      "Whether the gathered life of your church is forming people or merely entertaining them.",
    questions: [
      {
        id: 1,
        text: "Our worship services consistently reflect theological depth -- not just emotional experience, but genuine encounter with the God revealed in Scripture.",
      },
      {
        id: 2,
        text: "The congregation is engaged during teaching -- not passive consumers, but people being visibly shaped by the Word.",
      },
      {
        id: 3,
        text: "Scripture is central to every element of our gathered worship -- not just the sermon, but the prayers, the songs, the liturgy of the whole hour.",
      },
    ],
    actionSteps: {
      low: [
        "Audit your last month of sermons. Were they built from the text outward, or from a topic backward into proof texts? The difference is the difference between exposition and decoration. If the text could be removed and the sermon would still stand, Scripture is not central -- it is ornamental.",
        "Ask five congregants this question: 'What has our church taught you about God in the last six months that you did not already know?' If they cannot answer, your teaching is confirming assumptions, not forming believers. Confirmation is comfortable. Formation is costly. Formation is the task.",
        "Evaluate whether your worship leader understands theology or only understands music. The songs a church sings become the theology a church believes. If the lyrics would embarrass a serious reading of the Psalms, the songs must change -- regardless of how the congregation feels about the melody.",
      ],
      mid: [
        "You have a foundation of theological seriousness. Build on it by introducing one element per month that stretches your congregation. A creed read aloud. A lament Psalm sung together. A two-minute silence after the sermon. Formation happens in practices, not just information.",
        "Train your worship team in the theology of what they are leading. A worship leader who cannot explain why a hymn was chosen does not understand the role. They are not performers. They are pastoral theologians with instruments.",
        "Consider whether your teaching is consistently accessible without being shallow. The goal is not complexity for its own sake. The goal is a congregation that can read Romans without panic and Leviticus without boredom.",
      ],
      high: [
        "Your worship and teaching are forming your people. This is the most important thing a church does, and you are doing it well. Protect it fiercely -- especially from the pressure to entertain.",
        "Develop a preaching team or teaching pipeline. A church that depends on one voice is fragile. A church with multiple faithful teachers is resilient.",
        "Invite honest feedback from your most theologically serious members and your newest believers simultaneously. The worship that serves both is the worship that is truly healthy.",
      ],
    },
    articleLink: {
      title: "Read more on worship and teaching",
      href: "/writing?category=pastoral-ministry",
    },
  },
  {
    name: "Community & Discipleship",
    slug: "community",
    description:
      "The difference between a church that has members and a church that makes disciples.",
    questions: [
      {
        id: 4,
        text: "Our small groups or discipleship structures produce genuine spiritual growth -- not just social connection, though that matters too.",
      },
      {
        id: 5,
        text: "New believers are actively integrated into the life of the church within their first six months -- not left to find their own way.",
      },
      {
        id: 6,
        text: "Intentional mentoring relationships exist across generational lines -- older believers investing in younger ones, not just age-segregated programming.",
      },
    ],
    actionSteps: {
      low: [
        "Map every new believer or new member from the past twelve months. Where are they now? If more than half have drifted to the margins, you do not have a retention problem. You have an integration failure. The front door is open. The hallway leads nowhere.",
        "Kill one program this quarter and replace it with a structured mentoring relationship. Pair a mature believer with a new one. Give them a shared text to read. Meet monthly. The early church did not grow through programming. It grew through proximity between the formed and the forming.",
        "Evaluate whether your small groups have become social clubs or discipleship structures. The distinction: a social club meets to enjoy each other. A discipleship group meets to become more like Christ together. Both involve relationship. Only one involves transformation.",
      ],
      mid: [
        "Your community structures exist but may lack intentional next steps. Every group in your church should be able to answer the question: 'What are we becoming together?' If they cannot, add that question to the leader training.",
        "Create a written pathway for new believers that includes specific relationships, not just classes. A six-week class produces information. A six-month mentoring relationship produces formation.",
        "Identify the generational gap in your discipleship. If no one over fifty is investing in anyone under thirty, you have a structural problem that will become an existential one within a decade.",
      ],
      high: [
        "Your community and discipleship structures are producing fruit. This is the heartbeat of a healthy church. Share your model with other pastors -- many are desperate for a discipleship framework that actually works.",
        "Continue to evaluate whether community has become comfortable rather than formational. Healthy groups must periodically be disrupted -- by mission, by adding new members, by taking on a shared challenge.",
        "Invest in your small group leaders as seriously as you invest in your sermon. They are your primary discipleship delivery system.",
      ],
    },
    articleLink: {
      title: "Read more on discipleship and community",
      href: "/writing?category=pastoral-ministry",
    },
  },
  {
    name: "Outreach & Mission",
    slug: "outreach",
    description:
      "Whether your church exists for itself or for the neighborhood it was planted to serve.",
    questions: [
      {
        id: 7,
        text: "Our church has meaningful, sustained engagement with our local community -- not just annual events, but ongoing presence and relationship.",
      },
      {
        id: 8,
        text: "Global mission awareness shapes our budget, our prayers, and our congregational imagination -- not as a line item, but as an identity.",
      },
      {
        id: 9,
        text: "There is a culture of personal evangelism in our church -- people naturally share their faith, not because of a program, but because they have something worth sharing.",
      },
    ],
    actionSteps: {
      low: [
        "Walk a one-mile radius around your church building this week. How many people in that radius know your church exists? How many would say it has made their life better? If the answer to both is 'few,' your church has become a private club with a steeple. Reverse that. Pick one neighborhood need and meet it. Consistently. For a year.",
        "Examine your budget. The percentage allocated to outreach and mission reveals your actual priorities -- not your stated ones. If less than ten percent of your budget serves people outside your walls, the budget is a confession.",
        "Stop asking 'How do we get people to come to church?' and start asking 'How do we bring the church to people?' The first question assumes the building is the center. The second assumes the Gospel is.",
      ],
      mid: [
        "You have outreach activity but it may lack strategic focus. Pick one local mission and one global mission and invest deeply rather than spreading thin across a dozen causes. Depth produces partnership. Breadth produces tourism.",
        "Train your congregation in the theology of mission -- not evangelism techniques, but the conviction that God is a sending God and every believer is sent. When the theology is clear, the practice follows naturally.",
        "Evaluate whether your outreach produces dependence or dignity. The best mission work empowers. The worst creates a permanent need for your continued involvement. Aim for the first.",
      ],
      high: [
        "Your church has a missional identity. This is rare and powerful. Continue to align your resources with your convictions.",
        "Develop mission partnerships that are mutual rather than transactional. The best global mission work involves learning from the global church, not just serving it.",
        "Tell the stories of mission from the pulpit regularly. A congregation that hears what God is doing beyond its walls develops a holy restlessness that protects against institutional inwardness.",
      ],
    },
    articleLink: {
      title: "Read more on mission and outreach",
      href: "/writing?category=pastoral-ministry",
    },
  },
  {
    name: "Leadership Development",
    slug: "leadership",
    description:
      "Whether your church is building leaders or depending on one.",
    questions: [
      {
        id: 10,
        text: "We have a clear leadership pipeline -- people are being identified, trained, and deployed into ministry roles, not just recruited to fill gaps.",
      },
      {
        id: 11,
        text: "Delegation in our church is real -- leaders are given genuine authority, not just tasks, and are trusted to lead within their area.",
      },
      {
        id: 12,
        text: "Emerging leaders feel empowered and invested in -- they see a future for themselves in this church's mission, not just a slot to fill.",
      },
    ],
    actionSteps: {
      low: [
        "If leadership in your church depends on the pastor and two or three reliable volunteers, you do not have a leadership structure. You have a dependency. Write down the names of five people under forty in your congregation who show leadership capacity. Schedule coffee with each of them this month. Ask them what they see in the church and what they would change. Then listen.",
        "Distinguish between delegation and dumping. Delegation gives authority with a task. Dumping gives a task without support. If your volunteers feel used rather than developed, you are dumping. The fix is not more gratitude. It is more investment.",
        "Create a one-page leadership development plan. Not a hundred-page manual. One page: who you are developing, what you are developing in them, and when they will be ready to lead. If you cannot fit it on one page, you are overcomplicating what is fundamentally a relational process.",
      ],
      mid: [
        "You have some leadership development but it may lack intentional progression. Add clear stages: observe, assist, lead with supervision, lead independently. Each stage should have a timeframe and a conversation.",
        "Ask your current leaders: 'Do you feel empowered or managed?' Their answer will reveal whether your delegation is genuine or performative. Empowerment means they can make decisions you would not make. If that terrifies you, the problem is not their readiness. It is your control.",
        "Invest in your leaders' spiritual formation, not just their competence. A skilled leader without character will eventually damage your church. A leader with character and developing skills will strengthen it.",
      ],
      high: [
        "Your leadership pipeline is functioning. This means your church can survive your departure, which is the ultimate test of pastoral leadership development.",
        "Continue to push authority downward. The healthiest churches are led by many, not by one. Your role is to set the vision and develop the people who execute it.",
        "Mentor other pastors in leadership development. This skill set is the most commonly missing piece in pastoral training, and you have something to offer.",
      ],
    },
    articleLink: {
      title: "Read more on church leadership",
      href: "/writing?category=pastoral-ministry",
    },
  },
  {
    name: "Financial Stewardship",
    slug: "financial",
    description:
      "Whether your church handles money with the transparency and intentionality the Gospel demands.",
    questions: [
      {
        id: 13,
        text: "Our financial practices are transparent -- the congregation knows how money is received, allocated, and spent, without having to ask.",
      },
      {
        id: 14,
        text: "There is a genuine culture of generosity in our church -- people give sacrificially, not reluctantly, and giving is taught as a spiritual discipline, not a funding mechanism.",
      },
      {
        id: 15,
        text: "Our budget reflects our mission -- the largest expenditures align with our stated priorities, not just our inherited obligations.",
      },
    ],
    actionSteps: {
      low: [
        "Publish your full budget to the congregation this month. Not a summary. The full budget. If transparency feels risky, ask yourself what the secrecy is protecting. Financial opacity in the church breeds suspicion, and suspicion is the enemy of trust. Trust is the currency of pastoral authority.",
        "Teach a four-week series on money, generosity, and stewardship. Not as a stewardship campaign. Not as a fundraising push. As theology. The Bible speaks about money more than almost any other subject, and most churches reduce it to an annual guilt trip. Teach it as formation.",
        "Audit your budget against your mission statement. If your mission says 'reaching the lost' and your budget says 'maintaining the building,' the budget is telling the truth your mission statement is not.",
      ],
      mid: [
        "You have decent financial practices but there may be room for greater alignment between budget and mission. Review the top five line items. Do they serve the mission you preach or the institution you inherited?",
        "Develop a generosity culture that goes beyond tithing. Tithing is a starting point, not a ceiling. Teach proportional giving, sacrificial giving, and spontaneous giving as distinct spiritual practices.",
        "Create a financial accountability structure that includes non-staff members. Pastors who control the finances without independent oversight are not being wise. They are being unaccountable. Healthy governance protects the pastor as much as the congregation.",
      ],
      high: [
        "Your financial stewardship is healthy. This builds congregational trust and frees you to lead without the constant anxiety of hidden financial problems.",
        "Model financial generosity as a church. Give away more than feels comfortable. The church that hoards its resources is the church that has forgotten who owns them.",
        "Share your financial practices with other churches. Healthy financial models are desperately needed, and your transparency can set a standard.",
      ],
    },
    articleLink: {
      title: "Read more on stewardship and generosity",
      href: "/writing?category=pastoral-ministry",
    },
  },
  {
    name: "Congregational Care",
    slug: "care",
    description:
      "Whether people in your church are genuinely cared for or simply counted.",
    questions: [
      {
        id: 16,
        text: "Pastoral care reaches beyond the inner circle -- people on the margins of our congregation are noticed, visited, and served, not just the visible members.",
      },
      {
        id: 17,
        text: "When crisis strikes a member -- hospitalization, death, job loss, divorce -- our church responds within 48 hours with tangible support, not just prayer promises.",
      },
      {
        id: 18,
        text: "There is a functional care network in our church -- the pastor is not the only person providing pastoral care, and lay caregivers are trained and deployed.",
      },
    ],
    actionSteps: {
      low: [
        "List every member who has experienced a significant life event in the past three months -- hospitalization, bereavement, job loss, new baby, divorce. Now mark which ones received a personal contact from the church within 48 hours. The unmarked names are the measure of your care gap. Close it.",
        "Train five lay caregivers this quarter. Give them a simple framework: show up, listen, pray, follow up. Pastoral care does not require ordination. It requires presence. And presence can be multiplied if you are willing to share the work.",
        "Examine who your church notices and who it ignores. If care flows primarily to donors, leaders, and the socially connected, your care system has the same bias as every other institution. The Gospel moves toward the margins. So should your church.",
      ],
      mid: [
        "You have care structures but they may depend too heavily on the pastor. The goal is a care culture, not a care person. When the congregation itself cares for its members, the pastor is free to lead rather than merely respond.",
        "Develop a crisis response protocol -- who is called, what is provided, how follow-up is structured. Ad hoc care is better than nothing. Systematic care is better than ad hoc.",
        "Add a quarterly check on the margins. Who has not been seen in church for a month? Who came three times and then disappeared? Who is always present but never connected? These are the people your care system is missing.",
      ],
      high: [
        "Your congregational care is functioning well. People feel known. This is the most tangible evidence of the Gospel in a local church.",
        "Continue to expand the care network. Every new caregiver increases your church's capacity to absorb crisis without breaking.",
        "Tell care stories to the congregation -- with permission. When people hear how others were served, they begin to see themselves as caregivers. A culture of care is built on visible examples.",
      ],
    },
    articleLink: {
      title: "Read more on pastoral care",
      href: "/writing?category=pastoral-ministry",
    },
  },
];

/* ── Scoring helpers ──────────────────────────────────────────── */

function getCatScore(
  answers: Record<number, number>,
  cat: Category
): number {
  return cat.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
}

function getScoreLevel(score: number, maxScore: number): string {
  const pct = score / maxScore;
  if (pct >= 0.8) return "high";
  if (pct >= 0.6) return "mid";
  return "low";
}

function getLevelLabel(level: string): string {
  if (level === "high") return "Strength";
  if (level === "mid") return "Developing";
  return "Needs Attention";
}

function getLevelColor(level: string): string {
  if (level === "high") return "#2D6A4F";
  if (level === "mid") return "var(--mustard)";
  return "#C0392B";
}

function getOverallHealth(score: number): {
  label: string;
  color: string;
  description: string;
} {
  const maxTotal = 90; // 18 questions * 5
  const pct = score / maxTotal;
  if (pct >= 0.8)
    return {
      label: "Thriving Church",
      color: "#2D6A4F",
      description:
        "Your church shows health across multiple dimensions. This is not a reason for complacency -- it is a foundation for ambitious mission. Healthy churches do not coast. They take risks that unhealthy churches cannot afford. The question before you is not 'How do we maintain this?' It is 'What is God calling us to do with the health He has given us?'",
    };
  if (pct >= 0.6)
    return {
      label: "Growing Church",
      color: "var(--mustard)",
      description:
        "Your church has genuine strengths and identifiable growth areas. This is the profile of most honest churches -- some things working well, others requiring deliberate attention. The danger is addressing the weak areas with programs rather than with prayer, honest diagnosis, and sustained leadership. Programs maintain institutions. Prayer and honest leadership transform them.",
    };
  if (pct >= 0.4)
    return {
      label: "Church Under Strain",
      color: "#E07A2F",
      description:
        "Multiple areas of your church's life need focused attention. This is not a death sentence -- many churches have been revitalized from this position. But revitalization requires honesty about what is not working, willingness to stop doing what is familiar but fruitless, and the courage to invest in what matters most. Start with the two weakest areas. Give them eighteen months of deliberate focus. Measure the change.",
    };
  return {
    label: "Church in Crisis",
    color: "#C0392B",
    description:
      "Your scores indicate a church that is struggling across most dimensions of health. This is painful to see on paper, but naming it is the first step toward change. The churches that recover from crisis are the ones whose leaders refuse to pretend. Seek outside help -- a denominational consultant, a church health organization, a trusted senior pastor who has led through similar seasons. You do not have to figure this out alone.",
  };
}

/* ── Component ─────────────────────────────────────────────────── */

export default function ChurchHealth() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const category = CATEGORIES[currentCategory];
  const totalQuestions = 18;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const canProceed = category.questions.every(
    (q) => answers[q.id] !== undefined
  );
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

  const getCategoryScore = (cat: Category) => getCatScore(answers, cat);

  const totalScore = CATEGORIES.reduce(
    (sum, cat) => sum + getCategoryScore(cat),
    0
  );

  const overall = getOverallHealth(totalScore);

  // Sort categories by score to identify strengths and concerns
  const sortedCategories = CATEGORIES.map((cat) => ({
    cat,
    score: getCategoryScore(cat),
    level: getScoreLevel(getCategoryScore(cat), 15),
  })).sort((a, b) => b.score - a.score);

  const strengths = sortedCategories
    .filter((c) => c.level === "high")
    .slice(0, 2);
  const concerns = sortedCategories
    .filter((c) => c.level === "low" || c.level === "mid")
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return (
    <Layout>
      <SEOMeta
        title="Church Health Check -- Assess Your Church's Vitality"
        description="An 18-question diagnostic for pastors to assess church health across worship, community, outreach, leadership, finances, and congregational care."
        keywords="church health assessment, church diagnostic, church health check, pastoral leadership, church growth, church vitality, church evaluation"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Church Health Check",
          description:
            "An 18-question diagnostic for pastors to assess church health across six dimensions of congregational vitality.",
          url: "https://www.livewellbyjamesbell.co/tools/church-health",
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
            PASTORAL MINISTRY TOOL
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
            Church Health{" "}
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
            Eighteen statements across six dimensions of church vitality. An
            honest diagnostic for the pastor who wants to know what is working
            and what is not.
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
                        : cat.questions.every(
                              (q) => answers[q.id] !== undefined
                            )
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
        <section
          style={{ padding: "48px 32px 80px", background: "var(--bone)" }}
        >
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
                    background: "var(--card)",
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
                              e.currentTarget.style.borderColor =
                                "var(--mustard)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor =
                                "var(--border)";
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
                  background: canProceed
                    ? "var(--mustard)"
                    : "var(--bone-muted)",
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
            <ToolActions toolName="Church Health Check" />

            {/* Overall Score */}
            <div
              style={{
                background: "var(--card)",
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
                YOUR CHURCH HEALTH ASSESSMENT
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
                  / 90
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

            {/* Category Breakdown Bars */}
            <div
              style={{
                background: "var(--card)",
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
                  const barColor = getLevelColor(level);
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
                            transition:
                              "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths & Concerns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  strengths.length > 0 && concerns.length > 0
                    ? "1fr 1fr"
                    : "1fr",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              {/* Strengths */}
              {strengths.length > 0 && (
                <div
                  style={{
                    background: "var(--card)",
                    borderRadius: "2px",
                    padding: "32px",
                    border: "1px solid var(--border)",
                    borderTop: "4px solid #2D6A4F",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <TrendingUp
                      size={18}
                      style={{ color: "#2D6A4F", flexShrink: 0 }}
                    />
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#2D6A4F",
                        fontFamily: "var(--U)",
                        margin: 0,
                      }}
                    >
                      CELEBRATE
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    {strengths.map((s) => (
                      <div
                        key={s.cat.slug}
                        style={{
                          padding: "14px 18px",
                          background: "rgba(45,106,79,0.06)",
                          borderRadius: "2px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "17px",
                            fontWeight: 500,
                            color: "var(--ink)",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          {s.cat.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--U)",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#2D6A4F",
                          }}
                        >
                          {s.score}/15
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concerns */}
              {concerns.length > 0 && (
                <div
                  style={{
                    background: "var(--card)",
                    borderRadius: "2px",
                    padding: "32px",
                    border: "1px solid var(--border)",
                    borderTop: "4px solid #C0392B",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <AlertCircle
                      size={18}
                      style={{ color: "#C0392B", flexShrink: 0 }}
                    />
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#C0392B",
                        fontFamily: "var(--U)",
                        margin: 0,
                      }}
                    >
                      NEEDS ATTENTION
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    {concerns.map((c) => (
                      <div
                        key={c.cat.slug}
                        style={{
                          padding: "14px 18px",
                          background: "rgba(192,57,43,0.05)",
                          borderRadius: "2px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "17px",
                            fontWeight: 500,
                            color: "var(--ink)",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          {c.cat.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--U)",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: getLevelColor(c.level),
                          }}
                        >
                          {c.score}/15
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Per-Category Detailed Results */}
            {CATEGORIES.map((cat) => {
              const score = getCategoryScore(cat);
              const maxCatScore = 15;
              const level = getScoreLevel(score, maxCatScore);
              const levelLabel = getLevelLabel(level);
              const levelColor = getLevelColor(level);
              const recs = cat.actionSteps[level];

              return (
                <div
                  key={cat.slug}
                  style={{
                    background: "var(--card)",
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

                  {/* Action Steps */}
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
                    RECOMMENDED ACTIONS
                  </h4>
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

            {/* Next Step CTAs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "32px",
              }}
            >
              <a
                href="/pastors"
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
                    PASTORS CONNECTION NETWORK
                  </div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--F)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    Connect with pastors building healthy churches together
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
              </a>
              <a
                href="/writing?category=pastoral-ministry"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--card)",
                  color: "var(--ink)",
                  borderRadius: "2px",
                  padding: "28px 36px",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--mustard)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
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
                    Essays on pastoral ministry, church leadership, and
                    congregational health
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
              </a>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
