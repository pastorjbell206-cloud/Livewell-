/**
 * Home — Substack-shaped landing page.
 *
 * Per James's brief: "Pastor and essayist writing on theology, politics, and
 * the American church after Christendom. New essays weekly." The homepage
 * leads with the lede track, surfaces the latest essays, and converts via
 * the segmented signup form (skeptic / Christian / pastor / exploring).
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import MinimalNav from "@/components/MinimalNav";
import { SegmentedSignup } from "@/components/SegmentedSignup";
import { SEOMeta } from "@/components/SEOMeta";
import { TrackChip } from "@/components/TrackChip";
import { trpc } from "@/lib/trpc";
import {
  META_DESCRIPTION,
  PRIMARY_HEADLINE,
  PRIMARY_KICKER,
  PRIMARY_SUBHEAD,
} from "@/lib/positioning";
import { FEATURED_TRACKS, PRIMARY_TRACKS, trackUrl } from "@/lib/taxonomy";

interface LastRead {
  slug: string;
  title: string;
  pillar?: string;
  ts?: number;
}

/**
 * Read the "pick up where you left off" pointer from localStorage. Guarded for
 * SSR (no window), missing/empty values, and malformed JSON. Returns null when
 * there is nothing valid to surface.
 */
function readLastRead(): LastRead | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("livewell:last-read");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LastRead> | null;
    if (
      !parsed ||
      typeof parsed.slug !== "string" ||
      !parsed.slug.trim() ||
      typeof parsed.title !== "string" ||
      !parsed.title.trim()
    ) {
      return null;
    }
    return {
      slug: parsed.slug,
      title: parsed.title,
      pillar: typeof parsed.pillar === "string" ? parsed.pillar : undefined,
      ts: typeof parsed.ts === "number" ? parsed.ts : undefined,
    };
  } catch {
    return null;
  }
}

/** Guided-entry chips — "Where are you starting from?" Each routes to a real page. */
const ENTRY_POINTS: {
  label: string;
  sub: string;
  href: string;
}[] = [
  {
    label: "A skeptic",
    sub: "Seven essays in argument order.",
    href: "/skeptic-track",
  },
  {
    label: "Faith with hard questions",
    sub: "For doubt that outgrew its answers.",
    href: "/doubt",
  },
  {
    label: "A pastor",
    sub: "The letter and the resources for the work.",
    href: "/for-pastors",
  },
  {
    label: "Seeking to live well",
    sub: "Marriage, money, parenting, the Tuesday afternoon.",
    href: "/writing",
  },
];

export default function Home() {
  // Recent essays for the "Recent" rail.
  const articlesQuery = trpc.posts.listForIndex.useQuery();
  const all = articlesQuery.data ?? [];

  const lede = all[0];
  const recent = all.slice(1, 7);

  const lastRead = readLastRead();

  return (
    <div>
      <SEOMeta
        title="LiveWell by James Bell"
        description={META_DESCRIPTION}
        url="https://www.livewellbyjamesbell.co"
        type="website"
      />
      {/* Organization + WebSite schema is emitted once at the app root
          (see App.tsx → SiteStructuredData), so it is intentionally omitted here. */}
      <a href="#main" className="skip-link">Skip to content</a>
      <MinimalNav />
      <CommandPalette />

      <main id="main">
      {/* HERO — Substack-shaped lede */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--bone)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "var(--w-default)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "var(--s-6)",
          }}
        >
          <div style={{ maxWidth: "780px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: "32px",
                  height: "1px",
                  background: "var(--mustard)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--mustard)",
                }}
              >
                {PRIMARY_KICKER}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(40px, 6vw, 76px)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--bone)",
                marginBottom: "24px",
              }}
            >
              {PRIMARY_HEADLINE}
            </h1>

            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "19px",
                lineHeight: 1.65,
                color: "rgba(245,240,230,0.75)",
                maxWidth: "62ch",
                marginBottom: "40px",
              }}
            >
              {PRIMARY_SUBHEAD}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Link href="/writing" style={{ textDecoration: "none" }}>
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
                  Read the essays
                </button>
              </Link>
              <Link href="/skeptic-track" style={{ textDecoration: "none" }}>
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
                  Start here if you're a skeptic
                </button>
              </Link>
            </div>

            {/* GUIDED ENTRY — "Where are you starting from?" */}
            <div style={{ marginTop: "48px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "rgba(245,240,230,0.3)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,230,0.55)",
                  }}
                >
                  Where are you starting from?
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1px",
                  background: "rgba(245,240,230,0.12)",
                  border: "1px solid rgba(245,240,230,0.12)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  maxWidth: "880px",
                }}
              >
                {ENTRY_POINTS.map(entry => (
                  <Link
                    key={entry.href + entry.label}
                    href={entry.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        background: "var(--charcoal)",
                        padding: "18px 18px 20px",
                        height: "100%",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        borderTop: "2px solid transparent",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background =
                          "rgba(245,240,230,0.05)";
                        e.currentTarget.style.borderTop =
                          "2px solid var(--mustard)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "var(--charcoal)";
                        e.currentTarget.style.borderTop =
                          "2px solid transparent";
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "20px",
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                          color: "var(--bone)",
                          marginBottom: "8px",
                          lineHeight: 1.2,
                        }}
                      >
                        {entry.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--B)",
                          fontSize: "13px",
                          lineHeight: 1.55,
                          color: "rgba(245,240,230,0.6)",
                        }}
                      >
                        {entry.sub}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Lede essay card — replaces decorative author card */}
          {lede && (
            <Link
              href={`/writing/${lede.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  background: "rgba(245,240,230,0.06)",
                  border: "1px solid rgba(245,240,230,0.14)",
                  borderTop: "2px solid var(--mustard)",
                  padding: "var(--s-5)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  maxWidth: "640px",
                }}
              >
                <div style={{ marginBottom: "16px" }}>
                  <TrackChip pillarOrTrack={lede.pillar} inverted asLink={false} />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "28px",
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    color: "var(--bone)",
                    marginBottom: "12px",
                  }}
                >
                  {lede.title}
                </h2>
                {lede.excerpt && (
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "15px",
                      lineHeight: 1.65,
                      color: "rgba(245,240,230,0.7)",
                      marginBottom: "16px",
                      maxWidth: "55ch",
                    }}
                  >
                    {lede.excerpt}
                  </p>
                )}
                <div
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "12px",
                    color: "rgba(245,240,230,0.55)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {(lede.readingTimeMinutes ?? 5)} min read · Continue
                  <ArrowRight size={12} aria-hidden />
                </div>
              </article>
            </Link>
          )}
        </div>
      </section>

      {/* FEATURED TRACK STRIP — three primary Substack-aligned arcs */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-6) var(--s-4)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            The Lede Arcs
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 38px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: "var(--s-4)",
              maxWidth: "32ch",
            }}
          >
            The three threads the weekly essays trace.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {FEATURED_TRACKS.map(track => (
              <Link
                key={track.slug}
                href={trackUrl(track.slug)}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    padding: "var(--s-4)",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--mustard)",
                    borderRadius: "var(--radius-sm)",
                    height: "100%",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--bone-warm)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--card)";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "26px",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                      marginBottom: "12px",
                    }}
                  >
                    {track.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "15px",
                      lineHeight: 1.65,
                      color: "var(--ink-muted)",
                      marginBottom: "20px",
                    }}
                  >
                    {track.description}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--mustard)",
                      paddingBottom: "2px",
                    }}
                  >
                    Read this track →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT ESSAYS */}
      <section
        style={{
          background: "var(--bone-warm)",
          padding: "var(--s-6) var(--s-4)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "var(--s-4)",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--F)",
                fontSize: "32px",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
              }}
            >
              Recent essays
            </h2>
            <Link
              href="/writing"
              style={{
                fontFamily: "var(--U)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--ink-muted)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
                paddingBottom: "2px",
              }}
            >
              All writing →
            </Link>
          </div>

          {lastRead && (
            <Link
              href={`/writing/${lastRead.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderLeft: "2px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px 20px",
                  marginBottom: "var(--s-4)",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--mustard)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mustard-text)",
                      marginBottom: "6px",
                    }}
                  >
                    Pick up where you left off
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "20px",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                      color: "var(--ink)",
                    }}
                  >
                    {lastRead.title}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--ink-muted)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Continue
                  <ArrowRight size={14} aria-hidden />
                </span>
              </article>
            </Link>
          )}

          {articlesQuery.isLoading && (
            <p
              style={{
                fontFamily: "var(--U)",
                color: "var(--ink-muted)",
                padding: "var(--s-5) 0",
              }}
            >
              Loading…
            </p>
          )}

          {recent.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {recent.map(a => (
                <Link
                  key={a.id}
                  href={`/writing/${a.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    style={{
                      background: "var(--card)",
                      padding: "var(--s-4)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--mustard)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>
                      <TrackChip pillarOrTrack={a.pillar} asLink={false} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "22px",
                        fontWeight: 500,
                        letterSpacing: "-0.005em",
                        lineHeight: 1.25,
                        color: "var(--ink)",
                        marginBottom: "12px",
                        flex: 1,
                      }}
                    >
                      {a.title}
                    </h3>
                    <div
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "12px",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {a.readingTimeMinutes ?? 5} min read
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEGMENTED SUBSCRIBE — the single most important conversion surface */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4)",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <SegmentedSignup
            variant="panel"
            title="One essay a week. Pick your track."
            description="New essays land Tuesday morning. Different lead essay depending on who you are. Skeptics get the questions taken seriously. Christians get depth. Pastors get the letter and the resources for the work."
          />
        </div>
      </section>

      {/* SECONDARY TRACKS — the rest of what Bell writes */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-6) var(--s-4)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Also Writing On
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 38px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: "var(--s-4)",
              maxWidth: "32ch",
            }}
          >
            Pastoring, marriage, parenting, prophetic justice, deep theology.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {PRIMARY_TRACKS.filter(t => !t.featured).map(track => (
              <Link
                key={track.slug}
                href={trackUrl(track.slug)}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "20px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    height: "100%",
                    transition: "all 0.2s",
                    cursor: "pointer",
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
                      letterSpacing: "-0.005em",
                      color: "var(--ink)",
                      marginBottom: "8px",
                    }}
                  >
                    {track.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "var(--ink-muted)",
                    }}
                  >
                    {track.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
