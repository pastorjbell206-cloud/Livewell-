/**
 * The topics gate (U25): scripts/validate-topics.mjs, build-topics-index.mjs,
 * and the politics page's both-directions check in validate-politics.mjs
 * (scripts/lib/topics-politics.mjs). They pass on the topics as committed,
 * and fail a seeded bad page with the reason a writer can act on.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkTopics, loadContext, rowProblems, topicProblems } from "../scripts/validate-topics.mjs";
import { buildTopicsIndex, readRows, readTopicPages, renderTopicsIndex } from "../scripts/lib/topics.mjs";
import { checkTopicPolitics } from "../scripts/lib/topics-politics.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const TOPICS = path.join(ROOT, "client/public/topics");
const run = (script: string, ...args: string[]) =>
  spawnSync(process.execPath, [path.join(ROOT, "scripts", script), ...args], { cwd: ROOT, encoding: "utf8" });
const page = (slug: string) => JSON.parse(fs.readFileSync(path.join(TOPICS, `${slug}.json`), "utf8"));
/** A topic page as parsed JSON, edited freely by the seeded cases. */
type Page = ReturnType<typeof page>;

let ctx: ReturnType<typeof loadContext>;
let tmp: string;
beforeAll(() => {
  ctx = loadContext();
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "topics-gate-"));
});
afterAll(() => fs.rmSync(tmp, { recursive: true, force: true }));

/** The problems the gate finds in one page, changed by `edit`. */
function problemsAfter(slug: string, edit: (p: Page) => void): string {
  const p = page(slug);
  edit(p);
  return topicProblems(p, slug, ctx).problems.join("\n");
}

describe("the topics as committed", () => {
  it("pass the gate, the index check, and the politics gate", () => {
    const gate = run("validate-topics.mjs");
    expect(gate.status, gate.stderr).toBe(0);
    expect(gate.stdout).toMatch(/clean: 3 topic pages/);
    const index = run("build-topics-index.mjs", "--check");
    expect(index.status, index.stderr).toBe(0);
    const politics = run("validate-politics.mjs");
    expect(politics.status, politics.stderr).toBe(0);
    expect(politics.stdout).toMatch(/1 politics topic page\(s\) hold both directions/);
  });

  it("build the index the site reads, with every page once and the central question first", () => {
    const { index, problems } = buildTopicsIndex(readTopicPages(), readRows());
    expect(problems).toEqual([]);
    expect(renderTopicsIndex(index)).toBe(fs.readFileSync(path.join(TOPICS, "index.json"), "utf8"));
    expect(index.pages.map((p: { slug: string }) => p.slug)).toEqual(["living-after-christendom", "faith-politics-and-the-flag", "raising-children-in-a-secular-age"]);
    expect(index.rows[0].href).toBe("/topics/living-after-christendom");
  });
});

describe("a seeded bad page fails, with its reason", () => {
  it("house style: em-dash, exclamation point, Forbidden Language", () => {
    const out = problemsAfter("living-after-christendom", (p) => {
      p.short[0] = p.short[0].replace("The faith itself has not ended.", "The faith itself has not ended — not at all!");
      p.witness.line += " We have to navigate it.";
    });
    expect(out).toMatch(/short\[0\]: carries an em-dash/);
    expect(out).toMatch(/short\[0\]: carries an exclamation point/);
    expect(out).toMatch(/witness\.line: Forbidden Language: "navigate"/);
  });

  it("a statistic, or a short answer outside 150 to 250 words", () => {
    expect(problemsAfter("living-after-christendom", (p) => (p.short[1] += " About three in ten adults now say so."))).toMatch(/carries a statistic/);
    expect(problemsAfter("living-after-christendom", (p) => (p.short[1] += " Some 30% say so."))).toMatch(/carries a statistic/);
    expect(problemsAfter("living-after-christendom", (p) => (p.short = [p.short[0]]))).toMatch(/short: is \d+ words \(150 to 250\)/);
  });

  it("an empty slot: a lead that is not public with no stand-in, too few passages, no witness", () => {
    const out = problemsAfter("faith-politics-and-the-flag", (p) => {
      delete p.essayStandIn;
      p.scripture = p.scripture.slice(0, 2);
      delete p.witness;
    });
    expect(out).toMatch(/essayStandIn: is needed: the lead essay is not public/);
    expect(out).toMatch(/scripture: has 2 passages/);
    expect(out).toMatch(/witness: needs one witness/);
  });

  it("a stand-in that is not live, a redirect, an address that goes nowhere, an Honest Answer that does not exist", () => {
    const out = problemsAfter("faith-politics-and-the-flag", (p) => {
      p.essayStandIn.href = "/writing/what-render-unto-caesar-actually-means";
      p.witness.href = "/church-history";
      p.use.study.href = "/studyguides/no-such-study";
      p.care[0].href = "/help/no-such-need";
    });
    expect(out).toMatch(/essayStandIn: \/writing\/what-render-unto-caesar-actually-means is an essay that is not public/);
    expect(out).toMatch(/witness: \/church-history only works through a redirect/);
    expect(out).toMatch(/use\.study: \/studyguides\/no-such-study goes nowhere/);
    const rows = rowProblems([{ askedAs: "Q?", href: "/answers#no-such-answer", kind: "answer", line: "A line." }], ctx).problems.join("\n");
    expect(rows).toMatch(/names an Honest Answer that does not exist/);
  });

  it("a reference the parser cannot read, and a devotion that is not in the family index", () => {
    const out = problemsAfter("raising-children-in-a-secular-age", (p) => {
      p.scripture[0].ref = "Hezekiah 3:16";
      p.scripture[1].line += " (John 99:1)";
      p.table.devotion = "no-such-devotion";
    });
    expect(out).toMatch(/"Hezekiah 3:16" is not a reference the parser can read/);
    expect(out).toMatch(/"John 99:1" is not a reference the parser can read/);
    expect(out).toMatch(/"no-such-devotion" is not in client\/public\/family\/index\.json/);
    expect(problemsAfter("living-after-christendom", (p) => (p.table.label = "Another Title"))).toMatch(/table\.label: is the devotion's own title/);
  });

  it("too many tools, a sensitive page with no crisis care, a politics question without the flag", () => {
    const tools = (p: Page) => (p.use.tools = [1, 2, 3].map(() => ({ ...p.use.study })));
    expect(problemsAfter("living-after-christendom", tools)).toMatch(/use\.tools: holds at most 2 tools/);
    expect(problemsAfter("living-after-christendom", (p) => (p.sensitive = true))).toMatch(/a sensitive page carries a care link with its crisis lines/);
    expect(problemsAfter("raising-children-in-a-secular-age", (p) => p.askedAs.push("how should christians vote"))).toMatch(/flagged politics: true/);
  });

  it("an essay row with no stand-in while the essay is not public", () => {
    const rows = rowProblems([{ askedAs: "Q?", href: "/writing/why-didnt-the-bible-ban-slavery", kind: "essay", line: "A line." }], ctx).problems.join("\n");
    expect(rows).toMatch(/is not public yet and the row names no standIn/);
  });

  it("a seventh topic page, and a page no row lists", () => {
    const dir = path.join(tmp, "seven");
    fs.mkdirSync(dir, { recursive: true });
    const base = page("living-after-christendom");
    for (let i = 1; i <= 7; i++) fs.writeFileSync(path.join(dir, `topic-${i}.json`), JSON.stringify({ ...base, slug: `topic-${i}` }));
    const rowsFile = path.join(tmp, "rows.json");
    fs.writeFileSync(rowsFile, JSON.stringify({ rows: [1, 2, 3, 4, 5, 6].map((i) => ({ topic: `topic-${i}` })) }));
    const { problems } = checkTopics({ dir, rowsFile, ctx });
    expect(problems.join("\n")).toMatch(/7 topic pages; at most 6/);
    expect(problems.join("\n")).toMatch(/topic-7\.json: no row in scripts\/data\/topics-rows\.json lists this topic/);
  });
});

describe("the politics page holds both directions (validate-politics.mjs)", () => {
  function politicsFindings(edit: (p: Page) => void): string {
    const dir = path.join(tmp, `politics-${Math.random().toString(36).slice(2)}`);
    fs.mkdirSync(path.join(dir, "topics"), { recursive: true });
    const p = page("faith-politics-and-the-flag");
    edit(p);
    fs.writeFileSync(path.join(dir, "topics", "faith-politics-and-the-flag.json"), JSON.stringify(p));
    return checkTopicPolitics({ publicDir: dir, forbidden: ["leverage"] }).findings.map(([, m]: [string, string]) => m).join("\n");
  }

  it("passes as committed", () => {
    expect(politicsFindings(() => {})).toBe("");
  });

  it("fails a missing side, a side made a strawman by brevity, and a short answer that names one side", () => {
    expect(politicsFindings((p) => delete p.bothWays.left)).toMatch(/missing the left side/);
    expect(politicsFindings((p) => (p.bothWays.left.line = "The cause"))).toMatch(/bothWays imbalance/);
    expect(politicsFindings((p) => (p.short = p.short.map((s: string) => s.replace(/\bleft\b/g, "other side"))))).toMatch(/names the temptation on the right and on the left/);
  });
});
