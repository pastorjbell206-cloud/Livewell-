#!/usr/bin/env node
/**
 * build-essays-index.mjs
 *
 * Scans client/public/essays/*.json (rewritten essays: { slug, title, excerpt,
 * body, updated }) and writes client/src/lib/essayOverrides.generated.ts, the
 * index the site reads to know which essays have a rewrite. Run it after
 * adding or changing any essay file there:
 *
 *   node scripts/build-essays-index.mjs           write the index
 *   node scripts/build-essays-index.mjs --check   exit 1 if the index is stale
 *
 * A rewrite exists only for a slug on the shelf (client/src/lib/shelf.json).
 * Saving one turns a "pending" shelf essay live: /writing lists it, the essay
 * page renders the rewrite instead of the database body, and the sitemap,
 * prerendered head, and llms-full pick it up on the next build.
 *
 * Any malformed file stops the build with the reason, so a half-written
 * rewrite never reaches readers.
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, OVERRIDES_MODULE, loadOverrides, renderOverridesModule } from "./lib/shelf.mjs";

const CHECK = process.argv.includes("--check");
const { overrides, problems } = loadOverrides(ROOT);

if (problems.length) {
  console.error("[essays-index] rewritten essays with problems:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const out = path.join(ROOT, OVERRIDES_MODULE);
const text = renderOverridesModule(overrides);

if (CHECK) {
  const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  if (current !== text) {
    console.error(`[essays-index] ${OVERRIDES_MODULE} is stale. Run: node scripts/build-essays-index.mjs`);
    process.exit(1);
  }
  console.log(`[essays-index] up to date (${overrides.size} rewritten essays)`);
} else {
  fs.writeFileSync(out, text);
  console.log(`[essays-index] wrote ${overrides.size} rewritten essays to ${OVERRIDES_MODULE}`);
}
