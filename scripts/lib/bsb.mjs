/**
 * bsb.mjs — the Berean Standard Bible text the Study Bible already serves
 * (client/public/bible/ch/<book>/<chapter>.json, public domain), looked up by
 * reference, so Grow content quotes Scripture verbatim and a validator can
 * prove it.
 *
 *   import { passage, parseRef, normalize } from "./lib/bsb.mjs";
 *   passage("Philippians 4:6-7")   -> { ref, verses: [{ c, v, t }], text }
 *
 * References are read by readRef, with the same grammar and book table as the
 * site's parser (client/src/lib/scripture-ref.ts; scripture-ref.test.ts holds
 * the two together): "Book C", "Book C-C", "Book C:V", "Book C:V-V",
 * "Book C:V-C:V", verse lists within a chapter ("Psalm 23:1,4"), chapters
 * joined by semicolons ("Romans 5:1; 8:28"), loose spacing ("jn 3 16"), a part
 * of a verse ("Romans 3:23b", read as the whole verse), and the abbreviations
 * in client/src/data/scripture-books.json ("Ps", "1 Cor").
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Not new URL("../..", import.meta.url): Vite rewrites that form, and the
// site's tests import this file through Vite (scripture-ref.test.ts).
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BIBLE = join(ROOT, "client/public/bible");
const BOOK_TABLE = JSON.parse(readFileSync(join(ROOT, "client/src/data/scripture-books.json"), "utf8"));

/** A book name as the alias table stores it: "1 Cor." and "I Corinthians" become "1 cor" and "1 corinthians". */
export function bookKey(name) {
  return name
    .toLowerCase()
    .replace(/\./g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(?:first|1st|i) /, "1 ")
    .replace(/^(?:second|2nd|ii) /, "2 ")
    .replace(/^(?:third|3rd|iii) /, "3 ")
    .replace(/^([1-3])(?=[a-z])/, "$1 ");
}

const ALIASES = new Map();
for (const { aliases, ...book } of BOOK_TABLE) {
  for (const a of [book.name, book.slug.replace(/-/g, " "), book.code, ...aliases]) ALIASES.set(bookKey(a), book);
}

const chapters = new Map();
function chapter(slug, c) {
  const key = `${slug}/${c}`;
  if (!chapters.has(key)) {
    chapters.set(key, JSON.parse(readFileSync(join(BIBLE, "ch", slug, `${c}.json`), "utf8")));
  }
  return chapters.get(key);
}

/** The book (letters, with an optional 1-3 in front), then everything from the first digit after it. */
const SPLIT = /^(.*?[a-z][a-z.]*)\s*(\d[\s\S]*)$/i;
const CHAPTERS = /^(\d+)(?:-(\d+))?$/;
/** A verse may carry a part letter ("23b"); the span is the whole verse. */
const VERSES = /^(\d+)[a-c]?(?:-(?:(\d+):)?(\d+)[a-c]?)?$/;

/**
 * "Philippians 4:6-7" -> { book, parts: [{ c1, v1, c2, v2 }] } (v2 is
 * Infinity when a part runs to the chapter's end), or null when it is not a
 * reference to a chapter and verse that can exist. The same rules, line for
 * line, as parseScriptureRef in client/src/lib/scripture-ref.ts.
 */
export function readRef(ref) {
  if (typeof ref !== "string") return null;
  const m = ref.trim().replace(/[‐-―−]/g, "-").match(SPLIT);
  if (!m) return null;
  const book = ALIASES.get(bookKey(m[1]));
  if (!book) return null;
  const loc = m[2]
    .replace(/\s*([:.,;-])\s*/g, "$1")
    .replace(/^(\d+)\s+(?=\d)/, "$1:")
    .replace(/(\d)\.(?=\d)/g, "$1:");
  if (/[^\d:,;a-c-]/.test(loc)) return null;
  const parts = [];
  for (const seg of loc.split(";")) {
    const colon = seg.indexOf(":");
    if (colon < 0) {
      const r = seg.match(CHAPTERS);
      if (!r) return null;
      const a = Number(r[1]);
      const b = r[2] ? Number(r[2]) : a;
      // A one-chapter book is cited by verse: "Jude 3" is Jude 1:3, "Jude 1" the whole letter.
      if (book.chapters === 1 && seg !== "1") parts.push({ c1: 1, v1: a, c2: 1, v2: b });
      else parts.push({ c1: a, v1: 1, c2: b, v2: Infinity });
      continue;
    }
    const chap = seg.slice(0, colon);
    if (!/^\d+$/.test(chap)) return null;
    let c = Number(chap);
    for (const v of seg.slice(colon + 1).split(",")) {
      const r = v.match(VERSES);
      if (!r) return null;
      const v1 = Number(r[1]);
      const c2 = r[2] ? Number(r[2]) : c;
      const v2 = r[3] ? Number(r[3]) : v1;
      parts.push({ c1: c, v1, c2, v2 });
      c = c2;
    }
  }
  for (const p of parts) {
    if (p.c1 < 1 || p.c2 > book.chapters || p.c2 < p.c1 || p.v1 < 1 || p.v2 < 1) return null;
    if (p.c2 === p.c1 && p.v2 < p.v1) return null;
  }
  return parts.length ? { book, parts } : null;
}

/** readRef for callers that stop on a reference they cannot read: the parts, or throws. */
export function parseRef(ref) {
  const r = readRef(ref);
  if (!r) throw new Error(`Cannot read reference "${ref}" (an unknown book, or a chapter or verse that cannot exist)`);
  return r;
}

/** The verses a reference names, in order, with the joined text. */
export function passage(ref) {
  const { book, parts } = parseRef(ref);
  const verses = [];
  for (const p of parts) {
    for (let c = p.c1; c <= p.c2; c++) {
      if (c < 1 || c > book.chapters) throw new Error(`${book.name} has no chapter ${c} ("${ref}")`);
      const ch = chapter(book.slug, c);
      for (const v of ch.verses) {
        const after = c > p.c1 || v.v >= p.v1;
        const before = c < p.c2 || v.v <= p.v2;
        if (after && before) verses.push({ c, v: v.v, t: v.t });
      }
    }
  }
  if (!verses.length) throw new Error(`No verses found for "${ref}"`);
  return { ref, book: book.name, verses, text: verses.map((v) => v.t).join(" ") };
}

/**
 * A psalm's heading ("For the choirmaster. A Psalm of David.") sits inside
 * verse 1 in this text. For reading aloud or printing a passage that starts
 * at a psalm's first verse, the heading comes off; what remains is still a
 * continuous stretch of the verse, so quotesPassage accepts it.
 */
const HEADING_SENTENCE = [
  // Titles, tunes, and authors: "For the choirmaster." "A Maskil of David."
  /(?:For|To|With|On|Set to|A|An|Of)\b[^.?!]*\b(?:choirmaster|director|Psalm|Song|song|Maskil|Miktam|Shiggaion|tune|instruments|David|Asaph|Korah|Solomon|Moses|Heman|Ethan|Jeduthun|Sabbath|thanksgiving|prayer|Prayer|remembrance|ascents)\b[^.?!]*[.?!]/,
  // Musical settings: "According to Gittith."
  /According to\b[^.?!]*[.?!]/,
  // Occasions from David's life: "When Nathan the prophet came to him..."
  /(?:When|After)\b[^.?!]*(?:David|Saul|Nathan|Doeg|Ziph|Aram|Joab|Absalom|Abimelech|Achish|Philistine|Edom|cave|wilderness)[^.?!]*[.?!]/,
].map((r) => r.source).join("|");
const PSALM_HEADING = new RegExp(String.raw`^(?:(?:${HEADING_SENTENCE})[”’"']?\s+)+(?:He said:\s+)?`);

/**
 * A passage cut from a longer speech can open or close on a quotation mark
 * whose partner is outside the passage. Printed alone, a stray mark is noise:
 * an unpartnered opening mark at the start or closing mark at the end comes
 * off, and a speech the passage opens mid-text is closed where it stops.
 */
export function balanceQuotes(text) {
  let t = text;
  const count = (ch) => t.split(ch).length - 1;
  if (count("”") > count("“") && t.endsWith("”")) t = t.slice(0, -1);
  if (count("“") > count("”")) t = t.startsWith("“") ? t.slice(1) : `${t}”`;
  // Single marks double as apostrophes, so only a closing mark after the final stop is dropped.
  if (!t.includes("‘") && /[.?!]’$/.test(t)) t = t.slice(0, -1);
  return t;
}

/** The passage's text for reading or print: no psalm heading, no stray quotation marks, no closing Selah. */
export function readingText(ref) {
  const p = passage(ref);
  let text = p.text;
  if (p.book === "Psalms" && p.verses[0].v === 1) {
    const stripped = text.replace(PSALM_HEADING, "");
    if (stripped.trim()) text = stripped;
  }
  // A passage that stops mid-sentence says so; a closing "Selah" (a musical or
  // liturgical mark, not a word to memorize) comes off the end.
  text = balanceQuotes(text).replace(/\s+Selah$/, "").replace(/[,;:]$/, "...");
  return text;
}

/** Compare quotations on words alone: case, quotes, and punctuation ignored. */
export function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[‘’“”"']/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Is `quoted` verbatim from the passage `ref` names? A quotation may be the
 * whole passage or a continuous stretch of it, and may drop words only where
 * it marks the gap with an ellipsis.
 */
export function quotesPassage(quoted, ref) {
  const hay = normalize(passage(ref).text);
  return quoted
    .split(/\s*(?:\.\.\.|…)\s*/)
    .map(normalize)
    .filter(Boolean)
    .every((piece) => hay.includes(piece));
}
