/**
 * essay-text.mjs — reading a rewritten essay's Markdown the way the essay
 * gates need to: validate-essays.mjs, and the essay scope of
 * validate-grow-voice.mjs and validate-no-emdash.mjs.
 *
 * The one idea: our prose and other people's words are held to different
 * rules. A quotation is verbatim (Scripture in the ESV, or a named source) and
 * keeps its own words and punctuation (James's rule, recorded in
 * docs/work/NOTES.md on the work branch: "Verbatim quotations keep their own
 * punctuation"), so Forbidden Language, the em-dash
 * rule, and the rulebook-leakage list read only the prose around it. An
 * exclamation point may stand only inside quoted Scripture.
 *
 * A quotation is text between double quotation marks, straight or curly,
 * inside one paragraph, or a Markdown block quote (from a line that opens
 * with ">" to the end of its paragraph, as the renderer reads it). A block
 * quote's attribution line ("> — Amos 3:2") is ours, not the quotation's, so
 * it stays prose. Single quotation marks are a quotation inside a quotation
 * and need no pairing of their own.
 *
 * Scripture references are recognized by shape here (a book name from
 * client/public/bible/books.json, then chapter and verse), not parsed. The
 * shared reference parser (master plan U09) replaces SCRIPTURE_REF_SOURCE
 * with a real parse.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

// ── Scripture references, by shape ─────────────────────────────────────────
const bookNames = JSON.parse(readFileSync(join(ROOT, "client/public/bible/books.json"), "utf8")).map((b) => b.name);
const BOOKS = [...new Set([...bookNames, "Psalm", "Song of Songs"])]
  .sort((a, b) => b.length - a.length)
  .map((n) => n.replace(/ /g, "\\s"));
const VERSES = String.raw`\d{1,3}:\d{1,3}[a-c]?(?:[-–](?:\d{1,3}:)?\d{1,3}[a-c]?)?(?:,\s?\d{1,3}[a-c]?(?:[-–]\d{1,3}[a-c]?)?)*`;
const CHAPTERS = String.raw`\d{1,3}(?:[-–]\d{1,3})?`;
/** A Scripture reference by shape: "Luke 19:41–42", "1 Peter 2:9", "Psalm 23", "Hebrews 11:13, 16". */
export const SCRIPTURE_REF_SOURCE = String.raw`(?<![A-Za-z0-9])(?:${BOOKS.join("|")})\.?\s(?:${VERSES}|${CHAPTERS})(?!\d|:\d)`;
const REF = new RegExp(SCRIPTURE_REF_SOURCE);

/** Does the text carry a Scripture reference anywhere? */
export function hasScriptureRef(text) {
  return REF.test(text);
}

/** A dash typed to attribute a quotation ("— Amos 3:2"). */
const ATTRIBUTION_DASH = String.raw`(?:—|–|--)`;
/**
 * The end of a block quote that attributes it rather than quotes: a last line
 * opening with a dash ("> — Amos 3:2"), or a dash and a Scripture reference
 * closing the last line ("> … earth. — Amos 3:2").
 */
const BLOCK_ATTRIBUTION = new RegExp(
  String.raw`(?:\n[ \t]{0,3}(?:>[ \t]?)?[ \t]*${ATTRIBUTION_DASH}[^\n]*|[ \t]+${ATTRIBUTION_DASH}[ \t]*${SCRIPTURE_REF_SOURCE}[^\n]*)$`
);

/** A character-for-character copy with [start, end) blanked (newlines kept). */
function blank(chars, start, end) {
  for (let i = start; i < end; i++) if (chars[i] !== "\n") chars[i] = " ";
}

/**
 * Link targets and bare URLs blanked, so a slug or address is never read as
 * prose ("/writing/the-journey" is not the word "journey"). Link text stays.
 */
export function maskLinkTargets(text) {
  const chars = text.split("");
  for (const m of text.matchAll(/\]\((?:[^()\s]|\([^()\s]*\))*(?:\s+(?:"[^"]*"|'[^']*'))?\)/g)) blank(chars, m.index + 1, m.index + m[0].length);
  for (const m of text.matchAll(/^[ \t]*\[[^\]]+\]:[ \t]*\S+.*$/gm)) blank(chars, m.index, m.index + m[0].length);
  for (const m of text.matchAll(/<?\bhttps?:\/\/[^\s<>)]+>?/g)) blank(chars, m.index, m.index + m[0].length);
  return chars.join("");
}

/**
 * Split a text into its quotations and its own prose.
 *
 * Returns { prose, quotes, unbalanced }:
 *   prose       the text with every quotation (marks included) blanked, same length;
 *   quotes      [{ start, end, text, block }], start at the opening mark, end past the closing one;
 *   unbalanced  [index] of each quotation mark that never pairs within its paragraph.
 */
export function maskQuotations(text) {
  const chars = text.split("");
  const quotes = [];
  const unbalanced = [];
  // Paragraphs are separated by blank lines; with one capture group, split()
  // puts the separators at the odd indexes.
  const parts = text.split(/(\n[ \t\r]*\n)/);
  let offset = 0;
  for (let p = 0; p < parts.length; p++) {
    const block = parts[p];
    const base = offset;
    offset += block.length;
    if (p % 2 === 1 || !block.trim()) continue;

    // A block quote runs from a line that opens with ">" to the end of the
    // paragraph (lazy continuation lines included); it may also interrupt a
    // paragraph of prose. Someone else's words, less any attribution line.
    const bq = /(?:^|\n)[ \t]*>/.exec(block);
    const proseEnd = bq ? bq.index : block.length;
    if (bq) {
      const start = bq.index + bq[0].length - 1;
      let end = block.trimEnd().length;
      const attribution = BLOCK_ATTRIBUTION.exec(block.slice(start, end));
      if (attribution) end = start + attribution.index;
      quotes.push({ start: base + start, end: base + end, text: block.slice(start, end).replace(/^[ \t]*>[ \t]?/gm, ""), block: true });
      blank(chars, base + start, base + end);
    }

    let open = -1;
    const close = (i) => {
      quotes.push({ start: base + open, end: base + i + 1, text: block.slice(open + 1, i), block: false });
      blank(chars, base + open, base + i + 1);
      open = -1;
    };
    for (let i = 0; i < proseEnd; i++) {
      const c = block[i];
      if (c === "“") {
        if (open < 0) open = i;
        else unbalanced.push(base + i);
      } else if (c === "”") {
        if (open >= 0) close(i);
        else unbalanced.push(base + i);
      } else if (c === '"') {
        if (open < 0) open = i;
        else close(i);
      }
    }
    if (open >= 0) unbalanced.push(base + open);
  }
  return { prose: chars.join(""), quotes, unbalanced };
}

/**
 * Everything a gate needs from one field: link targets set aside, then
 * quotations. `prose` keeps every index of `text`.
 */
export function readEssayText(text) {
  return maskQuotations(maskLinkTargets(text));
}

const REF_PAREN = new RegExp(String.raw`\([^()]*${SCRIPTURE_REF_SOURCE}[^()]*\)`);
const REF_AFTER = new RegExp(String.raw`^[*_.,;:!?\s]{0,6}\(([^()]{1,80})\)`);
const REF_ATTRIBUTED = new RegExp(String.raw`^[*_.,;:!?\s]{0,6}(?:>[ \t]?)?[ \t]*${ATTRIBUTION_DASH}[ \t]*${SCRIPTURE_REF_SOURCE}`);
const REF_BEFORE = new RegExp(String.raw`${SCRIPTURE_REF_SOURCE}\)?[*_]*[,:.]?\s*[*_]*$`);

/**
 * Does a quotation carry its Scripture reference beside it? Either a
 * parenthetical reference right after the closing mark ("…" (Luke 19:41–42),
 * *"…"* (Amos 3:2)), or a reference right before the opening one
 * (Psalm 33:12: "…"). A block quote may also end on its parenthetical
 * reference. A dash attribution after it ("— Amos 3:2") names the reference
 * too, though the dash itself still fails the em-dash rule.
 */
export function hasReferenceBeside(text, quote) {
  const following = text.slice(quote.end, quote.end + 100);
  const after = following.match(REF_AFTER);
  if (after && REF.test(after[1])) return true;
  if (REF_ATTRIBUTED.test(following)) return true;
  if (REF_BEFORE.test(text.slice(Math.max(0, quote.start - 100), quote.start))) return true;
  if (quote.block) {
    const lines = quote.text.trimEnd().split("\n");
    if (REF_PAREN.test(lines[lines.length - 1])) return true;
  }
  return false;
}

// ── Dashes ──────────────────────────────────────────────────────────────────
const DASHES = [
  { kind: "em-dash", re: /—/g },
  // lib/html-body.ts normalizeEssayBody renders "word---word" as an em-dash.
  { kind: '"---" (the page renders it as an em-dash)', re: /(?<=\S)---(?=\S)/g },
];
const STAND_INS = [
  { kind: "double hyphen standing in for an em-dash", re: /(?<!-)--(?!-)/g },
  { kind: "spaced en-dash standing in for an em-dash", re: /\s–\s/g },
];

/**
 * Every em-dash in a text, as [{ index, kind }]. With standIns, also the
 * double hyphen and the spaced en-dash a writer types in its place. An
 * unspaced en-dash (1914–1918, Luke 19:41–42) is a range and never counted.
 */
export function dashesIn(text, { standIns = false } = {}) {
  const out = [];
  for (const { kind, re } of standIns ? [...DASHES, ...STAND_INS] : DASHES)
    for (const m of text.matchAll(re)) if (!out.some((d) => Math.abs(d.index - m.index) < 3)) out.push({ index: m.index, kind });
  return out.sort((a, b) => a.index - b.index);
}

/** 1-based line number of an index in a text. */
export function lineAt(text, index) {
  let n = 1;
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === "\n") n++;
  return n;
}

/** A short single-line excerpt around an index, for messages. */
export function around(text, index, width = 36) {
  return text.slice(Math.max(0, index - width), index + width).replace(/\s+/g, " ").trim();
}
