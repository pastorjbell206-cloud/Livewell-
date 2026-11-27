#!/usr/bin/env node
/**
 * The moving pictures' recorded voice: one small MP3 for each frame of each
 * film at each reading level, under client/public/explorer/audio/, and a
 * manifest (audio/manifest.json) holding a hash of the exact words each file
 * speaks.
 *
 *   node scripts/build-film-audio.mjs --check
 *   node scripts/build-film-audio.mjs <slug ...|--all> [--force]
 *     [--python <path>] [--models <dir>] [--threads 2]
 *
 * --check needs no speech model and no network, and runs in CI: it works out
 * what every finished film says now (scripts/lib/film-speech.mjs) and fails
 * by name when a film's words no longer match its file's hash, when a file is
 * missing or empty, or when a file is left over that no film speaks. So the
 * voice can never say something the page no longer says.
 *
 * Making the files is done by hand, never in the build, the tests or CI. It
 * needs a Python with kokoro-onnx, onnxruntime, numpy, soundfile and
 * pyloudnorm (--python, or FILM_AUDIO_PYTHON), the Kokoro model files
 * kokoro-v1.0.onnx and voices-v1.0.bin in one folder (--models, or
 * FILM_AUDIO_MODELS; from github.com/thewh1teagle/kokoro-onnx, release
 * model-files-v1.0, Apache-2.0), and ffmpeg. The model and the Python
 * environment are never committed.
 *
 * ElevenLabs instead (2026-11-25): set "engine": "elevenlabs" in the config,
 * "voice" to a stock ElevenLabs voice id (never a clone of a real person),
 * the settings in "elevenlabs" (scripts/lib/film-voice-elevenlabs.mjs), and
 * export ELEVENLABS_API_KEY on the machine that runs this; no Python or model
 * is needed then, only ffmpeg. docs/work/elite/elevenlabs.md has the steps.
 *
 * The voice is one setting, scripts/film-audio.config.json: a stock synthetic
 * voice of the model, never a copy of a real person's voice. Change it and
 * run with --all; every hash changes with it, so --check fails until every
 * file has been made again.
 *
 * What a file says: the caption (or its `say`), a pause, then the verse and
 * its reference in words where the frame has one. Each sentence is spoken on
 * its own so the pauses are exact; a film at one level is set to one loudness
 * (about -16 LUFS) with a limiter under it; mono, 24 kHz, 48 kbps.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { LEVELS, filmPlan } from "./lib/film-speech.mjs";
import { elevenSpeak } from "./lib/film-voice-elevenlabs.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const argv = process.argv.slice(2);
const flag = name => argv.includes(`--${name}`);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i > -1 && argv[i + 1] && !argv[i + 1].startsWith("--")
    ? argv[i + 1]
    : fallback;
};
// --dir is for the script's own test: another folder laid out like
// client/public/explorer (films.json, films/, audio/).
const DIR = path.resolve(ROOT, arg("dir", "client/public/explorer"));
const AUDIO = path.join(DIR, "audio");
const MANIFEST = path.join(AUDIO, "manifest.json");
const read = file => JSON.parse(fs.readFileSync(file, "utf8"));

const config = read(path.join(HERE, "film-audio.config.json"));
const catalogue = read(path.join(DIR, "films.json"));
const finished = catalogue.films
  .filter(f => f.status === "finished")
  .map(f => f.slug);
const film = slug => read(path.join(DIR, "films", `${slug}.json`));
const manifest = fs.existsSync(MANIFEST) ? read(MANIFEST) : { films: {} };

/** A film's manifest entries by key ("title", "younger/<id>", "older/<id>"). */
function entries(slug) {
  const m = manifest.films?.[slug];
  const out = new Map();
  if (!m) return out;
  if (m.title) out.set("title", m.title);
  for (const level of LEVELS)
    for (const e of m[level] ?? []) out.set(`${level}/${e.id}`, e);
  return out;
}

/** Why a planned file is not good as it stands, or null. */
function fault(item, have) {
  const e = have.get(item.key);
  if (!e) return "has no recorded file";
  if (e.file !== item.file) return `is recorded as ${e.file}, not ${item.file}`;
  if (e.hash !== item.hash)
    return "no longer says what the page says (its words or the voice setting changed)";
  const file = path.join(AUDIO, item.file);
  if (!fs.existsSync(file)) return `is missing its file ${item.file}`;
  if (fs.statSync(file).size < 500) return `has an empty file ${item.file}`;
  return null;
}

// ── --check ───────────────────────────────────────────────────────────────
if (flag("check")) {
  const fails = [];
  const expected = new Set(["manifest.json"]);
  let files = 0;
  for (const slug of finished) {
    const have = entries(slug);
    for (const item of filmPlan(film(slug), config)) {
      expected.add(item.file);
      files += 1;
      const why = fault(item, have);
      if (why) fails.push(`${slug} ${item.key}: ${why}`);
    }
  }
  const walk = (dir, rel = "") =>
    fs.existsSync(dir)
      ? fs
          .readdirSync(dir, { withFileTypes: true })
          .flatMap(d =>
            d.isDirectory()
              ? walk(path.join(dir, d.name), `${rel}${d.name}/`)
              : [`${rel}${d.name}`]
          )
      : [];
  for (const f of walk(AUDIO))
    if (!expected.has(f))
      fails.push(`${f}: is a file no moving picture speaks`);
  for (const slug of Object.keys(manifest.films ?? {}))
    if (!finished.includes(slug))
      fails.push(
        `${slug}: is in the manifest but is not a finished moving picture`
      );
  if (fails.length) {
    for (const f of fails) console.error(`[film-audio] ${f}`);
    console.error(
      `[film-audio] ${fails.length} fault(s). Make the files again by hand: node scripts/build-film-audio.mjs <slug> (see the top of the script).`
    );
    process.exit(1);
  }
  console.log(
    `[film-audio] ${finished.length} moving pictures, ${files} files: every file says what its page says.`
  );
  process.exit(0);
}

// ── Making the files ──────────────────────────────────────────────────────
const slugs = flag("all")
  ? finished
  : argv.filter(
      (a, i) =>
        !a.startsWith("--") &&
        !argv[i - 1]?.match(/^--(python|models|threads|dir)$/)
    );
if (!slugs.length) {
  console.error(
    "usage: build-film-audio.mjs --check | <slug ...|--all> [--force] [--python <path>] [--models <dir>]"
  );
  process.exit(2);
}
for (const s of slugs)
  if (!finished.includes(s)) {
    console.error(`[film-audio] "${s}" is not a finished moving picture`);
    process.exit(2);
  }
const engine = config.engine ?? "kokoro";
const python = arg("python", process.env.FILM_AUDIO_PYTHON);
const models = arg("models", process.env.FILM_AUDIO_MODELS);
const elevenKey = process.env.ELEVENLABS_API_KEY;
if (engine === "elevenlabs") {
  if (!elevenKey) {
    console.error("[film-audio] set ELEVENLABS_API_KEY on this machine (never in the repository); see docs/work/elite/elevenlabs.md");
    process.exit(2);
  }
} else if (!python || !models) {
  console.error(
    "[film-audio] give --python and --models (or FILM_AUDIO_PYTHON and FILM_AUDIO_MODELS); see the top of the script"
  );
  process.exit(2);
}
const threads = Number(arg("threads", "2"));
const force = flag("force");
const LIMIT = 10 ** (-2 / 20);

function saveManifest() {
  const films = {};
  for (const slug of finished)
    if (manifest.films?.[slug]) films[slug] = manifest.films[slug];
  const out = {
    about:
      "The moving pictures' recorded voice (scripts/build-film-audio.mjs): for each film, its title and each frame at each level, with the file, its length in seconds, its size, and a hash of the exact words it speaks. A stock synthetic voice; not a recording of any person.",
    voice: config.voice,
    speed: config.speed,
    ...(engine !== "kokoro" ? { engine } : {}),
    films,
  };
  fs.mkdirSync(AUDIO, { recursive: true });
  fs.writeFileSync(MANIFEST, `${JSON.stringify(out, null, 1)}\n`);
  manifest.films = films;
}

function kokoroBatch(items, tmp) {
  const job = path.join(tmp, "job.json");
  fs.writeFileSync(
    job,
    JSON.stringify({
      model: path.join(models, "kokoro-v1.0.onnx"),
      voices: path.join(models, "voices-v1.0.bin"),
      voice: config.voice,
      lang: config.lang,
      speed: config.speed,
      gaps: config.gaps,
      loudness: config.loudness,
      threads,
      items,
    })
  );
  return JSON.parse(
    execFileSync(
      python,
      [path.join(HERE, "lib/film-audio-synth.py"), job],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        maxBuffer: 1 << 24,
      }
    )
      .trim()
      .split("\n")
      .pop()
  );
}

/** ffmpeg, quietly; throws with its message on failure. */
const ff = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args]);

/** A 24 kHz mono 16-bit WAV of silence, `seconds` long. */
function silenceWav(file, seconds) {
  ff(["-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", seconds.toFixed(3), "-c:a", "pcm_s16le", file]);
}

/** Length of an audio file in seconds, by ffprobe. */
function lengthOf(file) {
  return Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file], { encoding: "utf8" }).trim()
  );
}

/**
 * ElevenLabs: each sentence spoken on its own with its neighbours as context,
 * trimmed of the service's own lead-in and tail silence, and laid end to end
 * with the config's exact pauses, as the Kokoro path does. Returns the
 * seconds of each item, like the Kokoro synth's report.
 */
async function elevenBatch(items, tmp) {
  const seconds = [];
  for (const [n, item] of items.entries()) {
    const parts = [];
    const lead = path.join(tmp, `${n}-lead.wav`);
    silenceWav(lead, config.gaps.lead);
    parts.push(lead);
    for (const [u, unit] of item.units.entries()) {
      const mp3 = path.join(tmp, `${n}-${u}.mp3`);
      const wav = path.join(tmp, `${n}-${u}.wav`);
      const prev = item.units[u - 1]?.text ?? "";
      const next = item.units[u + 1]?.text ?? "";
      fs.writeFileSync(mp3, await elevenSpeak(config, elevenKey, unit.text, prev, next));
      // Trim leading and trailing silence, then 24 kHz mono, as the Kokoro path writes.
      const trimSilence = "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03";
      ff(["-i", mp3, "-af", `${trimSilence},areverse,${trimSilence},areverse`, "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le", wav]);
      parts.push(wav);
      const gap = path.join(tmp, `${n}-${u}-gap.wav`);
      silenceWav(gap, config.gaps[unit.gap]);
      parts.push(gap);
    }
    const list = path.join(tmp, `${n}-parts.txt`);
    fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join("\n"));
    ff(["-f", "concat", "-safe", "0", "-i", list, "-c:a", "pcm_s16le", item.wav]);
    seconds.push(Number(lengthOf(item.wav).toFixed(2)));
  }
  return { seconds };
}

let made = 0;
for (const slug of slugs) {
  const plan = filmPlan(film(slug), config);
  const have = entries(slug);
  // A batch is a film at one level (the title goes with the younger level);
  // one stale file makes its whole batch again, so the batch keeps one loudness.
  const batches = LEVELS.map(level =>
    plan.filter(
      p => p.level === level || (level === LEVELS[0] && p.key === "title")
    )
  );
  for (const [b, batch] of batches.entries()) {
    const level = LEVELS[b];
    if (!force && batch.every(item => !fault(item, have))) continue;
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "film-audio-"));
    try {
      const items = batch.map((item, i) => ({
        wav: path.join(tmp, `${i}.wav`),
        units: item.units,
      }));
      const said =
        engine === "elevenlabs"
          ? await elevenBatch(items, tmp)
          : kokoroBatch(items, tmp);
      // The limiter takes a little loudness back, so measure the batch as it
      // will be written (ffmpeg's own meter) and trim the gain to the target.
      const list = path.join(tmp, "all.txt");
      fs.writeFileSync(list, items.map(it => `file '${it.wav}'`).join("\n"));
      const limiter = `alimiter=limit=${LIMIT.toFixed(4)}:level=disabled:attack=5:release=50`;
      let trim = 0;
      let loud = NaN;
      for (let pass = 0; pass < 5; pass++) {
        const r = spawnSync(
          "ffmpeg",
          [
            "-nostats",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            list,
            "-af",
            `volume=${trim.toFixed(2)}dB,${limiter},ebur128`,
            "-f",
            "null",
            "-",
          ],
          { encoding: "utf8" }
        );
        loud = Number(
          r.stderr
            .split("Summary:")
            .pop()
            .match(/I:\s+(-?[\d.]+)/)?.[1]
        );
        if (!Number.isFinite(loud))
          throw new Error(`could not measure ${slug} ${level}`);
        if (Math.abs(loud - config.loudness) <= 0.2) break;
        trim += config.loudness - loud;
      }
      const m = (manifest.films[slug] ??= {});
      batch.forEach((item, i) => {
        const seconds = said.seconds[i];
        const file = path.join(AUDIO, item.file);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        execFileSync("ffmpeg", [
          "-v",
          "error",
          "-y",
          "-i",
          items[i].wav,
          "-af",
          `volume=${trim.toFixed(2)}dB,${limiter},afade=t=in:d=0.02,afade=t=out:st=${Math.max(0, seconds - 0.15).toFixed(3)}:d=0.15`,
          "-ar",
          "24000",
          "-ac",
          "1",
          "-c:a",
          "libmp3lame",
          "-b:a",
          config.bitrate,
          "-map_metadata",
          "-1",
          "-fflags",
          "+bitexact",
          file,
        ]);
        const entry = {
          file: item.file,
          hash: item.hash,
          seconds,
          bytes: fs.statSync(file).size,
        };
        if (item.key === "title") m.title = entry;
        else {
          const list = (m[level] ??= []);
          const at = list.findIndex(e => e.id === item.id);
          const row = { id: item.id, ...entry };
          if (at > -1) list[at] = row;
          else list.push(row);
        }
        made += 1;
      });
      // Keep the film's own frame order, and drop frames it no longer has.
      const order = batch.filter(p => p.key !== "title").map(p => p.id);
      m[level] = order.map(id => m[level].find(e => e.id === id));
      // A file from an older order or name is removed.
      const keep = new Set(batch.map(p => path.join(AUDIO, p.file)));
      const levelDir = path.join(AUDIO, slug, level);
      for (const f of fs.readdirSync(levelDir))
        if (!keep.has(path.join(levelDir, f)))
          fs.rmSync(path.join(levelDir, f));
      saveManifest();
      const total = m[level].reduce((s, e) => s + e.seconds, 0);
      console.log(
        `[film-audio] ${slug} ${level}: ${batch.length} files, ${total.toFixed(1)} s, ${loud} LUFS`
      );
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
}
console.log(`[film-audio] ${made} files made.`);
