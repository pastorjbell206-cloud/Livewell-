/**
 * OFF THE SHELF (2026-11-17): the Books page says three books and that the
 * rest were taken down. This page stays reachable at its address, says
 * noindex and is out of the sitemap. On 2026-11-18 James made every ebook
 * free, so the book is listed on /downloads with its free download.
 *
 * The Deconstruction of Faith: the book's own page and its free download.
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

const COVER = "/covers/deconstruction-of-faith-800.webp";
const SHARE = "/covers/deconstruction-of-faith.jpg";
const EBOOK = freeEbook("deconstruction-of-faith")!;

const CHAPTERS: [string, string][] = [
  ["1", "What Deconstruction Actually Is"],
  ["2", "What They Are Really Leaving"],
  ["3", "Why the Church Keeps Missing It"],
  ["4", "The Bible the Critics Found"],
  ["5", "The Jesus Who Was Buried Under the Brand"],
  ["6", "The History the Youth Group Did Not Teach"],
  ["7", "The Path Through"],
  ["8", "What the Church Owes the Deconstructors"],
  ["9", "The Sociology of Loss: Why This Generation, Why Now"],
  ["10", "Science, Creation, and the False Choice"],
  ["11", "The Problem of Hell Revisited"],
  ["12", "Sexuality, the Body, and the Scriptural Imagination"],
  ["13", "The Spiritual Abuse Reckoning"],
  ["14", "Doubt as Devotion: A Theology of Not Knowing"],
  ["15", "Reconstruction: What Faith Looks Like on the Other Side"],
  ["16", "The Church We Could Still Become"],
  ["17", "Parents of Deconstructors: A Long Letter to the Mothers and Fathers"],
  ["18", "Pastors in the Aftermath: When Your Congregation Is the One They Left"],
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function DeconstructionOfFaith() {
  return (
    <Layout>
      <SEOMeta
        title="The Deconstruction of Faith — by James Bell"
        description="An honest reckoning with why people are leaving the church, what the church owes them, and where faith goes from here. Not a defense and not a surrender."
        image={`${SITE_URL}${SHARE}`}
        url={`${SITE_URL}/books/deconstruction-of-faith`}
        type="book"
        noindex
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="The Deconstruction of Faith — cover" width={800} height={1200}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}><EbookLabel /></div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              The Deconstruction of Faith
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Why People Are Leaving the Church — and What Comes After
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
            They are not losing their faith over an argument. They are losing it over a betrayal.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>Across the country, people who once filled the pews are walking out — and the church keeps misreading why. The Deconstruction of Faith is an honest reckoning with what the church has lost, what it owes the people who left, and where faith goes from here. James Bell refuses both the defensive crouch and the easy surrender.</p>
            <p style={{ margin: "0 0 1.2em" }}>He names the wounds without excusing them — purity culture, political captivity, spiritual abuse, the prosperity gospel, the Jesus who got edited out — and he takes the critics' best case seriously enough to answer it. This is not a book that tells you deconstruction is a phase, or a sin, or a trophy. It is a book that tells the truth, and then shows the way through.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>Deconstruction is not the end of the story, and this book is about what it would take to tell the rest of it honestly.</p>
          </div>
        </div>
      </section>

      {/* CONTENTS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>What's Inside</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 500, color: "var(--ink)", margin: "10px 0 28px" }}>
            Eighteen chapters, from the exodus to reconstruction
          </h2>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {CHAPTERS.map(([num, title], i) => (
              <li key={i} style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--mustard-text)", flex: "0 0 96px", paddingTop: "3px" }}>
                  {/^[A-Z]/.test(num) && num.length > 4 ? num : `Chapter ${num}`}
                </span>
                <span style={{ fontFamily: "var(--F)", fontSize: "19px", color: "var(--ink)", lineHeight: 1.3 }}>{title}</span>
              </li>
            ))}
          </ol>
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
        slug="deconstruction-of-faith"
        related={[
          { href: "/books/believe", title: "Believe: The Rational Case for Christian Faith" },
          { href: "/books/the-reliability-of-scripture", title: "The Reliability of Scripture" },
        ]}
      />
    </Layout>
  );
}
