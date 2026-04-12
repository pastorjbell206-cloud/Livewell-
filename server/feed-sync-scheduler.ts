import { parseFeed } from "./feed-parser";
import { createSyndicatedArticle } from "./db-syndication";

const FEED_URLS = {
  substack: "https://jamesbell.substack.com/feed", // Replace with actual Substack feed URL
  pastorsConnection: "https://www.pastorsconnection.com/feed", // Replace with actual Pastors Connection feed URL
};

/**
 * Sync articles from a single feed
 */
export async function syncFeed(feedUrl: string, source: "substack" | "pastors-connection"): Promise<{
  success: boolean;
  itemsAdded: number;
  itemsSkipped: number;
  error?: string;
}> {
  try {
    console.log(`[Feed Sync] Starting sync for ${source} from ${feedUrl}`);

    const feedItems = await parseFeed(feedUrl, source);
    let itemsAdded = 0;
    let itemsSkipped = 0;

    for (const item of feedItems) {
      try {
        await createSyndicatedArticle(item);
        itemsAdded++;
        console.log(`[Feed Sync] Added article: ${item.title}`);
      } catch (error) {
        console.error(`[Feed Sync] Error syncing item: ${item.title}`, error);
        itemsSkipped++;
      }
    }

    console.log(`[Feed Sync] Completed ${source}: ${itemsAdded} added, ${itemsSkipped} skipped`);

    return {
      success: true,
      itemsAdded,
      itemsSkipped,
    };
  } catch (error: any) {
    console.error(`[Feed Sync] Error syncing feed ${source}:`, error);
    return {
      success: false,
      itemsAdded: 0,
      itemsSkipped: 0,
      error: error.message,
    };
  }
}

/**
 * Sync all configured feeds
 */
export async function syncAllFeeds(): Promise<{
  success: boolean;
  substack: { itemsAdded: number; itemsSkipped: number };
  pastorsConnection: { itemsAdded: number; itemsSkipped: number };
  totalAdded: number;
  totalSkipped: number;
  errors: string[];
}> {
  console.log("[Feed Sync] Starting daily feed sync...");

  const errors: string[] = [];
  let totalAdded = 0;
  let totalSkipped = 0;

  // Sync Substack
  const substackResult = await syncFeed(FEED_URLS.substack, "substack");
  if (!substackResult.success && substackResult.error) {
    errors.push(`Substack: ${substackResult.error}`);
  }
  totalAdded += substackResult.itemsAdded;
  totalSkipped += substackResult.itemsSkipped;

  // Sync Pastors Connection
  const pastorsResult = await syncFeed(FEED_URLS.pastorsConnection, "pastors-connection");
  if (!pastorsResult.success && pastorsResult.error) {
    errors.push(`Pastors Connection: ${pastorsResult.error}`);
  }
  totalAdded += pastorsResult.itemsAdded;
  totalSkipped += pastorsResult.itemsSkipped;

  console.log(`[Feed Sync] Daily sync complete: ${totalAdded} added, ${totalSkipped} skipped`);

  return {
    success: errors.length === 0,
    substack: {
      itemsAdded: substackResult.itemsAdded,
      itemsSkipped: substackResult.itemsSkipped,
    },
    pastorsConnection: {
      itemsAdded: pastorsResult.itemsAdded,
      itemsSkipped: pastorsResult.itemsSkipped,
    },
    totalAdded,
    totalSkipped,
    errors,
  };
}

/**
 * Initialize scheduled feed sync (runs daily at 6 AM)
 * This should be called once when the server starts
 */
export function initializeFeedSync(): void {
  // Calculate time until next 6 AM
  const now = new Date();
  const nextSync = new Date();
  nextSync.setHours(6, 0, 0, 0);

  if (now > nextSync) {
    nextSync.setDate(nextSync.getDate() + 1);
  }

  const timeUntilSync = nextSync.getTime() - now.getTime();

  console.log(`[Feed Sync] Scheduled for ${nextSync.toISOString()}`);

  // Schedule first sync
  setTimeout(() => {
    syncAllFeeds().catch((error) => {
      console.error("[Feed Sync] Error during scheduled sync:", error);
    });

    // Schedule recurring daily sync
    setInterval(() => {
      syncAllFeeds().catch((error) => {
        console.error("[Feed Sync] Error during scheduled sync:", error);
      });
    }, 24 * 60 * 60 * 1000); // Every 24 hours
  }, timeUntilSync);
}
