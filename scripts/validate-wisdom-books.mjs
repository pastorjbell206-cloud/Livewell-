#!/usr/bin/env node
/**
 * validate-wisdom-books.mjs: the gate on the Wisdom Books Explorer
 * (/tools/wisdom-books). Run after scripts/build-wisdom-books-index.mjs.
 *
 * The source (client/public/wisdom-books/proverbs.json):
 * - every one of Proverbs' 915 verses carries at least one theme (or the
 *   "heading" mark), every tag names a real theme, every range is a real
 *   stretch of its chapter, and no theme is left with fewer than ten verses;
 * - every "go deeper" topic is a real wisdom topic, and every noteTheme is a
 *   theme of the Study Bible's introduction to Proverbs;
 * - the prose (names and lines): none of CLAUDE.md's forbidden words, no
 *   em-dash, no "--", no emoji, no "!", no quotation marks.
 *
 * The built files (client/public/wisdom-books/proverbs/):
 * - every verse is the BSB word for word (client/public/bible/ch/);
 * - every chapter title, summary and outline, every introduction theme, the
 *   reading counsel and the hard question on 26:4-5 are the Study Bible's
 *   notes word for word;
 * - each theme file holds exactly the verses tagged with it, in book order.
 *
 *   node scripts/validate-wisdom-books.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { passage } from "./lib/bsb.mjs";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { rangeOf } from "./build-wisdom-books-index.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "client/public/wisdom-books/proverbs.json");
const OUT = path.join(ROOT, "client/public/wisdom-books/proverbs");
const NOTES = path.join(ROOT, "client/public/bible/notes/proverbs");
const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const EMOJI = /\p{Extended_Pictographic}/u;

const src = readJson(SRC);
const intro = readJson(path.join(NOTES, "intro.json"));
const topicIds = new Set(readJson(path.join(ROOT, "client/public/wisdom/topics.json")).topics.map((t) => t.id));
const themeIds = new Set(src.themes.map((t) => t.id));

function prose(where, text) {
  if (typeof text !== "string" || !text.trim()) return fail(where, "empty");
  if (/—/.test(text)) fail(where, "em-dash");
  if (/--/.test(text)) fail(where, "a double hyphen used as a dash");
  if (EMOJI.test(text)) fail(where, "emoji");
  if (text.includes("!")) fail(where, `"!" (kept for quoted Scripture)`);
  if (/["“”]/.test(text)) fail(where, "a quotation (themes describe; they do not quote)");
  for (const m of setAsideAllowed(text).matchAll(forbiddenRe)) fail(where, `forbidden word "${m[1]}"`);
}

// Themes.
const seen = new Set();
for (const t of src.themes) {
  const at = `theme ${t.id}`;
  if (!/^[a-z]+$/.test(t.id)) fail(at, "id must be lower-case letters");
  if (seen.has(t.id)) fail(at, "duplicate id");
  seen.add(t.id);
  prose(`${at} name`, t.name);
  prose(`${at} line`, t.line);
  if (t.noteTheme && !intro.themes.some((x) => x.title === t.noteTheme)) fail(at, `noteTheme "${t.noteTheme}" is not a theme in notes/proverbs/intro.json`);
  if (!Array.isArray(t.deeper) || t.deeper.length === 0) fail(at, "needs at least one wisdom topic to go deeper");
  for (const id of t.deeper ?? []) if (!topicIds.has(id)) fail(at, `"${id}" is not a wisdom topic`);
}

// Tags: every verse once at least, every range real, every name known.
const tagged = new Map();
for (const [c, rows] of Object.entries(src.tags)) {
  const n = Number(c);
  let size;
  try {
    size = passage(`Proverbs ${n}`).verses.length;
  } catch {
    fail(`tags ${c}`, "not a chapter of Proverbs");
    continue;
  }
  for (const [r, names] of rows) {
    let vs;
    try {
      vs = rangeOf(r);
    } catch {
      fail(`tags ${c}:${r}`, "not a verse range");
      continue;
    }
    if (vs[0] < 1 || vs[vs.length - 1] > size) fail(`tags ${c}:${r}`, `outside chapter ${c} (1-${size})`);
    for (const name of names.split(/\s+/)) if (name !== "heading" && !themeIds.has(name)) fail(`tags ${c}:${r}`, `unknown theme "${name}"`);
    for (const v of vs) {
      const set = tagged.get(`${c}:${v}`) ?? new Set();
      for (const name of names.split(/\s+/)) set.add(name);
      tagged.set(`${c}:${v}`, set);
    }
  }
}
let total = 0;
const counts = new Map([...themeIds].map((id) => [id, 0]));
for (let c = 1; c <= 31; c++) {
  for (const { v } of passage(`Proverbs ${c}`).verses) {
    total++;
    const set = tagged.get(`${c}:${v}`);
    if (!set || set.size === 0) fail(`Proverbs ${c}:${v}`, "has no theme");
    else for (const id of set) if (counts.has(id)) counts.set(id, counts.get(id) + 1);
  }
}
if (total !== 915) fail("Proverbs", `expected 915 verses in the BSB, found ${total}`);
for (const [id, n] of counts) if (n < 10) fail(`theme ${id}`, `only ${n} verses (at least ten)`);

// Built files: verses and notes word for word.
const index = readJson(path.join(OUT, "index.json"));
for (let c = 1; c <= 31; c++) {
  const ch = readJson(path.join(OUT, `chapter/${c}.json`));
  const note = readJson(path.join(NOTES, `${c}.json`));
  const bsb = passage(`Proverbs ${c}`).verses;
  if (ch.verses.length !== bsb.length) fail(`chapter/${c}`, "verse count differs from the BSB");
  ch.verses.forEach((v, i) => {
    if (!bsb[i] || v.v !== bsb[i].v || v.t !== bsb[i].t) fail(`chapter/${c}:${v.v}`, "not the BSB word for word");
    const want = [...(tagged.get(`${c}:${v.v}`) ?? [])].sort().join(" ");
    if ([...v.themes].sort().join(" ") !== want) fail(`chapter/${c}:${v.v}`, "themes differ from the source");
  });
  if (ch.title !== note.title || ch.summary !== note.summary) fail(`chapter/${c}`, "title or summary is not the Study Bible note's");
  if (JSON.stringify(ch.outline) !== JSON.stringify(note.outline ?? [])) fail(`chapter/${c}`, "outline is not the Study Bible note's");
}
for (const t of index.themes) {
  const file = readJson(path.join(OUT, `theme/${t.id}.json`));
  const want = [];
  for (let c = 1; c <= 31; c++) for (const v of passage(`Proverbs ${c}`).verses) if (tagged.get(`${c}:${v.v}`)?.has(t.id)) want.push(v);
  if (file.verses.length !== want.length || t.count !== want.length) fail(`theme/${t.id}`, "does not hold exactly the verses tagged with it");
  file.verses.forEach((v, i) => {
    const w = want[i];
    if (!w || v.c !== w.c || v.v !== w.v || v.t !== w.t) fail(`theme/${t.id} ${v.c}:${v.v}`, "not the BSB word for word, or out of order");
  });
  if (t.note) {
    const n = intro.themes.find((x) => x.title === t.note.title);
    if (!n || n.body !== t.note.body) fail(`theme/${t.id}`, "introduction theme is not the Study Bible note's word for word");
  }
}
if (index.teaching.reading.join("\n\n") !== intro.reading) fail("index.json", "the reading counsel is not the introduction's word for word");
const hard = readJson(path.join(NOTES, "26.json")).hard;
if (index.teaching.pair.q !== hard.q || index.teaching.pair.a.join("\n\n") !== hard.a) fail("index.json", "the 26:4-5 question is not the note's word for word");

if (errors.length) {
  console.error(`validate-wisdom-books: ${errors.length} problem(s)\n  ${errors.slice(0, 40).join("\n  ")}`);
  process.exit(1);
}
console.log(`validate-wisdom-books: ${total} verses of Proverbs, each themed; ${src.themes.length} themes; text and notes word for word`);
