/**
 * The wisdom library on the client: the shapes of the files
 * scripts/build-wisdom-index.mjs writes (client/public/wisdom/finder.json and
 * entry/<id>.json), how to load them, and saving topics and verses to My
 * Library through the stores older tools already wrote:
 *   livewell-wisdom-saved-v1   topic ids (the Wisdom Finder's own list)
 *   livewell-saved-verses      verses (hooks/useFavorites; Saved Items reads it)
 */
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON, writeStoredJSON, isArrayOf } from "@/lib/storage";
import { isFinderIndex, type FinderIndex } from "@/lib/wisdom-match";

export interface EntryVerse {
  ref: string;
  text: string;
  slug: string;
  chapter: number;
  v1: number;
  v2: number;
  /** The verse ends its sentence. */
  whole: boolean;
  /** Written in full: the passage it sits in, and where it stands. */
  context?: string;
  contextAt?: { slug: string; chapter: number; v1: number; v2: number };
  where?: string;
}

export interface Misread {
  ref: string;
  text: string;
  slug: string;
  chapter: number;
  v1: number;
  v2: number;
  context?: string;
  taken: string;
  says: string;
}

export interface EntryLink {
  label: string;
  href: string;
}

export interface Entry {
  id: string;
  label: string;
  area: string;
  framing: string;
  cultural: string;
  historical: string;
  application: string;
  keywords: string[];
  verses: EntryVerse[];
  related: { id: string; label: string }[];
  links: EntryLink[];
  care: { topics: ("suicide" | "abuse" | "sexual-assault" | "substance")[]; lead: boolean } | null;
  /** The topic before and after this one in its area's order (build-wisdom-index.mjs). */
  turn?: { prev: { id: string; label: string } | null; next: { id: string; label: string } | null };
  deep?: {
    updated: string;
    misread: Misread[];
    whole: string[];
    differ: { share: string; views: { name: string; body: string }[]; after?: string } | null;
    sit: string;
    prayer: { ref: string; lead?: string; text: string };
    next: { kind: string; label: string; href: string }[];
    careLines: { from: string; text: string }[];
    notAdvice: "money" | "law" | "medicine" | null;
  };
}

export const isEntry = (x: unknown): x is Entry => {
  const e = x as Entry;
  return !!e && typeof e === "object" && typeof e.id === "string" && typeof e.label === "string" && Array.isArray(e.verses) && Array.isArray(e.related);
};

export const entryUrl = (id: string) => `/wisdom/entry/${id}.json`;
export const FINDER_URL = "/wisdom/finder.json";

export interface DailyVerse {
  id: string;
  label: string;
  ref: string;
  text: string;
}

export type FinderFile = FinderIndex & { daily: DailyVerse[] };
export const isFinderFile = (x: unknown): x is FinderFile => isFinderIndex(x) && Array.isArray((x as FinderFile).daily);

export const fetchEntry = (id: string) => fetchJson(entryUrl(id), isEntry);
export const fetchFinder = () => fetchJson(FINDER_URL, isFinderFile);

/** One whole verse for today: the date picks it, the same for everyone, never cut mid-sentence. */
export function verseForToday(daily: DailyVerse[], d = new Date()): DailyVerse | null {
  if (!daily.length) return null;
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return daily[Math.abs(h) % daily.length];
}

/** "Luke 15:20" -> "Luke 15"; "Psalm 31:9, 14-15" -> "Psalm 31". */
export const chapterName = (ref: string) => ref.replace(/:.*$/, "");

/* Saving topics: the list the Wisdom Finder has always kept. */
export const SAVED_TOPICS_KEY = "livewell-wisdom-saved-v1";
const isString = (x: unknown): x is string => typeof x === "string";
export const readSavedTopics = (): string[] => readStoredJSON(SAVED_TOPICS_KEY, isArrayOf(isString), []);
/** Toggle a topic; returns the new list and whether the browser kept it. */
export function toggleSavedTopic(id: string): { list: string[]; ok: boolean } {
  const prev = readSavedTopics();
  const list = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
  return { list, ok: writeStoredJSON(SAVED_TOPICS_KEY, list) };
}

/* Saving verses: the store Saved Items and My Library read (hooks/useFavorites). */
export const SAVED_VERSES_KEY = "livewell-saved-verses";
export const verseFavoriteId = (ref: string) => `verse-${ref.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/** The areas of life, by id (client/public/wisdom/matching.json; wisdom.test.ts holds the two together). */
export const AREA_NAMES: Record<string, string> = {
  mind: "Fear, worry and the heavy mind",
  loss: "Grief, illness and death",
  love: "Marriage, love and singleness",
  family: "Parents, children and family",
  people: "Friends, conflict and forgiveness",
  work: "Work, money and calling",
  habits: "Sin, habits and temptation",
  faith: "Faith, doubt and God",
  self: "Who I am",
  pace: "Time, rest and the pace of life",
  church: "Church and the world",
};
