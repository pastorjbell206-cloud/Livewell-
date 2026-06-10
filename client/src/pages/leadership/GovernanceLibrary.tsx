/**
 * The Board Governance and Policy Library (/leadership/governance). A browsable
 * library of the policies a healthy church needs, each with why it matters and a
 * plain starter template you can copy and adapt. Data:
 * client/public/leadership/governance.json. Templates are starting points, not
 * legal advice. Stateless, no login.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Copy } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Policy { id: string; name: string; why: string; sample: string; }
interface Category { id: string; name: string; blurb: string; policies: Policy[]; }
interface Data { title: string; subtitle: string; intro: string; categories: Category[]; closing?: string; }

export default function GovernanceLibrary() {
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/leadership/governance.json", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => { if (d) { setData(d); setOpen(d.categories?.[0]?.policies?.[0]?.id ?? null); } }).catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta title="The Board Governance and Policy Library — Templates for a Healthy Church" description="The policies a healthy church needs, each with why it matters and a plain starter template you can copy and adapt. Starting points, not legal advice." url="https://www.livewellbyjamesbell.co/leadership/governance" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Governance and policy</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>{data?.title ?? "The policies a church hopes it never needs."}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {data && (
        <>
          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-3)" }}>
            <div style={{ ...wrap, maxWidth: "760px" }}>
              {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>)}
            </div>
          </section>

          {data.categories.map((cat, ci) => (
            <section key={cat.id} style={{ background: ci % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-5)" }}>
              <div style={{ ...wrap, maxWidth: "760px" }}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "6px" }}>{cat.name}</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginBottom: "var(--s-3)", lineHeight: 1.6 }}>{cat.blurb}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {cat.policies.map((p) => {
                    const isOpen = open === p.id;
                    return (
                      <div key={p.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                        <button onClick={() => setOpen(isOpen ? null : p.id)} aria-expanded={isOpen} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "14px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                          <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}>{p.name}</span>
                          <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                        </button>
                        {isOpen && (
                          <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: "14px 0" }}><strong style={{ color: "var(--mustard-text)" }}>Why it matters. </strong>{p.why}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <div className="eyebrow" style={{ color: "var(--ink-muted)" }}>Starter template</div>
                              <button onClick={() => navigator.clipboard?.writeText(p.sample)} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 10px", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--ink-muted)", cursor: "pointer" }}><Copy size={13} /> Copy</button>
                            </div>
                            <pre style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.7, color: "var(--ink)", background: "var(--bone-warm)", padding: "14px", borderRadius: "var(--radius-sm)", whiteSpace: "pre-wrap", margin: 0 }}>{p.sample}</pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}

          {data.closing && (
            <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
              <div style={{ ...wrap, maxWidth: "760px" }}>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", color: "rgba(245,240,230,0.7)", lineHeight: 1.7 }}>{data.closing}</p>
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}
