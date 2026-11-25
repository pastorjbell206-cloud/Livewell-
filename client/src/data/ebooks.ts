/**
 * Every ebook on the site. None is sold and no one is blocked (James,
 * 2026-11-18: "give away for free for people to download"); since 2026-11-22
 * each download carries a suggested gift the reader can change or skip, once
 * giving is open (shared/downloads.ts). Nine books here, and the three
 * booklets for church leaders beside them. The two James renamed take their
 * names from data/book-names.json through scripts/sync-book-names.mjs.
 *
 * Read by /downloads (the one page that shows them all), /books, each book's
 * own page, and the build-time catalogue (scripts/build-catalogue.mjs), so
 * the list cannot drift. The Hard Issues booklets for church leaders stay in
 * data/booklets.ts and are shown beside these.
 *
 * Every line is the description the site already had for the book, from its
 * own page. `sub` is the subtitle printed on the file's title page and `pages`
 * the PDF's page count, both read from the files on 2026-11-22; the two James
 * renamed were rebuilt from their own text on 2026-11-23
 * (scripts/build-book-files.mjs) and their counts read from the new files.
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
  /** The subtitle: the one on the file's title page, or the newer one of a renamed book (data/book-names.json). */
  sub: string;
  line: string;
  /** Pages in the PDF. */
  pages: number;
  /** The cover, 400 by 600 (client/public/covers/, drawn by scripts/build-covers.mjs; named by the book's folder under /ebook/). */
  cover: string;
  pdf: string;
  epub?: string;
  /** The book's own page, when it has one. */
  page?: string;
  /**
   * The title printed inside the file, when the site's title is newer than
   * the file: written by scripts/sync-book-names.mjs from `fileTitle` in
   * data/book-names.json, and shown on the card as the file's earlier name.
   * Gone once the file is rebuilt under the new title (as both renamed books
   * were on 2026-11-23).
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
    sub: "Reclaiming Jesus from American Politics",
    line: "A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary.",
    pages: 207,
    cover: "/covers/when-god-bless-america-400.webp",
    pdf: "/ebook/when-god-bless-america/A-Higher-Allegiance.pdf",
    epub: "/ebook/when-god-bless-america/A-Higher-Allegiance.epub",
    page: "/books/a-higher-allegiance",
  },
  {
    group: "james",
    slug: "blind-spots",
    title: "Blind Spots",
    sub: "Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It",
    line: "Why every generation gets the Bible wrong, why yours is no different, and what to do about it. A pastoral reckoning with our own blind spots.",
    pages: 244,
    cover: "/covers/the-monster-in-the-mirror-400.webp",
    pdf: "/ebook/the-monster-in-the-mirror/Blind-Spots.pdf",
    epub: "/ebook/the-monster-in-the-mirror/Blind-Spots.epub",
    page: "/books/blind-spots",
  },
  {
    group: "james",
    slug: "believe",
    title: "Believe: The Rational Case for Christian Faith",
    sub: "The Rational Case for Christian Faith",
    line: "Rational answers to the hardest questions skeptics ask about God, the Bible, the resurrection, suffering, and hell, from a pastor who was once an atheist.",
    pages: 191,
    cover: "/covers/believe-400.webp",
    pdf: "/ebook/believe/Believe.pdf",
    epub: "/ebook/believe/Believe.epub",
    page: "/books/believe",
  },
  {
    group: "questions",
    slug: "deconstruction-of-faith",
    title: "The Deconstruction of Faith",
    sub: "Why People Are Leaving the Church, and What Comes After",
    line: "An honest reckoning with why people are leaving the church, what the church owes them, and where faith goes from here. Not a defense and not a surrender.",
    pages: 391,
    cover: "/covers/deconstruction-of-faith-400.webp",
    pdf: "/ebook/deconstruction-of-faith/The-Deconstruction-of-Faith.pdf",
    epub: "/ebook/deconstruction-of-faith/The-Deconstruction-of-Faith.epub",
    page: "/books/deconstruction-of-faith",
  },
  {
    group: "questions",
    slug: "the-reliability-of-scripture",
    title: "The Reliability of Scripture",
    sub: "Why We Can Trust the Bible We Have",
    line: "Why we can trust the Bible we have — the manuscripts, the canon, the archaeology, and the difference between what inerrancy claims and what its critics attack.",
    pages: 241,
    cover: "/covers/the-reliability-of-scripture-400.webp",
    pdf: "/ebook/the-reliability-of-scripture/The-Reliability-of-Scripture.pdf",
    epub: "/ebook/the-reliability-of-scripture/The-Reliability-of-Scripture.epub",
    page: "/books/the-reliability-of-scripture",
  },
  {
    group: "questions",
    slug: "bible-and-homosexuality",
    title: "What Does the Bible Really Say About Homosexuality?",
    sub: "Scripture, Same-Sex Relationships, and the Church's Christ-Centered Response",
    line: "Scripture, same-sex relationships, and the church's Christ-centered response — a pastoral reading that refuses the false choice between truth and love.",
    pages: 189,
    cover: "/covers/bible-and-homosexuality-400.webp",
    pdf: "/ebook/bible-and-homosexuality/What-the-Bible-Says-About-Homosexuality.pdf",
    epub: "/ebook/bible-and-homosexuality/What-the-Bible-Says-About-Homosexuality.epub",
    page: "/books/bible-and-homosexuality",
  },
  {
    group: "questions",
    slug: "bible-and-transgender-identity",
    title: "What Does the Bible Say About Transgender Identity?",
    sub: "Gender, the Body, and the Church's Christ-Centered Response",
    line: "Gender, the body, and the church's Christ-centered response — a pastoral reading where clarity and compassion occupy the same room.",
    pages: 201,
    cover: "/covers/bible-and-transgender-identity-400.webp",
    pdf: "/ebook/bible-and-transgender-identity/What-the-Bible-Says-About-Transgender-Identity.pdf",
    epub: "/ebook/bible-and-transgender-identity/What-the-Bible-Says-About-Transgender-Identity.epub",
    page: "/books/bible-and-transgender-identity",
  },
  {
    group: "questions",
    slug: "critical-race-theory-biblical",
    title: "Is Critical Race Theory Biblical?",
    sub: "Race, Justice, and What the Church Actually Owes the World",
    line: "Race, justice, and what the church actually owes the world — a Scripture-first reckoning that refuses both wholesale adoption and reflexive dismissal.",
    pages: 206,
    cover: "/covers/critical-race-theory-biblical-400.webp",
    pdf: "/ebook/critical-race-theory-biblical/Is-Critical-Race-Theory-Biblical.pdf",
    epub: "/ebook/critical-race-theory-biblical/Is-Critical-Race-Theory-Biblical.epub",
    page: "/books/critical-race-theory-biblical",
  },
  {
    group: "questions",
    slug: "raising-believers",
    title: "Raising Believers: Christian Parenting in a Post-Christian World",
    sub: "Christian Parenting and the Costly Work of Forming Faith in a Post-Christian World",
    line: "A pastor and father of five sons on what it actually takes to form faith in children — in the home, the church, and the long obedience of years.",
    pages: 163,
    cover: "/covers/raising-believers-400.webp",
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
