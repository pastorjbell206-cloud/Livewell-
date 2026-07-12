import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { PenLine, FolderOpen, BookOpen, Loader2, Upload, Wand2, Copy, FilePlus2, Download, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const postsQuery = trpc.posts.listAll.useQuery();
  const resourcesQuery = trpc.resources.listAll.useQuery();
  const booksQuery = trpc.books.listAll.useQuery();
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [fixStatus, setFixStatus] = useState<string | null>(null);
  const [fixing, setFixing] = useState(false);
  type ContactMsg = { id: number; name: string | null; email: string; subject: string | null; message: string; createdAt: string };
  const [messages, setMessages] = useState<ContactMsg[] | null>(null);
  const [messagesError, setMessagesError] = useState(false);
  type Metrics = {
    audience: { subscribers: number; newThisMonth: number; members: number };
    sales: {
      orders: number; revenueCents: number; currency: string;
      byBook: { slug: string; title: string; orders: number; revenueCents: number }[];
      recent: { slug: string; title: string; email: string | null; amountTotal: number | null; createdAt: string }[];
    };
    catalog: { publishedPosts: number; publishedBooks: number };
  };
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [metricsError, setMetricsError] = useState(false);
  type Analytics = {
    views: { today: number; last7: number; last30: number; allTime: number };
    visitors: { last7: number; last30: number };
    topPaths: { path: string; views: number }[];
    daily: { date: string; views: number }[];
    referrers?: { host: string; views: number }[];
    reads?: { last30: number; allTime: number };
  };
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [analyticsError, setAnalyticsError] = useState(false);
  const [noPriceCount, setNoPriceCount] = useState<number | null>(null);
  type Signups = {
    total: number; last30: number;
    byPage: { page: string; signups: number }[];
    bySegment: { segment: string; signups: number }[];
  };
  const [signups, setSignups] = useState<Signups | null>(null);
  const [signupsError, setSignupsError] = useState(false);
  const money = (cents: number, cur = "usd") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: (cur || "usd").toUpperCase() }).format((cents || 0) / 100);
  useEffect(() => {
    let active = true;
    fetch("/api/admin/contact-messages", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && setMessages(Array.isArray(d?.messages) ? d.messages : []))
      .catch(() => active && setMessagesError(true));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/metrics", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && d?.ok && setMetrics(d))
      .catch(() => active && setMetricsError(true));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/analytics", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && d?.ok && setAnalytics(d))
      .catch(() => active && setAnalyticsError(true));
    fetch("/api/admin/commerce-status", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && d?.ok && setNoPriceCount((d.books || []).filter((b: { status: string }) => b.status === "no-price").length))
      .catch(() => { /* the strip simply omits what it cannot know */ });
    fetch("/api/admin/signups", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && d?.ok && setSignups(d))
      .catch(() => active && setSignupsError(true));
    return () => { active = false; };
  }, []);

  // Needs attention — the strip that answers "what should I do next?"
  const drafts = (postsQuery.data ?? []).filter((p: { published?: boolean }) => p.published === false).length;
  const attention: { label: string; href: string }[] = [
    ...(noPriceCount ? [{ label: `${noPriceCount} ebook${noPriceCount === 1 ? "" : "s"} missing a price — not selling`, href: "/admin/commerce" }] : []),
    ...(drafts ? [{ label: `${drafts} unpublished draft${drafts === 1 ? "" : "s"}`, href: "/admin/posts" }] : []),
    ...(messages && messages.length ? [{ label: `${messages.length} message${messages.length === 1 ? "" : "s"} in the inbox`, href: "#messages" }] : []),
  ];

  const stats = [
    { label: "Writing Posts", value: postsQuery.data?.length ?? 0, icon: PenLine, href: "/admin/posts", color: "#2C3E50" },
    { label: "Resources", value: resourcesQuery.data?.length ?? 0, icon: FolderOpen, href: "/admin/resources", color: "#2D4A3E" },
    { label: "Books", value: booksQuery.data?.length ?? 0, icon: BookOpen, href: "/admin/books", color: "#B8963E" },
  ];

  const handleSeedContent = async () => {
    // The seed library is 2.3 MB; load it only when this action is invoked so
    // it never rides in the dashboard's JS chunk.
    const contentData = (await import("@/data/content-data.json")).default;
    if (!confirm(`This will import ${contentData.posts.length} articles and ${contentData.books.length} books. Duplicates will be skipped. Continue?`)) return;
    setSeeding(true);
    setSeedStatus("Seeding content…");
    try {
      const res = await fetch("/api/admin/seed-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(contentData),
      });
      const data = await res.json();
      if (data.ok) {
        setSeedStatus(`Done! Imported ${data.postsInserted} posts, ${data.booksInserted} books, ${data.settingsSet} settings.`);
        postsQuery.refetch();
        booksQuery.refetch();
      } else {
        setSeedStatus(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setSeedStatus(`Failed: ${e.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const handleFixApostrophes = async () => {
    if (!confirm("Repair missing apostrophes (Gods, churchs, dont, …) across all posts and books? Slugs and URLs are never changed, and it is safe to run more than once.")) return;
    setFixing(true);
    setFixStatus("Repairing text…");
    try {
      const res = await fetch("/api/admin/fix-apostrophes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.ok) {
        setFixStatus(`Done! Repaired ${data.postsFixed} posts and ${data.booksFixed} books.`);
        postsQuery.refetch();
        booksQuery.refetch();
      } else {
        setFixStatus(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setFixStatus(`Failed: ${e.message}`);
    } finally {
      setFixing(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          Dashboard
        </h1>
        <p className="font-body text-lg mb-8" style={{ color: "#6B7280" }}>
          Welcome to the Livewell admin panel. Manage your content below.
        </p>

        {/* Needs attention — what to do next, before the numbers. */}
        {attention.length > 0 && (
          <div className="mb-10 p-4 rounded-lg" style={{ background: "#FFFFFF", border: "1px solid #D1C9BB", borderLeft: "3px solid #B8963E" }}>
            <div className="font-ui text-xs uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>Needs attention</div>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {attention.map((a) => (
                <Link key={a.label} href={a.href} className="font-ui text-sm no-underline" style={{ color: "#1A1A1A" }}>
                  {a.label} <span style={{ color: "#B8963E" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Stats Grid — primary content overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isLoading = postsQuery.isLoading || resourcesQuery.isLoading || booksQuery.isLoading;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="group flex flex-col p-8 rounded-lg no-underline transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: "#FFFFFF", borderTop: `5px solid ${stat.color}`, boxShadow: "0 1px 3px rgba(26,26,26,0.08)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="font-ui text-xs uppercase tracking-wider" style={{ color: "#6B7280" }}>
                    {stat.label}
                  </div>
                  <Icon size={32} style={{ color: stat.color, opacity: 0.35 }} />
                </div>
                <div className="font-display font-bold mb-3" style={{ color: stat.color, fontSize: "3.5rem", lineHeight: 1 }}>
                  {isLoading ? <Loader2 size={36} className="animate-spin" /> : stat.value}
                </div>
                <div className="flex items-center gap-1 font-ui text-sm font-medium mt-auto" style={{ color: stat.color }}>
                  View all
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Business at a glance — audience, sales, and catalog in plain numbers.
            Reads /api/admin/metrics (subscribers + purchases tables). */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-1" style={{ color: "#1A1A1A" }}>Business at a glance</h2>
          <p className="font-body text-sm mb-4" style={{ color: "#6B7280" }}>
            The numbers that matter: who is on the list, what has sold, and how much is published.
            Essays finished lives under Traffic below.
          </p>
          {metricsError && (
            <p className="font-body text-sm" style={{ color: "#9B2C2C" }}>
              Couldn&rsquo;t load metrics (needs the production API and an admin session).
            </p>
          )}
          {!metrics && !metricsError && (
            <p className="font-body text-sm" style={{ color: "#6B7280" }}><Loader2 size={16} className="animate-spin inline" /> Loading…</p>
          )}
          {metrics && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {[
                  { label: "Subscribers", value: String(metrics.audience.subscribers), sub: `${metrics.audience.members} members · +${metrics.audience.newThisMonth} in 30d`, color: "#2D4A3E" },
                  { label: "Ebooks sold", value: String(metrics.sales.orders), sub: "paid orders", color: "#B8963E" },
                  { label: "Revenue", value: money(metrics.sales.revenueCents, metrics.sales.currency), sub: "gross, all ebooks", color: "#2C3E50" },
                  { label: "Published", value: String(metrics.catalog.publishedPosts + metrics.catalog.publishedBooks), sub: `${metrics.catalog.publishedPosts} essays · ${metrics.catalog.publishedBooks} books`, color: "#6B4E9E" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF", borderTop: `5px solid ${m.color}`, boxShadow: "0 1px 3px rgba(26,26,26,0.08)" }}>
                    <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>{m.label}</div>
                    <div className="font-display font-bold" style={{ color: m.color, fontSize: "2.4rem", lineHeight: 1 }}>{m.value}</div>
                    <div className="font-ui text-xs mt-2" style={{ color: "#9CA3AF" }}>{m.sub}</div>
                  </div>
                ))}
              </div>
              {metrics.sales.byBook.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "16px 18px" }}>
                    <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Top sellers</div>
                    {metrics.sales.byBook.slice(0, 6).map((b) => (
                      <div key={b.slug} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: "14px" }}>
                        <span style={{ color: "#1A1A1A" }}>{b.title}</span>
                        <span style={{ color: "#6B7280" }}>{b.orders} · {money(b.revenueCents, metrics.sales.currency)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "16px 18px" }}>
                    <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Recent orders</div>
                    {metrics.sales.recent.length === 0 && <div className="font-body text-sm" style={{ color: "#9CA3AF" }}>No orders yet.</div>}
                    {metrics.sales.recent.slice(0, 6).map((r, i) => (
                      <div key={i} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: "13px" }}>
                        <span style={{ color: "#1A1A1A" }}>{r.title}</span>
                        <span style={{ color: "#6B7280" }}>{r.email || "—"} · {new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Traffic — page views and unique visitors, from /api/admin/analytics
            (the page_views table, filled by the site-wide PageTracker beacon). */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-1" style={{ color: "#1A1A1A" }}>Traffic</h2>
          <p className="font-body text-sm mb-4" style={{ color: "#6B7280" }}>
            How many people are visiting, and what they read. Counting begins the moment this ships; your own admin visits are never counted.
          </p>
          {analyticsError && (
            <p className="font-body text-sm" style={{ color: "#9B2C2C" }}>
              Couldn&rsquo;t load traffic (needs the production API and an admin session).
            </p>
          )}
          {!analytics && !analyticsError && (
            <p className="font-body text-sm" style={{ color: "#6B7280" }}><Loader2 size={16} className="animate-spin inline" /> Loading…</p>
          )}
          {analytics && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {[
                  { label: "Visits today", value: analytics.views.today.toLocaleString(), sub: "page views since midnight", color: "#2C3E50" },
                  { label: "Visits · 7 days", value: analytics.views.last7.toLocaleString(), sub: `${analytics.visitors.last7.toLocaleString()} unique visitors`, color: "#2D4A3E" },
                  { label: "Visits · 30 days", value: analytics.views.last30.toLocaleString(), sub: `${analytics.visitors.last30.toLocaleString()} unique visitors`, color: "#B8963E" },
                  { label: "All-time views", value: analytics.views.allTime.toLocaleString(), sub: "since tracking began", color: "#6B4E9E" },
                  ...(analytics.reads ? [{ label: "Essays finished", value: analytics.reads.last30.toLocaleString(), sub: `read to the end · 30d (${analytics.reads.allTime.toLocaleString()} all-time)`, color: "#2D4A3E" }] : []),
                ].map((m) => (
                  <div key={m.label} className="flex flex-col p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF", borderTop: `5px solid ${m.color}`, boxShadow: "0 1px 3px rgba(26,26,26,0.08)" }}>
                    <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>{m.label}</div>
                    <div className="font-display font-bold" style={{ color: m.color, fontSize: "2.4rem", lineHeight: 1 }}>{m.value}</div>
                    <div className="font-ui text-xs mt-2" style={{ color: "#9CA3AF" }}>{m.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Last 14 days — simple CSS bar chart */}
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "16px 18px" }}>
                  <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Last 14 days</div>
                  {analytics.daily.length === 0 ? (
                    <div className="font-body text-sm" style={{ color: "#9CA3AF" }}>No visits recorded yet.</div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "120px" }}>
                      {(() => {
                        const max = Math.max(...analytics.daily.map((d) => d.views), 1);
                        return analytics.daily.map((d) => (
                          <div key={d.date} title={`${d.date}: ${d.views} views`} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                            <div style={{ height: `${Math.max(3, (d.views / max) * 100)}%`, background: "#B8963E", borderRadius: "2px 2px 0 0" }} />
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
                {/* Most-read pages, 30 days */}
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "16px 18px" }}>
                  <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Most-read pages · 30 days</div>
                  {analytics.topPaths.length === 0 ? (
                    <div className="font-body text-sm" style={{ color: "#9CA3AF" }}>No visits recorded yet.</div>
                  ) : (
                    analytics.topPaths.slice(0, 8).map((p) => (
                      <div key={p.path} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: "13px", gap: "12px" }}>
                        <a href={p.path} target="_blank" rel="noreferrer" style={{ color: "#1A1A1A", textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.path}</a>
                        <span style={{ color: "#6B7280", flexShrink: 0 }}>{p.views.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
                {/* Where visitors come from, 30 days */}
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "16px 18px" }}>
                  <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Visitors come from · 30 days</div>
                  {!analytics.referrers || analytics.referrers.length === 0 ? (
                    <div className="font-body text-sm" style={{ color: "#9CA3AF" }}>No outside referrers recorded yet — direct visits and searches with no referrer don&rsquo;t show here.</div>
                  ) : (
                    analytics.referrers.slice(0, 8).map((r) => (
                      <div key={r.host} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: "13px", gap: "12px" }}>
                        <span style={{ color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.host}</span>
                        <span style={{ color: "#6B7280", flexShrink: 0 }}>{r.views.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Where subscribers come from — the conversion side of traffic, from
            /api/admin/signups (subscribers.source split into page + segment). */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-1" style={{ color: "#1A1A1A" }}>Where subscribers come from</h2>
          <p className="font-body text-sm mb-4" style={{ color: "#6B7280" }}>
            Which pages turn readers into subscribers, and who they say they are. Traffic tells you who visits; this tells you what converts.
          </p>
          {signupsError && (
            <p className="font-body text-sm" style={{ color: "#9B2C2C" }}>
              Couldn&rsquo;t load signups (needs the production API and an admin session).
            </p>
          )}
          {!signups && !signupsError && (
            <p className="font-body text-sm" style={{ color: "#6B7280" }}><Loader2 size={16} className="animate-spin inline" /> Loading…</p>
          )}
          {signups && (
            <>
              <div className="grid grid-cols-2 gap-6 mb-6" style={{ maxWidth: 460 }}>
                {[
                  { label: "Total subscribers", value: signups.total.toLocaleString(), sub: "all sources", color: "#2D4A3E" },
                  { label: "New · 30 days", value: signups.last30.toLocaleString(), sub: "added this month", color: "#B8963E" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF", borderTop: `5px solid ${m.color}`, boxShadow: "0 1px 3px rgba(26,26,26,0.08)" }}>
                    <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>{m.label}</div>
                    <div className="font-display font-bold" style={{ color: m.color, fontSize: "2.4rem", lineHeight: 1 }}>{m.value}</div>
                    <div className="font-ui text-xs mt-2" style={{ color: "#9CA3AF" }}>{m.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "16px 18px" }}>
                  <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Top converting pages</div>
                  {signups.byPage.length === 0 ? (
                    <div className="font-body text-sm" style={{ color: "#9CA3AF" }}>No signups recorded yet.</div>
                  ) : (
                    signups.byPage.slice(0, 8).map((p) => (
                      <div key={p.page} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: "13px", gap: "12px" }}>
                        <span style={{ color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.page}</span>
                        <span style={{ color: "#6B7280", flexShrink: 0 }}>{p.signups.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "16px 18px" }}>
                  <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>By audience segment</div>
                  {signups.bySegment.length === 0 ? (
                    <div className="font-body text-sm" style={{ color: "#9CA3AF" }}>No signups recorded yet.</div>
                  ) : (
                    signups.bySegment.map((s) => (
                      <div key={s.segment} className="flex items-center justify-between py-1" style={{ fontFamily: "var(--U)", fontSize: "13px", gap: "12px" }}>
                        <span style={{ color: "#1A1A1A", textTransform: "capitalize" }}>{s.segment}</span>
                        <span style={{ color: "#6B7280", flexShrink: 0 }}>{s.signups.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Contact inbox — messages people sent through /api/contact.
            Until this card existed, nothing anywhere read that table. */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-1" style={{ color: "#1A1A1A" }}>Messages</h2>
          <p className="font-body text-sm mb-4" style={{ color: "#6B7280" }}>
            Contact-form submissions and assessment results people asked to keep on file. Reply by email.
          </p>
          {messagesError && (
            <p className="font-body text-sm" style={{ color: "#9B2C2C" }}>
              Couldn't load messages (this reader needs the production API and an admin session).
            </p>
          )}
          {messages && messages.length === 0 && (
            <p className="font-body text-sm" style={{ color: "#6B7280" }}>No messages yet.</p>
          )}
          {messages && messages.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "420px", overflowY: "auto" }}>
              {messages.slice(0, 20).map((m) => (
                <details key={m.id} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "6px", padding: "12px 16px" }}>
                  <summary style={{ cursor: "pointer", fontFamily: "var(--U)", fontSize: "14px", color: "#1A1A1A" }}>
                    <strong>{m.subject || "(no subject)"}</strong>
                    {" — "}{m.name ? `${m.name} · ` : ""}{m.email}
                    <span style={{ color: "#6B7280" }}>{" · "}{new Date(m.createdAt).toLocaleString()}</span>
                  </summary>
                  <p style={{ whiteSpace: "pre-wrap", fontFamily: "var(--B)", fontSize: "14px", color: "#1A1A1A", margin: "10px 0" }}>{m.message}</p>
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "your message"))}`} style={{ fontFamily: "var(--U)", fontSize: "13px", color: "#1A1A1A", textDecoration: "underline" }}>
                    Reply to {m.email}
                  </a>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Publish & sell — the money page, kept prominent. */}
        <Link
          href="/admin/publish-content"
          className="flex items-center gap-4 p-6 mb-8 rounded-lg no-underline transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: "#1A1A1A", color: "#F5F0E6" }}
        >
          <Upload size={28} style={{ color: "#D4A017" }} />
          <div>
            <div className="font-display text-xl font-bold">Publish &amp; sell</div>
            <div className="font-body text-sm" style={{ color: "rgba(245,240,230,0.75)" }}>
              Turn on ebook checkout, publish the article libraries, and fill articles with their finished long-form versions.
            </div>
          </div>
        </Link>

        {/* Tools — the occasional-use utilities, compact instead of five banners. */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "#1A1A1A" }}>Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/admin/setup-navigation", icon: Wand2, title: "Set up navigation", desc: "File articles into the pillar and sub-pathway menus." },
              { href: "/admin/import-substack", icon: Download, title: "Import from Substack", desc: "Pull your Substack essays in as drafts, filed by category." },
              { href: "/admin/load-drafts", icon: FilePlus2, title: "Load draft essays", desc: "Add flagship essays as hidden drafts to preview and publish." },
              { href: "/admin/deduplicate", icon: Copy, title: "Find duplicates", desc: "Keep the best copy of a repeated title; nothing is deleted." },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="flex items-start gap-3 p-4 rounded-lg no-underline transition-transform hover:scale-[1.01]"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}
                >
                  <Icon size={20} style={{ color: "#D4A017", flexShrink: 0, marginTop: 2 }} />
                  <div style={{ minWidth: 0 }}>
                    <div className="font-ui font-semibold text-sm" style={{ color: "#1A1A1A" }}>{t.title}</div>
                    <div className="font-body text-xs mt-0.5" style={{ color: "#5A5448", lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Seed Content */}
        <div className="mb-12 p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
            <div style={{ minWidth: 0, flex: "1 1 260px" }}>
              <h2 className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>
                Import Content
              </h2>
              <p className="font-body text-sm" style={{ color: "#6B7280" }}>
                Load all bundled articles, books, and site settings. Exact counts are shown before you confirm. Duplicates are skipped.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSeedContent}
                disabled={seeding}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-ui font-semibold text-sm transition-colors"
                style={{ backgroundColor: seeding ? "#9CA3AF" : "#2D4A3E", color: "#F7F5F0", cursor: seeding ? "default" : "pointer" }}
              >
                {seeding ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {seeding ? "Importing…" : "Import All Content"}
              </button>
              <button
                onClick={async () => {
                  setSeedStatus("Organizing articles into pillars…");
                  try {
                    const r = await fetch("/api/admin/organize-articles", { credentials: "include" });
                    const d = await r.json();
                    if (d.ok) {
                      setSeedStatus(`Organized! ${d.updated} articles updated. Distribution: ${d.distribution?.map((x: any) => `${x.pillar}: ${x.n}`).join(", ")}`);
                      postsQuery.refetch();
                    } else { setSeedStatus(`Error: ${d.error}`); }
                  } catch (e: any) { setSeedStatus(`Failed: ${e.message}`); }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-ui font-semibold text-sm transition-colors"
                style={{ backgroundColor: "var(--charcoal)", color: "var(--bone)", cursor: "pointer" }}
              >
                Organize into Pillars
              </button>
            </div>
          </div>
          {seedStatus && (
            <div className="mt-3 p-3 rounded text-sm font-ui" style={{
              backgroundColor: seedStatus.startsWith("Done") ? "#D1FAE5" : seedStatus.startsWith("Error") || seedStatus.startsWith("Failed") ? "#FEE2E2" : "#F3F4F6",
              color: seedStatus.startsWith("Done") ? "#065F46" : seedStatus.startsWith("Error") || seedStatus.startsWith("Failed") ? "#991B1B" : "#374151",
            }}>
              {seedStatus}
            </div>
          )}
        </div>

        {/* Repair apostrophes */}
        <div className="mb-12 p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>
                Repair Apostrophes
              </h2>
              <p className="font-body text-sm" style={{ color: "#6B7280" }}>
                Fix imported text that lost its apostrophes (Gods, churchs, dont, youre). Checks every post and book, fixes only what needs it, never touches URLs.
              </p>
            </div>
            <button
              onClick={handleFixApostrophes}
              disabled={fixing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-ui font-semibold text-sm transition-colors"
              style={{ backgroundColor: fixing ? "#9CA3AF" : "#1A1A1A", color: "#F7F5F0", cursor: fixing ? "default" : "pointer" }}
            >
              {fixing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
              {fixing ? "Repairing…" : "Repair Text"}
            </button>
          </div>
          {fixStatus && (
            <div className="mt-3 p-3 rounded text-sm font-ui" style={{
              backgroundColor: fixStatus.startsWith("Done") ? "#D1FAE5" : fixStatus.startsWith("Error") || fixStatus.startsWith("Failed") ? "#FEE2E2" : "#F3F4F6",
              color: fixStatus.startsWith("Done") ? "#065F46" : fixStatus.startsWith("Error") || fixStatus.startsWith("Failed") ? "#991B1B" : "#374151",
            }}>
              {fixStatus}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/posts/new" className="p-4 rounded-lg font-ui font-medium no-underline transition-colors" style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}>
              + New Writing Post
            </Link>
            <Link href="/admin/resources/new" className="p-4 rounded-lg font-ui font-medium no-underline transition-colors" style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}>
              + New Resource
            </Link>
            <Link href="/admin/books/new" className="p-4 rounded-lg font-ui font-medium no-underline transition-colors" style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}>
              + New Book
            </Link>
            <Link href="/admin/settings" className="p-4 rounded-lg font-ui font-medium no-underline transition-colors" style={{ backgroundColor: "#2C3E50", color: "#F7F5F0" }}>
              Site Settings
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
