/**
 * What every "Books of the Bible" film shares (the group "books": one film
 * for one whole book, drawn from that book's own page data). Built once, for
 * all sixty-six.
 *
 * A book film has seven pictures, and three of them have the same job in
 * every book, so they are drawn the same way:
 *
 *   1  What the book is        the book's own scene (each film draws it)
 *   2  How it is laid out      <Layout>: the book as one long scroll, a panel
 *                              for each of its parts, as wide as its chapters
 *   3 to 6  What to watch for  the book's own scenes
 *   7  Where to start          <StartReading>: a reader, an open scroll, and
 *                              one gold marker at the place to begin
 *
 * A film's file exports its drawing as usual and, beside it, LAYOUT: the
 * chapters in each part of its second picture, in order. They must add up to
 * the book's chapters (films.test.tsx holds it against bible/books.json), so
 * the picture can never show a book of the wrong shape.
 *
 * Everything here is in the stage set's hand and tokens. No words are drawn:
 * the parts are named in the caption and in the frame's `still`.
 */
import type { ReactNode } from "react";
import { Ink, Lamp, Olive, Person, type Tone } from "@/components/art/stage";
import { Ambient, Fade } from "../motion";

/** One picture of a film: paper, and whatever is drawn on it, while frame k shows. */
export const Scene = ({
  frame,
  k,
  children,
}: {
  frame: number;
  k: number;
  children: ReactNode;
}) => (
  <Fade frame={frame} on={k} off={k + 1}>
    <path className="pl-paper" d="M0,0H800V500H0Z" />
    {children}
  </Fade>
);

/** The first picture is also the poster, so it shows before Play (frame -1). */
export const FirstScene = ({
  frame,
  children,
}: {
  frame: number;
  children: ReactNode;
}) => (
  <Fade frame={frame} on={-1} off={1}>
    {children}
  </Fade>
);

/** One gold star: a picture's one mark. */
export const GoldStar = ({
  x,
  y,
  r = 9,
}: {
  x: number;
  y: number;
  r?: number;
}) => {
  const d = `M${x},${y - r * 1.7}L${x + r * 0.42},${y - r * 0.42}L${x + r * 1.7},${y}L${x + r * 0.42},${y + r * 0.42}L${x},${y + r * 1.7}L${x - r * 0.42},${y + r * 0.42}L${x - r * 1.7},${y}L${x - r * 0.42},${y - r * 0.42}Z`;
  return (
    <>
      <path className="pl-m" d={d} />
      <path className="pl-f" d={d} />
    </>
  );
};

const TONES: Tone[] = ["c", "b", "g"];

/** Where each part of a layout sits: its left edge, width and middle, in the drawing's units. */
export function layoutSpans(parts: number[], x0 = 90, x1 = 710, gap = 6) {
  const total = parts.reduce((s, n) => s + n, 0);
  const room = x1 - x0 - gap * (parts.length - 1);
  // No part is drawn narrower than 16 units, however few its chapters.
  const min = 16;
  const raw = parts.map(n => Math.max(min, (n / total) * room));
  const k = room / raw.reduce((s, w) => s + w, 0);
  let x = x0;
  return raw.map(w => {
    const width = w * k;
    const span = { x, w: width, mid: x + width / 2 };
    x += width + gap;
    return span;
  });
}

/**
 * "How it is laid out": the book as one long scroll unrolled between two
 * rollers, with a panel for each part, as wide as its share of the chapters.
 * The panels arrive one after another while the caption names them. `mark`
 * is the part to point out with the one gold rule (the book's hinge, or its
 * center); `above` draws a small picture over each panel, given its middle.
 */
export function Layout({
  frame,
  k,
  parts,
  mark,
  above,
  y = 250,
  h = 150,
  hatch,
}: {
  frame: number;
  k: number;
  /** The chapters in each part, in order. */
  parts: number[];
  /** The index of the part under the gold rule, if any. */
  mark?: number;
  /** A small picture above each panel: (index, middle x, top y) => drawing. */
  above?: (i: number, mid: number, top: number) => ReactNode;
  y?: number;
  h?: number;
  hatch?: string;
}) {
  const spans = layoutSpans(parts);
  const top = y - h / 2;
  const bot = y + h / 2;
  // The whole reveal fits a spoken frame: the last panel by about 12 s.
  const step = Math.min(2.4, 11 / Math.max(1, parts.length));
  return (
    <>
      {/* The parchment, and the two rollers. */}
      <Ink d={`M70,${top}H730V${bot}H70Z`} />
      <Ink d={`M52,${top - 18}h20v${h + 36}h-20Z`} tone="c" />
      <Ink d={`M728,${top - 18}h20v${h + 36}h-20Z`} tone="c" />
      <path
        className="pl-l"
        d={`M46,${top - 18}h32M46,${bot + 18}h32M722,${top - 18}h32M722,${bot + 18}h32`}
      />
      {spans.map((s, i) => (
        <Fade key={i} frame={frame} on={k} off={k + 1} from="up" at={1 + i * step}>
          <Ink
            d={`M${s.x},${top + 14}h${s.w}v${h - 28}h${-s.w}Z`}
            tone={TONES[i % 3]}
            hatch={i % 2 ? hatch : undefined}
          />
          {/* Lines of writing, as many as the panel has room for. */}
          <path
            className="pl-f"
            d={Array.from({ length: 5 }, (_, r) =>
              s.w > 26
                ? `M${s.x + 8},${top + 34 + r * 20}h${Math.max(4, s.w - 16 - (r === 4 ? s.w * 0.3 : 0))}`
                : ""
            ).join("")}
          />
          {above?.(i, s.mid, top - 26)}
        </Fade>
      ))}
      {mark !== undefined && spans[mark] && (
        <Fade frame={frame} on={k} off={k + 1} from="grow" at={2 + parts.length * step}>
          <path
            className="pl-m"
            d={`M${spans[mark].x},${bot + 30}h${spans[mark].w}v9h${-spans[mark].w}Z`}
          />
          <path
            className="pl-f"
            d={`M${spans[mark].x},${bot + 30}h${spans[mark].w}v9h${-spans[mark].w}Z`}
          />
        </Fade>
      )}
    </>
  );
}

/**
 * "Where to start reading": a reader sitting under a tree with a scroll open
 * across the knees, a lamp beside, and one gold marker at the place to begin.
 * The same picture ends every book film, so a child learns what it means.
 * `child` seats a second, smaller reader beside the first.
 */
export function StartReading({
  frame,
  k,
  hatch,
  child = true,
}: {
  frame: number;
  k: number;
  hatch?: string;
  child?: boolean;
}) {
  return (
    <>
      <Ink d="M-10,510V400C240,380 560,388 810,376V510Z" tone="g" />
      <Ambient frame={frame} on={k} kind="sway">
        <Olive x={610} y={410} s={2.6} hatch={hatch} />
      </Ambient>
      <Person x={330} y={470} s={1.8} pose="sit" robe="b" cloak="c" />
      {child && (
        <Fade frame={frame} on={k} from="left" at={4}>
          <Person x={236} y={476} s={1.2} pose="sit" robe="g" child head="bare" />
        </Fade>
      )}
      {/* The scroll, open across the knees. */}
      <Ink d="M372,420h112v52h-112Z" />
      <Ink d="M362,414h12v64h-12ZM482,414h12v64h-12Z" tone="c" />
      <path
        className="pl-f"
        d="M384,432h88M384,442h88M384,452h88M384,462h60"
      />
      <Fade frame={frame} on={k} from="grow" at={7}>
        <Ambient frame={frame} on={k} kind="glow">
          <path className="pl-m" d="M384,426h40v8h-40Z" />
          <path className="pl-f" d="M384,426h40v8h-40Z" />
        </Ambient>
      </Fade>
      <Lamp x={540} y={478} s={1.3} />
    </>
  );
}
