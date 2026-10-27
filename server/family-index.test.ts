/**
 * The family index The Table reads (client/public/family/index.json, U17):
 * regenerating it changes nothing; it holds a row for every weekly devotion
 * (by its frozen id) and every day of the daily sets; every passage opens a
 * Study Bible chapter that exists; and it refuses a set it has no address for
 * or an address two devotions would share.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  INDEX,
  ROOT,
  buildFamilyIndex,
  opening,
  renderFamilyIndex,
  // @ts-expect-error: a plain .mjs build module without types
} from "../scripts/lib/family-index.mjs";

const pub = (name: string) => JSON.parse(fs.readFileSync(path.join(ROOT, "client/public", name), "utf8"));

interface Row {
  id: string;
  kind: string;
  set?: string;
  day?: number;
  href: string;
  description: string;
}

/** A copy of the family libraries in a temp dir, so a scenario can change one. */
function seeded(change: (dir: string) => void): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "family-index-"));
  const dir = path.join(root, "client/public");
  fs.mkdirSync(dir, { recursive: true });
  for (const f of ["family-devotions.json", "family-devotions-2.json", "family-seasonal.json", "family-catechism.json"]) {
    fs.copyFileSync(path.join(ROOT, "client/public", f), path.join(dir, f));
  }
  // The care pages the grown-ups lines link (U21).
  fs.cpSync(path.join(ROOT, "client/public/needs"), path.join(dir, "needs"), { recursive: true });
  change(dir);
  return root;
}

describe("build-family-index", () => {
  const { index, problems } = buildFamilyIndex(ROOT);

  it("builds with no problems and regenerates to the committed file", () => {
    expect(problems).toEqual([]);
    expect(fs.readFileSync(path.join(ROOT, INDEX), "utf8")).toBe(renderFamilyIndex(index));
  });

  it("has a row for every weekly devotion, by its frozen id, and every day of every set", () => {
    const weekly = [...pub("family-devotions.json"), ...pub("family-devotions-2.json")].map((d: { id: string }) => d.id);
    const rows: Row[] = index.devotions;
    expect(rows.filter((r) => r.kind === "weekly").map((r) => r.id)).toEqual(weekly);
    const frozen: string[] = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/data/family-devotion-ids.json"), "utf8")).ids;
    for (const id of weekly) expect(frozen).toContain(id);
    const seasonal = pub("family-seasonal.json");
    for (const [key, slug] of [["advent", "advent"], ["holyWeek", "holy-week"], ["thanksgiving", "thanksgiving"]]) {
      const days = rows.filter((r) => r.set === key);
      expect(days.map((r) => r.id)).toEqual(seasonal[key].map((d: { day: number }) => `${slug}-${d.day}`));
      expect(index.sets[key].days).toBe(seasonal[key].length);
    }
    expect(new Set(rows.map((r) => r.id)).size).toBe(rows.length);
    expect(index.catechism).toHaveLength(pub("family-catechism.json").length);
  });

  it("opens a Study Bible chapter that exists for every passage", () => {
    const books = new Map<string, number>(pub("bible/books.json").map((b: { slug: string; chapters: number }) => [b.slug, b.chapters]));
    const bad = (index.devotions as Row[]).filter((r) => {
      const m = r.href.match(/^\/study\/bible\/([a-z0-9-]+)\/(\d+)(#v\d+)?$/);
      return !m || !books.has(m[1]) || Number(m[2]) > books.get(m[1])!;
    });
    expect(bad.map((r) => `${r.id}: ${r.href}`)).toEqual([]);
  });

  it("gives every page a description in whole sentences", () => {
    for (const r of index.devotions as Row[]) {
      expect(r.description.length, r.id).toBeGreaterThan(20);
      expect(r.description, r.id).toMatch(/[.?!]["”’']?$/);
    }
    expect(opening("Today. After the long wait, the word is today. And more after that, which is not needed.")).toBe(
      "Today. After the long wait, the word is today. And more after that, which is not needed.",
    );
    expect(opening("One short line. Two short lines here. Three is the sentence that carries the opening past ninety characters. Four.")).toBe(
      "One short line. Two short lines here. Three is the sentence that carries the opening past ninety characters.",
    );
  });

  it("names each weekly row's strand and theme group, and counts them for the library (U21)", () => {
    const weekly = (index.devotions as Array<Row & { strand?: string; group?: string }>).filter((r) => r.kind === "weekly");
    expect(index.strands).toEqual([{ key: "foundations", label: "Foundations", count: 72 }]);
    expect(weekly.every((r) => r.strand === "foundations")).toBe(true);
    const groups: Array<{ key: string; count: number }> = index.groups;
    expect(groups.reduce((n, g) => n + g.count, 0)).toBe(weekly.length);
    for (const g of groups) expect(weekly.filter((r) => r.group === g.key)).toHaveLength(g.count);
    expect(index.weekly).toBe(72);
  });

  it("carries each line for the grown-ups with the title of the care page it links", () => {
    const withLine = (index.devotions as Array<Row & { grownups?: { line: string; href: string; title: string } }>).filter((r) => r.grownups);
    expect(withLine.length).toBeGreaterThan(0);
    for (const r of withLine) {
      const slug = r.grownups!.href.replace(/^\/help\//, "");
      const need = pub(`needs/${slug}.json`);
      expect(need.page, r.id).toBe(true);
      expect(r.grownups!.title, r.id).toBe(need.title);
    }
    expect(withLine.find((r) => r.id === "fear-and-anxiety")?.grownups?.title).toBe("I can't stop worrying");
  });

  it("refuses an unknown theme group, a grown-ups link to no page, and a devotion file no strand reads", () => {
    const root = seeded((dir) => {
      const list = JSON.parse(fs.readFileSync(path.join(dir, "family-devotions.json"), "utf8"));
      list[0].group = "nowhere";
      list[1].grownups = { line: "If this is you, start here.", href: "/help/not-a-page" };
      fs.writeFileSync(path.join(dir, "family-devotions.json"), JSON.stringify(list));
      fs.writeFileSync(path.join(dir, "family-devotions-recipes.json"), "[]");
    });
    const problems = buildFamilyIndex(root).problems.join("\n");
    expect(problems).toMatch(/identity: group "nowhere" is not one of the library's groups/);
    expect(problems).toMatch(/fear-and-anxiety: grownups link "\/help\/not-a-page" has no care page/);
    expect(problems).toMatch(/family-devotions-recipes\.json: no strand reads this file/);
  });

  it("adds a new strand as its own shelf, numbered within it, and leaves out one held back", () => {
    const first = pub("family-devotions.json")[0];
    const world = [
      { ...first, id: "only-christian-in-class", title: "The Only Christian in Class", group: undefined, grownups: undefined },
      { ...first, id: "praying-for-leaders", title: "Praying for Leaders", group: undefined, grownups: undefined },
    ];
    const held = buildFamilyIndex(seeded((dir) => fs.writeFileSync(path.join(dir, "family-devotions-world.json"), JSON.stringify({ live: false, devotions: world }))));
    expect(held.problems).toEqual([]);
    expect(held.index.strands.map((s: { key: string }) => s.key)).toEqual(["foundations"]);
    expect(held.index.devotions.some((r: Row) => r.id === "praying-for-leaders")).toBe(false);

    const live = buildFamilyIndex(seeded((dir) => fs.writeFileSync(path.join(dir, "family-devotions-world.json"), JSON.stringify(world))));
    expect(live.problems).toEqual([]);
    expect(live.index.strands).toEqual([
      { key: "foundations", label: "Foundations", count: 72 },
      { key: "world", label: "The world we live in", count: 2 },
    ]);
    const row = live.index.devotions.find((r: Row) => r.id === "praying-for-leaders");
    expect(row).toMatchObject({ kind: "weekly", strand: "world", n: 2 });
    expect(live.index.weekly).toBe(72);
  });

  it("refuses a daily set it has no address for", () => {
    const root = seeded((dir) => {
      const s = JSON.parse(fs.readFileSync(path.join(dir, "family-seasonal.json"), "utf8"));
      s.lent = [s.advent[0]];
      fs.writeFileSync(path.join(dir, "family-seasonal.json"), JSON.stringify(s));
    });
    expect(buildFamilyIndex(root).problems.join("\n")).toMatch(/the set "lent" has no address yet/);
  });

  it("refuses an address two devotions would share", () => {
    const root = seeded((dir) => {
      const list = JSON.parse(fs.readFileSync(path.join(dir, "family-devotions.json"), "utf8"));
      list[0].id = "advent-3";
      fs.writeFileSync(path.join(dir, "family-devotions.json"), JSON.stringify(list));
    });
    expect(buildFamilyIndex(root).problems.join("\n")).toMatch(/\/family\/devotions\/advent-3 is already taken/);
  });

  it("refuses a passage the parser cannot read", () => {
    const root = seeded((dir) => {
      const list = JSON.parse(fs.readFileSync(path.join(dir, "family-devotions.json"), "utf8"));
      list[0].passage = "Hezekiah 4:1";
      fs.writeFileSync(path.join(dir, "family-devotions.json"), JSON.stringify(list));
    });
    expect(buildFamilyIndex(root).problems.join("\n")).toMatch(/"Hezekiah 4:1" is not a reference/);
  });
});
