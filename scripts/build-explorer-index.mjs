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
 * the threads, and the cards. A stop's page loads its own file.
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

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

export function buildIndex() {
  const storyline = read(path.join(ROOT, "client/public/theology/biblical-theology-storyline.json")).acts;
  const actOf = new Map(storyline.map((a) => [a.id, a]));
  const files = fs.readdirSync(path.join(DIR, "stops")).filter((f) => f.endsWith(".json"));
  const stops = files
    .map((f) => read(path.join(DIR, "stops", f)))
    .sort((a, b) => a.n - b.n)
    .map((s) => {
      const act = actOf.get(s.act);
      if (!act) throw new Error(`stop ${s.slug}: no act "${s.act}" in the storyline`);
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
  return {
    about: "Written by scripts/build-explorer-index.mjs from client/public/explorer/stops, threads.json and cards.json. Do not edit by hand.",
    stops,
    threads,
    cards,
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  let text;
  try {
    text = JSON.stringify(buildIndex(), null, 2) + "\n";
  } catch (err) {
    console.error(`[explorer-index] could not build: ${err.message}`);
    process.exit(1);
  }
  if (CHECK) {
    const now = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
    if (now !== text) {
      console.error("[explorer-index] client/public/explorer/index.json is stale. Run: node scripts/build-explorer-index.mjs");
      process.exit(1);
    }
    console.log("[explorer-index] index.json is current.");
  } else {
    fs.writeFileSync(OUT, text);
    console.log(`[explorer-index] wrote ${path.relative(ROOT, OUT)}`);
  }
}
