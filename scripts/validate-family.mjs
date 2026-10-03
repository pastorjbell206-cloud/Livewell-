#!/usr/bin/env node
/**
 * validate-family.mjs — the family devotions and the family catechism quote
 * the Berean Standard Bible word for word.
 *
 * /family, /family/devotions, and /family/catechism label their Scripture as
 * the BSB (<ScriptureNote rendering="bsb">), and the printable family table
 * cards print the same text. This keeps the label true: every passageText and
 * scriptureText must be a continuous stretch of the BSB for its reference
 * (an ellipsis may mark a gap), and its quotation marks must pair.
 *
 * To refresh a passage, copy it from `node scripts/bsb.mjs "<ref>"`, or run the
 * conversion in readingText() from scripts/lib/bsb.mjs.
 *
 *   node scripts/validate-family.mjs        CI gate
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { quotesPassage } from "./lib/bsb.mjs";

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
    const open = (text.match(/“/g) || []).length;
    const close = (text.match(/”/g) || []).length;
    if (open !== close) errors.push(`${where}: unpaired quotation marks`);
  });
}

if (errors.length) {
  console.error(`\nFamily Scripture: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`Family Scripture: clean (${checked} passages, verbatim BSB).`);
