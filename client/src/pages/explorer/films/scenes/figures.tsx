/**
 * People and marks for the moving pictures, in the engraved hand: a standing
 * figure and a seated one (head and shoulders, no face, as the art kit asks),
 * a small flame, and a ring. Each takes its place and an optional size.
 */
import { Shape } from "../../art";

type Tone = "b" | "g" | "c";

export const ring = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

/** A standing figure: head at (x, y), feet about 62 below at size 1. */
export function Standing({
  x,
  y,
  tone = "c",
  s = 1,
}: {
  x: number;
  y: number;
  tone?: Tone;
  s?: number;
}) {
  const d = `M${x - 13 * s},${y + 62 * s}L${x - 10 * s},${y + 20 * s}C${x - 8 * s},${y + 12 * s} ${x + 8 * s},${y + 12 * s} ${x + 10 * s},${y + 20 * s}L${x + 13 * s},${y + 62 * s}Z`;
  return (
    <g>
      <Shape d={d} tone={tone} off={1.5 * s} />
      <path className="pl-o" d={ring(x, y, 8 * s)} />
      <path className="pl-l" d={ring(x, y, 8 * s)} />
    </g>
  );
}

/**
 * A seated figure, head and shoulders: head at (x, y). `body` is how far the
 * body reaches below the head (34 by default); a figure seated behind a table
 * takes a longer one, so the table's front hides the rest.
 */
export function Seated({
  x,
  y,
  tone = "c",
  body = 34,
}: {
  x: number;
  y: number;
  tone?: Tone;
  body?: number;
}) {
  return (
    <g>
      <Shape
        d={`M${x - 15},${y + body}C${x - 15},${y + 18} ${x - 9},${y + 10} ${x},${y + 10}C${x + 9},${y + 10} ${x + 15},${y + 18} ${x + 15},${y + body}Z`}
        tone={tone}
        off={1.5}
      />
      <path className="pl-o" d={ring(x, y, 8)} />
      <path className="pl-l" d={ring(x, y, 8)} />
    </g>
  );
}

/** A flame drawn round (0, 0), its tip up: mustard for the one mark, clay otherwise. */
export const FLAME =
  "M0,-17C5,-10 10,-4 10,3A10,10 0 0 1 -10,3C-10,-4 -5,-10 0,-17Z";

export function Flame({
  x,
  y,
  s = 1,
  gold = false,
}: {
  x: number;
  y: number;
  s?: number;
  gold?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path className={gold ? "pl-m" : "pl-c"} d={FLAME} />
      <path className="pl-l" d={FLAME} style={{ strokeWidth: 2.25 / s }} />
    </g>
  );
}
