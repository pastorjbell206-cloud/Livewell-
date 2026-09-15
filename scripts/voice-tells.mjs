#!/usr/bin/env node
/**
 * voice-tells.mjs — the machine tells, measured over the shipped library.
 *
 * scripts/voice-audit.mjs checks a database export against the forbidden
 * list. This runs over content/static-library.generated.json (the 678 essays
 * readers actually get) and measures the things that make prose read as
 * machine-written even when every banned word is gone:
 *
 *   forbidden   banned words in the banned sense (a quoted verse, a surname,
 *               "foster care", a study's title, and Taylor's "authenticity"
 *               as a named idea are not tells and are not counted)
 *   long        share of sentences at thirty words or more
 *   triplets    "x, y, and z" lists per thousand words (the stacked triplet)
 *   notx        "It is not X. It is Y." per thousand words (the tic)
 *   questions   rhetorical questions per thousand words
 *   hedges      "it could be argued", "in many ways", "perhaps", "I think"
 *   html        the body is HTML rather than Markdown (a batch written in
 *               another register, and it shows)
 *   firstperson whether the writer ever appears (I, my, we) — a Bell essay
 *               is always inside the indictment
 *
 * Output: docs/audit-voice/machine-tells.md (ranked) and .json (full).
 * Run: node scripts/voice-tells.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.join(ROOT, "content/static-library.generated.json");
const OUT_MD = path.join(ROOT, "docs/audit-voice/machine-tells.md");
const OUT_JSON = path.join(ROOT, "docs/audit-voice/machine-tells.json");

const FORBIDDEN =
  /\b(delve\w*|leverag\w*|unlock\w*|transformative|navigat\w*|tapestry|foster\w*|unpack\w*|landscape\w*|nuanced|multifaceted|authentic\w*|journey\w*|holistic)\b/gi;
const HEDGES = /\b(it could be argued|in many ways|perhaps|I think|arguably|to some extent|in a sense)\b/gi;
const SIGNPOSTS = /\b(here is what I mean|let me explain|here.s the thing|in today.s world|now more than ever|I want to be real with you|God.s got this|lean into|hold space|do the work|your truth|showing up|your feelings are valid)\b/gi;

/** Is this forbidden-word hit one of the honest senses? */
export function isHonestSense(word, context, essay) {
  const w = word.toLowerCase();
  const c = context.toLowerCase();
  if (w.startsWith("foster")) return /foster (care|parent|famil|child|kid|home|system|youth|mom|dad)|adopt and foster/.test(c) || /richard foster|foster,|foster's|foster wrote|foster argued|foster published|foster reopened/.test(c);
  // A literal trip (a day's journey, Merton's Asian journey) and the echo of
  // 1 Kings 19:7 ("the journey is too great") are the verse, not the metaphor.
  if (w.startsWith("journey")) return /1 kings|arise and eat|journey is too great|day's journey|days' journey|missionary journey|journey in a manner|asian journey/.test(c);
  if (w.startsWith("landscape")) return /landscape study/.test(c);
  if (w.startsWith("navigat")) return /ship|pilot|steering|sailor|nautical|social services navigator/.test(c);
  if (w.startsWith("unpack")) return /luggage|suitcase|boxes/.test(c);
  // Taylor's named idea, and an essay that takes the word itself as its subject.
  if (w.startsWith("authentic")) return /taylor|ethics of authenticity|age of authenticity|authenticat/.test(c) || /charles taylor|the word "authenticity"/.test(essay.toLowerCase());
  return false;
}

export function plainText(body) {
  return String(body ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function measure(record) {
  const text = plainText(record.body);
  const words = text.split(/\s+/).filter(Boolean);
  const wc = Math.max(1, words.length);
  const sents = text.split(/(?<=[.!?]['"”’)]?)\s+(?=[A-Z0-9"'“‘(])/).filter(s => s.trim());
  const per1k = n => Math.round((n / wc) * 1000 * 10) / 10;

  const long = sents.filter(s => s.split(/\s+/).length >= 30).length;
  const questions = sents.filter(s => /\?['"”’)]?$/.test(s.trim())).length;
  const triplets = (text.match(/\b[\w'-]+, [\w'-]+, and [\w'-]+\b/g) || []).length;
  const notx = (text.match(/\b(This|That|It|The [\w-]+) (is|was) not [^.?!]+[.] (It|This|That) (is|was) /g) || []).length;
  const hedges = (text.match(HEDGES) || []).length;
  const signposts = (text.match(SIGNPOSTS) || []).length;

  const forbidden = [];
  let m;
  FORBIDDEN.lastIndex = 0;
  while ((m = FORBIDDEN.exec(text))) {
    const ctx = text.slice(Math.max(0, m.index - 80), m.index + m[0].length + 60);
    if (!isHonestSense(m[0], ctx, text)) forbidden.push({ word: m[0], context: ctx.trim() });
  }

  const firstPerson = /\b(I|my|me|we|our|us)\b/.test(text);
  const html = /<p>|<h2>/.test(String(record.body ?? ""));

  // A blunt composite so the report can be sorted: each tell weighted by how
  // reliably it marks machine prose in this corpus.
  const score =
    forbidden.length * 6 +
    signposts * 6 +
    (long / Math.max(1, sents.length)) * 40 +
    per1k(triplets) * 2 +
    per1k(notx) * 3 +
    per1k(hedges) * 2 +
    (html ? 8 : 0) +
    (firstPerson ? 0 : 10);

  return {
    slug: record.slug,
    title: record.title,
    pillar: record.pillar,
    words: wc,
    sentences: sents.length,
    meanSentence: Math.round((wc / Math.max(1, sents.length)) * 10) / 10,
    longShare: Math.round((long / Math.max(1, sents.length)) * 1000) / 10,
    triplets: per1k(triplets),
    notx: per1k(notx),
    questions: per1k(questions),
    hedges,
    signposts,
    forbidden,
    html,
    firstPerson,
    score: Math.round(score * 10) / 10,
  };
}

export function report(rows) {
  const n = rows.length;
  const avg = k => (rows.reduce((a, r) => a + r[k], 0) / Math.max(1, n)).toFixed(1);
  const forbiddenTotal = rows.reduce((a, r) => a + r.forbidden.length, 0);
  const withForbidden = rows.filter(r => r.forbidden.length);
  const noI = rows.filter(r => !r.firstPerson);
  const html = rows.filter(r => r.html);
  const ranked = [...rows].sort((a, b) => b.score - a.score);
  const lines = [
    "# Machine tells, measured",
    "",
    "Generated by `scripts/voice-tells.mjs` over the shipped library. Do not edit; rerun.",
    "",
    "A banned word is the easiest tell to remove and the least important. These are the ones that survive a word search: sentences that never end, triplets stacked out of habit, the \"It is not X. It is Y.\" move used as a tic, hedges, and an essay in which the writer never once appears. None of this is a verdict on a piece; it is where to look first.",
    "",
    "| Measure | Value |",
    "|---|---|",
    `| Essays measured | ${n} |`,
    `| Words | ${rows.reduce((a, r) => a + r.words, 0).toLocaleString("en-US")} |`,
    `| Banned words in the banned sense | ${forbiddenTotal} in ${withForbidden.length} essays |`,
    `| Mean sentence length (words) | ${avg("meanSentence")} |`,
    `| Share of sentences at 30+ words | ${avg("longShare")}% |`,
    `| Triplets per 1,000 words | ${avg("triplets")} |`,
    `| "It is not X. It is Y." per 1,000 words | ${avg("notx")} |`,
    `| Essays where the writer never appears (no I, we, my) | ${noI.length} |`,
    `| Essays with HTML bodies (the survey batch) | ${html.length} |`,
    "",
    "## Banned words that are actually tells",
    "",
    "Quoted Scripture, surnames, \"foster care\", a study's title and Taylor's \"authenticity\" as a named idea are excluded. What is left should change.",
    "",
    "| Essay | Word | Context |",
    "|---|---|---|",
    ...withForbidden.flatMap(r => r.forbidden.map(f => `| ${r.slug} | ${f.word} | ${f.context.replace(/\|/g, "/")} |`)),
    "",
    "## The forty essays that most need a human ear",
    "",
    "Ranked by the composite. Read the top of this list aloud first.",
    "",
    "| # | Essay | Score | Mean sentence | 30+ words | Triplets /1k | Not-X /1k | Writer present | HTML |",
    "|---|---|---|---|---|---|---|---|---|",
    ...ranked.slice(0, 40).map((r, i) => `| ${i + 1} | ${r.slug} | ${r.score} | ${r.meanSentence} | ${r.longShare}% | ${r.triplets} | ${r.notx} | ${r.firstPerson ? "yes" : "no"} | ${r.html ? "yes" : ""} |`),
    "",
    "## Longest-winded, by share of sentences at thirty words or more",
    "",
    "| Essay | 30+ words | Mean sentence |",
    "|---|---|---|",
    ...[...rows].sort((a, b) => b.longShare - a.longShare).slice(0, 25).map(r => `| ${r.slug} | ${r.longShare}% | ${r.meanSentence} |`),
    "",
  ];
  return lines.join("\n");
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const records = JSON.parse(readFileSync(LIB, "utf8")).filter(r => r && r.slug && r.published !== false);
  const rows = records.map(measure);
  mkdirSync(path.dirname(OUT_MD), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(rows, null, 1) + "\n");
  writeFileSync(OUT_MD, report(rows));
  const forbidden = rows.reduce((a, r) => a + r.forbidden.length, 0);
  console.log(`[voice-tells] ${rows.length} essays measured; ${forbidden} banned words in the banned sense; report at docs/audit-voice/machine-tells.md`);
}
