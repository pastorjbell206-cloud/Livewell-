#!/usr/bin/env node
/**
 * publish-narrated-films.mjs: put finished narrated films on the site's list.
 *
 *   node scripts/publish-narrated-films.mjs <slug> [<slug> ...]
 *
 * For each slug it uploads film/out/<slug>.mp4 and film/out/<slug>-poster.jpg
 * to the Vercel Blob store "livewell-films" as films/<slug>.mp4 and
 * films/<slug>-poster.jpg, checks that the video answers (200, and 206 to a
 * range request, which seeking needs), adds the slug to
 * scripts/narrated-films-live.json, and runs build-narrated-films.mjs so the
 * two data files the pages read are current. Then commit those three files,
 * open a pull request and merge it: merging main is what deploys.
 *
 * Where the upload key comes from, on James's Mac. Nothing secret is in this
 * repo. The Vercel CLI is already logged in on the Mac (its login lives in
 * ~/Library/Application Support/com.vercel.cli/). This script makes an empty
 * temporary folder, links it to the Vercel project "livewell-tn9v"
 * (`vercel link`), pulls that project's production variables into the folder
 * (`vercel env pull`), reads BLOB_READ_WRITE_TOKEN from the pulled file into
 * memory, uploads with `vercel blob put`, and deletes the folder. The key is
 * never printed or written anywhere else. If the CLI is logged out, run
 * `npx vercel login` first.
 *
 * It refuses, before uploading anything: a slug with no film/<slug>/script.json
 * or timeline.json, no `page` in its script, no MP4 or poster in film/out/,
 * or whose page already holds a different live film.
 *
 * npm on this Mac needs its cache elsewhere, so the CLI is run through
 * `npx --cache /private/tmp/npm-cache-film`.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIVE_FILE = path.join(ROOT, "scripts/narrated-films-live.json");
const HOST = "https://6tank2ikr2l6p1eo.public.blob.vercel-storage.com";
const PROJECT = "livewell-tn9v";
const TEAM = "team_4ecrw7DznCbM9HwFxxWWyM74";
const NPX = ["--cache", "/private/tmp/npm-cache-film", "--yes", "vercel"];

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error("usage: node scripts/publish-narrated-films.mjs <slug> [<slug> ...]");
  process.exit(1);
}
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));
const live = JSON.parse(fs.readFileSync(LIVE_FILE, "utf8"));
const pageOf = Object.fromEntries(live.map((s) => [read(`film/${s}/script.json`).page, s]));

// ---- refuse before touching anything ----
const problems = [];
for (const slug of slugs) {
  for (const f of [`film/${slug}/script.json`, `film/${slug}/timeline.json`, `film/out/${slug}.mp4`, `film/out/${slug}-poster.jpg`]) {
    if (!fs.existsSync(path.join(ROOT, f))) problems.push(`${slug}: missing ${f}`);
  }
  if (!fs.existsSync(path.join(ROOT, `film/${slug}/script.json`))) continue;
  const page = read(`film/${slug}/script.json`).page;
  if (!page) problems.push(`${slug}: script.json has no page`);
  else if (pageOf[page] && pageOf[page] !== slug) problems.push(`${slug}: ${page} already holds the live film ${pageOf[page]}`);
  else pageOf[page] = slug;
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

// ---- the upload key, held in memory only ----
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "livewell-blob-"));
let token = "";
try {
  const quiet = { cwd: tmp, stdio: ["ignore", "ignore", "pipe"] };
  execFileSync("npx", [...NPX, "link", "--yes", "--scope", TEAM, "--project", PROJECT], quiet);
  execFileSync("npx", [...NPX, "env", "pull", ".env.local", "--yes", "--environment", "production"], quiet);
  const env = fs.readFileSync(path.join(tmp, ".env.local"), "utf8");
  token = (env.match(/^BLOB_READ_WRITE_TOKEN="?([^"\n]+)"?$/m) || [])[1] || "";
  if (!token) throw new Error("the project's variables hold no BLOB_READ_WRITE_TOKEN (is the store still connected?)");

  // ---- upload, then check each video answers ----
  for (const slug of slugs) {
    for (const [file, type] of [[`${slug}.mp4`, "video/mp4"], [`${slug}-poster.jpg`, "image/jpeg"]]) {
      execFileSync("npx", [...NPX, "blob", "put", path.join(ROOT, "film/out", file), "--access", "public", "--pathname", `films/${file}`, "--content-type", type, "--force"],
        { cwd: tmp, stdio: ["ignore", "ignore", "pipe"], env: { ...process.env, BLOB_READ_WRITE_TOKEN: token } });
      console.log(`uploaded ${HOST}/films/${file}`);
    }
  }
} catch (e) {
  const msg = String(e.stderr || e.message || e).split(token || "\u0000").join("[key]");
  console.error("upload failed:\n" + msg);
  process.exit(1);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

for (const slug of slugs) {
  const url = `${HOST}/films/${slug}.mp4`;
  const size = fs.statSync(path.join(ROOT, "film/out", `${slug}.mp4`)).size;
  const head = await fetch(url, { method: "HEAD" });
  const range = await fetch(url, { headers: { Range: "bytes=0-99" } });
  const poster = await fetch(`${HOST}/films/${slug}-poster.jpg`, { method: "HEAD" });
  const ok = head.status === 200 && Number(head.headers.get("content-length")) === size && range.status === 206 && poster.status === 200;
  console.log(`${ok ? "ok  " : "FAIL"} ${slug}: video ${head.status}, ${head.headers.get("content-length")} of ${size} bytes, range ${range.status}, poster ${poster.status}`);
  if (!ok) process.exit(1);
}

// ---- the live list, and the data the pages read ----
const next = [...live, ...slugs.filter((s) => !live.includes(s))];
fs.writeFileSync(LIVE_FILE, JSON.stringify(next, null, 2) + "\n");
execFileSync("node", [path.join(ROOT, "scripts/build-narrated-films.mjs")], { stdio: "inherit" });
console.log(`\n${slugs.length} film(s) published to the list. Now commit scripts/narrated-films-live.json, client/src/data/narrated-films.json and client/src/data/narrated-film-pages.json, and merge to main to deploy.`);
