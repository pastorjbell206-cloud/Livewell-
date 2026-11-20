#!/usr/bin/env node
/**
 * validate-wisdom.mjs: the gate on the wisdom library (the Wisdom Finder and
 * the /wisdom/:id topic pages). Run after scripts/build-wisdom-index.mjs.
 *
 * Every topic (client/public/wisdom/topics.json and entry/<id>.json):
 * - has the required fields and exactly one area of life (matching.json);
 * - every verse matches the Berean Standard Bible word for word
 *   (client/public/bible/ch/, scripts/lib/bsb.mjs), the whole passage;
 * - every Study Bible chapter a verse links to has its notes file;
 * - every related topic is real.
 *
 * Every topic written in full (client/public/wisdom/deep/<id>.json):
 * - at least five passages, each with a context range that holds the verse
 *   and one to four sentences on where it stands;
 * - the whole Bible's wisdom (two paragraphs or more), a question to sit with,
 *   a prayer from a psalm, and at least two next steps, each a real page;
 * - an "often misread" layer on every topic the old Misused Bible Verses
 *   tool covered (MISREAD_REQUIRED);
 * - on a heavy subject (client/src/data/sensitive-pages.json), care lines,
 *   each found word for word in the Study Bible plain note it names;
 * - the prose: none of CLAUDE.md's forbidden words, no em-dash, no "--",
 *   no emoji, "!" only inside quoted Scripture, and every quotation of three
 *   words or more either the BSB or the title of a page the topic links to.
 *
 *   node scripts/validate-wisdom.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { passage, normalize, readRef, quotesPassage, readingText } from "./lib/bsb.mjs";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { resolveHref } from "./lib/site-routes.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = path.join(ROOT, "client/public/wisdom");
const BIBLE = path.join(ROOT, "client/public/bible");
const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

const { topics } = readJson(path.join(W, "topics.json"));
const matching = readJson(path.join(W, "matching.json"));
const sensitive = readJson(path.join(ROOT, "client/src/data/sensitive-pages.json")).wisdom;
const ids = new Set(topics.map((t) => t.id));

// The topics the Misused Bible Verses tool (/tools/bible-says) covered; written in full, each carries the misread layer.
const MISREAD_REQUIRED = new Set([
  "money", "financial-hardship", "suffering", "marriage-conflict", "anxiety", "forgiveness", "calling-and-purpose",
  "grief", "anger", "parenting-struggles", "sexual-purity", "justice-and-the-poor", "doubt", "submitting-to-leaders",
  "rest-and-sabbath", "gossip-and-the-tongue",
]);

// Areas: every topic in exactly one.
const areaCount = new Map();
for (const a of matching.areas) for (const id of a.topics) areaCount.set(id, (areaCount.get(id) ?? 0) + 1);
for (const id of ids) if (areaCount.get(id) !== 1) fail("matching.json", `topic "${id}" is in ${areaCount.get(id) ?? 0} areas (needs exactly one)`);
for (const id of areaCount.keys()) if (!ids.has(id)) fail("matching.json", `area lists unknown topic "${id}"`);
for (const [id, m] of Object.entries(matching.topics)) {
  if (!ids.has(id)) fail("matching.json", `phrases for unknown topic "${id}"`);
  for (const r of m.related ?? []) if (!ids.has(r)) fail("matching.json", `${id}: related "${r}" is not a topic`);
}

// Every verse, word for word, and every chapter it links to.
let verses = 0;
for (const t of topics) {
  for (const k of ["id", "label", "framing", "cultural", "historical", "application"]) if (!t[k]) fail(t.id ?? "?", `missing ${k}`);
  for (const v of t.verses ?? []) {
    verses++;
    try {
      // The whole passage, or its reading text (a psalm without its heading); never a fragment.
      const full = Math.min(normalize(passage(v.ref).text).length, normalize(readingText(v.ref)).length);
      if (!quotesPassage(v.text, v.ref) || normalize(v.text).length < full * 0.95) fail(t.id, `${v.ref} does not match the BSB word for word`);
    } catch (e) {
      fail(t.id, e.message);
    }
  }
  const entryFile = path.join(W, "entry", `${t.id}.json`);
  if (!fs.existsSync(entryFile)) {
    fail(t.id, "no entry file (run node scripts/build-wisdom-index.mjs)");
    continue;
  }
  const e = readJson(entryFile);
  for (const v of e.verses) {
    if (!fs.existsSync(path.join(BIBLE, "notes", v.slug, `${v.chapter}.json`))) fail(t.id, `${v.ref}: no Study Bible notes for ${v.slug} ${v.chapter}`);
  }
  for (const r of e.related) if (!ids.has(r.id)) fail(t.id, `related topic "${r.id}" is not a topic`);
}

// The deep layer.
const DEEP = path.join(W, "deep");
const deepFiles = fs.existsSync(DEEP) ? fs.readdirSync(DEEP).filter((f) => f.endsWith(".json")) : [];
const isSensitive = (id) => Boolean(sensitive.lead[id] || sensitive.end[id]);
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}]/u;
const QUOTE = /“([^”]+)”/g;

let bible = null;
function bibleHas(q) {
  if (bible === null) {
    const books = readJson(path.join(BIBLE, "books.json"));
    const parts = [];
    for (const b of books) for (let c = 1; c <= b.chapters; c++) parts.push(readJson(path.join(BIBLE, "ch", b.slug, `${c}.json`)).verses.map((v) => normalize(v.t)).join(" "));
    bible = ` ${parts.join(" ")} `;
  }
  return bible.includes(normalize(q));
}

function inChapterRange(ref, ctx) {
  const a = readRef(ref);
  const b = readRef(ctx);
  if (!a || !b || a.book.slug !== b.book.slug) return false;
  const pa = a.parts[0];
  const pb = b.parts[0];
  const bEnd = b.parts[b.parts.length - 1];
  return pa.c1 === pb.c1 && pa.v1 >= pb.v1 && pa.v1 <= (bEnd.c2 === pb.c1 ? bEnd.v2 : Infinity);
}

/** The prose rules for one string; `titles` are page titles the topic may quote. */
function checkProse(where, text, titles) {
  if (/—/.test(text)) fail(where, "em-dash in prose");
  if (EMOJI.test(text)) fail(where, "emoji in prose");
  if (/--/.test(text)) fail(where, "a double hyphen used as a dash");
  let prose = text;
  for (const m of text.matchAll(QUOTE)) {
    const q = m[1].trim();
    const words = normalize(q).split(" ").filter(Boolean);
    if (words.length >= 2 && bibleHas(q)) prose = prose.replace(m[0], " ");
    else if (titles.has(normalize(q))) prose = prose.replace(m[0], " ");
    else if (words.length >= 3) fail(where, `quotation is neither the BSB nor a linked page's title: “${q}”`);
  }
  if (prose.includes("!")) fail(where, `"!" outside quoted Scripture`);
  for (const m of setAsideAllowed(prose).matchAll(forbiddenRe)) fail(where, `forbidden word "${m[1]}"`);
}

const answerQuestions = [...fs.readFileSync(path.join(ROOT, "client/src/data/answers.ts"), "utf8").matchAll(/question:\s*"([^"]+)"/g)].map((m) => normalize(m[1]));

for (const f of deepFiles) {
  const d = readJson(path.join(DEEP, f));
  const id = d.id;
  const at = `deep/${f}`;
  if (!ids.has(id)) {
    fail(at, `"${id}" is not a topic`);
    continue;
  }
  const titles = new Set([...answerQuestions, ...(d.next ?? []).map((n) => normalize(n.label))]);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.updated ?? "")) fail(at, "updated must be a date");
  if (!Array.isArray(d.passages) || d.passages.length < 5) fail(at, "needs at least five passages");
  const seen = new Set();
  for (const p of d.passages ?? []) {
    if (seen.has(p.ref)) fail(at, `${p.ref} listed twice`);
    seen.add(p.ref);
    try {
      passage(p.ref);
      passage(p.context);
    } catch (e) {
      fail(at, e.message);
      continue;
    }
    if (!inChapterRange(p.ref, p.context)) fail(at, `${p.ref}: context ${p.context} does not hold the verse`);
    if (!p.where || p.where.split(/(?<=[.?])\s+/).length > 4) fail(at, `${p.ref}: "where" must be one to four sentences`);
    else checkProse(`${at} ${p.ref}`, p.where, titles);
  }
  for (const m of d.misread ?? []) {
    try {
      passage(m.ref);
    } catch (e) {
      fail(at, e.message);
    }
    if (!m.taken || !m.says) fail(at, `misread ${m.ref}: needs taken and says`);
    if (m.context && !inChapterRange(m.ref, m.context)) fail(at, `misread ${m.ref}: context ${m.context} does not hold the verse`);
    checkProse(`${at} misread ${m.ref}`, m.says ?? "", titles);
    // "taken" reports what people say, so a quoted saying there need not be Scripture.
    checkProse(`${at} misread ${m.ref} taken`, (m.taken ?? "").replace(QUOTE, (x, q) => (bibleHas(q) ? x : " ")), titles);
  }
  if (MISREAD_REQUIRED.has(id) && !(d.misread ?? []).length) fail(at, "this topic carries the Misused Bible Verses layer: needs at least one misread item");
  if (!Array.isArray(d.whole) || d.whole.length < 2) fail(at, "whole: needs two paragraphs or more");
  for (const [i, para] of (d.whole ?? []).entries()) checkProse(`${at} whole[${i}]`, para, titles);
  if (d.differ) {
    checkProse(`${at} differ.share`, d.differ.share ?? "", titles);
    if (!Array.isArray(d.differ.views) || d.differ.views.length < 2) fail(at, "differ: name at least two views, or leave differ out");
    for (const v of d.differ.views ?? []) checkProse(`${at} differ ${v.name}`, `${v.name} ${v.body}`, titles);
    if (d.differ.after) checkProse(`${at} differ.after`, d.differ.after, titles);
  }
  if (!d.sit) fail(at, "needs a question to sit with");
  else checkProse(`${at} sit`, d.sit, titles);
  const pr = readRef(d.prayer?.ref ?? "");
  if (!pr || pr.book.slug !== "psalms") fail(at, "the prayer must be drawn from a psalm");
  if (d.prayer?.lead) checkProse(`${at} prayer.lead`, d.prayer.lead, titles);
  if (!Array.isArray(d.next) || d.next.length < 2) fail(at, "needs at least two next steps");
  for (const n of d.next ?? []) {
    const r = resolveHref(n.href);
    if (r.status !== "ok") fail(at, `next step ${n.href} does not resolve (${r.status})`);
    checkProse(`${at} next ${n.href}`, n.label, titles);
  }
  if (isSensitive(id) && !(d.careLines ?? []).length) fail(at, "a heavy subject: needs the care lines");
  for (const c of d.careLines ?? []) {
    const src = path.join(BIBLE, "notes", `${c.from}.json`);
    if (!fs.existsSync(src)) {
      fail(at, `care line source ${c.from} does not exist`);
      continue;
    }
    if (!fs.readFileSync(src, "utf8").includes(JSON.stringify(c.text).slice(1, -1))) fail(at, `care line not found word for word in ${c.from}: "${c.text}"`);
  }
  if (d.notAdvice && !["money", "law", "medicine"].includes(d.notAdvice)) fail(at, "notAdvice must be money, law or medicine");
}

if (errors.length) {
  console.error(`\nWisdom library: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`Wisdom library: ${topics.length} topics, ${verses} verses word for word, ${deepFiles.length} written in full. Clean.`);
