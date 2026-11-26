/**
 * "Deuteronomy: love the LORD with all your heart": a film for one whole
 * book, from the book's own page (bible/notes/deuteronomy/intro.json) and
 * its chapter notes.
 *
 *   0  Moses says goodbye        Moses preaching on the plains of Moab
 *   1  How it is laid out        three addresses and a farewell
 *   2  The Shema                 a parent and child at home, the doorpost
 *   3  Chosen in love            a family looking back along the road
 *   4  Whose side the laws take  wages paid at sunset, the gleaners
 *   5  Choose life               Moses alone on the mountain, the land below
 *   6  Where to start            the reader and the open scroll
 *
 * No war, city, weapon or death is drawn, and Moses' death is not pictured:
 * he stands on the mountain looking out. God is never drawn. Moses has the
 * same robe, cloak and staff in each picture he is in. The one mustard
 * mark: the rule under the Shema's address (1), the case on the doorpost
 * (2), the sun (3, 4), the marker (6); the plain (0) and the mountain (5)
 * have none.
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Mountain,
  Person,
  Sun,
  Water,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The book page's six parts in whole chapters: 1-4, 5-11, 12-26, 27-28, 29-30, 31-34. */
export const LAYOUT = [4, 7, 15, 2, 2, 4];

const Moses = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "open";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="c"
    cloak="b"
    head="cloth"
    staff="staff"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 330, 1.12],
  [400, 320, 1.1],
  [400, 330, 1.12],
  [400, 270, 1.0],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Moses preaching on the plains of Moab. */}
      <FirstScene frame={frame}>
        <Hills
          y={260}
          peaks={[
            [300, 50],
            [640, 70],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <path className="pl-paper" d="M-10,262H810V290H-10Z" />
        <Water x={0} y={272} w={800} rows={1} />
        <path className="pl-l" d="M-10,262H810M-10,290H810" />
        <Ink d="M-10,510V290H810V510Z" tone="c" />
        <Ink d="M-10,510V400C60,380 160,380 220,410V510Z" tone="b" />
        <Moses x={150} y={404} s={1.7} pose="open" face={1} />
        <Fade frame={frame} on={-1} off={1} from="right" at={3}>
          {[300, 370, 440, 510, 580, 650, 720].map((x, i) => (
            <Person
              key={x}
              x={x}
              y={460 + (i % 3) * 10}
              s={1.1}
              face={-1}
              robe={(["g", "p", "b", "c"] as const)[i % 4]}
              head={i % 2 ? "veil" : "cloth"}
              child={i === 3}
            />
          ))}
        </Fade>
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
              <path
                className="pl-l"
                d={`M${mid - 24},${top}C${mid - 8},${top - 14} ${mid + 6},${top - 6} ${mid + 24},${top - 26}`}
              />
            ) : i === 1 ? (
              <Ink
                d={`M${mid - 16},${top}v-22c0,-8 14,-8 14,0v22ZM${mid + 2},${top}v-22c0,-8 14,-8 14,0v22Z`}
                tone="c"
              />
            ) : i === 2 ? (
              <House x={mid} y={top} s={0.36} hatch={h.h3} />
            ) : i === 3 ? (
              <Mountain x={mid} y={top} w={30} h={24} tone="g" />
            ) : i === 4 ? (
              <path
                className="pl-l"
                d={`M${mid - 12},${top}v-16l-6,-10M${mid - 12},${top - 16}h18l6,-12M${mid + 6},${top - 16}v16`}
              />
            ) : (
              <Mountain x={mid} y={top} w={44} h={36} tone="b" />
            )
          }
        />
      </Scene>

      {/* 2. A parent and child at home; the words on the doorpost. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,-10H810V410H-10Z" tone="c" hatch={h.h3} />
        <path className="pl-paper" d="M540,410V140H700V410Z" />
        <path className="pl-l" d="M540,410V140H700V410" />
        <Fade frame={frame} on={2} off={3} from="grow" at={5}>
          <path className="pl-m" d="M524,230h10v40h-10Z" />
          <path className="pl-f" d="M524,230h10v40h-10Z" />
        </Fade>
        <Ink d="M-10,510V410H810V510Z" tone="b" />
        <Person x={320} y={470} s={1.7} pose="sit" robe="g" cloak="c" head="veil" />
        <Person x={430} y={474} s={1.1} pose="sit" face={-1} robe="p" child head="bare" />
      </Scene>

      {/* 3. A family looking back along the road through the desert. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={2}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={140} y={250} r={34} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V290C200,280 500,282 810,300V510Z" tone="c" />
        <path className="pl-f" d="M120,300C260,330 420,380 560,440" />
        <Ink d="M480,510V440C560,400 700,400 810,410V510Z" tone="g" />
        <Person x={600} y={440} s={1.6} face={-1} robe="b" cloak="c" head="cloth" />
        <Person x={670} y={444} s={1.5} face={-1} robe="g" head="veil" />
        <Person x={730} y={450} s={1} face={-1} robe="p" child head="bare" />
      </Scene>

      {/* 4. Wages paid at sunset; the widow and child gleaning. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} at={2}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={660} y={240} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={300}
          peaks={[
            [200, 40],
            [520, 30],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V340C240,334 560,334 810,340V510Z" tone="c" />
        <Ambient frame={frame} on={4} off={5} kind="sway">
          <Wheat x={60} y={420} s={1.2} />
          <Wheat x={110} y={426} s={1.1} />
          <Wheat x={160} y={420} s={1.2} />
        </Ambient>
        <Person x={420} y={470} s={1.6} pose="reach" robe="p" cloak="g" head="cloth" />
        <Person x={510} y={472} s={1.6} face={-1} pose="reach" robe="b" head="bare" />
        <Fade frame={frame} on={4} off={5} from="left" at={5}>
          <Person x={220} y={470} s={1.4} pose="bow" robe="g" cloak="b" head="veil" />
          <Person x={290} y={474} s={0.9} pose="bow" robe="c" child head="bare" />
        </Fade>
      </Scene>

      {/* 5. Moses alone on the mountain, the land below. */}
      <Scene frame={frame} k={5}>
        <Hills
          y={380}
          peaks={[
            [520, 40],
            [720, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <path className="pl-paper" d="M380,420C500,410 650,420 810,412V430C650,438 500,428 380,440Z" />
        <path className="pl-l" d="M380,420C500,410 650,420 810,412M380,440C500,428 650,438 810,430" />
        <Ink d="M-10,510V200C100,180 200,180 280,230C340,280 360,400 400,510Z" tone="b" hatch={h.hs} />
        <Moses x={170} y={192} s={1.4} pose="stand" face={1} />
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
