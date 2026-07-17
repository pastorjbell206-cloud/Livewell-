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
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--charcoal)" }}>
          Find duplicate articles
        </h1>
        <p className="font-body mb-6" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
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
            style={{ backgroundColor: "var(--charcoal)", color: "var(--bone)" }}
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Copy size={16} />}
            {retireIds.length > 0 ? `Retire ${retireIds.length} duplicate${retireIds.length === 1 ? "" : "s"}` : "Nothing to retire"}
          </button>
          <button
            type="button"
            onClick={() => dupes.refetch()}
            disabled={dupes.isFetching}
            className="flex items-center gap-2 px-4 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "var(--bone-warm)", color: "var(--charcoal)", border: "1px solid var(--adm-line)" }}
          >
            {dupes.isFetching ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Refresh
          </button>
        </div>

        {dupes.isLoading && (
          <div className="flex items-center gap-2 font-body" style={{ color: "var(--ink-muted)" }}>
            <Loader2 size={16} className="animate-spin" /> Scanning your articles…
          </div>
        )}

        {dupes.data?.error && (
          <div className="rounded p-4 font-body" style={{ backgroundColor: "var(--adm-gold-tint)", border: "1px solid var(--mustard)", color: "var(--ink-muted)" }}>
            Couldn't scan: {dupes.data.error}
          </div>
        )}

        {!dupes.isLoading && groups.length === 0 && (
          <div className="rounded p-6 flex items-center gap-2" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)" }}>
            <CheckCircle2 size={20} style={{ color: "var(--adm-ok)" }} />
            <span className="font-ui font-semibold" style={{ color: "var(--charcoal)" }}>No duplicate titles found.</span>
          </div>
        )}

        {done && (
          <div role="status" className="rounded p-4 mb-6 flex items-center gap-2 font-body" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)", color: "var(--charcoal)" }}>
            <CheckCircle2 size={18} style={{ color: "var(--adm-ok)" }} />
            Retired {done.updated} {done.updated === 1 ? "copy" : "copies"}. The list below is refreshed.
          </div>
        )}

        {groups.length > 0 && (
          <>
            <div className="font-body text-sm mb-4 flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
              <AlertTriangle size={16} style={{ color: "var(--mustard-text)" }} />
              {groups.length} duplicated {groups.length === 1 ? "title" : "titles"} · {totalExtraPublished} extra published {totalExtraPublished === 1 ? "copy" : "copies"}
            </div>

            <div className="space-y-5">
              {groups.map((g: any, gi: number) => {
                const keep = keepFor(gi, g.keepId);
                return (
                  <div key={gi} className="rounded p-5" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)" }}>
                    <div className="font-display text-lg font-bold mb-1" style={{ color: "var(--charcoal)" }}>
                      {g.title}
                    </div>
                    <div className="font-ui text-xs uppercase tracking-wider mb-4" style={{ color: "var(--ink-muted)" }}>
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
                              border: `1px solid ${isKeep ? "var(--adm-ok)" : "var(--adm-line-soft)"}`,
                              backgroundColor: isKeep ? "var(--adm-ok-soft)" : "var(--adm-bg-soft)",
                            }}
                          >
                            <input
                              type="radio"
                              name={`keep-${gi}`}
                              checked={isKeep}
                              onChange={() => setKeepByGroup((m) => ({ ...m, [gi]: c.id }))}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-mono text-xs truncate" style={{ color: "var(--charcoal)" }}>{c.slug}</div>
                              <div className="font-ui text-xs" style={{ color: "var(--ink-muted)" }}>
                                {c.pillar ?? "—"} · {c.bodyLen.toLocaleString()} chars
                                {c.featured ? " · featured" : ""}
                                {!c.published ? " · already unpublished" : ""}
                              </div>
                            </div>
                            <span
                              className="font-ui text-xs font-semibold px-2 py-1 rounded"
                              style={
                                isKeep
                                  ? { backgroundColor: "var(--adm-ok)", color: "var(--card)" }
                                  : c.published
                                    ? { backgroundColor: "var(--bone-warm)", color: "var(--ink-muted)" }
                                    : { backgroundColor: "var(--bone)", color: "var(--adm-taupe)" }
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
