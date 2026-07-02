/**
 * The Lament and the Hope (/lament). Completes the prophetic arc for both
 * sections. The prophets indict, then they lament, then they promise. This page
 * gives the church words to grieve injustice and confess its own failure, and
 * the vision of shalom that keeps prophecy from curdling into cynicism. Shared
 * across both prophetic sections. Data: /prophetic/lament.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { toParagraphs } from "@/lib/prose";

interface Section { id: string; kicker: string; title: string; body: string; }
interface Prayer { type: "lament" | "confession" | "hope"; title: string; text: string; }
interface Data { title: string; subtitle: string; sections: Section[]; prayers: Prayer[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const GROUPS: { type: Prayer["type"]; label: string; note: string }[] = [
  { type: "lament", label: "Prayers of lament", note: "For grief over injustice and suffering. Grief is faith, not its failure." },
  { type: "confession", label: "Prayers of confession", note: "For the church's own sin, named as our own." },
  { type: "hope", label: "Prayers of hope", note: "For the world set right, the kingdom we are waiting for." },
];

export default function PropheticLament() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch("/prophetic/lament.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);

  const byType = useMemo(() => {
    const m: Record<string, Prayer[]> = {};
    for (const p of data?.prayers ?? []) (m[p.type] ??= []).push(p);
    return m;
  }, [data]);

  return (
    <Layout>
      <SEOMeta title="The Lament and the Hope — Prayers for a Broken World" description="The prophets indict, then lament, then promise. Words to grieve injustice, confess the church's own failure, and hope in the world God will set right." url="https://www.livewellbyjamesbell.co/lament" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>Prophetic Disruption and Justice · Lament and hope</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>{data?.title ?? "The Lament and the Hope"}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {data?.sections.map((s, i) => (
        <section key={s.id} style={{ background: i % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{s.kicker}</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{s.title}</h2>
            {toParagraphs(s.body).map((p, j) => <p key={j} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.78, color: "var(--ink)", maxWidth: "68ch", marginBottom: "16px" }}>{p}</p>)}
          </div>
        </section>
      ))}

      {/* PRAYERS */}
      {data && (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-7)", color: "var(--bone)" }}>
          <div style={wrap}>
            {GROUPS.map((g) => (byType[g.type]?.length ? (
              <div key={g.type} style={{ marginBottom: "var(--s-5)" }}>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "6px" }}>{g.label}</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "rgba(245,240,230,0.6)", fontStyle: "italic", marginBottom: "var(--s-3)" }}>{g.note}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
                  {byType[g.type].map((p, i) => (
                    <div key={i} style={{ background: "rgba(245,240,230,0.05)", border: "1px solid rgba(245,240,230,0.14)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                      <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--mustard)", marginBottom: "8px" }}>{p.title}</div>
                      <p style={{ fontFamily: "var(--F)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.9)", fontStyle: "italic" }}>{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null))}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "var(--s-3)" }}>
              <Link href="/disruption" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Prophetic Disruption →</Link>
              <Link href="/justice" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Prophetic Justice →</Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
