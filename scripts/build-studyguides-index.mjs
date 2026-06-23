#!/usr/bin/env node
/**
 * build-studyguides-index.mjs
 *
 * Scans client/public/studyguides/*.json and writes
 * client/public/studyguides/index.json, the manifest the /studyguides listing
 * page loads. This lets new guides appear automatically — drop a guide JSON in
 * the directory and rerun, with no hand-editing of a registration file.
 *
 *   node scripts/build-studyguides-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/studyguides";
const OUT = path.join(DIR, "index.json");

const files = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json")
  : [];

const guides = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    guides.push({
      slug: d.slug,
      title: d.title,
      eyebrow: d.eyebrow || d.subtitle || "",
      blurb: d.cardBlurb || d.summary || d.subtitle || "",
      audience: d.audience || "",
      sessionsLabel: d.sessionsLabel || (Array.isArray(d.sessions) ? `${d.sessions.length} sessions` : ""),
    });
  } catch (err) {
    console.warn(`[build-studyguides-index] skipped ${f}:`, err.message);
  }
}
guides.sort((a, b) => a.title.localeCompare(b.title));
fs.writeFileSync(OUT, JSON.stringify({ guides }, null, 2) + "\n");
console.log(`[build-studyguides-index] wrote ${guides.length} guides to ${OUT}`);
