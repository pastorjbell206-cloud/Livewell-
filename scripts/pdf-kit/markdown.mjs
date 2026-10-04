/**
 * The small Markdown subset the essay bodies and book manuscripts use, parsed
 * into blocks the kit can set: headings (## / ###), blockquotes (with an
 * optional trailing "— Source" line), bullet and numbered lists, rules, and
 * paragraphs. Inline marks (*italic*, **bold**, [links](...)) stay in the
 * text for Kit#rich.
 */

export function parseBlocks(md) {
  const blocks = [];
  const chunks = String(md || "").replace(/\r\n/g, "\n").split(/\n\s*\n/);
  for (const raw of chunks) {
    const t = raw.trim();
    if (!t) continue;
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(t)) {
      blocks.push({ type: "hr" });
      continue;
    }
    const h = t.match(/^(#{1,6})\s+(.+)$/);
    if (h && !t.includes("\n")) {
      blocks.push({ type: h[1].length <= 2 ? "h2" : "h3", text: h[2].trim(), level: h[1].length });
      continue;
    }
    if (/^>/.test(t)) {
      const lines = t.split("\n").map((l) => l.replace(/^>\s?/, ""));
      let ref = null;
      const last = lines[lines.length - 1].trim();
      if (lines.length > 1 && /^[—–-]{1,2}\s*\S/.test(last)) {
        ref = last.replace(/^[—–-]{1,2}\s*/, "");
        lines.pop();
      }
      blocks.push({ type: "quote", text: lines.join(" ").replace(/\s+/g, " ").trim(), ref });
      continue;
    }
    const lines = t.split("\n");
    if (lines.every((l) => /^\s*[-*+]\s+/.test(l))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.replace(/^\s*[-*+]\s+/, "").trim()) });
      continue;
    }
    if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
      blocks.push({ type: "ol", items: lines.map((l) => l.replace(/^\s*\d+[.)]\s+/, "").trim()) });
      continue;
    }
    blocks.push({ type: "p", text: t.replace(/\s*\n\s*/g, " ") });
  }
  return blocks;
}
