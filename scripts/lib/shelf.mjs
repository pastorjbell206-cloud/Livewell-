/**
 * scripts/lib/shelf.mjs — the essay shelf for the build scripts.
 *
 * The shelf (client/src/lib/shelf.json) is the one committed list of which
 * essays are public. The site reads it through client/src/lib/shelf.ts; the
 * plain-node build steps (generate-sitemap, prerender-heads, build-llms-full,
 * build-catalogue, build-essays-index) read it through this module. The two
 * implement the same small rule, and client/src/lib/shelf.test.ts holds them
 * to it:
 *
 *   - a shelf essay with status "live" is public;
 *   - a shelf essay with status "pending" is public only once a rewritten
 *     version exists at client/public/essays/<slug>.json;
 *   - an essay not on the shelf is public only if it went out at or after
 *     latestCutoff (new posts James adds through the admin), judged by
 *     essayDate: publishedAt, or createdAt when no publish time was recorded;
 *   - everything else is retired: noindex, out of every listing, its URL
 *     answered by a short notice. Nothing is deleted.
 *
 * Curation never depends on the database. publish-articles-build.mjs may
 * republish rows and api/index.ts may merge static copies back into the
 * listing; neither changes what this module calls public.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const SHELF_FILE = "client/src/lib/shelf.json";
export const OVERRIDES_DIR = "client/public/essays";
export const OVERRIDES_MODULE = "client/src/lib/essayOverrides.generated.ts";
/**
 * The one sentence a retired essay's URL answers with. The SPA renders the
 * same strings (client/src/components/RetiredEssayNotice.tsx); shelf.test.ts
 * keeps the two identical.
 */
export const RETIRED_SENTENCE = "James has taken this essay down for now. The essays on the site today are a click away.";
export const PENDING_SENTENCE = "James is revising this essay. It is off the site until the new version is ready.";
/** Same floor as MIN_ESSAY_CHARS in client/src/lib/essayQuality.ts. */
export const MIN_OVERRIDE_BODY = 600;

export function loadShelfData(root = ROOT) {
  return JSON.parse(fs.readFileSync(path.join(root, SHELF_FILE), "utf8"));
}

/**
 * Problems with one override file, as reader-facing strings. An override is
 * { slug, title, excerpt, body (Markdown), updated (ISO date) } for a slug that
 * is on the shelf, saved as <slug>.json.
 */
export function overrideProblems(data, fileSlug, shelfSlugs) {
  const out = [];
  if (!data || typeof data !== "object" || Array.isArray(data)) return [`${fileSlug}.json: not a JSON object`];
  const str = (k) => typeof data[k] === "string" && data[k].trim().length > 0;
  if (data.slug !== fileSlug) out.push(`${fileSlug}.json: slug "${data.slug}" does not match the file name`);
  if (!shelfSlugs.has(fileSlug)) out.push(`${fileSlug}.json: "${fileSlug}" is not on the shelf (client/src/lib/shelf.json)`);
  if (!str("title")) out.push(`${fileSlug}.json: title is missing`);
  if (typeof data.excerpt !== "string") out.push(`${fileSlug}.json: excerpt must be a string`);
  if (!str("body")) out.push(`${fileSlug}.json: body is missing`);
  else if (data.body.trim().length < MIN_OVERRIDE_BODY) out.push(`${fileSlug}.json: body is under ${MIN_OVERRIDE_BODY} characters`);
  if (!str("updated") || Number.isNaN(Date.parse(data.updated))) out.push(`${fileSlug}.json: updated must be an ISO date`);
  return out;
}

/**
 * Every override file, validated. Returns { overrides: Map<slug, record>,
 * problems: string[] }; files with problems are left out of the map.
 */
export function loadOverrides(root = ROOT, shelfData = loadShelfData(root)) {
  const shelfSlugs = new Set(shelfData.essays.map((e) => e.slug));
  const dir = path.join(root, OVERRIDES_DIR);
  const overrides = new Map();
  const problems = [];
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  } catch {
    return { overrides, problems };
  }
  for (const f of files) {
    const fileSlug = f.replace(/\.json$/, "");
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    } catch (err) {
      problems.push(`${f}: ${err.message}`);
      continue;
    }
    const p = overrideProblems(data, fileSlug, shelfSlugs);
    if (p.length) {
      problems.push(...p);
      continue;
    }
    overrides.set(fileSlug, {
      slug: fileSlug,
      title: data.title.trim(),
      excerpt: data.excerpt.trim(),
      body: data.body,
      updated: data.updated,
    });
  }
  return { overrides, problems };
}

function toTime(date) {
  if (date instanceof Date) return date.getTime();
  if (typeof date === "number") return date;
  if (typeof date === "string" && date) return Date.parse(date);
  return Number.NaN;
}

/**
 * The date the Latest rule reads (same rule as essayDate in
 * client/src/lib/shelf.ts): a row's publishedAt, or its createdAt when no
 * publish time was recorded. Build scripts that query posts must SELECT both.
 */
export function essayDate(row) {
  if (!row) return undefined;
  return Number.isFinite(toTime(row.publishedAt)) ? row.publishedAt : row.createdAt;
}

/**
 * The shelf as a set of questions. `overrideSlugs` is any iterable of slugs
 * that have a rewritten version.
 */
export function createShelf(shelfData, overrideSlugs) {
  const overrides = new Set(overrideSlugs);
  const cutoff = Date.parse(shelfData.latestCutoff);
  const sections = [...shelfData.sections].sort((a, b) => a.order - b.order);
  const sectionRank = new Map(sections.map((s, i) => [s.slug, i]));
  const entries = new Map(shelfData.essays.map((e) => [e.slug, e]));

  const isAfterCutoff = (date) => {
    const t = toTime(date);
    return Number.isFinite(t) && t >= cutoff;
  };

  /** "shelf" | "latest" | "pending" | "retired"; `date` is essayDate(row). */
  const visibility = (slug, date) => {
    const e = entries.get(slug);
    if (e) return e.status === "live" || overrides.has(slug) ? "shelf" : "pending";
    return isAfterCutoff(date) ? "latest" : "retired";
  };
  const isPublic = (slug, date) => {
    const v = visibility(slug, date);
    return v === "shelf" || v === "latest";
  };

  /** Public shelf essays in display order: section order, then shelf order. */
  const liveEssays = () =>
    shelfData.essays
      .map((e, i) => ({ e, i }))
      .filter(({ e }) => visibility(e.slug) === "shelf")
      .sort((a, b) => (sectionRank.get(a.e.section) ?? 99) - (sectionRank.get(b.e.section) ?? 99) || a.i - b.i)
      .map(({ e }) => e);

  return { cutoff, sections, entries, overrides, isAfterCutoff, visibility, isPublic, liveEssays };
}

/** The shelf as the repository holds it right now (shelf.json + override files). */
export function loadEssayShelf(root = ROOT) {
  const shelfData = loadShelfData(root);
  const { overrides, problems } = loadOverrides(root, shelfData);
  const shelf = createShelf(shelfData, overrides.keys());
  return { ...shelf, data: shelfData, overrideRecords: overrides, overrideProblems: problems };
}

/**
 * Static-library slugs api/index.ts must never serve (its TAKEN_DOWN set).
 * Parsed from the single-line declaration; fails soft to an empty set.
 */
export function loadTakenDown(root = ROOT) {
  try {
    const src = fs.readFileSync(path.join(root, "api/index.ts"), "utf8");
    // Anchored to the start of a line: the comment above the declaration
    // quotes its shape, and an unanchored match reads the comment instead.
    const m = src.match(/^const TAKEN_DOWN = new Set<string>\(\[([\s\S]*?)\]\)/m);
    if (!m) return new Set();
    return new Set([...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]));
  } catch {
    return new Set();
  }
}

/** The text of client/src/lib/essayOverrides.generated.ts for these overrides. */
export function renderOverridesModule(overrides) {
  const rows = [...overrides.values()]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((o) => `  ${JSON.stringify({ slug: o.slug, title: o.title, excerpt: o.excerpt, updated: o.updated })},`);
  return [
    "// GENERATED by scripts/build-essays-index.mjs from client/public/essays/*.json.",
    "// Do not edit by hand: add or change an essay file there, then run",
    "//   node scripts/build-essays-index.mjs",
    "// Each entry is a rewritten essay that replaces the database body at /writing/<slug>.",
    "",
    "export interface EssayOverrideMeta {",
    "  slug: string;",
    "  title: string;",
    "  excerpt: string;",
    "  /** ISO date of the rewrite. */",
    "  updated: string;",
    "}",
    "",
    rows.length ? `export const ESSAY_OVERRIDES: EssayOverrideMeta[] = [\n${rows.join("\n")}\n];` : "export const ESSAY_OVERRIDES: EssayOverrideMeta[] = [];",
    "",
  ].join("\n");
}
