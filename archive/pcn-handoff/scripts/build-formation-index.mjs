#!/usr/bin/env node
/**
 * build-formation-index.mjs
 *
 * Scans client/public/leadership/formation/*.json and writes
 * client/public/leadership/formation-index.json, the manifest the deep
 * formation index (/leadership/formation) loads. Run after adding or editing
 * any deep formation topic (and after validate-formation.mjs passes):
 *
 *   node scripts/validate-formation.mjs && node scripts/build-formation-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/leadership/formation";
const OUT = "client/public/leadership/formation-index.json";

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
const topics = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    topics.push({ slug: d.slug, title: d.title, blurb: d.subtitle || "", pillar: d.pillar || "", triage: d.triage || "" });
  } catch (err) {
    console.warn(`[build-formation-index] skipped ${f}:`, err.message);
  }
}
topics.sort((a, b) => (a.pillar + a.title).localeCompare(b.pillar + b.title));
fs.writeFileSync(OUT, JSON.stringify({ topics }, null, 2));
console.log(`[build-formation-index] wrote ${topics.length} topics to ${OUT}`);
