/**
 * build-book-manuscripts.mjs — convert delimited book source files in
 * content/books-src/*.txt into the reader JSON shape at
 * client/public/books/<slug>.json (consumed by BookReader at /read/:slug) and
 * register them in client/public/books/index.json.
 *
 * Source format (per file), labels are line-leading, BODY runs to next marker:
 *
 *   TITLE: ...
 *   SUBTITLE: ...
 *   PILLAR: ...
 *   BLURB: ...
 *   ===CHAPTER===
 *   TITLE: ...
 *   SUMMARY: ...
 *   VERDICT: ...
 *   REFLECT: question one | question two | question three
 *   BODY:
 *   <markdown body, any number of paragraphs>
 *   ===CHAPTER===
 *   ...
 *
 * The filename (minus .txt) is the read slug. Run:
 *   node scripts/build-book-manuscripts.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC_DIR = "content/books-src";
const OUT_DIR = "client/public/books";
const INDEX = join(OUT_DIR, "index.json");

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

function parseHeader(block) {
  // returns { fields:{TITLE,...}, body } — BODY: marker ends the header
  const lines = block.split("\n");
  const fields = {};
  let i = 0;
  let body = null;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const m = /^(TITLE|SUBTITLE|PILLAR|BLURB|SUMMARY|VERDICT|REFLECT):\s?(.*)$/.exec(line);
    if (/^BODY:\s*$/.test(line)) { body = lines.slice(i + 1).join("\n").trim(); break; }
    if (m) fields[m[1]] = m[2].trim();
  }
  return { fields, body };
}

function parseBook(raw) {
  const parts = raw.split(/^===CHAPTER===\s*$/m);
  const head = parseHeader(parts[0]);
  const meta = {
    title: head.fields.TITLE || "",
    subtitle: head.fields.SUBTITLE || "",
    pillar: head.fields.PILLAR || "",
    blurb: head.fields.BLURB || "",
  };
  const chapters = [];
  for (let k = 1; k < parts.length; k++) {
    const { fields, body } = parseHeader(parts[k]);
    if (!fields.TITLE && !body) continue;
    chapters.push({
      n: chapters.length + 1,
      slug: slugify(fields.TITLE || `chapter-${chapters.length + 1}`),
      title: fields.TITLE || `Chapter ${chapters.length + 1}`,
      summary: fields.SUMMARY || "",
      body: body || "",
      verdict: fields.VERDICT || "",
      reflect: (fields.REFLECT || "")
        .split("|").map(s => s.trim()).filter(Boolean),
    });
  }
  return { ...meta, chapters };
}

if (!existsSync(SRC_DIR)) {
  console.error(`No source dir ${SRC_DIR}; nothing to build.`);
  process.exit(0);
}

const files = readdirSync(SRC_DIR).filter(f => f.endsWith(".txt"));
const built = [];
for (const f of files) {
  const slug = f.replace(/\.txt$/, "");
  const raw = readFileSync(join(SRC_DIR, f), "utf8");
  const book = parseBook(raw);
  if (!book.title || book.chapters.length === 0) {
    console.warn(`SKIP ${f}: missing title or chapters`);
    continue;
  }
  writeFileSync(join(OUT_DIR, `${slug}.json`), JSON.stringify(book, null, 2) + "\n");
  const words = book.chapters.reduce((s, c) => s + c.body.split(/\s+/).length, 0);
  built.push({ slug, title: book.title, subtitle: book.subtitle, blurb: book.blurb, pillar: book.pillar, chapters: book.chapters.length });
  console.log(`built ${slug}: ${book.chapters.length} ch, ${words} words`);
}

// Merge into the /read library index (dedupe by slug, preserve existing entries).
let index = { books: [] };
try { index = JSON.parse(readFileSync(INDEX, "utf8")); } catch { /* fresh */ }
if (!Array.isArray(index.books)) index.books = [];
const bySlug = new Map(index.books.map(b => [b.slug, b]));
for (const b of built) bySlug.set(b.slug, { slug: b.slug, title: b.title, subtitle: b.subtitle, blurb: b.blurb, pillar: b.pillar, chapters: b.chapters });
index.books = [...bySlug.values()];
writeFileSync(INDEX, JSON.stringify(index, null, 2) + "\n");
console.log(`\nindex.json now lists ${index.books.length} books (${built.length} built this run)`);
