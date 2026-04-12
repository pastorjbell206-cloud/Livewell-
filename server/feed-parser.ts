import { parseStringPromise } from "xml2js";

export interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  source: "substack" | "pastors-connection";
  guid?: string;
}

/**
 * Parse RSS feed and extract articles
 */
export async function parseFeed(feedUrl: string, source: "substack" | "pastors-connection"): Promise<FeedItem[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Livewell/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.statusText}`);
    }

    let feedContent = await response.text();
    
    // Clean up malformed XML
    feedContent = feedContent
      .replace(/&(?!(?:apos|quot|amp|lt|gt|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;")
      .replace(/([^\s])([<>])/g, "$1 $2")
      .replace(/\s{2,}/g, " ");
    
    const parsed = await parseStringPromise(feedContent, {
      strict: false,
      normalizeTags: true,
      attrNameProcessors: [(name) => name.toLowerCase()],
    });

    // Handle both RSS and Atom feeds
    const items = parsed.rss?.channel?.[0]?.item || parsed.feed?.entry || [];

    return items.map((item: any) => {
      // Handle various link formats
      let link = "";
      if (item.link) {
        if (Array.isArray(item.link)) {
          link = item.link[0]?.$ ? item.link[0].$.href : item.link[0];
        } else {
          link = item.link.$ ? item.link.$.href : item.link;
        }
      }
      
      return {
        title: (Array.isArray(item.title) ? item.title[0] : item.title) || "Untitled",
        link: link || "",
        description: (Array.isArray(item.description) ? item.description[0] : item.description) || 
                     (Array.isArray(item.summary) ? item.summary[0] : item.summary) || "",
        pubDate: (Array.isArray(item.pubdate) ? item.pubdate[0] : item.pubdate) || 
                 (Array.isArray(item.published) ? item.published[0] : item.published) || 
                 new Date().toISOString(),
        author: (Array.isArray(item.author) ? item.author[0]?.name?.[0] : item.author?.name?.[0]) || 
                (Array.isArray(item.creator) ? item.creator[0] : item.creator) || "Unknown",
        source,
        guid: (Array.isArray(item.guid) ? item.guid[0] : item.guid) || 
              (Array.isArray(item.id) ? item.id[0] : item.id) || "",
      };
    });
  } catch (error: any) {
    console.error(`[Feed Parser] Error parsing ${source} feed:`, error);
    throw new Error(`Failed to parse feed from ${source}: ${error.message}`);
  }
}

/**
 * Fetch and parse Substack feed
 */
export async function fetchSubstackFeed(substackUrl: string): Promise<FeedItem[]> {
  try {
    // Try multiple Substack feed URL formats
    const baseUrl = substackUrl.replace(/\/$/, "");
    const feedUrls = [
      `${baseUrl}/feed`,
      `${baseUrl}/feed.xml`,
      `${baseUrl}/feed.rss`,
    ];
    
    for (const feedUrl of feedUrls) {
      try {
        return await parseFeed(feedUrl, "substack");
      } catch (e) {
        // Try next URL
        continue;
      }
    }
    
    throw new Error("Could not fetch Substack feed from any known URL format");
  } catch (error: any) {
    console.error("[Feed Parser] Error fetching Substack feed:", error);
    throw error;
  }
}

/**
 * Fetch and parse Pastors Connection feed
 */
export async function fetchPastorsConnectionFeed(feedUrl: string): Promise<FeedItem[]> {
  return await parseFeed(feedUrl, "pastors-connection");
}

/**
 * Deduplicate articles by title and link
 */
export function deduplicateArticles(articles: FeedItem[]): FeedItem[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    const key = `${article.title}|${article.link}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Sort articles by date (newest first)
 */
export function sortByDate(articles: FeedItem[]): FeedItem[] {
  return articles.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime();
    const dateB = new Date(b.pubDate).getTime();
    return dateB - dateA;
  });
}
