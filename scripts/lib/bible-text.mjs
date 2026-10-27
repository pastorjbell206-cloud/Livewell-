/**
 * bible-text.mjs: the text-only chapter shards the verse sheet reads.
 *
 * A Study Bible chapter file (client/public/bible/ch/<book>/<n>.json) carries
 * every verse's original-language words and cross-references; John 3 is about
 * 42 KB. A verse sheet needs only the verse numbers and the English text, so
 * each chapter gets a shard at client/public/bible/text/<book>/<n>.json:
 *
 *   { "book": "Jhn", "chapter": 3, "verses": [{ "v": 1, "t": "Now there was ..." }, ...] }
 *
 * A verse the critical text omits keeps its empty text and `"later": true`,
 * as in the chapter file. The shards are generated, never edited by hand:
 * scripts/build-bible-text.mjs writes them, and its --check (in CI) fails when
 * regenerating them would change anything.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const SRC_DIR = path.join(ROOT, "client/public/bible/ch");
export const OUT_DIR = path.join(ROOT, "client/public/bible/text");

/** One chapter file's text-only shard, as the file is written. */
export function renderShard(chapter) {
  const verses = chapter.verses.map((v) => (v.later ? { v: v.v, t: v.t, later: true } : { v: v.v, t: v.t }));
  return `${JSON.stringify({ book: chapter.book, chapter: chapter.chapter, verses })}\n`;
}

const jsonFiles = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")) : []);
const dirs = (dir) =>
  fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : [];

/** Every shard the chapter files call for: "<book>/<n>.json" -> its contents. */
export function expectedShards(srcDir = SRC_DIR) {
  const out = new Map();
  for (const book of dirs(srcDir).sort()) {
    for (const f of jsonFiles(path.join(srcDir, book))) {
      const chapter = JSON.parse(fs.readFileSync(path.join(srcDir, book, f), "utf8"));
      out.set(`${book}/${f}`, renderShard(chapter));
    }
  }
  return out;
}

/** The shards on disk now: "<book>/<n>.json" -> its contents. */
function currentShards(outDir) {
  const out = new Map();
  for (const book of dirs(outDir)) {
    for (const f of jsonFiles(path.join(outDir, book))) out.set(`${book}/${f}`, fs.readFileSync(path.join(outDir, book, f), "utf8"));
  }
  return out;
}

/** What regenerating would change: shards that differ, are missing, or have no chapter behind them. */
export function shardDrift({ srcDir = SRC_DIR, outDir = OUT_DIR } = {}) {
  const want = expectedShards(srcDir);
  const have = currentShards(outDir);
  const stale = [];
  const missing = [];
  for (const [rel, text] of want) {
    if (!have.has(rel)) missing.push(rel);
    else if (have.get(rel) !== text) stale.push(rel);
  }
  const extra = [...have.keys()].filter((rel) => !want.has(rel));
  return { count: want.size, stale, missing, extra };
}

/** Write every shard and remove any without a chapter behind it. */
export function writeShards({ srcDir = SRC_DIR, outDir = OUT_DIR } = {}) {
  const want = expectedShards(srcDir);
  const have = currentShards(outDir);
  let written = 0;
  for (const [rel, text] of want) {
    if (have.get(rel) === text) continue;
    fs.mkdirSync(path.join(outDir, path.dirname(rel)), { recursive: true });
    fs.writeFileSync(path.join(outDir, rel), text);
    written++;
  }
  const removed = [...have.keys()].filter((rel) => !want.has(rel));
  for (const rel of removed) fs.rmSync(path.join(outDir, rel));
  return { count: want.size, written, removed: removed.length };
}
