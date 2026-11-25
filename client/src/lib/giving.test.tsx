/**
 * The Support page HELD (the one switch in lib/giving.json is off): /support
 * is in no menu, the footer, the catalogue, the sitemap, the search index or
 * llms.txt, and its prerendered head says noindex. The switch file is
 * replaced by a held one here; giving-open.test.tsx holds the reverse.
 *
 * The last block reads the files as committed, whichever state they are in,
 * and checks that they agree with the committed switch.
 */
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

vi.mock("./giving.json", () => ({
  default: { open: false, recipientLine: "Held.", taxLine: "Held." },
}));

import { renderWithProviders, offlineFetch } from "@/test/harness";
import Footer from "@/components/Footer";
import { GIVING, SUPPORT_PATH, SUPPORT_ROOM, isPlaceholderLine, supportRooms } from "./giving";
import { DOORS, allEntries, doorForPath } from "./siteCatalog";
import { SITE_NAV_GROUPS, SEARCH_SHORTCUTS } from "./siteNav";
import { SUPPORT_HEAD, givingOpen, llmsWithSupport, supportNoindex, supportSearchPages, supportSitemapPages } from "../../../scripts/lib/giving.mjs";

const ROOT = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

describe("the Support page, held", () => {
  it("is in no door, room, menu or shortcut", () => {
    expect(GIVING.open).toBe(false);
    expect(supportRooms(false)).toEqual([]);
    expect(allEntries().some((e) => e.href.startsWith(SUPPORT_PATH))).toBe(false);
    expect(SITE_NAV_GROUPS.flatMap((g) => g.links).some((l) => l.href.startsWith(SUPPORT_PATH))).toBe(false);
    expect(SEARCH_SHORTCUTS.some((l) => l.href.startsWith(SUPPORT_PATH))).toBe(false);
    expect(doorForPath(SUPPORT_PATH)).toBeNull();
    const about = DOORS.find((d) => d.id === "about")!;
    expect(about.rooms.map((r) => r.id)).toEqual(["about.books", "about.speaking", "about.connect", "about.contact", "about.subscribe"]);
  });

  it("is not in the footer", () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    renderWithProviders(<Footer />);
    expect(screen.getAllByRole("link", { name: "Subscribe" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: SUPPORT_ROOM.name })).not.toBeInTheDocument();
    expect(document.querySelector(`a[href^="${SUPPORT_PATH}"]`)).toBeNull();
    vi.unstubAllGlobals();
  });

  it("is out of the sitemap, the search index and llms.txt, and its static head says noindex", () => {
    expect(supportSitemapPages(false)).toEqual([]);
    expect(supportSearchPages(false)).toEqual([]);
    expect(supportNoindex(false)).toBe(true);
    const llms = read("client/public/llms.txt");
    expect(llmsWithSupport(llms, false)).toBe(llms);
  });
});

describe("the placeholder guard", () => {
  it("knows an unfilled template from a real line", () => {
    expect(isPlaceholderLine("Who receives gifts has not been confirmed yet.")).toBe(true);
    expect(isPlaceholderLine("Gifts go to [ORGANIZATION NAME], for the work of LiveWell.")).toBe(true);
    expect(isPlaceholderLine("  ")).toBe(true);
    expect(isPlaceholderLine("Gifts go to James Bell personally, to keep the work of LiveWell going.")).toBe(false);
  });
});

describe("the committed files agree with the committed switch", () => {
  const facts = JSON.parse(read("client/src/lib/giving.json")) as { open: boolean; recipientLine: string; taxLine: string };
  const open = facts.open === true;

  it("the build reads the same switch", () => {
    expect(givingOpen()).toBe(open);
  });

  it("the two lines are real sentences, never an unfilled template, in either state", () => {
    expect(isPlaceholderLine(facts.recipientLine), "recipientLine is empty or a template: see docs/work/elite/giving.md").toBe(false);
    expect(isPlaceholderLine(facts.taxLine), "taxLine is empty or a template: see docs/work/elite/giving.md").toBe(false);
  });

  it("says what James said on 2026-11-21 and 2026-11-25: gifts go to him personally, what is left after the costs plants churches, and a gift is not tax-deductible", () => {
    expect(facts.recipientLine).toBe("Gifts go to James Bell personally. They pay what LiveWell costs to run, and whatever is left goes to planting churches around the world through the Ends Initiative and Gather Church.");
    expect(facts.taxLine).toBe("A gift is not tax-deductible.");
  });

  it("the committed search index holds /support only when giving is open", () => {
    const index = read("client/public/search-index.json");
    expect(index.includes(`"${SUPPORT_PATH}"`), "run `pnpm run search:index` after turning the switch").toBe(open);
  });

  it("the committed llms.txt never names /support (the build adds the line when giving is open)", () => {
    expect(read("client/public/llms.txt")).not.toContain(`${SUPPORT_PATH}`);
  });

  it("no page, menu or redirect in the source links to /support while it is held", () => {
    if (open) return;
    const walk = (dir: string): string[] =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
    const OWN = new Set(["pages/Support.tsx", "pages/SupportThanks.tsx", "pages/Support.test.tsx", "lib/giving.ts", "lib/giving.json", "lib/giving.test.tsx", "lib/giving-open.test.tsx", "App.tsx"]);
    const src = path.join(ROOT, "client/src");
    const linking = walk(src)
      .filter((f) => /\.(tsx?|json)$/.test(f) && !OWN.has(path.relative(src, f)))
      .filter((f) => /["'`(]\/support(["'`/?#)]|$)/m.test(fs.readFileSync(f, "utf8")))
      .map((f) => path.relative(src, f));
    expect(linking).toEqual([]);
    expect(read("vercel.json")).not.toContain('"/support');
    expect(read("client/index.html")).not.toContain("/support");
  });

  it("the prerendered head is the page's own title and description", () => {
    const page = read("client/src/pages/Support.tsx");
    expect(page).toContain(`title="${SUPPORT_HEAD.title}"`);
    expect(page).toContain(`description="${SUPPORT_HEAD.description}"`);
    expect(page).toContain("noindex={!facts.open}");
  });
});
