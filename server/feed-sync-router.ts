import { router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { syncAllFeeds, syncFeed } from "./feed-sync-scheduler";

export const feedSyncRouter = router({
  /**
   * Admin: Manually trigger feed sync for all sources
   */
  syncAll: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");

      const result = await syncAllFeeds();

      return {
        success: result.success,
        message: `Sync complete: ${result.totalAdded} articles added, ${result.totalSkipped} skipped`,
        details: {
          substack: result.substack,
          pastorsConnection: result.pastorsConnection,
          totalAdded: result.totalAdded,
          totalSkipped: result.totalSkipped,
          errors: result.errors,
        },
      };
    } catch (error: any) {
      console.error("[Feed Sync Router] Error syncing all feeds:", error);
      throw new Error(error.message || "Failed to sync feeds");
    }
  }),

  /**
   * Admin: Manually trigger feed sync for a specific source
   */
  syncSource: protectedProcedure
    .input(z.object({ source: z.enum(["substack", "pastors-connection"]) }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");

        const feedUrls = {
          substack: "https://jamesbell.substack.com/feed",
          "pastors-connection": "https://www.pastorsconnection.com/feed",
        };

        const result = await syncFeed(feedUrls[input.source], input.source);

        return {
          success: result.success,
          message: `${input.source} sync complete: ${result.itemsAdded} added, ${result.itemsSkipped} skipped`,
          details: result,
        };
      } catch (error: any) {
        console.error(`[Feed Sync Router] Error syncing ${input.source}:`, error);
        throw new Error(error.message || `Failed to sync ${input.source}`);
      }
    }),

  /**
   * Get sync status and last sync time
   */
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");

      // Return sync status information
      return {
        success: true,
        lastSync: null, // Would be populated from database in production
        nextSync: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        sources: [
          {
            name: "Substack",
            id: "substack",
            url: "https://jamesbell.substack.com/feed",
            status: "active",
          },
          {
            name: "Pastors Connection",
            id: "pastors-connection",
            url: "https://www.pastorsconnection.com/feed",
            status: "active",
          },
        ],
      };
    } catch (error: any) {
      console.error("[Feed Sync Router] Error getting status:", error);
      throw new Error(error.message || "Failed to get sync status");
    }
  }),
});
