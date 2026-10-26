/**
 * Ranking for on-site search (pages/Search.tsx) over the static libraries,
 * Find Help, the plans, and the tools.
 *
 * Every word the reader types must appear somewhere (title, summary, facet, or
 * the everyday phrasings a care page lists in askedAs), so "worry journal"
 * finds The Worry Journal and "cant sleep" finds "can't sleep". Titles that
 * hold the whole phrase rank first, then titles holding every word, then
 * askedAs phrasings, then the rest; on ties, a Find Help page or a tool comes
 * before a library entry, because a reader in need is the one most likely to
 * type a plain sentence.
 */

import type { CrisisTopic } from "@/components/CrisisBlock";

export interface Searchable {
  title: string;
  blurb: string;
  facet?: string;
  /** Extra words people use for it (a care page's askedAs). */
  keywords?: string;
  /** "Find Help", "Tools", a library label. */
  sourceLabel?: string;
}

/** Lowercase, apostrophes dropped, punctuation to spaces. */
export function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** The words of a query worth matching (one-letter words match everything, so they are dropped). */
export function queryWords(q: string): string[] {
  return normalizeText(q).split(" ").filter((w) => w.length > 1);
}

/**
 * True when every word begins a word of `text`, so "worr" finds "worry" but
 * "war" does not find "toward" and "sin" does not find "using".
 */
export function hasWordStarts(text: string, words: string[]): boolean {
  const hay = ` ${normalizeText(text)}`;
  return words.every((w) => hay.includes(` ${w}`));
}

const PRIORITY: Record<string, number> = { "Find Help": 3, Tools: 2, "Eight-Week Plans": 1 };

export function scoreEntry(item: Searchable, q: string): number {
  const words = queryWords(q);
  if (!words.length) return 0;
  // The whole query, short words and all, so "is divorce a sin" meets its own phrasing.
  const phrase = normalizeText(q);
  // Every part starts with a space, so a match can be held to the start of a word.
  const title = ` ${normalizeText(item.title)}`;
  const keywords = ` ${normalizeText(item.keywords ?? "")}`;
  const all = `${title} ${normalizeText(item.blurb)} ${normalizeText(item.facet ?? "")}${keywords}`;
  const has = (hay: string, w: string) => hay.includes(` ${w}`);
  if (!words.every((w) => has(all, w))) return 0;
  let score = 10;
  if (has(title, phrase)) score += 100;
  else if (words.every((w) => has(title, w))) score += 50;
  if (has(keywords, phrase)) score += 40;
  return score + (PRIORITY[item.sourceLabel ?? ""] ?? 0);
}

/**
 * What a reader typed that calls for a person, not a page: thoughts of
 * suicide or self-harm, abuse, sexual assault, an overdose. Each pattern names
 * the help lines it needs; 988 always comes first.
 */
const CRISIS: [RegExp, CrisisTopic][] = [
  [/\b(suicid\w*|kill(ing)? my ?self|end(ing)? my life|end it all|(want|going) to die|self ?harm\w*|hurt(ing)? my ?self|cut(ting)? my ?self)\b/, "suicide"],
  [/\b(abus\w*|hits? me|beats? me|afraid of my (husband|wife|partner|boyfriend|girlfriend|dad|father|mom|mother))\b/, "abuse"],
  [/\b(rape[ds]?|raping|sexual(ly)? assault\w*|molest\w*)\b/, "sexual-assault"],
  [/\b(overdos\w*)\b/, "substance"],
];

/** The help lines a search calls for, or none. */
export function crisisTopicsFor(query: string): CrisisTopic[] {
  const q = normalizeText(query);
  const topics = CRISIS.filter(([re]) => re.test(q)).map(([, t]) => t);
  if (!topics.length) return [];
  return ["suicide", ...topics.filter((t) => t !== "suicide")];
}

/** The matching items, best first (stable for equal scores). */
export function rankEntries<T extends Searchable>(items: T[], q: string): T[] {
  return items
    .map((item, i) => ({ item, i, score: scoreEntry(item, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map((x) => x.item);
}
