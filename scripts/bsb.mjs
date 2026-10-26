#!/usr/bin/env node
/**
 * bsb.mjs — print a passage of the Berean Standard Bible, verbatim, from the
 * text the Study Bible serves. Writers quote from this output, never from
 * memory.
 *
 *   node scripts/bsb.mjs "Philippians 4:6-7"
 *   node scripts/bsb.mjs "Psalm 23" --verses     one verse per line, numbered
 */
import { passage } from "./lib/bsb.mjs";

const args = process.argv.slice(2);
const numbered = args.includes("--verses");
const refs = args.filter((a) => !a.startsWith("--"));
if (!refs.length) {
  console.error('Usage: node scripts/bsb.mjs "Book C:V-V" [--verses]');
  process.exit(1);
}
for (const ref of refs) {
  try {
    const p = passage(ref);
    if (numbered) for (const v of p.verses) console.log(`${p.book} ${v.c}:${v.v}  ${v.t}`);
    else console.log(`${ref} (BSB): ${p.text}`);
  } catch (e) {
    console.error(String(e.message || e));
    process.exitCode = 1;
  }
}
