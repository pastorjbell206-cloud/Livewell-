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

// Each plan's need, in the reader's own words: the care page whose kit links
// the plan (client/public/needs/<slug>.json, kit.plan.href). /plans leads with
// it, because "I can't stop worrying" is how a reader finds the plan, not
// "Eight Weeks Toward a Quieter Mind". Plans follow Find Help's order (the
// needs index, ranked by demand); a plan no care page links comes last.
const NEEDS_DIR = join(__dirname, "..", "client/public/needs");
const needFor = new Map();
for (const f of fs.readdirSync(NEEDS_DIR).filter((f) => f.endsWith(".json") && f !== "index.json")) {
  const n = JSON.parse(fs.readFileSync(join(NEEDS_DIR, f), "utf8"));
  const m = String(n?.kit?.plan?.href ?? "").match(/^\/plans\/([^/?#]+)$/);
  // When two care pages share a plan, the one the plan is named for wins.
  if (m && (!needFor.has(m[1]) || n.slug === m[1])) needFor.set(m[1], { need: n.title, needSlug: n.slug });
}
const needOrder = new Map(
  JSON.parse(fs.readFileSync(join(NEEDS_DIR, "index.json"), "utf8")).needs.map((n, i) => [n.slug, i]),
);
const rank = (p) => (p.needSlug && needOrder.has(p.needSlug) ? needOrder.get(p.needSlug) : Infinity);

const plans = fs.readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && f !== "plans-index.json")
  .map((f) => {
    const slug = f.replace(/\.json$/, "");
    const d = JSON.parse(fs.readFileSync(join(DIR, f), "utf8"));
    return {
      slug,
      title: d.title || d.name || slug,
      blurb: d.subtitle || d.blurb || d.summary || "",
      ...(needFor.get(slug) ?? {}),
    };
  })
  .filter((p) => p.title)
  .sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title));

fs.writeFileSync(OUT, JSON.stringify({ plans }, null, 2) + "\n");
console.log(`[build-plans-index] wrote ${plans.length} plan(s) to ${OUT}`);
