#!/usr/bin/env node
/**
 * validate-pray-psalms.mjs: the gate on Pray the Psalms
 * (/tools/pray-the-psalms). Run after scripts/build-pray-psalms.mjs.
 *
 * The source (client/public/pray-psalms/psalms.json):
 * - all 150 psalms, once each, every one with at least one "when" tag (at
 *   most five), every tag real, and every tag holding at least three psalms;
 * - every kind a psalm carries is the Study Bible's own: either the psalm's
 *   own evidence (src) or a group a note names, and the evidence is the
 *   note's words exactly, in the field it names, with the kind's own word in
 *   it; a group's psalms all appear in its sentence (as numbers or a range);
 * - the prose written for the page (each line and guide, each kind's and
 *   tag's line): none of CLAUDE.md's forbidden words, no em-dash, no "--", no
 *   emoji, no "!", no quotation marks (Scripture is shown, never typed here),
 *   a guide of two to four sentences;
 * - care: every plain-note paragraph that points to help or says no reading
 *   makes it right to harm anyone is carried by its psalm, and every heavy
 *   psalm (6, 13, 22, 38, 69, 88, 102, 109, 137) carries care; Psalm 88 shows
 *   its note's words on how it ends.
 *
 * The built files (client/public/pray-psalms/):
 * - every verse is the BSB word for word, and the stanzas cover each psalm
 *   once, in order;
 * - each title and summary is the Study Bible note's, every care and ending
 *   paragraph is the plain note's, and the four teaching panels are the book
 *   page's parts, word for word;
 * - the morning and evening plan reads all 150 psalms once over thirty days.
 *
 *   node scripts/validate-pray-psalms.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { passage } from "./lib/bsb.mjs";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { TEACHING, evidenceText, intro, note, paragraphs, plain, plainParagraph } from "./build-pray-psalms.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "client/public/pray-psalms/psalms.json");
const OUT = path.join(ROOT, "client/public/pray-psalms");
const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const EMOJI = /\p{Extended_Pictographic}/u;

export const HEAVY = [6, 13, 22, 38, 69, 88, 102, 109, 137];
/** A plain-note paragraph that must travel with its psalm. */
export const MARKED = /Find Help page|crisis line|hurting yourself|emergency number|right to harm|harm anyone|harm another|permission to harm/i;
/** The word each kind's evidence must contain. */
const KIND_WORD = {
  lament: /lament/i,
  people: /communal|community|national|whole people/i,
  thanks: /thanksgiving/i,
  praise: /hymn|praise/i,
  trust: /trust/i,
  wisdom: /wisdom/i,
  royal: /royal/i,
  reign: /enthronement|king/i,
  zion: /Zion/,
  story: /historical|story/i,
  liturgy: /liturgy/i,
  penitent: /penitential/i,
  cursing: /imprecat|cursing/i,
  ascents: /Songs? of Ascents|ascents/i,
};

const src = readJson(SRC);
const kindIds = new Set(src.kinds.map((k) => k.id));
const whenIds = new Set(src.whens.map((w) => w.id));

function prose(where, text) {
  if (typeof text !== "string" || !text.trim()) return fail(where, "empty");
  if (/—/.test(text)) fail(where, "em-dash");
  if (/--/.test(text)) fail(where, "a double hyphen used as a dash");
  if (EMOJI.test(text)) fail(where, "emoji");
  if (text.includes("!")) fail(where, `"!" (kept for quoted Scripture)`);
  if (/["“”‘]|’(?![a-z])/.test(text)) fail(where, "a quotation mark (Scripture is shown from the BSB, never typed here)");
  for (const m of setAsideAllowed(text).matchAll(forbiddenRe)) fail(where, `forbidden word "${m[1]}"`);
}

/** Every psalm number a sentence names, including ranges written "120 to 134". */
function numbersIn(text) {
  const out = new Set();
  for (const m of text.matchAll(/(\d+) to (\d+)/g)) for (let n = Number(m[1]); n <= Number(m[2]); n++) out.add(n);
  for (const m of text.matchAll(/\d+/g)) out.add(Number(m[0]));
  return out;
}

function checkEvidence(where, kind, from) {
  if (!Array.isArray(from) || from.length !== 3) return fail(where, "evidence must be [psalm or intro, field, words]");
  const text = evidenceText(from);
  if (text === null || text === undefined) return fail(where, `no field "${from[1]}" in ${from[0] === "intro" ? "the introduction" : `notes/psalms/${from[0]}.json`}`);
  if (!text.includes(from[2])) fail(where, `the words are not in the note: "${from[2].slice(0, 60)}"`);
  if (!KIND_WORD[kind]?.test(from[2])) fail(where, `the note's words do not name the kind "${kind}"`);
}

// Kinds and tags.
for (const k of src.kinds) {
  prose(`kind ${k.id} line`, k.line);
  if (!KIND_WORD[k.id]) fail(`kind ${k.id}`, "has no word to check its evidence by");
  for (const g of k.groups ?? []) {
    checkEvidence(`kind ${k.id} group`, k.id, g.src);
    const named = numbersIn(g.src[2]);
    for (const n of g.psalms) if (!named.has(n)) fail(`kind ${k.id} group`, `Psalm ${n} is not named in the group's sentence`);
  }
}
for (const w of src.whens) {
  prose(`when ${w.id} name`, w.name);
  prose(`when ${w.id} line`, w.line);
}
const tagCount = new Map([...whenIds].map((id) => [id, 0]));

// Psalms.
const seen = new Set();
for (const e of src.psalms) {
  const at = `Psalm ${e.n}`;
  if (!Number.isInteger(e.n) || e.n < 1 || e.n > 150) {
    fail(at, "not a psalm number");
    continue;
  }
  if (seen.has(e.n)) fail(at, "listed twice");
  seen.add(e.n);
  if (!Array.isArray(e.when) || e.when.length < 1 || e.when.length > 5) fail(at, "needs one to five when tags");
  for (const w of e.when ?? []) {
    if (!whenIds.has(w)) fail(at, `unknown when "${w}"`);
    else tagCount.set(w, tagCount.get(w) + 1);
  }
  for (const id of e.kinds) {
    if (!kindIds.has(id)) {
      fail(at, `unknown kind "${id}"`);
      continue;
    }
    const own = e.src?.[id];
    if (own) checkEvidence(`${at} kind ${id}`, id, own);
    else if (!(src.kinds.find((k) => k.id === id).groups ?? []).some((g) => g.psalms.includes(e.n))) fail(at, `kind "${id}" has no evidence from the notes`);
  }
  for (const id of Object.keys(e.src ?? {})) if (!e.kinds.includes(id)) fail(at, `evidence for "${id}", which it does not carry`);
  for (const id of e.often ?? []) if (!e.kinds.includes(id)) fail(at, `often "${id}", which it does not carry`);
  prose(`${at} line`, e.line);
  prose(`${at} guide`, e.guide);
  if (e.line?.length > 260) fail(at, "line is longer than 260 characters");
  const sentences = (e.guide ?? "").split(/(?<=[.?])\s+/).filter(Boolean).length;
  if (sentences < 2 || sentences > 5) fail(at, `guide has ${sentences} sentences (two to five)`);
  // Care: every marked plain-note paragraph travels with its psalm.
  const carried = new Set((e.care ?? []).map((r) => r.join("|")));
  for (const r of [...(e.care ?? []), ...(e.ending ?? [])]) if (!plainParagraph(e.n, r)) fail(at, `no plain-note paragraph at ${r.join(" ")}`);
  for (const p of plain(e.n).passages) {
    for (const field of ["happening", "hearers", "later", "hard", "asks"]) {
      paragraphs(p[field]).forEach((para, i) => {
        if (MARKED.test(para) && !carried.has([p.v, field, i].join("|"))) fail(at, `plain note ${p.v} ${field} paragraph ${i + 1} points to help or forbids harm and is not carried as care`);
      });
    }
  }
  if (HEAVY.includes(e.n) && !(e.care ?? []).length) fail(at, "a heavy psalm with no care lines");
}
for (let n = 1; n <= 150; n++) if (!seen.has(n)) fail(`Psalm ${n}`, "missing");
for (const [id, n] of tagCount) if (n < 3) fail(`when ${id}`, `only ${n} psalms (at least three)`);
const p88 = src.psalms.find((e) => e.n === 88);
if (!p88?.ending?.length) fail("Psalm 88", "must show its note's words on how it ends");

// Built files.
const index = readJson(path.join(OUT, "index.json"));
let verses = 0;
for (let n = 1; n <= 150; n++) {
  const f = path.join(OUT, `psalm/${n}.json`);
  if (!fs.existsSync(f)) {
    fail(`psalm/${n}.json`, "missing; run node scripts/build-pray-psalms.mjs");
    continue;
  }
  const b = readJson(f);
  const nt = note(n);
  const bsb = passage(`Psalm ${n}`).verses;
  verses += bsb.length;
  if (b.verses.length !== bsb.length) fail(`psalm/${n}`, "verse count differs from the BSB");
  b.verses.forEach((v, i) => {
    if (!bsb[i] || v.v !== bsb[i].v || v.t !== bsb[i].t) fail(`psalm/${n}:${v.v}`, "not the BSB word for word");
  });
  if (b.title !== nt.title || b.summary !== nt.summary) fail(`psalm/${n}`, "title or summary is not the Study Bible note's");
  let next = 1;
  for (const s of b.stanzas) {
    if (s.from !== next || s.to < s.from) fail(`psalm/${n}`, `stanza ${s.from}-${s.to} does not follow on from verse ${next - 1}`);
    next = s.to + 1;
  }
  if (next !== bsb[bsb.length - 1].v + 1) fail(`psalm/${n}`, "the stanzas do not reach the last verse");
  const e = src.psalms.find((x) => x.n === n);
  if (!e) continue;
  (e.care ?? []).forEach((r, i) => {
    if (b.care[i]?.text !== plainParagraph(n, r)) fail(`psalm/${n}`, `care ${i + 1} is not the plain note's word for word`);
  });
  (e.ending ?? []).forEach((r, i) => {
    if (b.ending[i]?.text !== plainParagraph(n, r)) fail(`psalm/${n}`, `ending ${i + 1} is not the plain note's word for word`);
  });
  if (b.line !== e.line || b.guide !== e.guide) fail(`psalm/${n}`, "line or guide differs from the source");
  if (b.cursing !== e.kinds.includes("cursing")) fail(`psalm/${n}`, "the cursing-psalm panel flag is wrong");
}
const i = intro();
for (const [k, id] of Object.entries(TEACHING)) {
  const part = i.teaching.parts.find((p) => p.id === id);
  if (!part || index.teaching[k]?.body.join("\n\n") !== part.body || index.teaching[k]?.h !== part.h) fail("index.json", `the ${k} panel is not the book page's "${id}" word for word`);
}
const planned = [];
for (const d of index.plan.filter((x) => x.d <= 30)) planned.push(...d.morning, ...d.evening);
if (planned.length !== 150 || new Set(planned).size !== 150) fail("index.json", "the plan does not read all 150 psalms once in thirty days");
if (index.psalms.length !== 150) fail("index.json", "does not list all 150 psalms");

if (errors.length) {
  console.error(`validate-pray-psalms: ${errors.length} problem(s)\n  ${errors.slice(0, 40).join("\n  ")}`);
  process.exit(1);
}
console.log(`validate-pray-psalms: 150 psalms (${verses} verses) word for word, each tagged; ${src.kinds.length} kinds from the notes; ${src.whens.length} times of life; care lines word for word`);
