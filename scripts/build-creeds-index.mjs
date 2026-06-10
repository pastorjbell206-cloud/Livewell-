#!/usr/bin/env node
/**
 * build-creeds-index.mjs
 *
 * Scans client/public/context/documents/*.json and writes
 * client/public/creeds/documents-index.json, the manifest the Reading Scripture
 * in Context library (/resources/context) loads. Run this after adding or
 * changing any context document JSON file.
 *
 *   node scripts/build-creeds-index.mjs
 *
 * The manifest entry for each document is { slug, title, blurb, group }, where
 * blurb falls back from an explicit index blurb to the document subtitle.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GUIDE_DIR = path.resolve(__dirname, "..", "client", "public", "creeds", "documents");
const OUT = path.resolve(__dirname, "..", "client", "public", "creeds", "documents-index.json");

const files = fs.readdirSync(GUIDE_DIR).filter((f) => f.endsWith(".json"));
const documents = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(GUIDE_DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    documents.push({
      slug: d.slug,
      title: d.title,
      blurb: d.indexBlurb || d.subtitle || "",
      group: d.group || "Documents",
      date: d.date || "",
    });
  } catch (err) {
    console.warn(`[build-creeds-index] skipped ${f}:`, err.message);
  }
}

documents.sort((a, b) => (a.group + a.title).localeCompare(b.group + b.title));
fs.writeFileSync(OUT, JSON.stringify({ documents }, null, 2));
console.log(`[build-creeds-index] wrote ${documents.length} documents to ${path.relative(process.cwd(), OUT)}`);
