import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { LoadFailed } from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { Link } from "wouter";
import { Search as SearchIcon } from "lucide-react";

import { LIBRARY_SOURCES, type LibrarySource } from "@/lib/catalog";
import { ESSAY_OVERRIDES } from "@/lib/essayOverrides.generated";
import { essayDate, isPublicEssay } from "@/lib/shelf";
import {
  crisisTopicsFor,
  essayEntries,
  indexEntries,
  libraryEntries,
  loadPassageParser,
  passageFor,
  type SearchEntry,
} from "@/lib/siteSearch";
import { CrisisBlock } from "@/components/CrisisBlock";
import { TOOLS, foldedInto } from "@/lib/toolsList";
import IconTile from "@/components/art/IconTile";
import { DOORS, EVERYTHING_ENTRY, HELP_ENTRY, START_LINK, type CatalogEntry } from "@/lib/siteCatalog";
import { ICONS } from "@/lib/siteIcons";
import { trailFor } from "@/lib/pagePlace";
import { findEntries, type Found } from "@/lib/searchMend";

/**
 * search-index.json files the site's hub pages and films under "Main Pages",
 * a word for the builder. Each such result is labelled instead with the door
 * or room it belongs to, by its catalogue name (lib/pagePlace trailFor): a film
 * under Bible Explorer, "Read the Study Bible" under Bible. A page
 * beside the doors (Find Help, Start here, My Library) has none and shows no
 * label; the label never changes how results rank (the walk's polish, 2026-11-23).
 */
const HUBS = "Main Pages";
export function resultLabel(entry: Pick<SearchEntry, "sourceLabel" | "href">): string {
  if (entry.sourceLabel !== HUBS) return entry.sourceLabel;
  const place = trailFor(entry.href);
  return place ? (place.room ?? place.door).name : "";
}

/** "See all" for the hubs goes to the whole site on one page, by its catalogue name. */
const seeAll = (entry: SearchEntry) =>
  entry.sourceLabel === HUBS ? { href: EVERYTHING_ENTRY.href, label: `${EVERYTHING_ENTRY.name} →` } : { href: entry.indexHref, label: `See all in ${entry.sourceLabel} →` };

// The verses that hold the words typed ("born again"). The Bible's words are
// a large download, so the code and the text both wait for a query.
const BibleMatchesPreview = lazy(() => import("@/pages/study-bible/BibleSearchResults"));

// --- Library manifest search (static JSON content libraries) ---
// The source registry lives in @/lib/catalog so search and the unified
// /explore browse page read one list and never drift apart. The wisdom
// topics, Honest Answers, the family devotions and catechism, and Christ and
// the Nation come from one small index (public/search-index.json), and the
// rewritten essays from essayOverrides.generated.ts.

const LIBRARY_RESULT_CAP = 16;

/** Where a search that found nothing can go on from: Find Help first, then the seven doors, the start road, and the whole site on one page. */
const NO_RESULT_PLACES: CatalogEntry[] = [HELP_ENTRY, ...DOORS.map((d) => ({ ...d.page, icon: d.icon })), START_LINK, EVERYTHING_ENTRY];

// The tools, from the /tools registry, so "worry journal" finds the Worry Journal.
// A folded tool is found under the tool that took it in (its old name is a keyword).
const TOOL_ENTRIES: SearchEntry[] = TOOLS.map((t) => ({
  title: t.name,
  blurb: t.job,
  // Its short name too (the id: "wisdom finder", "test the case"), which is what people call it.
  keywords: [t.id.replace(/-/g, " "), ...foldedInto(t.id).map((f) => f.name)].join(" "),
  facet: "Tool",
  sourceLabel: "Tools",
  href: t.href,
  indexHref: "/tools",
}));

// A rewrite is found by its own title and excerpt, here, not by the server.
const ESSAY_ENTRIES: SearchEntry[] = essayEntries(ESSAY_OVERRIDES, (slug) => isPublicEssay(slug));
// Only a rewrite found above replaces the server's row, so no essay is lost from search.
const REWRITTEN = new Set(ESSAY_OVERRIDES.filter((o) => isPublicEssay(o.slug)).map((o) => o.slug));

// Graceful per-manifest failure: a missing or malformed manifest should never break search.
async function fetchEntries(url: string, read: (data: unknown) => SearchEntry[]): Promise<SearchEntry[]> {
  try {
    const res = await fetch(url);
    return res.ok ? read(await res.json()) : [];
  } catch {
    return [];
  }
}

const fetchLibrarySource = (source: LibrarySource) => fetchEntries(source.url, (data) => libraryEntries(source, data));

export default function SearchPage() {
  // A deep link (/search?q=Genesis 1, from the Study Bible) opens on its query.
  const [query, setQuery] = useState(() =>
    typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") ?? ""
  );
  // Keep the address in step, so Back and a shared link return to the same search.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search";
    if (window.location.pathname + window.location.search !== url) window.history.replaceState(window.history.state, "", url);
  }, [query]);
  const [searchType, setSearchType] = useState<"all" | "articles" | "resources">("all");

  // Library manifests: fetched once on mount, filtered client-side per query
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [libraryLoaded, setLibraryLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([...LIBRARY_SOURCES.map(fetchLibrarySource), fetchEntries("/search-index.json", indexEntries)]).then((lists) => {
      if (cancelled) return;
      setEntries([...ESSAY_ENTRIES, ...lists.flat(), ...TOOL_ENTRIES]);
      setLibraryLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // "John 3:16" or "jn 3 16" opens the verse before anything else. The parser
  // is its own small chunk; this page asks for it at once, since it is the
  // whole point of the page and a deep link may already hold a reference.
  const [parser, setParser] = useState<Awaited<ReturnType<typeof loadPassageParser>> | null>(null);
  useEffect(() => {
    let live = true;
    loadPassageParser().then((p) => { if (live) setParser(p); }).catch(() => {});
    return () => { live = false; };
  }, []);
  const passage = useMemo(() => (parser && query.trim() ? passageFor(query, parser) : null), [parser, query]);

  // The Bible is searched once the typing has paused, so a half-typed word
  // does not start the download.
  const [settledQuery, setSettledQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setSettledQuery(query.trim()), 500);
    return () => clearTimeout(t);
  }, [query]);
  const bibleQuery = settledQuery.length >= 3 && settledQuery === query.trim() && parser && !passage ? settledQuery : "";

  // The words as typed; failing that, a misspelling mended; failing that, the
  // nearest pages (lib/searchMend.ts), so a search does not end on nothing
  // because of one letter.
  const found = useMemo<Found<SearchEntry>>(() => (query.trim().length === 0 ? { items: [] } : findEntries(entries, query)), [entries, query]);
  const libraryMatches = found.items;

  const visibleLibraryMatches = libraryMatches.slice(0, LIBRARY_RESULT_CAP);
  // A reader who types their trouble here ("I want to die") sees how to reach
  // a person before any page.
  const crisisTopics = useMemo(() => crisisTopicsFor(query), [query]);
  const truncatedLibraries = useMemo(() => {
    if (libraryMatches.length <= LIBRARY_RESULT_CAP) return [];
    const visible = new Set(visibleLibraryMatches);
    const hidden = libraryMatches.filter((entry) => !visible.has(entry));
    const seen = new Map<string, SearchEntry>();
    for (const entry of hidden) {
      if (!seen.has(entry.indexHref)) seen.set(entry.indexHref, entry);
    }
    return Array.from(seen.values());
  }, [libraryMatches, visibleLibraryMatches]);

  // Get search results based on type
  const allResults = trpc.search.global.useQuery(
    { query, limit: 50 },
    { enabled: query.length > 0 && searchType === "all" }
  );

  const articleResults = trpc.search.articles.useQuery(
    { query, limit: 50 },
    { enabled: query.length > 0 && searchType === "articles" }
  );

  const resourceResults = trpc.search.resources.useQuery(
    { query, limit: 50 },
    { enabled: query.length > 0 && searchType === "resources" }
  );

  const rawResults =
    searchType === "all"
      ? allResults.data?.results || []
      : searchType === "articles"
        ? articleResults.data?.results || []
        : resourceResults.data?.results || [];
  // Retired essays never surface in search (lib/shelf.ts). The post-cutoff
  // rule reads the same date everywhere: publishedAt, else createdAt. An
  // essay with a rewrite is already among the matches above, by the rewrite's
  // own title and excerpt, so the database's older row is dropped.
  const results = rawResults.filter(
    (r) => r.type !== "article" || (isPublicEssay(r.slug ?? "", essayDate(r)) && !REWRITTEN.has(r.slug ?? ""))
  );

  const isLoading =
    searchType === "all"
      ? allResults.isLoading
      : searchType === "articles"
        ? articleResults.isLoading
        : resourceResults.isLoading;

  // A search that never reached the server has not "found nothing" — it has
  // not run. Saying "nothing here" sends the reader off to rephrase a query
  // that was fine.
  const activeQuery =
    searchType === "all"
      ? allResults
      : searchType === "articles"
        ? articleResults
        : resourceResults;
  const isError = activeQuery.isError;

  const getResultLink = (result: (typeof results)[number]) => {
    switch (result.type) {
      case "article":
        return `/writing/${result.slug}`;
      case "resource":
        return result.url || "/resources";
      case "book":
        return "/store";
      default:
        return "/";
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "article":
        return "📄";
      case "resource":
        return "";
      case "book":
        return "";
      default:
        return "🔍";
    }
  };

  return (
    <Layout>
      <SEOMeta title="Search" description="Search the essays, libraries, tools, and books on LiveWell." />
      <InnerHead path="/search" title="Search LiveWell" plate="lens" />

      {/* FIRST: the search box. */}
      <section className="home-sec home-sec--dark lw-band-tight" aria-labelledby="search-box-title">
        <div className="home-wrap">
          <h2 id="search-box-title" className="sr-only">
            Search the site
          </h2>
          <div className="lw-find" style={{ maxWidth: "720px" }}>
            <div className="lw-find__field">
              <SearchIcon size={20} strokeWidth={1.75} aria-hidden="true" />
              <input
                type="text"
                aria-label="Search the site, or look up a passage"
                placeholder="Look up a passage or ask a question"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="lw-chips">
            {(["all", "articles", "resources"] as const).map((type) => (
              <button key={type} type="button" onClick={() => setSearchType(type)} aria-pressed={searchType === type} className="lw-chip">
                {type === "all" ? "All" : type === "articles" ? "Articles" : "Resources"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-4 py-16 max-w-4xl mx-auto">

        {/* Results */}
        <div>
          {query === "" ? (
            <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
              <p className="text-lg">Ask in your own words, or type a passage like John 3:16. Find Help, the essays, the answers, the plans, the guides, the family devotions, and the tools are all in here.</p>
              {/* /help searches in the browser; this page also asks the server about essays. */}
              <p className="text-lg" style={{ marginTop: "12px" }}>
                For what you're going through, <Link href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Find Help</Link> starts from your own words.
              </p>
            </div>
          ) : (
            <>
              {crisisTopics.length > 0 && (
                <div className="mb-12">
                  <CrisisBlock id="help-now" topics={crisisTopics} heading="If you need help now" />
                </div>
              )}
              {/* A reference opens the passage itself, ahead of any page about it. */}
              {passage && (
                <div className="mb-12">
                  <p
                    className="font-ui text-xs font-medium uppercase mb-6"
                    style={{ color: "var(--mustard-text)", letterSpacing: "0.18em" }}
                  >
                    In the Study Bible
                  </p>
                  <Link
                    href={passage.href}
                    className="block p-4 border hover:shadow-md transition-shadow"
                    style={{
                      borderColor: "var(--border)",
                      borderLeft: "2px solid var(--mustard)",
                      backgroundColor: "var(--bone)",
                    }}
                  >
                    <h3 className="font-display font-medium leading-tight mb-2" style={{ color: "var(--ink)" }}>
                      {passage.label}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                      {passage.book
                        ? `The introduction to ${passage.label} and every chapter, with notes.`
                        : "Read it in the Study Bible, with the notes on its chapter."}
                    </p>
                  </Link>
                </div>
              )}
              {/* The verses that hold these words, ahead of pages about them. A
                  reader who typed their own danger gets the help above, and no
                  list of verses that happen to share its words. */}
              {bibleQuery && crisisTopics.length === 0 && (
                <Suspense fallback={null}>
                  <BibleMatchesPreview query={bibleQuery} />
                </Suspense>
              )}
              {/* Library results from the static JSON manifests */}
              {visibleLibraryMatches.length > 0 && (
                <div className="mb-12">
                  {(found.mended || found.nearest) && (
                    <p role="status" className="text-base mb-6" style={{ color: "var(--ink)" }}>
                      {found.nearest
                        ? `No page holds every word of "${query.trim()}". These are the closest.`
                        : `Nothing for "${query.trim()}". Showing "${found.mended}".`}
                    </p>
                  )}
                  <p
                    className="font-ui text-xs font-medium uppercase mb-6"
                    style={{ color: "var(--mustard-text)", letterSpacing: "0.18em" }}
                  >
                    Across the site
                  </p>
                  <div className="space-y-4">
                    {visibleLibraryMatches.map((entry, i) => (
                      <Link
                        // Several entries share a page (the catechism's questions), so the place in the list keys them.
                        key={`library-${i}-${entry.href}`}
                        href={entry.href}
                        className="block p-4 border hover:shadow-md transition-shadow"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--bone)",
                        }}
                      >
                        {resultLabel(entry) && (
                          <p
                            className="text-xs font-ui mb-2 uppercase tracking-wider"
                            style={{ color: "var(--mustard-text)" }}
                          >
                            {resultLabel(entry)}
                          </p>
                        )}
                        <h3
                          className="font-display font-medium leading-tight mb-2"
                          style={{ color: "var(--ink)" }}
                        >
                          {entry.title}
                        </h3>
                        {entry.blurb && (
                          <p
                            className="text-sm line-clamp-2"
                            style={{ color: "var(--ink-muted)" }}
                          >
                            {entry.blurb}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                  {truncatedLibraries.length > 0 && (
                    <div className="mt-4 space-y-1">
                      {truncatedLibraries.map((entry) => (
                        <p key={`see-all-${entry.indexHref}`} className="text-sm">
                          <Link
                            href={seeAll(entry).href}
                            className="font-ui font-medium hover:opacity-70 transition-opacity"
                            style={{ color: "var(--mustard-text)" }}
                          >
                            {seeAll(entry).label}
                          </Link>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {isLoading ? (
                <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
                  <p className="text-lg">Searching…</p>
                </div>
              ) : results.length === 0 ? (
                visibleLibraryMatches.length === 0 && !passage ? (
                  isError ? (
                    <LoadFailed
                      what="The search"
                      onRetry={() => void activeQuery.refetch()}
                      backHref="/writing"
                      backLabel="Browse the essays instead"
                    />
                  ) : (
                  <div className="py-12">
                    {libraryLoaded ? (
                      <>
                        <p role="status" className="text-lg" style={{ color: "var(--ink)" }}>Nothing here for "{query}".</p>
                        <p className="text-base mt-2" style={{ color: "var(--ink-muted)" }}>
                          Try another word, or start from one of these.
                        </p>
                        <ul className="lw-tiles" style={{ marginTop: "var(--s-3)" }} aria-label="Places to start">
                          {NO_RESULT_PLACES.map((e) => (
                            <li key={e.id}>
                              <IconTile href={e.href} icon={ICONS[e.icon]} name={e.name} line={e.line} />
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-lg text-center" style={{ color: "var(--ink-muted)" }}>Searching…</p>
                    )}
                  </div>
                  )
                ) : null
              ) : (
            <div>
              <p role="status" className="text-sm font-ui mb-6" style={{ color: "var(--ink-muted)" }}>
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </p>

              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={getResultLink(result)}
                    className="block p-4 border hover:shadow-md transition-shadow"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--bone)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{getResultIcon(result.type)}</div>
                      <div className="flex-1">
                        <h3
                          className="font-display font-medium leading-tight mb-2"
                          style={{ color: "var(--ink)" }}
                        >
                          {result.title}
                        </h3>
                        {result.excerpt && (
                          <p
                            className="text-sm line-clamp-2"
                            style={{ color: "var(--ink-muted)" }}
                          >
                            {result.excerpt}
                          </p>
                        )}
                        {result.category && (
                          <p
                            className="text-xs font-ui mt-2 uppercase tracking-wider"
                            style={{ color: "var(--mustard-text)" }}
                          >
                            {result.category}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
