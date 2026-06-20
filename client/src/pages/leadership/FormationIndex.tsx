/**
 * The deep formation index (/leadership/formation). Lists every eight-part
 * deep topic by pillar with its triage badge (command / conviction / wisdom),
 * and explains the hub's governing method: formation before function. Driven
 * by client/public/leadership/formation-index.json
 * (scripts/build-formation-index.mjs).
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Entry { slug: string; title: string; blurb: string; pillar: string; triage: string }

const PILLAR_ORDER = [
  "Orientation",
  "The Interior Life",
  "Leading People",
  "Leading the Institution",
  "The Arc of a Leadership Life",
];

const TRIAGE_BADGE: Record<string, string> = {
  command: "Biblical command",
  conviction: "Contested conviction",
  wisdom: "Prudential wisdom",
};

export default function FormationIndex() {
  const [items, setItems] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/leadership/formation-index.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setItems(d.topics || []))
      .catch(() => {});
  }, []);

  const grouped = useMemo(() => {
    const present = Array.from(new Set(items.map((i) => i.pillar)));
    const order = PILLAR_ORDER.filter((p) => present.includes(p)).concat(present.filter((p) => !PILLAR_ORDER.includes(p)).sort());
    return order.map((p) => [p, items.filter((i) => i.pillar === p)] as const);
  }, [items]);

  return (
    <Layout>
      <SEOMeta
        title="Deep Formation — The Eight-Part Method for Christian Leaders"
        description="Deep leadership topics treated with a fixed eight-part method: the real question, the biblical foundation, the historical witness, every view steelmanned, secular scholarship tested against Scripture, and the formation underneath the function."
        url="https://www.livewellbyjamesbell.co/leadership/formation"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Leadership Formation · Deep topics</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            Formation before function
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch", marginBottom: "12px" }}>
            The New Testament's qualifications for leaders are almost entirely about character. The church's leadership catastrophes are almost entirely failures of formation, not skill. So every topic here is worked through the same fixed method: the real question, the stakes, the biblical foundation in context, two thousand years of witness, every contested view steelmanned in its own voice, the best scholarship with every secular source tested against Scripture, the formation underneath, and the practice by stage.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch" }}>
            Each topic is labeled honestly: a biblical command, a contested conviction, or a prudential wisdom matter. You should know which one you are reading.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {items.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the topics…</p>
          ) : (
            grouped.map(([pillar, entries]) => (
              <div key={pillar} style={{ marginBottom: "var(--s-5)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>{pillar}</h2>
                <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "var(--s-3)" }}>
                  {entries.map((e) => (
                    <Link key={e.slug} href={`/leadership/formation/${e.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                      <div style={{ fontFamily: "var(--U)", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "10px" }}>{TRIAGE_BADGE[e.triage] || e.triage}</div>
                      <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{e.title}</div>
                      <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{e.blurb}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}

          <div style={{ marginTop: "var(--s-4)", background: "var(--charcoal)", padding: "var(--s-4)", color: "var(--bone)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Start with yourself</div>
            <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.5, marginBottom: "16px", maxWidth: "56ch" }}>
              The first person a leader must learn to lead is himself. The Formation Inventory is a character-first diagnostic. It asks the questions you answer at midnight, not the ones you answer in interviews.
            </p>
            <Link href="/leadership/inventory" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              Take the Leadership Formation Inventory
            </Link>
          </div>

          <div style={{ marginTop: "var(--s-3)", background: "var(--bone-warm)", border: "1px solid var(--border)", padding: "var(--s-4)" }}>
            <div className="eyebrow" style={{ marginBottom: "10px" }}>Free for church leaders</div>
            <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.5, color: "var(--ink)", marginBottom: "16px", maxWidth: "56ch" }}>
              The Hard Issues Series: fifteen free booklets on eldership, deacons, polity, worship, and leading change — the practical companions to the formation work above.
            </p>
            <Link href="/resources/hard-issues-series" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              Browse the Hard Issues Series &rarr;
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
