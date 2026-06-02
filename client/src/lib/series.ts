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
 * The curated series. Seeded with one EXAMPLE so the page and banner render.
 *
 * TODO (owner): replace the `articleSlugs` below with your real essay slugs,
 * in the order you want readers to move through them. The placeholder slugs
 * are plausible but almost certainly do not exist in the database yet — swap
 * them for actual post slugs from /writing. Add more Series objects to this
 * array to create additional arcs.
 */
export const SERIES: Series[] = [
  {
    slug: "the-reconstruction-project",
    title: "The Reconstruction Project",
    description:
      "For the reader whose faith has come apart — not a way back to certainty, but a way forward through it.",
    // TODO (owner): replace these placeholder slugs with real essay slugs.
    articleSlugs: [
      "when-the-answers-stopped-working",
      "doubt-is-not-the-enemy",
      "rebuilding-on-the-rubble",
      "a-faith-that-can-be-questioned",
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
