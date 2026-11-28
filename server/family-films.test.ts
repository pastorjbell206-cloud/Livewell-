/**
 * The "Watch first" map (scripts/lib/family-films.mjs,
 * scripts/build-family-films.mjs): which Bible Explorer film a family
 * devotion or a catechism question offers. The rule is tested on small made
 * films; the committed map is tested against the real libraries, so a film
 * that is not finished, a stale pick or a stale map fails here as in CI.
 */
import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error a plain .mjs script module
import { BREATH_SECONDS, buildFamilyFilms, filmMinutes, loadFilms, matchFilm, nameKey, overlap, renderFamilyFilms, spans, subjectWords } from "../scripts/lib/family-films.mjs";

const ROOT = path.resolve(__dirname, "..");
const PUB = path.join(ROOT, "client/public");

type MadeFilm = { slug: string; title: string; group: string; verses: string[]; questions: number[]; minutes: number };
const film = (slug: string, title: string, verses: string[] = [], extra: Partial<MadeFilm> = {}): MadeFilm => ({ slug, title, group: "beliefs", verses, questions: [], minutes: 2, ...extra });

describe("the rule", () => {
  const films = [
    film("prayer", "Prayer", ["Matthew 6:9-10", "Philippians 4:6"]),
    film("who-jesus-is", "Who Jesus is", ["John 1:14"]),
    film("god-with-his-people", "God with his people", ["John 1:14"], { group: "ideas" }),
    film("holy-spirit", "The Holy Spirit through the Bible", ["John 14:17"], { group: "ideas", questions: [41] }),
    film("spirit-in-a-believer", "The Holy Spirit in a believer", ["Galatians 5:22-23"], { questions: [41] }),
    film("two-minutes", "The whole Bible in two minutes", ["Genesis 12:3", "Revelation 21:5"], { group: "story" }),
  ];

  it("reads names and subject words alike however they are written", () => {
    expect(nameKey("Who Jesus Is")).toBe(nameKey("Who Jesus is?"));
    expect(nameKey("The Holy Spirit")).toBe("holy spirit");
    expect([...subjectWords("Why We Pray")]).toContain("pray");
    expect([...subjectWords("Prayer")]).toContain("pray");
    expect(subjectWords("Who God Is").size).toBe(0);
  });

  it("knows when two references share a verse", () => {
    const [a] = spans("John 14:16-17");
    const [b] = spans("John 14:17");
    const [c] = spans("John 14:18");
    expect(overlap(a, b)).toBe(true);
    expect(overlap(a, c)).toBe(false);
    expect(spans("Not a book 3:1")).toEqual([]);
  });

  it("matches a devotion whose theme is a film's title", () => {
    expect(matchFilm({ names: ["Who Jesus Is", "More Than a Good Teacher"], passage: "Colossians 1:15-16" }, films)).toMatchObject({ film: { slug: "who-jesus-is" }, by: "name" });
  });

  it("matches on the same passage only with a shared subject word, and only one film", () => {
    expect(matchFilm({ names: ["The Holy Spirit", "God Who Lives Close"], passage: "John 14:16-17" }, films)).toMatchObject({ film: { slug: "holy-spirit" }, by: "passage" });
    // John 1:14 is in two films and no subject word tells them apart: none.
    expect(matchFilm({ names: ["The Incarnation", "God Came Close"], passage: "John 1:14" }, films)).toBeNull();
    // A shared verse with a different subject is not a match.
    expect(matchFilm({ names: ["Worry", "When Your Heart Is Worried"], passage: "Philippians 4:6-7" }, films)).toBeNull();
  });

  it("never offers a whole-Bible film by passage alone", () => {
    expect(matchFilm({ names: ["A Family for the Whole World"], passage: "Genesis 12:1-3" }, films)).toBeNull();
  });

  it("takes a catechism question from the film that names it, the one quoting its proof text first", () => {
    expect(matchFilm({ names: ["Who is the Holy Spirit?"], passage: "John 14:26", number: 41 }, films)).toMatchObject({ film: { slug: "holy-spirit" }, by: "named" });
    expect(matchFilm({ names: ["How does the Spirit change us?"], passage: "Galatians 5:22-23", number: 41 }, films)).toMatchObject({ film: { slug: "spirit-in-a-believer" }, by: "named" });
  });

  it("lets a pick choose a film, or none", () => {
    expect(matchFilm({ names: ["The Incarnation"], passage: "John 1:14" }, films, { film: "who-jesus-is", why: "x" })).toMatchObject({ film: { slug: "who-jesus-is" }, by: "pick" });
    expect(matchFilm({ names: ["Prayer"], passage: "Matthew 7:7" }, films, { film: null, why: "x" })).toBeNull();
  });

  it("gives a film's length in whole minutes, never less than one", () => {
    expect(filmMinutes([{ younger: "A short line." }])).toBe(1);
    const long = Array.from({ length: 9 }, () => ({ younger: Array(45).fill("word").join(" ") }));
    expect(filmMinutes(long)).toBe(3);
  });

  it("takes a film's length from its recorded voice, with the player's breath between pictures", () => {
    const short = ["a", "b", "c"].map((id) => ({ id, younger: "A short line." }));
    // 89.5 seconds of voice is under a minute and a half; the two breaths between pictures carry it over.
    expect(filmMinutes(short, [{ id: "a", seconds: 40 }, { id: "b", seconds: 40 }, { id: "c", seconds: 9.5 }])).toBe(2);
    expect(filmMinutes(short)).toBe(1);
  });

  it("estimates from the words only for a film with no voice, or a voice that is not its frames", () => {
    const long = Array.from({ length: 9 }, (_, i) => ({ id: `f${i}`, younger: Array(45).fill("word").join(" ") }));
    const voice = long.map((f) => ({ id: f.id, seconds: 12 }));
    expect(filmMinutes(long, voice)).toBe(2);
    expect(filmMinutes(long)).toBe(3);
    expect(filmMinutes(long, voice.slice(1))).toBe(3);
    expect(filmMinutes(long, voice.map((v, i) => (i === 4 ? { ...v, id: "moved" } : v)))).toBe(3);
  });
});

describe("the committed map", () => {
  const built = buildFamilyFilms(ROOT);
  const map = JSON.parse(fs.readFileSync(path.join(PUB, "family/films.json"), "utf8"));
  const finished = new Set<string>(loadFilms(ROOT).map((f: MadeFilm) => f.slug));

  it("builds with no problems and is up to date", () => {
    expect(built.problems).toEqual([]);
    expect(fs.readFileSync(path.join(PUB, "family/films.json"), "utf8")).toBe(renderFamilyFilms(built.map));
  });

  it("names only finished films, devotions that exist and questions that exist", () => {
    const family = JSON.parse(fs.readFileSync(path.join(PUB, "family/index.json"), "utf8"));
    const ids = new Set(family.devotions.map((d: { id: string }) => d.id));
    const catechism = JSON.parse(fs.readFileSync(path.join(PUB, "family-catechism.json"), "utf8"));
    for (const [id, f] of Object.entries<MadeFilm>(map.devotions)) {
      expect(ids.has(id), id).toBe(true);
      expect(finished.has(f.slug), `${id} -> ${f.slug}`).toBe(true);
      expect(fs.existsSync(path.join(PUB, "explorer/films", `${f.slug}.json`))).toBe(true);
      expect(f.minutes).toBeGreaterThanOrEqual(1);
    }
    for (const [n, f] of Object.entries<MadeFilm>(map.catechism)) {
      expect(Number(n) >= 1 && Number(n) <= catechism.length, n).toBe(true);
      expect(finished.has(f.slug), `question ${n} -> ${f.slug}`).toBe(true);
    }
    expect(Object.keys(map.devotions).length).toBeGreaterThan(0);
  });

  it("says each film's length as its recorded younger voice runs, with the breath between pictures", () => {
    const voices = JSON.parse(fs.readFileSync(path.join(PUB, "explorer/audio/manifest.json"), "utf8")).films;
    let measured = 0;
    for (const f of [...Object.values<MadeFilm>(map.devotions), ...Object.values<MadeFilm>(map.catechism)]) {
      const files: { seconds: number }[] | undefined = voices[f.slug]?.younger;
      if (!files) continue;
      const seconds = files.reduce((sum, x) => sum + x.seconds, 0) + BREATH_SECONDS * (files.length - 1);
      expect(f.minutes, f.slug).toBe(Math.max(1, Math.round(seconds / 60)));
      measured += 1;
    }
    expect(measured).toBeGreaterThan(0);
  });

  it("counts the same breath between pictures as the player", () => {
    const player = fs.readFileSync(path.join(ROOT, "client/src/pages/explorer/films/FilmPlayer.tsx"), "utf8");
    const ms = /breath = window\.setTimeout\([\s\S]*?\},\s*(\d+)\s*\)/.exec(player)?.[1];
    expect(Number(ms) / 1000, "the breath after a frame is said, in FilmPlayer.tsx").toBe(BREATH_SECONDS);
  });

  it("gives every pick a reason", () => {
    const picks = JSON.parse(fs.readFileSync(path.join(PUB, "family-film-picks.json"), "utf8"));
    for (const kind of ["devotions", "catechism"]) for (const [id, p] of Object.entries<{ why?: string }>(picks[kind])) expect(p.why, `${kind} ${id}`).toBeTruthy();
  });

  it("stops on a pick that names a film that is not finished, or a devotion that is not there", () => {
    const stale = buildFamilyFilms(ROOT, { picks: { devotions: { prayer: { film: "no-such-film", why: "x" }, "no-such-devotion": { film: null, why: "x" } }, catechism: { "999": { film: null, why: "x" } } } });
    expect(stale.problems.join("\n")).toMatch(/no-such-film/);
    expect(stale.problems.join("\n")).toMatch(/no-such-devotion/);
    expect(stale.problems.join("\n")).toMatch(/999/);
  });

  it("offers a new film on its devotion when the map is rebuilt", () => {
    const films = [...loadFilms(ROOT), { slug: "made-up", title: "The Second Coming", group: "beliefs", verses: ["Acts 1:11"], questions: [], minutes: 2 }];
    const rebuilt = buildFamilyFilms(ROOT, { films });
    expect(rebuilt.map.devotions["the-second-coming"]).toMatchObject({ slug: "made-up", by: "name" });
    expect(built.map.devotions["the-second-coming"]).toBeUndefined();
  });

  it("--check passes on the committed map", () => {
    const r = spawnSync(process.execPath, [path.join(ROOT, "scripts/build-family-films.mjs"), "--check"], { cwd: ROOT, encoding: "utf8" });
    expect(r.status, `${r.stdout}${r.stderr}`).toBe(0);
  });
});
