/**
 * BookNextSteps — the shared closing for the standalone ebook funnel pages.
 *
 * Those pages used to end at buy-or-leave: buy button, author bio, nothing
 * else. This adds two quiet sections after the final buy section — the one
 * real newsletter form (source-tagged per book for attribution) and a short
 * shelf of links to other book pages. Every href must be a real route in
 * client/src/App.tsx.
 */
import { Link } from "wouter";

import { NewsletterSignup } from "@/components/NewsletterSignup";

export interface RelatedBookLink {
  href: string;
  title: string;
}

export function BookNextSteps({
  slug,
  related,
}: {
  /** The book's route slug; recorded as `book-<slug>` on the subscriber row. */
  slug: string;
  /** Two or three thematically adjacent book pages. */
  related: RelatedBookLink[];
}) {
  return (
    <>
      {/* NEWSLETTER — same pitch as BookDetail so the copy stays one variant */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            title="If this book is your kind of reading"
            description="One serious essay a week in the same vein — theology that meets the actual Tuesday afternoon. No spam, ever."
            source={`book-${slug}`}
          />
        </div>
      </section>

      {/* MORE FROM JAMES BELL — a small shelf, not a banner */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--ink)", margin: "0 0 4px" }}>
            More from James Bell
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {related.map(book => (
              <li key={book.href} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <Link
                  href={book.href}
                  style={{ display: "inline-flex", alignItems: "baseline", gap: "10px", textDecoration: "none" }}
                >
                  <span style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.3, color: "var(--ink)", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
                    {book.title}
                  </span>
                  <span aria-hidden style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
