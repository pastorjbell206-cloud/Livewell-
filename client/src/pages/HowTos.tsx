/**
 * How-To Library (/how-tos). A static library of practical, Scripture-grounded
 * how-to guides published from scripts/articles/* via
 * scripts/build-howtos-index.mjs (client/public/howtos/index.json). Filterable
 * by topic via ?topic=<slug>. Each card links to /how-tos/<slug>.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Entry { slug: string; title: string; excerpt: string; topic: string; readTime: string }

const TOPIC_LABEL: Record<string, string> = {
  "spiritual-formation": "The Inner Life",
  marriage: "Marriage",
  parenting: "Parenting",
  relationships: "Relationships",
  family: "The Home",
  work: "Work & Money",
  suffering: "Hard Seasons",
  "the-body": "The Body",
  "the-life-in-the-world": "Life in the World",
  discipleship: "Following Jesus",
  evangelism: "Sharing Your Faith",
};

const TOPIC_ORDER = [
  "spiritual-formation", "discipleship", "marriage", "parenting", "relationships",
  "family", "work", "the-body", "suffering", "the-life-in-the-world", "evangelism",
];

export default function HowTos() {
  const [items, setItems] = useState<Entry[]>([]);
  const [active, setActive] = useState<string>(() => {
    const q = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("topic") : null;
    return q || "all";
  });

  useEffect(() => {
    fetch("/howtos/index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setItems(d.articles || []))
      .catch(() => {});
  }, []);

  const topics = useMemo(() => {
    const present = Array.from(new Set(items.map((i) => i.topic)));
    return TOPIC_ORDER.filter((t) => present.includes(t)).concat(present.filter((t) => !TOPIC_ORDER.includes(t)));
  }, [items]);

  const shown = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.topic === active)),
    [items, active]
  );

  return (
    <Layout>
      <SEOMeta
        title="How-To Guides — Practical, Scripture-Grounded Help for Real Life"
        description="Short, practical how-to guides for marriage, parenting, money, the inner life, hard seasons, and making disciples. Plain help, grounded in Scripture."
        url="https://www.livewellbyjamesbell.co/how-tos"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>How-to guides</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Practical help for real life
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Short, plain guides for the things you actually have to do: start family worship, fight fair in marriage, get out of debt, share your faith without being weird, make a disciple at your table. Grounded in Scripture, written for the long obedience of an ordinary week.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {/* topic filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "var(--s-4)" }}>
            {["all", ...topics].map((t) => {
              const on = t === active;
              const label = t === "all" ? "All" : (TOPIC_LABEL[t] || t);
              return (
                <button key={t} onClick={() => setActive(t)} aria-pressed={on} style={{ cursor: "pointer", padding: "8px 14px", background: on ? "var(--mustard)" : "var(--card)", color: on ? "var(--charcoal)" : "var(--ink)", border: "1px solid rgba(20,17,12,0.12)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13.5px" }}>
                  {label}
                </button>
              );
            })}
          </div>

          {items.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the library…</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "var(--s-3)" }}>
              {shown.map((e) => (
                <Link key={e.slug} href={`/how-tos/${e.slug}`} style={{ display: "block", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--U)", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.07em", color: "var(--mustard-text)", marginBottom: "8px" }}>
                    {(TOPIC_LABEL[e.topic] || e.topic).toUpperCase()} · {e.readTime}
                  </div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{e.title}</div>
                  <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{e.excerpt}</div>
                </Link>
              ))}
            </div>
          )}

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/tools/wisdom-finder" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Wisdom Finder</Link>
            <Link href="/life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Integrated Life</Link>
            <Link href="/disciple-making" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Make Disciples</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
