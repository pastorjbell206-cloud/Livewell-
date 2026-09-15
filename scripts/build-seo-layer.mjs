#!/usr/bin/env node
/**
 * build-seo-layer.mjs — the plain-language search layer for every essay.
 *
 * The essays keep their verdict titles and James's own standfirsts. What
 * search engines and answer engines see beside them is a second layer, in
 * everyday words, that never touches the reading experience:
 *
 *   metaDescription  70 to 155 characters, whole sentences, no em-dashes, no
 *                    forbidden words. Hand-written in content/seo-overrides.json
 *                    where someone has done the work; otherwise derived from the
 *                    essay's own standfirst and opening, sentence by sentence,
 *                    so nothing is claimed that the essay does not say.
 *   qa               When the title (or a heading) is a question, the question
 *                    and the essay's own first answering paragraph, verbatim,
 *                    for QAPage structured data. Never invented.
 *   grade            Flesch-Kincaid grade of the description, so the report can
 *                    queue the ones that still read like a seminar.
 *
 * Writes content/seo-layer.generated.json (committed, like the library) and
 * docs/seo/plain-language-report.md. Run: node scripts/build-seo-layer.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.join(ROOT, "content/static-library.generated.json");
const OVERRIDES = path.join(ROOT, "content/seo-overrides.json");
const OUT = path.join(ROOT, "content/seo-layer.generated.json");
const REPORT = path.join(ROOT, "docs/seo/plain-language-report.md");

export const MIN_LEN = 70;
export const MAX_LEN = 155;

/** The CLAUDE.md forbidden words, as a single test. "Foster care" is a real noun, not the verb. */
const FORBIDDEN_RE =
  /\b(delve|delves|delving|leverage|leverages|leveraging|unlock|unlocks|unlocking|transformative|navigate|navigates|navigating|tapestry|foster|fosters|fostering|unpack|unpacks|unpacking|landscape|nuanced|multifaceted|authentic|holistic)\b/i;
export const FORBIDDEN = {
  test: text => FORBIDDEN_RE.test(String(text ?? "").replace(/\bfoster (?:care|parent|parents|parenting|child|children|family|families|home|homes|kid|kids|system|youth|mom|dad|mother|father|son|daughter)\b/gi, "")),
};

/** Markdown and typographic marks out; dashes become the comma a reader would say aloud. */
export function toPlain(text) {
  return String(text ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/\\(["'])/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s*,\s*([,.;:!?])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

const ENDS_SENTENCE = /[.!?]['"”’)]?$/;

export function sentences(text) {
  const parts = toPlain(text)
    .split(/(?<=[.!?]['"”’)]?)\s+(?=[A-Z0-9"'“‘(])/)
    .map(s => s.trim())
    .filter(Boolean);
  // Re-join splits made after an initial ("H. Richard Niebuhr"), an
  // abbreviation, or inside an open quotation, so a quoted verse travels whole.
  const out = [];
  for (const p of parts) {
    const prev = out[out.length - 1];
    if (prev && (/(^|\s)(?:[A-Z]|St|Mr|Mrs|Dr|Rev|vs|cf|etc)\.$/.test(prev) || quoteOpen(prev))) out[out.length - 1] = `${prev} ${p}`;
    else out.push(p);
  }
  return out;
}

function quoteOpen(s) {
  const straight = (s.match(/"/g) || []).length % 2 === 1;
  const curly = (s.match(/“/g) || []).length !== (s.match(/”/g) || []).length;
  return straight || curly;
}

/** The first prose paragraphs of a Markdown body: no headings, quotes, rules or images. */
export function openingParagraphs(body, n = 3) {
  const blocks = String(body ?? "").replace(/\r\n/g, "\n").split(/\n{2,}/);
  const out = [];
  for (const raw of blocks) {
    const b = raw.trim();
    if (!b || /^#{1,6}\s/.test(b) || /^\s{0,3}>/.test(b) || /^!\[/.test(b) || /^([-*_]\s*){3,}$/.test(b)) continue;
    const plain = toPlain(b);
    if (plain.length > 60) out.push(plain);
    if (out.length >= n) break;
  }
  return out;
}

export function openingParagraph(body) {
  return openingParagraphs(body, 1)[0] || "";
}

/**
 * Whole sentences up to MAX_LEN, at least MIN_LEN when the sources allow it.
 * Fragments (a truncated excerpt ending in an ellipsis) and repeats (an
 * excerpt that is the opening paragraph again) are skipped. If no run of
 * whole sentences reaches MIN_LEN, the fallback text is cut at a word.
 */
export function fitSentences(sources, fallback = "") {
  let acc = "";
  const seen = new Set();
  for (const src of sources) {
    for (const s of sentences(src)) {
      if (!ENDS_SENTENCE.test(s) || quoteOpen(s)) continue;
      const key = s.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const next = acc ? `${acc} ${s}` : s;
      if (next.length > MAX_LEN) {
        if (acc.length >= MIN_LEN) return acc;
        continue;
      }
      acc = next;
      if (acc.length > MAX_LEN - 40) return acc;
    }
  }
  if (acc.length >= MIN_LEN) return acc;
  const text = toPlain(fallback);
  if (text.length > acc.length) {
    let cut = text.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "");
    // Never end inside a quotation: back up to before the mark that opened it.
    if (quoteOpen(cut)) cut = cut.slice(0, Math.max(cut.lastIndexOf('"'), cut.lastIndexOf("“")));
    cut = cut.replace(/[,;:\s]+$/, "");
    if (cut.length >= MIN_LEN) return ENDS_SENTENCE.test(cut) ? cut : `${cut}.`;
  }
  return acc;
}

export function deriveDescription(record) {
  const openings = openingParagraphs(record.body, 3);
  return fitSentences([record.excerpt || "", ...openings], openings.join(" ") || record.excerpt || record.title);
}

/**
 * A question the essay actually asks: its title, else its first question
 * heading. The answer is the essay's own standfirst when the title is the
 * question (the standfirst is the verdict in one breath), else the paragraph
 * under the heading. Never composed.
 */
export function findQuestion(record) {
  const title = toPlain(record.title);
  if (/\?$/.test(title)) {
    const standfirst = toPlain(record.excerpt);
    const answer = standfirst.length >= 40 && ENDS_SENTENCE.test(standfirst) ? standfirst : firstAnswer(record.body, null);
    return answer ? { question: title, answer } : null;
  }
  const m = String(record.body ?? "").match(/^#{2,3}\s+(.+\?)\s*$/m);
  if (!m) return null;
  const answer = firstAnswer(record.body, m[0]);
  return answer ? { question: toPlain(m[1]), answer } : null;
}

/** The paragraph that follows a heading (or the opening, when the title is the question), whole sentences up to 600 chars. */
function firstAnswer(body, headingLine) {
  let text = String(body ?? "").replace(/\r\n/g, "\n");
  if (headingLine) {
    const i = text.indexOf(headingLine);
    if (i < 0) return "";
    text = text.slice(i + headingLine.length);
  }
  const para = openingParagraph(text);
  if (!para) return "";
  let acc = "";
  for (const s of sentences(para)) {
    const next = acc ? `${acc} ${s}` : s;
    if (next.length > 600) break;
    acc = next;
  }
  return acc || para.slice(0, 600);
}

function syllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  const groups = w.match(/[aeiouy]+/g);
  let n = groups ? groups.length : 1;
  if (w.endsWith("e") && !w.endsWith("le") && n > 1) n--;
  return Math.max(1, n);
}

/** Flesch-Kincaid grade level. */
export function readingGrade(text) {
  const plain = toPlain(text);
  const words = plain.split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  const sents = Math.max(1, (plain.match(/[.!?]+(\s|$)/g) || []).length);
  const syl = words.reduce((a, w) => a + syllables(w), 0);
  return Math.round((0.39 * (words.length / sents) + 11.8 * (syl / words.length) - 15.59) * 10) / 10;
}

export function buildLayer(records, overrides = {}) {
  const layer = {};
  const problems = [];
  for (const r of records) {
    if (!r || !r.slug || r.published === false) continue;
    const o = overrides[r.slug] || {};
    const metaDescription = o.metaDescription ? toPlain(o.metaDescription) : deriveDescription(r);
    const qa = o.question && o.answer ? { question: toPlain(o.question), answer: toPlain(o.answer) } : findQuestion(r);
    const entry = {
      metaDescription,
      source: o.metaDescription ? "hand" : "derived",
      grade: readingGrade(metaDescription),
      excerptGrade: readingGrade(r.excerpt || ""),
    };
    if (qa) entry.qa = qa;
    layer[r.slug] = entry;
    if (metaDescription.length < MIN_LEN || metaDescription.length > MAX_LEN) problems.push(`${r.slug}: description is ${metaDescription.length} chars`);
    if (FORBIDDEN.test(metaDescription)) problems.push(`${r.slug}: forbidden word in description`);
  }
  return { layer, problems };
}

export function report(layer) {
  const entries = Object.entries(layer);
  const hand = entries.filter(([, e]) => e.source === "hand").length;
  const withQa = entries.filter(([, e]) => e.qa).length;
  const avg = k => (entries.reduce((a, [, e]) => a + e[k], 0) / Math.max(1, entries.length)).toFixed(1);
  const queue = entries
    .filter(([, e]) => e.source === "derived" && e.grade >= 12)
    .sort((a, b) => b[1].grade - a[1].grade);
  const lines = [
    "# Plain-language report",
    "",
    "Generated by `scripts/build-seo-layer.mjs`. Do not edit; edit `content/seo-overrides.json` and rerun.",
    "",
    "Search engines and answer engines see a second layer beside every essay: a meta description in everyday words and, where the essay asks a question, the question with the essay's own first answer. The essay page itself is unchanged; the verdict title and James's standfirst stay as the reading experience.",
    "",
    "| Measure | Value |",
    "|---|---|",
    `| Essays with a description | ${entries.length} |`,
    `| Hand-written descriptions | ${hand} |`,
    `| Derived from the essay's own sentences | ${entries.length - hand} |`,
    `| Essays with question-and-answer data | ${withQa} |`,
    `| Average reading grade, descriptions | ${avg("grade")} |`,
    `| Average reading grade, original standfirsts | ${avg("excerptGrade")} |`,
    `| Derived descriptions at grade 12 or above (hand-rewrite queue) | ${queue.length} |`,
    "",
    "## Hand-rewrite queue",
    "",
    "Derived descriptions that still read at college level. Each is true to the essay; it is only long-winded. Add a plainer sentence for the slug in `content/seo-overrides.json`.",
    "",
    "| Essay | Grade | Current description |",
    "|---|---|---|",
    ...queue.map(([slug, e]) => `| ${slug} | ${e.grade} | ${e.metaDescription.replace(/\|/g, "/")} |`),
    "",
  ];
  return lines.join("\n");
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const records = JSON.parse(readFileSync(LIB, "utf8"));
  const overrides = existsSync(OVERRIDES) ? JSON.parse(readFileSync(OVERRIDES, "utf8")) : {};
  const unknown = Object.keys(overrides).filter(s => !records.some(r => r.slug === s));
  if (unknown.length) {
    console.error(`[seo] overrides name essays that do not exist: ${unknown.join(", ")}`);
    process.exit(1);
  }
  const { layer, problems } = buildLayer(records, overrides);
  writeFileSync(OUT, JSON.stringify(layer, null, 1) + "\n");
  mkdirSync(path.dirname(REPORT), { recursive: true });
  writeFileSync(REPORT, report(layer));
  const n = Object.keys(layer).length;
  console.log(`[seo] wrote ${n} entries to content/seo-layer.generated.json and docs/seo/plain-language-report.md`);
  if (problems.length) {
    console.error(`[seo] ${problems.length} problem(s):\n  ${problems.slice(0, 20).join("\n  ")}`);
    process.exit(1);
  }
}
