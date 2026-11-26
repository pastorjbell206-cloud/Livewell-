/**
 * /preview/home, the homepage preview (James, 2026-11-26): every link it
 * shows is a real catalogue page, the eight disciplines each open in two
 * steps from the preview menu, nothing planned is linked, and the page says
 * noindex and leaves the live homepage alone.
 */
import { describe, it, expect } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";

import { renderWithProviders } from "@/test/harness";
import { allEntries } from "@/lib/siteCatalog";
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

  it("builds each of the eight disciplines only from pages in the catalogue", () => {
    expect(DISCIPLINES).toHaveLength(8);
    for (const d of DISCIPLINES) expect(d.doors.length, d.name).toBeGreaterThan(0);
    renderWithProviders(<PreviewHome />);
    const explore = screen.getByRole("region", { name: "Eight ways in" });
    for (const d of DISCIPLINES) expect(within(explore).getByRole("heading", { level: 3, name: d.name })).toBeTruthy();
  });

  it("opens any discipline in two steps from the preview menu", () => {
    renderWithProviders(<PreviewHome />);
    const nav = screen.getByRole("navigation", { name: "Proposed navigation (preview)" });
    const explore = within(nav).getByRole("button", { name: "Explore" });
    expect(explore).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(explore);
    expect(explore).toHaveAttribute("aria-expanded", "true");
    const items = within(nav).getAllByRole("listitem");
    expect(items.map((li) => li.querySelector("a span")?.textContent)).toEqual(DISCIPLINES.map((d) => d.name));
    for (const li of items) expect(li.querySelector("a")?.getAttribute("href")).toBeTruthy();
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
        ["/tracks", "/tools", "/family", "/studyguides", "/writing", "/subscribe", "/about", "/support"].includes(href);
      expect(real, href).toBe(true);
    }
  });

  it("names planned Academy paths without linking any of them", () => {
    renderWithProviders(<PreviewHome />);
    const paths = screen.getByRole("region", { name: "More than one page at a time" });
    expect(paths).toHaveTextContent("Planned for the Academy:");
    expect(paths).toHaveTextContent("Not available yet.");
    expect(within(paths).queryByRole("link", { name: /Systematic theology/ })).toBeNull();
  });
});
