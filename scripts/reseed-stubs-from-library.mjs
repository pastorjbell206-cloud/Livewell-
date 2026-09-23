#!/usr/bin/env node
/**
 * reseed-stubs-from-library.mjs — give the 128 stub rows their real essays.
 *
 * 128 posts were seeded as fifty-word catalogue abstracts of essays the static
 * library holds in full (about 1,700 words each) under the same slugs. The
 * site papers over this at read time (api/index.ts preferFullBody, and the
 * prerender), but the rows themselves are still stubs, and the seed data
 * (client/src/data/content-data.json) still carries them as unpublished
 * stubs. This script makes the rows honest: each stub row gets the library's
 * body, excerpt and read time, and is published, while keeping its own id,
 * dates, pillar, cover and featured flag.
 *
 * The stub set is derived from content-data.json (published: false AND body
 * under 200 words) intersected with the library (body of 200 words or more),
 * so it cannot drift from the source of truth. Do NOT run
 * scripts/unpublish-stubs.mjs afterwards: that script retires the same rows.
 *
 * Safety: a database row is only touched if its body is still under 200 words
 * at the moment of the update. A row the admin has since replaced with a real
 * essay, or taken down as a real essay, is left alone.
 *
 *   node scripts/reseed-stubs-from-library.mjs               dry run: the plan
 *   DATABASE_URL=... node scripts/reseed-stubs-from-library.mjs   dry run against the live rows
 *   DATABASE_URL=... node scripts/reseed-stubs-from-library.mjs --apply   update the live rows
 *   node scripts/reseed-stubs-from-library.mjs --sql out.sql  write the UPDATE statements to a file
 *   node scripts/reseed-stubs-from-library.mjs --seed         update content-data.json (the seed data) in place
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => path.join(ROOT, p);
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const SEED = args.includes("--seed");
const SQL_OUT = args.includes("--sql") ? args[args.indexOf("--sql") + 1] : null;
const STUB_MAX = 200;

const wordCount = (s) => String(s ?? "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const readTimeFor = (body) => `${Math.max(1, Math.round(wordCount(body) / 225))} min read`;

function movedToPcn() {
  try {
    return new Set(JSON.parse(readFileSync(rel("content/pcn-moved.json"), "utf8")).slugs || []);
  } catch {
    return new Set();
  }
}

export function plan() {
  const cd = JSON.parse(readFileSync(rel("client/src/data/content-data.json"), "utf8"));
  const lib = JSON.parse(readFileSync(rel("content/static-library.generated.json"), "utf8"));
  const byLib = new Map(lib.map((r) => [r.slug, r]));
  // A stub whose essay moved to the Pastors Connection Network
  // (content/pcn-moved.json) is not reseeded: the site no longer serves that
  // slug at all, and republishing its row would only put a pastor essay back
  // into the database for the API to filter out again.
  const moved = movedToPcn();
  const rows = [];
  let skippedMoved = 0;
  for (const p of cd.posts || []) {
    if (p.published !== false || wordCount(p.body) >= STUB_MAX) continue;
    const full = byLib.get(p.slug);
    if (!full || wordCount(full.body) < STUB_MAX) continue;
    if (moved.has(p.slug)) { skippedMoved++; continue; }
    rows.push({ slug: p.slug, oldWords: wordCount(p.body), newWords: wordCount(full.body), body: full.body, excerpt: full.excerpt || p.excerpt || "", readTime: full.readTime || readTimeFor(full.body) });
  }
  return { cd, rows, skippedMoved };
}

function sqlLiteral(s) {
  return "'" + String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
}

function updateSql(r) {
  return `UPDATE posts SET body = ${sqlLiteral(r.body)}, excerpt = COALESCE(NULLIF(excerpt, ''), ${sqlLiteral(r.excerpt)}), readTime = ${sqlLiteral(r.readTime)}, published = 1 WHERE slug = ${sqlLiteral(r.slug)} AND CHAR_LENGTH(body) < 1500;`;
}

async function main() {
  const { cd, rows, skippedMoved } = plan();
  console.log(`[reseed] ${rows.length} stub rows have a full essay in the library and stay on this site; ${skippedMoved} more are pastor essays moved to PCN and are left alone`);

  if (SEED) {
    const bySlug = new Map(rows.map((r) => [r.slug, r]));
    let changed = 0;
    for (const p of cd.posts) {
      const r = bySlug.get(p.slug);
      if (!r) continue;
      p.body = r.body;
      p.excerpt = p.excerpt || r.excerpt;
      p.published = true;
      changed++;
    }
    writeFileSync(rel("client/src/data/content-data.json"), JSON.stringify(cd, null, 2) + "\n");
    console.log(`[reseed] content-data.json: ${changed} rows now carry the full body and published: true`);
    return;
  }

  if (SQL_OUT) {
    writeFileSync(SQL_OUT, rows.map(updateSql).join("\n") + "\n");
    console.log(`[reseed] wrote ${rows.length} UPDATE statements to ${SQL_OUT} (each guarded by CHAR_LENGTH(body) < 1500)`);
    return;
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("[reseed] no DATABASE_URL: the plan below is from the seed data, not the live rows");
    console.log("slug | old words | new words");
    for (const r of rows) console.log(`${r.slug} | ${r.oldWords} | ${r.newWords}`);
    console.log(`[reseed] dry run. Set DATABASE_URL to compare against the live rows; add --apply to update them; --sql <file> writes the statements; --seed updates content-data.json.`);
    return;
  }

  const mysql = (await import("mysql2/promise")).default;
  const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: true } });
  try {
    const slugs = rows.map((r) => r.slug);
    const [live] = await conn.query(`SELECT id, slug, CHAR_LENGTH(body) AS chars, body, published, publishedAt FROM posts WHERE slug IN (${slugs.map(() => "?").join(",")})`, slugs);
    const byLive = new Map(live.map((r) => [r.slug, r]));
    let willUpdate = 0, skipped = 0, absent = 0;
    console.log("slug | id | live words | live published | new words | action");
    for (const r of rows) {
      const l = byLive.get(r.slug);
      if (!l) { absent++; console.log(`${r.slug} | - | - | - | ${r.newWords} | not in the database`); continue; }
      const liveWords = wordCount(l.body);
      const action = liveWords < STUB_MAX ? "update" : "leave (not a stub any more)";
      if (liveWords < STUB_MAX) willUpdate++; else skipped++;
      console.log(`${r.slug} | ${l.id} | ${liveWords} | ${l.published ? "yes" : "no"} | ${r.newWords} | ${action}`);
    }
    console.log(`[reseed] ${willUpdate} to update, ${skipped} left alone, ${absent} not in the database`);
    if (!APPLY) { console.log("[reseed] dry run. Add --apply to update the live rows."); return; }
    let done = 0;
    for (const r of rows) {
      const l = byLive.get(r.slug);
      if (!l || wordCount(l.body) >= STUB_MAX) continue;
      const [res] = await conn.execute(
        "UPDATE posts SET body = ?, excerpt = COALESCE(NULLIF(excerpt, ''), ?), readTime = ?, published = 1 WHERE slug = ? AND CHAR_LENGTH(body) < 1500",
        [r.body, r.excerpt, r.readTime, r.slug]
      );
      if (res.affectedRows) done++;
    }
    console.log(`[reseed] updated ${done} rows`);
  } finally {
    await conn.end();
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main().catch((e) => { console.error(e); process.exit(1); });
