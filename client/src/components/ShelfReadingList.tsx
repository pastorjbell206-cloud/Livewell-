/**
 * ShelfReadingList: the reading rows on a crisis-facing landing page (/grief,
 * /church-hurt, /marriage-crisis, /deconstruction, /faith-crisis,
 * /parenting-help).
 *
 * Each page names the essays it was written around. Only those on the public
 * shelf are listed (lib/shelf.ts), so no row sends a reader in a hard season
 * to a retired notice. When none of them is on the shelf, the page's own
 * care resources (plans, studies, tools that are live) stand in, under one
 * plain sentence saying so. When an essay comes back on the shelf, its row
 * reappears here on its own.
 */
import { Link } from "wouter";

import { filterPublicPosts } from "@/lib/shelf";

export interface LandingEssay {
  title: string;
  slug: string;
}

export interface LandingResource {
  title: string;
  href: string;
}

const row = {
  padding: "20px 0",
  borderBottom: "1px solid var(--border)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
} as const;
const title = { fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" } as const;
const action = { fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)", flexShrink: 0 } as const;

export function ShelfReadingList({
  essays,
  fallback,
}: {
  essays: readonly LandingEssay[];
  /** Live, non-essay resources for the same need, shown when no essay is on the shelf. */
  fallback: readonly LandingResource[];
}) {
  const onShelf = filterPublicPosts(essays);
  const items = onShelf.length
    ? onShelf.map((e) => ({ title: e.title, href: `/writing/${e.slug}`, label: "Read" }))
    : fallback.map((r) => ({ title: r.title, href: r.href, label: "Open" }));

  return (
    <>
      {onShelf.length === 0 && (
        <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "60ch", margin: "0 0 8px" }}>
          The essays that were listed here are off the shelf for now. Start with these instead.
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((it) => (
          <Link key={it.href} href={it.href} style={{ textDecoration: "none" }}>
            <div style={row}>
              <span style={title}>{it.title}</span>
              <span style={action}>{it.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ShelfReadingList;
