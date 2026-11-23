/**
 * "Romans 8:28: what it promises, and what it does not": the Study Bible's
 * note on the verse, in seven pictures drawn with the stage set. A film for
 * people who are hurting, so every picture is quiet and none of them is
 * frightening.
 *
 *   0  A verse people reach for   Paul writing by lamplight
 *   1  Not that everything is good a house after a storm; two who look at it
 *   2  Not that it all works out  someone alone by a tree with no leaves
 *   3  What it does say           Joseph and the brothers who sold him
 *   4  What the good is           walking behind Jesus, in his steps
 *   5  Room to groan              night; a person bowed; wind, and one flame
 *   6  Nothing can separate       a family together; a far hill at morning
 *
 * The one mustard mark: the lamp's flame (0), the flame (5), the sun (6).
 * The Spirit is drawn only as wind and one flame, never as a figure; Jesus
 * is one plain figure, as in the other films.
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Jar,
  Lamp,
  Olive,
  Person,
  Scroll,
  Stars,
  Sun,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Draw, Fade, type FilmDrawing } from "../motion";
import { Flame } from "./figures";

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

/** A tree with no leaves. */
const Bare = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      className="pl-l"
      d="M0,0C-4,-30 4,-60 0,-90M0,-50C-20,-70 -34,-84 -40,-108M0,-64C18,-80 30,-96 34,-122M0,-90C-8,-108 -10,-124 -6,-142M-22,-76C-36,-78 -46,-74 -56,-66M18,-82C32,-82 42,-76 52,-66"
    />
  </g>
);

const CAMERA: [number, number, number][] = [
  [360, 340, 1.2],
  [460, 330, 1.12],
  [380, 350, 1.2],
  [400, 350, 1.15],
  [420, 350, 1.15],
  [360, 330, 1.2],
  [520, 300, 1.12],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Paul writing by lamplight. */}
      <Fade frame={frame} on={-1} off={1}>
        <path className="pl-f" d="M0,70H800M0,74H800" />
        <Ink d="M-10,510V430H810V510Z" tone="g" />
        <path fill={h.h3} d="M0,450H800V500H0Z" />
        <Ink d="M540,300V120H700V300Z" tone="b" />
        <path className="fp-dark" fill={h.h2} d="M552,288V132H688V288Z" />
        <path className="pl-l" d="M552,288V132H688V288Z" />
        <Ambient frame={frame} on={-1} off={1} kind="twinkle">
          <Stars
            at={[
              [590, 170, 5],
              [650, 230, 4],
              [620, 260, 3],
            ]}
          />
        </Ambient>
        <Jar x={90} y={432} s={1.5} tone="b" />
        <Person x={320} y={436} s={2} pose="sit" robe="c" cloak="b" />
        <Scroll x={446} y={404} s={1.2} />
        <Ink d="M394,436V408H498V436Z" tone="c" />
        <Ambient frame={frame} on={-1} off={1} kind="flicker">
          <Lamp x={236} y={300} s={1.5} gold />
        </Ambient>
        <path className="pl-l" d="M200,302H276" />
      </Fade>

      {/* 1. Not that everything is good: after the storm. */}
      <Scene frame={frame} k={1}>
        <Ambient frame={frame} on={1} off={2} kind="drift" dx={90}>
          <Cloud x={520} y={90} s={2} />
          <path fill={h.h1} d="M446,90h150v-22h-150Z" />
          <path
            className="pl-f"
            d="M470,104l-10,30M520,104l-10,30M570,104l-10,30"
          />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [180, 16],
            [620, 30],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <House x={560} y={404} s={2} hatch={h.h3} />
        {/* The fallen part of the wall. */}
        <path className="pl-paper" d="M600,264L640,330L672,300L672,264Z" />
        <path className="pl-l" d="M600,264L640,330L672,300" />
        <Ink
          d="M650,404v-18h26v18ZM682,404v-12h20v12ZM664,386v-14h22v14Z"
          tone="c"
        />
        <Bare x={120} y={410} s={1.5} />
        <Fade frame={frame} on={1} off={2} from="walk-left" at={3}>
          <Person x={300} y={446} s={1.6} head="veil" robe="b" cloak="c" />
          <Person x={372} y={452} s={1} child head="bare" robe="g" />
        </Fade>
      </Scene>

      {/* 2. Not that it all works out. */}
      <Scene frame={frame} k={2}>
        <path fill={h.hs} d="M0,0H800V180H0Z" />
        <Ambient frame={frame} on={2} off={3} kind="drift" dx={-70}>
          <Cloud x={600} y={110} s={1.6} />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [240, 30],
            [640, 12],
          ]}
          hatch={h.hs}
        />
        <Bare x={520} y={410} s={2.2} />
        <Person x={340} y={446} s={1.9} pose="sit" robe="c" head="veil" />
        <Grass
          at={[
            [100, 450],
            [640, 460],
          ]}
        />
      </Scene>

      {/* 3. What it does say: Joseph and his brothers. */}
      <Scene frame={frame} k={3}>
        <Sun x={110} y={90} r={22} />
        <Hills
          y={400}
          peaks={[
            [200, 14],
            [620, 20],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Jar x={660} y={420} s={1.7} />
        <Jar x={720} y={428} s={1.4} tone="b" />
        <Wheat x={600} y={420} s={1.5} />
        <Wheat x={90} y={430} s={1.4} />
        <Person
          x={520}
          y={446}
          s={1.75}
          face={-1}
          robe="p"
          cloak="c"
          head="bare"
          pose="open"
        />
        <Fade frame={frame} on={3} off={4} from="walk-left" at={3}>
          <Person x={330} y={452} s={1.5} pose="kneel" robe="b" />
          <Person x={230} y={458} s={1.5} pose="kneel" robe="g" cloak="c" />
          <Person x={130} y={452} s={1.5} pose="kneel" robe="c" />
        </Fade>
      </Scene>

      {/* 4. What the good is: to become like Jesus. */}
      <Scene frame={frame} k={4}>
        <Sun x={690} y={90} r={22} />
        <Ambient frame={frame} on={4} off={5} kind="drift" dx={50}>
          <Cloud x={220} y={80} s={1.2} />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [200, 30],
            [600, 50],
          ]}
          hatch={h.hs}
        />
        <Ambient frame={frame} on={4} off={5} kind="sway">
          <Olive x={110} y={380} s={1.6} hatch={h.h2} />
        </Ambient>
        <path
          className="pl-f"
          d="M0,450C220,430 500,460 800,420M0,480C230,460 520,490 800,450"
        />
        <Person x={580} y={446} s={1.75} robe="p" cloak="b" pose="walk" />
        <Fade frame={frame} on={4} off={5} from="walk-left" at={3}>
          <Person x={400} y={452} s={1.6} robe="g" cloak="c" pose="walk" />
          <Person
            x={290}
            y={458}
            s={1.05}
            child
            head="bare"
            robe="b"
            pose="walk"
          />
        </Fade>
      </Scene>

      {/* 5. Room to groan. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V280H0Z" />
        <Ambient frame={frame} on={5} off={6} kind="twinkle">
          <Stars
            at={[
              [120, 70, 5],
              [640, 60, 5],
              [720, 170, 4],
              [70, 200, 4],
            ]}
          />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [220, 20],
            [620, 34],
          ]}
          hatch={h.hs}
        />
        <Olive x={600} y={392} s={2} hatch={h.h2} />
        <Person x={310} y={446} s={2.1} pose="bow" robe="b" />
        {/* The Spirit: wind, and one flame. */}
        <Draw
          frame={frame}
          on={5}
          off={6}
          at={4}
          slow={5}
          className="pl-f"
          d="M60,300C160,250 240,330 330,280C400,244 430,210 420,170"
        />
        <Draw
          frame={frame}
          on={5}
          off={6}
          at={6}
          slow={5}
          className="pl-f"
          d="M120,340C210,300 290,360 370,310C430,276 470,240 440,180"
        />
        <Fade frame={frame} on={5} off={6} from="down" at={9}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Flame x={430} y={150} s={1.6} gold />
          </Ambient>
        </Fade>
      </Scene>

      {/* 6. Nothing can separate. */}
      <Scene frame={frame} k={6}>
        <Ambient frame={frame} on={6} kind="glow">
          <Sun x={620} y={140} r={38} gold />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [200, 20],
            [620, 130],
          ]}
          hatch={h.hs}
        />
        <path className="pl-k" d="M614,262V150h10v112ZM590,180h58v10h-58Z" />
        <path
          className="pl-f"
          d="M0,470C200,440 420,430 590,300M60,500C260,460 470,440 610,300"
        />
        <Person x={250} y={452} s={1.6} robe="b" cloak="c" pose="reach" />
        <Person
          x={340}
          y={452}
          s={1.55}
          head="veil"
          robe="c"
          face={-1}
          pose="reach"
        />
        <Fade frame={frame} on={6} from="up" at={3}>
          <Person x={296} y={470} s={1} child head="bare" robe="g" />
        </Fade>
        <Grass
          at={[
            [90, 450],
            [480, 470],
            [740, 440],
          ]}
        />
      </Scene>
    </>
  ),
};

export default film;
