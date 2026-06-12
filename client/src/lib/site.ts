// Single source of truth for site-wide constants. Use these everywhere
// instead of hardcoding URLs, the article count, or default images.

export const SITE_URL = "https://www.livewellbyjamesbell.co";
export const SITE_NAME = "LiveWell by James Bell";
export const AUTHOR_NAME = "James Bell";

// Default open-graph image when an article has no coverImage of its own.
// Place /public/og-default.png to override; see scripts/prerender-heads.mjs.
export const OG_DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

// Canonical URL for an article slug.
export function articleUrl(slug: string): string {
  return `${SITE_URL}/writing/${slug}`;
}

// Canonical URL for a book slug.
export function bookUrl(slug: string): string {
  return `${SITE_URL}/books/${slug}`;
}
