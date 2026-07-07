#!/usr/bin/env node
/**
 * publish-articles-build.mjs — the "publish bridge".
 *
 * Publishes the clean article library (client/public/article-library.json) into
 * the live `posts` table at BUILD TIME, so the articles go live on deploy with
 * no admin login required. Runs in the Vercel build (which has DATABASE_URL),
 * right after the sitemap step.
 *
 * SAFETY (this writes to the production database, so it is deliberately timid):
 *   - No DATABASE_URL  -> logs and exits 0 (local builds are a no-op).
 *   - INSERT IGNORE     -> never creates a duplicate; mirrors the tested prod
 *                          seed logic in api/index.ts (seedPostChristianArticles).
 *   - Fill-empty only   -> for an article that already exists, it only fills the
 *                          body when the current body is empty/stub (< 400 chars).
 *                          It NEVER overwrites a real, substantial body, so any
 *                          manual edits on the live site are preserved.
 *   - Citation guard    -> skips any body still containing an unresolved
 *                          "[cite" placeholder (belt-and-suspenders; the clean
 *                          library has none).
 *   - Never throws      -> any error is logged and the build continues; a
 *                          publish hiccup must not break a deploy.
 *
 * Idempotent: safe to run on every deploy. If everything is already published
 * with real bodies, it does nothing.
 */
import mysql from "mysql2/promise";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIB = join(__dirname, "..", "client/public/article-library.json");
const MIN_BODY = 400; // bodies shorter than this are treated as empty stubs

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("[publish-articles] DATABASE_URL not set — skipping (no-op).");
    return;
  }

  let articles = [];
  try {
    const raw = JSON.parse(readFileSync(LIB, "utf8"));
    articles = Array.isArray(raw) ? raw : (raw.articles || raw.posts || []);
  } catch (e) {
    console.log("[publish-articles] could not read article library — skipping:", e.message);
    return;
  }

  const hasCite = (b) => /\[cite/i.test(b || "");
  const clean = articles.filter((a) => a && a.slug && a.body && !hasCite(a.body));
  const blocked = articles.filter((a) => a && a.body && hasCite(a.body)).length;

  let conn;
  try {
    conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: true } });
  } catch (e) {
    console.log("[publish-articles] DB connect failed — skipping:", e.message);
    return;
  }

  let inserted = 0, filled = 0, kept = 0, errors = 0;
  try {
    for (const a of clean) {
      try {
        const [rows] = await conn.execute(
          "SELECT id, CHAR_LENGTH(COALESCE(body,'')) AS len FROM posts WHERE slug = ? LIMIT 1",
          [a.slug]
        );
        if (!rows.length) {
          // New article — insert it, published. Mirrors api/index.ts seed insert.
          const [r] = await conn.execute(
            "INSERT IGNORE INTO posts (title, slug, body, excerpt, pillar, readTime, published, createdAt, updatedAt) " +
              "VALUES (?, ?, ?, ?, ?, ?, true, NOW(), NOW())",
            [a.title || a.slug, a.slug, a.body, a.excerpt || null, a.pillar || null, a.readTime || null]
          );
          if (r.affectedRows) inserted++; else kept++;
        } else if ((rows[0].len || 0) < MIN_BODY) {
          // Exists but empty/stub — fill it without touching anything else.
          await conn.execute(
            "UPDATE posts SET body = ?, excerpt = COALESCE(excerpt, ?), readTime = COALESCE(readTime, ?), published = true, updatedAt = NOW() WHERE slug = ?",
            [a.body, a.excerpt || null, a.readTime || null, a.slug]
          );
          filled++;
        } else {
          // Already has a real body — leave it exactly as it is.
          kept++;
        }
      } catch (e) {
        errors++;
        if (errors <= 5) console.error(`[publish-articles] ${a.slug}: ${String(e.message || e).slice(0, 160)}`);
      }
    }

    let total = "?";
    try {
      const [c] = await conn.execute("SELECT COUNT(*) AS n FROM posts WHERE published = true");
      total = c[0].n;
    } catch { /* ignore */ }

    console.log("[publish-articles] done —",
      `inserted ${inserted}, filled ${filled}, left-as-is ${kept},`,
      `held back for [cite] ${blocked}, errors ${errors}.`,
      `Published posts now: ${total}.`);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  // Never break the deploy over a publish hiccup.
  console.error("[publish-articles] non-fatal error:", err && err.message);
  process.exit(0);
});
