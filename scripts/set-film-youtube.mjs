#!/usr/bin/env node
/**
 * Put each Bible film's YouTube video on its page (James, 2026-11-26).
 *
 *   node scripts/set-film-youtube.mjs <list.txt>
 *
 * The list has one film a line: the film's slug, a space or comma, then the
 * video's address or bare id, as YouTube Studio shows it. Any of these work:
 *
 *   gospel-in-a-minute https://youtu.be/dQw4w9WgXcQ
 *   gospel-in-a-minute, https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *   gospel-in-a-minute dQw4w9WgXcQ
 *
 * A blank line or one starting with # is skipped. The script writes the id as
 * `youtube` in client/public/explorer/films/<slug>.json and changes nothing
 * else in the file; the film's page then shows "Watch on YouTube" beside
 * Share. A slug that is not a finished film, or an address it cannot read,
 * stops the run before any file is written, so a typo never half-applies.
 * The slug of every film is its address on the site, /study/explorer/watch/<slug>,
 * and the start of its video's file name, <slug>-wide.mp4.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILMS = path.join(ROOT, "client/public/explorer/films");

/** The 11-character id from a YouTube address or a bare id, or null. */
export function youTubeIdFrom(text) {
  const s = String(text).trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/.exec(s);
  return m ? m[1] : null;
}

/**
 * The film file's text with `youtube` set to `id`, changing no other byte: an
 * existing "youtube" value is replaced in place, otherwise one line is added
 * before the closing brace. Checked by parsing the result.
 */
export function withYouTube(text, id) {
  const has = /("youtube"\s*:\s*)"[^"]*"/;
  const out = has.test(text)
    ? text.replace(has, `$1"${id}"`)
    : text.replace(/\s*\}\s*$/, (end) => `,\n  "youtube": "${id}"${end}`);
  if (JSON.parse(out).youtube !== id) throw new Error("could not set youtube in the film file");
  return out;
}

/** Read the list into [slug, id] pairs, or throw naming every bad line. */
export function parseList(text, finished) {
  const pairs = [];
  const bad = [];
  text.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    if (!line || line.startsWith("#")) return;
    const m = /^([a-z0-9-]+)[\s,]+(\S+)$/.exec(line);
    if (!m) return bad.push(`line ${i + 1}: expected "<slug> <address>": ${line}`);
    const [, slug, addr] = m;
    if (!finished.has(slug)) return bad.push(`line ${i + 1}: "${slug}" is not a finished film`);
    const id = youTubeIdFrom(addr);
    if (!id) return bad.push(`line ${i + 1}: no YouTube video id in ${addr}`);
    pairs.push([slug, id]);
  });
  if (bad.length) throw new Error(bad.join("\n"));
  return pairs;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: node scripts/set-film-youtube.mjs <list.txt>");
    process.exit(2);
  }
  const index = JSON.parse(fs.readFileSync(path.join(ROOT, "client/public/explorer/index.json"), "utf8"));
  const finished = new Set(index.films.filter((f) => f.status === "finished").map((f) => f.slug));
  let pairs;
  try {
    pairs = parseList(fs.readFileSync(file, "utf8"), finished);
  } catch (e) {
    console.error(`[film-youtube] nothing written:\n${e.message}`);
    process.exit(1);
  }
  for (const [slug, id] of pairs) {
    const p = path.join(FILMS, `${slug}.json`);
    fs.writeFileSync(p, withYouTube(fs.readFileSync(p, "utf8"), id));
  }
  console.log(`[film-youtube] ${pairs.length} film(s) now link their YouTube video.`);
}
