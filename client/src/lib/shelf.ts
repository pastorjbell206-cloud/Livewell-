/**
 * The essay shelf: which essays are public, and how /writing groups them.
 *
 * The data lives in ./shelf.json, the one committed list (eight sections, the
 * essays on each, and the three to start with). This module is the site's
 * reading of it; scripts/lib/shelf.mjs is the build scripts' reading of the
 * same file, and shelf.test.ts holds the two to one rule:
 *
 *   - a shelf essay with status "live" is public;
 *   - a "pending" shelf essay is public only once its rewrite exists at
 *     client/public/essays/<slug>.json (listed in essayOverrides.generated.ts);
 *   - an essay not on the shelf is public only if it went out at or after
 *     latestCutoff (essayDate: published, or created when no publish time was
 *     recorded), so new posts from the admin appear without a code change;
 *   - everything else is retired: noindex, out of every listing, search, and
 *     related-reading rail, its URL answered by a short notice. Nothing is
 *     deleted, and any essay comes back with one line in shelf.json.
 *
 * Sections are display groups on /writing, not taxonomy pillars; taxonomy.ts
 * and pillar-assignments.ts are untouched by the shelf.
 */
import shelfData from "./shelf.json";
import { ESSAY_OVERRIDES, type EssayOverrideMeta } from "./essayOverrides.generated";

export interface ShelfSection {
  slug: string;
  order: number;
  name: string;
  description: string;
  /** taxonomy.ts track slugs this section answers for (?track= and nearest-section). */
  tracks: string[];
}

export interface ShelfEssay {
  slug: string;
  section: string;
  status: "live" | "pending";
  title: string;
  /** The line shown under the title on /writing; absent = the essay's own excerpt, "" = no line. */
  blurb?: string;
}

interface ShelfFile {
  latestCutoff: string;
  startWith: string[];
  sections: ShelfSection[];
  essays: ShelfEssay[];
}

const DATA = shelfData as unknown as ShelfFile;

/** Sections in display order. */
export const SHELF_SECTIONS: ShelfSection[] = [...DATA.sections].sort((a, b) => a.order - b.order);
/** Every essay on the shelf, live and pending, in shelf order. */
export const SHELF_ESSAYS: ShelfEssay[] = DATA.essays;
/** Posts created at or after this instant are "Latest" and public on their own. */
export const LATEST_CUTOFF: number = Date.parse(DATA.latestCutoff);
/** The hand-picked "Start with these" row, in reading order. */
export const START_WITH: string[] = DATA.startWith;

const ENTRY_BY_SLUG = new Map(SHELF_ESSAYS.map((e) => [e.slug, e]));
const SECTION_BY_SLUG = new Map(SHELF_SECTIONS.map((s) => [s.slug, s]));
const SECTION_RANK = new Map(SHELF_SECTIONS.map((s, i) => [s.slug, i]));
const OVERRIDE_BY_SLUG = new Map(ESSAY_OVERRIDES.map((o) => [o.slug, o]));

export function shelfEntry(slug: string | null | undefined): ShelfEssay | null {
  return (slug && ENTRY_BY_SLUG.get(slug)) || null;
}

export function sectionBySlug(slug: string | null | undefined): ShelfSection | null {
  return (slug && SECTION_BY_SLUG.get(slug)) || null;
}

/** The rewritten version's metadata, when one exists for this slug. */
export function overrideMeta(slug: string | null | undefined): EssayOverrideMeta | null {
  return (slug && OVERRIDE_BY_SLUG.get(slug)) || null;
}

function toTime(createdAt: unknown): number {
  if (createdAt instanceof Date) return createdAt.getTime();
  if (typeof createdAt === "number") return createdAt;
  if (typeof createdAt === "string" && createdAt) return Date.parse(createdAt);
  return Number.NaN;
}

/** True when a date falls at or after the shelf's cutoff. */
export function isAfterCutoff(date: unknown): boolean {
  const t = toTime(date);
  return Number.isFinite(t) && t >= LATEST_CUTOFF;
}

/**
 * The instant the Latest rule judges a post by: when it was published, or,
 * for a row that never recorded a publish time, when it was created. The
 * admin's draft-then-publish flow stamps publishedAt at the moment of
 * publishing, so a draft written before the cutoff and published after it
 * counts as new; a post the editor creates already published has no
 * publishedAt, and its createdAt stands in. Every caller of the rule (the
 * listings, search, the essay page, the build scripts) passes this one date.
 */
export function essayDate(post: { publishedAt?: unknown; createdAt?: unknown } | null | undefined): unknown {
  if (!post) return undefined;
  return Number.isFinite(toTime(post.publishedAt)) ? post.publishedAt : post.createdAt;
}

export type EssayVisibility = "shelf" | "latest" | "pending" | "retired";

/**
 * Where an essay stands. `date` (essayDate of the row) only matters for
 * essays not on the shelf (the post-cutoff "Latest" rule); shelf membership
 * never depends on it.
 */
export function essayVisibility(slug: string, date?: unknown): EssayVisibility {
  const entry = ENTRY_BY_SLUG.get(slug);
  if (entry) return entry.status === "live" || OVERRIDE_BY_SLUG.has(slug) ? "shelf" : "pending";
  return isAfterCutoff(date) ? "latest" : "retired";
}

export function isPublicEssay(slug: string, date?: unknown): boolean {
  const v = essayVisibility(slug, date);
  return v === "shelf" || v === "latest";
}

/** Keep only public essays from any post list (rows carry publishedAt and/or createdAt). */
export function filterPublicPosts<T extends { slug: string; createdAt?: unknown; publishedAt?: unknown }>(
  posts: readonly T[]
): T[] {
  return posts.filter((p) => isPublicEssay(p.slug, essayDate(p)));
}

const ESSAY_HREF = /^\/writing\/([^/?#]+)\/?(?:[?#].*)?$/;

/**
 * For hand-written reading lists (landing pages, pathways, plans, answers):
 * false only for a link to an essay that is off the shelf, so a list can drop
 * it instead of sending a reader to a retired notice. Every other link passes.
 * A hand-written link carries no date, so only shelf essays count as public;
 * when an essay comes back on the shelf, its links reappear on their own.
 */
export function isPublicEssayHref(href: string | null | undefined): boolean {
  const m = String(href ?? "").match(ESSAY_HREF);
  return m ? isPublicEssay(decodeURIComponent(m[1])) : true;
}

/** Public shelf essays in display order: section order, then shelf order. */
export function liveShelfEssays(): ShelfEssay[] {
  return SHELF_ESSAYS.map((e, i) => ({ e, i }))
    .filter(({ e }) => essayVisibility(e.slug) === "shelf")
    .sort(
      (a, b) =>
        (SECTION_RANK.get(a.e.section) ?? 99) - (SECTION_RANK.get(b.e.section) ?? 99) || a.i - b.i
    )
    .map(({ e }) => e);
}

/** Sections that have at least one public essay, in display order. */
export function liveSections(): ShelfSection[] {
  const withEssays = new Set(liveShelfEssays().map((e) => e.section));
  return SHELF_SECTIONS.filter((s) => withEssays.has(s.slug));
}

/** Sections that answer for a taxonomy track (a /writing?track= link). */
export function sectionsForTrack(track: string | null | undefined): ShelfSection[] {
  if (!track) return [];
  return SHELF_SECTIONS.filter((s) => s.tracks.includes(track));
}

/**
 * The section a reader should be sent to from an essay that is not on the
 * public shelf: its own section when it is a pending shelf essay, otherwise
 * the first section for its track. Only sections with public essays count,
 * so the link never lands on an empty shelf.
 */
export function nearestSection(slug: string, track?: string | null): ShelfSection | null {
  const live = new Set(liveSections().map((s) => s.slug));
  const own = ENTRY_BY_SLUG.get(slug);
  if (own && live.has(own.section)) return SECTION_BY_SLUG.get(own.section) ?? null;
  return sectionsForTrack(track).find((s) => live.has(s.slug)) ?? null;
}

export function sectionHref(section: ShelfSection): string {
  return `/writing?section=${section.slug}`;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  mdash: "—",
  ndash: "–",
  hellip: "…",
};

/**
 * Excerpts imported from Substack still carry HTML entities ("church&#8217;s").
 * Decode them for display; the words are left exactly as written.
 */
export function cleanExcerpt(text: string | null | undefined): string {
  return String(text ?? "")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? m)
    .trim();
}

/** A rewritten essay as stored at client/public/essays/<slug>.json. */
export interface EssayOverride {
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown. */
  body: string;
  /** ISO date of the rewrite. */
  updated: string;
}

export function isEssayOverride(x: unknown): x is EssayOverride {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.slug === "string" &&
    typeof o.title === "string" &&
    typeof o.excerpt === "string" &&
    typeof o.body === "string" &&
    typeof o.updated === "string"
  );
}

/** Where the rewritten version of an essay is served from. */
export function overrideUrl(slug: string): string {
  return `/essays/${encodeURIComponent(slug)}.json`;
}
