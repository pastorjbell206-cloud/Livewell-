/**
 * The moving pictures' recorded voice.
 *
 * - The recorded voice (scripts/lib/film-speech.mjs) and the device's voice
 *   (lib/film-voice.ts) say the same parts of every frame in the same order:
 *   the caption, then the verse, then its reference.
 * - scripts/build-film-audio.mjs --check, the CI gate, needs no speech model:
 *   it passes when every file's hash matches what the film says now, and
 *   fails by name when a caption has changed, a file is missing, or a file is
 *   left over. Tried here on a small folder made for the test.
 */
import { describe, it, expect, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  filmPlan,
  frameParts,
  framePlan,
  refSpoken,
} from "../../../scripts/lib/film-speech.mjs";
import { spokenParts } from "./film-voice";
import { filmAudioUrl } from "./film-audio";
import type { Film } from "./explorer";

const ROOT = path.resolve(__dirname, "../../..");
const PUBLIC = path.join(ROOT, "client/public/explorer");
const SCRIPT = path.join(ROOT, "scripts/build-film-audio.mjs");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/film-audio.config.json"), "utf8")
);
const read = (file: string) => JSON.parse(fs.readFileSync(file, "utf8"));
const FINISHED: string[] = read(path.join(PUBLIC, "films.json"))
  .films.filter((f: { status: string }) => f.status === "finished")
  .map((f: { slug: string }) => f.slug);
const film = (slug: string): Film =>
  read(path.join(PUBLIC, "films", `${slug}.json`));

describe("what the recorded voice says", () => {
  it("is the caption, then the verse, then its reference, exactly as the device's voice has it", () => {
    for (const slug of FINISHED)
      for (const fr of film(slug).frames)
        for (const level of ["younger", "older"] as const)
          expect(frameParts(fr, level), `${slug} ${fr.id} ${level}`).toEqual(
            spokenParts(fr, level)
          );
  });

  it("says a reference in words, after its verse", () => {
    expect(refSpoken("Genesis 1:31")).toBe("Genesis one, verse thirty-one.");
    expect(refSpoken("1 Corinthians 15:3-4")).toBe(
      "First Corinthians fifteen, verses three and four."
    );
    expect(refSpoken("Psalm 119:105")).toBe(
      "Psalm one hundred and nineteen, verse one hundred and five."
    );
    const fr = film("bible-two-minutes").frames[0];
    const units = framePlan(fr, "younger", CONFIG);
    expect(units.map((u: { kind: string }) => u.kind)).toEqual([
      "caption",
      "verse",
      "ref",
    ]);
    expect(units[1].text).toBe(fr.verse!.text);
    expect(units[2].text).toBe("Genesis one, verse thirty-one.");
  });

  it("changes only what the engine is given, never a caption: LORD is said as Lord", () => {
    const fr = film("bible-two-minutes").frames[3];
    expect(fr.verse!.text).toContain("LORD");
    const verse = framePlan(fr, "older", CONFIG).find(
      (u: { kind: string }) => u.kind === "verse"
    );
    expect(verse.text).toContain("Lord");
    expect(verse.text).not.toContain("LORD");
  });

  it("the player asks for the file the script writes", () => {
    const f = film("bible-two-minutes");
    const plan = filmPlan(f, CONFIG);
    f.frames.forEach((fr, k) => {
      for (const level of ["younger", "older"] as const)
        expect(filmAudioUrl(f.slug, level, k, fr.id)).toBe(
          `/explorer/audio/${plan.find((p: { key: string }) => p.key === `${level}/${fr.id}`).file}`
        );
    });
  });
});

describe("the audio check (build-film-audio.mjs --check)", () => {
  const dirs: string[] = [];
  afterAll(() =>
    dirs.forEach(d => fs.rmSync(d, { recursive: true, force: true }))
  );

  /** A folder laid out like client/public/explorer with one film and its files. */
  function fixture() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "film-audio-test-"));
    dirs.push(dir);
    const f = film("who-made-god");
    fs.mkdirSync(path.join(dir, "films"), { recursive: true });
    fs.writeFileSync(
      path.join(dir, "films.json"),
      JSON.stringify({
        films: [
          { slug: f.slug, title: f.title, group: f.group, status: "finished" },
          {
            slug: "not-yet",
            title: "Not yet",
            group: f.group,
            status: "coming",
          },
        ],
      })
    );
    fs.writeFileSync(
      path.join(dir, "films", `${f.slug}.json`),
      JSON.stringify(f)
    );
    const entry: Record<string, unknown> = { younger: [], older: [] };
    for (const p of filmPlan(f, CONFIG)) {
      const file = path.join(dir, "audio", p.file);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, Buffer.alloc(2000, 1));
      const row = { file: p.file, hash: p.hash, seconds: 1, bytes: 2000 };
      if (p.key === "title") entry.title = row;
      else (entry[p.level] as unknown[]).push({ id: p.id, ...row });
    }
    fs.writeFileSync(
      path.join(dir, "audio/manifest.json"),
      JSON.stringify({ films: { [f.slug]: entry } })
    );
    return { dir, f };
  }
  const check = (dir: string) =>
    spawnSync(process.execPath, [SCRIPT, "--check", "--dir", dir], {
      encoding: "utf8",
    });

  it("passes when every file says what its film says", () => {
    const { dir } = fixture();
    const r = check(dir);
    expect(r.stderr).toBe("");
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/1 moving pictures, \d+ files/);
  });

  it("fails by name when a caption has changed and its file has not been made again", () => {
    const { dir, f } = fixture();
    const changed = structuredClone(f);
    changed.frames[2].younger += " One more sentence.";
    fs.writeFileSync(
      path.join(dir, "films", `${f.slug}.json`),
      JSON.stringify(changed)
    );
    const r = check(dir);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain(
      `${f.slug} younger/${f.frames[2].id}: no longer says what the page says`
    );
    // Only that file is named: the older level and the other frames still match.
    expect(r.stderr).not.toContain(`older/${f.frames[2].id}`);
    expect(r.stderr).toContain("1 fault(s)");
  });

  it("fails by name when a file is missing, and when one is left over", () => {
    const { dir, f } = fixture();
    const gone = filmAudioUrl(f.slug, "older", 0, f.frames[0].id).replace(
      "/explorer/audio/",
      ""
    );
    fs.rmSync(path.join(dir, "audio", gone));
    fs.writeFileSync(
      path.join(dir, "audio", f.slug, "younger/99-old.mp3"),
      "x"
    );
    const r = check(dir);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain(
      `older/${f.frames[0].id}: is missing its file ${gone}`
    );
    expect(r.stderr).toContain(
      "younger/99-old.mp3: is a file no moving picture speaks"
    );
  });

  it("the real files match the real films (the gate CI runs)", () => {
    const r = spawnSync(process.execPath, [SCRIPT, "--check"], {
      encoding: "utf8",
    });
    expect(r.stderr).toBe("");
    expect(r.status).toBe(0);
  });
});
