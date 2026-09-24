#!/usr/bin/env node
/**
 * bible-notes-helper.mjs — a writer's view of one chapter, for drafting study notes.
 *
 *   node scripts/bible-notes-helper.mjs <book-slug> <chapter>
 *
 * Prints the Berean Standard Bible text verse by verse (the only English a note
 * may quote), then every Hebrew or Greek word in the chapter by Strong's number
 * with its dictionary form, transliteration, gloss, and count here. A note's
 * "words" entries must use numbers from this list.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("client/public/bible");
const [slug, ch] = process.argv.slice(2);
if (!slug || !ch) {
  console.error("usage: node scripts/bible-notes-helper.mjs <book-slug> <chapter>");
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(path.join(DIR, "ch", slug, `${ch}.json`), "utf8"));
console.log(`# ${slug} ${ch} (BSB)\n`);
for (const v of data.verses) console.log(`${v.v} ${v.t || "(omitted in the critical text)"}`);

const counts = new Map();
for (const v of data.verses) for (const w of v.w) {
  const s = w[3];
  if (!/^[HG]\d{4}/.test(s)) continue;
  const e = counts.get(s) ?? { n: 0, form: w[0], tr: w[1], gloss: w[2], first: v.v };
  e.n++;
  counts.set(s, e);
}
const shards = new Map();
const lex = (s) => {
  const lang = s[0];
  const num = parseInt(s.slice(1, 5), 10);
  const key = `${lang}/${Math.floor(num / 250)}`;
  if (!shards.has(key)) {
    const p = path.join(DIR, "lex", `${key}.json`);
    shards.set(key, fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {});
  }
  const shard = shards.get(key);
  const base = s.slice(0, 5);
  return shard[s] ?? shard[base] ?? null;
};
const STOP = new Set(["H9003", "H9004", "H9005", "H9006", "H9001", "H9002", "H9009", "H9014", "H9016", "H0853", "H3588", "G3588", "G2532", "G1161", "G0846", "G1063", "G1722", "G1519", "G1537", "G3754"]);
console.log(`\n# Words (Strong's, count here, dictionary form, transliteration, gloss, first verse)\n`);
const rows = [...counts.entries()].filter(([s]) => !STOP.has(s.slice(0, 5))).sort((a, b) => b[1].n - a[1].n);
for (const [s, e] of rows) {
  const l = lex(s);
  console.log(`${s}\t${e.n}\t${l?.l ?? e.form}\t${l?.tr ?? e.tr}\t${(l?.g ?? e.gloss).slice(0, 60)}\tv${e.first}`);
}
