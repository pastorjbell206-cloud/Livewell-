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
import { StatementBand } from "@/components/EditorialBlocks";
import { TrackChip } from "@/components/TrackChip";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { LoadFailed } from "@/components/LoadFailed";
import { trpc } from "@/lib/trpc";
import { pillarToTrack, resolveTrack, pillarForPost, PILLAR_BY_SLUG, subThemesForPost, SUBTHEMES, PILLARS_V2, MOVEMENTS } from "@/lib/taxonomy";
import {
  PILLAR_BY_SLUG as NEW_PILLAR_BY_SLUG,
  PILLAR_SUBPATHWAYS,
  SUBPATHWAY_LABEL_BY_SLUG,
  STUDY_GUIDES_LABEL,
} from "@/lib/subPathways";
import { SUBPATHWAY_BY_SLUG } from "@/lib/subpathwayMap.generated";
import { HIDDEN_SLUGS } from "@/lib/hiddenSlugs";
import { isFullEssay } from "@/lib/essayQuality";
import { StartHereRow } from "@/components/StartHereRow";

/** A post's sub-pathway: the DB value if set, else the static slug map. */
function resolveSub(p: any): string | null {
  return (p?.subPathway as string | null) || SUBPATHWAY_BY_SLUG[p?.slug]?.sub || null;
}
/** Whether a post is part of a series (DB flag or static map). */
function resolveSeries(p: any): boolean {
  return !!(p?.isSeries || SUBPATHWAY_BY_SLUG[p?.slug]?.series);
}

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
  // Windowed render: hundreds of cards at once is a scroll of soup and a real
  // render cost. Start at 24; the button below the grid grows the window, and
  // any filter change resets it.
  const [visibleCount, setVisibleCount] = useState(24);

  // URL-driven filter state. Reads ?track=, ?audience=, ?format=, ?q=.
  // Re-read on route change during render (the documented "state from
  // previous renders" pattern) so filters update in the same pass.
  const [params, setParams] = useState(() => parseSearchParams());
  const [prevLocation, setPrevLocation] = useState(location);
  if (prevLocation !== location) {
    setPrevLocation(location);
    setParams(parseSearchParams());
  }

  const activeTrack = params.get("track");
  const activePillar = params.get("pillar");
  const activeSubTheme = params.get("subTheme");
  const activeAudience = params.get("audience");
  const activeFormat = params.get("format");
  const urlSearch = params.get("q") ?? "";
  const effectiveSearch = search || urlSearch;

  // New two-level sub-pathway taxonomy (disjoint slugs from the legacy pillars).
  const activeSub = params.get("sub");
  const activeSeries = params.get("series") === "true";
  const newPillarName = activePillar ? NEW_PILLAR_BY_SLUG[activePillar] ?? null : null;
  const isNewPillar = !!newPillarName;
  const subLabel = activeSub ? SUBPATHWAY_LABEL_BY_SLUG[activeSub] ?? null : null;
  const newHeading = activeSeries ? STUDY_GUIDES_LABEL : subLabel ?? newPillarName;

  const posts = postsQuery.data ?? [];

  const filtered = useMemo(() => {
    return posts.filter(p => {
      // Hidden duplicate stubs never appear in the listing.
      if (HIDDEN_SLUGS.has(p.slug)) return false;
      // Catalog stubs (a title over a 40-word abstract, no essay behind it)
      // stay out of the index — see docs/audit-corpus/. Real short posts pass.
      if (!isFullEssay(p)) return false;
      // Track
      if (activeTrack) {
        const track = pillarToTrack(p.pillar);
        if (track !== activeTrack) return false;
      }
      // Pillar (legacy two-movement / six-pillar taxonomy)
      if (activePillar && !isNewPillar) {
        const pl = pillarForPost(p);
        if (!pl || pl.slug !== activePillar) return false;
      }
      // Pillar (new five-pillar / sub-pathway taxonomy): a post belongs to the
      // pillar when its sub-pathway is one of that pillar's sub-pathways.
      if (isNewPillar && newPillarName) {
        const postSub = resolveSub(p);
        const subs = PILLAR_SUBPATHWAYS[newPillarName] ?? [];
        if (!postSub || !subs.some(s => s.label === postSub)) return false;
      }
      // Specific sub-pathway
      if (activeSub) {
        if ((resolveSub(p) ?? "") !== subLabel) return false;
      }
      // Study Guides & Series
      if (activeSeries && !resolveSeries(p)) return false;
      // Sub-theme (primarily Pillar 6: marriage, fatherhood, parenting…)
      if (activeSubTheme && !subThemesForPost(p).includes(activeSubTheme)) return false;
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
  }, [posts, activeTrack, activePillar, activeSubTheme, activeAudience, activeFormat, effectiveSearch, isNewPillar, newPillarName, activeSub, subLabel, activeSeries]);


  useEffect(() => { setVisibleCount(24); }, [activeTrack, activePillar, activeSubTheme, activeAudience, activeFormat, effectiveSearch, activeSub, activeSeries]);

  const activePillarInfo = activePillar ? PILLAR_BY_SLUG.get(activePillar) ?? null : null;

  // Counts for hiding empty filter chips (so chips never lead to 0 results).
  const pillarCounts = useMemo(() => {
    const c: Record<number, number> = {};
    for (const p of posts) {
      const pl = pillarForPost(p);
      if (pl) c[pl.id] = (c[pl.id] ?? 0) + 1;
    }
    return c;
  }, [posts]);
  const subThemeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of posts) for (const st of subThemesForPost(p)) c[st] = (c[st] ?? 0) + 1;
    return c;
  }, [posts]);
  const visiblePillars = PILLARS_V2.filter(
    p => (pillarCounts[p.id] ?? 0) > 0 || activePillar === p.slug
  );
  const visibleSubThemes = SUBTHEMES.filter(
    st => (subThemeCounts[st] ?? 0) > 0 || activeSubTheme === st
  );

  const featured = useMemo(
    () => filtered.filter(p => p.featured).slice(0, 1)[0],
    [filtered]
  );
  const rest = useMemo(
    () => filtered.filter(p => !p.featured || p.id !== featured?.id),
    [filtered, featured]
  );

  const activeTrackInfo = activeTrack ? resolveTrack(activeTrack) : null;

  /**
   * Is the reader narrowing the list right now? The "N of M" count only means
   * something when they are. Unfiltered it read as "958 of 962 essays shown",
   * which looks like four went missing; in fact `posts` includes hidden
   * duplicate stubs and catalog stubs that are excluded on purpose. Show the
   * plain total when nothing is filtering, and the ratio when something is.
   */
  const allCount = useMemo(
    () => posts.filter(p => !HIDDEN_SLUGS.has(p.slug) && isFullEssay(p)).length,
    [posts]
  );

  const isFiltering = Boolean(
    activeTrack ||
      activePillar ||
      activeSub ||
      activeSeries ||
      activeSubTheme ||
      activeAudience ||
      activeFormat ||
      effectiveSearch
  );

  return (
    <Layout>
      <SEOMeta
        title={
          newHeading
            ? `${newHeading} — Writing`
            : activePillarInfo
              ? `${activePillarInfo.name} — Writing`
              : activeTrackInfo
                ? `${activeTrackInfo.title} — Writing`
                : "Writing — All essays"
        }
        description={
          activeSeries
            ? "Every multi-part study guide and series by James Bell, in one place."
            : newHeading
              ? `Essays filed under ${newHeading}.`
              : activePillarInfo
                ? `Essays filed under ${activePillarInfo.name}.`
                : activeTrackInfo?.description ??
                  "Every essay by James Bell — on theology, politics, the American church after Christendom, pastoring, marriage, and parenting."
        }
        url={`https://www.livewellbyjamesbell.co/writing${
          activePillar ? `?pillar=${activePillar}`
          : activeTrack ? `?track=${activeTrack}`
          : activeSeries ? `?series=true`
          : ""
        }`}
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
            {newHeading
              ? newHeading
              : activePillarInfo
                ? activePillarInfo.name
                : activeTrackInfo
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
            {activeSeries
              ? "Every multi-part study guide and series, gathered in one place. Sorted newest first."
              : newHeading
                ? `Essays filed under ${newHeading}. Sorted newest first.`
                : activePillarInfo
                  ? `Essays filed under ${activePillarInfo.name}. Sorted newest first.`
                  : activeTrackInfo
                    ? activeTrackInfo.description
                    : "Theology, politics, the American church after Christendom. Pastoring, marriage, parenting, prophetic justice, doubt. Sorted newest first."}
          </p>
          <div
            role="status"
            style={{
              marginTop: "20px",
              fontFamily: "var(--U)",
              fontSize: "13px",
              color: "rgba(245,240,230,0.55)",
            }}
          >
            {postsQuery.isLoading
              ? "Loading…"
              : isFiltering
                ? `${filtered.length} of ${allCount} essays shown`
                : `${filtered.length} essays`}
          </div>

          {/* Pillar 6 sub-theme chips */}
          {activePillar === "living-well-after-christendom" && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Link
                href="/writing?pillar=living-well-after-christendom"
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  border: `1px solid ${!activeSubTheme ? "var(--mustard)" : "rgba(245,240,230,0.25)"}`,
                  color: "var(--bone)",
                  textDecoration: "none",
                }}
              >
                All
              </Link>
              {visibleSubThemes.map(st => (
                <Link
                  key={st}
                  href={`/writing?pillar=living-well-after-christendom&subTheme=${st}`}
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: `1px solid ${activeSubTheme === st ? "var(--mustard)" : "rgba(245,240,230,0.25)"}`,
                    color: "var(--bone)",
                    textDecoration: "none",
                  }}
                >
                  {st.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          )}

          {rest.length > visibleCount && (
            <div style={{ textAlign: "center", marginTop: "var(--s-5)" }}>
              <button
                type="button"
                onClick={() => setVisibleCount(c => c + 48)}
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "13px 28px",
                  cursor: "pointer",
                }}
              >
                Show more — {rest.length - visibleCount} remaining
              </button>
            </div>
          )}
        </div>
      </section>

      {/* THE SPINE — only on the unfiltered index, where the wall is tallest.
          A reader who came with a filter or a search already knows their way. */}
      {!activeTrack && !activePillar && !activeSub && !activeSeries && !activeSubTheme && !effectiveSearch && (
        <StartHereRow
          eyebrow="First time here? Start with these"
          items={[
            {
              title: "The Atheist in the Pulpit",
              blurb: "The honest account of an unbeliever who became a pastor — and the reader the whole site is written toward.",
              href: "/writing/the-atheist-in-the-pulpit",
            },
            {
              title: "What the End of Christian America Actually Means",
              blurb: "The platform's thesis: what is dying is not the faith but Christendom, and the difference changes everything.",
              href: "/writing/christendom-is-ending",
            },
            {
              title: "When the Church Is the Thing That Hurt You",
              blurb: "For the reader with a face in their mind — what happened was real, and God is angrier about it than you are.",
              href: "/writing/when-the-church-is-what-hurt-you",
            },
          ]}
        />
      )}

      {/* PILLAR CHIPS — the two-movement / six-pillar taxonomy */}
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
              border: `1px solid ${!activePillar && !activeTrack ? "var(--mustard)" : "var(--border)"}`,
              background: !activePillar && !activeTrack ? "var(--bone-warm)" : "transparent",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            All
          </Link>
          {visiblePillars.map((p, i) => (
            <span key={p.slug} style={{ display: "contents" }}>
              {/* light divider between the two movements */}
              {i > 0 && visiblePillars[i - 1].movement !== p.movement && (
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--mustard-text)",
                    padding: "0 4px",
                  }}
                >
                  {MOVEMENTS[p.movement].title}
                </span>
              )}
              <Link
                href={`/writing?pillar=${p.slug}`}
                title={p.name}
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: `1px solid ${activePillar === p.slug ? "var(--mustard)" : "var(--border)"}`,
                  background: activePillar === p.slug ? "var(--bone-warm)" : "transparent",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {p.name.replace(/^The /, "")}
              </Link>
            </span>
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
                fontSize: "16px",
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
                  <TrackChip pillarOrTrack={featured.pillar} slug={featured.slug} asLink={false} />
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
            <div
              role="status"
              aria-label="Loading the writing"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                gap: "24px",
              }}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{
                    background: "var(--bone-warm)",
                    borderRadius: "var(--radius-sm)",
                    height: "200px",
                  }}
                />
              ))}
            </div>
          )}

          {/* A failed request is not an empty result. Telling a reader to
              change their filter when the server never answered sends them
              hunting for a mistake they did not make. */}
          {postsQuery.isError && (
            <LoadFailed
              what="The writing"
              onRetry={() => void postsQuery.refetch()}
              backHref="/"
              backLabel="Back to the home page"
            />
          )}

          {!postsQuery.isLoading && !postsQuery.isError && rest.length === 0 && (
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
                gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                gap: "24px",
              }}
            >
              {rest.slice(0, visibleCount).map(post => (
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
                      <TrackChip pillarOrTrack={post.pillar} slug={post.slug} asLink={false} />
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

      <StatementBand eyebrow="Keep reading" width="26ch">
        Every essay here was written to be finished, not skimmed.
      </StatementBand>

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="writing-index"
            title="One essay a week, for the ones who finish."
            description="The writing that starts at the root instead of the symptom, in your inbox. No conversion bait."
          />
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
