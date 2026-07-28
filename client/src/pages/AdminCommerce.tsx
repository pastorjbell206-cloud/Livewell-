/**
 * AdminCommerce (/admin/commerce) — the money page.
 *
 * One screen answering: what is selling, what could be selling but isn't, and
 * what has sold. Per-ebook checkout status from /api/admin/commerce-status,
 * one-click "turn on checkout" (the same idempotent endpoint the Publish page
 * uses), and the orders summary from /api/admin/metrics.
 */
import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { SectionHeader, Panel, StatTile, LoadingNote, ErrorNote, EmptyNote, A } from "@/components/admin/primitives";
import { Loader2, Zap, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface BookStatus { slug: string; title: string; status: "live" | "no-price"; source: string | null }
interface Commerce { stripeConfigured: boolean; live: number; total: number; books: BookStatus[] }
interface Sales {
  orders: number; revenueCents: number; currency: string;
  byBook: { slug: string; title: string; orders: number; revenueCents: number }[];
  recent: { title: string; email: string | null; createdAt: string }[];
}

const money = (cents: number, cur = "usd") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: (cur || "usd").toUpperCase() }).format((cents || 0) / 100);

export default function AdminCommerce() {
  const [commerce, setCommerce] = useState<Commerce | null>(null);
  const [commerceError, setCommerceError] = useState(false);
  const [sales, setSales] = useState<Sales | null>(null);
  const [busy, setBusy] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    // No synchronous reset: on refresh the old table stays visible until the
    // fresh status lands (stale-while-revalidate), avoiding a loading flash.
    fetch("/api/admin/commerce-status", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && d?.ok && setCommerce(d))
      .catch(() => active && setCommerceError(true));
    fetch("/api/admin/metrics", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && d?.ok && setSales(d.sales))
      .catch(() => { /* the sales panels show their own empty state */ });
    return () => { active = false; };
  }, [nonce]);

  const turnOnAll = async () => {
    if (!window.confirm("Create the missing Stripe prices and turn on checkout for every ebook that lacks one? Books already selling are never touched; safe to run more than once.")) return;
    setBusy(true);
    try {
      const resp = await fetch("/api/admin/create-stripe-prices", { method: "POST", credentials: "include" });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.error || `failed (${resp.status})`);
      toast.success(`${data.created} ebook(s) turned on.`);
      setNonce((n) => n + 1); // reload the status table with fresh truth
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't turn on checkout — safe to try again.");
    } finally {
      setBusy(false);
    }
  };

  const noPrice = commerce ? commerce.books.filter((b) => b.status === "no-price") : [];

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: A.ink }}>Ebook Sales</h1>
        <p className="font-body text-lg mb-8" style={{ color: A.muted }}>
          What is selling, what could be but isn&rsquo;t, and what has sold.
        </p>

        {commerceError && <ErrorNote>Couldn&rsquo;t load checkout status (needs the production API and an admin session).</ErrorNote>}
        {!commerce && !commerceError && <LoadingNote label="Checking every book's checkout status…" />}

        {commerce && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <StatTile label="Selling now" value={String(commerce.live)} sub={`of ${commerce.total} ebooks`} color="var(--adm-forest)" />
              <StatTile label="Missing a price" value={String(noPrice.length)} sub={noPrice.length ? "fix with one click below" : "nothing to fix"} color={noPrice.length ? "var(--alert)" : "var(--adm-slate)"} />
              <StatTile label="Revenue" value={sales ? money(sales.revenueCents, sales.currency) : "—"} sub={sales ? `${sales.orders} orders, all time` : "loading"} color="var(--adm-gold)" />
            </div>

            {!commerce.stripeConfigured && (
              <Panel style={{ marginBottom: 24, borderLeft: `3px solid ${A.danger}` }}>
                <div className="flex items-start gap-2">
                  <AlertTriangle size={18} style={{ color: A.danger, flexShrink: 0, marginTop: 2 }} />
                  <p className="font-body text-sm" style={{ color: A.ink }}>
                    Stripe is not configured on the server (STRIPE_SECRET_KEY is missing), so no checkout can work until it is added in Vercel.
                  </p>
                </div>
              </Panel>
            )}

            {noPrice.length > 0 && commerce.stripeConfigured && (
              <Panel style={{ marginBottom: 24 }}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div style={{ minWidth: 0, flex: "1 1 260px" }}>
                    <div className="font-ui font-semibold text-sm mb-1" style={{ color: A.ink }}>
                      {noPrice.length} ebook{noPrice.length === 1 ? "" : "s"} ready to sell but missing a price
                    </div>
                    <p className="font-body text-xs" style={{ color: A.muted }}>
                      One click creates a $8.99 Stripe price for each and turns its Buy button into real checkout.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={turnOnAll}
                    disabled={busy}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-ui font-semibold text-sm disabled:opacity-50"
                    style={{ backgroundColor: A.ink, color: "var(--bone)", cursor: busy ? "default" : "pointer" }}
                  >
                    {busy ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                    Turn on checkout for all
                  </button>
                </div>
              </Panel>
            )}

            <SectionHeader title="Every ebook, by status" description="Live means the Buy button charges a real card. Missing a price means the page falls back to its waitlist." />
            <Panel style={{ marginBottom: 32, padding: 0 }}>
              {commerce.books.map((b, i) => (
                <div
                  key={b.slug}
                  className="flex flex-wrap items-center justify-between gap-2"
                  style={{ padding: "10px 18px", borderTop: i === 0 ? "none" : `1px solid ${A.line}` }}
                >
                  <span className="font-ui text-sm" style={{ color: A.ink, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</span>
                  {b.status === "live" ? (
                    <span className="flex items-center gap-1 font-ui text-xs font-semibold" style={{ color: A.ok }}>
                      <CheckCircle2 size={14} /> Live · $8.99
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-ui text-xs font-semibold" style={{ color: A.danger }}>
                      <AlertTriangle size={14} /> No price
                    </span>
                  )}
                </div>
              ))}
            </Panel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Panel>
                <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: A.muted }}>Top sellers</div>
                {!sales || sales.byBook.length === 0 ? (
                  <EmptyNote>No orders yet.</EmptyNote>
                ) : (
                  sales.byBook.slice(0, 8).map((b) => (
                    <div key={b.slug} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: 14 }}>
                      <span style={{ color: A.ink }}>{b.title}</span>
                      <span style={{ color: A.muted }}>{b.orders} · {money(b.revenueCents, sales.currency)}</span>
                    </div>
                  ))
                )}
              </Panel>
              <Panel>
                <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: A.muted }}>Recent orders</div>
                {!sales || sales.recent.length === 0 ? (
                  <EmptyNote>No orders yet.</EmptyNote>
                ) : (
                  sales.recent.slice(0, 8).map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: 13 }}>
                      <span style={{ color: A.ink }}>{r.title}</span>
                      <span style={{ color: A.muted }}>{r.email || "—"} · {new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))
                )}
              </Panel>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
