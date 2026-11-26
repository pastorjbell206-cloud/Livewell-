/**
 * "1 Peter: hope for strangers": a film for one whole book, from the book's
 * own page (bible/notes/1-peter/intro.json) and its chapter notes.
 *
 *   0  Strangers in their own towns  a festival, and a family walking away
 *   1  How it is laid out            four movements
 *   2  A living hope                 travellers toward the sunrise
 *   3  God's own people              a house of stones, its cornerstone
 *   4  Do good, do not strike back   bread held out to a neighbour
 *   5  God cares for you             a shepherd among his flock
 *   6  Where to start                the reader and the open scroll
 *
 * No one is drawn being hurt, and no household rank is drawn. Christ and
 * God are never drawn. The neighbours are drawn as ordinary townspeople,
 * never as villains. The one mustard mark: the rule under "who you are"
 * (1), the sunrise (2), the cornerstone (3), the sun (5), the marker (6);
 * the festival (0) and the doorway (4) have none.
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Person,
  Sheep,
  Sun,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Who you are (1 and 2), among neighbours (3), suffering for doing good (4), elders and all (5): the book page's outline in whole chapters. */
export const LAYOUT = [2, 1, 1, 1];

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 320, 1.1],
  [400, 320, 1.12],
  [400, 330, 1.12],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The festival, and a family walking away. */}
      <FirstScene frame={frame}>
        <House x={110} y={360} s={1.3} hatch={h.h3} />
        <House x={300} y={350} s={1.1} tone="b" hatch={h.h3} />
        <House x={720} y={360} s={1.2} hatch={h.h3} />
        <Ink d="M-10,510V360H810V510Z" tone="c" />
        <path className="pl-f" d="M560,360L800,470M620,360L810,420" />
        {/* The ring of dancers. */}
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Person x={200} y={450} s={1.2} pose="open" robe="g" />
          <Person x={260} y={470} s={1.2} pose="open" robe="p" cloak="c" head="veil" />
          <Person x={330} y={474} s={1.2} pose="open" robe="b" />
          <Person x={400} y={462} s={1.2} pose="open" face={-1} robe="c" cloak="g" head="cloth" />
          <Person x={300} y={430} s={1} pose="open" face={-1} robe="g" cloak="b" head="veil" />
        </Ambient>
        <Fade frame={frame} on={-1} off={1} from="left" at={4}>
          <Person x={600} y={440} s={1.2} pose="walk" robe="b" cloak="c" head="cloth" />
          <Person x={650} y={446} s={1.2} pose="walk" robe="g" head="veil" />
          <Person x={700} y={452} s={0.8} pose="walk" robe="p" child head="bare" />
        </Fade>
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={0}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <>
                <Person x={mid - 12} y={top} s={0.34} robe="g" />
                <Person x={mid + 12} y={top} s={0.34} robe="b" />
              </>
            ) : i === 1 ? (
              <House x={mid} y={top} s={0.36} hatch={h.h3} />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 24},${top - 4}H${mid + 24}M${mid - 14},${top - 4}a14,14 0 0,1 28,0M${mid},${top - 26}v-6M${mid - 18},${top - 20}l-4,-4M${mid + 18},${top - 20}l4,-4`}
              />
            ) : (
              <path
                className="pl-l"
                d={`M${mid},${top}V${top - 30}c0,-10 14,-10 14,0`}
              />
            )
          }
        />
      </Scene>

      {/* 2. Travellers toward the sunrise. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={2}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={560} y={250} r={36} gold />
          </Ambient>
        </Fade>
        <Hills
          y={280}
          peaks={[
            [360, 50],
            [720, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V300C240,296 560,296 810,300V510Z" tone="g" />
        <Ink d="M200,510C300,420 460,340 540,300H560C540,340 480,420 520,510Z" tone="c" />
        <Fade frame={frame} on={2} off={3} from="left" at={4}>
          <Person x={330} y={470} s={1.5} pose="walk" robe="b" cloak="c" head="cloth" bundle />
          <Person x={420} y={420} s={1.2} pose="walk" robe="g" head="veil" />
          <Person x={470} y={380} s={0.9} pose="walk" robe="p" child head="bare" />
        </Fade>
        <Grass
          at={[
            [100, 460],
            [680, 450],
          ]}
        />
      </Scene>

      {/* 3. A house of stones, and its cornerstone. */}
      <Scene frame={frame} k={3}>
        <Hills
          y={330}
          peaks={[
            [160, 40],
            [680, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V420H810V510Z" tone="c" />
        {/* The courses of stone, rising. */}
        <Ink d="M300,420V300H560V420Z" tone="b" hatch={h.h3} />
        <path
          className="pl-l"
          d="M300,390H560M300,360H560M300,330H560M340,420V390M400,420V390M460,420V390M520,420V390M370,390V360M430,390V360M490,390V360M340,360V330M400,360V330M460,360V330M520,360V330"
        />
        <Fade frame={frame} on={3} off={4} from="grow" at={3}>
          <path className="pl-m" d="M300,420V390H340V420Z" />
          <path className="pl-f" d="M300,420V390H340V420Z" />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="right" at={5}>
          <Person x={620} y={470} s={1.5} face={-1} pose="hold" robe="g" head="cloth" />
          <Ink d="M570,382h30v20h-30Z" tone="c" />
          <Person x={210} y={470} s={1.5} pose="hold" robe="p" cloak="c" head="bare" />
          <Ink d="M226,380h30v20h-30Z" tone="c" />
        </Fade>
      </Scene>

      {/* 4. Bread held out to a neighbour. */}
      <Scene frame={frame} k={4}>
        <House x={200} y={410} s={1.8} hatch={h.h3} />
        <House x={680} y={370} s={1.1} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V410H810V510Z" tone="c" />
        <path className="pl-f" d="M0,450H800" />
        <Person x={330} y={480} s={1.6} pose="reach" robe="g" cloak="b" head="veil" />
        <Ink d="M370,392c0,-10 26,-10 26,0Z" />
        <Fade frame={frame} on={4} off={5} from="right" at={3}>
          <Person x={450} y={480} s={1.6} face={-1} robe="c" cloak="g" head="cloth" />
        </Fade>
        <Fade frame={frame} on={4} off={5} at={6}>
          <Person x={640} y={440} s={1.1} face={-1} robe="p" head="bare" />
          <Person x={700} y={444} s={1.1} face={-1} robe="b" cloak="c" head="veil" />
        </Fade>
      </Scene>

      {/* 5. A shepherd among his flock. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={640} y={96} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [200, 70],
            [560, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C240,370 560,370 810,380V510Z" tone="g" />
        <Person x={380} y={470} s={1.8} robe="c" cloak="b" head="cloth" staff="crook" />
        <Sheep x={300} y={474} s={0.9} lamb />
        <Fade frame={frame} on={5} off={6} at={5}>
          <Sheep x={480} y={470} s={1} face={-1} />
          <Sheep x={560} y={480} s={1} face={-1} graze />
          <Sheep x={180} y={478} s={0.9} graze />
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
