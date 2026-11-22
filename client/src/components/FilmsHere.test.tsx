/**
 * FilmsHere: the Bible Explorer's moving pictures offered on a page outside
 * the Explorer. Which films is never typed into a page: it comes from each
 * film's own links, turned round by scripts/build-explorer-index.mjs into
 * client/public/explorer/film-links.json. The tests read the real file.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import FilmsHere, { forgetFilmLinks } from "./FilmsHere";

const PUBLIC = path.resolve(__dirname, "../../public");
const LINKS = JSON.parse(
  fs.readFileSync(path.join(PUBLIC, "explorer/film-links.json"), "utf8")
) as {
  films: Record<string, { title: string; line: string }>;
  pages: Record<string, string[]>;
};
const filmFile = (slug: string) =>
  JSON.parse(
    fs.readFileSync(path.join(PUBLIC, `explorer/films/${slug}.json`), "utf8")
  );

beforeEach(() => {
  forgetFilmLinks();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const name = String(input).replace(/^\//, "");
      if (fs.existsSync(path.join(PUBLIC, name)))
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      return new Response("not found", { status: 404 });
    })
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("FilmsHere", () => {
  it("offers the films that point at this page, each by its own title", async () => {
    const page = "/study/bible/doctrines/atonement";
    render(<FilmsHere path={page} />);
    await waitFor(() =>
      expect(screen.getByText("Watch and learn")).toBeTruthy()
    );
    const hrefs = screen.getAllByRole("link").map(a => a.getAttribute("href"));
    expect(hrefs).toEqual(
      LINKS.pages[page].map(s => `/study/explorer/watch/${s}`)
    );
    expect(hrefs).toContain("/study/explorer/watch/why-blood");
    expect(screen.getByText("Sacrifice: why blood?")).toBeTruthy();
  });

  it("shows nothing on a page no film points at, and nothing if the file cannot be read", async () => {
    const { container } = render(<FilmsHere path="/answers/no-such-answer" />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container.innerHTML).toBe("");
    cleanup();
    forgetFilmLinks();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("no", { status: 500 }))
    );
    const again = render(<FilmsHere path="/study/bible/doctrines/atonement" />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(again.container.innerHTML).toBe("");
  });

  it("the file is each film's own links turned round: answers, questions, doctrine studies and wisdom topics only", () => {
    for (const [page, slugs] of Object.entries(LINKS.pages)) {
      expect(page).toMatch(
        /^\/(answers|questions\/[a-z0-9-]+|study\/bible\/doctrines|wisdom)\/[a-z0-9-]+$/
      );
      for (const slug of slugs) {
        const film = filmFile(slug);
        const out = [
          ...(film.deeper ?? []),
          ...(film.differ?.links ?? []),
          film.end,
        ].map((l: { href: string }) => l.href.replace(/[#?].*$/, ""));
        expect(out, `${slug} on ${page}`).toContain(page);
        expect(LINKS.films[slug].title).toBe(film.title);
      }
    }
    // The new films are offered beyond the Explorer.
    expect(LINKS.pages["/wisdom/suffering"]).toContain("romans-8-28");
    expect(LINKS.pages["/answers/is-faith-irrational"]).toContain("faith");
    expect(LINKS.pages["/study/bible/doctrines/salvation"]).toContain("grace");
  });
});
