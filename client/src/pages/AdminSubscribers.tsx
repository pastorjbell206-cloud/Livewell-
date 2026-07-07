import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";
import { Trash2, Loader2, Download, Search, Mail } from "lucide-react";
import { toast } from "sonner";

export default function AdminSubscribers() {
  const subscribersQuery = trpc.subscribers.list.useQuery();
  const removeMutation = trpc.subscribers.remove.useMutation();
  const [search, setSearch] = useState("");

  const subscribers = subscribersQuery.data ?? [];
  const filtered = useMemo(
    () => subscribers.filter((s) => s.email.toLowerCase().includes(search.toLowerCase())),
    [subscribers, search]
  );

  // Prod stores signup attribution as source ("for-pastors:pastor"); the last
  // token is the reader's self-selected segment when it matches one. The dev
  // schema has no source column, so this stays optional everywhere.
  const SEGMENTS = ["skeptic", "christian", "pastor", "exploring"];
  const sourceOf = (s: unknown): string => String((s as { source?: string }).source || "");
  const segmentOf = (s: unknown): string | null => {
    const tail = sourceOf(s).split(":").pop() || "";
    return SEGMENTS.includes(tail) ? tail : null;
  };

  const handleRemove = async (email: string) => {
    if (!confirm(`Remove ${email} from the newsletter list?`)) return;
    try {
      await removeMutation.mutateAsync({ email });
      toast.success("Subscriber removed");
      subscribersQuery.refetch();
    } catch {
      toast.error("Failed to remove subscriber");
    }
  };

  const handleExport = () => {
    const header = "email,subscribedAt,source,segment\n";
    const rows = subscribers
      .map((s) => `${s.email},${new Date(s.subscribedAt).toISOString()},${sourceOf(s)},${segmentOf(s) || ""}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold" style={{ color: "#1A1A1A" }}>
              Subscribers
            </h1>
            <p className="font-ui text-sm mt-1" style={{ color: "#6B7280" }}>
              {subscribers.length} active newsletter subscriber{subscribers.length === 1 ? "" : "s"}
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-sm font-ui text-sm transition-colors"
            style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0", opacity: subscribers.length === 0 ? 0.5 : 1 }}
          >
            <Download size={15} /> Export CSV
          </button>
        </div>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6B7280" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email"
            className="w-full pl-9 pr-3 py-2 rounded-sm font-ui text-sm border outline-none"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E1D8", color: "#1A1A1A" }}
          />
        </div>

        {subscribersQuery.isLoading ? (
          <div className="flex items-center gap-2 py-12 justify-center font-ui text-sm" style={{ color: "#6B7280" }}>
            <Loader2 size={16} className="animate-spin" /> Loading subscribers
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center font-ui text-sm" style={{ color: "#6B7280" }}>
            {search ? "No subscribers match that search." : "No subscribers yet. The signup form on the site feeds this list."}
          </div>
        ) : (
          <div className="rounded-sm border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E1D8" }}>
            {filtered.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: i === 0 ? "none" : "1px solid #E5E1D8" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={15} style={{ color: "#B8963E", flexShrink: 0 }} />
                  <span className="font-ui text-sm truncate" style={{ color: "#1A1A1A" }}>{s.email}</span>
                  {segmentOf(s) && (
                    <span className="font-ui text-[11px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#F5F0E6", color: "#1A1A1A", border: "1px solid #E5E1D8" }}>
                      {segmentOf(s)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-ui text-xs" style={{ color: "#6B7280" }}>
                    {new Date(s.subscribedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <button
                    onClick={() => handleRemove(s.email)}
                    disabled={removeMutation.isPending}
                    title="Remove subscriber"
                    className="p-1.5 rounded-sm transition-colors hover:bg-red-50"
                    style={{ color: "#9B1C1C", background: "none", border: "none", cursor: "pointer" }}
                  >
                    <Trash2 size={15} />
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
