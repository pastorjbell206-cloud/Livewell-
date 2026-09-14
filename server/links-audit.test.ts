import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// ---------------------------------------------------------------------------
// Broken internal-link guard.
//
// Every internal link in the client (href="/x", <Link>, setLocation, navigate,
// window.location) must point to a route that actually exists in App.tsx (or a
// vercel.json redirect source). A link to a non-existent route dead-ends at the
// 404 page — exactly the "I click it and nothing happens" bug.
//
// This test changes no behaviour; it fails CI if a new broken link appears.
// Genuine exceptions go in KNOWN_BROKEN_LINKS (currently empty — keep it that
// way).
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const KNOWN_BROKEN_LINKS = new Set<string>([]);

function routeMatchers(): { regexes: RegExp[]; prefixes: string[] } {
  const appSrc = readFileSync(path.join(repoRoot, "client/src/App.tsx"), "utf8");
  const routePaths = [...appSrc.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);

  let redirectSources: string[] = [];
  try {
    const vercel = JSON.parse(readFileSync(path.join(repoRoot, "vercel.json"), "utf8"));
    redirectSources = (vercel.redirects || []).map((r: { source: string }) => r.source);
  } catch {
    /* no vercel.json */
  }

  // Wouter route syntax → regex. Handles :params, rest params (:rest*), bare
  // wildcards (*), and optional wildcards (/*? matches with or without the
  // trailing segment). Tokens are swapped for placeholders before escaping so
  // the escape pass cannot mangle them.
  const toRegex = (p: string) => {
    let pat = p
      .replace(/\/\*\?/g, "\u0001")
      .replace(/:[A-Za-z0-9_]+\*/g, "\u0002")
      .replace(/\*/g, "\u0002")
      .replace(/:[A-Za-z0-9_]+/g, "\u0003");
    pat = pat.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    pat = pat
      .replace(/\u0001/g, "(?:/.*)?")
      .replace(/\u0002/g, ".*")
      .replace(/\u0003/g, "[^/]+");
    return new RegExp("^" + pat + "/?$");
  };

  return {
    regexes: [...routePaths, ...redirectSources].map(toRegex),
    prefixes: routePaths.filter((p) => p.includes(":")).map((p) => p.slice(0, p.indexOf(":"))),
  };
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|jsx?)$/.test(full)) out.push(full);
  }
  return out;
}

const LINK_PATTERNS = [
  /\bhref=\{?["'`](\/[^"'`]*)["'`]\}?/g,
  /\bto=\{?["'`](\/[^"'`]*)["'`]\}?/g,
  /\bsetLocation\(\s*["'`](\/[^"'`]*)["'`]/g,
  /\bnavigate\(\s*["'`](\/[^"'`]*)["'`]/g,
  /window\.location\.href\s*=\s*["'`](\/[^"'`]*)["'`]/g,
];

// Non-route internal prefixes (static assets, API, files served outside the SPA).
const SKIP_PREFIXES = ["/api", "/assets", "/downloads", "/images", "/sitemap", "/rss", "/feed", "/robots", "/llms"];

function brokenLinks(): string[] {
  const { regexes, prefixes } = routeMatchers();
  const matches = (target: string) =>
    regexes.some((rx) => rx.test(target)) || prefixes.some((pre) => target === pre || target.startsWith(pre));

  const broken = new Set<string>();
  for (const f of walk(path.join(repoRoot, "client/src"))) {
    const src = readFileSync(f, "utf8");
    for (const re of LINK_PATTERNS) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(src)) !== null) {
        let target = m[1].split("?")[0].split("#")[0];
        const interp = target.indexOf("${");
        if (interp !== -1) target = target.slice(0, interp); // dynamic: check static prefix
        if (target === "/") continue;
        if (SKIP_PREFIXES.some((p) => target.startsWith(p))) continue;
        if (matches(target)) continue;
        broken.add(target);
      }
    }
  }
  return [...broken].sort();
}

describe("internal links", () => {
  it("every internal link points to a real route", () => {
    const newBroken = brokenLinks().filter((t) => !KNOWN_BROKEN_LINKS.has(t));
    expect(
      newBroken,
      "These internal links point to routes that do not exist in App.tsx and will " +
        "dead-end at the 404 page. Fix the href, add the route, or (if intentional) " +
        "add to KNOWN_BROKEN_LINKS:\n  " +
        newBroken.join("\n  "),
    ).toEqual([]);
  });
});
