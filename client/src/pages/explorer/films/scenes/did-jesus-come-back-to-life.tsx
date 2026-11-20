/**
 * "Did Jesus really come back to life?": the Honest Answer "Did the
 * resurrection actually happen?" told for young readers, in the third
 * person, claiming what it claims and no more.
 *
 * One garden at dawn: a far hill with an empty cross (no body, nothing
 * graphic, as the Cross stop draws it), and a tomb cut in rock, its stone
 * across the door. The people who came to believe gather between them; the
 * city wall stands behind the hill; the stone rolls aside and light comes from
 * inside (the one mustard mark). Then the two marks Does God exist? uses for
 * weighing a case: a balance, and an open book.
 *
 *   0  A fair question         the garden: the hill and its cross, the tomb shut
 *   1  He really died          the same, the cross alone on the hill made plain
 *   2  Seen alive              a group of people between the hill and the tomb
 *   3  Two who did not believe two more, come from the far side
 *   4  In the same city        the city wall behind the hill; the stone rolls; light
 *   5  Other explanations      the people gone; a balance, level, in the sky
 *   6  Weigh it for yourself   the balance, and an open book beside it
 */
import { Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Standing } from "./figures";

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* Dawn: a few strokes of light low in the sky over the tomb. */}
      <path className="pl-f" d="M650,150H780M670,170H790M700,190H770" />

      {/* 4. The city wall of Jerusalem, far behind the hill. */}
      <Fade frame={frame} on={4} from="up">
        <Shape
          d="M10,330V292h20v-14h22v14h40v-10h22v10h44v-14h22v14h30V330Z"
          tone="c"
          off={2}
        />
        <path fill={h.h1} d="M10,318H210V330H10Z" />
      </Fade>

      {/* The far hill and its empty cross. */}
      <Shape
        d="M40,420C90,320 150,262 210,262C270,262 330,320 380,420Z"
        tone="g"
        off={4}
      />
      <path fill={h.h2} d="M210,262C270,262 330,320 380,420H240Z" />
      <path className="pl-k" d="M206,266V178h9v88ZM186,204H235v8H186Z" />
      {/* 1. The cross made plain: a thin ring of ink round the hilltop. */}
      <Draw
        frame={frame}
        on={1}
        off={2}
        className="pl-f"
        d="M146,240C150,180 270,160 280,230C286,280 160,300 146,240Z"
      />

      {/* The tomb cut in the rock. */}
      <Shape d="M500,420V300C540,240 720,226 790,250V420Z" tone="b" off={3} />
      <path fill={h.h1} d="M720,236C760,240 780,244 790,250V420H730Z" />
      {/* The doorway's dark, hatched so it stays dark by night too. */}
      <path className="pl-paper" d="M598,420V368a32,32 0 0 1 64,0V420Z" />
      <path fill={h.hh} d="M598,420V368a32,32 0 0 1 64,0V420Z" />
      <path fill={h.hh} d="M598,420V368a32,32 0 0 1 64,0V420Z" />
      <path className="pl-l" d="M598,420V368a32,32 0 0 1 64,0V420Z" />
      {/* 4. Light from inside the open tomb. */}
      <Fade frame={frame} on={4} delay={900}>
        <path className="pl-m" d="M604,420V370a26,26 0 0 1 52,0V420Z" />
      </Fade>
      <Draw
        frame={frame}
        on={4}
        delay={1400}
        className="pl-f"
        d="M630,320V296M600,330l-12,-12M660,330l12,-12"
      />
      {/* The stone: across the door, then rolled aside. */}
      <Travel
        frame={frame}
        at={[
          [630, 420],
          [630, 420],
          [630, 420],
          [630, 420],
          [728, 420],
        ]}
      >
        <Shape d="M-46,0a46,46 0 1,1 92,0Z" tone="g" off={2} />
        <path className="pl-f" d="M-24,-30a30,30 0 0 1 30,-8" />
      </Travel>

      {/* The ground. */}
      <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
      <path fill={h.h3} d="M0,440H800V500H0Z" />

      {/* 2. People who were sure they had seen him alive. */}
      <Fade frame={frame} on={2} off={5} from="up">
        <Standing x={400} y={352} tone="b" />
        <Standing x={436} y={356} tone="c" />
        <Standing x={470} y={350} tone="g" />
        <Standing x={420} y={366} tone="g" s={0.85} />
        <Standing x={454} y={370} tone="b" s={0.85} />
      </Fade>
      {/* 3. Two more, who had every reason not to believe, come from the far side. */}
      <Fade frame={frame} on={3} off={5} from="left">
        <Standing x={318} y={352} tone="c" />
        <Standing x={352} y={356} tone="c" />
      </Fade>

      {/* 5. A balance, level: the reasons weighed, nothing forced. */}
      <Fade frame={frame} on={5} from="up">
        <path className="pl-l" d="M372,218H428M400,218V112M318,124H482" />
        <path className="pl-l" d="M330,124L312,176M330,124L348,176" />
        <path className="pl-l" d="M470,124L452,176M470,124L488,176" />
        <Shape d="M304,176H356C352,192 308,192 304,176Z" tone="b" off={1.5} />
        <Shape d="M444,176H496C492,192 448,192 444,176Z" tone="b" off={1.5} />
        <Shape d="M392,112a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" tone="c" off={1} />
      </Fade>
      {/* 6. An open book: where the whole case, and the case against, is set out. */}
      <Fade frame={frame} on={6} from="up" delay={200}>
        <g transform="translate(-60,-300)">
          <Shape
            d="M570,476V426C590,418 612,420 630,430C648,420 670,418 690,426V476C670,468 648,470 630,480C612,470 590,468 570,476Z"
            tone="c"
          />
          <path className="pl-l" d="M630,430V480" />
          <path
            className="pl-f"
            d="M582,438C596,434 608,436 618,440M582,450C596,446 608,448 618,452M582,462C596,458 608,460 618,464M642,440C652,436 664,434 678,438M642,452C652,448 664,446 678,450M642,464C652,460 664,458 678,462"
          />
        </g>
      </Fade>
    </>
  ),
};

export default film;
