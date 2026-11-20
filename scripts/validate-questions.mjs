#!/usr/bin/env node
/**
 * validate-questions.mjs: the apologetics library's gate (client/public/questions/).
 *
 * It applies every point of the standard that a script can check
 * (docs/work/elite/apol-library.md, section 3, the [V] items) and the house
 * rules, to every piece, pending or live:
 *
 *  1. A short answer: one paragraph, 80 to 180 words.
 *  2. The objection at its strongest, with its proponent named in it and the
 *     proponent's work (author, title, year) listed under "Read the other side".
 *  3. What is true in it (the concessions).
 *  4. The evidence, and a ledger entry that exists (the ledger file holds the
 *     heading, and the heading's block names the piece's key).
 *  5. The argument as numbered steps (at least two), a conclusion that begins
 *     "So", and the weight-bearing step marked: `weightStep` is a step's
 *     number and the text after the steps names that same step.
 *  6. The strongest reply and an answer.  7. What remains unresolved.
 *  8. Where Christians differ.
 *  9. At least two "Read the other side" and two "Read further" entries, each
 *     with a four-digit year.
 * 11. 1,800 to 2,500 words of argued prose; no em-dash; none of CLAUDE.md's
 *     Forbidden Language (scripts/lib/forbidden-language.mjs); "!" only inside
 *     quotation marks (quoted Scripture); no "debunked", "destroyed" or
 *     "so-called".
 *
 * And the library's own rules: every internal link in the prose, and every
 * Study Bible note, Honest Answer and Bible Explorer link, reaches a live page
 * (scripts/lib/site-routes.mjs); a live page never links a pending one; an
 * area's page lists exactly its pieces, under the same questions; the
 * manifest (index.json) is current; and nothing pending is linked from a page
 * outside the library, the site catalogue (menus), the sitemap, the search
 * index or llms.txt.
 *
 *   node scripts/validate-questions.mjs
 *
 * QUESTIONS_DIR points it at another copy of the data (its tests seed faults
 * in a copy and watch each one caught).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { resolveHref } from "./lib/site-routes.mjs";
import { allQuestionPaths, buildQuestionsIndex, loadQuestions, pieceProse, questionsDir } from "./lib/questions.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = questionsDir(ROOT);
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const words = (s) => String(s || "").split(/\s+/).filter(Boolean).length;
const ROLES = ["objection", "concessions", "evidence", "argument", "reply", "unresolved", "differ"];
const ORDINALS = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];
// "Debunked" and "so-called" anywhere; "destroyed" when it is said of an
// argument or a person (the older copies "weren't destroyed" is a fact).
const BANNED = /\b(debunk\w*|so-called)\b|\bdestroy\w*\s+(?:(?:the|his|her|their|this|that|an?)\s+)?(?:argument|case|claim|critic|objection|skeptic|atheist|opponent)s?\b|\b(?:argument|case|claim|critic|objection|skeptic|atheist|opponent|Ehrman)s?\s+(?:is|are|was|were|has been|have been|got|gets)\s+destroyed\b/i;

const q = loadQuestions(ROOT);
for (const p of q.problems) fail("data", p);

/** Text with everything inside quotation marks blanked, so a "!" there passes. */
const outsideQuotes = (t) => t.replace(/"[^"\n]*"/g, " ").replace(/\u201c[^\u201d\n]*\u201d/g, " ");

function houseRules(where, text) {
  if (/\u2014/.test(text)) fail(where, "has an em-dash");
  for (const m of setAsideAllowed(text).matchAll(forbiddenRe)) fail(where, `uses forbidden language "${m[0]}"`);
  if (/!/.test(outsideQuotes(text))) fail(where, `has "!" outside quoted Scripture`);
  const b = text.match(BANNED);
  if (b) fail(where, `says "${b[0]}"`);
}

/** Internal paths in prose: Markdown links and bare "(/path)". */
const pathsIn = (t) => [...String(t).matchAll(/\]\((\/[^)\s]*)\)|\((\/[a-z0-9][^)\s]*)\)/g)].map((m) => m[1] || m[2]);

const questionPaths = new Map(allQuestionPaths(ROOT).map((x) => [x.path, x.live]));

/** A link from a page (live or pending) must reach a live page, or a pending library page from a pending one. */
function checkLink(where, href, fromLive) {
  const clean = href.split("#")[0].split("?")[0].replace(/\/+$/, "");
  if (clean === "/questions" || clean.startsWith("/questions/")) {
    if (!questionPaths.has(clean)) return fail(where, `links ${href}, which the library does not have`);
    if (fromLive && !questionPaths.get(clean)) fail(where, `is live and links the pending page ${href}`);
    return;
  }
  const r = resolveHref(clean);
  if (r.status === "missing") fail(where, `links ${href}, which is not a page`);
  else if (r.status === "redirect") fail(where, `links ${href}, which redirects to ${r.to}`);
}

const yearIn = (s) => /\b(1[0-9]{3}|20[0-9]{2})\b/.test(s);
const answersSrc = fs.existsSync(path.join(ROOT, "client/src/data/answers.ts")) ? fs.readFileSync(path.join(ROOT, "client/src/data/answers.ts"), "utf8") : "";
const ledgerCache = new Map();
const readLedger = (file) => {
  if (!ledgerCache.has(file)) ledgerCache.set(file, fs.existsSync(path.join(ROOT, file)) ? fs.readFileSync(path.join(ROOT, file), "utf8") : null);
  return ledgerCache.get(file);
};

// ── areas ───────────────────────────────────────────────────────────────────
if (q.areas.length !== 10) fail("areas.json", `lists ${q.areas.length} areas, not the plan's ten`);
const seen = new Set();
for (const a of q.areas) {
  const where = `areas.json ${a.slug}`;
  if (!/^[a-z0-9-]+$/.test(a.slug || "")) fail(where, "has no plain slug");
  if (seen.has(a.slug)) fail(where, "is listed twice");
  seen.add(a.slug);
  if (!a.title) fail(where, "has no title");
  if (!["pending", "live"].includes(a.status)) fail(where, `status "${a.status}" is not pending or live`);
  if (a.live && !a.pieces.some((p) => p.live)) fail(where, "is live with no live piece");
  if (a.live && !a.page) fail(where, "is live with no area page (_area.json)");
  if (a.pieces.length && !a.page) fail(where, "has pieces but no area page (_area.json)");
  if (!a.page) continue;
  const pw = `${a.slug}/_area.json`;
  for (const k of ["title", "intro"]) if (!a.page[k]) fail(pw, `has no ${k}`);
  if (a.page.title && a.page.title !== a.title) fail(pw, "title differs from areas.json");
  const listed = (a.page.pieces || []).map((x) => x.slug);
  for (const p of a.pieces) if (!listed.includes(p.slug)) fail(pw, `does not list its piece ${p.slug}`);
  for (const x of a.page.pieces || []) {
    const p = a.pieces.find((y) => y.slug === x.slug);
    if (!p) fail(pw, `lists ${x.slug}, which has no file`);
    else if (p.question !== x.question) fail(pw, `lists ${x.slug} under a different question`);
  }
  const areaText = [a.page.intro, ...(a.page.pieces || []).map((x) => x.blurb), ...(a.page.words || []).map((w) => `${w.term} ${w.meaning}`), ...(a.page.elsewhere || [])].join("\n\n");
  houseRules(pw, areaText);
  for (const h of pathsIn(areaText)) checkLink(pw, h, a.live);
}

// ── pieces ──────────────────────────────────────────────────────────────────
for (const a of q.areas) {
  for (const p of a.pieces) {
    const where = p.file;
    if (p.area !== a.slug) fail(where, `says area "${p.area}" but sits in ${a.slug}/`);
    if (`${p.slug}.json` !== path.basename(p.file)) fail(where, `slug "${p.slug}" differs from its file name`);
    if (!["pending", "live"].includes(p.status)) fail(where, `status "${p.status}" is not pending or live`);
    if (!p.question) fail(where, "has no question");

    // 1. The short answer.
    const sa = String(p.shortAnswer || "");
    if (!sa.trim()) fail(where, "has no short answer");
    else {
      if (/\n\s*\n/.test(sa.trim())) fail(where, "short answer is more than one paragraph");
      const n = words(sa);
      if (n < 80 || n > 180) fail(where, `short answer is ${n} words (80 to 180)`);
    }

    // 2, 3, 5 to 8. The sections, each present, in the standard's order.
    const roles = (p.sections || []).map((s) => s.role);
    for (const r of ROLES) if (!roles.includes(r)) fail(where, `has no "${r}" section`);
    for (const r of roles) if (!ROLES.includes(r)) fail(where, `has a section of unknown role "${r}"`);
    const firstAt = (r) => roles.indexOf(r);
    const order = ROLES.map(firstAt).filter((i) => i >= 0);
    if (order.some((x, i) => i > 0 && x < order[i - 1])) fail(where, "sections are out of the standard's order");
    for (const s of p.sections || []) {
      if (!s.heading) fail(where, `a "${s.role}" section has no heading`);
      if (s.role !== "argument" && !String(s.body || "").trim()) fail(where, `the "${s.role}" section is empty`);
    }

    // 2. The proponent and the work.
    const src = p.objectionSource || {};
    if (!src.author || !src.title || !/^\d{4}$/.test(String(src.year))) fail(where, "objectionSource needs author, title and a four-digit year");
    else {
      const surname = src.author.split(/\s+/).pop();
      const objection = (p.sections || []).filter((s) => s.role === "objection").map((s) => s.body).join("\n");
      if (!objection.includes(surname)) fail(where, `the objection does not name its proponent (${surname})`);
      if (!(p.otherSide || []).some((e) => e.includes(src.title) && e.includes(String(src.year)))) fail(where, `"Read the other side" does not list ${src.title} (${src.year})`);
    }

    // 5. The argument.
    const arg = (p.sections || []).find((s) => s.role === "argument");
    if (arg) {
      const steps = arg.steps || [];
      if (steps.length < 2) fail(where, "the argument has fewer than two numbered steps");
      if (steps.some((t) => !String(t).trim())) fail(where, "the argument has an empty step");
      if (!/^So\b/.test(String(arg.conclusion || ""))) fail(where, `the argument's conclusion does not begin "So"`);
      const w = arg.weightStep;
      if (!Number.isInteger(w) || w < 1 || w > steps.length) fail(where, `weightStep ${w} is not one of the ${steps.length} steps`);
      else {
        const named = String(arg.after || "").match(new RegExp(`\\b(${ORDINALS.join("|")}) step\\b`, "i"));
        if (!named) fail(where, "the text after the steps does not say which step carries the weight");
        else if (ORDINALS.indexOf(named[1].toLowerCase()) + 1 !== w) fail(where, `weightStep is ${w} but the text names the ${named[1]} step`);
      }
    }

    // 4. The ledger.
    const lg = p.ledger || {};
    const ledger = lg.file ? readLedger(lg.file) : null;
    if (!ledger) fail(where, `ledger file ${lg.file || "(none)"} does not exist`);
    else if (!lg.heading || !ledger.includes(lg.heading)) fail(where, "the ledger has no such heading");
    else {
      const start = ledger.indexOf(lg.heading);
      const next = ledger.indexOf("\n# ", start + 1);
      const block = ledger.slice(start, next < 0 ? undefined : next);
      if (!lg.key || !block.includes(`"${lg.key}"`)) fail(where, `the ledger heading does not name key "${lg.key}"`);
    }

    // 9. Reading lists.
    for (const [k, label] of [["otherSide", "Read the other side"], ["further", "Read further"]]) {
      const list = p[k] || [];
      if (list.length < 2) fail(where, `"${label}" has ${list.length} entries (two at least)`);
      for (const e of list) if (!yearIn(e)) fail(where, `a "${label}" entry has no year: ${String(e).slice(0, 60)}`);
    }

    // 11. Length and the house rules.
    const prose = pieceProse(p);
    const n = words(prose.join(" "));
    if (n < 1800 || n > 2500) fail(where, `argued prose is ${n} words (1,800 to 2,500)`);
    const all = [...prose, p.question, ...(p.otherSide || []), ...(p.further || []), ...(p.onSite || []), ...(p.claims || []).map((c) => c.claim)].join("\n\n");
    houseRules(where, all);

    // Links.
    for (const h of pathsIn(all)) checkLink(where, h, p.live);
    const L = p.links || {};
    for (const n2 of L.studyNotes || []) {
      if (!fs.existsSync(path.join(ROOT, "client/public/bible/notes", n2.book, `${n2.chapter}.json`))) fail(where, `has no Study Bible note at ${n2.book} ${n2.chapter}`);
      checkLink(where, `/study/bible/${n2.book}/${n2.chapter}`, p.live);
    }
    for (const s of L.answers || []) {
      if (!answersSrc.includes(`slug: "${s}"`)) fail(where, `names the Honest Answer "${s}", which does not exist`);
    }
    if (L.explorer) checkLink(where, `/study/explorer/${L.explorer}`, p.live);
    for (const c of p.claims || []) if (!c.claim || !c.proponent || !c.work || !/^\d{4}$/.test(String(c.year))) fail(where, "a claim needs claim, proponent, work and a four-digit year");
  }
}

// ── the manifest ────────────────────────────────────────────────────────────
if (!process.env.QUESTIONS_DIR || fs.existsSync(path.join(DIR, "index.json"))) {
  let want = "";
  try { want = JSON.stringify(buildQuestionsIndex(ROOT), null, 2) + "\n"; } catch { /* unreadable files are reported above */ }
  const have = fs.existsSync(path.join(DIR, "index.json")) ? fs.readFileSync(path.join(DIR, "index.json"), "utf8") : "";
  if (want !== have) fail("index.json", "is out of date (run node scripts/build-questions-index.mjs)");
}

// ── nothing pending outside the library ─────────────────────────────────────
const pending = [...questionPaths].filter(([, live]) => !live).map(([p]) => p);
const pendingRe = pending.length
  ? new RegExp(`(?<![A-Za-z0-9_/}.-])(${pending.map((p) => p.replace(/[/-]/g, "\\$&")).join("|")})(?=["'\`#?)\\s<]|$)`, "m")
  : null;
const OWN = [/^client\/src\/pages\/questions\//, /^client\/src\/lib\/questions/, /^client\/public\/questions\//, /\.test\.tsx?$/, /^client\/src\/App\.tsx$/];
function scan(rel, abs = path.join(ROOT, rel)) {
  if (!fs.existsSync(abs)) return;
  const st = fs.statSync(abs);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(abs)) scan(path.join(rel, e), path.join(abs, e));
    return;
  }
  if (!/\.(tsx?|json|txt|xml|md|html|mjs)$/.test(rel) || OWN.some((re) => re.test(rel))) return;
  const m = pendingRe && fs.readFileSync(abs, "utf8").match(pendingRe);
  if (m) fail(rel, `links the pending page ${m[1]}`);
}
if (pendingRe && !process.env.QUESTIONS_DIR) {
  // Pages and data in the client, the site catalogue (menus) among them, and
  // the files crawlers and answer engines read.
  for (const rel of ["client/src", "client/public/sitemap.xml", "client/public/search-index.json", "client/public/llms.txt", "client/public/llms-full.txt"]) scan(rel);
}
// A test points this at a seeded file.
if (pendingRe && process.env.QUESTIONS_SCAN) scan(path.basename(process.env.QUESTIONS_SCAN), process.env.QUESTIONS_SCAN);

const pieces = q.areas.reduce((n, a) => n + a.pieces.length, 0);
const live = q.areas.reduce((n, a) => n + a.pieces.filter((p) => p.live).length, 0);
if (errors.length) {
  console.error(`[questions] ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`[questions] clean: ${q.areas.length} areas, ${pieces} pieces (${live} live, ${pieces - live} pending); nothing pending is linked from outside the library.`);
