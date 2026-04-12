import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
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
        return "📚";
      case "book":
        return "📖";
      default:
        return "🔍";
    }
  };

  return (
    <Layout>
      <div className="container py-16 max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8 font-ui text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity"
          style={{ color: "#B8963E" }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Search header */}
        <div className="mb-12">
          <h1
            className="font-display font-bold mb-6"
            style={{
              color: "#1A1A1A",
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
              style={{ color: "#6B7280" }}
            />
            <input
              type="text"
              placeholder="Search articles, resources, books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-lg"
              style={{
                borderColor: "#D1C9BB",
                backgroundColor: "#F7F5F0",
                color: "#1A1A1A",
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
                  backgroundColor: searchType === type ? "#B8963E" : "#E5E7EB",
                  color: searchType === type ? "#F7F5F0" : "#1A1A1A",
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
            <div className="text-center py-12" style={{ color: "#6B7280" }}>
              <p className="text-lg">Enter a search term to get started</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12" style={{ color: "#6B7280" }}>
              <p className="text-lg">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12" style={{ color: "#6B7280" }}>
              <p className="text-lg">No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords or browse our content</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-ui mb-6" style={{ color: "#6B7280" }}>
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </p>

              <div className="space-y-4">
                {results.map((result: any) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={getResultLink(result)}
                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                    style={{
                      borderColor: "#D1C9BB",
                      backgroundColor: "#F7F5F0",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{getResultIcon(result.type)}</div>
                      <div className="flex-1">
                        <h3
                          className="font-display font-bold mb-2"
                          style={{ color: "#1A1A1A" }}
                        >
                          {result.title}
                        </h3>
                        {result.excerpt && (
                          <p
                            className="text-sm line-clamp-2"
                            style={{ color: "#6B7280" }}
                          >
                            {result.excerpt}
                          </p>
                        )}
                        {result.category && (
                          <p
                            className="text-xs font-ui mt-2 uppercase tracking-wider"
                            style={{ color: "#B8963E" }}
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
