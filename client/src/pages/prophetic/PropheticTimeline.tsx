/**
 * The Injustice Timeline (/justice/timeline). A long, honest reckoning with the
 * injustices of history: those committed in the name of Christ and by the
 * church, those of empire and colonialism, those of unrestrained markets and
 * greed, and those of communism and forced utopia and nationalism. The point is
 * the prophetic thesis made visible: no human system, and no tribe, and not the
 * church itself, is the kingdom of God. The cross judges them all. Filterable by
 * category, chronological. Data: /justice/timeline.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Event { year: string; sortYear: number; era: string; title: string; category: string; summary: string; scale: string; theReckoning: string; }
interface Data { intro: string; events: Event[]; closing: string; }

const CATEGORIES: Record<string, { label: string; color: string }> = {
  church: { label: "In the Name of Christ", color: "#7A1F1F" },
  empire: { label: "Empire and Colonialism", color: "#5A4A2A" },
  capitalism: { label: "Markets and Greed", color: "#8A5A00" },
  communism: { label: "Communism and Forced Utopia", color: "#5A2A6A" },
  nation: { label: "Nation and Ideology", color: "#2A4A6A" },
};

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function PropheticTimeline() {
  const [data, setData] = useState<Data | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/justice/timeline.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);

  const events = useMemo(() => {
    const all = [...(data?.events ?? [])].sort((a, b) => a.sortYear - b.sortYear);
    return filter === "all" ? all : all.filter((e) => e.category === filter);
  }, [data, filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of data?.events ?? []) c[e.category] = (c[e.category] ?? 0) + 1;
    return c;
  }, [data]);

  return (
    <Layout>
      <SEOMeta
        title="The Injustice Timeline — An Honest Reckoning"
        description="A long, honest reckoning with the injustices of history: those done in the name of Christ, of empire, of markets, of forced utopia. No system is the kingdom."
        url="https://www.livewellbyjamesbell.co/justice/timeline"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/justice" style={{ color: "inherit" }}>Prophetic Justice</Link> · The injustice timeline
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "18ch" }}>
            No one's hands are clean.
          </h1>
          {data && (
            <div style={{ maxWidth: "64ch" }}>
              {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", marginBottom: "12px" }}>{p}</p>)}
            </div>
          )}
        </div>
      </section>

      {/* FILTERS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"}
            style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "8px 14px", borderRadius: "999px", cursor: "pointer", border: `1px solid ${filter === "all" ? "var(--mustard)" : "var(--border)"}`, background: filter === "all" ? "var(--bone-warm)" : "transparent", color: "var(--ink)" }}>
            All{data ? ` · ${data.events.length}` : ""}
          </button>
          {Object.entries(CATEGORIES).map(([id, c]) => counts[id] ? (
            <button key={id} type="button" onClick={() => setFilter(id)} aria-pressed={filter === id}
              style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "8px 14px", borderRadius: "999px", cursor: "pointer", border: `1px solid ${filter === id ? c.color : "var(--border)"}`, background: filter === id ? c.color : "transparent", color: filter === id ? "var(--bone)" : "var(--ink)" }}>
              {c.label} · {counts[id]}
            </button>
          ) : null)}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {!data && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading the reckoning…</p>}
          <div style={{ borderLeft: "2px solid var(--border)", marginLeft: "8px", display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "0" }}>
            {events.map((e, i) => {
              const cat = CATEGORIES[e.category] ?? { label: e.category, color: "var(--ink-muted)" };
              return (
                <div key={i} style={{ position: "relative", paddingLeft: "26px" }}>
                  <span aria-hidden style={{ position: "absolute", left: "-7px", top: "8px", width: "12px", height: "12px", borderRadius: "50%", background: cat.color, border: "2px solid var(--bone)" }} />
                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: `3px solid ${cat.color}`, borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}>{e.title}</span>
                      <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", color: cat.color }}>{e.year}</span>
                    </div>
                    <span style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: cat.color, background: `${cat.color}1A`, borderRadius: "999px", padding: "3px 10px", marginBottom: "10px" }}>{cat.label}</span>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: e.scale ? "8px" : "10px" }}>{e.summary}</p>
                    {e.scale && <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "10px" }}><strong style={{ color: "var(--ink)" }}>Scale. </strong>{e.scale}</p>}
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", fontStyle: "italic", borderTop: "1px solid var(--border)", paddingTop: "10px" }}>{e.theReckoning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      {data?.closing && (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--charcoal-fg)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>The verdict</div>
            {data.closing.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, lineHeight: 1.5, color: "var(--charcoal-fg)", maxWidth: "60ch", marginBottom: "14px" }}>{p}</p>)}
            <div style={{ marginTop: "var(--s-4)", display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/disruption" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Prophetic Disruption →</Link>
              <Link href="/justice" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Prophetic Justice →</Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
