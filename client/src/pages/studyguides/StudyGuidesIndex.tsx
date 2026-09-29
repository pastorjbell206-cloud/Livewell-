/**
 * Study Guides index (/studyguides). One place that gathers every Leader's
 * Toolkit. Each guide is a full small-group suite (leader's guide, participant
 * handout, facilitator script, promo kit) with email-gated PDF downloads on the
 * guide's own page. Card metadata is in client/src/lib/studyguides-index.ts.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { STUDY_GUIDES, type StudyGuideEntry } from "@/lib/studyguides-index";
import { GeneratedCover, coverThemeFor } from "@/components/GeneratedCover";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

/** "Audience · sessions", skipping whichever field a guide left blank. */
const metaOf = (g: StudyGuideEntry) => [g.audience, g.sessionsLabel].filter(Boolean).join(" · ");

export default function StudyGuidesIndex() {
  // Load the generated manifest so new guides appear automatically; fall back
  // to the bundled list if the manifest has not been built yet.
  const [guides, setGuides] = useState<StudyGuideEntry[]>(STUDY_GUIDES);
  useEffect(() => {
    fetch("/studyguides/index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.guides?.length) setGuides(d.guides); })
      .catch(() => {});
  }, []);
  const [lead, ...rest] = guides;
  return (
    <Layout>
      <SEOMeta
        title="Study Guides — Free Leader's Toolkits for Small Groups and Sunday School"
        description="Free, ready-to-run study guides on the questions the church tends to avoid. Each is a full leader's toolkit with handout, script, and printable PDFs."
        url="https://www.livewellbyjamesbell.co/studyguides"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Study Guides · Leader's Toolkits</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            Teach the hard things well
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Each guide is a full toolkit for the person at the front of the room: a leader's guide with the answer behind every question, a participant handout, a facilitator script, and printable PDFs. Run a class on Sunday with no prep. Every guide is free, and the PDFs download right here.
          </p>
        </div>
      </section>

      {/* THE GUIDES. One lead given room (the only cover on the page), then the
          rest as an index. In the built manifest g.eyebrow is each guide's
          one-line subtitle, so it serves as the dek; the long blurb stays on
          the toolkit page. The data carries no theme or category field, so
          there are no filter chips here. */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>The collection</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-4)" }}>
            Free guides for groups, classes, and teams
          </h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-2)" }}>
            {guides.length} {guides.length === 1 ? "guide" : "guides"}
          </p>

          {lead && (
            <Link
              href={`/studyguides/${lead.slug}`}
              className="ed-card"
              style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: "var(--s-3) var(--s-4)", marginBottom: "var(--s-5)" }}
            >
              <div aria-hidden style={{ flex: "0 0 auto", width: "clamp(120px, 16vw, 176px)" }}>
                <GeneratedCover title={lead.title} {...coverThemeFor(`${lead.title} ${lead.eyebrow}`)} />
              </div>
              <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 className="ed-card-title" style={{ fontSize: "clamp(1.7rem, 1.25rem + 1.4vw, 2.4rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  {lead.title}
                </h3>
                {lead.eyebrow && (
                  <p className="ed-card-dek" style={{ fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "60ch" }}>{lead.eyebrow}</p>
                )}
                {metaOf(lead) && <div className="ed-meta" style={{ marginTop: 0 }}>{metaOf(lead)}</div>}
                <div className="ed-card-foot" style={{ justifyContent: "flex-start" }}>
                  <span>Open the toolkit</span>
                  <span className="ed-arrow" aria-hidden>→</span>
                </div>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <EditorialIndex
              label="Study guides"
              items={rest.map((g) => ({
                href: `/studyguides/${g.slug}`,
                title: g.title,
                dek: g.eyebrow || null,
                meta: metaOf(g),
              }))}
            />
          )}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--charcoal-fg)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,230,0.85)", marginBottom: "20px" }}>
            More guides are on the way. The booklets, libraries, and tools for leaders live in the wider resource hub.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/resources" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>All resources</Link>
            <Link href="/resources/hard-issues-series" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>The Hard Issues Series</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
