/**
 * "1 Corinthians: a gifted church, coming apart": a film for one whole
 * letter, from the book's own page (bible/notes/1-corinthians/intro.json)
 * and its chapter notes.
 *
 *   0  A real letter                 a house church in the city, a letter read
 *   1  How it is laid out            eight parts, the questions marked
 *   2  The wisdom of the cross       an empty cross, people looking up
 *   3  One body, many parts          one table, one loaf, many kinds of people
 *   4  The way of love               a bowl offered to the one left out
 *   5  Raised from the dead          the open tomb at dawn
 *   6  Where to start                the reader and the open scroll
 *
 * No one is drawn on the cross, and no one in the tomb. The hard passages
 * (chapters 7, 11 and 14) are named in words only: nothing is drawn that
 * would take a side on them. The one mustard mark: the sun (2, 5), the
 * rule (1), a lamp (3, 4), the marker (6); the opening picture has none.
 */
import {
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Scroll,
  Sun,
  Table,
  Water,
  Grass,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The book page's outline, rounded to whole chapters: 1 to 4; 5 and 6; 7; 8 to 10; 11; 12 to 14; 15; 16. */
export const LAYOUT = [4, 2, 1, 3, 1, 3, 1, 1];

/** A row of columns under a roof: a public building of the city. */
const Columns = ({ x, y, s = 1, n = 5 }: { x: number; y: number; s?: number; n?: number }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <Ink d={`M-10,-110L${(n * 24) / 2},-140L${n * 24 + 10},-110Z`} tone="c" />
    <Ink d={`M-10,-110H${n * 24 + 10}V-100H-10Z`} tone="b" />
    {Array.from({ length: n }, (_, i) => (
      <Ink key={i} d={`M${i * 24 + 4},-100h12v96h-12Z`} tone="g" />
    ))}
    <Ink d={`M-14,-4H${n * 24 + 14}V0H-14Z`} tone="b" />
  </g>
);

const CAMERA: [number, number, number][] = [
  [420, 330, 1.12],
  [400, 250, 1.06],
  [400, 300, 1.1],
  [400, 330, 1.12],
  [400, 330, 1.12],
  [420, 300, 1.1],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The city, and a house church reading the letter. */}
      <FirstScene frame={frame}>
        <Sun x={110} y={80} r={20} />
        <Ink d="M560,250H810V330H560Z" tone="b" hatch={h.hs} />
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Water x={570} y={270} w={230} rows={3} gap={18} />
        </Ambient>
        <Columns x={60} y={300} s={1} n={6} />
        <House x={300} y={300} s={1} tone="b" hatch={h.h3} />
        <House x={440} y={290} s={0.8} hatch={h.h3} />
        <House x={620} y={330} s={0.7} tone="g" hatch={h.h3} />
        <Ink d="M-10,510V330H810V510Z" tone="c" />
        <path className="pl-f" d="M60,350H740" />
        <Person x={220} y={470} s={1.4} pose="sit" robe="b" cloak="g" head="veil" face={1} />
        <Person x={300} y={478} s={1.3} pose="sit" robe="p" head="bare" face={1} />
        <Person x={400} y={470} s={1.6} pose="hold" robe="g" cloak="c" head="cloth" face={-1} />
        <Scroll x={378} y={410} s={0.7} />
        <Person x={490} y={478} s={1.3} pose="sit" robe="c" head="cloth" face={-1} />
        <Person x={560} y={480} s={0.9} pose="sit" robe="b" child face={-1} />
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
              <path className="pl-l" d={`M${mid},${top}V${top - 36}M${mid - 12},${top - 26}H${mid + 12}`} />
            ) : i === 1 ? (
              <path
                className="pl-l"
                d={`M${mid},${top}V${top - 30}M${mid - 16},${top - 26}H${mid + 16}M${mid - 16},${top - 26}l-6,12h12ZM${mid + 16},${top - 26}l-6,12h12Z`}
              />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 12},${top - 14}a8,8 0 1,0 0.1,0ZM${mid},${top - 14}a8,8 0 1,0 0.1,0Z`}
              />
            ) : i === 3 ? (
              <Ink d={`M${mid - 14},${top - 30}h28c0,14 -6,20 -14,20c-8,0 -14,-6 -14,-20ZM${mid - 3},${top - 10}v8h6v-8Z`} tone="b" />
            ) : i === 4 ? (
              <Ink d={`M${mid - 14},${top - 2}c0,-20 28,-20 28,0Z`} tone="c" />
            ) : i === 5 ? (
              <path
                className="pl-l"
                d={`M${mid},${top}C${mid - 12},${top - 8} ${mid - 10},${top - 22} ${mid},${top - 34}C${mid + 10},${top - 22} ${mid + 12},${top - 8} ${mid},${top}Z`}
              />
            ) : i === 6 ? (
              <Ink d={`M${mid - 18},${top}v-20c0,-16 36,-16 36,0v20ZM${mid - 8},${top}v-12c0,-8 16,-8 16,0v12Z`} tone="g" />
            ) : (
              <path className="pl-f" d={`M${mid - 18},${top}C${mid - 6},${top - 14} ${mid + 6},${top - 10} ${mid + 18},${top - 30}`} />
            )
          }
        />
      </Scene>

      {/* 2. The empty cross on the hill. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} at={4}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={400} y={190} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [400, 120],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <path className="pl-k" d="M394,214V110h12v104ZM366,138H434v10H366Z" />
        <Ink d="M-10,510V380H810V510Z" tone="c" />
        <Person x={150} y={470} s={1.5} face={1} robe="b" cloak="g" head="cloth" />
        <Person x={230} y={480} s={1.3} face={1} robe="p" head="veil" />
        <Person x={300} y={486} s={0.9} face={1} robe="c" child />
        <Person x={520} y={482} s={1.4} face={-1} robe="g" cloak="b" head="bare" />
        <Person x={600} y={474} s={1.5} face={-1} robe="c" cloak="g" head="cloth" staff="staff" />
        <Person x={680} y={484} s={1.3} face={-1} robe="b" head="veil" />
      </Scene>

      {/* 3. One table, one loaf, many kinds of people. */}
      <Scene frame={frame} k={3}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.hs} />
        <Fade frame={frame} on={3} off={4} from="grow" at={4}>
          <Ambient frame={frame} on={3} off={4} kind="flicker">
            <Lamp x={400} y={150} s={1.4} gold />
          </Ambient>
        </Fade>
        <path className="pl-l" d="M400,40V128" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <Table x={400} y={440} s={2.2} />
        <Person x={170} y={470} s={1.5} pose="sit" robe="g" cloak="b" head="bare" staff="staff" />
        <Person x={260} y={476} s={1.5} pose="reach" robe="p" head="cloth" />
        <Person x={540} y={474} s={1.5} pose="reach" robe="b" head="veil" face={-1} />
        <Person x={600} y={480} s={0.9} pose="sit" robe="c" child face={-1} />
        <Person x={680} y={470} s={1.5} pose="sit" robe="c" cloak="g" head="cloth" face={-1} />
      </Scene>

      {/* 4. A bowl offered to the one who sits apart. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.hs} />
        <Fade frame={frame} on={4} off={5} from="grow" at={4}>
          <Ambient frame={frame} on={4} off={5} kind="flicker">
            <Lamp x={620} y={250} s={1.3} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <Person x={260} y={470} s={1.5} pose="sit" robe="p" head="bare" face={1} staff="staff" />
        <Person x={370} y={474} s={1.6} pose="kneel" robe="b" cloak="g" head="veil" face={-1} />
        <Ink d="M318,428c0,14 30,14 30,0Z" tone="c" />
        <Fade frame={frame} on={4} off={5} from="right" at={5}>
          <Person x={520} y={476} s={1.4} robe="g" head="cloth" face={-1} />
          <Person x={600} y={480} s={1.4} robe="c" cloak="b" head="veil" face={-1} />
          <Person x={680} y={474} s={1.4} robe="p" cloak="g" head="bare" face={-1} />
        </Fade>
      </Scene>

      {/* 5. The tomb in the garden, open at dawn. No one is drawn. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={3}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={170} y={250} r={32} gold />
          </Ambient>
        </Fade>
        <Hills
          y={330}
          peaks={[
            [140, 30],
            [300, 20],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M440,420V300C480,240 700,226 790,250V420Z" tone="b" />
        <path className="pl-paper" d="M560,420V350a40,40 0 0 1 80,0V420Z" />
        <path fill={h.h2} d="M560,420V350a40,40 0 0 1 80,0V420Z" />
        <path className="pl-l" d="M560,420V350a40,40 0 0 1 80,0V420Z" />
        <Ink d="M650,420a44,44 0 1,1 88,0Z" tone="g" />
        <Ink d="M-10,510V420H810V510Z" tone="g" />
        <Grass
          at={[
            [100, 450],
            [220, 470],
            [330, 448],
          ]}
        />
        <path
          className="pl-l"
          d="M120,440v-24M116,412a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M240,456v-26M236,426a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M350,436v-22M346,410a4,4 0 1,0 8,0a4,4 0 1,0 -8,0"
        />
        <path className="pl-f" d="M400,500C440,470 500,440 560,424" />
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
