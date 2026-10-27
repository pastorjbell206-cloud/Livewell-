/**
 * Shared long-form prose rendering, so every essay, guide, and library entry
 * reads with the same editorial typography as the canonical article body.
 *
 * `<Prose>` wraps content in `.article-body` (the elite type system in
 * index.css) plus `.prose-section`, a modifier that suppresses the lead-article
 * drop cap — a drop cap belongs to the top of an article, not to every section
 * block. Plain-text fields are split into readable paragraphs (honoring real
 * breaks, else grouping sentences); pass `markdown` to render Markdown instead,
 * and `verseRefs` to make the Scripture references in it live (VerseRef).
 * VerseRef loads only when a page passes `verseRefs`; until it arrives the
 * paragraphs read as plain prose.
 */
import { lazy, Suspense } from "react";
import { Markdown } from "@/components/Markdown";
import type { VerseRefMode } from "@/components/VerseRef";

const RefText = lazy(() => import("@/components/VerseRef").then((m) => ({ default: m.RefText })));

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
  verseRefs,
}: {
  text: string;
  markdown?: boolean;
  className?: string;
  /** "sheet" on pages that quote the BSB or nothing; "link" on pages that quote the ESV. */
  verseRefs?: VerseRefMode;
}) {
  const paragraphs = markdown ? [] : toParagraphs(text);
  const plain = paragraphs.map((p, i) => <p key={i}>{p}</p>);
  return (
    <div className={`article-body prose-section ${className}`.trim()}>
      {markdown ? (
        <Markdown verseRefs={verseRefs}>{text}</Markdown>
      ) : verseRefs ? (
        <Suspense fallback={plain}>
          {paragraphs.map((p, i) => <p key={i}><RefText text={p} mode={verseRefs} /></p>)}
        </Suspense>
      ) : (
        plain
      )}
    </div>
  );
}
