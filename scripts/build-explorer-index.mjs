#!/usr/bin/env node
/**
 * build-explorer-index.mjs: the Bible Explorer's manifest.
 *
 * The Explorer (/study/explorer) is content as data. Each stop on the map is
 * one file in client/public/explorer/stops/<slug>.json; the threads that run
 * through the whole Bible are client/public/explorer/threads.json; the "Why
 * we believe" cards are client/public/explorer/cards.json. The map loads one
 * small file, client/public/explorer/index.json, written here: every stop's
 * number, title, act, status and one-line summary at both reading levels,
 * the threads, the cards, and the moving pictures of "Watch and learn"
 * (films.json, with each finished film's line from films/<slug>.json). A
 * stop's page and a film's page load their own files.
 *
 * The act names come from the site's storyline (the eleven acts of the
 * Bible's Story, client/public/theology/biblical-theology-storyline.json), so
 * the map and /study/bible/story tell one story.
 *
 *   node scripts/build-explorer-index.mjs           write index.json
 *   node scripts/build-explorer-index.mjs --check   exit 1 if it is stale or cannot be built
 *
 * scripts/validate-explorer.mjs is the content gate (shape, Scripture
 * checked against the BSB, links, the voice rules).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "client/public/explorer");
const OUT = path.join(DIR, "index.json");
const CHECK = process.argv.includes("--check");

const read = p => JSON.parse(fs.readFileSync(p, "utf8"));

export function buildIndex() {
  const storyline = read(
    path.join(ROOT, "client/public/theology/biblical-theology-storyline.json")
  ).acts;
  const actOf = new Map(storyline.map(a => [a.id, a]));
  const files = fs
    .readdirSync(path.join(DIR, "stops"))
    .filter(f => f.endsWith(".json"));
  const stops = files
    .map(f => read(path.join(DIR, "stops", f)))
    .sort((a, b) => a.n - b.n)
    .map(s => {
      const act = actOf.get(s.act);
      if (!act)
        throw new Error(`stop ${s.slug}: no act "${s.act}" in the storyline`);
      return {
        slug: s.slug,
        n: s.n,
        title: s.title,
        range: s.range,
        act: s.act,
        actLabel: act.act,
        actTitle: act.title,
        status: s.status,
        summary: s.summary,
      };
    });
  const { threads } = read(path.join(DIR, "threads.json"));
  const { cards } = read(path.join(DIR, "cards.json"));
  // Watch and learn: every planned moving picture (films.json); a finished
  // one adds its line, its number of frames and where it belongs from its
  // own file (films/<slug>.json).
  const catalogue = read(path.join(DIR, "films.json"));
  const films = catalogue.films.map(f => {
    if (f.status !== "finished") return f;
    const file = path.join(DIR, "films", `${f.slug}.json`);
    if (!fs.existsSync(file))
      throw new Error(
        `film ${f.slug} is finished but has no films/${f.slug}.json`
      );
    const film = read(file);
    return {
      ...f,
      line: film.line,
      mark: film.mark,
      frames: film.frames.length,
      stops: film.stops,
      cards: film.cards,
    };
  });
  return {
    about:
      "Written by scripts/build-explorer-index.mjs from client/public/explorer/stops, threads.json, cards.json, films.json and films/. Do not edit by hand.",
    stops,
    threads,
    cards,
    filmGroups: catalogue.groups,
    films,
  };
}

/**
 * Where each finished film is offered outside the Explorer: the pages a
 * film's own data points to (its deeper links, where churches differ, and
 * where it sends the reader at the end), turned round, so that an Honest
 * Answer, a /questions piece, a doctrine study or a wisdom topic can show the
 * films that belong on it (components FilmsHere). Study Bible chapters are
 * left to the passage index, and the family pages to their own data.
 */
export function buildFilmLinks() {
  const catalogue = read(path.join(DIR, "films.json"));
  const films = {};
  const pages = {};
  for (const f of catalogue.films) {
    if (f.status !== "finished") continue;
    const film = read(path.join(DIR, "films", `${f.slug}.json`));
    const hrefs = [
      ...(film.deeper ?? []),
      ...(film.differ?.links ?? []),
      ...(film.end ? [film.end] : []),
    ].map(l => String(l.href ?? "").replace(/[#?].*$/, ""));
    let used = false;
    for (const h of new Set(hrefs)) {
      if (!OFFERED_ON.test(h)) continue;
      (pages[h] ??= []).push(f.slug);
      used = true;
    }
    if (used) films[f.slug] = { title: f.title, line: film.line.younger };
  }
  return {
    about:
      "Written by scripts/build-explorer-index.mjs from each film's own links (films/<slug>.json: deeper, differ, end). The pages outside the Explorer on which each moving picture is offered. Do not edit by hand.",
    films,
    pages: Object.fromEntries(
      Object.entries(pages).sort(([a], [b]) => a.localeCompare(b))
    ),
  };
}
const OFFERED_ON =
  /^\/(answers\/[a-z0-9-]+|questions\/[a-z0-9-]+\/[a-z0-9-]+|study\/bible\/doctrines\/[a-z0-9-]+|wisdom\/[a-z0-9-]+)$/;
const LINKS_OUT = path.join(DIR, "film-links.json");

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  let text;
  let links;
  try {
    text = JSON.stringify(buildIndex(), null, 2) + "\n";
    links = JSON.stringify(buildFilmLinks(), null, 1) + "\n";
  } catch (err) {
    console.error(`[explorer-index] could not build: ${err.message}`);
    process.exit(1);
  }
  if (CHECK) {
    const now = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
    if (now !== text) {
      console.error(
        "[explorer-index] client/public/explorer/index.json is stale. Run: node scripts/build-explorer-index.mjs"
      );
      process.exit(1);
    }
    const linksNow = fs.existsSync(LINKS_OUT)
      ? fs.readFileSync(LINKS_OUT, "utf8")
      : "";
    if (linksNow !== links) {
      console.error(
        "[explorer-index] client/public/explorer/film-links.json is stale. Run: node scripts/build-explorer-index.mjs"
      );
      process.exit(1);
    }
    console.log("[explorer-index] index.json and film-links.json are current.");
  } else {
    fs.writeFileSync(OUT, text);
    fs.writeFileSync(LINKS_OUT, links);
    console.log(
      `[explorer-index] wrote ${path.relative(ROOT, OUT)} and ${path.relative(ROOT, LINKS_OUT)}`
    );
  }
}
