import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect, useMemo } from "react";
import { Trash2, Edit2, Plus, Loader2, Eye, EyeOff, Search, BookOpen } from "lucide-react";
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              Books
            </h1>
            <p className="font-body" style={{ color: "#6B7280" }}>
              Manage your authored books and reading recommendations
            </p>
          </div>
          <Link
            href="/admin/books/new"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
            style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
          >
            <Plus size={16} /> New Book
          </Link>
        </div>

        {/* Toolkit */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search size={16} style={{ color: "#9CA3AF" }} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or author…"
              className="w-full pl-9 pr-3 py-2 rounded font-ui text-sm"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2DDD2", color: "#1A1A1A" }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-ui text-xs uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
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
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="rounded" style={{ width: "48px", height: "64px", backgroundColor: "#ECE7DC" }} />
                <div className="flex-1">
                  <div className="h-4 w-1/3 rounded mb-2" style={{ backgroundColor: "#ECE7DC" }} />
                  <div className="h-3 w-1/4 rounded" style={{ backgroundColor: "#F0ECE3" }} />
                </div>
              </div>
            ))}
          </div>
        ) : booksQuery.isError ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "#DC2626" }}>
              Failed to load books.
            </p>
            <button
              onClick={() => booksQuery.refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium"
              style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
            >
              Retry
            </button>
          </div>
        ) : all.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "#6B7280" }}>
              No books yet. Add your first book.
            </p>
            <Link
              href="/admin/books/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
              style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
            >
              <Plus size={16} /> Add Book
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body" style={{ color: "#6B7280" }}>
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
                  backgroundColor: "#FFFFFF",
                  borderLeft: `4px solid ${book.published ? "#B8963E" : "#D1C9BB"}`,
                }}
              >
                {/* Cover thumbnail */}
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="rounded object-cover flex-shrink-0"
                    style={{ width: "48px", height: "64px", border: "1px solid #E2DDD2" }}
                  />
                ) : (
                  <div
                    className="rounded flex items-center justify-center flex-shrink-0"
                    style={{ width: "48px", height: "64px", backgroundColor: "#EDE8DC", color: "#A89F8C" }}
                  >
                    <BookOpen size={20} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold mb-1 truncate" style={{ color: "#1A1A1A" }}>
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap font-ui text-sm" style={{ color: "#6B7280" }}>
                    <span>{book.author || "Unknown Author"}</span>
                    <Badge bg="#EDE8DC" color="#5A5448">
                      {book.bookType === "authored" ? "Authored" : "Recommended"}
                    </Badge>
                    {book.published ? (
                      <Badge bg="#DCFCE7" color="#166534">
                        Published
                      </Badge>
                    ) : (
                      <Badge bg="#FEF3C7" color="#92700A">
                        Draft
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Sort order */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <label className="font-ui text-xs uppercase tracking-wider mb-1" style={{ color: "#9CA3AF" }}>
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
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2DDD2", color: "#1A1A1A" }}
                  />
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublish(book)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                    title={book.published ? "Unpublish" : "Publish"}
                  >
                    {book.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <Link
                    href={`/admin/books/${book.id}/edit`}
                    className="p-2 rounded transition-colors no-underline"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                  >
                    <Edit2 size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(book.id)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#DC2626" }}
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
        backgroundColor: active ? "#1A1A1A" : "#FFFFFF",
        color: active ? "#F7F5F0" : "#5A5448",
        border: `1px solid ${active ? "#1A1A1A" : "#E2DDD2"}`,
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
