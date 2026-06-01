#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 *
 * Builds /sitemap.xml from the database. Runs before `vite build` so the file
 * lands in client/public/sitemap.xml and is copied into the deploy output.
 *
 * If DATABASE_URL is missing or unreachable at build time, falls back to a
 * minimal static sitemap so the build does not fail.
 */
import mysql from "mysql2/promise";
import fs from "node:fs";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://www.livewellbyjamesbell.co";
const OUTPUT_PATH = "client/public/sitemap.xml";

const STATIC_PAGES = [
  { url: "", priority: "1.0", changefreq: "weekly" },
  { url: "/writing", priority: "0.9", changefreq: "daily" },
  { url: "/books", priority: "0.9", changefreq: "weekly" },
  { url: "/skeptic-track", priority: "0.9", changefreq: "monthly" },
  { url: "/pastors-resource-wall", priority: "0.85", changefreq: "weekly" },
  { url: "/roadmap", priority: "0.8", changefreq: "monthly" },
  { url: "/library", priority: "0.8", changefreq: "weekly" },
  { url: "/diagnostic", priority: "0.8", changefreq: "monthly" },
  { url: "/reading-paths", priority: "0.8", changefreq: "weekly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/marriage", priority: "0.7", changefreq: "monthly" },
  { url: "/parenting", priority: "0.7", changefreq: "monthly" },
  { url: "/doubt", priority: "0.7", changefreq: "monthly" },
  { url: "/writing?track=manhood", priority: "0.7", changefreq: "weekly" },
  { url: "/writing?track=womanhood", priority: "0.7", changefreq: "weekly" },
  { url: "/writing?track=finances", priority: "0.7", changefreq: "weekly" },
  { url: "/for-pastors", priority: "0.75", changefreq: "weekly" },
  { url: "/pastors", priority: "0.7", changefreq: "monthly" },
  { url: "/tools", priority: "0.6", changefreq: "monthly" },
  { url: "/work-with-james", priority: "0.6", changefreq: "monthly" },
  { url: "/membership", priority: "0.7", changefreq: "monthly" },
  { url: "/resources", priority: "0.7", changefreq: "monthly" },
];

function urlEntry(loc, lastmod, changefreq, priority) {
  let entry = "  <url>\n";
  entry += `    <loc>${loc}</loc>\n`;
  if (lastmod) entry += `    <lastmod>${lastmod}</lastmod>\n`;
  entry += `    <changefreq>${changefreq}</changefreq>\n`;
  entry += `    <priority>${priority}</priority>\n`;
  entry += "  </url>\n";
  return entry;
}

function buildXml(staticPages, articles, books, readingPaths) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const page of staticPages) {
    xml += urlEntry(`${BASE_URL}${page.url}`, null, page.changefreq, page.priority);
  }
  for (const a of articles) {
    const lastmod = new Date(a.updatedAt).toISOString().split("T")[0];
    xml += urlEntry(`${BASE_URL}/writing/${a.slug}`, lastmod, "monthly", "0.8");
  }
  for (const b of books) {
    const lastmod = new Date(b.updatedAt).toISOString().split("T")[0];
    xml += urlEntry(`${BASE_URL}/books/${b.slug}`, lastmod, "monthly", "0.7");
  }
  for (const p of readingPaths) {
    const lastmod = new Date(p.updatedAt).toISOString().split("T")[0];
    xml += urlEntry(`${BASE_URL}/reading-paths/${p.slug}`, lastmod, "monthly", "0.7");
  }
  xml += "</urlset>\n";
  return xml;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn("[sitemap] DATABASE_URL not set — writing fallback sitemap (static pages only)");
    const xml = buildXml(STATIC_PAGES, [], [], []);
    fs.writeFileSync(OUTPUT_PATH, xml);
    return;
  }

  let conn;
  try {
    conn = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: true },
    });
  } catch (err) {
    console.warn(`[sitemap] DB connect failed (${err.message}) — writing fallback sitemap`);
    fs.writeFileSync(OUTPUT_PATH, buildXml(STATIC_PAGES, [], [], []));
    return;
  }

  try {
    const [articles] = await conn.query(
      "SELECT slug, updatedAt FROM posts WHERE published = true ORDER BY updatedAt DESC"
    );
    const [books] = await conn.query(
      "SELECT slug, updatedAt FROM books WHERE published = true AND slug IS NOT NULL ORDER BY updatedAt DESC"
    );

    let readingPaths = [];
    try {
      const [paths] = await conn.query(
        "SELECT slug, updatedAt FROM reading_paths WHERE published = true ORDER BY updatedAt DESC"
      );
      readingPaths = paths;
    } catch {
      // table may not exist on legacy DBs — skip silently
    }

    const xml = buildXml(STATIC_PAGES, articles, books, readingPaths);
    fs.writeFileSync(OUTPUT_PATH, xml);

    console.log("[sitemap] generated");
    console.log(`  static: ${STATIC_PAGES.length}`);
    console.log(`  articles: ${articles.length}`);
    console.log(`  books: ${books.length}`);
    console.log(`  reading paths: ${readingPaths.length}`);
    console.log(`  written to: ${OUTPUT_PATH}`);
  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error("[sitemap] failed:", err.message);
  // write fallback so build doesn't break
  fs.writeFileSync(OUTPUT_PATH, buildXml(STATIC_PAGES, [], [], []));
  process.exit(0);
});
