/**
 * bible-search.mjs: the files the Bible word search reads.
 *
 * The search ("born again" finds John 3:3) scans the Berean Standard Bible's
 * words in the reader's browser. Opening 1,189 chapter files for one search
 * would be far too many requests, so the text is also kept in a few larger
 * files, one for each stretch of the canon, under client/public/bible/search/:
 *
 *   index.json   { "shards": [{ "file": "0.json", "books": ["genesis", ...] }, ...] }
 *   <n>.json     { "books": [{ "slug": "genesis", "chapters": [["In the beginning ...", ...], ...] }] }
 *
 * A chapter is a list of its verses' text in order; verse n is at place n - 1
 * (a verse the critical text omits keeps an empty string). The files are
 * generated from the chapter files (client/public/bible/ch), never edited by
 * hand: scripts/build-bible-search.mjs writes them, and its --check (in CI)
 * fails when regenerating them would change anything.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const BIBLE_DIR = path.join(ROOT, "client/public/bible");
export const OUT_DIR = path.join(BIBLE_DIR, "search");

/** Where each file begins, by a book's place in books.json: the Law, the history, and so on. */
const STARTS = [0, 5, 12, 17, 22, 26, 39, 44];

/** Every file the chapter files call for: name -> its contents. */
export function expectedFiles(bibleDir = BIBLE_DIR) {
  const books = JSON.parse(fs.readFileSync(path.join(bibleDir, "books.json"), "utf8"));
  const out = new Map();
  const shards = [];
  STARTS.forEach((from, i) => {
    const group = books.slice(from, STARTS[i + 1] ?? books.length);
    if (!group.length) return;
    const file = `${i}.json`;
    const data = group.map((b) => {
      const chapters = [];
      for (let c = 1; c <= b.chapters; c++) {
        const ch = JSON.parse(fs.readFileSync(path.join(bibleDir, "ch", b.slug, `${c}.json`), "utf8"));
        const verses = [];
        for (const v of ch.verses) {
          if (!Number.isInteger(v.v) || v.v < 1 || verses[v.v - 1] !== undefined) throw new Error(`${b.slug} ${c}: verse ${v.v} is out of order or repeated`);
          verses[v.v - 1] = String(v.t ?? "");
        }
        // A gap in the numbering stays an empty verse, so place n - 1 is always verse n.
        for (let k = 0; k < verses.length; k++) if (verses[k] === undefined) verses[k] = "";
        chapters.push(verses);
      }
      return { slug: b.slug, chapters };
    });
    out.set(file, `${JSON.stringify({ books: data })}\n`);
    shards.push({ file, books: group.map((b) => b.slug) });
  });
  out.set("index.json", `${JSON.stringify({ shards })}\n`);
  return out;
}

const current = (outDir) => {
  const out = new Map();
  if (fs.existsSync(outDir)) for (const f of fs.readdirSync(outDir)) if (f.endsWith(".json")) out.set(f, fs.readFileSync(path.join(outDir, f), "utf8"));
  return out;
};

/** What regenerating would change: files that differ, are missing, or have nothing behind them. */
export function searchDrift({ bibleDir = BIBLE_DIR, outDir = OUT_DIR } = {}) {
  const want = expectedFiles(bibleDir);
  const have = current(outDir);
  const stale = [];
  const missing = [];
  for (const [f, text] of want) {
    if (!have.has(f)) missing.push(f);
    else if (have.get(f) !== text) stale.push(f);
  }
  return { count: want.size, stale, missing, extra: [...have.keys()].filter((f) => !want.has(f)) };
}

/** Write every file and remove any with nothing behind it. */
export function writeSearchFiles({ bibleDir = BIBLE_DIR, outDir = OUT_DIR } = {}) {
  const want = expectedFiles(bibleDir);
  const have = current(outDir);
  fs.mkdirSync(outDir, { recursive: true });
  let written = 0;
  for (const [f, text] of want) {
    if (have.get(f) === text) continue;
    fs.writeFileSync(path.join(outDir, f), text);
    written++;
  }
  const removed = [...have.keys()].filter((f) => !want.has(f));
  for (const f of removed) fs.rmSync(path.join(outDir, f));
  return { count: want.size, written, removed: removed.length };
}
