/**
 * "Ephesians: one new people in Christ": a film for one whole letter, from
 * the book's own page (bible/notes/ephesians/intro.json) and its chapter
 * notes.
 *
 *   0  A letter from prison   Paul writing by a barred window, a guard at rest
 *   1  How it is laid out     five parts, the walk marked where it begins
 *   2  Grace                  empty hands held open at sunrise
 *   3  One new people         a wall broken through, two groups meeting
 *   4  A worthy walk          a street of ordinary kindness
 *   5  Stand firm             a man in God's armor standing in the wind
 *   6  Where to start         the reader and the open scroll
 *
 * The household passages (5:21 to 6:9) are named in words, with the book
 * page's own care, and never drawn: no husband and wife, no master and
 * slave. God is not drawn. The one mustard mark: the light in the window
 * (0), the rule (1), the sun (2, 4), a lamp (3), the light in the clouds
 * (5), the marker (6).
 */
import {
  Cloud,
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Scroll,
  Sun,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The book page's parts, by chapters: 1; 2; 3; 4 and 5; 6. */
export const LAYOUT = [1, 1, 1, 2, 1];

const Paul = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "sit" | "hold";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="c"
    head="bare"
  />
);

const CAMERA: [number, number, number][] = [
  [420, 300, 1.12],
  [400, 250, 1.06],
  [400, 300, 1.1],
  [400, 320, 1.1],
  [400, 320, 1.1],
  [400, 300, 1.1],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A stone room, a barred window, the letter. */}
      <FirstScene frame={frame}>
        <Ink d="M-10,-10H810V420H-10Z" tone="c" hatch={h.hs} />
        <path className="pl-f" d="M0,120H800M0,240H800M0,360H800M120,0V120M360,0V120M600,0V120M240,120V240M480,120V240M720,120V240M120,240V360M360,240V360M600,240V360" />
        <Ambient frame={frame} on={-1} off={1} kind="glow">
          <path className="pl-m" d="M300,110H420V200H300Z" />
        </Ambient>
        <path className="pl-l" d="M300,110H420V200H300ZM330,110V200M360,110V200M390,110V200" />
        {/* The light falling from the window. */}
        <path className="pl-f" d="M300,200L250,420M420,200L470,420" />
        <Ink d="M-10,510V420H810V510Z" tone="b" />
        <Paul x={360} y={466} s={1.7} pose="sit" />
        <Scroll x={400} y={430} s={0.8} />
        {/* The doorway, and a guard resting by it. */}
        <path className="pl-paper" d="M620,420V250C620,220 700,220 700,250V420Z" />
        <path fill={h.h2} d="M620,420V250C620,220 700,220 700,250V420Z" />
        <path className="pl-l" d="M620,420V250C620,220 700,220 700,250V420Z" />
        <Person x={740} y={470} s={1.5} face={-1} robe="g" cloak="b" head="helmet" staff="spear" />
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
              <path className="pl-l" d={`M${mid - 10},${top}V${top - 30}M${mid + 10},${top}V${top - 30}M${mid - 16},${top - 26}l6,-8M${mid + 16},${top - 26}l-6,-8`} />
            ) : i === 1 ? (
              <Ink d={`M${mid - 34},${top}v-24h26v24ZM${mid + 8},${top}v-24h26v24Z`} tone="c" />
            ) : i === 2 ? (
              <Lamp x={mid} y={top - 4} s={0.8} />
            ) : i === 3 ? (
              <path className="pl-f" d={`M${mid - 40},${top}C${mid - 10},${top - 10} ${mid + 10},${top - 22} ${mid + 40},${top - 30}`} />
            ) : (
              <Ink d={`M${mid - 16},${top - 36}h32v14c0,14 -16,22 -16,22c0,0 -16,-8 -16,-22Z`} tone="b" />
            )
          }
        />
      </Scene>

      {/* 2. Grace: empty hands held open at sunrise. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={3}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={560} y={260} r={32} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [420, 40],
            [700, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C200,360 500,370 810,390V510Z" tone="c" />
        <Person x={330} y={466} s={2} pose="kneel" face={1} robe="g" cloak="b" head="cloth" />
      </Scene>

      {/* 3. The dividing wall, broken through. */}
      <Scene frame={frame} k={3}>
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <Ink d="M-10,380V180H330L350,230L340,380Z" tone="b" hatch={h.hs} />
        <Ink d="M810,380V180H470L452,240L462,380Z" tone="b" hatch={h.hs} />
        <path className="pl-f" d="M0,230H330M0,280H340M0,330H340M470,230H800M462,280H800M462,330H800" />
        {/* Fallen stones in the gap. */}
        <Ink d="M360,380l10,-26h34l8,26Z" tone="b" />
        <Ink d="M420,380l4,-18h26l4,18Z" tone="b" />
        <Fade frame={frame} on={3} off={4} from="grow" at={6}>
          <Ambient frame={frame} on={3} off={4} kind="flicker">
            <Lamp x={388} y={350} s={1} gold />
          </Ambient>
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" at={2}>
          <Person x={210} y={470} s={1.4} pose="walk" robe="c" cloak="g" head="cloth" />
          <Person x={290} y={480} s={1.5} pose="reach" robe="b" head="veil" />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="right" at={2}>
          <Person x={510} y={480} s={1.5} pose="reach" face={-1} robe="p" cloak="b" head="bare" />
          <Person x={600} y={470} s={1.4} pose="walk" face={-1} robe="g" head="veil" />
          <Person x={660} y={476} s={0.9} pose="walk" face={-1} robe="c" child />
        </Fade>
      </Scene>

      {/* 4. A street of ordinary kindness. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} at={3}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={640} y={80} r={26} gold />
          </Ambient>
        </Fade>
        <House x={110} y={360} s={1.2} hatch={h.h3} />
        <House x={330} y={350} s={1} tone="b" hatch={h.h3} />
        <House x={560} y={360} s={1.1} tone="g" hatch={h.h3} />
        <Ink d="M-10,510V360H810V510Z" tone="c" />
        <Person x={90} y={470} s={1.4} pose="reach" robe="b" head="veil" />
        <Ink d="M134,412c0,-10 22,-10 22,0Z" tone="c" />
        <Person x={180} y={474} s={1.3} face={-1} robe="g" cloak="c" head="bare" />
        <Person x={350} y={476} s={1.5} pose="open" robe="p" cloak="g" head="cloth" />
        <Person x={440} y={476} s={1.5} pose="open" face={-1} robe="c" cloak="b" head="cloth" />
        <Person x={650} y={470} s={1.4} pose="walk" robe="g" head="cloth" staff="staff" />
      </Scene>

      {/* 5. Standing firm in the armor God gives. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={3}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={400} y={110} r={30} gold />
          </Ambient>
        </Fade>
        <Ambient frame={frame} on={5} off={6} kind="drift">
          <Cloud x={300} y={120} s={1.8} />
          <Cloud x={520} y={110} s={1.6} />
        </Ambient>
        <path className="pl-f" d="M60,220h120M90,250h160M40,290h110M600,230h140M640,270h120" />
        <Ink d="M220,510C240,440 300,410 400,404C500,410 560,440 580,510Z" tone="b" hatch={h.hs} />
        <Person x={400} y={410} s={2} robe="g" cloak="b" head="helmet" />
        {/* The shield on his arm, and the belt. */}
        <Ink d="M412,300h40v40c0,22 -20,34 -20,34c0,0 -20,-12 -20,-34Z" tone="c" />
        <path className="pl-l" d="M382,340H418" />
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
