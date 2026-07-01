/**
 * The Scandal of the Cross (/the-scandal-of-the-cross). The ebook sales page: cover, pitch, a free sample
 * (the opening, served from /books/the-scandal-of-the-cross-sample.md), and a Buy button. The
 * full book is delivered as a gated PDF via /api/checkout -> /api/download.
 */
import { useEffect, useState } from "react";
import { Streamdown } from "streamdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { BuyEbookButton } from "@/components/BuyEbookButton";

const SLUG = "the-scandal-of-the-cross";
const TITLE = "The Scandal of the Cross";
const SUBTITLE = "Why the Death of God Is the Center of Everything";
const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

export default function TheScandalOfTheCross() {
  const [sample, setSample] = useState<string | null>(null);

  useEffect(() => {
    fetch("/books/the-scandal-of-the-cross-sample.md", { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("not found"))))
      .then((md) => setSample(md.trim()))
      .catch(() => setSample(""));
  }, []);

  return (
    <Layout>
      <SEOMeta
        title={`${TITLE} — An Ebook by James Bell`}
        description={"A recovery of the cross as the scandalous center of the Christian faith: why a good God would die, what the atonement accomplishes across its major models, and why the crucified God is the deepest answer to guilt, shame, suffering, and death. PDF ebook by James Bell."}
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
            src="/books/the-scandal-of-the-cross.svg"
            alt={`${TITLE} cover`}
            width={210}
            height={315}
            style={{ width: "190px", height: "auto", borderRadius: "3px", boxShadow: "0 16px 48px rgba(0,0,0,.55)", flex: "0 0 auto" }}
          />
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
              New Ebook · On the Cross
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 50px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "14px 0 12px" }}>
              {TITLE}
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 22px", maxWidth: "42ch" }}>
              {SUBTITLE}
            </p>
            <BuyEbookButton slug={SLUG} title={TITLE} />
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
            We turned the cross into jewelry. The first Christians could not soften it, because they lived where crosses stood on the roadside with men dying on them. This book recovers the scandal at the center of the faith: why a good God would die, what the cross actually does, and why the death of God is the deepest answer the world has ever been offered to guilt, shame, violence, suffering, and death. Not the cross as decoration. The cross as the hinge of history.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>
            By James Bell, holding the great models of the atonement together instead of trading them for a slogan. Read the opening below, free.
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
            We made the cross into jewelry. The first Christians could not even say the word without flinching.
          </p>
          <div style={{ display: "inline-flex" }}>
            <BuyEbookButton slug={SLUG} title={TITLE} />
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
