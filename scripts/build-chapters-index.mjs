#!/usr/bin/env node
/**
 * build-chapters-index.mjs — the essay→book map for the reader's journey.
 *
 * Scans every book manifest in client/public/books/*.json and writes
 * client/public/books/chapters-index.json: essay slug → the book that carries
 * it as a chapter ({ book, bookTitle, pillar, chapter, chapters }). The essay
 * page uses it to say "This essay is chapter N of <book> — keep reading."
 *
 * Generated from the manifests, never hand-kept. Rerun after any change to
 * the book library (build-essay-volumes.mjs regenerates the volumes; this
 * regenerates the map). If an essay appears in more than one book, the first
 * book by title order wins and the collision is reported.
 *
 *   node scripts/build-chapters-index.mjs
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_DIR = join(__dirname, "..", "client/public/books");
const OUT = join(BOOKS_DIR, "chapters-index.json");

const manifests = fs.readdirSync(BOOKS_DIR)
  .filter((f) => f.endsWith(".json") && f !== "index.json" && f !== "chapters-index.json")
  .map((f) => {
    const slug = f.replace(/\.json$/, "");
    try {
      const book = JSON.parse(fs.readFileSync(join(BOOKS_DIR, f), "utf8"));
      if (!book.title || !Array.isArray(book.chapters)) return null;
      return { slug, book };
    } catch { return null; }
  })
  .filter(Boolean)
  .sort((a, b) => a.book.title.localeCompare(b.book.title));

// Same cover convention as build-books-index.mjs: <slug>.<ext> in the books dir.
const COVER_EXT = ["svg", "jpg", "jpeg", "webp", "png"];
const findCover = (slug) => {
  for (const e of COVER_EXT) if (fs.existsSync(join(BOOKS_DIR, `${slug}.${e}`))) return `/books/${slug}.${e}`;
  return null;
};

const map = {};
let entries = 0, collisions = 0;
for (const { slug, book } of manifests) {
  const cover = findCover(slug);
  for (const ch of book.chapters) {
    if (!ch.slug) continue;
    if (map[ch.slug]) { collisions++; continue; } // first book by title order wins
    map[ch.slug] = {
      book: slug,
      bookTitle: book.title,
      pillar: book.pillar || "",
      chapter: ch.n,
      chapters: book.chapters.length,
      cover,
    };
    entries++;
  }
}

fs.writeFileSync(OUT, JSON.stringify(map, null, 1) + "\n");
console.log(`[build-chapters-index] mapped ${entries} essays to their books (${collisions} duplicate slugs skipped) → ${OUT}`);
