import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  trackPageView,
  trackConversion,
  getArticleMetrics,
  getTrendingByViews,
  getConversionFunnel,
  getReferralSources,
} from "./analytics-service";

export const analyticsRouter = router({
  // Track page view
  trackView: publicProcedure
    .input(
      z.object({
        articleId: z.number(),
        slug: z.string(),
        referrer: z.string().optional(),
        userAgent: z.string().optional(),
        sessionId: z.string(),
      })
    )
    .mutation(({ input }) => {
      trackPageView({
        articleId: input.articleId,
        slug: input.slug,
        timestamp: new Date(),
        referrer: input.referrer,
        userAgent: input.userAgent,
        sessionId: input.sessionId,
      });
      return { success: true };
    }),

  // Track conversion event
  trackConversion: publicProcedure
    .input(
      z.object({
        type: z.enum(["email_signup", "lead_magnet_download", "book_purchase", "reading_path_start"]),
        articleId: z.number().optional(),
        userId: z.string().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(({ input }) => {
      trackConversion({
        type: input.type,
        articleId: input.articleId,
        userId: input.userId,
        timestamp: new Date(),
        metadata: input.metadata,
      });
      return { success: true };
    }),

  // Get article metrics
  getMetrics: publicProcedure
    .input(z.object({ articleId: z.number() }))
    .query(({ input }) => {
      return getArticleMetrics(input.articleId);
    }),

  // Get trending articles
  getTrending: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(({ input }) => {
      return getTrendingByViews(input.limit);
    }),

  // Get conversion funnel
  getConversionFunnel: publicProcedure.query(() => {
    return getConversionFunnel();
  }),

  // Get referral sources
  getReferrals: publicProcedure.query(() => {
    return getReferralSources();
  }),
});
