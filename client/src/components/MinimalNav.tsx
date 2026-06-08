/**
 * Primary navigation. A clean two-level menu mapped to the five content pillars
 * and their sub-pathways (lib/subPathways.ts), plus a dedicated home for the
 * long-form study guides and series:
 *
 *   Theological Depth ▸ Doctrine & Scripture · Church History · Biblical Theology
 *   Prophetic Justice ▸ Economic Justice · Race & Reconciliation · The Vulnerable · Systemic Sin
 *   Prophetic Disruption ▸ Church & Empire · Christian Nationalism · Cultural Captivity
 *   Leadership Formation ▸ Pastoral Health · Staff & Teams · Preaching · Church Revitalization
 *   Integrated Life ▸ Marriage & Family · Rhythms & Sabbath · Vocation & Money
 *   Study Guides & Series → every multi-part guide/devotional in one place
 *   Books / About → flat links
 *
 * The dropdowns only list sub-pathways that have at least one published post
 * (counted from `posts.navIndex`); a pillar with none renders as a plain link.
 */
import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { trpc } from "@/lib/trpc";
import {
  PILLAR_ORDER,
  subPathwaysForPillar,
  pillarListingUrl,
  STUDY_GUIDES_LABEL,
  STUDY_GUIDES_HREF,
} from "@/lib/subPathways";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavLink {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

/**
 * Build the nav from the live sub-pathway counts. `counts` maps a sub-pathway
 * label → number of published posts. Until the feed loads (`hasData` false) we
 * optimistically show every sub-pathway so the menu is never barren.
 */
function buildNavLinks(counts: Record<string, number>, hasData: boolean): NavLink[] {
  const pillarLinks: NavLink[] = PILLAR_ORDER.map(pillar => {
    const subs = subPathwaysForPillar(pillar).filter(
      s => !hasData || (counts[s.label] ?? 0) > 0
    );
    if (subs.length === 0) {
      // No populated sub-pathway — a plain link to the pillar listing.
      return { label: pillar, href: pillarListingUrl(pillar) };
    }
    return {
      label: pillar,
      dropdown: [
        { label: `All ${pillar}`, href: pillarListingUrl(pillar) },
        ...subs.map(s => ({ label: s.label, href: pillarListingUrl(pillar, s.slug) })),
      ],
    };
  });

  return [
    ...pillarLinks,
    { label: STUDY_GUIDES_LABEL, href: STUDY_GUIDES_HREF },
    { label: "Books", href: "/books" },
    { label: "About", href: "/about" },
  ];
}

export default function MinimalNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live sub-pathway counts drive which dropdowns appear.
  const navIndexQuery = trpc.posts.navIndex.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });
  const { counts, hasData } = useMemo(() => {
    const rows = navIndexQuery.data ?? [];
    const c: Record<string, number> = {};
    for (const r of rows) {
      const label = (r as any).subPathway as string | null;
      if (label) c[label] = (c[label] ?? 0) + 1;
    }
    return { counts: c, hasData: rows.length > 0 };
  }, [navIndexQuery.data]);
  const navLinks = useMemo(() => buildNavLinks(counts, hasData), [counts, hasData]);

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Use replaceState to avoid full page reload
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
                  fontSize: "9px",
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
            {navLinks.map(link => (
              <div key={link.label} style={{ position: "relative" }}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      aria-haspopup="menu"
                      aria-expanded={openDropdown === link.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color:
                          openDropdown === link.label
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
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        style={{
                          opacity: 0.6,
                          transform:
                            openDropdown === link.label
                              ? "rotate(180deg)"
                              : "none",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div
                        role="menu"
                        onMouseLeave={() => setOpenDropdown(null)}
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
                          minWidth: "320px",
                          boxShadow: "var(--shadow-modal)",
                          marginTop: "4px",
                          zIndex: 300,
                        }}
                      >
                        {link.dropdown.map(item => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            style={{ textDecoration: "none" }}
                            role="menuitem"
                          >
                            <div
                              style={{
                                padding: "10px 14px",
                                borderRadius: "var(--radius-sm)",
                                cursor: "pointer",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={e =>
                                (e.currentTarget.style.background =
                                  "var(--bone-warm)")
                              }
                              onMouseLeave={e =>
                                (e.currentTarget.style.background = "transparent")
                              }
                            >
                              <div
                                style={{
                                  fontFamily: "var(--U)",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--ink)",
                                  marginBottom: "2px",
                                }}
                              >
                                {item.label}
                              </div>
                              {item.description && (
                                <div
                                  style={{
                                    fontFamily: "var(--B)",
                                    fontSize: "11px",
                                    color: "var(--ink-muted)",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href!} style={{ textDecoration: "none" }}>
                    <span
                      style={{
                        color: isActive(link.href!)
                          ? "var(--mustard-text)"
                          : "var(--ink)",
                        fontFamily: "var(--U)",
                        fontSize: "13px",
                        padding: "8px 12px",
                        borderRadius: "var(--radius-sm)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}

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

            <Link href="/start" style={{ textDecoration: "none" }}>
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
                padding: "8px",
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
                padding: "8px",
              }}
            >
              {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            style={{
              background: "var(--card)",
              borderTop: "1px solid var(--border)",
              padding: "8px 20px 24px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {navLinks.map(link => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <div
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      style={{
                        fontFamily: "var(--U)",
                        color: "var(--ink)",
                        fontSize: "14px",
                        padding: "12px 0",
                        borderBottom: "1px solid var(--border)",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        aria-hidden
                        style={{
                          transform:
                            openDropdown === link.label
                              ? "rotate(180deg)"
                              : "none",
                          transition: "transform 0.2s",
                        }}
                      />
                    </div>
                    {openDropdown === link.label && (
                      <div style={{ paddingLeft: "16px", paddingBottom: "8px" }}>
                        {link.dropdown.map(item => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setOpenDropdown(null);
                            }}
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              style={{
                                padding: "10px 0",
                                borderBottom: "1px solid var(--border)",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "var(--U)",
                                  color: "var(--ink)",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                }}
                              >
                                {item.label}
                              </div>
                              {item.description && (
                                <div
                                  style={{
                                    fontFamily: "var(--B)",
                                    color: "var(--ink-muted)",
                                    fontSize: "12px",
                                    marginTop: "2px",
                                  }}
                                >
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href!}
                    onClick={() => setMobileOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--U)",
                        color: isActive(link.href!)
                          ? "var(--mustard-text)"
                          : "var(--ink)",
                        fontSize: "14px",
                        padding: "12px 0",
                        borderBottom: "1px solid var(--border)",
                        fontWeight: isActive(link.href!) ? 600 : 500,
                      }}
                    >
                      {link.label}
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <Link
                href="/start"
                onClick={() => setMobileOpen(false)}
                style={{ textDecoration: "none", flex: 1 }}
              >
                <button
                  type="button"
                  style={{
                    background: "var(--ink)",
                    color: "var(--bone)",
                    border: "none",
                    borderBottom: "2px solid var(--mustard)",
                    padding: "12px 24px",
                    fontFamily: "var(--U)",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Subscribe
                </button>
              </Link>
              <Link
                href="/membership"
                onClick={() => setMobileOpen(false)}
                style={{ textDecoration: "none", flex: 1 }}
              >
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    color: "var(--ink)",
                    border: "1px solid var(--ink)",
                    padding: "12px 24px",
                    fontFamily: "var(--U)",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Membership
                </button>
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
