import { Link, useLocation } from "wouter";
import { useState } from "react";
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
  Users,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
} from "lucide-react";

/** Grouped navigation: Content, then Engagement, then System. */
const NAV_GROUPS: { group: string; items: { href: string; label: string; icon: typeof LayoutDashboard }[] }[] = [
  {
    group: "Content",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/posts", label: "Writing", icon: PenLine },
      { href: "/admin/resources", label: "Resources", icon: FolderOpen },
      { href: "/admin/books", label: "Books", icon: BookOpen },
      { href: "/admin/about", label: "About Page", icon: FileText },
    ],
  },
  {
    group: "Engagement",
    items: [
      { href: "/admin/moderation", label: "Moderation", icon: MessageSquare },
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
      { href: "/admin/subscribers", label: "Subscribers", icon: Users },
    ],
  },
  {
    group: "System",
    items: [
      { href: "/admin/sync", label: "Content Sync", icon: RefreshCw },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

/** Resolve the breadcrumb trail for the current path. */
function crumbsFor(location: string): { label: string; href?: string }[] {
  if (location === "/admin") return [{ label: "Dashboard" }];
  // Longest matching nav item wins (so /admin/posts/new resolves to Writing).
  const match = ALL_ITEMS
    .filter((i) => i.href !== "/admin" && location.startsWith(i.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  const trail: { label: string; href?: string }[] = [{ label: "Dashboard", href: "/admin" }];
  if (match) {
    const isLeaf = location === match.href;
    trail.push(isLeaf ? { label: match.label } : { label: match.label, href: match.href });
    if (!isLeaf) {
      const tail = location.slice(match.href.length).replace(/^\//, "");
      if (tail) trail.push({ label: tail.split("/")[0] === "new" ? "New" : "Edit" });
    }
  }
  return trail;
}

const COLLAPSE_KEY = "lw-admin-sidebar-collapsed";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem(COLLAPSE_KEY) === "1"; } catch { return false; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c;
      try { localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0"); } catch { /* ignore */ }
      return next;
    });
  };

  const crumbs = crumbsFor(location);
  const railWidth = collapsed ? 72 : 256;

  const renderNav = (onNavigate?: () => void) => (
    <>
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-2 no-underline group" onClick={onNavigate}>
          <span className="font-display text-xl font-black tracking-tight" style={{ color: "#F7F5F0" }}>
            {collapsed && !onNavigate ? "lw" : "livewell"}
          </span>
        </Link>
        {(!collapsed || onNavigate) && (
          <div className="mt-2 font-ui text-[10px] uppercase tracking-[0.15em]" style={{ color: "#B8963E" }}>
            Admin Dashboard
          </div>
        )}
      </div>

      <div className="w-full h-px" style={{ backgroundColor: "#2C3E50" }} />

      <nav className="flex-1 py-4 px-3 overflow-y-auto" aria-label="Admin">
        {NAV_GROUPS.map((grp) => (
          <div key={grp.group} className="mb-4">
            {(!collapsed || onNavigate) && (
              <div className="px-3 mb-1 font-ui text-[10px] uppercase tracking-[0.18em]" style={{ color: "#5A6B7B" }}>
                {grp.group}
              </div>
            )}
            {grp.items.map((item) => {
              const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed && !onNavigate ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className="flex items-center gap-3 px-3 mb-1 rounded-sm font-ui text-sm no-underline transition-all duration-150"
                  style={{
                    color: isActive ? "#F7F5F0" : "#9AA7B4",
                    backgroundColor: isActive ? "#2C3E50" : "transparent",
                    borderLeft: isActive ? "2px solid #B8963E" : "2px solid transparent",
                    minHeight: 44,
                    justifyContent: collapsed && !onNavigate ? "center" : "flex-start",
                  }}
                >
                  <Icon size={17} style={{ flexShrink: 0 }} />
                  {(!collapsed || onNavigate) && item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3" style={{ borderTop: "1px solid #2C3E50" }}>
        <Link
          href="/"
          onClick={onNavigate}
          title={collapsed && !onNavigate ? "Back to Site" : undefined}
          className="flex items-center gap-2 px-3 font-ui text-xs no-underline transition-colors"
          style={{ color: "#9AA7B4", minHeight: 40, justifyContent: collapsed && !onNavigate ? "center" : "flex-start" }}
        >
          <ArrowLeft size={15} style={{ flexShrink: 0 }} /> {(!collapsed || onNavigate) && "Back to Site"}
        </Link>
        <button
          onClick={() => logout()}
          title={collapsed && !onNavigate ? "Sign Out" : undefined}
          className="flex items-center gap-2 px-3 w-full font-ui text-xs transition-colors text-left"
          style={{ color: "#9AA7B4", background: "none", border: "none", cursor: "pointer", minHeight: 40, justifyContent: collapsed && !onNavigate ? "center" : "flex-start" }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} /> {(!collapsed || onNavigate) && "Sign Out"}
        </button>
        {(!collapsed || onNavigate) && (
          <div className="mt-3 px-3 font-ui text-[10px] truncate" style={{ color: "#5A6B7B" }}>
            {user?.name || user?.email || "Admin"}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="admin-scope min-h-screen flex" style={{ backgroundColor: "#F7F5F0" }}>
      {/* Desktop sidebar */}
      <aside
        className="flex-shrink-0 flex-col"
        style={{ width: railWidth, backgroundColor: "#1A1A1A", minHeight: "100vh", display: "none", position: "sticky", top: 0, height: "100vh", transition: "width 0.18s ease" }}
        data-admin-rail
      >
        {renderNav()}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div data-admin-drawer style={{ position: "fixed", inset: 0, zIndex: 60 }}>
          <div onClick={() => setMobileOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <aside className="flex flex-col" style={{ position: "relative", width: 264, height: "100%", backgroundColor: "#1A1A1A" }}>
            {renderNav(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar: collapse toggle (desktop) / menu (mobile) + breadcrumbs */}
        <header
          className="flex items-center gap-3 px-4"
          style={{ minHeight: 56, borderBottom: "1px solid #E5E1D8", background: "#FFFFFF", position: "sticky", top: 0, zIndex: 30 }}
        >
          <button
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="items-center justify-center"
            style={{ display: "none", width: 40, height: 40, border: "none", background: "none", cursor: "pointer", color: "#5A6B7B" }}
            data-admin-collapse
          >
            {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="items-center justify-center"
            style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", color: "#1A1A1A" }}
            data-admin-burger
          >
            <PanelLeft size={22} />
          </button>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-ui text-sm min-w-0">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && <ChevronRight size={14} style={{ color: "#B8B2A4", flexShrink: 0 }} />}
                {c.href ? (
                  <Link href={c.href} style={{ color: "#6B7280", textDecoration: "none", whiteSpace: "nowrap" }}>{c.label}</Link>
                ) : (
                  <span style={{ color: "#1A1A1A", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 max-w-5xl">
            {children}
          </div>
        </main>
      </div>

      <style>{
        "@media (min-width: 768px){[data-admin-rail]{display:flex !important}[data-admin-collapse]{display:flex !important}[data-admin-burger]{display:none !important}}" +
        "@media (max-width: 767px){[data-admin-rail]{display:none !important}[data-admin-burger]{display:flex !important}}"
      }</style>
    </div>
  );
}
