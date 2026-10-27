#!/usr/bin/env node
/**
 * build-family-index.mjs
 *
 * Writes client/public/family/index.json, the index The Table reads: one row
 * per devotion page (/family/devotions/<id>), the daily sets, and the
 * catechism's questions (scripts/lib/family-index.mjs). Run it after changing
 * any family devotion file, the seasonal sets, or the catechism:
 *
 *   node scripts/build-family-index.mjs           write the index
 *   node scripts/build-family-index.mjs --check   exit 1 if it is stale or cannot be built
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, INDEX, buildFamilyIndex, renderFamilyIndex } from "./lib/family-index.mjs";

const CHECK = process.argv.includes("--check");
const { index, problems } = buildFamilyIndex(ROOT);
if (problems.length) {
  console.error("[family-index] the index cannot be built:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const out = path.join(ROOT, INDEX);
const text = renderFamilyIndex(index);
if (CHECK) {
  const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  if (current !== text) {
    console.error(`[family-index] ${INDEX} is stale. Run: node scripts/build-family-index.mjs`);
    process.exit(1);
  }
} else {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, text);
}
console.log(`[family-index] ${CHECK ? "up to date" : "wrote"} ${INDEX}: ${index.devotions.length} devotion pages (${index.weekly} weekly), ${index.catechism.length} catechism questions`);
