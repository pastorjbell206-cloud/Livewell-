/**
 * When God Bless America — dedicated ebook product + purchase page.
 *
 * Self-contained (not DB-backed) so it deploys with the code and can't be
 * knocked out by a content seed. The Buy button points at the Stripe Payment
 * Link; Stripe redirects to /books/when-god-bless-america/thank-you on success,
 * where the EPUB and PDF download links live.
 */
import { createElement, useEffect } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BookNextSteps } from "@/components/BookNextSteps";
import { AUTHOR_BIO, SITE_URL } from "@/lib/site";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe";

const COVER = "/books/when-god-bless-america.jpg";

/** Stripe's hosted Buy Button web component — this book predates the Payment
 *  Link pattern the sibling pages use (components/StripeBuyButton), and the
 *  embedded button is what its Stripe product is wired to. Loads the script
 *  once, then renders the <stripe-buy-button> custom element (created via
 *  createElement so it needs no JSX intrinsic-element declaration). The
 *  publishable key is public by design and lives in lib/stripe. */
function StripeBuyButton() {
  useEffect(() => {
    if (!document.getElementById("stripe-buy-button-js")) {
      const s = document.createElement("script");
      s.id = "stripe-buy-button-js";
      s.async = true;
      s.src = "https://js.stripe.com/v3/buy-button.js";
      document.head.appendChild(s);
    }
  }, []);
  return createElement("stripe-buy-button", {
    "buy-button-id": "buy_btn_1ThiwSG7Y8x20otNSD1wDhtI",
    "publishable-key": STRIPE_PUBLISHABLE_KEY,
  });
}

const CHAPTERS: [string, string][] = [
  ["Introduction", "Not Persecuted—Seduced"],
  ["One", "Zanah: When You Keep the Vows and Give Away the Heart"],
  ["Two", "Chariots Aren’t Evil—But They Aren’t Ultimate"],
  ["Three", "The Messiah You Want vs. the Messiah You Need"],
  ["Four", "“Jesus Is Lord”—The Most Dangerous Sentence in the Empire"],
  ["Five", "Civil Religion: When a Nation Borrows Sacred Words"],
  ["Six", "How Christian Nationalism Quietly Rewrites Doctrine"],
  ["Seven", "Constantine’s Bargain: Protection and Its Price"],
  ["Eight", "Germany’s Warning: Baptized Nationalism and Moral Catastrophe"],
  ["Nine", "The Generational Cost: When Hypocrisy Makes the Gospel Unbelievable"],
  ["Ten", "Cross and Sword: Two Theologies of Power"],
  ["Conclusion", "Repent, Not Retreat"],
  ["Afterword", "A Confession and an Invitation"],
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function WhenGodBlessAmerica() {
  return (
    <Layout>
      <SEOMeta
        title="When God Bless America Replaces Thy Kingdom Come — by James Bell"
        description="A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary. Available now as an ebook."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/books/when-god-bless-america`}
        type="book"
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img
            src={COVER}
            alt="When God Bless America Replaces Thy Kingdom Come — cover"
            width={1600} height={2416}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }}
          />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>New Book · Ebook Available Now</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              When God Bless America Replaces Thy Kingdom Come
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              How Patriotism Became Our Practical Savior
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 28px" }}>
              James Bell
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <StripeBuyButton />
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
            American Christianity is not mainly being persecuted. It is being seduced.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>
              In a time of political panic, rising tribalism, and growing confusion inside the church, many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith remains. The rituals remain. The worship remains. But the heart has moved.
            </p>
            <p style={{ margin: "0 0 1.2em" }}>
              In <em>When God Bless America Replaces Thy Kingdom Come</em>, James Bell writes to the church in America as a pastor inside it — from Scripture, from church history, and from what he has watched happen in his own sanctuary. He exposes how patriotism can become practical salvation, how fear can rewrite doctrine, and how the cross confronts every attempt to turn Jesus into a mascot for political power.
            </p>
            <p style={{ margin: 0, fontWeight: 600 }}>
              This is not a book about who to vote for. It is a book about who you worship.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENTS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>What’s Inside</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 500, color: "var(--ink)", margin: "10px 0 28px" }}>
            Thirteen movements, from Hosea to the cross
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 400, margin: "0 0 14px" }}>
            Read it now
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "52ch", margin: "0 auto 28px" }}>
            $9.99 for the complete ebook — EPUB for your e-reader and PDF for everything else, delivered the moment you check out.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StripeBuyButton />
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,.6)", maxWidth: "56ch", margin: "44px auto 0", borderTop: "1px solid rgba(245,240,230,.18)", paddingTop: "28px" }}>
            {AUTHOR_BIO}
          </p>
        </div>
      </section>

      <BookNextSteps
        slug="when-god-bless-america"
        related={[
          { href: "/books/the-monster-in-the-mirror", title: "The Monster in the Mirror" },
          { href: "/books/critical-race-theory-biblical", title: "Is Critical Race Theory Biblical?" },
          { href: "/books/deconstruction-of-faith", title: "The Deconstruction of Faith" },
        ]}
      />
    </Layout>
  );
}
