/**
 * BookLibrary (/read) — the reading room. Lists the full-length books that can
 * be read online here, from client/public/books/index.json
 * (scripts/build-books-index.mjs). These are the pillar books, each drawn from
 * the site's articles and pathways.
 *
 * The front door does three jobs: bring a returning reader straight back to the
 * chapter they left (continue-reading), let anyone find a book by word or pillar
 * (search + filter), and otherwise browse the full shelf grouped by pillar.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import {
  fetchLibraryBooks,
  groupBooksByPillar,
  readBookChapter,
  type LibraryBook,
} from "@/lib/libraryBooks";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

function BookCard({ b }: { b: LibraryBook }) {
  return (
    <Link href={`/read/${b.slug}`} style={{ display: "flex", flexDirection: "column", background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none", overflow: "hidden" }}>
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
          <div style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.12, color: "var(--charcoal-fg)" }}>{b.title}</div>
        </div>
      )}
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontFamily: "var(--F)", fontSize: "17px", lineHeight: 1.18, color: "var(--ink)", marginBottom: "5px" }}>{b.title}</div>
        <div style={{ fontFamily: "var(--U)", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--mustard-text)" }}>{b.chapters} chapters · Read →</div>
      </div>
    </Link>
  );
}

/** A book the reader has opened past chapter one — the resume row. */
interface InProgress {
  book: LibraryBook;
  chapter: number;
}

function ResumeCard({ p }: { p: InProgress }) {
  const pct = p.book.chapters > 0 ? Math.round((p.chapter / p.book.chapters) * 100) : 0;
  return (
    <Link
      href={`/read/${p.book.slug}#ch-${p.chapter}`}
      style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px", background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", padding: "16px 18px", textDecoration: "none", minHeight: "128px" }}
    >
      <div>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Continue reading</div>
        <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.15, color: "var(--ink)" }}>{p.book.title}</div>
      </div>
      <div>
        <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden", marginBottom: "8px" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "var(--mustard)" }} />
        </div>
        <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)" }}>
          Chapter {p.chapter} of {p.book.chapters} · Resume →
        </div>
      </div>
    </Link>
  );
}

const norm = (s: string) => s.toLowerCase();

export default function BookLibrary() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  // Distinguishes "still loading" from "loaded and empty". The library ships
  // with dozens of books, so an empty result after load is a manifest load
  // failure, never "nothing written yet".
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [pillar, setPillar] = useState<string | null>(null);

  useEffect(() => {
    fetchLibraryBooks().then((b) => {
      setBooks(b);
      setLoaded(true);
    });
  }, []);

  // Books opened past chapter one, read from the same storage key the reader
  // writes. Recomputed only when the shelf loads (localStorage is synchronous).
  const inProgress = useMemo<InProgress[]>(
    () =>
      books
        .map((book) => ({ book, chapter: readBookChapter(book.slug) }))
        .filter((p) => p.chapter > 1),
    [books],
  );

  // The pillars actually present, in shelf order — the filter row.
  const pillars = useMemo(() => groupBooksByPillar(books).map((g) => g.pillar), [books]);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return books.filter((b) => {
      if (pillar && (b.pillar || "More from the Library") !== pillar) return false;
      if (!q) return true;
      return [b.title, b.subtitle, b.blurb, b.pillar].some((f) => f && norm(f).includes(q));
    });
  }, [books, query, pillar]);

  const groups = useMemo(() => groupBooksByPillar(filtered), [filtered]);
  const searching = query.trim().length > 0 || pillar !== null;

  const chipBase: React.CSSProperties = {
    fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.01em",
    padding: "7px 13px", borderRadius: "999px", cursor: "pointer", whiteSpace: "nowrap",
    border: "1px solid var(--border)", background: "var(--card)", color: "var(--ink-muted)",
  };
  const chipActive: React.CSSProperties = { background: "var(--charcoal)", color: "var(--charcoal-fg)", borderColor: "var(--ink)" };

  return (
    <Layout>
      <SEOMeta
        title="The Library — Books to Read Online | James Bell"
        description="Full-length books by James Bell, free online: the deep things of doctrine, the captive church, the cause of the poor, and the undivided life."
        url={`${SITE_URL}/read`}
      />
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
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

      {inProgress.length > 0 && (
        <section style={{ background: "var(--bone-warm)", borderBottom: "1px solid var(--border)", padding: "var(--s-4) var(--s-4)" }}>
          <div style={wrap}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)" }}>
              Pick up where you left off
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)" }}>
              {inProgress.map((p) => <ResumeCard key={p.book.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {!loaded ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the library…</p>
          ) : books.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>The library could not load right now. Please refresh the page.</p>
          ) : (
            <>
              {/* Find a book: free-text search + pillar chips. */}
              <div style={{ marginBottom: "var(--s-5)" }}>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the library — title, subject, or pillar"
                  aria-label="Search the library"
                  style={{ width: "100%", maxWidth: "520px", fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink)", background: "var(--card)", border: "1px solid var(--border)", padding: "12px 16px", borderRadius: "6px", marginBottom: "var(--s-3)" }}
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} role="group" aria-label="Filter by pillar">
                  <button type="button" onClick={() => setPillar(null)} aria-pressed={pillar === null} style={{ ...chipBase, ...(pillar === null ? chipActive : {}) }}>
                    All books
                  </button>
                  {pillars.map((p) => (
                    <button key={p} type="button" onClick={() => setPillar(p)} aria-pressed={pillar === p} style={{ ...chipBase, ...(pillar === p ? chipActive : {}) }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {searching && (
                <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", marginBottom: "var(--s-4)" }}>
                  {filtered.length} {filtered.length === 1 ? "book" : "books"}
                  {pillar ? ` in ${pillar}` : ""}
                  {query.trim() ? ` matching “${query.trim()}”` : ""}
                </p>
              )}

              {filtered.length === 0 ? (
                <p style={{ fontFamily: "var(--B)", fontSize: "17px", color: "var(--ink-muted)" }}>
                  No books match that. <button type="button" onClick={() => { setQuery(""); setPillar(null); }} style={{ background: "none", border: "none", padding: 0, color: "var(--mustard-text)", fontFamily: "var(--B)", fontSize: "17px", cursor: "pointer", textDecoration: "underline" }}>Clear the filters</button> to see the whole shelf.
                </p>
              ) : (
                groups.map((g) => (
                  <section key={g.pillar} style={{ marginBottom: "var(--s-6)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginBottom: "var(--s-3)", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
                      <h2 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)" }}>{g.pillar}</h2>
                      <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)", whiteSpace: "nowrap" }}>{g.books.length} {g.books.length === 1 ? "book" : "books"}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(210px, 100%), 1fr))", gap: "var(--s-3)" }}>
                      {g.books.map((b) => <BookCard key={b.slug} b={b} />)}
                    </div>
                  </section>
                ))
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
