/**
 * What Does the Bible Really Say About Homosexuality? — dedicated ebook product
 * + purchase page.
 *
 * Self-contained (not DB-backed) so it deploys with the code. The Buy button
 * points at the Stripe Payment Link; Stripe redirects to
 * /books/bible-and-homosexuality/thank-you on success, where the EPUB and PDF
 * download links live.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BookNextSteps } from "@/components/BookNextSteps";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { SITE_URL } from "@/lib/site";

const COVER = "/books/bible-and-homosexuality.jpg";
const PAYMENT_LINK = "https://buy.stripe.com/28E5kDcjQ3xs8hEeHEa3u06";

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function BibleAndHomosexuality() {
  return (
    <Layout>
      <SEOMeta
        title="What Does the Bible Really Say About Homosexuality? — by James C. Bell"
        description="Scripture, same-sex relationships, and the church's Christ-centered response — a pastoral reading that refuses the false choice between truth and love."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/bible-and-homosexuality`}
        type="book"
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(min(220px, 100%), 320px) 1fr", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="What Does the Bible Really Say About Homosexuality? — cover" width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>New Book · Ebook Available Now</div>
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
              <StripeBuyButton paymentLink={PAYMENT_LINK} />
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,.65)" }}>
                EPUB + PDF · instant download · secure checkout by Stripe
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
            <p style={{ margin: "0 0 1.2em" }}>One side quotes verses like weapons until conviction curdles into cruelty. The other abandons the text entirely and calls capitulation compassion. Both betray the gospel, and the person at the center of the question is the one who pays. James Bell, writing after twenty years of pastoral ministry, refuses the false choice between truth and love.</p>
            <p style={{ margin: "0 0 1.2em" }}>This book works carefully through the relevant passages, the history of their interpretation, and the strongest case on every side before it draws a conclusion. It is written for the believer wrestling honestly, the family torn between love and conviction, and the pastor who wants to be both faithful and kind in the same sentence.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>Clarity and compassion can occupy the same room. The church has to build that room.</p>
          </div>
        </div>
      </section>

      {/* BUY + BIO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 400, margin: "0 0 14px" }}>Read it now</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "52ch", margin: "0 auto 28px" }}>
            $9.99 for the complete ebook — EPUB for your e-reader and PDF for everything else, delivered the moment you check out.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StripeBuyButton paymentLink={PAYMENT_LINK} />
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,.6)", maxWidth: "56ch", margin: "44px auto 0", borderTop: "1px solid rgba(245,240,230,.18)", paddingTop: "28px" }}>
            James Bell is the Lead Pastor of First Baptist Church of Fenton, founder of the Pastors Connection Network, and the author of more than twenty books. He came to faith from atheism and writes for the reader whose faith has outgrown the answers they were given.
          </p>
        </div>
      </section>

      <BookNextSteps
        slug="bible-and-homosexuality"
        related={[
          { href: "/books/bible-and-transgender-identity", title: "What Does the Bible Say About Transgender Identity?" },
          { href: "/books/the-monster-in-the-mirror", title: "The Monster in the Mirror" },
          { href: "/books/critical-race-theory-biblical", title: "Is Critical Race Theory Biblical?" },
        ]}
      />
    </Layout>
  );
}
