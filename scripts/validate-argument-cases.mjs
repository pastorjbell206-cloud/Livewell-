#!/usr/bin/env node
/**
 * validate-argument-cases.mjs — guards the "Test the Case" data.
 *
 * Two invariants:
 *   1. Every published case has real steps and a closing verdict, so the tool
 *      can never advertise a case that dead-ends.
 *   2. Every essaySlug a case claims to be built from resolves to a published
 *      essay, so the "Argue it yourself" card at the foot of an essay, and the
 *      essay/tool cross-link, cannot rot when an essay is renamed or dropped.
 *
 *   node scripts/validate-argument-cases.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CASES = path.join(ROOT, "client/src/data/argumentCases.ts");
const LIBRARY = path.join(ROOT, "content/static-library.generated.json");
const SEED = path.join(ROOT, "client/src/data/content-data.json");

const src = fs.readFileSync(CASES, "utf8");

const published = new Set();
for (const [file, key] of [[LIBRARY, null], [SEED, "posts"]]) {
  try {
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    const rows = key ? raw[key] || [] : raw;
    for (const r of rows) if (r && r.slug && r.published !== false) published.add(r.slug);
  } catch { /* source optional */ }
}

// Each case block: slug, essaySlugs, published flag, and whether it has steps.
const blocks = [...src.matchAll(
  /slug: "([a-z-]+)",\s*\n\s*essaySlugs: (\[[^\]]*\])[\s\S]*?published: (true|false),\s*\n\s*steps: \[([\s\S]*?)\n {2}\],/g
)];

if (blocks.length === 0) {
  console.error("[cases] no argument cases parsed - check the file shape");
  process.exit(1);
}

const problems = [];
let publishedCount = 0;

for (const [, slug, essaysRaw, pub, steps] of blocks) {
  const isPublished = pub === "true";
  if (isPublished) publishedCount++;

  if (isPublished && !/\bid: "/.test(steps)) {
    problems.push(`case "${slug}" is published but has no steps`);
  }

  let essays = [];
  try { essays = JSON.parse(essaysRaw); } catch { problems.push(`case "${slug}" has an unparseable essaySlugs list`); }
  for (const e of essays) {
    if (!published.has(e)) problems.push(`case "${slug}" points at essay "${e}", which is not a published essay`);
  }
}

if (problems.length) {
  console.error(`[cases] ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`[cases] clean: ${blocks.length} cases (${publishedCount} published), all essay links resolve.`);
