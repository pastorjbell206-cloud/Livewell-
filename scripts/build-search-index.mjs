#!/usr/bin/env node
/**
 * build-search-index.mjs
 *
 * Writes client/public/search-index.json: the sources on-site search (/search)
 * reads that are too large, or too scattered, to fetch whole when a reader
 * types a question. The wisdom topics alone are 700 KB in full; search needs
 * only each one's name, the words people use for it, and a line to show.
 *
 *   Wisdom topics        client/public/wisdom/topics.json      -> /wisdom/<id>
 *   Honest Answers       client/src/data/answers.ts            -> /answers/<slug>
 *   Family devotions     client/public/family-devotions*.json  -> /family/devotions/<id> (every live strand)
 *   Family Catechism     client/public/family-catechism.json   -> /family/catechism
 *   Christ and the Nation client/public/nation/<slug>.json     -> /nation/<slug>
 *   Main pages           MAIN_PAGES below                      -> the hubs, by their plain names
 *   The Study Bible      bible/books.json + notes/<book>/intro.json, bible/guides, the story's acts
 *   Doctrine             bible/doctrines.json                  -> /study/bible/doctrines/<id>
 *   Compare the Views    theology/index.json                   -> /theology/doctrine/<slug>
 *   Church History       theology/church-history-*.json        -> /theology/history#<person-, council-, heresy-><name>
 *   Seasonal devotions   client/public/family-seasonal.json    -> /family/devotions?tab=<set>&day=<n>
 *
 * A visitor who types the name of a section ("church history", "family
 * devotions", "study bible") must be handed that section. Until 2026-11 the
 * index held only the entries inside the sections, so the search answered
 * with whatever essay or tool happened to share a word
 * (docs/work/audit-2026-11/technical.md, T2).
 *
 * Apart from MAIN_PAGES, nothing here is written copy: every title and line
 * is read from the source the page itself renders. The rewritten essays are
 * searched from essayOverrides.generated.ts, the tools from the /tools
 * registry (pages/Search.tsx), and the other libraries from their own
 * manifests (lib/catalog.ts), so none of those is repeated here.
 *
 * Run with tsx, because Honest Answers is a TypeScript data module:
 *   pnpm run search:index            write the index
 *   pnpm run search:index --check    exit 1 if the index is stale (a CI gate)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { devotionsIn } from "./lib/family-devotion-file.mjs";
import { STRANDS } from "./lib/family-index.mjs";

import { ANSWERS } from "../client/src/data/answers.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "client/public");
export const OUT = "client/public/search-index.json";

/** Where a weekly devotion opens: its own page (The Table, U17). */
const devotionHref = (id) => `/family/devotions/${id}`;

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(PUB, rel), "utf8"));
const str = (x) => (typeof x === "string" ? x.trim() : "");

/**
 * A line short enough to show under a result: whole sentences up to about
 * 200 characters, or, when that leaves too little ("No."), the text cut at a
 * word break.
 */
export function clip(text, max = 200) {
  const s = str(text).replace(/\s+/g, " ");
  if (s.length <= max) return s;
  let out = "";
  for (const sentence of s.match(/[^.?!]+[.?!]+(?=\s|$)|[^.?!]+$/g) ?? []) {
    if ((out + sentence).length > max) break;
    out += sentence;
  }
  if (out.trim().length >= 60) return out.trim();
  const cut = s.slice(0, max + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

function wisdom() {
  return readJson("wisdom/topics.json").topics.map((t) => ({
    title: str(t.label),
    blurb: clip(t.framing),
    keywords: (t.keywords ?? []).map(str).filter(Boolean).join(" · "),
    href: `/wisdom/${t.id}`,
  }));
}

function answers() {
  return ANSWERS.map((a) => ({
    title: str(a.question),
    blurb: clip(a.paragraphs?.[0]),
    // The essay's title and address carry the plain name of the subject
    // ("trinity", "inerrancy") when the question itself does not use the word.
    keywords: `${str(a.essayTitle)} ${str(a.essaySlug).replace(/-/g, " ")} ${str(a.askedAs)}`.trim(),
    href: `/answers/${a.slug}`,
  }));
}

/**
 * The site's main pages, by the plain names a visitor types. `keywords` are
 * the other words people use for the page; they are matched, never shown.
 * Each line says only what the page holds. A page that is added, renamed or
 * retired changes here (validate-links.mjs checks every address).
 */
const MAIN_PAGES = [
  { title: "The Study Bible", href: "/study/bible", blurb: "Every book and chapter of the Bible, with study notes and the Hebrew and Greek beneath each word.", keywords: "study bible read scripture books chapters notes hebrew greek who wrote the bible" },
  { title: "Study the Bible: where to start", href: "/study", blurb: "The Study Bible, church history, the creeds, and guides to reading Scripture in the world it was written in.", keywords: "bible study learn start begin how to read the bible" },
  { title: "The story of the Bible", href: "/study/bible/story", blurb: "The whole Bible as one story, told in eleven acts.", keywords: "storyline overview big picture summary of the bible" },
  { title: "What the Bible teaches", href: "/study/bible/doctrines", blurb: "The main teachings of the faith, each followed through the chapters that teach it.", keywords: "doctrine doctrines theology beliefs" },
  { title: "Guides to reading the Bible", href: "/study/bible/guides", blurb: "Short guides to what the Bible is, how it came to us, and how to read it.", keywords: "how to read the bible who wrote the bible canon translations" },
  { title: "Read the whole story in 2027", href: "/study/bible/guides/whole-story-2027", blurb: "A plan for reading through the Bible's story in a year.", keywords: "reading plan bible in a year daily" },
  { title: "Bible reading plans", href: "/study/plans", blurb: "Every reading plan in one place, by length and by who is reading.", keywords: "reading plan reading plans bible in a year new testament psalms daily family devotional schedule" },
  { title: "How to study the Bible", href: "/study/how-to-study", blurb: "Seven steps that work on any chapter, and a guided study that takes you through them one screen at a time.", keywords: "how to study the bible bible study method steps inductive observe interpret apply guided study" },
  { title: "Church history", href: "/theology/history", blurb: "The story of the church from the apostles to now: its eras, its people, its councils, and the false teachings it answered.", keywords: "history of the church christian history timeline early church fathers reformation councils" },
  { title: "Compare the views", href: "/theology/compare", blurb: "The doctrines Christians debate, with each view set side by side.", keywords: "doctrine comparison debated views positions denominations differences" },
  { title: "Theology glossary", href: "/theology/glossary", blurb: "The words theology uses, each defined plainly.", keywords: "dictionary terms definitions meaning words" },
  { title: "Creeds and confessions", href: "/resources/creeds", blurb: "The creeds and confessions of the church, with where each came from.", keywords: "apostles creed nicene creed confession of faith" },
  { title: "The Bible in its context", href: "/resources/context", blurb: "Guides to the world each part of the Bible was written in.", keywords: "background culture history context guides" },
  { title: "Study guides for groups", href: "/studyguides", blurb: "Bible studies to work through with a group, a class, or on your own.", keywords: "small group bible study sunday school class discussion" },
  { title: "Everything on LiveWell", href: "/explore", blurb: "Every door, room and tool on LiveWell, on one page.", keywords: "everything site map all pages index directory list what is on this site" },
  { title: "New to faith? Start here", href: "/start", blurb: "Where to begin if you are new to the faith or coming back to it.", keywords: "start here new christian beginner begin discipleship first steps coming back where to start" },
  { title: "Topics: the hard questions", href: "/topics", blurb: "The hard questions of faith, each with the answers, plans and tools that go with it.", keywords: "topics questions subjects issues" },
  { title: "Honest Answers", href: "/answers", blurb: "Short, direct answers to the questions people ask about the Christian faith.", keywords: "questions answers faq doubt objections apologetics" },
  { title: "What the Bible says", href: "/wisdom", blurb: "What Scripture says about the things people face, one subject to a page.", keywords: "bible verses about topics what does the bible say" },
  { title: "Eight-week plans", href: "/plans", blurb: "Plans that take one need a week at a time for eight weeks.", keywords: "plan plans weekly 8 week" },
  { title: "Self-checks", href: "/assessments", blurb: "Every self-check on the site in one place.", keywords: "assessment assessments quiz test inventory self-checks self checks" },
  { title: "Tools and resources", href: "/tools", blurb: "Every tool on the site, in one list.", keywords: "tools planners builders generators" },
  { title: "How-to guides", href: "/how-tos", blurb: "Step-by-step guides for the practices of the Christian life.", keywords: "how to guide guides practical steps" },
  { title: "Downloads and PDFs", href: "/downloads", blurb: "Everything on the site that can be printed or saved.", keywords: "download pdf print printable booklet" },
  { title: "All resources", href: "/resources", blurb: "Everything to use, on one page.", keywords: "resources library everything" },
  { title: "Find Help", href: "/help", blurb: "Help for a hard season, starting from what you are facing.", keywords: "help hard season struggling care support" },
  { title: "For families", href: "/family", blurb: "Tonight's devotion, a year of devotions, the catechism, and family reading plans.", keywords: "family devotions kids children parents parenting home household" },
  { title: "Tonight's family devotion", href: "/family/tonight", blurb: "The devotion for tonight, ready to read at the table.", keywords: "family devotions tonight at the table kids children dinner" },
  { title: "A year of family devotions", href: "/family/devotions", blurb: "Every family devotion, week by week, with the sets for Thanksgiving, Advent and Holy Week.", keywords: "family devotions list weekly advent christmas thanksgiving holy week easter kids children" },
  { title: "The family catechism", href: "/family/catechism", blurb: "Questions and answers for teaching the faith at home.", keywords: "catechism questions answers kids children memorize teach" },
  { title: "Family reading plans", href: "/family/reading-plans", blurb: "Plans for reading the Bible together as a family.", keywords: "family bible reading plan kids children" },
  { title: "Essays", href: "/writing", blurb: "The essays of James Bell.", keywords: "essays articles writing blog posts james bell" },
  { title: "Books", href: "/books", blurb: "The books of James Bell.", keywords: "books author james bell book" },
  { title: "About James", href: "/about", blurb: "Who James Bell is, and why he writes.", keywords: "about james bell author bio who is" },
  { title: "Contact", href: "/contact", blurb: "Write to James.", keywords: "contact email message reach get in touch james bell" },
  { title: "Find James", href: "/connect", blurb: "Everything James does, in one place: ENDS (Ends of the Earth Initiative), his Substack, Facebook, his books, speaking, and how to write to him.", keywords: "connect follow social media facebook substack ends initiative ends of the earth missions shepherds books speaking contact find james bell" },
  { title: "Subscribe", href: "/subscribe", blurb: "New writing by email.", keywords: "subscribe newsletter email sign up substack" },
  { title: "Speaking", href: "/speaking", blurb: "Invite James to speak.", keywords: "speaking speaker invite preach event conference james bell" },
  { title: "LiveWell on your phone", href: "/app", blurb: "Put LiveWell on your phone or computer and open it from an icon. The same site, free.", keywords: "app install download phone iphone android home screen computer desktop mac windows icon" },
  { title: "My Library", href: "/my-library", blurb: "What you have saved and started, kept on this device.", keywords: "saved bookmarks my library progress continue" },
];

/**
 * Every tool's one name, by address, read as text from client/src/lib/toolsList.ts
 * (each entry keeps id, name, ... href on their own lines). A main page that
 * is a tool is indexed under the tool's name, so search and the tools page agree.
 */
export function toolNames() {
  const src = fs.readFileSync(path.join(ROOT, "client/src/lib/toolsList.ts"), "utf8");
  const names = new Map();
  for (const m of src.matchAll(/\{\s*id: "[^"]+",\s*name: "([^"]+)",[\s\S]*?href: "([^"]+)",/g)) names.set(m[2], m[1]);
  return names;
}

/**
 * Every door's, room's and page's one name, by address, read as text from
 * client/src/lib/siteCatalog.ts (each entry on one line: id, name, line,
 * href). A main page is indexed under the name the menus give it.
 */
export function catalogNames() {
  const src = fs.readFileSync(path.join(ROOT, "client/src/lib/siteCatalog.ts"), "utf8");
  const names = new Map();
  for (const m of src.matchAll(/\{\s*id: "[^"]+", name: "([^"]+)", line: "[^"]*", href: "([^"]+)"/g)) if (!names.has(m[2])) names.set(m[2], m[1]);
  return names;
}

function mainPages() {
  const catalog = catalogNames();
  const tools = toolNames();
  return MAIN_PAGES.map((p) => ({ ...p, title: catalog.get(p.href) ?? tools.get(p.href) ?? p.title }));
}

/** The Study Bible beyond its chapters: each book's introduction, the reading guides, the acts of the story. */
function studyBible() {
  const books = readJson("bible/books.json").flatMap((b) => {
    const file = `bible/notes/${b.slug}/intro.json`;
    if (!fs.existsSync(path.join(PUB, file))) return [];
    return [{
      title: `Introduction to ${str(b.name)}`,
      blurb: clip(readJson(file).tagline),
      facet: "Book introductions",
      keywords: `who wrote ${str(b.name)} author date when written outline background`,
      href: `/study/bible/${b.slug}`,
    }];
  });
  const guides = readJson("bible/guides/index.json").groups.flatMap((g) =>
    (g.guides ?? []).map((x) => ({ title: str(x.title), blurb: clip(x.summary), facet: "Guides to reading the Bible", href: `/study/bible/guides/${x.id}` }))
  );
  const line = readJson("theology/biblical-theology-storyline.json").acts;
  const acts = readJson("bible/story.json").acts.flatMap((a) => {
    const l = line.find((x) => x.id === a.id);
    return l ? [{ title: `${str(l.act)}: ${str(l.title)}`, blurb: clip(l.summary), facet: "The story of the Bible", keywords: str(l.range), href: `/study/bible/story/${a.id}` }] : [];
  });
  return [...books, ...guides, ...acts];
}

function doctrines() {
  return readJson("bible/doctrines.json").doctrines.map((d) => ({
    title: str(d.name),
    blurb: clip(d.summary),
    href: `/study/bible/doctrines/${d.id}`,
  }));
}

function debatedDoctrines() {
  return readJson("theology/index.json").docs.map((d) => ({
    title: str(d.title),
    blurb: clip(d.subtitle),
    keywords: str(d.slug).replace(/-/g, " "),
    href: `/theology/doctrine/${d.slug}`,
  }));
}

/** The anchor of one entry on the church history page; the same rule as entryId in client/src/lib/historyCourse.ts. */
const entryId = (kind, name) => `${kind}-${name.toLowerCase().replace(/,.*$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;

/** The people, councils and false teachings on the church history page, each opening its own entry. */
function history() {
  const people = readJson("theology/church-history-figures.json").figures.map((f) => ({
    title: str(f.name),
    blurb: clip(`${str(f.role)}, ${str(f.dates)}. ${str(f.summary)}`),
    facet: "People",
    keywords: str(f.era),
    href: `/theology/history#${entryId("person", str(f.name))}`,
  }));
  const councils = readJson("theology/church-history-councils.json").councils.map((c) => ({
    title: str(c.name),
    blurb: clip(`${str(c.year)}, ${str(c.place)}. ${str(c.calledOver)}`),
    facet: "Councils",
    href: `/theology/history#${entryId("council", str(c.name))}`,
  }));
  const heresies = readJson("theology/church-history-heresies.json").heresies.map((h) => ({
    title: str(h.name),
    // The entry's own first line states the heresy's claim in its own voice;
    // alone under a search result it would read as the site's teaching.
    blurb: `A teaching the church answered and rejected, ${str(h.era)}.`,
    facet: "False teachings",
    keywords: "heresy heresies",
    href: `/theology/history#${entryId("heresy", str(h.name))}`,
  }));
  return [...people, ...councils, ...heresies];
}

/** The daily sets (Thanksgiving, Advent, Holy Week): each day opens on its own. */
const SEASONS = [
  { key: "thanksgiving", param: "thanksgiving", name: "Thanksgiving", words: "thanksgiving gratitude" },
  { key: "advent", param: "advent", name: "Advent", words: "advent christmas" },
  { key: "holyWeek", param: "holy-week", name: "Holy Week", words: "holy week easter palm sunday good friday" },
];

function seasonal() {
  const sets = readJson("family-seasonal.json");
  return SEASONS.flatMap((s) =>
    (sets[s.key] ?? []).map((d) => ({
      title: str(d.title),
      blurb: clip(d.reflection),
      facet: s.name,
      keywords: `${str(d.passage)} ${s.words} family devotion`,
      href: `/family/devotions?tab=${s.param}&day=${d.day}`,
    }))
  );
}

function devotions() {
  // Every strand the family index reads, and only while it is live: a held-back
  // strand (U11) has no page, so it has no result either.
  const weekly = STRANDS.flatMap((s) => s.files)
    .filter((f) => fs.existsSync(path.join(PUB, f)))
    .flatMap((f) => {
      const { live, devotions: list } = devotionsIn(readJson(f));
      return live ? list : [];
    });
  return weekly.map((d) => ({
    title: str(d.title),
    blurb: clip(d.bigIdea),
    facet: str(d.theme),
    keywords: str(d.passage),
    href: devotionHref(d.id),
  }));
}

function catechism() {
  return readJson("family-catechism.json").map((q) => ({
    title: str(q.question),
    blurb: clip(q.answer || q.kidsAnswer),
    facet: str(q.part),
    keywords: str(q.scripture),
    href: "/family/catechism",
  }));
}

function nation() {
  return fs
    .readdirSync(path.join(PUB, "nation"))
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => readJson(`nation/${f}`))
    // The scorecard and the policy page are tools, and the tools are searched from the /tools registry.
    .filter((n) => str(n.slug) && str(n.title))
    .map((n) => ({ title: str(n.title), blurb: clip(n.subtitle), href: `/nation/${n.slug}` }));
}

/** The index, sources in the order a tie between them should fall. */
export function buildSearchIndex() {
  const drop = (e) => Object.fromEntries(Object.entries(e).filter(([, v]) => v !== ""));
  // One result per question per page: the catechism asks five of its questions
  // twice (once in their part, again in the last), and both open the same page.
  const once = (e, i, all) => all.findIndex((x) => x.title === e.title && x.href === e.href) === i;
  const source = (label, indexHref, entries) => ({ label, indexHref, entries: entries.filter((e) => e.title).filter(once).map(drop) });
  return {
    sources: [
      source("Main Pages", "/", mainPages()),
      source("Honest Answers", "/answers", answers()),
      source("Christ and the Nation", "/nation", nation()),
      source("The Study Bible", "/study/bible", studyBible()),
      source("Doctrine", "/study/bible/doctrines", doctrines()),
      source("Compare the Views", "/theology/compare", debatedDoctrines()),
      source("Church History", "/theology/history", history()),
      source("Family Devotions", "/family/devotions", [...devotions(), ...seasonal()]),
      source("Family Catechism", "/family/catechism", catechism()),
      source("What the Bible Says", "/wisdom", wisdom()),
    ],
  };
}

export function renderSearchIndex(index = buildSearchIndex()) {
  return `${JSON.stringify(index)}\n`;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const out = path.join(ROOT, OUT);
  const index = buildSearchIndex();
  const text = renderSearchIndex(index);
  const count = index.sources.reduce((n, s) => n + s.entries.length, 0);
  if (process.argv.includes("--check")) {
    const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
    if (current !== text) {
      console.error(`[search-index] ${OUT} is stale. Run: pnpm run search:index`);
      process.exit(1);
    }
    console.log(`[search-index] up to date (${count} entries)`);
  } else {
    fs.writeFileSync(out, text);
    console.log(`[search-index] wrote ${count} entries (${(text.length / 1024).toFixed(1)} KB) to ${OUT}`);
  }
}
