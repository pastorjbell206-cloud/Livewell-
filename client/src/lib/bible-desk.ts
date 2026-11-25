/**
 * What the Study Bible keeps on the reader's own device, beyond the chapters
 * marked read (lib/bible-notes.ts, livewell-progress-bible). Everything goes
 * through lib/storage.ts, so a corrupt value is skipped and a refused write is
 * reported, never hidden. Nothing here leaves the browser.
 *
 *   livewell-chapter-view    "read" or "study": the view a chapter opens in
 *   livewell-bible-last      the chapter last opened, for "Try it on ..."
 *   livewell-marks-v1        highlights and notes on verses
 *   livewell-study-walk-v1   the guided study: the step reached and what was
 *                            written, per chapter
 */
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);
const isStr = (x: unknown): x is string => typeof x === "string";

// ── the view a chapter opens in ─────────────────────────────────────────────

export type ChapterView = "read" | "study";
export const VIEW_KEY = "livewell-chapter-view";
const isView = (x: unknown): x is ChapterView => x === "read" || x === "study";

/** The reader's chosen view, or null on a first visit (no choice made yet). */
export const readView = (): ChapterView | null => readStoredJSON<ChapterView | null>(VIEW_KEY, (x): x is ChapterView | null => x === null || isView(x), null);
export const writeView = (v: ChapterView): boolean => writeStoredJSON(VIEW_KEY, v);

// ── the chapter last opened ─────────────────────────────────────────────────

export interface LastChapter {
  slug: string;
  chapter: number;
  /** "John 3", "Psalm 23". */
  label: string;
}
export const LAST_KEY = "livewell-bible-last";
const isLast = (x: unknown): x is LastChapter => isObj(x) && isStr(x.slug) && typeof x.chapter === "number" && isStr(x.label);
export const readLastChapter = (): LastChapter | null => readStoredJSON<LastChapter | null>(LAST_KEY, (x): x is LastChapter | null => x === null || isLast(x), null);
export const writeLastChapter = (c: LastChapter): boolean => writeStoredJSON(LAST_KEY, c);

// ── highlights and notes ────────────────────────────────────────────────────

/** The three quiet colours a verse can be marked in (tokens --mark-a, -b, -c in index.css). */
export type MarkColor = "a" | "b" | "c";
export const MARK_COLORS: { id: MarkColor; name: string }[] = [
  { id: "a", name: "Gold" },
  { id: "b", name: "Sage" },
  { id: "c", name: "Blue" },
];

export interface Mark {
  /** The verse, by the book's code: "jhn.3.16" (TOOLS-PLAN B.2). */
  ref: string;
  /** The book's address and the verse's name, so a list needs no other file. */
  slug: string;
  chapter: number;
  verse: number;
  /** "John 3:16". */
  label: string;
  color?: MarkColor;
  note?: string;
  /** ISO time of the last change. */
  updated: string;
}

export const MARKS_KEY = "livewell-marks-v1";
const isColor = (x: unknown): x is MarkColor => x === "a" || x === "b" || x === "c";
const isMark = (x: unknown): x is Mark =>
  isObj(x) &&
  isStr(x.ref) &&
  isStr(x.slug) &&
  typeof x.chapter === "number" &&
  typeof x.verse === "number" &&
  isStr(x.label) &&
  isStr(x.updated) &&
  (x.color === undefined || isColor(x.color)) &&
  (x.note === undefined || isStr(x.note));

export const markRef = (code: string, chapter: number, verse: number) => `${code.toLowerCase()}.${chapter}.${verse}`;

export const readMarks = (): Mark[] => readStoredJSON(MARKS_KEY, isArrayOf(isMark), []);

/** This chapter's marks, by verse number. */
export function chapterMarks(marks: Mark[], slug: string, chapter: number): Map<number, Mark> {
  const out = new Map<number, Mark>();
  for (const m of marks) if (m.slug === slug && m.chapter === chapter) out.set(m.verse, m);
  return out;
}

/**
 * Sets one verse's colour and note (undefined clears that part). A mark with
 * neither is removed. Returns the new list and whether the device kept it.
 */
export function saveMark(
  marks: Mark[],
  where: Omit<Mark, "color" | "note" | "updated">,
  change: { color?: MarkColor; note?: string },
  now: string = new Date().toISOString()
): { marks: Mark[]; saved: boolean } {
  const rest = marks.filter((m) => m.ref !== where.ref);
  const note = change.note?.trim() ? change.note : undefined;
  const next: Mark[] = change.color || note ? [...rest, { ...where, color: change.color, note, updated: now }] : rest;
  // JSON drops undefined fields, so a stored mark holds only what it has.
  return { marks: next, saved: writeStoredJSON(MARKS_KEY, next) };
}

export function removeMark(marks: Mark[], ref: string): { marks: Mark[]; saved: boolean } {
  const next = marks.filter((m) => m.ref !== ref);
  return { marks: next, saved: writeStoredJSON(MARKS_KEY, next) };
}

// ── the guided study ────────────────────────────────────────────────────────

export interface WalkEntry {
  /** The step the reader is on, 0 to 6. */
  step: number;
  /** What they wrote at step 2 (Notice) and step 7 (What it asks of you). */
  notice?: string;
  respond?: string;
  /** "John 3". */
  label: string;
  updated: string;
}
export const WALK_KEY = "livewell-study-walk-v1";
const isWalk = (x: unknown): x is WalkEntry =>
  isObj(x) && typeof x.step === "number" && isStr(x.label) && isStr(x.updated) && (x.notice === undefined || isStr(x.notice)) && (x.respond === undefined || isStr(x.respond));
const isWalks = (x: unknown): x is Record<string, WalkEntry> => isObj(x) && Object.values(x).every(isWalk);

/** Every chapter's guided study, by "slug/chapter". */
export const readWalks = (): Record<string, WalkEntry> => readStoredJSON(WALK_KEY, isWalks, {});

export function saveWalk(key: string, entry: WalkEntry): boolean {
  return writeStoredJSON(WALK_KEY, { ...readWalks(), [key]: entry });
}

export function removeWalk(key: string): boolean {
  const all = readWalks();
  delete all[key];
  return writeStoredJSON(WALK_KEY, all);
}
