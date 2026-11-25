/**
 * "Acts: to the ends of the earth": a film for one whole book, from the
 * book's own page (bible/notes/acts/intro.json) and its chapter notes.
 *
 *   0  What happened next        friends on a hill, looking up
 *   1  How it is laid out        from one room to Rome
 *   2  The Holy Spirit           the upper room at Pentecost
 *   3  Witnesses, and the cost   families scattered along three roads
 *   4  Every line crossed        Peter at the door of Cornelius
 *   5  Saul, called Paul         the road to Damascus
 *   6  Where to start            the reader and the open scroll
 *
 * God is never drawn, and the Spirit is never drawn as a person: he is one
 * flame and a wind that moves a curtain. Stephen's death is told in the
 * caption and is not drawn; the picture is of those who were scattered. No
 * crowd, court or attacker is drawn anywhere. The one mustard mark: the
 * light in the cloud (0), the rule under Pentecost (1), a flame (2), the sun
 * (3), the light on the road (5), the marker (6); the door (4) has none.
 */
import {
  Boat,
  CityWall,
  Cloud,
  Hills,
  House,
  Ink,
  Person,
  Rays,
  Sun,
} from "@/components/art/stage";
import { Ambient, Fade, type FilmDrawing } from "../motion";
import { FirstScene, Layout, Scene, StartReading } from "./book-parts";

/**
 * The chapters in each part of the second picture, the book page's
 * structure rounded to whole chapters: waiting and Pentecost (1 and 2),
 * witness in Jerusalem (3 to 7), Judea, Samaria and the door to the nations
 * (8 to 12), the first mission and the council (13 to 15), Paul's missions
 * round the Aegean (16 to 21), Paul on trial and the road to Rome (22 to 28).
 */
export const LAYOUT = [2, 5, 5, 3, 6, 7];

const CAMERA: [number, number, number][] = [
  [400, 280, 1.12],
  [400, 250, 1.06],
  [400, 320, 1.14],
  [400, 320, 1.12],
  [400, 330, 1.14],
  [380, 320, 1.14],
  [390, 360, 1.16],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A cloud hid him from their sight. */}
      <FirstScene frame={frame}>
        <path className="pl-paper" d="M400,40a60,60 0 1,0 0.1,0Z" />
        <Ambient frame={frame} on={-1} off={1} kind="glow">
          <path
            className="pl-m"
            d="M372,100a28,28 0 1,0 56,0a28,28 0 1,0 -56,0Z"
          />
        </Ambient>
        <Ambient frame={frame} on={-1} off={1} kind="drift" dx={24}>
          <Cloud x={400} y={150} s={2.6} />
        </Ambient>
        <Hills
          y={380}
          peaks={[
            [140, 20],
            [660, 40],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={690} y={352} w={150} s={0.6} />
        <Ink
          d="M-10,510V420C120,360 320,340 460,380C560,410 680,440 810,450V510Z"
          tone="g"
        />
        <Person x={200} y={440} s={1.5} pose="pray" robe="g" cloak="c" />
        <Person x={290} y={420} s={1.5} pose="open" robe="b" />
        <Person x={380} y={416} s={1.5} pose="pray" robe="c" cloak="b" />
        <Fade frame={frame} on={-1} off={1} from="up" at={4}>
          <Person
            x={470}
            y={436}
            s={1.5}
            pose="open"
            face={-1}
            robe="p"
            cloak="g"
          />
          <Person x={120} y={470} s={1.5} pose="pray" robe="c" head="veil" />
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
              <path
                className="pl-l"
                d={`M${mid},${top}c8,-10 10,-20 5,-32c-10,10 -13,22 -5,32Z`}
              />
            ) : i === 1 ? (
              <CityWall x={mid} y={top} w={80} s={0.4} />
            ) : i === 2 ? (
              <path
                className="pl-l"
                d={`M${mid - 34},${top}C${mid - 14},${top - 26} ${mid + 6},${top - 4} ${mid + 34},${top - 30}`}
              />
            ) : i === 3 ? (
              <Boat x={mid} y={top + 4} s={0.5} />
            ) : i === 4 ? (
              <Ink
                d={`M${mid - 8},${top}v-34h16v34ZM${mid - 14},${top - 34}h28v-6h-28ZM${mid - 14},${top}h28`}
                tone="c"
              />
            ) : (
              <House x={mid} y={top} s={0.42} />
            )
          }
        />
      </Scene>

      {/* 2. Pentecost. */}
      <Scene frame={frame} k={2}>
        <Ink d="M-10,400V80H810V400Z" tone="c" hatch={h.hs} />
        <path className="pl-l" d="M-10,80H810" />
        {/* The window, and the curtain the wind moves. */}
        <path className="pl-paper" d="M580,150h120v130h-120Z" />
        <path className="pl-l" d="M580,150h120v130h-120Z" />
        <Ambient frame={frame} on={2} off={3} kind="sway">
          <Ink d="M580,150C610,190 590,230 620,280H580Z" tone="b" />
        </Ambient>
        <path className="pl-f" d="M600,200h70M610,230h80M596,260h60" />
        <Ink d="M-10,510V400H810V510Z" tone="b" />
        <path className="pl-f" d="M0,440H800M0,476H800" />
        <Fade frame={frame} on={2} off={3} from="grow" at={3}>
          <Ambient frame={frame} on={2} off={3} kind="flicker">
            <path
              className="pl-m"
              d="M330,250C352,220 360,196 348,164C324,188 312,220 330,250Z"
            />
            <path
              className="pl-f"
              d="M330,250C352,220 360,196 348,164C324,188 312,220 330,250Z"
            />
          </Ambient>
        </Fade>
        <Person x={170} y={472} s={1.5} pose="pray" robe="g" cloak="c" />
        <Person x={260} y={480} s={1.5} pose="pray" robe="b" head="veil" />
        <Person x={350} y={470} s={1.5} pose="open" robe="c" cloak="b" />
        <Person
          x={440}
          y={480}
          s={1.5}
          pose="pray"
          face={-1}
          robe="p"
          cloak="g"
        />
        <Person
          x={520}
          y={472}
          s={1.5}
          pose="pray"
          face={-1}
          robe="c"
          head="veil"
        />
      </Scene>

      {/* 3. Scattered, and telling the news as they went. */}
      <Scene frame={frame} k={3}>
        <Fade frame={frame} on={3} off={4} at={4}>
          <Ambient frame={frame} on={3} off={4} kind="glow">
            <Sun x={660} y={110} r={34} gold />
          </Ambient>
        </Fade>
        <Hills
          y={360}
          peaks={[
            [520, 30],
            [720, 50],
          ]}
          tone="g"
          hatch={h.hs}
        />
        <CityWall x={150} y={380} w={260} s={1.1} hatch={h.h3} />
        <Ink d="M-10,510V390C240,376 560,380 810,390V510Z" tone="c" />
        {/* The three roads. */}
        <path
          className="pl-f"
          d="M150,390C260,400 420,380 560,330C640,300 720,290 800,286M150,390C300,430 520,440 800,430M150,390C240,440 360,480 520,500"
        />
        <Fade frame={frame} on={3} off={4} from="left" at={3}>
          <Person
            x={420}
            y={372}
            s={1.0}
            pose="walk"
            robe="b"
            cloak="c"
            bundle
          />
          <Person x={470} y={360} s={0.9} pose="walk" robe="g" head="veil" />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" at={6}>
          <Person
            x={560}
            y={448}
            s={1.3}
            pose="walk"
            robe="c"
            cloak="g"
            staff="staff"
          />
          <Person
            x={630}
            y={452}
            s={1.3}
            pose="walk"
            robe="p"
            head="veil"
            bundle
          />
          <Person
            x={690}
            y={458}
            s={0.9}
            pose="walk"
            robe="b"
            child
            head="bare"
          />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" at={9}>
          <Person
            x={340}
            y={488}
            s={1.4}
            pose="walk"
            robe="g"
            cloak="b"
            bundle
          />
        </Fade>
      </Scene>

      {/* 4. Peter at the door of Cornelius. */}
      <Scene frame={frame} k={4}>
        <Sun x={130} y={90} r={22} />
        <Ink d="M330,410V110H810V410Z" tone="c" hatch={h.hs} />
        <path
          className="pl-paper"
          d="M440,410V230C440,180 560,180 560,230V410Z"
        />
        <path
          className="pl-l"
          d="M440,410V230C440,180 560,180 560,230V410M320,110H810"
        />
        <Ink d="M330,410V150H366V410ZM634,410V150H670V410Z" tone="c" />
        <path className="pl-l" d="M322,150H374M626,150H678" />
        <Ink d="M-10,510V410H810V510Z" tone="b" />
        <path className="pl-f" d="M0,446H800M0,480H800" />
        <Person x={250} y={478} s={1.7} pose="open" robe="g" cloak="c" />
        <Person
          x={500}
          y={478}
          s={1.7}
          pose="open"
          face={-1}
          robe="b"
          cloak="c"
          head="bare"
        />
        <Fade frame={frame} on={4} off={5} from="right" at={4}>
          <Person x={600} y={480} s={1.5} face={-1} robe="c" head="veil" />
          <Person
            x={670}
            y={486}
            s={1.0}
            face={-1}
            robe="g"
            child
            head="bare"
          />
          <Person
            x={740}
            y={480}
            s={1.5}
            face={-1}
            robe="p"
            cloak="g"
            head="bare"
          />
        </Fade>
      </Scene>

      {/* 5. The road to Damascus. */}
      <Scene frame={frame} k={5}>
        <Fade frame={frame} on={5} off={6} from="down" at={3}>
          <path className="pl-paper" d="M260,0H460L560,420H160Z" />
          <Ambient frame={frame} on={5} off={6} kind="glow">
            <path className="pl-m" d="M300,0H420L440,40H280Z" />
          </Ambient>
          <Rays x={360} y={36} reach={260} spread={110} n={9} />
        </Fade>
        <Hills
          y={370}
          peaks={[
            [600, 40],
            [740, 20],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <CityWall x={690} y={346} w={150} s={0.6} />
        <Ink d="M-10,510V400C240,388 560,392 810,380V510Z" tone="c" />
        <path
          className="pl-f"
          d="M0,470C240,450 500,420 660,350M40,500C280,470 540,440 700,350"
        />
        <Person x={360} y={474} s={1.7} pose="kneel" robe="b" cloak="g" />
        <Fade frame={frame} on={5} off={6} from="left" at={5}>
          <Person x={150} y={470} s={1.4} face={1} robe="c" staff="staff" />
          <Person x={80} y={480} s={1.4} robe="g" cloak="c" />
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
