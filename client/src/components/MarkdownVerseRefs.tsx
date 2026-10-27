/**
 * Markdown with its Scripture references made live: the body of
 * `<Markdown verseRefs>`, in its own module so the reference finder, the book
 * table, and the verse sheet load only on a page that asks for them. Markdown
 * pages that do not ask (essays, books, care pages) never download any of it.
 *
 * The remark plugin is in-house, with no dependency beyond the parser the site
 * already has: each prose text node is cut at its references, and a reference
 * becomes a <verse-ref> element that renders as VerseRef. Text inside a link,
 * code, or a heading is left as written.
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

export default function MarkdownVerseRefs({
  children,
  components,
  mode,
}: {
  children: string;
  components?: Components;
  mode: VerseRefMode;
}) {
  const all = useMemo(() => ({ ...components, "verse-ref": REF_NODES[mode] }) as Components, [components, mode]);
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkVerseRefs]} components={all}>
      {children}
    </ReactMarkdown>
  );
}
