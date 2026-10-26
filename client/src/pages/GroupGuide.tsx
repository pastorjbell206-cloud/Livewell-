/**
 * GroupGuide (/group-guide/:slug) — the pastor-distribution asset.
 *
 * Turns a single deep essay into something a pastor hands a whole small group:
 * a clean, print-and-forward discussion guide (opening prayer, personal
 * reflection, group discussion, an action step, a closing prayer, and where to
 * read next), built from the 90 guides already written in
 * client/src/data/discussion-guides.ts. One pastor, one link, a whole group.
 * A capture at the foot grows the pastoral list the same way the study-guide
 * library does, without gating the share.
 *
 * The guides were written for essays that are mostly off the public shelf
 * now (lib/shelf.ts), so "Read the essay" and each "Read next" essay appear
 * only when that essay is public, under its shelf title; a book stays as
 * written. A leader can send the guide to their phone, save it to My Library,
 * or print it (TakeItWithYou); printed, it is ink on paper in either theme.
 */
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TakeItWithYou } from "@/components/TakeItWithYou";
import { DISCUSSION_GUIDES } from "@/data/discussion-guides";
import { isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import { trackGroupGuideView } from "@/lib/telemetry";

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const isSlug = (s: string) => /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(s.trim());

/**
 * A "Read next" line as the reader sees it: a public essay as a link under
 * its real title, a book as written, and nothing at all for an essay that is
 * off the shelf (its link would land on a takedown notice).
 */
function readNextItem(entry: string): { text: string; href?: string } | null {
  if (!isSlug(entry)) return { text: entry };
  const slug = entry.trim();
  if (!isPublicEssay(slug)) return null;
  const title = overrideMeta(slug)?.title || shelfEntry(slug)?.title;
  return title ? { text: title, href: `/writing/${slug}` } : null;
}

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

  const essayIsPublic = isPublicEssay(guide.slug);
  const readNext = (guide.suggestedReading ?? []).map(readNextItem).filter((r): r is { text: string; href?: string } => r !== null);

  return (
    <Layout>
      <SEOMeta
        title={`Small-Group Guide: ${guide.articleTitle}`}
        description={`A print-and-share small-group discussion guide for "${guide.articleTitle}" — reflection, discussion, an action step, and prayers.`}
      />

      {/* print-paper: printed, the guide is ink on paper whatever the theme,
          the title included, though on screen it sits on the charcoal band
          (index.css, end of file). */}
      <section className="print-paper" style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "12px" }}>Small-group guide</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: "16px" }}>
            {guide.articleTitle}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "60ch", marginBottom: essayIsPublic ? "20px" : 0 }}>
            {essayIsPublic
              ? "One page for a small group. Read the essay first, then work through this together. Forward the link, or print it and hand it out."
              : "One page for a small group to work through together. Forward the link, or print it and hand it out."}
          </p>
          {essayIsPublic && (
            <div className="no-print" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href={`/writing/${guide.slug}`}
                style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--charcoal)", background: "var(--charcoal-fg)", padding: "10px 16px", borderRadius: "var(--radius-sm)", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
              >
                Read the essay
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="print-paper" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <TakeItWithYou
            title={`Small-group guide: ${guide.articleTitle}`}
            kind="Discussion guide"
            href={`/group-guide/${guide.slug}`}
            summary="A one-page small-group guide: prayers to open and close, questions for reflection and discussion, and one thing to carry out."
            print
          />
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

          {readNext.length > 0 && (
            <Section label="Read next">
              <ul style={{ margin: 0, paddingLeft: "1.2em", display: "flex", flexDirection: "column", gap: "10px" }}>
                {readNext.map((r, i) => (
                  <li key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)" }}>
                    {r.href ? (
                      // A tappable list row, so give it the 44px target rather
                      // than leaving it at inline-text height on a phone.
                      <Link
                        href={r.href}
                        style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                      >
                        {r.text}
                      </Link>
                    ) : (
                      r.text
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </section>

      <section className="no-print" style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
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
