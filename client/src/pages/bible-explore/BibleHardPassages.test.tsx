/**
 * /study/hard-passages: every hard passage the book pages list, in their own
 * words; never a question without the way to its note; Find Help in reach.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { isHard, type HardData } from "@/lib/bibleExplore";
import type { BookIntro } from "@/lib/bible-notes";
// @ts-expect-error a plain .mjs build library, read here to hold its rules
import { CARE_LINES, buildHard } from "../../../../scripts/lib/bible-explore.mjs";
import BibleHardPassages, { HardView } from "./BibleHardPassages";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: HardData = json("bible/explore/hard-passages.json");
const BOOKS: { slug: string; name: string }[] = json("bible/books.json");
const COUNT = DATA.books.reduce((n, b) => n + b.items.length, 0);

afterEach(() => vi.unstubAllGlobals());

describe("the hard passages' data", () => {
  it("is what the build makes from the book pages today, and passes the page's guard", () => {
    expect(isHard(DATA)).toBe(true);
    expect(buildHard().data).toEqual(DATA);
    expect(isHard({ ...DATA, books: [] })).toBe(false);
  });

  it("holds every hard passage of every book page, word for word, in the book's order, and adds no kind", () => {
    for (const b of BOOKS) {
      const intro: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      const src = intro.teaching?.hard ?? [];
      const row = DATA.books.find((x) => x.slug === b.slug);
      expect(DATA.without.includes(b.name), b.slug).toBe(src.length === 0);
      expect(row?.items ?? [], b.slug).toEqual(src.map((h) => ({ ch: h.ch, v: h.v, ref: h.ref, line: h.line })));
      for (const h of row?.items ?? []) expect(Object.keys(h).sort()).toEqual(["ch", "line", "ref", "v"]);
    }
  });

  it("lists a passage only when the chapter it opens has a note", () => {
    for (const b of DATA.books) for (const h of b.items) expect(fs.existsSync(path.join(PUBLIC, `bible/notes/${b.slug}/${h.ch}.json`)), `${b.slug} ${h.ref}`).toBe(true);
  });
});

describe("the hard passages page", () => {
  it("never shows a passage without the way to its note", () => {
    renderWithProviders(<HardView data={DATA} />);
    const items = Array.from(document.querySelectorAll(".bk-hard li"));
    expect(items).toHaveLength(COUNT);
    for (const li of items) {
      const a = li.querySelector("a");
      expect(a?.getAttribute("href"), li.textContent ?? "").toMatch(/^\/study\/bible\/[a-z0-9-]+\/\d+#v\d+$/);
    }
    expect(screen.getByRole("link", { name: "Genesis 1:1" }).getAttribute("href")).toBe("/study/bible/genesis/1#v1");
    expect(within(screen.getByRole("navigation", { name: "Books" })).getAllByRole("link")).toHaveLength(DATA.books.length);
  });

  it("keeps Find Help in reach, at the top and after each part", () => {
    renderWithProviders(<HardView data={DATA} />);
    const help = screen.getAllByRole("link", { name: "Find Help" });
    expect(help.length).toBeGreaterThanOrEqual(2 * DATA.care.length);
    for (const a of help) expect(a.getAttribute("href")).toBe("/help");
  });

  it("says no care words of its own: each care line is a whole paragraph the Study Bible's notes already say, byte for byte", () => {
    expect(DATA.care).toHaveLength(CARE_LINES.length);
    // Each line is, whole, a paragraph of the note it is copied from, and of other chapters' notes besides.
    const plainHard = (file: string): string[] => (json(`bible/notes/${file}`).passages as { hard?: string }[]).flatMap((p) => (p.hard ?? "").split(/\n{2,}/));
    CARE_LINES.forEach((c: { from: string; starts: string }, i: number) => {
      expect(plainHard(c.from), c.from).toContain(DATA.care[i]);
      expect(DATA.care[i].startsWith(c.starts)).toBe(true);
      expect(DATA.care[i]).toContain("Find Help");
    });
    expect(plainHard("revelation/plain/9.json").some((p) => p.endsWith(DATA.care[0]))).toBe(true);
    expect(plainHard("1-john/plain/3.json").some((p) => p.endsWith(DATA.care[1]))).toBe(true);
    // And the page shows exactly those words, with nothing added or dropped.
    renderWithProviders(<HardView data={DATA} />);
    const boxes = Array.from(document.querySelectorAll(".bx-care"));
    expect(boxes.length).toBeGreaterThanOrEqual(2);
    for (const box of boxes) expect(Array.from(box.querySelectorAll("p")).map((p) => p.textContent)).toEqual(DATA.care);
  });

  it("says plainly that the passages are listed by book because the book pages give them no kinds", () => {
    renderWithProviders(<HardView data={DATA} />);
    expect(screen.getByText(/do not sort these passages by kind/)).toBeTruthy();
  });

  it("narrows by a word or a testament, each result still with its link, and can be set back", () => {
    renderWithProviders(<HardView data={DATA} />);
    fireEvent.change(screen.getByLabelText("Find a passage"), { target: { value: "romans 9" } });
    const items = Array.from(document.querySelectorAll(".bk-hard li"));
    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBeLessThan(COUNT);
    for (const li of items) expect(li.querySelector("a")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Find a passage"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "New Testament" }));
    expect(document.querySelectorAll(".bk-hard li")).toHaveLength(DATA.books.filter((b) => b.testament === "NT").reduce((n, b) => n + b.items.length, 0));
    fireEvent.change(screen.getByLabelText("Find a passage"), { target: { value: "zzzz" } });
    fireEvent.click(screen.getByRole("button", { name: "Show every passage" }));
    expect(document.querySelectorAll(".bk-hard li")).toHaveLength(COUNT);
  });

  it("loads its file, and says so plainly when the file does not come", async () => {
    const answer = (body: unknown) =>
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/bible/explore/hard-passages.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
      );
    vi.stubGlobal("fetch", answer(DATA));
    const { unmount } = renderWithProviders(<BibleHardPassages />);
    expect(screen.getByRole("heading", { level: 1, name: "Hard passages" })).toBeTruthy();
    await waitFor(() => expect(screen.getByLabelText("Find a passage")).toBeTruthy());
    unmount();
    vi.stubGlobal("fetch", answer({ v: 1 }));
    renderWithProviders(<BibleHardPassages />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});
