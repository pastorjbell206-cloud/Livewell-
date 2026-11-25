import { describe, expect, it } from "vitest";
import { placeFor, trailFor, TOOL_GROUPS_BY_HREF } from "./pagePlace";
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

describe("trailFor: where any page sits, for the one line over its title", () => {
  it("is the page's own place when the catalogue lists it", () => {
    for (const p of ["/life", "/how-tos", "/faq/does-god-exist", "/tools/prayer-generator"]) expect(trailFor(p)).toEqual(placeFor(p));
  });

  it("leads a page inside a library back to the library, under its catalogue name", () => {
    expect(trailFor("/plans/grief")).toEqual({ door: { name: "Tools", href: "/tools" }, room: { name: "Eight-week plans", href: "/plans" } });
    expect(trailFor("/wisdom/anxiety")?.room).toEqual({ name: "What the Bible says, by subject", href: "/wisdom" });
    expect(trailFor("/study/bible/romans/8")).toEqual({ door: { name: "Bible", href: "/study" }, room: { name: "Read the Study Bible", href: "/study/bible" } });
    expect(trailFor("/study/explorer/watch/prayer")?.room).toEqual({ name: "Bible Explorer", href: "/study/explorer" });
    expect(trailFor("/resources/context/world/roman-world")?.room?.href).toBe("/resources/context");
    expect(trailFor("/books/believe")).toEqual({ door: { name: "About", href: "/about" }, room: { name: "Books", href: "/books" } });
    expect(trailFor("/answers/does-god-actually-exist")?.room?.name).toBe("Honest Answers");
  });

  it("names the door alone for a page straight under a door's own page", () => {
    expect(trailFor("/theology/history/the-reformation")).toEqual({ door: { name: "History", href: "/theology/history" } });
    expect(trailFor("/writing/what-post-christian-means")).toEqual({ door: { name: "Essays", href: "/writing" } });
    expect(trailFor("/topics/living-after-christendom")).toEqual({ door: { name: "Questions", href: "/topics" } });
  });

  it("leads a care page to Find Help and the start quiz to the start road", () => {
    expect(trailFor("/help/grief")).toEqual({ door: { name: "Find Help", href: "/help" } });
    expect(trailFor("/start/quiz")).toEqual({ door: { name: "New here? Start here", href: "/start" } });
  });

  it("knows the hubs whose address is not the start of their pages'", () => {
    expect(trailFor("/theology/doctrine/baptism")?.room).toEqual({ name: "Where Christians differ", href: "/theology/compare" });
    expect(trailFor("/pathways/anxiety")).toEqual({ door: { name: "Essays", href: "/writing" } });
  });

  it("gives a tool no menu lists its door, and a top-level page nothing", () => {
    expect(trailFor("/tools/pray-the-psalms")).toEqual({ door: { name: "Tools", href: "/tools" } });
    expect(trailFor("/privacy")).toBeUndefined();
    expect(trailFor("/")).toBeUndefined();
  });
});
