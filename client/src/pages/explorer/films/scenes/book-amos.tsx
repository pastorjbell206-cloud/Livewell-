/**
 * "Amos: let justice roll on like a river": a film for one whole book, from
 * the book's own page (bible/notes/amos/intro.json) and its chapter notes.
 *
 *   0  A herdsman sent north        Amos and his flock, the rich city beyond
 *   1  How it is laid out           the nations, the sermons, the visions
 *   2  The trap                     the poor sold for a pair of sandals
 *   3  Justice like a river         a river running strong through the land
 *   4  The plumb line               a plumb line beside a leaning wall
 *   5  The fallen tent restored     vines planted, a wall rebuilt
 *   6  Where to start               the reader and the open scroll
 *
 * No war, crime or ruin is drawn: the nations' cruelties and the judgments
 * are left to the captions and the book page. God is never drawn. No one of
 * any later age, party or nation is pictured. Amos has the same robe, cloak
 * and staff in each picture he is in. The one mustard mark: the rule under
 * the sermons (1), the sandals (2), the sun (3), the plumb weight (4), the
 * grapes (5), the marker (6); the hill road (0) has none.
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Person,
  Sheep,
  Sun,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The nations (1 and 2), the sermons (3 to 6), the visions (7 to 9). */
export const LAYOUT = [2, 4, 3];

const Amos = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    robe="g"
    cloak="c"
    head="cloth"
    staff="crook"
  />
);

/** A young vine on its stake. */
const Vine = ({ x, y }: { x: number; y: number }) => (
  <>
    <path className="pl-l" d={`M${x},${y}V${y - 40}`} />
    <Ink
      d={`M${x - 14},${y - 30}c0,-10 14,-14 14,-4c0,-10 14,-6 14,4c-6,6 -22,6 -28,0Z`}
      tone="g"
    />
  </>
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 330, 1.12],
  [400, 300, 1.06],
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
      {/* 0 (and the poster). Amos and his flock; the rich city beyond. */}
      <FirstScene frame={frame}>
        <Sun x={120} y={90} r={22} />
        <Hills
          y={300}
          peaks={[
            [580, 110],
            [760, 70],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <House x={540} y={210} s={0.6} hatch={h.h3} />
        <House x={610} y={198} s={0.7} tone="b" hatch={h.h3} />
        <House x={690} y={214} s={0.6} hatch={h.h3} />
        <Ink d="M-10,510V330C240,320 560,330 810,360V510Z" tone="g" />
        <path className="pl-f" d="M0,470C200,440 360,400 520,360" />
        <Amos x={300} y={452} s={1.7} />
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Sheep x={180} y={470} s={0.9} />
          <Sheep x={110} y={480} s={0.8} graze />
          <Sheep x={400} y={460} s={0.8} face={-1} graze />
        </Ambient>
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
              <Ink
                d={`M${mid - 30},${top}v-24h4v-4h4v4h4v-4h4v28ZM${mid + 14},${top}v-24h4v-4h4v4h4v-4h4v28Z`}
                tone="c"
              />
            ) : i === 1 ? (
              <path
                className="pl-l"
                d={`M${mid - 40},${top - 8}q10,-8 20,0t20,0t20,0t20,0M${mid - 40},${top - 20}q10,-8 20,0t20,0t20,0t20,0`}
              />
            ) : (
              <path className="pl-l" d={`M${mid},${top - 36}V${top - 10}M${mid - 5},${top - 10}h10l-5,8Z`} />
            )
          }
        />
      </Scene>

      {/* 2. At the gate: a pair of sandals held out to a poor man. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,410V110H810V410Z" tone="c" hatch={h.hs} />
        <path className="pl-paper" d="M300,410V220C300,160 500,160 500,220V410Z" />
        <path className="pl-l" d="M300,410V220C300,160 500,160 500,220V410M-10,110H810" />
        <Ink d="M-10,510V410H810V510Z" tone="b" />
        <Person x={330} y={476} s={1.7} pose="reach" robe="p" cloak="g" head="cloth" />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <path className="pl-m" d="M386,370h22v8h-22ZM390,382h22v8h-22Z" />
          <path className="pl-f" d="M386,370h22v8h-22ZM390,382h22v8h-22Z" />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="right" at={5}>
          <Person x={520} y={480} s={1.5} face={-1} pose="bow" robe="c" head="bare" />
        </Fade>
        <Person x={680} y={476} s={1.4} face={-1} pose="sit" robe="b" cloak="c" head="cloth" />
      </Scene>

      {/* 3. A river running strong through the land. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={2}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={640} y={96} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={260}
          peaks={[
            [200, 60],
            [600, 70],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V270H810V510Z" tone="g" />
        <Ink d="M330,270C360,330 300,400 160,510H420C520,400 460,330 410,270Z" tone="b" />
        <path className="pl-l" d="M330,270C360,330 300,400 160,510M410,270C460,330 520,400 420,510" />
        <Ambient frame={frame} on={3} off={4} kind="drift">
          <Water x={300} y={360} w={140} rows={4} gap={26} />
        </Ambient>
        <Grass
          at={[
            [100, 400],
            [640, 420],
            [700, 360],
          ]}
        />
      </Scene>

      {/* 4. A plumb line beside a leaning wall. */}
      <Scene frame={frame} k={4}>
        <Hills
          y={330}
          peaks={[
            [160, 50],
            [640, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <Ink d="M300,420L360,150H460L420,420Z" tone="b" hatch={h.h2} />
        <path className="pl-f" d="M310,380H424M320,340H432M330,300H440M340,260H448M350,220H452M356,184H456" />
        <path className="pl-l" d="M480,120V330M460,120H500" />
        <Fade frame={frame} on={4} off={5} from="grow" at={3}>
          <path className="pl-m" d="M472,330h16l-8,22Z" />
          <path className="pl-f" d="M472,330h16l-8,22Z" />
        </Fade>
        <Amos x={620} y={470} s={1.7} face={-1} />
      </Scene>

      {/* 5. Vines planted; a low wall rebuilt. */}
      <Scene frame={frame} k={5}>
        <Sun x={120} y={96} r={22} />
        <Hills
          y={300}
          peaks={[
            [300, 60],
            [660, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V320C240,310 560,312 810,322V510Z" tone="g" />
        <Ink d="M-10,350H810V364H-10Z" tone="c" />
        <path className="pl-f" d="M40,350V364M120,350V364M200,350V364M280,350V364M360,350V364M440,350V364M520,350V364M600,350V364M680,350V364M760,350V364" />
        {[80, 180, 280, 520, 620, 720].map(x => (
          <Vine key={x} x={x} y={430} />
        ))}
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <path className="pl-m" d="M614,404c-8,2 -10,12 -4,16c-2,8 4,14 10,12c6,2 10,-6 6,-12c4,-8 -4,-18 -12,-16Z" />
          <path className="pl-f" d="M614,404c-8,2 -10,12 -4,16c-2,8 4,14 10,12c6,2 10,-6 6,-12c4,-8 -4,-18 -12,-16Z" />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="left" at={5}>
          <Person x={380} y={480} s={1.4} pose="kneel" robe="b" head="veil" />
          <Person x={440} y={476} s={1.4} pose="hold" robe="p" cloak="c" head="cloth" />
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
