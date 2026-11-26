/**
 * "1 Samuel: the heart God sees": a film for one whole book, from the
 * book's own page (bible/notes/1-samuel/intro.json) and its chapter notes.
 *
 *   0  Three lives              Hannah praying at Shiloh, Eli by the door
 *   1  How it is laid out       seven stages
 *   2  The boy who listens      night in the shrine, the lamp still burning
 *   3  "Give us a king"         the elders before Samuel at his door
 *   4  The heart                Jesse's tall sons, and the shepherd boy
 *   5  Loyal love               David and Jonathan, hands joined
 *   6  Where to start           the reader and the open scroll
 *
 * No battle, weapon, wound or death is drawn: the giant, the war on Amalek
 * and the end of Saul are not pictured. God is never drawn. Samuel, old,
 * has the same robe, cloak and staff in each picture he is in. The one
 * mustard mark: the rule under the asking for a king (1), the lamp's flame
 * (2), the horn of oil (4), the sun (5), the marker (6); the shrine (0) and
 * the elders (3) have none.
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Mountain,
  Person,
  Sheep,
  Stars,
  Sun,
  Tent,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The book page's seven stages: 1-3, 4-7, 8-12, 13-15, 16-20, 21-27, 28-31. */
export const LAYOUT = [3, 4, 5, 3, 5, 7, 4];

const Samuel = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "open" | "hold";
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
  [400, 320, 1.12],
  [400, 250, 1.06],
  [400, 320, 1.12],
  [420, 330, 1.12],
  [400, 330, 1.1],
  [400, 330, 1.14],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Hannah at the shrine of Shiloh. */}
      <FirstScene frame={frame}>
        <Sun x={120} y={96} r={22} />
        <Hills
          y={330}
          peaks={[
            [180, 60],
            [620, 80],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C240,364 560,366 810,380V510Z" tone="g" />
        <Tent x={500} y={430} s={2.1} tone="b" hatch={h.h3} />
        <Person
          x={610}
          y={440}
          s={1.4}
          face={-1}
          pose="sit"
          robe="c"
          cloak="g"
          head="cloth"
        />
        <Fade frame={frame} on={-1} off={1} from="left" at={3}>
          <Person
            x={300}
            y={470}
            s={1.6}
            pose="kneel"
            robe="g"
            cloak="c"
            head="veil"
          />
        </Fade>
        <Grass
          at={[
            [120, 470],
            [740, 470],
          ]}
        />
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
              <Lamp x={mid - 4} y={top} s={0.9} />
            ) : i === 1 ? (
              <Ink d={`M${mid - 18},${top}v-18h36v18Z`} tone="c" />
            ) : i === 2 ? (
              <Ink
                d={`M${mid - 18},${top}v-22l9,10l9,-14l9,14l9,-10v22Z`}
                tone="c"
              />
            ) : i === 3 ? (
              <Ink
                d={`M${mid - 16},${top}v-30h20l-4,8l6,6l-4,8l6,8Z`}
                tone="b"
              />
            ) : i === 4 ? (
              <path
                className="pl-l"
                d={`M${mid - 14},${top}L${mid + 14},${top}L${mid - 6},${top - 34}ZM${mid - 8},${top}l4,-26M${mid - 2},${top}l2,-18M${mid + 4},${top}l2,-10`}
              />
            ) : i === 5 ? (
              <Ink
                d={`M${mid - 34},${top}c0,-34 68,-34 68,0ZM${mid - 14},${top}c0,-14 28,-14 28,0Z`}
                tone="b"
              />
            ) : (
              <Mountain x={mid} y={top} w={60} h={34} tone="g" />
            )
          }
        />
      </Scene>

      {/* 2. Night in the shrine; the lamp has not gone out. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,-10H810V420H-10Z" tone="b" hatch={h.hs} />
        <Stars
          at={[
            [90, 70, 5],
            [180, 120, 4],
            [690, 80, 5],
            [740, 150, 4],
          ]}
        />
        {/* The tent's inner wall and its posts. */}
        <path className="pl-paper" d="M140,420V170H660V420Z" />
        <path className="pl-l" d="M140,420V170H660V420M140,170L400,120L660,170" />
        <Ink d="M-10,510V420H810V510Z" tone="c" />
        <path className="pl-l" d="M400,420V300" />
        <Fade frame={frame} on={2} off={3} from="grow" at={2}>
          <Ambient frame={frame} on={2} off={3} kind="flicker">
            <Lamp x={398} y={300} s={1.4} gold />
          </Ambient>
        </Fade>
        {/* The boy's mat, and the boy sitting up on it. */}
        <Ink d="M210,420h120v-8h-120Z" tone="g" />
        <Fade frame={frame} on={2} off={3} at={5}>
          <Person
            x={250}
            y={412}
            s={1.1}
            pose="sit"
            robe="g"
            child
            head="bare"
          />
        </Fade>
        {/* Across the tent, old Eli, his head bowed in sleep. */}
        <Person
          x={560}
          y={420}
          s={1.3}
          face={-1}
          pose="bow"
          robe="c"
          cloak="g"
          head="cloth"
        />
      </Scene>

      {/* 3. "Give us a king": the elders at Samuel's door. */}
      <Scene frame={frame} k={3}>
        <Hills
          y={330}
          peaks={[
            [600, 70],
            [760, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <House x={170} y={400} s={1.5} hatch={h.h3} />
        <Ink d="M-10,510V400C240,392 560,392 810,400V510Z" tone="c" />
        <Samuel x={300} y={470} s={1.7} />
        <Fade frame={frame} on={3} off={4} from="right" at={3}>
          <Person
            x={430}
            y={474}
            s={1.6}
            face={-1}
            pose="reach"
            robe="g"
            cloak="b"
            head="cloth"
          />
          <Person x={510} y={470} s={1.6} face={-1} robe="p" head="cloth" />
          <Person
            x={590}
            y={476}
            s={1.6}
            face={-1}
            robe="b"
            cloak="c"
            head="cloth"
          />
        </Fade>
        <Grass
          at={[
            [690, 480],
            [60, 480],
          ]}
        />
      </Scene>

      {/* 4. Jesse's tall sons, and the youngest called in from the sheep. */}
      <Scene frame={frame} k={4}>
        <Hills
          y={340}
          peaks={[
            [200, 50],
            [640, 70],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V390C240,380 560,380 810,392V510Z" tone="c" />
        <Samuel x={170} y={470} s={1.7} />
        {/* The horn of oil, held up: gold. */}
        <Fade frame={frame} on={4} off={5} from="grow" at={3}>
          <path
            className="pl-m"
            d="M196,316c10,-4 22,-18 26,-30l6,4c-2,14 -14,30 -28,34Z"
          />
          <path
            className="pl-f"
            d="M196,316c10,-4 22,-18 26,-30l6,4c-2,14 -14,30 -28,34Z"
          />
        </Fade>
        <Person x={300} y={470} s={1.9} face={-1} robe="b" cloak="g" />
        <Person x={370} y={470} s={1.8} face={-1} robe="g" head="cloth" />
        <Person x={440} y={470} s={1.8} face={-1} robe="p" cloak="c" />
        <Person x={510} y={470} s={1.75} face={-1} robe="c" head="cloth" />
        <Fade frame={frame} on={4} off={5} from="right" at={7}>
          <Person
            x={640}
            y={474}
            s={1.1}
            face={-1}
            pose="walk"
            robe="g"
            child
            head="bare"
            staff="crook"
          />
          <Sheep x={720} y={474} s={0.8} face={-1} />
          <Sheep x={770} y={480} s={0.7} face={-1} graze />
        </Fade>
      </Scene>

      {/* 5. David and Jonathan, hands joined in a promise. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={400} y={250} r={40} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [140, 50],
            [660, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V360C240,350 560,352 810,364V510Z" tone="g" />
        <Person
          x={340}
          y={470}
          s={1.8}
          pose="reach"
          robe="g"
          cloak="c"
          head="bare"
        />
        <Person
          x={460}
          y={470}
          s={1.8}
          face={-1}
          pose="reach"
          robe="p"
          cloak="b"
          head="cloth"
        />
        <Grass
          at={[
            [120, 470],
            [660, 476],
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
