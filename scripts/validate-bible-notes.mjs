#!/usr/bin/env node
/**
 * validate-bible-notes.mjs — the Study Bible's authored layer holds its shape.
 *
 *   node scripts/validate-bible-notes.mjs            every book, every chapter required
 *   node scripts/validate-bible-notes.mjs genesis    only the named books, only files present
 *
 * Checks each book introduction and chapter note in client/public/bible/notes/
 * against docs/BIBLE-NOTES-SPEC.md: required fields and lengths, an outline
 * that covers the chapter's verses in order, doctrine ids from the vocabulary,
 * key words whose Strong's numbers occur in the chapter, the forbidden
 * language, no exclamation point or em-dash outside quoted Scripture, and every quotation
 * found verbatim in the Berean Standard Bible. It also checks that the story
 * path walks every chapter of the Bible exactly once.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("client/public/bible");
const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const partial = only.length > 0;
const errors = [];
const fail = (where, m) => errors.push(`${where}: ${m}`);
const json = (p) => JSON.parse(fs.readFileSync(path.join(DIR, p), "utf8"));

const books = json("books.json");
const doctrineIds = new Set(json("doctrines.json").doctrines.map((d) => d.id));

// Every BSB verse, normalized, so a quotation can be checked against the text itself.
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[‘’“”"']/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
let bible = "";
const chapterData = new Map();
for (const b of books)
  for (let c = 1; c <= b.chapters; c++) {
    const d = json(`ch/${b.slug}/${c}.json`);
    chapterData.set(`${b.slug}/${c}`, d);
    bible += " " + d.verses.map((v) => norm(v.t)).join(" ");
  }

const FORBIDDEN = [
  "delve", "delves", "delving", "leverage", "leverages", "unlock", "unlocks", "unlocking", "transformative",
  "navigate", "navigates", "navigating", "tapestry", "foster", "fosters", "fostering", "unpack", "unpacks",
  "unpacking", "landscape", "nuanced", "multifaceted", "authentic", "holistic", "journey", "journeys",
  "in today's world", "now more than ever", "here's the thing", "i want to be real with you", "god's got this",
  "gospel-centered", "hold space", "your truth", "do the work", "your feelings are valid", "lean into", "showing up",
];
const forbiddenRe = new RegExp(`\\b(${FORBIDDEN.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "i");

/** Prose checks shared by every text field. */
function prose(where, text, min, max = 4000) {
  if (typeof text !== "string" || text.trim().length < min) return fail(where, `needs at least ${min} characters (has ${text?.length ?? 0})`);
  if (text.length > max) fail(where, `over ${max} characters`);
  if (/^\s*[-*•]\s/m.test(text)) fail(where, "bullet list in prose");
  const quotes = [...text.matchAll(/[“"]([^”"]+)[”"]/g)].map((q) => q[1]);
  const outside = text.replace(/[“"][^”"]+[”"]/g, "");
  // The forbidden list governs our prose, not Scripture: a verbatim BSB
  // quotation may say "your truth" (Psalm 86:11). Quotes too short to verify
  // (under three words) are held to the list like prose.
  const unverified = quotes.filter((q) => norm(q).split(" ").length < 3).join(" ");
  const m = `${outside} ${unverified}`.match(forbiddenRe);
  if (m) fail(where, `forbidden word "${m[1]}"`);
  if (outside.includes("!")) fail(where, "exclamation point outside quoted Scripture");
  for (const q of quotes) {
    const n = norm(q);
    if (n.split(" ").length >= 3 && !bible.includes(n)) fail(where, `quotation not found verbatim in the BSB: "${q.slice(0, 80)}"`);
  }
  // The site keeps its reader-facing prose free of em-dashes (see
  // scripts/validate-no-emdash.mjs); only quoted Scripture may carry one.
  if (outside.includes("\u2014")) fail(where, "em-dash outside quoted Scripture (use a comma, colon, parentheses, or a new sentence)");
  return 0;
}

function checkIntro(b, where) {
  const d = json(`notes/${b.slug}/intro.json`);
  let dashes = 0;
  const field = (k, min, max) => (dashes += prose(`${where}.${k}`, d[k], min, max) ?? 0);
  if (typeof d.tagline !== "string" || d.tagline.length < 40 || d.tagline.length > 220) fail(where, "tagline must be 40 to 220 characters");
  else prose(`${where}.tagline`, d.tagline, 40, 220);
  field("overview", 600, 3000);
  field("author", 250, 2500);
  field("date", 200, 2500);
  field("setting", 300, 2500);
  field("purpose", 250, 2000);
  field("story", 250, 2000);
  field("christ", 250, 2000);
  field("reading", 200, 2000);
  if (!Array.isArray(d.structure) || d.structure.length < 2) fail(where, "structure needs at least two sections");
  else for (const [i, s] of d.structure.entries()) {
    if (!/^\d+(?::\d+)?(?:-\d+(?::\d+)?)?$/.test(s.range ?? "")) fail(`${where}.structure[${i}]`, `bad range "${s.range}"`);
    if (!s.title) fail(`${where}.structure[${i}]`, "missing title");
    prose(`${where}.structure[${i}].summary`, s.summary, 60, 800);
  }
  if (!Array.isArray(d.themes) || d.themes.length < 3) fail(where, "at least three themes");
  else for (const [i, t] of d.themes.entries()) {
    if (!t.title) fail(`${where}.themes[${i}]`, "missing title");
    prose(`${where}.themes[${i}].body`, t.body, 120, 1200);
  }
  if (!Array.isArray(d.doctrines) || d.doctrines.length < 2) fail(where, "at least two doctrines");
  else for (const id of d.doctrines) if (!doctrineIds.has(id)) fail(where, `unknown doctrine "${id}"`);
  if (!Array.isArray(d.keyChapters) || d.keyChapters.length < 1) fail(where, "at least one key chapter");
  else for (const k of d.keyChapters) {
    if (!(k.ch >= 1 && k.ch <= b.chapters)) fail(where, `key chapter ${k.ch} out of range`);
    prose(`${where}.keyChapters[${k.ch}]`, k.why, 40, 400);
  }
}

function checkChapter(b, c, where) {
  const d = json(`notes/${b.slug}/${c}.json`);
  const data = chapterData.get(`${b.slug}/${c}`);
  const last = data.verses[data.verses.length - 1].v;
  let dashes = 0;
  const field = (k, min, max) => (dashes += prose(`${where}.${k}`, d[k], min, max) ?? 0);
  if (typeof d.title !== "string" || d.title.length < 3 || d.title.length > 70) fail(where, "title must be 3 to 70 characters");
  field("summary", 120, 700);
  field("story", 250, 1800);
  field("historical", 300, 2600);
  field("cultural", 250, 2600);
  field("literary", 180, 1800);
  field("christ", 180, 1800);
  if (d.hard != null) {
    if (typeof d.hard.q !== "string" || d.hard.q.length < 15) fail(where, "hard.q too short");
    dashes += prose(`${where}.hard.a`, d.hard.a, 250, 2600) ?? 0;
  }
  // Outline: contiguous ranges from verse 1 to the last verse.
  if (!Array.isArray(d.outline) || d.outline.length < 1) fail(where, "outline missing");
  else {
    let next = 1;
    for (const [i, o] of d.outline.entries()) {
      const m = String(o.v ?? "").match(/^(\d+)(?:-(\d+))?$/);
      if (!m) { fail(`${where}.outline[${i}]`, `bad range "${o.v}"`); break; }
      const a = +m[1], z = +(m[2] ?? m[1]);
      if (a !== next) { fail(`${where}.outline[${i}]`, `starts at ${a}, expected ${next}`); break; }
      if (z < a) { fail(`${where}.outline[${i}]`, "range runs backward"); break; }
      if (typeof o.t !== "string" || o.t.length < 3) fail(`${where}.outline[${i}]`, "missing heading");
      next = z + 1;
    }
    if (next !== last + 1 && !errors.some((e) => e.startsWith(`${where}.outline`))) fail(`${where}.outline`, `ends at ${next - 1}, chapter ends at ${last}`);
  }
  if (!Array.isArray(d.doctrines) || d.doctrines.length < 1 || d.doctrines.length > 4) fail(where, "one to four doctrines");
  else for (const [i, x] of d.doctrines.entries()) {
    if (!doctrineIds.has(x.id)) fail(`${where}.doctrines[${i}]`, `unknown doctrine "${x.id}"`);
    prose(`${where}.doctrines[${i}].note`, x.note, 80, 900);
  }
  const strongs = new Set();
  for (const v of data.verses) for (const w of v.w) strongs.add(w[3]);
  if (!Array.isArray(d.words) || d.words.length < 1 || d.words.length > 4) fail(where, "one to four key words");
  else for (const [i, w] of d.words.entries()) {
    if (!strongs.has(w.s)) fail(`${where}.words[${i}]`, `${w.s} does not occur in this chapter`);
    prose(`${where}.words[${i}].note`, w.note, 80, 900);
  }
  if (!Array.isArray(d.questions) || d.questions.length !== 3) fail(where, "exactly three questions");
  else for (const [i, q] of d.questions.entries()) prose(`${where}.questions[${i}]`, q, 25, 400);
}

let intros = 0, notes = 0;
for (const b of books) {
  if (partial && !only.includes(b.slug)) continue;
  const introPath = path.join(DIR, "notes", b.slug, "intro.json");
  if (fs.existsSync(introPath)) {
    try { checkIntro(b, `${b.slug}/intro`); intros++; } catch (e) { fail(`${b.slug}/intro`, e.message); }
  } else if (!partial) fail(b.slug, "missing intro.json");
  for (let c = 1; c <= b.chapters; c++) {
    const p = path.join(DIR, "notes", b.slug, `${c}.json`);
    if (!fs.existsSync(p)) { if (!partial) fail(`${b.slug}/${c}`, "missing"); continue; }
    try { checkChapter(b, c, `${b.slug}/${c}`); notes++; } catch (e) { fail(`${b.slug}/${c}`, e.message); }
  }
}

// The story path: eleven acts that walk all 1,189 chapters exactly once.
if (!partial) {
  const story = json("story.json");
  const seen = new Map();
  const bySlug = new Map(books.map((b) => [b.slug, b]));
  for (const act of story.acts) {
    for (const k of ["world", "watch"]) prose(`story.${act.id}.${k}`, act[k], 200, 3000);
    for (const r of act.path) {
      const b = bySlug.get(r.book);
      if (!b) { fail(`story.${act.id}`, `unknown book ${r.book}`); continue; }
      const [a, z] = [r.from ?? 1, r.to ?? r.from ?? b.chapters];
      for (let c = a; c <= z; c++) {
        const k = `${r.book}/${c}`;
        if (c > b.chapters) fail(`story.${act.id}`, `${k} out of range`);
        else if (seen.has(k)) fail(`story.${act.id}`, `${k} already in ${seen.get(k)}`);
        else seen.set(k, act.id);
      }
    }
  }
  for (const b of books) for (let c = 1; c <= b.chapters; c++) if (!seen.has(`${b.slug}/${c}`)) fail("story", `${b.slug}/${c} is on no path`);
}

// The generated index must match the notes it summarizes.
if (!partial) {
  const { buildIndex } = await import("./build-bible-notes-index.mjs");
  const cur = fs.existsSync(path.join(DIR, "notes-index.json")) ? fs.readFileSync(path.join(DIR, "notes-index.json"), "utf8") : "";
  if (cur !== JSON.stringify(buildIndex()) + "\n") fail("notes-index.json", "stale: run node scripts/build-bible-notes-index.mjs");
}

if (errors.length) {
  console.error(`✗ bible notes: ${errors.length} problem${errors.length === 1 ? "" : "s"}`);
  for (const e of errors.slice(0, 200)) console.error("  " + e);
  process.exit(1);
}
console.log(`✓ bible notes: ${intros} introductions, ${notes} chapter notes${partial ? " (partial check)" : ", story path covers all 1,189 chapters"}`);
