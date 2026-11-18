/**
 * The body of /tools, below the page top (pages/ToolsHub.tsx): the find box,
 * the four groups of tools from lib/toolsList.ts, the three pages the tools
 * lead on to, and the line for families. Loaded as its own chunk, so the page
 * top paints before the list arrives; ToolsHub holds its place.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { BookmarkCheck, House, Search, Signpost } from "lucide-react";

import SectionHead from "@/components/art/SectionHead";
import DoorCard from "@/components/art/DoorCard";
import ToolTile from "@/components/art/ToolTile";
import { useLibrary } from "@/lib/library";
import { hasWordStarts, queryWords } from "@/lib/siteSearch";
import { nameForHref } from "@/lib/siteCatalog";
import { FAMILY_GROUP, FAMILY_TOOLS, OLD_GROUP_HASHES, TOOL_GROUPS, foldedInto, type Tool } from "@/lib/toolsList";
import type { PlateName } from "@/components/art/Plate";

/** How many tools the four groups hold. */
const LISTED = TOOL_GROUPS.reduce((n, g) => n + g.tools.length, 0);

/** The words a tile is found by: its name, its job, its group, and the names of the tools folded into it. */
function findText(tool: Tool, groupName: string): string {
  return [tool.name, tool.job, groupName, ...foldedInto(tool.id).map((t) => `${t.name} ${t.job}`)].join(" ");
}

/** The three pages the tools lead on to, under the catalogue's names. */
const LEADS: { href: string; note: string; plate: PlateName }[] = [
  { href: "/plans", note: "Plans for a hard season, one week at a time", plate: "lantern" },
  { href: "/studyguides", note: "For groups and churches", plate: "table" },
  { href: "/downloads", note: "Guides and plans to print or keep", plate: "jars" },
];

/** Bring a group into view when the address names it (/tools#check-yourself), on arrival and on a later hash change. */
function useGroupHash() {
  useEffect(() => {
    const go = () => {
      const raw = decodeURIComponent(window.location.hash.slice(1));
      if (!raw) return;
      const el = document.getElementById(OLD_GROUP_HASHES[raw] ?? raw);
      // After this paint, so the page has its full height before it scrolls.
      if (el) window.setTimeout(() => el.scrollIntoView({ block: "start" }), 0);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);
}

export default function ToolsBody() {
  const saved = useLibrary();
  const [query, setQuery] = useState("");
  const words = useMemo(() => queryWords(query), [query]);
  const searching = query.trim().length > 0;
  useGroupHash();

  const groups = useMemo(() => {
    if (!searching) return TOOL_GROUPS;
    return [...TOOL_GROUPS, { ...FAMILY_GROUP, tools: FAMILY_TOOLS }]
      .map((g) => ({ ...g, tools: g.tools.filter((t) => words.length > 0 && hasWordStarts(findText(t, g.name), words)) }))
      .filter((g) => g.tools.length);
  }, [searching, words]);
  const found = groups.reduce((n, g) => n + g.tools.length, 0);

  return (
    <>
      {/* FIRST: find a tool by what you want to do. */}
      <section id="tl-find" className="home-sec home-sec--dark tl-find-band" aria-labelledby="tl-find-title">
        <div className="home-wrap">
          <SectionHead dark icon={Search} label={`${LISTED} tools, each listed once`} title="What do you want to do?" id="tl-find-title" />
          <div className="tl-find" role="search">
            <label htmlFor="find-a-tool" className="tl-find__label">
              Find a tool
            </label>
            <div className="tl-find__field">
              <Search size={20} strokeWidth={1.75} aria-hidden="true" />
              <input
                id="find-a-tool"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: pray, worry, marriage, verse"
                autoComplete="off"
              />
            </div>
          </div>
          {/* Always on the page, so a screen reader hears each new count. */}
          <p role="status" className="tl-status">
            {searching ? (found ? `${found} ${found === 1 ? "tool matches" : "tools match"} "${query.trim()}".` : `No tool matches "${query.trim()}".`) : ""}
          </p>
          {!searching && (
            <nav aria-label="Tool groups" className="tl-jump">
              {TOOL_GROUPS.map((g) => {
                const Icon = g.icon;
                return (
                  <a key={g.id} href={`#${g.id}`} className="tl-jump__link">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    {g.name}
                    <span className="tl-jump__n">{g.tools.length}</span>
                  </a>
                );
              })}
            </nav>
          )}
          {searching && !found && (
            <p className="tl-none">
              Try another word, <Link href={`/search?q=${encodeURIComponent(query.trim())}`}>search the whole site</Link>, or start at{" "}
              <Link href="/help">Find Help</Link> with what you are facing.
            </p>
          )}
        </div>
      </section>

      {/* THE GROUPS: every tool once. */}
      {groups.map((g, i) => (
        <section key={g.id} id={g.id} className={`home-sec tl-group${i % 2 === 0 ? "" : " home-sec--warm"}`} aria-labelledby={`tl-${g.id}-title`}>
          <div className="home-wrap">
            <SectionHead icon={g.icon} label={`${g.tools.length} ${g.tools.length === 1 ? "tool" : "tools"}`} title={g.name} id={`tl-${g.id}-title`} />
            <p className="tl-group__line">{g.line}</p>
            <ul className="lw-tools">
              {g.tools.map((t) => (
                <li key={t.id}>
                  <ToolTile tool={t} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* LEADING ON, and the line for families. */}
      {!searching && (
        <section className="home-sec" aria-labelledby="tl-more-title">
          <div className="home-wrap">
            <SectionHead icon={Signpost} label="More to use" title="Plans, group studies and downloads." id="tl-more-title" />
            <ul className="lw-rooms">
              {LEADS.map((l) => (
                <li key={l.href}>
                  <DoorCard href={l.href} title={nameForHref(l.href) ?? l.note} note={l.note} plate={l.plate} />
                </li>
              ))}
            </ul>
            <p id="families" className="lw-newline tl-family">
              <House aria-hidden="true" size={22} strokeWidth={1.75} />
              <span>
                For families: tonight's devotion, the catechism and the family tools (
                {FAMILY_TOOLS.map((t, n) => (
                  <span key={t.id}>
                    {n > 0 && (n === FAMILY_TOOLS.length - 1 ? " and " : ", ")}
                    <Link href={t.href}>{t.name}</Link>
                  </span>
                ))}
                ) are on <Link href="/family">the family page</Link>.
              </span>
            </p>
            <p className="tl-library">
              <BookmarkCheck aria-hidden="true" size={18} strokeWidth={1.75} />
              <span>
                <Link href="/my-library">My Library{saved.length ? ` (${saved.length} saved)` : ""}</Link> keeps what you save and start, on this device.
              </span>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
