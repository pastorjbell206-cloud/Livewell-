#!/usr/bin/env node
/**
 * apply-library-voice-edits.mjs — word-level voice edits to the static library.
 *
 * scripts/apply-voice-edits.mjs edits essays that live in the database. This
 * one edits the 678 essays that ship as files, and it edits every copy at
 * once so a rebuild cannot quietly bring the old word back:
 *
 *   content/static-library.generated.json   what the site and the build read
 *   api/static-library.generated.ts         the copy bundled into the server
 *   content/archive/free-library/*.json     the archived sources
 *   api/_data/*.json                        the publish-bridge sources
 *   content/drafts/** and docs/drafts/**    the markdown sources
 *
 * Each edit is { slug, find, replace, why }. Safety rule, same as the DB
 * applier: within the library record the `find` text must occur exactly once
 * in the essay body, or the edit is skipped and reported, never guessed. In
 * the other files the edit is applied wherever the text occurs exactly once
 * in that file (raw or JSON-escaped), and reported either way.
 *
 *   node scripts/apply-library-voice-edits.mjs            dry run, prints the plan
 *   node scripts/apply-library-voice-edits.mjs --write    apply
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EDITS = path.join(ROOT, "content/voice-edits-library.json");
const LIB = path.join(ROOT, "content/static-library.generated.json");
const WRITE = process.argv.includes("--write");

function walk(dir, exts, out = []) {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) walk(rel, exts, out);
    else if (exts.some(x => e.name.endsWith(x))) out.push(rel);
  }
  return out;
}

const COPIES = [
  "api/static-library.generated.ts",
  "client/src/data/content-data.json",
  ...walk("client/src/data", [".ts"]),
  ...walk("content/archive/free-library", [".json"]),
  ...walk("api/_data", [".json"]),
  ...walk("content/full", [".md"]),
  ...walk("content/drafts", [".md"]),
  ...walk("docs/drafts", [".md"]),
].filter(f => existsSync(path.join(ROOT, f)));

function countOccurrences(hay, needle) {
  if (!needle) return 0;
  let n = 0;
  let i = 0;
  while ((i = hay.indexOf(needle, i)) !== -1) { n++; i += needle.length; }
  return n;
}

const edits = JSON.parse(readFileSync(EDITS, "utf8")).filter(e => e && e.slug && e.find);
const library = JSON.parse(readFileSync(LIB, "utf8"));
const bySlug = new Map(library.map(r => [r.slug, r]));

let applied = 0;
const skipped = [];
const touchedCopies = new Map();

for (const e of edits) {
  const rec = bySlug.get(e.slug);
  if (!rec) { skipped.push(`${e.slug}: no such essay`); continue; }
  const n = countOccurrences(rec.body, e.find);
  if (n !== 1) { skipped.push(`${e.slug}: "${e.find.slice(0, 50)}" occurs ${n} times in the body`); continue; }
  rec.body = rec.body.replace(e.find, e.replace);
  if (rec.excerpt && countOccurrences(rec.excerpt, e.find) === 1) rec.excerpt = rec.excerpt.replace(e.find, e.replace);
  applied++;
  console.log(`${WRITE ? "edit" : "plan"}  ${e.slug}\n      - ${e.find}\n      + ${e.replace}`);

  for (const f of COPIES) {
    const abs = path.join(ROOT, f);
    let text = touchedCopies.get(f) ?? readFileSync(abs, "utf8");
    const variants = [
      [e.find, e.replace],
      [JSON.stringify(e.find).slice(1, -1), JSON.stringify(e.replace).slice(1, -1)],
    ];
    for (const [find, replace] of variants) {
      if (find === e.find && f.endsWith(".json")) continue; // JSON files hold the escaped form
      const c = countOccurrences(text, find);
      if (c === 1) { text = text.replace(find, replace); touchedCopies.set(f, text); console.log(`      also ${f}`); break; }
      if (c > 1) console.log(`      skip ${f}: occurs ${c} times`);
    }
  }
}

if (WRITE) {
  writeFileSync(LIB, JSON.stringify(library, null, 2) + "\n");
  for (const [f, text] of touchedCopies) writeFileSync(path.join(ROOT, f), text);
}
console.log(`\n[voice-edits] ${applied} of ${edits.length} edits ${WRITE ? "applied" : "planned"}; ${touchedCopies.size} copy file(s) ${WRITE ? "updated" : "would update"}.`);
if (skipped.length) console.log(`[voice-edits] skipped ${skipped.length}:\n  ${skipped.join("\n  ")}`);
if (!WRITE) console.log("[voice-edits] dry run. Add --write to apply.");
process.exit(skipped.length ? 1 : 0);
