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
 *
 * It also scans client/public/context/worlds/*.json (the long portraits of a
 * whole world, one per group, at /resources/context/world/:id) and writes
 * client/public/context/worlds-index.json: { id, title, seoTitle, group, blurb, parts }
 * for each. scripts/validate-worlds.mjs gates the portraits themselves.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GUIDE_DIR = path.resolve(__dirname, "..", "client", "public", "context", "guides");
const OUT = path.resolve(__dirname, "..", "client", "public", "context", "guides-index.json");
const WORLD_DIR = path.resolve(__dirname, "..", "client", "public", "context", "worlds");
const WORLDS_OUT = path.resolve(__dirname, "..", "client", "public", "context", "worlds-index.json");

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

const worlds = [];
for (const f of fs.existsSync(WORLD_DIR) ? fs.readdirSync(WORLD_DIR).filter((x) => x.endsWith(".json")) : []) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(WORLD_DIR, f), "utf8"));
    if (!d.id || !d.title || !d.group) continue;
    worlds.push({ id: d.id, title: d.title, seoTitle: d.seoTitle || d.title, group: d.group, blurb: d.description || d.line || "", parts: Array.isArray(d.parts) ? d.parts.length : 0 });
  } catch (err) {
    console.warn(`[build-context-index] skipped world ${f}:`, err.message);
  }
}
worlds.sort((a, b) => a.title.localeCompare(b.title));
fs.writeFileSync(WORLDS_OUT, JSON.stringify({ worlds }, null, 2) + "\n");
console.log(`[build-context-index] wrote ${worlds.length} world portrait(s) to ${path.relative(process.cwd(), WORLDS_OUT)}`);
