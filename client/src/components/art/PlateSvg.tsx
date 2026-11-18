/**
 * The engraved plate: one SVG drawn in the site's illustration hand (see
 * README.md). Every colour is a CSS variable (index.css, --art-*), so the
 * same drawing turns to night with html.dark. The hatching patterns are
 * declared inside each SVG with ids from useId, so two plates on one page
 * never share (or lose) a pattern.
 */
import { useId, type ReactNode } from "react";

/** The five hatch fills a drawing may use: url(#...) strings for this SVG. */
export interface Hatch {
  h1: string;
  h2: string;
  h3: string;
  hh: string;
  hs: string;
}

export interface Drawing {
  w: number;
  h: number;
  /** What the picture shows, for a screen reader when the plate is not decorative. */
  label: string;
  draw: (h: Hatch) => ReactNode;
}

export function PlateSvg({ drawing, decorative = false }: { drawing: Drawing; decorative?: boolean }) {
  const id = `lwp${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const hatch: Hatch = { h1: `url(#${id}h1)`, h2: `url(#${id}h2)`, h3: `url(#${id}h3)`, hh: `url(#${id}hh)`, hs: `url(#${id}hs)` };
  const { w, h, label, draw } = drawing;
  return (
    <svg
      className="lw-plate"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    >
      <defs>
        <pattern id={`${id}h1`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line className="pl-hatch" x1="0" y1="0" x2="0" y2="7" strokeWidth="1.1" />
        </pattern>
        <pattern id={`${id}h2`} width="4.2" height="4.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line className="pl-hatch" x1="0" y1="0" x2="0" y2="4.2" strokeWidth="1.1" />
        </pattern>
        <pattern id={`${id}h3`} width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line className="pl-hatch" x1="0" y1="0" x2="0" y2="3.2" strokeWidth="1.5" />
        </pattern>
        <pattern id={`${id}hh`} width="6" height="6" patternUnits="userSpaceOnUse">
          <line className="pl-hatch" x1="0" y1="3" x2="6" y2="3" strokeWidth="1" />
        </pattern>
        <pattern id={`${id}hs`} width="9" height="9" patternUnits="userSpaceOnUse">
          <line className="pl-hatch" x1="0" y1="4" x2="9" y2="4" strokeWidth=".9" />
        </pattern>
      </defs>
      <rect className="pl-paper" width={w} height={h} />
      <g>{draw(hatch)}</g>
    </svg>
  );
}
