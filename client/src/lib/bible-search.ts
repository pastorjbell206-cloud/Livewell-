/**
 * The Bible word search: "born again" finds John 3:3.
 *
 * The words of the Berean Standard Bible sit in eight static files under
 * /bible/search/ (scripts/build-bible-search.mjs). Nothing here is fetched
 * until someone searches; then the files load once, are kept for the visit,
 * and every search after that is a scan in memory.
 *
 * Matching is by whole words, the way a concordance works: "love" finds
 * "love" and not "loved" or "glove". Verses holding the words together, in
 * order, come first; verses holding every word somewhere come after them.
 * Within each group the order is the Bible's own.
 */
import { fetchJson } from "@/lib/fetch-json";
import type { BibleBook } from "@/lib/bible";

interface SearchIndex {
  shards: { file: string; books: string[] }[];
}
interface SearchShard {
  books: { slug: string; chapters: string[][] }[];
}

export interface BibleHit {
  /** The book's place in the canon (0 is Genesis). */
  book: number;
  slug: string;
  chapter: number;
  verse: number;
  text: string;
  /** The words stand together in this verse, in the order typed. */
  phrase: boolean;
}

export interface BibleSearchResult {
  words: string[];
  hits: BibleHit[];
  /** How many of the hits hold the words together (they come first). */
  phraseCount: number;
}

interface Corpus {
  slug: string[];
  book: Uint8Array;
  chapter: Uint8Array;
  verse: Uint8Array;
  text: string[];
  /** Each verse lowercased with punctuation gone, a space at each end. */
  norm: string[];
}

/** Lowercase, apostrophes dropped, everything else that is not a letter or digit to one space. */
export function normalizeVerse(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const searchWordsOf = (q: string): string[] => normalizeVerse(q).split(" ").filter(Boolean);

const isIndex = (x: unknown): x is SearchIndex =>
  typeof x === "object" && x !== null && Array.isArray((x as SearchIndex).shards) && (x as SearchIndex).shards.every((s) => typeof s?.file === "string");
const isShard = (x: unknown): x is SearchShard =>
  typeof x === "object" && x !== null && Array.isArray((x as SearchShard).books) && (x as SearchShard).books.every((b) => typeof b?.slug === "string" && Array.isArray(b.chapters));

/** The loaded files as flat lists, in the Bible's order. */
export function buildCorpus(shards: SearchShard[], books: Pick<BibleBook, "slug">[]): Corpus {
  const order = new Map(books.map((b, i) => [b.slug, i] as const));
  const all = shards.flatMap((s) => s.books).sort((a, b) => (order.get(a.slug) ?? 99) - (order.get(b.slug) ?? 99));
  const total = all.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.length, 0), 0);
  const corpus: Corpus = { slug: all.map((b) => b.slug), book: new Uint8Array(total), chapter: new Uint8Array(total), verse: new Uint8Array(total), text: new Array(total), norm: new Array(total) };
  let i = 0;
  all.forEach((b, bi) => {
    b.chapters.forEach((verses, ci) => {
      verses.forEach((t, vi) => {
        corpus.book[i] = bi;
        corpus.chapter[i] = ci + 1;
        corpus.verse[i] = vi + 1;
        corpus.text[i] = t;
        corpus.norm[i] = ` ${normalizeVerse(t)} `;
        i++;
      });
    });
  });
  return corpus;
}

let loading: Promise<Corpus> | null = null;

/** Loads the Bible's words once; a failed load is forgotten so "Try again" can try again. */
export function loadBibleCorpus(books: Pick<BibleBook, "slug">[]): Promise<Corpus> {
  if (!loading) {
    loading = fetchJson("/bible/search/index.json", isIndex)
      .then((index) => Promise.all(index.shards.map((s) => fetchJson(`/bible/search/${s.file}`, isShard))))
      .then((shards) => buildCorpus(shards, books))
      .catch((e) => {
        loading = null;
        throw e;
      });
  }
  return loading;
}

/** Every verse that holds the query's words, the ones holding them together first. */
export function searchCorpus(corpus: Corpus, query: string): BibleSearchResult {
  const words = searchWordsOf(query);
  if (!words.length) return { words, hits: [], phraseCount: 0 };
  const phrase = ` ${words.join(" ")} `;
  const padded = words.map((w) => ` ${w} `);
  const together: BibleHit[] = [];
  const apart: BibleHit[] = [];
  for (let i = 0; i < corpus.norm.length; i++) {
    const n = corpus.norm[i];
    let all = true;
    for (const w of padded) if (!n.includes(w)) { all = false; break; }
    if (!all) continue;
    const isPhrase = words.length === 1 || n.includes(phrase);
    (isPhrase ? together : apart).push({ book: corpus.book[i], slug: corpus.slug[corpus.book[i]], chapter: corpus.chapter[i], verse: corpus.verse[i], text: corpus.text[i], phrase: isPhrase });
  }
  return { words, hits: [...together, ...apart], phraseCount: together.length };
}

/**
 * A verse's text cut into pieces, the query's words flagged so the page can
 * set them apart. Works on the printed text: a word matches whole, whatever
 * its capitals, with or without an apostrophe inside it ("LORD's" for "lords").
 */
export function highlightParts(text: string, words: string[]): { text: string; hit: boolean }[] {
  if (!words.length) return [{ text, hit: false }];
  const want = new Set(words);
  const out: { text: string; hit: boolean }[] = [];
  const re = /[A-Za-z0-9]+(?:[’'`][A-Za-z0-9]+)*/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (!want.has(normalizeVerse(m[0]))) continue;
    if (m.index > last) out.push({ text: text.slice(last, m.index), hit: false });
    out.push({ text: m[0], hit: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), hit: false });
  return out;
}
