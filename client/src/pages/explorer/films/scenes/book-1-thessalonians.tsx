/**
 * "1 Thessalonians: hope that does not give up": a film for one whole book,
 * from the book's own page (bible/notes/1-thessalonians/intro.json) and its
 * chapter notes.
 *
 *   0  A young church          Timothy coming up the road at dawn
 *   1  How it is laid out      looking back, looking ahead
 *   2  Turned from idols       Paul at his tentmaking by lamplight
 *   3  Hope in grief           friends together on a hill at sunrise
 *   4  The Lord's coming       one window lit in a sleeping town
 *   5  Life together           work, bread shared, a child at play
 *   6  Where to start          the reader and the open scroll
 *
 * No grave, death or end-of-the-world scene is drawn, and nothing in the
 * sky: the Lord's coming is named in the captions and pictured only as a
 * town where someone is awake. Christ and God are never drawn. The one
 * mustard mark: the sunrise (0, 3), the rule under the second half (1), the
 * lamp (2), the lit window (4), the sun (5), the marker (6).
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Stars,
  Sun,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Looking back (1 to 3); looking ahead (4 and 5). */
export const LAYOUT = [3, 2];

const Paul = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "reach" | "sit" | "open" | "hold";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="g"
    head="bare"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 330, 1.12],
  [400, 320, 1.1],
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
      {/* 0 (and the poster). Timothy coming up the road at dawn. */}
      <FirstScene frame={frame}>
        <Fade frame={frame} on={-1} off={1} at={2}>
          <Ambient frame={frame} on={0} off={1} kind="glow">
            <Sun x={620} y={250} r={36} gold />
          </Ambient>
        </Fade>
        <Hills
          y={300}
          peaks={[
            [500, 50],
            [740, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V330C240,320 560,322 810,332V510Z" tone="c" />
        <path className="pl-f" d="M800,350C640,380 480,420 300,470" />
        <House x={170} y={460} s={1.6} hatch={h.h3} />
        <Paul x={290} y={470} s={1.6} pose="open" />
        <Fade frame={frame} on={-1} off={1} from="right" at={4}>
          <Person
            x={560}
            y={420}
            s={1.3}
            face={-1}
            pose="walk"
            robe="c"
            cloak="b"
            head="cloth"
            staff="staff"
            bundle
          />
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
              <Lamp x={mid - 4} y={top} s={0.9} />
            ) : (
              <path
                className="pl-l"
                d={`M${mid - 24},${top - 4}H${mid + 24}M${mid - 14},${top - 4}a14,14 0 0,1 28,0M${mid},${top - 26}v-6M${mid - 18},${top - 20}l-4,-4M${mid + 18},${top - 20}l4,-4`}
              />
            )
          }
        />
      </Scene>

      {/* 2. Paul at his tentmaking by lamplight; listeners near. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.h3} />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        {/* The frame and the cloth stretched on it. */}
        <path className="pl-l" d="M420,470V260M640,470V260M410,260H650" />
        <Ink d="M430,280H630V420H430Z" tone="g" hatch={h.h2} />
        <Paul x={400} y={470} s={1.6} pose="reach" face={1} />
        <Ambient frame={frame} on={2} off={3} kind="flicker">
          <Lamp x={700} y={470} s={1.4} gold />
        </Ambient>
        <Fade frame={frame} on={2} off={3} from="left" at={4}>
          <Person x={140} y={470} s={1.3} pose="sit" robe="g" head="veil" />
          <Person x={230} y={474} s={1.3} pose="sit" robe="p" cloak="c" head="cloth" />
          <Person x={300} y={478} s={0.9} pose="sit" robe="c" child head="bare" />
        </Fade>
      </Scene>

      {/* 3. Friends together on a hill at sunrise. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={2}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={600} y={280} r={40} gold />
          </Ambient>
        </Fade>
        <Hills
          y={320}
          peaks={[
            [520, 40],
            [740, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V340C200,320 400,330 560,370C640,390 720,400 810,400V510Z" tone="g" />
        <Person x={240} y={440} s={1.6} face={1} robe="g" cloak="c" head="veil" />
        <Person x={300} y={444} s={1.6} face={1} pose="reach" robe="c" head="cloth" />
        <Fade frame={frame} on={3} off={4} from="left" at={4}>
          <Person x={180} y={448} s={1.1} face={1} robe="p" child head="bare" />
          <Person x={380} y={446} s={1.5} face={1} robe="b" cloak="g" head="cloth" />
        </Fade>
      </Scene>

      {/* 4. One window lit in a sleeping town. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V400H-10Z" tone="b" hatch={h.hs} />
        <Stars
          at={[
            [90, 60, 5],
            [220, 110, 4],
            [470, 60, 5],
            [700, 100, 4],
          ]}
        />
        <House x={140} y={420} s={1.4} tone="c" hatch={h.h3} />
        <House x={320} y={410} s={1.2} tone="c" hatch={h.h3} />
        <Fade frame={frame} on={4} off={5} at={3}>
          <House x={500} y={420} s={1.5} tone="c" hatch={h.h3} lit />
        </Fade>
        <House x={680} y={412} s={1.2} tone="c" hatch={h.h3} />
        <Ink d="M-10,510V420H810V510Z" tone="g" />
      </Scene>

      {/* 5. Work, bread shared, and a child at play. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={2}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={660} y={96} r={28} gold />
          </Ambient>
        </Fade>
        <House x={140} y={380} s={1.3} hatch={h.h3} />
        <House x={500} y={376} s={1.2} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <Ink d="M60,440H200V452H60Z" tone="c" />
        <path className="pl-l" d="M70,452V480M190,452V480" />
        <Person x={130} y={480} s={1.4} pose="reach" robe="p" cloak="b" head="bare" />
        <Person x={380} y={476} s={1.5} pose="reach" robe="g" cloak="c" head="veil" />
        <Ink d="M418,392c0,-8 20,-8 20,0Z" />
        <Person x={470} y={480} s={1.5} face={-1} robe="c" head="cloth" staff="staff" />
        <Fade frame={frame} on={5} off={6} from="right" at={4}>
          <Person x={640} y={482} s={1} pose="walk" face={-1} robe="b" child head="bare" />
        </Fade>
        <Grass
          at={[
            [720, 490],
            [280, 496],
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
