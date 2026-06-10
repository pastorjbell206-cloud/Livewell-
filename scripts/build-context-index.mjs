#!/usr/bin/env node
/**
 * build-context-index.mjs
 *
 * Scans client/public/context/guides/*.json and writes
 * client/public/context/guides-index.json, the manifest the Reading Scripture
 * in Context library (/resources/context) loads. Run this after adding or
 * changing any context guide JSON file.
 *
 *   node scripts/build-context-index.mjs
 *
 * The manifest entry for each guide is { slug, title, blurb, group }, where
 * blurb falls back from an explicit index blurb to the guide subtitle.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GUIDE_DIR = path.resolve(__dirname, "..", "client", "public", "context", "guides");
const OUT = path.resolve(__dirname, "..", "client", "public", "context", "guides-index.json");

const files = fs.readdirSync(GUIDE_DIR).filter((f) => f.endsWith(".json"));
const guides = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(GUIDE_DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    guides.push({
      slug: d.slug,
      title: d.title,
      blurb: d.indexBlurb || d.subtitle || "",
      group: d.group || "Background",
    });
  } catch (err) {
    console.warn(`[build-context-index] skipped ${f}:`, err.message);
  }
}

guides.sort((a, b) => (a.group + a.title).localeCompare(b.group + b.title));
fs.writeFileSync(OUT, JSON.stringify({ guides }, null, 2));
console.log(`[build-context-index] wrote ${guides.length} guides to ${path.relative(process.cwd(), OUT)}`);
