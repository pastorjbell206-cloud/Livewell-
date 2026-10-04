#!/usr/bin/env node
/**
 * validate-workbooks.mjs — the printable workbooks hold their shape
 * (client/public/workbooks/<id>.json, rendered by scripts/lib/workbooks.mjs).
 *
 * Checks: required fields and lengths, eight sessions or fewer, every Scripture
 * passage verbatim from the Berean Standard Bible for its reference, double
 * quotation marks reserved for Scripture, the Forbidden Language list, no
 * em-dash, no exclamation point outside Scripture, and no phone numbers (the
 * help lines print from client/src/data/crisis-resources.json).
 *
 *   node scripts/validate-workbooks.mjs        CI gate
 */
import fs from "node:fs";
import path from "node:path";
import { passage, quotesPassage } from "./lib/bsb.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const DIR = path.join(ROOT, "client/public/workbooks");
const errors = [];
const fail = (w, m) => errors.push(`${w}: ${m}`);

const FORBIDDEN = /\b(delve|delves|delving|leverage|leverages|leveraging|unlock|unlocks|unlocking|transformative|navigate|navigates|navigating|tapestry|foster|fosters|fostering|unpack|unpacks|unpacking|landscape|nuanced|multifaceted|authentic|authenticity|holistic|journey|journeys|hold space|your truth|do the work|lean into|leaning into|showing up|in today's world|now more than ever|here's the thing)\b/i;
// The ordinary noun the list does not mean (the same allowance as validate-grow-voice.mjs).
const FOSTER_CARE = /\bfoster (care|parent|parents|parenting|child|children|home|homes|family|families|system|kids?)\b/gi;
const PHONE = /\b(?:1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b|\b\d{5,6}\b/;
const words = (s) => (typeof s === "string" ? s.split(/\s+/).filter(Boolean).length : 0);

function prose(where, text, min, max) {
  if (typeof text !== "string" || !text.trim()) { if (min > 0) fail(where, "missing"); return; }
  const n = words(text);
  if (n < min || n > max) fail(where, `${n} words (needs ${min} to ${max})`);
  if (/—/.test(text)) fail(where, "em-dash");
  if (/!/.test(text)) fail(where, "exclamation point (Scripture only, in the scripture field)");
  if (/["“”]/.test(text)) fail(where, "double quotation marks are for Scripture only (use the scripture field)");
  const f = text.replace(FOSTER_CARE, " ").match(FORBIDDEN);
  if (f) fail(where, `forbidden language: "${f[1]}"`);
  const ph = text.match(PHONE);
  if (ph) fail(where, `phone number or code "${ph[0]}" (the help lines print from the verified file)`);
}

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json") : [];
for (const f of files) {
  const id = f.replace(/\.json$/, "");
  let wb;
  try { wb = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); } catch (e) { fail(f, `not valid JSON: ${e.message}`); continue; }
  if (wb.id !== id) fail(f, `id "${wb.id}" does not match the file name`);
  if (typeof wb.title !== "string" || wb.title.length < 10 || wb.title.length > 70) fail(`${id}.title`, "needs 10 to 70 characters");
  if (typeof wb.href !== "string" || !/^\/[a-z0-9/-]*$/.test(wb.href)) fail(`${id}.href`, "needs the site page the workbook goes with (a path like /help/marriage)");
  prose(`${id}.subtitle`, wb.subtitle, 8, 40);
  prose(`${id}.audience`, wb.audience, 3, 30);
  prose(`${id}.intro`, wb.intro, 120, 450);
  prose(`${id}.howToUse`, wb.howToUse, 60, 300);
  if (wb.careNote) prose(`${id}.careNote`, wb.careNote, 20, 140);
  if (wb.closing) prose(`${id}.closing`, wb.closing, 60, 350);
  if (!Array.isArray(wb.sessions) || wb.sessions.length < 3 || wb.sessions.length > 8) { fail(`${id}.sessions`, "needs 3 to 8 sessions"); continue; }
  wb.sessions.forEach((s, i) => {
    const w = `${id}.sessions[${i}]`;
    if (s.n !== i + 1) fail(w, `n should be ${i + 1}`);
    prose(`${w}.title`, s.title, 1, 12);
    prose(`${w}.why`, s.why, 80, 350);
    if (!Array.isArray(s.questions) || s.questions.length < 3 || s.questions.length > 8) fail(`${w}.questions`, "needs 3 to 8 questions");
    else s.questions.forEach((q, k) => prose(`${w}.questions[${k}]`, q, 4, 50));
    prose(`${w}.together`, s.together, 40, 250);
    prose(`${w}.practice`, s.practice, 15, 120);
    if (!Array.isArray(s.scripture) || s.scripture.length < 1 || s.scripture.length > 3) fail(`${w}.scripture`, "needs 1 to 3 passages");
    else s.scripture.forEach((v, k) => {
      const vw = `${w}.scripture[${k}]`;
      try {
        passage(v.ref);
        if (typeof v.text !== "string" || !quotesPassage(v.text, v.ref)) fail(vw, `text is not verbatim BSB for ${v.ref} (copy it from: node scripts/bsb.mjs "${v.ref}")`);
      } catch (e) {
        fail(vw, String(e.message || e));
      }
    });
  });
}

if (errors.length) {
  console.error(`\nWorkbooks: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`Workbooks: clean (${files.length} workbook${files.length === 1 ? "" : "s"}).`);
