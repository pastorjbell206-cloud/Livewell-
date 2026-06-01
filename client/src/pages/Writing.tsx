/**
 * Writing — the essay index.
 *
 * Was the single biggest perf issue on the site: fetched the entire posts
 * table including bodies on every visit. Now uses the slim
 * `posts.listForIndex` endpoint (no body field) and reads filters from
 * the URL so `/writing?track=after-christendom` actually filters.
 *
 * Palette honored throughout (no `#8B4545` etc.) — everything renders in
 * charcoal / cream / mustard / ink / stone via design tokens.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, SlidersHorizontal, X } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TrackChip } from "@/components/TrackChip";
import { trpc } from "@/lib/trpc";
import { PRIMARY_TRACKS, pillarToTrack, resolveTrack } from "@/lib/taxonomy";

const AUDIENCE_LABELS: Record<string, string> = {
  individuals: "Anyone",
  pastors: "Pastors",
  "church-leaders": "Church leaders",
  couples: "Couples",
  "small-groups": "Small groups",
};

const FORMAT_LABELS: Record<string, string> = {
  article: "Essay",
  "book-chapter": "Book chapter",
  "study-guide": "Study guide",
  "sermon-series": "Sermon",
  devotional: "Devotional",
  podcast: "Podcast",
};

function parseSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function Writing() {
  const [location] = useLocation();
  const postsQuery = trpc.posts.listPublished.useQuery();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // URL-driven filter state. Reads ?track=, ?audience=, ?format=, ?q=
  const [params, setParams] = useState(() => parseSearchParams());
  useEffect(() => {
    setParams(parseSearchParams());
  }, [location]);

  const activeTrack = params.get("track");
  const activeAudience = params.get("audience");
  const activeFormat = params.get("format");
  const urlSearch = params.get("q") ?? "";
  const effectiveSearch = search || urlSearch;

  const posts = postsQuery.data ?? [];

  const filtered = useMemo(() => {
    return posts.filter(p => {
      // Track
      if (activeTrack) {
        const track = pillarToTrack(p.pillar);
        if (track !== activeTrack) return false;
      }
      // Audience
      if (activeAudience && p.audience !== activeAudience) return false;
      // Format
      if (activeFormat && p.format !== activeFormat) return false;
      // Search (title + excerpt)
      if (effectiveSearch) {
        const term = effectiveSearch.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(term);
        const excerptMatch = (p.excerpt ?? "").toLowerCase().includes(term);
        if (!titleMatch && !excerptMatch) return false;
      }
      return true;
    });
  }, [posts, activeTrack, activeAudience, activeFormat, effectiveSearch]);

  const featured = useMemo(
    () => filtered.filter(p => p.featured).slice(0, 1)[0],
    [filtered]
  );
  const rest = useMemo(
    () => filtered.filter(p => !p.featured || p.id !== featured?.id),
    [filtered, featured]
  );

  const activeTrackInfo = activeTrack ? resolveTrack(activeTrack) : null;

  return (
    <Layout>
      <SEOMeta
        title={
          activeTrackInfo
            ? `${activeTrackInfo.title} — Writing`
            : "Writing — All essays"
        }
        description={
          activeTrackInfo?.description ??
          "Every essay by James Bell — on theology, politics, the American church after Christendom, pastoring, marriage, and parenting."
        }
        url={`https://www.livewellbyjamesbell.co${location}`}
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-6) var(--s-4) var(--s-5)",
          color: "var(--bone)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div
            className="eyebrow"
            style={{ marginBottom: "16px", color: "var(--mustard)" }}
          >
            Writing
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              marginBottom: "16px",
              maxWidth: "22ch",
            }}
          >
            {activeTrackInfo
              ? activeTrackInfo.title
              : "Every essay, in one place."}
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.75)",
              maxWidth: "62ch",
            }}
          >
            {activeTrackInfo
              ? activeTrackInfo.description
              : "Theology, politics, the American church after Christendom. Pastoring, marriage, parenting, prophetic justice, doubt. Sorted newest first."}
          </p>
          <div
            style={{
              marginTop: "20px",
              fontFamily: "var(--U)",
              fontSize: "13px",
              color: "rgba(245,240,230,0.55)",
            }}
          >
            {postsQuery.isLoading
              ? "Loading…"
              : `${filtered.length} of ${posts.length} essays shown`}
          </div>
        </div>
      </section>

      {/* TRACK CHIPS */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-4) var(--s-4) 0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--w-default)",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Link
            href="/writing"
            style={{
              fontFamily: "var(--U)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 14px",
              borderRadius: "999px",
              border: `1px solid ${!activeTrack ? "var(--mustard)" : "var(--border)"}`,
              background: !activeTrack ? "var(--bone-warm)" : "transparent",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            All
          </Link>
          {PRIMARY_TRACKS.map(t => (
            <Link
              key={t.slug}
              href={`/writing?track=${t.slug}`}
              style={{
                fontFamily: "var(--U)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "8px 14px",
                borderRadius: "999px",
                border: `1px solid ${activeTrack === t.slug ? "var(--mustard)" : "var(--border)"}`,
                background:
                  activeTrack === t.slug ? "var(--bone-warm)" : "transparent",
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              {t.kicker}
            </Link>
          ))}
        </div>
      </section>

      {/* SEARCH + FILTER TOGGLE */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-3) var(--s-4)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--w-default)",
            margin: "0 auto",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              flex: "1 1 280px",
            }}
          >
            <Search size={14} aria-hidden style={{ color: "var(--ink-muted)" }} />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search the writing…"
              aria-label="Search the essays"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--B)",
                fontSize: "14px",
                color: "var(--ink)",
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-muted)",
                  padding: 0,
                }}
              >
                <X size={14} aria-hidden />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(s => !s)}
            aria-expanded={showFilters}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 16px",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={14} aria-hidden />
            More filters
          </button>
        </div>

        {/* Sub-filters: audience + format */}
        {showFilters && (
          <div
            style={{
              maxWidth: "var(--w-default)",
              margin: "var(--s-3) auto 0",
              padding: "16px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <FilterColumn
                label="Audience"
                items={Object.entries(AUDIENCE_LABELS)}
                active={activeAudience}
                paramKey="audience"
                location={location}
              />
              <FilterColumn
                label="Format"
                items={Object.entries(FORMAT_LABELS)}
                active={activeFormat}
                paramKey="format"
                location={location}
              />
            </div>
          </div>
        )}
      </section>

      {/* FEATURED */}
      {featured && (
        <section
          style={{
            background: "var(--bone)",
            padding: "var(--s-5) var(--s-4) 0",
          }}
        >
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <Link
              href={`/writing/${featured.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderTop: "2px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "var(--s-5)",
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "16px",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ marginBottom: 0 }}>
                  <TrackChip pillarOrTrack={featured.pillar} asLink={false} />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                  }}
                >
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "19px",
                      fontStyle: "italic",
                      lineHeight: 1.55,
                      color: "var(--ink-muted)",
                      maxWidth: "62ch",
                    }}
                  >
                    {featured.excerpt}
                  </p>
                )}
                <div
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "12px",
                    color: "var(--ink-muted)",
                  }}
                >
                  {featured.readingTimeMinutes ?? 5} min read
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* INDEX */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-5) var(--s-4) var(--s-7)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {postsQuery.isLoading && (
            <p
              style={{
                fontFamily: "var(--U)",
                color: "var(--ink-muted)",
                textAlign: "center",
                padding: "var(--s-6) 0",
              }}
            >
              Loading the writing…
            </p>
          )}

          {!postsQuery.isLoading && rest.length === 0 && (
            <p
              style={{
                fontFamily: "var(--B)",
                color: "var(--ink-muted)",
                textAlign: "center",
                padding: "var(--s-6) 0",
              }}
            >
              No essays match. Try a different filter.
            </p>
          )}

          {rest.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {rest.map(post => (
                <Link
                  key={post.id}
                  href={`/writing/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "var(--s-4)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--mustard)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>
                      <TrackChip pillarOrTrack={post.pillar} asLink={false} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "22px",
                        fontWeight: 500,
                        letterSpacing: "-0.005em",
                        lineHeight: 1.25,
                        color: "var(--ink)",
                        marginBottom: "12px",
                      }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p
                        style={{
                          fontFamily: "var(--B)",
                          fontSize: "14px",
                          lineHeight: 1.6,
                          color: "var(--ink-muted)",
                          marginBottom: "16px",
                          flex: 1,
                        }}
                      >
                        {post.excerpt.slice(0, 140)}
                        {post.excerpt.length > 140 ? "…" : ""}
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "var(--U)",
                        fontSize: "12px",
                        color: "var(--ink-muted)",
                      }}
                    >
                      <span>{post.readingTimeMinutes ?? 5} min read</span>
                      {post.format && post.format !== "article" && (
                        <span>{FORMAT_LABELS[post.format] ?? post.format}</span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function FilterColumn({
  label,
  items,
  active,
  paramKey,
  location,
}: {
  label: string;
  items: [string, string][];
  active: string | null;
  paramKey: string;
  location: string;
}) {
  const buildUrl = (val: string | null) => {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    if (val) params.set(paramKey, val);
    else params.delete(paramKey);
    const qs = params.toString();
    const base = location.split("?")[0];
    return qs ? `${base}?${qs}` : base;
  };

  return (
    <div style={{ minWidth: "200px" }}>
      <div className="eyebrow" style={{ marginBottom: "8px" }}>
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        <Link
          href={buildUrl(null)}
          style={{
            fontFamily: "var(--U)",
            fontSize: "11px",
            fontWeight: 600,
            padding: "5px 10px",
            borderRadius: "999px",
            border: `1px solid ${active === null ? "var(--mustard)" : "var(--border)"}`,
            background: active === null ? "var(--bone-warm)" : "transparent",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          All
        </Link>
        {items.map(([value, lbl]) => (
          <Link
            key={value}
            href={buildUrl(value)}
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: "999px",
              border: `1px solid ${active === value ? "var(--mustard)" : "var(--border)"}`,
              background: active === value ? "var(--bone-warm)" : "transparent",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            {lbl}
          </Link>
        ))}
      </div>
    </div>
  );
}
