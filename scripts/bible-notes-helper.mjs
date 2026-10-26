#!/usr/bin/env node
/**
 * bible-notes-helper.mjs — a writer's view of one chapter, for drafting study notes.
 *
 *   node scripts/bible-notes-helper.mjs <book-slug> <chapter>
 *   node scripts/bible-notes-helper.mjs <book-slug> <chapter> --verses
 *
 * Prints the Berean Standard Bible text verse by verse (the only English a note
 * may quote), then every Hebrew or Greek word in the chapter by Strong's number
 * with its dictionary form, transliteration, gloss, and count here. A note's
 * "words" entries must use numbers from this list.
 *
 * With --verses it prints, instead, every verse with each Hebrew or Greek word
 * beneath it: the word, transliteration, gloss, Strong's number, and the full
 * parsing (stem, tense, person, case...). Verse notes' grammar observations
 * must rest on this parsing, and their "words" must come from the verse.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("client/public/bible");
const args = process.argv.slice(2);
const verseMode = args.includes("--verses");
const [slug, ch] = args.filter((a) => !a.startsWith("--"));
if (!slug || !ch) {
  console.error("usage: node scripts/bible-notes-helper.mjs <book-slug> <chapter>");
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(path.join(DIR, "ch", slug, `${ch}.json`), "utf8"));
if (verseMode) {
  const lang = data.verses.some((v) => v.w.some((w) => w[3]?.startsWith("H"))) ? "H" : "G";
  const morph = JSON.parse(fs.readFileSync(path.join(DIR, "morph", `${lang}.json`), "utf8"));
  const short = (s) => s.replace(/\s*\(hence[^)]*\)/g, "").split(";").map((p) => p.split("=")[1]?.trim()).filter(Boolean).join(" ");
  const parse = (code) => {
    if (!code) return "";
    const segs = lang === "H" ? code.split("/").map((c, i) => (i === 0 ? c : `H${c}`)) : [code];
    return segs.map((c) => (morph[c] ? short(morph[c]) : c)).join(" + ");
  };
  console.log(`# ${slug} ${ch}: verse by verse (BSB, then the ${lang === "H" ? "Hebrew" : "Greek"} with parsing)\n`);
  for (const v of data.verses) {
    console.log(`\n## ${v.v} ${v.t || "(omitted in the critical text)"}`);
    for (const w of v.w) console.log(`  ${w[0]}\t${w[1]}\t"${w[2]}"\t${w[3]}\t${parse(w[4])}${w[5] ? `\t[editions: ${w[5]}]` : ""}`);
  }
  process.exit(0);
}
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
