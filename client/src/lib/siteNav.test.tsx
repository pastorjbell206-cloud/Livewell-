/**
 * The simplified site's front matter: the committed nav map (header and
 * footer), the home page, the two hubs, and every place that points a reader
 * at a book. These hold the shape James approved: the five header doors he
 * chose on 2026-10-26 (Study, Topics, Family, Essays, About), Find Help one
 * click away everywhere, links only to routes that exist, and book links only
 * to titles on the /books shelf.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fireEvent, screen, within } from "@testing-library/react";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { HELP_LINK, LIBRARY_LINK, SEARCH_SHORTCUTS, SITE_NAV_GROUPS, headerLinks, soleHeaderLink } from "./siteNav";
import { BOOK_SHELF, isShelfBookHref } from "./bookShelf";
import { START_WITH, SHELF_ESSAYS, isPublicEssay } from "./shelf";
import { HOME_HEADLINE, HOME_WHO, HOME_WHY } from "./positioning";
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

/**
 * The Topics door opens /topics, which U25 builds in the same wave. Until that
 * route is in App.tsx it is the one nav link allowed to wait for its page;
 * once it is routed this set changes nothing and can go. Never add to it.
 */
const AWAITING_ITS_PAGE = new Set(["/topics"]);

/** The 2026-10-12 Resources group, every link of which now lives elsewhere. */
const FORMER_RESOURCES = [
  "/resources",
  "/my-library",
  "/downloads",
  "/resources/hard-issues-series",
  "/tools",
  "/assessments",
  "/how-tos",
  "/help",
  "/plans",
  "/family",
];

const group = (title: string) => SITE_NAV_GROUPS.find((g) => g.title === title)!;

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("the nav map", () => {
  it("has the five header doors James chose, in order", () => {
    const header = SITE_NAV_GROUPS.filter((g) => headerLinks(g).length > 0).map((g) => g.title);
    expect(header).toEqual(["Study", "Topics", "Family", "Essays", "About"]);
    expect(SITE_NAV_GROUPS.map((g) => g.title)).toEqual(header);
  });

  it("opens Study, Topics, Family, and About as menus, each led by its own page, and Essays as a plain link", () => {
    const leads: Record<string, string> = { Study: "/study", Topics: "/topics", Family: "/family", About: "/about" };
    for (const g of SITE_NAV_GROUPS) {
      if (g.title === "Essays") {
        expect(soleHeaderLink(g)?.href).toBe("/writing");
        continue;
      }
      expect(soleHeaderLink(g), g.title).toBeNull();
      expect(headerLinks(g)[0].href, g.title).toBe(leads[g.title]);
      expect(headerLinks(g).length, g.title).toBeLessThanOrEqual(7);
    }
  });

  it("points every internal link at a route that exists", () => {
    const links = [...SITE_NAV_GROUPS.flatMap((g) => g.links), HELP_LINK, LIBRARY_LINK, ...SEARCH_SHORTCUTS];
    const dead = links
      .filter((l) => internal(l.href) && !isRoute(l.href) && !AWAITING_ITS_PAGE.has(l.href))
      .map((l) => l.href);
    expect(dead).toEqual([]);
  });

  it("folds Resources into Topics and Family, and keeps /resources at the foot of the Topics menu", () => {
    const hrefs = new Set([...SITE_NAV_GROUPS.flatMap((g) => g.links.map((l) => l.href)), LIBRARY_LINK.href]);
    expect(FORMER_RESOURCES.filter((h) => !hrefs.has(h))).toEqual([]);
    expect(headerLinks(group("Topics")).at(-1)?.href).toBe("/resources");
    expect(group("Topics").links.at(-1)?.href).toBe("/resources");
    for (const h of ["/answers", "/plans", "/assessments", "/tools"]) {
      expect(headerLinks(group("Topics")).map((l) => l.href), h).toContain(h);
    }
    for (const h of ["/family/tonight", "/family/devotions", "/family/catechism", "/family/reading-plans"]) {
      expect(headerLinks(group("Family")).map((l) => l.href), h).toContain(h);
    }
  });

  it("puts Books under About, beside Speaking and Contact, with the three titles in the footer", () => {
    expect(headerLinks(group("About")).map((l) => l.href)).toEqual(["/about", "/books", "/speaking", "/contact"]);
    const about = group("About").links.map((l) => l.href);
    for (const b of BOOK_SHELF) expect(about, b.href).toContain(b.href);
  });

  it("marks outbound and mailto links external, and nothing else", () => {
    for (const l of SITE_NAV_GROUPS.flatMap((g) => g.links)) {
      expect(Boolean(l.external), l.href).toBe(!internal(l.href));
    }
  });

  it("keeps Speaking, Contact, PCN, and ENDS under About", () => {
    const about = SITE_NAV_GROUPS.find((g) => g.title === "About")!.links;
    const byLabel = new Map(about.map((l) => [l.label, l] as const));
    expect(byLabel.get("Speaking")?.href).toBe("/speaking");
    expect(byLabel.get("Contact")?.href).toBe("/contact");
    expect(byLabel.get("Pastors Connection Network")?.external).toBe(true);
    expect(byLabel.get("ENDS")?.external).toBe(true);
  });
});

describe("the header and footer", () => {
  it("renders Find Help, search, and Subscribe beside the five doors", () => {
    renderWithProviders(<MinimalNav />);
    expect(screen.getAllByRole("link", { name: "Find Help" })[0].getAttribute("href")).toBe("/help");
    expect(screen.getAllByRole("button", { name: /search/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Subscribe" })[0].getAttribute("href")).toBe("/subscribe");
    for (const name of ["Study", "Topics", "Family", "About"]) {
      expect(screen.getByRole("button", { name: new RegExp(`^${name}$`) }).getAttribute("aria-haspopup"), name).toBe("menu");
    }
    expect(screen.getByRole("link", { name: "Essays" }).getAttribute("href")).toBe("/writing");
    for (const name of ["Books", "Resources"]) expect(screen.queryByRole("link", { name }), name).toBeNull();
  });

  it("opens each door's menu on its own links", () => {
    renderWithProviders(<MinimalNav />);
    for (const title of ["Topics", "Family", "About"]) {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${title}$`) }));
      const menu = screen.getByRole("menu");
      const shown = within(menu).getAllByRole("link").map((a) => a.getAttribute("href"));
      expect(shown, title).toEqual(headerLinks(group(title)).map((l) => l.href));
      fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${title}$`) }));
    }
  });

  it("keeps a door's menu open when a mouse hovers and then clicks it", () => {
    // About was a plain link until 2026-10-26. The click a mouse makes after
    // hovering must not fold the menu the hover just opened.
    renderWithProviders(<MinimalNav />);
    const about = screen.getByRole("button", { name: /^About$/ });
    fireEvent.mouseEnter(about);
    expect(within(screen.getByRole("menu")).getByRole("link", { name: "About James" })).toBeTruthy();
    fireEvent.click(about);
    expect(within(screen.getByRole("menu")).getByRole("link", { name: "About James" })).toBeTruthy();
    fireEvent.click(about);
    expect(screen.queryByRole("menu")).toBeNull();
    // By keyboard (no hover), Enter on the door toggles it as before.
    const family = screen.getByRole("button", { name: /^Family$/ });
    fireEvent.click(family);
    expect(within(screen.getByRole("menu")).getByRole("link", { name: "Tonight at the table" })).toBeTruthy();
    fireEvent.click(family);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("marks the door that holds the page in view", () => {
    const cases = [
      ["/books/believe", "About"],
      ["/family/tonight", "Family"],
      ["/resources/creeds", "Study"],
      ["/resources", "Topics"],
      ["/writing", ""],
    ] as const;
    for (const [path, door] of cases) {
      window.history.pushState({}, "", path);
      const { unmount } = renderWithProviders(<MinimalNav />);
      for (const name of ["Study", "Topics", "Family", "About"]) {
        const current = screen.getByRole("button", { name: new RegExp(`^${name}$`) }).getAttribute("aria-current");
        expect(current, `${path}: ${name}`).toBe(name === door ? "true" : null);
      }
      unmount();
    }
  });

  it("on a phone, a door's whole row is its toggle, not only the chevron", () => {
    renderWithProviders(<MinimalNav />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const row = screen.getByRole("button", { name: "Show About links" });
    expect(row.textContent).toBe("About");
    fireEvent.click(row);
    const panel = document.getElementById("mobile-nav-panel")!;
    expect(within(panel).getByRole("link", { name: "About James" }).getAttribute("href")).toBe("/about");
  });

  it("on a phone, a tap on the next door's toggle does not first fold the open one", () => {
    // Folding on mousedown shifts the panel, so the click lands on whatever
    // moved under the finger and the next door never opens.
    renderWithProviders(<MinimalNav />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Show Topics links" }));
    const panel = document.getElementById("mobile-nav-panel")!;
    expect(within(panel).getByRole("link", { name: "Start here: every topic" })).toBeTruthy();
    const family = screen.getByRole("button", { name: "Show Family links" });
    fireEvent.mouseDown(family);
    expect(within(panel).getByRole("link", { name: "Start here: every topic" })).toBeTruthy();
    fireEvent.click(family);
    expect(within(panel).getByRole("link", { name: "Tonight at the table" }).getAttribute("href")).toBe("/family/tonight");
    expect(within(panel).queryByRole("link", { name: "Start here: every topic" })).toBeNull();
  });

  it("mirrors every group in the footer and keeps Find Help and My Library in it", () => {
    renderWithProviders(<Footer />);
    const footer = screen.getByRole("contentinfo");
    for (const g of SITE_NAV_GROUPS) {
      expect(within(footer).getByRole("heading", { name: g.title })).toBeTruthy();
      for (const l of g.links) {
        const found = within(footer).getAllByRole("link", { name: l.label });
        expect(found.some((a) => a.getAttribute("href") === l.href), l.label).toBe(true);
      }
    }
    expect(within(footer).getByRole("link", { name: "Find Help" }).getAttribute("href")).toBe("/help");
    expect(within(footer).getByRole("link", { name: "My Library" }).getAttribute("href")).toBe("/my-library");
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
    expect(bookFor({ slug: "when-the-church-married-empire" })?.slug).toBe("when-god-bless-america");
    expect(bookFor({ slug: "the-monster-is-never-the-one-in-the" })?.slug).toBe("the-monster-in-the-mirror");
    expect(bookFor({ slug: "does-god-actually-exist" })?.slug).toBe("believe");
    expect(bookFor({ slug: "conscience-outsourced-to-party", pillar: "politics" })?.slug).toBe("when-god-bless-america");
    expect(bookFor({ slug: "a-marriage-essay", pillar: "marriage" })).toBeNull();
    expect(bookFor({ slug: "some-essay", pillar: null })).toBeNull();
  });
});

describe("the home page", () => {
  it("says who and why, opens three doors, and starts with three shelf essays", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(HOME_HEADLINE);
    expect(screen.getByText(HOME_WHY)).toBeTruthy();
    expect(screen.getByText(HOME_WHO)).toBeTruthy();

    for (const [name, href] of [[/Study the Bible/, "/study/bible"], [/Read the essays/, "/writing"], [/^The books/, "/books"]] as const) {
      expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(href);
    }

    const starts = START_WITH.filter((s) => isPublicEssay(s)).slice(0, 3);
    expect(starts).toHaveLength(3);
    for (const slug of starts) {
      expect(document.querySelector(`a[href="/writing/${slug}"]`), slug).not.toBeNull();
    }
    for (const b of BOOK_SHELF) expect(document.querySelector(`main a[href="${b.href}"]`), b.href).not.toBeNull();
    expect(screen.getByRole("link", { name: "Find help for what you are facing" }).getAttribute("href")).toBe("/help");
    expect(screen.getAllByPlaceholderText(/you@example\.com/i).length).toBeGreaterThan(0);
  });

  it("mirrors the hero strings in the prerendered HTML", () => {
    const src = fs.readFileSync(path.join(ROOT, "scripts/prerender-heads.mjs"), "utf8");
    for (const name of ["HOME_HEADLINE", "HOME_WHY", "HOME_WHO", "PORTRAIT_URL"]) {
      expect(src, name).toContain(`positioningString("${name}")`);
    }
    for (const cls of ["home-hero", "home-hero__title", "home-hero__text", "home-hero__portrait"]) {
      expect(src, cls).toContain(`class="${cls}"`);
    }
  });
});

describe("the hubs", () => {
  it("/study leads with the Study Bible and links only to real routes", () => {
    renderWithProviders(<Study />);
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2s.slice(0, 4)).toEqual([
      "The Study Bible",
      "Church history",
      "Reading the Bible in its context",
      "Study with a group",
    ]);
    const hrefs = Array.from(document.querySelectorAll("main a[href^='/']")).map((a) => a.getAttribute("href")!);
    expect(hrefs.filter((h) => !isRoute(h))).toEqual([]);
    for (const h of ["/study/bible", "/study/bible/story", "/study/bible/doctrines", "/study/bible/guides", "/theology/history", "/resources/creeds", "/resources/context", "/studyguides", "/tools"]) {
      expect(hrefs, h).toContain(h);
    }
    expect(screen.getByText(/still being written/)).toBeTruthy();
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
