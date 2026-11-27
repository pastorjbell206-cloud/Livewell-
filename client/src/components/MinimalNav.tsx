/**
 * The header (James, 2026-11-27, "Explore-led menu"): Explore, whose panel is
 * the eight disciplines as pictures (pages/explore, /explore/<discipline>),
 * then five doors from the site catalogue (lib/siteCatalog.ts): Bible,
 * Family, Tools, Essays and About, with Find Help, search and Subscribe
 * beside them. History and Questions keep their pages and rooms; in the bar
 * they are inside Explore, as Church history and Difficult questions, and
 * Explore is marked current on their pages. Each door but Essays opens a
 * compact panel of six rooms or fewer (an icon, the plain name, one line) and
 * a foot with "Everything in <door>" and "New here? Start here". On a phone
 * the menu button opens a full-screen sheet: the eight disciplines as picture
 * cards, then the same doors.
 *
 * Keyboard: Tab moves through the bar; Enter or Space opens a door; Left and
 * Right move between doors; Down opens a door's panel at its first room; Up
 * and Down move inside a panel; Escape closes it and returns to the door.
 *
 * The map is committed and static (no API round trip), so the header paints
 * in full on first render.
 */
import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import AppBack from "./AppBack";

import {
  DOORS,
  APP_ENTRY,
  EVERYTHING_ENTRY,
  HELP_ENTRY,
  LIBRARY_ENTRY,
  START_LINK,
  doorForPath,
  type CatalogEntry,
  type Door,
  type DoorId,
} from "@/lib/siteCatalog";
import { ICONS, ICON_STROKE } from "@/lib/siteIcons";
import { SEARCH_SHORTCUTS } from "@/lib/siteNav";
import Plate from "./art/Plate";
import { DISCIPLINES } from "@/pages/preview/disciplines";
import { followHash } from "@/lib/followHash";
import type { PassageMatch } from "@/lib/siteSearch";
import "./site-nav.css";

/**
 * Search, with the reference parser behind it. Both load the first time the
 * search field is focused (lib/siteSearch.ts), never with the header itself,
 * so first paint carries none of it.
 */
const loadFind = () => import("@/lib/siteSearch");

/** The bar's doors after Explore. History and Questions sit inside Explore. */
const BAR_DOOR_IDS: DoorId[] = ["bible", "family", "tools", "essays", "about"];
/** Doors whose pages Explore holds, so Explore is marked current on them. */
const EXPLORE_HOLDS: DoorId[] = ["history", "questions"];
type NavId = DoorId | "explore";

/** Explore, drawn as a door: its rooms are the eight disciplines. */
const EXPLORE: Door = {
  id: "explore" as DoorId,
  name: "Explore",
  icon: "Compass",
  plate: "compass",
  page: EVERYTHING_ENTRY,
  rooms: DISCIPLINES.map((d) => ({ id: `explore.${d.id}`, name: d.name, line: d.line, href: `/explore/${d.id}`, icon: "Compass" })),
};
const BAR_DOORS: Door[] = [EXPLORE, ...BAR_DOOR_IDS.map((id) => DOORS.find((d) => d.id === id)).filter((d): d is Door => !!d)];
const PLATE_OF = new Map(DISCIPLINES.map((d) => [`/explore/${d.id}`, d.plate]));

/** A catalogue entry as a link: outbound in a new tab, in-app through wouter. */
function EntryLink({
  entry,
  className,
  onNavigate,
  children,
}: {
  entry: CatalogEntry;
  className?: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  if (entry.external) {
    return (
      <a href={entry.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
        {children}
      </a>
    );
  }
  return (
    <Link
      href={entry.href}
      className={className}
      onClick={() => {
        onNavigate();
        followHash(entry.href);
      }}
    >
      {children}
    </Link>
  );
}

/** The panel lines up under its door; the last doors open leftward so they stay on screen. */
const panelSide = (i: number) => (i >= 4 ? "sn-panel--end" : "sn-panel--start");

/** Door controls in the bar, in order (the buttons and the Essays link). */
const doorControls = (root: HTMLElement | null) =>
  Array.from(root?.querySelectorAll<HTMLElement>("[data-door-control]") ?? []);

/** The links inside an open panel, in order. */
const panelLinks = (panel: HTMLElement | null) => Array.from(panel?.querySelectorAll<HTMLElement>("a") ?? []);

export default function MinimalNav() {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Reads a typed reference once the parser has loaded; null until then.
  const [readPassage, setReadPassage] = useState<((q: string) => PassageMatch | null) | null>(null);
  // The door whose panel is open in the bar.
  const [openDoor, setOpenDoor] = useState<NavId | null>(null);
  // The door opened inside the phone sheet.
  const [sheetDoor, setSheetDoor] = useState<NavId | null>(null);
  const doorsRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  // The door a mouse opened by hovering. The click that usually follows keeps
  // that panel open instead of folding it.
  const hoverOpened = useRef<NavId | null>(null);

  const pageDoor = doorForPath(location);
  const currentDoor: NavId | null = location.startsWith("/explore/") || (pageDoor && EXPLORE_HOLDS.includes(pageDoor)) ? "explore" : pageDoor;

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

  // A click anywhere outside the bar's doors folds an open panel.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (doorsRef.current && !doorsRef.current.contains(e.target as Node)) setOpenDoor(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close everything on any route change. Adjusted during render (the
  // documented "state from previous renders" pattern) instead of an effect, so
  // the closed menu paints in the same pass as the new route.
  const [prevLocation, setPrevLocation] = useState(location);
  if (prevLocation !== location) {
    setPrevLocation(location);
    setMobileOpen(false);
    setSearchOpen(false);
    setOpenDoor(null);
  }

  // Escape closes whatever is open and puts focus back where it came from.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openDoor) document.getElementById(`sn-door-${openDoor}`)?.focus();
      if (mobileOpen) menuButtonRef.current?.focus();
      setMobileOpen(false);
      setSearchOpen(false);
      setOpenDoor(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openDoor, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The sheet opens on its first row, so a keyboard user starts inside it.
    sheetRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /** Move focus among the door controls by an offset, wrapping at the ends. */
  const moveDoor = (from: HTMLElement, by: number) => {
    const list = doorControls(doorsRef.current);
    const i = list.indexOf(from);
    if (i < 0) return;
    list[(i + by + list.length) % list.length]?.focus();
  };

  const onDoorKey = (door: Door) => (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (openDoor) setOpenDoor(null);
      moveDoor(e.currentTarget, e.key === "ArrowRight" ? 1 : -1);
    } else if (e.key === "ArrowDown" && door.rooms.length) {
      e.preventDefault();
      setOpenDoor(door.id);
      // The panel renders on the next pass; then its first room takes focus.
      window.requestAnimationFrame(() => panelLinks(document.getElementById(`sn-panel-${door.id}`))[0]?.focus());
    } else if (e.key === "ArrowUp" && openDoor === door.id) {
      e.preventDefault();
      setOpenDoor(null);
    }
  };

  const onPanelKey = (door: Door) => (e: ReactKeyboardEvent<HTMLElement>) => {
    const links = panelLinks(document.getElementById(`sn-panel-${door.id}`));
    const i = links.indexOf(e.target as HTMLElement);
    if (i < 0) return;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = (i + 1) % links.length;
    else if (e.key === "ArrowUp") next = i === 0 ? -1 : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = links.length - 1;
    if (next === null) return;
    e.preventDefault();
    if (next === -1) document.getElementById(`sn-door-${door.id}`)?.focus();
    else links[next]?.focus();
  };

  const closeAll = () => {
    setOpenDoor(null);
    setMobileOpen(false);
    setSheetDoor(null);
  };

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
        aria-label="Main"
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
          <div style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: 0 }}>
          <AppBack />
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", minHeight: "44px" }}>
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
                className="lw-byline"
                style={{
                  whiteSpace: "nowrap",
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
          </div>

          <div ref={doorsRef} className="desktop-nav sn-doors">
            {BAR_DOORS.map((door, i) => {
              if (!door.rooms.length) {
                return (
                  <Link
                    key={door.id}
                    href={door.page.href}
                    data-door-control=""
                    className="sn-door-link"
                    aria-current={location === door.page.href ? "page" : undefined}
                    onKeyDown={onDoorKey(door)}
                  >
                    {door.name}
                  </Link>
                );
              }
              const open = openDoor === door.id;
              return (
                <div
                  key={door.id}
                  className="sn-door"
                  onMouseEnter={() => {
                    if (!open) hoverOpened.current = door.id;
                    setOpenDoor(door.id);
                  }}
                  onMouseLeave={() => {
                    hoverOpened.current = null;
                    if (open) setOpenDoor(null);
                  }}
                  onBlur={(e) => {
                    if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenDoor(null);
                  }}
                >
                  <button
                    type="button"
                    id={`sn-door-${door.id}`}
                    data-door-control=""
                    className={`sn-door-btn${currentDoor === door.id ? " is-current" : ""}`}
                    aria-expanded={open}
                    aria-controls={`sn-panel-${door.id}`}
                    aria-current={currentDoor === door.id ? "true" : undefined}
                    onKeyDown={onDoorKey(door)}
                    onClick={() => {
                      if (hoverOpened.current === door.id) {
                        hoverOpened.current = null;
                        setOpenDoor(door.id);
                        return;
                      }
                      setOpenDoor(open ? null : door.id);
                    }}
                  >
                    {door.name}
                    <ChevronDown className="sn-chev" size={14} strokeWidth={ICON_STROKE} aria-hidden />
                  </button>
                  {open && (
                    <div
                      id={`sn-panel-${door.id}`}
                      className={`sn-panel ${door === EXPLORE ? "sn-panel--explore" : panelSide(i)}`}
                      role="region"
                      aria-label={door.name}
                      onKeyDown={onPanelKey(door)}
                    >
                      {door === EXPLORE ? (
                        <ul className="sn-ways">
                          {door.rooms.map((room) => (
                            <li key={room.id}>
                              <Link href={room.href} className="sn-way" onClick={closeAll}>
                                <span className="sn-way__art" aria-hidden="true">
                                  <Plate name={PLATE_OF.get(room.href) ?? "compass"} decorative />
                                </span>
                                <span>
                                  <span className="sn-room__name">{room.name}</span>
                                  <span className="sn-room__line">{room.line}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                      <ul className="sn-rooms">
                        {door.rooms.map((room) => {
                          const Icon = ICONS[room.icon];
                          return (
                            <li key={room.id}>
                              <EntryLink entry={room} className="sn-room" onNavigate={closeAll}>
                                <Icon size={20} strokeWidth={ICON_STROKE} aria-hidden />
                                <span>
                                  <span className="sn-room__name">{room.name}</span>
                                  <span className="sn-room__line">{room.line}</span>
                                </span>
                              </EntryLink>
                            </li>
                          );
                        })}
                      </ul>
                      )}
                      <div className="sn-foot">
                        <Link href={door.page.href} onClick={closeAll}>
                          {door === EXPLORE ? EVERYTHING_ENTRY.name : `Everything in ${door.name}`}
                        </Link>
                        <Link href={START_LINK.href} onClick={closeAll}>
                          {START_LINK.name}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link href={HELP_ENTRY.href} className="sn-util">
              {HELP_ENTRY.name}
            </Link>

            <button
              type="button"
              className="sn-search"
              onClick={() => setSearchOpen(true)}
              aria-label="Search, or look up a passage"
              title="Search"
            >
              <Search size={18} strokeWidth={ICON_STROKE} aria-hidden />
            </button>

            <Link href="/subscribe" className="sn-subscribe">
              Subscribe
            </Link>
          </div>

          {/* Phone: Find Help stays one tap away, beside search and the menu. */}
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="mobile-nav">
            <Link href={HELP_ENTRY.href} className="sn-util" style={{ padding: "0 8px" }}>
              {HELP_ENTRY.name}
            </Link>
            <button type="button" className="sn-search sn-search--phone" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} strokeWidth={ICON_STROKE} aria-hidden />
            </button>
            {/* Subscribe sits beside the menu button on a phone, so the
                Substack signup is one tap from any page. */}
            <Link href="/subscribe" className="sn-subscribe sn-subscribe--phone" style={{ margin: 0, padding: "0 12px", fontSize: "13px" }}>
              Subscribe
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="sn-search"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileOpen ? <X size={22} strokeWidth={ICON_STROKE} aria-hidden /> : <Menu size={22} strokeWidth={ICON_STROKE} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-nav-panel" ref={sheetRef} className="sn-sheet" role="dialog" aria-label="Menu" aria-modal="false">
            <div className="sn-sheet-in">
              <Link href={START_LINK.href} className="sn-start" onClick={closeAll}>
                {(() => {
                  const Icon = ICONS[START_LINK.icon];
                  return <Icon size={24} strokeWidth={ICON_STROKE} aria-hidden style={{ color: "var(--mustard-text)", flex: "none" }} />;
                })()}
                <span>
                  <span className="sn-start__name">{START_LINK.name}</span>
                  <span className="sn-start__line">{START_LINK.line}</span>
                </span>
              </Link>

              <p className="sn-sheet-label">Explore</p>
              <ul className="sn-sheet-ways">
                {EXPLORE.rooms.map((room) => (
                  <li key={room.id}>
                    <Link href={room.href} className={`sn-sheet-way${location === room.href ? " is-current" : ""}`} onClick={closeAll}>
                      <span className="sn-sheet-way__art" aria-hidden="true">
                        <Plate name={PLATE_OF.get(room.href) ?? "compass"} decorative />
                      </span>
                      <span className="sn-sheet-way__name">{room.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="sn-sheet-doors">
                {BAR_DOORS.filter((d) => d !== EXPLORE).map((door) => {
                  const DoorIcon = ICONS[door.icon];
                  const current = currentDoor === door.id ? " is-current" : "";
                  if (!door.rooms.length) {
                    return (
                      <li key={door.id}>
                        <Link href={door.page.href} className={`sn-sheet-door${current}`} onClick={closeAll}>
                          <DoorIcon className="sn-door-icon" size={24} strokeWidth={ICON_STROKE} aria-hidden />
                          {door.name}
                        </Link>
                      </li>
                    );
                  }
                  const open = sheetDoor === door.id;
                  return (
                    <li key={door.id}>
                      {/* The whole row is the toggle, not only the chevron. */}
                      <button
                        type="button"
                        className={`sn-sheet-door${current}`}
                        aria-expanded={open}
                        aria-controls={`sn-sheet-${door.id}`}
                        onClick={() => setSheetDoor(open ? null : door.id)}
                      >
                        <DoorIcon className="sn-door-icon" size={24} strokeWidth={ICON_STROKE} aria-hidden />
                        {door.name}
                        <ChevronDown className="sn-chev" size={20} strokeWidth={ICON_STROKE} aria-hidden />
                      </button>
                      {open && (
                        <ul id={`sn-sheet-${door.id}`} className="sn-sheet-rooms">
                          {door.rooms.map((room) => {
                            const Icon = ICONS[room.icon];
                            return (
                              <li key={room.id}>
                                <EntryLink entry={room} className="sn-sheet-room" onNavigate={closeAll}>
                                  <Icon size={18} strokeWidth={ICON_STROKE} aria-hidden />
                                  {room.name}
                                </EntryLink>
                              </li>
                            );
                          })}
                          <li>
                            <Link href={door.page.href} className="sn-sheet-room sn-sheet-room--all" onClick={closeAll}>
                              Everything in {door.name}
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <ul className="sn-sheet-more">
                {[HELP_ENTRY, LIBRARY_ENTRY, EVERYTHING_ENTRY, APP_ENTRY].map((entry) => {
                  const Icon = ICONS[entry.icon];
                  return (
                    <li key={entry.id}>
                      <Link
                        href={entry.href}
                        className={`sn-sheet-row${entry.id === "help" ? " sn-sheet-row--help" : ""}`}
                        onClick={closeAll}
                      >
                        <Icon size={20} strokeWidth={ICON_STROKE} aria-hidden />
                        {entry.name}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link href="/subscribe" className="sn-sheet-row sn-sheet-row--subscribe" onClick={closeAll}>
                    Subscribe
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
