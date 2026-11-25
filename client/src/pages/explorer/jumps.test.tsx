/**
 * The Bible Explorer's front page runs to about 37 phone screens. A short
 * list at its top goes to each of its parts by the part's own heading, the
 * films first, and every link lands on its section, clear of the sticky
 * header (the walk's polish, 2026-11-23). Nothing on the page is moved or
 * removed. Rendered from the real data files.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, within, cleanup } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch, untilDrawn } from "@/test/harness";
import ExplorerMap, { JUMPS } from "./ExplorerMap";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");

function serve() {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (name.startsWith("explorer/") && fs.existsSync(path.join(PUBLIC, name))) {
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return base(input, init);
    }),
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("the Explorer's jump list", () => {
  it("comes first, lists the films first, and names each part by its own heading", async () => {
    serve();
    window.history.pushState({}, "", "/study/explorer");
    renderWithProviders(<ExplorerMap />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual(["Watch and learn", "The map", "What the Explorer holds", "Why we believe", "For parents and leaders"]);

    // Before the map, at the top of the page.
    const mapHeading = screen.getByRole("heading", { level: 2, name: /^The map/ });
    expect(nav.compareDocumentPosition(mapHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    // Once the parts have drawn, each link lands on a part whose heading starts with the link's words.
    // The films' section is drawn in a later slice: let each turn finish inside
    // act until it is there, rather than racing a clock on a busy machine.
    await untilDrawn(() => document.getElementById("watch") !== null);
    expect(document.getElementById("watch")).not.toBeNull();
    for (const j of JUMPS) {
      const target = document.getElementById(j.href.slice(1))!;
      expect(target, j.href).not.toBeNull();
      const heading = target.matches("h2") ? target : target.querySelector("h2")!;
      expect(heading.textContent!.startsWith(j.label), `${j.href}: ${heading.textContent}`).toBe(true);
      // Clear of the sticky header: a heading with the Explorer's scroll margin, or the films' whole section.
      expect(target.classList.contains("ex-anchor") || target.id === "watch", j.href).toBe(true);
    }
  });

  it("is 44 px a link, like every other control on the page", () => {
    const css = fs.readFileSync(path.resolve(__dirname, "explorer.css"), "utf8").replace(/\s+/g, " ");
    const rule = css.slice(css.indexOf(".ex-holds__jump a {"), css.indexOf("}", css.indexOf(".ex-holds__jump a {")));
    expect(rule).toContain("min-height: 44px");
  });
});
