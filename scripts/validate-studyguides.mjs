#!/usr/bin/env node
/**
 * validate-studyguides.mjs — structural enforcement for the downloadable study
 * guides (client/public/studyguides/*.json). Each guide renders into a Leader's
 * Guide and a Participant Handout PDF (scripts/build-pdfs.mjs), so a missing or
 * malformed field does not error loudly — it silently ships a broken download.
 * This gate guarantees the shape so the long-form library can grow safely.
 *
 * It checks structure and minimums only. Voice is governed separately by
 * scripts/voice-audit.mjs; long-form guides use em-dash and semicolon as part of
 * the house voice, so punctuation is not policed here.
 *
 * Run: node scripts/validate-studyguides.mjs   (exits non-zero on failure)
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/studyguides";

// Top-level fields every guide must carry, with the minimum each must satisfy.
const STR_FIELDS = ["slug", "title", "subtitle", "summary", "audience", "sessionsLabel", "leaderPrimer"];
const ARR_FIELDS = [
  ["sessions", 4], ["faq", 3], ["cadences", 1], ["bibliography", 1],
  ["furtherReading", 1], ["glossary", 1], ["scriptureIndex", 1],
];
const OBJ_FIELDS = ["facilitatorScript", "promoKit"];

// Per-session requirements. (essaySlug and memoryVerse are present in the schema
// but allowed to be empty — the PDF renderer treats both as optional.)
const SESSION_STR = ["title", "aim", "summary", "quietRoomQuestion", "practice", "closingPrayer", "teaching"];

let failures = 0;
const fail = (f, m) => { failures++; console.error(`  FAIL ${f}: ${m}`); };
const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const isArr = (v, n) => Array.isArray(v) && v.length >= n;

// index.json is the generated hub manifest, not a guide. Skip it by name, and
// defensively skip any non-guide-shaped file (an array, or an object that
// carries neither `slug` nor `sessions`) so future manifests never false-fail.
const files = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json").sort()
  : [];
if (!files.length) { console.error(`No study guides found in ${DIR}`); process.exit(1); }

let guideCount = 0;
for (const file of files) {
  const slug = file.replace(/\.json$/, "");
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8")); }
  catch (e) { fail(file, `invalid JSON: ${e.message}`); continue; }

  if (Array.isArray(d) || (d && typeof d === "object" && !("slug" in d) && !("sessions" in d))) {
    continue; // manifest/index file, not a study guide
  }
  guideCount++;

  if (d.slug !== slug) fail(file, `slug mismatch (file ${slug}, slug ${d.slug})`);
  for (const k of STR_FIELDS) if (!isStr(d[k])) fail(file, `missing/empty string field "${k}"`);
  for (const [k, n] of ARR_FIELDS) if (!isArr(d[k], n)) fail(file, `"${k}" must be an array of >= ${n}`);
  for (const k of OBJ_FIELDS) if (!d[k] || typeof d[k] !== "object") fail(file, `missing object field "${k}"`);

  // faq + bibliography + glossary item shapes
  for (const q of d.faq || []) if (!isStr(q?.q) || !isStr(q?.a)) fail(file, `faq item needs q + a: ${JSON.stringify(q).slice(0, 60)}`);
  for (const b of d.bibliography || []) if (!isStr(b?.title) || !isStr(b?.author)) fail(file, `bibliography item needs title + author`);
  for (const g of d.glossary || []) if (!isStr(g?.term) || !isStr(g?.definition)) fail(file, `glossary item needs term + definition`);

  (Array.isArray(d.sessions) ? d.sessions : []).forEach((s, i) => {
    const where = `session ${s?.n ?? i + 1}`;
    if (typeof s?.n !== "number") fail(file, `${where} needs a numeric "n"`);
    for (const k of SESSION_STR) if (!isStr(s?.[k])) fail(file, `${where} missing/empty "${k}"`);
    if (!s?.keyScripture || !isStr(s.keyScripture.ref) || !isStr(s.keyScripture.why)) fail(file, `${where} keyScripture needs ref + why`);
    if (!isArr(s?.timing, 1)) fail(file, `${where} needs >= 1 timing segment`);
    else for (const t of s.timing) if (!isStr(t?.segment) || t?.minutes == null) fail(file, `${where} timing needs segment + minutes`);
    if (!isArr(s?.discussion, 2)) fail(file, `${where} needs >= 2 discussion questions`);
    else for (const q of s.discussion) if (!isStr(q?.q) || !isStr(q?.behind)) fail(file, `${where} discussion item needs q + behind`);
    if (!isArr(s?.objections, 1)) fail(file, `${where} needs >= 1 anticipated objection`);
    else for (const o of s.objections) if (!isStr(o?.objection) || !isStr(o?.response)) fail(file, `${where} objection needs objection + response`);
    if (!isArr(s?.reflection, 1) || !s.reflection.every(isStr)) fail(file, `${where} needs >= 1 reflection prompt`);
    if (!isArr(s?.scriptureStudy, 1)) fail(file, `${where} needs >= 1 scriptureStudy note`);
    else for (const v of s.scriptureStudy) if (!isStr(v?.ref) || !isStr(v?.note)) fail(file, `${where} scriptureStudy needs ref + note`);
  });
}

if (failures) { console.error(`\n[validate-studyguides] ${failures} failure(s) across ${guideCount} guide(s)`); process.exit(1); }
console.log(`[validate-studyguides] ${guideCount} guide(s), 0 failures`);
