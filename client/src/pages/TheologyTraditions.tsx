/**
 * Why are there so many churches? (/theology/traditions). An irenic guide to the
 * major Christian traditions, each described as its own faithful members would
 * want, with the deep shared core named first and the doctrinal triage held in
 * view. Data: /theology/traditions.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Prose } from "@/lib/prose";

interface Tradition {
  name: string; family: string; born: string; treasures: string;
  distinctives: string; howItReadsTheDebates: string; aFairWord: string;
}
interface Data { intro: string; sharedCore: string; traditions: Tradition[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyTraditions() {
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/theology/traditions.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div style={{ marginBottom: "12px" }}>
      <div className="eyebrow" style={{ marginBottom: "4px" }}>{label}</div>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)" }}>{value}</p>
    </div>
  );

  return (
    <Layout>
      <SEOMeta
        title="Why Are There So Many Churches?"
        description="An honest, charitable guide to the major Christian traditions, Catholic to Pentecostal: what each one treasures, and the deep core they all share."
        url="https://www.livewellbyjamesbell.co/theology/traditions"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · The traditions
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Why are there so many churches?
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            It is one of the first things a new believer notices, and one of the most confusing. Here is the honest answer, with each great tradition described the way its own faithful members would want, and the deep core they all hold in common named first.
          </p>
        </div>
      </section>

      {!data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
          <p style={{ ...wrap, fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center" }}>Loading…</p>
        </section>
      )}

      {data && (
        <>
          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-4)" }}>
            <div style={wrap}>
              <Prose text={data.intro} />
            </div>
          </section>

          {/* SHARED CORE */}
          <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
            <div style={wrap}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>What they all share</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)" }}>The one faith underneath</h2>
              <Prose text={data.sharedCore} />
            </div>
          </section>

          {/* TRADITIONS */}
          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
            <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>The traditions, one by one</h2>
              {data.traditions.map((t) => {
                const isOpen = open === t.name;
                return (
                  <div key={t.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                    <button type="button" onClick={() => setOpen(isOpen ? null : t.name)} aria-expanded={isOpen}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                      <span>
                        <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{t.family}</span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, color: "var(--ink)", marginTop: "2px" }}>{t.name}</span>
                      </span>
                      <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                    </button>
                    {isOpen && (
                      <div style={{ padding: "16px var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                        <Row label="Where it came from" value={t.born} />
                        <Row label="What it treasures" value={t.treasures} />
                        <Row label="What marks it out" value={t.distinctives} />
                        <Row label="How it reads the debates" value={t.howItReadsTheDebates} />
                        <div style={{ background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px", marginTop: "4px" }}>
                          <div className="eyebrow" style={{ marginBottom: "4px", color: "var(--mustard-text)" }}>A fair word</div>
                          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)", fontStyle: "italic" }}>{t.aFairWord}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
            <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
              <Link href="/theology/doctrine/church" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Go deeper: What is the church? →</Link>
              <Link href="/theology/history" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>How the church got here →</Link>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
