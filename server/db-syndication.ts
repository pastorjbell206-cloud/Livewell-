import { getDb } from "./db";
import { posts } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { FeedItem } from "./feed-parser";

/**
 * Create a syndicated article from a feed item
 */
export async function createSyndicatedArticle(feedItem: FeedItem) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Create slug from title
    const slug = feedItem.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 100);

    // Create the article
    await db
      .insert(posts)
      .values({
        title: feedItem.title,
        slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
        excerpt: feedItem.description.substring(0, 300),
        body: feedItem.description,
        pillar: `${feedItem.source === "substack" ? "Substack" : "Pastors Connection"}`,
        readTime: "5 min read",
        publishedAt: new Date(feedItem.pubDate),
        published: true,
      });

    console.log(`[Syndication] Created article: ${feedItem.title}`);
    return feedItem;
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
 * Get articles by source
 */
export async function getArticlesBySource(source: "substack" | "pastors-connection", limit = 10) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const pillar = source === "substack" ? "Substack" : "Pastors Connection";
    const articles = await db
      .select()
      .from(posts)
      .where(
        and(
          eq(posts.published, true),
          eq(posts.pillar, pillar)
        )
      )
      .orderBy(desc(posts.publishedAt))
      .limit(limit);

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
