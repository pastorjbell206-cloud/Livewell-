
/**
 * The site's grouped navigation — one source of truth for the footer and the
 * header.
 *
 * LiveWell is James Bell's writing platform: the essays, the books, the
 * newsletter, theology, church history, justice, the hard questions — a place
 * to read, learn, and grow. The header carries that identity in five doors
 * named for what the READER came to do, not for the author's filing system
 * (docs/WORLD-CLASS-SITE-PROMPT.md; the approved IA in
 * docs/SITE-STRATEGY-AUDIT.md §4): Read, Study, Answers, Grow, Books — with
 * "Start Here" standing beside them for the newcomer. Study is the one door
 * to the Bible tools and the church's history; Answers is the one door to
 * the hard questions; Grow holds the assessments, guides, and instruments.
 *
 * About, contact, membership, and the pastors' network live in a footer-only
 * group. A group with no `primary` links never appears in the header or the
 * mobile menu; the footer still shows it, and the newsletter form anchors
 * under it on every page. Nothing is deleted and no URL breaks: the retired
 * duplicate doors (/start-here, /framework, /church-history) 301 to the door
 * that survived.
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
    // "I want to read." The essays, the paths through them, and the subjects.
    title: "Read",
    links: [
      { label: "The Library: everything", href: "/explore", primary: true },
      { label: "All the writing", href: "/writing", primary: true },
      { label: "Reading paths", href: "/reading-paths", primary: true },
      { label: "Topic pathways", href: "/pathways", primary: true },
      { label: "The six pillars", href: "/pillars", primary: true },
      { label: "When faith has questions", href: "/writing?track=doubt", primary: true },
      { label: "Justice", href: "/justice", primary: true },
      { label: "The church and power", href: "/disruption", primary: true },
      { label: "Marriage", href: "/marriage" },
      { label: "Parenting", href: "/parenting" },
      { label: "Home and family", href: "/family" },
      { label: "Living well", href: "/living-well" },
      { label: "Article collections", href: "/article-collections" },
      { label: "The Commonplace", href: "/library" },
    ],
  },
  {
    // "I want to study the Bible, and know where the church came from." One
    // door, arranged by what the reader is holding: a passage, a topic, a
    // question, a book of the Bible, a word they do not know — then the
    // history and the theology the study stands on.
    title: "Study",
    links: [
      { label: "Study the Bible", href: "/study", primary: true },
      { label: "Study any passage", href: "/tools/deep-bible", primary: true },
      { label: "A passage in context", href: "/theology/passage", primary: true },
      { label: "What the Bible says about…", href: "/tools/bible-on", primary: true },
      { label: "Find a verse by topic", href: "/tools/verse-finder", primary: true },
      { label: "Twelve books, studied", href: "/tools/bible-study", primary: true },
      { label: "Church history", href: "/theology/history", primary: true },
      { label: "Theology", href: "/theology", primary: true },
      { label: "Wisdom for all of life", href: "/wisdom" },
      { label: "Wisdom finder", href: "/tools/wisdom-finder" },
      { label: "Scripture memory", href: "/tools/scripture-memory" },
      { label: "Theology glossary", href: "/tools/glossary" },
      { label: "The historic faith", href: "/historic-faith" },
      { label: "Reading Scripture in context", href: "/resources/context" },
    ],
  },
  {
    // "I have a hard question." One door to the honest answers.
    title: "Answers",
    links: [
      { label: "Honest answers to hard questions", href: "/answers", primary: true },
      { label: "Questions people ask", href: "/faq", primary: true },
      { label: "Test the case", href: "/tools/test-the-case", primary: true },
      { label: "Which lens are you reading through?", href: "/tools/which-lens", primary: true },
      { label: "The Hard Issues Series", href: "/resources/hard-issues-series", primary: true },
      { label: "Essays for skeptics and seekers", href: "/honest-questions" },
      { label: "Theology quiz", href: "/tools/theology-quiz" },
    ],
  },
  {
    // "I want to study and live it." The instruments, guides, and downloads.
    title: "Grow",
    links: [
      { label: "All tools", href: "/tools", primary: true },
      { label: "Where are you? (assessments)", href: "/assessments", primary: true },
      { label: "Study guides and curriculum", href: "/studyguides", primary: true },
      { label: "Downloads and PDFs", href: "/downloads", primary: true },
      { label: "Find help for what you are facing", href: "/help", primary: true },
      { label: "The whole of life", href: "/life" },
      { label: "How-to guides", href: "/how-tos" },
      { label: "Resources", href: "/resources" },
      { label: "The map", href: "/map" },
    ],
  },
  {
    // "I want a book." Three titles, each written by hand — James reduced the
    // shelf to the books that are entirely his. The free reader and the wide
    // paid catalog are archived (content/archive/), not deleted.
    title: "Books",
    links: [
      { label: "The books", href: "/books", primary: true },
      { label: "When God Bless America Replaces Thy Kingdom Come", href: "/books/when-god-bless-america", primary: true },
      { label: "The Monster in the Mirror", href: "/books/the-monster-in-the-mirror", primary: true },
      { label: "Believe", href: "/books/believe", primary: true },
      { label: "The book roadmap", href: "/roadmap" },
    ],
  },
  {
    // Footer-only (no primary links): who James is and how to reach him. The
    // newsletter form anchors under this group on every page (Footer.tsx).
    title: "About",
    links: [
      { label: "About James Bell", href: "/about" },
      { label: "Newsletter (Substack)", href: "https://substack.com/@jamesbell333289", external: true },
      { label: "Following the Way (podcast)", href: "http://followingthewaypodcast.com/", external: true },
      { label: "Contact", href: "mailto:Pastorjbell206@gmail.com", external: true },
      { label: "Membership", href: "/membership" },
      { label: "Work with James", href: "/work-with-james" },
      // The pastors' material now lives with the network it belongs to.
      { label: "Pastors Connection Network", href: "https://pastorsconnectionnetwork.com", external: true },
      { label: "ENDS", href: "https://endsinitiative.org", external: true },
    ],
  },
];
