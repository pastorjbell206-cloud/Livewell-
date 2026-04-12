import Parser from "rss-parser";
import { getDb, createPost } from "./db";
import { posts } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const parser = new Parser();

export interface FeedSource {
  name: string;
  url: string;
  source: "substack" | "rss";
}

/**
 * Fetch and parse RSS feed, returning articles
 */
export async function fetchFeedArticles(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items || [];
  } catch (error) {
    console.error(`[RSS] Error fetching feed from ${feedUrl}:`, error);
    return [];
  }
}

/**
 * Sync articles from a feed source into the database
 */
export async function syncFeedSource(source: FeedSource) {
  console.log(`[RSS] Syncing ${source.name} from ${source.url}`);

  const items = await fetchFeedArticles(source.url);
  let imported = 0;

  for (const item of items) {
    if (!item.title || !item.link) continue;

    // Generate slug from title
    const slug = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if post already exists
    const db = await getDb();
    if (!db) {
      console.error("[RSS] Database not available");
      continue;
    }
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (existingPost.length > 0) {
      console.log(`[RSS] Post already exists: ${slug}`);
      continue;
    }

    // Create new post
    try {
      await createPost({
        title: item.title,
        slug,
        excerpt: item.contentSnippet || item.description || "",
        body: item.content || item.description || "",
        pillar: "Prophetic Disruption",
        readTime: "5 min read",
        published: true,
        featured: false,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        coverImage: null,
      });
      imported++;
      console.log(`[RSS] Imported: ${item.title}`);
    } catch (error) {
      console.error(`[RSS] Error importing ${item.title}:`, error);
    }
  }

  console.log(`[RSS] Synced ${source.name}: ${imported} new articles`);
  return imported;
}

/**
 * Sync all configured feed sources
 */
export async function syncAllFeeds() {
  const sources: FeedSource[] = [
    {
      name: "Substack",
      url: "https://jamesbell333289.substack.com/feed",
      source: "substack",
    },
  ];

  console.log("[RSS] Starting feed sync...");
  let totalImported = 0;

  for (const source of sources) {
    try {
      const count = await syncFeedSource(source);
      totalImported += count;
    } catch (error) {
      console.error(`[RSS] Error syncing ${source.name}:`, error);
    }
  }

  console.log(`[RSS] Feed sync complete. Total imported: ${totalImported}`);
  return totalImported;
}
