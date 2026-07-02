/**
 * Covenant (/covenant). The ebook sales page: cover, pitch, a free sample (the
 * opening, served from /books/covenant-sample.md), and a Buy button. The full
 * book is delivered as a gated PDF via /api/checkout -> /api/download after
 * payment.
 */
import { useEffect, useState } from "react";
import { Streamdown } from "streamdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { BuyEbookButton } from "@/components/BuyEbookButton";

const SLUG = "covenant";
const TITLE = "Covenant";
const SUBTITLE = "Why Marriage Is a Promise, Not a Deal";
const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

export default function Covenant() {
  const [sample, setSample] = useState<string | null>(null);

  useEffect(() => {
    fetch("/books/covenant-sample.md")
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("not found"))))
      .then((md) => setSample(md.trim()))
      .catch(() => setSample(""));
  }, []);

  return (
    <Layout>
      <SEOMeta
        title={`${TITLE} — An Ebook by James Bell`}
        description="A short book on marriage as covenant, not contract. Why tips don't save a marriage built on a deal, and why the promise is what holds it. PDF ebook."
        url={`${SITE_URL}/${SLUG}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: TITLE,
          author: { "@type": "Person", name: "James Bell" },
          url: `${SITE_URL}/${SLUG}`,
          bookFormat: "https://schema.org/EBook",
          inLanguage: "en",
          offers: { "@type": "Offer", price: "9.99", priceCurrency: "USD" },
        }}
      />

      {/* HERO — cover + buy */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={{ ...prose, display: "flex", gap: "44px", alignItems: "center", flexWrap: "wrap" }}>
          <img
            src="/books/covenant.svg"
            alt={`${TITLE} cover`}
            width={210}
            height={315}
            style={{ width: "190px", height: "auto", borderRadius: "3px", boxShadow: "0 16px 48px rgba(0,0,0,.55)", flex: "0 0 auto" }}
          />
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
              New Ebook · On Marriage
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 50px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "14px 0 12px" }}>
              {TITLE}
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 22px", maxWidth: "40ch" }}>
              {SUBTITLE}
            </p>
            <BuyEbookButton slug={SLUG} />
            <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "rgba(245,240,230,.55)", marginTop: "12px" }}>
              PDF · instant download · secure checkout by Stripe
            </p>
          </div>
        </div>
      </section>

      {/* PITCH */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-4)" }}>
        <div style={prose}>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.8, color: "var(--ink)" }}>
            The culture handed us a blueprint for marriage and called it romance. Underneath the wedding language it
            is a contract: a deal between two individuals, sustained by satisfaction, dissolvable when the
            satisfaction runs out. We say covenant vows at the altar and run the marriage on contract terms, and then
            we are baffled when it cracks. This short book names that swap, and recovers the older and far more
            demanding thing the vows actually promised. Marriage as a covenant, a binding promise that holds two
            people when the feeling cannot, modeled on a God who keeps faith with people who break theirs.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>
            By James Bell, who came to faith from atheism, was raised without a father, and is teaching five sons to
            keep a promise he was never shown. Read the opening below, free.
          </p>
        </div>
      </section>

      {/* FREE SAMPLE */}
      <section style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-5)" }}>
        <div style={prose} className="book-prose">
          {sample ? <Streamdown>{sample}</Streamdown> : <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the opening…</p>}
        </div>
      </section>

      {/* BUY AGAIN */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ ...prose, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "24px", fontStyle: "italic", margin: "0 0 22px", color: "rgba(245,240,230,.92)" }}>
            It is not your love that sustains the marriage. It is the marriage that sustains your love.
          </p>
          <div style={{ display: "inline-flex" }}>
            <BuyEbookButton slug={SLUG} />
          </div>
        </div>
      </section>

      <style>{`
        .book-prose { font-family: var(--B); color: var(--ink); }
        .book-prose h2 { font-family: var(--F); font-weight: 400; font-size: clamp(24px, 3.2vw, 32px); letter-spacing: -0.015em; line-height: 1.2; margin: 2.2em 0 0.6em; color: var(--ink); }
        .book-prose p { font-size: 18px; line-height: 1.85; margin: 0 0 1.15em; color: var(--ink); }
        .book-prose blockquote { border-left: 3px solid var(--mustard); margin: 1.8em 0; padding: 0.2em 0 0.2em 1.1em; font-family: var(--F); font-style: italic; font-size: 22px; line-height: 1.5; color: var(--ink); }
        .book-prose blockquote p { font-size: inherit; font-style: inherit; }
        .book-prose hr { border: none; border-top: 1px solid var(--border); margin: 2.4em 0; }
        .book-prose em { font-style: italic; }
      `}</style>
    </Layout>
  );
}
