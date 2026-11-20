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
 * On 2026-11-20 (second build) twenty more sentences, holdout2, were written
 * before matching.json was touched, and measured: top 1 65.0%, top 3 80.0%.
 * Then four phrases were added for known misses, three of them holdout
 * sentences ("best friend lied", "cheat on my diet", "just retired and feel
 * useless") and one outside it ("boss humiliated me"). After that:
 *   holdout (19)  top 1 100%  top 3 100% (no longer a clean holdout: three of
 *                 its sentences were tuned for)
 *   holdout2 (20) top 1 65.0% top 3 80.0% (untouched; the honest number)
 * On 2026-11-20 (third build) fifteen more sentences, holdout3, were written
 * and committed before matching.json was touched, and measured: top 1 53.3%,
 * top 3 73.3%. Then phrases and "not" phrases were added for the seven
 * holdout2 misses (control in a dating relationship, hating the face in the
 * mirror, sex outside marriage, gossip about a coworker, care for the
 * homeless, how much to give, infertility under the marriage topics). After:
 *   cases    (74) top 1 100%   top 3 100%
 *   holdout  (19) top 1 100%   top 3 100% (tuned for in the second build)
 *   holdout2 (20) top 1 100%   top 3 100% (tuned for in this build; no
 *                 longer a clean holdout)
 *   holdout3 (15) top 1 53.3%  top 3 73.3% (untouched; the honest number)
 * On 2026-11-20 (fourth build) fifteen more sentences, holdout4, were written
 * and committed before matching.json was touched, and measured: top 1 86.7%,
 * top 3 100%. It is the clean set from here.
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
  holdout2: { q: string; expect: string[] }[];
  holdout3: { q: string; expect: string[] }[];
  holdout4: { q: string; expect: string[] }[];
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
    const all = [...fixture.cases, ...fixture.holdout, ...fixture.holdout2, ...fixture.holdout3, ...fixture.holdout4];
    expect(all.length).toBeGreaterThanOrEqual(60);
    for (const c of all) for (const id of c.expect) expect(ids.has(id), `${c.q}: ${id}`).toBe(true);
  });

  it("puts the right topic first and in the first three (reported)", () => {
    const cases = rate(fixture.cases);
    const holdout = rate(fixture.holdout);
    const holdout2 = rate(fixture.holdout2);
    const holdout3 = rate(fixture.holdout3);
    const holdout4 = rate(fixture.holdout4);
    console.info(
      `[wisdom-match] cases ${cases.n}: top 1 ${(cases.top1 * 100).toFixed(1)}%, top 3 ${(cases.top3 * 100).toFixed(1)}%; ` +
        `holdout ${holdout.n}: top 1 ${(holdout.top1 * 100).toFixed(1)}%, top 3 ${(holdout.top3 * 100).toFixed(1)}%` +
        (holdout.misses.length ? `\n  holdout misses: ${holdout.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout2 ${holdout2.n}: top 1 ${(holdout2.top1 * 100).toFixed(1)}%, top 3 ${(holdout2.top3 * 100).toFixed(1)}%` +
        (holdout2.misses.length ? `\n  holdout2 misses: ${holdout2.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout3 ${holdout3.n}: top 1 ${(holdout3.top1 * 100).toFixed(1)}%, top 3 ${(holdout3.top3 * 100).toFixed(1)}%` +
        (holdout3.misses.length ? `\n  holdout3 misses: ${holdout3.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout4 ${holdout4.n}: top 1 ${(holdout4.top1 * 100).toFixed(1)}%, top 3 ${(holdout4.top3 * 100).toFixed(1)}%` +
        (holdout4.misses.length ? `\n  holdout4 misses: ${holdout4.misses.join("\n  ")}` : ""),
    );
    expect(cases.top1).toBeGreaterThanOrEqual(0.9);
    expect(cases.top3).toBeGreaterThanOrEqual(0.95);
    expect(holdout.top1).toBeGreaterThanOrEqual(0.75);
    expect(holdout.top3).toBeGreaterThanOrEqual(0.9);
    expect(holdout2.top1).toBeGreaterThanOrEqual(0.9);
    expect(holdout2.top3).toBeGreaterThanOrEqual(0.95);
    expect(holdout3.top1).toBeGreaterThanOrEqual(0.5);
    expect(holdout3.top3).toBeGreaterThanOrEqual(0.7);
    expect(holdout4.top1).toBeGreaterThanOrEqual(0.8);
    expect(holdout4.top3).toBeGreaterThanOrEqual(0.9);
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
