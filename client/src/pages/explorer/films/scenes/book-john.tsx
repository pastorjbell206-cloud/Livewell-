/**
 * "John: the Word made flesh": a film for one whole book, from the book's
 * own page (bible/notes/john/intro.json) and its chapter notes.
 *
 *   0  The Word made flesh     a camp at night; one tent with light in it
 *   1  How it is laid out      an opening, the signs, the hour, the lake
 *   2  The signs               the jars at Cana
 *   3  "I am"                  bread, a lamp, sheep, a vine
 *   4  Believing               the woman at the well, at noon
 *   5  The last evening        the basin and the towel
 *   6  Where to start          the reader and the open scroll
 *
 * "The Word ... made His dwelling among us" is, in John's Greek, "pitched
 * his tent" (the book page says so), so the first picture is a tent among
 * tents with light in its door. God is never drawn; Jesus is one plain
 * figure, as in the other films, and the cross is not drawn here. The one
 * mustard mark: the light in the tent (0), the rule under the hour (1), a
 * cup (2), a lamp's flame (3, 5), the noon sun (4), the marker (6).
 */
import {
  Grass,
  Hills,
  Ink,
  Jar,
  Lamp,
  Person,
  Sheep,
  Stars,
  Sun,
  Table,
  Tent,
  Well,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The chapters in each part of the second picture: the opening (chapter 1:
 * the prologue and the first witnesses), the signs (2 to 12), the hour (13
 * to 20: the last evening, the cross, the resurrection), and the closing
 * scene by the lake (21).
 */
export const LAYOUT = [1, 11, 8, 1];

/** Jesus, as the films draw him: the same robe and cloak in every picture. */
const Jesus = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "open" | "sit" | "kneel" | "reach";
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
  [430, 320, 1.14],
  [400, 250, 1.06],
  [400, 330, 1.14],
  [400, 330, 1.12],
  [400, 330, 1.14],
  [400, 340, 1.16],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). He pitched his tent among us. */}
      <FirstScene frame={frame}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V390H0Z" />
        <Ambient frame={frame} on={-1} off={1} kind="twinkle">
          <Stars
            at={[
              [70, 60, 4],
              [150, 140, 3],
              [240, 70, 3],
              [330, 150, 4],
              [420, 60, 3],
              [500, 130, 4],
              [590, 50, 3],
              [680, 120, 4],
              [750, 60, 3],
              [110, 230, 3],
              [290, 240, 3],
              [640, 220, 3],
              [380, 110, 3],
              [550, 240, 3],
            ]}
          />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [200, 24],
            [620, 36],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Tent x={130} y={420} s={1.0} tone="b" hatch={h.h3} />
        <Tent x={680} y={426} s={1.1} tone="b" hatch={h.h3} />
        <Tent x={300} y={404} s={0.8} tone="b" hatch={h.h3} />
        {/* The one tent with light in it. */}
        <path className="pl-paper" d="M370,470L400,500H560L530,470Z" />
        <Tent x={450} y={470} s={2} />
        <Ambient frame={frame} on={-1} off={1} kind="glow">
          <path className="pl-m" d="M426,470L442,394H482L498,470Z" />
        </Ambient>
        <path className="pl-l" d="M426,470L442,394H482L498,470" />
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
              <Stars
                at={[
                  [mid - 8, top - 30, 4],
                  [mid + 8, top - 14, 3],
                ]}
              />
            ) : i === 1 ? (
              <Jar x={mid} y={top} s={0.9} />
            ) : i === 2 ? (
              <>
                <Ink
                  d={`M${mid - 24},${top - 18}h48c0,24 -48,24 -48,0Z`}
                  tone="c"
                />
                <path
                  className="pl-l"
                  d={`M${mid + 30},${top - 34}v30M${mid + 22},${top - 34}h16`}
                />
              </>
            ) : (
              <path
                className="pl-l"
                d={`M${mid - 16},${top - 16}c8,-12 22,-12 30,0c-8,12 -22,12 -30,0ZM${mid + 14},${top - 16}l8,-8v16Z`}
              />
            )
          }
        />
      </Scene>

      {/* 2. The first of the signs, at Cana. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,400V110H810V400Z" tone="c" hatch={h.hs} />
        <path
          className="pl-l"
          d="M-10,110H810M560,400V230C560,196 660,196 660,230V400"
        />
        <path className="pl-f" d="M100,170h70v70h-70ZM320,170h70v70h-70Z" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        {/* The six stone jars. */}
        <Jar x={70} y={470} s={1.9} tone="b" />
        <Jar x={150} y={476} s={1.9} tone="b" />
        <Jar x={230} y={470} s={1.9} tone="b" />
        <Jar x={310} y={476} s={1.9} tone="b" />
        <Jar x={390} y={470} s={1.9} tone="b" />
        <Jar x={470} y={476} s={1.9} tone="b" />
        <Table x={690} y={470} s={1.3} />
        <Jesus x={560} y={400} s={1.4} face={-1} />
        <Fade frame={frame} on={2} off={3} from="left" at={3}>
          <Person x={200} y={400} s={1.3} pose="reach" robe="g" head="bare" />
          <path className="pl-f" d="M246,318C252,340 248,360 240,380" />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="left" at={7}>
          <Person x={450} y={400} s={1.3} pose="reach" robe="c" head="bare" />
          <path className="pl-m" d="M490,322h18l-3,-20h-12Z" />
          <path className="pl-l" d="M490,322h18l-3,-20h-12Z" />
        </Fade>
      </Scene>

      {/* 3. "I am": bread, light, a shepherd, a vine. */}
      <Scene frame={frame} k={3}>
        <Sun x={690} y={80} r={22} />
        <Hills
          y={370}
          peaks={[
            [200, 40],
            [600, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        {/* The vine on its trellis. */}
        <path
          className="pl-l"
          d="M560,400V220M720,400V220M540,220H740M580,400C590,340 570,300 600,260C620,236 660,240 690,226"
        />
        <path
          className="pl-g"
          d="M592,250c8,-12 22,-8 20,6c-6,10 -18,6 -20,-6ZM640,232c8,-12 22,-8 20,6c-6,10 -18,6 -20,-6ZM684,222c8,-12 22,-8 20,6c-6,10 -18,6 -20,-6Z"
        />
        <path
          className="pl-k"
          d="M612,282a6,6 0 1,0 0.1,0ZM624,292a6,6 0 1,0 0.1,0ZM600,292a6,6 0 1,0 0.1,0ZM612,304a6,6 0 1,0 0.1,0ZM668,262a6,6 0 1,0 0.1,0ZM680,272a6,6 0 1,0 0.1,0ZM656,272a6,6 0 1,0 0.1,0ZM668,284a6,6 0 1,0 0.1,0Z"
        />
        <Ink d="M-10,510V400C240,384 560,390 810,400V510Z" tone="g" />
        <Jesus x={400} y={470} s={1.8} pose="open" />
        <Fade frame={frame} on={3} off={4} from="left" at={3}>
          <Table x={210} y={474} s={1.4} />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="grow" at={6}>
          <Ambient frame={frame} on={3} off={4} kind="flicker">
            <Lamp x={70} y={478} s={1.6} gold />
          </Ambient>
        </Fade>
        <Fade frame={frame} on={3} off={4} from="walk-right" at={9}>
          <Sheep x={590} y={478} s={1.4} face={-1} />
          <Sheep x={680} y={486} s={1.2} face={-1} lamb />
        </Fade>
        <Grass
          at={[
            [300, 484],
            [520, 440],
          ]}
        />
      </Scene>

      {/* 4. Believing: the woman at the well, at noon. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} at={4}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={400} y={80} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={370}
          peaks={[
            [160, 70],
            [640, 40],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Ink d="M-10,510V400C240,384 560,390 810,400V510Z" tone="c" />
        <Well x={400} y={470} s={2.1} />
        <Jesus x={290} y={470} s={1.7} pose="sit" />
        <Fade frame={frame} on={4} off={5} from="right" at={3}>
          <Person
            x={540}
            y={472}
            s={1.7}
            face={-1}
            pose="open"
            robe="g"
            head="veil"
          />
          <Jar x={610} y={474} s={1.5} />
        </Fade>
        <Grass
          at={[
            [120, 450],
            [700, 460],
          ]}
        />
      </Scene>

      {/* 5. The last evening: the basin and the towel. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V400H0Z" />
        <Ink d="M-10,400V90H810V400Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M-10,90H810" />
        <path className="pl-k" d="M620,150h80v100h-80Z" />
        <Stars
          at={[
            [644, 180, 3],
            [676, 214, 3],
          ]}
        />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Table x={610} y={470} s={1.5} />
        <Fade frame={frame} on={5} off={6} from="grow" at={3}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Lamp x={610} y={424} s={1.3} gold />
          </Ambient>
        </Fade>
        <Person x={170} y={470} s={1.7} pose="sit" robe="g" cloak="c" />
        {/* The basin, and the one who kneels at it. */}
        <Ink d="M214,452h60c0,26 -60,26 -60,0Z" tone="c" />
        <Jesus x={340} y={474} s={1.7} pose="kneel" face={-1} />
        <path
          className="pl-o"
          d="M356,396c10,10 10,40 2,60h-12c6,-20 4,-44 -2,-56Z"
        />
        <Fade frame={frame} on={5} off={6} from="right" at={6}>
          <Person
            x={480}
            y={470}
            s={1.5}
            pose="sit"
            face={-1}
            robe="b"
            cloak="g"
          />
          <Person x={720} y={470} s={1.5} pose="sit" face={-1} robe="c" />
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
