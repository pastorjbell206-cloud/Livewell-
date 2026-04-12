import { publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { getRecommendedArticles, getTrendingArticles, getEditorsPicks } from "./recommendation-engine";

export const recommendationRouter = {
  getRecommendations: publicProcedure
    .input(z.object({ articleId: z.number(), limit: z.number().default(4) }))
    .query(async ({ input }) => {
      return await getRecommendedArticles(input.articleId, input.limit);
    }),

  getTrending: publicProcedure
    .input(z.object({ limit: z.number().default(5) }))
    .query(async ({ input }) => {
      return await getTrendingArticles(input.limit);
    }),

  getEditorsPicks: publicProcedure
    .input(z.object({ limit: z.number().default(6) }))
    .query(async ({ input }) => {
      return await getEditorsPicks(input.limit);
    }),
};
