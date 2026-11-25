/**
 * scripts/validate-tracks.mjs catches what it says it catches. Each case
 * copies the committed library (client/public/tracks) to a temporary folder,
 * seeds one fault, rebuilds that copy's index so only the fault is wrong,
 * runs the gate on the copy (TRACKS_DIR), and expects it to fail with the
 * fault named. The clean copy passes.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "client/public/tracks");
const TRACK = "new-to-this.json";
let tmp = "";

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function run(script: string, dir: string, args: string[] = []) {
  const r = spawnSync(process.execPath, [path.join(ROOT, "scripts", script), ...args], {
    cwd: ROOT,
    env: { ...process.env, TRACKS_DIR: dir },
    encoding: "utf8",
  });
  return { code: r.status, out: `${r.stdout}${r.stderr}` };
}

function seeded(change: (j: Json) => void, { reindex = true, file = TRACK } = {}) {
  const dir = fs.mkdtempSync(path.join(tmp, "t-"));
  fs.cpSync(DATA, dir, { recursive: true });
  const p = path.join(dir, file);
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  change(j);
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
  if (reindex) run("build-tracks-index.mjs", dir);
  return run("validate-tracks.mjs", dir);
}

beforeAll(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "tracks-validator-"));
});
afterAll(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe("validate-tracks.mjs", () => {
  it("passes the committed library", () => {
    const r = seeded(() => {});
    expect(r.out).toContain("[tracks] clean");
    expect(r.code).toBe(0);
  });

  const faults: [string, (j: Json) => void, RegExp][] = [
    ["a link to a page that does not exist", (j) => { j.sessions[0].open.href = "/study/bible/mark/99"; }, /sessions\[0\]\.open: \/study\/bible\/mark\/99 does not exist/],
    ["a link that is a redirect", (j) => { j.sessions[3].open = { ...j.sessions[3].open, kind: "tool", href: "/tools/glossary-old" }; j.sessions[3].also[0].href = "/membership"; }, /does not exist|redirects to/],
    ["a link of the wrong kind", (j) => { j.sessions[1].open.kind = "chapter"; }, /is not an address of kind "chapter"/],
    ["Scripture misquoted in the teaching", (j) => { j.sessions[2].teaching[0] = j.sessions[2].teaching[0].replace("it is the gift of God", "it is a gift from God"); }, /sessions\[2\]\.teaching\[0\]: not word for word from the Berean Standard Bible at Ephesians 2:8-9/],
    ["a quotation with no reference", (j) => { j.sessions[4].teaching[0] = j.sessions[4].teaching[0].replace(" (Matthew 6:9)", ""); }, /double quotation marks are for Scripture with its reference/],
    ["a verse to keep that is not the BSB's words", (j) => { j.sessions[8].verse.text = "If we confess our sins, he is faithful and righteous to forgive us."; }, /sessions\[8\]\.verse: not word for word from the Berean Standard Bible at 1 John 1:9/],
    ["a forbidden word", (j) => { j.sessions[10].teaching[1] += " Faith is a journey."; }, /forbidden language "journey"/],
    ["a forbidden phrase", (j) => { j.sessions[6].do += " Keep showing up."; }, /forbidden language "showing up"/],
    ["an em-dash", (j) => { j.sessions[5].teaching[0] = j.sessions[5].teaching[0].replace("himself, the", "himself — the"); }, /sessions\[5\]\.teaching\[0\]: em-dash/],
    ["an exclamation point outside Scripture", (j) => { j.sessions[11].do += " Well done!"; }, /exclamation point outside quoted Scripture/],
    ["the first person", (j) => { j.sessions[0].teaching[1] += " When I first read Mark, it moved me."; }, /first person/],
    ["a prayer to recite", (j) => { j.sessions[2].group.pray = "Dear Lord, thank you for the gift of grace, and forgive each one of us who has tried to earn it. Amen."; }, /never a prayer to recite/],
    ["pressure", (j) => { j.sessions[1].do += " Pray this prayer tonight to be saved."; }, /pressure/],
    ["a session with no question", (j) => { delete j.sessions[7].question; }, /sessions\[7\]\.question: missing/],
    ["a session with no thing to do", (j) => { delete j.sessions[7].do; }, /sessions\[7\]\.do: missing/],
    ["a session with no verse", (j) => { delete j.sessions[7].verse; }, /sessions\[7\]\.verse: needs a ref and its text/],
    ["a session with nothing to open", (j) => { delete j.sessions[7].open; }, /sessions\[7\]\.open: missing/],
    ["a group guide with two questions", (j) => { j.sessions[7].group.discuss.pop(); }, /exactly three questions/],
    ["a session on sin with no care line", (j) => { delete j.sessions[8].care; }, /sessions\[8\]\.care: the session touches "\w+" and carries no care line/],
    ["a care line written new", (j) => { j.sessions[8].care = ["If you are worried, talk to someone. The Find Help page lists places to turn."]; }, /reused whole from the Study Bible's plain-words notes/],
    ["a phone number", (j) => { j.sessions[8].teaching[1] += " Call 988 if you need to."; }, /a phone number/],
    ["too few kinds of page", (j) => { for (const s of j.sessions) { s.open = { ...j.sessions[0].open }; delete s.also; } }, /uses 1 kinds of page/],
    ["sessions out of order", (j) => { j.sessions[4].n = 9; }, /sessions\[4\]: n should be 5/],
  ];

  for (const [name, change, expected] of faults) {
    it(`fails on ${name}`, () => {
      const r = seeded(change);
      expect(r.out).toMatch(expected);
      expect(r.code).toBe(1);
    });
  }

  // A leader's guide (the skeptic's track has one) keeps its parts in order, names Find Help, and keeps the voice rules.
  const leaderFaults: [string, (j: Json) => void, RegExp][] = [
    ["a leader's guide with a part missing", (j) => { j.leader.sections.splice(1, 1); }, /leader\.sections: the parts are group, room, order, hard, hurting, help, in that order/],
    ["a leader's guide with its parts out of order", (j) => { j.leader.sections.reverse(); }, /in that order/],
    ["a meeting with no steps", (j) => { delete j.leader.sections[2].steps; }, /leader\.sections\[2\]\.steps: four to eight steps/],
    ["steps in a part that is not the order of a meeting", (j) => { j.leader.sections[0].steps = ["One step that does not belong here at all."]; }, /only the order of a meeting has steps/],
    ["a word on Find Help that never names it", (j) => { j.leader.sections[5].body = ["Point someone to a counsellor when a question has become a weight they cannot put down, and stay with them while they make the first call."]; }, /leader\.sections\[5\]\.body: names Find Help/],
    ["the first person in a leader's guide", (j) => { j.leader.about[0] += " I have led groups like this for years."; }, /leader\.about\[0\]: first person/],
    ["a phone number in a leader's guide", (j) => { j.leader.sections[5].body[0] += " Call 988 at any hour."; }, /leader\.sections\[5\]\.body\[0\]: a phone number/],
  ];
  for (const [name, change, expected] of leaderFaults) {
    it(`fails on ${name}`, () => {
      const r = seeded(change, { file: "skeptical.json" });
      expect(r.out).toMatch(expected);
      expect(r.code).toBe(1);
    });
  }

  it("fails when the index is stale", () => {
    const r = seeded((j) => { j.sessions[0].title = "Who is Jesus"; }, { reindex: false });
    expect(r.out).toMatch(/index\.json: out of date/);
    expect(r.code).toBe(1);
  });

  it("the index check fails on a stale index and passes on a fresh one", () => {
    const dir = fs.mkdtempSync(path.join(tmp, "i-"));
    fs.cpSync(DATA, dir, { recursive: true });
    expect(run("build-tracks-index.mjs", dir, ["--check"]).code).toBe(0);
    fs.writeFileSync(path.join(dir, "index.json"), "{}\n");
    expect(run("build-tracks-index.mjs", dir, ["--check"]).code).toBe(1);
  });
});
