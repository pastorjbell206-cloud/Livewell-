/**
 * "What sin is": the family catechism (Q14 to Q17, Q59, Q74) and the Fall
 * stop's four broken relationships, in six pictures.
 *
 *   0  Made to love      a person joined by four lines: up to the light, across to
 *                        another person, down to a young plant, and round themself
 *   1  Not trusting      a tree with fruit; a dashed reach toward it; the line up thins
 *   2  What it breaks    each line breaks; the plant becomes thorns
 *   3  What sin is       the broken ends, and a tight loop round the person: turned in
 *   4  Everyone          a crowd of every size, each with a broken line
 *   5  God comes looking a light (the one mustard mark, never a figure) comes along
 *                        a path to a person sitting alone; the line is joined in gold
 *
 * God is never drawn: light from beyond the edge, and the light on the path.
 * No one is drawn as bad: the people are the same people throughout.
 */
import { Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Seated, Standing, ring } from "./figures";

const UP = "M400,170V24";
const ACROSS = "M424,270H612";
const DOWN = "M380,300C320,340 260,368 214,384";
const SELF =
  "M400,170C470,170 488,250 470,320C452,380 348,380 330,320C312,250 330,170 400,170Z";

/** The same four lines, each broken with a gap. */
const UP_BROKEN = "M400,170V120M400,84V24";
const ACROSS_BROKEN = "M424,270H498M540,270H612";
const DOWN_BROKEN =
  "M380,300C356,316 334,330 312,342M268,362C248,372 230,378 214,384";
const SELF_BROKEN =
  "M400,170C452,170 476,214 478,256M466,330C446,380 352,380 334,330M322,262C320,214 344,170 380,170";

const CROWD: [number, number, number, "b" | "g" | "c"][] = [
  [110, 220, 1.3, "b"],
  [190, 250, 0.95, "c"],
  [270, 212, 1.4, "g"],
  [350, 248, 1.0, "b"],
  [430, 206, 1.45, "c"],
  [510, 240, 1.1, "g"],
  [590, 214, 1.35, "b"],
  [670, 252, 0.9, "c"],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The ground. */}
      <Shape d="M0,500V384C200,372 600,372 800,384V500Z" tone="g" off={2} />
      <path fill={h.h2} d="M0,470H800V500H0Z" />
      {/* The light from beyond the top edge. */}
      <Fade frame={frame} on={-1} off={4}>
        <path
          className="pl-f"
          d="M400,0V14M360,0L380,16M440,0L420,16M320,0L360,20M480,0L440,20"
        />
      </Fade>

      {/* The person, and the other person and the young plant they are joined to. */}
      <Fade frame={frame} on={-1} off={4}>
        <Standing x={400} y={230} tone="c" s={1.6} />
      </Fade>
      <Fade frame={frame} on={-1} off={4}>
        <Standing x={650} y={240} tone="b" s={1.4} />
      </Fade>
      <Fade frame={frame} on={-1} off={2}>
        <Shape d="M178,392a26,8 0 0 1 52,0Z" tone="c" off={1.5} />
        <path
          className="pl-l"
          d="M204,388V346M204,370l-14,-10M204,358l14,-12"
        />
      </Fade>

      {/* 0. Four lines joining them: to God, to each other, to the world, to themself. */}
      <Fade frame={frame} on={-1} off={0}>
        <path className="fp-thread" d={UP} />
        <path className="fp-thread" d={ACROSS} />
        <path className="fp-thread" d={DOWN} />
        <path className="fp-thread" d={SELF} />
      </Fade>
      <Draw frame={frame} on={0} off={1} className="fp-thread" d={UP} />
      <Draw
        frame={frame}
        on={0}
        off={2}
        className="fp-thread"
        d={ACROSS}
        delay={300}
      />
      <Draw
        frame={frame}
        on={0}
        off={2}
        className="fp-thread"
        d={DOWN}
        delay={600}
      />
      <Draw
        frame={frame}
        on={0}
        off={2}
        className="fp-thread"
        d={SELF}
        delay={900}
      />

      {/* 1. Not trusting: the tree with its fruit, the reach toward it; the line up thins. */}
      <Fade frame={frame} on={1} off={2}>
        <path className="pl-f" strokeDasharray="4 6" d={UP} />
      </Fade>
      <Fade frame={frame} on={1} off={3} from="left">
        <Shape d="M132,330V230h14v100Z" tone="c" off={2} />
        <Shape
          d="M88,210C84,170 120,150 140,156C164,146 196,170 190,202C198,226 170,244 140,236C110,246 82,232 88,210Z"
          tone="g"
          off={3}
        />
        <Shape d={ring(170, 226, 9)} tone="c" off={1} />
        <Shape d={ring(112, 196, 8)} tone="c" off={1} />
      </Fade>
      <Draw
        frame={frame}
        on={1}
        off={2}
        className="pl-l"
        delay={500}
        d="M378,252C320,248 240,236 182,228"
      />

      {/* 2 to 3. Every line broken; thorns where the plant was. */}
      <Fade frame={frame} on={2} off={4}>
        <path className="fp-thread" d={UP_BROKEN} />
        <path className="fp-thread" d={ACROSS_BROKEN} />
        <path className="fp-thread" d={DOWN_BROKEN} />
      </Fade>
      <Fade frame={frame} on={2} off={3}>
        <path className="fp-thread" d={SELF_BROKEN} />
      </Fade>
      <Fade frame={frame} on={2} off={4} delay={500}>
        <path
          className="pl-l"
          d="M170,394l10,-20l6,8l6,-16l7,12l6,-18l6,14l8,-10l6,16l8,-12"
        />
      </Fade>
      {/* 3. Turned in on themself: a tight loop round the person. */}
      <Draw
        frame={frame}
        on={3}
        off={4}
        className="fp-thread"
        d="M400,216C440,216 446,262 440,300C434,336 366,336 360,300C354,262 360,216 400,216"
      />

      {/* 4. Everyone: a crowd, each with a broken line beside them. */}
      <Fade frame={frame} on={4} off={5} from="up">
        {CROWD.map(([x, y, s, t]) => (
          <g key={x}>
            <Standing x={x} y={y} tone={t} s={s} />
            <path
              className="pl-l"
              d={`M${x + 22 * s},${y + 6}l10,-10M${x + 36 * s},${y - 8}l10,-10`}
            />
          </g>
        ))}
      </Fade>

      {/* 5. God comes looking: a path, a person sitting alone, the light coming along it. */}
      <Fade frame={frame} on={5}>
        <path
          className="pl-o"
          d="M800,330C680,340 560,352 460,368C380,380 320,388 240,396V424C330,416 420,406 500,394C600,380 700,372 800,368Z"
        />
        <path
          className="pl-l"
          d="M800,330C680,340 560,352 460,368C380,380 320,388 240,396M240,424C330,416 420,406 500,394C600,380 700,372 800,368"
        />
        <Seated x={200} y={340} tone="c" body={44} />
        <path className="fp-thread" d="M222,370H262M300,370H340" />
      </Fade>
      <Travel
        frame={frame}
        at={[
          [920, 300],
          [920, 300],
          [920, 300],
          [920, 300],
          [920, 300],
          [370, 380],
        ]}
      >
        <g>
          <path
            className="pl-f"
            strokeDasharray="3 5"
            d="M-24,0a24,24 0 1,0 48,0a24,24 0 1,0 -48,0ZM-40,0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0Z"
          />
          <path
            className="pl-m"
            d="M-12,0a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z"
          />
          <path
            className="pl-l"
            d="M-12,0a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z"
          />
        </g>
      </Travel>
      <Draw
        frame={frame}
        on={5}
        className="fp-gold"
        delay={1600}
        d="M222,370H340"
      />
    </>
  ),
};

export default film;
