#!/usr/bin/env node
/**
 * unpublish-stubs.mjs — retire the PCN-import stub articles in the live DB.
 *
 * 128 posts were seeded as published with bodies under 200 words: placeholders
 * describing an essay that was never written ("From the PCN Articles Library:
 * ... This article addresses ..."), not short essays. The 2026 voice audit
 * (docs/VOICE-AUDIT-TOTAL.md) retired them: content-data.json now carries them
 * as published: false, every listing surface stopped referencing them, and
 * client/src/lib/hiddenSlugs.ts hides them client-side. This script applies
 * the same retirement to the production database, which was seeded before the
 * change.
 *
 * The stub set is derived from content-data.json itself (published: false AND
 * body under 200 words), so the JSON stays the single source of truth and this
 * script cannot drift from it.
 *
 * Dry run (default — prints what would change, writes nothing):
 *   DATABASE_URL="mysql://..." node scripts/unpublish-stubs.mjs
 *
 * Apply:
 *   DATABASE_URL="mysql://..." node scripts/unpublish-stubs.mjs --apply
 */
import mysql from "mysql2/promise";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes("--apply");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const words = (s) => (s || "").split(/\s+/).filter(Boolean).length;

const data = JSON.parse(
  readFileSync(join(__dirname, "../client/src/data/content-data.json"), "utf8")
);
const stubSlugs = data.posts
  .filter((p) => p.published === false && words(p.body) < 200)
  .map((p) => p.slug);

if (stubSlugs.length === 0) {
  console.log("No retired stubs found in content-data.json — nothing to do.");
  process.exit(0);
}
console.log(`${stubSlugs.length} retired stubs in content-data.json`);

const conn = await mysql.createConnection(url);
try {
  const [rows] = await conn.query(
    `SELECT slug, published FROM posts WHERE slug IN (?)`,
    [stubSlugs]
  );
  const live = rows.filter((r) => r.published === 1 || r.published === true);
  console.log(`${rows.length} of them exist in this database; ${live.length} still published`);

  if (!live.length) {
    console.log("Database already matches — nothing to unpublish.");
  } else if (!APPLY) {
    console.log("\nDry run. Would unpublish:");
    for (const r of live) console.log(`  ${r.slug}`);
    console.log(`\nRe-run with --apply to write.`);
  } else {
    const [res] = await conn.query(
      `UPDATE posts SET published = 0 WHERE slug IN (?) AND published = 1`,
      [live.map((r) => r.slug)]
    );
    console.log(`Unpublished ${res.affectedRows} posts.`);
  }
} finally {
  await conn.end();
}
