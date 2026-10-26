#!/usr/bin/env node
/**
 * validate-plans.mjs — every eight-week care plan holds its shape.
 *
 *   node scripts/validate-plans.mjs           every plan and the manifest (CI gate)
 *   node scripts/validate-plans.mjs grief     only the named plans
 *
 * docs/grow/GROW-PROMPT.md 7.4 and Section 11: eight weeks, every field
 * present (focus, why, practice, a reading, a tool, a reflection question),
 * every link live and not a redirect, the forbidden language and the
 * em-dash kept out, any quoted Scripture verbatim from the BSB, and a
 * manifest (plans-index.json) that lists every plan.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { resolveHref } from "./lib/site-routes.mjs";
import { normalize } from "./lib/bsb.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const DIR = join(ROOT, "client/public/plans");
const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const errors = [];
const fail = (w, m) => errors.push(`${w}: ${m}`);

const books = JSON.parse(readFileSync(join(ROOT, "client/public/bible/books.json"), "utf8"));
let bible = "";
for (const b of books)
  for (let c = 1; c <= b.chapters; c++)
    bible += " " + JSON.parse(readFileSync(join(ROOT, "client/public/bible/ch", b.slug, `${c}.json`), "utf8")).verses.map((v) => normalize(v.t)).join(" ");

const FORBIDDEN = /\b(delve|delves|delving|leverage|unlock|unlocks|transformative|navigate|navigates|navigating|tapestry|foster|fosters|fostering|unpack|unpacking|landscape|nuanced|multifaceted|authentic|holistic|journey|journeys|hold space|your truth|do the work|your feelings are valid|lean into|showing up|in today['’]s world|now more than ever|here['’]s the thing|god['’]s got this|gospel-centered)\b/i;
const words = (s) => (typeof s === "string" ? s.split(/\s+/).filter(Boolean).length : 0);

function prose(w, text, min, max) {
  if (typeof text !== "string" || !text.trim()) return fail(w, "missing");
  const n = words(text);
  if (n < min || n > max) fail(w, `${n} words, needs ${min} to ${max}`);
  const quotes = [...text.matchAll(/[“"]([^”"]+)[”"]/g)].map((q) => q[1]);
  const outside = text.replace(/[“"][^”"]+[”"]/g, " ");
  for (const q of quotes)
    if (normalize(q).split(" ").length >= 3 && !q.split(/\s*(?:\.\.\.|…)\s*/).map(normalize).filter(Boolean).every((p) => bible.includes(p)))
      fail(w, `double quotation marks are for Scripture, and this is not verbatim BSB: "${q.slice(0, 60)}"`);
  const m = outside.match(FORBIDDEN);
  if (m) fail(w, `forbidden language "${m[1]}"`);
  if (outside.includes("—")) fail(w, "em-dash");
  if (outside.includes("!")) fail(w, "exclamation point outside quoted Scripture");
}

function link(w, item) {
  if (!item || typeof item.href !== "string" || typeof item.label !== "string" || item.label.length < 4) return fail(w, "needs a label and an href");
  prose(`${w}.label`, item.label, 2, 60);
  const r = resolveHref(item.href);
  if (r.status === "missing") fail(w, `${item.href} does not exist`);
  if (r.status === "redirect") fail(w, `${item.href} redirects to ${r.to}`);
}

const files = readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "plans-index.json");
for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  if (only.length && !only.includes(slug)) continue;
  let p;
  try { p = JSON.parse(readFileSync(join(DIR, f), "utf8")); } catch (e) { fail(f, e.message); continue; }
  if (p.slug !== slug) fail(slug, "slug does not match the file name");
  if (typeof p.title !== "string" || p.title.length > 60) fail(`${slug}.title`, "needs a title under 60 characters");
  if (typeof p.subtitle !== "string" || p.subtitle.length < 80 || p.subtitle.length > 240) fail(`${slug}.subtitle`, "needs 80 to 240 characters");
  else prose(`${slug}.subtitle`, p.subtitle, 10, 60);
  prose(`${slug}.intro`, p.intro, 100, 320);
  // The care note is for plans on heavy subjects; the lighter plans (new
  // believer, skeptic, whole life) carry none.
  if (p.careNote) prose(`${slug}.careNote`, p.careNote, 10, 70);
  if (!Array.isArray(p.weeks) || p.weeks.length !== 8) { fail(`${slug}.weeks`, "needs exactly eight weeks"); continue; }
  p.weeks.forEach((wk, i) => {
    const w = `${slug}.weeks[${i}]`;
    if (wk.n !== i + 1) fail(w, `n should be ${i + 1}`);
    prose(`${w}.focus`, wk.focus, 1, 12);
    prose(`${w}.why`, wk.why, 30, 160);
    prose(`${w}.practice`, wk.practice, 15, 100);
    link(`${w}.read`, wk.read);
    link(`${w}.tool`, wk.tool);
    prose(`${w}.reflection`, wk.reflection, 5, 45);
    if (typeof wk.reflection === "string" && !wk.reflection.trim().endsWith("?")) fail(`${w}.reflection`, "should be a question");
  });
}

if (!only.length) {
  const listed = new Set(JSON.parse(readFileSync(join(DIR, "plans-index.json"), "utf8")).plans.map((p) => p.slug));
  for (const f of files) if (!listed.has(f.replace(/\.json$/, ""))) fail("plans-index.json", `missing ${f}: run node scripts/build-plans-index.mjs`);
}

if (errors.length) {
  console.error(`\nPlans: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`Plans: clean (${only.length ? only.join(", ") : `${files.length} plans`}).`);
