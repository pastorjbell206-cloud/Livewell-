/**
 * The tools hub groups its tools by need. A group that filters on an href the
 * hub does not list silently hides nothing, and a tool no group names never
 * appears (the Diagnostic went missing that way). Every tool the hub lists,
 * exactly once; the family tools are listed on /family and the tools another
 * door lists (the Bible door) are listed there.
 */
import { describe, it, expect } from "vitest";
import { TOOLS, TOOL_GROUPS } from "@/lib/toolsList";

describe("TOOL_GROUPS", () => {
  it("shows every tool of the four groups exactly once", () => {
    const grouped = TOOL_GROUPS.flatMap((g) => g.tools.map((t) => t.href));
    const listed = TOOLS.filter((t) => t.group !== "family" && t.group !== "elsewhere").map((t) => t.href);
    expect([...grouped].sort()).toEqual([...listed].sort());
    expect(new Set(grouped).size).toBe(grouped.length);
  });
});
