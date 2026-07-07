#!/usr/bin/env node
/**
 * validate-pathways.mjs — structural enforcement for the Topic Pathways
 * (client/public/pathways/*.json). Each pathway is a guided route through a
 * major topic: read a few essays, do a study, then read a book free. The pages
 * render straight from these files, so a missing field or a broken/relative
 * href does not error loudly — it silently ships a dead link in the middle of a
 * reader's route. This gate guarantees the shape and that every href is a real
 * internal path.
 *
 * It checks structure and minimums only. Voice is governed separately; long-form
 * prose here uses em-dash and semicolon as part of the house voice, so
 * punctuation is not policed.
 *
 * Run: node scripts/validate-pathways.mjs   (exits non-zero on failure)
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/pathways";
const KINDS = new Set(["read", "study", "book"]);

let failures = 0;
const fail = (f, m) => { failures++; console.error(`  FAIL ${f}: ${m}`); };
const isStr = (v) => typeof v === "string" && v.trim().length > 0;
// An internal path: non-empty, absolute ("/…"), never a protocol/external URL.
const isInternalHref = (v) => isStr(v) && v.startsWith("/") && !v.startsWith("//");

// index.json is the generated hub manifest, not a pathway. Skip it by name, and
// defensively skip any non-pathway-shaped file (an array, or an object missing
// both `slug` and `movements`) so a future manifest never false-fails.
const files = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json").sort()
  : [];
if (!files.length) { console.error(`No pathways found in ${DIR}`); process.exit(1); }

let pathwayCount = 0;
for (const file of files) {
  const slug = file.replace(/\.json$/, "");
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8")); }
  catch (e) { fail(file, `invalid JSON: ${e.message}`); continue; }

  if (Array.isArray(d) || (d && typeof d === "object" && !("slug" in d) && !("movements" in d))) {
    continue; // manifest/index file, not a pathway
  }
  pathwayCount++;

  if (d.slug !== slug) fail(file, `slug mismatch (file ${slug}, slug ${d.slug})`);
  for (const k of ["slug", "title", "subtitle", "forWhom"]) {
    if (!isStr(d[k])) fail(file, `missing/empty string field "${k}"`);
  }

  const movements = Array.isArray(d.movements) ? d.movements : [];
  if (movements.length < 2) fail(file, `needs >= 2 movements (has ${movements.length})`);
  if (!movements.some((m) => m?.kind === "book")) fail(file, `needs at least one movement of kind "book"`);

  movements.forEach((m, i) => {
    const where = `movement ${i + 1}`;
    if (!KINDS.has(m?.kind)) fail(file, `${where} kind must be read|study|book (got ${JSON.stringify(m?.kind)})`);
    if (!isStr(m?.heading)) fail(file, `${where} missing/empty "heading"`);
    if (!isStr(m?.note)) fail(file, `${where} missing/empty "note"`);
    const items = Array.isArray(m?.items) ? m.items : [];
    if (items.length < 1) fail(file, `${where} needs >= 1 item`);
    items.forEach((it, j) => {
      const iw = `${where} item ${j + 1}`;
      if (!isStr(it?.label)) fail(file, `${iw} missing/empty "label"`);
      if (!isStr(it?.blurb)) fail(file, `${iw} missing/empty "blurb"`);
      if (!isInternalHref(it?.href)) fail(file, `${iw} "href" must be a non-empty internal path (got ${JSON.stringify(it?.href)})`);
    });
  });
}

if (failures) { console.error(`\n[validate-pathways] ${failures} failure(s) across ${pathwayCount} pathway(s)`); process.exit(1); }
console.log(`[validate-pathways] ${pathwayCount} pathway(s), 0 failures`);
