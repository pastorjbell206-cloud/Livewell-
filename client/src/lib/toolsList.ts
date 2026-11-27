/**
 * Every tool and self-check on LiveWell, once, under one name.
 *
 * This is the single source for a tool's name. The tools page (/tools), the
 * self-checks page (/assessments), My Library, site search and the search
 * index builder, the Everything page (/explore), the family page, the start
 * quiz, and every "what next" line that names a tool read the name from here
 * (toolName, toolByHref). toolsList.test.ts fails when a page shows a tool's
 * address under any other name.
 *
 * Each entry: an id; the plain name; the job, in one sentence a person would
 * say; about how long it takes; what it keeps on this device ("Nothing" when
 * it keeps nothing); its group; a lucide icon; its address; and, where it was
 * folded into another tool that does the same job, `replacedBy`, the id of
 * that tool. A folded tool stays live at its own address (tool addresses are
 * never redirected) but is listed nowhere; its page carries one line naming
 * the tool that replaced it (components/FoldedNote.tsx).
 *
 * Groups (James's map of 2026-11-18, docs/work/elite/PROJECT-PROMPT.md, and
 * TOOLS-PLAN unit 6): Study, Tools for hard questions, Check yourself, Pray
 * and practise on /tools; the family tools on /family, with one line on
 * /tools pointing there; "elsewhere" for a tool whose home is another door
 * (the Bible door lists it), so search and My Library still know its name.
 *
 * Keep each field on its own line, as below: scripts/build-search-index.mjs,
 * scripts/site-audit-manifest.mjs and lib/site-structure.test.ts read this
 * file as text.
 */
import type { LucideIcon } from "lucide-react";
import {
  Baby,
  BookA,
  BookMarked,
  BookOpen,
  Brain,
  CalendarDays,
  Columns2,
  Compass,
  Gift,
  Glasses,
  HandHeart,
  Heart,
  HeartHandshake,
  Landmark,
  Lightbulb,
  ListChecks,
  MessageCircle,
  MessagesSquare,
  NotebookPen,
  PenLine,
  Quote,
  Scale,
  ScrollText,
  Search,
  Shield,
  Signpost,
  Sprout,
  Sun,
  Target,
  Users,
  Vote,
  Wallet,
} from "lucide-react";

export type ToolGroupId = "study" | "hard-questions" | "check-yourself" | "pray-and-practise" | "family" | "elsewhere";

export interface Tool {
  id: string;
  /** The one name, the same everywhere the tool is listed. */
  name: string;
  /** The job, in one sentence a person would say. */
  job: string;
  /** About how long it takes. */
  time: string;
  /** What it keeps on this device, or "Nothing". */
  keeps: string;
  group: ToolGroupId;
  icon: LucideIcon;
  href: string;
  /** Folded: the id of the tool that does the same job and is listed in its place. */
  replacedBy?: string;
}

export const TOOL_LIST: Tool[] = [
  /* ── Study ─────────────────────────────────────────────────────── */
  {
    id: "study-bible",
    name: "Read the Study Bible",
    job: "I want to read a book of the Bible with notes beside the text.",
    time: "At your own pace",
    keeps: "Chapters you mark read",
    group: "study",
    icon: BookOpen,
    href: "/study/bible",
  },
  {
    id: "bible-search",
    name: "Search the Bible",
    job: "I want to find every verse with a word or phrase in it.",
    time: "1 minute",
    keeps: "Nothing",
    group: "study",
    icon: Search,
    href: "/study/bible/search",
  },
  {
    id: "wisdom-finder",
    name: "What Does the Bible Say About What I Am Facing?",
    job: "I want to know what the Bible says about what I am dealing with.",
    time: "5 minutes",
    keeps: "Verses you save",
    group: "study",
    icon: Lightbulb,
    href: "/tools/wisdom-finder",
  },
  {
    id: "bible-says",
    name: "Misused Bible Verses: What They Actually Mean",
    job: "I want to know what that verse everyone quotes really means.",
    time: "10 minutes",
    keeps: "Nothing",
    group: "study",
    icon: ScrollText,
    href: "/tools/bible-says",
  },
  {
    id: "scripture-memory",
    name: "Memorize Scripture: 40 Key Verses",
    job: "I want to learn a verse by heart.",
    time: "10 minutes a day",
    keeps: "Verses you have learned",
    group: "study",
    icon: BookMarked,
    href: "/tools/scripture-memory",
  },
  {
    id: "theology-glossary",
    name: "Theology glossary",
    job: "I want to know what a church word like atonement means.",
    time: "1 minute",
    keeps: "Nothing",
    group: "study",
    icon: BookA,
    href: "/theology/glossary",
  },
  {
    id: "quotes",
    name: "Quotes From the Essays and Books",
    job: "I want a line from James's writing to keep or share.",
    time: "5 minutes",
    keeps: "Quotes you save",
    group: "study",
    icon: Quote,
    href: "/tools/quotes",
  },

  /* ── Tools for hard questions ──────────────────────────────────── */
  {
    id: "test-the-case",
    name: "Test the Case for Christianity",
    job: "I want to argue about whether the resurrection happened.",
    time: "15 minutes a case",
    keeps: "Where you stopped",
    group: "hard-questions",
    icon: Shield,
    href: "/tools/test-the-case",
  },
  {
    id: "which-lens",
    name: "What Shapes the Way You Read the Bible? A Self-Check",
    job: "I want to see what is bending the way I read the Bible.",
    time: "5 minutes",
    keeps: "Your answers",
    group: "hard-questions",
    icon: Glasses,
    href: "/tools/which-lens",
  },
  {
    id: "consistency",
    name: "Do You Hold Both Sides to the Same Standard? A Self-Check",
    job: "I want to know if I am fair to the side I disagree with.",
    time: "10 minutes",
    keeps: "The ones you mark",
    group: "hard-questions",
    icon: Scale,
    href: "/disruption/consistency",
  },
  {
    id: "compare-views",
    name: "Where Christians differ",
    job: "I want to see the views Christians hold, side by side.",
    time: "10 minutes",
    keeps: "Nothing",
    group: "hard-questions",
    icon: Columns2,
    href: "/theology/compare",
  },
  {
    id: "which-view",
    name: "Which view do I lean toward?",
    job: "I want to know which side of a debate I lean toward.",
    time: "3 minutes a quiz",
    keeps: "Your answers",
    group: "hard-questions",
    icon: Signpost,
    href: "/theology/which-view",
  },
  {
    id: "party-scorecard",
    name: "How Close Is Each Party to the Bible?",
    job: "I want to see how the parties measure up to Scripture.",
    time: "15 minutes",
    keeps: "Nothing",
    group: "hard-questions",
    icon: Vote,
    href: "/nation/scorecard",
  },
  {
    id: "biblical-government",
    name: "What Would a Biblical Government Look Like?",
    job: "I want to see what the Bible's own economics would look like as law.",
    time: "15 minutes",
    keeps: "Nothing",
    group: "hard-questions",
    icon: Landmark,
    href: "/nation/policy",
  },

  /* ── Check yourself ────────────────────────────────────────────── */
  {
    id: "diagnostic",
    name: "Where Are You With God? A Self-Check",
    job: "I want an honest read on where I am with God.",
    time: "5 minutes",
    keeps: "Your past results",
    group: "check-yourself",
    icon: Compass,
    href: "/diagnostic",
  },
  {
    id: "whole-life",
    name: "The Whole-Life Assessment",
    job: "I want to check my whole life once a year and get a rhythm to keep.",
    time: "15 minutes",
    keeps: "Your answers and past results",
    group: "check-yourself",
    icon: Target,
    href: "/life/assessment",
  },
  {
    id: "marriage",
    name: "Marriage Health Self-Check",
    job: "I want to know where our marriage honestly stands.",
    time: "10 minutes",
    keeps: "Your answers and past results",
    group: "check-yourself",
    icon: HeartHandshake,
    href: "/tools/marriage-assessment",
  },
  {
    id: "emotional-health",
    name: "Emotional Health Self-Check",
    job: "I feel off and want to know where to start.",
    time: "10 minutes",
    keeps: "Your answers and past results",
    group: "check-yourself",
    icon: Brain,
    href: "/tools/emotional-health",
  },
  {
    id: "financial-health",
    name: "Financial Health Self-Check",
    job: "I want to know what my money habits say about my heart.",
    time: "8 minutes",
    keeps: "Your answers and past results",
    group: "check-yourself",
    icon: Wallet,
    href: "/tools/financial-health",
  },
  {
    id: "spiritual-gifts",
    name: "Spiritual Gifts Self-Check",
    job: "I want to know what I have to give my church.",
    time: "10 minutes",
    keeps: "Your answers and past results",
    group: "check-yourself",
    icon: Gift,
    href: "/tools/spiritual-gifts",
  },
  {
    id: "theology-quiz",
    name: "Theology Quiz",
    job: "I want ten quick questions on what I believe.",
    time: "4 minutes",
    keeps: "Nothing",
    group: "check-yourself",
    icon: ListChecks,
    href: "/tools/theology-quiz",
  },

  /* ── Pray and practice ─────────────────────────────────────────── */
  {
    id: "prayer-generator",
    name: "Prayers for When You Have No Words",
    job: "I want words to pray right now.",
    time: "2 minutes",
    keeps: "Prayers you save",
    group: "pray-and-practise",
    icon: Heart,
    href: "/tools/prayer-generator",
  },
  {
    id: "prayer-planner",
    name: "The Prayer Planner",
    job: "I want to keep a prayer list and see today's names.",
    time: "5 minutes",
    keeps: "Your prayer list",
    group: "pray-and-practise",
    icon: CalendarDays,
    href: "/tools/prayer-planner",
  },
  {
    id: "worry-journal",
    name: "The Worry Journal",
    job: "I want to put tonight's worries down before bed.",
    time: "5 minutes",
    keeps: "Your entries",
    group: "pray-and-practise",
    icon: PenLine,
    href: "/tools/worry-journal",
  },
  {
    id: "connection-planner",
    name: "A Plan for When You Feel Alone",
    job: "I feel alone and want one small step toward people this week.",
    time: "10 minutes",
    keeps: "Your plan",
    group: "pray-and-practise",
    icon: HandHeart,
    href: "/tools/connection-planner",
  },
  {
    id: "rule-of-life",
    name: "Build a Weekly Rhythm of Prayer and Rest (a Rule of Life)",
    job: "I want a weekly rhythm of prayer and rest I can keep.",
    time: "15 minutes",
    keeps: "Your rule",
    group: "pray-and-practise",
    icon: Sun,
    href: "/tools/rule-of-life",
  },
  {
    id: "proverbs-31",
    name: "Proverbs in 31 Days",
    job: "I want today's chapter of Proverbs.",
    time: "10 minutes a day",
    keeps: "Nothing",
    group: "pray-and-practise",
    icon: Sprout,
    href: "/tools/proverbs-31",
  },
  {
    id: "conflict-guide",
    name: "Work Through a Fight in Five Steps",
    job: "We just had a fight and need to talk it through.",
    time: "20 minutes",
    keeps: "Where you stopped",
    group: "pray-and-practise",
    icon: MessageCircle,
    href: "/tools/conflict-guide",
  },

  /* ── For families (listed on /family) ──────────────────────────── */
  {
    id: "family-devotions",
    name: "Family Devotion Builder",
    job: "I want a devotion written for my kids' age tonight.",
    time: "15 minutes",
    keeps: "Your series",
    group: "family",
    icon: Users,
    href: "/tools/family-devotions",
  },
  {
    id: "parent-teen",
    name: "The Parent and Teen Conversation",
    job: "I want my teenager and me to see where we differ, and talk.",
    time: "5 minutes each",
    keeps: "Your answers, in this tab only",
    group: "family",
    icon: MessagesSquare,
    href: "/tools/parent-teen-conversation",
  },
  {
    id: "parenting-guide",
    name: "What Your Child Needs at Each Age",
    job: "I want to know what my child needs at this age.",
    time: "10 minutes",
    keeps: "Nothing",
    group: "family",
    icon: Baby,
    href: "/tools/parenting-guide",
  },

  /* ── Listed by another door ────────────────────────────────────── */
  {
    id: "passage",
    name: "Read any verse in context",
    job: "I want to see this verse with what surrounds it.",
    time: "2 minutes",
    keeps: "Nothing",
    group: "elsewhere",
    icon: BookOpen,
    href: "/theology/passage",
  },
  {
    id: "bible-background",
    name: "Bible background",
    job: "I want to know what the world was like when this was written.",
    time: "At your own pace",
    keeps: "Nothing",
    group: "elsewhere",
    icon: Landmark,
    href: "/resources/context",
  },

  /* ── Folded: live at their own address, listed nowhere ─────────── */
  {
    id: "bible-on",
    name: "What the Bible Says About Money, Anger, Work and More",
    job: "I want to know what the Bible says about money, anger or work.",
    time: "5 minutes",
    keeps: "Nothing",
    group: "study",
    icon: BookOpen,
    href: "/tools/bible-on",
    replacedBy: "wisdom-finder",
  },
  {
    id: "verse-finder",
    name: "Bible Verse Finder",
    job: "I want verses for what I am carrying.",
    time: "5 minutes",
    keeps: "Verses you save",
    group: "study",
    icon: BookOpen,
    href: "/tools/verse-finder",
    replacedBy: "wisdom-finder",
  },
  {
    id: "parenting-verses",
    name: "Parenting Bible Verses",
    job: "I want Scripture for a hard moment with my child.",
    time: "5 minutes",
    keeps: "Nothing",
    group: "study",
    icon: Baby,
    href: "/tools/parenting-verses",
    replacedBy: "wisdom-finder",
  },
  {
    id: "deep-bible",
    name: "Book-by-Book Bible Study: 20 Books in Depth",
    job: "I want to study a passage in depth.",
    time: "30 minutes",
    keeps: "Your notes and marks",
    group: "study",
    icon: Search,
    href: "/tools/deep-bible",
    replacedBy: "study-bible",
  },
  {
    id: "bible-study",
    name: "How to Study a Book of the Bible: 12 Books",
    job: "I want to know how to read a book of the Bible.",
    time: "10 minutes",
    keeps: "Nothing",
    group: "study",
    icon: NotebookPen,
    href: "/tools/bible-study",
    replacedBy: "study-bible",
  },
  {
    id: "life-audit",
    name: "A Quick Check on Eight Areas of Life",
    job: "I want a quick check on every area of my life.",
    time: "10 minutes",
    keeps: "Your answers and past results",
    group: "check-yourself",
    icon: Target,
    href: "/tools/life-audit",
    replacedBy: "whole-life",
  },
  {
    id: "tools-glossary",
    name: "Theological Vocabulary: 100 Terms Explained",
    job: "I want to know what a church word means.",
    time: "1 minute",
    keeps: "Nothing",
    group: "study",
    icon: BookA,
    href: "/tools/glossary",
    replacedBy: "theology-glossary",
  },
];

/** The groups shown on /tools, in order. The id is the group's address: /tools#<id>. */
export const TOOL_GROUP_INFO: { id: ToolGroupId; name: string; line: string; icon: LucideIcon }[] = [
  { id: "study", name: "Study", line: "Read, search and understand the Bible.", icon: BookOpen },
  { id: "hard-questions", name: "Tools for hard questions", line: "Argue the case, compare the views, test how you read.", icon: Scale },
  { id: "check-yourself", name: "Check yourself", line: "Short, honest self-checks. None of them grades you.", icon: ListChecks },
  { id: "pray-and-practise", name: "Pray and practice", line: "Prayer, rest, worry and the week you are in.", icon: Heart },
];

/** The family tools, listed on /family, and found by the find box on /tools. */
export const FAMILY_GROUP = { id: "family" as const, name: "For families", line: "Tools for parents, kids and teens.", icon: Users };

/** Every tool that is listed: everything not folded into another. */
export const TOOLS: Tool[] = TOOL_LIST.filter((t) => !t.replacedBy);

/** The tools in each /tools group, in order. */
export const TOOL_GROUPS = TOOL_GROUP_INFO.map((g) => ({ ...g, tools: TOOLS.filter((t) => t.group === g.id) }));

/** The family tools. */
export const FAMILY_TOOLS: Tool[] = TOOLS.filter((t) => t.group === "family");

/** Old /tools hashes, from before the regrouping of 2026-11-18, and the part each now opens. */
export const OLD_GROUP_HASHES: Record<string, string> = {
  "scripture-and-theology": "study",
  "help-for-a-decision-or-a-hard-day": "pray-and-practise",
  "self-checks": "check-yourself",
  "faith-and-politics": "hard-questions",
  "family-marriage-and-the-household": "families",
};

export function toolById(id: string): Tool {
  const t = TOOL_LIST.find((x) => x.id === id);
  if (!t) throw new Error(`No tool with id ${id}`);
  return t;
}

/** The tool at an address (query and hash ignored), folded or not. */
export function toolByHref(href: string): Tool | undefined {
  const base = href.split("#")[0].split("?")[0];
  return TOOL_LIST.find((t) => t.href === base);
}

/** A tool's one name, by id. */
export function toolName(id: string): string {
  return toolById(id).name;
}

/** The tool listed in place of a folded one (itself when it is not folded). */
export function survivorOf(tool: Tool): Tool {
  let t = tool;
  for (let i = 0; t.replacedBy && i < 5; i++) t = toolById(t.replacedBy);
  return t;
}

/** The folded tools a survivor took in. */
export function foldedInto(id: string): Tool[] {
  return TOOL_LIST.filter((t) => t.replacedBy === id);
}
