/**
 * "Genesis: the book of beginnings": a film for one whole book, from the
 * book's own page (bible/notes/genesis/intro.json) and its chapter notes.
 *
 *   0  The book of beginnings   an open scroll; a garden, a river, a sunrise
 *   1  How it is laid out       four panels: the world; Abraham, Jacob, Joseph
 *   2  God's image              a man and a woman in the garden, hands open
 *   3  What went wrong          hiding among the trees; a light comes looking
 *   4  The promise              Abram and Sarai under the stars
 *   5  A faithful God           Joseph and the brothers who sold him
 *   6  Where to start           the reader and the open scroll
 *
 * God is never drawn: in the garden he is a path of light (3). The one
 * mustard mark: the sun (0, 2), the rule under the hinge (1), the light (3),
 * one star (4), Joseph's chain (5), the marker (6).
 */
import {
  Cloud,
  Grass,
  Hills,
  Ink,
  Jar,
  Olive,
  Palm,
  Person,
  Stars,
  Sun,
  Tent,
  Water,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import {
  FirstScene,
  GoldStar,
  Layout,
  Scene,
  StartReading,
} from "./book-parts";

/**
 * The chapters in each part of the second picture: 1 to 11 (the whole
 * world), then one family: Abraham (12 to 25), Jacob (26 to 36), Joseph and
 * his brothers (37 to 50).
 */
export const LAYOUT = [11, 14, 11, 14];

const CAMERA: [number, number, number][] = [
  [400, 280, 1.1],
  [400, 250, 1.06],
  [400, 320, 1.14],
  [360, 320, 1.14],
  [360, 300, 1.14],
  [400, 320, 1.14],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The book, and where it begins. */}
      <FirstScene frame={frame}>
        <Fade frame={frame} on={0} off={1} from="up" at={3}>
          <Ambient frame={frame} on={0} off={1} kind="glow">
            <Sun x={560} y={130} r={30} gold />
          </Ambient>
        </Fade>
        <Fade frame={frame} on={-1} off={0}>
          <Sun x={560} y={130} r={30} gold />
        </Fade>
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={40}>
          <Cloud x={200} y={90} s={1.1} />
        </Ambient>
        <Hills
          y={250}
          peaks={[
            [240, 50],
            [600, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Olive x={250} y={236} s={1.5} hatch={h.h2} />
        <Palm x={130} y={250} s={0.9} />
        <Ink d="M380,220C420,250 470,270 560,290H420C400,270 380,250 360,226Z" tone="b" />
        <Water x={400} y={262} w={150} rows={2} gap={12} />
        {/* The table, and the scroll open on it. */}
        <Ink d="M-10,510V330H810V510Z" tone="c" hatch={h.hs} />
        <Ink d="M170,440V340H630V440Z" />
        <Ink d="M150,330h22v120h-22ZM628,330h22v120h-22Z" tone="c" />
        <path className="pl-l" d="M144,330h34M144,450h34M622,330h34M622,450h34M400,340V440" />
        <path
          className="pl-f"
          d="M196,362h180M196,380h180M196,398h180M196,416h130M424,362h180M424,380h180M424,398h180M424,416h110"
        />
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={1}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <>
                <Ink
                  d={`M${mid - 24},${top - 24}a24,24 0 1,0 48,0a24,24 0 1,0 -48,0Z`}
                  tone="b"
                />
                <path
                  className="pl-g"
                  d={`M${mid - 14},${top - 36}c10,-6 22,2 16,12c-8,8 -20,2 -16,-12ZM${mid},${top - 14}c8,-2 14,4 8,10c-6,2 -12,-4 -8,-10Z`}
                />
              </>
            ) : i === 1 ? (
              <Tent x={mid} y={top} s={0.55} />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 12},${top}L${mid - 4},${top - 56}M${mid + 12},${top}L${mid + 4},${top - 56}M${mid - 10},${top - 12}h20M${mid - 8},${top - 26}h16M${mid - 6},${top - 40}h12`}
              />
            ) : (
              <>
                <Wheat x={mid - 10} y={top} s={0.9} />
                <Wheat x={mid + 10} y={top} s={0.9} />
              </>
            )
          }
        />
      </Scene>

      {/* 2. Made in God's image. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={5}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={400} y={90} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={360}
          peaks={[
            [180, 50],
            [640, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ambient frame={frame} on={2} off={3} kind="sway">
          <Olive x={130} y={380} s={2.2} hatch={h.h2} />
          <Palm x={700} y={390} s={1.6} face={-1} />
        </Ambient>
        <Ink d="M-10,510V390C240,372 560,378 810,390V510Z" tone="g" />
        <Ink
          d="M560,390C600,420 640,460 700,510H560C540,470 520,430 500,392Z"
          tone="b"
        />
        <Water x={540} y={430} w={130} rows={3} gap={18} />
        <Person x={340} y={470} s={1.8} pose="open" robe="c" head="bare" />
        <Person x={460} y={470} s={1.7} pose="open" robe="b" head="veil" />
        <Grass
          at={[
            [230, 440],
            [420, 490],
            [760, 440],
          ]}
        />
      </Scene>

      {/* 3. Hiding; and God comes looking. */}
      <Scene frame={frame} k={3}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V380H0Z" />
        <Hills
          y={370}
          peaks={[
            [200, 30],
            [640, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V390C240,372 560,378 810,390V510Z" tone="g" hatch={h.hs} />
        {/* The light, coming through the garden. */}
        <Fade frame={frame} on={3} off={4} from="left" at={5}>
          <path className="pl-paper" d="M0,360L330,430V480L0,480Z" />
          <path className="pl-f" d="M0,360L330,430M0,480H330" />
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <path className="pl-m" d="M22,420a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z" />
            <path className="pl-l" d="M22,420a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z" />
          </Ambient>
        </Fade>
        {/* The two who hide, behind the trees. */}
        <Person x={560} y={476} s={1.5} pose="kneel" face={-1} robe="c" head="bare" />
        <Person x={650} y={480} s={1.4} pose="kneel" face={-1} robe="b" head="veil" />
        <Ambient frame={frame} on={3} off={4} kind="sway">
          <Olive x={470} y={480} s={2.6} hatch={h.h2} />
          <Olive x={740} y={470} s={2.2} hatch={h.h2} />
        </Ambient>
      </Scene>

      {/* 4. The promise, under the stars. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V380H0Z" />
        <Ambient frame={frame} on={4} off={5} kind="twinkle">
          <Stars
            at={[
              [80, 70, 4],
              [160, 150, 3],
              [250, 60, 3],
              [340, 140, 4],
              [430, 50, 3],
              [510, 150, 3],
              [600, 70, 4],
              [690, 140, 3],
              [750, 60, 3],
              [120, 240, 3],
              [470, 240, 3],
              [660, 250, 3],
              [560, 110, 3],
              [300, 230, 3],
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
        <Tent x={590} y={440} s={1.7} hatch={h.h3} />
        <Person
          x={280}
          y={466}
          s={1.7}
          face={-1}
          robe="c"
          cloak="g"
          staff="staff"
        />
        <Person x={380} y={470} s={1.6} face={-1} robe="b" head="veil" />
        <Fade frame={frame} on={4} off={5} from="grow" at={6}>
          <GoldStar x={200} y={110} r={10} />
        </Fade>
      </Scene>

      {/* 5. Joseph and his brothers. */}
      <Scene frame={frame} k={5}>
        <Ink d="M-10,400V80H810V400Z" tone="c" hatch={h.hs} />
        <Ink d="M90,400V60H140V400ZM660,400V60H710V400Z" tone="c" />
        <path className="pl-l" d="M80,60H150M650,60H720M80,74H150M650,74H720" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        {/* The grain he stored. */}
        <Ink d="M170,400C160,360 180,330 200,330C222,330 240,360 230,400Z" tone="g" />
        <Ink d="M226,400C218,366 236,340 254,340C274,340 290,366 282,400Z" tone="c" />
        <path className="pl-f" d="M190,336l10,-10l10,10M244,346l10,-10l10,10" />
        <Jar x={130} y={470} s={1.2} />
        <Person x={330} y={470} s={1.8} pose="open" robe="p" cloak="b" head="bare" />
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <path
            className="pl-m"
            d="M312,334C318,350 342,350 348,334L343,333C338,343 322,343 317,333Z"
          />
          <path
            className="pl-f"
            d="M312,334C318,350 342,350 348,334L343,333C338,343 322,343 317,333Z"
          />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="right" at={6}>
          <Person x={490} y={474} s={1.4} pose="kneel" face={-1} robe="g" cloak="c" />
          <Person x={570} y={480} s={1.4} pose="bow" face={-1} robe="c" />
          <Person x={650} y={470} s={1.4} pose="kneel" face={-1} robe="b" cloak="g" />
          <Person x={730} y={482} s={1.4} pose="bow" face={-1} robe="g" />
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
