/**
 * The posture (/justice/posture). The reading posture for the whole Prophetic
 * Justice section: biblical justice defined from the text up, the non-tribal
 * commitment, the binding-command-versus-prudential-policy distinction, self-
 * implication, and the guardrail against weaponizing any of it. Content:
 * /justice/methodology.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Section { id: string; kicker: string; title: string; body: string; }
interface Term { term: string; hebrew: string; gloss: string; note: string; }
interface Methodology { title: string; subtitle: string; sections: Section[]; justiceTerms: Term[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function JusticePosture() {
  const [m, setM] = useState<Methodology | null>(null);
  useEffect(() => {
    fetch("/justice/methodology.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setM(d))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="The Posture — Prophetic Justice"
        description="Before the questions, the ground rules: biblical justice defined from the text, the commitment to truth that does not take a tribe, and the difference between the binding command and the prudential policy."
        url="https://www.livewellbyjamesbell.co/justice/posture"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/justice" style={{ color: "inherit" }}>Prophetic Justice</Link> · Start here
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            {m?.title ?? "The Posture"}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "64ch" }}>
            {m?.subtitle ?? "Before the questions, the ground rules."}
          </p>
        </div>
      </section>

      {!m && (
        <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
          <p style={{ ...wrap, fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center" }}>Loading…</p>
        </section>
      )}

      {m && (
        <>
          {m.sections.map((s, i) => (
            <section key={s.id} style={{ background: i % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{s.kicker}</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{s.title}</h2>
                {s.body.split("\n\n").map((p, j) => (
                  <p key={j} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch", marginBottom: "16px" }}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {/* JUSTICE WORDS */}
          {m.justiceTerms?.length > 0 && (
            <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>The words underneath</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, color: "var(--bone)", marginBottom: "var(--s-4)" }}>The vocabulary of biblical justice</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
                  {m.justiceTerms.map((t) => (
                    <div key={t.term} style={{ background: "rgba(245,240,230,0.06)", border: "1px solid rgba(245,240,230,0.14)", borderRadius: "var(--radius-sm)", padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
                        <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--mustard)" }}>{t.term}</span>
                        {t.hebrew && <span style={{ fontFamily: "var(--B)", fontSize: "13px", fontStyle: "italic", color: "rgba(245,240,230,0.6)" }}>{t.hebrew}</span>}
                      </div>
                      <div style={{ fontFamily: "var(--B)", fontSize: "14px", color: "rgba(245,240,230,0.85)", marginBottom: "4px" }}>{t.gloss}</div>
                      <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "rgba(245,240,230,0.7)" }}>{t.note}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "var(--s-4)" }}>
                  <Link href="/justice/glossary" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>The full justice glossary →</Link>
                </div>
              </div>
            </section>
          )}

          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
            <div style={{ ...wrap, textAlign: "center" }}>
              <Link href="/justice" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Now to the questions →</Link>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
