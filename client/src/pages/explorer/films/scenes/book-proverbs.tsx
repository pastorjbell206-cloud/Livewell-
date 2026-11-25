/**
 * "Proverbs: skill for ordinary days": a film for one whole book, from the
 * book's own page (bible/notes/proverbs/intro.json) and its chapter notes.
 *
 *   0  Skill for ordinary days   a father teaching his son at the door
 *   1  How it is laid out        a collection of collections
 *   2  Two ways                  a road that divides
 *   3  Wisdom's call             a woman calling in the street
 *   4  Words                     two neighbours at a wall
 *   5  Work, money, the poor     bread given at the gate; grain carried in
 *   6  Where to start            the reader and the open scroll
 *
 * God is never drawn. Wisdom is drawn as the book pictures her, a woman who
 * calls in the street. The one mustard mark: the sun (0, 5), the rule under
 * the father's teaching (1), the dawn (2), a lamp's flame (3), the marker
 * (6); the two neighbours (4) have none.
 */
import {
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Sun,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The chapters in each part of the second picture, the book page's
 * structure rounded to whole chapters: a father's instruction and Wisdom's
 * call (1 to 9), the proverbs of Solomon (10 to 22), the words of the wise
 * (23 and 24), the proverbs copied by Hezekiah's men (25 to 29), and the
 * words of Agur and Lemuel with the woman of noble character (30 and 31).
 */
export const LAYOUT = [9, 13, 2, 5, 2];

/** A small crown, for a collection that bears a king's name. */
const Crown = ({ x, y }: { x: number; y: number }) => (
  <Ink d={`M${x - 16},${y}v-20l8,10l8,-14l8,14l8,-10v20Z`} />
);

const CAMERA: [number, number, number][] = [
  [380, 320, 1.14],
  [400, 250, 1.06],
  [400, 300, 1.12],
  [380, 320, 1.14],
  [400, 330, 1.14],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A father's instruction. */}
      <FirstScene frame={frame}>
        <Sun x={650} y={90} r={30} gold />
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={40}>
          <Cloud x={420} y={80} s={1.1} />
        </Ambient>
        <Hills
          y={380}
          peaks={[
            [520, 30],
            [720, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <House x={640} y={370} s={0.8} tone="b" hatch={h.h3} />
        <House x={730} y={380} s={0.65} hatch={h.h3} />
        <House x={170} y={430} s={2.4} hatch={h.h3} />
        <Ink d="M-10,510V430H810V510Z" tone="c" />
        <path className="pl-f" d="M0,466H800" />
        <Person x={400} y={478} s={1.7} pose="sit" robe="c" cloak="g" />
        <Fade frame={frame} on={-1} off={1} from="right" at={3}>
          <Person
            x={520}
            y={482}
            s={1.3}
            pose="sit"
            face={-1}
            robe="b"
            child
            head="bare"
          />
        </Fade>
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
              <House x={mid} y={top} s={0.42} />
            ) : i === 1 || i === 3 ? (
              <Crown x={mid} y={top} />
            ) : i === 2 ? (
              <Lamp x={mid} y={top} s={0.9} />
            ) : (
              <path
                className="pl-l"
                d={`M${mid},${top}v-36M${mid - 8},${top - 26}c0,-10 16,-10 16,0c0,12 -16,12 -16,0ZM${mid - 6},${top}h12`}
              />
            )
          }
        />
      </Scene>

      {/* 2. Two ways. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} from="up" at={5}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <path className="pl-m" d="M560,220a46,46 0 0,1 92,0Z" />
            <path className="pl-l" d="M560,220a46,46 0 0,1 92,0" />
          </Ambient>
          <path
            className="pl-f"
            d="M606,160V130M560,180L540,158M652,180L672,158"
          />
        </Fade>
        <Hills y={300} w={800} peaks={[[600, 80]]} tone="g" hatch={h.hs} />
        {/* The dark way, down between the rocks. */}
        <Ink
          d="M-10,510V240C60,220 140,250 180,320C200,380 210,450 230,510Z"
          tone="b"
          hatch={h.h3}
        />
        <Ink
          d="M150,510C150,440 190,390 250,380C280,430 300,470 320,510Z"
          tone="b"
          hatch={h.h3}
        />
        <Ink d="M300,510V420C460,400 640,404 810,410V510Z" tone="g" />
        {/* The road, and where it divides. */}
        <path
          className="pl-l"
          d="M380,500C400,470 420,450 440,430C500,400 560,330 600,224M440,500C450,474 466,452 482,436C540,410 600,340 620,224M380,500C340,470 290,450 230,446M440,500C380,480 320,462 240,470"
        />
        <Person
          x={450}
          y={476}
          s={1.5}
          pose="walk"
          robe="c"
          cloak="b"
          staff="staff"
        />
      </Scene>

      {/* 3. Wisdom calls in the street. */}
      <Scene frame={frame} k={3}>
        {/* Her house, with its seven pillars. */}
        <Ink d="M40,400V150H330V400Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M30,150H340M30,136H340" />
        <path
          className="pl-o"
          d="M60,400V160h14v240ZM100,400V160h14v240ZM140,400V160h14v240ZM178,400V160h14v240ZM216,400V160h14v240ZM256,400V160h14v240ZM296,400V160h14v240Z"
        />
        <Fade frame={frame} on={3} off={4} from="grow" at={6}>
          <Ambient frame={frame} on={3} off={4} kind="flicker">
            <Lamp x={186} y={398} s={1.6} gold />
          </Ambient>
        </Fade>
        <House x={640} y={400} s={1.5} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V400H810V510Z" tone="c" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Ink d="M330,430h110v40h-110Z" />
        <Person
          x={386}
          y={430}
          s={1.6}
          pose="open"
          robe="g"
          cloak="b"
          head="veil"
        />
        <Fade frame={frame} on={3} off={4} from="right" at={3}>
          <Person x={540} y={478} s={1.4} face={-1} robe="c" cloak="g" />
          <Person x={620} y={484} s={1.4} face={-1} robe="b" head="bare" />
          <Person x={700} y={478} s={1.0} face={-1} robe="p" child />
          <Person x={760} y={486} s={1.4} face={-1} robe="g" bundle />
        </Fade>
      </Scene>

      {/* 4. Words: a gentle answer. */}
      <Scene frame={frame} k={4}>
        <Sun x={690} y={80} r={22} />
        <Hills
          y={370}
          peaks={[
            [200, 40],
            [620, 30],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <House x={110} y={380} s={1.2} hatch={h.h3} />
        <House x={700} y={380} s={1.2} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V400H810V510Z" tone="g" />
        {/* The wall between them. */}
        <Ink d="M370,470V400H430V470Z" tone="c" hatch={h.hs} />
        <path
          className="pl-f"
          d="M370,424H430M370,448H430M400,400V424M388,424V448M412,448V470"
        />
        <Person x={290} y={474} s={1.7} pose="reach" robe="c" cloak="b" />
        <path
          className="pl-f"
          d="M352,330l14,-10M356,344l18,-4M350,318l8,-14"
        />
        <Person
          x={520}
          y={474}
          s={1.7}
          pose="open"
          face={-1}
          robe="g"
          head="veil"
        />
        <Grass
          at={[
            [200, 470],
            [620, 480],
          ]}
        />
      </Scene>

      {/* 5. Work, money and the poor. */}
      <Scene frame={frame} k={5}>
        <Sun x={140} y={90} r={30} gold />
        <Hills
          y={380}
          peaks={[
            [200, 30],
            [460, 20],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ambient frame={frame} on={5} off={6} kind="sway">
          <Wheat x={60} y={420} s={1.3} />
          <Wheat x={120} y={426} s={1.2} />
          <Wheat x={180} y={420} s={1.3} />
        </Ambient>
        {/* The gate of the town. */}
        <Ink d="M560,420V160H810V420Z" tone="c" hatch={h.hs} />
        <path
          className="pl-paper"
          d="M620,420V280C620,236 720,236 720,280V420Z"
        />
        <path
          className="pl-l"
          d="M620,420V280C620,236 720,236 720,280V420M550,160H810"
        />
        <Ink d="M-10,510V420H810V510Z" tone="c" />
        <Person
          x={500}
          y={480}
          s={1.5}
          pose="sit"
          face={-1}
          robe="b"
          head="bare"
        />
        <Person
          x={400}
          y={476}
          s={1.6}
          pose="reach"
          robe="g"
          cloak="c"
          head="veil"
        />
        <Ink d="M448,372c0,-12 28,-12 28,0c0,10 -28,10 -28,0Z" tone="c" />
        <Fade frame={frame} on={5} off={6} from="walk-left" at={4}>
          <Person
            x={250}
            y={478}
            s={1.5}
            pose="walk"
            robe="c"
            head="bare"
            bundle
          />
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
