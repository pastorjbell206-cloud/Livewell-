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
 *                          body when the current body is empty/stub (< 600 chars,
 *                          aligned with MIN_ESSAY_CHARS in client/src/lib/essayQuality.ts).
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
// Second, fill-only source: the merged static library the API already serves
// behind the DB. Its full essays repair the seeded stub rows, but it is NEVER
// used to INSERT — a fresh DB row would carry less metadata than the static
// record it shadows (DB wins on slug), so absent rows are left to the API's
// static merge.
const STATIC_LIB = join(__dirname, "..", "content/static-library.generated.json");
// Bodies shorter than this are treated as empty stubs. Must match
// MIN_ESSAY_CHARS in client/src/lib/essayQuality.ts — the corpus audit found
// ~129 DB rows seeded as 20-60 word catalog abstracts whose full essays live
// in the static library; the DB wins on slug collision, so until those rows
// are filled the reader gets the stub.
const MIN_BODY = 600;

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
    // The article library is optional now that the static library exists —
    // this early-returned for years after the file moved, which silently
    // no-opped the whole bridge on every deploy and left the seeded stub
    // rows unrepaired. Continue: the static library below can fill alone.
    console.log("[publish-articles] article library not readable (continuing with static library):", e.message);
  }

  const hasCite = (b) => /\[cite/i.test(b || "");
  const clean = articles.filter((a) => a && a.slug && a.body && !hasCite(a.body));
  const blocked = articles.filter((a) => a && a.body && hasCite(a.body)).length;

  // The static library is optional (generated file); without it the bridge
  // simply behaves as before. With it, prefer the longest clean body per slug
  // when filling a stub row, and fill stub rows for slugs the article library
  // never carried.
  let staticLib = [];
  try {
    const raw2 = JSON.parse(readFileSync(STATIC_LIB, "utf8"));
    staticLib = (Array.isArray(raw2) ? raw2 : []).filter(
      (a) => a && a.slug && a.body && !hasCite(a.body)
    );
  } catch {
    /* optional source — proceed with the article library alone */
  }
  const fillBySlug = new Map();
  for (const a of [...clean, ...staticLib]) {
    const prev = fillBySlug.get(a.slug);
    if (!prev || String(a.body).length > String(prev.body).length) fillBySlug.set(a.slug, a);
  }

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
          // Exists but empty/stub — fill it (with the longest clean body any
          // source carries for this slug) without touching anything else.
          const src = fillBySlug.get(a.slug) || a;
          await conn.execute(
            "UPDATE posts SET body = ?, excerpt = COALESCE(excerpt, ?), readTime = COALESCE(readTime, ?), published = true, updatedAt = NOW() WHERE slug = ?",
            [src.body, src.excerpt || null, src.readTime || null, a.slug]
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

    // Second pass, fill-only: static-library slugs the article library never
    // carried. Repairs the seeded stub rows (the corpus audit's ~129 catalog
    // abstracts) with the full essays already committed in the static library.
    // No INSERTs here — absent rows are already served by the API's static
    // merge, with richer metadata than a bridge insert would carry.
    const inLib = new Set(clean.map((a) => a.slug));
    for (const a of staticLib) {
      if (inLib.has(a.slug)) continue;
      if (String(a.body).trim().length < MIN_BODY) continue; // never fill a stub with a stub
      try {
        const [rows] = await conn.execute(
          "SELECT id, CHAR_LENGTH(COALESCE(body,'')) AS len FROM posts WHERE slug = ? LIMIT 1",
          [a.slug]
        );
        if (rows.length && (rows[0].len || 0) < MIN_BODY) {
          await conn.execute(
            "UPDATE posts SET body = ?, excerpt = COALESCE(excerpt, ?), readTime = COALESCE(readTime, ?), published = true, updatedAt = NOW() WHERE slug = ?",
            [a.body, a.excerpt || null, a.readTime || null, a.slug]
          );
          filled++;
        } else {
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
