/**
 * "Leviticus: living near a holy God": a film for one whole book, from the
 * book's own page (bible/notes/leviticus/intro.json) and its chapter notes.
 *
 *   0  The question it answers   the tent in the middle of the camp
 *   1  How it is laid out        six parts, the Day of Atonement at the center
 *   2  Gifts brought near        flour held out at the tent's entrance
 *   3  Holy and clean            washing at evening by a tent
 *   4  The Day of Atonement      the priest in plain linen before the curtain
 *   5  Love your neighbor        the edges of a field left for the poor
 *   6  Where to start            the reader and the open scroll
 *
 * No animal, altar fire or blood is drawn anywhere: the offerings are named
 * in the captions, and the one gift drawn is flour. No body is drawn as
 * unclean, ill or marked. God is never drawn: the light over the tent and
 * the line of light at the curtain have no one in them. The one mustard
 * mark: the light over the tent (0), the rule under the center (1), the sun
 * (3, 5), the light at the curtain (4), the marker (6); the entrance (2)
 * has none.
 */
import {
  Cloud,
  Grass,
  Hills,
  Ink,
  Jar,
  Lamp,
  Person,
  Sun,
  Tent,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Offerings (1-7), priests (8-10), clean and unclean (11-15), the Day (16), holiness (17-26), vows (27). */
export const LAYOUT = [7, 3, 5, 1, 10, 1];

/** A basin of water on its stand. */
const Basin = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <>
    <Ink
      d={`M${x - 30 * s},${y - 40 * s}c0,${20 * s} ${60 * s},${20 * s} ${60 * s},0Z`}
      tone="c"
    />
    <path
      className="pl-l"
      d={`M${x},${y - 30 * s}V${y}M${x - 16 * s},${y}H${x + 16 * s}`}
    />
    <path className="pl-f" d={`M${x - 20 * s},${y - 36 * s}h${40 * s}`} />
  </>
);

const CAMERA: [number, number, number][] = [
  [400, 300, 1.08],
  [400, 250, 1.06],
  [400, 320, 1.12],
  [400, 330, 1.12],
  [400, 300, 1.1],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The tent in the middle of the camp. */}
      <FirstScene frame={frame}>
        <Hills
          y={300}
          peaks={[
            [160, 60],
            [640, 80],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V320C240,312 560,312 810,320V510Z" tone="c" />
        <Tent x={110} y={380} s={0.6} hatch={h.h3} />
        <Tent x={230} y={360} s={0.5} tone="b" hatch={h.h3} />
        <Tent x={600} y={362} s={0.5} hatch={h.h3} />
        <Tent x={710} y={384} s={0.6} tone="b" hatch={h.h3} />
        <Tent x={160} y={470} s={0.7} hatch={h.h3} />
        <Tent x={660} y={474} s={0.7} hatch={h.h3} />
        {/* The courtyard's fence, and the tent of meeting in it. */}
        <path className="pl-l" d="M260,440V400H540V440M260,420H540" />
        <Tent x={400} y={420} s={1.6} tone="b" hatch={h.h3} />
        <Fade frame={frame} on={-1} off={1} at={3}>
          <Ambient frame={frame} on={0} off={1} kind="glow">
            <path
              className="pl-m"
              d="M340,250c0,-22 30,-30 44,-18c10,-18 44,-16 50,4c22,-4 34,20 18,32c-24,8 -92,8 -112,-18Z"
            />
          </Ambient>
          <path
            className="pl-f"
            d="M340,250c0,-22 30,-30 44,-18c10,-18 44,-16 50,4c22,-4 34,20 18,32c-24,8 -92,8 -112,-18Z"
          />
        </Fade>
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={3}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <Ink d={`M${mid - 18},${top - 18}h36l-6,18h-24Z`} tone="c" />
            ) : i === 1 ? (
              <Lamp x={mid - 4} y={top} s={0.8} />
            ) : i === 2 ? (
              <Ink d={`M${mid - 16},${top - 18}c0,14 32,14 32,0Z`} tone="b" />
            ) : i === 3 ? (
              <path
                className="pl-l"
                d={`M${mid - 8},${top}V${top - 34}H${mid + 8}V${top}M${mid},${top}V${top - 34}`}
              />
            ) : i === 4 ? (
              <>
                <Wheat x={mid - 8} y={top} s={0.8} />
                <Wheat x={mid + 8} y={top} s={0.8} />
              </>
            ) : (
              <Jar x={mid} y={top} s={0.5} />
            )
          }
        />
      </Scene>

      {/* 2. Flour held out at the entrance of the tent. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,-10H810V380H-10Z" tone="c" hatch={h.h3} />
        <path className="pl-paper" d="M520,380V150H700V380Z" />
        <path className="pl-l" d="M520,380V150H700V380M520,150L610,110L700,150" />
        <Ink d="M-10,510V380H810V510Z" tone="g" />
        <Person x={600} y={470} s={1.7} face={-1} robe="p" cloak="c" head="cloth" />
        <Fade frame={frame} on={2} off={3} from="left" at={3}>
          <Person x={400} y={474} s={1.6} pose="reach" robe="g" cloak="b" head="veil" />
          <Ink d="M452,382c0,12 30,12 30,0Z" tone="c" />
          <path className="pl-f" d="M454,380c6,-6 20,-6 26,0" />
        </Fade>
      </Scene>

      {/* 3. Washing at evening by the tent. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={2}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={660} y={250} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={320}
          peaks={[
            [520, 50],
            [760, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V360C240,350 560,350 810,360V510Z" tone="c" />
        <Tent x={190} y={440} s={1.5} hatch={h.h3} />
        <Basin x={440} y={470} s={1.3} />
        <Person x={370} y={474} s={1.6} pose="reach" robe="g" cloak="c" head="veil" />
        <Grass
          at={[
            [560, 470],
            [80, 480],
          ]}
        />
      </Scene>

      {/* 4. The priest in plain linen before the curtain. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V420H-10Z" tone="c" hatch={h.h3} />
        <Ink d="M300,420V90H700V420Z" tone="b" hatch={h.h2} />
        <path className="pl-l" d="M300,90H700M380,90V420M460,90V420M540,90V420M620,90V420" />
        <Fade frame={frame} on={4} off={5} from="grow" at={4}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <path className="pl-m" d="M694,100h8v316h-8Z" />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V420H810V510Z" tone="g" />
        <Person x={220} y={476} s={1.8} robe="p" head="cloth" />
        <Fade frame={frame} on={4} off={5} at={6}>
          <Ambient frame={frame} on={4} off={5} kind="drift">
            <Cloud x={270} y={300} s={1.6} />
          </Ambient>
        </Fade>
      </Scene>

      {/* 5. The edges of the field left for the poor. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={3}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={640} y={96} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [180, 50],
            [560, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C240,370 560,370 810,380V510Z" tone="c" />
        {/* The reaped middle, short stubble. */}
        <path className="pl-f" d="M200,430l4,-8M240,440l4,-8M300,430l4,-8M360,444l4,-8M420,432l4,-8M480,442l4,-8M540,430l4,-8" />
        <Ambient frame={frame} on={5} off={6} kind="sway">
          <Wheat x={40} y={440} s={1.3} />
          <Wheat x={90} y={450} s={1.2} />
          <Wheat x={140} y={440} s={1.3} />
          <Wheat x={660} y={444} s={1.3} />
          <Wheat x={710} y={452} s={1.2} />
          <Wheat x={760} y={442} s={1.3} />
        </Ambient>
        <Fade frame={frame} on={5} off={6} from="left" at={4}>
          <Person x={200} y={486} s={1.5} pose="bow" robe="g" cloak="b" head="veil" />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="right" at={6}>
          <Person
            x={600}
            y={484}
            s={1.6}
            face={-1}
            pose="reach"
            robe="c"
            head="cloth"
            staff="staff"
            bundle
          />
        </Fade>
      </Scene>

      {/* 6. Where to start reading. */}
      <Scene frame={frame} k={6}>
        <Sun x={130} y={100} r={24} />
        <Hills
          y={380}
          peaks={[
            [200, 40],
            [520, 20],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <StartReading frame={frame} k={6} hatch={h.h2} />
      </Scene>
    </>
  ),
};

export default film;
