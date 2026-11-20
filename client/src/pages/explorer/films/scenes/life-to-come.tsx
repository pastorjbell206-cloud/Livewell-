/**
 * "The life to come": the family catechism (Q51, Q52, Q70), the New Creation
 * stop and the "life to come" card, in seven pictures. Gentle by design: no
 * grave, no body, no figure for God, nothing frightening. The plan's picture
 * is Paul's own: a seed sown in the ground and raised (1 Corinthians 15).
 *
 *   0  Death is real    a tree in a field at evening, a few leaves falling
 *   1  Not the end      a seed in the soil, in a cut through the ground
 *   2  With Christ      the seed resting; a soft light from beyond the top
 *   3  Raised           a shoot from the seed into a tall stalk, a full ear
 *   4  Put right        a pair of scales hanging level, in morning light
 *   5  All things new   a city wall, its gate open, a river and a tree
 *   6  No more tears    a grown-up and a child sitting by the river
 *
 * The one mustard mark: the light in the open gate (5 and 6) and the poster.
 * Where Christians differ (the time between death and the resurrection, the
 * order of the last events), the captions say so; the drawing takes no side.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated } from "./figures";

/** The city on the horizon, its gate open and the light in it. */
const City = () => (
  <>
    <path
      className="pl-f"
      d="M600,170l-12,-40M620,166l4,-42M640,170l18,-38M578,184l-34,-20M662,184l34,-22"
    />
    <path
      className="pl-o"
      d="M440,330V236h30v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h30V330Z"
    />
    <path
      className="pl-b"
      transform="translate(3,2)"
      d="M440,330V236h30v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h30V330Z"
    />
    <path
      className="pl-o"
      d="M440,330V236h30v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h30V330Z"
    />
    <path
      className="pl-l"
      d="M440,330V236h30v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h40v-14h16v14h30V330"
    />
    <path className="pl-m" d="M590,330V280a30,30 0 0 1 60,0V330Z" />
    <path className="pl-l" d="M590,330V280a30,30 0 0 1 60,0V330" />
  </>
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The sky at evening (0 to 2): a band of hatching along the top. */}
      <Fade frame={frame} on={-1} off={3}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V120H0Z" />
      </Fade>

      {/* The field: its surface, and the soil under it. */}
      <path className="pl-l" d="M0,330C200,322 600,326 800,330" />
      <Shape d="M0,500V330C200,322 600,326 800,330V500Z" tone="g" off={3} />
      {/* The cut through the ground (1 to 4, and the poster). */}
      <Fade frame={frame} on={-1} off={5}>
        <path
          className="fp-dark"
          fill={h.h3}
          d="M0,352C200,346 600,350 800,354V500H0Z"
        />
        <path className="pl-l" d="M0,352C200,346 600,350 800,354" />
      </Fade>

      {/* 0 to 2. A tree in the field; at evening a few leaves fall. */}
      <Fade frame={frame} on={-1} off={3}>
        <Shape d="M112,330L118,230h14L138,330Z" tone="c" off={2} />
        <Shape
          d="M60,224C52,180 92,150 126,160C162,146 202,176 196,214C210,244 176,266 140,256C102,268 64,256 60,224Z"
          tone="g"
          off={3}
        />
        <path
          fill={h.h2}
          d="M126,160C162,146 202,176 196,214C210,244 176,266 140,256Z"
        />
      </Fade>
      {[
        [210, 270],
        [236, 300],
        [180, 296],
        [260, 318],
      ].map(([x, y], n) => (
        <Fade
          key={x}
          frame={frame}
          on={0}
          off={1}
          from="down"
          delay={400 + n * 350}
        >
          <Shape
            d={`M${x},${y}c8,-8 18,-6 20,0c-6,8 -16,8 -20,0Z`}
            tone="c"
            off={1}
          />
        </Fade>
      ))}

      {/* 1 to 4. The seed in the soil. */}
      <Fade frame={frame} on={1} off={5} from="down">
        <path
          className="pl-o"
          d="M206,420a16,10 -20 1,0 32,0a16,10 -20 1,0 -32,0Z"
        />
        <path
          className="pl-c"
          transform="translate(2,1.5)"
          d="M206,420a16,10 -20 1,0 32,0a16,10 -20 1,0 -32,0Z"
        />
        <path
          className="pl-l"
          d="M206,420a16,10 -20 1,0 32,0a16,10 -20 1,0 -32,0Z"
        />
      </Fade>
      {/* The poster: the seed, and the city far off. */}
      <Fade frame={frame} on={-1} off={0}>
        <path
          className="pl-o"
          d="M206,420a16,10 -20 1,0 32,0a16,10 -20 1,0 -32,0Z"
        />
        <path
          className="pl-l"
          d="M206,420a16,10 -20 1,0 32,0a16,10 -20 1,0 -32,0Z"
        />
        <g transform="translate(330 128) scale(0.6)">
          <City />
        </g>
      </Fade>

      {/* 2. A soft light from beyond the top of the picture. */}
      <Draw
        frame={frame}
        on={2}
        off={3}
        className="pl-f"
        delay={500}
        d="M420,0L330,300M500,0L470,300M580,0L610,300M660,0L750,300"
      />

      {/* 3. Raised: roots down, a stalk up, a full ear of wheat. */}
      <Draw
        frame={frame}
        on={3}
        off={5}
        d="M218,428C214,444 206,456 196,468M226,428C230,446 240,458 252,470M222,430C222,448 224,462 220,482"
      />
      <Draw
        frame={frame}
        on={3}
        off={5}
        delay={300}
        d="M222,412C226,360 218,300 224,240C228,200 230,170 232,140"
      />
      <Draw
        frame={frame}
        on={3}
        off={5}
        delay={900}
        d="M224,300C204,286 188,284 170,290M226,262C248,248 264,248 282,256M229,210C210,200 196,200 180,208"
      />
      <Fade frame={frame} on={3} off={5} from="grow" delay={1600}>
        <path className="pl-l" d="M232,140V84" />
        {[0, 1, 2, 3].map(k => (
          <g key={k}>
            <Shape
              d={`M231,${136 - k * 14}c-14,-3 -19,-14 -16,-22c11,3 18,11 16,22Z`}
              tone="c"
              off={1}
            />
            <Shape
              d={`M233,${129 - k * 14}c14,-3 19,-14 16,-22c-11,3 -18,11 -16,22Z`}
              tone="c"
              off={1}
            />
          </g>
        ))}
      </Fade>

      {/* 4. Every wrong put right: a pair of scales hanging level, in morning light. */}
      <Fade frame={frame} on={4} off={5} from="up">
        <path
          className="pl-f"
          d="M660,96l-12,-26M676,92l2,-30M692,96l14,-26M640,104l-24,-14M708,104l24,-16"
        />
        <path className="pl-l" d="M520,330H600M560,330V176M450,186H670" />
        <path className="pl-l" d="M466,186L444,252M466,186L488,252" />
        <path className="pl-l" d="M654,186L632,252M654,186L676,252" />
        <Shape d="M436,252H496C492,270 440,270 436,252Z" tone="b" off={1.5} />
        <Shape d="M624,252H684C680,270 628,270 624,252Z" tone="b" off={1.5} />
        <Shape
          d="M550,176a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z"
          tone="c"
          off={1}
        />
      </Fade>

      {/* 5 and 6. All things new: the city, its gate open, a river and a tree. */}
      <Fade frame={frame} on={5} from="up">
        <City />
        <Shape
          d="M600,330H640C646,360 626,384 640,412C654,440 690,462 700,500H560C566,470 586,446 584,416C582,388 600,362 600,330Z"
          tone="b"
          off={2}
        />
        <path
          fill={h.hh}
          d="M606,360C604,384 594,404 596,424C598,450 580,474 576,500H684C676,470 646,446 634,420C624,396 636,378 634,360Z"
        />
        <path
          className="pl-f"
          d="M606,348c8,-3 16,3 24,0M600,398c10,-3 20,3 30,0M598,450c14,-4 28,4 42,0M590,486c18,-5 36,5 54,0"
        />
        <Shape d="M736,420L740,350h10L754,420Z" tone="c" off={2} />
        <Shape
          d="M706,346C700,316 726,298 748,306C772,298 796,318 790,344C798,366 770,378 748,370C726,380 702,368 706,346Z"
          tone="g"
          off={3}
        />
        <Shape d="M60,430L64,370h10L78,430Z" tone="c" off={2} />
        <Shape
          d="M30,366C24,336 50,318 72,326C96,318 120,338 114,364C122,386 94,398 72,390C50,400 26,388 30,366Z"
          tone="g"
          off={3}
        />
      </Fade>

      {/* 6. No more tears: a grown-up and a child sitting by the river. */}
      <Fade frame={frame} on={6} from="up" delay={300}>
        <g transform="translate(470 440) scale(1.7) translate(-470 -440)">
          <Seated x={450} y={398} tone="b" body={42} />
          <g transform="translate(488 440) scale(0.72) translate(-488 -440)">
            <Seated x={488} y={398} tone="c" body={42} />
          </g>
        </g>
      </Fade>
    </>
  ),
};

export default film;
