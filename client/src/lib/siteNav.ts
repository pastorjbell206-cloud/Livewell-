
/**
 * The site's grouped navigation — one source of truth for the footer and the
 * header.
 *
 * LiveWell is James Bell's writing platform: the essays, the books, the
 * newsletter, theology, church history, justice, the hard questions — a place
 * to read, learn, and grow. The header carries only that identity, in four
 * doors named for what a reader came to do: Read, Topics, Grow, About.
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
    // "I want to read something." The writing itself, in every form it takes.
    title: "Read",
    links: [
      { label: "All the writing", href: "/writing", primary: true },
      { label: "Books", href: "/books", primary: true },
      { label: "Read a book free", href: "/read", primary: true },
      { label: "When faith has questions", href: "/writing?track=doubt", primary: true },
      { label: "Newsletter (Substack)", href: "https://substack.com/@jamesbell333289", external: true, primary: true },
      { label: "Marriage", href: "/marriage" },
      { label: "Parenting", href: "/parenting" },
      { label: "Article collections", href: "/article-collections" },
      { label: "Book bundles", href: "/book-bundles" },
      { label: "The Commonplace", href: "/library" },
      { label: "The book roadmap", href: "/roadmap" },
    ],
  },
  {
    // "What does he write about?" Theology, church history, justice, the
    // hard questions — the subjects, under headings a normal person uses.
    title: "Topics",
    links: [
      { label: "Explore everything", href: "/explore", primary: true },
      { label: "Theology, in depth", href: "/theology", primary: true },
      { label: "Church history", href: "/theology/history", primary: true },
      { label: "Justice", href: "/justice", primary: true },
      { label: "The church and power", href: "/disruption", primary: true },
      { label: "The historic faith", href: "/historic-faith", primary: true },
      { label: "Living well", href: "/living-well" },
      { label: "All six pillars", href: "/pillars" },
      { label: "The map", href: "/map" },
      { label: "The framework", href: "/framework" },
    ],
  },
  {
    // "I want to actually grow." Anything with a sequence, a practice, or a
    // question to answer — the learn-and-grow surface.
    title: "Grow",
    links: [
      { label: "Guided reading paths", href: "/pathways", primary: true },
      { label: "Study guides", href: "/studyguides", primary: true },
      { label: "Where are you? (assessments)", href: "/assessments", primary: true },
      { label: "Answers to hard questions", href: "/answers", primary: true },
      { label: "Tools", href: "/tools", primary: true },
      { label: "Reading paths", href: "/reading-paths" },
      { label: "Reading Scripture in context", href: "/resources/context" },
      { label: "How-to guides", href: "/how-tos" },
      { label: "Wisdom for all of life", href: "/wisdom" },
      { label: "Wisdom finder", href: "/tools/wisdom-finder" },
      { label: "Theology quiz", href: "/tools/theology-quiz" },
      { label: "Questions people ask", href: "/faq" },
      { label: "The Resource Hub", href: "/resources" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About James Bell", href: "/about", primary: true },
      { label: "Newsletter (Substack)", href: "https://substack.com/@jamesbell333289", external: true, primary: true },
      { label: "Membership", href: "/membership", primary: true },
      { label: "Contact", href: "mailto:Pastorjbell206@gmail.com", external: true, primary: true },
      { label: "Work with James", href: "/work-with-james" },
    ],
  },
  {
    // Footer-only (no primary links, so the header and mobile menus skip it).
    // This work is headed to its own homes — the pastors' material to the
    // Pastors Connection Network, the disciple-making tools to the
    // discipleship app — and until then every page stays live from here.
    title: "Pastors & Disciple-Makers",
    links: [
      { label: "Pastors Connection Network", href: "https://pastorsconnectionnetwork.com", external: true },
      { label: "PCN on LiveWell", href: "/pastors" },
      { label: "The leadership hub", href: "/leadership" },
      { label: "The Hard Issues Series", href: "/resources/hard-issues-series" },
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
