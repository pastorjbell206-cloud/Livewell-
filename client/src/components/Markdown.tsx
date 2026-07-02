/**
 * Markdown — the one shared markdown renderer.
 *
 * Replaces streamdown (roadmap HS-1): the site renders trusted long-form
 * prose with no raw HTML, code blocks, math, or diagrams — verified across
 * every content source — so react-markdown + remark-gfm cover everything the
 * content uses without dragging shiki, KaTeX, and mermaid into the bundle.
 * Typography comes from the surrounding scope (.article-body, .book-prose,
 * .prose), never from this component.
 */
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({
  children,
  components,
}: {
  children: string;
  /** Per-element overrides, same shape react-markdown takes. */
  components?: Components;
}) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}

export default Markdown;
