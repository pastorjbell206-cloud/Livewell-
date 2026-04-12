import { getDb } from "./db";
import { posts, resources, books } from "../drizzle/schema";
import { like, or, and, eq, desc } from "drizzle-orm";

export interface SearchResult {
  id: number;
  type: "article" | "resource" | "book";
  title: string;
  excerpt?: string;
  slug?: string;
  url?: string;
  category?: string;
  publishedAt?: Date;
}

/**
 * Search across articles, resources, and books
 */
export async function globalSearch(query: string, limit = 20): Promise<SearchResult[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const searchTerm = `%${query}%`;
    const results: SearchResult[] = [];

    // Search articles
    const articles = await db
      .select({
        id: posts.id,
        title: posts.title,
        excerpt: posts.excerpt,
        slug: posts.slug,
        publishedAt: posts.publishedAt,
        pillar: posts.pillar,
      })
      .from(posts)
      .where(
        and(
          eq(posts.published, true),
          or(
            like(posts.title, searchTerm),
            like(posts.excerpt, searchTerm),
            like(posts.body, searchTerm)
          )
        )
      )
      .orderBy(desc(posts.publishedAt))
      .limit(limit);

    results.push(
      ...articles.map((a) => ({
        id: a.id,
        type: "article" as const,
        title: a.title,
        excerpt: a.excerpt || undefined,
        slug: a.slug,
        category: a.pillar || undefined,
        publishedAt: a.publishedAt || undefined,
      }))
    );

    // Search resources
    const resourceResults = await db
      .select({
        id: resources.id,
        title: resources.title,
        description: resources.description,
        category: resources.category,
        url: resources.url,
      })
      .from(resources)
      .where(
        and(
          eq(resources.published, true),
          or(
            like(resources.title, searchTerm),
            like(resources.description, searchTerm)
          )
        )
      )
      .limit(limit);

    results.push(
      ...resourceResults.map((r) => ({
        id: r.id,
        type: "resource" as const,
        title: r.title,
        excerpt: r.description || undefined,
        category: r.category || undefined,
        url: r.url || undefined,
      }))
    );

    // Search books
    const bookResults = await db
      .select({
        id: books.id,
        title: books.title,
        description: books.description,
        author: books.author,
      })
      .from(books)
      .where(
        and(
          eq(books.published, true),
          or(
            like(books.title, searchTerm),
            like(books.description, searchTerm),
            like(books.author, searchTerm)
          )
        )
      )
      .limit(limit);

    results.push(
      ...bookResults.map((b) => ({
        id: b.id,
        type: "book" as const,
        title: b.title,
        excerpt: b.description || undefined,
        category: b.author || undefined,
      }))
    );

    // Sort by relevance (articles first, then resources, then books)
    return results.slice(0, limit);
  } catch (error: any) {
    console.error("[Search] Error performing global search:", error);
    throw new Error(error.message || "Search failed");
  }
}

/**
 * Search only articles
 */
export async function searchArticles(query: string, limit = 20): Promise<SearchResult[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const searchTerm = `%${query}%`;

    const articles = await db
      .select({
        id: posts.id,
        title: posts.title,
        excerpt: posts.excerpt,
        slug: posts.slug,
        publishedAt: posts.publishedAt,
        pillar: posts.pillar,
      })
      .from(posts)
      .where(
        and(
          eq(posts.published, true),
          or(
            like(posts.title, searchTerm),
            like(posts.excerpt, searchTerm),
            like(posts.body, searchTerm)
          )
        )
      )
      .orderBy(desc(posts.publishedAt))
      .limit(limit);

    return articles.map((a) => ({
      id: a.id,
      type: "article" as const,
      title: a.title,
      excerpt: a.excerpt || undefined,
      slug: a.slug,
      category: a.pillar || undefined,
      publishedAt: a.publishedAt || undefined,
    }));
  } catch (error: any) {
    console.error("[Search] Error searching articles:", error);
    throw new Error(error.message || "Article search failed");
  }
}

/**
 * Search only resources
 */
export async function searchResources(query: string, limit = 20): Promise<SearchResult[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const searchTerm = `%${query}%`;

    const resourceResults = await db
      .select({
        id: resources.id,
        title: resources.title,
        description: resources.description,
        category: resources.category,
        url: resources.url,
      })
      .from(resources)
      .where(
        and(
          eq(resources.published, true),
          or(
            like(resources.title, searchTerm),
            like(resources.description, searchTerm)
          )
        )
      )
      .limit(limit);

    return resourceResults.map((r) => ({
      id: r.id,
      type: "resource" as const,
      title: r.title,
      excerpt: r.description || undefined,
      category: r.category || undefined,
      url: r.url || undefined,
    }));
  } catch (error: any) {
    console.error("[Search] Error searching resources:", error);
    throw new Error(error.message || "Resource search failed");
  }
}

/**
 * Get trending articles (most viewed, most recent)
 */
export async function getTrendingArticles(limit = 5): Promise<SearchResult[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const articles = await db
      .select({
        id: posts.id,
        title: posts.title,
        excerpt: posts.excerpt,
        slug: posts.slug,
        publishedAt: posts.publishedAt,
        pillar: posts.pillar,
      })
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.publishedAt))
      .limit(limit);

    return articles.map((a) => ({
      id: a.id,
      type: "article" as const,
      title: a.title,
      excerpt: a.excerpt || undefined,
      slug: a.slug,
      category: a.pillar || undefined,
      publishedAt: a.publishedAt || undefined,
    }));
  } catch (error: any) {
    console.error("[Search] Error fetching trending articles:", error);
    throw new Error(error.message || "Failed to fetch trending articles");
  }
}
