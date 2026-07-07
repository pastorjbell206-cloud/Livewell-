import { pillarUrl } from "@/lib/taxonomy";

/**
 * The site's grouped navigation — one source of truth for the footer and the
 * header. The footer's five-column layout is the mental model the whole site
 * navigates by (The Pillars / Write & Read / Libraries & Tools / For Pastors /
 * Connect); the header renders these same groups so the two agree. Edit a link
 * once here and both surfaces update together.
 */
export interface SiteNavLink {
  label: string;
  href: string;
  /** true → render as a plain <a> (external / mailto), not a wouter <Link>. */
  external?: boolean;
}

export interface SiteNavGroup {
  title: string;
  links: SiteNavLink[];
}

export const SITE_NAV_GROUPS: SiteNavGroup[] = [
  {
    title: "The Pillars",
    links: [
      { label: "The Historic Faith", href: "/historic-faith" },
      { label: "The Six Pillars", href: "/pillars" },
      { label: "Theological Depth", href: "/theology" },
      { label: "Prophetic Justice", href: "/justice" },
      { label: "Prophetic Disruption", href: "/disruption" },
      { label: "Leadership Formation", href: "/leadership" },
      { label: "Living Well", href: "/living-well" },
    ],
  },
  {
    title: "Write & Read",
    links: [
      { label: "The Writing", href: "/writing" },
      { label: "Books", href: "/books" },
      { label: "The Library (read online)", href: "/read" },
      { label: "Reading Paths", href: "/reading-paths" },
      { label: "The Commonplace", href: "/library" },
      { label: "The Framework", href: "/framework" },
      { label: "Start Here", href: "/start" },
      { label: "Marriage", href: "/marriage" },
      { label: "Parenting", href: "/parenting" },
    ],
  },
  {
    title: "Libraries & Tools",
    links: [
      { label: "The Resource Hub", href: "/resources" },
      { label: "Study Guides", href: "/studyguides" },
      { label: "The Table (disciple someone)", href: "/table" },
      { label: "Reading Scripture in Context", href: "/resources/context" },
      { label: "Wisdom for All of Life", href: "/wisdom" },
      { label: "Wisdom Finder", href: "/tools/wisdom-finder" },
      { label: "How-To Guides", href: "/how-tos" },
      { label: "Questions people ask", href: "/faq" },
      { label: "Make Disciples", href: "/disciple-making" },
      { label: "Leadership Library", href: "/leadership/library" },
      { label: "Sermon Series Library", href: "/leadership/sermon-series" },
      { label: "The Discipleship Pathway", href: "/discipleship" },
      { label: "All Tools", href: "/tools" },
      { label: "Theology Quiz", href: "/tools/theology-quiz" },
    ],
  },
  {
    title: "For Pastors",
    links: [
      { label: "Pastors Connection Network", href: "/pastors" },
      { label: "The Pastoral Angle", href: pillarUrl("the-pastoral-angle") },
      { label: "The Leadership Hub", href: "/leadership" },
      { label: "The Hard Issues Series", href: "/resources/hard-issues-series" },
      { label: "Deep Formation", href: "/leadership/formation" },
      { label: "Church Leadership", href: "/for-leaders" },
      { label: "Downloads & Study Guides", href: "/resources" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "About James Bell", href: "/about" },
      { label: "Membership", href: "/membership" },
      { label: "Work With James", href: "/work-with-james" },
      { label: "Pastors Network", href: "https://pastorsconnectionnetwork.com", external: true },
      { label: "Substack Newsletter", href: "https://substack.com/@jamesbell333289", external: true },
      { label: "Contact", href: "mailto:Pastorjbell206@gmail.com", external: true },
    ],
  },
];
