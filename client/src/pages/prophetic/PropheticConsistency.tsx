/**
 * The Consistency Check, the flagship tool of Prophetic Disruption. A searching
 * self-examination of whether the reader defends truth selectively, one
 * standard for their own tribe and another for their opponents. A mirror, not a
 * scorecard, and explicitly not a weapon against others. Config-driven so it can
 * serve any section that ships a consistency-check.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Check } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import type { SectionConfig } from "@/lib/prophetic";

interface Test { id: string; prompt: string; tell: string; }
interface Data { intro: string; note: string; tests: Test[]; closing: string; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function PropheticConsistency({ config }: { config: SectionConfig }) {
  const [data, setData] = useState<Data | null>(null);
  const [marked, setMarked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`${config.base}/consistency-check.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, [config.base]);

  const markedCount = useMemo(() => Object.values(marked).filter(Boolean).length, [marked]);

  return (
    <Layout>
      <SEOMeta title={`The Consistency Check — ${config.label}`} description="A searching self-examination of whether you defend truth selectively, one standard for your side and another for your opponents. A mirror, not a weapon." url={`https://www.livewellbyjamesbell.co${config.base}/consistency`} />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href={config.base} style={{ color: "inherit" }}>{config.label}</Link> · The consistency check
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "18ch" }}>One standard, or two?</h1>
          {data && (
            <div style={{ maxWidth: "64ch" }}>
              {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", marginBottom: "12px" }}>{p}</p>)}
            </div>
          )}
        </div>
      </section>

      {!data && <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}><p style={{ ...wrap, fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center" }}>Loading…</p></section>}

      {data && (
        <>
          <section style={{ background: "var(--bone-warm)", padding: "var(--s-4)" }}>
            <div style={wrap}>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic", maxWidth: "68ch", margin: "0 auto", textAlign: "center", borderLeft: "3px solid var(--mustard)", paddingLeft: "16px" }}>{data.note}</p>
            </div>
          </section>

          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
            <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.tests.map((t, i) => {
                const on = !!marked[t.id];
                return (
                  <button key={t.id} type="button" onClick={() => setMarked((m) => ({ ...m, [t.id]: !m[t.id] }))} aria-pressed={on}
                    style={{ textAlign: "left", cursor: "pointer", background: on ? "rgba(212,160,23,0.10)" : "var(--card)", border: `1px solid ${on ? "var(--mustard)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", padding: "var(--s-4)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span aria-hidden style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", border: `2px solid ${on ? "var(--mustard)" : "var(--border)"}`, background: on ? "var(--mustard)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                      {on && <Check size={15} color="var(--charcoal)" strokeWidth={3} />}
                    </span>
                    <span>
                      <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.35 }}>{i + 1}. {t.prompt}</span>
                      {on && <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", marginTop: "8px" }}>{t.tell}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
            <div style={wrap}>
              {markedCount > 0 && (
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "16px" }}>
                  {markedCount === 1 ? "One landed. That is enough to start." : `${markedCount} landed. None of us reads this clean.`}
                </p>
              )}
              {data.closing.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, lineHeight: 1.5, color: "var(--bone)", maxWidth: "60ch", marginBottom: "14px" }}>{p}</p>)}
              <div style={{ marginTop: "var(--s-4)" }}>
                <Link href={`${config.base}/topic/truth-and-tribe`} style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Read: When Truth Becomes Negotiable →</Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
