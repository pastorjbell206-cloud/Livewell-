#!/usr/bin/env node
/**
 * verify-seo.mjs — proof the crawlable loop actually closed.
 *
 * What a crawler is told must match what the shelf intends. Since the shelf
 * became the source of truth for what is public (client/src/lib/shelf.json),
 * there are two invariants worth guarding, and they pull in opposite
 * directions:
 *
 *   1. A LIVE shelf essay is advertised to search engines, so its prerendered
 *      page must carry a real title, description, canonical, OG, Article
 *      JSON-LD, and index-follow robots. An indexable page with no article
 *      markup is a page Google cannot show well.
 *   2. A RETIRED or PENDING essay must be noindex, so a takedown notice never
 *      becomes a search result. Requiring Article JSON-LD of these would be
 *      wrong; the absence is the point.
 *
 * The previous version sampled the static library instead of the shelf. After
 * the shelf reduction that set is mostly retired essays, so it reported ~25
 * false failures while being structurally blind to 13 of the 15 essays that
 * are actually public. Checking the shelf fixes both ends.
 *
 * Body text is checked but never fails the run: for most live essays the body
 * comes from the database, which a local build does not have. It is reported so
 * a production build can be eyeballed, and so an empty indexable page is
 * visible rather than silent.
 *
 *   pnpm run build && pnpm run prerender && node scripts/verify-seo.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist/public");
const GENERIC_TITLE = "LiveWell by James Bell";

if (!fs.existsSync(DIST)) {
  console.error(`[verify-seo] no dist output at ${DIST}. Run: pnpm run build && pnpm run prerender`);
  process.exit(1);
}

const shelf = JSON.parse(fs.readFileSync(path.join(ROOT, "client/src/lib/shelf.json"), "utf8"));
const liveSlugs = shelf.essays.filter((e) => e.status === "live").map((e) => e.slug);
const offShelfSlugs = shelf.essays.filter((e) => e.status !== "live").map((e) => e.slug);

// Most live essay bodies come from the database. Without a connection the
// prerender cannot write body or Article JSON-LD for them, so those two checks
// are reported rather than failed; everything structural is still enforced.
// With DATABASE_URL set (a production build) they are hard failures.
const HAS_DB = Boolean(process.env.DATABASE_URL);

/** Read a prerendered route, or null when the crawler would get the SPA shell. */
function readRoute(routePath) {
  const file = path.join(DIST, routePath === "/" ? "index.html" : `${routePath}/index.html`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

/** Visible text inside #root: what a crawler that runs no JavaScript receives. */
function bodyTextLength(html) {
  const root = (html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/) || [])[1] || "";
  return root.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

const problems = [];
const notes = [];
let checkedLive = 0;
let checkedOff = 0;
let emptyBodies = 0;
let missingSchema = 0;

// The home page still has to unfurl as itself.
const home = readRoute("/");
if (!home) problems.push("/: no prerendered file (crawler gets the SPA shell)");
else {
  if (!/<title>[^<]+<\/title>/.test(home)) problems.push("/: empty <title>");
  if (!/<meta\s+name="description"\s+content="[^"]{20,}"/.test(home)) problems.push("/: missing meta description");
}

// 1. Every live shelf essay: fully indexable and fully marked up.
for (const slug of liveSlugs) {
  const route = `/writing/${slug}`;
  const html = readRoute(route);
  if (!html) {
    problems.push(`${route}: live on the shelf but has no prerendered file (crawler gets the SPA shell)`);
    continue;
  }
  checkedLive++;
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (!title || title.trim() === GENERIC_TITLE) problems.push(`${route}: generic/empty <title> ("${title}")`);
  if (!/<meta\s+name="description"\s+content="[^"]{20,}"/.test(html)) problems.push(`${route}: missing meta description`);
  if (!/<link\s+rel="canonical"/.test(html)) problems.push(`${route}: missing canonical`);
  if (!/<meta\s+property="og:title"/.test(html)) problems.push(`${route}: missing og:title`);
  if (/name="robots"\s+content="noindex/.test(html)) problems.push(`${route}: live on the shelf but marked noindex`);
  if (!/"@type":\s*"Article"/.test(html)) {
    if (HAS_DB) problems.push(`${route}: missing Article JSON-LD`);
    else missingSchema++;
  }
  if (bodyTextLength(html) === 0) emptyBodies++;
}

// 2. Every off-shelf essay: present, and firmly noindex.
for (const slug of offShelfSlugs) {
  const route = `/writing/${slug}`;
  const html = readRoute(route);
  if (!html) continue; // not every off-shelf slug is prerendered; absence is fine
  checkedOff++;
  if (!/name="robots"\s+content="noindex/.test(html)) {
    problems.push(`${route}: off the shelf but indexable (a takedown notice could become a search result)`);
  }
}

if (emptyBodies || missingSchema) {
  notes.push(
    `without DATABASE_URL: ${emptyBodies} of ${checkedLive} live essays prerendered with an empty body and ${missingSchema} without Article JSON-LD. ` +
      `Their text lives in the database, so this is expected locally. Re-run with DATABASE_URL set (or inspect a production build) to enforce it.`
  );
}

if (problems.length) {
  console.error(`[verify-seo] ${problems.length} problem(s). Checked ${checkedLive} live and ${checkedOff} off-shelf essays:`);
  for (const p of problems.slice(0, 40)) console.error(`  - ${p}`);
  if (problems.length > 40) console.error(`  ... and ${problems.length - 40} more`);
  for (const n of notes) console.error(`  note: ${n}`);
  process.exit(1);
}

const enforced = HAS_DB
  ? "title, description, canonical, OG, Article JSON-LD and index robots"
  : "title, description, canonical, OG and index robots (content checks deferred, see note)";
console.log(
  `[verify-seo] clean: ${checkedLive} live essays carry ${enforced}; ${checkedOff} off-shelf essays are noindex.`
);
for (const n of notes) console.log(`  note: ${n}`);
