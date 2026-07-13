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
  blocked: string[];
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
    const BATCH = 6;
    let all: { slug: string; body: string; readingTimeMinutes: number }[];
    try {
      // Download the finished content once in the browser, then send small
      // batches to the server so each request only does a few quick DB writes.
      const resp = await fetch("/api/admin/article-bodies", { credentials: "include" });
      if (!resp.ok) throw new Error(`couldn't load content file (${resp.status})`);
      all = await resp.json();
    } catch (e: any) {
      toast.error(e?.message || "Couldn't load the article content file.");
      setMode(null);
      return;
    }
    // Send one batch, retrying a few times if a call stalls (the database can be
    // slow and an occasional request times out — a retry on a warm function
    // succeeds). Idempotent, so retries are safe.
    const sendBatch = async (items: typeof all) => {
      let lastErr: any;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const r = await publish.mutateAsync({ dryRun, items });
          if ((r as any).error) throw new Error((r as any).error);
          return r;
        } catch (e: any) {
          lastErr = e;
          await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
        }
      }
      throw lastErr;
    };
    let matched = 0, updated = 0;
    const missing: string[] = [];
    // Bodies the server refused to publish because they still contain unresolved
    // [cite — confirm] placeholders. They are skipped, never written.
    const blocked: string[] = [];
    // Build the batches, then process them. A batch that keeps failing is set
    // aside (not aborted) and retried in sweeps at the end, so one slow/stalled
    // request can't stop the whole run.
    const batches: (typeof all)[] = [];
    for (let i = 0; i < all.length; i += BATCH) batches.push(all.slice(i, i + BATCH));
    // Process last-to-first: the still-unfilled articles are at the end of the
    // list, so doing the tail first gets them in before any late-run slowdown.
    batches.reverse();
    let done = 0;
    let pending = batches.slice();
    try {
      for (let sweep = 0; sweep < 5 && pending.length; sweep++) {
        const stillFailing: (typeof all)[] = [];
        for (const items of pending) {
          try {
            const r = await sendBatch(items);
            matched += r.matched;
            updated += r.updated;
            missing.push(...r.missing);
            blocked.push(...((r as any).blocked || []));
          } catch {
            stillFailing.push(items);
          }
          done++;
          setProgress({ processed: Math.min(done * BATCH, all.length), total: all.length });
        }
        pending = stillFailing;
        if (pending.length) await new Promise((r) => setTimeout(r, 1500));
      }
      setResult({ total: all.length, matched, updated, missing, blocked, dryRun });
      const stragglers = pending.reduce((n, b) => n + b.length, 0);
      if (blocked.length > 0) {
        toast.warning(`${blocked.length} article(s) were held back — they still contain unverified [cite] citations. Resolve those before publishing.`);
      }
      if (stragglers > 0) {
        toast.error(`${updated} done; ${stragglers} kept stalling — click Publish once more to finish them.`);
      } else {
        toast.success(
          dryRun
            ? `Test complete — ${matched} articles ready to fill.`
            : `Done — ${updated} articles published.`
        );
      }
    } catch (e: any) {
      toast.error(e?.message || "Something interrupted it — it's safe to click again to continue.");
    } finally {
      setMode(null);
      setProgress(null);
    }
  };

  const busy = mode !== null;

  // "Publish everything" — inserts the code-shipped article libraries (the
  // post-Christian series, the Integrated Life expansion, and the womanhood/
  // doubt/devotional set) as new posts in one call. Idempotent on the server.
  const [seedBusy, setSeedBusy] = useState(false);
  const [seedResult, setSeedResult] = useState<
    { inserted: number; total: number; totalPosts: number; breakdown: Record<string, { inserted: number; total: number }> } | null
  >(null);

  const publishLibraries = async () => {
    if (!window.confirm("Publish all new article libraries (post-Christian, Integrated Life, and womanhood/doubt/devotionals) to the site? Safe to run more than once — it only adds what's missing.")) {
      return;
    }
    setSeedBusy(true);
    setSeedResult(null);
    try {
      const resp = await fetch("/api/admin/seed-all", { method: "POST", credentials: "include" });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.error || `seed failed (${resp.status})`);
      setSeedResult(data);
      toast.success(`Published ${data.inserted} new article(s). Your site now has ${data.totalPosts} posts.`);
    } catch (e: any) {
      toast.error(e?.message || "Couldn't publish the libraries — it's safe to try again.");
    } finally {
      setSeedBusy(false);
    }
  };

  // Ebook checkout: create (idempotently) a $9.99 Stripe price for every ebook
  // that lacks one, and store the id so the Buy buttons go live. Books already
  // configured are left untouched. Uses the server's own Stripe key.
  const [stripeBusy, setStripeBusy] = useState(false);
  const [stripeResult, setStripeResult] = useState<
    { created: number; reused: number; envConfigured: number; total: number } | null
  >(null);

  const publishStripePrices = async () => {
    if (!window.confirm("Create the missing Stripe prices and turn on checkout for every ebook that has a file to deliver? Safe to run more than once — it only fills what's missing and never touches books that already sell.")) {
      return;
    }
    setStripeBusy(true);
    setStripeResult(null);
    try {
      const resp = await fetch("/api/admin/create-stripe-prices", { method: "POST", credentials: "include" });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.error || `Stripe setup failed (${resp.status})`);
      setStripeResult(data);
      toast.success(`${data.created} ebook(s) turned on. ${data.created + data.reused + data.envConfigured} of ${data.total} now sell.`);
    } catch (e: any) {
      toast.error(e?.message || "Couldn't set up checkout — it's safe to try again.");
    } finally {
      setStripeBusy(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="rounded p-6 mb-10" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)" }}>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>
            Turn on ebook checkout
          </h2>
          <p className="font-body mb-5" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
            One click creates a $9.99 Stripe price for every ebook that has a file to deliver and
            turns its Buy button into real checkout. It uses your connected Stripe account, never
            touches a book that already sells, and is safe to run as many times as you like.
          </p>
          <button
            type="button"
            onClick={publishStripePrices}
            disabled={stripeBusy}
            className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "var(--charcoal)", color: "var(--bone)" }}
          >
            {stripeBusy ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            Turn on checkout for all ebooks
          </button>
          {stripeResult && (
            <div className="mt-5 font-body" style={{ color: "var(--charcoal)" }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: "var(--adm-ok)" }} />
                <span className="font-ui font-semibold">
                  {stripeResult.created} newly turned on · {stripeResult.reused + stripeResult.envConfigured} already selling · {stripeResult.total} total
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="rounded p-6 mb-10" style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)" }}>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>
            Publish the new article libraries
          </h2>
          <p className="font-body mb-5" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
            One click adds the 220 essays written for the site — the 60-part post-Christian series,
            the 90 Integrated Life essays (marriage, parenting, money, manhood), and the 70 womanhood,
            doubt, and devotional pieces — as published posts. It never overwrites or duplicates; run
            it as many times as you like and it only fills what's missing.
          </p>
          <button
            type="button"
            onClick={publishLibraries}
            disabled={seedBusy}
            className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "var(--mustard)", color: "var(--charcoal)" }}
          >
            {seedBusy ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            Publish everything now
          </button>
          {seedResult && (
            <div className="mt-5 font-body" style={{ color: "var(--charcoal)" }}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={18} style={{ color: "var(--adm-ok)" }} />
                <span className="font-ui font-semibold">
                  {seedResult.inserted} new article(s) published · {seedResult.totalPosts} posts total
                </span>
              </div>
              <ul className="text-sm space-y-1" style={{ color: "var(--ink-muted)" }}>
                {Object.entries(seedResult.breakdown).map(([name, b]) => (
                  <li key={name}>
                    {name}: <strong>{b.inserted}</strong> new of {b.total}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--charcoal)" }}>
          Publish Article Content
        </h1>
        <p className="font-body mb-8" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
          This fills your articles with their finished, fully-formatted versions — all 421 of them,
          including the marriage, parenting, apologetics, church history, justice, and preaching essays,
          each with its section headings and pull-quotes. It updates only the article text and reading
          time — it never changes a post's title, published status, or category. Start with the safe
          test, then publish.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={() => run(true)}
            disabled={busy}
            className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium disabled:opacity-50"
            style={{ backgroundColor: "var(--bone-warm)", color: "var(--charcoal)", border: "1px solid var(--adm-line)" }}
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
            style={{ backgroundColor: "var(--charcoal)", color: "var(--bone)" }}
          >
            {busy && mode === "publish" ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            Publish all article content
          </button>
        </div>

        {busy && progress && (
          <div className="mb-8 font-body" style={{ color: "var(--ink-muted)" }}>
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              {mode === "publish" ? "Publishing" : "Checking"} — {progress.processed} of {progress.total}…
            </div>
            <div style={{ height: 8, background: "var(--bone-warm)", borderRadius: 999, marginTop: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round((progress.processed / Math.max(1, progress.total)) * 100)}%`, background: "var(--mustard)", transition: "width .2s" }} />
            </div>
            <p className="text-sm mt-2">Please keep this page open until it finishes.</p>
          </div>
        )}

        {result && (
          <div
            className="rounded p-6"
            style={{ backgroundColor: "var(--card)", border: "1px solid var(--adm-line)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              {result.missing.length === 0 ? (
                <CheckCircle2 size={20} style={{ color: "var(--adm-ok)" }} />
              ) : (
                <AlertTriangle size={20} style={{ color: "var(--mustard-text)" }} />
              )}
              <span className="font-ui font-semibold" style={{ color: "var(--charcoal)" }}>
                {result.dryRun ? "Test result (nothing changed)" : "Published"}
              </span>
            </div>
            <ul className="font-body space-y-1" style={{ color: "var(--charcoal)" }}>
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
                <summary className="cursor-pointer font-ui text-sm" style={{ color: "var(--ink-muted)" }}>
                  Show the {result.missing.length} slugs that didn't match
                </summary>
                <div className="mt-2 text-sm font-mono" style={{ color: "var(--ink-muted)" }}>
                  {result.missing.join(", ")}
                </div>
              </details>
            )}
            {result.blocked.length > 0 && (
              <div className="mt-4 rounded p-4" style={{ backgroundColor: "var(--adm-gold-tint)", border: "1px solid var(--mustard)" }}>
                <div className="flex items-center gap-2 font-ui font-semibold" style={{ color: "var(--charcoal)" }}>
                  <AlertTriangle size={16} style={{ color: "var(--mustard-text)" }} />
                  {result.blocked.length} held back — unverified citations
                </div>
                <p className="font-body text-sm mt-2" style={{ color: "var(--ink-muted)" }}>
                  These articles still contain <code>[cite — confirm]</code> placeholders and were not
                  published. Resolve or remove the citations, then publish again.
                </p>
                <details className="mt-2">
                  <summary className="cursor-pointer font-ui text-sm" style={{ color: "var(--ink-muted)" }}>
                    Show the {result.blocked.length} held-back slugs
                  </summary>
                  <div className="mt-2 text-sm font-mono" style={{ color: "var(--ink-muted)" }}>
                    {result.blocked.join(", ")}
                  </div>
                </details>
              </div>
            )}
            {result.dryRun && result.matched > 0 && (
              <p className="mt-4 font-body text-sm" style={{ color: "var(--ink-muted)" }}>
                Looks good. Click <strong>Publish all article content</strong> above to fill them for real.
              </p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
