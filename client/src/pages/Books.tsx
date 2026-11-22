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
import PageHead from "@/components/art/PageHead";
import { SITE_URL, ogImageUrl } from "@/lib/site";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { FreeEbookButtons } from "@/components/FreeEbookButtons";
import { freeEbook } from "@/data/ebooks";

const BOOKS = BOOK_SHELF;

export default function Books() {
  return (
    <Layout>
      <SEOMeta
        title="Books by James Bell"
        description="The books James Bell wrote himself: When God Bless America Replaces Thy Kingdom Come, Blind Spots, and Believe. Each is a free ebook to download."
        image={ogImageUrl("Books by James Bell", "LiveWell")}
        url={`${SITE_URL}/books`}
      />

      <PageHead door="About" doorHref="/about" title="Books by James Bell" line="I wrote all three of these myself." plate="books">
        <p className="pg-head__lede">
          I write about the church and the country, about reading the Bible without
          flattering ourselves, and about whether any of this holds up under honest
          questions. Each one is a free ebook: a PDF to read anywhere and an EPUB for e-readers.
        </p>
      </PageHead>

      {/* THE THREE — one full-width row each, alternating cream */}
      {BOOKS.map((b, i) => (
        <section
          key={b.slug}
          style={{
            background: i % 2 === 0 ? "var(--bone)" : "var(--bone-warm)",
            padding: "var(--s-6) var(--gutter)",
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
                alt={`Cover of ${b.title}`}
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
              {(() => {
                const eb = freeEbook(b.slug);
                return eb ? <FreeEbookButtons title={b.title} pdf={eb.pdf} epub={eb.epub} /> : null;
              })()}
              <Link href={b.href} className="btn--text" style={{ marginTop: "8px" }}>
                See what is in the book
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* WHERE THE REST WENT — honest, brief, prose */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--gutter)" }}>
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
            a time. When a book is finished, it comes back.
          </p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <Link
              href="/writing"
              style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--charcoal-fg)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}
            >
              Read the essays
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
