/**
 * "The Holy Spirit in a believer": the family catechism (Q41 to Q45, Q63)
 * and what all Christians confess, in seven pictures. The Spirit is never
 * drawn as a person or a face: one small flame of light at the top of every
 * picture (the one mustard mark), and a faint line like breath.
 *
 *   0  God lives in his people   five people under the flame, breath to each
 *   1  Joined to Jesus           a vine grows up and spreads its branches
 *   2  God's children            a child under the vine, light from beyond the edge
 *   3  Fruit that grows          nine fruits among the leaves
 *   4  Gifts for the church      five people, each holding something different
 *   5  Where churches differ     three different church buildings at the vine's foot
 *   6  Help to pray              a person sits under the vine; breath comes down
 *
 * The vine is Jesus' own picture (John 15). Nothing is drawn as one church's
 * practice; frame 5 keeps three buildings side by side, as the church film does.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Flame, Seated, Standing } from "./figures";

const PEOPLE: [number, "b" | "g" | "c"][] = [
  [200, "b"],
  [300, "c"],
  [400, "g"],
  [500, "b"],
  [600, "c"],
];

const VINE = "M400,430C396,380 408,340 400,300C394,270 404,240 400,210";
const BRANCHES =
  "M400,300C360,290 300,300 230,280M400,300C440,290 500,300 570,280M400,250C360,236 310,236 260,214M400,250C440,236 490,236 540,214M400,214C380,196 352,184 330,170M400,214C420,196 448,184 470,170";

/** Leaves along the branches. */
const LEAVES: [number, number][] = [
  [250, 282],
  [300, 296],
  [350, 292],
  [450, 292],
  [500, 296],
  [550, 282],
  [280, 222],
  [330, 236],
  [470, 236],
  [520, 222],
  [345, 178],
  [455, 178],
  [400, 204],
];
const leaf = (x: number, y: number) =>
  `M${x - 14},${y}C${x - 8},${y - 12} ${x + 8},${y - 12} ${x + 14},${y}C${x + 8},${y + 8} ${x - 8},${y + 8} ${x - 14},${y}Z`;

/** The nine fruits of Galatians 5:22-23. */
const FRUIT: [number, number][] = [
  [262, 300],
  [326, 310],
  [372, 306],
  [428, 306],
  [474, 310],
  [538, 300],
  [300, 244],
  [500, 244],
  [400, 228],
];

/** Things in their hands (4): a book, a basket, a jug, a harp, a hammer. */
const GIFTS = [
  "M186,372V356C192,354 198,354 200,358C202,354 208,354 214,356V372C208,370 202,370 200,374C198,370 192,370 186,372Z",
  "M286,360H314L310,380H290Z",
  "M392,384C386,384 384,372 388,364C390,358 394,356 396,354V348H404V354C406,356 410,358 412,364C416,372 414,384 408,384Z",
  "M490,384L496,348C504,346 512,352 512,360L506,384Z",
  "M590,384L600,354H612V362H604L598,384Z",
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The ground. */}
      <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
      <path fill={h.hh} d="M0,452H800V500H0Z" />

      {/* The one small flame, in every picture. */}
      <Flame x={400} y={62} s={1.2} gold />

      {/* 0. Five people, and a breath line from the flame to each. */}
      <Fade frame={frame} on={-1} off={1}>
        {PEOPLE.map(([x, t]) => (
          <Standing key={x} x={x} y={350} tone={t} s={1.3} />
        ))}
      </Fade>
      {PEOPLE.map(([x], n) => (
        <Draw
          key={x}
          frame={frame}
          on={0}
          off={1}
          className="pl-f"
          d={`M400,86C400,150 ${x + (x < 400 ? 40 : x > 400 ? -40 : 24)},190 ${x + (x < 400 ? 14 : x > 400 ? -14 : 16)},272`}
          delay={n * 200}
        />
      ))}

      {/* 1 on. The vine and its branches. */}
      <Draw frame={frame} on={1} className="fp-thread" d={VINE} />
      <Draw frame={frame} on={1} className="pl-l" d={BRANCHES} delay={600} />
      {/* Tendrils, curling, so it reads as a vine and not a tree. */}
      <Draw
        frame={frame}
        on={1}
        className="pl-f"
        d="M230,280c-10,-2 -14,8 -8,12c6,4 12,-4 6,-8M570,280c10,-2 14,8 8,12c-6,4 -12,-4 -6,-8M260,214c-10,-4 -16,6 -10,10c6,4 12,-2 6,-6M540,214c10,-4 16,6 10,10c-6,4 -12,-2 -6,-6M330,170c-8,-6 -16,2 -10,8c6,4 10,-2 4,-6M470,170c8,-6 16,2 10,8c-6,4 -10,-2 -4,-6"
        delay={1400}
      />
      {LEAVES.map(([x, y], n) => (
        <Fade
          key={`${x}-${y}`}
          frame={frame}
          on={1}
          from="grow"
          delay={900 + n * 60}
        >
          <Shape d={leaf(x, y)} tone="g" off={1} />
        </Fade>
      ))}

      {/* 2. A child under the vine, and the light from beyond the edge. */}
      <Fade frame={frame} on={2} off={3}>
        <path className="pl-f" d="M120,0L170,110M180,0L210,100M60,0L130,120" />
      </Fade>
      <Fade frame={frame} on={2} off={3} from="left" delay={300}>
        <Standing x={180} y={374} tone="c" s={0.9} />
      </Fade>

      {/* 3 on. Nine fruits. */}
      {FRUIT.map(([x, y], n) => (
        <Fade
          key={`${x}-${y}`}
          frame={frame}
          on={3}
          from="grow"
          delay={n * 140}
        >
          <Shape
            d={`M${x - 10},${y}a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z`}
            tone={(["c", "b", "c"] as const)[n % 3]}
            off={1.5}
          />
        </Fade>
      ))}

      {/* 4. People with different gifts in their hands. */}
      <Fade frame={frame} on={4} off={5}>
        {PEOPLE.map(([x, t]) => (
          <Standing key={x} x={x} y={358} tone={t} s={1.15} />
        ))}
      </Fade>
      {GIFTS.map((d, n) => (
        <Fade
          key={n}
          frame={frame}
          on={4}
          off={5}
          from="up"
          delay={400 + n * 200}
        >
          <g transform="translate(0,34)">
            <Shape d={d} tone={(["b", "c", "g"] as const)[n % 3]} off={1} />
          </g>
        </Fade>
      ))}

      {/* 5. Three different church buildings on one ground. */}
      <Fade frame={frame} on={5} off={6} from="up">
        <Shape d="M90,430V370L150,330L210,370V430Z" tone="g" off={2} />
        <path className="pl-k" d="M138,430V396h24v34Z" />
        <Shape
          d="M300,430V370H330V334L346,318L362,334V370H460V430Z"
          tone="b"
          off={2}
        />
        <path className="pl-k" d="M376,430V402a12,12 0 0 1 24,0V430Z" />
        <Shape d="M590,430V380L650,356L710,380V430Z" tone="c" off={2} />
        <path className="pl-k" d="M638,430V398h24v32Z" />
      </Fade>

      {/* 6. A person sits under the vine; breath comes down to them. */}
      <Fade frame={frame} on={6} from="left">
        <Seated x={250} y={372} tone="b" body={58} />
      </Fade>
      <Draw
        frame={frame}
        on={6}
        className="pl-f"
        d="M392,84C360,140 300,170 296,230C292,280 270,310 262,336"
        delay={500}
      />
    </>
  ),
};

export default film;
