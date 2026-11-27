/**
 * The menu's six doors (James, 2026-11-27: "I like the Explore, Academy,
 * Bible Tools, Families, Churches, Publishing. I love that. That's kind of
 * what I want as the menu, but I want all of the pictures to drop down").
 *
 * Every room is a page the site already has, taken from the site catalogue
 * (lib/siteCatalog.ts) by id, so its name, line and address are the ones the
 * rest of the site uses. The Academy's paths are the tracks
 * (client/public/tracks/index.json; siteNav.test.tsx holds each slug and
 * title to it), named in the menu by who each is for (James, 2026-11-27: "no
 * one knows what those are"). The
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
export const ACADEMY_PATHS: { slug: string; title: string; label: string; line: string }[] = [
  { slug: "new-to-this", title: "New to faith, or coming back", label: "New to faith? Start here", line: "Who Jesus is, how to read the Bible and pray. Twelve 10-minute sessions." },
  { slug: "skeptical", title: "Weigh the case for yourself", label: "Not sure it's true? Weigh the evidence", line: "For skeptics: God, the Bible, the resurrection, with the case against first." },
  { slug: "stepped-back", title: "Your questions, taken seriously", label: "Stepped back from faith?", line: "Honest answers to the questions that made you walk away." },
  { slug: "deeper", title: "Study, history, doctrine", label: "Go deeper: study, history, doctrine", line: "How to study the Bible, what the church believes, and where it came from." },
  { slug: "mark", title: "Deep in one: the Gospel of Mark", label: "Read a whole book: Mark", line: "One Gospel, chapter by chapter, in sixteen sessions." },
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
      ...ACADEMY_PATHS.map((p): CatalogEntry => ({ id: `academy.${p.slug}`, name: p.label, line: p.line, href: `/tracks/${p.slug}`, icon: "Route" })),
      { ...E("history.course"), name: "Church history in 14 lessons", line: "From the apostles to today, one lesson at a time." },
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
