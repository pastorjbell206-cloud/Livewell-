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
 * the API answers; the listing only adds reading times and the Latest group,
 * and the page asks it for just those rows (shelfListingInput), not every
 * published post.
 *
 * URL parameters: ?section=<slug> shows one section, ?track=<slug> shows the
 * sections that answer for a taxonomy track (old hub links land here), and
 * ?q= searches the public essays (the WebSite SearchAction target).
 *
 * The search box sits in the hero, above "Start with these", so it stays put
 * while the reader types and the row below it gives way to the results; a
 * search with no essay to show points on to the site-wide search. Every essay
 * row carries the reader's own marks from this device: Read (finished, from
 * lib/readProgress) and Saved (in My Library, lib/library).
 */
import { smartQuotes } from "@/lib/smartQuotes";
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, BookmarkCheck, Search, X } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import FollowRow from "@/components/FollowRow";
import { ogImageUrl } from "@/lib/site";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import PageHead from "@/components/art/PageHead";
import PlateFrame from "@/components/art/PlateFrame";
import Plate, { type PlateName } from "@/components/art/Plate";
import { trpc } from "@/lib/trpc";
import { useLibrary } from "@/lib/library";
import { getReadEssays } from "@/lib/readProgress";
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
  shelfListingInput,
  type ShelfSection,
} from "@/lib/shelf";
import "./home/home.css";

/** What the page needs from a listing row. Dev returns full rows, prod slim ones. */
interface ListingRow {
  slug: string;
  title: string;
  excerpt?: string | null;
  pillar?: string | null;
  createdAt?: unknown;
  publishedAt?: unknown;
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
  /** The essay's date (published, else created; a rewrite the database never dated, the rewrite's), in ms. */
  time: number | null;
}

/** Each section's drawn mark (components/art), one hand for the whole shelf. */
const SECTION_PLATE: Record<string, PlateName> = {
  "the-mirror": "lens",
  "faith-and-power": "lectern",
  "after-christendom": "arch",
  "american-church": "basilica",
  "ancient-church": "jars",
  "bible-in-its-world": "jar",
  doubt: "lantern",
  "ordinary-faithfulness": "table",
};

function toTime(date: unknown): number | null {
  const t = date instanceof Date ? date.getTime() : typeof date === "number" ? date : typeof date === "string" && date ? Date.parse(date) : Number.NaN;
  return Number.isFinite(t) ? t : null;
}

/** "October 27, 2026", read in UTC so a date stored at midnight keeps its day. */
function dateSaid(time: number): string {
  return new Date(time).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** What this device knows about the reader's essays: finished (slugs) and saved (paths). */
interface ReaderMarks {
  read: Set<string>;
  saved: Set<string>;
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

/** The listing rows this page can use: the public shelf by slug, and Latest. */
const SHELF_LISTING = shelfListingInput();

export default function Writing() {
  const [location] = useLocation();
  const postsQuery = trpc.posts.listPublished.useQuery(SHELF_LISTING);

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

  // The reader's marks: essays finished on this device, and pages saved to
  // My Library (kept current as the reader saves elsewhere).
  const library = useLibrary();
  const [readSlugs] = useState(() => getReadEssays());
  const marks = useMemo<ReaderMarks>(
    () => ({ read: readSlugs, saved: new Set(library.map((i) => i.href)) }),
    [readSlugs, library]
  );

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
        // Curled like the essay's own headline (lib/smartQuotes.ts).
        title: smartQuotes(rewrite?.title || row?.title || e.title),
        blurb: rewrite ? rewrite.excerpt : e.blurb ?? cleanExcerpt(row?.excerpt),
        minutes: minutesOf(row),
        section: e.section,
        time: toTime(row ? essayDate(row) : null) ?? toTime(rewrite?.updated),
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
          title: smartQuotes(r.title),
          blurb: cleanExcerpt(r.excerpt),
          minutes: minutesOf(r),
          section: null,
          time: toTime(essayDate(r)),
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

  // One essay to start with: the first of the shelf's three that is public now.
  // When none of the three is on the shelf right now, the first essay that is.
  const lead = START_WITH.map((slug) => shelfItems.find((it) => it.slug === slug)).find((it): it is ShelfItem => !!it) ?? shelfItems[0] ?? null;

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
        : "Longer essays, grouped by subject. Start with the one below, or go to the subject you came for.";
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
        title={filtering ? `${heading}: Essays` : "Essays by James Bell"}
        description={
          filtering
            ? intro
            : "A short shelf of essays by James Bell on the church after Christendom, the long history of the faith, and reading the Bible in its world."
        }
        url={canonical}
        image={ogImageUrl(filtering ? heading : "Essays by James Bell", "LiveWell")}
      />

      {/* THE PAGE TOP: the Essays door (or a section's own head), the search box under it. */}
      <PageHead
        size={filtering ? "inner" : "door"}
        door="Essays"
        doorHref={filtering ? "/writing" : undefined}
        title={heading}
        line={filtering ? intro : "Longer essays, grouped by subject. Start with the one below, or go to the subject you came for."}
        plate={sectionFilter ? SECTION_PLATE[sectionFilter.slug] ?? "quill" : "quill"}
      >
        {/* Where else James writes, on the unfiltered shelf (lib/channels.ts). */}
        {!filtering && <FollowRow label="Also on" connect={false} style={{ marginTop: "var(--s-1)" }} />}
        {/* Above the shelf, so it does not move while the reader types. */}
        <SearchBox value={search} onChange={setSearch} />
        {filtering && (
          <p className="wr-all">
            <Link href="/writing">All essays</Link>
          </p>
        )}
      </PageHead>

      {/* ONE TO START WITH: the unfiltered shelf only. */}
      {!filtering && !query && lead && (
        <section className="home-sec home-sec--warm wr-lead-sec" aria-labelledby="wr-lead-title">
          <div className="home-wrap">
            <Link href={`/writing/${lead.slug}`} className="wr-lead">
              <PlateFrame ratio="16 / 9">
                <Plate name="arch" decorative />
              </PlateFrame>
              <span className="wr-lead__text">
                <span className="lw-sec-head__label">Start with this one</span>
                <span id="wr-lead-title" className="wr-lead__title">
                  {lead.title}
                </span>
                {lead.blurb && <span className="wr-lead__blurb">{lead.blurb}</span>}
                <EssayMeta item={lead} marks={marks} />
                <span className="wr-lead__go">
                  Read it <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* THE SHELF */}
      <section className="home-sec wr-shelf">
        <div className="home-wrap">
          {query ? (
            <div aria-live="polite">
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
                {results.length === 0
                  ? `No essay on the shelf matches "${query}".`
                  : `${results.length} ${results.length === 1 ? "essay matches" : "essays match"} "${query}".`}
              </p>
              {results.length === 0 && (
                <p style={{ margin: "0 0 var(--s-3)" }}>
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: "44px",
                      fontFamily: "var(--U)",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      textDecoration: "underline",
                      textDecorationColor: "var(--mustard)",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    Search the whole site for "{query}"
                  </Link>
                </p>
              )}
              <EssayList items={results} marks={marks} />
            </div>
          ) : (
            <>
              {shownLatest.length > 0 && (
                <ShelfGroup id="latest" name="Latest" plate="quill" items={shownLatest} marks={marks} />
              )}
              {sectionsWithItems.map(({ section, items }) => (
                <ShelfGroup
                  key={section.slug}
                  id={section.slug}
                  name={section.name}
                  plate={SECTION_PLATE[section.slug] ?? "quill"}
                  items={items}
                  marks={marks}
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

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="writing-index"
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
        minHeight: "48px",
        padding: "0 2px 0 14px",
        maxWidth: "420px",
        margin: "var(--s-3) 0 0",
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
          minHeight: "44px",
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
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "44px", minHeight: "44px", background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)", padding: 0 }}
        >
          <X size={16} aria-hidden />
        </button>
      )}
    </div>
  );
}

/**
 * One part of the shelf: the section's drawn mark and its name, then its
 * essays, each with its date. On a phone the mark sits small beside the name.
 */
function ShelfGroup({
  id,
  name,
  plate,
  items,
  marks,
  href,
}: {
  id: string;
  name: string;
  plate: PlateName;
  items: ShelfItem[];
  marks: ReaderMarks;
  /** Link the heading to the section's own view (the unfiltered shelf only). */
  href?: string;
}) {
  const headingId = `shelf-${id}`;
  return (
    <section id={id} aria-labelledby={headingId} className="wr-group">
      <div className="wr-group__head">
        <PlateFrame className="wr-group__mark">
          <Plate name={plate} decorative />
        </PlateFrame>
        <h2 id={headingId} className="wr-group__name">
          {href ? <Link href={href}>{name}</Link> : name}
        </h2>
      </div>
      <EssayList items={items} marks={marks} />
    </section>
  );
}

/** Date, minutes, and this device's marks (Read, Saved), on one quiet line that holds its place. */
function EssayMeta({ item, marks }: { item: ShelfItem; marks: ReaderMarks }) {
  const read = marks.read.has(item.slug);
  const saved = marks.saved.has(`/writing/${item.slug}`);
  return (
    <span className="wr-meta">
      {item.time !== null && <time dateTime={new Date(item.time).toISOString().slice(0, 10)}>{dateSaid(item.time)}</time>}
      {item.minutes ? <span>{item.minutes} min read</span> : null}
      {/* The same mark the start row shows (index.css .ed-read). */}
      {read && <span className="ed-read">✓ Read</span>}
      {saved && (
        <span className="wr-meta__saved">
          <BookmarkCheck size={14} aria-hidden /> Saved
        </span>
      )}
    </span>
  );
}

function EssayList({ items, marks }: { items: ShelfItem[]; marks: ReaderMarks }) {
  if (items.length === 0) return null;
  return (
    <ul className="wr-list">
      {items.map((it) => (
        <li key={it.slug}>
          <Link href={`/writing/${it.slug}`} className="wr-item">
            <span className="wr-item__title">{it.title}</span>
            <EssayMeta item={it} marks={marks} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
