/**
 * /preview/home, the homepage preview (James, 2026-11-26): every link it
 * shows is a real page, the eight disciplines open as an atlas (one at a
 * time, by click or by arrow key) and from the preview menu, nothing planned
 * is linked, and the page says noindex and leaves the live homepage alone.
 */
import { describe, it, expect } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";

import { renderWithProviders } from "@/test/harness";
import { allEntries } from "@/lib/siteCatalog";
import { HOME_WHY } from "@/lib/positioning";
import PreviewHome, { DISCIPLINES } from "./PreviewHome";

const CATALOGUE = new Set(allEntries().map((e) => e.href));

describe("/preview/home", () => {
  it("says it is a preview, links the live homepage, and is never indexed", () => {
    renderWithProviders(<PreviewHome />);
    expect(screen.getByRole("note")).toHaveTextContent("This is a preview for review. The live homepage is unchanged.");
    expect(within(screen.getByRole("note")).getByRole("link", { name: "See the live homepage" })).toHaveAttribute("href", "/");
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, follow");
    expect(screen.getByRole("heading", { level: 1, name: "Know what you believe. Understand why. Learn to live it." })).toBeTruthy();
  });

  it("opens each of the eight disciplines in the atlas, one at a time, by click or arrow key", () => {
    expect(DISCIPLINES).toHaveLength(8);
    for (const d of DISCIPLINES) expect(d.doors.length, d.name).toBeGreaterThan(0);
    renderWithProviders(<PreviewHome />);
    const atlas = screen.getByRole("region", { name: "Eight ways in" });
    const tabs = within(atlas).getAllByRole("tab");
    expect(tabs.map((t) => t.querySelector(".pv-atlas__tn")?.textContent)).toEqual(DISCIPLINES.map((d) => d.name));
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    DISCIPLINES.forEach((d, i) => {
      fireEvent.click(tabs[i]);
      const panel = within(atlas).getByRole("tabpanel");
      expect(within(panel).getByRole("heading", { level: 3, name: d.name })).toBeTruthy();
      expect(within(panel).getAllByRole("listitem")).toHaveLength(d.doors.length);
    });
    fireEvent.keyDown(tabs[7], { key: "ArrowDown" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tabs[0], { key: "End" });
    expect(tabs[7]).toHaveAttribute("aria-selected", "true");
  });

  it("lists the eight disciplines from the preview menu", () => {
    renderWithProviders(<PreviewHome />);
    const nav = screen.getByRole("navigation", { name: "Proposed navigation (preview)" });
    const explore = within(nav).getByRole("button", { name: "Explore" });
    expect(explore).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(explore);
    expect(explore).toHaveAttribute("aria-expanded", "true");
    const items = within(nav).getAllByRole("listitem");
    expect(items.map((li) => li.querySelector(".pv-nav__dn")?.textContent)).toEqual(DISCIPLINES.map((d) => d.name));
    expect(items.map((li) => li.querySelector("a")?.getAttribute("href"))).toEqual(DISCIPLINES.map((d) => `#atlas-${d.id}`));
  });

  it("links only to real pages: catalogue entries, tracks, essays on the shelf and the shelf books", () => {
    renderWithProviders(<PreviewHome />);
    // The page's own links (the site's header and footer are the live ones, unchanged).
    const hrefs = Array.from(document.querySelectorAll("main a[href]")).map((a) => a.getAttribute("href")!);
    expect(hrefs.length).toBeGreaterThan(40);
    for (const href of hrefs) {
      const real =
        CATALOGUE.has(href) ||
        href === "/" ||
        href.startsWith("#") ||
        /^\/tracks\/[a-z-]+$/.test(href) ||
        /^\/writing\/[a-z0-9-]+$/.test(href) ||
        /^\/books\/[a-z-]+$/.test(href) ||
        /^\/start#[a-z-]+$/.test(href) ||
        ["/tracks", "/tools", "/family", "/studyguides", "/writing", "/subscribe", "/about", "/support", "/explore", "/help", "/help/doubt", "/study/films", "/study/bible", "/theology/history"].includes(href);
      expect(real, href).toBe(true);
    }
  });

  it("sets James's own words large, and adds none to them", () => {
    renderWithProviders(<PreviewHome />);
    const why = screen.getByRole("region", { name: "Why LiveWell exists" });
    const said = Array.from(why.querySelectorAll("p")).map((p) => p.textContent).join(" ");
    expect(said.length).toBeGreaterThan(80);
    expect(HOME_WHY.startsWith(said)).toBe(true);
  });

  it("names planned Academy paths without linking any of them", () => {
    renderWithProviders(<PreviewHome />);
    const paths = screen.getByRole("region", { name: "More than one page at a time" });
    expect(paths).toHaveTextContent("Planned for the Academy");
    expect(paths).toHaveTextContent("Not available yet.");
    expect(within(paths).queryByRole("link", { name: /Systematic theology/ })).toBeNull();
  });
});
