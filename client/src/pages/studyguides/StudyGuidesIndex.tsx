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

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

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
  return (
    <Layout>
      <SEOMeta
        title="Study Guides — Free Leader's Toolkits for Small Groups and Sunday School"
        description="Free, ready-to-run study guides on the questions the church tends to avoid. Each is a full leader's toolkit with handout, script, and printable PDFs."
        url="https://www.livewellbyjamesbell.co/studyguides"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
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

      {/* THE GUIDES */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>The collection</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-4)" }}>
            Free guides for groups, classes, and teams
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(380px, 100%), 1fr))", gap: "16px" }}>
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/studyguides/${g.slug}`}
                style={{ display: "flex", gap: "16px", textDecoration: "none", color: "inherit", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderRadius: "var(--radius-sm)", overflow: "hidden", height: "100%" }}
              >
                <div style={{ width: "104px", flexShrink: 0, alignSelf: "flex-start", aspectRatio: "3 / 4", overflow: "hidden" }}>
                  <GeneratedCover title={g.title} {...coverThemeFor(`${g.title} ${g.eyebrow}`)} style={{ width: "100%", height: "100%" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, padding: "var(--s-4) var(--s-4) var(--s-4) 0" }}>
                  {/* Simplified card: cover, title, the sessions/audience line, and
                      the link. The eyebrow descriptor and full blurb live on the
                      toolkit page (both fields stay in the data, just not rendered
                      here). g.eyebrow still feeds the cover theme above. */}
                  <div style={{ fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.18, marginBottom: "10px" }}>{g.title}</div>
                  <div style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginBottom: "12px" }}>{g.audience} · {g.sessionsLabel}</div>
                  <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px", alignSelf: "flex-start", marginTop: "auto" }}>
                    Open the toolkit →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)", textAlign: "center" }}>
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
