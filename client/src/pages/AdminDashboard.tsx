import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { PenLine, FolderOpen, BookOpen, Loader2, Upload, Wand2, Copy, FilePlus2, Download, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import contentData from "@/data/content-data.json";

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
  useEffect(() => {
    let active = true;
    fetch("/api/admin/contact-messages", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && setMessages(Array.isArray(d?.messages) ? d.messages : []))
      .catch(() => active && setMessagesError(true));
    return () => { active = false; };
  }, []);

  const stats = [
    { label: "Writing Posts", value: postsQuery.data?.length ?? 0, icon: PenLine, href: "/admin/posts", color: "#2C3E50" },
    { label: "Resources", value: resourcesQuery.data?.length ?? 0, icon: FolderOpen, href: "/admin/resources", color: "#2D4A3E" },
    { label: "Books", value: booksQuery.data?.length ?? 0, icon: BookOpen, href: "/admin/books", color: "#B8963E" },
  ];

  const handleSeedContent = async () => {
    if (!confirm(`This will import ${contentData.posts.length} articles and ${contentData.books.length} books. Duplicates will be skipped. Continue?`)) return;
    setSeeding(true);
    setSeedStatus("Seeding content...");
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
    if (!confirm("Repair missing apostrophes (Gods, churchs, dont, ...) across all posts and books? Slugs and URLs are never changed, and it is safe to run more than once.")) return;
    setFixing(true);
    setFixStatus("Repairing text...");
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

        {/* Publish finished article content */}
        <Link
          href="/admin/publish-content"
          className="flex items-center gap-4 p-6 mb-8 rounded-lg no-underline transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: "#1A1A1A", color: "#F5F0E6" }}
        >
          <Upload size={28} style={{ color: "#D4A017" }} />
          <div>
            <div className="font-display text-xl font-bold">Publish article content</div>
            <div className="font-body text-sm" style={{ color: "rgba(245,240,230,0.75)" }}>
              Fill your empty and short articles with their finished long-form versions. Safe test first, then publish.
            </div>
          </div>
        </Link>

        {/* Set up the two-level navigation */}
        <Link
          href="/admin/setup-navigation"
          className="flex items-center gap-4 p-6 mb-8 rounded-lg no-underline transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}
        >
          <Wand2 size={28} style={{ color: "#D4A017" }} />
          <div>
            <div className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>Set up navigation</div>
            <div className="font-body text-sm" style={{ color: "#5A5448" }}>
              Organize articles into the new pillar and sub-pathway menus, plus Study Guides &amp; Series. Safe to run anytime.
            </div>
          </div>
        </Link>

        {/* Import from Substack */}
        <Link
          href="/admin/import-substack"
          className="flex items-center gap-4 p-6 mb-8 rounded-lg no-underline transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}
        >
          <Download size={28} style={{ color: "#D4A017" }} />
          <div>
            <div className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>Import from Substack</div>
            <div className="font-body text-sm" style={{ color: "#5A5448" }}>
              Pull your Substack essays in as drafts, pre-filed by category. Standalone in full; the serial as teasers.
            </div>
          </div>
        </Link>

        {/* Load draft essays */}
        <Link
          href="/admin/load-drafts"
          className="flex items-center gap-4 p-6 mb-8 rounded-lg no-underline transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}
        >
          <FilePlus2 size={28} style={{ color: "#D4A017" }} />
          <div>
            <div className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>Load draft essays</div>
            <div className="font-body text-sm" style={{ color: "#5A5448" }}>
              Add the new flagship essays for your thinner pillars as hidden drafts. Preview, edit, then publish when ready.
            </div>
          </div>
        </Link>

        {/* Find duplicate articles */}
        <Link
          href="/admin/deduplicate"
          className="flex items-center gap-4 p-6 mb-8 rounded-lg no-underline transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1C9BB" }}
        >
          <Copy size={28} style={{ color: "#D4A017" }} />
          <div>
            <div className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>Find duplicate articles</div>
            <div className="font-body text-sm" style={{ color: "#5A5448" }}>
              See every repeated title, keep the best copy, and retire the rest. Reversible &mdash; nothing is deleted.
            </div>
          </div>
        </Link>

        {/* Seed Content */}
        <div className="mb-12 p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>
                Import Content
              </h2>
              <p className="font-body text-sm" style={{ color: "#6B7280" }}>
                Load {contentData.posts.length} articles, {contentData.books.length} books, and site settings. Duplicates are skipped.
              </p>
            </div>
            <button
              onClick={handleSeedContent}
              disabled={seeding}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-ui font-semibold text-sm transition-colors"
              style={{ backgroundColor: seeding ? "#9CA3AF" : "#2D4A3E", color: "#F7F5F0", cursor: seeding ? "default" : "pointer" }}
            >
              {seeding ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {seeding ? "Importing..." : "Import All Content"}
            </button>
            <button
              onClick={async () => {
                setSeedStatus("Organizing articles into pillars...");
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
              {fixing ? "Repairing..." : "Repair Text"}
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
