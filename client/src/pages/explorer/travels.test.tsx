/**
 * Paul's travels (/study/explorer/pauls-travels), rendered from the real data
 * (client/public/explorer/travels.json and the Acts book page's places):
 * every place it names is one the Acts page has checked; the four trips are
 * chosen with radio buttons; Back, Next, the arrow keys and each place's own
 * button move the step; the card names the place, its Acts reference and the
 * chapter to read; the churches view marks the churches Paul did not begin
 * and links each letter to its book page.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import type { Travels } from "@/lib/explorer";
import ExplorerTravels from "./ExplorerTravels";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const read = (p: string) =>
  JSON.parse(fs.readFileSync(path.join(PUBLIC, p), "utf8"));
const TRAVELS: Travels = read("explorer/travels.json");
const INTRO = read("bible/notes/acts/intro.json");
const PLACES = new Map<string, { name: string }>();
for (const m of INTRO.teaching.map)
  for (const p of m.places ?? []) if (!PLACES.has(p.id)) PLACES.set(p.id, p);

beforeEach(() => {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (fs.existsSync(path.join(PUBLIC, name)) && name.endsWith(".json"))
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      return base(input, init);
    })
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function open(url = "/study/explorer/pauls-travels") {
  window.history.pushState({}, "", url);
  return renderWithProviders(<ExplorerTravels />);
}

const card = () => document.querySelector(".tv-card") as HTMLElement;

describe("the data", () => {
  it("names only places the Acts book page has checked, in four trips", () => {
    expect(TRAVELS.trips.map(t => t.id)).toEqual([
      "first",
      "second",
      "third",
      "rome",
    ]);
    for (const t of TRAVELS.trips)
      for (const s of t.steps)
        for (const id of [s.place, ...(s.via ?? [])])
          expect(PLACES.has(id), `${t.id} ${s.id} ${id}`).toBe(true);
    for (const c of TRAVELS.churches)
      for (const id of c.places) expect(PLACES.has(id), c.id).toBe(true);
  });

  it("says once that Acts does not number the trips, and gives the old name once", () => {
    const all = JSON.stringify(TRAVELS);
    expect(all.match(/missionary journeys/g)).toHaveLength(1);
    expect(TRAVELS.intro).toMatch(/does not number them/);
    expect(TRAVELS.routeNote).toMatch(/not known/);
    expect(all).not.toMatch(/\bAD \d/);
  });
});

describe("the trips", () => {
  it("steps through the first trip by Next, Back, the arrow keys and a place's button", async () => {
    open();
    const first = TRAVELS.trips[0];
    await screen.findByText(`Step 1 of ${first.steps.length}`);
    expect(card().textContent).toContain(PLACES.get("antioch")!.name);
    expect(
      card().querySelector('a[href="/study/bible/acts/13"]')
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(card().textContent).toContain(`Step 2 of ${first.steps.length}`);
    expect(card().textContent).toContain("Salamis");

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(card().textContent).toContain("Step 1 of");

    const map = screen.getByRole("group", {
      name: /Use the left and right arrow keys/,
    });
    fireEvent.keyDown(map, { key: "ArrowRight" });
    fireEvent.keyDown(map, { key: "ArrowRight" });
    expect(card().textContent).toContain("Paphos");

    fireEvent.click(screen.getByRole("button", { name: "Lystra" }));
    expect(card().textContent).toContain("Step 7 of");
    expect(card().textContent).toContain("left for dead");
    expect(screen.getByRole("button", { name: "Lystra" })).toHaveAttribute(
      "aria-current",
      "step"
    );
  });

  it("chooses a trip with a radio button and starts it at its first place", async () => {
    open();
    await screen.findByText(/Step 1 of/);
    fireEvent.click(screen.getByRole("radio", { name: /The voyage to Rome/ }));
    const rome = TRAVELS.trips[3];
    expect(card().textContent).toContain(`Step 1 of ${rome.steps.length}`);
    expect(card().textContent).toContain("Caesarea");
    fireEvent.click(screen.getByRole("button", { name: "Rome" }));
    expect(card().textContent).toContain("boldly and freely");
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });
});

describe("churches and letters", () => {
  it("marks the churches Paul did not begin and links each letter's book page", async () => {
    open("/study/explorer/pauls-travels?view=churches");
    await screen.findByText(/Church 1 of/);
    expect(card().textContent).toContain("Not begun by Paul");
    fireEvent.click(screen.getByRole("button", { name: "Thessalonica" }));
    expect(
      card().querySelector('a[href="/study/bible/1-thessalonians"]')
    ).not.toBeNull();
    expect(
      card().querySelector('a[href="/study/bible/2-thessalonians"]')
    ).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Rome" }));
    await waitFor(() =>
      expect(card().textContent).toContain("Not begun by Paul")
    );
    expect(
      card().querySelector('a[href="/study/bible/romans"]')
    ).not.toBeNull();
  });
});
