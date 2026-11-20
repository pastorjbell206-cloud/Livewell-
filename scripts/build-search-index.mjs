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
 *   Wisdom in depth      client/public/wisdom/deep/<id>.json   -> /wisdom/<id>#misread, #whole, #differ
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
import { loadQuestions } from "./lib/questions.mjs";

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

/**
 * The deep sections of a topic written in full (wisdom/deep/<id>.json), each
 * opening at its own section of /wisdom/<id>: the often-misread verses (found
 * by the saying people quote, such as "spare the rod"), what the whole Bible
 * says, and where Christians differ. A topic not yet written in full adds
 * nothing.
 */
function wisdomDeep() {
  const dir = path.join(PUB, "wisdom/deep");
  if (!fs.existsSync(dir)) return [];
  const labels = new Map(readJson("wisdom/topics.json").topics.map((t) => [t.id, str(t.label)]));
  const sayings = (s) => [...str(s).matchAll(/“([^”]+)”/g)].map((m) => m[1]);
  const many = (n, one, more) => (n > 1 ? more : one);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .flatMap((f) => {
      const d = readJson(`wisdom/deep/${f}`);
      const label = labels.get(d.id);
      if (!label) return [];
      const href = `/wisdom/${d.id}`;
      const out = [];
      const misread = d.misread ?? [];
      if (misread.length) {
        const refs = misread.map((m) => str(m.ref));
        const n = refs.length;
        out.push({
          title: `${label}: often misread`,
          blurb: `${refs.join("; ")}: how ${many(n, "it is", "they are")} often taken, and what ${many(n, "it says", "they say")} where ${many(n, "it stands", "they stand")}.`,
          facet: "Often misread",
          keywords: `misread misused verse out of context ${refs.join(" ")} ${misread.flatMap((m) => sayings(m.taken)).join(" ")}`.trim(),
          href: `${href}#misread`,
        });
      }
      out.push({
        title: `${label}: what the whole Bible says`,
        blurb: clip((d.whole ?? [])[0]),
        facet: "The whole Bible",
        keywords: `what does the bible say ${(d.passages ?? []).map((p) => str(p.ref)).join(" ")}`,
        href: `${href}#whole`,
      });
      if (d.differ) {
        out.push({
          title: `${label}: where Christians differ`,
          blurb: clip(d.differ.share),
          facet: "Where Christians differ",
          keywords: `christians disagree views denominations ${(d.differ.views ?? []).map((v) => str(v.name)).join(" ")}`,
          href: `${href}#differ`,
        });
      }
      return out;
    });
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

/** The questions library's live pieces (scripts/lib/questions.mjs); a pending piece is never searched. */
function questions() {
  return loadQuestions(ROOT).areas.flatMap((a) =>
    a.pieces.filter((p) => p.live).map((p) => ({
      title: str(p.question),
      blurb: clip(p.shortAnswer),
      keywords: `${str(a.title)} ${(p.claims || []).map((c) => str(c.claim)).join(" ")}`.trim(),
      href: `/questions/${a.slug}/${p.slug}`,
    }))
  );
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
  { title: "Bible Explorer", href: "/study/explorer", blurb: "The whole Bible as one story on one illustrated map, for ages 7 to 16.", keywords: "kids children teens youth young people bible map pictures story of the bible for kids teenagers illustrated explorer" },
  { title: "Paul's travels", href: "/study/explorer/pauls-travels", blurb: "A map of Acts that draws itself: Paul's three trips and the voyage to Rome, place by place, and the churches he wrote to.", keywords: "paul apostle missionary trips map acts travels voyage rome shipwreck malta churches planted letters galatia philippi corinth ephesus kids teens explorer" },
  { title: "Abraham's road", href: "/study/explorer/abrahams-road", blurb: "A map of Genesis that draws itself: Abraham from Ur to Haran and into Canaan, down to Egypt and back, Hebron, Beersheba and the land of Moriah.", keywords: "abraham abram map genesis ur haran canaan egypt bethel shechem hebron beersheba moriah isaac patriarchs kids teens explorer" },
  { title: "Watch and learn", href: "/study/explorer#watch", blurb: "Short moving pictures for ages 7 to 16: the whole Bible's story, big ideas, what we believe, and good questions.", keywords: "kids children teens video animation animated explainer moving pictures films watch bible explorer" },
  { title: "The whole Bible in two minutes", href: "/study/explorer/watch/bible-two-minutes", blurb: "The whole story of the Bible, from creation to the new creation, drawn as one road in nine pictures.", keywords: "kids children teens bible overview summary story animation video watch explorer" },
  { title: "The Holy Spirit through the Bible", href: "/study/explorer/watch/holy-spirit", blurb: "The Holy Spirit from the first page of the Bible to the last, in eight moving pictures.", keywords: "kids children teens holy spirit pentecost dove animation video watch explorer" },
  { title: "God with his people", href: "/study/explorer/watch/god-with-his-people", blurb: "One light followed from the garden to the tent, the temple, Jesus, the church and the city, in nine moving pictures.", keywords: "kids children teens tabernacle temple presence glory dwelling god with us animation video watch explorer" },
  { title: "Who God is: Father, Son and Holy Spirit", href: "/study/explorer/watch/who-god-is", blurb: "One God in three persons, in eight moving pictures, and why the usual pictures break.", keywords: "kids children teens trinity three in one father son holy spirit animation video watch explorer" },
  { title: "Why did Jesus die?", href: "/study/explorer/watch/why-jesus-died", blurb: "What happened at the cross, and the Bible's own pictures of what it did, in eight moving pictures.", keywords: "kids children teens cross atonement passover lamb ransom forgiveness animation video watch explorer" },
  { title: "How salvation works", href: "/study/explorer/watch/how-salvation-works", blurb: "The good news of Jesus in nine moving pictures: grace, faith and new life.", keywords: "kids children teens gospel saved salvation grace faith forgiveness animation video watch explorer" },
  { title: "The Bible in a minute", href: "/study/explorer/watch/bible-in-a-minute", blurb: "The whole Bible as one story, short enough to share, in eight moving pictures along one road.", keywords: "bible overview summary story short video share facebook minute animation watch explorer" },
  { title: "The gospel in a minute", href: "/study/explorer/watch/gospel-in-a-minute", blurb: "The good news of Jesus in seven moving pictures, short enough to share.", keywords: "gospel good news saved salvation grace faith short video share facebook minute animation watch explorer" },
  { title: "Does God exist?", href: "/study/explorer/watch/does-god-exist", blurb: "Why is there anything at all? The argument from contingency in six moving pictures: what it shows, and what it does not.", keywords: "does god exist is god real proof evidence contingency something rather than nothing video animation watch explorer" },
  { title: "Who made God?", href: "/study/explorer/watch/who-made-god", blurb: "A child's honest question, taken seriously in six moving pictures.", keywords: "kids children teens who made god where did god come from eternal animation video watch explorer" },
  { title: "How the 66 books fit together", href: "/study/explorer/watch/sixty-six-books", blurb: "The Bible as a library of sixty-six books, sorting itself onto its shelves in seven moving pictures.", keywords: "kids children teens books of the bible library old testament new testament law history poetry prophets gospels letters animation video watch explorer" },
  { title: "What the church is", href: "/study/explorer/watch/the-church", blurb: "The church as people, one body, living stones and a family, gathered and sent, in seven moving pictures.", keywords: "kids children teens church body of christ living stones fellowship baptism animation video watch explorer" },
  { title: "Did Jesus really come back to life?", href: "/study/explorer/watch/did-jesus-come-back-to-life", blurb: "The case for the resurrection, told honestly for young readers in seven moving pictures.", keywords: "kids children teens resurrection easter empty tomb rose from the dead is it true evidence animation video watch explorer" },
  { title: "Why do bad things happen?", href: "/study/explorer/watch/why-bad-things-happen", blurb: "An honest answer about pain and suffering for young readers, in eight moving pictures.", keywords: "kids children teens suffering pain evil why does god allow bad things sad grief animation video watch explorer" },
  { title: "Is the Bible true?", href: "/study/explorer/watch/is-the-bible-true", blurb: "How the Bible was copied, what can be checked, and what that proves, in eight moving pictures.", keywords: "kids children teens can we trust the bible manuscripts copies dead sea scrolls reliable evidence animation video watch explorer" },
  { title: "The Holy Spirit in a believer", href: "/study/explorer/watch/spirit-in-a-believer", blurb: "What the Holy Spirit does in everyone who belongs to Jesus, in seven moving pictures.", keywords: "kids children teens holy spirit fruit of the spirit gifts vine branches adoption prayer animation video watch explorer" },
  { title: "Creation and the image of God", href: "/study/explorer/watch/image-of-god", blurb: "God made everything out of nothing, and every person in his image, in seven moving pictures.", keywords: "kids children teens creation image of god made in gods image human worth dignity genesis animation video watch explorer" },
  { title: "What sin is", href: "/study/explorer/watch/what-sin-is", blurb: "What sin is, what it breaks, and the God who comes looking, in six moving pictures.", keywords: "kids children teens sin fall wrong forgiveness guilt sorry genesis 3 animation video watch explorer" },
  { title: "Who Jesus is", href: "/study/explorer/watch/who-jesus-is", blurb: "Jesus, fully God and fully man in one person, in seven moving pictures.", keywords: "kids children teens who is jesus son of god incarnation fully god fully man christmas word became flesh animation video watch explorer" },
  { title: "Prayer", href: "/study/explorer/watch/prayer", blurb: "What prayer is, and what to do when an answer is slow, in seven moving pictures.", keywords: "kids children teens prayer how to pray lords prayer our father unanswered prayer thank you sorry animation video watch explorer" },
  { title: "Baptism and the Lord's Supper", href: "/study/explorer/watch/baptism-and-supper", blurb: "What every church shares in baptism and the Lord's Supper, and where churches differ, in seven moving pictures.", keywords: "kids children teens baptism lords supper communion eucharist bread cup sacraments ordinances infant baptism animation video watch explorer" },
  { title: "The life to come", href: "/study/explorer/watch/life-to-come", blurb: "What Christians believe about dying, the resurrection and a world made new, in seven gentle moving pictures.", keywords: "kids children teens death dying heaven resurrection new creation grief life after death animation video watch explorer" },
  { title: "Why are there so many churches?", href: "/study/explorer/watch/so-many-churches", blurb: "How one church became many, and the root they still share, in seven moving pictures.", keywords: "kids children teens denominations catholic orthodox protestant reformation 1054 1517 church history animation video watch explorer" },
  { title: "The resurrection", href: "/study/explorer/watch/the-resurrection", blurb: "What Christians believe happened on the third day, and what it means, in seven moving pictures.", keywords: "kids children teens resurrection easter empty tomb risen jesus firstfruits body raised animation video watch explorer" },
  { title: "The Bible: how we got it", href: "/study/explorer/watch/the-bible", blurb: "Many writers, scrolls copied by hand, the first books and translation, in seven moving pictures.", keywords: "kids children teens how we got the bible who wrote the bible scrolls manuscripts copies canon translation codex animation video watch explorer" },
  { title: "The king", href: "/study/explorer/watch/the-king", blurb: "From the shepherd king and the promise to David to Jesus and the kingdom of God, in seven moving pictures.", keywords: "kids children teens king david messiah son of david kingdom of god throne crown palm sunday animation video watch explorer" },
  { title: "Does God still love me when I do wrong?", href: "/study/explorer/watch/love-when-i-do-wrong", blurb: "Jesus' story of the lost son, and the father who ran, in seven moving pictures.", keywords: "kids children teens does god still love me sin guilt forgiveness prodigal son lost son grace sorry animation video watch explorer" },
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
  { title: "The Wisdom Books Explorer", href: "/tools/wisdom-books", blurb: "Every verse of Proverbs gathered under twenty themes, of Ecclesiastes under sixteen and of the Letter of James under thirteen, a chapter for each day of the month, and the Study Bible's notes beside each chapter.", keywords: "proverbs by theme topic a chapter a day proverbs 31 days wisdom literature sayings fool sluggard tongue ecclesiastes vanity meaningless hevel teacher under the sun james faith and works faith without deeds trials tongue" },
  { title: "Pray the Psalms", href: "/tools/pray-the-psalms", blurb: "Find a psalm for how you are today, for morning and evening, or from all 150, and pray it slowly, with a guide drawn from the Study Bible's notes.", keywords: "psalms prayer pray a psalm lament praise thanksgiving psalm for anxiety grief fear sleepless morning evening prayer psalm a day psalter" },
  { title: "Eight-week plans", href: "/plans", blurb: "Plans that take one need a week at a time for eight weeks.", keywords: "plan plans weekly 8 week" },
  { title: "Self-checks", href: "/assessments", blurb: "Every self-check on the site in one place.", keywords: "assessment assessments quiz test inventory self-checks self checks" },
  { title: "Tools and resources", href: "/tools", blurb: "Every tool on the site, in one list.", keywords: "tools planners builders generators" },
  { title: "How-to guides", href: "/how-tos", blurb: "Step-by-step guides for the practices of the Christian life.", keywords: "how to guide guides practical steps" },
  { title: "Downloads and PDFs", href: "/downloads", blurb: "Everything on the site that can be printed or saved.", keywords: "download pdf print printable booklet ebook ebooks epub free books" },
  { title: "All resources", href: "/resources", blurb: "Everything to use, on one page.", keywords: "resources library everything" },
  { title: "Find Help", href: "/help", blurb: "Help for a hard season, starting from what you are facing.", keywords: "help hard season struggling care support" },
  { title: "For families", href: "/family", blurb: "Tonight's devotion, a year of devotions, the catechism, and family reading plans.", keywords: "family devotions kids children parents parenting home household" },
  { title: "Tonight's family devotion", href: "/family/tonight", blurb: "The devotion for tonight, ready to read at the table.", keywords: "family devotions tonight at the table kids children dinner" },
  { title: "A year of family devotions", href: "/family/devotions", blurb: "Every family devotion, week by week, with the sets for Thanksgiving, Advent and Holy Week.", keywords: "family devotions list weekly advent christmas thanksgiving holy week easter kids children" },
  { title: "The family catechism", href: "/family/catechism", blurb: "Questions and answers for teaching the faith at home.", keywords: "catechism questions answers kids children memorize teach" },
  { title: "Family reading plans", href: "/family/reading-plans", blurb: "Plans for reading the Bible together as a family.", keywords: "family bible reading plan kids children" },
  { title: "Essays", href: "/writing", blurb: "The essays of James Bell.", keywords: "essays articles writing blog posts james bell" },
  { title: "Books", href: "/books", blurb: "The books of James Bell.", keywords: "books author james bell book ebook free download" },
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

/** Words a reader might search for, by the guides' group a world portrait belongs to. */
const WORLD_KEYWORDS = {
  "Second Temple Judaism": "world of jesus first century",
  "Ancient Near East": "old testament ancient near east israel judah assyria babylon exile",
  "The Greco-Roman World": "roman empire rome paul acts letters caesar emperor citizenship slavery corinth ephesus philippi",
  "Honor, Shame, and Culture": "honor shame honour disgrace culture patronage gift grace gratitude kinship brothers family hospitality envy evil eye limited good women cross",
};

/** The world portraits (/resources/context/world/:id), from the index build-context-index.mjs writes. */
function worlds() {
  return (readJson("context/worlds-index.json").worlds ?? []).map((w) => ({
    title: str(w.title),
    blurb: clip(w.blurb),
    href: `/resources/context/world/${w.id}`,
    keywords: `what was it like daily life background culture ${WORLD_KEYWORDS[w.group] ?? ""}`.trim(),
  }));
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
      source("Main Pages", "/", [...mainPages(), ...worlds()]),
      source("Honest Answers", "/answers", answers()),
      // Only once a piece is live, so a pending library leaves the index as it was.
      ...(questions().length ? [source("The case for the faith", "/questions", questions())] : []),
      source("Christ and the Nation", "/nation", nation()),
      source("The Study Bible", "/study/bible", studyBible()),
      source("Doctrine", "/study/bible/doctrines", doctrines()),
      source("Compare the Views", "/theology/compare", debatedDoctrines()),
      source("Church History", "/theology/history", history()),
      source("Family Devotions", "/family/devotions", [...devotions(), ...seasonal()]),
      source("Family Catechism", "/family/catechism", catechism()),
      source("What the Bible Says", "/wisdom", [...wisdom(), ...wisdomDeep()]),
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
