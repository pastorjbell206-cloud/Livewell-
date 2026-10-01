import Layout from "@/components/Layout";
import { scrollBehavior } from "@/lib/motion";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import { useState, useRef, type CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight, Printer } from "lucide-react";
import { EmailResults } from "@/components/EmailResults";
import { Markdown } from "@/components/Markdown";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { SafetyCheck } from "@/components/SafetyCheck";
import { SelfCheckHistory } from "@/components/SelfCheckHistory";

/* ── Types ─────────────────────────────────────────────────────── */

interface Question {
  id: number;
  text: string;
}

/** The levels getScoreLevel computes for one area. */
type Level = "high" | "mid" | "low";

/** A specific live page from the Grow registry (never a generic library link). */
interface NextLink {
  label: string;
  href: string;
  /** Who the page is for, when that matters (safety first, or fit). */
  note?: string;
}

/** What one area's result means at one level, and what to do about it. */
interface AreaBand {
  /** 80 to 150 words, specific to this area at this level. Markdown: *italics* only. */
  interpretation: string;
  /** Two or three concrete steps. */
  steps: string[];
  /** Two or three pages that fit this area at this level. */
  links: NextLink[];
}

interface Category {
  name: string;
  slug: string;
  description: string;
  /** The passage this area of marriage grows from. Rendered as a reference
   *  that links to the full text — not an embedded quotation. */
  scripture: { ref: string };
  questions: Question[];
  /** One interpretation, set of steps, and set of links per level. */
  bands: Record<Level, AreaBand>;
}

/** One overall result band (thresholds live in getOverallLabel). */
interface OverallBand {
  label: string;
  color: string;
  /** 150 to 300 words: what it usually means, what it does not, why people
   *  land here, and what to do first. Paragraphs split on a blank line. */
  description: string;
  /** The lead-in to the eight-week plan, fitted to this band. */
  planLead: string;
  /** Where to start: safety first wherever it applies. */
  next: NextLink[];
}

/* ── Data ──────────────────────────────────────────────────────── */

const RATING_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const LEVEL_LABEL: Record<Level, string> = {
  high: "Strength",
  mid: "Growing",
  low: "Needs Attention",
};

/* Every href below is a literal so scripts/validate-grow-links.mjs can check
   it against the route table and the library manifests. */
const CATEGORIES: Category[] = [
  {
    name: "Communication",
    slug: "communication",
    scripture: { ref: "James 1:19" },
    description:
      "How well you and your spouse actually hear each other: not just the words, but what lives beneath them.",
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
        text: "I regularly share my fears, hopes, and emotional state with my spouse, not just logistics and schedules.",
      },
    ],
    bands: {
      low: {
        interpretation:
          "Talking with your spouse has become hard in the ways that matter most. Maybe you don't feel heard, or disagreements turn into attacks on who you are, or the two of you trade schedules and never what you fear or hope. If disagreeing with your spouse leaves you afraid of what they'll do, that isn't a communication problem to solve with better technique, so start with the marriage help page below. For couples who are safe with each other, this usually happens slowly, as painful conversations teach both people to stop trying, and it rarely means either of you has nothing left to say. The way back begins with listening, which is slower and harder than talking.",
        steps: [
          "Set aside fifteen minutes this evening with the phones in another room. Ask what the hardest part of your spouse's day was, and listen without fixing, defending, or correcting.",
          "When a conversation starts to heat up, slow it down with one sentence, *Help me understand what you mean*, and say back what you heard before you answer.",
        ],
        links: [
          { label: "My marriage is falling apart", href: "/help/marriage", note: "Start here if you're afraid of your spouse" },
          { label: "Talking with Your Spouse", href: "/wisdom/marriage-communication" },
          { label: "How to Have a Weekly Marriage Check-In", href: "/how-tos/marriage-how-to-weekly-check-in" },
        ],
      },
      mid: {
        interpretation:
          "Communication sits in the middle for you. You talk, some of it lands and some doesn't, and there are likely subjects the two of you have learned to step around. The basics are in place: on ordinary things, you can usually hear each other. What tends to go missing is the harder material, the fears, disappointments, and hopes that never come up because the day is full and raising them feels risky. At this stage it's easy to get good at hearing each other's news while missing each other's hearts. The next step is to go a little past the safe topics, gently and on purpose, and to listen longer than feels natural.",
        steps: [
          "Once this week, ask your spouse, *What's something you've wanted to tell me but haven't?* Then listen to the end without defending yourself.",
          "Catch yourself interrupting. You don't need to announce it; stop, let your spouse finish, and answer what they actually said.",
          "Start a short weekly check-in about the marriage itself: what went well between you, what hurt, and what each of you needs next week.",
        ],
        links: [
          { label: "How to Have a Weekly Marriage Check-In", href: "/how-tos/marriage-how-to-weekly-check-in" },
          { label: "Talking with Your Spouse", href: "/wisdom/marriage-communication" },
        ],
      },
      high: {
        interpretation:
          "Communication is a strength in your marriage. Your answers suggest you can disagree without attacking each other's character, and that you share more with each other than logistics. That comes from years of small decisions to listen when it was inconvenient, and it's a real gift. The danger at this level isn't collapse but complacency: couples who talk well can stop noticing the effort it takes and start assuming they already know what the other thinks. A strength like this is meant to be used. It gives you room to raise what scares you, the money question, the quiet disappointment, the trouble with family, knowing the marriage can bear the weight.",
        steps: [
          "Name one conversation you've both been avoiding and set a time for it this month. The trust you've built is what makes the hard subject safe to raise.",
          "Keep asking questions you think you know the answers to. People change, and a good listener keeps up.",
          "Consider walking a younger couple through a study on marriage. What comes naturally to you may be something they've never seen.",
        ],
        links: [
          { label: "How to Have the Money Conversation Without a War", href: "/how-tos/marriage-how-to-money-conversation" },
          { label: "Marriage: A Bible Study on Covenant Love", href: "/studyguides/marriage" },
        ],
      },
    },
  },
  {
    name: "Intimacy & Connection",
    slug: "intimacy",
    scripture: { ref: "Genesis 2:24" },
    description:
      "The distance between two people who share a house and two people who share a life.",
    questions: [
      {
        id: 4,
        text: "We regularly spend quality time together that is not centered on children, work, or obligations.",
      },
      {
        id: 5,
        text: "Physical affection (not just sex, but touch, closeness, presence) is a normal part of our daily life.",
      },
      {
        id: 6,
        text: "I feel emotionally close to my spouse, not just physically present in the same space.",
      },
    ],
    bands: {
      low: {
        interpretation:
          "Your answers describe distance: little time together that isn't about children, work, or chores, little touch, and the sense of sharing a house more than a life. One thing comes first. If sex has become something you're pressured or forced into, that isn't a closeness problem but a safety problem, and the marriage help page below is the place to start. Otherwise, distance like this tends to build quietly, through seasons of exhaustion, small hurts left unspoken, or a busyness that crowded out the two of you. It can feel like proof that love is gone, but distance and the end of love are different things, and closeness is rebuilt in small steps before large ones.",
        steps: [
          "Start with nearness before you expect closeness: sit on the same couch, take a short walk together, eat one meal a week without screens.",
          "Name the distance without blame. *I miss you* is an invitation, not an accusation, and your spouse may feel the gap as much as you do.",
          "If physical intimacy has stopped or become a transaction, talk with a counselor, and see a doctor if pain, medication, or exhaustion may be part of it.",
        ],
        links: [
          { label: "My marriage is falling apart", href: "/help/marriage", note: "Start here if you're pressured or afraid" },
          { label: "How to Love a Spouse Who Has Gone Cold", href: "/how-tos/marriage-how-to-love-a-cold-spouse" },
          { label: "What Does the Bible Say About Sex in Marriage?", href: "/life/the-marriage-bed" },
        ],
      },
      mid: {
        interpretation:
          "Connection comes and goes for you. There's affection and some time together, but weeks can pass with the two of you running the household side by side and rarely looking up. That's less a sign of trouble than a sign of a full life, since children, jobs, and fatigue take the hours that used to belong to the two of you. The spark hasn't necessarily gone anywhere. What this result says is that closeness now needs protecting on purpose instead of being left to take care of itself. Small, regular things matter more here than grand gestures, because what you practice every week is what you'll have in ten years.",
        steps: [
          "Protect one evening or morning a week for just the two of you, and keep it simple enough that it actually happens.",
          "Bring back ordinary touch that asks for nothing: a hand on the shoulder, sitting close, a longer hug at the door.",
          "Ask your spouse when they last felt truly close to you, and listen for what made that time different.",
        ],
        links: [
          { label: "How to Protect a Weekly Date Night", href: "/how-tos/marriage-how-to-protect-date-night" },
          { label: "What Does the Bible Say About Sex in Marriage?", href: "/life/the-marriage-bed" },
        ],
      },
      high: {
        interpretation:
          "Your answers describe real closeness: time together that isn't only about logistics, affection woven into ordinary days, and the sense of being known and not only accompanied. Genesis describes marriage as two becoming one flesh, and your answers suggest you know something of what that means in practice. Closeness like this grows from years of choosing each other in small ways, and it doesn't maintain itself. The seasons that test it are predictable enough to name now, while you're close: a new baby, illness, a demanding job, parents who need care. A connected marriage can bear more than a distant one; that's a mercy to be grateful for, not a reason to stop paying attention.",
        steps: [
          "If you share the faith, pray together briefly and honestly, even a few sentences side by side. There's a closeness in that nothing else gives.",
          "Before the next demanding season arrives, decide together how you'll protect your time with each other when it does.",
        ],
        links: [
          { label: "How to Pray Together as a Couple", href: "/how-tos/marriage-how-to-pray-together" },
          { label: "Closeness in Marriage", href: "/wisdom/marriage-intimacy" },
        ],
      },
    },
  },
  {
    name: "Trust & Security",
    slug: "trust",
    scripture: { ref: "Proverbs 31:11" },
    description:
      "Whether your marriage is a place where it is safe to be known fully, without editing.",
    questions: [
      {
        id: 7,
        text: "We are transparent with each other about finances: no hidden accounts, no secret spending, no financial decisions made alone.",
      },
      {
        id: 8,
        text: "I have complete confidence in my spouse's faithfulness, emotionally and physically.",
      },
      {
        id: 9,
        text: "I can be vulnerable with my spouse (admitting failure, weakness, or fear) without worrying it will be used against me later.",
      },
    ],
    bands: {
      low: {
        interpretation:
          "Trust between you is thin. You may doubt your spouse's faithfulness, feel that money is hidden from you or decided without you, or have learned that anything vulnerable you say can be used against you later. Before anything else: if you're afraid of your spouse, or your spouse controls the money, your phone, or who you see, that isn't a trust problem to fix by trying harder. Start with the marriage help page below. If you're safe, low trust usually has a history, a betrayal that came to light or small deceptions that piled up, and sometimes a wound older than this marriage. Trust isn't restored by promises. It's rebuilt slowly, by honesty that can be checked.",
        steps: [
          "If you're safe with each other and money has been hidden, bring every account, debt, and purchase into the open this week, with a pastor or counselor in the room if it's likely to be hard.",
          "If you've been betrayed, you don't owe anyone a quick recovery. Tell one trusted person the truth, and look for a counselor who works with couples after betrayal.",
          "If you're the one who broke trust, stop hiding, tell the whole truth once with help, and accept that trust returns on your spouse's timetable, not yours.",
        ],
        links: [
          { label: "My marriage is falling apart", href: "/help/marriage", note: "Safety first, then real help" },
          { label: "How Do You Heal After Betrayal by Someone Close?", href: "/life/betrayal-and-broken-trust" },
          { label: "How to Handle Money as a Couple", href: "/how-tos/wm-how-to-handle-money-as-a-couple" },
        ],
      },
      mid: {
        interpretation:
          "Your answers put trust somewhere in the middle. You aren't braced for betrayal, but you may hold some things back, keep a little distance around money, or wonder whether honesty will cost you later. If what holds you back is fear of how your spouse will react, read the marriage help page below before anything else. Otherwise, this usually means the foundation is there but not yet carrying its full weight, often because an old hurt was never fully repaired, or because one of you learned long before this marriage that being known is dangerous. None of this accuses your spouse. It asks whether you're trusting them or simply not distrusting them, which are different things.",
        steps: [
          "Share one thing you've been holding back, something modest, and notice how it's received. Trust grows when honesty is met with care.",
          "Once a month, talk about money starting with fears rather than numbers: what worries each of you, and what would help.",
        ],
        links: [
          { label: "My marriage is falling apart", href: "/help/marriage", note: "Read this first if you're afraid of how your spouse will react" },
          { label: "How to Have the Money Conversation Without a War", href: "/how-tos/marriage-how-to-money-conversation" },
          { label: "How Do You Heal After Betrayal by Someone Close?", href: "/life/betrayal-and-broken-trust", note: "If an old wound is why you hold back" },
        ],
      },
      high: {
        interpretation:
          "Yours is a marriage where it's safe to be known: open about money, confident in each other's faithfulness, and able to admit failure or fear without having it turned into a weapon later. That kind of trust is built by keeping small promises for years, telling the truth when a lie would have been easier, and forgiving without keeping a file. It's also more fragile than it feels, since one hidden thing can undo what took years to build. Trust at this level is something to guard, and something to pass on, especially to any children who are watching how the two of you treat each other.",
        steps: [
          "Keep money and devices open by habit, not because anyone asks. Openness practiced in good seasons is what carries you through hard ones.",
          "If you have children, let them see you apologize to each other and keep your word. They're learning from you what a safe home looks like.",
        ],
        links: [
          { label: "How Do You Build a Christian Home and Family?", href: "/life/the-home-and-the-family" },
          { label: "Marriage: A Bible Study on Covenant Love", href: "/studyguides/marriage" },
        ],
      },
    },
  },
  {
    name: "Shared Vision",
    slug: "vision",
    scripture: { ref: "Amos 3:3" },
    description:
      "Whether you are building the same life or merely living parallel ones under the same roof.",
    questions: [
      {
        id: 10,
        text: "My spouse and I share a clear, discussed vision for our future, not just assumptions about where we are headed.",
      },
      {
        id: 11,
        text: "We are aligned on how to raise our children (or how we think about family if we do not have children yet).",
      },
      {
        id: 12,
        text: "Our spiritual lives are shared: we pray, attend church, or discuss faith together, not just side by side.",
      },
    ],
    bands: {
      low: {
        interpretation:
          "Your answers suggest the two of you are living parallel lives under one roof, with little shared sense of where you're headed, real differences about children or family, and faith lived separately if at all. That rarely happens by choice. Assumptions made early in the marriage went untested while jobs, children, and years changed you both, and nobody stopped to talk about it. Parenting disagreements in particular tend to be disagreements about values underneath, about what kind of adults you're trying to raise. A low score here doesn't mean you want incompatible lives. It means you haven't yet said out loud, to each other and in the same room, what you want.",
        steps: [
          "Sit down this week with one question: *What do we want our life to look like in five years?* Write your answers separately first, then compare them without arguing.",
          "If you both follow Christ, begin praying together, even one sentence each. If your spouse doesn't share your faith, don't make prayer a test; pray for them, and share the life you can share.",
          "When you disagree about the children, talk about what you hope they become before you talk about bedtimes and rules.",
        ],
        links: [
          { label: "How to Have a Weekly Marriage Check-In", href: "/how-tos/marriage-how-to-weekly-check-in" },
          { label: "How to Pray Together as a Couple", href: "/how-tos/marriage-how-to-pray-together" },
          { label: "How Do You Build a Christian Home and Family?", href: "/life/the-home-and-the-family" },
        ],
      },
      mid: {
        interpretation:
          "You and your spouse agree on some of what you're building and differ on some of it, or you talked about the future once and haven't since. Couples at this level usually share a direction in broad strokes while one area, whether children, money, or faith, has drifted onto separate tracks. None of this is cause for alarm. What it does suggest is that the places where your hopes differ haven't had enough honest conversation, and differences left unspoken tend to harden with time. The next step is modest and specific: find the one place where your hopes differ most, and give it a real conversation rather than an argument.",
        steps: [
          "Name the area where your hopes differ most and set aside an unhurried evening for it, aiming to understand rather than to win.",
          "Write three plain sentences together about what your family is for, and put them somewhere you'll both see them.",
          "If your faith runs on parallel tracks, choose one practice to share: a short prayer at dinner, a psalm before bed, or a conversation after church about what you heard.",
        ],
        links: [
          { label: "How Do You Build a Christian Home and Family?", href: "/life/the-home-and-the-family" },
          { label: "How do I know what God wants me to do?", href: "/help/decisions", note: "For a decision you're weighing together" },
        ],
      },
      high: {
        interpretation:
          "You and your spouse are building the same life: a future you've actually discussed, broad agreement about children and family, and a faith you share instead of practicing side by side. That belongs to couples who keep talking about where they're headed rather than assuming it, and it steadies a marriage through a great deal. It won't spare you disagreements, and the vision that fit you at thirty may not fit at fifty, so it has to be revisited as children grow, work changes, and parents age. Its best use is practical: bringing each big decision, a move, a job, a major purchase, back to what you've said you're building together.",
        steps: [
          "Set a yearly time to revisit where you're headed, and ask what has changed in each of you since the last time.",
          "Before either of you commits to a major decision, talk it through against what you've said you're building, and pray over it together.",
          "Tell a younger couple how you learned to talk about the future. Your way of getting there may help them more than your conclusions.",
        ],
        links: [
          { label: "How do I know what God wants me to do?", href: "/help/decisions" },
          { label: "Marriage: A Bible Study on Covenant Love", href: "/studyguides/marriage" },
        ],
      },
    },
  },
  {
    name: "Conflict Resolution",
    slug: "conflict",
    scripture: { ref: "Ephesians 4:26" },
    description:
      "Not whether you fight, since every marriage does, but whether you fight in a way that leaves the marriage stronger or weaker.",
    questions: [
      {
        id: 13,
        text: "When we argue, we fight about the issue at hand, not every grievance from the last ten years.",
      },
      {
        id: 14,
        text: "After a serious conflict, we repair: we come back together, acknowledge what happened, and reconnect.",
      },
      {
        id: 15,
        text: "Forgiveness in our marriage is real: not just words spoken to end the tension, but genuine release of the offense.",
      },
    ],
    bands: {
      low: {
        interpretation:
          "Conflict is doing damage in your marriage. Old grievances come back into new arguments, fights end without repair, or forgiveness gets spoken without being settled. If your fights include threats, intimidation, breaking things, or any physical harm, or you're afraid of what your spouse will do, that isn't a conflict to resolve. It's a safety problem, and the marriage help page below comes before anything else here. Where both of you are safe, this pattern usually grows from hurts that were never repaired and so keep getting argued again. You've learned how to fight without learning how to come back, and coming back can be learned.",
        steps: [
          "If your spouse is afraid of you, or your anger has frightened anyone at home, get help for that first, from a counselor who works with anger and abuse rather than a couples counselor.",
          "If you're safe with each other, stop an argument that starts circling, agree on a time to come back to it, such as tomorrow at eight, and keep that time. Stay on one subject when you return.",
          "Stop bringing old grievances into new fights. If a past hurt keeps returning, it isn't finished; take it to a counselor or pastor on its own.",
        ],
        links: [
          { label: "My marriage is falling apart", href: "/help/marriage", note: "Start here if a fight has ever made you afraid" },
          { label: "How to Repair After a Blowup", href: "/how-tos/marriage-how-to-repair-after-blowup" },
          { label: "I can't forgive them", href: "/help/cant-forgive", note: "When a wrong stands between you and won't let go" },
        ],
      },
      mid: {
        interpretation:
          "You fight, you mostly recover, and sometimes an old hurt slips back into a new argument or an apology gets said without quite being meant. That usually means the two of you manage conflict better than you resolve it. Managed conflict goes quiet; resolved conflict stays settled. The difference is repair: coming back after the heat, owning your part without a counter-accusation, and actually releasing the offense instead of storing it. Nothing in this result is beyond you, and this is a good level at which to learn repair, while there's still plenty of goodwill between you.",
        steps: [
          "After your next argument, try a plain repair: *Here's what I did. Here's why it was wrong. Here's what I'll do differently.* Leave out *but you also*.",
          "If you've said *I forgive you* and keep bringing it up, say so honestly. Half-finished forgiveness is human, and it still needs finishing.",
          "If you're safe with each other, work through the one argument that keeps coming back using the conflict guide, a step at a time.",
        ],
        links: [
          { label: "Conflict Resolution Guide", href: "/tools/conflict-guide", note: "For couples who are safe with each other" },
          { label: "How to Actually Forgive Your Spouse", href: "/how-tos/marriage-how-to-actually-forgive" },
          { label: "How Do You Handle Conflict and Truly Reconcile?", href: "/life/conflict-and-reconciliation" },
        ],
      },
      high: {
        interpretation:
          "You know how to fight and come back. You tend to stay on the subject at hand, you repair after serious fights, and forgiveness between you is real rather than a way to end the tension. That comes from two people who have each learned to say *I was wrong* without adding a qualifier, and it's a hard-won skill. The risk here is subtle: good resolution can slide into avoiding conflict altogether to protect the peace, and a quiet house isn't always a settled one. Keep having the honest conversations. Your ability to repair is exactly what makes it safe to disagree.",
        steps: [
          "If you have children, let them see the reconciliation even when they didn't see the argument. They need to know that people who love each other come back.",
          "Once a month, ask each other whether anything has gone unsaid. Peace kept by silence isn't the same as peace.",
        ],
        links: [
          { label: "How Do You Handle Conflict and Truly Reconcile?", href: "/life/conflict-and-reconciliation" },
          { label: "Forgiveness: A Bible Study on the Hardest Word", href: "/studyguides/forgiveness" },
        ],
      },
    },
  },
];

function getScoreLevel(score: number, maxScore: number): Level {
  const pct = score / maxScore;
  if (pct >= 0.8) return "high";
  if (pct >= 0.5) return "mid";
  return "low";
}

const OVERALL_BANDS: Record<"strong" | "growing" | "attention" | "strain", OverallBand> = {
  strong: {
    label: "Strong",
    color: "var(--ok)",
    description:
      "You agreed with most of these fifteen statements. That usually means the two of you have built habits that hold: you listen to each other, you find your way back after a fight, and there's enough trust between you to tell the truth. Habits like that are built one ordinary day at a time by two people who keep choosing each other, and they're worth naming with gratitude instead of taking for granted.\n\nA strong score doesn't mean the marriage has no hard places, and it doesn't mean your spouse would answer the same way. One area can sit low even when the total is high, so read the breakdown below slowly. Some couples land here because the marriage is young and hasn't yet been tested by children, money, illness, or grief. Others land here after years of repairing what broke. And sometimes a high score carries a little hope in it, the way any of us answers for the marriage we mean to have. None of that is a failure, but all of it is a reason to keep tending what you've been given.\n\nStart with your lowest area, even if it's only a little lower than the rest, and talk about it together this week. Guard a regular time to talk about the marriage itself and not only the calendar. And ask whether your steadiness could help a younger or struggling couple, because a marriage that's doing well has something to give away.",
    planLead:
      "A strong marriage still needs tending. The eight-week plan gives the two of you one small practice a week for keeping what you've built.",
    next: [
      { label: "How to Have a Weekly Marriage Check-In", href: "/how-tos/marriage-how-to-weekly-check-in" },
      { label: "Marriage: A Bible Study on Covenant Love", href: "/studyguides/marriage", note: "Five sessions, good to share with another couple or a small group" },
      { label: "How to Pray Together as a Couple", href: "/how-tos/marriage-how-to-pray-together" },
    ],
  },
  growing: {
    label: "Growing",
    color: "var(--mustard)",
    description:
      "Your answers lean toward agreement, with real hesitation in places. That usually means the marriage has genuine strengths alongside a few areas where the two of you have drifted, stalled, or stopped talking about something that matters. It's a sturdy place to stand and a poor place to settle, because the drift that brings a marriage here doesn't stop on its own.\n\nA result in this range doesn't mean your marriage is in trouble, and it doesn't mean you married the wrong person. It means ordinary life has been crowding the marriage, which is what ordinary life does. The reasons are rarely dramatic: small children or demanding work, money pressure, a tiredness that never quite lifts, or an old hurt that was smoothed over instead of repaired. The breakdown below will show you which area has been quietly paying for the others.\n\nStart with the area where your score is lowest, and resist the urge to fix everything at once. Choose one conversation for this week, set a time for it, and keep it. A short weekly check-in about the marriage itself, rather than the schedule, will do more over a year than one dramatic talk. If the same argument keeps coming back, the conflict guide below can give it a shape, as long as the two of you are safe with each other.",
    planLead:
      "A score is a snapshot. A path is what changes things: eight weeks toward each other, one small practice at a time.",
    next: [
      { label: "How to Have a Weekly Marriage Check-In", href: "/how-tos/marriage-how-to-weekly-check-in" },
      { label: "Conflict Resolution Guide", href: "/tools/conflict-guide", note: "For couples who are safe with each other" },
      { label: "Talking with Your Spouse", href: "/wisdom/marriage-communication" },
    ],
  },
  attention: {
    label: "Needs Attention",
    color: "var(--strain)",
    description:
      "Taken together, your answers fall between disagreeing and neutral. That usually means several parts of the marriage are under strain at once, and that you've felt it for a while, even if you haven't said it out loud. Taking this self-check was a way of saying it, and that counts for something.\n\nThis result isn't a prediction, and it can't tell you whose fault this is or how your spouse would answer. People come to this point by different roads. For some it's years of living as roommates who run a household; for others it's the same fight repeating for months, or a hurt that never got repaired. A hard season can do it too: a new baby, a lost job, an illness, a parent who needs care. Exhaustion, grief, or depression in either of you can drain the warmth out of a marriage as well, and a doctor can help you tell whether that's part of it.\n\nIf you're afraid of your spouse, or your spouse controls your money, your phone, or who you see, start with safety before anything else here: the marriage help page below lists the National Domestic Violence Hotline near the top. If you're safe with each other, don't try to fix everything at once. Tell one trusted person the truth this week, pick the area with the lowest score, and call a licensed counselor now, while there's still warmth to build on.",
    planLead:
      "When you're ready for a path, the eight-week plan gives the two of you one small practice a week. It works best alongside the conversation you start this week, and alongside a counselor if you've called one.",
    next: [
      { label: "My marriage is falling apart", href: "/help/marriage", note: "Safety first, then real help, including how to find a counselor" },
      { label: "How to Know When to Get Help", href: "/how-tos/marriage-how-to-know-when-to-get-help" },
      { label: "Conflict Resolution Guide", href: "/tools/conflict-guide", note: "For couples who are safe with each other" },
    ],
  },
  strain: {
    label: "Under Heavy Strain",
    color: "var(--alert)",
    description:
      "You disagreed with most of these fifteen statements. That usually means the marriage is hurting in more than one place at once: you feel far from each other, fights don't get repaired, or trust has worn thin, and you may have been carrying it alone for a long time. Answering honestly took courage.\n\nIf you're afraid of your spouse, or your spouse threatens you, hurts you, or controls your money, your phone, or who you see, that comes first, before any question about the marriage and before anyone asks you to try harder. Start with the marriage help page below. It lists the National Domestic Violence Hotline near the top, and they answer at any hour.\n\nThis result isn't a prediction, and it isn't a verdict on you or on your spouse. It's one person's answers on one day, and your spouse might answer differently. People come to this point by different roads: a long drift that hardened into a wall, a betrayal that came to light, an addiction, or the slow weight of illness, grief, or depression on one or both of you.\n\nIf you're safe, talk to a real person this week, before any practice or plan. Call a licensed counselor who works with couples, and go alone if your spouse won't come. Tell a pastor who knows you what's actually happening. If you've stopped sleeping, eating, or working normally, see a doctor as well. Big decisions about the marriage belong with those people, not with a score.",
    planLead:
      "Once you're safe with each other and someone is walking with you, the eight-week plan can give you one small practice a week. It's a companion to counseling, not a replacement for it.",
    next: [
      { label: "My marriage is falling apart", href: "/help/marriage", note: "Start here, especially if you're afraid" },
      { label: "How to Know When to Get Help", href: "/how-tos/marriage-how-to-know-when-to-get-help" },
      { label: "I can't forgive them", href: "/help/cant-forgive", note: "If a wrong stands between you" },
    ],
  },
};

function getOverallLabel(score: number): OverallBand {
  const pct = score / 75;
  if (pct >= 0.8) return OVERALL_BANDS.strong;
  if (pct >= 0.6) return OVERALL_BANDS.growing;
  if (pct >= 0.4) return OVERALL_BANDS.attention;
  return OVERALL_BANDS.strain;
}

/* ── Result rendering helpers ──────────────────────────────────── */

const eyebrowHeading: CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--mustard-text)",
  fontFamily: "var(--U)",
  margin: "28px 0 12px",
};

/** Band copy through the shared renderer, so words people say can be italic. */
function Prose({ text, size = 16, gap = 14 }: { text: string; size?: number; gap?: number }) {
  return (
    <Markdown
      components={{
        p: ({ children }) => (
          <p
            style={{
              fontSize: `${size}px`,
              lineHeight: 1.75,
              color: "var(--ink)",
              fontFamily: "var(--B)",
              margin: `0 0 ${gap}px`,
              maxWidth: "65ch",
            }}
          >
            {children}
          </p>
        ),
      }}
    >
      {text}
    </Markdown>
  );
}

function NextLinks({ links }: { links: NextLink[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {links.map((l) => (
        <li key={l.href} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6 }}>
          <Link
            href={l.href}
            style={{
              fontFamily: "var(--U)",
              fontWeight: 600,
              color: "var(--mustard-text)",
              textDecoration: "none",
              borderBottom: "1px solid var(--mustard)",
            }}
          >
            {l.label}
          </Link>
          {l.note && (
            <span style={{ display: "block", fontSize: "14px", color: "var(--ink-muted)", marginTop: "2px" }}>
              {l.note}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ── Saved progress (HS-5): survive a refresh mid-assessment ───── */

const STORAGE_KEY = "livewell-progress-marriage-assessment";

interface StoredProgress {
  answers: Record<number, number>;
  step: number;
  savedAt: string;
}

function isStoredProgress(x: unknown): x is StoredProgress {
  if (typeof x !== "object" || x === null) return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.step === "number" &&
    Number.isFinite(p.step) &&
    typeof p.savedAt === "string" &&
    typeof p.answers === "object" &&
    p.answers !== null &&
    !Array.isArray(p.answers) &&
    Object.values(p.answers).every((v) => typeof v === "number")
  );
}

/* ── Component ─────────────────────────────────────────────────── */

export default function MarriageAssessment() {
  const [saved] = useState(() =>
    readStoredJSON<StoredProgress | null>(STORAGE_KEY, isStoredProgress, null),
  );
  const [currentCategory, setCurrentCategory] = useState(() =>
    saved
      ? Math.min(Math.max(Math.trunc(saved.step), 0), CATEGORIES.length - 1)
      : 0,
  );
  const [answers, setAnswers] = useState<Record<number, number>>(
    saved?.answers ?? {},
  );
  const [showResults, setShowResults] = useState(false);
  const [resumed, setResumed] = useState(
    () =>
      saved !== null &&
      (Object.keys(saved.answers).length > 0 || saved.step > 0),
  );
  const [persistFailed, setPersistFailed] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const persist = (nextAnswers: Record<number, number>, nextStep: number) => {
    setPersistFailed(
      !writeStoredJSON(STORAGE_KEY, {
        answers: nextAnswers,
        step: nextStep,
        savedAt: new Date().toISOString(),
      }),
    );
  };

  const category = CATEGORIES[currentCategory];
  const totalQuestions = 15;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const canProceed = category.questions.every((q) => answers[q.id] !== undefined);
  const isLastCategory = currentCategory === CATEGORIES.length - 1;
  const allAnswered = answeredCount === totalQuestions;

  const handleRate = (questionId: number, value: number) => {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    setResumed(false);
    persist(next, currentCategory);
  };

  const handleNext = () => {
    if (isLastCategory && allAnswered) {
      setShowResults(true);
      persist(answers, currentCategory);
      setTimeout(() => {
        resultsRef.current?.focus({ preventScroll: true });
        resultsRef.current?.scrollIntoView({ behavior: scrollBehavior() });
      }, 100);
    } else if (!isLastCategory) {
      const nextStep = currentCategory + 1;
      setCurrentCategory(nextStep);
      persist(answers, nextStep);
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    }
  };

  const handleBack = () => {
    if (currentCategory > 0) {
      const prevStep = currentCategory - 1;
      setCurrentCategory(prevStep);
      persist(answers, prevStep);
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    }
  };

  const handleRestart = () => {
    removeStoredJSON(STORAGE_KEY);
    setAnswers({});
    setCurrentCategory(0);
    setShowResults(false);
    setResumed(false);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleChangeAnswers = () => {
    setShowResults(false);
    setCurrentCategory(0);
    setResumed(false);
    persist(answers, 0);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
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
        title="Marriage Health Self-Check: A Private Look at Your Marriage"
        description="Fifteen statements across communication, intimacy, trust, shared vision, and conflict. A private self-check for reflection, with honest next steps and safety first."
        keywords="marriage self-check, marriage assessment, marriage health, how healthy is my marriage, Christian marriage help, marriage counseling"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marriage Health Self-Check",
          description:
            "A private self-check for reflection: fifteen statements across five areas of marriage, with specific next steps and safety first.",
          url: "https://www.livewellbyjamesbell.co/tools/marriage-assessment",
          applicationCategory: "LifestyleApplication",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--charcoal-fg)",
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
              Self-Check
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
            Fifteen statements across five areas of marriage, about five
            minutes. This is a self-check for reflection, not a test or a
            diagnosis, and your answers stay on this device unless you choose
            to leave a copy with us at the end. Answer for yourself, as things
            are now rather than as you wish they were.
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
                  onClick={() => {
                    setCurrentCategory(i);
                    persist(answers, i);
                  }}
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
                    padding: "7px",
                    boxSizing: "content-box",
                    backgroundClip: "content-box",
                  }}
                  aria-label={`Go to ${cat.name}`}
                  aria-current={i === currentCategory ? "step" : undefined}
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
            {resumed && (
              <div
                className="no-print"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "28px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--U)",
                    color: "var(--ink-muted)",
                  }}
                >
                  Picked up where you left off.
                </span>
                <button
                  onClick={handleRestart}
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--U)",
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    background: "none",
                    color: "var(--ink-muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Start fresh
                </button>
              </div>
            )}
            {persistFailed && (
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "var(--U)",
                  color: "var(--ink-muted)",
                  margin: "0 0 28px",
                }}
              >
                Couldn't save to this browser — your work here will not survive
                a reload.
              </p>
            )}
            {/* Category Header */}
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "var(--mustard-text)",
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
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  color: "var(--ink-muted)",
                  marginTop: "12px",
                }}
              >
                Anchored in{" "}
                <Link
                  href={`/theology/passage?ref=${encodeURIComponent(category.scripture.ref)}`}
                  style={{
                    color: "var(--mustard-text)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--mustard)",
                  }}
                >
                  {category.scripture.ref}
                </Link>
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
                        color: "var(--mustard-text)",
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
                          aria-pressed={isSelected}
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
                disabled={isLastCategory ? !allAnswered : !canProceed}
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
          tabIndex={-1}
          role="region"
          aria-label="Your marriage health results"
          style={{ padding: "48px 32px 80px", background: "var(--bone)", outline: "none" }}
        >
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <ToolActions toolName="Marriage Health Self-Check" onStartOver={handleRestart} />
            <SafetyCheck />
            <SelfCheckHistory
              id="marriage"
              total={totalScore / (CATEGORIES.reduce((n, c) => n + c.questions.length, 0) * 5)}
              areas={Object.fromEntries(CATEGORIES.map((c) => [c.name, getCategoryScore(c) / (c.questions.length * 5)]))}
              answersKey={JSON.stringify(answers)}
            />
            {persistFailed && (
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "var(--U)",
                  color: "var(--ink-muted)",
                  margin: "0 0 28px",
                }}
              >
                Couldn't save to this browser — your work here will not survive
                a reload.
              </p>
            )}

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
                  color: "var(--mustard-text)",
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
              <div style={{ maxWidth: "62ch", margin: "0 auto", textAlign: "left" }}>
                <Prose text={overall.description} />
                <h3 style={eyebrowHeading}>Where to start</h3>
                <NextLinks links={overall.next} />
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.6,
                    fontFamily: "var(--U)",
                    color: "var(--ink-muted)",
                    margin: "24px 0 0",
                  }}
                >
                  A self-check is for reflection. It isn't counseling, and it
                  isn't medical, legal, or financial advice.
                </p>
              </div>
            </div>

            {/* Eight-Week Plan CTA */}
            <div
              style={{
                background: "var(--card)",
                borderRadius: "2px",
                padding: "36px 40px",
                border: "1px solid var(--border)",
                borderTop: "4px solid var(--mustard)",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "var(--mustard-text)",
                  fontFamily: "var(--U)",
                  marginBottom: "12px",
                }}
              >
                AN EIGHT-WEEK PLAN
              </div>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "var(--ink)",
                  fontFamily: "var(--B)",
                  maxWidth: "60ch",
                  margin: "0 0 20px",
                }}
              >
                {overall.planLead}
              </p>
              <Link
                href="/plans/marriage"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "44px",
                  padding: "12px 28px",
                  background: "var(--mustard)",
                  color: "var(--ink)",
                  borderRadius: "2px",
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Start the eight-week plan
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Score Bar Overview */}
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
                  color: "var(--mustard-text)",
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
                      ? "var(--ok)"
                      : level === "mid"
                        ? "var(--mustard)"
                        : "var(--alert)";
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

            {/* Per-area interpretation: the band that matches the reader's level */}
            {CATEGORIES.map((cat) => {
              const score = getCategoryScore(cat);
              const maxCatScore = 15;
              const level = getScoreLevel(score, maxCatScore);
              const band = cat.bands[level];
              const levelColor =
                level === "high"
                  ? "var(--ok)"
                  : level === "mid"
                    ? "var(--mustard-text)"
                    : "var(--alert)";

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
                      marginBottom: "16px",
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
                            ? "var(--ok-bg)"
                            : level === "mid"
                              ? "var(--bone-warm)"
                              : "var(--alert-bg)",
                        borderRadius: "2px",
                      }}
                    >
                      {LEVEL_LABEL[level].toUpperCase()} · {score}/{maxCatScore}
                    </span>
                  </div>

                  <Prose text={band.interpretation} />

                  <h4 style={eyebrowHeading}>What to do</h4>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {band.steps.map((step, i) => (
                      <li
                        key={i}
                        style={{
                          paddingLeft: "20px",
                          borderLeft: "2px solid var(--bone-warm)",
                        }}
                      >
                        <Prose text={step} size={15} gap={0} />
                      </li>
                    ))}
                  </ul>

                  <h4 style={eyebrowHeading}>Go further</h4>
                  <NextLinks links={band.links} />
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
                  color: "var(--charcoal-fg)",
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
                onClick={handleChangeAnswers}
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
                Change my answers
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
                Retake the self-check
              </button>
            </div>

            {/* Email Results */}
            <EmailResults
              toolName="Marriage Health Self-Check"
              resultsSummary={
                `Marriage Health Self-Check Results\n\nOverall: ${totalScore}/75 (${overall.label})\n\n` +
                CATEGORIES.map(
                  (cat) =>
                    `${cat.name}: ${getCategoryScore(cat)}/15 (${LEVEL_LABEL[getScoreLevel(getCategoryScore(cat), 15)]})`
                ).join("\n")
              }
            />

            {/* Next Step CTA */}
            <a
              href="/pathways/marriage"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--charcoal)",
                color: "var(--charcoal-fg)",
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
                  READ FURTHER
                </div>
                <span
                  style={{
                    fontSize: "18px",
                    fontFamily: "var(--F)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  Marriage, Past the Tips: four essays and a study, read in order
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

      {/* Tool-to-book bridge (QW-17): invitation register, never pressure. */}
      <section style={{ background: "var(--bone-warm)", padding: "56px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "16px" }}>GO DEEPER</p>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "56ch", margin: "0 auto 22px" }}>
            If this self-check named something you already knew was there, the long read goes further. <em>Why Do Marriages Drift Apart, and How Do You Stop It?</em> works through covenant, conflict, money, and desire, and why marriage is a promise, not a deal.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/life/marriage-the-long-covenant" style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", background: "var(--ink)", padding: "12px 22px", borderRadius: "3px", textDecoration: "none" }}>Read about marriage as covenant</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
