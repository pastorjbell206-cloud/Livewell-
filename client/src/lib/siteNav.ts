
/**
 * The site's grouped navigation — one source of truth for the footer and the
 * header.
 *
 * The groups are named for what a READER came to do, not for how the content is
 * filed. Somebody arrives thinking "I am new here", "I want to read something",
 * "I want to actually grow", "I lead a church", or "who is this guy" — so those
 * are the doors. The six pillars are still the filing spine of the whole site
 * (taxonomy.ts), but a person in trouble does not think in pillars, so they live
 * inside Read as topics rather than as a top-level menu.
 *
 * Two surfaces, one map: `primary: true` puts a link in the header, and the
 * footer shows everything. The header stays scannable; nothing is ever lost,
 * because every link still has a home in the footer.
 */
export interface SiteNavLink {
  label: string;
  href: string;
  /** true → render as a plain <a> (external / mailto), not a wouter <Link>. */
  external?: boolean;
  /**
   * true → also show in the header. The footer is the full site map; the header
   * shows only the essentials of each group so the menus stay short and easy to
   * scan. Leave it off and the link lives in the footer only.
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

/** The one destination that gets its own top-level spot in the header. */
export const TABLE_NAV: SiteNavLink = {
  label: "The Table",
  href: "/table",
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
    // "I want to actually grow." Anything with a sequence, a practice, or a
    // question to answer — the self-discipleship surface.
    title: "Grow",
    links: [
      { label: "Guided reading paths", href: "/pathways", primary: true },
      { label: "Study guides", href: "/studyguides", primary: true },
      { label: "Where are you? (assessments)", href: "/assessments", primary: true },
      { label: "Answers to hard questions", href: "/answers", primary: true },
      { label: "Tools", href: "/tools", primary: true },
      { label: "The Discipleship Pathway", href: "/discipleship" },
      { label: "Make disciples", href: "/disciple-making" },
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
    // "What does he write about?" The six pillars are the site's real spine, so
    // they keep a home — but under a heading a normal person understands.
    title: "Topics",
    links: [
      { label: "Explore everything", href: "/explore", primary: true },
      { label: "The historic faith", href: "/historic-faith", primary: true },
      { label: "Theology, in depth", href: "/theology", primary: true },
      { label: "Justice", href: "/justice", primary: true },
      { label: "The church and power", href: "/disruption", primary: true },
      { label: "Living well", href: "/living-well", primary: true },
      { label: "Leadership formation", href: "/leadership" },
      { label: "All six pillars", href: "/pillars" },
      { label: "The map", href: "/map" },
      { label: "The framework", href: "/framework" },
    ],
  },
  {
    // Unchanged in substance: this door already worked.
    title: "For Pastors",
    links: [
      { label: "Pastors Connection Network", href: "/pastors", primary: true },
      { label: "The leadership hub", href: "/leadership", primary: true },
      { label: "The Hard Issues Series", href: "/resources/hard-issues-series", primary: true },
      { label: "Church leadership", href: "/for-leaders", primary: true },
      { label: "Leadership library", href: "/leadership/library" },
      { label: "Sermon series library", href: "/leadership/sermon-series" },
      { label: "The pastoral angle", href: "/the-pastoral-angle" },
      { label: "Deep formation", href: "/leadership/formation" },
      { label: "Downloads and study guides", href: "/resources" },
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
      { label: "Pastors Network", href: "https://pastorsconnectionnetwork.com", external: true },
    ],
  },
];
