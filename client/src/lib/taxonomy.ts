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

/** Tracks grouped for the nav dropdowns. */
export const TRACK_GROUPS: Record<Track["group"], Track[]> = {
  essays: TRACKS.filter(t => t.group === "essays"),
  ministry: TRACKS.filter(t => t.group === "ministry"),
  everyday: TRACKS.filter(t => t.group === "everyday"),
};
