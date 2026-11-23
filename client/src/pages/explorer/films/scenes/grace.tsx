/**
 * "Grace: the gift no one earns": the family catechism's answer (Q35) and
 * the passages it rests on, in seven pictures drawn with the stage set.
 *
 *   0  A wage or a gift?   a landowner pays a worker; a father gives bread
 *   1  The late workers    the vineyard at sunset, and the pay (Matthew 20)
 *   2  While we were still sinners  the cross, and people walking away
 *   3  Empty hands         a person kneeling, hands open; scales set aside
 *   4  Not a licence       a broken chain behind, a road, a tree in fruit
 *   5  Enough for today    Paul writing by lamplight
 *   6  Passed on           two people making peace; children sharing bread
 *
 * The one mustard mark of each picture is its light: the sun behind the
 * cross (2), the light from above (3), the lamp's flame (5). God is never
 * drawn. The landowner is the landowner in Jesus' story.
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Olive,
  Person,
  Place,
  Rays,
  Scroll,
  Stars,
  Sun,
  Table,
  Wheat,
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

/** A coin, a loaf: small things passed from hand to hand. */
const Coin = ({ x, y }: { x: number; y: number }) => (
  <Place x={x} y={y}>
    <Ink d="M-7,0a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
  </Place>
);
const Loaf = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <Place x={x} y={y} s={s}>
    <Ink d="M-14,0C-14,-14 14,-14 14,0Z" tone="c" />
    <path className="pl-f" d="M-6,-8l3,6M0,-10l3,6M6,-8l3,6" />
  </Place>
);

/** A row of vines on their stakes, from x to x + w. */
function Vines({ x, y, w }: { x: number; y: number; w: number }) {
  const out: ReactNode[] = [];
  for (let i = 0, xx = x; xx < x + w; xx += 56, i++)
    out.push(
      <g key={xx}>
        <path className="pl-l" d={`M${xx},${y}V${y - 46}`} />
        <path
          className="pl-f"
          d={`M${xx},${y - 40}C${xx + 14},${y - 56} ${xx + 30},${y - 28} ${xx + 56},${y - 42}`}
        />
        <Place x={xx + 26} y={y - 22} s={0.8}>
          <Ink
            d="M-8,-12a5,5 0 1,0 10,0a5,5 0 1,0 6,2a5,5 0 1,0 -2,8a5,5 0 1,0 -8,4a5,5 0 1,0 -8,-6a5,5 0 1,0 2,-8Z"
            tone={i % 2 ? "b" : "c"}
          />
        </Place>
        <Place x={xx + 10} y={y - 44} s={0.8}>
          <Ink d="M0,0C-10,-12 -2,-22 8,-18C16,-10 10,0 0,0Z" tone="g" />
        </Place>
      </g>
    );
  return <>{out}</>;
}

const CAMERA: [number, number, number][] = [
  [330, 340, 1.15],
  [430, 350, 1.15],
  [520, 280, 1.12],
  [400, 330, 1.25],
  [480, 330, 1.12],
  [380, 340, 1.25],
  [380, 350, 1.15],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A wage or a gift? */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={690} y={110} r={22} />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={50}>
          <Cloud x={200} y={80} s={1.2} />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [180, 20],
            [620, 30],
          ]}
          hatch={h.hs}
        />
        <House x={640} y={392} s={1.6} hatch={h.h3} />
        <Wheat x={60} y={420} s={1.4} />
        <Wheat x={110} y={430} s={1.3} />
        {/* The wage: a coin from the landowner to the worker. */}
        <Person x={200} y={436} s={1.6} robe="b" cloak="c" pose="reach" />
        <Person
          x={330}
          y={440}
          s={1.5}
          robe="g"
          face={-1}
          pose="reach"
          head="bare"
        />
        <Coin x={266} y={338} />
      </Fade>
      {/* The gift: a father, a child, a loaf. */}
      <Fade frame={frame} on={-1} off={1} from="up" at={5}>
        <Person x={470} y={446} s={1.55} robe="c" cloak="b" pose="reach" />
        <Person
          x={560}
          y={452}
          s={1}
          child
          head="bare"
          robe="g"
          face={-1}
          pose="reach"
        />
        <Loaf x={524} y={376} s={1.2} />
      </Fade>

      {/* 1. The late workers: the vineyard at sunset. */}
      <Scene frame={frame} k={1}>
        <Sun x={110} y={300} r={34} />
        <Hills
          y={330}
          peaks={[
            [300, 40],
            [640, 70],
          ]}
          hatch={h.hs}
        />
        <Vines x={20} y={330} w={300} />
        <Vines x={420} y={310} w={380} />
        <Ink d="M-10,510V400H810V510Z" tone="c" hatch={h.hs} />
        <Person x={400} y={452} s={1.65} robe="b" cloak="c" pose="reach" />
        <Fade frame={frame} on={1} off={2} from="walk-right" at={3}>
          <Person
            x={530}
            y={452}
            s={1.5}
            robe="p"
            face={-1}
            pose="reach"
            head="bare"
          />
          <Coin x={466} y={350} />
        </Fade>
        <Fade frame={frame} on={1} off={2} from="walk-left" at={8}>
          <Person x={150} y={458} s={1.55} robe="g" staff="staff" />
          <Person x={250} y={456} s={1.6} robe="c" cloak="g" pose="reach" />
        </Fade>
      </Scene>

      {/* 2. While we were still sinners: the cross, and people walking away. */}
      <Scene frame={frame} k={2}>
        <Ambient frame={frame} on={2} off={3} kind="glow">
          <Sun x={560} y={170} r={46} gold />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [160, 10],
            [560, 150],
          ]}
          hatch={h.hs}
        />
        <path className="pl-k" d="M554,244V120h12v124ZM524,152h72v12h-72Z" />
        <Grass
          at={[
            [60, 430],
            [420, 440],
            [720, 420],
          ]}
        />
        <Fade frame={frame} on={2} off={3} from="walk-right" at={3}>
          <Person x={330} y={452} s={1.5} face={-1} pose="walk" robe="b" />
          <Person
            x={236}
            y={458}
            s={1.55}
            face={-1}
            pose="walk"
            head="veil"
            robe="c"
          />
          <Person
            x={140}
            y={452}
            s={1.5}
            face={-1}
            pose="walk"
            robe="g"
            cloak="b"
            bundle
          />
        </Fade>
      </Scene>

      {/* 3. Empty hands. */}
      <Scene frame={frame} k={3}>
        <Ambient frame={frame} on={3} off={4} kind="glow">
          <Sun x={400} y={30} r={26} gold />
        </Ambient>
        <Rays x={400} y={50} reach={200} spread={120} n={9} />
        <Hills
          y={410}
          peaks={[
            [200, 16],
            [620, 26],
          ]}
          hatch={h.hs}
        />
        <Person x={380} y={440} s={2.1} pose="pray" robe="c" cloak="b" />
        {/* The scales, set aside. */}
        <Fade frame={frame} on={3} off={4} from="down" at={7}>
          <g transform="rotate(-18 640 440)">
            <path
              className="pl-l"
              d="M640,440V360M596,372H684M600,372l-12,34M600,372l12,34M680,372l-12,34M680,372l12,34"
            />
            <Ink d="M584,406h32c0,10 -32,10 -32,0Z" tone="b" />
            <Ink d="M664,406h32c0,10 -32,10 -32,0Z" tone="b" />
            <Ink d="M624,440h32l-6,-8h-20Z" tone="c" />
          </g>
        </Fade>
      </Scene>

      {/* 4. Not a licence: the chain behind, the road, the tree in fruit. */}
      <Scene frame={frame} k={4}>
        <Sun x={110} y={90} r={22} />
        <Ambient frame={frame} on={4} off={5} kind="drift" dx={-60}>
          <Cloud x={520} y={80} s={1.2} />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [240, 24],
            [620, 50],
          ]}
          hatch={h.hs}
        />
        <path
          className="pl-f"
          d="M60,470C240,440 420,450 600,380M90,490C280,460 460,470 640,392"
        />
        {/* The broken chain. */}
        <path
          className="pl-l"
          d="M70,444a11,8 0 1,0 22,0a11,8 0 1,0 -22,0M88,444a11,8 0 1,0 22,0a11,8 0 1,0 -22,0M118,438c8,-6 16,-2 18,6M150,452a11,8 0 1,0 22,0a11,8 0 1,0 -22,0"
        />
        <Ambient frame={frame} on={4} off={5} kind="sway">
          <Olive x={650} y={356} s={2} hatch={h.h2} />
        </Ambient>
        <Fade frame={frame} on={4} off={5} from="grow" at={9}>
          <path
            className="pl-c"
            d="M600,250a6,6 0 1,0 12,0a6,6 0 1,0 -12,0M640,222a6,6 0 1,0 12,0a6,6 0 1,0 -12,0M684,244a6,6 0 1,0 12,0a6,6 0 1,0 -12,0M660,276a6,6 0 1,0 12,0a6,6 0 1,0 -12,0M704,280a6,6 0 1,0 12,0a6,6 0 1,0 -12,0"
          />
        </Fade>
        <Fade frame={frame} on={4} off={5} from="walk-left" at={3}>
          <Person
            x={360}
            y={452}
            s={1.6}
            pose="walk"
            robe="b"
            cloak="c"
            staff="staff"
          />
        </Fade>
      </Scene>

      {/* 5. Enough for today: Paul writing by lamplight. */}
      <Scene frame={frame} k={5}>
        <path className="pl-f" d="M0,70H800M0,74H800" />
        <Ink d="M-10,510V430H810V510Z" tone="g" />
        <path fill={h.h3} d="M0,450H800V500H0Z" />
        <Ink d="M540,300V120H700V300Z" tone="b" />
        <path className="fp-dark" fill={h.h2} d="M552,288V132H688V288Z" />
        <path className="pl-l" d="M552,288V132H688V288Z" />
        <Ambient frame={frame} on={5} off={6} kind="twinkle">
          <Stars
            at={[
              [590, 170, 5],
              [650, 230, 4],
              [620, 260, 3],
            ]}
          />
        </Ambient>
        <path className="pl-l" d="M150,440V250" />
        <Person x={330} y={436} s={2} pose="sit" robe="c" cloak="b" />
        <Scroll x={452} y={404} s={1.2} />
        <Ink d="M400,436V408H500V436Z" tone="c" />
        <Ambient frame={frame} on={5} off={6} kind="flicker">
          <Lamp x={250} y={300} s={1.5} gold />
        </Ambient>
        <path className="pl-l" d="M214,302H290" />
      </Scene>

      {/* 6. Passed on. */}
      <Scene frame={frame} k={6}>
        <Sun x={700} y={90} r={22} />
        <Hills
          y={400}
          peaks={[
            [200, 30],
            [640, 16],
          ]}
          hatch={h.hs}
        />
        <House x={130} y={396} s={1.7} hatch={h.h3} />
        <Ambient frame={frame} on={6} kind="sway">
          <Olive x={720} y={388} s={1.5} hatch={h.h2} />
        </Ambient>
        <Person x={330} y={446} s={1.6} robe="b" cloak="c" pose="reach" />
        <Fade frame={frame} on={6} from="walk-right" at={3}>
          <Person
            x={440}
            y={446}
            s={1.6}
            robe="g"
            face={-1}
            pose="reach"
            head="veil"
          />
        </Fade>
        <Fade frame={frame} on={6} from="up" at={8}>
          <Table x={610} y={462} s={1.3} />
          <Person
            x={540}
            y={462}
            s={0.95}
            child
            head="bare"
            robe="c"
            pose="reach"
          />
          <Person
            x={680}
            y={462}
            s={0.95}
            child
            head="bare"
            robe="b"
            face={-1}
            pose="reach"
          />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
