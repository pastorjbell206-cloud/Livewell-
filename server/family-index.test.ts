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
  strand?: string;
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
    // The 72 Foundations rows; a live strand beside them (family-devotions-world.json) adds its own.
    expect(rows.filter((r) => r.kind === "weekly" && (r.strand ?? "foundations") === "foundations").map((r) => r.id)).toEqual(weekly);
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
