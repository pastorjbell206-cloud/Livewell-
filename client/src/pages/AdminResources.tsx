import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  Edit2,
  Plus,
  Loader2,
  Eye,
  EyeOff,
  Search,
  ArrowUp,
  ArrowDown,
  Download,
  AlertTriangle,
  CheckSquare,
  Square,
} from "lucide-react";
import { toast } from "sonner";

type StatusFilter = "all" | "published" | "draft";
type SortKey = "title" | "category" | "fileType" | "published";
type SortDir = "asc" | "desc";

export default function AdminResources() {
  const resourcesQuery = trpc.resources.listAll.useQuery();
  const deleteResourceMutation = trpc.resources.delete.useMutation();
  const updateResourceMutation = trpc.resources.update.useMutation();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [search]);

  const all = resourcesQuery.data ?? [];

  const draftCount = useMemo(() => all.filter((r) => !r.published).length, [all]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const r of all) if (r.category) set.add(r.category);
    return Array.from(set).sort();
  }, [all]);

  const filtered = useMemo(() => {
    let rows = all.filter((r) => {
      if (statusFilter === "published" && !r.published) return false;
      if (statusFilter === "draft" && r.published) return false;
      if (categoryFilter !== "all" && (r.category ?? "") !== categoryFilter) return false;
      if (debouncedSearch) {
        const hay = `${r.title ?? ""} ${r.description ?? ""}`.toLowerCase();
        if (!hay.includes(debouncedSearch)) return false;
      }
      return true;
    });

    rows = [...rows].sort((a, b) => {
      let av: string | number = "";
      let bv: string | number = "";
      if (sortKey === "published") {
        av = a.published ? 1 : 0;
        bv = b.published ? 1 : 0;
      } else {
        av = (a[sortKey] ?? "").toString().toLowerCase();
        bv = (b[sortKey] ?? "").toString().toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [all, statusFilter, categoryFilter, debouncedSearch, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this resource?")) return;
    try {
      await deleteResourceMutation.mutateAsync({ id });
      toast.success("Resource deleted");
      resourcesQuery.refetch();
    } catch (err) {
      toast.error("Failed to delete resource");
    }
  };

  const handleTogglePublish = async (resource: { id: number; published: boolean }) => {
    try {
      await updateResourceMutation.mutateAsync({
        id: resource.id,
        published: !resource.published,
      });
      toast.success(resource.published ? "Resource unpublished" : "Resource published");
      resourcesQuery.refetch();
    } catch (err) {
      toast.error("Failed to update resource");
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allVisibleSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((r) => r.id)));
    }
  };

  const runBulk = async (ids: number[], action: () => Promise<void>, doneMsg: string) => {
    if (ids.length === 0) return;
    setBulkBusy(true);
    try {
      await action();
      toast.success(doneMsg);
      setSelected(new Set());
      await resourcesQuery.refetch();
    } catch (err) {
      toast.error("Bulk action failed");
    } finally {
      setBulkBusy(false);
    }
  };

  const bulkSetPublished = (ids: number[], published: boolean) =>
    runBulk(
      ids,
      async () => {
        await Promise.all(ids.map((id) => updateResourceMutation.mutateAsync({ id, published })));
      },
      published ? "Resources published" : "Resources unpublished"
    );

  const bulkDelete = (ids: number[]) => {
    if (!confirm(`Delete ${ids.length} resource(s)? This cannot be undone.`)) return;
    runBulk(
      ids,
      async () => {
        await Promise.all(ids.map((id) => deleteResourceMutation.mutateAsync({ id })));
      },
      "Resources deleted"
    );
  };

  const publishAllDrafts = () => {
    const ids = all.filter((r) => !r.published).map((r) => r.id);
    if (ids.length === 0) return;
    if (!confirm(`Publish all ${ids.length} draft(s)? They will become visible to readers.`)) return;
    bulkSetPublished(ids, true);
  };

  const selectedIds = Array.from(selected);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              Resources
            </h1>
            <p className="font-body" style={{ color: "#6B7280" }}>
              Manage downloadable resources and study materials
            </p>
          </div>
          <Link
            href="/admin/resources/new"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
            style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
          >
            <Plus size={16} /> New Resource
          </Link>
        </div>

        {/* Draft visibility banner */}
        {draftCount > 0 && (
          <div
            className="flex items-center justify-between gap-4 p-4 rounded-lg mb-6"
            style={{ backgroundColor: "#FEF3C7", border: "1px solid #F0D58A" }}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} style={{ color: "#92700A" }} />
              <p className="font-ui font-medium" style={{ color: "#7A5C08" }}>
                {draftCount} draft{draftCount === 1 ? " is" : "s are"} not visible to readers
              </p>
            </div>
            <button
              onClick={publishAllDrafts}
              disabled={bulkBusy}
              className="flex items-center gap-2 px-4 py-2 rounded font-ui font-medium whitespace-nowrap"
              style={{ backgroundColor: "#B8963E", color: "#1A1A1A", opacity: bulkBusy ? 0.6 : 1 }}
            >
              {bulkBusy ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
              Publish all drafts
            </button>
          </div>
        )}

        {/* Toolkit */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search size={16} style={{ color: "#9CA3AF" }} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or description…"
              className="w-full pl-9 pr-3 py-2 rounded font-ui text-sm"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2DDD2", color: "#1A1A1A" }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-ui text-xs uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
              Category
            </span>
            <FilterChip active={categoryFilter === "all"} onClick={() => setCategoryFilter("all")}>
              All
            </FilterChip>
            {categories.map((c) => (
              <FilterChip key={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)}>
                {c}
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-ui text-xs uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
              Status
            </span>
            <FilterChip active={statusFilter === "all"} onClick={() => setStatusFilter("all")}>
              All
            </FilterChip>
            <FilterChip active={statusFilter === "published"} onClick={() => setStatusFilter("published")}>
              Published
            </FilterChip>
            <FilterChip active={statusFilter === "draft"} onClick={() => setStatusFilter("draft")}>
              Draft
            </FilterChip>
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedIds.length > 0 && (
          <div
            className="flex items-center gap-3 p-3 rounded-lg mb-4"
            style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
          >
            <span className="font-ui text-sm font-medium">{selectedIds.length} selected</span>
            <div className="flex-1" />
            <button
              onClick={() => bulkSetPublished(selectedIds, true)}
              disabled={bulkBusy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded font-ui text-sm font-medium"
              style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0", opacity: bulkBusy ? 0.6 : 1 }}
            >
              <Eye size={14} /> Publish
            </button>
            <button
              onClick={() => bulkSetPublished(selectedIds, false)}
              disabled={bulkBusy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded font-ui text-sm font-medium"
              style={{ backgroundColor: "#3A3A3A", color: "#F7F5F0", opacity: bulkBusy ? 0.6 : 1 }}
            >
              <EyeOff size={14} /> Unpublish
            </button>
            <button
              onClick={() => bulkDelete(selectedIds)}
              disabled={bulkBusy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded font-ui text-sm font-medium"
              style={{ backgroundColor: "#7F1D1D", color: "#F7F5F0", opacity: bulkBusy ? 0.6 : 1 }}
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}

        {/* Sortable header */}
        {!resourcesQuery.isLoading && !resourcesQuery.isError && filtered.length > 0 && (
          <div
            className="flex items-center gap-3 px-4 py-2 mb-2 font-ui text-xs uppercase tracking-wider"
            style={{ color: "#6B7280" }}
          >
            <button onClick={toggleSelectAll} className="flex items-center" title="Select all">
              {allVisibleSelected ? (
                <CheckSquare size={16} style={{ color: "#2D4A3E" }} />
              ) : (
                <Square size={16} style={{ color: "#9CA3AF" }} />
              )}
            </button>
            <SortHeader label="Title" k="title" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} className="flex-1" />
            <SortHeader label="Category" k="category" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} className="w-40" />
            <SortHeader label="Type" k="fileType" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} className="w-24" />
            <SortHeader label="Status" k="published" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} className="w-24" />
            <span className="w-32 text-right">Actions</span>
          </div>
        )}

        {resourcesQuery.isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg animate-pulse"
                style={{ backgroundColor: "#FFFFFF", height: "72px" }}
              >
                <div className="h-4 w-1/3 rounded mb-2" style={{ backgroundColor: "#ECE7DC" }} />
                <div className="h-3 w-1/4 rounded" style={{ backgroundColor: "#F0ECE3" }} />
              </div>
            ))}
          </div>
        ) : resourcesQuery.isError ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "#DC2626" }}>
              Failed to load resources.
            </p>
            <button
              onClick={() => resourcesQuery.refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium"
              style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
            >
              Retry
            </button>
          </div>
        ) : all.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "#6B7280" }}>
              No resources yet. Create your first resource.
            </p>
            <Link
              href="/admin/resources/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
              style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
            >
              <Plus size={16} /> Create Resource
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body" style={{ color: "#6B7280" }}>
              No resources match your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderLeft: `4px solid ${resource.published ? "#2D4A3E" : "#D1C9BB"}`,
                }}
              >
                <button onClick={() => toggleSelect(resource.id)} className="flex items-center" title="Select">
                  {selected.has(resource.id) ? (
                    <CheckSquare size={18} style={{ color: "#2D4A3E" }} />
                  ) : (
                    <Square size={18} style={{ color: "#9CA3AF" }} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold mb-1 truncate" style={{ color: "#1A1A1A" }}>
                    {resource.title}
                  </h3>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-ui text-xs"
                      style={{ color: "#2D4A3E" }}
                    >
                      <Download size={12} /> Download / open link
                    </a>
                  )}
                </div>

                <div className="w-40">
                  <Badge bg="#EDE8DC" color="#5A5448">
                    {resource.category || "Uncategorized"}
                  </Badge>
                </div>

                <div className="w-24">
                  <Badge bg="#E8EEF0" color="#2C3E50">
                    {resource.fileType || "—"}
                  </Badge>
                </div>

                <div className="w-24">
                  {resource.published ? (
                    <Badge bg="#DCFCE7" color="#166534">
                      Published
                    </Badge>
                  ) : (
                    <Badge bg="#FEF3C7" color="#92700A">
                      Draft
                    </Badge>
                  )}
                </div>

                <div className="w-32 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleTogglePublish(resource)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                    title={resource.published ? "Unpublish" : "Publish"}
                  >
                    {resource.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <Link
                    href={`/admin/resources/${resource.id}/edit`}
                    className="p-2 rounded transition-colors no-underline"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                  >
                    <Edit2 size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(resource.id)}
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
      className="inline-block px-2 py-0.5 rounded font-ui text-xs font-medium truncate max-w-full"
      style={{ backgroundColor: bg, color }}
      title={typeof children === "string" ? children : undefined}
    >
      {children}
    </span>
  );
}

function SortHeader({
  label,
  k,
  sortKey,
  sortDir,
  onClick,
  className,
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onClick: (k: SortKey) => void;
  className?: string;
}) {
  const active = sortKey === k;
  return (
    <button
      onClick={() => onClick(k)}
      className={`flex items-center gap-1 uppercase tracking-wider ${className ?? ""}`}
      style={{ color: active ? "#1A1A1A" : "#6B7280" }}
    >
      {label}
      {active && (sortDir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
    </button>
  );
}
