/**
 * The Study Bible's authored layer (docs/BIBLE-NOTES-SPEC.md): book
 * introductions, chapter notes, the one-story path, and the doctrine
 * vocabulary, plus the helpers that tie them to the rest of LiveWell.
 *
 * Files live in /bible/: notes/<slug>/intro.json, notes/<slug>/<n>.json,
 * notes/<slug>/verses/<n>.json (verse by verse), story.json, doctrines.json,
 * doctrines/<id>.json (the doctrine studies), and the generated
 * notes-index.json and doctrine-verses/<id>.json (built by
 * scripts/build-bible-notes-index.mjs).
 */
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";
import { parseScriptureRef, type ScriptureRef } from "@/lib/scripture-ref";
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
  /** Version 2: the book's textual history, how it has been read, and graded further reading. */
  v?: number;
  text?: string;
  reception?: string;
  furtherReading?: { tier: "first" | "pastor" | "scholar"; author: string; title: string; series?: string; year?: number; note: string }[];
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
  hard?: HardQuestion | HardQuestion[];
  questions: string[] | { observe: string[]; interpret: string[]; apply: string[] };
  /** Version 2: how the chapter has been read, the text, and help for teaching it. */
  v?: number;
  interpretation?: string;
  text?: string;
  teach?: { big: string; outline: { v: string; t: string }[]; pitfalls: string; pastoral?: string };
}

export interface HardQuestion {
  q: string;
  a: string;
}

/** One or two hard questions, whichever shape the note uses. */
export const hardQuestions = (n: ChapterNote): HardQuestion[] => (n.hard == null ? [] : Array.isArray(n.hard) ? n.hard : [n.hard]);

/** One entry of a chapter's verse-by-verse notes (one to six verses). */
export interface VerseNote {
  v: string;
  context: string;
  grammar?: string;
  words?: string[];
  history?: string;
  theology?: { id: string; note: string }[];
  text?: string;
  refs?: string[];
  /** A New Testament verse's Old Testament source, or an Old Testament verse's New Testament use. */
  ot?: { ref: string; note: string }[];
  nt?: { ref: string; note: string }[];
  parallels?: string[];
}

export interface DoctrineStudy {
  id: string;
  definition: string;
  ot: string;
  nt: string;
  keyTexts: { ref: string; why: string }[];
  history: string;
  differ: { view: string; body: string }[];
  errors: string;
  life: string;
  questions: string[];
}

/** A verse note that teaches a doctrine, from doctrine-verses/<id>.json. */
export interface DoctrineVerse {
  k: string;
  v: string;
  note: string;
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
  locus: string;
}

export interface Locus {
  id: string;
  name: string;
}

export interface NotesIndex {
  /** Chapter titles per book, index 0 = chapter 1; null where no note exists yet. */
  titles: Record<string, (string | null)[]>;
  taglines: Record<string, string>;
  /** Doctrine id → "slug/chapter" keys, in canonical order. */
  doctrines: Record<string, string[]>;
  /** Doctrine id → how many verse notes teach it. */
  doctrineVerses: Record<string, number>;
  /** "slug/chapter" keys that have verse-by-verse notes. */
  withVerses: string[];
  /** "slug/chapter" keys that have a passage guide at /theology/passage. */
  passages: string[];
}

const obj = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);
const isIntro = (x: unknown): x is BookIntro => obj(x) && typeof x.overview === "string" && Array.isArray(x.structure);
const isNote = (x: unknown): x is ChapterNote => obj(x) && typeof x.title === "string" && Array.isArray(x.outline);
const isStory = (x: unknown): x is Story => obj(x) && Array.isArray(x.acts);
const isStoryline = (x: unknown): x is { acts: StorylineAct[] } => obj(x) && Array.isArray(x.acts);
const isDoctrines = (x: unknown): x is { doctrines: Doctrine[]; loci: Locus[] } => obj(x) && Array.isArray(x.doctrines) && Array.isArray(x.loci);
const isVerses = (x: unknown): x is { verses: VerseNote[] } => obj(x) && Array.isArray(x.verses);
const isStudy = (x: unknown): x is DoctrineStudy => obj(x) && typeof x.definition === "string" && Array.isArray(x.keyTexts);
const isDoctrineVerses = (x: unknown): x is { verses: DoctrineVerse[] } => obj(x) && Array.isArray(x.verses);
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
export const fetchLoci = () => cached("/bible/doctrines.json", isDoctrines).then((d) => d.loci);
export const fetchVerseNotes = (slug: string, chapter: number) => cached(`/bible/notes/${slug}/verses/${chapter}.json`, isVerses).then((d) => d.verses);
export const fetchStudy = (id: string) => cached(`/bible/doctrines/${id}.json`, isStudy);
export interface GuideIndex {
  groups: { id: string; name: string; intro?: string; guides: { id: string; title: string; summary: string }[] }[];
}

export interface Guide {
  id: string;
  title: string;
  summary: string;
  sections: { h: string; body: string; table?: { caption?: string; columns: string[]; rows: string[][] }; refs?: string[] }[];
}

const isGuideIndex = (x: unknown): x is GuideIndex => obj(x) && Array.isArray(x.groups);
const isGuide = (x: unknown): x is Guide => obj(x) && typeof x.title === "string" && Array.isArray(x.sections);
export const fetchGuideIndex = () => cached("/bible/guides/index.json", isGuideIndex);
export const fetchGuide = (id: string) => cached(`/bible/guides/${id}.json`, isGuide);
export const fetchDoctrineVerses = (id: string) => cached(`/bible/doctrine-verses/${id}.json`, isDoctrineVerses).then((d) => d.verses);

/** The verse-note entry that covers a verse. */
export function noteForVerse(notes: VerseNote[], verse: number): VerseNote | null {
  return notes.find((n) => {
    const [a, z] = verseRange(n.v);
    return verse >= a && verse <= z;
  }) ?? null;
}

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

/** The longest opening stretch of the text that reads as a reference, cut where a word or number ends. */
function leadingRef(text: string): ScriptureRef | null {
  const s = text.trim();
  for (let end = s.length; end > 0; end--) {
    if (end < s.length && /[A-Za-z0-9]/.test(s[end])) continue;
    const r = parseScriptureRef(s.slice(0, end));
    if (r) return r;
  }
  return null;
}

/**
 * "Psalm 139:1-4", "Daniel 1 and 6", "Romans 8–9", "1 Cor. 13" → the book's
 * slug and every chapter the reference touches. A catalogue line can run on
 * into prose ("Acts 2 (Pentecost)", "Genesis 1:5. The day") or a second
 * reference ("Proverbs 16:33 and 21:1"): the reference it opens with names the
 * book, and each "and" that goes on in the same book adds its chapters; an
 * "and" that names another book ("and 2 Peter 3:9") ends it. Null when it does
 * not open with a reference (read by lib/scripture-ref.ts).
 */
export function refChapters(ref: string): { slug: string; chapters: number[] } | null {
  const [head, ...more] = ref.split(/\s+and\s+/);
  const lead = leadingRef(head);
  if (!lead) return null;
  const spans = [...lead.parts];
  for (const piece of more) {
    // "16:33 and 21:1" goes on in the book; "and 2 Peter 3:9" names another.
    const next = /^\d/.test(piece) && !leadingRef(piece) ? leadingRef(`${lead.book.name} ${piece}`) : null;
    if (!next) break;
    spans.push(...next.parts);
  }
  const chapters = new Set<number>();
  for (const p of spans) for (let c = p.c1; c <= p.c2; c++) chapters.add(c);
  return { slug: lead.book.slug, chapters: Array.from(chapters).sort((a, b) => a - b) };
}

/** Catalogue items whose Scripture references touch this book (and chapter, when given). */
export function itemsForPassage(items: CatalogueItem[], slug: string, chapter?: number): CatalogueItem[] {
  return items.filter((it) =>
    (it.scripture ?? []).some((ref) => {
      const r = refChapters(ref);
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
