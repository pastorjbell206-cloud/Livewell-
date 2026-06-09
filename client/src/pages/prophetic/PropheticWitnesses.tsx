/**
 * The Witnesses, for a prophetic section. Profiles of the people who told the
 * church and the powers costly truth, or did justice at real cost, so the
 * section is hopeful and concrete and not only convicting. Honest about their
 * flaws. Loaded from <base>/witnesses.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import type { SectionConfig } from "@/lib/prophetic";

interface Witness { name: string; dates: string; place: string; role: string; summary: string; whatTheyDid: string; honestNote: string; }
interface Data { intro: string; witnesses: Witness[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function PropheticWitnesses({ config }: { config: SectionConfig }) {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch(`${config.base}/witnesses.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, [config.base]);

  return (
    <Layout>
      <SEOMeta title={`The Witnesses — ${config.label}`} description="The people who told the church costly truth, or did justice at real cost, across history. Hopeful, concrete, and honest about their flaws." url={`https://www.livewellbyjamesbell.co${config.base}/witnesses`} />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href={config.base} style={{ color: "inherit" }}>{config.label}</Link> · The witnesses
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            It has been done before.
          </h1>
          {data && (
            <div style={{ maxWidth: "64ch" }}>
              {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", marginBottom: "12px" }}>{p}</p>)}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {!data && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {data?.witnesses.map((w) => (
            <div key={w.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
              <div style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)" }}>{w.name}</div>
              <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", margin: "2px 0" }}>{w.dates}</div>
              <div style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginBottom: "10px" }}>{w.role}{w.place ? ` · ${w.place}` : ""}</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "10px" }}>{w.summary}</p>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink)", marginBottom: "10px" }}><strong style={{ color: "var(--mustard-text)" }}>What it cost. </strong>{w.whatTheyDid}</p>
              <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", fontStyle: "italic", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>{w.honestNote}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
