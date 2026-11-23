/**
 * "The Exodus: out of Egypt": Exodus 1 to 15 as the Rescue stop and the Study
 * Bible's notes tell it, in seven pictures drawn with the stage set.
 *
 *   0  Slaves in Egypt          bricks, a wall, an overseer, a hot sun
 *   1  The bush that burned     Moses and his flock before the bush
 *   2  Let my people go         Moses and Aaron before Pharaoh
 *   3  The night of the Passover a family at their marked door, ready to go
 *   4  Through the sea          the dry road between walls of water
 *   5  A song on the far shore  Miriam's tambourine, the women dancing
 *   6  A greater rescue         the marked door, a path, the cross and the tomb
 *
 * Moses is the same figure throughout (clay robe, blue cloak, a staff), and
 * Aaron beside him in olive. No route is drawn and no date given, and no
 * people is drawn by caricature: Egypt's king is a crowned figure on a seat.
 * The one mustard mark: the flame in the bush (1), the sun (5, 6).
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Moon,
  Mountain,
  Palm,
  Person,
  Sheep,
  Stars,
  Sun,
  Water,
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

const Moses = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "reach" | "pray";
  crook?: boolean;
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    robe="c"
    cloak="b"
    pose={p.pose}
    staff={p.crook ? "crook" : "staff"}
  />
);

/** A course of bricks from (x, y), `n` across. */
const bricks = (x: number, y: number, n: number) =>
  Array.from({ length: n }, (_, i) => `M${x + i * 34},${y}h30v-16h-30Z`).join(
    ""
  );

const CAMERA: [number, number, number][] = [
  [380, 340, 1.15],
  [480, 320, 1.2],
  [420, 330, 1.15],
  [470, 330, 1.2],
  [400, 330, 1.15],
  [360, 340, 1.15],
  [560, 300, 1.1],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Slaves in Egypt. */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={130} y={90} r={30} />
        <Hills
          y={410}
          peaks={[
            [200, 10],
            [600, 16],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Palm x={60} y={410} s={1.5} />
        {/* The wall they are made to build. */}
        <Ink d="M520,410V170H810V410Z" tone="c" hatch={h.h2} />
        <path
          className="pl-f"
          d="M520,210H800M520,250H800M520,290H800M520,330H800M520,370H800M580,170V210M700,170V210M640,210V250M760,210V250M580,250V290M700,250V290M640,290V330M760,290V330M580,330V370M700,330V370M640,370V410"
        />
        <path className="pl-o" d={bricks(250, 440, 4)} />
        <path className="pl-o" d={bricks(267, 424, 3)} />
        <Person x={170} y={440} s={1.9} pose="bow" robe="g" head="bare" />
        <Fade frame={frame} on={-1} off={1} from="walk-left" at={3}>
          <Person
            x={440}
            y={446}
            s={1.5}
            pose="walk"
            robe="b"
            head="bare"
            bundle
          />
        </Fade>
        <Fade frame={frame} on={-1} off={1} from="right" at={7}>
          <Person
            x={640}
            y={452}
            s={1.75}
            face={-1}
            robe="p"
            cloak="b"
            head="bare"
            staff="staff"
          />
        </Fade>
      </Fade>

      {/* 1. The bush that burned. */}
      <Scene frame={frame} k={1}>
        <Mountain x={640} y={390} w={460} h={300} hatch={h.h2} />
        <Ambient frame={frame} on={1} off={2} kind="drift" dx={40}>
          <Cloud x={150} y={80} s={1.2} />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [200, 20],
            [560, 10],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Sheep x={90} y={440} s={1.3} graze />
        <Sheep x={160} y={456} s={1.2} face={-1} />
        <Sheep x={60} y={470} s={1} lamb />
        <Moses x={300} y={452} crook />
        {/* The bush, and the flame that does not burn it. */}
        <Ink
          d="M470,440C452,418 462,384 490,388C494,362 536,356 546,384C574,380 588,412 570,440Z"
          tone="g"
          hatch={h.h2}
        />
        <path
          className="pl-f"
          d="M520,440V412M520,420l-14,-12M520,426l16,-12"
        />
        <Fade frame={frame} on={1} off={2} from="grow" at={3}>
          <Ambient frame={frame} on={1} off={2} kind="flicker">
            <Flame x={520} y={372} s={2.2} gold />
          </Ambient>
        </Fade>
      </Scene>

      {/* 2. Let my people go. */}
      <Scene frame={frame} k={2}>
        <path className="pl-l" d="M0,60H800" />
        <path fill={h.hs} d="M0,0H800V60H0Z" />
        {[70, 250, 560, 740].map(x => (
          <g key={x}>
            <Ink d={`M${x - 20},430V86h40V430Z`} tone="b" hatch={h.hs} />
            <Ink d={`M${x - 30},86V60h60V86Z`} tone="c" />
          </g>
        ))}
        <Ink d="M-10,510V430H810V510Z" tone="c" />
        <path fill={h.h3} d="M0,452H800V500H0Z" />
        {/* The king of Egypt on his seat. */}
        <Ink d="M604,434V250H700V434Z" tone="b" />
        <Ink d="M580,434V400H724V434Z" tone="c" />
        <Person
          x={650}
          y={402}
          s={1.6}
          face={-1}
          head="crown"
          robe="p"
          cloak="c"
          pose="sit"
        />
        <Fade frame={frame} on={2} off={3} from="walk-left" at={2}>
          <Moses x={330} y={452} pose="reach" />
          <Person x={220} y={456} s={1.55} robe="g" cloak="c" />
        </Fade>
        {/* The darkness that came over the land. */}
        <Fade frame={frame} on={2} off={3} at={12}>
          <path className="fp-dark" fill={h.h1} d="M272,86H538V250H272Z" />
          <path className="pl-l" d="M272,86H538V250H272Z" />
        </Fade>
      </Scene>

      {/* 3. The night of the Passover. */}
      <Scene frame={frame} k={3}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V250H0Z" />
        <Moon x={120} y={80} r={20} />
        <Ambient frame={frame} on={3} off={4} kind="twinkle">
          <Stars
            at={[
              [250, 60, 5],
              [370, 120, 4],
              [700, 60, 5],
              [740, 170, 4],
              [60, 190, 4],
            ]}
          />
        </Ambient>
        <Hills
          y={412}
          peaks={[
            [200, 12],
            [660, 18],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <House x={520} y={414} s={2.6} hatch={h.h3} />
        <Draw
          frame={frame}
          on={3}
          off={4}
          at={2}
          slow={2}
          className="fp-mark"
          d="M490,320V402"
        />
        <Draw
          frame={frame}
          on={3}
          off={4}
          at={3.5}
          slow={2}
          className="fp-mark"
          d="M486,302H554"
        />
        <Draw
          frame={frame}
          on={3}
          off={4}
          at={5}
          slow={2}
          className="fp-mark"
          d="M550,320V402"
        />
        <Sheep x={690} y={440} s={1.4} lamb face={-1} />
        <Fade frame={frame} on={3} off={4} from="up" at={8}>
          <Person x={360} y={440} s={1.55} robe="b" cloak="c" staff="staff" />
          <Person x={280} y={446} s={1.4} head="veil" robe="c" bundle />
          <Person x={216} y={452} s={0.95} child head="bare" robe="g" />
        </Fade>
      </Scene>

      {/* 4. Through the sea. */}
      <Scene frame={frame} k={4}>
        <Ink
          d="M-10,60C60,36 150,80 230,50C280,34 310,60 320,90L290,510H-10Z"
          tone="b"
        />
        <Ink
          d="M810,60C740,36 650,80 570,50C520,34 490,60 480,90L510,510H810Z"
          tone="b"
        />
        <Ambient frame={frame} on={4} off={5} kind="bob">
          <Water x={10} y={120} w={300} rows={9} gap={38} />
          <Water x={500} y={120} w={300} rows={9} gap={38} />
        </Ambient>
        <path className="pl-f" d="M290,510L370,110M510,510L430,110" />
        <Fade frame={frame} on={4} off={5} from="up" at={7}>
          <Person x={376} y={300} s={0.7} robe="b" staff="staff" pose="walk" />
          <Person
            x={420}
            y={320}
            s={0.75}
            head="veil"
            robe="g"
            bundle
            pose="walk"
          />
          <Person
            x={396}
            y={372}
            s={0.95}
            robe="g"
            cloak="c"
            bundle
            pose="walk"
          />
          <Person x={446} y={384} s={0.65} child head="bare" robe="c" />
          <Sheep x={350} y={390} s={0.8} lamb />
        </Fade>
        <Fade frame={frame} on={4} off={5} from="up" at={2}>
          <Moses x={400} y={476} s={1.5} pose="pray" />
        </Fade>
      </Scene>

      {/* 5. A song on the far shore. */}
      <Scene frame={frame} k={5}>
        <Ambient frame={frame} on={5} off={6} kind="glow">
          <Sun x={640} y={120} r={34} gold />
        </Ambient>
        <Ink d="M-10,330V230H810V330Z" tone="b" />
        <Ambient frame={frame} on={5} off={6} kind="bob">
          <Water x={10} y={254} w={790} rows={4} gap={18} />
        </Ambient>
        <Ink
          d="M-10,510V330C200,310 600,340 810,320V510Z"
          tone="g"
          hatch={h.hs}
        />
        <Moses x={640} y={440} s={1.5} face={-1} />
        <Ambient frame={frame} on={5} off={6} kind="bob">
          <Person
            x={300}
            y={446}
            s={1.6}
            head="veil"
            robe="c"
            cloak="b"
            pose="pray"
          />
          {/* The tambourine in her hand. */}
          <Ink d="M330,286a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z" tone="c" />
          <path
            className="pl-f"
            d="M336,286a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z"
          />
        </Ambient>
        <Fade frame={frame} on={5} off={6} from="walk-left" at={4}>
          <Ambient frame={frame} on={5} off={6} kind="bob" late={0.8}>
            <Person x={170} y={452} s={1.45} head="veil" robe="g" pose="pray" />
            <Person
              x={430}
              y={456}
              s={1.45}
              head="veil"
              robe="b"
              cloak="g"
              pose="pray"
            />
            <Person
              x={90}
              y={462}
              s={0.95}
              child
              head="bare"
              robe="c"
              pose="pray"
            />
          </Ambient>
        </Fade>
        <Grass
          at={[
            [520, 460],
            [740, 450],
          ]}
        />
      </Scene>

      {/* 6. A greater rescue. */}
      <Scene frame={frame} k={6}>
        <Ambient frame={frame} on={6} kind="glow">
          <Sun x={610} y={130} r={36} gold />
        </Ambient>
        <Hills
          y={400}
          peaks={[
            [180, 16],
            [600, 120],
          ]}
          hatch={h.hs}
        />
        <House x={150} y={400} s={1.6} hatch={h.h3} />
        <path className="fp-mark" d="M132,344V396M128,330H172M168,344V396" />
        <Sheep x={270} y={440} s={1.3} lamb />
        <Draw
          frame={frame}
          on={6}
          at={4}
          slow={5}
          className="pl-f"
          d="M200,420C300,460 420,440 520,330"
        />
        <Fade frame={frame} on={6} from="up" at={8}>
          <path className="pl-k" d="M594,280V170h10v110ZM570,198h58v10h-58Z" />
          <Ink d="M660,400C660,340 770,340 770,400Z" tone="b" hatch={h.hs} />
          <path
            className="pl-paper"
            d="M694,400V376C694,358 730,358 730,376V400Z"
          />
          <path className="pl-l" d="M694,400V376C694,358 730,358 730,376V400" />
          <Ink d="M736,388a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z" tone="c" />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
