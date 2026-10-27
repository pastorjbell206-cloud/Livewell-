/**
 * Markdown — the one shared markdown renderer.
 *
 * Replaces streamdown (roadmap HS-1): the site renders trusted long-form
 * prose with no code blocks, math, or diagrams, so react-markdown +
 * remark-gfm cover everything the content uses without dragging shiki,
 * KaTeX, and mermaid into the bundle. Raw HTML is escaped here, never
 * rendered: essay bodies stored as HTML (the post-Christian series) go
 * through lib/htmlToMarkdown.ts first.
 * Typography comes from the surrounding scope (.article-body, .book-prose,
 * .prose), never from this component.
 *
 * `verseRefs` turns the Scripture references in the text into VerseRef
 * ("sheet" opens the verse over the page; "link" goes to the Study Bible).
 * Off unless a page asks: a page that quotes the ESV uses "link" (master
 * plan 2). The remark plugin that does it lives in MarkdownVerseRefs.tsx and
 * loads only when asked for, so a page without `verseRefs` pays nothing for
 * it; until it arrives the text reads as plain prose.
 */
import { lazy, Suspense } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { VerseRefMode } from "@/components/VerseRef";

const MarkdownVerseRefs = lazy(() => import("@/components/MarkdownVerseRefs"));

export function Markdown({
  children,
  components,
  verseRefs,
}: {
  children: string;
  /** Per-element overrides, same shape react-markdown takes. */
  components?: Components;
  /** Make Scripture references live, as a verse sheet or a link to the Study Bible. */
  verseRefs?: VerseRefMode;
}) {
  const plain = (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
  if (!verseRefs) return plain;
  return (
    <Suspense fallback={plain}>
      <MarkdownVerseRefs components={components} mode={verseRefs}>
        {children}
      </MarkdownVerseRefs>
    </Suspense>
  );
}

export default Markdown;
