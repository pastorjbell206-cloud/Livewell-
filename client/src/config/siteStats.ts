/**
 * Single source of truth for sitewide counts used in marketing copy.
 *
 * No book count (James's decision, 29 Sept 2026): the site says "author" and
 * lists the books at /books; it never states how many. The only tenure the
 * site states is twelve years at First Baptist Church of Fenton, written out
 * where it is used.
 *
 * NOTE: the essay/article count is intentionally NOT here. It is computed live
 * from the content layer via `useArticleCount()` (so it never goes stale), and
 * rendered as a marketing-rounded string like "240+".
 */
export const SITE_STATS = {
  sonsCount: 5,
} as const;
