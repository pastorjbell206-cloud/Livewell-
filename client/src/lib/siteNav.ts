/**
 * The site's grouped navigation: one source of truth for the header and the
 * footer.
 *
 * LiveWell is a simple site James keeps adding to: helping people live well in
 * post-Christian America and understand the long history of the faith. The
 * header carries the five doors James chose on 2026-10-26, named for what a
 * reader came to do: Study (the Study Bible, church history, reading
 * Scripture in its world), Topics (the hard questions, with the answers,
 * plans, self-checks, and tools), Family (the household at the table),
 * Essays, and About (the man behind it, with his books, speaking, and
 * contact). Find Help, search, and Subscribe sit beside them on every page.
 * The old Resources door folded into Topics and Family; /resources stays live
 * as the one page of everything to use, at the foot of the Topics menu and in
 * the footer.
 *
 * Two surfaces, one map: `primary: true` puts a link in the header; the footer
 * shows every link in the group. A group with exactly one primary link renders
 * in the header as a plain link, not a one-item menu. Nothing is deleted: every
 * destination that left the header is still a live route, reachable from the
 * hub that now holds it (/study, /topics, /family, /resources, /tools).
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

/** What this reader saved and started, kept on this device (phone menu and footer). */
export const LIBRARY_LINK: SiteNavLink = { label: "My Library", href: "/my-library" };

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
    // The hard questions of life in post-Christian America, in the words
    // people bring them, and what to use on them: the topics index (/topics),
    // the honest answers, the care plans, the self-checks, and the tools. Most
    // of the old Resources door folded in here; /resources stays at the foot.
    title: "Topics",
    links: [
      { label: "Start here: every topic", href: "/topics", primary: true },
      { label: "Honest answers", href: "/answers", primary: true },
      { label: "Eight-week plans", href: "/plans", primary: true },
      { label: "Self-checks", href: "/assessments", primary: true },
      { label: "All tools", href: "/tools", primary: true },
      { label: "Find help in a hard season", href: "/help" },
      { label: "How-to guides", href: "/how-tos" },
      { label: "Downloads and PDFs", href: "/downloads" },
      { label: "The Hard Issues booklets", href: "/resources/hard-issues-series" },
      { label: "All resources, on one page", href: "/resources", primary: true },
    ],
  },
  {
    // The household: tonight's devotion, the year of them, the catechism, and
    // the reading plans, from the /family hub.
    title: "Family",
    links: [
      { label: "Start here: for families", href: "/family", primary: true },
      { label: "Tonight at the table", href: "/family/tonight", primary: true },
      { label: "The year of devotions", href: "/family/devotions", primary: true },
      { label: "The family catechism", href: "/family/catechism", primary: true },
      { label: "Family reading plans", href: "/family/reading-plans", primary: true },
    ],
  },
  {
    // A short shelf James has read and signed.
    title: "Essays",
    links: [{ label: "Essays", href: "/writing", primary: true }],
  },
  {
    // The person is the ministry: who James is, his books (the three titles
    // on the /books shelf), how to reach him, and the work that lives at its
    // own address.
    title: "About",
    links: [
      { label: "About James", href: "/about", primary: true },
      { label: "Books", href: "/books", primary: true },
      { label: "When God Bless America Replaces Thy Kingdom Come", href: "/books/when-god-bless-america" },
      { label: "The Monster in the Mirror", href: "/books/the-monster-in-the-mirror" },
      { label: "Believe", href: "/books/believe" },
      { label: "Speaking", href: "/speaking", primary: true },
      { label: "Contact", href: "/contact", primary: true },
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
  { label: "Topics", href: "/topics" },
  { label: "Tonight at the table", href: "/family/tonight" },
  { label: "Essays", href: "/writing" },
  { label: "Books", href: "/books" },
  { label: "Find help", href: "/help" },
];
