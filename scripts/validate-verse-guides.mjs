#!/usr/bin/env node
/**
 * validate-verse-guides.mjs — the "read it in context" series holds its shape.
 *
 * docs/grow/GROW-PROMPT.md 5.4: several of the most-searched verses are also
 * the most proof-texted, and a series that reads each one in its setting
 * meets the demand and keeps the Scholarship Standard. The series lives in the
 * Reading Scripture in Context library (client/public/context/guides/, group
 * "The Verses Everyone Quotes"). This checks every guide in that group:
 * five sections of real length, every double-quoted run verbatim from the
 * Berean Standard Bible, key texts that parse, sources drawn only from the
 * bibliography the library already carries, and the voice rules.
 *
 *   node scripts/validate-verse-guides.mjs     CI gate
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { passage, normalize } from "./lib/bsb.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const DIR = join(ROOT, "client/public/context/guides");
export const GROUP = "The Verses Everyone Quotes";
const errors = [];
const fail = (w, m) => errors.push(`${w}: ${m}`);

const books = JSON.parse(readFileSync(join(ROOT, "client/public/bible/books.json"), "utf8"));
let bible = "";
for (const b of books)
  for (let c = 1; c <= b.chapters; c++)
    bible += " " + JSON.parse(readFileSync(join(ROOT, "client/public/bible/ch", b.slug, `${c}.json`), "utf8")).verses.map((v) => normalize(v.t)).join(" ");

const FORBIDDEN = /\b(delve|leverage|unlock|transformative|navigate|navigating|tapestry|foster|fostering|unpack|unpacking|landscape|nuanced|multifaceted|authentic|holistic|journey|journeys|hold space|your truth|do the work|lean into|showing up|in today['’]s world|now more than ever|here['’]s the thing|god['’]s got this|gospel-centered)\b/i;
const words = (s) => (typeof s === "string" ? s.split(/\s+/).filter(Boolean).length : 0);

const files = readdirSync(DIR).filter((f) => f.endsWith(".json"));
const guides = files.map((f) => [f, JSON.parse(readFileSync(join(DIR, f), "utf8"))]);
// Sources a new guide may cite: the ones the library's other guides already carry.
const vetted = new Set(
  guides.filter(([, g]) => g.group !== GROUP).flatMap(([, g]) => (g.sources || []).map((s) => `${s.title}|${s.author}`)),
);

let checked = 0;
for (const [f, g] of guides) {
  if (g.group !== GROUP) continue;
  checked++;
  const w = f.replace(/\.json$/, "");
  if (g.slug !== w) fail(w, "slug does not match the file name");
  if (typeof g.title !== "string" || g.title.length > 70) fail(w, "title missing or over 70 characters");
  if (typeof g.subtitle !== "string" || g.subtitle.length < 60 || g.subtitle.length > 200) fail(w, "subtitle needs 60 to 200 characters");
  if (!Array.isArray(g.sections) || g.sections.length < 4 || g.sections.length > 6) fail(w, "needs 4 to 6 sections");
  let total = 0;
  for (const [i, s] of (g.sections || []).entries()) {
    const n = words(s.body);
    total += n;
    if (!s.id || !s.title || !s.kicker) fail(`${w}.sections[${i}]`, "needs id, kicker, and title");
    if (n < 150 || n > 450) fail(`${w}.sections[${i}]`, `${n} words, needs 150 to 450`);
    const text = String(s.body || "");
    for (const q of [...text.matchAll(/[“"]([^”"]+)[”"]/g)].map((m) => m[1])) {
      const nq = normalize(q);
      if (nq.split(" ").length >= 3 && !q.split(/\s*(?:\.\.\.|…)\s*/).map(normalize).filter(Boolean).every((p) => bible.includes(p)))
        fail(`${w}.sections[${i}]`, `double quotation marks are for Scripture, and this is not verbatim BSB: "${q.slice(0, 60)}"`);
    }
    const outside = text.replace(/[“"][^”"]+[”"]/g, " ");
    const m = outside.match(FORBIDDEN);
    if (m) fail(`${w}.sections[${i}]`, `forbidden language "${m[1]}"`);
    if (outside.includes("—")) fail(`${w}.sections[${i}]`, "em-dash");
    if (outside.includes("!")) fail(`${w}.sections[${i}]`, "exclamation point outside quoted Scripture");
  }
  if (total < 900 || total > 1900) fail(w, `${total} words in all, needs 900 to 1,900`);
  for (const t of g.keyTexts || []) {
    try { passage(t); } catch (e) { fail(`${w}.keyTexts`, String(e.message || e)); }
  }
  for (const s of g.sources || []) if (!vetted.has(`${s.title}|${s.author}`)) fail(`${w}.sources`, `"${s.title}" is not in the library's existing bibliography; cite only works already vetted there, or none`);
}

if (errors.length) {
  console.error(`\nVerse guides: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`Verse guides: clean (${checked} in "${GROUP}").`);
