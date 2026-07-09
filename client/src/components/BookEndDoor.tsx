/**
 * BookEndDoor — what a reader sees after a book's last chapter.
 *
 * Two quiet doors instead of a dead end: the next book in the same pillar
 * (alphabetically after the current one, wrapping) and the pillar's landing
 * page. Resolution goes through PILLAR_PAGES in lib/libraryBooks — the one
 * pillar-string resolver. Renders nothing until the manifest loads.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { fetchLibraryBooks, booksForPillars, pillarPageFor, type LibraryBook } from "@/lib/libraryBooks";

export function BookEndDoor({ currentSlug, pillar }: { currentSlug: string; pillar?: string }) {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  useEffect(() => {
    fetchLibraryBooks().then(setBooks);
  }, []);

  const shelf = pillar ? booksForPillars(books, [pillar]).filter((b) => b.slug !== currentSlug) : [];
  const current = books.find((b) => b.slug === currentSlug);
  // The next book alphabetically after this one, wrapping to the shelf's start.
  const next = shelf.find((b) => current && b.title.localeCompare(current.title) > 0) ?? shelf[0];
  const page = pillarPageFor(pillar);

  if (!next) return null;

  return (
    <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
      <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: "14px" }}>You finished the book</div>
        <div style={{ display: "flex", gap: "var(--s-4)", alignItems: "stretch", flexWrap: "wrap" }}>
          <Link href={`/read/${next.slug}`} style={{ flex: "1 1 300px", display: "flex", gap: "16px", background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none", overflow: "hidden" }}>
            {next.cover && (
              <img
                src={next.cover}
                alt={`${next.title} — book cover`}
                loading="lazy"
                width={800}
                height={1200}
                style={{ width: "84px", height: "auto", objectFit: "cover", display: "block", background: "var(--charcoal)", flexShrink: 0 }}
              />
            )}
            <div style={{ padding: "16px 16px 16px 0", display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", minWidth: 0 }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Next in {page.label}</div>
              <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.2, color: "var(--ink)" }}>{next.title}</div>
              <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)" }}>{next.chapters} chapters · Read →</div>
            </div>
          </Link>
          <Link href={page.href} style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px", background: "var(--card)", border: "1px solid var(--border)", padding: "18px 20px", textDecoration: "none" }}>
            <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Go deeper</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.2, color: "var(--ink)" }}>Everything in {page.label}</div>
            <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)" }}>Essays, tools, and the rest →</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
