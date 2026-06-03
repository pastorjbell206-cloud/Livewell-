#!/usr/bin/env node
/**
 * apply-voice-edits.mjs — LiveWell by James Bell
 *
 * Applies the reviewed edits in scripts/voice-edits.json. Each edit is an exact
 * find->replace inside ONE essay (matched by slug). Safety rule: an edit is only
 * applied when its `find` text occurs EXACTLY ONCE in the target field. Zero
 * matches (stale slug / reworded since the audit) or multiple matches are
 * skipped and reported — never guessed.
 *
 * Modes:
 *   (default) dry run, no DB — reads scripts/.essays-export.json or
 *             scripts/.essays-corpus.json and shows before/after for every edit.
 *             Writes nothing. Use this to verify the edits land correctly.
 *
 *   --db      live apply — connects to DATABASE_URL (needs WRITE access) and runs
 *             one UPDATE per matched edit, inside a transaction. Prints each.
 *             Add --yes to skip the confirmation prompt.
 *
 * Examples:
 *   node scripts/apply-voice-edits.mjs                 # dry run on local corpus
 *   DATABASE_URL=... node scripts/apply-voice-edits.mjs --db --yes
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EDITS = JSON.parse(readFileSync(join(__dirname, "voice-edits.json"), "utf8")).edits;
const useDb = process.argv.includes("--db");

function snippet(text, idx, len) {
  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + len + 30);
  return `…${text.slice(start, end).replace(/\s+/g, " ").trim()}…`;
}

/** Returns { status, before?, after? } for an edit against a field value. */
function evaluate(value, edit) {
  if (value == null) return { status: "missing-field" };
  const count = value.split(edit.find).length - 1;
  if (count === 0) return { status: "no-match" };
  if (count > 1) return { status: "ambiguous", count };
  const idx = value.indexOf(edit.find);
  return {
    status: "ok",
    before: snippet(value, idx, edit.find.length),
    after: snippet(value.replace(edit.find, edit.replace), idx, edit.replace.length),
    next: value.replace(edit.find, edit.replace),
  };
}

// ─── Dry run (no DB) ────────────────────────────────────────────────────────

function dryRun() {
  const candidates = [join(__dirname, ".essays-export.json"), join(__dirname, ".essays-corpus.json")];
  const path = candidates.find(existsSync);
  if (!path) {
    console.error("No corpus. Run db-export-essays.mjs (live) or build-audit-corpus.mjs (dry) first.");
    process.exit(1);
  }
  const data = JSON.parse(readFileSync(path, "utf8"));
  const items = Array.isArray(data) ? data : data.posts;
  const bySlug = new Map(items.map((p) => [p.slug, p]));

  let ok = 0, miss = 0, ambiguous = 0, noSlug = 0;
  console.log(`Dry run against ${path}\n`);
  for (const edit of EDITS) {
    const field = edit.field || "body";
    const post = bySlug.get(edit.slug);
    if (!post) { noSlug++; console.log(`  ⚠ slug not in corpus: ${edit.slug} (${edit.word})`); continue; }
    const r = evaluate(post[field], edit);
    if (r.status === "ok") {
      ok++;
      console.log(`  ✓ [${edit.word}] ${edit.slug}${field === "title" ? " (title)" : ""}`);
      console.log(`      before: ${r.before}`);
      console.log(`      after:  ${r.after}`);
    } else if (r.status === "no-match") {
      miss++;
      console.log(`  ✗ no match: ${edit.slug} :: "${edit.find}"`);
    } else if (r.status === "ambiguous") {
      ambiguous++;
      console.log(`  ✗ ${r.count}× (ambiguous, would skip): ${edit.slug} :: "${edit.find}"`);
    } else {
      console.log(`  ✗ missing field ${field}: ${edit.slug}`);
    }
  }
  console.log(
    `\n${ok} ready · ${miss} no-match · ${ambiguous} ambiguous · ${noSlug} slug-not-found  (of ${EDITS.length})`
  );
  console.log("\nNo changes written (dry run). To apply to the live DB:");
  console.log("  DATABASE_URL=<write-access> node scripts/apply-voice-edits.mjs --db --yes");
}

// ─── Live apply (DB) ────────────────────────────────────────────────────────

async function liveApply() {
  const url = process.env.DATABASE_URL;
  if (!url) { console.error("DATABASE_URL not set."); process.exit(1); }
  if (!process.argv.includes("--yes")) {
    console.error("Refusing to write without --yes. Re-run with --db --yes once you've reviewed the dry run.");
    process.exit(1);
  }
  const mysql = (await import("mysql2/promise")).default;
  const conn = await mysql.createConnection(url);
  let applied = 0, skipped = 0;
  try {
    await conn.beginTransaction();
    for (const edit of EDITS) {
      const field = edit.field || "body";
      const [rows] = await conn.query(`SELECT id, ${field} AS val FROM posts WHERE slug = ? LIMIT 1`, [edit.slug]);
      if (rows.length === 0) { skipped++; console.log(`  ⚠ slug not found: ${edit.slug}`); continue; }
      const r = evaluate(rows[0].val, edit);
      if (r.status !== "ok") { skipped++; console.log(`  ✗ ${r.status}: ${edit.slug} :: "${edit.find}"`); continue; }
      await conn.query(`UPDATE posts SET ${field} = ? WHERE id = ?`, [r.next, rows[0].id]);
      applied++;
      console.log(`  ✓ [${edit.word}] ${edit.slug}${field === "title" ? " (title)" : ""}`);
    }
    await conn.commit();
    console.log(`\nCommitted. ${applied} applied · ${skipped} skipped (of ${EDITS.length}).`);
  } catch (err) {
    await conn.rollback();
    console.error("Rolled back — no changes written. Error:", err.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

if (useDb) liveApply();
else dryRun();
