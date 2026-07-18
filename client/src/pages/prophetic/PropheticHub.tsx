/**
 * Shared hub landing for a prophetic section (Prophetic Disruption or Prophetic
 * Justice). Driven entirely by a SectionConfig: the hero, the posture and
 * flagship cards, the tool links, and the topic map grouped by theme.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { getReadEssays } from "@/lib/readProgress";
import type { SectionConfig, TopicIndexEntry } from "@/lib/prophetic";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = {
  background: "var(--card)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "var(--s-4)",
  textDecoration: "none", color: "inherit", display: "block",
} as const;

export default function PropheticHub({ config }: { config: SectionConfig }) {
  // Render only published topics, so an unpublished one is simply absent, never
  // a greyed-out "coming" teaser that advertises the section's incompleteness.
  const byGroup = (g: string) => config.topics.filter((t) => t.group === g && t.ready);
  const readyCount = config.topics.filter((t) => t.ready).length;
  // The reader's device-local read memory, so a question they have finished
  // shows it (each topic marks its own slug read via useEssayCompletion).
  const readSet = getReadEssays();

  const TopicCard = ({ t }: { t: TopicIndexEntry }) => {
    const inner = (
      <>
        <div style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.25 }}>{t.title}</div>
        <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{t.blurb}</div>
        {t.ready
          ? <div style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", marginTop: "12px" }}>{readSet.has(t.slug) ? "✓ Read again →" : "Read it →"}</div>
          : <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "12px" }}>In the writing</div>}
      </>
    );
    return t.ready
      ? <Link href={`${config.base}/topic/${t.slug}`} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>{inner}</Link>
      : <div style={{ ...card, opacity: 0.82 }}>{inner}</div>;
  };

  return (
    <Layout>
      <SEOMeta title={`${config.label} — ${config.hero.title}`} description={config.hero.text.slice(0, 180)} url={`https://www.livewellbyjamesbell.co${config.base}`} />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>{config.hero.eyebrow}</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 66px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "17ch" }}>{config.hero.title}</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{config.hero.text}</p>
        </div>
      </section>

      {/* POSTURE + FLAGSHIP */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: config.flagship ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr", gap: "16px" }}>
          <Link href={`${config.base}/posture`} style={{ ...card, borderTop: "3px solid var(--mustard)", padding: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Read this first</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>{config.key === "justice" ? "The call" : "The posture"}</div>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "10px", maxWidth: "66ch" }}>{config.postureBlurb}</p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Start here →</span>
          </Link>
          {config.flagship && (
            <Link href={config.flagship.href} style={{ ...card, borderTop: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", padding: "var(--s-5)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>{config.flagship.kicker}</div>
              <div style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>{config.flagship.title}</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "10px" }}>{config.flagship.blurb}</p>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>{config.flagship.cta}</span>
            </Link>
          )}
        </div>
      </section>

      {/* TOOLS */}
      {config.tools.length > 0 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) 0" }}>
          <div style={wrap}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)" }}>Also here</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
              {config.tools.map((x) => (
                <Link key={x.href} href={x.href} style={{ ...card, borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", marginBottom: "6px" }}>{x.title}</div>
                  <div style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{x.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <StatementBand tone="dark" eyebrow="The prophets" width="36ch">
        We wanted a chaplain to bless our side; the prophets came to indict the throne itself.
      </StatementBand>

      {/* TOPICS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The questions</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>Worked one at a time</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-5)" }}>
            {`${config.topicsIntro} ${readyCount} ${readyCount === 1 ? "question" : "questions"}, each worked in full.`}
          </p>
          <SectionArt seed={`prophetic-topics-${config.key}`} />
          {config.groups.map((group) => {
            const items = byGroup(group);
            if (items.length === 0) return null;
            return (
              <div key={group} style={{ marginBottom: "var(--s-5)" }}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{group}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {items.map((t) => <TopicCard key={t.slug} t={t} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
