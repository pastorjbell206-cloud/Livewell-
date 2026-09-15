import { getDb } from "./db";
import { posts } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import type { FeedItem } from "./feed-parser";
import { shapeSyndicatedPost, type ShapedPost } from "./syndication-shape";

/**
 * Create a post from a feed item, or skip it.
 *
 * Returns the shaped row when a new draft was inserted, and null when the item
 * was skipped: unmapped slug, no /p/ link, non-Substack source, or a row with
 * that slug already exists. Callers count null as "skipped". Inserted rows are
 * UNPUBLISHED drafts, matching the admin importer — an editor publishes.
 */
export async function createSyndicatedArticle(feedItem: FeedItem): Promise<ShapedPost | null> {
  const shaped = shapeSyndicatedPost(feedItem);
  if (!shaped) {
    console.log(`[Syndication] Skipped (unmapped or no /p/ slug): ${feedItem.title}`);
    return null;
  }
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const existing = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, shaped.slug)).limit(1);
    if (existing.length > 0) {
      console.log(`[Syndication] Already present, skipped: ${shaped.slug}`);
      return null;
    }

    await db.insert(posts).values({
      title: shaped.title,
      slug: shaped.slug,
      excerpt: shaped.excerpt,
      body: shaped.body,
      pillar: shaped.pillar,
      subPathway: shaped.subPathway,
      isSeries: shaped.isSeries,
      readTime: shaped.readTime,
      publishedAt: shaped.publishedAt,
      published: false,
    });

    console.log(`[Syndication] Draft created: ${shaped.slug} (${shaped.pillar} / ${shaped.subPathway})`);
    return shaped;
  } catch (error: any) {
    console.error("[Syndication] Error creating article:", error);
    throw error;
  }
}

/**
 * Get recent syndicated articles
 */
export async function getRecentSyndicatedArticles(limit = 10) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const articles = await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.publishedAt))
      .limit(limit);

    return articles;
  } catch (error: any) {
    console.error("[Syndication] Error fetching articles:", error);
    throw error;
  }
}

/**
 * Get articles by source.
 *
 * Synced Substack posts no longer carry a fake "Substack" pillar; the ones
 * worth listing as a source are the serialized book, which is tagged isSeries.
 * Legacy Pastors Connection rows keep their old pillar label.
 */
export async function getArticlesBySource(source: "substack" | "pastors-connection", limit = 10) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const where =
      source === "substack"
        ? and(eq(posts.published, true), eq(posts.isSeries, true))
        : and(eq(posts.published, true), eq(posts.pillar, "Pastors Connection"));

    const articles = await db.select().from(posts).where(where).orderBy(desc(posts.publishedAt)).limit(limit);

    return articles;
  } catch (error: any) {
    console.error("[Syndication] Error fetching articles by source:", error);
    throw error;
  }
}

/**
 * Delete old syndicated articles (keep only last 100)
 */
export async function cleanupOldSyndicatedArticles() {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Get all syndicated articles sorted by date
    const allArticles = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.publishedAt));

    // Delete articles beyond the 100 most recent
    if (allArticles.length > 100) {
      const toDelete = allArticles.slice(100);
      console.log(`[Syndication] Would clean up ${toDelete.length} old articles`);
    }
  } catch (error: any) {
    console.error("[Syndication] Error cleaning up articles:", error);
    throw error;
  }
}
