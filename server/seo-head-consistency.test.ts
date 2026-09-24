import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// ---------------------------------------------------------------------------
// One title per page.
//
// A page's <head> can be declared in two places: the component's <SEOMeta
// title="…"> literal, and a hardcoded entry in scripts/prerender-heads.mjs
// STATIC_PAGES. When they disagree, the prerendered file wins for anything that
// does not run JavaScript — so a crawler, a link unfurl, and a browser tab can
// show three different titles for the same page, and nothing in the build says
// so.
//
// That had already happened silently on three routes (/parenting, /marriage,
// /nation) before this guard existed. It changes no behaviour; it fails CI if
// the two sources drift apart again.
//
// The real fix is to stop declaring titles twice — let the component win
// whenever it has a literal. Until then, this keeps them honest.
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

/** Hardcoded route → title pairs from prerender-heads.mjs STATIC_PAGES. */
function prerenderTitles(): Map<string, string> {
  const src = readFileSync(path.join(repoRoot, "scripts/prerender-heads.mjs"), "utf8");
  return new Map(
    [...src.matchAll(/path:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
  );
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (full.endsWith(".tsx")) out.push(full);
  }
  return out;
}

/** Route → title, read from each page component's <SEOMeta> literal. */
function componentTitles(): Map<string, { title: string; file: string }> {
  const found = new Map<string, { title: string; file: string }>();
  for (const file of walk(path.join(repoRoot, "client/src/pages"))) {
    const src = readFileSync(file, "utf8");
    const title = src.match(/<SEOMeta\b[^>]*?title="([^"]+)"/s);
    // The canonical url prop carries the route this component renders at.
    const url = src.match(/url=\{?["`][^"`]*?(\/[a-z0-9/-]*)["`]/);
    if (title && url) found.set(url[1], { title: title[1], file: path.relative(repoRoot, file) });
  }
  return found;
}

describe("SEO head consistency", () => {
  it("declares one title per route across the component and the prerender list", () => {
    const pre = prerenderTitles();
    const comp = componentTitles();

    const drifted: string[] = [];
    for (const [route, { title, file }] of comp) {
      const hardcoded = pre.get(route);
      if (hardcoded !== undefined && hardcoded !== title) {
        drifted.push(
          `${route}\n    prerender-heads.mjs: ${JSON.stringify(hardcoded)}\n    ${file}: ${JSON.stringify(title)}`,
        );
      }
    }

    expect(
      drifted,
      `These routes serve a different title to a crawler than to a browser.\n` +
        `Make them one string in both places.\n\n  ${drifted.join("\n  ")}\n`,
    ).toEqual([]);
  });

  it("still finds both sources, so the guard cannot pass by reading nothing", () => {
    // A regex that silently stops matching would make the test above vacuous.
    expect(prerenderTitles().size).toBeGreaterThan(20);
    expect(componentTitles().size).toBeGreaterThan(50);
  });
});
