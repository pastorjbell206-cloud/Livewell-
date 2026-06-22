#!/usr/bin/env node
/**
 * build-domains-index.mjs
 *
 * Scans client/public/life/domains/*.json and writes
 * client/public/life/domains-index.json, the manifest the deep
 * formation index (/life/domains) loads. Run after adding or editing
 * any deep formation topic (and after validate-life.mjs passes):
 *
 *   node scripts/validate-life.mjs && node scripts/build-domains-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/life/domains";
const OUT = "client/public/life/domains-index.json";

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
const domains = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    domains.push({ slug: d.slug, title: d.title, blurb: d.subtitle || "", pillar: d.pillar || "" });
  } catch (err) {
    console.warn(`[build-domains-index] skipped ${f}:`, err.message);
  }
}
domains.sort((a, b) => (a.pillar + a.title).localeCompare(b.pillar + b.title));
fs.writeFileSync(OUT, JSON.stringify({ domains }, null, 2));
console.log(`[build-domains-index] wrote ${domains.length} domains to ${OUT}`);
