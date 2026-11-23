/**
 * "John 3:16 in its chapter": the verse read where it was said, as the Study
 * Bible's notes on John 3 read it, in seven pictures drawn with the stage set.
 *
 *   0  A visitor at night      Nicodemus comes to Jesus by lamplight
 *   1  Born again              the two talking; wind through the window
 *   2  Lifted up               the bronze snake in the wilderness
 *   3  God so loved the world  dawn over a town; the cross before the sun
 *   4  Everyone who believes   one person looking up, hands open
 *   5  Not to condemn          a lit doorway, arms open, people coming in
 *   6  Out of the dark         Nicodemus by day, carrying spices
 *
 * Nicodemus is the same figure throughout (blue robe, olive cloak, a staff).
 * Jesus is one plain figure, as in the other films, and nothing is said or
 * drawn about how Nicodemus's story ends beyond what John tells. The one
 * mustard mark: the lamp's flame (0, 1), the sun (3, 6), the line of light round the doorway (5).
 */
import type { ReactNode } from "react";
import {
  Cloud,
  Grass,
  Hills,
  House,
  Ink,
  Jar,
  Lamp,
  Moon,
  Person,
  Rays,
  Stars,
  Sun,
  Tent,
} from "@/components/art/stage";
import { Ambient, Draw, Fade, type FilmDrawing } from "../motion";

const Scene = ({
  frame,
  k,
  children,
}: {
  frame: number;
  k: number;
  children: ReactNode;
}) => (
  <Fade frame={frame} on={k} off={k + 1}>
    <path className="pl-paper" d="M0,0H800V500H0Z" />
    {children}
  </Fade>
);

const Nicodemus = (p: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  pose?: "stand" | "walk" | "sit";
}) => (
  <Person
    x={p.x}
    y={p.y}
    s={p.s ?? 1.6}
    face={p.face}
    robe="b"
    cloak="g"
    pose={p.pose}
    staff={p.pose === "sit" ? undefined : "staff"}
  />
);

/** The room at night: a window on the stars, a lamp on its shelf. */
function Room({
  h,
  frame,
  on,
}: {
  h: { h2: string; h3: string };
  frame: number;
  on: number;
}) {
  return (
    <>
      <path className="pl-f" d="M0,70H800M0,74H800" />
      <Ink d="M-10,510V430H810V510Z" tone="g" />
      <path fill={h.h3} d="M0,450H800V500H0Z" />
      <Ink d="M330,290V110H490V290Z" tone="b" />
      <path className="fp-dark" fill={h.h2} d="M342,278V122H478V278Z" />
      <path className="pl-l" d="M342,278V122H478V278Z" />
      <Moon x={446} y={156} r={13} />
      <Ambient frame={frame} on={on} off={on + 1} kind="twinkle">
        <Stars
          at={[
            [376, 160, 5],
            [410, 230, 4],
            [366, 250, 3],
          ]}
        />
      </Ambient>
      <Ambient frame={frame} on={on} off={on + 1} kind="flicker">
        <Lamp x={206} y={280} s={1.5} gold />
      </Ambient>
      <path className="pl-l" d="M170,282H246" />
    </>
  );
}

const CAMERA: [number, number, number][] = [
  [400, 330, 1.12],
  [400, 340, 1.22],
  [420, 300, 1.15],
  [520, 300, 1.1],
  [360, 320, 1.2],
  [400, 330, 1.15],
  [480, 310, 1.12],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  push: frame => CAMERA[frame] ?? null,
  draw: (h, frame) => (
    <>
      {/* 0 (and the poster). A visitor at night. */}
      <Fade frame={frame} on={-1} off={1}>
        <Room h={h} frame={frame} on={-1} />
        <Ink d="M650,430V200H740V430Z" tone="c" />
        <path className="fp-dark" fill={h.h1} d="M662,430V212H728V430Z" />
        <Person x={250} y={436} s={1.75} pose="sit" robe="p" cloak="b" />
        <Fade frame={frame} on={-1} off={1} from="walk-right" at={2}>
          <Nicodemus x={600} y={446} face={-1} pose="walk" />
        </Fade>
      </Fade>

      {/* 1. Born again: the wind blows where it wishes. */}
      <Scene frame={frame} k={1}>
        <Room h={h} frame={frame} on={1} />
        <Person x={250} y={436} s={1.75} pose="sit" robe="p" cloak="b" />
        <Nicodemus x={570} y={436} s={1.75} face={-1} pose="sit" />
        <Draw
          frame={frame}
          on={1}
          off={2}
          at={5}
          slow={5}
          className="pl-f"
          d="M800,150C700,130 600,200 480,170C420,154 380,190 300,170C240,156 180,200 100,180"
        />
        <Draw
          frame={frame}
          on={1}
          off={2}
          at={7}
          slow={5}
          className="pl-f"
          d="M800,200C690,186 610,250 500,216C430,196 370,240 290,220C230,206 170,244 60,230"
        />
      </Scene>

      {/* 2. Lifted up: the bronze snake in the wilderness. */}
      <Scene frame={frame} k={2}>
        <Sun x={110} y={90} r={26} />
        <Hills
          y={390}
          peaks={[
            [180, 30],
            [640, 50],
          ]}
          tone="c"
          hatch={h.hs}
        />
        <Tent x={110} y={380} s={0.9} hatch={h.h3} />
        <Tent x={700} y={372} s={0.9} hatch={h.h3} />
        {/* The pole and the snake on it. */}
        <path className="pl-l" d="M420,440V150M388,186H452" />
        <Draw
          frame={frame}
          on={2}
          off={3}
          at={3}
          slow={4}
          className="fp-snake"
          d="M420,320C380,300 460,280 420,256C380,232 460,214 424,190C410,180 400,170 410,160"
        />
        <Person x={300} y={446} s={1.6} robe="c" cloak="b" staff="staff" />
        <Fade frame={frame} on={2} off={3} from="up" at={7}>
          <Person x={540} y={452} s={1.5} pose="kneel" face={-1} robe="g" />
          <Person
            x={640}
            y={458}
            s={1.5}
            pose="kneel"
            face={-1}
            head="veil"
            robe="b"
          />
          <Person
            x={590}
            y={476}
            s={1}
            child
            head="bare"
            pose="kneel"
            face={-1}
            robe="c"
          />
        </Fade>
      </Scene>

      {/* 3. God so loved the world. */}
      <Scene frame={frame} k={3}>
        <Ambient frame={frame} on={3} off={4} kind="glow">
          <Sun x={600} y={170} r={52} gold />
        </Ambient>
        <Hills
          y={380}
          peaks={[
            [180, 20],
            [600, 150],
          ]}
          hatch={h.hs}
        />
        <path className="pl-k" d="M594,236V110h12v126ZM564,142h72v12h-72Z" />
        <House x={110} y={392} s={1.1} hatch={h.h3} />
        <House x={270} y={404} s={1.3} hatch={h.h3} />
        <House x={430} y={398} s={1} hatch={h.h3} />
        <Fade frame={frame} on={3} off={4} from="up" at={6}>
          <Person x={180} y={460} s={1.25} robe="c" pose="reach" />
          <Person
            x={360}
            y={466}
            s={1.3}
            head="veil"
            robe="b"
            cloak="c"
            pose="reach"
          />
          <Person x={520} y={458} s={1.25} robe="g" pose="reach" />
          <Person x={440} y={480} s={0.85} child head="bare" robe="c" />
          <Person x={700} y={460} s={1.25} robe="b" face={-1} pose="reach" />
        </Fade>
      </Scene>

      {/* 4. Everyone who believes. */}
      <Scene frame={frame} k={4}>
        <Rays x={560} y={-10} reach={230} spread={130} n={9} />
        <Hills
          y={390}
          peaks={[
            [200, 20],
            [600, 140],
          ]}
          hatch={h.hs}
        />
        <path className="pl-k" d="M594,256V140h12v116ZM566,170h68v11h-68Z" />
        <Person x={300} y={448} s={2} pose="kneel" robe="c" cloak="b" />
        <Grass
          at={[
            [90, 450],
            [480, 470],
            [720, 440],
          ]}
        />
      </Scene>

      {/* 5. Not to condemn, but to save. */}
      <Scene frame={frame} k={5}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V500H0Z" />
        <Ink d="M300,470V110H500V470Z" tone="c" />
        <path
          className="pl-paper fp-light"
          d="M324,470V150C324,96 476,96 476,150V470Z"
        />
        <path className="pl-l" d="M324,470V150C324,96 476,96 476,150V470" />
        <path
          className="fp-gold"
          d="M338,470V152C338,112 462,112 462,152V470"
        />
        <Ink d="M-10,510V470H810V510Z" tone="g" />
        <Person x={400} y={468} s={1.9} pose="open" robe="p" cloak="b" />
        <Fade frame={frame} on={5} off={6} from="walk-left" at={3}>
          <Person x={170} y={478} s={1.4} pose="walk" robe="b" />
          <Person
            x={90}
            y={484}
            s={1.3}
            pose="walk"
            head="veil"
            robe="c"
            bundle
          />
        </Fade>
        <Fade frame={frame} on={5} off={6} from="walk-right" at={6}>
          <Person
            x={640}
            y={478}
            s={1.4}
            face={-1}
            pose="walk"
            robe="g"
            cloak="c"
          />
          <Person
            x={716}
            y={486}
            s={0.95}
            face={-1}
            child
            head="bare"
            robe="b"
          />
        </Fade>
      </Scene>

      {/* 6. Out of the dark: Nicodemus by day. */}
      <Scene frame={frame} k={6}>
        <Ambient frame={frame} on={6} kind="glow">
          <Sun x={120} y={100} r={30} gold />
        </Ambient>
        <Ambient frame={frame} on={6} kind="drift" dx={50}>
          <Cloud x={380} y={70} s={1.2} />
        </Ambient>
        <Hills
          y={390}
          peaks={[
            [200, 20],
            [560, 130],
          ]}
          hatch={h.hs}
        />
        <path className="pl-k" d="M554,266V150h12v116ZM526,180h68v11h-68Z" />
        <Ink d="M650,392C650,326 770,326 770,392Z" tone="b" hatch={h.hs} />
        <path className="pl-k" d="M688,392V366C688,348 728,348 728,366V392Z" />
        <path
          className="pl-f"
          d="M0,470C200,440 420,430 540,300M60,500C260,460 470,440 560,300"
        />
        <Fade frame={frame} on={6} from="walk-left" at={3}>
          <Nicodemus x={300} y={452} pose="walk" />
          <Jar x={352} y={404} s={0.9} />
        </Fade>
      </Scene>
    </>
  ),
};

export default film;
