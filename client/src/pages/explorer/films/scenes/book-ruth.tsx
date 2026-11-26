/**
 * "Ruth: loyal love in a hard time": a film for one whole book, from the
 * book's own page (bible/notes/ruth/intro.json) and its chapter notes.
 *
 *   0  A small story            two women on the road to Bethlehem
 *   1  How it is laid out       road, field, threshing floor, gate
 *   2  Loyal love               Ruth holds on; Orpah goes back
 *   3  God in ordinary days     gleaning in the field of Boaz
 *   4  The redeemer             Boaz at the gate, the sandal held out
 *   5  The surprise at the end  the child in Naomi's lap
 *   6  Where to start           the reader and the open scroll
 *
 * No death is drawn: the story's losses are in the captions. God is never
 * drawn. Ruth has the same robe, cloak and veil in every picture, and so
 * has Naomi. The one mustard mark: the rule under the turning point (1),
 * the sun (3, 5), a lamp's flame (4), the marker (6); the road (0, 2) has
 * none.
 */
import {
  Grass,
  Hills,
  House,
  Ink,
  Lamp,
  Person,
  Stars,
  Sun,
  Wheat,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/** The book's four chapters are its four scenes, as the book page lays them out. */
export const LAYOUT = [1, 1, 1, 1];

const Ruth = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "reach" | "bow" | "hold";
  bundle?: boolean;
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="c"
    head="veil"
    bundle={p.bundle}
  />
);
const Naomi = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "sit";
  staff?: boolean;
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="g"
    cloak="b"
    head="veil"
    staff={p.staff ? "staff" : undefined}
  />
);

const CAMERA: [number, number, number][] = [
  [420, 330, 1.14],
  [400, 250, 1.06],
  [400, 330, 1.14],
  [400, 330, 1.12],
  [420, 320, 1.14],
  [400, 330, 1.14],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The road back to Bethlehem. */}
      <FirstScene frame={frame}>
        <Sun x={110} y={90} r={22} />
        <Hills
          y={330}
          peaks={[
            [120, 90],
            [300, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Hills
          y={380}
          peaks={[
            [420, 16],
            [690, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <House x={650} y={352} s={0.75} hatch={h.h3} />
        <House x={724} y={360} s={0.6} tone="b" hatch={h.h3} />
        <Ink d="M-10,510V410C240,396 560,400 810,388V510Z" tone="c" />
        <path className="pl-f" d="M0,452C260,436 540,436 800,420" />
        <Ambient frame={frame} on={-1} off={1} kind="sway">
          <Wheat x={90} y={420} s={1.3} />
          <Wheat x={150} y={428} s={1.2} />
          <Wheat x={560} y={410} s={1.1} />
          <Wheat x={610} y={414} s={1.2} />
        </Ambient>
        <Naomi x={440} y={470} pose="walk" staff />
        <Ruth x={350} y={474} pose="walk" bundle />
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
                d={`M${mid - 40},${top}C${mid - 14},${top - 28} ${mid + 10},${top - 4} ${mid + 40},${top - 32}`}
              />
            ) : i === 1 ? (
              <>
                <Wheat x={mid - 10} y={top} s={0.9} />
                <Wheat x={mid + 10} y={top} s={0.9} />
              </>
            ) : i === 2 ? (
              <Stars
                at={[
                  [mid - 16, top - 26, 5],
                  [mid + 14, top - 14, 4],
                ]}
              />
            ) : (
              <>
                <Ink
                  d={`M${mid - 26},${top}v-34h52v34h-14v-18c0,-12 -24,-12 -24,0v18Z`}
                  tone="c"
                />
              </>
            )
          }
        />
      </Scene>

      {/* 2. "Wherever you go, I will go." */}
      <Scene frame={frame} k={2}>
        <Sun x={690} y={90} r={22} />
        <Hills
          y={340}
          peaks={[
            [140, 90],
            [320, 50],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <Ink d="M-10,510V400C240,384 560,392 810,380V510Z" tone="c" />
        <path className="pl-f" d="M0,450C260,434 540,438 800,420" />
        <Naomi x={500} y={472} s={1.7} staff />
        <Ruth x={410} y={474} s={1.7} pose="reach" />
        <Fade frame={frame} on={2} off={3} from="right" at={5}>
          <Person
            x={170}
            y={440}
            s={1.2}
            face={-1}
            pose="walk"
            robe="c"
            cloak="g"
            head="veil"
          />
        </Fade>
        <Grass
          at={[
            [300, 470],
            [660, 460],
          ]}
        />
      </Scene>

      {/* 3. Gleaning in the field of Boaz. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={650} y={90} r={32} gold />
          </Ambient>
        </Fade>
        <Hills
          y={360}
          peaks={[
            [200, 30],
            [600, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V390C240,376 560,380 810,390V510Z" tone="c" />
        <Ambient frame={frame} on={3} off={4} kind="sway">
          <Wheat x={40} y={420} s={1.4} />
          <Wheat x={100} y={430} s={1.3} />
          <Wheat x={160} y={420} s={1.4} />
          <Wheat x={220} y={432} s={1.3} />
          <Wheat x={280} y={422} s={1.4} />
          <Wheat x={690} y={430} s={1.3} />
          <Wheat x={750} y={422} s={1.4} />
        </Ambient>
        <Person x={150} y={480} s={1.3} pose="reach" robe="g" head="bare" />
        <Ruth x={400} y={482} s={1.6} pose="bow" />
        <path
          className="pl-f"
          d="M452,478l10,-14M462,480l12,-12M444,482l6,-16"
        />
        <Person
          x={600}
          y={474}
          s={1.7}
          face={-1}
          robe="p"
          cloak="g"
          staff="staff"
        />
      </Scene>

      {/* 4. At the gate: the redeemer. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,410V110H810V410Z" tone="c" hatch={h.hs} />
        <path
          className="pl-paper"
          d="M300,410V220C300,160 500,160 500,220V410Z"
        />
        <path
          className="pl-l"
          d="M300,410V220C300,160 500,160 500,220V410M-10,110H810"
        />
        <path className="pl-l" d="M400,170V230" />
        <Fade frame={frame} on={4} off={5} from="grow" at={3}>
          <Ambient frame={frame} on={4} off={5} kind="flicker">
            <Lamp x={396} y={254} s={1.5} gold />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V410H810V510Z" tone="b" />
        <path className="pl-f" d="M0,446H800M0,480H800" />
        <Person x={330} y={478} s={1.7} pose="reach" robe="p" cloak="g" />
        {/* The sandal, held out. */}
        <path className="pl-k" d="M392,366h30v7h-30Z" />
        <Fade frame={frame} on={4} off={5} from="right" at={5}>
          <Person
            x={560}
            y={476}
            s={1.4}
            pose="sit"
            face={-1}
            robe="c"
            cloak="b"
          />
          <Person x={640} y={482} s={1.4} pose="sit" face={-1} robe="g" />
          <Person
            x={720}
            y={476}
            s={1.4}
            pose="sit"
            face={-1}
            robe="b"
            cloak="c"
          />
        </Fade>
        <Person x={150} y={478} s={1.5} robe="c" head="bare" />
      </Scene>

      {/* 5. The child in Naomi's lap. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <Sun x={150} y={100} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={370}
          peaks={[
            [520, 30],
            [720, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <House x={640} y={380} s={1.6} hatch={h.h3} />
        <Ink d="M-10,510V400C240,388 560,392 810,400V510Z" tone="c" />
        <Naomi x={380} y={480} s={1.8} pose="sit" />
        {/* The child, wrapped. */}
        <Ink d="M400,420c14,-10 38,-6 40,8c-2,14 -28,16 -40,6Z" />
        <Ruth x={270} y={478} s={1.6} />
        <Fade frame={frame} on={5} off={6} from="right" at={4}>
          <Person
            x={520}
            y={478}
            s={1.5}
            pose="pray"
            face={-1}
            robe="c"
            head="veil"
          />
          <Person
            x={600}
            y={484}
            s={1.5}
            pose="open"
            face={-1}
            robe="p"
            cloak="b"
            head="veil"
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
