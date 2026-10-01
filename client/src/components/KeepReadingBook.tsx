/**
 * KeepReadingBook — the article-to-book funnel. Every essay ends with a card
 * pointing the reader to the book that carries its argument to full length.
 *
 * The shelf holds exactly the three books James wrote by hand, so the card
 * recommends one of those three only where the match is real (the essay's
 * slug or track genuinely belongs to that book's argument). Everywhere else
 * it shows the shelf itself rather than pretending a match — the claim "the
 * argument runs to full length in X" is only ever made when it is true.
 */
import { Link } from "wouter";
import { resolveTrack } from "@/lib/taxonomy";
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
  /** Route to the product page. */
  href: string;
  /** Cover path. */
  cover: string;
}

const BOOKS: Record<string, BookRef> = {
  "when-god-bless-america": {
    slug: "when-god-bless-america",
    title: "When God Bless America Replaces Thy Kingdom Come",
    sub: "How Patriotism Became Our Practical Savior",
    blurb: "Civil religion named for what it is — idolatry with a flag for a shroud — and the older allegiance underneath.",
    href: "/books/when-god-bless-america",
    cover: "/books/when-god-bless-america.webp",
  },
  "the-monster-in-the-mirror": {
    slug: "the-monster-in-the-mirror",
    title: "The Monster in the Mirror",
    sub: "Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It",
    blurb: "Six American cultural lenses that quietly distort how we read Scripture, and what it looks like to read against your own assumptions.",
    href: "/books/the-monster-in-the-mirror",
    cover: "/books/the-monster-in-the-mirror.webp",
  },
  "believe": {
    slug: "believe",
    title: "Believe",
    sub: "The Rational Case for Christian Faith",
    blurb: "The hardest questions skeptics ask about God, the Bible, the resurrection, suffering, and hell, answered by a pastor who was once an atheist.",
    href: "/books/believe",
    cover: "/books/believe.webp",
  },
};

/** Slug-keyword rules: an essay routes to a book only when the match is real.
 *  First match wins; most-specific rules first. */
const SLUG_BOOK_RULES: Array<{ keywords: string[]; book: string }> = [
  { keywords: ["god-bless-america", "nationalis", "civil-religion", "patriot", "pledge", "flag", "voting-bloc", "precinct"], book: "when-god-bless-america" },
  { keywords: ["atheis", "skeptic", "unbelie", "deconstruct", "doubt", "why-believe", "resurrection-evidence", "does-god-exist"], book: "believe" },
  { keywords: ["cultural-lens", "gets-the-bible-wrong", "misread", "proof-text", "read-the-bible", "individualism", "consumer-christian"], book: "the-monster-in-the-mirror" },
];

function bookFor(post: PostLike): BookRef | null {
  const slug = (post.slug ?? "").toLowerCase();
  if (slug) {
    for (const rule of SLUG_BOOK_RULES) {
      if (rule.keywords.some((k) => slug.includes(k))) return BOOKS[rule.book];
    }
  }

  const track = resolveTrack(post.pillar ?? null)?.slug;
  if (track === "politics") return BOOKS["when-god-bless-america"];
  if (track === "doubt") return BOOKS["believe"];
  if (track === "theology") return BOOKS["the-monster-in-the-mirror"];

  return null;
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
    if (!book) return null;
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
            src={book.cover}
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
              href={book.href}
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

  if (!book) {
    // No honest single match: show the shelf itself.
    const shelf = Object.values(BOOKS);
    return (
      <section style={{ background: "var(--ink)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
            Keep reading · The books
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, color: "var(--bone)", margin: "8px 0 6px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Three books, written by hand
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "rgba(245,240,230,.8)", margin: "0 0 20px", maxWidth: "60ch" }}>
            The long arguments behind the essays: the flag and the kingdom, the lenses that bend how we read Scripture, and the case for belief from a pastor who was once an atheist.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {shelf.map((b) => (
              <Link
                key={b.slug}
                href={b.href}
                onClick={() => trackBookClick(post.slug ?? "", b.slug)}
                style={{ display: "flex", gap: "12px", alignItems: "center", textDecoration: "none", flex: "1 1 220px", minWidth: "220px" }}
              >
                <img
                  src={b.cover}
                  alt=""
                  width={54}
                  height={81}
                  style={{ width: "54px", height: "auto", borderRadius: "2px", flex: "0 0 auto", boxShadow: "0 8px 20px rgba(0,0,0,.45)" }}
                />
                <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", lineHeight: 1.4, color: "var(--bone)" }}>{b.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--ink)", padding: "var(--s-6) var(--s-4)" }}>
      <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
        <img
          src={book.cover}
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
          <Link href={book.href} onClick={() => trackBookClick(post.slug ?? "", book.slug)} style={{ display: "inline-block", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 26px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
            Read the book →
          </Link>
        </div>
      </div>
    </section>
  );
}
