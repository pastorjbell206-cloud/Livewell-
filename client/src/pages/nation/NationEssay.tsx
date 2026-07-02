/**
 * Long-form essay renderer for the Christ and the Nation sub-hub. Loads
 * /nation/<slug>.json ({ title, subtitle, sections, furtherReading }) and
 * renders it as a serious, readable essay. Used for the Christian-nation
 * question, the Old Testament theocracy, and the danger of empire.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Prose } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";

interface Section { id: string; kicker: string; title: string; body: string; }
interface Reading { title: string; author: string; }
interface Essay { title: string; subtitle: string; sections: Section[]; furtherReading: Reading[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function NationEssay({ slug }: { slug: string }) {
  const [e, setE] = useState<Essay | null>(null);
  useEffect(() => {
    fetch(`/nation/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setE(d))
      .catch(() => {});
  }, [slug]);

  return (
    <Layout>
      <SEOMeta title={`${e?.title ?? "Christ and the Nation"} — LiveWell by James Bell`} description={e?.subtitle ?? ""} url={`https://www.livewellbyjamesbell.co/nation/${slug}`} />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/nation" style={{ color: "inherit" }}>Christ and the Nation</Link>
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{e?.title ?? "Loading…"}</h1>
          {e?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>{e.subtitle}</p>}
        </div>
      </section>

      {e?.sections.map((s, i) => (
        <section key={s.id} style={{ background: i % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{s.kicker}</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{s.title}</h2>
            <Prose text={s.body} />
          </div>
        </section>
      ))}

      {e && e.furtherReading?.length > 0 && (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "var(--s-3)" }}>Further reading</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "var(--s-4)" }}>
              {e.furtherReading.map((b, i) => (
                <div key={i}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--bone)", fontStyle: "italic" }}>{b.title}</span>
                  <span style={{ fontFamily: "var(--B)", fontSize: "14px", color: "rgba(245,240,230,0.7)" }}>{`  ·  ${b.author}`}</span>
                </div>
              ))}
            </div>
            <Link href="/nation" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Back to Christ and the Nation →</Link>
          </div>
        </section>
      )}
    </Layout>
  );
}
