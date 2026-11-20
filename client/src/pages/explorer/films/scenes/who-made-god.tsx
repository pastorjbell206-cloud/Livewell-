/**
 * "Who made God?": a child's question, taken seriously, built on the site's
 * own answer (the Honest Answer "Does God actually exist?", its argument from
 * why anything exists at all; and the family catechism's question 3, "God is
 * the Spirit who never began and never ends").
 *
 * A row of links, each a thing that came from the thing before it (a tree, a
 * seed, a tree, the earth, the sun), traced back to the left until it runs off
 * the page. Then the whole row is drawn smaller inside a frame: all of it
 * together could have not been at all. Then light comes in from outside the
 * picture's own edge and the frame rests in it. The light is never drawn as a
 * thing in the row, a hand or a face; it has no edge inside the picture. Then
 * mountains rise beneath a light already there (Psalm 90:2), and last the bush
 * that burned and was not burned up (Exodus 3:2, 14).
 *
 * The one mustard mark: the small ring that traces the row back (frames 0 and
 * 1), then the light (2 to 4), then the flame in the bush (5).
 */
import type { ReactNode } from "react";
import { Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Flame, ring } from "./figures";

const Y = 250;
const R = 44;

/** The things in the row, right to left: each came from the one to its left. */
function Tree({ x }: { x: number }) {
  return (
    <>
      <Shape d={`M${x - 4},${Y + 30}V${Y + 6}h8V${Y + 30}Z`} tone="c" off={1.5} />
      <Shape d={`M${x - 22},${Y - 4}a22,18 0 1,0 44,0a22,18 0 1,0 -44,0Z`} tone="g" off={2} />
    </>
  );
}
function Seed({ x }: { x: number }) {
  return (
    <>
      <path className="pl-l" d={`M${x - 26},${Y + 22}H${x + 26}`} />
      <Shape d={`M${x},${Y - 16}C${x + 14},${Y - 6} ${x + 14},${Y + 12} ${x},${Y + 18}C${x - 14},${Y + 12} ${x - 14},${Y - 6} ${x},${Y - 16}Z`} tone="c" off={1.5} />
      <path className="pl-f" d={`M${x},${Y - 12}V${Y + 14}`} />
    </>
  );
}
function Earth({ x, hatch }: { x: number; hatch: string }) {
  return (
    <>
      <Shape d={ring(x, Y, 28)} tone="b" off={2} />
      <path fill={hatch} d={`M${x},${Y - 28}a28,28 0 0 1 0,56Z`} />
      <path className="pl-f" d={`M${x - 18},${Y - 10}c8,-4 12,4 20,0M${x - 6},${Y + 8}c8,-4 14,4 22,0M${x - 20},${Y + 16}c6,-2 8,2 12,0`} />
    </>
  );
}
function Sun({ x }: { x: number }) {
  return (
    <>
      <path
        className="pl-l"
        d={`M${x},${Y - 34}V${Y - 26}M${x},${Y + 26}V${Y + 34}M${x - 34},${Y}H${x - 26}M${x + 26},${Y}H${x + 34}M${x - 24},${Y - 24}l6,6M${x + 18},${Y + 18}l6,6M${x + 24},${Y - 24}l-6,6M${x - 18},${Y + 18}l-6,6`}
      />
      <Shape d={ring(x, Y, 18)} tone="c" off={2} />
    </>
  );
}

/** A link of the row: a paper ring with its thing inside. */
function Link({ x, children }: { x: number; children: ReactNode }) {
  return (
    <>
      <path className="pl-o" d={ring(x, Y, R)} />
      {children}
      <path className="pl-l" d={ring(x, Y, R)} />
    </>
  );
}
/** The joint between two links, like two rings of a chain. */
const joint = (x: number) =>
  `M${x - 18},${Y}a10,7 0 1,0 20,0a10,7 0 1,0 -20,0ZM${x - 2},${Y}a10,7 0 1,0 20,0a10,7 0 1,0 -20,0Z`;

/** Where the tracing ring stands (poster, then frames 0 and 1, then hidden). */
const TRACE: [number, number][] = [
  [660, Y],
  [540, Y],
  [40, Y],
];

/** The rays of the light, from beyond the top of the picture down to the frame. */
const RAYS = Array.from({ length: 7 }, (_, n) => {
  const top = 352 + n * 16;
  const foot = 196 + n * 68;
  return `M${top - 3},0L${top + 3},0L${foot + 7},212L${foot - 7},212Z`;
}).join("");

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const k = frame + 1;
    return (
      <>
        <path fill={h.hs} d="M0,0H800V500H0Z" />

        {/* 3 on: the light, a clear space from beyond the top edge, round the frame. */}
        <Fade frame={frame} on={3}>
          <path
            className="pl-paper"
            d="M300,0H500L690,214C730,250 720,320 650,336H150C80,320 70,250 110,214Z"
          />
        </Fade>
        <Fade frame={frame} on={3} off={5}>
          <path className="pl-m" d={RAYS} />
        </Fade>
        <Draw frame={frame} on={4} off={5} className="fp-gold" delay={400} d="M400,196H0" />
        <Draw frame={frame} on={4} off={5} className="fp-gold" delay={400} d="M400,196H800" />

        {/* 4 on: the mountains rise under a light already there. */}
        <Fade frame={frame} on={4} from="up">
          <Shape
            d="M0,500V470L110,392L190,436L310,356L420,428L520,372L640,444L720,400L800,446V500Z"
            tone="g"
          />
          <path
            fill={h.h2}
            d="M310,356L420,428L520,372L640,444L720,400L800,446V500H310Z"
          />
        </Fade>

        {/* The row of links, which is made smaller and framed from frame 2. */}
        <Travel
          frame={k}
          at={[
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [174, 116, 0.62],
          ]}
        >
          <Fade frame={frame} on={1} from="right" delay={200}>
            <path className="pl-f" strokeDasharray="2 6" d={`M0,${Y}H70`} />
            <path className="pl-k" d={`M24,${Y}a3,3 0 1,0 6,0a3,3 0 1,0 -6,0ZM44,${Y}a3,3 0 1,0 6,0a3,3 0 1,0 -6,0ZM64,${Y}a3,3 0 1,0 6,0a3,3 0 1,0 -6,0Z`} />
          </Fade>
          <Fade frame={frame} on={1} from="right" delay={900}>
            <path className="pl-l" d={joint(120)} />
            <Link x={180}>
              <Sun x={180} />
            </Link>
          </Fade>
          <Fade frame={frame} on={1} from="right" delay={500}>
            <path className="pl-l" d={joint(240)} />
            <Link x={300}>
              <Earth x={300} hatch={h.h2} />
            </Link>
          </Fade>
          <Fade frame={frame} on={1} from="right" delay={100}>
            <path className="pl-l" d={joint(360)} />
            <Link x={420}>
              <Tree x={420} />
            </Link>
          </Fade>
          <Fade frame={frame} on={0} from="right" delay={500}>
            <path className="pl-l" d={joint(480)} />
            <Link x={540}>
              <Seed x={540} />
            </Link>
          </Fade>
          <Link x={660}>
            <Tree x={660} />
          </Link>
          <Fade frame={frame} on={-1} off={2}>
            <Travel frame={k} at={TRACE}>
              <path className="pl-m" d={`${ring(0, -R - 14, 8)}`} />
              <path className="pl-l" d={`${ring(0, -R - 14, 8)}`} />
            </Travel>
          </Fade>
        </Travel>

        {/* 2 on: the frame round the whole row. */}
        <Draw frame={frame} on={2} delay={700} d="M160,214H640V318H160Z" />
        <Draw frame={frame} on={2} delay={1000} className="pl-f" d="M152,206H648V326H152Z" />

        {/* 5: the bush that burned and was not burned up. */}
        <Fade frame={frame} on={5} from="up" delay={300}>
          <path className="pl-l" d="M400,476V430M400,452L376,426M400,446L426,420M388,436L370,442M412,432L432,438" />
          <Shape
            d="M352,440C340,418 356,398 376,404C380,386 404,380 414,394C432,384 452,402 446,420C460,428 456,446 440,448H360C350,448 346,444 352,440Z"
            tone="g"
          />
          <Flame x={400} y={390} s={1.5} gold />
        </Fade>
      </>
    );
  },
};

export default film;
