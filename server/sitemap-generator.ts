import { posts, resources, books } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { getDb } from "./db";

/**
 * Generate XML sitemap for SEO
 */
export async function generateSitemap(baseUrl: string): Promise<string> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Get all published posts
    const allPosts = await db.select().from(posts).where(eq(posts.published, true));

    // Get all resources
    const allResources = await db.select().from(resources);

    // Get all books
    const allBooks = await db.select().from(books);

    // Build sitemap
    const urls: string[] = [];

    // Add static pages
    urls.push(createSitemapEntry(baseUrl, "/", "weekly", 1.0));
    urls.push(createSitemapEntry(baseUrl, "/writing", "daily", 0.9));
    urls.push(createSitemapEntry(baseUrl, "/resources", "monthly", 0.8));
    urls.push(createSitemapEntry(baseUrl, "/books", "monthly", 0.8));
    urls.push(createSitemapEntry(baseUrl, "/about", "yearly", 0.7));
    urls.push(createSitemapEntry(baseUrl, "/search", "daily", 0.6));

    // Add article pages
    for (const post of allPosts) {
      urls.push(
        createSitemapEntry(
          baseUrl,
          `/writing/${post.slug}`,
          "weekly",
          0.8,
          post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined
        )
      );
    }

    // Add resource pages
    for (const resource of allResources) {
      urls.push(
        createSitemapEntry(
          baseUrl,
          `/resources/${resource.id}`,
          "monthly",
          0.7,
          resource.createdAt ? new Date(resource.createdAt).toISOString() : undefined
        )
      );
    }

    // Add book pages
    for (const book of allBooks) {
      urls.push(
        createSitemapEntry(
          baseUrl,
          `/books/${book.id}`,
          "monthly",
          0.7,
          book.createdAt ? new Date(book.createdAt).toISOString() : undefined
        )
      );
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return xml;
  } catch (error: any) {
    console.error("[Sitemap] Error generating sitemap:", error);
    throw error;
  }
}

/**
 * Create a single sitemap entry
 */
function createSitemapEntry(
  baseUrl: string,
  path: string,
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
  priority: number,
  lastmod?: string
): string {
  const url = `${baseUrl}${path}`.replace(/\/+/g, "/").replace(":/", "://");

  return `  <url>
    <loc>${escapeXml(url)}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate robots.txt
 */
export function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Crawl delay to be respectful
Crawl-delay: 1`;
}
