#!/usr/bin/env node
/**
 * validate-bible.mjs — the Study Bible's data is whole (docs/STUDY-BIBLE-PROMPT.md §4).
 *
 * Fails if any of the 66 books or 1,189 chapters is missing or empty, if the
 * verse or word totals fall below what the sources carry, if a lexicon shard
 * or grammar dictionary will not parse, or if the source credits are absent.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("client/public/bible");
const errors = [];
const fail = (m) => errors.push(m);
const json = (p) => JSON.parse(fs.readFileSync(path.join(DIR, p), "utf8"));

const books = json("books.json");
if (books.length !== 66) fail(`expected 66 books, found ${books.length}`);
let chapters = 0, verses = 0, words = 0, xrefs = 0;
for (const b of books) {
  for (let c = 1; c <= b.chapters; c++) {
    const p = `ch/${b.slug}/${c}.json`;
    if (!fs.existsSync(path.join(DIR, p))) { fail(`missing ${p}`); continue; }
    const d = json(p);
    if (!Array.isArray(d.verses) || d.verses.length === 0) fail(`${p} has no verses`);
    chapters++;
    for (const v of d.verses) {
      // A verse the critical text omits (e.g. Acts 8:37) has no English in the
      // BSB but must carry its later-edition Greek, marked as such.
      if (!v.t && !(v.later && v.w.length)) fail(`${p} verse ${v.v} has no text and no later-edition words`);
      verses++;
      words += v.w.length;
      xrefs += (v.x ?? []).length;
    }
  }
}
if (chapters !== 1189) fail(`expected 1,189 chapters, found ${chapters}`);
if (verses < 31000) fail(`only ${verses} verses`);
if (words < 440000) fail(`only ${words} original-language words`);
if (xrefs < 100000) fail(`only ${xrefs} cross-references`);

let lexEntries = 0;
for (const lang of ["H", "G"]) {
  for (const f of fs.readdirSync(path.join(DIR, "lex", lang))) lexEntries += Object.keys(json(`lex/${lang}/${f}`)).length;
  const morph = json(`morph/${lang}.json`);
  if (Object.keys(morph).length < 500) fail(`grammar dictionary ${lang} has only ${Object.keys(morph).length} codes`);
}
if (lexEntries < 20000) fail(`only ${lexEntries} lexicon entries`);

const sources = json("sources.json");
if (!sources.sources?.some((s) => /STEPBible/.test(s.name)) || !sources.sources?.some((s) => /Berean/.test(s.name))) fail("sources.json is missing a credit");

if (errors.length) {
  console.error(`validate-bible: ${errors.length} problem(s)`);
  errors.slice(0, 30).forEach((e) => console.error("  " + e));
  process.exit(1);
}
console.log(`validate-bible: ok (${books.length} books, ${chapters} chapters, ${verses} verses, ${words} words, ${xrefs} cross-references, ${lexEntries} lexicon entries)`);
