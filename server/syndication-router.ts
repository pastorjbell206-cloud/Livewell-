import { router, publicProcedure, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { parseFeed, deduplicateArticles, sortByDate } from "./feed-parser";
import { createSyndicatedArticle, getArticlesBySource } from "./db-syndication";

export const syndicationRouter = router({
  /**
   * Get recent articles from Substack
   */
  getSubstackArticles: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input }) => {
      try {
        const articles = await getArticlesBySource("substack", input.limit);
        return {
          success: true,
          articles: articles.map((a) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
            excerpt: a.excerpt,
            publishedAt: a.publishedAt,
            readTime: a.readTime,
          })),
        };
      } catch (error: any) {
        console.error("[Syndication Router] Error fetching Substack articles:", error);
        throw new Error(error.message || "Failed to fetch Substack articles");
      }
    }),

  /**
   * Get recent articles from Pastors Connection
   */
  getPastorsConnectionArticles: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input }) => {
      try {
        const articles = await getArticlesBySource("pastors-connection", input.limit);
        return {
          success: true,
          articles: articles.map((a) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
            excerpt: a.excerpt,
            publishedAt: a.publishedAt,
            readTime: a.readTime,
          })),
        };
      } catch (error: any) {
        console.error("[Syndication Router] Error fetching Pastors Connection articles:", error);
        throw new Error(error.message || "Failed to fetch Pastors Connection articles");
      }
    }),

  /**
   * Admin: Manually sync Substack feed
   */
  syncSubstackFeed: adminProcedure
    .input(z.object({ feedUrl: z.string().url() }))
    .mutation(async ({ input }) => {
      try {
        console.log("[Syndication] Starting Substack sync...");
        const articles = await parseFeed(input.feedUrl, "substack");
        const deduplicated = deduplicateArticles(articles);
        const sorted = sortByDate(deduplicated);

        let created = 0;
        for (const article of sorted.slice(0, 20)) {
          // Limit to 20 articles per sync
          try {
            await createSyndicatedArticle(article);
            created++;
          } catch (error) {
            console.warn(`[Syndication] Failed to create article: ${article.title}`, error);
          }
        }

        return {
          success: true,
          message: `Synced ${created} articles from Substack`,
          articlesProcessed: sorted.length,
          articlesCreated: created,
        };
      } catch (error: any) {
        console.error("[Syndication Router] Sync error:", error);
        throw new Error(error.message || "Failed to sync Substack feed");
      }
    }),

  /**
   * Admin: Manually sync Pastors Connection feed
   */
  syncPastorsConnectionFeed: adminProcedure
    .input(z.object({ feedUrl: z.string().url() }))
    .mutation(async ({ input }) => {
      try {
        console.log("[Syndication] Starting Pastors Connection sync...");
        const articles = await parseFeed(input.feedUrl, "pastors-connection");
        const deduplicated = deduplicateArticles(articles);
        const sorted = sortByDate(deduplicated);

        let created = 0;
        for (const article of sorted.slice(0, 20)) {
          // Limit to 20 articles per sync
          try {
            await createSyndicatedArticle(article);
            created++;
          } catch (error) {
            console.warn(`[Syndication] Failed to create article: ${article.title}`, error);
          }
        }

        return {
          success: true,
          message: `Synced ${created} articles from Pastors Connection`,
          articlesProcessed: sorted.length,
          articlesCreated: created,
        };
      } catch (error: any) {
        console.error("[Syndication Router] Sync error:", error);
        throw new Error(error.message || "Failed to sync Pastors Connection feed");
      }
    }),
});
