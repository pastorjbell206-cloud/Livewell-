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
 * plan 2), and text already inside a link, code, or a heading is left alone.
 */
import { useMemo, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { VerseRef, type VerseRefMode } from "@/components/VerseRef";
import { splitScriptureRefs } from "@/lib/scripture-find";

/** The few mdast fields the plugin touches. */
interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
  data?: Record<string, unknown>;
}

/** Nodes whose text is not running prose: a reference there stays as written. */
const LEAVE = new Set(["link", "linkReference", "definition", "heading", "code", "inlineCode", "html"]);

/** Cut each prose text node at its references; a reference becomes a <verse-ref> element. */
function markRefs(node: MdNode) {
  if (!node.children) return;
  const next: MdNode[] = [];
  for (const child of node.children) {
    if (child.type === "text" && child.value) {
      const parts = splitScriptureRefs(child.value);
      if (parts.length === 1 && typeof parts[0] === "string") {
        next.push(child);
        continue;
      }
      for (const part of parts) {
        next.push(
          typeof part === "string"
            ? { type: "text", value: part }
            : { type: "text", value: part.text, data: { hName: "verse-ref", hProperties: { reference: part.reference } } },
        );
      }
      continue;
    }
    if (!LEAVE.has(child.type)) markRefs(child);
    next.push(child);
  }
  node.children = next;
}

/** The in-house remark plugin: no dependency beyond the parser the site already has. */
function remarkVerseRefs() {
  return (tree: MdNode) => markRefs(tree);
}

const refNode = (mode: VerseRefMode) =>
  function VerseRefNode({ reference, children }: { reference?: string; children?: ReactNode }) {
    return (
      <VerseRef reference={reference ?? ""} mode={mode}>
        {children}
      </VerseRef>
    );
  };
const REF_NODES: Record<VerseRefMode, ReturnType<typeof refNode>> = { sheet: refNode("sheet"), link: refNode("link") };

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
  const all = useMemo(
    () => (verseRefs ? ({ ...components, "verse-ref": REF_NODES[verseRefs] } as Components) : components),
    [components, verseRefs],
  );
  return (
    <ReactMarkdown remarkPlugins={verseRefs ? [remarkGfm, remarkVerseRefs] : [remarkGfm]} components={all}>
      {children}
    </ReactMarkdown>
  );
}

export default Markdown;
