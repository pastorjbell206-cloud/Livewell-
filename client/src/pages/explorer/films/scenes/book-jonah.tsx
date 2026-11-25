/**
 * "Jonah: the prophet who ran from mercy": a film for one whole book, from
 * the book's own page (bible/notes/jonah/intro.json) and its chapter notes.
 *
 *   0  A prophet who ran        a ship sailing away from the great city
 *   1  How it is laid out       ship, fish, city wall, plant
 *   2  All of it obeys          a calm sea, and the great fish below
 *   3  Down, and up again       Jonah on the shore, the fish turning away
 *   4  The city that turned     people in rough cloth, a robe laid aside
 *   5  The question at the end  Jonah on his hill, the withered plant
 *   6  Where to start           the reader and the open scroll
 *
 * God is never drawn. No one is drawn in the water and no one drowns: the
 * storm is past in every picture, and Jonah is shown only on the ship's deck
 * (too small to see), on the shore, and on his hill. The people of Nineveh
 * are drawn as every person of the cast is, with dignity. The one mustard
 * mark: the rule (1), the sun (2, 3), a lamp (4), a star (5), the marker (6);
 * the opening picture has none.
 */
import {
  CityWall,
  Cloud,
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Sheep,
  Sun,
  Water,
  Boat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, GoldStar, Layout, Scene, StartReading } from "./book-parts";

/** Four chapters, one scene each, as the book page lays them out. */
export const LAYOUT = [1, 1, 1, 1];

/** The great fish: a long body, a tail, one fin. No teeth, no eye of menace. */
const Fish = ({
  x,
  y,
  s = 1,
  face = 1,
}: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
}) => (
  <g transform={`translate(${x},${y}) scale(${s * face},${s})`}>
    <Ink d="M-90,0C-60,-38 40,-44 90,-6C96,0 96,6 90,10C40,44 -60,38 -90,0Z" tone="b" />
    <Ink d="M-88,0L-124,-30C-118,-10 -118,10 -124,30Z" tone="b" />
    <path className="pl-l" d="M-10,-30C0,-46 20,-48 30,-36" />
    <path className="pl-f" d="M60,4C66,8 74,8 80,4M-40,-10C-20,-4 0,-4 20,-10M-30,10C-10,16 10,16 30,10" />
    <path className="pl-k" d="M70,-8a3,3 0 1,0 6,0a3,3 0 1,0 -6,0Z" />
  </g>
);

const Jonah = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "open" | "sit";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="g"
    cloak="b"
    head="cloth"
  />
);

const CAMERA: [number, number, number][] = [
  [420, 300, 1.1],
  [400, 250, 1.06],
  [400, 280, 1.1],
  [440, 320, 1.12],
  [400, 330, 1.12],
  [380, 320, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The ship sails west, away from the great city. */}
      <FirstScene frame={frame}>
        <Sun x={700} y={250} r={26} />
        <Cloud x={300} y={90} s={1.1} />
        <Cloud x={560} y={130} s={0.8} />
        {/* The far shore, and the city on it. */}
        <Hills
          y={300}
          peaks={[
            [60, 30],
            [220, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={140} y={290} w={200} s={0.6} hatch={h.h3} />
        <Ink d="M-10,510V300H810V510Z" tone="b" hatch={h.hs} />
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Water x={20} y={330} w={760} rows={4} gap={28} />
        </Ambient>
        <Ambient frame={frame} on={-1} off={1} kind="drift">
          <Boat x={520} y={322} s={1.2} />
        </Ambient>
        <Water x={40} y={450} w={720} rows={2} gap={22} />
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
              <Boat x={mid} y={top} s={0.5} />
            ) : i === 1 ? (
              <Fish x={mid} y={top - 14} s={0.32} />
            ) : i === 2 ? (
              <Ink
                d={`M${mid - 36},${top}v-30h10v-8h8v8h12v-8h8v8h12v-8h8v8h10v30Z`}
                tone="c"
              />
            ) : (
              <path
                className="pl-l"
                d={`M${mid},${top}V${top - 30}M${mid},${top - 14}C${mid - 14},${top - 20} ${mid - 20},${top - 32} ${mid - 8},${top - 36}M${mid},${top - 22}C${mid + 14},${top - 28} ${mid + 20},${top - 40} ${mid + 6},${top - 42}`}
              />
            )
          }
        />
      </Scene>

      {/* 2. The storm is past: the ship on a calm sea, the fish below. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={3}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={600} y={80} r={28} gold />
          </Ambient>
        </Fade>
        <Cloud x={420} y={90} s={1.2} />
        <Cloud x={720} y={110} s={0.9} />
        <Boat x={260} y={196} s={1.1} />
        <Ink d="M-10,510V190H810V510Z" tone="b" hatch={h.hs} />
        <Water x={20} y={210} w={760} rows={2} gap={20} />
        <Fade frame={frame} on={2} off={3} from="right" at={5}>
          <Fish x={470} y={360} s={1.3} face={-1} />
        </Fade>
        {/* Weeds of the deep. */}
        <path
          className="pl-l"
          d="M80,510C70,470 96,450 84,410M110,510C120,480 100,460 116,430M680,510C690,470 668,450 684,420M716,510C706,486 726,470 714,446"
        />
      </Scene>

      {/* 3. Brought up onto dry land. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={160} y={220} r={30} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V250H560C520,330 500,420 470,510Z" tone="b" hatch={h.hs} />
        <Water x={20} y={276} w={480} rows={3} gap={30} />
        <Ink d="M470,510C500,420 520,330 560,250H810V510Z" tone="c" />
        <Fish x={210} y={400} s={0.9} face={-1} />
        <Jonah x={650} y={440} s={1.8} pose="open" face={-1} />
        <path className="pl-f" d="M600,470h40M690,486h50" />
      </Scene>

      {/* 4. Nineveh turns: the city in rough cloth, the king's robe laid aside. */}
      <Scene frame={frame} k={4}>
        <CityWall x={400} y={330} w={720} s={1.2} hatch={h.h3} />
        <Fade frame={frame} on={4} off={5} from="grow" at={3}>
          <Ambient frame={frame} on={4} off={5} kind="flicker">
            <Lamp x={400} y={300} s={1.2} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V330H810V510Z" tone="c" />
        <Person x={150} y={470} s={1.4} pose="sit" robe="p" head="bare" />
        <Person x={240} y={476} s={1.3} pose="sit" robe="p" head="veil" />
        {/* The king, his fine robe laid on the ground beside him. */}
        <Person x={390} y={478} s={1.6} pose="sit" robe="p" head="bare" />
        <Ink d="M430,478c10,-14 50,-16 66,-2c4,4 2,6 -4,6h-58c-4,0 -6,-2 -4,-4Z" tone="b" />
        <Person x={560} y={474} s={1.3} pose="sit" robe="p" head="veil" />
        <Person x={600} y={478} s={0.9} pose="sit" robe="p" child />
        <Fade frame={frame} on={4} off={5} from="right" at={5}>
          <Sheep x={690} y={470} s={1} face={-1} />
          <Sheep x={750} y={486} s={0.9} face={-1} />
        </Fade>
      </Scene>

      {/* 5. Jonah's hill: the withered plant, and the city below. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} from="grow" at={6}>
          <Ambient frame={frame} on={5} off={6} kind="twinkle">
            <GoldStar x={610} y={90} r={9} />
          </Ambient>
        </Fade>
        <Hills
          y={420}
          peaks={[
            [520, 10],
            [720, 20],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={600} y={420} w={340} s={1} hatch={h.h3} />
        <House x={520} y={440} s={0.6} />
        <House x={680} y={446} s={0.6} tone="b" />
        <Ink
          d="M-10,510V330C60,290 200,290 270,350C310,390 330,450 340,510Z"
          tone="c"
          hatch={h.h2}
        />
        {/* The shelter, and the withered plant. */}
        <path className="pl-l" d="M90,326V250M190,322V250M80,250H200" />
        <path
          className="pl-l"
          d="M226,330C226,282 216,248 184,234M216,274C202,262 188,264 180,274"
        />
        <path className="pl-f" d="M184,234l-12,10M184,234l-4,14M180,274l-6,10" />
        <Jonah x={140} y={326} s={1.4} pose="sit" face={1} />
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
