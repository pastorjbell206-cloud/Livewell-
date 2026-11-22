/**
 * Blind Spots (published earlier as The Monster in the Mirror): the book's own page, with its free download (James,
 * 2026-11-18: every ebook is free). The PDF and EPUB are static files under
 * /ebook/the-monster-in-the-mirror/ (the file keeps its address), listed in data/ebooks.ts. The old Stripe link and its
 * /thank-you page are gone; the thank-you address redirects to /downloads.
 */
import Layout from "@/components/Layout";
import Place from "@/components/art/Place";
import { SEOMeta } from "@/components/SEOMeta";
import { BookNextSteps } from "@/components/BookNextSteps";
import { FreeEbookButtons, formerlyLine } from "@/components/FreeEbookButtons";
import { freeEbook } from "@/data/ebooks";
import { AUTHOR_BIO, SITE_URL } from "@/lib/site";

const COVER = "/books/the-monster-in-the-mirror.jpg";
const EBOOK = freeEbook("blind-spots")!;

export default function BlindSpots() {
  return (
    <Layout>
      <SEOMeta
        title="Blind Spots by James Bell"
        description="Why every generation gets the Bible wrong, why yours is no different, and what to do about it. A pastoral reckoning with our own blind spots."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/blind-spots`}
        type="book"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="Cover of Blind Spots" width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <Place path="/books/blind-spots" after="Free ebook" dark style={{ margin: 0 }} />
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              Blind Spots
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 12px" }}>
              James Bell
            </p>
            {EBOOK.formerly && (
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--charcoal-fg-muted)", margin: "0 0 28px" }}>{formerlyLine(EBOOK.formerly)}</p>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="charcoal" />
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
            The slaveholder was not a monster. That is the point.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>The slaveholder kept a Bible on his desk. The German Christian sang in church. The Pharisee knew the Law by heart. Each one read Scripture sincerely, wrapped a cultural conviction in chapter and verse, and called the result obedience. James Bell takes the long history of the church getting the Bible wrong and turns it back on the reader, who has to ask where our own generation is blind.</p>
            <p style={{ margin: "0 0 1.2em" }}>This is a book about reading Scripture against yourself. That means testing the conclusions you already hold instead of arming them, and learning to tell the difference between what the text says and what your community has decided it must say.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>The monster in the mirror is not the past. It is the face looking back.</p>
          </div>
        </div>
      </section>

      {/* BUY + BIO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 400, margin: "0 0 14px" }}>Read it now</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "52ch", margin: "0 auto 28px" }}>
            Free to download: an EPUB for your e-reader and a PDF for everything else.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="charcoal" />
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,.6)", maxWidth: "56ch", margin: "44px auto 0", borderTop: "1px solid rgba(245,240,230,.18)", paddingTop: "28px" }}>
            {AUTHOR_BIO}
          </p>
        </div>
      </section>

      <BookNextSteps
        slug="blind-spots"
        related={[
          { href: "/books/the-reliability-of-scripture", title: "The Reliability of Scripture" },
          { href: "/books/a-higher-allegiance", title: "A Higher Allegiance" },
          { href: "/books/critical-race-theory-biblical", title: "Is Critical Race Theory Biblical?" },
        ]}
      />
    </Layout>
  );
}
