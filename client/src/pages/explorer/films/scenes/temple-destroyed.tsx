/**
 * "Why did God let his temple be destroyed?": the prophets' own answer, as
 * the Explorer's Prophets and Exile stop and the Study Bible's notes give
 * it, in seven pictures drawn with the stage set.
 *
 *   0  A house for God's name   the temple on its hill; people going up
 *   1  Prophet after prophet    a prophet speaking in a street
 *   2  At the temple gate       Jeremiah at the gate; worshipers passing in
 *   3  The glory leaves         a light risen from the temple, moving east
 *   4  The day it fell          the ruin; people walking away
 *   5  Why?                     by the river; harps in a tree; a far dawn
 *   6  More than was lost       a new temple; joy and tears together
 *
 * No battle, no soldier and no wound is drawn, and no flame: the ruin is
 * broken stone and thin smoke. The people are the cast's people, drawn with
 * the same dignity in every picture; nothing marks them out for blame. God
 * is never drawn: his glory is a light, the picture's one mustard mark
 * (3), as the sun is in the first and last pictures and the dawn in (5).
 */
import type { ReactNode } from "react";
import {
  CityWall,
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Olive,
  Person,
  Stars,
  Sun,
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

/**
 * The temple: a plain stone house with a porch, two free-standing pillars
 * at its door, and steps. Placed by the middle of its foot; about 200 wide
 * and 150 tall at size 1.
 */
const Temple = ({
  x,
  y,
  s = 1,
  hatch,
  small,
}: {
  x: number;
  y: number;
  s?: number;
  hatch?: string;
  small?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d="M-100,0V-110H100V0Z" hatch={hatch} />
    <path
      className="pl-l"
      d="M-108,-110H108M-100,-122H100M-100,-122V-110M100,-122V-110"
    />
    {!small && <Ink d="M-46,0V-150H46V0Z" />}
    {!small && <path className="pl-l" d="M-54,-150H54" />}
    <path className="pl-k" d="M-18,0V-64C-18,-84 18,-84 18,-64V0Z" />
    {/* The two pillars. */}
    <Ink d="M-40,0V-96H-28V0ZM28,0V-96H40V0Z" tone="c" />
    <path className="pl-l" d="M-44,-96H-24M24,-96H44M-44,-102H-24M24,-102H44" />
    <Ink d="M-70,0H70L84,14H-84Z" />
    <path
      className="pl-f"
      d="M-77,7H77M-80,-40H-56M56,-40H80M-80,-70H-56M56,-70H80"
    />
  </g>
);

const disc = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

const CAMERA: [number, number, number][] = [
  [420, 260, 1.12],
  [380, 330, 1.16],
  [400, 320, 1.16],
  [470, 220, 1.12],
  [380, 300, 1.12],
  [360, 330, 1.14],
  [420, 280, 1.12],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The temple on its hill. */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={120} y={90} r={26} gold />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={50}>
          <Cloud x={620} y={80} s={1.1} />
        </Ambient>
        <Hills y={380} peaks={[[420, 110]]} tone="g" hatch={h.hs} />
        <Temple x={420} y={262} s={1} hatch={h.hs} />
        {/* The city below it. */}
        <House x={120} y={400} s={0.8} hatch={h.h3} />
        <House x={210} y={410} s={0.65} tone="b" hatch={h.h3} />
        <House x={700} y={404} s={0.8} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V410C240,396 560,400 810,404V510Z" tone="c" />
        <path
          className="pl-f"
          d="M300,500C340,440 380,360 396,280M400,500C420,440 436,360 444,280"
        />
        <Fade frame={frame} on={-1} off={1} from="up" at={4}>
          <Person x={330} y={470} s={1.2} pose="walk" robe="b" cloak="c" />
          <Person x={392} y={430} s={0.95} pose="walk" robe="g" head="veil" />
          <Person
            x={286}
            y={486}
            s={0.8}
            pose="walk"
            robe="c"
            child
            head="bare"
          />
        </Fade>
      </Fade>

      {/* 1. Prophet after prophet. */}
      <Scene frame={frame} k={1}>
        <Sun x={690} y={80} r={22} />
        <Ink d="M-10,400V150H230V400Z" tone="c" hatch={h.hs} />
        <path
          className="pl-l"
          d="M-10,150H240M60,400V310C60,284 110,284 110,310V400M150,210h40v50h-40Z"
        />
        <Ink d="M560,400V190H810V400Z" tone="b" hatch={h.hs} />
        <path className="pl-l" d="M550,190H810M640,250h44v54h-44Z" />
        <Ink d="M-10,510V400H810V510Z" tone="c" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Person
          x={360}
          y={470}
          s={1.7}
          pose="reach"
          robe="g"
          cloak="b"
          staff="staff"
        />
        <Fade frame={frame} on={1} off={2} from="left" at={4}>
          <Person
            x={478}
            y={478}
            s={1.0}
            face={-1}
            robe="c"
            child
            head="bare"
          />
        </Fade>
        <Fade frame={frame} on={1} off={2} from="walk-left" at={6}>
          <Person x={590} y={466} s={1.4} pose="walk" robe="b" cloak="c" />
          <Person
            x={672}
            y={476}
            s={1.4}
            pose="walk"
            robe="c"
            head="veil"
            bundle
          />
        </Fade>
        <Fade frame={frame} on={1} off={2} from="walk-right" at={9}>
          <Person
            x={200}
            y={472}
            s={1.4}
            pose="walk"
            face={-1}
            robe="p"
            cloak="g"
          />
          <Person
            x={110}
            y={480}
            s={1.4}
            pose="walk"
            face={-1}
            robe="g"
            cloak="c"
          />
        </Fade>
      </Scene>

      {/* 2. Jeremiah at the temple gate. */}
      <Scene frame={frame} k={2}>
        <Hills y={300} peaks={[[400, 60]]} tone="g" hatch={h.hs} />
        <Temple x={400} y={220} s={0.7} hatch={h.hs} />
        {/* The wall of the court, and its gate. */}
        <Ink
          d="M-10,420V200H300V420ZM500,420V200H810V420Z"
          tone="c"
          hatch={h.hs}
        />
        <path
          className="pl-l"
          d="M-10,200H300M500,200H810M300,200C300,150 500,150 500,200M286,420V200M514,420V200"
        />
        <path
          className="pl-f"
          d="M0,280H286M0,350H286M514,280H800M514,350H800M120,200V280M200,280V350M620,200V280M700,280V350"
        />
        <Ink d="M-10,510V420H810V510Z" tone="b" />
        <path className="pl-f" d="M0,460H800M300,420L250,500M500,420L550,500" />
        <Person x={200} y={478} s={1.7} pose="reach" robe="g" cloak="b" />
        <Fade frame={frame} on={2} off={3} from="walk-right" at={4}>
          <Person
            x={420}
            y={452}
            s={1.2}
            pose="walk"
            face={-1}
            robe="c"
            cloak="g"
          />
          <Person
            x={640}
            y={482}
            s={1.4}
            pose="walk"
            face={-1}
            robe="b"
            head="veil"
          />
          <Person
            x={560}
            y={470}
            s={1.4}
            pose="hold"
            face={-1}
            robe="p"
            cloak="c"
          />
          <Person
            x={720}
            y={478}
            s={1.4}
            pose="walk"
            face={-1}
            robe="g"
            cloak="b"
            bundle
          />
        </Fade>
      </Scene>

      {/* 3. The glory leaves the temple. */}
      <Scene frame={frame} k={3}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V380H0Z" />
        <Ambient frame={frame} on={3} off={4} kind="twinkle">
          <Stars
            at={[
              [90, 80, 3],
              [200, 150, 3],
              [130, 240, 3],
            ]}
          />
        </Ambient>
        <Hills y={380} peaks={[[330, 110]]} tone="b" hatch={h.hs} />
        <Temple x={330} y={262} s={1} hatch={h.h1} />
        <Ink
          d="M-10,510V410C240,396 560,400 810,404V510Z"
          tone="b"
          hatch={h.h2}
        />
        {/* The glory: a light, risen and going east. */}
        <path
          className="pl-f"
          strokeDasharray="3 6"
          d="M330,110C400,60 470,70 540,96"
        />
        <Fade frame={frame} on={3} off={4} from="left" at={4}>
          <path className="pl-paper" d={disc(600, 110, 70)} />
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <path className="pl-m" d={disc(600, 110, 30)} />
            <path className="pl-l" d={disc(600, 110, 30)} />
          </Ambient>
          <path
            className="pl-f"
            d="M600,66V44M600,154V176M556,110H534M644,110H666M569,79L553,63M631,79L647,63M569,141L553,157M631,141L647,157"
          />
        </Fade>
      </Scene>

      {/* 4. The day it fell. No battle is drawn. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V380H0Z" />
        <Hills y={380} peaks={[[330, 110]]} tone="b" hatch={h.hs} />
        {/* The ruin: broken walls, a fallen pillar, thin smoke. */}
        <Ink
          d="M230,262V190L256,176L270,200L300,150L322,190V262Z"
          hatch={h.h1}
        />
        <Ink d="M380,262V214L400,196L418,222L430,204V262Z" hatch={h.h1} />
        <Ink d="M322,262V236H380V262Z" hatch={h.h1} />
        <Ink d="M296,262V186H308V262Z" tone="c" />
        <Ink d="M340,262L420,250L422,262Z" tone="c" />
        <Ink d="M246,276H400L414,290H232Z" />
        <path className="pl-f" d="M452,262l14,-8l12,8ZM200,268l12,-10l14,10Z" />
        <Ambient frame={frame} on={4} off={5} kind="drift" dx={24}>
          <path
            className="pl-f"
            d="M330,150C316,120 348,104 334,74C324,52 344,40 340,20M400,190C390,166 414,150 404,126C398,110 410,100 408,84"
          />
        </Ambient>
        <Ink
          d="M-10,510V410C240,396 560,400 810,404V510Z"
          tone="c"
          hatch={h.hs}
        />
        <path className="pl-f" d="M300,290C360,360 520,420 800,452" />
        <Fade frame={frame} on={4} off={5} from="left" at={4}>
          <Person
            x={470}
            y={452}
            s={1.2}
            pose="walk"
            robe="g"
            cloak="b"
            bundle
          />
          <Person x={540} y={466} s={1.3} pose="walk" robe="b" head="veil" />
          <Person
            x={590}
            y={478}
            s={0.9}
            pose="walk"
            robe="c"
            child
            head="bare"
          />
          <Person
            x={660}
            y={476}
            s={1.3}
            pose="walk"
            robe="c"
            cloak="g"
            staff="staff"
          />
          <Person
            x={740}
            y={486}
            s={1.3}
            pose="walk"
            robe="p"
            cloak="b"
            bundle
          />
        </Fade>
      </Scene>

      {/* 5. By the rivers of Babylon; mercies new every morning. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V240H0Z" />
        <Fade frame={frame} on={5} off={6} from="up" at={9}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path className="pl-m" d={disc(620, 250, 34)} />
            <path className="pl-l" d={disc(620, 250, 34)} />
          </Ambient>
          <path
            className="pl-f"
            d="M620,204V180M576,222L556,204M664,222L684,204"
          />
        </Fade>
        <Hills
          y={260}
          peaks={[
            [300, 16],
            [640, 10],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,400V262H810V400Z" tone="b" />
        <Ambient frame={frame} on={5} off={6} kind="bob">
          <Water x={20} y={290} w={780} rows={5} gap={22} />
        </Ambient>
        <Ink
          d="M-10,510V400C240,384 560,392 810,380V510Z"
          tone="g"
          hatch={h.hs}
        />
        {/* The tree, and the harps hung in it. */}
        <Ambient frame={frame} on={5} off={6} kind="sway">
          <Olive x={150} y={420} s={2.4} hatch={h.h2} />
        </Ambient>
        <path className="pl-l" d="M96,300V330M190,296V326" />
        <Ink d="M84,330C84,372 108,372 108,330Z" tone="c" />
        <Ink d="M178,326C178,368 202,368 202,326Z" tone="c" />
        <path
          className="pl-f"
          d="M90,332V360M96,332V364M102,332V360M184,328V356M190,328V360M196,328V356"
        />
        <Person x={330} y={470} s={1.4} pose="sit" robe="b" cloak="c" />
        <Person x={430} y={478} s={1.4} pose="bow" robe="g" />
        <Person
          x={560}
          y={470}
          s={1.4}
          pose="sit"
          face={-1}
          robe="c"
          head="veil"
        />
        <Fade frame={frame} on={5} off={6} from="up" at={5}>
          <Person
            x={640}
            y={482}
            s={0.95}
            pose="sit"
            face={-1}
            robe="b"
            child
            head="bare"
          />
        </Fade>
      </Scene>

      {/* 6. A house again, and a promise larger than a house. */}
      <Scene frame={frame} k={6}>
        <Fade frame={frame} on={6} at={5}>
          <Ambient frame={frame} on={6} kind="glow">
            <Sun x={130} y={100} r={32} gold />
          </Ambient>
        </Fade>
        <Hills y={380} peaks={[[440, 110]]} tone="g" hatch={h.hs} />
        <Temple x={440} y={262} s={0.8} hatch={h.hs} small />
        <Ink d="M-10,510V410C240,396 560,400 810,404V510Z" tone="c" />
        <Grass
          at={[
            [90, 440],
            [720, 450],
          ]}
        />
        <Fade frame={frame} on={6} from="up" at={3}>
          <Person x={330} y={470} s={1.4} pose="pray" robe="b" cloak="c" />
          <Person x={420} y={478} s={1.4} pose="open" robe="g" head="veil" />
          <Person
            x={372}
            y={488}
            s={0.95}
            pose="pray"
            robe="c"
            child
            head="bare"
          />
          <Person
            x={520}
            y={470}
            s={1.4}
            pose="pray"
            face={-1}
            robe="p"
            cloak="b"
          />
        </Fade>
        <Fade frame={frame} on={6} from="right" at={8}>
          <Person
            x={650}
            y={484}
            s={1.5}
            pose="bow"
            face={-1}
            robe="c"
            cloak="g"
          />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
