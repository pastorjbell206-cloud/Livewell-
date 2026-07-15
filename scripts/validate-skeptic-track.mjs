#!/usr/bin/env node
/**
 * validate-skeptic-track.mjs — the honesty gate for /skeptic-track.
 *
 * Every non-null stop slug in client/src/lib/skepticTrack.ts must resolve to a
 * real, published essay in the static library, so a wired stop can never
 * quietly dead-end into "Essay in progress." Fails the build if one does not.
 *
 * It also reports whether the track is currently advertised (all stops filled)
 * so the state is visible in CI, not silent.
 *
 *   node scripts/validate-skeptic-track.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = path.join(ROOT, "client/src/lib/skepticTrack.ts");
const LIBRARY = path.join(ROOT, "content/static-library.generated.json");

const src = fs.readFileSync(CONFIG, "utf8");

// Pull the slug of each stop, in order: `slug: "..."` or `slug: null`.
const slugs = [...src.matchAll(/slug:\s*(?:"([^"]+)"|null)/g)].map((m) => m[1] ?? null);
if (slugs.length === 0) {
  console.error("[skeptic-track] no stops found in skepticTrack.ts");
  process.exit(1);
}

const library = JSON.parse(fs.readFileSync(LIBRARY, "utf8"));
const published = new Set(library.filter((r) => r && r.slug && r.published !== false).map((r) => r.slug));

const dangling = slugs.filter((s) => s !== null && !published.has(s));
const stubs = slugs.filter((s) => s === null).length;
const live = stubs === 0;

if (dangling.length) {
  console.error(`[skeptic-track] ${dangling.length} wired stop(s) do not resolve to a published essay:`);
  for (const s of dangling) console.error(`  - ${s}`);
  console.error("Fix the slug in client/src/lib/skepticTrack.ts or set it to null (in-progress).");
  process.exit(1);
}

console.log(
  `[skeptic-track] clean: ${slugs.length} stops, ${slugs.length - stubs} wired, ${stubs} in progress. ` +
    `Track ${live ? "LIVE (entry points shown)" : "NOT advertised (entry points hidden until every stop is filled)"}.`
);
