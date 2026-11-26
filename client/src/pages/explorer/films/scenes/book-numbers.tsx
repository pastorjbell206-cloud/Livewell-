/**
 * "Numbers: forty years in the wilderness": a film for one whole book, from
 * the book's own page (bible/notes/numbers/intro.json) and its chapter notes.
 *
 *   0  In the wilderness         the people following the cloud
 *   1  How it is laid out        seven parts, the turning point marked
 *   2  God at the center         the camp seen from above
 *   3  The refusal               the scouts with the fruit of the land
 *   4  A curse turned to blessing Balaam on the heights, the camp below
 *   5  The new generation        five sisters before Moses
 *   6  Where to start            the reader and the open scroll
 *
 * No war, plague, snake, spear or death is drawn: the hard chapters are
 * named in the captions and pictured nowhere. God is never drawn; the
 * cloud and the light have no one in them. The one mustard mark: the rule
 * under the refusal (1), the light over the middle tent (2), the grapes
 * (3), the star (4), the sun (5), the marker (6); the march (0) has none.
 */
import {
  Cloud,
  Donkey,
  Dove,
  Grass,
  Hills,
  Ink,
  Person,
  Stars,
  Sun,
  Tent,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, GoldStar, Layout, Scene, StartReading } from "./book-parts";

/** The book page's seven parts in whole chapters: 1-10, 11-12, 13-14, 15-19, 20-21, 22-25, 26-36. */
export const LAYOUT = [10, 2, 2, 5, 2, 4, 11];

/** A small tent seen from above. */
const Roof = ({ x, y }: { x: number; y: number }) => (
  <Ink d={`M${x - 14},${y + 10}L${x},${y - 10}L${x + 14},${y + 10}Z`} tone="c" />
);

const CAMERA: [number, number, number][] = [
  [400, 300, 1.08],
  [400, 250, 1.06],
  [400, 250, 1.04],
  [400, 330, 1.12],
  [400, 300, 1.08],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The people following the cloud. */}
      <FirstScene frame={frame}>
        <Hills
          y={320}
          peaks={[
            [200, 40],
            [620, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V340C240,330 560,330 810,340V510Z" tone="c" />
        <path className="pl-f" d="M0,470C240,440 480,400 700,360" />
        <Ambient frame={frame} on={-1} off={1} kind="drift">
          <Cloud x={690} y={120} s={2.4} />
          <Cloud x={700} y={200} s={2.1} />
          <Cloud x={680} y={270} s={1.7} />
        </Ambient>
        <Fade frame={frame} on={-1} off={1} from="left" at={3}>
          <Person x={560} y={396} s={0.9} pose="walk" robe="c" cloak="b" head="cloth" staff="staff" />
          <Person x={480} y={414} s={1} pose="walk" robe="g" head="veil" bundle />
          <Person x={400} y={430} s={1.1} pose="walk" robe="p" cloak="c" head="cloth" bundle />
          <Person x={320} y={448} s={1.2} pose="walk" robe="b" head="veil" />
          <Person x={270} y={456} s={0.8} pose="walk" robe="g" child head="bare" />
          <Person x={200} y={466} s={1.3} pose="walk" robe="c" cloak="g" head="cloth" bundle />
        </Fade>
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
              <Tent x={mid} y={top} s={0.3} hatch={h.h3} />
            ) : i === 1 ? (
              <Dove x={mid} y={top - 14} s={0.5} />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 6},${top - 30}a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M${mid - 10},${top - 22}a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M${mid - 2},${top - 22}a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M${mid - 6},${top - 14}a4,4 0 1,0 8,0a4,4 0 1,0 -8,0`}
              />
            ) : i === 3 ? (
              <path
                className="pl-l"
                d={`M${mid},${top}V${top - 34}M${mid},${top - 24}l6,-4M${mid},${top - 30}l-6,-4`}
              />
            ) : i === 4 ? (
              <Ink d={`M${mid - 20},${top}c0,-24 40,-24 40,0Z`} tone="b" />
            ) : i === 5 ? (
              <Stars at={[[mid, top - 20, 6]]} />
            ) : (
              <>
                <Person x={mid - 20} y={top} s={0.32} robe="g" />
                <Person x={mid} y={top} s={0.32} robe="b" />
                <Person x={mid + 20} y={top} s={0.32} robe="c" />
              </>
            )
          }
        />
      </Scene>

      {/* 2. The camp seen from above, God's tent at the center. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,-10H810V510H-10Z" tone="c" />
        <path className="pl-l" d="M360,220H440V280H360Z" />
        <Ink d="M370,228H430V272H370Z" tone="b" hatch={h.h3} />
        <path className="pl-f" d="M330,200H470V300H330Z" />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <path className="pl-m" d="M384,206c0,-12 14,-16 20,-8c6,-10 22,-8 22,2c10,0 12,10 2,12c-14,2 -40,2 -44,-6Z" />
          </Ambient>
        </Fade>
        {[
          [400, 110],
          [400, 400],
          [210, 250],
          [590, 250],
        ].map(([cx, cy], g) => (
          <Fade key={g} frame={frame} on={2} off={3} at={4 + g}>
            {[-50, 0, 50].map(dx =>
              [-26, 26].map(dy => (
                <Roof
                  key={`${dx},${dy}`}
                  x={g < 2 ? cx + dx : cx + dy}
                  y={g < 2 ? cy + dy : cy + dx}
                />
              ))
            )}
          </Fade>
        ))}
      </Scene>

      {/* 3. The scouts with the fruit of the land. */}
      <Scene frame={frame} k={3}>
        <Hills
          y={330}
          peaks={[
            [160, 50],
            [640, 70],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V370C240,360 560,360 810,372V510Z" tone="c" />
        <Person x={520} y={474} s={1.6} pose="hold" robe="g" cloak="c" head="cloth" />
        <Person x={700} y={474} s={1.6} pose="hold" robe="b" head="cloth" />
        <Ink d="M506,384H718V391H506Z" tone="c" />
        <Fade frame={frame} on={3} off={4} from="grow" at={3}>
          <path
            className="pl-m"
            d="M596,392c-14,4 -18,20 -10,30c-6,14 4,28 14,34c8,10 20,6 22,-6c10,-8 8,-26 -2,-32c4,-14 -10,-28 -24,-26Z"
          />
          <path
            className="pl-f"
            d="M596,392c-14,4 -18,20 -10,30c-6,14 4,28 14,34c8,10 20,6 22,-6c10,-8 8,-26 -2,-32c4,-14 -10,-28 -24,-26ZM594,412a5,5 0 1,0 10,0a5,5 0 1,0 -10,0M604,430a5,5 0 1,0 10,0a5,5 0 1,0 -10,0M592,440a5,5 0 1,0 10,0a5,5 0 1,0 -10,0"
          />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" at={5}>
          {[80, 140, 200, 260, 320, 380].map((x, i) => (
            <Person
              key={x}
              x={x}
              y={466 + (i % 2) * 6}
              s={1.1}
              pose="bow"
              robe={(["g", "b", "c", "p"] as const)[i % 4]}
              head="cloth"
            />
          ))}
        </Fade>
      </Scene>

      {/* 4. Balaam on the heights; the camp below. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} from="grow" at={4}>
          <Ambient frame={frame} on={4} off={5} kind="twinkle">
            <GoldStar x={620} y={80} r={11} />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V200C120,180 260,220 380,300C420,330 440,380 460,510Z" tone="b" hatch={h.hs} />
        <Ink d="M460,510C440,420 500,400 810,400V510Z" tone="g" />
        <Tent x={560} y={450} s={0.5} hatch={h.h3} />
        <Tent x={650} y={440} s={0.45} tone="b" hatch={h.h3} />
        <Tent x={740} y={456} s={0.5} hatch={h.h3} />
        <Tent x={610} y={486} s={0.5} tone="b" hatch={h.h3} />
        <Person x={220} y={214} s={1.4} pose="open" robe="p" cloak="b" head="cloth" />
        <Donkey x={120} y={204} s={1} />
      </Scene>

      {/* 5. Five sisters before Moses at the tent. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={3}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={110} y={96} r={28} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V380C240,372 560,372 810,382V510Z" tone="c" />
        <Tent x={640} y={420} s={1.8} tone="b" hatch={h.h3} />
        <Person x={560} y={470} s={1.7} face={-1} robe="c" cloak="b" head="cloth" staff="staff" />
        <Fade frame={frame} on={5} off={6} from="left" at={4}>
          {[140, 210, 280, 350, 420].map((x, i) => (
            <Person
              key={x}
              x={x}
              y={472 + (i % 2) * 6}
              s={1.4}
              robe={(["g", "p", "b", "c", "g"] as const)[i]}
              cloak={(["c", "b", "g", "b", "c"] as const)[i]}
              head="veil"
            />
          ))}
        </Fade>
        <Grass
          at={[
            [60, 490],
            [740, 490],
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
