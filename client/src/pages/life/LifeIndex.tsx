/**
 * The Integrated Life hub index (/life). Lists the deep domains by pillar from
 * client/public/life/domains-index.json (scripts/build-life-index.mjs) and
 * leads with the integrated vision: one undivided life, not balanced boxes.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Entry { slug: string; title: string; blurb: string; pillar: string }

const PILLAR_ORDER = [
  "The Integrated Vision",
  "The Inner Life",
  "The Body and the Rhythms",
  "The Home and Relationships",
  "Work, Money, and Calling",
  "The Life in the World",
  "The Seasons and the Crises",
];

export default function LifeIndex() {
  const [items, setItems] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/life/domains-index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setItems(d.domains || []))
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
        title="Integrated Life — Living the Whole of Life Well"
        description="One undivided life before God: the inner life, the body, the home, work and money, and the world. Scripture, tradition, and tested knowledge for the Tuesday."
        url="https://www.livewellbyjamesbell.co/life"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Integrated Life · The capstone</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            One life, offered whole
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch", marginBottom: "12px" }}>
            The modern person lives in boxes. Faith in one, work in another, the body in another, money in a fourth that nobody opens in church. The gospel claims all of it. To live well is not to balance the boxes. It is to dissolve them.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch" }}>
            Every domain here is worked the same way: the real struggle named without shame, the biblical vision in context, the tradition's wisdom, the best of modern knowledge tested against Scripture, the places faithful people differ treated fairly, and a practice you can start this week. The standard is flourishing. Not productivity. Not appearance. Not willpower.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {items.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the domains…</p>
          ) : (
            grouped.map(([pillar, entries]) => (
              <div key={pillar} style={{ marginBottom: "var(--s-5)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>{pillar}</h2>
                <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "var(--s-3)" }}>
                  {entries.map((e) => (
                    <Link key={e.slug} href={`/life/${e.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                      <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{e.title}</div>
                      <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{e.blurb}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}

          <div style={{ marginTop: "var(--s-4)", background: "var(--charcoal)", padding: "var(--s-4)", color: "var(--bone)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Start with an honest look</div>
            <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.5, marginBottom: "16px", maxWidth: "56ch" }}>
              The Whole-Life Assessment maps where your life is flourishing and where it has gone quiet, then hands you a rule of life for this season. It is not a scorecard. God is not grading you.
            </p>
            <Link href="/life/assessment" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              Take the Whole-Life Assessment
            </Link>
          </div>

          <div style={{ marginTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/marriage" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Marriage</Link>
            <Link href="/parenting" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Parenting</Link>
            <Link href="/family" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Family Discipleship</Link>
            <Link href="/disciple-making" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Make Disciples</Link>
            <Link href="/wisdom" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Wisdom for All of Life</Link>
            <Link href="/discipleship" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Discipleship Pathway</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
