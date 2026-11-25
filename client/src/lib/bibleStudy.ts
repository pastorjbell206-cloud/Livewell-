/**
 * The two indexes over the Study Bible's own data that /study/word and
 * /study/cross-references read (scripts/lib/bible-study.mjs writes them and
 * says what each file holds). Every fetch is small: one bucket of a hundred
 * Strong's numbers, one page of a common word's verses, one two-letter list
 * of words, one chapter's cross-references.
 */
import { fetchJson } from "@/lib/fetch-json";
import { langOf } from "@/lib/bible";

const obj = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);
const list = (x: unknown): x is unknown[] => Array.isArray(x);
const nums = (x: unknown): x is number[] => list(x) && x.every((n) => typeof n === "number");

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

/* Words ---------------------------------------------------------------- */

/** One verse a word is used in: [book (0 to 65), chapter, verse, then the word's meanings there (indexes into `g`)]. */
export type WordRow = number[];

export interface WordUse {
  /** How many times the Study Bible's chapters hold the word. */
  n: number;
  /** [book (0 to 65), times in that book], in the Bible's order. */
  b: [number, number][];
  /** The meanings the Study Bible gives the word, verse by verse. */
  g: string[];
  /** Its verses, when there are few enough to carry here. */
  v?: WordRow[];
  /** Or: how many pages of verses, how many verses, and the row each book begins at. */
  p?: number;
  vn?: number;
  s?: [number, number][];
}

/** [Strong's number, the word, its transliteration, its meaning, times used]. */
export type FoundWord = [string, string, string, string, number];

export interface WordIndex {
  v: number;
  page: number;
  bucket: number;
  words: { H: number; G: number };
  /** The two-letter lists that exist. */
  find: string[];
  /** The buckets that exist: "G/0", "H/53". */
  buckets: string[];
}

const isUse = (x: unknown): x is WordUse => obj(x) && typeof x.n === "number" && list(x.b) && x.b.every(nums) && list(x.g) && (x.v === undefined || (list(x.v) && x.v.every(nums)));
const isBucket = (x: unknown): x is Record<string, WordUse> => obj(x) && Object.values(x).every(isUse);
const isRows = (x: unknown): x is WordRow[] => list(x) && x.every(nums);
const isFound = (x: unknown): x is FoundWord[] => list(x) && x.every((r) => list(r) && r.length === 5 && typeof r[0] === "string" && typeof r[4] === "number");
const isWordIndex = (x: unknown): x is WordIndex => obj(x) && typeof x.page === "number" && typeof x.bucket === "number" && obj(x.words) && list(x.find) && list(x.buckets);

export const WORD_BUCKET = 100;

/** "g26", "G0026", "H7225G" -> the Study Bible's own form of the number, or null when it is not one. */
export function strongKey(raw: string): string | null {
  const m = decodeURIComponent(raw).trim().match(/^([HhGg])0*(\d{1,4})([A-Za-z]?)$/);
  return m ? `${m[1].toUpperCase()}${m[2].padStart(4, "0")}${m[3].toUpperCase()}` : null;
}

/** "G0026" as a person writes it: "G26". */
export const strongLabel = (key: string) => key.replace(/^([HG])0+(?=\d)/, "$1");

export const wordHref = (key: string) => `/study/word/${key}`;

export const fetchWordIndex = () => cached("/bible/words/index.json", isWordIndex);

/** How the Study Bible's chapters use a word, or null when they hold no verse for it. */
export async function fetchWordUse(key: string, index: WordIndex): Promise<WordUse | null> {
  const lang = langOf(key);
  if (!lang) return null;
  const bucket = `${lang}/${Math.floor(parseInt(key.slice(1, 5), 10) / WORD_BUCKET)}`;
  // A stretch of numbers with no word in the text has no file: that is an answer, and it is not asked for.
  if (!index.buckets.includes(bucket)) return null;
  const shard = await cached(`/bible/words/occ/${bucket}.json`, isBucket);
  return shard[key] ?? null;
}

export const fetchWordPage = (key: string, page: number) => cached(`/bible/words/occ/${key[0]}/p/${key}-${page}.json`, isRows);

/** Letters only, without accents: the same folding the build files words under. */
export const foldWord = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, " ")
    .trim();

/**
 * The words a search finds: every word of the search must begin a word of
 * the meaning, or the whole search must begin the transliteration. A meaning
 * that is exactly the search comes first, then the words used most.
 */
export async function findWords(query: string, index: WordIndex): Promise<FoundWord[]> {
  const q = foldWord(query);
  const terms = q.split(" ").filter(Boolean);
  const first = terms.find((t) => t.length >= 2);
  if (!first) return [];
  const joined = q.replace(/ /g, "");
  const keys = new Set([first.slice(0, 2), joined.slice(0, 2)].filter((k) => index.find.includes(k)));
  const seen = new Map<string, FoundWord>();
  for (const k of Array.from(keys)) for (const row of await cached(`/bible/words/find/${k}.json`, isFound)) seen.set(row[0], row);
  const hit = (row: FoundWord) => {
    const meaning = foldWord(row[3]).split(" ");
    const tr = foldWord(row[2]).replace(/ /g, "");
    return terms.every((t) => meaning.some((w) => w.startsWith(t))) || tr.startsWith(joined);
  };
  const exact = (row: FoundWord) => (foldWord(row[3]) === q || foldWord(row[2]).replace(/ /g, "") === joined ? 0 : 1);
  return Array.from(seen.values())
    .filter(hit)
    .sort((a, b) => exact(a) - exact(b) || b[4] - a[4] || a[0].localeCompare(b[0]));
}

/** Words of a word-for-word meaning that say nothing of the word itself: "loyalty your" is marked at "loyalty", never at "your". */
const SMALL = new Set(
  "the and for you your yours his her hers him its our ours their them they that this these those with from into unto upon who whom whose which what when then there here have has had will shall was were been are not all one any may let according because before after over under about against among between".split(" "),
);
const LETTER = "A-Za-z\u00C0-\u024F";
const escapeRe = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * A verse's words with the word's own meaning marked where the sentence has
 * it. The meanings are the Study Bible's word-for-word ones ("he created",
 * "loyalty your"); the mark goes on a word of the meaning that the Berean
 * Standard Bible's sentence holds whole ("created"), small words aside.
 * Where the sentence has none ("kindness" for "loyalty"), nothing is marked:
 * the meaning is still shown beside the verse.
 */
export function markMeaning(text: string, meanings: string[]): { text: string; mark: boolean }[] {
  const words = Array.from(
    new Set(
      meanings
        .flatMap((m) => m.replace(/<[^>]*>/g, " ").replace(new RegExp(`[^${LETTER}' ]+`, "g"), " ").split(/\s+/))
        .filter((w) => w.length >= 3 && !SMALL.has(w.toLowerCase())),
    ),
  );
  if (!words.length) return [{ text, mark: false }];
  const re = new RegExp(`(^|[^${LETTER}'])(${words.map(escapeRe).join("|")})(?![${LETTER}])`, "gi");
  const out: { text: string; mark: boolean }[] = [];
  let at = 0;
  for (const m of Array.from(text.matchAll(re))) {
    const start = m.index! + m[1].length;
    if (start > at) out.push({ text: text.slice(at, start), mark: false });
    out.push({ text: m[2], mark: true });
    at = start + m[2].length;
  }
  if (at < text.length || !out.length) out.push({ text: text.slice(at), mark: false });
  return out;
}

/* Cross-references ------------------------------------------------------ */

export interface XrefExamples {
  v: number;
  /** Verses that have cross-references, and how many links there are in all. */
  verses: number;
  links: number;
  /** The verses the most other verses link to, counted from the data: [reference, how many, its words]. */
  examples: { ref: string; into: number; t: string }[];
}

const isXref = (x: unknown): x is Record<string, string[]> => obj(x) && Object.values(x).every((r) => list(r) && r.every((s) => typeof s === "string"));
const isExamples = (x: unknown): x is XrefExamples =>
  obj(x) && typeof x.verses === "number" && typeof x.links === "number" && list(x.examples) && x.examples.every((e) => obj(e) && typeof e.ref === "string" && typeof e.into === "number" && typeof e.t === "string");

export const fetchXrefExamples = () => cached("/bible/xref/examples.json", isExamples);

/** A chapter's cross-references by verse (every chapter has a file; one with no links holds none). */
export const fetchXref = (slug: string, chapter: number) => cached(`/bible/xref/${slug}/${chapter}.json`, isXref);
