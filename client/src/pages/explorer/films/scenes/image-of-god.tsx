/**
 * "Creation and the image of God": the family catechism (Q5 to Q8) and the
 * Creation stop, in seven pictures.
 *
 *   0  Out of nothing        light from beyond the edge; a horizon, sea and land draw themselves
 *   1  Very good             trees, plants, birds, fish and a sheep fill the world
 *   2  In his image          a man and a woman stand in the garden in the light
 *   3  To know him           a still pool at their feet gives the light back (the one mustard mark)
 *   4  To care for his world a young tree planted, a jar of water carried
 *   5  Given, not earned     a row of people of every age and ability, the same light on each
 *   6  What Christians leave open   an open book on the grass under a night sky of stars
 *
 * God is never drawn: the light comes from beyond the picture's edge, as in
 * the other films. No drawing says how or when: no fossils, no ages, no
 * process; the last picture is only the book and the sky.
 */
import type { Hatch } from "@/components/art/PlateSvg";
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing, ring } from "./figures";

const RAYS =
  "M800,40L640,150M790,0L610,120M740,0L590,110M690,0L570,104M800,90L660,170";

/** The pair in the garden: a man and a woman (no faces), as the art kit draws people. */
const Pair = () => (
  <>
    <Standing x={350} y={232} tone="b" s={1.5} />
    <Standing x={440} y={236} tone="c" s={1.5} />
  </>
);

/** Two trees on the hills, for the poster and from the second picture. */
const Trees = ({ h }: { h: Hatch }) => (
  <>
    <Shape d="M112,320V250h12v70Z" tone="c" off={2} />
    <Shape d="M78,236a40,34 0 1,0 80,0a40,34 0 1,0 -80,0Z" tone="g" off={3} />
    <path fill={h.h2} d="M118,202a40,34 0 0 1 0,68Z" />
    <Shape d="M676,308V244h10v64Z" tone="c" off={2} />
    <Shape d="M646,232a35,30 0 1,0 70,0a35,30 0 1,0 -70,0Z" tone="g" off={3} />
  </>
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* Night falls on the last picture: the sky hatched, stars in it. */}
      <Fade frame={frame} on={6}>
        <path fill={h.h1} d="M0,0H800V320H0Z" />
        {[
          [90, 60],
          [210, 110],
          [330, 50],
          [470, 96],
          [600, 44],
          [700, 120],
          [150, 180],
          [540, 180],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <path
              className="pl-paper"
              d={`M${x},${y - 9}l3,6l6,3l-6,3l-3,6l-3,-6l-6,-3l6,-3Z`}
            />
            <path
              className="pl-l"
              d={`M${x},${y - 9}l3,6l6,3l-6,3l-3,6l-3,-6l-6,-3l6,-3Z`}
              style={{ strokeWidth: 1.5 }}
            />
          </g>
        ))}
      </Fade>

      {/* The light from beyond the edge: there from the first picture, gone at night. */}
      <Fade frame={frame} on={-1} off={6}>
        <path className="pl-f" d={RAYS} />
      </Fade>

      {/* 0. The world drawn: the land and its horizon, the sea. */}
      <Fade frame={frame} on={-1}>
        <Shape
          d="M0,500V330C140,300 300,312 420,318C560,306 700,296 800,306V500Z"
          tone="g"
          off={3}
        />
        <path fill={h.h2} d="M0,470C200,462 600,462 800,468V500H0Z" />
      </Fade>
      <Draw
        frame={frame}
        on={0}
        className="pl-l"
        d="M0,330C140,300 300,312 420,318C560,306 700,296 800,306"
      />
      <Fade frame={frame} on={-1}>
        <Shape
          d="M0,500V408C70,398 150,404 210,424C240,446 238,476 228,500Z"
          tone="b"
          off={2}
        />
        <path fill={h.hh} d="M0,440C80,436 170,440 220,452L226,500H0Z" />
      </Fade>

      {/* 1. Filled: trees and plants, birds, fish, a sheep. */}
      <Fade frame={frame} on={-1} off={0}>
        <Trees h={h} />
      </Fade>
      <Fade frame={frame} on={1} off={5} from="up">
        <Trees h={h} />
      </Fade>
      <Fade frame={frame} on={1} off={5} delay={400}>
        <path
          className="pl-l"
          d="M240,90c8,-8 16,-8 22,0c6,-8 14,-8 22,0M330,130c6,-6 12,-6 16,0c4,-6 10,-6 16,0M200,150c6,-6 12,-6 16,0c4,-6 10,-6 16,0"
        />
        <path
          className="pl-l"
          d="M60,452c10,-8 24,-8 32,0c-8,8 -22,8 -32,0l-8,-6v12ZM140,474c8,-6 18,-6 24,0c-6,6 -16,6 -24,0l-6,-5v10Z"
        />
        <path
          className="pl-l"
          d="M250,330c-4,-14 6,-22 10,-30M262,330c2,-12 -2,-20 4,-30M560,320c-4,-12 6,-20 10,-26M740,330c2,-12 -2,-20 4,-26"
        />
      </Fade>
      <Fade frame={frame} on={1} off={5} delay={800}>
        <Shape
          d="M572,372C566,362 574,354 582,356C584,348 598,348 600,356C608,354 616,362 610,372C612,380 602,384 594,380C586,384 574,382 572,372Z"
          tone="b"
          off={1.5}
        />
        <path className="pl-l" d="M580,380V394M602,380V394" />
        <Shape d={ring(612, 356, 8)} tone="b" off={1} />
      </Fade>

      {/* The poster: the man and the woman already in the garden. */}
      <Fade frame={frame} on={-1} off={0}>
        <Pair />
      </Fade>
      {/* 2 to 4. The man and the woman, made in God's image. */}
      <Fade frame={frame} on={2} off={5} from="up">
        <Pair />
      </Fade>
      <Draw
        frame={frame}
        on={2}
        off={4}
        className="pl-f"
        d="M640,150C590,166 540,180 500,190M640,150C580,170 500,184 430,190"
      />

      {/* 3. The pool at their feet gives the light back. */}
      <Fade frame={frame} on={3} off={5}>
        <Shape
          d="M318,402a82,18 0 1,0 164,0a82,18 0 1,0 -164,0Z"
          tone="b"
          off={1.5}
        />
        <path fill={h.hh} d="M330,404a70,12 0 0 0 140,0Z" />
      </Fade>
      <Fade frame={frame} on={3} off={5} delay={700} from="grow">
        <path
          className="pl-m"
          d="M400,388l5,9l10,4l-10,4l-5,9l-5,-9l-10,-4l10,-4Z"
        />
        <path
          className="pl-l"
          d="M400,388l5,9l10,4l-10,4l-5,9l-5,-9l-10,-4l10,-4Z"
          style={{ strokeWidth: 1.5 }}
        />
      </Fade>

      {/* 4. Care for his world: a young tree planted, a jar of water carried. */}
      <Fade frame={frame} on={4} off={5} from="grow">
        <Shape d="M518,344a22,7 0 0 1 44,0Z" tone="c" off={1.5} />
        <path
          className="pl-l"
          d="M540,340V296M540,318l-14,-10M540,308l14,-12"
        />
        <path className="pl-l" d="M300,340L322,286" />
        <Shape d="M296,336l-8,16l14,6l8,-16Z" tone="b" off={1} />
      </Fade>
      <Fade frame={frame} on={4} off={5} delay={500}>
        <Shape
          d="M470,290C462,290 458,302 464,312C466,322 488,322 490,312C496,302 492,290 484,290V282H472Z"
          tone="c"
          off={1.5}
        />
      </Fade>

      {/* 5. Given, not earned: a row of people of every age and ability. */}
      <Fade frame={frame} on={5} off={6} from="up">
        <Standing x={130} y={236} tone="g" s={1.3} />
        <Shape
          d="M118,300a16,10 0 1,0 32,0a16,10 0 1,0 -32,0Z"
          tone="b"
          off={1}
        />
        <path className="pl-o" d={ring(150, 292, 6)} />
        <path className="pl-l" d={ring(150, 292, 6)} />
        <Standing x={250} y={268} tone="c" s={0.95} />
        <Standing x={370} y={226} tone="b" s={1.45} />
        <Standing x={490} y={234} tone="g" s={1.35} />
        <path className="pl-l" d="M512,262L528,320" />
        <path className="pl-o" d={ring(642, 318, 22)} />
        <path className="pl-l" d={ring(642, 318, 22)} />
        <path className="pl-l" d={ring(642, 318, 3)} />
        <path className="pl-l" d="M660,300V262M606,300H664M612,300L606,330" />
        <path className="pl-o" d={ring(606, 334, 5)} />
        <path className="pl-l" d={ring(606, 334, 5)} />
        <Seated x={632} y={262} tone="c" body={38} />
      </Fade>
      <Draw
        frame={frame}
        on={5}
        off={6}
        className="pl-f"
        delay={600}
        d="M164,170l-16,26M180,180l-16,26M284,202l-16,26M300,212l-16,26M404,160l-16,26M420,170l-16,26M524,168l-16,26M540,178l-16,26M666,196l-16,26M682,206l-16,26"
      />

      {/* 6. An open book on the grass under the stars. */}
      <Fade frame={frame} on={6} from="up">
        <Shape
          d="M300,420V372C334,362 370,364 400,378C430,364 466,362 500,372V420C466,410 430,412 400,426C370,412 334,410 300,420Z"
          tone="b"
          off={2}
        />
        <path className="pl-l" d="M400,378V426" />
        <path
          className="pl-f"
          d="M318,384c22,-6 48,-6 68,2M318,396c22,-6 48,-6 68,2M414,386c20,-8 46,-8 68,-2M414,398c20,-8 46,-8 68,-2"
        />
      </Fade>
    </>
  ),
};

export default film;
