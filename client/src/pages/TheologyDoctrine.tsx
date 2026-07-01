/**
 * Doctrine page template (/theology/doctrine/:slug) — renders one contested
 * doctrine through the fixed six-step method from its JSON file in
 * /theology/<slug>.json: the question, why it matters, the positions (each
 * steelmanned in its own voice), the biblical evidence (including the texts
 * hardest for each view), a tentative weighing labeled as the author's
 * judgment, charitable disagreement, related debates, and further reading.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TriageBadge } from "@/components/TriageBadge";
import type { Doctrine } from "@/lib/theology";
import { Prose } from "@/lib/prose";
import PageEndNav from "@/components/PageEndNav";

function StepHeading({ n, kicker, title }: { n: number; kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: "var(--s-3)" }}>
      <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{`Step ${n} · ${kicker}`}</div>
      <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1 }}>{title}</h2>
    </div>
  );
}

const section = { background: "var(--bone)", padding: "var(--s-5) var(--s-4)" } as const;
const sectionAlt = { background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" } as const;
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyDoctrine() {
  const [, params] = useRoute("/theology/doctrine/:slug");
  const slug = params?.slug;
  const [doc, setDoc] = useState<Doctrine | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setDoc(null); setMissing(false);
    fetch(`/theology/${slug}.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setDoc(d))
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <Layout>
        <section style={{ ...section, padding: "var(--s-7) var(--s-4)" }}>
          <div style={{ ...wrap, textAlign: "center" }}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "32px", fontWeight: 400, color: "var(--ink)", marginBottom: "12px" }}>This doctrine is still being written.</h1>
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", marginBottom: "20px" }}>The map is laid out, the writing comes one doctrine at a time.</p>
            <Link href="/theology" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Back to Theological Depth</Link>
          </div>
        </section>
      </Layout>
    );
  }

  if (!doc) {
    return (
      <Layout>
        <section style={{ ...section, padding: "var(--s-7) var(--s-4)" }}>
          <p style={{ ...wrap, fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center" }}>Loading…</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOMeta
        title={`${doc.title} — Theological Depth`}
        description={doc.subtitle}
        url={`https://www.livewellbyjamesbell.co/theology/doctrine/${doc.slug}`}
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Doctrine
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            {doc.title}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch", marginBottom: "20px" }}>
            {doc.subtitle}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
            <TriageBadge triage={doc.triage} />
            <span style={{ fontFamily: "var(--B)", fontSize: "14px", color: "rgba(245,240,230,0.7)", maxWidth: "54ch", fontStyle: "italic" }}>{doc.triageNote}</span>
          </div>
        </div>
      </section>

      {/* STEP 1 — THE QUESTION */}
      <section style={section}>
        <div style={wrap}>
          <StepHeading n={1} kicker="The question" title="In plain language" />
          <Prose text={doc.question} />
        </div>
      </section>

      {/* STEP 2 — WHY IT MATTERS */}
      <section style={sectionAlt}>
        <div style={wrap}>
          <StepHeading n={2} kicker="Why it matters" title="What hangs on it" />
          <Prose text={doc.whyItMatters} />
        </div>
      </section>

      {/* STEP 3 — THE POSITIONS */}
      <section style={section}>
        <div style={wrap}>
          <StepHeading n={3} kicker="The positions" title="Each in its own voice" />
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-4)", fontStyle: "italic" }}>
            Each view below is stated the way its own best defenders would state it, at its strongest. If this section has done its work, you will not be able to tell which one the author holds.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {doc.positions.map((pos) => (
              <div key={pos.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", marginBottom: "6px" }}>{pos.name}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--mustard-text)", fontWeight: 600, marginBottom: "16px" }}>{pos.inOneLine}</p>
                <Prose text={pos.bestCase} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "12px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ flex: "1 1 220px" }}>
                    <div className="eyebrow" style={{ marginBottom: "6px" }}>Voices for this view</div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{pos.advocates.join(", ")}</p>
                  </div>
                  <div style={{ flex: "1 1 220px" }}>
                    <div className="eyebrow" style={{ marginBottom: "6px" }}>Texts it leans on</div>
                    <p style={{ fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.7, color: "var(--ink-muted)" }}>{pos.keyTexts.join(" · ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 4 — THE BIBLICAL EVIDENCE */}
      <section style={sectionAlt}>
        <div style={wrap}>
          <StepHeading n={4} kicker="The biblical evidence" title="The texts, and the hard ones" />
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-4)", fontStyle: "italic" }}>
            For each passage: which view it favors, which view it presses hardest, and how the other side reads it. No view gets to keep only its easy verses.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {doc.biblicalEvidence.map((e, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}>{e.passage}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>Leans {e.leansToward}</span>
                </div>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}>{e.summary}</p>
                <div style={{ background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "6px" }}>
                    <strong style={{ color: "var(--ink)" }}>Hardest for:</strong> {e.hardFor}
                  </p>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>How they read it:</strong> {e.howOthersRead}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 5 — WEIGHING IT */}
      <section style={section}>
        <div style={wrap}>
          <StepHeading n={5} kicker="Weighing it" title="Where I think the evidence falls" />
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
            <p style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "14px" }}>
              The author's judgment, held tentatively, not settled fact
            </p>
            <Prose text={doc.weighing} />
          </div>
        </div>
      </section>

      {/* STEP 6 — CHARITABLE DISAGREEMENT */}
      <section style={sectionAlt}>
        <div style={wrap}>
          <StepHeading n={6} kicker="Charitable disagreement" title="And whether it is a hill to die on" />
          <Prose text={doc.charitableDisagreement} />
        </div>
      </section>

      {/* RELATED DEBATES */}
      {doc.relatedDebates?.length > 0 && (
        <section style={section}>
          <div style={wrap}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>Related debates</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {doc.relatedDebates.map((d, i) => (
                <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{d.topic}</h3>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)" }}>{d.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FURTHER READING */}
      {doc.furtherReading?.length > 0 && (
        <section style={sectionAlt}>
          <div style={wrap}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>Further reading</h2>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-4)", fontStyle: "italic" }}>
              The best book each side has written for itself, plus a fair overview that puts the views side by side.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {doc.furtherReading.map((b, i) => (
                <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "baseline", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "14px var(--s-4)" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)", minWidth: "120px" }}>{b.side}</span>
                  <span>
                    <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", fontStyle: "italic" }}>{b.title}</span>
                    <span style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)" }}>{`  ·  ${b.author}`}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER NAV */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/theology/how-to-use" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>How to read this fairly</Link>
          <Link href="/theology" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>All doctrines</Link>
        </div>
      </section>

      <PageEndNav back={{ href: "/theology", label: "Theological Depth" }} />
    </Layout>
  );
}
