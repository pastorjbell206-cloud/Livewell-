/**
 * "Are science and the Bible enemies?": a good question, answered from the
 * site's Honest Answer "Do I have to choose between faith and science?", the
 * Honest Answer "How should a Christian read Genesis 1?" and the family
 * catechism (Q71); no new argument. No position on the age of the earth,
 * evolution, Adam or the flood.
 *
 * A table by a window at night, an open book and a small telescope on it.
 *
 *   0  Do I have to choose?  the book and the telescope on the table
 *   1  An old story          a taut rope between them, as if pulling apart
 *   2  Scientists who believed (a page) a laboratory doorway, its doors open,
 *                            a line of carved writing on the lintel
 *   3  Different questions   a kettle steaming beside a cup
 *   4  Not in the gaps       a book open with a pen across its page
 *   5  Where Christians differ three people round the table, each with a book,
 *                            the same light from the window on all three
 *   6  Search it out         the window open to the stars, one gold; the
 *                            telescope pointing out, the book beside it
 *
 * The one mustard mark is the gold star.
 */
import type { ReactNode } from "react";
import { Shape } from "../../art";
import { Fade, type FilmDrawing } from "../motion";
import { Standing } from "./figures";

const STARS: [number, number][] = [
  [560, 90],
  [610, 140],
  [660, 84],
  [700, 170],
  [580, 210],
  [650, 240],
  [710, 110],
];
const star = (x: number, y: number) =>
  `M${x},${y - 6}L${x + 2},${y - 2}L${x + 6},${y}L${x + 2},${y + 2}L${x},${y + 6}L${x - 2},${y + 2}L${x - 6},${y}L${x - 2},${y - 2}Z`;

/** An open book lying on a surface, its spine at (x, y), w wide each side. */
const book = (x: number, y: number, w: number) =>
  `M${x - w},${y}C${x - w * 0.6},${y - w * 0.3} ${x - w * 0.2},${y - w * 0.3} ${x},${y - w * 0.12}C${x + w * 0.2},${y - w * 0.3} ${x + w * 0.6},${y - w * 0.3} ${x + w},${y}V${y + 6}H${x - w}Z`;

function On({ when, children }: { when: boolean; children: ReactNode }) {
  return (
    <g className={`mv-fade mv-from-none${when ? " is-on" : ""}`}>{children}</g>
  );
}

function Telescope() {
  return (
    <g>
      <path
        className="pl-l"
        d="M566,268L532,360M568,268L570,360M570,268L606,360"
      />
      <Shape d="M500,288L630,218L640,238L510,308Z" tone="b" off={1.5} />
      <Shape d="M626,212L654,198L664,218L636,232Z" tone="b" off={1} />
    </g>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const bookOn = frame <= 1 || frame === 6;
    const scopeOn = frame <= 1 || frame === 6;
    const open = frame === 6;
    return (
      <>
        {/* The room: a floor, and the window with the night sky in it. */}
        <path className="pl-l" d="M0,430H800" />
        <path fill={h.h3} d="M0,460H800V500H0Z" />
        <path className="fp-dark" fill={h.h1} d="M520,30H740V250H520Z" />
        {STARS.map(([x, y]) => (
          <path key={`${x}-${y}`} className="pl-o" d={star(x, y - 40)} />
        ))}
        {/* 6. One star gold. */}
        <On when={open}>
          <g transform="translate(690 70) scale(2) translate(-690 -70)">
            <path className="pl-m" d={star(690, 70)} />
            <path className="pl-l" d={star(690, 70)} />
          </g>
        </On>
        <path className="pl-l" d="M520,30H740V250H520Z" />
        <Shape d="M508,250H752V262H508Z" tone="c" off={1.5} />
        {/* The window's cross bars, shut; at 6 it stands open. */}
        <On when={!open}>
          <path className="pl-l" d="M630,30V250M520,140H740" />
        </On>
        <On when={open}>
          <Shape d="M520,30L470,54V226L520,250Z" tone="b" off={1.5} />
          <Shape d="M740,30L790,54V226L740,250Z" tone="b" off={1.5} />
        </On>

        {/* 5. Three people behind the table, the window's light falling on all three. */}
        <Fade frame={frame} on={5} off={6} from="up">
          <path
            className="pl-f"
            d="M520,200L216,250M520,214L404,244M520,236L600,256"
          />
          <Standing x={200} y={262} tone="b" s={2.3} />
          <Standing x={400} y={256} tone="g" s={2.4} />
          <Standing x={600} y={266} tone="c" s={2.2} />
          {/* The table's front, so only their heads and shoulders show above it. */}
          <Shape d="M60,374H740V430H60Z" tone="c" off={2} />
        </Fade>

        {/* The table. */}
        <Shape d="M60,360H740V374H60Z" tone="c" off={2} />
        <path className="pl-l" d="M84,374V430M716,374V430" />

        {/* 5. The books they hold, open on the table's edge in front of them. */}
        <Fade frame={frame} on={5} off={6} from="up">
          <Shape d={book(200, 354, 34)} tone="c" off={1} />
          <Shape d={book(400, 354, 34)} tone="c" off={1} />
          <Shape d={book(600, 354, 34)} tone="c" off={1} />
        </Fade>

        {/* The open book (the poster, 0, 1 and 6). */}
        <On when={bookOn}>
          <Shape d={book(240, 354, 100)} tone="c" off={1.5} />
          <path className="pl-l" d="M240,342V360" />
          <path
            className="pl-f"
            d="M160,342C188,334 208,334 228,340M160,350C188,342 208,342 228,348M252,340C272,334 292,334 320,342M252,348C272,342 292,342 320,350"
          />
        </On>
        {/* The telescope (the poster, 0, 1 and 6). */}
        <On when={scopeOn}>
          <Telescope />
        </On>

        {/* 1. A taut rope between them, as if they pulled against each other. */}
        <Fade frame={frame} on={1} off={2}>
          <path className="fp-thread" d="M330,344L512,300" />
          <path
            className="pl-f"
            d="M350,334l4,10M380,327l4,10M410,320l4,10M440,313l4,10M470,306l4,10M496,300l4,10"
          />
        </Fade>

        {/* 3. A kettle steaming beside a cup. */}
        <Fade frame={frame} on={3} off={4} from="up">
          <g transform="translate(420 360) scale(1.6) translate(-430 -330)">
            <Shape
              d="M330,330C322,300 340,276 380,276C420,276 438,300 430,330Z"
              tone="b"
              off={1.5}
            />
            <path className="pl-l" d="M352,276C352,252 408,252 408,276" />
            <Shape d="M430,300L462,282L466,290L436,312Z" tone="b" off={1} />
            <path
              className="pl-f"
              d="M466,276c-6,-10 6,-16 0,-26M478,270c-6,-10 6,-16 0,-26"
            />
            <Shape d="M500,330V306H536V330Z" tone="c" off={1} />
            <path className="pl-l" d="M536,312c10,0 10,12 0,12" />
          </g>
        </Fade>

        {/* 4. A book open with a pen across its page. */}
        <Fade frame={frame} on={4} off={5} from="up">
          <Shape d={book(400, 354, 160)} tone="c" off={2} />
          <path className="pl-l" d="M400,334V360" />
          <path
            className="pl-f"
            d="M270,340C320,326 360,324 386,330M270,330C320,316 360,314 386,320M270,350C320,336 360,334 386,340M414,330C440,324 480,326 530,340M414,320C440,314 480,316 530,330M414,340C440,334 480,336 530,350"
          />
          <path className="pl-l" d="M440,330L560,272" />
          <path className="pl-k" d="M440,330l9,-9l5,8Z" />
        </Fade>

        {/* 2. A page: the laboratory doorway, its doors open, writing on the lintel. */}
        <Fade frame={frame} on={2} off={3}>
          <path className="pl-paper" d="M0,0H800V500H0Z" />
          <path className="pl-l" d="M0,430H800" />
          <path fill={h.h3} d="M0,460H800V500H0Z" />
          <Shape d="M250,430V110H550V430Z" tone="c" off={3} />
          <path className="pl-paper" d="M310,430V200H490V430Z" />
          <path fill={h.hh} d="M310,430V200H490V430Z" />
          <path className="pl-l" d="M310,430V200H490V430Z" />
          <Shape d="M310,200L254,224V430H310Z" tone="b" off={1.5} />
          <Shape d="M490,200L546,224V430H490Z" tone="b" off={1.5} />
          <Shape d="M270,130H530V176H270Z" tone="b" off={1.5} />
          <path
            className="pl-l"
            d="M290,148H330M338,148H372M380,148H420M428,148H470M478,148H510M300,160H346M354,160H394M402,160H452M460,160H500"
          />
        </Fade>
      </>
    );
  },
};

export default film;
