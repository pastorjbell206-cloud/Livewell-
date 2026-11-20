/**
 * "The Bible: how we got it": from the Study Bible's guides (What the Bible
 * is; How we got the Old Testament; How we got the New Testament; How the
 * books were chosen; Why translations differ) and the "Bible" card, claiming
 * no more than they do. No date for any book, no number of copies, and no
 * letters drawn on any page: every line of writing is a plain stroke.
 *
 *   0  Many writers          a long shelf; scrolls of many sizes set on it one by one
 *   1  Spoken and written    one person speaks, another writes on a scroll at a low table
 *   2  Scrolls and ink       a scroll unrolled on a table, a reed pen, an ink pot
 *   3  Copied by hand        one scroll's lines written again on a second, then a third
 *   4  From scroll to book   a codex opens on the table, a rolled scroll set aside
 *   5  Received as Scripture books side by side on one shelf, a small lamp
 *   6  In every language     one open book, many books of other shapes round it
 *
 * The one mustard mark: the small lamp's flame, on the shelf (the poster and 5).
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

/** A rolled scroll lying on its side: its left end at (x, y), its length and thickness. */
function Scroll({
  x,
  y,
  len,
  r,
}: {
  x: number;
  y: number;
  len: number;
  r: number;
}) {
  return (
    <g>
      <Shape
        d={`M${x},${y - r}H${x + len}a${r * 0.5},${r} 0 0 1 0,${2 * r}H${x}Z`}
        tone="c"
        off={1}
      />
      <path
        className="pl-o"
        d={`M${x},${y - r}a${r * 0.5},${r} 0 1,0 0,${2 * r}a${r * 0.5},${r} 0 1,0 0,${-2 * r}Z`}
      />
      <path
        className="pl-l"
        d={`M${x},${y - r}a${r * 0.5},${r} 0 1,0 0,${2 * r}a${r * 0.5},${r} 0 1,0 0,${-2 * r}Z`}
      />
    </g>
  );
}

/** An open scroll on a table: two rolled ends and the sheet between, its lines as strokes. */
function OpenScroll({
  x,
  y,
  w,
  frame,
  on,
  off,
  delay = 0,
  write = false,
}: {
  x: number;
  y: number;
  w: number;
  frame: number;
  on: number;
  off?: number;
  delay?: number;
  write?: boolean;
}) {
  const rows = [0, 1, 2, 3, 4];
  const cols = Math.max(1, Math.floor((w - 40) / 70));
  return (
    <g>
      <Shape d={`M${x},${y}H${x + w}V${y + 70}H${x}Z`} tone="c" off={1.5} />
      <path
        className="pl-l"
        d={`M${x},${y}V${y + 70}M${x + w},${y}V${y + 70}`}
        style={{ strokeWidth: 6 }}
      />
      {Array.from({ length: cols }, (_, c) =>
        rows.map(r => {
          const lx = x + 18 + c * 70;
          const ly = y + 14 + r * 11;
          const d = `M${lx},${ly}H${lx + 54}`;
          return write ? (
            <Draw
              key={`${c}-${r}`}
              frame={frame}
              on={on}
              off={off}
              className="pl-f"
              delay={delay + (c * rows.length + r) * 160}
              d={d}
            />
          ) : (
            <path key={`${c}-${r}`} className="pl-f" d={d} />
          );
        })
      )}
    </g>
  );
}

/** A book standing on a shelf: its foot at (x, y), its width and height. */
const Book = ({
  x,
  y,
  w,
  hgt,
  tone,
}: {
  x: number;
  y: number;
  w: number;
  hgt: number;
  tone: "b" | "g" | "c";
}) => (
  <g>
    <Shape d={`M${x},${y}V${y - hgt}H${x + w}V${y}Z`} tone={tone} off={1.5} />
    <path
      className="pl-f"
      d={`M${x + 3},${y - hgt + 10}H${x + w - 3}M${x + 3},${y - 10}H${x + w - 3}`}
    />
  </g>
);

/** The small lamp, its flame the one mustard mark. */
const Lamp = ({ x, y }: { x: number; y: number }) => (
  <g>
    <Shape
      d={`M${x - 18},${y}C${x - 18},${y + 12} ${x + 18},${y + 12} ${x + 22},${y - 2}L${x + 30},${y - 6}C${x + 14},${y - 10} ${x - 10},${y - 10} ${x - 18},${y}Z`}
      tone="c"
      off={1}
    />
    <path
      className="pl-o"
      d={`M${x + 26},${y - 8}c4,-6 6,-12 4,-20c-6,6 -8,13 -4,20Z`}
    />
    <path
      className="pl-m"
      d={`M${x + 26},${y - 8}c4,-6 6,-12 4,-20c-6,6 -8,13 -4,20Z`}
    />
    <path
      className="pl-l"
      d={`M${x + 26},${y - 8}c4,-6 6,-12 4,-20c-6,6 -8,13 -4,20Z`}
    />
    <path
      className="pl-f"
      d={`M${x + 28},${y - 36}v-10M${x + 14},${y - 30}l-6,-8M${x + 42},${y - 30}l6,-8`}
    />
  </g>
);

/** A table top and its front, seen from the front. */
const Table = ({ x, w, y }: { x: number; w: number; y: number }) => (
  <g>
    <Shape d={`M${x},${y}H${x + w}V${y + 16}H${x}Z`} tone="c" off={2} />
    <path
      className="pl-l"
      d={`M${x + 20},${y + 16}V420M${x + w - 20},${y + 16}V420`}
    />
  </g>
);

const SCROLLS: [number, number, number][] = [
  [40, 70, 14],
  [124, 110, 18],
  [248, 60, 12],
  [322, 130, 20],
  [466, 80, 15],
  [560, 96, 16],
  [670, 64, 13],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The room's floor, in every picture. */}
      <path className="pl-l" d="M0,420H800" />
      <path fill={h.h3} d="M0,428H800V500H0Z" />

      {/* 0 and the poster. A long shelf, the scrolls set on it one by one. */}
      <Fade frame={frame} on={-1} off={1}>
        <Shape d="M20,300H780V314H20Z" tone="c" off={2} />
        <path className="pl-l" d="M60,314L80,360M740,314L720,360" />
        {SCROLLS.map(([x, len, r], n) => (
          <Fade
            key={x}
            frame={frame}
            on={-1}
            off={1}
            from="down"
            delay={200 + n * 350}
          >
            <Scroll x={x} y={300 - r} len={len} r={r} />
          </Fade>
        ))}
      </Fade>
      {/* The poster only: an open book at the shelf's end under the lamp. */}
      <Fade frame={frame} on={-1} off={0}>
        <Shape
          d="M610,296V262C628,256 648,258 664,266C680,258 700,256 718,262V296C700,290 680,292 664,300C648,292 628,290 610,296Z"
          tone="c"
          off={1}
        />
        <path className="pl-l" d="M664,266V300" />
        <Lamp x={736} y={288} />
      </Fade>

      {/* 1. One speaks; one sits at a low table and writes on a scroll. */}
      <Fade frame={frame} on={1} off={2} from="up">
        <g transform="translate(400 420) scale(1.4) translate(-400 -420)">
          <Standing x={250} y={300} tone="b" s={1.6} />
          <path
            className="pl-f"
            d="M282,320c10,-6 16,-6 24,0M286,334c12,-6 20,-6 30,0M282,348c10,-6 16,-6 24,0"
          />
          <g transform="translate(470 330) scale(1.6) translate(-470 -330)">
            <Seated x={470} y={300} tone="c" body={42} />
          </g>
          <Table x={380} w={220} y={364} />
          <path className="pl-o" d="M410,356H560V364H410Z" />
          <path className="pl-l" d="M410,356H560V364H410Z" />
          <path className="pl-f" d="M424,360H470M486,360H540" />
          <path
            className="pl-l"
            d="M500,350L530,316"
            style={{ strokeWidth: 2.5 }}
          />
          <Shape d="M572,364V350h16v14Z" tone="b" off={1} />
        </g>
      </Fade>

      {/* 2. A scroll unrolled on a table, a reed pen and an ink pot; two more rolled. */}
      <Fade frame={frame} on={2} off={3} from="up">
        <Table x={80} w={640} y={336} />
        <OpenScroll x={160} y={262} w={360} frame={frame} on={2} off={3} />
        <path
          className="pl-l"
          d="M540,330L600,262"
          style={{ strokeWidth: 3 }}
        />
        <Shape d="M610,336V310h28v26Z" tone="b" off={1.5} />
        <path fill={h.hh} d="M614,314h20v6h-20Z" />
        <Scroll x={110} y={322} len={40} r={10} />
        <Scroll x={650} y={322} len={50} r={12} />
      </Fade>

      {/* 3. Copied by hand: the lines written again on a second scroll, then a third. */}
      <Fade frame={frame} on={3} off={4} from="up">
        <Table x={40} w={720} y={336} />
        <OpenScroll x={60} y={160} w={300} frame={frame} on={3} off={4} />
        <path className="pl-f" d="M372,196h40m-10,-8l10,8l-10,8" />
        <OpenScroll
          x={430}
          y={160}
          w={300}
          frame={frame}
          on={3}
          off={4}
          write
          delay={300}
        />
        <path className="pl-f" d="M580,240v30m-8,-10l8,10l8,-10" />
        <Fade frame={frame} on={3} off={4} from="down" delay={4200}>
          <OpenScroll x={430} y={262} w={300} frame={frame} on={3} off={4} />
        </Fade>
        <path
          className="pl-l"
          d="M700,330L750,280"
          style={{ strokeWidth: 3 }}
        />
      </Fade>

      {/* 4. From scroll to book: the scroll goes, a codex opens in its place. */}
      <Fade frame={frame} on={4} off={5}>
        <Table x={140} w={520} y={360} />
        <Scroll x={170} y={346} len={70} r={12} />
        <Fade frame={frame} on={4} off={5} from="grow" delay={300}>
          <Shape
            d="M260,356V236C300,222 360,226 400,246C440,226 500,222 540,236V356C500,342 440,346 400,364C360,346 300,342 260,356Z"
            tone="c"
            off={2}
          />
          <path className="pl-l" d="M400,246V364" />
          <path
            className="pl-f"
            d="M400,262h6M400,284h6M400,306h6M400,328h6M400,350h6"
          />
          <path
            className="pl-f"
            d="M282,262C310,254 350,256 382,268M282,282C310,274 350,276 382,288M282,302C310,294 350,296 382,308M282,322C310,314 350,316 382,328M418,268C450,256 490,254 518,262M418,288C450,276 490,274 518,282M418,308C450,296 490,294 518,302M418,328C450,316 490,314 518,322"
          />
        </Fade>
      </Fade>

      {/* 5. Received as Scripture: books side by side on one shelf, a small lamp. */}
      <Fade frame={frame} on={5} off={6}>
        <Shape d="M60,330H740V344H60Z" tone="c" off={2} />
        <path className="pl-l" d="M100,344L120,390M700,344L680,390" />
        {Array.from({ length: 16 }, (_, n) => (
          <Fade
            key={n}
            frame={frame}
            on={5}
            off={6}
            from="down"
            delay={150 + n * 120}
          >
            <Book
              x={110 + n * 36}
              y={330}
              w={30}
              hgt={90 + ((n * 37) % 5) * 8}
              tone={(["b", "g", "c"] as const)[n % 3]}
            />
          </Fade>
        ))}
        <Lamp x={706} y={318} />
      </Fade>

      {/* 6. In every language: one open book, many books of other shapes round it. */}
      <Fade frame={frame} on={6}>
        <Shape
          d="M310,330V250C340,240 380,242 400,256C420,242 460,240 490,250V330C460,320 420,322 400,336C380,322 340,320 310,330Z"
          tone="c"
          off={2}
        />
        <path className="pl-l" d="M400,256V336" />
        <path
          className="pl-f"
          d="M326,268C350,262 374,264 392,272M326,288C350,282 374,284 392,292M326,308C350,302 374,304 392,312M408,272C426,264 450,262 474,268M408,292C426,284 450,282 474,288M408,312C426,304 450,302 474,308"
        />
        {(
          [
            [90, 170, "b", "M8,0h20M8,8h14M8,16h20"],
            [180, 90, "g", "M8,0v20M16,0v14M24,0v20"],
            [560, 80, "c", "M8,4c6,-6 12,6 18,0M8,14c6,-6 12,6 18,0"],
            [660, 170, "b", "M8,0h6v6h6v6h6"],
            [80, 330, "c", "M8,0l6,8l6,-8l6,8"],
            [640, 330, "g", "M8,0h20M8,10h20M8,20h10"],
            [230, 380, "b", "M8,0c0,10 20,10 20,0"],
            [520, 380, "c", "M8,0v20M16,6v14M24,0v20"],
          ] as [number, number, "b" | "g" | "c", string][]
        ).map(([x, y, tone, lines], n) => (
          <Fade key={n} frame={frame} on={6} from="grow" delay={400 + n * 220}>
            <Shape d={`M${x},${y}h48v62h-48Z`} tone={tone} off={1.5} />
            <path
              className="pl-f"
              transform={`translate(${x + 6} ${y + 18})`}
              d={lines}
            />
          </Fade>
        ))}
      </Fade>
    </>
  ),
};

export default film;
