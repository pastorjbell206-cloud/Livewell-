/**
 * "What the church is": the family catechism's answer (Q46, Q60) and the
 * Church and the Spirit stop, in seven pictures.
 *
 *   0  People, not a building  a crowd in front of a faint building outline
 *   1  One body, many parts    the building gone; one line joins them all
 *   2  Living stones           stones laid course on course into one house
 *   3  A family                a house, a table, people seated round it
 *   4  Gathered                on the table: an open book, bread and a cup
 *   5  Sent out                roads from the house to the edges, people on them
 *   6  One Lord, many churches three different roofs on one ground, one light
 *
 * The one mustard mark: the lamp in the window (3 to 5), the flame over
 * every roof (6). No church building, rite or form of government is drawn
 * as the right one; the last picture keeps them side by side.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Flame, Seated, Standing, ring } from "./figures";

const CROWD: [number, number, "b" | "g" | "c"][] = [
  [244, 298, "b"],
  [296, 296, "c"],
  [348, 298, "g"],
  [400, 296, "b"],
  [452, 298, "c"],
  [504, 296, "g"],
  [556, 298, "b"],
];

/** The stones of the house, course by course: x, y, width; each a person. */
const STONES: [number, number, number][] = [
  [180, 370, 86],
  [270, 370, 86],
  [360, 370, 86],
  [450, 370, 86],
  [540, 370, 86],
  [225, 310, 86],
  [315, 310, 86],
  [405, 310, 86],
  [495, 310, 86],
  [270, 250, 86],
  [360, 250, 86],
  [450, 250, 86],
  [315, 190, 86],
  [405, 190, 86],
];

const house = (x: number, y: number, w: number) =>
  `M${x},${y}V${y - w * 0.55}L${x + w / 2},${y - w * 0.9}L${x + w},${y - w * 0.55}V${y}Z`;

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The ground. */}
      <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
      <path fill={h.h3} d="M0,448H800V500H0Z" />

      {/* 0. A building, faint behind the people: the church is not this. */}
      <Fade frame={frame} on={-1} off={1}>
        <path
          className="pl-f"
          d="M220,430V230L400,110L580,230V430ZM380,430V350a20,20 0 0 1 40,0V430Z"
          strokeDasharray="6 6"
        />
      </Fade>
      <Fade frame={frame} on={-1} off={2}>
        {CROWD.map(([x, y, t]) => (
          <Standing key={x} x={x} y={343 + (y - 296)} tone={t} s={1.4} />
        ))}
      </Fade>
      {/* 1. One body: a line joins every one of them. */}
      <Draw
        frame={frame}
        on={1}
        off={2}
        className="fp-thread"
        d="M262,396C280,380 290,380 300,392C312,380 330,380 350,396C366,380 384,380 400,392C414,380 432,380 450,396C466,380 484,380 500,392C514,380 532,380 538,396"
      />

      {/* 2. Living stones laid into one house, each stone a person. */}
      <Fade frame={frame} on={2} off={3}>
        <path className="pl-l" d="M300,180L400,110L500,180" />
      </Fade>
      {STONES.map(([x, y, w], n) => (
        <Fade
          key={`${x}-${y}`}
          frame={frame}
          on={2}
          off={3}
          from="down"
          delay={n * 120}
        >
          <Shape
            d={`M${x},${y + 56}V${y}H${x + w}V${y + 56}Z`}
            tone={(["c", "g", "b"] as const)[n % 3]}
            off={1.5}
          />
          <path className="pl-o" d={ring(x + w / 2, y + 24, 8)} />
          <path className="pl-l" d={ring(x + w / 2, y + 24, 8)} />
          <path
            className="pl-l"
            d={`M${x + w / 2 - 12},${y + 50}C${x + w / 2 - 10},${y + 36} ${x + w / 2 + 10},${y + 36} ${x + w / 2 + 12},${y + 50}`}
          />
        </Fade>
      ))}

      {/* 3 to 5. A house, a table, people seated round it. */}
      <Fade frame={frame} on={3} off={6}>
        <g className="ch-house">
          <Shape d={house(470, 430, 260)} tone="c" off={3} />
          <path fill={h.h1} d="M600,196L730,287V430H690Z" />
          <path className="pl-paper" d="M640,330H690V380H640Z" />
          <path className="pl-l" d="M640,330H690V380H640ZM665,330V380" />
          <path className="pl-k" d="M520,430V360h40v70Z" />
        </g>
      </Fade>
      <Fade frame={frame} on={3} off={6} delay={600}>
        <path className="pl-m" d="M650,372V346a8,8 0 0 1 16,0V372Z" />
      </Fade>
      <Fade frame={frame} on={3} off={5} from="up">
        {[170, 230, 290, 350, 400].map((x, n) => (
          <Seated
            key={x}
            x={x}
            y={342 + (n % 2) * 4}
            tone={(["g", "b", "c"] as const)[n % 3]}
          />
        ))}
        <Shape d="M140,372H420V388H140Z" tone="c" />
        <path className="pl-l" d="M160,388V430M400,388V430" />
      </Fade>
      {/* 4. Gathered: the open book, the bread and the cup. */}
      <Fade frame={frame} on={4} off={5} delay={300}>
        <Shape
          d="M200,372V356C212,352 224,353 234,358C244,353 256,352 268,356V372C256,368 244,369 234,374C224,369 212,368 200,372Z"
          tone="b"
          off={1}
        />
        <Shape d="M296,372a18,9 0 0 1 36,0Z" tone="c" off={1} />
        <Shape d="M350,372l4,-26h22l4,26Z" tone="b" off={1} />
      </Fade>
      {/* 5. Sent out: roads from the house to the edges, people on them. */}
      <Draw
        frame={frame}
        on={5}
        off={6}
        className="pl-l"
        d="M540,430C460,440 260,450 10,470M540,430C620,446 720,460 790,476"
      />
      <Fade frame={frame} on={5} off={6} from="left" delay={700}>
        <Standing x={130} y={398} tone="b" s={0.8} />
        <Standing x={270} y={392} tone="g" s={0.8} />
        <Standing x={420} y={386} tone="c" s={0.8} />
        <Standing x={720} y={398} tone="g" s={0.8} />
      </Fade>

      {/* 6. One Lord: three different roofs on one ground, one light over all. */}
      <Fade frame={frame} on={6} from="up">
        <Shape d={house(60, 430, 150)} tone="g" off={2} />
        <path className="pl-k" d="M118,430V394h34v36Z" />
        <Shape
          d="M290,430V300H330V250L350,230L370,250V300H510V430Z"
          tone="b"
          off={2}
        />
        <path className="pl-k" d="M386,430V390a14,14 0 0 1 28,0V430Z" />
        <Shape d="M590,430V350L660,320L730,350V430Z" tone="c" off={2} />
        <path className="pl-k" d="M646,430V392h28v38Z" />
        <path
          className="pl-f"
          d="M210,430C240,420 260,420 290,430M510,430C540,420 560,420 590,430"
        />
      </Fade>
      <Fade frame={frame} on={6} delay={900}>
        <Flame x={400} y={150} s={1.6} gold />
      </Fade>
    </>
  ),
};

export default film;
