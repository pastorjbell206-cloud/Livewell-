/**
 * "Matthew: God with us": a film for one whole book, from the book's own
 * page (bible/notes/matthew/intro.json) and its chapter notes.
 *
 *   0  God with us              a house in Bethlehem; a star
 *   1  How it is laid out       story and speech, five times; then the end
 *   2  Promises kept            a scroll read in the synagogue
 *   3  The kingdom of heaven    the teaching on the hill
 *   4  Who he is                Peter's answer on the road
 *   5  Israel and all nations   the mountain in Galilee
 *   6  Where to start           the reader and the open scroll
 *
 * God is never drawn. Jesus is one plain figure, the same robe and cloak in
 * every picture, as in the other films; the child is a small bundle in his
 * mother's arms. The cross is not drawn. The one mustard mark: a star (0),
 * the rule under the sermon (1), a lamp's flame (2), the sun (3, 5), the
 * marker (6); the road (4) has none.
 */
import {
  Boat,
  CityWall,
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Mountain,
  Person,
  Scroll,
  Stars,
  Sun,
  Wheat,
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
 * structure rounded to whole chapters: the origins of the Messiah (1 to 4),
 * the Sermon on the Mount (5 to 7), his deeds and the mission (8 to 10),
 * rejection and the parables (11 to 13), who he is and the way of the cross
 * (14 to 18), Jerusalem and the end of the age (19 to 25), the passion and
 * the resurrection (26 to 28).
 */
export const LAYOUT = [4, 3, 3, 3, 5, 7, 3];

const Jesus = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "open" | "sit" | "reach";
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
  [440, 320, 1.14],
  [400, 250, 1.06],
  [400, 320, 1.14],
  [420, 300, 1.12],
  [400, 330, 1.14],
  [400, 310, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Immanuel. */}
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
              [360, 210, 3],
            ]}
          />
        </Ambient>
        <GoldStar x={500} y={110} r={12} />
        <path
          className="pl-f"
          d="M500,136V200M488,138L480,192M512,138L520,192"
        />
        <Hills
          y={390}
          peaks={[
            [200, 24],
            [640, 30],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <House x={500} y={430} s={2.2} hatch={h.h3} />
        <House x={170} y={410} s={0.9} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V430H810V510Z" tone="b" hatch={h.hs} />
        <Person x={330} y={482} s={1.6} robe="c" cloak="g" staff="staff" />
        <Person x={410} y={484} s={1.5} pose="hold" robe="b" head="veil" />
        {/* The child, wrapped, in her arms. */}
        <Ink d="M418,392c14,-8 34,-4 36,8c-2,12 -24,14 -36,6Z" />
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
              <Stars at={[[mid, top - 20, 6]]} />
            ) : i === 1 ? (
              <Mountain x={mid} y={top} w={60} h={40} tone="g" />
            ) : i === 2 ? (
              <Boat x={mid} y={top + 4} s={0.45} />
            ) : i === 3 ? (
              <Wheat x={mid} y={top} s={0.9} />
            ) : i === 4 ? (
              <path
                className="pl-l"
                d={`M${mid - 30},${top}C${mid - 10},${top - 26} ${mid + 6},${top - 4} ${mid + 30},${top - 30}`}
              />
            ) : i === 5 ? (
              <CityWall x={mid} y={top} w={90} s={0.45} />
            ) : (
              <>
                <Ink d={`M${mid - 22},${top}c0,-34 44,-34 44,0Z`} tone="c" />
                <path
                  className="pl-k"
                  d={`M${mid - 8},${top}v-12c0,-10 16,-10 16,0v12Z`}
                />
              </>
            )
          }
        />
      </Scene>

      {/* 2. Promises kept: the scroll read aloud. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,400V80H810V400Z" tone="c" hatch={h.hs} />
        <Ink d="M100,400V60H150V400ZM650,400V60H700V400Z" tone="c" />
        <path className="pl-l" d="M90,60H160M640,60H710" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <path className="pl-l" d="M400,80V150" />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <Ambient frame={frame} on={2} off={3} kind="flicker">
            <Lamp x={396} y={176} s={1.6} gold />
          </Ambient>
        </Fade>
        {/* The reader, and the scroll. */}
        <Ink d="M340,470V420H460V470Z" tone="c" />
        <Person x={300} y={470} s={1.7} pose="reach" robe="g" cloak="c" />
        <Scroll x={400} y={416} s={1.5} />
        <Fade frame={frame} on={2} off={3} from="right" at={5}>
          <Jesus x={560} y={476} s={1.5} pose="sit" face={-1} />
          <Person x={650} y={480} s={1.4} pose="sit" face={-1} robe="c" />
          <Person
            x={730}
            y={476}
            s={1.4}
            pose="sit"
            face={-1}
            robe="b"
            cloak="g"
          />
        </Fade>
        <Person x={170} y={478} s={1.4} pose="sit" robe="b" head="bare" />
      </Scene>

      {/* 3. The teaching on the hill. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={650} y={90} r={32} gold />
          </Ambient>
        </Fade>
        <Hills y={380} peaks={[[520, 150]]} tone="g" hatch={h.hs} />
        <Ink d="M-10,510V410C240,396 560,400 810,410V510Z" tone="g" />
        <Jesus x={520} y={300} s={1.4} pose="sit" face={-1} />
        <Fade frame={frame} on={3} off={4} from="up" at={3}>
          <Person x={330} y={400} s={1.2} pose="sit" robe="c" cloak="g" />
          <Person x={400} y={370} s={1.1} pose="sit" robe="b" head="veil" />
          <Person x={250} y={440} s={1.3} pose="sit" robe="g" />
          <Person x={170} y={474} s={1.4} pose="sit" robe="b" cloak="c" />
          <Person
            x={420}
            y={456}
            s={1.0}
            pose="sit"
            robe="c"
            child
            head="bare"
          />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="up" at={7}>
          <Person x={330} y={482} s={1.4} pose="sit" robe="p" head="veil" />
          <Person
            x={520}
            y={478}
            s={1.4}
            pose="sit"
            face={-1}
            robe="c"
            bundle
          />
          <Person
            x={620}
            y={440}
            s={1.3}
            pose="sit"
            face={-1}
            robe="g"
            cloak="b"
          />
        </Fade>
        <Grass
          at={[
            [90, 440],
            [700, 470],
          ]}
        />
      </Scene>

      {/* 4. "You are the Christ." */}
      <Scene frame={frame} k={4}>
        <Sun x={130} y={90} r={22} />
        <Hills
          y={360}
          peaks={[
            [180, 60],
            [620, 90],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Mountain x={640} y={360} w={300} h={170} tone="b" hatch={h.h1} />
        <Ink d="M-10,510V400C240,384 560,390 810,400V510Z" tone="c" />
        <path className="pl-f" d="M0,460C260,440 540,444 800,430" />
        <Jesus x={300} y={474} s={1.8} />
        <Person
          x={470}
          y={476}
          s={1.7}
          pose="reach"
          face={-1}
          robe="g"
          cloak="c"
        />
        <Fade frame={frame} on={4} off={5} from="right" at={4}>
          <Person x={600} y={470} s={1.4} face={-1} robe="b" />
          <Person x={670} y={480} s={1.4} face={-1} robe="c" cloak="b" />
          <Person x={740} y={470} s={1.4} face={-1} robe="p" cloak="g" />
        </Fade>
      </Scene>

      {/* 5. The mountain in Galilee: all nations. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} from="up" at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={640} y={150} r={38} gold />
          </Ambient>
        </Fade>
        <Hills
          y={300}
          peaks={[
            [560, 20],
            [720, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <House x={600} y={290} s={0.4} />
        <House x={690} y={280} s={0.35} tone="g" />
        <House x={760} y={296} s={0.35} tone="b" />
        <Ink
          d="M-10,510V340C120,300 320,300 460,360C560,400 680,440 810,450V510Z"
          tone="g"
          hatch={h.hs}
        />
        <Jesus x={330} y={380} s={1.7} pose="reach" />
        <Fade frame={frame} on={5} off={6} from="left" at={3}>
          <Person x={110} y={400} s={1.4} robe="g" cloak="c" />
          <Person x={180} y={416} s={1.4} robe="b" />
          <Person x={236} y={440} s={1.4} pose="kneel" robe="c" cloak="b" />
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
