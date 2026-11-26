/**
 * "2 Corinthians: power in weakness": a film for one whole book, from the
 * book's own page (bible/notes/2-corinthians/intro.json) and its chapter
 * notes.
 *
 *   0  A hurt pastor's letter        Paul on the harbour wall, waiting
 *   1  How it is laid out            three parts
 *   2  Treasure in jars of clay      a plain jar with light inside
 *   3  Made friends again            two men embracing at a gate
 *   4  The grace of giving           gifts put into an open chest
 *   5  Power in weakness             a basket lowered from a window at night
 *   6  Where to start                the reader and the open scroll
 *
 * No beating, shipwreck or wound is drawn: Paul's hardships are named in
 * the older captions only. Christ and God are never drawn. The rival
 * teachers are not drawn. The one mustard mark: the rule under the last
 * part (1), the light in the jar (2), the sun (3), the coin (4), the lamp
 * (5), the marker (6); the harbour (0) has none.
 */
import {
  Boat,
  CityWall,
  Grass,
  Hills,
  Ink,
  Jar,
  Lamp,
  Person,
  Stars,
  Sun,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The ministry and the friendship (1 to 7), the collection (8 and 9), the fool's speech (10 to 13). */
export const LAYOUT = [7, 2, 4];

const Paul = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "reach" | "sit" | "open";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="g"
    head="bare"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 320, 1.12],
  [400, 330, 1.12],
  [400, 330, 1.12],
  [400, 300, 1.08],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Paul on the harbour wall, waiting for Titus. */}
      <FirstScene frame={frame}>
        <Hills
          y={250}
          peaks={[
            [620, 40],
            [760, 30],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <path className="pl-paper" d="M-10,250H810V420H-10Z" />
        <Ambient frame={frame} on={-1} off={1} kind="drift">
          <Water x={0} y={280} w={800} rows={6} gap={22} />
        </Ambient>
        <Fade frame={frame} on={-1} off={1} from="right" at={3}>
          <Boat x={560} y={330} s={1} face={-1} />
        </Fade>
        <Ink d="M-10,510V400H340V420H810V510Z" tone="c" hatch={h.h3} />
        <path className="pl-f" d="M0,440H800M60,400V510M160,400V510M260,400V510" />
        <Paul x={240} y={400} s={1.6} face={1} />
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={2}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <Jar x={mid} y={top} s={0.6} />
            ) : i === 1 ? (
              <Ink d={`M${mid - 16},${top}v-18h32v18ZM${mid - 18},${top - 18}h36v-6h-36Z`} tone="c" />
            ) : (
              <path
                className="pl-l"
                d={`M${mid},${top - 40}V${top - 18}M${mid - 12},${top - 18}h24c0,14 -24,14 -24,0Z`}
              />
            )
          }
        />
      </Scene>

      {/* 2. A plain clay jar, with light inside. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,-10H810V380H-10Z" tone="c" hatch={h.h3} />
        <Ink d="M-10,510V380H810V510Z" tone="b" />
        <Ink d="M220,380H580V396H220Z" tone="c" />
        <path className="pl-l" d="M240,396V470M560,396V470" />
        <Jar x={400} y={380} s={2.4} tone="c" />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <path className="pl-m" d="M384,250l-30,-80h92l-30,80Z" />
          </Ambient>
          <path className="pl-f" d="M384,250l-30,-80M416,250l30,-80M400,250V160" />
        </Fade>
      </Scene>

      {/* 3. Two men embracing at a gate. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={2}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={400} y={230} r={40} gold />
          </Ambient>
        </Fade>
        <Hills
          y={300}
          peaks={[
            [160, 60],
            [660, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V340C240,330 560,330 810,340V510Z" tone="g" />
        <Ink d="M120,470V300H170V470ZM630,470V300H680V470Z" tone="c" />
        <path className="pl-l" d="M110,300H190M620,300H690" />
        <Paul x={360} y={470} s={1.7} pose="reach" />
        <Fade frame={frame} on={3} off={4} from="right" at={4}>
          <Person x={440} y={470} s={1.7} face={-1} pose="reach" robe="c" cloak="b" head="cloth" />
        </Fade>
      </Scene>

      {/* 4. Gifts put into an open chest. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V390H-10Z" tone="c" hatch={h.h3} />
        <Ink d="M-10,510V390H810V510Z" tone="b" />
        <Ink d="M340,470V410H460V470Z" tone="c" hatch={h.h2} />
        <path className="pl-l" d="M336,410H464M340,410L360,380H440L460,410" />
        <Person x={240} y={474} s={1.6} pose="reach" robe="g" cloak="c" head="veil" />
        <Person x={560} y={474} s={1.6} face={-1} pose="reach" robe="p" head="cloth" />
        <Fade frame={frame} on={4} off={5} from="right" at={4}>
          <Person x={640} y={478} s={1} face={-1} pose="reach" robe="b" child head="bare" />
          <path className="pl-m" d="M602,420a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
          <path className="pl-f" d="M602,420a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
        </Fade>
      </Scene>

      {/* 5. A basket lowered from a window at night. */}
      <Scene frame={frame} k={5}>
        <Ink d="M-10,-10H810V510H-10Z" tone="b" hatch={h.hs} />
        <Stars
          at={[
            [90, 60, 5],
            [640, 70, 5],
            [740, 140, 4],
          ]}
        />
        <CityWall x={300} y={510} w={440} s={3.4} tone="c" hatch={h.h3} gate={false} />
        <path className="pl-paper" d="M280,330h40v40h-40Z" />
        <Ambient frame={frame} on={5} off={6} kind="flicker">
          <Lamp x={300} y={368} s={0.9} gold />
        </Ambient>
        <path className="pl-l" d="M310,370V430" />
        <Fade frame={frame} on={5} off={6} from="up" at={3}>
          <Ink d="M286,430h48l-6,34h-36Z" tone="g" />
          <path className="pl-f" d="M288,440h44M290,450h40" />
          <Person x={310} y={442} s={0.6} robe="b" cloak="g" head="bare" />
        </Fade>
        <Grass
          at={[
            [600, 490],
            [700, 496],
          ]}
        />
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
