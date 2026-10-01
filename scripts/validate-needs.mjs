#!/usr/bin/env node
/**
 * validate-needs.mjs — the needs registry and its care pages hold their shape.
 *
 *   node scripts/validate-needs.mjs           every need, the index, the crisis data (CI gate)
 *   node scripts/validate-needs.mjs anxiety   only the named needs (while writing)
 *   node scripts/validate-needs.mjs --drafts  the pages held in docs/grow/drafts/
 *                                             for James's approval (not served)
 *
 * Enforces docs/grow/CARE-PAGE-SPEC.md: required fields and word ranges for
 * every section, every Scripture passage verbatim from the Berean Standard
 * Bible for the reference it names, double quotation marks reserved for
 * Scripture, the forbidden language, no em-dash and no exclamation point
 * outside Scripture, every link live and not redirected, crisis topics on
 * every sensitive page, and a committed index that matches the need files.
 * It also checks client/src/data/crisis-resources.json: every line carries a
 * source and a verification date no older than 180 days, because a stale
 * number is a safety failure.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { passage, quotesPassage, normalize } from "./lib/bsb.mjs";
import { resolveHref } from "./lib/site-routes.mjs";
import { buildNeedsIndex, serialize } from "./build-needs-index.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const NEEDS = join(ROOT, "client/public/needs");
// Crisis pages wait in docs/grow/drafts/ until James approves their tone
// (GROW-PROMPT Section 12); they are checked by the same rules, never served.
const DRAFTS = process.argv.includes("--drafts");
const DIR = DRAFTS ? join(ROOT, "docs/grow/drafts") : NEEDS;
const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// The whole BSB, normalized, for quotations in prose that name no reference.
const books = JSON.parse(readFileSync(join(ROOT, "client/public/bible/books.json"), "utf8"));
let bible = "";
for (const b of books)
  for (let c = 1; c <= b.chapters; c++) {
    const d = JSON.parse(readFileSync(join(ROOT, "client/public/bible/ch", b.slug, `${c}.json`), "utf8"));
    bible += " " + d.verses.map((v) => normalize(v.t)).join(" ");
  }

const FORBIDDEN = [
  "delve", "delves", "delving", "leverage", "leverages", "leveraging", "unlock", "unlocks", "unlocking",
  "transformative", "navigate", "navigates", "navigating", "tapestry", "foster", "fosters", "fostering",
  "unpack", "unpacks", "unpacking", "landscape", "nuanced", "multifaceted", "authentic", "authenticity",
  "holistic", "journey", "journeys", "blessed", "in today's world", "now more than ever", "here's the thing",
  "i want to be real with you", "god's got this", "gospel-centered", "authentic community", "hold space",
  "your truth", "do the work", "your feelings are valid", "lean into", "leaning into", "showing up", "show up for",
];
const forbiddenRe = new RegExp(`\\b(${FORBIDDEN.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "['’]")).join("|")})\\b`, "i");
const PHONE = /\b(?:1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b|\b\d{5,6}\b/;
const STATES = new Set(["crisis", "carrying", "grow", "helping", "leading"]);
const SENS = new Set(["crisis", "high", "ordinary"]);
const TOPICS = new Set(["suicide", "abuse", "sexual-assault", "substance"]);
const KINDS = new Set(["Plan", "Self-check", "Tool", "Study guide", "Life", "How-to", "Wisdom", "Essay", "Pathway", "Page"]);

const words = (s) => (typeof s === "string" ? s.split(/\s+/).filter(Boolean).length : 0);

/** Prose rules shared by every text field. Returns the word count. */
function prose(where, text, min = 0, max = Infinity) {
  if (typeof text !== "string" || !text.trim()) {
    if (min > 0) fail(where, "missing");
    return 0;
  }
  const n = words(text);
  if (n < min) fail(where, `${n} words, needs at least ${min}`);
  if (n > max) fail(where, `${n} words, allows at most ${max}`);
  if (/^\s*([-*•]|\d+\.)\s/m.test(text)) fail(where, "list inside prose (lists belong in list fields)");
  if (/^\s*#/m.test(text)) fail(where, "heading inside prose (the page supplies headings)");
  const quotes = [...text.matchAll(/[“"]([^”"]+)[”"]/g)].map((q) => q[1]);
  const outside = text.replace(/[“"][^”"]+[”"]/g, " ");
  for (const q of quotes) {
    const nq = normalize(q);
    if (nq.split(" ").length >= 3 && !q.split(/\s*(?:\.\.\.|…)\s*/).map(normalize).filter(Boolean).every((p) => bible.includes(p)))
      fail(where, `double quotation marks are for Scripture, and this is not verbatim BSB: "${q.slice(0, 70)}"`);
  }
  const short = quotes.filter((q) => normalize(q).split(" ").length < 3).join(" ");
  const m = `${outside} ${short}`.match(forbiddenRe);
  if (m) fail(where, `forbidden language "${m[1]}"`);
  if (outside.includes("!")) fail(where, "exclamation point outside quoted Scripture");
  if (/[\u2014]/.test(outside)) fail(where, "em-dash (use a comma, colon, parentheses, or a new sentence)");
  if (/ -- /.test(outside)) fail(where, "double hyphen used as a dash");
  const phone = outside.replace(/\b(988|911)\b/g, "").match(PHONE);
  if (phone) fail(where, `phone number or code "${phone[0]}" in prose (numbers live in crisis-resources.json)`);
  for (const l of text.matchAll(/\]\((\/[^)\s]*)\)/g)) link(where, l[1]);
  return n;
}

function link(where, href) {
  // Off-site links are allowed where a need's home has moved (the Pastors
  // Connection Network); they are not resolved here.
  if (typeof href === "string" && /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/|$)/.test(href)) return;
  if (typeof href !== "string" || !href.startsWith("/")) return fail(where, `link must be an internal path, got ${JSON.stringify(href)}`);
  const r = resolveHref(href);
  if (r.status === "missing") fail(where, `link ${href} does not exist`);
  if (r.status === "redirect") fail(where, `link ${href} redirects to ${r.to}; link the destination`);
}

function linkItem(where, it, needKind = false) {
  if (!it || typeof it !== "object") return fail(where, "missing");
  link(where, it.href);
  if (typeof it.label !== "string" || it.label.length < 4) fail(where, "label missing");
  else prose(`${where}.label`, it.label);
  if (needKind && !KINDS.has(it.kind)) fail(where, `kind must be one of ${[...KINDS].join(", ")}`);
}

function list(where, arr, min, max, each) {
  if (!Array.isArray(arr)) return fail(where, "must be a list");
  if (arr.length < min || arr.length > max) fail(where, `${arr.length} items, needs ${min} to ${max}`);
  arr.forEach((x, i) => each(`${where}[${i}]`, x));
}

function checkRegistry(n, where) {
  if (typeof n.title !== "string" || n.title.length < 6 || n.title.length > 60) fail(`${where}.title`, "needs 6 to 60 characters");
  else prose(`${where}.title`, n.title);
  if (typeof n.summary !== "string" || n.summary.length < 40 || n.summary.length > 160) fail(`${where}.summary`, "needs 40 to 160 characters");
  else prose(`${where}.summary`, n.summary);
  if (!Array.isArray(n.askedAs) || n.askedAs.length < (n.page ? 6 : 3) || n.askedAs.length > 16) fail(`${where}.askedAs`, `needs ${n.page ? 6 : 3} to 16 phrases`);
  if (!Array.isArray(n.states) || !n.states.length || n.states.some((s) => !STATES.has(s))) fail(`${where}.states`, `each must be one of ${[...STATES].join(", ")}`);
  if (!SENS.has(n.sensitivity)) fail(`${where}.sensitivity`, "must be crisis, high, or ordinary");
  if (n.sensitivity !== "ordinary" && (!Array.isArray(n.crisisTopics) || !n.crisisTopics.length)) fail(`${where}.crisisTopics`, "required for crisis and high needs");
  if (n.crisisTopics && n.crisisTopics.some((t) => !TOPICS.has(t))) fail(`${where}.crisisTopics`, `each must be one of ${[...TOPICS].join(", ")}`);
  if (typeof n.rank !== "number") fail(`${where}.rank`, "needs the demand-map rank (a number)");
}

function checkStarter(n, where) {
  checkRegistry(n, where);
  if (!n.kit || !Array.isArray(n.kit.read)) return fail(`${where}.kit.read`, "a starter lists where to begin");
  list(`${where}.kit.read`, n.kit.read, 2, 10, (w, it) => linkItem(w, it, true));
}

function checkPage(n, where) {
  checkRegistry(n, where);
  if (typeof n.seoTitle !== "string" || n.seoTitle.length > 60 || n.seoTitle.length < 20) fail(`${where}.seoTitle`, "needs 20 to 60 characters");
  if (typeof n.description !== "string" || n.description.length < 120 || n.description.length > 160) fail(`${where}.description`, `needs 120 to 160 characters (has ${n.description?.length ?? 0})`);
  else prose(`${where}.description`, n.description);

  let total = 0;
  const answer = prose(`${where}.answer`, n.answer, 60, 160);
  total += answer;
  total += prose(`${where}.happening`, n.happening, 350, 700);

  const s = n.scripture || {};
  total += prose(`${where}.scripture.intro`, s.intro, 40, 120);
  list(`${where}.scripture.passages`, s.passages, 3, 6, (w, p) => {
    try {
      passage(p.ref);
      if (typeof p.text !== "string" || !quotesPassage(p.text, p.ref)) fail(w, `text is not verbatim BSB for ${p.ref} (copy it from: node scripts/bsb.mjs "${p.ref}")`);
    } catch (e) {
      fail(w, String(e.message || e));
    }
    total += words(p.text);
    total += prose(`${w}.reading`, p.reading, 80, 220);
  });

  total += prose(`${where}.whyHard`, n.whyHard, 450, 900);

  const t = n.thisWeek || {};
  total += prose(`${where}.thisWeek.intro`, t.intro, 30, 100);
  list(`${where}.thisWeek.steps`, t.steps, 4, 7, (w, st) => {
    total += prose(`${w}.title`, st?.title, 2, 12);
    total += prose(`${w}.body`, st?.body, 40, 150);
  });

  const h = n.moreHelp || {};
  total += prose(`${where}.moreHelp.body`, h.body, 150, 450);
  list(`${where}.moreHelp.signs`, h.signs, 3, 8, (w, x) => { total += prose(w, x, 4, 40); });
  total += prose(`${where}.moreHelp.firstCall`, h.firstCall, 50, 160);
  total += prose(`${where}.moreHelp.cost`, h.cost, 40, 160);

  const hp = n.helping || {};
  total += prose(`${where}.helping.body`, hp.body, 150, 400);
  list(`${where}.helping.say`, hp.say, 3, 6, (w, x) => { total += prose(w, x, 2, 40); });
  list(`${where}.helping.dontSay`, hp.dontSay, 3, 6, (w, x) => { total += prose(w, x, 2, 40); });
  total += prose(`${where}.helping.next`, hp.next, 40, 150);

  total += prose(`${where}.prayer`, n.prayer, 80, 250);

  const k = n.kit || {};
  for (const one of ["plan", "selfCheck", "tool"]) if (k[one]) linkItem(`${where}.kit.${one}`, k[one]);
  if (k.guides) list(`${where}.kit.guides`, k.guides, 0, 6, (w, it) => linkItem(w, it));
  list(`${where}.kit.read`, k.read, 3, 12, (w, it) => linkItem(w, it, true));

  list(`${where}.faq`, n.faq, 5, 10, (w, f) => {
    total += prose(`${w}.q`, f?.q, 3, 24);
    total += prose(`${w}.a`, f?.a, 60, 200);
  });

  const [lo, hi] = n.sensitivity === "crisis" ? [1200, 3000] : [2500, 4500];
  if (total < lo || total > hi) fail(where, `${total} words in all, needs ${lo} to ${hi}`);
  if (words(n.title) + answer > 200) fail(where, "title and answer run past the first screen");

  // A partial run may be checking one page before its neighbors exist.
  if (n.related && !only.length) for (const r of n.related) if (!existsSync(join(NEEDS, `${r}.json`))) fail(`${where}.related`, `no need "${r}"`);
  if (n.sources) list(`${where}.sources`, n.sources, 0, 20, (w, src) => {
    if (!src?.claim || !src?.cite || !/^https:\/\//.test(src?.url || "")) fail(w, "needs claim, cite, and an https url");
  });
  if (!n.reviewed || !/^\d{4}-\d{2}-\d{2}$/.test(n.reviewed.on || "") || !n.reviewed.notes) fail(`${where}.reviewed`, "needs the review date and notes");
  return total;
}

// --- the need files -------------------------------------------------------
const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json") : [];
const counted = [];
for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  if (only.length && !only.includes(slug)) continue;
  let n;
  try { n = JSON.parse(readFileSync(join(DIR, f), "utf8")); } catch (e) { fail(f, `not valid JSON: ${e.message}`); continue; }
  if (n.slug !== slug) fail(f, `slug "${n.slug}" does not match the file name`);
  if (n.page === true) counted.push([slug, checkPage(n, slug)]);
  else checkStarter(n, slug);
}

// --- the index and the crisis data (full runs only) -----------------------
if (!only.length && !DRAFTS) {
  const committed = existsSync(join(DIR, "index.json")) ? readFileSync(join(DIR, "index.json"), "utf8") : "";
  if (committed !== serialize(buildNeedsIndex())) fail("index.json", "out of date: run node scripts/build-needs-index.mjs");

  const crisis = JSON.parse(readFileSync(join(ROOT, "client/src/data/crisis-resources.json"), "utf8"));
  const checked = new Date(crisis.checked);
  const ageDays = (Date.now() - checked.getTime()) / 864e5;
  if (!(ageDays >= 0) || ageDays > 180) fail("crisis-resources.json", `checked ${crisis.checked}: re-verify every line on its official site and update the date (older than 180 days)`);
  for (const r of crisis.resources || []) {
    const w = `crisis-resources.json ${r.id}`;
    if (!r.name || !r.for || !Array.isArray(r.actions) || !r.actions.length) fail(w, "needs name, for, and actions");
    if (!/^https:\/\//.test(r.source || "")) fail(w, "needs the official source url");
    if (!Array.isArray(r.topics) || !r.topics.length) fail(w, "needs topics");
    for (const a of r.actions || []) {
      if (!["call", "text", "chat"].includes(a.kind)) fail(w, `action kind ${a.kind}`);
      if (a.kind === "call" && !/^tel:\+?\d+$/.test(a.href)) fail(w, `call href ${a.href}`);
      if (a.kind === "text" && !/^sms:\d+/.test(a.href)) fail(w, `text href ${a.href}`);
      if (a.kind === "chat" && !/^https:\/\//.test(a.href)) fail(w, `chat href ${a.href}`);
    }
  }
}

if (errors.length) {
  console.error(`\nNeeds: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("\nSee docs/grow/CARE-PAGE-SPEC.md.\n");
  process.exit(1);
}
const pages = counted.map(([s, n]) => `${s} ${n}w`).join(", ");
console.log(`Needs: clean (${only.length ? only.join(", ") : `${files.length} needs`}${pages ? `; pages: ${pages}` : ""}).`);
