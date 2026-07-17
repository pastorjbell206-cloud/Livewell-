/**
 * /skeptic-track — the category-of-one play.
 *
 * Per the competitor audit: every Christian peer pitches to Christians and
 * pastors. None of them have a "Start here if you're skeptical" path that
 * takes the doubter seriously. Bell's #1 stated audience is skeptics; this
 * page is the front door for them.
 *
 * The seven essays are referenced by slug. If a slug isn't in the DB yet,
 * the card renders with a placeholder so the page never breaks.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import PillarLeadMagnet from "@/components/PillarLeadMagnet";
import { trpc } from "@/lib/trpc";
import { SITE_URL } from "@/lib/site";
import { NEWSLETTER_PITCH_SKEPTIC } from "@/lib/positioning";
import { SKEPTIC_STOPS } from "@/lib/skepticTrack";

export default function SkepticTrack() {
  const { data: articles } = trpc.posts.listForIndex.useQuery();
  const bySlug = new Map((articles ?? []).map(a => [a.slug, a]));

  const trackUrl = `${SITE_URL}/skeptic-track`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Skeptic's Track",
    description:
      "Seven essays in argument order — written for skeptics first, by a pastor who came to faith from atheism.",
    url: trackUrl,
    itemListElement: SKEPTIC_STOPS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: s.slug ? `${SITE_URL}/writing/${s.slug}` : trackUrl,
    })),
  };

  return (
    <Layout>
      <SEOMeta
        title="The Skeptic's Track — Start here"
        description="Seven essays in argument order. Written for skeptics first by a pastor who came to faith from atheism. No conversion bait."
        url={trackUrl}
        type="website"
        structuredData={schema}
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
          color: "var(--charcoal-fg)",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            The Skeptic's Track
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--charcoal-fg)",
              marginBottom: "20px",
              maxWidth: "20ch",
            }}
          >
            Start here if you're skeptical.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.75)",
              maxWidth: "62ch",
              marginBottom: "28px",
            }}
          >
            Seven essays in argument order. Written for the version of me that
            was an atheist. No conversion bait. No bad apologetics. The
            questions I'd take seriously if I were you, and the answers I
            actually have for them.
          </p>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "13px",
              color: "rgba(245,240,230,0.55)",
              letterSpacing: "0.05em",
            }}
          >
            — James Bell, who came to faith from atheism at 24.
          </p>
        </div>
      </section>

      {/* THE STOPS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          {SKEPTIC_STOPS.map(stop => {
            const post = stop.slug ? bySlug.get(stop.slug) : undefined;
            // The body of a stop: the title, pitch, and status line. Rendered
            // inside a <Link> when the essay is live, and inside a plain <div>
            // (no href, not clickable) when it is still in progress, so an
            // unwritten stop is never an active promise.
            const body = (
              <div style={{ cursor: post ? "pointer" : "default" }}>
                <h2
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "28px",
                    fontWeight: 400,
                    letterSpacing: "-0.015em",
                    color: post ? "var(--ink)" : "var(--ink-muted)",
                    lineHeight: 1.2,
                    marginBottom: "12px",
                  }}
                >
                  {stop.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "var(--ink-muted)",
                    marginBottom: "14px",
                    maxWidth: "62ch",
                  }}
                >
                  {stop.pitch}
                </p>
                <div
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: post ? "var(--mustard-text)" : "var(--ink-muted)",
                  }}
                >
                  {post ? `Read · ${post.readingTimeMinutes ?? 8} min` : "Essay in progress"}
                </div>
              </div>
            );
            return (
              <article
                key={stop.title}
                style={{ borderTop: "1px solid var(--border)", padding: "var(--s-4) 0" }}
              >
                {post ? (
                  <Link
                    href={`/writing/${post.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* LEAD MAGNET — email-gated reading path */}
      <PillarLeadMagnet
        kicker="Free Reading Path"
        title="The Skeptic's Reading Path"
        blurb="Four studies, in the order I'd hand them to the version of me that was an atheist — the questions worth asking, the resurrection, the whole story, the ancient creed underneath it. A short PDF, no conversion bait."
        slug="skeptic"
        downloadLabel="Get the reading path (PDF)"
        source="reading-path-skeptic"
      />

      {/* NEWSLETTER — skeptic-specific */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="skeptic-track"
            audienceType="skeptic"
            title={NEWSLETTER_PITCH_SKEPTIC.title}
            description={NEWSLETTER_PITCH_SKEPTIC.description}
          />
        </div>
      </section>
    </Layout>
  );
}
