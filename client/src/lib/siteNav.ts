/**
 * The site's grouped navigation, derived from the catalogue (lib/siteCatalog.ts).
 *
 * James chose seven doors on 2026-11-18 in place of the five of 2026-10-26:
 * Bible, History, Questions, Family, Tools, Essays, About, with Find Help,
 * search and Subscribe beside them on every page. Each door lists six rooms
 * or fewer. The catalogue holds the names, lines, icons and addresses; this
 * module keeps the older group shape for the code that reads it.
 *
 * A group's first link is the door's own page; the rest are its rooms. Every
 * link is a header link (`primary`). A group with one link (Essays) renders
 * in the header as that plain link, not a one-item menu.
 */
import { useEffect, useState } from "react";
import { DOORS, EVERYTHING_ENTRY, HELP_ENTRY, LIBRARY_ENTRY, SEARCH_SHORTCUT_IDS, entryById, type Room } from "./siteCatalog";

export interface SiteNavLink {
  label: string;
  href: string;
  /** true → render as a plain <a> (external / mailto), not a wouter <Link>. */
  external?: boolean;
  /** true → show in the header. */
  primary?: boolean;
}

export interface SiteNavGroup {
  title: string;
  links: SiteNavLink[];
}

/** The header's list for a group: only its primary links. */
export function headerLinks(group: SiteNavGroup): SiteNavLink[] {
  return group.links.filter((l) => l.primary);
}

/** A group with one header link renders as that plain link, not a menu. */
export function soleHeaderLink(group: SiteNavGroup): SiteNavLink | null {
  const links = headerLinks(group);
  return links.length === 1 ? links[0] : null;
}

/** Crisis care, one click from every page (header utility and footer). */
export const HELP_LINK: SiteNavLink = { label: HELP_ENTRY.name, href: HELP_ENTRY.href };

/** What this reader saved and started, kept on this device (phone menu and footer). */
export const LIBRARY_LINK: SiteNavLink = { label: LIBRARY_ENTRY.name, href: LIBRARY_ENTRY.href };

/** The one page of everything (phone menu, footer, search shortcuts). */
export const EVERYTHING_LINK: SiteNavLink = { label: EVERYTHING_ENTRY.name, href: EVERYTHING_ENTRY.href };

export const SITE_NAV_GROUPS: SiteNavGroup[] = DOORS.map((d) => ({
  title: d.name,
  links: [d.page, ...d.rooms].map((e) => ({ label: e.name, href: e.href, primary: true })),
}));

/** Shortcuts under the search box: where most searches were headed anyway. */
export const SEARCH_SHORTCUTS: SiteNavLink[] = SEARCH_SHORTCUT_IDS.map((id) => {
  const e = entryById(id)!;
  return { label: e.name, href: e.href };
});

/**
 * The one part of the map that is not typed in the catalogue: the case for
 * the faith's areas, which the library publishes one by one. A page that
 * lists everything (/explore, the Questions door's own page) calls this and
 * passes each room through the answer; until it arrives, and if it never
 * does, the rooms stand as the catalogue has them.
 *
 * The loader (lib/liveAreas.ts) and the manifest it reads are asked for only
 * after the page has loaded and the browser is idle, so the header and the
 * page's first paint never wait on them. This hook lives here, in a module
 * the header already loads, so using it adds no file to any page.
 */
export function useLiveAreas(on = true): ((room: Room) => Room) | null {
  const [apply, setApply] = useState<((room: Room) => Room) | null>(null);
  useEffect(() => {
    if (!on || typeof window === "undefined") return;
    let stale = false;
    const read = () => {
      if (stale) return;
      import("./liveAreas")
        .then((m) => m.loadLiveAreas())
        .then((fn) => {
          if (!stale) setApply(() => fn);
        })
        .catch(() => {});
    };
    const whenIdle = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(read, { timeout: 4000 });
      else window.setTimeout(read, 200);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    return () => {
      stale = true;
      window.removeEventListener("load", whenIdle);
    };
  }, [on]);
  return apply;
}
