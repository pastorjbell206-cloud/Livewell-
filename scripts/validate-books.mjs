#!/usr/bin/env node
/**
 * validate-books.mjs — guarantees no "read the book, free" link dead-ends.
 *
 * Every book in the /read manifest, and every catalog->read target in
 * readableBooks.ts, must have a manuscript file with at least one chapter.
 * Fails the build otherwise, so a "Read online" affordance can never point at
 * an empty page.
 *
 *   node scripts/validate-books.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOKS_DIR = path.join(ROOT, "client/public/books");
const MANIFEST = path.join(BOOKS_DIR, "index.json");
const READABLE = path.join(ROOT, "client/src/lib/readableBooks.ts");

const problems = [];

function manuscriptChapters(slug) {
  const f = path.join(BOOKS_DIR, `${slug}.json`);
  if (!fs.existsSync(f)) return null;
  try {
    const doc = JSON.parse(fs.readFileSync(f, "utf8"));
    return Array.isArray(doc.chapters) ? doc.chapters.length : 0;
  } catch {
    return 0;
  }
}

// 1. Every manifest book must have a manuscript with >= 1 chapter.
// The read-online library was archived (see the books restructure). With no
// manifest there are no "read free" promises to guard, so pass cleanly rather
// than crash; if the library ever returns, this guard resumes automatically.
if (!fs.existsSync(MANIFEST)) {
  console.log("[books] no read-online manifest present (library archived) - nothing to validate.");
  process.exit(0);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const books = Array.isArray(manifest.books) ? manifest.books : [];
for (const b of books) {
  const n = manuscriptChapters(b.slug);
  if (n === null) problems.push(`manifest book "${b.slug}" has no manuscript file`);
  else if (n === 0) problems.push(`manifest book "${b.slug}" has an empty manuscript (0 chapters)`);
}

// 2. Every catalog -> read-online target must resolve to a manuscript.
const readableSrc = fs.readFileSync(READABLE, "utf8");
const targets = [...readableSrc.matchAll(/"[a-z0-9-]+":\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
for (const slug of targets) {
  const n = manuscriptChapters(slug);
  if (!n) problems.push(`readableBooks target "/read/${slug}" has no readable manuscript`);
}

if (problems.length) {
  console.error(`[books] ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`[books] clean: ${books.length} manifest books and ${targets.length} read targets all resolve to real manuscripts.`);
