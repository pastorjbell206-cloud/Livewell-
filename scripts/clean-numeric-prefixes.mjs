#!/usr/bin/env node
/**
 * clean-numeric-prefixes.mjs
 *
 * Strips leading "N. " numeric prefixes from PCN-imported article titles AND
 * their slugs. These prefixes were TOC artifacts from a source PDF, not
 * intentional titles. Examples:
 *
 *   "4. Navigating Conflict Alone"      ->  "Navigating Conflict Alone"
 *   "4-navigating-conflict-alone"       ->  "navigating-conflict-alone"
 *
 * Also creates 301 redirects so the old slugs stay reachable. Writes the
 * redirect list to scripts/numeric-prefix-redirects.json — copy that file's
 * contents into vercel.json's "redirects" array before deploying.
 *
 * Usage:
 *   DATABASE_URL=mysql://... node scripts/clean-numeric-prefixes.mjs --dry-run
 *   DATABASE_URL=mysql://... node scripts/clean-numeric-prefixes.mjs --apply
 *
 * Always run with --dry-run first. The script prints every change it would
 * make so you can audit before mutating production.
 */
import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TITLE_PREFIX_RE = /^\s*(\d{1,3})\.\s+/;
const SLUG_PREFIX_RE = /^(\d{1,3})-/;

function stripTitlePrefix(title) {
  return title.replace(TITLE_PREFIX_RE, "").trim();
}

function stripSlugPrefix(slug) {
  return slug.replace(SLUG_PREFIX_RE, "");
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes("--apply");

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required.");
    process.exit(1);
  }

  const conn = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
  });

  try {
    const [posts] = await conn.query(
      "SELECT id, title, slug FROM posts WHERE title REGEXP '^[[:space:]]*[0-9]+\\\\.' OR slug REGEXP '^[0-9]+-'"
    );

    console.log(`Found ${posts.length} posts with numeric prefixes.\n`);

    const changes = [];
    for (const post of posts) {
      const newTitle = stripTitlePrefix(post.title);
      const newSlug = stripSlugPrefix(post.slug);

      if (newTitle === post.title && newSlug === post.slug) continue;

      changes.push({
        id: post.id,
        oldTitle: post.title,
        newTitle,
        oldSlug: post.slug,
        newSlug,
      });
    }

    if (changes.length === 0) {
      console.log("Nothing to change.");
      return;
    }

    // Detect new-slug collisions with EXISTING rows (would fail UNIQUE).
    const newSlugs = changes.map(c => c.newSlug);
    const [collisions] = await conn.query(
      `SELECT slug FROM posts WHERE slug IN (${newSlugs.map(() => "?").join(",")})`,
      newSlugs
    );
    const collisionSet = new Set(collisions.map(r => r.slug));

    const safe = [];
    const skipped = [];
    for (const c of changes) {
      // It's safe to update IFF either:
      // - the new slug doesn't exist elsewhere, OR
      // - the row with that slug is THIS same row (slug unchanged).
      const newSlugInUseElsewhere =
        collisionSet.has(c.newSlug) && c.newSlug !== c.oldSlug;
      if (newSlugInUseElsewhere) skipped.push(c);
      else safe.push(c);
    }

    console.log(`Safe to update:    ${safe.length}`);
    console.log(`Skipped (collide): ${skipped.length}\n`);

    for (const c of safe) {
      console.log(`  [${c.id}] "${c.oldTitle}"`);
      console.log(`       -> "${c.newTitle}"`);
      if (c.oldSlug !== c.newSlug) {
        console.log(`       slug: ${c.oldSlug}  ->  ${c.newSlug}`);
      }
    }

    if (skipped.length > 0) {
      console.log("\nSkipped (target slug already taken):");
      for (const c of skipped) {
        console.log(`  [${c.id}] ${c.oldSlug}  (target: ${c.newSlug})`);
      }
    }

    if (dryRun) {
      console.log("\n=== DRY RUN — no changes written. Re-run with --apply. ===");
      return;
    }

    // Apply changes inside a transaction.
    await conn.beginTransaction();
    try {
      for (const c of safe) {
        await conn.execute(
          "UPDATE posts SET title = ?, slug = ? WHERE id = ?",
          [c.newTitle, c.newSlug, c.id]
        );
      }
      await conn.commit();
      console.log(`\nApplied ${safe.length} updates.`);
    } catch (err) {
      await conn.rollback();
      throw err;
    }

    // Emit redirect JSON for vercel.json
    const redirects = safe
      .filter(c => c.oldSlug !== c.newSlug)
      .map(c => ({
        source: `/writing/${c.oldSlug}`,
        destination: `/writing/${c.newSlug}`,
        permanent: true,
      }));
    const outPath = path.join(__dirname, "numeric-prefix-redirects.json");
    fs.writeFileSync(outPath, JSON.stringify(redirects, null, 2));
    console.log(`\nWrote ${redirects.length} redirect entries to ${outPath}.`);
    console.log("Paste these into vercel.json's \"redirects\" array.");
  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error("Failed:", err.message);
  process.exit(1);
});
