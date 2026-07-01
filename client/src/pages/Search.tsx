import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";

// --- Library manifest search (static JSON content libraries) ---

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

interface LibrarySource {
  url: string;
  listKey: string;
  label: string;
  buildHref: (slug: string) => string;
  indexHref: string;
}

const LIBRARY_SOURCES: LibrarySource[] = [
  {
    url: "/leadership/articles-index.json",
    listKey: "articles",
    label: "Leadership Library",
    buildHref: (slug) => `/leadership/article/${slug}`,
    indexHref: "/leadership/library",
  },
  {
    url: "/context/guides-index.json",
    listKey: "guides",
    label: "Reading Scripture in Context",
    buildHref: (slug) => `/resources/context/${slug}`,
    indexHref: "/resources/context",
  },
  {
    url: "/life/domains-index.json",
    listKey: "domains",
    label: "Integrated Life",
    buildHref: (slug) => `/life/${slug}`,
    indexHref: "/life",
  },
  {
    url: "/leadership/formation-index.json",
    listKey: "topics",
    label: "Deep Formation",
    buildHref: (slug) => `/leadership/formation/${slug}`,
    indexHref: "/leadership/formation",
  },
];

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
        blurb: typeof item.blurb === "string" ? item.blurb : "",
        facet:
          typeof item.group === "string"
            ? item.group
            : typeof item.pillar === "string"
              ? item.pillar
              : "",
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
  const [query, setQuery] = useState("");
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

  const getResultLink = (result: any) => {
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
      <SEOMeta title="Search" description="Search 880+ essays on faith, theology, and the Christian life." />
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
            Search Livewell
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
              placeholder="Search articles, resources, books..."
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
              <p className="text-lg">Enter a search term to get started</p>
            </div>
          ) : (
            <>
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
                <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
                  <p className="text-lg">Searching...</p>
                </div>
              ) : results.length === 0 ? (
                visibleLibraryMatches.length === 0 ? (
                  <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
                    {libraryLoaded ? (
                      <>
                        <p className="text-lg">No results found for "{query}"</p>
                        <p className="text-sm mt-2">Try different keywords or browse our content</p>
                      </>
                    ) : (
                      <p className="text-lg">Searching...</p>
                    )}
                  </div>
                ) : null
              ) : (
            <div>
              <p className="text-sm font-ui mb-6" style={{ color: "var(--ink-muted)" }}>
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </p>

              <div className="space-y-4">
                {results.map((result: any) => (
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
