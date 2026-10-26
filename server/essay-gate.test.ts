/**
 * The essay gate (scripts/validate-essays.mjs) and the essay scope of
 * validate-no-emdash.mjs and validate-grow-voice.mjs: they pass on the essays
 * folder as committed, pass a seeded clean file, and fail a seeded bad one
 * with the reason a writer can act on.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import shelfJson from "../client/src/lib/shelf.json";
import vercelJson from "../vercel.json";
import {
  dashesIn,
  hasReferenceBeside,
  hasScriptureRef,
  maskQuotations,
  readEssayText,
} from "../scripts/lib/essay-text.mjs";
import { checkEssayFiles } from "../scripts/validate-essays.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const run = (script: string, ...args: string[]) =>
  spawnSync(process.execPath, [path.join(ROOT, "scripts", script), ...args], { cwd: ROOT, encoding: "utf8" });

const LIVE = shelfJson.essays.find((e) => e.status === "live")!.slug;
const PENDING = shelfJson.essays.find((e) => e.status === "pending")!.slug;
const REDIRECT = vercelJson.redirects.find((r) => /^\/[a-z-]+$/.test(r.source))!.source;

/** Plain filler so a seeded body clears the 600-character floor. */
const FILLER = Array(6)
  .fill("This paragraph is test text for the essay gate, written plainly so that only the seeded faults are found.")
  .join(" ");

const GOOD_BODY = `## Where It Starts

${FILLER}

The verse most often quoted is Psalm 33:12: "Blessed is the nation whose God is the LORD, the people whom he has chosen as his heritage!" The second line defines the first.

Paul asks Philemon to take Onesimus back "no longer as a bondservant but more than a bondservant, as a beloved brother—especially to me" (Philemon 16). A quotation keeps its own punctuation.

> Keep your conduct among the Gentiles honorable (1 Peter 2:12).

Read [a live essay](/writing/${LIVE}), the [Study Bible](/study/bible), or [Find Help](/help).

*"For here we have no lasting city, but we seek the city that is to come."* (Hebrews 13:14)
`;

const BAD_BODY = `# A Second Title

${FILLER}

We have to navigate this, and the verdict is not close. A pause — here, and word---word, and word--word.

Look at this! And a quotation, "Hooray!" with no reference beside it.

He said "this and never closed it.

See [a pending essay](/writing/no-such-essay-for-the-gate), [an old page](${REDIRECT}), and [a relative one](writing/${LIVE}).

*"For here we have no lasting city."*
— Hebrews 13:14
`;

const essay = (body: string, extra: Record<string, unknown> = {}) => ({
  slug: PENDING,
  title: "A Seeded Essay for the Gate",
  excerpt: "One plain sentence about what this seeded essay is for.",
  body,
  updated: "2026-10-26",
  ...extra,
});

let tmp = "";
const dirs = { good: "", bad: "", noRef: "" };

beforeAll(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "essay-gate-"));
  const write = (name: keyof typeof dirs, data: object) => {
    dirs[name] = path.join(tmp, name);
    fs.mkdirSync(dirs[name]);
    fs.writeFileSync(path.join(dirs[name], `${PENDING}.json`), JSON.stringify(data, null, 2));
  };
  write("good", essay(GOOD_BODY));
  write("bad", essay(BAD_BODY, { excerpt: "A line — with a dash.", exerpt: "a typo" }));
  write("noRef", essay(`## Plain\n\n${FILLER}\n\n${FILLER}\n`));
});

afterAll(() => {
  if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
});

describe("essay-text helpers", () => {
  it("separates quotations, curly or straight, from the prose around them", () => {
    const t = 'He wrote, “a framework—a collection” and then "more—here" — and on.';
    const { prose, quotes } = maskQuotations(t);
    expect(quotes.map((q) => q.text)).toEqual(["a framework—a collection", "more—here"]);
    expect(prose.length).toBe(t.length);
    expect(dashesIn(prose).map((d) => d.kind)).toEqual(["em-dash"]);
  });

  it("treats a block quote as a quotation and reports an unpaired mark", () => {
    const { quotes, unbalanced } = maskQuotations('> Someone else\'s words — kept.\n\nA "stray mark here.');
    expect(quotes[0].block).toBe(true);
    expect(unbalanced).toHaveLength(1);
  });

  it("finds a Scripture reference beside a quotation, before or after", () => {
    for (const t of [
      'Psalm 33:12: "Blessed is the nation!"',
      '"Would that you had known!" (Luke 19:41–42).',
      '*"Honor everyone."* (1 Peter 2:17)',
    ]) {
      const { quotes } = readEssayText(t);
      expect(hasReferenceBeside(t, quotes[0]), t).toBe(true);
    }
    const t = 'He shouted "Hooray!" and left.';
    expect(hasReferenceBeside(t, readEssayText(t).quotes[0])).toBe(false);
  });

  it("recognizes references by shape, not dates or names", () => {
    expect(hasScriptureRef("as Hebrews 11:13, 16 says")).toBe(true);
    expect(hasScriptureRef("Song of Songs 2:1")).toBe(true);
    expect(hasScriptureRef("Psalm 23")).toBe(true);
    expect(hasScriptureRef("ratified December 15, 1791")).toBe(false);
  });

  it("counts the dashes typed in an em-dash's place, never a range", () => {
    const kinds = dashesIn("a---b, c--d, e – f, 1914–1918, Romans 9:2–3", { standIns: true }).map((d) => d.kind);
    expect(kinds).toHaveLength(3);
  });

  it("never reads a link target as prose", () => {
    expect(readEssayText("See [this](/writing/the-journey-home).").prose).not.toContain("journey");
  });
});

describe("validate-essays", () => {
  it("passes the essays folder as committed", () => {
    const r = run("validate-essays.mjs");
    expect(r.status, r.stderr).toBe(0);
  });

  it("passes a seeded clean essay", () => {
    expect(checkEssayFiles([path.join(dirs.good, `${PENDING}.json`)]).problems).toEqual([]);
    const r = run("validate-essays.mjs", dirs.good);
    expect(r.status, r.stderr).toBe(0);
  });

  it("fails a seeded bad essay, naming each fault", () => {
    const r = run("validate-essays.mjs", dirs.bad);
    expect(r.status).toBe(1);
    for (const reason of [
      'unknown field "exerpt"',
      "excerpt: em-dash",
      "an H1 heading",
      'Forbidden Language "navigate"',
      'rulebook leakage "verdict"',
      "body line 5: em-dash",
      '"---" (the page renders it as an em-dash)',
      "double hyphen standing in for an em-dash",
      "exclamation point outside quoted Scripture",
      "exclamation point in a quotation with no Scripture reference beside it",
      "a quotation mark with no partner in its paragraph",
      "/writing/no-such-essay-for-the-gate is not a public essay",
      `${REDIRECT} redirects to`,
      'link "writing/',
      "a Closing Texts line reads",
    ])
      expect(r.stderr).toContain(reason);
  });

  it("reads a line that goes on in prose after an italic quotation as prose, not a Closing Text", () => {
    const file = path.join(dirs.good, `${PENDING}.json`);
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    const line = '*"Grace,"* he said, and then *"peace."*';
    const dir = fs.mkdtempSync(path.join(tmp, "prose-"));
    fs.writeFileSync(path.join(dir, `${PENDING}.json`), JSON.stringify({ ...data, body: `${data.body}\n${line}\n` }));
    expect(checkEssayFiles([path.join(dir, `${PENDING}.json`)]).problems).toEqual([]);
  });

  it("fails an essay that cites no Scripture by reference", () => {
    const { problems } = checkEssayFiles([path.join(dirs.noRef, `${PENDING}.json`)]);
    expect(problems.join("\n")).toContain("cites no Scripture by reference");
  });
});

describe("the em-dash and Forbidden Language ratchets cover the essays", () => {
  it("pass the essays folder as committed", () => {
    expect(run("validate-no-emdash.mjs").status).toBe(0);
    expect(run("validate-grow-voice.mjs", "--essays", path.join(ROOT, "client/public/essays")).status).toBe(0);
  });

  it("pass a seeded clean essay, whose quotations keep their own em-dashes", () => {
    const e = run("validate-no-emdash.mjs", "--essays", dirs.good);
    expect(e.status, e.stderr).toBe(0);
    const v = run("validate-grow-voice.mjs", "--essays", dirs.good);
    expect(v.status, v.stderr).toBe(0);
  });

  it("fail a seeded bad essay", () => {
    const e = run("validate-no-emdash.mjs", "--essays", dirs.bad);
    expect(e.status).toBe(1);
    expect(e.stderr).toContain("outside quotations");
    const v = run("validate-grow-voice.mjs", "--essays", dirs.bad);
    expect(v.status).toBe(1);
    expect(v.stderr).toContain('"navigate"');
  });
});
