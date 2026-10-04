/**
 * The tools hub groups its tools by need. A group that filters on an href the
 * hub does not list silently hides nothing, and a tool no group names never
 * appears (the Diagnostic went missing that way). Every tool, exactly once.
 */
import { describe, it, expect } from "vitest";
import { TOOLS, TOOL_GROUPS } from "./ToolsHub";

describe("TOOL_GROUPS", () => {
  it("shows every tool exactly once", () => {
    const grouped = TOOL_GROUPS.flatMap((g) => g.tools.map((t) => t.href));
    expect([...grouped].sort()).toEqual(TOOLS.map((t) => t.href).sort());
  });
});
