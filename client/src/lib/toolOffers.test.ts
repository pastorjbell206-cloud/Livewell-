/**
 * Where the tools are offered (client/src/data/tool-offers.json): every id,
 * slug and passage is real, nothing folded is offered, no self-check sits on
 * a page about despair or harm, and the pages that read the file show the
 * tool under its one name.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { ANSWERS } from "@/data/answers";
import { companionsFor } from "@/data/answerCompanions";
import { parseScriptureRef } from "./scripture-ref";
import { MAX_OFFERS, TOOL_OFFERS, toolsOfferedAt } from "./toolOffers";
import { TOOL_LIST, TOOLS, toolById } from "./toolsList";

const PUBLIC = path.resolve(__dirname, "../../public");
const read = (rel: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, rel), "utf8"));
const topics = new Set<string>(read("wisdom/topics.json").topics.map((t: { id: string }) => t.id));
const devotions = new Set<string>(read("family/index.json").devotions.map((d: { id: string }) => d.id));
const answers = new Set(ANSWERS.map((a) => a.slug));
const heavy = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/sensitive-pages.json"), "utf8")).wisdom as { lead: Record<string, string[]>; end: Record<string, string[]> };
const sensitive = new Set([...Object.keys(heavy.lead), ...Object.keys(heavy.end)]);

describe("tool-offers.json", () => {
  it("names only listed tools, once each", () => {
    const ids = TOOL_OFFERS.map((o) => o.tool);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      const tool = TOOL_LIST.find((t) => t.id === id);
      expect(tool, id).toBeTruthy();
      expect(tool!.replacedBy, `${id} is folded`).toBeUndefined();
    }
  });

  it("points only at topics, answers, devotions and passages that exist", () => {
    for (const o of TOOL_OFFERS) {
      for (const t of o.topics) expect(topics.has(t), `${o.tool}: topic ${t}`).toBe(true);
      for (const a of o.answers) expect(answers.has(a), `${o.tool}: answer ${a}`).toBe(true);
      for (const d of o.devotions) expect(devotions.has(d), `${o.tool}: devotion ${d}`).toBe(true);
      for (const p of o.passages) expect(parseScriptureRef(p), `${o.tool}: passage ${p}`).not.toBeNull();
    }
  });

  it("offers every tool in the four working groups somewhere", () => {
    const offered = new Set(TOOL_OFFERS.filter((o) => o.topics.length + o.answers.length + o.passages.length + o.devotions.length > 0).map((o) => o.tool));
    // The reading rooms and the Bible door's own tools are reached from their doors.
    const elsewhere = new Set(["study-bible", "bible-search", "theology-glossary", "quotes"]);
    for (const t of TOOLS) {
      if (t.group === "elsewhere" || elsewhere.has(t.id)) continue;
      expect(offered.has(t.id), `${t.id} is offered nowhere`).toBe(true);
    }
  });

  it("offers no tool on a wisdom topic the site marks as heavy", () => {
    expect(sensitive.size).toBeGreaterThan(10);
    for (const o of TOOL_OFFERS) for (const t of o.topics) expect(sensitive.has(t), `${o.tool} on the heavy topic ${t}`).toBe(false);
    // And no self-check on money trouble or a lost job, where a check would read as blame.
    const checks = new Set(TOOLS.filter((t) => t.group === "check-yourself").map((t) => t.id));
    for (const o of TOOL_OFFERS) if (checks.has(o.tool)) for (const t of o.topics) expect(/financial-hardship|job-loss|cheating|affair/.test(t), `${o.tool} on ${t}`).toBe(false);
  });
});

describe("toolsOfferedAt", () => {
  it("gives a page at most two tools, by their one name, and nothing where nothing fits", () => {
    const got = toolsOfferedAt("topics", "anxiety");
    expect(got.map((t) => t.id)).toContain("worry-journal");
    expect(got.length).toBeLessThanOrEqual(MAX_OFFERS);
    for (const key of topics) expect(toolsOfferedAt("topics", key).length).toBeLessThanOrEqual(MAX_OFFERS);
    expect(toolsOfferedAt("topics", "suicidal-thoughts")).toEqual([]);
    expect(toolsOfferedAt("devotions", "no-such-devotion")).toEqual([]);
  });

  it("stands beside an Honest Answer as a companion, named as the tools list names it", () => {
    const a = ANSWERS.find((x) => x.slug === "what-does-the-bible-say-about-anxiety")!;
    const lines = companionsFor(a);
    const worry = toolById("worry-journal");
    expect(lines).toContainEqual({ lead: "A tool for this:", label: worry.name, href: worry.href });
    // Never the same address twice under one answer.
    for (const x of ANSWERS) {
      const hrefs = companionsFor(x).map((c) => c.href.split(/[?#]/)[0]);
      expect(new Set(hrefs).size, x.slug).toBe(hrefs.length);
    }
  });
});

describe("the passage index", () => {
  it("lists a tool under Tools on the chapter it is offered beside", () => {
    const rows: { k: string; t: string; h: string; p: string }[] = read("index/chapters/philippians/4.json");
    const worry = toolById("worry-journal");
    expect(rows).toContainEqual({ k: "practice", t: worry.name, h: worry.href, p: "Philippians 4:6–7" });
    for (const o of TOOL_OFFERS) {
      for (const p of o.passages) {
        const ref = parseScriptureRef(p)!;
        const file = `index/chapters/${ref.book.slug}/${ref.parts[0].c1}.json`;
        expect(read(file).some((r: { k: string; h: string }) => r.k === "practice" && r.h === toolById(o.tool).href), `${o.tool} on ${p}`).toBe(true);
      }
    }
  });
});
