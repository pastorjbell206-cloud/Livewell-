#!/usr/bin/env node
/**
 * backfill-subpathways.mjs
 *
 * Backfills posts.subPathway + posts.isSeries from a mapping file, matched by
 * `id` (falling back to `slug`). It does NOT touch `pillar` or any other field,
 * and never deletes or unpublishes anything.
 *
 * Mapping file (scripts/subpathway-mapping.json): an array of objects shaped
 *   { "id": 123, "slug": "...", "pillar": "...", "sub": "Economic Justice", "series": false }
 * Only `sub` and `series` are written. `pillar` is read for sanity-checking only.
 *
 * Requires DATABASE_URL. Dry-run by default. Writes a rollback file before any
 * write, and supports --restore=<file>.
 *
 *   node scripts/backfill-subpathways.mjs                 # dry-run report
 *   node scripts/backfill-subpathways.mjs --apply         # write
 *   node scripts/backfill-subpathways.mjs --restore=scripts/.subpathway-backup-<ts>.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const RESTORE = (args.find((a) => a.startsWith("--restore=")) || "").slice(10);
const MAP_FILE = path.resolve(__dirname, "subpathway-mapping.json");

if (RESTORE) {
  if (!process.env.DATABASE_URL) { console.error("DATABASE_URL required for --restore."); process.exit(1); }
  const backup = JSON.parse(fs.readFileSync(RESTORE, "utf8"));
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    let n = 0;
    for (const b of backup) {
      await conn.execute("UPDATE posts SET subPathway = ?, isSeries = ? WHERE id = ?",
        [b.subPathway, b.isSeries, b.id]); n++;
    }
    console.log(`Restored ${n} rows to pre-backfill state.`);
  } finally { await conn.end(); }
  process.exit(0);
}

if (!fs.existsSync(MAP_FILE)) {
  console.error(`Mapping file not found: ${MAP_FILE}`);
  console.error("Create it with an array of { id, slug, pillar, sub, series } objects.");
  process.exit(1);
}
const mapping = JSON.parse(fs.readFileSync(MAP_FILE, "utf8"));
console.log(`Loaded ${mapping.length} mapping rows.`);
const missingSub = mapping.filter((m) => !m.sub);
if (missingSub.length) console.log(`  WARNING: ${missingSub.length} mapping rows have no "sub" value.`);

if (!process.env.DATABASE_URL) {
  console.log("\nDATABASE_URL not set — dry-run only. No database changes made.");
  process.exit(0);
}

const conn = await mysql.createConnection(process.env.DATABASE_URL);
try {
  // PASS 1: read current state of every targeted post (no writes).
  const targets = [];
  const notFound = [];
  for (const m of mapping) {
    let rows;
    if (m.id != null) {
      [rows] = await conn.execute("SELECT id, pillar, subPathway, isSeries FROM posts WHERE id = ? LIMIT 1", [m.id]);
    }
    if ((!rows || !rows.length) && m.slug) {
      [rows] = await conn.execute("SELECT id, pillar, subPathway, isSeries FROM posts WHERE slug = ? LIMIT 1", [m.slug]);
    }
    if (!rows || !rows.length) { notFound.push(m.id ?? m.slug); continue; }
    targets.push({ ...m, row: rows[0] });
  }
  console.log(`\nmatched ${targets.length} posts; ${notFound.length} not found.`);
  if (notFound.length) console.log("  not found:\n   " + notFound.join("\n   "));

  if (!APPLY) {
    console.log("\nDry-run: re-run with --apply to write subPathway + isSeries.");
    console.log("Fields written: subPathway, isSeries (only). pillar is never modified.");
    await conn.end(); process.exit(0);
  }

  // Rollback file BEFORE any write.
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const bpath = path.resolve(__dirname, `.subpathway-backup-${ts}.json`);
  fs.writeFileSync(bpath, JSON.stringify(
    targets.map((t) => ({ id: t.row.id, subPathway: t.row.subPathway, isSeries: !!t.row.isSeries })), null, 0));
  console.log(`\nROLLBACK SAVED (before any write): ${bpath}`);
  console.log(`  To undo:  node scripts/backfill-subpathways.mjs --restore=${bpath}`);

  // PASS 2: write.
  let updated = 0;
  for (const t of targets) {
    await conn.execute("UPDATE posts SET subPathway = ?, isSeries = ? WHERE id = ?",
      [t.sub ?? null, t.series ? 1 : 0, t.row.id]);
    updated++;
  }
  console.log(`\nAPPLIED: ${updated} posts backfilled (subPathway + isSeries). pillar untouched.`);
} finally { await conn.end(); }
