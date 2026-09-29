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
 * It also writes client/public/bible/doctrine-verses/<id>.json: every verse
 * note that teaches a doctrine, in Bible order, for the doctrine pages.
 *
 *   node scripts/build-bible-notes-index.mjs          write the index
 *   node scripts/build-bible-notes-index.mjs --check  exit 1 if it would change
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("client/public/bible");
const OUT = path.join(DIR, "notes-index.json");
const DV = path.join(DIR, "doctrine-verses");

/** Doctrine id → every verse note teaching it: { k: "john/3", v: "16", note }. */
export function buildDoctrineVerses() {
  const books = JSON.parse(fs.readFileSync(path.join(DIR, "books.json"), "utf8"));
  const doctrines = JSON.parse(fs.readFileSync(path.join(DIR, "doctrines.json"), "utf8")).doctrines;
  const out = Object.fromEntries(doctrines.map((d) => [d.id, []]));
  for (const b of books)
    for (let c = 1; c <= b.chapters; c++) {
      const p = path.join(DIR, "notes", b.slug, "verses", `${c}.json`);
      if (!fs.existsSync(p)) continue;
      for (const e of JSON.parse(fs.readFileSync(p, "utf8")).verses ?? [])
        for (const t of e.theology ?? []) out[t.id]?.push({ k: `${b.slug}/${c}`, v: e.v, note: t.note });
    }
  return out;
}

export function buildIndex() {
  const books = JSON.parse(fs.readFileSync(path.join(DIR, "books.json"), "utf8"));
  const doctrines = JSON.parse(fs.readFileSync(path.join(DIR, "doctrines.json"), "utf8")).doctrines;
  const titles = {};
  const taglines = {};
  const byDoctrine = Object.fromEntries(doctrines.map((d) => [d.id, []]));
  const withVerses = [];
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
      if (fs.existsSync(path.join(dir, "verses", `${c}.json`))) withVerses.push(`${b.slug}/${c}`);
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
  const doctrineVerses = Object.fromEntries(Object.entries(buildDoctrineVerses()).map(([id, list]) => [id, list.length]));
  return { titles, taglines, doctrines: byDoctrine, doctrineVerses, withVerses, passages };
}

/** The files the build writes, path → contents. */
export function buildFiles() {
  const files = new Map([[OUT, JSON.stringify(buildIndex()) + "\n"]]);
  for (const [id, verses] of Object.entries(buildDoctrineVerses())) files.set(path.join(DV, `${id}.json`), JSON.stringify({ id, verses }) + "\n");
  return files;
}

/** Paths whose contents differ from what the build would write. */
export function staleFiles() {
  const stale = [];
  for (const [p, body] of buildFiles()) if (!fs.existsSync(p) || fs.readFileSync(p, "utf8") !== body) stale.push(path.relative(process.cwd(), p));
  return stale;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  if (process.argv.includes("--check")) {
    const stale = staleFiles();
    if (stale.length) {
      console.error(`✗ stale: ${stale.slice(0, 5).join(", ")}${stale.length > 5 ? ` and ${stale.length - 5} more` : ""}: run node scripts/build-bible-notes-index.mjs`);
      process.exit(1);
    }
    console.log("✓ notes index is current");
  } else {
    fs.mkdirSync(DV, { recursive: true });
    const files = buildFiles();
    for (const [p, body] of files) fs.writeFileSync(p, body);
    const idx = JSON.parse(files.get(OUT));
    const n = Object.values(idx.titles).flat().filter(Boolean).length;
    console.log(`✓ notes index: ${n} chapter titles, ${Object.keys(idx.taglines).length} taglines, ${idx.passages.length} passage guides, ${idx.withVerses.length} chapters with verse notes, ${Object.values(idx.doctrineVerses).reduce((a, n) => a + n, 0)} verse-level doctrine notes`);
  }
}
