/**
 * The passage index on the client: what else the site has on a Bible chapter
 * ("Go deeper"). scripts/build-passage-index.mjs writes one small file per
 * chapter that has anything (client/public/index/chapters/<book>/<n>.json),
 * and the list of those chapters (client/public/index/chapters.json). A
 * chapter the list leaves out has nothing, so no file is asked for and the
 * chapter shows nothing. The rules for what counts are in
 * scripts/lib/passage-index.mjs.
 */

export type PassageKind =
  | "film"
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
  { k: "film", name: "Watch and learn: moving pictures" },
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

const KINDS = new Set<string>(PASSAGE_KINDS.map(x => x.k));

export const isPassageRows = (x: unknown): x is PassageRow[] =>
  Array.isArray(x) &&
  x.every(
    r =>
      r &&
      typeof r === "object" &&
      KINDS.has((r as PassageRow).k) &&
      typeof (r as PassageRow).t === "string" &&
      typeof (r as PassageRow).h === "string" &&
      typeof (r as PassageRow).p === "string"
  );

export const chapterIndexUrl = (slug: string, chapter: number) =>
  `/index/chapters/${slug}/${chapter}.json`;

export const CHAPTER_LIST_URL = "/index/chapters.json";

const isChapterList = (x: unknown): x is Record<string, number[]> =>
  !!x &&
  typeof x === "object" &&
  !Array.isArray(x) &&
  Object.values(x).every(
    n => Array.isArray(n) && n.every(c => typeof c === "number")
  );

let list: Promise<Record<string, number[]> | null> | null = null;

/** Which chapters have a file; null when the list cannot be read (then every chapter is asked for, as before). */
function fetchChapterList(): Promise<Record<string, number[]> | null> {
  list ??= fetch(CHAPTER_LIST_URL)
    .then(async res => {
      const data: unknown = res.ok ? await res.json() : null;
      return isChapterList(data) ? data : null;
    })
    .catch(() => null)
    .then(got => {
      if (!got) list = null;
      return got;
    });
  return list;
}

const cache = new Map<string, Promise<PassageRow[]>>();

/**
 * The rows for one chapter. A chapter the list leaves out has none, and its
 * file is not asked for; a chapter with no file (404) has none; any other
 * failure rejects, and is not cached, so a later visit tries again.
 */
export function fetchChapterIndex(
  slug: string,
  chapter: number
): Promise<PassageRow[]> {
  const url = chapterIndexUrl(slug, chapter);
  const hit = cache.get(url);
  if (hit) return hit;
  const p = fetchChapterList()
    .then(have => (have && !have[slug]?.includes(chapter) ? null : fetch(url)))
    .then(async res => {
      if (res === null) return [];
      if (res.status === 404) return [];
      if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
      const data: unknown = await res.json();
      if (!isPassageRows(data))
        throw new Error(`fetch ${url} → unexpected shape`);
      return data;
    })
    .catch(err => {
      cache.delete(url);
      throw err;
    });
  cache.set(url, p);
  return p;
}

/** The rows grouped by kind, in the fixed kind order; kinds with nothing are left out. */
export function groupRows(
  rows: PassageRow[]
): { k: PassageKind; name: string; rows: PassageRow[] }[] {
  return PASSAGE_KINDS.map(({ k, name }) => ({
    k,
    name,
    rows: rows.filter(r => r.k === k),
  })).filter(g => g.rows.length > 0);
}
