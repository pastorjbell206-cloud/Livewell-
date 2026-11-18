/**
 * Where a page sits on the map, for the small label over its title: the door
 * and, for a page one step inside a room, the room, each under its catalogue
 * name (lib/siteCatalog.ts). A door's own page and a room's own page carry the
 * door alone, since the title already names the room.
 *
 * A tool that the catalogue does not list by address takes its place from its
 * group in the tools list (lib/toolsList.ts): /tools#<group>, or the Family
 * door for the family tools.
 */
import { DOORS, type CatalogEntry } from "./siteCatalog";
import { toolByHref } from "./toolsList";

export interface PlacePart {
  name: string;
  href: string;
}

export interface PagePlace {
  door: PlacePart;
  room?: PlacePart;
}

const base = (href: string) => href.split("#")[0].split("?")[0];

function doorPart(id: string): PlacePart | undefined {
  const d = DOORS.find((x) => x.id === id);
  return d ? { name: d.name, href: d.page.href } : undefined;
}

/** Find the place of an address in the catalogue, by exact address (hash kept when given). */
function fromCatalog(match: (e: CatalogEntry) => boolean): PagePlace | undefined {
  for (const d of DOORS) {
    const door = { name: d.name, href: d.page.href };
    if (match(d.page)) return { door };
    for (const r of d.rooms) {
      if (match(r)) return { door };
      for (const i of r.inside ?? []) {
        if (!i.external && match(i)) return { door, room: { name: r.name, href: r.href } };
      }
    }
  }
  return undefined;
}

export function placeFor(path: string): PagePlace | undefined {
  const p = base(path);
  const hit = fromCatalog((e) => base(e.href) === p && !e.href.includes("#"));
  if (hit) return hit;
  const tool = toolByHref(p);
  if (tool) {
    if (tool.group === "family") return { door: doorPart("family")! };
    const groupHref = `/tools#${tool.group}`;
    for (const d of DOORS) {
      for (const r of d.rooms) {
        if (r.href === groupHref) return { door: { name: d.name, href: d.page.href }, room: { name: r.name, href: r.href } };
        const inner = (r.inside ?? []).find((i) => i.href === groupHref);
        if (inner) return { door: { name: d.name, href: d.page.href }, room: { name: inner.name, href: inner.href } };
      }
    }
    return { door: doorPart("tools")! };
  }
  return undefined;
}
