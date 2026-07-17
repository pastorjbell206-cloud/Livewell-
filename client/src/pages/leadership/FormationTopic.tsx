/**
 * Renders a deep formation topic from
 * client/public/leadership/formation/<slug>.json at /leadership/formation/:slug.
 *
 * Every topic follows the hub's fixed eight-part method (enforced by
 * scripts/validate-formation.mjs): the real question, why it matters, the
 * biblical foundation, the historical witness, the traditions and the debates
 * (steelmanned views), the scholarship (secular sources explicitly tested
 * against Scripture), the formation, and the practice (steps by stage).
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { toParagraphs } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface View { name: string; body: string }
interface ChristianSource { source: string; author: string; note: string }
interface SecularSource { source: string; author: string; whatItGetsRight: string; testedAgainstScripture: string }
interface Stage { stage: string; steps: string[] }
interface Part {
  id: string; title: string; body: string;
  views?: View[]; christian?: ChristianSource[]; secular?: SecularSource[]; stages?: Stage[];
}
interface Topic {
  slug: string; title: string; subtitle: string; pillar: string;
  triage: "command" | "conviction" | "wisdom"; parts: Part[];
}

const TRIAGE_LABEL: Record<string, { label: string; note: string }> = {
  command: { label: "Biblical command", note: "Scripture speaks directly. This is not a matter of style." },
  conviction: { label: "Contested conviction", note: "Faithful Christians genuinely differ. Every view here is given its strongest voice." },
  wisdom: { label: "Prudential wisdom", note: "An open skill matter. Scripture gives principles, not a blueprint." },
};

function Paragraphs({ text, light }: { text: string; light?: boolean }) {
  return (
    <>
      {toParagraphs(text).map((p, i) => (
        <p key={i} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.78, color: light ? "rgba(245,240,230,0.85)" : "var(--ink)", maxWidth: "68ch", marginBottom: "16px" }}>{p}</p>
      ))}
    </>
  );
}

export default function FormationTopic() {
  const [, params] = useRoute("/leadership/formation/:slug");
  const slug = params?.slug;
  // The fetch result is tagged with the slug it answered; data/missing are
  // derived per render, so navigating to a new slug resets the view without a
  // synchronous setState in the effect.
  const [result, setResult] = useState<{ slug: string; data: Topic | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/leadership/formation/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setResult({ slug, data: d || null }))
      .catch(() => setResult({ slug, data: null }));
  }, [slug]);

  const data = result && result.slug === slug ? result.data : null;
  const missing = !!result && result.slug === slug && result.data === null;

  const triage = data ? TRIAGE_LABEL[data.triage] : null;

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Leadership Formation`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/formation/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/leadership/formation" style={{ color: "inherit" }}>Leadership Formation</Link>
            {data?.pillar ? ` · ${data.pillar}` : ""}
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "24ch" }}>{data?.title ?? (missing ? "That topic is not here yet." : "Loading the topic…")}</h1>
          {missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
              It may have moved. Start from the{" "}
              <Link href="/leadership/formation" style={{ color: "var(--mustard)", textDecoration: "underline", textUnderlineOffset: "3px" }}>formation library</Link>.
            </p>
          )}
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch", marginBottom: "20px" }}>{data.subtitle}</p>}
          {triage && (
            <div style={{ display: "inline-flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", border: "1px solid rgba(212,160,23,0.45)", padding: "8px 14px", borderRadius: "2px" }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mustard)" }}>{triage.label}</span>
              <span style={{ fontFamily: "var(--B)", fontSize: "13px", color: "rgba(245,240,230,0.65)" }}>{triage.note}</span>
            </div>
          )}
        </div>
      </section>

      {data?.parts.map((part, i) => {
        const dark = part.id === "formation";
        const bg = dark ? "var(--charcoal)" : i % 2 ? "var(--bone-warm)" : "var(--bone)";
        const ink = dark ? "var(--charcoal-fg)" : "var(--ink)";
        return (
          <section key={part.id} style={{ background: bg, padding: "var(--s-5) var(--s-4)", color: ink }}>
            <div style={wrap}>
              <div className="eyebrow" style={{ color: dark ? "var(--mustard)" : "var(--mustard-text)", marginBottom: "8px" }}>Part {i + 1} of 8</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{part.title}</h2>
              {part.body && <Paragraphs text={part.body} light={dark} />}

              {/* Steelmanned views: each in its own voice, equal weight. */}
              {part.views && part.views.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "var(--s-3)", marginTop: "var(--s-3)" }}>
                  {part.views.map((v) => (
                    <div key={v.name} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)" }}>
                      <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "10px" }}>{v.name}</h3>
                      {toParagraphs(v.body).map((p, j) => (
                        <p key={j} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.72, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Scholarship: Christian shelf, then secular tested against Scripture. */}
              {part.christian && part.christian.length > 0 && (
                <div style={{ marginTop: "var(--s-3)" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The Christian shelf</div>
                  {part.christian.map((c) => (
                    <p key={c.source} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)", maxWidth: "68ch", marginBottom: "10px" }}>
                      <span style={{ fontStyle: "italic" }}>{c.source}</span>, {c.author}. <span style={{ color: "var(--ink-muted)" }}>{c.note}</span>
                    </p>
                  ))}
                </div>
              )}
              {part.secular && part.secular.length > 0 && (
                <div style={{ marginTop: "var(--s-3)" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The secular shelf, tested</div>
                  <div style={{ display: "grid", gap: "var(--s-2)" }}>
                    {part.secular.map((s) => (
                      <div key={s.source} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-3)" }}>
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
                </div>
              )}

              {/* Practice: concrete steps by stage of leadership life. */}
              {part.stages && part.stages.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)", marginTop: "var(--s-3)" }}>
                  {part.stages.map((st) => (
                    <div key={st.stage} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)" }}>
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

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={{ ...wrap, display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/leadership/formation" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← All deep formation topics</Link>
            <Link href="/leadership/inventory" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Take the Formation Inventory</Link>
          </div>
        </section>
      )}
    </Layout>
  );
}
