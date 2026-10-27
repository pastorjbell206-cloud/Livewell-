/**
 * Primary navigation: Study, Topics, Family, Essays, About, with one source
 * of truth in lib/siteNav.ts so the header and footer never drift. A group
 * with several header links opens as a menu; a group with one renders as that
 * plain link. Utility actions (Find Help, search, Subscribe) sit to the right.
 * The map is static (no API round trip), so the header paints in full on
 * first render.
 */
import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { BookmarkCheck, ChevronDown, Menu, Search, X } from "lucide-react";

import {
  HELP_LINK,
  LIBRARY_LINK,
  SEARCH_SHORTCUTS,
  SITE_NAV_GROUPS,
  headerLinks,
  soleHeaderLink,
  type SiteNavLink,
} from "@/lib/siteNav";
import type { PassageMatch } from "@/lib/siteSearch";

/**
 * Search, with the reference parser behind it. Both load the first time the
 * search field is focused (lib/siteSearch.ts), never with the header itself,
 * so first paint carries none of it.
 */
const loadFind = () => import("@/lib/siteSearch");

/** Header and mobile menus show only groups that carry primary links. */
const HEADER_GROUPS = SITE_NAV_GROUPS.filter((g) => headerLinks(g).length > 0);

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
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Reads a typed reference once the parser has loaded; null until then.
  const [readPassage, setReadPassage] = useState<((q: string) => PassageMatch | null) | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // The phone menu. A tap inside it is not "outside": with four doors that
  // open, closing one group on mousedown shifts the panel, and the click
  // that should open the next group lands on whatever moved under it.
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  // The door a mouse opened by hovering. The click that usually follows
  // (About was a plain link until 2026-10-26) keeps that menu open instead
  // of folding it.
  const hoverOpened = useRef<string | null>(null);

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  // The door that holds the page in view, by its longest matching header
  // link, so /resources/creeds reads as Study and not Topics.
  let currentDoor = "";
  let currentLen = 0;
  for (const g of HEADER_GROUPS) {
    for (const l of headerLinks(g)) {
      if (!l.external && isActive(l.href) && l.href.length > currentLen) {
        currentDoor = g.title;
        currentLen = l.href.length;
      }
    }
  }

  const prepareSearch = () => {
    if (readPassage) return;
    loadFind()
      .then((find) => find.loadPassageParser().then((parser) => setReadPassage(() => (q: string) => find.passageFor(q, parser))))
      .catch(() => {});
  };

  // "John 3:16" or "jn 3 16" goes straight to the verse; anything else to /search.
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      const fallback = "/search?q=" + encodeURIComponent(q);
      navigate(await loadFind().then((find) => find.findHref(q), () => fallback));
    }
    setSearchOpen(false);
  };
  const typedPassage = readPassage && searchQuery.trim() ? readPassage(searchQuery) : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobilePanelRef.current?.contains(e.target as Node)) return;
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile menu hygiene: close on any route change. Adjusted during render
  // (the documented "state from previous renders" pattern) instead of an
  // effect, so the closed menu paints in the same pass as the new route.
  const [prevLocation, setPrevLocation] = useState(location);
  if (prevLocation !== location) {
    setPrevLocation(location);
    setMobileOpen(false);
    setSearchOpen(false);
  }

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
              Look up a passage or ask a question
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
                Search LiveWell
              </label>
              <input
                id="nav-search-input"
                autoFocus
                type="text"
                placeholder="John 3:16, or your question"
                value={searchQuery}
                onFocus={prepareSearch}
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
            {typedPassage && (
              <Link
                href={typedPassage.href}
                onClick={() => setSearchOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "44px",
                  marginTop: "12px",
                  fontFamily: "var(--U)",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--charcoal-fg)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--mustard)",
                }}
              >
                Open {typedPassage.label} in the Study Bible
              </Link>
            )}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "24px",
                flexWrap: "wrap",
              }}
            >
              {SEARCH_SHORTCUTS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "44px",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    border: "1px solid rgba(245,240,230,0.2)",
                    color: "rgba(245,240,230,0.6)",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
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
        className="site-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          background: "var(--nav-bg)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          width: "100%",
          // The .site-nav rule in index.css caps the bar at 1200px and centres
          // it; the header runs the full width so its rule does too. Its
          // height and side padding (32px, 16px on phones) still apply.
          maxWidth: "none",
          margin: 0,
        }}
      >
        {/* The page's content column (var(--w-default)), so the logo lines up
            with the headings below and the actions sit flush right. */}
        <div
          style={{
            width: "100%",
            maxWidth: "var(--w-default)",
            margin: "0 auto",
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
                  fontWeight: 500,
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
            {HEADER_GROUPS.map(group => {
              const sole = soleHeaderLink(group);
              if (sole) {
                return (
                  <Link
                    key={group.title}
                    href={sole.href}
                    aria-current={isActive(sole.href) ? "page" : undefined}
                    style={{
                      color: isActive(sole.href) ? "var(--mustard-text)" : "var(--ink)",
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "8px 12px",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                    }}
                  >
                    {group.title}
                  </Link>
                );
              }
              return (
              <div key={group.title} style={{ display: "contents" }}>
              <div
                style={{ position: "relative" }}
                onMouseLeave={() => {
                  hoverOpened.current = null;
                  if (openDropdown === group.title) setOpenDropdown(null);
                }}
              >
                <button
                  onClick={() => {
                    if (hoverOpened.current === group.title) {
                      hoverOpened.current = null;
                      setOpenDropdown(group.title);
                      return;
                    }
                    setOpenDropdown(openDropdown === group.title ? null : group.title);
                  }}
                  onMouseEnter={() => {
                    if (openDropdown !== group.title) hoverOpened.current = group.title;
                    setOpenDropdown(group.title);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === group.title}
                  aria-current={currentDoor === group.title ? "true" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color:
                      openDropdown === group.title || currentDoor === group.title
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
              </div>
              );
            })}

            <Link
              href={HELP_LINK.href}
              style={{
                color: "var(--mustard-text)",
                fontFamily: "var(--U)",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 12px",
                whiteSpace: "nowrap",
              }}
            >
              {HELP_LINK.label}
            </Link>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search, or look up a passage"
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

          {/* Mobile: Find Help stays one tap away, beside search. */}
          <div
            style={{ display: "flex", gap: "4px", alignItems: "center" }}
            className="mobile-nav"
          >
            <Link
              href={HELP_LINK.href}
              style={{
                color: "var(--mustard-text)",
                fontFamily: "var(--U)",
                fontSize: "14px",
                fontWeight: 600,
                padding: "0 8px",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              {HELP_LINK.label}
            </Link>
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
              aria-controls="mobile-nav-panel"
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
            id="mobile-nav-panel"
            ref={mobilePanelRef}
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
              href={HELP_LINK.href}
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
            {HEADER_GROUPS.map(group => {
              const sole = soleHeaderLink(group);
              if (sole) {
                return (
                  <Link
                    key={group.title}
                    href={sole.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive(sole.href) ? "page" : undefined}
                    style={{
                      display: "block",
                      fontFamily: "var(--U)",
                      color: "var(--ink)",
                      fontSize: "14px",
                      fontWeight: 600,
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                      textDecoration: "none",
                    }}
                  >
                    {group.title}
                  </Link>
                );
              }
              return (
              <div key={group.title}>
                {/* The whole row is the toggle: four of the five doors open
                    here, and a tap on the name should do what the chevron does. */}
                <button
                  type="button"
                  aria-label={`Show ${group.title} links`}
                  aria-expanded={openDropdown === group.title}
                  onClick={() =>
                    setOpenDropdown(openDropdown === group.title ? null : group.title)
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    minHeight: "44px",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    cursor: "pointer",
                    padding: "12px 4px 12px 0",
                    fontFamily: "var(--U)",
                    color: "var(--ink)",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "inherit",
                    textAlign: "left",
                  }}
                >
                  <span>{group.title}</span>
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
              );
            })}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              {/* What this reader saved and started, kept on this device (/my-library). */}
              <Link
                href={LIBRARY_LINK.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textDecoration: "none",
                  border: "1px solid var(--ink)",
                  color: "var(--ink)",
                  padding: "13px 16px",
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <BookmarkCheck size={16} aria-hidden /> {LIBRARY_LINK.label}
              </Link>
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
            </div>
          </div>
        )}
      </nav>

      <style>{
        // The five-door header needs ~800px (logo 106 + links 638 + gutters,
        // measured at 861 and 1280 with Study, Topics, Family, Essays, and
        // About); the hamburger takes over at 860 to leave air.
        "@media (max-width: 860px) { .desktop-nav { display: none !important; } .mobile-nav { display: flex !important; } }" +
        "@media (min-width: 861px) { .mobile-nav { display: none !important; } .desktop-nav { display: flex !important; } }"
      }</style>
    </>
  );
}
