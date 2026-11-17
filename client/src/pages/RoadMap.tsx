/**
 * /roadmap: the books on the shelf and the ones planned.
 *
 * Unlinked, noindex and out of the sitemap since 2026-11-17: the page used
 * to state a 48-book plan and a count of books in print, and neither number
 * is settled. The shelf shown is lib/bookShelf.ts, the same three as /books.
 * The planned list is hand-authored.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { NewsletterSignup } from "@/components/NewsletterSignup";

interface PlannedBook {
  title: string;
  pitch: string;
  for: string;
}

// Both titles that used to sit here ("When God Bless America Replaces Thy
// Kingdom Come," "The Monster in the Mirror") are now in print with their own
// book pages, so they belong in the published grid above, not here. Add a
// title only once it is actually being written.
const IN_DEVELOPMENT: PlannedBook[] = [];

const PLANNED: PlannedBook[] = [
  {
    title: "After Christendom",
    pitch: "What faithfulness looks like on the other side of cultural Christianity.",
    for: "pastors, Christians",
  },
  {
    title: "Raising Five Sons",
    pitch: "What a father of five sons has had to unlearn about raising them. Formation over performance.",
    for: "parents",
  },
];

function PlannedRow({
  book,
  variant,
}: {
  book: PlannedBook;
  variant: "dev" | "planned";
}) {
  return (
    <article
      style={{
        padding: "var(--s-3) 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "baseline",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--U)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: variant === "dev" ? "var(--mustard-text)" : "var(--ink-muted)",
          }}
        >
          {variant === "dev" ? "In development" : "Planned"}
        </span>
        <span
          style={{
            fontFamily: "var(--U)",
            fontSize: "10px",
            color: "var(--ink-muted)",
            letterSpacing: "0.06em",
          }}
        >
          For: {book.for}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--F)",
          fontSize: "22px",
          fontWeight: 500,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
          marginBottom: "6px",
        }}
      >
        {book.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--ink-muted)",
          maxWidth: "60ch",
        }}
      >
        {book.pitch}
      </p>
    </article>
  );
}

export default function RoadMap() {
  // The /books shelf, not the database list: the page agrees with /books.
  const published = BOOK_SHELF;

  return (
    <Layout>
      <SEOMeta
        title="The Roadmap"
        description="The books James Bell has on the shelf today and the ones he plans to write next, on one page."
        url="https://www.livewellbyjamesbell.co/roadmap"
        noindex
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
          color: "var(--bone)",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            The Roadmap
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(40px, 6vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              marginBottom: "20px",
              maxWidth: "22ch",
            }}
          >
            What's been written. What's coming.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.75)",
              maxWidth: "62ch",
            }}
          >
            The books on the shelf today are below. The rest get listed here
            when they are actually underway, not before. Subscribe to the
            newsletter to know when one lands.
          </p>
        </div>
      </section>

      {/* PUBLISHED */}
      <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            On the shelf
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
            In print today.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "var(--s-4)",
            }}
          >
            {published.map(book => (
              <Link
                key={book.slug}
                href={book.href}
                style={{ textDecoration: "none" }}
              >
                <div style={{ cursor: "pointer" }}>
                  {book.thumb && (
                    <img
                      src={book.thumb}
                      alt={book.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "2/3",
                        objectFit: "cover",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.3,
                    }}
                  >
                    {book.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IN DEVELOPMENT: shown only when a title is being written. */}
      {IN_DEVELOPMENT.length > 0 && (
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            In Development — {IN_DEVELOPMENT.length}
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: "var(--s-4)",
            }}
          >
            Being written now.
          </h2>
          {IN_DEVELOPMENT.map(b => (
            <PlannedRow key={b.title} book={b} variant="dev" />
          ))}
        </div>
      </section>
      )}

      {/* PLANNED */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Planned
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: "var(--s-4)",
            }}
          >
            On the horizon.
          </h2>
          {PLANNED.map(b => (
            <PlannedRow key={b.title} book={b} variant="planned" />
          ))}
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="roadmap"
            title="Know when the next one lands."
            description="The newsletter says when a new book is out."
          />
        </div>
      </section>
    </Layout>
  );
}
