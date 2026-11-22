/**
 * Where a tool sends a reader next (client/src/data/tool-next.json): every
 * address is a live page under its own name, every choice gets two or three,
 * and a tool is named as the tools list names it.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { TOOL_NEXT, nextPagesFor } from "./toolNext";
import { TOOL_LIST, toolByHref } from "./toolsList";

const PUBLIC = path.resolve(__dirname, "../../public");
const read = (rel: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, rel), "utf8"));
const topics = new Map<string, string>(read("wisdom/topics.json").topics.map((t: { id: string; label: string }) => [t.id, t.label]));
const devotions = new Map<string, string>(read("family/index.json").devotions.map((d: { id: string; title: string }) => [d.id, d.title]));
/** The other pages a tool may send a reader to, under the one name each has. */
const PAGES: Record<string, string> = {
  "/help": "Find Help",
  "/family/devotions": "Family devotions",
  "/family/catechism": "The Family Catechism",
  "/study/explorer": "Bible Explorer",
};

describe("tool-next.json", () => {
  it("names only tools that exist, and gives every choice two or three live pages", () => {
    for (const [id, lists] of Object.entries(TOOL_NEXT)) {
      expect(TOOL_LIST.some((t) => t.id === id), id).toBe(true);
      expect(lists.default, `${id} needs a default`).toBeTruthy();
      for (const key of Object.keys(lists)) {
        const pages = nextPagesFor(id, key);
        expect(pages.length, `${id} / ${key}`).toBeGreaterThanOrEqual(2);
        expect(pages.length, `${id} / ${key}`).toBeLessThanOrEqual(3);
        expect(new Set(pages.map((p) => p.href)).size).toBe(pages.length);
        for (const p of pages) {
          const where = `${id} / ${key} -> ${p.href}`;
          const topic = /^\/wisdom\/([a-z0-9-]+)$/.exec(p.href);
          const devotion = /^\/family\/devotions\/([a-z0-9-]+)$/.exec(p.href);
          if (p.kind === "Tool") expect(toolByHref(p.href)?.name, where).toBe(p.label);
          else if (topic) expect(topics.get(topic[1]), where).toBe(p.label);
          else if (devotion) expect(devotions.get(devotion[1]), where).toBe(p.label);
          else expect(PAGES[p.href], where).toBe(p.label);
          // A tool never sends a reader back to itself.
          expect(p.href).not.toBe(TOOL_LIST.find((t) => t.id === id)!.href);
        }
      }
    }
  });

  it("answers by the reader's choice, falls back to the default, and gives nothing for a tool it does not know", () => {
    expect(nextPagesFor("conflict-guide", "financial")[0]).toEqual({ kind: "Tool", label: toolByHref("/tools/financial-health")!.name, href: "/tools/financial-health" });
    expect(nextPagesFor("conflict-guide", "no-such-topic")).toEqual(nextPagesFor("conflict-guide", null));
    expect(nextPagesFor("conflict-guide", "constructor")).toEqual(nextPagesFor("conflict-guide", null));
    expect(nextPagesFor("no-such-tool", "x")).toEqual([]);
  });

  it("keeps Find Help beside a choice that touches suffering or broken trust", () => {
    expect(nextPagesFor("conflict-guide", "trust").map((p) => p.href)).toContain("/help");
    expect(nextPagesFor("prayer-generator", "Prayer in Suffering").map((p) => p.href)).toContain("/help");
  });
});
