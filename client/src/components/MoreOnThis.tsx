/**
 * MoreOnThis — the end-of-page "More on this" block for any item in the
 * Library: related essays, guides, wisdom topics, and how-tos, chosen from the
 * catalogue by shared Scripture, subject, and title words (lib/catalogue.ts
 * relatedItems). The catalogue loads only when the reader nears the end of the
 * page, so the block costs nothing on a page nobody finishes. Renders nothing
 * until it has something real to show.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { fetchCatalogue, relatedItems, type CatalogueItem } from "@/lib/catalogue";

export default function MoreOnThis({ href, title }: { href: string; title?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(false);
  const [items, setItems] = useState<CatalogueItem[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let stale = false;
    fetchCatalogue()
      .then((c) => { if (!stale) setItems(relatedItems(c.items, href, title)); })
      .catch(() => { /* the block is a courtesy; a failed load just leaves it out */ });
    return () => { stale = true; };
  }, [near, href, title]);

  return (
    <section ref={ref} aria-label={items.length ? "More on this" : undefined} style={{ background: "var(--bone-warm)", padding: items.length ? "var(--s-6) var(--s-4)" : 0 }}>
      {items.length > 0 && (
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>More on this</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "14px" }}>
            {items.map((it) => (
              <li key={`${it.kind}|${it.href}|${it.title}`}>
                <Link
                  href={it.href}
                  style={{ display: "block", height: "100%", boxSizing: "border-box", padding: "16px 18px", background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
                >
                  <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "6px" }}>{it.kind}</div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "1.15rem", fontWeight: 500, lineHeight: 1.25, color: "var(--ink)", marginBottom: it.summary ? "6px" : 0 }}>{it.title}</div>
                  {it.summary && (
                    <p style={{ margin: 0, fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{it.summary}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ margin: "var(--s-4) 0 0", fontFamily: "var(--U)", fontSize: "13px" }}>
            <Link href="/explore" style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
              Everything else is in the Library
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}
