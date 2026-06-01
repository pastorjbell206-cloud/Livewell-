// Single source of truth for site-wide constants. Use these everywhere
// instead of hardcoding URLs, the article count, or default images.

export const SITE_URL = "https://www.livewellbyjamesbell.co";
export const SITE_NAME = "LiveWell by James Bell";
export const AUTHOR_NAME = "James Bell";
export const AUTHOR_EMAIL = "Pastorjbell206@gmail.com";

// Tagline + brand promise (see CLAUDE.md §Voice/Tone)
export const SITE_TAGLINE =
  "Connecting the depth of theology to the weight of everyday life.";

// Default open-graph image when an article has no coverImage of its own.
// Place /public/og-default.png to override; see scripts/prerender-heads.mjs.
export const OG_DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

// Don't lie about the corpus size. Treat this as a floor; the writing index
// renders the actual count from the DB. Used only for static SEO descriptions.
export const ARTICLE_COUNT_FLOOR = 161;
export const BOOK_COUNT_FLOOR = 21;

// Canonical URL for an article slug.
export function articleUrl(slug: string): string {
  return `${SITE_URL}/writing/${slug}`;
}

// Canonical URL for a book slug.
export function bookUrl(slug: string): string {
  return `${SITE_URL}/books/${slug}`;
}

// Canonical URL for a reading path slug.
export function readingPathUrl(slug: string): string {
  return `${SITE_URL}/reading-paths/${slug}`;
}
