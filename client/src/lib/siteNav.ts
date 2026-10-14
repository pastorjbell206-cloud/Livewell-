/**
 * The site's grouped navigation — one source of truth for the header and the
 * footer.
 *
 * LiveWell is a simple site James keeps adding to: helping people live well in
 * post-Christian America and understand the long history of the faith. The
 * header carries five doors, named for what a reader came to do: Study (the
 * Study Bible, church history, reading Scripture in its world), Essays, Books,
 * Resources (downloads, tools, help, families), and About (the man behind it).
 * Find Help, search, and Subscribe sit beside them on every page.
 *
 * Two surfaces, one map: `primary: true` puts a link in the header; the footer
 * shows every link in the group. A group with exactly one primary link renders
 * in the header as a plain link, not a one-item menu. Nothing is deleted: every
 * destination that left the header is still a live route, reachable from the
 * hub that now holds it (/study, /resources, /tools).
 *
 * The map is committed and static, so the header paints in full before any
 * API call answers (the first-paint contract in CLAUDE.md).
 */
export interface SiteNavLink {
  label: string;
  href: string;
  /** true → render as a plain <a> (external / mailto), not a wouter <Link>. */
  external?: boolean;
  /** true → show in the header. The footer shows every link in the group. */
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
export const HELP_LINK: SiteNavLink = { label: "Find Help", href: "/help" };

export const SITE_NAV_GROUPS: SiteNavGroup[] = [
  {
    // The anchor of the site: the whole Bible, the church's long memory, and
    // how to read Scripture in the world it was written in.
    title: "Study",
    links: [
      { label: "Start here: study the Bible", href: "/study", primary: true },
      { label: "The Study Bible", href: "/study/bible", primary: true },
      { label: "Church history", href: "/theology/history", primary: true },
      { label: "Creeds and confessions", href: "/resources/creeds", primary: true },
      { label: "The Bible in its context", href: "/resources/context", primary: true },
      { label: "Study with a group", href: "/studyguides", primary: true },
    ],
  },
  {
    // A short shelf James has read and signed.
    title: "Essays",
    links: [
      { label: "Essays", href: "/writing", primary: true },
      { label: "Honest answers to hard questions", href: "/answers" },
    ],
  },
  {
    // The three books on the /books shelf.
    title: "Books",
    links: [
      { label: "Books", href: "/books", primary: true },
      { label: "When God Bless America Replaces Thy Kingdom Come", href: "/books/when-god-bless-america" },
      { label: "The Monster in the Mirror", href: "/books/the-monster-in-the-mirror" },
      { label: "Believe", href: "/books/believe" },
    ],
  },
  {
    // Things people use: the downloads, the tools, help in a hard season, and
    // the household.
    title: "Resources",
    links: [
      { label: "Resources", href: "/resources", primary: true },
      { label: "Downloads and PDFs", href: "/downloads" },
      { label: "The Hard Issues booklets", href: "/resources/hard-issues-series" },
      { label: "All tools", href: "/tools" },
      { label: "How-to guides", href: "/how-tos" },
      { label: "Find help in a hard season", href: "/help" },
      { label: "For families", href: "/family" },
    ],
  },
  {
    // The person is the ministry: who James is, how to reach him, and the
    // work that lives at its own address.
    title: "About",
    links: [
      { label: "About", href: "/about", primary: true },
      { label: "Speaking", href: "/speaking" },
      { label: "Contact", href: "/contact" },
      { label: "Newsletter", href: "/subscribe" },
      { label: "Following the Way (podcast)", href: "http://followingthewaypodcast.com/", external: true },
      { label: "Pastors Connection Network", href: "https://pastorsconnectionnetwork.com", external: true },
      { label: "ENDS", href: "https://endsinitiative.org", external: true },
    ],
  },
];

/** Shortcuts under the search box: where most searches were headed anyway. */
export const SEARCH_SHORTCUTS: SiteNavLink[] = [
  { label: "The Study Bible", href: "/study/bible" },
  { label: "Church history", href: "/theology/history" },
  { label: "Essays", href: "/writing" },
  { label: "Books", href: "/books" },
  { label: "Find help", href: "/help" },
];
