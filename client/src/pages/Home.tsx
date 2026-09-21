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
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SKEPTIC_TRACK_LIVE } from "@/lib/skepticTrack";

import { StatementBand } from "@/components/EditorialBlocks";
import Footer from "@/components/Footer";
import MinimalNav from "@/components/MinimalNav";
import { SegmentedSignup } from "@/components/SegmentedSignup";
import { SEOMeta, getOrganizationSchema, getWebSiteSchema } from "@/components/SEOMeta";
import { TrackChip } from "@/components/TrackChip";
import { EssayArt } from "@/components/EssayArt";
import { trpc } from "@/lib/trpc";
import { fetchJson } from "@/lib/fetch-json";
import { isFullEssay } from "@/lib/essayQuality";
import AnnouncementBar from "@/components/AnnouncementBar";
import featured from "@/data/featured.json";
import { SHELF } from "@/lib/shelf";
import { CoverImage } from "@/components/CoverImage";
import PersistentHelpTab from "@/components/PersistentHelpTab";
import {
  META_DESCRIPTION,
  PRIMARY_HEADLINE,
  PRIMARY_KICKER,
  PRIMARY_SUBHEAD_SHORT,
  SUBSTACK_PITCH,
} from "@/lib/positioning";
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
      "Written by a pastor who was an atheist before he was anything else. No setup, no pressure, no altar call.",
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
    title: "I want to study, not just read",
    blurb:
      "Study guides with a leader's guide and a handout, guided reading paths, and printables for the room you'll teach in.",
    href: "/studyguides",
    cta: "Pick a study",
  },
  {
    title: "I want wisdom for a real situation",
    blurb:
      "Two hundred and eight everyday situations — anger, money, grief, a hard boss, a wandering child — each answered from Scripture.",
    href: "/wisdom",
    cta: "Name the situation",
  },
  {
    title: "I have a hard question",
    blurb:
      "Politics, justice, sexuality, hell, hypocrisy — the questions people actually ask, taken seriously enough to answer.",
    href: "/answers",
    cta: "Find your question",
  },
];

// Hand-picked flagship essays for the front page. Curated, not chronological —
// the front page should lead with the strongest work, not the newest.
/**
 * The photograph the front door opens on. None exists yet: the only real
 * photograph on the site is the portrait on /about. When James supplies one
 * (the church, the desk, the table), set it here and the lead essay's art
 * steps aside. Host it in client/public/images/, never a third-party CDN.
 */
const HERO_PHOTO: { src: string; alt: string } | null = null;

// The essays the front page leads with live in one data file that the build
// also reads, so /essays/featured.json carries exactly these six cards and the
// front page never downloads the whole 555 KB index to draw them.
const FLAGSHIP_SLUGS: string[] = featured.flagship;

export default function Home() {
  // Static first, and static only when the build is present: the front page
  // reads /essays/featured.json (5 KB, built at deploy) and never waits on the
  // API. The full list is fetched only when the static file is missing (a dev
  // checkout without the build step), so the front page costs no function call
  // and paints once instead of twice.
  const [staticIndex, setStaticIndex] = useState<Record<string, unknown>[] | "miss" | null>(null);
  useEffect(() => {
    let stale = false;
    fetchJson<unknown[]>("/essays/featured.json", (x): x is unknown[] => Array.isArray(x))
      .then(rows => { if (!stale) setStaticIndex(rows.filter(r => !!r && typeof r === "object") as Record<string, unknown>[]); })
      .catch(() => { if (!stale) setStaticIndex("miss"); });
    return () => { stale = true; };
  }, []);
  const articlesQuery = trpc.posts.listPublished.useQuery(undefined, { enabled: staticIndex === "miss" });
  type Listed = NonNullable<typeof articlesQuery.data>[number];
  const all: Listed[] = staticIndex && staticIndex !== "miss" ? (staticIndex as unknown as Listed[]) : (articlesQuery.data ?? []);

  // Lead with the strongest essays; fall back to latest if a slug is absent.
  // The fallback skips catalog stubs (see docs/audit-corpus/) so a short abstract
  // never leads the front page.
  // Three curated essays and the newest one: four cards, not six. Nobody can
  // hold six; everyone can hold three and one that is new.
  const bySlug = new Map(all.map(a => [a.slug, a] as const));
  const curated = FLAGSHIP_SLUGS.map(s => bySlug.get(s)).filter((a): a is (typeof all)[number] => !!a).slice(0, 3);
  const newest = all
    .filter(a => !FLAGSHIP_SLUGS.includes(a.slug) && isFullEssay(a))
    .sort((a, b) => String(b.publishedAt ?? "").localeCompare(String(a.publishedAt ?? "")))[0];
  const flagship = curated.length ? [...curated, ...(newest ? [newest] : [])] : all.filter(isFullEssay).slice(0, 4);

  return (
    <div>
      <AnnouncementBar />
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

            {/* One positioning sentence, from positioning.ts. A second, hardcoded
                line used to sit here; the hero now says one thing. */}
            <p
              style={{
                // Mirrors the static hero the prerender paints into the HTML
                // (scripts/prerender-heads.mjs, homeHeroHtml) so first paint and
                // mount are the same picture.
                fontFamily: "var(--F)",
                fontSize: "clamp(20px, 2.6vw, 30px)",
                fontStyle: "italic",
                lineHeight: 1.3,
                color: "rgba(245,240,230,0.82)",
                maxWidth: "30ch",
                marginBottom: "40px",
              }}
            >
              {PRIMARY_SUBHEAD_SHORT}
            </p>

            {/* One button. The hero used to offer three buttons, a skeptic link
                and a vision card; a front door with five handles is a wall. */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
              <Link href="/start" style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  style={{
                    background: "var(--charcoal-fg)",
                    color: "var(--charcoal)",
                    border: "none",
                    borderBottom: "2px solid var(--mustard)",
                    padding: "15px 30px",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                  }}
                >
                  Start here
                </button>
              </Link>
              <Link
                href="/canon"
                style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "rgba(245,240,230,0.7)", textDecoration: "none", backgroundImage: "none", borderBottom: "1px solid rgba(245,240,230,0.3)", paddingBottom: "2px" }}
              >
                Or read the twelve essays to start with
              </Link>
            </div>
          </div>

          {/* The picture. A photograph of James, the church or the table goes
              here the day one exists (HERO_PHOTO). Until then the lead essay's
              own art, so the front door opens on an image and a piece of
              writing rather than a paragraph about the writing. */}
          {!flagship[0] && (
            // Reserve the picture's room until the essay arrives, so nothing
            // below moves when it does.
            <div aria-hidden style={{ maxWidth: "640px", justifySelf: "end", width: "100%" }}>
              <div style={{ aspectRatio: "16 / 9", width: "100%", background: "rgba(245,240,230,0.06)", borderRadius: "var(--radius-sm)" }} />
              <div style={{ height: "44px" }} />
            </div>
          )}
          {flagship[0] && (
            <Link href={`/writing/${flagship[0].slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", maxWidth: "640px", justifySelf: "end", width: "100%" }}>
              {HERO_PHOTO ? (
                <img src={HERO_PHOTO.src} alt={HERO_PHOTO.alt} width={1200} height={800} style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-sm)" }} />
              ) : (
                <EssayArt seed={flagship[0].slug} track={flagship[0].pillar} title={flagship[0].title} style={{ borderRadius: "var(--radius-sm)", boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }} />
              )}
              <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginTop: "14px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)" }}>
                  {HERO_PHOTO ? "Start with this" : "The essay to start with"}
                </span>
                <span style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.25, color: "var(--charcoal-fg)" }}>{flagship[0].title}</span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* RECENT ESSAYS */}
      <section
        style={{
          background: "var(--bone)",
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

          {flagship.length === 0 && (staticIndex === null || (staticIndex === "miss" && articlesQuery.isLoading)) && (
            <div
              role="status"
              aria-label="Loading the essays"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                gap: "24px",
              }}
            >
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bone-warm)",
                    borderRadius: "var(--radius-sm)",
                    // The height of a finished card, so the grid does not grow
                    // under the reader when the essays arrive (CLS 0.07 → 0).
                    aspectRatio: "3 / 4",
                    minHeight: "340px",
                  }}
                />
              ))}
            </div>
          )}

          {flagship.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
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
                      minHeight: "100%",
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
                    <EssayArt seed={a.slug} track={a.pillar} decorative style={{ marginBottom: "14px", borderRadius: "var(--radius-sm)" }} />
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

      {/* MISSION DOORS — the primary way into the site, by the reader's intent */}
      <section
        style={{
          background: "var(--bone)",
          padding: "var(--s-6) var(--s-4)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {/* Four doors by the reader's intent. The heading and paragraph that
              used to sit above them made this a second homepage; the doors say
              it themselves. */}
          <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>
            Start where you are
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {DOORS.filter(door => SKEPTIC_TRACK_LIVE || door.href !== "/skeptic-track").slice(0, 4).map(door => (
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

      {/* THE BOOKS — three, written by hand. They were not on the front page. */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", marginBottom: "var(--s-4)" }}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "32px", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--ink)" }}>
              Three books. Every word mine.
            </h2>
            <Link href="/books" style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", textDecoration: "none", backgroundImage: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              The books →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "var(--s-4)" }}>
            {SHELF.map(b => (
              <Link key={b.slug} href={b.href} style={{ textDecoration: "none", color: "inherit", display: "flex", gap: "18px", alignItems: "center" }}>
                <CoverImage src={b.cover} alt={`${b.title} — cover`} style={{ width: "96px", height: "auto", flex: "0 0 auto", borderRadius: "3px", boxShadow: "0 12px 28px rgba(20,17,12,0.22)", display: "block" }} />
                <div>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{b.kicker}</div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "8px" }}>{b.title}</h3>
                  <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)" }}>Read the opening free · $8.99</span>
                </div>
              </Link>
            ))}
          </div>
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
          <SegmentedSignup variant="panel" title="Subscribe" description={SUBSTACK_PITCH} source="home" />
        </div>
      </section>

      <StatementBand tone="light" eyebrow="The mission" width="34ch">
        Christianity is deeper than your politics. Older than your culture. Wiser
        than your assumptions.
      </StatementBand>
      </main>


      <PersistentHelpTab />
      <Footer />
    </div>
  );
}
