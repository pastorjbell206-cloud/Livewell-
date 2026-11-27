/**
 * The menu's six doors (James, 2026-11-27: "I like the Explore, Academy,
 * Bible Tools, Families, Churches, Publishing. I love that. That's kind of
 * what I want as the menu, but I want all of the pictures to drop down").
 *
 * Every room is a page the site already has, taken from the site catalogue
 * (lib/siteCatalog.ts) by id, so its name, line and address are the ones the
 * rest of the site uses; the Academy's paths are the tracks' own titles
 * (client/public/tracks/index.json, held to them by siteNav.test.tsx). The
 * catalogue's seven doors stay as they are: the footer, the door pages and
 * /explore still read them.
 */
import { DOORS, EVERYTHING_ENTRY, entryById, type CatalogEntry, type Door, type DoorId } from "@/lib/siteCatalog";
import { GIVING, supportRooms } from "@/lib/giving";
import { DISCIPLINES } from "@/pages/preview/disciplines";

export type MenuId = "explore" | "academy" | "bibletools" | "families" | "churches" | "publishing";

const E = (id: string): CatalogEntry => {
  const e = entryById(id);
  if (!e) throw new Error(`menu: no catalogue entry "${id}"`);
  return e;
};
const doorPage = (id: DoorId) => DOORS.find((d) => d.id === id)!.page;
const door = (id: MenuId, name: string, page: CatalogEntry, rooms: CatalogEntry[], plate: Door["plate"]): Door => ({
  id: id as DoorId,
  name,
  icon: page.icon,
  plate,
  page,
  rooms: rooms.map((r) => ({ ...r })),
});

/** The Academy's paths, in the tracks' own words; each opens at /tracks/<slug>. */
export const ACADEMY_PATHS: { slug: string; title: string; line: string }[] = [
  { slug: "new-to-this", title: "New to faith, or coming back", line: "Twelve short sessions: who Jesus is, how to read and pray, the church." },
  { slug: "skeptical", title: "Weigh the case for yourself", line: "Twelve sessions with the case against stated first." },
  { slug: "stepped-back", title: "Your questions, taken seriously", line: "For the Christian who has stepped back." },
  { slug: "deeper", title: "Study, history, doctrine", line: "Down to the foundations, one session at a time." },
  { slug: "mark", title: "Deep in one: the Gospel of Mark", line: "A whole book, read slowly in sixteen sessions." },
];

const EXPLORE: Door = door(
  "explore",
  "Explore",
  EVERYTHING_ENTRY,
  DISCIPLINES.map((d) => ({ id: `explore.${d.id}`, name: d.name, line: d.line, href: `/explore/${d.id}`, icon: "Compass" })),
  "compass",
);

export const MENU_DOORS: Door[] = [
  EXPLORE,
  door(
    "academy",
    "Academy",
    E("bible.tracks"),
    [
      ...ACADEMY_PATHS.map((p): CatalogEntry => ({ id: `academy.${p.slug}`, name: p.title, line: p.line, href: `/tracks/${p.slug}`, icon: "Route" })),
      { ...E("history.course"), name: "Church history, in order", line: "Fourteen lessons, from the apostles to today." },
    ],
    "quill",
  ),
  door(
    "bibletools",
    "Bible Tools",
    doorPage("tools"),
    ["bible.read", "bible.films", "bible.how-to-study", "bible.search", "bible.word", "bible.cross-references", "bible.atlas", "bible.plans"].map(E),
    "book",
  ),
  door(
    "families",
    "Families",
    doorPage("family"),
    [
      ...["family.tonight", "family.devotions", "family.catechism", "family.plans", "bible.explorer"].map(E),
      { id: "academy.family", name: "Start at the table tonight", line: "A path for leading a family, twelve short sessions.", href: "/tracks/family", icon: "Route" },
    ],
    "house",
  ),
  door("churches", "Churches", E("tools.groups"), ["tools.groups", "bible.tracks", "tools.plans", "tools.booklets", "tools.downloads", "about.speaking"].map(E), "letter"),
  door(
    "publishing",
    "Publishing",
    doorPage("essays"),
    [
      { ...doorPage("essays"), id: "publishing.essays", name: "Essays", line: "Long-form essays on faith, history and the hard questions." },
      ...["about.books"].map(E),
      { ...doorPage("about"), id: "publishing.about", name: "About James", line: "Who writes LiveWell, and why." },
      ...["about.connect", "about.subscribe", "about.contact"].map(E),
      ...supportRooms(GIVING.open),
    ],
    "quill",
  ),
];

/** Which door holds a page: the one marked current in the bar. */
export function menuDoorForPath(path: string): MenuId | null {
  const p = path.split(/[?#]/)[0];
  const under = (...prefixes: string[]) => prefixes.some((x) => p === x || p.startsWith(`${x}/`));
  if (under("/explore", "/theology", "/topics", "/answers", "/questions", "/skeptics", "/resources/creeds", "/life", "/wisdom", "/how-tos")) return "explore";
  if (under("/tracks")) return "academy";
  if (under("/family")) return "families";
  if (under("/studyguides", "/downloads", "/plans", "/resources/hard-issues-series", "/speaking")) return "churches";
  if (under("/writing", "/books", "/about", "/connect", "/contact", "/subscribe", "/support")) return "publishing";
  if (under("/study", "/tools", "/resources/context")) return "bibletools";
  return null;
}
