#!/usr/bin/env node
/**
 * publish-full-content.mjs
 *
 * Pushes the long-form bodies in content/full/<slug>.md into the live `posts`
 * table, matched by slug. Updates ONLY body + reading time + updatedAt; it does
 * NOT change published status, title, taxonomy, or any other admin-edited field.
 *
 * Requires DATABASE_URL (in .env or the environment). Dry-run by default.
 *
 *   node scripts/publish-full-content.mjs            # dry-run: report matches
 *   node scripts/publish-full-content.mjs --apply    # write bodies live
 *   node scripts/publish-full-content.mjs --apply --only=slug-a,slug-b
 *
 * Idempotent: re-running rewrites the same bodies. Safe to resume.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FULL_DIR = path.resolve(__dirname, "..", "content", "full");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const ONLY = (() => {
  const a = args.find((x) => x.startsWith("--only="));
  return a ? new Set(a.slice(7).split(",").map((s) => s.trim()).filter(Boolean)) : null;
})();
const RESTORE = (() => {
  const a = args.find((x) => x.startsWith("--restore="));
  return a ? a.slice(10) : null;
})();
const MIN_WORDS = 1500;

// ── Restore mode: put back the bodies saved in a backup file ──────────────
if (RESTORE) {
  if (!process.env.DATABASE_URL) { console.error("DATABASE_URL required for --restore."); process.exit(1); }
  const backup = JSON.parse(fs.readFileSync(RESTORE, "utf8"));
  console.log(`Restoring ${backup.length} post bodies from ${RESTORE} ...`);
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    let n = 0;
    for (const b of backup) {
      await conn.execute(
        "UPDATE posts SET body = ?, readingTimeMinutes = ?, updatedAt = NOW() WHERE slug = ?",
        [b.body, b.readingTimeMinutes, b.slug]
      );
      n++;
    }
    console.log(`Restored ${n} bodies to their pre-publish state.`);
  } finally { await conn.end(); }
  process.exit(0);
}

function parse(raw) {
  if (!raw.startsWith("---")) return { fm: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end < 0) return { fm: {}, body: raw };
  const fmBlock = raw.slice(3, end);
  const body = raw.slice(end + 4).replace(/^\n+/, "");
  const fm = {};
  for (const line of fmBlock.split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
  return { fm, body };
}
const wc = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const readMin = (s) => Math.max(1, Math.round(wc(s) / 200));

if (!fs.existsSync(FULL_DIR)) {
  console.error("No content/full directory found.");
  process.exit(1);
}
const files = fs.readdirSync(FULL_DIR).filter((f) => f.endsWith(".md")).sort();

const items = [];
let under = 0;
for (const f of files) {
  const { fm, body } = parse(fs.readFileSync(path.join(FULL_DIR, f), "utf8"));
  const slug = fm.slug || path.basename(f, ".md");
  if (ONLY && !ONLY.has(slug)) continue;
  const words = wc(body);
  if (words < MIN_WORDS) under++;
  items.push({ slug, body, words, readingTimeMinutes: readMin(body), file: f });
}

console.log(`content/full: ${files.length} files, ${items.length} selected, ${under} under ${MIN_WORDS} words.`);
if (under) console.log(`  WARNING: ${under} file(s) below the ${MIN_WORDS}-word floor — fix before publishing.`);

if (!process.env.DATABASE_URL) {
  console.log("\nDATABASE_URL not set — dry-run only. No database changes made.");
  console.log("Set DATABASE_URL and re-run with --apply to write bodies live.");
  process.exit(0);
}

const conn = await mysql.createConnection(process.env.DATABASE_URL);
try {
  let matched = 0, updated = 0, missing = [];
  const backup = [];
  for (const it of items) {
    const [rows] = await conn.execute(
      "SELECT id, published, body, readingTimeMinutes FROM posts WHERE slug = ? LIMIT 1", [it.slug]);
    if (!rows.length) { missing.push(it.slug); continue; }
    matched++;
    if (!APPLY) continue;
    // Save the current (pre-publish) state so we can roll back.
    backup.push({ slug: it.slug, body: rows[0].body, readingTimeMinutes: rows[0].readingTimeMinutes });
    await conn.execute(
      "UPDATE posts SET body = ?, readingTimeMinutes = ?, updatedAt = NOW() WHERE slug = ?",
      [it.body, it.readingTimeMinutes, it.slug]
    );
    updated++;
  }
  console.log(`\nmatched ${matched} existing posts by slug; ${missing.length} not found in posts table.`);
  if (missing.length) console.log("  missing slugs:\n   " + missing.join("\n   "));
  if (APPLY) {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const bpath = path.resolve(__dirname, `.publish-backup-${ts}.json`);
    fs.writeFileSync(bpath, JSON.stringify(backup, null, 0));
    console.log(`\nROLLBACK SAVED: ${bpath}`);
    console.log(`  To undo everything:  node scripts/publish-full-content.mjs --restore=${bpath}`);
    console.log(`\nAPPLIED: ${updated} post bodies updated.`);
  } else {
    console.log(`\nDry-run: re-run with --apply to update ${matched} post bodies.`);
  }
} finally {
  await conn.end();
}
