/**
 * site-routes.mjs — what counts as a live internal address on this site.
 *
 * Shared by the Grow validators (validate-needs.mjs, validate-grow-links.mjs).
 * A link is live when it matches a literal route in App.tsx, or a parametric
 * route whose slug exists in that library's manifest. A link that matches a
 * redirect source in vercel.json works, but lands somewhere else: the Grow
 * section links to the destination instead, so a redirect counts as a finding.
 *
 * Param routes with no manifest here (DB-backed books and authors, the admin)
 * resolve as "unverified", never as dead.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../..", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const json = (p) => (existsSync(join(ROOT, p)) ? JSON.parse(read(p)) : null);

/** Slugs from a manifest: a list, or an object holding its list under any key. */
function slugsFrom(manifest, key = "slug") {
  const list = Array.isArray(manifest)
    ? manifest
    : Object.values(manifest || {}).find((v) => Array.isArray(v)) || [];
  return new Set(list.map((x) => x?.[key]).filter(Boolean).map(String));
}

function essaySlugs() {
  const out = new Set();
  const cd = json("client/src/data/content-data.json");
  for (const p of cd?.posts || (Array.isArray(cd) ? cd : [])) if (p?.slug) out.add(p.slug);
  const lib = json("content/static-library.generated.json");
  for (const r of Array.isArray(lib) ? lib : []) if (r?.slug) out.add(r.slug);
  return out;
}

function groupGuideSlugs() {
  const p = "client/src/data/discussion-guides.ts";
  if (!existsSync(join(ROOT, p))) return new Set();
  return new Set([...read(p).matchAll(/\bslug:\s*["']([a-z0-9-]+)["']/g)].map((m) => m[1]));
}

function bibleBooks() {
  const books = json("client/public/bible/books.json") || [];
  return new Map(books.map((b) => [b.slug, b.chapters]));
}

/** Slug sets for each parametric route, keyed by the route pattern. */
function paramSources() {
  const books = bibleBooks();
  const needs = json("client/public/needs/index.json");
  return {
    "/writing/:slug": essaySlugs(),
    "/life/:slug": slugsFrom(json("client/public/life/domains-index.json")),
    "/how-tos/:slug": slugsFrom(json("client/public/howtos/index.json")),
    "/wisdom/:id": slugsFrom(json("client/public/wisdom/topics.json"), "id"),
    "/studyguides/:slug": slugsFrom(json("client/public/studyguides/index.json")),
    "/plans/:slug": slugsFrom(json("client/public/plans/plans-index.json")),
    "/pathways/:slug": slugsFrom(json("client/public/pathways/index.json")),
    "/reading-paths/:slug": slugsFrom(json("client/public/reading-paths/index.json")),
    "/resources/context/:slug": slugsFrom(json("client/public/context/guides-index.json")),
    "/resources/creeds/:slug": slugsFrom(json("client/public/creeds/documents-index.json")),
    "/theology/doctrine/:slug": slugsFrom(json("client/public/theology/index.json")),
    "/theology/history/:slug": slugsFrom(json("client/public/history/essays-index.json")),
    "/justice/topic/:slug": slugsFrom(json("client/public/justice/topics-index.json")),
    "/disruption/topic/:slug": slugsFrom(json("client/public/disruption/topics-index.json")),
    "/group-guide/:slug": groupGuideSlugs(),
    "/help/:slug": slugsFrom(needs),
    "/study/bible/:book": new Set(books.keys()),
  };
}

let cache = null;

export function loadSiteRoutes() {
  if (cache) return cache;
  const app = read("client/src/App.tsx");
  const all = [...new Set([...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]))];
  const literal = new Set(all.filter((p) => !p.includes(":") && !p.includes("*")));
  const params = all.filter((p) => p.includes(":"));
  const sources = paramSources();
  const books = bibleBooks();

  const vc = json("vercel.json") || {};
  const redirects = (vc.redirects || []).map((r) => ({ source: r.source, destination: r.destination }));
  const literalRedirects = new Map(redirects.filter((r) => !r.source.includes(":") && !r.source.includes("(")).map((r) => [r.source, r.destination]));
  const patternRedirects = redirects
    .filter((r) => r.source.includes(":") && !r.source.includes("("))
    .map((r) => ({ ...r, re: new RegExp("^" + r.source.replace(/:[a-zA-Z]+\*?/g, "[^/]+") + "$") }));

  cache = { literal, params, sources, books, literalRedirects, patternRedirects };
  return cache;
}

/**
 * Resolve an internal href. Returns { status, to? } where status is one of
 * "ok", "redirect" (to = destination), "missing", or "unverified".
 */
export function resolveHref(rawHref) {
  const { literal, params, sources, books, literalRedirects, patternRedirects } = loadSiteRoutes();
  let href = rawHref.split("#")[0].split("?")[0];
  if (href.length > 1) href = href.replace(/\/+$/, "");
  if (!href.startsWith("/")) return { status: "unverified" };
  // Static files served from client/public (PDFs, images) are real if present.
  if (/\.[a-z0-9]{2,5}$/i.test(href)) {
    return existsSync(join(ROOT, "client/public", href)) ? { status: "ok" } : { status: "missing" };
  }
  if (literalRedirects.has(href)) return { status: "redirect", to: literalRedirects.get(href) };
  if (literal.has(href)) return { status: "ok" };
  for (const r of patternRedirects) if (r.re.test(href)) return { status: "redirect", to: r.destination };

  const parts = href.split("/");
  for (const pattern of params) {
    const pp = pattern.split("/");
    if (pp.length !== parts.length) continue;
    let ok = true;
    const vals = {};
    for (let i = 0; i < pp.length; i++) {
      if (pp[i].startsWith(":")) vals[pp[i]] = parts[i];
      else if (pp[i] !== parts[i]) { ok = false; break; }
    }
    if (!ok) continue;
    if (pattern === "/study/bible/:book/:chapter") {
      const n = books.get(vals[":book"]);
      return n && +vals[":chapter"] >= 1 && +vals[":chapter"] <= n ? { status: "ok" } : { status: "missing" };
    }
    const set = sources[pattern];
    if (!set || set.size === 0) return { status: "unverified" };
    const key = Object.values(vals)[0];
    return set.has(key) ? { status: "ok" } : { status: "missing" };
  }
  return { status: "missing" };
}

/** Every internal href in a text blob: JSON href fields and JSX/TS link props. */
export function hrefsIn(text) {
  const out = new Set();
  const re = /(?:"href"|\bhref|\bto|"url"|\blink)\s*[:=]\s*\{?\s*["'`](\/[^"'`\s$]*)["'`]/g;
  for (const m of text.matchAll(re)) out.add(m[1]);
  return [...out];
}

export function listFiles(dir, ext) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (ext.some((x) => e.name.endsWith(x))) out.push(p.slice(ROOT.length));
    }
  };
  walk(abs);
  return out;
}

export { ROOT };
