import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useState } from "react";
import { Loader2, FilePlus2, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface DraftItem {
  slug: string;
  title: string;
  pillar?: string;
  subPathway?: string;
  excerpt?: string;
  readTime?: string;
  body: string;
}

/**
 * Loads the flagship draft essays into the database as UNPUBLISHED posts so
 * James can preview them in the real layout, tune the voice, and publish from
 * the post editor when ready. Idempotent — re-running skips essays already in.
 */
export default function AdminLoadDrafts() {
  const create = trpc.posts.createDrafts.useMutation();
  const [items, setItems] = useState<DraftItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ inserted: number; skipped: string[] } | null>(null);

  // Show the essays for review before loading.
  const preview = async () => {
    try {
      const resp = await fetch("/draft-essays.json", { cache: "no-store" });
      if (!resp.ok) throw new Error(`couldn't load the drafts file (${resp.status})`);
      setItems(await resp.json());
    } catch (e: any) {
      toast.error(e?.message || "Couldn't load the drafts file.");
    }
  };

  const run = async () => {
    setBusy(true);
    setResult(null);
    try {
      let list = items;
      if (list.length === 0) {
        const resp = await fetch("/draft-essays.json", { cache: "no-store" });
        if (!resp.ok) throw new Error(`couldn't load the drafts file (${resp.status})`);
        list = await resp.json();
        setItems(list);
      }
      const r = await create.mutateAsync({ items: list });
      if ((r as any).error) throw new Error((r as any).error);
      setResult({ inserted: r.inserted, skipped: r.skipped });
      toast.success(
        r.inserted > 0
          ? `Loaded ${r.inserted} draft${r.inserted === 1 ? "" : "s"}.`
          : "Already loaded — nothing new to add."
      );
    } catch (e: any) {
      toast.error(e?.message || "Couldn't load the drafts — it's safe to try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "#1A1A1A" }}>
          Load draft essays
        </h1>
        <p className="font-body mb-6" style={{ color: "#5A5448", lineHeight: 1.7 }}>
          Adds the new flagship essays for your thinner pillars as{" "}
          <strong>unpublished drafts</strong>. They go in hidden from the public — read each one in
          the real layout, edit the wording, and publish from the post editor only when you're happy.
          Running this again skips anything already loaded.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={preview}
            disabled={busy}
            className="flex items-center gap-2 px-5 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "#EDE8DC", color: "#1A1A1A", border: "1px solid #D1C9BB" }}
          >
            Preview the essays
          </button>
          <button
            type="button"
            onClick={run}
            disabled={busy}
            className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "#1A1A1A", color: "#F5F0E6" }}
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <FilePlus2 size={16} />}
            Load as unpublished drafts
          </button>
        </div>

        {items.length > 0 && !result && (
          <div className="space-y-4 mb-8">
            {items.map((it) => (
              <div key={it.slug} className="rounded p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}>
                <div className="font-ui text-xs uppercase tracking-wider mb-1" style={{ color: "#D4A017" }}>
                  {it.pillar}{it.subPathway ? ` · ${it.subPathway}` : ""}
                </div>
                <div className="font-display text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
                  {it.title}
                </div>
                <p className="font-body text-sm" style={{ color: "#5A5448", lineHeight: 1.6 }}>
                  {it.excerpt}
                </p>
                <p className="font-body text-sm mt-3" style={{ color: "#1A1A1A", lineHeight: 1.7 }}>
                  {it.body.slice(0, 280)}…
                </p>
              </div>
            ))}
          </div>
        )}

        {result && (
          <div className="rounded p-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={20} style={{ color: "#2E7D32" }} />
              <span className="font-ui font-semibold" style={{ color: "#1A1A1A" }}>
                {result.inserted > 0 ? "Drafts loaded" : "Already loaded"}
              </span>
            </div>
            <ul className="font-body space-y-1 mb-4" style={{ color: "#1A1A1A" }}>
              <li>Added as drafts just now: <strong>{result.inserted}</strong></li>
              {result.skipped.length > 0 && (
                <li>Already present (skipped): <strong>{result.skipped.length}</strong></li>
              )}
            </ul>
            <p className="font-body text-sm mb-3" style={{ color: "#5A5448" }}>
              Preview each draft, then publish it from the post editor when ready:
            </p>
            <div className="flex flex-col gap-2">
              {items.map((it) => (
                <div key={it.slug} className="flex flex-wrap items-center gap-3">
                  <a
                    href={`/writing/${it.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-ui text-sm"
                    style={{ color: "#1A1A1A" }}
                  >
                    <ExternalLink size={14} /> Preview “{it.title}”
                  </a>
                  <Link href="/admin/posts" className="font-ui text-sm" style={{ color: "#5A5448" }}>
                    open in editor →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
