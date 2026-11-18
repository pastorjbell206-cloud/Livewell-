import { describe, expect, it } from "vitest";
import { placeFor, TOOL_GROUPS_BY_HREF } from "./pagePlace";
import { DOORS } from "./siteCatalog";
import { TOOLS, TOOL_LIST } from "./toolsList";

describe("placeFor: the label over an inner page's title", () => {
  it("names the door alone for a room's own page", () => {
    expect(placeFor("/life")).toEqual({ door: { name: "Questions", href: "/topics" } });
    expect(placeFor("/plans")).toEqual({ door: { name: "Tools", href: "/tools" } });
  });

  it("names the door and the room for a page one step inside", () => {
    expect(placeFor("/how-tos")).toEqual({ door: { name: "Questions", href: "/topics" }, room: { name: "Everyday life", href: "/life" } });
    expect(placeFor("/faq/does-god-exist")?.room?.name).toBe("Honest Answers");
    expect(placeFor("/compare/catholic-vs-protestant")?.room?.name).toBe("Where Christians differ");
    expect(placeFor("/downloads")?.door.name).toBe("Tools");
  });

  it("places every listed tool, by its group when the catalogue does not list it", () => {
    for (const t of TOOLS) expect(placeFor(t.href), t.href).toBeDefined();
    expect(placeFor("/tools/prayer-generator")).toEqual({ door: { name: "Tools", href: "/tools" }, room: { name: "Pray and practise", href: "/tools#pray-and-practise" } });
    expect(placeFor("/tools/test-the-case")?.room?.name).toBe("Tools for hard questions");
    expect(placeFor("/tools/parenting-guide")).toEqual({ door: { name: "Family", href: "/family" } });
  });

  it("keeps the same group for every tool as the tools list", () => {
    expect(TOOL_GROUPS_BY_HREF).toEqual(Object.fromEntries(TOOL_LIST.map((t) => [t.href, t.group])));
  });

  it("uses only names the catalogue uses", () => {
    const names = new Set<string>();
    for (const d of DOORS) {
      names.add(d.name);
      for (const r of d.rooms) {
        names.add(r.name);
        for (const i of r.inside ?? []) names.add(i.name);
      }
    }
    for (const p of ["/life", "/how-tos", "/wisdom", "/studyguides", "/help", "/my-library", ...TOOLS.map((t) => t.href)]) {
      const place = placeFor(p);
      if (!place) continue;
      expect(names.has(place.door.name), p).toBe(true);
      if (place.room) expect(names.has(place.room.name), p).toBe(true);
    }
  });
});
