/**
 * "Sacrifice: why blood?": the Bible's own answer (Leviticus 17:11) followed
 * from the first altars to the cross, as the Study Bible's study of atonement
 * tells it. Drawn with the stage set's cast and setting.
 *
 *   0  Why blood?        an altar on a hill at morning; far off, a door, a cross
 *   1  Blood means life  a family brings a lamb to the altar; a priest waits
 *   2  The first altars  Abel and his flock | Noah's altar | the ram in the bush
 *   3  A sign on the door a house at night; a father marks the doorway
 *   4  Day after day     Sinai: Moses, an altar, the people; one more lamb
 *   5  This is my blood  the upper room: a cup on the table
 *   6  Once for all      the altar cold; an empty cross, an open tomb, morning
 *
 * No blood is drawn anywhere: the mark on the doorway is three plain strokes.
 * The one mustard mark: the lit window (3), the cup (5), the morning sun (6).
 * Jesus is one plain figure among his friends, as in the other films.
 */
import type { ReactNode } from "react";
import {
  Altar,
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Moon,
  Mountain,
  Olive,
  Person,
  Rays,
  Scaled,
  Sheep,
  Stars,
  Sun,
  Table,
  Tent,
} from "@/components/art/stage";
import { Ambient, Draw, Fade, type FilmDrawing } from "../motion";

/** Smoke rising from an altar at (x, y): a line that draws itself slowly. */
const smoke = (x: number, y: number) =>
  `M${x},${y}C${x - 16},${y - 30} ${x + 16},${y - 50} ${x},${y - 80}C${x - 14},${y - 106} ${x + 14},${y - 124} ${x + 4},${y - 150}`;

/** A picture of its own: paper, then the scene. */
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

/** A plain cross on a hill, in ink. */
const Cross = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path
    className="pl-k"
    d={`M${x - 3 * s},${y}V${y - 70 * s}h${6 * s}V${y}ZM${x - 18 * s},${y - 54 * s}h${36 * s}v${6 * s}h${-36 * s}Z`}
  />
);

const CAMERA: [number, number, number][] = [
  [330, 320, 1.12],
  [400, 340, 1.2],
  [400, 330, 1.04],
  [470, 320, 1.25],
  [380, 330, 1.12],
  [400, 350, 1.25],
  [520, 300, 1.12],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Why blood? An altar on a hill in the morning. */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={120} y={96} r={24} />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={60}>
          <Cloud x={560} y={80} s={1.3} />
        </Ambient>
        <Hills
          y={380}
          peaks={[
            [300, 60],
            [640, 20],
          ]}
          hatch={h.hs}
        />
        <Altar x={330} y={330} s={1.9} />
        <Draw
          frame={frame}
          on={-1}
          off={1}
          at={0.5}
          slow={6}
          className="pl-f"
          d={smoke(330, 240)}
        />
        <Person x={200} y={352} s={1.5} robe="b" cloak="c" />
        <Grass
          at={[
            [80, 430],
            [460, 440],
            [700, 420],
          ]}
        />
      </Fade>
      <Fade frame={frame} on={0} off={1} from="up" at={6}>
        <House x={590} y={372} s={0.7} hatch={h.h3} />
      </Fade>
      <Fade frame={frame} on={0} off={1} from="up" at={10}>
        <Ink d="M670,372C690,330 760,330 790,372Z" tone="g" hatch={h.hs} />
        <Cross x={730} y={342} s={0.7} />
      </Fade>

      {/* 1. Blood means life: a family brings a lamb to the altar. */}
      <Scene frame={frame} k={1}>
        <Ambient frame={frame} on={1} off={2} kind="drift" dx={-50}>
          <Cloud x={620} y={70} s={1.1} />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [200, 30],
            [600, 44],
          ]}
          hatch={h.hs}
        />
        <Tent x={690} y={372} s={1.2} tone="b" hatch={h.h3} />
        <Altar x={470} y={400} s={2.1} />
        <Draw
          frame={frame}
          on={1}
          off={2}
          at={9}
          slow={6}
          className="pl-f"
          d={smoke(470, 302)}
        />
        <Person
          x={590}
          y={412}
          s={1.6}
          pose="open"
          face={-1}
          robe="p"
          cloak="b"
        />
        <Fade frame={frame} on={1} off={2} from="walk-left" at={2}>
          <Person x={200} y={420} s={1.55} robe="g" cloak="c" pose="reach" />
          <Person x={120} y={428} s={1.05} child head="bare" robe="b" />
          <Sheep x={310} y={428} s={1.5} lamb />
        </Fade>
      </Scene>

      {/* 2. The first altars: Abel, Noah, Abraham. */}
      <Scene frame={frame} k={2}>
        <path className="pl-l" d="M266,40V460M534,40V460" />
        {/* Abel and the best of his flock. */}
        <Scaled x={0} y={60} k={0.95}>
          <Sun x={60} y={50} r={16} />
          <Hills
            y={330}
            w={270}
            floor={420}
            peaks={[
              [80, 30],
              [200, 14],
            ]}
            hatch={h.hs}
          />
          <Altar x={190} y={340} s={1} smoke />
          <Person x={90} y={356} s={1.15} head="bare" robe="c" staff="crook" />
          <Sheep x={150} y={390} s={0.9} />
          <Sheep x={214} y={400} s={0.8} lamb face={-1} />
        </Scaled>
        {/* Noah's altar on the mountain, under the bow. */}
        <Fade frame={frame} on={2} off={3} from="up" at={5}>
          <Scaled x={270} y={60} k={0.95}>
            <path
              className="pl-f"
              d="M30,200C60,60 220,60 250,200M44,200C70,84 210,84 236,200M58,200C82,108 198,108 222,200"
            />
            <Mountain x={140} y={390} w={260} h={170} tone="g" hatch={h.h2} />
            <Altar x={96} y={392} s={0.9} smoke />
            <Person x={180} y={402} s={1.1} robe="b" cloak="g" pose="pray" />
          </Scaled>
        </Fade>
        {/* Abraham and Isaac, and the ram God gave. */}
        <Fade frame={frame} on={2} off={3} from="up" at={10}>
          <Scaled x={540} y={60} k={0.95}>
            <Hills
              y={330}
              w={270}
              floor={420}
              peaks={[[130, 60]]}
              tone="c"
              hatch={h.hs}
            />
            <Altar x={70} y={300} s={0.8} />
            <Person x={130} y={318} s={1.2} robe="b" cloak="c" staff="staff" />
            <Person x={176} y={326} s={0.8} child head="bare" robe="g" />
            <Ink
              d="M200,372C196,346 214,334 226,344C234,328 258,334 256,352C268,356 266,372 256,372Z"
              tone="g"
              hatch={h.h2}
            />
            <Sheep x={236} y={380} s={0.9} face={-1} />
            <path
              className="pl-l"
              d="M222,350c-8,-4 -10,-12 -4,-16M228,348c2,-8 10,-10 14,-6"
            />
          </Scaled>
        </Fade>
      </Scene>

      {/* 3. A sign on the door: the night of the Passover. */}
      <Scene frame={frame} k={3}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V260H0Z" />
        <Moon x={120} y={80} r={20} />
        <Ambient frame={frame} on={3} off={4} kind="twinkle">
          <Stars
            at={[
              [240, 60, 5],
              [340, 130, 4],
              [620, 50, 5],
              [720, 140, 4],
              [60, 180, 4],
              [690, 220, 4],
            ]}
          />
        </Ambient>
        <Hills
          y={410}
          peaks={[
            [200, 16],
            [640, 24],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <House x={470} y={412} s={2.6} hatch={h.h3} lit />
        <Sheep x={250} y={432} s={1.5} lamb />
        <Person x={382} y={420} s={1.5} pose="reach" robe="b" cloak="c" />
        {/* The mark on the doorway: three plain strokes. */}
        <Draw
          frame={frame}
          on={3}
          off={4}
          at={6}
          slow={2}
          className="fp-mark"
          d="M440,318V400"
        />
        <Draw
          frame={frame}
          on={3}
          off={4}
          at={8}
          slow={2}
          className="fp-mark"
          d="M436,300H504"
        />
        <Draw
          frame={frame}
          on={3}
          off={4}
          at={10}
          slow={2}
          className="fp-mark"
          d="M500,318V400"
        />
      </Scene>

      {/* 4. Day after day: Sinai, the covenant, and the offerings that never stopped. */}
      <Scene frame={frame} k={4}>
        <Mountain x={230} y={400} w={520} h={330} hatch={h.h2} />
        <Ambient frame={frame} on={4} off={5} kind="drift" dx={40}>
          <Cloud x={220} y={96} s={1.9} />
          <path fill={h.h1} d="M150,96h150v-20h-150Z" />
        </Ambient>
        <Hills
          y={410}
          peaks={[
            [400, 12],
            [700, 26],
          ]}
          hatch={h.hs}
        />
        <Altar x={300} y={420} s={1.5} smoke />
        <Person x={210} y={430} s={1.5} robe="b" cloak="c" staff="staff" />
        <Fade frame={frame} on={4} off={5} from="up" at={3}>
          <Person x={420} y={436} s={1.2} face={-1} robe="g" />
          <Person x={476} y={444} s={1.25} face={-1} head="veil" robe="c" />
          <Person x={534} y={438} s={1.2} face={-1} robe="b" cloak="g" />
          <Person
            x={452}
            y={462}
            s={0.8}
            face={-1}
            child
            head="bare"
            robe="b"
          />
        </Fade>
        {/* Day after day: the tent, a priest, one more lamb. */}
        <Fade frame={frame} on={4} off={5} from="walk-right" at={10}>
          <Tent x={690} y={400} s={1.1} tone="b" hatch={h.h3} />
          <Person
            x={640}
            y={436}
            s={1.15}
            face={-1}
            robe="p"
            cloak="b"
            pose="reach"
          />
          <Sheep x={590} y={446} s={1.1} lamb face={-1} />
        </Fade>
      </Scene>

      {/* 5. This is my blood: the upper room, and the cup. */}
      <Scene frame={frame} k={5}>
        <path className="pl-f" d="M0,70H800M0,74H800" />
        <Ink d="M-10,510V430H810V510Z" tone="g" />
        <path fill={h.h3} d="M0,450H800V500H0Z" />
        <Ink d="M560,300V130H690V300Z" tone="b" />
        <path className="fp-dark" fill={h.h2} d="M572,288V142H678V288Z" />
        <path className="pl-l" d="M572,288V142H678V288Z" />
        <Stars
          at={[
            [600, 180, 4],
            [650, 240, 4],
          ]}
        />
        <Ambient frame={frame} on={5} off={6} kind="flicker">
          <Lamp x={130} y={250} s={1.5} />
        </Ambient>
        <path className="pl-l" d="M96,252H170" />
        <Person x={400} y={432} s={1.7} pose="open" robe="p" cloak="b" />
        <Person x={210} y={434} s={1.45} pose="sit" robe="c" />
        <Person
          x={596}
          y={434}
          s={1.45}
          pose="sit"
          face={-1}
          robe="g"
          cloak="c"
        />
        <Fade frame={frame} on={5} off={6} from="up" at={3}>
          <Person x={290} y={430} s={1.5} robe="b" />
          <Person x={512} y={430} s={1.5} robe="c" cloak="b" face={-1} />
        </Fade>
        <Table x={400} y={452} s={2.2} />
        {/* The cup: the one mustard mark. */}
        <Fade frame={frame} on={5} off={6} from="grow" at={6}>
          <path className="pl-m" d="M388,384h24l-3,-26h-18Z" />
          <path className="pl-l" d="M388,384h24l-3,-26h-18ZM394,384v6h12v-6" />
        </Fade>
      </Scene>

      {/* 6. Once for all: the altar cold, the cross empty, the tomb open. */}
      <Scene frame={frame} k={6}>
        <Ambient frame={frame} on={6} kind="glow">
          <Sun x={560} y={120} r={30} gold />
        </Ambient>
        <Rays x={560} y={150} reach={90} spread={90} n={7} />
        <Hills
          y={390}
          peaks={[
            [230, 20],
            [470, 110],
            [700, 40],
          ]}
          hatch={h.hs}
        />
        <Cross x={470} y={284} s={1.3} />
        <Ink d="M580,392C580,318 720,318 720,392Z" tone="b" hatch={h.hs} />
        <path
          className="pl-paper"
          d="M628,392V362C628,340 672,340 672,362V392Z"
        />
        <path className="pl-l" d="M628,392V362C628,340 672,340 672,362V392" />
        <Ink d="M676,376a20,20 0 1,0 40,0a20,20 0 1,0 -40,0Z" tone="c" />
        <Altar x={170} y={420} s={1.7} />
        <Grass
          at={[
            [96, 420],
            [150, 344],
            [196, 372],
            [246, 420],
            [130, 396],
          ]}
        />
        <Ambient frame={frame} on={6} kind="sway">
          <Olive x={60} y={412} s={1.2} hatch={h.h2} />
        </Ambient>
        <Fade frame={frame} on={6} from="walk-left" at={7}>
          <Person x={330} y={440} s={1.3} pose="walk" robe="b" cloak="c" />
          <Person x={390} y={452} s={1.2} pose="walk" head="veil" robe="g" />
          <Person x={438} y={462} s={0.8} child head="bare" robe="c" />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
