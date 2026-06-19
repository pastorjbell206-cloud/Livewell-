#!/usr/bin/env node
/**
 * publish-livewell-articles.mjs
 *
 * Publishes the LiveWell-series SEO articles (client/src/data/articles/
 * livewell-series.json) into the `posts` table so they appear on /writing and
 * link back to the paid book pages. Idempotent (INSERT ... ON DUPLICATE KEY
 * updates body/excerpt), so re-running is safe.
 *
 * Usage: DATABASE_URL=mysql://… node scripts/publish-livewell-articles.mjs
 */
import mysql from "mysql2/promise";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "client", "src", "data", "articles", "livewell-series.json");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(SRC, "utf8"));

const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: true } });
try {
  let upserted = 0;
  for (const a of articles) {
    await conn.execute(
      `INSERT INTO posts (title, slug, body, excerpt, pillar, readTime, published, publishedAt, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, 1, NOW(), NOW(), NOW())
       ON DUPLICATE KEY UPDATE body = VALUES(body), excerpt = VALUES(excerpt),
         pillar = VALUES(pillar), readTime = VALUES(readTime), updatedAt = NOW()`,
      [a.title, a.slug, a.body, a.excerpt, a.pillar, a.readTime]
    );
    // subPathway is optional and only exists after the two-level taxonomy
    // migration; set it best-effort so older schemas still succeed.
    if (a.subPathway) {
      try {
        await conn.execute("UPDATE posts SET subPathway = ? WHERE slug = ?", [a.subPathway, a.slug]);
      } catch {
        /* column not present on this schema — ignore */
      }
    }
    upserted++;
    console.log(`  published /writing/${a.slug}`);
  }
  console.log(`Done. ${upserted} article(s) live.`);
} finally {
  await conn.end();
}
