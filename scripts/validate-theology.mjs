#!/usr/bin/env node
/**
 * validate-theology.mjs — CI gate for the theology reference library.
 *
 * The theology surface (30+ doctrines, the hard questions, 230+ passage
 * notes, the church-history essays) shipped ungated; this closes that hole,
 * modeled on validate-formation.mjs. It enforces the structures in
 * docs/theology-hub.md and the platform's trust contract:
 *
 *  - Doctrines: the six-step shape, >= 2 steelmanned positions whose
 *    best-cases sit within a 45% word-count band (no strawman-by-brevity),
 *    triage from the fixed vocabulary, evidence entries that name what each
 *    passage is hard for.
 *  - Questions: full shape, unique ids, real answers (>= 120 words), every
 *    entry routed to a doctrine.
 *  - Passage notes: keyed "book chapter", flow present and substantial;
 *    optional fields correctly typed (crossRefs: array of reference strings).
 *  - History essays: full shape, >= 4 sections, sources present.
 *  - House style, all surfaces: zero exclamation points (the corpus is
 *    clean; the rule holds even inside quotations here — pick calmer verses),
 *    zero forbidden words in prose fields.
 *
 * Exits non-zero with a findings list so CI fails loudly.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "client", "public");
const THEO = path.join(ROOT, "theology");
const findings = [];
const note = (file, msg) => findings.push(`${file}: ${msg}`);

const FORBIDDEN_WORDS = [
  "delve", "leverage", "unlock", "transformative", "navigate", "tapestry",
  "foster", "unpack", "landscape", "nuanced", "multifaceted", "authentic",
  "holistic",
];
// "journey" is forbidden as metaphor but appears legitimately in travel
// contexts ("Paul's journey to Rome"); it gets a manual pass, not a grep.

const wordCount = (s) => String(s ?? "").trim().split(/\s+/).filter(Boolean).length;

function styleCheck(file, label, text) {
  const s = String(text ?? "");
  if (s.includes("!")) note(file, `${label}: exclamation point`);
  for (const w of FORBIDDEN_WORDS) {
    const re = new RegExp(`\\b${w}\\b`, "i");
    if (re.test(s)) note(file, `${label}: forbidden word "${w}"`);
  }
}

function walkStrings(file, obj, trail = "") {
  if (typeof obj === "string") return styleCheck(file, trail || "(root)", obj);
  if (Array.isArray(obj)) return obj.forEach((v, i) => walkStrings(file, v, `${trail}[${i}]`));
  if (obj && typeof obj === "object")
    return Object.entries(obj).forEach(([k, v]) => walkStrings(file, v, trail ? `${trail}.${k}` : k));
}

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    note(path.relative(ROOT, p), `unparseable JSON (${e.message})`);
    return null;
  }
}

/* ---------------- doctrines ---------------- */
const DOCTRINE_KEYS = [
  "slug", "title", "subtitle", "triage", "triageNote", "question",
  "whyItMatters", "positions", "biblicalEvidence", "weighing",
  "charitableDisagreement", "relatedDebates", "furtherReading",
];
const TRIAGE = new Set(["first-order", "second-order", "third-order"]);

let doctrineCount = 0;
for (const f of fs.readdirSync(THEO).filter((f) => f.endsWith(".json"))) {
  const p = path.join(THEO, f);
  const d = readJson(p);
  if (!d || !Object.prototype.hasOwnProperty.call(d, "positions")) continue; // not a doctrine file
  doctrineCount++;
  const rel = `theology/${f}`;
  for (const k of DOCTRINE_KEYS) if (!(k in d)) note(rel, `missing key "${k}"`);
  if (!TRIAGE.has(d.triage)) note(rel, `triage "${d.triage}" not in ${[...TRIAGE].join("/")}`);
  const pos = Array.isArray(d.positions) ? d.positions : [];
  if (pos.length < 2) note(rel, `only ${pos.length} position(s) — a contested doctrine needs >= 2 steelmen`);
  const cases = [];
  pos.forEach((v, i) => {
    for (const k of ["name", "inOneLine", "bestCase", "advocates", "keyTexts"])
      if (!(k in v)) note(rel, `positions[${i}] missing "${k}"`);
    if (!Array.isArray(v.advocates) || v.advocates.length === 0) note(rel, `positions[${i}] has no advocates`);
    if (!Array.isArray(v.keyTexts) || v.keyTexts.length === 0) note(rel, `positions[${i}] has no keyTexts`);
    cases.push(wordCount(v.bestCase));
  });
  if (cases.length >= 2) {
    const max = Math.max(...cases), min = Math.min(...cases);
    if (min > 0 && (max - min) / max > 0.45)
      note(rel, `steelman imbalance: best-case word counts ${cases.join("/")} differ by more than 45% — the shortest reads as a strawman`);
  }
  const ev = Array.isArray(d.biblicalEvidence) ? d.biblicalEvidence : [];
  if (ev.length < 5) note(rel, `only ${ev.length} biblicalEvidence entries (need >= 5)`);
  ev.forEach((e, i) => {
    for (const k of ["passage", "leansToward", "summary", "hardFor", "howOthersRead"])
      if (!(k in e)) note(rel, `biblicalEvidence[${i}] missing "${k}"`);
  });
  walkStrings(rel, d);
}
if (doctrineCount < 30) note("theology/", `expected >= 30 doctrine files, found ${doctrineCount}`);

/* ---------------- hard questions ---------------- */
{
  const rel = "theology/questions.json";
  const q = readJson(path.join(THEO, "questions.json"));
  if (q) {
    const list = Array.isArray(q.questions) ? q.questions : [];
    if (list.length < 79) note(rel, `question count fell to ${list.length} (had 79) — never delete, only grow`);
    const ids = new Set();
    list.forEach((e, i) => {
      for (const k of ["id", "question", "category", "shortAnswer", "answer", "whereChristiansDiffer", "doctrine", "doctrineTitle", "passages"])
        if (!(k in e)) note(rel, `questions[${i}] missing "${k}"`);
      if (ids.has(e.id)) note(rel, `duplicate id "${e.id}"`);
      ids.add(e.id);
      if (wordCount(e.answer) < 120) note(rel, `questions[${i}] ("${e.id}") answer under 120 words — this surface does not do thin answers`);
    });
    walkStrings(rel, q);
  }
}

/* ---------------- passage notes ---------------- */
{
  const rel = "theology/passage-notes.json";
  const notes = readJson(path.join(THEO, "passage-notes.json"));
  if (notes) {
    const entries = Object.entries(notes);
    if (entries.length < 230) note(rel, `passage count fell to ${entries.length} (had 230)`);
    for (const [key, v] of entries) {
      if (!/^[1-3]? ?[a-z ]+ \d+$/.test(key)) note(rel, `key "${key}" not in "book chapter" form`);
      if (wordCount(v.flow) < 60) note(rel, `"${key}" flow under 60 words`);
      if (v.crossRefs && (!Array.isArray(v.crossRefs) || v.crossRefs.some((r) => typeof r !== "string")))
        note(rel, `"${key}" crossRefs must be an array of reference strings`);
      if (v.words && (!Array.isArray(v.words) || v.words.some((w) => !w.original || !w.gloss)))
        note(rel, `"${key}" words entries need original+gloss`);
    }
    walkStrings(rel, notes);
  }
}

/* ---------------- history essays ---------------- */
{
  const dir = path.join(ROOT, "history", "essays");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "essays-index.json");
  for (const f of files) {
    const rel = `history/essays/${f}`;
    const h = readJson(path.join(dir, f));
    if (!h) continue;
    for (const k of ["slug", "title", "subtitle", "era", "dateRange", "sections", "keyFigures", "sources"])
      if (!(k in h)) note(rel, `missing key "${k}"`);
    const secs = Array.isArray(h.sections) ? h.sections : [];
    if (secs.length < 4) note(rel, `only ${secs.length} sections (need >= 4)`);
    secs.forEach((s, i) => {
      for (const k of ["id", "kicker", "title", "body"]) if (!(k in s)) note(rel, `sections[${i}] missing "${k}"`);
      if (wordCount(s.body) < 120) note(rel, `sections[${i}] body under 120 words`);
    });
    if (!Array.isArray(h.sources) || h.sources.length < 2) note(rel, `needs >= 2 sources`);
    walkStrings(rel, h);
  }
}

/* ---------------- verdict ---------------- */
if (findings.length) {
  console.error(`[validate-theology] ${findings.length} finding(s):`);
  for (const f of findings) console.error("  - " + f);
  process.exit(1);
}
console.log(`[validate-theology] clean: ${doctrineCount} doctrines, questions, passage notes, history essays all pass.`);
