/**
 * The admin section registry — the single source of truth for the sidebar.
 *
 * Adding a future admin section is a two-line change:
 *   1. add its entry to the right group below;
 *   2. add its <Route> in client/src/App.tsx (wrapped in ProtectedRoute).
 * The sidebar, active states, and breadcrumbs all read from this registry.
 * See docs/ADMIN.md for the full pattern.
 */
import {
  LayoutDashboard,
  PenLine,
  BookOpen,
  FolderOpen,
  FileText,
  Settings,
  RefreshCw,
  Bell,
  MessageSquare,
  Users,
  Rocket,
  DownloadCloud,
  FilePlus2,
  Copy,
  Map,
  CreditCard,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export interface AdminNavGroup {
  group: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavGroup[] = [
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
    group: "Commerce",
    items: [
      { href: "/admin/commerce", label: "Ebook Sales", icon: CreditCard },
      { href: "/admin/publish-content", label: "Publish & Sell", icon: Rocket },
    ],
  },
  {
    group: "Audience",
    items: [
      { href: "/admin/subscribers", label: "Subscribers", icon: Users },
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
      { href: "/admin/moderation", label: "Moderation", icon: MessageSquare },
    ],
  },
  {
    group: "Publishing",
    items: [
      { href: "/admin/sync", label: "Content Sync", icon: RefreshCw },
      { href: "/admin/import-substack", label: "Import from Substack", icon: DownloadCloud },
      { href: "/admin/load-drafts", label: "Load Drafts", icon: FilePlus2 },
    ],
  },
  {
    group: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
      { href: "/admin/setup-navigation", label: "Navigation Setup", icon: Map },
      { href: "/admin/deduplicate", label: "Deduplicate", icon: Copy },
    ],
  },
];
