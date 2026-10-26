/**
 * Writing — the essay shelf.
 *
 * A short, curated shelf rather than an archive: the essays in
 * client/src/lib/shelf.json, grouped by section in shelf order, with three to
 * start with at the top and a "Latest" group for posts James adds through the
 * admin after the shelf's cutoff. Every other essay is retired and does not
 * appear here (see lib/shelf.ts).
 *
 * The shelf itself comes from the committed list, so the sections paint before
 * the API answers; the listing only adds reading times and the Latest group.
 *
 * URL parameters: ?section=<slug> shows one section, ?track=<slug> shows the
 * sections that answer for a taxonomy track (old hub links land here), and
 * ?q= searches the public essays (the WebSite SearchAction target).
 */
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, X } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { StartHereRow } from "@/components/StartHereRow";
import { trpc } from "@/lib/trpc";
import { pillarToTrack, resolveTrack } from "@/lib/taxonomy";
import {
  START_WITH,
  cleanExcerpt,
  essayDate,
  essayVisibility,
  liveSections,
  liveShelfEssays,
  overrideMeta,
  sectionBySlug,
  sectionHref,
  sectionsForTrack,
  type ShelfSection,
} from "@/lib/shelf";

/** What the page needs from a listing row. Dev returns full rows, prod slim ones. */
interface ListingRow {
  slug: string;
  title: string;
  excerpt?: string | null;
  pillar?: string | null;
  createdAt?: unknown;
  readingTimeMinutes?: number | null;
  readTime?: string | null;
}

/** One line on the shelf, whatever its source. */
interface ShelfItem {
  slug: string;
  title: string;
  blurb: string;
  minutes: number | null;
  section: string | null;
}

function minutesOf(row: ListingRow | undefined): number | null {
  if (!row) return null;
  if (typeof row.readingTimeMinutes === "number" && row.readingTimeMinutes > 0) return row.readingTimeMinutes;
  const m = /(\d+)/.exec(row.readTime ?? "");
  return m ? Number(m[1]) : null;
}

function parseSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

const SITE = "https://www.livewellbyjamesbell.co";

export default function Writing() {
  const [location] = useLocation();
  const postsQuery = trpc.posts.listPublished.useQuery();

  // URL-driven filters, re-read on route change during render (the "state
  // from previous renders" pattern) so a link between views updates at once.
  // The search box starts from ?q= and is the reader's to edit from there.
  const [params, setParams] = useState(() => parseSearchParams());
  const [search, setSearch] = useState(() => parseSearchParams().get("q") ?? "");
  const [prevLocation, setPrevLocation] = useState(location);
  if (prevLocation !== location) {
    const next = parseSearchParams();
    setPrevLocation(location);
    setParams(next);
    setSearch(next.get("q") ?? "");
  }
  const sectionParam = params.get("section");
  const trackParam = params.get("track");
  const query = search.trim();

  const rows = useMemo(() => (postsQuery.data ?? []) as unknown as ListingRow[], [postsQuery.data]);
  const loaded = postsQuery.isSuccess;
  const bySlug = useMemo(() => new Map(rows.map((r) => [r.slug, r])), [rows]);

  // Shelf essays, enriched with the listing when it has answered. A shelf
  // essay the listing does not carry is left out once the listing is in (it
  // would dead-end), unless its rewrite exists, which stands on its own.
  const shelfItems = useMemo<ShelfItem[]>(() => {
    const out: ShelfItem[] = [];
    for (const e of liveShelfEssays()) {
      const row = bySlug.get(e.slug);
      const rewrite = overrideMeta(e.slug);
      if (loaded && !row && !rewrite) continue;
      out.push({
        slug: e.slug,
        title: rewrite?.title || row?.title || e.title,
        blurb: rewrite ? rewrite.excerpt : e.blurb ?? cleanExcerpt(row?.excerpt),
        minutes: minutesOf(row),
        section: e.section,
      });
    }
    return out;
  }, [bySlug, loaded]);

  // Posts James added after the cutoff, newest first; the listing already
  // arrives newest first in both runtimes.
  const latestItems = useMemo<(ShelfItem & { track: string | null })[]>(
    () =>
      rows
        .filter((r) => essayVisibility(r.slug, essayDate(r)) === "latest")
        .map((r) => ({
          slug: r.slug,
          title: r.title,
          blurb: cleanExcerpt(r.excerpt),
          minutes: minutesOf(r),
          section: null,
          track: pillarToTrack(r.pillar),
        })),
    [rows]
  );

  // Which sections this view shows.
  const sectionFilter = sectionBySlug(sectionParam);
  const trackSections = sectionsForTrack(trackParam);
  const filtering = Boolean(sectionFilter || trackSections.length);
  const shownSections: ShelfSection[] = sectionFilter
    ? [sectionFilter]
    : trackSections.length
      ? trackSections
      : liveSections();
  const shownTracks = new Set(sectionFilter ? sectionFilter.tracks : trackParam ? [trackParam] : []);
  const shownLatest = filtering
    ? latestItems.filter((it) => it.track !== null && shownTracks.has(it.track))
    : latestItems;

  // Search runs over everything public, flat.
  const results = useMemo(() => {
    if (!query) return [];
    const term = query.toLowerCase();
    return [...latestItems, ...shelfItems].filter(
      (it) => it.title.toLowerCase().includes(term) || it.blurb.toLowerCase().includes(term)
    );
  }, [query, latestItems, shelfItems]);

  const startWith = START_WITH.map((slug) => shelfItems.find((it) => it.slug === slug)).filter(
    (it): it is ShelfItem => !!it
  );

  // A track that spans several sections (theology, american-church) is
  // introduced by its own taxonomy title and description.
  const track = trackParam ? resolveTrack(trackParam) : null;
  const heading = sectionFilter
    ? sectionFilter.name
    : trackSections.length === 1
      ? trackSections[0].name
      : trackSections.length
        ? track?.title ?? "Essays"
        : "Essays";
  const intro = sectionFilter
    ? sectionFilter.description
    : trackSections.length === 1
      ? trackSections[0].description
      : trackSections.length
        ? track?.description ?? "Essays on this subject."
        : "A short shelf, kept short on purpose. Start with the three below, or read by section.";
  const canonical = sectionFilter
    ? `${SITE}/writing?section=${sectionFilter.slug}`
    : trackSections.length
      ? `${SITE}/writing?track=${encodeURIComponent(trackParam ?? "")}`
      : `${SITE}/writing`;

  const sectionsWithItems = shownSections
    .map((s) => ({ section: s, items: shelfItems.filter((it) => it.section === s.slug) }))
    .filter((g) => g.items.length > 0);
  const nothingHere = !query && sectionsWithItems.length === 0 && shownLatest.length === 0;

  return (
    <Layout>
      <SEOMeta
        title={filtering ? `${heading}: Essays` : "Essays"}
        description={
          filtering
            ? intro
            : "A short shelf of essays by James Bell on the church after Christendom, the long history of the faith, and reading the Bible in its world."
        }
        url={canonical}
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-6) var(--s-4) var(--s-5)",
          color: "var(--charcoal-fg)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {/* The eyebrow names the shelf above a section's own title; on the
              whole shelf the heading already says it. */}
          {filtering && (
            <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
              Essays
            </div>
          )}
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              maxWidth: "22ch",
              color: "var(--charcoal-fg)",
            }}
          >
            {heading}
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--charcoal-fg)",
              opacity: 0.8,
              maxWidth: "62ch",
              margin: 0,
            }}
          >
            {intro}
          </p>
          {filtering && (
            <p style={{ margin: "20px 0 0", fontFamily: "var(--U)", fontSize: "14px" }}>
              <Link
                href="/writing"
                style={{
                  color: "var(--charcoal-fg)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--mustard)",
                  paddingBottom: "2px",
                }}
              >
                All essays
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* START WITH THESE: the unfiltered shelf only. */}
      {!filtering && !query && startWith.length > 0 && (
        <StartHereRow
          eyebrow="Start with these"
          items={startWith.map((it) => ({ title: it.title, blurb: it.blurb, href: `/writing/${it.slug}` }))}
        />
      )}

      {/* THE SHELF */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SearchBox value={search} onChange={setSearch} />

          {query ? (
            <div aria-live="polite">
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
                {results.length === 0
                  ? `No essay on the shelf matches "${query}".`
                  : `${results.length} ${results.length === 1 ? "essay matches" : "essays match"} "${query}".`}
              </p>
              <EssayList items={results} />
            </div>
          ) : (
            <>
              {shownLatest.length > 0 && (
                <ShelfGroup id="latest" name="Latest" description="New essays, as they are written." items={shownLatest} />
              )}
              {sectionsWithItems.map(({ section, items }) => (
                <ShelfGroup
                  key={section.slug}
                  id={section.slug}
                  name={section.name}
                  description={section.description}
                  items={items}
                  href={filtering ? undefined : sectionHref(section)}
                />
              ))}
              {nothingHere && (
                <div style={{ padding: "var(--s-5) 0", maxWidth: "62ch" }}>
                  <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 12px" }}>
                    Nothing on this part of the shelf yet.
                  </p>
                  <Link
                    href="/writing"
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--mustard)",
                      paddingBottom: "2px",
                    }}
                  >
                    See all essays
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

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

function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
        maxWidth: "420px",
        marginBottom: "var(--s-5)",
      }}
    >
      <Search size={14} aria-hidden style={{ color: "var(--ink-muted)", flex: "0 0 auto" }} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the essays"
        aria-label="Search the essays"
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--B)",
          fontSize: "16px",
          color: "var(--ink)",
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)", padding: 0 }}
        >
          <X size={14} aria-hidden />
        </button>
      )}
    </div>
  );
}

/**
 * One part of the shelf: the section's name and what it is about on the left,
 * its essays on the right, reading like a book's table of contents. The two
 * columns wrap into one on a phone.
 */
function ShelfGroup({
  id,
  name,
  description,
  items,
  href,
}: {
  id: string;
  name: string;
  description: string;
  items: ShelfItem[];
  /** Link the heading to the section's own view (the unfiltered shelf only). */
  href?: string;
}) {
  const headingId = `shelf-${id}`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--s-3) var(--s-5)",
        padding: "var(--s-5) 0",
        borderTop: "1px solid var(--border)",
        scrollMarginTop: "96px",
      }}
    >
      <div style={{ flex: "1 1 260px", maxWidth: "380px" }}>
        <h2
          id={headingId}
          style={{
            fontFamily: "var(--F)",
            fontSize: "clamp(26px, 3vw, 32px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: "0 0 12px",
          }}
        >
          {href ? (
            <Link href={href} style={{ color: "inherit", textDecoration: "none" }}>
              {name}
            </Link>
          ) : (
            name
          )}
        </h2>
        <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>
          {description}
        </p>
      </div>
      <div style={{ flex: "2 1 420px", minWidth: 0 }}>
        <EssayList items={items} />
      </div>
    </section>
  );
}

function EssayList({ items }: { items: ShelfItem[] }) {
  if (items.length === 0) return null;
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((it, i) => (
        <li key={it.slug} style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
          <Link
            href={`/writing/${it.slug}`}
            style={{ display: "block", padding: i === 0 ? "0 0 20px" : "20px 0", textDecoration: "none", color: "var(--ink)" }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--F)",
                fontSize: "23px",
                fontWeight: 500,
                lineHeight: 1.25,
                letterSpacing: "-0.005em",
              }}
            >
              {it.title}
            </span>
            {it.blurb && (
              <span
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontFamily: "var(--B)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "var(--ink-muted)",
                  maxWidth: "62ch",
                }}
              >
                {it.blurb}
              </span>
            )}
            {it.minutes ? (
              <span style={{ display: "block", marginTop: "8px", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
                {it.minutes} min read
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
