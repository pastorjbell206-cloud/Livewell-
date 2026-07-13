#!/usr/bin/env node
/**
 * purge-emdashes.mjs — LiveWell by James Bell
 *
 * Removes the em-dash (U+2014) from the reader-facing content-as-data stores.
 * The em-dash reads as an AI tell in Bell's voice; this pass converts every
 * inline em-dash to the punctuation the sentence already implies.
 *
 * The rule, verified against the whole corpus before it was written:
 *   every em-dash here is an INLINE `word — word` (99.8% spaced, 24 tight),
 *   none at a string/line boundary, none before punctuation, none attributions.
 *   So a single, safe transform covers every case: an em-dash with its
 *   surrounding spaces becomes a comma and one space.
 *
 *   - spaced  "clause — clause"     -> "clause, clause"
 *   - tight   "word—word"           -> "word, word"
 *   - a paired aside "x — y — z"    -> "x, y, z" (both dashes become commas)
 *
 * A comma is the grammatically safe, meaning-preserving replacement for an
 * appositive / parenthetical / elaboration em-dash: it never creates a fragment
 * and never mis-capitalizes. (A later human/LLM pass can upgrade select breaks
 * to the hard period of the "Not X. Y." voice; this mechanical pass ships a
 * clean, em-dash-free corpus without that risk.)
 *
 * Operates on RAW FILE TEXT, not parse->stringify: JSON has no comments and no
 * em-dash in any key, so every em-dash is inside a string value. Raw replace
 * keeps the diff minimal (only lines with an em-dash change) with zero
 * reformatting churn.
 *
 *   node scripts/purge-emdashes.mjs           # dry run: per-file counts
 *   node scripts/purge-emdashes.mjs --write    # apply in place
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WRITE = process.argv.includes("--write");

// The reader-facing stores in scope (chosen with the owner). Directories are
// globbed for *.json; single files are listed outright.
const DIRS = [
  "client/public/books",
  "client/public/leadership",
  "client/public/howtos",
  "client/public/creeds",
  "client/public/studyguides",
  // The how-to store is GENERATED from here (build-howtos-index reads it), so the
  // upstream source must be purged too or a rebuild pulls the em-dashes back.
  "scripts/articles",
];
const FILES = ["client/src/data/content-data.json"];

const EM_DASH = /—/;
const REPLACE = / *— */g;

/** Recursively collect *.json under a directory (stores nest one level deep:
 *  leadership/articles, leadership/services, howtos/a, creeds/documents). */
function walkJson(relDir, out) {
  const abs = path.join(ROOT, relDir);
  if (!fs.existsSync(abs)) return;
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(relDir, entry.name);
    if (entry.isDirectory()) walkJson(rel, out);
    else if (entry.isFile() && entry.name.endsWith(".json")) out.push(rel);
  }
}

function collectFiles() {
  const out = [];
  for (const d of DIRS) walkJson(d, out);
  for (const f of FILES) if (fs.existsSync(path.join(ROOT, f))) out.push(f);
  return out.sort();
}

let totalBefore = 0;
let totalAfter = 0;
let filesChanged = 0;

for (const rel of collectFiles()) {
  const abs = path.join(ROOT, rel);
  const raw = fs.readFileSync(abs, "utf8");
  const before = (raw.match(/—/g) || []).length;
  if (!before) continue;
  const next = raw.replace(REPLACE, ", ");
  const after = (next.match(/—/g) || []).length;
  totalBefore += before;
  totalAfter += after;
  filesChanged++;
  console.log(`${before.toString().padStart(5)} -> ${after}  ${rel}`);
  if (WRITE && next !== raw) fs.writeFileSync(abs, next);
}

console.log(
  `\n${WRITE ? "APPLIED" : "DRY RUN"}: ${filesChanged} files, ${totalBefore} em-dashes -> ${totalAfter} remaining`
);
if (totalAfter > 0) {
  console.log("WARNING: em-dashes remain after replace; a boundary case slipped the rule. Inspect before writing.");
  process.exitCode = 1;
}
