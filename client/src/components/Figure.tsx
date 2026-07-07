/**
 * Figure — the photography primitive for the platform.
 *
 * The brand wants photography that is weighted, not warm: documentary images of
 * James Bell and his world, treated so they sit inside the cream/charcoal/mustard
 * palette instead of fighting it. Figure gives every photo that treatment in one
 * place — a subtle duotone (desaturated, warmed by a mustard color-blend), a
 * reserved aspect box (no layout shift), a lazy load, and an optional caption.
 *
 * `treatment="plain"` opts a photo out of the duotone (full color). `scrim` adds
 * a flat charcoal overlay for the text-over-image hero case, so a headline stays
 * legible on top. Everything is token-styled — no hardcoded color.
 */
import type { ReactNode } from "react";

export function Figure({
  src,
  alt,
  caption,
  aspect,
  treatment = "duotone",
  scrim = false,
  priority = false,
  rounded = true,
  bordered = true,
  children,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  /** CSS aspect-ratio for the image box, e.g. "4 / 5" or "16 / 9". Reserves space (no CLS). */
  aspect?: string;
  treatment?: "duotone" | "plain";
  /** Flat charcoal overlay for legibility when content sits over the image. */
  scrim?: boolean;
  priority?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  /** Content laid over the image (only meaningful with scrim), e.g. a hero headline. */
  children?: ReactNode;
}) {
  const duotone = treatment === "duotone";
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          borderRadius: rounded ? "var(--radius-sm)" : 0,
          border: bordered ? "1px solid var(--border)" : "none",
          aspectRatio: aspect,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          style={{
            display: "block",
            width: "100%",
            height: aspect ? "100%" : "auto",
            objectFit: "cover",
            objectPosition: "center top",
            filter: duotone ? "grayscale(1) contrast(1.03)" : "none",
          }}
        />
        {/* Mustard color-blend — turns the grayscale image into a warm duotone
            that lives in the palette. Subtle by design (mustard is punctuation). */}
        {duotone && (
          <div
            aria-hidden
            style={{ position: "absolute", inset: 0, background: "var(--mustard)", mixBlendMode: "color", opacity: 0.14 }}
          />
        )}
        {/* Flat charcoal scrim for text-over-image legibility. */}
        {scrim && (
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "var(--charcoal)", opacity: 0.5 }} />
        )}
        {children && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            {children}
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          style={{
            fontFamily: "var(--U)",
            fontSize: "12px",
            lineHeight: 1.5,
            color: "var(--ink-muted)",
            marginTop: "10px",
            letterSpacing: "0.01em",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Figure;
