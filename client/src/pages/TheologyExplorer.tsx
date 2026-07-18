import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TriageBadge } from "@/components/TriageBadge";
import { DOCTRINE_INDEX, TRIAGE, type Triage, type DoctrineIndexEntry } from "@/lib/theology";

/**
 * The Doctrine Explorer (/theology/explorer) — the one filterable landscape
 * over the whole contested-doctrine set (board audit P17). The per-doctrine
 * pages, the side-by-side compare, and the pillar-grouped hub already exist;
 * what was missing is a single place to sort the whole field by how much it
 * actually binds — first-order (the creeds), second (divides churches, not
 * the faith), third (room inside one congregation) — which is the discipline
 * the whole section teaches. Filter by order, search by name, jump to the
 * worked page or the side-by-side comparison.
 *
 * Renders from DOCTRINE_INDEX (no fetch): the landscape is index metadata;
 * the depth lives one click away on each doctrine's own page.
 */

const ORDER_FILTERS: { id: Triage | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "first-order", label: "First order" },
  { id: "second-order", label: "Second order" },
  { id: "third-order", label: "Third order" },
];

const TRIAGE_RANK: Record<Triage, number> = { "first-order": 0, "second-order": 1, "third-order": 2 };

export default function TheologyExplorer() {
  const [order, setOrder] = useState<Triage | "all">("all");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return DOCTRINE_INDEX
      .filter((d) => (order === "all" ? true : d.triage === order))
      .filter((d) => (needle ? (d.title + " " + d.blurb + " " + d.pillar).toLowerCase().includes(needle) : true))
      .sort((a, b) => TRIAGE_RANK[a.triage] - TRIAGE_RANK[b.triage] || Number(b.ready) - Number(a.ready) || a.title.localeCompare(b.title));
  }, [order, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: DOCTRINE_INDEX.length };
    for (const t of Object.keys(TRIAGE) as Triage[]) c[t] = DOCTRINE_INDEX.filter((d) => d.triage === t).length;
    return c;
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="The Doctrine Explorer — Every Contested Doctrine, Sorted by Weight"
        description="Filter every contested doctrine by how much it binds: first order the creeds hold, second that divides churches, third with room in one pew. Search and compare."
        url="https://www.livewellbyjamesbell.co/theology/explorer"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · The Explorer
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Every doctrine, sorted by how much it binds
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.82)", maxWidth: "60ch" }}>
            Before you argue a doctrine, know what kind of doctrine it is. Some are the faith itself, fixed at Nicaea and Chalcedon. Some divide faithful churches without dividing the faith. Some have room inside a single pew. Confusing the three is how a third-order preference gets defended like a first-order truth — and how the church splits over things it was never meant to split over.
          </p>
        </div>
      </section>

      {/* CONTROLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div role="group" aria-label="Filter by order" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {ORDER_FILTERS.map((f) => {
                const active = order === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setOrder(f.id)}
                    aria-pressed={active}
                    style={{
                      fontFamily: "var(--U)", fontSize: "13px", fontWeight: 500,
                      padding: "8px 14px", cursor: "pointer",
                      border: `1px solid ${active ? "var(--ink)" : "rgba(20,17,12,0.18)"}`,
                      background: active ? "var(--ink)" : "transparent",
                      color: active ? "var(--bone)" : "var(--ink-muted)",
                      borderRadius: "2px",
                    }}
                  >
                    {f.label} <span style={{ opacity: 0.6 }}>· {counts[f.id]}</span>
                  </button>
                );
              })}
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(20,17,12,0.18)", padding: "8px 12px", background: "var(--card)", borderRadius: "2px" }}>
              <Search size={15} aria-hidden style={{ color: "var(--ink-muted)" }} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search doctrines…"
                aria-label="Search doctrines by name"
                style={{ border: "none", outline: "none", background: "transparent", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink)", width: "180px" }}
              />
            </label>
          </div>
          {order !== "all" && (
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "12px", marginBottom: 0 }}>
              {TRIAGE[order].label}: {TRIAGE[order].short}.
            </p>
          )}
        </div>
      </section>

      {/* THE LANDSCAPE */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-6)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {shown.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", padding: "var(--s-5) 0", textAlign: "center" }}>
              No doctrine matches that. <button onClick={() => { setQ(""); setOrder("all"); }} style={{ background: "none", border: "none", color: "var(--mustard-text)", cursor: "pointer", fontFamily: "var(--U)", fontWeight: 600, textDecoration: "underline" }}>Clear the filters.</button>
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginTop: "20px" }}>
              {shown.map((d) => <DoctrineCard key={d.slug} d={d} />)}
            </div>
          )}
        </div>
      </section>

      {/* ONWARD */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "19px", fontStyle: "italic", lineHeight: 1.5, color: "rgba(245,240,230,0.9)", margin: 0, maxWidth: "34ch" }}>
            Not sure where you land? The section will not tell you what to think. It will show you the room.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/theology/which-view" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Take the which-view diagnostic</Link>
            <Link href="/theology/compare" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Compare positions side by side</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function DoctrineCard({ d }: { d: DoctrineIndexEntry }) {
  const inner = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
        <TriageBadge triage={d.triage} />
        <span style={{ fontFamily: "var(--U)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", opacity: 0.7 }}>{d.pillar}</span>
      </div>
      <h2 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, lineHeight: 1.2, color: "var(--ink)", marginBottom: "8px" }}>{d.title}</h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>{d.blurb}</p>
      {d.ready ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "14px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>
          See every position <ArrowRight size={13} aria-hidden />
        </span>
      ) : (
        <span style={{ display: "inline-block", marginTop: "14px", fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", opacity: 0.7 }}>
          Worked page coming
        </span>
      )}
    </>
  );

  const cardStyle = {
    display: "block", textDecoration: "none",
    background: "var(--card)", border: "1px solid rgba(20,17,12,0.1)",
    borderTop: `3px solid ${TRIAGE[d.triage].color}`,
    padding: "var(--s-3)",
    opacity: d.ready ? 1 : 0.72,
  } as const;

  return d.ready ? (
    <Link href={`/theology/doctrine/${d.slug}`} style={cardStyle}>{inner}</Link>
  ) : (
    <div style={cardStyle}>{inner}</div>
  );
}
