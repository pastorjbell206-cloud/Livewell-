/**
 * "James: faith that works": a film for one whole letter, from the book's
 * own page (bible/notes/james/intro.json) and its chapter notes.
 *
 *   0  Sharp, practical sayings      a cloak and a loaf handed out at a door
 *   1  How it is laid out            five chapters, faith and deeds marked
 *   2  Trials that make you whole    a young tree holding fast in the wind
 *   3  Faith that is alive           a kind word, and a cloak given
 *   4  The poor and the rich         the poor man led to the best seat
 *   5  The power of words            one speaks, one listens
 *   6  Where to start                the reader and the open scroll
 *
 * Nothing is drawn against Paul or for one reading of 2:24: the pictures
 * show only what James describes, faith that acts. No rich man is drawn as
 * a caricature, and no forest on fire. The one mustard mark: a lamp (0, 3,
 * 4, 5), the rule (1), the sun (2), the marker (6).
 */
import { Cloud, Hills, House, Ink, Lamp, Person, Sun } from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Five chapters, as the book page's parts fall: 1; 2; 3; 4 to 5:6; 5:7 to 20, by chapters. */
export const LAYOUT = [1, 1, 1, 1, 1];

const CAMERA: [number, number, number][] = [
  [420, 320, 1.12],
  [400, 250, 1.06],
  [400, 300, 1.1],
  [400, 320, 1.12],
  [400, 320, 1.1],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A cloak and a loaf handed out at the door. */}
      <FirstScene frame={frame}>
        <Cloud x={600} y={90} s={1.2} />
        <House x={300} y={420} s={2.4} hatch={h.h3} />
        <Ambient frame={frame} on={-1} off={1} kind="flicker">
          <Lamp x={300} y={300} s={1.2} gold />
        </Ambient>
        <Ink d="M-10,510V420H810V510Z" tone="c" />
        <Person x={330} y={476} s={1.6} pose="reach" robe="g" cloak="c" head="cloth" />
        <Ink d="M380,400c10,-6 30,-6 34,6l-4,36h-26Z" tone="b" />
        <Person x={500} y={480} s={1.5} face={-1} robe="p" head="bare" />
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={1}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <path className="pl-l" d={`M${mid - 30},${top - 6}q8,-16 16,0t16,0t16,0t16,0`} />
            ) : i === 1 ? (
              <path className="pl-l" d={`M${mid - 18},${top - 6}c10,6 26,6 36,0M${mid - 18},${top - 6}l-4,-18M${mid - 8},${top - 4}l-2,-24M${mid + 2},${top - 4}l0,-26M${mid + 12},${top - 4}l2,-24M${mid + 18},${top - 6}l6,-12`} />
            ) : i === 2 ? (
              <path className="pl-l" d={`M${mid},${top}C${mid - 10},${top - 6} ${mid - 8},${top - 18} ${mid},${top - 28}C${mid + 8},${top - 18} ${mid + 10},${top - 6} ${mid},${top}Z`} />
            ) : i === 3 ? (
              <path className="pl-f" d={`M${mid - 30},${top - 10}h60M${mid - 22},${top - 20}h44M${mid - 26},${top - 30}h50`} />
            ) : (
              <path className="pl-l" d={`M${mid},${top}V${top - 26}M${mid},${top - 14}c-10,-2 -14,-10 -12,-16M${mid},${top - 18}c10,-2 14,-10 12,-16`} />
            )
          }
        />
      </Scene>

      {/* 2. A young tree holding fast in the wind. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={4}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={620} y={110} r={28} gold />
          </Ambient>
        </Fade>
        <Cloud x={500} y={100} s={1.6} />
        <Cloud x={720} y={140} s={1.2} />
        <path className="pl-f" d="M40,180h150M80,220h170M30,260h120" />
        <Hills
          y={420}
          peaks={[
            [380, 140],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ambient frame={frame} on={2} off={3} kind="sway">
          <path className="pl-l" d="M380,290C384,240 400,200 430,170M400,224C420,214 440,214 456,222M392,256C372,246 352,246 340,252" />
          <Ink d="M430,170c18,-22 54,-18 60,6c-8,22 -44,26 -60,-6Z" tone="g" />
          <Ink d="M456,222c14,-12 36,-6 38,10c-10,12 -30,10 -38,-10Z" tone="g" />
          <Ink d="M340,252c-14,-12 -36,-6 -38,10c10,12 30,10 38,-10Z" tone="g" />
        </Ambient>
        <path className="pl-l" d="M380,290C370,310 350,320 330,330M380,290C392,312 414,320 436,326M380,290V330" />
        <Ink d="M-10,510V440H810V510Z" tone="c" />
      </Scene>

      {/* 3. A kind word, and a cloak given. */}
      <Scene frame={frame} k={3}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.hs} />
        <path className="pl-f" d="M0,140H800M0,270H800M160,0V140M420,0V140M680,0V140M280,140V270M560,140V270" />
        <Fade frame={frame} on={3} off={4} from="grow" at={4}>
          <Ambient frame={frame} on={3} off={4} kind="flicker">
            <Lamp x={420} y={200} s={1.3} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <Person x={130} y={480} s={1.5} pose="walk" robe="c" cloak="g" head="cloth" />
        <Person x={420} y={474} s={1.5} pose="sit" robe="p" head="bare" face={1} />
        <Person x={530} y={478} s={1.6} pose="kneel" face={-1} robe="g" cloak="b" head="cloth" />
        <Ink d="M440,420c20,-10 50,-6 56,10l-6,36h-40Z" tone="b" />
      </Scene>

      {/* 4. The poor man led to the best seat. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.hs} />
        <Fade frame={frame} on={4} off={5} from="grow" at={4}>
          <Ambient frame={frame} on={4} off={5} kind="flicker">
            <Lamp x={600} y={240} s={1.3} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        {/* The best seat, by the lamp. */}
        <Ink d="M560,440V380h80v60ZM556,440h88v10h-88Z" tone="g" />
        <Person x={510} y={476} s={1.5} pose="reach" face={1} robe="c" cloak="g" head="cloth" />
        <Person x={430} y={478} s={1.5} pose="walk" face={1} robe="p" head="bare" />
        <Person x={170} y={476} s={1.4} pose="open" face={1} robe="b" cloak="c" head="veil" />
        <Person x={260} y={480} s={1.4} face={1} robe="g" head="cloth" />
      </Scene>

      {/* 5. One speaks, one listens. */}
      <Scene frame={frame} k={5}>
        <Hills
          y={360}
          peaks={[
            [160, 30],
            [620, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <Ink d="M250,450h300v12h-300ZM270,462v20M530,462v20" tone="b" />
        <Person x={330} y={450} s={1.6} pose="sit" face={1} robe="b" cloak="g" head="cloth" />
        <Person x={470} y={450} s={1.6} pose="sit" face={-1} robe="c" head="veil" />
        <Fade frame={frame} on={5} off={6} from="grow" at={5}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Lamp x={620} y={470} s={1.1} gold />
          </Ambient>
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
