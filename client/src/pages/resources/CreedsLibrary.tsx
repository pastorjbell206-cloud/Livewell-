/**
 * Creeds, Confessions, and Classics (/resources/creeds). The full-text,
 * annotated companion to the survey at /theology/creeds. Driven by
 * client/public/creeds/documents-index.json (scripts/build-creeds-index.mjs).
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { GeneratedCover } from "@/components/GeneratedCover";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Entry { slug: string; title: string; blurb: string; group: string; date: string }

const GROUP_ORDER = [
  "The Ecumenical Creeds",
  "Reformation Confessions",
  "Baptist and Free Church",
  "The Early Classics",
];

export default function CreedsLibrary() {
  const [items, setItems] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/creeds/documents-index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setItems(d.documents || []))
      .catch(() => {});
  }, []);

  const grouped = useMemo(() => {
    const present = Array.from(new Set(items.map((i) => i.group)));
    const order = GROUP_ORDER.filter((g) => present.includes(g)).concat(present.filter((g) => !GROUP_ORDER.includes(g)).sort());
    return order.map((g) => [g, items.filter((i) => i.group === g)] as const);
  }, [items]);

  return (
    <Layout>
      <SEOMeta
        title="Creeds, Confessions, and Classics — Full Texts with Plain Notes"
        description="The Apostles' and Nicene Creeds, Chalcedon, the Reformation confessions, and the early classics: full public-domain texts with plain-language notes."
        url="https://www.livewellbyjamesbell.co/resources/creeds"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Resources · The church's memory</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            A church without memory repeats old errors
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch", marginBottom: "12px" }}>
            Every generation thinks its questions are new. Most of them are not. The creeds and confessions are the church's answers, written in the middle of arguments that nearly tore her apart, paid for at councils and sometimes at stakes.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch" }}>
            These are the full texts, not summaries, with plain-language notes on what the loaded phrases meant to the people who wrote them. Read them slowly. They were written slowly.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {items.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the library…</p>
          ) : (
            grouped.map(([g, entries]) => (
              <div key={g} style={{ marginBottom: "var(--s-5)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>{g}</h2>
                <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "var(--s-3)" }}>
                  {entries.map((e) => (
                    <Link key={e.slug} href={`/resources/creeds/${e.slug}`} style={{ display: "flex", gap: "14px", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderRadius: "var(--radius-sm)", overflow: "hidden", textDecoration: "none" }}>
                      <div style={{ width: "78px", flexShrink: 0, alignSelf: "flex-start", aspectRatio: "3 / 4", overflow: "hidden" }}><GeneratedCover title={e.title} eyebrow="The Creeds" variant="dark" style={{ width: "100%", height: "100%" }} /></div>
                      <div style={{ padding: "var(--s-3) var(--s-3) var(--s-3) 0" }}>
                        <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>{e.date}</div>
                        <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{e.title}</div>
                        <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{e.blurb}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
          <div style={{ marginTop: "var(--s-3)" }}>
            <Link href="/theology/creeds" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The confessions surveyed, in the Theology section →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
