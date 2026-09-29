/**
 * Render-time typographer's quotes.
 *
 * The essay libraries store straight quotes (" and ') because that is what
 * every editor and pipeline emits. A book never prints them. These helpers
 * turn them into curly quotes and apostrophes as the text is rendered, so the
 * stored content stays untouched and every source benefits at once.
 *
 * Only prose text is touched. The remark plugin walks `text` nodes and skips
 * inline code, code blocks and raw HTML entirely; link URLs live on the node's
 * `url`, not in its text, so they are never rewritten.
 */

const OPENING_CONTEXT = /[\s([{—–“‘/-]/;

/**
 * Curl the straight quotes in `text`. `prev` and `after` are the characters
 * just before and just after the text in the rendered flow (from sibling
 * nodes), so a quote that meets `*emphasis*` at a node boundary is still read
 * correctly.
 */
export function smartQuotes(text: string, prev = "", after = ""): string {
  if (!text || (text.indexOf('"') === -1 && text.indexOf("'") === -1)) return text;
  let out = "";
  let before = prev;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1] ?? after;
    // Opens after a space, bracket or dash, unless nothing follows it (an
    // interrupted quotation ends "I was—" with a closing mark).
    const opens = (before === "" || OPENING_CONTEXT.test(before)) && next !== "" && !/[\s.,;:!?)\]}]/.test(next);
    if (ch === '"') {
      out += opens ? "“" : "”";
    } else if (ch === "'") {
      // Elided years and words ('90s, 'tis) take an apostrophe, not an
      // opening single quote.
      const elision = opens && (/\d/.test(next) || /^(tis|twas|em|cause|n)\b/i.test(text.slice(i + 1)));
      out += opens && !elision ? "‘" : "’";
    } else {
      out += ch;
    }
    before = ch;
  }
  return out;
}

interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
}

/** Node types whose text must never be rewritten. */
const SKIP = new Set(["inlineCode", "code", "html", "math", "inlineMath", "yaml"]);

/** Node types that start a new run of prose: no context carries across them. */
const BLOCK = new Set(["paragraph", "heading", "listItem", "tableCell", "blockquote", "footnoteDefinition"]);

/**
 * remark plugin: curl quotes in every prose `text` node. Leaves are gathered
 * in document order first so each text node knows the character before and
 * after it within its block (a quote beside `*emphasis*` reads correctly).
 */
export function remarkSmartQuotes() {
  return (tree: MdNode) => {
    type Leaf = { node: MdNode; text: string; block: number; prose: boolean };
    const leaves: Leaf[] = [];
    let block = 0;
    const walk = (node: MdNode) => {
      if (BLOCK.has(node.type)) block++;
      if (SKIP.has(node.type)) {
        leaves.push({ node, text: node.value ?? "", block, prose: false });
      } else if (node.type === "text" && typeof node.value === "string") {
        leaves.push({ node, text: node.value, block, prose: true });
      } else if (node.type === "break") {
        leaves.push({ node, text: " ", block, prose: false });
      } else {
        node.children?.forEach(walk);
      }
      if (BLOCK.has(node.type)) block++;
    };
    walk(tree);
    leaves.forEach((leaf, i) => {
      if (!leaf.prose) return;
      const before = leaves[i - 1];
      const next = leaves[i + 1];
      const prev = before && before.block === leaf.block ? before.text.slice(-1) : "";
      const after = next && next.block === leaf.block ? next.text.charAt(0) : "";
      leaf.node.value = smartQuotes(leaf.text, prev, after);
    });
  };
}
