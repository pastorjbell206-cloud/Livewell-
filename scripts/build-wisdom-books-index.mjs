#!/usr/bin/env node
/**
 * build-wisdom-books-index.mjs: the Wisdom Books Explorer's files
 * (/tools/wisdom-books), built from one hand-written source,
 * client/public/wisdom-books/proverbs.json (each verse of Proverbs tagged
 * with its themes), the Berean Standard Bible in client/public/bible/ch/
 * (the verse text, never typed by hand), and the Study Bible's own notes on
 * Proverbs in client/public/bible/notes/proverbs/ (chapter titles, summaries
 * and outlines, the introduction's themes, its counsel on how to read a
 * proverb, and the hard question on 26:4-5), all copied word for word.
 *
 * Writes, under client/public/wisdom-books/proverbs/:
 *   index.json          the themes (with counts and the notes they draw on),
 *                       the 31 chapters (title, summary, verse count), and
 *                       the teaching panel
 *   chapter/<n>.json    one chapter: its verses with their themes, its outline
 *   theme/<id>.json     one theme: every verse on it, in book order
 *
 *   node scripts/build-wisdom-books-index.mjs           write the files
 *   node scripts/build-wisdom-books-index.mjs --check   fail if any differ (CI)
 *
 * scripts/validate-wisdom-books.mjs checks the source and the result.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { passage } from "./lib/bsb.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "client/public/wisdom-books/proverbs.json");
const OUT = path.join(ROOT, "client/public/wisdom-books/proverbs");
const NOTES = path.join(ROOT, "client/public/bible/notes/proverbs");
const TOPICS = path.join(ROOT, "client/public/wisdom/topics.json");
const CHECK = process.argv.includes("--check");
const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

/** "4" or "4-9" to the verse numbers it covers. */
export function rangeOf(r) {
  const m = /^(\d+)(?:-(\d+))?$/.exec(r);
  if (!m) throw new Error(`bad verse range "${r}"`);
  const a = Number(m[1]);
  const b = m[2] ? Number(m[2]) : a;
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}

export function build() {
  const src = readJson(SRC);
  const intro = readJson(path.join(NOTES, "intro.json"));
  const topics = new Map(readJson(TOPICS).topics.map((t) => [t.id, t]));
  const themeIds = src.themes.map((t) => t.id);

  // Every verse's themes, from the tag ranges.
  const tagsOf = new Map();
  for (const [c, rows] of Object.entries(src.tags)) {
    for (const [r, names] of rows) {
      for (const v of rangeOf(r)) {
        const key = `${c}:${v}`;
        const set = tagsOf.get(key) ?? new Set();
        for (const n of names.split(/\s+/)) set.add(n);
        tagsOf.set(key, set);
      }
    }
  }
  const ordered = (set) => [...(set.has("heading") ? ["heading"] : []), ...themeIds.filter((id) => set.has(id))];

  const files = new Map();
  const chapters = [];
  const byTheme = new Map(themeIds.map((id) => [id, []]));
  for (let c = 1; c <= 31; c++) {
    const note = readJson(path.join(NOTES, `${c}.json`));
    const verses = passage(`Proverbs ${c}`).verses.map(({ v, t }) => {
      const themes = ordered(tagsOf.get(`${c}:${v}`) ?? new Set());
      for (const id of themes) if (byTheme.has(id)) byTheme.get(id).push({ c, v, t });
      return { v, t, themes };
    });
    chapters.push({ n: c, title: note.title, summary: note.summary, verses: verses.length });
    files.set(`chapter/${c}.json`, { n: c, title: note.title, summary: note.summary, outline: note.outline ?? [], verses });
  }

  const themes = src.themes.map((t) => {
    const noteTheme = t.noteTheme ? intro.themes.find((x) => x.title === t.noteTheme) : null;
    if (t.noteTheme && !noteTheme) throw new Error(`theme ${t.id}: no "${t.noteTheme}" in the introduction's themes`);
    const verses = byTheme.get(t.id);
    files.set(`theme/${t.id}.json`, { id: t.id, name: t.name, verses });
    return {
      id: t.id,
      name: t.name,
      line: t.line,
      count: verses.length,
      ...(noteTheme ? { note: { title: noteTheme.title, body: noteTheme.body } } : {}),
      deeper: t.deeper.map((id) => {
        const topic = topics.get(id);
        if (!topic) throw new Error(`theme ${t.id}: no wisdom topic "${id}"`);
        return { id, label: topic.title ?? topic.label ?? topic.name ?? id };
      }),
    };
  });

  const hard = readJson(path.join(NOTES, "26.json")).hard;
  files.set("index.json", {
    book: "Proverbs",
    verses: chapters.reduce((n, c) => n + c.verses, 0),
    themes,
    chapters,
    teaching: {
      reading: intro.reading.split(/\n\n+/),
      pair: { refs: "Proverbs 26:4-5", verses: passage("Proverbs 26:4-5").verses, q: hard.q, a: hard.a.split(/\n\n+/) },
    },
  });
  return files;
}

function main() {
  const files = build();
  const stale = [];
  for (const [rel, data] of files) {
    const f = path.join(OUT, rel);
    const text = JSON.stringify(data) + "\n";
    const now = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
    if (now === text) continue;
    if (CHECK) stale.push(rel);
    else {
      fs.mkdirSync(path.dirname(f), { recursive: true });
      fs.writeFileSync(f, text);
    }
  }
  // Nothing left over from an earlier build.
  for (const dir of ["chapter", "theme"]) {
    const d = path.join(OUT, dir);
    if (!fs.existsSync(d)) continue;
    for (const name of fs.readdirSync(d)) {
      if (files.has(`${dir}/${name}`)) continue;
      if (CHECK) stale.push(`${dir}/${name} (left over)`);
      else fs.rmSync(path.join(d, name));
    }
  }
  if (CHECK) {
    if (stale.length) {
      console.error(`build-wisdom-books-index: ${stale.length} file(s) out of date; run node scripts/build-wisdom-books-index.mjs\n  ${stale.slice(0, 10).join("\n  ")}`);
      process.exit(1);
    }
    console.log(`build-wisdom-books-index: ${files.size} files up to date`);
  } else console.log(`build-wisdom-books-index: wrote ${files.size} files to client/public/wisdom-books/proverbs/`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
