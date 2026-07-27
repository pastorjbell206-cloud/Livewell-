/**
 * SubjectShelf — everything James has made on one subject, in one place.
 *
 * The library is filed by system (essays here, study guides there, pathways
 * somewhere else). A reader does not think in systems. This gathers every item
 * matching a subject out of the shared catalog and groups it by what it IS:
 * something to read, a guided route, a study to work, a book, a tool.
 *
 * It is match-driven rather than curated, so new content joins its shelf the
 * moment it ships. It fails soft: if the catalog cannot load, the shelf simply
 * does not render, and the page's own curated content still stands.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { fetchStaticCatalog, type CatalogItem } from "@/lib/catalog";
import { matchesSubject, type Subject } from "@/lib/subjects";

/** Display order: read first, then go deeper, then the tools. */
const GROUP_ORDER = ["Read", "Follow a path", "Work a study", "Books", "Tools"] as const;
type Group = (typeof GROUP_ORDER)[number];

/** Map the catalog's type facet onto a reader-facing shelf. */
function groupFor(item: CatalogItem): Group | null {
  const t = (item.type || "").toLowerCase();
  const href = item.href || "";
  if (href.startsWith("/pathways/")) return "Follow a path";
  if (t.includes("study") || href.startsWith("/studyguides/")) return "Work a study";
  if (t.includes("book") || href.startsWith("/read/") || href.startsWith("/books/")) return "Books";
  if (t.includes("tool") || href.startsWith("/tools/")) return "Tools";
  if (t.includes("essay") || t.includes("article") || t.includes("guide") || t.includes("domain")) return "Read";
  return "Read";
}

const card = {
  display: "block",
  textDecoration: "none",
  color: "inherit",
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "14px 16px",
} as const;

export default function SubjectShelf({
  subject,
  limitPerGroup = 8,
}: {
  subject: Subject;
  limitPerGroup?: number;
}) {
  const [items, setItems] = useState<CatalogItem[] | null>(null);

  useEffect(() => {
    let stale = false;
    fetchStaticCatalog()
      .then((all) => {
        if (stale) return;
        setItems(all.filter((i) => matchesSubject(subject, i.title, i.blurb)));
      })
      .catch(() => { if (!stale) setItems([]); });
    return () => { stale = true; };
  }, [subject]);

  if (!items || items.length === 0) return null;

  const grouped = new Map<Group, CatalogItem[]>();
  for (const it of items) {
    const g = groupFor(it);
    if (!g) continue;
    const list = grouped.get(g) ?? [];
    if (!list.some((x) => x.href === it.href)) list.push(it);
    grouped.set(g, list);
  }
  const shown = GROUP_ORDER.filter((g) => (grouped.get(g)?.length ?? 0) > 0);
  if (!shown.length) return null;

  return (
    <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
      <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>
          Everything on this
        </div>
        <h2
          style={{
            fontFamily: "var(--F)",
            fontSize: "clamp(24px, 3.4vw, 34px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            lineHeight: 1.1,
            marginBottom: "6px",
          }}
        >
          {subject.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--B)",
            fontSize: "15px",
            lineHeight: 1.6,
            color: "var(--ink-muted)",
            maxWidth: "60ch",
            marginBottom: "var(--s-5)",
          }}
        >
          {subject.blurb} {items.length} pieces in all.
        </p>

        {shown.map((g) => {
          const list = grouped.get(g)!;
          const visible = list.slice(0, limitPerGroup);
          return (
            <div key={g} style={{ marginBottom: "var(--s-5)" }}>
              <h3
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  marginBottom: "12px",
                }}
              >
                {g}
                <span style={{ color: "var(--ink-muted)", fontWeight: 500 }}>{`  ${list.length}`}</span>
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                  gap: "12px",
                }}
              >
                {visible.map((it) => (
                  <Link key={it.href} href={it.href} style={card}>
                    <div
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "17px",
                        fontWeight: 500,
                        color: "var(--ink)",
                        lineHeight: 1.25,
                        marginBottom: it.blurb ? "6px" : 0,
                      }}
                    >
                      {it.title}
                    </div>
                    {it.blurb && (
                      <p
                        style={{
                          fontFamily: "var(--B)",
                          fontSize: "13.5px",
                          lineHeight: 1.55,
                          color: "var(--ink-muted)",
                          margin: 0,
                        }}
                      >
                        {it.blurb.length > 130 ? `${it.blurb.slice(0, 129).trimEnd()}…` : it.blurb}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
              {list.length > visible.length && (
                <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "10px" }}>
                  {`and ${list.length - visible.length} more — `}
                  <Link href="/explore" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>
                    search the whole library
                  </Link>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
