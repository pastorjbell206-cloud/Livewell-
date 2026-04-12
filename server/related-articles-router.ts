import { publicProcedure, router } from "./_core/trpc";
import { listPosts } from "./db";
import { z } from "zod";

export const relatedArticlesRouter = router({
  getRelated: publicProcedure
    .input(z.object({ slug: z.string(), pillar: z.string() }))
    .query(async ({ input }) => {
      try {
        // Get all posts
        const allPosts = await listPosts();
        
        // Get articles from the same pillar, excluding the current one
        const relatedArticles = allPosts
          .filter((post) => post.pillar === input.pillar && post.slug !== input.slug)
          .slice(0, 4);

        // If we have fewer than 3 articles from the same pillar, get articles from other pillars
        if (relatedArticles.length < 3) {
          const otherArticles = allPosts
            .filter((post) => post.slug !== input.slug && !relatedArticles.find((r) => r.slug === post.slug))
            .slice(0, 4 - relatedArticles.length);

          return [...relatedArticles, ...otherArticles].slice(0, 4);
        }

        return relatedArticles.slice(0, 4);
      } catch (error) {
        console.error("Error fetching related articles:", error);
        return [];
      }
    }),
});
