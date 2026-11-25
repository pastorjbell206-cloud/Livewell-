/**
 * "A blessing for all nations": the Explorer's own thread (threads.json,
 * "A blessing for every nation") in seven pictures drawn with the stage set.
 *
 *   0  Scattered                 the tower left unfinished; people going away
 *   1  One family, for every     an old man under the stars, outside his tent
 *   2  Rahab and Ruth            two women on the road to Bethlehem
 *   3  The great city            Jonah on his hill, his back to Nineveh
 *   4  Visitors from the east    the Magi, a star over a house
 *   5  Every language            a crowd of many lands in a street
 *   6  Every tribe and tongue    a crowd in white with palms, by the tree
 *
 * Every person has the cast's one skin tone and no face; the nations are
 * told apart only by robe, cloak and head cloth, never by caricature. God is
 * never drawn. The one mustard mark: one star (1, 4), the sun over the city
 * God cares about (3), a flame (5), the light of the last picture (6).
 */
import type { ReactNode } from "react";
import {
  CityWall,
  Cloud,
  Donkey,
  Grass,
  Hills,
  House,
  Ink,
  Olive,
  Person,
  Sheep,
  Stars,
  Sun,
  Tent,
  Water,
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

/** One gold star: the picture's one mark. */
const GoldStar = ({ x, y, r = 9 }: { x: number; y: number; r?: number }) => {
  const d = `M${x},${y - r * 1.7}L${x + r * 0.42},${y - r * 0.42}L${x + r * 1.7},${y}L${x + r * 0.42},${y + r * 0.42}L${x},${y + r * 1.7}L${x - r * 0.42},${y + r * 0.42}L${x - r * 1.7},${y}L${x - r * 0.42},${y - r * 0.42}Z`;
  return (
    <>
      <path className="pl-m" d={d} />
      <path className="pl-f" d={d} />
    </>
  );
};

/** A palm branch held up in the forward hand. */
const Branch = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="pl-g" d="M0,0C-12,-18 -10,-44 4,-62C12,-44 12,-18 0,0Z" />
    <path
      className="pl-f"
      d="M0,0C-12,-18 -10,-44 4,-62C12,-44 12,-18 0,0ZM0,0L4,-62M-6,-22L2,-30M-5,-36L3,-44M8,-20L2,-28M8,-34L3,-42"
    />
  </g>
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [330, 300, 1.14],
  [430, 340, 1.16],
  [380, 320, 1.12],
  [470, 300, 1.14],
  [400, 330, 1.14],
  [400, 300, 1.1],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Babel: the tower left unfinished. */}
      <Fade frame={frame} on={-1} off={1}>
        <Sun x={690} y={80} r={22} />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={50}>
          <Cloud x={150} y={90} s={1.1} />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [200, 14],
            [620, 20],
          ]}
          tone="c"
          hatch={h.hs}
        />
        {/* The tower: four brick steps, the top one ragged and unfinished. */}
        <Ink d="M290,400V330H510V400Z" tone="c" hatch={h.h1} />
        <Ink d="M320,330V268H480V330Z" tone="c" hatch={h.h1} />
        <Ink d="M348,268V212H452V268Z" tone="c" hatch={h.h1} />
        <Ink
          d="M372,212V176H388V164H404V180H420V170H430V212Z"
          tone="c"
          hatch={h.h1}
        />
        <path
          className="pl-f"
          d="M290,366H510M320,300H480M348,240H452M380,400V378C380,364 420,364 420,378V400"
        />
        {/* Tools left where they lay. */}
        <path className="pl-l" d="M540,400L566,360M548,388h22" />
        <Ink d="M226,400l8,-16h30l8,16Z" tone="c" />
        {/* The people, going every way. */}
        <Fade frame={frame} on={-1} off={1} from="left" at={4}>
          <Person x={150} y={452} s={0.95} face={-1} pose="walk" robe="b" />
          <Person
            x={112}
            y={462}
            s={0.95}
            face={-1}
            pose="walk"
            robe="g"
            head="veil"
            bundle
          />
          <Person x={60} y={440} s={0.8} face={-1} pose="walk" robe="c" />
        </Fade>
        <Fade frame={frame} on={-1} off={1} from="right" at={7}>
          <Person x={650} y={452} s={0.95} pose="walk" robe="g" cloak="c" />
          <Person
            x={700}
            y={464}
            s={0.95}
            pose="walk"
            robe="p"
            cloak="b"
            staff="staff"
          />
          <Person x={752} y={442} s={0.8} pose="walk" robe="b" head="veil" />
        </Fade>
        <Fade frame={frame} on={-1} off={1} from="up" at={10}>
          <Person
            x={372}
            y={478}
            s={0.9}
            face={-1}
            pose="walk"
            robe="c"
            bundle
          />
          <Person x={440} y={484} s={0.9} pose="walk" robe="b" cloak="g" />
        </Fade>
      </Fade>

      {/* 1. Abram under the stars. */}
      <Scene frame={frame} k={1}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V380H0Z" />
        <Ambient frame={frame} on={1} off={2} kind="twinkle">
          <Stars
            at={[
              [90, 70, 4],
              [170, 150, 3],
              [250, 60, 4],
              [330, 130, 3],
              [420, 50, 4],
              [520, 160, 3],
              [600, 70, 4],
              [690, 130, 3],
              [740, 50, 3],
              [130, 230, 3],
              [470, 250, 3],
              [660, 240, 4],
              [300, 220, 3],
              [560, 110, 3],
              [40, 150, 3],
            ]}
          />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [180, 30],
            [640, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Tent x={570} y={440} s={1.7} hatch={h.h3} />
        <Person
          x={300}
          y={462}
          s={1.7}
          face={-1}
          pose="stand"
          robe="c"
          cloak="g"
          staff="staff"
        />
        <Fade frame={frame} on={1} off={2} from="grow" at={6}>
          <GoldStar x={210} y={110} r={10} />
        </Fade>
      </Scene>

      {/* 2. Ruth and Naomi on the road. */}
      <Scene frame={frame} k={2}>
        <Sun x={110} y={90} r={22} />
        <Hills
          y={330}
          peaks={[
            [120, 90],
            [300, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Hills
          y={380}
          peaks={[
            [420, 16],
            [690, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        {/* The town ahead. */}
        <House x={650} y={352} s={0.75} hatch={h.h3} />
        <House x={724} y={360} s={0.6} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V410C240,396 560,400 810,388V510Z" tone="c" />
        <path className="pl-f" d="M0,452C260,436 540,436 800,420" />
        <Ambient frame={frame} on={2} off={3} kind="sway">
          <Wheat x={90} y={420} s={1.3} />
          <Wheat x={150} y={428} s={1.2} />
          <Wheat x={210} y={420} s={1.3} />
          <Wheat x={560} y={410} s={1.1} />
          <Wheat x={610} y={414} s={1.2} />
        </Ambient>
        <Fade frame={frame} on={2} off={3} from="walk-left" at={2}>
          <Person
            x={440}
            y={470}
            s={1.6}
            pose="walk"
            robe="g"
            cloak="b"
            head="veil"
            staff="staff"
          />
          <Person
            x={350}
            y={474}
            s={1.6}
            pose="walk"
            robe="b"
            cloak="c"
            head="veil"
            bundle
          />
        </Fade>
      </Scene>

      {/* 3. Jonah, and the great city. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={7}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={560} y={90} r={28} gold />
          </Ambient>
        </Fade>
        <Hills
          y={400}
          peaks={[
            [470, 10],
            [700, 24],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={560} y={400} w={360} s={1.1} hatch={h.h3} />
        <path
          className="pl-f"
          d="M440,330V300H470V330M500,330V286H540V330M580,330V304H612V330M640,330V294H672V330"
        />
        {/* Its people and their animals, at the gate. */}
        <Person x={520} y={432} s={0.7} robe="b" child />
        <Person x={494} y={436} s={0.85} robe="c" head="veil" />
        <Person x={610} y={434} s={0.85} robe="g" cloak="c" />
        <Sheep x={660} y={440} s={0.9} />
        <Donkey x={716} y={446} s={0.9} face={-1} />
        {/* Jonah's hill. */}
        <Ink
          d="M-10,510V330C60,290 200,290 270,350C310,390 330,450 340,510Z"
          tone="c"
          hatch={h.h2}
        />
        {/* The withered plant. */}
        <path
          className="pl-l"
          d="M214,318C214,270 204,236 172,222M204,262C190,250 176,252 168,262M210,286C224,270 238,272 244,282"
        />
        <path
          className="pl-f"
          d="M172,222l-12,10M172,222l-4,14M168,262l-6,10"
        />
        <Person
          x={150}
          y={322}
          s={1.5}
          face={-1}
          pose="sit"
          robe="b"
          cloak="g"
        />
      </Scene>

      {/* 4. The Magi. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V380H0Z" />
        <Ambient frame={frame} on={4} off={5} kind="twinkle">
          <Stars
            at={[
              [80, 80, 4],
              [190, 150, 3],
              [300, 70, 3],
              [430, 130, 4],
              [520, 50, 3],
              [730, 90, 3],
              [120, 230, 3],
              [380, 220, 3],
            ]}
          />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [220, 24],
            [600, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <House x={620} y={420} s={1.5} hatch={h.h3} />
        <House x={746} y={400} s={0.8} tone="b" hatch={h.h3} />
        <Fade frame={frame} on={4} off={5} from="grow" at={5}>
          <GoldStar x={620} y={150} r={12} />
          <path
            className="pl-f"
            d="M620,176V250M606,180L596,236M634,180L644,236"
          />
        </Fade>
        <Fade frame={frame} on={4} off={5} from="walk-left" at={2}>
          <Person
            x={430}
            y={466}
            s={1.5}
            pose="walk"
            robe="b"
            cloak="c"
            staff="staff"
          />
          <Person x={340} y={470} s={1.5} pose="walk" robe="g" cloak="b" />
          <Person x={250} y={466} s={1.5} pose="walk" robe="c" cloak="g" />
          <Donkey x={140} y={474} s={1.4} />
        </Fade>
      </Scene>

      {/* 5. Pentecost: one message, many languages. */}
      <Scene frame={frame} k={5}>
        <Ink d="M-10,400V120H250V400Z" tone="c" hatch={h.hs} />
        <path
          className="pl-l"
          d="M-10,120H260M40,400V300C40,270 100,270 100,300V400M150,200h50v60h-50Z"
        />
        <Ink d="M250,400V180H470V400Z" tone="b" hatch={h.hs} />
        <path className="pl-l" d="M250,180H480M320,240h40v50h-40Z" />
        <House x={690} y={400} s={1.6} tone="g" hatch={h.h3} />
        <Ink d="M-10,510V400H810V510Z" tone="c" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        {/* The steps, and those who speak. */}
        <Ink d="M-10,400H190V424H220V448H-10Z" />
        <Person x={50} y={400} s={1.25} pose="open" robe="b" cloak="c" />
        <Person x={122} y={400} s={1.25} pose="reach" robe="g" />
        <Person x={176} y={424} s={1.25} pose="reach" robe="c" cloak="b" />
        <Fade frame={frame} on={5} off={6} from="grow" at={3}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <path
              className="pl-m"
              d="M112,236C126,214 132,198 124,176C108,192 98,214 112,236Z"
            />
            <path
              className="pl-f"
              d="M112,236C126,214 132,198 124,176C108,192 98,214 112,236Z"
            />
          </Ambient>
        </Fade>
        {/* The crowd, from many lands. */}
        <Fade frame={frame} on={5} off={6} from="right" at={5}>
          <Person x={320} y={470} s={1.3} face={-1} robe="g" cloak="c" />
          <Person
            x={390}
            y={482}
            s={1.3}
            face={-1}
            robe="b"
            head="veil"
            cloak="g"
          />
          <Person x={460} y={468} s={1.3} face={-1} robe="c" head="bare" />
          <Person x={530} y={484} s={1.3} face={-1} robe="p" cloak="b" />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="right" at={9}>
          <Person
            x={600}
            y={470}
            s={1.3}
            face={-1}
            robe="b"
            cloak="c"
            staff="staff"
          />
          <Person x={668} y={486} s={1.3} face={-1} robe="g" head="veil" />
          <Person x={736} y={472} s={1.3} face={-1} robe="c" cloak="g" />
          <Person
            x={636}
            y={492}
            s={0.9}
            face={-1}
            robe="b"
            child
            head="bare"
          />
        </Fade>
      </Scene>

      {/* 6. A multitude no one could count. */}
      <Scene frame={frame} k={6}>
        <Fade frame={frame} on={6} at={8}>
          <Ambient frame={frame} on={6} kind="glow">
            <Sun x={400} y={86} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={370}
          peaks={[
            [160, 30],
            [640, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        {/* The far crowd: heads to the horizon. */}
        <path
          className="pl-f"
          d="M20,352a7,7 0 1,1 14,0M52,348a7,7 0 1,1 14,0M86,354a7,7 0 1,1 14,0M120,348a7,7 0 1,1 14,0M154,352a7,7 0 1,1 14,0M190,346a7,7 0 1,1 14,0M226,352a7,7 0 1,1 14,0M262,348a7,7 0 1,1 14,0M524,348a7,7 0 1,1 14,0M560,352a7,7 0 1,1 14,0M596,346a7,7 0 1,1 14,0M632,352a7,7 0 1,1 14,0M668,348a7,7 0 1,1 14,0M704,354a7,7 0 1,1 14,0M740,348a7,7 0 1,1 14,0M772,352a7,7 0 1,1 14,0"
        />
        {/* The tree of life, and the river. */}
        <Ambient frame={frame} on={6} kind="sway">
          <Olive x={400} y={372} s={2.6} hatch={h.h2} />
        </Ambient>
        <Ink
          d="M372,372C372,410 330,450 300,510H500C470,450 428,410 428,372Z"
          tone="b"
        />
        <Water x={330} y={430} w={150} rows={4} gap={18} />
        <Grass
          at={[
            [250, 400],
            [560, 404],
          ]}
        />
        <Fade frame={frame} on={6} from="left" at={2}>
          <Person x={70} y={452} s={1.3} robe="p" cloak="b" />
          <Branch x={100} y={382} />
          <Person x={150} y={478} s={1.3} robe="p" head="veil" />
          <Branch x={180} y={408} />
          <Person x={236} y={456} s={1.3} robe="p" cloak="c" head="bare" />
          <Branch x={266} y={386} />
          <Person x={196} y={492} s={0.9} robe="p" child />
        </Fade>
        <Fade frame={frame} on={6} from="right" at={5}>
          <Person x={566} y={456} s={1.3} face={-1} robe="p" cloak="g" />
          <Branch x={536} y={386} />
          <Person x={650} y={478} s={1.3} face={-1} robe="p" head="veil" />
          <Branch x={620} y={408} />
          <Person x={730} y={452} s={1.3} face={-1} robe="p" cloak="c" />
          <Branch x={700} y={382} />
          <Person
            x={606}
            y={492}
            s={0.9}
            face={-1}
            robe="p"
            child
            head="bare"
          />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
