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
 * Run: node scripts/validate-no-emdash.mjs   (exits non-zero on any em-dash)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Directories globbed recursively for *.json, plus explicit single files.
const DIRS = [
  "client/public/howtos",
  "client/public/creeds",
  "client/public/studyguides",
  "scripts/articles", // upstream source for the how-to store
];
const FILES = ["client/src/data/content-data.json", "client/public/llms-full.txt"];

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
for (const d of DIRS) walk(d, targets);
for (const f of FILES) if (fs.existsSync(path.join(ROOT, f))) targets.push(f);

let offenders = 0;
let total = 0;
for (const rel of targets.sort()) {
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const n = (text.match(/—/g) || []).length;
  if (n) {
    offenders++;
    total += n;
    console.error(`  FAIL ${rel}: ${n} em-dash${n > 1 ? "es" : ""}`);
  }
}

if (offenders) {
  console.error(
    `\nvalidate-no-emdash: ${total} em-dash(es) across ${offenders} file(s).\n` +
      `Run: node scripts/purge-emdashes.mjs --write  (then rebuild the affected index).`
  );
  process.exit(1);
}
console.log(`validate-no-emdash: clean (${targets.length} files, 0 em-dashes).`);
