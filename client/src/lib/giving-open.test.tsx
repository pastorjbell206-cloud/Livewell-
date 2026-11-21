/**
 * The Support page OPEN (the one switch in lib/giving.json turned on): the
 * reverse of giving.test.tsx. With nothing else edited, /support is the About
 * door's sixth room (so the header panel, the phone menu, the footer beside
 * Subscribe, /explore and the About page all list it), and the build lists it
 * in the sitemap, the search index and llms.txt and drops the noindex.
 *
 * The switch file is replaced by an open one here, so this holds whatever is
 * committed.
 */
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

vi.mock("./giving.json", () => ({
  default: { open: true, recipientLine: "Gifts go to a recipient named for the test.", taxLine: "A tax line for the test." },
}));

import { renderWithProviders, offlineFetch } from "@/test/harness";
import Footer from "@/components/Footer";
import { GIVING, SUPPORT_PATH, SUPPORT_ROOM, supportRooms } from "./giving";
import { DOORS, allEntries, doorForPath, entryById, nameForHref } from "./siteCatalog";
import { SITE_NAV_GROUPS } from "./siteNav";
import { trailFor } from "./pagePlace";
import { ICONS } from "./siteIcons";
import { llmsWithSupport, supportNoindex, supportSearchPages, supportSitemapPages } from "../../../scripts/lib/giving.mjs";

const ROOT = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

describe("the Support page, open", () => {
  it("is the About door's sixth room, after Subscribe, and six or fewer still holds", () => {
    expect(GIVING.open).toBe(true);
    expect(supportRooms(true)).toEqual([SUPPORT_ROOM]);
    const about = DOORS.find((d) => d.id === "about")!;
    expect(about.rooms.map((r) => r.id)).toEqual(["about.books", "about.speaking", "about.connect", "about.contact", "about.subscribe", "about.support"]);
    for (const d of DOORS) expect(d.rooms.length, d.name).toBeLessThanOrEqual(6);
    expect(entryById("about.support")).toMatchObject({ name: "Support this work", href: SUPPORT_PATH });
    expect(nameForHref(SUPPORT_PATH)).toBe("Support this work");
    expect(doorForPath(SUPPORT_PATH)).toBe("about");
    expect(doorForPath("/support/thanks")).toBe("about");
    expect(trailFor(SUPPORT_PATH)).toBeTruthy();
    expect(ICONS[SUPPORT_ROOM.icon]).toBeTruthy();
    const ids = allEntries().map((e) => e.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("is in the header's About menu", () => {
    const about = SITE_NAV_GROUPS.find((g) => g.title === "About")!;
    expect(about.links.at(-1)).toMatchObject({ label: "Support this work", href: SUPPORT_PATH, primary: true });
  });

  it("is in the footer, beside Subscribe", () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    renderWithProviders(<Footer />);
    const link = screen.getByRole("link", { name: "Support this work" });
    expect(link).toHaveAttribute("href", SUPPORT_PATH);
    const before = link.previousElementSibling;
    expect(before).toHaveTextContent("Subscribe");
    expect(before).toHaveAttribute("href", "/subscribe");
    vi.unstubAllGlobals();
  });

  it("is in the sitemap and the search index, and its static head drops noindex", () => {
    expect(supportSitemapPages(true)).toEqual([{ url: SUPPORT_PATH, priority: "0.5", changefreq: "monthly" }]);
    const [found] = supportSearchPages(true);
    expect(found).toMatchObject({ title: "Support this work", href: SUPPORT_PATH });
    expect(found.keywords).toMatch(/give/);
    expect(supportNoindex(true)).toBe(false);
  });

  it("is added to llms.txt after the newsletter, once", () => {
    const llms = read("client/public/llms.txt");
    const out = llmsWithSupport(llms, true);
    expect(out).toContain("https://www.livewellbyjamesbell.co/support");
    expect(out.indexOf("/subscribe\n- Support this work")).toBeGreaterThan(0);
    expect(out.length).toBeGreaterThan(llms.length);
    expect(llmsWithSupport(out, true)).toBe(out);
    // Nothing else in the file moves.
    expect(out.replace(/- Support this work[^\n]*\n[^\n]*\n/, "")).toBe(llms);
  });
});
