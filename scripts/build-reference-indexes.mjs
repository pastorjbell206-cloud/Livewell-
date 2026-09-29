#!/usr/bin/env node
/**
 * build-reference-indexes.mjs — the site's two back-of-the-book indexes, the
 * way a good commentary keeps a Scripture index and an index of authors.
 *
 *   node scripts/build-reference-indexes.mjs
 *
 * Reads only data already in the repo:
 *   essays     content/static-library.generated.json bodies, filtered exactly
 *              as the Library filters them (unpublished, taken down, hidden,
 *              moved to PCN, merged into a rewrite, or redirected away: out)
 *   doctrines  client/public/theology/<slug>.json (the slugs in index.json)
 *   guides     client/public/studyguides/<slug>.json (the slugs in index.json)
 *   history    client/public/history/essays/<slug>.json (essays-index.json)
 *   arguments  client/src/data/argumentCases.ts (read as text: published cases)
 *
 * Writes client/public/indexes/:
 *   scripture-index.json   book → chapter → [{ title, url, kind, verses }]
 *                          (when the whole index would pass ~1.5 MB, this file
 *                          keeps the per-book counts and each book's chapters
 *                          go to scripture/<book>.json instead)
 *   scholar-index.json     every named witness the site cites, the works cited,
 *                          where each work is cited, and where the person is
 *                          discussed in the prose
 *   manifest.json          counts and sizes
 *
 * The scholar list is an allow-list built from the site's own citations: the
 * `sources:` front matter of content/rewrites/*.md, doctrine furtherReading,
 * study-guide bibliographies, history-essay sources, and "Works Cited" sections
 * in essay bodies. Nobody is indexed who is not cited somewhere by name.
 *
 * The output is deterministic (no timestamps), so an unchanged corpus
 * rebuilds to identical files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { redirectedEssaySlugs } from "./redirected-essays.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..");
const PUB = path.join(ROOT, "client/public");
const OUT = path.join(PUB, "indexes");
const SPLIT_THRESHOLD = 1.5 * 1024 * 1024;

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
const tryJson = (rel, fallback) => {
  try {
    return readJson(rel);
  } catch {
    return fallback;
  }
};

/** Kinds in the order a reader meets them; lists sort by this. */
export const KINDS = ["Essay", "Doctrine", "Study guide", "Church history", "Argument"];

// ── which essays are live ──────────────────────────────────────────────────

function parseSet(relFile, name) {
  try {
    const src = fs.readFileSync(path.join(ROOT, relFile), "utf8");
    const m = src.match(new RegExp(`${name} = new Set<string>\\(\\[([\\s\\S]*?)\\]\\)`));
    if (!m) return new Set();
    return new Set([...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]));
  } catch {
    return new Set();
  }
}

/** The same filter scripts/build-catalogue.mjs applies to the static library. */
export function liveEssays() {
  const rows = tryJson("content/static-library.generated.json", []);
  const out = new Set([
    ...parseSet("api/index.ts", "TAKEN_DOWN"),
    ...parseSet("client/src/lib/hiddenSlugs.ts", "HIDDEN_SLUGS"),
    ...(tryJson("content/pcn-moved.json", {}).slugs ?? []),
    ...Object.keys(tryJson("content/rewrites.generated.json", {}).merged ?? {}),
    ...redirectedEssaySlugs(ROOT),
  ]);
  const seen = new Set();
  const live = [];
  for (const r of rows) {
    if (!r || !r.slug || !r.title || r.published === false || r.published === 0) continue;
    if (out.has(r.slug) || seen.has(r.slug)) continue;
    seen.add(r.slug);
    live.push(r);
  }
  return live;
}

// ── the documents ──────────────────────────────────────────────────────────

/** Every string inside a value, skipping the named keys (bibliographies). */
function strings(value, skip = new Set(), acc = []) {
  if (typeof value === "string") acc.push(value);
  else if (Array.isArray(value)) for (const v of value) strings(v, skip, acc);
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) if (!skip.has(k)) strings(v, skip, acc);
  return acc;
}

/**
 * One record per indexed page: { title, url, kind, text, citations }.
 * `text` is the prose (bibliographies removed); `citations` the raw
 * bibliography entries: { author, title, year }.
 */
export function loadDocuments() {
  const docs = [];

  // essays, with rewrite front-matter sources and in-body "Works Cited"
  const sourcesBySlug = rewriteSources();
  for (const e of liveEssays()) {
    const body = String(e.body ?? "");
    const cut = body.search(/^#{2,4}\s*Works Cited\s*$/im);
    const prose = cut >= 0 ? body.slice(0, cut) : body;
    const citations = [...(sourcesBySlug.get(e.slug) ?? []), ...(cut >= 0 ? worksCited(body.slice(cut)) : [])];
    docs.push({ title: e.title, url: `/writing/${e.slug}`, kind: "Essay", text: prose, citations });
  }

  // doctrines
  for (const d of tryJson("client/public/theology/index.json", { docs: [] }).docs ?? []) {
    const full = tryJson(`client/public/theology/${d.slug}.json`, null);
    if (!full) continue;
    docs.push({
      title: full.title ?? d.title,
      url: `/theology/doctrine/${d.slug}`,
      kind: "Doctrine",
      text: strings(full, new Set(["furtherReading", "slug"])).join("\n\n"),
      citations: (full.furtherReading ?? []).map((r) => ({ author: r?.author, title: r?.title })),
    });
  }

  // study guides
  for (const g of tryJson("client/public/studyguides/index.json", { guides: [] }).guides ?? []) {
    const full = tryJson(`client/public/studyguides/${g.slug}.json`, null);
    if (!full) continue;
    docs.push({
      title: full.title ?? g.title,
      url: `/studyguides/${g.slug}`,
      kind: "Study guide",
      text: strings(full, new Set(["bibliography", "furtherReading", "promoKit", "slug"])).join("\n\n"),
      citations: (full.bibliography ?? []).map((r) => ({ author: r?.author, title: r?.title })),
    });
  }

  // church-history essays
  for (const h of tryJson("client/public/history/essays-index.json", { essays: [] }).essays ?? []) {
    const full = tryJson(`client/public/history/essays/${h.slug}.json`, null);
    if (!full) continue;
    docs.push({
      title: full.title ?? h.title,
      url: `/theology/history/${h.slug}`,
      kind: "Church history",
      text: strings(full, new Set(["sources", "slug"])).join("\n\n"),
      citations: (full.sources ?? []).map((r) => ({ author: r?.author, title: r?.title })),
    });
  }

  // argument cases (a TypeScript data module with no imports; read as text)
  for (const c of argumentCases()) docs.push(c);

  return docs;
}

function argumentCases() {
  let src = "";
  try {
    src = fs.readFileSync(path.join(ROOT, "client/src/data/argumentCases.ts"), "utf8");
  } catch {
    return [];
  }
  const out = [];
  const blocks = src.split(/^const [A-Z_]+: ArgumentCase = \{/m).slice(1);
  for (const block of blocks) {
    const body = block.split(/^\};/m)[0];
    const slug = body.match(/^\s{2}slug:\s*"([^"]+)"/m)?.[1];
    const title = body.match(/^\s{2}title:\s*"([^"]+)"/m)?.[1];
    const published = /^\s{2}published:\s*true/m.test(body);
    if (!slug || !title || !published) continue;
    const text = [...body.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1].replace(/\\(.)/g, "$1")).join("\n\n");
    out.push({ title, url: `/tools/test-the-case?case=${slug}`, kind: "Argument", text, citations: [] });
  }
  return out;
}

/** content/rewrites/*.md → slug → [{ author, title, year }] from `sources:`. */
function rewriteSources() {
  const dir = path.join(ROOT, "content/rewrites");
  const out = new Map();
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return out;
  }
  for (const f of files.sort()) {
    const src = fs.readFileSync(path.join(dir, f), "utf8");
    const fm = src.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const slug = fm[1].match(/^slug:\s*"?([^"\n]+)"?\s*$/m)?.[1]?.trim() ?? f.replace(/\.md$/, "");
    const block = fm[1].match(/^sources:\s*\n((?:\s+-\s.*\n?)+)/m);
    if (!block) continue;
    const list = block[1]
      .split("\n")
      .map((l) => l.replace(/^\s+-\s+/, "").trim().replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"'))
      .filter(Boolean)
      .map(parseSourceLine)
      .filter(Boolean);
    out.set(slug, list);
  }
  return out;
}

/** "Author, Title (Year)" → { author, title, year }. */
export function parseSourceLine(line) {
  const m = String(line).match(/^(.+?),\s+(.+?)(?:\s+\(([^()]*(?:\([^()]*\)[^()]*)*)\))?\s*$/);
  if (!m) return null;
  let author = m[1];
  let title = m[2];
  // Co-authors listed with commas: "Nora D. Volkow, George F. Koob and A. Thomas McLellan, Title"
  const parts = title.split(/,\s+/);
  while (parts.length > 1 && /\band\b|&/.test(parts[0]) && personList(parts[0]).length > 0) {
    author += `, ${parts.shift()}`;
  }
  title = parts.join(", ");
  const year = (m[3] ?? "").match(/\b(1[0-9]{3}|20[0-9]{2})\b/)?.[1];
  return { author, title, year };
}

/** Chicago lines under "### Works Cited": "Last, First. 1986. Title. Place: Publisher." */
function worksCited(section) {
  const out = [];
  for (const line of section.split("\n")) {
    const m = line.trim().match(/^([A-Z][^,.\n]{1,40}),\s+([^\n]{1,50}?)\.?\s+(\d{4})\.\s+(.+?)\.(?:\s|$)/);
    if (!m) continue;
    out.push({ author: `${m[2].replace(/\.$/, "")} ${m[1]}`, title: m[4], year: m[3] });
  }
  return out;
}

// ── Scripture ──────────────────────────────────────────────────────────────

const BOOKS = tryJson("client/public/bible/books.json", []);
const BOOK_BY_SLUG = new Map(BOOKS.map((b) => [b.slug, b]));

/**
 * Names and abbreviations → slug. `n` marks a numbered book (the prefix is
 * required and picks 1-, 2- or 3-). `strict` names are also people's names
 * (Mark, John, James, Job …), so they count only with chapter:verse.
 */
const ALIASES = [
  ["genesis", ["Genesis", "Gen"]],
  ["exodus", ["Exodus", "Exod", "Ex"]],
  ["leviticus", ["Leviticus", "Lev"]],
  ["numbers", ["Numbers", "Num"], { strict: true }],
  ["deuteronomy", ["Deuteronomy", "Deut", "Dt"]],
  ["joshua", ["Joshua", "Josh"], { strict: true }],
  ["judges", ["Judges", "Judg"]],
  ["ruth", ["Ruth"], { strict: true }],
  ["samuel", ["Samuel", "Sam"], { n: true }],
  ["kings", ["Kings", "Kgs"], { n: true }],
  ["chronicles", ["Chronicles", "Chron", "Chr"], { n: true }],
  ["ezra", ["Ezra"], { strict: true }],
  ["nehemiah", ["Nehemiah", "Neh"]],
  ["esther", ["Esther", "Esth"], { strict: true }],
  ["job", ["Job"], { strict: true }],
  ["psalms", ["Psalms", "Psalm", "Pss", "Psa", "Ps"]],
  ["proverbs", ["Proverbs", "Prov"]],
  ["ecclesiastes", ["Ecclesiastes", "Eccles", "Eccl", "Qoheleth"]],
  ["song-of-solomon", ["Song of Solomon", "Song of Songs", "Canticles"]],
  ["isaiah", ["Isaiah", "Isa"]],
  ["jeremiah", ["Jeremiah", "Jer"]],
  ["lamentations", ["Lamentations", "Lam"]],
  ["ezekiel", ["Ezekiel", "Ezek"]],
  ["daniel", ["Daniel", "Dan"], { strict: true }],
  ["hosea", ["Hosea", "Hos"]],
  ["joel", ["Joel"], { strict: true }],
  ["amos", ["Amos"], { strict: true }],
  ["obadiah", ["Obadiah", "Obad"]],
  ["jonah", ["Jonah"], { strict: true }],
  ["micah", ["Micah", "Mic"], { strict: true }],
  ["nahum", ["Nahum", "Nah"]],
  ["habakkuk", ["Habakkuk", "Hab"]],
  ["zephaniah", ["Zephaniah", "Zeph"]],
  ["haggai", ["Haggai", "Hag"]],
  ["zechariah", ["Zechariah", "Zech"]],
  ["malachi", ["Malachi", "Mal"]],
  ["matthew", ["Matthew", "Matt", "Mt"], { strict: true }],
  ["mark", ["Mark", "Mk"], { strict: true }],
  ["luke", ["Luke", "Lk"], { strict: true }],
  ["john", ["John", "Jn"], { strict: true, n: "optional" }],
  ["acts", ["Acts"]],
  ["romans", ["Romans", "Rom"]],
  ["corinthians", ["Corinthians", "Cor"], { n: true }],
  ["galatians", ["Galatians", "Gal"]],
  ["ephesians", ["Ephesians", "Eph"]],
  ["philippians", ["Philippians", "Phil"]],
  ["colossians", ["Colossians", "Col"]],
  ["thessalonians", ["Thessalonians", "Thess", "Thes"], { n: true }],
  ["timothy", ["Timothy", "Tim"], { n: true }],
  ["titus", ["Titus", "Tit"], { strict: true }],
  ["philemon", ["Philemon", "Philem", "Phlm"]],
  ["hebrews", ["Hebrews", "Heb"]],
  ["james", ["James", "Jas"], { strict: true }],
  ["peter", ["Peter", "Pet"], { n: true }],
  ["jude", ["Jude"], { strict: true }],
  ["revelation", ["Revelation", "Revelations", "Rev"]],
];

const ALIAS_TO = new Map();
/** Alternate full names, not abbreviations: they need no period to count by chapter alone. */
const FULL_FORMS = new Set(["Psalm", "Revelations", "Song of Songs", "Canticles", "Qoheleth"]);
for (const [base, names, opts = {}] of ALIASES) for (const nm of names) ALIAS_TO.set(nm, { base, ...opts, abbrev: nm !== names[0] && !FULL_FORMS.has(nm) });

const ALIAS_ALT = [...ALIAS_TO.keys()]
  .sort((a, b) => b.length - a.length)
  .map((a) => a.replace(/ /g, "\\s+"))
  .join("|");

const DASH = "\\s?[-–—]\\s?";
/**
 * prefix? name .? chapter (:verse[ab]? (–(chapter:)?verse[ab]?)? | –chapter)?
 * Case-sensitive: book names are capitalized; "job" and "acts" in running
 * prose are words, not books.
 */
const REF_RE = new RegExp(
  `(?<![A-Za-z0-9])(?:(?<pre>[123]|First|Second|Third|1st|2nd|3rd|III|II|I)\\s?)?(?<name>${ALIAS_ALT})\\.?\\s+(?<ch>\\d{1,3})` +
    `(?:(?::|\\.(?=\\d))(?<v1>\\d{1,3})[ab]?(?:${DASH}(?:(?<ch2>\\d{1,3}):)?(?<v2>\\d{1,3})[ab]?)?|${DASH}(?<chEnd>\\d{1,3})(?![:\\d]))?` +
    `(?![\\d:])`,
  "g"
);
/** ", 28" / "; 12:2" / ", 30–32" after a reference, until the list ends. */
const CONT_RE = new RegExp(
  `\\s?(?<sep>[,;])\\s?(?:and\\s)?(?:(?<c>\\d{1,3}):)?(?<a>\\d{1,3})[ab]?(?:${DASH}(?:(?<c2>\\d{1,3}):)?(?<b>\\d{1,3})[ab]?)?` +
    `(?![\\d:])(?!\\s*(?:[A-Z][a-z]|percent|per cent|%|years?|times|million|billion|thousand|people|of\\b))`,
  "y"
);

/** What comes just before a book cited by chapter alone. */
const STRICT_CUE = /(?:\(|\[|\b(?:in|of|from|read|reads|reading|see|cf\.|and|to|at|with|through|preached|preach|opens?|closes?)\s|[,;]\s)$/;

const PRE_NUM = { 1: 1, 2: 2, 3: 3, First: 1, Second: 2, Third: 3, "1st": 1, "2nd": 2, "3rd": 3, I: 1, II: 2, III: 3 };

let VERSE_COUNTS = null;
/** Verses in each chapter, read from the Study Bible's own text (/bible/ch). */
function verseCount(slug, chapter) {
  if (!VERSE_COUNTS) VERSE_COUNTS = new Map();
  const key = `${slug}/${chapter}`;
  if (!VERSE_COUNTS.has(key)) {
    let n = 176;
    try {
      const src = fs.readFileSync(path.join(PUB, "bible/ch", slug, `${chapter}.json`), "utf8");
      const all = [...src.matchAll(/"v":(\d+)/g)];
      if (all.length) n = Math.max(...all.map((m) => +m[1]));
    } catch {
      /* no chapter file: accept up to the longest chapter in the Bible */
    }
    VERSE_COUNTS.set(key, n);
  }
  return VERSE_COUNTS.get(key);
}

function resolveBook(pre, name) {
  const a = ALIAS_TO.get(name.replace(/\s+/g, " "));
  if (!a) return null;
  const num = pre ? PRE_NUM[pre] : undefined;
  if (a.n === true) {
    if (!num) return null;
    const slug = `${num}-${a.base}`;
    return BOOK_BY_SLUG.has(slug) ? { slug, a, usedPre: true } : null;
  }
  if (a.n === "optional" && num) {
    const slug = `${num}-${a.base}`;
    return BOOK_BY_SLUG.has(slug) ? { slug, a, usedPre: true } : null;
  }
  return BOOK_BY_SLUG.has(a.base) ? { slug: a.base, a, usedPre: false } : null;
}

const range = (a, b) => (b && b !== a ? `${a}–${b}` : `${a}`);

/**
 * Every Scripture reference in a text, as { slug, chapter, verses } where
 * `verses` is "18–25", "28", or null for the whole chapter.
 */
export function extractScripture(text) {
  const out = [];
  const push = (slug, chapter, verses) => {
    const book = BOOK_BY_SLUG.get(slug);
    if (!book || !Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) return false;
    if (verses) {
      const [lo, hi] = verses.split("–").map(Number);
      const max = verseCount(slug, chapter);
      if (lo < 1 || lo > max || (hi !== undefined && (hi < lo || hi > max))) return false;
    }
    out.push({ slug, chapter, verses });
    return true;
  };

  REF_RE.lastIndex = 0;
  let m;
  while ((m = REF_RE.exec(text))) {
    const g = m.groups;
    const book = resolveBook(g.pre, g.name);
    if (!book) continue;
    // A one-letter abbreviation needs its period or a verse ("Ex 3:14" yes, "Ex 3" no).
    const hasVerse = g.v1 !== undefined;
    // "Mark", "John", "Job" are also names and words: without a verse they
    // count only where the sentence is plainly citing a book ("in John 17",
    // "(Job 38–41)", "Exodus 3, Numbers 14").
    if (book.a.strict && !hasVerse && !g.chEnd && !STRICT_CUE.test(text.slice(Math.max(0, m.index - 14), m.index)) && !/^\s*\)/.test(text.slice(REF_RE.lastIndex, REF_RE.lastIndex + 3))) continue;
    if (book.a.strict && !hasVerse && /^\s+(?:years?|percent|per cent|times|people|of\b|%)/.test(text.slice(REF_RE.lastIndex, REF_RE.lastIndex + 12))) continue;
    if (book.a.abbrev && !hasVerse && !/\.\s/.test(m[0])) continue;
    if (g.pre && !book.usedPre && /^(?:I|II|III)$/.test(g.pre)) continue; // "I Mark 3:1" is not a book
    const ch = +g.ch;
    let ok;
    let curCh = ch;
    let verseContext = hasVerse;
    if (!hasVerse && BOOK_BY_SLUG.get(book.slug).chapters === 1) {
      // One-chapter books cite by verse: "Philemon 16", "Jude 3–4".
      ok = push(book.slug, 1, range(ch, g.chEnd ? +g.chEnd : undefined));
      curCh = 1;
      verseContext = true;
    } else if (hasVerse) {
      if (g.ch2 && +g.ch2 !== ch) {
        // across chapters: Romans 7:14–8:4
        ok = push(book.slug, ch, `${g.v1}`);
        if (ok) {
          out[out.length - 1].verses = `${g.v1}–${verseCount(book.slug, ch)}`;
          if (+g.ch2 > ch && +g.ch2 - ch <= 3) {
            for (let c = ch + 1; c < +g.ch2; c++) push(book.slug, c, null);
            push(book.slug, +g.ch2, range(1, +g.v2));
          }
        }
        curCh = +g.ch2;
      } else {
        ok = push(book.slug, ch, range(+g.v1, g.v2 ? +g.v2 : undefined));
      }
    } else if (g.chEnd) {
      const end = +g.chEnd;
      if (end <= ch) continue;
      // Romans 9–11 lists under each chapter; a long span (Genesis 1–50) under its first.
      ok = push(book.slug, ch, null);
      if (ok) {
        const label = `${ch}–${end}`;
        out[out.length - 1].span = label;
        if (end - ch <= 11) for (let c = ch + 1; c <= end; c++) if (push(book.slug, c, null)) out[out.length - 1].span = label;
      }
      curCh = end;
    } else {
      ok = push(book.slug, ch, null);
    }
    if (!ok) continue;

    // continuation: "Romans 8:18–25, 28; 12:1–2"
    CONT_RE.lastIndex = REF_RE.lastIndex;
    let c;
    while ((c = CONT_RE.exec(text))) {
      const cg = c.groups;
      if (cg.c) {
        curCh = +cg.c;
        verseContext = true;
        if (cg.c2 && +cg.c2 !== curCh) {
          push(book.slug, curCh, `${cg.a}`);
          curCh = +cg.c2;
          push(book.slug, curCh, range(1, +cg.b));
        } else push(book.slug, curCh, range(+cg.a, cg.b ? +cg.b : undefined));
      } else if (cg.sep === ";") {
        break; // "; 8" alone is too ambiguous to guess at
      } else if (verseContext) {
        push(book.slug, curCh, range(+cg.a, cg.b ? +cg.b : undefined));
      } else {
        // "Psalm 23, 91": a list of chapters
        curCh = +cg.a;
        push(book.slug, curCh, null);
      }
      REF_RE.lastIndex = CONT_RE.lastIndex;
    }
  }
  return out;
}

/** ["38", "39", "1–4", "2"] → ["1–4", "38–39"]: overlapping and adjacent verses fold into ranges. */
export function mergeVerses(list) {
  const spans = list
    .map((v) => v.split("–").map(Number))
    .map(([a, b]) => [a, b ?? a])
    .sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  const out = [];
  for (const [a, b] of spans) {
    const last = out[out.length - 1];
    if (last && a <= last[1] + 1) last[1] = Math.max(last[1], b);
    else out.push([a, b]);
  }
  return out.map(([a, b]) => range(a, b));
}

export function buildScriptureIndex(docs) {
  // slug → chapter → url → entry
  const tree = new Map();
  let references = 0;
  for (const d of docs) {
    for (const r of extractScripture(d.text)) {
      references++;
      if (!tree.has(r.slug)) tree.set(r.slug, new Map());
      const chapters = tree.get(r.slug);
      if (!chapters.has(r.chapter)) chapters.set(r.chapter, new Map());
      const byUrl = chapters.get(r.chapter);
      if (!byUrl.has(d.url)) byUrl.set(d.url, { title: d.title, url: d.url, kind: d.kind, verses: new Set(), span: null });
      const e = byUrl.get(d.url);
      if (r.verses) e.verses.add(r.verses);
      if (r.span && !e.span) e.span = r.span;
    }
  }
  const books = [];
  let passages = 0;
  for (const b of BOOKS) {
    const chapters = tree.get(b.slug);
    const out = {};
    let count = 0;
    let places = new Set();
    if (chapters) {
      for (const ch of [...chapters.keys()].sort((x, y) => x - y)) {
        const list = [...chapters.get(ch).values()]
          .map((e) => {
            const verses = mergeVerses([...e.verses]);
            const entry = { title: e.title, url: e.url, kind: e.kind, verses };
            if (!verses.length && e.span) entry.span = e.span;
            passages += Math.max(verses.length, 1);
            places.add(e.url);
            return entry;
          })
          .sort((x, y) => KINDS.indexOf(x.kind) - KINDS.indexOf(y.kind) || x.title.localeCompare(y.title) || x.url.localeCompare(y.url));
        out[ch] = list;
        count += list.length;
      }
    }
    books.push({ slug: b.slug, name: b.name, testament: b.testament, chapterCount: b.chapters, count, places: places.size, chapters: out });
  }
  return { books, references, passages };
}

// ── named witnesses ────────────────────────────────────────────────────────

const PARTICLES = new Set(["of", "de", "del", "della", "der", "den", "van", "von", "the", "da", "du", "la", "le", "ibn", "bin", "al", "y", "St.", "Saint"]);
const SUFFIXES = new Set(["Jr.", "Sr.", "Jr", "Sr", "II", "III", "IV"]);
/** Words that make a "name" an institution, a text, or an editorial role, not a person. */
const NOT_PERSON =
  /\b(?:Anonymous|Council|Centers?|Institute|Church|Churches|Association|Society|Survey|Research|Foundation|Bureau|Committee|Conference|Department|University|Press|Commission|Assembly|Synod|Group|Project|Office|Agency|Organization|Organisation|Congress|Court|Board|Ministries|Ministry|Network|Coalition|Alliance|Trust|Fund|Report|Census|Statistics|Health|Studies|Library|Museum|Service|Services|Council|Bible|Scripture|Translation|Version|Catechism|Confession|Creed|Various|Multiple|Others|Editors?|Trans|Translated|Edited|Collected|Works|Letters|Documents|Fathers|Council|Nations|States|Pew|Gallup|Barna|Lifeway|Vatican|Didache|Westminster|Heidelberg|Lausanne|Nicene|Chalcedon|America|American|Christianity|Christian|Today|Magazine|Journal|Times|Post|News|Review|Atlantic|Gospel|Coalition)\b/;

/** Common English words: a "name" made of them is a title fragment, not a person. */
const NOT_NAME_WORDS = new Set(
  (
    "The A An On Some Other Those First Public Life Moral Injury Nature Merits Spread True Problem Evil Survival Creation " +
    "Mission Digital Gap Between Rich Statistical Manual Mental Disorders Intervention Strategy Combat Trauma Historic " +
    "Forgiveness Sins Rising Gods Walk Free Destiny Man Correlates Emotional Dictionaries Counterpoints Chronicle Bank " +
    "World Corporation Convention Federation Fellowship International Solutions Statement Talmud Prayer Book Common " +
    "Councils Seminar Apostle Evangelist Preacher Varieties Atheism So-Called Historical Jesus Brethren Swiss Cruel " +
    "Lifespan Greater Incentivizes Practices Buying Intercourse Monitoring Centre Displacement Internal Danvers Rochester " +
    "Why What How When Where Who Is Are Was New Old Great Little Death Love Grace Faith Hope God Lord Christ Holy Spirit " +
    "Kingdom Heaven Hell History Theology Church Age Culture Modern Ancient Social Human Mind Body Soul Power Politics"
  ).split(" ")
);
const ROMAN = /^(?:[IVX]+)$/;

const FOLD = { ø: "o", Ø: "O", æ: "ae", Æ: "AE", ß: "ss", ł: "l", Ł: "L", đ: "d", Đ: "D", ı: "i" };
const stripDiacritics = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[øØæÆßłŁđĐı]/g, (c) => FOLD[c]);

/** "N.T. Wright" → "N. T. Wright"; trims roles and bracketed notes. */
function cleanName(raw) {
  return String(raw ?? "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(?:eds?|trans|ed|tr|comp)\.(?=\s|,|$)/gi, " ")
    .replace(/\b(?:edited|translated|compiled|introduced)\s+by\b.*$/i, " ")
    .replace(/\b(?:with|foreword by)\b.*$/i, " ")
    .replace(/([A-Z]\.)(?=[A-Z]\.)/g, "$1 ")
    .replace(/([A-Z]\.)(?=[A-Z][a-z])/g, "$1 ")
    .replace(/\s+/g, " ")
    .replace(/[\s,;.]+$/, (m) => (/\b(?:Jr|Sr)\.$/.test(m) ? m : ""))
    .trim()
    .replace(/,$/, "");
}

/** The person names inside an author string ("Anne Case and Angus Deaton"). */
export function personList(raw) {
  const s = cleanName(raw);
  if (!s) return [];
  return s
    .split(/\s*(?:,\s*and\s+|\band\b|&|;|,(?!\s*(?:Jr|Sr)\.?\b))\s*/)
    .map((p) => p.trim().replace(/^(?:and\s+)/, ""))
    .filter(Boolean)
    .map(fixSuffix)
    .filter(isPerson);
}

function fixSuffix(p) {
  return p.replace(/\s+(Jr|Sr)$/, " $1.");
}

const MONONYMS = new Set([
  "Augustine", "Athanasius", "Irenaeus", "Tertullian", "Origen", "Eusebius", "Anselm", "Boethius", "Plato",
  "Aristotle", "Josephus", "Tacitus", "Pliny", "Cicero", "Seneca", "Epictetus", "Lactantius", "Cyprian",
  "Ignatius", "Polycarp", "Chrysostom", "Jerome", "Ambrose", "Bede", "Dante", "Erasmus", "Voltaire", "Homer",
  "Suetonius", "Justinian", "Constantine", "Benedict", "Cassian", "Gregory", "Basil", "Hippolytus", "Novatian",
  "Julian", "Celsus", "Porphyry", "Plotinus", "Socrates", "Herodotus", "Thucydides", "Sophocles", "Virgil",
  "Aeschylus", "Euripides", "Ovid", "Marcion", "Arius", "Pelagius", "Maimonides", "Philo", "Lucian", "Galen",
  "Rumi", "Confucius", "Epicurus", "Lucretius", "Hesiod",
]);

function isPerson(p) {
  if (!p || p.length > 60 || /\d/.test(p) || NOT_PERSON.test(p)) return false;
  const toks = p.split(" ");
  if (toks.length === 1) return MONONYMS.has(toks[0]);
  if (toks.length > 6) return false;
  if (PARTICLES.has(toks[0]) || /^the$/i.test(toks[0])) return false;
  if (toks.some((t) => NOT_NAME_WORDS.has(t))) return false;
  let words = 0;
  for (const t of toks) {
    if (PARTICLES.has(t) || SUFFIXES.has(t) || ROMAN.test(t)) continue;
    if (/^[A-Z]\.$/.test(t)) continue;
    if (/^(?:Mc|Mac|O'|D'|De|Le|La)?[A-ZÀ-ÖØ-Þ][\p{L}'’\-]+$/u.test(t)) {
      words++;
      continue;
    }
    return false;
  }
  return words >= 1;
}

/** Known alternate forms of one person, folded to the form the site uses most. */
const ALIAS_NAMES = new Map([
  ["augustine of hippo", "augustine"],
  ["saint augustine", "augustine"],
  ["st. augustine", "augustine"],
  ["aurelius augustine", "augustine"],
  ["aquinas", "thomas aquinas"],
  ["st. thomas aquinas", "thomas aquinas"],
  ["tom wright", "n. t. wright"],
  ["athanasius of alexandria", "athanasius"],
  ["irenaeus of lyons", "irenaeus"],
  ["john chrysostom", "chrysostom"],
  ["gregory of nyssa", "gregory of nyssa"],
  ["benedict of nursia", "benedict of nursia"],
  ["eusebius of caesarea", "eusebius"],
  ["ignatius of antioch", "ignatius"],
  ["cyprian of carthage", "cyprian"],
  ["anselm of canterbury", "anselm"],
  ["justo l. gonzalez", "justo gonzalez"],
  ["martin luther king", "martin luther king jr."],
  ["marcus tullius cicero", "cicero"],
  ["desiderius erasmus", "erasmus"],
  ["flavius josephus", "josephus"],
  ["origen of alexandria", "origen"],
  ["irenaeus of lyon", "irenaeus"],
  ["charles h. spurgeon", "c. h. spurgeon"],
  ["charles haddon spurgeon", "c. h. spurgeon"],
  ["friedrich a. hayek", "f. a. hayek"],
  ["benjamin b. warfield", "b. b. warfield"],
  ["ron sider", "ronald j. sider"],
  ["brad wilcox", "w. bradford wilcox"],
  ["ulrich zwingli", "huldrych zwingli"],
  ["evagrius of pontus", "evagrius ponticus"],
  ["d. martyn lloyd-jones", "martyn lloyd-jones"],
  ["hendrikus berkhof", "hendrik berkhof"],
  ["scott mcknight", "scot mcknight"],
]);

/** A key that folds "Robert N. Bellah" and "Robert Bellah" together. */
function personKey(name) {
  let s = stripDiacritics(name).toLowerCase().replace(/’/g, "'");
  if (ALIAS_NAMES.has(s)) s = ALIAS_NAMES.get(s);
  const toks = s.split(" ").filter((t) => !SUFFIXES.has(t.replace(/^./, (c) => c.toUpperCase())) && t !== "jr." && t !== "sr.");
  if (toks.length <= 1) return toks.join(" ");
  // "Gregory of Nyssa", "Thomas à Kempis": keep particle names whole
  if (toks.some((t) => PARTICLES.has(t))) return toks.join(" ");
  return `${toks[0].replace(/\.$/, "")} ${toks[toks.length - 1]}`;
}

function surnameOf(name) {
  const toks = name.split(" ").filter((t) => !SUFFIXES.has(t) && !ROMAN.test(t));
  const i = toks.findIndex((t, j) => j > 0 && PARTICLES.has(t));
  if (i > 0 && /^(?:of|the)$/.test(toks[i])) return toks[0]; // "Gregory of Nyssa" → Gregory
  return toks[toks.length - 1];
}

/**
 * Surnames distinctive enough to count on their own in prose (Augustine,
 * Bonhoeffer). Common surnames (Wright, Lewis, Taylor, Smith, King) count
 * only with the full name, or in a page that cites the person.
 */
const DISTINCT_SURNAMES = new Set([
  "Augustine", "Aquinas", "Calvin", "Luther", "Bonhoeffer", "Kierkegaard", "Nietzsche", "Pascal", "Chesterton",
  "Barth", "Newbigin", "Brueggemann", "Hauerwas", "Bellah", "Haidt", "Athanasius", "Irenaeus", "Tertullian",
  "Origen", "Anselm", "Chrysostom", "Spurgeon", "Whitefield", "Tolkien", "Dostoevsky", "Solzhenitsyn", "Moltmann",
  "Pannenberg", "Bultmann", "Schleiermacher", "Kuyper", "Bavinck", "Tozer", "Stott", "Volf", "Wolterstorff",
  "MacIntyre", "Durkheim", "Tocqueville", "Putnam", "Freud", "Marx", "Weber", "Hume", "Kant", "Hegel",
  "Descartes", "Rousseau", "Hobbes", "Locke", "Dawkins", "Hitchens", "Camus", "Sartre", "Kahneman", "Twenge",
  "Turkle", "Postman", "Ellul", "Arendt", "Boethius", "Eusebius", "Josephus", "Tacitus", "Bauckham", "Hurtado",
  "Ehrman", "Brueggemann", "Heschel", "Niebuhr", "Rauschenbusch", "Wesley", "Edwards", "Zwingli", "Menno",
  "Erasmus", "Bernanos", "Merton", "Nouwen", "Willard", "Foster", "Plantinga", "Kinnaman", "Noll", "Marsden",
  "Wuthnow", "Berger", "Rieff", "Lasch", "Sayers", "Tolstoy", "Weil", "Heiser", "Wink", "Yoder", "Hays",
]);
/** Surnames shared by more than one indexed person here; never counted alone. */
const SHARED_SURNAME_GUARD = new Set(["Niebuhr", "Wesley", "Edwards", "Foster", "Plantinga", "Berger", "Hays"]);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function buildScholarIndex(docs) {
  // key → { forms: Map<name,count>, works: Map<titleKey,{titles,years,citedIn}> }
  const people = new Map();
  // "'Civil Religion in America,' Daedalus" and "Civil Religion in America" are one work
  const workKey = (t) => stripDiacritics(String(t).replace(/^['"“‘](.+?)[,.]?['"”’].*$/, "$1")).toLowerCase().split(/[:;]/)[0].replace(/^(?:the|a|an)\s+/, "").replace(/[^a-z0-9]+/g, " ").trim();
  const ref = (d) => ({ title: d.title, url: d.url, kind: d.kind });

  for (const d of docs) {
    for (const c of d.citations) {
      if (!c || !c.author || !c.title) continue;
      const title = String(c.title).replace(/\s+/g, " ").replace(/[.,;]+$/, "").trim();
      if (!title) continue;
      for (const name of personList(c.author)) {
        const key = personKey(name);
        if (!key) continue;
        if (!people.has(key)) people.set(key, { forms: new Map(), works: new Map(), citingUrls: new Set() });
        const p = people.get(key);
        p.forms.set(name, (p.forms.get(name) ?? 0) + 1);
        p.citingUrls.add(d.url);
        const wk = workKey(title);
        if (!wk) continue;
        if (!p.works.has(wk)) p.works.set(wk, { titles: new Map(), years: new Set(), citedIn: new Map() });
        const w = p.works.get(wk);
        w.titles.set(title, (w.titles.get(title) ?? 0) + 1);
        if (c.year) w.years.add(c.year);
        w.citedIn.set(d.url, ref(d));
      }
    }
  }

  // where each person is discussed in the prose
  const docWords = docs.map((d) => new Set(stripDiacritics(d.text).match(/[A-Z][\p{L}'’\-]+/gu) ?? []));
  const plain = docs.map((d) => stripDiacritics(d.text));
  const scholars = [];
  const byMost = (m) => [...m.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]))[0][0];

  for (const [key, p] of people) {
    const name = byMost(p.forms);
    const surname = stripDiacritics(surnameOf(name));
    const full = new Set();
    for (const f of p.forms.keys()) {
      const plainF = stripDiacritics(f);
      full.add(plainF);
      full.add(plainF.replace(/([A-Z]\.) (?=[A-Z]\.)/g, "$1")); // "C.S. Lewis"
      const toks = plainF.split(" ");
      if (toks.length > 2 && !toks.some((t) => PARTICLES.has(t))) full.add(`${toks[0]} ${toks[toks.length - 1]}`); // drop middle names
    }
    // A one-word form ("Julian") must not claim someone else's "Julian of Norwich".
    const alt = [...full].sort((a, b) => b.length - a.length).map((f) => (f.includes(" ") ? esc(f) : `${esc(f)}(?!\\s+of\\s)`));
    const fullRe = new RegExp(`(?<![\\p{L}])(?:${alt.join("|")})(?![\\p{L}])`, "u");
    const surRe = new RegExp(`(?<![\\p{L}])${esc(surname)}(?![\\p{L}])(?!\\s+of\\s)${surname === "Luther" ? "(?!\\s+King)" : ""}`, "u");
    const distinctive = DISTINCT_SURNAMES.has(surname) && !SHARED_SURNAME_GUARD.has(surname);
    const discussed = new Map();
    docs.forEach((d, i) => {
      if (!docWords[i].has(surname) && !docWords[i].has(name.split(" ")[0])) return;
      const hit =
        fullRe.test(plain[i]) || ((distinctive || p.citingUrls.has(d.url)) && docWords[i].has(surname) && surRe.test(plain[i]));
      if (hit) discussed.set(d.url, ref(d));
    });

    const works = [...p.works.values()]
      .map((w) => {
        const years = [...w.years].sort();
        const out = { title: byMost(w.titles) };
        if (years.length) out.year = years[0];
        out.citedIn = sortRefs([...w.citedIn.values()]);
        return out;
      })
      .sort((a, b) => (a.year ?? "9999").localeCompare(b.year ?? "9999") || a.title.localeCompare(b.title));

    scholars.push({
      name,
      sortKey: sortKeyOf(name),
      works,
      discussedIn: sortRefs([...discussed.values()]),
    });
    void key;
  }
  scholars.sort((a, b) => a.sortKey.localeCompare(b.sortKey) || a.name.localeCompare(b.name));
  return scholars;
}

function sortRefs(list) {
  return list.sort((x, y) => KINDS.indexOf(x.kind) - KINDS.indexOf(y.kind) || x.title.localeCompare(y.title) || x.url.localeCompare(y.url));
}

const PAPAL = new Set(["John", "Paul", "Pius", "Leo", "Innocent", "Alexander", "Boniface", "Gregory", "Benedict", "Clement", "Urban", "Sixtus"]);

/** "C. S. Lewis" → "lewis c s"; "Gregory of Nyssa" → "gregory of nyssa"; mononyms as they are. */
export function sortKeyOf(name) {
  const plainName = stripDiacritics(name).toLowerCase();
  const toks = name.split(" ").filter((t) => !SUFFIXES.has(t) && !ROMAN.test(t));
  if (toks.length === 1) return plainName;
  if (ROMAN.test(name.split(" ").pop()) && toks.every((t) => PAPAL.has(t))) return plainName; // "John Paul II"
  // "W. E. B. Du Bois", "Kristin Kobes Du Mez", "Leonard J. Vander Zee": the capitalized particle files with the surname
  const cap = toks.findIndex((t, j) => j > 0 && j < toks.length - 1 && /^(?:Du|De|Le|La|Van|Vander|Von|Del|Da|Di)$/.test(t));
  if (cap > 0) return stripDiacritics(`${toks.slice(cap).join(" ")} ${toks.slice(0, cap).join(" ")}`).toLowerCase().replace(/[^a-z0-9 ]+/g, "").trim();
  const pi = toks.findIndex((t, j) => j > 0 && PARTICLES.has(t));
  if (pi > 0 && /^(?:of|the)$/.test(toks[pi])) return plainName; // "Gregory of Nyssa", "Pseudo-Dionysius the Areopagite"
  let s = toks.length - 1;
  // "Ludwig van Beethoven" files under B; "Martin Luther King Jr." under K
  while (s > 1 && PARTICLES.has(toks[s - 1])) s--;
  const last = toks.slice(s).filter((t) => !PARTICLES.has(t)).join(" ");
  const rest = toks.slice(0, s).join(" ");
  return stripDiacritics(`${last} ${rest}`).toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(/\s+/g, " ").trim();
}

// ── write ──────────────────────────────────────────────────────────────────

function writeJson(rel, data) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const json = JSON.stringify(data);
  fs.writeFileSync(file, `${json}\n`);
  return Buffer.byteLength(json) + 1;
}

export function build() {
  const docs = loadDocuments();
  const scripture = buildScriptureIndex(docs);
  const scholars = buildScholarIndex(docs);

  const whole = JSON.stringify({ split: false, books: scripture.books });
  const split = Buffer.byteLength(whole) > SPLIT_THRESHOLD;
  const sizes = {};

  fs.rmSync(path.join(OUT, "scripture"), { recursive: true, force: true });
  if (split) {
    for (const b of scripture.books) {
      if (b.count) sizes[`scripture/${b.slug}.json`] = writeJson(`scripture/${b.slug}.json`, { slug: b.slug, name: b.name, chapters: b.chapters });
    }
    sizes["scripture-index.json"] = writeJson("scripture-index.json", {
      split: true,
      books: scripture.books.map(({ chapters, ...rest }) => ({ ...rest, chaptersIndexed: Object.keys(chapters).length })),
    });
  } else {
    sizes["scripture-index.json"] = writeJson("scripture-index.json", {
      split: false,
      books: scripture.books.map((b) => ({ ...b, chaptersIndexed: Object.keys(b.chapters).length })),
    });
  }
  sizes["scholar-index.json"] = writeJson("scholar-index.json", { scholars });

  const count = (k) => docs.filter((d) => d.kind === k).length;
  const manifest = {
    sources: Object.fromEntries(KINDS.map((k) => [k, count(k)])),
    scripture: {
      booksIndexed: scripture.books.filter((b) => b.count).length,
      chaptersIndexed: scripture.books.reduce((n, b) => n + Object.keys(b.chapters).length, 0),
      entries: scripture.books.reduce((n, b) => n + b.count, 0),
      passages: scripture.passages,
      references: scripture.references,
      split,
    },
    scholars: {
      count: scholars.length,
      works: scholars.reduce((n, s) => n + s.works.length, 0),
      discussed: scholars.filter((s) => s.discussedIn.length).length,
    },
    bytes: sizes,
  };
  const total = Object.values(sizes).reduce((a, b) => a + b, 0);
  manifest.bytes = Object.fromEntries(Object.entries(sizes).sort(([a], [b]) => a.localeCompare(b)));
  writeJson("manifest.json", manifest);
  return { manifest, total };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const { manifest, total } = build();
  const s = manifest.scripture;
  console.log(
    `[reference-indexes] Scripture: ${s.passages} passages in ${s.chaptersIndexed} chapters of ${s.booksIndexed} books (${s.references} references)${s.split ? ", split per book" : ""}. ` +
      `Scholars: ${manifest.scholars.count} named witnesses, ${manifest.scholars.works} works. ${(total / 1024).toFixed(0)} KB total.`
  );
}
