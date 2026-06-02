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
// Rendered by the dynamic OG Edge function (see api/og.tsx) so the brand card
// always exists — there is no static og-default.png in the repo.
export const OG_DEFAULT_IMAGE = `${SITE_URL}/api/og?title=${encodeURIComponent("LiveWell by James Bell")}&pillar=${encodeURIComponent("Theology for everyday life")}`;

// Don't lie about the corpus size. Treat this as a floor; the writing index
// renders the actual count from the DB. Used only for static SEO descriptions.
export const ARTICLE_COUNT_FLOOR = 161;
export const BOOK_COUNT_FLOOR = 21;

// Canonical URL for an article slug.
export function articleUrl(slug: string): string {
  return `${SITE_URL}/writing/${slug}`;
}

// Dynamic, per-essay Open Graph image rendered by the Vercel Edge function at
// /api/og (see api/og.tsx). Produces a branded 1200×630 card from the title
// and pillar, so each essay gets a unique social card instead of the single
// static og-default.png.
export function ogImageUrl(title: string, pillar?: string): string {
  const params = new URLSearchParams({ title });
  if (pillar) params.set("pillar", pillar);
  return `${SITE_URL}/api/og?${params.toString()}`;
}

// Canonical URL for a book slug.
export function bookUrl(slug: string): string {
  return `${SITE_URL}/books/${slug}`;
}

// Canonical URL for a reading path slug.
export function readingPathUrl(slug: string): string {
  return `${SITE_URL}/reading-paths/${slug}`;
}
