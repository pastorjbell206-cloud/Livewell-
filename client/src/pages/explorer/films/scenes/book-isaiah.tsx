/**
 * "Isaiah: the Holy One who comforts": a film for one whole book, from the
 * book's own page (bible/notes/isaiah/intro.json) and its chapter notes.
 *
 *   0  The Holy One of Israel   the prophet bowed; smoke; light from above
 *   1  How it is laid out       three parts: the city, the road home, a new tree
 *   2  Trust or ruin            a king, an army far off, a prophet pointing up
 *   3  Judgment, and what is left   a stump, and one green shoot
 *   4  The king and the Servant a star over a house in a small town
 *   5  A world made new         nations on the road; a sword made a plough
 *   6  Where to start           the reader and the open scroll
 *
 * God is never drawn: in the vision he is light from beyond the picture's
 * edge. No battle, no ruin and no exile march is drawn; judgment is the
 * felled tree, and the picture's point is the shoot. The Servant is not
 * drawn. The one mustard mark: the light (0), the rule under the road home
 * (1), the sun (2, 5), a star (4), the marker (6); the stump (3) has none.
 */
import {
  CityWall,
  Grass,
  Hills,
  House,
  Ink,
  Olive,
  Person,
  Rays,
  Sheep,
  Stars,
  Sun,
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
 * The chapters in each of the book's three major parts, as the book page
 * names them: 1 to 39 (Judah in the prophet's own day), 40 to 55 (comfort
 * for the exiles and the Servant), and 56 to 66 (the waiting community and
 * the new creation).
 */
export const LAYOUT = [39, 16, 11];

const CAMERA: [number, number, number][] = [
  [400, 300, 1.12],
  [400, 250, 1.06],
  [400, 320, 1.12],
  [400, 330, 1.16],
  [460, 300, 1.14],
  [420, 310, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The vision in the temple. */}
      <FirstScene frame={frame}>
        <Ink d="M-10,400V40H810V400Z" tone="c" hatch={h.hs} />
        <Ink d="M80,400V40H140V400ZM660,400V40H720V400Z" tone="c" />
        <path className="pl-l" d="M70,60H150M650,60H730" />
        <path className="pl-paper" d="M300,0H500L620,260H180Z" />
        <Ambient frame={frame} on={-1} off={1} kind="glow">
          <path className="pl-m" d="M340,0H460L480,34H320Z" />
        </Ambient>
        <Rays x={400} y={30} reach={220} spread={110} n={9} />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        {/* The smoke that filled the house. */}
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={20}>
          <path
            className="pl-f"
            d="M200,400C180,360 230,340 210,300C196,270 230,250 220,220M260,400C246,370 280,350 266,320M560,400C580,360 530,340 550,300C564,270 530,250 540,220M610,400C624,370 590,350 604,320"
          />
        </Ambient>
        <Person x={400} y={474} s={1.8} pose="bow" robe="g" cloak="c" />
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
              <CityWall x={mid} y={top} w={110} s={0.5} />
            ) : i === 1 ? (
              <path
                className="pl-l"
                d={`M${mid - 40},${top}C${mid - 20},${top - 30} ${mid},${top - 6} ${mid + 40},${top - 36}M${mid - 28},${top}C${mid - 10},${top - 22} ${mid + 10},${top} ${mid + 46},${top - 26}`}
              />
            ) : (
              <Olive x={mid} y={top} s={0.7} />
            )
          }
        />
      </Scene>

      {/* 2. Trust or ruin. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={5}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={150} y={90} r={32} gold />
          </Ambient>
        </Fade>
        <Hills
          y={360}
          peaks={[
            [520, 30],
            [720, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        {/* The army he might lean on, far off: spears and helmets only. */}
        <path
          className="pl-f"
          d="M560,330v-40M580,326v-40M600,330v-40M620,326v-40M640,330v-40M660,326v-40M680,330v-40M700,326v-40M720,330v-40"
        />
        <path
          className="pl-k"
          d="M556,330a5,5 0 1,1 8,0ZM576,326a5,5 0 1,1 8,0ZM596,330a5,5 0 1,1 8,0ZM616,326a5,5 0 1,1 8,0ZM636,330a5,5 0 1,1 8,0ZM656,326a5,5 0 1,1 8,0ZM676,330a5,5 0 1,1 8,0ZM696,326a5,5 0 1,1 8,0ZM716,330a5,5 0 1,1 8,0Z"
        />
        <Ink d="M-10,510V390C240,376 560,380 810,390V510Z" tone="c" />
        <Ink d="M440,470V360H470V430H540V470Z" tone="c" />
        <Person
          x={500}
          y={470}
          s={1.6}
          pose="sit"
          robe="b"
          cloak="c"
          head="crown"
        />
        <Person
          x={300}
          y={474}
          s={1.7}
          face={-1}
          pose="reach"
          robe="g"
          cloak="c"
          staff="staff"
        />
      </Scene>

      {/* 3. The stump, and the shoot. */}
      <Scene frame={frame} k={3}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V380H0Z" />
        <Hills y={380} peaks={[[400, 60]]} tone="c" hatch={h.hs} />
        <Ink d="M-10,510V420C240,400 560,404 810,420V510Z" tone="c" />
        {/* The felled trunk, lying. */}
        <Ink d="M470,410L720,372L728,404L478,440Z" tone="c" hatch={h.h1} />
        {/* The stump. */}
        <Ink
          d="M320,440C330,400 336,370 336,340H440C440,370 446,400 460,440Z"
          tone="c"
        />
        <path className="pl-l" d="M336,340C350,326 426,326 440,340" />
        <path
          className="pl-f"
          d="M356,340C366,334 410,334 420,340M300,440h30M450,440h34"
        />
        {/* The shoot. */}
        <Fade frame={frame} on={3} off={4} from="grow" at={6}>
          <path className="pl-l" d="M388,336C386,300 392,270 400,240" />
          <path
            className="pl-g"
            d="M400,240c-18,-6 -28,6 -24,22c14,2 24,-6 24,-22ZM398,270c18,-10 32,0 30,16c-16,4 -28,-2 -30,-16ZM392,300c-16,-4 -26,6 -22,20c12,2 22,-6 22,-20Z"
          />
          <path
            className="pl-f"
            d="M400,240c-18,-6 -28,6 -24,22c14,2 24,-6 24,-22ZM398,270c18,-10 32,0 30,16c-16,4 -28,-2 -30,-16ZM392,300c-16,-4 -26,6 -22,20c12,2 22,-6 22,-20Z"
          />
        </Fade>
        <Grass
          at={[
            [160, 450],
            [640, 460],
          ]}
        />
      </Scene>

      {/* 4. The one who is coming. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V380H0Z" />
        <Ambient frame={frame} on={4} off={5} kind="twinkle">
          <Stars
            at={[
              [80, 80, 4],
              [190, 150, 3],
              [300, 70, 3],
              [430, 130, 4],
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
        <House x={610} y={380} s={1.0} hatch={h.h3} />
        <House x={700} y={390} s={0.7} tone="b" hatch={h.h3} />
        <House x={530} y={392} s={0.6} tone="g" hatch={h.h3} />
        <Fade frame={frame} on={4} off={5} from="grow" at={5}>
          <GoldStar x={610} y={170} r={12} />
          <path
            className="pl-f"
            d="M610,196V270M598,198L590,256M622,198L630,256"
          />
        </Fade>
        <Ink
          d="M-10,510V410C240,396 560,400 810,410V510Z"
          tone="b"
          hatch={h.hs}
        />
        <Person x={230} y={470} s={1.6} robe="c" cloak="g" staff="crook" />
        <Person x={320} y={474} s={1.5} robe="g" head="veil" />
        <Person x={384} y={480} s={1.0} robe="b" child head="bare" />
        <Sheep x={130} y={480} s={1.3} />
      </Scene>

      {/* 5. Swords into ploughs; the nations on the road. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={560} y={100} r={36} gold />
          </Ambient>
        </Fade>
        <Hills y={370} peaks={[[560, 120]]} tone="g" hatch={h.hs} />
        <CityWall x={560} y={254} w={220} s={0.9} />
        <Ink d="M-10,510V400C240,384 560,392 810,380V510Z" tone="c" />
        <path
          className="pl-f"
          d="M200,500C340,460 480,380 546,256M280,500C400,470 520,390 574,256"
        />
        {/* The anvil, and the sword becoming a plough blade. */}
        <Ink d="M90,470V440H70V424H190V440H170V470Z" tone="b" />
        <path className="pl-o" d="M96,424L150,400L190,404L176,424Z" />
        <Person
          x={250}
          y={474}
          s={1.6}
          face={-1}
          pose="reach"
          robe="c"
          head="bare"
        />
        <path className="pl-l" d="M196,366L178,392" />
        <Ink d="M168,386h22v14h-22Z" tone="b" />
        <Fade frame={frame} on={5} off={6} from="walk-left" at={4}>
          <Person x={380} y={452} s={1.2} pose="walk" robe="b" cloak="g" />
          <Person x={440} y={420} s={1.0} pose="walk" robe="g" head="veil" />
          <Person
            x={330}
            y={482}
            s={1.3}
            pose="walk"
            robe="p"
            cloak="c"
            bundle
          />
          <Person x={486} y={380} s={0.8} pose="walk" robe="c" />
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
