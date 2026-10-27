/**
 * The simplified site James approved on 2026-10-12, held in place:
 *
 * - every folded page is one permanent hop in vercel.json, the apex-host rule
 *   runs first, and no redirect lands on another redirect;
 * - App.tsx answers each folded route with a client stub that makes the same
 *   move, so in-app links and `pnpm dev` behave like production;
 * - what James asked to keep never redirects: the Study Bible, church history,
 *   the creeds, the context guides, the downloads, /nation, Find Help, the
 *   ministry pages, and every tool in the /tools registry;
 * - the crawl surfaces (sitemap, prerendered heads, llms.txt, the nav) never
 *   advertise a URL that only redirects.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { SITE_NAV_GROUPS, HELP_LINK, LIBRARY_LINK, SEARCH_SHORTCUTS } from "./siteNav";
import { SHELF_ESSAYS, isPublicEssay } from "./shelf";

const ROOT = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

interface Rule {
  source: string;
  destination: string;
  permanent?: boolean;
  has?: unknown[];
}
const RULES: Rule[] = JSON.parse(read("vercel.json")).redirects;
const PATH_RULES = RULES.filter((r) => !r.has);

/** A vercel.json source pattern (:param, :param*, (.*)) as a regex. */
function sourceRegex(source: string): RegExp {
  const body = source
    .split(/(:[A-Za-z0-9_]+\*?|\(\.\*\))/)
    .filter(Boolean)
    .map((t) => {
      if (t === "(.*)" || (t.startsWith(":") && t.endsWith("*"))) return ".*";
      if (t.startsWith(":")) return "[^/]+";
      return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("");
  return new RegExp(`^${body}/?$`);
}
const SOURCE_RX = PATH_RULES.map((r) => ({ rule: r, rx: sourceRegex(r.source) }));
const redirectFor = (url: string) => SOURCE_RX.find(({ rx }) => rx.test(url.split(/[?#]/)[0]))?.rule;

const APP = read("client/src/App.tsx");
const ROUTE_COMPONENT = new Map(
  Array.from(APP.matchAll(/<Route path="([^"]+)" component=\{(\w+)\}/g), (m) => [m[1], m[2]] as const)
);
const STUB_TARGET = new Map(
  Array.from(APP.matchAll(/const (\w+Redirect) = redirectTo\("([^"]+)"\);/g), (m) => [m[1], m[2]] as const)
);
const ROUTES = Array.from(APP.matchAll(/<Route\s+path="([^"]+)"/g), (m) => m[1]);

/** The pages folded in this pass, and where each one now lives. */
const FOLDED: Record<string, string> = {
  "/explore": "/writing",
  "/library": "/writing",
  "/article-collections": "/writing",
  "/reading-paths": "/writing",
  "/pathways": "/writing",
  "/pillars": "/writing",
  "/map": "/writing",
  "/framework": "/writing",
  "/living-well": "/writing",
  "/exile": "/writing?section=after-christendom",
  "/post-christian": "/writing?section=after-christendom",
  "/after-christendom": "/writing?section=after-christendom",
  "/justice": "/writing",
  "/justice/posture": "/writing",
  "/justice/glossary": "/writing",
  "/justice/topic/:slug": "/writing",
  "/lament": "/studyguides/lament",
  "/disruption": "/writing?section=faith-and-power",
  "/disruption/posture": "/writing?section=faith-and-power",
  "/disruption/glossary": "/writing?section=faith-and-power",
  "/disruption/questions": "/writing?section=faith-and-power",
  "/disruption/topic/:slug": "/writing?section=faith-and-power",
  "/capture-by-the-right": "/writing?section=faith-and-power",
  "/capture-by-the-left": "/writing?section=faith-and-power",
  "/reading-scripture-past-our-politics": "/writing?section=faith-and-power",
  "/theology": "/study",
  "/theology/paths": "/study",
  "/historic-faith": "/study",
  "/theology/biblical": "/study/bible/story",
  "/theology/hermeneutics": "/study/bible/guides",
  "/theology/explorer": "/study/bible/doctrines",
  "/faq": "/answers",
  "/honest-questions": "/answers",
  "/doubt": "/answers",
  "/substack": "/subscribe",
  "/work-with-james": "/speaking",
  "/connect": "/about",
  // The no-decision cleanup (U06): the pre-elevation family and marriage hubs,
  // and the six crisis landings that duplicated a Find Help page.
  "/for-families": "/family",
  "/parenting": "/family",
  "/marriage": "/help/marriage",
  "/grief": "/help/grief",
  "/faith-crisis": "/help/doubt",
  "/marriage-crisis": "/help/marriage",
  "/parenting-help": "/help/parenting",
  "/deconstruction": "/help/deconstructing",
  "/church-hurt": "/help/church-hurt",
};

/** Kept routes: James asked for these to stay, or other kept pages depend on them. */
const KEPT = [
  "/",
  "/study",
  "/study/bible",
  "/study/bible/genesis",
  "/study/bible/genesis/1",
  "/study/bible/story",
  "/study/bible/doctrines",
  "/study/bible/guides",
  "/theology/history",
  "/theology/history/the-reformation",
  "/theology/glossary",
  "/theology/traditions",
  "/theology/search",
  "/justice/timeline",
  "/justice/witnesses",
  "/disruption/witnesses",
  "/theology/doctrine/god-and-trinity",
  "/theology/creeds",
  "/theology/how-to-use",
  "/theology/compare",
  "/theology/passage",
  "/resources/creeds",
  "/resources/context",
  "/resources/context/sample",
  "/downloads",
  "/resources/hard-issues-series",
  "/studyguides",
  "/tools",
  "/nation",
  "/help",
  "/life",
  "/life/assessment",
  "/writing",
  "/answers",
  "/books",
  "/about",
  "/speaking",
  "/contact",
  "/subscribe",
];

/** Every tool listed in the /tools registry. */
const TOOL_HREFS = Array.from(read("client/src/pages/ToolsHub.tsx").matchAll(/^\s+href: "([^"]+)",$/gm), (m) => m[1]);

describe("vercel.json redirects", () => {
  it("runs the apex-host rule first", () => {
    expect(RULES[0].has).toBeTruthy();
    expect(RULES[0].destination).toBe("https://www.livewellbyjamesbell.co/$1");
    expect(RULES.filter((r) => r.has)).toHaveLength(1);
  });

  it("folds each page in one permanent hop", () => {
    for (const [source, destination] of Object.entries(FOLDED)) {
      const rule = PATH_RULES.find((r) => r.source === source);
      expect(rule, source).toBeTruthy();
      expect(rule!.destination, source).toBe(destination);
      expect(rule!.permanent, source).toBe(true);
    }
  });

  it("never lands on another redirect", () => {
    const chains = PATH_RULES.filter((r) => r.destination.startsWith("/") && redirectFor(r.destination)).map(
      (r) => `${r.source} -> ${r.destination} -> ${redirectFor(r.destination)!.destination}`
    );
    expect(chains).toEqual([]);
  });

  it("sends an old essay URL only to an essay that is on the shelf", () => {
    // A redirect that lands on a retired or pending essay spends the old
    // URL's reader (and its link equity) on a noindex notice. Point it at a
    // live shelf essay, a /writing section, or another live page instead.
    const offShelf = PATH_RULES.filter((r) => {
      const m = r.destination.match(/^\/writing\/([a-z0-9-]+)$/);
      return m !== null && !isPublicEssay(m[1]);
    }).map((r) => `${r.source} -> ${r.destination}`);
    expect(offShelf).toEqual([]);
  });

  it("never redirects a shelf essay's own URL, so it can come back with one line", () => {
    const shadowed = SHELF_ESSAYS.map((e) => `/writing/${e.slug}`).filter((u) => redirectFor(u));
    expect(shadowed).toEqual([]);
  });

  it("lists each source once", () => {
    const seen = new Set<string>();
    const dups = PATH_RULES.map((r) => r.source).filter((s) => (seen.has(s) ? true : (seen.add(s), false)));
    expect(dups).toEqual([]);
  });

  it("never redirects what James kept, or any tool in the /tools registry", () => {
    expect(TOOL_HREFS.length).toBeGreaterThan(20);
    const redirected = [...KEPT, ...TOOL_HREFS].filter((u) => redirectFor(u)).map((u) => `${u} -> ${redirectFor(u)!.destination}`);
    expect(redirected).toEqual([]);
  });
});

describe("App.tsx", () => {
  it("answers every folded route with a client stub that makes the same move", () => {
    for (const [source, destination] of Object.entries(FOLDED)) {
      const component = ROUTE_COMPONENT.get(source);
      expect(component, source).toMatch(/Redirect$/);
      expect(STUB_TARGET.get(component!), source).toBe(destination);
    }
  });

  it("routes /speaking and /contact to real pages", () => {
    expect(ROUTE_COMPONENT.get("/speaking")).toBe("Speaking");
    expect(ROUTE_COMPONENT.get("/contact")).toBe("Contact");
  });

  it("keeps the route table above the smoke test's floor", () => {
    expect(ROUTES.length).toBeGreaterThan(200);
  });
});

describe("crawl surfaces", () => {
  it("the sitemap lists no redirect source, and lists the new pages", () => {
    const src = read("scripts/generate-sitemap.mjs");
    const block = src.slice(src.indexOf("const STATIC_PAGES = ["), src.indexOf("];", src.indexOf("const STATIC_PAGES = [")));
    const urls = Array.from(block.matchAll(/\{ url: "([^"]*)"/g), (m) => m[1]).filter(Boolean);
    expect(urls.filter((u) => redirectFor(u))).toEqual([]);
    for (const u of ["/study", "/speaking", "/contact", "/about", "/subscribe"]) expect(urls, u).toContain(u);
    const prefixes = Array.from(src.matchAll(/prefix: "([^"]+)"/g), (m) => m[1]);
    expect(prefixes.filter((p) => redirectFor(`${p}sample`))).toEqual([]);
  });

  it("prerendered heads are not written for redirect sources", () => {
    const src = read("scripts/prerender-heads.mjs");
    const block = src.slice(src.indexOf("const STATIC_PAGES = ["), src.indexOf("\n];", src.indexOf("const STATIC_PAGES = [")));
    const paths = Array.from(block.matchAll(/^ {4}path: "([^"]*)",$/gm), (m) => m[1]).filter(Boolean);
    expect(paths.length).toBeGreaterThan(10);
    expect(paths.filter((p) => redirectFor(p))).toEqual([]);
    const routes = Array.from(src.matchAll(/route: "([^"]+)"/g), (m) => m[1]);
    expect(routes.filter((r) => redirectFor(`${r}sample`))).toEqual([]);
  });

  it("llms.txt points only at live pages", () => {
    const urls = Array.from(read("client/public/llms.txt").matchAll(/https:\/\/www\.livewellbyjamesbell\.co(\/[^\s)]*)/g), (m) => m[1]);
    expect(urls.length).toBeGreaterThan(15);
    const bad = urls.filter((u) => {
      const file = path.join(ROOT, "client/public", u);
      if (fs.existsSync(file) && fs.statSync(file).isFile()) return false;
      return Boolean(redirectFor(u)) || !ROUTES.some((r) => sourceRegex(r).test(u));
    });
    expect(bad).toEqual([]);
    for (const u of ["/study", "/writing", "/books", "/resources", "/about", "/speaking", "/contact"]) expect(urls, u).toContain(u);
  });

  it("live pages link no folded page, so a reader never takes the extra hop", () => {
    // Routed pages (lazy-imported by App.tsx) and the shared components they
    // render. A link to a folded source lands one hop later, sometimes under
    // the wrong label; point it at the page the fold now lands on.
    const routed = new Set(Array.from(APP.matchAll(/import\("\.\/([^"]+)"\)/g), (m) => `client/src/${m[1]}`));
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const f of fs.readdirSync(path.join(ROOT, dir))) {
        const rel = `${dir}/${f}`;
        if (fs.statSync(path.join(ROOT, rel)).isDirectory()) walk(rel);
        else if (/\.tsx$/.test(f) && !/\.test\./.test(f)) files.push(rel);
      }
    };
    walk("client/src/components");
    walk("client/src/pages");
    const folded = new Set(Object.keys(FOLDED).filter((k) => !k.includes(":")));
    const hits: string[] = [];
    for (const rel of files) {
      if (rel.startsWith("client/src/pages/") && !routed.has(rel.replace(/\.tsx$/, ""))) continue;
      const src = read(rel);
      for (const m of src.matchAll(/href[=:]\s*\{?\s*["'`](\/[^"'`$\s?#]*)/g)) {
        if (folded.has(m[1])) hits.push(`${rel}: ${m[1]}`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("the nav links nothing that only redirects", () => {
    const links = [...SITE_NAV_GROUPS.flatMap((g) => g.links), HELP_LINK, LIBRARY_LINK, ...SEARCH_SHORTCUTS].filter((l) => l.href.startsWith("/"));
    expect(links.filter((l) => redirectFor(l.href)).map((l) => l.href)).toEqual([]);
  });

  it("never redirects a door James chose on 2026-10-26, or the page Resources folded from", () => {
    // Study, Topics, Family, Essays, About, and /resources, which stays live
    // as the one page of everything to use after its door folded.
    const doors = ["/study", "/topics", "/family", "/writing", "/about", "/books", "/resources"];
    expect(doors.filter((u) => redirectFor(u))).toEqual([]);
  });
});
