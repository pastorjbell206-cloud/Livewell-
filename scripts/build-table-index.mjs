#!/usr/bin/env node
/**
 * build-table-index.mjs
 *
 * Scans client/public/table/studies/*.json and writes
 * client/public/table/studies-index.json, the manifest the disciplemaking hub
 * (/table) loads. Run after adding or editing any home study (and after
 * validate-table.mjs passes):
 *
 *   node scripts/validate-table.mjs && node scripts/build-table-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/table/studies";
const OUT = "client/public/table/studies-index.json";

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
const studies = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    studies.push({
      slug: d.slug,
      title: d.title,
      subtitle: d.subtitle || "",
      summary: d.summary || "",
      sessions: Array.isArray(d.sessions) ? d.sessions.length : 0,
    });
  } catch (err) {
    console.warn(`[build-table-index] skipped ${f}:`, err.message);
  }
}
studies.sort((a, b) => a.title.localeCompare(b.title));
fs.writeFileSync(OUT, JSON.stringify({ studies }, null, 2));
console.log(`[build-table-index] wrote ${studies.length} study(ies) to ${OUT}`);
