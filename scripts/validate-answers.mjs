#!/usr/bin/env node
/**
 * validate-answers.mjs — every hard-question answer must open onto its deep study.
 *
 * The /answers hub ladders short-answer -> full essay -> book. Each entry's
 * essaySlug is the "deep link"; it must resolve to a real, published essay so a
 * reader who wants the full argument is never sent to a dead page. Fails the
 * build if any answer's essaySlug does not resolve.
 *
 *   node scripts/validate-answers.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ANSWERS = path.join(ROOT, "client/src/data/answers.ts");
const LIBRARY = path.join(ROOT, "content/static-library.generated.json");
const SEED = path.join(ROOT, "client/src/data/content-data.json");

const src = fs.readFileSync(ANSWERS, "utf8");

// Pull each entry's essaySlug in order.
const essaySlugs = [...src.matchAll(/essaySlug:\s*"([^"]+)"/g)].map((m) => m[1]);
if (essaySlugs.length === 0) {
  console.error("[answers] no essaySlug entries found");
  process.exit(1);
}

const published = new Set();
try {
  for (const r of JSON.parse(fs.readFileSync(LIBRARY, "utf8"))) {
    if (r && r.slug && r.published !== false) published.add(r.slug);
  }
} catch { /* library optional */ }
try {
  const seed = JSON.parse(fs.readFileSync(SEED, "utf8"));
  for (const p of seed.posts || []) if (p && p.slug && p.published !== false) published.add(p.slug);
} catch { /* seed optional */ }

const dangling = essaySlugs.filter((s) => !published.has(s));
if (dangling.length) {
  console.error(`[answers] ${dangling.length} answer(s) point at a deep essay that does not resolve:`);
  for (const s of dangling) console.error(`  - essaySlug "${s}" (no published essay)`);
  process.exit(1);
}
console.log(`[answers] clean: all ${essaySlugs.length} answers open onto a resolving deep essay.`);
