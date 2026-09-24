/**
 * Hermeneutics trainer (/theology/hermeneutics). Teaches the art of reading the
 * Bible well: the principles of sound interpretation, each with a rule and a
 * worked example, and a checklist of the common interpretive errors and how to
 * avoid them. Data: /theology/theology-hermeneutics.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Prose } from "@/lib/prose";

interface Principle { name: string; rule: string; why: string; example: string; }
interface ErrorItem { name: string; what: string; fix: string; }
interface Herm { intro: string; principles: Principle[]; errors: ErrorItem[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyHermeneutics() {
  const [data, setData] = useState<Herm | null>(null);
  const [tab, setTab] = useState<"principles" | "errors">("principles");

  useEffect(() => {
    fetch("/theology/theology-hermeneutics.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="How to Read the Bible Well — A Hermeneutics Trainer"
        description="The rules of sound interpretation, each with a worked example, plus a checklist of the common mistakes and how to avoid them. Learn to read the Bible carefully."
        url="https://www.livewellbyjamesbell.co/theology/hermeneutics"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Reading well
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Learn to read the Bible well.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            Hermeneutics is just a long word for the art of reading a text rightly. You already do it every day with letters and laws and love notes. The Bible deserves the same care, and a little more. Here are the rules, and the mistakes to watch for.
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

          <section style={{ background: "var(--bone)", padding: "0 var(--s-4)" }}>
            <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {([["principles", `The principles · ${data.principles.length}`], ["errors", `The errors to avoid · ${data.errors.length}`]] as const).map(([id, label]) => (
                <button key={id} type="button" onClick={() => setTab(id)} aria-pressed={tab === id}
                  style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
                    border: `1px solid ${tab === id ? "var(--mustard)" : "var(--border)"}`, background: tab === id ? "var(--bone-warm)" : "transparent", color: "var(--ink)" }}>
                  {label}
                </button>
              ))}
            </div>
          </section>

          {tab === "principles" && (
            <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
              <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "14px" }}>
                {data.principles.map((p, i) => (
                  <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "20px", color: "var(--mustard-text)", fontWeight: 500 }}>{i + 1}</span>
                      <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)" }}>{p.name}</h3>
                    </div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "8px" }}>{p.rule}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "10px" }}>{p.why}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}><strong style={{ color: "var(--ink)" }}>For example.</strong> {p.example}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "errors" && (
            <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
              <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
                {data.errors.map((e, i) => (
                  <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <h3 style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{e.name}</h3>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "10px" }}><strong style={{ color: "var(--ink)" }}>The mistake.</strong> {e.what}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink)" }}><strong style={{ color: "var(--mustard-text)" }}>The fix.</strong> {e.fix}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}
