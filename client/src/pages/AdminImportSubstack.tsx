import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Loader2, Download, CheckCircle2, ExternalLink, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  slugFromLink,
  categoryForSlug,
  htmlToMarkdown,
  readTimeFor,
  type ImportMode,
} from "@/lib/substackImport";

interface FeedItem {
  title: string;
  link: string;
  description?: string;
  content?: string;
  pubDate?: string;
}
interface Draft {
  slug: string;
  title: string;
  body: string;
  excerpt: string;
  pillar: string;
  subPathway: string;
  series: boolean;
  readTime: string;
  mode: ImportMode;
  link: string;
}

/**
 * Reads the Substack feed (through the site's own server) and imports each post
 * as an UNPUBLISHED draft, pre-tagged with its pillar + sub-pathway. Standalone
 * essays come in full; the serialized "End of Christian America" book comes in
 * as short teasers that link back to Substack. Idempotent by slug.
 */
export default function AdminImportSubstack() {
  const create = trpc.posts.createDrafts.useMutation();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ inserted: number; skipped: string[] } | null>(null);

  const buildDraft = (it: FeedItem): Draft | null => {
    const slug = slugFromLink(it.link);
    if (!slug) return null;
    const cat = categoryForSlug(slug);
    if (!cat) return null;
    const excerpt = (it.description || "").trim();
    let body: string;
    if (cat.mode === "teaser") {
      body = `${excerpt}\n\n*This is part of the serialized series “The End of Christian America.”*\n\n[Read the full essay on Substack →](${it.link})`;
    } else {
      body = htmlToMarkdown(it.content || "") || `${excerpt}\n\n[Read on Substack →](${it.link})`;
    }
    return {
      slug, title: it.title.trim(), body,
      excerpt: excerpt.slice(0, 300),
      pillar: cat.pillar, subPathway: cat.sub, series: cat.series,
      readTime: readTimeFor(body), mode: cat.mode, link: it.link,
    };
  };

  const load = async () => {
    setLoading(true);
    setResult(null);
    try {
      const resp = await fetch("/api/rss/substack?full=1&fresh=1");
      const data = await resp.json();
      if (!data?.ok) throw new Error(data?.error || "couldn't read the Substack feed");
      const built = (data.items as FeedItem[]).map(buildDraft).filter(Boolean) as Draft[];
      setDrafts(built);
      if (built.length === 0) toast.error("No mappable posts found in the feed.");
    } catch (e: any) {
      toast.error(e?.message || "Couldn't load the Substack feed.");
    } finally {
      setLoading(false);
    }
  };

  const run = async () => {
    if (drafts.length === 0) return;
    setBusy(true);
    setResult(null);
    const BATCH = 4;
    const items = drafts.map((d) => ({
      slug: d.slug, title: d.title, body: d.body, excerpt: d.excerpt,
      pillar: d.pillar, subPathway: d.subPathway, series: d.series, readTime: d.readTime,
    }));
    const sendBatch = async (chunk: typeof items) => {
      let lastErr: any;
      for (let a = 0; a < 3; a++) {
        try {
          const r = await create.mutateAsync({ items: chunk });
          if ((r as any).error) throw new Error((r as any).error);
          return r;
        } catch (e: any) { lastErr = e; await new Promise((res) => setTimeout(res, 600 * (a + 1))); }
      }
      throw lastErr;
    };
    let inserted = 0;
    const skipped: string[] = [];
    try {
      for (let i = 0; i < items.length; i += BATCH) {
        const r = await sendBatch(items.slice(i, i + BATCH));
        inserted += r.inserted;
        skipped.push(...r.skipped);
      }
      setResult({ inserted, skipped });
      toast.success(inserted > 0 ? `Imported ${inserted} draft${inserted === 1 ? "" : "s"}.` : "Already imported — nothing new.");
    } catch (e: any) {
      toast.error(e?.message || "Something interrupted it — safe to click again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--charcoal)" }}>
          Import from Substack
        </h1>
        <p className="font-body mb-6" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
          Pulls your Substack posts and brings each in as an <strong>unpublished draft</strong>,
          pre-filed under its pillar and sub-pathway. Standalone essays import in full; the serialized
          “End of Christian America” comes in as short teasers that link back to Substack. Nothing is
          published until you publish it, and re-running skips anything already imported.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <button type="button" onClick={load} disabled={loading || busy}
            className="flex items-center gap-2 px-5 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "var(--bone-warm)", color: "var(--charcoal)", border: "1px solid var(--adm-line)" }}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {drafts.length ? "Reload from Substack" : "Read my Substack"}
          </button>
          {drafts.length > 0 && (
            <button type="button" onClick={run} disabled={busy}
              className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
              style={{ backgroundColor: "var(--charcoal)", color: "var(--bone)" }}>
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              Import {drafts.length} as drafts
            </button>
          )}
        </div>

        {result && (
          <div className="rounded p-4 mb-6 flex items-center gap-2 font-body" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)", color: "var(--charcoal)" }}>
            <CheckCircle2 size={18} style={{ color: "var(--adm-ok)" }} />
            Imported {result.inserted} as drafts{result.skipped.length ? `, skipped ${result.skipped.length} already present` : ""}. Find them under Writing Posts to review and publish.
          </div>
        )}

        {drafts.length > 0 && (
          <div className="space-y-3">
            {drafts.map((d) => (
              <div key={d.slug} className="rounded p-4" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)" }}>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-ui text-xs uppercase tracking-wider" style={{ color: "var(--mustard-text)" }}>
                    {d.pillar} · {d.subPathway}
                  </div>
                  <span className="font-ui text-xs font-semibold px-2 py-1 rounded"
                    style={d.mode === "full" ? { backgroundColor: "var(--bone-warm)", color: "var(--ink-muted)" } : { backgroundColor: "var(--adm-ok-soft)", color: "var(--adm-ok)" }}>
                    {d.mode === "full" ? "full essay" : "teaser → Substack"}
                  </span>
                </div>
                <div className="font-display text-xl font-bold mt-1" style={{ color: "var(--charcoal)" }}>{d.title}</div>
                <div className="font-body text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
                  {d.readTime} · {d.body.split(/\s+/).length.toLocaleString()} words
                  <a href={d.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 ml-2" style={{ color: "var(--charcoal)" }}>
                    <ExternalLink size={12} /> source
                  </a>
                </div>
              </div>
            ))}
            <p className="font-body text-sm flex items-center gap-2 mt-2" style={{ color: "var(--ink-muted)" }}>
              <AlertTriangle size={14} style={{ color: "var(--mustard-text)" }} />
              Imported essays are auto-converted from Substack — skim each in the editor before publishing.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
