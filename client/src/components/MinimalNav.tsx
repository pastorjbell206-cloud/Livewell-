/**
 * Primary navigation. The header mirrors the footer: the same five grouped
 * columns (The Pillars / Write & Read / Libraries & Tools / For Pastors /
 * Connect), rendered as dropdown menus, with one source of truth in
 * lib/siteNav.ts so the two surfaces never drift. Utility actions — Find Help,
 * search, Subscribe — sit to the right. The menu is static (no API round trip),
 * so it paints in full on first render.
 */
import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { SITE_NAV_GROUPS, TABLE_NAV, headerLinks, type SiteNavLink } from "@/lib/siteNav";
import { PILLAR_ORDER, pillarListingUrl } from "@/lib/subPathways";

/** A grouped link renders as an external anchor or an internal wouter Link. */
function NavItemLink({
  link,
  onNavigate,
  style,
}: {
  link: SiteNavLink;
  onNavigate: () => void;
  style: React.CSSProperties;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        onClick={onNavigate}
        style={style}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate} style={style}>
      {link.label}
    </Link>
  );
}

export default function MinimalNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = "/search?q=" + encodeURIComponent(searchQuery.trim());
    }
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile menu hygiene: close on any route change.
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setSearchOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.98)",
            zIndex: 500,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "120px",
          }}
          onClick={e => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div style={{ width: "100%", maxWidth: "680px", padding: "0 32px" }}>
            <p
              style={{
                fontFamily: "var(--U)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,240,230,0.45)",
                marginBottom: "16px",
              }}
            >
              Search the writing
            </p>
            <form onSubmit={handleSearch}>
              <label
                htmlFor="nav-search-input"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                  clip: "rect(0,0,0,0)",
                }}
              >
                Search essays and books
              </label>
              <input
                id="nav-search-input"
                autoFocus
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid var(--mustard)",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  color: "var(--bone)",
                  outline: "none",
                  padding: "8px 0 16px",
                  caretColor: "var(--mustard)",
                  fontFamily: "var(--F)",
                }}
              />
            </form>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "24px",
                flexWrap: "wrap",
              }}
            >
              {PILLAR_ORDER.map(pillar => (
                <Link
                  key={pillar}
                  href={pillarListingUrl(pillar)}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "12px",
                    border: "1px solid rgba(245,240,230,0.2)",
                    color: "rgba(245,240,230,0.6)",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    textDecoration: "none",
                  }}
                >
                  {pillar}
                </Link>
              ))}
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              style={{
                position: "fixed",
                top: "32px",
                right: "40px",
                color: "rgba(245,240,230,0.45)",
                fontSize: "30px",
                background: "none",
                border: "none",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          background: "rgba(245,240,230,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          width: "100%",
          // The universal box-sizing reset is stripped by the CSS build, so
          // this nav defaulted to content-box: width:100% + its 16px padding
          // pushed 32px past a phone viewport (horizontal scroll on every page).
          // Pinned border-box here so 100% includes the padding.
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  lineHeight: 1,
                  paddingBottom: "4px",
                  borderBottom: "2px solid var(--mustard)",
                }}
              >
                LiveWell
              </div>
              <div
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "11px",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                  fontWeight: 500,
                }}
              >
                by James Bell
              </div>
            </div>
          </Link>

          <div
            ref={dropdownRef}
            style={{ display: "flex", gap: "2px", alignItems: "center" }}
            className="desktop-nav"
          >
            {SITE_NAV_GROUPS.map(group => (
              <div key={group.title} style={{ display: "contents" }}>
              <div
                style={{ position: "relative" }}
                onMouseLeave={() => openDropdown === group.title && setOpenDropdown(null)}
              >
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === group.title ? null : group.title)
                  }
                  onMouseEnter={() => setOpenDropdown(group.title)}
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === group.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color:
                      openDropdown === group.title
                        ? "var(--mustard-text)"
                        : "var(--ink)",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-sm)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {group.title}
                  <ChevronDown
                    size={14}
                    style={{
                      opacity: 0.6,
                      transform:
                        openDropdown === group.title ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                {openDropdown === group.title && (
                  <div
                    role="menu"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderTop: "2px solid var(--mustard)",
                      borderRadius: "var(--radius-sm)",
                      padding: "8px",
                      minWidth: "260px",
                      maxHeight: "min(70vh, 560px)",
                      overflowY: "auto",
                      boxShadow: "var(--shadow-modal)",
                      marginTop: "4px",
                      zIndex: 300,
                    }}
                  >
                    {headerLinks(group).map(item => (
                      <div
                        key={item.href + item.label}
                        role="menuitem"
                        style={{
                          borderRadius: "var(--radius-sm)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--bone-warm)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <NavItemLink
                          link={item}
                          onNavigate={() => setOpenDropdown(null)}
                          style={{
                            textDecoration: "none",
                            display: "block",
                            padding: "10px 14px",
                            fontFamily: "var(--U)",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "var(--ink)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* The Table sits at the top level, right after the tools group,
                  so "disciple someone" is one glance away — never buried. */}
              {group.title === "Libraries & Tools" && (
                <Link
                  href={TABLE_NAV.href}
                  style={{
                    color: isActive(TABLE_NAV.href) ? "var(--mustard-text)" : "var(--ink)",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "8px 12px",
                    borderBottom: "2px solid var(--mustard)",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  {TABLE_NAV.label}
                </Link>
              )}
              </div>
            ))}

            <Link
              href="/help"
              style={{
                color: "var(--mustard-text)",
                fontFamily: "var(--U)",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 12px",
                whiteSpace: "nowrap",
              }}
            >
              Find Help
            </Link>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search essays and books"
              title="Search"
              style={{
                background: "none",
                border: "none",
                color: "var(--ink)",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                marginLeft: "4px",
                borderRadius: "var(--radius-sm)",
                transition: "color 0.2s, background 0.2s",
              }}
            >
              <Search size={18} aria-hidden />
            </button>

            <Link href="/subscribe" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  background: "var(--ink)",
                  color: "var(--bone)",
                  border: "none",
                  borderBottom: "2px solid var(--mustard)",
                  padding: "9px 20px",
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                Subscribe
              </button>
            </Link>
          </div>

          {/* Mobile */}
          <div
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
            className="mobile-nav"
          >
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{
                background: "none",
                border: "none",
                color: "var(--ink)",
                cursor: "pointer",
                padding: "11px",
                minWidth: "44px",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{
                background: "none",
                border: "none",
                color: "var(--ink)",
                cursor: "pointer",
                padding: "11px",
                minWidth: "44px",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "calc(100vh - 64px)",
              boxSizing: "border-box",
              background: "var(--card)",
              borderTop: "1px solid var(--border)",
              boxShadow: "var(--shadow-modal)",
              padding: "8px 20px calc(24px + env(safe-area-inset-bottom))",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              zIndex: 400,
            }}
          >
            <Link
              href="/help"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontFamily: "var(--U)",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--mustard-text)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Find Help for What You Are Facing
            </Link>
            <Link
              href={TABLE_NAV.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontFamily: "var(--U)",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--ink)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              The Table — disciple someone
            </Link>
            {SITE_NAV_GROUPS.map(group => (
              <div key={group.title}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "var(--U)",
                      color: "var(--ink)",
                      fontSize: "14px",
                      fontWeight: 600,
                      padding: "12px 0",
                    }}
                  >
                    {group.title}
                  </span>
                  <button
                    type="button"
                    aria-label={`Show ${group.title} links`}
                    aria-expanded={openDropdown === group.title}
                    onClick={() =>
                      setOpenDropdown(openDropdown === group.title ? null : group.title)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--ink)",
                      cursor: "pointer",
                      padding: "12px 4px 12px 20px",
                      minHeight: "44px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <ChevronDown
                      size={18}
                      aria-hidden
                      style={{
                        transform:
                          openDropdown === group.title ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                </div>
                {openDropdown === group.title && (
                  <div style={{ paddingLeft: "16px", paddingBottom: "8px" }}>
                    {headerLinks(group).map(item => (
                      <div
                        key={item.href + item.label}
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        <NavItemLink
                          link={item}
                          onNavigate={() => {
                            setMobileOpen(false);
                            setOpenDropdown(null);
                          }}
                          style={{
                            textDecoration: "none",
                            display: "block",
                            fontFamily: "var(--U)",
                            color: "var(--ink)",
                            fontSize: "14px",
                            fontWeight: 500,
                            padding: "10px 0",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <Link
                href="/subscribe"
                onClick={() => setMobileOpen(false)}
                style={{
                  flex: 1,
                  textDecoration: "none",
                  textAlign: "center",
                  background: "var(--ink)",
                  color: "var(--bone)",
                  borderBottom: "2px solid var(--mustard)",
                  padding: "14px 24px",
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Subscribe
              </Link>
              <Link
                href="/membership"
                onClick={() => setMobileOpen(false)}
                style={{
                  flex: 1,
                  textDecoration: "none",
                  textAlign: "center",
                  background: "transparent",
                  color: "var(--ink)",
                  border: "1px solid var(--ink)",
                  padding: "13px 24px",
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Membership
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style>{
        "@media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-nav { display: flex !important; } }" +
        "@media (min-width: 901px) { .mobile-nav { display: none !important; } .desktop-nav { display: flex !important; } }"
      }</style>
    </>
  );
}
