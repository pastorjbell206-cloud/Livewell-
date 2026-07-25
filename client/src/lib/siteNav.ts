
/**
 * The site's grouped navigation — one source of truth for the footer and the
 * header. The footer's five-column layout is the mental model the whole site
 * navigates by (The Pillars / Write & Read / Libraries & Tools / Family /
 * Connect); the header renders these same groups so the two agree. Edit a link
 * once here and both surfaces update together.
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
    title: "The Pillars",
    links: [
      { label: "The Historic Faith", href: "/historic-faith", primary: true },
      { label: "Theological Depth", href: "/theology", primary: true },
      { label: "Prophetic Justice", href: "/justice", primary: true },
      { label: "Prophetic Disruption", href: "/disruption", primary: true },
      { label: "Living Well", href: "/living-well", primary: true },
      { label: "All six pillars", href: "/pillars", primary: true },
      { label: "The Map", href: "/map", primary: true },
    ],
  },
  {
    title: "Write & Read",
    links: [
      { label: "The Writing", href: "/writing", primary: true },
      { label: "Doubt & Faith", href: "/writing?track=doubt", primary: true },
      { label: "Books", href: "/books", primary: true },
      { label: "The Library (read online)", href: "/read", primary: true },
      { label: "Reading Paths", href: "/reading-paths", primary: true },
      { label: "Start Here", href: "/start", primary: true },
      { label: "The Commonplace", href: "/library" },
      { label: "The Framework", href: "/framework" },
    ],
  },
  {
    title: "Libraries & Tools",
    links: [
      { label: "Explore Everything", href: "/explore", primary: true },
      { label: "Answers to Hard Questions", href: "/answers", primary: true },
      { label: "Assessments (where are you?)", href: "/assessments", primary: true },
      { label: "The Resource Hub", href: "/resources", primary: true },
      { label: "Topic Pathways", href: "/pathways", primary: true },
      { label: "Study Guides", href: "/studyguides", primary: true },
      { label: "Make Disciples", href: "/disciple-making", primary: true },
      { label: "The Discipleship Pathway", href: "/discipleship", primary: true },
      { label: "All Tools", href: "/tools", primary: true },
      { label: "Theology Quiz", href: "/tools/theology-quiz", primary: true },
      { label: "The Table (disciple someone)", href: "/table" },
      { label: "Reading Scripture in Context", href: "/resources/context" },
      { label: "Wisdom for All of Life", href: "/wisdom" },
      { label: "Wisdom Finder", href: "/tools/wisdom-finder" },
      { label: "How-To Guides", href: "/how-tos" },
      { label: "Questions people ask", href: "/faq" },
    ],
  },
  {
    // Replaces the former "For Pastors" group. The pastoring and leadership
    // material now lives with the Pastors Connection Network; this tab gathers
    // the household work that was scattered across the other groups.
    title: "Family",
    links: [
      { label: "Marriage", href: "/marriage", primary: true },
      { label: "Parenting", href: "/parenting", primary: true },
      { label: "Family Devotions", href: "/family/devotions", primary: true },
      { label: "The Family Catechism", href: "/family/catechism", primary: true },
      { label: "Family Reading Plans", href: "/family/reading-plans", primary: true },
      { label: "Marriage Health Assessment", href: "/tools/marriage-assessment", primary: true },
      { label: "Family Devotion Builder", href: "/tools/family-devotions" },
      { label: "Parenting Stage Guide", href: "/tools/parenting-guide" },
      { label: "Scripture for Parents", href: "/tools/parenting-verses" },
      { label: "Raising Believers", href: "/raising-believers" },
      { label: "Everything for the household", href: "/family" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "About James Bell", href: "/about", primary: true },
      { label: "Membership", href: "/membership", primary: true },
      { label: "Work With James", href: "/work-with-james", primary: true },
      { label: "Contact", href: "mailto:Pastorjbell206@gmail.com", external: true, primary: true },
      { label: "Pastors Network", href: "https://pastorsconnectionnetwork.com", external: true },
      { label: "Substack Newsletter", href: "https://substack.com/@jamesbell333289", external: true },
    ],
  },
];
