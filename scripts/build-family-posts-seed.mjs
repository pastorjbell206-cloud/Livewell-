#!/usr/bin/env node
/**
 * build-family-posts-seed.mjs
 *
 * Publishes the essay libraries by emitting `posts` INSERT rows into
 * scripts/seed-all-content.sql. Every essay under client/src/data/articles/*.json
 * ships as content-as-data but was never seeded, so no reader could reach them.
 * This closes that gap for the whole library (marriage/parenting, apologetics,
 * church history, justice, preaching, and the rest).
 *
 * Idempotent: rewrites the block between the BEGIN/END markers on every run, so
 * editing the source JSON and re-running keeps the seed in sync. Each row upserts
 * on the unique slug (ON DUPLICATE KEY UPDATE), so re-seeding refreshes the
 * content (body, cover, reading time) of an already-published essay rather than
 * silently skipping it the way INSERT IGNORE would.
 *
 * Run: node scripts/build-family-posts-seed.mjs
 * Then publish to the DB: DATABASE_URL=... npm run db:seed
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedFile = join(__dirname, "seed-all-content.sql");
const publicDir = join(__dirname, "..", "client", "src", "data", "articles");

// Every essay library under client/src/data/articles/*.json — not just the
// family files. These ship as content-as-data and are otherwise unreachable.
const FILES = readdirSync(publicDir)
  .filter(f => f.endsWith(".json"))
  .sort();
const BEGIN = "-- BEGIN generated: family posts (scripts/build-family-posts-seed.mjs)";
const END = "-- END generated: family posts";

/** MySQL single-quoted string literal. Doubles quotes, escapes backslashes. */
function sql(value) {
  return "'" + String(value ?? "").replace(/\\/g, "\\\\").replace(/'/g, "''") + "'";
}

function minutesFrom(readTime) {
  const m = String(readTime ?? "").match(/\d+/);
  return m ? Number(m[0]) : 5;
}

const rows = [];
for (const file of FILES) {
  const items = JSON.parse(readFileSync(join(publicDir, file), "utf8"));
  for (const it of items) {
    // Guard the seeder's `;\n` statement splitter: a semicolon at end of a line
    // inside a literal would corrupt the statement. The sources are clean today
    // (verified), but normalize defensively so future edits stay safe.
    const body = String(it.body ?? "").replace(/;([ \t]*)\r?\n/g, "; ");
    const cover = it.coverImage ? sql(it.coverImage) : "NULL";
    rows.push(
      "INSERT INTO posts " +
        "(title, slug, body, excerpt, pillar, readTime, readingTimeMinutes, coverImage, published, publishedAt, createdAt, updatedAt) VALUES (" +
        [
          sql(it.title),
          sql(it.slug),
          sql(body),
          sql(it.excerpt),
          sql(it.pillar),
          sql(it.readTime),
          minutesFrom(it.readTime),
          cover,
          "1",
          "NOW()",
          "NOW()",
          "NOW()",
        ].join(", ") +
        ") ON DUPLICATE KEY UPDATE " +
        "title=VALUES(title), body=VALUES(body), excerpt=VALUES(excerpt), " +
        "readTime=VALUES(readTime), readingTimeMinutes=VALUES(readingTimeMinutes), " +
        "coverImage=VALUES(coverImage), published=VALUES(published), updatedAt=NOW();"
    );
  }
}

const block = [
  BEGIN,
  `-- ${rows.length} essays from client/src/data/articles/*.json. Regenerate with`,
  "-- node scripts/build-family-posts-seed.mjs",
  ...rows,
  END,
  "",
].join("\n");

let seed = readFileSync(seedFile, "utf8");
const beginIdx = seed.indexOf(BEGIN);
if (beginIdx !== -1) {
  const endIdx = seed.indexOf(END, beginIdx);
  const after = seed.slice(endIdx + END.length).replace(/^\n/, "");
  seed = seed.slice(0, beginIdx) + block + after;
} else {
  seed = seed.replace(/\s*$/, "\n") + "\n" + block;
}
writeFileSync(seedFile, seed);
console.log(`Wrote ${rows.length} article post rows to scripts/seed-all-content.sql`);
