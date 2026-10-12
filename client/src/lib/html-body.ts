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

/**
 * normalizeEssayBody — tidy the artifacts the Substack RSS import left in a
 * body, after any HTML conversion. The import flattened each post's header
 * image into an empty link (`[](https://substackcdn.com/…)`) or replaced it
 * with leading `---` rules, and it wrote every em dash as three hyphens
 * between words ("instability---coalition"). The essay's own text is not
 * touched beyond those three mechanical repairs.
 */
export function normalizeEssayBody(body: string): string {
  let s = htmlBodyToMarkdown(body);
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
