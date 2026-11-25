/**
 * "Promises that build: the covenants": the promise thread (threads.json) and
 * the Study Bible's study of covenant, in seven pictures. Each covenant is a
 * stone laid on the arch at the right, on alternate sides, until the cup at
 * the supper is set as its keystone (the one mustard mark) and the arch
 * stands open as a gateway.
 *
 *   0  The bow in the clouds    hills after rain, a rainbow; the first stone (a bow)
 *   1  Count the stars          a tent under the stars, a man outside it; a star stone
 *   2  Rescued, then the law    the mountain in cloud, two tablets; a tablets stone
 *   3  A throne for ever        a throne on a hill, a line of marks; a crown stone
 *   4  A new covenant promised  broken tablets, a person with a heart; a heart stone
 *   5  The cup at the supper    a table with a loaf and a cup; a loaf stone and the gold keystone
 *   6  Every promise kept       the arch open as a gateway, light through it, people coming
 *
 * Until it is finished, the whole arch is drawn faint and dotted, so the
 * reader can see where each stone will go. No face is drawn; no letters are
 * written on the tablets.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

/* The arch: centre on the ground at the right, seven stones. */
const AX = 620;
const AY = 420;
const R1 = 92;
const R2 = 168;
const N = 7;

const pt = (r: number, a: number) =>
  `${(AX + r * Math.cos(a)).toFixed(1)},${(AY - r * Math.sin(a)).toFixed(1)}`;

/** Stone k of the arch (0 at the left foot, 6 at the right), a little apart from its neighbours. */
function stone(k: number) {
  const gap = 0.014;
  const a0 = Math.PI - (k * Math.PI) / N - (k === 0 ? 0 : gap);
  const a1 = Math.PI - ((k + 1) * Math.PI) / N + (k === N - 1 ? 0 : gap);
  return `M${pt(R1, a0)}L${pt(R2, a0)}A${R2},${R2} 0 0,1 ${pt(R2, a1)}L${pt(R1, a1)}A${R1},${R1} 0 0,0 ${pt(R1, a0)}Z`;
}

/** The middle of stone k, where its sign is cut. */
function mid(k: number): [number, number] {
  const a = Math.PI - ((k + 0.5) * Math.PI) / N;
  const r = (R1 + R2) / 2;
  return [AX + r * Math.cos(a), AY - r * Math.sin(a)];
}

const star = (x: number, y: number, r: number) => {
  const p: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.42 : r;
    p.push(
      `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`
    );
  }
  return `M${p.join("L")}Z`;
};

const HEART =
  "M0,12C-14,2 -20,-6 -14,-12C-9,-16 -3,-14 0,-8C3,-14 9,-16 14,-12C20,-6 14,2 0,12Z";
const CROWN = "M-14,8V-8L-7,0L0,-12L7,0L14,-8V8Z";
const CUP = "M-13,-14H13C13,-2 8,4 3,6V12H9V16H-9V12H-3V6C-8,4 -13,-2 -13,-14Z";
const TABLET = "M-9,12V-6a9,9 0 0 1 18,0V12Z";

/** The sign cut into each stone, drawn round the stone's middle. */
function Sign({ k }: { k: number }) {
  const [x, y] = mid(k);
  const at = `translate(${x.toFixed(1)} ${y.toFixed(1)})`;
  switch (k) {
    case 0: // the bow
      return (
        <path
          className="pl-l"
          transform={at}
          d="M-16,8a16,16 0 0 1 32,0M-10,8a10,10 0 0 1 20,0M-4,8a4,4 0 0 1 8,0"
        />
      );
    case 6: // a star
      return <path className="pl-o" d={star(x, y, 14)} />;
    case 1: // two tablets
      return (
        <g transform={at}>
          <path className="pl-o" d="M-19,12V-4a8,8 0 0 1 16,0V12Z" />
          <path className="pl-o" d="M3,12V-4a8,8 0 0 1 16,0V12Z" />
        </g>
      );
    case 5: // a crown
      return <path className="pl-o" transform={at} d={CROWN} />;
    case 2: // a heart
      return <path className="pl-o" transform={`${at} scale(0.8)`} d={HEART} />;
    case 4: // a loaf
      return (
        <g transform={at}>
          <path className="pl-o" d="M-16,6C-16,-10 16,-10 16,6Z" />
          <path className="pl-f" d="M-8,-2l4,-4M0,-2l4,-4M8,-2l3,-3" />
        </g>
      );
    default: // the keystone: the cup, the one gold mark
      return (
        <g transform={at}>
          <path className="pl-m" d={CUP} />
          <path className="pl-l" d={CUP} />
        </g>
      );
  }
}

/** The frame from which each stone is in place: L, R, L, R, L, then the keystone and the last stone together. */
const LAID: Record<number, number> = {
  0: -1,
  6: 1,
  1: 2,
  5: 3,
  2: 4,
  4: 5,
  3: 5,
};

/** A plain throne, its foot at (x, y). */
const Throne = ({ x, y }: { x: number; y: number }) => (
  <g>
    <Shape
      d={`M${x - 30},${y}V${y - 34}H${x - 24}V${y - 86}H${x + 24}V${y - 34}H${x + 30}V${y}Z`}
      tone="c"
      off={2}
    />
    <path
      className="pl-l"
      d={`M${x - 24},${y - 34}H${x + 24}M${x - 30},${y - 14}H${x + 30}`}
    />
  </g>
);

/** A cloud, its middle at (x, y). */
const Cloud = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path
    className="pl-o"
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M-50,14C-62,14 -62,-4 -46,-4C-44,-20 -20,-24 -12,-10C-4,-26 26,-24 28,-6C44,-8 50,14 36,14Z"
  />
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* 1. Night: the sky is dark for the stars. */}
      <Fade frame={frame} on={1} off={2}>
        <path className="fp-dark" fill={h.h1} d="M0,0H800V420H0Z" />
        {[
          [60, 60, 9],
          [140, 120, 6],
          [210, 46, 11],
          [300, 96, 7],
          [380, 40, 8],
          [440, 130, 6],
          [520, 70, 10],
          [610, 30, 7],
          [700, 90, 9],
          [760, 40, 6],
          [90, 190, 7],
          [250, 180, 9],
          [400, 210, 6],
          [180, 250, 6],
          [660, 170, 7],
        ].map(([x, y, r]) => (
          <path key={`${x}-${y}`} className="pl-o" d={star(x, y, r * 1.6)} />
        ))}
      </Fade>

      {/* The ground, in every picture. */}
      <path className="pl-l" d="M0,420H800" />
      <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
      <path fill={h.h3} d="M0,444H800V500H0Z" />

      {/* 0. Hills after rain, under a rainbow. */}
      <Fade frame={frame} on={-1} off={1}>
        <path
          fill={h.h2}
          d="M60,420A170,170 0 0 1 400,420H380A150,150 0 0 0 80,420Z"
        />
        <path
          fill={h.h1}
          d="M80,420A150,150 0 0 1 380,420H360A130,130 0 0 0 100,420Z"
        />
        <Draw
          frame={frame}
          on={-1}
          off={1}
          d="M60,420A170,170 0 0 1 400,420M80,420A150,150 0 0 1 380,420M100,420A130,130 0 0 1 360,420"
        />
        <Shape
          d="M0,420C60,360 140,340 220,360C300,380 350,356 390,372C414,382 432,402 444,420Z"
          tone="g"
          off={3}
        />
        <Cloud x={70} y={70} />
        <Cloud x={360} y={110} s={0.8} />
        <path
          className="pl-f"
          d="M40,404C120,398 200,400 280,394M120,412C200,408 300,410 420,404"
        />
      </Fade>

      {/* 1. A tent under the stars, and Abram standing outside it. */}
      <Fade frame={frame} on={1} off={2} from="up">
        <Shape d="M130,420L200,330L270,420Z" tone="c" off={2} />
        <path className="pl-l" d="M200,330V420M188,420L200,380L212,420" />
        <path className="pl-l" d="M200,330l-10,-12M200,330l10,-12" />
        <Standing x={340} y={352} tone="b" s={1.1} />
      </Fade>

      {/* 2. The mountain in cloud, and two tablets. */}
      <Fade frame={frame} on={2} off={3} from="up">
        <Shape
          d="M0,420L120,240L180,280L240,170L330,300L380,270L450,420Z"
          tone="g"
          off={3}
        />
        <path fill={h.h2} d="M240,170L330,300L380,270L450,420H280Z" />
        <path
          fill={h.h2}
          d="M150,230C140,200 180,180 210,190C220,150 280,150 290,180C330,170 350,210 330,230Z"
        />
        <path
          className="pl-o"
          d="M150,230C140,200 180,180 210,190C220,150 280,150 290,180C330,170 350,210 330,230Z"
        />
        <path
          className="pl-f"
          d="M168,214C200,206 240,210 270,204M190,198C220,190 250,194 280,188"
        />
        <g transform="translate(330 394) scale(2.2)">
          <Shape d={TABLET} tone="c" off={0.8} />
          <path className="pl-f" d="M-5,-4H5M-5,0H5M-5,4H5M-5,8H3" />
        </g>
        <g transform="translate(378 394) scale(2.2)">
          <Shape d={TABLET} tone="c" off={0.8} />
          <path className="pl-f" d="M-5,-4H5M-5,0H5M-5,4H5M-5,8H3" />
        </g>
      </Fade>

      {/* 3. A throne on a hill; a line of marks runs on from it. */}
      <Fade frame={frame} on={3} off={4} from="up">
        <Shape
          d="M60,420C110,330 180,300 270,300C360,300 400,340 430,420Z"
          tone="g"
          off={3}
        />
        <g transform="translate(270 300) scale(1.5) translate(-270 -300)">
          <Throne x={270} y={300} />
        </g>
        <path
          className="pl-o"
          transform="translate(270 238) scale(1.3)"
          d={CROWN}
        />
        <path
          className="pl-l"
          transform="translate(270 238) scale(1.3)"
          d={CROWN}
        />
        {[0, 1, 2, 3, 4, 5].map(k => (
          <Fade key={k} frame={frame} on={3} off={4} delay={600 + k * 260}>
            <path
              className="pl-k"
              d={`M${196 - k * 38},${214 - k * 12}a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z`}
            />
          </Fade>
        ))}
        <Draw
          frame={frame}
          on={3}
          off={4}
          delay={400}
          className="pl-f"
          d="M220,218C160,196 80,166 0,140"
        />
      </Fade>

      {/* 4. Broken tablets; a person with the law written on the heart. */}
      <Fade frame={frame} on={4} off={5} from="up">
        <g transform="translate(110 382) scale(3.2)">
          <Shape d={TABLET} tone="c" off={0.6} />
          <path className="pl-f" d="M-5,-4H5M-5,0H5M-5,4H5M-5,8H3" />
          <path className="pl-l" d="M-6,-13L-2,-6L-5,0L1,6L-1,12" />
        </g>
        <g transform="translate(200 408) rotate(-90) scale(3.2)">
          <Shape d={TABLET} tone="c" off={0.6} />
          <path className="pl-f" d="M-5,-4H5M-5,0H5M-5,4H5" />
          <path className="pl-l" d="M-2,-15L1,-8L-3,-2L2,4L-1,12" />
        </g>
        <Standing x={320} y={315} tone="b" s={1.7} />
        <path className="pl-o" transform="translate(320 376)" d={HEART} />
        <path className="pl-l" transform="translate(320 376)" d={HEART} />
        <Draw
          frame={frame}
          on={4}
          off={5}
          delay={900}
          className="pl-f"
          d="M311,370H329M309,376H331M313,382H327"
        />
      </Fade>

      {/* 5. The upper room: a table with a loaf and a cup, a lamp in the window. */}
      <Fade frame={frame} on={5} off={6} from="up">
        <Shape d="M40,420V170H440V420Z" tone="c" off={2} />
        <path fill={h.h2} d="M40,170H440V200H40Z" />
        <path className="pl-paper" d="M210,220H270V280H210Z" />
        <path
          className="pl-l"
          d="M210,220H270V280H210ZM240,220V280M210,250H270"
        />
        <path className="pl-o" d="M240,262c-6,-4 -6,-12 0,-18c6,6 6,14 0,18Z" />
        <Seated x={130} y={300} tone="b" body={60} />
        <Seated x={240} y={292} tone="g" body={60} />
        <Seated x={350} y={300} tone="b" body={60} />
        <Shape d="M80,350H400V362H80Z" tone="c" off={1.5} />
        <path className="pl-o" d="M90,362H390V420H90Z" />
        <path fill={h.h2} d="M90,362H390V420H90Z" />
        <path className="pl-l" d="M90,362H390V420H90Z" />
        <path className="pl-o" d="M150,350C150,334 190,334 190,350Z" />
        <path className="pl-f" d="M160,344l6,-6M172,344l6,-6" />
        <g transform="translate(290 336) scale(0.9)">
          <path className="pl-o" d={CUP} />
          <path className="pl-l" d={CUP} />
        </g>
      </Fade>

      {/* 6. People come along the path toward the open arch; light through it. */}
      <Fade frame={frame} on={6} from="up">
        <Shape
          d="M0,420C80,370 180,360 280,380C340,392 400,380 452,400V420Z"
          tone="g"
          off={3}
        />
        <path
          className="pl-f"
          d="M0,470C160,450 360,440 540,424M80,500C260,480 440,450 600,424"
        />
        <Standing x={110} y={366} tone="c" s={0.9} />
        <Standing x={190} y={360} tone="b" s={1} />
        <Standing x={260} y={370} tone="g" s={0.85} />
        <Standing x={340} y={356} tone="c" s={1.05} />
        <Standing x={420} y={364} tone="b" s={0.9} />
      </Fade>
      <Draw
        frame={frame}
        on={6}
        delay={700}
        className="pl-f"
        d="M620,410V340M600,410L572,350M640,410L668,350M586,414L546,372M654,414L694,372"
      />

      {/* The arch: faint and dotted until it is finished, then stone by stone. */}
      <Fade frame={frame} on={-1} off={6}>
        <path
          className="pl-f"
          strokeDasharray="3 6"
          d={`M${AX - R2},${AY}A${R2},${R2} 0 0,1 ${AX + R2},${AY}M${AX - R1},${AY}A${R1},${R1} 0 0,1 ${AX + R1},${AY}`}
        />
      </Fade>
      {Object.entries(LAID).map(([ks, on]) => {
        const k = Number(ks);
        return (
          <Fade
            key={k}
            frame={frame}
            on={on}
            from="down"
            delay={on > 0 ? 500 : 0}
          >
            <Shape d={stone(k)} tone="c" off={2} />
            <Sign k={k} />
          </Fade>
        );
      })}
    </>
  ),
};

export default film;
