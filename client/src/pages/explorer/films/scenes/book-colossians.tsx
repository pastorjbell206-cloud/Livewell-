/**
 * "Colossians: complete in Christ": a film for one whole book, from the
 * book's own page (bible/notes/colossians/intro.json) and its chapter notes.
 *
 *   0  A letter to a church Paul never saw  a traveller in the Lycus valley
 *   1  How it is laid out                   who Christ is; how believers live
 *   2  The song of Christ                   all things held together in one ring
 *   3  Full                                 a tree in the sun, and its shadow
 *   4  New clothes                          the old cloak let fall, the new put on
 *   5  In the Lord                          a family at table, a man at his bench
 *   6  Where to start                       the reader and the open scroll
 *
 * Christ and God are never drawn: the song is all that was made, held in one
 * ring, with no one in it. No household rank is drawn, and no one is drawn
 * ruling another. The one mustard mark: the rule under the first half (1),
 * the sun (2, 3), the sash of love (4), the marker (6); the valley (0) and
 * the home (5) have none.
 */
import {
  CityWall,
  Grass,
  Hills,
  House,
  Ink,
  Olive,
  Person,
  Stars,
  Sun,
  Table,
  Water,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Who Christ is (1 and 2); how believers live (3 and 4). */
export const LAYOUT = [2, 2];

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 250, 1.02],
  [400, 330, 1.12],
  [400, 330, 1.14],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A traveller in the Lycus valley. */}
      <FirstScene frame={frame}>
        <Sun x={120} y={90} r={22} />
        <Hills
          y={280}
          peaks={[
            [200, 80],
            [600, 100],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <CityWall x={200} y={210} w={180} s={0.6} hatch={h.h3} />
        <CityWall x={600} y={190} w={200} s={0.6} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V300C240,290 560,292 810,300V510Z" tone="g" />
        <path className="pl-paper" d="M-10,330C240,320 560,322 810,330V348C560,340 240,338 -10,350Z" />
        <Water x={0} y={336} w={800} rows={1} />
        <House x={560} y={420} s={0.8} hatch={h.h3} />
        <House x={640} y={414} s={0.6} tone="b" hatch={h.h3} />
        <path className="pl-f" d="M-10,480C200,470 400,440 540,424" />
        <Fade frame={frame} on={-1} off={1} from="left" at={3}>
          <Person
            x={300}
            y={466}
            s={1.4}
            pose="walk"
            robe="g"
            cloak="c"
            head="cloth"
            staff="staff"
            bundle
          />
        </Fade>
        <Grass
          at={[
            [100, 490],
            [720, 470],
          ]}
        />
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
                <Sun x={mid - 30} y={top - 18} r={10} />
                <Stars
                  at={[
                    [mid + 10, top - 26, 4],
                    [mid + 34, top - 12, 5],
                  ]}
                />
              </>
            ) : (
              <House x={mid} y={top} s={0.4} hatch={h.h3} />
            )
          }
        />
      </Scene>

      {/* 2. The song of Christ: all things held together in one ring. */}
      <Scene frame={frame} k={2}>
        <path
          className="pl-l"
          d="M190,250a210,210 0 1,0 420,0a210,210 0 1,0 -420,0Z"
        />
        <path
          className="pl-f"
          d="M204,250a196,196 0 1,0 392,0a196,196 0 1,0 -392,0Z"
        />
        <Fade frame={frame} on={2} off={3} at={2}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={400} y={110} r={26} gold />
          </Ambient>
        </Fade>
        <Fade frame={frame} on={2} off={3} at={4}>
          <Stars
            at={[
              [290, 140, 5],
              [510, 140, 5],
              [250, 200, 4],
              [550, 200, 4],
            ]}
          />
        </Fade>
        <Fade frame={frame} on={2} off={3} at={6}>
          <Ink
            d="M230,320C280,260 340,270 380,300C420,270 500,250 570,320Z"
            tone="g"
            hatch={h.hs}
          />
        </Fade>
        <Fade frame={frame} on={2} off={3} at={8}>
          <Water x={250} y={330} w={300} rows={2} gap={14} />
          <Olive x={300} y={420} s={0.9} />
          <Wheat x={460} y={410} s={1} />
          <Wheat x={490} y={414} s={1} />
          <Grass
            at={[
              [380, 420],
              [540, 400],
            ]}
          />
        </Fade>
      </Scene>

      {/* 3. A tree in the sun, and its long shadow. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={2}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={110} y={110} r={30} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V360C240,352 560,352 810,360V510Z" tone="g" />
        <path className="pl-f" d="M-10,440C240,430 560,430 810,440" />
        {/* The shadow the tree casts, long across the path. */}
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ink d="M340,456C420,440 600,450 760,470C700,490 500,492 340,470Z" tone="b" hatch={h.hs} />
        </Fade>
        <Ambient frame={frame} on={3} off={4} kind="sway">
          <Olive x={330} y={460} s={2.8} hatch={h.h2} />
        </Ambient>
        <Fade frame={frame} on={3} off={4} from="right" at={6}>
          <Person x={620} y={460} s={1.3} pose="walk" face={-1} robe="p" cloak="c" head="veil" />
          <Person x={690} y={464} s={1} pose="walk" face={-1} robe="g" child head="bare" />
        </Fade>
      </Scene>

      {/* 4. The old cloak let fall; the new one put on, and love over all. */}
      <Scene frame={frame} k={4}>
        <Hills
          y={340}
          peaks={[
            [160, 50],
            [640, 70],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C240,370 560,370 810,380V510Z" tone="g" />
        {/* The old cloak, torn, on the ground. */}
        <Ink d="M210,480c10,-20 60,-24 90,-10l-8,6l10,4c-30,10 -70,10 -92,0Z" tone="b" hatch={h.h2} />
        <Person x={360} y={470} s={1.9} robe="c" cloak="g" head="bare" />
        <Fade frame={frame} on={4} off={5} from="grow" at={5}>
          <path className="pl-m" d="M340,388l42,-10v8l-42,10Z" />
          <path className="pl-f" d="M340,388l42,-10v8l-42,10Z" />
        </Fade>
        <Fade frame={frame} on={4} off={5} from="right" at={3}>
          <Person x={490} y={470} s={1.8} face={-1} pose="reach" robe="p" cloak="b" head="cloth" />
        </Fade>
      </Scene>

      {/* 5. A family at table by the house; a man at his bench. */}
      <Scene frame={frame} k={5}>
        <Sun x={680} y={110} r={24} />
        <House x={220} y={400} s={1.6} hatch={h.h3} />
        <Ink d="M-10,510V400H810V510Z" tone="c" />
        <Table x={420} y={470} s={1.4} />
        <Person x={340} y={470} s={1.3} pose="sit" robe="g" cloak="c" head="veil" />
        <Person x={500} y={470} s={1.3} face={-1} pose="sit" robe="b" head="cloth" />
        <Person x={420} y={474} s={0.9} pose="sit" robe="p" child head="bare" />
        <Fade frame={frame} on={5} off={6} from="right" at={4}>
          <Ink d="M610,440H740V452H610Z" tone="c" />
          <path className="pl-l" d="M620,452V480M730,452V480" />
          <Person x={680} y={480} s={1.4} pose="reach" face={-1} robe="c" cloak="b" head="bare" />
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
