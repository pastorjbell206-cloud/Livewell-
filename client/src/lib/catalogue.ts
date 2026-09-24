/**
 * The Library catalogue: one file listing everything published on the site
 * (built by scripts/build-catalogue.mjs into /catalogue/index.json on every
 * build, essays read from the database on deploy), plus the search the
 * Library and the Downloads shelf run over it.
 *
 * Search is deliberately plain and predictable: every word the reader types
 * must begin a word somewhere in the item (title, summary, subject, kind,
 * Scripture references), titles outrank everything else, and a word that
 * matches nothing anywhere is corrected to the nearest word the library
 * actually contains ("marrige" → "marriage"). If requiring every word leaves
 * nothing, the best partial matches are shown instead of an empty page.
 */
import { fetchJson } from "@/lib/fetch-json";

export interface CatalogueFile {
  label: string;
  href: string;
  bytes?: number;
}

export interface CatalogueItem {
  kind: string;
  title: string;
  href: string;
  summary?: string;
  /** Pillar, topic, era, audience: the item's subject within its kind. */
  group?: string;
  scripture?: string[];
  /** Extra search words (wisdom keywords); never displayed. */
  terms?: string;
  /** ISO date (YYYY-MM-DD). */
  date?: string;
  minutes?: number;
  /** Free-text period or size ("AD 325", "52 questions"). */
  period?: string;
  files?: CatalogueFile[];
  access?: "free" | "paid";
}

export interface Catalogue {
  generatedAt: string;
  essaysFrom: "database" | "static-library";
  counts: Record<string, number>;
  items: CatalogueItem[];
}

export const isCatalogue = (x: unknown): x is Catalogue =>
  typeof x === "object" &&
  x !== null &&
  Array.isArray((x as { items?: unknown }).items) &&
  typeof (x as { counts?: unknown }).counts === "object";

let pending: Promise<Catalogue> | null = null;

/** The catalogue, fetched once per page load and shared by every consumer. */
export function fetchCatalogue(): Promise<Catalogue> {
  if (!pending) {
    pending = fetchJson("/catalogue/index.json", isCatalogue).catch((err) => {
      pending = null; // let a retry try again
      throw err;
    });
  }
  return pending;
}

/** Order the Library lists its shelves in; mirrors KIND_ORDER in the build script. */
export const KIND_ORDER = [
  "Essay",
  "Book",
  "Booklet",
  "Study guide",
  "Answer",
  "Wisdom",
  "How-to",
  "Everyday life",
  "Context guide",
  "Doctrine",
  "Church history",
  "Creed",
  "Justice",
  "Church and power",
  "Nation",
  "Pathway",
  "Care plan",
  "Group guide",
  "Argument",
  "Family",
  "Tool",
];

export function kindRank(kind: string): number {
  const i = KIND_ORDER.indexOf(kind);
  return i === -1 ? KIND_ORDER.length : i;
}

/** Plural shelf label for a kind ("Essay" → "Essays"). */
export function kindPlural(kind: string): string {
  const special: Record<string, string> = {
    "Everyday life": "Everyday life",
    Wisdom: "Wisdom topics",
    "Church history": "Church history",
    "Church and power": "The church and power",
    Justice: "Justice",
    Nation: "Faith and the nation",
    Family: "For families",
    "How-to": "How-tos",
  };
  return special[kind] ?? `${kind}s`;
}

export function formatBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

export type LengthBand = "short" | "medium" | "long";

export const LENGTH_LABELS: Record<LengthBand, string> = {
  short: "Under 10 minutes",
  medium: "10 to 20 minutes",
  long: "Over 20 minutes",
};

export function lengthBand(minutes?: number): LengthBand | undefined {
  if (!minutes) return undefined;
  if (minutes < 10) return "short";
  if (minutes <= 20) return "medium";
  return "long";
}

// ── search ──────────────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "about", "be", "by", "can", "do", "does", "for", "from",
  "how", "i", "if", "in", "is", "it", "me", "my", "of", "on", "or", "say", "says", "should",
  "that", "the", "to", "what", "when", "where", "who", "why", "with", "you", "your",
]);

/** Lowercase, strip accents and punctuation; keep "3:16" together. */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/ß/g, "ss")
    .replace(/[’']/g, "")
    // Keep verse colons ("3:16") through the punctuation strip: text is already
    // lowercase, so an uppercase letter is a safe placeholder.
    .replace(/(\d):(\d)/g, "$1Q$2")
    .replace(/[^a-z0-9Q]+/g, " ")
    .replace(/Q/g, ":")
    .trim();
}

export function queryTokens(q: string): string[] {
  const all = normalize(q).split(" ").filter(Boolean);
  const kept = all.filter((t) => !STOPWORDS.has(t));
  return kept.length ? kept : all;
}

export interface IndexedItem {
  item: CatalogueItem;
  /** " " + normalized title + " ", for word-prefix tests. */
  title: string;
  /** " " + everything searchable + " ". */
  hay: string;
}

export interface SearchIndex {
  entries: IndexedItem[];
  /** Every word in the library, for spelling correction. */
  vocab: Map<string, number>;
}

export function buildIndex(items: CatalogueItem[]): SearchIndex {
  const vocab = new Map<string, number>();
  const entries = items.map((item) => {
    const title = ` ${normalize(item.title)} `;
    const rest = normalize(
      [item.summary, item.group, item.kind, item.period, item.terms, ...(item.scripture ?? [])]
        .filter(Boolean)
        .join(" ")
    );
    const hay = `${title}${rest} `;
    for (const w of hay.split(" ")) if (w.length >= 4) vocab.set(w, (vocab.get(w) ?? 0) + 1);
    return { item, title, hay };
  });
  return { entries, vocab };
}

/** Levenshtein distance, bailing out once it exceeds `max`. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

/** The library words closest to a token that matches nothing, best first. */
function corrections(token: string, index: SearchIndex): string[] {
  if (token.length < 4 || /\d/.test(token)) return [];
  const max = token.length >= 8 ? 2 : 1;
  const found: { w: string; d: number; n: number }[] = [];
  for (const [w, n] of Array.from(index.vocab)) {
    if (w[0] !== token[0]) continue;
    const d = distance(token, w, max);
    if (d <= max) found.push({ w, d, n });
  }
  found.sort((a, b) => a.d - b.d || b.n - a.n);
  return found.slice(0, 3).map((f) => f.w);
}

export interface SearchResult {
  results: CatalogueItem[];
  /** Words that were corrected: typed → used instead. */
  corrected: { from: string; to: string }[];
  /** True when not every word could be matched and partial matches are shown. */
  partial: boolean;
}

export function search(index: SearchIndex, query: string): SearchResult {
  const tokens = queryTokens(query);
  if (!tokens.length) return { results: index.entries.map((e) => e.item), corrected: [], partial: false };

  // Each token becomes a group of acceptable words; a token no item contains
  // is replaced by its nearest spellings from the library itself.
  const corrected: { from: string; to: string }[] = [];
  const groups = tokens.map((t) => {
    const hit = index.entries.some((e) => e.hay.includes(` ${t}`));
    if (hit) return [t];
    const alts = corrections(t, index);
    if (alts.length) corrected.push({ from: t, to: alts[0] });
    return alts.length ? alts : [t];
  });

  const phrase = ` ${normalize(query)}`;
  const scored: { item: CatalogueItem; score: number; matched: number }[] = [];
  for (const e of index.entries) {
    let score = 0;
    let matched = 0;
    for (const g of groups) {
      if (g.some((w) => e.title.includes(` ${w}`))) { score += 6; matched++; }
      else if (g.some((w) => e.hay.includes(` ${w}`))) { score += 2; matched++; }
    }
    if (!matched) continue;
    if (tokens.length > 1 && e.title.includes(phrase)) score += 8;
    // "Romans 8", "grief and hope": the words together, anywhere, beat the
    // same words scattered (a Scripture reference most of all).
    else if (tokens.length > 1 && e.hay.includes(phrase)) score += 7;
    if (e.title.startsWith(phrase)) score += 4;
    if (e.item.kind === "Book") score += 2;
    scored.push({ item: e.item, score, matched });
  }

  const full = scored.filter((s) => s.matched === groups.length);
  const pool = full.length ? full : scored;
  pool.sort(
    (a, b) =>
      b.matched - a.matched ||
      b.score - a.score ||
      (b.item.date ?? "").localeCompare(a.item.date ?? "") ||
      a.item.title.localeCompare(b.item.title)
  );
  return { results: pool.map((s) => s.item), corrected, partial: !full.length && pool.length > 0 };
}

// ── related items ("More on this") ──────────────────────────────────────────

const WEAK = new Set([
  ...Array.from(STOPWORDS),
  "about", "after", "again", "against", "being", "between", "christian", "christians",
  "church", "does", "every", "faith", "from", "have", "into", "life", "more", "other",
  "their", "there", "these", "they", "this", "those", "through", "under", "what",
  "when", "which", "while", "with", "would", "your",
]);

/** Significant words of a text: normalized, 4+ letters, not weak. */
function keywords(text: string): Set<string> {
  return new Set(
    normalize(text)
      .split(" ")
      .filter((w) => w.length >= 4 && !/^\d/.test(w) && !WEAK.has(w))
  );
}

/** "Romans 8:18-28" → "romans 8": a reference's book and chapter. */
function chapterOf(ref: string): string {
  const m = normalize(ref).match(/^((?:\d )?[a-z]+(?: [a-z]+)?) (\d+)/);
  return m ? `${m[1]} ${m[2]}` : "";
}

/**
 * Up to `max` items most related to the one at `href` (and `title`, when
 * several items share an href): shared Scripture chapters count most, then a
 * shared subject, then shared title words. At most two per kind, so a study
 * guide surfaces an essay, a wisdom topic, and a how-to rather than four of
 * one shelf.
 */
export function relatedItems(items: CatalogueItem[], href: string, title?: string, max = 4): CatalogueItem[] {
  const self =
    items.find((i) => i.href === href && (!title || i.title === title)) ??
    items.find((i) => i.href === href);
  if (!self) return [];
  const selfWords = keywords(`${self.title} ${self.group ?? ""}`);
  const selfChapters = new Set((self.scripture ?? []).map(chapterOf).filter(Boolean));
  const scored: { item: CatalogueItem; score: number }[] = [];
  for (const it of items) {
    if (it === self || it.href === self.href) continue;
    let score = 0;
    for (const ref of it.scripture ?? []) if (selfChapters.has(chapterOf(ref))) score += 3;
    if (self.group && it.group === self.group) score += 2;
    const words = keywords(`${it.title} ${it.group ?? ""}`);
    Array.from(words).forEach((w) => { if (selfWords.has(w)) score += 2; });
    if (score >= 2) scored.push({ item: it, score });
  }
  scored.sort((a, b) => b.score - a.score || (b.item.date ?? "").localeCompare(a.item.date ?? "") || a.item.title.localeCompare(b.item.title));
  const perKind = new Map<string, number>();
  const out: CatalogueItem[] = [];
  for (const { item } of scored) {
    const n = perKind.get(item.kind) ?? 0;
    if (n >= 2) continue;
    perKind.set(item.kind, n + 1);
    out.push(item);
    if (out.length >= max) break;
  }
  return out;
}
