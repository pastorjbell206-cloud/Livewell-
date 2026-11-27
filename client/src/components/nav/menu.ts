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
export const ACADEMY_PROGRAMS: { slug: string; title: string; label: string; line: string }[] = [
  { slug: "exploring", title: "Exploring Christianity", label: "Not sure it's true? Explore", line: "Who Jesus was, the evidence, and the hardest objections, stated fairly." },
  { slug: "new-to-faith", title: "New to Faith", label: "New to faith? Start here", line: "The gospel, prayer, the Bible, and the habits of a Christian life." },
  { slug: "big-story", title: "The Bible's Big Story", label: "Never read the Bible? The whole story", line: "Creation to new creation, the Old Testament and the New, as one story." },
  { slug: "study", title: "How to Study the Bible", label: "Learn to study the Bible", line: "Seven steps, each kind of book, the Bible's world, and the tools." },
  { slug: "books", title: "Deep in One Book", label: "Know one book well", line: "Mark, John, Genesis, the Psalms and Romans, chapter by chapter." },
  { slug: "beliefs", title: "What Christians Believe", label: "What Christians believe, and why", line: "The creed line by line, the core doctrines, and where Christians differ." },
  { slug: "history", title: "Church History", label: "Church history in fourteen lessons", line: "Two thousand years of the church, and how each age read the Bible." },
  { slug: "living", title: "Living It", label: "Faith for an ordinary week", line: "Marriage, work, money, rest, and the heavy seasons." },
  { slug: "teens", title: "Faith for Teenagers", label: "For teenagers", line: "Is it true, the Bible's story, and who you are. Short sessions." },
  { slug: "home", title: "Faith at Home", label: "For parents and families", line: "Leading faith at home, the hard questions, and the church year." },
];

/** The Academy's front door (/academy). */
export const ACADEMY_ENTRY: CatalogEntry = { id: "academy.home", name: "The Academy", line: "Ten programs, from your first questions to reading the Bible well.", href: "/academy", icon: "Route" };

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
    ACADEMY_PROGRAMS.map((p): CatalogEntry => ({ id: `academy.${p.slug}`, name: p.label, line: p.line, href: `/academy/${p.slug}`, icon: "Route" })),
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
