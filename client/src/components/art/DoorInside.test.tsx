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
