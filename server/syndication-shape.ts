/**
 * Pure shaping for Substack feed items — no database, no network — so it can be
 * unit-tested and shared by the dev sync (server/db-syndication.ts).
 *
 * Every Substack post is filed through the SAME mapping the admin importer
 * uses (client/src/lib/substackImport.ts): the serialized book is stored in
 * teaser mode so it stays a reason to subscribe; mapped essays are stored in
 * full; anything unmapped is skipped rather than guessed. The slug is the
 * Substack /p/ slug, so re-runs are idempotent and the row can be matched by
 * pillar-assignments.ts. The previous sync wrote the literal pillar "Substack"
 * (not a pillar — every such row resolved to the pastoral default), appended
 * Date.now() to the slug, and published on insert, so each run re-inserted and
 * immediately published duplicates of the whole feed.
 */
import type { FeedItem } from "./feed-parser";
import { categoryForSlug, slugFromLink, htmlToMarkdown, readTimeFor } from "@/lib/substackImport";

export const SERIES_TITLE = "The End of Christian America";

export interface ShapedPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  pillar: string;
  subPathway: string;
  isSeries: boolean;
  readTime: string;
  publishedAt: Date;
}

/** Tags out, common entities decoded, whitespace collapsed. For excerpts and titles. */
export function plainText(html: string): string {
  return (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#39;|&apos;|&#8217;|&#8216;|&rsquo;|&lsquo;/g, "'")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Shape a feed item into a post row, or null when it should be skipped:
 * not a Substack item, no /p/ slug in the link, or a slug the mapping does not
 * know. The Pastors Connection feed is deliberately not shaped here — that
 * material moved to its own platform and is not rebuilt on this site.
 */
export function shapeSyndicatedPost(item: FeedItem): ShapedPost | null {
  if (item.source !== "substack") return null;
  const slug = slugFromLink(item.link);
  if (!slug) return null;
  const cat = categoryForSlug(slug);
  if (!cat) return null;

  const excerpt = plainText(item.description).slice(0, 300);
  const body =
    cat.mode === "teaser"
      ? `${excerpt}\n\n*This is part of the serialized series “${SERIES_TITLE}.”*\n\n[Read the full essay on Substack →](${item.link})`
      : htmlToMarkdown(item.content || "") || `${excerpt}\n\n[Read on Substack →](${item.link})`;

  const when = new Date(item.pubDate);
  return {
    slug,
    title: plainText(item.title) || "Untitled",
    excerpt,
    body,
    pillar: cat.pillar,
    subPathway: cat.sub,
    isSeries: cat.series,
    readTime: readTimeFor(body),
    publishedAt: Number.isNaN(when.getTime()) ? new Date() : when,
  };
}
