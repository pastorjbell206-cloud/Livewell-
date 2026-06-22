/**
 * Primary navigation. A clean two-level menu mapped to the five content pillars
 * and their sub-pathways (lib/subPathways.ts), plus a dedicated home for the
 * long-form study guides and series:
 *
 *   Theological Depth ▸ Doctrine & Scripture · Church History · Biblical Theology
 *   Post-Christian World ▸ Prophetic Disruption (Church & Empire, Nationalism,
 *     Cultural Captivity) + Prophetic Justice (Economic Justice, Race, The
 *     Vulnerable, Systemic Sin), folded into one door
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
} from "@/lib/subPathways";
import { SUBPATHWAY_BY_SLUG } from "@/lib/subpathwayMap.generated";
import { HIDDEN_SLUGS } from "@/lib/hiddenSlugs";

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
    // Some pillars lead with a curated hub before the article sub-pathways.
    const extras: DropdownItem[] =
      pillar === "Integrated Life"
        ? [
            { label: "The Integrated Life Hub", href: "/life", description: "One undivided life before God — the inner life, the body, the home, work and money, and the world." },
            { label: "The Whole-Life Assessment", href: "/life/assessment", description: "Map where your life is flourishing and where it has gone quiet, and get a rule of life for this season." },
            { label: "Family Discipleship", href: "/family", description: "Devotions, teen apologetics, parenting, and marriage — for the whole house." },
          ]
        : pillar === "Theological Depth"
        ? [
            { label: "The Depth Hub", href: "/theology", description: "Contested doctrines explained fairly — every view in its strongest voice, sorted by how much it matters." },
            { label: "Church History", href: "/theology/history", description: "The story you were born into — the councils, the creeds, the heresies, and the people who carried the faith." },
            { label: "Biblical Theology", href: "/theology/biblical", description: "The whole Bible as one story that climaxes in Christ — the storyline, the themes, and every book." },
            { label: "Hard Questions", href: "/theology/questions", description: "Honest answers to what people actually ask — suffering, salvation, the Bible, death, and doubt." },
            { label: "Why So Many Churches?", href: "/theology/traditions", description: "An irenic guide to the great traditions and the core they all share." },
          ]
        : pillar === "Prophetic Disruption"
        ? [
            { label: "The Disruption Hub", href: "/disruption", description: "The church's captivity to tribe, nation, and culture — truth defended selectively, the left and the right indicted alike." },
            { label: "The Consistency Check", href: "/disruption/consistency", description: "A mirror, not a scorecard: do you defend truth selectively, one standard for your side and another for theirs?" },
            { label: "Hard Questions", href: "/disruption/questions", description: "Is the gospel political? Is Christianity left or right? What even is social justice?" },
          ]
        : pillar === "Prophetic Justice"
        ? [
            { label: "The Justice Hub", href: "/justice", description: "Mishpat and tsedaqah — the poor at the gate, the worker, the vulnerable, and the church's silence." },
            { label: "The Call", href: "/justice/posture", description: "Biblical justice defined from the text up, and God's lean toward the poor and the foreigner." },
          ]
        : pillar === "Leadership Formation"
        ? [
            { label: "The Leadership Hub", href: "/leadership", description: "A working library for pastors and lay leaders — tools, articles, and sermon series for the weight of leading the church." },
            { label: "The Leadership Library", href: "/leadership/library", description: "Every leadership article in one searchable place — preaching, exegesis, formation, and care." },
            { label: "Sermon Series Library", href: "/leadership/sermon-series", description: "Complete series plans, book by book and topic by topic, with the arc and every sermon's aim." },
            { label: "Sermon Series — Every Book of the Bible", href: "/leadership/bible-sermons", description: "A ready-to-preach series for all 66 books, Genesis to Revelation — big idea, Christ connection, and the arc." },
            { label: "Servant Leadership", href: "/leadership/servant-leadership", description: "The nine biblical marks of a servant leader — the qualities the church neglected because they cost the leader something." },
            { label: "The Servant Leadership Handbook", href: "/leadership/handbook", description: "A free twelve-chapter book on leading the church — from the towel and the throne to raising your replacement." },
            { label: "Training Guides", href: "/leadership/guides", description: "Free session-by-session guides: servant leadership, elder training, deacon training, and developing leaders." },
          ]
        : [];
    if (subs.length === 0) {
      // No populated sub-pathway. Still surface Family for Integrated Life.
      if (extras.length) {
        return { label: pillar, dropdown: [...extras, { label: `All ${pillar}`, href: pillarListingUrl(pillar) }] };
      }
      return { label: pillar, href: pillarListingUrl(pillar) };
    }
    return {
      label: pillar,
      dropdown: [
        ...extras,
        { label: `All ${pillar}`, href: pillarListingUrl(pillar) },
        ...subs.map(s => ({ label: s.label, href: pillarListingUrl(pillar, s.slug) })),
      ],
    };
  });

  // Fold the two prophetic pillars (Justice + Disruption) into one
  // "Post-Christian World" door, preserving every dropdown item from both.
  const byPillar: Record<string, NavLink> = {};
  PILLAR_ORDER.forEach((p, i) => { byPillar[p] = pillarLinks[i]; });
  const itemsOf = (l: NavLink): DropdownItem[] =>
    l.dropdown ?? (l.href ? [{ label: l.label, href: l.href }] : []);
  // Display-only relabel: rename the nav door (and its "All <pillar>" entry)
  // while the underlying pillar data, slugs, and listing URLs stay untouched.
  const relabel = (l: NavLink, label: string, allLabel: string): NavLink =>
    l.dropdown
      ? { ...l, label, dropdown: l.dropdown.map(i => (i.label.startsWith("All ") ? { ...i, label: allLabel } : i)) }
      : { ...l, label };
  const postChristianWorld: NavLink = {
    label: "Post-Christian World",
    dropdown: [
      ...itemsOf(byPillar["Prophetic Disruption"]),
      ...itemsOf(byPillar["Prophetic Justice"]),
      { label: "Church History", href: "/theology/history", description: "The councils, the creeds, the schisms — how the church was handed the center of the West, and how it lost it." },
      { label: "The Creeds & Confessions", href: "/resources/creeds", description: "The texts the church has confessed in every age, with plain-language notes on what they meant." },
      { label: "Why So Many Churches?", href: "/theology/traditions", description: "An even-handed guide to the great traditions and the core they all share." },
      { label: "Hard Questions & Answers", href: "/theology/questions", description: "Honest answers for a skeptical age — suffering, Scripture, doubt, and death." },
    ],
  };
  // Everyday Life: relabel Integrated Life, then surface the household pages.
  const everydayLife = relabel(byPillar["Integrated Life"], "Everyday Life", "All Everyday Life");
  const everydayLifePlus: NavLink = {
    ...everydayLife,
    dropdown: [
      ...itemsOf(everydayLife),
      { label: "Marriage", href: "/marriage", description: "Marriage as covenant, not contract — past the tips, into the gospel shape of staying." },
      { label: "Parenting", href: "/parenting", description: "Raising children in the faith without fear, formula, or guilt." },
      { label: "Family Devotions", href: "/family/devotions", description: "Weekly devotions plus Advent and Holy Week, built for fifteen minutes at the table." },
    ],
  };

  return [
    { label: "Start here", href: "/start" },
    byPillar["Theological Depth"],
    postChristianWorld,
    everydayLifePlus,
    { label: "The Table", href: "/table" },
    relabel(byPillar["Leadership Formation"], "For Pastors & Leaders", "All Leadership"),
    { label: "Resources", href: "/resources" },
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
      if (HIDDEN_SLUGS.has((r as any).slug)) continue;
      // Prefer a sub-pathway written to the DB; otherwise fall back to the
      // static slug→category map so the menu works without a DB backfill.
      const label =
        ((r as any).subPathway as string | null) ||
        SUBPATHWAY_BY_SLUG[(r as any).slug]?.sub ||
        null;
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

            <Link href="/substack" style={{ textDecoration: "none" }}>
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
                href="/substack"
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
