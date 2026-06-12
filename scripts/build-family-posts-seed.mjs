#!/usr/bin/env node
/**
 * build-family-posts-seed.mjs
 *
 * Publishes the family-formation essay libraries by emitting `posts` INSERT
 * rows into scripts/seed-all-content.sql. The essays live as content-as-data in
 * client/public/articles/{marriage-and-family,marriage-guides,parenting-guides}.json
 * but were never seeded, so no reader could reach them. This closes that gap.
 *
 * Idempotent: rewrites the block between the BEGIN/END markers on every run, so
 * editing the source JSON and re-running keeps the seed in sync. The seeder
 * itself uses INSERT IGNORE, so re-seeding never duplicates a slug.
 *
 * Run: node scripts/build-family-posts-seed.mjs
 * Then publish to the DB: DATABASE_URL=... npm run db:seed
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedFile = join(__dirname, "seed-all-content.sql");
const publicDir = join(__dirname, "..", "client", "public", "articles");

const SOURCES = ["marriage-and-family", "marriage-guides", "parenting-guides"];
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
for (const name of SOURCES) {
  const items = JSON.parse(readFileSync(join(publicDir, `${name}.json`), "utf8"));
  for (const it of items) {
    // Guard the seeder's `;\n` statement splitter: a semicolon at end of a line
    // inside a literal would corrupt the statement. The sources are clean today
    // (verified), but normalize defensively so future edits stay safe.
    const body = String(it.body ?? "").replace(/;([ \t]*)\r?\n/g, "; ");
    rows.push(
      "INSERT IGNORE INTO posts " +
        "(title, slug, body, excerpt, pillar, readTime, readingTimeMinutes, published, publishedAt, createdAt, updatedAt) VALUES (" +
        [
          sql(it.title),
          sql(it.slug),
          sql(body),
          sql(it.excerpt),
          sql(it.pillar),
          sql(it.readTime),
          minutesFrom(it.readTime),
          "1",
          "NOW()",
          "NOW()",
          "NOW()",
        ].join(", ") +
        ");"
    );
  }
}

const block = [
  BEGIN,
  `-- ${rows.length} marriage, family, and parenting essays. Regenerate with`,
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
console.log(`Wrote ${rows.length} family post rows to scripts/seed-all-content.sql`);
