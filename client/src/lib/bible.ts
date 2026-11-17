/**
 * The Study Bible's data layer (docs/STUDY-BIBLE-PROMPT.md, Phase 1).
 *
 * Everything here reads the static files scripts/build-bible.mjs writes into
 * /bible/: one file per chapter, one lexicon shard per 250 Strong's numbers,
 * one grammar-code dictionary per language. Each is fetched once and cached;
 * no page downloads more than the chapter it shows and the shards it opens.
 */
import { fetchJson } from "@/lib/fetch-json";

export interface BibleBook {
  code: string;
  slug: string;
  name: string;
  testament: "OT" | "NT";
  chapters: number;
}

/** [original, transliteration, gloss, strong, grammar, editions?] */
export type BibleWord = [string, string, string, string, string, string?];

export interface BibleVerse {
  v: number;
  t: string;
  w: BibleWord[];
  x?: string[];
  /** The critical text omits this verse; its words come from later editions. */
  later?: boolean;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface LexEntry {
  l: string;
  tr: string;
  pos: string;
  g: string;
  d: string;
  n: number;
  r: string[];
  rel?: string;
}

const cache = new Map<string, Promise<unknown>>();
function cached<T>(url: string, guard: (x: unknown) => x is T): Promise<T> {
  let p = cache.get(url) as Promise<T> | undefined;
  if (!p) {
    p = fetchJson(url, guard).catch((e) => {
      cache.delete(url);
      throw e;
    });
    cache.set(url, p);
  }
  return p;
}

const isArray = (x: unknown): x is BibleBook[] => Array.isArray(x);
const isChapter = (x: unknown): x is BibleChapter =>
  typeof x === "object" && x !== null && Array.isArray((x as BibleChapter).verses);
const isRecord = <T,>(x: unknown): x is Record<string, T> => typeof x === "object" && x !== null && !Array.isArray(x);

/**
 * A chapter's text alone: verse numbers and the BSB words, without the
 * original words and cross-references (scripts/build-bible-text.mjs). The
 * verse sheet reads these: John 3 is about 4 KB here and 42 KB in full.
 */
export interface BibleTextChapter {
  book: string;
  chapter: number;
  verses: Pick<BibleVerse, "v" | "t" | "later">[];
}
const isTextChapter = (x: unknown): x is BibleTextChapter =>
  isChapter(x) && x.verses.every((v) => typeof v?.v === "number" && typeof v?.t === "string");

export const fetchBooks = () => cached("/bible/books.json", isArray);
export const fetchChapter = (slug: string, chapter: number) => cached(`/bible/ch/${slug}/${chapter}.json`, isChapter);
export const fetchChapterText = (slug: string, chapter: number) =>
  cached(`/bible/text/${slug}/${chapter}.json`, isTextChapter);
export const fetchMorph = (lang: "H" | "G") => cached(`/bible/morph/${lang}.json`, isRecord<string>);

export const langOf = (strong: string): "H" | "G" | null =>
  strong.startsWith("H") ? "H" : strong.startsWith("G") ? "G" : null;

/** The lexicon entry for an extended Strong's number, trying the base number when the exact form is absent. */
export async function lookupLex(strong: string): Promise<{ key: string; entry: LexEntry } | null> {
  const lang = langOf(strong);
  const m = strong.match(/^[HG](\d{4})([A-Za-z]?)$/);
  if (!lang || !m) return null;
  const bucket = Math.floor(parseInt(m[1], 10) / 250);
  const shard = await cached(`/bible/lex/${lang}/${bucket}.json`, isRecord<LexEntry>);
  const base = `${lang}${m[1]}`;
  const key =
    (shard[strong] && strong) ||
    (shard[base] && base) ||
    Object.keys(shard).find((k) => k.startsWith(base)) ||
    null;
  return key ? { key, entry: shard[key] } : null;
}

/**
 * Hebrew grammar codes come as segments ("HR/Ncfsa": a prefix, then the word);
 * every segment after the first omits the language letter. Greek codes are one
 * piece. Returns one plain-language line per segment.
 */
export function expandGrammar(lang: "H" | "G", code: string, dict: Record<string, string>): string[] {
  if (!code) return [];
  const segs = lang === "H" ? code.split("/").map((s, i) => (i === 0 ? s : `H${s}`)) : [code];
  return segs.map((s) => dict[s] ?? s);
}

/** One row of a word's grammar: "Stem", "Qal", and what the form implies ("action: simple; voice: active"). */
export interface GrammarRow {
  k: string;
  v: string;
  hence?: string;
}

/**
 * An expansion from the grammar dictionary as rows. The source writes Hebrew
 * verbs as "Stem=Qal (hence Action=Simple; Voice=Active); Form=Perfect (hence
 * Tense=Past/present; Mood=Indicative)": the semicolons inside the brackets
 * belong to the row they sit in, so the split keeps to the top level.
 */
export function grammarRows(expansion: string): GrammarRow[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of expansion) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === ";" && depth === 0) { parts.push(cur); cur = ""; } else cur += ch;
  }
  parts.push(cur);
  const rows: GrammarRow[] = [];
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    const k = part.slice(0, eq).trim();
    const rest = part.slice(eq + 1).trim();
    if (!k || !rest) continue;
    const m = rest.match(/^(.*?)\s*\(hence\s+([^)]*)\)\s*$/);
    if (!m) { rows.push({ k, v: rest }); continue; }
    const hence = m[2]
      .split(";")
      .map((pair) => pair.split("=").map((x) => x.trim()))
      .filter((kv) => kv.length === 2 && kv[0] && kv[1])
      .map(([hk, hv]) => `${hk.toLowerCase()}: ${hv.toLowerCase()}`)
      .join("; ");
    rows.push(hence ? { k, v: m[1].trim(), hence } : { k, v: m[1].trim() });
  }
  return rows;
}

/**
 * A word-by-word meaning in pieces. The source marks a word the original has
 * and English leaves out as "<the>" or "<obj.>", and a word English has to add
 * as "[was]". Each marked piece comes back without its brackets and flagged,
 * so the page can print it gray; brackets inside brackets ("[is [the] one]
 * who") lose every bracket and stay one piece.
 */
export function glossParts(gloss: string): { text: string; supplied: boolean }[] {
  const out: { text: string; supplied: boolean }[] = [];
  const push = (text: string, supplied: boolean) => {
    if (!text) return;
    const last = out[out.length - 1];
    if (last && last.supplied === supplied) last.text += text;
    else out.push({ text, supplied });
  };
  let depth = 0;
  let cur = "";
  for (const ch of gloss) {
    if (ch === "<" || ch === "[") {
      if (depth === 0) { push(cur, false); cur = ""; }
      depth++;
    } else if ((ch === ">" || ch === "]") && depth > 0) {
      depth--;
      if (depth === 0) { push(cur, true); cur = ""; }
    } else cur += ch;
  }
  push(cur, depth > 0);
  return out;
}

/** A meaning with its marks removed, for a label read aloud. */
export const plainGloss = (gloss: string): string => glossParts(gloss).map((p) => p.text).join("");

/** The build lists at most this many verses for a word (scripts/build-bible.mjs, addOcc). */
export const OCCURRENCE_LIST_CAP = 60;

/**
 * How often a word appears, said truthfully. The list holds one line for each
 * verse, so a word used 53 times in 45 verses has a complete list of 45; only
 * a list that reached the cap is cut short.
 */
export function occurrenceLine(n: number, listed: number, lang: "H" | "G"): string {
  const where = lang === "H" ? "the Hebrew Old Testament" : "the Greek New Testament";
  const times = n === 1 ? "Once" : `${n.toLocaleString("en-US")} times`;
  if (n <= 1 || listed <= 0) return `${times} in ${where}.`;
  if (listed >= OCCURRENCE_LIST_CAP && n > listed) return `${times} in ${where}. The first ${listed} verses are listed.`;
  return `${times} in ${listed === 1 ? "one verse" : `${listed.toLocaleString("en-US")} verses`} of ${where}.`;
}

/**
 * Chapters set as poetry, one verse to a block and one clause to a line:
 * Psalms, Proverbs, Song of Solomon, Lamentations, and the speeches of Job
 * (chapters 3 to 41; its opening and closing are told in prose).
 */
const POETRY = new Set(["psalms", "proverbs", "song-of-solomon", "lamentations"]);
export const isPoetry = (slug: string, chapter: number): boolean =>
  POETRY.has(slug) || (slug === "job" && chapter >= 3 && chapter <= 41);

/**
 * A verse of poetry in lines. The Bible text in this repo carries no line
 * breaks, so the lines follow the translation's own punctuation: a new line
 * after each sentence and after each semicolon or colon, with any closing
 * quotation mark kept on the line it closes.
 */
export function poetryLines(text: string): string[] {
  // No lookbehind: older Safari cannot parse one, and a parse error would take the chunk with it.
  return text
    .replace(/([.;:!?][”’"']*)\s+/g, "$1\n")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** What "Copy verse" puts on the clipboard: the words, then the reference and the translation's name. */
export const BIBLE_TRANSLATION = "Berean Standard Bible";
export const verseCopyText = (text: string, bookName: string, chapter: number, verse: number): string =>
  `${text}\n${bookName} ${chapter}:${verse}, ${BIBLE_TRANSLATION}`;

/**
 * A range in a book's outline ("3-4" in a one-chapter book, "1:10-14",
 * "5-7" in a longer one) as the chapter and verse it opens at. A one-chapter
 * book counts its outline in verses, so "3-4" in Jude is verses 3 to 4.
 */
export function outlineTarget(range: string, chapters: number): { chapter: number; verse?: number } {
  const cv = range.match(/^(\d+):(\d+)/);
  if (cv) return { chapter: +cv[1], verse: +cv[2] };
  const first = parseInt(range, 10);
  if (!Number.isFinite(first)) return { chapter: 1 };
  return chapters === 1 ? { chapter: 1, verse: first } : { chapter: first };
}

/** "Jhn.3.16" or "Jhn.3.16-18" -> a link target and a readable label. */
export function parseRef(ref: string, books: BibleBook[]): { slug: string; chapter: number; verse: number; label: string } | null {
  const m = ref.match(/^([1-3]?[A-Za-z]{2,3})\.(\d+)\.(\d+)(?:-(\d+))?$/);
  if (!m) return null;
  const book = books.find((b) => b.code === m[1]);
  if (!book) return null;
  const chapter = +m[2];
  const verse = +m[3];
  return { slug: book.slug, chapter, verse, label: `${book.name} ${chapter}:${verse}${m[4] ? `–${m[4]}` : ""}` };
}

export const chapterHref = (slug: string, chapter: number, verse?: number) =>
  `/study/bible/${slug}/${chapter}${verse ? `#v${verse}` : ""}`;

/** Keep only <b>, <i>, <br> in lexicon definitions (the build already does; this is the second lock). */
export function safeDefinition(html: string): string {
  return html.replace(/<(?!\/?(?:b|i)>|br>)[^>]*>/gi, "");
}

/** The editions a Greek word appears in, and the ones it does not, for the variant note. */
const EDITIONS = ["NA28", "NA27", "Tyn", "SBL", "WH", "Treg", "TR", "Byz"];
const EDITION_NAMES: Record<string, string> = {
  NA28: "Nestle-Aland 28",
  NA27: "Nestle-Aland 27",
  Tyn: "Tyndale House",
  SBL: "SBL Greek NT",
  WH: "Westcott-Hort",
  Treg: "Tregelles",
  TR: "Textus Receptus",
  Byz: "Byzantine",
};
export function editionSplit(editions?: string): { in: string[]; out: string[] } | null {
  if (!editions) return null;
  const has = new Set(editions.split("+").map((s) => s.trim()));
  return {
    in: EDITIONS.filter((e) => has.has(e)).map((e) => EDITION_NAMES[e]),
    out: EDITIONS.filter((e) => !has.has(e)).map((e) => EDITION_NAMES[e]),
  };
}
