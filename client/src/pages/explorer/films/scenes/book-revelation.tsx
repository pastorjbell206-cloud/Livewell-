/**
 * "Revelation: the Lamb on the throne": a film for one whole book, from the
 * book's own page (bible/notes/revelation/intro.json) and its chapter notes.
 *
 *   0  An unveiling             John on Patmos; seven lampstands
 *   1  How it is laid out       letters, visions, all things new
 *   2  The throne               a sea of glass, seven lamps, a rainbow; light
 *   3  The Lamb                 a lamb on a hill; the scroll; people of every land
 *   4  Pictures, not a puzzle   four readers, one scroll
 *   5  All things new           the city, the river, the tree
 *   6  Where to start           the reader and the open scroll
 *
 * Nothing here is drawn to frighten: no dragon, beast, plague, battle or
 * fire, and no one of today's world. God is never drawn: under the rainbow
 * there is only light. Christ is drawn as the book draws him, a lamb, whole
 * and standing; no wound is drawn. The one mustard mark: one lamp's flame
 * (0, 4), the rule under the last panel (1), the light of the throne (2),
 * the light on the hill (3), the sun (5), the marker (6).
 */
import {
  CityWall,
  Hills,
  Ink,
  Lamp,
  Olive,
  Person,
  Scroll,
  Sheep,
  Sun,
  Water,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The chapters in each part of the second picture, exactly as the book
 * page's structure divides them: the opening vision (1), the messages to
 * the seven churches (2 and 3), the throne, the scroll, the seals and the
 * trumpets (4 to 11), the conflict behind history (12 to 14), the fall of
 * Babylon (15 to 19), and the new creation (20 to 22).
 */
export const LAYOUT = [1, 2, 8, 3, 5, 3];

/** A lampstand: a foot, a stem, a cup; lit, its flame is the picture's mark. */
const Stand = ({
  x,
  y,
  s = 1,
  lit,
}: {
  x: number;
  y: number;
  s?: number;
  lit?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="pl-l" d="M0,0V-70M-14,0H14" />
    <Ink d="M-14,-70h28l-6,-12h-16Z" tone="c" />
    <path
      className={lit ? "pl-m" : "pl-paper"}
      d="M0,-82c7,-9 9,-18 4,-28c-9,9 -11,19 -4,28Z"
    />
    <path className="pl-f" d="M0,-82c7,-9 9,-18 4,-28c-9,9 -11,19 -4,28Z" />
  </g>
);

const CAMERA: [number, number, number][] = [
  [420, 320, 1.12],
  [400, 250, 1.06],
  [400, 260, 1.1],
  [400, 300, 1.12],
  [400, 340, 1.14],
  [420, 300, 1.12],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). John on Patmos. */}
      <FirstScene frame={frame}>
        <Sun x={120} y={90} r={22} />
        <Ink d="M-10,510V300H810V510Z" tone="b" />
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Water x={10} y={320} w={790} rows={3} gap={22} />
        </Ambient>
        {/* The island. */}
        <Ink
          d="M-10,510V420C80,360 200,340 320,372C460,340 620,350 810,400V510Z"
          tone="c"
          hatch={h.hs}
        />
        <Person x={170} y={456} s={1.6} pose="sit" robe="g" cloak="c" />
        <Scroll x={250} y={452} s={1.0} />
        <Stand x={360} y={456} s={0.9} />
        <Stand x={420} y={450} s={0.9} />
        <Stand x={480} y={446} s={0.9} />
        <Ambient frame={frame} on={-1} off={1} kind="flicker">
          <Stand x={540} y={444} s={1.0} lit />
        </Ambient>
        <Stand x={600} y={446} s={0.9} />
        <Stand x={660} y={450} s={0.9} />
        <Stand x={720} y={456} s={0.9} />
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={5}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <Stand x={mid} y={top} s={0.4} />
            ) : i === 1 ? (
              <path
                className="pl-f"
                d={Array.from(
                  { length: 7 },
                  (_, n) =>
                    `M${mid - 24 + n * 8},${top}v-14M${mid - 24 + n * 8},${top - 16}c3,-4 3,-8 1,-11c-4,4 -4,8 -1,11Z`
                ).join("")}
              />
            ) : i === 2 ? (
              <>
                <path
                  className="pl-l"
                  d={`M${mid - 34},${top}a34,34 0 0,1 68,0M${mid - 24},${top}a24,24 0 0,1 48,0`}
                />
                <Ink d={`M${mid - 10},${top}v-14h20v14Z`} />
              </>
            ) : i === 3 ? (
              <Ink d={`M${mid - 14},${top}v-18l7,9l7,-13l7,13l7,-9v18Z`} />
            ) : i === 4 ? (
              <Ink
                d={`M${mid - 14},${top}v-22l8,-8l6,10l8,-6v26Z`}
                tone="c"
                hatch={h.hs}
              />
            ) : (
              <Olive x={mid} y={top} s={0.7} />
            )
          }
        />
      </Scene>

      {/* 2. The throne: only light is drawn. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <path className="pl-m" d="M340,300a60,60 0 0,1 120,0Z" />
          </Ambient>
          <path
            className="pl-f"
            d="M400,226V180M340,250L310,214M460,250L490,214M316,290H270M484,290H530"
          />
        </Fade>
        {/* The rainbow. */}
        <path
          className="pl-l"
          d="M180,300a220,220 0 0,1 440,0M210,300a190,190 0 0,1 380,0M240,300a160,160 0 0,1 320,0"
        />
        <path
          className="pl-g"
          d="M180,300a220,220 0 0,1 440,0h-30a190,190 0 0,0 -380,0Z"
          opacity="0.9"
        />
        <path
          className="pl-b"
          d="M210,300a190,190 0 0,1 380,0h-30a160,160 0 0,0 -320,0Z"
          opacity="0.9"
        />
        <path
          className="pl-l"
          d="M180,300a220,220 0 0,1 440,0M210,300a190,190 0 0,1 380,0M240,300a160,160 0 0,1 320,0"
        />
        {/* The sea of glass. */}
        <Ink d="M-10,510V300H810V510Z" tone="b" />
        <path
          className="pl-f"
          d="M0,340H800M0,390H800M0,450H800M200,300L80,500M400,300V500M600,300L720,500"
        />
        <Stand x={130} y={470} s={0.9} />
        <Stand x={220} y={440} s={0.8} />
        <Stand x={310} y={420} s={0.7} />
        <Stand x={400} y={412} s={0.7} />
        <Stand x={490} y={420} s={0.7} />
        <Stand x={580} y={440} s={0.8} />
        <Stand x={670} y={470} s={0.9} />
      </Scene>

      {/* 3. The Lamb. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} from="up" at={3}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <path className="pl-m" d="M330,220a70,70 0 0,1 140,0Z" />
          </Ambient>
          <path
            className="pl-f"
            d="M400,136V96M330,170L300,140M470,170L500,140"
          />
        </Fade>
        <Ink d="M220,360C280,220 520,220 580,360Z" tone="g" hatch={h.hs} />
        <Sheep x={390} y={262} s={1.9} lamb />
        <Scroll x={480} y={270} s={0.8} />
        <Ink d="M-10,510V350C240,340 560,340 810,350V510Z" tone="c" />
        <Fade frame={frame} on={3} off={4} from="left" at={4}>
          <Person x={90} y={470} s={1.4} pose="pray" robe="b" cloak="c" />
          <Person x={170} y={480} s={1.4} pose="pray" robe="g" head="veil" />
          <Person
            x={250}
            y={470}
            s={1.0}
            pose="pray"
            robe="c"
            child
            head="bare"
          />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="right" at={6}>
          <Person
            x={560}
            y={470}
            s={1.4}
            pose="pray"
            face={-1}
            robe="p"
            cloak="g"
            head="bare"
          />
          <Person
            x={640}
            y={480}
            s={1.4}
            pose="pray"
            face={-1}
            robe="c"
            cloak="b"
          />
          <Person
            x={720}
            y={470}
            s={1.4}
            pose="pray"
            face={-1}
            robe="b"
            head="veil"
          />
        </Fade>
      </Scene>

      {/* 4. Four readers, one scroll. */}
      <Scene frame={frame} k={4}>
        <path className="fp-dark" fill={h.hs} d="M0,0H800V400H0Z" />
        <Ink d="M-10,400V110H810V400Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M-10,110H810" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Fade frame={frame} on={4} off={5} from="grow" at={3}>
          <Ambient frame={frame} on={4} off={5} kind="flicker">
            <Lamp x={398} y={470} s={1.5} gold />
          </Ambient>
        </Fade>
        <Person x={130} y={478} s={1.6} pose="sit" robe="g" cloak="c" />
        <Scroll x={206} y={470} s={0.6} />
        <Person x={290} y={470} s={1.5} pose="sit" robe="b" head="veil" />
        <Scroll x={344} y={456} s={0.55} />
        <Person
          x={520}
          y={470}
          s={1.5}
          pose="sit"
          face={-1}
          robe="c"
          head="bare"
        />
        <Scroll x={474} y={456} s={0.55} />
        <Person
          x={680}
          y={478}
          s={1.6}
          pose="sit"
          face={-1}
          robe="p"
          cloak="b"
        />
        <Scroll x={604} y={470} s={0.6} />
      </Scene>

      {/* 5. All things new. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} from="up" at={3}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={400} y={110} r={44} gold />
          </Ambient>
        </Fade>
        <Hills y={370} peaks={[[400, 110]]} tone="g" hatch={h.hs} />
        <CityWall x={400} y={272} w={280} s={1.0} />
        <Ink d="M-10,510V400C240,388 560,392 810,400V510Z" tone="g" />
        {/* The river, out from the city. */}
        <Ink
          d="M384,272C380,340 300,420 200,510H420C440,420 420,340 416,272Z"
          tone="b"
        />
        <Water x={250} y={430} w={160} rows={3} gap={20} />
        <Ambient frame={frame} on={5} off={6} kind="sway">
          <Olive x={560} y={420} s={1.8} hatch={h.h2} />
        </Ambient>
        <Fade frame={frame} on={5} off={6} from="up" at={5}>
          <Person x={110} y={478} s={1.3} pose="walk" robe="p" cloak="b" />
          <Person
            x={170}
            y={486}
            s={0.9}
            pose="walk"
            robe="p"
            child
            head="bare"
          />
          <Person
            x={690}
            y={478}
            s={1.3}
            pose="walk"
            face={-1}
            robe="p"
            head="veil"
          />
          <Person
            x={470}
            y={360}
            s={0.8}
            pose="walk"
            face={-1}
            robe="p"
            cloak="c"
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
