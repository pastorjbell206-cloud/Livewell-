/**
 * "Why do bad things happen?": the Honest Answers on suffering ("If God is
 * good, why is there so much suffering?" and "Why does God allow earthquakes,
 * cancer, and animal suffering?"), in eight pictures, with no neat
 * explanation. The one picture is a clay bowl.
 *
 *   0  A hard question       a bowl on a table, cracked; a storm cloud above
 *   1  Not how it should be  the bowl breaks into three pieces
 *   2  Not a punishment      the pieces lie apart
 *   3  Allowed to ask        night; a person sits near the pieces under stars
 *   4  God came into it      on a far hill, an empty cross
 *   5  Not the last word     the pieces come back together, each crack gold
 *   6  All things new        the mended bowl in morning light, plants round it
 *   7  Not alone             two people sit together by the mended bowl
 *
 * The one mustard mark is the gold in the mended cracks: the bowl is mended
 * and the mending shows, as the risen Jesus kept the marks of the nails. The
 * breaking is never drawn as good; nothing says the pain was a lesson.
 */
import { Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Seated } from "./figures";

/** The bowl in three pieces, split along two cracks. */
const SHARDS: { d: string; tone: "c" | "b" | "g" }[] = [
  {
    d: "M300,300L368,300L356,330L372,352L360,389C328,380 302,348 300,300Z",
    tone: "c",
  },
  {
    d: "M368,300L436,300L446,326L430,350L442,388C428,391 414,392 400,392C386,392 372,391 360,389L372,352L356,330Z",
    tone: "c",
  },
  {
    d: "M436,300L500,300C498,348 474,380 442,388L430,350L446,326Z",
    tone: "c",
  },
];
const BOWL = "M300,300H500C496,360 456,392 400,392C344,392 304,360 300,300Z";
const CRACKS = [
  "M368,300L356,330L372,352L360,389",
  "M436,300L446,326L430,350L442,388",
];

/** Where each piece lies, frame by frame: together, then apart, then together. */
const APART: [number, number][] = [
  [-104, 3],
  [0, 0],
  [104, 4],
];
const at = (k: number): [number, number][] =>
  [0, 1, 2, 3, 4, 5, 6, 7].map(f =>
    f >= 1 && f <= 4 ? APART[k] : ([0, 0] as [number, number])
  );

const STARS = [
  [90, 60],
  [170, 110],
  [250, 50],
  [340, 96],
  [460, 60],
  [560, 120],
  [610, 60],
  [130, 170],
  [600, 190],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* 3. Night: a moon and stars, drawn in ink so they read by day and night. */}
      <Fade frame={frame} on={3} off={5}>
        <path
          className="pl-l"
          d="M690,40A34,34 0 1,0 724,92A26,26 0 1,1 690,40Z"
        />
        {STARS.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            className="pl-l"
            d={`M${x},${y - 7}L${x + 2},${y - 2}L${x + 7},${y}L${x + 2},${y + 2}L${x},${y + 7}L${x - 2},${y + 2}L${x - 7},${y}L${x - 2},${y - 2}Z`}
          />
        ))}
      </Fade>

      {/* 0. A storm cloud with rain: the things that go wrong. */}
      <Fade frame={frame} on={-1} off={3} from="down">
        <Shape
          d="M120,120C96,120 92,96 112,88C108,64 140,54 156,70C168,50 204,54 206,80C228,80 232,110 210,120Z"
          tone="b"
          off={2}
        />
        <path
          className="pl-f"
          d="M126,132l-8,22M150,132l-8,22M174,132l-8,22M198,132l-8,22"
        />
      </Fade>

      {/* 6. Morning light, rays from above the picture's edge. */}
      <Fade frame={frame} on={6}>
        <path
          className="pl-f"
          d="M400,0V120M330,0L360,110M470,0L440,110M250,0L320,120M550,0L480,120"
        />
      </Fade>

      {/* 4. A far hill and an empty cross. */}
      <Fade frame={frame} on={4} off={6} from="up">
        <Shape d="M560,430C590,350 700,330 800,360V430Z" tone="g" off={2} />
        <path className="pl-l" d="M676,342V250M652,274H700" />
      </Fade>

      {/* The table. */}
      <Shape d="M150,392H650V408H150Z" tone="b" off={2} />
      <path className="pl-l" d="M180,408V430M620,408V430" />
      <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
      <path fill={h.hh} d="M0,452H800V500H0Z" />

      {/* 3 to 4. Job, sitting by the broken pieces. */}
      <Fade frame={frame} on={3} off={5} from="left">
        <Shape d="M70,404H122V412H70Z" tone="b" off={1} />
        <path className="pl-l" d="M76,412V430M116,412V430" />
        <Seated x={96} y={348} tone="g" body={58} />
      </Fade>
      {/* 7. Two people together by the mended bowl. */}
      <Fade frame={frame} on={7} from="left">
        <Seated x={230} y={330} tone="g" body={76} />
      </Fade>
      <Fade frame={frame} on={7} from="right" delay={300}>
        <Seated x={572} y={326} tone="b" body={80} />
      </Fade>
      {/* Their table edge in front of them, so they sit behind it. */}
      <Fade frame={frame} on={3}>
        <Shape d="M150,392H650V408H150Z" tone="b" off={2} />
      </Fade>

      {/* 6. Plants round the mended bowl. */}
      <Fade frame={frame} on={6} from="grow" delay={400}>
        <path
          className="pl-l"
          d="M270,392C270,372 262,360 250,354M270,380C276,368 286,362 296,362"
        />
        <Shape
          d="M250,354C240,350 236,340 246,336C252,340 254,346 250,354Z"
          tone="g"
          off={1}
        />
        <Shape
          d="M296,362C304,356 314,358 314,366C306,368 300,366 296,362Z"
          tone="g"
          off={1}
        />
        <path
          className="pl-l"
          d="M530,392C530,370 540,358 552,354M530,378C524,366 514,362 506,364"
        />
        <Shape
          d="M552,354C562,350 566,340 556,336C550,340 548,346 552,354Z"
          tone="g"
          off={1}
        />
        <Shape
          d="M506,364C498,358 488,360 488,368C496,370 502,368 506,364Z"
          tone="g"
          off={1}
        />
      </Fade>

      {/* The bowl: three pieces that part at 1 and come back at 5. */}
      <Fade frame={frame} on={1} off={6}>
        {SHARDS.map((s, k) => (
          <Travel key={k} frame={frame} at={at(k)}>
            <Shape d={s.d} tone={s.tone} off={2} />
          </Travel>
        ))}
      </Fade>
      {/* The bowl whole, laid over the pieces while they are together. */}
      <Fade frame={frame} on={-1} off={1}>
        <Shape d={BOWL} tone="c" off={2} />
        <path className="pl-l" d="M300,300C330,312 470,312 500,300" />
      </Fade>
      <Fade frame={frame} on={5} delay={800}>
        <Shape d={BOWL} tone="c" off={2} />
        <path className="pl-l" d="M300,300C330,312 470,312 500,300" />
      </Fade>
      {/* 0. The crack. */}
      <Draw frame={frame} on={-1} off={1} className="pl-f" d={CRACKS[0]} />
      {/* 5. The cracks filled with gold: mended, and the mending shows. */}
      <Draw
        frame={frame}
        on={5}
        className="fp-gold"
        d={CRACKS[0]}
        delay={1200}
      />
      <Draw
        frame={frame}
        on={5}
        className="fp-gold"
        d={CRACKS[1]}
        delay={1500}
      />
    </>
  ),
};

export default film;
