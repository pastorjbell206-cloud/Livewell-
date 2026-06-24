import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";
import { Loader2, Copy, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

/**
 * Find duplicate articles (posts that share a title) and retire the extras.
 * The report is read-only; retiring only *unpublishes* a post — it is never
 * deleted, so anything done here is reversible from the post editor.
 */
export default function AdminDeduplicate() {
  const dupes = trpc.posts.findDuplicates.useQuery(undefined, { staleTime: 0 });
  const retire = trpc.posts.retirePosts.useMutation();
  const utils = trpc.useUtils();

  // Which copy to KEEP per group (defaults to the suggested keepId).
  const [keepByGroup, setKeepByGroup] = useState<Record<number, number>>({});
  const [done, setDone] = useState<{ updated: number } | null>(null);
  const [busy, setBusy] = useState(false);

  const groups = dupes.data?.groups ?? [];

  const keepFor = (gi: number, fallback: number) => keepByGroup[gi] ?? fallback;

  // The published copies that aren't the chosen keep — these get unpublished.
  const retireIds = useMemo(() => {
    const ids: number[] = [];
    groups.forEach((g: any, gi: number) => {
      const keep = keepFor(gi, g.keepId);
      for (const c of g.copies) if (c.id !== keep && c.published) ids.push(c.id);
    });
    return ids;
  }, [groups, keepByGroup]);

  const totalExtraPublished = useMemo(() => {
    let n = 0;
    for (const g of groups as any[]) n += g.copies.filter((c: any) => c.published).length - 1;
    return Math.max(0, n);
  }, [groups]);

  const run = async () => {
    if (retireIds.length === 0) return;
    if (!window.confirm(`Unpublish ${retireIds.length} duplicate ${retireIds.length === 1 ? "copy" : "copies"}? They stay in your editor and can be republished anytime.`)) return;
    setBusy(true);
    setDone(null);
    try {
      const r = await retire.mutateAsync({ ids: retireIds });
      if ((r as any).error) throw new Error((r as any).error);
      setDone({ updated: r.updated });
      toast.success(`Retired ${r.updated} duplicate ${r.updated === 1 ? "copy" : "copies"}.`);
      await utils.posts.findDuplicates.invalidate();
      await utils.posts.listPublished.invalidate();
    } catch (e: any) {
      toast.error(e?.message || "Couldn't retire the duplicates — it's safe to try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "#1A1A1A" }}>
          Find duplicate articles
        </h1>
        <p className="font-body mb-6" style={{ color: "#5A5448", lineHeight: 1.7 }}>
          Articles that share the same title are grouped below. For each group, keep the best copy
          (the longest, published one is pre-selected) and retire the rest. Retiring only{" "}
          <strong>unpublishes</strong> a copy — nothing is deleted, and you can republish from the
          post editor anytime.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            type="button"
            onClick={run}
            disabled={busy || retireIds.length === 0}
            className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "#1A1A1A", color: "#F5F0E6" }}
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Copy size={16} />}
            {retireIds.length > 0 ? `Retire ${retireIds.length} duplicate${retireIds.length === 1 ? "" : "s"}` : "Nothing to retire"}
          </button>
          <button
            type="button"
            onClick={() => dupes.refetch()}
            disabled={dupes.isFetching}
            className="flex items-center gap-2 px-4 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "#EDE8DC", color: "#1A1A1A", border: "1px solid #D1C9BB" }}
          >
            {dupes.isFetching ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Refresh
          </button>
        </div>

        {dupes.isLoading && (
          <div className="flex items-center gap-2 font-body" style={{ color: "#5A5448" }}>
            <Loader2 size={16} className="animate-spin" /> Scanning your articles…
          </div>
        )}

        {dupes.data?.error && (
          <div className="rounded p-4 font-body" style={{ backgroundColor: "#FFF7E6", border: "1px solid #D4A017", color: "#5A5448" }}>
            Couldn't scan: {dupes.data.error}
          </div>
        )}

        {!dupes.isLoading && groups.length === 0 && (
          <div className="rounded p-6 flex items-center gap-2" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}>
            <CheckCircle2 size={20} style={{ color: "#2E7D32" }} />
            <span className="font-ui font-semibold" style={{ color: "#1A1A1A" }}>No duplicate titles found.</span>
          </div>
        )}

        {done && (
          <div className="rounded p-4 mb-6 flex items-center gap-2 font-body" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB", color: "#1A1A1A" }}>
            <CheckCircle2 size={18} style={{ color: "#2E7D32" }} />
            Retired {done.updated} {done.updated === 1 ? "copy" : "copies"}. The list below is refreshed.
          </div>
        )}

        {groups.length > 0 && (
          <>
            <div className="font-body text-sm mb-4 flex items-center gap-2" style={{ color: "#5A5448" }}>
              <AlertTriangle size={16} style={{ color: "#D4A017" }} />
              {groups.length} duplicated {groups.length === 1 ? "title" : "titles"} · {totalExtraPublished} extra published {totalExtraPublished === 1 ? "copy" : "copies"}
            </div>

            <div className="space-y-5">
              {groups.map((g: any, gi: number) => {
                const keep = keepFor(gi, g.keepId);
                return (
                  <div key={gi} className="rounded p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}>
                    <div className="font-display text-lg font-bold mb-1" style={{ color: "#1A1A1A" }}>
                      {g.title}
                    </div>
                    <div className="font-ui text-xs uppercase tracking-wider mb-4" style={{ color: "#5A5448" }}>
                      {g.copies.length} copies
                    </div>
                    <div className="space-y-2">
                      {g.copies.map((c: any) => {
                        const isKeep = c.id === keep;
                        return (
                          <label
                            key={c.id}
                            className="flex items-center gap-3 p-3 rounded cursor-pointer"
                            style={{
                              border: `1px solid ${isKeep ? "#2E7D32" : "#E5E0D5"}`,
                              backgroundColor: isKeep ? "#F1F7F1" : "#FAF8F3",
                            }}
                          >
                            <input
                              type="radio"
                              name={`keep-${gi}`}
                              checked={isKeep}
                              onChange={() => setKeepByGroup((m) => ({ ...m, [gi]: c.id }))}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-mono text-xs truncate" style={{ color: "#1A1A1A" }}>{c.slug}</div>
                              <div className="font-ui text-xs" style={{ color: "#5A5448" }}>
                                {c.pillar ?? "—"} · {c.bodyLen.toLocaleString()} chars
                                {c.featured ? " · featured" : ""}
                                {!c.published ? " · already unpublished" : ""}
                              </div>
                            </div>
                            <span
                              className="font-ui text-xs font-semibold px-2 py-1 rounded"
                              style={
                                isKeep
                                  ? { backgroundColor: "#2E7D32", color: "#FFFFFF" }
                                  : c.published
                                    ? { backgroundColor: "#EDE8DC", color: "#5A5448" }
                                    : { backgroundColor: "#F5F0E6", color: "#9A9384" }
                              }
                            >
                              {isKeep ? "KEEP" : c.published ? "will retire" : "unpublished"}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
