/**
 * "Romans: the good news, set out": a film for one whole book, from the
 * book's own page (bible/notes/romans/intro.json) and its chapter notes.
 *
 *   0  A letter to Rome      Paul writing by lamplight; a far city
 *   1  How it is laid out    six blocks of one argument
 *   2  What is wrong         every kind of person on one level ground
 *   3  The gift              empty hands, open, in the light
 *   4  The new life          out through an open door; a chain left behind
 *   5  One people            one table, people in different dress
 *   6  Where to start        the reader and the open scroll
 *
 * Paul is drawn as "Romans 8:28" draws him (clay robe, blue cloak), so he
 * is the same man in both films. God is never drawn. The cross is not drawn
 * here. The one mustard mark: a lamp's flame (0, 5), the rule under the
 * gift (1), the sun (3, 4), the marker (6); the picture of what is wrong
 * (2) has none.
 */
import {
  CityWall,
  Cloud,
  Hills,
  Ink,
  Lamp,
  Olive,
  Person,
  Rays,
  Scroll,
  Stars,
  Sun,
  Table,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The chapters in each part of the second picture, the book page's "argument
 * in one page" rounded to whole chapters: the greeting, the theme and what
 * is wrong (1 to 3), what God has done (4 and 5), the new life (6 to 8), God
 * and Israel (9 to 11), the life that follows (12 to 15), and Paul's plans
 * and greetings (16).
 */
export const LAYOUT = [3, 2, 3, 3, 4, 1];

const CAMERA: [number, number, number][] = [
  [380, 330, 1.14],
  [400, 250, 1.06],
  [400, 330, 1.12],
  [400, 300, 1.14],
  [420, 320, 1.14],
  [400, 340, 1.14],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Paul writes to Rome. */}
      <FirstScene frame={frame}>
        <Ink d="M-10,400V60H810V400Z" tone="c" hatch={h.hs} />
        {/* The window, and the far city in it. */}
        <path className="pl-paper" d="M520,120H720V280H520Z" />
        <path className="fp-dark" fill={h.h1} d="M520,120H720V280H520Z" />
        <Stars
          at={[
            [560, 150, 3],
            [640, 140, 3],
            [690, 176, 3],
          ]}
        />
        <CityWall x={620} y={280} w={170} s={0.7} tone="b" />
        <path className="pl-l" d="M520,120H720V280H520ZM508,280H732" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Person x={300} y={470} s={2} pose="sit" robe="c" cloak="b" />
        <Ink d="M370,470V440H500V470Z" tone="c" />
        <Scroll x={430} y={436} s={1.2} />
        <path className="pl-l" d="M150,330H250" />
        <Ambient frame={frame} on={-1} off={1} kind="flicker">
          <Lamp x={200} y={328} s={1.6} gold />
        </Ambient>
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
              <>
                <Cloud x={mid} y={top - 14} s={0.7} />
                <path
                  className="pl-f"
                  d={`M${mid - 14},${top - 8}l-4,10M${mid},${top - 8}l-4,10M${mid + 14},${top - 8}l-4,10`}
                />
              </>
            ) : i === 1 ? (
              <>
                <Ink
                  d={`M${mid - 16},${top}v-22h32v22ZM${mid - 20},${top - 22}v-9h40v9Z`}
                  tone="c"
                />
                <path
                  className="pl-l"
                  d={`M${mid},${top}v-31M${mid},${top - 31}c-10,-14 -22,-4 0,0c22,-4 10,-14 0,0`}
                />
              </>
            ) : i === 2 ? (
              <Wheat x={mid} y={top} s={1} />
            ) : i === 3 ? (
              <Olive x={mid} y={top} s={0.7} />
            ) : i === 4 ? (
              <Table x={mid} y={top} s={0.6} />
            ) : (
              <Scroll x={mid} y={top} s={0.5} />
            )
          }
        />
      </Scene>

      {/* 2. What is wrong: everyone, on one level ground. */}
      <Scene frame={frame} k={2}>
        <path className="fp-dark" fill={h.h2} d="M0,0H800V400H0Z" />
        <Ink d="M-10,510V400H810V510Z" tone="b" hatch={h.hs} />
        <Person x={90} y={470} s={1.6} head="helmet" robe="b" staff="spear" />
        <Person x={210} y={470} s={1.6} pose="hold" robe="p" cloak="g" />
        <Scroll x={250} y={408} s={0.5} />
        <Person x={330} y={470} s={1.6} robe="c" head="veil" />
        <Person x={396} y={470} s={1.0} robe="g" child head="bare" />
        <Person x={480} y={470} s={1.6} robe="g" cloak="c" bundle />
        <Person x={590} y={470} s={1.6} robe="b" head="bare" />
        <Person x={700} y={470} s={1.6} head="crown" robe="c" cloak="b" />
      </Scene>

      {/* 3. The gift: empty hands, open. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} from="down" at={3}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={400} y={90} r={40} gold />
          </Ambient>
          <Rays x={400} y={140} reach={170} spread={120} n={7} />
        </Fade>
        <Hills
          y={390}
          peaks={[
            [180, 30],
            [640, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V410C240,394 560,400 810,410V510Z" tone="g" />
        <Person x={400} y={476} s={2} pose="open" robe="c" cloak="b" />
      </Scene>

      {/* 4. The new life: out through an open door. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} at={4}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={640} y={110} r={38} gold />
          </Ambient>
        </Fade>
        <Hills
          y={390}
          peaks={[
            [520, 30],
            [720, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        {/* The wall, and its door standing open. */}
        <Ink d="M-10,400V70H300V400Z" tone="b" hatch={h.h2} />
        <path
          className="pl-paper"
          d="M170,400V200C170,160 260,160 260,200V400Z"
        />
        <path
          className="pl-l"
          d="M170,400V200C170,160 260,160 260,200V400M-10,70H300V400"
        />
        <Ink d="M260,400V196L330,220V420Z" tone="c" />
        <Ink d="M-10,510V400C240,392 560,396 810,400V510Z" tone="g" />
        {/* The chain, broken, left behind. */}
        <path
          className="pl-l"
          d="M90,452a10,7 0 1,0 20,0a10,7 0 1,0 -20,0ZM112,452a10,7 0 1,0 20,0a10,7 0 1,0 -20,0ZM134,452a10,7 0 1,0 20,0M170,462a10,7 0 1,0 20,0a10,7 0 1,0 -20,0Z"
        />
        <Fade frame={frame} on={4} off={5} from="walk-left" at={2}>
          <Person x={440} y={470} s={1.9} pose="walk" robe="c" cloak="g" />
        </Fade>
      </Scene>

      {/* 5. One people at one table. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V400H0Z" />
        <Ink d="M-10,400V100H810V400Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M-10,100H810" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Table x={400} y={476} s={2.2} />
        <Fade frame={frame} on={5} off={6} from="grow" at={3}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Lamp x={400} y={408} s={1.4} gold />
          </Ambient>
        </Fade>
        <Person x={150} y={474} s={1.6} pose="sit" robe="b" cloak="c" />
        <Person x={240} y={480} s={1.5} pose="sit" robe="g" head="bare" />
        <Fade frame={frame} on={5} off={6} from="right" at={5}>
          <Person
            x={570}
            y={480}
            s={1.5}
            pose="sit"
            face={-1}
            robe="c"
            head="veil"
          />
          <Person
            x={660}
            y={474}
            s={1.6}
            pose="sit"
            face={-1}
            robe="p"
            cloak="g"
            head="bare"
          />
          <Person x={736} y={482} s={1.0} pose="sit" face={-1} robe="b" child />
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
