/**
 * Ordinary Holiness (/ordinary-holiness). The ebook sales page: cover, pitch, a free sample
 * (the opening, served from /books/ordinary-holiness-sample.md), and a Buy button. The
 * full book is delivered as a gated PDF via /api/checkout -> /api/download
 * after payment.
 */
import { useEffect, useState } from "react";
import { Markdown } from "@/components/Markdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { BuyEbookButton } from "@/components/BuyEbookButton";

const SLUG = "ordinary-holiness";
const TITLE = "Ordinary Holiness";
const SUBTITLE = "Finding God in the Life You Actually Have";
const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

export default function OrdinaryHoliness() {
  const [sample, setSample] = useState<string | null>(null);

  useEffect(() => {
    fetch("/books/ordinary-holiness-sample.md", { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("not found"))))
      .then((md) => setSample(md.trim()))
      .catch(() => setSample(""));
  }, []);

  return (
    <Layout>
      <SEOMeta
        title={`${TITLE} — An Ebook by James Bell`}
        description={"A theology of the ordinary — work as worship, the table, the neighbor — finding God in the life you actually have, not the spectacular one."}
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
            src="/books/ordinary-holiness.svg"
            alt={`${TITLE} cover`}
            width={210}
            height={315}
            style={{ width: "190px", height: "auto", borderRadius: "3px", boxShadow: "0 16px 48px rgba(0,0,0,.55)", flex: "0 0 auto" }}
          />
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
              New Ebook · On Everyday Faith
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
            We were taught to look for God on the mountaintop, and so we miss him in the only place he mostly comes: the ordinary. The dishes, the commute, the diaper, the meeting, the marriage on a Tuesday, the work no one sees. Holiness is not an escape from ordinary life into a more religious one. It is God met and served in the life you already have. This is a theology of the ordinary, for people tired of being told their real life is a distraction from the spiritual one.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>
            By James Bell, who keeps looking for God in the dramatic and finding him in the dishes. Read the opening below, free.
          </p>
        </div>
      </section>

      {/* FREE SAMPLE */}
      <section style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-5)" }}>
        <div style={prose} className="book-prose">
          {sample ? <Markdown>{sample}</Markdown> : <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the opening…</p>}
        </div>
      </section>

      {/* BUY AGAIN */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ ...prose, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "24px", fontStyle: "italic", margin: "0 0 22px", color: "rgba(245,240,230,.92)" }}>
            Holiness is not somewhere else. It is here, in the life you already have.
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
