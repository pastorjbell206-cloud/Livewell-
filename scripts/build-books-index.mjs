#!/usr/bin/env node
/**
 * build-books-index.mjs
 *
 * Scans client/public/books/*.json (full-length manuscripts) and writes
 * client/public/books/index.json, the manifest the /read library page loads.
 * Drop a manuscript in the directory and rerun; it appears automatically.
 *
 *   node scripts/build-books-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/books";
const OUT = path.join(DIR, "index.json");

const files = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json")
  : [];

const books = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    if (!d.title || !Array.isArray(d.chapters)) continue;
    books.push({
      slug: f.replace(/\.json$/, ""),
      title: d.title,
      subtitle: d.subtitle || "",
      blurb: d.blurb || "",
      pillar: d.pillar || "",
      chapters: d.chapters.length,
    });
  } catch (err) {
    console.warn(`[build-books-index] skipped ${f}:`, err.message);
  }
}
books.sort((a, b) => a.title.localeCompare(b.title));
fs.writeFileSync(OUT, JSON.stringify({ books }, null, 2) + "\n");
console.log(`[build-books-index] wrote ${books.length} book(s) to ${OUT}`);
