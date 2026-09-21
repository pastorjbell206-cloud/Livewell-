#!/usr/bin/env node
/**
 * voice-audit-record.mjs — write audit verdicts into the ledger.
 *
 * Takes a JSON file of results (an array, or {results: [...]}) where each
 * entry carries either `slug` (essays/books) or `ref` (pages/libraries) plus
 * `verdict` and `notes`, and records them against the matching ledger unit.
 * Anything that cannot be matched is reported, never silently dropped — an
 * unrecorded verdict is the exact failure the ledger exists to prevent.
 *
 *   node scripts/voice-audit-record.mjs <results.json> [--kind essay|page|book|library]
 */
import { readFileSync, writeFileSync } from "node:fs";

const LEDGER = "docs/audit-voice/ledger.json";
const file = process.argv[2];
const kindArg = (() => { const i = process.argv.indexOf("--kind"); return i > -1 ? process.argv[i + 1] : null; })();
if (!file) { console.error("usage: voice-audit-record.mjs <results.json> [--kind K]"); process.exit(1); }

const raw = JSON.parse(readFileSync(file, "utf8"));
const results = Array.isArray(raw) ? raw : raw.results ?? [];
const ledger = JSON.parse(readFileSync(LEDGER, "utf8"));
const now = new Date().toISOString();

const KINDS = kindArg ? [kindArg] : ["essay", "book", "page", "library", "stub"];
let recorded = 0;
const unmatched = [];
for (const r of results) {
  const key = r.slug ?? r.ref;
  if (!key || !r.verdict) { unmatched.push(r); continue; }
  const id = KINDS.map((k) => `${k}:${key}`).find((k) => ledger.units[k]);
  if (!id) { unmatched.push(r); continue; }
  const u = ledger.units[id];
  u.status = r.verdict;
  u.verdict = r.verdict;
  u.notes = r.notes ?? null;
  u.auditedAt = now;
  // keep the structured signals alongside the prose, for findings.md
  const extra = {};
  for (const k of ["thesis", "fragmentStacks", "notXY", "stockPhrases", "unverifiable", "selfImplication", "endingWeight", "forbiddenWords", "crisisCare"]) {
    if (r[k] !== undefined) extra[k] = r[k];
  }
  if (Object.keys(extra).length) u.signals = extra;
  recorded++;
}
writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + "\n");
console.log(`recorded ${recorded} verdicts`);
if (unmatched.length) {
  console.error(`UNMATCHED (${unmatched.length}) — these verdicts were NOT recorded:`);
  for (const r of unmatched) console.error(`  ${r.slug ?? r.ref ?? "(no key)"} → ${r.verdict ?? "(no verdict)"}`);
  process.exit(2);
}
