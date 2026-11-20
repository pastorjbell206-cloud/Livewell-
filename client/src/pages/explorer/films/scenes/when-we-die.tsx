/**
 * "What happens when we die?": a good question, answered from the family
 * catechism (Q70: "It is a door into being with him"), the Study Bible's
 * study of the time between death and the resurrection and its notes on
 * John 14 and 1 Thessalonians 4, and in agreement with the film and card
 * "The life to come", without repeating them.
 *
 * A garden with a bench under a tree, and a path up the hill to a house.
 *
 *   0  A big question        evening; a grown-up and a child on the bench; the door shut
 *   1  Real, and sad         clouds and soft rain; the two sit close
 *   2  Not the end           the rain stops; the window lit, the door open
 *   3  With Jesus            light from the open door runs down the path
 *   4  Waiting for morning   night, stars, the window lit, a first pale band of morning
 *   5  Sad and hopeful       morning light; the two stand beside the bench
 *   6  You are not alone     the two sit on the bench in the morning
 *
 * Gentle on purpose: no grave, no body, no fire, no one shown dying, and
 * nothing about any person's eternal state. No one is drawn going in at the
 * door. The one mustard mark is the light of the house.
 */
import type { ReactNode } from "react";
import { Shape } from "../../art";
import { Fade, Travel, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

const SKY = "M0,0H800V272C760,272 680,276 600,300C520,330 440,400 360,420H0Z";
const EDGE_A =
  "M386,428C444,420 474,398 512,384C556,368 584,336 620,318C634,312 644,306 652,300";
const EDGE_B =
  "M420,446C474,436 500,410 534,396C586,380 608,348 642,328C656,318 666,308 676,300";
const MID =
  "M403,437C459,428 487,404 523,390C571,374 596,342 631,323C645,315 655,307 664,300";
const STARS: [number, number][] = [
  [80, 50],
  [170, 110],
  [260, 40],
  [350, 90],
  [450, 46],
  [540, 110],
  [640, 60],
  [740, 120],
  [110, 190],
  [430, 170],
];
const star = (x: number, y: number) =>
  `M${x},${y - 7}L${x + 2},${y - 2}L${x + 7},${y}L${x + 2},${y + 2}L${x},${y + 7}L${x - 2},${y + 2}L${x - 7},${y}L${x - 2},${y - 2}Z`;

function On({ when, children }: { when: boolean; children: ReactNode }) {
  return (
    <g className={`mv-fade mv-from-none${when ? " is-on" : ""}`}>{children}</g>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const evening = frame === -1 || frame === 0;
    const night = frame === 4;
    const morning = frame === 5 || frame === 6;
    const open = frame === -1 || frame >= 2;
    const seated = frame >= 0 && frame !== 5;
    return (
      <>
        {/* Evening (the poster and 0): a band of hatching across the sky. */}
        <On when={evening}>
          <path className="fp-dark" fill={h.h1} d="M0,0H800V110H0Z" />
        </On>
        {/* 4. Night: the sky dark and full of stars, and the first pale line of morning. */}
        <On when={night}>
          <path className="fp-dark" fill={h.h1} d={SKY} />
          {/* The first pale band of morning, low along the horizon. */}
          <path
            className="pl-paper"
            d="M0,372H360C440,352 520,284 600,254C680,230 760,226 800,226V272C760,272 680,276 600,300C520,330 440,400 360,420H0Z"
          />
          {STARS.map(([x, y]) => (
            <path key={`${x}-${y}`} className="pl-o" d={star(x, y)} />
          ))}
        </On>
        {/* Morning (5 and 6): light from beyond the top of the picture. */}
        <On when={morning}>
          <path
            className="pl-f"
            d="M560,0L576,44M620,0L620,48M680,0L664,44M520,0L548,36M720,0L692,36"
          />
        </On>
        {/* 1. Clouds and a soft rain. */}
        <Fade frame={frame} on={1} off={2} from="down">
          <Shape
            d="M120,110C96,110 92,86 112,78C108,54 140,44 156,60C168,40 204,44 206,70C228,70 232,100 210,110Z"
            tone="b"
            off={2}
          />
          <Shape
            d="M420,90C400,90 396,70 414,64C412,44 440,36 452,50C464,34 494,38 494,60C514,60 516,86 496,90Z"
            tone="b"
            off={2}
          />
          <path
            className="pl-f"
            d="M126,124l-6,18M150,124l-6,18M174,124l-6,18M198,124l-6,18M430,104l-6,18M454,104l-6,18M478,104l-6,18M140,160l-6,18M188,160l-6,18M444,140l-6,18M486,140l-6,18"
          />
        </Fade>

        {/* The land: the garden's ground and the hill rising to the right. */}
        <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
        <Shape
          d="M360,420C440,400 520,330 600,300C680,276 760,272 800,272V420Z"
          tone="g"
          off={3}
        />
        <path className="pl-l" d="M0,420H360" />
        <path fill={h.h3} d="M0,456H800V500H0Z" />

        {/* The path from the garden up to the house. */}
        <path className="pl-f" d={EDGE_A} />
        <path className="pl-f" d={EDGE_B} />
        {/* 3. Light from the open door runs down the path. */}
        <Fade frame={frame} on={3} off={4}>
          <path
            className="fp-gold"
            strokeDasharray="10 10"
            d={MID}
          />
        </Fade>

        {/* The house on the hill: its door and its window. */}
        <g transform="translate(665 300) scale(1.3) translate(-665 -300)">
        <Shape d="M610,300V240H720V300Z" tone="c" off={2} />
        <Shape d="M598,246L665,196L732,246Z" tone="b" off={2} />
        <path className="pl-paper" d="M650,300V264h28v36Z" />
        <path fill={h.hh} d="M650,300V264h28v36Z" />
        <g className={`mv-fade mv-from-none${open ? " is-on" : ""}`}>
          <path className="pl-m" d="M650,300V264h28v36Z" />
          <path className="pl-m" d="M690,254h18v16h-18Z" />
          <path
            className="pl-f"
            d="M664,256v-12M646,262l-10,-8M682,262l10,-8"
          />
        </g>
        <path className="pl-l" d="M650,300V264h28v36Z" />
        <path className="pl-l" d="M690,254h18v16h-18ZM699,254v16M690,262h18" />
        </g>

        <g transform="translate(240 420) scale(1.45) translate(-240 -420)">
        {/* The tree and the bench in the garden. */}
        <Shape
          d="M140,420C142,384 142,350 144,320H158C158,350 158,384 162,420Z"
          tone="c"
          off={1.5}
        />
        <Shape
          d="M84,300C76,258 112,232 140,238C170,224 210,252 200,288C210,318 176,332 150,322C120,334 88,322 84,300Z"
          tone="g"
          off={2}
        />
        <path className="pl-l" d="M206,400V420M318,400V420" />
        <Shape d="M196,392H330V400H196Z" tone="c" off={1.5} />
        <path className="pl-l" d="M204,392V362M322,392V362" />
        <Shape d="M200,362H326V370H200Z" tone="c" off={1.5} />

        {/* The grown-up and the child on the bench (all but 5). */}
        <On when={seated}>
          <Seated x={238} y={344} tone="b" body={48} />
          <Travel
            frame={frame}
            at={[
              [0, 0],
              [-16, 0],
              [-16, 0],
              [-16, 0],
              [-16, 0],
              [-16, 0],
              [-12, 0],
            ]}
          >
            <Seated x={296} y={358} tone="c" body={34} />
          </Travel>
        </On>
        {/* 5. Morning: the two stand together beside the bench. */}
        <Fade frame={frame} on={5} off={6} from="up">
          <Standing x={350} y={352} tone="b" s={1} />
          <Standing x={384} y={374} tone="c" s={0.7} />
        </Fade>
        </g>
      </>
    );
  },
};

export default film;
