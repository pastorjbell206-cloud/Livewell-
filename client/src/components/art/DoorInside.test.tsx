/**
 * DoorInside: a door's own page lists every page inside its rooms, from the
 * site catalogue, so "Everything in <door>" cannot fall behind the menus.
 */
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/harness";
import { DOORS } from "@/lib/siteCatalog";
import DoorInside, { doorRooms } from "./DoorInside";

describe("DoorInside", () => {
  for (const door of DOORS) {
    const inside = door.rooms.flatMap((r) => (r.inside ?? []).filter((i) => !i.external));
    it(`${door.name}: links every page inside its rooms, each under its catalogue name`, () => {
      const { container } = renderWithProviders(<DoorInside door={door.id} />);
      const tiles = Array.from(container.querySelectorAll("a.lw-tile"));
      expect(tiles.map((a) => a.getAttribute("href"))).toEqual(inside.map((i) => i.href));
      expect(tiles.map((a) => a.querySelector(".lw-tile__name")?.textContent)).toEqual(inside.map((i) => i.name));
      // Grouped under the room that holds them; a door with nothing inside draws nothing.
      expect(container.querySelectorAll(".lw-inside__room").length).toBe(door.rooms.filter((r) => (r.inside ?? []).some((i) => !i.external)).length);
      if (!inside.length) expect(container.querySelector("section")).toBeNull();
    });
  }

  it("hands a door's page its rooms, six or fewer, in the catalogue's order", () => {
    expect(doorRooms("bible").map((r) => r.name)).toEqual(["Read the Study Bible", "Search the Bible", "How to study the Bible", "The Bible's story", "Bible background", "Reading plans"]);
    for (const d of DOORS) expect(doorRooms(d.id).length).toBeLessThanOrEqual(6);
  });
});

describe("DoorInside on the Questions door", () => {
  it("lists the case for the faith's live areas from the library's manifest, ahead of Look up a claim", async () => {
    const { vi } = await import("vitest");
    const { screen } = await import("@testing-library/react");
    const index = {
      roomLive: true,
      claims: [],
      answers: {},
      areas: [
        { slug: "god", n: 1, title: "God, faith and reason", planned: 5, status: "live", live: true, hasPage: true, pieces: [{ slug: "a", question: "A?", status: "live", live: true }] },
        { slug: "evil", n: 8, title: "Evil and suffering", planned: 5, status: "pending", live: false, hasPage: true, pieces: [] },
      ],
    };
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(index), { status: 200, headers: { "content-type": "application/json" } })));
    const { container } = renderWithProviders(<DoorInside door="questions" />);
    const live = await screen.findByRole("link", { name: /God, faith and reason/ }, { timeout: 8000 });
    expect(live.getAttribute("href")).toBe("/questions/god");
    const hrefs = Array.from(container.querySelectorAll("a.lw-tile[href^='/questions/']")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/questions/god", "/questions/claims"]);
    vi.unstubAllGlobals();
  });
});
