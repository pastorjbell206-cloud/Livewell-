/**
 * The Bible Explorer's small drawings, in the site's one engraved hand
 * (components/art/README.md): ink outline, one tone block printed off
 * register, hatching for shade. Every colour is a token (.pl-* classes in
 * index.css), so each drawing turns to night with html.dark.
 *
 * - Emblem: the picture inside each stop's roundel on the map. Each one
 *   teaches the stop by itself: a tree for creation, a tent under stars for
 *   Abraham, walls of water for the rescue.
 * - Roundel: the ring an emblem sits in, on the map and at the top of a stop.
 * - HeadArt: the road from a garden to a city, for the top of the map.
 * - The "Why we believe" cards' pictures (CardArt): the manger, the tomb,
 *   the table, the Jordan, the garden, the hiding, the cross on the hill,
 *   the hillside in the wind, the seed and the harvest.
 *
 * Mustard is kept for the map's one mark (where you are), so no stop's emblem
 * uses it; a film's own emblem may carry one gold mark, as its drawing does.
 */
import { useId, type ReactNode } from "react";
import { PlateSvg, type Drawing } from "@/components/art/PlateSvg";

type Tone = "b" | "g" | "c";

/** A shape in the hand: paper, its tone off register, an optional hatch, the ink line. */
export function Shape({
  d,
  tone,
  hatch,
  off = 2.5,
}: {
  d: string;
  tone?: Tone;
  hatch?: string;
  off?: number;
}) {
  return (
    <>
      <path className="pl-o" d={d} />
      {tone && (
        <path
          className={`pl-${tone}`}
          d={d}
          transform={`translate(${off},${off * 0.75})`}
        />
      )}
      {hatch && <path fill={hatch} d={d} />}
      <path className="pl-l" d={d} />
    </>
  );
}

/** The fine hatch for a 100-unit emblem (the plates' hatches are drawn for 400). */
function EmblemHatch({ id }: { id: string }) {
  return (
    <pattern
      id={id}
      width="4"
      height="4"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <line
        className="pl-hatch"
        x1="0"
        y1="0"
        x2="0"
        y2="4"
        strokeWidth="0.9"
      />
    </pattern>
  );
}

const EMBLEMS: Record<string, (h: string) => ReactNode> = {
  creation: h => (
    <>
      <path className="pl-l" d="M14,72H86" />
      <path
        className="pl-f"
        d="M22,30l-6,-4M30,22l-3,-7M42,18v-7M54,19l3,-7M64,25l6,-5"
      />
      <Shape d="M47,72V52h6v20Z" tone="c" />
      <Shape d="M28,44a22,18 0 1,0 44,0a22,18 0 1,0 -44,0Z" tone="g" />
      <path fill={h} d="M50,26a22,18 0 0 1 22,18a22,18 0 0 1 -22,18Z" />
      <path className="pl-f" d="M20,80c8,-3 16,3 24,0s16,3 24,0s10,2 14,0" />
    </>
  ),
  fall: h => (
    <>
      <path className="pl-l" d="M12,80H88" />
      <Shape
        d="M26,80V46a24,24 0 0 1 48,0V80H64V48a14,14 0 0 0 -28,0V80Z"
        tone="c"
      />
      <path fill={h} d="M64,48a14,14 0 0 0 -28,0V80H64Z" />
      <path className="pl-k" d="M33,74L69,30l3,3L36,77Z" />
      <path className="pl-l" d="M60,36l8,6" />
    </>
  ),
  abraham: h => (
    <>
      <path fill={h} d="M0,0H100V64H0Z" />
      <path
        className="pl-paper"
        d="M28,20l2,5l5,1l-5,2l-2,5l-2,-5l-5,-2l5,-1ZM64,12l1.5,4l4,1l-4,1.5l-1.5,4l-1.5,-4l-4,-1.5l4,-1ZM78,34l1.5,3l3,1l-3,1l-1.5,3l-1.5,-3l-3,-1l3,-1Z"
      />
      <path
        className="pl-l"
        d="M28,20l2,5l5,1l-5,2l-2,5l-2,-5l-5,-2l5,-1ZM64,12l1.5,4l4,1l-4,1.5l-1.5,4l-1.5,-4l-4,-1.5l4,-1ZM78,34l1.5,3l3,1l-3,1l-1.5,3l-1.5,-3l-3,-1l3,-1Z"
      />
      <path className="pl-o" d="M0,64H100V100H0Z" />
      <Shape d="M18,80L46,40L74,80Z" tone="c" />
      <path className="pl-k" d="M40,80L46,58L52,80Z" />
      <path className="pl-f" d="M18,80L8,86M74,80L86,86" />
    </>
  ),
  rescue: h => (
    <>
      <path className="pl-o" d="M38,88L44,30H56L62,88Z" />
      <path fill={h} d="M38,88L44,30H56L62,88Z" />
      <Shape d="M8,88V36C16,30 26,34 34,28L40,88Z" tone="b" />
      <Shape d="M92,88V36C84,30 74,34 66,28L60,88Z" tone="b" />
      <path
        className="pl-f"
        d="M12,46c6,-3 12,2 18,-1M12,58c6,-3 12,2 20,-1M12,70c6,-3 12,2 22,-1M88,46c-6,-3 -12,2 -18,-1M88,58c-6,-3 -12,2 -20,-1M88,70c-6,-3 -12,2 -22,-1"
      />
      <path
        className="pl-k"
        d="M48,66a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0ZM47,70h7l1,10h-9Z"
      />
    </>
  ),
  sinai: h => (
    <>
      <Shape d="M6,78L42,22L58,40L66,32L94,78Z" tone="g" />
      <path fill={h} d="M42,22L58,40L50,78H94L66,32L58,40Z" />
      <path className="pl-f" d="M36,20c4,-6 10,-6 14,-2" />
      <Shape d="M30,86V62a7,7 0 0 1 14,0V86Z" tone="c" off={2} />
      <Shape d="M48,86V62a7,7 0 0 1 14,0V86Z" tone="c" off={2} />
      <path
        className="pl-f"
        d="M33,68h8M33,73h8M33,78h8M51,68h8M51,73h8M51,78h8"
      />
    </>
  ),
  land: h => (
    <>
      <path className="pl-l" d="M14,88H86" />
      <path
        className="pl-l"
        d="M50,88V40M50,88L36,44M50,88L64,44M50,88L28,52M50,88L72,52"
      />
      <Shape d="M46,40a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M32,44a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M60,44a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M24,52a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M68,52a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M40,66h20v7H40Z" tone="c" off={1.5} />
      <path fill={h} d="M40,66h20v7H40Z" />
    </>
  ),
  kingdom: h => (
    <>
      <Shape d="M20,70L16,32L34,48L50,24L66,48L84,32L80,70Z" tone="c" />
      <path fill={h} d="M50,24L66,48L84,32L80,70H50Z" />
      <Shape d="M18,70H82V80H18Z" tone="c" />
      <path className="pl-k" d="M46,58a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
      <path className="pl-f" d="M28,75h4M40,75h4M56,75h4M68,75h4" />
    </>
  ),
  exile: h => (
    <>
      <path className="pl-l" d="M8,22C30,18 60,20 92,26" />
      <path
        className="pl-f"
        d="M20,20l-4,10M32,19l-2,12M70,22l2,12M84,24l4,10"
      />
      <path className="pl-l" d="M50,21V30" />
      <Shape
        d="M36,30H64L60,40C66,52 64,70 52,82H48C36,70 34,52 40,40Z"
        tone="b"
      />
      <path fill={h} d="M50,30H64L60,40C66,52 64,70 52,82H50Z" />
      <path className="pl-f" d="M44,40V74M48,38V80M52,38V80M56,40V74" />
      <path className="pl-f" d="M10,92c10,-4 20,4 30,0s20,4 30,0s14,3 22,0" />
    </>
  ),
  return: h => (
    <>
      <path className="pl-l" d="M10,86H90" />
      <Shape d="M14,86V54H86V86Z" tone="c" />
      <path fill={h} d="M60,54H86V86H60Z" />
      <path
        className="pl-l"
        d="M14,64H86M14,75H86M32,54V64M56,54V64M78,54V64M22,64V75M44,64V75M68,64V75M32,75V86M56,75V86M78,75V86"
      />
      <Shape d="M38,52c0,-8 24,-8 24,0Z" tone="c" off={1.5} />
      <path className="pl-l" d="M60,46l8,-3" />
      <path className="pl-k" d="M48,40c-3,-5 1,-10 2,-14c1,4 5,9 2,14Z" />
    </>
  ),
  jesus: h => (
    <>
      <path className="pl-f" d="M10,30c6,-2 10,2 16,0M70,22c6,-2 10,2 16,0" />
      <path className="pl-l" d="M52,64V16" />
      <Shape d="M54,20L76,56H54Z" tone="b" />
      <Shape d="M14,64H86L76,80H24Z" tone="c" />
      <path fill={h} d="M50,64H86L76,80H50Z" />
      <path
        className="pl-l"
        d="M6,86c8,-4 14,4 22,0s14,4 22,0s14,4 22,0s14,4 22,0"
      />
      <path className="pl-f" d="M10,94c8,-3 14,3 22,0s14,3 22,0s14,3 22,0" />
    </>
  ),
  cross: h => (
    <>
      <Shape d="M4,92C20,62 40,54 60,60C76,64 88,76 96,92Z" tone="g" />
      <path fill={h} d="M60,60C76,64 88,76 96,92H58Z" />
      <path className="pl-k" d="M33,58V16h5V58ZM24,26H47v5H24Z" />
      <path className="pl-k" d="M66,84a10,10 0 0 1 20,0Z" />
      <Shape d="M54,86a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" tone="b" off={1.5} />
    </>
  ),
  church: h => (
    <>
      <Shape
        d="M50,88C30,84 24,66 34,50C38,60 42,60 42,52C42,38 50,28 56,14C58,30 72,40 72,58C72,74 64,86 50,88Z"
        tone="c"
      />
      <path
        fill={h}
        d="M56,14C58,30 72,40 72,58C72,74 64,86 50,88C60,76 62,60 56,46Z"
      />
      <path className="pl-l" d="M50,88C42,82 42,72 50,62C54,70 58,74 56,80" />
    </>
  ),
  "new-creation": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <Shape
        d="M30,84V40L50,24L70,40V84H60V60a10,10 0 0 0 -20,0V84Z"
        tone="b"
      />
      <path fill={h} d="M50,24L70,40V84H60V60a10,10 0 0 0 -10,-10Z" />
      <path className="pl-l" d="M30,48H70" />
      <Shape d="M74,62a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" tone="g" off={1.5} />
      <path className="pl-l" d="M83,70V84" />
      <path className="pl-f" d="M44,84c-2,4 -8,6 -10,10M50,84c0,4 -2,8 -2,12" />
    </>
  ),
  /*
   * Marks for the moving pictures that are not one stop's own picture
   * (films/<slug>.json "mark"): each teaches its film at a glance.
   */
  /* How salvation works: a gap no one can cross, and a way laid from God's side. */
  "how-salvation-works": h => (
    <>
      <path className="pl-f" d="M84,10l-8,14M96,18l-12,10M100,34H86" />
      <Shape d="M-4,100V64H38L42,100Z" tone="g" />
      <Shape d="M58,100L62,44H104V100Z" tone="c" />
      <path fill={h} d="M42,100L38,64H50L58,100Z" />
      <path className="pl-l" d="M38,64L42,100M58,100L62,44" />
      <path
        className="pl-l"
        strokeDasharray="4 4"
        d="M70,42C64,20 38,22 28,52"
      />
      <Shape d="M17,64L19,52C20,49 26,49 27,52L29,64Z" tone="b" off={1.5} />
      <path className="pl-o" d="M19,45a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
    </>
  ),
  /* Who God is: the Jordan, where the Son, the Spirit and the Father's voice are together. */
  "who-god-is": h => (
    <>
      <path fill={h} d="M0,0H100V30L58,30L52,22L46,30H0Z" />
      <path className="pl-l" d="M0,30H46L52,22L58,30H100" />
      <path
        className="pl-o"
        d="M52,40C44,32 34,32 28,38C36,40 42,42 50,46ZM52,40C60,32 70,32 76,38C68,40 62,42 54,46ZM50,40C50,36 54,36 54,40L53,52L52,56L51,52Z"
      />
      <Shape d="M44,86L46,70C47,64 57,64 58,70L60,86Z" tone="c" off={1.5} />
      <path className="pl-o" d="M47,62a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z" />
      <Shape d="M0,100V80C30,76 70,76 100,80V100Z" tone="b" />
      <path className="pl-f" d="M10,88c6,-3 12,3 18,0M70,90c6,-3 12,3 18,0" />
    </>
  ),
  /* God with his people: the tent in the camp, the cloud standing over it. */
  "god-with-his-people": h => (
    <>
      <path className="pl-l" d="M6,84H94" />
      <Shape
        d="M44,40C34,40 32,30 40,26C38,16 50,12 54,20C60,14 70,20 66,28C72,32 68,40 60,40Z"
        tone="b"
        off={1.5}
      />
      <Shape d="M26,84V58L50,46L74,58V84Z" tone="c" />
      <path fill={h} d="M50,46L74,58V84H50Z" />
      <path className="pl-k" d="M45,84V66H55V84Z" />
      <Shape d="M6,84L14,70L22,84Z" tone="g" off={1.5} />
      <Shape d="M78,84L86,70L94,84Z" tone="g" off={1.5} />
    </>
  ),
  /* The gospel in a minute: the land joined again under an empty cross, the tomb open beside it. */
  "gospel-in-a-minute": h => (
    <>
      <Shape d="M-4,100V70H104V100Z" tone="g" />
      <path fill={h} d="M50,70L46,82L52,92L48,100H104V70Z" />
      <path className="pl-l" d="M50,70L46,82L52,92L48,100" />
      <Shape d="M34,70V24H40V36H50V42H40V70Z" tone="c" off={1.5} />
      <Shape d="M62,70V54a14,14 0 0 1 28,0V70Z" tone="b" off={1.5} />
      <path className="pl-k" d="M70,70V58a6,6 0 0 1 12,0V70Z" />
      <path className="pl-o" d="M84,70a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M84,70a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
    </>
  ),
  /* The Bible in a minute: an open book with one road running across both pages. */
  "bible-in-a-minute": h => (
    <>
      <Shape
        d="M6,78V30C22,24 38,26 50,34C62,26 78,24 94,30V78C78,72 62,74 50,82C38,74 22,72 6,78Z"
        tone="b"
      />
      <path fill={h} d="M50,34C62,26 78,24 94,30V78C78,72 62,74 50,82Z" />
      <path className="pl-l" d="M50,34V82" />
      <path
        className="pl-l"
        strokeDasharray="5 4"
        d="M14,64C24,52 34,62 42,50S58,40 64,52S80,62 88,44"
      />
      <path className="pl-o" d="M10,64a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
      <path className="pl-l" d="M10,64a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
      <path className="pl-o" d="M84,44a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
      <path className="pl-l" d="M84,44a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
    </>
  ),
  /* Does God exist?: the chain of things framed small, resting in light from beyond the edge. */
  "does-god-exist": h => (
    <>
      <path
        className="pl-f"
        d="M30,0L38,40M50,0V40M70,0L62,40M14,8L30,42M86,8L70,42"
      />
      <Shape d="M10,44H90V76H10Z" tone="b" />
      <path fill={h} d="M10,70H90V76H10Z" />
      <path className="pl-o" d="M18,60a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M18,60a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <Shape d="M38,60a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" tone="g" off={1} />
      <Shape d="M58,60a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" tone="c" off={1} />
      <path className="pl-l" d="M34,60H38M54,60H58M74,60H80" />
      <path className="pl-l" d="M82,60h1M86,60h1" />
    </>
  ),
  /* Why did Jesus die?: the Passover lamb. */
  "why-jesus-died": h => (
    <>
      <path className="pl-l" d="M8,82H92" />
      <path className="pl-l" d="M36,64V82M44,66V82M62,66V82M70,64V82" />
      <Shape
        d="M30,52C26,44 34,38 40,40C44,34 52,34 56,38C62,34 70,38 70,44C76,46 76,56 70,58C70,66 60,68 56,64C50,70 40,68 38,64C30,66 26,58 30,52Z"
        tone="b"
      />
      <path
        fill={h}
        d="M56,38C62,34 70,38 70,44C76,46 76,56 70,58C70,66 60,68 56,64Z"
      />
      <Shape
        d="M70,40C72,32 82,30 86,36C90,42 86,50 80,50C76,50 72,46 70,40Z"
        tone="b"
        off={1.5}
      />
      <path className="pl-l" d="M74,36l-4,-4" />
    </>
  ),
  /* Did Jesus really come back to life?: the tomb, its stone rolled aside. */
  "did-jesus-come-back-to-life": h => (
    <>
      <Shape d="M4,86V50C18,28 70,22 96,34V86Z" tone="b" />
      <path fill={h} d="M70,30C82,30 92,32 96,34V86H76Z" />
      <path className="pl-paper" d="M30,86V62a12,12 0 0 1 24,0V86Z" />
      <path className="pl-l" d="M30,86V62a12,12 0 0 1 24,0V86Z" />
      <Shape d="M58,86a14,14 0 1,1 28,0Z" tone="g" off={1.5} />
      <path className="pl-l" d="M2,86H98" />
    </>
  ),
  /* How the 66 books fit together: books on two shelves. */
  "sixty-six-books": h => (
    <>
      <path className="pl-l" d="M8,48H92M8,86H92M8,14V86M92,14V86" />
      <Shape d="M14,48V24h7v24ZM22,48V20h6v28ZM29,48V26h8v22Z" tone="c" off={1} />
      <Shape d="M40,48V22h6v26ZM47,48V28h5v20ZM53,48V24h7v24Z" tone="g" off={1} />
      <Shape d="M63,48V20h6v28ZM70,48V26h8v22ZM79,48V22h7v26Z" tone="b" off={1} />
      <Shape d="M14,86V60h8v26ZM23,86V64h6v22ZM30,86V58h7v28Z" tone="g" off={1} />
      <Shape d="M40,86V62h5v24ZM46,86V60h6v26ZM53,86V64h5v22ZM59,86V60h6v26Z" tone="b" off={1} />
      <Shape d="M68,86V58h8v28ZM77,86V62h9v24Z" tone="c" off={1} />
      <path fill={h} d="M8,86H92V90H8Z" />
    </>
  ),
  /* What the church is: living stones laid into one house. */
  "the-church": h => (
    <>
      <path className="pl-l" d="M10,40L50,12L90,40" />
      <Shape d="M14,88V70H38V88ZM40,88V70H62V88ZM64,88V70H86V88Z" tone="c" off={1} />
      <Shape d="M24,68V50H48V68ZM50,68V50H76V68Z" tone="g" off={1} />
      <Shape d="M36,48V40H64V48Z" tone="b" off={1} />
      <path fill={h} d="M14,84H86V88H14Z" />
    </>
  ),
  /* Why do bad things happen?: a bowl, broken and mended, the mending shown. */
  "why-bad-things-happen": h => (
    <>
      <path className="pl-l" d="M10,80H90" />
      <Shape d="M18,40H82C80,64 66,78 50,78C34,78 20,64 18,40Z" tone="c" />
      <path fill={h} d="M66,40H82C80,62 70,74 60,77Z" />
      <path className="pl-l" d="M18,40C30,46 70,46 82,40" />
      <path className="pl-l" d="M40,42L36,54L42,62L38,77M60,42L63,52L57,62L61,77" />
    </>
  ),
  /* Is the Bible true?: a scroll, and copies of it. */
  "is-the-bible-true": h => (
    <>
      <path className="pl-f" d="M30,40L62,26M30,40L62,58M30,40L62,86" />
      <Shape d="M12,30H48V50H12Z" tone="c" off={1.5} />
      <path className="pl-f" d="M18,37H42M18,43H38" />
      <Shape d="M60,20H90V32H60ZM60,52H90V64H60ZM60,80H90V92H60Z" tone="b" off={1} />
      <path fill={h} d="M80,20H90V32H80ZM80,52H90V64H80ZM80,80H90V92H80Z" />
    </>
  ),
  /* The Holy Spirit in a believer: a vine, its branches and fruit. */
  "spirit-in-a-believer": h => (
    <>
      <path className="pl-l" d="M50,94C48,76 54,64 50,50C47,40 52,30 50,20" />
      <path className="pl-l" d="M50,58C40,54 28,58 16,50M50,58C60,54 72,58 84,50M50,36C42,30 34,30 26,22M50,36C58,30 66,30 74,22" />
      <Shape d="M20,58a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM68,58a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM44,26a6,6 0 1,0 12,0a6,6 0 1,0 -12,0Z" tone="c" off={1} />
      <path fill={h} d="M0,94H100V100H0Z" />
    </>
  ),
  /* Prayer: a window at evening, and one thin line rising. */
  prayer: h => (
    <>
      <Shape d="M52,22H86V62H52Z" tone="b" off={1.5} />
      <path fill={h} d="M56,26H82V58H56Z" />
      <path className="pl-l" d="M69,26V58M56,42H82" />
      <Shape d="M18,86C18,72 26,66 34,66C42,66 50,72 50,86Z" tone="c" off={1} />
      <path className="pl-o" d="M27,56a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
      <path className="pl-l" d="M27,56a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
      <path className="pl-f" d="M34,44C40,38 28,32 34,26C40,20 28,14 34,8" />
      <path className="pl-l" d="M10,86H90" />
    </>
  ),
  /* Baptism and the Lord's Supper: water, and the bread and the cup. */
  "baptism-and-supper": h => (
    <>
      <Shape d="M18,52a14,9 0 0 1 28,0Z" tone="c" off={1} />
      <Shape d="M58,24h24c0,14 -4,20 -12,21v8h7v4h-14v-4h7v-8c-8,-1 -12,-7 -12,-21Z" tone="b" off={1} />
      <path className="pl-l" d="M10,58H90" />
      <Shape d="M6,68C30,64 70,72 94,68V90H6Z" tone="b" off={1.5} />
      <path fill={h} d="M6,78C30,74 70,82 94,78V90H6Z" />
    </>
  ),
  /* The life to come: a seed in the soil, and a stalk of wheat above it. */
  "life-to-come": h => (
    <>
      <path className="pl-l" d="M8,62H92" />
      <path fill={h} d="M8,66H92V92H8Z" />
      <path className="pl-o" d="M42,78a8,5 -20 1,0 16,0a8,5 -20 1,0 -16,0Z" />
      <path className="pl-c" d="M42,78a8,5 -20 1,0 16,0a8,5 -20 1,0 -16,0Z" transform="translate(1,0.8)" />
      <path className="pl-l" d="M42,78a8,5 -20 1,0 16,0a8,5 -20 1,0 -16,0Z" />
      <path className="pl-l" d="M50,74C51,56 49,40 50,22" />
      <Shape d="M49,34c-7,-1 -10,-7 -8,-11c6,1 9,5 8,11ZM49,26c-7,-1 -10,-7 -8,-11c6,1 9,5 8,11ZM51,30c7,-1 10,-7 8,-11c-6,1 -9,5 -8,11ZM51,22c7,-1 10,-7 8,-11c-6,1 -9,5 -8,11Z" tone="c" off={0.8} />
    </>
  ),
  /* Why are there so many churches?: one tree, many branches, one root. */
  "so-many-churches": h => (
    <>
      <path className="pl-l" d="M8,70H92" />
      <path fill={h} d="M8,74H92V92H8Z" />
      <path className="pl-l" d="M50,74C48,80 42,84 36,88M50,74C52,80 58,84 64,88" />
      <path className="pl-l" d="M50,70V44M50,46C42,38 34,32 26,22M50,46C58,38 66,32 74,22M36,32C34,24 34,18 36,12M64,32C66,24 66,18 64,12M50,52C44,48 38,46 30,44M50,50C56,46 62,44 70,42" style={{ strokeWidth: 3 }} />
    </>
  ),
  /* The Bible, how we got it: a rolled scroll, and an open book with a stitched spine. */
  "the-bible": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M12,72H50a4,8 0 0 1 0,16H12Z" tone="c" off={1} />
      <path className="pl-o" d="M12,72a4,8 0 1,0 0,16a4,8 0 1,0 0,-16Z" />
      <path className="pl-l" d="M12,72a4,8 0 1,0 0,16a4,8 0 1,0 0,-16Z" />
      <Shape d="M44,66V30C54,26 64,28 70,34C76,28 86,26 96,30V66C86,62 76,64 70,70C64,64 54,62 44,66Z" tone="b" off={1} />
      <path className="pl-l" d="M70,34V70" />
      <path className="pl-f" d="M50,40C56,38 62,38 66,42M50,48C56,46 62,46 66,50M50,56C56,54 62,54 66,58M74,42C78,38 84,38 90,40M74,50C78,46 84,46 90,48M74,58C78,54 84,54 90,56" />
    </>
  ),
  /* The king: a crown resting on a shepherd's crook. */
  "the-king": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-l" d="M58,84V40C58,28 70,24 74,34" style={{ strokeWidth: 3 }} />
      <path className="pl-o" d="M30,46V30L38,38L46,24L54,38L62,30V46Z" />
      <path className="pl-m" d="M30,46V30L38,38L46,24L54,38L62,30V46Z" />
      <path className="pl-l" d="M30,46V30L38,38L46,24L54,38L62,30V46Z" />
      <Shape d="M14,76c0,-8 22,-8 22,0c0,7 -22,7 -22,0Z" tone="c" off={0.8} />
    </>
  ),
  /* Does God still love me when I do wrong?: a house with a lit window, and the road home. */
  "love-when-i-do-wrong": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M54,62V40H86V62Z" tone="c" off={1} />
      <Shape d="M50,42L70,26L90,42Z" tone="b" off={1} />
      <path className="pl-o" d="M74,46h8v8h-8Z" />
      <path className="pl-m" d="M74,46h8v8h-8Z" />
      <path className="pl-l" d="M74,46h8v8h-8Z" />
      <path className="pl-l" d="M60,62V52h8v10" />
      <path className="pl-f" d="M64,64C56,72 40,74 30,78C22,81 14,82 8,84M70,64C64,74 48,78 38,82" />
    </>
  ),
  /* The resurrection: the open door of the tomb with light inside, and the first sheaf. */
  "the-resurrection": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M14,84V54C26,34 54,30 66,40V84Z" tone="b" off={1.5} />
      <path className="pl-m" d="M28,84V62a10,10 0 0 1 20,0V84Z" />
      <path className="pl-l" d="M28,84V62a10,10 0 0 1 20,0V84Z" />
      <path className="pl-l" d="M76,84C76,66 74,50 72,34M80,84C80,66 80,50 80,32M84,84C84,66 86,50 88,34" />
      <path className="pl-l" d="M74,64H86" style={{ strokeWidth: 3 }} />
      <Shape d="M72,36c-3,-5 -3,-12 0,-18c3,6 3,13 0,18ZM80,34c-3,-5 -3,-12 0,-18c3,6 3,13 0,18ZM88,36c-3,-5 -3,-12 0,-18c3,6 3,13 0,18Z" tone="c" off={0.8} />
    </>
  ),
  /* Promises that build: an arch of five stones, its keystone gold. */
  covenant: h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M32,84L14,84L20.5,63.4L35.2,73.7Z" tone="c" off={0.8} />
      <Shape d="M35.7,73.1L21.3,62.3L38.2,50L44.1,67Z" tone="c" off={0.8} />
      <Shape d="M55.9,67L61.8,50L78.7,62.3L64.3,73.1Z" tone="c" off={0.8} />
      <Shape d="M64.8,73.7L79.5,63.4L86,84L68,84Z" tone="c" off={0.8} />
      <path className="pl-m" d="M44.8,66.8L39.6,49.5L60.4,49.5L55.2,66.8Z" />
      <path className="pl-l" d="M44.8,66.8L39.6,49.5L60.4,49.5L55.2,66.8Z" />
      <path className="pl-f" d="M28,34a22,22 0 0 1 44,0M34,34a16,16 0 0 1 32,0" />
    </>
  ),
  /* Sacrifice and the Lamb: a lamb standing, gold. */
  "the-lamb": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-l" d="M30,70V84M40,72V84M56,72V84M64,70V84" />
      <path className="pl-m" d="M26,58C20,46 34,38 44,40C52,34 66,38 68,48C76,52 74,66 66,68C60,74 32,74 28,68C20,66 18,60 26,58Z" />
      <path className="pl-l" d="M26,58C20,46 34,38 44,40C52,34 66,38 68,48C76,52 74,66 66,68C60,74 32,74 28,68C20,66 18,60 26,58Z" />
      <path className="pl-m" d="M66,46C68,36 82,34 84,44C84,50 78,54 72,52C68,51 66,49 66,46Z" />
      <path className="pl-l" d="M66,46C68,36 82,34 84,44C84,50 78,54 72,52C68,51 66,49 66,46ZM70,40l-6,-5" />
    </>
  ),
  /* Exile and coming home: a road over the hills to a city with its gate open and lit. */
  "exile-and-home": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M48,62V38h6v-4h5v4h10v-4h5v4h10v-4h5v4h3V62Z" tone="c" off={1} />
      <path className="pl-m" d="M64,62V52a6,6 0 0 1 12,0V62Z" />
      <path className="pl-l" d="M64,62V52a6,6 0 0 1 12,0V62Z" />
      <path className="pl-f" d="M70,62C60,70 36,76 8,82M72,62C66,72 44,80 20,86" />
      <path className="pl-l" d="M14,66c2,-4 4,-4 6,0M22,70c2,-4 4,-4 6,0" />
    </>
  ),
  /* The kingdom of God: a tree grown from a mustard seed, birds in its branches. */
  "kingdom-of-god": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M56,84C57,72 57,62 55,54H63C61,62 61,72 62,84Z" tone="c" off={0.8} />
      <Shape d="M30,52C26,36 42,24 56,28C66,16 86,22 86,36C94,42 90,56 80,56C72,62 44,62 38,58C30,60 26,56 30,52Z" tone="g" off={1} />
      <path className="pl-l" d="M40,40C42,36 46,36 48,40M70,34C72,30 76,30 78,34" />
      <path className="pl-m" d="M18,82C18,78 28,78 28,82C28,85 18,85 18,82Z" />
      <path className="pl-l" d="M18,82C18,78 28,78 28,82C28,85 18,85 18,82Z" />
    </>
  ),
  /* Why can't I see God?: a tree bending in a wind that is not drawn, a leaf blown past. */
  "why-cant-i-see-god": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M46,84C47,72 50,62 56,54H62C56,62 53,72 53,84Z" tone="c" off={0.8} />
      <Shape d="M40,48C40,34 56,28 66,32C78,28 90,38 86,48C90,56 80,62 70,58C60,64 44,60 40,48Z" tone="g" off={1} />
      <path className="pl-f" d="M10,40C18,38 24,42 32,40M14,56C22,54 28,58 36,56M10,70C20,68 28,72 38,70" />
      <path className="pl-m" d="M20,26C26,20 34,22 34,22C30,28 24,30 20,26Z" />
      <path className="pl-l" d="M20,26C26,20 34,22 34,22C30,28 24,30 20,26Z" />
    </>
  ),
  /* What happens when we die?: a house on a hill with its door open and light within, a path up to it. */
  "when-we-die": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M8,84C30,70 46,62 68,60C80,59 90,64 92,70V84Z" tone="g" off={1} />
      <Shape d="M54,62V40H84V62Z" tone="c" off={1} />
      <Shape d="M50,42L69,26L88,42Z" tone="b" off={1} />
      <path className="pl-m" d="M63,62V48h12v14Z" />
      <path className="pl-l" d="M63,62V48h12v14Z" />
      <path className="pl-f" d="M66,62C52,70 34,76 14,84M72,62C62,72 46,80 30,86" />
    </>
  ),
  /* Why does God seem silent sometimes?: hills at night, stars above, the first gold line of morning along them. */
  "god-silent": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M8,64C30,58 70,58 92,64V68C70,62 30,62 8,68Z" />
      <Shape d="M8,84V70C24,60 40,62 54,70C66,62 82,62 92,68V84Z" tone="g" off={1} />
      <path className="pl-l" d="M24,22l2,5l5,2l-5,2l-2,5l-2,-5l-5,-2l5,-2ZM56,14l1.5,4l4,1.5l-4,1.5l-1.5,4l-1.5,-4l-4,-1.5l4,-1.5ZM78,30l1.5,4l4,1.5l-4,1.5l-1.5,4l-1.5,-4l-4,-1.5l4,-1.5Z" />
    </>
  ),
  /* Are science and the Bible enemies?: an open book and a small telescope, one gold star. */
  "science-and-the-bible": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M12,82C20,76 30,76 38,80C46,76 56,76 64,82V70C56,64 46,64 38,68C30,64 20,64 12,70Z" tone="c" off={0.8} />
      <path className="pl-l" d="M38,68V80" />
      <Shape d="M62,52L86,36L90,42L66,58Z" tone="b" off={0.8} />
      <path className="pl-l" d="M72,54L66,82M74,54L84,82" />
      <path className="pl-m" d="M30,18l3,7l7,3l-7,3l-3,7l-3,-7l-7,-3l7,-3Z" />
      <path className="pl-l" d="M30,18l3,7l7,3l-7,3l-3,7l-3,-7l-7,-3l7,-3Z" />
    </>
  ),
  /* Sacrifice: why blood?: an altar of rough stones, a small gold flame on it. */
  "why-blood": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M20,84L24,68H76L80,84Z" tone="b" off={1} />
      <Shape d="M28,68L32,54H68L72,68Z" tone="b" off={1} />
      <path className="pl-f" d="M40,84V68M60,84V68M50,68V54" />
      <path
        className="pl-m"
        d="M50,26C56,34 60,40 60,46A10,10 0 0 1 40,46C40,40 44,34 50,26Z"
      />
      <path
        className="pl-l"
        d="M50,26C56,34 60,40 60,46A10,10 0 0 1 40,46C40,40 44,34 50,26Z"
      />
    </>
  ),
  /* Grace: an empty bowl held up, and a gift coming down into it. */
  grace: h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M24,56H76C76,78 24,78 24,56Z" tone="c" off={1} />
      <path className="pl-l" d="M42,74V84M58,74V84M36,84H64" />
      <path className="pl-f" d="M50,12V20M38,16l3,6M62,16l-3,6" />
      <path className="pl-m" d="M40,36a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M40,36a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
    </>
  ),
  /* Faith: one mustard seed, gold, before a mountain. */
  faith: h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M30,84L62,26L92,84Z" tone="b" off={1} />
      <path fill={h} d="M62,26L92,84H68Z" />
      <path className="pl-l" d="M30,84L62,26L92,84" />
      <path
        className="pl-f"
        strokeDasharray="2 3"
        d="M12,72a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z"
      />
      <path className="pl-m" d="M19,72a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z" />
      <path className="pl-l" d="M19,72a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z" />
    </>
  ),
  /* David and Goliath: a shepherd's crook, a tall spear, and five smooth stones. */
  "david-and-goliath": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-l" d="M74,84V14" />
      <path className="pl-k" d="M74,4l5,12h-10Z" />
      <path className="pl-l" d="M28,84V36C28,24 44,24 44,36" />
      <Shape
        d="M36,80a6,4 0 1,0 12,0a6,4 0 1,0 -12,0ZM50,82a6,4 0 1,0 12,0a6,4 0 1,0 -12,0ZM44,72a6,4 0 1,0 12,0a6,4 0 1,0 -12,0ZM58,74a6,4 0 1,0 12,0a6,4 0 1,0 -12,0ZM52,64a6,4 0 1,0 12,0a6,4 0 1,0 -12,0Z"
        tone="c"
        off={0.8}
      />
    </>
  ),
  /* Psalm 23: a shepherd's crook, a sheep at rest, and a full gold cup. */
  "psalm-23": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-l" d="M24,84V30C24,16 42,16 42,30" />
      <Shape
        d="M40,70C34,60 44,52 52,56C56,48 70,50 70,58C80,58 80,72 72,74C68,80 46,80 42,74C36,74 36,72 40,70Z"
        off={0.8}
      />
      <path className="pl-l" d="M46,76V84M66,76V84" />
      <path className="pl-m" d="M76,40h14l-2,-14h-10Z" />
      <path className="pl-l" d="M76,40h14l-2,-14h-10ZM80,40v5h6v-5" />
    </>
  ),
  /* Romans 8:28: a heavy cloud, and the sun still behind it, gold. */
  "romans-8-28": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-f" d="M66,14V8M80,20l5,-4M86,34h6M52,20l-5,-4" />
      <path className="pl-m" d="M52,34a14,14 0 1,0 28,0a14,14 0 1,0 -28,0Z" />
      <path className="pl-l" d="M52,34a14,14 0 1,0 28,0a14,14 0 1,0 -28,0Z" />
      <Shape
        d="M22,60C10,60 10,44 24,44C24,30 48,26 54,38C62,24 82,30 80,46C92,46 92,60 80,60Z"
        off={1}
      />
      <path fill={h} d="M22,60C12,60 12,50 20,48H80C90,50 88,60 80,60Z" />
      <path className="pl-f" d="M30,66l-4,10M46,66l-4,10M62,66l-4,10" />
    </>
  ),
  /* A blessing for all nations: three people of different dress side by side, one gold star over them. */
  "all-nations": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M14,84C14,62 18,54 26,54C34,54 38,62 38,84Z" tone="b" off={1} />
      <Shape d="M38,84C38,56 43,46 50,46C57,46 62,56 62,84Z" tone="c" off={1} />
      <Shape d="M62,84C62,62 66,54 74,54C82,54 86,62 86,84Z" tone="g" off={1} />
      <Shape d="M20,46a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM44,38a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM68,46a6,6 0 1,0 12,0a6,6 0 1,0 -12,0Z" off={0.8} />
      <path className="pl-m" d="M50,6l3,7l7,3l-7,3l-3,7l-3,-7l-7,-3l7,-3Z" />
      <path className="pl-l" d="M50,6l3,7l7,3l-7,3l-3,7l-3,-7l-7,-3l7,-3Z" />
    </>
  ),
  /* Light and darkness: a small clay lamp on dark ground, its flame gold, rays above it. */
  "light-and-darkness": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path fill={h} d="M8,8H92V84H8Z" />
      <path className="pl-paper" d="M50,10a30,30 0 1,0 0.1,0Z" />
      <path className="pl-f" d="M50,14V22M32,22l5,6M68,22l-5,6M24,40h8M76,40h-8" />
      <Shape d="M26,70C26,80 38,84 50,84C64,84 76,80 78,70L70,68C60,64 38,62 26,70Z" tone="c" off={1} />
      <path className="pl-m" d="M50,62C58,52 60,44 54,32C44,42 42,52 50,62Z" />
      <path className="pl-l" d="M50,62C58,52 60,44 54,32C44,42 42,52 50,62Z" />
    </>
  ),
  /* What about people who never heard?: a small far house on a hill, a long road up to it, a gold sun. */
  "never-heard": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M8,84V66C30,54 60,50 92,58V84Z" tone="g" off={1} />
      <Shape d="M60,54V40H80V54Z" tone="c" off={0.8} />
      <path className="pl-l" d="M57,40H83M68,54V46h5v8" />
      <path className="pl-f" d="M14,84C30,76 40,74 46,68C52,62 60,60 66,55M26,84C40,78 50,76 54,70" />
      <path className="pl-m" d="M18,26a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <path className="pl-l" d="M18,26a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <path className="pl-f" d="M27,10V5M27,42V47M11,26H6M43,26H48" />
    </>
  ),
  /* Why did God let his temple be destroyed?: two pillars, one standing and one broken, a gold dawn between them. */
  "temple-destroyed": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M36,84a14,14 0 0,1 28,0Z" />
      <path className="pl-l" d="M36,84a14,14 0 0,1 28,0" />
      <path className="pl-f" d="M50,62V54M34,68l-5,-5M66,68l5,-5" />
      <Shape d="M18,84V24H32V84Z" tone="c" off={1} />
      <path className="pl-l" d="M14,24H36M14,18H36" />
      <Shape d="M68,84V56L74,48L78,58L82,50V84Z" tone="c" off={1} />
      <Shape d="M62,84L88,78L90,84Z" off={0.8} />
    </>
  ),
  /* Genesis: an open scroll, and a gold sun rising over it. */
  "book-genesis": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M36,46a14,14 0 0,1 28,0Z" />
      <path className="pl-l" d="M36,46a14,14 0 0,1 28,0" />
      <path className="pl-f" d="M50,24V16M34,30l-5,-5M66,30l5,-5" />
      <Shape d="M22,80V50H78V80Z" off={1} />
      <Shape d="M16,46h8v38h-8ZM76,46h8v38h-8Z" tone="c" off={0.8} />
      <path className="pl-f" d="M30,58H70M30,65H70M30,72H58" />
    </>
  ),
  /* Psalms: a small harp, and a gold sun behind it. */
  "book-psalms": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M56,30a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <path className="pl-l" d="M56,30a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <Shape d="M30,84C22,58 30,34 52,24L57,31C42,40 36,60 40,84Z" tone="c" off={1} />
      <path className="pl-l" d="M30,84H66M55,28L62,84" />
      <path className="pl-f" d="M38,74L60,70M37,62L59,56M39,50L58,44M44,40L56,34" />
    </>
  ),
  /* John: a tent pitched under the stars, a gold light in its door. */
  "book-john": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path fill={h} d="M8,8H92V84H8Z" />
      <path className="pl-l" d="M24,18l2,5l5,2l-5,2l-2,5l-2,-5l-5,-2l5,-2ZM74,14l1.5,4l4,1.5l-4,1.5l-1.5,4l-1.5,-4l-4,-1.5l4,-1.5Z" />
      <Shape d="M14,84L26,58L46,42L62,46L78,58L88,84Z" tone="c" off={1} />
      <path className="pl-m" d="M40,84L45,60H59L64,84Z" />
      <path className="pl-l" d="M40,84L45,60H59L64,84M26,58H78" />
    </>
  ),
  /* Romans: a letter rolled and sealed, the seal gold. */
  "book-romans": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M22,74V34H78V74Z" off={1} />
      <Shape d="M14,30h8v48h-8ZM78,30h8v48h-8Z" tone="c" off={0.8} />
      <path className="pl-f" d="M30,44H70M30,52H70M30,60H52" />
      <path className="pl-m" d="M56,64a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M56,64a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M30,84H70" />
    </>
  ),
  /* Exodus: a bush that burns and is not burned up, its flame gold. */
  "book-exodus": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-l" d="M50,84V64M50,72L38,60M50,70L62,58" />
      <Shape d="M26,66C20,50 32,38 42,42C46,30 64,30 66,44C78,42 84,56 76,66Z" tone="g" off={1} />
      <path className="pl-m" d="M50,42C60,30 62,20 56,8C46,18 42,30 50,42Z" />
      <path className="pl-l" d="M50,42C60,30 62,20 56,8C46,18 42,30 50,42Z" />
    </>
  ),
  /* Proverbs: a road that divides, and a gold dawn at the end of one way. */
  "book-proverbs": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M58,36a12,12 0 0,1 24,0Z" />
      <path className="pl-l" d="M58,36a12,12 0 0,1 24,0" />
      <Shape d="M8,84V60C30,48 60,40 92,38V84Z" tone="g" off={1} />
      <path className="pl-l" d="M40,84C44,70 52,60 60,54C66,48 68,44 70,38M52,84C54,72 60,64 66,58M40,84C32,72 24,66 14,64" />
    </>
  ),
  /* Isaiah: a stump with one green shoot, and a gold sun rising behind it. */
  "book-isaiah": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M52,40a14,14 0 1,0 28,0a14,14 0 1,0 -28,0Z" />
      <path className="pl-l" d="M52,40a14,14 0 1,0 28,0a14,14 0 1,0 -28,0Z" />
      <Shape d="M28,84C32,74 34,66 34,58H62C62,66 64,74 68,84Z" tone="c" off={1} />
      <path className="pl-l" d="M46,58C45,46 47,36 50,26" />
      <Shape d="M50,26c-9,-3 -14,3 -12,11c7,1 12,-3 12,-11ZM48,42c9,-5 16,0 15,8c-8,2 -14,-1 -15,-8Z" tone="g" off={0.6} />
    </>
  ),
  /* Matthew: a hill for the sermon, and a gold star over it. */
  "book-matthew": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M8,84C28,84 34,48 52,48C70,48 76,84 92,84Z" tone="g" off={1} />
      <path className="pl-f" d="M30,76H74M38,66H66" />
      <path className="pl-m" d="M52,10l3,8l8,3l-8,3l-3,8l-3,-8l-8,-3l8,-3Z" />
      <path className="pl-l" d="M52,10l3,8l8,3l-8,3l-3,8l-3,-8l-8,-3l8,-3Z" />
    </>
  ),
  /* Mark: a fishing boat on the lake, and a gold sun. */
  "book-mark": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M62,26a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M62,26a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M44,66V26M44,30L62,36" />
      <Shape d="M44,32C50,40 50,54 44,62Z" off={0.8} />
      <Shape d="M14,66C26,80 68,80 82,64L76,62H20Z" tone="c" off={1} />
      <path className="pl-f" d="M12,76q5,-4 10,0t10,0M40,80q5,-4 10,0t10,0M68,76q5,-4 10,0t10,0" />
    </>
  ),
  /* Luke: one sheep found, and a gold light over it. */
  "book-luke": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M50,8l3,8l8,3l-8,3l-3,8l-3,-8l-8,-3l8,-3Z" />
      <path className="pl-l" d="M50,8l3,8l8,3l-8,3l-3,8l-3,-8l-8,-3l8,-3Z" />
      <Shape d="M30,68C24,56 36,46 46,52C50,42 68,44 68,54C80,54 80,70 70,72C66,80 38,80 34,72C28,72 28,70 30,68Z" off={1} />
      <Shape d="M68,56c8,-4 14,2 12,8c-4,4 -10,2 -12,-8Z" tone="c" off={0.6} />
      <path className="pl-l" d="M40,76V84M62,76V84" />
    </>
  ),
  /* Acts: a road running out from a city gate to the far edge, and one gold flame over the gate. */
  "book-acts": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M14,84V56h6v-6h6v6h8v-6h6v6h6V84Z" tone="c" off={1} />
      <path className="pl-k" d="M26,84V72c0,-8 10,-8 10,0V84Z" />
      <path className="pl-l" d="M46,84C60,76 74,70 92,60M46,76C58,70 72,62 92,50" />
      <path className="pl-m" d="M30,42C38,32 40,24 35,12C26,22 23,32 30,42Z" />
      <path className="pl-l" d="M30,42C38,32 40,24 35,12C26,22 23,32 30,42Z" />
    </>
  ),
  /* Revelation: a lamb standing on a hill, gold light behind it. */
  "book-revelation": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M30,50a20,20 0 0,1 40,0Z" />
      <path className="pl-l" d="M30,50a20,20 0 0,1 40,0" />
      <path className="pl-f" d="M50,22V14M30,30l-5,-5M70,30l5,-5" />
      <Shape d="M10,84C24,56 76,56 90,84Z" tone="g" off={1} />
      <Shape d="M40,58C36,50 44,44 50,47C53,41 64,42 64,49C72,49 72,60 66,61C63,66 46,66 44,61C39,61 39,60 40,58Z" off={0.8} />
      <path className="pl-l" d="M47,63V70M61,63V70" />
    </>
  ),
  /* Ruth: two sheaves of barley bound and standing in a field, and a gold sun over them. */
  "book-ruth": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M74,22a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <path className="pl-l" d="M74,22a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <Shape d="M20,84L28,62L18,40H42L32,62L40,84Z" tone="c" off={0.8} />
      <Shape d="M46,84L55,60L44,32H70L59,60L68,84Z" tone="c" off={0.8} />
      <path className="pl-l" d="M24,62h12M50,60h14" />
      <path className="pl-l" d="M20,40l-3,-8M26,40l-1,-9M33,40l1,-9M40,40l3,-8M46,32l-3,-8M53,32l-1,-9M61,32l1,-9M68,32l3,-8" />
    </>
  ),
  /* Jonah: a great fish under the waves, and a gold sun over the sea. */
  "book-jonah": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-m" d="M62,22a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M62,22a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-f" d="M10,42q6,-5 12,0t12,0t12,0t12,0t12,0t12,0t12,0" />
      <Shape d="M24,64C34,50 62,48 78,60C80,63 80,65 78,67C62,78 34,76 24,64Z" tone="b" off={0.8} />
      <Shape d="M24,64L12,54C14,60 14,68 12,74Z" tone="b" off={0.8} />
      <path className="pl-k" d="M70,61a2,2 0 1,0 4,0a2,2 0 1,0 -4,0Z" />
    </>
  ),
  /* Daniel: an open window looking toward far hills, and the gold of morning in it. */
  "book-daniel": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M20,84V16H80V84Z" tone="c" off={1} />
      <path className="pl-paper" d="M32,70V28H68V70Z" />
      <path className="pl-m" d="M40,62a10,10 0 0 1 20,0Z" />
      <path className="pl-l" d="M40,62a10,10 0 0 1 20,0" />
      <path className="pl-l" d="M32,62C40,56 46,58 50,62C56,56 62,56 68,60" />
      <path className="pl-l" d="M32,70V28H68V70ZM50,28V44" />
      <path className="pl-f" d="M26,76H74" />
    </>
  ),
  /* 1 Corinthians: one loaf on one table, reached for from every side, under a gold lamp. */
  "book-1-corinthians": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path className="pl-l" d="M50,8V20" />
      <path className="pl-m" d="M42,24h16l-3,8h-10Z" />
      <path className="pl-l" d="M42,24h16l-3,8h-10Z" />
      <Shape d="M18,66H82V72H18Z" tone="c" off={0.8} />
      <Shape d="M36,66c0,-16 28,-16 28,0Z" tone="c" off={0.8} />
      <path className="pl-l" d="M24,72V84M76,72V84M14,58l12,6M86,58l-12,6M30,48l8,10M70,48l-8,10" />
    </>
  ),
  /* Ephesians: a wall broken through in the middle, and a gold light in the gap. */
  "book-ephesians": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M12,84V34H40L44,50L40,84Z" tone="b" off={0.8} />
      <Shape d="M88,84V34H60L56,52L60,84Z" tone="b" off={0.8} />
      <path className="pl-f" d="M12,50H40M12,66H42M60,50H88M58,66H88" />
      <path className="pl-m" d="M44,84V60a6,6 0 0 1 12,0V84Z" />
      <path className="pl-l" d="M44,84V60a6,6 0 0 1 12,0V84Z" />
    </>
  ),
  /* Philippians: a small barred window in a stone wall, gold light in it, and a chain below. */
  "book-philippians": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <Shape d="M14,84V14H86V84Z" tone="c" off={1} />
      <path className="pl-m" d="M36,26H64V50H36Z" />
      <path className="pl-l" d="M36,26H64V50H36ZM45,26V50M55,26V50" />
      <path className="pl-l" d="M30,72a5,3 0 1,0 10,0a5,3 0 1,0 -10,0M38,72a5,3 0 1,0 10,0a5,3 0 1,0 -10,0M46,72a5,3 0 1,0 10,0a5,3 0 1,0 -10,0M54,72a5,3 0 1,0 10,0a5,3 0 1,0 -10,0" />
    </>
  ),
  /* John 3:16 in its chapter: a lamp burning at night, its flame gold. */
  "john-3-16": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <path fill={h} d="M8,88H92V94H8Z" />
      <path
        className="pl-f"
        d="M22,20h4M24,18v4M74,28h4M76,26v4M60,12h4M62,10v4"
      />
      <Shape
        d="M24,70C24,80 40,84 52,84C66,84 78,78 80,70L70,66C60,64 36,62 24,70Z"
        tone="c"
        off={1}
      />
      <path className="pl-l" d="M24,72C12,70 12,84 26,80" />
      <path className="pl-m" d="M74,66C80,56 84,50 80,40C74,46 68,56 74,66Z" />
      <path className="pl-l" d="M74,66C80,56 84,50 80,40C74,46 68,56 74,66Z" />
    </>
  ),
};

/** True when a stop has an emblem drawn for it. */
export const hasEmblem = (slug: string) => slug in EMBLEMS;

/**
 * A stop's roundel: an ink ring with the stop's emblem inside. Decorative by
 * default (the stop's name is always written beside it).
 */
export function Roundel({
  slug,
  className,
  at,
}: {
  slug: string;
  className?: string;
  /** Placed inside another drawing (a moving picture): its top-left corner and size there. */
  at?: { x: number; y: number; size: number };
}) {
  const id = `lwr${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const draw = EMBLEMS[slug];
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      {...(at ? { x: at.x, y: at.y, width: at.size, height: at.size } : {})}
    >
      <defs>
        <clipPath id={`${id}c`}>
          <circle cx="50" cy="50" r="41" />
        </clipPath>
        <EmblemHatch id={`${id}h`} />
      </defs>
      <circle className="pl-o" cx="50" cy="50" r="47" />
      <circle className="pl-f" cx="50" cy="50" r="41" />
      <g clipPath={`url(#${id}c)`}>
        <g transform="translate(13,13) scale(.74)">
          {draw ? draw(`url(#${id}h)`) : null}
        </g>
      </g>
    </svg>
  );
}

/** The top of the map: a road winding from a garden to a city, with stops along it. */
export const HEAD_ART: Drawing = {
  w: 400,
  h: 300,
  label:
    "A road winding from a garden at the top to a city at the bottom, with markers along the way.",
  draw: h => (
    <>
      <path fill={h.hs} d="M0,0H400V300H0Z" />
      <path
        d="M34,38C120,40 300,30 330,86C360,142 60,120 70,186C80,252 300,214 352,262"
        strokeWidth="26"
        fill="none"
        stroke="var(--art-ink)"
      />
      <path
        d="M34,38C120,40 300,30 330,86C360,142 60,120 70,186C80,252 300,214 352,262"
        fill="none"
        stroke="var(--art-paper)"
        strokeWidth="20"
      />
      <path
        className="pl-f"
        strokeDasharray="5 6"
        d="M34,38C120,40 300,30 330,86C360,142 60,120 70,186C80,252 300,214 352,262"
      />
      <Shape d="M14,40a22,22 0 1,0 44,0a22,22 0 1,0 -44,0Z" tone="g" off={4} />
      <path fill={h.h2} d="M36,18a22,22 0 0 1 0,44Z" />
      <path className="pl-l" d="M36,62V78" />
      <Shape
        d="M318,286V238L344,216L370,238V286H356V258a12,12 0 0 0 -24,0V286Z"
        tone="b"
        off={4}
      />
      <path fill={h.h2} d="M344,216L370,238V286H356V258a12,12 0 0 0 -12,-12Z" />
      <Shape d="M150,46a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" tone="c" off={3} />
      <Shape
        d="M306,104a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z"
        tone="c"
        off={3}
      />
      <Shape
        d="M150,128a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z"
        tone="c"
        off={3}
      />
      <Shape d="M60,190a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" tone="c" off={3} />
      <path className="pl-m" d="M206,232a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <path className="pl-l" d="M206,232a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
    </>
  ),
};

/** The "Jesus, God and man" card: a manger in a stable under one star. */
export const MANGER: Drawing = {
  w: 400,
  h: 300,
  label: "A manger full of straw in a stable at night, under one bright star.",
  draw: h => (
    <>
      <path fill={h.h3} d="M0,0H400V300H0Z" />
      <path
        className="pl-paper"
        d="M300,34l6,16l17,2l-17,4l-6,16l-6,-16l-17,-4l17,-2Z"
      />
      <path
        className="pl-m"
        d="M300,38l4,12l12,2l-12,3l-4,12l-4,-12l-12,-3l12,-2Z"
      />
      <path
        className="pl-l"
        d="M300,34l6,16l17,2l-17,4l-6,16l-6,-16l-17,-4l17,-2Z"
      />
      <path className="pl-f" d="M300,72V96M300,14V26M272,52H258M328,52H342" />
      <Shape d="M40,124L200,70L360,124V138H40Z" tone="c" off={4} />
      <path fill={h.h2} d="M200,70L360,124V138H200Z" />
      <path className="pl-o" d="M60,138H340V300H60Z" />
      <path fill={h.h1} d="M60,138H340V300H60Z" />
      <path className="pl-l" d="M60,138V300M340,138V300M60,138H340" />
      <path className="pl-o" d="M0,256H400V300H0Z" />
      <path fill={h.hh} d="M0,270H400V300H0Z" />
      <path className="pl-l" d="M110,256L136,196M290,256L264,196" />
      <Shape d="M118,196H282L262,240H138Z" tone="c" off={4} />
      <path fill={h.h2} d="M210,196H282L262,240H210Z" />
      <path
        className="pl-l"
        d="M126,196l10,-16l8,14l10,-18l8,16l12,-20l8,18l12,-16l8,16l12,-20l8,18l10,-14l10,16l10,-18l8,16l12,-14l8,14"
      />
      <path className="pl-o" d="M168,186a32,14 0 1,0 64,0a32,14 0 1,0 -64,0Z" />
      <path
        className="pl-f"
        d="M176,184c14,-6 34,-6 48,0M178,190c14,-5 30,-5 44,0"
      />
    </>
  ),
};

/**
 * "The resurrection" card: a tomb cut in a rock garden at first light, its
 * round stone rolled aside, the doorway open and empty; on the far hill, the
 * empty cross.
 */
export const EMPTY_TOMB: Drawing = {
  w: 400,
  h: 300,
  label:
    "A tomb cut in the rock of a garden at first light, its round stone rolled aside and its doorway open and empty; on a far hill, an empty cross.",
  draw: h => (
    <>
      <path
        className="pl-f"
        d="M40,206l-26,-30M60,196l-8,-40M84,202l18,-36M100,214l34,-22"
      />
      <path className="pl-m" d="M38,232a28,28 0 0 1 56,0Z" />
      <path className="pl-l" d="M38,232a28,28 0 0 1 56,0" />
      <path className="pl-f" d="M0,232C60,214 120,196 190,206" />
      <path className="pl-l" d="M118,202V160M106,172H130" />
      <Shape d="M168,262V160C196,104 322,92 404,112V262Z" tone="b" off={4} />
      <path fill={h.h1} d="M330,100C360,102 386,106 404,112V262H350Z" />
      <path className="pl-paper" d="M212,262V206a28,28 0 0 1 56,0V262Z" />
      <path className="pl-l" d="M212,262V206a28,28 0 0 1 56,0V262Z" />
      <path className="pl-o" d="M226,248H254V256H226Z" />
      <path className="pl-l" d="M226,248H254V256H226ZM232,248V256" />
      <Shape d="M278,262a32,32 0 1,1 64,0Z" tone="g" off={3} />
      <path fill={h.h2} d="M318,234a32,32 0 0 1 24,28H316Z" />
      <path className="pl-o" d="M0,262H400V300H0Z" />
      <path fill={h.hh} d="M0,276H400V300H0Z" />
      <path className="pl-l" d="M0,262H400" />
      <Shape d="M140,262C140,240 150,232 158,236C160,226 172,228 170,240C178,240 180,254 176,262Z" tone="g" off={2} />
      <Shape d="M360,262C358,248 366,242 372,246C376,238 388,242 384,252C390,254 390,260 388,262Z" tone="g" off={2} />
    </>
  ),
};

/**
 * "The church" card: people of different kinds seated together round one
 * table, an open book, bread and a cup on it, under one roof and one lamp.
 */
export const CHURCH_TABLE: Drawing = {
  w: 400,
  h: 300,
  label:
    "People of different kinds seated together round one table, with an open book, bread and a cup on it, under one roof and one lamp.",
  draw: h => (
    <>
      <path className="pl-l" d="M20,108L200,26L380,108" />
      <path fill={h.h3} d="M200,26L380,108H346L200,42Z" />
      <path className="pl-l" d="M40,108V270M360,108V270" />
      <path className="pl-l" d="M200,42V86" />
      <path className="pl-m" d="M200,90C206,98 210,104 210,110A10,10 0 0 1 190,110C190,104 194,98 200,90Z" />
      <path className="pl-l" d="M200,90C206,98 210,104 210,110A10,10 0 0 1 190,110C190,104 194,98 200,90Z" />
      <path className="pl-f" d="M178,104l-12,-6M222,104l12,-6M184,124l-10,8M216,124l10,8" />
      {(
        [
          [96, 166, "g"],
          [150, 160, "b"],
          [204, 164, "c"],
          [258, 160, "g"],
          [312, 166, "b"],
        ] as const
      ).map(([x, y, t]) => (
        <g key={x}>
          <Shape
            d={`M${x - 20},${y + 76}C${x - 20},${y + 24} ${x - 12},${y + 14} ${x},${y + 14}C${x + 12},${y + 14} ${x + 20},${y + 24} ${x + 20},${y + 76}Z`}
            tone={t}
            off={2}
          />
          <path
            className="pl-o"
            d={`M${x - 11},${y}a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z`}
          />
          <path
            className="pl-l"
            d={`M${x - 11},${y}a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z`}
          />
        </g>
      ))}
      <Shape d="M60,214H340V250H60Z" tone="c" off={3} />
      <path fill={h.h2} d="M60,226H340V250H60Z" />
      <path className="pl-l" d="M60,224H340M80,250V270M320,250V270" />
      <Shape
        d="M104,214V200C116,196 128,197 138,202C148,197 160,196 172,200V214C160,210 148,211 138,216C128,211 116,210 104,214Z"
        tone="b"
        off={1.5}
      />
      <path className="pl-l" d="M138,202V216" />
      <Shape d="M190,214a22,12 0 0 1 44,0Z" tone="c" off={1.5} />
      <path className="pl-l" d="M200,206l4,4M212,204l4,4" />
      <Shape d="M262,214l5,-30h26l5,30Z" tone="b" off={1.5} />
      <path className="pl-l" d="M20,270H380" />
    </>
  ),
};

/**
 * A dove coming down, drawn round (0, 0): wings raised, the body pointing
 * down to its head, the tail fanned above. Mark 1:10 "like a dove".
 */
const DOVE =
  "M-2,-4C-10,-14 -22,-20 -32,-19C-28,-15 -28,-13 -24,-11C-26,-8 -24,-6 -20,-6C-20,-3 -16,-2 -10,-1C-7,0 -4,0 -2,1ZM2,-4C10,-14 22,-20 32,-19C28,-15 28,-13 24,-11C26,-8 24,-6 20,-6C20,-3 16,-2 10,-1C7,0 4,0 2,1ZM-4,-6C-5,2 -4,9 0,15C4,9 5,2 4,-6C3,-9 -3,-9 -4,-6ZM-3,-8L-7,-17L0,-14L7,-17L3,-8Z";

/**
 * The "God" card: the river Jordan at Jesus' baptism (Mark 1:9-11), the one
 * place the Bible shows the Father, the Son and the Spirit together. The Son
 * stands in the water (no face); the Spirit comes down like a dove (the one
 * mustard mark); the Father is shown only as light from beyond the picture's
 * edge, as the Who God is film shows him. No analogy is drawn.
 */
export const JORDAN: Drawing = {
  w: 400,
  h: 300,
  label:
    "The river Jordan between low hills: a figure stands in the water, a dove comes down through an opening in the sky, and light falls from beyond the top of the picture.",
  draw: h => (
    <>
      <path
        className="pl-f"
        d="M200,20V62M178,20L188,60M222,20L212,60M154,20L178,58M246,20L222,58"
      />
      <path
        className="pl-l"
        d="M10,66C50,52 96,70 140,56C156,51 170,54 182,62M390,66C350,52 304,70 260,56C244,51 230,54 218,62"
      />
      <path className="pl-f" d="M40,80C72,72 104,82 134,74M360,80C328,72 296,82 266,74" />
      <Shape
        d="M0,170C34,134 80,122 126,144C156,128 186,132 212,146C258,116 330,120 400,154V200H0Z"
        tone="g"
        off={4}
      />
      <path fill={h.h1} d="M212,146C258,116 330,120 400,154V200H212Z" />
      <Shape
        d="M186,230L189,170C191,160 209,160 211,170L214,230Z"
        tone="c"
        off={2}
      />
      <path className="pl-o" d="M189,150a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M189,150a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape d="M0,196H400V256H0Z" tone="b" off={3} />
      <path fill={h.hh} d="M0,224H400V256H0Z" />
      <path className="pl-l" d="M170,198c8,6 52,6 60,0" />
      <path className="pl-f" d="M156,208c14,7 74,7 88,0" />
      <path
        className="pl-f"
        d="M22,206c10,-4 20,4 30,0M84,212c10,-4 20,4 30,0M276,206c10,-4 20,4 30,0M338,214c10,-4 20,4 30,0"
      />
      <g transform="translate(200,98) scale(1.25)">
        <path className="pl-m" d={DOVE} />
        <path className="pl-l" d={DOVE} style={{ strokeWidth: 1.6 }} />
      </g>
      <path className="pl-f" strokeDasharray="3 5" d="M200,122V136" />
      <Shape
        d="M0,300V250C60,240 120,244 170,254C230,244 320,240 400,252V300Z"
        tone="g"
        off={3}
      />
      <path
        className="pl-l"
        d="M38,254V226M46,254V216M54,256V230M350,252V222M358,252V212M366,252V226"
      />
    </>
  ),
};

/**
 * "People made in God's image": a man and a woman in a garden at morning,
 * one planting a young tree and the other carrying water, with a still pool
 * between them that gives back the light (the one mustard mark): made to
 * show what God is like, and to care for his world.
 */
export const IMAGE_GARDEN: Drawing = {
  w: 400,
  h: 300,
  label:
    "A man and a woman in a garden at morning: one plants a young tree, the other carries a jar of water, and a still pool between them gives back the light.",
  draw: h => (
    <>
      <path
        className="pl-f"
        d="M0,52L92,96M10,30L104,86M54,24L124,80M104,24L144,76"
      />
      <path fill={h.h1} d="M0,156C80,136 150,144 200,150C260,138 330,132 400,144V160H0Z" />
      <path className="pl-l" d="M0,156C80,136 150,144 200,150C260,138 330,132 400,144" />
      <Shape d="M0,300V160H400V300Z" tone="g" off={3} />
      <Shape d="M318,158V122h8v36Z" tone="c" off={2} />
      <Shape
        d="M296,112a26,22 0 1,0 52,0a26,22 0 1,0 -52,0Z"
        tone="g"
        off={3}
      />
      <path fill={h.h2} d="M322,90a26,22 0 0 1 0,44Z" />
      <Shape d="M256,196a16,6 0 0 1 32,0Z" tone="c" off={1.5} />
      <path className="pl-l" d="M272,192V168M272,180l-9,-7M272,175l9,-8" />
      <path className="pl-l" d="M236,200L252,160" />
      <Shape d="M232,198l-6,12l10,4l6,-12Z" tone="b" off={1} />
      <Shape
        d="M200,206L204,146C206,134 226,134 228,146L232,206Z"
        tone="c"
        off={2}
      />
      <path className="pl-o" d="M205,122a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M205,122a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape
        d="M70,210L76,148C78,136 98,136 100,148L108,210Z"
        tone="b"
        off={2}
      />
      <path className="pl-o" d="M77,124a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M77,124a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape
        d="M104,166C98,166 96,176 100,184C102,192 118,192 120,184C124,176 122,166 116,166V160H106Z"
        tone="c"
        off={1.5}
      />
      <Shape
        d="M126,226a36,10 0 1,0 72,0a36,10 0 1,0 -72,0Z"
        tone="b"
        off={1.5}
      />
      <path fill={h.hh} d="M132,228a30,6 0 0 0 60,0Z" />
      <path className="pl-m" d="M162,216l3,6l6,2l-6,2l-3,6l-3,-6l-6,-2l6,-2Z" />
      <path
        className="pl-l"
        d="M162,216l3,6l6,2l-6,2l-3,6l-3,-6l-6,-2l6,-2Z"
        style={{ strokeWidth: 1.25 }}
      />
      <Shape
        d="M336,206C332,198 338,192 344,194C346,188 356,188 358,194C364,192 370,198 366,206C368,212 360,216 354,212C348,216 338,214 336,206Z"
        tone="b"
        off={1.5}
      />
      <path className="pl-l" d="M342,212V222M360,212V222" />
      <Shape d="M362,194a6,6 0 1,0 12,0a6,6 0 1,0 -12,0Z" tone="b" off={1} />
      <path fill={h.h2} d="M0,262C120,254 280,252 400,260V300H0Z" />
    </>
  ),
};

/**
 * "Sin": the garden in the breeze of the day (Genesis 3:8-9). Two people
 * hide behind a bush; thorns grow at the edge of the path; a light (the one
 * mustard mark, never a figure) comes along the path toward them, as God
 * came looking and called, "Where are you?"
 */
export const HIDING: Drawing = {
  w: 400,
  h: 300,
  label:
    "A garden in the evening breeze: two people hide behind a bush, thorns grow at the edge of the path, and a light comes along the path toward them.",
  draw: h => (
    <>
      <path fill={h.h1} d="M0,0H400V122H0Z" />
      <Shape d="M0,300V122C100,112 300,112 400,122V300Z" tone="g" off={3} />
      <Shape d="M52,150V92h10v58Z" tone="c" off={2} />
      <Shape
        d="M16,84C16,56 42,44 58,48C76,40 102,54 98,80C106,96 88,112 64,106C40,114 12,104 16,84Z"
        tone="g"
        off={3}
      />
      <path fill={h.h2} d="M60,48C76,40 102,54 98,80C106,96 88,112 64,106Z" />
      <Shape d="M352,140V96h8v44Z" tone="c" off={2} />
      <Shape
        d="M328,90C326,66 346,56 356,60C370,54 386,66 384,84C390,98 374,110 356,106C340,112 324,104 328,90Z"
        tone="g"
        off={3}
      />
      <path
        className="pl-o"
        d="M400,140C340,146 296,158 262,176C226,196 196,214 168,250H226C246,224 280,200 400,172Z"
      />
      <path
        className="pl-l"
        d="M400,140C340,146 296,158 262,176C226,196 196,214 168,250M226,250C246,224 280,200 400,172"
      />
      <path className="pl-o" d="M96,170a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <path className="pl-l" d="M96,170a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <path className="pl-o" d="M126,176a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <path className="pl-l" d="M126,176a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <Shape
        d="M40,240C28,210 52,184 78,190C92,176 124,178 136,192C158,182 186,200 182,224C194,238 180,256 158,250C134,262 68,262 40,240Z"
        tone="g"
        off={3}
      />
      <path
        fill={h.h1}
        d="M40,240C28,210 52,184 78,190C92,176 124,178 128,192L120,254C88,260 62,256 40,240Z"
      />
      <path
        className="pl-l"
        d="M238,252l10,-18l5,7l4,-11l6,9l5,-12l4,9l7,-5M300,240l9,-17l4,7l6,-11l5,9l7,-9M342,232l8,-14l4,6l5,-9"
      />
      <path
        className="pl-f"
        strokeDasharray="2 4"
        d="M330,160a20,20 0 1,0 40,0a20,20 0 1,0 -40,0ZM318,160a32,32 0 1,0 64,0a32,32 0 1,0 -64,0Z"
      />
      <path className="pl-m" d="M341,160a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <path className="pl-l" d="M341,160a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <path
        className="pl-f"
        strokeDasharray="3 5"
        d="M318,168C292,176 268,188 250,200"
      />
      <path fill={h.h2} d="M0,262H400V300H0Z" />
    </>
  ),
};

/**
 * "The cross": an empty cross on a hill at first light, a path leading up to
 * it from the foot of the picture. The cross stands empty: the card speaks of
 * the death and points on to the third day. The one mustard mark: the sun
 * rising behind the far hill.
 */
export const CROSS_HILL: Drawing = {
  w: 400,
  h: 300,
  label:
    "An empty cross on a hill at first light, with a path from the foot of the picture leading up to it and the sun rising behind the far hills.",
  draw: h => (
    <>
      <path
        className="pl-f"
        d="M322,118l-14,-26M338,114l-2,-30M354,116l12,-26M366,124l24,-18M308,126l-26,-12"
      />
      <path className="pl-m" d="M312,136a26,26 0 0 1 52,0Z" />
      <path className="pl-l" d="M312,136a26,26 0 0 1 52,0" />
      <path className="pl-l" d="M230,138C280,128 340,128 400,134" />
      <path fill={h.h1} d="M0,140C60,126 140,124 230,138V142H0Z" />
      <path className="pl-l" d="M0,140C60,126 140,124 230,138" />
      <Shape
        d="M0,300V196C40,160 90,128 140,124C190,126 240,152 290,186C330,206 370,216 400,220V300Z"
        tone="g"
        off={4}
      />
      <path
        fill={h.h2}
        d="M140,124C190,126 240,152 290,186C330,206 370,216 400,220V300H216C206,236 180,160 140,124Z"
      />
      <path className="pl-k" d="M135,126V40h11V126ZM112,62H169v10H112Z" />
      <path
        className="pl-o"
        d="M142,126C152,142 166,160 180,180C196,204 214,228 232,262H262C242,226 222,198 204,176C188,156 168,138 150,126Z"
      />
      <path
        className="pl-l"
        d="M142,126C152,142 166,160 180,180C196,204 214,228 232,262M150,126C168,138 188,156 204,176C222,198 242,226 262,262"
      />
      <path
        className="pl-l"
        d="M40,232l4,-12l4,12M64,242l4,-14l4,14M96,226l4,-10l4,10M318,244l4,-12l4,12M346,252l4,-14l4,14"
      />
      <path fill={h.h1} d="M0,270H400V300H0Z" />
    </>
  ),
};

/**
 * "The Holy Spirit": a hillside in the wind. The wind itself is never drawn,
 * only what it moves (John 3:8): the grass and a tree bent one way, and a
 * breath line across the sky. Three people walk up the path together under
 * one small flame (the one mustard mark), set in the sky above them, never
 * on a head. No figure stands for the Spirit.
 */
export const SPIRIT_WIND: Drawing = {
  w: 400,
  h: 300,
  label:
    "A hillside in the wind: the grass and a tree bend the same way and a breath line sweeps across the sky; three people walk up a path together, and one small flame burns in the sky above them.",
  draw: h => (
    <>
      <path
        className="pl-l"
        d="M0,66C70,40 140,86 214,62C262,46 300,54 330,44"
      />
      <path
        className="pl-f"
        d="M20,92C90,72 150,104 224,84M60,40C120,24 170,44 230,30M250,98C300,86 340,92 372,80"
      />
      <Shape
        d="M0,300V182C70,150 150,136 236,150C300,140 360,148 400,160V300Z"
        tone="g"
        off={4}
      />
      <path
        fill={h.h2}
        d="M236,150C300,140 360,148 400,160V300H262C254,236 246,190 236,150Z"
      />
      <Shape d="M318,170L322,124h8L330,170Z" tone="c" off={2} />
      <Shape
        d="M298,122C294,100 318,86 338,92C360,86 382,102 376,122C384,138 360,146 342,140C322,148 300,140 298,122Z"
        tone="g"
        off={3}
      />
      <path
        fill={h.h2}
        d="M338,92C360,86 382,102 376,122C384,138 360,146 342,140Z"
      />
      <path
        className="pl-o"
        d="M150,300C170,262 196,224 214,190C222,176 228,164 232,152H244C240,166 234,180 228,194C212,228 196,262 186,300Z"
      />
      <path
        className="pl-l"
        d="M150,300C170,262 196,224 214,190C222,176 228,164 232,152M186,300C196,262 212,228 228,194C234,180 240,166 244,152"
      />
      <path
        className="pl-l"
        d="M28,236q8,-14 20,-20M40,240q8,-16 22,-22M60,236q6,-12 18,-16M86,250q8,-14 20,-20M98,254q8,-16 22,-22M270,232q8,-14 20,-20M284,236q8,-16 22,-22M300,230q6,-12 18,-16M330,252q8,-14 20,-20M344,256q8,-16 22,-22"
      />
      <Shape
        d="M190,242L194,198C196,188 212,188 214,198L218,242Z"
        tone="c"
        off={2}
      />
      <path className="pl-o" d="M194,178a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M194,178a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <Shape
        d="M218,226L222,188C224,180 236,180 238,188L242,226Z"
        tone="b"
        off={2}
      />
      <path className="pl-o" d="M222,170a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M222,170a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <Shape
        d="M160,262L165,212C167,200 185,200 187,212L192,262Z"
        tone="g"
        off={2}
      />
      <path className="pl-o" d="M165,190a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M165,190a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <g transform="translate(206,104) scale(1.3)">
        <path
          className="pl-m"
          d="M0,-17C5,-10 10,-4 10,3A10,10 0 0 1 -10,3C-10,-4 -5,-10 0,-17Z"
        />
        <path
          className="pl-l"
          d="M0,-17C5,-10 10,-4 10,3A10,10 0 0 1 -10,3C-10,-4 -5,-10 0,-17Z"
          style={{ strokeWidth: 1.7 }}
        />
        <path
          className="pl-l"
          d="M-1,8C-6,4 -4,-2 0,-6C1,-1 5,2 2,8"
          style={{ strokeWidth: 1.4 }}
        />
      </g>
    </>
  ),
};

/**
 * "The life to come": a seed and a harvest (1 Corinthians 15:36-37). The
 * ground is cut away to show a seed sown in the dark soil, its root going
 * down and its stalk going up into a full ear of wheat in the morning. Far
 * off, the city's wall with its gate standing open, light coming from it
 * (the one mustard mark). No grave and no figure.
 */
export const SEED_HARVEST: Drawing = {
  w: 400,
  h: 300,
  label:
    "A seed sown in the dark soil, shown in a cut through the ground, its root going down and its stalk rising into a full ear of wheat; far off, a city wall with its gate standing open and light coming from it.",
  draw: h => (
    <>
      <path
        className="pl-f"
        d="M318,96l-8,-24M330,92l2,-26M342,96l12,-22M306,104l-22,-12M354,104l22,-14"
      />
      <path
        className="pl-o"
        d="M262,140V112h18v-8h10v8h20v-8h10v8h20v-8h10v8h18V140Z"
      />
      <path
        fill={h.h1}
        d="M262,140V112h18v-8h10v8h20v-8h10v8h20v-8h10v8h18V140Z"
      />
      <path
        className="pl-l"
        d="M262,140V112h18v-8h10v8h20v-8h10v8h20v-8h10v8h18V140"
      />
      <path className="pl-m" d="M318,140V124a12,12 0 0 1 24,0V140Z" />
      <path className="pl-l" d="M318,140V124a12,12 0 0 1 24,0V140" />
      <path className="pl-l" d="M0,142C90,134 180,136 262,140M368,140H400" />
      <Shape d="M0,300V170C120,160 260,158 400,166V300Z" tone="g" off={3} />
      <path fill={h.h3} d="M0,186C120,178 260,176 400,184V300H0Z" />
      <path className="pl-l" d="M0,186C120,178 260,176 400,184" />
      <path
        className="pl-l"
        d="M40,172q6,-10 14,-14M52,174q4,-12 12,-16M300,168q6,-10 14,-14M312,170q4,-12 12,-16M352,172q6,-10 14,-14"
      />
      <path
        className="pl-o"
        d="M128,226a14,9 -20 1,0 28,0a14,9 -20 1,0 -28,0Z"
      />
      <path
        className="pl-c"
        d="M128,226a14,9 -20 1,0 28,0a14,9 -20 1,0 -28,0Z"
        transform="translate(1.5,1)"
      />
      <path
        className="pl-l"
        d="M128,226a14,9 -20 1,0 28,0a14,9 -20 1,0 -28,0Z"
      />
      <path
        className="pl-l"
        d="M140,234C136,242 130,248 122,254M146,234C150,244 158,250 166,256M142,236C142,244 144,250 140,258"
      />
      <path
        className="pl-l"
        d="M144,218C146,196 142,170 146,140C148,120 150,104 152,92"
      />
      <path
        className="pl-l"
        d="M146,176C130,166 118,164 104,168M147,152C164,142 176,142 190,148M150,122C136,114 126,114 114,120"
      />
      <path className="pl-l" d="M152,92V50" />
      {[0, 1, 2, 3].map(k => (
        <g key={k}>
          <Shape
            d={`M151,${88 - k * 10}c-10,-2 -14,-10 -12,-16c8,2 13,8 12,16Z`}
            tone="c"
            off={1}
          />
          <Shape
            d={`M153,${83 - k * 10}c10,-2 14,-10 12,-16c-8,2 -13,8 -12,16Z`}
            tone="c"
            off={1}
          />
        </g>
      ))}
    </>
  ),
};

const CARD_ART: Record<string, Drawing> = {
  manger: MANGER,
  tomb: EMPTY_TOMB,
  table: CHURCH_TABLE,
  jordan: JORDAN,
  image: IMAGE_GARDEN,
  hiding: HIDING,
  cross: CROSS_HILL,
  wind: SPIRIT_WIND,
  seed: SEED_HARVEST,
};

/** The pictures a "Why we believe" card can show, besides the book (scripts/validate-explorer.mjs reads this list). */
export const CARD_PICTURES = Object.keys(CARD_ART);

/** A "Why we believe" card's drawing, by the picture its data names; null for one this file does not draw. */
export function CardArt({ picture, label }: { picture: string; label?: string }) {
  const d = CARD_ART[picture];
  if (!d) return null;
  return <PlateSvg drawing={label ? { ...d, label } : d} />;
}

export function HeadArt() {
  return <PlateSvg drawing={HEAD_ART} decorative />;
}
