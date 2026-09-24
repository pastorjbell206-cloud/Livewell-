/**
 * The Study Bible's authored layer (docs/BIBLE-NOTES-SPEC.md): book
 * introductions, chapter notes, the one-story path, and the doctrine
 * vocabulary, plus the helpers that tie them to the rest of LiveWell.
 *
 * Files live in /bible/: notes/<slug>/intro.json, notes/<slug>/<n>.json,
 * story.json, doctrines.json, and notes-index.json (chapter titles, doctrine
 * lists, passage guides; built by scripts/build-bible-notes-index.mjs).
 */
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";
import type { BibleBook } from "@/lib/bible";
import type { CatalogueItem } from "@/lib/catalogue";

export interface BookIntro {
  tagline: string;
  overview: string;
  author: string;
  date: string;
  setting: string;
  purpose: string;
  story: string;
  christ: string;
  reading: string;
  structure: { range: string; title: string; summary: string }[];
  themes: { title: string; body: string }[];
  doctrines: string[];
  keyChapters: { ch: number; why: string }[];
}

export interface ChapterNote {
  title: string;
  summary: string;
  story: string;
  historical: string;
  cultural: string;
  literary: string;
  outline: { v: string; t: string }[];
  doctrines: { id: string; note: string }[];
  words: { s: string; note: string }[];
  christ: string;
  hard?: { q: string; a: string };
  questions: string[];
}

export interface StoryAct {
  id: string;
  dates: string;
  world: string;
  watch: string;
  people: string[];
  path: { book: string; from: number; to: number }[];
}

export interface Story {
  intro: string;
  acts: StoryAct[];
}

/** The site's existing storyline (/theology/biblical-theology-storyline.json). */
export interface StorylineAct {
  id: string;
  act: string;
  title: string;
  range: string;
  summary: string;
  turning: string;
  pointsForward: string;
}

export interface Doctrine {
  id: string;
  name: string;
  page: string | null;
  summary: string;
  terms: string;
}

export interface NotesIndex {
  /** Chapter titles per book, index 0 = chapter 1; null where no note exists yet. */
  titles: Record<string, (string | null)[]>;
  taglines: Record<string, string>;
  /** Doctrine id → "slug/chapter" keys, in canonical order. */
  doctrines: Record<string, string[]>;
  /** "slug/chapter" keys that have a passage guide at /theology/passage. */
  passages: string[];
}

const obj = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);
const isIntro = (x: unknown): x is BookIntro => obj(x) && typeof x.overview === "string" && Array.isArray(x.structure);
const isNote = (x: unknown): x is ChapterNote => obj(x) && typeof x.title === "string" && Array.isArray(x.outline);
const isStory = (x: unknown): x is Story => obj(x) && Array.isArray(x.acts);
const isStoryline = (x: unknown): x is { acts: StorylineAct[] } => obj(x) && Array.isArray(x.acts);
const isDoctrines = (x: unknown): x is { doctrines: Doctrine[] } => obj(x) && Array.isArray(x.doctrines);
const isIndex = (x: unknown): x is NotesIndex => obj(x) && obj(x.titles) && obj(x.doctrines);

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

export const fetchIntro = (slug: string) => cached(`/bible/notes/${slug}/intro.json`, isIntro);
export const fetchNote = (slug: string, chapter: number) => cached(`/bible/notes/${slug}/${chapter}.json`, isNote);
export const fetchStory = () => cached("/bible/story.json", isStory);
export const fetchStoryline = () => cached("/theology/biblical-theology-storyline.json", isStoryline).then((s) => s.acts);
export const fetchDoctrines = () => cached("/bible/doctrines.json", isDoctrines).then((d) => d.doctrines);
export const fetchNotesIndex = () => cached("/bible/notes-index.json", isIndex);

// ── the story path ───────────────────────────────────────────────────────────

export interface PathStep {
  slug: string;
  chapter: number;
  act: string;
}

/** Every chapter of the Bible in story order. */
export function flattenStory(story: Story): PathStep[] {
  const out: PathStep[] = [];
  for (const act of story.acts)
    for (const r of act.path)
      for (let c = r.from; c <= r.to; c++) out.push({ slug: r.book, chapter: c, act: act.id });
  return out;
}

/** Where a chapter sits in the story, and the chapters on either side of it. */
export function storyPlace(steps: PathStep[], slug: string, chapter: number) {
  const i = steps.findIndex((s) => s.slug === slug && s.chapter === chapter);
  if (i < 0) return null;
  return { index: i, step: steps[i], prev: steps[i - 1] ?? null, next: steps[i + 1] ?? null, total: steps.length };
}

// ── reading progress (this browser only) ─────────────────────────────────────

const PROGRESS_KEY = "livewell-progress-bible";
const isProgress = (x: unknown): x is string[] => Array.isArray(x) && x.every((s) => typeof s === "string");

export function readProgress(): Set<string> {
  return new Set(readStoredJSON<string[]>(PROGRESS_KEY, isProgress, []));
}

/** Mark a chapter read or unread; false when the browser won't store it. */
export function setRead(key: string, read: boolean): boolean {
  const s = readProgress();
  if (read) s.add(key);
  else s.delete(key);
  return writeStoredJSON(PROGRESS_KEY, Array.from(s));
}

// ── Scripture references in the rest of the site ────────────────────────────

const ALIASES: Record<string, string> = {
  psalm: "psalms", ps: "psalms", psa: "psalms",
  "song of songs": "song-of-solomon", "song of solomon": "song-of-solomon", song: "song-of-solomon", canticles: "song-of-solomon",
  qoheleth: "ecclesiastes", eccl: "ecclesiastes", eccles: "ecclesiastes",
  gen: "genesis", ex: "exodus", exod: "exodus", lev: "leviticus", num: "numbers", deut: "deuteronomy",
  josh: "joshua", judg: "judges", isa: "isaiah", jer: "jeremiah", lam: "lamentations", ezek: "ezekiel", dan: "daniel",
  hos: "hosea", obad: "obadiah", mic: "micah", nah: "nahum", hab: "habakkuk", zeph: "zephaniah", hag: "haggai",
  zech: "zechariah", mal: "malachi", matt: "matthew", mt: "matthew", mk: "mark", lk: "luke", jn: "john",
  rom: "romans", gal: "galatians", eph: "ephesians", phil: "philippians", col: "colossians", heb: "hebrews",
  jas: "james", rev: "revelation", revelations: "revelation", philem: "philemon",
};

/** Book-name → slug, built once from the Study Bible's table of contents. */
function bookLookup(books: BibleBook[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const b of books) {
    m.set(b.name.toLowerCase(), b.slug);
    m.set(b.slug.replace(/-/g, " "), b.slug);
  }
  for (const [k, v] of Object.entries(ALIASES)) m.set(k, v);
  // "1 Sam", "2 Cor", "1 Jn"
  const numbered: Record<string, string> = { sam: "samuel", kgs: "kings", ki: "kings", chr: "chronicles", chron: "chronicles", cor: "corinthians", thess: "thessalonians", thes: "thessalonians", tim: "timothy", pet: "peter", pt: "peter", jn: "john" };
  for (const n of ["1", "2", "3"]) for (const [k, v] of Object.entries(numbered)) if (m.has(`${n} ${v}`)) m.set(`${n} ${k}`, m.get(`${n} ${v}`)!);
  return m;
}

let lookupFor: BibleBook[] | null = null;
let lookup: Map<string, string> = new Map();

/**
 * "Psalm 139:1-4", "Daniel 1 and 6", "Romans 8–9", "1 Cor. 13" → the book's
 * slug and every chapter the reference touches. Null when it isn't a
 * reference to a book of the Bible.
 */
export function refChapters(ref: string, books: BibleBook[]): { slug: string; chapters: number[] } | null {
  if (lookupFor !== books) {
    lookup = bookLookup(books);
    lookupFor = books;
  }
  const s = ref.toLowerCase().replace(/\./g, "").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();
  const m = s.match(/^((?:[1-3] )?[a-z]+(?: of [a-z]+)?)\s+(\d+)(.*)$/);
  if (!m) return null;
  const slug = lookup.get(m[1]);
  if (!slug) return null;
  const book = books.find((b) => b.slug === slug);
  if (!book) return null;
  const first = +m[2];
  const chapters = new Set<number>([first]);
  const rest = m[3];
  // A chapter range "8-9" (not a verse range "8:1-4"), or "1 and 6".
  const range = rest.match(/^-(\d+)(?!:)/);
  if (range && !rest.startsWith(":")) for (let c = first + 1; c <= +range[1]; c++) chapters.add(c);
  const cross = rest.match(/^:\d+\s*-\s*(\d+):\d+/);
  if (cross) for (let c = first + 1; c <= +cross[1]; c++) chapters.add(c);
  for (const a of Array.from(rest.matchAll(/\band (\d+)\b/g))) chapters.add(+a[1]);
  const valid = Array.from(chapters).filter((c) => c >= 1 && c <= book.chapters).sort((a, b) => a - b);
  return valid.length ? { slug, chapters: valid } : null;
}

/** Catalogue items whose Scripture references touch this book (and chapter, when given). */
export function itemsForPassage(items: CatalogueItem[], books: BibleBook[], slug: string, chapter?: number): CatalogueItem[] {
  return items.filter((it) =>
    (it.scripture ?? []).some((ref) => {
      const r = refChapters(ref, books);
      return r !== null && r.slug === slug && (chapter === undefined || r.chapters.includes(chapter));
    })
  );
}

/** At most `perKind` of each kind, up to `max`, keeping the order given. */
export function spreadKinds(items: CatalogueItem[], max: number, perKind = 2): CatalogueItem[] {
  const seen = new Set<string>();
  const counts = new Map<string, number>();
  const out: CatalogueItem[] = [];
  for (const it of items) {
    const id = `${it.href}|${it.title}`;
    if (seen.has(id)) continue;
    const n = counts.get(it.kind) ?? 0;
    if (n >= perKind) continue;
    seen.add(id);
    counts.set(it.kind, n + 1);
    out.push(it);
    if (out.length >= max) break;
  }
  return out;
}

/** Paragraphs of an authored field ("\n\n" separated). */
export const paragraphs = (s: string | undefined) => (s ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

/** "1-5" → [1, 5]; "7" → [7, 7]. */
export function verseRange(v: string): [number, number] {
  const m = v.match(/^(\d+)(?:-(\d+))?$/);
  return m ? [+m[1], +(m[2] ?? m[1])] : [0, 0];
}

/** A link to other translations, which the site links to and never stores. */
export const translationHref = (bookName: string, chapter: number, version: string) =>
  `https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${bookName} ${chapter}`)}&version=${version}`;
