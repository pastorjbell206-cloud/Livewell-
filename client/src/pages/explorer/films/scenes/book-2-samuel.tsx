/**
 * "2 Samuel: the king and the promise": a film for one whole book, from the
 * book's own page (bible/notes/2-samuel/intro.json) and its chapter notes.
 *
 *   0  King David                   the king before Jerusalem
 *   1  How it is laid out           five parts, the hinge at 11 and 12
 *   2  A crown not seized           the ark carried up, David dancing
 *   3  A house for David            the king kneeling by the tent at night
 *   4  "You are that man!"          Nathan before the king on his throne
 *   5  The sword in David's house   David going up the Mount of Olives
 *   6  Where to start               the reader and the open scroll
 *
 * Bathsheba, Uriah, Tamar and Absalom are not drawn, and nothing of what was
 * done to them is pictured: they are named at the older level only, in the
 * book page's words. No battle, weapon, wound or death is drawn. God is
 * never drawn. David wears the same robe and cloak in every picture; his
 * crown is gold where it is the picture's one mark (0, 4). The one mustard
 * mark: the crown (0, 4), the rule under the hinge (1), the ark (2), a star
 * (3), the marker (6); the hillside (5) has none.
 */
import {
  CityWall,
  Grass,
  Hills,
  Ink,
  Person,
  Scroll,
  Stars,
  Sun,
  Tent,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, GoldStar, Layout, Scene, StartReading } from "./book-parts";

/** The book page's five parts: 1-4, 5-10, 11-12, 13-20, 21-24. */
export const LAYOUT = [4, 6, 2, 8, 4];

const David = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "open" | "kneel" | "sit";
  crown?: boolean;
  gold?: boolean;
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    pose={p.pose}
    robe="b"
    cloak="g"
    head={p.crown ? "crown" : "cloth"}
    gold={p.gold}
  />
);

const CAMERA: [number, number, number][] = [
  [400, 320, 1.1],
  [400, 250, 1.06],
  [400, 320, 1.1],
  [400, 320, 1.12],
  [400, 320, 1.12],
  [400, 320, 1.1],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). The king before Jerusalem. */}
      <FirstScene frame={frame}>
        <Sun x={110} y={90} r={22} />
        <Hills
          y={300}
          peaks={[
            [520, 120],
            [740, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <CityWall x={540} y={220} w={300} s={0.9} hatch={h.h3} />
        <Ink d="M-10,510V340C240,330 560,330 810,340V510Z" tone="c" />
        <path className="pl-f" d="M800,470C640,440 560,360 540,224" />
        <Fade frame={frame} on={-1} off={1} from="right" at={4}>
          <Person x={640} y={430} s={1} face={-1} pose="walk" robe="g" head="veil" />
          <Person x={700} y={452} s={1.1} face={-1} pose="walk" robe="p" head="cloth" bundle />
        </Fade>
        <David x={260} y={470} s={1.9} crown gold />
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
                d={`M${mid - 12},${top}L${mid + 12},${top}L${mid - 4},${top - 30}ZM${mid - 6},${top}l3,-22M${mid},${top}l2,-14M${mid + 6},${top}l1,-6`}
              />
            ) : i === 1 ? (
              <Ink
                d={`M${mid - 30},${top}v-20h6v-6h6v6h6v-6h6v6h6v-6h6v6h6v-6h6v6h6v20Z`}
                tone="c"
              />
            ) : i === 2 ? (
              <Ink d={`M${mid - 14},${top}v-14l7,8l7,-12l7,12l7,-8v14Z`} tone="c" />
            ) : i === 3 ? (
              <Ink
                d={`M${mid - 18},${top}l4,-30h28l4,30l-8,-6l-6,6l-6,-6l-6,6l-6,-6Z`}
                tone="b"
              />
            ) : (
              <Scroll x={mid} y={top} s={0.5} />
            )
          }
        />
      </Scene>

      {/* 2. The ark carried up to the city; David dancing before it. */}
      <Scene frame={frame} k={2}>
        <Hills
          y={300}
          peaks={[
            [620, 100],
            [780, 60],
          ]}
          tone="b"
          hatch={h.hs}
        />
        <CityWall x={660} y={230} w={220} s={0.7} hatch={h.h3} />
        <Ink d="M-10,510V360C240,350 560,350 810,360V510Z" tone="g" />
        <Person x={160} y={470} s={1.4} robe="c" head="cloth" pose="hold" />
        <Person x={280} y={470} s={1.4} robe="c" head="cloth" pose="hold" />
        <path className="pl-l" d="M140,378H300" />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <path className="pl-m" d="M194,370h52v-30h-52Z" />
          <path className="pl-f" d="M194,370h52v-30h-52ZM190,336h60" />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="left" at={5}>
          <Ambient frame={frame} on={2} off={3} kind="bob">
            <Person x={460} y={466} s={1.7} pose="open" robe="p" head="bare" />
          </Ambient>
        </Fade>
        <Grass
          at={[
            [580, 470],
            [740, 480],
          ]}
        />
      </Scene>

      {/* 3. The king kneeling by the tent at night. */}
      <Scene frame={frame} k={3}>
        <Ink d="M-10,-10H810V400H-10Z" tone="b" hatch={h.hs} />
        <Stars
          at={[
            [90, 60, 5],
            [200, 120, 4],
            [320, 50, 5],
            [520, 90, 4],
            [700, 60, 5],
          ]}
        />
        <Fade frame={frame} on={3} off={4} from="grow" at={4}>
          <Ambient frame={frame} on={3} off={4} kind="twinkle">
            <GoldStar x={610} y={130} r={10} />
          </Ambient>
        </Fade>
        <Ink d="M-10,510V400C240,392 560,392 810,400V510Z" tone="g" />
        <Tent x={230} y={450} s={1.6} hatch={h.h3} />
        <David x={470} y={470} s={1.7} pose="kneel" face={-1} />
      </Scene>

      {/* 4. Nathan before the king on his throne. */}
      <Scene frame={frame} k={4}>
        <Ink d="M-10,-10H810V400H-10Z" tone="c" hatch={h.h3} />
        <path className="pl-l" d="M120,400V100M680,400V100M100,100H700" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        {/* The throne. */}
        <Ink d="M500,470V300h80v170h-14v-90h-52v90Z" tone="c" />
        <David x={540} y={470} s={1.6} pose="sit" face={-1} crown gold />
        <Fade frame={frame} on={4} off={5} from="left" at={3}>
          <Person
            x={300}
            y={474}
            s={1.8}
            pose="reach"
            robe="c"
            cloak="b"
            head="cloth"
            staff="staff"
          />
        </Fade>
      </Scene>

      {/* 5. David going up the Mount of Olives, weeping, his head covered. */}
      <Scene frame={frame} k={5}>
        <Ink d="M-10,510V300C200,260 500,200 810,170V510Z" tone="g" hatch={h.hs} />
        <path className="pl-f" d="M40,480C240,420 480,320 760,240" />
        <David x={560} y={330} s={1.4} pose="walk" />
        <Fade frame={frame} on={5} off={6} from="left" at={4}>
          <Person x={440} y={374} s={1.3} pose="walk" robe="c" head="veil" />
          <Person x={330} y={410} s={1.3} pose="walk" robe="p" cloak="b" head="cloth" />
          <Person x={220} y={444} s={1.3} pose="walk" robe="g" head="cloth" />
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
