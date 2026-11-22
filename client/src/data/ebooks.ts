/**
 * Every ebook on the site, free to download (James, 2026-11-18: "give away for
 * free for people to download", everything free, nothing sold as an ebook).
 * Nine books here, and the three booklets for church leaders beside them.
 *
 * Read by /downloads (the one page that shows them all), /books, each book's
 * own page, and the build-time catalogue (scripts/build-catalogue.mjs), so
 * the list cannot drift. The Hard Issues booklets for church leaders stay in
 * data/booklets.ts and are shown beside these.
 *
 * Every line is the description the site already had for the book, from its
 * own page. Nothing here is new copy.
 *
 * HELD_EBOOKS are not served and not listed (content/held-downloads/README.md).
 * Seven name the Pastors Connection Network inside the file and wait for
 * James's corrected files. The sixteen older titles he took down to rewrite
 * in his own hand stay off too (James, 2026-11-18: "Keep them off for now").
 *
 * Kept as pure data (no imports) so the build scripts can read it.
 */
/** "leaders" is the Hard Issues booklets (data/booklets.ts), shelved beside these on /downloads. */
export type EbookGroup = "james" | "questions" | "leaders";

export interface Ebook {
  group: EbookGroup;
  slug: string;
  title: string;
  line: string;
  /** Cover image (a webp where one exists). */
  cover: string;
  pdf: string;
  epub?: string;
  /** The book's own page, when it has one. */
  page?: string;
  /**
   * The title printed inside the file, when the site's title is newer than
   * the file (James renamed two books on 2026-11-22; the PDFs and EPUBs are
   * finished files and still say the old title). Shown as "Published earlier
   * as ...". Remove it when his corrected file is in place.
   */
  formerly?: string;
}

/** Shelf headings on /downloads, in order. */
export const EBOOK_GROUPS: { id: EbookGroup; label: string }[] = [
  { id: "james", label: "Books by James Bell" },
  { id: "questions", label: "Hard questions" },
];

export const FREE_EBOOKS: Ebook[] = [
  {
    group: "james",
    slug: "a-higher-allegiance",
    title: "A Higher Allegiance",
    formerly: "When God Bless America Replaces Thy Kingdom Come",
    line: "A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary.",
    cover: "/books/when-god-bless-america.webp",
    pdf: "/ebook/when-god-bless-america/When-God-Bless-America.pdf",
    epub: "/ebook/when-god-bless-america/When-God-Bless-America.epub",
    page: "/books/a-higher-allegiance",
  },
  {
    group: "james",
    slug: "blind-spots",
    title: "Blind Spots",
    formerly: "The Monster in the Mirror",
    line: "Why every generation gets the Bible wrong, why yours is no different, and what to do about it. A pastoral reckoning with our own blind spots.",
    cover: "/books/the-monster-in-the-mirror.webp",
    pdf: "/ebook/the-monster-in-the-mirror/The-Monster-in-the-Mirror.pdf",
    epub: "/ebook/the-monster-in-the-mirror/The-Monster-in-the-Mirror.epub",
    page: "/books/blind-spots",
  },
  {
    group: "james",
    slug: "believe",
    title: "Believe: The Rational Case for Christian Faith",
    line: "Rational answers to the hardest questions skeptics ask about God, the Bible, the resurrection, suffering, and hell, from a pastor who was once an atheist.",
    cover: "/books/believe.webp",
    pdf: "/ebook/believe/Believe.pdf",
    epub: "/ebook/believe/Believe.epub",
    page: "/books/believe",
  },
  {
    group: "questions",
    slug: "deconstruction-of-faith",
    title: "The Deconstruction of Faith",
    line: "An honest reckoning with why people are leaving the church, what the church owes them, and where faith goes from here. Not a defense and not a surrender.",
    cover: "/books/deconstruction-of-faith.webp",
    pdf: "/ebook/deconstruction-of-faith/The-Deconstruction-of-Faith.pdf",
    epub: "/ebook/deconstruction-of-faith/The-Deconstruction-of-Faith.epub",
    page: "/books/deconstruction-of-faith",
  },
  {
    group: "questions",
    slug: "the-reliability-of-scripture",
    title: "The Reliability of Scripture",
    line: "Why we can trust the Bible we have — the manuscripts, the canon, the archaeology, and the difference between what inerrancy claims and what its critics attack.",
    cover: "/books/the-reliability-of-scripture.webp",
    pdf: "/ebook/the-reliability-of-scripture/The-Reliability-of-Scripture.pdf",
    epub: "/ebook/the-reliability-of-scripture/The-Reliability-of-Scripture.epub",
    page: "/books/the-reliability-of-scripture",
  },
  {
    group: "questions",
    slug: "bible-and-homosexuality",
    title: "What Does the Bible Really Say About Homosexuality?",
    line: "Scripture, same-sex relationships, and the church's Christ-centered response — a pastoral reading that refuses the false choice between truth and love.",
    cover: "/books/bible-and-homosexuality.webp",
    pdf: "/ebook/bible-and-homosexuality/What-the-Bible-Says-About-Homosexuality.pdf",
    epub: "/ebook/bible-and-homosexuality/What-the-Bible-Says-About-Homosexuality.epub",
    page: "/books/bible-and-homosexuality",
  },
  {
    group: "questions",
    slug: "bible-and-transgender-identity",
    title: "What Does the Bible Say About Transgender Identity?",
    line: "Gender, the body, and the church's Christ-centered response — a pastoral reading where clarity and compassion occupy the same room.",
    cover: "/books/bible-and-transgender-identity.webp",
    pdf: "/ebook/bible-and-transgender-identity/What-the-Bible-Says-About-Transgender-Identity.pdf",
    epub: "/ebook/bible-and-transgender-identity/What-the-Bible-Says-About-Transgender-Identity.epub",
    page: "/books/bible-and-transgender-identity",
  },
  {
    group: "questions",
    slug: "critical-race-theory-biblical",
    title: "Is Critical Race Theory Biblical?",
    line: "Race, justice, and what the church actually owes the world — a Scripture-first reckoning that refuses both wholesale adoption and reflexive dismissal.",
    cover: "/books/critical-race-theory-biblical.webp",
    pdf: "/ebook/critical-race-theory-biblical/Is-Critical-Race-Theory-Biblical.pdf",
    epub: "/ebook/critical-race-theory-biblical/Is-Critical-Race-Theory-Biblical.epub",
    page: "/books/critical-race-theory-biblical",
  },
  {
    group: "questions",
    slug: "raising-believers",
    title: "Raising Believers: Christian Parenting in a Post-Christian World",
    line: "A pastor and father of five sons on what it actually takes to form faith in children — in the home, the church, and the long obedience of years.",
    cover: "/books/raising-believers.webp",
    pdf: "/ebook/raising-believers/Raising-Believers.pdf",
    epub: "/ebook/raising-believers/Raising-Believers.epub",
  },
];

/** Off the site; nothing lists these. The first seven wait for corrected files, the sixteen after them are off for now. */
export const HELD_EBOOKS: { slug: string; title: string }[] = [
  { slug: "alone-in-a-crowded-church", title: "Alone in a Crowded Church" },
  { slug: "consider-the-birds", title: "Consider the Birds" },
  { slug: "heaven-is-not-your-reward", title: "Heaven Is Not Your Reward" },
  { slug: "marriage-in-ministry", title: "Marriage in Ministry" },
  { slug: "prophetic-justice-101", title: "Prophetic Justice 101" },
  { slug: "the-loneliness-of-the-pastor", title: "The Loneliness of the Pastor" },
  { slug: "where-your-treasure-is", title: "Where Your Treasure Is" },
  { slug: "babylon", title: "Babylon" },
  { slug: "born-again-from-atheism", title: "Born Again From Atheism" },
  { slug: "faith-after-deconstruction", title: "Faith After Deconstruction" },
  { slug: "how-to-read-the-bible", title: "How to Read the Bible" },
  { slug: "why-not-what", title: "Why Not What" },
  { slug: "the-god-who-is-not-nice", title: "The God Who Is Not Nice" },
  { slug: "the-scandal-of-the-cross", title: "The Scandal of the Cross" },
  { slug: "prayer-in-the-dark", title: "Prayer in the Dark" },
  { slug: "be-true-to-yourself", title: "Be True to Yourself" },
  { slug: "rule-of-life", title: "Rule of Life" },
  { slug: "ordinary-holiness", title: "Ordinary Holiness" },
  { slug: "covenant", title: "Covenant" },
  { slug: "healwell", title: "HealWell: 52 Weeks in Costly Hope" },
  { slug: "the-body-you-left", title: "The Body You Left" },
  { slug: "sermon-on-the-mount-as-politics", title: "The Sermon on the Mount as Politics" },
  { slug: "what-belongs-to-the-poor", title: "What Belongs to the Poor" },
];

/** A free ebook by slug, or undefined. */
export function freeEbook(slug: string): Ebook | undefined {
  return FREE_EBOOKS.find((b) => b.slug === slug);
}
