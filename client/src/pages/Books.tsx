/**
 * The books — all three of them.
 *
 * This page used to stack twenty-two promotional bands for a catalog of
 * AI-assisted titles. James reduced the shelf to the books he wrote by hand,
 * and the page now does what a three-book shelf should: present each book
 * with room to breathe and send the reader to its own page. The retired
 * drafts are archived in the repo (content/archive/) for his rewrite work;
 * as a book becomes his, it can return.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

const BOOKS = [
  {
    slug: "when-god-bless-america",
    href: "/books/when-god-bless-america",
    cover: "/books/when-god-bless-america.jpg",
    title: "When God Bless America Replaces Thy Kingdom Come",
    kicker: "Politics and the church",
    blurb:
      "A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary. Not a case for the other party. A case for the kingdom that does not run for office.",
  },
  {
    slug: "the-monster-in-the-mirror",
    href: "/books/the-monster-in-the-mirror",
    cover: "/books/the-monster-in-the-mirror.jpg",
    title: "The Monster in the Mirror",
    kicker: "Reading the Bible honestly",
    blurb:
      "Every generation reads the Bible with blind spots, and every generation is sure it is the one that finally sees clearly. This book asks the harder question: what will our grandchildren say we missed?",
  },
  {
    slug: "believe",
    href: "/books/believe",
    cover: "/books/believe.jpg",
    title: "Believe",
    kicker: "For skeptics",
    blurb:
      "Rational answers to the hardest questions skeptics ask — God, the Bible, the resurrection, suffering, hell — from a pastor who spent years on the other side of the argument and remembers what it sounds like from there.",
  },
];

export default function Books() {
  return (
    <Layout>
      <SEOMeta
        title="Books by James Bell — Three Titles, Written by Hand"
        description="The books James Bell wrote himself: When God Bless America Replaces Thy Kingdom Come, The Monster in the Mirror, and Believe. Read the opening of each free, then get the ebook for $8.99."
        url={`${SITE_URL}/books`}
      />

      {/* HERO — dark room */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "14px" }}>
            The Books
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(34px, 5.4vw, 60px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: "20ch",
              marginBottom: "18px",
            }}
          >
            Three books. Every word mine.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.78)",
              maxWidth: "62ch",
            }}
          >
            I write about the church and the country, about reading the Bible without
            flattering ourselves, and about whether any of this holds up under honest
            questions. The opening of each book is free to read. The rest costs $8.99,
            which is less than the coffee you would read it over.
          </p>
        </div>
      </section>

      {/* THE THREE — one full-width row each, alternating cream */}
      {BOOKS.map((b, i) => (
        <section
          key={b.slug}
          style={{
            background: i % 2 === 0 ? "var(--bone)" : "var(--bone-warm)",
            padding: "var(--s-6) var(--s-4)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--w-default)",
              margin: "0 auto",
              display: "flex",
              gap: "clamp(24px, 5vw, 56px)",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href={b.href} style={{ flex: "0 0 auto" }}>
              <img
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                src={b.cover}
                alt={`${b.title} — cover`}
                width={1600}
                height={2560}
                style={{
                  width: "clamp(150px, 22vw, 220px)",
                  height: "auto",
                  borderRadius: "3px",
                  boxShadow: "0 18px 44px rgba(20,17,12,0.28)",
                  display: "block",
                }}
              />
            </Link>
            <div style={{ flex: "1 1 340px", maxWidth: "60ch" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>
                {b.kicker}
              </div>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(26px, 3.6vw, 38px)",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.12,
                  color: "var(--ink)",
                  marginBottom: "14px",
                }}
              >
                {b.title}
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink-muted)", marginBottom: "22px" }}>
                {b.blurb}
              </p>
              <Link
                href={b.href}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--bone)",
                  background: "var(--ink)",
                  padding: "13px 26px",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                }}
              >
                Read the opening free →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* WHERE THE REST WENT — honest, brief, prose */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(24px, 3.2vw, 32px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              marginBottom: "14px",
            }}
          >
            Looking for a book that used to be here?
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,230,0.78)", maxWidth: "62ch", marginBottom: "20px" }}>
            I took the rest of the shelf down to rewrite it in my own hand, one book at
            a time. The essays behind those books are still here, all of them, free.
            When a book is finished, it comes back.
          </p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <Link
              href="/writing"
              style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}
            >
              Read the essays
            </Link>
            <Link
              href="/roadmap"
              style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "rgba(245,240,230,0.75)", textDecoration: "none", borderBottom: "1px solid rgba(245,240,230,0.3)", paddingBottom: "2px" }}
            >
              What's being written
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
