/**
 * OFF THE SHELF (2026-11-17): the Books page says three books and that the
 * rest were taken down. This page stays reachable at its address, says
 * noindex and is out of the sitemap. On 2026-11-18 James made every ebook
 * free, so the book is listed on /downloads with its free download.
 *
 * Is Critical Race Theory Biblical?: the book's own page and its free download.
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

const COVER = "/books/critical-race-theory-biblical.jpg";
const EBOOK = freeEbook("critical-race-theory-biblical")!;

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function IsCriticalRaceTheoryBiblical() {
  return (
    <Layout>
      <SEOMeta
        title="Is Critical Race Theory Biblical?"
        description="Race, justice, and what the church actually owes the world — a Scripture-first reckoning that refuses both wholesale adoption and reflexive dismissal."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/critical-race-theory-biblical`}
        type="book"
        noindex
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="Is Critical Race Theory Biblical? — cover" width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>Free Ebook</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              Is Critical Race Theory Biblical?
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Race, Justice, and What the Church Actually Owes the World
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
            The church did not have a race problem because CRT arrived. CRT simply exposed it.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>When critical race theory reached the church, one side saw a Marxist assault on the gospel and mobilized against it. The other adopted it wholesale and asked the church to confess and dismantle itself. Each had a real reason. The first was guarding the sufficiency of Scripture against a framework that seemed built to replace it; the second had watched the church stay quiet about racial injustice for generations and could not bear one more year of the silence. But both reactions were also a kind of panic, and panic does not read carefully. James Bell refuses both. He offers neither a defense of CRT nor a dismissal of it, but a careful account of what its architects actually claimed and where Scripture both meets and exceeds them.</p>
            <p style={{ margin: "0 0 1.2em" }}>The book asks what the Bible actually teaches about race, ethnicity, justice, and the image of God, and how a church built on the gospel of reconciliation became the institution that defended slavery and maintained segregation. It argues the Bible's vision of justice is more searching than CRT, not less.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>Read what was actually claimed. Then let Scripture, which asks more of us than any theory does, have the last word.</p>
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
        slug="critical-race-theory-biblical"
        related={[
          { href: "/books/when-god-bless-america", title: "When God Bless America Replaces Thy Kingdom Come" },
          { href: "/books/the-monster-in-the-mirror", title: "The Monster in the Mirror" },
          { href: "/books/bible-and-homosexuality", title: "What Does the Bible Really Say About Homosexuality?" },
        ]}
      />
    </Layout>
  );
}
