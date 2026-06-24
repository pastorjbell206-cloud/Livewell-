#!/usr/bin/env node
/**
 * build-wisdom-index.mjs
 *
 * Merges client/public/wisdom/topics/*.json (each an array of wisdom topics)
 * into client/public/wisdom/topics.json, the dataset the Wisdom Finder tool
 * (/tools/wisdom-finder) loads. Run after adding or editing any topic file:
 *
 *   node scripts/build-wisdom-index.mjs
 *
 * Topic shape (per object):
 *   { id, label, keywords[], framing, cultural, historical, application,
 *     verses: [{ ref, text }] }
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/wisdom/topics";
const OUT = "client/public/wisdom/topics.json";
const REQUIRED = ["id", "label", "keywords", "framing", "cultural", "historical", "application", "verses"];

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).sort() : [];
const byId = new Map();
let problems = 0;

for (const f of files) {
  let arr;
  try {
    arr = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  } catch (e) {
    console.error(`[wisdom] ${f}: invalid JSON: ${e.message}`);
    problems++;
    continue;
  }
  if (!Array.isArray(arr)) {
    console.error(`[wisdom] ${f}: expected an array`);
    problems++;
    continue;
  }
  for (const t of arr) {
    const missing = REQUIRED.filter((k) => t[k] === undefined || t[k] === null || t[k] === "");
    if (missing.length) {
      console.error(`[wisdom] ${f}: topic "${t.id || "?"}" missing ${missing.join(", ")}`);
      problems++;
      continue;
    }
    if (!Array.isArray(t.keywords) || t.keywords.length === 0) {
      console.error(`[wisdom] ${f}: topic "${t.id}" needs a non-empty keywords array`);
      problems++;
      continue;
    }
    if (!Array.isArray(t.verses) || t.verses.length === 0) {
      console.error(`[wisdom] ${f}: topic "${t.id}" needs at least one verse`);
      problems++;
      continue;
    }
    if (byId.has(t.id)) console.warn(`[wisdom] duplicate id "${t.id}" (later file wins)`);
    byId.set(t.id, t);
  }
}

const topics = Array.from(byId.values()).sort((a, b) => a.label.localeCompare(b.label));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ topics }, null, 2) + "\n");
console.log(`[wisdom] wrote ${topics.length} topics to ${OUT} (${problems} problem(s))`);
process.exit(problems ? 1 : 0);
