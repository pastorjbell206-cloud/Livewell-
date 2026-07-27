#!/usr/bin/env node
/**
 * apply-title-rewrites.mjs — apply the SEO title pass from docs/seo/title-rewrites.json.
 *
 * The audit rewrites the VISIBLE TITLE only. Slugs never change, so every URL
 * and the search authority it has earned survive the pass.
 *
 * Two surfaces, because titles live in two places:
 *
 *   1. JSON libraries (leadership, life, context, formation, theology, the
 *      prophetic topics). The per-item content file is the source of truth and
 *      the generated index carries a copy, so this patches the content file and
 *      then names the index builder to rerun (index drift is a real trap here).
 *
 *   2. The /writing essays, whose live titles come from the MySQL `posts` table.
 *      This script can emit the SQL, and with --db it will run the updates. That
 *      is a stateful production change: it is opt-in, never the default.
 *
 * Usage:
 *   node scripts/apply-title-rewrites.mjs                 # dry run, report only
 *   node scripts/apply-title-rewrites.mjs --files         # patch library files
 *   node scripts/apply-title-rewrites.mjs --sql > t.sql   # emit SQL for /writing
 *   node scripts/apply-title-rewrites.mjs --db            # run the DB updates
 *
 * Safety: an entry whose current title no longer matches `old` is REPORTED and
 * SKIPPED, never overwritten. That way a title someone edited by hand in the
 * meantime is never silently clobbered.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const MAP = path.join(ROOT, "docs/seo/title-rewrites.json");

// route -> { dir: per-item content files, builder: index builder to rerun }
const LIBRARIES = {
  "/leadership/article/": { dir: "client/public/leadership/articles", builder: "build-leadership-index.mjs" },
  "/leadership/formation/": { dir: "client/public/leadership/formation", builder: "build-formation-index.mjs" },
  "/life/": { dir: "client/public/life/domains", builder: "build-life-index.mjs" },
  "/resources/context/": { dir: "client/public/context/guides", builder: "build-context-index.mjs" },
  "/theology/doctrine/": { dir: "client/public/theology", builder: "build-theology-index.mjs" },
  "/justice/topic/": { dir: "client/public/justice/topics", builder: "build-prophetic-indexes.mjs" },
  "/disruption/topic/": { dir: "client/public/disruption/topics", builder: "build-prophetic-indexes.mjs" },
  "/nation/": { dir: "client/public/nation", builder: null },
  "/studyguides/": { dir: "client/public/studyguides", builder: "build-studyguides-index.mjs" },
};

const args = new Set(process.argv.slice(2));
const DO_FILES = args.has("--files");
const DO_SQL = args.has("--sql");
const DO_DB = args.has("--db");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

if (!fs.existsSync(MAP)) {
  console.error(`[titles] missing ${MAP}. Nothing to apply.`);
  process.exit(1);
}
const rows = readJson(MAP).filter((r) => r && r.slug && r.new && !r.keep && r.new !== r.old);

const report = { patched: [], skippedMismatch: [], missing: [], db: [], builders: new Set() };

for (const r of rows) {
  // The /writing essays are database-backed; collect them for the SQL/DB pass.
  if (r.route === "/writing/") {
    report.db.push(r);
    continue;
  }
  const lib = LIBRARIES[r.route];
  if (!lib) {
    report.missing.push(`${r.route}${r.slug} (no library mapping)`);
    continue;
  }
  const file = path.join(ROOT, lib.dir, `${r.slug}.json`);
  if (!fs.existsSync(file)) {
    report.missing.push(`${lib.dir}/${r.slug}.json`);
    continue;
  }
  const doc = readJson(file);
  // Guard: only rewrite when the file still holds the title the audit saw.
  if (r.old && doc.title && doc.title !== r.old) {
    report.skippedMismatch.push(`${r.slug}: file has "${doc.title}", audit expected "${r.old}"`);
    continue;
  }
  if (DO_FILES) {
    // Preserve the old literary title as a kicker where the audit kept one, so
    // nothing evocative is simply thrown away.
    if (r.kicker && !doc.kicker) doc.kicker = r.kicker;
    doc.title = r.new;
    fs.writeFileSync(file, JSON.stringify(doc, null, 2) + "\n");
    if (lib.builder) report.builders.add(lib.builder);
  }
  report.patched.push(`${r.slug}: "${r.old}" -> "${r.new}"`);
}

const sqlFor = (r) =>
  `UPDATE posts SET title = ${JSON.stringify(r.new).replace(/^"|"$/g, "'")} WHERE slug = '${r.slug}';`;

if (DO_SQL) {
  for (const r of report.db) console.log(sqlFor(r));
  process.exit(0);
}

// --seed: apply the /writing rewrites to the committed essay seed
// (client/src/data/content-data.json). The seed feeds the static library that
// serves every essay the database does not hold, plus dev, search, and the
// answer-engine feed — so this makes the new titles real everywhere except
// live DB rows, which converge when --db runs (its drift guard still matches,
// because the DB itself is untouched here). Rebuild the static library after:
//   node scripts/build-static-library.mjs && node scripts/build-llms-full.mjs
if (args.has("--seed")) {
  const seedPath = path.join(ROOT, "client/src/data/content-data.json");
  const seed = readJson(seedPath);
  const posts = Array.isArray(seed) ? seed : seed.posts;
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  let ok = 0;
  for (const r of report.db) {
    const p = bySlug.get(r.slug);
    if (!p) {
      report.missing.push(`seed: no post with slug ${r.slug}`);
      continue;
    }
    if (r.old && p.title !== r.old && p.title !== r.new) {
      report.skippedMismatch.push(`seed ${r.slug}: has "${p.title}", expected "${r.old}"`);
      continue;
    }
    p.title = r.new;
    ok++;
  }
  fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2) + "\n");
  console.log(`[titles] seed: ${ok} of ${report.db.length} /writing titles applied to content-data.json.`);
}

if (DO_DB) {
  if (!process.env.DATABASE_URL) {
    console.error("[titles] --db needs DATABASE_URL in the environment. Refusing to guess.");
    process.exit(1);
  }
  const mysql = await import("mysql2/promise");
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  let ok = 0;
  let skipped = 0;
  for (const r of report.db) {
    // Same guard as the files: only update a row that still has the old title.
    const [cur] = await conn.query("SELECT title FROM posts WHERE slug = ?", [r.slug]);
    if (!cur.length) {
      report.missing.push(`db: no post with slug ${r.slug}`);
      continue;
    }
    if (r.old && cur[0].title !== r.old) {
      report.skippedMismatch.push(`db ${r.slug}: has "${cur[0].title}", expected "${r.old}"`);
      skipped++;
      continue;
    }
    await conn.query("UPDATE posts SET title = ? WHERE slug = ?", [r.new, r.slug]);
    ok++;
  }
  await conn.end();
  console.log(`[titles] database: ${ok} updated, ${skipped} skipped on mismatch.`);
}

console.log(`\n[titles] ${rows.length} rewrites in the audit.`);
console.log(`  library files ${DO_FILES ? "patched" : "that WOULD be patched"}: ${report.patched.length}`);
console.log(`  /writing (database) rows: ${report.db.length}${DO_DB ? " (applied above)" : " — run with --sql or --db"}`);
if (report.builders.size) {
  console.log(`\n  Rerun these index builders so the manifests match the files:`);
  for (const b of report.builders) console.log(`    node scripts/${b}`);
}
if (report.skippedMismatch.length) {
  console.log(`\n  SKIPPED (${report.skippedMismatch.length}) because the current title had drifted:`);
  for (const s of report.skippedMismatch.slice(0, 20)) console.log(`    - ${s}`);
}
if (report.missing.length) {
  console.log(`\n  NOT FOUND (${report.missing.length}):`);
  for (const s of report.missing.slice(0, 20)) console.log(`    - ${s}`);
}
if (!DO_FILES && !DO_DB) console.log(`\n  Dry run. Nothing was written.`);
