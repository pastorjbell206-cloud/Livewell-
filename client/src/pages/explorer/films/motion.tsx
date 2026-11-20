/**
 * The moving pictures' few motions, in the engraved hand.
 *
 * A film's drawing is a pure function of the frame it is on: each part says
 * from which frame it is shown (`on`) and, if it goes away again, from which
 * frame it is gone (`off`). Moving from one frame to the next only changes
 * classes, and CSS (film.css) carries the motion between the two states with
 * transitions on opacity, transform and stroke-dashoffset alone. So:
 *
 * - every frame has a finished state, which is exactly what a reader sees
 *   with motion turned off (the player adds `is-still`, and nothing moves);
 * - Back and Next and the frame dots can land on any frame at any time;
 * - nothing here keeps a timer, so a paused film is simply still.
 *
 * Frame -1 is the poster, before Play.
 */
import type { CSSProperties, ReactNode } from "react";
import type { Hatch } from "@/components/art/PlateSvg";

export interface FilmDrawing {
  w: number;
  h: number;
  draw: (h: Hatch, frame: number) => ReactNode;
}

/** Is a part with this window showing at this frame? */
export const shown = (frame: number, on: number, off?: number) =>
  frame >= on && (off === undefined || frame < off);

const delayStyle = (delay?: number, style?: CSSProperties): CSSProperties | undefined =>
  delay || style ? { ...style, ...(delay ? { transitionDelay: `${delay}ms` } : {}) } : undefined;

/** A line that draws itself from its start to its end. */
export function Draw({
  frame,
  on,
  off,
  d,
  className = "pl-l",
  delay,
}: {
  frame: number;
  on: number;
  off?: number;
  d: string;
  className?: string;
  delay?: number;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      className={`${className} mv-draw${shown(frame, on, off) ? " is-on" : ""}`}
      style={delayStyle(delay)}
    />
  );
}

/** A part that fades in (and may rise or grow as it comes). */
export function Fade({
  frame,
  on,
  off,
  from = "none",
  delay,
  children,
}: {
  frame: number;
  on: number;
  off?: number;
  from?: "none" | "up" | "down" | "grow" | "left" | "right";
  delay?: number;
  children: ReactNode;
}) {
  return (
    <g
      className={`mv-fade mv-from-${from}${shown(frame, on, off) ? " is-on" : ""}`}
      style={delayStyle(delay)}
    >
      {children}
    </g>
  );
}

/**
 * A part that moves from place to place as the frames change: give its
 * position at each frame (the last one given holds). The motion is a CSS
 * transform, so it eases between frames and stands still with motion off.
 */
export function Travel({
  frame,
  at,
  children,
  delay,
}: {
  frame: number;
  at: [number, number, number?][];
  children: ReactNode;
  delay?: number;
}) {
  const i = Math.max(0, Math.min(at.length - 1, frame));
  const [x, y, s = 1] = at[i];
  return (
    <g
      className="mv-travel"
      style={delayStyle(delay, {
        transform: `translate(${x}px, ${y}px) scale(${s})`,
      })}
    >
      {children}
    </g>
  );
}
