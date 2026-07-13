#!/usr/bin/env node
/**
 * build-plans-index.mjs — writes client/public/plans/plans-index.json, the
 * manifest that lets the prerenderer (scripts/prerender-heads.mjs) emit a real
 * per-plan <head> and crawlable body for each of the eight-week care plans.
 * Without it, /plans/:slug served the homepage head — the seven deepest
 * pastoral companions did not unfurl as themselves in search or social.
 *
 *   node scripts/build-plans-index.mjs
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, "..", "client/public/plans");
const OUT = join(DIR, "plans-index.json");

const plans = fs.readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && f !== "plans-index.json")
  .map((f) => {
    const slug = f.replace(/\.json$/, "");
    const d = JSON.parse(fs.readFileSync(join(DIR, f), "utf8"));
    return {
      slug,
      title: d.title || d.name || slug,
      blurb: d.subtitle || d.blurb || d.summary || "",
    };
  })
  .filter((p) => p.title)
  .sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(OUT, JSON.stringify({ plans }, null, 2) + "\n");
console.log(`[build-plans-index] wrote ${plans.length} plan(s) to ${OUT}`);
