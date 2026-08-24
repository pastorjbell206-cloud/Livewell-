/**
 * KeepReadingBook — the article-to-book funnel. Every essay ends with a card
 * pointing the reader to the book that carries its argument to full length,
 * chosen from the essay's pillar/track so the match is topical. This is the
 * mechanism by which the 160+ articles drive book sales.
 */
import { Link } from "wouter";
import { pillarForPost, resolveTrack } from "@/lib/taxonomy";
import { trackBookClick } from "@/lib/telemetry";

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
  "born-again-from-atheism": {
    slug: "born-again-from-atheism",
    title: "Born Again From Atheism",
    sub: "How an Unbeliever Came to Faith, and What He Found There",
    blurb: "The whole story — the arguments, the resistance, and the God who outlasted both. Written for the reader who is not sure belief is honest.",
  },
  "the-god-who-is-not-nice": {
    slug: "the-god-who-is-not-nice",
    title: "The God Who Is Not Nice",
    sub: "Recovering the Weight of God in a Sentimental Age",
    blurb: "Against the sentimental god of niceness — the holy, weighty God of Scripture, who turns out to be far better than nice.",
  },
  "faith-after-deconstruction": {
    slug: "faith-after-deconstruction",
    title: "Faith After Deconstruction",
    sub: "How to Lose the Faith You Were Given and Find the One That Holds",
    blurb: "For the reader taking the inherited faith apart — and what it costs to stop at the demolition instead of digging to what holds.",
  },
  "ordinary-holiness": {
    slug: "ordinary-holiness",
    title: "Ordinary Holiness",
    sub: "Finding God in the Life You Actually Have",
    blurb: "Holiness relocated to the life you actually have — the kitchen, the commute, the repeated week — not the life you keep planning to start.",
  },
  "the-scandal-of-the-cross": {
    slug: "the-scandal-of-the-cross",
    title: "The Scandal of the Cross",
    sub: "Why the Death of God Is the Center of Everything",
    blurb: "The cross recovered from the jewelry we made of it — why the death of God is the center of everything, not a doctrine to hurry past.",
  },
  "heaven-is-not-your-reward": {
    slug: "heaven-is-not-your-reward",
    title: "Heaven Is Not Your Reward",
    sub: "The Resurrection Hope the Church Traded for an Escape",
    blurb: "New creation, not clouds and harps — the resurrection hope the church traded for an escape, and what it changes about this life.",
  },
  "prayer-in-the-dark": {
    slug: "prayer-in-the-dark",
    title: "Prayer in the Dark",
    sub: "Talking to God When You Are Not Sure Anyone Is Listening",
    blurb: "For the ones who kept praying into silence — honest about the dark, and unwilling to let go of the God inside it.",
  },
  "the-body-you-left": {
    slug: "the-body-you-left",
    title: "The Body You Left",
    sub: "A Case for the Church in an Age That Walked Away",
    blurb: "Individualism made the church optional. The case for the body of Christ, made to the people who had good reasons to leave.",
  },
  "the-monster-in-the-mirror": {
    slug: "the-monster-in-the-mirror",
    title: "The Monster in the Mirror",
    sub: "Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It",
    blurb: "Six American cultural lenses that quietly distort how we read Scripture, and what it looks like to read against your own assumptions.",
    href: "/books/the-monster-in-the-mirror",
    cover: "/books/the-monster-in-the-mirror.webp",
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
  { keywords: ["atheis", "skeptic", "unbelie"], book: "born-again-from-atheism" },
  { keywords: ["therapeutic", "sentimental", "moralistic", "not-nice"], book: "the-god-who-is-not-nice" },
  { keywords: ["holiness", "sanctif", "spiritual-growth"], book: "ordinary-holiness" },
  { keywords: ["the-cross", "atonement", "crucifi", "good-friday"], book: "the-scandal-of-the-cross" },
  { keywords: ["heaven", "resurrection", "new-creation", "afterlife", "eternal-life"], book: "heaven-is-not-your-reward" },
  { keywords: ["prayer", "praying", "unanswered"], book: "prayer-in-the-dark" },
  { keywords: ["church-membership", "why-church", "leaving-church", "left-the-church", "body-of-christ", "ecclesi"], book: "the-body-you-left" },
  { keywords: ["cultural-lens", "consumer", "gets-the-bible-wrong", "individualism"], book: "the-monster-in-the-mirror" },
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
  if (track === "doubt") return BOOKS["faith-after-deconstruction"];
  if (track === "theology") return BOOKS["how-to-read-the-bible"];
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

export function KeepReadingBook({
  post,
  quiet = false,
}: {
  post: PostLike;
  /**
   * Demote to a compact line. Set when the reader is mid reading path, where
   * the next essay in that path is the earned next step and the book would
   * otherwise compete with it.
   */
  quiet?: boolean;
}) {
  const book = bookFor(post);

  if (quiet) {
    return (
      <section style={{ background: "var(--bone)", padding: "var(--s-4)" }}>
        <div
          style={{
            maxWidth: "var(--w-content)",
            margin: "0 auto",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            src={book.cover ?? `/books/${book.slug}.svg`}
            alt=""
            width={44}
            height={66}
            style={{ width: "44px", height: "auto", borderRadius: "2px", flex: "0 0 auto" }}
          />
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--ink-muted)",
              margin: 0,
            }}
          >
            The argument runs to full length in{" "}
            <Link
              href={book.href ?? `/${book.slug}`}
              onClick={() => trackBookClick(post.slug ?? "", book.slug)}
              style={{
                fontFamily: "var(--U)",
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
              }}
            >
              {book.title}
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

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
          <Link href={book.href ?? `/${book.slug}`} onClick={() => trackBookClick(post.slug ?? "", book.slug)} style={{ display: "inline-block", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 26px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
            Read the book →
          </Link>
        </div>
      </div>
    </section>
  );
}
