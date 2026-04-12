import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { PenLine, FolderOpen, BookOpen, FileText, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const postsQuery = trpc.posts.listAll.useQuery();
  const resourcesQuery = trpc.resources.listAll.useQuery();
  const booksQuery = trpc.books.listAll.useQuery();

  const stats = [
    {
      label: "Writing Posts",
      value: postsQuery.data?.length ?? 0,
      icon: PenLine,
      href: "/admin/posts",
      color: "#2C3E50",
    },
    {
      label: "Resources",
      value: resourcesQuery.data?.length ?? 0,
      icon: FolderOpen,
      href: "/admin/resources",
      color: "#2D4A3E",
    },
    {
      label: "Books",
      value: booksQuery.data?.length ?? 0,
      icon: BookOpen,
      href: "/admin/books",
      color: "#B8963E",
    },
  ];

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

        {/* Quick Actions */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/posts/new"
              className="p-4 rounded-lg font-ui font-medium no-underline transition-colors"
              style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
            >
              + New Writing Post
            </Link>
            <Link
              href="/admin/resources/new"
              className="p-4 rounded-lg font-ui font-medium no-underline transition-colors"
              style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
            >
              + New Resource
            </Link>
            <Link
              href="/admin/books/new"
              className="p-4 rounded-lg font-ui font-medium no-underline transition-colors"
              style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
            >
              + New Book
            </Link>
            <Link
              href="/admin/settings"
              className="p-4 rounded-lg font-ui font-medium no-underline transition-colors"
              style={{ backgroundColor: "#2C3E50", color: "#F7F5F0" }}
            >
              ⚙️ Site Settings
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
