/**
 * Eyebrow chip showing which pillar an article belongs to. Used in cards,
 * article headers, and hero strips. Renders the canonical two-movement /
 * pillar taxonomy (short label), in the brand palette (mustard rule +
 * mustard text + Inter all-caps).
 */
import { Link } from "wouter";
import { pillarForPost, pillarUrl, resolveTrack } from "@/lib/taxonomy";
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
  // 59% of the library has no explicit pillar and would fall to the default
  // (id 5, "Pastoral") — which then labelled a politics essay "Pastoral" on
  // every card. For an unfiled essay, the track the library actually stores
  // (politics, theology, doubt…) is the honest kicker; the pillar's short name
  // is used only when someone filed the essay there on purpose.
  const explicit = slug ? PILLAR_ASSIGNMENTS[slug] : undefined;
  const pillar = pillarForPost({ slug, pillar: pillarOrTrack });
  const track = explicit ? null : resolveTrack(pillarOrTrack);
  const kicker = track?.kicker ?? pillar?.short ?? "Essay";

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

  if (asLink && pillar) {
    return (
      <Link href={pillarUrl(pillar.slug)} style={{ textDecoration: "none", backgroundImage: "none" }}>
        {content}
      </Link>
    );
  }
  return content;
}

export default TrackChip;
