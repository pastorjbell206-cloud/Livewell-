/**
 * bsb.mjs — the Berean Standard Bible text the Study Bible already serves
 * (client/public/bible/ch/<book>/<chapter>.json, public domain), looked up by
 * reference, so Grow content quotes Scripture verbatim and a validator can
 * prove it.
 *
 *   import { passage, parseRef, normalize } from "./lib/bsb.mjs";
 *   passage("Philippians 4:6-7")   -> { ref, verses: [{ c, v, t }], text }
 *
 * Supported references: "Book C", "Book C:V", "Book C:V-V", "Book C:V-C:V",
 * and comma lists within one chapter ("Psalm 23:1,4"). Book names follow the
 * site's usage ("Psalm" or "Psalms", "Song of Songs", "1 John").
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../..", import.meta.url).pathname;
const BIBLE = join(ROOT, "client/public/bible");
const books = JSON.parse(readFileSync(join(BIBLE, "books.json"), "utf8"));

const ALIASES = new Map();
for (const b of books) {
  ALIASES.set(b.name.toLowerCase(), b);
  ALIASES.set(b.slug.replace(/-/g, " "), b);
  ALIASES.set(b.code.toLowerCase(), b);
}
ALIASES.set("psalm", ALIASES.get("psalms"));
const song = books.find((b) => b.slug === "song-of-solomon");
if (song) {
  ALIASES.set("song of songs", song);
  ALIASES.set("song of solomon", song);
}

const chapters = new Map();
function chapter(slug, c) {
  const key = `${slug}/${c}`;
  if (!chapters.has(key)) {
    chapters.set(key, JSON.parse(readFileSync(join(BIBLE, "ch", slug, `${c}.json`), "utf8")));
  }
  return chapters.get(key);
}

/** "Philippians 4:6-7" -> { book, parts: [{ c1, v1, c2, v2 }] } or throws. */
export function parseRef(ref) {
  const m = ref.trim().match(/^((?:[1-3]\s)?[A-Za-z][A-Za-z ]*?)\s+(\d.*)$/);
  if (!m) throw new Error(`Cannot read reference "${ref}"`);
  const book = ALIASES.get(m[1].toLowerCase().replace(/\s+/g, " "));
  if (!book) throw new Error(`Unknown book in "${ref}"`);
  const loc = m[2].replace(/\s+/g, "");
  const parts = [];
  if (!loc.includes(":")) {
    const [a, b] = loc.split("-").map(Number);
    for (let c = a; c <= (b || a); c++) parts.push({ c1: c, v1: 1, c2: c, v2: Infinity });
    return { book, parts };
  }
  const [chap, rest] = loc.split(/:(.*)/s);
  let c = Number(chap);
  for (const seg of rest.split(",")) {
    const range = seg.match(/^(\d+)(?:-(?:(\d+):)?(\d+))?$/);
    if (!range) throw new Error(`Cannot read verses "${seg}" in "${ref}"`);
    const v1 = Number(range[1]);
    const c2 = range[2] ? Number(range[2]) : c;
    const v2 = range[3] ? Number(range[3]) : v1;
    parts.push({ c1: c, v1, c2, v2 });
    c = c2;
  }
  return { book, parts };
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
