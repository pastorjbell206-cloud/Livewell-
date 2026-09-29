#!/usr/bin/env node
/**
 * build-bible-notes-index.mjs — the Study Bible's small table of contents for
 * its authored layer, written to client/public/bible/notes-index.json.
 *
 * Holds what the book, story, and doctrine pages need without opening 1,189
 * files: every chapter's title, every book's tagline, the chapters that teach
 * each doctrine, and the chapters that already have a passage guide at
 * /theology/passage. Rerun after editing any file in client/public/bible/notes/;
 * `node scripts/validate-bible-notes.mjs` fails when the index is stale.
 *
 *   node scripts/build-bible-notes-index.mjs          write the index
 *   node scripts/build-bible-notes-index.mjs --check  exit 1 if it would change
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("client/public/bible");
const OUT = path.join(DIR, "notes-index.json");

export function buildIndex() {
  const books = JSON.parse(fs.readFileSync(path.join(DIR, "books.json"), "utf8"));
  const doctrines = JSON.parse(fs.readFileSync(path.join(DIR, "doctrines.json"), "utf8")).doctrines;
  const titles = {};
  const taglines = {};
  const byDoctrine = Object.fromEntries(doctrines.map((d) => [d.id, []]));
  for (const b of books) {
    const dir = path.join(DIR, "notes", b.slug);
    const intro = path.join(dir, "intro.json");
    if (fs.existsSync(intro)) taglines[b.slug] = JSON.parse(fs.readFileSync(intro, "utf8")).tagline;
    titles[b.slug] = [];
    for (let c = 1; c <= b.chapters; c++) {
      const p = path.join(dir, `${c}.json`);
      if (!fs.existsSync(p)) { titles[b.slug].push(null); continue; }
      const n = JSON.parse(fs.readFileSync(p, "utf8"));
      titles[b.slug].push(n.title);
      for (const d of n.doctrines ?? []) byDoctrine[d.id]?.push(`${b.slug}/${c}`);
    }
  }
  // Passage guides are keyed by the theology library's book names ("psalms 23").
  const guideBooks = JSON.parse(fs.readFileSync(path.resolve("client/public/theology/bible-books.json"), "utf8")).books;
  const guides = JSON.parse(fs.readFileSync(path.resolve("client/public/theology/passage-notes.json"), "utf8"));
  const slugOf = new Map();
  for (const gb of guideBooks) {
    const match = books.find((b) => b.name.toLowerCase() === gb.book.toLowerCase() || b.slug === gb.book.toLowerCase().replace(/\s+/g, "-"));
    if (match) slugOf.set(gb.book.toLowerCase(), match.slug);
  }
  const passages = [];
  for (const key of Object.keys(guides)) {
    const m = key.match(/^(.*) (\d+)$/);
    const slug = m && slugOf.get(m[1]);
    if (slug) passages.push(`${slug}/${m[2]}`);
  }
  passages.sort();
  return { titles, taglines, doctrines: byDoctrine, passages };
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const next = JSON.stringify(buildIndex()) + "\n";
  if (process.argv.includes("--check")) {
    const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
    if (cur !== next) {
      console.error("✗ client/public/bible/notes-index.json is stale: run node scripts/build-bible-notes-index.mjs");
      process.exit(1);
    }
    console.log("✓ notes index is current");
  } else {
    fs.writeFileSync(OUT, next);
    const idx = JSON.parse(next);
    const n = Object.values(idx.titles).flat().filter(Boolean).length;
    console.log(`✓ notes index: ${n} chapter titles, ${Object.keys(idx.taglines).length} taglines, ${idx.passages.length} passage guides`);
  }
}
