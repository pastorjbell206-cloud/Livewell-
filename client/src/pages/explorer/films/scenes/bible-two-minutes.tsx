/**
 * "The whole Bible in two minutes": the story itself, a picture for each
 * movement, and under it the map's road, inked as the story goes.
 *
 * The stage's upper four fifths show the movement with the stage set's cast
 * and setting (components/art/stage.tsx), and the picture moves as the words
 * are said: a cloud drifts, a tree sways, stars come out, people walk in. A
 * movement with two halves (the mountain after the sea, the king after the
 * harvest, the hill and the open tomb after the lakeside) is two panels side
 * by side, and the second arrives part-way through.
 *
 * Along the foot runs the road from the garden to the city, with a faint ring
 * where each of the thirteen stops will stand. Each frame inks the road a
 * little further, and the stops of that movement appear on it as the map's own
 * roundels (art.tsx), so the film and the map are one world. The one mustard
 * mark is the traveller, a small disc that goes along the road to where the
 * story is.
 *
 *   0  Made good      a garden: a great tree, a river, sheep, two people
 *   1  Broken         the garden's gate shut, a sword across it; two walk away
 *   2  A promise      a tent under the stars; Abraham looks up
 *   3  Rescued, law   a road through walls of water | the mountain and tablets
 *   4  Land, king     houses and grain | the shepherd king
 *   5  Exile          a broken wall, people led away | a lamp, a scroll, a wall rebuilt
 *   6  Jesus          teaching by the lake | a hill, a cross, an open tomb
 *   7  The church     flames over a gathered people | then they go out
 *   8  All things new the city's gate open, the river, the tree, people coming
 *
 * Poster (frame -1): the road faint and empty, and above it the garden's tree
 * on the left and the city's open gate on the right, the first stop and the last.
 */
import { useId, type ReactNode } from "react";
import type { Hatch } from "@/components/art/PlateSvg";
import {
  Boat,
  CityWall,
  Cloud,
  Dove,
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Moon,
  Mountain,
  Olive,
  Palm,
  Person,
  Place,
  Rays,
  Scaled,
  Scroll,
  Sheep,
  Stars,
  Sun,
  Tent,
  Water,
  Wheat,
} from "@/components/art/stage";
import { Roundel } from "../../art";
import { Ambient, Fade, Travel, type FilmDrawing } from "../motion";
import { Flame } from "./figures";

/** The road along the foot of the stage, from the garden to the city. */
const ROAD_Y = 452;
const ROAD = `M14,${ROAD_Y}H786`;

/** The thirteen stops in order, and where each stands on the road. */
const STOPS = [
  "creation",
  "fall",
  "abraham",
  "rescue",
  "sinai",
  "land",
  "kingdom",
  "exile",
  "return",
  "jesus",
  "cross",
  "church",
  "new-creation",
];
const stopX = (i: number) => 52 + 58 * i;

/** The stops each frame brings onto the road, in order. */
const FRAMES: string[][] = [
  ["creation"],
  ["fall"],
  ["abraham"],
  ["rescue", "sinai"],
  ["land", "kingdom"],
  ["exile", "return"],
  ["jesus", "cross"],
  ["church"],
  ["new-creation"],
];

/** Where the road's ink ends at each frame (poster first): just past the newest stop. */
const REACH = [
  14,
  ...FRAMES.map(f => stopX(STOPS.indexOf(f[f.length - 1])) + 29),
];
REACH[REACH.length - 1] = 786;

const R = 22;
const frameOf = (slug: string) => FRAMES.findIndex(f => f.includes(slug));

const ring = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

// A two-part frame is two panels side by side. Each is drawn in a small
// frame of its own, 252 wide and 226 tall, and enlarged to half the stage.
const PW = 252;
const HALF = 400 / PW;

/** One panel of a two-part frame: "a" on the left, "b" on the right. */
function Half({ side, children }: { side: "a" | "b"; children: ReactNode }) {
  const id = `b2m${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const x = side === "a" ? 0 : 400;
  return (
    <>
      <clipPath id={id}>
        <path d={`M${x},0h400v400h-400Z`} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <Scaled x={x} y={400 - 226 * HALF} k={HALF}>
          {children}
        </Scaled>
      </g>
    </>
  );
}

/** The two tablets of the law. */
const Tablets = ({ x, y }: { x: number; y: number }) => (
  <Place x={x} y={y}>
    <Ink d="M-24,0V-40C-24,-54 -2,-54 -2,-40V0Z" tone="c" />
    <Ink d="M2,0V-40C2,-54 24,-54 24,-40V0Z" tone="c" />
    <path
      className="pl-f"
      d="M-19,-34h12M-19,-26h12M-19,-18h12M-19,-10h12M7,-34h12M7,-26h12M7,-18h12M7,-10h12"
    />
  </Place>
);

/** The ground under a panel, to its foot. */
const Floor = ({ h, y = 214 }: { h: Hatch; y?: number }) => (
  <>
    <path className="pl-l" d={`M0,${y}H${PW}`} />
    <path fill={h.hs} d={`M0,${y}H${PW}V240H0Z`} />
  </>
);

/** One picture for each movement of the story. */
function scenes(h: Hatch, frame: number): ReactNode[] {
  return [
    // 0. Made good: the garden.
    <>
      <Sun x={694} y={70} r={26} />
      <Ambient frame={frame} on={0} off={1} kind="drift" dx={70}>
        <Cloud x={150} y={84} s={1.2} />
      </Ambient>
      <Ambient frame={frame} on={0} off={1} kind="drift" dx={-90}>
        <Dove x={520} y={96} s={1} face={-1} />
      </Ambient>
      <Hills
        y={296}
        floor={400}
        peaks={[
          [140, 36],
          [420, 60],
          [700, 30],
        ]}
        hatch={h.hs}
      />
      <Palm x={84} y={292} s={1.25} />
      <Ambient frame={frame} on={0} off={1} kind="sway">
        <Olive x={300} y={300} s={2.5} hatch={h.h2} />
      </Ambient>
      <Ambient frame={frame} on={0} off={1} kind="bob">
        <Water x={420} y={352} w={390} rows={3} gap={15} />
      </Ambient>
      <Sheep x={150} y={346} s={1.3} graze />
      <Sheep x={214} y={366} s={1.2} lamb face={-1} />
      <Grass
        at={[
          [40, 372],
          [258, 384],
          [380, 372],
          [700, 330],
        ]}
      />
      {/* The people God made, standing among the plants of the garden. */}
      <Fade frame={frame} on={0} off={1} from="up" at={7}>
        <Person x={520} y={336} s={1.2} head="bare" robe="g" />
        <Person x={572} y={338} s={1.14} head="bare" robe="g" face={-1} />
        <Ink
          d="M470,342C466,300 504,286 520,304C534,280 574,286 578,308C604,296 624,318 614,342Z"
          tone="g"
          hatch={h.hs}
        />
      </Fade>
    </>,

    // 1. Broken: the way back shut.
    <>
      <Ambient frame={frame} on={1} off={2} kind="drift" dx={50}>
        <Cloud x={170} y={80} s={1.4} />
        <path fill={h.h1} d="M120,80h100v-14h-100Z" />
      </Ambient>
      <Olive x={566} y={190} s={2} hatch={h.h2} />
      {/* The garden's wall and its gate, shut. */}
      <Ink d="M-10,286V164H810V286Z" tone="b" hatch={h.hs} />
      <path
        className="pl-f"
        d="M0,204H800M0,244H800M70,164V204M180,204V244M300,164V204M420,204V244M690,164V204M740,204V244M110,244V286M360,244V286M700,244V286"
      />
      <path
        className="pl-paper"
        d="M516,286V192C516,146 616,146 616,192V286Z"
      />
      <path fill={h.h3} d="M516,286V192C516,146 616,146 616,192V286Z" />
      <path
        className="pl-l"
        d="M516,286V192C516,146 616,146 616,192V286M566,158V286"
      />
      {/* The sword across it. */}
      <Fade frame={frame} on={1} off={2} from="grow" at={9}>
        <path className="pl-paper" d="M498,272L636,166L643,175L506,281Z" />
        <path className="pl-l" d="M498,272L636,166L643,175L506,281Z" />
        <path className="pl-k" d="M488,258l26,32l-8,7l-26,-32Z" />
      </Fade>
      <Hills
        y={300}
        floor={400}
        peaks={[
          [160, 14],
          [600, 12],
        ]}
        tone="c"
        hatch={h.hs}
      />
      {/* Thorns in the ground. */}
      <path
        className="pl-f"
        d="M60,384l12,-26l8,16l10,-28l8,24l12,-16M640,390l10,-24l8,14l10,-26l10,26l10,-14M420,372l8,-18l6,10l8,-20l8,20"
      />
      {/* The two walk away. */}
      <Fade frame={frame} on={1} off={2} from="walk-right" at={3}>
        <Person
          x={330}
          y={376}
          s={1.3}
          face={-1}
          pose="walk"
          robe="c"
          head="bare"
        />
        <Person
          x={266}
          y={384}
          s={1.24}
          face={-1}
          pose="walk"
          robe="c"
          head="bare"
        />
      </Fade>
    </>,

    // 2. A promise: the tent under the stars.
    <>
      <path className="fp-dark" fill={h.h1} d="M0,0H800V250H0Z" />
      <Moon x={704} y={62} r={20} />
      <Fade frame={frame} on={2} off={3} at={5}>
        <Ambient frame={frame} on={2} off={3} kind="twinkle">
          <Stars
            at={[
              [60, 40, 6],
              [150, 110, 5],
              [250, 50, 6],
              [340, 130, 5],
              [430, 60, 6],
              [520, 150, 5],
              [600, 90, 6],
              [110, 190, 5],
              [760, 170, 5],
            ]}
          />
        </Ambient>
        <Ambient frame={frame} on={2} off={3} kind="twinkle" late={1.3}>
          <Stars
            at={[
              [100, 80, 4],
              [200, 150, 4],
              [300, 90, 4],
              [390, 190, 4],
              [470, 120, 4],
              [560, 40, 4],
              [650, 160, 4],
              [30, 140, 4],
              [730, 110, 4],
              [280, 200, 4],
              [180, 34, 4],
              [480, 200, 4],
            ]}
          />
        </Ambient>
      </Fade>
      <Hills
        y={318}
        floor={400}
        peaks={[
          [130, 44],
          [420, 18],
          [690, 50],
        ]}
        hatch={h.hs}
      />
      <Tent x={556} y={372} s={1.5} hatch={h.h3} />
      <Person x={612} y={382} s={1.05} head="veil" robe="c" cloak="b" />
      <Person x={250} y={388} s={1.5} robe="b" cloak="c" staff="staff" />
      <Grass
        at={[
          [60, 384],
          [400, 390],
          [740, 380],
        ]}
      />
    </>,

    // 3. Rescued, and given God's law.
    <>
      <Half side="a">
        {/* The sea: two walls of water, and a dry road between. */}
        <Ink
          d="M-4,44C24,30 50,54 78,38C92,32 100,44 104,56L92,214H-4Z"
          tone="b"
        />
        <Ink
          d="M256,44C228,30 202,54 174,38C160,32 152,44 148,56L160,214H256Z"
          tone="b"
        />
        <Ambient frame={frame} on={3} off={4} kind="bob">
          <Water x={4} y={76} w={96} rows={7} gap={18} />
          <Water x={160} y={76} w={96} rows={7} gap={18} />
        </Ambient>
        <path className="pl-f" d="M104,214L118,70M148,214L134,70" />
        <Fade frame={frame} on={3} off={4} from="up" at={3}>
          <Person x={126} y={184} s={0.5} robe="c" cloak="b" staff="staff" />
          <Person x={108} y={202} s={0.44} head="veil" robe="g" />
          <Person x={144} y={204} s={0.42} robe="b" bundle pose="walk" />
          <Person x={126} y={214} s={0.34} child head="bare" robe="c" />
        </Fade>
        <Floor h={h} />
      </Half>
      {/* The mountain, and the tablets of the law. */}
      <Fade frame={frame} on={3} off={4} from="up" at={11}>
        <Half side="b">
          <path className="pl-paper" d={`M0,-30H${PW}V240H0Z`} />
          <Mountain x={126} y={214} w={240} h={176} hatch={h.h2} />
          <Ambient frame={frame} on={3} off={4} kind="drift" dx={18}>
            <Cloud x={120} y={62} s={0.9} />
            <path fill={h.h1} d="M88,62h64v-10h-64Z" />
          </Ambient>
          <Tablets x={126} y={214} />
          <Person x={46} y={220} s={0.46} robe="g" />
          <Person x={208} y={220} s={0.46} head="veil" robe="c" />
          <Floor h={h} />
        </Half>
      </Fade>
    </>,

    // 4. A land and a king.
    <>
      <Half side="a">
        <Sun x={44} y={40} r={16} />
        <Hills
          y={170}
          w={PW}
          floor={240}
          peaks={[
            [80, 26],
            [200, 40],
          ]}
          hatch={h.hs}
        />
        <House x={186} y={172} s={0.72} hatch={h.h3} />
        <Palm x={112} y={174} s={0.7} />
        <Ambient frame={frame} on={4} off={5} kind="sway">
          <Wheat x={30} y={210} s={0.9} />
          <Wheat x={66} y={218} s={0.9} />
          <Wheat x={100} y={210} s={0.8} />
          <Wheat x={228} y={218} s={0.8} />
        </Ambient>
        <Person x={150} y={220} s={0.5} pose="reach" face={-1} robe="b" />
      </Half>
      {/* The shepherd king, and the promise of a king for ever. */}
      <Fade frame={frame} on={4} off={5} from="up" at={10}>
        <Half side="b">
          <path className="pl-paper" d={`M0,-30H${PW}V240H0Z`} />
          <Ambient frame={frame} on={4} off={5} kind="drift" dx={24}>
            <Cloud x={190} y={40} s={0.7} />
          </Ambient>
          <Hills
            y={196}
            w={PW}
            floor={240}
            peaks={[
              [60, 30],
              [190, 18],
            ]}
            tone="c"
            hatch={h.hs}
          />
          <Person
            x={126}
            y={206}
            s={1.3}
            head="crown"
            robe="b"
            cloak="c"
            staff="crook"
          />
          <Sheep x={52} y={212} s={0.9} />
          <Sheep x={206} y={216} s={0.85} face={-1} graze />
          <Sheep x={84} y={224} s={0.8} lamb />
        </Half>
      </Fade>
    </>,

    // 5. Exile, and promises in the dark.
    <>
      <Half side="a">
        <path className="fp-dark" fill={h.h1} d={`M0,-30H${PW}V40H0Z`} />
        {/* The city's wall broken, and smoke over it. */}
        <CityWall x={150} y={170} w={220} s={0.84} hatch={h.h3} />
        <path
          className="pl-paper"
          d="M96,172L110,112L122,142L130,104L146,172Z"
        />
        <path className="pl-l" d="M96,172L110,112L122,142L130,104L146,172" />
        <Ink
          d="M100,172v-10h14v10ZM118,172v-8h12v8ZM108,162v-8h12v8Z"
          tone="c"
        />
        <Ambient frame={frame} on={5} off={6} kind="drift" dx={-26}>
          <path
            className="pl-f"
            d="M170,76C156,58 182,44 168,26C160,14 172,2 166,-8M196,82C186,66 204,54 196,38"
          />
        </Ambient>
        <path className="pl-l" d={`M0,172H${PW}`} />
        <path fill={h.hs} d={`M0,172H${PW}V240H0Z`} />
        {/* The people led away. */}
        <Fade frame={frame} on={5} off={6} from="walk-right" at={3}>
          <Person
            x={98}
            y={212}
            s={0.52}
            face={-1}
            pose="walk"
            robe="b"
            bundle
          />
          <Person
            x={64}
            y={216}
            s={0.5}
            face={-1}
            pose="walk"
            head="veil"
            robe="c"
          />
          <Person
            x={32}
            y={220}
            s={0.5}
            face={-1}
            pose="walk"
            robe="g"
            bundle
          />
          <Person
            x={82}
            y={224}
            s={0.34}
            face={-1}
            child
            head="bare"
            robe="b"
          />
        </Fade>
      </Half>
      {/* Promises in the dark: a lamp, a scroll, and the wall being built again. */}
      <Fade frame={frame} on={5} off={6} from="up" at={11}>
        <Half side="b">
          <path className="pl-paper" d={`M0,-30H${PW}V240H0Z`} />
          <path className="fp-dark" fill={h.h1} d={`M0,-30H${PW}V104H0Z`} />
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path className="pl-paper fp-light" d={ring(70, 74, 38)} />
          </Ambient>
          <Lamp x={64} y={92} s={1.3} />
          <Scroll x={70} y={206} s={1.1} />
          <Ink d="M130,214V166h30v-12h30v-14h70v74Z" tone="c" />
          <path
            className="pl-f"
            d="M130,190h122M160,166v24M190,154v12M190,190v24M222,166v24M146,190v24"
          />
          <Person x={150} y={164} s={0.5} pose="reach" robe="b" />
          <Floor h={h} />
        </Half>
      </Fade>
    </>,

    // 6. Jesus comes, dies and rises.
    <>
      <Half side="a">
        <Hills
          y={90}
          w={PW}
          floor={124}
          peaks={[
            [60, 22],
            [190, 34],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ambient frame={frame} on={6} off={7} kind="bob">
          <Water x={4} y={120} w={250} rows={3} gap={13} />
          <Boat x={196} y={144} s={0.6} face={-1} />
        </Ambient>
        <Ink
          d="M-4,240V170C60,154 150,164 256,184V240Z"
          tone="g"
          hatch={h.hs}
        />
        {/* Jesus teaching by the lake, and those who listen. */}
        <Person x={62} y={210} s={0.76} pose="open" robe="p" cloak="b" />
        <Fade frame={frame} on={6} off={7} from="up" at={3}>
          <Person x={130} y={212} s={0.6} pose="sit" face={-1} robe="c" />
          <Person
            x={170}
            y={218}
            s={0.6}
            pose="sit"
            face={-1}
            head="veil"
            robe="g"
          />
          <Person x={214} y={222} s={0.58} pose="sit" face={-1} robe="b" />
        </Fade>
      </Half>
      {/* The hill, the cross, and the open tomb. */}
      <Fade frame={frame} on={6} off={7} from="up" at={12}>
        <Half side="b">
          <path className="pl-paper" d={`M0,-30H${PW}V240H0Z`} />
          <Hills
            y={214}
            w={PW}
            floor={240}
            peaks={[
              [70, 96],
              [200, 30],
            ]}
            hatch={h.hs}
          />
          <path className="pl-k" d="M66,120V36h8v84ZM46,60h48v8h-48Z" />
        </Half>
      </Fade>
      <Fade frame={frame} on={6} off={7} at={17}>
        <Half side="b">
          <Rays x={186} y={74} reach={70} spread={50} n={5} />
          <Ink d="M132,214C132,140 240,140 240,214Z" tone="b" hatch={h.hs} />
          <path
            className="pl-paper"
            d="M168,214V186C168,168 204,168 204,186V214Z"
          />
          <path className="pl-l" d="M168,214V186C168,168 204,168 204,186V214" />
          <Ink d={ring(222, 198, 16)} tone="c" />
        </Half>
      </Fade>
    </>,

    // 7. The Spirit, and the church.
    <>
      <Half side="a">
        <Ink d="M26,240V52H226V240Z" tone="c" />
        <path className="pl-l" d="M18,52H234M26,42V52M226,42V52M26,42H226" />
        <path className="pl-paper" d="M50,240V88H202V240Z" />
        <path className="pl-l" d="M50,240V88H202V240" />
        <Person x={84} y={216} s={0.7} pose="pray" robe="b" />
        <Person x={126} y={220} s={0.74} pose="pray" head="veil" robe="g" />
        <Person x={170} y={216} s={0.7} pose="pray" robe="c" cloak="b" />
        <Fade frame={frame} on={7} off={8} from="down" at={3}>
          <Ambient frame={frame} on={7} off={8} kind="flicker">
            <Flame x={84} y={122} s={0.9} />
          </Ambient>
          <Ambient frame={frame} on={7} off={8} kind="flicker" late={0.4}>
            <Flame x={126} y={118} s={0.9} />
          </Ambient>
          <Ambient frame={frame} on={7} off={8} kind="flicker" late={0.8}>
            <Flame x={170} y={122} s={0.9} />
          </Ambient>
        </Fade>
      </Half>
      {/* Sent out, to every side. */}
      <Fade frame={frame} on={7} off={8} at={9}>
        <Half side="b">
          <path className="pl-paper" d={`M0,-30H${PW}V240H0Z`} />
          <Sun x={200} y={34} r={14} />
          <Ambient frame={frame} on={7} off={8} kind="drift" dx={22}>
            <Cloud x={70} y={50} s={0.7} />
          </Ambient>
          <Hills
            y={186}
            w={PW}
            floor={240}
            peaks={[
              [60, 14],
              [190, 22],
            ]}
            hatch={h.hs}
          />
          <Palm x={228} y={170} s={0.6} />
        </Half>
      </Fade>
      <Fade frame={frame} on={7} off={8} from="walk-left" at={11}>
        <Half side="b">
          <Person x={52} y={206} s={0.66} pose="walk" robe="b" staff="staff" />
          <Person
            x={112}
            y={214}
            s={0.68}
            pose="walk"
            head="veil"
            robe="g"
            bundle
          />
          <Person x={172} y={204} s={0.64} pose="walk" robe="c" cloak="b" />
        </Half>
      </Fade>
    </>,

    // 8. All things new.
    <>
      <Rays x={400} y={-10} reach={170} spread={210} n={11} />
      <CityWall x={400} y={236} w={640} s={1} hatch={h.hs} gate={false} />
      <path
        className="pl-paper"
        d="M352,236V172C352,122 448,122 448,172V236Z"
      />
      <path className="pl-l" d="M352,236V172C352,122 448,122 448,172V236" />
      <Ink d="M-10,410V236H810V410Z" tone="g" />
      {/* The river from the gate, and the tree beside it. */}
      <path
        className="pl-paper"
        d="M362,236C340,300 470,330 440,410H640C640,330 420,300 438,236Z"
      />
      <path
        className="pl-l"
        d="M362,236C340,300 470,330 440,410M438,236C420,300 640,330 640,410"
      />
      <Ambient frame={frame} on={8} kind="bob">
        <path
          className="pl-f"
          d="M388,270q7,-6 14,0t14,0M420,312q7,-6 14,0t14,0M470,350q7,-6 14,0t14,0t14,0M500,386q7,-6 14,0t14,0t14,0"
        />
      </Ambient>
      <Ambient frame={frame} on={8} kind="sway">
        <Olive x={660} y={352} s={1.9} hatch={h.h2} />
      </Ambient>
      <Fade frame={frame} on={8} from="walk-left" at={5}>
        <Person x={150} y={318} s={0.95} pose="walk" robe="b" cloak="c" />
        <Person x={222} y={352} s={1.05} pose="walk" head="veil" robe="c" />
        <Person
          x={108}
          y={384}
          s={1.15}
          pose="walk"
          robe="p"
          cloak="g"
          staff="staff"
        />
        <Person x={296} y={388} s={0.72} child head="bare" robe="b" />
      </Fade>
    </>,
  ];
}

/** The two-part frames, which get a rule between their panels. */
const TWO = new Set([3, 4, 5, 6, 7]);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  // The camera keeps the road in view and moves in a little on the story.
  push: frame =>
    TWO.has(frame) ? [400, 500, 1.02] : [400, 500, frame % 2 ? 1.05 : 1.035],
  draw: (h, frame) => {
    const k = frame + 1;
    const inked = (REACH[k] - 14) / 772;
    return (
      <>
        {/* The poster: the garden's tree and the city's open gate. */}
        <Fade frame={frame} on={-1} off={0}>
          <Sun x={400} y={70} r={22} />
          <Hills
            y={330}
            floor={400}
            peaks={[
              [200, 30],
              [600, 20],
            ]}
            hatch={h.hs}
          />
          <Olive x={200} y={320} s={2.2} hatch={h.h2} />
          <path
            className="pl-f"
            strokeDasharray="4 8"
            d="M300,330C380,300 440,360 500,340"
          />
          <CityWall x={610} y={340} w={300} s={1} hatch={h.h3} />
        </Fade>

        {/* The story's picture for this movement. */}
        {scenes(h, frame).map((scene, i) => (
          <Fade key={FRAMES[i].join()} frame={frame} on={i} off={i + 1}>
            <path className="pl-paper" d="M0,0H800V400H0Z" />
            {scene}
            {TWO.has(i) && <path className="pl-l" d="M400,0V400" />}
          </Fade>
        ))}

        {/* The road along the foot: a strip of paper, the route faint and dotted. */}
        <path className="pl-paper" d="M0,400H800V500H0Z" />
        <path className="pl-l" d="M0,400H800" />
        <path className="pl-f" strokeDasharray="3 7" d={ROAD} />

        {/* The road, inked as far as the story has come. */}
        <path
          d={ROAD}
          pathLength={1}
          className="mv-road"
          fill="none"
          stroke="var(--art-ink)"
          strokeWidth={18}
          style={{ strokeDashoffset: 1 - inked }}
        />
        <path
          d={ROAD}
          pathLength={1}
          className="mv-road"
          fill="none"
          stroke="var(--art-paper)"
          strokeWidth={13}
          style={{ strokeDashoffset: 1 - inked }}
        />

        {/* Every stop's place, a faint ring; its roundel once the story reaches it. */}
        {STOPS.map((slug, i) => (
          <g key={slug}>
            <path className="pl-paper" d={ring(stopX(i), ROAD_Y, R)} />
            <path
              className="pl-f"
              strokeDasharray="2 4"
              d={ring(stopX(i), ROAD_Y, R)}
            />
            <Fade frame={frame} on={frameOf(slug)} from="grow">
              <Roundel
                slug={slug}
                at={{
                  x: stopX(i) - R - 2,
                  y: ROAD_Y - R - 2,
                  size: 2 * R + 4,
                }}
              />
            </Fade>
          </g>
        ))}

        {/* The traveller: the one mustard mark. */}
        <Travel frame={k} at={REACH.map(x => [x - 6, ROAD_Y])}>
          <path className="pl-m" d={ring(0, 0, 7)} />
          <path className="pl-l" d={ring(0, 0, 7)} />
        </Travel>
      </>
    );
  },
};

export default film;
