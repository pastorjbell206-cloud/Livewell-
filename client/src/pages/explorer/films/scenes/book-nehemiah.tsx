/**
 * "Nehemiah: rebuilding the walls, and a people": a film for one whole book,
 * from the book's own page (bible/notes/nehemiah/intro.json) and its
 * chapter notes.
 *
 *   0  The king's cupbearer        Nehemiah before the king, cup in hand
 *   1  How it is laid out          five parts, the turn at chapter 8
 *   2  Pray, and keep watch        builders on the half-built wall
 *   3  Justice for the poor        Nehemiah before the nobles
 *   4  The law read with joy       Ezra on the wooden platform
 *   5  An ending without triumph   the gate shut at dusk
 *   6  Where to start              the reader and the open scroll
 *
 * No weapon, blow or harm is drawn: the armed builders and the harsh acts of
 * chapter 13 are left to the captions and the book page. God is never drawn.
 * Nehemiah wears the same robe, cloak and head cloth in each picture. The one
 * mustard mark: the cup (0), the rule under the turn (1), the sun (2, 5), the
 * scroll (4), the marker (6); the square (3) has none.
 */
import {
  CityWall,
  Grass,
  Hills,
  House,
  Ink,
  Person,
  Scroll,
  Sun,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The book page's five parts: 1-2, 3-7, 8-10, 11-12, 13. */
export const LAYOUT = [2, 5, 3, 2, 1];

const Nehemiah = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "reach" | "open" | "hold";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="p"
    cloak="b"
    head="cloth"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.12],
  [400, 250, 1.06],
  [400, 320, 1.1],
  [400, 330, 1.12],
  [400, 320, 1.1],
  [400, 320, 1.1],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Nehemiah before the king, the cup in hand. */}
      <FirstScene frame={frame}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.h3} />
        <path className="pl-l" d="M100,400V90M700,400V90M80,90H720" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <Ink d="M520,470V300h80v170h-14v-90h-52v90Z" tone="c" />
        <Person x={560} y={470} s={1.6} pose="sit" face={-1} robe="g" cloak="c" head="crown" />
        <Nehemiah x={340} y={474} s={1.7} pose="reach" />
        <Fade frame={frame} on={-1} off={1} from="grow" at={3}>
          <path className="pl-m" d="M392,376h20l-4,16h-12Z" />
          <path className="pl-f" d="M392,376h20l-4,16h-12ZM400,392v8M394,400h16" />
        </Fade>
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
              <path className="pl-l" d={`M${mid - 8},${top - 20}h16l-3,12h-10ZM${mid},${top - 8}v8M${mid - 6},${top}h12`} />
            ) : i === 1 ? (
              <Ink d={`M${mid - 30},${top}v-20h6v-6h6v6h6v-6h6v6h6v-6h6v6h6v-6h6v6h6v20Z`} tone="c" />
            ) : i === 2 ? (
              <Scroll x={mid} y={top} s={0.5} />
            ) : i === 3 ? (
              <>
                <Person x={mid - 10} y={top} s={0.32} pose="open" robe="g" />
                <Person x={mid + 10} y={top} s={0.32} pose="open" robe="b" />
              </>
            ) : (
              <Ink d={`M${mid - 10},${top}v-24c0,-10 20,-10 20,0v24Z`} tone="b" />
            )
          }
        />
      </Scene>

      {/* 2. Builders on the half-built wall. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={2}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={660} y={90} r={28} gold />
          </Ambient>
        </Fade>
        <House x={130} y={330} s={0.9} hatch={h.h3} />
        <House x={300} y={320} s={0.8} tone="b" hatch={h.h3} />
        <House x={560} y={326} s={0.9} hatch={h.h3} />
        <Ink d="M-10,510V340H810V510Z" tone="c" />
        {/* The wall, higher in some places than in others. */}
        <Ink d="M-10,440V380H160V400H300V370H440V410H600V390H810V440Z" tone="b" hatch={h.h2} />
        <path className="pl-f" d="M0,410H800M40,380V440M120,380V440M220,400V440M360,370V440M500,410V440M680,390V440" />
        <Fade frame={frame} on={2} off={3} from="up" at={4}>
          <Person x={200} y={400} s={1.2} pose="hold" robe="g" head="cloth" />
          <Person x={380} y={370} s={1.2} pose="hold" robe="p" cloak="c" head="cloth" />
          <Person x={520} y={410} s={1.1} pose="hold" robe="c" head="veil" />
          <Person x={700} y={390} s={1.2} pose="hold" robe="b" head="bare" />
        </Fade>
        <Ink d="M-10,510V440H810V510Z" tone="g" />
      </Scene>

      {/* 3. Nehemiah before the nobles; the poor family behind him. */}
      <Scene frame={frame} k={3}>
        <House x={120} y={380} s={1.4} hatch={h.h3} />
        <House x={700} y={384} s={1.3} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <Nehemiah x={380} y={474} s={1.7} face={1} pose="open" />
        <Fade frame={frame} on={3} off={4} from="right" at={3}>
          <Person x={540} y={470} s={1.6} face={-1} robe="c" cloak="g" head="cloth" />
          <Person x={610} y={474} s={1.6} face={-1} robe="g" cloak="c" head="cloth" />
          <Person x={680} y={470} s={1.6} face={-1} robe="b" cloak="g" head="cloth" />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" at={5}>
          <Person x={150} y={476} s={1.4} robe="g" head="veil" />
          <Person x={210} y={480} s={0.9} robe="p" child head="bare" />
          <Person x={250} y={482} s={0.8} robe="b" child head="bare" />
        </Fade>
      </Scene>

      {/* 4. Ezra reads from the wooden platform. */}
      <Scene frame={frame} k={4}>
        <CityWall x={400} y={300} w={760} tone="c" hatch={h.h3} gate={false} />
        <Ink d="M-10,510V300H810V510Z" tone="c" />
        <Ink d="M320,360H480V376H320Z" tone="b" />
        <path className="pl-l" d="M334,376V440M466,376V440" />
        <Person x={400} y={360} s={1.4} robe="p" cloak="g" head="cloth" pose="hold" />
        <Fade frame={frame} on={4} off={5} from="grow" at={3}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <path className="pl-m" d="M412,282h40v26h-40Z" />
          </Ambient>
          <path className="pl-f" d="M412,282h40v26h-40ZM418,290h28M418,298h28" />
        </Fade>
        <Fade frame={frame} on={4} off={5} at={5}>
          {[80, 150, 220, 290, 510, 580, 650, 720].map((x, i) => (
            <Person
              key={x}
              x={x}
              y={480 + (i % 2) * 6}
              s={1.2}
              face={x < 400 ? 1 : -1}
              robe={(["g", "b", "c", "p"] as const)[i % 4]}
              head={i % 2 ? "veil" : "cloth"}
            />
          ))}
        </Fade>
      </Scene>

      {/* 5. The gate shut at dusk. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={2}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={640} y={260} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={300}
          peaks={[
            [520, 40],
            [740, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <CityWall x={300} y={420} w={460} s={1.3} tone="c" hatch={h.h3} gate={false} />
        {/* The gate's two doors, shut. */}
        <Ink d="M270,420V364C270,334 330,334 330,364V420Z" tone="b" />
        <path className="pl-l" d="M300,342V420" />
        <Ink d="M-10,510V420H810V510Z" tone="g" />
        <Nehemiah x={420} y={480} s={1.6} face={-1} />
        <Grass
          at={[
            [600, 480],
            [720, 490],
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
