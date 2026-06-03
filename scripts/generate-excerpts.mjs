#!/usr/bin/env node
/**
 * generate-excerpts.mjs — LiveWell by James Bell
 *
 * Drafts the missing essay excerpts/deks. It does NOT invent prose: each draft
 * is derived from the essay's own opening — stripping the "From the PCN Articles
 * Library:" boilerplate and the "This article explores…" meta sentence, then
 * keeping the first one or two substantive sentences. Calm, declarative, in
 * James's voice because it IS James's words, lightly trimmed.
 *
 * Output:
 *   scripts/excerpts-draft.json  — { slug, title, excerpt, needsReview }
 *   scripts/excerpts-draft.md    — human review sheet
 * Apply to the DB later with apply-excerpts.mjs (sets posts.excerpt where empty).
 *
 * Reads scripts/content-data.json (to find which posts lack an excerpt) and the
 * dry-run corpus (for the best available body per slug).
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { auditText } from "./voice-audit.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cd = JSON.parse(readFileSync(join(__dirname, "content-data.json"), "utf8"));
const corpusPath = join(__dirname, ".essays-corpus.json");
const bodyBySlug = existsSync(corpusPath)
  ? Object.fromEntries(JSON.parse(readFileSync(corpusPath, "utf8")).map((c) => [c.slug, c.body || ""]))
  : {};

const MAX = 240;

function clean(text) {
  return text
    .replace(/^#{1,6}\s+.*$/gm, " ") // headings
    .replace(/^\s*From the PCN Articles Library:\s*/i, "") // boilerplate prefix
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(text) {
  return (text.match(/[^.!?]+[.!?]+/g) || [text]).map((s) => s.trim());
}

/** Build a 1–2 sentence dek from the body's own opening. */
function deriveExcerpt(body) {
  const text = clean(body);
  if (!text) return { excerpt: "", needsReview: true };
  const sentences = splitSentences(text).filter(
    // drop meta sentences that describe the piece rather than make its point
    (s) => !/^This (article|essay|personal essay|piece|post) (explores|examines|addresses|looks at|considers|argues|discusses|offers)/i.test(s)
  );
  let out = "";
  for (const s of sentences) {
    if (!out) out = s;
    else if ((out + " " + s).length <= MAX) out += " " + s;
    else break;
  }
  if (out.length > MAX) out = out.slice(0, MAX - 1).replace(/\s+\S*$/, "") + "…";
  // Flag if too short to be useful, or if it would reintroduce forbidden voice.
  const audit = auditText(out);
  return { excerpt: out, needsReview: out.length < 40 || audit.forbidden > 0 };
}

const missing = cd.posts.filter((p) => !p.excerpt || !p.excerpt.trim());
const drafts = missing.map((p) => {
  const body = bodyBySlug[p.slug] || p.body || "";
  const { excerpt, needsReview } = deriveExcerpt(body);
  return { slug: p.slug, title: p.title, pillar: p.pillar, excerpt, needsReview };
});

writeFileSync(join(__dirname, "excerpts-draft.json"), JSON.stringify(drafts, null, 2));

const md = ["# Draft excerpts (for review)", "", `${drafts.length} essays had no excerpt. Each draft below is derived from the essay's own opening — review/edit, then apply with apply-excerpts.mjs.`, ""];
md.push("| Essay | Draft excerpt | Review? |");
md.push("|-------|---------------|:-------:|");
for (const d of drafts) {
  md.push(`| ${d.title} | ${d.excerpt.replace(/\|/g, "\\|")} | ${d.needsReview ? "⚠️" : ""} |`);
}
writeFileSync(join(__dirname, "excerpts-draft.md"), md.join("\n"));

const flagged = drafts.filter((d) => d.needsReview).length;
console.log(`Drafted ${drafts.length} excerpts → scripts/excerpts-draft.json / .md`);
console.log(`${flagged} flagged for manual review (too short to derive).`);
console.log("\nSamples:");
for (const d of drafts.slice(0, 4)) console.log(`  • ${d.title}\n      ${d.excerpt}`);
