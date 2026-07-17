/**
 * PillarLeadMagnet — the email-gated reading-path offer on a pillar page.
 * A cream card with a kicker, title, one line of prose, and a GatedDownload
 * that reveals the curated reading-path PDF after an email capture. The PDF
 * curates real study guides that already ship; nothing here is invented.
 */
import GatedDownload from "@/components/GatedDownload";

export default function PillarLeadMagnet({
  kicker,
  title,
  blurb,
  slug,
  downloadLabel,
  source,
}: {
  kicker: string;
  title: string;
  blurb: string;
  /** Reading-path slug under /downloads/reading-paths/<slug>.pdf */
  slug: string;
  downloadLabel: string;
  source: string;
}) {
  return (
    <section style={{ background: "var(--bone-warm)", padding: "64px 20px" }}>
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "16px" }}>
          {kicker}
        </p>
        <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,34px)", fontWeight: 400, color: "var(--ink)", marginBottom: "14px", lineHeight: 1.15 }}>
          {title}
        </h2>
        <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink-muted)", maxWidth: "54ch", margin: "0 auto 26px" }}>
          {blurb}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GatedDownload
            href={`/downloads/reading-paths/${slug}.pdf`}
            label={downloadLabel}
            source={source}
          />
        </div>
      </div>
    </section>
  );
}
