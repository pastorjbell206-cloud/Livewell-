/**
 * The family gate (scripts/validate-family.mjs) passes on the family libraries
 * as committed and fails, with a reason a writer can act on, on each seeded
 * fault: a duplicate devotion id, an id removed or renamed without a redirect,
 * an em-dash outside quoted Scripture, a count the copy gets wrong, a family
 * file it does not know, a half-claimed age band, a new catechism repeat, a
 * page that names the wrong translation, and a year map naming a devotion that
 * does not exist.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkFamily, countWord, freezeIds, kindOf, renderingsIn, FROZEN_IDS } from "../scripts/validate-family.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "client/public");
const FAMILY = fs.readdirSync(PUBLIC).filter((n) => /^family-.*\.json$/.test(n));

type Devotion = { id: string; title: string; reflection: string; questions: unknown };

let tmp = "";
let pub = "";
const read = <T = unknown>(name: string): T => JSON.parse(fs.readFileSync(path.join(pub, name), "utf8"));
const write = (name: string, data: unknown) => fs.writeFileSync(path.join(pub, name), JSON.stringify(data, null, 2));
// Seeded scenarios read no year map unless they pass one: the repo's generated
// map (U10) names the committed ids, so a scenario that renames or removes a
// devotion would otherwise fail on the map instead of on what it is testing.
// The year-map test below seeds its own; "passes as committed" reads the real one.
const errorsOf = (opts: Parameters<typeof checkFamily>[0] = {}) =>
  checkFamily({ publicDir: pub, yearMapFile: path.join(tmp, "no-year-map.ts"), ...opts }).errors;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "family-gate-"));
  pub = path.join(tmp, "public");
  fs.mkdirSync(pub);
  for (const f of FAMILY) fs.copyFileSync(path.join(PUBLIC, f), path.join(pub, f));
});

afterEach(() => {
  if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
});

describe("validate-family.mjs", () => {
  it("passes on the family libraries as committed", () => {
    const run = spawnSync(process.execPath, [path.join(ROOT, "scripts/validate-family.mjs")], { cwd: ROOT, encoding: "utf8" });
    expect(run.status, run.stderr).toBe(0);
    expect(run.stdout).toMatch(/Family libraries: clean/);
    expect(checkFamily().errors).toEqual([]);
  });

  it("reads every family-*.json by name, not from a hand list", () => {
    expect(FAMILY.length).toBeGreaterThanOrEqual(5);
    for (const f of FAMILY) expect(kindOf(f), f).not.toBeNull();
    expect(kindOf("family-devotions-world.json")).toBe("devotions");
    expect(kindOf("family-recipes.json")).toBeNull();
  });

  it("fails on a seeded duplicate devotion id", () => {
    const second = read<Devotion[]>("family-devotions-2.json");
    second[0].id = "identity";
    write("family-devotions-2.json", second);
    expect(errorsOf().some((e) => /id "identity" is also client\/public\/family-devotions\.json\[0\]/.test(e))).toBe(true);
  });

  it("fails on a seeded duplicate title", () => {
    const second = read<Devotion[]>("family-devotions-2.json");
    second[0].title = "Made On Purpose";
    write("family-devotions-2.json", second);
    expect(errorsOf().some((e) => /title "Made On Purpose" is also/.test(e))).toBe(true);
  });

  it("fails when a frozen id is renamed without a redirect, and passes with one", () => {
    const first = read<Devotion[]>("family-devotions.json");
    first[0].id = "made-on-purpose";
    write("family-devotions.json", first);
    const errors = errorsOf();
    expect(errors.some((e) => /devotion id "identity" was removed or renamed without a redirect entry/.test(e))).toBe(true);
    expect(errors.some((e) => /devotion id "made-on-purpose" is not in .* yet/.test(e))).toBe(true);

    // The repair: a redirect from the old address, and the new id frozen too.
    const frozenFile = path.join(tmp, "ids.json");
    const frozen = JSON.parse(fs.readFileSync(path.join(ROOT, FROZEN_IDS), "utf8"));
    fs.writeFileSync(frozenFile, JSON.stringify({ ...frozen, ids: [...frozen.ids, "made-on-purpose"] }));
    const redirectsFile = path.join(tmp, "vercel.json");
    fs.writeFileSync(redirectsFile, JSON.stringify({ redirects: [{ source: "/family/devotions/identity", destination: "/family/devotions/made-on-purpose", permanent: true }] }));
    expect(errorsOf({ frozenFile, redirectsFile })).toEqual([]);
  });

  it("fails when a redirect lands on a devotion that does not exist", () => {
    const first = read<Devotion[]>("family-devotions.json");
    first.splice(0, 1);
    write("family-devotions.json", first);
    const redirectsFile = path.join(tmp, "vercel.json");
    fs.writeFileSync(redirectsFile, JSON.stringify({ redirects: [{ source: "/family/devotions/identity", destination: "/family/devotions/nowhere" }] }));
    expect(errorsOf({ redirectsFile }).some((e) => /\/family\/devotions\/identity must redirect to .* \("nowhere" does not\)/.test(e))).toBe(true);
  });

  it("--freeze adds new ids and never removes one", () => {
    const frozenFile = path.join(tmp, "ids.json");
    fs.writeFileSync(frozenFile, JSON.stringify({ about: "kept", ids: ["retired-long-ago", "identity"] }));
    const added = freezeIds({ publicDir: pub, frozenFile });
    const after = JSON.parse(fs.readFileSync(frozenFile, "utf8"));
    expect(after.about).toBe("kept");
    expect(after.ids.slice(0, 2)).toEqual(["retired-long-ago", "identity"]);
    expect(added).not.toContain("identity");
    expect(after.ids).toHaveLength(2 + added.length);
  });

  it("fails on an em-dash outside quoted Scripture, and allows one inside a quotation", () => {
    const first = read<Devotion[]>("family-devotions.json");
    first[1].reflection = "A line with a pause — like this.";
    first[2].reflection = "Jesus said, “Come to Me—all of you,” and meant it.";
    first[3].reflection = "A line -- with two hyphens.";
    first[4].reflection = "A line-- typed the other way.";
    write("family-devotions.json", first);
    const errors = errorsOf();
    expect(errors.some((e) => /family-devotions\.json\[1\]\.reflection: em-dash outside a quotation/.test(e))).toBe(true);
    expect(errors.some((e) => /family-devotions\.json\[2\]\.reflection/.test(e))).toBe(false);
    expect(errors.some((e) => /family-devotions\.json\[3\]\.reflection: "--" standing in/.test(e))).toBe(true);
    expect(errors.some((e) => /family-devotions\.json\[4\]\.reflection: "--" standing in/.test(e))).toBe(true);
    // The committed passage text keeps the BSB's own em-dashes.
    expect(read<{ passageText: string }[]>("family-devotions.json").some((d) => d.passageText.includes("—"))).toBe(true);
  });

  it("fails when copy states the wrong count", () => {
    const copy: [string, string][] = [
      ["seeded/catalogue.mjs", 'summary: clip("A 52-question family catechism in the New City Catechism tradition."), href: "/family/catechism"'],
      ["seeded/Hub.tsx", '{ href: "/family/catechism", note: "Seventy-six questions and answers, one at a time." }'],
      ["seeded/Devotions.tsx", "Seventy weekly devotions, more than a year of them."],
      ["seeded/Tools.tsx", 'title: "Marriage health assessment", dek: "A 15-question diagnostic across trust and conflict."'],
      // Another catechism's own count, on a page that does not point at ours.
      ["seeded/Glossary.tsx", "The Westminster Shorter Catechism (1647) puts the faith in 107 questions."],
    ];
    const errors = errorsOf({ copy });
    expect(errors).toContain('seeded/catalogue.mjs: says "52-question" about the catechism, which has 76 questions');
    expect(errors.some((e) => e.startsWith("seeded/Hub.tsx"))).toBe(false);
    expect(errors.some((e) => /seeded\/Devotions\.tsx: says "Seventy weekly devotions", but \/family\/devotions lists 72/.test(e))).toBe(true);
    expect(errors.some((e) => e.startsWith("seeded/Tools.tsx"))).toBe(false);
    expect(errors.some((e) => e.startsWith("seeded/Glossary.tsx"))).toBe(false);
  });

  it("reads count words", () => {
    expect(countWord("76")).toBe(76);
    expect(countWord("Seventy-six")).toBe(76);
    expect(countWord("seventy")).toBe(70);
  });

  it("checks each reading plan's stated length against its days", () => {
    const plans = read<{ length: string }[]>("family-reading-plans.json");
    plans[0].length = "31 days";
    write("family-reading-plans.json", plans);
    expect(errorsOf().some((e) => /says "31 days" but has 30 days/.test(e))).toBe(true);
  });

  it("fails on a family file it does not know, and checks a new devotion strand by its name", () => {
    write("family-recipes.json", []);
    const first = read<Devotion[]>("family-devotions.json");
    write("family-devotions-world.json", [{ ...first[0], id: "the-only-christian-in-class", title: "The Only Christian in Class" }]);
    const errors = errorsOf();
    expect(errors.some((e) => /family-recipes\.json: not a family library this gate knows/.test(e))).toBe(true);
    // A new strand is read as devotions: its id must be frozen before it ships.
    expect(errors.some((e) => /devotion id "the-only-christian-in-class" is not in .* yet/.test(e))).toBe(true);
  });

  it("requires both age bands where a devotion claims them", () => {
    const first = read<Devotion[]>("family-devotions.json");
    first[0].questions = { together: ["What did you hear?"], younger: ["Who made you?"] };
    first[1].questions = {
      younger: ["Who made you?", "What scares you?", "Who keeps you safe?"],
      older: ["What does it mean to be made on purpose?", "What do you do with fear?", "Whom do you trust, and why?"],
    };
    write("family-devotions.json", first);
    const errors = errorsOf();
    expect(errors.some((e) => /family-devotions\.json\[0\] identity: questions are split by age, so questions\.older needs its questions/.test(e))).toBe(true);
    expect(errors.some((e) => /family-devotions\.json\[1\]/.test(e))).toBe(false);
  });

  it("holds every band to three questions and never asks one twice (U21: an older band cannot be a copy)", () => {
    const first = read<Devotion[]>("family-devotions.json");
    const q = first[0].questions as { younger: string[]; older: string[] };
    first[0].questions = { younger: q.younger, older: q.older.slice(0, 2) };
    first[1].questions = { younger: (first[1].questions as { younger: string[] }).younger, older: [...(first[1].questions as { younger: string[] }).younger] };
    write("family-devotions.json", first);
    const errors = errorsOf();
    expect(errors).toContain("client/public/family-devotions.json[0] identity: questions.older has 2 questions; each age band carries 3");
    expect(errors.some((e) => /family-devotions\.json\[1\] fear-and-anxiety: questions\.older repeats a question already in questions\.younger/.test(e))).toBe(true);
  });

  it("gives every Foundations devotion a theme group the library knows", () => {
    const first = read<Array<Devotion & { group?: string }>>("family-devotions.json");
    delete first[0].group;
    first[1].group = "feelings-and-such";
    write("family-devotions.json", first);
    const errors = errorsOf();
    expect(errors.some((e) => /family-devotions\.json\[0\] identity: group must be one of god, story/.test(e))).toBe(true);
    expect(errors.some((e) => /family-devotions\.json\[1\] fear-and-anxiety: group must be one of/.test(e))).toBe(true);
  });

  it("checks each line for the grown-ups and the page it links", () => {
    type WithGrownups = Devotion & { grownups?: { line: string; href: string } };
    const first = read<WithGrownups[]>("family-devotions.json");
    const at = (id: string) => first.find((d) => d.id === id)!;
    expect(at("fear-and-anxiety").grownups?.href).toBe("/help/anxiety");
    at("fear-and-anxiety").grownups = { line: "If worry keeps you awake, start here.", href: "/help/no-such-page" };
    at("identity").grownups = { line: "A line with no end", href: "/writing/some-essay" };
    write("family-devotions.json", first);
    const errors = errorsOf();
    expect(errors.some((e) => /fear-and-anxiety: grownups\.href "\/help\/no-such-page" has no care page/.test(e))).toBe(true);
    expect(errors.some((e) => /identity: grownups\.line is one short sentence/.test(e))).toBe(true);
    expect(errors.some((e) => /identity: grownups\.href "\/writing\/some-essay" is not a page a grown-ups line can link yet/.test(e))).toBe(true);
  });

  it("fails Forbidden Language in the family files' own prose", () => {
    const first = read<Devotion[]>("family-devotions.json");
    first[0].reflection = `${first[0].reflection} Growing up is a journey.`;
    write("family-devotions.json", first);
    expect(errorsOf()).toContain('client/public/family-devotions.json[0].reflection: "journey" is on the Forbidden Language list (CLAUDE.md)');
  });

  it("flags the known catechism repeats and fails a new one", () => {
    const { notes } = checkFamily({ publicDir: pub });
    expect(notes.filter((n) => /U40 removes the repeat/.test(n))).toHaveLength(5);
    const cat = read<{ number: number; question: string }[]>("family-catechism.json");
    cat[1].question = cat[0].question;
    write("family-catechism.json", cat);
    expect(errorsOf().some((e) => /questions Q1 and Q2 ask the same question/.test(e))).toBe(true);
  });

  it("names one translation per surface", () => {
    expect([...renderingsIn('<ScriptureNote rendering={tab === "weekly" ? "bsb" : "paraphrase"} />')].sort()).toEqual(["bsb", "paraphrase"]);
    const page = path.join(tmp, "Seeded.tsx");
    fs.writeFileSync(page, '<ScriptureNote rendering="kjv" />');
    const errors = errorsOf({ pages: [["seeded/Seeded.tsx", ["catechism"], page]] });
    expect(errors).toContain("seeded/Seeded.tsx: its <ScriptureNote> names kjv, but the libraries it shows are in bsb");
  });

  it("checks the year map, once it exists, names only real devotions", () => {
    const yearMapFile = path.join(tmp, "familyYear.generated.ts");
    fs.writeFileSync(yearMapFile, 'export const WEEKS = [{ week: "2026-11-01", devotion: "identity" }, { week: "2026-11-08", devotion: "no-such-devotion" }];\n');
    const errors = errorsOf({ yearMapFile });
    expect(errors.some((e) => /names devotion "no-such-devotion", which does not exist/.test(e))).toBe(true);
    expect(errors.some((e) => /names devotion "identity"/.test(e))).toBe(false);
  });
});
