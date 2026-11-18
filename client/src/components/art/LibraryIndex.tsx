/**
 * LibraryIndex: the body of a library's index page (/life, /how-tos, /plans,
 * /studyguides), built the way a door's page is (README, "How a door's page is
 * built"): first the one thing to do, a find box on a charcoal band with the
 * groups as chips; then the items as icon cards, each group a section of its
 * own. Typing or choosing a group narrows the list to one section and says
 * how many match.
 *
 * The chip chosen can ride in the address (`param`, ?topic=marriage), so a
 * link can open the page on one group. Loading, failed and empty are three
 * different states (LoadFailed offers a retry and a way back).
 */
import { useMemo, useState, type ReactNode } from "react";
import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import { Search } from "lucide-react";
import SectionHead from "./SectionHead";
import LoadFailed from "@/components/LoadFailed";
import { hasWordStarts, queryWords } from "@/lib/siteSearch";
import "@/pages/home/home.css";
import "./inner.css";

export interface LibItem {
  href: string;
  title: string;
  line?: string | null;
  meta?: ReactNode;
  group?: string;
  /** More words the find box should match (a plan's need, a guide's audience). */
  keywords?: string;
}

export interface LibGroup {
  id: string;
  name: string;
  icon: LucideIcon;
}

function readParam(param: string | undefined, groups: LibGroup[]): string {
  if (!param) return "all";
  try {
    const v = new URLSearchParams(window.location.search).get(param);
    return v && groups.some((g) => g.id === v) ? v : "all";
  } catch {
    return "all";
  }
}

export function LibCard({ item, icon: Icon }: { item: LibItem; icon: LucideIcon }) {
  return (
    <Link href={item.href} className="lw-index__card">
      <span className="lw-tile__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <span className="lw-index__text">
        <span className="lw-index__name">{item.title}</span>
        {item.line && <span className="lw-index__line">{item.line}</span>}
        {item.meta && <span className="lw-index__meta">{item.meta}</span>}
      </span>
    </Link>
  );
}

export default function LibraryIndex({
  id,
  items,
  failed,
  groups = [],
  icon,
  noun,
  findLabel,
  placeholder,
  bandTitle,
  param,
  none,
}: {
  /** A short prefix for ids on the page ("howtos"). */
  id: string;
  /** null while loading. */
  items: LibItem[] | null;
  failed?: { what: string; onRetry: () => void; backHref: string; backLabel: string } | null;
  groups?: LibGroup[];
  /** The icon for an item outside every group. */
  icon: LucideIcon;
  /** Singular and plural: ["guide", "guides"]. */
  noun: [string, string];
  findLabel: string;
  placeholder: string;
  bandTitle: string;
  param?: string;
  /** What to offer when nothing matches. */
  none?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(() => readParam(param, groups));
  const choose = (g: string) => {
    setActive(g);
    if (!param) return;
    try {
      const url = new URL(window.location.href);
      if (g === "all") url.searchParams.delete(param);
      else url.searchParams.set(param, g);
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch {
      /* the filter still works without the address */
    }
  };

  const present = useMemo(() => groups.filter((g) => (items ?? []).some((i) => i.group === g.id)), [groups, items]);
  const words = queryWords(query);
  const searching = words.length > 0;
  const shown = useMemo(() => {
    if (!items) return [];
    return items.filter(
      (i) => (active === "all" || i.group === active) && (!searching || hasWordStarts(`${i.title} ${i.line ?? ""} ${i.keywords ?? ""}`, words)),
    );
    // words is derived from query
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, active, query]);
  const iconFor = (g?: string) => present.find((x) => x.id === g)?.icon ?? icon;
  const n = items?.length ?? 0;
  const filtered = searching || active !== "all";
  const plural = (k: number) => (k === 1 ? noun[0] : noun[1]);

  return (
    <>
      <section className="home-sec home-sec--dark lw-band-tight" aria-labelledby={`${id}-find-title`}>
        <div className="home-wrap">
          <SectionHead dark icon={Search} label={items ? `${n} ${plural(n)}` : findLabel} title={bandTitle} id={`${id}-find-title`} />
          <div className="lw-find" role="search">
            <label htmlFor={`${id}-find`} className="lw-find__label">
              {findLabel}
            </label>
            <div className="lw-find__field">
              <Search size={20} strokeWidth={1.75} aria-hidden="true" />
              <input id={`${id}-find`} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} autoComplete="off" />
            </div>
          </div>
          {/* Always on the page, so a screen reader hears each new count. */}
          <p role="status" className="lw-find__status">
            {!items && !failed ? "Loading…" : filtered && items ? (shown.length ? `Showing ${shown.length} of ${n} ${noun[1]}.` : `No ${noun[0]} matches.`) : ""}
          </p>
          {present.length > 1 && (
            <div className="lw-chips" role="group" aria-label={`Show ${noun[1]} by subject`}>
              {[{ id: "all", name: "All", icon: null as LucideIcon | null }, ...present].map((g) => {
                const Icon = g.icon;
                const count = g.id === "all" ? n : (items ?? []).filter((i) => i.group === g.id).length;
                return (
                  <button key={g.id} type="button" className="lw-chip" aria-pressed={g.id === active} onClick={() => choose(g.id)}>
                    {Icon && <Icon size={18} strokeWidth={1.75} aria-hidden="true" />}
                    {g.name}
                    <span className="lw-chip__n">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {failed && (
        <section className="home-sec">
          <div className="home-wrap">
            <LoadFailed what={failed.what} onRetry={failed.onRetry} backHref={failed.backHref} backLabel={failed.backLabel} />
          </div>
        </section>
      )}

      {items && !failed && !filtered && present.length > 0 &&
        present.map((g, i) => {
          const list = items.filter((x) => x.group === g.id);
          return (
            <section key={g.id} id={`${id}-${g.id}`} className={`home-sec lw-group${i % 2 ? " home-sec--warm" : ""}`} aria-labelledby={`${id}-${g.id}-title`}>
              <div className="home-wrap">
                <SectionHead icon={g.icon} label={`${list.length} ${plural(list.length)}`} title={g.name} id={`${id}-${g.id}-title`} />
                <ul className="lw-index">
                  {list.map((item) => (
                    <li key={item.href}>
                      <LibCard item={item} icon={g.icon} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

      {items && !failed && (filtered || present.length === 0) && (
        <section className="home-sec" aria-labelledby={`${id}-list-title`}>
          <div className="home-wrap">
            <h2 id={`${id}-list-title`} className="sr-only">
              {filtered ? `Matching ${noun[1]}` : `Every ${noun[0]}`}
            </h2>
            {shown.length ? (
              <ul className="lw-index">
                {shown.map((item) => (
                  <li key={item.href}>
                    <LibCard item={item} icon={iconFor(item.group)} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="lw-none">{none}</div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
