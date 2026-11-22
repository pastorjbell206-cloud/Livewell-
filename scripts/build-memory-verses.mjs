#!/usr/bin/env node
/**
 * build-memory-verses.mjs
 *
 * Writes client/src/data/memory-verses.json, the verses Memorize Scripture
 * (/tools/scripture-memory) teaches, from the references in
 * client/src/data/memory-sets.json. Each verse's words are read out of the
 * Berean Standard Bible in client/public/bible (scripts/lib/bsb.mjs), so a
 * reader never memorizes a wording that was typed by hand. A psalm's heading
 * and a stray quotation mark come off, as for any passage printed alone; a
 * passage the Bible carries on past its last verse ends in "..." so the
 * reader knows the sentence goes on. No word is changed.
 *
 *   node scripts/build-memory-verses.mjs           write the file
 *   node scripts/build-memory-verses.mjs --check   exit 1 if it is stale or cannot be built
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readRef, readingText } from "./lib/bsb.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = "client/src/data/memory-sets.json";
const OUT = "client/src/data/memory-verses.json";
const CHECK = process.argv.includes("--check");

/** The verse's own words, with "..." where the sentence runs on past the passage. */
export function memoryText(ref) {
  const text = readingText(ref);
  return /[.?!…][”’"']?$/.test(text) ? text : `${text.replace(/[,;:—-]+$/, "")}...`;
}

const { sets } = JSON.parse(fs.readFileSync(path.join(ROOT, SRC), "utf8"));
const topics = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, "client/public/wisdom/topics.json"), "utf8")).topics.map((t) => [t.id, t.label]));
const problems = [];
const seen = new Set();
const nextOf = (set) => {
  const id = /^\/wisdom\/([a-z0-9-]+)$/.exec(set.next ?? "")?.[1];
  if (!id || !topics.has(id)) {
    problems.push(`${set.id}: "next" must be a wisdom topic that exists (/wisdom/<id>)`);
    return null;
  }
  return { kind: "Wisdom", label: topics.get(id), href: set.next };
};
const out = sets.map((set) => ({
  id: set.id,
  name: set.name,
  next: nextOf(set),
  verses: set.refs.map((ref) => {
    if (seen.has(ref)) problems.push(`${ref} is in two sets`);
    seen.add(ref);
    if (!readRef(ref)) {
      problems.push(`${set.id}: cannot read the reference "${ref}"`);
      return { ref, text: "" };
    }
    const text = memoryText(ref);
    if (/—/.test(text)) problems.push(`${ref}: the passage holds an em-dash; choose the verses round it`);
    return { ref, text };
  }),
}));
if (problems.length) {
  console.error("[memory-verses] cannot be built:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
const text = `${JSON.stringify({ about: `Written by scripts/build-memory-verses.mjs from ${SRC} and the Berean Standard Bible in client/public/bible. Do not edit by hand.`, sets: out }, null, 1)}\n`;
const file = path.join(ROOT, OUT);
if (CHECK) {
  if ((fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "") !== text) {
    console.error(`[memory-verses] ${OUT} is stale. Run: node scripts/build-memory-verses.mjs`);
    process.exit(1);
  }
} else fs.writeFileSync(file, text);
console.log(`[memory-verses] ${CHECK ? "up to date" : "wrote"} ${OUT}: ${seen.size} verses in ${out.length} sets, word for word from the BSB`);
