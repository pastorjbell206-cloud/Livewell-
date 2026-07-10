/**
 * The Leadership Library (/leadership/library). A searchable, filterable index
 * of the whole leadership article corpus. Driven by a manifest at
 * client/public/leadership/articles-index.json, which is generated from the
 * article JSON files by scripts/build-leadership-index.mjs. Each card links to
 * the existing /leadership/article/:slug renderer.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { GeneratedCover, coverThemeFor } from "@/components/GeneratedCover";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Entry { slug: string; title: string; blurb: string; group: string; }

export default function LeadershipLibrary() {
  const [items, setItems] = useState<Entry[]>([]);
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string | null>(null);

  useEffect(() => {
    fetch("/leadership/articles-index.json").then((r) => (r.ok ? r.json() : null)).then((d) => d && setItems(d.articles || d)).catch(() => {});
  }, []);

  const groups = useMemo(() => Array.from(new Set(items.map((i) => i.group))).sort(), [items]);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => {
      if (group && i.group !== group) return false;
      if (!needle) return true;
      return (i.title + " " + i.blurb + " " + i.group).toLowerCase().includes(needle);
    });
  }, [items, q, group]);

  return (
    <Layout>
      <SEOMeta title="The Leadership Library — Articles for Pastors and Church Leaders" description="A searchable library on leadership formation, church leadership, preaching, and exegesis, for the working pastor and the lay leader. Plain, serious, useful." url="https://www.livewellbyjamesbell.co/leadership/library" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The library</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.03em", marginBottom: "16px", maxWidth: "20ch" }}>The whole library, in one place.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>Everything written here for the people who carry a church. Formation, leadership, preaching, and the careful handling of the text. Search it, or work through a category.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <div style={{ position: "relative", marginBottom: "var(--s-3)" }}>
            <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the library" placeholder="Search the library"
              style={{ width: "100%", fontFamily: "var(--B)", fontSize: "16px", padding: "12px 14px 12px 42px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "var(--s-4)" }}>
            <Chip active={!group} onClick={() => setGroup(null)}>All ({items.length})</Chip>
            {groups.map((g) => <Chip key={g} active={group === g} onClick={() => setGroup(group === g ? null : g)}>{g}</Chip>)}
          </div>

          {!items.length && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(380px, 100%), 1fr))", gap: "14px" }}>
            {filtered.map((a) => (
              <Link key={a.slug} href={`/leadership/article/${a.slug}`} style={{ display: "flex", gap: "16px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", textDecoration: "none", color: "inherit", height: "100%" }}>
                <div style={{ width: "104px", flexShrink: 0, alignSelf: "flex-start", aspectRatio: "3 / 4", overflow: "hidden" }}>
                  <GeneratedCover title={a.title} {...coverThemeFor(`${a.title} ${a.group}`)} style={{ width: "100%", height: "100%" }} />
                </div>
                <div style={{ padding: "var(--s-4) var(--s-4) var(--s-4) 0" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "6px" }}>{a.group}</div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>{a.title}</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{a.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
          {items.length > 0 && filtered.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Nothing matches that yet.</p>}
        </div>
      </section>
    </Layout>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "7px 14px", borderRadius: "999px", cursor: "pointer", border: "1px solid " + (active ? "var(--mustard)" : "var(--border)"), background: active ? "var(--mustard)" : "var(--card)", color: active ? "var(--charcoal)" : "var(--ink-muted)" }}>{children}</button>;
}
