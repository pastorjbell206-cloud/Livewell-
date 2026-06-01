/**
 * /roadmap — the 48-book public roadmap.
 *
 * Stratechery-style transparency about the work. Shows the published books,
 * the in-development books, and the planned books on one page. Builds
 * anticipation, list growth, and trust.
 *
 * Published books come from the DB. The in-progress and planned lists are
 * hand-authored and edited as priorities change.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { trpc } from "@/lib/trpc";
import { bookUrl } from "@/lib/site";

interface PlannedBook {
  title: string;
  pitch: string;
  for: string;
}

const IN_DEVELOPMENT: PlannedBook[] = [
  {
    title: "When God Bless America Replaces Thy Kingdom Come",
    pitch:
      "The book on Christian nationalism. What it is, what it replaces, and what faithful witness looks like under it.",
    for: "skeptics, Christians, pastors",
  },
  {
    title: "The Monster in the Mirror",
    pitch:
      "A pastor on the parts of himself he wants to deny — and what the gospel says about them anyway.",
    for: "anyone honest enough to read it",
  },
  {
    title: "Why Not What",
    pitch:
      "Theology starts with the wrong question. Until it starts with the right one — why — every answer falls apart.",
    for: "Christians, skeptics",
  },
  {
    title: "HealWell: 52 Weeks in Costly Hope",
    pitch:
      "A devotional that doesn't lie to you. One year of readings written from inside the wound.",
    for: "anyone",
  },
];

const PLANNED: PlannedBook[] = [
  {
    title: "After Christendom",
    pitch: "What faithfulness looks like on the other side of cultural Christianity.",
    for: "pastors, Christians",
  },
  {
    title: "The Loneliness of the Pastor",
    pitch: "The book the PCN was built around. Why pastors quit and what would let them stay.",
    for: "pastors",
  },
  {
    title: "Prophetic Justice 101",
    pitch: "Mishpat, tsedaqah, Micah 6:8, and what the church owes its neighborhood.",
    for: "Christians, pastors",
  },
  {
    title: "The Sermon on the Mount as Politics",
    pitch: "Read it without the spiritualizing. It's a constitution for a different kingdom.",
    for: "skeptics, Christians",
  },
  {
    title: "Marriage in Ministry",
    pitch: "The pressures the parsonage carries that the rest of the marriage manuals never name.",
    for: "couples, pastors",
  },
  {
    title: "Raising Five Sons",
    pitch: "What I learned from showing up every day for two decades. Formation over performance.",
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
  const booksQuery = trpc.books.listPublished.useQuery();
  const published = (booksQuery.data ?? []).filter(b => b.bookType === "authored");

  return (
    <Layout>
      <SEOMeta
        title="The Roadmap — 48 books"
        description="What James Bell has shipped, what's in development, and the planned roadmap of the next ten years."
        url="https://www.livewellbyjamesbell.co/roadmap"
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
            Forty-eight books planned over the next decade. Twenty-five
            already in print. The rest, here in order. Subscribe to the
            weekly letter to know when one lands.
          </p>
        </div>
      </section>

      {/* PUBLISHED */}
      <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Published — {published.length}
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
                key={book.id}
                href={book.slug ? bookUrl(book.slug) : "/books"}
                style={{ textDecoration: "none" }}
              >
                <div style={{ cursor: "pointer" }}>
                  {book.coverImage && (
                    <img
                      src={book.coverImage}
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

      {/* IN DEVELOPMENT */}
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

      {/* PLANNED */}
      <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Planned — {PLANNED.length}+ more
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
            description="The weekly letter announces every new book. No marketing emails. Just the work."
          />
        </div>
      </section>
    </Layout>
  );
}
