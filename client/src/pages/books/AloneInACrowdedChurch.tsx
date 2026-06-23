/**
 * Alone in a Crowded Church (/books/alone-in-a-crowded-church). A free, full
 * book on pastoral loneliness and the case for brotherhood, read on-site.
 * The manuscript lives as markdown at /books/alone-in-a-crowded-church.md and
 * is rendered with Streamdown, the same way the Servant Leadership Handbook works.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "0.75rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "var(--mustard)",
};

const TITLE = "Alone in a Crowded Church";
const SUBTITLE = "Why Pastors Burn Out in Silence, and How Brotherhood Brings Them Back";

export default function AloneInACrowdedChurch() {
  const [body, setBody] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/books/alone-in-a-crowded-church.md", { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("not found"))))
      .then((md) => {
        // Drop the title/subtitle/byline/epigraph front matter (everything
        // before the first horizontal rule); the hero renders it instead.
        const parts = md.split(/\n---\n/);
        setBody((parts.length > 1 ? parts.slice(1).join("\n---\n") : md).trim());
      })
      .catch(() => setFailed(true));
  }, []);

  return (
    <Layout>
      <SEOMeta
        title={`${TITLE} — A Free Book for Pastors by James Bell`}
        description="A free book on pastoral loneliness and the case for brotherhood. Why pastors burn out in silence, what Scripture and church history say about it, and the first step back. By James Bell, founder of the Pastors Connection Network."
        url={`${SITE_URL}/books/alone-in-a-crowded-church`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: TITLE,
          author: { "@type": "Person", name: "James Bell" },
          url: `${SITE_URL}/books/alone-in-a-crowded-church`,
          bookFormat: "https://schema.org/EBook",
          inLanguage: "en",
        }}
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={prose}>
          <div style={eyebrow}>
            <Link href="/books" style={{ color: "inherit", textDecoration: "none" }}>
              Books
            </Link>{" "}
            · A Free Book for Pastors
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: "16px 0 14px",
              maxWidth: "18ch",
            }}
          >
            {TITLE}
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 18px", maxWidth: "42ch" }}>
            {SUBTITLE}
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.05em", color: "rgba(245,240,230,.6)" }}>
            By James Bell · Pastors Connection Network
          </p>
        </div>
      </section>

      {/* BODY */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={prose} className="book-prose">
          {body && <Streamdown>{body}</Streamdown>}
          {!body && !failed && <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the book…</p>}
          {failed && (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>
              This book is being set up. Please check back soon.
            </p>
          )}
        </div>
      </section>

      {/* SUPPORT / PCN CTA */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ ...prose, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontStyle: "italic", margin: "0 0 18px", color: "rgba(245,240,230,.9)" }}>
            If this met you in the loneliness, you are exactly who it was written for.
          </p>
          <Link
            href="/pastors"
            style={{
              display: "inline-block",
              background: "var(--mustard)",
              color: "var(--ink)",
              fontFamily: "var(--U)",
              fontWeight: 600,
              fontSize: "14px",
              padding: "12px 24px",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
            }}
          >
            Find your brothers at PCN
          </Link>
        </div>
      </section>

      <style>{`
        .book-prose { font-family: var(--B); color: var(--ink); }
        .book-prose h2 { font-family: var(--F); font-weight: 400; font-size: clamp(26px, 3.4vw, 34px); letter-spacing: -0.015em; line-height: 1.2; margin: 2.4em 0 0.6em; color: var(--ink); }
        .book-prose h3 { font-family: var(--F); font-weight: 500; font-size: 20px; margin: 1.8em 0 0.5em; color: var(--ink); }
        .book-prose p { font-size: 18px; line-height: 1.85; margin: 0 0 1.15em; color: var(--ink); }
        .book-prose blockquote { border-left: 3px solid var(--mustard); margin: 1.8em 0; padding: 0.2em 0 0.2em 1.1em; font-family: var(--F); font-style: italic; font-size: 22px; line-height: 1.5; color: var(--ink); }
        .book-prose blockquote p { font-size: inherit; font-style: inherit; }
        .book-prose hr { border: none; border-top: 1px solid var(--border); margin: 2.6em 0; }
        .book-prose em { font-style: italic; }
      `}</style>
    </Layout>
  );
}
