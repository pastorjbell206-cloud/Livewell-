/**
 * GroupGuide (/group-guide/:slug) — the pastor-distribution asset.
 *
 * Turns a single deep essay into something a pastor hands a whole small group:
 * a clean, print-and-forward discussion guide (opening prayer, personal
 * reflection, group discussion, an action step, a closing prayer, and where to
 * read next), built from the 60+ guides already written in
 * client/src/data/discussion-guides.ts. One pastor, one link, a whole group.
 * A capture at the foot grows the pastoral list the same way the study-guide
 * library does, without gating the share.
 */
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { DISCUSSION_GUIDES } from "@/data/discussion-guides";
import { trackGroupGuideView } from "@/lib/telemetry";

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const isSlug = (s: string) => /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(s.trim());

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--s-5)" }}>
      <h2
        style={{
          fontFamily: "var(--U)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--mustard-text)",
          marginBottom: "14px",
          paddingBottom: "8px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {label}
      </h2>
      {children}
    </section>
  );
}

function Numbered({ items }: { items: string[] }) {
  return (
    <ol style={{ margin: 0, paddingLeft: "1.2em", display: "flex", flexDirection: "column", gap: "14px" }}>
      {items.map((q, i) => (
        <li key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>
          {q}
        </li>
      ))}
    </ol>
  );
}

function Prayer({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--F)",
        fontSize: "17px",
        fontStyle: "italic",
        lineHeight: 1.7,
        color: "var(--ink-muted)",
        borderLeft: "2px solid var(--mustard)",
        paddingLeft: "16px",
        margin: 0,
      }}
    >
      {text}
    </p>
  );
}

export default function GroupGuide() {
  const { slug = "" } = useParams();
  const guide = DISCUSSION_GUIDES[slug];

  // Which essays pastors actually take to a group: the PCN distribution signal.
  // Declared before the not-found early return so the hook order stays stable.
  useEffect(() => {
    if (guide) trackGroupGuideView(slug);
  }, [slug, guide]);

  if (!guide) {
    return (
      <Layout>
        <SEOMeta title="Small-Group Guide" description="A small-group discussion guide for a LiveWell essay." />
        <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
          <div style={wrap}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--ink)", marginBottom: "12px" }}>
              No guide here yet
            </h1>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "18px" }}>
              This essay does not have a small-group guide yet. The full library of essays is a good place to start.
            </p>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Browse the essays
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOMeta
        title={`Small-Group Guide: ${guide.articleTitle}`}
        description={`A print-and-share small-group discussion guide for "${guide.articleTitle}" — reflection, discussion, an action step, and prayers.`}
      />

      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "12px" }}>Small-group guide</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            {guide.articleTitle}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch", marginBottom: "20px" }}>
            One page for a small group. Read the essay first, then work through this together. Forward the link, or print it and hand it out.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href={`/writing/${guide.slug}`}
              style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--charcoal)", background: "var(--bone)", padding: "10px 16px", borderRadius: "3px", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
            >
              Read the essay
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--bone)", background: "transparent", border: "1px solid rgba(245,240,230,0.3)", padding: "10px 16px", borderRadius: "3px", cursor: "pointer", minHeight: "44px" }}
            >
              Print this guide
            </button>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <Section label="Opening prayer">
            <Prayer text={guide.openingPrayer} />
          </Section>

          <Section label="On your own, before you meet">
            <Numbered items={guide.personalReflection} />
          </Section>

          <Section label="Discuss together">
            <Numbered items={guide.groupDiscussion} />
          </Section>

          <Section label="One thing to carry out">
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: 0 }}>{guide.actionStep}</p>
          </Section>

          <Section label="Closing prayer">
            <Prayer text={guide.closingPrayer} />
          </Section>

          {guide.suggestedReading?.length > 0 && (
            <Section label="Read next">
              <ul style={{ margin: 0, paddingLeft: "1.2em", display: "flex", flexDirection: "column", gap: "10px" }}>
                {guide.suggestedReading.map((r, i) => (
                  <li key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)" }}>
                    {isSlug(r) ? (
                      // A tappable list row, so give it the 44px target rather
                      // than leaving it at inline-text height on a phone.
                      <Link
                        href={`/writing/${r}`}
                        style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                      >
                        {r.replace(/-/g, " ")}
                      </Link>
                    ) : (
                      r
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <NewsletterSignup
            variant="inline"
            source="group-guide"
            audienceType="pastor"
            title="Guides like this, in your inbox."
            description="For pastors and small-group leaders: the essays, and the guides to teach them, one a week. No conversion bait."
          />
        </div>
      </section>
    </Layout>
  );
}
