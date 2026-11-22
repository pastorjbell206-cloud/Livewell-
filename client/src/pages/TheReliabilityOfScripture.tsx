/**
 * OFF THE SHELF (2026-11-17): the Books page says three books and that the
 * rest were taken down. This page stays reachable at its address, says
 * noindex and is out of the sitemap. On 2026-11-18 James made every ebook
 * free, so the book is listed on /downloads with its free download.
 *
 * The Reliability of Scripture: the book's own page and its free download.
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

const COVER = "/covers/the-reliability-of-scripture-800.webp";
const SHARE = "/covers/the-reliability-of-scripture.jpg";
const EBOOK = freeEbook("the-reliability-of-scripture")!;

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function TheReliabilityOfScripture() {
  return (
    <Layout>
      <SEOMeta
        title="The Reliability of Scripture — by James Bell"
        description="Why we can trust the Bible we have — the manuscripts, the canon, the archaeology, and the difference between what inerrancy claims and what its critics attack."
        image={`${SITE_URL}${SHARE}`}
        url={`${SITE_URL}/books/the-reliability-of-scripture`}
        type="book"
        noindex
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="The Reliability of Scripture — cover" width={800} height={1200}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}><EbookLabel /></div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              The Reliability of Scripture
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Why We Can Trust the Bible We Have
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 28px" }}>
              James Bell
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
            When someone leaves the church over the Bible, it is rarely because the evidence was overwhelming. More often it is because the silence in the room was.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>Too many believers were handed a Bible and told it was true, but never shown the case. So when the hard questions came — about manuscripts, contradictions, the canon, the difference between what inerrancy claims and what its critics attack — the room went quiet, and people walked away from the silence rather than the evidence. James Bell refuses that silence.</p>
            <p style={{ margin: "0 0 1.2em" }}>This is a walk through the manuscript rooms, the archaeology, and the canonization history, written for the believer with real questions and the skeptic who suspects the Bible cannot survive an honest examination. A faith that was never shown its own evidence tends to collapse the first time it is pressed. A faith that has looked at the evidence can at least stand there and answer.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>It does not ask you to stop asking. It asks you to ask harder.</p>
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
        slug="the-reliability-of-scripture"
        related={[
          { href: "/books/believe", title: "Believe: The Rational Case for Christian Faith" },
          { href: "/books/blind-spots", title: "Blind Spots" },
          { href: "/books/deconstruction-of-faith", title: "The Deconstruction of Faith" },
        ]}
      />
    </Layout>
  );
}
