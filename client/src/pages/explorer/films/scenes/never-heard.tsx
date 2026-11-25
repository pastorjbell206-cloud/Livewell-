/**
 * "What about people who never heard?": what Christians confess together,
 * what the Bible says and does not say, and the three main answers, each
 * given a picture of its own and the same room, in seven pictures drawn
 * with the stage set.
 *
 *   0  An honest question        a child and an older woman; a far village
 *   1  One Savior                an empty cross on a far hill; roads to it
 *   2  Not far from anyone       a family by a fire under the stars
 *   3  One answer                a messenger on a long road
 *   4  A second answer           an old man under the stars (Abraham)
 *   5  A third answer            an open, lit doorway; no one drawn
 *   6  Who the Judge is          Jesus on a road; his friends setting out
 *
 * No person's end is drawn or hinted at: no one goes through the doorway,
 * no one is shown inside or outside anything. God is never drawn; Jesus is
 * one plain figure, as in the other films. The one mustard mark: the sun
 * (1, 3, 6), the fire (2), one star (4), the light in the doorway (5).
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Olive,
  Person,
  Stars,
  Sun,
  Tent,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";

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

/** A far village: three small houses on the land. */
const Village = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <>
    <House x={x} y={y} s={0.5 * s} />
    <House x={x + 52 * s} y={y + 4 * s} s={0.42 * s} tone="b" />
    <House x={x - 44 * s} y={y + 6 * s} s={0.4 * s} tone="g" />
  </>
);

const GoldStar = ({ x, y, r = 9 }: { x: number; y: number; r?: number }) => {
  const d = `M${x},${y - r * 1.7}L${x + r * 0.42},${y - r * 0.42}L${x + r * 1.7},${y}L${x + r * 0.42},${y + r * 0.42}L${x},${y + r * 1.7}L${x - r * 0.42},${y + r * 0.42}L${x - r * 1.7},${y}L${x - r * 0.42},${y - r * 0.42}Z`;
  return (
    <>
      <path className="pl-m" d={d} />
      <path className="pl-f" d={d} />
    </>
  );
};

const CAMERA: [number, number, number][] = [
  [360, 320, 1.12],
  [470, 240, 1.12],
  [400, 330, 1.16],
  [440, 320, 1.12],
  [340, 290, 1.14],
  [400, 290, 1.14],
  [400, 320, 1.12],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The question, asked on a hillside. */}
      <Fade frame={frame} on={-1} off={1}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V200H0Z" />
        <Sun x={690} y={250} r={24} />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={40}>
          <Cloud x={420} y={110} s={1.1} />
        </Ambient>
        <Hills
          y={330}
          peaks={[
            [470, 30],
            [700, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Village x={600} y={322} />
        <path className="pl-f" d="M330,500C420,440 520,380 590,326" />
        {/* The near hill, and the two who sit on it. */}
        <Ink
          d="M-10,510V370C80,330 250,330 340,390C380,420 400,470 410,510Z"
          tone="g"
          hatch={h.h2}
        />
        <Ambient frame={frame} on={-1} off={1} kind="sway">
          <Olive x={70} y={350} s={1.5} hatch={h.h2} />
        </Ambient>
        <Person
          x={200}
          y={368}
          s={1.5}
          pose="sit"
          robe="b"
          cloak="c"
          head="veil"
        />
        <Person
          x={274}
          y={378}
          s={1.05}
          pose="sit"
          robe="c"
          child
          head="bare"
        />
        <Grass
          at={[
            [130, 380],
            [330, 410],
          ]}
        />
      </Fade>

      {/* 1. One Savior: the cross, and roads from every side. */}
      <Scene frame={frame} k={1}>
        <Fade frame={frame} on={1} off={2} from="up" at={3}>
          <Ambient frame={frame} on={1} off={2} kind="glow">
            <Sun x={470} y={150} r={40} gold />
          </Ambient>
        </Fade>
        <Ink d="M340,300C380,190 560,190 600,300Z" tone="g" hatch={h.hs} />
        <path className="pl-k" d="M464,222V132h10v90ZM440,156h58v9h-58Z" />
        <Hills
          y={320}
          peaks={[
            [140, 30],
            [660, 24],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C250,360 560,366 810,378V510Z" tone="g" />
        {/* The roads. */}
        <path
          className="pl-f"
          d="M0,470C200,440 380,380 452,300M20,400C180,380 340,340 440,296M800,470C640,440 540,380 486,300M780,396C660,380 560,340 498,296M400,500C420,440 452,360 466,300M470,500C476,440 474,360 474,300"
        />
        <Village x={110} y={372} s={1.1} />
        <Village x={700} y={372} s={1.1} />
        <Fade frame={frame} on={1} off={2} from="up" at={7}>
          <Person x={250} y={470} s={1.1} pose="walk" robe="b" cloak="c" />
          <Person
            x={610}
            y={476}
            s={1.1}
            pose="walk"
            face={-1}
            robe="g"
            head="veil"
          />
          <Person x={438} y={486} s={1.1} pose="walk" robe="c" staff="staff" />
        </Fade>
      </Scene>

      {/* 2. Not far from anyone: a family, a fire, the stars. */}
      <Scene frame={frame} k={2}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V380H0Z" />
        <Ambient frame={frame} on={2} off={3} kind="twinkle">
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
              [470, 230, 3],
              [640, 220, 3],
              [380, 110, 3],
            ]}
          />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [200, 30],
            [620, 44],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Tent x={630} y={436} s={1.5} hatch={h.h3} />
        {/* The fire. */}
        <path className="pl-l" d="M370,470L420,456M374,456L424,470" />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <Ambient frame={frame} on={2} off={3} kind="flicker">
            <path
              className="pl-m"
              d="M398,456C412,438 418,424 410,404C394,420 386,438 398,456Z"
            />
            <path
              className="pl-f"
              d="M398,456C412,438 418,424 410,404C394,420 386,438 398,456Z"
            />
          </Ambient>
        </Fade>
        <Person x={290} y={474} s={1.4} pose="sit" robe="c" cloak="g" />
        <Person
          x={500}
          y={474}
          s={1.4}
          pose="sit"
          face={-1}
          robe="b"
          head="veil"
        />
        <Fade frame={frame} on={2} off={3} from="up" at={7}>
          <Person
            x={218}
            y={480}
            s={0.95}
            pose="sit"
            robe="g"
            child
            head="bare"
          />
        </Fade>
      </Scene>

      {/* 3. The first answer: a messenger on a long road. */}
      <Scene frame={frame} k={3}>
        <Sun x={130} y={90} r={26} gold />
        <Ambient frame={frame} on={3} off={4} kind="drift" dx={50}>
          <Cloud x={420} y={90} s={1.1} />
        </Ambient>
        <Hills
          y={340}
          peaks={[
            [300, 40],
            [640, 70],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Village x={650} y={300} />
        <Ink d="M-10,510V390C240,372 560,380 810,366V510Z" tone="c" />
        <path
          className="pl-f"
          d="M0,470C240,450 460,420 560,360C600,336 624,318 640,304M0,500C260,476 500,440 600,370"
        />
        <Fade frame={frame} on={3} off={4} from="walk-left" at={2}>
          <Person
            x={300}
            y={470}
            s={1.7}
            pose="walk"
            robe="g"
            cloak="b"
            staff="staff"
            bundle
          />
        </Fade>
        <Grass
          at={[
            [90, 420],
            [480, 470],
            [720, 420],
          ]}
        />
      </Scene>

      {/* 4. The second answer: Abraham, long before Bethlehem. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V500H0Z" />
        <Ambient frame={frame} on={4} off={5} kind="twinkle">
          <Stars
            at={[
              [90, 80, 4],
              [180, 160, 3],
              [270, 60, 3],
              [470, 70, 4],
              [560, 150, 3],
              [650, 60, 4],
              [730, 140, 3],
              [600, 250, 3],
              [710, 290, 3],
              [120, 250, 3],
              [520, 300, 3],
            ]}
          />
        </Ambient>
        <Ink
          d="M-10,510V400C120,330 300,310 420,360C520,400 640,440 810,430V510Z"
          tone="b"
          hatch={h.hs}
        />
        <Person
          x={300}
          y={352}
          s={1.7}
          pose="stand"
          robe="c"
          cloak="g"
          staff="staff"
        />
        <Fade frame={frame} on={4} off={5} from="grow" at={5}>
          <GoldStar x={400} y={120} r={11} />
        </Fade>
      </Scene>

      {/* 5. The third answer: an open door. No one is drawn. */}
      <Scene frame={frame} k={5}>
        <Ink d="M-10,400V60H810V400Z" tone="c" hatch={h.hs} />
        <path
          className="pl-f"
          d="M0,170H800M0,290H800M160,60V170M520,170V290M660,60V170M220,290V400M620,290V400"
        />
        <Ink d="M-10,510V400H810V510Z" tone="g" />
        <path
          className="pl-f"
          d="M330,500C350,460 366,430 372,400M470,500C450,460 434,430 428,400"
        />
        <path
          className="pl-paper"
          d="M340,400V210C340,150 460,150 460,210V400Z"
        />
        <Fade frame={frame} on={5} off={6} at={3}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path
              className="pl-m"
              d="M356,400V214C356,170 444,170 444,214V400Z"
            />
          </Ambient>
        </Fade>
        <path className="pl-l" d="M340,400V210C340,150 460,150 460,210V400" />
        <path className="pl-f" d="M356,400V214C356,170 444,170 444,214V400" />
        <Grass
          at={[
            [200, 440],
            [600, 450],
          ]}
        />
      </Scene>

      {/* 6. Who the Judge is, and whom he sends. */}
      <Scene frame={frame} k={6}>
        <Fade frame={frame} on={6} at={6}>
          <Ambient frame={frame} on={6} kind="glow">
            <Sun x={130} y={100} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={340}
          peaks={[
            [420, 30],
            [680, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Village x={690} y={308} />
        <Ink d="M-10,510V390C240,370 560,384 810,372V510Z" tone="g" />
        <path
          className="pl-f"
          d="M120,500C300,450 520,420 640,340M200,500C380,460 560,430 668,340M400,440C430,400 452,366 462,340"
        />
        <Person x={230} y={460} s={1.8} pose="reach" robe="p" cloak="b" />
        <Fade frame={frame} on={6} from="left" at={3}>
          <Person
            x={430}
            y={440}
            s={1.2}
            pose="walk"
            robe="g"
            cloak="c"
            staff="staff"
          />
          <Person
            x={500}
            y={424}
            s={1.1}
            pose="walk"
            robe="c"
            cloak="b"
            bundle
          />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
