#!/usr/bin/env node
/**
 * build-leadership-index.mjs
 *
 * Scans client/public/leadership/articles/*.json and writes
 * client/public/leadership/articles-index.json, the manifest the Leadership
 * Library page (/leadership/library) loads. Run this after adding or changing
 * any leadership article JSON file.
 *
 *   node scripts/build-leadership-index.mjs
 *
 * The manifest entry for each article is { slug, title, blurb, group }, where
 * blurb falls back from an explicit index blurb to the article subtitle.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ART_DIR = path.resolve(__dirname, "..", "client", "public", "leadership", "articles");
const OUT = path.resolve(__dirname, "..", "client", "public", "leadership", "articles-index.json");

const files = fs.readdirSync(ART_DIR).filter((f) => f.endsWith(".json"));
const articles = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(ART_DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    articles.push({
      slug: d.slug,
      title: d.title,
      blurb: d.indexBlurb || d.subtitle || "",
      group: d.group || "Leadership",
    });
  } catch (err) {
    console.warn(`[build-leadership-index] skipped ${f}:`, err.message);
  }
}

articles.sort((a, b) => (a.group + a.title).localeCompare(b.group + b.title));
fs.writeFileSync(OUT, JSON.stringify({ articles }, null, 2));
console.log(`[build-leadership-index] wrote ${articles.length} articles to ${path.relative(process.cwd(), OUT)}`);
