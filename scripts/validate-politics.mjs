#!/usr/bin/env node
/**
 * validate-politics.mjs — CI gate for the Post-Christian World surface:
 * the nation essays, the disruption/justice topics, and the political
 * theology additions.
 *
 * This surface is the platform's most trust-sensitive, and CLAUDE.md's
 * Orthodoxy Guardrails make the rule structural, not advisory: "criticize
 * the right and the left with the same instrument and the same grief. The
 * moment the guardrail only ever fires in one political direction, it has
 * stopped being orthodoxy and become a tribe in its robes." So a topic that
 * diagnoses one side and not the other FAILS THE BUILD.
 *
 * Enforced:
 *  - nation essays: title/subtitle, >= 4 sections each >= 120 words, and
 *    >= 3 furtherReading entries carrying BOTH a title and a real author
 *    (citation integrity: this surface claims to be historical and factual).
 *  - disruption/justice topics with captureDetail: BOTH .right and .left
 *    populated, each with whatItLooksLike/inThePast/now, and the two sides'
 *    descriptions within a 55% word band (no side gets a strawman by
 *    brevity). This is the same-instrument rule, mechanized.
 *  - house style everywhere: zero exclamation points outside quoted
 *    Scripture (this corpus quotes none, so zero), zero forbidden words.
 *
 * Exits non-zero with a findings list so CI fails loudly.
 */
import fs from "node:fs";
import path from "node:path";

const PUB = path.resolve(process.cwd(), "client", "public");
const findings = [];
const note = (file, msg) => findings.push(`${file}: ${msg}`);

const FORBIDDEN_WORDS = [
  "delve", "leverage", "unlock", "transformative", "tapestry", "foster",
  "unpack", "multifaceted", "holistic",
];
// "navigate/landscape/nuanced/authentic/journey" appear legitimately in this
// corpus (a landscape of belief, navigate a conflict) and are checked by the
// broader voice-audit, not here, to avoid false positives on history prose.

const wc = (s) => String(s ?? "").trim().split(/\s+/).filter(Boolean).length;

function styleCheck(file, label, text) {
  const s = String(text ?? "");
  if (s.includes("!")) note(file, `${label}: exclamation point`);
  for (const w of FORBIDDEN_WORDS) {
    if (new RegExp(`\\b${w}\\b`, "i").test(s)) note(file, `${label}: forbidden word "${w}"`);
  }
}
function walkStrings(file, obj, trail = "") {
  if (typeof obj === "string") return styleCheck(file, trail || "(root)", obj);
  if (Array.isArray(obj)) return obj.forEach((v, i) => walkStrings(file, v, `${trail}[${i}]`));
  if (obj && typeof obj === "object")
    return Object.entries(obj).forEach(([k, v]) => walkStrings(file, v, trail ? `${trail}.${k}` : k));
}
function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch (e) { note(path.relative(PUB, p), `unparseable JSON (${e.message})`); return null; }
}

/* ---------------- nation essays ---------------- */
const NATION = path.join(PUB, "nation");
const SPECIAL = new Set(["scorecard.json", "policy.json", "index.json"]);
let nationEssays = 0;
if (fs.existsSync(NATION)) {
  for (const f of fs.readdirSync(NATION).filter((f) => f.endsWith(".json") && !SPECIAL.has(f))) {
    const rel = `nation/${f}`;
    const e = readJson(path.join(NATION, f));
    if (!e) continue;
    nationEssays++;
    for (const k of ["title", "subtitle", "sections", "furtherReading"])
      if (!(k in e)) note(rel, `missing key "${k}"`);
    const secs = Array.isArray(e.sections) ? e.sections : [];
    if (secs.length < 4) note(rel, `only ${secs.length} sections (need >= 4)`);
    secs.forEach((s, i) => {
      for (const k of ["id", "kicker", "title", "body"]) if (!(k in s)) note(rel, `sections[${i}] missing "${k}"`);
      if (wc(s.body) < 120) note(rel, `sections[${i}] body under 120 words`);
    });
    const fr = Array.isArray(e.furtherReading) ? e.furtherReading : [];
    if (fr.length < 3) note(rel, `only ${fr.length} furtherReading (need >= 3 real sources)`);
    fr.forEach((r, i) => {
      if (!r || !r.title || !r.author) note(rel, `furtherReading[${i}] needs both title and author (citation integrity)`);
    });
    walkStrings(rel, e);
  }
}

/* ---------------- disruption / justice topics (the symmetry gate) ---------------- */
for (const section of ["disruption", "justice"]) {
  const dir = path.join(PUB, section, "topics");
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const rel = `${section}/topics/${f}`;
    const t = readJson(path.join(dir, f));
    if (!t) continue;
    for (const k of ["slug", "title", "question", "whyItMatters", "furtherReading"])
      if (!(k in t)) note(rel, `missing key "${k}"`);
    const cd = t.captureDetail;
    if (cd) {
      for (const side of ["right", "left"]) {
        if (!cd[side]) { note(rel, `captureDetail missing the ${side} side — the same-instrument rule requires BOTH`); continue; }
        for (const k of ["whatItLooksLike", "inThePast", "now"])
          if (!cd[side][k]) note(rel, `captureDetail.${side} missing "${k}"`);
      }
      if (cd.right?.whatItLooksLike && cd.left?.whatItLooksLike) {
        const r = wc(cd.right.whatItLooksLike), l = wc(cd.left.whatItLooksLike);
        const max = Math.max(r, l), min = Math.min(r, l);
        if (min > 0 && (max - min) / max > 0.55)
          note(rel, `capture imbalance: right/left descriptions ${r}/${l} words differ by more than 55% — one side reads as a strawman`);
      }
    }
    const fr = Array.isArray(t.furtherReading) ? t.furtherReading : [];
    fr.forEach((r, i) => { if (r && !(r.title && r.author)) note(rel, `furtherReading[${i}] needs title and author`); });
    walkStrings(rel, t);
  }
}

/* ---------------- verdict ---------------- */
if (findings.length) {
  console.error(`[validate-politics] ${findings.length} finding(s):`);
  for (const f of findings) console.error("  - " + f);
  process.exit(1);
}
console.log(`[validate-politics] clean: ${nationEssays} nation essays + disruption/justice topics pass structure, citation, symmetry, and style.`);
