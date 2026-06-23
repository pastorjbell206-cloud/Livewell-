/**
 * ReadingPathDetail (/reading-paths/:slug) — one curated reading sequence as an
 * ordered, numbered list. Presentation only; the data lives in
 * client/src/lib/readingPaths.ts.
 *
 * Available entries link to /writing/:slug. Planned entries render a "Coming
 * soon" pill and never link (no broken paths). An unknown slug renders a
 * graceful "path not found" with a way back, not a crash.
 *
 * Brand idiom: cream and charcoal sections, mustard accents, Cormorant
 * headings, Inter body.
 */
import { Link, useRoute, Redirect } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import {
  getReadingPathBySlug,
  type ReadingPath,
  type ReadingPathEntry,
} from "@/lib/readingPaths";

function PathNotFound() {
  return (
    <Layout>
      <SEOMeta
        title="Reading path not found — LiveWell by James Bell"
        description="This reading path could not be found."
        noindex
      />
      <section
        style={{
          background: "var(--bone)",
          padding: "6rem 1.5rem",
          minHeight: "60vh",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            That path is not here.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--ink-muted)",
              maxWidth: "60ch",
              margin: "0 0 2rem",
            }}
          >
            The reading path you asked for does not exist. It may have been
            renamed. Start from the full set of paths instead.
          </p>
          <Link
            href="/reading-paths"
            style={{
              fontFamily: "var(--U)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--mustard-text)",
              textDecoration: "none",
            }}
          >
            ← All reading paths
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function EntryRow({ entry, index }: { entry: ReadingPathEntry; index: number }) {
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
            {entry.title}
          </h3>
          {entry.available ? (
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
                color: "var(--ink-muted)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-pill)",
                padding: "3px 10px",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              Coming soon
            </span>
          )}
        </div>
        {entry.blurb && (
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
            {entry.blurb}
          </p>
        )}
      </div>
    </div>
  );

  if (entry.available && entry.slug) {
    return (
      <Link
        href={`/writing/${entry.slug}`}
        style={{ display: "block", textDecoration: "none" }}
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

function PathView({ path }: { path: ReadingPath }) {
  const liveCount = path.entries.filter(e => e.available).length;
  const totalCount = path.entries.length;

  return (
    <Layout>
      <SEOMeta
        title={`${path.title} — LiveWell by James Bell`}
        description={path.description}
        url={`https://www.livewellbyjamesbell.co/reading-paths/${path.slug}`}
        keywords={`reading path, ${path.title}, essays, theology, the American church`}
      />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <Link
            href="/reading-paths"
            style={{
              display: "inline-block",
              fontFamily: "var(--U)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--mustard)",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
          >
            ← All reading paths
          </Link>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bone)",
              margin: "0 0 1.5rem",
            }}
          >
            {path.title}
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
            {path.description}
          </p>
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "12px",
              letterSpacing: "0.04em",
              color: "rgba(245,240,230,0.7)",
              marginTop: "2rem",
            }}
          >
            {liveCount} of {totalCount} on the site · read in order
          </div>
        </div>
      </section>

      {/* SEQUENCE */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={{ borderTop: "2px solid var(--mustard)" }}>
            {path.entries.map((entry, i) => (
              <EntryRow key={entry.slug ?? entry.title} entry={entry} index={i} />
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--ink-muted)",
              maxWidth: "62ch",
              marginTop: "2.5rem",
            }}
          >
            Entries marked "Coming soon" are essays still being written. The path
            fills in as each one lands.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export function ReadingPathDetail() {
  const [match, params] = useRoute("/reading-paths/:slug");

  if (!match) return <PathNotFound />;

  const path = getReadingPathBySlug(params?.slug);
  if (!path) return <PathNotFound />;

  // The book guide has no detail page of its own; send readers to /start.
  if (path.externalHref) return <Redirect to={path.externalHref} />;

  return <PathView path={path} />;
}
