/**
 * smartQuotes: typewriter quotation marks and apostrophes set as a printer
 * would set them. Display only. The source text (the database, the JSON
 * libraries, an essay's Markdown) keeps whatever was typed; this runs on the
 * way to the screen.
 *
 * It changes two characters and nothing else: " and '. Dashes, ellipses and
 * spacing are left exactly as written.
 *
 * `remarkSmartQuotes` is the same thing as a remark plugin for the shared
 * Markdown renderer. It walks prose text only: code, inline code and raw HTML
 * are left alone, and a link's address is never touched (only its words are).
 */

const OPENERS = new Set(["", " ", "\n", "\t", " ", "(", "[", "{", "—", "–", "-", "/", "“", "‘"]);
/** Words that begin with an apostrophe, not an opening quotation mark. */
const ELISION = /^(tis|twas|twere|til|em|cause|n)\b/i;

/**
 * Curl the quotation marks in `text`. `before` is the character that came
 * just ahead of this run of text (the end of the last inline node), so a mark
 * at the very start still opens or closes correctly.
 */
export function smartQuotes(text: string, before = ""): string {
  if (!text.includes('"') && !text.includes("'")) return text;
  let out = "";
  let prev = before;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1] ?? "";
    let put = ch;
    if (ch === '"') {
      put = OPENERS.has(prev) ? "“" : "”";
    } else if (ch === "'") {
      if (!OPENERS.has(prev)) put = "’";
      else if (/\d/.test(next) || ELISION.test(text.slice(i + 1))) put = "’";
      else put = "‘";
    }
    out += put;
    prev = put;
  }
  return out;
}

/** The few mdast fields the plugin touches. */
interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
}

const SKIP = new Set(["code", "inlineCode", "html", "definition", "yaml"]);
/** Nodes that start a fresh run of prose: a mark at their start opens. */
const BLOCKS = new Set(["root", "paragraph", "heading", "blockquote", "list", "listItem", "table", "tableRow", "tableCell", "footnoteDefinition"]);

function walk(node: MdNode, state: { prev: string }) {
  if (BLOCKS.has(node.type)) state.prev = "";
  for (const child of node.children ?? []) {
    if (child.type === "text" && typeof child.value === "string") {
      child.value = smartQuotes(child.value, state.prev);
      if (child.value) state.prev = child.value[child.value.length - 1];
    } else if (child.type === "break") {
      state.prev = "\n";
    } else if (SKIP.has(child.type)) {
      state.prev = "x";
    } else if (child.children) {
      walk(child, state);
    } else {
      state.prev = "x";
    }
  }
  if (BLOCKS.has(node.type)) state.prev = "";
}

export function remarkSmartQuotes() {
  return (tree: MdNode) => walk(tree, { prev: "" });
}
