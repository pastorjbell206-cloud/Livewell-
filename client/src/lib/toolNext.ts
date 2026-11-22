/**
 * Where a tool sends a reader next, chosen from what the reader picked or
 * answered in it (client/src/data/tool-next.json). A tool's address takes its
 * one name from lib/toolsList.ts; any other page carries its own name in the
 * file. The steps are the shape components/tool-shell's ResultNext draws.
 */
import data from "@/data/tool-next.json";
import type { NextStep } from "@/components/tool-shell/Result";
import { toolByHref } from "./toolsList";

type Row = string | { kind: string; label: string; href: string };

export const TOOL_NEXT: Record<string, Record<string, Row[]>> = data.tools;

/** The next pages for a tool, for the reader's choice (`key`), or the tool's default list. */
export function nextPagesFor(toolId: string, key: string | null | undefined): NextStep[] {
  const lists = TOOL_NEXT[toolId];
  if (!lists) return [];
  const rows = (key && Object.prototype.hasOwnProperty.call(lists, key) ? lists[key] : lists.default) ?? [];
  const out: NextStep[] = [];
  for (const row of rows) {
    if (typeof row !== "string") out.push(row);
    else {
      const tool = toolByHref(row);
      if (tool && !tool.replacedBy) out.push({ kind: "Tool", label: tool.name, href: tool.href });
    }
  }
  return out;
}
