/**
 * "Philippians: joy in chains": a film for one whole letter, from the book's
 * own page (bible/notes/philippians/intro.json) and its chapter notes.
 *
 *   0  A thank-you letter            Paul in chains, the gift and the letter
 *   1  How it is laid out            four chapters, the hymn marked
 *   2  Joy                           hands lifted in the prison room
 *   3  The mind of Christ            a basin, and the road down and up
 *   4  All counted as loss           a runner, his fine things left behind
 *   5  Content in want and plenty    the same man at a bare and a full table
 *   6  Where to start                the reader and the open scroll
 *
 * The cross is named in words and never drawn; Christ is not drawn. Paul
 * wears the same robe in every picture. The one mustard mark: the light in
 * the window (0, 2), the rule (1), the sun (3), the line at the end of the
 * race (4), a lamp (5), the marker (6).
 */
import { Hills, Ink, Lamp, Person, Scroll, Sun, Table } from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Four chapters, as the book page's key chapters take them. */
export const LAYOUT = [1, 1, 1, 1];

const Paul = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "sit" | "hold" | "open" | "walk";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="c"
    head="bare"
  />
);

/** The prison room: stone courses, a small barred window with its light. */
const Room = ({ h, k, frame }: { h: { hs: string }; k: number; frame: number }) => (
  <>
    <Ink d="M-10,-10H810V420H-10Z" tone="c" hatch={h.hs} />
    <path className="pl-f" d="M0,120H800M0,240H800M0,360H800M140,0V120M400,0V120M660,0V120M260,120V240M540,120V240M140,240V360M400,240V360M660,240V360" />
    <Fade frame={frame} on={k} off={k === -1 ? 1 : k + 1} at={k === -1 ? 0 : 3}>
      <Ambient frame={frame} on={k} off={k === -1 ? 1 : k + 1} kind="glow">
        <path className="pl-m" d="M520,90H630V180H520Z" />
      </Ambient>
    </Fade>
    <path className="pl-l" d="M520,90H630V180H520ZM548,90V180M576,90V180M604,90V180" />
    <Ink d="M-10,510V420H810V510Z" tone="b" />
  </>
);

/** A short chain lying on the floor. */
const Chain = ({ x, y }: { x: number; y: number }) => (
  <path
    className="pl-l"
    d={`M${x},${y}a7,4 0 1,0 14,0a7,4 0 1,0 -14,0M${x + 12},${y}a7,4 0 1,0 14,0a7,4 0 1,0 -14,0M${x + 24},${y}a7,4 0 1,0 14,0a7,4 0 1,0 -14,0M${x + 36},${y}a7,4 0 1,0 14,0a7,4 0 1,0 -14,0`}
  />
);

const CAMERA: [number, number, number][] = [
  [420, 300, 1.1],
  [400, 250, 1.06],
  [420, 300, 1.1],
  [400, 320, 1.1],
  [400, 320, 1.1],
  [400, 330, 1.1],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The letter read by the window; the friend with the gift. */}
      <FirstScene frame={frame}>
        <Room h={h} k={-1} frame={frame} />
        <Paul x={470} y={470} s={1.8} pose="hold" />
        <Scroll x={510} y={380} s={0.8} />
        <Chain x={430} y={474} />
        <Person x={280} y={468} s={1.6} robe="g" cloak="b" head="cloth" bundle />
        <Ink d="M220,470c0,-30 50,-30 50,0Z" tone="b" />
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
              <Chain x={mid - 24} y={top - 12} />
            ) : i === 1 ? (
              <Ink d={`M${mid - 22},${top - 24}h44c0,16 -10,24 -22,24c-12,0 -22,-8 -22,-24Z`} tone="b" />
            ) : i === 2 ? (
              <path className="pl-l" d={`M${mid - 26},${top}V${top - 36}M${mid + 26},${top}V${top - 36}M${mid - 26},${top - 26}H${mid + 26}`} />
            ) : (
              <path className="pl-l" d={`M${mid - 18},${top - 6}c10,6 26,6 36,0M${mid - 18},${top - 6}l-4,-18M${mid - 8},${top - 4}l-2,-24M${mid + 2},${top - 4}l0,-26M${mid + 12},${top - 4}l2,-24M${mid + 18},${top - 6}l6,-12`} />
            )
          }
        />
      </Scene>

      {/* 2. Joy in the prison room. */}
      <Scene frame={frame} k={2}>
        <Room h={h} k={2} frame={frame} />
        <Paul x={400} y={470} s={1.9} pose="open" />
        <Chain x={420} y={480} />
      </Scene>

      {/* 3. The basin, and the road down into the valley and up again. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={6}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={690} y={70} r={24} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,300L160,90L330,300L470,330L620,110L810,300V510H-10Z" tone="g" hatch={h.hs} />
        <path className="pl-f" d="M160,96C200,180 260,260 330,300C380,320 430,330 470,326C530,260 580,170 620,116" />
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <Person x={250} y={470} s={1.6} pose="sit" face={1} robe="g" cloak="c" head="cloth" />
        <Person x={330} y={476} s={1.5} pose="kneel" face={-1} robe="p" head="bare" />
        <Ink d="M276,470c0,-14 34,-14 34,0Z" tone="b" />
      </Scene>

      {/* 4. The runner, his fine things left behind. */}
      <Scene frame={frame} k={4}>
        <Hills
          y={330}
          peaks={[
            [160, 30],
            [520, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V360H810V510Z" tone="c" />
        <path className="pl-f" d="M0,440C240,430 520,420 800,410" />
        {/* The bag of fine things, left lying. */}
        <Ink d="M90,450c-6,-26 50,-26 44,0Z" tone="b" />
        <path className="pl-l" d="M100,428l8,-10l8,10" />
        <Paul x={420} y={440} s={1.7} pose="walk" />
        {/* The finishing line. */}
        <path className="pl-l" d="M650,430V300M720,426V296" />
        <Fade frame={frame} on={4} off={5} from="grow" at={4}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <path className="pl-m" d="M650,312L720,308V318L650,322Z" />
          </Ambient>
        </Fade>
      </Scene>

      {/* 5. The same man at a bare table and a full one. */}
      <Scene frame={frame} k={5}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M400,40V128" />
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Lamp x={400} y={150} s={1.4} gold />
          </Ambient>
        </Fade>
        <path className="pl-f" d="M400,180V400" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        {/* The bare table, a single crust. */}
        <path className="pl-l" d="M150,470V440M290,470V440" />
        <Ink d="M130,440H310V432H130Z" tone="c" />
        <Ink d="M210,432c0,-6 14,-6 14,0Z" tone="c" />
        <Paul x={110} y={480} s={1.5} pose="sit" />
        {/* The full table. */}
        <Table x={590} y={470} s={1.6} />
        <Paul x={470} y={480} s={1.5} pose="sit" />
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
