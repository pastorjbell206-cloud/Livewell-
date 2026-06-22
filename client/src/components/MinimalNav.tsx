/**
 * Primary navigation — mission-first, by life area. The top bar names the
 * concrete places people actually live, so the right article is one obvious
 * click away instead of buried under a vague verb:
 *
 *   Faith & Doubt → /theology         Roots & Tradition → /theology/history
 *   Marriage & Family → /family       Work & Money → /life/money-and-the-heart
 *   Mind & Soul → /life               Leadership → /leadership
 *   Post-Christian World ▾ → Empire + Justice
 *   The Table → /table (disciplemaking hub)   Books → /books
 *
 * "Roots & Tradition" gives the heritage library (church history, the creeds,
 * the denominations) its own door so it stops getting lost under Faith & Doubt.
 * "The Table" is the one-place disciplemaking hub (home studies + equipping +
 * study guides + books); it absorbs the old "Resources" door, which still
 * lives at /resources and is linked from inside The Table.
 *
 * The five-pillar taxonomy (lib/subPathways.ts) still backs the listing pages
 * and the search overlay; the bar just speaks in plainer, findable terms.
 * Tracks and the V2 pillar scheme are not referenced here.
 */
import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { PILLAR_ORDER, pillarListingUrl } from "@/lib/subPathways";

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
 * The mission-first top bar, named by life area. Five flat doors land straight
 * on their hub; the sixth (Post-Christian World) folds the church-and-empire
 * and justice material together, so it opens a short two-way menu. Books and
 * Resources close the set.
 */
function buildNavLinks(): NavLink[] {
  return [
    { label: "Faith & Doubt", href: "/theology" },
    { label: "Roots & Tradition", href: "/theology/history" },
    { label: "Marriage & Family", href: "/family" },
    { label: "Work & Money", href: "/life/money-and-the-heart" },
    { label: "Mind & Soul", href: "/life" },
    { label: "Leadership", href: "/leadership" },
    {
      label: "Post-Christian World",
      dropdown: [
        {
          label: "The Church & Empire",
          href: "/disruption",
          description: "Christian nationalism, cultural captivity, and the church that confused the cross with the flag.",
        },
        {
          label: "Justice & the Vulnerable",
          href: "/justice",
          description: "Mishpat and tsedaqah — the poor at the gate, the worker, and the church's silence.",
        },
      ],
    },
    { label: "The Table", href: "/table" },
    { label: "Books", href: "/books" },
  ];
}

export default function MinimalNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = useMemo(() => buildNavLinks(), []);

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

  // Mobile menu hygiene: close on any route change, close on Escape, and lock
  // body scroll while open so the page cannot scroll behind the overlay.
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
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseLeave={() => link.dropdown && openDropdown === link.label && setOpenDropdown(null)}
              >
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
              background: "var(--card)",
              borderTop: "1px solid var(--border)",
              padding: "8px 20px 24px",
              maxHeight: "80vh",
              overflowY: "auto",
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
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <Link
                href="/start"
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
