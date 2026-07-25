/**
 * Believe — dedicated ebook product + purchase page.
 *
 * Self-contained (not DB-backed) so it deploys with the code. The Buy button
 * points at the Stripe Buy Button; Stripe redirects to
 * /books/believe/thank-you on success, where the EPUB and PDF download links live.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BookNextSteps } from "@/components/BookNextSteps";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { SITE_URL } from "@/lib/site";

const COVER = "/books/believe.jpg";
const PAYMENT_LINK = "https://buy.stripe.com/28E28r6ZwfgagOa9nka3u01";

const CHAPTERS: [string, string][] = [
  ["1", "Why Is There Something Rather Than Nothing?"],
  ["2", "Can We Actually Trust the Bible?"],
  ["3", "Who Did Jesus Think He Was?"],
  ["4", "Did Jesus Really Rise from the Dead?"],
  ["5", "If God Is Good, Why Is There So Much Suffering?"],
  ["6", "How Could a Loving God Send People to Hell?"],
  ["7", "Christianity and Science"],
  ["8", "What About People Who've Never Heard?"],
  ["9", "Why Christianity and Not Other Religions?"],
  ["10", "Why Atheism Can't Sustain the Human Heart"],
  ["11", "Every Objection Answered"],
  ["12", "What Does God Actually Want From You?"],
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function Believe() {
  return (
    <Layout>
      <SEOMeta
        title="Believe: The Rational Case for Christian Faith — by James Bell"
        description="Rational answers to the hardest questions skeptics ask about God, the Bible, the resurrection, suffering, and hell, from a pastor who was once an atheist."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/believe`}
        type="book"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="Believe — cover" width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>New Book · Ebook Available Now</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              Believe
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              The Rational Case for Christian Faith
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
            He came to faith from atheism. He did not arrive by feeling his way there.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>Believe is for the reader whose questions have outgrown the answers they were handed in church — and for the skeptic who suspects Christianity cannot survive an honest cross-examination. James Bell takes the hardest questions one at a time: why there is something rather than nothing, whether the Bible can be trusted, who Jesus thought he was, whether the resurrection happened, why a good God allows suffering, and how anyone could speak of hell.</p>
            <p style={{ margin: "0 0 1.2em" }}>He does not flinch and he does not flatter. Every objection gets its strongest form before it gets an answer. The atheists are quoted at their most formidable, not their most convenient. This is apologetics written from inside the doubt, by a man who once stood outside the faith and walked away — until the evidence walked after him.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>It is not a book that asks you to stop thinking. It is a book that asks you to keep going.</p>
          </div>
        </div>
      </section>

      {/* CONTENTS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>What's Inside</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 500, color: "var(--ink)", margin: "10px 0 28px" }}>
            Twelve questions, from the cosmos to the cross
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
        slug="believe"
        related={[
          { href: "/books/the-reliability-of-scripture", title: "The Reliability of Scripture" },
          { href: "/books/deconstruction-of-faith", title: "The Deconstruction of Faith" },
          { href: "/books/the-monster-in-the-mirror", title: "The Monster in the Mirror" },
        ]}
      />
    </Layout>
  );
}
