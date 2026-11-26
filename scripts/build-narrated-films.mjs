#!/usr/bin/env node
/**
 * build-narrated-films.mjs: the list of narrated films that are live on the site.
 *
 * A narrated film is made in film/<slug>/ (film/README.md). Its MP4 and poster
 * are not in the repo: they sit in the Vercel Blob store "livewell-films",
 * uploaded as films/<slug>.mp4 and films/<slug>-poster.jpg by
 * scripts/publish-narrated-films.mjs, which also adds the slug to
 * scripts/narrated-films-live.json and runs this script. This script reads
 * each live film's own files and writes:
 *
 *   client/src/data/narrated-films.json       every live film: title, page,
 *       video and poster address, length, and every spoken line in order with
 *       its Scripture reference (the "Read the words" list)
 *   client/src/data/narrated-film-pages.json  page address -> film slug (small;
 *       pages read this to know whether they have a film)
 *
 * No page holds a typed list: components/NarratedFilm.tsx reads these files.
 *
 *   node scripts/build-narrated-films.mjs          write
 *   node scripts/build-narrated-films.mjs --check  fail if either file is stale
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");
const BLOB = "https://6tank2ikr2l6p1eo.public.blob.vercel-storage.com/films";

/** Films James has said may be on the site, in the order they went live: scripts/narrated-films-live.json,
 *  which scripts/publish-narrated-films.mjs adds to when it uploads a film. */
const LIVE = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/narrated-films-live.json"), "utf8"));

const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));
const films = LIVE.map((slug) => {
  const script = read(`film/${slug}/script.json`);
  const timeline = read(`film/${slug}/timeline.json`);
  if (!script.page) throw new Error(`${slug}: script.json has no page`);
  const lines = [];
  for (const ch of script.chapters) {
    const sc = ch.scripture;
    const body = sc ? sc.text.replace(/\.$/, "") : null;
    let placed = false;
    for (const text of ch.lines) {
      const spoken =
        sc && sc.spoken && !placed && text.toLowerCase().includes(body.toLowerCase());
      if (spoken) placed = true;
      lines.push(spoken ? { text, ref: sc.reference } : { text });
    }
    // a verse shown on screen but not spoken as one line (or spoken across
    // several, as Mark 8:29 is) still belongs in the words, whole
    if (sc && !placed) lines.push({ text: sc.text, ref: sc.reference, shown: true });
  }
  return {
    slug,
    title: script.title,
    page: script.page,
    video: `${BLOB}/${slug}.mp4`,
    poster: `${BLOB}/${slug}-poster.jpg`,
    seconds: Math.round(timeline.length),
    translation: script.translation || "Berean Standard Bible",
    lines,
  };
});

const pages = {};
for (const f of films) {
  if (pages[f.page]) throw new Error(`two films claim ${f.page}: ${pages[f.page]} and ${f.slug}`);
  pages[f.page] = f.slug;
}

const out = [
  ["client/src/data/narrated-films.json", JSON.stringify({ films }, null, 2) + "\n"],
  ["client/src/data/narrated-film-pages.json", JSON.stringify(pages, null, 2) + "\n"],
];
let stale = 0;
for (const [file, text] of out) {
  const full = path.join(ROOT, file);
  const now = fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
  if (now === text) continue;
  if (CHECK) {
    console.error(`stale: ${file} (run node scripts/build-narrated-films.mjs)`);
    stale++;
  } else {
    fs.writeFileSync(full, text);
    console.log(`wrote ${file}`);
  }
}
if (stale) process.exit(1);
console.log(`${films.length} narrated films${CHECK ? ", data files current" : ""}`);
