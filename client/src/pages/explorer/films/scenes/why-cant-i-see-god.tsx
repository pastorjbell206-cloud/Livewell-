/**
 * "Why can't I see God?": a good question, answered from the family
 * catechism (Q3 and Q67), the Study Bible's study of revelation, and the
 * Honest Answer "Does God actually exist?" (its paragraph on Schellenberg
 * and Pascal); no new argument.
 *
 * One green hill under a wide sky, and a child on it.
 *
 *   0  A real question        a child on the hill under a wide, empty sky; a tree
 *   1  Real things unseen     wind: the tree bends, the grass leans, leaves fly;
 *                             the wind itself is never drawn
 *   2  In what he made        night, the sky full of stars, far hills
 *   3  He has spoken          morning; an open scroll on a flat rock
 *   4  God we could see       by a lake, a man among a crowd, a child beside him
 *   5  Enough light           night; a small gold lamp on the path, the hill dark
 *   6  Face to face           morning light from beyond the top; the child on the path
 *
 * God is never drawn: no figure, hand or face stands for him. The one mustard
 * mark is the lamp on the path.
 */
import type { ReactNode } from "react";
import { Shape } from "../../art";
import { Fade, type FilmDrawing } from "../motion";
import { Standing } from "./figures";

/** The hill, drawn 50 above the parts' own coordinates (they sit in a group raised by 50). */
const LAND = "M0,500V350C140,290 300,266 420,270C560,274 700,310 800,330V500Z";
const LAND_AT =
  "M0,550V400C140,340 300,316 420,320C560,324 700,360 800,380V550Z";
const SKY = "M0,0H800V330C700,310 560,274 420,270C300,266 140,290 0,350Z";
const PATH_A = "M40,500C90,450 150,400 238,342C254,332 268,326 284,322";
const PATH_B = "M104,500C144,456 196,410 262,356C276,346 292,338 312,332";

const STARS: [number, number][] = [
  [70, 60],
  [160, 120],
  [240, 40],
  [330, 96],
  [430, 50],
  [520, 130],
  [600, 64],
  [690, 110],
  [740, 40],
  [120, 200],
  [380, 190],
  [650, 210],
];
const star = (x: number, y: number) =>
  `M${x},${y - 8}L${x + 2},${y - 2}L${x + 8},${y}L${x + 2},${y + 2}L${x},${y + 8}L${x - 2},${y + 2}L${x - 8},${y}L${x - 2},${y - 2}Z`;

/** A part shown on a set of frames (the poster is -1). */
function On({ when, children }: { when: boolean; children: ReactNode }) {
  return (
    <g className={`mv-fade mv-from-none${when ? " is-on" : ""}`}>{children}</g>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const night = frame === 2 || frame === 5;
    const windy = frame === -1 || frame === 1;
    const morning = frame === 3 || frame === 6;
    return (
      <>
        {/* Night (2 and 5): the sky hatched dark, stars in it. */}
        <On when={night}>
          <path className="fp-dark" fill={h.h1} d={SKY} />
        </On>
        <On when={frame === 2}>
          {STARS.map(([x, y]) => (
            <path key={`${x}-${y}`} className="pl-o" d={star(x, y)} />
          ))}
          {/* Far hills under the stars, along the whole horizon. */}
          <Shape
            d="M0,290C100,240 200,236 300,256C420,214 560,216 680,244C730,232 770,232 800,240V400H0Z"
            tone="g"
            hatch={h.h2}
            off={2}
          />
        </On>
        <On when={frame === 5}>
          {STARS.slice(0, 6).map(([x, y]) => (
            <path key={`${x}-${y}`} className="pl-o" d={star(x, y)} />
          ))}
        </On>

        {/* Morning (3 and 6): light from beyond the top of the picture. */}
        <On when={morning}>
          <path
            className="pl-f"
            d="M400,0V46M360,0L378,40M440,0L422,40M316,0L350,34M484,0L450,34M276,0L322,26M524,0L478,26"
          />
        </On>

        {/* The hill. */}
        <Shape d={LAND} tone="g" off={3} />
        <path fill={h.h3} d="M0,452H800V500H0Z" />

        <g transform="translate(0 -50)">
          {/* 1. Wind: the grass leans the same way. */}
          <On when={windy}>
            <path
              className="pl-f"
              d="M60,404l10,-10M120,380l10,-10M190,360l10,-10M330,340l10,-10M380,344l10,-10M560,346l10,-10M620,356l10,-10M700,372l10,-10M250,400l10,-10M470,380l10,-10"
            />
          </On>

          {/* The tree: upright, or bent in the wind (the poster and 1). */}
          <On when={!windy}>
            <Shape
              d="M460,326C462,290 462,256 464,224H480C480,256 480,290 484,326Z"
              tone="c"
              off={1.5}
            />
            <Shape
              d="M416,206C408,160 446,132 474,140C506,128 540,156 530,196C542,226 508,246 480,236C450,248 418,236 416,206Z"
              tone="g"
              off={2}
            />
          </On>
          <On when={windy}>
            <Shape
              d="M460,326C466,290 478,262 500,234H514C494,262 482,290 484,326Z"
              tone="c"
              off={1.5}
            />
            <Shape
              d="M474,226C470,182 510,158 538,168C572,160 600,190 588,222C598,248 564,262 538,252C506,264 474,252 474,226Z"
              tone="g"
              off={2}
            />
            {/* Leaves blown past. */}
            {[
              [560, 170],
              [620, 210],
              [680, 150],
              [730, 230],
            ].map(([x, y]) => (
              <Shape
                key={x}
                d={`M${x},${y}c8,-8 18,-6 22,-2c-6,8 -16,8 -22,2Z`}
                tone="g"
                off={0.8}
              />
            ))}
          </On>

          {/* The child on the hill (the poster, 0 and 1). */}
          <On when={frame <= 1}>
            <Standing x={300} y={256} tone="c" s={1.1} />
          </On>

          {/* 3. Morning: an open scroll on a flat rock. */}
          <Fade frame={frame} on={3} off={4} from="up">
            <Shape
              d="M130,354C132,326 160,314 200,314C244,314 268,326 272,354Z"
              tone="b"
              off={1.5}
            />
            <path className="pl-o" d="M166,316V280H236V316Z" />
            <path className="pl-f" d="M174,290H228M174,298H222M174,306H226" />
            <Shape d="M154,320V276h13v44Z" tone="c" off={1} />
            <Shape d="M235,320V276h13v44Z" tone="c" off={1} />
          </Fade>

          {/* 4. By a lake: a man among a crowd, a child close beside him. */}
          <Fade frame={frame} on={4} off={5} from="up">
            <Shape
              d="M560,392C580,370 740,366 800,380V420C730,432 590,430 560,392Z"
              tone="b"
              off={2}
            />
            <path className="pl-f" d="M600,396h40M680,388h50M640,410h60" />
            <Standing x={196} y={268} tone="b" s={1.1} />
            <Standing x={250} y={262} tone="g" s={1.1} />
            <Standing x={330} y={241} tone="c" s={1.3} />
            <Standing x={368} y={278} tone="b" s={0.7} />
            <Standing x={410} y={252} tone="g" s={1.1} />
            <Standing x={540} y={262} tone="b" s={1.1} />
          </Fade>

          {/* 5 and 6: the path up the hill. */}
          <Fade frame={frame} on={5}>
            <path className="pl-l" d={PATH_A} />
            <path className="pl-l" d={PATH_B} />
          </Fade>

          {/* 5. Night on the hill: dark everywhere but round the lamp. */}
          <On when={frame === 5}>
            <path
              fill={h.h2}
              fillRule="evenodd"
              d={`${LAND_AT}M90,404a90,58 0 1,0 180,0a90,58 0 1,0 -180,0Z`}
            />
            <g transform="translate(180 412) scale(1.9) translate(-180 -412)">
              <path className="pl-m" d="M168,412h24l-4,-18h-16Z" />
              <path className="pl-l" d="M168,412h24l-4,-18h-16ZM172,394h16" />
              <path
                className="pl-f"
                d="M156,392l-12,-6M204,392l12,-6M180,382v-12"
              />
            </g>
          </On>

          {/* 6. Morning: the child on the path, near the top. */}
          <Fade frame={frame} on={6} from="up">
            <Standing x={262} y={262} tone="c" s={1.1} />
          </Fade>
        </g>
      </>
    );
  },
};

export default film;
