/**
 * The four cross-book indexes of the Study Bible's book pages, read by
 * /study/timeline, /study/atlas, /study/words and /study/hard-passages.
 * scripts/lib/bible-explore.mjs writes them from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `teaching`), word for word;
 * each fetch has a shape guard, so a wrong file is a failed load and never a
 * half-drawn page.
 */
import { fetchJson } from "@/lib/fetch-json";
import type { MapFrameId, MapPlace } from "@/lib/bible-notes";

export interface ExploreBook {
  slug: string;
  name: string;
  testament: "OT" | "NT";
}

const obj = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null;
const str = (x: unknown): x is string => typeof x === "string";
const list = (x: unknown): x is unknown[] => Array.isArray(x);
const isBook = (x: unknown): x is ExploreBook => obj(x) && str(x.slug) && str(x.name) && (x.testament === "OT" || x.testament === "NT");
const hasBooks = (x: Record<string, unknown>) => list(x.books) && x.books.every(isBook) && list(x.without) && x.without.every(str);

/* The timeline ------------------------------------------------------- */

export type TimelineKind = "story" | "world" | "book";

export interface TimelineEntry {
  id: string;
  /** The book's slug. */
  book: string;
  /** The book's own words for when. */
  when: string;
  /** The book's own words for what. */
  what: string;
  kind: TimelineKind;
  /** The first year the book's "when" names (BC negative), or null. */
  year: number | null;
  /** How it was placed: by its own year, after the entry before it in its book, or not at all. */
  placed: "year" | "order" | "none";
  band: string;
  /** The chapter (and verse) of its own book that the entry names first, when it names one. */
  ch?: number;
  v?: number;
  /** The event it shares with entries in other books. */
  group?: string;
}

export interface TimelineData {
  v: number;
  books: ExploreBook[];
  /** Books whose pages have no timeline yet, by name. */
  without: string[];
  bands: { id: string; name: string }[];
  entries: TimelineEntry[];
  groups: { id: string; differ: boolean; entries: string[] }[];
}

const isEntry = (x: unknown): x is TimelineEntry =>
  obj(x) && str(x.id) && str(x.book) && str(x.when) && str(x.what) && str(x.band) && (x.kind === "story" || x.kind === "world" || x.kind === "book") && (x.year === null || typeof x.year === "number");

export const isTimeline = (x: unknown): x is TimelineData =>
  obj(x) &&
  hasBooks(x) &&
  list(x.bands) &&
  x.bands.every((b) => obj(b) && str(b.id) && str(b.name)) &&
  list(x.entries) &&
  x.entries.length > 0 &&
  x.entries.every(isEntry) &&
  list(x.groups) &&
  x.groups.every((g) => obj(g) && str(g.id) && typeof g.differ === "boolean" && list(g.entries));

/* The atlas ---------------------------------------------------------- */

export interface AtlasPlace {
  id: string;
  /** The ids the book pages file it under (the book map's own label table is keyed by these). */
  ids: string[];
  name: string;
  lat: number;
  lon: number;
  region?: boolean;
  /** The maps the book pages draw it on, each with the label placing its book gave. */
  frames: { frame: MapFrameId; label?: MapPlace["label"] }[];
  /** Each book that places it: the book's own name for it, its own sentence and references. */
  books: { slug: string; name: string; line: string; refs: string[] }[];
}

export interface AtlasData {
  v: number;
  books: ExploreBook[];
  without: string[];
  frames: MapFrameId[];
  places: AtlasPlace[];
}

export const isAtlas = (x: unknown): x is AtlasData =>
  obj(x) &&
  hasBooks(x) &&
  list(x.frames) &&
  x.frames.every(str) &&
  list(x.places) &&
  x.places.length > 0 &&
  x.places.every(
    (p) =>
      obj(p) &&
      str(p.id) &&
      str(p.name) &&
      typeof p.lat === "number" &&
      typeof p.lon === "number" &&
      list(p.frames) &&
      p.frames.every((f) => obj(f) && str(f.frame)) &&
      list(p.books) &&
      p.books.length > 0 &&
      p.books.every((b) => obj(b) && str(b.slug) && str(b.name) && str(b.line) && list(b.refs) && b.refs.every(str)),
  );

/* Key words ---------------------------------------------------------- */

export type WordLang = "hebrew" | "aramaic" | "greek";

export interface KeyWord {
  id: string;
  word: string;
  /** The languages its books' own sentences name; empty when they name none. */
  langs: WordLang[];
  testaments: ("OT" | "NT")[];
  entries: { book: string; word?: string; line: string; refs: { ch: number; v?: number }[] }[];
}

export interface WordsData {
  v: number;
  books: ExploreBook[];
  without: string[];
  words: KeyWord[];
}

export const isWords = (x: unknown): x is WordsData =>
  obj(x) &&
  hasBooks(x) &&
  list(x.words) &&
  x.words.length > 0 &&
  x.words.every(
    (w) =>
      obj(w) &&
      str(w.id) &&
      str(w.word) &&
      list(w.langs) &&
      list(w.testaments) &&
      list(w.entries) &&
      w.entries.length > 0 &&
      w.entries.every((e) => obj(e) && str(e.book) && str(e.line) && list(e.refs)),
  );

/* Hard passages ------------------------------------------------------ */

export interface HardItem {
  ch: number;
  v: number;
  ref: string;
  line: string;
}

export interface HardData {
  v: number;
  books: (ExploreBook & { items: HardItem[] })[];
  without: string[];
}

export const isHard = (x: unknown): x is HardData =>
  obj(x) &&
  list(x.without) &&
  list(x.books) &&
  x.books.length > 0 &&
  x.books.every(
    (b) => isBook(b) && list((b as unknown as { items: unknown }).items) && (b as unknown as { items: unknown[] }).items.every((i) => obj(i) && typeof i.ch === "number" && typeof i.v === "number" && str(i.ref) && str(i.line)),
  );

/* Fetching ----------------------------------------------------------- */

export const EXPLORE_FILES = {
  timeline: "/bible/explore/timeline.json",
  atlas: "/bible/explore/atlas.json",
  words: "/bible/explore/words.json",
  hard: "/bible/explore/hard-passages.json",
} as const;

export const fetchTimeline = () => fetchJson(EXPLORE_FILES.timeline, isTimeline);
export const fetchAtlas = () => fetchJson(EXPLORE_FILES.atlas, isAtlas);
export const fetchWords = () => fetchJson(EXPLORE_FILES.words, isWords);
export const fetchHard = () => fetchJson(EXPLORE_FILES.hard, isHard);

/** "Mark, Luke and John": a list of names in a sentence. */
export function nameList(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** "5:1" or "6:1-6" to that chapter of a book, at its first verse. */
export function refHref(slug: string, ref: string): string {
  const m = ref.match(/^(\d+):(\d+)/);
  return m ? `/study/bible/${slug}/${m[1]}#v${m[2]}` : `/study/bible/${slug}`;
}
