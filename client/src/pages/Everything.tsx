/**
 * /explore, "Everything on LiveWell": the whole site on one page. One section
 * per door, in the header's order, each under its engraved plate, with every
 * room as a tile (and what is one tap inside it), every tool once under
 * Tools, and the essay shelf's sections under Essays. A find box at the top
 * narrows the tiles as you type.
 *
 * Everything here reads from the site catalogue (lib/siteCatalog.ts) and the
 * tools list (lib/toolsList.ts), so a page has the same name here as in the
 * header, the footer and search.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import Plate from "@/components/art/Plate";
import PlateFrame from "@/components/art/PlateFrame";
import { DOORS, HELP_ENTRY, LIBRARY_ENTRY, START_LINK, type CatalogEntry, type Door, type Room } from "@/lib/siteCatalog";
import { ICONS, ICON_STROKE } from "@/lib/siteIcons";
import { FAMILY_GROUP, FAMILY_TOOLS, TOOL_GROUPS } from "@/lib/toolsList";
import { liveSections, sectionHref } from "@/lib/shelf";
import { hasWordStarts, queryWords } from "@/lib/siteSearch";
import { followHash } from "@/lib/followHash";
import "./explore.css";

/** The tools, each once, in the tools page's groups and then the family's, under their one name (lib/toolsList.ts). */
const TOOL_SHELVES = [...TOOL_GROUPS, { ...FAMILY_GROUP, tools: FAMILY_TOOLS }].map((g) => ({
  title: g.name,
  tools: g.tools.map((t) => ({ href: t.href, name: t.name, line: t.job, Icon: t.icon })),
}));

const countText = (e: CatalogEntry) => (e.count ? `${e.count.n} ${e.count.of}` : null);

function EntryAnchor({ entry, className, children }: { entry: CatalogEntry; className: string; children: React.ReactNode }) {
  if (entry.external) {
    return (
      <a href={entry.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={entry.href} className={className} onClick={() => followHash(entry.href)}>
      {children}
    </Link>
  );
}

/** A room: its tile (icon, name, line, count) and what is one tap inside it. */
function RoomTile({ room, inside }: { room: CatalogEntry; inside: CatalogEntry[] }) {
  const Icon = ICONS[room.icon];
  const count = countText(room);
  return (
    <li className="ex-tile">
      <EntryAnchor entry={room} className="ex-tile__main">
        <span className="ex-tile__icon" aria-hidden>
          <Icon size={22} strokeWidth={ICON_STROKE} />
        </span>
        <span className="ex-tile__text">
          <span className="ex-tile__name">{room.name}</span>
          <span className="ex-tile__line">{room.line}</span>
          {count && <span className="ex-tile__count">{count}</span>}
        </span>
      </EntryAnchor>
      {inside.length > 0 && (
        <ul className="ex-inside" aria-label={`Also in ${room.name}`}>
          {inside.map((i) => (
            <li key={i.id}>
              <EntryAnchor entry={i} className="ex-inside__link">
                {i.name}
                {i.external && <span className="sr-only"> (opens another site)</span>}
              </EntryAnchor>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/** The text a find matches against. */
const textOf = (e: CatalogEntry) => `${e.name} ${e.line}`;

/** A room and the pages inside it that match the words; null when none do. */
function matchRoom(room: Room, words: string[]): { room: Room; inside: CatalogEntry[] } | null {
  const inside = room.inside ?? [];
  if (!words.length) return { room, inside };
  if (hasWordStarts(textOf(room), words)) return { room, inside };
  const hits = inside.filter((i) => hasWordStarts(textOf(i), words));
  return hits.length ? { room, inside: hits } : null;
}

/** Essays' rooms are the shelf's sections that have public essays. */
function essayRooms(): Room[] {
  return liveSections().map((s) => ({
    id: `essays.${s.slug}`,
    name: s.name,
    line: s.description,
    href: sectionHref(s),
    icon: "Feather" as const,
  }));
}

function DoorSection({ door, words, index }: { door: Door; words: string[]; index: number }) {
  const rooms = door.id === "essays" ? essayRooms() : door.rooms;
  const shown = rooms.map((r) => matchRoom(r, words)).filter((x): x is { room: Room; inside: CatalogEntry[] } => x !== null);
  const pageHit = !words.length || hasWordStarts(`${door.name} ${textOf(door.page)}`, words);
  const tools =
    door.id === "tools"
      ? TOOL_SHELVES.map((g) => ({ ...g, tools: words.length ? g.tools.filter((t) => hasWordStarts(`${t.name} ${t.line}`, words)) : g.tools })).filter((g) => g.tools.length)
      : [];
  const toolCount = tools.reduce((n, g) => n + g.tools.length, 0);
  if (!pageHit && !shown.length && !toolCount) return null;
  const DoorIcon = ICONS[door.icon];
  return (
    <section id={door.id} className={`ex-door${index % 2 ? " ex-door--warm" : ""}`} aria-labelledby={`ex-door-${door.id}`}>
      <div className="ex-wrap ex-door__grid">
        <div className="ex-door__head">
          <div>
            <p className="eyebrow">
              <DoorIcon size={14} strokeWidth={ICON_STROKE} aria-hidden /> {door.name}
            </p>
            <h2 id={`ex-door-${door.id}`} className="ex-door__title">
              {door.page.name}
            </h2>
            <p className="ex-door__line">{door.page.line}</p>
            <Link href={door.page.href} className="ex-door__open">
              Open {door.page.name} <span aria-hidden>→</span>
            </Link>
          </div>
          <PlateFrame className="ex-door__art" ratio={null}>
            <Plate name={door.plate} decorative />
          </PlateFrame>
        </div>
        <div className="ex-door__body">
          {shown.length > 0 && (
            <ul className="ex-tiles">
              {shown.map(({ room, inside }) => (
                <RoomTile key={room.id} room={room} inside={inside} />
              ))}
            </ul>
          )}
          {tools.length > 0 && (
            <div className="ex-tools">
              <h3 className="ex-tools__title">
                {words.length ? `${toolCount} ${toolCount === 1 ? "tool" : "tools"}` : `Every tool, ${toolCount} in all`}
              </h3>
              {tools.map((g) => (
                <div key={g.title} className="ex-tools__group">
                  <p className="ex-tools__group-name">{g.title}</p>
                  <ul className="ex-tools__list">
                    {g.tools.map((t) => (
                      <li key={t.href}>
                        <Link href={t.href} className="ex-tool">
                          <t.Icon size={18} strokeWidth={ICON_STROKE} aria-hidden />
                          <span>
                            <span className="ex-tool__name">{t.name}</span>
                            <span className="ex-tool__line">{t.line}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Everything() {
  // An old /explore?q=… link (the address once searched the essays) opens with its words in the box.
  const [query, setQuery] = useState(() => (typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") ?? ""));
  const words = useMemo(() => queryWords(query), [query]);
  const searching = query.trim().length > 0;

  // How many places a find turned up, counted the way the tiles show them.
  const found = useMemo(() => {
    if (!words.length) return 0;
    let n = 0;
    for (const door of DOORS) {
      if (hasWordStarts(`${door.name} ${textOf(door.page)}`, words)) n += 1;
      for (const r of door.id === "essays" ? essayRooms() : door.rooms) {
        const m = matchRoom(r, words);
        if (m) n += hasWordStarts(textOf(r), words) ? 1 : m.inside.length;
      }
      if (door.id === "tools") for (const g of TOOL_SHELVES) n += g.tools.filter((t) => hasWordStarts(`${t.name} ${t.line}`, words)).length;
    }
    return n;
  }, [words]);

  const HelpIcon = ICONS[HELP_ENTRY.icon];
  const StartIcon = ICONS[START_LINK.icon];
  const LibraryIcon = ICONS[LIBRARY_ENTRY.icon];

  return (
    <Layout>
      <SEOMeta
        title="Everything on LiveWell"
        description="Every part of LiveWell on one page: the Study Bible, church history, hard questions, family devotions, the tools, the essays, and how to reach James."
      />
      <PageHead
        eyebrow="The whole site"
        title="Everything on LiveWell"
        lede="Every door, room and tool, on one page. Type to find one."
        actions={
          <div className="ex-find" role="search">
            <label htmlFor="ex-find-input" className="ex-find__label">
              Find a page or a tool
            </label>
            <div className="ex-find__field">
              <Search size={20} strokeWidth={ICON_STROKE} aria-hidden />
              <input
                id="ex-find-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: prayer, creeds, marriage"
                autoComplete="off"
              />
            </div>
          </div>
        }
      />

      <div className="ex-wrap ex-top">
        {/* Always on the page, so a screen reader hears each new count. */}
        <p role="status" className="ex-status">
          {searching ? (found ? `${found} ${found === 1 ? "place matches" : "places match"} "${query.trim()}".` : "") : ""}
        </p>
        {searching && !found && (
          <p className="ex-none">
            Nothing here matches "{query.trim()}". Try another word, or{" "}
            <Link href={`/search?q=${encodeURIComponent(query.trim())}`}>search every page</Link>.
          </p>
        )}
        {!searching && (
          <nav aria-label="Doors on this page" className="ex-jump">
            <Link href={START_LINK.href} className="ex-jump__lead">
              <StartIcon size={18} strokeWidth={ICON_STROKE} aria-hidden /> {START_LINK.name}
            </Link>
            {DOORS.map((d) => {
              const Icon = ICONS[d.icon];
              return (
                <a key={d.id} href={`#${d.id}`} className="ex-jump__door">
                  <Icon size={16} strokeWidth={ICON_STROKE} aria-hidden /> {d.name}
                </a>
              );
            })}
            <Link href={HELP_ENTRY.href} className="ex-jump__help">
              <HelpIcon size={16} strokeWidth={ICON_STROKE} aria-hidden /> {HELP_ENTRY.name}
            </Link>
            <Link href={LIBRARY_ENTRY.href} className="ex-jump__door">
              <LibraryIcon size={16} strokeWidth={ICON_STROKE} aria-hidden /> {LIBRARY_ENTRY.name}
            </Link>
          </nav>
        )}
      </div>

      {DOORS.map((door, i) => (
        <DoorSection key={door.id} door={door} words={words} index={i} />
      ))}
    </Layout>
  );
}
