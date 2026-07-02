/**
 * The Biblical Policy Explorer (/nation/policy). A thought experiment: it takes
 * the civil laws God gave ancient Israel and asks what their underlying
 * principle might look like as policy in modern America, showing honestly that
 * these principles cut across the left and the right. The intro and closing
 * insist these are principles and not a literal code, and that a coerced
 * biblical government would betray the gospel. Data: /nation/policy.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Law { name: string; reference: string; whatItWas: string; thePrinciple: string; modernPolicy: string; leftEcho: string; rightEcho: string; theCatch: string; }
interface Data { intro: string; laws: Law[]; closing: string; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function NationPolicy() {
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/nation/policy.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) { setData(d); setOpen(d.laws?.[0]?.name ?? null); } })
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta title="The Biblical Policy Explorer — What Would It Actually Look Like?" description="If biblical law shaped policy in America, from Jubilee to the gleaning laws to the warning against kings, what would it look like? It leaves both parties out." url="https://www.livewellbyjamesbell.co/nation/policy" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/nation" style={{ color: "inherit" }}>Christ and the Nation</Link> · The policy explorer
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>If we actually had a biblical government.</h1>
          {data && <div style={{ maxWidth: "64ch" }}>{data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", marginBottom: "12px" }}>{p}</p>)}</div>}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "10px" }}>
          {!data && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {data?.laws.map((law) => {
            const isOpen = open === law.name;
            return (
              <div key={law.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : law.name)} aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span>
                    <span style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)" }}>{law.name}</span>
                    <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", marginTop: "2px" }}>{law.reference}</span>
                  </span>
                  <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                </button>
                {isOpen && (
                  <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "16px 0 12px" }}><strong style={{ color: "var(--ink)" }}>What it was. </strong>{law.whatItWas}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}><strong style={{ color: "var(--mustard-text)" }}>The principle. </strong>{law.thePrinciple}</p>
                    <div style={{ background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "14px", marginBottom: "12px" }}>
                      <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "6px" }}>In America today, it might look like</div>
                      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{law.modernPolicy}</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", marginBottom: "12px" }}>
                      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
                        <div className="eyebrow" style={{ marginBottom: "4px" }}>For the left</div>
                        <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{law.leftEcho}</p>
                      </div>
                      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
                        <div className="eyebrow" style={{ marginBottom: "4px" }}>For the right</div>
                        <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{law.rightEcho}</p>
                      </div>
                    </div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", fontStyle: "italic", borderTop: "1px solid var(--border)", paddingTop: "10px" }}><strong style={{ color: "var(--ink)" }}>The catch. </strong>{law.theCatch}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {data?.closing && (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>The point</div>
            {data.closing.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, lineHeight: 1.5, color: "var(--bone)", maxWidth: "60ch", marginBottom: "14px" }}>{p}</p>)}
            <Link href="/nation/theocracy" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Why a theocracy cannot be rebuilt →</Link>
          </div>
        </section>
      )}
    </Layout>
  );
}
