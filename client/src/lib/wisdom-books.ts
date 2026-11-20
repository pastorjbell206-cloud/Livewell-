/**
 * The Wisdom Books Explorer's data (/tools/wisdom-books): the files
 * scripts/build-wisdom-books-index.mjs writes under
 * client/public/wisdom-books/proverbs/. Every verse is the BSB as the repo
 * holds it; every chapter title, summary, outline and teaching paragraph is
 * the Study Bible's own note on Proverbs, word for word.
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
    pair: { refs: string; verses: { c: number; v: number; t: string }[]; q: string; a: string[] };
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

const BASE = "/wisdom-books/proverbs";

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

export const fetchWbIndex = () => fetchJson(`${BASE}/index.json`, isIndex);
export const fetchWbChapter = (n: number) => fetchJson(`${BASE}/chapter/${n}.json`, isChapter);
export const fetchWbTheme = (id: string) => fetchJson(`${BASE}/theme/${encodeURIComponent(id)}.json`, isThemeFile);

/** Today's chapter: the day of the month (Proverbs has 31 chapters). */
export function todaysChapter(d = new Date()): number {
  return Math.min(31, Math.max(1, d.getDate()));
}

/** The verse-range keys of a chapter's outline ("4-5") as numbers, for grouping. */
export function outlineStart(v: string): number {
  const n = Number(/^(\d+)/.exec(v)?.[1]);
  return Number.isFinite(n) ? n : 1;
}

/** The Study Bible's page for a chapter of Proverbs, at a verse or at its notes. */
export const studyHref = (c: number, v?: number) => `/study/bible/proverbs/${c}${v ? `#v${v}` : "#notes"}`;
