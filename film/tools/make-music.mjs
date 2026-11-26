// Renders a film's music (film/tools/music.html, written as code, nothing to license) to <film>/audio/music.wav,
// following the chapter levels in timeline.json. Run: FILM_DIR=film/<name> node film/tools/make-music.mjs
import path from "node:path"; import fs from "node:fs";
import { FD, launch, timeline } from "./common.mjs";
const b = await launch(); const p = await b.newPage();
await p.goto("file://" + path.resolve("film/tools/music.html")); await p.waitForFunction(() => document.title === "ready");
// LiveWell is quieter than Gather: MUSIC_CALM (default 0.6) scales every chapter's level, so the top of a film
// has a soft pulse under the pad instead of a full beat. Set MUSIC_CALM=1 for the Gather levels.
const calm = Number(process.env.MUSIC_CALM || 0.6);
const tl = { ...timeline, chapters: timeline.chapters.map((c) => ({ ...c, level: c.level == null ? c.level : 0.1 + c.level * calm })) };
const { b64, peak } = await p.evaluate((tl) => window.makeMusic(tl, 48000), tl);
fs.writeFileSync(`${FD}/audio/music.wav`, Buffer.from(b64, "base64")); await b.close();
console.log("music.wav", timeline.length + "s, raw peak", peak.toFixed(2));
