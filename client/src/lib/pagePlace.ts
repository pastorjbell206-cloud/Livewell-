/**
 * Where a page sits on the map, for the small label over its title: the door
 * and, for a page one step inside a room, the room, each under its catalogue
 * name (lib/siteCatalog.ts). A door's own page and a room's own page carry the
 * door alone, since the title already names the room.
 *
 * A tool that the catalogue does not list by address takes its place from its
 * group in the tools list (lib/toolsList.ts): /tools#<group>, or the Family
 * door for the family tools. The groups are copied below, so a page top does
 * not have to load the whole tools list before it paints; pagePlace.test.ts
 * fails if the copy and the list ever disagree.
 */
import { DOORS, type CatalogEntry } from "./siteCatalog";

/** Each tool's address and its group in lib/toolsList.ts (checked by pagePlace.test.ts). */
export const TOOL_GROUPS_BY_HREF: Record<string, string> = {
  "/study/bible": "study",
  "/study/bible/search": "study",
  "/tools/wisdom-finder": "study",
  "/tools/bible-says": "study",
  "/tools/scripture-memory": "study",
  "/theology/glossary": "study",
  "/tools/quotes": "study",
  "/tools/test-the-case": "hard-questions",
  "/tools/which-lens": "hard-questions",
  "/disruption/consistency": "hard-questions",
  "/theology/compare": "hard-questions",
  "/theology/which-view": "hard-questions",
  "/nation/scorecard": "hard-questions",
  "/nation/policy": "hard-questions",
  "/diagnostic": "check-yourself",
  "/life/assessment": "check-yourself",
  "/tools/marriage-assessment": "check-yourself",
  "/tools/emotional-health": "check-yourself",
  "/tools/financial-health": "check-yourself",
  "/tools/spiritual-gifts": "check-yourself",
  "/tools/theology-quiz": "check-yourself",
  "/tools/prayer-generator": "pray-and-practise",
  "/tools/prayer-planner": "pray-and-practise",
  "/tools/worry-journal": "pray-and-practise",
  "/tools/connection-planner": "pray-and-practise",
  "/tools/rule-of-life": "pray-and-practise",
  "/tools/proverbs-31": "pray-and-practise",
  "/tools/conflict-guide": "pray-and-practise",
  "/tools/family-devotions": "family",
  "/tools/parent-teen-conversation": "family",
  "/tools/parenting-guide": "family",
  "/theology/passage": "elsewhere",
  "/resources/context": "elsewhere",
  "/tools/bible-on": "study",
  "/tools/verse-finder": "study",
  "/tools/parenting-verses": "study",
  "/tools/deep-bible": "study",
  "/tools/bible-study": "study",
  "/tools/life-audit": "check-yourself",
  "/tools/glossary": "study",
};

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
  const group = TOOL_GROUPS_BY_HREF[p];
  if (group) {
    if (group === "family") return { door: doorPart("family")! };
    const groupHref = `/tools#${group}`;
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
