/**
 * series.ts — client-side essay series registry.
 *
 * The production backend has no `series` field on posts. Rather than wait on a
 * schema migration, ordering lives here as a small, hand-curated map. This is
 * intentional and manageable: the site has a finite, slow-growing set of long
 * essays, and the author controls which ones belong in an ordered arc. Editing
 * this file is the whole workflow — add a series object, list the article slugs
 * in reading order, ship.
 *
 * Article slugs here MUST match the post slugs the router resolves at
 * /writing/:slug. If a slug is wrong, that entry simply won't link to a real
 * article; nothing else breaks.
 */

export interface Series {
  /** URL segment for /series/:slug. Lowercase, hyphenated. */
  slug: string;
  /** Display title (Cormorant). */
  title: string;
  /** One-line description shown under the title. */
  description: string;
  /** Article slugs IN READING ORDER. These map to /writing/:slug. */
  articleSlugs: string[];
}

/**
 * The curated series. Each arc below is built from real published essay slugs
 * (drawn from the existing catalogue), grouped and ordered as a proposed
 * reading sequence.
 *
 * TODO (owner — James): this ORDER is a proposal. Reorder, add, or drop slugs
 * freely; add new Series objects for other arcs. If a slug here ever stops
 * resolving at /writing/:slug (e.g. an essay is unpublished or its slug
 * changes), that one entry simply won't link — nothing else breaks.
 */
export const SERIES: Series[] = [
  {
    slug: "church-after-christendom",
    title: "The Church After Christendom",
    description:
      "How the American church traded the kingdom for the flag — and what is left to confess.",
    articleSlugs: [
      "when-god-bless-america-replaces-thy-kingdom-come",
      "not-persecuted-seduced-crisis-american-christianity",
      "church-political-brand-step-back",
      "where-church-was-silent",
      "complicity-not-innocence",
      "church-credibility-problem",
    ],
  },
  {
    slug: "justice-as-doctrine",
    title: "Justice as a Doctrine of God",
    description:
      "Not a political category bolted onto the gospel — a word about who God is, read from the text on its own terms.",
    articleSlugs: [
      "justice-not-political-theological",
      "mishpat-tsedaqah",
      "micah-6-8-demands",
      "widow-orphan-stranger",
      "stranger-at-gate",
      "leviticus-19-border-crisis",
    ],
  },
  {
    slug: "staying-in-ministry",
    title: "Staying in Ministry",
    description:
      "For the pastor who is tired and not yet done — the long road through burnout and back.",
    articleSlugs: [
      "why-pastors-quit-and-how-to-stay",
      "hidden-pain-successful-pastor",
      "slow-burn-ministry-exhaustion",
      "return-ministry-after-burnout",
      "okay-to-see-counselor",
      "church-needs-you-healthy-not-busy",
    ],
  },
];

/**
 * Find the series an article belongs to, with its position and neighbors.
 *
 * Neighbors are computed purely from array order: `index` is the article's
 * position in `articleSlugs`; `prevSlug` is the entry before it (undefined at
 * the start) and `nextSlug` is the entry after it (undefined at the end).
 * Returns the FIRST series that contains the slug, or null if none do.
 */
export function getSeriesForArticle(articleSlug: string): {
  series: Series;
  index: number;
  total: number;
  prevSlug?: string;
  nextSlug?: string;
} | null {
  for (const series of SERIES) {
    const index = series.articleSlugs.indexOf(articleSlug);
    if (index === -1) continue;
    return {
      series,
      index,
      total: series.articleSlugs.length,
      prevSlug: index > 0 ? series.articleSlugs[index - 1] : undefined,
      nextSlug:
        index < series.articleSlugs.length - 1
          ? series.articleSlugs[index + 1]
          : undefined,
    };
  }
  return null;
}

/** Look up a single series by its URL slug. */
export function getSeriesBySlug(slug: string): Series | undefined {
  return SERIES.find(s => s.slug === slug);
}
