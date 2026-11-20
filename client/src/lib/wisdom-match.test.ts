/**
 * The Wisdom Finder's hit rate on plain sentences (wisdom-match.fixture.json):
 * the right topic first, and the right topic in the first three. The matcher
 * reads the built finder index (client/public/wisdom/finder.json), as the page
 * does.
 *
 * Before this matcher (the old keyword count in WisdomFinder.tsx, measured on
 * the same fixture on 2026-11-20):
 *   cases   (74)  top 1 62.2%  top 3 83.8%
 *   holdout (19)  top 1 57.9%  top 3 78.9%
 * After (the hand-written phrases were written with the cases in view, so the
 * holdout, not looked at while they were written, is the honest number):
 *   cases   (74)  top 1 100%   top 3 100%
 *   holdout (19)  top 1 84.2%  top 3 100%
 * The floors below sit under those, so a change to the data that makes the
 * finder worse fails here by name.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { prepare, findTopics, stem, queryWords, isFinderIndex } from "./wisdom-match";

const index: unknown = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/wisdom/finder.json"), "utf8"));
const fixture = JSON.parse(fs.readFileSync(path.resolve(__dirname, "wisdom-match.fixture.json"), "utf8")) as {
  cases: { q: string; expect: string[] }[];
  holdout: { q: string; expect: string[] }[];
};

if (!isFinderIndex(index)) throw new Error("finder.json is not a finder index");
const prep = prepare(index);

function rate(cases: { q: string; expect: string[] }[]) {
  let top1 = 0;
  let top3 = 0;
  const misses: string[] = [];
  const scored = cases.filter((c) => c.expect.length);
  for (const c of scored) {
    const r = findTopics(prep, c.q);
    const ids = r.matches.map((m) => m.topic.id);
    if (r.confident && c.expect.includes(ids[0])) top1++;
    else misses.push(`${c.q} -> ${ids.slice(0, 3).join(", ") || "(nothing)"}`);
    if (ids.slice(0, 3).some((x) => c.expect.includes(x))) top3++;
  }
  return { n: scored.length, top1: top1 / scored.length, top3: top3 / scored.length, misses };
}

describe("wisdom matcher", () => {
  it("has at least 60 plain sentences, every expected topic real", () => {
    const ids = new Set(index.topics.map((t) => t.id));
    const all = [...fixture.cases, ...fixture.holdout];
    expect(all.length).toBeGreaterThanOrEqual(60);
    for (const c of all) for (const id of c.expect) expect(ids.has(id), `${c.q}: ${id}`).toBe(true);
  });

  it("puts the right topic first and in the first three (reported)", () => {
    const cases = rate(fixture.cases);
    const holdout = rate(fixture.holdout);
    console.info(
      `[wisdom-match] cases ${cases.n}: top 1 ${(cases.top1 * 100).toFixed(1)}%, top 3 ${(cases.top3 * 100).toFixed(1)}%; ` +
        `holdout ${holdout.n}: top 1 ${(holdout.top1 * 100).toFixed(1)}%, top 3 ${(holdout.top3 * 100).toFixed(1)}%` +
        (holdout.misses.length ? `\n  holdout misses: ${holdout.misses.join("\n  ")}` : ""),
    );
    expect(cases.top1).toBeGreaterThanOrEqual(0.9);
    expect(cases.top3).toBeGreaterThanOrEqual(0.95);
    expect(holdout.top1).toBeGreaterThanOrEqual(0.75);
    expect(holdout.top3).toBeGreaterThanOrEqual(0.9);
  });

  it("does not force a match on nonsense", () => {
    expect(findTopics(prep, "asdf qwerty").confident).toBe(false);
    expect(findTopics(prep, "").matches).toEqual([]);
  });

  it("no longer files a wayward child under the Resurrection, or the promotion under self-pity", () => {
    const son = findTopics(prep, "my son has walked away from the faith").matches.map((m) => m.topic.id);
    expect(son[0]).toBe("wayward-child");
    expect(son).not.toContain("the-resurrection");
    const promo = findTopics(prep, "I was passed over for promotion and I am bitter").matches.map((m) => m.topic.id);
    expect(promo[0]).not.toBe("self-pity");
    expect(promo).not.toContain("grief");
  });

  it("stems plain word forms together", () => {
    expect(stem("worrying")).toBe(stem("worried"));
    expect(stem("worries")).toBe(stem("worry"));
    expect(stem("hoping")).toBe(stem("hope"));
    expect(queryWords(index, "my mom passed away").has(stem("died"))).toBe(true);
  });
});
