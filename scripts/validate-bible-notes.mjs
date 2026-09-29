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
 *
 * Verse notes (notes/<slug>/verses/<n>.json) must cover every verse in order,
 * in entries of at most six verses; ground each grammar note in Strong's
 * numbers that occur in those verses; tie every doctrine the chapter note names
 * to at least one verse; and give cross-references that exist.
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
// Flip to true once every chapter has verse notes; until then a full run
// checks the verse notes present and reports how many remain.
const VERSES_COMPLETE = false;

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
  // Authoring tools never leak into what readers see.
  if (/\b(the helper (parses|prints|lists|shows|gives|marks)|helper's (list|output|parsing)|bible-notes-helper|the validator)\b/i.test(outside)) fail(where, "mentions the authoring tools (say \"standard lexicons\" or \"the Hebrew/Greek\" instead)");
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

// "John 3:16", "Psalm 23", "1 Kings 8:22-53", "Romans 1:18-3:20" → valid or not.
const bookByName = new Map(books.map((b) => [b.name.toLowerCase(), b]));
bookByName.set("psalm", bookByName.get("psalms"));
function refOk(ref) {
  const m = String(ref).match(/^((?:[1-3] )?[A-Za-z]+(?: of [A-Za-z]+)?) (\d+)(?::(\d+))?(?:-(\d+)(?::(\d+))?)?$/);
  if (!m) return false;
  const b = bookByName.get(m[1].toLowerCase());
  if (!b) return false;
  const c = +m[2];
  const d = chapterData.get(`${b.slug}/${c}`);
  if (!d) return false;
  const lastOf = (x) => x.verses[x.verses.length - 1].v;
  if (m[3] && +m[3] > lastOf(d)) return false;
  if (m[5]) {
    const d2 = chapterData.get(`${b.slug}/${m[4]}`);
    return !!d2 && +m[4] > c && +m[5] <= lastOf(d2);
  }
  if (m[4] && m[3]) return +m[4] > +m[3] && +m[4] <= lastOf(d);
  if (m[4] && !m[3]) return +m[4] > c && chapterData.has(`${b.slug}/${m[4]}`);
  return true;
}

function checkVerses(b, c, where) {
  const d = json(`notes/${b.slug}/verses/${c}.json`);
  const data = chapterData.get(`${b.slug}/${c}`);
  const last = data.verses[data.verses.length - 1].v;
  if (!Array.isArray(d.verses) || d.verses.length === 0) return fail(where, "verses missing");
  let next = 1, grammar = 0, history = 0;
  const taught = new Set();
  for (const [i, e] of d.verses.entries()) {
    const w = `${where}[${e.v}]`;
    const m = String(e.v ?? "").match(/^(\d+)(?:-(\d+))?$/);
    if (!m) { fail(w, `bad range "${e.v}"`); return; }
    const a = +m[1], z = +(m[2] ?? m[1]);
    if (a !== next) { fail(w, `starts at ${a}, expected ${next}`); return; }
    if (z < a) { fail(w, "range runs backward"); return; }
    if (z - a + 1 > 6) fail(w, "an entry may cover at most six verses");
    next = z + 1;
    prose(`${w}.context`, e.context, 60, 1400);
    const extras = ["grammar", "history", "text"].filter((k) => e[k] != null);
    if (extras.length === 0 && !(Array.isArray(e.theology) && e.theology.length)) fail(w, "needs grammar, history, theology, or text beyond the context");
    if (e.grammar != null) {
      grammar++;
      prose(`${w}.grammar`, e.grammar, 80, 1600);
      const here = new Set();
      for (const v of data.verses) if (v.v >= a && v.v <= z) for (const x of v.w) here.add(x[3]);
      if (!Array.isArray(e.words) || e.words.length === 0) fail(w, "a grammar note names the Strong's numbers it discusses in \"words\"");
      else for (const s of e.words) if (!here.has(s)) fail(w, `${s} does not occur in ${b.slug} ${c}:${e.v}`);
    } else if (e.words != null) fail(w, "\"words\" belongs with a grammar note");
    if (e.history != null) { history++; prose(`${w}.history`, e.history, 80, 1600); }
    if (e.text != null) prose(`${w}.text`, e.text, 60, 1200);
    if (e.theology != null) {
      if (!Array.isArray(e.theology)) fail(w, "theology must be a list");
      else for (const [j, t] of e.theology.entries()) {
        if (!doctrineIds.has(t.id)) fail(`${w}.theology[${j}]`, `unknown doctrine "${t.id}"`);
        else taught.add(t.id);
        prose(`${w}.theology[${j}].note`, t.note, 60, 1200);
      }
    }
    if (e.refs != null) {
      if (!Array.isArray(e.refs)) fail(w, "refs must be a list");
      else for (const r of e.refs) if (!refOk(r)) fail(w, `cross-reference "${r}" is not a real passage (write "Book 3:16" or "Book 3:16-18")`);
    }
  }
  if (next !== last + 1) fail(where, `ends at ${next - 1}, chapter ends at ${last}`);
  if (d.verses.length < Math.ceil(last / 3)) fail(where, `only ${d.verses.length} entries for ${last} verses (at least ${Math.ceil(last / 3)})`);
  const wantGrammar = Math.max(1, Math.round(d.verses.length * 0.3));
  if (grammar < wantGrammar) fail(where, `${grammar} grammar notes; at least ${wantGrammar} for ${d.verses.length} entries`);
  if (history < 1) fail(where, "at least one history note");
  const notePath = path.join(DIR, "notes", b.slug, `${c}.json`);
  if (fs.existsSync(notePath)) {
    for (const x of json(`notes/${b.slug}/${c}.json`).doctrines ?? [])
      if (!taught.has(x.id)) fail(where, `the chapter note's doctrine "${x.id}" is tied to no verse`);
  }
}

function checkStudy(id, where) {
  const d = json(`doctrines/${id}.json`);
  if (d.id !== id) fail(where, `id is "${d.id}"`);
  prose(`${where}.definition`, d.definition, 300, 3000);
  prose(`${where}.ot`, d.ot, 800, 7000);
  prose(`${where}.nt`, d.nt, 800, 7000);
  prose(`${where}.history`, d.history, 600, 6000);
  prose(`${where}.errors`, d.errors, 250, 3000);
  prose(`${where}.life`, d.life, 250, 3000);
  if (!Array.isArray(d.keyTexts) || d.keyTexts.length < 8 || d.keyTexts.length > 15) fail(where, "eight to fifteen key texts");
  else for (const [i, k] of d.keyTexts.entries()) {
    if (!refOk(k.ref)) fail(`${where}.keyTexts[${i}]`, `"${k.ref}" is not a real passage`);
    prose(`${where}.keyTexts[${i}].why`, k.why, 60, 700);
  }
  if (!Array.isArray(d.differ) || d.differ.length < 2 || d.differ.length > 5) fail(where, "two to five positions in differ");
  else for (const [i, x] of d.differ.entries()) {
    if (typeof x.view !== "string" || x.view.length < 3) fail(`${where}.differ[${i}]`, "missing view");
    prose(`${where}.differ[${i}].body`, x.body, 150, 1800);
  }
  if (!Array.isArray(d.questions) || d.questions.length !== 3) fail(where, "exactly three questions");
  else for (const [i, q] of d.questions.entries()) prose(`${where}.questions[${i}]`, q, 25, 400);
}

let intros = 0, notes = 0, verseFiles = 0, versesMissing = 0, studies = 0;
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
    const vp = path.join(DIR, "notes", b.slug, "verses", `${c}.json`);
    if (!fs.existsSync(vp)) { versesMissing++; if (!partial && VERSES_COMPLETE) fail(`${b.slug}/verses/${c}`, "missing"); continue; }
    try { checkVerses(b, c, `${b.slug}/verses/${c}`); verseFiles++; } catch (e) { fail(`${b.slug}/verses/${c}`, e.message); }
  }
}

// Doctrine studies: checked where present; required once STUDIES_COMPLETE.
const STUDIES_COMPLETE = false;
for (const id of doctrineIds) {
  if (partial && !only.includes(id)) continue;
  if (!fs.existsSync(path.join(DIR, "doctrines", `${id}.json`))) { if (!partial && STUDIES_COMPLETE) fail(`doctrines/${id}`, "missing study"); continue; }
  try { checkStudy(id, `doctrines/${id}`); studies++; } catch (e) { fail(`doctrines/${id}`, e.message); }
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
  const { staleFiles } = await import("./build-bible-notes-index.mjs");
  for (const f of staleFiles()) fail(f, "stale: run node scripts/build-bible-notes-index.mjs");
}

if (errors.length) {
  console.error(`✗ bible notes: ${errors.length} problem${errors.length === 1 ? "" : "s"}`);
  for (const e of errors.slice(0, 200)) console.error("  " + e);
  process.exit(1);
}
console.log(`✓ bible notes: ${intros} introductions, ${notes} chapter notes, ${verseFiles} verse-note files, ${studies} doctrine studies${versesMissing && !VERSES_COMPLETE ? ` (${versesMissing} chapters still without verse notes)` : ""}${partial ? " (partial check)" : ", story path covers all 1,189 chapters"}`);
