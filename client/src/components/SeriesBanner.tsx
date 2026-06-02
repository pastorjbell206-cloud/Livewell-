/**
 * SeriesBanner — shows an article's place in an ordered essay series.
 *
 * Given an article slug, looks it up in the client-side series registry. If the
 * article isn't part of any series, renders nothing. Otherwise it draws a
 * compact, on-brand band: the part-of label, the series title as a link to the
 * series page, the ordered list of entries (current one marked in mustard), and
 * the one-line description.
 */
import { Link } from "wouter";
import { getSeriesForArticle } from "@/lib/series";

export function SeriesBanner({ articleSlug }: { articleSlug: string }) {
  const found = getSeriesForArticle(articleSlug);
  if (!found) return null;

  const { series, index, total } = found;

  return (
    <section style={{ padding: "var(--s-4) var(--s-4) 0" }}>
      <div
        style={{
          maxWidth: "var(--w-prose)",
          margin: "0 auto",
          background: "var(--bone-warm)",
          borderTop: "2px solid var(--mustard)",
          padding: "1.25rem 1.5rem",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {/* Eyebrow: part X of Y */}
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
          Part {index + 1} of {total}
        </div>

        {/* Series title — links to the series page */}
        <Link
          href={`/series/${series.slug}`}
          style={{
            display: "inline-block",
            fontFamily: "var(--F)",
            fontSize: "1.5rem",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            textDecoration: "none",
            marginBottom: "0.75rem",
          }}
        >
          {series.title}
        </Link>

        {/* Ordered list of entries */}
        <ol
          style={{
            listStyle: "none",
            margin: "0 0 0.75rem",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
          }}
        >
          {series.articleSlugs.map((slug, i) => {
            const isCurrent = i === index;
            return (
              <li
                key={slug}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.6rem",
                  fontFamily: "var(--B)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: "6px",
                    height: "6px",
                    marginTop: "0.45rem",
                    borderRadius: "50%",
                    background: isCurrent ? "var(--mustard)" : "var(--ink-muted)",
                    opacity: isCurrent ? 1 : 0.4,
                  }}
                />
                {isCurrent ? (
                  <span
                    aria-current="true"
                    style={{ color: "var(--ink)", fontWeight: 500 }}
                  >
                    {humanize(slug)}
                  </span>
                ) : (
                  <Link
                    href={`/writing/${slug}`}
                    style={{
                      color: "var(--ink-muted)",
                      textDecoration: "none",
                    }}
                  >
                    {humanize(slug)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {/* One-line description */}
        <p
          style={{
            margin: 0,
            fontFamily: "var(--B)",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "var(--ink-muted)",
          }}
        >
          {series.description}
        </p>
      </div>
    </section>
  );
}

/** Turn a slug into a readable label when no title is available. */
function humanize(slug: string): string {
  return slug
    .split("-")
    .map(w => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default SeriesBanner;
