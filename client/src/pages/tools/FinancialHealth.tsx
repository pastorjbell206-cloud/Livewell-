import Layout from "@/components/Layout";
import { scrollBehavior } from "@/lib/motion";
import { SEOMeta } from "@/components/SEOMeta";
import ScriptureNote from "@/components/ScriptureNote";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SafetyCheck } from "@/components/SafetyCheck";
import { SelfCheckHistory } from "@/components/SelfCheckHistory";
import { toolById } from "@/lib/toolsList";
import { CheckPart, focusResultTop, ResultActions, ResultNext, ResultReading, ResultSection, SAVE_FAILED, ScoreChart, ToolHead, useToolProgress } from "@/components/tool-shell";

/* ── Types ─────────────────────────────────────────────────────── */

interface Question {
  id: number;
  text: string;
}

/** The three levels getScoreLevel computes for an area. */
type Level = "high" | "mid" | "low";

/** A live page on this site, named by its own title. */
interface NextStep {
  kind: string;
  title: string;
  href: string;
}

/** What one level of one area means, and what to do about it. */
interface LevelGuide {
  /** 80 to 150 words, specific to this area at this level. */
  interpretation: string;
  /** Two or three concrete steps. */
  steps: string[];
  /** Live pages that fit this area at this level. */
  next: NextStep[];
}

interface Category {
  name: string;
  slug: string;
  description: string;
  /** Berean Standard Bible, verbatim from `node scripts/bsb.mjs "<ref>"`. */
  scripture: { text: string; reference: string };
  questions: Question[];
  levels: Record<Level, LevelGuide>;
}

/* ── Data ──────────────────────────────────────────────────────── */

const RATING_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

/**
 * Every level of every area has its own reading, its own steps, and its own
 * next steps (docs/grow/GROW-PROMPT.md 7.2). Words a reader might say or
 * think are marked *like this* and set in italics; double quotation marks
 * belong to Scripture alone. Nothing here may promise that giving is repaid
 * with wealth.
 */
const CATEGORIES: Category[] = [
  {
    name: "Generosity",
    slug: "generosity",
    description:
      "Whether your money flows outward or only circles back to yourself. Generosity is not a financial strategy. It is a declaration about who you believe actually owns what you have.",
    scripture: {
      text: "Each one should give what he has decided in his heart to give, not out of regret or compulsion. For God loves a cheerful giver.",
      reference: "2 Corinthians 9:7",
    },
    questions: [
      {
        id: 1,
        text: "I give to my church or to others in need first, before other spending, rather than from whatever is left over.",
      },
      {
        id: 2,
        text: "When I encounter an unexpected need (a friend in crisis, a stranger in want), I respond with generosity rather than calculation.",
      },
      {
        id: 3,
        text: "I am generous with my time and skills, not only my money: volunteering, mentoring, serving without expectation of return.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "Giving is a settled part of your life. You decide it before other spending instead of hoping something is left, you tend to meet a sudden need with an open hand, and your time and skills are part of what you give. That usually comes from years of practice more than from a generous temperament. Giving isn't a technique for getting, and anyone who promises that your gift will come back to you as money is selling a formula, not the gospel. The quieter risks at this level are two: coming to think of yourself as *a generous person* rather than someone who has been given much, and giving freely to the people and causes you like while passing over the ones you don't.",
        steps: [
          "Name the kind of need you tend to pass over, whether a person, a cause, or a part of town, and give there once this month.",
          "Teach one person how you started, with the real number and the real fear, not only the principle. Many people want to give and don't know where to begin.",
          "Give one gift this year in secret, with no one told, the way Jesus describes in Matthew 6:3-4.",
        ],
        next: [
          { kind: "How-to", title: "How to Care for the Poor Without Condescension", href: "/how-tos/world-how-to-care-for-the-poor-without-condescension" },
          { kind: "Study guide", title: "Generosity: A Bible Study on Giving", href: "/studyguides/generosity" },
          { kind: "Wisdom", title: "Justice and the Poor", href: "/wisdom/justice-and-the-poor" },
        ],
      },
      mid: {
        interpretation:
          "You give, and some of your answers show it clearly, but giving isn't settled yet. It may happen when something is left at the end of the month, or when a need moves you, or mostly with money and rarely with time. That's common, and it isn't stinginess. Generosity tends to grow unevenly: people who give money easily can guard their time, and people who serve freely can find writing a check frightening. At this level giving usually still depends on how you feel in the moment. The next step isn't a bigger number so much as a decided one, set before the month begins, so each gift no longer has to win an argument with your fear.",
        steps: [
          "Decide one amount and give it first, the day your income arrives, for the next three months. Keep it small enough to be real.",
          "Choose the kind of giving that costs you more, money or time, and do one thing there this month: a meal, an afternoon, a bill paid for someone who can't pay you back.",
          "Notice what you feel as a gift leaves your hands. If it's fear, name it to God in prayer; it shows you where money still has a hold.",
        ],
        next: [
          { kind: "Life", title: "Why Should Christians Give Their Money Away?", href: "/life/generosity-and-the-open-hand" },
          { kind: "Wisdom", title: "Generosity and Giving", href: "/wisdom/generosity-and-giving" },
          { kind: "Wisdom", title: "Generosity with Time", href: "/wisdom/generosity-with-time" },
        ],
      },
      low: {
        interpretation:
          "Giving isn't much a part of your life right now, and this self-check can't tell you why. For some people the reason is fear: there never seems to be enough to spare, and sometimes there truly isn't. For others it's a habit that never formed because no one showed them how, or a quiet sense that what they have is theirs because they earned it. None of that makes you a bad person, and giving is not a fee for God's approval. But Jesus spoke of money as a rival master (Matthew 6:24), and giving is one of the plainest ways to loosen its grip. If money is very tight, start small and start real. A small gift is not a lesser gift, and no one should pressure you to give away what your household needs to live on.",
        steps: [
          "Choose a small, specific amount you can give without taking from what your household needs, and give it to your church or to someone in need each week for a month. Then notice what it does in you.",
          "Ask what keeps your hand closed: fear of not having enough, the sense that you earned it, or never having been shown how. Each calls for a different next step, and naming it is the first.",
          "Read 2 Corinthians 8:12-13, where Paul says a gift is acceptable according to what a person has, not what they don't have, and that he isn't asking anyone to be burdened so others can be relieved.",
        ],
        next: [
          { kind: "How-to", title: "How to Start Giving Generously", href: "/how-tos/wm-how-to-start-giving-generously" },
          { kind: "Life", title: "Why Did Jesus Treat Money as a Rival God?", href: "/life/money-and-the-heart" },
          { kind: "Wisdom", title: "Giving to the Church", href: "/wisdom/giving-to-the-church" },
        ],
      },
    },
  },
  {
    name: "Contentment",
    slug: "contentment",
    description:
      "Whether you can tell *not enough* from *wanting more*. The first is real need, and there's no shame in it. The second is a hunger that more money rarely satisfies, and people with plenty carry it too.",
    scripture: {
      text: "For the love of money is the root of all kinds of evil. By craving it, some have wandered away from the faith and pierced themselves with many sorrows.",
      reference: "1 Timothy 6:10",
    },
    questions: [
      {
        id: 4,
        text: "I rarely compare my financial situation to other people's, whether on social media, among friends, or at work.",
      },
      {
        id: 5,
        text: "I practice gratitude for what I have rather than fixating on what I lack.",
      },
      {
        id: 6,
        text: "I can say *I have enough* and mean it, not as resignation but as a genuine assessment of God's provision.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You seem to have learned something many people spend their lives chasing: how to want less than the world tells you to. You rarely measure your life against other people's, gratitude comes more readily than a sense of lack, and you can say *I have enough* and mean it. Paul wrote that he had “learned to be content regardless of my circumstances” (Philippians 4:11), so this is usually the fruit of practice and trust more than temperament. You still want things, of course, and your circumstances may be hard; contentment isn't the absence of either. The risk at this level is that contentment hardens into impatience with people who are still anxious about money, as if their fear were simply a failure of faith.",
        steps: [
          "When a friend is anxious about money, listen before you offer perspective. Your peace helps them only if it doesn't become a lecture.",
          "Ask what you would fear first if your income fell sharply next year, and pray about it now, while it's still a question.",
          "Keep one habit that guards what you've learned, such as limiting the shopping and scrolling that make wanting feel normal.",
        ],
        next: [
          { kind: "Study guide", title: "Contentment: A Bible Study on Wanting Less", href: "/studyguides/contentment" },
          { kind: "How-to", title: "How to Handle Money in an Affluent Society", href: "/how-tos/world-how-to-handle-money-in-an-affluent-society" },
        ],
      },
      mid: {
        interpretation:
          "You have seasons of contentment interrupted by seasons of wanting, and that's human. Some of your answers suggest gratitude comes readily; others suggest comparison still gets a vote, especially when you see what other people have or when an unexpected bill arrives. This level usually means your contentment depends on circumstances more than you'd like: steady when things are calm, shaken when they aren't. That isn't a failure of faith. Paul said contentment was something he had learned, which means it can be learned. The work here is noticing what sets the wanting off, whether a feed, a neighborhood, a friend, or a worry about the future, and asking what you believe more money would finally give you.",
        steps: [
          "For two weeks, jot down each moment you feel behind and what set it off. The list usually comes down to a few triggers, and those can be changed.",
          "When you want something, ask what you believe having it would give you: security, respect, rest, relief. Name the deeper want and bring that to God.",
          "Once a week, write down specific things you've been given: the bill you paid, the meal you shared, the car that started. Specific thanks does more than a general sense of gratitude.",
        ],
        next: [
          { kind: "Life", title: "How Do You Stop Envy and Learn Contentment?", href: "/life/contentment-against-envy" },
          { kind: "How-to", title: "How to Find Contentment With Enough", href: "/how-tos/wm-how-to-find-contentment-with-enough" },
          { kind: "Wisdom", title: "Comparison and Envy Online", href: "/wisdom/comparison-online" },
        ],
      },
      low: {
        interpretation:
          "Your answers suggest that comparison, worry, or a sense of *never enough* is shaping much of how you feel about money right now. That's painful to live with. Sometimes it grows from real scarcity, when there truly isn't enough and the fear is reasonable. Sometimes it grows from a steady diet of other people's lives, online and off, that makes an ordinary life feel like falling behind. Often it's both. You aren't greedy or faithless for feeling it, but it does mean money has more say over your peace than you would choose. If worry about money is keeping you up at night or crowding out everything else, tell someone instead of carrying it alone.",
        steps: [
          "Sort the worry. Write down which fears are about bills you can't cover and which are about keeping up with other people. They need different help, and the first may need a credit counselor more than a gratitude list.",
          "For thirty days, mute the accounts and skip the browsing that leave you feeling behind. That feeling is often produced on purpose by people who are paid to sell to you.",
          "Read Philippians 4:11-13 slowly. Paul wrote it from prison, and he said he had learned contentment in hunger and in plenty.",
        ],
        next: [
          { kind: "Find help", title: "I can't stop worrying", href: "/help/anxiety" },
          { kind: "Wisdom", title: "Envy and Comparison", href: "/wisdom/envy-and-comparison" },
          { kind: "Tool", title: "The Worry Journal", href: "/tools/worry-journal" },
        ],
      },
    },
  },
  {
    name: "Stewardship",
    slug: "stewardship",
    description:
      "Whether you manage what you have been given with the seriousness of someone who knows it belongs to Another.",
    scripture: {
      text: "The earth is the LORD’s, and the fullness thereof, the world and all who dwell therein.",
      reference: "Psalm 24:1",
    },
    questions: [
      {
        id: 7,
        text: "I know exactly what I owe, including every balance and interest rate.",
      },
      {
        id: 8,
        text: "I save consistently, not when it is convenient but as a discipline, even in months when the budget is tight.",
      },
      {
        id: 9,
        text: "I have a written or clearly defined financial plan that extends beyond this month, covering things like retirement, education, major purchases, and giving goals.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You know your numbers, you save on purpose even when it's tight, and you have a plan that reaches past this month. That kind of order is a gift to the people who depend on you, and it usually comes from discipline kept long after it stopped being interesting. It doesn't make you safe from every loss. No plan makes anyone master of tomorrow; Proverbs 27:1 says it plainly: “you do not know what a day may bring.” The quieter risks here are finding your security in the plan instead of in God, and treating good management as the whole of stewardship. The other half is what the order makes possible: room to give, to help, and to say yes when someone else's emergency arrives.",
        steps: [
          "Add a line to your plan for other people: an amount held for someone else's emergency, so you can say yes quickly when it comes.",
          "Offer to sit with one person who is overwhelmed by their finances and help them make their first list, without judging what's on it.",
          "When you review your plan each year, ask what it's for, not only whether it's on track.",
        ],
        next: [
          { kind: "Wisdom", title: "Stewardship", href: "/wisdom/stewardship" },
          { kind: "Life", title: "How Do You Follow Jesus With Your Money?", href: "/life/money-and-possessions-in-society" },
          { kind: "Study guide", title: "Where Your Treasure Is", href: "/studyguides/money" },
        ],
      },
      mid: {
        interpretation:
          "You have some of the basics in place, but not all of them, or not every month. You may know roughly what you owe but not the rates, save when there's room but not when it's tight, or plan for this month but not much past it. Many careful people live here, especially after a move, a new child, a job change, or a run of expenses. That isn't irresponsibility. It usually means you're handling money as it comes rather than deciding ahead of time where it will go. The move at this level is from reacting to planning, and the tools are plain: a written budget, savings that happen automatically, and a yearly look at the long view.",
        steps: [
          "Make saving automatic. Set a transfer, even a small one, for the day your income arrives, so saving no longer depends on how the month went.",
          "Write a one-page plan that reaches a year out: what's coming, what you're saving for, and what you intend to give.",
          "Put a date on the calendar to review that plan every year. A plan that fit five years ago may not fit now.",
        ],
        next: [
          { kind: "How-to", title: "How to Make a Budget That Honors God", href: "/how-tos/wm-how-to-make-a-budget-that-honors-god" },
          { kind: "Wisdom", title: "Money and Provision", href: "/wisdom/money" },
          { kind: "Life", title: "How Do You Follow Jesus With Your Money?", href: "/life/money-and-possessions-in-society" },
        ],
      },
      low: {
        interpretation:
          "Your answers suggest you don't have a clear picture of what you owe, saving hasn't become a habit, and there's no plan much past this month. Often that isn't carelessness. When money is tight, every dollar is spoken for before it arrives and planning can feel pointless, and when debt is frightening, not looking can feel like the only relief. Both are human. But a debt you won't look at tends to grow while you're not looking, and fear feeds on vague numbers. This result doesn't measure your income or your character. It does mean the first step is to see the whole picture, even when it's hard to look at, and to get help if the numbers are already past what you can manage.",
        steps: [
          "This week, open every statement and write each debt on one page: the balance, the interest rate, and the minimum payment. The list is usually less frightening than the dread of not knowing.",
          "Start an emergency fund with whatever you can, even a few dollars a week, in a separate account. At first the habit matters more than the amount.",
          "Ask one person who handles money well to sit with you for an hour and look at the list together. Stewardship is learned by watching, and nobody has to learn it alone.",
        ],
        next: [
          { kind: "Find help", title: "Money is a weight on me", href: "/help/money" },
          { kind: "How-to", title: "How to Get Out of Debt", href: "/how-tos/wm-how-to-get-out-of-debt" },
          { kind: "Life", title: "What Does the Bible Say About Debt and Daily Bread?", href: "/life/debt-and-provision" },
        ],
      },
    },
  },
  {
    name: "Family Provision",
    slug: "family",
    description:
      "Whether money is a shared language in your home or a source of division, silence, and unspoken resentment.",
    scripture: {
      text: "If anyone does not provide for his own, and especially his own household, he has denied the faith and is worse than an unbeliever.",
      reference: "1 Timothy 5:8",
    },
    questions: [
      {
        id: 10,
        text: "My spouse and I talk openly about money, including income, spending, fears, and goals. (If you're not married, choose Neutral.)",
      },
      {
        id: 11,
        text: "I am actively teaching my children (or plan to teach future children) about money, work, generosity, and contentment.",
      },
      {
        id: 12,
        text: "Our household has savings set aside for a financial emergency (a job loss, a medical crisis, an unexpected expense).",
      },
    ],
    levels: {
      high: {
        interpretation:
          "Money seems to be something your household can talk about honestly, you're teaching the next generation about it or mean to, and you have savings set aside for an emergency. Holding all three at once takes real attention; many homes manage one or two. You'll still argue about money sometimes, and a crisis can still come. The risk at this level is comfort: easy seasons are when assumptions go unspoken and one person drifts out of the numbers. And 1 Timothy 5:8 reaches past your own roof. In context, Paul is telling families to care for their widowed relatives so the church can help those who have no one, which means provision can include a parent or relative who needs your steadiness.",
        steps: [
          "Keep a short monthly money talk even when nothing is wrong: what came in, what went out, and what's coming.",
          "Let your children see how you decide what to give, not only what to spend, at a level they can understand.",
          "Ask whether someone in your wider family needs the kind of steadiness your household has, and what it would take to offer it.",
        ],
        next: [
          { kind: "How-to", title: "How to Have a Weekly Marriage Check-In", href: "/how-tos/marriage-how-to-weekly-check-in" },
          { kind: "Life", title: "How Do You Honor Aging Parents Who Need Care?", href: "/life/caring-for-aging-parents" },
          { kind: "Life", title: "How Do You Build a Christian Home and Family?", href: "/life/the-home-and-the-family" },
        ],
      },
      mid: {
        interpretation:
          "Some pieces are in place at home and some aren't. You and your spouse may be able to talk about money but not about the fears underneath it, or you may be ready for an emergency but haven't talked with your children about money at all, or the reverse. That's typical of full, busy years, and a home like that isn't in trouble. It usually means money gets discussed when it has to be, in a crisis or before a big purchase, rather than as an ordinary part of family life. If you're single or have no children, some of these statements won't fit, so read this for what it says about your cushion. The move at this level is to make the conversation regular and calm before it has to be urgent.",
        steps: [
          "Set a thirty-minute money talk once a month, with no blame allowed: what came in, what went out, what's coming, and what worries each of you.",
          "Give your children some money of their own to manage, split into giving, saving, and spending, and talk with them about their choices.",
          "Write down what your household would do if the main income stopped for three months. Knowing the plan takes some of the fear out of the crisis.",
        ],
        next: [
          { kind: "How-to", title: "How to Handle Money as a Couple", href: "/how-tos/wm-how-to-handle-money-as-a-couple" },
          { kind: "Care plan", title: "Eight Weeks Toward a Stronger Marriage", href: "/plans/marriage" },
          { kind: "Wisdom", title: "Talking with Your Spouse", href: "/wisdom/marriage-communication" },
        ],
      },
      low: {
        interpretation:
          "Your answers suggest money is a source of strain at home right now: hard to talk about openly, not yet something your children are learning about from you, and without much cushion if something goes wrong. When money is tense between two people who share it, the argument is rarely about the numbers. It's about what money stands for: security, respect, control, fear. This result doesn't mean your family is failing, and it can't see the reasons, which may include a hard season you didn't choose. If you're single, weigh the questions about a spouse and children lightly. 1 Timothy 5:8 is a severe verse, but in context it rebukes people who neglect their widowed relatives, not families doing their best with too little.",
        steps: [
          "Before you talk about numbers, name the fear underneath. *I'm afraid we won't have enough* is a different conversation from *You spend too much*, and it usually goes better.",
          "Open a separate savings account and put something in it, however small. Even a thin cushion turns panic into a plan.",
          "If every money conversation turns into a fight, ask a pastor or a counselor to sit in on one. Asking for help means you take this seriously.",
        ],
        next: [
          { kind: "How-to", title: "How to Have the Money Conversation Without a War", href: "/how-tos/marriage-how-to-money-conversation" },
          { kind: "How-to", title: "How to Know When to Get Help", href: "/how-tos/marriage-how-to-know-when-to-get-help" },
          { kind: "Wisdom", title: "Marriage Trouble", href: "/wisdom/marriage-conflict" },
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

interface OverallBand {
  label: string;
  color: string;
  /** 150 to 300 words: what this usually means, what it doesn't, why people land here, what to do first. */
  paragraphs: string[];
  /** The lowest band puts a real person before any practice. */
  seekHelp: boolean;
  /** The one next step this band leads with. */
  next: { lead: string; cta: string; href: string };
  /** A slower step for later. */
  later: { lead: string; title: string; href: string };
}

function getOverallLabel(score: number): OverallBand {
  const pct = score / 60;
  if (pct >= 0.8)
    return {
      label: "Steady and Open-Handed",
      color: "var(--ok)",
      paragraphs: [
        "Your answers describe a financial life that is in good order and pointed outward. You give before other spending instead of from what's left, you can say *I have enough* and mean it, you know what you owe and have a plan past this month, and money is something your household can talk about. A result like this usually means habits have been at work for a long time: a budget kept until it became ordinary, a decision to give that no longer has to be remade every month, or someone who showed you how when you were young.",
        "It doesn't mean you're more faithful than someone who scored lower, and it says nothing about your income. People with very little can land here, and people with a great deal can score far lower. Twelve statements also can't tell a strong foundation from an easy season. A steady job, a year without emergencies, and a paid-off car can look a lot like wisdom on a page like this, so it's worth asking which one you're looking at.",
        "Start with your lowest area below, even if it scored well, because drift usually begins wherever we stop looking. Then take up the harder question that comes with a result like this. The rich man in Jesus' parable in Luke 12 wasn't a thief or a spendthrift. He planned well, built bigger barns, and told himself he could rest, and his trouble was that he was not “rich toward God” (Luke 12:21). Keep the plan and keep the giving, and hold both with an open hand.",
      ],
      seekHelp: false,
      next: {
        lead: "If you'd like to go further with others, this five-session small-group study starts with what the heart does with money, not with a spreadsheet. It's built for small groups and works for one reader too.",
        cta: "Where Your Treasure Is",
        href: "/studyguides/money",
      },
      later: {
        lead: "For your own reading, on money as a rival for the heart:",
        title: "Why Did Jesus Treat Money as a Rival God?",
        href: "/life/money-and-the-heart",
      },
    };
  if (pct >= 0.6)
    return {
      label: "Growing but Uneven",
      color: "var(--mustard)",
      paragraphs: [
        "Your answers show real strength in some parts of your financial life and real gaps in others. Many honest people land here. A person can give faithfully and still have no idea what they owe, or keep a careful budget and still lie awake comparing it with someone else's. The scores below show where your strengths and gaps sit.",
        "This result doesn't mean you're bad with money, and it doesn't mean your faith is thin. It usually means the parts of money that come easily to you have gotten your attention and the parts that cost you something haven't. The reasons tend to be ordinary: a family that taught you to save but never to give, or to give but never to plan; a marriage where one person handles the money and the other stays out of it; a stretch of expenses that pushed the long view aside. Churches, and those of us who preach in them, can add to the imbalance by talking often about giving and rarely about debt, worry, or the fights money causes at home.",
        "Start with the one area below that scored lowest and read what it says about your level. Choose one step there, give it a month, and tell someone which step you chose, so it doesn't fade into a private resolution. The distance between what you believe about money and what you do with it won't close by feeling bad about it. It closes the way it opened, one ordinary decision at a time.",
      ],
      seekHelp: false,
      next: {
        lead: "For the distance between what you believe about money and what you do with it, there's a short reading path: four essays, a small-group study, and this check, written for the worried and the comfortable alike.",
        cta: "Money and the Heart",
        href: "/pathways/money",
      },
      later: {
        lead: "If you'd rather take it a week at a time, an eight-week plan gives work and money their own week, alongside rest, friendship, and the local church:",
        title: "Eight Weeks Toward One Undivided Life",
        href: "/plans/whole-life",
      },
    };
  if (pct >= 0.4)
    return {
      label: "Under Strain",
      color: "var(--strain)",
      paragraphs: [
        "Your answers suggest money has more say in your life than you'd choose. Across several areas, the things that usually keep money in its place are thin right now: giving decided ahead of time, a clear picture of what you owe, some savings, a plan, and a home where money can be talked about without dread. You may feel that strain every day, or it may not have shown itself yet because nothing has gone wrong.",
        "This isn't a verdict on your character or your faith, and a self-check can't tell choices from circumstances. People land here for many reasons: a lost job, a medical bill, a new baby, a divorce, a parent who needs care, years of low pay, or habits no one ever taught them to question. Many of us were formed by an economy that makes spending easy and saving feel optional, and the church has often said too little about it.",
        "What to do first is to look. Write down what comes in, what goes out, and what you owe, even if the numbers are hard to face; fear grows on vagueness. Then pick the lowest area below and take one step there. If the numbers are already past what you can manage, talk with a nonprofit credit counselor before you make any big decision, and bring someone you trust into it. The goal for now isn't to fix everything. It's to stop carrying it alone and to see it clearly.",
      ],
      seekHelp: false,
      next: {
        lead: "Start with the page for when money is a weight on you. It covers debt, bills you can't cover, and fights about money: what Scripture says, what to do this week, and where to find real help.",
        cta: "Money is a weight on me",
        href: "/help/money",
      },
      later: {
        lead: "When you're ready for the longer view, on what debt costs, the God who feeds the birds, and praying for bread one day at a time:",
        title: "What Does the Bible Say About Debt and Daily Bread?",
        href: "/life/debt-and-provision",
      },
    };
  return {
    label: "Carrying a Heavy Weight",
    color: "var(--alert)",
    paragraphs: [
      "Your answers describe a financial life under real weight. Most of these statements don't describe you right now. There may be little or no margin, debt you're afraid to look at, worry that follows you to bed, and a home where money is hard to talk about. That's a heavy thing to carry, and it took honesty to answer the way you did.",
      "Before any practice on this page, talk with a real person this week. A pastor you trust can help you think and pray without judging you. If the numbers are the emergency, a nonprofit credit counselor can go over your whole situation with you and lay out your options. If the weight is costing you sleep, appetite, or hope, see your doctor or a licensed counselor as well; money trouble wears on body and mind, and that deserves care too. The Find Help page lists people you can call.",
      "This result isn't a diagnosis or a verdict on your worth, and it can't see why you're here. People land here after a job loss, a medical bill, a divorce, years of low wages, caring for someone, or debt taken on just to get through, as well as through choices they regret. Hard circumstances are not moral failures, and even regretted choices are not the end of the story. Scripture speaks to people in want with tenderness, not contempt.",
      "The first steps are small. Talk to one person. Then, when you're ready, write down what comes in and what you owe, even if the numbers frighten you, so the fear has edges. You don't have to fix this alone, and you don't have to fix it this week.",
    ],
    seekHelp: true,
    next: {
      lead: "When you've talked with someone, go to the page for when money is a weight on you. It starts with what to do tonight and this week, one small step at a time, and it tells you who can help with what a page can't.",
      cta: "Money is a weight on me",
      href: "/help/money",
    },
    later: {
      lead: "Later, when you have room for it, read what Scripture says to people who can't cover the bills. It doesn't pretend want is easy, and it doesn't blame you for it:",
      title: "Financial Hardship",
      href: "/wisdom/financial-hardship",
    },
  };
}

/** Words a reader might say or think are marked *like this* in the copy above; set them in italics. */
function withItalics(text: string) {
  return text
    .split(/\*([^*]+)\*/g)
    .map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

/* ── Saved progress (HS-5): survive a refresh mid-assessment ───── */

// Kept under livewell-progress-financial-health: progressKey("financial-health").

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

const RATING_OPTIONS = RATING_LABELS.map((label, i) => ({ value: String(i + 1), label }));
const TOTAL_QUESTIONS = CATEGORIES.reduce((n, c) => n + c.questions.length, 0);

/** The words for an area's level, as the results have always said them. */
const LEVEL_LABEL: Record<Level, string> = { high: "Strength", mid: "Growing", low: "Needs Attention" };

export default function FinancialHealth() {
  const tool = toolById("financial-health");
  // The saved place (livewell-progress-financial-health, the key and shape
  // this check has always used), read and written through the tool shell.
  const progress = useToolProgress<StoredProgress>("financial-health", isStoredProgress, { answers: {}, step: 0, savedAt: "" });
  const answers = progress.value.answers;
  const currentCategory = Math.min(Math.max(Math.trunc(progress.value.step), 0), CATEGORIES.length - 1);
  const [opened] = useState(() => progress.resumed && (Object.keys(progress.value.answers).length > 0 || progress.value.step > 0));
  const [resumed, setResumed] = useState(opened);
  const [showResults, setShowResults] = useState(false);
  // Back from the result (Change my answers): the first part takes focus.
  const [fromResult, setFromResult] = useState(false);

  const persist = (nextAnswers: Record<number, number>, nextStep: number) => {
    progress.set({ answers: nextAnswers, step: nextStep, savedAt: new Date().toISOString() });
  };

  const category = CATEGORIES[currentCategory];
  const answeredCount = CATEGORIES.flatMap((c) => c.questions).filter((q) => answers[q.id] !== undefined).length;
  const isLastCategory = currentCategory === CATEGORIES.length - 1;
  const allAnswered = answeredCount === TOTAL_QUESTIONS;

  const handleRate = (questionId: number, value: number) => {
    setResumed(false);
    persist({ ...answers, [questionId]: value }, currentCategory);
  };

  const goTo = (next: number) => {
    setResumed(false);
    persist(answers, next);
  };

  const handleNext = () => {
    if (!isLastCategory) return goTo(currentCategory + 1);
    if (!allAnswered) {
      // A part left unfinished (an older saved place): go back to it.
      const missing = CATEGORIES.findIndex((c) => c.questions.some((q) => answers[q.id] === undefined));
      return goTo(Math.max(0, missing));
    }
    setShowResults(true);
    persist(answers, currentCategory);
  };

  useEffect(() => {
    if (!showResults) return;
    focusResultTop("fh-result");
  }, [showResults]);

  const handleRestart = () => {
    progress.clear();
    setShowResults(false);
    setResumed(false);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleChangeAnswers = () => {
    setShowResults(false);
    setFromResult(true);
    setResumed(false);
    persist(answers, 0);
  };

  const getCategoryScore = (cat: Category) =>
    cat.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);

  const totalScore = CATEGORIES.reduce(
    (sum, cat) => sum + getCategoryScore(cat),
    0,
  );

  const overall = getOverallLabel(totalScore);

  // Question 10 asks whether money can be talked about openly with a spouse.
  // A disagreeing answer may mean habit or fear, or it may mean one partner
  // controls the money; the results name that plainly and point to safety.
  const moneyHardToTalkAbout = (answers[10] ?? 3) <= 2;

  const maxCatScore = 15;
  // The one area to start with: the lowest score, the first of any tie.
  const startHere = CATEGORIES.reduce((low, c) => (getCategoryScore(c) < getCategoryScore(low) ? c : low), CATEGORIES[0]);

  return (
    <Layout>
      <SEOMeta
        title="Money and Faith Self-Check (12 Questions)"
        description="A 12-question self-check on money and faith: generosity, contentment, stewardship, and provision. Not a diagnosis or financial advice. Answers stay on your device."
        keywords="financial health check, financial health self-check, biblical stewardship, Christian finances, money and faith, generosity, contentment"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Financial Health Self-Check",
          description:
            "A 12-question self-check on money and faith covering generosity, contentment, stewardship, and family provision. Not a diagnosis or financial advice.",
          url: "https://www.livewellbyjamesbell.co/tools/financial-health",
          applicationCategory: "FinanceApplication",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      <ToolHead
        path="/tools/financial-health"
        title={tool.name}
        line="Twelve statements about four parts of your financial life: generosity, contentment, stewardship, and providing for your household. It takes a few minutes. It isn't a budget calculator. It asks whether your money reflects what you say you believe."
        time={`About ${tool.time}`}
        keeps="Your answers as you go, so a reload loses nothing, and the scores of each finished check, so the next one can show what has moved. All of it stays in this browser and is never sent anywhere."
        notDiagnosis="This is a self-check for reflection, not a test or a diagnosis, and your answers stay on this device. It isn't financial advice either; for decisions about debt, investments, or taxes, talk with someone qualified who knows your situation."
        plate="compass"
      />

      {!showResults ? (
        <section className="ts-band" aria-label="The twelve statements">
          <div className="ts-col">
            {resumed && (
              <div className="ts-resume" role="status">
                <p>Picked up where you left off.</p>
                <button type="button" className="btn btn--quiet ts-actions__btn" onClick={handleRestart}>
                  Start fresh
                </button>
              </div>
            )}
            <CheckPart
              step={currentCategory + 1}
              total={CATEGORIES.length}
              answered={answeredCount}
              questions={TOTAL_QUESTIONS}
              title={category.name}
              line={withItalics(category.description)}
              statements={category.questions.map((q) => ({ id: String(q.id), text: withItalics(q.text) }))}
              options={RATING_OPTIONS}
              value={(id) => (answers[Number(id)] !== undefined ? String(answers[Number(id)]) : null)}
              onAnswer={(id, v) => handleRate(Number(id), Number(v))}
              onBack={currentCategory > 0 ? () => goTo(currentCategory - 1) : undefined}
              backLabel="Previous"
              onNext={handleNext}
              nextLabel={isLastCategory ? "See my results" : "Next section"}
              saveFailed={progress.saveFailed}
              focusOnMount={fromResult}
            >
              <figure className="ts-verse">
                <blockquote>
                  <p>{category.scripture.text}</p>
                </blockquote>
                <figcaption>
                  <Link href={`/theology/passage?ref=${encodeURIComponent(category.scripture.reference)}`}>Read {category.scripture.reference} in context</Link>
                  <ScriptureNote rendering="bsb" />
                </figcaption>
              </figure>
            </CheckPart>
          </div>
        </section>
      ) : (
        <section className="ts-band">
          <div className="ts-col">
            <SafetyCheck askAboutHome={false} />
            <ResultReading id="fh-result" title="Your results">
              <p className="ts-r__score">{totalScore} / 60</p>
              <p className="ts-r__lead">{overall.label}</p>
              {overall.paragraphs.map((para, i) => (
                <p key={i}>{withItalics(para)}</p>
              ))}
              {overall.seekHelp && (
                <aside className="ts-help" aria-labelledby="fh-help-h">
                  <h3 id="fh-help-h">Talk to a person first</h3>
                  <p>
                    A result in this range is a reason to talk with someone,
                    not only to try harder on your own. You don't need the
                    right words; you can print this page and bring it with
                    you. If the weight has turned into thoughts of not wanting
                    to be alive, call or text 988 now, at any hour.
                  </p>
                  <div className="ts-help__links">
                    <Link href="/help">Find Help: people you can call, and where to start</Link>
                    <a href="tel:988">988 Suicide &amp; Crisis Lifeline: call or text 988, any hour</a>
                  </div>
                </aside>
              )}
            </ResultReading>
            {progress.saveFailed && <p className="ts-save-failed">{SAVE_FAILED}</p>}

            {/* If money can't be talked about at home: name financial control */}
            {moneyHardToTalkAbout && (
              <aside className="ts-help" role="note" aria-labelledby="fh-control-h" style={{ marginBottom: "var(--s-4)" }}>
                <h3 id="fh-control-h">If money is hard to talk about at home</h3>
                <p>
                  You said you and your spouse don't talk openly about money.
                  Usually that comes from habit, fear, or shame, and the Family
                  Provision steps below are written for that. But if a spouse or
                  partner keeps you from seeing or using the money, demands an
                  account of every dollar while answering to no one, or makes
                  you afraid to ask, that is financial control, and financial
                  control is a form of abuse. A better budget can't fix it, and
                  it isn't yours to fix by trying harder. The page for a
                  marriage in trouble says what to do first when you're afraid,
                  and it lists people you can call.
                </p>
                <div className="ts-help__links">
                  <Link href="/help/marriage">My marriage is falling apart</Link>
                </div>
              </aside>
            )}

            <ResultSection title="Your four areas">
              <ScoreChart
                caption="Each area out of 15. The lowest is marked as the place to start."
                max={maxCatScore}
                rows={CATEGORIES.map((c) => {
                  const score = getCategoryScore(c);
                  return { label: c.name, value: score, start: c.slug === startHere.slug, valueText: `${score} / ${maxCatScore} · ${LEVEL_LABEL[getScoreLevel(score, maxCatScore)]}` };
                })}
              />
            </ResultSection>

            <SelfCheckHistory
              id="financial-health"
              total={totalScore / (CATEGORIES.reduce((n, c) => n + c.questions.length, 0) * 5)}
              areas={Object.fromEntries(CATEGORIES.map((c) => [c.name, getCategoryScore(c) / (c.questions.length * 5)]))}
              answersKey={JSON.stringify(answers)}
            />

            <ResultSection title="Your next step">
              <div className="ts-r__prose">
                <p>{overall.next.lead}</p>
              </div>
              <Link href={overall.next.href} className="btn">
                {overall.next.cta}
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" style={{ marginLeft: 8 }} />
              </Link>
              <p className="ts-r__more">
                {overall.later.lead}{" "}
                <Link href={overall.later.href} className="btn--text" style={{ minHeight: 0, display: "inline" }}>
                  {overall.later.title}
                </Link>
              </p>
            </ResultSection>

            {/* Not financial advice: who can help with the particulars */}
            <ResultSection title="This isn't financial advice">
              <div className="ts-r__prose" role="note">
                <p>
                  This self-check can help you see where you stand, but it can't
                  tell you what to do about a particular debt, account, or tax
                  question, and nothing on this page is financial, legal, or tax
                  advice. For that, talk with someone qualified who knows your
                  situation:
                </p>
                <ul>
                  <li>A nonprofit credit counselor, when debt is more than you can keep up with.</li>
                  <li>An accountant, for taxes.</li>
                  <li>
                    A fee-only financial planner, one paid by you rather than by
                    commissions on what they sell, for saving, retirement, and
                    long-term plans.
                  </li>
                  <li>
                    A consumer or bankruptcy attorney, if you're facing
                    collections, a lawsuit over a debt, wage garnishment, or
                    foreclosure.
                  </li>
                </ul>
                <p>
                  A pastor can help you think and pray it through and may know
                  someone trustworthy nearby, but a pastor isn't a substitute for
                  any of these.
                </p>
              </div>
            </ResultSection>

            <ResultSection title="Area by area">
              {CATEGORIES.map((cat) => {
                const score = getCategoryScore(cat);
                const level = getScoreLevel(score, maxCatScore);
                const guide = cat.levels[level];
                return (
                  <article key={cat.slug} className="ts-area" aria-labelledby={`fh-${cat.slug}`}>
                    <div className="ts-area__head">
                      <h3 className="ts-area__name" id={`fh-${cat.slug}`}>
                        {cat.name}
                      </h3>
                      <span className="ts-area__level">
                        {LEVEL_LABEL[level]} · {score}/{maxCatScore}
                        {cat.slug === startHere.slug ? " · Start here" : ""}
                      </span>
                    </div>
                    <p>{withItalics(guide.interpretation)}</p>
                    <figure className="ts-verse">
                      <blockquote>
                        <p>{cat.scripture.text}</p>
                      </blockquote>
                      <figcaption>
                        <Link href={`/theology/passage?ref=${encodeURIComponent(cat.scripture.reference)}`}>Read {cat.scripture.reference} in context</Link>
                        <ScriptureNote rendering="bsb" />
                      </figcaption>
                    </figure>
                    <h4 className="ts-area__label">Practical steps</h4>
                    <ol className="ts-steps">
                      {guide.steps.map((step, i) => (
                        <li key={i}>{withItalics(step)}</li>
                      ))}
                    </ol>
                    <h4 className="ts-area__label">Where to go next</h4>
                    <ul className="ts-next">
                      {guide.next.map((n) => (
                        <li key={n.href}>
                          <Link href={n.href} className="ts-next__link">
                            <span className="ts-next__kind">{n.kind}</span>
                            <span className="ts-next__label">{n.title}</span>
                            <ArrowRight className="ts-next__arrow" size={18} strokeWidth={1.75} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </ResultSection>

            <ResultNext title="Find Help" steps={[{ kind: "Find help", label: "Start from what you are facing, in your own words", href: "/help" }]} />

            <ResultActions
              title={tool.name}
              kind="Self-check"
              onChange={handleChangeAnswers}
              onStartOver={handleRestart}
              startOverClears="your answers on this device (your past results stay)"
            />
          </div>
        </section>
      )}
    </Layout>
  );
}
