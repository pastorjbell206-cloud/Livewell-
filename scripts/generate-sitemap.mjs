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

// The static essay library (served by api/index.ts behind the live DB). These
// slugs resolve at /writing/:slug even though they aren't DB rows, so they
// belong in the sitemap. DB articles win on slug collision (merged below).
function loadStaticLibrary() {
  try {
    const raw = fs.readFileSync("content/static-library.generated.json", "utf8");
    return JSON.parse(raw).map(r => ({ slug: r.slug, updatedAt: r.updatedAt }));
  } catch {
    return [];
  }
}
const STATIC_ARTICLES = loadStaticLibrary();

function mergeArticles(dbArticles) {
  const have = new Set((dbArticles || []).map(a => a.slug));
  const extra = STATIC_ARTICLES.filter(a => !have.has(a.slug));
  return [...(dbArticles || []), ...extra];
}

const STATIC_PAGES = [
  { url: "", priority: "1.0", changefreq: "weekly" },
  { url: "/writing", priority: "0.9", changefreq: "daily" },
  { url: "/books", priority: "0.9", changefreq: "weekly" },
  // LiveWell series ebooks (code-only product pages, not DB-backed).
  { url: "/consider-the-birds", priority: "0.8", changefreq: "monthly" },
  { url: "/where-your-treasure-is", priority: "0.8", changefreq: "monthly" },
  { url: "/after-christendom", priority: "0.85", changefreq: "monthly" },
  { url: "/covenant", priority: "0.85", changefreq: "monthly" },
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
  // Five-pillar listing pages (current nav taxonomy) + Study Guides.
  { url: "/writing?pillar=theological-depth", priority: "0.85", changefreq: "weekly" },
  { url: "/writing?pillar=prophetic-justice", priority: "0.85", changefreq: "weekly" },
  { url: "/writing?pillar=prophetic-disruption", priority: "0.85", changefreq: "weekly" },
  { url: "/writing?pillar=leadership-formation", priority: "0.85", changefreq: "weekly" },
  { url: "/writing?pillar=integrated-life", priority: "0.85", changefreq: "weekly" },
  { url: "/writing?series=true", priority: "0.8", changefreq: "weekly" },
  // Static content libraries (file-driven, no DB needed).
  { url: "/leadership", priority: "0.85", changefreq: "weekly" },
  { url: "/leadership/library", priority: "0.85", changefreq: "weekly" },
  { url: "/leadership/sermon-series", priority: "0.8", changefreq: "monthly" },
  { url: "/leadership/bible-sermons", priority: "0.85", changefreq: "monthly" },
  { url: "/leadership/formation", priority: "0.85", changefreq: "weekly" },
  { url: "/leadership/servant-leadership", priority: "0.85", changefreq: "monthly" },
  { url: "/leadership/handbook", priority: "0.9", changefreq: "monthly" },
  { url: "/leadership/guides", priority: "0.85", changefreq: "monthly" },
  { url: "/leadership/guides/servant-leadership-bible-study", priority: "0.8", changefreq: "monthly" },
  { url: "/leadership/guides/elder-training-manual", priority: "0.8", changefreq: "monthly" },
  { url: "/leadership/guides/deacon-training-manual", priority: "0.8", changefreq: "monthly" },
  { url: "/leadership/guides/how-to-develop-leaders", priority: "0.8", changefreq: "monthly" },
  { url: "/leadership/inventory", priority: "0.8", changefreq: "monthly" },
  { url: "/resources/context", priority: "0.9", changefreq: "weekly" },
  { url: "/resources/creeds", priority: "0.8", changefreq: "monthly" },
  { url: "/discipleship", priority: "0.85", changefreq: "monthly" },
  { url: "/help", priority: "0.9", changefreq: "monthly" },
  { url: "/plans/marriage", priority: "0.8", changefreq: "monthly" },
  { url: "/plans/anxiety", priority: "0.8", changefreq: "monthly" },
  { url: "/plans/grief", priority: "0.8", changefreq: "monthly" },
  { url: "/plans/whole-life", priority: "0.8", changefreq: "monthly" },
  { url: "/plans/deconstruction", priority: "0.85", changefreq: "monthly" },
  { url: "/plans/skeptic", priority: "0.85", changefreq: "monthly" },
  { url: "/plans/new-believer", priority: "0.85", changefreq: "monthly" },
  { url: "/life", priority: "0.85", changefreq: "weekly" },
  { url: "/life/assessment", priority: "0.8", changefreq: "monthly" },
  { url: "/family", priority: "0.75", changefreq: "monthly" },
  { url: "/family/devotions", priority: "0.75", changefreq: "monthly" },
  { url: "/family/catechism", priority: "0.7", changefreq: "monthly" },
  { url: "/family/reading-plans", priority: "0.7", changefreq: "monthly" },
  { url: "/framework", priority: "0.85", changefreq: "monthly" },
  { url: "/theology", priority: "0.8", changefreq: "monthly" },
  { url: "/theology/biblical", priority: "0.75", changefreq: "monthly" },
  { url: "/theology/history", priority: "0.75", changefreq: "monthly" },
  { url: "/theology/questions", priority: "0.75", changefreq: "monthly" },
  { url: "/start", priority: "0.8", changefreq: "monthly" },
  { url: "/tools/theology-quiz", priority: "0.6", changefreq: "monthly" },
  { url: "/tools/verse-finder", priority: "0.6", changefreq: "monthly" },
  { url: "/tools/prayer-generator", priority: "0.6", changefreq: "monthly" },
  { url: "/tools/family-devotions", priority: "0.65", changefreq: "monthly" },
];

/**
 * Article-style pages whose content lives as JSON in client/public rather than
 * the database: the Leadership Library and the Reading Scripture in Context
 * guides. Read from the generated manifests so this list never goes stale.
 */
function manifestPages() {
  const pages = [];
  const sources = [
    { file: "client/public/leadership/articles-index.json", key: "articles", prefix: "/leadership/article/" },
    { file: "client/public/context/guides-index.json", key: "guides", prefix: "/resources/context/" },
    { file: "client/public/leadership/formation-index.json", key: "topics", prefix: "/leadership/formation/" },
    { file: "client/public/life/domains-index.json", key: "domains", prefix: "/life/" },
    { file: "client/public/creeds/documents-index.json", key: "documents", prefix: "/resources/creeds/" },
    { file: "client/public/history/essays-index.json", key: "essays", prefix: "/theology/history/" },
    { file: "client/public/studyguides/index.json", key: "guides", prefix: "/studyguides/" },
  ];
  for (const s of sources) {
    try {
      const data = JSON.parse(fs.readFileSync(s.file, "utf8"));
      for (const entry of data[s.key] || []) {
        if (entry.slug) pages.push({ url: `${s.prefix}${entry.slug}`, priority: "0.75", changefreq: "monthly" });
      }
    } catch (err) {
      console.warn(`[sitemap] could not read ${s.file}: ${err.message}`);
    }
  }
  return pages;
}

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
  const allStatic = [...staticPages, ...manifestPages()];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const page of allStatic) {
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
    const xml = buildXml(STATIC_PAGES, mergeArticles([]), [], []);
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
    fs.writeFileSync(OUTPUT_PATH, buildXml(STATIC_PAGES, mergeArticles([]), [], []));
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

    const xml = buildXml(STATIC_PAGES, mergeArticles(articles), books, readingPaths);
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
  fs.writeFileSync(OUTPUT_PATH, buildXml(STATIC_PAGES, mergeArticles([]), [], []));
  process.exit(0);
});
