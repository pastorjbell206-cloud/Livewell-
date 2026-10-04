/**
 * Shared hub landing for a prophetic section (Prophetic Disruption or Prophetic
 * Justice). Driven entirely by a SectionConfig: the hero, the posture and
 * flagship cards, the tool links, and the topic map grouped by theme.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { CardGrid } from "@/components/editorial/CardGrid";
import { getReadEssays } from "@/lib/readProgress";
import SubjectShelf from "@/components/SubjectShelf";
import { subjectById } from "@/lib/subjects";
import type { SectionConfig } from "@/lib/prophetic";

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

  return (
    <Layout>
      <SEOMeta title={`${config.label} — ${config.hero.title}`} description={config.hero.text.slice(0, 180)} url={`https://www.livewellbyjamesbell.co${config.base}`} />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>{config.hero.eyebrow}</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 66px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "17ch" }}>{config.hero.title}</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{config.hero.text}</p>
        </div>
      </section>

      {/* POSTURE + FLAGSHIP */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: config.flagship ? "repeat(auto-fit, minmax(min(400px, 100%), 1fr))" : "1fr", gap: "16px" }}>
          <Link href={`${config.base}/posture`} style={{ ...card, borderTop: "3px solid var(--mustard)", padding: "clamp(var(--s-3), 5vw, var(--s-5))" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Read this first</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>{config.key === "justice" ? "The call" : "The posture"}</div>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "10px", maxWidth: "66ch" }}>{config.postureBlurb}</p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Start here →</span>
          </Link>
          {config.flagship && (
            <Link href={config.flagship.href} style={{ ...card, borderTop: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", padding: "clamp(var(--s-3), 5vw, var(--s-5))" }}>
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
            <CardGrid items={config.tools.map((x) => ({ href: x.href, title: x.title, dek: x.desc }))} />
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
                <h3 style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 var(--s-2)" }}>
                  {group}
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>{" "}{items.length}</span>
                </h3>
                <EditorialIndex
                  label={group}
                  headingAs="h4"
                  items={items.map((t) => ({ href: `${config.base}/topic/${t.slug}`, title: t.title, dek: t.blurb, read: readSet.has(t.slug) }))}
                />
              </div>
            );
          })}
        </div>
      </section>
      {(() => {
        // Each prophetic section gathers its own subject across the library:
        // Justice pulls the justice writing, Disruption the church-and-power work.
        const subject = subjectById(config.key === "justice" ? "justice" : "politics-and-power");
        return subject ? <SubjectShelf subject={subject} /> : null;
      })()}
    </Layout>
  );
}
