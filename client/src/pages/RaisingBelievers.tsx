/**
 * Raising Believers — dedicated ebook product + purchase page.
 *
 * Self-contained (not DB-backed) so it deploys with the code. The Buy button
 * points at the Stripe Buy Button; Stripe redirects to
 * /books/raising-believers/thank-you on success, where the EPUB and PDF download links live.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BookNextSteps } from "@/components/BookNextSteps";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { SITE_URL } from "@/lib/site";

const COVER = "/books/raising-believers.jpg";
const PAYMENT_LINK = "https://buy.stripe.com/28E6oH0B85FAbtQdDAa3u03";

const CHAPTERS: [string, string][] = [
  ["1", "What We Mean When We Say Formation"],
  ["2", "The Home Is the Primary Catechism"],
  ["3", "When the Church Replaces the Parent"],
  ["4", "The Questions Children Actually Ask"],
  ["5", "Obedience Without Gospel"],
  ["6", "Discipline, Correction, and the Shape of Grace"],
  ["7", "Screens, Algorithms, and the Catechesis of Attention"],
  ["8", "Marriage as the First Classroom"],
  ["9", "The Teenage Years, When Formation Goes Underground"],
  ["10", "Fathers, Presence, and the Weight of Blessing"],
  ["11", "Single Parents, Blended Families, and the God Who Holds"],
  ["12", "Grandparents and the Long Memory of Faith"],
  ["13", "When They Walk Away"],
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function RaisingBelievers() {
  return (
    <Layout>
      <SEOMeta
        title="Raising Believers: Christian Parenting in a Post-Christian World — by James Bell"
        description="A pastor and father of five sons on what it actually takes to form faith in children — in the home, the church, and the long obedience of years."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/raising-believers`}
        type="book"
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(min(220px, 100%), 320px) 1fr", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt="Raising Believers — cover" width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>New Book · Ebook Available Now</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              Raising Believers
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Christian Parenting and the Costly Work of Forming Faith in a Post-Christian World
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
            You cannot give your children a faith you do not have.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>Raising Believers is for parents who have done everything the church told them to do and watched it not take. James Bell — a pastor and the father of five sons — argues that faith is not transmitted by programs, pledges, or the right youth group. It is formed in the home, in the slow obedience of years, by parents who are being formed themselves.</p>
            <p style={{ margin: "0 0 1.2em" }}>He is honest about the cost and honest about his own failures. He takes on screens and attention, discipline and grace, marriage as the first classroom, the teenage years when formation goes underground, and the hardest chapter of all — when they walk away. No formulas. No guarantees. Only the long, costly work of raising believers in a world that is no longer doing it for you.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>Not a method. A long obedience.</p>
          </div>
        </div>
      </section>

      {/* CONTENTS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>What's Inside</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 500, color: "var(--ink)", margin: "10px 0 28px" }}>
            Thirteen chapters, from the kitchen table to the long goodbye
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
        slug="raising-believers"
        related={[
          { href: "/books/believe", title: "Believe: The Rational Case for Christian Faith" },
          { href: "/books/deconstruction-of-faith", title: "The Deconstruction of Faith" },
          { href: "/consider-the-birds", title: "Consider the Birds" },
        ]}
      />
    </Layout>
  );
}
