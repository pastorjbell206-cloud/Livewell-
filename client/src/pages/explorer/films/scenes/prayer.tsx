/**
 * "Prayer": the family catechism's questions on prayer (Q49, Q50, Q53, Q54,
 * Q72) in seven pictures. In every picture words rise from the people praying
 * up past the top of the frame, drawn as short swaying strokes with gaps
 * between them, starting well above each head: words going up, never a
 * string tied to anyone.
 *
 *   0  Talking with God   a child at a window in the evening, words rising
 *   1  Our Father         a man on a hillside with his friends round him
 *   2  Thank you          a family at a table with bread; words toward a light
 *   3  Asking             three people apart, words rising from each
 *   4  Saying sorry       a person, head bowed, sets a heavy bundle down
 *   5  Yes, wait or no    three lines: one to a small light, one dotted and
 *                         still going, one turning aside to a young plant
 *   6  When words run out the child at the window again; one small gold flame
 *
 * The one mustard mark: the small light (5) and the flame (6). No face is
 * drawn; Jesus is one plain figure among his friends, as in the other films.
 */
import type { Hatch } from "@/components/art/PlateSvg";
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Flame, Seated, Standing } from "./figures";

/** Words rising from (x, y) up to `top`: short swaying strokes with gaps. */
const words = (x: number, y: number, top = 0) => {
  const out: string[] = [];
  const seg = 44;
  const gap = 22;
  for (let y0 = y, k = 0; y0 - seg >= top - 4; y0 -= seg + gap, k++) {
    const s = k % 2 ? 9 : -9;
    out.push(
      `M${x},${y0}C${x + s},${y0 - seg / 3} ${x - s},${y0 - (2 * seg) / 3} ${x},${y0 - seg}`
    );
  }
  return out;
};

function Rise({
  frame,
  on,
  off,
  x,
  y,
  top,
  delay = 0,
}: {
  frame: number;
  on: number;
  off?: number;
  x: number;
  y: number;
  top?: number;
  delay?: number;
}) {
  return (
    <>
      {words(x, y, top).map((d, k) => (
        <Draw
          key={k}
          frame={frame}
          on={on}
          off={off}
          delay={delay + k * 260}
          d={d}
        />
      ))}
    </>
  );
}

/** Scale a group about a point on the ground. */
const about = (x: number, y: number, s: number) =>
  `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;

/** The evening window and the child sitting by it (pictures 0 and 6, and the poster). */
const Window = ({ h }: { h: Hatch }) => (
  <>
    <Shape d="M400,70H640V318H400Z" tone="b" off={3} />
    <path fill={h.h2} d="M412,82H628V306H412Z" />
    <path className="pl-l" d="M412,82H628V306H412ZM520,82V306M412,194H628" />
    <path
      className="pl-paper"
      d="M576,120l5,12l12,3l-12,3l-5,12l-5,-12l-12,-3l12,-3Z"
    />
    <path
      className="pl-l"
      d="M576,120l5,12l12,3l-12,3l-5,12l-5,-12l-12,-3l12,-3Z"
    />
    <Shape d="M386,318H654V334H386Z" tone="c" off={2} />
    <g transform={about(250, 430, 1.7)}>
      <Shape
        d="M212,430C212,414 226,408 250,408C274,408 288,414 288,430Z"
        tone="g"
        off={1.5}
      />
      <Seated x={250} y={362} tone="c" body={52} />
    </g>
  </>
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The floor or the ground, in every picture. */}
      <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
      <path fill={h.h3} d="M0,448H800V500H0Z" />

      {/* 0 and the poster. The child at the window. */}
      <Fade frame={frame} on={-1} off={1}>
        <Window h={h} />
      </Fade>
      <Rise frame={frame} on={-1} off={1} x={250} y={260} delay={500} />

      {/* 1. Our Father: a man on a hillside, his friends round him. */}
      <Fade frame={frame} on={1} off={2} from="up">
        <Shape
          d="M0,500V372C160,340 320,328 440,336C560,326 700,338 800,356V500Z"
          tone="g"
          off={3}
        />
        <path
          fill={h.h1}
          d="M440,336C560,326 700,338 800,356V500H500C490,440 470,380 440,336Z"
        />
        <g transform={about(400, 420, 1.45)}>
          <Seated x={400} y={334} tone="c" body={44} />
          <Seated x={326} y={356} tone="b" />
          <Seated x={474} y={356} tone="g" />
          <Seated x={276} y={388} tone="g" />
          <Seated x={524} y={388} tone="b" />
          <Seated x={360} y={396} tone="c" />
          <Seated x={440} y={398} tone="b" />
        </g>
      </Fade>
      <Rise frame={frame} on={1} off={2} x={400} y={250} delay={700} />

      {/* 2. Thank you: a family at a table with bread, words toward a light. */}
      <Fade frame={frame} on={2} off={3}>
        <path
          className="pl-f"
          d="M800,30L700,96M780,0L690,80M740,0L670,74M800,80L716,120"
        />
        <g transform={about(400, 430, 1.35)}>
          {[270, 350, 450, 530].map((x, n) => (
            <Seated
              key={x}
              x={x}
              y={330 + (n % 2) * 6}
              body={58}
              tone={(["g", "b", "c", "g"] as const)[n]}
            />
          ))}
          <Shape d="M220,370H580V398H220Z" tone="c" />
          <path className="pl-l" d="M220,377H580M240,398V430M560,398V430" />
          <Shape d="M372,370a28,14 0 0 1 56,0Z" tone="c" off={1} />
        </g>
      </Fade>
      {[
        "M402,250C424,226 440,214 462,200",
        "M492,182C520,166 540,154 566,140",
        "M598,124C626,110 648,100 676,90",
      ].map((d, k) => (
        <Draw
          key={d}
          frame={frame}
          on={2}
          off={3}
          delay={700 + k * 260}
          d={d}
        />
      ))}

      {/* 3. Asking: three people apart, words rising from each. */}
      <Fade frame={frame} on={3} off={4} from="up">
        <Standing x={180} y={318} tone="b" s={1.8} />
        <Standing x={400} y={318} tone="c" s={1.8} />
        <Standing x={620} y={318} tone="g" s={1.8} />
      </Fade>
      <Rise frame={frame} on={3} off={4} x={180} y={268} delay={600} />
      <Rise frame={frame} on={3} off={4} x={400} y={268} delay={900} />
      <Rise frame={frame} on={3} off={4} x={620} y={268} delay={1200} />

      {/* 4. Saying sorry: head bowed, a heavy bundle set down beside. */}
      <Fade frame={frame} on={4} off={5} from="up">
        <Shape
          d="M276,430C276,372 296,346 340,346C384,346 404,372 404,430Z"
          tone="b"
          off={2}
        />
        <path
          className="pl-o"
          d="M290,362a17,17 0 1,0 34,0a17,17 0 1,0 -34,0Z"
        />
        <path
          className="pl-l"
          d="M290,362a17,17 0 1,0 34,0a17,17 0 1,0 -34,0Z"
        />
      </Fade>
      <Fade frame={frame} on={4} off={5} from="left" delay={600}>
        <Shape
          d="M444,430C436,390 456,370 486,372C518,370 536,390 528,430Z"
          tone="c"
          off={2}
        />
        <path className="pl-l" d="M474,374l12,-16l12,16" />
      </Fade>
      <Rise frame={frame} on={4} off={5} x={330} y={290} delay={900} />

      {/* 5. Yes, wait or no: three lines from one person. */}
      <Fade frame={frame} on={5} off={6} from="up">
        <g transform={about(400, 430, 1.5)}>
          <Seated x={400} y={372} tone="c" body={58} />
        </g>
      </Fade>
      <Draw
        frame={frame}
        on={5}
        off={6}
        delay={500}
        d="M384,296C356,262 330,230 304,204C282,182 264,166 250,154"
      />
      <Fade frame={frame} on={5} off={6} delay={1500} from="grow">
        <path
          className="pl-m"
          d="M218,130a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z"
        />
        <path
          className="pl-l"
          d="M218,130a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z"
        />
        <path
          className="pl-f"
          d="M234,100V88M234,172V160M204,130H192M276,130H264M212,108l-8,-8M256,108l8,-8"
        />
      </Fade>
      <Fade frame={frame} on={5} off={6} delay={800}>
        <path
          className="pl-l"
          strokeDasharray="3 9"
          d="M402,290C414,250 390,214 402,176C414,138 390,100 402,62C410,40 398,20 402,0"
        />
      </Fade>
      <Draw
        frame={frame}
        on={5}
        off={6}
        delay={1100}
        d="M418,298C460,262 530,252 588,272C636,290 646,346 644,396"
      />
      <Fade frame={frame} on={5} off={6} delay={1800} from="up">
        <path className="pl-l" d="M644,430V398" />
        <Shape
          d="M644,412C628,400 620,390 618,376C634,378 642,392 644,412Z"
          tone="g"
          off={1}
        />
        <Shape
          d="M644,404C660,392 668,382 670,368C654,370 646,384 644,404Z"
          tone="g"
          off={1}
        />
      </Fade>

      {/* 6. When words run out: the window again, one small gold flame above. */}
      <Fade frame={frame} on={6}>
        <Window h={h} />
      </Fade>
      <Rise frame={frame} on={6} x={250} y={260} top={96} delay={500} />
      <Fade frame={frame} on={6} delay={1500} from="grow">
        <Flame x={250} y={58} s={1.4} gold />
      </Fade>
    </>
  ),
};

export default film;
