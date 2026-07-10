/**
 * /explore — the whole library in one place.
 *
 * The site's content had drifted into a dozen separate index pages (essays,
 * tools, study guides, books, creeds, church history, the how-to library, the
 * life domains…), each a good page in isolation and collectively impossible to
 * see. This is the single front door: every content type in one searchable,
 * filterable catalog. Type a word, or pick a Type, and browse across all of it.
 *
 * Data sources, all merged client-side:
 *   • the static libraries + books   → @/lib/catalog (fetchStaticCatalog)
 *   • the interactive tools          → the TOOLS registry (ToolsHub)
 *   • the essays                     → posts.listPublished (live)
 * Every source fails soft: a missing manifest or an unavailable DB narrows the
 * catalog, it never breaks the page.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search as SearchIcon } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { trpc } from "@/lib/trpc";
import { fetchStaticCatalog, pickString, type CatalogItem } from "@/lib/catalog";
import { TOOLS } from "@/pages/ToolsHub";

/** Preferred display order for the Type facet; unlisted types fall to the end. */
const TYPE_ORDER = [
  "Essay",
  "Tool",
  "Book",
  "Study Guide",
  "Bible in Context",
  "Church History",
  "Creed",
  "How-To",
  "Leadership",
  "Everyday Life",
  "Table Study",
];

function typeRank(type: string): number {
  const i = TYPE_ORDER.indexOf(type);
  return i === -1 ? TYPE_ORDER.length : i;
}

const VISIBLE_CAP = 60;

const TOOL_ITEMS: CatalogItem[] = TOOLS.map((t) => ({
  title: t.title,
  // Drop the "Part of the … section." tail some descriptions carry.
  blurb: t.description.replace(/\s*Part of [^.]*\.\s*$/i, "").trim(),
  href: t.href,
  type: "Tool",
  source: "Tools",
}));

export default function Explore() {
  const [staticItems, setStaticItems] = useState<CatalogItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());

  // Static libraries + books, fetched once on mount.
  useEffect(() => {
    let cancelled = false;
    fetchStaticCatalog().then((items) => {
      if (!cancelled) setStaticItems(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Essays, live from the database (empty until it answers, or if unavailable).
  const postsQuery = trpc.posts.listPublished.useQuery();
  const essayItems: CatalogItem[] = useMemo(() => {
    const rows = (postsQuery.data as any[]) ?? [];
    return rows
      .filter((p) => p && typeof p.slug === "string" && typeof p.title === "string")
      .map((p) => ({
        title: p.title,
        blurb: pickString(p.excerpt, p.summary, p.subtitle, p.description),
        href: `/writing/${p.slug}`,
        type: "Essay",
        source: "Essays",
      }));
  }, [postsQuery.data]);

  const allItems = useMemo(
    () => [...essayItems, ...TOOL_ITEMS, ...staticItems],
    [essayItems, staticItems]
  );

  // Type facet: every type present, in preferred order, with live counts.
  const typeCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of allItems) m.set(it.type, (m.get(it.type) ?? 0) + 1);
    return m;
  }, [allItems]);

  const orderedTypes = useMemo(
    () => Array.from(typeCounts.keys()).sort((a, b) => typeRank(a) - typeRank(b)),
    [typeCounts]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = allItems.filter((it) => {
      if (activeTypes.size > 0 && !activeTypes.has(it.type)) return false;
      if (q.length === 0) return true;
      return `${it.title} ${it.blurb} ${it.source} ${it.type}`.toLowerCase().includes(q);
    });
    // Stable, browsable order: by type, then title.
    return filtered.sort(
      (a, b) => typeRank(a.type) - typeRank(b.type) || a.title.localeCompare(b.title)
    );
  }, [allItems, query, activeTypes]);

  const toggleType = (type: string) =>
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });

  const visible = matches.slice(0, VISIBLE_CAP);

  return (
    <Layout>
      <SEOMeta
        title="Explore the Whole Library | James Bell"
        description="Every essay, tool, study guide, book, creed, and course in one searchable place. Filter by type or search across all of it — the whole library, one front door."
        url={`${SITE_URL}/explore`}
      />
      <div style={{ background: "var(--bone)", minHeight: "70vh", padding: "var(--s-6, 56px) var(--s-4, 20px)" }}>
        <div style={{ maxWidth: "var(--w-content, 1100px)", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "14px" }}>
              The Whole Library
            </div>
            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(34px, 5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                marginBottom: "16px",
              }}
            >
              Everything, in one place.
            </h1>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "var(--ink-muted)",
                maxWidth: "60ch",
                margin: "0 auto",
              }}
            >
              {allItems.length > 0
                ? `${allItems.length} essays, tools, study guides, books, and more — searchable and filterable across every type. Start typing, or pick a kind below.`
                : "Loading the library…"}
            </p>
          </div>

          {/* Search */}
          <div style={{ maxWidth: "640px", margin: "0 auto 20px", position: "relative" }}>
            <SearchIcon
              size={18}
              aria-hidden
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }}
            />
            <label htmlFor="explore-search" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Search the whole library
            </label>
            <input
              id="explore-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search everything — marriage, Nicaea, burnout, doubt…"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 16px 14px 44px",
                fontFamily: "var(--B)",
                fontSize: "16px",
                color: "var(--ink)",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                outline: "none",
              }}
            />
          </div>

          {/* Type facet */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "32px" }}>
            <FacetChip label="All" count={allItems.length} active={activeTypes.size === 0} onClick={() => setActiveTypes(new Set())} />
            {orderedTypes.map((type) => (
              <FacetChip
                key={type}
                label={type}
                count={typeCounts.get(type) ?? 0}
                active={activeTypes.has(type)}
                onClick={() => toggleType(type)}
              />
            ))}
          </div>

          {/* Result count */}
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-muted)",
              marginBottom: "16px",
            }}
          >
            {matches.length === 0
              ? "Nothing matches — try a broader word or clear the filters."
              : matches.length <= VISIBLE_CAP
                ? `${matches.length} result${matches.length === 1 ? "" : "s"}`
                : `Showing ${VISIBLE_CAP} of ${matches.length} — narrow it with a search word or a type.`}
          </p>

          {/* Results */}
          <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))" }}>
            {visible.map((it) => (
              <Link
                key={`${it.type}:${it.href}`}
                href={it.href}
                style={{
                  display: "block",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px 18px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--mustard-text, var(--mustard))",
                    marginBottom: "6px",
                  }}
                >
                  {it.type}
                </div>
                <div
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "19px",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    lineHeight: 1.25,
                    marginBottom: it.blurb ? "6px" : 0,
                  }}
                >
                  {it.title}
                </div>
                {it.blurb && (
                  <div
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "14px",
                      lineHeight: 1.55,
                      color: "var(--ink-muted)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {it.blurb}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FacetChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        fontFamily: "var(--U)",
        fontSize: "13px",
        fontWeight: 500,
        padding: "7px 14px",
        borderRadius: "999px",
        cursor: "pointer",
        border: active ? "1px solid var(--ink)" : "1px solid var(--border)",
        background: active ? "var(--ink)" : "var(--card)",
        color: active ? "var(--bone)" : "var(--ink)",
      }}
    >
      {label}
      <span style={{ opacity: 0.6, marginLeft: "6px" }}>{count}</span>
    </button>
  );
}
