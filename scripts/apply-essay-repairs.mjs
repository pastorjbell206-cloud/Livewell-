#!/usr/bin/env node
/**
 * apply-essay-repairs.mjs — gate and apply rewritten essay bodies.
 *
 * Repair agents never edit content-data.json directly (one 3 MB file, many
 * writers). They write each repaired body to <dir>/<slug>.md. This script is
 * the only thing that moves a body into the data, and it refuses anything
 * that fails the mechanical checks the voice standard makes checkable:
 *
 *   - "Not X. Y." density: at most 3 per essay after repair
 *   - no run of 3+ consecutive one-sentence paragraphs
 *   - length within 75%–125% of the original (a rewrite that halves or
 *     doubles an essay has done something other than repair it)
 *   - every Scripture reference the original cited still appears
 *     (a repair may not quietly drop the essay's biblical spine)
 *   - no forbidden words, no stock AI turns
 *
 * Anything rejected is listed with the reason and left untouched.
 *
 *   node scripts/apply-essay-repairs.mjs <dir>            gate + apply to content-data.json
 *   node scripts/apply-essay-repairs.mjs <dir> --check    gate only, write nothing
 *
 * The production database still holds the old bodies until
 * scripts/publish-essay-repairs.mjs (DATABASE_URL) pushes the applied slugs.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const dir = process.argv[2];
const CHECK_ONLY = process.argv.includes("--check");
if (!dir || !existsSync(dir)) { console.error("usage: apply-essay-repairs.mjs <dir> [--check]"); process.exit(1); }

const DATA = "client/src/data/content-data.json";
const data = JSON.parse(readFileSync(DATA, "utf8"));
const bySlug = new Map(data.posts.map((p) => [p.slug, p]));

const words = (s) => (s || "").split(/\s+/).filter(Boolean).length;
const notXY = (s) => (s.match(/\b(?:is|was|are|were|does|did|do|has|have|had|not)\s+not\b[^.!?\n]{0,80}[.!?]\s+(?:It|That|This|They|He|She|We|There)\s+(?:is|was|are|were|does|did|do|has|have)\b/g) || []).length
  + (s.match(/(?:^|\n|\.\s+)Not\s+[^.!?\n]{2,80}\.\s+[A-Z][^.!?\n]{2,80}\./g) || []).length;
const fragmentRuns = (s) => {
  const paras = s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  let run = 0, runs = 0;
  for (const p of paras) {
    const sentences = (p.match(/[.!?](\s|$)/g) || []).length;
    if (sentences <= 1 && words(p) <= 14 && !/^#/.test(p) && !/^>/.test(p)) { run++; if (run === 3) runs++; } else run = 0;
  }
  return runs;
};
const refs = (s) => new Set((s.match(/\b(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation)\s+\d+(?::\d+)?/g) || []).map((r) => r.replace(/\s+/g, " ")));
const FORBIDDEN = /\b(delve|leverage|unlock|transformative|tapestry|unpack|multifaceted|holistic)\b|\b(in today's world|now more than ever|here's the thing|here is the thing|let that sink in|here's the truth|hold space|your truth|do the work|lean into|showing up)\b/i;

const applied = [], rejected = [];
for (const f of readdirSync(dir).filter((x) => x.endsWith(".md"))) {
  const slug = basename(f, ".md");
  const post = bySlug.get(slug);
  const body = readFileSync(join(dir, f), "utf8").replace(/^---[\s\S]*?---\s*/, "").trim();
  const why = [];
  if (!post) why.push("no such post");
  else {
    const o = post.body || "";
    const ratio = words(body) / Math.max(1, words(o));
    if (ratio < 0.75 || ratio > 1.25) why.push(`length ${Math.round(ratio * 100)}% of original`);
    const n = notXY(body); if (n > 3) why.push(`${n} "Not X. Y." turns (max 3)`);
    const fr = fragmentRuns(body); if (fr > 0) why.push(`${fr} fragment stack(s)`);
    const missing = [...refs(o)].filter((r) => !body.includes(r)); if (missing.length) why.push(`dropped Scripture refs: ${missing.slice(0, 4).join(", ")}`);
    const fw = body.match(FORBIDDEN); if (fw) why.push(`forbidden: "${fw[0]}"`);
    if (words(body) < 200) why.push("too short to be an essay");
  }
  if (why.length) { rejected.push({ slug, why }); continue; }
  if (!CHECK_ONLY) post.body = body;
  applied.push(slug);
}
if (!CHECK_ONLY && applied.length) writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
console.log(`${CHECK_ONLY ? "would apply" : "applied"}: ${applied.length}`);
if (rejected.length) { console.log(`rejected: ${rejected.length}`); for (const r of rejected) console.log(`  ${r.slug}: ${r.why.join("; ")}`); }
process.exit(rejected.length && !applied.length ? 2 : 0);
