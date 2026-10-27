/**
 * On-site search: the header search, /search, and the "Go to" fields.
 *
 * A Scripture reference comes first. "John 3:16", "jn 3 16", and "Romans 13"
 * go to the passage in the Study Bible (passageFor, findHref); the reference
 * parser is its own small chunk, loaded the first time a search field is
 * focused (loadPassageParser), never on first paint.
 *
 * Everything else is ranked over the static libraries, Find Help, the plans,
 * the tools, the rewritten essays, and public/search-index.json (wisdom
 * topics, Honest Answers, family devotions and the catechism, Christ and the
 * Nation; scripts/build-search-index.mjs). A plain question loses its small
 * words first ("how to talk to my kids about God" is talk, kids, God), and
 * every word left must appear somewhere (title, summary, facet, or the
 * everyday phrasings a care page lists in askedAs), so "worry journal" finds
 * The Worry Journal and "cant sleep" finds "can't sleep". Titles that hold the
 * whole phrase rank first, then titles holding every word, then askedAs
 * phrasings (the whole phrase, then every word), then the rest, with a word
 * that is a whole word of the title
 * ("nation") ahead of one that only starts one ("nationalism"); on ties, a
 * Find Help page or a tool comes before a library entry, because a reader in
 * need is the one most likely to type a plain sentence.
 */

import type { CrisisTopic } from "@/components/CrisisBlock";
import { pickString, type LibrarySource } from "@/lib/catalog";
import type * as ScriptureRefModule from "@/lib/scripture-ref";

export interface Searchable {
  title: string;
  blurb: string;
  facet?: string;
  /** Extra words people use for it (a care page's askedAs). */
  keywords?: string;
  /** "Find Help", "Tools", a library label. */
  sourceLabel?: string;
}

/** A search result: where it opens, and the page that lists everything of its kind. */
export interface SearchEntry extends Searchable {
  href: string;
  indexHref: string;
  sourceLabel: string;
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

/**
 * The small words of a plain question. Negatives ("not", "cant") and words
 * that are also nouns ("will", "might") are kept, because they change what
 * is being asked.
 */
const STOP_WORDS = new Set(
  ("a an the and or but if of to in on at by for from with about into as is are was were be been am " +
    "do does did have has had i im ive me my we us our you your he him his she her it its they them their " +
    "this that these those there what whats which who when where why how can could should would " +
    "so just really very say says tell").split(" ")
);

/** The words of a query that carry what is asked: queryWords without the small words of a question. */
export function searchWords(q: string): string[] {
  const words = queryWords(q);
  const content = words.filter((w) => !STOP_WORDS.has(w));
  return content.length ? content : words;
}

/**
 * Words people use for one another in a search: "kids" finds "children".
 * These match whole words only, so "mom" does not find "moment".
 */
const SAME_WORDS: string[][] = [
  ["kid", "kids", "child", "children", "childrens"],
  ["mom", "moms", "mother", "mothers"],
  ["dad", "dads", "father", "fathers"],
];
const FAMILY = new Map(SAME_WORDS.flatMap((f) => f.map((w) => [w, f] as const)));

/** A light stem, so "praying" finds "pray", "worries" finds "worry", and "nations" finds "nation". */
function stem(w: string): string {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && /ie[sd]$/.test(w)) return `${w.slice(0, -3)}y`;
  if (w.length > 3 && /[^su]s$/.test(w)) return w.slice(0, -1);
  return w;
}

/** The forms a query word is matched by: its family ("kids" finds "children"), or itself and its stem. */
function forms(w: string): readonly string[] {
  const s = stem(w);
  return FAMILY.get(w) ?? (s === w ? [w] : [w, s]);
}

const PRIORITY: Record<string, number> = { "Find Help": 3, Tools: 2, "Honest Answers": 2, "Eight-Week Plans": 1 };

export function scoreEntry(item: Searchable, q: string): number {
  const words = searchWords(q);
  if (!words.length) return 0;
  // The whole query, short words and all, so "is divorce a sin" meets its own phrasing.
  const phrase = normalizeText(q);
  // Every part starts with a space, so a match can be held to the start of a word.
  const title = ` ${normalizeText(item.title)} `;
  const keywords = ` ${normalizeText(item.keywords ?? "")}`;
  const all = `${title}${normalizeText(item.blurb)} ${normalizeText(item.facet ?? "")}${keywords}`;
  const has = (hay: string, w: string) =>
    FAMILY.has(w) ? forms(w).some((f) => `${hay} `.includes(` ${f} `)) : forms(w).some((f) => hay.includes(` ${f}`));
  const whole = (w: string) => forms(w).some((f) => title.includes(` ${f} `) || title.includes(` ${f}s `));
  if (!words.every((w) => has(all, w))) return 0;
  let score = 10;
  if (title.includes(` ${phrase}`)) score += 100;
  else if (words.every((w) => has(title, w))) score += 50;
  if (keywords.includes(` ${phrase}`)) score += 40;
  else if (words.every((w) => has(keywords, w))) score += 20;
  score += 5 * words.filter(whole).length;
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

// ── the sources ──────────────────────────────────────────────────────────────

const isRecord = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const text = (x: unknown) => (typeof x === "string" ? x : "");

/** One static library manifest (lib/catalog.ts) as search entries; anything malformed is skipped. */
export function libraryEntries(source: LibrarySource, data: unknown): SearchEntry[] {
  const list = isRecord(data) ? data[source.listKey] : null;
  if (!Array.isArray(list)) return [];
  return list.filter(isRecord).flatMap((item) => {
    if (typeof item.slug !== "string" || typeof item.title !== "string") return [];
    return [{
      title: item.title,
      // Each library names its summary and facet fields differently; take the first present.
      blurb: pickString(item.blurb, item.excerpt, item.summary, item.subtitle),
      facet: pickString(item.group, item.pillar, item.topic, item.era, item.audience),
      keywords: Array.isArray(item.askedAs) ? item.askedAs.filter((w) => typeof w === "string").join(" ") : "",
      sourceLabel: source.label,
      href: source.buildHref(item.slug),
      indexHref: source.indexHref,
    }];
  });
}

/** public/search-index.json (scripts/build-search-index.mjs) as search entries. */
export function indexEntries(data: unknown): SearchEntry[] {
  const sources = isRecord(data) && Array.isArray(data.sources) ? data.sources : [];
  return sources.filter(isRecord).flatMap((s) => {
    const label = text(s.label);
    const indexHref = text(s.indexHref);
    if (!label || !indexHref.startsWith("/") || !Array.isArray(s.entries)) return [];
    return s.entries.filter(isRecord).flatMap((e) => {
      const href = text(e.href);
      if (!text(e.title) || !href.startsWith("/")) return [];
      return [{ title: text(e.title), blurb: text(e.blurb), facet: text(e.facet), keywords: text(e.keywords), sourceLabel: label, href, indexHref }];
    });
  });
}

/** The rewritten essays (essayOverrides.generated.ts), found by their own title and excerpt. */
export function essayEntries(overrides: { slug: string; title: string; excerpt: string }[], isPublic: (slug: string) => boolean): SearchEntry[] {
  return overrides
    .filter((o) => isPublic(o.slug))
    .map((o) => ({ title: o.title, blurb: o.excerpt, sourceLabel: "Essays", href: `/writing/${o.slug}`, indexHref: "/writing" }));
}

// ── passages ─────────────────────────────────────────────────────────────────

type Parser = typeof ScriptureRefModule;
let parser: Promise<Parser> | null = null;

/**
 * The reference parser and its book table, a chunk of their own, fetched the
 * first time a search field is focused. A failed load is forgotten, so the
 * next focus tries again.
 */
export function loadPassageParser(): Promise<Parser> {
  parser ??= import("@/lib/scripture-ref").catch((err: unknown) => {
    parser = null;
    throw err;
  });
  return parser;
}

export interface PassageMatch {
  /** "John 3:16", "Psalm 23", "Romans". */
  label: string;
  /** The verse or chapter in the Study Bible, or the book's page. */
  href: string;
  /** A whole book named alone ("Romans"), as opposed to a chapter or verse. */
  book: boolean;
}

/**
 * The passage a query names: a reference ("jn 3 16", "Romans 13") or a book
 * named in full on its own ("Romans", "1 John", "Psalm"). Null for anything
 * else, including an abbreviation on its own ("ps", "mk"), which is too easily
 * a word.
 */
export function passageFor(q: string, p: Parser): PassageMatch | null {
  const ref = p.parseScriptureRef(q);
  const href = ref && p.refHref(ref);
  if (ref && href) return { label: p.formatRef(ref), href, book: false };
  const book = p.findBook(q);
  const key = p.bookKey(q);
  const name = book && p.bookKey(book.name);
  // The name itself, or it with or without a final "s" ("Psalm", "Revelations").
  if (book && name && [name, `${name}s`, name.replace(/s$/, "")].includes(key)) return { label: book.name, href: `/study/bible/${book.slug}`, book: true };
  return null;
}

/**
 * Where a search field sends what was typed: a chapter or verse straight to
 * the Study Bible, anything else (a book named alone included) to /search.
 */
export async function findHref(q: string): Promise<string> {
  const query = q.trim();
  try {
    const match = passageFor(query, await loadPassageParser());
    if (match && !match.book) return match.href;
  } catch {
    // The parser did not load (offline, a stale deploy); search still answers.
  }
  return `/search?q=${encodeURIComponent(query)}`;
}
