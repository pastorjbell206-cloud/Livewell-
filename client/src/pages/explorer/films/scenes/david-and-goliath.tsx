/**
 * "David and Goliath": 1 Samuel 17 as the text tells it and as the Study
 * Bible's notes read it, in seven pictures drawn with the stage set.
 *
 *   0  Two armies, one valley   two camps on two hills, a brook between
 *   1  The champion             Goliath in the valley; Israel draws back
 *   2  A boy with bread         David arrives; his brother is angry
 *   3  Not Saul's armor         the armor laid down; five stones from the brook
 *   4  In the name of the LORD  the boy and the champion, face to face
 *   5  One stone                the sling's arc; the champion fallen; an army runs
 *   6  Who are we in the story? the soldiers rejoice; far off, an empty cross
 *
 * The cast is the same in every picture: David bare-headed in an olive robe
 * with a shepherd's crook; Saul crowned, in blue with a clay cloak; Israel's
 * soldiers in clay and olive; the Philistines helmeted, in blue. Goliath is a
 * tall armed man and nothing more: no people is drawn by caricature, and no
 * wound is shown. The one mustard mark is the morning sun in the last picture.
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Grass,
  Hills,
  Ink,
  Person,
  Rays,
  Sun,
  Tent,
  Water,
} from "@/components/art/stage";
import { Ambient, Draw, Fade, type FilmDrawing } from "../motion";

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

/** The two hills the armies stand on, sloping down into the valley. */
const HILL_L = "M-10,440V300C40,230 150,210 230,250C290,280 330,340 380,440Z";
const HILL_R = "M810,440V300C760,230 650,210 570,250C510,280 470,340 420,440Z";

/** David: the same boy in every picture. */
const David = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "kneel" | "reach";
  bundle?: boolean;
  crook?: boolean;
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.15}
    face={p.face}
    head="bare"
    robe="g"
    pose={p.pose}
    bundle={p.bundle}
    staff={p.crook ? "crook" : undefined}
  />
);

/** Goliath: a very tall armed man. */
const Goliath = (p: { x: number; y: number; s?: number; down?: boolean }) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 2.5}
    face={-1}
    head="helmet"
    robe="c"
    cloak="b"
    pose={p.down ? "bow" : "stand"}
    staff={p.down ? undefined : "spear"}
  />
);

/** The valley of Elah: two hills, the low ground, and the brook. */
function Valley({
  h,
  frame,
  on,
}: {
  h: { hs: string };
  frame: number;
  on: number;
}) {
  return (
    <>
      <Ink d={HILL_L} tone="b" hatch={h.hs} />
      <Ink d={HILL_R} tone="g" hatch={h.hs} />
      <Ink d="M-10,510V380C200,360 600,360 810,380V510Z" tone="g" />
      <Ink
        d="M330,510C350,450 410,430 400,380H440C460,430 420,460 430,510Z"
        tone="b"
      />
      <Ambient frame={frame} on={on} off={on + 1} kind="bob">
        <Water x={356} y={420} w={90} rows={4} gap={20} />
      </Ambient>
    </>
  );
}

const CAMERA: [number, number, number][] = [
  [400, 320, 1.06],
  [330, 300, 1.15],
  [520, 340, 1.2],
  [420, 380, 1.3],
  [400, 320, 1.15],
  [420, 340, 1.12],
  [560, 300, 1.15],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Two armies, one valley. */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={400} y={70} r={22} />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={50}>
          <Cloud x={160} y={70} s={1.1} />
        </Ambient>
        <Valley h={h} frame={frame} on={-1} />
        {/* The Philistine camp. */}
        <Tent x={70} y={250} s={0.8} tone="b" hatch={h.h3} />
        <Tent x={180} y={246} s={0.7} tone="b" hatch={h.h3} />
        <Person x={120} y={300} s={0.9} head="helmet" robe="b" staff="spear" />
        <Person
          x={190}
          y={316}
          s={0.9}
          head="helmet"
          robe="b"
          cloak="c"
          staff="spear"
        />
        <Person x={250} y={336} s={0.9} head="helmet" robe="b" staff="spear" />
        {/* Israel's camp, and Saul. */}
        <Tent x={740} y={242} s={0.8} hatch={h.h3} />
        <Tent x={630} y={238} s={0.7} hatch={h.h3} />
        <Person x={560} y={336} s={0.9} face={-1} robe="c" staff="spear" />
        <Person x={620} y={316} s={0.9} face={-1} robe="g" staff="spear" />
        <Person
          x={690}
          y={300}
          s={1.15}
          face={-1}
          head="crown"
          robe="b"
          cloak="c"
        />
        <Person x={748} y={312} s={0.9} face={-1} robe="c" />
      </Fade>

      {/* 1. The champion. */}
      <Scene frame={frame} k={1}>
        <Ambient frame={frame} on={1} off={2} kind="drift" dx={-60}>
          <Cloud x={600} y={80} s={1.4} />
          <path fill={h.h1} d="M546,80h106v-14h-106Z" />
        </Ambient>
        <g transform="translate(0 40)">
          <Ink d={HILL_R} tone="g" hatch={h.hs} />
        </g>
        <Ink d="M-10,510V400C200,384 600,384 810,400V510Z" tone="g" />
        <Fade frame={frame} on={1} off={2} from="walk-left" at={2}>
          <Goliath x={290} y={460} />
        </Fade>
        <Fade frame={frame} on={1} off={2} from="right" at={8}>
          <Person
            x={590}
            y={372}
            s={0.85}
            face={-1}
            robe="c"
            staff="spear"
            pose="walk"
          />
          <Person x={650} y={352} s={0.85} face={-1} robe="g" pose="walk" />
          <Person
            x={706}
            y={338}
            s={1.05}
            face={-1}
            head="crown"
            robe="b"
            cloak="c"
          />
          <Person x={760} y={346} s={0.85} face={-1} robe="c" pose="walk" />
        </Fade>
        <Grass
          at={[
            [80, 450],
            [480, 470],
            [700, 450],
          ]}
        />
      </Scene>

      {/* 2. A boy with bread. */}
      <Scene frame={frame} k={2}>
        <Sun x={110} y={80} r={20} />
        <Hills
          y={380}
          peaks={[
            [120, 60],
            [560, 30],
          ]}
          hatch={h.hs}
        />
        <Tent x={660} y={372} s={1.3} hatch={h.h3} />
        {/* Far off in the valley, the champion still shouting. */}
        <Person
          x={90}
          y={330}
          s={0.7}
          head="helmet"
          robe="c"
          cloak="b"
          staff="spear"
        />
        <Person x={470} y={450} s={1.5} face={-1} robe="c" staff="spear" />
        <Person
          x={560}
          y={452}
          s={1.5}
          face={-1}
          robe="g"
          cloak="c"
          pose="reach"
        />
        <Person x={650} y={446} s={1.45} face={-1} robe="c" />
        <Fade frame={frame} on={2} off={3} from="walk-left" at={2}>
          <David x={300} y={456} s={1.25} pose="walk" bundle crook />
        </Fade>
      </Scene>

      {/* 3. Not Saul's armor: five stones from the brook. */}
      <Scene frame={frame} k={3}>
        <Hills
          y={360}
          peaks={[
            [200, 30],
            [640, 50],
          ]}
          hatch={h.hs}
        />
        <Ink d="M-10,510V430C200,410 520,440 810,420V510Z" tone="b" />
        <Ambient frame={frame} on={3} off={4} kind="bob">
          <Water x={20} y={450} w={780} rows={3} gap={16} />
        </Ambient>
        <Person
          x={640}
          y={420}
          s={1.7}
          face={-1}
          head="crown"
          robe="b"
          cloak="c"
        />
        {/* The armor, taken off. */}
        <Fade frame={frame} on={3} off={4} from="down" at={5}>
          <Ink d="M500,420C500,396 540,396 540,420Z" tone="b" />
          <path className="pl-l" d="M520,398V386" />
          <Ink
            d="M448,420V386C458,376 486,376 496,386V420Z"
            tone="b"
            hatch={h.h2}
          />
        </Fade>
        <David x={300} y={428} s={1.5} pose="kneel" />
        {/* Five smooth stones. */}
        <Fade frame={frame} on={3} off={4} from="grow" at={9}>
          <path
            className="pl-o"
            d="M380,436a7,5 0 1,0 14,0a7,5 0 1,0 -14,0ZM402,444a7,5 0 1,0 14,0a7,5 0 1,0 -14,0ZM398,426a7,5 0 1,0 14,0a7,5 0 1,0 -14,0ZM422,434a7,5 0 1,0 14,0a7,5 0 1,0 -14,0ZM420,420a7,5 0 1,0 14,0a7,5 0 1,0 -14,0Z"
          />
        </Fade>
      </Scene>

      {/* 4. In the name of the LORD. */}
      <Scene frame={frame} k={4}>
        <Ambient frame={frame} on={4} off={5} kind="glow">
          <Rays x={330} y={-10} reach={210} spread={130} n={9} />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [140, 40],
            [680, 60],
          ]}
          hatch={h.hs}
        />
        <Goliath x={590} y={462} />
        <David x={230} y={456} s={1.3} pose="reach" crook />
        <Grass
          at={[
            [80, 460],
            [400, 470],
            [740, 450],
          ]}
        />
      </Scene>

      {/* 5. One stone. */}
      <Scene frame={frame} k={5}>
        <g transform="translate(-40 30)">
          <Ink d={HILL_L} tone="b" hatch={h.hs} />
        </g>
        <Ink d="M-10,510V400C200,384 600,384 810,400V510Z" tone="g" />
        <David x={620} y={456} s={1.3} face={-1} pose="reach" />
        <Draw
          frame={frame}
          on={5}
          off={6}
          at={2}
          slow={1.2}
          className="pl-f"
          d="M566,372C500,250 380,250 330,390"
        />
        <Fade frame={frame} on={5} off={6} at={4}>
          <Goliath x={300} y={462} s={2.3} down />
          <path className="pl-l" d="M150,470L290,452" />
          <path className="pl-k" d="M136,472l16,-8l2,10Z" />
        </Fade>
        {/* The Philistine army runs. */}
        <Fade frame={frame} on={5} off={6} from="right" at={8}>
          <Person
            x={150}
            y={318}
            s={0.8}
            face={-1}
            head="helmet"
            robe="b"
            pose="walk"
          />
          <Person
            x={96}
            y={300}
            s={0.8}
            face={-1}
            head="helmet"
            robe="b"
            cloak="c"
            pose="walk"
          />
          <Person
            x={44}
            y={312}
            s={0.8}
            face={-1}
            head="helmet"
            robe="b"
            pose="walk"
          />
        </Fade>
      </Scene>

      {/* 6. Who are we in the story? */}
      <Scene frame={frame} k={6}>
        <Fade frame={frame} on={6} at={9}>
          <Ambient frame={frame} on={6} kind="glow">
            <Sun x={640} y={130} r={34} gold />
          </Ambient>
          <Ink d="M540,260C570,190 710,190 740,260Z" tone="g" hatch={h.hs} />
          <path className="pl-k" d="M636,206V140h8v66ZM618,158h44v7h-44Z" />
        </Fade>
        <Hills
          y={400}
          peaks={[
            [220, 110],
            [640, 20],
          ]}
          hatch={h.hs}
        />
        <Person x={130} y={356} s={1.15} robe="c" pose="pray" />
        <Person x={210} y={336} s={1.15} robe="g" pose="pray" />
        <Person x={290} y={350} s={1.15} robe="c" cloak="g" pose="pray" />
        <Person x={60} y={390} s={1.15} robe="g" pose="pray" />
        <Fade frame={frame} on={6} from="walk-right" at={3}>
          <David x={430} y={440} s={1.3} face={-1} pose="walk" crook />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
