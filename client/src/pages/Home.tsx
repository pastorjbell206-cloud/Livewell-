/**
 * Home — mission-forward landing page.
 *
 * The homepage leads with the founder's headline and the intent doors — written
 * in the reader's own words ("I'm doubting my faith", "My marriage is
 * struggling") — so a visitor is routed by what they came for, not by the
 * political/cultural essay arcs (those live under Writing and the nav, not the
 * front page). The doors are the DOORS array below; edit them there. Below
 * the doors: the latest essays, the segmented signup (the conversion surface),
 * and the pillars as the deeper taxonomy spine.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SKEPTIC_TRACK_LIVE } from "@/lib/skepticTrack";

import { PullQuote, SectionArt, StatementBand } from "@/components/EditorialBlocks";
import Footer from "@/components/Footer";
import { LibraryStrip } from "@/components/LibraryStrip";
import MinimalNav from "@/components/MinimalNav";
import { SegmentedSignup } from "@/components/SegmentedSignup";
import { SEOMeta, getOrganizationSchema, getWebSiteSchema } from "@/components/SEOMeta";
import { TrackChip } from "@/components/TrackChip";
import { trpc } from "@/lib/trpc";
import { isFullEssay } from "@/lib/essayQuality";
import {
  META_DESCRIPTION,
  PRIMARY_HEADLINE,
  PRIMARY_KICKER,
  PRIMARY_SUBHEAD,
  PRIMARY_SUBHEAD_SHORT,
} from "@/lib/positioning";
// Hero A/B variant. "A" (default): tighter two-sentence subhead + a "Find your
// track" secondary CTA that serves everyone (the skeptic entry stays as a
// tertiary link). "B": the original long subhead + skeptic-first secondary.
// Flip this one constant to switch variants without touching markup.
const HERO_VARIANT: "A" | "B" = "A";

// The intent doors — the primary way into the site. Written in the reader's
// own words (recognition beats recall: a first-time visitor knows their
// problem, not our taxonomy), each routing to an existing surface. The pillar
// taxonomy stays below and in the nav; this layer meets people at the door.
// Edit copy/destinations here only.
const DOORS = [
  {
    title: "I'm new here",
    blurb:
      "Two minutes of honest questions, and the site hands you a starting place that fits where you actually are.",
    href: "/start",
    cta: "Start here",
  },
  {
    title: "I'm doubting my faith",
    blurb:
      "The questions you have been lowering your voice to ask — suffering, Scripture, silence, death — answered without flinching.",
    href: "/theology/questions",
    cta: "See the questions",
  },
  {
    title: "I don't believe any of this",
    blurb:
      "Written by a pastor who was an atheist far longer than he has been this. No setup, no pressure, no altar call.",
    href: "/skeptic-track",
    cta: "Read the skeptic track",
  },
  {
    title: "My marriage is struggling",
    blurb:
      "Past the tips and into the covenant — the slow drifts, the resentment, the silence, and what staying actually takes.",
    href: "/marriage",
    cta: "Go here first",
  },
  {
    title: "I'm raising kids in the faith",
    blurb:
      "Devotions, doubt-proofing, and parenting without fear or formula — from a father of five sons.",
    href: "/family",
    cta: "Enter the family room",
  },
  {
    title: "I want to disciple someone",
    blurb:
      "Eighteen table-ready studies that make you confident to walk with one person — no program, no stage, no seminary required.",
    href: "/table",
    cta: "Sit at the Table",
  },
  {
    title: "I have a hard question",
    blurb:
      "Politics, justice, sexuality, hell, hypocrisy — the questions people actually ask, taken seriously enough to answer.",
    href: "/answers",
    cta: "Find your question",
  },
];

// Four reading areas — the deeper writing taxonomy, kept visible below the
// doors. These are the reference wings, not the two-movement pillar spine
// (that lives at /pillars and in taxonomy.ts); the heading below says "ways in"
// so the homepage never claims a pillar count that contradicts /pillars.
const PILLARS = [
  { name: "Theological Depth", href: "/theology", blurb: "Doctrine, church history, the whole biblical story." },
  { name: "Prophetic Justice", href: "/justice", blurb: "The poor, the outsider, the systems we inherit." },
  { name: "Prophetic Disruption", href: "/disruption", blurb: "The church, empire, and the politics that capture it." },
  { name: "Integrated Life", href: "/life", blurb: "Marriage, parenting, vocation, and rest." },
];

// Hand-picked flagship essays for the front page. Curated, not chronological —
// the front page should lead with the strongest work, not the newest.
const FLAGSHIP_SLUGS = [
  "what-the-gospel-actually-is",
  "what-is-the-kingdom-of-god-and-why-it-changes-everything",
  "what-christian-nationalism-is-and-is-not",
  "how-to-read-the-bible-without-making-it-say-what-you-want",
  "already-and-not-yet-living-between-two-worlds",
  "why-there-are-so-many-christian-denominations",
];

export default function Home() {
  const articlesQuery = trpc.posts.listPublished.useQuery();
  const all = articlesQuery.data ?? [];

  // Lead with the strongest essays; fall back to latest if a slug is absent.
  // The fallback skips catalog stubs (see docs/audit-corpus/) so a short abstract
  // never leads the front page.
  const bySlug = new Map(all.map(a => [a.slug, a] as const));
  const curated = FLAGSHIP_SLUGS.map(s => bySlug.get(s)).filter((a): a is (typeof all)[number] => !!a);
  const flagship = curated.length ? curated : all.filter(isFullEssay).slice(0, 6);

  return (
    <div>
      <SEOMeta
        title="LiveWell by James Bell"
        description={META_DESCRIPTION}
        url="https://www.livewellbyjamesbell.co"
        type="website"
        structuredData={[getOrganizationSchema(), getWebSiteSchema()]}
      />
      <MinimalNav />

      {/* Home doesn't use Layout, so it declares its own main landmark. */}
      <main id="main">

      {/* HERO — Substack-shaped lede */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--charcoal-fg)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="home-hero-grid"
          style={{
            maxWidth: "var(--w-default)",
            margin: "0 auto",
            display: "grid",
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
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mustard)",
                }}
              >
                {PRIMARY_KICKER}
              </span>
            </div>

            <h1
              className="lede-rise"
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(42px, 7vw, 96px)",
                fontWeight: 400,
                lineHeight: 1.03,
                letterSpacing: "-0.025em",
                color: "var(--charcoal-fg)",
                marginBottom: "24px",
              }}
            >
              {PRIMARY_HEADLINE}
            </h1>

            <p
              className="lede-rise-2"
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(20px, 2.6vw, 30px)",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.3,
                color: "var(--charcoal-fg)",
                maxWidth: "32ch",
                marginBottom: "24px",
              }}
            >
              Learning to follow Jesus — and live well — in post-Christian America.
            </p>

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
              {HERO_VARIANT === "A" ? PRIMARY_SUBHEAD_SHORT : PRIMARY_SUBHEAD}
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
                    background: "var(--charcoal-fg)",
                    color: "var(--charcoal)",
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
              <Link href={HERO_VARIANT === "A" ? "/start" : "/skeptic-track"} style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    color: "var(--charcoal-fg)",
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
                  {HERO_VARIANT === "A" ? "Find your track" : "Start here if you're a skeptic"}
                </button>
              </Link>
              <Link href="/table" style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    color: "var(--charcoal-fg)",
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
                  Disciple someone
                </button>
              </Link>
            </div>
            {HERO_VARIANT === "A" && SKEPTIC_TRACK_LIVE && (
              <div style={{ marginTop: "16px" }}>
                <Link
                  href="/skeptic-track"
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    color: "rgba(245,240,230,0.6)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Or start here if you're a skeptic
                </Link>
              </div>
            )}
          </div>

          {/* Vision card — the mission, not the latest article */}
          <Link
            href="/exile"
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
              <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
                The vision
              </div>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "28px",
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--charcoal-fg)",
                  marginBottom: "12px",
                }}
              >
                Living well as exiles in a post-Christian world.
              </h2>
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
                Where we came from, where we are, how to live, and where we are going. Build the house. Plant the garden. Raise the children. Make disciples at the table.
              </p>
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
                Read the vision
                <ArrowRight size={12} aria-hidden />
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* MISSION DOORS — the primary way into the site, by the reader's intent */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-6) var(--s-4)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Start where you are
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 38px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: "16px",
              maxWidth: "32ch",
            }}
          >
            What brings you here?
          </h2>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "17px",
              lineHeight: 1.65,
              color: "var(--ink-muted)",
              maxWidth: "60ch",
              marginBottom: "var(--s-4)",
            }}
          >
            Pick the door that sounds like you. Each one leads somewhere built
            for exactly that, and the rest of the site opens from there.
          </p>
          <PullQuote>
            Theology that can carry the weight of a Tuesday afternoon.
          </PullQuote>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {DOORS.filter(door => SKEPTIC_TRACK_LIVE || door.href !== "/skeptic-track").map(door => (
              <Link key={door.href} href={door.href} style={{ textDecoration: "none" }}>
                <article
                  style={{
                    padding: "var(--s-4)",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--mustard)",
                    borderRadius: "var(--radius-sm)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
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
                    {door.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "15px",
                      lineHeight: 1.65,
                      color: "var(--ink-muted)",
                      marginBottom: "20px",
                      flex: 1,
                    }}
                  >
                    {door.blurb}
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
                      alignSelf: "flex-start",
                    }}
                  >
                    {door.cta} →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FROM THE LIBRARY — the free full-length books, the strongest asset on
          the site, so they sit above the essay river rather than under it. */}
      <LibraryStrip />

      {/* RECENT ESSAYS */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-6) var(--s-4)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionArt seed="home-recent-essays" />
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
              Start with these
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

          {articlesQuery.isLoading && (
            <div
              role="status"
              aria-label="Loading the essays"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                gap: "24px",
              }}
            >
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{
                    background: "var(--bone)",
                    borderRadius: "var(--radius-sm)",
                    height: "200px",
                  }}
                />
              ))}
            </div>
          )}

          {flagship.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                gap: "24px",
              }}
            >
              {flagship.map(a => (
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
                      <TrackChip pillarOrTrack={a.pillar} slug={a.slug} asLink={false} />
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
            description="New essays Tuesday morning, a different lead by reader. Skeptics get the questions taken seriously. Christians get depth. Pastors get the letter and the work."
          />
        </div>
      </section>

      <StatementBand tone="light" eyebrow="The mission" width="34ch">
        Christianity is deeper than your politics. Older than your culture. Wiser
        than your assumptions.
      </StatementBand>

      {/* THE PILLARS — the deeper writing taxonomy spine */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-6) var(--s-4)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            The writing, by pillar
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
            Four ways in. One argument.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {PILLARS.map(pillar => (
              <Link key={pillar.href} href={pillar.href} style={{ textDecoration: "none" }}>
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
                    {pillar.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "var(--ink-muted)",
                    }}
                  >
                    {pillar.blurb}
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
