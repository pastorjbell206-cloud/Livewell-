/**
 * BookLibrary (/read) — the reading room. Lists the full-length books that can
 * be read online here, from client/public/books/index.json
 * (scripts/build-books-index.mjs). These are the pillar books, each drawn from
 * the site's articles and pathways.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Entry { slug: string; title: string; subtitle?: string; blurb?: string; pillar?: string; chapters: number }

export default function BookLibrary() {
  const [books, setBooks] = useState<Entry[]>([]);
  useEffect(() => {
    fetch("/books/index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.books && setBooks(d.books))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="The Library — Books to Read Online | James Bell"
        description="Full-length books by James Bell, free online: the deep things of doctrine, the captive church, the cause of the poor, and the undivided life."
        url={`${SITE_URL}/read`}
      />
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>The Library</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Books to read, free, in full.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Each book gathers the writing of one pillar into a single argument, meant to be read straight through or studied a chapter at a time with the companion guide.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {books.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>The first books are being written. Check back soon.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "var(--s-3)" }}>
              {books.map((b) => (
                <Link key={b.slug} href={`/read/${b.slug}`} style={{ display: "flex", gap: "var(--s-4)", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "3px solid var(--mustard)", padding: "var(--s-4)", textDecoration: "none" }}>
                  <img
                    src={`/books/${b.slug}.svg`}
                    alt={`${b.title} cover`}
                    width={110}
                    height={165}
                    loading="lazy"
                    style={{ flex: "0 0 110px", width: "110px", height: "165px", objectFit: "cover", border: "1px solid rgba(20,17,12,0.08)" }}
                  />
                  <div style={{ minWidth: 0 }}>
                    {b.pillar && <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>{b.pillar}</div>}
                    <div style={{ fontFamily: "var(--F)", fontSize: "24px", lineHeight: 1.15, color: "var(--ink)", marginBottom: "6px" }}>{b.title}</div>
                    {b.subtitle && <div style={{ fontFamily: "var(--F)", fontSize: "15px", fontStyle: "italic", color: "var(--ink-muted)", marginBottom: "10px" }}>{b.subtitle}</div>}
                    {b.blurb && <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "12px" }}>{b.blurb}</p>}
                    <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)" }}>{b.chapters} chapters · Read →</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
