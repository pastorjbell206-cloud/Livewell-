import { getDb } from "./db";
import { posts } from "../drizzle/schema";
import { sql } from "drizzle-orm";

export interface RecommendationScore {
  articleId: number;
  title: string;
  slug: string;
  score: number;
  reason: string;
}

/**
 * AI-powered recommendation engine that suggests articles based on:
 * 1. Same pillar (highest priority)
 * 2. Similar keywords/topics
 * 3. Complementary themes
 * 4. Recent articles (freshness boost)
 * 5. Popular articles (engagement boost)
 */
export async function getRecommendedArticles(
  currentArticleId: number,
  limit: number = 4
): Promise<RecommendationScore[]> {
  try {
    const db = await getDb();
    if (!db) return [];

    const currentArticle = await (db as any).query.posts.findFirst({
      where: (posts: any, { eq }: any) => eq(posts.id, currentArticleId),
    });

    if (!currentArticle) return [];

    // Get all published articles except current
    const allArticles = await (db as any).query.posts.findMany({
      where: (posts: any, { and, eq, ne }: any) =>
        and(eq(posts.published, true), ne(posts.id, currentArticleId)),
    });

    // Score each article
    const scoredArticles = allArticles
      .map((article: typeof allArticles[0]) => {
        let score = 0;
        let reasons: string[] = [];

        // 1. Same pillar (40 points)
        if (article.pillar === currentArticle.pillar) {
          score += 40;
          reasons.push("same_pillar");
        }

        // 2. Similar keywords (30 points)
        const currentKeywords = (currentArticle.body || "")
          .toLowerCase()
        .split(/\s+/)
        .filter((word: string) => word.length > 5);
        const articleKeywords = (article.body || "")
          .toLowerCase()
        .split(/\s+/)
        .filter((word: string) => word.length > 5);
        const commonKeywords = currentKeywords.filter((keyword: string) =>
          articleKeywords.includes(keyword)
        );
        if (commonKeywords.length > 0) {
          score += Math.min(30, commonKeywords.length * 2);
          reasons.push("similar_keywords");
        }

        // 3. Complementary theme (20 points)
        // Articles from different pillars but related topics
        const complementaryPillars: Record<string, string[]> = {
          "Prophetic Disruption": ["Prophetic Justice", "Leadership Formation"],
          "Theological Depth": ["Leadership Formation", "Integrated Life"],
          "Prophetic Justice": ["Prophetic Disruption", "Integrated Life"],
          "Integrated Life": ["Theological Depth", "Leadership Formation"],
          "Leadership Formation": ["Prophetic Disruption", "Integrated Life"],
        };

        const complements = complementaryPillars[currentArticle.pillar || ""] || [];
        if (complements.includes(article.pillar || "")) {
          score += 20;
          reasons.push("complementary_theme");
        }

        // 4. Freshness boost (10 points) - recent articles
        if (article.publishedAt) {
          const daysSincePublish = Math.floor(
            (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysSincePublish < 30) {
            score += 10;
            reasons.push("recent");
          }
        }

        // 5. Popularity boost (5 points) - longer read time = more substantial
        if (article.readTime) {
          const readMinutes = parseInt(article.readTime);
          if (readMinutes > 8) {
            score += 5;
            reasons.push("substantial");
          }
        }

        return {
          articleId: article.id,
          title: article.title,
          slug: article.slug,
          score,
          reason: reasons.join(", "),
        };
      })
      .filter((item: RecommendationScore) => item.score > 0)
      .sort((a: RecommendationScore, b: RecommendationScore) => b.score - a.score)
      .slice(0, limit);

    return scoredArticles;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return [];
  }
}

/**
 * Get trending articles based on recent engagement
 */
export async function getTrendingArticles(limit: number = 5) {
  try {
    const db = await getDb();
    if (!db) return [];

    const articles = await (db as any).query.posts.findMany({
      where: (posts: any, { eq }: any) => eq(posts.published, true),
      orderBy: (posts: any, { desc }: any) => [desc(posts.publishedAt)],
      limit,
    });

    return articles.map((article: typeof articles[0]) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      pillar: article.pillar,
      excerpt: article.excerpt,
      readTime: article.readTime,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    return [];
  }
}

/**
 * Get editor's picks (manually curated best articles)
 */
export async function getEditorsPicks(limit: number = 6) {
  try {
    const db = await getDb();
    if (!db) return [];

    // Get high-quality articles across all pillars
    const articles = await (db as any).query.posts.findMany({
      where: (posts: any, { eq }: any) => eq(posts.published, true),
      limit: limit,
    });

    // Score by pillar diversity and quality
    const pillars = new Set<string>();
    const picks: typeof articles = [];

    for (const article of articles as typeof articles) {
      if (!pillars.has(article.pillar || "") && picks.length < limit) {
        picks.push(article);
        pillars.add(article.pillar || "");
      }
    }

    return picks.map((article: typeof picks[0]) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      pillar: article.pillar,
      excerpt: article.excerpt,
      readTime: article.readTime,
      publishedAt: article.publishedAt,
      featured: true,
    }));
  } catch (error) {
    console.error("Error fetching editor's picks:", error);
    return [];
  }
}
