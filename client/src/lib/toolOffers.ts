/**
 * Where a tool is offered beside the page a reader is already on
 * (client/src/data/tool-offers.json): a wisdom topic, an Honest Answer, a
 * family devotion. A Study Bible chapter gets its tools through the passage
 * index (scripts/lib/passage-index.mjs reads the same file). The name and the
 * one-line job of each tool come from lib/toolsList.ts; a tool folded into
 * another is never offered. At most two tools on a page, in the file's order.
 */
import data from "@/data/tool-offers.json";
import { TOOLS, type Tool } from "./toolsList";

export type OfferPlace = "topics" | "answers" | "devotions";

export interface ToolOfferRow {
  tool: string;
  topics: string[];
  answers: string[];
  passages: string[];
  devotions: string[];
}

export const TOOL_OFFERS: ToolOfferRow[] = data.offers;

/** How many tools one page offers at most. */
export const MAX_OFFERS = 2;

const byId = new Map(TOOLS.map((t) => [t.id, t]));

/** The tools offered at one place, by its id or slug. */
export function toolsOfferedAt(place: OfferPlace, key: string): Tool[] {
  const out: Tool[] = [];
  for (const row of TOOL_OFFERS) {
    if (!row[place].includes(key)) continue;
    const tool = byId.get(row.tool);
    if (tool && !tool.replacedBy) out.push(tool);
    if (out.length === MAX_OFFERS) break;
  }
  return out;
}
