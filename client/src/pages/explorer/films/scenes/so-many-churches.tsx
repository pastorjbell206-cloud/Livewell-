/**
 * "Why are there so many churches?": the site's guide to the traditions and
 * its history course (the East-West schism, the Reformation), in seven
 * pictures of one tree. The plan's picture: one tree with many branches from
 * one root. No branch is drawn larger, higher or lighter than its fellows to
 * mark it as the true one, and none is cut off or withered: the film takes no
 * side between the churches.
 *
 *   0  One church       a young tree with one trunk, its root in the soil
 *   1  Many lands       the tree grows taller, two branches out
 *   2  East and West    the trunk divides into two great limbs
 *   3  1517             a new branch from one limb, dividing again
 *   4  Many branches    the branches divide again and again
 *   5  One root         under the ground the root is drawn in gold
 *   6  That they may be one   the whole tree in leaf, people under it
 *
 * The one mustard mark: the root in gold (5 and 6).
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Standing } from "./figures";

const ROOT =
  "M400,396C396,420 380,440 360,462M400,396C404,424 420,446 446,468M400,400C400,430 402,456 398,488M384,418C366,426 348,430 330,428M416,420C436,428 456,430 474,426";

/** The branches, by the picture they first appear in, and their weight. */
const LIMBS: [number, 1 | 2 | 3 | 4, string][] = [
  // 1. taller, and two branches out
  [1, 1, "M400,300C401,272 400,244 400,222"],
  [1, 3, "M400,316C382,304 356,294 330,262"],
  [1, 3, "M400,306C420,294 446,284 472,252"],
  // 2. East and West
  [2, 2, "M400,224C380,200 344,178 302,140"],
  [2, 2, "M400,224C420,200 456,178 498,140"],
  // 3. a new branch from the left limb, dividing again
  [3, 3, "M340,174C310,166 282,154 252,124"],
  [3, 4, "M276,148C266,126 258,106 256,84"],
  // 4. many more
  [4, 4, "M252,124C232,108 212,98 190,82"],
  [4, 4, "M256,84C262,66 270,54 282,40"],
  [4, 4, "M302,140C298,112 302,92 312,70"],
  [4, 4, "M302,140C284,120 268,108 250,100"],
  [4, 4, "M498,140C520,120 540,102 562,84"],
  [4, 4, "M498,140C498,112 492,92 486,70"],
  [4, 4, "M472,252C494,236 514,226 540,218"],
  [4, 4, "M330,262C308,244 288,234 262,228"],
  [4, 4, "M190,82C176,70 168,60 162,46"],
  [4, 4, "M562,84C574,70 584,60 600,52"],
];

/** Clumps of leaves at the ends of the branches (6). */
const LEAVES: [number, number, number][] = [
  [190, 80, 37],
  [160, 46, 31],
  [282, 40, 34],
  [312, 66, 34],
  [250, 98, 31],
  [256, 82, 27],
  [562, 82, 37],
  [600, 50, 31],
  [486, 66, 34],
  [540, 216, 34],
  [262, 226, 34],
  [400, 210, 37],
];

const blob = (x: number, y: number, r: number) =>
  `M${x - r},${y}C${x - r},${y - r * 0.8} ${x - r * 0.3},${y - r} ${x},${y - r * 0.9}C${x + r * 0.5},${y - r * 1.1} ${x + r},${y - r * 0.5} ${x + r},${y}C${x + r},${y + r * 0.7} ${x + r * 0.4},${y + r} ${x},${y + r * 0.8}C${x - r * 0.5},${y + r} ${x - r},${y + r * 0.6} ${x - r},${y}Z`;

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The ground, and the soil cut through to show the root. */}
      <Shape d="M0,500V380C200,372 600,376 800,380V500Z" tone="g" off={3} />
      <path fill={h.h3} d="M0,396C200,390 600,392 800,396V500H0Z" />
      <path className="pl-l" d="M0,396C200,390 600,392 800,396" />
      <path className="pl-l" d={ROOT} />
      <Draw frame={frame} on={5} className="fp-gold" delay={400} d={ROOT} />

      {/* The trunk, in every picture: the tree is drawn in ink lines. */}
      <path
        className="fp-branch fp-branch--1"
        d="M400,386C400,356 401,328 400,300"
      />

      {/* 0. Young: a small crown of leaves on the trunk. */}
      <Fade frame={frame} on={-1} off={1} from="grow">
        <Shape d={blob(400, 284, 40)} tone="g" off={3} />
      </Fade>

      {LIMBS.map(([on, w, d], n) => (
        <Draw
          key={n}
          frame={frame}
          on={on}
          className={`fp-branch fp-branch--${w}`}
          delay={300 + (n % 6) * 220}
          d={d}
        />
      ))}

      {/* The poster: the whole tree at once. */}
      <Fade frame={frame} on={-1} off={0}>
        {LIMBS.map(([, w, d], n) => (
          <path key={n} className={`fp-branch fp-branch--${w}`} d={d} />
        ))}
        {LEAVES.map(([x, y, r]) => (
          <Shape key={`${x}-${y}`} d={blob(x, y, r)} tone="g" off={2} />
        ))}
      </Fade>

      {/* 6. The whole tree in leaf, in the morning, people under it. */}
      {LEAVES.map(([x, y, r], n) => (
        <Fade
          key={`${x}-${y}`}
          frame={frame}
          on={6}
          from="grow"
          delay={200 + n * 90}
        >
          <Shape d={blob(x, y, r)} tone="g" off={2} />
        </Fade>
      ))}
      <Fade frame={frame} on={6} from="up" delay={900}>
        <path className="pl-f" d="M800,30L712,90M780,0L700,70M800,84L726,116" />
        <Standing x={240} y={300} tone="b" s={1.4} />
        <Standing x={292} y={322} tone="c" s={1} />
        <Standing x={520} y={298} tone="g" s={1.4} />
        <Standing x={574} y={302} tone="c" s={1.3} />
      </Fade>
    </>
  ),
};

export default film;
