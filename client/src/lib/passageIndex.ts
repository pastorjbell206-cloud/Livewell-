/**
 * The passage index on the client: what else the site has on a Bible chapter
 * ("Go deeper"). scripts/build-passage-index.mjs writes one small file per
 * chapter that has anything (client/public/index/chapters/<book>/<n>.json);
 * a chapter with nothing has no file, so its fetch answers 404 and the
 * chapter shows nothing. The rules for what counts are in
 * scripts/lib/passage-index.mjs.
 */

export type PassageKind =
  | "question"
  | "doctrine"
  | "history"
  | "background"
  | "guide"
  | "devotion"
  | "catechism"
  | "care"
  | "plan"
  | "wisdom"
  | "essay"
  | "tool";

/** One page that treats the chapter: kind, title, address, and the passage it names in this chapter. */
export interface PassageRow {
  k: PassageKind;
  t: string;
  h: string;
  p: string;
}

/** The kinds in the order a chapter lists them, each under the name the site gives that library. */
export const PASSAGE_KINDS: { k: PassageKind; name: string }[] = [
  { k: "question", name: "Honest Answers" },
  { k: "doctrine", name: "What Christians believe" },
  { k: "history", name: "Church history" },
  { k: "background", name: "Bible background" },
  { k: "guide", name: "Small group study guides" },
  { k: "devotion", name: "Family devotions" },
  { k: "catechism", name: "The family catechism" },
  { k: "care", name: "Find Help" },
  { k: "plan", name: "Eight-week plans" },
  { k: "wisdom", name: "What the Bible says, by subject" },
  { k: "essay", name: "Essays" },
  { k: "tool", name: "Read any verse in context" },
];

const KINDS = new Set<string>(PASSAGE_KINDS.map((x) => x.k));

export const isPassageRows = (x: unknown): x is PassageRow[] =>
  Array.isArray(x) &&
  x.every((r) => r && typeof r === "object" && KINDS.has((r as PassageRow).k) && typeof (r as PassageRow).t === "string" && typeof (r as PassageRow).h === "string" && typeof (r as PassageRow).p === "string");

export const chapterIndexUrl = (slug: string, chapter: number) => `/index/chapters/${slug}/${chapter}.json`;

const cache = new Map<string, Promise<PassageRow[]>>();

/**
 * The rows for one chapter. A chapter with no file (404) has none; any other
 * failure rejects, and is not cached, so a later visit tries again.
 */
export function fetchChapterIndex(slug: string, chapter: number): Promise<PassageRow[]> {
  const url = chapterIndexUrl(slug, chapter);
  const hit = cache.get(url);
  if (hit) return hit;
  const p = fetch(url)
    .then(async (res) => {
      if (res.status === 404) return [];
      if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
      const data: unknown = await res.json();
      if (!isPassageRows(data)) throw new Error(`fetch ${url} → unexpected shape`);
      return data;
    })
    .catch((err) => {
      cache.delete(url);
      throw err;
    });
  cache.set(url, p);
  return p;
}

/** The rows grouped by kind, in the fixed kind order; kinds with nothing are left out. */
export function groupRows(rows: PassageRow[]): { k: PassageKind; name: string; rows: PassageRow[] }[] {
  return PASSAGE_KINDS.map(({ k, name }) => ({ k, name, rows: rows.filter((r) => r.k === k) })).filter((g) => g.rows.length > 0);
}
