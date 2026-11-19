/**
 * The Mark pilot (docs/work/elite/bdoor-plan.md): a book's teaching
 * introduction, its map, and a chapter in plain words, rendered from the
 * site's own files. Books without a teaching guide keep their old page.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import type { BibleBook } from "@/lib/bible";
import type { BookIntro } from "@/lib/bible-notes";
import BookTeaching from "./BookTeaching";
import BookMap from "./BookMap";
import PlainPassages from "./PlainPassages";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const BOOKS: BibleBook[] = json("bible/books.json");
const MARK = BOOKS.find((b) => b.slug === "mark")!;
const intro: BookIntro = json("bible/notes/mark/intro.json");

function publicFetch(): typeof fetch {
  return vi.fn(async (input: RequestInfo | URL) => {
    const file = path.join(PUBLIC, String(input).split("?")[0]);
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return new Response("", { status: 404 });
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
}

afterEach(() => vi.unstubAllGlobals());

describe("Mark's teaching introduction", () => {
  it("opens with a contents list that reaches every part, the lists, the timeline and the map", () => {
    renderWithProviders(<BookTeaching book={MARK} teaching={intro.teaching!} />);
    const links = within(screen.getByRole("navigation", { name: "Contents of the guide to Mark" })).getAllByRole("link");
    expect(links).toHaveLength(intro.teaching!.parts.length + 5);
    for (const a of links) expect(document.getElementById(a.getAttribute("href")!.slice(1))).toBeTruthy();
    // The hard passages open their verse in the chapter.
    expect(screen.getByRole("link", { name: "Mark 2:26" }).getAttribute("href")).toBe("/study/bible/mark/2#v26");
  });

  it("narrows the timeline by kind", () => {
    renderWithProviders(<BookTeaching book={MARK} teaching={intro.teaching!} />);
    const all = document.querySelectorAll(".bk-tl li").length;
    expect(all).toBe(intro.teaching!.timeline.length);
    fireEvent.click(screen.getByRole("button", { name: "How the book came to be" }));
    const book = intro.teaching!.timeline.filter((t) => t.kind === "book").length;
    expect(document.querySelectorAll(".bk-tl li")).toHaveLength(book);
    expect(book).toBeLessThan(all);
  });

  it("only Mark, Matthew and John have one so far, and every other book's introduction still has the fields its page draws", () => {
    for (const b of BOOKS) {
      const d: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      expect(!!d.teaching, b.slug).toBe(["mark", "matthew", "john"].includes(b.slug));
      expect(typeof d.overview).toBe("string");
    }
  });
});

describe("Mark's map", () => {
  it("lists every place as a button, and the card follows the one chosen", () => {
    renderWithProviders(<BookMap slug="mark" bookName="Mark" places={intro.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in Mark, from Sidon in the north to Jerusalem in the south." })).toBeTruthy();
    const list = within(screen.getByRole("list", { name: "Places in Mark" })).getAllByRole("button");
    expect(list).toHaveLength(intro.teaching!.map.length);
    fireEvent.click(screen.getByRole("button", { name: "Caesarea Philippi" }));
    expect(screen.getByRole("heading", { level: 3, name: "Caesarea Philippi" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Mark 8:27" }).getAttribute("href")).toBe("/study/bible/mark/8#v27");
  });
});

describe("Matthew's teaching introduction, from the same parts", () => {
  const MATTHEW = BOOKS.find((b) => b.slug === "matthew")!;
  const mt: BookIntro = json("bible/notes/matthew/intro.json");

  it("adds its own pages to Go deeper, after the shared ones", () => {
    renderWithProviders(<BookTeaching book={MATTHEW} teaching={mt.teaching!} />);
    expect(screen.getByRole("link", { name: /Jewish life in Jesus's day/ }).getAttribute("href")).toBe("/resources/context/world/jewish-life-in-jesus-day");
    expect(screen.getByRole("link", { name: /How to read the Gospels/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Matthew 27:25" }).getAttribute("href")).toBe("/study/bible/matthew/27#v25");
  });

  it("draws its own places, north to south, with its regions marked", () => {
    renderWithProviders(<BookMap slug="matthew" bookName="Matthew" places={mt.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in Matthew, from Sidon in the north to Bethlehem in the south." })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Bethlehem" }));
    expect(screen.getByRole("link", { name: "Matthew 2:16" }).getAttribute("href")).toBe("/study/bible/matthew/2#v16");
    expect(screen.getByText(/the two regions are placed roughly/)).toBeTruthy();
  });
});

describe("John's teaching introduction, from the same parts", () => {
  const JOHN = BOOKS.find((b) => b.slug === "john")!;
  const jn: BookIntro = json("bible/notes/john/intro.json");

  it("has its own part on 'the Jews', its hard passages and its own Go deeper pages", () => {
    renderWithProviders(<BookTeaching book={JOHN} teaching={jn.teaching!} />);
    expect(screen.getByRole("heading", { level: 2, name: "‘The Jews’ in John" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "John 8:44" }).getAttribute("href")).toBe("/study/bible/john/8#v44");
    expect(screen.getByRole("link", { name: /Jewish life in Jesus's day/ }).getAttribute("href")).toBe("/resources/context/world/jewish-life-in-jesus-day");
  });

  it("draws its own places, north to south, with Cana placed roughly", () => {
    renderWithProviders(<BookMap slug="john" bookName="John" places={jn.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in John, from Capernaum in the north to Jerusalem in the south." })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Sychar" }));
    expect(screen.getByRole("link", { name: "John 4:5" }).getAttribute("href")).toBe("/study/bible/john/4#v5");
    expect(screen.getByText(/the region is placed roughly/)).toBeTruthy();
  });
});

describe("Mark 1 to 3 in plain words", () => {
  it.each([1, 2, 3])("Mark %i: every passage, in order, with what is happening and what it asks", async (n) => {
    vi.stubGlobal("fetch", publicFetch());
    const note = json(`bible/notes/mark/${n}.json`);
    expect(note.plain).toBe(true);
    const { passages } = json(`bible/notes/mark/plain/${n}.json`);
    renderWithProviders(<PlainPassages slug="mark" chapter={n} label={`Mark ${n}`} />);
    await waitFor(() => expect(document.querySelectorAll(".pp-passage")).toHaveLength(passages.length));
    expect(screen.getAllByRole("heading", { level: 4, name: "What is happening" })).toHaveLength(passages.length);
    expect(screen.getAllByRole("heading", { level: 4, name: "What it asks" })).toHaveLength(passages.length);
    expect(within(screen.getByRole("navigation", { name: `Passages in Mark ${n}` })).getAllByRole("link")).toHaveLength(passages.length);
  });
});
