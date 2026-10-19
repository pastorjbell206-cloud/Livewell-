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

const PRIORITY: Record<string, number> = { "Find Help": 3, Tools: 2, "Eight-Week Plans": 1 };

export function scoreEntry(item: Searchable, q: string): number {
  const words = queryWords(q);
  if (!words.length) return 0;
  const phrase = words.join(" ");
  const title = ` ${normalizeText(item.title)} `;
  const keywords = ` ${normalizeText(item.keywords ?? "")} `;
  const all = `${title}${normalizeText(item.blurb)} ${normalizeText(item.facet ?? "")}${keywords}`;
  if (!words.every((w) => all.includes(w))) return 0;
  let score = 10;
  if (title.includes(` ${phrase} `) || title.includes(phrase)) score += 100;
  else if (words.every((w) => title.includes(w))) score += 50;
  if (keywords.includes(phrase)) score += 40;
  return score + (PRIORITY[item.sourceLabel ?? ""] ?? 0);
}

/** The matching items, best first (stable for equal scores). */
export function rankEntries<T extends Searchable>(items: T[], q: string): T[] {
  return items
    .map((item, i) => ({ item, i, score: scoreEntry(item, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map((x) => x.item);
}
