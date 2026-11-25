/**
 * The Study Bible's front page and a book's page, rendered with the site's
 * own files: the 66 books in seven sections, the shelf's card, "As a list",
 * a book at a glance (its place, its kind, its chapters, the notes' own
 * first sentence on who wrote it and when) and its outline band, whose parts
 * open the chapter they start at.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import type { BibleBook } from "@/lib/bible";
import BibleFront from "./BibleFront";
import BookGlance from "./BookGlance";
import { firstSentence } from "./bookFacts";

const ROOT = path.resolve(__dirname, "../../../..");
const PUBLIC = path.join(ROOT, "client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const BOOKS: BibleBook[] = json("bible/books.json");

/** fetch, answered from client/public. */
function publicFetch(): typeof fetch {
  return vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input).split("?")[0];
    const file = path.join(PUBLIC, url);
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return new Response("", { status: 404 });
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
}

afterEach(() => vi.unstubAllGlobals());

describe("/study/bible, the front page", () => {
  it("puts Go to and the 66 books first, in seven sections, with a list for anyone who wants one", async () => {
    vi.stubGlobal("fetch", publicFetch());
    renderWithProviders(<BibleFront books={BOOKS} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("The Study Bible");
    expect(screen.getByRole("search", { name: "Go to a passage" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "the Gospel of John" }).getAttribute("href")).toBe("/study/bible/john");

    const spines = document.querySelectorAll(".bc-shelf .hs-spine");
    expect(spines).toHaveLength(66);
    expect(document.querySelectorAll(".bc-bay")).toHaveLength(7);
    // One tab stop for the whole case.
    expect(Array.from(spines).filter((s) => s.getAttribute("tabindex") === "0")).toHaveLength(1);

    // Opens on John; touch Romans and the card follows.
    expect(screen.getByRole("link", { name: /Open John/ }).getAttribute("href")).toBe("/study/bible/john");
    fireEvent.click(screen.getByRole("button", { name: /^Romans, The Letters, 16 chapters$/ }));
    expect(screen.getByRole("link", { name: /Open Romans/ }).getAttribute("href")).toBe("/study/bible/romans");
    await waitFor(() => expect(document.querySelector(".bc-read .hs-line")?.textContent?.length).toBeGreaterThan(10));
    fireEvent.click(screen.getByRole("button", { name: "Chapters of Romans" }));
    expect(within(screen.getByRole("navigation", { name: "Chapters of Romans" })).getAllByRole("link")).toHaveLength(16);

    fireEvent.click(screen.getByRole("button", { name: "As a list" }));
    expect(document.querySelectorAll(".bc-list a")).toHaveLength(66);
    expect(document.querySelectorAll(".bc-list section")).toHaveLength(7);
  });

  it("offers to pick up where this device left off", () => {
    vi.stubGlobal("fetch", publicFetch());
    localStorage.setItem("livewell-progress-bible", JSON.stringify(["genesis/1", "romans/8"]));
    try {
      renderWithProviders(<BibleFront books={BOOKS} />);
      expect(screen.getByRole("link", { name: /Pick up where you left off: Romans 9/ }).getAttribute("href")).toBe("/study/bible/romans/9");
    } finally {
      localStorage.removeItem("livewell-progress-bible");
    }
  });
});

describe("a book at a glance", () => {
  const meta = Object.fromEntries((json("theology/bible-books.json").books as { book: string; genre: string; occasion: string }[]).map((b) => [b.book, b]));

  it.each([["genesis"], ["psalms"], ["isaiah"], ["mark"], ["romans"], ["philemon"], ["revelation"]])("draws %s from its own files", (slug) => {
    const book = BOOKS.find((b) => b.slug === slug)!;
    const intro = json(`bible/notes/${slug}/intro.json`);
    renderWithProviders(<BookGlance books={BOOKS} book={book} intro={intro} meta={meta} />);
    const at = BOOKS.indexOf(book) + 1;
    expect(screen.getByText(new RegExp(`^Book ${at} of 66`))).toBeTruthy();
    expect(Array.from(document.querySelectorAll(".bg-fact__v"), (e) => e.textContent)).toContain(String(book.chapters));
    expect(screen.getByText(firstSentence(intro.author))).toBeTruthy();
    expect(screen.getByText(firstSentence(intro.date))).toBeTruthy();

    const band = screen.getByRole("group", { name: /How it is built/ });
    const parts = within(band).getAllByRole("button");
    expect(parts).toHaveLength(intro.structure.length);
    // The last part, touched: its title, its summary, and where to start reading.
    fireEvent.click(parts[parts.length - 1]);
    const last = intro.structure[intro.structure.length - 1];
    expect(document.querySelector(".bg-part-read__title")?.textContent).toBe(last.title);
    expect(document.querySelector(".bg-part-read__sum")?.textContent).toBe(last.summary);
    const start = screen.getByRole("link", { name: /^Start at / });
    expect(start.getAttribute("href")).toMatch(new RegExp(`^/study/bible/${slug}/\\d+(#v\\d+)?$`));
    // Keyboard: Home goes back to the first part.
    fireEvent.keyDown(parts[parts.length - 1], { key: "Home" });
    expect(document.querySelector(".bg-part-read__title")?.textContent).toBe(intro.structure[0].title);
  });

  it("starts a one-chapter book's part at its verse", () => {
    const book = BOOKS.find((b) => b.slug === "philemon")!;
    renderWithProviders(<BookGlance books={BOOKS} book={book} intro={json("bible/notes/philemon/intro.json")} meta={meta} />);
    fireEvent.click(within(screen.getByRole("group", { name: /How it is built/ })).getAllByRole("button")[2]);
    expect(screen.getByRole("link", { name: "Start at Philemon 1:8" }).getAttribute("href")).toBe("/study/bible/philemon/1#v8");
  });
});
