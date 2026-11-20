/**
 * scripts/validate-questions.mjs catches what it says it catches. Each case
 * copies the committed library (client/public/questions) to a temporary
 * folder, seeds one fault, runs the validator on the copy (QUESTIONS_DIR), and
 * expects it to fail with that fault named. The clean copy passes.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "client/public/questions");
const PIECE = "text/passages-not-in-the-earliest-bibles.json";
let tmp = "";

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function seeded(change: (dir: string, edit: (rel: string, fn: (j: Json) => void) => void) => void, env: Record<string, string> = {}) {
  const dir = fs.mkdtempSync(path.join(tmp, "q-"));
  fs.cpSync(DATA, dir, { recursive: true });
  const edit = (rel: string, fn: (j: Json) => void) => {
    const p = path.join(dir, rel);
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    fn(j);
    fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
  };
  change(dir, edit);
  const r = spawnSync(process.execPath, [path.join(ROOT, "scripts/validate-questions.mjs")], {
    cwd: ROOT,
    env: { ...process.env, QUESTIONS_DIR: dir, ...env },
    encoding: "utf8",
  });
  return { code: r.status, out: `${r.stdout}${r.stderr}` };
}

const section = (j: Json, role: string) => j.sections.find((s: Json) => s.role === role);

beforeAll(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "questions-validator-"));
});
afterAll(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe("validate-questions.mjs", () => {
  it("passes the committed library", () => {
    const r = seeded(() => {});
    expect(r.out).toContain("[questions] clean");
    expect(r.code).toBe(0);
  });

  const faults: [string, (dir: string, edit: (rel: string, fn: (j: Json) => void) => void) => void, RegExp, Record<string, string>?][] = [
    ["a short answer under 80 words", (_d, e) => e(PIECE, (j) => { j.shortAnswer = "It's true, and it is known."; }), /short answer is \d+ words/],
    ["a short answer in two paragraphs", (_d, e) => e(PIECE, (j) => { j.shortAnswer = j.shortAnswer.replace(". ", ".\n\n"); }), /more than one paragraph/],
    ["no concessions", (_d, e) => e(PIECE, (j) => { j.sections = j.sections.filter((s: Json) => s.role !== "concessions"); }), /no "concessions" section/],
    ["no unresolved section", (_d, e) => e(PIECE, (j) => { j.sections = j.sections.filter((s: Json) => s.role !== "unresolved"); }), /no "unresolved" section/],
    ["sections out of order", (_d, e) => e(PIECE, (j) => { j.sections.reverse(); }), /out of the standard's order/],
    ["an objection that names no proponent", (_d, e) => e(PIECE, (j) => { section(j, "objection").body = section(j, "objection").body.replace(/Bart Ehrman/g, "A scholar"); }), /does not name its proponent/],
    ["the proponent's work missing from the other side", (_d, e) => e(PIECE, (j) => { j.otherSide = j.otherSide.filter((x: string) => !x.includes("Misquoting Jesus")); j.otherSide.push("A. N. Other, *A Book* (1999)."); }), /does not list Misquoting Jesus/],
    ["one book on the other side", (_d, e) => e(PIECE, (j) => { j.otherSide = j.otherSide.slice(0, 1); }), /"Read the other side" has 1 entries/],
    ["a reading entry with no year", (_d, e) => e(PIECE, (j) => { j.further.push("Someone, *Some Book*."); }), /"Read further" entry has no year/],
    ["one numbered step", (_d, e) => e(PIECE, (j) => { section(j, "argument").steps = [section(j, "argument").steps[0]]; section(j, "argument").weightStep = 1; }), /fewer than two numbered steps/],
    ["the weight-bearing step marked wrong", (_d, e) => e(PIECE, (j) => { section(j, "argument").weightStep = 1; }), /weightStep is 1 but the text names the third step/],
    ["a conclusion that does not begin \"So\"", (_d, e) => e(PIECE, (j) => { section(j, "argument").conclusion = "Therefore it holds."; }), /conclusion does not begin "So"/],
    ["an em-dash", (_d, e) => e(PIECE, (j) => { section(j, "reply").body += " One more thing — this."; }), /em-dash/],
    ["a forbidden word", (_d, e) => e(PIECE, (j) => { section(j, "evidence").body += " It is a rich tapestry."; }), /forbidden language "tapestry"/],
    ["an exclamation outside quoted Scripture", (_d, e) => e(PIECE, (j) => { section(j, "differ").body += " That settles it!"; }), /"!" outside quoted Scripture/],
    ["\"debunked\"", (_d, e) => e(PIECE, (j) => { section(j, "reply").body += " The objection is debunked."; }), /says "debunked"/],
    ["\"so-called\"", (_d, e) => e(PIECE, (j) => { section(j, "reply").body += " The so-called experts disagree."; }), /says "so-called"/],
    ["a link to no page", (_d, e) => e(PIECE, (j) => { j.onSite.push("A page that is not there (/no-such-page)."); }), /links \/no-such-page, which is not a page/],
    ["a Study Bible note that does not exist", (_d, e) => e(PIECE, (j) => { j.links.studyNotes.push({ book: "mark", chapter: 99 }); }), /no Study Bible note at mark 99/],
    ["an Honest Answer that does not exist", (_d, e) => e(PIECE, (j) => { j.links.answers.push("no-such-answer"); }), /Honest Answer "no-such-answer"/],
    ["a ledger key the ledger does not name", (_d, e) => e(PIECE, (j) => { j.ledger.key = "z"; }), /does not name key "z"/],
    ["a live piece linking a pending one", (d, e) => {
      const areas = JSON.parse(fs.readFileSync(path.join(d, "areas.json"), "utf8"));
      areas.areas.find((a: Json) => a.slug === "text").status = "live";
      fs.writeFileSync(path.join(d, "areas.json"), JSON.stringify(areas));
      e(PIECE, (j) => { j.status = "live"; j.onSite.push("The next page (/questions/text/who-decides-what-the-text-says)."); });
    }, /is live and links the pending page \/questions\/text\/who-decides-what-the-text-says/],
    ["an area page that leaves out a piece", (_d, e) => e("text/_area.json", (j) => { j.pieces = j.pieces.slice(1); }), /does not list its piece more-variants-than-words/],
    ["a stale manifest", (_d, e) => e(PIECE, (j) => { j.question = "A new question?"; }), /index\.json: is out of date/],
    ["nine areas", (d) => {
      const areas = JSON.parse(fs.readFileSync(path.join(d, "areas.json"), "utf8"));
      areas.areas = areas.areas.filter((a: Json) => a.slug !== "science");
      fs.writeFileSync(path.join(d, "areas.json"), JSON.stringify(areas));
    }, /lists 9 areas, not the plan's ten/],
    ["a pending page linked from a page outside the library", () => {
      fs.writeFileSync(path.join(tmp, "outside.tsx"), `export const x = <a href="/questions/text/who-decides-what-the-text-says">Read</a>;\n`);
    }, /outside\.tsx: links the pending page \/questions\/text\/who-decides-what-the-text-says/, { QUESTIONS_SCAN: "" }],
    ["a pending page in the sitemap", () => {
      fs.writeFileSync(path.join(tmp, "outside.tsx"), `<url><loc>https://www.livewellbyjamesbell.co/questions/text/lost-in-translation</loc></url>\n`);
    }, /outside\.tsx: links the pending page \/questions\/text\/lost-in-translation/, { QUESTIONS_SCAN: "" }],
  ];

  for (const [name, change, want, env] of faults) {
    it(`catches ${name}`, () => {
      const r = seeded(change, env && "QUESTIONS_SCAN" in env ? { QUESTIONS_SCAN: path.join(tmp, "outside.tsx") } : {});
      expect(r.code, r.out).toBe(1);
      expect(r.out).toMatch(want);
    });
  }
});
