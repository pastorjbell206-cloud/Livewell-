/**
 * OFF THE SHELF (2026-11-17): the Books page says three books and that the
 * rest were taken down. This page stays reachable at its address, says
 * noindex and is out of the sitemap. On 2026-11-18 James made every ebook
 * free, so the book is listed on /downloads with its free download.
 *
 * What Does the Bible Say About Transgender Identity?: the book's own page
 * and its free download.
 *
 * Self-contained (not DB-backed) so it deploys with the code. Every ebook is
 * free (James, 2026-11-18): the PDF and EPUB are static files listed in
 * data/ebooks.ts, and the old /thank-you address redirects to /downloads.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BookNextSteps } from "@/components/BookNextSteps";
import { FreeEbookButtons } from "@/components/FreeEbookButtons";
import { freeEbook } from "@/data/ebooks";
import { SITE_URL } from "@/lib/site";

const COVER = "/books/bible-and-transgender-identity.jpg";
const EBOOK = freeEbook("bible-and-transgender-identity")!;

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function BibleAndTransgenderIdentity() {
  return (
    <Layout>
      <SEOMeta
        title="What Does the Bible Say About Transgender Identity?"
        description="Gender, the body, and the church's Christ-centered response — a pastoral reading where clarity and compassion occupy the same room."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/bible-and-transgender-identity`}
        type="book"
        noindex
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="What Does the Bible Say About Transgender Identity? — cover" width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>Free Ebook</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              What Does the Bible Say About Transgender Identity?
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Gender, the Body, and the Church's Christ-Centered Response
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 28px" }}>
              James C. Bell
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="ink" />
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,.65)" }}>
                Free · EPUB and PDF · no email asked
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PITCH */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 28px" }}>
            The church should be the safest place for the most confused person. We have not been.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>Gender identity became a dominant cultural question while the church was asleep, and it woke up already behind and already polarized — forced to choose between two failures. Some churches went to dismissal, turning people's deepest confusion into punchlines. Others went to capitulation, refusing to do theology in case theology caused discomfort. Both leave the teenager, the young adult in real distress, and the torn parent with nowhere safe to turn.</p>
            <p style={{ margin: "0 0 1.2em" }}>James Bell takes the questions the church was never prepared to answer — about gender, the body, and what we owe people made in God's image — and works through them with both biblical clarity and pastoral care. He treats the searching person as a person, not a position to defend or surrender.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>Clarity and compassion can occupy the same room. This book builds that room.</p>
          </div>
        </div>
      </section>

      {/* BUY + BIO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 400, margin: "0 0 14px" }}>Read it now</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "52ch", margin: "0 auto 28px" }}>
            Free to download: an EPUB for your e-reader and a PDF for everything else.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="ink" />
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,.6)", maxWidth: "56ch", margin: "44px auto 0", borderTop: "1px solid rgba(245,240,230,.18)", paddingTop: "28px" }}>
            James Bell is a pastor and a writer. He came to faith from atheism, and he writes for the reader whose faith has outgrown the answers they were given.
          </p>
        </div>
      </section>

      <BookNextSteps
        slug="bible-and-transgender-identity"
        related={[
          { href: "/books/bible-and-homosexuality", title: "What Does the Bible Really Say About Homosexuality?" },
          { href: "/books/the-monster-in-the-mirror", title: "The Monster in the Mirror" },
        ]}
      />
    </Layout>
  );
}
