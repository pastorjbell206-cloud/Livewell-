#!/usr/bin/env node
/**
 * build-tracks-index.mjs — writes client/public/tracks/index.json, the list of
 * tracks the pages read (/tracks, "Continue where you left off") and the
 * prerenderer and sitemap list from: each track's name, who it is for, and
 * its sessions by number, title and the page each one opens.
 *
 *   node scripts/build-tracks-index.mjs           write the index
 *   node scripts/build-tracks-index.mjs --check   exit 1 if it is stale (CI gate)
 *
 * The rules a track keeps are in scripts/lib/tracks.mjs; the gate is
 * scripts/validate-tracks.mjs.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { INDEX_FILE, TRACKS_DIR, buildIndex, indexText } from "./lib/tracks.mjs";

const out = join(TRACKS_DIR, INDEX_FILE);
const text = indexText();

if (process.argv.includes("--check")) {
  if (!existsSync(out) || readFileSync(out, "utf8") !== text) {
    console.error("[tracks] client/public/tracks/index.json is out of date: run node scripts/build-tracks-index.mjs");
    process.exit(1);
  }
  console.log("[tracks] index is current.");
} else {
  writeFileSync(out, text);
  const { tracks } = buildIndex();
  console.log(`[tracks] wrote ${tracks.length} track(s), ${tracks.reduce((n, t) => n + t.sessions.length, 0)} session(s), to ${out}`);
}
