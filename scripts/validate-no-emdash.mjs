#!/usr/bin/env node
/**
 * validate-no-emdash.mjs — the em-dash ratchet.
 *
 * The em-dash (U+2014) reads as an AI tell in James Bell's voice, so the
 * reader-facing content stores are kept free of it. scripts/purge-emdashes.mjs
 * did the one-time cleanup; this guard keeps it clean: CI fails if an em-dash
 * reappears in any scoped file, whether hand-added or pulled in from an upstream
 * source by a rebuild.
 *
 * Scope = exactly what readers render, plus the one upstream source a builder
 * regenerates from (scripts/articles -> the how-to store). Book/leadership/creed
 * stores are their own source, so listing the store covers them.
 *
 * The rewritten essays (client/public/essays/*.json) are in scope with one
 * difference: a quotation keeps its own punctuation (the ESV and named
 * sources use the em-dash), so in an essay body only the prose outside
 * quotations is counted, along with "word---word", which the page renders as
 * an em-dash. Title and excerpt carry none at all. validate-essays.mjs is
 * their full gate.
 *
 * Run: node scripts/validate-no-emdash.mjs   (exits non-zero on any em-dash)
 *      node scripts/validate-no-emdash.mjs --essays <dir>   only the essay files in <dir> (the seeded-file test)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dashesIn, readEssayText } from "./lib/essay-text.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const essaysAt = process.argv.indexOf("--essays");
const ESSAYS_ONLY = essaysAt > 0 ? path.resolve(process.argv[essaysAt + 1] ?? "") : null;
const ESSAYS_DIR = ESSAYS_ONLY ?? path.join(ROOT, "client/public/essays");

// Directories globbed recursively for *.json, plus explicit single files.
const DIRS = [
  "client/public/howtos",
  "client/public/creeds",
  "client/public/studyguides",
  "scripts/articles", // upstream source for the how-to store
];
const FILES = ["client/src/data/content-data.json", "client/public/llms-full.txt", "content/static-library.generated.json"];

function walk(relDir, out) {
  const abs = path.join(ROOT, relDir);
  if (!fs.existsSync(abs)) return;
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(relDir, e.name);
    if (e.isDirectory()) walk(rel, out);
    else if (e.isFile() && e.name.endsWith(".json")) out.push(rel);
  }
}

const targets = [];
if (!ESSAYS_ONLY) {
  for (const d of DIRS) walk(d, targets);
  for (const f of FILES) if (fs.existsSync(path.join(ROOT, f))) targets.push(f);
}

/** Em-dashes in an essay file: none in title or excerpt, none outside quotations in the body. */
function essayEmdashes(text) {
  let doc;
  try {
    doc = JSON.parse(text);
  } catch {
    return (text.match(/—/g) || []).length; // unreadable: count them all (validate-essays names the error)
  }
  const field = (k) => (typeof doc?.[k] === "string" ? doc[k] : "");
  return (
    dashesIn(field("title")).length +
    dashesIn(field("excerpt")).length +
    dashesIn(readEssayText(field("body")).prose).length
  );
}

const essayTargets = fs.existsSync(ESSAYS_DIR)
  ? fs.readdirSync(ESSAYS_DIR).filter((f) => f.endsWith(".json")).sort().map((f) => path.join(ESSAYS_DIR, f))
  : [];

let offenders = 0;
let total = 0;
let essayOffenders = 0;
for (const rel of targets.sort()) {
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const n = (text.match(/—/g) || []).length;
  if (n) {
    offenders++;
    total += n;
    console.error(`  FAIL ${rel}: ${n} em-dash${n > 1 ? "es" : ""}`);
  }
}
for (const abs of essayTargets) {
  const n = essayEmdashes(fs.readFileSync(abs, "utf8"));
  if (n) {
    offenders++;
    essayOffenders++;
    total += n;
    const shown = abs.startsWith(ROOT + path.sep) ? path.relative(ROOT, abs) : abs;
    console.error(`  FAIL ${shown}: ${n} em-dash${n > 1 ? "es" : ""} outside quotations`);
  }
}

if (offenders) {
  console.error(
    `\nvalidate-no-emdash: ${total} em-dash(es) across ${offenders} file(s).\n` +
      (offenders > essayOffenders ? `Run: node scripts/purge-emdashes.mjs --write  (then rebuild the affected index).\n` : "") +
      (essayOffenders ? `In an essay, rewrite each with a comma, colon, period, or parentheses (node scripts/validate-essays.mjs lists them by line).` : "")
  );
  process.exit(1);
}
console.log(`validate-no-emdash: clean (${targets.length + essayTargets.length} files, 0 em-dashes).`);
