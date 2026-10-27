/**
 * After the vote (U11): two family devotions on politics in
 * client/public/family-devotions-world.json, hidden behind one flag (`live`).
 *
 * - The family gate checks every hidden devotion (shape, BSB, unique id) but
 *   does not freeze it, and asks for the freeze the moment it goes live; a
 *   frozen id may not be hidden again; the year map may not name a hidden one.
 * - The family index is exactly what it would be without the file while the
 *   strand is hidden, and gives each devotion a numbered row in its strand
 *   once it is live.
 * - A hand override pinning a hidden devotion waits (a note, the rotation
 *   keeps the week) and pins the week once the strand is live.
 * - The politics gate holds a politics devotion's two sides to one word band,
 *   refuses one side only, and refuses a devotion that talks about voting
 *   without the mark.
 *
 * Every test holds whichever way the flag is committed: the hidden and live
 * cases run on copies with the flag set for them, so publishing (the four
 * steps in scripts/lib/family-devotion-file.mjs) needs no edit here.
 */
import { describe, it, expect, afterEach } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkFamily, FROZEN_IDS } from "../scripts/validate-family.mjs";
// @ts-expect-error: a plain .mjs build module without types
import {
  buildFamilyIndex,
  renderFamilyIndex,
  INDEX,
} from "../scripts/lib/family-index.mjs";
// @ts-expect-error: a plain .mjs build module without types
import { buildYearMap, loadInputs } from "../scripts/lib/family-year.mjs";
// @ts-expect-error: a plain .mjs build module without types
import { checkFamilyPolitics } from "../scripts/lib/family-politics.mjs";
// @ts-expect-error: a plain .mjs build module without types
import { devotionsIn } from "../scripts/lib/family-devotion-file.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "client/public");
const WORLD = "family-devotions-world.json";
const IDS = ["grown-ups-voted-differently", "praying-for-leaders"];

type Side = { label: string; text: string };
type Devotion = {
  id: string;
  passageText: string;
  reflection: string;
  politics?: boolean;
  sides?: Side[];
  activity: string;
};
type Strand = { about: string; live: boolean; devotions: Devotion[] };

const dirs: string[] = [];
afterEach(() => {
  for (const d of dirs.splice(0))
    fs.rmSync(d, { recursive: true, force: true });
});

/** A copy of client/public's family files (and the repo files the builders read) in a temp root. */
function seeded(change: (pub: string) => void = () => {}): {
  root: string;
  pub: string;
} {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "family-world-"));
  dirs.push(root);
  const pub = path.join(root, "client/public");
  fs.mkdirSync(pub, { recursive: true });
  for (const f of fs
    .readdirSync(PUBLIC)
    .filter(n => /^family-.*\.json$/.test(n)))
    fs.copyFileSync(path.join(PUBLIC, f), path.join(pub, f));
  // The care pages a grown-ups line links (U21's index and gate read their titles).
  fs.cpSync(path.join(PUBLIC, "needs"), path.join(pub, "needs"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(root, "scripts/data"), { recursive: true });
  fs.copyFileSync(path.join(ROOT, FROZEN_IDS), path.join(root, FROZEN_IDS));
  change(pub);
  return { root, pub };
}
const readStrand = (pub: string): Strand =>
  JSON.parse(fs.readFileSync(path.join(pub, WORLD), "utf8"));
const writeStrand = (pub: string, data: unknown) =>
  fs.writeFileSync(path.join(pub, WORLD), JSON.stringify(data, null, 2));
const goLive = (pub: string) =>
  writeStrand(pub, { ...readStrand(pub), live: true });
const hide = (pub: string) =>
  writeStrand(pub, { ...readStrand(pub), live: false });
/** The two weeks after the vote that family-year-overrides.json pins. */
const PINNED = ["2026-11-08", "2026-11-15"];
type Week = { start: string; devotion: string | null; pinned?: true };
const weekOf = (map: { weeks: Week[] }, start: string) =>
  map.weeks.find(w => w.start === start);
const familyErrors = (
  root: string,
  pub: string,
  extra: Parameters<typeof checkFamily>[0] = {}
) =>
  checkFamily({
    root,
    publicDir: pub,
    frozenFile: path.join(root, FROZEN_IDS),
    redirectsFile: path.join(ROOT, "vercel.json"),
    yearMapFile: path.join(root, "no-year-map.ts"),
    pages: [],
    copy: [],
    ...extra,
  }).errors;

describe("the after-the-vote devotions, as committed", () => {
  const strand = readStrand(PUBLIC);

  it("are two devotions in the strand file, behind one flag", () => {
    expect(typeof strand.live).toBe("boolean");
    expect(devotionsIn(strand)).toMatchObject({
      shape: "strand",
      live: strand.live,
    });
    expect(strand.devotions.map(d => d.id)).toEqual(IDS);
    const { hidden, ids } = checkFamily();
    expect(hidden).toEqual(strand.live ? [] : IDS);
    for (const id of IDS) expect(ids.includes(id)).toBe(strand.live);
  });

  it("are in the committed family index exactly when the flag is live", () => {
    const committed = JSON.parse(
      fs.readFileSync(path.join(ROOT, INDEX), "utf8")
    );
    const rows = committed.devotions.filter(
      (r: { file: string }) => r.file === `/${WORLD}`
    );
    expect(rows.map((r: { id: string }) => r.id)).toEqual(
      strand.live ? IDS : []
    );
  });

  it("pass the politics gate (both sides, one band, house style)", () => {
    const run = spawnSync(
      process.execPath,
      [path.join(ROOT, "scripts/validate-politics.mjs")],
      { cwd: ROOT, encoding: "utf8" }
    );
    expect(run.status, run.stderr).toBe(0);
    expect(run.stdout).toMatch(/2 family politics devotions/);
  });
});

describe("the after-the-vote devotions while hidden", () => {
  it("leave the family index exactly as it is without them", () => {
    const { root: without } = seeded(pub => fs.rmSync(path.join(pub, WORLD)));
    const { root: hidden } = seeded(hide);
    for (const r of [without, hidden])
      fs.mkdirSync(path.join(r, "client/public/needs"), { recursive: true });
    const withHidden = buildFamilyIndex(hidden);
    expect(withHidden.problems).toEqual([]);
    expect(renderFamilyIndex(withHidden.index)).toBe(
      renderFamilyIndex(buildFamilyIndex(without).index)
    );
  });

  it("are pinned to the two weeks after the vote, and the pins wait: the map is the one without them", () => {
    const { root } = seeded(hide);
    const inputs = loadInputs(root);
    const { map, problems, notes } = buildYearMap(inputs);
    expect(problems).toEqual([]);
    expect(notes.join("\n")).toMatch(
      /week 2026-11-08 is pinned to "grown-ups-voted-differently", which is hidden/
    );
    expect(notes.join("\n")).toMatch(
      /week 2026-11-15 is pinned to "praying-for-leaders", which is hidden/
    );
    const unpinned = buildYearMap({ ...inputs, overrides: { weeks: [] } });
    for (const s of PINNED) expect(weekOf(map, s)?.pinned).toBeUndefined();
    expect(map.weeks).toEqual(unpinned.map.weeks);
  });
});

describe("going live", () => {
  it("asks for the freeze, then passes the family gate", () => {
    const { root, pub } = seeded(goLive);
    // The record as it stands before the first publish, whichever way the repo is committed.
    const record = JSON.parse(
      fs.readFileSync(path.join(root, FROZEN_IDS), "utf8")
    );
    const before = record.ids.filter((id: string) => !IDS.includes(id));
    fs.writeFileSync(
      path.join(root, FROZEN_IDS),
      JSON.stringify({ ...record, ids: before })
    );
    const errors = familyErrors(root, pub);
    for (const id of IDS)
      expect(
        errors.some(e =>
          e.includes(`devotion id "${id}" is not in ${FROZEN_IDS} yet`)
        )
      ).toBe(true);
    fs.writeFileSync(
      path.join(root, FROZEN_IDS),
      JSON.stringify({ ...record, ids: [...before, ...IDS] })
    );
    expect(familyErrors(root, pub)).toEqual([]);
  });

  it("gives each devotion a row numbered in its strand, and the strand its count", () => {
    const { root } = seeded(goLive);
    fs.mkdirSync(path.join(root, "client/public/needs"), { recursive: true });
    const { index, problems } = buildFamilyIndex(root);
    expect(problems).toEqual([]);
    expect(index.weekly).toBe(72);
    // U21's index lists every strand that has devotions, Foundations first.
    expect(index.strands).toEqual([
      { key: "foundations", label: "Foundations", count: 72 },
      { key: "world", label: "The world we live in", count: 2 },
    ]);
    const rows = index.devotions.filter(
      (r: { strand?: string }) => r.strand === "world"
    );
    expect(
      rows.map(
        (r: {
          id: string;
          n: number;
          kind: string;
          file: string;
          href: string;
        }) => [r.id, r.n, r.kind, r.file, r.href]
      )
    ).toEqual([
      [
        "grown-ups-voted-differently",
        1,
        "weekly",
        `/${WORLD}`,
        "/study/bible/matthew/10#v2",
      ],
      [
        "praying-for-leaders",
        2,
        "weekly",
        `/${WORLD}`,
        "/study/bible/1-timothy/2#v1",
      ],
    ]);
  });

  it("pins the two weeks after the vote, and changes no other week", () => {
    // loadInputs reads the Foundations, the seasonal sets and the overrides from the same root.
    const live = buildYearMap(loadInputs(seeded(goLive).root));
    const hidden = buildYearMap(loadInputs(seeded(hide).root));
    expect(live.problems).toEqual([]);
    const at = (b: typeof live, s: string) =>
      b.map.weeks.find((w: { start: string }) => w.start === s);
    expect(at(live, "2026-11-08")).toMatchObject({
      devotion: "grown-ups-voted-differently",
      pinned: true,
    });
    expect(at(live, "2026-11-15")).toMatchObject({
      devotion: "praying-for-leaders",
      pinned: true,
    });
    // The rotation counts backward before Advent Sunday 2026, and a pin there
    // keeps its week's slot, so going live moves no week before the pins (a
    // family partway through the week of November 1 keeps its devotion) and
    // none after them.
    const others = (b: typeof live) =>
      b.map.weeks.filter((w: Week) => !PINNED.includes(w.start));
    expect(others(live)).toEqual(others(hidden));
    expect(live.notes.join("\n")).not.toMatch(/hidden/);
  });
});

describe("the pins after the vote, later", () => {
  it("expire with a note, not a problem, once the map's first year moves past them", () => {
    const { root } = seeded(goLive);
    const later = buildYearMap(loadInputs(root), { first: 2028 });
    expect(later.problems).toEqual([]);
    expect(later.notes.join("\n")).toMatch(
      /week 2026-11-08 is before the map begins .* can be removed/
    );
    expect(later.notes.join("\n")).toMatch(
      /week 2026-11-15 is before the map begins/
    );
  });
});

describe("the family gate on a strand file", () => {
  it("still checks a hidden devotion's Scripture and id", () => {
    const { root, pub } = seeded(p => {
      const s = { ...readStrand(p), live: false };
      s.devotions[0].passageText = s.devotions[0].passageText.replace(
        "tax collector",
        "publican"
      );
      s.devotions[1].id = "identity";
      writeStrand(p, s);
    });
    const errors = familyErrors(root, pub);
    expect(
      errors.some(e =>
        /family-devotions-world\.json\.devotions\[0\] Matthew 10:2-4: passageText is not verbatim BSB/.test(
          e
        )
      )
    ).toBe(true);
    expect(errors.some(e => /id "identity" is also/.test(e))).toBe(true);
  });

  it("needs live to be true or false, and keeps the Foundations a plain list", () => {
    const { root, pub } = seeded(p => {
      writeStrand(p, { ...readStrand(p), live: "soon" });
      const first = JSON.parse(
        fs.readFileSync(path.join(p, "family-devotions.json"), "utf8")
      );
      fs.writeFileSync(
        path.join(p, "family-devotions.json"),
        JSON.stringify({ live: true, devotions: first })
      );
    });
    const errors = familyErrors(root, pub);
    expect(
      errors.some(e =>
        /family-devotions-world\.json: "live" must be true or false/.test(e)
      )
    ).toBe(true);
    expect(
      errors.some(e =>
        /family-devotions\.json: the Foundations set is always live/.test(e)
      )
    ).toBe(true);
  });

  it("refuses to hide a devotion that has been frozen", () => {
    const { root, pub } = seeded(hide);
    const frozen = JSON.parse(
      fs.readFileSync(path.join(root, FROZEN_IDS), "utf8")
    );
    fs.writeFileSync(
      path.join(root, FROZEN_IDS),
      JSON.stringify({ ...frozen, ids: [...new Set([...frozen.ids, IDS[0]])] })
    );
    expect(
      familyErrors(root, pub).some(
        e =>
          e.includes(`devotion id "${IDS[0]}" is frozen`) &&
          e.includes("no longer live")
      )
    ).toBe(true);
  });

  it("refuses a year map that names a hidden devotion", () => {
    const { root, pub } = seeded(hide);
    const map = path.join(root, "year.ts");
    fs.writeFileSync(
      map,
      `export const W = [{"start":"2026-11-08","devotion":"identity"},{"start":"2026-11-15","devotion":"${IDS[1]}"}];`
    );
    expect(
      familyErrors(root, pub, { yearMapFile: map }).some(e =>
        e.includes(`names devotion "${IDS[1]}", which is hidden`)
      )
    ).toBe(true);
  });
});

describe("the politics gate on family devotions", () => {
  const findings = (change: (s: Strand) => void) => {
    const { pub } = seeded(p => {
      const s = readStrand(p);
      change(s);
      writeStrand(p, s);
    });
    return checkFamilyPolitics({ publicDir: pub })
      .findings.map(([f, m]: [string, string]) => `${f}: ${m}`)
      .join("\n");
  };

  it("passes the committed pieces", () => {
    expect(checkFamilyPolitics({ publicDir: PUBLIC })).toEqual({
      findings: [],
      pieces: 2,
    });
  });

  it("refuses one side much longer than the other", () => {
    const longer = " Then say it again.".repeat(20); // sixty more words on one side only
    expect(findings(s => (s.devotions[0].sides![0].text += longer))).toMatch(
      /grown-ups-voted-differently: side imbalance: \d+\/\d+ words differ by more than 55%/
    );
  });

  it("refuses a politics piece with one side, or none", () => {
    expect(findings(s => s.devotions[0].sides!.pop())).toMatch(
      /needs exactly two sides/
    );
    expect(findings(s => delete s.devotions[1].sides)).toMatch(
      /praying-for-leaders: a politics piece needs exactly two sides/
    );
  });

  it("refuses a devotion that talks about voting without the mark", () => {
    expect(findings(s => delete s.devotions[0].politics)).toMatch(
      /grown-ups-voted-differently: talks about politics \("[^"]+"\) but is not marked politics: true/
    );
  });

  it("holds the house style outside the quoted passage", () => {
    const text = findings(s => {
      s.devotions[0].activity += " Do it tonight!";
      s.devotions[1].reflection += " Let us unpack that, and lean into it.";
      s.devotions[1].passageText += "!";
    });
    expect(text).toMatch(/activity: exclamation point/);
    expect(text).toMatch(/reflection: Forbidden Language "unpack"/);
    expect(text).toMatch(/reflection: Forbidden Language "lean into"/);
    expect(text).not.toMatch(/passageText/);
  });
});
