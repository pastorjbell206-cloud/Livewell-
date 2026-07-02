/**
 * Shared topic template for a prophetic section. Renders one worked topic from
 * <base>/topics/<slug>.json: the question, why it matters, the biblical
 * foundation, the church's honest record, where Christians agree, how each side
 * captures the principle, where faithful people differ, the cost, and a charge.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { toParagraphs } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";
import type { SectionConfig, PropheticTopicData as Topic } from "@/lib/prophetic";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" } as const;
const section = { background: "var(--bone)", padding: "var(--s-5) var(--s-4)" } as const;
const sectionAlt = { background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" } as const;

function Paras({ text }: { text: string }) {
  return <>{toParagraphs(text).map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch", marginBottom: "16px" }}>{p}</p>)}</>;
}
function Head({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: "var(--s-3)" }}>
      <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{kicker}</div>
      <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1 }}>{title}</h2>
    </div>
  );
}

export default function PropheticTopic({ config }: { config: SectionConfig }) {
  const [, params] = useRoute(`${config.base}/topic/:slug`);
  const slug = params?.slug;
  const [t, setT] = useState<Topic | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setT(null); setMissing(false);
    fetch(`${config.base}/topics/${slug}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setT)
      .catch(() => setMissing(true));
  }, [slug, config.base]);

  if (missing) {
    return (
      <Layout>
        <section style={{ ...section, padding: "var(--s-7) var(--s-4)" }}>
          <div style={{ ...wrap, textAlign: "center" }}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "32px", fontWeight: 400, color: "var(--ink)", marginBottom: "12px" }}>This one is still being written.</h1>
            <Link href={config.base} style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Back to {config.label}</Link>
          </div>
        </section>
      </Layout>
    );
  }
  if (!t) return <Layout><section style={{ ...section, padding: "var(--s-7) var(--s-4)" }}><p style={{ ...wrap, fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center" }}>Loading…</p></section></Layout>;

  return (
    <Layout>
      <SEOMeta title={`${t.title} — ${config.label}`} description={t.subtitle} url={`https://www.livewellbyjamesbell.co${config.base}/topic/${t.slug}`} />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href={config.base} style={{ color: "inherit" }}>{config.label}</Link> · A worked question
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>{t.title}</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>{t.subtitle}</p>
        </div>
      </section>

      <section style={section}><div style={wrap}><Head kicker="The question" title="In plain language" /><Paras text={t.question} /></div></section>
      <section style={sectionAlt}><div style={wrap}><Head kicker="Why it matters" title="What hangs on it" /><Paras text={t.whyItMatters} /></div></section>

      <section style={section}>
        <div style={wrap}>
          <Head kicker="The biblical foundation" title="What the text actually says" />
          <Paras text={t.biblicalFoundation} />
          {t.keyTexts?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {t.keyTexts.map((r) => <Link key={r} href={`/theology/passage?ref=${encodeURIComponent(r)}`} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", border: "1px solid var(--mustard)", borderRadius: "999px", padding: "6px 12px" }}>{r}</Link>)}
            </div>
          )}
        </div>
      </section>

      <section style={sectionAlt}>
        <div style={wrap}>
          <Head kicker="The church's record" title="Where it led, and where it failed" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div style={{ ...card, padding: "var(--s-4)", borderTop: "3px solid #3E5C3A" }}>
              <div className="eyebrow" style={{ color: "#3E5C3A", marginBottom: "8px" }}>Where it led</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{t.churchRecord.led}</p>
            </div>
            <div style={{ ...card, padding: "var(--s-4)", borderTop: "3px solid #7A1F1F" }}>
              <div className="eyebrow" style={{ color: "#7A1F1F", marginBottom: "8px" }}>Where it failed</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{t.churchRecord.failed}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={wrap}>
          <Head kicker="The common ground" title="Where nearly all Christians agree" />
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch", background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "16px 18px" }}>{t.whereWeAgree}</p>
        </div>
      </section>

      <section style={sectionAlt}>
        <div style={wrap}>
          <Head kicker="How the principle gets captured" title="The distortion on each side" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div style={{ ...card, padding: "var(--s-4)" }}>
              <div className="eyebrow" style={{ marginBottom: "8px" }}>How one side distorts it</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{t.captureLeft}</p>
            </div>
            <div style={{ ...card, padding: "var(--s-4)" }}>
              <div className="eyebrow" style={{ marginBottom: "8px" }}>How the other side distorts it</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{t.captureRight}</p>
            </div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <div className="eyebrow" style={{ marginBottom: "8px", color: "var(--mustard-text)" }}>Where faithful people legitimately differ</div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "68ch" }}>{t.whereWeDiffer}</p>
          </div>
        </div>
      </section>

      {/* CAPTURE DETAIL: what it looks like, past and present, each side */}
      {t.captureDetail && (
        <section style={section}>
          <div style={wrap}>
            <Head kicker="What it looks like" title="The capture in detail, past and present" />
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "var(--s-4)", fontStyle: "italic" }}>
              The same sin, named on each side with equal candor. Movements and documented record, not private accusation.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
              {[t.captureDetail.right, t.captureDetail.left].map((s, i) => (
                <div key={i} style={{ ...card, padding: "var(--s-4)", borderTop: "3px solid var(--mustard)" }}>
                  <div style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)", marginBottom: "10px" }}>{s.label}</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "14px" }}>{s.whatItLooksLike}</p>
                  <div className="eyebrow" style={{ marginBottom: "4px" }}>In the past</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "12px" }}>{s.inThePast}</p>
                  <div className="eyebrow" style={{ marginBottom: "4px" }}>Now</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "12px" }}>{s.now}</p>
                  {s.named?.length > 0 && (
                    <>
                      <div className="eyebrow" style={{ marginBottom: "6px" }}>Named</div>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                        {s.named.map((n, j) => <li key={j} style={{ marginBottom: "4px" }}>{n}</li>)}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={sectionAlt}>
        <div style={wrap}>
          <Head kicker="The cost" title="What truth costs here" />
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch" }}>{t.theCost}</p>
        </div>
      </section>

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>The charge</div>
          {t.charge.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, lineHeight: 1.5, color: "var(--bone)", maxWidth: "60ch", marginBottom: "14px" }}>{p}</p>)}
        </div>
      </section>

      {t.furtherReading?.length > 0 && (
        <section style={sectionAlt}>
          <div style={wrap}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>Further reading</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {t.furtherReading.map((b, i) => (
                <div key={i} style={{ ...card, padding: "12px var(--s-4)" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", fontStyle: "italic" }}>{b.title}</span>
                  <span style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)" }}>{`  ·  ${b.author}`}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)", borderTop: "1px solid rgba(245,240,230,0.12)" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
          <Link href={`${config.base}/posture`} style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Read the {config.key === "justice" ? "call" : "posture"} first</Link>
          <Link href={config.base} style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>All of {config.label} →</Link>
        </div>
      </section>
    </Layout>
  );
}
