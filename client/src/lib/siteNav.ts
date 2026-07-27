
/**
 * The site's grouped navigation — one source of truth for the footer and the
 * header.
 *
 * LiveWell is James Bell's writing platform: the essays, the books, the
 * newsletter, theology, church history, justice, the hard questions — a place
 * to read, learn, and grow. The header carries only that identity, in four
 * doors named for the KIND of thing a reader wants, which is how James asked
 * for it: Articles, Books, Tools, About. One door each, so the tools are never
 * a scavenger hunt and the books are never buried in a general menu.
 *
 * The pastors' work (bound for the Pastors Connection Network) and the
 * disciple-making tools (bound for the discipleship app) are deliberately kept
 * OUT of the header. Their pages stay live — nothing is deleted and no URL
 * breaks — but they live in a footer-only group until they move to their own
 * homes. A group with no `primary` links never appears in the header or the
 * mobile menu; the footer still shows it.
 *
 * Two surfaces, one map: `primary: true` puts a link in the header and renders
 * it prominently in the footer; everything else renders as the footer column's
 * compact tail. The header stays scannable and the footer stays short, but no
 * destination is ever lost.
 */
export interface SiteNavLink {
  label: string;
  href: string;
  /** true → render as a plain <a> (external / mailto), not a wouter <Link>. */
  external?: boolean;
  /**
   * true → show in the header, and as a full-size row in the footer. Links
   * without it render in the footer column's compact tail only.
   */
  primary?: boolean;
}

export interface SiteNavGroup {
  title: string;
  links: SiteNavLink[];
}

/**
 * The front door. A newcomer should never have to open a menu to find where to
 * begin, so this gets its own top-level spot beside the menus.
 */
export const START_NAV: SiteNavLink = {
  label: "Start Here",
  href: "/start",
};

/** The header's short list for a group: only its primary links. */
export function headerLinks(group: SiteNavGroup): SiteNavLink[] {
  return group.links.filter((l) => l.primary);
}

export const SITE_NAV_GROUPS: SiteNavGroup[] = [
  {
    // "I want to read." Everything written, and the subjects it is written on.
    title: "Articles",
    links: [
      { label: "All the writing", href: "/writing", primary: true },
      { label: "Explore everything", href: "/explore", primary: true },
      { label: "Theology", href: "/theology", primary: true },
      { label: "Church history", href: "/theology/history", primary: true },
      { label: "Justice", href: "/justice", primary: true },
      { label: "The church and power", href: "/disruption", primary: true },
      { label: "When faith has questions", href: "/writing?track=doubt", primary: true },
      { label: "Marriage", href: "/marriage" },
      { label: "Parenting", href: "/parenting" },
      { label: "Home and family", href: "/family" },
      { label: "Living well", href: "/living-well" },
      { label: "The historic faith", href: "/historic-faith" },
      { label: "All six pillars", href: "/pillars" },
      { label: "The map", href: "/map" },
      { label: "The framework", href: "/framework" },
      { label: "Article collections", href: "/article-collections" },
      { label: "The Commonplace", href: "/library" },
    ],
  },
  {
    // "I want a book." Everything book-shaped, including the free reader.
    title: "Books",
    links: [
      { label: "All books", href: "/books", primary: true },
      { label: "Read a book free", href: "/read", primary: true },
      { label: "Book bundles", href: "/book-bundles", primary: true },
      { label: "The book roadmap", href: "/roadmap" },
    ],
  },
  {
    // "I want something to use." Every tool, assessment, study and download in
    // one door, which is what James asked for: one place, not a scavenger hunt.
    title: "Tools",
    links: [
      { label: "All tools", href: "/tools", primary: true },
      { label: "Where are you? (assessments)", href: "/assessments", primary: true },
      { label: "Study guides and curriculum", href: "/studyguides", primary: true },
      { label: "Guided reading paths", href: "/pathways", primary: true },
      { label: "Downloads and PDFs", href: "/downloads", primary: true },
      { label: "Answers to hard questions", href: "/answers", primary: true },
      { label: "The Hard Issues Series", href: "/resources/hard-issues-series" },
      { label: "Wisdom for all of life", href: "/wisdom" },
      { label: "Wisdom finder", href: "/tools/wisdom-finder" },
      { label: "Theology quiz", href: "/tools/theology-quiz" },
      { label: "Reading Scripture in context", href: "/resources/context" },
      { label: "How-to guides", href: "/how-tos" },
      { label: "Reading paths", href: "/reading-paths" },
      { label: "Questions people ask", href: "/faq" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About James Bell", href: "/about", primary: true },
      { label: "Newsletter (Substack)", href: "https://substack.com/@jamesbell333289", external: true, primary: true },
      { label: "Following the Way (podcast)", href: "http://followingthewaypodcast.com/", external: true, primary: true },
      { label: "Contact", href: "mailto:Pastorjbell206@gmail.com", external: true, primary: true },
      { label: "Membership", href: "/membership" },
      { label: "Work with James", href: "/work-with-james" },
    ],
  },
  {
    // Footer-only (no primary links, so the header and mobile menus skip it).
    // Headed to their own homes: the pastors' material to the Pastors
    // Connection Network, the disciple-making tools to the discipleship app.
    title: "Pastors & Disciple-Makers",
    links: [
      { label: "Pastors Connection Network", href: "https://pastorsconnectionnetwork.com", external: true },
      { label: "PCN on LiveWell", href: "/pastors" },
      { label: "The leadership hub", href: "/leadership" },
      { label: "Church leadership", href: "/for-leaders" },
      { label: "Leadership library", href: "/leadership/library" },
      { label: "Sermon series library", href: "/leadership/sermon-series" },
      { label: "The pastoral angle", href: "/the-pastoral-angle" },
      { label: "Deep formation", href: "/leadership/formation" },
      { label: "The Table (disciple someone)", href: "/table" },
      { label: "Make disciples", href: "/disciple-making" },
      { label: "The Discipleship Pathway", href: "/discipleship" },
    ],
  },
];
