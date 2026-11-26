/**
 * "Galatians: nothing added to Christ": a film for one whole book, from the
 * book's own page (bible/notes/galatians/intro.json) and its chapter notes.
 *
 *   0  An urgent letter      Paul writing by lamplight, in large strokes
 *   1  How it is laid out    his story, the argument, freedom lived out
 *   2  Who belongs           an open gate, people of every kind going in
 *   3  Abraham               the old man under the stars
 *   4  One table             believers of every kind sharing bread
 *   5  What freedom is for   carrying one another's load under a fruit tree
 *   6  Where to start        the reader and the open scroll
 *
 * The teachers in Galatia are never drawn, and no one is drawn barring the
 * way: the gate stands open. Christ and God are never drawn; the cross is
 * not pictured. No person is drawn as Jewish or as Gentile by any look. The
 * one mustard mark: the lamp's flame (0), the rule under the argument (1),
 * the light beyond the gate (2), one star (3), the loaf (4), one fruit (5),
 * the marker (6).
 */
import {
  CityWall,
  Grass,
  Hills,
  Ink,
  Lamp,
  Olive,
  Person,
  Stars,
  Sun,
  Tent,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, GoldStar, Layout, Scene, StartReading } from "./book-parts";

/** Paul's story (1 and 2), the argument (3 and 4), freedom lived out (5 and 6). */
export const LAYOUT = [2, 2, 2];

const CAMERA: [number, number, number][] = [
  [400, 320, 1.12],
  [400, 250, 1.06],
  [400, 320, 1.1],
  [400, 300, 1.1],
  [400, 340, 1.12],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). Paul writing by lamplight. */}
      <FirstScene frame={frame}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.h3} />
        <path className="pl-paper" d="M520,90H680V250H520Z" />
        <path className="pl-l" d="M520,90H680V250H520ZM600,90V250M520,170H680" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        {/* The low table, and the letter on it. */}
        <Ink d="M330,410H560V424H330Z" tone="c" />
        <path className="pl-l" d="M346,424V470M544,424V470" />
        <Ink d="M380,410V402H500V410Z" />
        <Fade frame={frame} on={-1} off={1} at={3}>
          <path className="pl-k" d="M392,404l14,-0M412,404h22M440,404h30M476,404h16" />
        </Fade>
        <Ambient frame={frame} on={0} off={1} kind="flicker">
          <Lamp x={530} y={410} s={1.4} gold />
        </Ambient>
        <Person
          x={260}
          y={470}
          s={1.8}
          pose="sit"
          robe="b"
          cloak="g"
          head="bare"
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
              <Person x={mid} y={top} s={0.36} pose="walk" robe="b" />
            ) : i === 1 ? (
              <Stars
                at={[
                  [mid - 20, top - 20, 5],
                  [mid, top - 32, 4],
                  [mid + 22, top - 14, 5],
                ]}
              />
            ) : (
              <Olive x={mid} y={top} s={0.4} />
            )
          }
        />
      </Scene>

      {/* 2. The open gate; people of every kind going in. */}
      <Scene frame={frame} k={2}>
        <Hills
          y={330}
          peaks={[
            [140, 50],
            [680, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={400} y={420} w={600} s={1.4} tone="c" hatch={h.h3} />
        <Fade frame={frame} on={2} off={3} at={3}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <path className="pl-m" d="M386,384a14,14 0 1,0 28,0a14,14 0 1,0 -28,0Z" />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V420H810V510Z" tone="b" />
        <path className="pl-f" d="M400,420L250,510M400,420L550,510" />
        <Fade frame={frame} on={2} off={3} from="left" at={5}>
          <Person x={180} y={490} s={1.3} pose="walk" robe="g" cloak="c" head="veil" />
          <Person x={260} y={484} s={1.2} pose="walk" robe="p" head="cloth" />
          <Person x={320} y={480} s={0.9} pose="walk" robe="b" child head="bare" />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="right" at={7}>
          <Person x={560} y={484} s={1.3} pose="walk" face={-1} robe="c" cloak="b" head="bare" />
          <Person x={640} y={490} s={1.3} pose="walk" face={-1} robe="g" head="cloth" bundle />
        </Fade>
      </Scene>

      {/* 3. Abraham under the stars. */}
      <Scene frame={frame} k={3}>
        <Ink d="M-10,-10H810V400H-10Z" tone="b" hatch={h.hs} />
        <Stars
          at={[
            [90, 60, 5],
            [180, 110, 4],
            [260, 50, 5],
            [340, 140, 4],
            [470, 70, 5],
            [620, 120, 4],
            [700, 50, 5],
            [740, 170, 4],
          ]}
        />
        <Fade frame={frame} on={3} off={4} from="grow" at={4}>
          <Ambient frame={frame} on={3} off={4} kind="twinkle">
            <GoldStar x={560} y={90} r={10} />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V400C240,390 560,390 810,400V510Z" tone="g" />
        <Tent x={220} y={450} s={1.4} hatch={h.h3} />
        <Person
          x={440}
          y={470}
          s={1.8}
          pose="open"
          robe="c"
          cloak="b"
          head="cloth"
          staff="staff"
        />
      </Scene>

      {/* 4. One table, bread shared. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V380H-10Z" tone="c" hatch={h.h3} />
        <Ink d="M-10,510V380H810V510Z" tone="b" />
        <Person x={170} y={440} s={1.5} pose="sit" robe="g" cloak="c" head="veil" />
        <Person x={290} y={440} s={1.5} pose="sit" robe="p" head="bare" />
        <Person x={520} y={440} s={1.5} face={-1} pose="sit" robe="b" head="cloth" />
        <Person x={640} y={440} s={1.5} face={-1} pose="sit" robe="c" cloak="g" head="veil" />
        {/* The long table, and the bread. */}
        <Ink d="M120,420H680V436H120Z" tone="c" />
        <path className="pl-l" d="M150,436V490M650,436V490" />
        <Ink d="M220,420c0,-10 30,-10 30,0Z" tone="b" />
        <Ink d="M560,420c0,-10 30,-10 30,0Z" tone="b" />
        <Fade frame={frame} on={4} off={5} from="grow" at={4}>
          <path className="pl-m" d="M380,420c0,-16 44,-16 44,0Z" />
          <path className="pl-f" d="M380,420c0,-16 44,-16 44,0ZM392,410l6,-4M404,408l6,-4" />
        </Fade>
      </Scene>

      {/* 5. Carrying one another's load under a fruit tree. */}
      <Scene frame={frame} k={5}>
        <Sun x={130} y={96} r={22} />
        <Hills
          y={350}
          peaks={[
            [200, 40],
            [600, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V390C240,380 560,382 810,392V510Z" tone="g" />
        <Ambient frame={frame} on={5} off={6} kind="sway">
          <Olive x={640} y={460} s={2.6} hatch={h.h2} />
        </Ambient>
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <path className="pl-m" d="M664,262a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
          <path className="pl-f" d="M664,262a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
        </Fade>
        {/* Two carry one load on a pole between them. */}
        <Person x={170} y={470} s={1.6} pose="hold" robe="p" cloak="b" head="cloth" />
        <Person x={410} y={470} s={1.6} face={-1} pose="hold" robe="g" head="bare" />
        <Ink d="M250,394v4c0,30 80,30 80,0v-4Z" tone="c" />
        <path className="pl-l" d="M184,392H396" />
        <Fade frame={frame} on={5} off={6} from="right" at={6}>
          <Person x={500} y={474} s={1.5} face={-1} pose="reach" robe="c" cloak="g" head="veil" />
        </Fade>
        <Grass
          at={[
            [90, 480],
            [300, 486],
          ]}
        />
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
