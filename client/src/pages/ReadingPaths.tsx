/**
 * ReadingPaths (/reading-paths) — the index of the site's curated reading
 * sequences. Presentation only; the paths themselves live in
 * client/src/lib/readingPaths.ts (the single source of truth).
 *
 * Each card links to its detail page (/reading-paths/:slug), except the book
 * guide, which points straight at /start. Brand idiom: cream and charcoal
 * sections, mustard accents, Cormorant headings, Inter body.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { READING_PATHS, availableCount, type ReadingPath } from "@/lib/readingPaths";

function PathCard({ path }: { path: ReadingPath }) {
  const href = path.externalHref ?? `/reading-paths/${path.slug}`;
  const live = availableCount(path);
  const meta = path.externalHref
    ? "The book, in order"
    : `${live} ${live === 1 ? "essay" : "essays"} on the site`;

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <article
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--mustard)",
          borderRadius: "var(--radius-sm)",
          padding: "1.75rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--U)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mustard-text)",
          }}
        >
          {meta}
        </div>
        <h2
          style={{
            fontFamily: "var(--F)",
            fontSize: "1.5rem",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: 0,
          }}
        >
          {path.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--B)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "var(--ink-muted)",
            margin: 0,
            maxWidth: "60ch",
          }}
        >
          {path.description}
        </p>
        <span
          aria-hidden
          style={{
            fontFamily: "var(--U)",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--mustard-text)",
            marginTop: "auto",
            paddingTop: "0.5rem",
          }}
        >
          Read the path →
        </span>
      </article>
    </Link>
  );
}

export default function ReadingPaths() {
  return (
    <Layout>
      <SEOMeta
        title="Reading Paths — LiveWell by James Bell"
        description="Six ordered sequences through the work: the Blind Spots book, the capture of the church by the right and the left, reading Scripture past our politics, the church after Christendom, and the pastoral angle underneath it all."
        url="https://www.livewellbyjamesbell.co/reading-paths"
        keywords="reading paths, curated essays, Christian nationalism, progressive church, biblical justice, after Christendom, pastoral ministry, theology"
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
            Reading Paths
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
            One argument, six ways in
          </h1>
          <p
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(1.125rem, 2.2vw, 1.4rem)",
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "var(--bone)",
              opacity: 0.85,
              maxWidth: "60ch",
            }}
          >
            Not a table of contents. An ordered way through the work — start
            where the weight is heaviest and read in sequence.
          </p>
        </div>
      </section>

      {/* PATHS */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {READING_PATHS.map(path => (
              <PathCard key={path.slug} path={path} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
