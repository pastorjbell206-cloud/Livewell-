/**
 * Two-level taxonomy: the 5 content pillars (the raw `posts.pillar` values) and
 * their sub-pathways. This is the single source of truth for the second-level
 * navigation, the admin "Sub-pathway" select, and the filtered listing pages.
 *
 * `posts.subPathway` stores the sub-pathway **label** (e.g. "Economic Justice").
 * URLs use the `slug` (e.g. /writing?pillar=prophetic-justice&sub=economic-justice).
 */

export interface SubPathway {
  /** Human label, stored in posts.subPathway. */
  label: string;
  /** URL-safe slug used in listing/nav links. */
  slug: string;
}

/** The 5 pillars in display order — these match the raw `posts.pillar` values. */
export const PILLAR_ORDER = [
  "Theological Depth",
  "Prophetic Justice",
  "Prophetic Disruption",
  "Leadership Formation",
  "Integrated Life",
] as const;

export type PillarName = (typeof PILLAR_ORDER)[number];

export const PILLAR_SUBPATHWAYS: Record<string, SubPathway[]> = {
  "Theological Depth": [
    { label: "Doctrine & Scripture", slug: "doctrine-scripture" },
    { label: "Church History", slug: "church-history" },
    { label: "Biblical Theology", slug: "biblical-theology" },
  ],
  "Prophetic Justice": [
    { label: "Economic Justice", slug: "economic-justice" },
    { label: "Race & Reconciliation", slug: "race-reconciliation" },
    { label: "The Vulnerable", slug: "the-vulnerable" },
    { label: "Systemic Sin", slug: "systemic-sin" },
  ],
  "Prophetic Disruption": [
    { label: "Church & Empire", slug: "church-empire" },
    { label: "Christian Nationalism", slug: "christian-nationalism" },
    { label: "Cultural Captivity", slug: "cultural-captivity" },
  ],
  "Leadership Formation": [
    { label: "Pastoral Health", slug: "pastoral-health" },
    { label: "Staff & Teams", slug: "staff-teams" },
    { label: "Preaching", slug: "preaching" },
    { label: "Church Revitalization", slug: "church-revitalization" },
  ],
  "Integrated Life": [
    { label: "Marriage & Family", slug: "marriage-family" },
    { label: "Rhythms & Sabbath", slug: "rhythms-sabbath" },
    { label: "Vocation & Money", slug: "vocation-money" },
  ],
};

/** Pillar → URL slug (for the pillar listing links). */
export const PILLAR_SLUGS: Record<string, string> = {
  "Theological Depth": "theological-depth",
  "Prophetic Justice": "prophetic-justice",
  "Prophetic Disruption": "prophetic-disruption",
  "Leadership Formation": "leadership-formation",
  "Integrated Life": "integrated-life",
};
export const PILLAR_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(PILLAR_SLUGS).map(([name, slug]) => [slug, name])
);

export const STUDY_GUIDES_LABEL = "Study Guides & Series";
export const STUDY_GUIDES_HREF = "/writing?series=true";

/** Sub-pathways defined for a pillar (empty if the pillar is unknown). */
export function subPathwaysForPillar(pillar: string | null | undefined): SubPathway[] {
  if (!pillar) return [];
  return PILLAR_SUBPATHWAYS[pillar.trim()] ?? [];
}

/** Resolve a sub-pathway label → its slug within a pillar. */
export function subPathwaySlug(pillar: string, label: string): string | undefined {
  return subPathwaysForPillar(pillar).find((s) => s.label === label)?.slug;
}

/** Resolve a sub-pathway slug → its label within a pillar. */
export function subPathwayLabel(pillar: string, slug: string): string | undefined {
  return subPathwaysForPillar(pillar).find((s) => s.slug === slug)?.label;
}

/** Listing URL for a pillar (+ optional sub-pathway). */
export function pillarListingUrl(pillar: string, subSlug?: string): string {
  const p = PILLAR_SLUGS[pillar] ?? encodeURIComponent(pillar);
  return subSlug ? `/writing?pillar=${p}&sub=${subSlug}` : `/writing?pillar=${p}`;
}

interface PostLike { pillar?: string | null; subPathway?: string | null; isSeries?: boolean | null }

/** Does a post match a pillar (+ optional sub-pathway slug)? */
export function postMatchesPillar(post: PostLike, pillar: string, subSlug?: string): boolean {
  if ((post.pillar ?? "").trim() !== pillar) return false;
  if (!subSlug) return true;
  return subPathwaySlug(pillar, post.subPathway ?? "") === subSlug;
}
