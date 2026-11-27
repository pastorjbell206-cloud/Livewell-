/**
 * The menu's six doors (James, 2026-11-27: "I like the Explore, Academy,
 * Bible Tools, Families, Churches, Publishing. I love that. That's kind of
 * what I want as the menu, but I want all of the pictures to drop down").
 *
 * Every room is a page the site already has, taken from the site catalogue
 * (lib/siteCatalog.ts) by id, so its name, line and address are the ones the
 * rest of the site uses. The Academy's rooms are its programs
 * (ACADEMY_PROGRAMS below). The catalogue's seven doors stay as they are: the footer, the door pages and
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

/**
 * The Academy's programs (client/public/academy/programs.json; siteNav.test.tsx
 * and scripts/validate-academy.mjs hold each slug and title to it), named in
 * the menu by who each is for (James, 2026-11-27: "no one knows what those
 * are"). Each opens at /academy/<slug>.
 */
export const ACADEMY_PROGRAMS: { slug: string; title: string }[] = [
  { slug: "exploring", title: "Exploring Christianity" },
  { slug: "new-to-faith", title: "New to Faith" },
  { slug: "big-story", title: "The Bible's Big Story" },
  { slug: "study", title: "How to Study the Bible" },
  { slug: "ot-books", title: "Deep in the Old Testament" },
  { slug: "books", title: "Deep in the New Testament" },
  { slug: "beliefs", title: "What Christians Believe" },
  { slug: "theology", title: "Theology in Depth" },
  { slug: "history", title: "Church History" },
  { slug: "living", title: "Living It" },
  { slug: "explain", title: "Explain It" },
  { slug: "teens", title: "Faith for Teenagers" },
  { slug: "home", title: "Faith at Home" },
];

/**
 * The menu's Academy rooms: the road's five levels (each opening its place on
 * /academy), then the two programs beside the road. Level titles are the
 * levels' own in programs.json (siteNav.test.tsx holds them to it).
 */
export const ACADEMY_ROOMS: CatalogEntry[] = [
  { id: "academy.level-1", name: "Level 1: Start", line: "First questions, and first steps for someone new to faith.", href: "/academy#level-1", icon: "Route" },
  { id: "academy.level-2", name: "Level 2: Read the whole Bible", line: "The Bible as one story, and how to study any page of it.", href: "/academy#level-2", icon: "Route" },
  { id: "academy.level-3", name: "Level 3: Know the books", line: "Eleven books of the Bible, read chapter by chapter.", href: "/academy#level-3", icon: "Route" },
  { id: "academy.level-4", name: "Level 4: Know what we believe, and why", line: "The creed, every major doctrine in depth, and church history.", href: "/academy#level-4", icon: "Route" },
  { id: "academy.level-5", name: "Level 5: Live it, and explain it", line: "Faith for an ordinary week, and the reasons given to others.", href: "/academy#level-5", icon: "Route" },
  { id: "academy.teens", name: "For teenagers", line: "Is it true, the Bible's story, who you are, hard things, friends.", href: "/academy/teens", icon: "Route" },
  { id: "academy.home", name: "For parents and families", line: "Every age from three to sixteen, hard seasons and the church year.", href: "/academy/home", icon: "Route" },
];

/** The Academy's front door (/academy). */
export const ACADEMY_ENTRY: CatalogEntry = { id: "academy.front", name: "The Academy", line: "Five levels, from first opening the Bible to explaining it to others.", href: "/academy", icon: "Route" };

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
    ACADEMY_ENTRY,
    ACADEMY_ROOMS,
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
      { id: "families.academy", name: "Faith at Home, in the Academy", line: "Short tracks for parents: leading faith at home, and the church year.", href: "/academy/home", icon: "Route" },
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
  if (under("/tracks", "/academy")) return "academy";
  if (under("/family")) return "families";
  if (under("/studyguides", "/downloads", "/plans", "/resources/hard-issues-series", "/speaking")) return "churches";
  if (under("/writing", "/books", "/about", "/connect", "/contact", "/subscribe", "/support")) return "publishing";
  if (under("/study", "/tools", "/resources/context")) return "bibletools";
  return null;
}
