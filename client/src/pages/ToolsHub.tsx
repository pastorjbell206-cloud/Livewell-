import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { useFavorites } from "@/hooks/useFavorites";
import { useMemo, useState } from "react";
import { useLibrary } from "@/lib/library";
import { hasWordStarts, queryWords } from "@/lib/siteSearch";

import { TOOLS, TOOL_GROUPS } from "@/lib/toolsList";

// The list lives in lib/toolsList.ts; these names stay exported here for older importers.
export { TOOLS, TOOL_GROUPS };


/** Tiles that open something to read say "Read"; the rest are tools you work, and say "Start". */
const READING_PAGES = new Set(["/wisdom", "/resources/context", "/tools/quotes", "/tools/glossary", "/tools/bible-study", "/tools/deep-bible", "/tools/bible-says", "/tools/bible-on", "/tools/parenting-guide", "/tools/parenting-verses", "/tools/proverbs-31"]);

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** A tool matches when every word of the query is in its name or description. */
function toolMatches(tool: (typeof TOOLS)[number], q: string): boolean {
  const words = queryWords(q);
  return words.length > 0 && hasWordStarts(`${tool.title} ${tool.description}`, words);
}

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="tool-card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "clamp(18px, 3vw, 28px)",
        background: "var(--card)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        borderLeft: `4px solid ${tool.color}`,
        textDecoration: "none",
        minHeight: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
        <Icon size={24} aria-hidden style={{ color: tool.color, flexShrink: 0 }} />
        <h3 style={{ fontSize: "21px", fontWeight: 500, fontFamily: "var(--F)", color: "var(--ink)", lineHeight: 1.2, margin: 0 }}>{tool.title}</h3>
      </div>
      <p className="tool-card-dek" style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", fontFamily: "var(--B)", margin: 0 }}>
        {tool.description}
      </p>
      <div style={{ marginTop: "auto", paddingTop: "14px", fontSize: "14px", fontWeight: 600, color: "var(--mustard-text)", fontFamily: "var(--U)" }}>
        {READING_PAGES.has(tool.href) ? "Read" : "Start"} <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

export default function ToolsHub() {
  const verses = useFavorites("livewell-saved-verses");
  const prayers = useFavorites("livewell-saved-prayers");
  const totalSaved = verses.favorites.length + prayers.favorites.length;
  const saved = useLibrary();
  const [query, setQuery] = useState("");
  const found = useMemo(() => (query.trim() ? TOOLS.filter((t) => toolMatches(t, query)) : []), [query]);
  const searching = query.trim().length > 0;

  return (
    <Layout>
      <SEOMeta
        title="Free Bible Study, Prayer, and Family Tools"
        description="Free tools for Bible study, prayer, marriage, and family life: a verse finder, written prayers, a family devotion builder, and self-checks."
        keywords="Bible verse finder, prayer generator, family devotions, Christian tools, marriage tools, parenting tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free Bible Study, Prayer, and Family Tools",
          description: "Free tools for families and anyone practicing the faith.",
          url: "https://www.livewellbyjamesbell.co/tools",
        }}
      />
      <style>{`
        .tool-card:hover, .tool-card:focus-visible { border-color: var(--mustard); }
        @media (max-width: 640px) {
          .tool-card-dek { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--gutter) var(--s-5)", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            FREE TOOLS
          </div>
          <h1 style={{ fontSize: "var(--fs-h1)", fontWeight: 400, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "16px" }}>
            Free tools for Bible study, prayer, and family life
          </h1>
          <p className="page-standfirst" style={{ marginInline: "auto" }}>Tools you can use this week.</p>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", fontFamily: "var(--B)", margin: "0 0 var(--s-4)" }}>
            Built for marriages, households, and anyone who wants to practice the faith in an ordinary week. Every one is free and works on your phone, and the journals and planners keep what you write on your own device.
          </p>
          <label htmlFor="tool-find" style={{ display: "block", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--charcoal-fg)", marginBottom: "8px", textAlign: "left" }}>
            Find a tool
          </label>
          <input
            id="tool-find"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: prayer, worry, marriage"
            autoComplete="off"
            style={{ width: "100%", minHeight: "52px", padding: "12px 16px", fontSize: "17px", fontFamily: "var(--B)", borderRadius: "var(--radius-sm)", border: "1px solid var(--charcoal-line)", background: "var(--charcoal-fg)", color: "var(--charcoal)" }}
          />
        </div>
      </section>

      <section style={{ padding: "var(--s-5) var(--gutter) var(--s-6)", background: "var(--bone)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Link href="/my-library" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", minHeight: "52px", padding: "12px 16px", marginBottom: "var(--s-5)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600 }}>
            <span>My Library{saved.length ? ` (${saved.length} saved)` : ""}: what you've saved and started, on this device</span>
            <span aria-hidden style={{ color: "var(--mustard-text)" }}>→</span>
          </Link>

          {/* Always on the page, so a screen reader hears each new count. */}
          <p role="status" style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: searching ? "0 0 var(--s-3)" : 0 }}>
            {searching ? (found.length ? `${found.length} ${found.length === 1 ? "tool matches" : "tools match"} "${query.trim()}"` : `No tool matches "${query.trim()}".`) : ""}
          </p>
          {searching ? (
            <div>
              {found.length ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
                  {found.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
                </div>
              ) : (
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>
                  Try another word, <Link href={`/search?q=${encodeURIComponent(query.trim())}`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>search the whole site</Link>, or start at <Link href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Find Help</Link> with what you're facing.
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Jump to a group: on a phone the list is long, so the groups are one tap away. */}
              <nav aria-label="Tool groups" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "var(--s-5)" }}>
                {TOOL_GROUPS.map((g) => (
                  <a key={g.title} href={`#${slug(g.title)}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", background: "var(--card)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>
                    {g.title} <span style={{ color: "var(--ink-muted)", fontWeight: 500, marginLeft: "6px" }}>{g.tools.length}</span>
                  </a>
                ))}
              </nav>
              {/* Tools, in the order a person actually needs them: an honest reading
                  first, then the Word, then wisdom for the situation, then the
                  household, then the public square. Grouping lives in TOOL_GROUPS. */}
              {TOOL_GROUPS.map((group) => (
                <div key={group.title} id={slug(group.title)} style={{ marginBottom: "var(--s-6)", scrollMarginTop: "80px" }}>
                  <h2 className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "6px" }}>{group.title}</h2>
                  <div style={{ width: "40px", height: "1px", background: "var(--mustard)", marginBottom: "18px" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
                    {group.tools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
                  </div>
                </div>
              ))}
            </>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", justifyContent: "center", marginTop: "var(--s-4)" }}>
            <Link href="/my-library" style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--mustard-text)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              My Library
            </Link>
            <Link href="/tools/saved" style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--mustard-text)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              {totalSaved > 0 ? `Saved verses and prayers (${totalSaved})` : "Saved verses and prayers"}
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
