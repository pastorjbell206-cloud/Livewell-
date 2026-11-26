/**
 * "Judges: a people coming apart": a film for one whole book, from the
 * book's own page (bible/notes/judges/intro.json) and its chapter notes.
 *
 *   0  The dark years           scattered villages on the hills
 *   1  How it is laid out       the opening, three runs of judges, no king
 *   2  The wheel                a cart wheel rolling down a long slope
 *   3  Unlikely deliverers      Deborah under her palm tree
 *   4  Gifts are not goodness   Gideon's gold object, and people bowing
 *   5  No king in Israel        an empty seat by a gate, everyone going away
 *   6  Where to start           the reader and the open scroll
 *
 * No battle, weapon, wound or death is drawn, and nothing of the last five
 * chapters is pictured but the empty seat: the stories of Jephthah's
 * daughter and of the Levite's concubine are named in the older captions and
 * nowhere drawn. God and the angel of the LORD are never drawn. The one
 * mustard mark: the rule under the opening (1), the sun (3), the gold
 * object (4), the marker (6); the villages (0), the wheel (2) and the gate
 * (5) have none.
 */
import {
  CityWall,
  Grass,
  Hills,
  House,
  Ink,
  Palm,
  Person,
  Sun,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The opening (1 and 2), the earlier judges (3 to 8), Abimelech, Jephthah
 * and the minor judges (9 to 12), Samson (13 to 16), no king (17 to 21):
 * the book page's outline, rounded to whole chapters.
 */
export const LAYOUT = [2, 6, 4, 4, 5];

/** A cart wheel of eight spokes. */
const Wheel = ({ x, y, r }: { x: number; y: number; r: number }) => {
  const spokes = Array.from({ length: 4 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const dx = Math.cos(a) * r;
    const dy = Math.sin(a) * r;
    return `M${x - dx},${y - dy}L${x + dx},${y + dy}`;
  }).join("");
  const ring = `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
  const hub = `M${x - r * 0.18},${y}a${r * 0.18},${r * 0.18} 0 1,0 ${r * 0.36},0a${r * 0.18},${r * 0.18} 0 1,0 ${-r * 0.36},0Z`;
  return (
    <>
      <path className="pl-l" d={ring} />
      <path
        className="pl-l"
        d={`M${x - r * 0.86},${y}a${r * 0.86},${r * 0.86} 0 1,0 ${1.72 * r},0a${r * 0.86},${r * 0.86} 0 1,0 ${-1.72 * r},0Z`}
      />
      <path className="pl-l" d={spokes} />
      <Ink d={hub} tone="c" />
    </>
  );
};

/** A plain seat with a high back: the king's seat no one sits in. */
const Seat = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <Ink
    d={`M${x - 20 * s},${y}v${-34 * s}h${40 * s}v${34 * s}h${-6 * s}v${-24 * s}h${-28 * s}v${24 * s}ZM${x + 14 * s},${y - 34 * s}v${-40 * s}h${6 * s}v${40 * s}Z`}
    tone="c"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 300, 1.1],
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
      {/* 0 (and the poster). Scattered villages, each on its own hill. */}
      <FirstScene frame={frame}>
        <Sun x={120} y={96} r={22} />
        <Hills
          y={300}
          peaks={[
            [140, 80],
            [420, 60],
            [690, 90],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <House x={150} y={240} s={0.45} hatch={h.h3} />
        <House x={430} y={262} s={0.4} tone="b" hatch={h.h3} />
        <House x={680} y={232} s={0.45} hatch={h.h3} />
        <Hills
          y={400}
          peaks={[
            [260, 70],
            [560, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <House x={270} y={350} s={0.55} tone="b" hatch={h.h3} />
        <House x={560} y={366} s={0.5} hatch={h.h3} />
        <Ink d="M-10,510V420C240,410 560,412 810,420V510Z" tone="c" />
        <path
          className="pl-f"
          d="M0,470C120,456 200,440 270,352M560,368C600,420 700,450 800,456"
        />
        <Fade frame={frame} on={-1} off={1} from="left" at={4}>
          <Person x={200} y={470} s={1} pose="walk" robe="g" head="cloth" />
        </Fade>
        <Fade frame={frame} on={-1} off={1} from="right" at={6}>
          <Person
            x={650}
            y={466}
            s={1}
            pose="walk"
            face={-1}
            robe="p"
            cloak="c"
            head="veil"
            bundle
          />
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
              <Wheel x={mid} y={top - 16} r={14} />
            ) : i === 1 ? (
              <Palm x={mid} y={top} s={0.3} />
            ) : i === 2 ? (
              <Person x={mid} y={top} s={0.36} pose="open" robe="b" />
            ) : i === 3 ? (
              <Ink
                d={`M${mid - 22},${top}v-34h10v34ZM${mid + 12},${top}v-34h10v34ZM${mid - 28},${top - 34}h56v-6h-56Z`}
                tone="c"
              />
            ) : (
              <Seat x={mid} y={top} s={0.5} />
            )
          }
        />
      </Scene>

      {/* 2. The wheel, rolling downhill. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,180C200,200 520,330 810,440V510H-10Z" tone="g" />
        <Ink d="M560,350C660,390 740,420 810,440V510H520Z" tone="b" hatch={h.hs} />
        <path className="pl-f" d="M-10,210C200,230 520,356 810,466" />
        {[
          [140, 214],
          [300, 248],
          [450, 300],
          [590, 360],
        ].map(([x, y]) => (
          <Ink
            key={x}
            d={`M${x - 12},${y}c0,-10 6,-14 12,-14c6,0 12,4 12,14Z`}
            tone="c"
          />
        ))}
        <Fade frame={frame} on={2} off={3} from="left" at={2}>
          <Wheel x={360} y={236} r={48} />
        </Fade>
        <Grass
          at={[
            [60, 260],
            [220, 300],
          ]}
        />
      </Scene>

      {/* 3. Deborah under her palm tree; people come to her. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={660} y={92} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [120, 90],
            [640, 70],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C240,366 560,368 810,380V510Z" tone="g" />
        <path className="pl-f" d="M800,400C640,420 520,440 400,470" />
        <Ambient frame={frame} on={3} off={4} kind="sway">
          <Palm x={270} y={470} s={1.6} />
        </Ambient>
        <Person
          x={300}
          y={470}
          s={1.6}
          pose="sit"
          robe="p"
          cloak="b"
          head="veil"
        />
        <Fade frame={frame} on={3} off={4} from="right" at={5}>
          <Person
            x={480}
            y={466}
            s={1.4}
            face={-1}
            pose="open"
            robe="g"
            cloak="c"
            head="cloth"
          />
          <Person x={560} y={452} s={1.3} face={-1} robe="c" head="cloth" />
          <Person
            x={640}
            y={432}
            s={1.1}
            face={-1}
            pose="walk"
            robe="b"
            head="veil"
          />
        </Fade>
      </Scene>

      {/* 4. Gideon's gold object, and people bowing to it. */}
      <Scene frame={frame} k={4}>
        <House x={140} y={380} s={1.2} hatch={h.h3} />
        <House x={680} y={384} s={1.1} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <path className="pl-f" d="M0,420H800M0,460H800" />
        {/* The post, and the gold garment hung on it. */}
        <path className="pl-l" d="M400,470V250M380,262H420" />
        <Fade frame={frame} on={4} off={5} from="grow" at={3}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <path
              className="pl-m"
              d="M384,262h32l6,64c-10,8 -34,8 -44,0Z"
            />
          </Ambient>
          <path
            className="pl-f"
            d="M384,262h32l6,64c-10,8 -34,8 -44,0ZM392,262c2,10 14,10 16,0M386,290h28"
          />
        </Fade>
        <Fade frame={frame} on={4} off={5} from="left" at={5}>
          <Person x={250} y={470} s={1.3} pose="bow" robe="g" />
          <Person x={310} y={478} s={1.2} pose="bow" robe="c" cloak="b" />
          <Person x={530} y={474} s={1.3} pose="bow" face={-1} robe="b" />
        </Fade>
        <Person
          x={460}
          y={470}
          s={1.6}
          face={-1}
          robe="p"
          cloak="g"
          head="cloth"
        />
      </Scene>

      {/* 5. No king: an empty seat by the gate, and everyone going away. */}
      <Scene frame={frame} k={5}>
        <Hills
          y={300}
          peaks={[
            [160, 50],
            [660, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <CityWall x={400} y={380} w={460} tone="c" hatch={h.h3} />
        <Ink d="M-10,510V380H810V510Z" tone="g" />
        <path
          className="pl-f"
          d="M400,384L120,500M400,384L700,500M400,384L-10,430M400,384L810,420"
        />
        <Seat x={540} y={446} s={2.2} />
        <Fade frame={frame} on={5} off={6} at={4}>
          <Person x={200} y={470} s={1.2} pose="walk" face={-1} robe="g" />
          <Person x={620} y={466} s={1.2} pose="walk" robe="c" cloak="b" />
          <Person
            x={80}
            y={434}
            s={0.9}
            pose="walk"
            face={-1}
            robe="b"
            head="veil"
          />
          <Person x={740} y={430} s={0.9} pose="walk" robe="p" head="cloth" />
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
