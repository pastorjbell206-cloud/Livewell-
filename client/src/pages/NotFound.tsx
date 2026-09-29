import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/**
 * 404 — the one page a lost reader lands on. It keeps the room: the site's
 * own header and footer, cream, Cormorant, quiet. No alarm icons; a wrong
 * turn is not an emergency. A search already filled with the words from the
 * broken address, then the real doors: Start Here, the twelve essays to
 * start with, and all the writing.
 */

/** The last path segment, de-slugged ("the-cost-of-grace" → "the cost of grace"): a first guess at the search. */
export function guessFromPath(path: string): string {
  const last = path.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? "";
  let decoded = last;
  try {
    decoded = decodeURIComponent(last);
  } catch {
    /* malformed escape: use it as typed */
  }
  return decoded
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .replace(/[-_+]+/g, " ")
    .replace(/[^A-Za-z0-9\u00C0-\u024F' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

const DOORS = [
  { href: "/start", label: "Start here", note: "Where a newcomer begins." },
  { href: "/canon", label: "The twelve to start with", note: "The essays the rest of the site stands on." },
  { href: "/writing", label: "All the writing", note: "Every essay, newest first." },
  { href: "/help", label: "Find help", note: "For what you are facing right now." },
];

export default function NotFound() {
  const [location] = useLocation();
  const [query, setQuery] = useState(() => guessFromPath(location));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    window.location.href = q ? "/search?q=" + encodeURIComponent(q) : "/search";
  };

  return (
    <Layout>
      <SEOMeta title="Page Not Found" description="This page doesn't exist. The writing, the books, and the tools are still where they were." />
      <section style={{ background: "var(--bone)", padding: "clamp(56px, 10vw, 112px) var(--gutter) clamp(48px, 8vw, 96px)" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px" }}>Page not found</div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontWeight: 400,
              fontSize: "clamp(36px, 6vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: "0 0 20px",
            }}
          >
            There is no page here.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 32px", maxWidth: "52ch" }}>
            The address may have changed, or the link was wrong. Nothing is
            lost. Search for what you came for, or take one of the doors below.
          </p>

          <form role="search" onSubmit={onSubmit} style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "48px" }}>
            <label htmlFor="notfound-search" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
              Search the writing
            </label>
            <input
              id="notfound-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the essays, books and guides"
              style={{
                flex: "1 1 260px",
                minWidth: 0,
                padding: "13px 16px",
                fontFamily: "var(--U)",
                fontSize: "16px",
                color: "var(--ink)",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
              }}
            />
            <button
              type="submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 22px",
                minHeight: "48px",
                fontFamily: "var(--U)",
                fontSize: "14px",
                fontWeight: 600,
                background: "var(--charcoal)",
                color: "var(--charcoal-fg)",
                border: "none",
                borderBottom: "2px solid var(--mustard)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              <Search size={16} aria-hidden /> Search
            </button>
          </form>

          <nav aria-label="Ways back in">
            <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border)" }}>
              {DOORS.map((d) => (
                <li key={d.href} style={{ borderBottom: "1px solid var(--border)" }}>
                  <Link
                    href={d.href}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap", padding: "16px 0", textDecoration: "none" }}
                  >
                    <span style={{ fontFamily: "var(--F)", fontSize: "22px", color: "var(--ink)" }}>{d.label}</span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>{d.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </Layout>
  );
}
