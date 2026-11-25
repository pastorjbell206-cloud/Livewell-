#!/usr/bin/env node
/**
 * build-topics-index.mjs
 *
 * Writes client/public/topics/index.json, the index /topics and on-site search
 * read: the topic pages (client/public/topics/<slug>.json) and the ordered rows
 * of scripts/data/topics-rows.json (scripts/lib/topics.mjs). Run it after
 * changing either, then run node scripts/validate-topics.mjs:
 *
 *   node scripts/build-topics-index.mjs           write the index
 *   node scripts/build-topics-index.mjs --check   exit 1 if it is stale or cannot be built
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, INDEX_FILE, buildTopicsIndex, readRows, readTopicPages, renderTopicsIndex } from "./lib/topics.mjs";

const CHECK = process.argv.includes("--check");
const { index, problems } = buildTopicsIndex(readTopicPages(), readRows());
if (problems.length) {
  console.error("[topics-index] the index cannot be built:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const out = path.join(ROOT, INDEX_FILE);
const text = renderTopicsIndex(index);
if (CHECK) {
  const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  if (current !== text) {
    console.error(`[topics-index] ${INDEX_FILE} is stale. Run: node scripts/build-topics-index.mjs`);
    process.exit(1);
  }
} else {
  fs.writeFileSync(out, text);
}
console.log(`[topics-index] ${CHECK ? "up to date" : "wrote"} ${INDEX_FILE}: ${index.pages.length} topic pages, ${index.rows.length} rows`);
