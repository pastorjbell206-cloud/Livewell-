/**
 * ForPastors — the strategic PCN entry point.
 *
 * Previous version:
 *   1) filtered on post.audienceType (field doesn't exist; it's `audience`)
 *   2) routed to /article/${slug} (actual route is /writing/${slug})
 *   3) used old verbose pillar names ("Prophetic Disruption" etc.)
 *   4) shipped <Button>Join Pastors Community</Button> with no onClick
 *
 * All four are fixed. The page now queries posts.listPublished, filters
 * for the pastoral-ministry track using the canonical taxonomy, and links
 * to the right route. CTAs route to /pastors (PCN) and /pastors-resource-wall.
 */
import { useMemo } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TrackChip } from "@/components/TrackChip";
import { trpc } from "@/lib/trpc";
import { pillarToTrack, PRIMARY_TRACKS, trackUrl } from "@/lib/taxonomy";
import { NEWSLETTER_PITCH_PASTORAL } from "@/lib/positioning";

const PASTORAL_TRACK_SLUG = "pastoral-ministry";

export default function ForPastors() {
  const { data: posts, isLoading } = trpc.posts.listPublished.useQuery();

  // Articles tagged for pastors via canonical taxonomy (track + audience).
  const pastorArticles = useMemo(() => {
    if (!posts) return [];
    return posts.filter(p => {
      const track = pillarToTrack(p.pillar);
      const isPastorTrack = track === PASTORAL_TRACK_SLUG;
      const isPastorAudience = p.audience === "pastors" || p.audience === "church-leaders";
      return isPastorTrack || isPastorAudience;
    });
  }, [posts]);

  const featured = pastorArticles.slice(0, 3);
  const rest = pastorArticles.slice(3);

  // Available subtopic tracks (for the chip filter UX in v2 — for now we
  // just show counts so the page communicates breadth).
  const tracksToShow = PRIMARY_TRACKS.filter(t =>
    ["pastoral-ministry", "american-church", "after-christendom", "prophetic-justice"].includes(t.slug)
  );

  return (
    <Layout>
      <SEOMeta
        title="For Pastors — Resources for the work"
        description="Essays, sermon-prep helpers, and the Pastors Connection Network — for pastors carrying the weight of the work."
        url="https://www.livewellbyjamesbell.co/for-pastors"
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--w-content)",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            For Pastors
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--charcoal-fg)",
              marginBottom: "20px",
            }}
          >
            Resources for the work.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.75)",
              maxWidth: "60ch",
              margin: "0 auto 32px",
            }}
          >
            Pastoring is the work that does not finish. The Pastors Connection
            Network exists so you do not do it alone. Essays for the long
            stretches, sermon prep for Sunday morning, and the loneliness
            named at the center of the calling.
          </p>
          <div
            style={{
              display: "inline-flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link href="/pastors" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  background: "var(--bone)",
                  color: "var(--ink)",
                  border: "none",
                  borderBottom: "2px solid var(--mustard)",
                  padding: "14px 28px",
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Join the PCN
              </button>
            </Link>
            <Link href="/pastors-resource-wall" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  background: "transparent",
                  color: "var(--bone)",
                  border: "1px solid rgba(245,240,230,0.25)",
                  padding: "14px 28px",
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Pastor's Resource Wall
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {isLoading && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <p
            style={{
              fontFamily: "var(--U)",
              color: "var(--ink-muted)",
              textAlign: "center",
            }}
          >
            Loading essays…
          </p>
        </section>
      )}

      {!isLoading && featured.length > 0 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <div className="eyebrow" style={{ marginBottom: "12px" }}>
              Featured for Pastors
            </div>
            <h2
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                marginBottom: "var(--s-5)",
              }}
            >
              The essays pastors keep coming back to.
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {featured.map(post => (
                <Link
                  key={post.id}
                  href={`/writing/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderLeft: "2px solid var(--mustard)",
                      padding: "var(--s-4)",
                      borderRadius: "var(--radius-sm)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>
                      <TrackChip pillarOrTrack={post.pillar} slug={post.slug} asLink={false} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "22px",
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: "12px",
                        lineHeight: 1.25,
                        flex: 1,
                      }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p
                        style={{
                          fontFamily: "var(--B)",
                          fontSize: "14px",
                          lineHeight: 1.6,
                          color: "var(--ink-muted)",
                          marginBottom: "16px",
                        }}
                      >
                        {post.excerpt.slice(0, 140)}
                        {post.excerpt.length > 140 ? "…" : ""}
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "var(--U)",
                        fontSize: "12px",
                        color: "var(--ink-muted)",
                      }}
                    >
                      <span>{post.readingTimeMinutes ?? 5} min read</span>
                      <span style={{ color: "var(--mustard-text)", fontWeight: 600 }}>
                        Read →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRACK BROWSER */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Browse by Track
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(24px, 3vw, 30px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              marginBottom: "var(--s-4)",
            }}
          >
            What part of the work?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {tracksToShow.map(t => (
              <Link
                key={t.slug}
                href={trackUrl(t.slug)}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "20px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    height: "100%",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--mustard)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      letterSpacing: "-0.005em",
                      marginBottom: "8px",
                    }}
                  >
                    {t.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "var(--ink-muted)",
                    }}
                  >
                    {t.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {rest.length > 0 && (
            <div style={{ marginTop: "var(--s-5)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {rest.slice(0, 8).map(post => (
                  <Link
                    key={post.id}
                    href={`/writing/${post.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <article
                      style={{
                        padding: "16px",
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}
                    >
                      <TrackChip pillarOrTrack={post.pillar} slug={post.slug} asLink={false} />
                      <h4
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "17px",
                          fontWeight: 500,
                          color: "var(--ink)",
                          marginTop: "10px",
                          marginBottom: "8px",
                          lineHeight: 1.3,
                        }}
                      >
                        {post.title}
                      </h4>
                      <div
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "11px",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {post.readingTimeMinutes ?? 5} min read
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PASTORAL LETTER NEWSLETTER */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="for-pastors"
            audienceType="pastor"
            title={NEWSLETTER_PITCH_PASTORAL.title}
            description={NEWSLETTER_PITCH_PASTORAL.description}
          />
        </div>
      </section>
    </Layout>
  );
}
