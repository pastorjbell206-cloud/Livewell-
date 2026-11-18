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
import { DOORS, EVERYTHING_ENTRY, HELP_ENTRY, LIBRARY_ENTRY, SEARCH_SHORTCUT_IDS, entryById } from "./siteCatalog";

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
