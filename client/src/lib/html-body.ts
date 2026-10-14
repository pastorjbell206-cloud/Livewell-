/**
 * htmlBodyToMarkdown — normalize an essay body that was stored as HTML.
 *
 * `posts.body` is Markdown, and the shared Markdown renderer deliberately has
 * no raw-HTML support, so an HTML body renders as literal "<p>…</p>" text. One
 * import batch (the 2026-07-08 rows) wrote clean, attribute-free HTML using a
 * small tag set: p, h2, em, strong, blockquote. This converts that subset to
 * Markdown so those essays get real paragraphs, headings, pull-quotes and the
 * contents list. Markdown bodies (anything not opening with a block tag) are
 * returned untouched. Unknown tags pass through unchanged.
 */

const BR = "\u0001";
const HTML_BODY = /^\s*<(p|h[1-6]|blockquote|div)\b[^>]*>/i;

export function isHtmlBody(body: string): boolean {
  return HTML_BODY.test(body);
}

/** Whitespace inside an HTML block collapses to single spaces. */
function collapse(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** A paragraph that happens to begin like Markdown syntax must stay prose. */
function escapeLineStart(text: string): string {
  return text.replace(/^(\d+)([.)]) /, "$1\\$2 ").replace(/^([-+*#>]) /, "\\$1 ");
}

/** Wrap inline content in a marker, keeping edge whitespace outside it. */
function wrap(marker: string, inner: string): string {
  const m = inner.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!m || !m[2]) return inner;
  return `${m[1]}${marker}${m[2]}${marker}${m[3]}`;
}

export function htmlBodyToMarkdown(body: string): string {
  if (!isHtmlBody(body)) return body;
  let s = body.replace(/\r\n?/g, "\n");
  // A sentinel survives the whitespace collapse; it becomes a hard break below.
  s = s.replace(/<br\s*\/?>/gi, BR);
  s = s.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, inner) => wrap("**", inner));
  s = s.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, inner) => wrap("*", inner));
  s = s.replace(
    /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
    (_, level, inner) => `\n\n${"#".repeat(Number(level))} ${collapse(inner)}\n\n`
  );
  s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner: string) => {
    const paras = inner
      .split(/<\/?p\b[^>]*>/i)
      .map(collapse)
      .filter(Boolean);
    return `\n\n${paras.map(p => `> ${p}`).join("\n>\n")}\n\n`;
  });
  s = s.replace(
    /<p\b[^>]*>([\s\S]*?)<\/p>/gi,
    (_, inner) => `\n\n${escapeLineStart(collapse(inner))}\n\n`
  );
  return s
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .replace(new RegExp(` ?${BR} ?`, "g"), "\\\n");
}

/** A Scripture reference as the imports print it: "Jeremiah 17:9", "1 John 1:8", "Isaiah 8:12–13". */
const REF = String.raw`(?:[1-3][ \t]?)?[A-Z][a-z]+\.?[ \t]\d+:\d+(?:[–-]\d+)?`;

/**
 * Mechanical repairs for the shapes the Substack and chapter imports broke.
 * Each one restores structure the source had; none changes a word.
 *
 *   - "• • •" ornaments (often wrapped in stray ** that then bolded a whole
 *     section) become a plain section break;
 *   - a "##" heading glued to the end of the previous sentence starts its
 *     own line, and an empty "##" is dropped;
 *   - a chapter's section titles set as bold numbered lines
 *     ("**I. What We Get Wrong About Evil**") become real headings, so the
 *     contents list finds them and the drop cap lands on prose;
 *   - a "> quote" line followed directly by a paragraph ends the quote there,
 *     instead of the quote swallowing the commentary after it;
 *   - several verses run together in one quote ("…it?”— Jeremiah 17:9“These
 *     people…") are set one per paragraph;
 *   - paragraphs the import fused at the period ("altered.Before that edict")
 *     are parted again.
 */
function repairImportedStructure(input: string): string {
  let s = input.replace(/\r\n?/g, "\n");
  s = s.replace(/\**[ \t]*•[ \t]*•[ \t]*•[ \t]*\**/g, "\n\n---\n\n");
  s = s.replace(/([.!?”"’)*_])[ \t]*(#{2,6}[ \t]+\S)/g, "$1\n\n$2");
  s = s.replace(/^#{1,6}[ \t]*$/gm, "");
  s = s.replace(/^\*\*((?:[IVXLC]+|\d{1,2})\.[ \t]+[^*\n]{2,120}?)\*\*[ \t]*$/gm, "## $1");
  s = s.replace(new RegExp(`([.!?”’"])\\((?=${REF}\\))`, "g"), "$1 (");
  s = s
    .split("\n")
    .map((line) => {
      if (/^>/.test(line)) return line.replace(new RegExp(`(—[ \\t]*${REF})(?=“)`, "g"), "$1\n>\n> ");
      if (/^#|https?:|\]\(/.test(line)) return line;
      // A lowercase word fused to a capital ("altered.Before"), or a proper noun
      // fused to a common sentence opener ("Empire.For many"). "Life.Church"
      // and the like are left alone.
      return line
        .replace(/(?<![A-Za-z])([a-z]{2,}[.!?][”’"]?)(?=[A-Z][a-z’']|[A-Z][ \t]|“[A-Z])/g, "$1\n\n")
        .replace(/(?<![A-Za-z])([A-Z][a-z]+[.!?][”’"]?)(?=(?:A|An|And|As|But|By|For|He|If|In|It|No|Not|Of|On|Our|Set|She|So|That|The|Their|There|They|This|To|We|What|When|Yet)[ \t,])/g, "$1\n\n");
    })
    .join("\n");
  s = s.replace(/^(>[^\n]*)\n(?=[^>\n])/gm, "$1\n\n");
  return s.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "");
}

/**
 * normalizeEssayBody — tidy the artifacts the Substack RSS import left in a
 * body, after any HTML conversion. The import flattened each post's header
 * image into an empty link (`[](https://substackcdn.com/…)`) or replaced it
 * with leading `---` rules, and it wrote every em dash as three hyphens
 * between words ("instability---coalition"). It also broke some structure
 * (see repairImportedStructure). The essay's own words are not touched.
 */
export function normalizeEssayBody(body: string): string {
  let s = repairImportedStructure(htmlBodyToMarkdown(body));
  // Leading empty image links and thematic breaks, in any order.
  for (;;) {
    const next = s.replace(/^\s*(?:\[\]\([^)\s]*\)|-{3,}|\*{3,}|_{3,})[ \t]*(?:\r?\n|$)/, "");
    if (next === s) break;
    s = next;
  }
  // "word---word" is the import's spelling of an em dash.
  s = s.replace(/(\S)---(?=\S)/g, "$1—");
  return s.trimStart();
}

const plainTitle = (t: string) => t.toLowerCase().replace(/&[a-z#0-9]+;/g, " ").replace(/[^a-z0-9]+/g, " ").trim();

/**
 * The page sets the essay's title as its own H1, so a body that opens by
 * repeating it (an H1, or any heading with the title's words) drops that
 * line. A body that opens with a real section heading keeps it.
 */
export function stripDuplicateTitle(body: string, title: string): string {
  const m = body.match(/^\s*(#{1,6})[ \t]+(.*?)[ \t#]*(?:\n+|$)/);
  if (!m) return body;
  return m[1] === "#" || plainTitle(m[2]) === plainTitle(title) ? body.slice(m[0].length) : body;
}

/**
 * Whether the opening paragraph can carry the drop cap: real prose, not a
 * one-line epigraph or a line set wholly in bold or italics (a giant initial
 * beside a short emphasized line reads as a mistake).
 */
export function opensWithProse(markdown: string): boolean {
  const first = markdown
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .find((b) => b && !/^(?:#|>|[-*_]{3,}$|[-*+][ \t]|\d+[.)][ \t]|!\[|\|)/.test(b));
  if (!first) return false;
  if (/^(\*{1,3}|_{1,3})[\s\S]*\1$/.test(first)) return false;
  return first.length >= 140;
}
