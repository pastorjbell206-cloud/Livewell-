/**
 * BookReader (/read/:slug) — a generic full-manuscript reader. Renders a book
 * from client/public/books/<slug>.json (the same chapter shape as the
 * leadership handbook: {n, slug, title, summary, verdict, body, reflect}) with
 * a table of contents and the shared editorial prose system. These are the
 * pillar books, drawn from the site's articles and pathways and read in full.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Markdown } from "@/components/Markdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageEndNav from "@/components/PageEndNav";
import { SITE_URL } from "@/lib/site";

const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

interface Chapter { n: number; slug?: string; title: string; summary?: string; verdict?: string; body: string; reflect?: string[] }
interface Book { title: string; subtitle?: string; blurb?: string; pillar?: string; chapters: Chapter[] }

// These titles are sold as paid ebooks; their downloads go through checkout,
// so the free reader offers no PDF for them. Every other library book has a
// PDF generated from its chapters by scripts/build-pdfs.mjs.
const PAID_BOOK_SLUGS = new Set(["born-again-from-atheism", "the-god-who-is-not-nice"]);

export default function BookReader() {
  const [, params] = useRoute("/read/:slug");
  const slug = params?.slug;
  // The fetch result is tagged with the slug it answered; book/missing are
  // derived per render, so navigating to a new slug resets the view without a
  // synchronous setState in the effect.
  const [result, setResult] = useState<{ slug: string; book: Book | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/books/${slug}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setResult({ slug, book: d?.chapters ? d : null }))
      .catch(() => setResult({ slug, book: null }));
  }, [slug]);

  const book = result && result.slug === slug ? result.book : null;
  const missing = !!result && result.slug === slug && result.book === null;

  if (missing) {
    return (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={prose}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "32px", color: "var(--ink)", marginBottom: "12px" }}>That book is not here yet.</h1>
            <Link href="/read" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Back to the library</Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOMeta
        title={book ? `${book.title} — A Book by James Bell` : "Reading…"}
        description={book?.blurb || book?.subtitle || "A book by James Bell."}
        url={`${SITE_URL}/read/${slug}`}
        type="article"
        author="James Bell"
        structuredData={book ? { "@context": "https://schema.org", "@type": "Book", name: book.title, author: { "@type": "Person", name: "James Bell" }, url: `${SITE_URL}/read/${slug}`, bookFormat: "https://schema.org/EBook", inLanguage: "en" } : undefined}
      />

      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={{ ...prose, display: "flex", gap: "var(--s-5)", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>
              <Link href="/read" style={{ color: "inherit", textDecoration: "none" }}>The Library</Link>{book?.pillar ? ` · ${book.pillar}` : ""}
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 14px", maxWidth: "18ch" }}>
              {book?.title ?? "Loading…"}
            </h1>
            {book?.subtitle && <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 18px", maxWidth: "40ch" }}>{book.subtitle}</p>}
            {book?.blurb && <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,.82)", maxWidth: "60ch" }}>{book.blurb}</p>}
            {book && slug && !PAID_BOOK_SLUGS.has(slug) && (
              <a
                href={`/downloads/books/${slug}.pdf`}
                style={{
                  display: "inline-block", marginTop: "22px", padding: "12px 22px",
                  background: "var(--mustard)", color: "var(--ink)", textDecoration: "none",
                  fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600,
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Download the PDF
              </a>
            )}
          </div>
          {book && slug && (
            <img
              src={`/books/${slug}.svg`}
              alt={`${book.title} cover`}
              width={180}
              height={270}
              style={{ flex: "0 0 auto", width: "180px", height: "270px", objectFit: "cover", border: "1px solid rgba(245,240,230,0.15)", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
            />
          )}
        </div>
      </section>

      {!book ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "40vh" }}>
          <div style={prose}><p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the book…</p></div>
        </section>
      ) : (
        <>
          <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
            <div style={prose}>
              <div style={eyebrow}>Contents</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--ink)", margin: "10px 0 20px" }}>{book.chapters.length} chapters</h2>
              <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {book.chapters.map((c) => (
                  <li key={c.n} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <a href={`#ch-${c.n}`} style={{ display: "flex", gap: "16px", textDecoration: "none", color: "inherit" }}>
                      <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, color: "var(--mustard-text)", flex: "0 0 28px", paddingTop: "4px" }}>{String(c.n).padStart(2, "0")}</span>
                      <span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "20px", color: "var(--ink)", lineHeight: 1.2 }}>{c.title}</span>
                        {c.summary && <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginTop: "2px" }}>{c.summary}</span>}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
            <div style={prose}>
              {book.chapters.map((c) => (
                <article key={c.n} id={`ch-${c.n}`} style={{ marginBottom: "var(--s-7)", paddingBottom: "var(--s-6)", borderBottom: "1px solid var(--border)", scrollMarginTop: "80px" }}>
                  <div style={eyebrow}>Chapter {c.n}</div>
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "8px 0 var(--s-4)", lineHeight: 1.1 }}>{c.title}</h2>
                  {/* No prose-section modifier on purpose: every chapter opens with a drop cap, like a printed book. */}
                  <div className="article-body">
                    <Markdown>{c.body}</Markdown>
                  </div>
                  {c.verdict && <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontStyle: "italic", color: "var(--mustard-text)", margin: "var(--s-4) 0 var(--s-4)", paddingLeft: "20px", borderLeft: "3px solid var(--mustard)" }}>{c.verdict}</p>}
                  {c.reflect && c.reflect.length > 0 && (
                    <div style={{ background: "var(--bone-warm)", padding: "18px 22px", borderRadius: "var(--radius-sm)" }}>
                      <div style={{ ...eyebrow, marginBottom: "10px" }}>Reflect</div>
                      <ol style={{ margin: 0, paddingLeft: "20px" }}>
                        {c.reflect.map((q, i) => (
                          <li key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "6px" }}>{q}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <PageEndNav back={{ href: "/read", label: "The Library" }} />
        </>
      )}
    </Layout>
  );
}
