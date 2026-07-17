import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Plus,
  Loader2,
  Eye,
  EyeOff,
  Star,
  Search,
  X,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/* Palette (light admin workspace)                                     */
/* ------------------------------------------------------------------ */
const C = {
  ink: "var(--charcoal)",
  charcoal: "var(--adm-slate)",
  bone: "var(--adm-bg)",
  cream: "var(--bone-warm)",
  white: "var(--card)",
  border: "var(--adm-line)",
  muted: "var(--adm-gray)",
  mustard: "var(--adm-gold)",
  green: "var(--adm-ok)",
  greenBg: "var(--adm-ok-soft)",
  amber: "var(--adm-warn-deep)",
  amberBg: "var(--adm-gold-tint)",
  red: "var(--adm-danger)",
};

/* The five content pillars used as filter chips. */
const CATEGORIES = [
  "Theological Depth",
  "Prophetic Justice",
  "Prophetic Disruption",
  "Integrated Life",
  "Leadership Formation",
] as const;

type StatusFilter = "all" | "published" | "draft";
type SortKey = "title" | "pillar" | "readTime" | "date";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 25;

/* A stable color per category badge. */
const CATEGORY_COLORS: Record<string, { bg: string; fg: string }> = {
  "Theological Depth": { bg: "var(--adm-slate-bg)", fg: "var(--adm-slate)" },
  "Prophetic Justice": { bg: "var(--adm-gold-wash)", fg: "var(--adm-gold-deep)" },
  "Prophetic Disruption": { bg: "var(--adm-rust-bg)", fg: "var(--adm-rust)" },
  "Integrated Life": { bg: "var(--adm-ok-soft)", fg: "var(--adm-ok)" },
  "Leadership Formation": { bg: "var(--adm-violet-bg)", fg: "var(--adm-violet-deep)" },
};

function categoryColor(pillar: string | null | undefined) {
  if (pillar && CATEGORY_COLORS[pillar]) return CATEGORY_COLORS[pillar];
  return { bg: C.cream, fg: C.muted };
}

/** Parse a read-time string like "8 min read" into a comparable number. */
function readTimeValue(rt: string | null | undefined): number {
  if (!rt) return -1;
  const m = String(rt).match(/\d+/);
  return m ? parseInt(m[0], 10) : -1;
}

function postDate(p: any): number {
  const d = p.publishedAt || p.createdAt || p.updatedAt;
  const t = d ? new Date(d).getTime() : 0;
  return Number.isNaN(t) ? 0 : t;
}

/* ------------------------------------------------------------------ */
/* Small presentational pieces                                         */
/* ------------------------------------------------------------------ */
function CategoryBadge({ pillar }: { pillar: string | null | undefined }) {
  const { bg, fg } = categoryColor(pillar);
  return (
    <span
      className="font-ui text-xs font-medium px-2 py-0.5 rounded-sm whitespace-nowrap"
      style={{ backgroundColor: bg, color: fg }}
    >
      {pillar || "Uncategorized"}
    </span>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className="font-ui text-xs font-medium px-2 py-0.5 rounded-sm whitespace-nowrap"
      style={
        published
          ? { backgroundColor: C.greenBg, color: C.green }
          : { backgroundColor: C.amberBg, color: C.amber }
      }
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function SortHeader({
  label,
  k,
  sortKey,
  sortDir,
  onSort,
  className,
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const active = sortKey === k;
  return (
    <button
      type="button"
      onClick={() => onSort(k)}
      className={`flex items-center gap-1 font-ui text-xs uppercase tracking-wider ${className ?? ""}`}
      style={{
        color: active ? C.ink : C.muted,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontWeight: active ? 600 : 500,
        padding: 0,
        textAlign: "left",
      }}
    >
      {label}
      {active &&
        (sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />)}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */
export default function AdminPosts() {
  const postsQuery = trpc.posts.listAll.useQuery();
  const dupesQuery = trpc.posts.findDuplicates.useQuery(undefined, { staleTime: 0 });
  const deletePostMutation = trpc.posts.delete.useMutation();
  const updatePostMutation = trpc.posts.update.useMutation();
  const retireMutation = trpc.posts.retirePosts.useMutation();
  const utils = trpc.useUtils();

  // Search + filters
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusFilter>("all");

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Pagination
  const [page, setPage] = useState(1);

  // Selection
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  // Duplicate banner
  const [dupesDismissed, setDupesDismissed] = useState(false);
  const [dupesExpanded, setDupesExpanded] = useState(false);
  const [keepByGroup, setKeepByGroup] = useState<Record<number, number>>({});
  const [retireBusyGroup, setRetireBusyGroup] = useState<number | null>(null);

  // Debounce the search box (250ms).
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 250);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Reset page when the result set changes (guarded state adjustment during
  // render — see react.dev "You Might Not Need an Effect").
  const filterKey = `${search}|${category}|${status}|${sortKey}|${sortDir}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const allPosts = postsQuery.data ?? [];

  // Filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (allPosts as any[]).filter((p) => {
      if (q) {
        const hay = `${p.title ?? ""} ${p.pillar ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (category && p.pillar !== category) return false;
      if (status === "published" && !p.published) return false;
      if (status === "draft" && p.published) return false;
      return true;
    });
  }, [allPosts, search, category, status]);

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const dir = sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "title":
          cmp = String(a.title ?? "").localeCompare(String(b.title ?? ""));
          break;
        case "pillar":
          cmp = String(a.pillar ?? "").localeCompare(String(b.pillar ?? ""));
          break;
        case "readTime":
          cmp = readTimeValue(a.readTime) - readTimeValue(b.readTime);
          break;
        case "date":
          cmp = postDate(a) - postDate(b);
          break;
      }
      return cmp * dir;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(start, start + PAGE_SIZE);
  const showingFrom = total === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PAGE_SIZE, total);

  // Selection bound to the visible page.
  const pageIds = pageItems.map((p) => p.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const selectedCount = selected.size;

  const handleSort = (k: SortKey) => {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "date" ? "desc" : "asc");
    }
  };

  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  /* ---- single-row actions (kept from original) ---- */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePostMutation.mutateAsync({ id });
      toast.success("Post deleted");
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      postsQuery.refetch();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const handleTogglePublish = async (post: any) => {
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        published: !post.published,
      });
      toast.success(post.published ? "Post unpublished" : "Post published");
      postsQuery.refetch();
    } catch {
      toast.error("Failed to update post");
    }
  };

  const handleToggleFeatured = async (post: any) => {
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        featured: !post.featured,
      });
      toast.success(post.featured ? "Removed from featured" : "Set as featured");
      postsQuery.refetch();
    } catch {
      toast.error("Failed to update post");
    }
  };

  /* ---- bulk actions ---- */
  const bulkSetPublished = async (published: boolean) => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    setBulkBusy(true);
    try {
      await Promise.all(
        ids.map((id) => updatePostMutation.mutateAsync({ id, published })),
      );
      toast.success(
        `${ids.length} post${ids.length === 1 ? "" : "s"} ${published ? "published" : "unpublished"}`,
      );
      clearSelection();
      await postsQuery.refetch();
    } catch {
      toast.error("Failed to update some posts");
    } finally {
      setBulkBusy(false);
    }
  };

  const bulkDelete = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    if (
      !confirm(
        `Delete ${ids.length} post${ids.length === 1 ? "" : "s"}? This cannot be undone.`,
      )
    )
      return;
    setBulkBusy(true);
    try {
      await Promise.all(ids.map((id) => deletePostMutation.mutateAsync({ id })));
      toast.success(`${ids.length} post${ids.length === 1 ? "" : "s"} deleted`);
      clearSelection();
      await postsQuery.refetch();
    } catch {
      toast.error("Failed to delete some posts");
    } finally {
      setBulkBusy(false);
    }
  };

  /* ---- duplicate handling ---- */
  const dupeGroups = dupesQuery.data?.groups ?? [];
  const keepFor = (gi: number, fallback: number) => keepByGroup[gi] ?? fallback;

  const retireGroup = async (gi: number, g: any) => {
    const keep = keepFor(gi, g.keepId);
    const ids = g.copies
      .filter((c: any) => c.id !== keep)
      .map((c: any) => c.id) as number[];
    if (ids.length === 0) {
      toast("Nothing to retire in this set.");
      return;
    }
    if (
      !confirm(
        `Retire ${ids.length} duplicate cop${ids.length === 1 ? "y" : "ies"}? They are only unpublished — never deleted — and can be republished anytime.`,
      )
    )
      return;
    setRetireBusyGroup(gi);
    try {
      const r = await retireMutation.mutateAsync({ ids });
      if ((r as any).error) throw new Error((r as any).error);
      toast.success(
        `Retired ${r.updated} cop${r.updated === 1 ? "y" : "ies"} (unpublished, reversible).`,
      );
      await Promise.all([
        utils.posts.findDuplicates.invalidate(),
        postsQuery.refetch(),
      ]);
    } catch (e: any) {
      toast.error(e?.message || "Couldn't retire — safe to try again.");
    } finally {
      setRetireBusyGroup(null);
    }
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */
  const chipStyle = (active: boolean): React.CSSProperties => ({
    minHeight: 44,
    minWidth: 44,
    padding: "0 14px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 500,
    border: `1px solid ${active ? C.charcoal : C.border}`,
    backgroundColor: active ? C.charcoal : C.white,
    color: active ? C.bone : C.ink,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
  });

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1
              className="font-display text-4xl font-bold mb-2"
              style={{ color: C.ink }}
            >
              Writing Posts
            </h1>
            <p className="font-body" style={{ color: C.muted }}>
              Manage your blog posts and articles
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 px-4 py-2 rounded-sm font-ui font-medium no-underline"
            style={{ backgroundColor: C.ink, color: C.bone }}
          >
            <Plus size={16} /> New Post
          </Link>
        </div>

        {/* Duplicate banner */}
        {!dupesDismissed && dupeGroups.length > 0 && (
          <div
            className="rounded-sm mb-6"
            style={{ backgroundColor: "var(--adm-gold-tint)", border: `1px solid ${C.mustard}` }}
          >
            <div className="flex items-center gap-3 p-4">
              <AlertTriangle size={18} style={{ color: C.mustard, flexShrink: 0 }} />
              <div className="flex-1 font-body text-sm" style={{ color: "var(--ink-muted)" }}>
                <strong>
                  {dupeGroups.length} set{dupeGroups.length === 1 ? "" : "s"} of
                  duplicate titles found.
                </strong>{" "}
                Retiring a copy only <em>unpublishes</em> it — nothing is deleted,
                and it can be republished anytime.
              </div>
              <button
                type="button"
                onClick={() => setDupesExpanded((v) => !v)}
                aria-expanded={dupesExpanded}
                className="font-ui text-xs font-semibold px-3 py-2 rounded-sm"
                style={{
                  backgroundColor: C.cream,
                  color: C.ink,
                  border: `1px solid ${C.border}`,
                  cursor: "pointer",
                }}
              >
                {dupesExpanded ? "Hide" : "Review"}
              </button>
              <button
                type="button"
                onClick={() => setDupesDismissed(true)}
                aria-label="Dismiss duplicate notice"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: C.muted,
                  display: "flex",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {dupesExpanded && (
              <div className="px-4 pb-4 space-y-4">
                {dupeGroups.map((g: any, gi: number) => {
                  const keep = keepFor(gi, g.keepId);
                  return (
                    <div
                      key={gi}
                      className="rounded-sm p-4"
                      style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
                    >
                      <div
                        className="font-display text-base font-bold mb-1"
                        style={{ color: C.ink }}
                      >
                        {g.title}
                      </div>
                      <div
                        className="font-ui text-xs uppercase tracking-wider mb-3"
                        style={{ color: C.muted }}
                      >
                        {g.copies.length} copies · choose one to keep
                      </div>
                      <div className="space-y-2 mb-3">
                        {g.copies.map((c: any) => {
                          const isKeep = c.id === keep;
                          return (
                            <label
                              key={c.id}
                              className="flex items-center gap-3 p-2 rounded-sm cursor-pointer"
                              style={{
                                border: `1px solid ${isKeep ? C.green : "var(--adm-line-soft)"}`,
                                backgroundColor: isKeep ? C.greenBg : C.bone,
                              }}
                            >
                              <input
                                type="radio"
                                name={`dupe-keep-${gi}`}
                                checked={isKeep}
                                onChange={() =>
                                  setKeepByGroup((m) => ({ ...m, [gi]: c.id }))
                                }
                              />
                              <div className="flex-1 min-w-0">
                                <div
                                  className="font-mono text-xs truncate"
                                  style={{ color: C.ink }}
                                >
                                  {c.slug}
                                </div>
                                <div
                                  className="font-ui text-xs"
                                  style={{ color: C.muted }}
                                >
                                  {c.pillar ?? "—"} ·{" "}
                                  {(c.bodyLen ?? 0).toLocaleString()} chars
                                  {c.featured ? " · featured" : ""}
                                  {!c.published ? " · already unpublished" : ""}
                                </div>
                              </div>
                              <span
                                className="font-ui text-xs font-semibold px-2 py-1 rounded-sm"
                                style={
                                  isKeep
                                    ? { backgroundColor: C.green, color: C.white }
                                    : { backgroundColor: C.cream, color: C.muted }
                                }
                              >
                                {isKeep ? "KEEP" : "will retire"}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={() => retireGroup(gi, g)}
                        disabled={retireBusyGroup === gi}
                        className="flex items-center gap-2 px-3 py-2 rounded-sm font-ui text-sm font-medium disabled:opacity-50"
                        style={{ backgroundColor: C.ink, color: C.bone, border: "none", cursor: "pointer" }}
                      >
                        {retireBusyGroup === gi ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Copy size={14} />
                        )}
                        Keep this one, retire the rest
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Search */}
        <div className="mb-4">
          <div
            className="flex items-center gap-2 px-3 rounded-sm"
            style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              maxWidth: 420,
              height: 44,
            }}
          >
            <Search size={16} style={{ color: C.muted, flexShrink: 0 }} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search title or category…"
              className="flex-1 font-ui text-sm"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                color: C.ink,
                height: "100%",
              }}
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button type="button" onClick={() => setCategory(null)} aria-pressed={category === null} className="font-ui text-sm" style={chipStyle(category === null)}>
            All categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory((c) => (c === cat ? null : cat))}
              aria-pressed={category === cat}
              className="font-ui text-sm"
              style={chipStyle(category === cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {(["all", "published", "draft"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className="font-ui text-sm capitalize"
              style={chipStyle(status === s)}
            >
              {s === "all" ? "All status" : s}
            </button>
          ))}
        </div>

        {/* Bulk action bar (sticky) */}
        {selectedCount > 0 && (
          <div
            className="flex items-center gap-3 px-4 py-3 mb-4 rounded-sm flex-wrap"
            style={{
              position: "sticky",
              top: 56,
              zIndex: 20,
              backgroundColor: C.charcoal,
              color: C.bone,
            }}
          >
            <span className="font-ui text-sm font-semibold">
              {selectedCount} selected
            </span>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <button
                type="button"
                onClick={() => bulkSetPublished(true)}
                disabled={bulkBusy}
                className="flex items-center gap-2 px-3 py-2 rounded-sm font-ui text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: C.green, color: C.white, border: "none", cursor: "pointer" }}
              >
                <Eye size={15} /> Publish
              </button>
              <button
                type="button"
                onClick={() => bulkSetPublished(false)}
                disabled={bulkBusy}
                className="flex items-center gap-2 px-3 py-2 rounded-sm font-ui text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: C.bone, color: C.ink, border: "none", cursor: "pointer" }}
              >
                <EyeOff size={15} /> Unpublish
              </button>
              <button
                type="button"
                onClick={bulkDelete}
                disabled={bulkBusy}
                className="flex items-center gap-2 px-3 py-2 rounded-sm font-ui text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: C.red, color: C.white, border: "none", cursor: "pointer" }}
              >
                {bulkBusy ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />} Delete
              </button>
              <button
                type="button"
                onClick={clearSelection}
                className="font-ui text-sm px-3 py-2"
                style={{ background: "none", border: "none", color: C.bone, cursor: "pointer", opacity: 0.85 }}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Column header row */}
        {!postsQuery.isLoading && !postsQuery.isError && total > 0 && (
          <div
            className="flex items-center gap-3 px-4 py-2 mb-2 rounded-sm"
            style={{ backgroundColor: C.cream }}
          >
            <input
              type="checkbox"
              checked={allPageSelected}
              onChange={toggleSelectAllOnPage}
              aria-label="Select all on page"
              style={{ width: 16, height: 16, flexShrink: 0 }}
            />
            <div className="flex-1 min-w-0">
              <SortHeader label="Title" k="title" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
            <div style={{ width: 180 }} className="hidden md:block">
              <SortHeader label="Category" k="pillar" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
            <div style={{ width: 96 }} className="hidden md:block">
              <SortHeader label="Status" k="date" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="invisible" />
              <span className="font-ui text-xs uppercase tracking-wider" style={{ color: C.muted, fontWeight: 500 }}>
                Status
              </span>
            </div>
            <div style={{ width: 100 }} className="hidden sm:block">
              <SortHeader label="Read" k="readTime" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
            <div style={{ width: 110 }} className="hidden lg:block">
              <SortHeader label="Date" k="date" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
            <div style={{ width: 120 }} />
          </div>
        )}

        {/* Body states */}
        {postsQuery.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-sm"
                style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
              >
                <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: C.cream }} />
                <div className="flex-1">
                  <div
                    className="animate-pulse"
                    style={{ height: 14, width: "45%", borderRadius: 4, backgroundColor: C.cream, marginBottom: 8 }}
                  />
                  <div
                    className="animate-pulse"
                    style={{ height: 10, width: "25%", borderRadius: 4, backgroundColor: C.cream }}
                  />
                </div>
                <div className="animate-pulse" style={{ height: 22, width: 110, borderRadius: 4, backgroundColor: C.cream }} />
              </div>
            ))}
          </div>
        ) : postsQuery.isError ? (
          <div
            className="text-center py-12 rounded-sm"
            style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
          >
            <AlertTriangle size={28} style={{ color: C.red, margin: "0 auto 12px" }} />
            <p className="font-body mb-4" style={{ color: C.ink }}>
              Couldn't load your posts. {postsQuery.error?.message ?? ""}
            </p>
            <button
              type="button"
              onClick={() => postsQuery.refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-ui font-medium"
              style={{ backgroundColor: C.ink, color: C.bone, border: "none", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        ) : total === 0 ? (
          <div
            className="text-center py-12 rounded-sm"
            style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
          >
            {allPosts.length === 0 ? (
              <>
                <p className="font-body mb-4" style={{ color: C.muted }}>
                  No posts yet. Create your first post to get started.
                </p>
                <Link
                  href="/admin/posts/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-ui font-medium no-underline"
                  style={{ backgroundColor: C.ink, color: C.bone }}
                >
                  <Plus size={16} /> Create Post
                </Link>
              </>
            ) : (
              <>
                <CheckCircle2 size={26} style={{ color: C.muted, margin: "0 auto 10px" }} />
                <p className="font-body mb-1" style={{ color: C.ink }}>
                  No posts match your search and filters.
                </p>
                <p className="font-body text-sm" style={{ color: C.muted }}>
                  Try clearing the search box or switching categories.
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {pageItems.map((post: any) => {
                const checked = selected.has(post.id);
                return (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 p-4 rounded-sm"
                    style={{
                      backgroundColor: C.white,
                      borderLeft: `4px solid ${post.published ? C.charcoal : C.border}`,
                      border: `1px solid ${C.border}`,
                      borderLeftWidth: 4,
                      borderLeftColor: post.published ? C.charcoal : C.border,
                      outline: checked ? `2px solid ${C.mustard}` : "none",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleRow(post.id)}
                      aria-label={`Select ${post.title}`}
                      style={{ width: 16, height: 16, flexShrink: 0 }}
                    />

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-display text-lg font-bold no-underline hover:underline flex items-center gap-2"
                        style={{ color: C.ink }}
                      >
                        <span className="truncate">{post.title}</span>
                        {post.featured && (
                          <Star size={15} style={{ color: C.mustard, flexShrink: 0 }} fill={C.mustard} />
                        )}
                      </Link>
                      {/* compact meta on small screens */}
                      <div className="flex md:hidden items-center gap-2 mt-1 flex-wrap">
                        <CategoryBadge pillar={post.pillar} />
                        <StatusBadge published={post.published} />
                        <span className="font-ui text-xs" style={{ color: C.muted }}>
                          {post.readTime || "—"}
                        </span>
                      </div>
                    </div>

                    <div style={{ width: 180 }} className="hidden md:block">
                      <CategoryBadge pillar={post.pillar} />
                    </div>
                    <div style={{ width: 96 }} className="hidden md:block">
                      <StatusBadge published={post.published} />
                    </div>
                    <div style={{ width: 100 }} className="hidden sm:block">
                      <span className="font-ui text-sm" style={{ color: C.muted }}>
                        {post.readTime || "—"}
                      </span>
                    </div>
                    <div style={{ width: 110 }} className="hidden lg:block">
                      <span className="font-ui text-xs" style={{ color: C.muted }}>
                        {postDate(post)
                          ? new Date(postDate(post)).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2" style={{ width: 120, justifyContent: "flex-end" }}>
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className="p-2 rounded-sm transition-colors"
                        style={{ backgroundColor: C.cream, color: C.muted, border: "none", cursor: "pointer" }}
                        title={post.published ? "Unpublish" : "Publish"}
                      >
                        {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(post)}
                        className="p-2 rounded-sm transition-colors"
                        style={{
                          backgroundColor: post.featured ? C.mustard : C.cream,
                          color: post.featured ? C.white : C.muted,
                          border: "none",
                          cursor: "pointer",
                        }}
                        title={post.featured ? "Remove featured" : "Set featured"}
                      >
                        <Star size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 rounded-sm transition-colors"
                        style={{ backgroundColor: C.cream, color: C.red, border: "none", cursor: "pointer" }}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
              <span className="font-ui text-sm" style={{ color: C.muted }}>
                Showing {showingFrom}–{showingTo} of {total}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-2 rounded-sm font-ui text-sm font-medium disabled:opacity-40"
                  style={{ backgroundColor: C.white, color: C.ink, border: `1px solid ${C.border}`, cursor: "pointer" }}
                >
                  Prev
                </button>
                <span className="font-ui text-sm" style={{ color: C.muted }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-2 rounded-sm font-ui text-sm font-medium disabled:opacity-40"
                  style={{ backgroundColor: C.white, color: C.ink, border: `1px solid ${C.border}`, cursor: "pointer" }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
