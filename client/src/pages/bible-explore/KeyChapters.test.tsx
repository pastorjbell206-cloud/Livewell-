/**
 * /study/key-chapters: every book's key chapters with the book's own reason,
 * narrowed by testament and by how much time a reader has; each opens its chapter.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { isKeyChapters, type KeyChaptersData } from "@/lib/bibleExplore";
import type { BookIntro } from "@/lib/bible-notes";
// @ts-expect-error a plain .mjs build library, read here to hold its rules
import { buildKeyChapters } from "../../../../scripts/lib/bible-explore.mjs";
import KeyChapters, { KeyChaptersView } from "./KeyChapters";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: KeyChaptersData = json("bible/explore/key-chapters.json");
const BOOKS: { slug: string; name: string; chapters: number }[] = json("bible/books.json");
const COUNT = DATA.books.reduce((n, b) => n + b.chapters.length, 0);
const rows = () => document.querySelectorAll(".bk-hard li").length;

afterEach(() => vi.unstubAllGlobals());

describe("the key chapters' data", () => {
  it("is what the build makes from the book pages today, and passes the page's guard", () => {
    expect(isKeyChapters(DATA)).toBe(true);
    const built = buildKeyChapters();
    expect(built.data).toEqual(DATA);
    expect(built.warnings).toEqual([]);
    expect(isKeyChapters({ ...DATA, books: [] })).toBe(false);
  });

  it("holds all 66 books, each with its own key chapters and reasons, word for word and in its own order", () => {
    expect(DATA.books.map((b) => b.slug)).toEqual(BOOKS.map((b) => b.slug));
    for (const b of DATA.books) {
      const intro: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      expect(b.chapters, b.slug).toEqual(intro.keyChapters.map((k) => ({ ch: k.ch, why: k.why })));
      expect(b.chapters.length, b.slug).toBeGreaterThan(0);
      const full = BOOKS.find((x) => x.slug === b.slug)!;
      for (const c of b.chapters) expect(c.ch >= 1 && c.ch <= full.chapters, `${b.slug} ${c.ch}`).toBe(true);
    }
  });
});

describe("the key chapters page", () => {
  it("lists every key chapter with its book's reason and the link that opens it", () => {
    renderWithProviders(<KeyChaptersView data={DATA} />);
    expect(rows()).toBe(COUNT);
    for (const li of Array.from(document.querySelectorAll(".bk-hard li"))) expect(li.querySelector("a")?.getAttribute("href")).toMatch(/^\/study\/bible\/[a-z0-9-]+\/\d+$/);
    const ruth = DATA.books.find((b) => b.slug === "ruth")!;
    const sec = document.getElementById("start-ruth")!.closest("section") as HTMLElement;
    for (const c of ruth.chapters) {
      expect(within(sec).getByRole("link", { name: `Ruth ${c.ch}` }).getAttribute("href")).toBe(`/study/bible/ruth/${c.ch}`);
      expect(within(sec).getByText(c.why)).toBeTruthy();
    }
    expect(screen.getByRole("link", { name: "Psalm 1" })).toBeTruthy();
    expect(within(screen.getByRole("navigation", { name: "Books" })).getAllByRole("link")).toHaveLength(66);
  });

  it("with time for one chapter shows the first each book lists, with three the first three, and says how many the book lists", () => {
    renderWithProviders(<KeyChaptersView data={DATA} />);
    fireEvent.click(screen.getByRole("button", { name: "One chapter" }));
    expect(rows()).toBe(66);
    const genesis = DATA.books[0];
    const sec = document.getElementById("start-genesis")!.closest("section") as HTMLElement;
    expect(within(sec).getByText(genesis.chapters[0].why)).toBeTruthy();
    expect(within(sec).getByText(`1 of the ${genesis.chapters.length} the Genesis page lists.`)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Three chapters" }));
    expect(rows()).toBe(DATA.books.reduce((n, b) => n + Math.min(3, b.chapters.length), 0));
    fireEvent.click(screen.getByRole("button", { name: "All listed" }));
    expect(rows()).toBe(COUNT);
    expect(screen.getByText(/in order through the book/)).toBeTruthy();
  });

  it("narrows to a testament", () => {
    renderWithProviders(<KeyChaptersView data={DATA} />);
    fireEvent.click(screen.getByRole("button", { name: "New Testament" }));
    expect(rows()).toBe(DATA.books.filter((b) => b.testament === "NT").reduce((n, b) => n + b.chapters.length, 0));
    expect(screen.getByRole("status").textContent).toContain(`of ${COUNT} key chapters`);
  });

  it("loads its file, and says so plainly when the file does not come", async () => {
    const answer = (body: unknown) =>
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/bible/explore/key-chapters.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
      );
    vi.stubGlobal("fetch", answer(DATA));
    const { unmount } = renderWithProviders(<KeyChapters />);
    expect(screen.getByRole("heading", { level: 1, name: "Where to start in every book" })).toBeTruthy();
    await waitFor(() => expect(screen.getByRole("button", { name: "One chapter" })).toBeTruthy());
    unmount();
    vi.stubGlobal("fetch", answer({ v: 1 }));
    renderWithProviders(<KeyChapters />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});
