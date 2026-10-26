#!/usr/bin/env node
/**
 * build-bible-text.mjs
 *
 * Writes the text-only chapter shards (client/public/bible/text/<book>/<n>.json:
 * verse numbers and the Berean Standard Bible text) from the Study Bible's
 * chapter files (client/public/bible/ch/). The verse sheet (VerseRef) reads a
 * shard instead of the full chapter, which also carries the original words.
 * Run it after scripts/build-bible.mjs rebuilds the chapters:
 *
 *   node scripts/build-bible-text.mjs           write the shards
 *   node scripts/build-bible-text.mjs --check   exit 1 if regenerating would change any shard (CI)
 */
import { OUT_DIR, ROOT, shardDrift, writeShards } from "./lib/bible-text.mjs";
import path from "node:path";

const rel = path.relative(ROOT, OUT_DIR);

if (process.argv.includes("--check")) {
  const { count, stale, missing, extra } = shardDrift();
  const problems = [
    ...stale.map((f) => `${f} differs from its chapter`),
    ...missing.map((f) => `${f} is missing`),
    ...extra.map((f) => `${f} has no chapter behind it`),
  ];
  if (problems.length) {
    console.error(`[bible-text] ${problems.length} of the shards in ${rel} are out of date:`);
    for (const p of problems.slice(0, 20)) console.error(`  - ${p}`);
    if (problems.length > 20) console.error(`  ... and ${problems.length - 20} more`);
    console.error("Run: node scripts/build-bible-text.mjs");
    process.exit(1);
  }
  console.log(`[bible-text] ok: ${count} text shards match their chapters`);
} else {
  const { count, written, removed } = writeShards();
  console.log(`[bible-text] ${count} shards in ${rel}: ${written} written, ${removed} removed`);
}
