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
 *   the table, the Jordan, the garden, the hiding, the cross on the hill.
 *
 * Mustard is kept for the map's one mark (where you are), so no emblem uses it.
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

/** A dove in the hand, drawn round (0, 0): two wings and a body. */
const DOVE =
  "M0,-4C-8,-12 -18,-12 -24,-6C-16,-4 -10,-2 -2,2ZM0,-4C8,-12 18,-12 24,-6C16,-4 10,-2 2,2ZM-2,-4C-2,-8 2,-8 2,-4L1,8L0,12L-1,8Z";

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
        d="M200,0V50M176,0L188,48M224,0L212,48M150,0L178,46M250,0L222,46M124,0L168,44M276,0L232,44"
      />
      <path
        className="pl-l"
        d="M20,58C60,44 104,62 146,48C160,44 172,46 182,54M380,58C340,44 296,62 254,48C240,44 228,46 218,54"
      />
      <path className="pl-f" d="M48,70C80,62 110,72 140,64M352,70C320,62 290,72 260,64" />
      <Shape
        d="M0,176C34,140 80,128 126,150C156,134 186,138 212,152C258,122 330,126 400,160V196H0Z"
        tone="g"
        off={4}
      />
      <path fill={h.h1} d="M212,152C258,122 330,126 400,160V196H212Z" />
      <Shape d="M0,196H400V240H0Z" tone="b" off={3} />
      <path fill={h.hh} d="M0,214H400V240H0Z" />
      <path
        className="pl-f"
        d="M22,206c10,-4 20,4 30,0M84,210c10,-4 20,4 30,0M276,206c10,-4 20,4 30,0M338,212c10,-4 20,4 30,0"
      />
      <Shape
        d="M184,212L188,168C190,158 210,158 212,168L216,212Z"
        tone="c"
        off={2}
      />
      <path className="pl-o" d="M189,148a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M189,148a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M168,212c10,8 54,8 64,0" />
      <path className="pl-f" d="M156,220c14,8 74,8 88,0" />
      <g transform="translate(200,96) scale(1.5)">
        <path className="pl-m" d={DOVE} />
        <path className="pl-l" d={DOVE} style={{ strokeWidth: 1.5 }} />
      </g>
      <path className="pl-f" strokeDasharray="3 5" d="M200,118V136" />
      <Shape
        d="M0,300V248C60,238 120,242 170,254C230,242 320,238 400,250V300Z"
        tone="g"
        off={3}
      />
      <path fill={h.h2} d="M0,276C80,268 300,266 400,274V300H0Z" />
      <path
        className="pl-l"
        d="M38,252V222M46,252V212M54,254V226M350,250V218M358,250V208M366,250V222"
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
        d="M0,30L120,96M0,70L110,110M40,0L136,90M90,0L156,86M150,0L176,84"
      />
      <path fill={h.h1} d="M0,196C80,176 150,184 200,190C260,178 330,172 400,184V200H0Z" />
      <path className="pl-l" d="M0,196C80,176 150,184 200,190C260,178 330,172 400,184" />
      <Shape d="M0,300V200H400V300Z" tone="g" off={3} />
      <path fill={h.h2} d="M0,272C120,264 280,262 400,270V300H0Z" />
      <Shape d="M312,196V160h8v36Z" tone="c" off={2} />
      <Shape
        d="M290,150a26,22 0 1,0 52,0a26,22 0 1,0 -52,0Z"
        tone="g"
        off={3}
      />
      <path fill={h.h2} d="M316,128a26,22 0 0 1 0,44Z" />
      <Shape d="M262,226L266,232H274L278,226Z" tone="c" off={1.5} />
      <path className="pl-l" d="M270,226V206M270,214l-8,-6M270,210l8,-7" />
      <path className="pl-l" d="M232,234L250,196M246,190h10" />
      <Shape
        d="M200,234L204,176C206,164 226,164 228,176L232,234Z"
        tone="c"
        off={2}
      />
      <path className="pl-o" d="M205,152a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M205,152a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape
        d="M76,238L82,178C84,166 104,166 106,178L114,238Z"
        tone="b"
        off={2}
      />
      <path className="pl-o" d="M83,154a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M83,154a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape
        d="M110,196C104,196 102,206 106,214C108,222 124,222 126,214C130,206 128,196 122,196V190H112Z"
        tone="c"
        off={1.5}
      />
      <Shape
        d="M128,258a32,9 0 1,0 64,0a32,9 0 1,0 -64,0Z"
        tone="b"
        off={1.5}
      />
      <path className="pl-f" d="M138,258h12M168,256h14" />
      <path className="pl-m" d="M160,250l3,6l6,2l-6,2l-3,6l-3,-6l-6,-2l6,-2Z" />
      <path className="pl-l" d="M160,250l3,6l6,2l-6,2l-3,6l-3,-6l-6,-2l6,-2Z" style={{ strokeWidth: 1.25 }} />
      <Shape
        d="M340,240C336,232 342,226 348,228C350,222 360,222 362,228C368,226 374,232 370,240C372,246 364,250 358,246C352,250 342,248 340,240Z"
        tone="b"
        off={1.5}
      />
      <path className="pl-l" d="M346,246V256M364,246V256" />
      <Shape d="M366,228a6,6 0 1,0 12,0a6,6 0 1,0 -12,0Z" tone="b" off={1} />
    </>
  ),
};

/**
 * "Sin": the garden in the breeze of the day (Genesis 3:8-9). Two people
 * hide among the bushes; thorns grow at the edge of the path; a light (the
 * one mustard mark, never a figure) comes along the path toward them, as
 * God came looking and called, "Where are you?"
 */
export const HIDING: Drawing = {
  w: 400,
  h: 300,
  label:
    "A garden in the evening breeze: two people hide among the bushes, thorns grow at the edge of the path, and a light comes along the path toward them.",
  draw: h => (
    <>
      <path fill={h.h1} d="M0,0H400V150H0Z" />
      <path className="pl-f" d="M20,40c20,-6 40,6 60,0M260,30c20,-6 40,6 60,0" />
      <Shape d="M0,300V150C100,140 300,140 400,150V300Z" tone="g" off={3} />
      <path fill={h.h2} d="M0,262H400V300H0Z" />
      <path className="pl-o" d="M400,176C330,186 290,196 250,214C210,232 170,248 120,300H200C230,262 270,236 400,206Z" />
      <path className="pl-l" d="M400,176C330,186 290,196 250,214C210,232 170,248 120,300M200,300C230,262 270,236 400,206" />
      <Shape d="M52,170V100h10v70Z" tone="c" off={2} />
      <Shape
        d="M14,90C14,58 42,44 58,48C76,40 104,56 100,86C108,104 88,122 64,116C40,124 10,114 14,90Z"
        tone="g"
        off={3}
      />
      <path fill={h.h2} d="M60,48C76,40 104,56 100,86C108,104 88,122 64,116Z" />
      <Shape d="M146,160V112h8v48Z" tone="c" off={2} />
      <Shape
        d="M120,106C118,80 140,68 152,72C168,66 184,80 182,100C188,116 170,128 150,124C132,130 116,122 120,106Z"
        tone="g"
        off={3}
      />
      <path className="pl-o" d="M84,186a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M84,186a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-o" d="M110,192a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M110,192a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <Shape
        d="M40,244C30,214 54,190 78,198C92,184 120,186 130,200C150,190 176,206 172,228C184,240 172,258 152,254C130,266 70,264 40,244Z"
        tone="g"
        off={3}
      />
      <path fill={h.h1} d="M40,244C30,214 54,190 78,198C92,184 120,186 130,200L120,254C90,262 62,258 40,244Z" />
      <path
        className="pl-l"
        d="M230,300L246,270l6,8l4,-12l6,10l6,-14l4,10l8,-6M300,300l10,-20l4,8l6,-12l6,10l8,-10M180,300l8,-16l6,6l4,-10"
      />
      <path className="pl-f" d="M318,170l14,-8M318,182l18,0M326,196l14,6M296,162l-6,-12M286,190l-12,6" />
      <path className="pl-m" d="M308,182a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <path className="pl-l" d="M308,182a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <path className="pl-f" strokeDasharray="3 5" d="M300,190C280,198 260,206 240,214" />
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
        d="M312,150l-24,-40M330,146l-4,-48M348,148l18,-42M364,156l34,-30M298,158l-40,-20"
      />
      <path className="pl-m" d="M296,172a38,38 0 0 1 76,0Z" />
      <path className="pl-l" d="M296,172a38,38 0 0 1 76,0" />
      <path className="pl-l" d="M220,172C280,160 340,158 400,166" />
      <path fill={h.h1} d="M0,172C60,158 140,156 220,172H0Z" />
      <path className="pl-l" d="M0,172C60,158 140,156 220,172" />
      <Shape
        d="M0,300V214C40,176 90,150 140,148C190,150 240,176 290,214C330,236 370,248 400,252V300Z"
        tone="g"
        off={4}
      />
      <path fill={h.h2} d="M140,148C190,150 240,176 290,214C330,236 370,248 400,252V300H200C190,240 170,180 140,148Z" />
      <path className="pl-k" d="M134,150V62h12V150ZM110,84H170v11H110Z" />
      <path
        className="pl-o"
        d="M146,150C160,170 176,186 190,206C210,236 236,262 262,300H300C276,260 248,226 222,198C204,178 180,162 154,150Z"
      />
      <path
        className="pl-l"
        d="M146,150C160,170 176,186 190,206C210,236 236,262 262,300M154,150C180,162 204,178 222,198C248,226 276,260 300,300"
      />
      <path
        className="pl-l"
        d="M40,262l4,-12l4,12M60,270l4,-14l4,14M90,256l4,-10l4,10M340,274l4,-12l4,12M366,282l4,-14l4,14"
      />
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
