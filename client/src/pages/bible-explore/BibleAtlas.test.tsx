/**
 * /study/atlas: only places the book pages place, at the positions they use;
 * choosing a place lists the books and chapters that name it; and the list
 * beside the drawing reaches every place without a mouse.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { isAtlas, type AtlasData } from "@/lib/bibleExplore";
import { MAP_FRAMES, bookMaps, type BookIntro } from "@/lib/bible-notes";
// @ts-expect-error a plain .mjs build library, read here to hold its rules
import { buildAtlas } from "../../../../scripts/lib/bible-explore.mjs";
import BibleAtlas, { AtlasView, SHEETS } from "./BibleAtlas";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: AtlasData = json("bible/explore/atlas.json");
const BOOKS: { slug: string; name: string }[] = json("bible/books.json");

afterEach(() => vi.unstubAllGlobals());

describe("the atlas's data", () => {
  it("is what the build makes from the book pages today, and passes the page's guard", () => {
    expect(isAtlas(DATA)).toBe(true);
    expect(buildAtlas().data).toEqual(DATA);
    expect(isAtlas({ ...DATA, places: [] })).toBe(false);
    expect(new Set(DATA.places.map((p) => p.id)).size).toBe(DATA.places.length);
  });

  it("holds every place of every book page once, with the book's own sentence, references and position", () => {
    for (const b of BOOKS) {
      const intro: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      const map = intro.teaching?.map ?? [];
      expect(DATA.without.includes(b.name), b.slug).toBe(map.length === 0);
      if (!map.length) continue;
      for (const m of bookMaps(map)) {
        for (const p of m.places) {
          const hits = DATA.places.filter((x) => x.ids.includes(p.id) && x.books.some((r) => r.slug === b.slug && r.line.includes(p.line)));
          expect(hits, `${b.slug}: ${p.name}`).toHaveLength(1);
          const place = hits[0];
          // Drawn where a book puts it: within a twentieth of a degree of this book's own mark.
          expect(Math.abs(place.lat - p.lat), p.name).toBeLessThanOrEqual(0.05);
          expect(Math.abs(place.lon - p.lon), p.name).toBeLessThanOrEqual(0.05);
          expect(place.frames.some((f) => f.frame === m.frame), `${p.name} on ${m.frame}`).toBe(true);
          const row = place.books.find((r) => r.slug === b.slug)!;
          for (const r of p.refs) expect(row.refs, `${b.slug} ${p.name}`).toContain(r);
        }
      }
    }
  });

  it("keeps two places apart when they share a name but not a position, and draws each inside its frames", () => {
    const antiochs = DATA.places.filter((p) => /Antioch/.test(p.name));
    expect(antiochs.map((p) => p.name).sort()).toEqual(["Antioch in Syria", "Pisidian Antioch"]);
    for (const p of DATA.places) {
      for (const f of p.frames) {
        const b = MAP_FRAMES[f.frame];
        expect(p.lon >= b.west && p.lon <= b.east && p.lat >= b.south && p.lat <= b.north, `${p.name} on ${f.frame}`).toBe(true);
      }
    }
    expect(Object.keys(SHEETS).sort()).toEqual(Object.keys(MAP_FRAMES).sort());
  });
});

describe("the atlas page", () => {
  it("draws a sheet's places, and lists each as a button", async () => {
    renderWithProviders(<AtlasView data={DATA} />);
    const first = DATA.frames[0];
    const here = DATA.places.filter((p) => p.frames.some((f) => f.frame === first));
    const list = within(screen.getByRole("list", { name: `Places on the map of ${SHEETS[first].name}` })).getAllByRole("button");
    expect(list.map((b) => b.textContent)).toEqual(here.map((p) => p.name));
    await waitFor(() => expect(screen.getByRole("img", { name: new RegExp(`^A simple map of ${SHEETS[first].name}`) })).toBeTruthy());
    expect(document.querySelectorAll("g[data-place]")).toHaveLength(here.length);
  });

  it("lists the books and chapters that name a chosen place, in each book's own words", () => {
    renderWithProviders(<AtlasView data={DATA} />);
    fireEvent.click(screen.getByRole("button", { name: /^The Mediterranean/ }));
    fireEvent.click(screen.getByRole("button", { name: "Ephesus" }));
    const ephesus = DATA.places.find((p) => p.name === "Ephesus")!;
    const card = screen.getByRole("heading", { level: 2, name: "Ephesus" }).closest(".bk-map__card") as HTMLElement;
    expect(within(card).getAllByRole("heading", { level: 3 })).toHaveLength(ephesus.books.length);
    for (const b of ephesus.books) expect(within(card).getByText(b.line)).toBeTruthy();
    const acts = ephesus.books.find((b) => b.slug === "acts")!;
    const link = within(card).getByRole("link", { name: `Acts ${acts.refs[0]}` });
    expect(link.getAttribute("href")).toBe(`/study/bible/acts/${acts.refs[0].split(":")[0]}#v${acts.refs[0].split(":")[1].match(/\d+/)![0]}`);
    expect(within(card).getByRole("link", { name: "Acts" }).getAttribute("href")).toBe("/study/bible/acts#map");
  });

  it("finds a place on any sheet and turns to the sheet it is on", () => {
    renderWithProviders(<AtlasView data={DATA} />);
    fireEvent.change(screen.getByLabelText("Find a place"), { target: { value: "rome" } });
    fireEvent.click(within(screen.getByRole("list", { name: "Places that match" })).getByRole("button", { name: "Rome" }));
    expect(screen.getByRole("button", { name: /^The Mediterranean/ }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("heading", { level: 2, name: "Rome" })).toBeTruthy();
  });

  it("opens on the place its address names", () => {
    renderWithProviders(<AtlasView data={DATA} initialPlace="capernaum" />);
    expect(screen.getByRole("heading", { level: 2, name: "Capernaum" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /^The land in Jesus' day/ }).getAttribute("aria-pressed")).toBe("true");
  });

  it("loads its file, and says so plainly when the file does not come", async () => {
    const answer = (body: unknown) =>
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/bible/explore/atlas.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
      );
    vi.stubGlobal("fetch", answer(DATA));
    const { unmount } = renderWithProviders(<BibleAtlas />);
    expect(screen.getByRole("heading", { level: 1, name: "The Bible atlas" })).toBeTruthy();
    await waitFor(() => expect(screen.getByLabelText("Find a place")).toBeTruthy());
    unmount();
    vi.stubGlobal("fetch", answer({ v: 1, places: "no" }));
    renderWithProviders(<BibleAtlas />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});
