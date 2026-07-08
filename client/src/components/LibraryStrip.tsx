/**
 * LibraryStrip — a homepage feature that pulls readers into the /read library.
 * Shows one cover per pillar (a varied, curated row) with a link to browse all.
 * Renders nothing until the library manifest loads, so it never blocks paint.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { fetchLibraryBooks, featuredAcrossPillars, type LibraryBook } from "@/lib/libraryBooks";

export function LibraryStrip() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  useEffect(() => {
    fetchLibraryBooks().then(setBooks);
  }, []);

  const featured = featuredAcrossPillars(books, 6);
  if (featured.length === 0) return null;

  return (
    <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
      <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--s-4)", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: "12px" }}>The Library</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--ink)", maxWidth: "24ch" }}>
              Read a whole book, free.
            </h2>
          </div>
          <Link
            href="/read"
            style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}
          >
            Browse the library →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 45%), 1fr))", gap: "var(--s-3)" }}>
          {featured.map((b) => (
            <Link key={b.slug} href={`/read/${b.slug}`} style={{ display: "flex", flexDirection: "column", background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none", overflow: "hidden" }}>
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
                <div style={{ aspectRatio: "2 / 3", background: "var(--charcoal)" }} />
              )}
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "15px", lineHeight: 1.16, color: "var(--ink)", marginBottom: "4px" }}>{b.title}</div>
                <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, color: "var(--mustard-text)" }}>{b.chapters} chapters</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
