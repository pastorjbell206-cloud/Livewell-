/**
 * The canonical content taxonomy. The single source of truth for "tracks" —
 * what we used to call topics, pillars, and categories. Storage in the DB
 * still uses the legacy `posts.pillar` varchar; this file maps legacy values
 * to the new canonical track slugs, so the front-end speaks one language and
 * the legacy data still works.
 *
 * If you need to add a track:
 *   1. Append to TRACKS below
 *   2. (Optional) add a legacy mapping in LEGACY_PILLAR_MAP
 *   3. That's it — sitemap, nav, footer, /writing filter, and prerender pick
 *      it up automatically.
 *
 * The first three tracks (after-christendom, politics, american-church)
 * carry the primary positioning per James's brief: "Theology, politics,
 * and the American church after Christendom. New essays weekly."
 */

export interface Track {
  slug: string;
  title: string;
  /** Short eyebrow text shown above article titles in cards. */
  kicker: string;
  /** One sentence used on track landing pages and nav dropdowns. */
  description: string;
  /** Which group this track belongs to in the primary nav. */
  group: "essays" | "ministry" | "everyday";
  /** Whether this track gets a featured slot on the homepage. */
  featured?: boolean;
  /** Whether the track appears as a primary topic in the nav. */
  navPrimary?: boolean;
}

export const TRACKS: Track[] = [
  // Substack-aligned lede tracks (the "After Christendom" arc)
  {
    slug: "after-christendom",
    title: "After Christendom",
    kicker: "After Christendom",
    description:
      "Tracing the collapse of cultural Christianity, the rise of Christian nationalism, and what faithfulness looks like on the other side.",
    group: "essays",
    featured: true,
    navPrimary: true,
  },
  {
    slug: "politics",
    title: "Politics & the Cross",
    kicker: "Politics",
    description:
      "Reading the American political moment from inside the room where people fall apart — the blind spots distorting left and right.",
    group: "essays",
    featured: true,
    navPrimary: true,
  },
  {
    slug: "american-church",
    title: "The American Church",
    kicker: "American Church",
    description:
      "The institutions, habits, and theological drift of the church as it actually exists in America right now.",
    group: "essays",
    featured: true,
    navPrimary: true,
  },

  // Prophetic / justice
  {
    slug: "prophetic-justice",
    title: "Prophetic Justice",
    kicker: "Prophetic Justice",
    description:
      "Where the church has been silent and what faithfulness demands now — mishpat, tsedaqah, and the long arc.",
    group: "essays",
    navPrimary: true,
  },

  // Theological depth
  {
    slug: "theology",
    title: "Theological Depth",
    kicker: "Theology",
    description:
      "Hard questions. Real scholarship. Reading the Bible without shortcuts.",
    group: "essays",
    navPrimary: true,
  },

  // Pastoral ministry (PCN strategic channel)
  {
    slug: "pastoral-ministry",
    title: "Pastoring",
    kicker: "Pastoring",
    description:
      "The long work of pastoring — burnout, preaching, board conflict, soul care, and the calling underneath.",
    group: "ministry",
    navPrimary: true,
  },

  // Doubt / skeptic / faith crisis
  {
    slug: "doubt",
    title: "Doubt & Faith",
    kicker: "Doubt & Faith",
    description:
      "For skeptics, deconstructors, and Christians whose questions outgrew their answers.",
    group: "essays",
    navPrimary: true,
  },

  // Marriage and family
  {
    slug: "marriage",
    title: "Marriage",
    kicker: "Marriage",
    description:
      "Covenant, conflict, and the costly love that holds two lives together — read with the same scholarly weight as the political pieces.",
    group: "everyday",
    navPrimary: true,
  },
  {
    slug: "parenting",
    title: "Parenting",
    kicker: "Parenting",
    description:
      "Five sons in. Formation over performance, presence over advice. The long work of forming people inside a household.",
    group: "everyday",
    navPrimary: true,
  },
  {
    slug: "manhood",
    title: "Manhood",
    kicker: "Manhood",
    description:
      "What it means to be a man in a culture that has lost the language for either virtue or its opposite. Theological, not nostalgic.",
    group: "everyday",
    navPrimary: true,
  },
  {
    slug: "womanhood",
    title: "Womanhood",
    kicker: "Womanhood",
    description:
      "Womanhood as the church has actually held it, has failed it, and might yet recover it. Written with women, not over them.",
    group: "everyday",
    navPrimary: true,
  },
  {
    slug: "finances",
    title: "Money & Calling",
    kicker: "Money",
    description:
      "Why the church talks about sex more than money, and the theology underneath both. Vocation, debt, generosity, and what wealth costs the soul that holds it.",
    group: "everyday",
    navPrimary: true,
  },
  {
    slug: "devotionals",
    title: "Devotionals",
    kicker: "Devotional",
    description:
      "Short readings for the actual Tuesday afternoon — not the imagined retreat.",
    group: "everyday",
  },
];

export const TRACK_BY_SLUG: Map<string, Track> = new Map(
  TRACKS.map(t => [t.slug, t])
);

/**
 * Maps legacy `posts.pillar` values (and the old enum `posts.topic` values)
 * to current canonical track slugs. Used in both the front-end (when reading
 * pillar text from the DB) and the backfill script (when writing canonical
 * values back to the column).
 */
export const LEGACY_PILLAR_MAP: Record<string, string> = {
  // Old verbose pillars from the 2024-era seeds
  "Prophetic Disruption": "after-christendom",
  "Prophetic Justice": "prophetic-justice",
  "Theological Depth": "theology",
  "Leadership Formation": "pastoral-ministry",
  "Integrated Life": "marriage",

  // Old `posts.topic` enum values
  "justice": "prophetic-justice",
  "leadership": "pastoral-ministry",
  "spiritual-formation": "devotionals",
  "church-health": "pastoral-ministry",
  "personal-growth": "marriage",
  "pastoral-care": "pastoral-ministry",

  // Already-canonical pass-throughs
  "after-christendom": "after-christendom",
  "politics": "politics",
  "american-church": "american-church",
  "prophetic-justice": "prophetic-justice",
  "theology": "theology",
  "pastoral-ministry": "pastoral-ministry",
  "doubt": "doubt",
  "marriage": "marriage",
  "parenting": "parenting",
  "devotionals": "devotionals",
  "finances": "finances",
};

/** Given any legacy pillar or topic string, return the canonical track slug. */
export function pillarToTrack(input: string | null | undefined): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  return LEGACY_PILLAR_MAP[trimmed] ?? null;
}

/** Given any pillar string, resolve to a Track record (or null). */
export function resolveTrack(input: string | null | undefined): Track | null {
  const slug = pillarToTrack(input);
  return slug ? (TRACK_BY_SLUG.get(slug) ?? null) : null;
}

/** Canonical URL for filtering /writing by a track. */
export function trackUrl(slug: string): string {
  return `/writing?track=${slug}`;
}

/** Tracks that appear in the primary nav (excludes minor tracks like Devotionals). */
export const PRIMARY_TRACKS = TRACKS.filter(t => t.navPrimary);

/** Tracks that appear on the homepage hero strip. */
export const FEATURED_TRACKS = TRACKS.filter(t => t.featured);

// ─────────────────────────────────────────────────────────────────────────
// Two-movement pillar model (2026 library restructure; After Christendom
// merged into Living Well After Christendom, so ids run 1,2,3,5,6)
//
// This is the new canonical taxonomy. Like the track layer above, it resolves
// per-essay in CODE — PILLAR_ASSIGNMENTS first, then a coarse legacy fallback —
// so the legacy `posts.pillar` values in the database keep working and no
// migration is required for the site to render the new structure.
// ─────────────────────────────────────────────────────────────────────────

import { PILLAR_ASSIGNMENTS } from "./pillar-assignments";

export type Movement = "diagnosis" | "formation";

export interface Pillar {
  id: number;
  slug: string;
  name: string;
  /** Concise label for space-constrained contexts (card eyebrow chips). */
  short: string;
  movement: Movement;
  /** Neutral placeholder — James supplies the final on-voice intro. */
  blurb: string;
}

export const MOVEMENTS: Record<Movement, { title: string; subtitle: string }> = {
  diagnosis: { title: "Diagnosis", subtitle: "What was lost and why" },
  formation: { title: "Formation", subtitle: "How to live well on the other side" },
};

export const PILLARS_V2: Pillar[] = [
  { id: 1, slug: "capture-by-the-right", name: "The Capture by the Right", short: "The Right", movement: "diagnosis", blurb: "The faith conscripted into a flag — Christian nationalism, the gospel of patriotism, and the promise that the right party will do what only the cross can. We let it happen." },
  { id: 2, slug: "capture-by-the-left", name: "The Capture by the Left", short: "The Left", movement: "diagnosis", blurb: "The faith dissolved into a cause — progressive orthodoxy, compassion hardened into coercion, and the sins we stopped naming because they flattered our side." },
  { id: 3, slug: "reading-scripture-past-our-politics", name: "Reading Scripture Past Our Politics", short: "Scripture & Politics", movement: "diagnosis", blurb: "Tribe, translation, and tradition edit the text before we ever reach it. How to hear Scripture again on its own terms, not our politics'." },
  // id 4 (After Christendom) was merged into id 6 in 2026. The two named the
  // same arc — one asked what ended, the other what to build once it had — and
  // splitting them across the movements meant a reader met the diagnosis and
  // the answer in different rooms. The ids are deliberately left
  // non-contiguous: they are keys into PILLAR_ASSIGNMENTS, and renumbering
  // would silently re-file every essay on the site.
  { id: 5, slug: "the-pastoral-angle", name: "The Pastoral Angle", short: "Pastoral", movement: "diagnosis", blurb: "How an ordinary believer, and an ordinary pastor, actually lives inside all of this — the weight of it on a Tuesday, not from a stage." },
  { id: 6, slug: "living-well-after-christendom", name: "Living Well After Christendom", short: "Living Well", movement: "formation", blurb: "The old arrangement is over — cultural Christianity is dying, and the honest question is whether that is loss or freedom. This is the answer in practice: prayer, marriage, work, and rest, built on the kingdom of God instead of the culture that used to carry us." },
];

export const SUBTHEMES = [
  "marriage-covenant",
  "fatherhood",
  "parenting",
  "family-household",
  "friendship-community",
  "vocation-work",
  "practices",
] as const;
export type SubTheme = (typeof SUBTHEMES)[number];

export const PILLAR_BY_ID: Map<number, Pillar> = new Map(PILLARS_V2.map(p => [p.id, p]));
export const PILLAR_BY_SLUG: Map<string, Pillar> = new Map(PILLARS_V2.map(p => [p.slug, p]));

/** Coarse fallback for any essay not in PILLAR_ASSIGNMENTS, by legacy pillar. */
const LEGACY_TO_V2: Record<string, number> = {
  "Prophetic Disruption": 1,
  "Prophetic Justice": 1,
  "Theological Depth": 3,
  "Leadership Formation": 5,
  "Integrated Life": 6,
};

interface PostLike { slug?: string | null; pillar?: string | null }

/** Resolve a post to its primary Pillar under the new taxonomy. */
export function pillarForPost(post: PostLike): Pillar | null {
  const bySlug = post.slug ? PILLAR_ASSIGNMENTS[post.slug] : undefined;
  let id = bySlug?.pillar;
  if (!id && post.pillar) id = LEGACY_TO_V2[post.pillar.trim()];
  if (!id) id = 5; // default: The Pastoral Angle
  return PILLAR_BY_ID.get(id) ?? null;
}

/** Sub-themes for a post (primarily Pillar 6). */
export function subThemesForPost(post: PostLike): string[] {
  return (post.slug && PILLAR_ASSIGNMENTS[post.slug]?.subThemes) || [];
}

export const PILLARS_BY_MOVEMENT: Record<Movement, Pillar[]> = {
  diagnosis: PILLARS_V2.filter(p => p.movement === "diagnosis"),
  formation: PILLARS_V2.filter(p => p.movement === "formation"),
};

/** Canonical URL for filtering /writing by a pillar. */
export function pillarUrl(slug: string): string {
  return `/writing?pillar=${slug}`;
}
