/**
 * Abraham's road (/study/explorer/abrahams-road), rendered from the real data
 * (client/public/explorer/abrahams-road.json and the Genesis book page's
 * places): every place it names is one the Genesis page has checked; the
 * three parts are chosen with radio buttons; Back, Next, the arrow keys and
 * each place's own button move the step; the card names the place, its
 * Genesis reference and the chapter to read. It shares its map with Paul's
 * travels (RouteMap.tsx).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, cleanup } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import type { AbrahamsRoad } from "@/lib/explorer";
import ExplorerAbraham from "./ExplorerAbraham";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const read = (p: string) =>
  JSON.parse(fs.readFileSync(path.join(PUBLIC, p), "utf8"));
const ROAD: AbrahamsRoad = read("explorer/abrahams-road.json");
const INTRO = read("bible/notes/genesis/intro.json");
const PLACES = new Map<string, { name: string; line: string }>();
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

function open(url = "/study/explorer/abrahams-road") {
  window.history.pushState({}, "", url);
  return renderWithProviders(<ExplorerAbraham />);
}

const card = () => document.querySelector(".tv-card") as HTMLElement;

describe("the data", () => {
  it("names only places the Genesis book page has checked, in three parts", () => {
    expect(ROAD.parts.map(p => p.id)).toEqual([
      "ur-to-canaan",
      "egypt",
      "moriah",
    ]);
    for (const p of ROAD.parts)
      for (const s of p.steps)
        expect(PLACES.has(s.place), `${p.id} ${s.id}`).toBe(true);
    // Every leg is overland and straight; the roads are not known; no year.
    for (const p of ROAD.parts)
      expect(p.steps.slice(1).every(s => s.by === "land")).toBe(true);
    expect(ROAD.routeNote).toMatch(/not known/);
    expect(JSON.stringify(ROAD)).not.toMatch(/\b\d{3,4} ?BC\b|\bBC ?\d/);
  });

  it("states Ur and Moriah as the Genesis page and its note state them", () => {
    const steps = ROAD.parts.flatMap(p => p.steps);
    const ur = steps.find(s => s.place === "ur")!;
    expect(PLACES.get("ur")!.line).toContain("southern Mesopotamia");
    expect(ur.text).toContain("southern Mesopotamia");
    expect(ur.text).toContain("some have proposed a northern Ur near Haran");
    const moriah = steps.find(s => s.place === "moriah")!;
    expect(moriah.name).toBe("The land of Moriah");
    expect(moriah.text).toContain("“the land of Moriah”");
    expect(moriah.text).toContain("Genesis does not say which mountain");
    expect(moriah.text).toContain("2 Chronicles 3:1");
    expect(moriah.text).toContain("roughly");
  });
});

describe("the road", () => {
  it("steps through the first part by Next, Back, the arrow keys and a place's button", async () => {
    open();
    const first = ROAD.parts[0];
    await screen.findByText(`Step 1 of ${first.steps.length}`);
    expect(card().textContent).toContain("Ur");
    expect(
      card().querySelector('a[href="/study/bible/genesis/11"]')
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(card().textContent).toContain("Haran");
    expect(
      card().querySelector('a[href="/study/bible/genesis/12"]')
    ).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(card().textContent).toContain("Step 1 of");

    const map = screen.getByRole("group", {
      name: /Use the left and right arrow keys/,
    });
    fireEvent.keyDown(map, { key: "End" });
    expect(card().textContent).toContain("Shechem");
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    fireEvent.keyDown(map, { key: "ArrowLeft" });
    expect(card().textContent).toContain("Haran");
  });

  it("chooses a part with a radio button; Egypt is named as Genesis names it", async () => {
    open();
    await screen.findByText(/Step 1 of/);
    fireEvent.click(
      screen.getByRole("radio", { name: /Down to Egypt and back/ })
    );
    expect(card().textContent).toContain("Bethel");
    fireEvent.click(screen.getByRole("button", { name: "Egypt" }));
    expect(card().textContent).toContain("Step 2 of");
    expect(card().textContent).toContain("Genesis does not say where in Egypt");
    expect(card().querySelector("h3")!.textContent).toBe("Egypt");
    fireEvent.click(
      screen.getByRole("radio", { name: /Hebron, Beersheba and Moriah/ })
    );
    fireEvent.click(screen.getByRole("button", { name: "The land of Moriah" }));
    expect(card().textContent).toContain("The LORD Will Provide");
    expect(
      card().querySelector('a[href="/study/bible/genesis/22"]')
    ).not.toBeNull();
  });
});

describe("Abraham's road: names keep off the coast", () => {
  it("names Hebron clear of the coast and the Dead Sea, shadows included, at both sizes", async () => {
    const { placeNames, frameFor, boxFor } = await import("./RouteMap");
    const part = ROAD.parts.find(p => p.id === "egypt")!;
    const frame = frameFor("fertile-crescent");
    const all = Array.from(new Set(part.steps.map(s => s.place))).map(
      id => ({ ...(PLACES.get(id) as object), id }) as never
    );
    const reach = (part.reach ?? []).map(
      ([lat, lon], i) =>
        ({ id: `r${i}`, name: "", lat, lon, refs: [], line: "" }) as never
    );
    const box = boxFor(frame, [...all, ...reach]);
    const u = box.w / 100;
    // Every coast and lake line, and the same line moved by its shadow.
    const segs: number[][] = [];
    for (const line of ROAD.avoid ?? [])
      for (let i = 1; i < line.length; i++)
        for (const s of [0, 2.5])
          segs.push([
            frame.x(line[i - 1][1]) + s,
            frame.y(line[i - 1][0]) + s,
            frame.x(line[i][1]) + s,
            frame.y(line[i][0]) + s,
          ]);
    const dist = (px: number, py: number, [ax, ay, bx, by]: number[]) => {
      const dx = bx - ax;
      const dy = by - ay;
      const t = Math.max(
        0,
        Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy))
      );
      return Math.hypot(px - ax - t * dx, py - ay - t * dy);
    };
    for (const wide of [true, false]) {
      const names = placeNames(
        frame,
        all,
        box,
        u,
        wide,
        [
          part.steps.map(
            s => all.find(p => (p as { id: string }).id === s.place)!
          ),
        ],
        [],
        p => ROAD.names?.[p.id] ?? p.name,
        ROAD.avoid,
        ROAD.rivers
      );
      const r = names.get("hebron")!.r;
      let near = Infinity;
      for (const sg of segs)
        for (let k = 0; k <= 20; k++)
          for (const [x, y] of [
            [r.x + (r.w * k) / 20, r.y],
            [r.x + (r.w * k) / 20, r.y + r.h],
            [r.x, r.y + (r.h * k) / 20],
            [r.x + r.w, r.y + (r.h * k) / 20],
          ])
            near = Math.min(near, dist(x, y, sg));
      expect(names.get("hebron")!.room).toBe(true);
      expect(near / u).toBeGreaterThan(0.5);
    }
  });
});
