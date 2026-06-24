/**
 * ArticleHero — the branded, full-bleed CHARCOAL header band that opens every
 * essay. This is the "image for each article": no stock photography, just type,
 * a thin mustard kicker rule, and the same faint radial + noise depth used by
 * the homepage .hero. The feeling: opening a serious book in a quiet room.
 *
 * If the post carries a real coverImage it is rendered as a framed figure
 * BELOW the charcoal band (in ArticleDetail), never as a backdrop for the text.
 */
import { User } from "lucide-react";
import { TrackChip } from "@/components/TrackChip";

interface ArticleHeroProps {
  title: string;
  pillar: string | null | undefined;
  excerpt?: string | null;
  readingTimeMinutes?: number | null;
  publishedAt?: string | Date | null;
  publishedIso: string;
}

export function ArticleHero({
  title,
  pillar,
  excerpt,
  readingTimeMinutes,
  publishedAt,
  publishedIso,
}: ArticleHeroProps) {
  return (
    <section className="article-hero">
      <div className="article-hero__inner">
        {/* Kicker — mustard rule + track eyebrow, legible on charcoal */}
        <div style={{ marginBottom: "var(--s-3)" }}>
          <TrackChip pillarOrTrack={pillar} inverted />
        </div>

        {/* Title */}
        <h1 className="article-hero__title">{title}</h1>

        {/* Meta row — byline · reading time · date */}
        <div className="article-hero__meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <User size={13} aria-hidden />
            James Bell
          </span>
          {readingTimeMinutes ? (
            <>
              <span aria-hidden className="article-hero__dot">·</span>
              <span>{readingTimeMinutes} min read</span>
            </>
          ) : null}
          {publishedAt ? (
            <>
              <span aria-hidden className="article-hero__dot">·</span>
              <time dateTime={publishedIso}>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          ) : null}
        </div>

        {/* Standfirst / excerpt */}
        {excerpt ? <p className="article-hero__standfirst">{excerpt}</p> : null}
      </div>
    </section>
  );
}

export default ArticleHero;
