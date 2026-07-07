/**
 * StartHere (/start) — the pinned reader's guide for "Blind Spots."
 *
 * A single, unmissable table of contents that presents the book-in-public in
 * intended reading order. Content lives in lib/blindSpots.ts; this file is
 * presentation only. Chapters that resolve on-site link to /writing/:slug;
 * chapters still Substack-only render as "coming to the site."
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import {
  BLIND_SPOTS_GUIDE,
  BLIND_SPOTS_THESIS,
  type Chapter,
} from "@/lib/blindSpots";
import { SUBSTACK_URL } from "@/lib/site";

function ChapterRow({ chapter, index }: { chapter: Chapter; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "1.25rem",
        padding: "1.25rem 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span
        aria-hidden
        style={{
          fontFamily: "var(--U)",
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "var(--mustard-text)",
          flexShrink: 0,
          minWidth: "1.75rem",
        }}
      >
        {num}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(1.25rem, 2.4vw, 1.5rem)",
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            {chapter.title}
          </h3>
          {chapter.available ? (
            <span
              aria-hidden
              style={{
                fontFamily: "var(--U)",
                fontSize: "1.1rem",
                color: "var(--mustard)",
                flexShrink: 0,
              }}
            >
              →
            </span>
          ) : (
            <span
              style={{
                fontFamily: "var(--U)",
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--mustard-text)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-pill)",
                padding: "3px 10px",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              Read on Substack →
            </span>
          )}
        </div>
        {chapter.blurb && (
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--ink-muted)",
              margin: "0.5rem 0 0",
              maxWidth: "62ch",
            }}
          >
            {chapter.blurb}
          </p>
        )}
      </div>
    </div>
  );

  if (chapter.available) {
    return (
      <Link
        href={`/writing/${chapter.slug}`}
        style={{ display: "block", textDecoration: "none" }}
      >
        {inner}
      </Link>
    );
  }
  // Not yet imported: send the reader to the real published essay on Substack
  // (an exact post URL if we have one, else the archive) instead of a dead end.
  return (
    <a
      href={chapter.substackUrl || `${SUBSTACK_URL}/archive`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none" }}
    >
      {inner}
    </a>
  );
}

export default function StartHere() {
  let counter = 0;

  // Book-in-public progress: how many chapters resolve on-site vs. total.
  const allChapters = BLIND_SPOTS_GUIDE.flatMap(s => s.chapters);
  const liveCount = allChapters.filter(c => c.available).length;
  const totalCount = allChapters.length;
  const pct = totalCount ? Math.round((liveCount / totalCount) * 100) : 0;

  return (
    <Layout>
      <SEOMeta
        title="Start Here — Blind Spots | LiveWell by James Bell"
        description="The reader's guide to Blind Spots: American Christianity has been captured by both the right and the left. Read the book-in-public in order, from the foundation through The End of Christian America."
        url="https://www.livewellbyjamesbell.co/start"
        type="website"
      />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--mustard)",
              marginBottom: "1.5rem",
            }}
          >
            Start Here · A book, written in public
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bone)",
              marginBottom: "1.5rem",
            }}
          >
            Blind Spots
          </h1>
          <p
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(1.125rem, 2.2vw, 1.4rem)",
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "var(--bone)",
              opacity: 0.85,
              maxWidth: "64ch",
            }}
          >
            {BLIND_SPOTS_THESIS}
          </p>

          {/* Book-in-public progress */}
          <div style={{ marginTop: "2.25rem", maxWidth: "32rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontFamily: "var(--U)",
                fontSize: "12px",
                letterSpacing: "0.04em",
                color: "rgba(245,240,230,0.7)",
                marginBottom: "0.5rem",
              }}
            >
              <span>
                {liveCount} of {totalCount} chapters on the site
              </span>
              <span style={{ color: "rgba(245,240,230,0.5)" }}>
                the rest publishing from Substack
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={liveCount}
              aria-valuemin={0}
              aria-valuemax={totalCount}
              aria-label={`${liveCount} of ${totalCount} chapters published on the site`}
              style={{
                height: "3px",
                background: "rgba(245,240,230,0.18)",
                borderRadius: "var(--radius-pill)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: "var(--mustard)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--ink-muted)",
              maxWidth: "62ch",
              marginBottom: "3.5rem",
            }}
          >
            Read in order. Each chapter is a step in one argument — start at the
            foundation and move through to The End of Christian America. New
            chapters land most weeks.
          </p>

          {BLIND_SPOTS_GUIDE.map(section => (
            <div key={section.title} style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--mustard-text)",
                  marginBottom: "0.5rem",
                }}
              >
                {section.kicker}
              </div>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 0.75rem",
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--B)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  maxWidth: "62ch",
                  marginBottom: "1.5rem",
                }}
              >
                {section.intro}
              </p>

              <div style={{ borderTop: "2px solid var(--mustard)" }}>
                {section.chapters.map(chapter => (
                  <ChapterRow
                    key={chapter.slug}
                    chapter={chapter}
                    index={counter++}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* SUBSCRIBE PROMPT */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderLeft: "2px solid var(--mustard)",
              borderRadius: "var(--radius-sm)",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--F)",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "var(--ink)",
                margin: "0 0 0.5rem",
              }}
            >
              Read the book as it's written
            </h2>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--ink-muted)",
                maxWidth: "58ch",
                margin: "0 0 1.25rem",
              }}
            >
              A new chapter or essay most weeks, delivered to your inbox. Subscribe
              and start at the beginning.
            </p>
            <a href="/#subscribe" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  background: "var(--ink)",
                  color: "var(--bone)",
                  border: "none",
                  borderBottom: "2px solid var(--mustard)",
                  padding: "12px 24px",
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
