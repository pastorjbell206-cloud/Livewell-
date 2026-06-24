#!/usr/bin/env node
/**
 * apply-excerpts.mjs — LiveWell by James Bell
 *
 * Applies the drafted excerpts in scripts/excerpts-draft.json to posts.excerpt.
 * Safety: only fills rows whose excerpt is currently empty (never overwrites
 * your existing copy), and by default skips drafts marked needsReview. Edit the
 * JSON first to refine wording or clear a needsReview flag.
 *
 *   node scripts/apply-excerpts.mjs                       # dry run (no DB)
 *   DATABASE_URL=<write> node scripts/apply-excerpts.mjs --db --yes
 *   ... --include-flagged   # also apply rows still marked needsReview
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const drafts = JSON.parse(readFileSync(join(__dirname, "excerpts-draft.json"), "utf8"));
const useDb = process.argv.includes("--db");
const includeFlagged = process.argv.includes("--include-flagged");

const eligible = drafts.filter((d) => d.excerpt && (includeFlagged || !d.needsReview));

function dryRun() {
  const corpusPath = join(__dirname, ".essays-export.json");
  const existing = existsSync(corpusPath)
    ? new Map(JSON.parse(readFileSync(corpusPath, "utf8")).map((p) => [p.slug, p.excerpt]))
    : null;
  let wouldFill = 0, wouldSkip = 0;
  for (const d of eligible) {
    if (existing && existing.get(d.slug)) { wouldSkip++; continue; }
    wouldFill++;
  }
  console.log(`Dry run — ${eligible.length} eligible drafts (${drafts.length - eligible.length} held back as needsReview/empty).`);
  if (existing) console.log(`Against live export: ~${wouldFill} would fill, ${wouldSkip} already have an excerpt (skipped).`);
  else console.log("No live export present; can't check which are already filled. Run db-export-essays.mjs for an accurate preview.");
  console.log("\nApply: DATABASE_URL=<write> node scripts/apply-excerpts.mjs --db --yes");
}

async function liveApply() {
  if (!process.env.DATABASE_URL) { console.error("DATABASE_URL not set."); process.exit(1); }
  if (!process.argv.includes("--yes")) { console.error("Add --yes once you've reviewed the dry run."); process.exit(1); }
  const mysql = (await import("mysql2/promise")).default;
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  let filled = 0, skipped = 0;
  try {
    await conn.beginTransaction();
    for (const d of eligible) {
      const [rows] = await conn.query("SELECT id, excerpt FROM posts WHERE slug = ? LIMIT 1", [d.slug]);
      if (rows.length === 0) { skipped++; console.log(`  ⚠ not found: ${d.slug}`); continue; }
      if (rows[0].excerpt && rows[0].excerpt.trim()) { skipped++; continue; } // never overwrite
      await conn.query("UPDATE posts SET excerpt = ? WHERE id = ?", [d.excerpt, rows[0].id]);
      filled++;
      console.log(`  ✓ ${d.slug}`);
    }
    await conn.commit();
    console.log(`\nCommitted. ${filled} filled · ${skipped} skipped.`);
  } catch (err) {
    await conn.rollback();
    console.error("Rolled back — no changes. Error:", err.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

if (useDb) liveApply();
else dryRun();
