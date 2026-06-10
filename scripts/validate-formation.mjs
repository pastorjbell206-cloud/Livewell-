#!/usr/bin/env node
/**
 * validate-formation.mjs
 *
 * Structural enforcement of the Leadership Formation hub's governing method.
 * Every deep-formation topic in client/public/leadership/formation/*.json must
 * pass before it ships. Run:
 *
 *   node scripts/validate-formation.mjs
 *
 * What it enforces (the non-negotiables of the hub):
 *  1. The fixed eight-part order — character/formation before competence:
 *     real-question, why-it-matters, biblical-foundation, historical-witness,
 *     traditions-debates, scholarship, formation, practice.
 *  2. Every secular source carries a non-empty testedAgainstScripture.
 *  3. Contested topics (triage: "conviction") carry >= 2 views, steelmanned at
 *     genuinely equal weight: word counts within 35% of each other.
 *  4. Triage is one of: command | conviction | wisdom.
 *  5. House content rules: no em/en dashes, no semicolons, no exclamation
 *     marks, no double quotes inside values, no forbidden words.
 * Exits non-zero on any failure, so it can gate CI.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/leadership/formation";
const PART_ORDER = [
  "real-question", "why-it-matters", "biblical-foundation", "historical-witness",
  "traditions-debates", "scholarship", "formation", "practice",
];
const TRIAGE = ["command", "conviction", "wisdom"];
const FORBIDDEN_WORDS = [
  "delve", "leverage", "unlock", "transformative", "navigate", "tapestry",
  "foster", "unpack", "landscape", "nuanced", "multifaceted", "authentic",
  "journey", "holistic",
];
const FORBIDDEN_CHARS = [["—", "em dash"], ["–", "en dash"], [";", "semicolon"], ["!", "exclamation"], ['"', "double quote"], ["“", "curly quote"], ["”", "curly quote"]];

function* strings(o) {
  if (typeof o === "string") yield o;
  else if (Array.isArray(o)) for (const v of o) yield* strings(v);
  else if (o && typeof o === "object") for (const v of Object.values(o)) yield* strings(v);
}
const words = (s) => s.split(/\s+/).filter(Boolean).length;

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
let failures = 0;
const fail = (file, msg) => { failures++; console.error(`  FAIL ${file}: ${msg}`); };

for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  let d;
  try {
    d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  } catch (e) {
    fail(f, `invalid JSON: ${e.message}`);
    continue;
  }
  if (d.slug !== slug) fail(f, `slug "${d.slug}" does not match filename`);
  if (!TRIAGE.includes(d.triage)) fail(f, `triage must be one of ${TRIAGE.join("|")}, got "${d.triage}"`);
  const ids = (d.parts || []).map((p) => p.id);
  if (JSON.stringify(ids) !== JSON.stringify(PART_ORDER)) {
    fail(f, `parts must be exactly [${PART_ORDER.join(", ")}] in order, got [${ids.join(", ")}]`);
  }

  const scholarship = (d.parts || []).find((p) => p.id === "scholarship");
  for (const s of scholarship?.secular || []) {
    if (!s.testedAgainstScripture || !s.testedAgainstScripture.trim()) {
      fail(f, `secular source "${s.source}" has no testedAgainstScripture — secular wisdom ships only after it is tested`);
    }
  }

  const debates = (d.parts || []).find((p) => p.id === "traditions-debates");
  const views = debates?.views || [];
  if (d.triage === "conviction") {
    if (views.length < 2) fail(f, `conviction topics need >= 2 steelmanned views, got ${views.length}`);
    if (views.length >= 2) {
      const counts = views.map((v) => words(v.body || ""));
      const ratio = Math.max(...counts) / Math.max(1, Math.min(...counts));
      if (ratio > 1.35) fail(f, `views are not equal weight: word counts [${counts.join(", ")}] (max/min ${ratio.toFixed(2)} > 1.35)`);
    }
  }

  for (const s of strings(d)) {
    for (const [ch, name] of FORBIDDEN_CHARS) {
      if (s.includes(ch)) { fail(f, `forbidden character (${name}) in: "${s.slice(0, 60)}..."`); break; }
    }
    for (const w of FORBIDDEN_WORDS) {
      if (new RegExp(`\\b${w}\\b`, "i").test(s)) { fail(f, `forbidden word "${w}" in: "${s.slice(0, 60)}..."`); break; }
    }
  }
}

console.log(`[validate-formation] ${files.length} topic(s), ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
