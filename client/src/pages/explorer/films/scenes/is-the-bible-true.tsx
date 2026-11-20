/**
 * "Is the Bible true?": the Honest Answer "Why would anyone trust the
 * Bible?" and the library's pieces on the text of the New Testament, in
 * eight pictures, claiming what they claim and conceding what they concede.
 *
 *   0  A fair question           an open book on a table, a ring with a question mark
 *   1  Copies of copies          one scroll, and lines drawing to three copies
 *   2  Not a whispering game     many scrolls joined in every direction
 *   3  Thousands of copies       rows of scrolls and bound books
 *   4  Found in a cave           a cave mouth, a clay jar, a scroll
 *   5  Where it can be checked   a carved stone
 *   6  What this does not prove  a balance, level
 *   7  Read it yourself          the open book again, the balance beside it
 *
 * No letters are drawn on any page or stone: nothing is made to look like a
 * real manuscript or inscription. The one mustard mark is the book's ribbon.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { ring } from "./figures";

/** A scroll, rolled at both ends, centred on (x, y), at size s. */
function Scroll({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const w = 34 * s;
  const hh = 20 * s;
  const r = 5 * s;
  return (
    <g>
      <path
        className="pl-o"
        d={`M${x - w},${y - hh}H${x + w}V${y + hh}H${x - w}Z`}
      />
      <path
        className="pl-f"
        d={`M${x - w + 8 * s},${y - 8 * s}H${x + w - 8 * s}M${x - w + 8 * s},${y}H${x + w - 8 * s}M${x - w + 8 * s},${y + 8 * s}H${x + w - 14 * s}`}
      />
      <Shape
        d={`M${x - w - r},${y - hh - 4 * s}H${x - w + r}V${y + hh + 4 * s}H${x - w - r}Z`}
        tone="c"
        off={1}
      />
      <Shape
        d={`M${x + w - r},${y - hh - 4 * s}H${x + w + r}V${y + hh + 4 * s}H${x + w - r}Z`}
        tone="c"
        off={1}
      />
    </g>
  );
}

/** A bound book standing, its spine toward us. */
function Codex({
  x,
  y,
  tone,
}: {
  x: number;
  y: number;
  tone: "b" | "g" | "c";
}) {
  return (
    <Shape
      d={`M${x - 14},${y + 22}V${y - 22}H${x + 14}V${y + 22}Z`}
      tone={tone}
      off={1.5}
    />
  );
}

/** The open book, centred on (x, y). */
function Book({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shape
        d={`M${x - 120},${y + 40}V${y - 30}C${x - 80},${y - 46} ${x - 36},${y - 42} ${x},${y - 24}C${x + 36},${y - 42} ${x + 80},${y - 46} ${x + 120},${y - 30}V${y + 40}C${x + 80},${y + 26} ${x + 36},${y + 30} ${x},${y + 48}C${x - 36},${y + 30} ${x - 80},${y + 26} ${x - 120},${y + 40}Z`}
        tone="c"
        off={3}
      />
      <path className="pl-l" d={`M${x},${y - 24}V${y + 48}`} />
      <path
        className="pl-f"
        d={`M${x - 100},${y - 14}C${x - 70},${y - 24} ${x - 40},${y - 22} ${x - 16},${y - 10}M${x - 100},${y + 4}C${x - 70},${y - 6} ${x - 40},${y - 4} ${x - 16},${y + 8}M${x - 100},${y + 22}C${x - 70},${y + 12} ${x - 40},${y + 14} ${x - 16},${y + 26}M${x + 16},${y - 10}C${x + 40},${y - 22} ${x + 70},${y - 24} ${x + 100},${y - 14}M${x + 16},${y + 8}C${x + 40},${y - 4} ${x + 70},${y - 6} ${x + 100},${y + 4}M${x + 16},${y + 26}C${x + 40},${y + 14} ${x + 70},${y + 12} ${x + 100},${y + 22}`}
      />
      <path
        className="pl-m"
        d={`M${x - 4},${y + 46}H${x + 6}V${y + 64}L${x + 1},${y + 58}L${x - 4},${y + 64}Z`}
      />
      <path
        className="pl-l"
        d={`M${x - 4},${y + 46}V${y + 64}L${x + 1},${y + 58}L${x + 6},${y + 64}V${y + 46}`}
      />
    </g>
  );
}

/** The balance, level, standing on the table (from Does God exist?). */
function Balance({ x }: { x: number }) {
  return (
    <g transform={`translate(${x - 400},0)`}>
      <path className="pl-l" d="M372,412H428M400,412V300M318,312H482" />
      <path className="pl-l" d="M330,312L312,364M330,312L348,364" />
      <path className="pl-l" d="M470,312L452,364M470,312L488,364" />
      <Shape d="M304,364H356C352,380 308,380 304,364Z" tone="b" off={1.5} />
      <Shape d="M444,364H496C492,380 448,380 444,364Z" tone="b" off={1.5} />
    </g>
  );
}

/** The copies spread out over many places (2), joined in every direction. */
const SPREAD: [number, number][] = [
  [130, 200],
  [270, 120],
  [270, 290],
  [420, 190],
  [560, 110],
  [560, 290],
  [690, 200],
];
const LINKS =
  "M130,200L270,120M130,200L270,290M270,120L420,190M270,290L420,190M270,120L270,290M420,190L560,110M420,190L560,290M560,110L690,200M560,290L690,200M560,110L560,290M270,290L560,290M270,120L560,110";

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The ground. */}
      <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
      <path fill={h.hh} d="M0,452H800V500H0Z" />

      {/* 0 and 7: a table with the open book. */}
      <Fade frame={frame} on={-1} off={1}>
        <path className="pl-l" d="M240,412H560M260,412V430M540,412V430" />
        <Book x={400} y={362} />
        <path className="pl-o" d={ring(400, 170, 44)} />
        <path className="pl-l" d={ring(400, 170, 44)} />
        <path
          className="pl-l"
          d="M384,156C384,140 416,138 416,156C416,170 400,170 400,186M400,200V204"
        />
      </Fade>

      {/* 1. One scroll, and lines drawing out to three copies. */}
      <Fade frame={frame} on={1} off={2}>
        <Scroll x={150} y={250} s={1.4} />
      </Fade>
      {[
        [400, 120],
        [400, 250],
        [400, 380],
      ].map(([x, y], n) => (
        <g key={y}>
          <Draw
            frame={frame}
            on={1}
            off={2}
            className="pl-f"
            d={`M206,250C280,250 300,${y} ${x - 60},${y}`}
            delay={n * 300}
          />
          <Fade frame={frame} on={1} off={2} from="left" delay={600 + n * 300}>
            <Scroll x={x} y={y} s={1.1} />
          </Fade>
        </g>
      ))}

      {/* 2. Many places at once, compared with one another. */}
      <Draw
        frame={frame}
        on={2}
        off={3}
        className="pl-f"
        d={LINKS}
        delay={500}
      />
      {SPREAD.map(([x, y], n) => (
        <Fade
          key={`${x}-${y}`}
          frame={frame}
          on={2}
          off={3}
          from="grow"
          delay={n * 120}
        >
          <Scroll x={x} y={y} s={0.9} />
        </Fade>
      ))}

      {/* 3. Thousands: rows of scrolls and bound books. */}
      {[0, 1, 2].map(row =>
        Array.from({ length: 9 }, (_, i) => {
          const x = 70 + i * 82;
          const y = 110 + row * 110;
          const scroll = (i + row) % 3 !== 1;
          return (
            <Fade
              key={`${row}-${i}`}
              frame={frame}
              on={3}
              off={4}
              from="up"
              delay={(row * 9 + i) * 40}
            >
              {scroll ? (
                <Scroll x={x} y={y} s={0.7} />
              ) : (
                <Codex
                  x={x}
                  y={y}
                  tone={(["b", "g", "c"] as const)[(i + row) % 3]}
                />
              )}
            </Fade>
          );
        })
      )}

      {/* 4. A cave in the cliff, a clay jar with its lid off, and a scroll. */}
      <Fade frame={frame} on={4} off={5}>
        <Shape d="M420,430V160C500,120 680,110 800,150V430Z" tone="b" off={3} />
        <path fill={h.h1} d="M680,120C740,124 780,136 800,150V430H700Z" />
        <path className="pl-k" d="M520,430V300C520,250 620,250 620,300V430Z" />
      </Fade>
      <Fade frame={frame} on={4} off={5} from="up" delay={500}>
        <Shape
          d="M300,430C270,430 262,400 266,360C270,330 284,318 290,312V300H330V312C336,318 350,330 354,360C358,400 350,430 320,430Z"
          tone="c"
          off={2}
        />
        <path className="pl-l" d="M286,312H334" />
        <Shape d="M372,424L380,410H412L420,424Z" tone="c" off={1.5} />
      </Fade>
      <Fade frame={frame} on={4} off={5} from="right" delay={900}>
        <Scroll x={180} y={404} s={0.8} />
      </Fade>

      {/* 5. A carved stone, lines cut across its face (no letters drawn). */}
      <Fade frame={frame} on={5} off={6} from="up">
        <Shape d="M300,430V200L320,180H480L500,200V430Z" tone="b" off={3} />
        <path fill={h.h2} d="M470,180L500,200V430H470Z" />
        <path
          className="pl-l"
          d="M330,230H470M330,262H460M330,294H470M330,326H440"
          strokeDasharray="10 6 22 6 14 6"
        />
      </Fade>

      {/* 6 and 7: the balance on a table. */}
      <Fade frame={frame} on={6}>
        <path className="pl-l" d="M200,412H600M220,412V430M580,412V430" />
      </Fade>
      <Fade frame={frame} on={6} off={7} from="up">
        <Balance x={400} />
      </Fade>
      <Fade frame={frame} on={7} from="left">
        <Balance x={540} />
      </Fade>
      <Fade frame={frame} on={7} from="up" delay={300}>
        <Book x={290} y={362} />
      </Fade>
    </>
  ),
};

export default film;
