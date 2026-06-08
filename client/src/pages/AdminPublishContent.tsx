import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Loader2, UploadCloud, FlaskConical, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface PublishResult {
  total: number;
  matched: number;
  updated: number;
  missing: string[];
  dryRun: boolean;
}

export default function AdminPublishContent() {
  const publish = trpc.posts.publishFullBodies.useMutation();
  const [result, setResult] = useState<PublishResult | null>(null);
  const [mode, setMode] = useState<"test" | "publish" | null>(null);
  const [progress, setProgress] = useState<{ processed: number; total: number } | null>(null);

  const run = async (dryRun: boolean) => {
    setMode(dryRun ? "test" : "publish");
    setResult(null);
    setProgress(null);
    const BATCH = 10;
    let all: { slug: string; body: string; readingTimeMinutes: number }[];
    try {
      // Download the finished content once in the browser, then send small
      // batches to the server so each request only does a few quick DB writes.
      const resp = await fetch("/admin-article-bodies.json", { cache: "no-store" });
      if (!resp.ok) throw new Error(`couldn't load content file (${resp.status})`);
      all = await resp.json();
    } catch (e: any) {
      toast.error(e?.message || "Couldn't load the article content file.");
      setMode(null);
      return;
    }
    let matched = 0, updated = 0;
    const missing: string[] = [];
    try {
      for (let i = 0; i < all.length; i += BATCH) {
        const items = all.slice(i, i + BATCH);
        const r = await publish.mutateAsync({ dryRun, items });
        matched += r.matched;
        updated += r.updated;
        missing.push(...r.missing);
        setProgress({ processed: Math.min(i + BATCH, all.length), total: all.length });
      }
      setResult({ total: all.length, matched, updated, missing, dryRun });
      toast.success(
        dryRun
          ? `Test complete — ${matched} articles ready to fill.`
          : `Done — ${updated} articles published.`
      );
    } catch (e: any) {
      toast.error(e?.message || "Something interrupted it — it's safe to click again to continue.");
    } finally {
      setMode(null);
      setProgress(null);
    }
  };

  const busy = mode !== null;

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "#1A1A1A" }}>
          Publish Article Content
        </h1>
        <p className="font-body mb-8" style={{ color: "#5A5448", lineHeight: 1.7 }}>
          This fills your empty and short articles with their finished 1,500+ word versions.
          It updates only the article text and reading time — it never changes a post's title,
          published status, or category. Start with the safe test, then publish.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={() => run(true)}
            disabled={busy}
            className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "#EDE8DC", color: "#1A1A1A", border: "1px solid #D1C9BB" }}
          >
            {busy && mode === "test" ? <Loader2 size={16} className="animate-spin" /> : <FlaskConical size={16} />}
            Run safe test (no changes)
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Publish the finished content into all matching articles? You can run the safe test first if you haven't.")) {
                run(false);
              }
            }}
            disabled={busy}
            className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "#1A1A1A", color: "#F5F0E6" }}
          >
            {busy && mode === "publish" ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            Publish all article content
          </button>
        </div>

        {busy && progress && (
          <div className="mb-8 font-body" style={{ color: "#5A5448" }}>
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              {mode === "publish" ? "Publishing" : "Checking"} — {progress.processed} of {progress.total}…
            </div>
            <div style={{ height: 8, background: "#EDE8DC", borderRadius: 999, marginTop: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round((progress.processed / Math.max(1, progress.total)) * 100)}%`, background: "#D4A017", transition: "width .2s" }} />
            </div>
            <p className="text-sm mt-2">Please keep this page open until it finishes.</p>
          </div>
        )}

        {result && (
          <div
            className="rounded p-6"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}
          >
            <div className="flex items-center gap-2 mb-4">
              {result.missing.length === 0 ? (
                <CheckCircle2 size={20} style={{ color: "#2E7D32" }} />
              ) : (
                <AlertTriangle size={20} style={{ color: "#D4A017" }} />
              )}
              <span className="font-ui font-semibold" style={{ color: "#1A1A1A" }}>
                {result.dryRun ? "Test result (nothing changed)" : "Published"}
              </span>
            </div>
            <ul className="font-body space-y-1" style={{ color: "#1A1A1A" }}>
              <li>Articles in the content set: <strong>{result.total}</strong></li>
              <li>Matched to a post on your site: <strong>{result.matched}</strong></li>
              {!result.dryRun && <li>Updated just now: <strong>{result.updated}</strong></li>}
              <li>
                Not found on your site:{" "}
                <strong>{result.missing.length}</strong>
              </li>
            </ul>
            {result.missing.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer font-ui text-sm" style={{ color: "#5A5448" }}>
                  Show the {result.missing.length} slugs that didn't match
                </summary>
                <div className="mt-2 text-sm font-mono" style={{ color: "#5A5448" }}>
                  {result.missing.join(", ")}
                </div>
              </details>
            )}
            {result.dryRun && result.matched > 0 && (
              <p className="mt-4 font-body text-sm" style={{ color: "#5A5448" }}>
                Looks good. Click <strong>Publish all article content</strong> above to fill them for real.
              </p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
