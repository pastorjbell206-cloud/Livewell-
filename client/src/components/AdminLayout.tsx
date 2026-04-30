import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  LayoutDashboard,
  PenLine,
  BookOpen,
  FolderOpen,
  FileText,
  Settings,
  ArrowLeft,
  LogOut,
  RefreshCw,
  Bell,
  MessageSquare,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Writing", icon: PenLine },
  { href: "/admin/resources", label: "Resources", icon: FolderOpen },
  { href: "/admin/books", label: "Books", icon: BookOpen },
  { href: "/admin/about", label: "About Page", icon: FileText },
  { href: "/admin/moderation", label: "Moderation", icon: MessageSquare },
  { href: "/admin/sync", label: "Content Sync", icon: RefreshCw },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F7F5F0" }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col"
        style={{ backgroundColor: "#1A1A1A", minHeight: "100vh" }}
      >
        {/* Brand */}
        <div className="p-6 pb-4">
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <span className="font-display text-xl font-black tracking-tight" style={{ color: "#F7F5F0" }}>
              livewell
            </span>
          </Link>
          <div className="mt-2 font-ui text-[10px] uppercase tracking-[0.15em]" style={{ color: "#B8963E" }}>
            Admin Dashboard
          </div>
        </div>

        <div className="w-full h-px" style={{ backgroundColor: "#2C3E50" }} />

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3">
          {ADMIN_NAV.map((item) => {
            const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 mb-1 rounded-sm font-ui text-sm no-underline transition-all duration-150"
                style={{
                  color: isActive ? "#F7F5F0" : "#6B7280",
                  backgroundColor: isActive ? "#2C3E50" : "transparent",
                }}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4" style={{ borderTop: "1px solid #2C3E50" }}>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 mb-2 font-ui text-xs no-underline transition-colors"
            style={{ color: "#6B7280" }}
          >
            <ArrowLeft size={14} /> Back to Site
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-3 py-2 w-full font-ui text-xs transition-colors text-left"
            style={{ color: "#6B7280" }}
          >
            <LogOut size={14} /> Sign Out
          </button>
          <div className="mt-3 px-3 font-ui text-[10px]" style={{ color: "#6B7280" }}>
            {user?.name || user?.email || "Admin"}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
