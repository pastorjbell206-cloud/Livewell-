#!/usr/bin/env node
/**
 * validate-worlds.mjs: the world portraits hold their shape.
 *
 * A world portrait (client/public/context/worlds/<id>.json, the page at
 * /resources/context/world/:id) is a long, sourced picture of one of the
 * worlds the Bible was written in, filed under one group of the Bible
 * background guides. This checks every portrait:
 *
 * - the fields the page reads, a group the guides already use, a plate from
 *   the art kit and an icon the page knows;
 * - parts of real length, each with Bible passages it opens;
 * - every passage quoted word for word from the Berean Standard Bible (the
 *   Study Bible's text) and linked to its chapter and first verse;
 * - the voice rules: no em-dash or en-dash, no exclamation mark outside the
 *   quoted Scripture, none of the forbidden words of CLAUDE.md;
 * - ancient sources and modern books, each book with an author and a year.
 *
 *   node scripts/validate-worlds.mjs      CI gate
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIR = join(ROOT, "client/public/context/worlds");
const errors = [];
const fail = (w, m) => errors.push(`${w}: ${m}`);

/** The icons ContextWorld.tsx maps. */
export const ICONS = ["map", "sun", "landmark", "scroll", "users", "sparkles", "home", "flame", "compass", "book"];
const PLATES = [...readFileSync(join(ROOT, "client/src/components/art/Plate.tsx"), "utf8").matchAll(/"([a-z]+)"/g)].map((m) => m[1]);
const GROUPS = new Set(JSON.parse(readFileSync(join(ROOT, "client/public/context/guides-index.json"), "utf8")).guides.map((g) => g.group));
const FORBIDDEN = /\b(delve|leverage|unlock|transformative|navigate|tapestry|foster|unpack|landscape|nuanced|multifaceted|authentic|journey|holistic|in today's world|now more than ever|here's the thing|hold space|your truth|lean into|showing up)\b/i;
/** A book's name as a reference spells it ("1 Kings") and its folder in the Study Bible's text ("1-kings"). */
const BOOKS = new Set(readdirSync(join(ROOT, "client/public/bible/text")));

function verses(book, ch, a, b) {
  const f = join(ROOT, "client/public/bible/text", book, `${ch}.json`);
  if (!existsSync(f)) return null;
  const d = JSON.parse(readFileSync(f, "utf8"));
  const got = d.verses.filter((v) => v.v >= a && v.v <= b);
  return got.length === b - a + 1 ? got.map((v) => v.t).join(" ") : null;
}

function prose(where, text) {
  if (typeof text !== "string" || !text.trim()) return fail(where, "is empty");
  if (/[—–]/.test(text)) fail(where, "has an em-dash or en-dash");
  // A quotation keeps its own punctuation (Mark 13:1 in the BSB ends with one).
  if (text.replace(/"[^"]*"|\u201c[^\u201d]*\u201d/g, "").includes("!")) fail(where, "has an exclamation mark outside a quotation");
  const m = text.match(FORBIDDEN);
  if (m) fail(where, `uses the forbidden word "${m[0]}"`);
}

const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
for (const f of files) {
  const w = `worlds/${f}`;
  let d;
  try { d = JSON.parse(readFileSync(join(DIR, f), "utf8")); } catch (e) { fail(w, `does not parse (${e.message})`); continue; }
  if (d.id !== f.replace(/\.json$/, "")) fail(w, "id does not match the file name");
  for (const k of ["title", "seoTitle", "description", "line"]) prose(`${w} ${k}`, d[k]);
  if (!GROUPS.has(d.group)) fail(w, `group "${d.group}" is not a group of the guides`);
  if (!PLATES.includes(d.plate)) fail(w, `plate "${d.plate}" is not in the art kit`);
  if (!Array.isArray(d.intro) || d.intro.length === 0) fail(w, "needs an intro");
  else d.intro.forEach((p, i) => prose(`${w} intro[${i}]`, p));
  if (!Array.isArray(d.parts) || d.parts.length < 3) { fail(w, "needs at least three parts"); continue; }
  const ids = new Set();
  let words = d.intro?.join(" ").split(/\s+/).length ?? 0;
  d.parts.forEach((p, i) => {
    const pw = `${w} part ${i + 1} (${p.id})`;
    if (!/^[a-z0-9-]+$/.test(p.id ?? "") || ids.has(p.id)) fail(pw, "needs a unique id of lowercase words and hyphens");
    ids.add(p.id);
    prose(`${pw} title`, p.title);
    prose(`${pw} line`, p.line);
    if (!ICONS.includes(p.icon)) fail(pw, `icon "${p.icon}" is not one ContextWorld.tsx knows`);
    if (!Array.isArray(p.body) || p.body.length < 3) fail(pw, "needs at least three paragraphs");
    else p.body.forEach((para, j) => { prose(`${pw} paragraph ${j + 1}`, para); words += para.split(/\s+/).length; });
    if (!Array.isArray(p.read) || p.read.length < 2 || p.read.length > 3) fail(pw, "needs two or three passages it opens");
    else p.read.forEach((r, j) => {
      const rw = `${pw} passage ${j + 1}`;
      prose(`${rw} note`, r.note);
      const m = String(r.ref).match(/^((?:[1-3] )?[A-Z][a-z]+(?: of [A-Z][a-z]+)?) (\d+):(\d+)(?:-(\d+))?$/);
      const book = m ? m[1].toLowerCase().replace(/ /g, "-") : "";
      if (!m || !BOOKS.has(book)) return fail(rw, `reference "${r.ref}" is not "Book chapter:verse" in the Study Bible`);
      const [ch, a, b] = [Number(m[2]), Number(m[3]), Number(m[4] ?? m[3])];
      if (r.href !== `/study/bible/${book}/${ch}#v${a}`) fail(rw, `link should be /study/bible/${book}/${ch}#v${a}`);
      const want = verses(book, ch, a, b);
      if (want === null) fail(rw, `${r.ref} is not in the Study Bible's text`);
      else if (r.text !== want) fail(rw, `the text of ${r.ref} is not word for word the Berean Standard Bible`);
    });
  });
  if (words < 4000) fail(w, `has ${words} words in its intro and parts; a portrait needs at least 4,000`);
  const s = d.sources ?? {};
  if (!Array.isArray(s.ancient) || s.ancient.length === 0) fail(w, "needs ancient sources");
  else s.ancient.forEach((a, i) => { if (!a.name) fail(w, `ancient source ${i + 1} needs a name`); if (a.note) prose(`${w} ancient source ${i + 1}`, a.note); });
  if (!Array.isArray(s.modern) || s.modern.length === 0) fail(w, "needs modern books");
  else s.modern.forEach((b, i) => { if (!b.author || !b.title || !Number.isInteger(b.year)) fail(w, `modern source ${i + 1} needs an author, a title and a year`); });
}

if (errors.length) {
  console.error(`validate-worlds: ${errors.length} problem(s)\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`validate-worlds: ${files.length} world portrait(s) hold their shape`);
