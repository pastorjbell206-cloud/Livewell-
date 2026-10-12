#!/usr/bin/env node
/**
 * validate-life.mjs — structural enforcement for Integrated Life domains
 * (client/public/life/domains/*.json). Enforces the hub's non-negotiables:
 *  1. The fixed eight-part order (formation precedes practice).
 *  2. Every secular source carries a non-empty testedAgainstScripture.
 *  3. Integration is enforced, not assumed: >= 3 connections to other
 *     domains/columns, each with a label and an internal href.
 *  4. Multi-view fairness where faithful people differ (views within 35%).
 *  5. House content rules (forbidden characters and words).
 * Run: node scripts/validate-life.mjs   (exits non-zero on failure)
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/life/domains";
const PART_ORDER = [
  "real-struggle", "why-it-matters", "biblical-vision", "historical-wisdom",
  "knowledge-tested", "where-faithful-differ", "formation", "practice",
];
const FORBIDDEN_WORDS = ["delve","leverage","unlock","transformative","navigate","tapestry","foster","unpack","landscape","nuanced","multifaceted","authentic","journey","holistic"];
const FORBIDDEN_CHARS = [["—","em dash"],["–","en dash"],[";","semicolon"],["!","exclamation"],['"',"double quote"],["“","curly quote"],["”","curly quote"]];

function* strings(o) {
  if (typeof o === "string") yield o;
  else if (Array.isArray(o)) for (const v of o) yield* strings(v);
  else if (o && typeof o === "object") for (const v of Object.values(o)) yield* strings(v);
}
const words = (s) => s.split(/\s+/).filter(Boolean).length;

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
let failures = 0;
const fail = (f, m) => { failures++; console.error(`  FAIL ${f}: ${m}`); };

for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); }
  catch (e) { fail(f, `invalid JSON: ${e.message}`); continue; }
  if (d.slug !== slug) fail(f, `slug mismatch`);
  const ids = (d.parts || []).map((p) => p.id);
  if (JSON.stringify(ids) !== JSON.stringify(PART_ORDER)) fail(f, `parts must be [${PART_ORDER.join(", ")}], got [${ids.join(", ")}]`);
  const conns = d.connections || [];
  if (conns.length < 3) fail(f, `integration is enforced: needs >= 3 connections, got ${conns.length}`);
  for (const c of conns) {
    if (!c.label || !c.href || !c.href.startsWith("/")) fail(f, `connection needs label + internal href: ${JSON.stringify(c)}`);
  }
  const kt = (d.parts || []).find((p) => p.id === "knowledge-tested");
  for (const s of kt?.secular || []) {
    if (!s.testedAgainstScripture?.trim()) fail(f, `secular source "${s.source}" missing testedAgainstScripture`);
  }
  const diff = (d.parts || []).find((p) => p.id === "where-faithful-differ");
  const views = diff?.views || [];
  if (views.length >= 2) {
    const counts = views.map((v) => words(v.body || ""));
    const ratio = Math.max(...counts) / Math.max(1, Math.min(...counts));
    if (ratio > 1.35) fail(f, `views unequal: [${counts.join(", ")}] ratio ${ratio.toFixed(2)}`);
  } else if (views.length === 1) fail(f, `where-faithful-differ has 1 view, needs >= 2 or none`);
  for (const s of strings(d)) {
    for (const [ch, name] of FORBIDDEN_CHARS) if (s.includes(ch)) { fail(f, `forbidden ${name}: "${s.slice(0, 50)}..."`); break; }
    for (const w of FORBIDDEN_WORDS) if (new RegExp(`\\b${w}\\b`, "i").test(s)) { fail(f, `forbidden word "${w}": "${s.slice(0, 50)}..."`); break; }
  }
}
// The pages that show a help block (client/src/data/sensitive-pages.json) must
// exist, and extra lines may only be named for a page that shows the block.
const SENSITIVE = JSON.parse(fs.readFileSync("client/src/data/sensitive-pages.json", "utf8"));
const slugs = new Set(files.map((f) => f.replace(/\.json$/, "")));
for (const s of SENSITIVE.life || []) if (!slugs.has(s)) fail("sensitive-pages.json", `life lists "${s}", which is not a life page`);
for (const s of Object.keys(SENSITIVE.lifeTopics || {})) if (!(SENSITIVE.life || []).includes(s)) fail("sensitive-pages.json", `lifeTopics names "${s}", which is not in life`);
console.log(`[validate-life] ${files.length} domain(s), ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
