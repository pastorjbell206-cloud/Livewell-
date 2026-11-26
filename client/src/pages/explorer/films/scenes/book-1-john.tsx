/**
 * "1 John: so that you may know": a film for one whole book, from the
 * book's own page (bible/notes/1-john/intro.json) and its chapter notes.
 *
 *   0  Churches that had been shaken  a house church; others walking away
 *   1  How it is laid out             themes that circle back
 *   2  Hands that touched             witnesses on the shore, hands open
 *   3  Three marks                    travellers at night, one lamp
 *   4  Sin and forgiveness            prayer at morning by clear water
 *   5  God is love                    bread and a cloak held out at a door
 *   6  Where to start                 the reader and the open scroll
 *
 * Christ and God are never drawn: the witnesses face a light with no one in
 * it. Those who left are drawn only walking away, never as enemies, and no
 * one of any age is drawn as an antichrist. The one mustard mark: the rule
 * under "God is love" (1), the light on the shore (2), the lamp's flame (3),
 * the sunrise (4), the loaf (5), the marker (6); the house church (0) has
 * none.
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Rays,
  Stars,
  Sun,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** Walking in the light (1 and 2), children of God (3), God is love (4), knowing (5). */
export const LAYOUT = [2, 1, 1, 1];

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 320, 1.1],
  [400, 320, 1.1],
  [400, 330, 1.12],
  [400, 330, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A house church; others walking away. */}
      <FirstScene frame={frame}>
        <Ink d="M-10,-10H560V420H-10Z" tone="c" hatch={h.h3} />
        <path className="pl-l" d="M560,-10V420" />
        {/* The open door, and the street beyond. */}
        <path className="pl-paper" d="M560,140H810V420H560Z" />
        <House x={720} y={300} s={0.7} tone="b" hatch={h.h3} />
        <Ink d="M560,420V300H810V420Z" tone="g" />
        <Ink d="M-10,510V420H810V510Z" tone="b" />
        <Person x={150} y={440} s={1.7} pose="open" robe="c" cloak="b" head="bare" />
        <Ink d="M250,440H470V452H250Z" tone="c" />
        <Person x={290} y={444} s={1.2} face={-1} pose="sit" robe="g" head="veil" />
        <Person x={370} y={444} s={1.2} face={-1} pose="sit" robe="p" head="cloth" />
        <Person x={440} y={448} s={0.9} face={-1} pose="sit" robe="b" child head="bare" />
        <Fade frame={frame} on={-1} off={1} from="left" at={4}>
          <Person x={640} y={390} s={0.9} pose="walk" robe="b" cloak="g" head="cloth" />
          <Person x={700} y={384} s={0.9} pose="walk" robe="c" head="cloth" />
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
              <Lamp x={mid - 4} y={top} s={0.9} />
            ) : i === 1 ? (
              <Person x={mid} y={top} s={0.4} robe="g" child head="bare" />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 22},${top - 16}c6,10 16,12 22,8c6,4 16,2 22,-8M${mid - 22},${top - 16}l-4,-8M${mid + 22},${top - 16}l4,-8`}
              />
            ) : (
              <path
                className="pl-l"
                d={`M${mid - 24},${top - 4}H${mid + 24}M${mid - 14},${top - 4}a14,14 0 0,1 28,0M${mid},${top - 26}v-6`}
              />
            )
          }
        />
      </Scene>

      {/* 2. Witnesses on the shore, hands open toward the light. */}
      <Scene frame={frame} k={2}>
        <Hills
          y={260}
          peaks={[
            [140, 50],
            [700, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <path className="pl-paper" d="M-10,260H810V360H-10Z" />
        <Water x={0} y={290} w={800} rows={3} gap={18} />
        <Ink d="M-10,510V360C240,350 560,350 810,360V510Z" tone="c" />
        <Fade frame={frame} on={2} off={3} at={3}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <path className="pl-m" d="M576,330a24,24 0 1,0 48,0a24,24 0 1,0 -48,0Z" />
            <Rays x={600} y={330} reach={70} n={10} />
          </Ambient>
        </Fade>
        <Person x={250} y={470} s={1.7} pose="open" robe="g" cloak="c" head="cloth" />
        <Person x={340} y={464} s={1.6} pose="open" robe="b" head="cloth" />
        <Person x={420} y={470} s={1.5} pose="open" robe="p" cloak="b" head="bare" />
      </Scene>

      {/* 3. Three travellers at night; the first carries a lamp. */}
      <Scene frame={frame} k={3}>
        <Ink d="M-10,-10H810V400H-10Z" tone="b" hatch={h.hs} />
        <Stars
          at={[
            [100, 70, 5],
            [240, 120, 4],
            [520, 60, 5],
            [700, 110, 4],
          ]}
        />
        <Ink d="M-10,510V400C240,392 560,392 810,400V510Z" tone="g" />
        <path className="pl-f" d="M-10,460C240,446 560,446 810,460" />
        <Person x={500} y={470} s={1.6} pose="hold" robe="c" cloak="g" head="cloth" />
        <Ambient frame={frame} on={3} off={4} kind="flicker">
          <Lamp x={540} y={380} s={1.2} gold />
        </Ambient>
        <Fade frame={frame} on={3} off={4} from="left" at={4}>
          <Person x={400} y={474} s={1.5} pose="walk" robe="p" head="veil" />
          <Person x={310} y={478} s={1.5} pose="walk" robe="b" cloak="c" head="bare" />
        </Fade>
      </Scene>

      {/* 4. Prayer at morning, by a basin of clear water. */}
      <Scene frame={frame} k={4}>
        <Fade frame={frame} on={4} off={5} at={3}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <Sun x={620} y={236} r={36} gold />
          </Ambient>
        </Fade>
        <Hills
          y={310}
          peaks={[
            [520, 50],
            [740, 40],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V360C240,350 560,350 810,360V510Z" tone="g" />
        <Person x={340} y={470} s={1.7} pose="kneel" robe="g" cloak="c" head="veil" />
        <Ink d="M420,470c0,-20 80,-20 80,0c0,8 -80,8 -80,0Z" tone="c" />
        <path className="pl-f" d="M430,462c10,-4 50,-4 60,0" />
        <Grass
          at={[
            [140, 470],
            [620, 470],
          ]}
        />
      </Scene>

      {/* 5. Bread and a cloak held out at a door. */}
      <Scene frame={frame} k={5}>
        <House x={220} y={420} s={1.8} hatch={h.h3} />
        <Ink d="M-10,510V420H810V510Z" tone="c" />
        <Person x={340} y={480} s={1.7} pose="reach" robe="b" cloak="g" head="cloth" />
        <Fade frame={frame} on={5} off={6} from="grow" at={3}>
          <path className="pl-m" d="M384,384c0,-14 36,-14 36,0Z" />
          <path className="pl-f" d="M384,384c0,-14 36,-14 36,0Z" />
        </Fade>
        <Ink d="M330,370h34v22h-34Z" tone="g" />
        <Fade frame={frame} on={5} off={6} from="right" at={5}>
          <Person
            x={480}
            y={482}
            s={1.6}
            face={-1}
            pose="open"
            robe="c"
            head="bare"
            staff="staff"
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
