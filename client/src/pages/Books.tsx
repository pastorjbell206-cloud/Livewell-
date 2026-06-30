/**
 * Books — now DB-driven (was: hardcoded 14-book array).
 *
 * Pulls every published book from the books table via trpc, splits into
 * "authored" (Bell's own) vs "recommended" (the PCN curated reading list),
 * and renders a reading-paths grid where each path is keyed by slug rather
 * than the unstable numeric DB ids.
 *
 * If a path references a slug that's not in the DB, that path simply
 * renders empty — no broken images.
 */
import { ArrowRight } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { bookUrl } from "@/lib/site";
import { SITE_STATS, bookCountWordCap } from "@/config/siteStats";

interface ReadingPath {
  title: string;
  desc: string;
  /** Book slugs in reading order. Slugs that don't match the DB are skipped. */
  slugs: string[];
}

const READING_PATHS: ReadingPath[] = [
  {
    title: "If you are a pastor on the edge of burnout",
    desc: "Start here. These were written inside the crisis, not about it.",
    slugs: ["dangerous-calling", "the-hidden-life", "earthen-vessels"],
  },
  {
    title: "If you are leading a church and the numbers are not working",
    desc: "The church-growth playbook failed. These name why, and what faithful leadership looks like when the metrics stop cooperating.",
    slugs: ["the-pruning", "the-unfinished-church", "the-undershepherd"],
  },
  {
    title: "If your family is paying the price for your ministry",
    desc: "The pastor's home is often the last place the pastor pastors. The First Flock is where that reckoning begins.",
    slugs: ["the-first-flock", "dangerous-calling", "earthen-vessels"],
  },
  {
    title: "If you need to say something hard and you do not know how",
    desc: "Courage in the pulpit and in the elder meeting.",
    slugs: ["necessary-words", "preach-the-word", "common-grace"],
  },
  {
    title: "If you believe the church is called to more than survival",
    desc: "Mission, unity, and the post-Christian witness.",
    slugs: [
      "sent-into-the-city",
      "to-the-ends-of-the-earth",
      "one-body-many-churches",
      "faithful-in-exile",
    ],
  },
];

export default function Books() {
  const booksQuery = trpc.books.listPublished.useQuery();
  const books = booksQuery.data ?? [];
  const bySlug = new Map(books.filter(b => b.slug).map(b => [b.slug as string, b]));
  const authored = books.filter(b => b.bookType === "authored");
  const recommended = books.filter(b => b.bookType === "recommended");

  return (
    <Layout>
      <SEOMeta
        title="Books — James Bell"
        description={`${bookCountWordCap} books on pastoral ministry, theology, marriage, and the weight of faithful leadership. Read them as paths, not a list.`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Books by James Bell",
          description: `${bookCountWordCap} books on pastoral ministry, theology, and the Christian life.`,
          url: "https://www.livewellbyjamesbell.co/books",
        }}
      />

      {/* HEADER */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            The Books
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              marginBottom: "20px",
            }}
          >
            {bookCountWordCap} books across {SITE_STATS.yearsInMinistryWord} years of ministry.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.7)",
              maxWidth: "62ch",
            }}
          >
            Every book asks the same question from a different angle: what
            does it look like to follow Jesus when the answers are harder than
            the songs we sing on Sunday? Read them as paths, not a list.
          </p>
        </div>
      </section>

      {/* NEW EBOOK — After Christendom (flagship, standalone funnel page) */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/after-christendom" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img
              src="/books/after-christendom.svg"
              alt="After Christendom book cover"
              width={120}
              height={181}
              style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.25)", flex: "0 0 auto" }}
            />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)" }}>
                New Ebook · $9.99 · The Post-Christian Church
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--ink)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                After Christendom
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", margin: 0 }}>
                How to follow Jesus now that the culture has stopped pretending to be Christian. What is dying is
                not the faith but Christendom. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW EBOOK — Covenant (marriage, standalone funnel page) */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/covenant" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img
              src="/books/covenant.svg"
              alt="Covenant book cover"
              width={120}
              height={181}
              style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.25)", flex: "0 0 auto" }}
            />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)" }}>
                New Ebook · $9.99 · On Marriage
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--ink)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                Covenant
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", margin: 0 }}>
                Why marriage is a promise, not a deal. The culture sold us a contract and called it romance. Read
                the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--bone)", background: "var(--ink)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW EBOOK — Why Not What (theology, standalone funnel page) */}
      <section style={{ background: "var(--ink)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/why-not-what" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img
              src="/books/why-not-what.svg"
              alt="Why Not What book cover"
              width={120}
              height={181}
              style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.45)", flex: "0 0 auto" }}
            />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
                New Ebook · $9.99 · On Theology
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--bone)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                Why Not What
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "rgba(245,240,230,.78)", margin: 0 }}>
                Theology starts with the wrong question, until it starts with the right one. Why before what, the order
                the whole Bible insists on. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW EBOOK — The Sermon on the Mount as Politics */}
      <section style={{ background: "var(--ink)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/sermon-on-the-mount-as-politics" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img src="/books/sermon-on-the-mount-as-politics.svg" alt="The Sermon on the Mount as Politics book cover" width={120} height={181} style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.45)", flex: "0 0 auto" }} />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
                New Ebook · $9.99 · On the Kingdom
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--bone)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                The Sermon on the Mount as Politics
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "rgba(245,240,230,.78)", margin: 0 }}>
                We shrank the most public sermon Jesus ever preached until it fit inside our own chests. This reads it as
                what it is, the constitution of a different kingdom. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW EBOOK — Prophetic Justice 101 */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/prophetic-justice-101" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img src="/books/prophetic-justice-101.svg" alt="Prophetic Justice 101 book cover" width={120} height={181} style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.25)", flex: "0 0 auto" }} />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)" }}>
                New Ebook · $9.99 · On Justice
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--ink)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                Prophetic Justice 101
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", margin: 0 }}>
                Mishpat, tsedaqah, Micah 6:8, and what the church actually owes its neighborhood. The prophetic tradition
                recovered, biblical and never partisan. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--bone)", background: "var(--ink)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW EBOOK — Marriage in Ministry */}
      <section style={{ background: "var(--ink)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/marriage-in-ministry" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img src="/books/marriage-in-ministry.svg" alt="Marriage in Ministry book cover" width={120} height={181} style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.45)", flex: "0 0 auto" }} />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
                New Ebook · $9.99 · On Marriage &amp; Ministry
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--bone)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                Marriage in Ministry
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "rgba(245,240,230,.78)", margin: 0 }}>
                The church can become the other lover, taking your best hours and leaving the marriage the leftovers.
                How the covenant survives it, and more than survives. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW EBOOK — The Loneliness of the Pastor */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/the-loneliness-of-the-pastor" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img src="/books/the-loneliness-of-the-pastor.svg" alt="The Loneliness of the Pastor book cover" width={120} height={181} style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.25)", flex: "0 0 auto" }} />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)" }}>
                New Ebook · $9.99 · For Pastors
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--ink)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                The Loneliness of the Pastor
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", margin: 0 }}>
                Why pastors quit, and the brotherhood that could let them stay. The book the Pastors Connection Network
                was built around. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--bone)", background: "var(--ink)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW DEVOTIONAL — HealWell */}
      <section style={{ background: "var(--ink)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/healwell" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img src="/books/healwell.svg" alt="HealWell book cover" width={120} height={181} style={{ width: "104px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.45)", flex: "0 0 auto" }} />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
                New Devotional · $9.99 · 52 Weeks
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, color: "var(--bone)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                HealWell: 52 Weeks in Costly Hope
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "rgba(245,240,230,.78)", margin: 0 }}>
                A devotional that will not lie to you. Fifty-two weeks of honest readings, written from inside the wound
                and pointed toward a hope that costs something. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the devotional →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW RELEASE — featured ebook (standalone product page) */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/books/when-god-bless-america" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img
              src="/books/when-god-bless-america.jpg"
              alt="When God Bless America Replaces Thy Kingdom Come"
              width={120} height={181}
              style={{ width: "96px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.45)", flex: "0 0 auto" }}
            />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
                New Release · Ebook
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 500, color: "var(--bone)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                When God Bless America Replaces Thy Kingdom Come
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "rgba(245,240,230,.78)", margin: 0 }}>
                How Patriotism Became Our Practical Savior — available now for $8.99.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* NEW EBOOK FOR PASTORS — sales funnel */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <Link href="/alone-in-a-crowded-church" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <img
              src="/books/alone-in-a-crowded-church.svg"
              alt="Alone in a Crowded Church book cover"
              width={120}
              height={181}
              style={{ width: "92px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.25)", flex: "0 0 auto" }}
            />
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)" }}>
                New Ebook · $9.99 · For Pastors
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 500, color: "var(--ink)", margin: "6px 0 4px", lineHeight: 1.15 }}>
                Alone in a Crowded Church
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", margin: 0 }}>
                Why pastors burn out in silence, and how brotherhood brings them back. Read the opening free, then buy the ebook.
              </p>
            </div>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 24px", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }}>
              Get the ebook →
            </span>
          </div>
        </Link>
      </section>

      {/* THE LIVEWELL SERIES — two new ebooks (top-level product pages) */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)", marginBottom: "8px" }}>
            The LiveWell Series · Ebooks
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, margin: "0 0 8px", color: "var(--ink)" }}>
            Two books, one hinge — anxiety and money
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", margin: "0 0 28px" }}>
            In Matthew 6, “you cannot serve God and money” comes one verse before “therefore do not be anxious.” The two books read the two halves of the same teaching.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--s-4)" }}>
            {[
              { slug: "consider-the-birds", cover: "/books/consider-the-birds.jpg", title: "Consider the Birds", sub: "What the Bible Says About Anxiety, and the Peace Christ Gives Instead" },
              { slug: "where-your-treasure-is", cover: "/books/where-your-treasure-is.jpg", title: "Where Your Treasure Is", sub: "What the Bible Says About Money, and the Heart It Means to Free" },
            ].map((b) => (
              <Link key={b.slug} href={`/${b.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <img src={b.cover} alt={`${b.title} — cover`} width={1600} height={2560}
                  style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 12px 32px rgba(0,0,0,.25)" }} />
                <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", margin: "14px 0 4px", lineHeight: 1.2 }}>{b.title}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 8px", lineHeight: 1.4 }}>{b.sub}</p>
                <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", letterSpacing: "0.04em" }}>Get the ebook — $9.99 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW RELEASES — three new ebooks */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)", marginBottom: "8px" }}>
            New Releases · Ebooks
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, margin: "0 0 28px", color: "var(--bone)" }}>
            Three new books, available now
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--s-4)" }}>
            {[
              { slug: "believe", cover: "/books/believe.jpg", title: "Believe", sub: "The Rational Case for Christian Faith" },
              { slug: "deconstruction-of-faith", cover: "/books/deconstruction-of-faith.jpg", title: "The Deconstruction of Faith", sub: "Why People Are Leaving the Church — and What Comes After" },
              { slug: "raising-believers", cover: "/books/raising-believers.jpg", title: "Raising Believers", sub: "Christian Parenting in a Post-Christian World" },
            ].map((b) => (
              <Link key={b.slug} href={`/books/${b.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <img src={b.cover} alt={`${b.title} — cover`} width={1600} height={2560}
                  style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 12px 32px rgba(0,0,0,.4)" }} />
                <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--bone)", margin: "14px 0 4px", lineHeight: 1.2 }}>{b.title}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "rgba(245,240,230,.7)", margin: "0 0 8px", lineHeight: 1.4 }}>{b.sub}</p>
                <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard)", letterSpacing: "0.04em" }}>Get the ebook →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW RELEASES — five new ebooks */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)", marginBottom: "8px" }}>
            New Releases · Ebooks
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, margin: "0 0 28px", color: "var(--ink)" }}>
            Five more books, available now
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--s-4)" }}>
            {[
              { slug: "the-monster-in-the-mirror", cover: "/books/the-monster-in-the-mirror.jpg", title: "The Monster in the Mirror", sub: "Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It" },
              { slug: "the-reliability-of-scripture", cover: "/books/the-reliability-of-scripture.jpg", title: "The Reliability of Scripture", sub: "Why We Can Trust the Bible We Have" },
              { slug: "bible-and-homosexuality", cover: "/books/bible-and-homosexuality.jpg", title: "What Does the Bible Really Say About Homosexuality?", sub: "Scripture, Same-Sex Relationships, and the Church's Christ-Centered Response" },
              { slug: "bible-and-transgender-identity", cover: "/books/bible-and-transgender-identity.jpg", title: "What Does the Bible Say About Transgender Identity?", sub: "Gender, the Body, and the Church's Christ-Centered Response" },
              { slug: "critical-race-theory-biblical", cover: "/books/critical-race-theory-biblical.jpg", title: "Is Critical Race Theory Biblical?", sub: "Race, Justice, and What the Church Actually Owes the World" },
            ].map((b) => (
              <Link key={b.slug} href={`/books/${b.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <img src={b.cover} alt={`${b.title} — cover`} width={1600} height={2560}
                  style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 12px 32px rgba(0,0,0,.25)" }} />
                <h3 style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", margin: "14px 0 4px", lineHeight: 1.2 }}>{b.title}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 8px", lineHeight: 1.4 }}>{b.sub}</p>
                <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", letterSpacing: "0.04em" }}>Get the ebook →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* READING PATHS */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-7) var(--s-4)",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Reading Paths
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: "var(--s-5)",
            }}
          >
            Start where you are.
          </h2>

          {booksQuery.isLoading && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)" }}>
              Loading the catalog…
            </p>
          )}

          {READING_PATHS.map((path, i) => {
            const pathBooks = path.slugs
              .map(s => bySlug.get(s))
              .filter((b): b is NonNullable<typeof b> => Boolean(b));
            if (pathBooks.length === 0) return null;
            return (
              <div
                key={path.title}
                style={{
                  marginBottom: "var(--s-5)",
                  paddingBottom: "var(--s-5)",
                  borderBottom:
                    i < READING_PATHS.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "22px",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "var(--ink)",
                    marginBottom: "10px",
                    lineHeight: 1.35,
                  }}
                >
                  {path.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "15px",
                    lineHeight: 1.65,
                    color: "var(--ink-muted)",
                    marginBottom: "var(--s-3)",
                    maxWidth: "60ch",
                  }}
                >
                  {path.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    overflowX: "auto",
                    paddingBottom: "8px",
                  }}
                >
                  {pathBooks.map(book => (
                    <Link
                      key={book.id}
                      href={book.slug ? bookUrl(book.slug) : "/books"}
                      style={{
                        flexShrink: 0,
                        textDecoration: "none",
                        width: "140px",
                      }}
                    >
                      <BookCover coverImage={book.coverImage} title={book.title} author={book.author} fixed />
                      <div
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "14px",
                          color: "var(--ink)",
                          marginTop: "8px",
                          lineHeight: 1.3,
                          maxWidth: "140px",
                        }}
                      >
                        {book.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULL CATALOG — authored */}
      <section
        style={{
          background: "var(--bone-warm)",
          padding: "var(--s-7) var(--s-4)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Full Catalog
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: "var(--s-5)",
            }}
          >
            All {authored.length} books by James Bell
          </h2>
          {authored.length === 0 && !booksQuery.isLoading && (
            <p
              style={{
                fontFamily: "var(--B)",
                color: "var(--ink-muted)",
                padding: "var(--s-4) 0",
              }}
            >
              The catalog is loading from the database.
            </p>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "var(--s-4)",
            }}
          >
            {authored.map(book => (
              <Link
                key={book.id}
                href={book.slug ? bookUrl(book.slug) : "/books"}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <BookCover coverImage={book.coverImage} title={book.title} author={book.author} style={{ marginBottom: "12px" }} />
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "17px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.3,
                      marginBottom: "4px",
                    }}
                  >
                    {book.title}
                  </h3>
                  {book.description && (
                    <p
                      style={{
                        fontFamily: "var(--B)",
                        fontSize: "13px",
                        color: "var(--ink-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {book.description.slice(0, 110)}
                      {book.description.length > 110 ? "…" : ""}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED */}
      {recommended.length > 0 && (
        <section
          style={{
            background: "var(--bone)",
            padding: "var(--s-7) var(--s-4)",
          }}
        >
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <div className="eyebrow" style={{ marginBottom: "12px" }}>
              Recommended Reading
            </div>
            <h2
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                marginBottom: "var(--s-5)",
              }}
            >
              The PCN reading list.
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "var(--s-4)",
              }}
            >
              {recommended.map(book => (
                <Link
                  key={book.id}
                  href={book.slug ? bookUrl(book.slug) : "/books"}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ cursor: "pointer" }}>
                    <BookCover coverImage={book.coverImage} title={book.title} author={book.author} style={{ marginBottom: "10px" }} />
                    <h3
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "var(--ink)",
                        lineHeight: 1.3,
                      }}
                    >
                      {book.title}
                    </h3>
                    {book.author && (
                      <p
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "12px",
                          color: "var(--ink-muted)",
                          marginTop: "2px",
                        }}
                      >
                        {book.author}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CROSS-LINK: WRITING */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-6) var(--s-4)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--F)",
              fontSize: "20px",
              fontStyle: "italic",
              lineHeight: 1.55,
              color: "var(--bone)",
              marginBottom: "20px",
            }}
          >
            The books are the architecture. The essays are the application.
            Read both.
          </p>
          <Link
            href="/writing"
            style={{
              fontFamily: "var(--U)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--mustard)",
              textDecoration: "none",
              borderBottom: "1px solid var(--mustard)",
              paddingBottom: "3px",
            }}
          >
            Read the essays <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} aria-hidden />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
