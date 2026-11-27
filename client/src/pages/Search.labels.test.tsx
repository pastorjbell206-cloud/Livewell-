/**
 * Search labels a hub page's result with the door or room it belongs to, by
 * its catalogue name, never with the index's builder word "Main Pages" (the
 * walk's polish, 2026-11-23; finding 6). Ranking is unchanged.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { DOORS, allEntries } from "@/lib/siteCatalog";
import { scoreEntry } from "@/lib/siteSearch";
import Search, { resultLabel } from "./Search";

const PUBLIC = path.resolve(__dirname, "../../public");
const INDEX = JSON.parse(fs.readFileSync(path.join(PUBLIC, "search-index.json"), "utf8"));
const HUBS: { title: string; href: string }[] = INDEX.sources.find((s: { label: string }) => s.label === "Main Pages").entries;
/** Every name the catalogue gives a door, a room or a page inside one. */
const NAMES = new Set([...DOORS.map((d) => d.name), ...allEntries().map((e) => e.name)]);
const FILM = HUBS.find((e) => e.href.startsWith("/study/explorer/watch/"))!;

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

describe("a hub page's search label", () => {
  it("is the name of its door or room from the catalogue, never 'Main Pages'", () => {
    for (const hub of HUBS) {
      const label = resultLabel({ sourceLabel: "Main Pages", href: hub.href });
      expect(label, hub.href).not.toBe("Main Pages");
      if (label) expect(NAMES.has(label), `${hub.href}: ${label}`).toBe(true);
    }
    // Paul's travels is listed inside the Bible door's room "Bible films"; a film sits in the Bible Explorer.
    expect(resultLabel({ sourceLabel: "Main Pages", href: "/study/explorer/pauls-travels" })).toBe("Bible films");
    expect(resultLabel({ sourceLabel: "Main Pages", href: FILM.href })).toBe("Bible Explorer");
    expect(resultLabel({ sourceLabel: "Main Pages", href: "/study/bible" })).toBe("Bible");
    // Beside the doors: no door, so no label.
    expect(resultLabel({ sourceLabel: "Main Pages", href: "/help" })).toBe("");
    // Every other library keeps its own name.
    expect(resultLabel({ sourceLabel: "Honest Answers", href: "/answers/does-god-actually-exist" })).toBe("Honest Answers");
  });

  it("does not change how results rank", () => {
    const entry = { title: "Paul's travels", blurb: "", keywords: "paul", sourceLabel: "Main Pages" };
    expect(scoreEntry(entry, "paul's travels")).toBeGreaterThan(scoreEntry({ ...entry, sourceLabel: "Bible Explorer" }, "paul's travels"));
  });

  it("shows on the search page", async () => {
    window.history.replaceState({}, "", `/search?q=${encodeURIComponent("Paul's travels")}`);
    const base = offlineFetch();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) =>
        String(input) === "/search-index.json"
          ? new Response(fs.readFileSync(path.join(PUBLIC, "search-index.json"), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } })
          : base(input, init),
      ),
    );
    renderWithProviders(<Search />);
    // Track sessions that open the map also name it, so find the map's own result by its address.
    const links = await screen.findAllByRole("link", { name: /Paul's travels/ }, { timeout: 8000 });
    const result = links.find((a) => a.getAttribute("href") === "/study/explorer/pauls-travels")!;
    expect(result).toBeTruthy();
    expect(within(result).getByText("Bible films")).toBeInTheDocument();
    expect(screen.queryByText("Main Pages")).toBeNull();
  });
});
