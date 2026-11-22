/**
 * "Psalm 23: the LORD is my shepherd": the psalm line by line, as the Study
 * Bible's notes read it, in seven pictures drawn with the stage set.
 *
 *   0  My shepherd             a shepherd leading his flock in dry hills
 *   1  Green pastures          sheep lying down by still water
 *   2  The dark valley         the path between two cliffs; the flock close
 *   3  The rod and the staff   the shepherd on guard; a lamb lifted to safety
 *   4  A table and a full cup  a host's tent; enemies kept outside
 *   5  All the days of my life a road to a lit house; two doves following
 *   6  The good shepherd       Jesus with a crook and a lamb; a far hill
 *
 * God is never drawn. The shepherd is the shepherd of David's own picture,
 * the same figure in every frame (blue robe, clay cloak, a crook), and the
 * host is the host of the psalm's second picture. Jesus is one plain figure,
 * as in the other films. The one mustard mark: the cup (4), the lit window
 * (5), the rising sun (6).
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Dove,
  Grass,
  Hills,
  House,
  Ink,
  Olive,
  Person,
  Sheep,
  Stars,
  Sun,
  Table,
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

/** The shepherd of the psalm: the same figure in every picture. */
const Shepherd = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "sit" | "reach";
  staff?: "crook" | "staff";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    robe="b"
    cloak="c"
    pose={p.pose}
    staff={p.pose === "sit" ? undefined : (p.staff ?? "crook")}
  />
);

const CAMERA: [number, number, number][] = [
  [420, 340, 1.12],
  [380, 360, 1.18],
  [400, 340, 1.2],
  [440, 330, 1.2],
  [400, 340, 1.2],
  [520, 300, 1.12],
  [330, 330, 1.18],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). My shepherd. */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={680} y={90} r={24} />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={60}>
          <Cloud x={200} y={80} s={1.2} />
        </Ambient>
        <Hills
          y={360}
          peaks={[
            [160, 70],
            [440, 30],
            [700, 90],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Ink d="M-10,510V410C200,390 560,420 810,400V510Z" tone="c" />
        <path
          className="pl-f"
          d="M0,450C220,430 500,460 800,430M0,476C230,456 520,486 800,456"
        />
        <Shepherd x={560} y={452} pose="walk" />
        <Fade frame={frame} on={-1} off={1} from="walk-left" at={2}>
          <Sheep x={440} y={458} s={1.4} />
          <Sheep x={360} y={466} s={1.3} />
          <Sheep x={280} y={456} s={1.3} />
          <Sheep x={210} y={470} s={1.1} lamb />
          <Sheep x={140} y={460} s={1.3} />
        </Fade>
      </Fade>

      {/* 1. Green pastures, quiet waters. */}
      <Scene frame={frame} k={1}>
        <Sun x={110} y={90} r={22} />
        <Hills
          y={340}
          peaks={[
            [220, 40],
            [600, 60],
          ]}
          hatch={h.hs}
        />
        <Ink d="M-10,510V390C200,372 600,372 810,390V510Z" tone="g" />
        <Ambient frame={frame} on={1} off={2} kind="sway">
          <Olive x={640} y={372} s={2.2} hatch={h.h2} />
        </Ambient>
        {/* The still pool. */}
        <Ink
          d="M60,452C60,420 330,414 350,446C360,478 80,486 60,452Z"
          tone="b"
        />
        <path className="pl-f" d="M110,446h60M200,456h80M130,464h50" />
        <Shepherd x={560} y={446} pose="sit" face={-1} />
        <path className="pl-l" d="M610,446V300C610,286 626,286 626,300" />
        <Sheep x={400} y={428} s={1.3} graze />
        <Sheep x={470} y={470} s={1.3} graze face={-1} />
        <Fade frame={frame} on={1} off={2} from="up" at={4}>
          <Sheep x={300} y={486} s={1.2} lamb />
          <Sheep x={700} y={470} s={1.3} graze face={-1} />
        </Fade>
        <Grass
          at={[
            [380, 470],
            [540, 480],
            [740, 440],
            [30, 420],
          ]}
        />
      </Scene>

      {/* 2. The valley of the shadow of death. */}
      <Scene frame={frame} k={2}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V500H0Z" />
        <Ink
          d="M-10,510V40C80,20 200,60 250,160C290,260 300,400 340,510Z"
          tone="b"
          hatch={h.h3}
        />
        <Ink
          d="M810,510V30C720,10 610,70 560,170C520,270 520,400 470,510Z"
          tone="b"
          hatch={h.h3}
        />
        <path
          className="pl-paper"
          d="M340,510C330,420 372,330 400,250C428,330 480,420 470,510Z"
        />
        <path
          className="pl-f"
          d="M340,510C330,420 372,330 400,250M470,510C480,420 428,330 400,250"
        />
        <Ambient frame={frame} on={2} off={3} kind="twinkle">
          <Stars
            at={[
              [380, 60, 4],
              [430, 110, 3],
              [400, 160, 3],
            ]}
          />
        </Ambient>
        <Fade frame={frame} on={2} off={3} from="up" at={2}>
          <Shepherd x={404} y={400} s={1.3} pose="walk" />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="up" at={5}>
          <Sheep x={372} y={448} s={1.1} />
          <Sheep x={430} y={470} s={1.1} face={-1} />
          <Sheep x={392} y={492} s={0.9} lamb />
        </Fade>
      </Scene>

      {/* 3. The rod and the staff. */}
      <Scene frame={frame} k={3}>
        <Hills
          y={380}
          peaks={[
            [180, 30],
            [620, 60],
          ]}
          tone="c"
          hatch={h.hs}
        />
        {/* The thicket, and what might be in it. */}
        <Ink
          d="M-10,460C-10,400 30,350 80,362C100,320 170,330 176,376C210,380 220,430 200,460Z"
          tone="g"
          hatch={h.h3}
        />
        {/* The ledge, and the lamb caught on it. */}
        <Ink d="M560,510V330H810V510Z" tone="c" hatch={h.h2} />
        <path className="pl-l" d="M560,330H810" />
        <Shepherd x={380} y={456} s={1.75} pose="reach" staff="staff" />
        <path className="pl-l" d="M330,330L318,270" />
        <Ink d="M306,276c-8,-12 0,-26 14,-22c10,6 8,20 -2,26Z" tone="c" />
        <Fade frame={frame} on={3} off={4} from="up" at={5}>
          <path className="pl-l" d="M448,344L600,300C620,294 628,312 614,320" />
          <Sheep x={640} y={330} s={1.2} lamb face={-1} />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="walk-right" at={9}>
          <Sheep x={480} y={480} s={1.3} face={-1} />
          <Sheep x={250} y={486} s={1.2} />
        </Fade>
      </Scene>

      {/* 4. A table, and a full cup. */}
      <Scene frame={frame} k={4}>
        <Hills
          y={390}
          peaks={[
            [140, 20],
            [700, 30],
          ]}
          tone="c"
          hatch={h.hs}
        />
        {/* The enemies, far outside. */}
        <Person x={60} y={392} s={0.8} head="helmet" robe="b" staff="spear" />
        <Person x={108} y={400} s={0.8} head="helmet" robe="c" staff="spear" />
        {/* The tent, open, and the table inside. */}
        <Ink d="M190,470L250,230L420,130L640,170L770,470Z" tone="c" />
        <path
          className="pl-paper"
          d="M270,470L320,250L420,190L590,220L690,470Z"
        />
        <path fill={h.hs} d="M270,470L320,250L420,190L590,220L690,470Z" />
        <path
          className="pl-l"
          d="M270,470L320,250L420,190L590,220L690,470M420,130V100M640,170V140"
        />
        <Person
          x={560}
          y={452}
          s={1.5}
          pose="sit"
          face={-1}
          robe="g"
          head="bare"
        />
        <Person x={370} y={452} s={1.7} robe="b" cloak="c" pose="reach" />
        <Table x={470} y={470} s={1.7} />
        <Fade frame={frame} on={4} off={5} from="grow" at={6}>
          <path className="pl-m" d="M462,420h20l-3,-22h-14Z" />
          <path className="pl-l" d="M462,420h20l-3,-22h-14Z" />
          <path
            className="pl-f"
            d="M464,396c4,-8 12,-8 16,0M468,390c2,-6 6,-6 8,0"
          />
        </Fade>
      </Scene>

      {/* 5. All the days of my life. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V120H0Z" />
        <Hills
          y={390}
          peaks={[
            [200, 30],
            [600, 130],
          ]}
          hatch={h.hs}
        />
        <House x={610} y={262} s={1.3} hatch={h.h3} lit />
        <path
          className="pl-f"
          d="M0,470C200,440 420,430 560,290M60,500C260,460 470,440 590,290"
        />
        <Fade frame={frame} on={5} off={6} from="walk-left" at={2}>
          <Person
            x={300}
            y={452}
            s={1.6}
            pose="walk"
            robe="g"
            cloak="b"
            staff="staff"
          />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="walk-left" at={6}>
          <Ambient frame={frame} on={5} off={6} kind="bob">
            <Dove x={170} y={300} s={1.3} />
            <Dove x={100} y={350} s={1.1} />
          </Ambient>
        </Fade>
      </Scene>

      {/* 6. The good shepherd. */}
      <Scene frame={frame} k={6}>
        <Fade frame={frame} on={6} at={8}>
          <Ambient frame={frame} on={6} kind="glow">
            <Sun x={640} y={150} r={36} gold />
          </Ambient>
          <Ink d="M540,290C570,210 710,210 740,290Z" tone="g" hatch={h.hs} />
          <path className="pl-k" d="M636,230V160h8v70ZM618,178h44v7h-44Z" />
        </Fade>
        <Hills
          y={400}
          peaks={[
            [220, 40],
            [640, 20],
          ]}
          hatch={h.hs}
        />
        <Person x={330} y={452} s={1.8} robe="p" cloak="b" staff="crook" />
        <Sheep x={250} y={470} s={1.3} lamb />
        <Sheep x={450} y={466} s={1.4} face={-1} />
        <Fade frame={frame} on={6} from="walk-left" at={3}>
          <Sheep x={150} y={474} s={1.3} />
          <Sheep x={540} y={480} s={1.2} graze face={-1} />
        </Fade>
        <Grass
          at={[
            [80, 440],
            [620, 450],
            [740, 470],
          ]}
        />
      </Scene>
    </>
  ),
};

export default film;
