/**
 * "Who God is: Father, Son and Holy Spirit", built from the site's Honest
 * Answer "How can God be three and one?" and the family catechism's
 * questions 4 and 76.
 *
 * The film shows only what the Bible shows. The Father is never drawn as a
 * figure: he is shown by what came from him, the world, under a light that
 * comes from beyond the picture's edge. The Son is the art kit's plain figure
 * with no face, as the pilot draws him. The Spirit is wind and fire, as the
 * Bible's own words picture him. The three are seen together at the Jordan
 * (the Holy Spirit film's own drawing of Mark 1:9-11). No analogy is offered
 * as true: the three usual pictures appear in one frame and each is crossed
 * out.
 *
 *   0  One God: an open scroll, one line of it gold.                     Deuteronomy 6:4
 *   1  The Father: the world under a light from beyond the edge.         1 Corinthians 8:6
 *   2  The Son: Jesus among his friends behind a shut door; Thomas.      John 1:1; John 20:26-28
 *   3  The Spirit: wind over hills, sea and town, to the gold flame.     Acts 5:3-4; Psalm 139:7
 *   4  The Jordan: the Son in the water, the dove, the torn sky.         Mark 1:9-11
 *   5  One name: roads out from a hilltop to every edge.                Matthew 28:19
 *   6  Pictures that break: water, a clover, three people, crossed out. Isaiah 40:18
 *   7  A wonder to receive: people under a night sky, light from above. 2 Corinthians 13:14
 */
import { Shape } from "../../art";
import type { Hatch } from "@/components/art/PlateSvg";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Flame, Standing } from "./figures";

/** Rays of light from beyond the top of the picture, down to a line. */
const rays = (cx: number, n: number, spread: number, foot: number) =>
  Array.from({ length: n }, (_, i) => {
    const top = cx - (n - 1) * 8 + i * 16;
    const at = cx - ((n - 1) * spread) / 2 + i * spread;
    return `M${top - 1},0L${top + 1},0L${at + 2},${foot}L${at - 2},${foot}Z`;
  }).join("");

/** The dove of Mark 1:10, as the Holy Spirit film draws it. */
const DOVE_BODY =
  "M0,-12C5,-12 7,-5 6,2L2,16L0,24L-2,16L-6,2C-7,-5 -5,-12 0,-12Z";
const DOVE_WINGS =
  "M-5,-3C-20,-16 -38,-15 -50,-6C-37,-3 -22,2 -5,7ZM5,-3C20,-16 38,-15 50,-6C37,-3 22,2 5,7Z";

/** A small star with four points. */
const star = (x: number, y: number, r: number) =>
  `M${x},${y - r}L${x + r / 4},${y - r / 4}L${x + r},${y}L${x + r / 4},${y + r / 4}L${x},${y + r}L${x - r / 4},${y + r / 4}L${x - r},${y}L${x - r / 4},${y - r / 4}Z`;
const STARS = [
  star(80, 70, 9),
  star(150, 160, 6),
  star(60, 260, 7),
  star(720, 60, 9),
  star(660, 170, 6),
  star(750, 280, 7),
].join("");

/** The three pictures that break (frame 6, and waiting on the poster). */
function Panels({ h }: { h: string }) {
  return (
    <>
      {[60, 300, 540].map(x => (
        <g key={x}>
          <path className="pl-o" d={`M${x},96H${x + 200}V340H${x}Z`} />
          <path className="pl-f" d={`M${x + 6},102H${x + 194}V334H${x + 6}Z`} />
        </g>
      ))}
      {/* Water as ice, water and steam. */}
      <Shape d="M84,250l28,-10l28,10v36l-28,10l-28,-10Z" tone="b" off={1.5} />
      <path className="pl-l" d="M84,250l28,10l28,-10M112,260v36" />
      <Shape d="M150,296h40l-4,-46h-32Z" tone="b" off={1.5} />
      <path fill={h} d="M150,296h40l-2,-26h-36Z" />
      <path
        className="pl-l"
        d="M212,296c-10,-14 10,-22 0,-36s10,-22 0,-36M230,290c-10,-14 10,-22 0,-36M196,226c-8,-12 8,-18 0,-30"
      />
      {/* A clover with three leaves. */}
      <path className="pl-l" d="M400,300C398,270 402,244 400,222" />
      <Shape
        d="M400,222C380,236 360,220 366,200C372,184 392,186 400,206Z"
        tone="g"
        off={1.5}
      />
      <Shape
        d="M400,222C420,236 440,220 434,200C428,184 408,186 400,206Z"
        tone="g"
        off={1.5}
      />
      <Shape
        d="M400,206C386,190 386,164 400,158C414,164 414,190 400,206Z"
        tone="g"
        off={1.5}
      />
      {/* Three people standing apart. */}
      <Standing x={580} y={214} tone="b" />
      <Standing x={640} y={214} tone="g" />
      <Standing x={700} y={214} tone="c" />
      <path className="pl-l" d="M560,276H720" />
    </>
  );
}

/** The Jordan: banks, the river, and the Son standing in it. */
function Jordan({ h }: { h: Hatch }) {
  return (
    <>
      <Shape
        d="M0,348V268C140,250 300,262 400,270C520,258 660,248 800,264V348Z"
        tone="g"
      />
      <Standing x={400} y={262} tone="c" s={1.2} />
      <Shape d="M0,430V330C200,322 600,322 800,330V430Z" tone="b" />
      <path fill={h.h2} d="M0,430V330C200,322 600,322 800,330V430Z" />
      <path
        className="pl-f"
        d="M60,360c20,-6 40,6 60,0M200,392c24,-6 48,6 72,0M520,392c24,-6 48,6 72,0M660,356c20,-6 40,6 60,0M330,350c14,-4 28,4 40,0M430,350c14,-4 28,4 40,0"
      />
      <Shape d="M0,500V424C200,410 600,410 800,424V500Z" tone="g" />
    </>
  );
}
const SKY_L = "M0,0H400L384,22L406,48L378,76L398,104L380,128H0Z";
const EDGE_L = "M400,0L384,22L406,48L378,76L398,104L380,128H0";
const SKY_R = "M800,0H400L384,22L406,48L378,76L398,104L380,128H800Z";
const EDGE_R = "M400,0L384,22L406,48L378,76L398,104L380,128H800";
function Dove() {
  return (
    <>
      <path className="pl-m" d={DOVE_WINGS} />
      <path className="pl-l" d={DOVE_WINGS} />
      <path className="pl-m" d={DOVE_BODY} />
      <path className="pl-l" d={DOVE_BODY} />
    </>
  );
}

const SCROLL =
  "M300,410V196C340,186 640,186 700,196V410C640,400 340,400 300,410Z";

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const k = frame + 1;
    return (
      <>
        <path fill={h.hs} d="M0,0H800V500H0Z" />

        {/* Poster: the Jordan, the Bible's own picture of the three together. */}
        <Fade frame={frame} on={-1} off={0}>
          <Jordan h={h} />
          <g transform="translate(-70,0)">
            <path fill={h.h3} d={SKY_L} />
            <path className="pl-l" d={EDGE_L} />
          </g>
          <g transform="translate(70,0)">
            <path fill={h.h3} d={SKY_R} />
            <path className="pl-l" d={EDGE_R} />
          </g>
          <g transform="translate(400,160)">
            <Dove />
          </g>
          <path
            className="pl-f"
            d="M352,132L322,188M448,132L478,188M400,134V150"
          />
        </Fade>

        {/* 0. One God: an open scroll by a doorway, one line of it gold. */}
        <Fade frame={frame} on={0} off={1}>
          <Shape d="M40,500V120H200V500Z" tone="c" />
          <path fill={h.h1} d="M150,120H200V500H150Z" />
          <path className="pl-o" d="M70,500V210a50,50 0 0 1 100,0V500Z" />
          <path fill={h.h1} d="M70,500V210a50,50 0 0 1 100,0V500Z" />
          <Shape d="M240,420H780V440H240Z" tone="c" />
          <path className="pl-l" d="M270,440V500M750,440V500" />
          <path className="pl-o" d={SCROLL} />
          <path className="pl-l" d={SCROLL} />
          <Shape d="M282,420V186a18,10 0 0 1 36,0V420Z" tone="c" off={1.5} />
          <Shape d="M682,420V186a18,10 0 0 1 36,0V420Z" tone="c" off={1.5} />
          <path
            className="pl-f"
            d="M340,270H660M340,294H640M340,318H660M340,342H620M340,366H650"
          />
        </Fade>
        <Draw
          frame={frame}
          on={0}
          off={1}
          delay={900}
          className="fp-gold"
          d="M340,240H660"
        />

        {/* 1. The Father: the world, under light from beyond the edge. */}
        <Fade frame={frame} on={1} off={2}>
          <path
            className="pl-paper"
            d="M240,0H560C620,90 780,150 780,240V500H20V240C20,150 180,90 240,0Z"
          />
          <Shape
            d="M0,500V360L120,300L220,350L340,276L460,346L560,300L680,354L800,316V500Z"
            tone="g"
          />
          <path
            fill={h.h2}
            d="M340,276L460,346L560,300L680,354L800,316V500H340Z"
          />
          <Shape
            d="M0,500V420C200,410 300,430 420,420S700,410 800,424V500Z"
            tone="b"
          />
          <path
            className="pl-f"
            d="M60,450c20,-6 40,6 60,0M300,462c20,-6 40,6 60,0M600,450c20,-6 40,6 60,0"
          />
          <path
            className="pl-l"
            d="M150,200c8,-6 14,-6 20,0c6,-6 12,-6 20,0M610,170c6,-5 12,-5 16,0c4,-5 10,-5 16,0"
          />
        </Fade>
        <Fade frame={frame} on={1} off={2} delay={500}>
          <path className="pl-m" d={rays(400, 7, 92, 250)} />
        </Fade>

        {/* 2. The Son: behind a shut door, Jesus among his friends; Thomas faces him. */}
        <Fade frame={frame} on={2} off={3}>
          <Shape d="M60,440V110H740V440Z" tone="b" />
          <path fill={h.h1} d="M60,110H740V440H60Z" />
          <Shape d="M96,440V230a40,40 0 0 1 80,0V440Z" tone="c" />
          <path className="pl-l" d="M106,250V430M166,250V430" />
          <path className="pl-k" d="M88,318h96v10h-96Z" />
          <path className="pl-l" d="M20,440H780" />
          <Standing x={250} y={350} tone="g" s={1.2} />
          <Standing x={316} y={344} tone="b" s={1.3} />
          <Standing x={624} y={350} tone="c" s={1.2} />
          <Standing x={690} y={356} tone="g" s={1.1} />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="up" delay={400}>
          <Standing x={420} y={326} tone="c" s={1.75} />
        </Fade>
        <Fade frame={frame} on={2} off={3} from="right" delay={1100}>
          <Standing x={530} y={336} tone="g" s={1.6} />
        </Fade>

        {/* 3. The Spirit: wind over hills, sea and a town, to the flame. */}
        <Fade frame={frame} on={3} off={4}>
          <Shape d="M0,500V330L140,280L260,330L380,300V500Z" tone="g" />
          <Shape d="M380,500V352C460,346 560,350 640,352V500Z" tone="b" />
          <path
            className="pl-f"
            d="M420,400c20,-6 40,6 60,0M520,440c20,-6 40,6 60,0"
          />
          <Shape d="M640,500V330L720,300L800,326V500Z" tone="g" />
          <Shape d="M660,330V296h30v34Z" tone="c" off={1.5} />
          <Shape d="M700,320V280l16,-12l16,12v40Z" tone="c" off={1.5} />
          <Shape d="M742,326V300h28v26Z" tone="c" off={1.5} />
        </Fade>
        <Draw
          frame={frame}
          on={3}
          off={4}
          delay={300}
          d="M10,210C120,160 220,250 330,200S520,150 610,196S716,226 744,206"
        />
        <Draw
          frame={frame}
          on={3}
          off={4}
          delay={700}
          className="pl-f"
          d="M30,236C140,190 230,270 340,224S528,176 620,220"
        />
        <Fade frame={frame} on={3} off={4} delay={1600} from="grow">
          <Flame x={762} y={190} s={1.2} gold />
        </Fade>

        {/* 4. The Jordan (the Holy Spirit film's drawing of Mark 1:9-11). */}
        <Fade frame={frame} on={4} off={5}>
          <Jordan h={h} />
          <Travel
            frame={k}
            at={[
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-70, 0],
            ]}
          >
            <path fill={h.h3} d={SKY_L} />
            <path className="pl-l" d={EDGE_L} />
          </Travel>
          <Travel
            frame={k}
            at={[
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [70, 0],
            ]}
          >
            <path fill={h.h3} d={SKY_R} />
            <path className="pl-l" d={EDGE_R} />
          </Travel>
          <Travel
            frame={k}
            at={[
              [400, 40],
              [400, 40],
              [400, 40],
              [400, 40],
              [400, 40],
              [400, 200],
            ]}
          >
            <Dove />
          </Travel>
        </Fade>
        <Draw
          frame={frame}
          on={4}
          off={5}
          delay={1300}
          className="pl-f"
          d="M352,132L322,188M448,132L478,188M400,134V150"
        />

        {/* 5. One name: from a hilltop, roads out to every edge. */}
        <Fade frame={frame} on={5} off={6}>
          <Shape
            d="M0,500V380C120,360 240,330 330,280C380,256 420,256 470,280C560,330 680,360 800,380V500Z"
            tone="g"
          />
          <path
            fill={h.h2}
            d="M400,262C440,262 460,270 470,280C560,330 680,360 800,380V500H400Z"
          />
          {[318, 368, 418, 468].map((x, n) => (
            <Standing
              key={x}
              x={x}
              y={208 + (n % 2) * 6}
              tone={(["b", "c", "g", "c"] as const)[n]}
              s={0.85}
            />
          ))}
        </Fade>
        {[
          "M330,286C260,330 140,360 0,372",
          "M360,290C300,360 200,420 120,500",
          "M440,290C500,360 600,420 680,500",
          "M470,286C540,330 660,360 800,372",
          "M400,292C400,360 398,430 400,500",
        ].map((d, n) => (
          <Draw
            key={d}
            frame={frame}
            on={5}
            off={6}
            delay={600 + n * 220}
            d={d}
          />
        ))}
        <Fade frame={frame} on={5} off={6} delay={1500}>
          <Shape d="M24,370V346l14,-10l14,10v24Z" tone="c" off={1.5} />
          <Shape d="M748,370V346l14,-10l14,10v24Z" tone="c" off={1.5} />
          <Shape d="M140,470V440l14,-10l14,10v30Z" tone="c" off={1.5} />
          <Shape d="M636,470V440l14,-10l14,10v30Z" tone="c" off={1.5} />
        </Fade>

        {/* 6. Pictures that break: each crossed out with one line. */}
        <Fade frame={frame} on={6} off={7}>
          <g transform="translate(0,40)">
            <Panels h={h.h2} />
          </g>
        </Fade>
        {[60, 300, 540].map((x, n) => (
          <Draw
            key={x}
            frame={frame}
            on={6}
            off={7}
            delay={800 + n * 900}
            className="fp-strike"
            d={`M${x + 14},${364}L${x + 186},${152}`}
          />
        ))}

        {/* 7. A wonder to receive: people together under the night sky, light from above. */}
        <Fade frame={frame} on={7}>
          <path fill={h.h1} d="M0,0H800V380H0Z" />
          <path
            className="pl-paper"
            d="M260,0H540C580,120 700,220 680,380H120C100,220 220,120 260,0Z"
          />
          <path className="pl-paper" d={STARS} />
          <path className="pl-l" d={STARS} />
          <Shape d="M0,500V380C200,360 600,360 800,380V500Z" tone="g" />
          <path fill={h.h2} d="M560,368C680,372 760,376 800,380V500H560Z" />
        </Fade>
        <Fade frame={frame} on={7} delay={600}>
          <path className="pl-m" d={rays(400, 7, 70, 230)} />
        </Fade>
        {[180, 240, 300, 360, 420, 480, 540, 600].map((x, n) => (
          <Fade key={x} frame={frame} on={7} from="up" delay={300 + n * 120}>
            <Standing
              x={x}
              y={300 + (n % 3) * 8}
              tone={(["b", "g", "c"] as const)[n % 3]}
              s={n % 2 ? 0.9 : 1}
            />
          </Fade>
        ))}
      </>
    );
  },
};

export default film;
