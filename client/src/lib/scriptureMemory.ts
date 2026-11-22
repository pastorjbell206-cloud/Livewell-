/**
 * Memorize Scripture (/tools/scripture-memory): what is kept on this device,
 * when a verse comes back for review, and how its words are hidden a few at
 * a time.
 *
 * A verse being learned has a stage and a date it is next due. Recalled, it
 * moves up a stage and comes back after 1, 3, 7, 14 and then 30 days; missed,
 * it starts again tomorrow. After the 30-day review it is counted as known
 * and still returns every 30 days. Nothing leaves the device.
 *
 * The verses' words are the Berean Standard Bible's: the forty in the sets
 * come from data/memory-verses.json (scripts/build-memory-verses.mjs), a
 * verse the reader adds is read from the site's own Bible files, and the
 * family catechism's verses are the ones its data already carries.
 */
import { fetchChapterText } from "./bible";
import { formatRef, parseScriptureRef } from "./scripture-ref";
import { readStoredJSON, writeStoredJSON } from "./storage";

export const MEMORY_KEY = "livewell-progress-scripture-memory-v2";
/** The first version kept only a list of references marked memorized. */
export const OLD_MEMORY_KEY = "livewell-scripture-memorized";

/** Days until a verse returns after each successful recall. */
export const INTERVALS = [1, 3, 7, 14, 30] as const;

export interface MemoryVerse {
  ref: string;
  text: string;
}

export interface Learning {
  /** 0 to INTERVALS.length: how many reviews in a row it has been recalled. */
  stage: number;
  /** The calendar day it is next due, YYYY-MM-DD. */
  due: string;
  /** The verse's words, kept for a verse that is not one of the forty (the reader's own, or the catechism's). */
  text?: string;
  /** Where it came from, when not one of the forty: "own" or "family". */
  from?: "own" | "family";
}

export interface MemoryState {
  v: 2;
  verses: Record<string, Learning>;
  /** The verse open for practice and the step reached, so a reload comes back to it. */
  at?: { ref: string; step: number } | null;
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);

function isLearning(x: unknown): x is Learning {
  return (
    isObject(x) &&
    Number.isInteger(x.stage) &&
    (x.stage as number) >= 0 &&
    (x.stage as number) <= INTERVALS.length &&
    typeof x.due === "string" &&
    DAY.test(x.due) &&
    (x.text === undefined || typeof x.text === "string") &&
    (x.from === undefined || x.from === "own" || x.from === "family")
  );
}

export function isMemoryState(x: unknown): x is MemoryState {
  if (!isObject(x) || x.v !== 2 || !isObject(x.verses) || !Object.values(x.verses).every(isLearning)) return false;
  const at = x.at;
  return at === undefined || at === null || (isObject(at) && typeof at.ref === "string" && Number.isInteger(at.step) && (at.step as number) >= 0 && (at.step as number) < HIDE_STEPS.length);
}

/** Today on the reader's own calendar, YYYY-MM-DD. */
export function localDay(d: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** A calendar day `n` days after `day`. Calendar days, so a clock change never moves it. */
export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return localDay(new Date(y, m - 1, d + n));
}

/** Whole days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  const at = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((at(to) - at(from)) / 86_400_000);
}

const isRefList = (x: unknown): x is string[] => Array.isArray(x) && x.every((r) => typeof r === "string");

/**
 * What this device remembers. A reader who used the first version has a list
 * of verses marked memorized in another wording; those come across as verses
 * to check again today, since the words here are now the Berean Standard
 * Bible's. Only references the tool still teaches are carried.
 */
export function readMemory(today: string, known: ReadonlySet<string>): MemoryState {
  const fresh: MemoryState = { v: 2, verses: {}, at: null };
  const kept = readStoredJSON<MemoryState | null>(MEMORY_KEY, (x): x is MemoryState | null => x === null || isMemoryState(x), null);
  if (kept) return kept;
  const old = readStoredJSON<string[]>(OLD_MEMORY_KEY, isRefList, []);
  for (const ref of old) if (known.has(ref)) fresh.verses[ref] = { stage: 1, due: today };
  return fresh;
}

/** False when the browser would not keep it; the state still holds while the page is open. */
export function saveMemory(state: MemoryState): boolean {
  return writeStoredJSON(MEMORY_KEY, state);
}

/** Begin learning a verse: due today. */
export function started(today: string, extra: Pick<Learning, "text" | "from"> = {}): Learning {
  return { stage: 0, due: today, ...extra };
}

/** The verse was said from memory: up a stage, back after that stage's days. */
export function recalled(l: Learning, today: string): Learning {
  const days = INTERVALS[Math.min(l.stage, INTERVALS.length - 1)];
  return { ...l, stage: Math.min(l.stage + 1, INTERVALS.length), due: addDays(today, days) };
}

/** Not yet: start again, tomorrow. */
export function missed(l: Learning, today: string): Learning {
  return { ...l, stage: 0, due: addDays(today, 1) };
}

/** Known: recalled at every interval, the 30-day one included. */
export const isKnown = (l: Learning) => l.stage >= INTERVALS.length;

/** The verses due on or before today, the longest overdue first. */
export function dueToday(state: MemoryState, today: string): string[] {
  return Object.entries(state.verses)
    .filter(([, l]) => l.due <= today)
    .sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : 0))
    .map(([ref]) => ref);
}

/** "Due today", "Back tomorrow", "Back in 6 days". */
export function whenDue(l: Learning, today: string): string {
  const n = daysBetween(today, l.due);
  if (n <= 0) return "Due today";
  return n === 1 ? "Back tomorrow" : `Back in ${n} days`;
}

// Hiding the words, a few more each step.

/** The share of the words hidden at each step: none, a quarter, half, three quarters, all. */
export const HIDE_STEPS = [0, 0.25, 0.5, 0.75, 1] as const;

export const STEP_LINES = [
  "Read it aloud twice, slowly.",
  "A quarter of the words are hidden. Say the whole verse aloud.",
  "Half the words are hidden. Say the whole verse aloud.",
  "Most of the words are hidden. Say the whole verse aloud.",
  "Every word is hidden. Say it from memory, then look.",
] as const;

export function wordsOf(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

function rank(word: string, i: number): number {
  let h = 2166136261 ^ i;
  for (let k = 0; k < word.length; k++) h = Math.imul(h ^ word.charCodeAt(k), 16777619);
  return (h >>> 0) / 4294967296;
}

/**
 * Which words are hidden at a step. The order is fixed for a verse, so a word
 * hidden at one step stays hidden at the next and the reader builds on what
 * they already carried.
 */
export function hiddenAt(text: string, step: number): boolean[] {
  const words = wordsOf(text);
  const share = HIDE_STEPS[Math.min(Math.max(step, 0), HIDE_STEPS.length - 1)];
  const count = Math.ceil(words.length * share);
  const order = words.map((w, i) => ({ i, r: rank(w, i) })).sort((a, b) => a.r - b.r);
  const hidden = words.map(() => false);
  for (const { i } of order.slice(0, count)) hidden[i] = true;
  return hidden;
}

/** A hidden word: a line as long as the word, its punctuation kept. */
export function blank(word: string): string {
  return word.replace(/[A-Za-z0-9]+/g, (m) => "_".repeat(Math.max(2, m.length)));
}

// A verse the reader chooses, read from the site's own Bible files.

export const MAX_OWN_VERSES = 6;

export class OwnVerseError extends Error {
  kind: "unreadable" | "too-long" | "missing" | "failed";
  constructor(kind: OwnVerseError["kind"]) {
    super(kind);
    this.kind = kind;
  }
}

export const OWN_VERSE_MESSAGES: Record<OwnVerseError["kind"], string> = {
  unreadable: "That isn't a reference this page can read. Try one like John 3:16 or Psalm 23:1-3.",
  "too-long": `Choose ${MAX_OWN_VERSES} verses or fewer, in one chapter. A short passage is learned; a long one is only read.`,
  missing: "That chapter doesn't have those verses.",
  failed: "The Bible text didn't load. Check the connection and try again.",
};

/** The words of a reference, from the Berean Standard Bible files the Study Bible reads. */
export async function fetchOwnVerse(input: string): Promise<MemoryVerse> {
  const ref = parseScriptureRef(input);
  if (!ref || ref.parts.length !== 1) throw new OwnVerseError("unreadable");
  const p = ref.parts[0];
  if (p.c1 !== p.c2 || p.v2 === Infinity || p.v2 - p.v1 + 1 > MAX_OWN_VERSES) throw new OwnVerseError("too-long");
  let chapter;
  try {
    chapter = await fetchChapterText(ref.book.slug, p.c1);
  } catch {
    throw new OwnVerseError("failed");
  }
  const verses = chapter.verses.filter((v) => v.v >= p.v1 && v.v <= p.v2);
  if (verses.length !== p.v2 - p.v1 + 1) throw new OwnVerseError("missing");
  return { ref: formatRef(ref).replace(/–/g, "-"), text: verses.map((v) => v.t).join(" ") };
}
