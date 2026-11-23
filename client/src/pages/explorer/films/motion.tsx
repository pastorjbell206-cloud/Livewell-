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
 *
 * A picture that moves as the voice talks. A frame with Listen on lasts as
 * long as its words, fifteen to thirty seconds, so its parts need not all
 * arrive at once:
 *
 * - `at` (seconds) on Draw and Fade says when in the frame a part arrives: a
 *   figure enters, a light comes up, a line draws itself. The times are
 *   written for a spoken frame; the player sets `--mv-pace` to fit them into
 *   a silent frame's few seconds. Going away is never delayed.
 * - `slow` on Draw gives a line several seconds to draw.
 * - Ambient is a small motion that runs while its frame shows and then comes
 *   to rest: cloud drifting, a tree swaying, a flame, stars, a light.
 * - A drawing's `push` is where the stage slowly moves in on each frame
 *   ([x, y, zoom] in the drawing's own units): a camera that glides from one
 *   frame's view to the next, so nothing ever jumps.
 *
 * All of it is CSS on opacity and transform, and none of it runs with motion
 * turned off: the finished frame is the same picture.
 */
import type { CSSProperties, ReactNode } from "react";
import type { Hatch } from "@/components/art/PlateSvg";

export interface FilmDrawing {
  w: number;
  h: number;
  draw: (h: Hatch, frame: number) => ReactNode;
  /**
   * Where the stage slowly moves in on a frame, in the drawing's units, and
   * how far ([x, y, zoom]; zoom 1.06 if not given); the whole picture if null.
   */
  push?: (frame: number) => [number, number, number?] | null;
}

/** Is a part with this window showing at this frame? */
export const shown = (frame: number, on: number, off?: number) =>
  frame >= on && (off === undefined || frame < off);

const delayStyle = (
  delay?: number,
  style?: CSSProperties
): CSSProperties | undefined =>
  delay || style
    ? { ...style, ...(delay ? { transitionDelay: `${delay}ms` } : {}) }
    : undefined;

/** The style and class of a part that arrives `at` seconds into its frame. */
const timed = (at?: number, extra?: Record<string, string>) =>
  at || extra
    ? ({ ...(at ? { "--mv-at": `${at}s` } : {}), ...extra } as CSSProperties)
    : undefined;

/** A line that draws itself from its start to its end. */
export function Draw({
  frame,
  on,
  off,
  d,
  className = "pl-l",
  delay,
  at,
  slow,
}: {
  frame: number;
  on: number;
  off?: number;
  d: string;
  className?: string;
  delay?: number;
  /** Seconds into a spoken frame at which the line begins to draw. */
  at?: number;
  /** Seconds the line takes to draw (1.6 if not given). */
  slow?: number;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      className={`${className} mv-draw${at ? " mv-timed" : ""}${shown(frame, on, off) ? " is-on" : ""}`}
      style={
        at || slow
          ? timed(at, slow ? { "--mv-dur": `${slow}s` } : undefined)
          : delayStyle(delay)
      }
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
  at,
  children,
}: {
  frame: number;
  on: number;
  off?: number;
  /** "walk-left" and "walk-right" bring a figure in from further off, slowly. */
  from?:
    | "none"
    | "up"
    | "down"
    | "grow"
    | "left"
    | "right"
    | "walk-left"
    | "walk-right";
  delay?: number;
  /** Seconds into a spoken frame at which the part arrives. */
  at?: number;
  children: ReactNode;
}) {
  return (
    <g
      className={`mv-fade mv-from-${from}${at ? " mv-timed" : ""}${shown(frame, on, off) ? " is-on" : ""}`}
      style={at ? timed(at) : delayStyle(delay)}
    >
      {children}
    </g>
  );
}

/**
 * A small motion that runs while its frame shows, then rests: "drift" (cloud,
 * a boat, birds: moves `dx` units across), "sway" (a tree, grain), "flicker"
 * (a flame), "twinkle" (stars), "glow" (a light breathing), "bob" (water).
 * `late` (seconds) staggers one against another. With motion off it is still.
 */
export function Ambient({
  frame,
  on,
  off,
  kind,
  dx,
  late,
  children,
}: {
  frame: number;
  on: number;
  off?: number;
  kind: "drift" | "sway" | "flicker" | "twinkle" | "glow" | "bob";
  dx?: number;
  late?: number;
  children: ReactNode;
}) {
  return (
    <g
      className={`mv-amb mv-amb-${kind}${shown(frame, on, off) ? " is-on" : ""}`}
      style={
        dx !== undefined || late
          ? ({
              ...(dx !== undefined ? { "--mv-dx": `${dx}px` } : {}),
              ...(late ? { animationDelay: `${late}s` } : {}),
            } as CSSProperties)
          : undefined
      }
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

/**
 * The stage's slow camera for a frame: the attribute and style the screen
 * takes. A drawing's `push` gives, for each frame, the point the picture
 * moves in on and how far ([x, y, zoom], zoom 1.06 if not given); the screen
 * glides from one frame's view to the next, never past the picture's edge.
 * `pace` is 1 for a spoken frame; a silent one is short.
 */
export function stageMotion(
  drawing: FilmDrawing | null,
  frame: number,
  pace: number
): { "data-push"?: "on"; style: CSSProperties } {
  const style = { "--mv-pace": String(pace) } as CSSProperties;
  if (!drawing?.push) return { style };
  const focus = frame < 0 ? null : drawing.push(frame);
  const [x, y, z = 1.06] = focus ?? [0, 0, 1];
  const { w, h } = drawing;
  const tx = Math.min(0, Math.max(w * (1 - z), w / 2 - x * z));
  const ty = Math.min(0, Math.max(h * (1 - z), h / 2 - y * z));
  return {
    "data-push": "on",
    style: {
      ...style,
      "--mv-cam": `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${z})`,
    } as CSSProperties,
  };
}
