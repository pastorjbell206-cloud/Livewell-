/**
 * What /search does when the words as typed find nothing: mend a misspelling,
 * and if that is not enough, show the pages nearest to what was asked. So
 * "forgivness" finds forgiveness, "anxeity" finds anxiety, and a question with
 * a word the site does not use ("the gospels contradict each other") still
 * lands on the page about it instead of an empty screen.
 *
 * It runs only after the plain search (lib/siteSearch.ts, rankEntries) comes
 * back empty, so a query that already works is never changed. The spelling
 * test is the Wisdom Finder's (lib/wisdom-match.ts, editDistance): a word of
 * five letters or more that no page uses, mended to the nearest word the
 * pages' titles and keywords do use, one letter away (two for a long word, a
 * swap of neighbours counts as one). This module is loaded by the search page
 * alone, never by the header.
 */
import { editDistance } from "@/lib/wisdom-match";
import { normalizeText, rankEntries, searchWords, type Searchable } from "@/lib/siteSearch";

export interface Found<T> {
  items: T[];
  /** The words as searched, when a spelling was mended: "forgiveness". */
  mended?: string;
  /** True when no page holds every word, and these are the nearest. */
  nearest?: boolean;
}

const vocabOf = new WeakMap<object, Map<string, number>>();

/** Every word of four letters or more in the titles and keywords, with how many entries use it. */
function vocabulary(items: Searchable[]): Map<string, number> {
  const cached = vocabOf.get(items);
  if (cached) return cached;
  const vocab = new Map<string, number>();
  for (const it of items) {
    new Set(normalizeText(`${it.title} ${it.keywords ?? ""}`).split(" ")).forEach((w) => {
      if (w.length >= 4 && !/\d/.test(w)) vocab.set(w, (vocab.get(w) ?? 0) + 1);
    });
  }
  vocabOf.set(items, vocab);
  return vocab;
}

/** The nearest word the site uses to a word it does not, or the word itself. */
function mendWord(w: string, vocab: Map<string, number>): string {
  if (w.length < 5 || vocab.has(w)) return w;
  const max = w.length >= 8 ? 2 : 1;
  let best = w;
  let bestD = max + 1;
  let bestN = 0;
  vocab.forEach((n, cand) => {
    if (Math.abs(cand.length - w.length) > max || cand[0] !== w[0]) return;
    const d = editDistance(w, cand, max);
    if (d < bestD || (d === bestD && n > bestN)) {
      best = cand;
      bestD = d;
      bestN = n;
    }
  });
  return bestD <= max ? best : w;
}

/** Words that say nothing about the subject, left out when the nearest pages are looked for. */
const WEAK = new Set("each other another some any many much thing things something anything someone anyone get got want wants need needs help good best really actually".split(" "));

/** The pages nearest a query no page fully matches: those holding the most of its words, a title or keyword match first. */
function nearest<T extends Searchable>(items: T[], all: string[], limit: number): T[] {
  const words = all.filter((w) => !WEAK.has(w));
  if (!words.length || all.length < 2) return [];
  const need = Math.ceil(words.length / 2);
  const hits = new Map<T, { n: number; strong: number; first: number }>();
  words.forEach((w) => {
    rankEntries(items, w).forEach((it, i) => {
      const named = ` ${normalizeText(`${it.title} ${it.keywords ?? ""}`)}`.includes(` ${w.slice(0, Math.max(4, w.length - 2))}`);
      const h = hits.get(it) ?? { n: 0, strong: 0, first: i };
      h.n += 1;
      if (named) h.strong += 1;
      hits.set(it, h);
    });
  });
  return Array.from(hits.entries())
    .filter(([, h]) => h.n >= need && h.strong > 0)
    .sort((a, b) => b[1].strong - a[1].strong || b[1].n - a[1].n || a[1].first - b[1].first)
    .slice(0, limit)
    .map(([it]) => it);
}

/** The plain search; failing that, the search with its spelling mended; failing that, the nearest pages. */
export function findEntries<T extends Searchable>(items: T[], q: string, limit = 8): Found<T> {
  const exact = rankEntries(items, q);
  if (exact.length || !q.trim() || !items.length) return { items: exact };
  const vocab = vocabulary(items);
  const words = searchWords(q);
  const fixed = words.map((w) => (rankEntries(items, w).length ? w : mendWord(w, vocab)));
  const changed = fixed.some((w, i) => w !== words[i]);
  if (changed) {
    const again = rankEntries(items, fixed.join(" "));
    if (again.length) return { items: again, mended: fixed.join(" ") };
  }
  const near = nearest(items, fixed, limit);
  return near.length ? { items: near, nearest: true, ...(changed ? { mended: fixed.join(" ") } : {}) } : { items: [] };
}
