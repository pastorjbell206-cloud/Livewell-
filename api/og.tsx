// Dynamic Open Graph image for essays — Vercel Edge function via @vercel/og.
//
// Renders a 1200×630 branded card from query params:
//   /api/og?title=Essay%20Title&pillar=Theological%20Depth
//
// Brand: charcoal #1A1A1A surface, cream #F5F0E6 type, mustard accent, the
// one-word "LiveWell" wordmark — the same tokens as client/src/index.css :root
// and scripts/build-og-images.mjs, so the card that appears next to a Substack
// post in a feed looks like the site it points to. Type is Cormorant Garamond
// 400 for the headline and wordmark, Inter 600/500 for the eyebrow and byline,
// from static instances in api/_fonts (satori cannot read the site's variable
// woff2 files, and would otherwise fall back to a generic sans). Cached
// immutably for a year: title and pillar are the only inputs.
import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

const CHARCOAL = "#1A1A1A";
const MUSTARD = "#D4A017";
const CREAM = "#F5F0E6";
const CREAM_MUTED = "rgba(245,240,230,0.55)";

// Edge runtime: fonts travel with the function bundle and load via fetch.
const cormorant = fetch(new URL("./_fonts/CormorantGaramond-Regular.ttf", import.meta.url)).then((r) => r.arrayBuffer());
const interMedium = fetch(new URL("./_fonts/Inter-Medium.ttf", import.meta.url)).then((r) => r.arrayBuffer());
const interSemiBold = fetch(new URL("./_fonts/Inter-SemiBold.ttf", import.meta.url)).then((r) => r.arrayBuffer());

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const rawTitle = (searchParams.get("title") || "LiveWell by James Bell").trim();
  // Keep the card readable — long headlines get clamped.
  const title = rawTitle.length > 140 ? `${rawTitle.slice(0, 137)}…` : rawTitle;
  const pillar = (searchParams.get("pillar") || "").trim();

  const [cormorantData, interMediumData, interSemiBoldData] = await Promise.all([cormorant, interMedium, interSemiBold]);

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
          fontFamily: "Cormorant Garamond",
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
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontFamily: "Inter",
                fontWeight: 600,
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
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: -1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: CREAM, fontSize: 40, fontWeight: 400, letterSpacing: -0.5 }}>
            Live<span style={{ color: MUSTARD }}>Well</span>
          </div>
          <div
            style={{
              color: CREAM_MUTED,
              fontSize: 22,
              marginTop: 6,
              fontFamily: "Inter",
              fontWeight: 500,
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
      fonts: [
        { name: "Cormorant Garamond", data: cormorantData, weight: 400, style: "normal" },
        { name: "Inter", data: interMediumData, weight: 500, style: "normal" },
        { name: "Inter", data: interSemiBoldData, weight: 600, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, immutable, max-age=31536000",
      },
    }
  );
}
