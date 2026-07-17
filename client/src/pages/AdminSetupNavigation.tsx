import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Loader2, Wand2, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface MappingRow {
  id?: number;
  slug?: string;
  pillar?: string;
  sub: string | null;
  series?: boolean;
}

/**
 * One-time setup for the two-level navigation. It (1) adds the two taxonomy
 * columns to the posts table if they aren't there yet, then (2) tags each
 * article with its sub-pathway and series flag from the mapping file. It never
 * touches a post's title, body, pillar, or published status. Safe to run again.
 */
export default function AdminSetupNavigation() {
  const migrate = trpc.posts.migrateTaxonomy.useMutation();
  const backfill = trpc.posts.backfillSubPathways.useMutation();
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ processed: number; total: number } | null>(null);
  const [result, setResult] = useState<{ total: number; updated: number; stragglers: number } | null>(null);

  const run = async () => {
    setRunning(true);
    setResult(null);
    setProgress(null);

    let rows: MappingRow[];
    try {
      const resp = await fetch("/subpathway-mapping.json");
      if (!resp.ok) throw new Error(`couldn't load the mapping file (${resp.status})`);
      rows = await resp.json();
    } catch (e: any) {
      toast.error(e?.message || "Couldn't load the navigation mapping file.");
      setRunning(false);
      return;
    }

    // 1) Add the columns (idempotent — does nothing if they already exist).
    try {
      const m = await migrate.mutateAsync();
      if ((m as any).error) throw new Error((m as any).error);
    } catch (e: any) {
      toast.error(e?.message || "Couldn't prepare the database columns.");
      setRunning(false);
      return;
    }

    // 2) Tag each article in small batches, retrying a stalled call a few times.
    const BATCH = 10;
    const items = rows.map((r) => ({ slug: r.slug, pillar: r.pillar ?? null, sub: r.sub, series: !!r.series }));
    const sendBatch = async (chunk: typeof items) => {
      let lastErr: any;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const r = await backfill.mutateAsync({ items: chunk });
          if ((r as any).error) throw new Error((r as any).error);
          return r;
        } catch (e: any) {
          lastErr = e;
          await new Promise((res) => setTimeout(res, 600 * (attempt + 1)));
        }
      }
      throw lastErr;
    };

    const batches: (typeof items)[] = [];
    for (let i = 0; i < items.length; i += BATCH) batches.push(items.slice(i, i + BATCH));

    let updated = 0;
    let done = 0;
    let pending = batches.slice();
    try {
      for (let sweep = 0; sweep < 5 && pending.length; sweep++) {
        const stillFailing: (typeof items)[] = [];
        for (const chunk of pending) {
          try {
            const r = await sendBatch(chunk);
            updated += r.updated;
          } catch {
            stillFailing.push(chunk);
          }
          done++;
          setProgress({ processed: Math.min(done * BATCH, items.length), total: items.length });
        }
        pending = stillFailing;
        if (pending.length) await new Promise((res) => setTimeout(res, 1500));
      }
      const stragglers = pending.reduce((n, b) => n + b.length, 0);
      setResult({ total: items.length, updated, stragglers });
      if (stragglers > 0) {
        toast.error(`${updated} tagged; ${stragglers} kept stalling — click once more to finish them.`);
      } else {
        toast.success(`Navigation set up — ${updated} articles tagged.`);
      }
    } catch (e: any) {
      toast.error(e?.message || "Something interrupted it — it's safe to click again to continue.");
    } finally {
      setRunning(false);
      setProgress(null);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--charcoal)" }}>
          Set up navigation
        </h1>
        <p className="font-body mb-8" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
          This organizes your articles into the new two-level menu — the five pillars and their
          sub-pathways, plus the Study Guides &amp; Series section. It only adds the menu labels to
          each article. It never changes a post's title, text, pillar, or published status. Safe to
          run more than once.
        </p>

        <button
          type="button"
          onClick={run}
          disabled={running}
          className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
          style={{ backgroundColor: "var(--charcoal)", color: "var(--bone)" }}
        >
          {running ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
          Set up the new navigation
        </button>

        {running && progress && (
          <div role="status" className="mt-8 font-body" style={{ color: "var(--ink-muted)" }}>
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Tagging articles — {progress.processed} of {progress.total}…
            </div>
            <div style={{ height: 8, background: "var(--bone-warm)", borderRadius: 999, marginTop: 8, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.round((progress.processed / Math.max(1, progress.total)) * 100)}%`,
                  background: "var(--mustard)",
                  transition: "width .2s",
                }}
              />
            </div>
            <p className="text-sm mt-2">Please keep this page open until it finishes.</p>
          </div>
        )}

        {result && (
          <div role="status" className="mt-8 rounded p-6" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)" }}>
            <div className="flex items-center gap-2 mb-4">
              {result.stragglers === 0 ? (
                <CheckCircle2 size={20} style={{ color: "var(--adm-ok)" }} />
              ) : (
                <AlertTriangle size={20} style={{ color: "var(--mustard-text)" }} />
              )}
              <span className="font-ui font-semibold" style={{ color: "var(--charcoal)" }}>
                {result.stragglers === 0 ? "Navigation is set up" : "Almost done"}
              </span>
            </div>
            <ul className="font-body space-y-1" style={{ color: "var(--charcoal)" }}>
              <li>Articles in the mapping: <strong>{result.total}</strong></li>
              <li>Tagged just now: <strong>{result.updated}</strong></li>
              {result.stragglers > 0 && (
                <li>Still to finish: <strong>{result.stragglers}</strong> — click the button once more.</li>
              )}
            </ul>
            {result.stragglers === 0 && (
              <p className="mt-4 font-body text-sm" style={{ color: "var(--ink-muted)" }}>
                The new menus will now fill in. Visit the site and hover the nav to check.
              </p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
