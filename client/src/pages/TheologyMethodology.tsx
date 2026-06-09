/**
 * Pillar 0 — How to use this section (/theology/how-to-use). The reading
 * posture for the whole Theological Depth section: the doctrinal triage
 * framework, the author's stated interpretive lens, the difference between
 * 'the Bible clearly says' and 'my tradition reads it this way', how to change
 * your mind well, and the reminder that this is for the soul, not the
 * scorecard. Content: /theology/methodology.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TriageBadge } from "@/components/TriageBadge";
import type { Triage } from "@/lib/theology";

interface TriageLevel { level: Triage; label: string; headline: string; body: string; }
interface Methodology {
  title: string; subtitle: string;
  triageHeading: string; triageIntro: string; triageLevels: TriageLevel[];
  lensHeading: string; lensFlag: string; lensBody: string;
  clearlyHeading: string; clearlyBody: string;
  humilityHeading: string; humilityBody: string;
  formationHeading: string; formationBody: string;
}

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch", marginBottom: "16px" }}>{p}</p>
      ))}
    </>
  );
}

function Block({ kicker, title, children, alt }: { kicker: string; title: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section style={{ background: alt ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
      <div style={wrap}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{kicker}</div>
        <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function TheologyMethodology() {
  const [m, setM] = useState<Methodology | null>(null);
  useEffect(() => {
    fetch("/theology/methodology.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setM(d))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="How to Use This Section — Theological Depth"
        description="Before the doctrines, the ground rules: the first, second, and third order triage framework, the author's interpretive lens, and how to disagree well."
        url="https://www.livewellbyjamesbell.co/theology/how-to-use"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Start here
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            {m?.title ?? "How to Use This Section"}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "64ch" }}>
            {m?.subtitle ?? "Before the doctrines, the ground rules."}
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
          {/* TRIAGE FRAMEWORK */}
          <Block kicker="The most useful thing here" title={m.triageHeading}>
            <Prose text={m.triageIntro} />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "var(--s-4)" }}>
              {m.triageLevels.map((lvl) => (
                <div key={lvl.level} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                  <div style={{ marginBottom: "12px" }}><TriageBadge triage={lvl.level} /></div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "10px" }}>{lvl.headline}</h3>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "68ch" }}>{lvl.body}</p>
                </div>
              ))}
            </div>
          </Block>

          {/* AUTHOR'S LENS */}
          <Block kicker="Honesty about the writer" title={m.lensHeading} alt>
            {m.lensFlag && (
              <div style={{ background: "rgba(212,160,23,0.14)", border: "1px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "12px 16px", marginBottom: "var(--s-4)", maxWidth: "68ch" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, lineHeight: 1.6, color: "var(--mustard-text)" }}>{m.lensFlag}</p>
              </div>
            )}
            <Prose text={m.lensBody} />
          </Block>

          {/* CLEARLY SAYS VS TRADITION */}
          <Block kicker="Two sentences to tell apart" title={m.clearlyHeading}>
            <Prose text={m.clearlyBody} />
          </Block>

          {/* CHANGING YOUR MIND */}
          <Block kicker="Epistemic humility" title={m.humilityHeading} alt>
            <Prose text={m.humilityBody} />
          </Block>

          {/* FORMATION */}
          <Block kicker="A word before you begin" title={m.formationHeading}>
            <Prose text={m.formationBody} />
            <div style={{ marginTop: "var(--s-4)" }}>
              <Link href="/theology" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                Now to the doctrines →
              </Link>
            </div>
          </Block>
        </>
      )}
    </Layout>
  );
}
