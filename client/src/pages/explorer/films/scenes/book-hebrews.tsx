/**
 * "Hebrews: hold on to Jesus": a film for one whole book, from the book's
 * own page (bible/notes/hebrews/intro.json) and its chapter notes.
 *
 *   0  A sermon for the tired       a boat held by its anchor in the harbor
 *   1  How it is laid out           six parts, the one offering marked
 *   2  The Son                      light over the whole land, no one drawn
 *   3  A gift that pointed ahead    the tent of meeting and its shadow
 *   4  The great high priest        the curtain opened, light beyond
 *   5  Hold on, and run             runners and the crowd that watches
 *   6  Where to start               the reader and the open scroll
 *
 * God is not drawn, nor Christ: the Son is light, and the priest's work is
 * the curtain opened. No sacrifice, blood or altar is drawn. The tent of
 * meeting is drawn with honor, whole and cared for, never broken or
 * crossed out: the old covenant is God's own gift. The one mustard mark: a
 * star (0), the rule (1), the light (2, 3, 4), the line (5), the marker (6).
 */
import { Cloud, Hills, Ink, Person, Stars, Sun, Tent, Water } from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, GoldStar, Layout, Scene, StartReading } from "./book-parts";

/** The book page's parts, rounded to whole chapters: 1 and 2; 3 and 4; 5 to 7; 8 to 10; 11 and 12; 13. */
export const LAYOUT = [2, 2, 3, 3, 2, 1];

const CAMERA: [number, number, number][] = [
  [400, 300, 1.1],
  [400, 250, 1.06],
  [400, 280, 1.08],
  [400, 320, 1.1],
  [400, 280, 1.1],
  [420, 320, 1.1],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A boat held fast by its anchor in the harbor. */}
      <FirstScene frame={frame}>
        <Ambient frame={frame} on={-1} off={1} kind="twinkle">
          <GoldStar x={620} y={80} r={10} />
        </Ambient>
        <Stars
          at={[
            [150, 70, 3],
            [300, 110, 2],
            [470, 60, 3],
          ]}
        />
        <Hills
          y={260}
          peaks={[
            [100, 50],
            [700, 60],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V260H810V510Z" tone="b" hatch={h.hs} />
        <Water x={20} y={280} w={760} rows={2} gap={20} />
        {/* The boat, and the rope down to the anchor. */}
        <Ambient frame={frame} on={-1} off={1} kind="bob">
          <Ink d="M300,262C320,290 460,290 480,262L470,258H310Z" tone="c" />
          <path className="pl-l" d="M390,258V190M390,196L430,206" />
        </Ambient>
        <path className="pl-l" d="M460,272C480,330 500,380 510,440" />
        <path className="pl-k" d="M508,440v30M494,452h28M490,470c6,12 30,12 36,0" />
        <path className="pl-l" d="M490,470c6,12 30,12 36,0" />
      </FirstScene>

      {/* 1. How it is laid out. */}
      <Scene frame={frame} k={1}>
        <Layout
          frame={frame}
          k={1}
          parts={LAYOUT}
          mark={3}
          hatch={h.hs}
          above={(i, mid, top) =>
            i === 0 ? (
              <Ink d={`M${mid - 16},${top}l4,-24l12,12l12,-16l12,16l12,-12l4,24Z`} tone="c" />
            ) : i === 1 ? (
              <Tent x={mid} y={top} s={0.3} />
            ) : i === 2 ? (
              <path className="pl-l" d={`M${mid - 10},${top}h20l-4,-10h-12ZM${mid},${top - 12}c-6,-8 0,-16 0,-20c0,4 6,12 0,20`} />
            ) : i === 3 ? (
              <Ink d={`M${mid - 22},${top}v-36h44v36ZM${mid},${top}v-36`} tone="b" />
            ) : i === 4 ? (
              <Person x={mid} y={top} s={0.34} pose="walk" robe="g" />
            ) : (
              <path className="pl-l" d={`M${mid - 14},${top}v-34h28v34M${mid + 4},${top - 16}h4`} />
            )
          }
        />
      </Scene>

      {/* 2. The Son: light over the whole land. No one is drawn. */}
      <Scene frame={frame} k={2}>
        <Fade frame={frame} on={2} off={3} from="up" at={2}>
          <Ambient frame={frame} on={2} off={3} kind="glow">
            <Sun x={400} y={60} r={40} gold />
          </Ambient>
        </Fade>
        <path className="pl-f" d="M400,110L120,330M400,110L300,330M400,110L500,330M400,110L680,330" />
        <Hills
          y={330}
          peaks={[
            [140, 40],
            [420, 30],
            [690, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <Ink d="M-10,510V330H810V510Z" tone="c" />
        <path className="pl-l" d="M-10,420C200,400 300,450 500,430C640,416 720,440 810,430" />
        <path className="pl-f" d="M380,510C420,440 460,380 520,330" />
      </Scene>

      {/* 3. The tent of meeting, and its shadow running toward the light. */}
      <Scene frame={frame} k={3}>
        <Hills
          y={330}
          peaks={[
            [120, 30],
            [380, 20],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Ink d="M-10,510V340H810V510Z" tone="c" />
        <Tent x={260} y={410} s={1.6} hatch={h.h3} />
        {/* Its shadow on the sand. */}
        <path fill={h.h2} d="M330,410L700,450L700,470L320,430Z" />
        <Fade frame={frame} on={3} off={4} from="grow" at={5}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <path className="pl-m" d="M720,470V330C720,300 790,300 790,330V470Z" />
          </Ambient>
          <path className="pl-l" d="M720,470V330C720,300 790,300 790,330V470Z" />
        </Fade>
      </Scene>

      {/* 4. The curtain opened, and only light beyond. No one is drawn. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V510H-10Z" tone="c" hatch={h.hs} />
        <Fade frame={frame} on={4} off={5} at={4}>
          <Ambient frame={frame} on={4} off={5} kind="glow">
            <path className="pl-m" d="M330,100H470V440H330Z" />
          </Ambient>
        </Fade>
        <path className="pl-l" d="M200,80H600" />
        <Ink d="M210,80H400C380,200 360,330 330,440H210Z" tone="b" />
        <Ink d="M590,80H400C420,200 440,330 470,440H590Z" tone="b" />
        <path className="pl-f" d="M250,90V430M290,90V430M510,90V430M550,90V430" />
        <Ink d="M-10,510V440H810V510Z" tone="g" />
      </Scene>

      {/* 5. The runners, and the crowd who watch along the road. */}
      <Scene frame={frame} k={5}>
        <Cloud x={200} y={90} s={1.2} />
        <Cloud x={560} y={70} s={1} />
        <Ink d="M-10,510V320H810V510Z" tone="c" />
        <path className="pl-f" d="M0,430C260,420 540,410 800,400" />
        {/* Those who went before, watching from the side of the road. */}
        <Person x={80} y={340} s={0.9} robe="g" head="cloth" staff="staff" />
        <Person x={130} y={344} s={0.9} robe="b" head="veil" />
        <Person x={180} y={340} s={0.9} robe="c" cloak="g" head="cloth" />
        <Person x={230} y={346} s={0.7} robe="p" child />
        <Person x={280} y={340} s={0.9} robe="g" cloak="b" head="veil" />
        <Person x={330} y={344} s={0.9} robe="b" head="bare" />
        <Person x={380} y={340} s={0.9} robe="c" head="cloth" />
        <Person x={300} y={460} s={1.5} pose="walk" robe="b" cloak="g" head="bare" />
        <Person x={440} y={454} s={1.4} pose="walk" robe="p" head="veil" />
        <path className="pl-l" d="M680,420V300M740,416V296" />
        <Fade frame={frame} on={5} off={6} from="grow" at={4}>
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path className="pl-m" d="M680,312L740,308V318L680,322Z" />
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
