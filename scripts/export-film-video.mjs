#!/usr/bin/env node
/**
 * Render a Watch and learn moving picture to an MP4 file for sharing.
 *
 *   node scripts/export-film-video.mjs <slug|--all> [--shapes square,vertical]
 *     [--base http://localhost:4620] [--out client/public/explorer/video]
 *     [--level younger|older] [--cut share] [--voice <dir>] [--poster-only]
 *
 * It needs the built site served the way Vercel serves it
 * (node scripts/serve-like-vercel.mjs --port 4620), Playwright's Chromium,
 * and ffmpeg on this machine. It is a tool for making files by hand: it is not
 * part of the site's build, its tests or CI, and the site never runs ffmpeg.
 *
 * How it captures. The film's export view (FilmExport.tsx, at
 * /study/explorer/watch/<slug>?export=<shape>) is opened at the shape's exact
 * size: square 1080 by 1080, vertical 1080 by 1920, wide 1920 by 1080. The
 * script moves it one frame at a time through window.__lwExport.show(k), then
 * steps the CSS transitions that carry the motion itself: every running
 * animation is paused and set to each moment in turn, 1/30 of a second apart,
 * and the page is photographed at each. So the motion is smooth and its
 * timing exact however slowly the machine takes the pictures, and nothing
 * depends on real-time timers. Each frame then holds long enough to read its
 * caption (and verse) at about 180 words a minute, never less than 4 seconds.
 * The pictures and their durations go to ffmpeg's concat demuxer, which
 * writes H.264 (yuv420p, 30 fps, faststart) with an AAC sound track: silent,
 * or a recorded voice.
 *
 * Which words. The older level if the film runs two minutes or less there,
 * else the younger level, else the film's share cut (films/<slug>.json
 * "share") if it has one. --level and --cut choose for you.
 *
 * A voice, later. --voice <dir> takes recordings named
 * <dir>/<slug>/<nn>-<frame id>.<wav|mp3|m4a> (nn is the frame's place in the
 * video, 01 upward), and optionally <dir>/<slug>/00-title.* and
 * <dir>/<slug>/99-end.*. A frame with a recording holds until its recording
 * has finished (with a breath after), and the recordings are laid on the
 * track at the start of their frames. docs/work/elite/explorer.md lists the
 * words to read for each film. --script prints that list for one film.
 *
 * --poster-only writes just <slug>-poster.jpg (1200 by 630, the opening card),
 * which the film's page uses as its picture when a link to it is shared.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILMS = path.join(ROOT, "client/public/explorer/films");
const require = createRequire(import.meta.url);

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i > -1 && argv[i + 1] && !argv[i + 1].startsWith("--")
    ? argv[i + 1]
    : fallback;
};
const flag = name => argv.includes(`--${name}`);

const SIZES = {
  square: [1080, 1080],
  vertical: [1080, 1920],
  wide: [1920, 1080],
};
const FPS = 30;
const WPM = 180;
const MIN_HOLD = 4;
const TITLE_S = 3.5;
const END_S = 5;
const MAX_S = 120;

const base = arg("base", "http://localhost:4620").replace(/\/$/, "");
const out = path.resolve(ROOT, arg("out", "client/public/explorer/video"));
const shapes = arg("shapes", "square,vertical")
  .split(",")
  .filter(s => s in SIZES);
const voiceDir = arg("voice", null);
const VALUED = new Set([
  "--base",
  "--out",
  "--shapes",
  "--level",
  "--cut",
  "--voice",
]);
const slugs = flag("all")
  ? JSON.parse(
      fs.readFileSync(
        path.join(ROOT, "client/public/explorer/films.json"),
        "utf8"
      )
    )
      .films.filter(f => f.status === "finished")
      .map(f => f.slug)
  : argv.filter((a, i) => !a.startsWith("--") && !VALUED.has(argv[i - 1]));

if (!slugs.length) {
  console.error("Name a film's slug, or --all.");
  process.exit(2);
}

const film = slug =>
  JSON.parse(fs.readFileSync(path.join(FILMS, `${slug}.json`), "utf8"));
const words = t => (t ? t.trim().split(/\s+/).length : 0);

/** The shots a video shows: the same rule as exportShots in FilmExport.tsx. */
function shotsOf(f, level, cut) {
  if (cut && f.share)
    return f.share.frames.map(sf => {
      const fr = f.frames.find(x => x.id === sf.id);
      return {
        id: fr.id,
        name: fr.name,
        text: sf.text ?? fr[f.share.level],
        verse: sf.verse === false ? undefined : fr.verse,
      };
    });
  return f.frames.map(fr => ({
    id: fr.id,
    name: fr.name,
    text: fr[level],
    verse: fr.verse,
  }));
}

/** Seconds a shot needs to be read: caption and verse at 180 words a minute, a second to settle, at least 4. */
const readS = s =>
  Math.max(MIN_HOLD, ((words(s.text) + words(s.verse?.text)) * 60) / WPM + 1);
const lengthS = shots =>
  TITLE_S + END_S + shots.reduce((t, s) => t + readS(s), 0);

/** Older if it fits in two minutes, else younger, else the share cut. */
function choose(f) {
  const want = arg("level", null);
  if (flag("cut") || arg("cut", null) === "share") {
    if (!f.share) throw new Error(`${f.slug} has no share cut`);
    return { level: f.share.level, cut: true };
  }
  if (want) return { level: want, cut: false };
  for (const level of ["older", "younger"])
    if (lengthS(shotsOf(f, level, false)) <= MAX_S)
      return { level, cut: false };
  if (f.share) return { level: f.share.level, cut: true };
  console.warn(
    `! ${f.slug} runs past two minutes at both levels and has no share cut; exporting the younger level.`
  );
  return { level: "younger", cut: false };
}

const ORD = { 1: "First", 2: "Second", 3: "Third" };
function refInWords(ref) {
  const m = ref
    .trim()
    .match(/^([1-3])?\s?([A-Z][A-Za-z ]*?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
  if (!m) return ref;
  const [, num, name, ch, v1, v2] = m;
  const book = num ? `${ORD[num]} ${name}` : name;
  const c = /^Psalms?$/.test(name) ? `Psalm ${ch}` : `${book} chapter ${ch}`;
  if (!v1) return c;
  if (!v2) return `${c}, verse ${v1}`;
  return `${c}, verses ${v1} ${Number(v2) === Number(v1) + 1 ? "and" : "to"} ${v2}`;
}

/** The words to record for each shot, and the file name each one goes in. */
function recordingScript(f, level, cut) {
  const shots = shotsOf(f, level, cut);
  const lines = [`00-title: ${f.title}.`];
  shots.forEach((s, k) => {
    const fr = f.frames.find(x => x.id === s.id);
    const said = cut ? s.text : (fr.say?.[level] ?? s.text);
    const verse = s.verse ? ` ${refInWords(s.verse.ref)}: ${s.verse.text}` : "";
    lines.push(`${String(k + 1).padStart(2, "0")}-${s.id}: ${said}${verse}`);
  });
  lines.push("99-end: LiveWell by James Bell. www.livewellbyjamesbell.co.");
  return lines;
}

function probeS(file) {
  return Number(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "csv=p=0",
        file,
      ],
      { encoding: "utf8" }
    ).trim()
  );
}
function voiceFor(slug, stem) {
  if (!voiceDir) return null;
  const dir = path.resolve(voiceDir, slug);
  if (!fs.existsSync(dir)) return null;
  const hit = fs
    .readdirSync(dir)
    .find(n => n.replace(/\.(wav|mp3|m4a|aac|ogg|opus|flac)$/i, "") === stem);
  return hit ? path.join(dir, hit) : null;
}

if (flag("script")) {
  for (const slug of slugs) {
    const f = film(slug);
    const { level, cut } = choose(f);
    console.log(`# ${f.title} (${cut ? "share cut" : `${level} level`})`);
    for (const l of recordingScript(f, level, cut)) console.log(l);
  }
  process.exit(0);
}

const { chromium } = require("playwright");
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();

async function openExport(slug, shape, size, scale, query) {
  const ctx = await browser.newContext({
    viewport: { width: size[0], height: size[1] },
    deviceScaleFactor: scale,
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  await ctx.route(/\/api\/trpc\//, r =>
    r.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ result: { data: { json: null } } }),
    })
  );
  await ctx.route(/\/api\/track|\/_vercel\//, r =>
    r.fulfill({ status: 204, body: "" })
  );
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto(
    `${base}/study/explorer/watch/${slug}?export=${shape}${query}`,
    { waitUntil: "load" }
  );
  await page.waitForFunction(() => window.__lwExport?.ready === true, null, {
    timeout: 30000,
  });
  await page.evaluate(() => document.getAnimations().forEach(a => a.finish()));
  return { ctx, page, errors };
}

async function poster(slug, mode) {
  const query = `&level=${mode.level}${mode.cut ? "&cut=share" : ""}`;
  // The wide layout at 1920 by 1008, photographed at 0.625: 1200 by 630.
  const { ctx, page } = await openExport(
    slug,
    "wide",
    [1920, 1008],
    0.625,
    query
  );
  const file = path.join(out, `${slug}-poster.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 86 });
  await ctx.close();
  return file;
}

async function render(slug, shape) {
  const f = film(slug);
  const mode = choose(f);
  const query = `&level=${mode.level}${mode.cut ? "&cut=share" : ""}`;
  const { ctx, page, errors } = await openExport(
    slug,
    shape,
    SIZES[shape],
    1,
    query
  );
  const info = await page.evaluate(() => ({
    shots: window.__lwExport.shots,
    overflow: window.__lwExport.overflow,
  }));
  if (info.overflow.length)
    console.warn(
      `! ${slug} ${shape}: captions still too long for their box: ${info.overflow.join(", ")}`
    );

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `film-${slug}-${shape}-`));
  const list = [];
  let shot = 0;
  const snap = async () => {
    const name = `f${String(++shot).padStart(6, "0")}.jpg`;
    await page.screenshot({
      path: path.join(tmp, name),
      type: "jpeg",
      quality: 94,
    });
    return name;
  };
  /** Move to k, then photograph its motion 1/30 s apart; returns the motion's length in seconds. */
  const move = async k => {
    await page.evaluate(k => window.__lwExport.show(k), k);
    await page.evaluate(
      () =>
        new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
    );
    const endMs = await page.evaluate(() => {
      const anims = document.getAnimations();
      anims.forEach(a => a.pause());
      window.__lwAnims = anims;
      return Math.min(
        3000,
        Math.max(
          0,
          ...anims.map(a => Number(a.effect?.getComputedTiming().endTime) || 0)
        )
      );
    });
    const steps = Math.ceil((endMs / 1000) * FPS);
    for (let s = 0; s < steps; s++) {
      await page.evaluate(
        t =>
          window.__lwAnims.forEach(
            a =>
              (a.currentTime = Math.min(
                t,
                Number(a.effect?.getComputedTiming().endTime) || 0
              ))
          ),
        (s * 1000) / FPS
      );
      list.push([await snap(), 1 / FPS]);
    }
    await page.evaluate(() => window.__lwAnims.forEach(a => a.finish()));
    return steps / FPS;
  };

  // The segments: the opening card, each shot, the closing card; with a
  // recording, a segment holds until the recording (and a breath) is done.
  const segs = [];
  const n = info.shots.length;
  const plan = [
    { k: -1, need: TITLE_S, voice: voiceFor(slug, "00-title") },
    ...info.shots.map((s, i) => ({
      k: i,
      need: readS(s),
      voice: voiceFor(slug, `${String(i + 1).padStart(2, "0")}-${s.id}`),
    })),
    { k: n, need: END_S, voice: voiceFor(slug, "99-end") },
  ];
  for (const p of plan) {
    const moved = p.k === -1 ? 0 : await move(p.k);
    const voiceS = p.voice ? probeS(p.voice) + 0.3 + 0.7 : 0;
    const total = Math.max(p.need, moved + 0.5, voiceS);
    const hold = Math.round((total - moved) * FPS) / FPS;
    list.push([await snap(), hold]);
    segs.push({
      k: p.k,
      start: segs.reduce((t, s) => t + s.dur, 0),
      dur: moved + hold,
      voice: p.voice,
    });
  }
  if (errors.length)
    console.warn(`! ${slug} ${shape}: page errors: ${errors.join(" | ")}`);
  await ctx.close();

  const total = segs.reduce((t, s) => t + s.dur, 0);
  const concat =
    list
      .map(([name, d]) => `file '${name}'\nduration ${d.toFixed(6)}`)
      .join("\n") + `\nfile '${list[list.length - 1][0]}'\n`;
  fs.writeFileSync(path.join(tmp, "list.txt"), concat);

  // The sound: silence, with each recording laid at the start of its segment.
  let audio = [
    "-f",
    "lavfi",
    "-t",
    total.toFixed(3),
    "-i",
    "anullsrc=r=48000:cl=stereo",
  ];
  const voiced = segs.filter(s => s.voice);
  if (voiced.length) {
    const parts = segs.map((s, i) => {
      const wav = path.join(tmp, `a${i}.wav`);
      const len = s.dur.toFixed(3);
      if (s.voice)
        execFileSync("ffmpeg", [
          "-v",
          "error",
          "-y",
          "-i",
          s.voice,
          "-af",
          `adelay=300:all=1,apad`,
          "-t",
          len,
          "-ar",
          "48000",
          "-ac",
          "2",
          wav,
        ]);
      else
        execFileSync("ffmpeg", [
          "-v",
          "error",
          "-y",
          "-f",
          "lavfi",
          "-i",
          "anullsrc=r=48000:cl=stereo",
          "-t",
          len,
          wav,
        ]);
      return `file '${wav}'`;
    });
    fs.writeFileSync(path.join(tmp, "audio.txt"), parts.join("\n") + "\n");
    audio = ["-f", "concat", "-safe", "0", "-i", path.join(tmp, "audio.txt")];
  }

  const file = path.join(out, `${slug}-${shape}.mp4`);
  execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      path.join(tmp, "list.txt"),
      ...audio,
      "-map",
      "0:v",
      "-map",
      "1:a",
      "-vf",
      `fps=${FPS},format=yuv420p`,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "23",
      "-profile:v",
      "high",
      "-tune",
      "animation",
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      "-ar",
      "48000",
      "-movflags",
      "+faststart",
      "-t",
      total.toFixed(3),
      file,
    ],
    { cwd: tmp }
  );
  fs.rmSync(tmp, { recursive: true, force: true });
  const mb = fs.statSync(file).size / 1e6;
  console.log(
    `${path.relative(ROOT, file)}: ${shape}, ${total.toFixed(1)} s, ${mb.toFixed(2)} MB, ${mode.cut ? "share cut" : `${mode.level} level`}${voiced.length ? `, ${voiced.length} recordings` : ", silent track"}`
  );
  return { file, seconds: total, mb, mode };
}

try {
  for (const slug of slugs) {
    const f = film(slug);
    const p = await poster(slug, choose(f));
    console.log(`${path.relative(ROOT, p)}: poster`);
    if (flag("poster-only")) continue;
    for (const shape of shapes) await render(slug, shape);
  }
} finally {
  await browser.close();
}
