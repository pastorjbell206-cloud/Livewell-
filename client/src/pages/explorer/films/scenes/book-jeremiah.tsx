/**
 * "Jeremiah: the prophet who wept": a film for one whole book, from the
 * book's own page (bible/notes/jeremiah/intro.json) and its chapter notes.
 *
 *   0  A prophet in the last days  the almond tree, the city across the valley
 *   1  How it is laid out          seven parts, the book of comfort marked
 *   2  False safety                at the gate of the temple courts
 *   3  Honest prayer               alone in the pit, light from above
 *   4  A letter to the exiles      building and planting by a far river
 *   5  A new covenant              a shoot from an old stump
 *   6  Where to start              the reader and the open scroll
 *
 * No siege, fire, ruin or army is drawn, and no nation of any later age is
 * named or pictured. God is never drawn. Jeremiah has the same robe, cloak
 * and head cloth in each picture he is in. The one mustard mark: the rule
 * under the book of comfort (1), the sun over the exiles (4), the shoot (5),
 * the marker (6); the almond tree (0), the temple (2) and the pit (3) have
 * none.
 */
import {
  CityWall,
  Grass,
  Hills,
  House,
  Ink,
  Jar,
  Lamp,
  Olive,
  Person,
  Sun,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The call (1), warnings (2-25), conflict (26-29), comfort (30-33), the last days (34-45), the nations (46-51), the fall retold (52). */
export const LAYOUT = [1, 24, 4, 4, 12, 6, 1];

const Jeremiah = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "open" | "sit" | "walk";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="c"
    head="cloth"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 320, 1.1],
  [400, 300, 1.1],
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
      {/* 0 (and the poster). The almond tree; the city on the far hill. */}
      <FirstScene frame={frame}>
        <Sun x={640} y={90} r={22} />
        <Hills
          y={300}
          peaks={[
            [560, 90],
            [760, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <CityWall x={560} y={222} w={200} s={0.7} hatch={h.h3} />
        <Ink d="M-10,510V330C200,300 360,330 460,400C520,440 640,450 810,450V510Z" tone="g" />
        <Ambient frame={frame} on={-1} off={1} kind="sway">
          <Olive x={190} y={420} s={2.2} hatch={h.h2} />
        </Ambient>
        {/* Almond blossom on the branches. */}
        <Fade frame={frame} on={-1} off={1} at={3}>
          <path
            className="pl-f"
            d="M140,290a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M170,268a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M210,280a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M236,300a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M190,310a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M150,320a4,4 0 1,0 8,0a4,4 0 1,0 -8,0"
          />
        </Fade>
        <Jeremiah x={300} y={436} s={1.6} />
        <Grass
          at={[
            [90, 470],
            [380, 470],
          ]}
        />
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
              <path
                className="pl-l"
                d={`M${mid - 8},${top}l14,-30M${mid - 2},${top - 14}l-8,-6M${mid + 2},${top - 22}l8,-4`}
              />
            ) : i === 1 ? (
              <Jar x={mid} y={top} s={0.6} />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 26},${top - 20}h52M${mid - 18},${top - 20}c0,14 8,16 8,16M${mid + 18},${top - 20}c0,14 -8,16 -8,16`}
              />
            ) : i === 3 ? (
              <path
                className="pl-l"
                d={`M${mid},${top}v-26M${mid},${top - 12}c-10,-2 -14,-10 -12,-16M${mid},${top - 18}c10,-2 12,-10 10,-14`}
              />
            ) : i === 4 ? (
              <Ink d={`M${mid - 20},${top}v-24h40v24Z`} />
            ) : i === 5 ? (
              <Ink
                d={`M${mid - 34},${top}v-24h8v-6h8v6h8v-14h8v14h8v-6h8v6h8v24Z`}
                tone="c"
              />
            ) : (
              <Lamp x={mid - 2} y={top} s={0.8} />
            )
          }
        />
      </Scene>

      {/* 2. At the gate of the temple courts. */}
      <Scene frame={frame} k={2}>
        <Ink d="M220,380V170H700V380Z" tone="c" hatch={h.h3} />
        <path className="pl-l" d="M200,170H720L460,110Z" />
        <path
          className="pl-f"
          d="M280,190V380M340,190V380M580,190V380M640,190V380"
        />
        <path className="pl-paper" d="M420,380V250C420,220 500,220 500,250V380Z" />
        <path className="pl-l" d="M420,380V250C420,220 500,220 500,250V380" />
        <Ink d="M-10,510V380H810V510Z" tone="b" />
        <path className="pl-f" d="M0,420H800M0,460H800" />
        <Jeremiah x={160} y={470} s={1.8} pose="open" />
        <Fade frame={frame} on={2} off={3} from="right" at={4}>
          <Person
            x={380}
            y={476}
            s={1.4}
            pose="walk"
            robe="g"
            cloak="c"
            head="veil"
          />
          <Person x={470} y={470} s={1.5} pose="walk" robe="p" head="cloth" />
          <Person
            x={560}
            y={476}
            s={1.4}
            pose="walk"
            robe="c"
            cloak="g"
            head="cloth"
          />
          <Person x={650} y={472} s={1} pose="walk" robe="b" child head="bare" />
        </Fade>
      </Scene>

      {/* 3. Alone in the pit, light from the opening above. */}
      <Scene frame={frame} k={3}>
        <Ink d="M-10,-10H810V510H-10Z" tone="b" hatch={h.hs} />
        <path className="pl-paper" d="M300,-10H500V60C470,70 330,70 300,60Z" />
        <path className="pl-l" d="M300,60C330,70 470,70 500,60" />
        <Fade frame={frame} on={3} off={4} at={2}>
          <path className="pl-paper" d="M330,64L470,64L540,440H260Z" />
          <path className="pl-f" d="M330,64L260,440M470,64L540,440" />
        </Fade>
        <Ink d="M220,510V440C320,430 480,430 580,440V510Z" tone="g" />
        <path className="pl-f" d="M250,460c20,-6 40,-6 60,0M470,456c20,-6 40,-6 60,0" />
        <Jeremiah x={400} y={450} s={1.6} pose="sit" />
      </Scene>

      {/* 4. Building and planting by a far river. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} at={4}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={660} y={92} r={30} gold />
          </Ambient>
        </Fade>
        <path className="pl-paper" d="M-10,300H810V340H-10Z" />
        <Water x={0} y={312} w={800} rows={2} gap={12} />
        <path className="pl-l" d="M-10,300H810M-10,340H810" />
        <Ink d="M-10,510V340H810V510Z" tone="c" />
        <House x={200} y={440} s={1.4} tone="b" hatch={h.h3} />
        <path className="pl-f" d="M120,350h48M164,366h40M110,380h36" />
        <Person x={330} y={460} s={1.4} pose="reach" robe="g" head="cloth" />
        <Fade frame={frame} on={4} off={5} from="right" at={5}>
          <Person
            x={520}
            y={470}
            s={1.4}
            pose="kneel"
            face={-1}
            robe="p"
            cloak="b"
            head="veil"
          />
          <Person x={620} y={470} s={1} pose="stand" face={-1} robe="g" child head="bare" />
        </Fade>
        {/* The garden rows, planted. */}
        <path
          className="pl-l"
          d="M440,480l8,-14M470,480l8,-14M560,486l8,-14M590,486l8,-14M680,482l8,-14M710,482l8,-14"
        />
      </Scene>

      {/* 5. A shoot from an old stump. */}
      <Scene frame={frame} k={5}>
        <Hills
          y={340}
          peaks={[
            [160, 50],
            [640, 70],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C240,370 560,370 810,380V510Z" tone="c" />
        <path className="pl-f" d="M0,420H800M60,450H740" />
        <Ink d="M424,446l14,-54c10,-8 54,-8 64,0l14,54c-6,-4 -14,-6 -20,0c-10,-4 -20,-4 -26,2c-8,-6 -18,-6 -26,0c-6,-6 -14,-4 -20,-2Z" tone="c" hatch={h.h2} />
        <path className="pl-l" d="M440,394c14,8 46,8 60,0M450,410c10,4 30,4 40,0" />
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path
              className="pl-m"
              d="M470,390c0,-30 -4,-50 4,-70c-16,4 -26,-8 -26,-20c14,0 26,8 28,18c4,-16 16,-24 30,-22c0,14 -12,24 -28,24c-4,20 -2,40 -2,70Z"
            />
          </Ambient>
          <path
            className="pl-f"
            d="M470,390c0,-30 -4,-50 4,-70c-16,4 -26,-8 -26,-20c14,0 26,8 28,18c4,-16 16,-24 30,-22c0,14 -12,24 -28,24c-4,20 -2,40 -2,70Z"
          />
        </Fade>
        <Jeremiah x={300} y={460} s={1.7} />
        <Jar x={360} y={460} s={0.9} />
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
