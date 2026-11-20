/**
 * "Does God still love me when I do wrong?": a good question, answered only
 * from the Study Bible's own pages, its notes on Luke 15 and its study of
 * love, and Jesus' story itself; no new argument. Grace without making sin
 * small, and no fear as a lever.
 *
 * One house on a hill with a road winding down from it into the distance.
 * The first picture is drawn on a page laid over it: a child on a doorstep.
 *
 *   0  A real question      (a page) a child alone on a step, a broken cup beside
 *   1  A son who left       the house, the road; a figure walks off to the far edge
 *   2  He came to his senses far off, the son sits by a trough where pigs feed
 *   3  The father ran       the father runs down the road; they meet on it
 *   4  Home                 the house lit, a robe, a table set for a feast
 *   5  Wrong still matters  an empty cross on a far hill in morning light
 *   6  Nothing can separate evening; father and son sit together at the door
 *
 * The one mustard mark: the lit window of the house. No face is drawn, and
 * God is never drawn: the father is the father in Jesus' story.
 */
import type { ReactNode } from "react";
import { Shape } from "../../art";
import { Fade, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

const ROAD =
  "M644,300C600,330 520,342 470,360C400,388 260,380 160,410C100,428 40,440 0,452";

/** A figure on the road, moving to where this frame puts it. */
function On({ to, children }: { to: [number, number]; children: ReactNode }) {
  return (
    <g
      className="mv-travel"
      style={{ transform: `translate(${to[0]}px, ${to[1]}px)` }}
    >
      {children}
    </g>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const evening = frame === -1 || frame === 0 || frame === 6;
    // The son leaving (1): from the door to the far edge of the road.
    const leaving: [number, number] = frame >= 1 ? [-560, 112] : [0, 0];
    // The father (3): from the door down the road to where they meet.
    const father: [number, number] = frame >= 3 ? [-262, 66] : [0, 0];
    // The son coming home (3): from far off up the road to the father.
    const coming: [number, number] = frame >= 3 ? [0, 0] : [-240, 30];
    const lit = frame === -1 || frame >= 4;
    return (
      <>
        {/* Evening (the poster, 0 and 6): a band of hatching across the sky. */}
        <g className={`mv-fade mv-from-none${evening ? " is-on" : ""}`}>
          <path className="fp-dark" fill={h.h1} d="M0,0H800V110H0Z" />
        </g>
        {/* 5. Morning: light from beyond the top over the far hill. */}
        <Fade frame={frame} on={5} off={6}>
          <path
            className="pl-f"
            d="M160,40l-10,-24M180,36l2,-28M200,40l12,-24M140,48l-22,-12M216,48l22,-14"
          />
        </Fade>

        {/* The land: a far hill on the left, the house's hill on the right, the road. */}
        <Shape
          d="M0,420C60,350 140,320 220,322C300,324 360,360 420,420Z"
          tone="g"
          off={3}
        />
        <path fill={h.h2} d="M220,322C300,324 360,360 420,420H260Z" />
        <Shape
          d="M440,420C500,320 560,300 640,296C720,292 770,320 800,330V420Z"
          tone="g"
          off={3}
        />
        <path className="pl-l" d="M0,420H800" />
        <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,450H800V500H0Z" />
        <path className="pl-f" d={ROAD} />
        <path
          className="pl-f"
          d="M660,300C620,338 540,352 490,372C420,400 280,394 180,424C120,442 60,454 0,466"
        />

        {/* 5. The far hill's empty cross, in morning light. */}
        <Fade frame={frame} on={5} off={6} from="up">
          <path className="pl-k" d="M176,324V244h8v80ZM158,268H202v7H158Z" />
        </Fade>

        {/* The house, its door, and its window (lit from 4, and in the poster). */}
        <Shape d="M590,300V240H700V300Z" tone="c" off={2} />
        <Shape d="M578,246L645,200L712,246Z" tone="b" off={2} />
        <path className="pl-paper" d="M632,300V266h24v34Z" />
        <path fill={h.hh} d="M632,300V266h24v34Z" />
        <path className="pl-l" d="M632,300V266h24v34Z" />
        <path className="pl-o" d="M670,256h18v16h-18Z" />
        <g className={`mv-fade mv-from-none${lit ? " is-on" : ""}`}>
          <path className="pl-m" d="M670,256h18v16h-18Z" />
        </g>
        <path className="pl-l" d="M670,256h18v16h-18ZM679,256v16M670,264h18" />

        {/* 1. The younger son walks off down the road to the far edge, a bag on his back. */}
        <Fade frame={frame} on={1} off={2}>
          <On to={leaving}>
            <Standing x={640} y={274} tone="c" s={0.7} />
            <Shape
              d="M648,290c8,-2 12,4 10,12c-6,2 -10,0 -10,-12Z"
              tone="b"
              off={0.8}
            />
          </On>
        </Fade>

        {/* 2. Far off: pigs at a trough, and the son sitting alone beside it. */}
        <Fade frame={frame} on={2} off={3} from="up">
          <Shape d="M60,420V406H200V420Z" tone="c" off={1.5} />
          {[
            [86, 400],
            [128, 398],
            [170, 402],
            [236, 410],
          ].map(([x, y]) => (
            <g key={x}>
              <path
                className="pl-l"
                d={`M${x - 10},${y + 8}v8M${x + 8},${y + 8}v8`}
              />
              <Shape
                d={`M${x - 18},${y}c0,-12 34,-12 34,0c0,10 -34,10 -34,0Z`}
                tone="c"
                off={1}
              />
              <path className="pl-l" d={`M${x + 16},${y - 2}h6v6h-6`} />
            </g>
          ))}
          <g transform="translate(300 400) scale(1.3) translate(-300 -400)">
            <Seated x={300} y={372} tone="c" body={40} />
          </g>
        </Fade>

        {/* 3. The father runs down the road; the son comes up it; they meet. */}
        <Fade frame={frame} on={3} off={4}>
          <On to={father}>
            <Standing x={640} y={272} tone="b" s={0.9} />
            <path className="pl-l" d="M628,292l-14,-10M652,292l14,-10" />
          </On>
          <On to={coming}>
            <Standing x={404} y={340} tone="c" s={0.8} />
          </On>
        </Fade>

        {/* 4. Home: the son at the door in a new robe, a table set for a feast. */}
        <Fade frame={frame} on={4} off={5} from="up">
          <Standing x={644} y={258} tone="b" s={0.7} />
          <Shape d="M480,348H600V358H480Z" tone="c" off={1.5} />
          <path className="pl-l" d="M492,358V380M588,358V380" />
          <Shape d="M500,348c0,-8 16,-8 16,0Z" tone="c" off={0.8} />
          <Shape d="M530,348c0,-10 22,-10 22,0Z" tone="b" off={0.8} />
          <Shape d="M566,348c0,-8 16,-8 16,0Z" tone="c" off={0.8} />
          <Standing x={470} y={318} tone="g" s={0.8} />
          <Standing x={612} y={318} tone="c" s={0.8} />
        </Fade>

        {/* 6. Evening: the father and the son sit together at the lit door. */}
        <Fade frame={frame} on={6} from="up">
          <Seated x={618} y={290} tone="b" body={22} />
          <Seated x={666} y={292} tone="c" body={20} />
        </Fade>

        {/* 0. A page laid over the land: a child alone on a doorstep, a broken cup. */}
        <Fade frame={frame} on={0} off={1}>
          <path className="pl-paper" d="M0,0H800V500H0Z" />
          <path className="fp-dark" fill={h.h1} d="M0,0H800V110H0Z" />
          <Shape d="M420,420V90H760V420Z" tone="c" off={3} />
          <path className="pl-paper" d="M520,400V170h140v230Z" />
          <path fill={h.hh} d="M520,400V170h140v230Z" />
          <path className="pl-l" d="M520,400V170h140v230Z" />
          <Shape d="M440,420V400H740V420Z" tone="b" off={2} />
          <path className="pl-l" d="M0,420H800" />
          <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
          <g transform="translate(470 400) scale(2.2) translate(-470 -400)">
            <Seated x={470} y={364} tone="c" body={36} />
          </g>
          <Shape d="M280,420l-8,-44h40l-4,20Z" tone="b" off={1.5} />
          <Shape d="M330,420l4,-28l28,-4l8,32Z" tone="b" off={1.5} />
          <path className="pl-f" d="M314,410l10,-8M318,420l12,0" />
        </Fade>
      </>
    );
  },
};

export default film;
