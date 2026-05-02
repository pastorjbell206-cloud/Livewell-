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

interface NextStep {
  text: string;
}

interface Category {
  name: string;
  slug: string;
  description: string;
  questions: Question[];
  interpretation: Record<string, string>;
  nextSteps: Record<string, NextStep[]>;
  relatedLink: { title: string; href: string };
}

/* ── Data ──────────────────────────────────────────────────────── */

const RATING_LABELS = [
  "Not at all",
  "Rarely",
  "Sometimes",
  "Often",
  "Consistently",
];

const CATEGORIES: Category[] = [
  {
    name: "Spiritual Health",
    slug: "spiritual",
    description:
      "The life beneath the life. Not whether you attend church, but whether your soul is attended to.",
    questions: [
      {
        id: 1,
        text: "I have a consistent, personal prayer life -- not performance for others, but an honest conversation with God that happens whether anyone sees it or not.",
      },
      {
        id: 2,
        text: "I engage with Scripture regularly in a way that shapes how I think and live, not as a checkbox but as a source of genuine sustenance.",
      },
      {
        id: 3,
        text: "I am known in a Christian community -- not just attending, but belonging. People there would notice if I disappeared for a month.",
      },
    ],
    interpretation: {
      low: "Your spiritual life is either absent or running on fumes. This is not a moral failing. It is a diagnostic. Many people who love God have allowed the practices that once sustained them to erode under the weight of busyness, disappointment, or doubt. The question is not whether you are a bad Christian. The question is whether you are starving and calling it fine.",
      mid: "You have some spiritual rhythms, but they are inconsistent or shallow. There is foundation here -- you have not abandoned the life of faith. But the distance between where you are and where you could be is real, and it shows up in the rest of your life in ways you may not have connected.",
      high: "Your spiritual life shows the marks of sustained attention. You are doing the work that most people avoid. Protect it. The greatest threat to a mature spiritual life is the assumption that it will maintain itself. It will not. Every discipline requires continued intention.",
    },
    nextSteps: {
      low: [
        { text: "Begin with five minutes of prayer each morning. Not eloquent prayer. Honest prayer. 'God, I am here. Help me today.' That is enough to begin." },
        { text: "Read one Psalm each day for the next thirty days. Start with Psalm 1. The Psalms are the prayer book of Scripture -- they give you words when you have none of your own." },
      ],
      mid: [
        { text: "Move your prayer life from reactive to rhythmic. Set three fixed times each day -- morning, midday, evening -- even if each one is only sixty seconds." },
        { text: "Join a small group or Bible study where Scripture is read together. Private study builds knowledge. Communal study builds accountability and wisdom." },
      ],
      high: [
        { text: "Begin mentoring someone younger in faith. The best way to deepen what you have learned is to give it away." },
        { text: "Consider a spiritual retreat -- a full day of silence and prayer. Sustained practitioners need sustained rest, and silence reveals what noise conceals." },
      ],
    },
    relatedLink: {
      title: "Explore the Bible Study Builder",
      href: "/tools/bible-study",
    },
  },
  {
    name: "Marriage & Relationships",
    slug: "relationships",
    description:
      "The closest human relationship you have -- and the one most likely to be neglected because proximity creates the illusion of presence.",
    questions: [
      {
        id: 4,
        text: "My spouse or closest person would say that I communicate openly, honestly, and regularly -- not just about logistics but about what I actually feel.",
      },
      {
        id: 5,
        text: "I invest in emotional and physical closeness with intention, not leaving intimacy to chance or leftovers of energy.",
      },
      {
        id: 6,
        text: "When conflict arises, I repair it rather than avoid it or escalate it. I take responsibility for my part without waiting for the other person to go first.",
      },
    ],
    interpretation: {
      low: "Your closest relationship is under significant strain. This does not mean it is over. It means it needs attention that it is not getting. The distance between two people who share a life can grow so gradually that neither notices until the gap is a canyon.",
      mid: "You have real connection, but it is uneven. Some dimensions are working -- others are not. Most relationships live here: strong enough to survive, weak enough to hurt. The question is whether you will stay at this level or do the work to go deeper.",
      high: "Your closest relationship shows genuine health. This is rare and worth protecting. Do not mistake stability for permanence. The couples and friends who thrive are the ones who never stop being intentional.",
    },
    nextSteps: {
      low: [
        { text: "Have the conversation you have been avoiding. Not all of it. Just the first sentence. 'I feel distant from you, and I want to fix it.' That sentence changes the trajectory." },
        { text: "Consider professional help -- a counselor, a pastor, a trusted mentor. Relationships in crisis need a third voice in the room. Asking for help is not weakness. It is wisdom." },
      ],
      mid: [
        { text: "Establish a weekly check-in with your spouse or closest person: 'How are we doing?' Not about schedules. About the relationship itself." },
        { text: "Identify the area of greatest friction and give it one focused conversation this week. Do not try to fix everything. Fix one thing." },
      ],
      high: [
        { text: "Use your relational strength to serve another couple. Mentoring relationships is one of the most underused gifts in the church." },
        { text: "Go deeper still. Move past 'we are fine' to 'what are we afraid to say?' The best relationships are the ones that can bear the weight of full honesty." },
      ],
    },
    relatedLink: {
      title: "Take the Marriage Health Assessment",
      href: "/tools/marriage-assessment",
    },
  },
  {
    name: "Parenting",
    slug: "parenting",
    description:
      "The most important work you will do and the one for which no one hands you a manual. Not whether your children are performing. Whether you are present.",
    questions: [
      {
        id: 7,
        text: "I am consistently present with my children -- not just in the room, but engaged, attentive, and available when they need me.",
      },
      {
        id: 8,
        text: "I parent with intentionality -- I have thought about who I want my children to become and I am making decisions that serve that vision, not just reacting to the moment.",
      },
      {
        id: 9,
        text: "I am actively forming my children's spiritual lives -- through conversation, practice, and modeling -- rather than outsourcing it entirely to the church.",
      },
    ],
    interpretation: {
      low: "Your parenting is under strain, either from absence, reactivity, or exhaustion. This is not an indictment. Most parents at this level are carrying more than they were built to carry. But your children are forming their understanding of the world right now, and they are learning from what they see, not what you intend.",
      mid: "You are present but inconsistent. The desire to parent well is there, but the execution is uneven. This is the most common place to be, and the most dangerous -- because it feels close enough to good that you do not seek change. Close is not the same as enough.",
      high: "You are parenting with intention and presence. Your children are benefiting from it, even if they will not thank you for another twenty years. Keep going. The work you are doing now is building something you will not see the full shape of for decades.",
    },
    nextSteps: {
      low: [
        { text: "Choose one child this week and give them thirty minutes of undivided attention. No phone. No agenda. Just you and them. Then do it again the next day. Presence is rebuilt one afternoon at a time." },
        { text: "Write down three words that describe the adult you want each child to become. Put those words where you can see them. Let those words inform every discipline decision, every conversation, every choice about your time." },
      ],
      mid: [
        { text: "Start a weekly family rhythm -- a meal, a walk, a prayer time -- that requires no planning beyond showing up together. Consistency builds the security your children need more than any activity or lesson." },
        { text: "Have an age-appropriate conversation about faith with each child this week. Not a lecture. A question: 'What do you think God is like?' Listen to the answer. It will tell you everything." },
      ],
      high: [
        { text: "Begin writing letters to your children -- letters they will read when they are older. Your current wisdom, captured now, becomes their inheritance." },
        { text: "Mentor another parent. The things you have learned through trial and intention are desperately needed by parents who are earlier in the process." },
      ],
    },
    relatedLink: {
      title: "Explore the Parenting Guide by Age",
      href: "/tools/parenting-guide",
    },
  },
  {
    name: "Physical Health",
    slug: "physical",
    description:
      "Your body is not a vehicle for your mind. It is the instrument through which you love, serve, work, and worship. Neglecting it is not humility. It is poor stewardship.",
    questions: [
      {
        id: 10,
        text: "I exercise regularly -- at least three times a week -- in a way that maintains my strength, endurance, and energy for the demands of my life.",
      },
      {
        id: 11,
        text: "I sleep seven to eight hours most nights and have practices that protect my rest rather than treating sleep as the first thing to sacrifice.",
      },
      {
        id: 12,
        text: "I eat in a way that fuels my body rather than numbing my stress. My relationship with food is more nourishment than comfort or compulsion.",
      },
    ],
    interpretation: {
      low: "Your body is paying the cost of your neglect. Not as punishment, but as consequence. Every night of lost sleep, every week without movement, every meal that is fuel for anxiety rather than nourishment -- the debt compounds. This is not about vanity. It is about capacity. You cannot serve the people who depend on you from a body that is breaking down.",
      mid: "You are maintaining some physical health practices, but inconsistently. You know what you should do. The gap between knowledge and action is where most people live. The question is whether you are willing to treat your body as seriously as you treat your career, your ministry, or your marriage.",
      high: "You are stewarding your body well. This is one of the most countercultural things a person can do in an age of convenience, exhaustion, and the glorification of being busy. Your physical health is a gift to everyone who depends on you. Maintain it.",
    },
    nextSteps: {
      low: [
        { text: "Walk for twenty minutes today. Not tomorrow. Today. Do it again tomorrow. The goal is not fitness. The goal is breaking the pattern of inactivity. Movement begets movement." },
        { text: "Set a non-negotiable bedtime for this week -- and honor it. Put your phone in another room thirty minutes before that time. Your body cannot heal what your habits keep breaking." },
      ],
      mid: [
        { text: "Schedule your exercise the way you schedule meetings. Put it in the calendar. Defend it. If it is not scheduled, it will not happen consistently. You already know this." },
        { text: "Examine your nutrition honestly. Not with guilt, but with curiosity. Are you eating to nourish or to numb? The answer changes the intervention." },
      ],
      high: [
        { text: "Add a new physical challenge -- a race, a class, a sport you have never tried. Maintenance is good. Growth keeps the body and the mind from stagnation." },
        { text: "Use your physical discipline to serve others. Walk with a friend who is trying to start. Cook a nourishing meal for someone who is struggling. Stewardship includes sharing what you have been given." },
      ],
    },
    relatedLink: {
      title: "Read essays on stewardship and the body",
      href: "/writing?category=living-well",
    },
  },
  {
    name: "Financial Health",
    slug: "financial",
    description:
      "Not how much you have, but how you hold it. Whether money serves your life or runs it.",
    questions: [
      {
        id: 13,
        text: "I practice financial stewardship -- living within my means, avoiding unnecessary debt, and making spending decisions that align with my values rather than my impulses.",
      },
      {
        id: 14,
        text: "I give generously and regularly -- to my church, to those in need, to causes that matter -- and this giving is planned, not an afterthought.",
      },
      {
        id: 15,
        text: "I have a financial plan for the future -- savings, insurance, a will, retirement -- and I review it regularly rather than ignoring it and hoping for the best.",
      },
    ],
    interpretation: {
      low: "Your financial life is either in crisis or in denial. Neither is sustainable. The anxiety that money produces -- or the avoidance that replaces anxiety -- affects every other area of your life: your marriage, your sleep, your ministry, your capacity for generosity. This is not about wealth. It is about honesty.",
      mid: "You have some financial health, but gaps remain. Perhaps you earn well but spend without a plan. Perhaps you save but never give. Perhaps you plan for the future but ignore the present. Financial wholeness requires attention to all three: stewardship, generosity, and planning.",
      high: "You are managing money well across multiple dimensions. This is a genuine strength. Use it as a platform for generosity that goes beyond what is comfortable. Financial discipline is a gift. Financial generosity is what turns that gift into worship.",
    },
    nextSteps: {
      low: [
        { text: "Write down every dollar you spend this week. Not to judge yourself -- to see clearly. Most financial problems begin with a refusal to look at the numbers." },
        { text: "Set up one automatic monthly gift to your church or a cause you care about. Start with any amount. The habit of generosity does more to reorder your financial life than any budget." },
      ],
      mid: [
        { text: "Build a three-month emergency fund if you do not have one. This single step eliminates more financial anxiety than any other. Start with one month. Add a month every quarter." },
        { text: "Review your giving. Is it proportional to your income, or have your expenses grown while your generosity stayed flat? Generosity that does not grow with your income has quietly become a smaller percentage of your life." },
      ],
      high: [
        { text: "Mentor someone in financial stewardship. Teach a class, sit with a younger couple, share what you have learned. Financial wisdom is desperately scarce in the church." },
        { text: "Consider increasing your giving to a level that requires faith. Comfortable generosity is good. Sacrificial generosity is where financial stewardship becomes spiritual formation." },
      ],
    },
    relatedLink: {
      title: "Take the Financial Health Assessment",
      href: "/tools/financial-health",
    },
  },
  {
    name: "Emotional Health",
    slug: "emotional",
    description:
      "The inner life that shapes the outer one. Whether you know yourself well enough to be honest, bounded enough to be safe, and rested enough to be present.",
    questions: [
      {
        id: 16,
        text: "I can name what I am feeling in real time -- not hours later, not never, but in the moment -- and I understand why certain situations provoke strong reactions in me.",
      },
      {
        id: 17,
        text: "I maintain healthy boundaries -- I can say no without guilt, protect my time without apology, and distinguish between my responsibilities and other people's emergencies.",
      },
      {
        id: 18,
        text: "I practice genuine rest -- not just the absence of work, but activities and rhythms that actually replenish my soul rather than simply numbing my fatigue.",
      },
    ],
    interpretation: {
      low: "Your inner life is carrying more than it was built to hold. Emotional depletion is not a character weakness. It is a structural failure -- you have been running without maintenance for too long, and the systems are breaking down. This affects everything: your patience, your presence, your capacity for love.",
      mid: "You have some emotional awareness, but it is inconsistent. You know your triggers on good days and forget them on bad ones. You set boundaries with some people and not others. You rest occasionally but not habitually. The foundation is there. The consistency is not.",
      high: "Your emotional health shows the marks of sustained self-awareness and intentional practice. This is one of the most valuable things a human being can develop, and it benefits every person in your life. Keep cultivating it. Emotional health, like physical health, requires ongoing attention.",
    },
    nextSteps: {
      low: [
        { text: "Three times today, pause and name what you are feeling in one word. Not 'fine.' An actual emotion. Write it down. You cannot steward what you have not identified." },
        { text: "Identify one boundary you need to set this week -- one 'no' you have been afraid to say -- and say it. The guilt will come. Let it come. It is the voice of a pattern, not the voice of God." },
      ],
      mid: [
        { text: "Begin a weekly practice of sabbath rest -- not collapse, but intentional cessation. One half-day where you do nothing productive. If this feels impossible, that is the evidence you need it most." },
        { text: "Ask someone who knows you well: 'What emotion do I avoid most?' Listen without defending. Their observation may be more accurate than your self-assessment." },
      ],
      high: [
        { text: "Read deeply on emotional health from a Christian perspective. Peter Scazzero's work is a strong starting point for those ready to go further." },
        { text: "Use your emotional health to serve others in crisis. Emotionally healthy people are the rarest and most needed resource in any community." },
      ],
    },
    relatedLink: {
      title: "Take the Emotional Health Assessment",
      href: "/tools/emotional-health",
    },
  },
  {
    name: "Vocational Purpose",
    slug: "vocation",
    description:
      "Not whether you have a job, but whether your work has a meaning that outlasts the paycheck. Whether you know why you do what you do.",
    questions: [
      {
        id: 19,
        text: "I have a clear sense of calling -- I can articulate why I do the work I do, and that answer goes deeper than financial necessity.",
      },
      {
        id: 20,
        text: "I find genuine satisfaction in my work most days -- not every moment, but a prevailing sense that what I do matters and uses what I have been given.",
      },
      {
        id: 21,
        text: "My work has visible impact -- I can see how it serves others, contributes to something larger than myself, and aligns with what I believe God has asked of me.",
      },
    ],
    interpretation: {
      low: "You are either in the wrong work or have lost sight of why the right work matters. Both happen. Neither is permanent. But living without vocational purpose for extended periods does damage -- to your identity, your energy, and your sense that your life is going somewhere.",
      mid: "You have some clarity about your calling, but it is incomplete. Perhaps you enjoy your work but cannot connect it to anything larger. Perhaps you know your purpose but your current role does not express it. The gap between 'what I do' and 'what I am for' is the space where vocational health is built.",
      high: "You work from a clear sense of purpose, and that purpose is bearing fruit. This is one of the deepest forms of human satisfaction. Guard it from the two threats that destroy vocational health: overwork and complacency. Either can corrode what you have built.",
    },
    nextSteps: {
      low: [
        { text: "Write your answer to this question: 'If money were not a factor, what problem in the world would I spend my life trying to solve?' Your answer contains directional information about your calling." },
        { text: "Talk to three people who know you well and ask: 'What do you see me do that seems to come alive in me?' Others often see our gifts more clearly than we see them ourselves." },
      ],
      mid: [
        { text: "Identify one way to increase the alignment between your current work and your deeper sense of purpose. Can you shift your role, take on a project, or serve in a capacity that brings the two closer together?" },
        { text: "Volunteer in an area related to your calling outside of work. Sometimes vocational clarity comes from doing the thing for free, without the pressure of performance or salary." },
      ],
      high: [
        { text: "Begin mentoring someone who is searching for their calling. Your clarity is a gift. Give it away." },
        { text: "Set boundaries around your work to prevent it from consuming everything else. People with clear vocational purpose are the most susceptible to overwork, because the work feels meaningful enough to justify the cost. It is not." },
      ],
    },
    relatedLink: {
      title: "Read essays on calling and vocation",
      href: "/writing?category=living-well",
    },
  },
  {
    name: "Community & Friendship",
    slug: "community",
    description:
      "Whether you are known or merely recognized. Whether you have people who will tell you the truth, sit with you in silence, and come when you call at 2 a.m.",
    questions: [
      {
        id: 22,
        text: "I have at least two friendships of genuine depth -- people who know my failures, my fears, and my real life, not just my public one.",
      },
      {
        id: 23,
        text: "I resist the pull toward isolation. When I am struggling, I move toward people rather than away from them, even when it is uncomfortable.",
      },
      {
        id: 24,
        text: "I actively serve my community -- my church, my neighborhood, the people around me -- contributing to something beyond my own household.",
      },
    ],
    interpretation: {
      low: "You are isolated, and isolation is doing more damage than you realize. It affects your mental health, your marriage, your parenting, your faith -- everything. Human beings were not built to function alone. The church has always understood this: we are a body, not a collection of individuals. Your withdrawal, whatever its cause, is slowly dismantling the support structure your life depends on.",
      mid: "You have some community, but it may be shallow or inconsistent. Surface-level friendships do not bear the weight of real life. The question is whether anyone in your life could identify what you are actually struggling with right now. If not, you have acquaintances, not community.",
      high: "You are embedded in genuine community. This is one of the most protective factors in every other area of life. People with deep friendships and active service are more resilient in crisis, more faithful in marriage, more effective in work, and more durable in faith. What you have built here is structural, not decorative.",
    },
    nextSteps: {
      low: [
        { text: "Reach out to one person this week and initiate a real conversation. Not a text. A phone call or a face-to-face meeting. Say: 'I have been too isolated, and I want to change that.' That sentence is the hardest step, and it is the only one that matters right now." },
        { text: "Show up somewhere consistently -- a church small group, a service team, a regular gathering. You do not build community by wanting it. You build it by being present in the same place, with the same people, repeatedly." },
      ],
      mid: [
        { text: "Deepen one existing friendship. Choose the person you are closest to and tell them something you have been holding back. Depth is not found. It is built, one vulnerable conversation at a time." },
        { text: "Begin serving in a way that puts you in regular contact with others -- a ministry team, a neighborhood project, a recurring volunteer role. Service builds the kind of bonds that social events cannot." },
      ],
      high: [
        { text: "Become an initiator for others who are isolated. Invite the person who sits alone. Call the friend who has gone quiet. Your community is strong. Use it as a gateway for people who have none." },
        { text: "Guard your friendships from busyness. Deep relationships require protected time, and the first thing to go in a busy season is always community. Do not let it go." },
      ],
    },
    relatedLink: {
      title: "Explore the Pastors Connection Network",
      href: "/pcn",
    },
  },
];

/* ── Helpers ───────────────────────────────────────────────────── */

function getScoreLevel(score: number): string {
  if (score >= 12) return "high";
  if (score >= 8) return "mid";
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

function getLevelBg(level: string): string {
  if (level === "high") return "rgba(45,106,79,0.08)";
  if (level === "mid") return "rgba(212,160,23,0.1)";
  return "rgba(192,57,43,0.08)";
}

function getOverallInterpretation(score: number): {
  label: string;
  color: string;
  description: string;
} {
  const pct = score / 120;
  if (pct >= 0.8)
    return {
      label: "Thriving",
      color: "#2D6A4F",
      description:
        "Your life shows the marks of sustained attention across multiple dimensions. This is rare, and it did not happen by accident. You have made choices -- hard ones, repeated ones -- that are bearing fruit. The temptation at this stage is to stop being intentional because things are working. Resist it. The margin between thriving and coasting is smaller than you think.",
    };
  if (pct >= 0.6)
    return {
      label: "Growing",
      color: "var(--mustard)",
      description:
        "You have real strength in several areas and identifiable gaps in others. This is the most honest place to be -- you are not in crisis, but you are not coasting either. The areas where you scored lowest are not failures. They are invitations. Start with the two lowest categories and give them concentrated attention for the next ninety days.",
    };
  if (pct >= 0.4)
    return {
      label: "Under Strain",
      color: "#E07A2F",
      description:
        "Multiple areas of your life are carrying more weight than they can bear. This is not sustainable, and you already know it. The good news is that you took this assessment, which means the denial is breaking. Pick the one area that, if it improved, would change everything else. Start there. One area. One step. This week.",
    };
  return {
    label: "In Crisis",
    color: "#C0392B",
    description:
      "Your results indicate serious strain across most areas of your life. Hear this: the assessment is not the final word. It is a starting point. But it is a starting point that requires action, not just awareness. You need help -- a counselor, a pastor, a trusted friend -- someone who can walk with you as you begin the work of rebuilding. Do not try to do this alone.",
  };
}

/* ── Component ─────────────────────────────────────────────────── */

export default function LifeAudit() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const category = CATEGORIES[currentCategory];
  const totalQuestions = 24;
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

  const getCategoryScore = (cat: Category) =>
    cat.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);

  const totalScore = CATEGORIES.reduce(
    (sum, cat) => sum + getCategoryScore(cat),
    0
  );

  const overall = getOverallInterpretation(totalScore);

  // Compute strengths and growth areas
  const categoryScores = CATEGORIES.map((cat) => ({
    category: cat,
    score: getCategoryScore(cat),
    level: getScoreLevel(getCategoryScore(cat)),
  }));

  const sorted = [...categoryScores].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 2);
  const growthAreas = [...categoryScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return (
    <Layout>
      <SEOMeta
        title="Life Audit -- A Comprehensive Assessment Across Eight Areas"
        description="Twenty-four questions across eight life areas: spiritual health, marriage, parenting, physical health, finances, emotional health, vocation, and community. Honest results with practical next steps."
        keywords="life audit, life assessment, spiritual health, marriage assessment, parenting, financial health, emotional health, vocation, community, Christian life"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Life Audit Tool",
          description:
            "A comprehensive life assessment across eight areas with honest results, practical next steps, and Scripture-grounded guidance.",
          url: "https://www.livewellbyjamesbell.co/tools/life-audit",
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
            Life{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              Audit
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
            Twenty-four questions across eight areas of your life. An honest
            assessment of where you are thriving and where the work remains.
            Not a score to perform. A diagnosis to act on.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      {!showResults && (
        <div
          style={{
            background: "var(--bone-warm)",
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
                    padding: 0,
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
            <ToolActions toolName="Life Audit" />

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
                YOUR LIFE AUDIT RESULTS
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
                  / 120
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

            {/* Bar Chart Overview */}
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
                  const level = getScoreLevel(score);
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

            {/* Strengths & Growth Areas */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {/* Strengths */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "2px",
                  padding: "28px 24px",
                  borderTop: "3px solid #2D6A4F",
                }}
              >
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#2D6A4F",
                    fontFamily: "var(--U)",
                    marginBottom: "16px",
                  }}
                >
                  YOUR STRENGTHS
                </h3>
                {strengths.map((s, i) => (
                  <div
                    key={s.category.slug}
                    style={{
                      marginBottom: i < strengths.length - 1 ? "14px" : 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: "4px",
                      }}
                    >
                      {s.category.name}
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontFamily: "var(--U)",
                        color: "#2D6A4F",
                        fontWeight: 600,
                      }}
                    >
                      {s.score} / 15
                    </span>
                  </div>
                ))}
              </div>

              {/* Growth Areas */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "2px",
                  padding: "28px 24px",
                  borderTop: "3px solid #C0392B",
                }}
              >
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#C0392B",
                    fontFamily: "var(--U)",
                    marginBottom: "16px",
                  }}
                >
                  GROWTH AREAS
                </h3>
                {growthAreas.map((g, i) => (
                  <div
                    key={g.category.slug}
                    style={{
                      marginBottom:
                        i < growthAreas.length - 1 ? "14px" : 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: "4px",
                      }}
                    >
                      {g.category.name}
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontFamily: "var(--U)",
                        color: "#C0392B",
                        fontWeight: 600,
                      }}
                    >
                      {g.score} / 15
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Per-Category Detail */}
            {CATEGORIES.map((cat) => {
              const score = getCategoryScore(cat);
              const level = getScoreLevel(score);
              const levelLabel = getLevelLabel(level);
              const levelColor = getLevelColor(level);
              const levelBg = getLevelBg(level);
              const interpretation = cat.interpretation[level];
              const steps = cat.nextSteps[level];

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
                        background: levelBg,
                        borderRadius: "2px",
                      }}
                    >
                      {levelLabel.toUpperCase()} -- {score}/15
                    </span>
                  </div>

                  {/* Score bar */}
                  <div
                    style={{
                      height: "6px",
                      background: "var(--bone)",
                      borderRadius: "4px",
                      overflow: "hidden",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(score / 15) * 100}%`,
                        background: levelColor,
                        borderRadius: "4px",
                        transition:
                          "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  </div>

                  {/* Interpretation */}
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.8,
                      color: "var(--ink)",
                      fontFamily: "var(--B)",
                      marginBottom: "24px",
                    }}
                  >
                    {interpretation}
                  </p>

                  {/* Next Steps */}
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
                    PRACTICAL NEXT STEPS
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      marginBottom: "24px",
                    }}
                  >
                    {steps.map((step, i) => (
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
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Related Link */}
                  <a
                    href={cat.relatedLink.href}
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
                    {cat.relatedLink.title}
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
                Print Your Life Audit Summary
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
              toolName="Life Audit"
              resultsSummary={
                `Life Audit Results\n\nOverall: ${totalScore}/120 (${overall.label})\n\n` +
                CATEGORIES.map(
                  (cat) => {
                    const score = getCategoryScore(cat);
                    const level = getScoreLevel(score);
                    return `${cat.name}: ${score}/15 (${getLevelLabel(level)})`;
                  }
                ).join("\n") +
                `\n\nTop Strengths: ${strengths.map((s) => `${s.category.name} (${s.score}/15)`).join(", ")}` +
                `\nGrowth Areas: ${growthAreas.map((g) => `${g.category.name} (${g.score}/15)`).join(", ")}`
              }
            />

            {/* Bottom CTA */}
            <a
              href="/tools"
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
                  KEEP GOING
                </div>
                <span
                  style={{
                    fontSize: "18px",
                    fontFamily: "var(--F)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  Explore all tools for living well
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
