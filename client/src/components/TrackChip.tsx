/**
 * Eyebrow chip showing which track an article belongs to. Used in cards,
 * article headers, and hero strips. All variants render in the brand palette
 * (mustard rule + ink-muted text + Inter all-caps).
 */
import { Link } from "wouter";
import { resolveTrack, trackUrl } from "@/lib/taxonomy";

interface TrackChipProps {
  pillarOrTrack: string | null | undefined;
  /** If true, renders as a link to the track-filtered /writing page. */
  asLink?: boolean;
  /** Inverted styling for dark backgrounds (charcoal hero). */
  inverted?: boolean;
}

export function TrackChip({
  pillarOrTrack,
  asLink = true,
  inverted = false,
}: TrackChipProps) {
  const track = resolveTrack(pillarOrTrack);
  const kicker = track?.kicker ?? "Essay";

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

  if (asLink && track) {
    return (
      <Link href={trackUrl(track.slug)} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }
  return content;
}

export default TrackChip;
