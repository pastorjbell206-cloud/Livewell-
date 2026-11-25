/**
 * "Exodus: out of slavery, to God": a film for one whole book, from the
 * book's own page (bible/notes/exodus/intro.json) and its chapter notes.
 *
 *   0  The book of the rescue     slaves under loads of brick
 *   1  How it is laid out         out of Egypt; at the mountain
 *   2  The name of God            the bush that burns and is not burned up
 *   3  The Passover and the sea   the far shore, and Miriam's song
 *   4  A law for rescued people   the mountain, the people, two tablets
 *   5  God comes to live there    the tent, the cloud, the glory
 *   6  Where to start             the reader and the open scroll
 *
 * God is never drawn: he is the flame in the bush, the cloud on the
 * mountain and the light in the tent. The death of the firstborn is told in
 * the caption as "The Exodus: out of Egypt" tells it, and is not drawn; no
 * drowned army is drawn either. The one mustard mark: the sun (0, 3), the
 * rule under the mountain (1), the flame (2), the light in the tent (5),
 * the marker (6); the mountain (4) has none.
 */
import {
  Cloud,
  Donkey,
  Hills,
  Ink,
  Jar,
  Mountain,
  Person,
  Sun,
  Tent,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The chapters in each part of the second picture, the book page's
 * structure rounded to whole chapters: out of Egypt (1 to 15), through the
 * wilderness (16 to 18), the covenant at Sinai (19 to 24), the plan for the
 * tabernacle (25 to 31), the golden calf and the covenant renewed (32 to
 * 34), and the tabernacle built and filled (35 to 40).
 */
export const LAYOUT = [15, 3, 6, 7, 3, 6];

const CAMERA: [number, number, number][] = [
  [400, 320, 1.12],
  [400, 250, 1.06],
  [420, 320, 1.14],
  [440, 330, 1.12],
  [400, 280, 1.12],
  [400, 320, 1.14],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Slaves in Egypt. */}
      <FirstScene frame={frame}>
        <Sun x={650} y={90} r={30} gold />
        {/* The wall they are made to build. */}
        <Ink d="M-10,400V170H430V230H520V400Z" tone="c" hatch={h.hs} />
        <path
          className="pl-f"
          d="M0,210H430M0,250H520M0,290H520M0,330H520M0,370H520M80,170V210M200,210V250M320,170V210M120,250V290M260,290V330M400,250V290M60,330V370M340,330V370M460,290V330"
        />
        <Ink d="M-10,510V400H810V510Z" tone="c" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Ink d="M560,400l8,-22h44l8,22ZM610,400l6,-16h34l6,16Z" tone="c" />
        <Person
          x={190}
          y={472}
          s={1.5}
          pose="walk"
          robe="g"
          head="bare"
          bundle
        />
        <Person
          x={330}
          y={478}
          s={1.5}
          pose="walk"
          robe="b"
          head="bare"
          bundle
        />
        <Fade frame={frame} on={-1} off={1} from="left" at={4}>
          <Person x={470} y={476} s={1.5} pose="bow" robe="c" head="bare" />
          <Person
            x={90}
            y={480}
            s={1.5}
            pose="walk"
            robe="p"
            head="bare"
            bundle
          />
        </Fade>
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
              <Water x={mid - 34} y={top - 26} w={90} rows={2} gap={12} />
            ) : i === 1 ? (
              <Jar x={mid} y={top} s={0.7} />
            ) : i === 2 ? (
              <Mountain x={mid} y={top} w={70} h={50} />
            ) : i === 3 ? (
              <path
                className="pl-l"
                d={`M${mid - 22},${top}v-30h44v30ZM${mid - 22},${top - 15}h6M${mid - 6},${top - 30}v6M${mid + 10},${top - 30}v6`}
              />
            ) : i === 4 ? (
              <path
                className="pl-l"
                d={`M${mid - 14},${top}v-26c0,-10 12,-10 12,0l-6,10l6,6v10ZM${mid + 4},${top}v-10l-6,-6l6,-10c0,-10 12,-10 12,0v26Z`}
              />
            ) : (
              <Tent x={mid} y={top} s={0.5} />
            )
          }
        />
      </Scene>

      {/* 2. The bush that burns and is not burned up. */}
      <Scene frame={frame} k={2}>
        <Sun x={110} y={90} r={22} />
        <Mountain x={640} y={380} w={360} h={250} tone="c" hatch={h.h1} />
        <Hills
          y={380}
          peaks={[
            [180, 30],
            [460, 16],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Ink d="M-10,510V400C240,388 560,392 810,400V510Z" tone="c" />
        {/* The bush. */}
        <path
          className="pl-l"
          d="M520,470V420M520,440L496,410M520,436L546,408M520,420V392"
        />
        <Ink
          d="M470,420C460,390 480,366 500,372C506,350 540,350 546,374C568,370 582,396 570,420Z"
          tone="g"
        />
        <Fade frame={frame} on={2} off={3} from="grow" at={2}>
          <Ambient frame={frame} on={2} off={3} kind="flicker">
            <path
              className="pl-m"
              d="M520,372C540,344 548,320 536,290C514,312 502,344 520,372ZM490,380C500,362 502,348 496,332C484,346 480,364 490,380ZM552,380C562,362 564,348 558,332C546,346 542,364 552,380Z"
            />
            <path
              className="pl-f"
              d="M520,372C540,344 548,320 536,290C514,312 502,344 520,372ZM490,380C500,362 502,348 496,332C484,346 480,364 490,380ZM552,380C562,362 564,348 558,332C546,346 542,364 552,380Z"
            />
          </Ambient>
        </Fade>
        <Person x={300} y={470} s={1.8} robe="c" cloak="g" staff="crook" />
        {/* His sandals, taken off. */}
        <path className="pl-k" d="M214,470h22v6h-22ZM224,482h22v6h-22Z" />
      </Scene>

      {/* 3. The far side of the sea, and the song. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} from="up" at={3}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={150} y={150} r={38} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,400V200H810V400Z" tone="b" />
        <Ambient frame={frame} on={3} off={4} kind="bob">
          <Water x={10} y={230} w={790} rows={6} gap={26} />
        </Ambient>
        <Ink
          d="M-10,510V400C200,360 520,372 810,350V510Z"
          tone="c"
          hatch={h.hs}
        />
        <Person x={330} y={468} s={1.6} pose="reach" robe="b" head="veil" />
        <path
          className="pl-o"
          d="M374,352a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z"
        />
        <path className="pl-f" d="M380,352h20M390,342v20" />
        <Fade frame={frame} on={3} off={4} from="right" at={4}>
          <Person x={460} y={462} s={1.5} pose="pray" robe="g" cloak="c" />
          <Person x={540} y={474} s={1.5} pose="pray" robe="c" head="veil" />
          <Person
            x={610}
            y={468}
            s={1.0}
            pose="pray"
            robe="b"
            child
            head="bare"
          />
          <Person
            x={690}
            y={470}
            s={1.5}
            pose="open"
            robe="p"
            cloak="b"
            bundle
          />
          <Donkey x={760} y={452} s={1.1} face={-1} />
        </Fade>
        <Person x={200} y={470} s={1.6} robe="c" cloak="g" staff="staff" />
      </Scene>

      {/* 4. Sinai: the law, given to people already rescued. */}
      <Scene frame={frame} k={4}>
        <Mountain x={400} y={380} w={560} h={330} tone="b" hatch={h.h1} />
        <Ambient frame={frame} on={4} off={5} kind="drift" dx={20}>
          <Cloud x={380} y={96} s={2.2} />
          <Cloud x={470} y={120} s={1.6} />
        </Ambient>
        <Ink
          d="M-10,510V380C240,372 560,376 810,380V510Z"
          tone="c"
          hatch={h.hs}
        />
        {/* The people, at the foot of the mountain. */}
        <Person x={90} y={440} s={0.9} robe="g" />
        <Person x={140} y={452} s={0.9} robe="b" head="veil" />
        <Person x={194} y={440} s={0.9} robe="c" cloak="g" />
        <Person x={610} y={440} s={0.9} face={-1} robe="b" cloak="c" />
        <Person x={664} y={452} s={0.9} face={-1} robe="c" head="veil" />
        <Person x={716} y={440} s={0.9} face={-1} robe="g" />
        <Person x={642} y={470} s={0.6} face={-1} robe="p" child head="bare" />
        {/* The two tablets. */}
        <Fade frame={frame} on={4} off={5} from="up" at={5}>
          <Ink d="M340,480V400C340,380 392,380 392,400V480Z" />
          <Ink d="M408,480V400C408,380 460,380 460,400V480Z" />
          <path
            className="pl-f"
            d="M350,410h32M350,424h32M350,438h32M350,452h32M350,466h32M418,410h32M418,424h32M418,438h32M418,452h32M418,466h32"
          />
        </Fade>
      </Scene>

      {/* 5. The glory fills the tent. */}
      <Scene frame={frame} k={5}>
        <Sun x={690} y={80} r={20} />
        <Hills
          y={380}
          peaks={[
            [160, 40],
            [660, 30],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Tent x={90} y={420} s={0.8} tone="b" hatch={h.h3} />
        <Tent x={230} y={410} s={0.7} tone="b" hatch={h.h3} />
        <Tent x={600} y={410} s={0.7} tone="b" hatch={h.h3} />
        <Tent x={720} y={424} s={0.8} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V420C240,408 560,412 810,420V510Z" tone="c" />
        <Tent x={410} y={476} s={2.3} />
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path className="pl-m" d="M382,476L400,389H447L465,476Z" />
          </Ambient>
          <path className="pl-l" d="M382,476L400,389H447L465,476" />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="down" at={2}>
          <Cloud x={410} y={300} s={2.6} />
        </Fade>
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
