#!/usr/bin/env node
/**
 * build-bible-search.mjs
 *
 * Writes the files the Bible word search reads (client/public/bible/search/:
 * the Berean Standard Bible's words in eight files, one for each stretch of
 * the canon) from the Study Bible's chapter files (client/public/bible/ch/).
 * Run it after scripts/build-bible.mjs rebuilds the chapters:
 *
 *   node scripts/build-bible-search.mjs           write the files
 *   node scripts/build-bible-search.mjs --check   exit 1 if regenerating would change any file (CI)
 */
import path from "node:path";
import { OUT_DIR, ROOT, searchDrift, writeSearchFiles } from "./lib/bible-search.mjs";

const rel = path.relative(ROOT, OUT_DIR);

if (process.argv.includes("--check")) {
  const { count, stale, missing, extra } = searchDrift();
  const problems = [
    ...stale.map((f) => `${f} differs from the chapters`),
    ...missing.map((f) => `${f} is missing`),
    ...extra.map((f) => `${f} has nothing behind it`),
  ];
  if (problems.length) {
    console.error(`[bible-search] ${problems.length} of the files in ${rel} are out of date:`);
    for (const p of problems) console.error(`  - ${p}`);
    console.error("Run: node scripts/build-bible-search.mjs");
    process.exit(1);
  }
  console.log(`[bible-search] ok: ${count} search files match the chapters`);
} else {
  const { count, written, removed } = writeSearchFiles();
  console.log(`[bible-search] ${count} files in ${rel}: ${written} written, ${removed} removed`);
}
