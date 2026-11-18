/**
 * "A devotion for tonight" (audit 2026-11, Step 2, Family): three questions
 * (how old the children are, how long the family has, what is going on at
 * home tonight) and one devotion out of the library, ready to start at the
 * table. It adds a way in; tonight's devotion on the calendar is untouched.
 *
 * Every devotion offered is one of the weekly devotions already written
 * (client/public/family-devotions*.json); the lists below name them by their
 * frozen ids, and familyChooser.test.ts holds each id to the family index.
 *
 * What this device remembers (livewell-progress-family-chooser-v1): the ages
 * and the minutes, which rarely change from night to night. What is going on
 * tonight is asked fresh each time and is never kept.
 */
import type { FamilyBand, FamilyProgress } from "./familyTable";
import { readStoredJSON, writeStoredJSON } from "./storage";

export const CHOOSER_KEY = "livewell-progress-family-chooser-v1";

export type ChooserAges = "younger" | "older" | "both";
export type ChooserMinutes = "five" | "ten" | "more";

export interface ChooserAnswers {
  v: 1;
  ages: ChooserAges | null;
  minutes: ChooserMinutes | null;
}

export const NO_ANSWERS: ChooserAnswers = { v: 1, ages: null, minutes: null };

export const AGES: { key: ChooserAges; label: string; band: FamilyBand }[] = [
  { key: "younger", label: "Ten and under", band: "younger" },
  { key: "older", label: "Eleven and up", band: "older" },
  { key: "both", label: "Some of each", band: "together" },
];

export const MINUTES: { key: ChooserMinutes; label: string }[] = [
  { key: "five", label: "About five minutes" },
  { key: "ten", label: "About ten" },
  { key: "more", label: "We have time" },
];

/**
 * What is going on tonight, and the devotions that speak to it, best first.
 * "ordinary" has no list: it means tonight's devotion on the calendar.
 */
export const TONIGHTS: { key: string; label: string; ids: string[] }[] = [
  { key: "ordinary", label: "An ordinary night", ids: [] },
  { key: "afraid", label: "Someone is worried or afraid", ids: ["fear-and-anxiety", "peace", "courage", "hope"] },
  { key: "fight", label: "There was a fight", ids: ["forgiveness", "when-someone-hurts-you", "handling-anger", "the-words-we-say"] },
  { key: "sad", label: "Someone is sad or hurting", ids: ["suffering", "the-good-shepherd", "heaven", "gods-faithfulness"] },
  { key: "question", label: "Someone asked a hard question", ids: ["is-the-bible-true", "who-is-jesus", "faith", "the-trinity"] },
  { key: "thankful", label: "We have something to be thankful for", ids: ["gratitude", "thankfulness", "joy"] },
];

const isOneOf = <T extends string>(list: readonly { key: T }[], x: unknown): x is T => list.some((o) => o.key === x);

export function isChooserAnswers(x: unknown): x is ChooserAnswers {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  const a = x as Record<string, unknown>;
  return a.v === 1 && (a.ages === null || isOneOf(AGES, a.ages)) && (a.minutes === null || isOneOf(MINUTES, a.minutes));
}

export function readChooserAnswers(): ChooserAnswers {
  return readStoredJSON(CHOOSER_KEY, isChooserAnswers, NO_ANSWERS);
}

/** False when the browser would not keep them. */
export function saveChooserAnswers(answers: ChooserAnswers): boolean {
  return writeStoredJSON(CHOOSER_KEY, answers);
}

/**
 * The devotion for what is going on tonight: the first on that night's list
 * this device has not marked done, or the first of all once the family has
 * done every one. `calendarId` is tonight's devotion on the calendar, which
 * an ordinary night takes; if the calendar has none, the first devotion in
 * `fallback` (the library's own order) stands in. Null only when there is
 * nothing to offer at all.
 */
export function chooseDevotion(tonight: string, progress: Pick<FamilyProgress, "done">, calendarId: string | null, fallback: string[] = []): string | null {
  const list = TONIGHTS.find((t) => t.key === tonight)?.ids ?? [];
  if (list.length === 0) return calendarId ?? fallback[0] ?? null;
  const done = new Set(progress.done.map((d) => d.id));
  return list.find((id) => !done.has(id)) ?? list[0];
}
