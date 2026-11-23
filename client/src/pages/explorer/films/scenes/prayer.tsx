/**
 * "Prayer": the family catechism's questions on prayer (Q49, Q50, Q53, Q54,
 * Q72) in seven pictures, drawn with the stage set's cast and setting
 * (components/art/stage.tsx). In every picture words rise from the people
 * praying up past the top of the frame, drawn as short swaying strokes with
 * gaps between them, starting well above each head: words going up, never a
 * string tied to anyone. They rise one stroke at a time while the frame is
 * spoken.
 *
 *   0  Talking with God   a child at a window in the evening, words rising
 *   1  Our Father         a man on a hillside with his friends round him
 *   2  Thank you          a family at a table with bread; words toward a light
 *   3  Asking             three people apart, words rising from each
 *   4  Saying sorry       a person, head bowed, sets a heavy bundle down
 *   5  Yes, wait or no    three lines: one to a small light, one dotted and
 *                         still going, one turning aside to a young plant
 *   6  When words run out the child at the window again; one small gold flame
 *
 * The one mustard mark: the small light (5) and the flame (6). No face is
 * drawn; Jesus is one plain figure among his friends, as in the other films.
 * The child is the same child in the first picture and the last.
 */
import type { ReactNode } from "react";
import type { Hatch } from "@/components/art/PlateSvg";
import {
  Cloud,
  Grass,
  Hills,
  Ink,
  Jar,
  Lamp,
  Moon,
  Olive,
  Person,
  Rays,
  Sheep,
  Stars,
  Sun,
  Table,
  Well,
} from "@/components/art/stage";
import { Ambient, Draw, Fade, shown, type FilmDrawing } from "../motion";
import { Flame } from "./figures";

/** Words rising from (x, y) up to `top`: short swaying strokes with gaps. */
const words = (x: number, y: number, top = 0) => {
  const out: string[] = [];
  const seg = 44;
  const gap = 22;
  for (let y0 = y, k = 0; y0 - seg >= top - 4; y0 -= seg + gap, k++) {
    const s = k % 2 ? 9 : -9;
    out.push(
      `M${x},${y0}C${x + s},${y0 - seg / 3} ${x - s},${y0 - (2 * seg) / 3} ${x},${y0 - seg}`
    );
  }
  return out;
};

/** The words, rising one stroke after another from `at` seconds into the frame. */
function Rise({
  frame,
  on,
  off,
  x,
  y,
  top,
  at = 1,
}: {
  frame: number;
  on: number;
  off?: number;
  x: number;
  y: number;
  top?: number;
  at?: number;
}) {
  return (
    <>
      {words(x, y, top).map((d, k) => (
        <Draw key={k} frame={frame} on={on} off={off} at={at + k * 1.1} d={d} />
      ))}
    </>
  );
}

/** The floor of a room, or the ground. */
const Floor = ({ h, y = 430 }: { h: Hatch; y?: number }) => (
  <>
    <Ink d={`M-10,510V${y}H810V510Z`} tone="g" />
    <path fill={h.h3} d={`M0,${y + 20}H800V500H0Z`} />
  </>
);

/** The evening room and the child sitting by its window (pictures 0 and 6, and the poster). */
function Room({ h, frame }: { h: Hatch; frame: number }) {
  const on = frame <= 0 || frame === 6;
  return (
    <g className={`mv-fade mv-from-none${on ? " is-on" : ""}`}>
      <path className="pl-paper" d="M0,0H800V500H0Z" />
      <path className="pl-f" d="M0,60H800M0,64H800" />
      <Floor h={h} />
      {/* The window: the evening sky, a moon and the first stars. */}
      <Ink d="M470,84H700V318H470Z" tone="b" />
      <path className="fp-dark" fill={h.h2} d="M482,96H688V306H482Z" />
      <path className="pl-l" d="M482,96H688V306H482ZM585,96V306M482,200H688" />
      <Moon x={640} y={140} r={15} />
      <g className={`mv-amb mv-amb-twinkle${on ? " is-on" : ""}`}>
        <Stars
          at={[
            [520, 130, 5],
            [552, 250, 4],
            [620, 240, 5],
            [660, 270, 4],
            [530, 180, 3],
          ]}
        />
      </g>
      <Ink d="M456,318H714V334H456Z" tone="c" />
      {/* A lamp in its niche, a jar, and the sleeping mat. */}
      <path className="pl-paper" d="M96,300V230C96,196 176,196 176,230V300Z" />
      <path fill={h.hs} d="M96,300V230C96,196 176,196 176,230V300Z" />
      <path className="pl-l" d="M96,300V230C96,196 176,196 176,230V300Z" />
      <g className={`mv-amb mv-amb-flicker${on ? " is-on" : ""}`}>
        <Lamp x={132} y={298} s={1.5} />
      </g>
      <Jar x={748} y={432} s={1.6} tone="b" />
      <Ink
        d="M214,440C214,424 250,418 330,418C410,418 450,424 450,440Z"
        tone="c"
      />
      <path className="pl-f" d="M236,432H430" />
      <Person
        x={318}
        y={432}
        s={1.9}
        child
        head="bare"
        pose="sit"
        robe="p"
        cloak="b"
      />
    </g>
  );
}

/** A picture of its own: paper over the room, then the scene. */
const Scene = ({
  frame,
  k,
  children,
}: {
  frame: number;
  k: number;
  children: ReactNode;
}) => (
  <Fade frame={frame} on={k} off={k + 1}>
    <path className="pl-paper" d="M0,0H800V500H0Z" />
    {children}
  </Fade>
);

/** The camera, frame by frame. */
const CAMERA: [number, number, number][] = [
  [360, 330, 1.15],
  [400, 340, 1.18],
  [400, 360, 1.2],
  [400, 360, 1.06],
  [380, 380, 1.25],
  [400, 300, 1.05],
  [340, 260, 1.15],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      <Room h={h} frame={frame} />
      {/* 0. The child's words rise (and in the poster, they are already rising). */}
      <Rise frame={frame} on={-1} off={1} x={330} y={236} at={0.6} />

      {/* 1. Our Father: on a hillside, a man sits with his friends round him. */}
      <Scene frame={frame} k={1}>
        <Sun x={690} y={84} r={24} />
        <Ambient frame={frame} on={1} off={2} kind="drift" dx={60}>
          <Cloud x={150} y={110} s={1.2} />
        </Ambient>
        <Hills
          y={330}
          peaks={[
            [200, 60],
            [470, 96],
            [720, 40],
          ]}
          hatch={h.hs}
        />
        <Ambient frame={frame} on={1} off={2} kind="sway">
          <Olive x={676} y={300} s={1.7} hatch={h.h2} />
        </Ambient>
        <Sheep x={96} y={318} s={1} graze />
        <Sheep x={150} y={332} s={0.9} face={-1} />
        <Grass
          at={[
            [60, 420],
            [300, 470],
            [560, 440],
            [740, 420],
          ]}
        />
        <Person x={400} y={352} s={1.25} pose="sit" robe="p" cloak="b" />
        <Fade frame={frame} on={1} off={2} from="up" at={3}>
          <Person x={250} y={380} s={1.15} pose="sit" robe="c" />
          <Person x={316} y={428} s={1.2} pose="sit" head="veil" robe="g" />
          <Person x={520} y={392} s={1.15} pose="sit" face={-1} robe="b" />
          <Person
            x={590}
            y={436}
            s={1.2}
            pose="sit"
            face={-1}
            robe="g"
            cloak="c"
          />
          <Person
            x={452}
            y={452}
            s={0.8}
            child
            head="bare"
            pose="sit"
            robe="c"
          />
        </Fade>
        <Rise frame={frame} on={1} off={2} x={400} y={236} at={6} />
      </Scene>

      {/* 2. Thank you: a family at a table with bread, words toward a light. */}
      <Scene frame={frame} k={2}>
        <path className="pl-f" d="M0,60H800M0,64H800" />
        <Floor h={h} />
        <Ambient frame={frame} on={2} off={3} kind="glow">
          <Rays x={720} y={-10} reach={170} spread={90} n={7} />
        </Ambient>
        <Ink d="M60,330V150H190V330Z" tone="b" />
        <path className="pl-paper" d="M74,316V164H176V316Z" />
        <path className="pl-f" d="M74,240H176M125,164V316" />
        <path className="pl-l" d="M74,316V164H176V316Z" />
        <Jar x={720} y={432} s={1.5} />
        <Jar x={670} y={432} s={1.1} tone="b" />
        <Person x={250} y={432} s={1.5} pose="sit" robe="b" cloak="c" />
        <Person
          x={560}
          y={432}
          s={1.45}
          pose="sit"
          face={-1}
          head="veil"
          robe="c"
        />
        <Table x={400} y={436} s={2} />
        <Fade frame={frame} on={2} off={3} from="up" at={3}>
          <Person
            x={352}
            y={430}
            s={1.05}
            child
            head="bare"
            pose="pray"
            robe="g"
          />
          <Person x={452} y={430} s={1.3} pose="pray" head="veil" robe="b" />
          <Table x={400} y={436} s={2} />
        </Fade>
        <Rise frame={frame} on={2} off={3} x={400} y={236} top={40} at={7} />
      </Scene>

      {/* 3. Asking: three people apart, words rising from each. */}
      <Scene frame={frame} k={3}>
        <Ambient frame={frame} on={3} off={4} kind="drift" dx={50}>
          <Cloud x={520} y={64} s={1.1} />
        </Ambient>
        <Hills
          y={420}
          peaks={[
            [160, 30],
            [420, 12],
            [680, 34],
          ]}
          hatch={h.hs}
        />
        <Well x={86} y={420} s={1.3} />
        <Person
          x={170}
          y={424}
          s={1.5}
          head="veil"
          robe="c"
          cloak="b"
          pose="pray"
        />
        <Fade frame={frame} on={3} off={4} from="up" at={4}>
          <Sheep x={330} y={446} s={1.1} />
          <Sheep x={468} y={452} s={1} face={-1} graze />
          <Person x={400} y={440} s={1.55} robe="b" cloak="c" staff="crook" />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="up" at={8}>
          <Person x={640} y={428} s={1.45} robe="g" pose="kneel" face={-1} />
          <Person
            x={706}
            y={434}
            s={0.9}
            child
            head="bare"
            robe="c"
            face={-1}
          />
        </Fade>
        <Rise frame={frame} on={3} off={4} x={170} y={236} at={1.5} />
        <Rise frame={frame} on={3} off={4} x={400} y={244} at={5} />
        <Rise frame={frame} on={3} off={4} x={636} y={280} at={9} />
      </Scene>

      {/* 4. Saying sorry: head bowed, a heavy bundle set down. */}
      <Scene frame={frame} k={4}>
        <Ambient frame={frame} on={4} off={5} kind="drift" dx={-60}>
          <Cloud x={560} y={90} s={1.5} />
          <path fill={h.h1} d="M504,90h110v-16h-110Z" />
        </Ambient>
        <Hills
          y={410}
          peaks={[
            [200, 24],
            [600, 40],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Olive x={650} y={372} s={1.6} hatch={h.h2} />
        <Person x={300} y={432} s={2.1} pose="bow" robe="b" />
        <Fade frame={frame} on={4} off={5} from="down" at={4}>
          <Ink
            d="M470,440C452,430 450,396 470,384C482,366 520,364 534,382C556,392 556,430 536,440Z"
            tone="c"
            hatch={h.h2}
          />
          <path className="pl-l" d="M474,386C490,376 516,376 532,384" />
          <path className="pl-f" d="M500,378C494,366 508,362 506,372" />
        </Fade>
        <Rise frame={frame} on={4} off={5} x={330} y={300} at={8} />
      </Scene>

      {/* 5. Yes, wait or no. */}
      <Scene frame={frame} k={5}>
        <Hills
          y={420}
          peaks={[
            [140, 22],
            [520, 30],
          ]}
          hatch={h.hs}
        />
        <Grass
          at={[
            [90, 440],
            [250, 460],
            [700, 450],
          ]}
        />
        <Person x={400} y={436} s={1.6} pose="pray" robe="c" cloak="b" />
        {/* Yes: a line to a small light. */}
        <Draw
          frame={frame}
          on={5}
          off={6}
          at={2}
          slow={3}
          className="pl-f"
          d="M370,250C330,200 290,160 240,130"
        />
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={212} y={110} r={14} gold />
          </Ambient>
        </Fade>
        {/* Wait: a dotted line, still going. */}
        <Fade frame={frame} on={5} off={6} at={8}>
          <path
            className="pl-f"
            strokeDasharray="3 8"
            d="M400,236C404,170 396,90 400,-4"
          />
        </Fade>
        {/* No: a line that turns aside to a young plant. */}
        <Draw
          frame={frame}
          on={5}
          off={6}
          at={12}
          slow={3}
          className="pl-f"
          d="M430,250C470,180 600,190 620,300C624,340 622,380 622,410"
        />
        <Fade frame={frame} on={5} off={6} from="grow" at={15}>
          <path className="pl-l" d="M622,424V386" />
          <Ink
            d="M622,396C604,392 596,376 600,362C616,366 624,380 622,396Z"
            tone="g"
          />
          <Ink
            d="M622,388C640,384 650,368 646,352C630,356 620,372 622,388Z"
            tone="g"
          />
        </Fade>
      </Scene>

      {/* 6. When words run out: the child again, and one small gold flame. */}
      <Fade frame={frame} on={6} at={3}>
        <path
          className="pl-f"
          strokeDasharray="3 8"
          d="M330,236C334,190 326,150 330,108"
        />
      </Fade>
      <Fade frame={frame} on={6} from="down" at={6}>
        <g
          className={`mv-amb mv-amb-flicker${shown(frame, 6) ? " is-on" : ""}`}
        >
          <Flame x={330} y={86} s={1.5} gold />
        </g>
      </Fade>
    </>
  ),
};

export default film;
