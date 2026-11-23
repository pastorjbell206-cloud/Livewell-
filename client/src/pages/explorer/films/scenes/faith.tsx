/**
 * "Faith: trusting the one who promised": the Study Bible's study of faith
 * and the catechism's answer (Q36), in seven pictures drawn with the stage set.
 *
 *   0  Not a leap in the dark  a child crossing a stream to a father's hands
 *   1  Abraham and the stars   the old man outside his tent at night
 *   2  Who you trust           a mustard seed between a person and Jesus
 *   3  Help my unbelief        a father kneeling, his son beside him
 *   4  How faith grows         a scroll read aloud under an olive tree
 *   5  Faith walks             Abraham and Sarah on the road
 *   6  Not yet seen            travellers at dawn; a city faint and far
 *
 * The one mustard mark: the seed (2), the rising sun (6). Abraham is the same
 * figure in pictures 1 and 5 (blue robe, clay cloak, a staff), and Sarah the
 * same (a veil, a clay robe). Jesus is one plain figure, as in the other films.
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Donkey,
  Grass,
  Hills,
  Ink,
  Moon,
  Mountain,
  Olive,
  Person,
  Scroll,
  Sheep,
  Stars,
  Sun,
  Tent,
  Water,
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

const ring = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

const CAMERA: [number, number, number][] = [
  [420, 350, 1.2],
  [300, 300, 1.1],
  [400, 380, 1.3],
  [400, 350, 1.2],
  [400, 350, 1.15],
  [380, 350, 1.12],
  [520, 300, 1.12],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A child crosses a stream to a father's hands. */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={120} y={90} r={22} />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={60}>
          <Cloud x={420} y={70} s={1.2} />
        </Ambient>
        <Hills
          y={360}
          peaks={[
            [160, 30],
            [640, 50],
          ]}
          hatch={h.hs}
        />
        <Ambient frame={frame} on={-1} off={1} kind="sway">
          <Olive x={700} y={330} s={1.7} hatch={h.h2} />
        </Ambient>
        {/* The stream, its far bank, and stepping stones. */}
        <Ink
          d="M-10,510V400C200,384 320,392 420,410C520,430 660,420 810,404V510Z"
          tone="b"
        />
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Water x={20} y={430} w={780} rows={4} gap={16} />
        </Ambient>
        <Ink
          d="M470,500C480,430 600,410 810,400V510H470Z"
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M230,432c0,-10 44,-10 44,0c0,8 -44,8 -44,0Z" tone="c" />
        <Ink d="M330,448c0,-10 48,-10 48,0c0,8 -48,8 -48,0Z" tone="c" />
        <Ink d="M420,462c0,-10 44,-10 44,0c0,8 -44,8 -44,0Z" tone="c" />
        <Person
          x={560}
          y={470}
          s={1.7}
          robe="b"
          cloak="c"
          pose="open"
          face={-1}
        />
        <Person
          x={352}
          y={446}
          s={1.05}
          child
          head="bare"
          robe="g"
          pose="reach"
        />
      </Fade>

      {/* 1. Abraham and the stars. */}
      <Scene frame={frame} k={1}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V270H0Z" />
        <Moon x={90} y={70} r={18} />
        <Fade frame={frame} on={1} off={2} at={4}>
          <Ambient frame={frame} on={1} off={2} kind="twinkle">
            <Stars
              at={[
                [180, 50, 6],
                [270, 120, 5],
                [360, 40, 6],
                [450, 140, 5],
                [540, 70, 6],
                [640, 130, 5],
                [730, 50, 6],
                [150, 190, 5],
                [700, 210, 5],
              ]}
            />
          </Ambient>
          <Ambient frame={frame} on={1} off={2} kind="twinkle" late={1.2}>
            <Stars
              at={[
                [220, 90, 4],
                [320, 180, 4],
                [410, 90, 4],
                [500, 200, 4],
                [590, 30, 4],
                [680, 90, 4],
                [770, 150, 4],
                [60, 150, 4],
                [250, 220, 4],
                [580, 220, 4],
              ]}
            />
          </Ambient>
        </Fade>
        <Hills
          y={340}
          peaks={[
            [150, 40],
            [460, 14],
            [700, 46],
          ]}
          hatch={h.hs}
        />
        <Tent x={590} y={392} s={1.5} hatch={h.h3} />
        <Person x={640} y={402} s={1.1} head="veil" robe="c" cloak="b" />
        <Person x={300} y={430} s={1.7} robe="b" cloak="c" staff="staff" />
        <Grass
          at={[
            [80, 440],
            [460, 450],
            [750, 430],
          ]}
        />
      </Scene>

      {/* 2. Who you trust: a mustard seed is enough. */}
      <Scene frame={frame} k={2}>
        <Mountain x={620} y={380} w={420} h={260} hatch={h.h2} />
        <Ambient frame={frame} on={2} off={3} kind="drift" dx={40}>
          <Cloud x={180} y={90} s={1.2} />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [200, 20],
            [600, 10],
          ]}
          hatch={h.hs}
        />
        <Person
          x={520}
          y={446}
          s={1.75}
          robe="p"
          cloak="b"
          pose="reach"
          face={-1}
        />
        <Person x={270} y={450} s={1.7} robe="c" pose="kneel" />
        {/* The seed: the one mustard mark, small on purpose. */}
        <Fade frame={frame} on={2} off={3} from="grow" at={5}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <path
              className="pl-f"
              strokeDasharray="2 4"
              d={ring(398, 452, 16)}
            />
          </Ambient>
          <path className="pl-m" d={ring(398, 452, 5)} />
          <path className="pl-l" d={ring(398, 452, 5)} />
        </Fade>
      </Scene>

      {/* 3. Help my unbelief. */}
      <Scene frame={frame} k={3}>
        <Ambient frame={frame} on={3} off={4} kind="drift" dx={-50}>
          <Cloud x={600} y={80} s={1.3} />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [220, 40],
            [600, 20],
          ]}
          hatch={h.hs}
        />
        <Olive x={90} y={372} s={1.5} hatch={h.h2} />
        <Fade frame={frame} on={3} off={4} from="up" at={8}>
          <Person x={650} y={420} s={1.3} robe="g" cloak="c" face={-1} />
          <Person x={716} y={428} s={1.3} robe="b" head="veil" face={-1} />
        </Fade>
        <Person
          x={500}
          y={446}
          s={1.75}
          robe="p"
          cloak="b"
          pose="reach"
          face={-1}
        />
        <Person x={250} y={452} s={1.7} robe="b" cloak="g" pose="kneel" />
        <Person x={356} y={458} s={1.1} child head="bare" robe="c" pose="sit" />
      </Scene>

      {/* 4. How faith grows: hearing. */}
      <Scene frame={frame} k={4}>
        <Sun x={110} y={90} r={22} />
        <Hills
          y={390}
          peaks={[
            [240, 20],
            [640, 34],
          ]}
          hatch={h.hs}
        />
        <Ambient frame={frame} on={4} off={5} kind="sway">
          <Olive x={230} y={380} s={2.6} hatch={h.h2} />
        </Ambient>
        <Person x={250} y={446} s={1.7} robe="b" cloak="c" pose="reach" />
        <Scroll x={330} y={372} s={1.1} />
        <Fade frame={frame} on={4} off={5} from="up" at={3}>
          <Person
            x={470}
            y={452}
            s={1.4}
            pose="sit"
            face={-1}
            head="veil"
            robe="c"
          />
          <Person x={570} y={458} s={1.4} pose="sit" face={-1} robe="g" />
          <Person
            x={520}
            y={476}
            s={0.9}
            child
            head="bare"
            pose="sit"
            face={-1}
            robe="b"
          />
          <Person
            x={660}
            y={452}
            s={1.35}
            pose="sit"
            face={-1}
            robe="b"
            cloak="g"
          />
        </Fade>
      </Scene>

      {/* 5. Faith walks: Abraham went. */}
      <Scene frame={frame} k={5}>
        <Sun x={690} y={90} r={22} />
        <Ambient frame={frame} on={5} off={6} kind="drift" dx={60}>
          <Cloud x={300} y={70} s={1.2} />
        </Ambient>
        <Hills
          y={380}
          peaks={[
            [140, 50],
            [460, 20],
            [720, 40],
          ]}
          hatch={h.hs}
        />
        <Tent x={90} y={352} s={0.8} hatch={h.h3} />
        <path
          className="pl-f"
          d="M0,440C220,420 520,450 800,400M0,470C240,450 540,480 800,430"
        />
        <Fade frame={frame} on={5} off={6} from="walk-left" at={2}>
          <Sheep x={210} y={456} s={1.2} />
          <Sheep x={270} y={466} s={1} lamb />
          <Donkey x={360} y={452} s={1.5} />
          <Ink d="M330,386c-4,-22 46,-26 50,-4c2,12 -48,14 -50,4Z" tone="b" />
          <Person
            x={470}
            y={452}
            s={1.3}
            head="veil"
            robe="c"
            cloak="b"
            pose="walk"
          />
          <Person
            x={570}
            y={450}
            s={1.7}
            robe="b"
            cloak="c"
            staff="staff"
            pose="walk"
          />
        </Fade>
      </Scene>

      {/* 6. Not yet seen. */}
      <Scene frame={frame} k={6}>
        <Ambient frame={frame} on={6} kind="glow">
          <Sun x={600} y={250} r={44} gold />
        </Ambient>
        <g opacity="0.55">
          <path
            className="pl-f"
            strokeDasharray="3 6"
            d="M520,286V236h10v-10h10v10h30v-8h10v8h50v-8h10v8h30v-10h10v10h10V286"
          />
        </g>
        <Hills
          y={380}
          peaks={[
            [200, 30],
            [600, 96],
          ]}
          hatch={h.hs}
        />
        <path
          className="pl-f"
          d="M0,470C200,440 420,430 590,290M60,500C260,460 470,440 610,290"
        />
        <Fade frame={frame} on={6} from="walk-left" at={3}>
          <Person
            x={180}
            y={462}
            s={1.6}
            pose="walk"
            robe="g"
            cloak="b"
            staff="staff"
          />
          <Person
            x={290}
            y={448}
            s={1.4}
            pose="walk"
            head="veil"
            robe="c"
            bundle
          />
          <Person
            x={376}
            y={434}
            s={1.05}
            pose="walk"
            child
            head="bare"
            robe="b"
          />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
