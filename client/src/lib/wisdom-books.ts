/**
 * The Wisdom Books Explorer's data (/tools/wisdom-books): the files
 * scripts/build-wisdom-books-index.mjs writes under
 * client/public/wisdom-books/<book>/ for Proverbs and Ecclesiastes. Every
 * verse is the BSB as the repo holds it; every chapter title, summary,
 * outline and teaching paragraph is the Study Bible's own note on the book,
 * word for word.
 */
import { fetchJson } from "@/lib/fetch-json";

export interface WbTheme {
  id: string;
  name: string;
  line: string;
  count: number;
  /** The Study Bible introduction's theme this one draws on. */
  note?: { title: string; body: string };
  deeper: { id: string; label: string }[];
}

export interface WbChapterHead {
  n: number;
  title: string;
  summary: string;
  verses: number;
}

export interface WbIndex {
  book: string;
  verses: number;
  themes: WbTheme[];
  chapters: WbChapterHead[];
  teaching: {
    reading: string[];
    /** Proverbs: the hard question on 26:4-5, with the two verses. */
    pair?: { refs: string; verses: { c: number; v: number; t: string }[]; q: string; a: string[] };
    /** Ecclesiastes: the hard questions on the chapters its source names. */
    hard?: { c: number; q: string; a: string[] }[];
  };
}

export interface WbVerse {
  v: number;
  t: string;
  /** Theme ids; "heading" marks a collection's heading. */
  themes: string[];
}

export interface WbChapter {
  n: number;
  title: string;
  summary: string;
  outline: { v: string; t: string }[];
  verses: WbVerse[];
}

export interface WbThemeFile {
  id: string;
  name: string;
  verses: { c: number; v: number; t: string }[];
}

export type WbBook = "proverbs" | "ecclesiastes";
export const WB_BOOKS: { id: WbBook; name: string; chapters: number }[] = [
  { id: "proverbs", name: "Proverbs", chapters: 31 },
  { id: "ecclesiastes", name: "Ecclesiastes", chapters: 12 },
];
export const bookName = (b: WbBook) => (b === "ecclesiastes" ? "Ecclesiastes" : "Proverbs");
export const bookChapters = (b: WbBook) => (b === "ecclesiastes" ? 12 : 31);

const base = (b: WbBook) => `/wisdom-books/${b}`;

const isIndex = (x: unknown): x is WbIndex => {
  const d = x as WbIndex;
  return !!d && Array.isArray(d.themes) && Array.isArray(d.chapters) && !!d.teaching && Array.isArray(d.teaching.reading);
};
const isChapter = (x: unknown): x is WbChapter => {
  const d = x as WbChapter;
  return !!d && typeof d.n === "number" && Array.isArray(d.verses) && Array.isArray(d.outline);
};
const isThemeFile = (x: unknown): x is WbThemeFile => {
  const d = x as WbThemeFile;
  return !!d && typeof d.id === "string" && Array.isArray(d.verses);
};

export const fetchWbIndex = (b: WbBook = "proverbs") => fetchJson(`${base(b)}/index.json`, isIndex);
export const fetchWbChapter = (n: number, b: WbBook = "proverbs") => fetchJson(`${base(b)}/chapter/${n}.json`, isChapter);
export const fetchWbTheme = (id: string, b: WbBook = "proverbs") => fetchJson(`${base(b)}/theme/${encodeURIComponent(id)}.json`, isThemeFile);

/** Today's chapter: the day of the month (Proverbs has 31 chapters). */
export function todaysChapter(d = new Date()): number {
  return Math.min(31, Math.max(1, d.getDate()));
}

/** The verse-range keys of a chapter's outline ("4-5") as numbers, for grouping. */
export function outlineStart(v: string): number {
  const n = Number(/^(\d+)/.exec(v)?.[1]);
  return Number.isFinite(n) ? n : 1;
}

/** The Study Bible's page for a chapter of the book, at a verse or at its notes. */
export const studyHref = (c: number, v?: number, b: WbBook = "proverbs") => `/study/bible/${b}/${c}${v ? `#v${v}` : "#notes"}`;
