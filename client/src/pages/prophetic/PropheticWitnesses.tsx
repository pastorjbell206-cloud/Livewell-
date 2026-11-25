/**
 * The Witnesses, for a prophetic section. Profiles of the people who told the
 * church and the powers costly truth, or did justice at real cost, so the
 * section is hopeful and concrete and not only convicting. Honest about their
 * flaws. Loaded from <base>/witnesses.json.
 */
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import type { SectionConfig } from "@/lib/prophetic";

interface Witness { name: string; dates: string; place: string; role: string; summary: string; whatTheyDid: string; honestNote: string; }
interface Data { intro: string; witnesses: Witness[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function PropheticWitnesses({ config }: { config: SectionConfig }) {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch(`${config.base}/witnesses.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, [config.base]);

  // One component, two pages: each is named for the people it holds.
  const justice = config.base === "/justice";
  const name = justice ? "Christians who fought injustice, and what it cost them" : "Christians who told the church the truth";

  return (
    <Layout>
      <SEOMeta title={justice ? "Christians Who Fought Injustice, and What It Cost" : "Christians Who Told the Church the Truth"} description={justice ? "The people who did justice at real cost, across the church's history. Hopeful, concrete, and honest about their flaws." : "The people who told the church a costly truth, across its history. Hopeful, concrete, and honest about their flaws."} url={`https://www.livewellbyjamesbell.co${config.base}/witnesses`} />

      <InnerHead path={`${config.base}/witnesses`} title={name} line="It has been done before." plate="basilica">
        {data && data.intro.split("\n\n").map((p, i) => <p key={i} className="pg-head__lede">{p}</p>)}
      </InnerHead>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
          {!data && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading…</p>}
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
