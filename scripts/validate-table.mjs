#!/usr/bin/env node
/**
 * validate-table.mjs — structural enforcement for The Table, the home
 * disciplemaking studies (client/public/table/studies/*.json). The model is
 * the living room, not the classroom, so the format is enforced, not assumed:
 *  1. slug matches the filename.
 *  2. Hub metadata is present (title, subtitle, summary, setting, forWho,
 *     rhythm, leaderNote) so every study renders as a usable session plan.
 *  3. A study has >= 4 sessions, and every session carries the full home
 *     rhythm: open, read, observe (>= 1), talk (>= 2), practice, send.
 *  4. Multiplication is non-negotiable: every session has a passItOn prompt
 *     and the study points somewhere next. A disciple makes a disciple.
 *  5. House content rules (forbidden characters and words), same as the Life
 *     and Formation libraries.
 * Run: node scripts/validate-table.mjs   (exits non-zero on failure)
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "client/public/table/studies";
const META = ["title", "subtitle", "summary", "setting", "forWho", "rhythm", "leaderNote"];
const SESSION_TEXT = ["title", "bigIdea", "scripture", "open", "read", "practice", "send", "passItOn"];
const FORBIDDEN_WORDS = ["delve","leverage","unlock","transformative","navigate","tapestry","foster","unpack","landscape","nuanced","multifaceted","authentic","journey","holistic"];
const FORBIDDEN_CHARS = [["—","em dash"],["–","en dash"],[";","semicolon"],["!","exclamation"],['"',"double quote"],["“","curly quote"],["”","curly quote"]];

function* strings(o) {
  if (typeof o === "string") yield o;
  else if (Array.isArray(o)) for (const v of o) yield* strings(v);
  else if (o && typeof o === "object") for (const v of Object.values(o)) yield* strings(v);
}

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
let failures = 0;
const fail = (f, m) => { failures++; console.error(`  FAIL ${f}: ${m}`); };

for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); }
  catch (e) { fail(f, `invalid JSON: ${e.message}`); continue; }

  if (d.slug !== slug) fail(f, `slug mismatch (file ${slug}, slug ${d.slug})`);
  for (const k of META) if (!d[k] || !String(d[k]).trim()) fail(f, `missing ${k}`);

  const sessions = Array.isArray(d.sessions) ? d.sessions : [];
  if (sessions.length < 4) fail(f, `a study needs >= 4 sessions, got ${sessions.length}`);
  sessions.forEach((s, i) => {
    const where = `session ${s.n ?? i + 1}`;
    for (const k of SESSION_TEXT) if (!s[k] || !String(s[k]).trim()) fail(f, `${where} missing ${k}`);
    if (!Array.isArray(s.observe) || s.observe.length < 1) fail(f, `${where} needs >= 1 observe question`);
    if (!Array.isArray(s.talk) || s.talk.length < 2) fail(f, `${where} needs >= 2 talk questions`);
  });

  const next = Array.isArray(d.next) ? d.next : [];
  if (next.length < 1) fail(f, `study must point somewhere next (>= 1 next link)`);
  for (const n of next) {
    if (!n.label || !n.href || !n.href.startsWith("/")) fail(f, `next link needs label + internal href: ${JSON.stringify(n)}`);
  }

  for (const str of strings(d)) {
    for (const [ch, name] of FORBIDDEN_CHARS) if (str.includes(ch)) { fail(f, `forbidden ${name}: "${str.slice(0, 50)}..."`); break; }
    for (const w of FORBIDDEN_WORDS) if (new RegExp(`\\b${w}\\b`, "i").test(str)) { fail(f, `forbidden word "${w}": "${str.slice(0, 50)}..."`); break; }
  }
}
console.log(`[validate-table] ${files.length} study(ies), ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
