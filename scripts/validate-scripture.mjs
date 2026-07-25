#!/usr/bin/env node
/**
 * validate-scripture.mjs — no page renders Scripture text without saying what
 * that text is.
 *
 * CLAUDE.md: Scripture is quoted verbatim (ESV by default), the translation is
 * named when the choice is doing work, and paraphrase is offered as paraphrase.
 * The tool corpora predate that rule and mix translations silently. The fix is
 * the shared <ScriptureNote rendering="…"> component; this script is what keeps
 * the next tool from skipping it.
 *
 * The rule: if a file both (a) holds verse records — a `ref`/`reference` field
 * carrying a Book chapter:verse string — and (b) renders that record's `text`
 * into the page, it must import ScriptureNote. Files that render only the
 * reference (the assessments' "Anchored in Ephesians 4:15") are exempt: they
 * make no claim about wording, so there is nothing to label.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIR = join(ROOT, "client/src");

/** Book chapter:verse, allowing a leading ordinal (1 John 4:8). */
const VERSE_REF = /\b(?:ref|reference):\s*"[1-3]?\s?[A-Z][a-zA-Z]+\.?\s+\d+:\d+/;
/** Renders the verse text of a record into the page. */
const RENDERS_TEXT = /\{\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\.text\s*\}/;
const HAS_NOTE = /ScriptureNote/;

/**
 * Files that legitimately carry verse records and render a `.text` that is not
 * Scripture (a question, a step). Each entry needs a reason.
 */
const ALLOWLIST = new Map([
  // renders `q.text` (assessment questions) and only the scripture *reference*
  ["client/src/pages/tools/LifeAudit.tsx", "renders questions and refs only"],
  ["client/src/pages/tools/ChurchHealth.tsx", "renders questions and refs only"],
  ["client/src/pages/tools/MarriageAssessment.tsx", "renders questions and refs only"],
]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx|ts)$/.test(entry)) out.push(full);
  }
  return out;
}

const offenders = [];
for (const file of walk(SCAN_DIR)) {
  const rel = file.slice(ROOT.length).replace(/^\/+/, "");
  const src = readFileSync(file, "utf8");
  if (!VERSE_REF.test(src) || !RENDERS_TEXT.test(src)) continue;
  if (ALLOWLIST.has(rel)) continue;
  if (HAS_NOTE.test(src)) continue;
  offenders.push(rel);
}

if (offenders.length) {
  console.error(
    "[scripture] These files render verse text without a <ScriptureNote rendering=\"…\">:"
  );
  for (const o of offenders) console.error(`  - ${o}`);
  console.error(
    "\nA reader must be able to tell what the text is — a named translation, a\n" +
      "paraphrase, an abridgement, or unverified — and reach the whole passage.\n" +
      "Import ScriptureNote from @/components/ScriptureNote and render it beside\n" +
      "the verse text. If the file renders only references, add it to ALLOWLIST\n" +
      "in scripts/validate-scripture.mjs with a reason."
  );
  process.exit(1);
}

console.log("[scripture] ok — every page rendering verse text declares what it is");
