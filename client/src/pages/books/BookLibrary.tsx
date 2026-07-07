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
import { fetchLibraryBooks, groupBooksByPillar, type LibraryBook } from "@/lib/libraryBooks";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

function BookCard({ b }: { b: LibraryBook }) {
  return (
    <Link href={`/read/${b.slug}`} style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", textDecoration: "none", overflow: "hidden" }}>
      {b.cover ? (
        <img
          src={b.cover}
          alt={`${b.title} — book cover`}
          loading="lazy"
          width={800}
          height={1200}
          style={{ width: "100%", height: "auto", aspectRatio: "2 / 3", display: "block", background: "var(--charcoal)" }}
        />
      ) : (
        <div style={{ aspectRatio: "2 / 3", background: "var(--charcoal)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--s-4)" }}>
          {b.pillar && <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>{b.pillar}</div>}
          <div style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.12, color: "var(--bone)" }}>{b.title}</div>
        </div>
      )}
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontFamily: "var(--F)", fontSize: "17px", lineHeight: 1.18, color: "var(--ink)", marginBottom: "5px" }}>{b.title}</div>
        <div style={{ fontFamily: "var(--U)", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--mustard-text)" }}>{b.chapters} chapters · Read →</div>
      </div>
    </Link>
  );
}

export default function BookLibrary() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  useEffect(() => {
    fetchLibraryBooks().then(setBooks);
  }, []);
  const groups = groupBooksByPillar(books);

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
            groups.map((g) => (
              <section key={g.pillar} style={{ marginBottom: "var(--s-6)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginBottom: "var(--s-3)", borderBottom: "1px solid rgba(20,17,12,0.1)", paddingBottom: "10px" }}>
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)" }}>{g.pillar}</h2>
                  <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)", whiteSpace: "nowrap" }}>{g.books.length} {g.books.length === 1 ? "book" : "books"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(210px, 100%), 1fr))", gap: "var(--s-3)" }}>
                  {g.books.map((b) => <BookCard key={b.slug} b={b} />)}
                </div>
              </section>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}
