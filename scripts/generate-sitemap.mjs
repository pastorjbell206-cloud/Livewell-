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
  { url: "/covenant", priority: "0.85", changefreq: "monthly" },
  { url: "/babylon", priority: "0.9", changefreq: "monthly" },
  { url: "/how-to-read-the-bible", priority: "0.85", changefreq: "monthly" },
  { url: "/be-true-to-yourself", priority: "0.85", changefreq: "monthly" },
  { url: "/what-belongs-to-the-poor", priority: "0.85", changefreq: "monthly" },
  { url: "/rule-of-life", priority: "0.85", changefreq: "monthly" },
  { url: "/why-not-what", priority: "0.85", changefreq: "monthly" },
  { url: "/sermon-on-the-mount-as-politics", priority: "0.85", changefreq: "monthly" },
  { url: "/prophetic-justice-101", priority: "0.85", changefreq: "monthly" },
  { url: "/marriage-in-ministry", priority: "0.85", changefreq: "monthly" },
  { url: "/the-loneliness-of-the-pastor", priority: "0.85", changefreq: "monthly" },
  { url: "/healwell", priority: "0.85", changefreq: "monthly" },
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
  // ── Added by site-elevation QW-10: every indexable static route belongs here.
  // (Thank-you pages, redirect sources, /search, and device-local pages excluded.)
  // FAQ landing pages (built to win search)
  { url: "/faq/can-science-and-faith-coexist", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/catholic-vs-protestant", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/does-god-exist", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/is-the-bible-historically-accurate", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/what-denomination-should-i-join", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/what-do-christians-believe-about-hell", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/what-is-deconstruction", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/what-is-religious-trauma", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/why-are-people-leaving-church", priority: "0.8", changefreq: "monthly" },
  { url: "/faq/why-do-young-people-leave-church", priority: "0.8", changefreq: "monthly" },
  // Comparison pages
  { url: "/compare/baptist-vs-methodist", priority: "0.8", changefreq: "monthly" },
  { url: "/compare/calvinism-vs-arminianism", priority: "0.8", changefreq: "monthly" },
  { url: "/compare/catholic-vs-protestant", priority: "0.8", changefreq: "monthly" },
  { url: "/compare/evangelical-vs-mainline", priority: "0.8", changefreq: "monthly" },
  { url: "/compare/liturgical-vs-contemporary", priority: "0.8", changefreq: "monthly" },
  { url: "/compare/orthodox-vs-catholic", priority: "0.8", changefreq: "monthly" },
  // Crisis and topic landing pages
  { url: "/church-history", priority: "0.8", changefreq: "monthly" },
  { url: "/church-hurt", priority: "0.8", changefreq: "monthly" },
  { url: "/deconstruction", priority: "0.8", changefreq: "monthly" },
  { url: "/faith-crisis", priority: "0.8", changefreq: "monthly" },
  { url: "/grief", priority: "0.8", changefreq: "monthly" },
  { url: "/honest-questions", priority: "0.8", changefreq: "monthly" },
  { url: "/marriage-crisis", priority: "0.8", changefreq: "monthly" },
  { url: "/parenting-help", priority: "0.8", changefreq: "monthly" },
  { url: "/pastoral-burnout", priority: "0.8", changefreq: "monthly" },
  { url: "/post-christian", priority: "0.8", changefreq: "monthly" },
  { url: "/sermon-series", priority: "0.75", changefreq: "monthly" },
  // Ebook product pages previously missing
  { url: "/alone-in-a-crowded-church", priority: "0.85", changefreq: "monthly" },
  { url: "/books/believe", priority: "0.8", changefreq: "monthly" },
  { url: "/books/bible-and-homosexuality", priority: "0.8", changefreq: "monthly" },
  { url: "/books/bible-and-transgender-identity", priority: "0.8", changefreq: "monthly" },
  { url: "/books/critical-race-theory-biblical", priority: "0.8", changefreq: "monthly" },
  { url: "/books/deconstruction-of-faith", priority: "0.8", changefreq: "monthly" },
  { url: "/books/raising-believers", priority: "0.8", changefreq: "monthly" },
  { url: "/books/the-monster-in-the-mirror", priority: "0.8", changefreq: "monthly" },
  { url: "/books/the-reliability-of-scripture", priority: "0.8", changefreq: "monthly" },
  { url: "/books/when-god-bless-america", priority: "0.8", changefreq: "monthly" },
  { url: "/book-bundles", priority: "0.7", changefreq: "monthly" },
  // Justice / Disruption / Nation hubs
  { url: "/justice", priority: "0.85", changefreq: "monthly" },
  { url: "/justice/glossary", priority: "0.7", changefreq: "monthly" },
  { url: "/justice/posture", priority: "0.7", changefreq: "monthly" },
  { url: "/justice/timeline", priority: "0.7", changefreq: "monthly" },
  { url: "/justice/witnesses", priority: "0.7", changefreq: "monthly" },
  { url: "/lament", priority: "0.7", changefreq: "monthly" },
  { url: "/disruption", priority: "0.85", changefreq: "monthly" },
  { url: "/disruption/consistency", priority: "0.7", changefreq: "monthly" },
  { url: "/disruption/glossary", priority: "0.7", changefreq: "monthly" },
  { url: "/disruption/posture", priority: "0.7", changefreq: "monthly" },
  { url: "/disruption/questions", priority: "0.7", changefreq: "monthly" },
  { url: "/disruption/witnesses", priority: "0.7", changefreq: "monthly" },
  { url: "/nation", priority: "0.85", changefreq: "monthly" },
  { url: "/nation/christian-nation", priority: "0.8", changefreq: "monthly" },
  { url: "/nation/empire", priority: "0.8", changefreq: "monthly" },
  { url: "/nation/policy", priority: "0.7", changefreq: "monthly" },
  { url: "/nation/render", priority: "0.8", changefreq: "monthly" },
  { url: "/nation/scorecard", priority: "0.7", changefreq: "monthly" },
  { url: "/nation/theocracy", priority: "0.8", changefreq: "monthly" },
  { url: "/nation/which-party", priority: "0.8", changefreq: "monthly" },
  // Theology section pages previously missing
  { url: "/theology/compare", priority: "0.75", changefreq: "monthly" },
  { url: "/theology/creeds", priority: "0.75", changefreq: "monthly" },
  { url: "/theology/glossary", priority: "0.7", changefreq: "monthly" },
  { url: "/theology/hermeneutics", priority: "0.75", changefreq: "monthly" },
  { url: "/theology/how-to-use", priority: "0.7", changefreq: "monthly" },
  { url: "/theology/passage", priority: "0.75", changefreq: "monthly" },
  { url: "/theology/paths", priority: "0.7", changefreq: "monthly" },
  { url: "/theology/traditions", priority: "0.75", changefreq: "monthly" },
  { url: "/theology/which-view", priority: "0.7", changefreq: "monthly" },
  // Tools previously missing
  { url: "/tools/bible-on", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/bible-says", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/bible-study", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/church-health", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/conflict-guide", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/deep-bible", priority: "0.7", changefreq: "monthly" },
  { url: "/tools/discipleship-table", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/emotional-health", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/financial-health", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/glossary", priority: "0.6", changefreq: "monthly" },
  { url: "/tools/life-audit", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/marriage-assessment", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/parenting-guide", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/parenting-verses", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/pastor-burnout", priority: "0.7", changefreq: "monthly" },
  { url: "/tools/proverbs-31", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/quotes", priority: "0.6", changefreq: "monthly" },
  { url: "/tools/rule-of-life", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/scripture-memory", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/sermon-outline", priority: "0.65", changefreq: "monthly" },
  { url: "/tools/wisdom-finder", priority: "0.7", changefreq: "monthly" },
  // Leadership instruments previously missing
  { url: "/leadership/before-you-post", priority: "0.65", changefreq: "monthly" },
  { url: "/leadership/budget", priority: "0.65", changefreq: "monthly" },
  { url: "/leadership/decision-log", priority: "0.6", changefreq: "monthly" },
  { url: "/leadership/governance", priority: "0.75", changefreq: "monthly" },
  { url: "/leadership/illustrations", priority: "0.7", changefreq: "monthly" },
  { url: "/leadership/meeting", priority: "0.65", changefreq: "monthly" },
  { url: "/leadership/sermon-prep", priority: "0.7", changefreq: "monthly" },
  { url: "/leadership/visitation", priority: "0.6", changefreq: "monthly" },
  // Entry points, hubs, and misc previously missing
  { url: "/start-here", priority: "0.85", changefreq: "monthly" },
  { url: "/pillars", priority: "0.8", changefreq: "monthly" },
  { url: "/exile", priority: "0.7", changefreq: "monthly" },
  { url: "/living-well", priority: "0.75", changefreq: "monthly" },
  { url: "/wisdom", priority: "0.8", changefreq: "monthly" },
  { url: "/how-tos", priority: "0.75", changefreq: "monthly" },
  { url: "/disciple-making", priority: "0.75", changefreq: "monthly" },
  { url: "/table", priority: "0.75", changefreq: "monthly" },
  { url: "/studyguides", priority: "0.8", changefreq: "monthly" },
  { url: "/article-collections", priority: "0.7", changefreq: "monthly" },
  { url: "/substack", priority: "0.6", changefreq: "monthly" },
  { url: "/subscribe", priority: "0.7", changefreq: "monthly" },
  { url: "/for-leaders", priority: "0.7", changefreq: "monthly" },
  { url: "/resources/hard-issues-series", priority: "0.75", changefreq: "monthly" },
  // Legal
  { url: "/privacy", priority: "0.3", changefreq: "monthly" },
  { url: "/terms", priority: "0.3", changefreq: "monthly" },
  { url: "/accessibility", priority: "0.3", changefreq: "monthly" },
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
    // Study-guide toolkits (/studyguides/:slug), home-disciplemaking Table
    // studies (/table/:slug), the How-To library (/how-tos/:slug), and the
    // read-online books (/read/:slug) — large surfaced libraries. Routes
    // confirmed in client/src/App.tsx; duplicates with STATIC_PAGES are removed
    // in buildXml.
    { file: "client/public/studyguides/index.json", key: "guides", prefix: "/studyguides/" },
    { file: "client/public/table/studies-index.json", key: "studies", prefix: "/table/" },
    { file: "client/public/howtos/index.json", key: "articles", prefix: "/how-tos/" },
    { file: "client/public/books/index.json", key: "books", prefix: "/read/" },
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
  // De-duplicate by URL (a few study-guide slugs appear in both STATIC_PAGES and
  // the studyguides manifest). First occurrence wins, so the curated static
  // entries keep their higher priority.
  const seen = new Set();
  const allStatic = [...staticPages, ...manifestPages()].filter((p) => {
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    return true;
  });
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
    console.error("[sitemap] DATABASE_URL not set — essay URLs will be MISSING from the sitemap.");
    if (process.env.VERCEL) {
      console.error("[sitemap] refusing to ship an essay-less sitemap on a Vercel build.");
      process.exit(1);
    }
    console.error("[sitemap] writing static fallback (local/CI without a database).");
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
  console.error("");
  console.error("╔════════════════════════════════════════════════════════════════╗");
  console.error("║ [sitemap] DATABASE UNREACHABLE — essay URLs are MISSING from    ║");
  console.error("║ the sitemap. On a production deploy this is a hard failure:     ║");
  console.error("║ shipping an essay-less sitemap silently de-indexes the library. ║");
  console.error("╚════════════════════════════════════════════════════════════════╝");
  console.error("[sitemap] cause:", err.message);
  if (process.env.VERCEL) {
    // Production/preview builds must have a working DATABASE_URL.
    process.exit(1);
  }
  // Local/CI-without-DB: write the static fallback so the build can proceed.
  fs.writeFileSync(OUTPUT_PATH, buildXml(STATIC_PAGES, mergeArticles([]), [], []));
  process.exit(0);
});
