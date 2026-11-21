/**
 * "Why does God seem silent sometimes?": a good question, answered from the
 * Study Bible's notes on Psalm 13, Psalm 22 and 1 Kings 19 and the site's
 * page "Feeling far from God"; no new argument, and never "you lack faith".
 *
 * A dark hillside with a rock, and a person sitting on it. Three pictures are
 * drawn on a page laid over it: the desert tree, the mountain, the cross.
 *
 *   0  When God seems quiet  night; a person alone on a rock under the stars
 *   1  How long?             a harp stands against the rock beside them (David's psalm)
 *   2  Trust in the dark     still night, but a thin gold line along the far hills
 *   3  Elijah under the tree (a page) a person asleep under a small desert tree,
 *                            a loaf and a jar of water on a stone beside them
 *   4  A still, small voice  (a page) a mountain with a cave, rocks broken by the
 *                            wind at its foot, a person at the cave's mouth
 *   5  Even Jesus            (a page) a hill under a darkened sky, a cross on it
 *   6  Near, though unseen   morning on the hillside; the person stands up
 *
 * God is never drawn. The one mustard mark is the line of first light.
 */
import type { ReactNode } from "react";
import { Shape } from "../../art";
import { Fade, type FilmDrawing } from "../motion";
import { Seated, Standing, ring } from "./figures";

const STARS: [number, number][] = [
  [70, 50],
  [160, 110],
  [250, 40],
  [340, 100],
  [440, 50],
  [530, 120],
  [620, 60],
  [710, 110],
  [760, 40],
  [120, 190],
  [470, 200],
  [660, 210],
];
const star = (x: number, y: number) =>
  `M${x},${y - 7}L${x + 2},${y - 2}L${x + 7},${y}L${x + 2},${y + 2}L${x},${y + 7}L${x - 2},${y + 2}L${x - 7},${y}L${x - 2},${y - 2}Z`;
const RIDGE = "M0,330C120,300 240,296 360,318C480,296 640,290 800,312";

function On({ when, children }: { when: boolean; children: ReactNode }) {
  return (
    <g className={`mv-fade mv-from-none${when ? " is-on" : ""}`}>{children}</g>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const night = frame <= 2;
    return (
      <>
        {/* Night on the hillside (the poster, 0 to 2): the sky dark, full of stars. */}
        <On when={night}>
          <path className="fp-dark" fill={h.h1} d="M0,0H800V340H0Z" />
          {STARS.map(([x, y]) => (
            <path key={`${x}-${y}`} className="pl-o" d={star(x, y)} />
          ))}
        </On>
        {/* 6. Morning: light from beyond the top of the picture. */}
        <Fade frame={frame} on={6}>
          <path
            className="pl-f"
            d="M400,0V46M360,0L378,40M440,0L422,40M316,0L350,34M484,0L450,34"
          />
        </Fade>

        {/* The far hills, the near hill and the ground. */}
        <Shape d={`${RIDGE}V420H0Z`} tone="g" hatch={h.h2} off={2} />
        {/* 2. A thin line of first light along the far hills. */}
        <Fade frame={frame} on={2} off={3}>
          <path
            className="fp-gold"
            d="M0,322C120,292 240,288 360,310C480,288 640,282 800,304"
          />
        </Fade>
        <Shape
          d="M0,420C80,360 200,340 300,350C420,362 520,400 600,420Z"
          tone="g"
          off={3}
        />
        <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,456H800V500H0Z" />

        <g transform="translate(320 420) scale(1.6) translate(-320 -420)">
          {/* The rock. */}
          <Shape
            d="M250,420C252,384 280,366 320,364C362,362 384,380 388,420Z"
            tone="b"
            off={2}
          />
          {/* The person sits on it (the poster, 0 to 2) ... */}
          <Fade frame={frame} on={-1} off={3}>
            <Seated x={318} y={330} tone="c" body={34} />
          </Fade>
          {/* ... and at 6 stands up beside it. */}
          <Fade frame={frame} on={6} from="up">
            <Standing x={420} y={356} tone="c" s={1} />
          </Fade>
          {/* 1 and 2. A harp stands against the rock beside them. */}
          <Fade frame={frame} on={1} off={3} from="up">
            <path
              className="pl-l"
              d="M394,410C384,392 388,378 398,370M420,410C430,392 426,378 416,370M394,376H420"
            />
            <path className="pl-f" d="M400,376V410M407,376V410M414,376V410" />
            <Shape d="M390,420V408H424V420Z" tone="c" off={1} />
          </Fade>
        </g>

        {/* 3. A page: Elijah asleep under a small desert tree, bread and water beside him. */}
        <Fade frame={frame} on={3} off={4}>
          <path className="pl-paper" d="M0,0H800V500H0Z" />
          <path
            className="pl-l"
            d="M690,70a30,30 0 1,0 60,0a30,30 0 1,0 -60,0ZM720,24v-14M720,130v-14M674,70h-14M780,70h-14"
          />
          <Shape d="M0,500V404H800V500Z" tone="c" off={2} />
          <path fill={h.h3} d="M0,456H800V500H0Z" />
          <g transform="translate(420 404) scale(1.7) translate(-420 -404)">
            <path
              fill={h.h2}
              d="M300,408a110,12 0 1,0 220,0a110,12 0 1,0 -220,0Z"
            />
            <path
              className="pl-l"
              d="M410,404C412,366 406,330 414,290M412,340l-46,-26M414,318l42,-30M410,370l-36,-10M414,300l-20,-34"
            />
            <path
              className="pl-f"
              d="M366,314l-14,-10M366,314l-6,-16M456,288l12,-12M456,288l14,0M374,360l-16,-2M394,266l-4,-16M394,266l-14,-8"
            />
            <path className="pl-o" d={ring(338, 392, 8)} />
            <path className="pl-l" d={ring(338, 392, 8)} />
            <Shape
              d="M348,404C350,388 362,384 380,384H452C462,386 466,394 466,404Z"
              tone="b"
              off={1.5}
            />
            <Shape d="M500,404C502,392 548,390 552,404Z" tone="b" off={1.5} />
            <Shape d="M508,392c0,-10 18,-10 18,0Z" tone="c" off={0.8} />
            <Shape
              d="M532,392V376c0,-6 4,-8 6,-8c2,0 6,2 6,8V392Z"
              tone="c"
              off={0.8}
            />
          </g>
        </Fade>

        {/* 4. A page: the mountain with its cave; rocks broken by the wind; a person at the cave's mouth. */}
        <Fade frame={frame} on={4} off={5}>
          <path className="pl-paper" d="M0,0H800V500H0Z" />
          <path
            className="pl-f"
            d="M20,110C80,98 140,124 210,108M40,160C100,148 170,172 240,156M10,210C70,200 130,220 190,208"
          />
          <Shape
            d="M240,420L420,150L510,240L590,170L800,330V420Z"
            tone="g"
            off={3}
          />
          {/* The cave's mouth: ink by day, night paper by night, dark either way. */}
          <path
            className="pl-k fp-dark"
            d="M536,420V384a26,26 0 0 1 52,0V420Z"
          />
          <path className="pl-l" d="M536,420V384a26,26 0 0 1 52,0V420Z" />
          <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
          <path fill={h.h3} d="M0,456H800V500H0Z" />
          <Shape d="M262,420l8,-22l26,-6l12,28Z" tone="b" off={1} />
          <Shape d="M318,420l6,-14l22,2l4,12Z" tone="b" off={1} />
          <Shape d="M360,420l10,-26l20,10l-2,16Z" tone="b" off={1} />
          <Shape d="M214,420l6,-10l16,0l2,10Z" tone="b" off={1} />
          <Standing x={506} y={339} tone="c" s={1.3} />
        </Fade>

        {/* 5. A page: a hill under a darkened sky, a cross on it. */}
        <Fade frame={frame} on={5} off={6}>
          <path className="pl-paper" d="M0,0H800V500H0Z" />
          <path className="fp-dark" fill={h.h1} d="M0,0H800V420H0Z" />
          <Shape
            d="M200,420C260,300 340,270 400,270C460,270 540,300 600,420Z"
            tone="g"
            off={3}
          />
          <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
          <path fill={h.h3} d="M0,456H800V500H0Z" />
          <path className="pl-k" d="M396,272V150h8v122ZM366,182H434v8H366Z" />
        </Fade>
      </>
    );
  },
};

export default film;
