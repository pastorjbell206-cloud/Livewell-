/**
 * How culture reads the Bible (/theology/reading-the-bible): every era is a
 * real history essay, every guide a real page, every interpreter a named book
 * and year, and the page shows all three. Its place is the History door.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { doorRooms } from "@/components/art/DoorInside";
import TheologyReadingTheBible, { isReadingData, type ReadingData } from "./TheologyReadingTheBible";

const PUBLIC = path.resolve(__dirname, "../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: ReadingData = json("theology/reading-the-bible.json");
const INDEX: { essays: { slug: string; title: string }[] } = json("history/essays-index.json");

afterEach(() => vi.unstubAllGlobals());

describe("the page's data", () => {
  it("passes the page's guard", () => {
    expect(isReadingData(DATA)).toBe(true);
    expect(isReadingData({ ...DATA, eras: undefined })).toBe(false);
  });

  it("names six eras, each a history essay in the index, none a numbered course lesson", () => {
    expect(DATA.eras).toHaveLength(6);
    for (const slug of DATA.eras) {
      expect(fs.existsSync(path.join(PUBLIC, `history/essays/${slug}.json`)), slug).toBe(true);
      const entry = INDEX.essays.find((e) => e.slug === slug) as { course?: number } | undefined;
      expect(entry, slug).toBeTruthy();
      expect(entry!.course, slug).toBeUndefined();
    }
  });

  it("gives every interpreter a name, a book, a year and what they saw, and quotes no one", () => {
    expect(DATA.interpreters.length).toBeGreaterThanOrEqual(8);
    for (const p of DATA.interpreters) {
      expect(p.name && p.work && p.year && p.saw, p.name).toBeTruthy();
      expect(p.saw, p.name).not.toMatch(/[“”"]/);
    }
  });

  it("links only to guides that exist on the site", () => {
    for (const g of DATA.guides) {
      const world = g.href.match(/^\/resources\/context\/world\/(.+)$/);
      const guide = g.href.match(/^\/resources\/context\/([^/]+)$/);
      const file = world ? `context/worlds/${world[1]}.json` : guide ? `context/guides/${guide[1]}.json` : "";
      expect(file && fs.existsSync(path.join(PUBLIC, file)), g.href).toBeTruthy();
    }
  });

  it("is the History door's room beside Christian traditions", () => {
    const rooms = doorRooms("history");
    const i = rooms.findIndex((r) => r.id === "history.traditions");
    expect(rooms[i + 1]).toMatchObject({ id: "history.reading", href: "/theology/reading-the-bible" });
    expect(rooms.length).toBeLessThanOrEqual(6);
  });
});

describe("/theology/reading-the-bible", () => {
  const serve = (page: unknown) =>
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/theology/reading-the-bible.json")) return new Response(JSON.stringify(page), { status: 200 });
      if (url.includes("/history/essays-index.json")) return new Response(JSON.stringify(INDEX), { status: 200 });
      return new Response("{}", { status: 503 });
    });

  it("shows the eras in order, the interpreters and the guides", async () => {
    vi.stubGlobal("fetch", serve(DATA));
    renderWithProviders(<TheologyReadingTheBible />);
    expect(screen.getByRole("heading", { level: 1, name: "How culture reads the Bible" })).toBeTruthy();
    await waitFor(() => expect(screen.getByRole("heading", { level: 2, name: "How the church has read the Bible" })).toBeTruthy());
    const eraLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".rb-eras a")).map((a) => a.getAttribute("href"));
    expect(eraLinks).toEqual(DATA.eras.map((s) => `/theology/history/${s}`));
    for (const p of DATA.interpreters) expect(screen.getByRole("heading", { level: 3, name: p.name })).toBeTruthy();
    for (const g of DATA.guides) expect(screen.getByRole("link", { name: g.title })).toHaveAttribute("href", g.href);
  });

  it("says so plainly when its data does not come", async () => {
    vi.stubGlobal("fetch", serve({ v: 1 }));
    renderWithProviders(<TheologyReadingTheBible />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});
