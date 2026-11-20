/**
 * "God with his people": the map's thread of the same name, moving.
 *
 * Along the top runs the thread itself, as the map draws it: the map's own
 * roundels for the nine places it passes (creation, the fall, Sinai, the
 * kingdom, the exile, Jesus, the cross, the church, the new creation), joined
 * by a line that is solid where God lives among his people and dotted where
 * the closeness is lost. It inks itself one place a frame, and an ink ring
 * marks where the story is. Below, each place is drawn in the stops' own
 * vocabulary (the garden's trees, the gate with the sword, the tent in the
 * camp, the temple on its hill, the city with its open gate).
 *
 * The one mustard mark is one light, which moves from place to place. It is
 * never a figure, a hand or a face: a small round light with a soft ring.
 *
 *   0  The garden: the light among the trees, with the man and the woman.  Genesis 2:8; 3:8
 *   1  The way shut: the gate and the sword; the light beyond it.          Genesis 3:8, 24
 *   2  A tent in the middle: the light comes to rest in the tent.          Exodus 25:8; 40:34
 *   3  The temple filled: the light within, the cloud at the door.         1 Kings 8:10-11
 *   4  The glory leaves: the temple goes to a broken line; the light east. Ezekiel 10:18; 11:23
 *   5  The Word made his dwelling: the light with Jesus, a tent round him. John 1:14
 *   6  The curtain torn: from top to bottom; the light comes out.          Mark 15:38
 *   7  God's temple, his people: people as pillars, each with a flame.     1 Corinthians 3:16
 *   8  With them for ever: the light in the city's open gate.              Revelation 21:3, 22
 */
import { Roundel, Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Flame, Standing, ring } from "./figures";

/** The thread along the top: the map's roundels, and whether each place is near or apart. */
const PLACES: [string, "near" | "apart"][] = [
  ["creation", "near"],
  ["fall", "apart"],
  ["sinai", "near"],
  ["kingdom", "near"],
  ["exile", "apart"],
  ["jesus", "near"],
  ["cross", "near"],
  ["church", "near"],
  ["new-creation", "near"],
];
const TX = (i: number) => 52 + i * 87;
const TY = 46;
const TR = 23;

/** Where the light stands (poster first, then each frame), and how large. */
const LIGHT: [number, number, number][] = [
  [470, 366, 1],
  [470, 366, 1],
  [530, 346, 0.85],
  [400, 386, 0.8],
  [400, 368, 0.9],
  [700, 230, 0.9],
  [430, 356, 1.3],
  [400, 330, 1.1],
  [400, 160, 0.9],
  [400, 344, 1.4],
];

/** The marker ring on the thread: where the story is (the poster marks the first place). */
const MARK: [number, number][] = [
  [TX(0), TY],
  ...PLACES.map((_, i): [number, number] => [TX(i), TY]),
];

/** The curtain's halves: still until frame 6, then drawn apart. */
const apart = (dx: number): [number, number][] =>
  Array.from({ length: 8 }, (_, i): [number, number] =>
    i === 7 ? [dx, 0] : [0, 0]
  );

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <>
      <Shape
        d={`M${x - 4 * s},${y}V${y - 34 * s}h${8 * s}V${y}Z`}
        tone="c"
        off={1.5}
      />
      <Shape
        d={`M${x - 28 * s},${y - 50 * s}a${28 * s},${23 * s} 0 1,0 ${56 * s},0a${28 * s},${23 * s} 0 1,0 ${-56 * s},0Z`}
        tone="g"
        off={2}
      />
    </>
  );
}

/** The light: a small round light with a soft ring. Never a figure. */
function Light() {
  return (
    <>
      <path className="pl-paper" d={ring(0, 0, 23)} />
      <path className="pl-f" strokeDasharray="2 5" d={ring(0, 0, 34)} />
      <path className="pl-f" d={ring(0, 0, 23)} />
      <path className="pl-m" d={ring(0, 0, 13)} />
      <path className="pl-l" d={ring(0, 0, 13)} />
    </>
  );
}

/** The temple on its hill (frames 3 and 4): solid, or a broken line once the glory leaves. */
const TEMPLE = "M290,400V250H510V400ZM270,250L400,186L530,250Z";
function Temple({ broken = false }: { broken?: boolean }) {
  return broken ? (
    <path className="pl-l" strokeDasharray="6 8" d={TEMPLE} />
  ) : (
    <>
      <Shape d="M270,250L400,186L530,250Z" tone="c" />
      <Shape d="M290,400V250H510V400Z" tone="c" />
      <path className="pl-l" d="M320,264V400M480,264V400" />
      <path className="pl-o" d="M360,400V318a40,40 0 0 1 80,0V400Z" />
      <path className="pl-l" d="M360,400V318a40,40 0 0 1 80,0V400Z" />
    </>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const k = frame + 1;
    return (
      <>
        <path fill={h.hs} d="M0,0H800V500H0Z" />

        {/* ── The places, below the thread ─────────────────────────────── */}

        {/* Poster and 0: the garden, the light among the trees. */}
        <Fade frame={frame} on={-1} off={1}>
          <Shape d="M0,500V404C200,394 600,394 800,404V500Z" tone="g" />
          <path fill={h.h2} d="M520,398C640,398 740,400 800,404V500H520Z" />
          <Tree x={110} y={404} s={1.2} />
          <Tree x={220} y={398} />
          <Tree x={600} y={400} s={1.1} />
          <Tree x={700} y={404} s={1.3} />
          <Tree x={540} y={398} s={0.8} />
          <path
            className="pl-f"
            d="M60,450c20,-6 40,6 60,0M300,470c20,-6 40,6 60,0M600,460c20,-6 40,6 60,0"
          />
        </Fade>
        <Fade frame={frame} on={0} off={1} delay={400}>
          <Standing x={330} y={338} tone="c" />
          <Standing x={378} y={340} tone="b" />
        </Fade>

        {/* 1: the way shut, the gate and the sword; the people outside, going east. */}
        <Fade frame={frame} on={1} off={2}>
          <Shape d="M0,500V404C200,394 600,394 800,404V500Z" tone="g" />
          <Tree x={660} y={300} s={0.9} />
          <Tree x={750} y={300} s={1.1} />
          <Shape
            d="M440,404V300H470V230a60,60 0 0 1 120,0V300H800V404H584V250a54,54 0 0 0 -108,0V404Z"
            tone="c"
          />
          <path fill={h.h2} d="M584,300H800V404H584Z" />
          <path className="pl-k" d="M480,404L598,252l7,6L488,410Z" />
          <path
            className="pl-c"
            d="M598,252c4,-14 14,-18 14,-30c8,10 6,22 -2,36Z"
          />
          <path
            className="pl-l"
            d="M598,252c4,-14 14,-18 14,-30c8,10 6,22 -2,36Z"
          />
          <path className="pl-f" d="M40,440C150,428 300,418 440,412" />
          <Standing x={160} y={350} tone="c" s={0.8} />
          <Standing x={196} y={352} tone="b" s={0.8} />
        </Fade>

        {/* 2: the tent in the middle of the camp, the cloud over it. */}
        <Fade frame={frame} on={2} off={3}>
          <Shape d="M0,500V410C200,402 600,402 800,410V500Z" tone="g" />
          {[60, 140, 220, 580, 660, 740].map((x, n) => (
            <Shape
              key={x}
              d={`M${x - 30},${410 - (n % 2) * 8}L${x},${360 - (n % 2) * 8}L${x + 30},${410 - (n % 2) * 8}Z`}
              tone={n % 2 ? "b" : "c"}
              off={1.5}
            />
          ))}
          <Shape d="M300,410V320L400,290L500,320V410Z" tone="c" />
          <path fill={h.h2} d="M400,290L500,320V410H400Z" />
          <path className="pl-o" d="M372,410V362h56v48Z" />
          <path className="pl-l" d="M372,410V362h56v48Z" />
          <Shape
            d="M350,280C330,276 326,250 346,242C338,216 366,200 384,214C392,190 432,192 434,218C456,206 478,228 466,248C482,262 470,282 452,280C440,292 364,292 350,280Z"
            tone="b"
            off={2}
          />
          <path
            className="pl-f"
            d="M380,190c4,-20 34,-20 40,0M392,170c4,-14 20,-14 24,0"
          />
        </Fade>

        {/* 3 and 4: the temple on its hill, filled; then left, drawn broken. */}
        <Fade frame={frame} on={3} off={5}>
          <Shape
            d="M0,500V430C160,420 220,404 260,400H540C580,404 640,420 800,430V500Z"
            tone="g"
          />
          <path fill={h.h2} d="M540,400C580,404 640,420 800,430V500H540Z" />
        </Fade>
        <Fade frame={frame} on={3} off={4}>
          <Temple />
          <Shape
            d="M330,250C312,248 310,226 326,220C320,198 350,188 364,202C374,180 412,184 414,206C432,196 452,214 444,232C460,236 458,252 444,252Z"
            tone="b"
            off={1.5}
          />
        </Fade>
        <Fade frame={frame} on={4} off={5}>
          <Temple broken />
          <Shape d="M548,432C600,340 690,290 800,280V432Z" tone="g" off={3} />
          <path fill={h.h1} d="M680,300C730,286 770,282 800,280V432H680Z" />
        </Fade>

        {/* 5: by the lake; a tent drawn round Jesus. */}
        <Fade frame={frame} on={5} off={6}>
          <Shape d="M0,500V420C200,410 600,410 800,420V500Z" tone="b" />
          <path fill={h.h2} d="M0,450C200,442 600,442 800,450V500H0Z" />
          <Shape d="M0,420V396C200,388 600,388 800,396V420Z" tone="g" />
          <path
            className="pl-l"
            strokeDasharray="5 6"
            d="M350,400V270L430,214L510,270V400"
          />
        </Fade>

        {/* 6: the curtain before the most holy place, torn from top to bottom. */}
        <Fade frame={frame} on={6} off={7}>
          <Shape d="M150,440V130H650V440Z" tone="c" />
          <path fill={h.h1} d="M150,130H650V440H150Z" />
          <path className="pl-l" d="M120,440H680M120,124H680" />
          <path className="pl-o" d="M220,440V130h360v310Z" />
        </Fade>
        <Fade frame={frame} on={6} off={7}>
          <Travel frame={k} at={apart(-104)}>
            <Shape d="M220,130H400V440H220Z" tone="b" />
            <path
              className="pl-f"
              d="M250,140V430M290,140V430M330,140V430M370,140V430"
            />
          </Travel>
          <Travel frame={k} at={apart(104)}>
            <Shape d="M400,130H580V440H400Z" tone="b" />
            <path
              className="pl-f"
              d="M430,140V430M470,140V430M510,140V430M550,140V430"
            />
          </Travel>
        </Fade>

        {/* 7: God's temple: his people stand as its pillars, each with a flame. */}
        <Fade frame={frame} on={7} off={8}>
          <path className="pl-l" d="M130,436H670M150,422H650" />
          <path className="pl-l" d="M150,206L400,128L650,206ZM150,222H650" />
        </Fade>
        {[212, 274, 336, 400, 464, 526, 588].map((x, n) => (
          <Fade
            key={x}
            frame={frame}
            on={7}
            off={8}
            from="up"
            delay={200 + n * 110}
          >
            <Standing
              x={x}
              y={312}
              tone={(["g", "c", "b"] as const)[n % 3]}
              s={1.7}
            />
            <Flame x={x} y={386} s={0.6} />
          </Fade>
        ))}

        {/* 8: the city, its gate open, the river and trees, people walking in. */}
        <Fade frame={frame} on={8} from="up">
          <Shape d="M0,500V400H800V500Z" tone="g" />
          <Shape
            d="M100,400V230H300V200H500V230H700V400H450V300a50,50 0 0 0 -100,0V400Z"
            tone="b"
          />
          <path fill={h.h2} d="M500,200V230H700V400H500Z" />
          <path className="pl-l" d="M100,270H350M450,270H700" />
          <Shape d="M362,400H438L520,500H280Z" tone="b" off={2} />
          <Tree x={236} y={474} s={0.9} />
          <Tree x={564} y={474} s={0.9} />
          <Standing x={120} y={414} tone="c" s={0.8} />
          <Standing x={660} y={420} tone="g" s={0.75} />
          <Standing x={720} y={430} tone="b" s={0.8} />
          <path
            className="pl-f"
            d="M400,250V214M350,262l-22,-22M450,262l22,-22"
          />
        </Fade>

        {/* ── The light: the one mustard mark, moving from place to place ── */}
        <Travel frame={k} at={LIGHT}>
          <Light />
        </Travel>

        {/* 5: Jesus and the people, in front of the light that is with him. */}
        <Fade frame={frame} on={5} off={6}>
          <Standing x={430} y={316} tone="c" s={1.3} />
          <Standing x={290} y={334} tone="b" s={0.95} />
          <Standing x={236} y={342} tone="g" s={0.85} />
          <Standing x={570} y={336} tone="g" s={0.95} />
          <Standing x={624} y={342} tone="c" s={0.85} />
        </Fade>
        {/* 6: the tear, drawn from top to bottom. */}
        <Draw
          frame={frame}
          on={6}
          off={7}
          delay={100}
          className="fp-tear"
          d="M400,130L392,200L408,270L394,340L402,440"
        />

        {/* ── The thread, along the top ─────────────────────────────────── */}
        <path className="pl-paper" d="M0,0H800V92H0Z" />
        <path className="pl-l" d="M0,92H800" />
        <path
          className="pl-f"
          strokeDasharray="2 5"
          d={`M${TX(0)},${TY}H${TX(8)}`}
        />
        {PLACES.slice(1).map(([, state], i) => {
          const d = `M${TX(i) + TR},${TY}H${TX(i + 1) - TR}`;
          return state === "apart" || PLACES[i][1] === "apart" ? (
            <Fade key={d} frame={frame} on={i + 1}>
              <path className="fp-thread" strokeDasharray="3 6" d={d} />
            </Fade>
          ) : (
            <Draw
              key={d}
              frame={frame}
              on={i + 1}
              className="fp-thread"
              d={d}
            />
          );
        })}
        {PLACES.map(([slug], i) => (
          <g key={slug}>
            <path className="pl-paper" d={ring(TX(i), TY, TR)} />
            <path
              className="pl-f"
              strokeDasharray="2 4"
              d={ring(TX(i), TY, TR)}
            />
            <Fade frame={frame} on={i === 0 ? -1 : i} from="grow">
              <Roundel
                slug={slug}
                at={{ x: TX(i) - TR - 1, y: TY - TR - 1, size: 2 * TR + 2 }}
              />
            </Fade>
          </g>
        ))}
        <Travel frame={k} at={MARK}>
          <path className="pl-l" d={ring(0, 0, TR + 6)} />
        </Travel>
      </>
    );
  },
};

export default film;
