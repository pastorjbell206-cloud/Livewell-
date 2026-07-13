import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect, useMemo } from "react";
import { Trash2, Edit2, Plus, Eye, EyeOff, Search, BookOpen } from "lucide-react";
import { toast } from "sonner";

type BookTypeFilter = "all" | "authored" | "recommended";

export default function AdminBooks() {
  const booksQuery = trpc.books.listAll.useQuery();
  const deleteBookMutation = trpc.books.delete.useMutation();
  const updateBookMutation = trpc.books.update.useMutation();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<BookTypeFilter>("all");
  const [orderDrafts, setOrderDrafts] = useState<Record<number, string>>({});

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [search]);

  const all = booksQuery.data ?? [];

  const filtered = useMemo(() => {
    const rows = all.filter((b) => {
      if (typeFilter !== "all" && b.bookType !== typeFilter) return false;
      if (debouncedSearch) {
        const hay = `${b.title ?? ""} ${b.author ?? ""}`.toLowerCase();
        if (!hay.includes(debouncedSearch)) return false;
      }
      return true;
    });

    return [...rows].sort((a, b) => {
      const ao = a.sortOrder ?? 0;
      const bo = b.sortOrder ?? 0;
      if (ao !== bo) return ao - bo;
      return (a.title ?? "").toLowerCase().localeCompare((b.title ?? "").toLowerCase());
    });
  }, [all, typeFilter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this book?")) return;
    try {
      await deleteBookMutation.mutateAsync({ id });
      toast.success("Book deleted");
      booksQuery.refetch();
    } catch {
      toast.error("Failed to delete book");
    }
  };

  const handleTogglePublish = async (book: { id: number; published: boolean }) => {
    try {
      await updateBookMutation.mutateAsync({
        id: book.id,
        published: !book.published,
      });
      toast.success(book.published ? "Book unpublished" : "Book published");
      booksQuery.refetch();
    } catch {
      toast.error("Failed to update book");
    }
  };

  const saveSortOrder = async (book: { id: number; sortOrder: number | null }) => {
    const raw = orderDrafts[book.id];
    if (raw === undefined) return;
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) {
      setOrderDrafts((prev) => {
        const next = { ...prev };
        delete next[book.id];
        return next;
      });
      return;
    }
    if (parsed === (book.sortOrder ?? 0)) {
      setOrderDrafts((prev) => {
        const next = { ...prev };
        delete next[book.id];
        return next;
      });
      return;
    }
    try {
      await updateBookMutation.mutateAsync({ id: book.id, sortOrder: parsed });
      toast.success("Order updated");
      setOrderDrafts((prev) => {
        const next = { ...prev };
        delete next[book.id];
        return next;
      });
      booksQuery.refetch();
    } catch {
      toast.error("Failed to update order");
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>
              Books
            </h1>
            <p className="font-body" style={{ color: "var(--adm-gray)" }}>
              Manage your authored books and reading recommendations
            </p>
          </div>
          <Link
            href="/admin/books/new"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
            style={{ backgroundColor: "var(--adm-gold)", color: "var(--charcoal)" }}
          >
            <Plus size={16} /> New Book
          </Link>
        </div>

        {/* Toolkit */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search size={16} style={{ color: "var(--adm-gray-soft)" }} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or author…"
              className="w-full pl-9 pr-3 py-2 rounded font-ui text-sm"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line-soft)", color: "var(--charcoal)" }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-ui text-xs uppercase tracking-wider" style={{ color: "var(--adm-gray-soft)" }}>
              Type
            </span>
            <FilterChip active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
              All
            </FilterChip>
            <FilterChip active={typeFilter === "authored"} onClick={() => setTypeFilter("authored")}>
              Authored
            </FilterChip>
            <FilterChip active={typeFilter === "recommended"} onClick={() => setTypeFilter("recommended")}>
              Recommended
            </FilterChip>
          </div>
        </div>

        {booksQuery.isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg animate-pulse"
                style={{ backgroundColor: "var(--card)" }}
              >
                <div className="rounded" style={{ width: "48px", height: "64px", backgroundColor: "var(--bone-warm)" }} />
                <div className="flex-1">
                  <div className="h-4 w-1/3 rounded mb-2" style={{ backgroundColor: "var(--bone-warm)" }} />
                  <div className="h-3 w-1/4 rounded" style={{ backgroundColor: "var(--adm-fill-soft)" }} />
                </div>
              </div>
            ))}
          </div>
        ) : booksQuery.isError ? (
          <div className="text-center py-12" style={{ backgroundColor: "var(--card)", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "var(--adm-danger)" }}>
              Failed to load books.
            </p>
            <button
              onClick={() => booksQuery.refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium"
              style={{ backgroundColor: "var(--adm-gold)", color: "var(--charcoal)" }}
            >
              Retry
            </button>
          </div>
        ) : all.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "var(--card)", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "var(--adm-gray)" }}>
              No books yet. Add your first book.
            </p>
            <Link
              href="/admin/books/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
              style={{ backgroundColor: "var(--adm-gold)", color: "var(--charcoal)" }}
            >
              <Plus size={16} /> Add Book
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "var(--card)", borderRadius: "8px" }}>
            <p className="font-body" style={{ color: "var(--adm-gray)" }}>
              No books match your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-4 p-4 rounded-lg"
                style={{
                  backgroundColor: "var(--card)",
                  borderLeft: `4px solid ${book.published ? "var(--adm-gold)" : "var(--adm-line)"}`,
                }}
              >
                {/* Cover thumbnail */}
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="rounded object-cover flex-shrink-0"
                    style={{ width: "48px", height: "64px", border: "1px solid var(--adm-line-soft)" }}
                  />
                ) : (
                  <div
                    className="rounded flex items-center justify-center flex-shrink-0"
                    style={{ width: "48px", height: "64px", backgroundColor: "var(--bone-warm)", color: "var(--adm-taupe-mist)" }}
                  >
                    <BookOpen size={20} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold mb-1 truncate" style={{ color: "var(--charcoal)" }}>
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap font-ui text-sm" style={{ color: "var(--adm-gray)" }}>
                    <span>{book.author || "Unknown Author"}</span>
                    <Badge bg="var(--bone-warm)" color="var(--ink-muted)">
                      {book.bookType === "authored" ? "Authored" : "Recommended"}
                    </Badge>
                    {book.published ? (
                      <Badge bg="var(--adm-ok-badge-bg)" color="var(--adm-ok-badge)">
                        Published
                      </Badge>
                    ) : (
                      <Badge bg="var(--adm-warn-bg)" color="var(--adm-gold-deep)">
                        Draft
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Sort order */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <label className="font-ui text-xs uppercase tracking-wider mb-1" style={{ color: "var(--adm-gray-soft)" }}>
                    Order
                  </label>
                  <input
                    type="number"
                    value={orderDrafts[book.id] ?? String(book.sortOrder ?? 0)}
                    onChange={(e) =>
                      setOrderDrafts((prev) => ({ ...prev, [book.id]: e.target.value }))
                    }
                    onBlur={() => saveSortOrder(book)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                    }}
                    className="w-16 px-2 py-1 rounded font-ui text-sm text-center"
                    style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line-soft)", color: "var(--charcoal)" }}
                  />
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublish(book)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "var(--adm-gray-bg)", color: "var(--adm-gray)" }}
                    title={book.published ? "Unpublish" : "Publish"}
                  >
                    {book.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <Link
                    href={`/admin/books/${book.id}/edit`}
                    className="p-2 rounded transition-colors no-underline"
                    style={{ backgroundColor: "var(--adm-gray-bg)", color: "var(--adm-gray)" }}
                  >
                    <Edit2 size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(book.id)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "var(--adm-gray-bg)", color: "var(--adm-danger)" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-full font-ui text-sm font-medium transition-colors"
      style={{
        backgroundColor: active ? "var(--charcoal)" : "var(--card)",
        color: active ? "var(--adm-bg)" : "var(--ink-muted)",
        border: `1px solid ${active ? "var(--charcoal)" : "var(--adm-line-soft)"}`,
      }}
    >
      {children}
    </button>
  );
}

function Badge({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded font-ui text-xs font-medium"
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </span>
  );
}
