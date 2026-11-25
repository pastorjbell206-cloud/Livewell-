/**
 * /study/timeline: the page shows the book pages' own words and nothing else,
 * lists each entry by the year its own book names, sets side by side the
 * entries that tell of one event, and never chooses between two dates.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { isTimeline, type TimelineData } from "@/lib/bibleExplore";
import type { BookIntro } from "@/lib/bible-notes";
// @ts-expect-error a plain .mjs build library, read here to hold its rules
import { buildTimeline, firstYear, ownRefs } from "../../../../scripts/lib/bible-explore.mjs";
import BibleTimeline, { TimelineView } from "./BibleTimeline";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: TimelineData = json("bible/explore/timeline.json");
const BOOKS: { slug: string; name: string; chapters: number }[] = json("bible/books.json");

afterEach(() => vi.unstubAllGlobals());

describe("the timeline's data", () => {
  it("is what the build makes from the book pages today, and passes the page's guard", () => {
    expect(isTimeline(DATA)).toBe(true);
    expect(buildTimeline().data).toEqual(DATA);
    expect(isTimeline({ ...DATA, entries: [] })).toBe(false);
  });

  it("holds every entry of every book page, word for word", () => {
    let n = 0;
    for (const b of BOOKS) {
      const intro: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      const own = DATA.entries.filter((e) => e.book === b.slug);
      const src = intro.teaching?.timeline ?? [];
      expect(own.length, b.slug).toBe(src.length);
      for (const t of src) expect(own.some((e) => e.when === t.when && e.what === t.what && e.kind === t.kind), `${b.slug}: ${t.when}`).toBe(true);
      n += src.length;
      expect(DATA.without.includes(b.name), b.slug).toBe(src.length === 0);
    }
    expect(DATA.entries).toHaveLength(n);
    expect(DATA.books.length + DATA.without.length).toBe(66);
  });

  it("reads a year only out of the book's own words", () => {
    expect(firstYear("About 1446 BC, on the early date")).toBe(-1446);
    expect(firstYear("27 BC to AD 14")).toBe(-27);
    expect(firstYear("AD 30 or 33")).toBe(30);
    expect(firstYear("The mid-50s")).toBe(55);
    expect(firstYear("The 800s BC")).toBe(-899);
    expect(firstYear("Early second century")).toBe(101);
    expect(firstYear("24 May 1738")).toBe(1738);
    expect(firstYear("July 64")).toBe(64);
    for (const none of ["Soon after", "The days of Abraham", "After 1 Corinthians", "The fortieth year, eleventh month, first day", "The second year", "No date given"]) expect(firstYear(none), none).toBeNull();
  });

  it("never places an entry its book gives no year, except straight after the line it leans on", () => {
    for (const e of DATA.entries) {
      if (e.placed === "none") expect(e.band, e.id).toBe("no-year");
      else expect(e.year, e.id).not.toBeNull();
      if (e.placed === "year") expect(firstYear(e.when), e.id).toBe(e.year);
      if (e.placed === "order") expect(firstYear(e.when), e.id).toBeNull();
    }
    // Genesis gives creation no date, and the page gives it none.
    const creation = DATA.entries.find((e) => e.book === "genesis" && e.when === "The beginning")!;
    expect(creation.placed).toBe("none");
  });

  it("links an entry to a chapter only when its own sentence names one in its own book", () => {
    const romans = BOOKS.find((b) => b.slug === "romans")!;
    expect(ownRefs("Claudius is emperor. Acts names him for sending the Jews out of Rome (Acts 18:2).", romans)).toEqual([]);
    expect(ownRefs("Prisca and Aquila are back there when Paul writes (16:3).", romans)).toEqual([{ ch: 16, v: 3 }]);
    const genesis = BOOKS.find((b) => b.slug === "genesis")!;
    expect(ownRefs("From Adam to Noah, ten generations (chapter 5), then the flood (6 to 9).", genesis)).toEqual([{ ch: 5 }, { ch: 6 }]);
    expect(ownRefs("George Smith reads his translation (1872).", genesis)).toEqual([]);
    for (const e of DATA.entries) {
      if (e.ch === undefined) continue;
      const b = BOOKS.find((x) => x.slug === e.book)!;
      expect(e.ch >= 1 && e.ch <= b.chapters, e.id).toBe(true);
    }
  });

  it("groups only real entries, from more than one book, and marks the groups whose dates are not worded alike", () => {
    const byId = new Map(DATA.entries.map((e) => [e.id, e]));
    expect(DATA.groups.length).toBeGreaterThan(10);
    for (const g of DATA.groups) {
      const members = g.entries.map((id) => byId.get(id)!);
      expect(members.every(Boolean), g.id).toBe(true);
      expect(new Set(members.map((m) => m.book)).size, g.id).toBeGreaterThan(1);
      expect(members.every((m) => m.group === g.id), g.id).toBe(true);
    }
    const crucifixion = DATA.groups.find((g) => g.id === "crucifixion")!;
    expect(crucifixion.differ).toBe(true);
    expect(new Set(crucifixion.entries.map((id) => byId.get(id)!.when))).toEqual(new Set(["About AD 30", "AD 30 or 33"]));
    expect(DATA.groups.find((g) => g.id === "gallio")!.differ).toBe(false);
  });
});

describe("the timeline page", () => {
  it("draws every entry once, each with the way to its book", () => {
    renderWithProviders(<TimelineView data={DATA} />);
    expect(document.querySelectorAll("li[data-kind]")).toHaveLength(DATA.entries.length);
    for (const li of Array.from(document.querySelectorAll("li[data-kind]"))) {
      const links = Array.from(li.querySelectorAll("a")).map((a) => a.getAttribute("href") ?? "");
      expect(links.some((h) => h.startsWith("/study/bible/")), li.id).toBe(true);
    }
    // The line of time is a list of links to the stretches of years below it.
    const line = within(screen.getByRole("navigation", { name: "The line of time" })).getAllByRole("link");
    expect(line).toHaveLength(DATA.bands.length);
    for (const a of line) expect(document.getElementById(a.getAttribute("href")!.slice(1))).toBeTruthy();
    expect(screen.getByRole("link", { name: "Genesis 1:1" }).getAttribute("href")).toBe("/study/bible/genesis/1#v1");
  });

  it("shows both dates where books differ, says they differ, and picks neither", () => {
    renderWithProviders(<TimelineView data={DATA} />);
    const first = DATA.groups.find((g) => g.id === "crucifixion")!.entries[0];
    const box = document.getElementById(first)!.closest(".bx-same") as HTMLElement;
    expect(box.hasAttribute("data-differ")).toBe(true);
    expect(within(box).getByText(/They do not date it alike\. Each is shown as its own book gives it/)).toBeTruthy();
    expect(within(box).getByText("About AD 30")).toBeTruthy();
    expect(within(box).getAllByText("AD 30 or 33").length).toBeGreaterThan(1);
    const alike = document.querySelectorAll(".bx-same:not([data-differ])");
    expect(alike.length).toBe(DATA.groups.filter((g) => !g.differ).length);
  });

  it("narrows by testament, by book and by kind, and can be set back", () => {
    renderWithProviders(<TimelineView data={DATA} />);
    const count = () => document.querySelectorAll("li[data-kind]").length;
    const ot = new Set(DATA.books.filter((b) => b.testament === "OT").map((b) => b.slug));
    fireEvent.click(screen.getByRole("button", { name: "Old Testament" }));
    expect(count()).toBe(DATA.entries.filter((e) => ot.has(e.book)).length);
    fireEvent.change(screen.getByLabelText("One book"), { target: { value: "mark" } });
    expect(count()).toBe(DATA.entries.filter((e) => e.book === "mark").length);
    fireEvent.click(screen.getByRole("button", { name: "How the books came to be" }));
    expect(count()).toBe(DATA.entries.filter((e) => e.book === "mark" && e.kind === "book").length);
    expect(screen.getByRole("status").textContent).toContain(`of ${DATA.entries.length} entries`);
    fireEvent.click(screen.getAllByRole("button", { name: "Show everything" })[0]);
    expect(count()).toBe(DATA.entries.length);
  });

  it("says which books are not here yet", () => {
    renderWithProviders(<TimelineView data={DATA} />);
    if (DATA.without.length) expect(screen.getByText(`${DATA.without.length} of the 66 books are not here yet`)).toBeTruthy();
    expect(screen.getByText(new RegExp(`from the pages of ${DATA.books.length} books`))).toBeTruthy();
  });

  it("loads its file, and says so plainly when the file does not come", async () => {
    const answer = (body: unknown) =>
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/bible/explore/timeline.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
      );
    vi.stubGlobal("fetch", answer(DATA));
    const { unmount } = renderWithProviders(<BibleTimeline />);
    expect(screen.getByRole("heading", { level: 1, name: "The Bible's timeline" })).toBeTruthy();
    await waitFor(() => expect(document.querySelectorAll("li[data-kind]").length).toBe(DATA.entries.length));
    unmount();
    vi.stubGlobal("fetch", answer({ v: 1 }));
    renderWithProviders(<BibleTimeline />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
    expect(screen.getByRole("link", { name: "Back to Study the Bible" })).toBeTruthy();
  });
});
