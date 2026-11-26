/**
 * "Joshua: a promise kept": a film for one whole book, from the book's own
 * page (bible/notes/joshua/intro.json) and its chapter notes.
 *
 *   0  The promised land        the camp by the Jordan, the land beyond
 *   1  How it is laid out       entering, taking, dividing, serving
 *   2  The river                the priests and the ark in the river bed
 *   3  The hardest chapters     the march around Jericho's standing walls
 *   4  Who belongs              Rahab's house on the wall, the scouts hidden
 *   5  Rest, and a choice       the people before the stone at Shechem
 *   6  Where to start           the reader and the open scroll
 *
 * No battle, no fallen wall, no weapon and no death is drawn: the wars are
 * named in the captions and nowhere pictured. God is never drawn, nor the
 * commander of the LORD's army. Joshua has the same robe, cloak and staff
 * in every picture. The one mustard mark: the sun over the land (0, 5), the
 * rule under the dividing (1), the ark (2, 3), Rahab's lit window (4), the
 * marker (6).
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Person,
  Sun,
  Tent,
  Water,
  CityWall,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Entering 1 to 5, taking 6 to 12, dividing 13 to 21, serving 22 to 24. */
export const LAYOUT = [5, 7, 9, 3];

const Joshua = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "open";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="g"
    head="cloth"
    staff="staff"
  />
);

/** The ark carried on its poles by two priests; `gold` makes it the mark. */
const Ark = ({
  x,
  y,
  s = 1,
  gold,
}: {
  x: number;
  y: number;
  s?: number;
  gold?: boolean;
}) => (
  <>
    <Person x={x - 46 * s} y={y} s={s} robe="c" head="cloth" pose="hold" />
    <Person x={x + 46 * s} y={y} s={s} robe="c" head="cloth" pose="hold" />
    <path
      className="pl-l"
      d={`M${x - 70 * s},${y - 66 * s}H${x + 70 * s}`}
    />
    <path
      className={gold ? "pl-m" : "pl-c"}
      d={`M${x - 20 * s},${y - 82 * s}h${40 * s}v${22 * s}h${-40 * s}Z`}
    />
    <path
      className="pl-f"
      d={`M${x - 20 * s},${y - 82 * s}h${40 * s}v${22 * s}h${-40 * s}ZM${x - 22 * s},${y - 86 * s}h${44 * s}`}
    />
  </>
);

/** A pile of stones set up as a memorial. */
const Stones = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <Ink
    d={`M${x - 26 * s},${y}c0,-10 8,-14 14,-12c2,-10 16,-12 20,-4c8,-4 18,2 18,16Z M${x - 14 * s},${y - 12 * s}c4,-10 18,-10 20,-2`}
    tone="b"
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 320, 1.12],
  [400, 320, 1.1],
  [420, 300, 1.12],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The camp by the Jordan, the land beyond. */}
      <FirstScene frame={frame}>
        <Fade frame={frame} on={-1} off={1} at={3}>
          <Ambient frame={frame} on={0} off={1} kind="glow">
            <Sun x={600} y={96} r={28} gold />
          </Ambient>
        </Fade>
        <Hills
          y={300}
          peaks={[
            [220, 60],
            [560, 90],
            [720, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,330V300H810V330Z" tone="g" />
        <path className="pl-paper" d="M-10,330H810V372H-10Z" />
        <Water x={0} y={340} w={800} rows={2} gap={14} />
        <path className="pl-l" d="M-10,330H810M-10,372H810" />
        <Ink d="M-10,510V372H810V510Z" tone="c" />
        <Tent x={110} y={430} s={0.8} tone="b" hatch={h.h3} />
        <Tent x={250} y={446} s={0.7} hatch={h.h3} />
        <Tent x={690} y={440} s={0.75} tone="b" hatch={h.h3} />
        <Fade frame={frame} on={-1} off={1} from="left" at={4}>
          <Person x={330} y={482} s={1.2} robe="g" cloak="c" head="veil" />
          <Person x={370} y={488} s={1.1} robe="c" head="cloth" />
          <Person x={560} y={484} s={1.2} robe="p" cloak="b" head="bare" />
          <Person x={600} y={490} s={0.9} robe="g" child head="bare" />
        </Fade>
        <Joshua x={460} y={478} />
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={2}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <path
                className="pl-l"
                d={`M${mid - 36},${top - 10}q9,-8 18,0t18,0t18,0t18,0M${mid - 36},${top - 22}q9,-8 18,0t18,0t18,0t18,0`}
              />
            ) : i === 1 ? (
              <Ink
                d={`M${mid - 36},${top}v-26h8v-6h8v6h8v-6h8v6h8v-6h8v6h8v-6h8v6h8v26Z`}
                tone="c"
              />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 46},${top}l12,-28h68l12,28ZM${mid - 12},${top}l4,-28M${mid + 12},${top}l-4,-28M${mid - 40},${top - 14}h80`}
              />
            ) : (
              <Ink
                d={`M${mid - 10},${top}v-34c0,-8 20,-8 20,0v34Z`}
                tone="b"
              />
            )
          }
        />
      </Scene>

      {/* 2. The river stops; the people cross on dry ground. */}
      <Scene frame={frame} k={2}>
        <Hills
          y={300}
          peaks={[
            [160, 50],
            [640, 70],
          ]}
          tone="g"
          hatch={h.hs}
        />
        {/* The water heaped up far upstream, on the left. */}
        <Ink d="M-10,300H200C170,320 120,330 -10,334Z" tone="b" />
        <Water x={0} y={312} w={170} rows={1} />
        {/* The river bed, dry. */}
        <Ink d="M-10,510V330C200,330 600,316 810,310V510Z" tone="c" />
        <path
          className="pl-f"
          d="M120,380h40M300,410h30M520,370h44M640,420h30M200,460h36"
        />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <Ark x={400} y={460} s={1.5} gold />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="right" at={6}>
          <Person
            x={600}
            y={470}
            s={1.3}
            face={-1}
            pose="walk"
            robe="g"
            cloak="c"
            head="veil"
          />
          <Person
            x={660}
            y={476}
            s={1.3}
            face={-1}
            pose="walk"
            robe="p"
            head="cloth"
            bundle
          />
          <Person
            x={720}
            y={470}
            s={1}
            face={-1}
            pose="walk"
            robe="b"
            child
            head="bare"
          />
        </Fade>
        <Fade frame={frame} on={2} off={3} at={9}>
          <Stones x={120} y={330} s={1.4} />
        </Fade>
      </Scene>

      {/* 3. The march around Jericho; the walls still stand. */}
      <Scene frame={frame} k={3}>
        <Sun x={130} y={100} r={22} />
        <Hills
          y={330}
          peaks={[
            [140, 40],
            [700, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <CityWall x={400} y={370} w={420} tone="c" hatch={h.h3} />
        <Ink d="M-10,510V370C240,372 560,372 810,370V510Z" tone="g" />
        <path className="pl-f" d="M0,430C260,416 540,416 800,430" />
        <Fade frame={frame} on={3} off={4} from="left" at={3}>
          <Ark x={250} y={440} s={1.1} gold />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" at={6}>
          <Person x={380} y={446} s={1.1} pose="walk" robe="g" head="cloth" />
          <Person x={440} y={448} s={1.1} pose="walk" robe="b" head="cloth" />
          <Person x={500} y={446} s={1.1} pose="walk" robe="p" cloak="c" />
          <Person x={560} y={448} s={1.1} pose="walk" robe="c" head="cloth" />
          <Person x={620} y={446} s={1.1} pose="walk" robe="g" cloak="b" />
        </Fade>
        <Grass
          at={[
            [60, 470],
            [740, 480],
          ]}
        />
      </Scene>

      {/* 4. Rahab's house on the wall; the scouts hidden on its roof. */}
      <Scene frame={frame} k={4}>
        <Hills
          y={330}
          peaks={[
            [120, 50],
            [680, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={400} y={440} w={560} s={1.1} tone="c" hatch={h.h3} />
        <Fade frame={frame} on={4} off={5} at={3}>
          <House x={470} y={370} s={1.1} tone="b" hatch={h.h3} lit />
        </Fade>
        {/* The two scouts, crouched out of sight on the flat roof. */}
        <Fade frame={frame} on={4} off={5} from="up" at={6}>
          <Person
            x={440}
            y={284}
            s={0.75}
            pose="kneel"
            robe="g"
            head="cloth"
          />
          <Person
            x={500}
            y={284}
            s={0.75}
            pose="kneel"
            face={-1}
            robe="p"
            head="cloth"
          />
        </Fade>
        <Person
          x={360}
          y={370}
          s={1.1}
          face={1}
          robe="p"
          cloak="b"
          head="veil"
        />
        <Ink d="M-10,510V440H810V510Z" tone="g" />
        <Grass
          at={[
            [80, 470],
            [700, 478],
          ]}
        />
      </Scene>

      {/* 5. Shechem: the people before the great stone. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={650} y={96} r={30} gold />
          </Ambient>
        </Fade>
        <Hills
          y={340}
          peaks={[
            [200, 80],
            [520, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V380C240,370 560,372 810,382V510Z" tone="g" />
        {/* The great stone, set up as a witness. */}
        <Ink d="M560,440V300c0,-16 40,-16 40,0V440Z" tone="c" hatch={h.h2} />
        <Joshua x={490} y={448} s={1.7} face={-1} pose="open" />
        <Fade frame={frame} on={5} off={6} from="left" at={5}>
          <Person x={120} y={470} s={1.3} robe="g" cloak="c" head="veil" />
          <Person x={190} y={476} s={1.3} robe="p" head="cloth" />
          <Person x={260} y={470} s={1.3} robe="c" cloak="b" head="cloth" />
          <Person x={330} y={478} s={1} robe="b" child head="bare" />
          <Person x={380} y={472} s={1.3} robe="b" cloak="g" head="veil" />
        </Fade>
        <Ambient frame={frame} on={5} off={6} kind="sway">
          <Wheat x={700} y={470} s={1.1} />
          <Wheat x={740} y={476} s={1.2} />
        </Ambient>
      </Scene>

      {/* 6. Where to start reading. */}
      <Scene frame={frame} k={6}>
        <Sun x={130} y={100} r={24} />
        <Hills
          y={380}
          peaks={[
            [200, 40],
            [520, 20],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <StartReading frame={frame} k={6} hatch={h.h2} />
      </Scene>
    </>
  ),
};

export default film;
