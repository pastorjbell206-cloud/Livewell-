/**
 * Renders an Integrated Life domain from client/public/life/domains/<slug>.json
 * at /life/:slug. Fixed eight-part method (validate-life.mjs): the real
 * struggle, why it matters, the biblical vision, the historical wisdom, the
 * honest engagement with knowledge (secular sources tested against Scripture),
 * where faithful people differ, the formation, and the practice. Integration
 * is structural: every domain renders its connections to the rest of the site.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { toParagraphs } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";
import PageEndNav from "@/components/PageEndNav";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface View { name: string; body: string }
interface SecularSource { source: string; author: string; whatItGetsRight: string; testedAgainstScripture: string }
interface Stage { stage: string; steps: string[] }
interface Part { id: string; title: string; body: string; views?: View[]; secular?: SecularSource[]; stages?: Stage[] }
interface Domain {
  slug: string; title: string; subtitle: string; pillar: string;
  connections: { label: string; href: string }[]; parts: Part[];
}

function Paragraphs({ text, light }: { text: string; light?: boolean }) {
  return (
    <>
      {toParagraphs(text).map((p, i) => (
        <p key={i} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.78, color: light ? "rgba(245,240,230,0.85)" : "var(--ink)", maxWidth: "68ch", marginBottom: "16px" }}>{p}</p>
      ))}
    </>
  );
}

export default function LifeDomain() {
  const [, params] = useRoute("/life/:slug");
  const slug = params?.slug;
  // The fetch result is tagged with the slug it answered; data/missing are
  // derived per render, so navigating to a new slug resets the view without a
  // synchronous setState in the effect.
  const [result, setResult] = useState<{ slug: string; data: Domain | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/life/domains/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setResult({ slug, data: d || null }))
      .catch(() => setResult({ slug, data: null }));
  }, [slug]);

  const data = result && result.slug === slug ? result.data : null;
  const missing = !!result && result.slug === slug && result.data === null;

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Integrated Life`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/life/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/life" style={{ color: "inherit" }}>Integrated Life</Link>
            {data?.pillar ? ` · ${data.pillar}` : ""}
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "24ch" }}>{data?.title ?? (missing ? "That page is not here yet." : "Loading the page…")}</h1>
          {missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
              It may have moved. Start from the{" "}
              <Link href="/life" style={{ color: "var(--mustard)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Integrated Life index</Link>.
            </p>
          )}
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {data?.parts.map((part, i) => {
        const dark = part.id === "formation";
        const bg = dark ? "var(--charcoal)" : i % 2 ? "var(--bone-warm)" : "var(--bone)";
        return (
          <section key={part.id} style={{ background: bg, padding: "var(--s-5) var(--s-4)", color: dark ? "var(--bone)" : "var(--ink)" }}>
            <div style={wrap}>
              <div className="eyebrow" style={{ color: dark ? "var(--mustard)" : "var(--mustard-text)", marginBottom: "8px" }}>Part {i + 1} of 8</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{part.title}</h2>
              {part.body && <Paragraphs text={part.body} light={dark} />}

              {part.views && part.views.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "var(--s-3)", marginTop: "var(--s-3)" }}>
                  {part.views.map((v) => (
                    <div key={v.name} style={{ background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)" }}>
                      <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "10px" }}>{v.name}</h3>
                      {toParagraphs(v.body).map((p, j) => (
                        <p key={j} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.72, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {part.secular && part.secular.length > 0 && (
                <div style={{ display: "grid", gap: "var(--s-2)", marginTop: "var(--s-3)" }}>
                  {part.secular.map((s) => (
                    <div key={s.source} style={{ background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-3)" }}>
                      <div style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--ink)", marginBottom: "8px" }}><span style={{ fontStyle: "italic" }}>{s.source}</span>, {s.author}</div>
                      <p style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.65, color: "var(--ink)", marginBottom: "8px" }}>
                        <strong style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", display: "block", marginBottom: "4px" }}>What it gets right</strong>
                        {s.whatItGetsRight}
                      </p>
                      <p style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.65, color: "var(--ink)", margin: 0, borderLeft: "2px solid var(--mustard)", paddingLeft: "12px" }}>
                        <strong style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", display: "block", marginBottom: "4px" }}>Tested against Scripture</strong>
                        {s.testedAgainstScripture}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {part.stages && part.stages.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)", marginTop: "var(--s-3)" }}>
                  {part.stages.map((st) => (
                    <div key={st.stage} style={{ background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)" }}>
                      <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "10px" }}>{st.stage}</div>
                      {st.steps.map((s, j) => (
                        <p key={j} style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.65, color: "var(--ink)", marginBottom: "10px", paddingLeft: "14px", borderLeft: "2px solid rgba(20,17,12,0.12)" }}>{s}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {data && data.connections?.length > 0 && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>One life, not boxes</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)" }}>Where this connects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)" }}>
              {data.connections.map((c) => (
                <Link key={c.href} href={c.href} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)" }}>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={{ ...wrap, display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← All of Integrated Life</Link>
            <Link href="/life/assessment" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Take the Whole-Life Assessment</Link>
          </div>
        </section>
      )}

      <PageEndNav back={{ href: "/life", label: "The Integrated Life" }} />
    </Layout>
  );
}
