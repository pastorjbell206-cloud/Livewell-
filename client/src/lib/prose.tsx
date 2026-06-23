/**
 * Shared long-form prose rendering, so every essay, guide, and library entry
 * reads with the same editorial typography as the canonical article body.
 *
 * `<Prose>` wraps content in `.article-body` (the elite type system in
 * index.css) plus `.prose-section`, a modifier that suppresses the lead-article
 * drop cap — a drop cap belongs to the top of an article, not to every section
 * block. Plain-text fields are split into readable paragraphs (honoring real
 * breaks, else grouping sentences); pass `markdown` to render Markdown instead.
 */
import { Streamdown } from "streamdown";

/**
 * Turn a prose field into readable paragraphs. Honors explicit blank-line
 * breaks; when the source is one unbroken block, it groups sentences into
 * paragraphs of ~3 so the page reads like a document, not a wall.
 */
export function toParagraphs(text: string): string[] {
  const src = text ?? "";
  const explicit = src.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
  if (explicit.length > 1) return explicit;
  const single = src.trim();
  const sentences = single.match(/[^.!?]+[.!?]+(?:["”’)]+)?\s*/g);
  if (!sentences || sentences.length <= 3) return single ? [single] : [];
  const groups: string[] = [];
  let buf: string[] = [];
  for (const s of sentences) {
    buf.push(s.trim());
    if (buf.length >= 3) { groups.push(buf.join(" ")); buf = []; }
  }
  if (buf.length) {
    if (buf.length === 1 && groups.length) groups[groups.length - 1] += " " + buf[0];
    else groups.push(buf.join(" "));
  }
  return groups;
}

export function Prose({
  text,
  markdown = false,
  className = "",
}: {
  text: string;
  markdown?: boolean;
  className?: string;
}) {
  return (
    <div className={`article-body prose-section ${className}`.trim()}>
      {markdown
        ? <Streamdown>{text}</Streamdown>
        : toParagraphs(text).map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}
