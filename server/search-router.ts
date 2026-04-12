import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { globalSearch, searchArticles, searchResources, getTrendingArticles } from "./search-service";

export const searchRouter = router({
  /**
   * Global search across all content
   */
  global: publicProcedure
    .input(z.object({ query: z.string().min(1).max(100), limit: z.number().default(20) }))
    .query(async ({ input }) => {
      try {
        const results = await globalSearch(input.query, input.limit);
        return {
          success: true,
          query: input.query,
          results,
          count: results.length,
        };
      } catch (error: any) {
        console.error("[Search Router] Global search error:", error);
        throw new Error(error.message || "Search failed");
      }
    }),

  /**
   * Search only articles
   */
  articles: publicProcedure
    .input(z.object({ query: z.string().min(1).max(100), limit: z.number().default(20) }))
    .query(async ({ input }) => {
      try {
        const results = await searchArticles(input.query, input.limit);
        return {
          success: true,
          query: input.query,
          results,
          count: results.length,
        };
      } catch (error: any) {
        console.error("[Search Router] Article search error:", error);
        throw new Error(error.message || "Article search failed");
      }
    }),

  /**
   * Search only resources
   */
  resources: publicProcedure
    .input(z.object({ query: z.string().min(1).max(100), limit: z.number().default(20) }))
    .query(async ({ input }) => {
      try {
        const results = await searchResources(input.query, input.limit);
        return {
          success: true,
          query: input.query,
          results,
          count: results.length,
        };
      } catch (error: any) {
        console.error("[Search Router] Resource search error:", error);
        throw new Error(error.message || "Resource search failed");
      }
    }),

  /**
   * Get trending articles
   */
  trending: publicProcedure
    .input(z.object({ limit: z.number().default(5) }))
    .query(async ({ input }) => {
      try {
        const results = await getTrendingArticles(input.limit);
        return {
          success: true,
          results,
          count: results.length,
        };
      } catch (error: any) {
        console.error("[Search Router] Trending articles error:", error);
        throw new Error(error.message || "Failed to fetch trending articles");
      }
    }),
});
