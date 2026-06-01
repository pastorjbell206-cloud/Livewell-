import { z } from "zod";
import { and, desc, eq, ne, or, sql } from "drizzle-orm";

import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { posts } from "../drizzle/schema";

/**
 * Returns up to 4 related articles for a given slug + pillar. Picks from the
 * same pillar first, fills the rest from other pillars. Returns only the
 * fields the related-card UI needs — body is NOT included.
 */
export const relatedArticlesRouter = router({
  getRelated: publicProcedure
    .input(z.object({ slug: z.string(), pillar: z.string().optional() }))
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) return [];

        const cols = {
          id: posts.id,
          slug: posts.slug,
          title: posts.title,
          excerpt: posts.excerpt,
          pillar: posts.pillar,
          topic: posts.topic,
          coverImage: posts.coverImage,
          readingTimeMinutes: posts.readingTimeMinutes,
          readTime: posts.readTime,
          publishedAt: posts.publishedAt,
        };

        if (input.pillar) {
          const samePillar = await db
            .select(cols)
            .from(posts)
            .where(
              and(
                eq(posts.pillar, input.pillar),
                ne(posts.slug, input.slug),
                eq(posts.published, true)
              )
            )
            .orderBy(desc(posts.publishedAt))
            .limit(4);

          if (samePillar.length >= 4) return samePillar;

          const needed = 4 - samePillar.length;
          const seenSlugs = new Set([
            input.slug,
            ...samePillar.map(p => p.slug),
          ]);

          const otherPillar = await db
            .select(cols)
            .from(posts)
            .where(
              and(eq(posts.published, true), ne(posts.slug, input.slug))
            )
            .orderBy(desc(posts.publishedAt))
            .limit(needed + samePillar.length + 4);

          const fill = otherPillar.filter(p => !seenSlugs.has(p.slug)).slice(0, needed);
          return [...samePillar, ...fill];
        }

        return db
          .select(cols)
          .from(posts)
          .where(and(eq(posts.published, true), ne(posts.slug, input.slug)))
          .orderBy(desc(posts.publishedAt))
          .limit(4);
      } catch (error) {
        console.error("[relatedArticles] failed:", error);
        return [];
      }
    }),
});
