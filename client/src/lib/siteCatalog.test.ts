/**
 * The site catalogue holds the map James approved on 2026-11-18: seven doors,
 * six rooms or fewer in each, a room listed only when its page exists, one
 * name per address, and counts that are true of the repo.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { DOORS, SEARCH_SHORTCUT_IDS, allEntries, doorForPath, entryById, nameForHref } from "./siteCatalog";
import { ICONS } from "./siteIcons";
import { TOOL_GROUPS } from "./toolsList";
import { BOOK_SHELF } from "./bookShelf";
import { ANSWERS } from "@/data/answers";

const ROOT = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const json = (rel: string) => JSON.parse(read(rel));
const APP = read("client/src/App.tsx");
const ROUTES = Array.from(APP.matchAll(/<Route\s+path="([^"]+)"(?: component=\{(\w+)\})?/g), (m) => ({ path: m[1], component: m[2] }));

/** The route an internal href (query and hash dropped) lands on, or null. */
function routeFor(href: string) {
  const target = href.split("#")[0].split("?")[0];
  return (
    ROUTES.find(({ path: p }) =>
      new RegExp("^" + p.replace(/:[A-Za-z0-9_]+/g, "[^/]+").replace(/\*/g, ".*") + "/?$").test(target)
    ) ?? null
  );
}

describe("the doors", () => {
  it("are the seven James chose, in order", () => {
    expect(DOORS.map((d) => d.name)).toEqual(["Bible", "History", "Questions", "Family", "Tools", "Essays", "About"]);
  });

  it("each list six rooms or fewer, and only Essays lists none", () => {
    for (const d of DOORS) {
      expect(d.rooms.length, d.name).toBeLessThanOrEqual(6);
      expect(d.rooms.length === 0, d.name).toBe(d.id === "essays");
    }
  });

  it("each hang under a plate the art kit draws", () => {
    const kit = read("client/src/components/art/Plate.tsx");
    for (const d of DOORS) expect(kit, d.plate).toContain(`"${d.plate}"`);
  });
});

describe("every entry", () => {
  const entries = allEntries();

  it("opens a real page, never a redirect stub", () => {
    const bad = entries
      .filter((e) => !e.external)
      .filter((e) => {
        const r = routeFor(e.href);
        return !r || (r.component ?? "").endsWith("Redirect");
      })
      .map((e) => e.href);
    expect(bad).toEqual([]);
  });

  it("has one name per address, and one address per name", () => {
    const byHref = new Map<string, Set<string>>();
    const byName = new Map<string, Set<string>>();
    for (const e of entries) {
      byHref.set(e.href, (byHref.get(e.href) ?? new Set()).add(e.name));
      byName.set(e.name, (byName.get(e.name) ?? new Set()).add(e.href));
    }
    expect([...byHref].filter(([, n]) => n.size > 1).map(([h, n]) => `${h}: ${[...n].join(" / ")}`)).toEqual([]);
    expect([...byName].filter(([, h]) => h.size > 1).map(([n, h]) => `${n}: ${[...h].join(" / ")}`)).toEqual([]);
  });

  it("has a unique id, a known icon and one short plain line", () => {
    const ids = entries.map((e) => e.id);
    expect(ids.length).toBe(new Set(ids).size);
    const forbidden = /\b(delve|leverage|unlock|transformative|navigate|tapestry|foster|unpack|landscape|nuanced|multifaceted|authentic|journey|holistic)\b/i;
    for (const e of entries) {
      expect(ICONS[e.icon], e.id).toBeTruthy();
      expect(e.line.length, e.id).toBeGreaterThan(5);
      expect(e.line.length, e.id).toBeLessThanOrEqual(90);
      expect(`${e.name} ${e.line}`, e.id).not.toMatch(/[—!]/);
      expect(`${e.name} ${e.line}`, e.id).not.toMatch(forbidden);
    }
  });

  it("says nothing about a membership, giving or the pastors' network", () => {
    const text = entries.map((e) => `${e.name} ${e.line} ${e.href}`).join(" ");
    expect(text).not.toMatch(/membership|donat|giving|pastors connection|pastorsconnection/i);
  });

  it("names a room the same way when the search shortcuts offer it", () => {
    for (const id of SEARCH_SHORTCUT_IDS) expect(entryById(id), id).toBeTruthy();
  });

  it("files a page under the door that holds it", () => {
    expect(doorForPath("/resources/creeds")).toBe("history");
    expect(doorForPath("/study/bible/john/3")).toBe("bible");
    expect(doorForPath("/books/believe")).toBe("about");
    expect(doorForPath("/faq/does-god-exist")).toBe("questions");
    expect(doorForPath("/help")).toBeNull();
    expect(nameForHref("/resources/context")).toBe("Bible background");
  });
});

describe("the counts", () => {
  it("are true of the repo's own data", () => {
    const counts = new Map(allEntries().filter((e) => e.count).map((e) => [e.id, e.count!.n]));
    const truth: Record<string, number> = {
      "bible.read": json("client/public/bible/books.json").length,
      "bible.guides": json("client/public/bible/guides/index.json").groups.reduce((n: number, g: { guides: unknown[] }) => n + g.guides.length, 0),
      "bible.story": json("client/public/bible/story.json").acts.length,
      "bible.background": json("client/public/context/guides-index.json").guides.length,
      "history.people": json("client/public/theology/church-history-figures.json").figures.length,
      "history.creeds": json("client/public/creeds/documents-index.json").documents.length,
      "questions.answers": ANSWERS.length,
      "questions.believe": json("client/public/bible/doctrines.json").doctrines.length,
      "questions.life": json("client/public/life/domains-index.json").domains.length,
      "questions.how-tos": json("client/public/howtos/index.json").articles.length,
      "questions.wisdom": json("client/public/wisdom/topics.json").topics.length,
      "family.catechism": json("client/public/family/index.json").catechism.length,
      "family.plans": json("client/public/family-reading-plans.json").length,
      "tools.study": TOOL_GROUPS.find((g) => g.id === "study")!.tools.length,
      "tools.questions": TOOL_GROUPS.find((g) => g.id === "hard-questions")!.tools.length,
      "tools.checks": TOOL_GROUPS.find((g) => g.id === "check-yourself")!.tools.length,
      "tools.practise": TOOL_GROUPS.find((g) => g.id === "pray-and-practise")!.tools.length,
      "tools.plans": json("client/public/plans/plans-index.json").plans.length,
      "tools.groups": json("client/public/studyguides/index.json").guides.length,
      "about.books": BOOK_SHELF.length,
      help: json("client/public/needs/index.json").needs.length,
    };
    expect(Object.fromEntries(counts)).toEqual(truth);
  });

  it("point a Tools room at a group the tools page shows, under the group's own name", () => {
    const anchors = new Set(TOOL_GROUPS.map((g) => g.id));
    for (const r of DOORS.find((d) => d.id === "tools")!.rooms.flatMap((r) => [r, ...(r.inside ?? [])])) {
      const hash = r.href.split("#")[1];
      if (hash) expect(anchors.has(hash), r.href).toBe(true);
      if (hash) expect(r.name, r.href).toBe(TOOL_GROUPS.find((g) => g.id === hash)!.name);
    }
  });

  it("point a church history room at a tab the page opens by its hash", () => {
    const page = read("client/src/pages/TheologyHistory.tsx");
    for (const r of DOORS.find((d) => d.id === "history")!.rooms.flatMap((r) => [r, ...(r.inside ?? [])])) {
      const hash = r.href.startsWith("/theology/history#") ? r.href.split("#")[1] : null;
      if (hash) expect(page, hash).toMatch(new RegExp(`\\b${hash}: "`));
    }
  });
});
