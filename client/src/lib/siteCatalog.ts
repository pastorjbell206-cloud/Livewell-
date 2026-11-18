/**
 * The site catalogue: one committed, static list of LiveWell's doors, rooms
 * and the pages inside each room. The header, the phone menu, the footer, the
 * search shortcuts and the Everything page (/explore) all read from it, so a
 * page has one name everywhere it is offered.
 *
 * The map is James's of 2026-11-18 (docs/work/elite/PROJECT-PROMPT.md, last
 * section): seven doors, six rooms or fewer in each. A room is listed only
 * when its page exists; where a planned room has no page yet it points at the
 * best page there is, under a name that is true of that page
 * (docs/work/elite/map.md lists each choice).
 *
 * Kept static and free of imports beyond types, so the header paints in full
 * before any API call answers (the first-paint contract in CLAUDE.md).
 *
 * Every entry is written on one line in the order id, name, line, href:
 * scripts/prerender-heads.mjs and scripts/site-audit-manifest.mjs read this
 * file as text. Counts are checked against the repo's own data by
 * siteCatalog.test.ts.
 */

export type DoorId = "bible" | "history" | "questions" | "family" | "tools" | "essays" | "about";

/** The engraved plates of the art kit (client/src/components/art/Plate.tsx). */
export type DoorPlate = "book" | "basilica" | "lantern" | "house" | "compass" | "quill" | "letter";

/** A lucide-react icon, by name (lib/siteIcons.ts maps the names to icons). */
export type IconName =
  | "BookOpen"
  | "Search"
  | "Compass"
  | "Route"
  | "Map"
  | "CalendarDays"
  | "Landmark"
  | "GraduationCap"
  | "Hourglass"
  | "Users"
  | "ScrollText"
  | "Church"
  | "MessageCircleQuestion"
  | "ShieldQuestion"
  | "Lightbulb"
  | "Scale"
  | "Sprout"
  | "House"
  | "Flame"
  | "Moon"
  | "Baby"
  | "BookMarked"
  | "HeartHandshake"
  | "ClipboardCheck"
  | "Milestone"
  | "Download"
  | "Feather"
  | "UserRound"
  | "Library"
  | "Mic"
  | "Mail"
  | "Send"
  | "Signpost"
  | "LifeBuoy"
  | "BookmarkCheck"
  | "LayoutGrid"
  | "FileText"
  | "Globe";

export interface CatalogCount {
  n: number;
  /** What is counted, plural: "books", "guides". */
  of: string;
}

/** One place on the site: a door's own page, a room, or a page inside a room. */
export interface CatalogEntry {
  id: string;
  /** The plain name, the same in every menu, list and tile. */
  name: string;
  /** One short line: what a person can do there. */
  line: string;
  href: string;
  icon: IconName;
  count?: CatalogCount;
  /** true: an address on another site (opens in a new tab). */
  external?: boolean;
}

export interface Door {
  id: DoorId;
  /** The word in the header. */
  name: string;
  icon: IconName;
  plate: DoorPlate;
  /** The door's own page ("Everything in <door>"). */
  page: CatalogEntry;
  /** Six or fewer, in order. Empty for a door that is one plain link (Essays). */
  rooms: Room[];
}

export interface Room extends CatalogEntry {
  /** What else is one tap inside this room, shown on /explore. */
  inside?: CatalogEntry[];
}

export const DOORS: Door[] = [
  {
    id: "bible",
    name: "Bible",
    icon: "BookOpen",
    plate: "book",
    page: { id: "bible", name: "Study the Bible", line: "Read, search and understand the Bible, with notes beside every chapter.", href: "/study", icon: "BookOpen" },
    rooms: [
      {
        id: "bible.read", name: "Read the Study Bible", line: "Every book and chapter, with notes beside the text.", href: "/study/bible", icon: "BookOpen", count: { n: 66, of: "books" },
        inside: [
          { id: "bible.passage", name: "Read any verse in context", line: "Type a verse and see the passage around it.", href: "/theology/passage", icon: "FileText" },
        ],
      },
      { id: "bible.search", name: "Search the Bible", line: "Find every verse that holds a word or phrase.", href: "/study/bible/search", icon: "Search" },
      {
        id: "bible.guides", name: "Guides to reading it", line: "How the Bible came to us, and how to read each kind of book.", href: "/study/bible/guides", icon: "Compass", count: { n: 24, of: "guides" },
        inside: [
          { id: "bible.how-to-study", name: "How to study the Bible", line: "Seven steps for studying a passage, in order.", href: "/study/how-to-study", icon: "Search" },
        ],
      },
      { id: "bible.story", name: "The Bible's story", line: "The whole Bible as one story, in eleven parts.", href: "/study/bible/story", icon: "Route", count: { n: 11, of: "parts" } },
      { id: "bible.background", name: "Bible background", line: "The world the Bible was written in: its places, peoples and customs.", href: "/resources/context", icon: "Map", count: { n: 41, of: "guides" } },
      {
        id: "bible.plans", name: "Reading plans", line: "Every plan for reading the Bible, by length.", href: "/study/plans", icon: "CalendarDays",
        inside: [
          { id: "bible.year", name: "The Bible in a year", line: "A daily plan through the whole story in 2027.", href: "/study/bible/guides/whole-story-2027", icon: "CalendarDays" },
        ],
      },
    ],
  },
  {
    id: "history",
    name: "History",
    icon: "Landmark",
    plate: "basilica",
    page: { id: "history", name: "Church history", line: "The story of the church from the apostles to today.", href: "/theology/history", icon: "Landmark" },
    rooms: [
      {
        id: "history.course", name: "The course", line: "Church history in order, one lesson at a time.", href: "/theology/history#course", icon: "GraduationCap",
        inside: [
          { id: "history.councils", name: "The councils", line: "The meetings where the church settled what it believes.", href: "/theology/history#councils", icon: "Users" },
          { id: "history.heresies", name: "The heresies", line: "The wrong turns the early church answered, and how.", href: "/theology/history#heresies", icon: "Signpost" },
        ],
      },
      {
        id: "history.timeline", name: "The timeline", line: "Two thousand years of events on one line.", href: "/theology/history#timeline", icon: "Hourglass",
        inside: [
          { id: "history.injustice", name: "Timeline of injustice", line: "Wrongs done inside the church and out, faced honestly.", href: "/justice/timeline", icon: "Hourglass" },
        ],
      },
      {
        id: "history.people", name: "The people", line: "The men and women who carried the faith.", href: "/theology/history/people", icon: "Users", count: { n: 36, of: "people" },
        inside: [
          { id: "history.witnesses-justice", name: "Christians who fought injustice", line: "People who did justice at real cost.", href: "/justice/witnesses", icon: "Users" },
          { id: "history.witnesses-truth", name: "Christians who told the church the truth", line: "People who spoke a costly truth to the church.", href: "/disruption/witnesses", icon: "Users" },
        ],
      },
      {
        id: "history.creeds", name: "Creeds and confessions", line: "The church's own statements of faith, in full, with plain notes.", href: "/resources/creeds", icon: "ScrollText", count: { n: 14, of: "documents" },
        inside: [
          { id: "history.creeds-short", name: "The creeds in brief", line: "A short guide to the main creeds.", href: "/theology/creeds", icon: "ScrollText" },
        ],
      },
      { id: "history.traditions", name: "Christian traditions", line: "Why there are so many churches, and where each came from.", href: "/theology/traditions", icon: "Church" },
    ],
  },
  {
    id: "questions",
    name: "Questions",
    icon: "MessageCircleQuestion",
    plate: "lantern",
    page: { id: "questions", name: "Hard questions", line: "The hard questions people ask, by topic, each with the page that answers it.", href: "/topics", icon: "MessageCircleQuestion" },
    rooms: [
      {
        id: "questions.answers", name: "Honest Answers", line: "Short, straight answers to the questions people ask about faith.", href: "/answers", icon: "MessageCircleQuestion", count: { n: 35, of: "answers" },
        inside: [
          { id: "questions.more", name: "More questions, answered short", line: "Over a hundred more questions about God, the Bible and the church.", href: "/theology/questions", icon: "MessageCircleQuestion" },
          { id: "faq.does-god-exist", name: "Does God exist?", line: "Eight honest answers to the hardest question.", href: "/faq/does-god-exist", icon: "MessageCircleQuestion" },
          { id: "faq.bible-accurate", name: "Is the Bible historically accurate?", line: "Eight questions about the Bible and history.", href: "/faq/is-the-bible-historically-accurate", icon: "MessageCircleQuestion" },
          { id: "faq.science-faith", name: "Can science and faith coexist?", line: "Questions about science and belief.", href: "/faq/can-science-and-faith-coexist", icon: "MessageCircleQuestion" },
          { id: "faq.hell", name: "What do Christians believe about hell?", line: "Eight questions about judgment and hell.", href: "/faq/what-do-christians-believe-about-hell", icon: "MessageCircleQuestion" },
          { id: "faq.deconstruction", name: "What is deconstruction?", line: "Eight answers for people taking their faith apart.", href: "/faq/what-is-deconstruction", icon: "MessageCircleQuestion" },
          { id: "faq.religious-trauma", name: "What is religious trauma?", line: "Eight questions about harm done in the name of faith.", href: "/faq/what-is-religious-trauma", icon: "MessageCircleQuestion" },
          { id: "faq.leaving-church", name: "Why are people leaving church?", line: "Eight questions about why people walk away.", href: "/faq/why-are-people-leaving-church", icon: "MessageCircleQuestion" },
          { id: "faq.young-people", name: "Why do young people leave church?", line: "Eight questions about the young who walk away.", href: "/faq/why-do-young-people-leave-church", icon: "MessageCircleQuestion" },
          { id: "faq.denomination", name: "What denomination should I join?", line: "Eight questions about choosing a church.", href: "/faq/what-denomination-should-i-join", icon: "MessageCircleQuestion" },
          { id: "faq.catholic-protestant", name: "Catholic and Protestant: eight differences", line: "The main differences, explained.", href: "/faq/catholic-vs-protestant", icon: "MessageCircleQuestion" },
        ],
      },
      { id: "questions.skeptics", name: "For skeptics", line: "Where to start if you do not believe, or are not sure.", href: "/skeptics", icon: "ShieldQuestion" },
      {
        id: "questions.believe", name: "What Christians believe", line: "Short studies of what the Bible teaches, one belief at a time.", href: "/study/bible/doctrines", icon: "Lightbulb", count: { n: 62, of: "studies" },
        inside: [
          { id: "questions.glossary", name: "Theology glossary", line: "The words theology uses, in plain terms.", href: "/theology/glossary", icon: "BookMarked" },
          { id: "questions.doctrine-guide", name: "How to use the doctrine studies", line: "What the longer doctrine studies are and how to read them.", href: "/theology/how-to-use", icon: "Lightbulb" },
          { id: "questions.doctrine-search", name: "Search the doctrines, creeds and glossary", line: "Find a belief, a creed or a word.", href: "/theology/search", icon: "Search" },
        ],
      },
      {
        id: "questions.differ", name: "Where Christians differ", line: "The questions faithful Christians disagree on, each view side by side.", href: "/theology/compare", icon: "Scale",
        inside: [
          { id: "questions.which-view", name: "Which view do I lean toward?", line: "Short quizzes on six questions Christians differ on.", href: "/theology/which-view", icon: "Scale" },
          { id: "compare.catholic-protestant", name: "Catholic and Protestant", line: "What the difference is.", href: "/compare/catholic-vs-protestant", icon: "Scale" },
          { id: "compare.orthodox-catholic", name: "Orthodox and Catholic", line: "What the difference is.", href: "/compare/orthodox-vs-catholic", icon: "Scale" },
          { id: "compare.calvinism-arminianism", name: "Calvinism and Arminianism", line: "What the difference is.", href: "/compare/calvinism-vs-arminianism", icon: "Scale" },
          { id: "compare.baptist-methodist", name: "Baptist and Methodist", line: "What the difference is.", href: "/compare/baptist-vs-methodist", icon: "Scale" },
          { id: "compare.evangelical-mainline", name: "Evangelical and mainline", line: "What the difference is.", href: "/compare/evangelical-vs-mainline", icon: "Scale" },
          { id: "compare.worship", name: "Liturgical and contemporary worship", line: "What the difference is.", href: "/compare/liturgical-vs-contemporary", icon: "Scale" },
        ],
      },
      {
        id: "questions.life", name: "Everyday life", line: "Marriage, work, money, the body and the seasons of life.", href: "/life", icon: "Sprout", count: { n: 69, of: "guides" },
        inside: [
          { id: "questions.how-tos", name: "How-to guides", line: "Step-by-step guides for the practices of the Christian life.", href: "/how-tos", icon: "Sprout", count: { n: 132, of: "guides" } },
          { id: "questions.wisdom", name: "What the Bible says, by subject", line: "What Scripture says about the things people face.", href: "/wisdom", icon: "BookMarked", count: { n: 208, of: "subjects" } },
          { id: "questions.nation", name: "Christ and the nation", line: "Faith and politics, measured by the same standard on every side.", href: "/nation", icon: "Globe" },
        ],
      },
    ],
  },
  {
    id: "family",
    name: "Family",
    icon: "House",
    plate: "house",
    page: { id: "family", name: "Family", line: "Lead your family in the faith, one evening at a time.", href: "/family", icon: "House" },
    rooms: [
      { id: "family.tonight", name: "Tonight's devotion", line: "Read, talk, do and pray together tonight.", href: "/family/tonight", icon: "Flame" },
      { id: "family.devotions", name: "All family devotions", line: "A devotion for every week of the year, and the seasons.", href: "/family/devotions", icon: "Moon" },
      { id: "family.catechism", name: "The family catechism", line: "Questions and answers about the faith, for kids.", href: "/family/catechism", icon: "Baby", count: { n: 76, of: "questions" } },
      { id: "family.plans", name: "Family reading plans", line: "Read the Bible together, a little each day.", href: "/family/reading-plans", icon: "CalendarDays", count: { n: 4, of: "plans" } },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "Compass",
    plate: "compass",
    page: { id: "tools", name: "Tools and resources", line: "Every tool on LiveWell, free, and each one works on a phone.", href: "/tools", icon: "Compass" },
    rooms: [
      {
        id: "tools.study", name: "Study", line: "Read, search and understand the Bible.", href: "/tools#study", icon: "BookMarked", count: { n: 7, of: "tools" },
        inside: [
          { id: "tools.questions", name: "Tools for hard questions", line: "Argue the case, compare the views, test how you read.", href: "/tools#hard-questions", icon: "Scale", count: { n: 7, of: "tools" } },
        ],
      },
      { id: "tools.checks", name: "Check yourself", line: "Short, honest self-checks. None of them grades you.", href: "/tools#check-yourself", icon: "ClipboardCheck", count: { n: 7, of: "tools" } },
      { id: "tools.practise", name: "Pray and practise", line: "Prayer, rest, worry and the week you are in.", href: "/tools#pray-and-practise", icon: "HeartHandshake", count: { n: 7, of: "tools" } },
      { id: "tools.plans", name: "Eight-week plans", line: "A plan for a hard season, one week at a time.", href: "/plans", icon: "Milestone", count: { n: 29, of: "plans" } },
      {
        id: "tools.groups", name: "Small group study guides", line: "Bible studies for a group, a class, or on your own.", href: "/studyguides", icon: "Users", count: { n: 68, of: "guides" },
        inside: [
          { id: "path.skeptic", name: "The skeptic's reading path", line: "Four study guides, in order, for the honest doubter.", href: "/reading-paths/skeptic", icon: "Route" },
          { id: "path.doubt", name: "When faith has questions", line: "Four study guides, in order, for a faith under strain.", href: "/reading-paths/doubt", icon: "Route" },
          { id: "path.marriage", name: "The marriage reading path", line: "Three study guides, in order, for a marriage.", href: "/reading-paths/marriage", icon: "Route" },
          { id: "path.parenting", name: "The parenting reading path", line: "Three study guides, in order, for parents.", href: "/reading-paths/parenting", icon: "Route" },
          { id: "tools.booklets", name: "Booklets on elders and church government", line: "Free booklets for church leaders.", href: "/resources/hard-issues-series", icon: "FileText" },
        ],
      },
      {
        id: "tools.downloads", name: "Downloads", line: "Free guides and plans to print or keep.", href: "/downloads", icon: "Download",
        inside: [
          { id: "tools.resources", name: "All resources, on one page", line: "Downloads, tools, help and family pages in one list.", href: "/resources", icon: "LayoutGrid" },
        ],
      },
    ],
  },
  {
    id: "essays",
    name: "Essays",
    icon: "Feather",
    plate: "quill",
    page: { id: "essays", name: "Essays", line: "James's essays, by section.", href: "/writing", icon: "Feather" },
    rooms: [],
  },
  {
    id: "about",
    name: "About",
    icon: "UserRound",
    plate: "letter",
    page: { id: "about", name: "About James", line: "Who James Bell is, and why he writes.", href: "/about", icon: "UserRound" },
    rooms: [
      {
        id: "about.books", name: "Books", line: "The books James wrote.", href: "/books", icon: "Library", count: { n: 3, of: "books" },
        inside: [
          { id: "book.when-god-bless-america", name: "When God Bless America Replaces Thy Kingdom Come", line: "A book by James Bell.", href: "/books/when-god-bless-america", icon: "Library" },
          { id: "book.monster", name: "The Monster in the Mirror", line: "A book by James Bell.", href: "/books/the-monster-in-the-mirror", icon: "Library" },
          { id: "book.believe", name: "Believe", line: "A book by James Bell.", href: "/books/believe", icon: "Library" },
        ],
      },
      { id: "about.speaking", name: "Speaking", line: "Ask James to speak or preach.", href: "/speaking", icon: "Mic" },
      {
        id: "about.connect", name: "Find James", line: "His Substack, Facebook, podcast and other work, in one place.", href: "/connect", icon: "Signpost",
        inside: [
          { id: "about.podcast", name: "Following the Way (podcast)", line: "The podcast, on its own site.", href: "http://followingthewaypodcast.com/", icon: "Mic", external: true },
          { id: "about.ends", name: "ENDS (training pastors in remote regions)", line: "The ENDS Initiative, on its own site.", href: "https://endsinitiative.org", icon: "Globe", external: true },
        ],
      },
      { id: "about.contact", name: "Contact", line: "Write to James.", href: "/contact", icon: "Mail" },
      { id: "about.subscribe", name: "Subscribe", line: "Get new essays by email.", href: "/subscribe", icon: "Send" },
    ],
  },
];

/** "New here? Start here": first in every door's panel foot and the phone menu. */
export const START_LINK: CatalogEntry = { id: "start", name: "New here? Start here", line: "One road for someone new to faith, or coming back.", href: "/start", icon: "Sprout" };

/** Crisis care, one tap from every page. */
export const HELP_ENTRY: CatalogEntry = { id: "help", name: "Find Help", line: "Help for what you are facing, with the crisis lines first.", href: "/help", icon: "LifeBuoy", count: { n: 40, of: "pages" } };

/** What this reader saved and started, kept on this device. */
export const LIBRARY_ENTRY: CatalogEntry = { id: "library", name: "My Library", line: "What you saved and started, kept on this device.", href: "/my-library", icon: "BookmarkCheck" };

/** The one page of everything. */
export const EVERYTHING_ENTRY: CatalogEntry = { id: "everything", name: "Everything on LiveWell", line: "Every door, room and tool on one page.", href: "/explore", icon: "LayoutGrid" };

/** Shortcuts under the search box, each under its catalogue name. */
export const SEARCH_SHORTCUT_IDS = ["bible.read", "history", "questions", "family.tonight", "tools", "essays", "everything", "help"] as const;

/** The legal line at the foot of every page. */
export const LEGAL_LINKS: { name: string; href: string }[] = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Accessibility", href: "/accessibility" },
];

/** Every entry: door pages, rooms, the pages inside rooms, and the utilities. */
export function allEntries(): (CatalogEntry & { door: DoorId | null; room: string | null })[] {
  const out: (CatalogEntry & { door: DoorId | null; room: string | null })[] = [];
  for (const d of DOORS) {
    out.push({ ...d.page, door: d.id, room: null });
    for (const r of d.rooms) {
      out.push({ ...r, door: d.id, room: r.id });
      for (const i of r.inside ?? []) out.push({ ...i, door: d.id, room: r.id });
    }
  }
  for (const u of [START_LINK, HELP_ENTRY, LIBRARY_ENTRY, EVERYTHING_ENTRY]) out.push({ ...u, door: null, room: null });
  return out;
}

export function entryById(id: string): CatalogEntry | undefined {
  return allEntries().find((e) => e.id === id);
}

/** The catalogue's name for an address (hash kept), when it has one. */
export function nameForHref(href: string): string | undefined {
  return allEntries().find((e) => e.href === href)?.name;
}

/**
 * The door that holds a path, by the longest matching address among its page,
 * rooms and the pages inside them. /resources/creeds reads as History.
 */
export function doorForPath(pathname: string): DoorId | null {
  let best: DoorId | null = null;
  let bestLen = 0;
  for (const e of allEntries()) {
    if (!e.door || e.external) continue;
    const base = e.href.split("#")[0].split("?")[0];
    const hit = pathname === base || (base !== "/" && pathname.startsWith(base + "/"));
    if (hit && base.length > bestLen) {
      best = e.door;
      bestLen = base.length;
    }
  }
  return best;
}
