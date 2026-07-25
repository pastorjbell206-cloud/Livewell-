import { describe, it, expect } from "vitest";

import { LIBRARY_SOURCES, pickString } from "./catalog";

/**
 * The catalog is the single registry every content surface reads from
 * (on-site search and the /explore browse page). These guard the shape so a
 * malformed source can't silently drop a whole library out of search + browse.
 */
describe("content catalog registry", () => {
  it("registers every static library with a well-formed source", () => {
    // Was 10 until the Leadership Library and Deep Formation sources moved to
    // the Pastors Connection Network with the rest of the pastoring material
    // (see archive/pcn-handoff/). The floor guards against a library silently
    // dropping out of search and browse; it is not a target to grow.
    expect(LIBRARY_SOURCES.length).toBeGreaterThanOrEqual(8);
    for (const s of LIBRARY_SOURCES) {
      expect(s.url.startsWith("/")).toBe(true);
      expect(s.url.endsWith(".json")).toBe(true);
      expect(typeof s.listKey).toBe("string");
      expect(s.label.length).toBeGreaterThan(0);
      expect(s.type.length).toBeGreaterThan(0);
      expect(s.indexHref.startsWith("/")).toBe(true);
      expect(s.buildHref("a-slug")).toContain("a-slug");
    }
  });

  it("covers the content types the browse facet expects", () => {
    const types = new Set(LIBRARY_SOURCES.map((s) => s.type));
    for (const t of ["Book", "Study Guide", "How-To", "Church History", "Creed"]) {
      expect(types.has(t)).toBe(true);
    }
  });

  it("pickString returns the first non-empty string", () => {
    expect(pickString(undefined, "", "  ", "hit", "miss")).toBe("hit");
    expect(pickString(null, 3, {})).toBe("");
  });
});
