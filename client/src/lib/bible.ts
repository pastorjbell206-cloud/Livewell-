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

export const fetchBooks = () => cached("/bible/books.json", isArray);
export const fetchChapter = (slug: string, chapter: number) => cached(`/bible/ch/${slug}/${chapter}.json`, isChapter);
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
