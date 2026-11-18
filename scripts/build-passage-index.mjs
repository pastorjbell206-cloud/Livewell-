#!/usr/bin/env node
/**
 * build-passage-index.mjs
 *
 * Writes client/public/index/chapters/<book>/<n>.json: for each Bible chapter
 * that has any, the pages on this site that treat it ("Go deeper" on a
 * chapter). The rules and the sources are in scripts/lib/passage-index.mjs.
 * Rerun it after editing any library it reads.
 *
 *   pnpm exec tsx scripts/build-passage-index.mjs           write the files
 *   pnpm exec tsx scripts/build-passage-index.mjs --check   exit 1 if regenerating would change any file (CI)
 *   pnpm exec tsx scripts/build-passage-index.mjs --stats   print the counts by kind
 */
import path from "node:path";
import { KIND_ORDER, OUT_DIR, ROOT, collectItems, buildPassageIndex, passageIndexDrift, passageIndexStats, renderFiles, writePassageIndex } from "./lib/passage-index.mjs";

const rel = path.relative(ROOT, OUT_DIR);
const items = collectItems();
const index = buildPassageIndex(items);
const files = renderFiles(index);

if (process.argv.includes("--stats")) {
  const { chapters, byKind } = passageIndexStats(items, index);
  console.log(`[passage-index] ${chapters} of 1189 chapters have something; ${1189 - chapters} have nothing`);
  for (const k of KIND_ORDER) {
    const s = byKind[k];
    console.log(`  ${k.padEnd(11)} ${String(s.itemsWithPassage).padStart(4)} of ${String(s.items).padStart(4)} items  ${String(s.rows).padStart(5)} rows  ${String(s.chapters).padStart(4)} chapters`);
  }
} else if (process.argv.includes("--check")) {
  const { count, stale, missing, extra } = passageIndexDrift(files);
  const problems = [
    ...stale.map((f) => `${f} differs from the libraries`),
    ...missing.map((f) => `${f} is missing`),
    ...extra.map((f) => `${f} has nothing behind it`),
  ];
  if (problems.length) {
    console.error(`[passage-index] ${problems.length} of the files in ${rel} are out of date:`);
    for (const p of problems.slice(0, 40)) console.error(`  - ${p}`);
    console.error("Run: pnpm exec tsx scripts/build-passage-index.mjs");
    process.exit(1);
  }
  console.log(`[passage-index] ok: ${count} chapter files match the libraries`);
} else {
  const { count, written, removed } = writePassageIndex(files);
  console.log(`[passage-index] ${count} files in ${rel}: ${written} written, ${removed} removed`);
}
