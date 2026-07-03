/**
 * The Monster in the Mirror — dedicated ebook product + purchase page.
 *
 * Self-contained (not DB-backed) so it deploys with the code. The Buy button
 * points at the Stripe Payment Link; Stripe redirects to
 * /books/the-monster-in-the-mirror/thank-you on success, where the EPUB and PDF
 * download links live.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { AUTHOR_BIO, SITE_URL } from "@/lib/site";

const COVER = "/books/the-monster-in-the-mirror.jpg";
const PAYMENT_LINK = "https://buy.stripe.com/fZu7sL0B84Bw7dAdDAa3u04";

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function TheMonsterInTheMirror() {
  return (
    <Layout>
      <SEOMeta
        title="The Monster in the Mirror — by James Bell"
        description="Why every generation gets the Bible wrong, why yours is no different, and what to do about it. A pastoral reckoning with our own blind spots."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/the-monster-in-the-mirror`}
        type="book"
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(220px, 320px) 1fr", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="The Monster in the Mirror — cover" width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>New Book · Ebook Available Now</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              The Monster in the Mirror
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 28px" }}>
              James Bell
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
            The slaveholder was not a monster. That is the point.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>The slaveholder kept a Bible on his desk. The German Christian sang in church. The Pharisee knew the Law by heart. Each one read Scripture sincerely, wrapped a cultural conviction in chapter and verse, and called the result obedience. James Bell takes the long history of the church getting the Bible wrong and turns it back on the reader: the question is not whether earlier generations were blind, but where ours is.</p>
            <p style={{ margin: "0 0 1.2em" }}>This is a book about reading Scripture against yourself — testing the conclusions you already hold instead of arming them, and learning to tell the difference between what the text says and what your community has decided it must say.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>The monster in the mirror is not the past. It is the face looking back.</p>
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
            {AUTHOR_BIO}
          </p>
        </div>
      </section>
    </Layout>
  );
}
