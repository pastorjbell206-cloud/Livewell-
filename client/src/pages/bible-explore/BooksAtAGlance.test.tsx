/**
 * /study/books-at-a-glance: all 66 books, each drawn from its own outline,
 * word for word; every part opens the chapter it starts at.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { isGlance, type GlanceData } from "@/lib/bibleExplore";
import type { BookIntro } from "@/lib/bible-notes";
import { outlineBand } from "../study-bible/bookFacts";
// @ts-expect-error a plain .mjs build library, read here to hold its rules
import { buildGlance } from "../../../../scripts/lib/bible-explore.mjs";
import BooksAtAGlance, { GlanceView } from "./BooksAtAGlance";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: GlanceData = json("bible/explore/books-at-a-glance.json");
const BOOKS: { slug: string; name: string; chapters: number }[] = json("bible/books.json");
const COUNT = DATA.books.reduce((n, b) => n + b.parts.length, 0);

afterEach(() => vi.unstubAllGlobals());

describe("the glance's data", () => {
  it("is what the build makes from the book pages today, and passes the page's guard", () => {
    expect(isGlance(DATA)).toBe(true);
    const built = buildGlance();
    expect(built.data).toEqual(DATA);
    expect(built.warnings).toEqual([]);
    expect(isGlance({ ...DATA, books: [] })).toBe(false);
  });

  it("holds all 66 books, each with its own outline word for word, and every outline can be drawn", () => {
    expect(DATA.books.map((b) => b.slug)).toEqual(BOOKS.map((b) => b.slug));
    for (const b of DATA.books) {
      const intro: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      expect(b.parts, b.slug).toEqual(intro.structure.map((p) => ({ range: p.range, title: p.title, summary: p.summary })));
      const band = outlineBand(b.parts, b.chapters);
      expect(band.length, b.slug).toBe(b.parts.length);
      expect(band.length, b.slug).toBeGreaterThan(0);
      // The parts fill the band, and each opens a chapter the book has.
      expect(Math.abs(band.reduce((n, p) => n + p.share, 0) - 1), b.slug).toBeLessThan(0.001);
      for (const p of band) expect(p.chapter >= 1 && p.chapter <= b.chapters, `${b.slug} ${p.range}`).toBe(true);
    }
  });
});

describe("the glance page", () => {
  it("draws a band for every book, a part as wide as its share, and lists every part with its title and summary", () => {
    renderWithProviders(<GlanceView data={DATA} />);
    expect(document.querySelectorAll(".bx-glance")).toHaveLength(66);
    expect(document.querySelectorAll(".bx-glance__band a")).toHaveLength(COUNT);
    expect(document.querySelectorAll(".bx-glance__parts li")).toHaveLength(COUNT);
    const genesis = DATA.books[0];
    const sec = document.getElementById("glance-genesis")!.closest("section") as HTMLElement;
    const band = Array.from(sec.querySelectorAll<HTMLAnchorElement>(".bx-glance__band a"));
    const shares = outlineBand(genesis.parts, genesis.chapters).map((p) => p.share * 1000);
    expect(band.map((a) => Number(a.style.flexGrow))).toEqual(shares);
    for (const p of genesis.parts) {
      expect(within(sec).getByRole("link", { name: p.title })).toBeTruthy();
      expect(within(sec).getByText(p.summary)).toBeTruthy();
    }
  });

  it("opens the chapter a part starts at, from the band and from the list alike; the list is the keyboard's way", () => {
    renderWithProviders(<GlanceView data={DATA} />);
    const sec = document.getElementById("glance-genesis")!.closest("section") as HTMLElement;
    const band = Array.from(sec.querySelectorAll<HTMLAnchorElement>(".bx-glance__band a"));
    const list = within(within(sec).getByRole("list", { name: "The parts of Genesis" })).getAllByRole("link");
    expect(band.map((a) => a.getAttribute("href"))).toEqual(list.map((a) => a.getAttribute("href")));
    expect(list[0].getAttribute("href")).toBe("/study/bible/genesis/1");
    expect(list[1].getAttribute("href")).toBe("/study/bible/genesis/2#v4");
    // The drawing is kept out of the tab order and the reading order; the list carries both.
    expect(sec.querySelector(".bx-glance__band")!.getAttribute("aria-hidden")).toBe("true");
    for (const a of band) expect(a.tabIndex).toBe(-1);
    // A one-chapter book counts in verses.
    const jude = document.getElementById("glance-jude")!.closest("section") as HTMLElement;
    for (const a of within(within(jude).getByRole("list", { name: "The parts of Jude" })).getAllByRole("link")) expect(a.getAttribute("href")).toMatch(/^\/study\/bible\/jude\/1(#v\d+)?$/);
  });

  it("narrows to a testament", () => {
    renderWithProviders(<GlanceView data={DATA} />);
    fireEvent.click(screen.getByRole("button", { name: "New Testament" }));
    expect(document.querySelectorAll(".bx-glance")).toHaveLength(27);
    expect(screen.queryByRole("heading", { level: 2, name: "Old Testament" })).toBeNull();
  });

  it("loads its file, and says so plainly when the file does not come", async () => {
    const answer = (body: unknown) =>
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/bible/explore/books-at-a-glance.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
      );
    vi.stubGlobal("fetch", answer(DATA));
    const { unmount } = renderWithProviders(<BooksAtAGlance />);
    expect(screen.getByRole("heading", { level: 1, name: "The 66 books at a glance" })).toBeTruthy();
    await waitFor(() => expect(screen.getByLabelText("Go to a book")).toBeTruthy());
    unmount();
    vi.stubGlobal("fetch", answer({ v: 1 }));
    renderWithProviders(<BooksAtAGlance />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});
