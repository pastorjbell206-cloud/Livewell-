#!/usr/bin/env node
/**
 * build-history-index.mjs
 *
 * Scans client/public/history/essays/*.json and writes
 * client/public/history/essays-index.json, the manifest the Church History
 * library loads. Run this after adding or changing any history essay JSON file.
 *
 *   node scripts/build-history-index.mjs
 *
 * The manifest entry for each essay is { slug, title, blurb, era, dateRange },
 * where blurb is taken from the essay subtitle.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ESSAY_DIR = path.resolve(__dirname, "..", "client", "public", "history", "essays");
const OUT = path.resolve(__dirname, "..", "client", "public", "history", "essays-index.json");

const files = fs.readdirSync(ESSAY_DIR).filter((f) => f.endsWith(".json") && f !== "essays-index.json");
const essays = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(ESSAY_DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    essays.push({
      slug: d.slug,
      title: d.title,
      blurb: d.subtitle || "",
      era: d.era || "",
      dateRange: d.dateRange || "",
    });
  } catch (err) {
    console.warn(`[build-history-index] skipped ${f}:`, err.message);
  }
}

// Chronological shelf order: eras ranked per the timeline (an alphabetical
// sort would file "The Age of the Councils" before "The Apostolic Age").
const ERA_ORDER = [
  "The Apostolic Age",
  "The Persecuted Church",
  "The Age of the Councils",
  "The Early Medieval Church",
  "The High Medieval Church",
  "The Reformation",
  "The Modern and Global Church",
];
const rank = (e) => {
  const i = ERA_ORDER.indexOf(e.era);
  return i === -1 ? ERA_ORDER.length : i;
};
const firstYear = (e) => {
  const m = String(e.dateRange).match(/\d{2,4}/);
  return m ? Number(m[0]) : 9999;
};
essays.sort((a, b) => rank(a) - rank(b) || firstYear(a) - firstYear(b) || a.title.localeCompare(b.title));
fs.writeFileSync(OUT, JSON.stringify({ essays }, null, 2));
console.log(`[build-history-index] wrote ${essays.length} essays to ${path.relative(process.cwd(), OUT)}`);
