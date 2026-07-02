import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface SearchResult {
  id: number;
  type: "article" | "resource" | "book";
  title: string;
  excerpt?: string;
  slug?: string;
  url?: string;
  category?: string;
}

const STATIC_PAGES: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Writing", path: "/writing" },
  { label: "Books", path: "/books" },
  { label: "Tools", path: "/tools" },
  { label: "Reading Paths", path: "/reading-paths" },
  { label: "About", path: "/about" },
];

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  article: "Article",
  resource: "Resource",
  book: "Book",
};

function resultPath(r: SearchResult): string {
  switch (r.type) {
    case "article":
      return `/writing/${r.slug}`;
    case "resource":
      return r.url || "/resources";
    case "book":
      return "/books";
    default:
      return "/";
  }
}

export default function CommandPalette({ defaultOpen = false }: { defaultOpen?: boolean }) {
  // defaultOpen lets Layout's lazy-mount open the palette on the same ⌘K
  // that mounted it (this component's own listener attaches too late for
  // that first press).
  const [open, setOpen] = useState(defaultOpen);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  // Global ⌘K / Ctrl+K shortcut + Escape close.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Debounce the raw input into the query that hits the server (~200ms).
  useEffect(() => {
    const id = setTimeout(() => setQuery(input.trim()), 200);
    return () => clearTimeout(id);
  }, [input]);

  const searchQuery = trpc.search.global.useQuery(
    { query, limit: 10 },
    { enabled: query.length > 1 },
  );

  const results: SearchResult[] = searchQuery.data?.results ?? [];
  const articles = results.filter((r) => r.type === "article");
  const resources = results.filter((r) => r.type === "resource");
  const books = results.filter((r) => r.type === "book");

  const close = () => {
    setOpen(false);
    setInput("");
    setQuery("");
  };

  const go = (path: string) => {
    navigate(path);
    close();
  };

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "14vh 16px 16px",
        background: "rgba(20, 17, 12, 0.55)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          boxShadow: "var(--shadow-modal)",
          overflow: "hidden",
        }}
      >
        <Command
          label="Command palette"
          shouldFilter={false}
          style={{ width: "100%", fontFamily: "var(--U)" }}
        >
          <div
            style={{
              borderBottom: "1px solid var(--line)",
              padding: "0 16px",
            }}
          >
            <Command.Input
              autoFocus
              value={input}
              onValueChange={setInput}
              aria-label="Search essays, books, tools, and pages"
              placeholder="Search essays, books, tools, pages…"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--ink)",
                fontFamily: "var(--U)",
                fontSize: 16,
                lineHeight: 1.6,
                padding: "18px 0",
                caretColor: "var(--mustard)",
              }}
            />
          </div>

          <Command.List
            style={{
              maxHeight: 380,
              overflowY: "auto",
              padding: 8,
            }}
          >
            {query.length > 1 && !searchQuery.isLoading && results.length === 0 && (
              <Command.Empty
                style={{
                  padding: "24px 12px",
                  textAlign: "center",
                  color: "var(--ink-muted)",
                  fontSize: 14,
                }}
              >
                Nothing found for "{query}"
              </Command.Empty>
            )}

            {searchQuery.isLoading && query.length > 1 && (
              <div
                style={{
                  padding: "20px 12px",
                  textAlign: "center",
                  color: "var(--ink-muted)",
                  fontSize: 14,
                }}
              >
                Searching…
              </div>
            )}

            {articles.length > 0 && (
              <ResultGroup heading="Articles">
                {articles.map((r) => (
                  <ResultItem
                    key={`article-${r.id}`}
                    title={r.title}
                    label={TYPE_LABEL[r.type]}
                    onSelect={() => go(resultPath(r))}
                  />
                ))}
              </ResultGroup>
            )}

            {resources.length > 0 && (
              <ResultGroup heading="Resources">
                {resources.map((r) => (
                  <ResultItem
                    key={`resource-${r.id}`}
                    title={r.title}
                    label={TYPE_LABEL[r.type]}
                    onSelect={() => go(resultPath(r))}
                  />
                ))}
              </ResultGroup>
            )}

            {books.length > 0 && (
              <ResultGroup heading="Books">
                {books.map((r) => (
                  <ResultItem
                    key={`book-${r.id}`}
                    title={r.title}
                    label={TYPE_LABEL[r.type]}
                    onSelect={() => go(resultPath(r))}
                  />
                ))}
              </ResultGroup>
            )}

            <ResultGroup heading="Go to">
              {STATIC_PAGES.map((p) => (
                <ResultItem
                  key={`page-${p.path}`}
                  value={`page ${p.label} ${p.path}`}
                  title={p.label}
                  label="Page"
                  onSelect={() => go(p.path)}
                />
              ))}
            </ResultGroup>
          </Command.List>

          <div
            style={{
              borderTop: "1px solid var(--line)",
              padding: "10px 16px",
              display: "flex",
              justifyContent: "flex-end",
              fontFamily: "var(--U)",
              fontSize: 11,
              letterSpacing: "0.04em",
              color: "var(--ink-muted)",
            }}
          >
            <span>&#8984;K to open &middot; Esc to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}

function ResultGroup({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={heading}
      style={{
        padding: "6px 4px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--U)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          padding: "6px 10px 4px",
        }}
      >
        {heading}
      </div>
      {children}
    </Command.Group>
  );
}

function ResultItem({
  title,
  label,
  value,
  onSelect,
}: {
  title: string;
  label: string;
  value?: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={value ?? title}
      onSelect={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 6,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "var(--F)",
          fontSize: 17,
          color: "var(--ink)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: "var(--U)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
    </Command.Item>
  );
}
