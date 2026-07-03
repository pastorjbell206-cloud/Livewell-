/**
 * ForLeaders — leadership-focused content page.
 *
 * Previous version had the same structural bugs ForPastors.tsx had:
 *   1) filtered on post.audienceType (field doesn't exist; it's `audience`)
 *   2) routed to /article/${slug} (actual route is /writing/${slug})
 *   3) used old verbose pillar names
 *   4) shipped <Button>Join Leaders Circle</Button> with no onClick
 *
 * All four are fixed. Mirrors the ForPastors rewrite pattern.
 */
import { useMemo } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TrackChip } from "@/components/TrackChip";
import { trpc } from "@/lib/trpc";
import { pillarToTrack, PRIMARY_TRACKS, trackUrl } from "@/lib/taxonomy";

const LEADER_TRACK_SLUGS = ["pastoral-ministry", "american-church", "after-christendom"];

export default function ForLeaders() {
  const { data: posts, isLoading } = trpc.posts.listPublished.useQuery();

  const leaderArticles = useMemo(() => {
    if (!posts) return [];
    return posts.filter(p => {
      const track = pillarToTrack(p.pillar);
      const isLeaderTrack = LEADER_TRACK_SLUGS.includes(track ?? "");
      const isLeaderAudience =
        p.audience === "church-leaders" || p.audience === "pastors";
      return isLeaderTrack || isLeaderAudience;
    });
  }, [posts]);

  const featured = leaderArticles.slice(0, 3);
  const rest = leaderArticles.slice(3, 11);

  const tracksToShow = PRIMARY_TRACKS.filter(t =>
    LEADER_TRACK_SLUGS.includes(t.slug)
  );

  return (
    <Layout>
      <SEOMeta
        title="For Church Leaders — Resources for the Work"
        description="Leadership formation, prophetic witness, and pastoral wisdom for elders, deacons, and ministry leaders."
        url="https://www.livewellbyjamesbell.co/for-leaders"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            For Church Leaders
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              marginBottom: "20px",
            }}
          >
            Leadership formation under cost.
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
            Vision, governance, the elder team, the slow work of forming a
            congregation that can carry weight. Essays and resources for the
            leaders who do the work nobody sees.
          </p>
          <div style={{ display: "inline-flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
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
                Resource Wall
              </button>
            </Link>
          </div>
        </div>
      </section>

      {isLoading && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center" }}>
            Loading essays…
          </p>
        </section>
      )}

      {!isLoading && featured.length > 0 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <div className="eyebrow" style={{ marginBottom: "12px" }}>
              Featured for Leaders
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
              The essays leaders keep returning to.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {featured.map(post => (
                <Link key={post.id} href={`/writing/${post.slug}`} style={{ textDecoration: "none" }}>
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
                      <span style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Read →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>Browse by Track</div>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {tracksToShow.map(t => (
              <Link key={t.slug} href={trackUrl(t.slug)} style={{ textDecoration: "none" }}>
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
                  <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                    {t.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {rest.length > 0 && (
            <div style={{ marginTop: "var(--s-5)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {rest.map(post => (
                  <Link key={post.id} href={`/writing/${post.slug}`} style={{ textDecoration: "none" }}>
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
                      <div style={{ fontFamily: "var(--U)", fontSize: "11px", color: "var(--ink-muted)" }}>
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

      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="for-leaders"
            audienceType="pastor"
            title="The Pastor's Letter — Tuesday morning."
            description="Written for leaders carrying the weight. One essay, one sermon-prep idea, one resource."
          />
        </div>
      </section>
    </Layout>
  );
}
