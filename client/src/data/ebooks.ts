/**
 * Every ebook on the site, free to download (James, 2026-11-18: "give away for
 * free for people to download", everything free, nothing sold as an ebook).
 *
 * Read by /downloads (the one page that shows them all), /books, each book's
 * own page, and the build-time catalogue (scripts/build-catalogue.mjs), so
 * the list cannot drift. The Hard Issues booklets for church leaders stay in
 * data/booklets.ts and are shown beside these.
 *
 * Every line is the description the site already had for the book: the
 * book's own page, or the ebook catalogue in api/index.ts for the older
 * titles. Nothing here is new copy.
 *
 * HELD_EBOOKS name the Pastors Connection Network inside the file. They are
 * not served and not listed until James sends corrected files; see
 * content/held-downloads/README.md.
 *
 * Kept as pure data (no imports) so the build scripts can read it.
 */
export type EbookGroup = "james" | "questions" | "older";

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
}

/** Shelf headings on /downloads, in order. */
export const EBOOK_GROUPS: { id: EbookGroup; label: string }[] = [
  { id: "james", label: "Books by James Bell" },
  { id: "questions", label: "Hard questions" },
  { id: "older", label: "More ebooks" },
];

const older = (slug: string, title: string, line: string, cover = `/books/${slug}.svg`): Ebook => ({
  group: "older",
  slug,
  title,
  line,
  cover,
  pdf: `/ebook/${slug}/${slug}.pdf`,
});

export const FREE_EBOOKS: Ebook[] = [
  {
    group: "james",
    slug: "when-god-bless-america",
    title: "When God Bless America Replaces Thy Kingdom Come",
    line: "A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary.",
    cover: "/books/when-god-bless-america.webp",
    pdf: "/ebook/when-god-bless-america/When-God-Bless-America.pdf",
    epub: "/ebook/when-god-bless-america/When-God-Bless-America.epub",
    page: "/books/when-god-bless-america",
  },
  {
    group: "james",
    slug: "the-monster-in-the-mirror",
    title: "The Monster in the Mirror",
    line: "Why every generation gets the Bible wrong, why yours is no different, and what to do about it. A pastoral reckoning with our own blind spots.",
    cover: "/books/the-monster-in-the-mirror.webp",
    pdf: "/ebook/the-monster-in-the-mirror/The-Monster-in-the-Mirror.pdf",
    epub: "/ebook/the-monster-in-the-mirror/The-Monster-in-the-Mirror.epub",
    page: "/books/the-monster-in-the-mirror",
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
  older("babylon", "Babylon", "The part of Jeremiah's letter we never read. Not how to take the country back, and not how to make peace with losing it. How to build, plant, and seek the good of the city in Christian exile."),
  older("born-again-from-atheism", "Born Again From Atheism", "How an unbeliever came to faith as a grown man, and what he found there. The doubts taken at full strength, and the God he did not want to meet."),
  older("faith-after-deconstruction", "Faith After Deconstruction", "How to lose the faith you were given and find the one that holds. What should fall, what must not, and the way through."),
  older("how-to-read-the-bible", "How to Read the Bible", "Reading Scripture without bending it to what you already believe, from proof-texting to the passages we skip."),
  older("why-not-what", "Why Not What", "How theology starts with the right question. Why before what, the order the whole Bible insists on."),
  older("the-god-who-is-not-nice", "The God Who Is Not Nice", "Recovering the weight of God in a sentimental age. Nice is not holy, and a God with no weight cannot save."),
  older("the-scandal-of-the-cross", "The Scandal of the Cross", "Why the death of God is the center of everything. The cross recovered from jewelry, and the atonement held together instead of traded for a slogan."),
  older("prayer-in-the-dark", "Prayer in the Dark", "Talking to God when you are not sure anyone is listening. For prayers that hit the ceiling, without the formulas or the guilt."),
  older("be-true-to-yourself", "Be True to Yourself", "The age's one commandment, named as the lie it is, and the older freedom underneath it: you are not your own."),
  older("rule-of-life", "Rule of Life", "The ancient practices the church used to form durable souls, recovered for an age engineered to deform us."),
  older("ordinary-holiness", "Ordinary Holiness", "Finding God in the life you actually have. Work, the body, the table, the neighbor, and the faithfulness no one applauds."),
  older("covenant", "Covenant", "Why marriage is a promise, not a deal. The culture sold us a contract and called it romance."),
  older("healwell", "HealWell: 52 Weeks in Costly Hope", "A year of honest devotionals for tired believers, written from inside the wound and pointed toward a costly hope."),
  older("the-body-you-left", "The Body You Left", "A case for the church in an age that walked away. An honest reckoning with why people left, and why the body of Christ still matters."),
  older("sermon-on-the-mount-as-politics", "The Sermon on the Mount as Politics", "The Sermon read as the constitution of the kingdom, not private inner life. Power, money, enemies, truth, and the poor."),
  older("what-belongs-to-the-poor", "What Belongs to the Poor", "What the ancient church knew about wealth and justice, recovered from Basil and the Fathers, who called giving justice, not charity."),
];

/** Off the site until James sends corrected files. Nothing lists these. */
export const HELD_EBOOKS: { slug: string; title: string }[] = [
  { slug: "alone-in-a-crowded-church", title: "Alone in a Crowded Church" },
  { slug: "consider-the-birds", title: "Consider the Birds" },
  { slug: "heaven-is-not-your-reward", title: "Heaven Is Not Your Reward" },
  { slug: "marriage-in-ministry", title: "Marriage in Ministry" },
  { slug: "prophetic-justice-101", title: "Prophetic Justice 101" },
  { slug: "the-loneliness-of-the-pastor", title: "The Loneliness of the Pastor" },
  { slug: "where-your-treasure-is", title: "Where Your Treasure Is" },
];

/** A free ebook by slug, or undefined. */
export function freeEbook(slug: string): Ebook | undefined {
  return FREE_EBOOKS.find((b) => b.slug === slug);
}
