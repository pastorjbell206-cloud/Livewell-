import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

interface SearchResult {
  id: number;
  type: "article" | "resource" | "book";
  title: string;
  excerpt?: string;
  slug?: string;
  url?: string;
  category?: string;
  publishedAt?: Date;
}

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchQuery = trpc.search.global.useQuery(
    { query, limit: 10 },
    { enabled: query.length > 0 }
  );

  useEffect(() => {
    if (searchQuery.data) {
      setResults(searchQuery.data.results);
    }
  }, [searchQuery.data]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const getResultLink = (result: SearchResult) => {
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

  const getResultLabel = (result: SearchResult) => {
    switch (result.type) {
      case "article":
        return "Article";
      case "resource":
        return "Resource";
      case "book":
        return "Book";
      default:
        return "Result";
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--ink-muted)" }}
        />
        <input
          type="text"
          aria-label="Search articles and resources"
          placeholder="Search articles, resources..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={(e) => {
            setIsOpen(true);
            e.currentTarget.style.borderColor = "var(--mustard)";
            e.currentTarget.style.boxShadow = "0 0 0 2px rgba(184, 150, 62, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--line)";
            e.currentTarget.style.boxShadow = "none";
          }}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: "var(--line)",
            backgroundColor: "var(--bone)",
            color: "var(--ink)",
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded"
          >
            <X size={18} style={{ color: "var(--ink-muted)" }} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          style={{ borderColor: "var(--line)" }}
        >
          {searchQuery.isLoading && (
            <div className="p-4 text-center" style={{ color: "var(--ink-muted)" }}>
              Searching...
            </div>
          )}

          {searchQuery.isError && (
            <div className="p-4 text-center" style={{ color: "#DC2626" }}>
              Search failed. Please try again.
            </div>
          )}

          {results.length === 0 && !searchQuery.isLoading && (
            <div className="p-4 text-center" style={{ color: "var(--ink-muted)" }}>
              No results found for "{query}"
            </div>
          )}

          {results.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={getResultLink(result)}
              onClick={() => handleClear()}
              className="block px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div
                    className="font-medium text-sm"
                    style={{ color: "var(--ink)" }}
                  >
                    {result.title}
                  </div>
                  {result.excerpt && (
                    <div
                      className="text-xs mt-1 line-clamp-2"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {result.excerpt}
                    </div>
                  )}
                </div>
                <div
                  className="text-xs font-medium ml-2 px-2 py-1 rounded"
                  style={{
                    backgroundColor: "#F3E8D8",
                    color: "var(--mustard)",
                  }}
                >
                  {getResultLabel(result)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
