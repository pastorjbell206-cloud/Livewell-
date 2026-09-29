/**
 * Eyebrow chip showing which pillar an article belongs to. Used in cards,
 * article headers, and hero strips. Renders the canonical two-movement /
 * six-pillar taxonomy (short label), in the brand palette (mustard rule +
 * mustard text + Inter all-caps).
 */
import { Link } from "wouter";
import { pillarUrl, PILLAR_BY_ID, TRACK_BY_SLUG, resolveTrack, trackUrl } from "@/lib/taxonomy";
import { PILLAR_ASSIGNMENTS } from "@/lib/pillar-assignments";

interface TrackChipProps {
  /** Legacy `posts.pillar` value (kept for backward compatibility). */
  pillarOrTrack: string | null | undefined;
  /** Post slug — enables precise per-essay pillar resolution. */
  slug?: string | null;
  /** If true, renders as a link to the pillar-filtered /writing page. */
  asLink?: boolean;
  /** Inverted styling for dark backgrounds (charcoal hero). */
  inverted?: boolean;
}

export function TrackChip({
  pillarOrTrack,
  slug,
  asLink = true,
  inverted = false,
}: TrackChipProps) {
  // A filed essay shows (and links to) its curated pillar. An essay nobody
  // has filed yet shows its own subject and links to that subject's shelf,
  // rather than the taxonomy's filtering default, which would label a
  // theology essay "Pastoral". Same rule as lib/essayLabel.ts.
  const filedId = slug ? PILLAR_ASSIGNMENTS[slug]?.pillar : undefined;
  const pillar = filedId ? PILLAR_BY_ID.get(filedId) ?? null : null;
  const raw = pillarOrTrack?.trim();
  const track = !pillar && raw ? (TRACK_BY_SLUG.get(raw) ?? resolveTrack(raw)) : null;
  const kicker = pillar?.short ?? track?.kicker ?? "Essay";
  const href = pillar ? pillarUrl(pillar.slug) : track ? trackUrl(track.slug) : null;

  const textColor = inverted ? "var(--mustard)" : "var(--mustard-text)";
  const ruleColor = "var(--mustard)";

  const content = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "var(--U)",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: textColor,
      }}
    >
      <span
        aria-hidden
        style={{ width: "24px", height: "1px", background: ruleColor }}
      />
      {kicker}
    </span>
  );

  if (asLink && href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }
  return content;
}

export default TrackChip;
