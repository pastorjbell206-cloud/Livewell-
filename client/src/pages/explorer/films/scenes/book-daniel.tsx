/**
 * "Daniel: the Most High rules": a film for one whole book, from the book's
 * own page (bible/notes/daniel/intro.json) and its chapter notes.
 *
 *   0  Two books in one           four young men on the road to Babylon
 *   1  How it is laid out         the five parts, the Aramaic chapters marked
 *   2  The Most High rules        an empty throne, its crown laid down
 *   3  Faith that will not bow    three young men standing in a bowing crowd
 *   4  Quiet, costly faithfulness Daniel praying at his open window
 *   5  One like a son of man      a tossed sea, and clouds full of light
 *   6  Where to start             the reader and the open scroll
 *
 * Told gently for ages 7 to 11: no fire, furnace or lion is drawn, and no
 * beast of the visions. God is never drawn, nor the Ancient of Days, nor any
 * figure in the clouds: picture 5 is light alone. No king is drawn proud or
 * mad, and no one of today. The statue is drawn in ink, never in gold. The
 * one mustard mark: the sun (0, 3, 4), the rule (1), a star (2), the light
 * in the clouds (5), the marker (6).
 */
import {
  CityWall,
  Cloud,
  Hills,
  House,
  Ink,
  Person,
  Scroll,
  Stars,
  Sun,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, GoldStar, Layout, Scene, StartReading } from "./book-parts";

/** The book page's five parts: 1; 2 to 7; 8; 9; 10 to 12. */
export const LAYOUT = [1, 6, 1, 1, 3];

/** A tall statue on a plinth, in ink only. */
const Statue = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <Ink d="M-34,0V-30H34V0Z" tone="c" />
    <Ink d="M-16,-30L-20,-150C-20,-170 20,-170 20,-150L16,-30Z" tone="b" />
    <Ink d="M-12,-170a12,12 0 1,1 24,0a12,12 0 1,1 -24,0Z" tone="b" />
  </g>
);

const CAMERA: [number, number, number][] = [
  [420, 320, 1.12],
  [400, 250, 1.06],
  [400, 300, 1.1],
  [400, 330, 1.1],
  [400, 300, 1.12],
  [400, 260, 1.08],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Four young men on the road to Babylon. */}
      <FirstScene frame={frame}>
        <Ambient frame={frame} on={-1} off={1} kind="glow">
          <Sun x={620} y={250} r={30} gold />
        </Ambient>
        <Hills
          y={340}
          peaks={[
            [100, 40],
            [300, 20],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={610} y={340} w={300} s={1.1} hatch={h.h3} />
        <Ink d="M-10,510V340H810V510Z" tone="c" />
        <path className="pl-f" d="M0,470C200,440 420,380 480,346" />
        <Person x={150} y={476} s={1.5} pose="walk" robe="b" cloak="g" head="cloth" bundle />
        <Person x={240} y={466} s={1.45} pose="walk" robe="g" cloak="c" head="cloth" bundle />
        <Person x={320} y={452} s={1.4} pose="walk" robe="c" cloak="b" head="cloth" bundle />
        <Person x={396} y={440} s={1.35} pose="walk" robe="p" cloak="g" head="cloth" bundle />
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
              <Scroll x={mid} y={top - 8} s={0.6} />
            ) : i === 1 ? (
              <Statue x={mid} y={top} s={0.22} />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 4},${top}c-14,-4 -18,-20 -6,-26c10,-4 16,6 8,12M${mid + 4},${top}c14,-4 18,-20 6,-26c-10,-4 -16,6 -8,12`}
              />
            ) : i === 3 ? (
              <Ink
                d={`M${mid - 14},${top}v-34h28v34ZM${mid - 8},${top - 6}v-22h16v22Z`}
                tone="c"
              />
            ) : (
              <Stars at={[[mid, top - 18, 6]]} />
            )
          }
        />
      </Scene>

      {/* 2. The throne stands empty; the crown is laid down. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} from="grow" at={5}>
          <Ambient frame={frame} on={2} off={3} kind="twinkle">
            <GoldStar x={400} y={70} r={10} />
          </Ambient>
        </Fade>
        <Stars
          at={[
            [140, 80, 3],
            [250, 120, 2],
            [560, 100, 3],
            [680, 60, 2],
          ]}
        />
        <House x={120} y={300} s={1.2} tone="b" hatch={h.h3} />
        <House x={690} y={300} s={1.2} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V300H810V510Z" tone="c" />
        {/* The platform and its steps. */}
        <Ink d="M220,430V380H580V430Z" tone="b" hatch={h.hs} />
        <path className="pl-l" d="M200,450H600M180,470H620" />
        {/* The empty throne. */}
        <Ink d="M362,330V236C362,214 438,214 438,236V330Z" tone="g" />
        <Ink d="M340,346V330H460V346Z" tone="c" />
        <Ink d="M340,380V300h18v80ZM442,380V300h18v80Z" tone="c" />
        <path className="pl-l" d="M352,346V380M448,346V380" />
        {/* The crown, laid on the steps. */}
        <Ink d="M480,446l4,-18l10,10l8,-14l8,14l10,-10l4,18Z" tone="c" />
      </Scene>

      {/* 3. Three stand while the crowd bows. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={130} y={90} r={26} gold />
          </Ambient>
        </Fade>
        <Hills
          y={360}
          peaks={[
            [200, 20],
            [620, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Statue x={640} y={420} s={1.4} />
        <Ink d="M-10,510V400H810V510Z" tone="c" />
        <Person x={90} y={470} s={1.1} pose="bow" robe="c" />
        <Person x={170} y={480} s={1.1} pose="bow" robe="b" cloak="g" />
        <Person x={470} y={474} s={1.1} pose="bow" robe="g" />
        <Person x={540} y={486} s={1.1} pose="bow" robe="c" cloak="b" />
        <Person x={250} y={486} s={1.6} robe="b" cloak="g" head="cloth" />
        <Person x={320} y={490} s={1.6} robe="g" cloak="c" head="cloth" />
        <Person x={390} y={486} s={1.6} robe="p" cloak="g" head="cloth" />
      </Scene>

      {/* 4. Daniel at his open window. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V510H-10Z" tone="c" hatch={h.hs} />
        {/* The window, and the hills and dawn beyond it. */}
        <path className="pl-paper" d="M420,90H720V340H420Z" />
        <Fade frame={frame} on={4} off={5} from="up" at={4}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={570} y={260} r={28} gold />
          </Ambient>
        </Fade>
        <Ink
          d="M420,340V290C470,262 540,276 590,268C640,260 690,276 720,288V340Z"
          tone="g"
          hatch={h.hs}
        />
        <path className="pl-l" d="M420,90H720V340H420ZM570,90V340" />
        <Ink d="M400,340H740V360H400Z" tone="b" />
        <Ink d="M-10,440H810V510H-10Z" tone="b" />
        <Person x={330} y={448} s={2} pose="kneel" robe="b" cloak="g" head="cloth" />
      </Scene>

      {/* 5. The sea, and the clouds of heaven full of light. No one is drawn. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={400} y={130} r={40} gold />
          </Ambient>
        </Fade>
        <Ambient frame={frame} on={5} off={6} kind="drift">
          <Cloud x={300} y={160} s={2} />
          <Cloud x={510} y={150} s={2.2} />
          <Cloud x={400} y={200} s={1.6} />
        </Ambient>
        <Ink d="M-10,510V320H810V510Z" tone="b" hatch={h.hs} />
        <Ambient frame={frame} on={5} off={6} kind="bob">
          <Water x={10} y={336} w={790} rows={6} gap={26} />
        </Ambient>
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
