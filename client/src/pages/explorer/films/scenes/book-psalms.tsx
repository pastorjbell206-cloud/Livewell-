/**
 * "Psalms: the prayer book of the Bible": a film for one whole book, from
 * the book's own page (bible/notes/psalms/intro.json) and its chapter notes.
 *
 *   0  The prayer book of the Bible   a singer with a harp; hands lifted
 *   1  How it is laid out             a gate, five books, a last Hallelujah
 *   2  Honest prayer                  one person alone at night; a far dawn
 *   3  Praise                         a road up to God's house; harp, trumpet
 *   4  The king                       a crown in the dust; the sun rising
 *   5  The prayers of Jesus           Jesus praying under the olive trees
 *   6  Where to start                 the reader and the open scroll
 *
 * God is never drawn. Jesus is one plain figure, as in the other films, and
 * the cross is not drawn here: the picture is of him praying. The one
 * mustard mark: the sun (0, 3, 4), the rule under the gateway (1), the dawn
 * (2), a lamp's flame (5), the marker (6).
 */
import {
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Olive,
  Person,
  Stars,
  Sun,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The psalms in each part of the second picture, as the book page's own
 * structure divides them: the gateway (1 and 2), Book One (3 to 41), Book
 * Two (42 to 72), Book Three (73 to 89), Book Four (90 to 106), Book Five
 * (107 to 145), and the final Hallelujah (146 to 150).
 */
export const LAYOUT = [2, 39, 31, 17, 17, 39, 5];

/** A small harp, placed by its foot. */
const Harp = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d="M-14,0C-18,-22 -12,-44 8,-52L12,-46C-2,-40 -8,-22 -6,0Z" tone="c" />
    <path className="pl-l" d="M-10,0H16M10,-48L14,0" />
    <path
      className="pl-f"
      d="M-8,-10L13,-12M-8,-20L12,-24M-6,-30L12,-36M-2,-38L11,-44"
    />
  </g>
);

/** A small trumpet, mouth to the right. */
const Trumpet = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d="M-22,-3H10L24,-12V12L10,3H-22Z" tone="c" />
  </g>
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.14],
  [400, 250, 1.06],
  [380, 300, 1.14],
  [440, 300, 1.12],
  [400, 300, 1.12],
  [400, 330, 1.16],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The prayer book and song book of the Bible. */}
      <FirstScene frame={frame}>
        <Sun x={640} y={100} r={30} gold />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={40}>
          <Cloud x={380} y={80} s={1.1} />
        </Ambient>
        <Hills
          y={380}
          peaks={[
            [240, 40],
            [620, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ambient frame={frame} on={-1} off={1} kind="sway">
          <Olive x={170} y={410} s={2.6} hatch={h.h2} />
        </Ambient>
        <Ink d="M-10,510V400C240,384 560,390 810,400V510Z" tone="g" />
        <Person x={280} y={472} s={1.7} pose="sit" robe="b" cloak="c" />
        <Harp x={346} y={470} s={1.5} />
        <Fade frame={frame} on={-1} off={1} from="right" at={4}>
          <Person
            x={480}
            y={470}
            s={1.5}
            pose="pray"
            face={-1}
            robe="g"
            head="veil"
          />
          <Person
            x={570}
            y={478}
            s={1.5}
            pose="pray"
            face={-1}
            robe="c"
            cloak="b"
          />
          <Person
            x={650}
            y={470}
            s={1.0}
            pose="pray"
            face={-1}
            robe="b"
            child
            head="bare"
          />
          <Person
            x={720}
            y={480}
            s={1.5}
            pose="open"
            face={-1}
            robe="p"
            cloak="g"
          />
        </Fade>
        <Grass
          at={[
            [420, 480],
            [60, 440],
          ]}
        />
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={0}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <path
                className="pl-l"
                d={`M${mid - 12},${top}V${top - 30}C${mid - 12},${top - 48} ${mid + 12},${top - 48} ${mid + 12},${top - 30}V${top}`}
              />
            ) : i === 6 ? (
              <Trumpet x={mid} y={top - 18} s={0.8} />
            ) : (
              // Books One to Five: one stroke for each.
              <path
                className="pl-l"
                d={Array.from(
                  { length: i },
                  (_, n) => `M${mid - (i - 1) * 5 + n * 10},${top}v-28`
                ).join("")}
              />
            )
          }
        />
      </Scene>

      {/* 2. Lament: honest prayer in the dark. */}
      <Scene frame={frame} k={2}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V330H0Z" />
        <Ambient frame={frame} on={2} off={3} kind="twinkle">
          <Stars
            at={[
              [90, 70, 4],
              [210, 140, 3],
              [330, 60, 3],
              [470, 120, 4],
              [600, 60, 3],
              [720, 130, 3],
              [150, 230, 3],
              [560, 220, 3],
            ]}
          />
        </Ambient>
        <Fade frame={frame} on={2} off={3} at={9}>
          <path
            className="pl-m"
            d="M420,326C540,316 680,318 800,328V336C680,326 540,324 420,334Z"
          />
        </Fade>
        <Hills
          y={340}
          peaks={[
            [520, 10],
            [700, 22],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink
          d="M-10,510V390C120,340 320,330 440,380C520,412 600,450 680,510Z"
          tone="b"
          hatch={h.h2}
        />
        <Person x={300} y={372} s={1.7} pose="bow" robe="c" cloak="g" />
      </Scene>

      {/* 3. Praise: going up to the house of God. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={150} y={100} r={34} gold />
          </Ambient>
        </Fade>
        <Hills y={380} peaks={[[600, 130]]} tone="g" hatch={h.hs} />
        <House x={610} y={252} s={1.4} hatch={h.h3} />
        <Ink d="M-10,510V400C240,384 560,392 810,380V510Z" tone="c" />
        <path
          className="pl-f"
          d="M0,470C240,450 460,400 580,256M80,500C320,470 520,410 620,256"
        />
        <Fade frame={frame} on={3} off={4} from="walk-left" at={2}>
          <Person x={420} y={440} s={1.3} pose="pray" robe="p" cloak="b" />
          <Person x={330} y={462} s={1.4} pose="hold" robe="g" cloak="c" />
          <Harp x={372} y={420} s={0.9} />
          <Person x={236} y={474} s={1.4} pose="reach" robe="b" head="veil" />
          <Trumpet x={300} y={382} s={0.9} />
          <Person
            x={150}
            y={480}
            s={1.0}
            pose="pray"
            robe="c"
            child
            head="bare"
          />
          <Person x={70} y={476} s={1.4} pose="pray" robe="c" cloak="g" />
        </Fade>
      </Scene>

      {/* 4. The crown in the dust; the LORD reigns. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} from="up" at={7}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={400} y={250} r={70} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [200, 40],
            [600, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink
          d="M-10,510V390C240,372 560,378 810,390V510Z"
          tone="c"
          hatch={h.hs}
        />
        {/* The empty seat. */}
        <Ink d="M500,460V330H520V400H600V460Z" tone="c" />
        <path className="pl-l" d="M494,460H606M494,330H526" />
        {/* The crown, fallen. */}
        <g transform="translate(290 452) rotate(-24)">
          <Ink d="M-34,0V-34L-17,-16L0,-38L17,-16L34,-34V0Z" />
          <path className="pl-f" d="M-34,-8H34" />
        </g>
        <path className="pl-f" d="M240,470h100M256,480h60" />
      </Scene>

      {/* 5. Jesus prays the psalms. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V380H0Z" />
        <Ambient frame={frame} on={5} off={6} kind="twinkle">
          <Stars
            at={[
              [300, 60, 3],
              [420, 110, 4],
              [520, 50, 3],
            ]}
          />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [300, 20],
            [640, 30],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ambient frame={frame} on={5} off={6} kind="sway">
          <Olive x={130} y={440} s={2.8} hatch={h.h2} />
          <Olive x={690} y={430} s={2.6} hatch={h.h2} />
        </Ambient>
        <Ink
          d="M-10,510V420C240,404 560,410 810,420V510Z"
          tone="g"
          hatch={h.hs}
        />
        <Person x={390} y={478} s={1.8} pose="kneel" robe="p" cloak="b" />
        <Fade frame={frame} on={5} off={6} from="grow" at={3}>
          <Ambient frame={frame} on={5} off={6} kind="flicker">
            <Lamp x={500} y={482} s={1.4} gold />
          </Ambient>
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
