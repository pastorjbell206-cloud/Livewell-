/**
 * /study/themes: every book's themes with the book's own paragraph, whole;
 * themes are joined only where books give them the same title.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { isThemes, type ThemesData } from "@/lib/bibleExplore";
import type { BookIntro } from "@/lib/bible-notes";
// @ts-expect-error a plain .mjs build library, read here to hold its rules
import { buildThemes } from "../../../../scripts/lib/bible-explore.mjs";
import BibleThemes, { ThemesView, letterOf } from "./BibleThemes";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: ThemesData = json("bible/explore/themes.json");
const BOOKS: { slug: string; name: string }[] = json("bible/books.json");
const cards = () => document.querySelectorAll(".bx-theme").length;

afterEach(() => vi.unstubAllGlobals());

describe("the themes' data", () => {
  it("is what the build makes from the book pages today, and passes the page's guard", () => {
    expect(isThemes(DATA)).toBe(true);
    expect(buildThemes().data).toEqual(DATA);
    expect(isThemes({ ...DATA, themes: [] })).toBe(false);
    expect(new Set(DATA.themes.map((t) => t.id)).size).toBe(DATA.themes.length);
  });

  it("holds every theme of all 66 books once, with the book's own paragraph whole", () => {
    let n = 0;
    for (const b of BOOKS) {
      const intro: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      expect(intro.themes.length, b.slug).toBeGreaterThan(0);
      for (const t of intro.themes) {
        const hits = DATA.themes.filter((x) => x.entries.some((e) => e.book === b.slug && e.body === t.body && (e.title ?? x.title) === t.title));
        expect(hits, `${b.slug}: ${t.title}`).toHaveLength(1);
      }
      n += intro.themes.length;
    }
    expect(DATA.themes.reduce((t, x) => t + x.entries.length, 0)).toBe(n);
    expect(DATA.books).toHaveLength(66);
  });

  it("joins themes only where the books give them the same title, and never joins their words", () => {
    for (const t of DATA.themes) {
      for (const e of t.entries) expect((e.title ?? t.title).trim().toLowerCase(), t.title).toBe(t.title.trim().toLowerCase());
      // One book, one paragraph under a title.
      expect(new Set(t.entries.map((e) => e.book)).size, t.title).toBe(t.entries.length);
    }
    const day = DATA.themes.find((t) => t.title.toLowerCase() === "the day of the lord")!;
    expect(day.entries.length).toBeGreaterThan(1);
    expect(new Set(day.entries.map((e) => e.body)).size).toBe(day.entries.length);
    expect(letterOf(day.title)).toBe("D");
  });
});

describe("the themes page", () => {
  it("lists every theme once, each book's paragraph under it with the way to the book", () => {
    renderWithProviders(<ThemesView data={DATA} />);
    expect(cards()).toBe(DATA.themes.length);
    const day = DATA.themes.find((t) => t.title.toLowerCase() === "the day of the lord")!;
    const card = document.getElementById(day.id)!;
    expect(within(card).getAllByRole("heading", { level: 3 })).toHaveLength(1);
    for (const e of day.entries) {
      expect(within(card).getByText(e.body)).toBeTruthy();
      const name = BOOKS.find((b) => b.slug === e.book)!.name;
      expect(within(card).getByRole("link", { name }).getAttribute("href")).toBe(`/study/bible/${e.book}`);
    }
    // Sorted by the alphabet alone: every letter heading has its themes.
    const letters = Array.from(new Set(DATA.themes.map((t) => letterOf(t.title))));
    expect(within(screen.getByRole("navigation", { name: "Jump to a letter" })).getAllByRole("link")).toHaveLength(letters.length);
    for (const l of letters) expect(document.getElementById(`themes-${l}`)).toBeTruthy();
  });

  it("finds a theme by its title, a word of its paragraph, or a book", () => {
    renderWithProviders(<ThemesView data={DATA} />);
    fireEvent.change(screen.getByLabelText("Find a theme"), { target: { value: "day of the lord" } });
    expect(Array.from(document.querySelectorAll(".bx-theme h3")).map((h) => h.textContent?.toLowerCase())).toContain("the day of the lord");
    expect(cards()).toBeLessThan(40);
    fireEvent.change(screen.getByLabelText("Find a theme"), { target: { value: "obadiah" } });
    expect(cards()).toBeGreaterThanOrEqual(json("bible/notes/obadiah/intro.json").themes.length);
    fireEvent.change(screen.getByLabelText("Find a theme"), { target: { value: "zzzz" } });
    expect(screen.getByText(/No theme matches that/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Show every theme" }));
    expect(cards()).toBe(DATA.themes.length);
  });

  it("narrows to a testament, and a shared theme keeps only that testament's books", () => {
    renderWithProviders(<ThemesView data={DATA} />);
    fireEvent.click(screen.getByRole("button", { name: "New Testament" }));
    const nt = new Set(DATA.books.filter((b) => b.testament === "NT").map((b) => b.slug));
    expect(cards()).toBe(DATA.themes.filter((t) => t.entries.some((e) => nt.has(e.book))).length);
    const day = DATA.themes.find((t) => t.title.toLowerCase() === "the day of the lord")!;
    expect(document.getElementById(day.id)!.querySelectorAll(".bx-word__entry")).toHaveLength(day.entries.filter((e) => nt.has(e.book)).length);
  });

  it("loads its file, and says so plainly when the file does not come", async () => {
    const answer = (body: unknown) =>
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/bible/explore/themes.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
      );
    vi.stubGlobal("fetch", answer(DATA));
    const { unmount } = renderWithProviders(<BibleThemes />);
    expect(screen.getByRole("heading", { level: 1, name: "Themes of the Bible" })).toBeTruthy();
    await waitFor(() => expect(screen.getByLabelText("Find a theme")).toBeTruthy());
    unmount();
    vi.stubGlobal("fetch", answer({ v: 1 }));
    renderWithProviders(<BibleThemes />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});
