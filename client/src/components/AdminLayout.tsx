/**
 * AdminLayout — the admin shell: fixed charcoal rail, reserved content margin.
 *
 * Geometry is deliberately boring and unbreakable: the rail is position:fixed
 * and the content column reserves exactly its width with margin-left, both
 * driven by ONE css variable (--rail-w) set inline from state. No sticky-in-
 * flex (Safari mispaints it — the old shell's rail could overlap the page),
 * and no Tailwind utility classes anywhere in the shell, so no external CSS
 * can move these boxes. Breakpoint switching uses the data-attribute style
 * tag below; everything else is inline.
 *
 * Palette is the brand's, not a generic dashboard blue: charcoal rail, cream
 * workspace, mustard as punctuation (active bar, kicker), warm grays.
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowUpRight, LogOut, PanelLeftClose, PanelLeft, ChevronRight } from "lucide-react";
import { ADMIN_NAV } from "@/components/admin/nav";

const ALL_ITEMS = ADMIN_NAV.flatMap((g) => g.items);

// The shell's own palette (admin is a light workspace; see docs/ADMIN.md).
const RAIL_BG = "var(--charcoal)";
const RAIL_LINE = "rgba(245,240,230,0.10)";
const RAIL_TEXT = "var(--adm-taupe-soft)";
const RAIL_TEXT_ACTIVE = "var(--bone)";
const RAIL_LABEL = "var(--adm-taupe-deep)";
const MUSTARD = "var(--mustard)";
const PAPER = "var(--adm-bg)";
const HAIRLINE = "var(--adm-line-soft)";
const INK = "var(--charcoal)";
const MUTED = "var(--adm-gray)";

/** Resolve the breadcrumb trail for the current path. */
function crumbsFor(location: string): { label: string; href?: string }[] {
  if (location === "/admin") return [{ label: "Dashboard" }];
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
const F = "var(--F, 'Cormorant Garamond', Georgia, serif)";
const U = "var(--U, Inter, system-ui, sans-serif)";

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
  const railWidth = collapsed ? 72 : 260;
  const slim = (drawer: boolean) => collapsed && !drawer;

  const navBody = (drawer: boolean, onNavigate?: () => void) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      {/* Brand */}
      <div style={{ padding: slim(drawer) ? "22px 0 14px" : "22px 22px 14px", textAlign: slim(drawer) ? "center" : "left" }}>
        <Link href="/" onClick={onNavigate} style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: F, fontSize: slim(drawer) ? 20 : 24, fontWeight: 500, letterSpacing: "-0.02em", color: RAIL_TEXT_ACTIVE }}>
            {slim(drawer) ? "lw" : "livewell"}
          </span>
        </Link>
        {!slim(drawer) && (
          <div style={{ marginTop: 4, fontFamily: U, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: MUSTARD }}>
            Admin
          </div>
        )}
      </div>

      <div style={{ height: 1, background: RAIL_LINE, margin: slim(drawer) ? "0 12px" : "0 22px" }} />

      {/* Sections. The explicit display/height/margin/maxWidth here override
          the site's global `nav{display:flex;height:70px;max-width:1200px}`
          masthead rule, which otherwise flows these groups horizontally out
          of the rail and across the page. */}
      <nav
        aria-label="Admin"
        style={{
          display: "block",
          height: "auto",
          maxWidth: "none",
          margin: 0,
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "14px 12px 14px",
        }}
      >
        {ADMIN_NAV.map((grp) => (
          <div key={grp.group} style={{ marginBottom: 18 }}>
            {!slim(drawer) && (
              <div style={{ padding: "0 12px", marginBottom: 6, fontFamily: U, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: RAIL_LABEL }}>
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
                  title={slim(drawer) ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  data-admin-navlink
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    justifyContent: slim(drawer) ? "center" : "flex-start",
                    minHeight: 40,
                    padding: slim(drawer) ? "0" : "0 12px",
                    marginBottom: 2,
                    borderRadius: 6,
                    fontFamily: U,
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    color: isActive ? RAIL_TEXT_ACTIVE : RAIL_TEXT,
                    background: isActive ? "rgba(212,160,23,0.13)" : "transparent",
                    boxShadow: isActive ? `inset 2.5px 0 0 ${MUSTARD}` : "none",
                    transition: "background 0.14s, color 0.14s",
                  }}
                >
                  <Icon size={16} style={{ flexShrink: 0, color: isActive ? MUSTARD : "currentColor" }} />
                  {!slim(drawer) && <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Foot */}
      <div style={{ borderTop: `1px solid ${RAIL_LINE}`, padding: "10px 12px 14px" }}>
        <Link
          href="/"
          onClick={onNavigate}
          title={slim(drawer) ? "View the live site" : undefined}
          style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: slim(drawer) ? "center" : "flex-start", minHeight: 36, padding: slim(drawer) ? 0 : "0 12px", fontFamily: U, fontSize: 12.5, color: RAIL_TEXT, textDecoration: "none" }}
        >
          <ArrowUpRight size={15} style={{ flexShrink: 0 }} /> {!slim(drawer) && "View the live site"}
        </Link>
        <button
          onClick={() => logout()}
          title={slim(drawer) ? "Sign out" : undefined}
          style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: slim(drawer) ? "center" : "flex-start", minHeight: 36, padding: slim(drawer) ? 0 : "0 12px", width: "100%", fontFamily: U, fontSize: 12.5, color: RAIL_TEXT, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} /> {!slim(drawer) && "Sign out"}
        </button>
        {!slim(drawer) && (
          <div style={{ marginTop: 8, padding: "0 12px", fontFamily: U, fontSize: 10.5, color: RAIL_LABEL, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.name || user?.email || "Admin"}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="admin-scope" style={{ ["--rail-w" as string]: `${railWidth}px`, minHeight: "100vh", background: PAPER }}>
      {/* Fixed rail (desktop). Out of flow by design; the content column
          reserves its exact width below, so overlap is impossible. */}
      <aside
        data-admin-rail
        aria-label="Admin sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "var(--rail-w)",
          background: RAIL_BG,
          borderRight: `1px solid ${RAIL_LINE}`,
          zIndex: 40,
          display: "none",
          overflow: "hidden",
          transition: "width 0.16s ease",
        }}
      >
        {navBody(false)}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
          <div onClick={() => setMobileOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
          <aside aria-label="Admin sidebar" style={{ position: "relative", width: 272, maxWidth: "85vw", height: "100%", background: RAIL_BG, boxShadow: "8px 0 30px rgba(0,0,0,0.35)" }}>
            {navBody(true, () => setMobileOpen(false))}
          </aside>
        </div>
      )}

      {/* Content column — reserves the rail's width on desktop via the same
          --rail-w variable, so rail and margin can never disagree. */}
      <div data-admin-content style={{ marginLeft: 0, minWidth: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 18px",
            minHeight: 56,
            background: "var(--card)",
            borderBottom: `1px solid ${HAIRLINE}`,
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            data-admin-collapse
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{ display: "none", alignItems: "center", justifyContent: "center", width: 38, height: 38, border: "none", background: "none", cursor: "pointer", color: MUTED, borderRadius: 6 }}
          >
            {collapsed ? <PanelLeft size={19} /> : <PanelLeftClose size={19} />}
          </button>
          <button
            data-admin-burger
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, border: "none", background: "none", cursor: "pointer", color: INK }}
          >
            <PanelLeft size={21} />
          </button>

          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 7, height: "auto", maxWidth: "none", margin: 0, padding: 0, minWidth: 0, fontFamily: U, fontSize: 13.5 }}>
            {crumbs.map((c, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                {i > 0 && <ChevronRight size={13} style={{ color: "var(--adm-taupe-faint)", flexShrink: 0 }} />}
                {c.href ? (
                  <Link href={c.href} style={{ color: MUTED, textDecoration: "none", whiteSpace: "nowrap" }}>{c.label}</Link>
                ) : (
                  <span style={{ color: INK, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            data-admin-viewsite
            style={{ display: "none", alignItems: "center", gap: 6, fontFamily: U, fontSize: 12.5, fontWeight: 600, color: INK, textDecoration: "none", border: `1px solid ${HAIRLINE}`, borderRadius: 6, padding: "7px 12px", whiteSpace: "nowrap" }}
          >
            View site <ArrowUpRight size={13} style={{ color: MUSTARD }} />
          </a>
        </header>

        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ padding: "clamp(16px, 3vw, 32px)", maxWidth: 1080 }}>
            {children}
          </div>
        </main>
      </div>

      <style>{
        "@media (min-width: 768px){" +
          "[data-admin-rail]{display:block !important}" +
          "[data-admin-content]{margin-left:var(--rail-w) !important}" +
          "[data-admin-collapse]{display:flex !important}" +
          "[data-admin-burger]{display:none !important}" +
          "[data-admin-viewsite]{display:inline-flex !important}" +
        "}" +
        "[data-admin-navlink]:hover{background:rgba(245,240,230,0.06)}"
      }</style>
    </div>
  );
}
