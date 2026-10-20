#!/usr/bin/env node
/**
 * validate-family.mjs — the family devotions and the family catechism quote
 * the Berean Standard Bible word for word.
 *
 * /family, /family/devotions, and /family/catechism label their Scripture as
 * the BSB (<ScriptureNote rendering="bsb">), and the printable family table
 * cards print the same text. This keeps the label true: every passageText and
 * scriptureText must be a continuous stretch of the BSB for its reference
 * (an ellipsis may mark a gap), and its quotation marks must open and close in order.
 *
 * To refresh a passage, copy it from `node scripts/bsb.mjs "<ref>"`, or run the
 * conversion in readingText() from scripts/lib/bsb.mjs.
 *
 * The seasonal packs (client/public/family-seasonal.json) retell each passage
 * for children and print the passage itself from its reference, so there every
 * day must carry its fields, its reference must resolve in the BSB, and the
 * retelling may not use quotation marks (it is a paraphrase, not a quotation).
 *
 *   node scripts/validate-family.mjs        CI gate
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { passage, quotesPassage } from "./lib/bsb.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const SOURCES = [
  ["client/public/family-devotions.json", "passage", "passageText"],
  ["client/public/family-devotions-2.json", "passage", "passageText"],
  ["client/public/family-catechism.json", "scripture", "scriptureText"],
];

const errors = [];
let checked = 0;
for (const [file, refKey, textKey] of SOURCES) {
  const items = JSON.parse(readFileSync(join(ROOT, file), "utf8"));
  items.forEach((it, i) => {
    const where = `${file}[${i}] ${it[refKey] ?? "(no reference)"}`;
    const ref = it[refKey];
    const text = it[textKey];
    if (typeof ref !== "string" || typeof text !== "string" || !text.trim()) {
      errors.push(`${where}: needs ${refKey} and ${textKey}`);
      return;
    }
    checked++;
    try {
      if (!quotesPassage(text, ref)) errors.push(`${where}: ${textKey} is not verbatim BSB (copy it from: node scripts/bsb.mjs "${ref}")`);
    } catch (e) {
      errors.push(`${where}: ${e.message}`);
    }
    // Every closing mark has an opening mark before it, and none is left open.
    let depth = 0;
    for (const ch of text) {
      if (ch === "“") depth++;
      else if (ch === "”" && --depth < 0) break;
    }
    if (depth !== 0) errors.push(`${where}: unpaired quotation marks`);
  });
}

const SEASONAL = "client/public/family-seasonal.json";
const DAY_FIELDS = ["label", "title", "passage", "passageText", "reflection", "question", "prayer"];
let days = 0;
for (const [season, list] of Object.entries(JSON.parse(readFileSync(join(ROOT, SEASONAL), "utf8")))) {
  if (!Array.isArray(list)) { errors.push(`${SEASONAL} ${season}: expected a list of days`); continue; }
  list.forEach((d, i) => {
    const where = `${SEASONAL} ${season}[${i}] ${d?.passage ?? "(no reference)"}`;
    for (const k of DAY_FIELDS) if (typeof d?.[k] !== "string" || !d[k].trim()) errors.push(`${where}: needs ${k}`);
    if (typeof d?.passage === "string") {
      try { if (!passage(d.passage).text) errors.push(`${where}: no BSB text for this reference`); }
      catch (e) { errors.push(`${where}: ${e.message}`); }
    }
    if (typeof d?.passageText === "string" && /["“”]/.test(d.passageText)) errors.push(`${where}: the retelling is a paraphrase, so it may not use quotation marks`);
    days++;
  });
}

if (errors.length) {
  console.error(`\nFamily Scripture: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`Family Scripture: clean (${checked} passages, verbatim BSB; ${days} seasonal days, each reference in the BSB).`);
