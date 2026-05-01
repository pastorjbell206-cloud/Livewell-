import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  const [location, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "articles" | "resources">("all");

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
          ) : isLoading ? (
            <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
              <p className="text-lg">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12" style={{ color: "var(--ink-muted)" }}>
              <p className="text-lg">No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords or browse our content</p>
            </div>
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
        </div>
      </div>
    </Layout>
  );
}
