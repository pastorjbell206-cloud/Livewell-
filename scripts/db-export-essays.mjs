#!/usr/bin/env node
/**
 * db-export-essays.mjs — LiveWell by James Bell
 *
 * Pulls every essay (full body) out of the live database into
 * scripts/.essays-export.json, which voice-audit.mjs then reads. Connects with
 * mysql2 directly off DATABASE_URL (read-only credentials are enough — this
 * script only SELECTs) so it has no dependency on the TS/drizzle toolchain.
 *
 * It also answers the standing "posts vs articles" question in one pass:
 * the schema (drizzle/schema.ts) defines a single `posts` table. There is no
 * `articles` table. "Article" is a value of the `format` enum on a post and the
 * word the UI uses for readers. This script reports what it actually finds in
 * the DB so the answer is grounded, not assumed.
 *
 * Usage:  DATABASE_URL=mysql://user:pass@host/db node scripts/db-export-essays.mjs
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import mysql from "mysql2/promise";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, ".essays-export.json");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "DATABASE_URL is not set. Set it to your read-only connection string and re-run:\n" +
      "  DATABASE_URL=mysql://user:pass@host/db node scripts/db-export-essays.mjs"
  );
  process.exit(1);
}

function tableExists(conn, name) {
  return conn
    .query(
      "SELECT COUNT(*) AS n FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?",
      [name]
    )
    .then(([rows]) => rows[0].n > 0);
}

async function main() {
  const conn = await mysql.createConnection(url);
  try {
    // ─── Answer the posts-vs-articles question from the live schema ─────────
    const hasPosts = await tableExists(conn, "posts");
    const hasArticles = await tableExists(conn, "articles");
    console.log("Schema check:");
    console.log(`  posts table:    ${hasPosts ? "present" : "MISSING"}`);
    console.log(`  articles table: ${hasArticles ? "present" : "absent"}`);
    if (!hasPosts) {
      throw new Error("No `posts` table in this database — wrong DATABASE_URL?");
    }
    if (!hasArticles) {
      console.log(
        "  → Confirmed: essays live in `posts`. \"Articles\" is a UI label / the\n" +
          "    `format` enum value, not a separate table."
      );
    }

    // ─── Pull every essay, full body ───────────────────────────────────────
    const [rows] = await conn.query(
      "SELECT id, title, slug, body, excerpt, pillar, format, audience, published, " +
        "featured, readingTimeMinutes, publishedAt, createdAt, updatedAt " +
        "FROM posts ORDER BY createdAt DESC"
    );

    const publishedCount = rows.filter((r) => r.published).length;
    const byFormat = {};
    for (const r of rows) byFormat[r.format || "(null)"] = (byFormat[r.format || "(null)"] || 0) + 1;

    writeFileSync(OUT, JSON.stringify(rows, null, 2));

    console.log(`\nExported ${rows.length} essays → ${OUT}`);
    console.log(`  published: ${publishedCount} · drafts: ${rows.length - publishedCount}`);
    console.log(`  by format: ${JSON.stringify(byFormat)}`);
    console.log("\nNext: node scripts/voice-audit.mjs");
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error("Export failed:", err.message);
  process.exit(1);
});
