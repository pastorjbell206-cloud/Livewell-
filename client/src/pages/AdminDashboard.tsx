import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { PenLine, FolderOpen, BookOpen, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import contentData from "@/data/content-data.json";

export default function AdminDashboard() {
  const postsQuery = trpc.posts.listAll.useQuery();
  const resourcesQuery = trpc.resources.listAll.useQuery();
  const booksQuery = trpc.books.listAll.useQuery();
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

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

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          Dashboard
        </h1>
        <p className="font-body text-lg mb-8" style={{ color: "#6B7280" }}>
          Welcome to the Livewell admin panel. Manage your content below.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isLoading = postsQuery.isLoading || resourcesQuery.isLoading || booksQuery.isLoading;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="p-6 rounded-lg no-underline transition-transform hover:scale-105"
                style={{ backgroundColor: "#FFFFFF", borderLeft: `4px solid ${stat.color}` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-ui text-xs uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>
                      {stat.label}
                    </div>
                    <div className="font-display text-4xl font-bold" style={{ color: stat.color }}>
                      {isLoading ? <Loader2 size={24} className="animate-spin" /> : stat.value}
                    </div>
                  </div>
                  <Icon size={28} style={{ color: stat.color, opacity: 0.3 }} />
                </div>
              </Link>
            );
          })}
        </div>

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
