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

essays.sort((a, b) => (a.era + a.dateRange + a.title).localeCompare(b.era + b.dateRange + b.title));
fs.writeFileSync(OUT, JSON.stringify({ essays }, null, 2));
console.log(`[build-history-index] wrote ${essays.length} essays to ${path.relative(process.cwd(), OUT)}`);
