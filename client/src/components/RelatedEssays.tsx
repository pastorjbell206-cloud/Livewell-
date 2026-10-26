/**
 * RelatedEssays — a quiet "Keep reading" list of other essays, filed beside the
 * KeepReadingBook card so a reader leaves with both another essay and a book.
 *
 * The picks come only from the public essay shelf (lib/shelf.ts): essays from
 * the same section first, then the shelf's "Start with these", then the rest
 * of the shelf in order. Nothing retired is ever offered. The component
 * fetches nothing, so the card never depends on the network settling, and
 * every link resolves to an essay that is on the shelf.
 */
import { Link } from "wouter";
import { pillarToTrack } from "@/lib/taxonomy";
import { START_WITH, liveShelfEssays, nearestSection, overrideMeta, shelfEntry, type ShelfEssay } from "@/lib/shelf";

interface PostLike {
  slug?: string | null;
  pillar?: string | null;
}

interface RelatedItem {
  slug: string;
  title: string;
  /** The shelf's display line for the essay; may be empty. */
  blurb: string;
}

/** Up to four other shelf essays, current excluded: same section, then start-with, then the rest. */
export function pickRelated(post: PostLike): RelatedItem[] {
  const current = (post.slug ?? "").trim();
  const live = liveShelfEssays();
  const section =
    shelfEntry(current)?.section ?? nearestSection(current, pillarToTrack(post.pillar))?.slug ?? null;
  const ordered = [
    ...live.filter((e) => e.section === section),
    ...START_WITH.map((slug) => live.find((e) => e.slug === slug)).filter((e): e is ShelfEssay => !!e),
    ...live,
  ];
  const seen = new Set<string>([current]);
  const out: RelatedItem[] = [];
  for (const e of ordered) {
    if (out.length >= 4) break;
    if (seen.has(e.slug)) continue;
    seen.add(e.slug);
    const rewrite = overrideMeta(e.slug);
    out.push({ slug: e.slug, title: rewrite?.title || e.title, blurb: rewrite ? rewrite.excerpt : e.blurb ?? "" });
  }
  return out;
}

export function RelatedEssays({ post }: { post: PostLike }) {
  const items = pickRelated(post);
  if (items.length === 0) return null;

  return (
    <section
      style={{
        background: "var(--bone)",
        padding: "var(--s-6) var(--s-4)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--U)",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--mustard-text)",
            marginBottom: "20px",
          }}
        >
          Keep reading · Another essay
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map((item, i) => (
            <li
              key={item.slug}
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
            >
              <Link
                href={`/writing/${item.slug}`}
                style={{
                  display: "block",
                  padding: "18px 0",
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--mustard-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--ink)";
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--F)",
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                    color: "inherit",
                  }}
                >
                  {item.title}
                </span>
                {item.blurb && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "6px",
                      fontFamily: "var(--B)",
                      fontSize: "15px",
                      lineHeight: 1.5,
                      color: "var(--ink-muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.blurb}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
