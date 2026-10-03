/**
 * The Spiritual Gifts Self-Check (/tools/spiritual-gifts).
 *
 * docs/grow/GROW-PROMPT.md, need 31 ("Spiritual gifts test"): "An original
 * self-check that states the continuationist and cessationist views fairly."
 *
 * Thirty-two statements in eight areas, built from the gifts Scripture itself
 * names (Romans 12:6-8; 1 Corinthians 12:4-11 and 27-31; Ephesians 4:11-13;
 * 1 Peter 4:10-11) and from the purpose those passages give them, which is
 * building up the body. Every statement asks what the reader has actually
 * done or how others received it, never what they wish. One statement in each
 * area is worded the other way and scored in reverse (6 minus the answer), so
 * answering "very true" to everything does not read as a gift everywhere, and
 * an area where a reader called both a statement and its opposite true is
 * named on the results screen as worth a second look. The reverse statements
 * describe a habit rather than a response to an occasion, so a reader who has
 * never had the occasion is not scored as gifted by default.
 *
 * Original, not an imitation (GROW-PROMPT 5.7): no acrostic, no personality
 * types, and no ranking of gifts. Every reader sees the areas in the same
 * order, because 1 Corinthians 12:21-26 ranks no part of the body above
 * another. The miraculous gifts are left out on purpose; see ScopeNote.
 *
 * Progress saves to this browser only (lib/storage,
 * livewell-progress-spiritual-gifts), and SelfCheckHistory keeps past results.
 */
import { useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight, Printer } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import ScriptureNote from "@/components/ScriptureNote";
import { ToolActions } from "@/components/ToolActions";
import { SelfCheckHistory } from "@/components/SelfCheckHistory";
import { CrisisBlock } from "@/components/CrisisBlock";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { scrollBehavior } from "@/lib/motion";

/* ── Types ─────────────────────────────────────────────────────── */

export type AreaId =
  | "teaching"
  | "encouraging"
  | "mercy"
  | "serving"
  | "giving"
  | "leading"
  | "hospitality"
  | "sharing";

/** The three levels levelFor computes for an area. */
export type Level = "clear" | "some" | "few";

type Answers = Record<string, number>;

export interface Item {
  id: string;
  area: AreaId;
  text: string;
  /** Worded the other way: agreeing means less of this area, so it scores 6 minus the answer. */
  reverse?: boolean;
}

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
  /** Two or three live pages that fit this area at this level. */
  next: NextStep[];
}

export interface Area {
  id: AreaId;
  name: string;
  /** Where Scripture names this gift. */
  named: string;
  description: string;
  /** Berean Standard Bible, verbatim from `node scripts/bsb.mjs "<ref>"`. */
  scripture: { ref: string; text: string };
  levels: Record<Level, LevelGuide>;
}

export type BandId = "several" | "one-or-two" | "some" | "untried";

interface OverallBand {
  label: string;
  /** 150 to 300 words: what this result means, what it doesn't, and what to do first. */
  paragraphs: string[];
  /** The one next step this band leads with. */
  next: { lead: string; cta: string; href: string };
  /** A slower step for later. */
  later: { lead: string; title: string; href: string };
}

/* ── The statements ────────────────────────────────────────────── */

export const SCALE = [
  { value: 1, label: "Not true of me" },
  { value: 2, label: "Mostly not true" },
  { value: 3, label: "Partly true" },
  { value: 4, label: "Mostly true" },
  { value: 5, label: "Very true of me" },
] as const;

/**
 * Display order: four parts of eight, one statement from each area per part,
 * so no part asks about a single gift and the reader isn't steered toward the
 * one they hope to have. The reverse-worded statements are spread across
 * parts two to four.
 */
export const ITEMS: Item[] = [
  // Part 1
  { id: "teach-1", area: "teaching", text: "People in my church have asked me to explain a passage more than once." },
  { id: "enc-1", area: "encouraging", text: "Someone has told me that a word from me helped them keep going when they wanted to quit." },
  { id: "mercy-1", area: "mercy", text: "I have kept visiting or calling someone through a hard season after most people stopped." },
  { id: "serve-1", area: "serving", text: "I have set up, cleaned up, or fixed things at church without being asked." },
  { id: "give-1", area: "giving", text: "I have given money or something I own to meet a need I saw." },
  { id: "lead-1", area: "leading", text: "I have organized a group of people to get something done, like an event, a project, or a team." },
  { id: "hosp-1", area: "hospitality", text: "I notice who is left out of a room before others do." },
  { id: "share-1", area: "sharing", text: "I have told someone who doesn't believe how I came to follow Jesus." },
  // Part 2
  { id: "teach-2", area: "teaching", text: "I usually leave explaining the Bible to other people.", reverse: true },
  { id: "enc-2", area: "encouraging", text: "I have gone to someone who was drifting from God and urged them to come back." },
  { id: "mercy-2", area: "mercy", text: "People who were hurting have told me I was easy to talk to." },
  { id: "serve-2", area: "serving", text: "Practical jobs, like setup, meals, or repairs, usually get done without me.", reverse: true },
  { id: "give-2", area: "giving", text: "I have given more than was comfortable because I saw a need." },
  { id: "lead-2", area: "leading", text: "When a group is stuck, people tend to look to me for a next step." },
  { id: "hosp-2", area: "hospitality", text: "When I'm with a group, I mostly stay with the people I already know.", reverse: true },
  { id: "share-2", area: "sharing", text: "People who don't share my faith have asked me questions about it." },
  // Part 3
  { id: "teach-3", area: "teaching", text: "I have taught a group more than once, such as a class, a Bible study, or children." },
  { id: "enc-3", area: "encouraging", text: "When a friend is discouraged, I usually leave the encouraging to someone else.", reverse: true },
  { id: "mercy-3", area: "mercy", text: "I have visited someone who was sick, in a care home, or in prison." },
  { id: "serve-3", area: "serving", text: "People know they can call me when there is a practical need, like a meal, a ride, or a move." },
  { id: "give-3", area: "giving", text: "When I see a need I could help meet, I usually hold back.", reverse: true },
  { id: "lead-3", area: "leading", text: "I have handed part of a job to someone else and helped them do it well." },
  { id: "hosp-3", area: "hospitality", text: "I have invited someone I didn't know well to share a meal." },
  { id: "share-3", area: "sharing", text: "I steer away from talking about faith with people who don't believe.", reverse: true },
  // Part 4
  { id: "teach-4", area: "teaching", text: "People have told me that something I explained helped a passage make sense to them." },
  { id: "enc-4", area: "encouraging", text: "When someone has a hard week, I am often the one who sends a note or calls." },
  { id: "mercy-4", area: "mercy", text: "When I hear that someone is sick or grieving, I usually wait for others to reach out first.", reverse: true },
  { id: "serve-4", area: "serving", text: "I have kept doing a behind-the-scenes job for months at a time." },
  { id: "give-4", area: "giving", text: "People have told me that something I gave arrived just when they needed it." },
  { id: "lead-4", area: "leading", text: "When something needs organizing, I usually wait for someone else to take charge.", reverse: true },
  { id: "hosp-4", area: "hospitality", text: "People who were new have told me I helped them feel welcome." },
  { id: "share-4", area: "sharing", text: "I have read the Bible with someone who was still exploring faith." },
];

/* ── The areas ─────────────────────────────────────────────────── */

export const LEVEL_LABELS: Record<Level, string> = {
  clear: "Clear signs",
  some: "Some signs",
  few: "Few signs yet",
};

/**
 * Every level of every area has its own reading, its own steps, and its own
 * next steps (docs/grow/GROW-PROMPT.md 7.2). Words a reader might say or
 * think are marked *like this* and set in italics; double quotation marks
 * belong to Scripture alone. The order is fixed and ranks nothing.
 */
export const AREAS: Area[] = [
  {
    id: "teaching",
    name: "Teaching and explaining",
    named: "Romans 12:7; 1 Corinthians 12:28; Ephesians 4:11",
    description: "Helping people understand what God has said, in a class, at a kitchen table, or with children.",
    scripture: {
      ref: "Colossians 3:16",
      text: "Let the word of Christ richly dwell within you as you teach and admonish one another with all wisdom, and as you sing psalms, hymns, and spiritual songs with gratitude in your hearts to God.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest people already come to you to understand the Bible, and that what you explain tends to land. You've been asked more than once, you've taught groups, and people have told you a passage finally made sense. That's worth taking seriously, and the confirmation you already have, people coming back, is the kind that matters most. It doesn't mean you've finished learning, or that you should teach everyone everything. James 3:1 warns that those who teach will be judged more strictly, so this gift comes with weight. The growth at this level is depth and humility: keep studying the text itself, ask to be corrected, and make room for someone newer to learn beside you.",
        steps: [
          "Ask your pastor or another teacher you trust to sit in on one lesson this season and tell you one thing to change.",
          "Choose one book of the Bible and study it slowly for a season, reading it whole several times before you read what anyone says about it.",
          "Invite someone who has never taught to help you prepare a lesson, then let them lead part of it.",
        ],
        next: [
          { kind: "How-to", title: "The Three Questions That Make Any Passage Teachable", href: "/how-tos/dm-three-questions-that-make-any-passage-teachable" },
          { kind: "Wisdom", title: "Mentoring and Discipling", href: "/wisdom/mentoring" },
          { kind: "Study guide", title: "The Story of the Bible: A Study of the Whole Canon", href: "/studyguides/the-story-of-the-bible" },
        ],
      },
      some: {
        interpretation:
          "There are real signs of teaching in your answers, but they're scattered. You may have explained a passage to a friend and watched it help, or taught a class once or twice, without anyone yet asking you to do it again. That's an ordinary place to be, and it doesn't settle anything either way. Many people who teach well began by explaining something small to one person and noticing that it helped. The way to find out is to teach more often, somewhere a more experienced teacher can watch and tell you the truth. If it's a gift, people will start to ask for it. If they don't, you'll still know the text better, and that's never wasted.",
        steps: [
          "Offer to lead one session of a small group or a children's class this season, and prepare it with someone who has taught before.",
          "Afterward, ask two people what was clear and what wasn't, and write down what they say.",
          "Read one short letter, like Philippians, three times through this month, so you have something of your own to explain.",
        ],
        next: [
          { kind: "How-to", title: "How to Open the Bible With People Who Have Never Read It", href: "/how-tos/dm-how-to-open-the-bible-with-people-who-have-never-read-it" },
          { kind: "Life", title: "Can an Ordinary Christian Make Disciples?", href: "/life/the-living-room-and-the-ordinary-disciple" },
          { kind: "How-to", title: "The Three Questions That Make Any Passage Teachable", href: "/how-tos/dm-three-questions-that-make-any-passage-teachable" },
        ],
      },
      few: {
        interpretation:
          "Teaching hasn't been much a part of your life so far, and this self-check can't tell you why. Often no one has asked, or you've assumed teaching belongs to people with training and a microphone. Neither is a verdict on your gifts. Colossians 3:16 expects ordinary Christians to “teach and admonish one another,” so some explaining belongs to every believer, whether or not it turns out to be your particular gift. If it isn't, nothing is lost. The body needs people who listen well and ask honest questions as much as it needs people who explain. Either way, the place to begin is the same: knowing the Bible better yourself.",
        steps: [
          "Read one Gospel this month, a chapter a day, and each day write one sentence about what it shows you of Jesus.",
          "Join a small group or class as a learner, and bring one honest question each time you meet.",
          "The next time a friend asks you something about the Bible, try answering before you point them elsewhere, then look it up together.",
        ],
        next: [
          { kind: "How-to", title: "How to Actually Read the Bible", href: "/how-tos/sf-how-to-actually-read-the-bible" },
          { kind: "Find help", title: "Where do I start reading the Bible?", href: "/help/reading-the-bible" },
          { kind: "Wisdom", title: "Knowing the Bible", href: "/wisdom/knowing-the-bible" },
        ],
      },
    },
  },
  {
    id: "encouraging",
    name: "Encouraging and exhorting",
    named: "Romans 12:8",
    description: "Putting courage into people: comforting the discouraged and urging the drifting to keep going.",
    scripture: {
      ref: "Hebrews 3:13",
      text: "But exhort one another daily, as long as it is called today, so that none of you may be hardened by sin’s deceitfulness.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest people find courage in what you say. You reach out when someone is having a hard week, you've urged a drifting friend to come back, and someone has told you your words kept them going. Romans 12:8 names encouraging as a gift, and the word Paul uses there can mean comforting and urging alike. The second half matters. Encouragement that only ever soothes can slide into flattery, and an encourager who needs to be liked will avoid the harder word. The growth at this level runs the other way: saying the true thing when it's unwelcome, and keeping what people tell you to yourself.",
        steps: [
          "Think of someone you've encouraged often, and ask whether there's a harder truth you've been avoiding with them. If there is, pray about it for a week, then say it gently.",
          "Keep a short list of people who are struggling and pray through it before you reach out, so your words come out of prayer and not only instinct.",
          "When someone tells you something in confidence, keep it there, even when passing it on would feel like asking others to pray.",
        ],
        next: [
          { kind: "How-to", title: "How to Have a Hard Conversation", href: "/how-tos/rel-how-to-have-a-hard-conversation" },
          { kind: "Wisdom", title: "Keeping a Confidence", href: "/wisdom/keeping-confidence" },
          { kind: "Wisdom", title: "People-Pleasing and the Fear of Man", href: "/wisdom/people-pleasing" },
        ],
      },
      some: {
        interpretation:
          "You encourage people some of the time, and it may be mostly the ones you're already close to. You may send a note now and then, or have said the right word once and heard later that it helped, but it isn't yet something others count on from you. That's common, and it isn't coldness. Busy weeks crowd out the small acts encouragement is made of, and it's easy to assume someone else has already called. Hebrews 3:13 asks believers to “exhort one another daily,” which makes this a practice for everyone before it's a particular gift for some. Practicing it is how you'll find out whether it's yours.",
        steps: [
          "Each week this month, send one specific note to someone in your church, naming something you've actually seen God do in them.",
          "Ask God each morning to bring one discouraged person to mind, and contact that person the same day.",
        ],
        next: [
          { kind: "Wisdom", title: "Encouraging Others", href: "/wisdom/encouraging-others" },
          { kind: "Life", title: "What Are the One Another Commands in the Bible?", href: "/life/life-together-the-one-anothers" },
          { kind: "Study guide", title: "Friendship: A Bible Study on the Love We Forgot", href: "/studyguides/friendship" },
        ],
      },
      few: {
        interpretation:
          "Encouraging others hasn't been a large part of your life lately. That may be because you're carrying a lot yourself, because words don't come easily to you, or because no one encouraged you and it never became a habit. None of that means you have nothing to give. Encouragement isn't eloquence. Often it's a short message, a name remembered, or a seat taken beside someone who is alone. And if you're the one who needs encouragement right now, there's no shame in receiving it first. Hebrews 3:13 asks believers to “exhort one another daily” so that none of them is hardened, which assumes every one of us will need it.",
        steps: [
          "This week, tell one person something specific you appreciate about them. One sentence is enough.",
          "Notice who sits alone at church or at work, and greet them by name.",
          "If you're the one who is discouraged, tell one person you trust how you're really doing, and let them encourage you.",
        ],
        next: [
          { kind: "Wisdom", title: "Encouraging Others", href: "/wisdom/encouraging-others" },
          { kind: "Find help", title: "I feel so alone", href: "/help/loneliness" },
        ],
      },
    },
  },
  {
    id: "mercy",
    name: "Mercy and care for the hurting",
    named: "Romans 12:8",
    description: "Moving toward people who are suffering, and staying after others have gone home.",
    scripture: {
      ref: "Romans 12:15",
      text: "Rejoice with those who rejoice; weep with those who weep.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest you move toward suffering rather than away from it. You keep visiting after the meals stop coming, hurting people find you easy to talk to, and you've sat in sickrooms, care homes, or prisons where few others go. Romans 12:8 names showing mercy as a gift and asks that it be done cheerfully, which suggests it's meant to last, not to drain you slowly. That's the risk at this level. People who carry others' pain well are often the last to notice their own exhaustion, and care can quietly turn into needing to be needed. Keep going, and let others carry some of it with you.",
        steps: [
          "Bring one other person on your next visit, so the care doesn't depend on you alone.",
          "Notice what you do to recover after a heavy visit. If the answer is nothing, plan a real stop into your week.",
          "Tell your pastor who you're visiting and how they are, so the church knows where its care is going.",
        ],
        next: [
          { kind: "How-to", title: "How to Sit With Someone Who Is Suffering", href: "/how-tos/ss-how-to-sit-with-someone-suffering" },
          { kind: "Wisdom", title: "Codependency and Losing Yourself", href: "/wisdom/codependency" },
          { kind: "Wisdom", title: "Exhaustion and Burnout", href: "/wisdom/exhaustion" },
        ],
      },
      some: {
        interpretation:
          "You care for hurting people some of the time, and some have found you a comfort. You may call when you hear bad news but find it hard to keep calling after the first week, or visit people you know well but not strangers. That's an honest place to be. Suffering is hard to be near, and most of us were never taught what to say, so we say nothing or too much. Romans 12:15 asks for something simpler than wisdom: “weep with those who weep.” Being there matters more than words, and staying matters more than the first visit. Whether mercy is your particular gift will show in whether you can keep at it.",
        steps: [
          "Choose one person in a hard season and set a reminder to contact them every week for two months.",
          "On your next visit to someone who is suffering, listen more than you speak, and don't try to explain their pain.",
        ],
        next: [
          { kind: "How-to", title: "How to Help a Friend Through Loss", href: "/how-tos/ss-how-to-help-a-friend-through-loss" },
          { kind: "Life", title: "How Do You Sit With Someone Who Is Dying?", href: "/life/caring-for-the-dying" },
          { kind: "Wisdom", title: "Kindness and Compassion", href: "/wisdom/kindness" },
        ],
      },
      few: {
        interpretation:
          "Caring for people who are suffering hasn't been much a part of your life so far. That can mean many things. You may be in a hard season yourself, you may have been hurt when you tried to help before, or you may fear saying the wrong thing and so stay back. Most people fear that. The good news is that mercy rarely depends on saying the right thing. It depends on going, and on staying a while. If showing mercy turns out not to be your particular gift, every Christian is still asked to “weep with those who weep,” and you can start small. If you're the one grieving right now, let others come to you first.",
        steps: [
          "Send a short message to someone you know who is grieving or sick. *I'm thinking of you and praying for you* is enough.",
          "Ask your church whether anyone needs a visit or a ride to an appointment this month, and go once with someone who has done it before.",
        ],
        next: [
          { kind: "How-to", title: "How to Sit With Someone Who Is Suffering", href: "/how-tos/ss-how-to-sit-with-someone-suffering" },
          { kind: "Find help", title: "Someone I love has died", href: "/help/grief" },
        ],
      },
    },
  },
  {
    id: "serving",
    name: "Serving and helping",
    named: "Romans 12:7; 1 Corinthians 12:28; 1 Peter 4:11",
    description: "Doing the practical work that keeps people fed, rooms ready, and things running, often where no one sees.",
    scripture: {
      ref: "Galatians 5:13",
      text: "For you, brothers, were called to freedom; but do not use your freedom as an opportunity for the flesh. Rather, serve one another in love.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest you're one of the people who keep things running. You help without being asked, people call you when there's a meal to cook or a move to make, and you've kept unseen jobs going for months. Paul names helping among the gifts in 1 Corinthians 12:28, and a few verses earlier he says “the parts of the body that seem to be weaker are indispensable.” The risk at this level is that faithful helpers say yes to everything until they're worn out or quietly resentful, and that others never learn to serve because you've always done it. Serving well sometimes means stepping back so someone else can step in.",
        steps: [
          "Name one job you do that someone else could learn, and teach it to them this season.",
          "Before you say yes to the next request, wait a day and ask whether it's yours to carry.",
          "Take one Sunday a month off from your tasks, and simply worship.",
        ],
        next: [
          { kind: "Wisdom", title: "Saying No", href: "/wisdom/saying-no" },
          { kind: "Wisdom", title: "Busyness and Overwhelm", href: "/wisdom/busyness-and-overwhelm" },
          { kind: "Wisdom", title: "Serving in the Church", href: "/wisdom/serving-in-the-church" },
        ],
      },
      some: {
        interpretation:
          "You serve in practical ways some of the time. You may help when you're asked, or when the need is right in front of you, without yet being someone people call first. That's how most serving begins. The difference between occasional help and a gift usually shows over time: whether the work gives you a steady kind of gladness, whether you keep at it when no one notices, and whether the people you help say it made a difference. None of that can be learned in a month. Galatians 5:13 asks every believer to “serve one another in love,” so start there, pick one place, and stay a while.",
        steps: [
          "Choose one ongoing practical job at your church, such as setup, coffee, or the nursery, and commit to it for three months.",
          "When a need comes up among people you know, like a meal or a ride, offer before anyone asks.",
        ],
        next: [
          { kind: "Wisdom", title: "Serving in the Church", href: "/wisdom/serving-in-the-church" },
          { kind: "Wisdom", title: "Being Reliable", href: "/wisdom/reliability" },
          { kind: "Wisdom", title: "Generosity with Time", href: "/wisdom/generosity-with-time" },
        ],
      },
      few: {
        interpretation:
          "Practical serving hasn't been much a part of your life lately, and there may be good reasons. Small children, long work hours, illness, or caring for a family member can leave little room for anything more, and a season like that is its own kind of service. It may also be that no one has asked, or that you weren't sure where help was needed. This result doesn't mean you have nothing to offer. Jesus said he came not to be served but to serve (Mark 10:45), and the way into serving is almost always small: one task, done once, then done again.",
        steps: [
          "Ask someone at your church where help is needed this month, and do one task once.",
          "If this is a season when you truly can't do more, say so to someone you trust, and let your serving for now be the people already in your care.",
        ],
        next: [
          { kind: "Wisdom", title: "Serving Others", href: "/wisdom/serving-others" },
          { kind: "Life", title: "Why Does Church Membership Still Matter?", href: "/life/church-membership-and-commitment" },
        ],
      },
    },
  },
  {
    id: "giving",
    name: "Giving and generosity",
    named: "Romans 12:8",
    description: "Giving money and possessions to meet real needs, gladly and often beyond what's comfortable.",
    scripture: {
      ref: "2 Corinthians 8:2",
      text: "In the terrible ordeal they suffered, their abundant joy and deep poverty overflowed into rich generosity.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest generosity is a settled habit with you. You've given to meet needs you saw, sometimes past what was comfortable, and people have told you a gift came at just the right time. Romans 12:8 names giving as a gift and asks that it be done generously, and 2 Corinthians 8:2 describes churches in Macedonia whose “deep poverty overflowed into rich generosity,” so this gift has nothing to do with the size of your income. The risks at this level are quiet ones: giving in order to be thanked, or giving money in place of time and presence. Keep your hand open, and keep some of your giving secret.",
        steps: [
          "Give one gift this year that no one will ever know came from you, as Jesus describes in Matthew 6:3-4.",
          "Ask your pastor where a need is going unmet in your church, and help meet it without attaching your name.",
          "Pair one gift of money with a gift of time: deliver it yourself, or spend an afternoon with the person you're helping.",
        ],
        next: [
          { kind: "Study guide", title: "Generosity: A Bible Study on Giving", href: "/studyguides/generosity" },
          { kind: "How-to", title: "How to Care for the Poor Without Condescension", href: "/how-tos/world-how-to-care-for-the-poor-without-condescension" },
          { kind: "Wisdom", title: "Justice and the Poor", href: "/wisdom/justice-and-the-poor" },
        ],
      },
      some: {
        interpretation:
          "You give, and some of your answers show real generosity, but it isn't steady yet. You may give when a need moves you, or give regularly but rarely beyond what's comfortable. That's common, and it isn't stinginess. Generosity tends to grow with practice: each gift loosens money's grip a little, and the next one comes more easily. Whether giving is your particular gift will show over time, in whether it brings you a kind of joy and whether your gifts reach needs others missed. Meanwhile, every Christian is asked to give, and 2 Corinthians 9:7 asks only that we give what we've decided in our hearts, without regret.",
        steps: [
          "Decide on an amount to give each month, set it aside before other spending, and keep it up for three months.",
          "Once this season, give toward a specific need you see, even a small one, and notice what it does in you.",
        ],
        next: [
          { kind: "How-to", title: "How to Start Giving Generously", href: "/how-tos/wm-how-to-start-giving-generously" },
          { kind: "Life", title: "Why Should Christians Give Their Money Away?", href: "/life/generosity-and-the-open-hand" },
          { kind: "Wisdom", title: "Generosity and Giving", href: "/wisdom/generosity-and-giving" },
        ],
      },
      few: {
        interpretation:
          "Giving hasn't been much a part of your life so far, and this self-check can't see why. Sometimes money is tight and there truly isn't much to spare. Sometimes the habit never formed because no one showed you how, or because what you have feels like yours since you earned it. None of that means you can't give. Paul says a gift is acceptable according to what a person has, not what they don't have (2 Corinthians 8:12), and the generosity he praised came out of deep poverty. If money is a weight on you right now, start with something small, and keep what your household needs.",
        steps: [
          "Choose one small gift you can give without touching what your household needs, and give it this month.",
          "Give something other than money this week, like a meal, a ride, or an afternoon, and notice that it counts.",
        ],
        next: [
          { kind: "How-to", title: "How to Start Giving Generously", href: "/how-tos/wm-how-to-start-giving-generously" },
          { kind: "Life", title: "Why Did Jesus Treat Money as a Rival God?", href: "/life/money-and-the-heart" },
          { kind: "Find help", title: "Money is a weight on me", href: "/help/money" },
        ],
      },
    },
  },
  {
    id: "leading",
    name: "Leading and organizing",
    named: "Romans 12:8; 1 Corinthians 12:28",
    description: "Seeing what a group needs to do next, and arranging people and plans so the work gets done.",
    scripture: {
      ref: "Exodus 18:18",
      text: "Surely you and these people with you will wear yourselves out, because the task is too heavy for you. You cannot handle it alone.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest people look to you when something needs to happen. You've organized people to get things done, groups turn to you when they're stuck, and you've handed work to others and helped them do it well. Romans 12:8 asks those who lead to “lead with diligence,” and 1 Corinthians 12:28 names administration among the gifts, a word built on the Greek for steering a ship. The danger here is old. Moses tried to settle every dispute himself until his father-in-law warned that he would wear himself out (Exodus 18:18). Leading well means giving work away, and it means staying accountable to others, even when you're usually the one in charge.",
        steps: [
          "List what you're responsible for, and choose one piece to hand to someone else this season, with your help but not your control.",
          "Ask the people you lead what you do that makes their work harder, and listen without defending yourself.",
          "Make sure someone has the standing to tell you no, and that you'd actually listen.",
        ],
        next: [
          { kind: "Study guide", title: "Character Before Competence: A Church Leadership Study", href: "/studyguides/character-before-competence" },
          { kind: "Wisdom", title: "The Need for Control", href: "/wisdom/need-for-control" },
          { kind: "How-to", title: "How to Multiply a Table by Sending People to Start Their Own", href: "/how-tos/dm-how-to-multiply-a-table-by-sending-people" },
        ],
      },
      some: {
        interpretation:
          "You've organized people or plans some of the time, and others have sometimes looked to you, but it isn't yet something people count on. You may take charge when no one else will, or lead well in one setting, such as work, without doing it at church. That's common, and it doesn't settle anything either way. Leading in a church is learned mostly by serving under someone who leads well and watching how they handle people, plans, and setbacks. The question isn't only whether you can run things. It's whether the work gets done and people grow when you do.",
        steps: [
          "Offer to organize one specific thing this season, like a meal schedule, a workday, or an event, and ask someone experienced to look over your plan.",
          "Afterward, ask the people who helped what went well and what didn't, and write it down.",
        ],
        next: [
          { kind: "How-to", title: "How to Start a Discipleship Table This Week", href: "/how-tos/dm-how-to-start-a-discipleship-table" },
          { kind: "Wisdom", title: "Time and Priorities", href: "/wisdom/time-and-priorities" },
          { kind: "Wisdom", title: "Finishing What You Start", href: "/wisdom/finishing-what-you-start" },
        ],
      },
      few: {
        interpretation:
          "Leading and organizing haven't been much a part of your life so far, at least not in the ways these statements ask about. That's no mark against you. Many of the most faithful people in any church never run anything, and Paul's picture of the body in 1 Corinthians 12 leaves no room for the idea that the ones in charge matter more. You may also have led more than you think, in a household, a workplace, or a friendship, without calling it that. If leading isn't your gift, following well is a real contribution: keeping your word and making a leader's work lighter.",
        steps: [
          "The next time someone at church organizes something, ask how you can help, then do exactly what you said you'd do.",
          "Notice where you already organize things, at home or at work, and ask whether that skill could serve your church.",
        ],
        next: [
          { kind: "Wisdom", title: "Being Reliable", href: "/wisdom/reliability" },
          { kind: "Life", title: "What Does the Bible Say About Work and Calling?", href: "/life/work-as-worship" },
        ],
      },
    },
  },
  {
    id: "hospitality",
    name: "Hospitality",
    named: "Romans 12:13; 1 Peter 4:9",
    description: "Making room for people, especially strangers and those on the edges, at your table, in your home, or in a room where everyone else already knows each other.",
    scripture: {
      ref: "1 Peter 4:9",
      text: "Show hospitality to one another without complaining.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest you make room for people. You notice who's on the edge of a room, you've shared meals with people you barely knew, and newcomers have told you they felt welcome because of you. Churches need this badly, because people often sense whether they belong long before anyone explains what the church believes. Peter asks for hospitality without complaining, which admits that it costs something: time, money, a tidy house, an evening you'd planned to rest. The growth at this level is twofold. Keep your welcome pointed at people who can't return it (Luke 14:13-14), and let others host with you, so it doesn't all fall to you.",
        steps: [
          "This season, invite someone to your table who can't return the invitation.",
          "Ask one or two people to host with you, so the work and the welcome are shared.",
          "Learn the names of three newcomers at church this month, and use them the next time you see them.",
        ],
        next: [
          { kind: "Study guide", title: "Hospitality: A Bible Study on the Open Door", href: "/studyguides/hospitality" },
          { kind: "How-to", title: "How to Show Hospitality to Outsiders", href: "/how-tos/wn-how-to-show-hospitality-to-outsiders" },
          { kind: "Wisdom", title: "Hospitality When You Are Tired", href: "/wisdom/hospitality-when-tired" },
        ],
      },
      some: {
        interpretation:
          "You welcome people some of the time. You may invite friends over but rarely strangers, or notice the person standing alone without always crossing the room. That's ordinary, and it doesn't make you unwelcoming. Hospitality in Scripture isn't the same as entertaining, and it doesn't need a large home or a good cook. It needs a door, a table, or a few minutes after the service, offered to someone who might otherwise be alone. Romans 12:13 tells every believer to practice it, so start there. Whether it's your particular gift will become clearer as you practice it with people you don't already know.",
        steps: [
          "Once this month, invite someone you don't know well for a simple meal. Soup and bread is enough.",
          "After the next church gathering, spend the first five minutes with someone you don't know before you find your friends.",
        ],
        next: [
          { kind: "Wisdom", title: "Welcoming Newcomers", href: "/wisdom/welcoming-newcomers" },
          { kind: "How-to", title: "How to Welcome a Stranger", href: "/how-tos/wn-how-to-welcome-a-stranger" },
          { kind: "Wisdom", title: "Opening Your Home", href: "/wisdom/hospitality" },
        ],
      },
      few: {
        interpretation:
          "Hospitality hasn't been much a part of your life lately. There can be good reasons: a small or shared home, a hard season, shyness that makes strangers exhausting, or a church where you're still new yourself. None of those make you unwelcoming, and none of them mean you have nothing to give. Hospitality can be as small as learning one name or saving someone a seat. If you're new somewhere, you may be the one who needs welcoming right now, and receiving it well is part of how a church learns to give it. Start with one name and one conversation.",
        steps: [
          "At your next gathering, introduce yourself to one person you haven't met, and remember their name.",
          "Invite one person for coffee this month. It doesn't have to be at your home.",
        ],
        next: [
          { kind: "Wisdom", title: "Welcoming Newcomers", href: "/wisdom/welcoming-newcomers" },
          { kind: "Life", title: "Who Is My Neighbor? What Jesus Actually Meant", href: "/life/the-neighbor-and-the-stranger" },
          { kind: "Find help", title: "I feel so alone", href: "/help/loneliness" },
        ],
      },
    },
  },
  {
    id: "sharing",
    name: "Sharing the faith",
    named: "Ephesians 4:11",
    description: "Telling people who don't believe about Jesus, in words they can follow, with gentleness and respect.",
    scripture: {
      ref: "Colossians 4:5-6",
      text: "Act wisely toward outsiders, redeeming the time. Let your speech always be gracious, seasoned with salt, so that you may know how to answer everyone.",
    },
    levels: {
      clear: {
        interpretation:
          "Your answers suggest faith comes up naturally between you and people who don't share it. You've told your story, people who don't believe ask you questions, and you've opened the Bible with someone still exploring. Ephesians 4:11-12 says Christ gave some to be evangelists, “to equip the saints for works of ministry,” so the gift is given to some while the call to bear witness belongs to every believer. The temptation at this level is to count conversations as wins, or to talk more than you listen. Skeptics can tell when they're someone's project. Keep listening, admit it when you don't know, and bring others along so they learn what you've learned.",
        steps: [
          "Invite a believer who is nervous about sharing their faith to join you the next time you read the Bible with a friend who is exploring.",
          "Ask the person you're talking with what they actually believe, and hear the whole answer before you respond.",
          "When you don't know an answer, say so, and offer to look into it together.",
        ],
        next: [
          { kind: "How-to", title: "How to Welcome a Skeptic to Your Table", href: "/how-tos/dm-how-to-welcome-a-skeptic-to-your-table" },
          { kind: "How-to", title: "How to Answer Hard Questions About the Faith", href: "/how-tos/wn-how-to-answer-hard-questions-about-the-faith" },
          { kind: "Study guide", title: "Questions Skeptics Ask: A Study for Doubters", href: "/studyguides/skeptic" },
        ],
      },
      some: {
        interpretation:
          "Faith comes up between you and people who don't believe now and then, but not often. You may have told your story once or twice, or been asked a question and wished you'd answered better. That's where many Christians are. Plenty of us were taught that sharing faith means a speech or a script, it felt false, and so we stopped. Colossians 4:5-6 describes something quieter: wise conduct toward outsiders, gracious speech, and being ready to answer when someone asks. Whether evangelism is your particular gift will show in time. Being ready to give a reason for your hope is for everyone (1 Peter 3:15).",
        steps: [
          "Write down, in a few sentences, how you came to faith, then tell it once to a believing friend for practice.",
          "Pray by name each week for two people you know who don't believe, and watch for one natural conversation this season.",
        ],
        next: [
          { kind: "How-to", title: "How to Tell Your Story", href: "/how-tos/wn-how-to-tell-your-story" },
          { kind: "Life", title: "How Do You Share Your Faith Without Being Pushy?", href: "/life/witness-without-weirdness" },
          { kind: "Study guide", title: "Evangelism: A Bible Study on Sharing Your Faith", href: "/studyguides/witness" },
        ],
      },
      few: {
        interpretation:
          "Sharing your faith hasn't been much a part of your life so far. Maybe you don't know many people who don't believe, maybe it feels intrusive, or maybe you've seen it done badly and want no part of that. Those are honest reasons, and the last one is often right. This result doesn't mean you have nothing to say. If evangelism isn't your particular gift, you're still a witness in how you work, love, and speak, and someone may ask about the hope in you when you least expect it. The place to start is praying for the people near you who don't believe.",
        steps: [
          "Write down the names of three people you know who don't believe, and pray for them by name each week.",
          "Read the Gospel of Mark this month and notice how Jesus talked with people who didn't yet follow him.",
        ],
        next: [
          { kind: "How-to", title: "How to Pray for People Who Do Not Believe", href: "/how-tos/wn-how-to-pray-for-people-who-do-not-believe" },
          { kind: "How-to", title: "How to Share Your Faith Without Being Weird", href: "/how-tos/wn-how-to-share-your-faith-without-being-weird" },
          { kind: "How-to", title: "How to Live a Quiet Witness at Work", href: "/how-tos/wn-how-to-live-a-quiet-witness-at-work" },
        ],
      },
    },
  },
];

/* ── The overall bands ─────────────────────────────────────────── */

export const BANDS: Record<BandId, OverallBand> = {
  several: {
    label: "Clear signs in several areas",
    paragraphs: [
      "Your answers show clear signs in several of these areas. You've been doing these things, not only wishing to, and other people have told you it helped. That usually means you've served for a long time, in more than one place, among people who have watched you do it.",
      "It doesn't mean you have more gifts than someone with one clear area, or that you matter more to God or to the church. A self-check can't name what the Spirit has given you, and it can't name a calling. Thirty-two statements can describe what you've done; only time and the people who watch you serve can confirm what it means. The areas where your answers were lower may simply be untried. Paul's point in 1 Corinthians 12:21-26 is that the body can't do without any of its parts, and that God gives greater honor to the parts that seem to lack it, so nothing on this page ranks one gift above another.",
      "A result like this carries its own danger. People who do many things well often do too much, wear out quietly, and leave others no room to serve. So start here: ask two or three people who have watched you serve for a season where they see you help the most, and listen for where their answers agree. Then think about giving one thing away, so someone else can find their gift where you've been standing.",
    ],
    next: {
      lead: "For someone already serving in many places, the most useful page may be the one about serving where your gifts and the church's needs overlap, rather than everywhere, and saying no without guilt.",
      cta: "Serving in the Church",
      href: "/wisdom/serving-in-the-church",
    },
    later: {
      lead: "For the longer view of what Scripture says about gifts, and how they come into view in the life of a church:",
      title: "What the Bible Says About Spiritual Gifts",
      href: "/writing/what-the-bible-says-about-spiritual-gifts",
    },
  },
  "one-or-two": {
    label: "Clear signs in one or two areas",
    paragraphs: [
      "Your answers show clear signs in one or two areas and fewer in the rest. That's an ordinary way for a life of service to look. Paul asks whether all are teachers and all work miracles, and expects the answer no (1 Corinthians 12:29-30). An eye is not a hand, and the body is better for it.",
      "It doesn't mean those areas are your gifts, settled and certain, and it doesn't mean you lack the others. A self-check can't name a calling or tell you what the Spirit has given you. What it can do is show you where to look. Gifts are usually confirmed slowly, by the church that watches you serve: people keep coming back for the same help, the work bears fruit, and you find you can keep at it. Your quieter areas may simply be untried.",
      "What to do first: serve in one of your clearer areas for a season, six months or so, somewhere other people can see the work. Then ask two or three of them what they've seen and what they'd tell you to keep doing. If their answers match yours, that's worth more than any score here. And none of these areas ranks above another (1 Corinthians 12:21-26), so choose by where you can serve, not by which gift sounds most impressive.",
    ],
    next: {
      lead: "This essay walks through what Scripture says about gifts, gives both sides of the debate over the miraculous gifts a fair hearing, and ends where this page does: a gift comes into view as you use it among other people.",
      cta: "What the Bible Says About Spiritual Gifts",
      href: "/writing/what-the-bible-says-about-spiritual-gifts",
    },
    later: {
      lead: "For a small group that wants to study the gifts together, the fourth session of this study takes up the gifts and the question Christians disagree about:",
      title: "The Holy Spirit: A Bible Study on the Forgotten God",
      href: "/studyguides/holy-spirit",
    },
  },
  some: {
    label: "Some signs, nothing clear yet",
    paragraphs: [
      "Your answers show some signs in several areas but no clear pattern yet. You've taught a little, helped a little, welcomed a few people, and none of it stands out from the rest. That's an honest place to be, and an ordinary one.",
      "It doesn't mean you lack gifts. Paul writes that “to each one the manifestation of the Spirit is given for the common good” (1 Corinthians 12:7). A result like this usually means you haven't yet served long enough in one place for a pattern to form, or that you've helped wherever you were asked without staying anywhere. Middle and low answers here often mean untried, not ungifted. And a self-check can't name a calling in any case. At most it shows you where to start looking, because gifts are confirmed over time by the church that sees you use them.",
      "What to do first: choose one area where your answers were a little higher, and serve there for a season, long enough for the newness to wear off. Notice whether the work bears fruit and whether you can keep at it. Then ask the people who watched you what they saw. No area here ranks above another (1 Corinthians 12:21-26), so choose by where you can serve now, not by which gift sounds most important.",
    ],
    next: {
      lead: "Service in Scripture is the ordinary life of a church member, not extra work for the eager few. This page is about finding where your gifts and your church's needs overlap.",
      cta: "Serving in the Church",
      href: "/wisdom/serving-in-the-church",
    },
    later: {
      lead: "For the longer view of what Scripture says about gifts, and why they come into view as you use them:",
      title: "What the Bible Says About Spiritual Gifts",
      href: "/writing/what-the-bible-says-about-spiritual-gifts",
    },
  },
  untried: {
    label: "Mostly untried so far",
    paragraphs: [
      "Most of these statements didn't describe you, at least not yet. That usually says more about your circumstances than about your gifts. You may be new to faith, new to a church, or without a church right now. You may be in a season of small children, illness, long hours, or caring for someone, with little left over. Or you may have stepped back after being hurt by people who should have known better.",
      "This result doesn't mean you're ungifted, or that you matter less to the church. Paul writes that “to each one the manifestation of the Spirit is given for the common good” (1 Corinthians 12:7), and each one includes you. He imagines a foot deciding it doesn't belong because it isn't a hand, and answers that this doesn't make it any less a part of the body (1 Corinthians 12:15). Low scores here often mean untried, not ungifted. A self-check can't name a calling or find a gift for you. Gifts come into view in the life of a church, as people watch you serve and tell you what they see.",
      "What to do first: find one small place to serve, and stay with it for a season. If you belong to a church, ask someone who leads there where help is needed this month. If you don't, finding one comes first, because gifts are given for a body and come into view among its people. After a few months, ask the people around you what they've seen.",
    ],
    next: {
      lead: "Gifts come into view in the life of a church. If you don't belong to one right now, start with this page on finding a church you can commit to, imperfect as every church is.",
      cta: "Finding a Church",
      href: "/wisdom/finding-a-church",
    },
    later: {
      lead: "If you stepped back because a church hurt you, start here instead, and take the time you need:",
      title: "The church hurt me",
      href: "/help/church-hurt",
    },
  },
};

/* ── Scoring ───────────────────────────────────────────────────── */

const ITEMS_PER_AREA = ITEMS.length / AREAS.length; // 4
export const AREA_MAX = ITEMS_PER_AREA * 5; // 20

/** Points for one answer: the answer itself, or 6 minus it when the statement is worded the other way. */
export function itemPoints(item: Item, answer: number): number {
  return item.reverse ? 6 - answer : answer;
}

/** An area's score: its four statements' points summed (4 to 20). */
export function areaScore(area: AreaId, answers: Answers): number {
  return ITEMS.filter((i) => i.area === area).reduce(
    (sum, i) => sum + (answers[i.id] === undefined ? 0 : itemPoints(i, answers[i.id])),
    0,
  );
}

/** 16 to 20 (mostly true or more, on average) is clear; 10 to 15 is some; 4 to 9 is few. */
export function levelFor(score: number): Level {
  if (score >= 16) return "clear";
  if (score >= 10) return "some";
  return "few";
}

/**
 * The overall reading counts clear areas rather than adding up a total, so a
 * reader with one or two clear areas is read as that, not as a low score.
 */
export function bandFor(levels: Level[]): BandId {
  const clear = levels.filter((l) => l === "clear").length;
  const some = levels.filter((l) => l === "some").length;
  if (clear >= 3) return "several";
  if (clear >= 1) return "one-or-two";
  if (some >= 3) return "some";
  return "untried";
}

/** Areas where the reader called both a statement and its opposite true: worth a second look. */
export function mixedAreas(answers: Answers): AreaId[] {
  return AREAS.filter((a) => {
    const items = ITEMS.filter((i) => i.area === a.id);
    const rev = items.find((i) => i.reverse);
    const fwd = items.filter((i) => !i.reverse);
    if (!rev || answers[rev.id] === undefined) return false;
    const fwdMean = fwd.reduce((s, i) => s + (answers[i.id] ?? 0), 0) / fwd.length;
    return answers[rev.id] >= 4 && fwdMean >= 4;
  }).map((a) => a.id);
}

/* ── Saved progress: survive a refresh mid-check ───────────────── */

export const STORAGE_KEY = "livewell-progress-spiritual-gifts";

interface StoredProgress {
  answers: Answers;
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
    Object.values(p.answers).every((v) => typeof v === "number" && v >= 1 && v <= 5)
  );
}

const PER_PART = AREAS.length; // eight statements a part, one from each area
const PARTS = ITEMS.length / PER_PART; // four parts

/* ── Small pieces ──────────────────────────────────────────────── */

/** Words a reader might say or think are marked *like this* in the copy above; set them in italics. */
function withItalics(text: string) {
  return text
    .split(/\*([^*]+)\*/g)
    .map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

const eyebrow = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  color: "var(--mustard-text)",
  fontFamily: "var(--U)",
  margin: "0 0 12px",
} as const;
const card = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "clamp(22px, 4vw, 36px)",
  marginBottom: "var(--s-3)",
} as const;
const body = {
  fontFamily: "var(--B)",
  fontSize: "16px",
  lineHeight: 1.75,
  color: "var(--ink)",
  maxWidth: "68ch",
  margin: "0 0 16px",
} as const;
const quiet = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  minHeight: "44px",
  padding: "10px 20px",
  borderRadius: "var(--radius-sm)",
  cursor: "pointer",
  background: "none",
  color: "var(--ink)",
  border: "1px solid var(--border)",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 600,
} as const;
const saveFailedLine = {
  fontSize: "13px",
  fontFamily: "var(--U)",
  color: "var(--ink-muted)",
  margin: "0 0 24px",
} as const;

/** A passage set apart, with the reference linked to its context and the translation named. */
function Passage({ refText, text }: { refText: string; text: string }) {
  return (
    <div
      style={{
        borderLeft: "3px solid var(--mustard)",
        padding: "14px 18px",
        background: "var(--bone)",
        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
        margin: "0 0 20px",
      }}
    >
      <p style={{ fontFamily: "var(--F)", fontSize: "18px", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 8px" }}>
        {text}
      </p>
      <Link
        href={`/theology/passage?ref=${encodeURIComponent(refText)}`}
        style={{
          fontFamily: "var(--U)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "var(--mustard-text)",
          textDecoration: "none",
          borderBottom: "1px solid var(--mustard)",
        }}
      >
        Read {refText} in context
      </Link>
      <div style={{ marginTop: "10px" }}>
        <ScriptureNote rendering="bsb" />
      </div>
    </div>
  );
}

/*
 * The miraculous gifts, stated fairly and left unmeasured.
 *
 * The landing on whether these gifts continue is James's to make (CLAUDE.md,
 * "Handling a contested doctrine," step 3; GROW-PROMPT Section 8: "say where
 * James lands only in his own words"). This note states each view in its
 * strongest form, names the question as one faithful churches divide over,
 * and does not land. Do not add a landing here in anyone else's words. The
 * site's doctrine page on this question (/theology/doctrine/holy-spirit)
 * carries a tentative landing, so this note does not link to it; the study
 * guide it links to sets out both cases without choosing.
 */
function ScopeNote({ id, heading }: { id: string; heading: string }) {
  return (
    <section aria-labelledby={id} style={{ ...card, borderLeft: "3px solid var(--mustard)" }}>
      <h2
        id={id}
        style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 27px)", fontWeight: 500, lineHeight: 1.25, color: "var(--ink)", margin: "0 0 12px" }}
      >
        {heading}
      </h2>
      <p style={body}>
        Faithful Christians disagree about whether the more miraculous gifts named in 1 Corinthians 12 and 14
        continue today: prophecy, speaking in tongues and interpreting them, gifts of healing, and miracles. It's a
        disagreement within the faith, not about it. Churches that confess the same creeds land on both sides.
      </p>
      <p style={body}>
        <strong>Continuationists</strong> read 1 Corinthians 13:8-12 as pointing to Christ's return. Prophecy and
        tongues pass away “when the perfect comes,” and since the day we “see face to face” hasn't come and no
        passage sets an earlier end, they hold that the Spirit still gives these gifts, to be used in the order Paul
        sets out in 1 Corinthians 14.
      </p>
      <p style={body}>
        <strong>Cessationists</strong> hold that these gifts served the apostolic founding of the church, which is
        “built on the foundation of the apostles and prophets” (Ephesians 2:20), and that God used them to confirm
        the message of those who first heard the Lord (Hebrews 2:3-4). With that foundation laid, they hold, these
        gifts ceased, while the Spirit goes on giving new birth, making believers holy, and supplying every other
        gift the church needs.
      </p>
      <p style={body}>
        This self-check doesn't take a side, and for that reason it doesn't measure those gifts at all. If the
        question matters to you, take it to a pastor in your own church, who can tell you how your church reads these
        passages and why, and talk it through with you in person. For a small group, the fourth session of{" "}
        <Link href="/studyguides/holy-spirit" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>
          The Holy Spirit: A Bible Study on the Forgotten God
        </Link>{" "}
        sets out both cases without choosing between them.
      </p>
      <ScriptureNote rendering="bsb" />
    </section>
  );
}

interface AreaResultData {
  area: Area;
  score: number;
  level: Level;
  guide: LevelGuide;
}

function AreaResult({ r }: { r: AreaResultData }) {
  const headingId = `area-${r.area.id}`;
  return (
    <section aria-labelledby={headingId} style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
        <h3 id={headingId} style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.01em", margin: 0 }}>
          {r.area.name}
        </h3>
        <span
          style={{
            fontFamily: "var(--U)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: r.level === "clear" ? "var(--mustard-text)" : "var(--ink-muted)",
            background: "var(--bone-warm)",
            padding: "4px 12px",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {LEVEL_LABELS[r.level]} · {r.score}/{AREA_MAX}
        </span>
      </div>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "68ch", margin: "0 0 4px" }}>
        {r.area.description}
      </p>
      <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 20px" }}>
        Where Scripture names it: {r.area.named}
      </p>

      {/* What this level means in this area */}
      <p style={body}>{withItalics(r.guide.interpretation)}</p>

      <Passage refText={r.area.scripture.ref} text={r.area.scripture.text} />

      {/* Practical steps for this area at this level */}
      <h4 style={{ ...eyebrow, color: "var(--ink-muted)", letterSpacing: "0.12em", fontSize: "12px" }}>PRACTICAL STEPS</h4>
      <ol style={{ margin: "0 0 20px", paddingLeft: "1.3em", maxWidth: "68ch" }}>
        {r.guide.steps.map((step) => (
          <li key={step} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "10px" }}>
            {withItalics(step)}
          </li>
        ))}
      </ol>

      {/* Live pages for this area at this level */}
      <h4 style={{ ...eyebrow, color: "var(--ink-muted)", letterSpacing: "0.12em", fontSize: "12px" }}>WHERE TO GO NEXT</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {r.guide.next.map((n) => (
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
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
            }}
          >
            <span>
              <span style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "4px" }}>
                {n.kind.toUpperCase()}
              </span>
              <span style={{ fontSize: "16px", fontFamily: "var(--F)", fontStyle: "italic", color: "var(--ink)" }}>{n.title}</span>
            </span>
            <ChevronRight size={16} aria-hidden="true" style={{ opacity: 0.4, flexShrink: 0 }} />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── The page ──────────────────────────────────────────────────── */

export default function SpiritualGifts() {
  const [saved] = useState(() => readStoredJSON<StoredProgress | null>(STORAGE_KEY, isStoredProgress, null));
  const [step, setStep] = useState(() => (saved ? Math.min(Math.max(Math.trunc(saved.step), 0), PARTS - 1) : 0));
  const [answers, setAnswers] = useState<Answers>(saved?.answers ?? {});
  const [showResults, setShowResults] = useState(false);
  const [resumed, setResumed] = useState(
    () => saved !== null && (Object.keys(saved.answers).length > 0 || saved.step > 0),
  );
  const [persistFailed, setPersistFailed] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const persist = (nextAnswers: Answers, nextStep: number) => {
    setPersistFailed(
      !writeStoredJSON(STORAGE_KEY, {
        answers: nextAnswers,
        step: nextStep,
        savedAt: new Date().toISOString(),
      }),
    );
  };

  const partItems = ITEMS.slice(step * PER_PART, (step + 1) * PER_PART);
  const answeredCount = ITEMS.filter((i) => answers[i.id] !== undefined).length;
  const partDone = partItems.every((i) => answers[i.id] !== undefined);
  const partAnswered = partItems.filter((i) => answers[i.id] !== undefined).length;
  const isLast = step === PARTS - 1;

  const goTo = (nextStep: number) => {
    setStep(nextStep);
    persist(answers, nextStep);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleRate = (id: string, value: number) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setResumed(false);
    persist(next, step);
  };

  const handleNext = () => {
    if (!partDone) return;
    if (!isLast) {
      goTo(step + 1);
      return;
    }
    const firstOpen = ITEMS.findIndex((i) => answers[i.id] === undefined);
    if (firstOpen >= 0) {
      goTo(Math.floor(firstOpen / PER_PART));
      return;
    }
    setShowResults(true);
    persist(answers, step);
    setTimeout(() => {
      resultsRef.current?.focus({ preventScroll: true });
      resultsRef.current?.scrollIntoView({ behavior: scrollBehavior() });
    }, 100);
  };

  const handleRestart = () => {
    removeStoredJSON(STORAGE_KEY);
    setAnswers({});
    setStep(0);
    setShowResults(false);
    setResumed(false);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleChangeAnswers = () => {
    setShowResults(false);
    setStep(0);
    setResumed(false);
    persist(answers, 0);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const results: AreaResultData[] = AREAS.map((area) => {
    const score = areaScore(area.id, answers);
    const level = levelFor(score);
    return { area, score, level, guide: area.levels[level] };
  });
  const band = BANDS[bandFor(results.map((r) => r.level))];
  const clearAreas = results.filter((r) => r.level === "clear");
  const someAreas = results.filter((r) => r.level === "some");
  const shown = clearAreas.length ? { lead: "Clear signs in your answers:", list: clearAreas } : { lead: "Some signs in your answers:", list: someAreas };
  const mixedIds = mixedAreas(answers);
  const mixed = results.filter((r) => mixedIds.includes(r.area.id)).map((r) => r.area.name);
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const bandQuotesScripture = band.paragraphs.some((p) => p.includes("“"));

  return (
    <Layout>
      <SEOMeta
        title="Spiritual Gifts Self-Check: Eight Gifts Scripture Names"
        description="An original self-check on eight gifts Scripture names, from teaching and mercy to hospitality and sharing the faith. Not a test. Answers stay on your device."
        keywords="spiritual gifts self-check, spiritual gifts test, spiritual gifts inventory, gifts of the Spirit, Romans 12, 1 Corinthians 12, Ephesians 4, 1 Peter 4, serving in the church"
        url="https://www.livewellbyjamesbell.co/tools/spiritual-gifts"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Spiritual Gifts Self-Check",
          description:
            "A 32-statement self-check on eight gifts Scripture names, built from Romans 12, 1 Corinthians 12, Ephesians 4, and 1 Peter 4. Not a test or a diagnosis.",
          url: "https://www.livewellbyjamesbell.co/tools/spiritual-gifts",
          applicationCategory: "LifestyleApplication",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            FREE TOOL
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Spiritual Gifts <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Self-Check</em>
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.7, opacity: 0.85, fontFamily: "var(--B)", maxWidth: "580px", margin: "0 auto" }}>
            Thirty-two statements about what you've actually done in eight areas the New Testament names among the
            Spirit's gifts, from teaching and mercy to hospitality and sharing the faith. It takes about ten minutes.
            Answer for what has really happened, not for what you hope is true.
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.7, fontFamily: "var(--B)", maxWidth: "580px", margin: "12px auto 0" }}>
            This is a self-check for reflection, not a test or a diagnosis, and your answers stay on this device.
          </p>
        </div>
      </section>

      {!showResults ? (
        <section style={{ padding: "48px 32px 80px", background: "var(--bone)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            {resumed && (
              <div className="no-print" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
                <span style={{ fontSize: "13px", fontFamily: "var(--U)", color: "var(--ink-muted)" }}>Picked up where you left off.</span>
                <button type="button" onClick={handleRestart} style={{ ...quiet, minHeight: "36px", padding: "6px 14px", fontSize: "13px", color: "var(--ink-muted)" }}>
                  Start fresh
                </button>
              </div>
            )}
            {persistFailed && (
              <p role="status" style={saveFailedLine}>
                Couldn't save to this browser — your work here will not survive a reload.
              </p>
            )}

            {step === 0 && (
              <>
                <section aria-labelledby="gifts-for" style={card}>
                  <h2 id="gifts-for" style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 27px)", fontWeight: 500, lineHeight: 1.25, color: "var(--ink)", margin: "0 0 12px" }}>
                    What the gifts are for
                  </h2>
                  <Passage
                    refText="1 Peter 4:10"
                    text="As good stewards of the manifold grace of God, each of you should use whatever gift he has received to serve one another."
                  />
                  <p style={body}>
                    Every passage that lists the Spirit's gifts gives them the same purpose, and it isn't helping you
                    find yourself. It's building up the church and serving one another (Romans 12:4-8; 1 Corinthians
                    12:7; Ephesians 4:12; 1 Peter 4:10-11). So this self-check doesn't ask what kind of person you are
                    or what you'd enjoy. It asks what you've
                    actually done and how other people received it, because that's usually where a gift is seen first,
                    and the church that sees it is often the first to say so.
                  </p>
                  <p style={{ ...body, marginBottom: 0 }}>
                    The eight areas come from the gifts those passages name that can be seen in ordinary service. A few
                    others on those lists, like the message of wisdom and distinguishing between spirits, aren't
                    measured here, because statements about what you've done can't capture them. Some statements may
                    describe things you haven't had the chance to do. Answer for what's true so far; that's an honest
                    answer, not a poor one.
                  </p>
                </section>
                <ScopeNote id="scope-before" heading="What this self-check leaves out, and why" />
              </>
            )}

            {/* Progress */}
            <div className="no-print" style={{ margin: "8px 0 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                <span style={{ ...eyebrow, margin: 0 }}>
                  PART {step + 1} OF {PARTS}
                </span>
                <span style={{ fontSize: "13px", fontFamily: "var(--U)", color: "var(--ink-muted)" }}>
                  {answeredCount} of {ITEMS.length} answered
                </span>
              </div>
              <div style={{ height: "4px", background: "var(--bone-muted)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(answeredCount / ITEMS.length) * 100}%`, background: "var(--mustard)", transition: "width 0.4s var(--ease)" }} />
              </div>
            </div>

            {/* Statements */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              {partItems.map((item) => {
                const n = ITEMS.indexOf(item) + 1;
                return (
                  <fieldset key={item.id} style={{ ...card, minWidth: 0, margin: "0 0 16px", padding: "24px clamp(18px, 4vw, 32px)" }}>
                    <legend style={{ float: "left", width: "100%", padding: 0, margin: "0 0 14px", fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.6, color: "var(--ink)" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "20px", color: "var(--mustard-text)" }}>{n}.</span>{" "}
                      {item.text}
                    </legend>
                    <div style={{ clear: "both", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {SCALE.map((s) => {
                        const on = answers[item.id] === s.value;
                        return (
                          <label
                            key={s.value}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              minHeight: "44px",
                              padding: "8px 14px",
                              border: `1px solid ${on ? "var(--mustard)" : "var(--border)"}`,
                              borderRadius: "var(--radius-pill)",
                              background: on ? "var(--mustard)" : "var(--bone)",
                              color: "var(--ink)",
                              fontFamily: "var(--U)",
                              fontSize: "14px",
                              fontWeight: on ? 600 : 500,
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="radio"
                              name={item.id}
                              value={s.value}
                              checked={on}
                              onChange={() => handleRate(item.id, s.value)}
                              style={{ accentColor: "var(--ink)" }}
                            />
                            {s.label}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  disabled={step === 0}
                  style={{ ...quiet, border: "none", paddingLeft: 0, color: step === 0 ? "var(--bone-muted)" : "var(--ink-muted)", cursor: step === 0 ? "default" : "pointer" }}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Previous part
                </button>
                <button
                  type="submit"
                  disabled={!partDone}
                  style={{
                    ...quiet,
                    border: "none",
                    padding: "12px 28px",
                    background: partDone ? "var(--mustard)" : "var(--bone-muted)",
                    color: partDone ? "var(--ink)" : "var(--ink-muted)",
                    cursor: partDone ? "pointer" : "not-allowed",
                  }}
                >
                  {!partDone
                    ? `Answer all eight to go on (${partAnswered} of ${PER_PART})`
                    : isLast
                      ? "See my results"
                      : "Next part"}
                  {partDone && <ArrowRight size={16} aria-hidden="true" />}
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <section
          ref={resultsRef}
          tabIndex={-1}
          role="region"
          aria-label="Your spiritual gifts results"
          style={{ padding: "48px 32px 40px", background: "var(--bone)", outline: "none" }}
        >
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <ToolActions toolName="Spiritual Gifts Self-Check" onStartOver={handleRestart} />
            <SelfCheckHistory
              id="spiritual-gifts"
              total={totalScore / (ITEMS.length * 5)}
              areas={Object.fromEntries(results.map((r) => [r.area.name, r.score / AREA_MAX]))}
              answersKey={JSON.stringify(answers)}
            />
            {persistFailed && (
              <p role="status" style={saveFailedLine}>
                Couldn't save to this browser — your work here will not survive a reload.
              </p>
            )}

            <div className="no-print" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
              <button type="button" onClick={handleChangeAnswers} style={quiet}>
                <ArrowLeft size={16} aria-hidden="true" />
                Change my answers
              </button>
              <button type="button" onClick={handleRestart} style={quiet}>
                Take the self-check again
              </button>
            </div>

            {mixed.length > 0 && (
              <div role="note" aria-label="Answers worth a second look" style={{ ...card, borderLeft: "3px solid var(--mustard)" }}>
                <p style={{ ...body, marginBottom: "12px" }}>
                  In {mixed.length === 1 ? "one area" : `${mixed.length} areas`}, you called a statement true and also
                  called its opposite true: {mixed.join("; ")}. That often happens when answering quickly, and those
                  areas may read higher than they should. It may be worth a second look.
                </p>
                <button type="button" onClick={handleChangeAnswers} className="no-print" style={quiet}>
                  Look at my answers again
                </button>
              </div>
            )}

            {/* Overall reading */}
            <div style={{ ...card, borderTop: "4px solid var(--mustard)" }}>
              <p style={eyebrow}>YOUR RESULTS</p>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--ink)", margin: "0 0 16px" }}>
                {band.label}
              </h2>
              {shown.list.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", margin: "0 0 20px" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>{shown.lead}</span>
                  {shown.list.map((r) => (
                    <span key={r.area.id} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", background: "var(--bone-warm)", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
                      {r.area.name}
                    </span>
                  ))}
                </div>
              )}
              {band.paragraphs.map((para, i) => (
                <p key={i} style={{ ...body, marginBottom: i === band.paragraphs.length - 1 ? 0 : "16px" }}>
                  {withItalics(para)}
                </p>
              ))}
              {bandQuotesScripture && (
                <div style={{ marginTop: "20px" }}>
                  <ScriptureNote rendering="bsb" />
                </div>
              )}
            </div>

            {/* The next step this band leads with */}
            <div style={{ ...card, borderTop: "4px solid var(--mustard)" }}>
              <p style={eyebrow}>YOUR NEXT STEP</p>
              <p style={{ ...body, margin: "0 0 20px" }}>{band.next.lead}</p>
              <Link
                href={band.next.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "44px",
                  padding: "12px 28px",
                  background: "var(--mustard)",
                  color: "var(--ink)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {band.next.cta}
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
              <p style={{ ...body, fontSize: "15px", color: "var(--ink-muted)", margin: "20px 0 0" }}>
                {band.later.lead}{" "}
                <Link href={band.later.href} style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
                  {band.later.title}
                </Link>
              </p>
            </div>

            <ScopeNote id="scope-after" heading="What this self-check left out, and why" />

            {/* All eight areas, in the same order for everyone */}
            <div style={card}>
              <h2 style={{ ...eyebrow, fontSize: "13px", letterSpacing: "0.15em", margin: "0 0 12px" }}>YOUR EIGHT AREAS</h2>
              <p style={{ ...body, fontSize: "15px", color: "var(--ink-muted)" }}>
                The areas appear in the same order for everyone, and the order ranks nothing. Each is scored from 4 to
                20.
              </p>
              <Passage
                refText="1 Corinthians 12:21"
                text="The eye cannot say to the hand, “I do not need you.” Nor can the head say to the feet, “I do not need you.”"
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {results.map((r) => (
                  <div key={r.area.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{r.area.name}</span>
                      <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", whiteSpace: "nowrap" }}>
                        {LEVEL_LABELS[r.level]} · {r.score}/{AREA_MAX}
                      </span>
                    </div>
                    <div style={{ height: "8px", background: "var(--bone)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(r.score / AREA_MAX) * 100}%`, background: "var(--mustard)", borderRadius: "4px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Each area at its level */}
            {results.map((r) => (
              <AreaResult key={r.area.id} r={r} />
            ))}

            {/* Actions */}
            <div className="no-print" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{ ...quiet, border: "none", background: "var(--charcoal)", color: "var(--charcoal-fg)" }}
              >
                <Printer size={16} aria-hidden="true" />
                Print results
              </button>
              <button type="button" onClick={handleChangeAnswers} style={quiet}>
                Change my answers
              </button>
              <button type="button" onClick={handleRestart} style={quiet}>
                Take the self-check again
              </button>
            </div>
          </div>
        </section>
      )}

      <div style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-5)" }}>
        <CrisisBlock variant="compact" />
      </div>
    </Layout>
  );
}
