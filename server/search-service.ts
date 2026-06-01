/**
 * Search service — FULLTEXT MATCH/AGAINST with a graceful fallback to LIKE.
 *
 * If the FULLTEXT indexes from drizzle/0014_fulltext_search.sql have been
 * applied, search returns results ranked by relevance score (the second
 * column in MATCH/AGAINST). If the indexes are missing, we fall back to
 * the previous LIKE-based search so nothing breaks during the rollout.
 */
import { sql } from "drizzle-orm";
import { getDb } from "./db";

export interface SearchResult {
  id: number;
  type: "article" | "resource" | "book";
  title: string;
  excerpt?: string;
  slug?: string;
  url?: string;
  category?: string;
  publishedAt?: Date;
  relevance?: number;
}

interface RawDb {
  execute<T = unknown>(query: ReturnType<typeof sql>): Promise<T>;
}

function asArray<T = Record<string, unknown>>(rows: unknown): T[] {
  if (Array.isArray(rows)) return rows as T[];
  if (rows && typeof rows === "object" && "rows" in rows) {
    const r = (rows as { rows: unknown }).rows;
    if (Array.isArray(r)) return r as T[];
  }
  // mysql2 driver returns [rows, fields]
  if (Array.isArray((rows as unknown as unknown[])?.[0])) {
    return (rows as unknown[][])[0] as T[];
  }
  return [];
}

// ─── ARTICLES ────────────────────────────────────────────────────────────

async function searchArticlesFulltext(
  db: RawDb,
  query: string,
  limit: number
): Promise<SearchResult[]> {
  const result = await db.execute(sql`
    SELECT
      id,
      title,
      excerpt,
      slug,
      pillar,
      topic,
      publishedAt,
      MATCH(title, excerpt, body) AGAINST(${query} IN NATURAL LANGUAGE MODE) AS relevance
    FROM posts
    WHERE published = true
      AND MATCH(title, excerpt, body) AGAINST(${query} IN NATURAL LANGUAGE MODE)
    ORDER BY relevance DESC
    LIMIT ${limit}
  `);
  const rows = asArray<{
    id: number;
    title: string;
    excerpt: string | null;
    slug: string;
    pillar: string | null;
    topic: string | null;
    publishedAt: Date | null;
    relevance: number;
  }>(result);
  return rows.map(a => ({
    id: a.id,
    type: "article",
    title: a.title,
    excerpt: a.excerpt ?? undefined,
    slug: a.slug,
    category: a.topic ?? a.pillar ?? undefined,
    publishedAt: a.publishedAt ?? undefined,
    relevance: a.relevance,
  }));
}

async function searchArticlesLike(
  db: RawDb,
  query: string,
  limit: number
): Promise<SearchResult[]> {
  const term = `%${query}%`;
  const result = await db.execute(sql`
    SELECT id, title, excerpt, slug, pillar, topic, publishedAt
    FROM posts
    WHERE published = true
      AND (title LIKE ${term} OR excerpt LIKE ${term} OR body LIKE ${term})
    ORDER BY publishedAt DESC
    LIMIT ${limit}
  `);
  const rows = asArray<{
    id: number;
    title: string;
    excerpt: string | null;
    slug: string;
    pillar: string | null;
    topic: string | null;
    publishedAt: Date | null;
  }>(result);
  return rows.map(a => ({
    id: a.id,
    type: "article",
    title: a.title,
    excerpt: a.excerpt ?? undefined,
    slug: a.slug,
    category: a.topic ?? a.pillar ?? undefined,
    publishedAt: a.publishedAt ?? undefined,
  }));
}

export async function searchArticles(
  query: string,
  limit = 20
): Promise<SearchResult[]> {
  const db = (await getDb()) as RawDb | null;
  if (!db) return [];
  try {
    return await searchArticlesFulltext(db, query, limit);
  } catch (err) {
    // FULLTEXT index not present yet — fall back to LIKE
    console.warn(
      `[search] FULLTEXT unavailable, falling back to LIKE: ${(err as Error).message}`
    );
    return searchArticlesLike(db, query, limit);
  }
}

// ─── RESOURCES ───────────────────────────────────────────────────────────

export async function searchResources(
  query: string,
  limit = 20
): Promise<SearchResult[]> {
  const db = (await getDb()) as RawDb | null;
  if (!db) return [];
  const term = `%${query}%`;
  const result = await db.execute(sql`
    SELECT id, title, description, category, url
    FROM resources
    WHERE published = true
      AND (title LIKE ${term} OR description LIKE ${term})
    LIMIT ${limit}
  `);
  const rows = asArray<{
    id: number;
    title: string;
    description: string | null;
    category: string | null;
    url: string | null;
  }>(result);
  return rows.map(r => ({
    id: r.id,
    type: "resource",
    title: r.title,
    excerpt: r.description ?? undefined,
    category: r.category ?? undefined,
    url: r.url ?? undefined,
  }));
}

// ─── BOOKS ───────────────────────────────────────────────────────────────

async function searchBooksFulltext(
  db: RawDb,
  query: string,
  limit: number
): Promise<SearchResult[]> {
  const result = await db.execute(sql`
    SELECT
      id, title, description, author, slug,
      MATCH(title, description, sampleExcerpt) AGAINST(${query} IN NATURAL LANGUAGE MODE) AS relevance
    FROM books
    WHERE published = true
      AND MATCH(title, description, sampleExcerpt) AGAINST(${query} IN NATURAL LANGUAGE MODE)
    ORDER BY relevance DESC
    LIMIT ${limit}
  `);
  const rows = asArray<{
    id: number;
    title: string;
    description: string | null;
    author: string | null;
    slug: string | null;
    relevance: number;
  }>(result);
  return rows.map(b => ({
    id: b.id,
    type: "book",
    title: b.title,
    excerpt: b.description ?? undefined,
    category: b.author ?? undefined,
    slug: b.slug ?? undefined,
    relevance: b.relevance,
  }));
}

async function searchBooksLike(
  db: RawDb,
  query: string,
  limit: number
): Promise<SearchResult[]> {
  const term = `%${query}%`;
  const result = await db.execute(sql`
    SELECT id, title, description, author, slug
    FROM books
    WHERE published = true
      AND (title LIKE ${term} OR description LIKE ${term} OR author LIKE ${term})
    LIMIT ${limit}
  `);
  const rows = asArray<{
    id: number;
    title: string;
    description: string | null;
    author: string | null;
    slug: string | null;
  }>(result);
  return rows.map(b => ({
    id: b.id,
    type: "book",
    title: b.title,
    excerpt: b.description ?? undefined,
    category: b.author ?? undefined,
    slug: b.slug ?? undefined,
  }));
}

// ─── GLOBAL ──────────────────────────────────────────────────────────────

export async function globalSearch(
  query: string,
  limit = 20
): Promise<SearchResult[]> {
  const db = (await getDb()) as RawDb | null;
  if (!db) return [];

  const [articles, resources, books] = await Promise.all([
    searchArticles(query, limit).catch(() => []),
    searchResources(query, limit).catch(() => []),
    searchBooksFulltext(db, query, limit).catch(() =>
      searchBooksLike(db, query, limit).catch(() => [])
    ),
  ]);

  // Articles first (the product), then books, then resources. Within each
  // bucket, relevance from FULLTEXT determines order — fallback uses date.
  return [...articles, ...books, ...resources].slice(0, limit);
}

// ─── TRENDING ────────────────────────────────────────────────────────────

export async function getTrendingArticles(limit = 5): Promise<SearchResult[]> {
  const db = (await getDb()) as RawDb | null;
  if (!db) return [];
  const result = await db.execute(sql`
    SELECT id, title, excerpt, slug, pillar, topic, publishedAt
    FROM posts
    WHERE published = true
    ORDER BY publishedAt DESC
    LIMIT ${limit}
  `);
  const rows = asArray<{
    id: number;
    title: string;
    excerpt: string | null;
    slug: string;
    pillar: string | null;
    topic: string | null;
    publishedAt: Date | null;
  }>(result);
  return rows.map(a => ({
    id: a.id,
    type: "article",
    title: a.title,
    excerpt: a.excerpt ?? undefined,
    slug: a.slug,
    category: a.topic ?? a.pillar ?? undefined,
    publishedAt: a.publishedAt ?? undefined,
  }));
}
