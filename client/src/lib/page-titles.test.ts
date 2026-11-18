/**
 * One name per page. Six main pages get their search head from the curated
 * table in scripts/prerender-heads.mjs and their browser title from the page's
 * own SEOMeta. When the two differ, a search engine picks one and the reader
 * sees the other, so the strings are held equal here.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { capDescription } from "@/components/SEOMeta";
import SEARCH_TITLES from "./searchTitles.json";

const ROOT = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const prerender = read("scripts/prerender-heads.mjs");

/** The curated title for a path in STATIC_PAGES. */
function staticTitle(routePath: string): string | null {
  const m = prerender.match(new RegExp(`path: "${routePath}",\\s*title: "([^"]+)"`));
  return m ? m[1] : null;
}

const PAGES: [route: string, file: string][] = [
  ["", "client/src/pages/Home.tsx"],
  ["/about", "client/src/pages/About.tsx"],
  ["/books", "client/src/pages/Books.tsx"],
  ["/connect", "client/src/pages/Connect.tsx"],
  ["/tools", "client/src/pages/ToolsHub.tsx"],
  ["/nation", "client/src/pages/nation/NationHub.tsx"],
  ["/writing", "client/src/pages/Writing.tsx"],
];

describe("page titles", () => {
  it.each(PAGES)("%s has one title in the browser and in search", (route, file) => {
    const title = staticTitle(route);
    expect(title, route).toBeTruthy();
    expect(read(file), file).toContain(`"${title}"`);
  });

  it("gives the home page the same title before the app loads", () => {
    expect(read("client/index.html")).toContain(`<title>${staticTitle("")}</title>`);
  });

  it("keeps the curated titles within what a search result shows", () => {
    // A page whose headline is its own question or essay title takes its
    // search title from lib/searchTitles.json instead.
    for (const m of prerender.matchAll(/path: "([^"]*)",\s*title: "([^"]+)",/g)) {
      const title = (SEARCH_TITLES as Record<string, string>)[m[1]] ?? m[2];
      const full = /James Bell|LiveWell/.test(title) ? title : `${title} | LiveWell`;
      expect(full.length, full).toBeLessThanOrEqual(60);
    }
    for (const title of Object.values(SEARCH_TITLES)) expect(`${title} | LiveWell`.length, title).toBeLessThanOrEqual(60);
  });

  it("ends every search title with the short name, in both head builders", () => {
    expect(prerender).toContain('const TITLE_SUFFIX = "LiveWell";');
    expect(read("client/src/components/SEOMeta.tsx")).toContain('const TITLE_SUFFIX = "LiveWell";');
  });
});

describe("capDescription", () => {
  it("leaves a short description alone", () => {
    expect(capDescription("One plain sentence.")).toBe("One plain sentence.");
  });

  it("cuts a long one back to its last whole sentence that fits", () => {
    const first = "This study is for the small group that wants to learn to pray and does not know where to begin.";
    const out = capDescription(`${first} ${"It walks slowly through five sessions on the prayer. ".repeat(4)}`);
    expect(out.length).toBeLessThanOrEqual(155);
    expect(out.startsWith(first)).toBe(true);
    expect(out.endsWith(".")).toBe(true);
  });

  it("cuts one long sentence at a whole word", () => {
    const out = capDescription(`${"word ".repeat(60)}end`);
    expect(out.length).toBeLessThanOrEqual(155);
    expect(out.endsWith("word…")).toBe(true);
  });
});
