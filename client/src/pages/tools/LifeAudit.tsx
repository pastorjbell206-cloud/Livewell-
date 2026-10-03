import Layout from "@/components/Layout";
import { scrollBehavior } from "@/lib/motion";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import { useState, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight, Printer } from "lucide-react";
import { EmailResults } from "@/components/EmailResults";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { SafetyCheck } from "@/components/SafetyCheck";
import { SelfCheckHistory } from "@/components/SelfCheckHistory";

/* ── Types ─────────────────────────────────────────────────────── */

interface Question {
  id: number;
  text: string;
}

/** The three levels getScoreLevel computes for an area (3 to 15 points). */
type Level = "high" | "mid" | "low";

/** A live page on this site, named by its own title. */
interface NextStep {
  kind: string;
  title: string;
  href: string;
}

/**
 * What one level of one area means, and what to do about it
 * (docs/grow/GROW-PROMPT.md 7.2). Words a reader might say or think are
 * marked *like this* and set in italics; double quotation marks belong to
 * Scripture alone, and this page quotes none.
 */
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
  /** The passage this life-domain grows from. Rendered as a reference that
   *  links to the full text — not an embedded quotation. */
  scripture: { ref: string };
  questions: Question[];
  /** An area that does not fit every life (a spouse, children) can be set
   *  aside. A set-aside area counts neither for nor against the reader: it
   *  leaves the score, the history, and the strengths and growth areas. */
  optional?: { hint: string };
  levels: Record<Level, LevelGuide>;
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
    scripture: { ref: "Psalm 42:1" },
    description:
      "The life beneath the life. Not whether you attend church, but whether your soul is attended to.",
    questions: [
      {
        id: 1,
        text: "I have a consistent, personal prayer life: not performance for others, but an honest conversation with God that happens whether anyone sees it or not.",
      },
      {
        id: 2,
        text: "I engage with Scripture regularly in a way that shapes how I think and live, not as a checkbox but as a source of genuine sustenance.",
      },
      {
        id: 3,
        text: "I am known in a Christian community, not just attending but belonging. People there would notice if I disappeared for a month.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You pray when no one is watching, Scripture is shaping how you think and live, and you belong to a church where people would notice if you went missing. Those three together usually mean habits kept through dry seasons as well as easy ones. A strong score doesn't mean God will always feel near, or that these practices will keep themselves. The writer of Psalm 42 remembered leading the crowd to the house of God and still came to feel far off. At this level the risks are quiet: prayer that settles into routine, and a church where you give a great deal but are no longer known. The next growth is usually in passing on what you've been given.",
        steps: [
          "Ask someone younger in faith to read one of the Gospels with you, a chapter a week. You don't need to be an expert, only someone who has kept praying a little longer than they have.",
          "Once this month, give a morning to silence and prayer with no agenda, and notice what surfaces when the usual noise is gone.",
          "Make sure at least one person at church knows how you're actually doing, not only what you're doing for everyone else.",
        ],
        next: [
          { kind: "How-to", title: "How to Practice Silence and Solitude", href: "/how-tos/sf-how-to-practice-silence-and-solitude" },
          { kind: "Life", title: "How Do You Disciple One Person at a Time?", href: "/life/spiritual-friendship-and-the-long-walk" },
        ],
      },
      mid: {
        interpretation:
          "Faith matters to you, but the practices that feed it come and go. You may pray mostly in emergencies or on the way to somewhere else, read Scripture in bursts and then not for weeks, or attend a church where you're recognized but not really known. That's a common place to be, and it doesn't mean your faith is fake or that God is disappointed in you. More often the practices were never given a fixed place in the day, so the day took them back. What helps is less about trying harder and more about a small, fixed rhythm: the same time, the same place, and a few people who pray and read with you.",
        steps: [
          "Choose one fixed time for prayer, before you look at your phone in the morning or just before sleep, and keep it for two weeks. Five honest minutes is enough.",
          "Read one psalm a day for a month, starting with Psalm 1. When a line catches you, pray it back to God in your own words.",
          "Join one group at your church where people open the Bible together, so someone will notice when you're not there.",
        ],
        next: [
          { kind: "Find help", title: "I don't know how to pray", href: "/help/prayer" },
          { kind: "Care plan", title: "Eight Weeks With an Open Bible", href: "/plans/reading-the-bible" },
        ],
      },
      low: {
        interpretation:
          "Your spiritual life seems to be running on very little right now. Prayer may have gone quiet, Scripture may feel closed or far away, and you may not belong anywhere that would notice if you drifted. People land here for many reasons: a season so full it crowded everything out, a loss that made prayer feel pointless, a church that hurt you, or honest questions no one would sit with. None of that makes you a bad Christian, and if you're no longer sure you believe at all, that's worth saying out loud too. Psalm 42 was prayed by someone who felt forgotten by God and said so through tears. Starting again can be that honest, and that small.",
        steps: [
          "Tonight, tell God one true sentence about where you are. It doesn't need to sound faithful; *I don't know what to say to you anymore* is a real prayer.",
          "Read Psalm 42, all eleven verses, slowly. Notice that the writer argues with his own soul and keeps talking to God anyway.",
          "If a church wounded you, or doubt has made church hard to face, tell one person you trust what happened before you try to go back.",
        ],
        next: [
          { kind: "Find help", title: "I don't know how to pray", href: "/help/prayer" },
          { kind: "Find help", title: "I'm not sure I believe anymore", href: "/help/doubt" },
          { kind: "Life", title: "Why Does God Feel So Far Away When You Pray?", href: "/life/the-dry-season" },
        ],
      },
    },
  },
  {
    name: "Marriage & Relationships",
    slug: "relationships",
    scripture: { ref: "Ecclesiastes 4:9-10" },
    description:
      "The closest human relationship you have, and the one most likely to be neglected, because proximity creates the illusion of presence.",
    optional: {
      hint: "If you're married, answer for your marriage. If you're not, answer for your closest relationship, such as a close friend or a family member. If neither fits your life right now, set this part aside, and it won't count for or against you.",
    },
    questions: [
      {
        id: 4,
        text: "My spouse or closest person would say that I communicate openly, honestly, and regularly, not just about logistics but about what I actually feel.",
      },
      {
        id: 5,
        text: "I make time for closeness with my spouse or closest person on purpose, instead of giving them only the leftovers of my energy.",
      },
      {
        id: 6,
        text: "When conflict arises, I repair it rather than avoid it or escalate it. I take responsibility for my part without waiting for the other person to go first.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "There's real health in your closest relationship. You talk about more than logistics, you make time for each other on purpose, and when something goes wrong you move toward repair instead of waiting for the other person to go first. That usually grows from many small choices rather than one good season. It doesn't mean the relationship is done growing, or that it can't drift; a new baby, a move, or a hard year can pull two people apart faster than either expects. Ecclesiastes 4 says two are better than one, because when one falls the other can help him up, and that is worth guarding. If you're not married and these statements didn't fit any relationship in your life, use *Change my answers* to set this part aside; it won't count for or against you.",
        steps: [
          "Keep a short weekly check-in about the relationship itself rather than the calendar: what's been good, what's been hard, and what each of you needs this week.",
          "At a calm moment, ask the question the two of you have been stepping around. Strong relationships can bear more honesty than we usually give them.",
          "When a couple or a friend near you is struggling, offer to listen before you offer advice.",
        ],
        next: [
          { kind: "Self-check", title: "Marriage Health Self-Check", href: "/tools/marriage-assessment" },
          { kind: "How-to", title: "How to Have a Weekly Marriage Check-In", href: "/how-tos/marriage-how-to-weekly-check-in" },
        ],
      },
      mid: {
        interpretation:
          "There's real connection here, and also some distance. You may talk well about some things and avoid others, give each other mostly what's left at the end of the day, or let arguments cool without ever repairing them. That's an ordinary place for two people who share a full life, and it doesn't mean you chose the wrong person or that something is badly broken. It usually means ordinary life has been crowding the relationship, and that kind of drift doesn't reverse on its own. What helps is small and regular: one honest conversation a week, and going back to repair after a fight. If you're not married and these statements didn't fit any relationship in your life, use *Change my answers* to set this part aside; it won't count for or against you.",
        steps: [
          "Name the one subject you most avoid, and at a calm time this week raise it with a single sentence: *I'd like us to talk about this, and I don't want it to become a fight.*",
          "After your next argument, go back within a day and own your part in plain words, without adding *but*.",
          "Put one unhurried hour together on the calendar this week, with phones in another room, and protect it.",
        ],
        next: [
          { kind: "Self-check", title: "Marriage Health Self-Check", href: "/tools/marriage-assessment" },
          { kind: "Care plan", title: "Eight Weeks Toward Each Other", href: "/plans/marriage" },
          { kind: "How-to", title: "How to Repair After a Blowup", href: "/how-tos/marriage-how-to-repair-after-blowup" },
        ],
      },
      low: {
        interpretation:
          "Your closest relationship seems to be under real strain. Honest conversation may have stopped, closeness may have thinned into two people managing logistics, and conflict may end in silence or escalation rather than repair. That doesn't mean the relationship is over, and it doesn't make you the only one responsible. Strain like this usually builds slowly, through hurts never talked about, exhaustion, or a long season of living parallel lives. If you're afraid of your spouse or of anyone you live with, that is a matter of safety before it's a matter of communication, and the question at the top of this page can connect you with help. If you're not married and these statements didn't fit any relationship in your life, use *Change my answers* to set this part aside; it won't count for or against you.",
        steps: [
          "If you're safe with each other, say one true sentence this week, without an accusation attached: *I feel far from you, and I don't want us to stay here.*",
          "Talk with a pastor or a licensed counselor about what's happening, on your own first if you need to. A relationship under this much strain usually needs a third voice in the room.",
          "If you're married, read the Find Help page on marriage before deciding anything big. It begins with safety and moves to what can actually help.",
        ],
        next: [
          { kind: "Find help", title: "My marriage is falling apart", href: "/help/marriage" },
          { kind: "How-to", title: "How to Know When to Get Help", href: "/how-tos/marriage-how-to-know-when-to-get-help" },
        ],
      },
    },
  },
  {
    name: "Parenting",
    slug: "parenting",
    scripture: { ref: "Proverbs 22:6" },
    description:
      "If you're raising children, this may be the most important work you'll ever do, and no one hands you a manual for it. The question isn't whether your children are performing. It's whether you are present.",
    optional: {
      hint: "If you don't have children, or yours are grown and these statements don't fit, set this part aside. It won't count for or against you.",
    },
    questions: [
      {
        id: 7,
        text: "I am consistently present with my children, not just in the room but engaged, attentive, and available when they need me.",
      },
      {
        id: 8,
        text: "I parent with intentionality: I have thought about who I want my children to become, and I am making decisions that serve that vision, not just reacting to the moment.",
      },
      {
        id: 9,
        text: "I am actively forming my children's spiritual lives (through conversation, practice, and modeling) rather than outsourcing it entirely to the church.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You're present with your children, you've thought about who you hope they'll become, and you're passing on faith at home instead of leaving it all to the church. Deuteronomy 6 pictures exactly that: faith talked about at home and on the road, at bedtime and in the morning. A strong score doesn't guarantee how your children will turn out; they will make their own choices, and even Samuel watched his grown sons go their own way. It means you're faithfully doing the part that is yours. Keep adjusting as they grow, since what works at six rarely works at sixteen. If you don't have children, or yours are grown and these statements didn't fit, use *Change my answers* to set this part aside; it won't count for or against you.",
        steps: [
          "Ask each child an open question this week, suited to their age, and listen to the whole answer before you respond.",
          "Write each child a short letter about the good you see God doing in them, and save it for a birthday or a hard day.",
          "Find a parent with younger children who is struggling, and offer to listen, or to take the kids for an afternoon.",
        ],
        next: [
          { kind: "How-to", title: "How to Raise Kids Who Own Their Faith", href: "/how-tos/parenting-how-to-raise-kids-who-own-their-faith" },
          { kind: "Tool", title: "Parenting Stage Guide", href: "/tools/parenting-guide" },
        ],
      },
      mid: {
        interpretation:
          "You love your children and want to parent well, and some days you do; other days you're tired, distracted, or reacting instead of leading. You may be in the room without really being with them, carry a picture of who they could become that gets lost in the daily rush, or want to talk about faith at home without knowing how to start. That's the ordinary strain of raising children in a full life, and it doesn't mean you're failing them. Presence and faith are passed on mostly in small moments repeated over years, so what helps is a few steady rhythms rather than a big new program. If you don't have children, or yours are grown and these statements didn't fit, use *Change my answers* to set this part aside; it won't count for or against you.",
        steps: [
          "Choose one daily moment, such as dinner, the drive to school, or bedtime, and make it unhurried and phone-free for the next two weeks.",
          "Start a two-minute bedtime prayer with each child, using their words as much as yours.",
          "Write down three words for the kind of adult you hope each child becomes, and let them shape one decision this week.",
        ],
        next: [
          { kind: "How-to", title: "How to Pray With Your Kids at Bedtime", href: "/how-tos/fam-how-to-pray-with-your-kids-at-bedtime" },
          { kind: "How-to", title: "How to Eat Dinner Together Again", href: "/how-tos/fam-how-to-eat-dinner-together-again" },
          { kind: "Tool", title: "Parenting Stage Guide", href: "/tools/parenting-guide" },
        ],
      },
      low: {
        interpretation:
          "Parenting seems to be stretching you very thin right now. You may be exhausted, away more than you'd like, or reacting to each moment instead of leading, and faith at home may feel like one more thing you don't have the energy for. That's hard, and it usually shows how much you're carrying, not how little you love your children. Single parents, parents working long hours, and parents of a child with a disability or serious illness can end up here through no failure of their own. Children don't need a perfect parent; they need a present one who can apologize and start again, and that can begin this week. If you don't have children, or yours are grown and these statements didn't fit, use *Change my answers* to set this part aside; it won't count for or against you.",
        steps: [
          "Give one child thirty minutes of undivided attention this week, doing something they choose. Then do the same with the next child.",
          "If you've been short-tempered, apologize to your children in plain words. It will teach them more about grace than a lecture.",
          "Tell a friend or your pastor how worn down you are, and ask for one specific kind of help: a meal, a ride, or an afternoon to yourself. If the exhaustion doesn't lift with rest, see your doctor.",
        ],
        next: [
          { kind: "Find help", title: "Parenting is harder than anyone said", href: "/help/parenting" },
          { kind: "How-to", title: "How to Lead Your Family When You Feel Like a Failure", href: "/how-tos/parenting-how-to-lead-your-family-when-you-feel-like-a-failure" },
          { kind: "How-to", title: "How to Apologize to Your Kids", href: "/how-tos/parenting-how-to-apologize-to-your-kids" },
        ],
      },
    },
  },
  {
    name: "Physical Health",
    slug: "physical",
    scripture: { ref: "1 Timothy 4:8" },
    description:
      "Your body is not a vehicle for your mind. It is the instrument through which you love, serve, work, and worship. Neglecting it is not humility. It is poor stewardship. If illness or disability shapes what your body can do, answer for what's possible for you, not for someone else's body.",
    questions: [
      {
        id: 10,
        text: "I exercise regularly (at least three times a week) in a way that maintains my strength, endurance, and energy for the demands of my life.",
      },
      {
        id: 11,
        text: "I protect my sleep, instead of treating it as the first thing to give up when life gets full.",
      },
      {
        id: 12,
        text: "I eat in a way that fuels my body rather than numbing my stress. My relationship with food is more nourishment than comfort or compulsion.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You're caring for your body with real consistency: you move regularly, you protect your sleep, and you mostly eat to nourish yourself rather than to settle your nerves. That's worth more than it looks, because your body is how you love, work, and pray, and a rested body makes patience easier to find. 1 Timothy 4:8 says physical training has limited value while godliness has value in every way, and that proportion fits this level well: the body matters, and it isn't the whole of you. A strong score doesn't protect you from injury, illness, or age. The quieter risks here are pride, and a routine that drifts toward how you look rather than the life it serves.",
        steps: [
          "Invite someone who's trying to get started to walk or train with you once a week, at their pace rather than yours.",
          "Keep one day a week free of training, as rest you receive rather than a reward you've earned.",
          "If it's been a while since your last checkup, schedule one. Good habits don't replace a doctor's eyes.",
        ],
        next: [
          { kind: "Life", title: "What Is a Christian View of Sleep, Food, and Rest?", href: "/life/the-body-and-the-rhythms" },
          { kind: "How-to", title: "How to Receive Rest as a Gift, Not a Reward", href: "/how-tos/body-how-to-receive-rest-as-a-gift" },
        ],
      },
      mid: {
        interpretation:
          "You're doing some things well for your body and letting others slide. Exercise may come in bursts, sleep may be the first thing to go when life gets full, or food may be part nourishment and part comfort at the end of a hard day. That's an ordinary pattern, and it doesn't mean you lack discipline. More often the body gets whatever time and energy remain after work, family, and church, which usually isn't much. What helps is giving one habit a fixed place in your week instead of trying to change everything at once. Psalm 127 calls sleep something God gives to those he loves, not a reward for finishing everything.",
        steps: [
          "Put three walks or workouts on your calendar this week, at times you can actually keep, and treat them like appointments.",
          "Choose a bedtime for the next two weeks, and put your phone in another room half an hour before it.",
          "For one week, notice when you eat without being hungry and what you were feeling just before. Don't try to change it yet; just notice.",
        ],
        next: [
          { kind: "Life", title: "What Is a Christian View of Sleep, Food, and Rest?", href: "/life/the-body-and-the-rhythms" },
          { kind: "How-to", title: "How to Sleep Like a Creature Who Trusts God", href: "/how-tos/body-how-to-sleep-like-a-creature" },
          { kind: "How-to", title: "How to Move Your Body as Worship", href: "/how-tos/body-how-to-move-your-body-as-worship" },
        ],
      },
      low: {
        interpretation:
          "Your body seems to be getting very little care right now: not much movement, too little sleep, and food that's more about getting through the day than nourishing you. That usually says more about what you're carrying than about your willpower; long hours, small children, caregiving, low mood, pain, or illness can each put these basics out of reach. If illness or disability limits what your body can do, measure these statements against what's possible for you, not against someone else. When Elijah was spent in 1 Kings 19, God gave him sleep and food, twice, before a word about what had gone wrong. Start there, and see your doctor, especially if you're this tired most days. Nothing here is medical advice.",
        steps: [
          "Make an appointment with your doctor and describe honestly how you've been sleeping, eating, and feeling. Tiredness this deep can have causes worth checking.",
          "Walk for ten minutes today, or move in whatever way your body allows, and do it again tomorrow. The goal isn't fitness yet; it's breaking the pattern.",
          "If eating has started to feel out of your control, tell your doctor or a counselor. That deserves a real conversation, not a stricter diet.",
        ],
        next: [
          { kind: "Life", title: "What Is a Christian View of Sleep, Food, and Rest?", href: "/life/the-body-and-the-rhythms" },
          { kind: "Find help", title: "I've been given a hard diagnosis", href: "/help/diagnosis" },
          { kind: "How-to", title: "How to Face Your Own Limits Without Despair", href: "/how-tos/body-how-to-face-your-limits-without-despair" },
        ],
      },
    },
  },
  {
    name: "Financial Health",
    slug: "financial",
    scripture: { ref: "Matthew 6:24" },
    description:
      "Not how much you have, but how you hold it. Whether money serves your life or runs it.",
    questions: [
      {
        id: 13,
        text: "I practice financial stewardship: living within my means, avoiding unnecessary debt, and making spending decisions that align with my values rather than my impulses.",
      },
      {
        id: 14,
        text: "I give generously and regularly (to my church, to those in need, to causes that matter), and this giving is planned, not an afterthought.",
      },
      {
        id: 15,
        text: "I have a financial plan for the future (savings, insurance, a will, retirement), and I review it regularly rather than ignoring it and hoping for the best.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You're handling money with care: living within your means, giving on purpose, and planning for the future instead of hoping it works out. That usually comes from years of small decisions nobody applauded, and it means money has less power to frighten you. A strong score doesn't mean money has no hold on you. Jesus said no one can serve two masters, and a comfortable person can serve money as surely as a worried one, only more quietly. The question at this level is less about management and more about the open hand: whether your generosity is growing along with your means, or holding still while your comfort grows. Nothing here is financial advice.",
        steps: [
          "Look at what you gave last year as a share of your income, and decide prayerfully whether that share should grow this year.",
          "Offer to sit with a younger person or couple building their first budget, and share what you've learned, mistakes included.",
          "Make sure a will and the documents your family would need are in place, and that someone you trust knows where to find them.",
        ],
        next: [
          { kind: "Self-check", title: "Financial Health Check", href: "/tools/financial-health" },
          { kind: "Life", title: "Why Should Christians Give Their Money Away?", href: "/life/generosity-and-the-open-hand" },
        ],
      },
      mid: {
        interpretation:
          "You're managing some parts of money well and avoiding others. You may live within your means but give without a plan, give generously but have nothing set aside, or know you need a plan for the future and keep putting it off. That's a common pattern, and it doesn't make you irresponsible. Money is emotional, and most of us avoid the parts of it that make us anxious or ashamed. In Matthew 6 Jesus ties our treasure to our hearts, so this is about more than numbers. What helps is to look honestly at the whole picture once, write it down, and take one step in the part you've been avoiding.",
        steps: [
          "This week, write down everything that comes in and goes out, without judging it. You can't steward what you won't look at.",
          "Set up one automatic gift, in an amount you can keep, so giving happens first instead of from whatever is left.",
          "Pick the money task you've been putting off, such as an emergency fund, a plan to pay down debt, or a will, and give it one hour this month.",
        ],
        next: [
          { kind: "Self-check", title: "Financial Health Check", href: "/tools/financial-health" },
          { kind: "How-to", title: "How to Make a Budget That Honors God", href: "/how-tos/wm-how-to-make-a-budget-that-honors-god" },
          { kind: "How-to", title: "How to Start Giving Generously", href: "/how-tos/wm-how-to-start-giving-generously" },
        ],
      },
      low: {
        interpretation:
          "Money seems to be a source of real pressure right now. You may be behind on bills, carrying debt that keeps growing, unable to give or save, or avoiding the numbers because looking at them hurts. That pressure reaches everything else: sleep, marriage, prayer, and peace of mind. It isn't a verdict on your worth or your faith. A job loss, a medical bill, low wages, or a divorce can put anyone here, and if some of it came from choices you regret, those can change too. In Mark 12 Jesus honored a poor widow's two small coins above the large gifts of the rich, so God doesn't measure faithfulness by the size of the gift. Nothing here is financial advice.",
        steps: [
          "Make one list of everything you owe and everything due this month. Seeing it all in one place is frightening, and it's also the first step out.",
          "Talk with someone who can help: a nonprofit credit counselor, your church's benevolence fund if it has one, or a trusted friend who is wise with money. Asking for help isn't failure.",
          "If money pressure is straining your marriage, go over the list together at a calm time, as partners working on one problem rather than opponents.",
        ],
        next: [
          { kind: "Find help", title: "Money is a weight on me", href: "/help/money" },
          { kind: "How-to", title: "How to Get Out of Debt", href: "/how-tos/wm-how-to-get-out-of-debt" },
          { kind: "Wisdom", title: "Financial Hardship", href: "/wisdom/financial-hardship" },
        ],
      },
    },
  },
  {
    name: "Emotional Health",
    slug: "emotional",
    scripture: { ref: "Philippians 4:6-7" },
    description:
      "The inner life that shapes the outer one. Whether you know yourself well enough to be honest, bounded enough to be safe, and rested enough to be present.",
    questions: [
      {
        id: 16,
        text: "I can name what I am feeling in the moment, not hours later or never.",
      },
      {
        id: 17,
        text: "I maintain healthy boundaries: I can say no without guilt, protect my time without apology, and distinguish between my responsibilities and other people's emergencies.",
      },
      {
        id: 18,
        text: "I practice genuine rest: not just the absence of work, but activities and rhythms that actually replenish my soul rather than simply numbing my fatigue.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You usually know what you're feeling while you're feeling it, you can say no without guilt running your day, and you rest in ways that actually restore you. That makes you steadier under pressure and easier to be close to. It doesn't mean you won't have anxious or dark seasons; steady people have them too, and one hard year can wear down habits that took many years to build. Paul wrote Philippians 4:6-7 in chains, and its promise is that God's peace will guard your heart and mind, not that trouble will stay away. The growth at this level usually turns outward, toward noticing the people around you who are struggling and staying with them.",
        steps: [
          "When a friend says *fine* and you can tell it isn't true, ask once more, gently, and wait for the answer.",
          "Keep your weekly rest even in a demanding month. A rhythm is easier to protect than to rebuild.",
          "Ask someone close to you which feeling they think you still avoid, and listen without defending yourself.",
        ],
        next: [
          { kind: "Self-check", title: "Emotional Health Self-Check", href: "/tools/emotional-health" },
          { kind: "How-to", title: "How to Examine Your Day (the Daily Examen)", href: "/how-tos/sf-how-to-examine-your-day-the-daily-examen" },
        ],
      },
      mid: {
        interpretation:
          "Your inner life is getting some attention, but not consistently. You may read your feelings well on a calm day and lose track of them on a hard one, hold a line with some people and not with others, or rest now and then but mostly collapse when you're spent. That's ordinary, and it doesn't mean you're unstable or unspiritual. Plenty of us were raised to keep feelings to ourselves, and a full life leaves little room to notice them. Philippians 4:6 asks us to bring everything to God in prayer, which is easier once you know what you're carrying. The next step is to notice sooner and to rest on purpose.",
        steps: [
          "Three times a day this week, pause and name what you're feeling in one honest word, something truer than *fine*, and jot it down.",
          "Say no to one small request this week that you'd normally accept out of guilt, and notice what actually happens afterward.",
          "Set aside half a day this week with no work and no errands, and plan it ahead so it doesn't get given away.",
        ],
        next: [
          { kind: "Self-check", title: "Emotional Health Self-Check", href: "/tools/emotional-health" },
          { kind: "Wisdom", title: "Saying No", href: "/wisdom/saying-no" },
          { kind: "How-to", title: "How to Keep a Sabbath", href: "/how-tos/sf-how-to-keep-a-sabbath" },
        ],
      },
      low: {
        interpretation:
          "Your inner life seems to be under heavy strain. Feelings may arrive all at once or hardly at all, other people's needs may be setting the terms of your days, and rest may come only when you run out. That's exhausting, and it isn't a character flaw. People often land here after long seasons of caring for others, grief that never had room, worry that won't let go, or years of being the dependable one. Philippians 4:6-7 invites you to bring every worry to God as it is; you don't have to feel calm first. If you've felt low, numb, or anxious most days for more than two weeks, or it's changing your sleep, your appetite, or your ability to work, please talk with your doctor or a licensed counselor. That's wisdom, not a lack of faith, and it comes first.",
        steps: [
          "Make an appointment with your doctor or a licensed counselor this week. You can say, *I haven't been doing well for a while, and I'd like to talk about it.*",
          "Tell one person you trust how you're really doing. One honest sentence is enough to begin.",
          "Tonight, end the day an hour early. Whatever is still undone can wait until morning.",
        ],
        next: [
          { kind: "Find help", title: "I can't stop worrying", href: "/help/anxiety" },
          { kind: "Find help", title: "I feel empty, and I don't know why", href: "/help/empty" },
          { kind: "Self-check", title: "Emotional Health Self-Check", href: "/tools/emotional-health" },
        ],
      },
    },
  },
  {
    name: "Vocational Purpose",
    slug: "vocation",
    scripture: { ref: "Colossians 3:23" },
    description:
      "Not whether you have a job, but whether your work has a meaning that outlasts the paycheck. Whether you know why you do what you do. Work here means whatever fills your days, paid or unpaid: a job, a home, school, or caring for someone.",
    questions: [
      {
        id: 19,
        text: "I have a clear sense of calling: I can articulate why I do what I do, and that answer goes deeper than financial necessity.",
      },
      {
        id: 20,
        text: "I find genuine satisfaction in my work most days: not every moment, but a prevailing sense that what I do matters and uses what I have been given.",
      },
      {
        id: 21,
        text: "My work has visible impact: I can see how it serves others, contributes to something larger than myself, and aligns with what I believe God has asked of me.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "You know why you do what you do, you find real satisfaction in your work most days, and you can see how it serves others and answers what God has asked of you. That's a deep gift. It doesn't mean every day is good or that your work will always look like this; roles end, bodies age, and seasons change. At this level the usual danger is overwork, because meaningful work can seem to justify any cost, and the people at home tend to pay it first. Genesis 2 opens with God resting on the seventh day and then gives the man work in the garden before anything has gone wrong. Keep both, the work and the rest.",
        steps: [
          "Choose one limit for your work this season, such as a time you stop each evening or a day you don't check email, and tell someone who will ask you about it.",
          "Help someone who is still searching for their calling by telling them specifically what you see them do well.",
          "Thank God this week for your work by name, including the parts no one else sees.",
        ],
        next: [
          { kind: "Life", title: "Is Ambition a Sin? Drive, Hustle, and Rest", href: "/life/ambition-and-rest" },
          { kind: "How-to", title: "How to Fight the Idol of Success", href: "/how-tos/wm-how-to-fight-the-idol-of-success" },
        ],
      },
      mid: {
        interpretation:
          "You have some sense of purpose in your work, but it's uneven. You may enjoy what you do but struggle to connect it to anything larger, know what you're made for but spend your days elsewhere, or find meaning in some weeks and simply get through others. That's a common place to be, and it doesn't mean you're in the wrong job or have missed your calling. Much of any calling is lived in ordinary work that's only partly satisfying. Colossians 3:23 asks us to put our whole selves into whatever we do, as work for the Lord, so today's work counts even when it isn't your dream. The next step is to close the gap a little, from where you are.",
        steps: [
          "Write down the moments in the past month when your work felt most worthwhile, and look for what they have in common.",
          "Ask two people who know you well what kind of work seems to bring you most alive, and listen for what repeats.",
          "Find one place to use a gift you're not using at work, whether in your role, at church, or in your neighborhood, and try it for a month.",
        ],
        next: [
          { kind: "Life", title: "What Does the Bible Say About Work and Calling?", href: "/life/work-as-worship" },
          { kind: "How-to", title: "How to Discern Your Calling", href: "/how-tos/wm-how-to-discern-your-calling" },
        ],
      },
      low: {
        interpretation:
          "Work seems to be a hard place for you right now. You may feel stuck in a job that doesn't fit, burned out in one that used to, unsure what you're for, or without work at all. That weighs on more than your days, because it can reach your sense of worth. It doesn't mean your life has no purpose, and your worth was never set by your job. Colossians 3:23 was first addressed to slaves, people with no say over their work, and it told them their work was done for the Lord, who would reward it. Your work, paid or unpaid, is seen. If you're burned out, rest comes before any big decision, and no big decision should be made alone.",
        steps: [
          "If you're exhausted, take real rest before making any major decision about your work. Burnout makes every option look worse than it is.",
          "Talk with a pastor or a mentor about what's happening at work, and ask them to help you sort out what can change from what you'll need to carry for now.",
          "Write down three ways you served someone this week, at work or anywhere else. Your purpose is larger than a job title.",
        ],
        next: [
          { kind: "Find help", title: "I'm burned out at work", href: "/help/work-burnout" },
          { kind: "Find help", title: "How do I know what God wants me to do?", href: "/help/decisions" },
          { kind: "Life", title: "When the Work Is Gone: Unemployment and Worth", href: "/life/unemployment-and-the-lost-job" },
        ],
      },
    },
  },
  {
    name: "Community & Friendship",
    slug: "community",
    scripture: { ref: "Proverbs 27:17" },
    description:
      "Whether you are known or merely recognized. Whether you have people who will tell you the truth, sit with you in silence, and come when you call at 2 a.m.",
    questions: [
      {
        id: 22,
        text: "I have at least two friendships of genuine depth, people who know my failures, my fears, and my real life, not just my public one.",
      },
      {
        id: 23,
        text: "I resist the pull toward isolation. When I am struggling, I move toward people rather than away from them, even when it is uncomfortable.",
      },
      {
        id: 24,
        text: "I actively serve my community (my church, my neighborhood, the people around me), contributing to something beyond my own household.",
      },
    ],
    levels: {
      high: {
        interpretation:
          "A few people know your real life, you move toward others when you're struggling, and you serve beyond your own household. That's one of the strongest supports a life can have, and it usually comes from years of staying in touch, forgiving, and making time. It doesn't mean you'll never be lonely; moves, losses, and new seasons can thin even strong friendships. Proverbs 27:17 pictures friends sharpening each other like iron on iron, which takes honesty as well as warmth. The risk at this level is a circle that quietly closes. Look for the person at its edge, the one who came once and didn't come back, and make room for them.",
        steps: [
          "Invite someone who is new or alone to a meal this month, with a real date and time rather than *we should get together sometime*.",
          "Ask one close friend whether there's anything they've been wanting to tell you and haven't.",
          "Keep one standing time with your closest friends, such as a weekly call or a monthly breakfast, so busy seasons don't quietly end the friendship.",
        ],
        next: [
          { kind: "Study guide", title: "Hospitality: A Bible Study on the Open Door", href: "/studyguides/hospitality" },
          { kind: "Wisdom", title: "Welcoming Newcomers", href: "/wisdom/welcoming-newcomers" },
        ],
      },
      mid: {
        interpretation:
          "You have people in your life, but few who know how you're really doing. Your friendships may be warm but stay near the surface, you may pull away when life gets hard even though you know better, or your serving may keep you busy without making you known. That's ordinary in adult life, when work, family, and moves make friendship harder to keep, and it doesn't mean you're unlikable or bad at friendship. Depth usually grows from time and honesty with the same few people, not from meeting more of them. Galatians 6:2 asks us to carry one another's burdens, and that can't happen until someone knows what yours are. The next step is to go a little deeper with someone you already know.",
        steps: [
          "Choose the friend you're closest to and tell them one true thing about how you're doing that you'd usually keep to yourself.",
          "The next time you're struggling, text one person before you withdraw: *Rough week. Could we talk?*",
          "Join a serving team or small group that meets every week, so you see the same people often enough to know them.",
        ],
        next: [
          { kind: "How-to", title: "How to Build Deep Friendships as an Adult", href: "/how-tos/rel-how-to-build-deep-friendships-as-an-adult" },
          { kind: "Life", title: "Why Is It So Hard to Make Real Friends as an Adult?", href: "/life/friendship-against-isolation" },
        ],
      },
      low: {
        interpretation:
          "You seem to be mostly alone with your life right now. There may be no one who knows what you're really carrying, you may pull away when things get hard, and you may not belong anywhere that would miss you. Loneliness hurts, and it says nothing bad about your character or your faith. People land here after moves, divorce, the death of a spouse, church hurt, long seasons of caregiving, or simply because adult life scattered their friends. Ecclesiastes 4 pities the one who falls with no one to help him up, so Scripture takes this ache seriously. The way back usually starts with one person and one small risk.",
        steps: [
          "Reach out to one person this week, by phone or in person rather than by text, and say, *I've been more isolated than I'd like, and I'd love to see you.*",
          "Go to the same gathering every week for a month, such as a church service, a class, or a group, so the same faces become familiar.",
          "If loneliness has started to feel hopeless, tell a pastor, a counselor, or your doctor. You don't have to find your way out of this alone.",
        ],
        next: [
          { kind: "Find help", title: "I feel so alone", href: "/help/loneliness" },
          { kind: "Care plan", title: "Eight Weeks Toward Being Known", href: "/plans/loneliness" },
        ],
      },
    },
  },
];

/* ── Helpers ───────────────────────────────────────────────────── */

function getScoreLevel(score: number): Level {
  if (score >= 12) return "high";
  if (score >= 8) return "mid";
  return "low";
}

function getLevelLabel(level: Level): string {
  if (level === "high") return "Strength";
  if (level === "mid") return "Developing";
  return "Needs Attention";
}

function getLevelColor(level: Level): string {
  if (level === "high") return "var(--ok)";
  if (level === "mid") return "var(--mustard)";
  return "var(--alert)";
}

function getLevelBg(level: Level): string {
  if (level === "high") return "var(--ok-bg)";
  if (level === "mid") return "rgba(212,160,23,0.1)";
  return "var(--alert-bg)";
}

interface OverallBand {
  label: string;
  color: string;
  /** 150 to 300 words: what this usually means, what it doesn't, why people land here, what to do first. */
  paragraphs: string[];
  /** The lowest band shows the talk-to-a-person block before anything else. */
  seekHelp: boolean;
  /** The one next step this band leads with. */
  next: { lead: string; cta: string; href: string };
}

/** Bands on the share of the points available: 120 when every area is
 *  answered, less when the reader set an area aside. */
function getOverallInterpretation(score: number, maxScore: number): OverallBand {
  const pct = score / maxScore;
  if (pct >= 0.8)
    return {
      label: "Thriving",
      color: "var(--ok)",
      paragraphs: [
        "Your answers describe a life that is getting real attention. Across most of these areas the pattern is steady: prayer that happens when no one is watching, care for the people closest to you and for your own body, money held with an open hand, rest that actually restores, work with meaning, and a few people who know how you really are. A result like this usually means ordinary habits have been doing quiet work for years. That doesn't happen by accident, and it's worth thanking God for.",
        "It doesn't mean you're finished, and it doesn't make you a measuring stick for anyone else. A short self-check can't see everything, and a high score can reflect a calm season as much as deep roots. People usually land here for one of a few reasons: someone taught them these habits early, they came through something hard and it changed them, or life is simply lighter right now than it has been. It's worth knowing which is true of you, because light seasons end, and habits are what carry a person when they do.",
        "Start with your lowest area below, even if it scored well, because drift usually begins wherever attention quietly stops. Ask one person who knows you well whether they'd describe your life the way these answers do. Then look outward. A steady life is often the first place a struggling friend turns, and several of the steps below are about being that friend without taking over.",
      ],
      seekHelp: false,
      next: {
        lead: "To keep what's working on purpose, write it down. A rule of life puts your rhythms of prayer, rest, work, and friendship in one place, so you'll notice when one of them starts to slip.",
        cta: "Rule of Life Builder",
        href: "/tools/rule-of-life",
      },
    };
  if (pct >= 0.6)
    return {
      label: "Growing",
      color: "var(--mustard)",
      paragraphs: [
        "Your answers show real strength in some parts of your life and real strain in others. That's an ordinary shape for a life to take. We tend to care for the areas that come naturally, or the ones other people can see, and let the rest run on leftovers. So a person with a steady prayer life can be exhausted in body, and a person who gives generously can have no one who knows how they're really doing. The breakdown below shows where your own strength and strain sit.",
        "This result doesn't mean you're failing, and it doesn't mean your faith is shallow. It means the weight of your life isn't carried evenly, and the weakest place is holding more than it can hold for long. The reasons are rarely dramatic: a demanding job, small children or aging parents, a move, a loss that never got grieved, or a church culture that admired busyness more than rest. Most of us have helped build that culture by praising the people who never stopped.",
        "Begin with the one or two areas below that scored lowest, and read what each says about your level. Choose one step in one area, keep it for two weeks, and tell someone which step you chose, so it doesn't fade into a private resolution. Don't try to fix everything at once. Your strong areas are real, and they're what will hold you up while you tend the weak one.",
      ],
      seekHelp: false,
      next: {
        lead: "Your results already show which parts of life need attention. This eight-week plan gives each of them a week of its own, from the inner life and the body to friendship, work, money, and the local church, and ends with a simple rule of life that holds them together.",
        cta: "Eight Weeks Toward One Undivided Life",
        href: "/plans/whole-life",
      },
    };
  if (pct >= 0.4)
    return {
      label: "Under Strain",
      color: "var(--strain)",
      paragraphs: [
        "Your answers suggest that several parts of your life are carrying more than they can hold for long. The things that usually keep a person steady, such as prayer, sleep, honest friendship, a workable budget, and unhurried time with the people you love, are thin in more than one place, and strain in one area borrows from the others. Money worry costs sleep, exhaustion shortens patience at home, and loneliness makes everything heavier. You may still look fine from the outside, and the people around you may not know.",
        "This isn't a verdict on your character or your faith, and it isn't a diagnosis. A self-check can reflect only what you told it; it can't tell you why. Results like this usually follow a long stretch of giving more than you receive: a hard job, a new baby, caring for a parent, a loss, a marriage under pressure, or years of an unspoken rule to keep going and not complain. Churches can reward that rule, and most of us have admired it in someone it was quietly wearing out.",
        "Before you add any new discipline, tell one person the truth about how you are: a friend, your pastor, or a licensed counselor, someone who will listen before trying to fix anything. If the strain has lasted more than a few weeks, or it's changing your sleep, your appetite, or your ability to work, see your doctor as well. Then pick the area below whose repair would lift the most weight from the others, and take one small step there this week. You don't have to repair everything at once, but someone else needs to know.",
      ],
      seekHelp: false,
      next: {
        lead: "When several things are pressing at once, start with the one that's loudest. Find Help lets you say it in your own words and points you to the pages written for it.",
        cta: "Find help",
        href: "/help",
      },
    };
  return {
    label: "Carrying Too Much",
    color: "var(--alert)",
    paragraphs: [
      "Your answers describe someone carrying too much in almost every part of life at once. Prayer, rest, the people closest to you, money, work, and friendship all seem to be under strain, and when that many supports are thin at the same time, each one makes the others harder to hold. That's a heavy place to be, and it took honesty to answer the way you did.",
      "Before any practice on this page, please talk with a real person this week. Your doctor is a good first call, because exhaustion, low mood, and poor sleep can have physical causes worth checking. A licensed counselor can help you sort out what's happening and what would help most, and a pastor you trust can walk with you through it. You don't need the right words; you can print this page and bring it with you. Nothing here is medical advice.",
      "This result isn't a diagnosis, and it isn't a verdict on your faith or your worth. A self-check can show that many things are hard right now, but not why. Results like this usually follow a season when several hard things landed together: a loss, a marriage in trouble, a job ending, an illness, money running short, or a long stretch of caring for others with no one caring for you. Seasons like this do change, usually one conversation and one small step at a time.",
      "Once you've told someone, choose the one area below that feels most urgent, which may not be the lowest number, and read only that one for now. If any of this has turned into thoughts of not wanting to be alive, call or text 988 at any hour.",
    ],
    seekHelp: true,
    next: {
      lead: "After you've talked with someone, start from whatever feels heaviest. Find Help lets you name it in your own words, points you to the pages written for it, and keeps the crisis lines in full on the same page.",
      cta: "Find help",
      href: "/help",
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

const STORAGE_KEY = "livewell-progress-life-audit";

interface StoredProgress {
  answers: Record<number, number>;
  step: number;
  savedAt: string;
  /** Slugs of the areas the reader set aside. Older saves have none. */
  setAside?: string[];
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
    Object.values(p.answers).every((v) => typeof v === "number") &&
    (p.setAside === undefined ||
      (Array.isArray(p.setAside) &&
        p.setAside.every((s) => typeof s === "string")))
  );
}

/* ── Component ─────────────────────────────────────────────────── */

export default function LifeAudit() {
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
  // Only an optional area can be set aside; anything else in an old or
  // hand-edited save is ignored.
  const [setAside, setSetAside] = useState<string[]>(() =>
    (saved?.setAside ?? []).filter((slug) =>
      CATEGORIES.some((c) => c.slug === slug && c.optional),
    ),
  );
  const [showResults, setShowResults] = useState(false);
  const [resumed, setResumed] = useState(
    () =>
      saved !== null &&
      (Object.keys(saved.answers).length > 0 ||
        saved.step > 0 ||
        (saved.setAside?.length ?? 0) > 0),
  );
  const [persistFailed, setPersistFailed] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const persist = (
    nextAnswers: Record<number, number>,
    nextStep: number,
    nextSetAside: string[] = setAside,
  ) => {
    setPersistFailed(
      !writeStoredJSON(STORAGE_KEY, {
        answers: nextAnswers,
        step: nextStep,
        savedAt: new Date().toISOString(),
        setAside: nextSetAside,
      }),
    );
  };

  const isSetAside = (cat: Category) => setAside.includes(cat.slug);
  const isComplete = (cat: Category) =>
    isSetAside(cat) || cat.questions.every((q) => answers[q.id] !== undefined);

  const category = CATEGORIES[currentCategory];
  const applicable = CATEGORIES.filter((c) => !isSetAside(c));
  const totalQuestions = applicable.reduce((n, c) => n + c.questions.length, 0);
  const answeredCount = applicable.reduce(
    (n, c) => n + c.questions.filter((q) => answers[q.id] !== undefined).length,
    0,
  );
  const progress = totalQuestions ? (answeredCount / totalQuestions) * 100 : 100;

  const canProceed = isComplete(category);
  const isLastCategory = currentCategory === CATEGORIES.length - 1;
  const allAnswered = CATEGORIES.every(isComplete);
  const nextEnabled = isLastCategory ? allAnswered : canProceed;

  const handleRate = (questionId: number, value: number) => {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    setResumed(false);
    persist(next, currentCategory);
  };

  const toggleSetAside = (slug: string) => {
    const next = setAside.includes(slug)
      ? setAside.filter((s) => s !== slug)
      : [...setAside, slug];
    setSetAside(next);
    setResumed(false);
    persist(answers, currentCategory, next);
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
    setSetAside([]);
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

  // A set-aside area is left out of everything that scores: the total, the
  // bands, the strengths and growth areas, and the history.
  const maxScore = applicable.reduce((n, c) => n + c.questions.length * 5, 0);
  const totalScore = applicable.reduce(
    (sum, cat) => sum + getCategoryScore(cat),
    0
  );
  const setAsideNames = CATEGORIES.filter(isSetAside).map((c) => c.name);

  const overall = getOverallInterpretation(totalScore, maxScore);

  // Compute strengths and growth areas
  const categoryScores = applicable.map((cat) => ({
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
        title="Life Audit: A Self-Check Across Eight Areas of Life"
        description="Twenty-four questions across eight areas of life: faith, marriage, parenting, health, money, emotions, work, and friendship. A self-check for reflection, not a diagnosis, with honest results and next steps."
        keywords="life audit, life self-check, life assessment, spiritual health, marriage, parenting, physical health, financial health, emotional health, vocation, community, Christian life"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Life Audit",
          description:
            "A self-check across eight areas of life, for reflection rather than diagnosis, with an honest reading of each area and practical next steps.",
          url: "https://www.livewellbyjamesbell.co/tools/life-audit",
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
            Twenty-four statements about eight parts of your life, from prayer
            and marriage to money, work, and friendship. It takes about ten
            minutes. Answer for how things have really been lately, not how you
            wish they were, and if a part doesn't fit your life, such as
            parenting when you have no children, you can set it aside.
          </p>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              fontFamily: "var(--B)",
              maxWidth: "560px",
              margin: "12px auto 0",
            }}
          >
            This is a self-check for reflection, not a test or a diagnosis, and
            your answers stay on this device unless you choose to leave a copy
            with us at the end.
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
                        : isComplete(cat)
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
        <section
          style={{ padding: "48px 32px 80px", background: "var(--bone)" }}
        >
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

              {/* An area that doesn't fit every life can be set aside */}
              {category.optional && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "16px 20px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--ink)",
                      fontFamily: "var(--B)",
                      margin: "0 0 10px",
                    }}
                  >
                    {category.optional.hint}
                  </p>
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      minHeight: "44px",
                      fontSize: "14px",
                      fontFamily: "var(--U)",
                      fontWeight: 600,
                      color: "var(--ink)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSetAside(category)}
                      onChange={() => toggleSetAside(category.slug)}
                      style={{
                        width: "18px",
                        height: "18px",
                        accentColor: "var(--mustard)",
                        cursor: "pointer",
                      }}
                    />
                    Set this part aside
                  </label>
                </div>
              )}
            </div>

            {/* Questions */}
            {isSetAside(category) ? (
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  fontFamily: "var(--B)",
                  margin: "0 0 48px",
                }}
              >
                This part is set aside. It won't count for or against you, and
                you can bring it back at any time by unchecking the box above.
              </p>
            ) : (
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
            )}

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
                disabled={!nextEnabled}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: "2px",
                  cursor: nextEnabled ? "pointer" : "default",
                  transition: "all 0.2s",
                  background: nextEnabled
                    ? "var(--mustard)"
                    : "var(--bone-muted)",
                  color: nextEnabled ? "var(--ink)" : "var(--ink-muted)",
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
          aria-label="Your life audit results"
          style={{ padding: "48px 32px 80px", background: "var(--bone)", outline: "none" }}
        >
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <ToolActions toolName="Life Audit" onStartOver={handleRestart} />
            <SafetyCheck />
            <SelfCheckHistory
              id="life-audit"
              total={totalScore / maxScore}
              areas={Object.fromEntries(applicable.map((c) => [c.name, getCategoryScore(c) / (c.questions.length * 5)]))}
              answersKey={setAside.length ? JSON.stringify({ answers, setAside }) : JSON.stringify(answers)}
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
                  / {maxScore}
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
              {setAsideNames.length > 0 && (
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "var(--U)",
                    color: "var(--ink-muted)",
                    margin: "-12px auto 24px",
                  }}
                >
                  You set aside {setAsideNames.join(" and ")}, so this score is
                  out of {maxScore}.
                </p>
              )}
              {overall.paragraphs.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    maxWidth: "60ch",
                    margin: i === 0 ? "0 auto" : "16px auto 0",
                    textAlign: "left",
                  }}
                >
                  {para}
                </p>
              ))}

              {overall.seekHelp && (
                <div
                  style={{
                    marginTop: "24px",
                    background: "var(--bone)",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid var(--mustard)",
                    borderRadius: "2px",
                    padding: "20px 24px",
                    maxWidth: "60ch",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "left",
                  }}
                >
                  <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", margin: "0 0 10px" }}>
                    A word before the practical steps
                  </p>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.75, color: "var(--ink)", margin: "0 0 14px" }}>
                    A result in this range is a reason to talk with a real
                    person, not a reason to try harder on your own. Seeing a
                    licensed counselor is wisdom, not a failure of faith. And if
                    the weight has turned into not wanting to be here, please
                    don't carry that alone for another night.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <a href="tel:988" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                      988 Suicide &amp; Crisis Lifeline: call or text 988, any hour →
                    </a>
                    <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                      Find a licensed counselor near you →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* The next step this band leads with */}
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
                  marginBottom: "12px",
                }}
              >
                YOUR NEXT STEP
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "var(--ink)",
                  fontFamily: "var(--B)",
                  maxWidth: "68ch",
                  margin: "0 0 20px",
                }}
              >
                {overall.next.lead}
              </p>
              <Link
                href={overall.next.href}
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
                {overall.next.cta}
                <ChevronRight size={16} />
              </Link>
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
                  if (isSetAside(cat)) {
                    return (
                      <div
                        key={cat.slug}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "17px",
                            fontWeight: 500,
                            color: "var(--ink-muted)",
                          }}
                        >
                          {cat.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--U)",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "var(--ink-muted)",
                          }}
                        >
                          Set aside
                        </span>
                      </div>
                    );
                  }
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
                gridTemplateColumns: "repeat(auto-fit, minmax(min(260px,100%),1fr))",
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
                  borderTop: "3px solid var(--ok)",
                }}
              >
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--ok)",
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
                        color: "var(--ok)",
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
                  borderTop: "3px solid var(--alert)",
                }}
              >
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--alert)",
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
                        color: "var(--alert)",
                        fontWeight: 600,
                      }}
                    >
                      {g.score} / 15
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "var(--ink-muted)",
                fontFamily: "var(--B)",
                maxWidth: "68ch",
                margin: "0 0 24px",
              }}
            >
              This self-check is for reflection. It isn't medical, financial,
              or legal advice, and it can't stand in for a doctor, a counselor,
              or a financial professional who knows your situation.
            </p>

            {/* Per-Category Detail */}
            {CATEGORIES.map((cat) => {
              if (isSetAside(cat)) {
                return (
                  <div
                    key={cat.slug}
                    style={{
                      background: "var(--card)",
                      borderRadius: "2px",
                      padding: "28px 40px",
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
                          color: "var(--ink-muted)",
                          padding: "4px 12px",
                          background: "var(--bone)",
                          borderRadius: "2px",
                        }}
                      >
                        SET ASIDE
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.8,
                        color: "var(--ink-muted)",
                        fontFamily: "var(--B)",
                        margin: 0,
                      }}
                    >
                      You set this part aside, so it isn't counted in your
                      results. If it fits your life later, use Change my
                      answers to bring it back.
                    </p>
                  </div>
                );
              }
              const score = getCategoryScore(cat);
              const level = getScoreLevel(score);
              const levelLabel = getLevelLabel(level);
              const levelColor = getLevelColor(level);
              const levelBg = getLevelBg(level);
              const guide = cat.levels[level];

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
                      {levelLabel.toUpperCase()}: {score}/15
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

                  {/* What this level means in this area */}
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.8,
                      color: "var(--ink)",
                      fontFamily: "var(--B)",
                      marginBottom: "24px",
                    }}
                  >
                    {withItalics(guide.interpretation)}
                  </p>

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
                      marginBottom: "24px",
                    }}
                  >
                    {guide.steps.map((step, i) => (
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
                          {withItalics(step)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Where to go next, for this area at this level */}
                  <h4
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--ink-muted)",
                      fontFamily: "var(--U)",
                      marginBottom: "12px",
                    }}
                  >
                    WHERE TO GO NEXT
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {guide.next.map((n) => (
                      <Link
                        key={n.href}
                        href={n.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                          padding: "14px 20px",
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
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.15em",
                              color: "var(--mustard-text)",
                              fontFamily: "var(--U)",
                              display: "block",
                              marginBottom: "4px",
                            }}
                          >
                            {n.kind.toUpperCase()}
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
                            {n.title}
                          </span>
                        </div>
                        <ChevronRight
                          size={16}
                          style={{ opacity: 0.4, flexShrink: 0 }}
                        />
                      </Link>
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
                Print Your Life Audit Summary
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
                Take the self-check again
              </button>
            </div>

            {/* Email Results */}
            <EmailResults
              toolName="Life Audit"
              resultsSummary={
                `Life Audit Results\n\nOverall: ${totalScore}/${maxScore} (${overall.label})\n\n` +
                CATEGORIES.map(
                  (cat) => {
                    if (isSetAside(cat)) return `${cat.name}: set aside`;
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
