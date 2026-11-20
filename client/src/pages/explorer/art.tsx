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
 * - Manger: the picture on the "Jesus, God and man" card.
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

export function HeadArt() {
  return <PlateSvg drawing={HEAD_ART} decorative />;
}
export function MangerArt({ label }: { label?: string }) {
  return <PlateSvg drawing={label ? { ...MANGER, label } : MANGER} />;
}
