/**
 * /explore — The Library: everything James Bell has published on the site, in
 * one searchable place.
 *
 * Reads one file, /catalogue/index.json, built on every deploy by
 * scripts/build-catalogue.mjs (essays from the database, every static library,
 * the books, the booklets, the answers, the guides). The interactive tools are
 * added from the ToolsHub registry, and essays published since the last deploy
 * are merged in live from the database so the Library never lags the writing.
 *
 * (The Library lives at /explore because /library is The Commonplace, an
 * indexed page whose URL does not change.)
 *
 * Every filter is in the URL (?q=&kind=&subject=&length=&dl=1), so any view of
 * the Library can be linked, bookmarked, or sent to a friend.
 */
import { useDeferredValue, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { Search as SearchIcon, Download } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { SITE_URL } from "@/lib/site";
import { trpc } from "@/lib/trpc";
import { TOOLS } from "@/pages/ToolsHub";
import {
  buildIndex,
  fetchCatalogue,
  formatBytes,
  kindPlural,
  kindRank,
  lengthBand,
  LENGTH_LABELS,
  search,
  type Catalogue,
  type CatalogueItem,
  type LengthBand,
} from "@/lib/catalogue";

const PAGE = 40;

const TOOL_ITEMS: CatalogueItem[] = TOOLS.map((t) => ({
  kind: "Tool",
  title: t.title,
  // Drop the "Part of the … section." tail some descriptions carry.
  summary: t.description.replace(/\s*Part of [^.]*\.\s*$/i, "").trim(),
  href: t.href,
}));

interface Filters {
  q: string;
  kind: string;
  subject: string;
  length: LengthBand | "";
  dl: boolean;
}

function readFilters(): Filters {
  const p = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const length = p.get("length");
  return {
    q: p.get("q") ?? "",
    kind: p.get("kind") ?? "",
    subject: p.get("subject") ?? "",
    length: length === "short" || length === "medium" || length === "long" ? length : "",
    dl: p.get("dl") === "1",
  };
}

function writeFilters(f: Filters) {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.kind) p.set("kind", f.kind);
  if (f.subject) p.set("subject", f.subject);
  if (f.length) p.set("length", f.length);
  if (f.dl) p.set("dl", "1");
  const qs = p.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

const monthYear = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

function useWide(minWidth = 900) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, [minWidth]);
  return wide;
}

export default function Explore() {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [filters, setFilters] = useState<Filters>(readFilters);
  const [shown, setShown] = useState(PAGE);
  const wide = useWide();

  useEffect(() => {
    let stale = false;
    fetchCatalogue()
      .then((c) => { if (!stale) setCatalogue(c); })
      .catch(() => { if (!stale) setFailed(true); });
    return () => { stale = true; };
  }, [nonce]);

  // Essays published since the last deploy, merged in from the database.
  const live = trpc.posts.listPublished.useQuery(undefined, { enabled: catalogue !== null });

  const items = useMemo<CatalogueItem[]>(() => {
    if (!catalogue) return [];
    const have = new Set(catalogue.items.map((i) => i.href));
    const fresh: CatalogueItem[] = [];
    for (const p of ((live.data as unknown[]) ?? []) as Record<string, unknown>[]) {
      const slug = typeof p?.slug === "string" ? p.slug : "";
      const title = typeof p?.title === "string" ? p.title : "";
      if (!slug || !title || have.has(`/writing/${slug}`)) continue;
      const when = p.publishedAt ? new Date(p.publishedAt as string) : null;
      const date = when && !Number.isNaN(when.getTime()) ? when.toISOString().slice(0, 10) : undefined;
      fresh.push({
        kind: "Essay",
        title,
        href: `/writing/${slug}`,
        summary: typeof p.excerpt === "string" ? p.excerpt.slice(0, 160) : undefined,
        group: typeof p.pillar === "string" ? p.pillar : undefined,
        minutes: typeof p.readingTimeMinutes === "number" ? p.readingTimeMinutes : undefined,
        date,
      });
    }
    return [...fresh, ...catalogue.items, ...TOOL_ITEMS];
  }, [catalogue, live.data]);

  const index = useMemo(() => buildIndex(items), [items]);
  const q = useDeferredValue(filters.q);
  const found = useMemo(() => search(index, q), [index, q]);

  // Facet counts come from the search results, so every count is honest for
  // the words typed; each facet ignores its own selection when counting.
  const byKind = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of found.results) {
      if (filters.dl && !it.files?.length) continue;
      m.set(it.kind, (m.get(it.kind) ?? 0) + 1);
    }
    return Array.from(m.entries()).sort((a, b) => kindRank(a[0]) - kindRank(b[0]));
  }, [found, filters.dl]);

  const inKind = useMemo(
    () => found.results.filter((it) => (!filters.kind || it.kind === filters.kind) && (!filters.dl || it.files?.length)),
    [found, filters.kind, filters.dl]
  );

  const subjects = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of inKind) if (it.group) m.set(it.group, (m.get(it.group) ?? 0) + 1);
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [inKind]);

  const hasLengths = useMemo(() => inKind.some((it) => it.minutes), [inKind]);

  const results = useMemo(
    () =>
      inKind.filter(
        (it) =>
          (!filters.subject || it.group === filters.subject) &&
          (!filters.length || lengthBand(it.minutes) === filters.length)
      ),
    [inKind, filters.subject, filters.length]
  );

  const idle = !filters.q.trim() && !filters.kind && !filters.subject && !filters.length && !filters.dl;
  const fileCount = useMemo(() => items.reduce((n, it) => n + (it.files?.length ?? 0), 0), [items]);

  const update = (patch: Partial<Filters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      // A subject belongs to a kind; changing the kind clears it.
      if (patch.kind !== undefined && patch.kind !== prev.kind) next.subject = "";
      writeFilters(next);
      return next;
    });
    setShown(PAGE);
  };

  return (
    <Layout>
      <SEOMeta
        title="Explore Everything — The full catalogue | James Bell"
        description="Every essay, tool, study guide, book, creed, and course in one searchable place. Filter by type or search across all of it — the whole library, one front door."
        url={`${SITE_URL}/explore`}
      />

      {/* HEADER + SEARCH */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "14px" }}>The Library</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.08, color: "var(--ink)", marginBottom: "14px" }}>
            Everything, in one place.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            {catalogue
              ? `${items.length.toLocaleString()} essays, books, study guides, and more, with ${fileCount} free files to download. Search across all of it, or narrow it by kind.`
              : "Every essay, book, study guide, and download on the site, searchable in one place."}
          </p>

          <div role="search" style={{ position: "relative", maxWidth: "720px" }}>
            <SearchIcon size={18} aria-hidden style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
            <label htmlFor="library-search" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Search the Library
            </label>
            <input
              id="library-search"
              type="search"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="A topic, a title, a Bible passage: marriage, Nicaea, Romans 8…"
              autoComplete="off"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "15px 16px 15px 46px",
                fontFamily: "var(--B)",
                fontSize: "16px",
                color: "var(--ink)",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "0 var(--s-3) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {failed && !catalogue ? (
            <LoadFailed
              what="The Library"
              onRetry={() => { setFailed(false); setNonce((n) => n + 1); }}
              backHref="/writing"
              backLabel="Browse the essays instead"
            />
          ) : !catalogue ? (
            <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", padding: "var(--s-5) 0" }}>Opening the Library…</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-5)", alignItems: "flex-start" }}>
              {/* FILTERS */}
              <details open={wide || undefined} style={{ flex: "1 1 220px", maxWidth: wide ? "240px" : "none", position: wide ? "sticky" : "static", top: "88px" }}>
                <summary style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", cursor: "pointer", padding: "10px 0", listStyle: wide ? "none" : undefined }}>
                  Filter the Library
                </summary>

                <FacetHeading>Kind</FacetHeading>
                <ul style={{ listStyle: "none", margin: "0 0 var(--s-4)", padding: 0 }}>
                  <FacetRow label="Everything" count={byKind.reduce((n, [, c]) => n + c, 0)} active={!filters.kind} onClick={() => update({ kind: "" })} />
                  {byKind.map(([kind, count]) => (
                    <FacetRow key={kind} label={kindPlural(kind)} count={count} active={filters.kind === kind} onClick={() => update({ kind: filters.kind === kind ? "" : kind })} />
                  ))}
                </ul>

                {subjects.length > 1 && (
                  <>
                    <FacetHeading htmlFor="library-subject">Subject</FacetHeading>
                    <select
                      id="library-subject"
                      value={filters.subject}
                      onChange={(e) => update({ subject: e.target.value })}
                      style={{ width: "100%", padding: "9px 10px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", marginBottom: "var(--s-4)" }}
                    >
                      <option value="">All subjects</option>
                      {subjects.map(([s, n]) => (
                        <option key={s} value={s}>{s} ({n})</option>
                      ))}
                    </select>
                  </>
                )}

                {hasLengths && (
                  <>
                    <FacetHeading>Length</FacetHeading>
                    <ul style={{ listStyle: "none", margin: "0 0 var(--s-4)", padding: 0 }}>
                      <FacetRow label="Any length" active={!filters.length} onClick={() => update({ length: "" })} />
                      {(Object.keys(LENGTH_LABELS) as LengthBand[]).map((b) => (
                        <FacetRow key={b} label={LENGTH_LABELS[b]} active={filters.length === b} onClick={() => update({ length: filters.length === b ? "" : b })} />
                      ))}
                    </ul>
                  </>
                )}

                <label style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink)", cursor: "pointer" }}>
                  <input type="checkbox" checked={filters.dl} onChange={(e) => update({ dl: e.target.checked })} style={{ width: "18px", height: "18px", accentColor: "var(--ink)" }} />
                  Only things I can download
                </label>
                <Link href="/downloads" style={{ display: "inline-block", marginTop: "6px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
                  All downloads on one shelf
                </Link>
              </details>

              {/* RESULTS */}
              <div style={{ flex: "999 1 480px", minWidth: 0 }}>
                <p role="status" style={{ fontFamily: "var(--U)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-muted)", margin: "10px 0 var(--s-3)" }}>
                  {results.length === 0
                    ? "Nothing matches. Try a broader word, or clear a filter."
                    : idle
                      ? "Everything, newest writing first"
                      : `${results.length.toLocaleString()} ${results.length === 1 ? "result" : "results"}`}
                </p>
                {found.corrected.length > 0 && (
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
                    Showing results for{" "}
                    <strong>{found.corrected.map((c) => c.to).join(", ")}</strong>
                    {" "}instead of <em>{found.corrected.map((c) => c.from).join(", ")}</em>.
                  </p>
                )}
                {found.partial && (
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
                    Nothing matched every word, so the closest matches come first.
                  </p>
                )}

                <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border)" }}>
                  {results.slice(0, shown).map((it) => (
                    <ResultRow key={`${it.kind}|${it.href}|${it.title}`} item={it} />
                  ))}
                </ol>

                {results.length > shown && (
                  <button
                    type="button"
                    onClick={() => setShown((n) => n + PAGE)}
                    style={{ marginTop: "var(--s-4)", padding: "12px 22px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
                  >
                    Show {Math.min(PAGE, results.length - shown)} more
                    <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}> of {(results.length - shown).toLocaleString()} remaining</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function FacetHeading({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  const style = { display: "block", fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--mustard-text)", margin: "var(--s-3) 0 8px" };
  return htmlFor ? <label htmlFor={htmlFor} style={style}>{children}</label> : <div style={style}>{children}</div>;
}

function FacetRow({ label, count, active, onClick }: { label: string; count?: number; active: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          minHeight: "36px",
          alignItems: "center",
          padding: "6px 10px",
          margin: "1px 0",
          fontFamily: "var(--U)",
          fontSize: "14px",
          fontWeight: active ? 600 : 400,
          textAlign: "left",
          color: "var(--ink)",
          background: active ? "var(--bone-warm)" : "transparent",
          border: "none",
          borderLeft: active ? "2px solid var(--mustard)" : "2px solid transparent",
          borderRadius: 0,
          cursor: "pointer",
        }}
      >
        <span>{label}</span>
        {count !== undefined && <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>{count.toLocaleString()}</span>}
      </button>
    </li>
  );
}

function ResultRow({ item }: { item: CatalogueItem }) {
  const meta = [
    item.minutes ? `${item.minutes} min read` : "",
    item.period ?? "",
    monthYear(item.date),
  ].filter(Boolean);
  return (
    <li style={{ padding: "var(--s-4) 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "6px" }}>
        {item.kind}
        {item.group ? <span style={{ color: "var(--ink-muted)", fontWeight: 500 }}> · {item.group}</span> : null}
      </div>
      <h2 style={{ margin: "0 0 6px", fontFamily: "var(--F)", fontSize: "clamp(1.25rem, 2.2vw, 1.45rem)", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
        <Link href={item.href} style={{ color: "var(--ink)", textDecoration: "none" }}>{item.title}</Link>
      </h2>
      {item.summary && (
        <p style={{ margin: "0 0 8px", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "68ch" }}>{item.summary}</p>
      )}
      {(meta.length > 0 || item.files?.length || item.access === "paid") && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
          {meta.length > 0 && <span>{meta.join(" · ")}</span>}
          {item.files?.map((f) => (
            <a
              key={f.href}
              href={f.href}
              download
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", minHeight: "32px", color: "var(--ink)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}
            >
              <Download size={13} aria-hidden />
              {f.label}
              {f.bytes ? <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>{formatBytes(f.bytes)}</span> : null}
            </a>
          ))}
          {item.access === "paid" && <span style={{ color: "var(--ink)" }}>Book · for purchase</span>}
        </div>
      )}
    </li>
  );
}
