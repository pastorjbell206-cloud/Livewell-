/**
 * "Mark: the story at a run": a film for one whole book, from the book's
 * own page (bible/notes/mark/intro.json) and its chapter notes.
 *
 *   0  The story at a run       nets left on the shore
 *   1  How it is laid out       Galilee, the road, Jerusalem, the hill, the tomb
 *   2  Who is this man?         the storm stilled
 *   3  The way of the cross     the road up to Jerusalem
 *   4  Friends who fail         Peter in the courtyard
 *   5  Who sees it first        the centurion at the foot of the hill
 *   6  Where to start           the reader and the open scroll
 *
 * God is never drawn. Jesus is one plain figure, the same robe and cloak in
 * every picture. The cross is not drawn: the hill's top is out of the
 * picture, and only the soldier who looks up is shown. The one mustard
 * mark: the sun (0, 3), the rule under the road (1), the first light of
 * morning (4), the light on the hill (5), the marker (6); the boat (2) has
 * none.
 */
import {
  Boat,
  CityWall,
  Cloud,
  Hills,
  Ink,
  Mountain,
  Person,
  Stars,
  Sun,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The chapters in each part of the second picture, the book page's
 * structure rounded to whole chapters: Galilee (1 to 8), on the way (9 and
 * 10), Jerusalem (11 to 13), the passion (14 and 15), the empty tomb (16).
 * The hinge, Peter's confession, is at 8:27, the end of the first panel.
 */
export const LAYOUT = [8, 2, 3, 2, 1];

const Jesus = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "open" | "reach";
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
  [420, 320, 1.12],
  [400, 250, 1.06],
  [400, 300, 1.14],
  [440, 300, 1.12],
  [380, 320, 1.14],
  [360, 300, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). At once they left their nets. */}
      <FirstScene frame={frame}>
        <Sun x={660} y={90} r={30} gold />
        <Hills
          y={260}
          peaks={[
            [200, 40],
            [600, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,400V262H810V400Z" tone="b" />
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Water x={10} y={290} w={790} rows={4} gap={24} />
        </Ambient>
        <Ink d="M-10,510V390C240,372 560,384 810,372V510Z" tone="c" />
        <Boat x={130} y={404} s={1.3} />
        {/* The nets, left on the shore. */}
        <path
          className="pl-f"
          d="M210,460C240,440 280,440 310,460M216,468C244,452 276,452 304,468M226,444v30M246,440v34M266,440v34M286,444v28"
        />
        <Jesus x={640} y={470} pose="walk" />
        <Fade frame={frame} on={-1} off={1} from="walk-left" at={3}>
          <Person x={500} y={474} s={1.6} pose="walk" robe="g" head="bare" />
          <Person x={410} y={478} s={1.6} pose="walk" robe="c" cloak="g" />
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
              <Boat x={mid} y={top + 4} s={0.5} />
            ) : i === 1 ? (
              <path
                className="pl-l"
                d={`M${mid - 30},${top}C${mid - 10},${top - 26} ${mid + 6},${top - 4} ${mid + 30},${top - 30}`}
              />
            ) : i === 2 ? (
              <CityWall x={mid} y={top} w={90} s={0.45} />
            ) : i === 3 ? (
              <Ink
                d={`M${mid - 30},${top}C${mid - 16},${top - 34} ${mid + 16},${top - 34} ${mid + 30},${top}Z`}
                tone="g"
              />
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

      {/* 2. "Who is this?" The storm stilled. */}
      <Scene frame={frame} k={2}>
        <Ambient frame={frame} on={2} off={3} kind="drift" dx={70}>
          <Cloud x={160} y={90} s={1.6} />
          <Cloud x={620} y={70} s={1.3} />
        </Ambient>
        <Hills
          y={250}
          peaks={[
            [160, 30],
            [640, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V252H810V510Z" tone="b" />
        <Water x={10} y={290} w={790} rows={8} gap={26} />
        <Boat x={400} y={420} s={3} />
        <Jesus x={420} y={388} s={1.3} pose="reach" />
        <Fade frame={frame} on={2} off={3} from="up" at={4}>
          <Person x={310} y={392} s={1.1} pose="kneel" robe="g" head="bare" />
          <Person x={500} y={394} s={1.1} pose="kneel" face={-1} robe="c" />
        </Fade>
      </Scene>

      {/* 3. On the way. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={600} y={90} r={34} gold />
          </Ambient>
        </Fade>
        <Hills y={370} peaks={[[600, 130]]} tone="c" hatch={h.hs} />
        <CityWall x={600} y={244} w={220} s={0.9} />
        <Ink d="M-10,510V400C240,384 560,392 810,380V510Z" tone="c" />
        <path
          className="pl-f"
          d="M60,500C260,470 480,400 584,246M160,500C340,480 540,410 614,246"
        />
        <Jesus x={420} y={440} s={1.5} pose="walk" />
        <Fade frame={frame} on={3} off={4} from="walk-left" at={3}>
          <Person x={300} y={466} s={1.4} pose="walk" robe="g" head="bare" />
          <Person x={220} y={476} s={1.4} pose="walk" robe="c" cloak="g" />
          <Person x={140} y={484} s={1.4} pose="walk" robe="b" />
          <Person x={60} y={490} s={1.4} pose="walk" robe="c" cloak="b" />
        </Fade>
      </Scene>

      {/* 4. Peter in the courtyard. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.h2} d="M0,0H800V400H0Z" />
        <Ink d="M-10,400V120H810V400Z" tone="b" hatch={h.h1} />
        <path className="pl-l" d="M-10,120H810" />
        <path className="pl-paper" d="M600,180h90v110h-90Z" />
        <Fade frame={frame} on={4} off={5} at={8}>
          <path className="pl-m" d="M600,250h90v40h-90Z" />
        </Fade>
        <path className="pl-l" d="M600,180h90v110h-90Z" />
        <Stars
          at={[
            [624, 204, 3],
            [664, 222, 3],
          ]}
        />
        <Ink d="M-10,510V400H810V510Z" tone="c" hatch={h.hs} />
        {/* The fire, and those who sit at it. */}
        <path className="pl-l" d="M470,470L520,456M474,456L524,470" />
        <path
          className="pl-c"
          d="M498,456C510,440 514,428 508,412C496,426 490,440 498,456Z"
        />
        <path
          className="pl-f"
          d="M498,456C510,440 514,428 508,412C496,426 490,440 498,456Z"
        />
        <Person x={420} y={478} s={1.3} pose="sit" robe="c" head="bare" />
        <Person
          x={590}
          y={478}
          s={1.3}
          pose="sit"
          face={-1}
          robe="g"
          head="veil"
        />
        <Person x={210} y={474} s={1.7} face={-1} pose="bow" robe="g" />
      </Scene>

      {/* 5. The centurion. The hill's top is out of the picture. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.h2} d="M0,0H800V500H0Z" />
        <Fade frame={frame} on={5} off={6} from="down" at={5}>
          <path className="pl-paper" d="M440,0H640L700,150H380Z" />
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path className="pl-m" d="M480,0H600L616,40H464Z" />
          </Ambient>
          <path
            className="pl-f"
            d="M540,46V140M500,46L470,140M580,46L610,140"
          />
        </Fade>
        <Ink
          d="M260,510C320,300 420,140 560,60C640,20 740,10 810,10V510Z"
          tone="b"
          hatch={h.h1}
        />
        <Ink
          d="M-10,510V430C120,416 260,424 360,440L300,510Z"
          tone="c"
          hatch={h.hs}
        />
        <Person
          x={170}
          y={476}
          s={1.8}
          robe="c"
          cloak="b"
          head="bare"
          staff="spear"
        />
        {/* His helmet, taken off, on the ground. */}
        <Ink d="M250,476c0,-22 36,-22 36,0Z" tone="b" />
        <path className="pl-l" d="M268,460v-10" />
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
