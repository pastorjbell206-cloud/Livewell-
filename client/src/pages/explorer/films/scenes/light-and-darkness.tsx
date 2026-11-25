/**
 * "Light and darkness": one light followed from the Bible's first page to
 * its last, as the Study Bible's notes read the passages, in seven pictures
 * drawn with the stage set.
 *
 *   0  Let there be light        dark water, and one light over it
 *   1  Light where they lived    a dark land; one house with light in it
 *   2  A fire to lead them       the pillar of fire, and the people behind it
 *   3  The lamp that stayed lit  the lampstand in the tent, burning at night
 *   4  A great light             dawn over the lake, seen from a dark road
 *   5  The light of the world    Jesus in the temple court, by a great lamp
 *   6  No more night             the city with its gate open, full of light
 *
 * The one mustard mark is the light itself, and it is larger in each picture
 * than in the one before. Darkness is only ever night, water or shadow over a
 * land: it is never a people, and every person has the cast's one skin tone.
 * God is never drawn; Jesus is one plain figure, as in the other films.
 */
import type { ReactNode } from "react";
import {
  CityWall,
  Donkey,
  Hills,
  House,
  Ink,
  Jar,
  Palm,
  Person,
  Stars,
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

const disc = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

/** The light: a gold disc with an ink edge. */
const Light = ({ x, y, r }: { x: number; y: number; r: number }) => (
  <>
    <path className="pl-m" d={disc(x, y, r)} />
    <path className="pl-l" d={disc(x, y, r)} />
  </>
);

/** A flame: the picture's light where the light is a fire. */
const Flame = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => {
  const d = `M${x},${y}C${x + 9 * s},${y - 12 * s} ${x + 12 * s},${y - 22 * s} ${x + 6 * s},${y - 36 * s}C${x - 6 * s},${y - 24 * s} ${x - 10 * s},${y - 12 * s} ${x},${y}Z`;
  return (
    <>
      <path className="pl-m" d={d} />
      <path className="pl-f" d={d} />
    </>
  );
};

const CAMERA: [number, number, number][] = [
  [400, 220, 1.1],
  [470, 330, 1.16],
  [520, 280, 1.12],
  [400, 320, 1.18],
  [470, 280, 1.12],
  [420, 300, 1.16],
  [400, 260, 1.1],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Darkness over the deep, and the first light. */}
      <Fade frame={frame} on={-1} off={1}>
        <path className="fp-dark" fill={h.h2} d="M0,0H800V500H0Z" />
        <Ink d="M-10,510V330H810V510Z" tone="b" hatch={h.h1} />
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Water x={20} y={360} w={780} rows={6} gap={22} />
        </Ambient>
        <path className="pl-paper" d={disc(400, 170, 46)} />
        <Draw
          frame={frame}
          on={0}
          off={1}
          at={5}
          slow={4}
          className="pl-f"
          d="M400,96V40M400,244V300M326,170H250M474,170H550M348,118L300,70M452,118L500,70M348,222L300,270M452,222L500,270"
        />
        <Ambient frame={frame} on={-1} off={1} kind="glow">
          <Light x={400} y={170} r={12} />
        </Ambient>
      </Fade>

      {/* 1. Darkness over Egypt; light where Israel lived. */}
      <Scene frame={frame} k={1}>
        <path className="fp-dark" fill={h.h3} d="M0,0H800V400H0Z" />
        <Hills
          y={400}
          peaks={[
            [200, 10],
            [640, 16],
          ]}
          tone="b"
          hatch={h.h2}
        />
        {/* The dark houses of the land. */}
        <House x={110} y={404} s={1.3} tone="b" hatch={h.h3} />
        <House x={250} y={396} s={0.9} tone="b" hatch={h.h3} />
        <Palm x={24} y={404} s={1.2} />
        <House x={724} y={400} s={1.1} tone="b" hatch={h.h3} />
        <path fill={h.h2} d="M38,300H320V404H38ZM650,310H800V400H650Z" />
        {/* The one house with light in it, and its light on the ground. */}
        <path
          className="pl-paper"
          d="M446,404L380,500H640L514,404ZM360,240H600V404H360Z"
        />
        <House x={480} y={404} s={1.8} tone="c" />
        <path className="pl-paper" d="M458,404V343C458,321 502,321 502,343V404Z" />
        <path className="pl-l" d="M458,404V343C458,321 502,321 502,343V404" />
        <Fade frame={frame} on={1} off={2} from="grow" at={4}>
          <Ambient frame={frame} on={1} off={2} kind="glow">
            <path className="pl-m" d="M530,307h29v29h-29Z" />
            <path className="pl-l" d="M530,307h29v29h-29Z" />
          </Ambient>
        </Fade>
        <Fade frame={frame} on={1} off={2} from="up" at={7}>
          <Person x={440} y={478} s={1.25} pose="sit" robe="g" cloak="c" />
          <Person
            x={556}
            y={480}
            s={1.25}
            pose="sit"
            face={-1}
            robe="b"
            head="veil"
          />
          <Person x={498} y={486} s={0.85} pose="sit" robe="c" child head="bare" />
        </Fade>
      </Scene>

      {/* 2. The pillar of fire. */}
      <Scene frame={frame} k={2}>
        <path className="fp-dark" fill={h.h2} d="M0,0H800V400H0Z" />
        <Ambient frame={frame} on={2} off={3} kind="twinkle">
          <Stars
            at={[
              [80, 70, 3],
              [200, 130, 3],
              [320, 60, 4],
              [440, 150, 3],
            ]}
          />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [160, 40],
            [520, 20],
          ]}
          tone="c"
          hatch={h.hs}
        />
        {/* The pillar: a column of fire with a gold heart. */}
        <path
          className="pl-paper"
          d="M560,400C520,330 590,280 560,210C540,150 600,110 610,30C650,100 700,150 680,220C660,290 730,330 690,400Z"
        />
        <Fade frame={frame} on={2} off={3} from="up" at={3}>
          <Ambient frame={frame} on={2} off={3} kind="flicker">
            <path
              className="pl-m"
              d="M600,400C580,340 630,300 610,240C600,200 624,170 626,120C650,170 664,210 650,256C640,300 676,340 656,400Z"
            />
          </Ambient>
        </Fade>
        <path
          className="pl-l"
          d="M560,400C520,330 590,280 560,210C540,150 600,110 610,30C650,100 700,150 680,220C660,290 730,330 690,400"
        />
        <path
          className="pl-f"
          d="M600,400C580,340 630,300 610,240C600,200 624,170 626,120C650,170 664,210 650,256C640,300 676,340 656,400"
        />
        <Fade frame={frame} on={2} off={3} from="walk-left" at={5}>
          <Person
            x={440}
            y={460}
            s={1.4}
            pose="walk"
            robe="c"
            cloak="b"
            staff="staff"
          />
          <Person x={360} y={468} s={1.4} pose="walk" robe="b" head="veil" bundle />
          <Person x={310} y={474} s={0.9} pose="walk" robe="g" child head="bare" />
          <Person x={250} y={462} s={1.4} pose="walk" robe="g" cloak="c" bundle />
          <Donkey x={150} y={470} s={1.3} />
          <Person x={70} y={464} s={1.3} pose="walk" robe="p" cloak="b" />
        </Fade>
      </Scene>

      {/* 3. The lamps in the tent, burning through the night. */}
      <Scene frame={frame} k={3}>
        <path className="fp-dark" fill={h.h2} d="M0,0H800V390H0Z" />
        <Hills
          y={390}
          peaks={[
            [160, 20],
            [660, 26],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Tent x={90} y={410} s={0.9} hatch={h.h3} />
        <Tent x={720} y={414} s={0.9} hatch={h.h3} />
        {/* The great tent, its door open. */}
        <Ink d="M170,470L230,220L400,130L570,220L630,470Z" tone="c" />
        <path className="pl-paper" d="M250,470L300,250L400,196L500,250L550,470Z" />
        <path
          className="pl-l"
          d="M250,470L300,250L400,196L500,250L550,470M400,130V100"
        />
        {/* The lampstand: a stem and three branches to a side. */}
        <path
          className="pl-l"
          d="M400,470V300M372,470H428M340,300C340,360 460,360 460,300M358,300C358,344 442,344 442,300M378,300C378,326 422,326 422,300"
        />
        <Fade frame={frame} on={3} off={4} from="grow" at={3}>
          <Ambient frame={frame} on={3} off={4} kind="flicker">
            <Flame x={340} y={298} s={0.8} />
            <Flame x={358} y={298} s={0.8} />
            <Flame x={378} y={298} s={0.8} />
            <Flame x={400} y={298} s={0.9} />
            <Flame x={422} y={298} s={0.8} />
            <Flame x={442} y={298} s={0.8} />
            <Flame x={460} y={298} s={0.8} />
          </Ambient>
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" at={7}>
          <Person x={300} y={470} s={1.5} pose="reach" robe="p" cloak="b" />
          <Jar x={258} y={470} s={1.1} />
        </Fade>
      </Scene>

      {/* 4. The people walking in darkness have seen a great light. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V300H0Z" />
        <Fade frame={frame} on={4} off={5} from="up" at={5}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Light x={560} y={300} r={46} />
          </Ambient>
          <path
            className="pl-f"
            d="M560,236V190M500,262L466,228M620,262L654,228M488,300H440M632,300H680"
          />
        </Fade>
        {/* The lake, and the far shore. */}
        <Ink d="M300,300H810V400H300Z" tone="b" />
        <Water x={330} y={320} w={470} rows={4} gap={20} />
        <Hills
          y={300}
          w={420}
          floor={420}
          peaks={[
            [120, 120],
            [300, 60],
          ]}
          tone="b"
          hatch={h.h3}
        />
        <Ink d="M-10,510V400C240,380 560,392 810,380V510Z" tone="g" hatch={h.h2} />
        <path className="pl-f" d="M0,452C260,430 540,440 800,424" />
        <Fade frame={frame} on={4} off={5} from="walk-left" at={2}>
          <Person
            x={360}
            y={470}
            s={1.4}
            pose="walk"
            robe="c"
            cloak="g"
            staff="staff"
          />
          <Person x={280} y={476} s={1.4} pose="walk" robe="b" head="veil" />
          <Person x={226} y={482} s={0.9} pose="walk" robe="c" child />
          <Person x={150} y={472} s={1.4} pose="walk" robe="g" cloak="b" />
        </Fade>
      </Scene>

      {/* 5. "I am the light of the world." */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V150H0Z" />
        {/* The court: a wall, its pillars, the paved floor. */}
        <Ink d="M-10,400V150H810V400Z" tone="c" hatch={h.hs} />
        <Ink d="M60,400V130H110V400ZM690,400V130H740V400Z" tone="c" />
        <path className="pl-l" d="M50,130H120M680,130H750M-10,150H810" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,436H800M0,474H800M200,400L170,500M600,400L630,500" />
        {/* The great lamp of the feast. */}
        <path className="pl-l" d="M560,400V230M530,400H590" />
        <Ink d="M520,230C520,206 600,206 600,230L588,244H532Z" tone="c" />
        <Fade frame={frame} on={5} off={6} from="grow" at={3}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Flame x={560} y={218} s={2.2} />
          </Ambient>
        </Fade>
        <Person x={420} y={470} s={1.7} pose="open" robe="p" cloak="b" />
        <Fade frame={frame} on={5} off={6} from="left" at={6}>
          <Person x={250} y={474} s={1.4} robe="g" cloak="c" />
          <Person x={180} y={482} s={1.4} robe="b" head="veil" />
          <Person x={110} y={472} s={1.4} robe="c" cloak="g" staff="staff" />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="right" at={9}>
          <Person x={680} y={478} s={1.4} face={-1} robe="b" cloak="c" />
          <Person x={744} y={486} s={1.0} face={-1} robe="g" child head="bare" />
        </Fade>
      </Scene>

      {/* 6. The city that needs no sun. */}
      <Scene frame={frame} k={6}>
        <Fade frame={frame} on={6} from="grow" at={3}>
          <Ambient frame={frame} on={6} kind="glow">
            <Light x={400} y={230} r={84} />
          </Ambient>
          <path
            className="pl-f"
            d="M400,126V40M300,160L240,90M500,160L560,90M270,230H170M530,230H630M310,290L220,330M490,290L580,330M340,140L310,60M460,140L490,60"
          />
        </Fade>
        <Hills
          y={380}
          peaks={[
            [400, 80],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={400} y={312} w={300} s={1.2} />
        <path className="pl-f" d="M360,500C372,430 388,370 392,312M448,500C432,430 414,370 408,312" />
        <Fade frame={frame} on={6} from="up" at={7}>
          <Person x={330} y={478} s={1.3} pose="walk" robe="p" cloak="b" />
          <Person x={470} y={484} s={1.3} pose="walk" face={-1} robe="p" head="veil" />
          <Person x={400} y={440} s={0.9} pose="walk" robe="p" cloak="c" />
          <Person x={250} y={488} s={0.9} pose="walk" robe="p" child head="bare" />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
