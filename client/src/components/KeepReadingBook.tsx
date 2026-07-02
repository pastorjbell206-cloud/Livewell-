/**
 * KeepReadingBook — the article-to-book funnel. Every essay ends with a card
 * pointing the reader to the book that carries its argument to full length,
 * chosen from the essay's pillar/track so the match is topical. This is the
 * mechanism by which the 160+ articles drive book sales.
 */
import { Link } from "wouter";
import { pillarForPost, resolveTrack } from "@/lib/taxonomy";

interface PostLike {
  slug?: string | null;
  pillar?: string | null;
}

interface BookRef {
  slug: string;
  title: string;
  sub: string;
  blurb: string;
  /** Route to the product page; defaults to `/${slug}` when omitted. */
  href?: string;
  /** Cover path; defaults to `/books/${slug}.svg` when omitted. */
  cover?: string;
}

const BOOKS: Record<string, BookRef> = {
  "babylon": {
    slug: "babylon",
    title: "Babylon",
    sub: "How to Live When America Stops Being Christian",
    blurb: "The full argument this essay is a piece of: how to live faithfully once Christendom is over, worked through Jeremiah's letter to the exiles.",
  },
  "how-to-read-the-bible": {
    slug: "how-to-read-the-bible",
    title: "How to Read the Bible",
    sub: "Without Making It Say What You Already Believe",
    blurb: "Reading Scripture without bending it to what you already wanted it to say, from proof-texting to the passages we skip.",
  },
  "be-true-to-yourself": {
    slug: "be-true-to-yourself",
    title: "Be True to Yourself",
    sub: "The Lie That Ate the World",
    blurb: "The age's one commandment, named as the lie it is, and the older freedom underneath it: you are not your own.",
  },
  "what-belongs-to-the-poor": {
    slug: "what-belongs-to-the-poor",
    title: "What Belongs to the Poor",
    sub: "What the Ancient Church Knew About Wealth and Justice",
    blurb: "What the church forgot about the poor, recovered from Basil and the Fathers, who called giving justice, not charity.",
  },
  "rule-of-life": {
    slug: "rule-of-life",
    title: "Rule of Life",
    sub: "The Ancient Art of Forming a Soul in an Age Built to Deform It",
    blurb: "The ancient practices the church used to form durable souls, recovered for an age engineered to deform us.",
  },
  "covenant": {
    slug: "covenant",
    title: "Covenant",
    sub: "Why Marriage Is a Promise, Not a Deal",
    blurb: "The culture sold us a contract and called it romance. The older word for marriage carries more weight, and more hope.",
  },
  "why-not-what": {
    slug: "why-not-what",
    title: "Why Not What",
    sub: "How Theology Starts With the Right Question",
    blurb: "Why before what — the order the whole Bible insists on, and the difference it makes to everything you believe.",
  },
  "sermon-on-the-mount-as-politics": {
    slug: "sermon-on-the-mount-as-politics",
    title: "The Sermon on the Mount as Politics",
    sub: "Reading the Kingdom's Constitution Without the Spiritualizing",
    blurb: "The Sermon read as the constitution of the kingdom, not private inner life — power, money, enemies, truth, and the poor.",
  },
  "prophetic-justice-101": {
    slug: "prophetic-justice-101",
    title: "Prophetic Justice 101",
    sub: "Mishpat, Tsedaqah, and What the Church Owes Its Neighborhood",
    blurb: "The prophetic tradition recovered, never partisan — what the prophets actually demanded and what it asks of a church now.",
  },
  "marriage-in-ministry": {
    slug: "marriage-in-ministry",
    title: "Marriage in Ministry",
    sub: "Protecting the Covenant When the Church Demands Everything",
    blurb: "The pressures the parsonage puts on a marriage, named honestly, and the guardrails that let both callings survive.",
  },
  "the-loneliness-of-the-pastor": {
    slug: "the-loneliness-of-the-pastor",
    title: "The Loneliness of the Pastor",
    sub: "Why Pastors Quit, and the Brotherhood That Could Let Them Stay",
    blurb: "Why pastors quit, and the brotherhood that could let them stay. Written from inside the room, not about it.",
  },
  "healwell": {
    slug: "healwell",
    title: "HealWell",
    sub: "52 Weeks in Costly Hope",
    blurb: "A year of honest devotionals for tired believers, written from inside the wound and pointed toward a costly hope.",
  },
  "alone-in-a-crowded-church": {
    slug: "alone-in-a-crowded-church",
    title: "Alone in a Crowded Church",
    sub: "Why Pastors Burn Out in Silence",
    blurb: "The isolation nobody sees from the pew, and how brotherhood brings a pastor back.",
  },
  "consider-the-birds": {
    slug: "consider-the-birds",
    title: "Consider the Birds",
    sub: "What the Bible Says About Anxiety",
    blurb: "What the Bible actually says about anxiety, and the peace Christ gives instead of the peace we manufacture.",
    cover: "/books/consider-the-birds.webp",
  },
  "where-your-treasure-is": {
    slug: "where-your-treasure-is",
    title: "Where Your Treasure Is",
    sub: "What the Bible Says About Money",
    blurb: "What the Bible says about money, and the heart it means to free — vocation, debt, generosity, and what wealth costs.",
    cover: "/books/where-your-treasure-is.webp",
  },
  "when-god-bless-america": {
    slug: "when-god-bless-america",
    title: "When God Bless America Replaces Thy Kingdom Come",
    sub: "How Patriotism Became Our Practical Savior",
    blurb: "Civil religion named for what it is — idolatry with a flag for a shroud — and the older allegiance underneath.",
    href: "/books/when-god-bless-america",
    cover: "/books/when-god-bless-america.webp",
  },
  "deconstruction-of-faith": {
    slug: "deconstruction-of-faith",
    title: "The Deconstruction of Faith",
    sub: "Taking Faith Apart Without Losing It",
    blurb: "For the reader taking the inherited faith apart, honestly — and what it costs to stop at the demolition.",
    href: "/books/deconstruction-of-faith",
    cover: "/books/deconstruction-of-faith.webp",
  },
  "raising-believers": {
    slug: "raising-believers",
    title: "Raising Believers",
    sub: "Formation Over Performance in a Christian Home",
    blurb: "Five sons in: presence over advice, formation over performance, and the long work of a household that forms faith.",
    href: "/books/raising-believers",
    cover: "/books/raising-believers.webp",
  },
  "the-reliability-of-scripture": {
    slug: "the-reliability-of-scripture",
    title: "The Reliability of Scripture",
    sub: "What We Actually Know About the Bible",
    blurb: "The evidence, stronger than skeptics admit and more complex than fundamentalists want — laid out without shortcuts.",
    href: "/books/the-reliability-of-scripture",
    cover: "/books/the-reliability-of-scripture.webp",
  },
  "bible-and-homosexuality": {
    slug: "bible-and-homosexuality",
    title: "The Bible and Homosexuality",
    sub: "What the Texts Say, and What We Have Made Them Say",
    blurb: "The hard texts read in full context, every serious position steelmanned, and the pastoral weight carried honestly.",
    href: "/books/bible-and-homosexuality",
    cover: "/books/bible-and-homosexuality.webp",
  },
  "bible-and-transgender-identity": {
    slug: "bible-and-transgender-identity",
    title: "The Bible and Transgender Identity",
    sub: "Scripture, Bodies, and the People in Front of Us",
    blurb: "What Scripture says and does not say, held with rigor and with care for the actual people this touches.",
    href: "/books/bible-and-transgender-identity",
    cover: "/books/bible-and-transgender-identity.webp",
  },
  "critical-race-theory-biblical": {
    slug: "critical-race-theory-biblical",
    title: "Is Critical Race Theory Biblical?",
    sub: "Past the Slogans on Both Sides",
    blurb: "The question taken seriously instead of used as a weapon — what the framework sees, what it misses, what Scripture demands.",
    href: "/books/critical-race-theory-biblical",
    cover: "/books/critical-race-theory-biblical.webp",
  },
};

/** Slug-keyword overrides: hard-issues essays route to their matching book,
 *  not the generic flagship. First match wins; most-specific rules first. */
const SLUG_BOOK_RULES: Array<{ keywords: string[]; book: string }> = [
  { keywords: ["transgender"], book: "bible-and-transgender-identity" },
  { keywords: ["homosexual", "same-sex", "lgbtq"], book: "bible-and-homosexuality" },
  { keywords: ["critical-race", "crt-"], book: "critical-race-theory-biblical" },
  { keywords: ["deconstruct"], book: "deconstruction-of-faith" },
  { keywords: ["reliability", "manuscript", "is-the-bible"], book: "the-reliability-of-scripture" },
  { keywords: ["anxiety", "anxious", "worry"], book: "consider-the-birds" },
  { keywords: ["god-bless-america", "nationalis", "civil-religion"], book: "when-god-bless-america" },
  { keywords: ["sermon-on-the-mount", "beatitude"], book: "sermon-on-the-mount-as-politics" },
  { keywords: ["burnout", "loneliness-of-the-pastor", "pastor-nobody"], book: "the-loneliness-of-the-pastor" },
  { keywords: ["money", "treasure", "debt", "generosity"], book: "where-your-treasure-is" },
];

function bookFor(post: PostLike): BookRef {
  const slug = (post.slug ?? "").toLowerCase();
  if (slug) {
    for (const rule of SLUG_BOOK_RULES) {
      if (rule.keywords.some((k) => slug.includes(k))) return BOOKS[rule.book];
    }
  }

  const track = resolveTrack(post.pillar ?? null)?.slug;
  if (track === "prophetic-justice") return BOOKS["what-belongs-to-the-poor"];
  if (track === "finances") return BOOKS["where-your-treasure-is"];
  if (track === "theology" || track === "doubt") return BOOKS["how-to-read-the-bible"];
  if (track === "devotionals") return BOOKS["healwell"];
  if (track === "marriage") return BOOKS["covenant"];
  if (track === "parenting") return BOOKS["raising-believers"];
  if (track === "pastoral-ministry") return BOOKS["the-loneliness-of-the-pastor"];
  if (track === "politics") return BOOKS["when-god-bless-america"];

  const id = pillarForPost(post)?.id;
  if (id === 1) return BOOKS["when-god-bless-america"];
  if (id === 3) return BOOKS["how-to-read-the-bible"];
  if (id === 2) return BOOKS["be-true-to-yourself"];
  if (id === 5) return BOOKS["the-loneliness-of-the-pastor"];
  if (id === 6) return BOOKS["rule-of-life"];
  return BOOKS["babylon"];
}

export function KeepReadingBook({ post }: { post: PostLike }) {
  const book = bookFor(post);
  return (
    <section style={{ background: "var(--ink)", padding: "var(--s-6) var(--s-4)" }}>
      <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
        <img
          src={book.cover ?? `/books/${book.slug}.svg`}
          alt={`${book.title} cover`}
          width={120}
          height={181}
          style={{ width: "110px", height: "auto", borderRadius: "3px", boxShadow: "0 12px 32px rgba(0,0,0,.5)", flex: "0 0 auto" }}
        />
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
            Keep reading · The book
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, color: "var(--bone)", margin: "8px 0 4px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {book.title}
          </h2>
          <p style={{ fontFamily: "var(--F)", fontStyle: "italic", fontSize: "17px", color: "rgba(245,240,230,.72)", margin: "0 0 12px" }}>
            {book.sub}
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "rgba(245,240,230,.8)", margin: "0 0 18px", maxWidth: "54ch" }}>
            {book.blurb}
          </p>
          <Link href={book.href ?? `/${book.slug}`} style={{ display: "inline-block", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 26px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
            Read the book →
          </Link>
        </div>
      </div>
    </section>
  );
}
