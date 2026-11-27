/**
 * OFF THE SHELF (2026-11-17): the Books page says three books and that the
 * rest were taken down. This page stays reachable at its address, says
 * noindex and is out of the sitemap. On 2026-11-18 James made every ebook
 * free, so the book is listed on /downloads with its free download.
 *
 * What Does the Bible Really Say About Homosexuality?: the book's own page
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
import { EbookLabel, OfferLine, OfferMeta } from "@/components/BookOffer";
import { SITE_URL } from "@/lib/site";

const COVER = "/covers/bible-and-homosexuality-800.webp";
const SHARE = "/covers/bible-and-homosexuality.jpg";
const EBOOK = freeEbook("bible-and-homosexuality")!;

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function BibleAndHomosexuality() {
  return (
    <Layout>
      <SEOMeta
        title="What Does the Bible Really Say About Homosexuality?"
        description="Scripture, same-sex relationships, and the church's Christ-centered response, in a pastoral reading that refuses the false choice between truth and love."
        image={`${SITE_URL}${SHARE}`}
        url={`${SITE_URL}/books/bible-and-homosexuality`}
        type="book"
        noindex
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="What Does the Bible Really Say About Homosexuality? — cover" width={800} height={1200}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}><EbookLabel /></div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              What Does the Bible Really Say About Homosexuality?
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Scripture, Same-Sex Relationships, and the Church's Christ-Centered Response
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 28px" }}>
              James C. Bell
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="charcoal" />
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,.65)" }}>
                <OfferMeta pdf={EBOOK.pdf} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PITCH */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 28px" }}>
            People are not issues. They are image-bearers.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>One side quotes verses like weapons until conviction curdles into cruelty. The other abandons the text entirely and calls capitulation compassion. Both betray the gospel, and the person at the center of the question is the one who pays. James Bell, writing after fifteen years of pastoral ministry, refuses the false choice between truth and love.</p>
            <p style={{ margin: "0 0 1.2em" }}>This book works carefully through the relevant passages, the history of their interpretation, and the strongest case on every side before it draws a conclusion. It is written for the believer wrestling honestly, the family torn between love and conviction, and the pastor who wants to be both faithful and kind in the same sentence.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>The person at the center of this question deserves the whole truth and the whole welcome, and the church has to learn to offer both at once.</p>
          </div>
        </div>
      </section>

      {/* BUY + BIO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 400, margin: "0 0 14px" }}>Read it now</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "52ch", margin: "0 auto 28px" }}>
            <OfferLine />
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="charcoal" />
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,.6)", maxWidth: "56ch", margin: "44px auto 0", borderTop: "1px solid rgba(245,240,230,.18)", paddingTop: "28px" }}>
            James Bell is a pastor and a writer. He came to faith from atheism, and he writes for the reader whose faith has outgrown the answers they were given.
          </p>
        </div>
      </section>

      <BookNextSteps
        slug="bible-and-homosexuality"
        related={[
          { href: "/books/bible-and-transgender-identity", title: "What Does the Bible Say About Transgender Identity?" },
          { href: "/books/blind-spots", title: "Blind Spots" },
          { href: "/books/critical-race-theory-biblical", title: "Is Critical Race Theory Biblical?" },
        ]}
      />
    </Layout>
  );
}
