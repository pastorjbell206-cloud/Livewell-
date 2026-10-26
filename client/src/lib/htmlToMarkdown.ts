/**
 * htmlToMarkdown — some essay bodies were stored as simple HTML (the 59
 * post-Christian essays in the static library, and any database row seeded
 * from api/post-christian-articles.json or its sibling sets), while the one
 * renderer (components/Markdown.tsx) takes Markdown and escapes raw HTML. Fed
 * straight through, such an essay rendered as a single paragraph with its
 * tags printed as text.
 *
 * This converts exactly what those bodies use: p, h1 to h6, em/i, strong/b,
 * blockquote, ul/ol/li, a, br, hr, and the common entities. Any other tag is
 * dropped to its text. A body with no HTML passes through untouched, so
 * Markdown sources are never altered.
 */
const HTML_HINT = /<\/?(p|h[1-6]|em|strong|b|i|blockquote|ul|ol|li|br|hr|a)\b[^>]*>/i;

export function looksLikeHtml(s: string): boolean {
  return HTML_HINT.test(s);
}

const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", hellip: "…",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);
}

/** Inline markup inside one block: emphasis, strong, links, breaks. */
function inline(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, "  \n")
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, t) => (t.trim() ? `**${t.trim()}**` : ""))
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, t) => (t.trim() ? `*${t.trim()}*` : ""))
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => `[${t.trim()}](${href})`)
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ");
}

/** A paragraph that happens to start like Markdown syntax must stay prose. */
function escapeLeading(line: string): string {
  return line
    .replace(/^(\d+)\.(\s)/, "$1\\.$2")
    .replace(/^([#>+\-*])(\s)/, "\\$1$2");
}

export function htmlToMarkdown(input: string): string {
  if (!input || !looksLikeHtml(input)) return input;
  let s = input.replace(/\r\n?/g, "\n");

  s = s.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${"#".repeat(Number(n))} ${inline(t).trim()}\n\n`);

  s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
    const paras = inner
      .split(/<\/p>|<p\b[^>]*>/i)
      .map((p: string) => decodeEntities(inline(p)).trim())
      .filter(Boolean);
    return `\n\n${paras.map((p: string) => `> ${p}`).join("\n>\n")}\n\n`;
  });

  s = s.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, kind, inner) => {
    const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => inline(m[1]).trim());
    const lines = items.map((t, i) => (kind.toLowerCase() === "ol" ? `${i + 1}. ${t}` : `- ${t}`));
    return `\n\n${lines.join("\n")}\n\n`;
  });

  s = s.replace(/<hr\s*\/?>/gi, "\n\n---\n\n");

  s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${escapeLeading(inline(t).trim())}\n\n`);

  // Whatever markup is left (stray wrappers, unclosed tags) goes; text stays.
  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  // Whitespace between tags leaves space-only lines; blank them (lines with
  // text keep their trailing "  ", which is a Markdown line break).
  s = s.split("\n").map((l) => (l.trim() === "" ? "" : l)).join("\n");
  return s.replace(/\n{3,}/g, "\n\n").trim();
}
