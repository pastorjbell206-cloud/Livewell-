import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { LoadFailed } from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";

import { LibrarySource, LIBRARY_SOURCES, pickString } from "@/lib/catalog";
import { EssayArt } from "@/components/EssayArt";
import { fetchJson } from "@/lib/fetch-json";
import { SHELF } from "@/lib/shelf";
import { TOOLS } from "@/pages/ToolsHub";

// --- Static-first search over the essays, the tools and the books ---
// The essay index ships with the site (/essays/index.json, built at deploy),
// so 678 essays are searchable with no server at all. Scored, not filtered:
// a title hit outranks an excerpt hit, a whole-word hit outranks a fragment.

interface EssayHit {
  slug: string;
  title: string;
  excerpt?: string;
  metaDescription?: string;
  pillar?: string | null;
  readTime?: string | null;
}

const isEssayIndex = (x: unknown): x is EssayHit[] =>
  Array.isArray(x) && x.every(e => !!e && typeof e === "object" && typeof (e as EssayHit).slug === "string" && typeof (e as EssayHit).title === "string");

function scoreText(haystack: string, terms: string[], weight: number): number {
  const h = haystack.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!t) continue;
    if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(h)) s += 2 * weight;
    else if (h.includes(t)) s += weight;
  }
  return s;
}

function scoreEssay(e: EssayHit, terms: string[]): number {
  return scoreText(e.title, terms, 3) + scoreText(`${e.metaDescription ?? ""} ${e.excerpt ?? ""}`, terms, 1) + scoreText(e.pillar ?? "", terms, 1);
}

// --- Library manifest search (static JSON content libraries) ---
// The source registry lives in @/lib/catalog so search and the unified
// /explore browse page read one list and never drift apart.

interface LibraryEntry {
  slug: string;
  title: string;
  blurb: string;
  /** group (leadership/context) or pillar (life/formation) */
  facet: string;
  sourceLabel: string;
  href: string;
  indexHref: string;
}

const LIBRARY_RESULT_CAP = 12;

async function fetchLibrarySource(source: LibrarySource): Promise<LibraryEntry[]> {
  try {
    const res = await fetch(source.url);
    if (!res.ok) return [];
    const data = await res.json();
    const list = data?.[source.listKey];
    if (!Array.isArray(list)) return [];
    return list
      .filter((item: any) => item && typeof item.slug === "string" && typeof item.title === "string")
      .map((item: any) => ({
        slug: item.slug,
        title: item.title,
        // Each library names its summary/facet fields differently — take the
        // first present so every source searches on its real text.
        blurb: pickString(item.blurb, item.excerpt, item.summary, item.subtitle),
        facet: pickString(item.group, item.pillar, item.topic, item.era, item.audience),
        sourceLabel: source.label,
        href: source.buildHref(item.slug),
        indexHref: source.indexHref,
      }));
  } catch {
    // Graceful per-manifest failure: a missing or malformed manifest
    // should never break essay search.
    return [];
  }
}

export default function SearchPage() {
  const [, navigate] = useLocation();
  // The masthead search box lands here with ?q=; a search page that ignored
  // it opened empty, which is the one thing a search page must not do.
  const [query, setQuery] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") ?? "" : "",
  );
  const [searchType, setSearchType] = useState<"all" | "articles" | "resources">("all");

  // Library manifests: fetched once on mount, filtered client-side per query
  const [libraryEntries, setLibraryEntries] = useState<LibraryEntry[]>([]);
  const [libraryLoaded, setLibraryLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all(LIBRARY_SOURCES.map(fetchLibrarySource)).then((lists) => {
      if (cancelled) return;
      setLibraryEntries(lists.flat());
      setLibraryLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The essay index, fetched once the first query is typed.
  const [essayIndex, setEssayIndex] = useState<EssayHit[] | null>(null);
  useEffect(() => {
    if (essayIndex !== null || query.trim().length === 0) return;
    let stale = false;
    fetchJson("/essays/index.json", isEssayIndex)
      .then(list => { if (!stale) setEssayIndex(list); })
      .catch(() => { if (!stale) setEssayIndex([]); });
    return () => { stale = true; };
  }, [query, essayIndex]);

  const terms = useMemo(() => query.trim().toLowerCase().split(/\s+/).filter(t => t.length > 1), [query]);

  const essayMatches = useMemo(() => {
    if (!terms.length || !essayIndex) return [];
    return essayIndex
      .map(e => ({ e, s: scoreEssay(e, terms) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map(x => x.e);
  }, [essayIndex, terms]);

  const toolMatches = useMemo(
    () => (terms.length ? TOOLS.filter(t => scoreText(`${t.title} ${t.description}`, terms, 1) > 0).slice(0, 6) : []),
    [terms],
  );
  const bookMatches = useMemo(
    () => (terms.length ? SHELF.filter(b => scoreText(`${b.title} ${b.kicker} ${b.blurb}`, terms, 1) > 0) : []),
    [terms],
  );
  const staticCount = essayMatches.length + toolMatches.length + bookMatches.length;

  const libraryMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return [];
    return libraryEntries.filter((entry) =>
      `${entry.title} ${entry.blurb} ${entry.facet}`.toLowerCase().includes(q)
    );
  }, [libraryEntries, query]);

  const visibleLibraryMatches = libraryMatches.slice(0, LIBRARY_RESULT_CAP);
  const truncatedLibraries = useMemo(() => {
    if (libraryMatches.length <= LIBRARY_RESULT_CAP) return [];
    const visible = new Set(visibleLibraryMatches);
    const hidden = libraryMatches.filter((entry) => !visible.has(entry));
    const seen = new Map<string, LibraryEntry>();
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

  const results =
    searchType === "all"
      ? allResults.data?.results || []
      : searchType === "articles"
        ? articleResults.data?.results || []
        : resourceResults.data?.results || [];

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

  const getResultLink = (result: any) => {
    switch (result.type) {
      case "article":
        return `/writing/${result.slug}`;
      case "resource":
        return result.url || "/resources";
      case "book":
        return "/books";
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
      <div className="container py-16 max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8 font-ui text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity"
          style={{ color: "var(--gold)" }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Search header */}
        <div className="mb-12">
          <h1
            className="font-display font-bold mb-6"
            style={{
              color: "var(--ink)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.2,
            }}
          >
            Search LiveWell
          </h1>

          {/* Search input */}
          <div className="relative mb-8">
            <SearchIcon
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--ink-muted)" }}
            />
            <input
              type="text"
              aria-label="Search the site"
              placeholder="Search articles, resources, books…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-lg"
              style={{
                borderColor: "rgba(244,241,234,0.7)",
                backgroundColor: "var(--bone)",
                color: "var(--ink)",
              }}
            />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-3 flex-wrap">
            {(["all", "articles", "resources"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                aria-pressed={searchType === type}
                className="px-4 py-2 rounded-full font-ui text-sm font-medium uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: searchType === type ? "var(--gold)" : "var(--bone-muted)",
                  color: searchType === type ? "var(--bone)" : "var(--ink)",
                }}
              >
                {type === "all" ? "All" : type === "articles" ? "Articles" : "Resources"}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          {query === "" ? (
            <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
              <p className="text-lg">Type a word or a topic. The essays, the libraries, and the tools are all in here.</p>
            </div>
          ) : (
            <>
              {/* Essays, tools and books, from the files the site ships with:
                  no server needed, and the essay art on every hit. */}
              {essayMatches.length > 0 && (
                <div className="mb-12">
                  <p className="font-ui text-xs font-medium uppercase mb-6" style={{ color: "var(--gold)", letterSpacing: "0.18em" }}>
                    From the essays
                  </p>
                  <div style={{ display: "grid", gap: "14px" }}>
                    {essayMatches.map(e => (
                      <Link key={`essay-${e.slug}`} href={`/writing/${e.slug}`} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", textDecoration: "none", color: "inherit", backgroundImage: "none" }}>
                        <div style={{ flex: "0 0 112px" }}>
                          <EssayArt seed={e.slug} track={e.pillar ?? undefined} decorative style={{ borderRadius: "3px" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, lineHeight: 1.25, color: "var(--ink)", marginBottom: "6px" }}>{e.title}</h3>
                          <p className="line-clamp-2" style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{e.metaDescription || e.excerpt}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {(toolMatches.length > 0 || bookMatches.length > 0) && (
                <div className="mb-12" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-4)" }}>
                  {toolMatches.length > 0 && (
                    <div>
                      <p className="font-ui text-xs font-medium uppercase mb-4" style={{ color: "var(--gold)", letterSpacing: "0.18em" }}>Tools</p>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "8px" }}>
                        {toolMatches.map(t => (
                          <li key={t.href}><Link href={t.href} style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 500, color: "var(--ink)", textDecoration: "none", backgroundImage: "none" }}>{t.title}</Link></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {bookMatches.length > 0 && (
                    <div>
                      <p className="font-ui text-xs font-medium uppercase mb-4" style={{ color: "var(--gold)", letterSpacing: "0.18em" }}>Books</p>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "8px" }}>
                        {bookMatches.map(b => (
                          <li key={b.slug}><Link href={b.href} style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--ink)", textDecoration: "none", backgroundImage: "none" }}>{b.title}</Link></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Library results from the static JSON manifests */}
              {visibleLibraryMatches.length > 0 && (
                <div className="mb-12">
                  <p
                    className="font-ui text-xs font-medium uppercase mb-6"
                    style={{ color: "var(--gold)", letterSpacing: "0.18em" }}
                  >
                    From the libraries
                  </p>
                  <div className="space-y-4">
                    {visibleLibraryMatches.map((entry) => (
                      <Link
                        key={`library-${entry.sourceLabel}-${entry.slug}`}
                        href={entry.href}
                        className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                        style={{
                          borderColor: "rgba(244,241,234,0.7)",
                          backgroundColor: "var(--bone)",
                        }}
                      >
                        <p
                          className="text-xs font-ui mb-2 uppercase tracking-wider"
                          style={{ color: "var(--gold)" }}
                        >
                          {entry.sourceLabel}
                        </p>
                        <h3
                          className="font-display font-bold mb-2"
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
                            href={entry.indexHref}
                            className="font-ui font-medium hover:opacity-70 transition-opacity"
                            style={{ color: "var(--gold)" }}
                          >
                            See all in {entry.sourceLabel} →
                          </Link>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {isLoading ? (
                staticCount === 0 && (
                <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
                  <p className="text-lg">Searching…</p>
                </div>
                )
              ) : results.filter((r: any) => !(r.type === "article" && essayMatches.some(e => e.slug === r.slug))).length === 0 ? (
                visibleLibraryMatches.length === 0 && staticCount === 0 ? (
                  isError ? (
                    <LoadFailed
                      what="The search"
                      onRetry={() => void activeQuery.refetch()}
                      backHref="/writing"
                      backLabel="Browse the essays instead"
                    />
                  ) : (
                  <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
                    {libraryLoaded ? (
                      <>
                        <p className="text-lg">Nothing here for "{query}".</p>
                        <p className="text-sm mt-2">
                          Try another word — or start in the{" "}
                          <Link
                            href="/writing"
                            className="font-ui font-medium hover:opacity-70 transition-opacity"
                            style={{ color: "var(--gold)" }}
                          >
                            essays
                          </Link>{" "}
                          or the{" "}
                          <Link
                            href="/tools"
                            className="font-ui font-medium hover:opacity-70 transition-opacity"
                            style={{ color: "var(--gold)" }}
                          >
                            tools
                          </Link>
                          .
                        </p>
                      </>
                    ) : (
                      <p className="text-lg">Searching…</p>
                    )}
                  </div>
                  )
                ) : null
              ) : (
            <div>
              <p role="status" className="text-sm font-ui mb-6" style={{ color: "var(--ink-muted)" }}>
                {staticCount > 0 ? "More results" : `Found ${results.length} result${results.length !== 1 ? "s" : ""}`}
              </p>

              <div className="space-y-4">
                {results.filter((r: any) => !(r.type === "article" && essayMatches.some(e => e.slug === r.slug))).map((result: any) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={getResultLink(result)}
                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                    style={{
                      borderColor: "rgba(244,241,234,0.7)",
                      backgroundColor: "var(--bone)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{getResultIcon(result.type)}</div>
                      <div className="flex-1">
                        <h3
                          className="font-display font-bold mb-2"
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
                            style={{ color: "var(--gold)" }}
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
