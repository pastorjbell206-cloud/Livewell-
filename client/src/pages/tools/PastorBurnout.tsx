import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Printer,
  AlertTriangle,
  Phone,
} from "lucide-react";
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
  scripture: { ref: string; text: string };
  recovery: Record<string, string[]>;
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
    name: "Calling Clarity",
    slug: "calling",
    description:
      "Whether the thing that brought you into ministry still burns, or whether the flame has become an obligation.",
    questions: [
      {
        id: 1,
        text: "I still feel a clear, sustained sense of calling to pastoral ministry -- not just momentum or inertia.",
      },
      {
        id: 2,
        text: "When I preach, I preach with conviction -- not just competence. The difference is audible.",
      },
      {
        id: 3,
        text: "I can point to specific fruit in my ministry over the past year -- lives changed, not just programs maintained.",
      },
    ],
    scripture: {
      ref: "2 Timothy 1:6--7",
      text: "For this reason I remind you to fan into flame the gift of God, which is in you through the laying on of my hands. For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
    },
    recovery: {
      low: [
        "Write down the moment you first knew God called you to ministry. Not the theology of it -- the memory. Where you were standing. What the air felt like. Return to that moment not as nostalgia but as anchor. The calling has not changed. You have been buried under the weight of what the calling costs.",
        "Find one person in your congregation whose life has been materially changed by your ministry this year. Ask them to tell you the story. You need to hear it, because burnout erases the evidence of fruit from your memory.",
        "Take your next sermon and throw out everything except the one thing you actually believe God is saying. Not three points. Not an outline you inherited. One burning conviction. Preach that. The conviction will remind you why you started.",
      ],
      mid: [
        "Your calling is intact but fatigued. The distinction matters. Fatigue is not the absence of calling -- it is the cost of carrying it without sufficient support. Identify where the support has collapsed and rebuild there.",
        "Spend one hour this week in a place that is not your church, not your home office, not a coffee shop where congregants find you. Go somewhere nobody knows you are a pastor. Read Scripture as a human being, not as a sermon preparation exercise.",
        "Ask yourself honestly: am I preaching to my congregation or performing for them? If preparation has become performance, the shift happened slowly and can be reversed slowly. Start by preparing your next sermon on your knees.",
      ],
      high: [
        "Your calling is clear. Guard it. The pastors who burn out most completely are often the ones who were most certain of their calling, because they confused clarity of calling with immunity to limits.",
        "Use your clarity to mentor a younger pastor who is struggling with theirs. Your certainty is a gift to someone drowning in doubt.",
        "Remember that calling clarity does not replace the need for rest, friendship, and margin. The most dangerous sentence in pastoral ministry is 'God called me to this, so I can handle it.' He called you. He did not call you to destroy yourself.",
      ],
    },
  },
  {
    name: "Emotional Reserves",
    slug: "emotional",
    description:
      "The internal resources you draw on when the phone rings at 2 a.m. -- and whether anything remains.",
    questions: [
      {
        id: 4,
        text: "I find myself crying more easily than I used to, or unable to cry at all -- both are signals.",
      },
      {
        id: 5,
        text: "I feel emotionally numb in situations that should move me -- funerals, baptisms, moments of genuine need.",
      },
      {
        id: 6,
        text: "I experience compassion fatigue -- I hear about someone's pain and my first response is exhaustion, not empathy.",
      },
    ],
    scripture: {
      ref: "Psalm 42:1--2",
      text: "As the deer pants for streams of water, so my soul pants for you, my God. My soul thirsts for God, for the living God. When can I go and meet with God?",
    },
    recovery: {
      low: [
        "Your emotional reserves are depleted. This is not a character flaw. It is the predictable result of pouring out without being poured into. Schedule an appointment with a licensed counselor this week -- not a pastor friend, a professional. You need someone whose job is not to need anything from you.",
        "For the next thirty days, give yourself permission to feel nothing in response to congregational need. Not permanently -- temporarily. You are not being callous. You are acknowledging that the well is dry and drawing from it further will crack the foundation.",
        "Identify the three most emotionally demanding relationships in your ministry. For one month, create a buffer -- an associate pastor, a deacon, a lay leader who handles the first call. You cannot be the first responder to everyone's crisis when you are in one yourself.",
      ],
      mid: [
        "You are running on reserves, not surplus. The difference is invisible to your congregation and obvious to your spouse. Tell your spouse what this assessment revealed. They already know. But hearing you name it will matter.",
        "Implement a daily emotional check-in with yourself. Two minutes. 'What am I feeling right now? When did I last feel something deeply? What am I avoiding feeling?' The answers will be diagnostic.",
        "Reduce your counseling load by 30% for the next quarter. Refer people to professional counselors. You are not abandoning them. You are ensuring you have something left to give the ones only you can serve.",
      ],
      high: [
        "Your emotional reserves are healthy. This is rare among pastors and worth protecting. Continue whatever practices have brought you here -- therapy, sabbath, friendship, boundaries.",
        "Be honest with younger pastors about what emotional health costs. They need to hear that it requires intentional investment, not just natural resilience.",
        "Watch for the slow drain. Emotional reserves do not collapse overnight. They erode. Monitor yourself quarterly. This assessment is a tool you can return to.",
      ],
    },
  },
  {
    name: "Marriage Impact",
    slug: "marriage",
    description:
      "Whether ministry is building your marriage or quietly consuming it from the inside.",
    questions: [
      {
        id: 7,
        text: "My spouse carries resentment toward the church or toward my role in it -- spoken or unspoken.",
      },
      {
        id: 8,
        text: "Ministry regularly steals time that belongs to my family, and I justify it because the need seems urgent.",
      },
      {
        id: 9,
        text: "I am emotionally unavailable to my spouse -- present in the house but absent in the relationship.",
      },
    ],
    scripture: {
      ref: "1 Timothy 3:4--5",
      text: "He must manage his own family well and see that his children obey him, and he must do so in a manner worthy of full respect. If anyone does not know how to manage his own family, how can he take care of God's church?",
    },
    recovery: {
      low: [
        "Your marriage is absorbing the cost of your ministry. This is the most common and most devastating form of pastoral burnout, because the damage is invisible to the congregation and catastrophic at home. Tell your spouse tonight: 'I see what this has cost us. I am going to change it.' Then change it.",
        "Block one evening per week that belongs entirely to your marriage. Not 'unless something comes up.' Not 'except during sermon prep season.' One evening. Non-negotiable. The church that cannot survive without you one evening a week has a structural problem, not a pastoral one.",
        "If your spouse has stopped complaining about ministry demands, that may not be acceptance. It may be resignation. Ask them directly: 'What has my ministry cost our marriage?' Do not defend yourself when they answer. Listen. The answer is the diagnosis.",
      ],
      mid: [
        "Your marriage is strained but not broken. The window to address this is now -- not after the building campaign, not after the next hire, not after things settle down. Things do not settle down in ministry. You have to build the boundary yourself.",
        "Have your spouse read your results from this assessment. Not as a weapon. As a shared vocabulary. If they see themselves in the questions, you have confirmation that the problem is real and mutual.",
        "Consider whether you have made your spouse a ministry partner without their consent. Not every pastor's spouse signed up to co-lead. Some married a person, not a position. Let them be your spouse first.",
      ],
      high: [
        "Your marriage is healthy despite the pressures of ministry. This is a testimony worth guarding. Keep investing. The pastors whose marriages survive are the ones who never stopped dating their spouse.",
        "Share with other pastors' spouses what has worked. The isolation of being married to a pastor is real and rarely addressed.",
        "Continue to ask your spouse regularly: 'Is my ministry costing us too much?' Make it safe for them to say yes.",
      ],
    },
  },
  {
    name: "Physical Health",
    slug: "physical",
    description:
      "The body you are ignoring while you tend to everyone else's soul.",
    questions: [
      {
        id: 10,
        text: "My sleep is disrupted -- I lie awake processing church conflict, or I sleep but wake exhausted.",
      },
      {
        id: 11,
        text: "I am stress eating, drinking more than I should, or relying on substances to manage the pressure.",
      },
      {
        id: 12,
        text: "I have abandoned regular exercise -- not because I do not value it, but because I cannot find the time or the energy.",
      },
    ],
    scripture: {
      ref: "1 Corinthians 6:19--20",
      text: "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.",
    },
    recovery: {
      low: [
        "Your body is telling you what your theology will not: you are not indestructible. Schedule a full physical this month. Tell the doctor you are a pastor under sustained stress. They will know what to check. Cortisol, blood pressure, sleep quality -- these are not vanity metrics. They are survival indicators.",
        "For the next two weeks, go to bed at a fixed time regardless of what remains undone. Your body cannot recover on four hours of sleep mixed with anxiety. The sermon will not be worse because you rested. It will be worse because you did not.",
        "Move your body for thirty minutes, three times this week. Walking counts. The point is not fitness. The point is that your body has been locked in a stress posture for months, and movement is the only thing that breaks the neurological loop.",
      ],
      mid: [
        "You are surviving physically but not thriving. The gap between surviving and thriving is where chronic illness lives. Close the gap now while the cost is habits, not prescriptions.",
        "Identify your primary stress response -- eating, drinking, insomnia, lethargy -- and name it without shame. Then find one replacement habit. Not a perfect one. A better one. Swap the late-night eating for a ten-minute walk. Swap the extra drink for a phone call to a friend.",
        "Consider that your physical neglect may be theological. If you believe your body is a tool for ministry rather than a gift from God, you will use it until it breaks. It is not a tool. It is a temple. Treat it accordingly.",
      ],
      high: [
        "You are stewarding your body well. In a vocation that rewards self-neglect, this is countercultural. Keep it up.",
        "Share your physical health practices with your staff or elder board. Normalize pastoral self-care. The congregation that sees their pastor exercise will give themselves permission to rest.",
        "Remember that physical health provides the capacity for every other kind of health. Protect it first.",
      ],
    },
  },
  {
    name: "Isolation",
    slug: "isolation",
    description:
      "The loneliness that lives inside the most public vocation in the church.",
    questions: [
      {
        id: 13,
        text: "I do not have a single close pastor friend who knows the unedited version of my life.",
      },
      {
        id: 14,
        text: "There is no one I can confess to -- my real struggles, my doubts, my failures -- without professional or relational risk.",
      },
      {
        id: 15,
        text: "I am performing for my congregation -- giving them the pastor they expect rather than the person I am.",
      },
    ],
    scripture: {
      ref: "Ecclesiastes 4:9--10",
      text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up.",
    },
    recovery: {
      low: [
        "You are dangerously isolated. This is the single greatest predictor of pastoral failure -- not moral weakness, not theological drift, but the absence of anyone who knows you. This week, identify one person outside your congregation -- a pastor, a counselor, a trusted friend -- and tell them one true thing about your life. Start there.",
        "Join or form a confidential pastors' group. Not a networking group. Not a preaching cohort. A group of three to five pastors who meet monthly with one rule: nothing said leaves the room. The Pastors Connection Network exists for this purpose. Use it.",
        "Examine whether your isolation is imposed or chosen. Some pastors are isolated because their context offers no peers. Others are isolated because vulnerability feels too expensive. If it is the second, the cost of continued hiding is higher than the cost of being known.",
      ],
      mid: [
        "You have some relational connection but not enough depth. The difference between acquaintance and intimacy among pastors is the difference between survival and health. Push deeper with one person this month.",
        "Stop performing in at least one relationship. Choose the safest person you know and tell them something you have been carrying alone. Their response will tell you whether they are the friend you need.",
        "Consider that your congregation does not need a perfect pastor. They need an honest one. Appropriate vulnerability from the pulpit -- not oversharing, but genuine humanity -- builds trust faster than polished performance.",
      ],
      high: [
        "You have built real friendships in a vocation that punishes vulnerability. This is your greatest ministry asset. Protect these relationships with the same energy you give your sermon.",
        "Invite an isolated pastor into your circle. You have something they are dying for. Extend it.",
        "Continue to resist the pull toward performance. The pressure never fully disappears. The discipline of honesty must be renewed constantly.",
      ],
    },
  },
  {
    name: "Board & Elder Relations",
    slug: "board",
    description:
      "Whether the people tasked with supporting your ministry are building with you or building against you.",
    questions: [
      {
        id: 16,
        text: "There is a trust deficit between me and my board or elder team -- unspoken tension, withheld information, or political maneuvering.",
      },
      {
        id: 17,
        text: "I experience micromanagement from church leadership -- second-guessing of decisions, demands for justification of routine choices.",
      },
      {
        id: 18,
        text: "I avoid necessary conflict with board members because the political cost feels too high.",
      },
    ],
    scripture: {
      ref: "Hebrews 13:17",
      text: "Have confidence in your leaders and submit to their authority, because they keep watch over you as those who must give an account. Do this so that their work will be a joy, not a burden, for that would be of no benefit to you.",
    },
    recovery: {
      low: [
        "Dysfunctional board relationships are the leading cause of forced pastoral exits. If trust has collapsed, you need a mediator -- not a congregational vote, not a sermon series on unity, a trained church conflict mediator. Contact your denomination or the Pastors Connection Network for referrals.",
        "Document your concerns in writing -- not as legal preparation, but as clarity. When conflict is chronic, the details blur and emotions dominate. Written documentation forces precision and provides a basis for honest conversation.",
        "Ask yourself whether the board conflict is about governance or about you. Sometimes boards are dysfunctional regardless of the pastor. Sometimes the pastor is the common variable. Both require different responses. A trusted outside voice can help you see which is true.",
      ],
      mid: [
        "Your board relationships are functional but fragile. Invest in relational capital now. Take an elder to lunch with no agenda. Ask about their family. Most board tension is not ideological -- it is relational. People fight harder against leaders they do not know personally.",
        "Propose a shared vision retreat for your board -- not a business meeting off-site, but a genuine conversation about why each person serves and what they believe the church is called to become. Shared vision absorbs conflict.",
        "Address the one thing you have been avoiding. The conflict you defer always compounds. Bring it up with courage and clarity, not accusation. 'I have noticed a pattern and I want to address it before it becomes a crisis.'",
      ],
      high: [
        "Healthy board relationships are ministry gold. Invest in them, celebrate them publicly, and model them for other churches. Many pastors would trade their salary for what you have.",
        "Use your relational health to take strategic risks together. A united leadership team can absorb congregational resistance to necessary change. A divided one cannot.",
        "Prepare for leadership transitions now, while things are healthy. Board relationships built on one personality do not survive pastoral succession. Build them on shared mission.",
      ],
    },
  },
  {
    name: "Congregation Dynamics",
    slug: "congregation",
    description:
      "The weight of pastoring people who are simultaneously your mission field and your employer.",
    questions: [
      {
        id: 19,
        text: "I absorb criticism from congregants without healthy processing -- it accumulates in my chest and plays on repeat.",
      },
      {
        id: 20,
        text: "My congregation holds unrealistic expectations of my availability, my family, or my capacity.",
      },
      {
        id: 21,
        text: "Political or cultural division within the congregation has made pastoral leadership feel impossible.",
      },
    ],
    scripture: {
      ref: "1 Peter 5:2--3",
      text: "Be shepherds of God's flock that is under your care, watching over them -- not because you must, but because you are willing, as God wants you to be; not pursuing dishonest gain, but eager to serve; not lording it over those entrusted to you, but being examples to the flock.",
    },
    recovery: {
      low: [
        "You are absorbing more congregational weight than any one person can carry. The first step is not a strategy -- it is a confession. Tell someone: 'I am drowning in this.' The weight of unprocessed criticism is cumulative and corrosive. It will compromise your preaching, your marriage, and your health if it is not addressed.",
        "Establish a twenty-four-hour rule for criticism: you do not respond to any critical email, conversation, or meeting for twenty-four hours. Not to be passive-aggressive. To allow your nervous system to exit fight-or-flight before you process the content. Most criticism loses its sting after a day. The criticism that does not is the criticism worth addressing.",
        "If political division has made your church ungovernable, recognize that this is not a failure of your leadership. It is the consequence of a culture that has made political identity more foundational than baptismal identity. Name it from the pulpit. Gently. Firmly. Without choosing a side. That is the prophetic task.",
      ],
      mid: [
        "You are managing congregational pressure but it is costing you more than it should. The key is not thicker skin -- it is better systems. Criticism should be processed through a team, not absorbed by one person. Build a leadership buffer.",
        "Have an honest conversation with your board about congregational expectations. If the expectation is that the pastor is available around the clock, that expectation must be named and corrected. It is not biblical. It is not sustainable. It is idolatry wearing a church-culture mask.",
        "Pick the one congregational dynamic that drains you most and develop a plan to address it -- not endure it, address it. Whether it is chronic complainers, boundary violators, or faction leaders, a clear strategy replaces the exhaustion of reactivity.",
      ],
      high: [
        "Your congregation dynamics are healthy. This usually means you have done the hard work of teaching expectations, establishing boundaries, and building a leadership culture that shares the pastoral load. Continue.",
        "Mentor other pastors in congregational leadership. The skills you have built are transferable and desperately needed.",
        "Do not mistake healthy dynamics for permanent dynamics. Congregations shift with culture, new members, and leadership transitions. Stay attentive.",
      ],
    },
  },
  {
    name: "Financial Stress",
    slug: "financial",
    description:
      "The money conversation the church refuses to have -- about the pastor's actual life.",
    questions: [
      {
        id: 22,
        text: "I am underpaid relative to my education, experience, and the cost of living in my area -- and I feel the weight of it daily.",
      },
      {
        id: 23,
        text: "Bivocational pressure -- either a second job or a spouse who must work to cover the gap -- compromises my ministry and my family.",
      },
      {
        id: 24,
        text: "Housing insecurity -- parsonage dependency, inability to build equity, or inadequate housing allowance -- adds chronic stress to my life.",
      },
    ],
    scripture: {
      ref: "1 Timothy 5:17--18",
      text: "The elders who direct the affairs of the church well are worthy of double honor, especially those whose work is preaching and teaching. For Scripture says, 'Do not muzzle an ox while it is treading out the grain,' and 'The worker deserves his wages.'",
    },
    recovery: {
      low: [
        "Financial stress in ministry is not a sign of insufficient faith. It is a sign of insufficient stewardship -- by the church, not by you. If your compensation is inadequate, prepare a clear, factual case for your board. Include cost-of-living data, denominational salary benchmarks, and the real budget your family operates on. This is not greed. It is obedience to the principle that the worker deserves his wages.",
        "If you are bivocational by necessity rather than calling, name the cost honestly. Bivocational ministry can be a gift when chosen. It is a burden when imposed by a church that can afford to pay a living wage and chooses not to. Know the difference.",
        "Seek confidential financial counseling. Many pastoral families carry debt, housing insecurity, and retirement anxiety in silence because financial struggle feels like spiritual failure. It is not. It is an economic reality that requires practical solutions, not more prayer about the same problem.",
      ],
      mid: [
        "Your financial situation is survivable but not sustainable. The difference matters over a career. A pastor who is financially anxious for twenty years will pay for it in health, marriage, and ministry effectiveness. Address the trajectory now.",
        "Have a transparent conversation with your board about pastoral compensation. Not your salary alone -- your total financial reality. Housing, retirement, health insurance, continuing education. Most board members have no idea what their pastor actually earns versus what their life actually costs.",
        "Build a personal emergency fund, even if it is twenty dollars a week. Financial margin is psychological margin. The pastor who knows he can survive a forced resignation makes better decisions than the pastor who cannot afford to lose his job.",
      ],
      high: [
        "Financial stability in pastoral ministry is uncommon and worth protecting. Continue to steward well, save deliberately, and refuse to let financial comfort dull your empathy for pastors who are struggling.",
        "Advocate for fair pastoral compensation in your denomination and network. Your financial health gives you a platform to speak on behalf of those who cannot.",
        "Model financial transparency with your board. When the pastor is open about money, it creates a culture where financial conversations are normal rather than adversarial.",
      ],
    },
  },
];

/* ── Scoring helpers ──────────────────────────────────────────── */

/*
  NOTE: Categories 2-4 (Emotional Reserves, Marriage Impact, Physical Health)
  and 5-8 (Isolation, Board/Elder, Congregation, Financial) use reverse-scored
  questions -- higher agreement = worse burnout. For those, we invert: 6 - value.
  Categories 1 (Calling Clarity) is positively worded -- higher agreement = healthier.
*/

const REVERSE_SCORED_IDS = new Set([
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24,
]);

function getAdjustedScore(answers: Record<number, number>, cat: Category): number {
  return cat.questions.reduce((sum, q) => {
    const raw = answers[q.id] || 0;
    return sum + (REVERSE_SCORED_IDS.has(q.id) ? 6 - raw : raw);
  }, 0);
}

function getScoreLevel(score: number, maxScore: number): string {
  const pct = score / maxScore;
  if (pct >= 0.8) return "healthy";
  if (pct >= 0.6) return "mid";
  return "low";
}

function getLevelLabel(level: string): string {
  if (level === "healthy") return "Healthy";
  if (level === "mid") return "Warning Signs";
  return "Significant Concern";
}

function getLevelColor(level: string): string {
  if (level === "healthy") return "#2D6A4F";
  if (level === "mid") return "var(--mustard)";
  return "#C0392B";
}

function getOverallBurnout(score: number): {
  label: string;
  color: string;
  description: string;
} {
  const pct = score / 120; // 24 questions * 5 max = 120
  if (pct >= 0.8)
    return {
      label: "Healthy Ministry",
      color: "#2D6A4F",
      description:
        "Your scores indicate a pastor who is doing the hard work of ministry from a place of genuine health. This does not mean the absence of difficulty -- it means you have built the structures, relationships, and disciplines that allow you to carry what ministry demands without being destroyed by it. The ongoing work is vigilance. Burnout rarely announces itself. It accumulates in the margins you stop protecting.",
    };
  if (pct >= 0.6)
    return {
      label: "Early Warning",
      color: "var(--mustard)",
      description:
        "Your results show a ministry under strain in specific areas. You are not in crisis, but you are closer than you think. The distance between early warning and active burnout is shorter than most pastors believe -- because the trajectory feels manageable until it is not. The categories where you scored lowest are not weaknesses to manage. They are fires to extinguish. Address them now, while you still have the capacity to do so.",
    };
  if (pct >= 0.4)
    return {
      label: "Active Burnout",
      color: "#E07A2F",
      description:
        "You are in active burnout. This is not a verdict on your faithfulness or your calling. It is a diagnosis of a system that has been drawing more from you than it has been giving back. Active burnout compromises every area of your life simultaneously -- your preaching, your marriage, your body, your faith. The most dangerous thing you can do right now is nothing. The second most dangerous thing is trying to fix everything at once. Pick the two lowest categories. Start there. Get help.",
    };
  return {
    label: "Crisis",
    color: "#C0392B",
    description:
      "Your scores indicate a level of depletion that requires immediate intervention -- not more effort, not a better strategy, intervention. Many pastors at this level have already considered leaving ministry. Some have considered worse. Hear this: you are not failing. You are drowning. And drowning people need rescue, not swimming lessons. Contact a pastoral crisis counselor today. Tell your spouse tonight. Call a trusted friend this week. The ministry can wait. You cannot.",
  };
}

/* ── Component ─────────────────────────────────────────────────── */

export default function PastorBurnout() {
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

  const getCategoryScore = (cat: Category) => getAdjustedScore(answers, cat);

  const totalScore = CATEGORIES.reduce(
    (sum, cat) => sum + getCategoryScore(cat),
    0
  );

  const overall = getOverallBurnout(totalScore);

  // Identify the 2-3 categories driving burnout (lowest scores)
  const categoryScores = CATEGORIES.map((cat) => ({
    cat,
    score: getCategoryScore(cat),
    level: getScoreLevel(getCategoryScore(cat), 15),
  })).sort((a, b) => a.score - b.score);

  const burnoutDrivers = categoryScores.filter(
    (c) => c.level === "low" || c.level === "mid"
  ).slice(0, 3);

  // "What to do this week" based on the worst areas
  const weeklyActions = [
    burnoutDrivers[0]
      ? `Address your lowest area -- ${burnoutDrivers[0].cat.name} -- by taking the first recovery step listed below. Not all three. The first one. Today.`
      : "Continue the practices that have kept you healthy. Review this assessment quarterly.",
    "Tell one person the truth about how you are doing. Not the edited version. The real one. A spouse, a counselor, a trusted pastor friend. Isolation is the accelerant of burnout.",
    "Block two hours this week that belong to no one but you and God. Not sermon prep. Not hospital visits. Not administrative catch-up. Two hours of rest, reflection, or silence. Guard them the way you would guard a meeting with your senior elder.",
  ];

  return (
    <Layout>
      <SEOMeta
        title="Pastor Burnout Diagnostic -- Assess Your Ministry Health"
        description="A 24-question pastoral burnout assessment across 8 critical categories. Honest results, specific recovery steps, and crisis resources for pastors."
        keywords="pastor burnout, pastoral burnout assessment, ministry burnout, pastor mental health, pastoral care, church leadership burnout, pastor stress"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Pastor Burnout Diagnostic",
          description:
            "A 24-question pastoral burnout assessment across calling clarity, emotional reserves, marriage, physical health, isolation, board relations, congregation dynamics, and financial stress.",
          url: "https://www.livewellbyjamesbell.co/tools/pastor-burnout",
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
            Pastor Burnout{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              Diagnostic
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
            Twenty-four statements across eight areas where pastoral ministry
            breaks down. Rate each honestly. Nobody sees this but you.
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
            <ToolActions toolName="Pastor Burnout Diagnostic" />

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
                YOUR BURNOUT ASSESSMENT
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

            {/* Burnout Signature */}
            {burnoutDrivers.length > 0 && (
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "2px",
                  padding: "36px 40px",
                  border: "1px solid var(--border)",
                  borderLeft: "4px solid #C0392B",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <AlertTriangle
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
                    YOUR BURNOUT SIGNATURE
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    marginBottom: "20px",
                  }}
                >
                  Every pastor's burnout has a shape. Yours is concentrated in{" "}
                  {burnoutDrivers.length === 1
                    ? burnoutDrivers[0].cat.name
                    : burnoutDrivers.length === 2
                      ? `${burnoutDrivers[0].cat.name} and ${burnoutDrivers[1].cat.name}`
                      : `${burnoutDrivers[0].cat.name}, ${burnoutDrivers[1].cat.name}, and ${burnoutDrivers[2].cat.name}`}
                  . These are not random. They are connected. Address the root
                  and the branches will respond.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {burnoutDrivers.map((d) => (
                    <span
                      key={d.cat.slug}
                      style={{
                        fontSize: "12px",
                        fontFamily: "var(--U)",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        color: getLevelColor(d.level),
                        padding: "6px 14px",
                        background:
                          d.level === "low"
                            ? "rgba(192,57,43,0.08)"
                            : "rgba(212,160,23,0.1)",
                        borderRadius: "2px",
                      }}
                    >
                      {d.cat.name} -- {d.score}/15
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* What To Do This Week */}
            <div
              style={{
                background: "var(--charcoal)",
                borderRadius: "2px",
                padding: "36px 40px",
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
                  marginBottom: "24px",
                }}
              >
                WHAT TO DO THIS WEEK
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {weeklyActions.map((action, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", gap: "16px" }}
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
                      {i + 1}
                    </span>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.8,
                        color: "var(--bone)",
                        fontFamily: "var(--B)",
                        margin: 0,
                        opacity: 0.9,
                      }}
                    >
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who To Call */}
            <div
              style={{
                background: "var(--card)",
                borderRadius: "2px",
                padding: "36px 40px",
                border: "1px solid var(--border)",
                marginBottom: "32px",
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
                <Phone
                  size={18}
                  style={{ color: "var(--mustard)", flexShrink: 0 }}
                />
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
                  WHO TO CALL
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  {
                    label: "Pastors Connection Network",
                    desc: "Confidential peer support, mentoring, and crisis referrals for pastors.",
                    href: "/pastors",
                  },
                  {
                    label: "Focus on the Family Clergy Care",
                    desc: "Free counseling consultation for pastors and their families.",
                    href: "https://www.focusonthefamily.com/get-help/clergy-care/",
                  },
                  {
                    label: "988 Suicide & Crisis Lifeline",
                    desc: "24/7 crisis support. Call or text 988. You are not alone.",
                    href: "tel:988",
                  },
                ].map((resource) => (
                  <a
                    key={resource.label}
                    href={resource.href}
                    target={
                      resource.href.startsWith("http") ||
                      resource.href.startsWith("tel:")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      resource.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 20px",
                      background: "var(--bone)",
                      borderRadius: "2px",
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
                          display: "block",
                          fontSize: "15px",
                          fontFamily: "var(--F)",
                          fontWeight: 500,
                          color: "var(--ink)",
                          marginBottom: "4px",
                        }}
                      >
                        {resource.label}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontFamily: "var(--U)",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {resource.desc}
                      </span>
                    </div>
                    <ChevronRight
                      size={16}
                      style={{ opacity: 0.4, flexShrink: 0 }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Per-Category Detailed Results */}
            {CATEGORIES.map((cat) => {
              const score = getCategoryScore(cat);
              const maxCatScore = 15;
              const level = getScoreLevel(score, maxCatScore);
              const levelLabel = getLevelLabel(level);
              const levelColor = getLevelColor(level);
              const recs = cat.recovery[level === "healthy" ? "high" : level];

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
                          level === "healthy"
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

                  {/* Scripture */}
                  <div
                    style={{
                      background: "var(--bone)",
                      padding: "20px 24px",
                      borderRadius: "2px",
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

                  {/* Recovery Recommendations */}
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
                    RECOVERY STEPS
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
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
              toolName="Pastor Burnout Diagnostic"
              resultsSummary={
                `Pastor Burnout Diagnostic Results\n\nOverall: ${totalScore}/120 (${overall.label})\n\n` +
                CATEGORIES.map(
                  (cat) => {
                    const score = getCategoryScore(cat);
                    const level = getScoreLevel(score, 15);
                    return `${cat.name}: ${score}/15 (${getLevelLabel(level)})`;
                  }
                ).join("\n") +
                (burnoutDrivers.length > 0
                  ? `\n\nBurnout Signature: ${burnoutDrivers.map((d) => `${d.cat.name} (${d.score}/15)`).join(", ")}`
                  : "")
              }
            />

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
                    FOR PASTORS
                  </div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--F)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    Resources, community, and support for pastoral ministry
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
                    Essays on pastoral ministry, leadership, and the cost of
                    calling
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
