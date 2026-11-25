/**
 * bible-explore.mjs: the cross-book indexes read by the pages that let a
 * reader explore the Study Bible's book pages across the whole Bible:
 *
 *   /study/timeline            client/public/bible/explore/timeline.json
 *   /study/atlas               client/public/bible/explore/atlas.json
 *   /study/words               client/public/bible/explore/words.json
 *   /study/hard-passages       client/public/bible/explore/hard-passages.json
 *   /study/books-at-a-glance   client/public/bible/explore/books-at-a-glance.json
 *   /study/key-chapters        client/public/bible/explore/key-chapters.json
 *   /study/themes              client/public/bible/explore/themes.json
 *
 * The first four read a book's `teaching`; the last three read `structure`,
 * `keyChapters` and `themes`, which all 66 book pages have.
 *
 * Every word in those files is copied from a book page's own data
 * (client/public/bible/notes/<book>/intro.json, `teaching`). Nothing is
 * written here: this file only gathers, sorts and links. What it works out
 * for itself is where an entry sits (a year read out of the book's own "when",
 * the chapter read out of the book's own reference), never a new statement.
 *
 * A book without `teaching` is named in each file's `without`, so a page can
 * say plainly which books it does not hold yet.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const OUT_DIR = path.join(ROOT, "client/public/bible/explore");
const NOTES = path.join(ROOT, "client/public/bible/notes");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

/** The 66 books in canon order, each with its teaching data when it has any. */
export function loadBooks() {
  return readJson(path.join(ROOT, "client/public/bible/books.json")).map((b) => {
    const intro = readJson(path.join(NOTES, b.slug, "intro.json"));
    return { ...b, teaching: intro.teaching ?? null };
  });
}

const bookRow = (b) => ({ slug: b.slug, name: b.name, testament: b.testament });
const withTeaching = (books, key) => books.filter((b) => Array.isArray(b.teaching?.[key]) && b.teaching[key].length > 0);
const withoutTeaching = (books, key) => books.filter((b) => !(Array.isArray(b.teaching?.[key]) && b.teaching[key].length > 0)).map((b) => b.name);

/* ------------------------------------------------------------------ */
/* A book's own reference, read out of its own sentence                */
/* ------------------------------------------------------------------ */

/**
 * The chapters (and verses) of `book` that a sentence from its own page names,
 * in the order it names them: "(1:1)", "(11:31 to 12:9)", "(chapter 5)",
 * "(6 to 9)", "(Mark 14 to 16)". A reference to another book ("(Acts 18:2)",
 * "(1 Maccabees 2:26)", "Annals 15.44") is not this book's and is left out,
 * and so is everything after it inside the same brackets.
 */
export function ownRefs(text, book) {
  const own = new Set([book.name, book.slug === "psalms" ? "Psalm" : book.name]);
  const out = [];
  const seen = new Set();
  const add = (ch, v) => {
    if (!(ch >= 1 && ch <= book.chapters)) return;
    const key = `${ch}:${v ?? ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(v ? { ch, v } : { ch });
  };
  // "chapter 8", "chapters 4 and 5", "chapters 17 to 26": always this book's.
  const spans = [];
  for (const m of text.matchAll(/\bchapters? (\d+)/g)) spans.push({ at: m.index, ch: +m[1] });
  // This book by name: "Mark 14 to 16", "Matthew 24", "Psalm 22".
  for (const name of own) {
    const re = new RegExp(`(?<![1-3] )\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} (\\d+)(?::(\\d+))?`, "g");
    for (const m of text.matchAll(re)) spans.push({ at: m.index, ch: +m[1], v: m[2] ? +m[2] : undefined });
  }
  // Inside brackets: a bare "1:1" or "6 to 9" is this book's until another work is named.
  for (const m of text.matchAll(/\(([^()]*)\)/g)) {
    let mine = true;
    let at = m.index + 1;
    for (const raw of m[1].split(/[;,]/)) {
      const seg = raw.trim().replace(/^(?:see|and|also|compare) /i, "");
      const named = seg.match(/^((?:[1-3] )?[A-Z][A-Za-z']*(?: [A-Z][A-Za-z']*)*) \d/);
      if (named) mine = own.has(named[1]);
      else if (mine) {
        const cv = seg.match(/^(\d+):(\d+)/);
        const span = seg.match(/^(\d+) (?:to|and) \d+$/);
        if (cv) spans.push({ at, ch: +cv[1], v: +cv[2] });
        else if (span) spans.push({ at, ch: +span[1] });
      }
      at += raw.length + 1;
    }
  }
  // In the run of a sentence: "first in 1:1", "reads 7:10-14". A word with a capital before it would be another work.
  for (const m of text.matchAll(/(?:^|[^A-Za-z0-9:.])[a-z]+ (\d+):(\d+)/g)) spans.push({ at: m.index, ch: +m[1], v: +m[2] });
  spans.sort((a, b) => a.at - b.at);
  for (const s of spans) add(s.ch, s.v);
  return out;
}

/* ------------------------------------------------------------------ */
/* The timeline                                                        */
/* ------------------------------------------------------------------ */

/**
 * The stretches of time the page is divided into. Plain spans of years, not
 * named ages: naming an age would be a statement the book pages do not make.
 * `from` is the first year in the band (BC years are negative).
 */
export const BANDS = [
  { id: "no-year", name: "No year given" },
  { id: "before-2000-bc", name: "Before 2000 BC", from: -Infinity },
  { id: "2000-1500-bc", name: "2000 to 1500 BC", from: -2000 },
  { id: "1500-1000-bc", name: "1500 to 1000 BC", from: -1500 },
  { id: "1000-500-bc", name: "1000 to 500 BC", from: -1000 },
  { id: "500-1-bc", name: "500 to 1 BC", from: -500 },
  { id: "ad-1-50", name: "AD 1 to 50", from: 1 },
  { id: "ad-50-100", name: "AD 50 to 100", from: 50 },
  { id: "ad-100-500", name: "AD 100 to 500", from: 100 },
  { id: "ad-500-1500", name: "AD 500 to 1500", from: 500 },
  { id: "ad-1500-on", name: "AD 1500 and after", from: 1500 },
];

const ORDINALS = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth"];
const MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December";

/**
 * The first year a book's own "when" names, or null when it names none
 * ("Soon after", "The days of Abraham", "The fortieth year"). BC years are
 * negative. A span gives its first year ("AD 41 to 54" is 41), a decade or a
 * century its start ("The mid-50s" is 50, "The 800s BC" is -800, "Early second
 * century" is 100), moved within the span by "mid" and "late" so that the
 * book's own order is kept. Only where the entry is listed depends on this;
 * the words shown are the book's.
 */
export function firstYear(when) {
  // Words that hold a number but are not a year: "24 May 1738", "After 1 Corinthians".
  let s = when
    .replace(new RegExp(`\\b\\d{1,2} (?=(?:${MONTHS})\\b)`, "g"), "")
    .replace(/\b[1-3] (?=[A-Z][a-z])/g, "");
  const part = /\b(late|mid|middle)\b/i.test(s.split(/,| or | and | to /)[0]) ? (/\blate\b/i.test(s.split(/,| or | and | to /)[0]) ? 0.75 : 0.5) : 0;
  const bcAt = s.search(/\bBC\b/);
  const adAt = s.search(/\bAD\b/);
  // A century or millennium in words: "The eleventh century BC", "Late second millennium BC".
  const word = s.match(new RegExp(`\\b(${ORDINALS.join("|")})(?: (?:and|or) (?:early |late )?(?:${ORDINALS.join("|")}))? (century|centuries|millennium)`, "i"));
  const num = s.match(/\d+/);
  if (word && (!num || word.index < num.index)) {
    const n = ORDINALS.indexOf(word[1].toLowerCase()) + 1;
    const size = /millennium/i.test(word[2]) ? 1000 : 100;
    const bc = bcAt > word.index && (adAt < 0 || bcAt < adAt);
    return bc ? -(n * size) + Math.round(part * size) : (n - 1) * size + 1 + Math.round(part * size);
  }
  if (!num) return null;
  const n = +num[0];
  const plural = s.slice(num.index + num[0].length, num.index + num[0].length + 1) === "s";
  const size = plural ? (n % 100 === 0 ? 100 : 10) : 0;
  // BC when "BC" follows the number before any "AD" does ("37 to 4 BC", "27 BC to AD 14").
  const bc = bcAt > num.index && (adAt < 0 || adAt > bcAt || adAt < num.index);
  // "The 800s BC" runs from 899 down to 800, so its first year is the far end.
  if (bc) return (size ? -(n + size) + 1 : -n) + Math.round(part * size);
  return n + Math.round(part * size);
}

/**
 * A "when" that only makes sense beside the line before it: "Soon after",
 * "Then", "Three years later". "After Joshua's death" and a bare "Later" name
 * something else, not the line before, so they are not moved by it.
 */
const LEANS = /^(?:Soon after|Not long after|Then$|Next$|The next |The same days$)|\b(?:years?|months?|days?) later$/;

const bandOf = (year) => {
  if (year === null) return "no-year";
  let hit = BANDS[1].id;
  for (const b of BANDS.slice(1)) if (year >= b.from) hit = b.id;
  return hit;
};

const sameWhen = (w) => w.toLowerCase().replace(/^the /, "").replace(/\baround\b/g, "about").replace(/-/g, " ").trim();

/**
 * The timeline: every book's entries in one list, each with the book's own
 * words, the year it is listed at and how that year was reached:
 *   placed "year"   the book's own "when" names it;
 *   placed "order"  the "when" leans on the entry before it in the same book
 *                   ("Soon after"), so it is listed straight after that one;
 *   placed "none"   the book gives no year, and it is listed apart.
 * `same` is the editors' list of entries that tell of one event in more than
 * one book (scripts/bible-timeline-same.json): the entries are kept word for
 * word, set side by side, and marked `differ` when their dates are not worded
 * alike. No date is chosen between them.
 */
export function buildTimeline(books = loadBooks(), same = readJson(path.join(ROOT, "scripts/bible-timeline-same.json")).groups) {
  const have = withTeaching(books, "timeline");
  const entries = [];
  have.forEach((b) => {
    let last = null;
    b.teaching.timeline.forEach((t, i) => {
      let year = firstYear(t.when);
      let placed = "year";
      if (year === null) {
        if (last !== null && LEANS.test(t.when)) {
          year = last;
          placed = "order";
        } else placed = "none";
      }
      last = year;
      const ref = ownRefs(t.what, b)[0];
      entries.push({ id: `${b.slug}-${i + 1}`, book: b.slug, when: t.when, what: t.what, kind: t.kind, year, placed, band: bandOf(year), ...(ref ?? {}) });
    });
  });
  const canon = new Map(books.map((b, i) => [b.slug, i]));
  const bandAt = new Map(BANDS.map((b, i) => [b.id, i]));
  const order = new Map(entries.map((e, i) => [e.id, i]));
  entries.sort((a, b) => bandAt.get(a.band) - bandAt.get(b.band) || (a.year ?? 0) - (b.year ?? 0) || canon.get(a.book) - canon.get(b.book) || order.get(a.id) - order.get(b.id));

  const groups = [];
  const warnings = [];
  for (const g of same) {
    const members = [];
    for (const m of g.entries) {
      const hits = entries.filter((e) => e.book === m.book && e.when === m.when && e.what.includes(m.has));
      if (hits.length === 1) members.push(hits[0]);
      else warnings.push(`same-event group "${g.id}": ${m.book} "${m.when}" / "${m.has}" matches ${hits.length} entries, so it is left out`);
    }
    if (new Set(members.map((m) => m.book)).size < 2) continue;
    members.sort((a, b) => canon.get(a.book) - canon.get(b.book) || order.get(a.id) - order.get(b.id));
    const differ = new Set(members.map((m) => sameWhen(m.when))).size > 1;
    groups.push({ id: g.id, differ, entries: members.map((m) => m.id) });
    for (const m of members) m.group = g.id;
  }
  return {
    data: {
      v: 1,
      books: have.map(bookRow),
      without: withoutTeaching(books, "timeline"),
      bands: BANDS.map(({ id, name }) => ({ id, name })).filter((b) => entries.some((e) => e.band === b.id)),
      entries,
      groups,
    },
    warnings,
  };
}

/* ------------------------------------------------------------------ */
/* The atlas                                                           */
/* ------------------------------------------------------------------ */

export const FRAME_ORDER = ["fertile-crescent", "canaan", "israel", "mediterranean"];
const NEAR = 0.05;
const placeKey = (name) => name.toLowerCase().replace(/^the /, "").replace(/ river$/, "").replace(/\s*\(.*\)$/, "").replace(/,.*$/, "").trim();

/**
 * The atlas: every place a book page places, gathered into one entry per
 * place. Two books' marks are one place when they carry the same id (or the
 * same name) and sit within a twentieth of a degree of each other, so
 * "Antioch in Syria" and "Pisidian Antioch", both filed as `antioch`, stay
 * two places. Each book keeps its own name for the place, its own sentence,
 * its own references and its own position; the place is drawn where the first
 * book in the Bible's order puts it, on every map a book draws it on.
 */
export function buildAtlas(books = loadBooks()) {
  const have = withTeaching(books, "map");
  const places = [];
  for (const b of have) {
    const map = b.teaching.map;
    const maps = "places" in map[0] ? map : [{ frame: "israel", title: "", places: map }];
    for (const m of maps) {
      for (const p of m.places) {
        const region = p.region ?? (p.id === "decapolis" || p.id === "gerasenes");
        let hit = places.find((x) => (x.ids.has(p.id) || x.keys.has(placeKey(p.name))) && Math.abs(x.lat - p.lat) <= NEAR && Math.abs(x.lon - p.lon) <= NEAR);
        if (!hit) {
          hit = { ids: new Set(), keys: new Set(), lat: p.lat, lon: p.lon, region, names: [], frames: {}, books: [] };
          places.push(hit);
        }
        hit.ids.add(p.id);
        hit.keys.add(placeKey(p.name));
        hit.names.push(p.name);
        if (!(m.frame in hit.frames)) hit.frames[m.frame] = p.label === undefined ? null : p.label;
        let row = hit.books.find((r) => r.slug === b.slug);
        if (!row) {
          row = { slug: b.slug, name: p.name, line: p.line, refs: [] };
          hit.books.push(row);
        } else if (row.line !== p.line) row.line = `${row.line}\n\n${p.line}`;
        for (const r of p.refs) if (!row.refs.includes(r)) row.refs.push(r);
      }
    }
  }
  const used = new Set();
  const out = places.map((p) => {
    // The name most of its books give it; the first book's on a tie.
    const tally = new Map();
    for (const n of p.names) tally.set(n, (tally.get(n) ?? 0) + 1);
    const name = [...tally.entries()].sort((a, b) => b[1] - a[1])[0][0];
    let id = placeKey(name).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    while (used.has(id)) id += "-2";
    used.add(id);
    return {
      id,
      ids: [...p.ids],
      name,
      lat: p.lat,
      lon: p.lon,
      ...(p.region ? { region: true } : {}),
      frames: FRAME_ORDER.filter((f) => f in p.frames).map((f) => ({ frame: f, ...(p.frames[f] === null ? {} : { label: p.frames[f] }) })),
      books: p.books,
    };
  });
  out.sort((a, b) => placeKey(a.name).localeCompare(placeKey(b.name)));
  return {
    data: {
      v: 1,
      books: have.map(bookRow),
      without: withoutTeaching(books, "map"),
      frames: FRAME_ORDER.filter((f) => out.some((p) => p.frames.some((x) => x.frame === f))),
      places: out,
    },
    warnings: [],
  };
}

/* ------------------------------------------------------------------ */
/* Key words                                                           */
/* ------------------------------------------------------------------ */

const LANGS = [
  ["hebrew", /\bHebrew\b/],
  ["aramaic", /\bAramaic\b/],
  ["greek", /\bGreek\b/],
];

/**
 * Key words: every word a book page explains, one entry per word, with each
 * book's own explanation under it. `langs` lists the languages the books' own
 * sentences name (a sentence that says "Greek euangelion" names Greek); a
 * word whose sentences name none is given in English only, and the page says
 * so and does not guess.
 */
export function buildWords(books = loadBooks()) {
  const have = withTeaching(books, "words");
  const words = [];
  for (const b of have) {
    for (const w of b.teaching.words) {
      const key = w.word.toLowerCase().replace(/^the /, "").trim();
      let hit = words.find((x) => x.key === key);
      if (!hit) {
        hit = { key, word: w.word, entries: [] };
        words.push(hit);
      }
      const langs = LANGS.filter(([, re]) => re.test(w.line)).map(([l]) => l);
      hit.entries.push({ book: b.slug, ...(w.word !== hit.word ? { word: w.word } : {}), line: w.line, langs, refs: ownRefs(w.line, b) });
    }
  }
  const used = new Set();
  const out = words.map((w) => {
    let id = w.key.normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "word";
    while (used.has(id)) id += "-2";
    used.add(id);
    return {
      id,
      word: w.word,
      langs: LANGS.map(([l]) => l).filter((l) => w.entries.some((e) => e.langs.includes(l))),
      testaments: [...new Set(w.entries.map((e) => books.find((b) => b.slug === e.book).testament))],
      entries: w.entries.map(({ langs: _langs, ...e }) => e),
    };
  });
  out.sort((a, b) => a.word.replace(/^The /, "").localeCompare(b.word.replace(/^The /, ""), "en", { sensitivity: "base" }));
  return { data: { v: 1, books: have.map(bookRow), without: withoutTeaching(books, "words"), words: out }, warnings: [] };
}

/* ------------------------------------------------------------------ */
/* Hard passages                                                       */
/* ------------------------------------------------------------------ */

/**
 * The care lines the hard-passages page carries. The site's rule is that a
 * care line is never newly written: it is one the site already says, reused
 * whole. These two are the Study Bible notes' own standing lines, the first
 * for despair and the second for violence and abuse, each said word for word
 * in more than ten chapters' notes. They are copied from the note named here
 * (a whole paragraph of a passage's "hard" note), never typed, so the page
 * cannot drift from its source; BibleHardPassages.test.tsx holds them equal.
 */
export const CARE_LINES = [
  { from: "judges/plain/16.json", starts: "If you have thoughts of hurting yourself, speak to someone today" },
  { from: "deuteronomy/plain/13.json", starts: "If you are being hurt, at home, at work or in a church" },
];

/** The whole paragraph of a plain note's "hard" text that begins with `starts`, or null. */
export function careLine({ from, starts }) {
  const file = path.join(NOTES, from);
  if (!fs.existsSync(file)) return null;
  for (const p of readJson(file).passages ?? []) {
    const hit = String(p.hard ?? "").split(/\n{2,}/).find((para) => para.startsWith(starts));
    if (hit) return hit;
  }
  return null;
}

/**
 * Hard passages: every passage a book page lists as hard, book by book, in
 * the book's own order and words. The book pages give these no kinds, so
 * none are given here. Each carries the chapter its note is in; an entry
 * whose chapter has no note would be a question with no way to its answer,
 * so it is reported and left out.
 */
export function buildHard(books = loadBooks()) {
  const have = withTeaching(books, "hard");
  const warnings = [];
  const care = [];
  for (const c of CARE_LINES) {
    const line = careLine(c);
    if (line) care.push(line);
    else warnings.push(`care line "${c.starts}..." is no longer a whole paragraph of ${c.from}, so it is left out`);
  }
  const rows = have.map((b) => ({
    ...bookRow(b),
    items: b.teaching.hard.filter((h) => {
      const ok = fs.existsSync(path.join(NOTES, b.slug, `${h.ch}.json`));
      if (!ok) warnings.push(`${b.name} ${h.ref}: chapter ${h.ch} has no note, so the passage is left out`);
      return ok;
    }).map((h) => ({ ch: h.ch, v: h.v, ref: h.ref, line: h.line })),
  }));
  return { data: { v: 1, care, books: rows, without: withoutTeaching(books, "hard") }, warnings };
}

/* ------------------------------------------------------------------ */
/* The 66 books at a glance, key chapters, themes                      */
/* ------------------------------------------------------------------ */

/** The 66 books with a field every book page has (structure, keyChapters, themes). */
function loadIntros() {
  return readJson(path.join(ROOT, "client/public/bible/books.json")).map((b) => ({ ...b, intro: readJson(path.join(NOTES, b.slug, "intro.json")) }));
}

/**
 * The 66 books at a glance: each book's own outline (intro.json `structure`),
 * part by part in its own words. The page draws each book as one band with
 * the book page's own rule for a part's width (outlineBand in
 * pages/study-bible/bookFacts.ts), so the two drawings of a book agree.
 */
export function buildGlance(books = loadIntros()) {
  const warnings = [];
  const rows = books.map((b) => {
    const parts = (b.intro.structure ?? []).map((p) => ({ range: p.range, title: p.title, summary: p.summary }));
    if (!parts.length) warnings.push(`${b.name} has no outline`);
    for (const p of parts) if (!/^\d+(?::\d+)?(?:-\d+(?::\d+)?)?$/.test(p.range)) warnings.push(`${b.name}: the range "${p.range}" cannot be drawn`);
    return { ...bookRow(b), chapters: b.chapters, parts };
  });
  return { data: { v: 1, books: rows }, warnings };
}

/**
 * Where to start in every book: each book's key chapters (intro.json
 * `keyChapters`) in the book's own order, each with the book's own reason.
 */
export function buildKeyChapters(books = loadIntros()) {
  const warnings = [];
  const rows = books.map((b) => ({
    ...bookRow(b),
    chapters: (b.intro.keyChapters ?? []).filter((k) => {
      const ok = k.ch >= 1 && k.ch <= b.chapters;
      if (!ok) warnings.push(`${b.name}: chapter ${k.ch} is not in the book, so it is left out`);
      return ok;
    }).map((k) => ({ ch: k.ch, why: k.why })),
  }));
  return { data: { v: 1, books: rows }, warnings };
}

/**
 * Themes of the Bible: every book's themes (intro.json `themes`). Themes
 * that carry the same title in more than one book are set under that one
 * title, each book's paragraph kept whole and apart. Titles are matched as
 * written (letter case aside): nothing here decides that two differently
 * named themes are the same, and no theme is sorted into a scheme.
 */
export function buildThemes(books = loadIntros()) {
  const themes = [];
  for (const b of books) {
    for (const t of b.intro.themes ?? []) {
      const key = t.title.trim().toLowerCase();
      let hit = themes.find((x) => x.key === key);
      if (!hit) {
        hit = { key, title: t.title, entries: [] };
        themes.push(hit);
      }
      hit.entries.push({ book: b.slug, ...(t.title !== hit.title ? { title: t.title } : {}), body: t.body });
    }
  }
  const used = new Set();
  const out = themes.map((t) => {
    let id = t.key.normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "theme";
    while (used.has(id)) id += "-2";
    used.add(id);
    return { id, title: t.title, entries: t.entries };
  });
  const sortKey = (t) => t.title.replace(/^(?:The|A|An) /i, "");
  out.sort((a, b) => sortKey(a).localeCompare(sortKey(b), "en", { sensitivity: "base" }));
  return { data: { v: 1, books: books.map(bookRow), themes: out }, warnings: [] };
}

/* ------------------------------------------------------------------ */
/* Writing and checking                                                */
/* ------------------------------------------------------------------ */

export const INDEXES = {
  timeline: { file: "timeline.json", build: buildTimeline, count: (d) => `${d.entries.length} entries from ${d.books.length} books, ${d.groups.length} events told by more than one book` },
  atlas: { file: "atlas.json", build: buildAtlas, count: (d) => `${d.places.length} places from ${d.books.length} books` },
  words: { file: "words.json", build: buildWords, count: (d) => `${d.words.length} words from ${d.books.length} books` },
  hard: { file: "hard-passages.json", build: buildHard, count: (d) => `${d.books.reduce((n, b) => n + b.items.length, 0)} passages from ${d.books.length} books` },
  glance: { file: "books-at-a-glance.json", build: buildGlance, count: (d) => `${d.books.reduce((n, b) => n + b.parts.length, 0)} parts of ${d.books.length} books` },
  keys: { file: "key-chapters.json", build: buildKeyChapters, count: (d) => `${d.books.reduce((n, b) => n + b.chapters.length, 0)} key chapters of ${d.books.length} books` },
  themes: { file: "themes.json", build: buildThemes, count: (d) => `${d.themes.length} themes, ${d.themes.reduce((n, t) => n + t.entries.length, 0)} paragraphs from ${d.books.length} books` },
};

/** Write one index, or with --check exit 1 when the committed file is not what the book pages now give. */
export function run(name, argv = process.argv) {
  const { file, build, count } = INDEXES[name];
  const out = path.join(OUT_DIR, file);
  const rel = path.relative(ROOT, out);
  const { data, warnings } = build();
  for (const w of warnings) console.warn(`[bible-${name}] note: ${w}`);
  const text = `${JSON.stringify(data)}\n`;
  if (argv.includes("--check")) {
    const now = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : null;
    if (now !== text) {
      console.error(`[bible-${name}] ${rel} is ${now === null ? "missing" : "out of date with the book pages"}.`);
      console.error(`Run: node scripts/build-bible-${name}-index.mjs`);
      process.exit(1);
    }
    console.log(`[bible-${name}] ok: ${count(data)}`);
    return;
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(out, text);
  console.log(`[bible-${name}] wrote ${rel}: ${count(data)}`);
}
