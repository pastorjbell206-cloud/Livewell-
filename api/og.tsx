// Dynamic Open Graph image for essays — Vercel Edge function via @vercel/og.
//
// Renders a 1200×630 branded card from query params:
//   /api/og?title=Essay%20Title&pillar=Theological%20Depth
//
// Brand: dark #1a1814 surface, mustard accent, "Live Well / by James Bell"
// wordmark. Cached immutably for a year (the title/pillar are the only inputs,
// so a given URL always renders the same card).
import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

const CHARCOAL = "#1a1814";
const MUSTARD = "#D4A017";
const CREAM = "#F4F1EA";
const CREAM_MUTED = "rgba(244,241,234,0.55)";

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const rawTitle = (searchParams.get("title") || "LiveWell by James Bell").trim();
  // Keep the card readable — long headlines get clamped.
  const title = rawTitle.length > 140 ? `${rawTitle.slice(0, 137)}…` : rawTitle;
  const pillar = (searchParams.get("pillar") || "").trim();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: CHARCOAL,
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top rule + pillar eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 56, height: 4, backgroundColor: MUSTARD }} />
          {pillar ? (
            <div
              style={{
                marginLeft: 20,
                color: MUSTARD,
                fontSize: 24,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              {pillar}
            </div>
          ) : null}
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            color: CREAM,
            fontSize: title.length > 70 ? 60 : 76,
            lineHeight: 1.1,
            letterSpacing: -1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: CREAM, fontSize: 40, letterSpacing: -0.5 }}>
            Live<span style={{ color: MUSTARD }}>Well</span>
          </div>
          <div
            style={{
              color: CREAM_MUTED,
              fontSize: 22,
              marginTop: 6,
              fontFamily: "sans-serif",
              letterSpacing: 1,
            }}
          >
            by James Bell
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, immutable, max-age=31536000",
      },
    }
  );
}
