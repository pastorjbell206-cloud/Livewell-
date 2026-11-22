/**
 * The site's front matter: the header and footer drawn from the site
 * catalogue, the home page, the two hubs, and every place that points a
 * reader at a book. These hold the shape James approved on 2026-11-18: seven
 * doors (Bible, History, Questions, Family, Tools, Essays, About), six rooms
 * or fewer behind each, Find Help one click away everywhere, links only to
 * routes that exist, and book links only to titles on the /books shelf. The
 * catalogue's own rules (counts, one name per address) are in
 * siteCatalog.test.ts.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { act, fireEvent, screen, within } from "@testing-library/react";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { HELP_LINK, LIBRARY_LINK, SEARCH_SHORTCUTS, SITE_NAV_GROUPS, headerLinks, soleHeaderLink } from "./siteNav";
import { DOORS, EVERYTHING_ENTRY, START_LINK } from "./siteCatalog";
import { GIVING, supportRooms } from "./giving";
import { BOOK_SHELF, isShelfBookHref } from "./bookShelf";
import { START_WITH, SHELF_ESSAYS, isPublicEssay } from "./shelf";
import { HOME_HEADLINE, HOME_LINE, HOME_LINKED_HREF, HOME_LINKED_WORD, HOME_WHY } from "./positioning";
import { ANSWERS } from "@/data/answers";
import { bookFor } from "@/components/KeepReadingBook";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Study from "@/pages/Study";
import Resources from "@/pages/Resources";

const ROOT = path.resolve(__dirname, "../../..");
const APP = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf8");
const ROUTES = Array.from(APP.matchAll(/<Route\s+path="([^"]+)"/g), (m) => m[1]);

/** True when an internal href (query and hash dropped) matches a route in App.tsx. */
function isRoute(href: string): boolean {
  const target = href.split("#")[0].split("?")[0];
  return ROUTES.some((p) => {
    const rx = new RegExp(
      "^" +
        p
          .replace(/\/\*\?$/, "(?:/.*)?")
          .replace(/:[A-Za-z0-9_]+/g, "[^/]+")
          .replace(/\*/g, ".*") +
        "/?$"
    );
    return rx.test(target);
  });
}

const internal = (href: string) => href.startsWith("/");

const group = (title: string) => SITE_NAV_GROUPS.find((g) => g.title === title)!;
const MENU_DOORS = DOORS.filter((d) => d.rooms.length).map((d) => d.name);

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("the nav map", () => {
  it("has the seven doors James chose on 2026-11-18, in order", () => {
    expect(SITE_NAV_GROUPS.map((g) => g.title)).toEqual(["Bible", "History", "Questions", "Family", "Tools", "Essays", "About"]);
  });

  it("opens every door but Essays as a panel led by its own page, with six rooms or fewer", () => {
    const leads: Record<string, string> = { Bible: "/study", History: "/theology/history", Questions: "/topics", Family: "/family", Tools: "/tools", About: "/about" };
    for (const g of SITE_NAV_GROUPS) {
      if (g.title === "Essays") {
        expect(soleHeaderLink(g)?.href).toBe("/writing");
        continue;
      }
      expect(soleHeaderLink(g), g.title).toBeNull();
      expect(headerLinks(g)[0].href, g.title).toBe(leads[g.title]);
      expect(headerLinks(g).length - 1, g.title).toBeLessThanOrEqual(6);
    }
  });

  it("points every internal link at a route that exists", () => {
    const links = [...SITE_NAV_GROUPS.flatMap((g) => g.links), HELP_LINK, LIBRARY_LINK, ...SEARCH_SHORTCUTS];
    const dead = links.filter((l) => internal(l.href) && !isRoute(l.href)).map((l) => l.href);
    expect(dead).toEqual([]);
  });

  it("offers Everything on LiveWell and Find Help among the search shortcuts", () => {
    const hrefs = SEARCH_SHORTCUTS.map((l) => l.href);
    expect(hrefs).toContain("/explore");
    expect(hrefs).toContain("/help");
    expect(SEARCH_SHORTCUTS.length).toBeLessThanOrEqual(8);
  });

  it("keeps Books, Speaking, Find James, Contact and Subscribe under About, and no link to the pastors' network", () => {
    // Support this work follows Subscribe only once giving is open (lib/giving.json).
    expect(headerLinks(group("About")).map((l) => l.href)).toEqual(["/about", "/books", "/speaking", "/connect", "/contact", "/subscribe", ...supportRooms(GIVING.open).map((r) => r.href)]);
    // James, 2026-11-17: the Pastors Connection Network stays outside this site.
    expect(SITE_NAV_GROUPS.flatMap((g) => g.links).some((l) => /pastorsconnection/i.test(l.href + l.label.replace(/\s/g, "")))).toBe(false);
  });
});

describe("the header", () => {
  it("renders Find Help, search, and Subscribe beside the seven doors", () => {
    renderWithProviders(<MinimalNav />);
    expect(screen.getAllByRole("link", { name: "Find Help" })[0].getAttribute("href")).toBe("/help");
    expect(screen.getAllByRole("button", { name: /search/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Subscribe" })[0].getAttribute("href")).toBe("/subscribe");
    for (const name of MENU_DOORS) {
      expect(screen.getByRole("button", { name: new RegExp(`^${name}$`) }).getAttribute("aria-expanded"), name).toBe("false");
    }
    expect(screen.getByRole("link", { name: "Essays" }).getAttribute("href")).toBe("/writing");
  });

  it("opens each door's panel on its rooms, then Everything in the door and Start here", () => {
    renderWithProviders(<MinimalNav />);
    for (const door of DOORS.filter((d) => d.rooms.length)) {
      const button = screen.getByRole("button", { name: new RegExp(`^${door.name}$`) });
      fireEvent.click(button);
      expect(button.getAttribute("aria-expanded")).toBe("true");
      const panel = document.getElementById(`sn-panel-${door.id}`)!;
      const shown = within(panel).getAllByRole("link").map((a) => a.getAttribute("href"));
      expect(shown, door.name).toEqual([...door.rooms.map((r) => r.href), door.page.href, START_LINK.href]);
      expect(within(panel).getByRole("link", { name: `Everything in ${door.name}` })).toBeTruthy();
      expect(within(panel).getByRole("link", { name: "New here? Start here" })).toBeTruthy();
      // Every room shows its icon, its name and its one line.
      for (const r of door.rooms) {
        const a = within(panel).getByRole("link", { name: new RegExp(r.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
        expect(a.textContent).toContain(r.line);
        expect(a.querySelector("svg")).not.toBeNull();
      }
      fireEvent.click(button);
      expect(document.getElementById(`sn-panel-${door.id}`)).toBeNull();
    }
  });

  it("keeps a door's panel open when a mouse hovers and then clicks it", () => {
    renderWithProviders(<MinimalNav />);
    const about = screen.getByRole("button", { name: /^About$/ });
    fireEvent.mouseEnter(about.parentElement!);
    expect(document.getElementById("sn-panel-about")).not.toBeNull();
    fireEvent.click(about);
    expect(document.getElementById("sn-panel-about")).not.toBeNull();
    fireEvent.click(about);
    expect(document.getElementById("sn-panel-about")).toBeNull();
  });

  it("works by keyboard: arrows between doors, Down into a panel, Up and Down inside, Escape back", () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    renderWithProviders(<MinimalNav />);
    const bible = screen.getByRole("button", { name: /^Bible$/ });
    bible.focus();
    fireEvent.keyDown(bible, { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: /^History$/ }));
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    // Left from Bible wraps to the last door.
    expect(document.activeElement).toBe(screen.getByRole("button", { name: /^About$/ }));
    bible.focus();
    act(() => {
      fireEvent.keyDown(bible, { key: "ArrowDown" });
    });
    const panel = document.getElementById("sn-panel-bible")!;
    expect(panel).not.toBeNull();
    const links = within(panel).getAllByRole("link");
    // The panel renders after the key; focus its first room as the next frame would.
    links[0].focus();
    fireEvent.keyDown(links[0], { key: "ArrowDown" });
    expect(document.activeElement).toBe(links[1]);
    fireEvent.keyDown(links[1], { key: "End" });
    expect(document.activeElement).toBe(links[links.length - 1]);
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(document.getElementById("sn-panel-bible")).toBeNull();
    expect(document.activeElement).toBe(bible);
    vi.restoreAllMocks();
  });

  it("marks the door that holds the page in view", () => {
    const cases = [
      ["/books/believe", "About"],
      ["/family/tonight", "Family"],
      ["/resources/creeds", "History"],
      ["/study/bible/john/3", "Bible"],
      ["/answers", "Questions"],
      ["/plans", "Tools"],
      ["/writing", ""],
    ] as const;
    for (const [path, door] of cases) {
      window.history.pushState({}, "", path);
      const { unmount } = renderWithProviders(<MinimalNav />);
      for (const name of MENU_DOORS) {
        const current = screen.getByRole("button", { name: new RegExp(`^${name}$`) }).getAttribute("aria-current");
        expect(current, `${path}: ${name}`).toBe(name === door ? "true" : null);
      }
      unmount();
    }
  });
});

describe("the phone sheet", () => {
  it("leads with Start here, lists the seven doors, then Find Help, My Library, Everything and Subscribe", () => {
    renderWithProviders(<MinimalNav />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const sheet = document.getElementById("mobile-nav-panel")!;
    const first = within(sheet).getAllByRole("link")[0];
    expect(first.getAttribute("href")).toBe("/start");
    const doorNames = Array.from(sheet.querySelectorAll(".sn-sheet-door")).map((el) => el.textContent);
    expect(doorNames).toEqual(DOORS.map((d) => d.name));
    for (const [name, href] of [["Find Help", "/help"], ["My Library", "/my-library"], [EVERYTHING_ENTRY.name, "/explore"], ["Subscribe", "/subscribe"]]) {
      expect(within(sheet).getByRole("link", { name }).getAttribute("href"), name).toBe(href);
    }
  });

  it("opens a door to its rooms with the whole row, and a tap on the next door does not first fold the open one", () => {
    renderWithProviders(<MinimalNav />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const sheet = document.getElementById("mobile-nav-panel")!;
    const questions = within(sheet).getByRole("button", { name: "Questions" });
    fireEvent.click(questions);
    expect(within(sheet).getByRole("link", { name: "Honest Answers" }).getAttribute("href")).toBe("/answers");
    expect(within(sheet).getByRole("link", { name: "Everything in Questions" }).getAttribute("href")).toBe("/topics");
    const family = within(sheet).getByRole("button", { name: "Family" });
    fireEvent.mouseDown(family);
    expect(within(sheet).getByRole("link", { name: "Honest Answers" })).toBeTruthy();
    fireEvent.click(family);
    expect(within(sheet).getByRole("link", { name: "Tonight's devotion" }).getAttribute("href")).toBe("/family/tonight");
    expect(within(sheet).queryByRole("link", { name: "Honest Answers" })).toBeNull();
  });
});

describe("the footer", () => {
  it("shows the seven doors with each door's page and rooms, then My Library, Everything and the legal line", () => {
    renderWithProviders(<Footer />);
    const footer = screen.getByRole("contentinfo");
    for (const door of DOORS) {
      expect(within(footer).getByRole("heading", { name: door.name })).toBeTruthy();
      for (const e of [door.page, ...door.rooms]) {
        const found = within(footer).getAllByRole("link", { name: e.name });
        expect(found.some((a) => a.getAttribute("href") === e.href), e.name).toBe(true);
      }
    }
    for (const [name, href] of [["Find Help", "/help"], ["My Library", "/my-library"], ["Everything on LiveWell", "/explore"], ["Downloads", "/downloads"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Accessibility", "/accessibility"]]) {
      const found = within(footer).getAllByRole("link", { name });
      expect(found.some((a) => a.getAttribute("href") === href), name).toBe(true);
    }
    expect(footer.querySelector(".follow-row")).not.toBeNull();
  });
});

describe("book links", () => {
  it("lists the /books shelf as real routes with real covers", () => {
    for (const b of BOOK_SHELF) {
      expect(isRoute(b.href), b.href).toBe(true);
      expect(fs.existsSync(path.join(ROOT, "client/public", b.cover)), b.cover).toBe(true);
      expect(fs.existsSync(path.join(ROOT, "client/public", b.thumb)), b.thumb).toBe(true);
    }
  });

  it("sends /answers only to shelf books", () => {
    for (const a of ANSWERS) {
      if (a.bookHref === undefined) {
        expect(a.bookTitle, a.slug).toBeUndefined();
        continue;
      }
      expect(isShelfBookHref(a.bookHref), `${a.slug} → ${a.bookHref}`).toBe(true);
      expect(BOOK_SHELF.find((b) => b.href === a.bookHref)?.title).toBe(a.bookTitle);
    }
  });

  it("ends an essay only with a shelf book, or with none when nothing fits", () => {
    for (const e of SHELF_ESSAYS) {
      const book = bookFor({ slug: e.slug, pillar: null });
      if (book) expect(isShelfBookHref(book.href), e.slug).toBe(true);
    }
    expect(bookFor({ slug: "when-the-church-married-empire" })?.slug).toBe("a-higher-allegiance");
    expect(bookFor({ slug: "the-monster-is-never-the-one-in-the" })?.slug).toBe("blind-spots");
    expect(bookFor({ slug: "does-god-actually-exist" })?.slug).toBe("believe");
    expect(bookFor({ slug: "conscience-outsourced-to-party", pillar: "politics" })?.slug).toBe("a-higher-allegiance");
    expect(bookFor({ slug: "a-marriage-essay", pillar: "marriage" })).toBeNull();
    expect(bookFor({ slug: "some-essay", pillar: null })).toBeNull();
  });
});

describe("the home page", () => {
  it("says James's headline beside Plate I, with no photograph, opens the doors, and leads the desk with a shelf essay", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<Home />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.replace(/\u00A0/g, " ")).toBe(HOME_HEADLINE);
    // "post-Christian" in the headline opens the page that explains it.
    expect(within(h1).getByRole("link", { name: HOME_LINKED_WORD }).getAttribute("href")).toBe(HOME_LINKED_HREF);
    expect(isRoute(HOME_LINKED_HREF)).toBe(true);
    // The sentence under the headline is still the last sentence of James's paragraph (it opens /about's quote).
    expect(HOME_WHY.endsWith(HOME_LINE)).toBe(true);
    // ...and it stands under the headline, saying what the site is for.
    expect(document.querySelector(".home-hero__line")?.textContent).toBe(HOME_LINE);
    // The hero's picture is the drawn plate, never a photograph.
    expect(document.querySelector(".home-hero img")).toBeNull();
    expect(document.querySelector(".home-hero svg.lw-plate")).not.toBeNull();

    const doors = screen.getByRole("region", { name: "Where to begin." });
    for (const a of within(doors).getAllByRole("link")) expect(isRoute(a.getAttribute("href") ?? ""), a.getAttribute("href") ?? "").toBe(true);
    for (const [name, href] of [[/Read the Study Bible/, "/study/bible"], [/Essays/, "/writing"], [/Books/, "/books"]] as const) {
      expect(within(doors).getByRole("link", { name }).getAttribute("href")).toBe(href);
    }

    const lead = START_WITH.find((s) => isPublicEssay(s));
    expect(lead).toBeTruthy();
    expect(document.querySelector(`a[href="/writing/${lead}"]`), lead).not.toBeNull();
    for (const b of BOOK_SHELF) expect(document.querySelector(`main a[href="${b.href}"]`), b.href).not.toBeNull();
    expect(screen.getByRole("link", { name: "Find help for what you are facing" }).getAttribute("href")).toBe("/help");
    // The follow row (Substack, Facebook, RSS, every way to find James) stays on Home.
    expect(document.querySelector("main .follow-row")).not.toBeNull();
  });

  it("mirrors the hero strings in the prerendered HTML", () => {
    const src = fs.readFileSync(path.join(ROOT, "scripts/prerender-heads.mjs"), "utf8");
    for (const name of ["HOME_HEADLINE", "HOME_LINE", "HOME_LINKED_WORD", "HOME_LINKED_HREF"]) {
      expect(src, name).toContain(`positioningString("${name}")`);
    }
    expect(src).toContain('class="lw-frame-fig home-hero__art"');
    for (const cls of ["home-hero", "home-hero__title", "home-hero__line", "home-find", "home-find__input", "lw-frame__in"]) {
      expect(src, cls).toContain(`class="${cls}"`);
    }
    // No photograph of James on the front page, in either copy.
    const hero = src.slice(src.indexOf("function homeHeroHtml"), src.indexOf("function writeRoute"));
    expect(hero).not.toContain("<img");
  });
});

describe("the hubs", () => {
  it("/study is the Bible door: its page top, the shelf first, six rooms or fewer, then further in", () => {
    renderWithProviders(<Study />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Study the Bible");
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    // Between the rooms and "Go deeper": everything else in the door, from the catalogue (components/art/DoorInside).
    expect(h2s).toEqual(["Pick a book to open.", "Where to study.", "One step further in.", "Go deeper."]);
    // The rooms are picture cards, no more than six (PROJECT-PROMPT, the map).
    const rooms = document.querySelectorAll(".lw-rooms > li");
    expect(rooms.length).toBeGreaterThan(0);
    expect(rooms.length).toBeLessThanOrEqual(6);
    const hrefs = Array.from(document.querySelectorAll("main a[href^='/']")).map((a) => a.getAttribute("href")!);
    expect(hrefs.filter((h) => !isRoute(h))).toEqual([]);
    for (const h of ["/study/bible", "/study/bible/search", "/study/bible/story", "/study/bible/doctrines", "/study/bible/guides", "/theology/history", "/resources/creeds", "/resources/context", "/studyguides", "/tools", "/start"]) {
      expect(hrefs, h).toContain(h);
    }
    // "Everything in Bible" is complete: every room and every page inside a room, as the catalogue lists them.
    const bible = DOORS.find((d) => d.id === "bible")!;
    for (const r of bible.rooms) {
      expect(hrefs, r.href).toContain(r.href);
      for (const i of r.inside ?? []) expect(hrefs, i.href).toContain(i.href);
    }
  });

  it("/resources holds four short groups and reaches every tool through /tools", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<Resources />);
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2s).toEqual(["Downloads and PDFs", "Tools", "Help in a hard season", "For families"]);
    const hrefs = Array.from(document.querySelectorAll("main a[href^='/']")).map((a) => a.getAttribute("href")!);
    expect(hrefs.filter((h) => !isRoute(h))).toEqual([]);
    for (const h of ["/downloads", "/resources/hard-issues-series", "/tools", "/help", "/family"]) {
      expect(hrefs, h).toContain(h);
    }
  });
});
