/**
 * Single source of truth for sitewide counts used in marketing copy.
 *
 * Book count is verified against the live `books` table (21 published titles).
 * Update it here only, never inline in components.
 *
 * NOTE: the essay/article count is intentionally NOT here. It is computed live
 * from the content layer via `useArticleCount()` (so it never goes stale), and
 * rendered as a marketing-rounded string like "240+".
 */
export const SITE_STATS = {
  bookCount: 21,
  bookCountWord: "twenty-one",
  yearsInMinistry: 15,
  yearsInMinistryWord: "fifteen",
  sonsCount: 5,
} as const;

/** Capitalized spelled-out book count, e.g. "Twenty-one". */
export const bookCountWordCap =
  SITE_STATS.bookCountWord.charAt(0).toUpperCase() + SITE_STATS.bookCountWord.slice(1);
