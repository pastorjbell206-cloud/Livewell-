/**
 * "Luke: good news for the lost": a film for one whole book, from the
 * book's own page (bible/notes/luke/intro.json) and its chapter notes.
 *
 *   0  An orderly account       shepherds on the hillside at night
 *   1  How it is laid out       births, Galilee, the road, the city, the end
 *   2  People others passed over   Jesus with those at the edge of town
 *   3  The lost, found          the father running down the road
 *   4  Prayer                   Jesus praying alone at dawn
 *   5  Today, and joy           the table at Emmaus
 *   6  Where to start           the reader and the open scroll
 *
 * God is never drawn. Jesus is one plain figure, the same robe and cloak in
 * every picture. The cross is not drawn. The one mustard mark: a light in
 * the sky (0), the rule under the road (1), the sun (3), the dawn (4), a
 * lamp's flame (5), the marker (6); the edge of town (2) has none.
 */
import {
  Boat,
  CityWall,
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Sheep,
  Stars,
  Sun,
  Table,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import {
  FirstScene,
  GoldStar,
  Layout,
  Scene,
  StartReading,
} from "./book-parts";

/**
 * The chapters in each part of the second picture, the book page's
 * structure rounded to whole chapters: the births of John and Jesus (1 and
 * 2), the preparation and Galilee (3 to 9), the road to Jerusalem (10 to
 * 19), teaching in Jerusalem (20 and 21), the passion (22 and 23), the
 * resurrection (24). The road begins at 9:51, the end of the second panel.
 */
export const LAYOUT = [2, 7, 10, 2, 2, 1];

const Jesus = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "open" | "sit" | "reach" | "kneel";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.7}
    face={p.face}
    pose={p.pose}
    robe="p"
    cloak="b"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.12],
  [400, 250, 1.06],
  [400, 330, 1.14],
  [420, 320, 1.14],
  [380, 320, 1.14],
  [400, 340, 1.16],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Good news of great joy. */}
      <FirstScene frame={frame}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V390H0Z" />
        <Ambient frame={frame} on={-1} off={1} kind="twinkle">
          <Stars
            at={[
              [80, 80, 4],
              [190, 150, 3],
              [300, 70, 3],
              [660, 130, 4],
              [730, 60, 3],
              [120, 240, 3],
              [600, 230, 3],
            ]}
          />
        </Ambient>
        <path className="pl-paper" d="M400,60a56,56 0 1,0 0.1,0Z" />
        <Ambient frame={frame} on={-1} off={1} kind="glow">
          <GoldStar x={400} y={116} r={16} />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [200, 30],
            [620, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink
          d="M-10,510V410C240,396 560,400 810,410V510Z"
          tone="b"
          hatch={h.hs}
        />
        <Person x={300} y={470} s={1.6} robe="c" cloak="g" staff="crook" />
        <Person x={420} y={474} s={1.5} pose="pray" robe="g" head="bare" />
        <Person
          x={520}
          y={478}
          s={1.0}
          pose="pray"
          robe="b"
          child
          head="bare"
        />
        <Sheep x={160} y={480} s={1.3} />
        <Sheep x={620} y={478} s={1.3} face={-1} />
        <Sheep x={700} y={488} s={1.1} lamb face={-1} />
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
              <>
                <Ink d={`M${mid - 18},${top}l6,-16h24l6,16Z`} tone="c" />
                <path
                  className="pl-l"
                  d={`M${mid - 12},${top}v8M${mid + 12},${top}v8`}
                />
              </>
            ) : i === 1 ? (
              <Boat x={mid} y={top + 4} s={0.5} />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 60},${top}C${mid - 30},${top - 30} ${mid},${top - 4} ${mid + 30},${top - 24}S${mid + 54},${top - 36} ${mid + 60},${top - 38}`}
              />
            ) : i === 3 ? (
              <CityWall x={mid} y={top} w={80} s={0.4} />
            ) : i === 4 ? (
              <Ink
                d={`M${mid - 22},${top}C${mid - 12},${top - 28} ${mid + 12},${top - 28} ${mid + 22},${top}Z`}
                tone="g"
              />
            ) : (
              <>
                <Ink d={`M${mid - 18},${top}c0,-30 36,-30 36,0Z`} tone="c" />
                <path
                  className="pl-k"
                  d={`M${mid - 7},${top}v-10c0,-9 14,-9 14,0v10Z`}
                />
              </>
            )
          }
        />
      </Scene>

      {/* 2. The people others passed over. */}
      <Scene frame={frame} k={2}>
        <Sun x={690} y={80} r={22} />
        <Hills
          y={370}
          peaks={[
            [200, 40],
            [560, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M620,410V200H810V410Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M610,200H810" />
        <Ink d="M-10,510V400C240,388 560,392 810,400V510Z" tone="c" />
        <Jesus x={250} y={474} s={1.8} pose="reach" />
        <Person x={400} y={476} s={1.5} face={-1} robe="b" head="veil" />
        <Fade frame={frame} on={2} off={3} from="right" at={3}>
          <Person
            x={490}
            y={478}
            s={1.5}
            face={-1}
            robe="g"
            head="bare"
            staff="staff"
          />
          <Person
            x={560}
            y={484}
            s={1.0}
            face={-1}
            robe="c"
            child
            head="bare"
          />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="right" at={6}>
          <Person
            x={700}
            y={470}
            s={1.5}
            pose="sit"
            face={-1}
            robe="g"
            cloak="c"
          />
        </Fade>
        <Grass
          at={[
            [120, 470],
            [330, 484],
          ]}
        />
      </Scene>

      {/* 3. The father runs. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={160} y={100} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={370}
          peaks={[
            [200, 60],
            [640, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <House x={150} y={380} s={1.5} hatch={h.h3} />
        <Ink d="M-10,510V400C240,384 560,392 810,380V510Z" tone="c" />
        <path
          className="pl-f"
          d="M200,400C380,420 600,440 800,440M210,420C400,446 620,470 800,476"
        />
        <Fade frame={frame} on={3} off={4} from="walk-left" at={2}>
          <Person x={380} y={470} s={1.7} pose="open" robe="c" cloak="b" />
        </Fade>
        <Person
          x={610}
          y={476}
          s={1.5}
          face={-1}
          pose="bow"
          robe="g"
          head="bare"
        />
        <Grass
          at={[
            [500, 420],
            [720, 420],
          ]}
        />
      </Scene>

      {/* 4. He prays. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V300H0Z" />
        <Fade frame={frame} on={4} off={5} at={6}>
          <path
            className="pl-m"
            d="M360,296C500,286 660,288 800,298V306C660,296 500,294 360,304Z"
          />
        </Fade>
        <Hills
          y={310}
          peaks={[
            [520, 10],
            [700, 22],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink
          d="M-10,510V380C120,330 320,320 440,370C520,402 600,440 680,510Z"
          tone="g"
          hatch={h.h2}
        />
        <Jesus x={300} y={360} s={1.7} pose="kneel" />
        <Fade frame={frame} on={4} off={5} from="right" at={4}>
          <Person
            x={620}
            y={470}
            s={1.2}
            pose="sit"
            face={-1}
            robe="g"
            head="bare"
          />
          <Person
            x={690}
            y={478}
            s={1.2}
            pose="sit"
            face={-1}
            robe="c"
            cloak="g"
          />
        </Fade>
      </Scene>

      {/* 5. The table at Emmaus. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V400H0Z" />
        <Ink d="M-10,400V100H810V400Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M-10,100H810" />
        <path className="pl-k" d="M620,160h80v100h-80Z" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Jesus x={400} y={450} s={1.6} pose="open" />
        <Table x={400} y={482} s={2.2} />
        <Fade frame={frame} on={5} off={6} from="grow" at={3}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Lamp x={480} y={414} s={1.3} gold />
          </Ambient>
        </Fade>
        <Person x={190} y={478} s={1.6} pose="sit" robe="g" cloak="c" />
        <Person
          x={610}
          y={478}
          s={1.6}
          pose="sit"
          face={-1}
          robe="c"
          head="bare"
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
