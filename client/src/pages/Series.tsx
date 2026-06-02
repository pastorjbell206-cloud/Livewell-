/**
 * Series — lists ordered essay series and their entries.
 *
 * At /series it shows every series in the registry. At /series/:slug it shows a
 * single series (or a not-found note if the slug is unknown). Each entry links
 * to its article at /writing/:slug.
 */
import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SERIES, getSeriesBySlug, type Series as SeriesType } from "@/lib/series";

/** Turn a slug into a readable label when no title is available. */
function humanize(slug: string): string {
  return slug
    .split("-")
    .map(w => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function SeriesCard({ series }: { series: SeriesType }) {
  return (
    <article
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderTop: "2px solid var(--mustard)",
        borderRadius: "var(--radius-sm)",
        padding: "2rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--U)",
          fontSize: "11px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "var(--mustard-text)",
          marginBottom: "0.5rem",
        }}
      >
        {series.articleSlugs.length} essays
      </div>

      <Link
        href={`/series/${series.slug}`}
        style={{
          display: "inline-block",
          fontFamily: "var(--F)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 400,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          textDecoration: "none",
          marginBottom: "0.75rem",
        }}
      >
        {series.title}
      </Link>

      <p
        style={{
          fontFamily: "var(--F)",
          fontSize: "1.0625rem",
          lineHeight: 1.7,
          color: "var(--ink-muted)",
          marginBottom: "1.5rem",
        }}
      >
        {series.description}
      </p>

      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {series.articleSlugs.map((slug, i) => (
          <li
            key={slug}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.75rem",
              fontFamily: "var(--B)",
              fontSize: "1rem",
              lineHeight: 1.5,
            }}
          >
            <span
              aria-hidden
              style={{
                fontFamily: "var(--U)",
                fontSize: "0.8rem",
                color: "var(--mustard-text)",
                flexShrink: 0,
                minWidth: "1.5rem",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              href={`/writing/${slug}`}
              style={{ color: "var(--ink)", textDecoration: "none" }}
            >
              {humanize(slug)}
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function Series() {
  const { slug } = useParams<{ slug?: string }>();
  const single = slug ? getSeriesBySlug(slug) : undefined;

  // Single-series route with an unknown slug.
  if (slug && !single) {
    return (
      <Layout>
        <SEOMeta
          title="Series not found"
          description="This essay series could not be found."
          type="website"
          noindex
        />
        <section style={{ background: "var(--bone)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "2rem",
                fontWeight: 400,
                color: "var(--ink)",
                marginBottom: "1rem",
              }}
            >
              Series not found
            </h1>
            <Link
              href="/series"
              style={{
                fontFamily: "var(--U)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--mustard)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
                paddingBottom: "0.25rem",
              }}
            >
              All series
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const list = single ? [single] : SERIES;
  const title = single ? single.title : "Essay Series";
  const description = single
    ? single.description
    : "Ordered arcs of theology essays, written to be read in sequence.";

  return (
    <Layout>
      <SEOMeta title={title} description={description} type="website" />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--mustard)",
              marginBottom: "1.5rem",
            }}
          >
            {single ? "Series" : "Reading in order"}
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              marginBottom: "1rem",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: "var(--F)",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--bone)",
              opacity: 0.8,
              maxWidth: "60ch",
            }}
          >
            {description}
          </p>
        </div>
      </section>

      {/* LIST */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          {list.map(series => (
            <SeriesCard key={series.slug} series={series} />
          ))}

          {single && (
            <Link
              href="/series"
              style={{
                fontFamily: "var(--U)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--mustard)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
                paddingBottom: "0.25rem",
              }}
            >
              All series
            </Link>
          )}
        </div>
      </section>
    </Layout>
  );
}
